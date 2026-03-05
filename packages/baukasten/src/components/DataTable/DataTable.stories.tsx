import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo, useEffect } from 'react';
import { DataTable } from './DataTable';
import { createSelectColumn, type ColumnDef, type SortingState, type PaginationState, type RowSelectionState } from './DataTable.utils';
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
            const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
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
            description: 'Loading indicator style: "line" shows an animated bar under the header, "spinner" shows a centered overlay',
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
            <div style={{ marginBottom: 'var(--bk-spacing-3)', padding: 'var(--bk-spacing-2)', backgroundColor: 'var(--bk-color-background-secondary)', borderRadius: 'var(--bk-radius-md)' }}>
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

    const columns = useMemo(() => [
        createSelectColumn<User>(),
        ...basicColumns,
    ], []);

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div>
            <div style={{ marginBottom: 'var(--bk-spacing-3)', padding: 'var(--bk-spacing-2)', backgroundColor: 'var(--bk-color-background-secondary)', borderRadius: 'var(--bk-radius-md)' }}>
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
                <Label size='md' style={{ width: 'fit-content' }}>
                    <Icon name="search" />
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Custom search"
                        fullWidth
                    />
                    {
                        value && (
                            <Button variant="ghost" onClick={() => onChange('')}>
                                <Icon name="x" />
                                Clear
                            </Button>
                        )
                    }
                </Label >
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
        <div style={{
            height: '400px',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            padding: 'var(--bk-spacing-2)',
        }}>
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
                <div style={{ fontSize: 'var(--bk-font-size-3xl)', marginBottom: 'var(--bk-spacing-2)' }}>📭</div>
                <div style={{ fontWeight: 'var(--bk-font-weight-medium)', marginBottom: 'var(--bk-spacing-1)' }}>
                    No Data Found
                </div>
                <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-secondary-foreground)', marginBottom: 'var(--bk-spacing-3)' }}>
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
                <div style={{ marginBottom: 'var(--bk-spacing-3)', padding: 'var(--bk-spacing-2)', backgroundColor: 'var(--bk-color-background-secondary)', borderRadius: 'var(--bk-radius-md)' }}>
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
                <div style={{ fontWeight: 'var(--bk-font-weight-medium)' }}>{row.original.name}</div>
                <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-secondary-foreground)' }}>
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
            const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        meta: { align: 'right' },
        cell: () => (
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-1)', justifyContent: 'flex-end' }}>
                <Button size="sm" variant="ghost">Edit</Button>
                <Button size="sm" variant="ghost">Delete</Button>
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

    const columns = useMemo(() => [
        createSelectColumn<User>(),
        ...customColumns,
    ], []);

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
                    <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
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
                    const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
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

