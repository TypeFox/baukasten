import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type PaginationState,
    type RowSelectionState,
    type ColumnResizeMode,
    type Row,
    type Header,
    type Cell,
} from '@tanstack/react-table';
import { type Size } from '../../styles';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select } from '../Select';
import { Spinner } from '../Spinner';
import * as styles from './DataTable.css';

/**
 * Table variant options
 */
export type DataTableVariant = 'default' | 'zebra';

/**
 * Column alignment
 */
export type DataTableColumnAlign = 'left' | 'center' | 'right';


/**
 * DataTable component props
 */
export interface DataTableProps<TData> {
    /**
     * Data array to display
     */
    data: TData[];

    /**
     * Column definitions
     */
    columns: ColumnDef<TData, unknown>[];

    /**
     * Visual variant of the table
     * @default 'default'
     */
    variant?: DataTableVariant;

    /**
     * Size of the table cells
     * @default 'md'
     */
    size?: Size;

    /**
     * Whether to show borders
     * @default true
     */
    bordered?: boolean;

    /**
     * Enable row selection
     * @default false
     */
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean);

    /**
     * Enable multi-row selection
     * @default true
     */
    enableMultiRowSelection?: boolean;

    /**
     * Controlled row selection state
     */
    rowSelection?: RowSelectionState;

    /**
     * Callback when row selection changes
     */
    onRowSelectionChange?: (selection: RowSelectionState) => void;

    /**
     * Enable sorting
     * @default false
     */
    enableSorting?: boolean;

    /**
     * Enable multi-column sorting
     * @default false
     */
    enableMultiSort?: boolean;

    /**
     * Controlled sorting state
     */
    sorting?: SortingState;

    /**
     * Callback when sorting changes
     */
    onSortingChange?: (sorting: SortingState) => void;

    /**
     * Enable pagination
     * @default false
     */
    enablePagination?: boolean;

    /**
     * Page size options for pagination
     * @default [10, 20, 50, 100]
     */
    pageSizeOptions?: number[];

    /**
     * Initial page size
     * @default 10
     */
    initialPageSize?: number;

    /**
     * Controlled pagination state
     */
    pagination?: PaginationState;

    /**
     * Callback when pagination changes
     */
    onPaginationChange?: (pagination: PaginationState) => void;

    /**
     * Total row count (for server-side pagination)
     */
    rowCount?: number;

    /**
     * Enable manual pagination (server-side)
     * @default false
     */
    manualPagination?: boolean;

    /**
     * Enable column resizing
     * @default false
     */
    enableColumnResizing?: boolean;

    /**
     * Column resize mode
     * @default 'onChange'
     */
    columnResizeMode?: ColumnResizeMode;

    /**
     * Enable global filtering
     * @default false
     */
    enableGlobalFilter?: boolean;

    /**
     * Global filter value
     */
    globalFilter?: string;

    /**
     * Callback when global filter changes
     */
    onGlobalFilterChange?: (value: string) => void;

    /**
     * Placeholder for global filter input
     * @default 'Search...'
     */
    globalFilterPlaceholder?: string;

    /**
     * Whether the table has sticky headers
     * @default false
     */
    stickyHeader?: boolean;

    /**
     * Max height for scrollable table
     */
    maxHeight?: number | string;

    /**
     * Whether the table should fill parent height and become scrollable
     * When enabled, the table expands to fill available space and scrolls if content exceeds.
     * Pagination stays fixed at the bottom.
     * @default false
     */
    fillHeight?: boolean;

    /**
     * Whether the table is loading
     * @default false
     */
    loading?: boolean;

    /**
     * Loading indicator style
     * @default 'line'
     */
    loadingIndicator?: 'line' | 'spinner';

    /**
     * Custom loading component (overrides loadingIndicator)
     */
    loadingComponent?: React.ReactNode;

    /**
     * Empty state text
     * @default 'No data available'
     */
    emptyText?: string;

    /**
     * Custom empty state component
     */
    emptyComponent?: React.ReactNode;

    /**
     * Row ID accessor (for selection state)
     */
    getRowId?: (row: TData, index: number) => string;

    /**
     * Callback when a row is clicked
     */
    onRowClick?: (row: Row<TData>) => void;

    /**
     * CSS class name
     */
    className?: string;

    /**
     * Inline styles
     */
    style?: React.CSSProperties;

    /**
     * Accessible label for the table
     */
    'aria-label'?: string;
}

