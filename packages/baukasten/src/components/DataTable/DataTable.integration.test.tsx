import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useRef } from 'react';
import { DataTable } from './DataTable';
import type { DataTableRef } from './DataTable.types';
import type { ColumnDef } from './DataTable.utils';

// ─── Test data ────────────────────────────────────────────────────────────────

interface Person {
  id: string;
  name: string;
  role: string;
}

const columns: ColumnDef<Person, unknown>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
];

const alice: Person = { id: '1', name: 'Alice', role: 'Admin' };
const bob: Person = { id: '2', name: 'Bob', role: 'Developer' };
const charlie: Person = { id: '3', name: 'Charlie', role: 'Designer' };

const initialPeople = [alice, bob, charlie];

// ─── Controlled mode ──────────────────────────────────────────────────────────

describe('DataTable — controlled mode (data prop)', () => {
  it('renders rows from data prop', () => {
    render(<DataTable data={initialPeople} columns={columns} aria-label="test table" />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('updates when data prop changes', () => {
    const { rerender } = render(
      <DataTable data={initialPeople} columns={columns} aria-label="test table" />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();

    const diana: Person = { id: '4', name: 'Diana', role: 'Manager' };
    rerender(<DataTable data={[diana]} columns={columns} aria-label="test table" />);

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Diana')).toBeInTheDocument();
  });

  it('renders empty state when data is empty', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        emptyText="No results found"
        aria-label="test table"
      />
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('warns and does not throw when applyTransaction is called in controlled mode', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button onClick={() => ref.current?.applyTransaction({ add: [alice] })}>
            Apply
          </button>
          <DataTable
            ref={ref}
            data={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);
    act(() => {
      screen.getByRole('button', { name: 'Apply' }).click();
    });

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('controlled mode'));
    warnSpy.mockRestore();
  });
});

// ─── Managed mode ─────────────────────────────────────────────────────────────

describe('DataTable — managed mode (initialData + ref)', () => {
  it('renders rows from initialData', () => {
    render(
      <DataTable
        initialData={initialPeople}
        columns={columns}
        getRowId={(r) => r.id}
        aria-label="test table"
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('ref.applyTransaction({ add }) adds a row to the DOM', async () => {
    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.applyTransaction({
                add: [{ id: '4', name: 'Diana', role: 'Manager' }],
              })
            }
          >
            Add Diana
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.queryByText('Diana')).not.toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Add Diana' }).click();
    });

    expect(screen.getByText('Diana')).toBeInTheDocument();
  });

  it('ref.applyTransaction({ remove }) removes a row from the DOM', () => {
    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.applyTransaction({ remove: [alice] })
            }
          >
            Remove Alice
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Alice')).toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Remove Alice' }).click();
    });

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('ref.applyTransaction({ update }) updates a row in the DOM', () => {
    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.applyTransaction({
                update: [{ id: '2', name: 'Bob Updated', role: 'Tech Lead' }],
              })
            }
          >
            Update Bob
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Bob')).toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Update Bob' }).click();
    });

    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Updated')).toBeInTheDocument();
    expect(screen.getByText('Tech Lead')).toBeInTheDocument();
  });

  it('ref.applyTransaction returns undo that reverts the DOM', () => {
    let undoFn: (() => void) | undefined;

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() => {
              const result = ref.current?.applyTransaction({ remove: [alice] }, true);
              undoFn = result?.undo;
            }}
          >
            Remove Alice
          </button>
          <button onClick={() => undoFn?.()}>Undo</button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByRole('button', { name: 'Remove Alice' }).click();
    });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Undo' }).click();
    });
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('ref.setData replaces all rows in the DOM', () => {
    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.setData([
                { id: '10', name: 'Xavier', role: 'CTO' },
              ])
            }
          >
            Replace data
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Alice')).toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Replace data' }).click();
    });

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Xavier')).toBeInTheDocument();
  });

  it('ref.getRowData returns current data snapshot', () => {
    let snapshot: Person[] = [];

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() => {
              ref.current?.applyTransaction({
                add: [{ id: '4', name: 'Diana', role: 'Manager' }],
              });
              snapshot = ref.current?.getRowData() ?? [];
            }}
          >
            Add and snapshot
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByRole('button', { name: 'Add and snapshot' }).click();
    });

    expect(snapshot).toHaveLength(4);
    expect(snapshot[3].name).toBe('Diana');
  });

  it('onDataChange is called after applyTransaction', () => {
    const onDataChange = vi.fn();

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.applyTransaction({
                add: [{ id: '4', name: 'Diana', role: 'Manager' }],
              })
            }
          >
            Add
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
            onDataChange={onDataChange}
          />
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByRole('button', { name: 'Add' }).click();
    });

    expect(onDataChange).toHaveBeenCalledTimes(1);
    const [data, tx] = onDataChange.mock.calls[0];
    expect(data).toHaveLength(4);
    expect(tx?.add).toHaveLength(1);
  });

  it('renders empty state when initialData is empty', () => {
    render(
      <DataTable
        initialData={[]}
        columns={columns}
        getRowId={(r) => r.id}
        emptyText="No people yet"
      />
    );
    expect(screen.getByText('No people yet')).toBeInTheDocument();
  });

  it('combined transaction: remove + update + add updates the DOM correctly', () => {
    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <div>
          <button
            onClick={() =>
              ref.current?.applyTransaction({
                remove: [charlie],
                update: [{ id: '1', name: 'Alice V2', role: 'CTO' }],
                add: [{ id: '4', name: 'Diana', role: 'Manager' }],
              })
            }
          >
            Combined
          </button>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
          />
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByRole('button', { name: 'Combined' }).click();
    });

    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();  // removed
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();    // updated
    expect(screen.getByText('Alice V2')).toBeInTheDocument();       // updated value
    expect(screen.getByText('Diana')).toBeInTheDocument();           // added
    expect(screen.getByText('Bob')).toBeInTheDocument();             // untouched
  });
});

