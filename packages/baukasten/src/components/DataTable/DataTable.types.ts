/**
 * A transaction describes a batch of row mutations to apply to the DataTable.
 *
 * Processing order: remove → update → add
 */
export interface DataTableTransaction<TData> {
    /** Rows to add */
    add?: TData[];
    /** Index at which to insert added rows. Default: append at end */
    addIndex?: number;
    /** Rows to update (matched by getRowId). Unmatched rows produce warnings. */
    update?: TData[];
    /** Rows to remove (matched by getRowId). Unmatched rows produce warnings. */
    remove?: TData[];
}

/**
 * Warning produced when a transaction references a row that could not be found.
 */
export interface DataTableTransactionWarning<TData> {
    type: 'update-not-found' | 'remove-not-found';
    row: TData;
    id: string;
}

/**
 * Result returned after applying a transaction.
 */
export interface DataTableTransactionResult<TData> {
    /** Rows that were actually added */
    add: TData[];
    /** Rows that were actually updated (new values) */
    update: TData[];
    /** Rows that were actually removed */
    remove: TData[];
    /** Warnings for rows that could not be matched */
    warnings: DataTableTransactionWarning<TData>[];
}

/**
 * Result returned after applying an undoable transaction.
 * Extends the base result with an `undo` function that restores the pre-transaction snapshot.
 */
export interface UndoableDataTableTransactionResult<TData> extends DataTableTransactionResult<TData> {
    /** Call to revert this transaction (restores the data snapshot from before the transaction) */
    undo: () => void;
}

/**
 * Event emitted when a batch of async transactions is flushed.
 */
export interface AsyncTransactionsFlushedEvent<TData> {
    /** The merged result of all batched transactions */
    result: DataTableTransactionResult<TData>;
    /** Undo function — only present when ALL transactions in the batch requested undo */
    undo?: () => void;
}

/**
 * Imperative handle exposed via DataTable ref.
 */
export interface DataTableRef<TData> {
    /** Apply an undoable batch mutation to the table data */
    applyTransaction(tx: DataTableTransaction<TData>, undoable: true): UndoableDataTableTransactionResult<TData>;
    /** Apply a batch mutation to the table data */
    applyTransaction(tx: DataTableTransaction<TData>, undoable?: false): DataTableTransactionResult<TData>;
    /**
     * Queue a transaction to be applied asynchronously in the next animation frame.
     * Multiple async transactions are merged into a single batch and applied together.
     * The returned promise resolves with the merged result when the batch is flushed.
     */
    applyTransactionAsync: (tx: DataTableTransaction<TData>, undoable?: boolean) => Promise<DataTableTransactionResult<TData>>;
    /** Immediately flush all queued async transactions. No-op if the queue is empty. */
    flushAsyncTransactions: () => void;
    /** Get a snapshot of the current row data */
    getRowData: () => TData[];
    /** Get the currently selected rows */
    getSelectedRows: () => TData[];
    /** Replace all data */
    setData: (data: TData[]) => void;
}

/**
 * Options for the useDataTableData hook.
 */
export interface UseDataTableDataOptions<TData> {
    /** Initial data to seed the internal state */
    initialData?: TData[];
    /** Produces a unique string ID for each row. Required for update/remove matching. */
    getRowId: (row: TData, index: number) => string;
    /** Called after every transaction or setData with the new data and the transaction (if applicable) */
    onDataChange?: (data: TData[], tx?: DataTableTransaction<TData>) => void;
    /** Called after a batch of async transactions is flushed */
    onAsyncTransactionsFlushed?: (event: AsyncTransactionsFlushedEvent<TData>) => void;
    /**
     * Scheduler function used to defer async transaction flushes.
     * Receives a callback and should invoke it at the desired time.
     * @default requestAnimationFrame
     */
    asyncScheduler?: (callback: () => void) => void;
}

/**
 * Return type of the useDataTableData hook.
 */
export interface UseDataTableDataReturn<TData> {
    /** Current data array — pass to DataTable's `data` prop */
    data: TData[];
    /** Apply an undoable batch mutation (add / update / remove) */
    applyTransaction(tx: DataTableTransaction<TData>, undoable: true): UndoableDataTableTransactionResult<TData>;
    /** Apply a batch mutation (add / update / remove) */
    applyTransaction(tx: DataTableTransaction<TData>, undoable?: false): DataTableTransactionResult<TData>;
    /**
     * Queue a transaction to be applied asynchronously in the next animation frame.
     * Multiple async transactions are merged and applied in a single batch.
     * The returned promise resolves with the merged result when the batch is flushed.
     */
    applyTransactionAsync: (tx: DataTableTransaction<TData>, undoable?: boolean) => Promise<DataTableTransactionResult<TData>>;
    /** Immediately flush all queued async transactions. No-op if the queue is empty. */
    flushAsyncTransactions: () => void;
    /** Replace all data */
    setData: (data: TData[]) => void;
    /** Read current snapshot of data */
    getRowData: () => TData[];
}
