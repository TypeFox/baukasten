import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { DataTable } from './DataTable';
import { createSelectColumn, type ColumnDef, type SortingState, type PaginationState, type RowSelectionState } from './DataTable.utils';
import { useDataTableData, type DataTableRef } from './index';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';

// Sample data type
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    department: string;
    salary: number;
    startDate: string;
}

// Generate sample data
const generateUsers = (count: number): User[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst'][i % 5],
        status: (['active', 'inactive', 'pending'] as const)[i % 3],
        department: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'][i % 5],
        salary: 50000 + Math.floor((i * 1234) % 100000),
        startDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }));

const sampleData = generateUsers(50);

// Basic columns
const basicColumns: ColumnDef<User, unknown>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const variant =
                status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
];

const meta: Meta<typeof DataTable<User>> = {
    title: 'Components/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A powerful table component built on **TanStack Table** (React Table v8).

### Features
- 🔄 **Sorting** - Click column headers to sort
- 📄 **Pagination** - Built-in pagination with customizable page sizes
- ✅ **Row Selection** - Single or multi-select with checkbox column
- ↔️ **Column Resizing** - Drag column edges to resize
- 🔍 **Global Filter** - Search across all columns
- 🎨 **Theming** - Integrates with Baukasten design system
- 📱 **Responsive** - Scrollable containers for mobile

### When to Use

Use \`DataTable\` when you need:
- Large datasets with sorting/filtering
- Server-side pagination
- Row selection functionality
- Column resizing
- Advanced table features

For simple static tables, consider using the basic \`Table\` component instead.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'zebra'],
            description: 'Visual variant of the table',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of table cells',
        },
        bordered: {
            control: 'boolean',
            description: 'Show table borders',
        },
        enableSorting: {
            control: 'boolean',
            description: 'Enable column sorting',
        },
        enablePagination: {
            control: 'boolean',
            description: 'Enable pagination',
        },
        enableRowSelection: {
            control: 'boolean',
            description: 'Enable row selection',
        },
        enableColumnResizing: {
            control: 'boolean',
            description: 'Enable column resizing',
        },
        enableGlobalFilter: {
            control: 'boolean',
            description: 'Enable global search filter',
        },
        stickyHeader: {
            control: 'boolean',
            description: 'Make header sticky when scrolling',
        },
        fillHeight: {
            control: 'boolean',
            description: 'Fill parent height and become scrollable (pagination stays at bottom)',
        },
        loading: {
            control: 'boolean',
            description: 'Show loading state',
        },
        loadingIndicator: {
            control: 'radio',
            options: ['line', 'spinner'],
            description:
                'Loading indicator style: "line" shows an animated bar under the header, "spinner" shows a centered overlay',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

/**
 * Basic table with minimal configuration
 */
export const Basic: Story = {
    args: {
        data: sampleData.slice(0, 10),
        columns: basicColumns,
        variant: 'default',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            source: {
                code: `
const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

<DataTable data={users} columns={columns} />
`,
            },
        },
    },
};

/**
 * Table with sorting enabled
 */
export const WithSorting: Story = {
    args: {
        data: sampleData.slice(0, 15),
        columns: basicColumns,
        enableSorting: true,
        variant: 'zebra',
    },
    parameters: {
        docs: {
            description: {
                story: 'Click on column headers to sort. Sorting state is managed internally by default.',
            },
        },
    },
};

/**
 * Table with pagination
 */
export const WithPagination: Story = {
    args: {
        data: sampleData,
        columns: basicColumns,
        enablePagination: true,
        initialPageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
    },
    parameters: {
        docs: {
            description: {
                story: 'Enable pagination with customizable page sizes. Perfect for large datasets.',
            },
        },
    },
};

/**
 * Controlled sorting state
 */
const ControlledSortingExample = () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    return (
        <div>
            <div
                style={{
                    marginBottom: 'var(--bk-spacing-3)',
                    padding: 'var(--bk-spacing-2)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-md)',
                }}
            >
                <strong>Current Sort:</strong>{' '}
                {sorting.length > 0
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
};

export const ControlledSorting: Story = {
    render: () => <ControlledSortingExample />,
    parameters: {
        docs: {
            description: {
                story: 'Control sorting state externally for integration with external state management.',
            },
        },
    },
};

/**
 * Row selection with checkbox column
 */
const RowSelectionExample = () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo(() => [createSelectColumn<User>(), ...basicColumns], []);

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div>
            <div
                style={{
                    marginBottom: 'var(--bk-spacing-3)',
                    padding: 'var(--bk-spacing-2)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-md)',
                }}
            >
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
};

export const WithRowSelection: Story = {
    render: () => <RowSelectionExample />,
    parameters: {
        docs: {
            description: {
                story: `
Use \`createSelectColumn()\` to add a checkbox column for row selection.

\`\`\`tsx
const columns = [
  createSelectColumn<User>(),
  { accessorKey: 'name', header: 'Name' },
  // ... other columns
];

<DataTable
  data={users}
  columns={columns}
  enableRowSelection
  rowSelection={selection}
  onRowSelectionChange={setSelection}
  getRowId={(row) => String(row.id)}
/>
\`\`\`
                `,
            },
        },
    },
};

