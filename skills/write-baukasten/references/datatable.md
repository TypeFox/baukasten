# DataTable Reference

`DataTable` is `baukasten-ui/extra`'s most complex component — built on TanStack Table v8 with ~35 props across sorting, pagination, row selection, column resizing, global filtering, and loading/empty states. It lives in its own reference file because of its size.

**Peer dependency:** requires `@tanstack/react-table` (`npm install @tanstack/react-table`).

> **Always use semantic design tokens** (`var(--bk-*)`). See [./design-tokens.md](./design-tokens.md) for the catalog.

---

### DataTable

Advanced data table built on TanStack Table v8 with sorting, pagination, row selection, column resizing, global filtering, and loading/empty states. Requires `@tanstack/react-table` as a peer dependency.

```tsx
import { DataTable, createSelectColumn, useDataTable } from 'baukasten-ui/extra';
import type {
    DataTableProps,
    DataTableVariant,
    DataTableColumnAlign,
    ColumnDef,
    SortingState,
    PaginationState,
    RowSelectionState,
    ColumnResizeMode,
    Row,
} from 'baukasten-ui/extra';

// DataTable props (generic over row data type TData)
interface DataTableProps<TData> {
    // --- Required ---
    data: TData[];
    columns: ColumnDef<TData, unknown>[];

    // --- Appearance ---
    variant?: 'default' | 'zebra'; // default: 'default'
    size?: Size; // default: 'md'
    bordered?: boolean; // default: true
    stickyHeader?: boolean; // default: false
    maxHeight?: number | string; // scrollable container max-height
    fillHeight?: boolean; // default: false — expand to fill parent
    className?: string;
    style?: React.CSSProperties;
    'aria-label'?: string;

    // --- Sorting ---
    enableSorting?: boolean; // default: false
    enableMultiSort?: boolean; // default: false
    sorting?: SortingState; // controlled
    onSortingChange?: (sorting: SortingState) => void;

    // --- Pagination ---
    enablePagination?: boolean; // default: false
    pageSizeOptions?: number[]; // default: [10, 20, 50, 100]
    initialPageSize?: number; // default: 10
    pagination?: PaginationState; // controlled { pageIndex, pageSize }
    onPaginationChange?: (pagination: PaginationState) => void;
    manualPagination?: boolean; // default: false — for server-side pagination
    rowCount?: number; // required for manualPagination

    // --- Row Selection ---
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean); // default: false
    enableMultiRowSelection?: boolean; // default: true
    rowSelection?: RowSelectionState; // controlled { [rowId]: boolean }
    onRowSelectionChange?: (selection: RowSelectionState) => void;
    getRowId?: (row: TData, index: number) => string;

    // --- Column Resizing ---
    enableColumnResizing?: boolean; // default: false
    columnResizeMode?: ColumnResizeMode; // default: 'onChange'

    // --- Global Filter ---
    enableGlobalFilter?: boolean; // default: false
    globalFilter?: string; // controlled
    onGlobalFilterChange?: (value: string) => void;
    globalFilterPlaceholder?: string; // default: 'Search...'
    renderGlobalFilter?: (props: {
        value: string;
        onChange: (value: string) => void;
    }) => React.ReactNode;

    // --- Loading & Empty States ---
    loading?: boolean; // default: false
    loadingIndicator?: 'line' | 'spinner'; // default: 'line'
    loadingComponent?: React.ReactNode; // overrides loadingIndicator
    emptyText?: string; // default: 'No data available'
    emptyComponent?: React.ReactNode;

    // --- Interaction ---
    onRowClick?: (row: Row<TData>) => void;
}

// Helper: checkbox selection column (header = select-all, cell = per-row toggle)
// createSelectColumn<TData>(): ColumnDef<TData, unknown>

// Hook: thin wrapper around useReactTable for external table instance access
// useDataTable<TData>(options): TanStackTable<TData>

// Basic table
const columns: ColumnDef<Person>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
];
<DataTable data={people} columns={columns} />;

// Sorting + pagination
const [sorting, setSorting] = useState<SortingState>([]);
const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
<DataTable
    data={people}
    columns={columns}
    enableSorting
    sorting={sorting}
    onSortingChange={setSorting}
    enablePagination
    pagination={pagination}
    onPaginationChange={setPagination}
    variant="zebra"
    stickyHeader
    maxHeight={500}
/>;

// Row selection with checkbox column
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
const selectionColumns: ColumnDef<Person>[] = [
    createSelectColumn<Person>(),
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
];
<DataTable
    data={people}
    columns={selectionColumns}
    enableRowSelection
    rowSelection={rowSelection}
    onRowSelectionChange={setRowSelection}
    getRowId={(row) => row.email}
    enableGlobalFilter
    globalFilterPlaceholder="Search people..."
    enablePagination
    loading={isLoading}
    emptyText="No people found"
/>;
```