/**
 * DataTable component using TanStack Table
 *
 * A powerful, feature-rich table component built on TanStack Table (React Table v8).
 * Supports sorting, pagination, row selection, column resizing, and more.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 *   { accessorKey: 'role', header: 'Role' },
 * ];
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   enableSorting
 *   enablePagination
 * />
 * ```
 */
export function DataTable<TData>({
    data,
    columns,
    variant = 'default',
    size = 'md',
    bordered = true,
    enableRowSelection = false,
    enableMultiRowSelection = true,
    rowSelection: controlledRowSelection,
    onRowSelectionChange,
    enableSorting = false,
    enableMultiSort = false,
    sorting: controlledSorting,
    onSortingChange,
    enablePagination = false,
    pageSizeOptions = [10, 20, 50, 100],
    initialPageSize = 10,
    pagination: controlledPagination,
    onPaginationChange,
    rowCount,
    manualPagination = false,
    enableColumnResizing = false,
    columnResizeMode = 'onChange',
    enableGlobalFilter = false,
    globalFilter: controlledGlobalFilter,
    onGlobalFilterChange,
    globalFilterPlaceholder = 'Search...',
    stickyHeader = false,
    maxHeight,
    fillHeight = false,
    loading = false,
    loadingIndicator = 'line',
    loadingComponent,
    emptyText = 'No data available',
    emptyComponent,
    getRowId,
    onRowClick,
    className,
    style,
    'aria-label': ariaLabel,
}: DataTableProps<TData>) {
    // Internal state for uncontrolled mode
    const [internalSorting, setInternalSorting] = useState<SortingState>([]);
    const [internalPagination, setInternalPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });
    const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
    const [internalGlobalFilter, setInternalGlobalFilter] = useState('');

    // Use controlled or internal state
    const sorting = controlledSorting ?? internalSorting;
    const pagination = controlledPagination ?? internalPagination;
    const rowSelectionState = controlledRowSelection ?? internalRowSelection;
    const globalFilterValue = controlledGlobalFilter ?? internalGlobalFilter;

    // Create the table instance
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination: enablePagination ? pagination : undefined,
            rowSelection: rowSelectionState,
            globalFilter: globalFilterValue,
        },
        enableRowSelection,
        enableMultiRowSelection,
        onRowSelectionChange: (updater) => {
            const newSelection = typeof updater === 'function' ? updater(rowSelectionState) : updater;
            setInternalRowSelection(newSelection);
            onRowSelectionChange?.(newSelection);
        },
        enableSorting,
        enableMultiSort,
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            setInternalSorting(newSorting);
            onSortingChange?.(newSorting);
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
            setInternalPagination(newPagination);
            onPaginationChange?.(newPagination);
        },
        onGlobalFilterChange: (updater) => {
            const newFilter = typeof updater === 'function' ? updater(globalFilterValue) : updater;
            setInternalGlobalFilter(newFilter);
            onGlobalFilterChange?.(newFilter);
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: enablePagination && !manualPagination ? getPaginationRowModel() : undefined,
        getFilteredRowModel: enableGlobalFilter ? getFilteredRowModel() : undefined,
        manualPagination,
        rowCount,
        getRowId,
        columnResizeMode,
        enableColumnResizing,
    });

    // Pagination info (only computed when pagination is enabled)
    const paginationState = table.getState().pagination;
    const pageCount = enablePagination ? table.getPageCount() : 1;
    const currentPage = paginationState?.pageIndex ?? 0;
    const currentPageSize = paginationState?.pageSize ?? initialPageSize;
    const totalRows = manualPagination ? (rowCount ?? 0) : table.getFilteredRowModel().rows.length;

    // Calculate displayed rows range
    const startRow = enablePagination ? currentPage * currentPageSize + 1 : 1;
    const endRow = enablePagination ? Math.min((currentPage + 1) * currentPageSize, totalRows) : totalRows;

    // Container style with maxHeight
    const containerStyle: React.CSSProperties = maxHeight
        ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
        : {};

    const renderHeaderCell = (header: Header<TData, unknown>) => {
        const isSorted = header.column.getIsSorted();
        const canSort = header.column.getCanSort();
        const canResize = header.column.getCanResize();

        return (
            <th
                key={header.id}
                className={styles.tableHeaderCell({
                    align: (header.column.columnDef.meta as { align?: DataTableColumnAlign })?.align ?? 'left',
                    bordered,
                    size,
                    sortable: canSort,
                    resizable: canResize,
                })}
                style={{
                    width: header.getSize(),
                }}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                colSpan={header.colSpan}
            >
                <div className={styles.headerContent}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    {canSort && (
                        <span className={styles.sortIndicator({ active: !!isSorted })}>
                            {isSorted === 'asc' ? '▲' : isSorted === 'desc' ? '▼' : '▲'}
                        </span>
                    )}
                </div>
                {canResize && (
                    <div
                        className={styles.resizer({
                            isResizing: header.column.getIsResizing(),
                        })}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                    />
                )}
            </th>
        );
    };

    const renderCell = (cell: Cell<TData, unknown>) => {
        return (
            <td
                key={cell.id}
                className={styles.tableCell({
                    align: (cell.column.columnDef.meta as { align?: DataTableColumnAlign })?.align ?? 'left',
                    bordered,
                    size,
                })}
                style={{
                    width: cell.column.getSize(),
                }}
            >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
        );
    };

    const rows = table.getRowModel().rows;
    const isEmpty = rows.length === 0 && !loading;

    return (
        <div className={`${styles.dataTableWrapper({ fillHeight })} ${className ?? ''}`} style={style}>
            {/* Toolbar with global filter */}
            {enableGlobalFilter && (
                <div className={styles.toolbar}>
                    <Label size="sm">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input
                            placeholder={globalFilterPlaceholder}
                            value={globalFilterValue}
                            onChange={(e) => {
                                const value = e.target.value;
                                setInternalGlobalFilter(value);
                                onGlobalFilterChange?.(value);
                            }}
                            size="sm"
                        />
                    </Label>
                </div>
            )}

            {/* Table container */}
            <div
                className={styles.tableContainer({ bordered, fillHeight })}
                style={{ ...containerStyle, position: 'relative' }}
            >
                {/* Spinner overlay */}
                {loading && (loadingIndicator === 'spinner' || loadingComponent) && (
                    <div className={styles.loadingOverlay}>
                        {loadingComponent ?? <Spinner size="lg" />}
                    </div>
                )}

                <table
                    className={styles.table({ fullWidth: true })}
                    aria-label={ariaLabel}
                    style={{
                        tableLayout: enableColumnResizing ? 'fixed' : undefined,
                    }}
                >
                    <thead className={styles.tableHead({ sticky: stickyHeader })}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(renderHeaderCell)}
                            </tr>
                        ))}
                        {/* Loading line indicator - positioned at bottom of header */}
                        {loading && loadingIndicator === 'line' && !loadingComponent && (
                            <tr className={styles.loadingRow}>
                                <td colSpan={table.getVisibleLeafColumns().length} className={styles.loadingCell}>
                                    <div className={styles.loadingLine}>
                                        <div className={styles.loadingBar} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </thead>
                    <tbody className={styles.tableBody}>
                        {isEmpty ? (
                            <tr>
                                <td
                                    colSpan={table.getVisibleLeafColumns().length}
                                    className={styles.emptyState}
                                >
                                    {emptyComponent ?? emptyText}
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`${styles.tableRow({
                                        variant,
                                        selected: row.getIsSelected(),
                                        hoverable: !!onRowClick || !!enableRowSelection,
                                    })} ${variant === 'zebra' ? styles.zebraRow : ''}`.trim()}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                    style={{ cursor: onRowClick ? 'pointer' : undefined }}
                                >
                                    {row.getVisibleCells().map(renderCell)}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationInfo}>
                        Showing {startRow} to {endRow} of {totalRows} results
                    </div>

                    <div className={styles.paginationControls}>
                        <div className={styles.pageSizeSelect}>
                            <span>Rows per page:</span>
                            <Select
                                value={String(currentPageSize)}
                                onChange={(value) => table.setPageSize(Number(value))}
                                options={pageSizeOptions.map((size) => ({
                                    value: String(size),
                                    label: String(size),
                                }))}
                                size="sm"
                            />
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            aria-label="First page"
                        >
                            ««
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            aria-label="Previous page"
                        >
                            «
                        </Button>

                        <span style={{ fontSize: 'var(--bk-font-size-sm)', padding: '0 var(--bk-spacing-2)' }}>
                            Page {currentPage + 1} of {pageCount}
                        </span>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            aria-label="Next page"
                        >
                            »
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.setPageIndex(pageCount - 1)}
                            disabled={!table.getCanNextPage()}
                            aria-label="Last page"
                        >
                            »»
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}


