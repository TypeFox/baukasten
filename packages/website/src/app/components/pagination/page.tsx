'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Pagination, Paragraph, Heading } from 'baukasten-ui';

const paginationProps: PropDefinition[] = [
    {
        name: 'totalItems',
        type: 'number',
        required: true,
        description: 'Total number of items to paginate',
    },
    {
        name: 'currentPage',
        type: 'number',
        required: true,
        description: 'Current active page (1-indexed)',
    },
    {
        name: 'pageSize',
        type: 'number',
        required: true,
        description: 'Number of items displayed per page',
    },
    {
        name: 'onPageChange',
        type: '(page: number) => void',
        required: true,
        description: 'Callback fired when the page changes',
    },
    {
        name: 'pageSizeOptions',
        type: 'number[]',
        default: '[10, 25, 50, 100]',
        description: 'Available options for page size selector',
    },
    {
        name: 'onPageSizeChange',
        type: '(size: number) => void',
        description: 'Callback fired when the page size changes',
    },
    {
        name: 'showPageSizeSelector',
        type: 'boolean',
        default: 'true',
        description: 'Whether to display the page size selector dropdown',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size variant of the pagination controls',
    },
    {
        name: 'maxVisiblePages',
        type: 'number',
        default: '7',
        description: 'Maximum number of page buttons visible before using ellipsis',
    },
    {
        name: 'showRangeText',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show the "X-Y of Z" range text',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

// Basic interactive example
function BasicExample() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
        <Pagination
            totalItems={250}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
        />
    );
}

