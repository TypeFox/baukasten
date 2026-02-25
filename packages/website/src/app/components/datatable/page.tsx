'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Badge, Button, Heading } from 'baukasten-ui/core';
import { DataTable, createSelectColumn } from 'baukasten-ui/extra';
import type { ColumnDef, SortingState, PaginationState, RowSelectionState } from 'baukasten-ui/extra';

const dataTableProps: PropDefinition[] = [
    { name: 'data', type: 'TData[]', required: true, description: 'Data array to display' },
    { name: 'columns', type: 'ColumnDef<TData>[]', required: true, description: 'Column definitions (TanStack Table format)' },
    { name: 'variant', type: '"default" | "zebra"', default: '"default"', description: 'Visual variant of the table' },
    { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size of table cells' },
    { name: 'bordered', type: 'boolean', default: 'true', description: 'Whether to show borders' },
    { name: 'enableRowSelection', type: 'boolean | ((row: Row<TData>) => boolean)', default: 'false', description: 'Enable row selection' },
    { name: 'enableMultiRowSelection', type: 'boolean', default: 'true', description: 'Enable multi-row selection' },
    { name: 'rowSelection', type: 'RowSelectionState', description: 'Controlled row selection state' },
    { name: 'onRowSelectionChange', type: '(selection: RowSelectionState) => void', description: 'Callback when row selection changes' },
    { name: 'enableSorting', type: 'boolean', default: 'false', description: 'Enable sorting' },
    { name: 'enableMultiSort', type: 'boolean', default: 'false', description: 'Enable multi-column sorting' },
    { name: 'sorting', type: 'SortingState', description: 'Controlled sorting state' },
    { name: 'onSortingChange', type: '(sorting: SortingState) => void', description: 'Callback when sorting changes' },
    { name: 'enablePagination', type: 'boolean', default: 'false', description: 'Enable pagination' },
    { name: 'pageSizeOptions', type: 'number[]', default: '[10, 20, 50, 100]', description: 'Page size options for pagination' },
    { name: 'initialPageSize', type: 'number', default: '10', description: 'Initial page size' },
    { name: 'pagination', type: 'PaginationState', description: 'Controlled pagination state' },
    { name: 'onPaginationChange', type: '(pagination: PaginationState) => void', description: 'Callback when pagination changes' },
    { name: 'rowCount', type: 'number', description: 'Total row count (for server-side pagination)' },
    { name: 'manualPagination', type: 'boolean', default: 'false', description: 'Enable manual pagination (server-side)' },
    { name: 'enableColumnResizing', type: 'boolean', default: 'false', description: 'Enable column resizing' },
    { name: 'columnResizeMode', type: 'ColumnResizeMode', default: '"onChange"', description: 'Column resize mode' },
    { name: 'enableGlobalFilter', type: 'boolean', default: 'false', description: 'Enable global filtering' },
    { name: 'globalFilter', type: 'string', description: 'Global filter value' },
    { name: 'onGlobalFilterChange', type: '(value: string) => void', description: 'Callback when global filter changes' },
    { name: 'globalFilterPlaceholder', type: 'string', default: '"Search..."', description: 'Placeholder for global filter input' },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Whether the table has sticky headers' },
    { name: 'maxHeight', type: 'number | string', description: 'Max height for scrollable table' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the table is loading' },
    { name: 'loadingIndicator', type: '"line" | "spinner"', default: '"line"', description: 'Loading indicator style' },
    { name: 'loadingComponent', type: 'React.ReactNode', description: 'Custom loading component' },
    { name: 'emptyText', type: 'string', default: '"No data available"', description: 'Empty state text' },
    { name: 'emptyComponent', type: 'React.ReactNode', description: 'Custom empty state component' },
    { name: 'getRowId', type: '(row: TData, index: number) => string', description: 'Row ID accessor (for selection state)' },
    { name: 'onRowClick', type: '(row: Row<TData>) => void', description: 'Callback when a row is clicked' },
];

// Sample data
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    department: string;
}

const generateUsers = (count: number): User[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'Developer', 'Designer', 'Manager'][i % 4],
        status: (['active', 'inactive', 'pending'] as const)[i % 3],
        department: ['Engineering', 'Design', 'Marketing', 'Sales'][i % 4],
    }));

