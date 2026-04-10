import React, { useState, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
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
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Size } from '../../styles';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select } from '../Select';
import { Spinner } from '../Spinner';
import { useDataTableData } from './useDataTableData';
import type { AsyncTransactionsFlushedEvent, DataTableRef, DataTableTransaction } from './DataTable.types';
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
   * Data array to display (controlled mode).
   * When provided, the table is in controlled mode and `initialData` is ignored.
   */
  data?: TData[];

  /**
   * Initial data for managed mode.
   * When `data` prop is not provided, the table manages its own data state
   * and exposes a transaction API via ref.
   */
  initialData?: TData[];

  /**
   * Called after data changes from transactions or setData (managed mode only).
   */
  onDataChange?: (data: TData[], tx?: DataTableTransaction<TData>) => void;

  /**
   * Called after a batch of async transactions is flushed (managed mode only).
   */
  onAsyncTransactionsFlushed?: (event: AsyncTransactionsFlushedEvent<TData>) => void;

  /**
   * Scheduler function for deferring async transaction flushes.
   * @default requestAnimationFrame
   */
  asyncScheduler?: (callback: () => void) => void;

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
   * Custom render function for the global filter/search bar.
   * Receives the current filter value and an onChange handler.
   * When provided, replaces the default search input entirely.
   *
   * @example
   * ```tsx
   * renderGlobalFilter={({ value, onChange }) => (
   *   <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Custom search..." />
   * )}
   * ```
   */
  renderGlobalFilter?: (props: {
    value: string;
    onChange: (value: string) => void;
  }) => React.ReactNode;

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

  /**
   * Disable row virtualization. By default, rows are virtualized for performance
   * with large datasets when the table has a constrained scroll area (`maxHeight` or `fillHeight`).
   * Set to `true` to render all rows in the DOM even when scrollable.
   * Virtualization is also automatically disabled when pagination is enabled.
   * @default false
   */
  disableRowVirtualization?: boolean;

  /**
   * Estimated row height in pixels used by the virtualizer for initial layout.
   * Rows are measured dynamically after render, so this is only an initial estimate.
   * @default 35
   */
  estimatedRowHeight?: number;

  /**
   * Number of rows to render outside the visible scroll area (overscan).
   * Higher values reduce flicker during fast scrolling but render more DOM nodes.
   * @default 5
   */
  overscan?: number;
}

/**
 * DataTable component using TanStack Table
 *
 * A powerful, feature-rich table component built on TanStack Table (React Table v8).
 * Supports sorting, pagination, row selection, column resizing, and more.
 *
 * Supports two modes:
 * - **Controlled mode**: Pass `data` prop. You manage data externally.
 * - **Managed mode**: Pass `initialData` prop. Use `ref.applyTransaction()` to mutate data.
 *
 * @example Controlled mode
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
 *
 * @example Managed mode with transactions
 * ```tsx
 * const tableRef = useRef<DataTableRef<User>>(null);
 *
 * tableRef.current?.applyTransaction({
 *   add: [{ id: '4', name: 'Alice' }],
 *   remove: [{ id: '1' }],
 * });
 *
 * <DataTable
 *   ref={tableRef}
 *   initialData={users}
 *   columns={columns}
 *   getRowId={(row) => row.id}
 * />
 * ```
 */
