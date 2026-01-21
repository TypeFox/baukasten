import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

/**
 * Pagination component for navigating through pages of data with optional page size selection.
 * Features smart ellipsis for large page counts, range display, and size variants.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 0, max: 1000, step: 10 },
      description: 'Total number of items to paginate',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page (1-indexed)',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 100, step: 5 },
      description: 'Number of items displayed per page',
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback fired when the page changes',
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Available options for page size selector',
      table: {
        defaultValue: { summary: '[10, 25, 50, 100]' },
      },
    },
    onPageSizeChange: {
      action: 'page-size-changed',
      description: 'Callback fired when the page size changes',
    },
    showPageSizeSelector: {
      control: 'boolean',
      description: 'Whether to display the page size selector dropdown',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant of the pagination controls',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 15 },
      description: 'Maximum number of page buttons visible before using ellipsis',
      table: {
        defaultValue: { summary: '7' },
      },
    },
    showRangeText: {
      control: 'boolean',
      description: 'Whether to show the "X-Y of Z" range text',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Interactive playground for the Pagination component.
 * Use controls to experiment with different props and configurations.
 */
export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const [pageSize, setPageSize] = useState(args.pageSize);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
  args: {
    totalItems: 250,
    currentPage: 1,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    showPageSizeSelector: true,
    size: 'md',
    maxVisiblePages: 7,
    showRangeText: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive pagination with all features enabled. Try changing pages, adjusting page size, and modifying controls.',
      },
    },
  },
};

/**
 * Different size variants for the Pagination component.
 */
export const Sizes: Story = {
  render: () => {
    const ExampleWithSize = ({ size }: { size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) => {
      const [currentPage, setCurrentPage] = useState(3);
      const [pageSize, setPageSize] = useState(10);

      return (
        <Pagination
          totalItems={100}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          size={size}
        />
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>Extra Small (xs)</p>
          <ExampleWithSize size="xs" />
        </div>
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>Small (sm)</p>
          <ExampleWithSize size="sm" />
        </div>
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>Medium (md)</p>
          <ExampleWithSize size="md" />
        </div>
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>Large (lg)</p>
          <ExampleWithSize size="lg" />
        </div>
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>Extra Large (xl)</p>
          <ExampleWithSize size="xl" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination supports five size variants to match different contexts and visual hierarchies.',
      },
    },
  },
};

/**
 * Different pagination states and edge cases.
 */
export const States: Story = {
  render: () => {
    const StateExample = ({ label, ...props }: { label: string } & React.ComponentProps<typeof Pagination>) => {
      const [currentPage, setCurrentPage] = useState(props.currentPage);
      const [pageSize, setPageSize] = useState(props.pageSize);

      return (
        <div>
          <p style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>{label}</p>
          <Pagination
            {...props}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xl)' }}>
        <StateExample
          label="First Page"
          totalItems={100}
          currentPage={1}
          pageSize={10}
        />
        <StateExample
          label="Middle Page"
          totalItems={100}
          currentPage={5}
          pageSize={10}
        />
        <StateExample
          label="Last Page"
          totalItems={100}
          currentPage={10}
          pageSize={10}
        />
        <StateExample
          label="Single Page"
          totalItems={5}
          currentPage={1}
          pageSize={10}
        />
        <StateExample
          label="Empty (No Items)"
          totalItems={0}
          currentPage={1}
          pageSize={10}
        />
        <StateExample
          label="Many Pages (with Ellipsis)"
          totalItems={500}
          currentPage={15}
          pageSize={10}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Various pagination states including first page, last page, single page, empty state, and many pages with ellipsis.',
      },
    },
  },
};

/**
 * Compact pagination without range text and page size selector.
 */
export const Compact: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return (
      <Pagination
        totalItems={500}
        currentPage={currentPage}
        pageSize={25}
        onPageChange={setCurrentPage}
        showRangeText={false}
        showPageSizeSelector={false}
        size="sm"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant without range text and page size selector. Perfect for space-constrained layouts.',
      },
    },
  },
};

/**
 * Pagination with custom page size options.
 */
export const CustomPageSizes: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    return (
      <Pagination
        totalItems={200}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 20, 50]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom page size options tailored to specific use cases.',
      },
    },
  },
};

/**
 * Pagination with limited visible page buttons.
 */
export const LimitedVisiblePages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(10);

    return (
      <Pagination
        totalItems={500}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        maxVisiblePages={5}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with limited visible page buttons (maxVisiblePages=5). Useful for mobile or narrow layouts.',
      },
    },
  },
};

/**
 * Pagination integrated with a simple data table example.
 */
