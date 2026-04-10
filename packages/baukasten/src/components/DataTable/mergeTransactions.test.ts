import { describe, it, expect } from 'vitest';
import { mergeTransactions } from './mergeTransactions';

interface TestRow {
  id: string;
  name: string;
}

const getRowId = (row: TestRow) => row.id;

describe('mergeTransactions', () => {
  it('returns undefined for an empty queue', () => {
    expect(mergeTransactions([], getRowId)).toBeUndefined();
  });

  it('returns the single transaction as-is for a queue of one', () => {
    const tx = { add: [{ id: '1', name: 'Alice' }] };
    expect(mergeTransactions([tx], getRowId)).toBe(tx);
  });

  it('concatenates adds in order', () => {
    const merged = mergeTransactions(
      [
        { add: [{ id: '1', name: 'Alice' }] },
        { add: [{ id: '2', name: 'Bob' }] },
      ],
      getRowId
    );
    expect(merged!.add).toEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ]);
  });

  it('uses first non-undefined addIndex', () => {
    const merged = mergeTransactions(
      [
        { add: [{ id: '1', name: 'Alice' }] },
        { add: [{ id: '2', name: 'Bob' }], addIndex: 5 },
        { add: [{ id: '3', name: 'Carol' }], addIndex: 10 },
      ],
      getRowId
    );
    expect(merged!.addIndex).toBe(5);
  });

  it('deduplicates updates — last write wins', () => {
    const merged = mergeTransactions(
      [
        { update: [{ id: '1', name: 'Alice v1' }] },
        { update: [{ id: '1', name: 'Alice v2' }] },
      ],
      getRowId
    );
    expect(merged!.update).toEqual([{ id: '1', name: 'Alice v2' }]);
  });

  it('deduplicates removes by ID', () => {
    const merged = mergeTransactions(
      [
        { remove: [{ id: '1', name: 'Alice' }] },
        { remove: [{ id: '1', name: 'Alice' }] },
        { remove: [{ id: '2', name: 'Bob' }] },
      ],
      getRowId
    );
    expect(merged!.remove).toHaveLength(2);
    const removeIds = merged!.remove!.map((r) => r.id);
    expect(removeIds).toContain('1');
    expect(removeIds).toContain('2');
  });

  it('drops updates for rows that are also removed', () => {
    const merged = mergeTransactions(
      [
        { update: [{ id: '1', name: 'Alice Updated' }] },
        { remove: [{ id: '1', name: 'Alice' }] },
      ],
      getRowId
    );
    expect(merged!.update).toBeUndefined();
    expect(merged!.remove).toEqual([{ id: '1', name: 'Alice' }]);
  });

  it('merges all operation types together', () => {
    const merged = mergeTransactions(
      [
        {
          add: [{ id: '3', name: 'Carol' }],
          update: [{ id: '1', name: 'Alice Updated' }],
          remove: [{ id: '2', name: 'Bob' }],
        },
        {
          add: [{ id: '4', name: 'Dave' }],
          update: [{ id: '5', name: 'Eve Updated' }],
        },
      ],
      getRowId
    );
    expect(merged!.add).toEqual([
      { id: '3', name: 'Carol' },
      { id: '4', name: 'Dave' },
    ]);
    expect(merged!.update).toEqual([
      { id: '1', name: 'Alice Updated' },
      { id: '5', name: 'Eve Updated' },
    ]);
    expect(merged!.remove).toEqual([{ id: '2', name: 'Bob' }]);
  });

  it('returns empty-ish transaction when all ops cancel out', () => {
    // Only an update for a row that is also removed → update is dropped
    const merged = mergeTransactions(
      [
        { update: [{ id: '1', name: 'will be dropped' }] },
        { remove: [{ id: '1', name: 'removed' }] },
      ],
      getRowId
    );
    expect(merged!.add).toBeUndefined();
    expect(merged!.update).toBeUndefined();
    expect(merged!.remove).toEqual([{ id: '1', name: 'removed' }]);
  });

  it('handles transactions with only removes', () => {
    const merged = mergeTransactions(
      [
        { remove: [{ id: '1', name: 'A' }] },
        { remove: [{ id: '2', name: 'B' }] },
      ],
      getRowId
    );
    expect(merged!.add).toBeUndefined();
    expect(merged!.update).toBeUndefined();
    expect(merged!.remove).toHaveLength(2);
  });

  it('preserves addIndex=0 as first non-undefined value', () => {
    const merged = mergeTransactions(
      [
        { add: [{ id: '1', name: 'A' }], addIndex: 0 },
        { add: [{ id: '2', name: 'B' }], addIndex: 5 },
      ],
      getRowId
    );
    expect(merged!.addIndex).toBe(0);
  });
});
