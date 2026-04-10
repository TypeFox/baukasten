import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDataTableData, applyDataTransaction } from './useDataTableData';
import type { UndoableDataTableTransactionResult } from './DataTable.types';

// ─── Test data helpers ───────────────────────────────────────────────

interface Person {
    id: string;
    name: string;
    age: number;
}

const getRowId = (row: Person) => row.id;

const alice: Person = { id: '1', name: 'Alice', age: 30 };
const bob: Person = { id: '2', name: 'Bob', age: 25 };
const charlie: Person = { id: '3', name: 'Charlie', age: 35 };
const diana: Person = { id: '4', name: 'Diana', age: 28 };

const initialPeople = [alice, bob, charlie];

// ─── Pure function: applyDataTransaction ─────────────────────────────

describe('applyDataTransaction (pure)', () => {
    it('adds rows at the end by default', () => {
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { add: [diana] },
            getRowId
        );

        expect(nextData).toEqual([alice, bob, charlie, diana]);
        expect(result.add).toEqual([diana]);
        expect(result.update).toEqual([]);
        expect(result.remove).toEqual([]);
        expect(result.warnings).toEqual([]);
    });

    it('adds rows at a specific index', () => {
        const { nextData } = applyDataTransaction(
            initialPeople,
            { add: [diana], addIndex: 1 },
            getRowId
        );

        expect(nextData).toEqual([alice, diana, bob, charlie]);
    });

    it('clamps addIndex to 0 when negative', () => {
        const { nextData } = applyDataTransaction(
            initialPeople,
            { add: [diana], addIndex: -5 },
            getRowId
        );

        expect(nextData[0]).toEqual(diana);
    });

    it('clamps addIndex to array length when too large', () => {
        const { nextData } = applyDataTransaction(
            initialPeople,
            { add: [diana], addIndex: 999 },
            getRowId
        );

        expect(nextData[nextData.length - 1]).toEqual(diana);
    });

    it('adds multiple rows at once', () => {
        const eve: Person = { id: '5', name: 'Eve', age: 22 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { add: [diana, eve] },
            getRowId
        );

        expect(nextData).toHaveLength(5);
        expect(result.add).toEqual([diana, eve]);
    });

    it('removes a row by id', () => {
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { remove: [{ id: '2', name: '', age: 0 }] },
            getRowId
        );

        expect(nextData).toEqual([alice, charlie]);
        expect(result.remove).toEqual([bob]);
    });

    it('removes multiple rows', () => {
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { remove: [alice, charlie] },
            getRowId
        );

        expect(nextData).toEqual([bob]);
        expect(result.remove).toHaveLength(2);
    });

    it('warns when removing a row that does not exist', () => {
        const ghost: Person = { id: '999', name: 'Ghost', age: 0 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { remove: [ghost] },
            getRowId
        );

        expect(nextData).toEqual(initialPeople);
        expect(result.remove).toEqual([]);
        expect(result.warnings).toEqual([
            { type: 'remove-not-found', row: ghost, id: '999' },
        ]);
    });

    it('updates a row by id', () => {
        const updatedBob: Person = { id: '2', name: 'Bob Updated', age: 26 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { update: [updatedBob] },
            getRowId
        );

        expect(nextData[1]).toEqual(updatedBob);
        expect(result.update).toEqual([updatedBob]);
    });

    it('updates multiple rows', () => {
        const updatedAlice: Person = { id: '1', name: 'Alice V2', age: 31 };
        const updatedCharlie: Person = { id: '3', name: 'Charlie V2', age: 36 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { update: [updatedAlice, updatedCharlie] },
            getRowId
        );

        expect(nextData[0]).toEqual(updatedAlice);
        expect(nextData[2]).toEqual(updatedCharlie);
        expect(result.update).toHaveLength(2);
    });

    it('warns when updating a row that does not exist', () => {
        const ghost: Person = { id: '999', name: 'Ghost', age: 0 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            { update: [ghost] },
            getRowId
        );

        expect(nextData).toEqual(initialPeople);
        expect(result.update).toEqual([]);
        expect(result.warnings).toEqual([
            { type: 'update-not-found', row: ghost, id: '999' },
        ]);
    });

    it('processes in order: remove → update → add', () => {
        const updatedAlice: Person = { id: '1', name: 'Alice V2', age: 31 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            {
                remove: [bob],
                update: [updatedAlice],
                add: [diana],
            },
            getRowId
        );

        // After remove: [alice, charlie]
        // After update: [aliceV2, charlie]
        // After add:    [aliceV2, charlie, diana]
        expect(nextData).toEqual([updatedAlice, charlie, diana]);
        expect(result.remove).toEqual([bob]);
        expect(result.update).toEqual([updatedAlice]);
        expect(result.add).toEqual([diana]);
        expect(result.warnings).toEqual([]);
    });

    it('warns when updating a row that was removed in the same transaction', () => {
        const updatedBob: Person = { id: '2', name: 'Bob Updated', age: 26 };
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            {
                remove: [bob],
                update: [updatedBob],
            },
            getRowId
        );

        // Bob was removed, so update should produce a warning
        expect(nextData).toEqual([alice, charlie]);
        expect(result.remove).toEqual([bob]);
        expect(result.update).toEqual([]);
        expect(result.warnings).toEqual([
            { type: 'update-not-found', row: updatedBob, id: '2' },
        ]);
    });

    it('does not mutate the original data array', () => {
        const original = [...initialPeople];
        const frozen = [...initialPeople];

        applyDataTransaction(original, { add: [diana], remove: [bob] }, getRowId);

        expect(original).toEqual(frozen);
    });

    it('handles empty transaction gracefully', () => {
        const { nextData, result } = applyDataTransaction(
            initialPeople,
            {},
            getRowId
        );

        expect(nextData).toEqual(initialPeople);
        expect(result.add).toEqual([]);
        expect(result.update).toEqual([]);
        expect(result.remove).toEqual([]);
        expect(result.warnings).toEqual([]);
    });

    it('handles empty data array', () => {
        const { nextData, result } = applyDataTransaction(
            [],
            { add: [alice, bob] },
            getRowId
        );

        expect(nextData).toEqual([alice, bob]);
        expect(result.add).toEqual([alice, bob]);
    });

    it('add at index 0 inserts at the beginning', () => {
        const { nextData } = applyDataTransaction(
            initialPeople,
            { add: [diana], addIndex: 0 },
            getRowId
        );

        expect(nextData[0]).toEqual(diana);
        expect(nextData).toHaveLength(4);
    });
});