const sampleData = generateUsers(50);

// Basic columns
const basicColumns: ColumnDef<User, unknown>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
];

// Custom columns with alignment
const customColumns: ColumnDef<User, unknown>[] = [
    {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => (
            <div>
                <div style={{ fontWeight: 'var(--bk-font-weight-medium)' }}>{row.original.name}</div>
                <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                    {row.original.email}
                </div>
            </div>
        ),
    },
    { accessorKey: 'department', header: 'Department' },
    {
        accessorKey: 'status',
        header: 'Status',
        meta: { align: 'center' as const },
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        meta: { align: 'right' as const },
        cell: () => (
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-1)', justifyContent: 'flex-end' }}>
                <Button size="sm" variant="ghost">Edit</Button>
            </div>
        ),
        enableSorting: false,
    },
];

// Controlled sorting example
function ControlledSortingExample() {
    const [sorting, setSorting] = useState<SortingState>([]);

    return (
        <div>
            <div style={{ marginBottom: 'var(--bk-spacing-3)', padding: 'var(--bk-spacing-2)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <strong>Current Sort:</strong> {sorting.length > 0
                    ? `${sorting[0].id} (${sorting[0].desc ? 'desc' : 'asc'})`
                    : 'None'}
            </div>
            <DataTable
                data={sampleData.slice(0, 10)}
                columns={basicColumns}
                enableSorting
                sorting={sorting}
                onSortingChange={setSorting}
            />
        </div>
    );
}

// Row selection example
function RowSelectionExample() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo(() => [
        createSelectColumn<User>(),
        ...basicColumns,
    ], []);

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div>
            <div style={{ marginBottom: 'var(--bk-spacing-3)', padding: 'var(--bk-spacing-2)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <strong>Selected:</strong> {selectedCount} row(s)
                {selectedCount > 0 && (
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setRowSelection({})}
                        style={{ marginLeft: 'var(--bk-spacing-2)' }}
                    >
                        Clear
                    </Button>
                )}
            </div>
            <DataTable
                data={sampleData.slice(0, 10)}
                columns={columns}
                enableRowSelection
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
                getRowId={(row) => String(row.id)}
            />
        </div>
    );
}