/**
 * Global filter / search
 */
const GlobalFilterExample = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
        <DataTable
            data={sampleData.slice(0, 20)}
            columns={basicColumns}
            enableGlobalFilter
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            globalFilterPlaceholder="Search users..."
            enablePagination
            initialPageSize={10}
        />
    );
};

export const WithGlobalFilter: Story = {
    render: () => <GlobalFilterExample />,
    parameters: {
        docs: {
            description: {
                story: 'Enable global filtering to search across all columns.',
            },
        },
    },
};

/**
 * Custom global filter / search bar
 */
const CustomGlobalFilterExample = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
        <DataTable
            data={sampleData.slice(0, 20)}
            columns={basicColumns}
            enableGlobalFilter
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            enablePagination
            initialPageSize={10}
            renderGlobalFilter={({ value, onChange }) => (
                <Label size="md" style={{ width: 'fit-content' }}>
                    <Icon name="search" />
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Custom search"
                        fullWidth
                    />
                    {value && (
                        <Button variant="ghost" onClick={() => onChange('')}>
                            <Icon name="x" />
                            Clear
                        </Button>
                    )}
                </Label>
            )}
        />
    );
};

export const CustomGlobalFilter: Story = {
    render: () => <CustomGlobalFilterExample />,
    parameters: {
        docs: {
            description: {
                story: `
Use \`renderGlobalFilter\` to fully customize the search bar UI while keeping the filtering logic intact.

\`\`\`tsx
<DataTable
  enableGlobalFilter
  renderGlobalFilter={({ value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
      <Icon name="search" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Custom search..."
        size="md"
      />
      {value && (
        <Button size="sm" variant="ghost" onClick={() => onChange('')}>
          Clear
        </Button>
      )}
    </div>
  )}
/>
\`\`\`
                `,
            },
        },
    },
};

/**
 * Column resizing
 */
export const WithColumnResizing: Story = {
    args: {
        data: sampleData.slice(0, 10),
        columns: [
            { accessorKey: 'name', header: 'Name', size: 200 },
            { accessorKey: 'email', header: 'Email', size: 250 },
            { accessorKey: 'department', header: 'Department', size: 150 },
            { accessorKey: 'role', header: 'Role', size: 120 },
        ],
        enableColumnResizing: true,
        variant: 'zebra',
    },
    parameters: {
        docs: {
            description: {
                story: 'Drag the column edges to resize columns. Set initial column widths with the `size` property in column definitions.',
            },
        },
    },
};

/**
 * Sticky header with scroll
 */
export const StickyHeader: Story = {
    args: {
        data: sampleData.slice(0, 30),
        columns: basicColumns,
        stickyHeader: true,
        maxHeight: 400,
        variant: 'zebra',
    },
    parameters: {
        docs: {
            description: {
                story: 'Use `stickyHeader` with `maxHeight` to create a scrollable table with a fixed header.',
            },
        },
    },
};

/**
 * Fill height with pagination - table fills parent container and scrolls when content exceeds
 */
const FillHeightExample = () => {
    return (
        <div
            style={{
                height: '400px',
                border: '2px dashed var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                padding: 'var(--bk-spacing-2)',
            }}
        >
            <DataTable
                data={sampleData.slice(0, 30)}
                columns={basicColumns}
                fillHeight
                stickyHeader
                enablePagination
                initialPageSize={20}
                variant="zebra"
            />
        </div>
    );
};