function DataTableInner<TData>(
  {
    data: controlledData,
    initialData,
    onDataChange,
    onAsyncTransactionsFlushed,
    asyncScheduler,
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
    renderGlobalFilter,
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
    disableRowVirtualization = false,
    estimatedRowHeight = 35,
    overscan = 5,
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<DataTableRef<TData>>
) {
  // Determine mode: controlled (data prop provided) vs managed (initialData)
  const isControlled = controlledData !== undefined;

  // Default getRowId falls back to index-based
  const resolvedGetRowId = getRowId ?? ((_row: TData, index: number) => String(index));

  // Internal managed data (only active when not controlled)
  const managedData = useDataTableData<TData>({
    initialData: initialData ?? [],
    getRowId: resolvedGetRowId,
    onDataChange,
    onAsyncTransactionsFlushed,
    asyncScheduler,
  });

  // Resolve final data source
  const safeData = isControlled ? (controlledData ?? []) : managedData.data;

  // Store table ref for imperative handle
  const tableInstanceRef = useRef<ReturnType<typeof useReactTable<TData>> | null>(null);

  // Expose imperative handle via ref
  useImperativeHandle(ref, () => ({
    applyTransaction: ((tx: DataTableTransaction<TData>, undoable?: boolean) => {
      if (isControlled) {
        console.warn(
          'DataTable: applyTransaction called in controlled mode. ' +
          'Use the useDataTableData hook externally instead, or switch to managed mode (initialData prop).'
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (managedData.applyTransaction as any)(tx, undoable);
    }) as DataTableRef<TData>['applyTransaction'],
    applyTransactionAsync: (tx, undoable) => {
      if (isControlled) {
        console.warn(
          'DataTable: applyTransactionAsync called in controlled mode. ' +
          'Use the useDataTableData hook externally instead, or switch to managed mode (initialData prop).'
        );
      }
      return managedData.applyTransactionAsync(tx, undoable);
    },
    flushAsyncTransactions: () => managedData.flushAsyncTransactions(),
    getRowData: () => managedData.getRowData(),
    getSelectedRows: () => {
      const tableInst = tableInstanceRef.current;
      if (!tableInst) return [];
      return tableInst.getSelectedRowModel().rows.map((r) => r.original);
    },
    setData: (newData) => managedData.setData(newData),
  }), [isControlled, managedData]);

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
    data: safeData,
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
      const newSelection =
        typeof updater === 'function' ? updater(rowSelectionState) : updater;
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
    getPaginationRowModel:
      enablePagination && !manualPagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel: enableGlobalFilter ? getFilteredRowModel() : undefined,
    manualPagination,
    rowCount,
    getRowId: resolvedGetRowId,
    columnResizeMode,
    enableColumnResizing,
  });

  // Store table instance for imperative handle (getSelectedRows)
  tableInstanceRef.current = table;

  // Pagination info (only computed when pagination is enabled)
  const paginationState = table.getState().pagination;
  const pageCount = enablePagination ? table.getPageCount() : 1;
  const currentPage = paginationState?.pageIndex ?? 0;
  const currentPageSize = paginationState?.pageSize ?? initialPageSize;
  const totalRows = manualPagination ? (rowCount ?? 0) : table.getFilteredRowModel().rows.length;

  // Calculate displayed rows range
  const startRow = enablePagination ? currentPage * currentPageSize + 1 : 1;
  const endRow = enablePagination
    ? Math.min((currentPage + 1) * currentPageSize, totalRows)
    : totalRows;

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
          align:
            (header.column.columnDef.meta as { align?: DataTableColumnAlign })?.align ??
            'left',
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
            : (flexRender(
              header.column.columnDef.header,
              header.getContext(),
            ) as React.ReactNode)}
          {canSort && (
            <span className={styles.sortIndicator({ active: !!isSorted })}>
              <Icon name={isSorted === 'desc' ? 'chevron-down' : 'chevron-up'} />
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
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
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
          align:
            (cell.column.columnDef.meta as { align?: DataTableColumnAlign })?.align ??
            'left',
          bordered,
          size,
          truncate: enableColumnResizing,
        })}
        style={{
          width: cell.column.getSize(),
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext()) as React.ReactNode}
      </td>
    );
  };

  const rows = table.getRowModel().rows;
  const isEmpty = rows.length === 0 && !loading;

  // Virtualization: enabled by default when the table has a constrained scroll area.
  // Requires maxHeight or fillHeight to define the viewport. Disabled when paginating.
  const hasConstrainedHeight = !!maxHeight || fillHeight;
  const isVirtualized = !disableRowVirtualization && !enablePagination && hasConstrainedHeight;
  const tableContainerRef = useRef<HTMLDivElement>(null);

  if (!disableRowVirtualization && !enablePagination && !hasConstrainedHeight) {
    console.warn(
      'DataTable: Row virtualization is enabled by default but requires a constrained scroll area. ' +
      'Set `maxHeight` or `fillHeight` to enable virtualization, ' +
      'or set `disableRowVirtualization` to suppress this warning.'
    );
  }

  const rowVirtualizer = useVirtualizer({
    count: isVirtualized ? rows.length : 0,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: useCallback(() => estimatedRowHeight, [estimatedRowHeight]),
    overscan,
    enabled: isVirtualized,
  });

  const virtualRows = isVirtualized ? rowVirtualizer.getVirtualItems() : [];
  const totalVirtualHeight = isVirtualized ? rowVirtualizer.getTotalSize() : 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    if (!enableRowSelection) {
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      const selectedIds = Object.keys(table.getState().rowSelection);
      if (selectedIds.length === 1) {
        const currentRow = rows.find((r) => r.id === selectedIds[0]);
        if (currentRow) {
          if (enableMultiRowSelection) {
            currentRow.toggleSelected();
          } else {
            table.setRowSelection(
              currentRow.getIsSelected() ? {} : { [currentRow.id]: true },
            );
          }
        }
      }
      return;
    }

    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      return;
    }
    e.preventDefault();

    const selectedIds = Object.keys(table.getState().rowSelection);
    const currentIndex =
      selectedIds.length === 1 ? rows.findIndex((r) => r.id === selectedIds[0]) : -1;

    let nextIndex: number;
    if (e.key === 'ArrowDown') {
      nextIndex = currentIndex < rows.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    }

    const nextRow = rows[nextIndex];
    if (nextRow) {
      table.setRowSelection({ [nextRow.id]: true });
      onRowSelectionChange?.({ [nextRow.id]: true });
      // Scroll the newly selected row into view
      if (isVirtualized) {
        rowVirtualizer.scrollToIndex(nextIndex, { align: 'auto' });
      } else {
        const tableEl = e.currentTarget;
        const rowEl = tableEl.querySelector<HTMLElement>(`tr[data-rowid="${nextRow.id}"]`);
        rowEl?.scrollIntoView({ block: 'nearest' });
      }
    }
  };

  return (
    <div
      className={`${styles.dataTableWrapper({ fillHeight })} ${className ?? ''}`}
      style={style}
    >
      {/* Toolbar with global filter */}
      {enableGlobalFilter && (
        <div className={styles.toolbar}>
          {renderGlobalFilter ? (
            renderGlobalFilter({
              value: globalFilterValue,
              onChange: (value) => {
                setInternalGlobalFilter(value);
                onGlobalFilterChange?.(value);
              },
            })
          ) : (
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
          )}
        </div>
      )}

      {/* Table container */}
      <div
        ref={tableContainerRef}
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
          onKeyDown={enableRowSelection ? handleKeyDown : undefined}
          tabIndex={enableRowSelection ? 0 : undefined}
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
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  className={styles.loadingCell}
                >
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
            ) : isVirtualized ? (
              <>
                {/* Top spacer to offset virtualized rows */}
                {virtualRows.length > 0 && virtualRows[0].start > 0 && (
                  <tr aria-hidden="true">
                    <td
                      colSpan={table.getVisibleLeafColumns().length}
                      style={{ height: virtualRows[0].start, padding: 0, border: 'none' }}
                    />
                  </tr>
                )}
                {/* Virtualized visible rows */}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr
                      key={row.id}
                      data-rowid={row.id}
                      data-index={virtualRow.index}
                      ref={(node) => rowVirtualizer.measureElement(node)}
                      data-selected={row.getIsSelected() || undefined}
                      className={`${styles.tableRow({
                        variant,
                        selected: row.getIsSelected(),
                        hoverable: !!onRowClick || !!enableRowSelection,
                      })} ${variant === 'zebra' ? styles.zebraRow : ''}`.trim()}
                      onClick={(e) => {
                        if (enableRowSelection) {
                          if (enableMultiRowSelection && (e.ctrlKey || e.metaKey)) {
                            row.toggleSelected();
                          } else {
                            table.setRowSelection({ [row.id]: true });
                          }
                        }
                        onRowClick?.(row);
                      }}
                      style={{ cursor: (onRowClick || enableRowSelection) ? 'pointer' : undefined }}
                    >
                      {row.getVisibleCells().map(renderCell)}
                    </tr>
                  );
                })}
                {/* Bottom spacer to maintain scroll height */}
                {virtualRows.length > 0 && (() => {
                  const lastItem = virtualRows[virtualRows.length - 1];
                  const bottomPad = totalVirtualHeight - lastItem.end;
                  return bottomPad > 0 ? (
                    <tr aria-hidden="true">
                      <td
                        colSpan={table.getVisibleLeafColumns().length}
                        style={{ height: bottomPad, padding: 0, border: 'none' }}
                      />
                    </tr>
                  ) : null;
                })()}
              </>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-rowid={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  className={`${styles.tableRow({
                    variant,
                    selected: row.getIsSelected(),
                    hoverable: !!onRowClick || !!enableRowSelection,
                  })} ${variant === 'zebra' ? styles.zebraRow : ''}`.trim()}
                  onClick={(e) => {
                    if (enableRowSelection) {
                      if (
                        enableMultiRowSelection &&
                        (e.ctrlKey || e.metaKey)
                      ) {
                        // Multi-select: toggle individual row
                        row.toggleSelected();
                      } else {
                        // Single call to set selection to only this row,
                        // avoids stale state from separate reset + toggle calls
                        table.setRowSelection({ [row.id]: true });
                      }
                    }
                    onRowClick?.(row);
                  }}
                  style={{
                    cursor:
                      onRowClick || enableRowSelection
                        ? 'pointer'
                        : undefined,
                  }}
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

            <span
              style={{
                fontSize: 'var(--bk-font-size-sm)',
                padding: '0 var(--bk-spacing-2)',
              }}
            >
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

/**
 * DataTable component with ref forwarding for managed mode.
 *
 * Use `forwardRef` wrapper to preserve generic type parameter `TData`.
 */
export const DataTable = forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> & { ref?: React.Ref<DataTableRef<TData>> }
) => React.ReactElement | null;

