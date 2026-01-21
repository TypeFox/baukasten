import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Table } from './Table';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A feature-rich table component with support for sorting, sticky headers, row selection, and more. Fully integrates with the Baukasten design system for seamless VSCode-style tables.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'zebra'],
            description: 'Visual variant of the table',
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the table cells',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        bordered: {
            control: 'boolean',
            description: 'Whether to show borders',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the table should take full width',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
        caption: {
            control: 'text',
            description: 'Table caption for accessibility',
        },
        captionSide: {
            control: 'select',
            options: ['top', 'bottom'],
            description: 'Position of the caption',
            table: {
                defaultValue: { summary: 'top' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * Interactive playground with all table properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    args: {
        variant: 'default',
        size: 'md',
        bordered: true,
        fullWidth: true,
        caption: 'User Management Table',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all table properties. Try different combinations using the controls below.',
            },
        },
    },
    render: (args) => (
        <Table {...args}>
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell align="right">Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>John Doe</Table.Cell>
                    <Table.Cell>john@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell align="right">
                        <Button size="sm">Edit</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Jane Smith</Table.Cell>
                    <Table.Cell>jane@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                    <Table.Cell align="right">
                        <Button size="sm">Edit</Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Bob Johnson</Table.Cell>
                    <Table.Cell>bob@example.com</Table.Cell>
                    <Table.Cell>Designer</Table.Cell>
                    <Table.Cell align="right">
                        <Button size="sm">Edit</Button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};

/**
 * All available table variants: default and zebra striping.
 */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Default Variant
                </h4>
                <Table variant="default" size="md" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell align="center">Stock</Table.HeaderCell>
                            <Table.HeaderCell align="right">Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {[1, 2, 3, 4].map((i) => (
                            <Table.Row key={i}>
                                <Table.Cell>Product {i}</Table.Cell>
                                <Table.Cell align="center">{i * 10}</Table.Cell>
                                <Table.Cell align="right">${(i * 9.99).toFixed(2)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Zebra Variant
                </h4>
                <Table variant="zebra" size="md" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell align="center">Stock</Table.HeaderCell>
                            <Table.HeaderCell align="right">Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {[1, 2, 3, 4].map((i) => (
                            <Table.Row key={i}>
                                <Table.Cell>Product {i}</Table.Cell>
                                <Table.Cell align="center">{i * 10}</Table.Cell>
                                <Table.Cell align="right">${(i * 9.99).toFixed(2)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Two visual variants available: **default** (solid background) and **zebra** (alternating row colors for better readability with large datasets).',
            },
        },
    },
};

/**
 * Table with zebra striping for better readability - kept for backwards compatibility
 */
export const ZebraStriping: Story = {
    args: {
        variant: 'zebra',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Zebra striping with alternating row colors. **Note**: See the Variants story for a side-by-side comparison.',
            },
            source: {
                code: `<Table variant="zebra" size="md" bordered>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Product</Table.HeaderCell>
      <Table.HeaderCell align="center">Stock</Table.HeaderCell>
      <Table.HeaderCell align="right">Price</Table.HeaderCell>
      <Table.HeaderCell align="right">Total</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {Array.from({ length: 8 }, (_, i) => (
      <Table.Row key={i}>
        <Table.Cell>Product {i + 1}</Table.Cell>
        <Table.Cell align="center">{Math.floor(Math.random() * 100)}</Table.Cell>
        <Table.Cell align="right">$99.99</Table.Cell>
        <Table.Cell align="right">$199.98</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => {
        // Generate deterministic data for consistent display
        const products = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
            id: i,
            name: `Product ${i}`,
            stock: ((i * 13) % 100),
            price: ((i * 7.3) % 100).toFixed(2),
            total: ((i * 13.7) % 1000).toFixed(2),
        }));

        return (
            <Table {...args}>
                <Table.Head>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell align="center">Stock</Table.HeaderCell>
                        <Table.HeaderCell align="right">Price</Table.HeaderCell>
                        <Table.HeaderCell align="right">Total</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {products.map((product) => (
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell align="center">{product.stock}</Table.Cell>
                            <Table.Cell align="right">${product.price}</Table.Cell>
                            <Table.Cell align="right">${product.total}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    },
};

/**
 * Table with sticky header - fixed height container
 * The maxHeight prop creates a scrollable container where the header sticks to the top
 * Perfect for dashboards, modals, or any fixed-height layout
 */
export const StickyHeaderFixedHeight: Story = {
    args: {
        variant: 'zebra',
        size: 'md',
        bordered: true,
        maxHeight: 300,
    },
    parameters: {
        docs: {
            description: {
                story: `
### Sticky Headers with Fixed Height

Use the \`maxHeight\` prop to create a self-contained scrollable table with a sticky header.

#### Usage

\`\`\`tsx
<Table maxHeight={300}>  {/* or "50vh" or "calc(100vh - 200px)" */}
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell>Column</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {/* Many rows... */}
  </Table.Body>
</Table>
\`\`\`

#### When to Use
- ✅ Dashboards with fixed-height widgets
- ✅ Modals or dialogs
- ✅ Side panels
- ✅ Any layout where the table should have its own scrollbar

#### Notes
- Headers automatically get solid backgrounds to prevent content bleeding
- \`maxHeight\` accepts numbers (pixels) or CSS strings (\`"50vh"\`, \`"calc(100vh - 200px)"\`)
- No wrapper div needed - it's all built in!
                `,
            },
            source: {
                code: `<Table maxHeight={300} variant="zebra">
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell>ID</Table.HeaderCell>
      <Table.HeaderCell>Title</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
      <Table.HeaderCell>Date</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {Array.from({ length: 50 }, (_, i) => (
      <Table.Row key={i}>
        <Table.Cell>#{i + 1}</Table.Cell>
        <Table.Cell>Item {i + 1}</Table.Cell>
        <Table.Cell>Description for item {i + 1}</Table.Cell>
        <Table.Cell>2024-01-{(i % 30) + 1}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => (
        <Table {...args}>
            <Table.Head sticky>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {Array.from({ length: 50 }, (_, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>#{i + 1}</Table.Cell>
                        <Table.Cell>Item {i + 1}</Table.Cell>
                        <Table.Cell>This is a description for item {i + 1}</Table.Cell>
                        <Table.Cell>2024-01-{(i % 30) + 1}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
};

/**
 * Table with sticky header - page scrolling
 * No maxHeight needed - header sticks to viewport when page scrolls
 * Perfect for full-page tables and reports
 */
export const StickyHeaderPageScroll: Story = {
    args: {
        variant: 'default',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: `
### Sticky Headers with Page Scrolling

For full-page tables, just set \`sticky\` on the header - no \`maxHeight\` needed!

#### Usage

\`\`\`tsx
<Table>
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell>Column</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {/* Many rows... */}
  </Table.Body>
</Table>
\`\`\`

#### When to Use
- ✅ Full-page data tables
- ✅ Reports and analytics pages
- ✅ Any table where the whole page scrolls

#### Difference from Fixed Height
- **Fixed Height** (\`maxHeight\`): Table has its own scrollbar, header sticks to table top
- **Page Scroll** (no \`maxHeight\`): Page scrolls normally, header sticks to viewport top

Choose based on your layout needs!
                `,
            },
            source: {
                code: `<Table variant="default">
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell>ID</Table.HeaderCell>
      <Table.HeaderCell>Title</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
      <Table.HeaderCell>Date</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {Array.from({ length: 100 }, (_, i) => (
      <Table.Row key={i}>
        <Table.Cell>#{i + 1}</Table.Cell>
        <Table.Cell>Item {i + 1}</Table.Cell>
        <Table.Cell>Description for item {i + 1}</Table.Cell>
        <Table.Cell>2024-01-{(i % 30) + 1}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => (
        <div>
            <p style={{ marginBottom: 'var(--spacing-4)' }}>
                Scroll down the page to see the header stick to the viewport top
            </p>
            <Table {...args}>
                <Table.Head sticky>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {Array.from({ length: 100 }, (_, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>#{i + 1}</Table.Cell>
                            <Table.Cell>Item {i + 1}</Table.Cell>
                            <Table.Cell>This is a description for item {i + 1}</Table.Cell>
                            <Table.Cell>2024-01-{(i % 30) + 1}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    ),
};

/**
 * Table with sortable columns
 */
const SortableTable = () => {
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({ key: '', direction: null });

    const handleSort = (key: string) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === 'asc'
                    ? 'desc'
                    : prev.key === key && prev.direction === 'desc'
                        ? null
                        : 'asc',
        }));
    };

    const sortedData = useMemo(() => {
        const data = [
            { name: 'Alice', age: 32, department: 'Engineering', salary: 95000 },
            { name: 'Bob', age: 28, department: 'Design', salary: 75000 },
            { name: 'Charlie', age: 45, department: 'Management', salary: 120000 },
            { name: 'Diana', age: 29, department: 'Engineering', salary: 88000 },
            { name: 'Eve', age: 36, department: 'Marketing', salary: 82000 },
        ];

        if (!sortConfig.direction) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key as keyof typeof a];
            const bVal = b[sortConfig.key as keyof typeof b];

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortConfig]);

    return (
        <Table variant="default">
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortConfig.key === 'name' ? sortConfig.direction : null}
                        onSort={() => handleSort('name')}
                    >
                        Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortConfig.key === 'age' ? sortConfig.direction : null}
                        onSort={() => handleSort('age')}
                        align="center"
                    >
                        Age
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortConfig.key === 'department' ? sortConfig.direction : null}
                        onSort={() => handleSort('department')}
                    >
                        Department
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sortable
                        sortDirection={sortConfig.key === 'salary' ? sortConfig.direction : null}
                        onSort={() => handleSort('salary')}
                        align="right"
                    >
                        Salary
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {sortedData.map((person, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{person.name}</Table.Cell>
                        <Table.Cell align="center">{person.age}</Table.Cell>
                        <Table.Cell>{person.department}</Table.Cell>
                        <Table.Cell align="right">${person.salary.toLocaleString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export const Sortable: Story = {
    render: () => <SortableTable />,
    parameters: {
        docs: {
            source: {
                code: `const [sortConfig, setSortConfig] = useState<{
  key: string;
  direction: 'asc' | 'desc' | null;
}>({ key: '', direction: null });

const handleSort = (key: string) => {
  setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === 'asc'
      ? 'desc'
      : prev.key === key && prev.direction === 'desc'
        ? null
        : 'asc'
  }));
};

const sortedData = useMemo(() => {
  if (!sortConfig.direction) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
}, [sortConfig]);

return (
  <Table variant="default">
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell
          sortable
          sortDirection={sortConfig.key === 'name' ? sortConfig.direction : null}
          onSort={() => handleSort('name')}
        >
          Name
        </Table.HeaderCell>
        <Table.HeaderCell
          sortable
          sortDirection={sortConfig.key === 'age' ? sortConfig.direction : null}
          onSort={() => handleSort('age')}
          align="center"
        >
          Age
        </Table.HeaderCell>
        {/* ... more columns ... */}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {sortedData.map((person, i) => (
        <Table.Row key={i}>
          <Table.Cell>{person.name}</Table.Cell>
          <Table.Cell align="center">{person.age}</Table.Cell>
          {/* ... more cells ... */}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);`,
            },
            description: {
                story: `
### Sortable Columns

The Table uses a **controlled component pattern** for sorting - it provides the UI while you handle the logic.

#### Implementation Steps

1. **Manage sort state** - Track which column and direction
2. **Pass \`sortable={true}\`** - Makes columns clickable with hover effects
3. **Pass \`sortDirection\`** - Shows sort indicators (↑ ↓ ↕)
4. **Pass \`onSort\`** - Callback fired when column is clicked
5. **Sort your data** - Implement your sorting logic
6. **Render sorted data** - Map over the sorted array

#### What the Table Provides
- 🎨 Visual feedback (hover states, cursor pointer)
- 🔄 Sort direction indicators (↑ ↓ ↕)
- 🎯 Click handling
- 📱 Accessibility features

#### What You Provide
- 📊 Sort state management
- 🔢 Sorting logic (numeric, alphabetic, dates, custom)
- 🗂️ Sorted data

#### Example Code

\`\`\`tsx
const [sortConfig, setSortConfig] = useState({ key: '', direction: null });

const handleSort = (key: string) => {
  setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === 'asc' 
      ? 'desc' 
      : prev.key === key && prev.direction === 'desc' 
        ? null 
        : 'asc'
  }));
};

const sortedData = useMemo(() => {
  if (!sortConfig.direction) return data;
  return [...data].sort((a, b) => {
    // Your sorting logic here
  });
}, [data, sortConfig]);

// In your JSX:
<Table.HeaderCell
  sortable
  sortDirection={sortConfig.key === 'name' ? sortConfig.direction : null}
  onSort={() => handleSort('name')}
>
  Name
</Table.HeaderCell>

{sortedData.map(row => <Table.Row>...</Table.Row>)}
\`\`\`

#### Benefits of This Pattern
- ✅ **Flexibility** - Full control over sorting algorithm
- ✅ **Server-side** - Can fetch sorted data from API instead of client-side sorting
- ✅ **Performance** - Optimize for large datasets with your own logic
- ✅ **Composability** - Works with any data structure or state management
                `,
            },
        },
    },
};

/**
 * Table with merged cells (colspan/rowspan)
 */
export const MergedCells: Story = {
    args: {
        variant: 'default',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            source: {
                code: `<Table variant="default" size="md" bordered>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Quarter</Table.HeaderCell>
      <Table.HeaderCell>Revenue</Table.HeaderCell>
      <Table.HeaderCell>Expenses</Table.HeaderCell>
      <Table.HeaderCell>Profit</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell rowSpan={3}>Q1 2024</Table.Cell>
      <Table.Cell>$50,000</Table.Cell>
      <Table.Cell>$30,000</Table.Cell>
      <Table.Cell>$20,000</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>$55,000</Table.Cell>
      <Table.Cell>$32,000</Table.Cell>
      <Table.Cell>$23,000</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>$60,000</Table.Cell>
      <Table.Cell>$35,000</Table.Cell>
      <Table.Cell>$25,000</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell colSpan={3} align="right"><strong>Total Profit:</strong></Table.Cell>
      <Table.Cell><strong>$68,000</strong></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => (
        <Table {...args}>
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell>Project</Table.HeaderCell>
                    <Table.HeaderCell colSpan={2} align="center">
                        Timeline
                    </Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Start</Table.HeaderCell>
                    <Table.HeaderCell>End</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell rowSpan={2}>Website Redesign</Table.Cell>
                    <Table.Cell>2024-01-01</Table.Cell>
                    <Table.Cell>2024-03-31</Table.Cell>
                    <Table.Cell>
                        <Badge variant="warning">In Progress</Badge>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan={2} align="center">
                        Phase 1: Complete
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Mobile App</Table.Cell>
                    <Table.Cell>2024-02-15</Table.Cell>
                    <Table.Cell>2024-06-30</Table.Cell>
                    <Table.Cell>
                        <Badge variant="info">Planning</Badge>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};

/**
 * Table with footer for summary data
 */
export const WithFooter: Story = {
    args: {
        variant: 'zebra',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            source: {
                code: `<Table variant="zebra" size="md" bordered>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Item</Table.HeaderCell>
      <Table.HeaderCell align="center">Quantity</Table.HeaderCell>
      <Table.HeaderCell align="right">Price</Table.HeaderCell>
      <Table.HeaderCell align="right">Total</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Product A</Table.Cell>
      <Table.Cell align="center">5</Table.Cell>
      <Table.Cell align="right">$10.00</Table.Cell>
      <Table.Cell align="right">$50.00</Table.Cell>
    </Table.Row>
    {/* ... more rows ... */}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colSpan={3} align="right">
        <strong>Grand Total:</strong>
      </Table.Cell>
      <Table.Cell align="right">
        <strong>$220.00</strong>
      </Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>`,
            },
        },
    },
    render: (args) => (
        <Table {...args}>
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell align="center">Quantity</Table.HeaderCell>
                    <Table.HeaderCell align="right">Price</Table.HeaderCell>
                    <Table.HeaderCell align="right">Subtotal</Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Product A</Table.Cell>
                    <Table.Cell align="center">5</Table.Cell>
                    <Table.Cell align="right">$25.00</Table.Cell>
                    <Table.Cell align="right">$125.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Product B</Table.Cell>
                    <Table.Cell align="center">3</Table.Cell>
                    <Table.Cell align="right">$42.50</Table.Cell>
                    <Table.Cell align="right">$127.50</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Product C</Table.Cell>
                    <Table.Cell align="center">8</Table.Cell>
                    <Table.Cell align="right">$15.75</Table.Cell>
                    <Table.Cell align="right">$126.00</Table.Cell>
                </Table.Row>
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell colSpan={3} align="right">
                        Total:
                    </Table.Cell>
                    <Table.Cell align="right">$378.50</Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table>
    ),
};

/**
 * Table with different size options
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4 style={{ marginBottom: '8px' }}>Extra Small</h4>
                <Table size="xs" variant="zebra">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Item 1</Table.Cell>
                            <Table.Cell>100</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Item 2</Table.Cell>
                            <Table.Cell>200</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <div>
                <h4 style={{ marginBottom: '8px' }}>Small</h4>
                <Table size="sm" variant="zebra">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Item 1</Table.Cell>
                            <Table.Cell>100</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Item 2</Table.Cell>
                            <Table.Cell>200</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <div>
                <h4 style={{ marginBottom: '8px' }}>Medium (Default)</h4>
                <Table size="md" variant="zebra">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Item 1</Table.Cell>
                            <Table.Cell>100</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Item 2</Table.Cell>
                            <Table.Cell>200</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <div>
                <h4 style={{ marginBottom: '8px' }}>Large</h4>
                <Table size="lg" variant="zebra">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Item 1</Table.Cell>
                            <Table.Cell>100</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Item 2</Table.Cell>
                            <Table.Cell>200</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <div>
                <h4 style={{ marginBottom: '8px' }}>Extra Large</h4>
                <Table size="xl" variant="zebra">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Item 1</Table.Cell>
                            <Table.Cell>100</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Item 2</Table.Cell>
                            <Table.Cell>200</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    ),
};

/**
 * Table with empty state when no data is available.
 */
export const EmptyState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Default Empty Message
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body empty />
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Custom Empty Message
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body empty emptyText="No users found. Add a user to get started." />
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Custom Empty Component
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body
                        empty
                        emptyComponent={
                            <div style={{ padding: 'var(--spacing-4)', textAlign: 'center' }}>
                                <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>📭</div>
                                <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-1)' }}>No Data Found</div>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary-foreground)' }}>
                                    Try adjusting your filters or add new items
                                </div>
                                <Button size="sm" style={{ marginTop: 'var(--spacing-3)' }}>Add Item</Button>
                            </div>
                        }
                    />
                </Table>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Empty state handling for tables with no data. Customize with `emptyText` or `emptyComponent` props for a better user experience.',
            },
        },
    },
};

/**
 * Table with loading state while data is being fetched.
 */
export const LoadingState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Default Loading Message
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body loading />
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Custom Loading Message
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body loading loadingText="Fetching user data..." />
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Custom Loading Component
                </h4>
                <Table variant="default" bordered>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body
                        loading
                        loadingComponent={
                            <div style={{ padding: 'var(--spacing-6)', textAlign: 'center' }}>
                                <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</div>
                                <div style={{ marginTop: 'var(--spacing-2)', fontWeight: 'var(--font-weight-medium)' }}>Loading data...</div>
                                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                            </div>
                        }
                    />
                </Table>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Loading state for tables while data is being fetched. Customize with `loadingText` or `loadingComponent` props.',
            },
        },
    },
};

/**
 * Table with caption for accessibility and context.
 */
export const WithCaption: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Caption at Top (Default)
                </h4>
                <Table variant="zebra" bordered caption="Q4 2024 Sales Report" captionSide="top">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell align="right">Revenue</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Product A</Table.Cell>
                            <Table.Cell align="right">$50,000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Product B</Table.Cell>
                            <Table.Cell align="right">$75,000</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Caption at Bottom
                </h4>
                <Table variant="default" bordered caption="Data as of December 31, 2024" captionSide="bottom">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell align="right">Revenue</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Product A</Table.Cell>
                            <Table.Cell align="right">$50,000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Product B</Table.Cell>
                            <Table.Cell align="right">$75,000</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Add captions to your tables for better accessibility and context. Captions can be positioned at the top (default) or bottom of the table.',
            },
        },
    },
};

/**
 * Table with selectable rows and select all functionality
 */
const SelectableRowsTable = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com' },
    ];

    const toggleRow = (index: number) => {
        setSelectedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((_, index) => index));
        }
    };

    const allSelected = selectedRows.length === data.length && data.length > 0;
    const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-3)', padding: 'var(--spacing-2)', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                Selected: {selectedRows.length} of {data.length}
            </div>
            <Table variant="default">
                <Table.Head>
                    <Table.Row>
                        <Table.HeaderCell style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                ref={(input) => {
                                    if (input) {
                                        input.indeterminate = someSelected;
                                    }
                                }}
                                onChange={toggleSelectAll}
                                aria-label="Select all rows"
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((item, index) => (
                        <Table.Row
                            key={item.id}
                            selected={selectedRows.includes(index)}
                            onClick={() => toggleRow(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Table.Cell>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() => toggleRow(index)}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`Select ${item.name}`}
                                />
                            </Table.Cell>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export const SelectableRows: Story = {
    render: () => <SelectableRowsTable />,
    parameters: {
        docs: {
            description: {
                story: `
### Selectable Rows with Select All

Complete example showing row selection with a "select all" checkbox in the header.

#### Features Demonstrated
- ✅ **Select All Checkbox** - Header checkbox to select/deselect all rows
- ✅ **Indeterminate State** - Shows dash when some (but not all) rows selected
- ✅ **Individual Checkboxes** - Each row has its own checkbox
- ✅ **Visual Feedback** - Selected rows are highlighted
- ✅ **Selection Counter** - Shows how many rows are selected
- ✅ **Accessibility** - Proper ARIA labels on checkboxes

#### Implementation Pattern

\`\`\`tsx
const [selectedRows, setSelectedRows] = useState<number[]>([]);

// Toggle individual row
const toggleRow = (index: number) => {
  setSelectedRows(prev =>
    prev.includes(index)
      ? prev.filter(i => i !== index)
      : [...prev, index]
  );
};

// Toggle all rows
const toggleSelectAll = () => {
  if (selectedRows.length === data.length) {
    setSelectedRows([]);
  } else {
    setSelectedRows(data.map((_, index) => index));
  }
};

// Calculate states
const allSelected = selectedRows.length === data.length && data.length > 0;
const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

// In your JSX:
<Table.HeaderCell>
  <input
    type="checkbox"
    checked={allSelected}
    ref={input => {
      if (input) input.indeterminate = someSelected;
    }}
    onChange={toggleSelectAll}
    aria-label="Select all rows"
  />
</Table.HeaderCell>

// In body rows:
<Table.Row selected={selectedRows.includes(index)}>
  <Table.Cell>
    <input
      type="checkbox"
      checked={selectedRows.includes(index)}
      onChange={() => toggleRow(index)}
      aria-label={\`Select \${item.name}\`}
    />
  </Table.Cell>
  {/* ... other cells ... */}
</Table.Row>
\`\`\`

#### Key Points
- Use \`ref\` to set \`indeterminate\` state on the select-all checkbox
- Track selection with an array of indices or IDs
- Pass \`selected\` prop to highlight selected rows
- Use \`aria-label\` for accessibility
                `,
            },
            source: {
                code: `const [selectedRows, setSelectedRows] = useState<number[]>([]);

const toggleRow = (index: number) => {
  setSelectedRows(prev =>
    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
  );
};

const toggleSelectAll = () => {
  if (selectedRows.length === data.length) {
    setSelectedRows([]);
  } else {
    setSelectedRows(data.map((_, index) => index));
  }
};

const allSelected = selectedRows.length === data.length && data.length > 0;
const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

<Table variant="default">
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell style={{ width: '40px' }}>
        <input
          type="checkbox"
          checked={allSelected}
          ref={input => {
            if (input) input.indeterminate = someSelected;
          }}
          onChange={toggleSelectAll}
          aria-label="Select all rows"
        />
      </Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {data.map((item, index) => (
      <Table.Row key={item.id} selected={selectedRows.includes(index)}>
        <Table.Cell>
          <input
            type="checkbox"
            checked={selectedRows.includes(index)}
            onChange={() => toggleRow(index)}
            aria-label={\`Select \${item.name}\`}
          />
        </Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`,
            },
        },
    },
};

/**
 * Complex table combining multiple features
 */
const ComplexTableExample = () => {
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({ key: '', direction: null });

    // Generate consistent data
    const baseData = useMemo(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            product: `Product ${i + 1}`,
            description: `Description for product ${i + 1} with more details`,
            category: `Category ${(i % 5) + 1}`,
            stock: Math.floor((i * 13) % 100), // Deterministic values for consistent sorting
            price: ((i * 7.3) % 100).toFixed(2),
            status: i % 3 === 0 ? 'In Stock' : i % 3 === 1 ? 'Low' : 'Out',
        })),
        []);

    // Sort the data
    const sortedData = useMemo(() => {
        if (!sortConfig.direction) return baseData;

        const sorted = [...baseData].sort((a, b) => {
            const aVal = a[sortConfig.key as keyof typeof a];
            const bVal = b[sortConfig.key as keyof typeof b];

            // Convert to numbers for numeric columns
            if (sortConfig.key === 'stock') {
                const aNum = Number(aVal);
                const bNum = Number(bVal);
                if (aNum < bNum) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aNum > bNum) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            } else if (sortConfig.key === 'price') {
                const aNum = parseFloat(String(aVal));
                const bNum = parseFloat(String(bVal));
                if (aNum < bNum) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aNum > bNum) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }

            // String comparison for other fields
            const aStr = String(aVal);
            const bStr = String(bVal);
            if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [baseData, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === 'asc'
                    ? 'desc'
                    : prev.key === key && prev.direction === 'desc'
                        ? null
                        : 'asc',
        }));
    };

    return (
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            <Table variant="zebra" size="sm">
                <Table.Head sticky>
                    <Table.Row>
                        <Table.HeaderCell
                            sortable
                            sortDirection={sortConfig.key === 'id' ? sortConfig.direction : null}
                            onSort={() => handleSort('id')}
                        >
                            ID
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sortable
                            sortDirection={sortConfig.key === 'product' ? sortConfig.direction : null}
                            onSort={() => handleSort('product')}
                        >
                            Product
                        </Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell
                            sortable
                            sortDirection={sortConfig.key === 'category' ? sortConfig.direction : null}
                            onSort={() => handleSort('category')}
                        >
                            Category
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sortable
                            sortDirection={sortConfig.key === 'stock' ? sortConfig.direction : null}
                            onSort={() => handleSort('stock')}
                            align="center"
                        >
                            Stock
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sortable
                            sortDirection={sortConfig.key === 'price' ? sortConfig.direction : null}
                            onSort={() => handleSort('price')}
                            align="right"
                        >
                            Price
                        </Table.HeaderCell>
                        <Table.HeaderCell align="center">Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {sortedData.map((row) => (
                        <Table.Row key={row.id}>
                            <Table.Cell>#{row.id}</Table.Cell>
                            <Table.Cell>{row.product}</Table.Cell>
                            <Table.Cell>{row.description}</Table.Cell>
                            <Table.Cell>{row.category}</Table.Cell>
                            <Table.Cell align="center">{row.stock}</Table.Cell>
                            <Table.Cell align="right">${row.price}</Table.Cell>
                            <Table.Cell align="center">
                                <Badge
                                    variant={
                                        row.status === 'In Stock' ? 'success' : row.status === 'Low' ? 'warning' : 'default'
                                    }
                                >
                                    {row.status}
                                </Badge>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export const ComplexExample: Story = {
    render: () => <ComplexTableExample />,
    parameters: {
        docs: {
            description: {
                story: `
### Complex Table Example

This example demonstrates combining multiple Table features together:

#### Features Combined
- 🦓 **Zebra striping** for better readability
- 📌 **Sticky header** that stays visible when scrolling
- 🔄 **Sortable columns** with client-side sorting
- 📏 **Small size** for compact display
- 🎨 **Custom components** (Badge) in cells
- 📐 **Column alignment** (left, center, right)
- 📊 **Mixed data types** (text, numbers, status)

#### Key Takeaways
1. All features work seamlessly together
2. Sticky headers stay on top while scrolling
3. Sorting works with numeric and text columns
4. Custom components render normally in cells
5. You can mix and match any features you need

#### Implementation Tips
- Use \`useMemo\` for sorting to avoid unnecessary re-renders
- Generate deterministic data for consistent sorting behavior
- Handle numeric columns separately in sort logic
- Combine features gradually as needed for your use case
                `,
            },
        },
    },
};

/**
 * Text overflow and truncation
 */
export const TextOverflow: Story = {
    args: {
        variant: 'default',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: `
### Text Overflow and Truncation

Handle long text content with CSS overflow properties.

#### Techniques Shown
1. **Ellipsis truncation** - Truncate with "..." (Name column)
2. **Word wrap** - Allow text to wrap naturally (Description column)
3. **Fixed width** - Constrain column width

#### CSS for Truncation
\`\`\`css
{
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}
\`\`\`

#### CSS for Wrapping
\`\`\`css
{
  maxWidth: '300px',
  whiteSpace: 'normal',
  wordBreak: 'break-word'
}
\`\`\`
                `,
            },
            source: {
                code: `<Table variant="default" size="md" bordered>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell style={{ width: '200px' }}>Name (Truncated)</Table.HeaderCell>
      <Table.HeaderCell style={{ width: '300px' }}>Description (Wrapped)</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell
        style={{
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        This is a very long name that will be truncated with an ellipsis
      </Table.Cell>
      <Table.Cell
        style={{
          maxWidth: '300px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        This is a long description that will wrap to multiple lines...
      </Table.Cell>
      <Table.Cell>
        <Badge variant="success">Active</Badge>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => (
        <Table {...args}>
            <Table.Head>
                <Table.Row>
                    <Table.HeaderCell style={{ width: '200px' }}>
                        Name (Truncated)
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '300px' }}>
                        Description (Wrapped)
                    </Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell
                        style={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        title="This is a very long name that will be truncated with an ellipsis"
                    >
                        This is a very long name that will be truncated with an ellipsis
                    </Table.Cell>
                    <Table.Cell
                        style={{
                            maxWidth: '300px',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }}
                    >
                        This is a long description that will wrap to multiple lines instead of
                        being truncated. It demonstrates how to handle longer content that needs
                        to remain fully visible.
                    </Table.Cell>
                    <Table.Cell>
                        <Badge variant="success">Active</Badge>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell
                        style={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        title="Another extremely long product name that exceeds the available space"
                    >
                        Another extremely long product name that exceeds the available space
                    </Table.Cell>
                    <Table.Cell
                        style={{
                            maxWidth: '300px',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }}
                    >
                        Short description here.
                    </Table.Cell>
                    <Table.Cell>
                        <Badge variant="warning">Pending</Badge>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};

/**
 * Fixed column widths
 */
export const FixedColumnWidths: Story = {
    args: {
        variant: 'default',
        size: 'md',
        bordered: true,
    },
    parameters: {
        docs: {
            description: {
                story: `
### Fixed Column Widths

Control column widths using the \`style\` prop or \`width\` attribute on header cells.

#### Methods

**1. Using \`style\` prop (Recommended)**
\`\`\`tsx
<Table.HeaderCell style={{ width: '100px' }}>ID</Table.HeaderCell>
<Table.HeaderCell style={{ width: '200px', minWidth: '150px' }}>Name</Table.HeaderCell>
<Table.HeaderCell style={{ width: '40%' }}>Description</Table.HeaderCell>
\`\`\`

**2. Using \`width\` HTML attribute**
\`\`\`tsx
<Table.HeaderCell width="100">ID</Table.HeaderCell>
\`\`\`

#### Tips
- Set widths on **header cells** - they control the entire column
- Use \`minWidth\` to prevent columns from shrinking too much
- Use \`maxWidth\` to prevent columns from growing too large
- Mix fixed widths (px) with flexible widths (%) as needed
- For narrow columns (icons, checkboxes), use small fixed widths
- For content columns, consider using percentages or leaving flexible
- The \`TextOverflow\` story shows how to handle overflow in fixed-width columns

#### Common Patterns
- **Icon/Checkbox column**: \`width: '40px'\` or \`width: '50px'\`
- **ID column**: \`width: '80px'\` or \`width: '100px'\`
- **Actions column**: \`width: '120px'\` to \`width: '200px'\`
- **Content columns**: \`width: '40%'\` or leave flexible
                `,
            },
            source: {
                code: `<Table variant="default" size="md" bordered>
  <Table.Head>
    <Table.Row>
      {/* Fixed narrow width for ID */}
      <Table.HeaderCell style={{ width: '80px' }}>ID</Table.HeaderCell>
      
      {/* Fixed medium width for name */}
      <Table.HeaderCell style={{ width: '200px', minWidth: '150px' }}>
        Name
      </Table.HeaderCell>
      
      {/* Flexible width for description */}
      <Table.HeaderCell>Description</Table.HeaderCell>
      
      {/* Percentage width for status */}
      <Table.HeaderCell style={{ width: '15%' }}>Status</Table.HeaderCell>
      
      {/* Fixed width for actions */}
      <Table.HeaderCell style={{ width: '120px' }} align="right">
        Actions
      </Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>001</Table.Cell>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>This is a description that can wrap...</Table.Cell>
      <Table.Cell>
        <Badge variant="success">Active</Badge>
      </Table.Cell>
      <Table.Cell align="right">
        <Button size="sm">Edit</Button>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
            },
        },
    },
    render: (args) => (
        <div>
            <p style={{ marginBottom: 'var(--spacing-4)', color: 'var(--color-foreground-muted)' }}>
                This table demonstrates different column width strategies: fixed px, percentages, and flexible.
            </p>
            <Table {...args}>
                <Table.Head>
                    <Table.Row>
                        {/* Fixed narrow width for ID */}
                        <Table.HeaderCell style={{ width: '80px' }}>
                            ID
                        </Table.HeaderCell>

                        {/* Fixed medium width with minimum */}
                        <Table.HeaderCell style={{ width: '200px', minWidth: '150px' }}>
                            Name
                        </Table.HeaderCell>

                        {/* Flexible width - takes remaining space */}
                        <Table.HeaderCell>
                            Description
                        </Table.HeaderCell>

                        {/* Percentage-based width */}
                        <Table.HeaderCell style={{ width: '15%' }}>
                            Status
                        </Table.HeaderCell>

                        {/* Fixed width for action buttons */}
                        <Table.HeaderCell style={{ width: '120px' }} align="right">
                            Actions
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>001</Table.Cell>
                        <Table.Cell>John Doe</Table.Cell>
                        <Table.Cell>
                            Senior Software Engineer working on the frontend team
                        </Table.Cell>
                        <Table.Cell>
                            <Badge variant="success">Active</Badge>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button size="sm">Edit</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>002</Table.Cell>
                        <Table.Cell>Jane Smith</Table.Cell>
                        <Table.Cell>
                            Product Designer focused on user experience and accessibility
                        </Table.Cell>
                        <Table.Cell>
                            <Badge variant="success">Active</Badge>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button size="sm">Edit</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>003</Table.Cell>
                        <Table.Cell>Bob Johnson</Table.Cell>
                        <Table.Cell>
                            Marketing Manager handling digital campaigns
                        </Table.Cell>
                        <Table.Cell>
                            <Badge variant="warning">Pending</Badge>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button size="sm">Edit</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>004</Table.Cell>
                        <Table.Cell>Alice Williams</Table.Cell>
                        <Table.Cell>
                            Backend Developer specializing in API design and database optimization
                        </Table.Cell>
                        <Table.Cell>
                            <Badge variant="success">Active</Badge>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button size="sm">Edit</Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    ),
};

/**
 * Responsive table with horizontal scroll
 */
export const ResponsiveTable: Story = {
    args: {
        variant: 'zebra',
        size: 'sm',
        bordered: true,
        fullWidth: false,
    },
    parameters: {
        docs: {
            description: {
                story: `
### Responsive Table with Horizontal Scroll

For tables with many columns, allow horizontal scrolling on smaller screens.

#### Implementation
Wrap the table in a container with \`overflow-x: auto\`:

\`\`\`tsx
<div style={{ overflowX: 'auto', maxWidth: '100%' }}>
  <Table fullWidth={false}>
    {/* Table content */}
  </Table>
</div>
\`\`\`

#### Key Points
- Set \`fullWidth={false}\` on the table
- Table maintains its natural width
- Container provides horizontal scrolling
- Useful for tables with many columns
- Mobile-friendly approach

#### Alternative Approaches
1. **Column hiding** - Hide less important columns on mobile
2. **Cards view** - Switch to card layout on mobile
3. **Grouped rows** - Stack cell data vertically
                `,
            },
            source: {
                code: `<div style={{ overflowX: 'auto', maxWidth: '100%' }}>
  <Table variant="zebra" size="sm" bordered fullWidth={false}>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Department</Table.HeaderCell>
        <Table.HeaderCell>Position</Table.HeaderCell>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Salary</Table.HeaderCell>
        <Table.HeaderCell>Start Date</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {/* ... rows ... */}
    </Table.Body>
  </Table>
</div>`,
            },
        },
    },
    render: (args) => (
        <div>
            <p style={{ marginBottom: 'var(--spacing-4)', color: 'var(--color-foreground-muted)' }}>
                Resize your browser window to see horizontal scrolling on smaller screens
            </p>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <Table {...args}>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Department</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell align="right">Salary</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>001</Table.Cell>
                            <Table.Cell>Alice Johnson</Table.Cell>
                            <Table.Cell>alice.johnson@company.com</Table.Cell>
                            <Table.Cell>Engineering</Table.Cell>
                            <Table.Cell>Senior Software Engineer</Table.Cell>
                            <Table.Cell>San Francisco, CA</Table.Cell>
                            <Table.Cell align="right">$145,000</Table.Cell>
                            <Table.Cell>2022-03-15</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>002</Table.Cell>
                            <Table.Cell>Bob Smith</Table.Cell>
                            <Table.Cell>bob.smith@company.com</Table.Cell>
                            <Table.Cell>Design</Table.Cell>
                            <Table.Cell>Lead Product Designer</Table.Cell>
                            <Table.Cell>New York, NY</Table.Cell>
                            <Table.Cell align="right">$125,000</Table.Cell>
                            <Table.Cell>2021-07-20</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>003</Table.Cell>
                            <Table.Cell>Carol Davis</Table.Cell>
                            <Table.Cell>carol.davis@company.com</Table.Cell>
                            <Table.Cell>Marketing</Table.Cell>
                            <Table.Cell>Marketing Manager</Table.Cell>
                            <Table.Cell>Austin, TX</Table.Cell>
                            <Table.Cell align="right">$95,000</Table.Cell>
                            <Table.Cell>2023-01-10</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    ),
};

/**
 * Comprehensive showcase demonstrating all table features and capabilities.
 */
export const Showcase: Story = {
    render: () => (
        <div style={{ padding: 'var(--spacing-4)', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)' }}>
                Table Component Showcase
            </h2>

            {/* Variants Section */}
            <section style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-4)' }}>
                    Variants
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                    <Table variant="default" caption="Default Variant">
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Feature</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {['Sorting', 'Filtering', 'Pagination'].map((feature, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell>{feature}</Table.Cell>
                                    <Table.Cell><Badge variant="success">Available</Badge></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    <Table variant="zebra" caption="Zebra Striping">
                        <Table.Head>
                            <Table.Row>
                                <Table.HeaderCell>Feature</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {['Sorting', 'Filtering', 'Pagination'].map((feature, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell>{feature}</Table.Cell>
                                    <Table.Cell><Badge variant="success">Available</Badge></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </section>

            {/* Sizes Section */}
            <section style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-4)' }}>
                    Sizes
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                        <Table key={size} size={size} variant="zebra">
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Size</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{size.toUpperCase()}</Table.Cell>
                                    <Table.Cell>Table with {size} size padding and font</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    ))}
                </div>
            </section>

            {/* States Section */}
            <section style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-4)' }}>
                    States
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>Empty State</h4>
                        <Table variant="default" bordered>
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Column 1</Table.HeaderCell>
                                    <Table.HeaderCell>Column 2</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body empty emptyText="No data to display" />
                        </Table>
                    </div>

                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>Loading State</h4>
                        <Table variant="default" bordered>
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Column 1</Table.HeaderCell>
                                    <Table.HeaderCell>Column 2</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body loading />
                        </Table>
                    </div>

                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>Selected Rows</h4>
                        <Table variant="default" bordered>
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Normal Row</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                </Table.Row>
                                <Table.Row selected>
                                    <Table.Cell>Selected Row</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Normal Row</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-4)' }}>
                    Advanced Features
                </h3>
                <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>With Footer</h4>
                        <Table variant="zebra" bordered>
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Item</Table.HeaderCell>
                                    <Table.HeaderCell align="right">Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Product A</Table.Cell>
                                    <Table.Cell align="right">$100</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Product B</Table.Cell>
                                    <Table.Cell align="right">$150</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.Cell><strong>Total</strong></Table.Cell>
                                    <Table.Cell align="right"><strong>$250</strong></Table.Cell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div>

                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>With Accessibility Caption</h4>
                        <Table variant="default" bordered caption="Q4 2024 Financial Report">
                            <Table.Head>
                                <Table.Row>
                                    <Table.HeaderCell>Quarter</Table.HeaderCell>
                                    <Table.HeaderCell align="right">Revenue</Table.HeaderCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Q1</Table.Cell>
                                    <Table.Cell align="right">$250,000</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Q2</Table.Cell>
                                    <Table.Cell align="right">$300,000</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-4)' }}>
                    Complete Feature List
                </h3>
                <Table variant="zebra" size="sm">
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Feature</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell align="center">Supported</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {[
                            { name: 'Variants', desc: 'Default and zebra striping' },
                            { name: 'Sizes', desc: 'Five size options (xs, sm, md, lg, xl)' },
                            { name: 'Sorting', desc: 'Sortable columns with visual indicators' },
                            { name: 'Sticky Headers', desc: 'Headers that stick on scroll' },
                            { name: 'Row Selection', desc: 'Highlight selected rows' },
                            { name: 'Column Alignment', desc: 'Left, center, right alignment' },
                            { name: 'Empty State', desc: 'Customizable empty state messages' },
                            { name: 'Loading State', desc: 'Loading indicators during data fetch' },
                            { name: 'Footer', desc: 'Summary rows with special styling' },
                            { name: 'Caption', desc: 'Accessibility captions (top/bottom)' },
                            { name: 'Merged Cells', desc: 'Colspan and rowspan support' },
                            { name: 'Responsive', desc: 'Horizontal scroll on small screens' },
                            { name: 'Accessibility', desc: 'ARIA labels, scope attributes, keyboard support' },
                        ].map((feature, i) => (
                            <Table.Row key={i}>
                                <Table.Cell><strong>{feature.name}</strong></Table.Cell>
                                <Table.Cell>{feature.desc}</Table.Cell>
                                <Table.Cell align="center">
                                    <Badge variant="success">✓</Badge>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </section>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Comprehensive showcase of all Table component features: variants, sizes, states, sorting, sticky headers, row selection, empty/loading states, footers, captions, and more.',
            },
        },
    },
};