export const FillHeight: Story = {
    render: () => <FillHeightExample />,
    parameters: {
        docs: {
            description: {
                story: `
Use \`fillHeight\` to make the table expand to fill its parent container's height.
The table will become scrollable if content exceeds available space, while pagination stays fixed at the bottom.

**Key features:**
- Table fills parent height
- Scrollable content area when content exceeds space
- Pagination stays fixed at the bottom
- Best used with \`stickyHeader\` for better UX

\`\`\`tsx
<div style={{ height: '400px' }}>
  <DataTable
    data={users}
    columns={columns}
    fillHeight
    stickyHeader
    enablePagination
  />
</div>
\`\`\`
                `,
            },
        },
    },
};

/**
 * Loading state with line indicator (default)
 */
export const LoadingState: Story = {
    args: {
        data: [],
        columns: basicColumns,
        loading: true,
        loadingIndicator: 'line',
        maxHeight: 300,
    },
    parameters: {
        docs: {
            description: {
                story: 'Show a loading line under the header while data is being fetched. Use `loadingIndicator: "spinner"` for a centered spinner overlay instead.',
            },
        },
    },
};

/**
 * Empty state
 */
export const EmptyState: Story = {
    args: {
        data: [],
        columns: basicColumns,
        emptyText: 'No users found. Try adjusting your filters.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Customize the empty state message when no data is available.',
            },
        },
    },
};

/**
 * Custom empty component
 */
export const CustomEmptyState: Story = {
    args: {
        data: [],
        columns: basicColumns,
        emptyComponent: (
            <div style={{ textAlign: 'center', padding: 'var(--bk-spacing-6)' }}>
                <div
                    style={{
                        fontSize: 'var(--bk-font-size-3xl)',
                        marginBottom: 'var(--bk-spacing-2)',
                    }}
                >
                    📭
                </div>
                <div
                    style={{
                        fontWeight: 'var(--bk-font-weight-medium)',
                        marginBottom: 'var(--bk-spacing-1)',
                    }}
                >
                    No Data Found
                </div>
                <div
                    style={{
                        fontSize: 'var(--bk-font-size-sm)',
                        color: 'var(--bk-color-secondary-foreground)',
                        marginBottom: 'var(--bk-spacing-3)',
                    }}
                >
                    Add some users to get started
                </div>
                <Button size="sm">Add User</Button>
            </div>
        ),
    },
};

/**
 * Row click handler
 */
const RowClickExample = () => {
    const [clickedRow, setClickedRow] = useState<User | null>(null);

    return (
        <div>
            {clickedRow && (
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        padding: 'var(--bk-spacing-2)',
                        backgroundColor: 'var(--bk-color-background-secondary)',
                        borderRadius: 'var(--bk-radius-md)',
                    }}
                >
                    <strong>Clicked:</strong> {clickedRow.name} ({clickedRow.email})
                </div>
            )}
            <DataTable
                data={sampleData.slice(0, 10)}
                columns={basicColumns}
                onRowClick={(row) => setClickedRow(row.original)}
                variant="zebra"
            />
        </div>
    );
};

export const WithRowClick: Story = {
    render: () => <RowClickExample />,
    parameters: {
        docs: {
            description: {
                story: 'Handle row clicks for navigation or detail views.',
            },
        },
    },
};

/**
 * Custom cell rendering
 */
