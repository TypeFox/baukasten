import type { DataTableTransaction } from './DataTable.types';

/**
 * Merges multiple transactions into a single transaction.
 *
 * Merge rules:
 * - `add`: Concatenated in order
 * - `addIndex`: First non-undefined value wins
 * - `update`: Concatenated; if same ID appears multiple times, last write wins
 * - `remove`: Concatenated; deduplicated by ID
 * - If a row ID appears in both `remove` and `update`, the remove wins (update is dropped)
 *
 * @returns A single merged transaction, or `undefined` if the queue is empty.
 */
export function mergeTransactions<TData>(
  txs: DataTableTransaction<TData>[],
  getRowId: (row: TData, index: number) => string
): DataTableTransaction<TData> | undefined {
  if (txs.length === 0) return undefined;
  if (txs.length === 1) return txs[0];

  const allAdds: TData[] = [];
  let firstAddIndex: number | undefined;
  const updateMap = new Map<string, TData>(); // last write wins
  const removeMap = new Map<string, TData>(); // deduplicated by ID

  for (const tx of txs) {
    if (tx.add && tx.add.length > 0) {
      allAdds.push(...tx.add);
    }
    if (firstAddIndex === undefined && tx.addIndex !== undefined) {
      firstAddIndex = tx.addIndex;
    }
    if (tx.update && tx.update.length > 0) {
      for (const row of tx.update) {
        const id = getRowId(row, -1);
        updateMap.set(id, row);
      }
    }
    if (tx.remove && tx.remove.length > 0) {
      for (const row of tx.remove) {
        const id = getRowId(row, -1);
        removeMap.set(id, row);
      }
    }
  }

  // Drop updates for rows that are also removed
  for (const id of removeMap.keys()) {
    updateMap.delete(id);
  }

  const merged: DataTableTransaction<TData> = {};

  if (removeMap.size > 0) merged.remove = [...removeMap.values()];
  if (updateMap.size > 0) merged.update = [...updateMap.values()];
  if (allAdds.length > 0) {
    merged.add = allAdds;
    if (firstAddIndex !== undefined) merged.addIndex = firstAddIndex;
  }

  return merged;
}
