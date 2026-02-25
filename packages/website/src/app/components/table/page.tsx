'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Table, Heading, Badge, Icon, Button } from 'baukasten-ui/core';

const tableProps: PropDefinition[] = [
    { name: 'variant', type: '"default" | "zebra"', default: '"default"', description: 'Visual variant (zebra adds alternating row colors)' },
    { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size of table cells' },
    { name: 'bordered', type: 'boolean', default: 'true', description: 'Whether to show borders' },
    { name: 'fullWidth', type: 'boolean', default: 'true', description: 'Whether table should take full width' },
    { name: 'maxHeight', type: 'number | string', description: 'Max height for scrollable table (enables sticky headers)' },
    { name: 'caption', type: 'React.ReactNode', description: 'Table caption for accessibility' },
    { name: 'captionSide', type: '"top" | "bottom"', default: '"top"', description: 'Position of caption' },
];

// Sample data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
];

// Sortable table example
function SortableExample() {
    const [sortKey, setSortKey] = useState<string>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>('asc');

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const sorted = [...users].sort((a, b) => {
        if (!sortDir) return 0;
        const aVal = a[sortKey as keyof typeof a];
        const bVal = b[sortKey as keyof typeof b];
        const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === 'asc' ? compare : -compare;
    });

    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortKey === 'name' ? sortDir : undefined}
                        onSort={() => handleSort('name')}
                    >
                        Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortKey === 'email' ? sortDir : undefined}
                        onSort={() => handleSort('email')}
                    >
                        Email
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortKey === 'role' ? sortDir : undefined}
                        onSort={() => handleSort('role')}
                    >
                        Role
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {sorted.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default function TablePage() {
    return (
        <PageLayout
            title="Table"
            description="A feature-rich table component with support for various styles, sizes, sorting, sticky headers, and loading/empty states. Fully integrates with the Baukasten design system."
        >
            <Showcase
                title="Basic Usage"
                description="Table uses a composable API with Table.Head, Table.Body, Table.Row, Table.Cell, and Table.HeaderCell components. This provides full flexibility while maintaining consistent styling."
                preview={
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {users.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.role}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }
                code={`import { Table } from 'baukasten-ui/core';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
];

function App() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`}
                props={tableProps}
            />

            <Showcase
                title="Variants"
                description="Two visual variants: default (standard borders) and zebra (alternating row colors for better readability)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Default
                            </div>
                            <Table variant="default">
                                <Table.Head>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Role</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    {users.map((user) => (
                                        <Table.Row key={user.id}>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.role}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Zebra (Alternating Rows)
                            </div>
                            <Table variant="zebra">
                                <Table.Head>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Role</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    {users.map((user) => (
                                        <Table.Row key={user.id}>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.role}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                }
                code={`// Default variant
<Table variant="default">
  {/* ... */}
</Table>

// Zebra variant (alternating row colors)
<Table variant="zebra">
  {/* ... */}
</Table>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options: xs, sm, md (default), lg, and xl. Affects padding and font size of cells."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <div key={size}>
                                <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                    {size.toUpperCase()}{size === 'md' ? ' (default)' : ''}
                                </div>
                                <Table size={size}>
                                    <Table.Head>
                                        <Table.Row>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Email</Table.HeaderCell>
                                            <Table.HeaderCell>Role</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Head>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>John Doe</Table.Cell>
                                            <Table.Cell>john@example.com</Table.Cell>
                                            <Table.Cell>Admin</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        ))}
                    </div>
                }
                code={`<Table size="xs">{/* ... */}</Table>
<Table size="sm">{/* ... */}</Table>
<Table size="md">{/* ... */}</Table> {/* default */}
<Table size="lg">{/* ... */}</Table>
<Table size="xl">{/* ... */}</Table>`}
            />

            <Showcase
                title="Sortable Columns"
                description="Add sorting functionality to columns using sortable, sortDirection, and onSort props. Click column headers to sort!"
                preview={<SortableExample />}
                code={`import { useState } from 'react';

function App() {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>('asc');
  
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...users].sort(/* sorting logic */);

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell 
            sortable 
            sortDirection={sortKey === 'name' ? sortDir : null}
            onSort={() => handleSort('name')}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell 
            sortable 
            sortDirection={sortKey === 'email' ? sortDir : null}
            onSort={() => handleSort('email')}
          >
            Email
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sorted.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`}
            />

            <Showcase
                title="Column Alignment"
                description="Align cell content using the align prop: left (default), center, or right. Useful for numbers, actions, and status indicators."
                preview={
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell align="center">Status</Table.HeaderCell>
                                <Table.HeaderCell align="right">Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {users.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell align="center">
                                        <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                                            {user.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell align="right">
                                        <Button size="sm">Edit</Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }
                code={`<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell align="center">Status</Table.HeaderCell>
      <Table.HeaderCell align="right">Actions</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell align="center">
        <Badge variant="success">Active</Badge>
      </Table.Cell>
      <Table.Cell align="right">
        <Button size="sm">Edit</Button>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
            />

            <Showcase
                title="Selected & Hoverable Rows"
                description="Highlight selected rows and control hover effects. Rows are hoverable by default."
                preview={
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>John Doe</Table.Cell>
                                <Table.Cell>john@example.com</Table.Cell>
                                <Table.Cell>Admin</Table.Cell>
                            </Table.Row>
                            <Table.Row selected>
                                <Table.Cell>Jane Smith</Table.Cell>
                                <Table.Cell>jane@example.com</Table.Cell>
                                <Table.Cell>Editor</Table.Cell>
                            </Table.Row>
                            <Table.Row hoverable={false}>
                                <Table.Cell>Bob Johnson</Table.Cell>
                                <Table.Cell>bob@example.com</Table.Cell>
                                <Table.Cell>Viewer (No Hover)</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                }
                code={`<Table>
  <Table.Body>
    {/* Normal row (hoverable by default) */}
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
    </Table.Row>
    
    {/* Selected row */}
    <Table.Row selected>
      <Table.Cell>Jane Smith</Table.Cell>
    </Table.Row>
    
    {/* No hover effect */}
    <Table.Row hoverable={false}>
      <Table.Cell>Bob Johnson</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`}
            />

            <Showcase
                title="Loading & Empty States"
                description="Table.Body supports loading and empty states with customizable messages."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Loading State
                            </div>
                            <Table>
                                <Table.Head>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Role</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body loading loadingText="Fetching users..." colSpan={3} />
                            </Table>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Empty State
                            </div>
                            <Table>
                                <Table.Head>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Role</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body empty emptyText="No users found" colSpan={3} />
                            </Table>
                        </div>
                    </div>
                }
                code={`// Loading state
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body loading loadingText="Fetching users..." colSpan={2} />
</Table>

// Empty state
<Table>
  <Table.Head>{/* ... */}</Table.Head>
  <Table.Body empty emptyText="No users found" colSpan={2} />
</Table>`}
            />

            <Showcase
                title="Sticky Headers"
                description="Enable sticky headers that remain visible when scrolling. Requires maxHeight on the Table."
                preview={
                    <Table maxHeight={300}>
                        <Table.Head sticky>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {Array.from({ length: 20 }, (_, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell>User {i + 1}</Table.Cell>
                                    <Table.Cell>user{i + 1}@example.com</Table.Cell>
                                    <Table.Cell>{['Admin', 'Editor', 'Viewer'][i % 3]}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                }
                code={`<Table maxHeight={300}>
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Role</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {/* Many rows... */}
  </Table.Body>
</Table>`}
            />

            <Showcase
                title="With Footer"
                description="Add table footers for summaries, totals, or additional information."
                preview={
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell align="right">Quantity</Table.HeaderCell>
                                <Table.HeaderCell align="right">Price</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Widget A</Table.Cell>
                                <Table.Cell align="right">5</Table.Cell>
                                <Table.Cell align="right">$50.00</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Widget B</Table.Cell>
                                <Table.Cell align="right">3</Table.Cell>
                                <Table.Cell align="right">$75.00</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.Cell><strong>Total</strong></Table.Cell>
                                <Table.Cell align="right"><strong>8</strong></Table.Cell>
                                <Table.Cell align="right"><strong>$125.00</strong></Table.Cell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                }
                code={`<Table>
  <Table.Head>{/* ... */}</Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Widget A</Table.Cell>
      <Table.Cell align="right">5</Table.Cell>
      <Table.Cell align="right">$50.00</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell><strong>Total</strong></Table.Cell>
      <Table.Cell align="right"><strong>8</strong></Table.Cell>
      <Table.Cell align="right"><strong>$125.00</strong></Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Uses semantic HTML: <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Table headers have <code>scope="col"</code> for screen readers
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Sortable columns have <code>role="button"</code>, <code>tabIndex={0}</code>, and <code>aria-sort</code>
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Keyboard support: <code>Enter</code> and <code>Space</code> to activate sorting
                    </li>
                    <li>
                        Use <code>caption</code> prop for accessible table descriptions
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Variants:</strong> Use zebra variant for tables with many rows
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Alignment:</strong> Right-align numbers, center-align status indicators
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Sticky Headers:</strong> Use with <code>maxHeight</code> for long tables
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Loading/Empty:</strong> Always show feedback when data is loading or empty
                    </li>
                    <li>
                        <strong>Captions:</strong> Add descriptive captions for better accessibility
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