const customColumns: ColumnDef<User, unknown>[] = [
    {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => (
            <div>
                <div style={{ fontWeight: 'var(--bk-font-weight-medium)' }}>
                    {row.original.name}
                </div>
                <div
                    style={{
                        fontSize: 'var(--bk-font-size-xs)',
                        color: 'var(--bk-color-secondary-foreground)',
                    }}
                >
                    {row.original.email}
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'department',
        header: 'Department',
    },
    {
        accessorKey: 'salary',
        header: 'Salary',
        meta: { align: 'right' },
        cell: ({ getValue }) => {
            const value = getValue() as number;
            return `$${value.toLocaleString()}`;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        meta: { align: 'center' },
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const variant =
                status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        meta: { align: 'right' },
        cell: () => (
            <div
                style={{ display: 'flex', gap: 'var(--bk-spacing-1)', justifyContent: 'flex-end' }}
            >
                <Button size="sm" variant="ghost">
                    Edit
                </Button>
                <Button size="sm" variant="ghost">
                    Delete
                </Button>
            </div>
        ),
        enableSorting: false,
    },
];

export const CustomCells: Story = {
    args: {
        data: sampleData.slice(0, 10),
        columns: customColumns,
        enableSorting: true,
        variant: 'zebra',
    },
    parameters: {
        docs: {
            description: {
                story: `
Use the \`cell\` property in column definitions to customize cell rendering.
Use \`meta.align\` to control column alignment.

\`\`\`tsx
const columns = [
  {
    accessorKey: 'salary',
    header: 'Salary',
    meta: { align: 'right' },
    cell: ({ getValue }) => \`$\${getValue().toLocaleString()}\`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => <Button size="sm">Edit</Button>,
    enableSorting: false,
  },
];
\`\`\`
                `,
            },
        },
    },
};

/**
 * Server-side pagination
 */
const ServerPaginationExample = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Simulate server-side data fetching
    const { data, totalCount } = useMemo(() => {
        // In a real app, this would be an API call
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return {
            data: sampleData.slice(start, end),
            totalCount: sampleData.length,
        };
    }, [pagination]);

    // Simulate loading delay
    const handlePaginationChange = (newPagination: PaginationState) => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setPagination(newPagination);
            setIsLoading(false);
        }, 300);
    };

    return (
        <DataTable
            data={data}
            columns={basicColumns}
            enablePagination
            manualPagination
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            rowCount={totalCount}
            loading={isLoading}
            loadingIndicator="spinner"
            variant="zebra"
        />
    );
};

export const ServerSidePagination: Story = {
    render: () => <ServerPaginationExample />,
    parameters: {
        docs: {
            description: {
                story: `
For server-side pagination, use \`manualPagination\` and \`rowCount\`.

\`\`\`tsx
const { data, totalCount } = await fetchUsers(pagination);

<DataTable
  data={data}
  columns={columns}
  enablePagination
  manualPagination
  pagination={pagination}
  onPaginationChange={setPagination}
  rowCount={totalCount}
/>
\`\`\`
                `,
            },
        },
    },
};

/**
 * All features combined
 */
const AllFeaturesExample = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(() => [createSelectColumn<User>(), ...customColumns], []);

    return (
        <DataTable
            data={sampleData}
            columns={columns}
            variant="zebra"
            // Sorting
            enableSorting
            sorting={sorting}
            onSortingChange={setSorting}
            // Selection
            enableRowSelection
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            getRowId={(row) => String(row.id)}
            // Filtering
            enableGlobalFilter
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            // Pagination
            enablePagination
            initialPageSize={10}
            // Display
            stickyHeader
            maxHeight={500}
            enableColumnResizing
        />
    );
};

export const AllFeatures: Story = {
    render: () => <AllFeaturesExample />,
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive example combining sorting, selection, filtering, pagination, column resizing, and sticky headers.',
            },
        },
    },
};

/**
 * Sizes comparison
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <h4
                        style={{
                            marginBottom: 'var(--bk-spacing-2)',
                            fontSize: 'var(--bk-font-size-sm)',
                            fontWeight: 'var(--bk-font-weight-medium)',
                        }}
                    >
                        Size: {size.toUpperCase()}
                    </h4>
                    <DataTable
                        data={sampleData.slice(0, 3)}
                        columns={basicColumns.slice(0, 3)}
                        size={size}
                        variant="zebra"
                    />
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All available size options for the DataTable.',
            },
        },
    },
};

/**
 * Header grouping using TanStack Table's column groups
 */
const headerGroupColumns: ColumnDef<User, unknown>[] = [
    {
        header: 'Personal Info',
        columns: [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
        ],
    },
    {
        header: 'Employment',
        columns: [
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                accessorKey: 'department',
                header: 'Department',
            },
            {
                accessorKey: 'salary',
                header: 'Salary',
                meta: { align: 'right' },
                cell: ({ getValue }) => {
                    const value = getValue() as number;
                    return `$${value.toLocaleString()}`;
                },
            },
        ],
    },
    {
        header: 'Status',
        columns: [
            {
                accessorKey: 'status',
                header: 'Active',
                cell: ({ getValue }) => {
                    const status = getValue() as string;
                    const variant =
                        status === 'active'
                            ? 'success'
                            : status === 'pending'
                              ? 'warning'
                              : 'default';
                    return <Badge variant={variant}>{status}</Badge>;
                },
            },
            {
                accessorKey: 'startDate',
                header: 'Start Date',
            },
        ],
    },
];

