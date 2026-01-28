import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Button } from '../Button';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A circular loading spinner component that follows VSCode design patterns. Uses a rotating border animation to indicate loading or processing states. Perfect for async operations, data fetching, and loading indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'text',
      description: 'Custom color for the spinner (uses semantic token or CSS value)',
      table: {
        defaultValue: { summary: 'var(--bk-color-primary)' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        defaultValue: { summary: 'Loading' },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all spinner properties exposed.
 * Use the controls below to experiment with different sizes and colors.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all spinner properties. Try different sizes and custom colors using the controls below.',
      },
    },
  },
};

/**
 * All available spinner sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
        <Spinner size="xs" />
        <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>xs</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>sm</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
        <Spinner size="md" />
        <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
        <Spinner size="lg" />
        <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>lg</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
        <Spinner size="xl" />
        <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>xl</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. The spinner automatically adjusts border width for larger sizes.',
      },
    },
  },
};

/**
 * Spinners with different semantic color variants.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Semantic Colors
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-primary)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Primary</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-success)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Success</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-warning)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Warning</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-danger)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Danger</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-info)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Info</span>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Custom Colors
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="#ff6600" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>#ff6600</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="#9333ea" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>#9333ea</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="#06b6d4" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>#06b6d4</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners can use semantic color tokens for consistency or custom hex values for specific use cases. Semantic colors automatically adapt to theme changes.',
      },
    },
  },
};

/**
 * Real-world usage examples showing spinners in common UI patterns.
 */
export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          In Buttons
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" disabled>
            <Spinner size="sm" color="var(--bk-color-primary-foreground)" />
            Loading...
          </Button>
          <Button variant="secondary" disabled>
            <Spinner size="sm" color="var(--bk-color-secondary-foreground)" />
            Processing
          </Button>
          <Button variant="ghost" disabled>
            <Spinner size="xs" />
            Save
          </Button>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Standalone Loading States
        </h4>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Loading data...
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)' }}>
            <Spinner size="md" color="var(--bk-color-success)" />
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Syncing...
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Centered Content Loading
        </h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            backgroundColor: 'var(--bk-color-background-elevated)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Spinner size="lg" />
            <p style={{ marginTop: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Loading content...
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Inline with Text
        </h4>
        <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground)' }}>
          Please wait while we fetch your data <Spinner size="xs" /> this may take a moment.
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common usage patterns: in buttons during async operations, standalone loading states, centered content placeholders, and inline with text.',
      },
    },
  },
};

/**
 * Comprehensive showcase demonstrating all spinner capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-8)', display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 'var(--bk-font-size-2xl)', fontWeight: 'var(--bk-font-weight-bold)', marginBottom: 'var(--bk-spacing-2)' }}>
          Spinner Component
        </h2>
        <p style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          A versatile loading spinner that adapts to your design system
        </p>
      </div>

      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner size="xs" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Extra Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner size="md" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner size="lg" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Large</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner size="xl" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Extra Large</span>
          </div>
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Semantic Colors
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-primary)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Primary</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-success)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Success</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-warning)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Warning</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-danger)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Danger</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
            <Spinner color="var(--bk-color-info)" />
            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>Info</span>
          </div>
        </div>
      </div>

      {/* In Buttons */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          In Buttons
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" disabled>
            <Spinner size="sm" color="var(--bk-color-primary-foreground)" />
            Loading...
          </Button>
          <Button variant="secondary" disabled>
            <Spinner size="sm" color="var(--bk-color-secondary-foreground)" />
            Processing
          </Button>
          <Button variant="ghost" disabled>
            <Spinner size="xs" />
            Save
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Loading States
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Loading data...
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)' }}>
            <Spinner size="md" color="var(--bk-color-success)" />
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Syncing...
            </span>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Content Placeholder
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            backgroundColor: 'var(--bk-color-background-elevated)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Spinner size="lg" />
            <p style={{ marginTop: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Loading content...
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all spinner capabilities: sizes, colors, and real-world usage patterns. Use this as a reference for all available options.',
      },
    },
  },
};