// Data table example
function DataTableExample() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Mock data
    const allData = Array.from({ length: 150 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
        price: ((i * 7 + 10) % 100).toFixed(2),
    }));

    // Paginate data
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = allData.slice(startIndex, startIndex + pageSize);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 'var(--bk-font-size-sm)',
                }}>
                    <thead>
                        <tr style={{
                            borderBottom: '1px solid var(--vscode-textBlockQuote-border)',
                            backgroundColor: 'var(--vscode-textBlockQuote-background)',
                        }}>
                            <th style={{ padding: 'var(--bk-spacing-2)', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: 'var(--bk-spacing-2)', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: 'var(--bk-spacing-2)', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: 'var(--bk-spacing-2)', textAlign: 'right' }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                style={{
                                    borderBottom: '1px solid var(--vscode-textBlockQuote-border)',
                                }}
                            >
                                <td style={{ padding: 'var(--bk-spacing-2)' }}>{item.id}</td>
                                <td style={{ padding: 'var(--bk-spacing-2)' }}>{item.name}</td>
                                <td style={{ padding: 'var(--bk-spacing-2)' }}>{item.category}</td>
                                <td style={{ padding: 'var(--bk-spacing-2)', textAlign: 'right' }}>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalItems={allData.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}

export default function PaginationPage() {
    const [sizesPage, setSizesPage] = useState<Record<string, number>>({
        xs: 3,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 3,
    });

    const [statesPage, setStatesPage] = useState<Record<string, number>>({
        first: 1,
        middle: 5,
        last: 10,
        many: 15,
        single: 1,
        empty: 1,
    });

    const [compactPage, setCompactPage] = useState(5);
    const [customPage, setCustomPage] = useState(1);
    const [customPageSize, setCustomPageSize] = useState(20);
    const [limitedPage, setLimitedPage] = useState(10);

    const handleSizePageChange = (size: string) => (page: number) => {
        setSizesPage(prev => ({ ...prev, [size]: page }));
    };

    const handleStatePageChange = (state: string) => (page: number) => {
        setStatesPage(prev => ({ ...prev, [state]: page }));
    };

    return (
        <PageLayout
            title="Pagination"
            description="A flexible pagination component for navigating through pages of data with smart controls and optional page size selection. Features intelligent ellipsis for large page counts, range display, and multiple size variants."
        >
            <Showcase
                title="Basic Usage"
                description="Pagination component requires totalItems, currentPage, pageSize, and onPageChange. It automatically calculates page numbers and displays range information."
                preview={<BasicExample />}
                code={`import { Pagination } from 'baukasten-ui';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return (
    <Pagination
      totalItems={250}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  );
}`}
                props={paginationProps}
            />

            <Showcase
                title="Sizes"
                description="Five size variants (xs, sm, md, lg, xl) to match different contexts and visual hierarchies. The size affects padding, font size, and icon size."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                            <div key={size}>
                                <div style={{
                                    fontSize: 'var(--bk-font-size-xs)',
                                    marginBottom: 'var(--bk-spacing-2)',
                                    color: 'var(--vscode-descriptionForeground)'
                                }}>
                                    {size === 'xs' ? 'Extra Small' :
                                        size === 'sm' ? 'Small' :
                                            size === 'md' ? 'Medium (Default)' :
                                                size === 'lg' ? 'Large' : 'Extra Large'}
                                </div>
                                <Pagination
                                    totalItems={100}
                                    currentPage={sizesPage[size]}
                                    pageSize={10}
                                    onPageChange={handleSizePageChange(size)}
                                    size={size}
                                />
                            </div>
                        ))}
                    </div>
                }
                code={`<Pagination
  totalItems={100}
  currentPage={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  size="xs"
/>

<Pagination size="sm" {...props} />
<Pagination size="md" {...props} /> {/* Default */}
<Pagination size="lg" {...props} />
<Pagination size="xl" {...props} />`}
            />

            <Showcase
                title="States"
                description="Various pagination states including first page, middle page, last page, many pages with ellipsis, single page, and empty state."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                First Page (Previous Disabled)
                            </div>
                            <Pagination
                                totalItems={100}
                                currentPage={statesPage.first}
                                pageSize={10}
                                onPageChange={handleStatePageChange('first')}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Middle Page
                            </div>
                            <Pagination
                                totalItems={100}
                                currentPage={statesPage.middle}
                                pageSize={10}
                                onPageChange={handleStatePageChange('middle')}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Last Page (Next Disabled)
                            </div>
                            <Pagination
                                totalItems={100}
                                currentPage={statesPage.last}
                                pageSize={10}
                                onPageChange={handleStatePageChange('last')}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Many Pages (with Ellipsis)
                            </div>
                            <Pagination
                                totalItems={500}
                                currentPage={statesPage.many}
                                pageSize={10}
                                onPageChange={handleStatePageChange('many')}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Single Page
                            </div>
                            <Pagination
                                totalItems={5}
                                currentPage={statesPage.single}
                                pageSize={10}
                                onPageChange={handleStatePageChange('single')}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Empty (No Items)
                            </div>
                            <Pagination
                                totalItems={0}
                                currentPage={statesPage.empty}
                                pageSize={10}
                                onPageChange={handleStatePageChange('empty')}
                            />
                        </div>
                    </div>
                }
                code={`// First page (previous disabled)
<Pagination
  totalItems={100}
  currentPage={1}
  pageSize={10}
  onPageChange={setCurrentPage}
/>

// Last page (next disabled)
<Pagination
  totalItems={100}
  currentPage={10}
  pageSize={10}
  onPageChange={setCurrentPage}
/>

// Many pages (shows ellipsis)
<Pagination
  totalItems={500}
  currentPage={15}
  pageSize={10}
  onPageChange={setCurrentPage}
/>

// Single page (no navigation)
<Pagination
  totalItems={5}
  currentPage={1}
  pageSize={10}
  onPageChange={setCurrentPage}
/>

// Empty state
<Pagination
  totalItems={0}
  currentPage={1}
  pageSize={10}
  onPageChange={setCurrentPage}
/>`}
            />

            <Showcase
                title="Compact Mode"
                description="Compact variant without range text and page size selector. Perfect for space-constrained layouts like mobile views or sidebar navigation."
                preview={
                    <Pagination
                        totalItems={500}
                        currentPage={compactPage}
                        pageSize={25}
                        onPageChange={setCompactPage}
                        showRangeText={false}
                        showPageSizeSelector={false}
                        size="sm"
                    />
                }
                code={`<Pagination
  totalItems={500}
  currentPage={currentPage}
  pageSize={25}
  onPageChange={setCurrentPage}
  showRangeText={false}
  showPageSizeSelector={false}
  size="sm"
/>`}
            />

            <Showcase
                title="Custom Page Sizes"
                description="Customize the page size options to match your specific use case. The dropdown will display these options with a '/page' suffix."
                preview={
                    <Pagination
                        totalItems={200}
                        currentPage={customPage}
                        pageSize={customPageSize}
                        onPageChange={setCustomPage}
                        onPageSizeChange={setCustomPageSize}
                        pageSizeOptions={[5, 20, 50]}
                    />
                }
                code={`<Pagination
  totalItems={200}
  currentPage={currentPage}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[5, 20, 50]}
/>`}
            />

            <Showcase
                title="Limited Visible Pages"
                description="Control the maximum number of visible page buttons with maxVisiblePages. Useful for mobile or narrow layouts. The component intelligently shows ellipsis when there are more pages."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Default (7 visible pages)
                            </div>
                            <Pagination
                                totalItems={500}
                                currentPage={10}
                                pageSize={10}
                                onPageChange={() => { }}
                                maxVisiblePages={7}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Limited (5 visible pages)
                            </div>
                            <Pagination
                                totalItems={500}
                                currentPage={limitedPage}
                                pageSize={10}
                                onPageChange={setLimitedPage}
                                maxVisiblePages={5}
                            />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                marginBottom: 'var(--bk-spacing-2)',
                                color: 'var(--vscode-descriptionForeground)'
                            }}>
                                Very Limited (3 visible pages)
                            </div>
                            <Pagination
                                totalItems={500}
                                currentPage={10}
                                pageSize={10}
                                onPageChange={() => { }}
                                maxVisiblePages={3}
                            />
                        </div>
                    </div>
                }
                code={`// Default (7 visible pages)
<Pagination
  totalItems={500}
  currentPage={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  maxVisiblePages={7}
/>

// Limited for mobile
<Pagination
  totalItems={500}
  currentPage={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  maxVisiblePages={5}
/>

// Very limited
<Pagination
  totalItems={500}
  currentPage={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  maxVisiblePages={3}
/>`}
            />

            <Showcase
                title="With Data Table"
                description="Practical example integrating Pagination with a data table. The component handles page calculations while you manage the data slicing."
                preview={<DataTableExample />}
                code={`import { Pagination } from 'baukasten-ui';
import { useState } from 'react';

function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mock data
  const allData = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    name: \`Item \${i + 1}\`,
    category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
    price: ((i * 7 + 10) % 100).toFixed(2),
  }));

  // Paginate data
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = allData.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>\${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={allData.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}`}
            />

            <div
                style={{
                    marginTop: 'var(--bk-spacing-8)',
                    padding: 'var(--bk-spacing-6)',
                    background: 'var(--vscode-textBlockQuote-background)',
                    border: '1px solid var(--vscode-textBlockQuote-border)',
                    borderRadius: 'var(--bk-radius-md)',
                }}
            >
                <h3 style={{ marginTop: 0, marginBottom: 'var(--bk-spacing-3)' }}>Features & Behavior</h3>
                <ul style={{ marginBottom: 'var(--bk-spacing-4)', paddingLeft: 'var(--bk-spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Smart Ellipsis:</strong> Automatically shows ellipsis (...) when there are more pages than <code>maxVisiblePages</code>
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Range Display:</strong> Shows "X-Y of Z" text to indicate current items being viewed
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Page Size Selector:</strong> Optional dropdown to change items per page, with customizable options
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Auto Reset:</strong> When page size changes, automatically resets to page 1
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Disabled States:</strong> Previous button disabled on first page, next button disabled on last page
                    </li>
                    <li>
                        <strong>Responsive:</strong> All size variants are designed to work across different screen sizes
                    </li>
                </ul>

                <h3 style={{ marginTop: 'var(--bk-spacing-4)', marginBottom: 'var(--bk-spacing-3)' }}>Accessibility</h3>
                <ul style={{ marginBottom: 0, paddingLeft: 'var(--bk-spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>ARIA Labels:</strong> Navigation buttons include <code>aria-label</code> for screen readers
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Current Page:</strong> Active page button has <code>aria-current="page"</code>
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Keyboard Navigation:</strong> All buttons are keyboard accessible with <code>Tab</code> and <code>Enter</code>
                    </li>
                    <li>
                        <strong>Disabled State:</strong> Disabled buttons have <code>disabled</code> attribute and cannot be interacted with
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