export const WithDataTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Mock data
    const allData = Array.from({ length: 250 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
      price: ((i * 7 + 10) % 100).toFixed(2),
    }));

    // Paginate data
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = allData.slice(startIndex, startIndex + pageSize);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--font-size-sm)',
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-background-secondary)',
              }}>
                <th style={{ padding: 'var(--spacing-2)', textAlign: 'left' }}>ID</th>
                <th style={{ padding: 'var(--spacing-2)', textAlign: 'left' }}>Name</th>
                <th style={{ padding: 'var(--spacing-2)', textAlign: 'left' }}>Category</th>
                <th style={{ padding: 'var(--spacing-2)', textAlign: 'right' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <td style={{ padding: 'var(--spacing-2)' }}>{item.id}</td>
                  <td style={{ padding: 'var(--spacing-2)' }}>{item.name}</td>
                  <td style={{ padding: 'var(--spacing-2)' }}>{item.category}</td>
                  <td style={{ padding: 'var(--spacing-2)', textAlign: 'right' }}>${item.price}</td>
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Practical example of Pagination integrated with a data table, showing how to paginate and display data.',
      },
    },
  },
};

/**
 * Comprehensive showcase of the Pagination component.
 * Displays all major variants and configurations in a single view.
 */
export const Showcase: Story = {
  render: () => {
    const ShowcaseSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
      <div style={{
        marginBottom: 'var(--spacing-8)',
        padding: 'var(--spacing-6)',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: 'var(--radius-md)',
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: 'var(--spacing-4)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
        }}>
          {title}
        </h2>
        {children}
      </div>
    );

    const Example = ({ label, ...props }: { label?: string } & React.ComponentProps<typeof Pagination>) => {
      const [currentPage, setCurrentPage] = useState(props.currentPage);
      const [pageSize, setPageSize] = useState(props.pageSize);

      return (
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          {label && (
            <p style={{
              marginBottom: 'var(--spacing-2)',
              color: 'var(--color-foreground-muted)',
              fontSize: 'var(--font-size-sm)',
            }}>
              {label}
            </p>
          )}
          <Pagination
            {...props}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      );
    };

    return (
      <div style={{ padding: 'var(--spacing-6)' }}>
        <h1 style={{
          marginTop: 0,
          marginBottom: 'var(--spacing-2)',
          fontSize: 'var(--font-size-hero)',
          fontWeight: 'var(--font-weight-bold)',
        }}>
          Pagination Component
        </h1>
        <p style={{
          marginBottom: 'var(--spacing-8)',
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-secondary-foreground)',
        }}>
          Navigate through pages of data with smart controls and optional page size selection.
        </p>

        <ShowcaseSection title="Sizes">
          <Example label="Extra Small" totalItems={100} currentPage={3} pageSize={10} size="xs" />
          <Example label="Small" totalItems={100} currentPage={3} pageSize={10} size="sm" />
          <Example label="Medium (Default)" totalItems={100} currentPage={3} pageSize={10} size="md" />
          <Example label="Large" totalItems={100} currentPage={3} pageSize={10} size="lg" />
          <Example label="Extra Large" totalItems={100} currentPage={3} pageSize={10} size="xl" />
        </ShowcaseSection>

        <ShowcaseSection title="States">
          <Example label="First Page" totalItems={100} currentPage={1} pageSize={10} />
          <Example label="Middle Page" totalItems={100} currentPage={5} pageSize={10} />
          <Example label="Last Page" totalItems={100} currentPage={10} pageSize={10} />
          <Example label="Many Pages with Ellipsis" totalItems={500} currentPage={15} pageSize={10} />
        </ShowcaseSection>

        <ShowcaseSection title="Configurations">
          <Example
            label="Full Featured (Default)"
            totalItems={250}
            currentPage={5}
            pageSize={25}
            pageSizeOptions={[10, 25, 50, 100]}
          />
          <Example
            label="Compact (No Range Text, No Page Size Selector)"
            totalItems={250}
            currentPage={5}
            pageSize={25}
            showRangeText={false}
            showPageSizeSelector={false}
            size="sm"
          />
          <Example
            label="Limited Visible Pages (maxVisiblePages=5)"
            totalItems={500}
            currentPage={10}
            pageSize={10}
            maxVisiblePages={5}
          />
          <Example
            label="Custom Page Sizes"
            totalItems={200}
            currentPage={2}
            pageSize={20}
            pageSizeOptions={[5, 20, 50]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Edge Cases">
          <Example label="Single Page" totalItems={5} currentPage={1} pageSize={10} />
          <Example label="Empty (No Items)" totalItems={0} currentPage={1} pageSize={10} />
          <Example label="Two Pages" totalItems={25} currentPage={1} pageSize={15} />
        </ShowcaseSection>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase of all Pagination variants, sizes, states, and configurations.',
      },
    },
  },
};