export const WithHeaderGroups: Story = {
    args: {
        data: sampleData.slice(0, 10),
        columns: headerGroupColumns,
        variant: 'zebra',
        enableSorting: true,
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: `
Use column groups to create multi-level headers. Group related columns under parent headers for better organization.

\`\`\`tsx
const columns = [
  {
    header: 'Personal Info',
    columns: [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
    ],
  },
  {
    header: 'Employment',
    columns: [
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'department', header: 'Department' },
    ],
  },
];

<DataTable data={users} columns={columns} />
\`\`\`
                `,
            },
        },
    },
};

/**
 * Header grouping with loading state
 */
const HeaderGroupsWithLoadingExample = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<User[]>([]);

    // Simulate data loading
    const loadData = () => {
        setLoading(true);
        setData([]);
        setTimeout(() => {
            setData(sampleData.slice(0, 10));
            setLoading(false);
        }, 2000);
    };

    // Initial load
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                <Button onClick={loadData} disabled={loading}>
                    {loading ? 'Loading...' : 'Reload Data'}
                </Button>
            </div>
            <DataTable
                data={data}
                columns={headerGroupColumns}
                variant="zebra"
                enableSorting
                bordered
                loading={loading}
                loadingIndicator="line"
                emptyText="No data loaded yet"
            />
        </div>
    );
};

export const HeaderGroupsWithLoading: Story = {
    render: () => <HeaderGroupsWithLoadingExample />,
    parameters: {
        docs: {
            description: {
                story: `
Combine header groups with loading state for a complete data loading experience.
The loading indicator appears under the grouped headers while data is being fetched.

\`\`\`tsx
<DataTable
  data={data}
  columns={groupedColumns}
  loading={isLoading}
  loadingIndicator="line"
/>
\`\`\`
                `,
            },
        },
    },
};

/**
 * Interactive playground
 */
export const Interactive: Story = {
    args: {
        data: sampleData.slice(0, 20),
        columns: basicColumns,
        variant: 'default',
        size: 'md',
        bordered: true,
        enableSorting: true,
        enablePagination: true,
        enableGlobalFilter: true,
        initialPageSize: 10,
        stickyHeader: false,
        loading: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Use the controls to experiment with different DataTable configurations.',
            },
        },
    },
};

// ─── Managed mode (transaction API) stories ──────────────────────────────────

interface Person {
    id: string;
    name: string;
    role: string;
    status: 'active' | 'inactive';
}

const personColumns: ColumnDef<Person, unknown>[] = [
    { accessorKey: 'id', header: 'ID', size: 60 },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const s = getValue() as string;
            return <Badge variant={s === 'active' ? 'success' : 'default'}>{s}</Badge>;
        },
    },
];

const initialPeople: Person[] = [
    { id: '1', name: 'Alice', role: 'Admin', status: 'active' },
    { id: '2', name: 'Bob', role: 'Developer', status: 'active' },
    { id: '3', name: 'Charlie', role: 'Designer', status: 'inactive' },
];

let nextId = 4;

/**
 * Managed mode — transactions via ref
 */
