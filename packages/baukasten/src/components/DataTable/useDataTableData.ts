import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  AsyncTransactionsFlushedEvent,
  DataTableTransaction,
  DataTableTransactionResult,
  DataTableTransactionWarning,
  UndoableDataTableTransactionResult,
  UseDataTableDataOptions,
  UseDataTableDataReturn,
} from './DataTable.types';
import { mergeTransactions } from './mergeTransactions';

/**
 * Builds an index map from row ID → array index for O(1) lookups.
 */
function buildIndex<TData>(
  rows: TData[],
  getRowId: (row: TData, index: number) => string
): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = 0; i < rows.length; i++) {
    map.set(getRowId(rows[i], i), i);
  }
  return map;
}

/**
 * Applies a transaction to a data array and returns the new data plus a result object.
 *
 * Processing order: remove → update → add.
 *
 * This is a pure function — it does not mutate the input array.
 */
export function applyDataTransaction<TData>(
  currentData: TData[],
  tx: DataTableTransaction<TData>,
  getRowId: (row: TData, index: number) => string
): { nextData: TData[]; result: DataTableTransactionResult<TData> } {
  const index = buildIndex(currentData, getRowId);

  const warnings: DataTableTransactionWarning<TData>[] = [];
  const actuallyRemoved: TData[] = [];
  const actuallyUpdated: TData[] = [];
  const actuallyAdded: TData[] = [];

  // Work on a shallow copy
  let nextData = [...currentData];

  // 1. Process REMOVE
  if (tx.remove && tx.remove.length > 0) {
    const removeIds = new Set<string>();
    for (const row of tx.remove) {
      const id = getRowId(row, -1);
      if (index.has(id)) {
        removeIds.add(id);
        actuallyRemoved.push(currentData[index.get(id)!]);
      } else {
        warnings.push({ type: 'remove-not-found', row, id });
      }
    }
    if (removeIds.size > 0) {
      nextData = nextData.filter(
        (r, i) => !removeIds.has(getRowId(r, i))
      );
    }
  }

  // 2. Process UPDATE (on the post-remove array)
  if (tx.update && tx.update.length > 0) {
    const postRemoveIndex = buildIndex(nextData, getRowId);
    for (const row of tx.update) {
      const id = getRowId(row, -1);
      const idx = postRemoveIndex.get(id);
      if (idx !== undefined) {
        nextData[idx] = row;
        actuallyUpdated.push(row);
      } else {
        warnings.push({ type: 'update-not-found', row, id });
      }
    }
  }

  // 3. Process ADD
  if (tx.add && tx.add.length > 0) {
    const addIndex = tx.addIndex ?? nextData.length;
    const clampedIndex = Math.max(0, Math.min(addIndex, nextData.length));
    nextData.splice(clampedIndex, 0, ...tx.add);
    actuallyAdded.push(...tx.add);
  }

  return {
    nextData,
    result: {
      add: actuallyAdded,
      update: actuallyUpdated,
      remove: actuallyRemoved,
      warnings,
    },
  };
}

/**
 * Maximum number of pending async transactions before an auto-flush is triggered.
 */
const MAX_ASYNC_QUEUE_SIZE = 1000;

/** Entry in the pending async queue */
interface PendingAsyncTx<TData> {
  tx: DataTableTransaction<TData>;
  undoable: boolean;
  resolve: (result: DataTableTransactionResult<TData>) => void;
  reject: (error: unknown) => void;
}

/**
 * Hook that manages DataTable data with transaction API.
 *
 * @example
 * ```tsx
 * const { data, applyTransaction } = useDataTableData({
 *   initialData: people,
 *   getRowId: (row) => row.id,
 *   onDataChange: (data, tx) => console.log('Data changed', data),
 * });
 *
 * // Add a row (no undo)
 * applyTransaction({ add: [{ id: '4', name: 'New Person' }] });
 *
 * // Update + remove in one call (with undo support)
 * const result = applyTransaction({
 *   update: [{ id: '2', name: 'Updated' }],
 *   remove: [{ id: '1' }],
 * }, true);
 *
 * // Undo the last transaction (only available when undoable=true)
 * result.undo();
 * ```
 */
