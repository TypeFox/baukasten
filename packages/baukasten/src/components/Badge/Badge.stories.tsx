import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator or label component with multiple variants and sizes. Supports icons and uses design system tokens for consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant of the badge',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    outline: {
      control: 'boolean',
      description: 'Whether to render the badge with an outline style',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all badge properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    variant: 'default',
    size: 'md',
    outline: false,
    children: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all badge properties. Try different combinations using the controls below.',
      },
    },
  },
};

/**
 * All available badge variants displayed side-by-side for comparison.
 */
export const Variants: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge variants for different semantic states: **Default** (neutral), **Success** (positive), **Warning** (caution), **Error** (negative), **Info** (informational).',
      },
    },
  },
};

/**
 * All available badge sizes from extra small to extra large.
 */
export const Sizes: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">Extra Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. All sizes work with any variant.',
      },
    },
  },
};

/**
 * Outline style variants with transparent backgrounds and colored borders.
 */
export const OutlineVariants: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default" outline>Default</Badge>
      <Badge variant="success" outline>Success</Badge>
      <Badge variant="warning" outline>Warning</Badge>
      <Badge variant="error" outline>Error</Badge>
      <Badge variant="info" outline>Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outline badges have transparent backgrounds with colored borders, providing a lighter visual weight.',
      },
    },
  },
};

/**
 * Badges with icons for enhanced visual communication.
 */
export const WithIcons: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Icon + Text
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success">
            <Icon name="check" />
            Completed
          </Badge>
          <Badge variant="warning">
            <Icon name="warning" />
            Pending
          </Badge>
          <Badge variant="error">
            <Icon name="close" />
            Failed
          </Badge>
          <Badge variant="info">
            <Icon name="info" />
            Info
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Icon Only
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success">
            <Icon name="check" />
          </Badge>
          <Badge variant="error">
            <Icon name="close" />
          </Badge>
          <Badge variant="info">
            <Icon name="info" />
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Icons Scale with Badge Size
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success" size="xs">
            <Icon name="check" />
            XS Badge
          </Badge>
          <Badge variant="success" size="sm">
            <Icon name="check" />
            SM Badge
          </Badge>
          <Badge variant="success" size="md">
            <Icon name="check" />
            MD Badge
          </Badge>
          <Badge variant="success" size="lg">
            <Icon name="check" />
            LG Badge
          </Badge>
          <Badge variant="success" size="xl">
            <Icon name="check" />
            XL Badge
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Icon Only Badges at Different Sizes
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="info" size="xs">
            <Icon name="star" />
          </Badge>
          <Badge variant="info" size="sm">
            <Icon name="star" />
          </Badge>
          <Badge variant="info" size="md">
            <Icon name="star" />
          </Badge>
          <Badge variant="info" size="lg">
            <Icon name="star" />
          </Badge>
          <Badge variant="info" size="xl">
            <Icon name="star" />
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges support Codicons for enhanced visual communication. Icons automatically scale with the badge size and respect the badge color.',
      },
    },
  },
};

/**
 * Common usage patterns for status indicators and counters.
 */
export const UsageExamples: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Status Indicators
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Build Status:</span>
            <Badge variant="success">Passing</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Deployment:</span>
            <Badge variant="warning">In Progress</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>API Status:</span>
            <Badge variant="error">Offline</Badge>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Counters & Notifications
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Notifications</span>
            <Badge variant="error" size="sm">12</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Inbox</span>
            <Badge variant="info" size="sm">42</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Tasks</span>
            <Badge variant="success" size="sm">8</Badge>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Tags & Labels
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap' }}>
          <Badge variant="default" size="sm">TypeScript</Badge>
          <Badge variant="default" size="sm">React</Badge>
          <Badge variant="default" size="sm">Design System</Badge>
          <Badge variant="default" size="sm">UI Components</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common usage patterns: status indicators for builds and deployments, notification counters, and content tags.',
      },
    },
  },
};

/**
 * Single character badges render as circles at all sizes.
 */
export const SingleCharacter: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Single Digits
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="error" size="xs">5</Badge>
          <Badge variant="error" size="sm">5</Badge>
          <Badge variant="error" size="md">5</Badge>
          <Badge variant="error" size="lg">5</Badge>
          <Badge variant="error" size="xl">5</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Single Letters
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="info" size="xs">A</Badge>
          <Badge variant="info" size="sm">B</Badge>
          <Badge variant="info" size="md">C</Badge>
          <Badge variant="info" size="lg">D</Badge>
          <Badge variant="info" size="xl">E</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Single Character Variants
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="default">1</Badge>
          <Badge variant="success">2</Badge>
          <Badge variant="warning">3</Badge>
          <Badge variant="error">4</Badge>
          <Badge variant="info">5</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Single Character Outline
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="default" outline>1</Badge>
          <Badge variant="success" outline>2</Badge>
          <Badge variant="warning" outline>3</Badge>
          <Badge variant="error" outline>4</Badge>
          <Badge variant="info" outline>5</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single digit and letter badges render as circles. The badge automatically maintains equal width and height for short content, creating a perfectly round shape with `border-radius: full`.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all badge variants, sizes, and styles.
 */
export const Showcase: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)' }}>
      {/* Filled Badges - All Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Filled Badges
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      {/* Outline Badges - All Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Outline Badges
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="default" outline>Default</Badge>
          <Badge variant="success" outline>Success</Badge>
          <Badge variant="warning" outline>Warning</Badge>
          <Badge variant="error" outline>Error</Badge>
          <Badge variant="info" outline>Info</Badge>
        </div>
      </div>

      {/* All Sizes (Success Variant) */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          All Sizes (Success Variant)
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success" size="xs">XS</Badge>
          <Badge variant="success" size="sm">SM</Badge>
          <Badge variant="success" size="md">MD</Badge>
          <Badge variant="success" size="lg">LG</Badge>
          <Badge variant="success" size="xl">XL</Badge>
        </div>
      </div>

      {/* All Sizes Outline (Error Variant) */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          All Sizes Outline (Error Variant)
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="error" outline size="xs">XS</Badge>
          <Badge variant="error" outline size="sm">SM</Badge>
          <Badge variant="error" outline size="md">MD</Badge>
          <Badge variant="error" outline size="lg">LG</Badge>
          <Badge variant="error" outline size="xl">XL</Badge>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          With Icons
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success">
            <Icon name="check" />
            Completed
          </Badge>
          <Badge variant="warning">
            <Icon name="warning" />
            Pending
          </Badge>
          <Badge variant="error">
            <Icon name="close" />
            Failed
          </Badge>
          <Badge variant="info">
            <Icon name="info" />
            Info
          </Badge>
        </div>
      </div>

      {/* Mixed Sizes and Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Mixed Combinations
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success" size="xs">XS Success</Badge>
          <Badge variant="warning" size="sm" outline>SM Warning</Badge>
          <Badge variant="error" size="md">MD Error</Badge>
          <Badge variant="info" size="lg" outline>LG Info</Badge>
          <Badge variant="default" size="xl">XL Default</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all badge capabilities: variants, sizes, outline styles, and icon support. Use this as a reference for all available combinations.',
      },
    },
  },
};