const ManagedModeExample = () => {
    const tableRef = useRef<DataTableRef<Person>>(null);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev.slice(0, 9)]);

    const handleAdd = () => {
        const id = String(nextId++);
        const result = tableRef.current?.applyTransaction({
            add: [{ id, name: `User ${id}`, role: 'Developer', status: 'active' }],
        });
        addLog(`Added row id=${id} → total added: ${result?.add.length}`);
    };

    const handleRemove = () => {
        const result = tableRef.current?.applyTransaction({
            remove: [{ id: '1', name: '', role: '', status: 'active' }],
        });
        if (result?.remove.length) {
            addLog(`Removed row id=1`);
        } else {
            addLog(`Row id=1 not found (warnings: ${result?.warnings.length})`);
        }
    };

    const handleUpdate = () => {
        const result = tableRef.current?.applyTransaction({
            update: [{ id: '2', name: 'Bob (Updated)', role: 'Tech Lead', status: 'active' }],
        });
        if (result?.update.length) {
            addLog(`Updated row id=2`);
        } else {
            addLog(`Row id=2 not found (warnings: ${result?.warnings.length})`);
        }
    };

    const handleUndo = () => {
        // Store last result to be able to undo — demonstrated via setData reset here
        tableRef.current?.setData(initialPeople);
        nextId = 4;
        addLog('Reset to initial data via setData()');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', flexWrap: 'wrap' }}>
                <Button size="sm" onClick={handleAdd}>
                    <Icon name="plus" /> Add row
                </Button>
                <Button size="sm" variant="secondary" onClick={handleUpdate}>
                    Update Bob (id=2)
                </Button>
                <Button size="sm" variant="secondary" onClick={handleRemove}>
                    Remove Alice (id=1)
                </Button>
                <Button size="sm" variant="ghost" onClick={handleUndo}>
                    Reset data
                </Button>
            </div>

            <DataTable
                ref={tableRef}
                initialData={initialPeople}
                columns={personColumns}
                getRowId={(row) => row.id}
                bordered
            />

            {log.length > 0 && (
                <div style={{
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-md)',
                    fontFamily: 'monospace',
                    fontSize: 'var(--bk-font-size-xs)',
                }}>
                    <strong>Transaction log:</strong>
                    {log.map((entry, i) => <div key={i}>{entry}</div>)}
                </div>
            )}
        </div>
    );
};

export const ManagedModeTransactions: Story = {
    render: () => <ManagedModeExample />,
    parameters: {
        docs: {
            description: {
                story: `
**Managed mode** — the table owns its data internally. Use a \`ref\` to apply transactions imperatively without lifting state.

\`\`\`tsx
const tableRef = useRef<DataTableRef<Person>>(null);

// Add a row
tableRef.current?.applyTransaction({ add: [newRow] });

// Update a row (matched by getRowId)
tableRef.current?.applyTransaction({ update: [updatedRow] });

// Remove a row
tableRef.current?.applyTransaction({ remove: [{ id: '1' }] });

// Replace all data
tableRef.current?.setData(newDataArray);

<DataTable
  ref={tableRef}
  initialData={people}
  columns={columns}
  getRowId={(row) => row.id}
/>
\`\`\`

The transaction API processes operations in order: **remove → update → add**.
Unmatched rows produce warnings in the result object instead of throwing.
`,
            },
        },
    },
};

/**
 * Managed mode with undo
 */
const ManagedModeUndoExample = () => {
    const tableRef = useRef<DataTableRef<Person>>(null);
    const undoRef = useRef<(() => void) | null>(null);
    const [canUndo, setCanUndo] = useState(false);
    const [lastAction, setLastAction] = useState<string>('');

    const handleAddRandom = () => {
        const id = String(nextId++);
        const result = tableRef.current?.applyTransaction({
            add: [{ id, name: `User ${id}`, role: 'Analyst', status: 'active' }],
        }, true);
        if (result) {
            undoRef.current = result.undo;
            setCanUndo(true);
            setLastAction(`Added "User ${id}"`);
        }
    };

    const handleRemoveFirst = () => {
        const data = tableRef.current?.getRowData() ?? [];
        if (!data.length) return;
        const result = tableRef.current?.applyTransaction({ remove: [data[0]] }, true);
        if (result?.remove.length) {
            undoRef.current = result.undo;
            setCanUndo(true);
            setLastAction(`Removed "${data[0].name}"`);
        }
    };

    const handleUndo = () => {
        undoRef.current?.();
        undoRef.current = null;
        setCanUndo(false);
        setLastAction('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                <Button size="sm" onClick={handleAddRandom}>
                    <Icon name="plus" /> Add row
                </Button>
                <Button size="sm" variant="secondary" onClick={handleRemoveFirst}>
                    Remove first row
                </Button>
                <Button size="sm" variant="ghost" onClick={handleUndo} disabled={!canUndo}>
                    ↩ Undo{lastAction ? `: ${lastAction}` : ''}
                </Button>
            </div>

            <DataTable
                ref={tableRef}
                initialData={initialPeople}
                columns={personColumns}
                getRowId={(row) => row.id}
                bordered
            />
        </div>
    );
};

export const ManagedModeWithUndo: Story = {
    render: () => <ManagedModeUndoExample />,
    parameters: {
        docs: {
            description: {
                story: `
Every \`applyTransaction()\` call returns an \`undo()\` function that restores the data to its state before the transaction.

\`\`\`tsx
const result = tableRef.current?.applyTransaction({ remove: [row] });

// Later — revert this specific transaction:
result.undo();
\`\`\`
`,
            },
        },
    },
};

/**
 * External hook (controlled mode + useDataTableData)
 */
const ExternalHookExample = () => {
    const { data, applyTransaction } = useDataTableData<Person>({
        initialData: initialPeople,
        getRowId: (row) => row.id,
        onDataChange: (d, tx) => {
            console.log('onDataChange', d.length, 'rows', tx);
        },
    });

    const handleAdd = () => {
        const id = String(nextId++);
        applyTransaction({ add: [{ id, name: `User ${id}`, role: 'Manager', status: 'active' }] });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)' }}>
                <Button size="sm" onClick={handleAdd}>
                    <Icon name="plus" /> Add row
                </Button>
            </div>
            <DataTable
                data={data}
                columns={personColumns}
                getRowId={(row) => row.id}
                bordered
            />
        </div>
    );
};

