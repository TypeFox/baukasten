import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A navigation component that shows the user\'s current location within the application hierarchy. Supports custom separators, sizing, icons, and automatic item collapsing for long paths.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items to display',
    },
    variant: {
      control: 'select',
      options: ['default', 'pill'],
      description: 'Visual style variant of the breadcrumbs',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
      table: {
        defaultValue: { summary: '/' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the breadcrumbs',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display (rest will be collapsed)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Aria label for accessibility',
      table: {
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all breadcrumbs properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
    variant: 'default',
    separator: '/',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all breadcrumbs properties. Try different combinations using the controls below.',
      },
    },
  },
};

/**
 * All available variants displayed for comparison.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-xl)', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-sm)' }}>
          Default variant
        </div>
        <Breadcrumbs
          variant="default"
          items={[
            { label: 'Home', href: '/', icon: <Icon name="home" /> },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-sm)' }}>
          Pill variant
        </div>
        <Breadcrumbs
          variant="pill"
          items={[
            { label: 'Home', href: '/', icon: <Icon name="home" /> },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-sm)' }}>
          Pill variant with chevron separator
        </div>
        <Breadcrumbs
          variant="pill"
          separator={<Icon name="chevron-right" />}
          items={[
            { label: 'Home', href: '/', icon: <Icon name="home" /> },
            { label: 'Documents', href: '/docs', icon: <Icon name="file" /> },
            { label: 'Projects', href: '/docs/projects', icon: <Icon name="folder" /> },
            { label: 'README.md', icon: <Icon name="markdown" /> },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs come in two variants: **default** (minimal text links) and **pill** (rounded background badges). The pill variant is great for more prominent navigation.',
      },
    },
  },
};

/**
 * All available sizes displayed for comparison.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Extra Small (xs)
        </div>
        <Breadcrumbs
          size="xs"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Small (sm)
        </div>
        <Breadcrumbs
          size="sm"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Medium (md) - Default
        </div>
        <Breadcrumbs
          size="md"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Large (lg)
        </div>
        <Breadcrumbs
          size="lg"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Extra Large (xl)
        </div>
        <Breadcrumbs
          size="xl"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs are available in five sizes: **xs**, **sm**, **md** (default), **lg**, and **xl**. Choose the size that best fits your UI hierarchy.',
      },
    },
  },
};

/**
 * Different separator styles for breadcrumbs.
 */
export const Separators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Default (/)
        </div>
        <Breadcrumbs
          separator="/"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Greater Than (›)
        </div>
        <Breadcrumbs
          separator="›"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Arrow (→)
        </div>
        <Breadcrumbs
          separator="→"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
          Chevron Icon
        </div>
        <Breadcrumbs
          separator={<Icon name="chevron-right" />}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize the separator between breadcrumb items. You can use text, symbols, or even icon components.',
      },
    },
  },
};

/**
 * Breadcrumbs with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', alignItems: 'flex-start' }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', icon: <Icon name="home" /> },
          { label: 'Projects', href: '/projects', icon: <Icon name="folder" /> },
          { label: 'Settings', icon: <Icon name="settings-gear" /> },
        ]}
      />
      <Breadcrumbs
        separator={<Icon name="chevron-right" />}
        items={[
          { label: 'Home', href: '/', icon: <Icon name="home" /> },
          { label: 'Documents', href: '/docs', icon: <Icon name="file" /> },
          { label: 'README.md', icon: <Icon name="markdown" /> },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Add icons to breadcrumb items for better visual recognition. Icons are displayed before the label text.',
      },
    },
  },
};

/**
 * Collapsed breadcrumbs with maxItems.
 */