export default function DataTablePage() {
    return (
        <PageLayout
            title="DataTable"
            description="A powerful, feature-rich table component built on TanStack Table (React Table v8). Supports sorting, pagination, row selection, column resizing, global filtering, and more. Fully integrates with the Baukasten design system."
        >
            <Showcase
                title="Basic Usage"
                description="Define columns using TanStack Table's column definition format, then pass your data and columns to the DataTable component."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 10)}
                        columns={basicColumns}
                    />
                }
                code={`import { DataTable } from 'baukasten-ui/extra';
import type { ColumnDef } from 'baukasten-ui/extra';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === 'active' ? 'success' : 'default';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

function App() {
  return <DataTable data={users} columns={columns} />;
}`}
                props={dataTableProps}
            />

            <Showcase
                title="With Sorting"
                description="Enable sorting by setting enableSorting prop. Click column headers to sort. Sorting state is managed internally by default."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 15)}
                        columns={basicColumns}
                        enableSorting
                        variant="zebra"
                    />
                }
                code={`<DataTable
  data={users}
  columns={columns}
  enableSorting
  variant="zebra"
/>`}
            />

            <Showcase
                title="With Pagination"
                description="Enable pagination with customizable page sizes. Perfect for large datasets."
                preview={
                    <DataTable
                        data={sampleData}
                        columns={basicColumns}
                        enablePagination
                        initialPageSize={10}
                        pageSizeOptions={[5, 10, 20, 50]}
                    />
                }
                code={`<DataTable
  data={users}
  columns={columns}
  enablePagination
  initialPageSize={10}
  pageSizeOptions={[5, 10, 20, 50]}
/>`}
            />

            <Showcase
                title="Row Selection"
                description="Use createSelectColumn() to add a checkbox column for row selection. Track selected rows with rowSelection state."
                preview={<RowSelectionExample />}
                code={`import { useState, useMemo } from 'react';
import { DataTable, createSelectColumn } from 'baukasten-ui/extra';
import type { RowSelectionState } from 'baukasten-ui/extra';

function App() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo(() => [
    createSelectColumn<User>(),
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    // ... other columns
  ], []);

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <>
      <div>Selected: {selectedCount} row(s)</div>
      <DataTable
        data={users}
        columns={columns}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => String(row.id)}
      />
    </>
  );
}`}
            />

            <Showcase
                title="Global Filter (Search)"
                description="Enable global filtering to search across all columns. The search input appears in a toolbar above the table."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 20)}
                        columns={basicColumns}
                        enableGlobalFilter
                        globalFilterPlaceholder="Search users..."
                        enablePagination
                        initialPageSize={10}
                    />
                }
                code={`<DataTable
  data={users}
  columns={columns}
  enableGlobalFilter
  globalFilterPlaceholder="Search users..."
  enablePagination
  initialPageSize={10}
/>`}
            />

            <Showcase
                title="Controlled Sorting"
                description="Control sorting state externally for integration with external state management or URL parameters."
                preview={<ControlledSortingExample />}
                code={`import { useState } from 'react';
import { DataTable } from 'baukasten-ui/extra';
import type { SortingState } from 'baukasten-ui/extra';

function App() {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <>
      <div>
        Current Sort: {sorting.length > 0
          ? \`\${sorting[0].id} (\${sorting[0].desc ? 'desc' : 'asc'})\`
          : 'None'}
      </div>
      <DataTable
        data={users}
        columns={columns}
        enableSorting
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </>
  );
}`}
            />

            <Showcase
                title="Custom Cell Rendering"
                description="Use the cell property in column definitions to customize cell rendering. Use meta.align to control column alignment."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 10)}
                        columns={customColumns}
                        enableSorting
                        variant="zebra"
                    />
                }
                code={`const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => (
      <div>
        <div style={{ fontWeight: 'var(--bk-font-weight-medium)' }}>
          {row.original.name}
        </div>
        <div style={{ fontSize: 'var(--bk-font-size-xs)' }}>
          {row.original.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: { align: 'center' },
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === 'active' ? 'success' : 'default';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { align: 'right' },
    cell: () => <Button size="sm">Edit</Button>,
    enableSorting: false,
  },
];

<DataTable data={users} columns={columns} enableSorting />`}
            />

            <Showcase
                title="Column Resizing"
                description="Enable column resizing by dragging column edges. Set initial column widths with the size property in column definitions."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 10)}
                        columns={[
                            { accessorKey: 'name', header: 'Name', size: 200 },
                            { accessorKey: 'email', header: 'Email', size: 250 },
                            { accessorKey: 'department', header: 'Department', size: 150 },
                            { accessorKey: 'role', header: 'Role', size: 120 },
                        ]}
                        enableColumnResizing
                        variant="zebra"
                    />
                }
                code={`const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name', size: 200 },
  { accessorKey: 'email', header: 'Email', size: 250 },
  { accessorKey: 'department', header: 'Department', size: 150 },
  { accessorKey: 'role', header: 'Role', size: 120 },
];

<DataTable
  data={users}
  columns={columns}
  enableColumnResizing
/>`}
            />

            <Showcase
                title="Sticky Header"
                description="Use stickyHeader with maxHeight to create a scrollable table with a fixed header that stays visible when scrolling."
                preview={
                    <DataTable
                        data={sampleData.slice(0, 30)}
                        columns={basicColumns}
                        stickyHeader
                        maxHeight={400}
                        variant="zebra"
                    />
                }
                code={`<DataTable
  data={users}
  columns={columns}
  stickyHeader
  maxHeight={400}
  variant="zebra"
/>`}
            />

            <Showcase
                title="Loading States"
                description="Show loading indicator while data is being fetched. Choose between line indicator (default) or spinner overlay."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Line Indicator (Default)
                            </div>
                            <DataTable
                                data={[]}
                                columns={basicColumns}
                                loading
                                loadingIndicator="line"
                                maxHeight={200}
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Spinner Overlay
                            </div>
                            <DataTable
                                data={sampleData.slice(0, 5)}
                                columns={basicColumns}
                                loading
                                loadingIndicator="spinner"
                                maxHeight={200}
                            />
                        </div>
                    </div>
                }
                code={`// Line indicator (default)
<DataTable
  data={users}
  columns={columns}
  loading
  loadingIndicator="line"
/>

// Spinner overlay
<DataTable
  data={users}
  columns={columns}
  loading
  loadingIndicator="spinner"
/>`}
            />

            <Showcase
                title="Empty State"
                description="Customize the empty state message or component when no data is available."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Custom Empty Text
                            </div>
                            <DataTable
                                data={[]}
                                columns={basicColumns}
                                emptyText="No users found. Try adjusting your filters."
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Custom Empty Component
                            </div>
                            <DataTable
                                data={[]}
                                columns={basicColumns}
                                emptyComponent={
                                    <div style={{ textAlign: 'center', padding: 'var(--bk-spacing-6)' }}>
                                        <div style={{ fontSize: 'var(--bk-font-size-3xl)', marginBottom: 'var(--bk-spacing-2)' }}>📭</div>
                                        <div style={{ fontWeight: 'var(--bk-font-weight-medium)', marginBottom: 'var(--bk-spacing-1)' }}>
                                            No Data Found
                                        </div>
                                        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)', marginBottom: 'var(--bk-spacing-3)' }}>
                                            Add some users to get started
                                        </div>
                                        <Button size="sm">Add User</Button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                }
                code={`// Custom empty text
<DataTable
  data={[]}
  columns={columns}
  emptyText="No users found. Try adjusting your filters."
/>

// Custom empty component
<DataTable
  data={[]}
  columns={columns}
  emptyComponent={
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</div>
      <div style={{ fontWeight: 'medium', marginBottom: '4px' }}>
        No Data Found
      </div>
      <div style={{ fontSize: '14px', marginBottom: '12px' }}>
        Add some users to get started
      </div>
      <Button size="sm">Add User</Button>
    </div>
  }
/>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Size affects padding and font size of cells."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <div key={size}>
                                <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                    {size.toUpperCase()}{size === 'md' ? ' (default)' : ''}
                                </div>
                                <DataTable
                                    data={sampleData.slice(0, 3)}
                                    columns={basicColumns.slice(0, 3)}
                                    size={size}
                                    variant="zebra"
                                />
                            </div>
                        ))}
                    </div>
                }
                code={`<DataTable size="xs" data={users} columns={columns} />
<DataTable size="sm" data={users} columns={columns} />
<DataTable size="md" data={users} columns={columns} /> {/* default */}
<DataTable size="lg" data={users} columns={columns} />
<DataTable size="xl" data={users} columns={columns} />`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    TanStack Table Integration
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Column definitions:</strong> Use TanStack Table's <code>ColumnDef</code> type for full type safety
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Flexible rendering:</strong> Use <code>cell</code> property to render any React component in cells
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Meta information:</strong> Use <code>meta.align</code> to set column alignment
                    </li>
                    <li>
                        <strong>Helper functions:</strong> Use <code>createSelectColumn()</code> to easily add checkbox column
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Uses semantic <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code> elements
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Sortable columns are keyboard accessible with proper ARIA attributes
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Checkboxes have appropriate <code>aria-label</code> attributes
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Pagination buttons have <code>aria-label</code> attributes for screen readers
                    </li>
                    <li>
                        Use <code>aria-label</code> prop to provide accessible label for the entire table
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Simple vs DataTable:</strong> Use basic Table component for simple static data, DataTable for complex features
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Pagination:</strong> Always enable pagination for datasets with more than 20 rows
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Row ID:</strong> Provide <code>getRowId</code> when using row selection to ensure stable row identity
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Server-side:</strong> Use <code>manualPagination</code> with <code>rowCount</code> for server-side pagination
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Column sizing:</strong> Set initial <code>size</code> in column definitions when using column resizing
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Loading states:</strong> Use line indicator for quick loads, spinner overlay for longer operations
                    </li>
                    <li>
                        <strong>Sticky headers:</strong> Combine with <code>maxHeight</code> for tables with many rows
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