export const ExternalHookControlled: Story = {
    render: () => <ExternalHookExample />,
    parameters: {
        docs: {
            description: {
                story: `
Use the **\`useDataTableData\`** hook externally when you need to share transaction state across multiple components, or prefer lifting state out of the table.

\`\`\`tsx
const { data, applyTransaction } = useDataTableData<Person>({
  initialData: people,
  getRowId: (row) => row.id,
  onDataChange: (data, tx) => syncToBackend(data),
});

// Pass data as a prop — controlled mode
<DataTable data={data} columns={columns} />
\`\`\`
`,
            },
        },
    },
};

// ─── Async Transactions Story ────────────────────────────────────────

let asyncNextId = 100;

function AsyncTransactionsExample() {
    const ref = useRef<DataTableRef<Person>>(null);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog((prev) => [...prev.slice(-9), msg]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button
                    onClick={() => {
                        const id = String(asyncNextId++);
                        ref.current?.applyTransactionAsync({
                            add: [{ id, name: `Async-${id}`, role: 'Analyst', status: 'active' }],
                        }).then((res) => {
                            addLog(`Flushed: added ${res.add.length} row(s)`);
                        });
                        addLog(`Queued add for id=${id}`);
                    }}
                >
                    Queue Add (async)
                </Button>
                <Button
                    onClick={() => {
                        ref.current?.applyTransactionAsync(
                            { remove: [{ id: '1', name: '', role: '', status: 'active' }] },
                            true,
                        ).then((res) => {
                            addLog(`Flushed: removed ${res.remove.length} row(s)`);
                        });
                        addLog('Queued undoable remove for id=1');
                    }}
                >
                    Queue Remove id=1 (undoable)
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        ref.current?.flushAsyncTransactions();
                        addLog('Manual flush triggered');
                    }}
                >
                    Flush Now
                </Button>
            </div>
            <DataTable
                ref={ref}
                initialData={initialPeople}
                columns={personColumns}
                getRowId={(r) => r.id}
                onAsyncTransactionsFlushed={(event) => {
                    addLog(`onFlushed — add:${event.result.add.length} upd:${event.result.update.length} rem:${event.result.remove.length} undo:${event.undo ? 'yes' : 'no'}`);
                }}
            />
            <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'var(--bk-color-bg-muted, #f5f5f5)', padding: 8, borderRadius: 4, minHeight: 60 }}>
                <strong>Log:</strong>
                {log.map((entry, i) => (
                    <div key={i}>{entry}</div>
                ))}
            </div>
        </div>
    );
}

export const ManagedModeAsyncTransactions: Story = {
    render: () => <AsyncTransactionsExample />,
    parameters: {
        docs: {
            description: {
                story: `
Use **\`applyTransactionAsync\`** to queue multiple transactions that are batched and applied together in the next animation frame. This is ideal for high-frequency updates (e.g., streaming data).

- Multiple queued transactions are **merged** into a single batch (deduplicating updates, removing conflicting updates for removed rows).
- Call **\`flushAsyncTransactions()\`** to apply immediately instead of waiting for the next frame.
- The **\`onAsyncTransactionsFlushed\`** callback fires after each batch, with an optional \`undo\` function when **all** transactions in the batch were undoable.
`,
            },
        },
    },
};