export const CollapsedItems: Story = {
  render: () => {
    const longPath = [
      { label: 'Root', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Web Development', href: '/projects/web' },
      { label: 'React Apps', href: '/projects/web/react' },
      { label: 'Components', href: '/projects/web/react/components' },
      { label: 'UI Library', href: '/projects/web/react/components/ui' },
      { label: 'Breadcrumbs' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', alignItems: 'flex-start', maxWidth: '600px' }}>
        <div>
          <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
            Full path (7 items)
          </div>
          <Breadcrumbs items={longPath} />
        </div>
        <div>
          <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
            Collapsed to 4 items
          </div>
          <Breadcrumbs items={longPath} maxItems={4} />
        </div>
        <div>
          <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-gap-xs)' }}>
            Collapsed to 3 items
          </div>
          <Breadcrumbs items={longPath} maxItems={3} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `maxItems` to collapse long breadcrumb paths. Middle items are replaced with an ellipsis, showing the first item and the last N-1 items.',
      },
    },
  },
};

/**
 * Breadcrumbs with click handlers instead of hrefs.
 */
export const WithClickHandlers: Story = {
  render: () => {
    const handleClick = (label: string) => {
      alert(`Navigating to: ${label}`);
    };

    return (
      <Breadcrumbs
        items={[
          { label: 'Dashboard', onClick: () => handleClick('Dashboard') },
          { label: 'Projects', onClick: () => handleClick('Projects') },
          { label: 'Settings', onClick: () => handleClick('Settings') },
          { label: 'Profile' },
        ]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `onClick` handlers for client-side routing (e.g., React Router, Next.js). Click any item to see the handler in action.',
      },
    },
  },
};

/**
 * Real-world file browser navigation example.
 */
export const FileBrowserExample: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--bk-gap-md)',
      padding: 'var(--bk-padding-lg)',
      background: 'var(--bk-color-background-secondary)',
      borderRadius: 'var(--bk-radius-md)',
      minWidth: '500px',
    }}>
      <div>
        <div style={{
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)',
          marginBottom: 'var(--bk-gap-sm)',
          color: 'var(--bk-color-foreground)',
        }}>
          File Explorer
        </div>
        <Breadcrumbs
          separator={<Icon name="chevron-right" />}
          items={[
            { label: 'Home', href: '/', icon: <Icon name="home" /> },
            { label: 'workspace', href: '/workspace', icon: <Icon name="folder" /> },
            { label: 'src', href: '/workspace/src', icon: <Icon name="folder-opened" /> },
            { label: 'components', href: '/workspace/src/components', icon: <Icon name="folder-opened" /> },
            { label: 'Breadcrumbs.tsx', icon: <Icon name="symbol-class" /> },
          ]}
        />
      </div>
      <div style={{
        height: '1px',
        background: 'var(--bk-color-divider)',
      }} />
      <div style={{
        fontSize: 'var(--bk-font-size-sm)',
        color: 'var(--bk-color-foreground-muted)',
      }}>
        File content would appear here...
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A realistic file browser navigation example showing how breadcrumbs can be used in a VSCode extension or file explorer UI.',
      },
    },
  },
};

/**
 * Settings page navigation example.
 */