// ─── Managed mode: async transactions ─────────────────────────────────────────

describe('DataTable — managed mode: async transactions via ref', () => {
  it('applyTransactionAsync queues and flushes via the scheduler', async () => {
    let schedulerCb: (() => void) | undefined;
    const scheduler = vi.fn((cb: () => void) => {
      schedulerCb = cb;
    });
    const diana: Person = { id: '4', name: 'Diana', role: 'Manager' };

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
            asyncScheduler={scheduler}
          />
          <button
            onClick={() => {
              ref.current?.applyTransactionAsync({ add: [diana] });
            }}
          >
            Add Async
          </button>
        </>
      );
    };

    render(<TestComponent />);
    expect(screen.queryByText('Diana')).not.toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Add Async' }).click();
    });
    // Not yet flushed
    expect(screen.queryByText('Diana')).not.toBeInTheDocument();
    expect(scheduler).toHaveBeenCalledTimes(1);

    // Flush
    act(() => schedulerCb!());
    expect(screen.getByText('Diana')).toBeInTheDocument();
  });

  it('flushAsyncTransactions via ref flushes immediately', async () => {
    const scheduler = vi.fn(); // never calls back
    const diana: Person = { id: '4', name: 'Diana', role: 'Manager' };

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
            asyncScheduler={scheduler}
          />
          <button onClick={() => ref.current?.applyTransactionAsync({ add: [diana] })}>
            Add Async
          </button>
          <button onClick={() => ref.current?.flushAsyncTransactions()}>
            Flush
          </button>
        </>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByRole('button', { name: 'Add Async' }).click();
    });
    expect(screen.queryByText('Diana')).not.toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Flush' }).click();
    });
    expect(screen.getByText('Diana')).toBeInTheDocument();
  });

  it('onAsyncTransactionsFlushed is called after flush with undo when all undoable', () => {
    let schedulerCb: (() => void) | undefined;
    const scheduler = (cb: () => void) => {
      schedulerCb = cb;
    };
    const onFlushed = vi.fn();

    const TestComponent = () => {
      const ref = useRef<DataTableRef<Person>>(null);
      return (
        <>
          <DataTable
            ref={ref}
            initialData={initialPeople}
            columns={columns}
            getRowId={(r) => r.id}
            asyncScheduler={scheduler}
            onAsyncTransactionsFlushed={onFlushed}
          />
          <button
            onClick={() => {
              ref.current?.applyTransactionAsync({ remove: [charlie] }, true);
            }}
          >
            Remove Async
          </button>
        </>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: 'Remove Async' }).click();
    });
    act(() => schedulerCb!());

    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    expect(onFlushed).toHaveBeenCalledTimes(1);
    const event = onFlushed.mock.calls[0][0];
    expect(event.result.remove).toHaveLength(1);
    expect(event.undo).toBeTypeOf('function');

    // Undo
    act(() => event.undo());
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });
});