export function useDataTableData<TData>(
  options: UseDataTableDataOptions<TData>
): UseDataTableDataReturn<TData> {
  const {
    initialData = [],
    getRowId,
    onDataChange,
    onAsyncTransactionsFlushed,
    asyncScheduler,
  } = options;

  const [data, setDataState] = useState<TData[]>(initialData);

  // Keep a ref to always have access to current data in callbacks
  const dataRef = useRef<TData[]>(data);
  dataRef.current = data;

  // Keep refs for stable callbacks
  const getRowIdRef = useRef(getRowId);
  getRowIdRef.current = getRowId;
  const onDataChangeRef = useRef(onDataChange);
  onDataChangeRef.current = onDataChange;
  const onAsyncTransactionsFlushedRef = useRef(onAsyncTransactionsFlushed);
  onAsyncTransactionsFlushedRef.current = onAsyncTransactionsFlushed;
  const asyncSchedulerRef = useRef(asyncScheduler);
  asyncSchedulerRef.current = asyncScheduler;

  // Async queue refs
  const pendingQueueRef = useRef<PendingAsyncTx<TData>[]>([]);
  const scheduledFlushRef = useRef<boolean>(false);
  const mountedRef = useRef(true);

  const applyTransaction = useCallback(
    (tx: DataTableTransaction<TData>, undoable?: boolean): DataTableTransactionResult<TData> | UndoableDataTableTransactionResult<TData> => {
      const currentData = dataRef.current;
      const snapshotBeforeTx = undoable ? [...currentData] : undefined;

      const { nextData, result } = applyDataTransaction(
        currentData,
        tx,
        getRowIdRef.current
      );

      // Commit
      setDataState(nextData);
      dataRef.current = nextData;
      onDataChangeRef.current?.(nextData, tx);

      if (snapshotBeforeTx) {
        // Build undo function that restores the pre-transaction snapshot
        const undo = () => {
          setDataState(snapshotBeforeTx);
          dataRef.current = snapshotBeforeTx;
          onDataChangeRef.current?.(snapshotBeforeTx);
        };
        return { ...result, undo };
      }

      return result;
    },
    []
  ) as UseDataTableDataReturn<TData>['applyTransaction'];

  /**
   * Flush all pending async transactions: merge → apply → resolve promises.
   */
  const flushAsyncTransactions = useCallback(() => {
    const queue = pendingQueueRef.current;
    if (queue.length === 0) return;

    // Drain the queue
    const batch = queue.splice(0, queue.length);
    scheduledFlushRef.current = false;

    try {
      const txs = batch.map((entry) => entry.tx);
      const allUndoable = batch.every((entry) => entry.undoable);

      const mergedTx = mergeTransactions(txs, getRowIdRef.current);
      if (!mergedTx) {
        // Nothing to apply — resolve all with empty result
        const emptyResult: DataTableTransactionResult<TData> = {
          add: [],
          update: [],
          remove: [],
          warnings: [],
        };
        for (const entry of batch) {
          entry.resolve(emptyResult);
        }
        return;
      }

      // Apply the merged transaction
      const currentData = dataRef.current;
      const snapshotBeforeTx = allUndoable ? [...currentData] : undefined;

      const { nextData, result } = applyDataTransaction(
        currentData,
        mergedTx,
        getRowIdRef.current
      );

      // Commit
      setDataState(nextData);
      dataRef.current = nextData;
      onDataChangeRef.current?.(nextData, mergedTx);

      // Build event for flush callback
      const event: AsyncTransactionsFlushedEvent<TData> = { result };

      if (snapshotBeforeTx) {
        const undo = () => {
          setDataState(snapshotBeforeTx);
          dataRef.current = snapshotBeforeTx;
          onDataChangeRef.current?.(snapshotBeforeTx);
        };
        event.undo = undo;
      }

      // Notify flush listener
      onAsyncTransactionsFlushedRef.current?.(event);

      // Resolve all promises with the merged result
      for (const entry of batch) {
        entry.resolve(result);
      }
    } catch (error) {
      // Reject all promises atomically
      for (const entry of batch) {
        entry.reject(error);
      }
    }
  }, []);

  /**
   * Schedule a flush using the configured scheduler (default: requestAnimationFrame).
   */
  const scheduleFlush = useCallback(() => {
    if (scheduledFlushRef.current) return;
    scheduledFlushRef.current = true;

    const scheduler = asyncSchedulerRef.current ?? (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout);
    scheduler(() => {
      if (mountedRef.current) {
        flushAsyncTransactions();
      }
    });
  }, [flushAsyncTransactions]);

  const applyTransactionAsync = useCallback(
    (tx: DataTableTransaction<TData>, undoable = false): Promise<DataTableTransactionResult<TData>> => {
      return new Promise<DataTableTransactionResult<TData>>((resolve, reject) => {
        pendingQueueRef.current.push({ tx, undoable, resolve, reject });

        // Auto-flush if queue exceeds max size
        if (pendingQueueRef.current.length >= MAX_ASYNC_QUEUE_SIZE) {
          flushAsyncTransactions();
        } else {
          scheduleFlush();
        }
      });
    },
    [flushAsyncTransactions, scheduleFlush]
  );

  // Cleanup on unmount: reject pending promises, cancel scheduled flush
  useEffect(() => {
    mountedRef.current = true;
    const queueRef = pendingQueueRef;
    return () => {
      mountedRef.current = false;
      scheduledFlushRef.current = false;
      const queue = queueRef.current;
      if (queue.length > 0) {
        const pending = queue.splice(0, queue.length);
        const error = new Error('Component unmounted before async transactions were flushed');
        for (const entry of pending) {
          entry.reject(error);
        }
      }
    };
  }, []);

  const setData = useCallback((newData: TData[]) => {
    setDataState(newData);
    dataRef.current = newData;
    onDataChangeRef.current?.(newData);
  }, []);

  const getRowData = useCallback(() => {
    return dataRef.current;
  }, []);

  return {
    data,
    applyTransaction,
    applyTransactionAsync,
    flushAsyncTransactions,
    setData,
    getRowData,
  };
}