export const SettingsNavigationExample: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--bk-gap-md)',
      padding: 'var(--bk-padding-lg)',
      background: 'var(--bk-color-background)',
      borderRadius: 'var(--bk-radius-md)',
      minWidth: '500px',
    }}>
      <Breadcrumbs
        size="lg"
        items={[
          { label: 'Settings', href: '/settings', icon: <Icon name="settings-gear" /> },
          { label: 'Editor', href: '/settings/editor' },
          { label: 'Font' },
        ]}
      />
      <div style={{
        height: '1px',
        background: 'var(--bk-color-divider)',
        margin: 'var(--bk-gap-sm) 0',
      }} />
      <div>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Font Settings
        </h3>
        <div style={{
          fontSize: 'var(--bk-font-size-sm)',
          color: 'var(--bk-color-foreground-muted)',
        }}>
          Configure your editor font preferences...
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Settings page navigation showing hierarchical settings structure. Perfect for deep configuration UIs.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all breadcrumbs features.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{
      padding: 'var(--bk-padding-xl)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--bk-gap-xl)',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div>
        <h2 style={{
          margin: '0 0 var(--bk-gap-lg) 0',
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
        }}>
          Breadcrumbs Component
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-md)',
          color: 'var(--bk-color-foreground-muted)',
          margin: 0,
        }}>
          Navigation component showing the user's location in the app hierarchy
        </p>
      </div>

      <section>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Basic Usage
        </h3>
        <div style={{
          padding: 'var(--bk-padding-lg)',
          background: 'var(--bk-color-background-secondary)',
          borderRadius: 'var(--bk-radius-md)',
        }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Electronics' },
            ]}
          />
        </div>
      </section>

      <section>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          With Icons
        </h3>
        <div style={{
          padding: 'var(--bk-padding-lg)',
          background: 'var(--bk-color-background-secondary)',
          borderRadius: 'var(--bk-radius-md)',
        }}>
          <Breadcrumbs
            separator={<Icon name="chevron-right" />}
            items={[
              { label: 'Home', href: '/', icon: <Icon name="home" /> },
              { label: 'Workspace', href: '/workspace', icon: <Icon name="folder" /> },
              { label: 'src', href: '/workspace/src', icon: <Icon name="folder-opened" /> },
              { label: 'App.tsx', icon: <Icon name="file-code" /> },
            ]}
          />
        </div>
      </section>

      <section>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Variants
        </h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--bk-gap-md)',
        }}>
          <div style={{
            padding: 'var(--bk-padding-lg)',
            background: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-md)',
          }}>
            <div style={{
              fontSize: 'var(--bk-font-size-sm)',
              color: 'var(--bk-color-foreground-muted)',
              marginBottom: 'var(--bk-gap-sm)',
            }}>
              Default
            </div>
            <Breadcrumbs
              variant="default"
              items={[
                { label: 'Home', href: '/', icon: <Icon name="home" /> },
                { label: 'Products', href: '/products' },
                { label: 'Electronics' },
              ]}
            />
          </div>
          <div style={{
            padding: 'var(--bk-padding-lg)',
            background: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-md)',
          }}>
            <div style={{
              fontSize: 'var(--bk-font-size-sm)',
              color: 'var(--bk-color-foreground-muted)',
              marginBottom: 'var(--bk-gap-sm)',
            }}>
              Pill
            </div>
            <Breadcrumbs
              variant="pill"
              items={[
                { label: 'Home', href: '/', icon: <Icon name="home" /> },
                { label: 'Products', href: '/products' },
                { label: 'Electronics' },
              ]}
            />
          </div>
        </div>
      </section>

      <section>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Sizes
        </h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--bk-gap-md)',
        }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div
              key={size}
              style={{
                padding: 'var(--bk-padding-md)',
                background: 'var(--bk-color-background-secondary)',
                borderRadius: 'var(--bk-radius-md)',
              }}
            >
              <Breadcrumbs
                size={size}
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Products', href: '/products' },
                  { label: `Size: ${size}` },
                ]}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{
          margin: '0 0 var(--bk-gap-md) 0',
          fontSize: 'var(--bk-font-size-lg)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Long Paths with Collapse
        </h3>
        <div style={{
          padding: 'var(--bk-padding-lg)',
          background: 'var(--bk-color-background-secondary)',
          borderRadius: 'var(--bk-radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--bk-gap-md)',
        }}>
          <Breadcrumbs
            items={[
              { label: 'Root', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'Web', href: '/projects/web' },
              { label: 'React', href: '/projects/web/react' },
              { label: 'Components', href: '/projects/web/react/components' },
              { label: 'UI', href: '/projects/web/react/components/ui' },
              { label: 'Breadcrumbs.tsx' },
            ]}
            maxItems={4}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A comprehensive showcase of all breadcrumbs features including basic usage, icons, variants (default and pill), sizes, and collapsed long paths.',
      },
    },
  },
};
