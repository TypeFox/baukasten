import {
    useReactTable,
    type ColumnDef,
    type Table as TanStackTable,
} from '@tanstack/react-table';
import { Checkbox } from '../Checkbox';

/**
 * Helper to create a selection column
 */
export function createSelectColumn<TData>(): ColumnDef<TData, unknown> {
    return {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                aria-label="Select all rows"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                indeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
                aria-label="Select row"
            />
        ),
        size: 40,
        enableSorting: false,
        enableResizing: false,
    };
}

/**
 * Hook to get access to the table instance
 * Useful for external control of the table
 */
export function useDataTable<TData>(
    options: Parameters<typeof useReactTable<TData>>[0]
): TanStackTable<TData> {
    return useReactTable(options);
}

// Re-export useful types from TanStack Table
export type { ColumnDef } from '@tanstack/react-table';
export type {
    SortingState,
    PaginationState,
    RowSelectionState,
    ColumnResizeMode,
    Row,
} from '@tanstack/react-table';