// ─── Hook: useDataTableData ──────────────────────────────────────────

describe('useDataTableData', () => {
    it('initializes with provided data', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        expect(result.current.data).toEqual(initialPeople);
        expect(result.current.getRowData()).toEqual(initialPeople);
    });

    it('defaults to empty array when initialData is omitted', () => {
        const { result } = renderHook(() =>
            useDataTableData({ getRowId })
        );

        expect(result.current.data).toEqual([]);
    });

    it('applyTransaction adds rows and triggers re-render', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        let txResult: ReturnType<typeof result.current.applyTransaction>;
        act(() => {
            txResult = result.current.applyTransaction({ add: [diana] });
        });

        expect(result.current.data).toEqual([...initialPeople, diana]);
        expect(txResult!.add).toEqual([diana]);
    });

    it('applyTransaction removes rows', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        act(() => {
            result.current.applyTransaction({ remove: [bob] });
        });

        expect(result.current.data).toEqual([alice, charlie]);
    });

    it('applyTransaction updates rows', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        const updatedBob: Person = { id: '2', name: 'Bob V2', age: 99 };
        act(() => {
            result.current.applyTransaction({ update: [updatedBob] });
        });

        expect(result.current.data[1]).toEqual(updatedBob);
    });

    it('applyTransaction handles combined add/update/remove', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        const updatedAlice: Person = { id: '1', name: 'Alice V2', age: 31 };

        act(() => {
            result.current.applyTransaction({
                remove: [charlie],
                update: [updatedAlice],
                add: [diana],
            });
        });

        expect(result.current.data).toEqual([updatedAlice, bob, diana]);
    });

    it('undo reverts the last transaction', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        let txResult: UndoableDataTableTransactionResult<Person>;
        act(() => {
            txResult = result.current.applyTransaction({ remove: [bob], add: [diana] }, true);
        });

        expect(result.current.data).toEqual([alice, charlie, diana]);

        act(() => {
            txResult!.undo();
        });

        expect(result.current.data).toEqual(initialPeople);
    });

    it('multiple transactions can be undone independently', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        let tx1Result: UndoableDataTableTransactionResult<Person>;
        let tx2Result: UndoableDataTableTransactionResult<Person>;

        act(() => {
            tx1Result = result.current.applyTransaction({ add: [diana] }, true);
        });
        act(() => {
            const eve: Person = { id: '5', name: 'Eve', age: 22 };
            tx2Result = result.current.applyTransaction({ add: [eve] }, true);
        });

        expect(result.current.data).toHaveLength(5);

        // Undo tx2 — reverts to state after tx1
        act(() => {
            tx2Result!.undo();
        });

        expect(result.current.data).toEqual([...initialPeople, diana]);

        // Undo tx1 — reverts to initial
        act(() => {
            tx1Result!.undo();
        });

        expect(result.current.data).toEqual(initialPeople);
    });

    it('non-undoable applyTransaction does not return undo', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        let txResult: ReturnType<typeof result.current.applyTransaction> | undefined;
        act(() => {
            txResult = result.current.applyTransaction({ add: [diana] });
        });

        expect(result.current.data).toEqual([...initialPeople, diana]);
        expect(txResult!.add).toEqual([diana]);
        // undo should not be present when undoable is not set
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((txResult as any).undo).toBeUndefined();
    });

    it('setData replaces all data', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        const newData = [diana];
        act(() => {
            result.current.setData(newData);
        });

        expect(result.current.data).toEqual(newData);
        expect(result.current.getRowData()).toEqual(newData);
    });

    it('calls onDataChange after applyTransaction', () => {
        const onDataChange = vi.fn();
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId, onDataChange })
        );

        act(() => {
            result.current.applyTransaction({ add: [diana] });
        });

        expect(onDataChange).toHaveBeenCalledTimes(1);
        expect(onDataChange).toHaveBeenCalledWith(
            [...initialPeople, diana],
            { add: [diana] }
        );
    });

    it('calls onDataChange after setData', () => {
        const onDataChange = vi.fn();
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId, onDataChange })
        );

        const newData = [diana];
        act(() => {
            result.current.setData(newData);
        });

        expect(onDataChange).toHaveBeenCalledTimes(1);
        expect(onDataChange).toHaveBeenCalledWith(newData);
    });

    it('calls onDataChange after undo', () => {
        const onDataChange = vi.fn();
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId, onDataChange })
        );

        let txResult: UndoableDataTableTransactionResult<Person>;
        act(() => {
            txResult = result.current.applyTransaction({ remove: [bob] }, true);
        });

        onDataChange.mockClear();

        act(() => {
            txResult!.undo();
        });

        expect(onDataChange).toHaveBeenCalledTimes(1);
        expect(onDataChange).toHaveBeenCalledWith(initialPeople);
    });

    it('getRowData returns current data without re-render', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        act(() => {
            result.current.applyTransaction({ add: [diana] });
        });

        // getRowData should reflect the latest state synchronously
        expect(result.current.getRowData()).toEqual([...initialPeople, diana]);
    });

    it('returns warnings for unmatched update/remove rows', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: initialPeople, getRowId })
        );

        const ghost: Person = { id: '999', name: 'Ghost', age: 0 };
        const phantom: Person = { id: '888', name: 'Phantom', age: 0 };

        let txResult: ReturnType<typeof result.current.applyTransaction>;
        act(() => {
            txResult = result.current.applyTransaction({
                update: [ghost],
                remove: [phantom],
            });
        });

        expect(txResult!.warnings).toHaveLength(2);
        expect(txResult!.warnings).toContainEqual({
            type: 'remove-not-found',
            row: phantom,
            id: '888',
        });
        expect(txResult!.warnings).toContainEqual({
            type: 'update-not-found',
            row: ghost,
            id: '999',
        });

        // Data should be unchanged
        expect(result.current.data).toEqual(initialPeople);
    });

    it('works with sequential transactions correctly', () => {
        const { result } = renderHook(() =>
            useDataTableData({ initialData: [alice], getRowId })
        );

        act(() => {
            result.current.applyTransaction({ add: [bob] });
        });
        act(() => {
            result.current.applyTransaction({ add: [charlie] });
        });
        act(() => {
            result.current.applyTransaction({ remove: [bob] });
        });

        expect(result.current.data).toEqual([alice, charlie]);
    });
});

// ─── Async transaction tests (hook) ───────────────────────────────────

describe('useDataTableData — applyTransactionAsync', () => {
    it('queues a transaction and flushes it via the scheduler', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = vi.fn((cb: () => void) => {
            schedulerCb = cb;
        });

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice, bob],
                getRowId,
                asyncScheduler: scheduler,
            })
        );

        let promise!: ReturnType<typeof result.current.applyTransactionAsync>;
        act(() => {
            promise = result.current.applyTransactionAsync({ add: [charlie] });
        });

        // Not yet flushed
        expect(result.current.data).toEqual([alice, bob]);
        expect(scheduler).toHaveBeenCalledTimes(1);

        // Flush
        act(() => schedulerCb!());
        const res = await promise;
        expect(result.current.data).toEqual([alice, bob, charlie]);
        expect(res.add).toEqual([charlie]);
    });

    it('merges multiple async transactions into one batch', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = vi.fn((cb: () => void) => {
            schedulerCb = cb;
        });

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice, bob],
                getRowId,
                asyncScheduler: scheduler,
            })
        );

        let p1: Promise<unknown>, p2: Promise<unknown>;
        act(() => {
            p1 = result.current.applyTransactionAsync({ add: [charlie] });
            p2 = result.current.applyTransactionAsync({
                update: [{ ...bob, name: 'Bobby' }],
            });
        });

        // Only one scheduler call despite two queued txs
        expect(scheduler).toHaveBeenCalledTimes(1);

        act(() => schedulerCb!());
        const [r1, r2] = await Promise.all([p1!, p2!]);

        // Both promises resolve with the same merged result
        expect(r1).toBe(r2);
        expect(result.current.data).toEqual([
            alice,
            { id: '2', name: 'Bobby', age: 25 },
            charlie,
        ]);
    });

    it('flushAsyncTransactions flushes immediately', async () => {
        const scheduler = vi.fn();

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice],
                getRowId,
                asyncScheduler: scheduler,
            })
        );

        let promise!: ReturnType<typeof result.current.applyTransactionAsync>;
        act(() => {
            promise = result.current.applyTransactionAsync({ add: [bob] });
        });

        // Flush manually instead of waiting for scheduler
        act(() => {
            result.current.flushAsyncTransactions();
        });

        const res = await promise;
        expect(result.current.data).toEqual([alice, bob]);
        expect(res.add).toEqual([bob]);
    });

    it('flushAsyncTransactions is a no-op when queue is empty', () => {
        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice],
                getRowId,
            })
        );

        // Should not throw
        act(() => {
            result.current.flushAsyncTransactions();
        });

        expect(result.current.data).toEqual([alice]);
    });

    it('calls onAsyncTransactionsFlushed after flush', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = (cb: () => void) => {
            schedulerCb = cb;
        };
        const onFlushed = vi.fn();

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice],
                getRowId,
                asyncScheduler: scheduler,
                onAsyncTransactionsFlushed: onFlushed,
            })
        );

        act(() => {
            result.current.applyTransactionAsync({ add: [bob] });
        });
        act(() => schedulerCb!());

        expect(onFlushed).toHaveBeenCalledTimes(1);
        const event = onFlushed.mock.calls[0][0];
        expect(event.result.add).toEqual([bob]);
        // Not undoable by default
        expect(event.undo).toBeUndefined();
    });

    it('provides undo in flush event when ALL transactions are undoable', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = (cb: () => void) => {
            schedulerCb = cb;
        };
        const onFlushed = vi.fn();

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice, bob],
                getRowId,
                asyncScheduler: scheduler,
                onAsyncTransactionsFlushed: onFlushed,
            })
        );

        act(() => {
            result.current.applyTransactionAsync({ add: [charlie] }, true);
            result.current.applyTransactionAsync({ remove: [bob] }, true);
        });
        act(() => schedulerCb!());

        const event = onFlushed.mock.calls[0][0];
        expect(event.undo).toBeTypeOf('function');
        expect(result.current.data).toEqual([alice, charlie]);

        // Undo should revert to pre-batch state
        act(() => event.undo());
        expect(result.current.data).toEqual([alice, bob]);
    });

    it('does NOT provide undo when not all transactions are undoable', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = (cb: () => void) => {
            schedulerCb = cb;
        };
        const onFlushed = vi.fn();

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice, bob],
                getRowId,
                asyncScheduler: scheduler,
                onAsyncTransactionsFlushed: onFlushed,
            })
        );

        act(() => {
            result.current.applyTransactionAsync({ add: [charlie] }, true);
            result.current.applyTransactionAsync({ remove: [bob] }, false);
        });
        act(() => schedulerCb!());

        const event = onFlushed.mock.calls[0][0];
        expect(event.undo).toBeUndefined();
    });

    it('calls onDataChange with merged transaction on flush', async () => {
        let schedulerCb: (() => void) | undefined;
        const scheduler = (cb: () => void) => {
            schedulerCb = cb;
        };
        const onDataChange = vi.fn();

        const { result } = renderHook(() =>
            useDataTableData<Person>({
                initialData: [alice],
                getRowId,
                asyncScheduler: scheduler,
                onDataChange,
            })
        );

        act(() => {
            result.current.applyTransactionAsync({ add: [bob] });
            result.current.applyTransactionAsync({ add: [charlie] });
        });
        act(() => schedulerCb!());

        expect(onDataChange).toHaveBeenCalledTimes(1);
        expect(onDataChange).toHaveBeenCalledWith(
            [alice, bob, charlie],
            expect.objectContaining({ add: [bob, charlie] })
        );
    });
});
