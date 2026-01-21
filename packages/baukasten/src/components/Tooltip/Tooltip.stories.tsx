import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipPlacement } from './Tooltip';
import { Button } from '../Button';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A hover-triggered tooltip component that wraps a trigger element and displays informational content. Supports 12 placements and multiple variants with an optional arrow. Perfect for providing contextual help and information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Placement of the tooltip relative to its trigger',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant of the tooltip',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow/chevron pointing to the trigger',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the tooltip',
      table: {
        defaultValue: { summary: '320px' },
      },
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all tooltip properties exposed.
 * Hover over the button to see the tooltip appear.
 */
export const Interactive: Story = {
  args: {
    content: 'This is a tooltip with customizable properties',
    placement: 'top',
    variant: 'default',
    showArrow: true,
    maxWidth: '320px',
    delay: 0,
    children: <Button>Hover me</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all tooltip properties. Hover over the button and use the controls below to experiment with different configurations.',
      },
    },
  },
};

/**
 * All 12 placements demonstrated with hover interaction on buttons.
 * Hover over each button to see the tooltip appear in the corresponding placement.
 */
export const AllPlacements: Story = {
  render: () => {
    const placements: TooltipPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--spacing-8)',
        padding: 'var(--spacing-8)',
        minHeight: '400px',
        alignItems: 'center',
        justifyItems: 'center',
      }}>
        {placements.map((placement) => (
          <Tooltip
            key={placement}
            content={`Placement: ${placement}`}
            placement={placement}
            variant="primary"
          >
            <Button variant="secondary" size="sm">
              {placement}
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Hover over each button to see the tooltip appear in all 12 possible placements. Notice how the arrow automatically points toward the button in each case.',
      },
    },
  },
};

/**
 * All available tooltip variants displayed for comparison.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Tooltip content="Default variant" variant="default">
        <Button variant="ghost">Default</Button>
      </Tooltip>
      <Tooltip content="Primary variant" variant="primary">
        <Button variant="ghost">Primary</Button>
      </Tooltip>
      <Tooltip content="Success variant" variant="success">
        <Button variant="ghost">Success</Button>
      </Tooltip>
      <Tooltip content="Warning variant" variant="warning">
        <Button variant="ghost">Warning</Button>
      </Tooltip>
      <Tooltip content="Error variant" variant="error">
        <Button variant="ghost">Error</Button>
      </Tooltip>
      <Tooltip content="Info variant" variant="info">
        <Button variant="ghost">Info</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip variants: **Default** (neutral), **Primary** (emphasis), **Success** (positive actions), **Warning** (caution), **Error** (errors/danger), **Info** (information). Hover over each button to see the variant.',
      },
    },
  },
};

/**
 * Interactive hover tooltips with different variants and placements.
 */
export const HoverTooltips: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Action Buttons with Tooltips
          </h4>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tooltip content="Save your changes" placement="top" variant="default">
              <Button variant="primary">
                <Icon name="check" />
                Save
              </Button>
            </Tooltip>

            <Tooltip content="Permanently delete this item" placement="bottom" variant="error">
              <Button variant="secondary">
                <Icon name="trash" />
                Delete
              </Button>
            </Tooltip>

            <Tooltip content="Get more information" placement="right" variant="info">
              <Button variant="ghost" circular>
                <Icon name="info" />
              </Button>
            </Tooltip>

            <Tooltip content="This action cannot be undone" placement="left" variant="warning" maxWidth="200px">
              <Button variant="secondary">
                <Icon name="warning" />
                Warning
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Practical example showing tooltips on action buttons. Hover over each button to see contextual information appear automatically.',
      },
    },
  },
};

/**
 * Tooltips with and without arrows
 */
export const WithAndWithoutArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>With Arrow</span>
        <Tooltip content="This tooltip has an arrow" placement="top" showArrow={true}>
          <Button size="sm">Hover me</Button>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>Without Arrow</span>
        <Tooltip content="This tooltip has no arrow" placement="top" showArrow={false}>
          <Button size="sm">Hover me</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be shown with or without an arrow. The arrow helps visually connect the tooltip to its trigger element.',
      },
    },
  },
};

/**
 * Tooltips with different content types
 */
export const ContentExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip content="Simple text content" variant="default">
        <Button size="sm">Simple Text</Button>
      </Tooltip>

      <Tooltip
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            <strong>Tooltip with structured content</strong>
            <span style={{ fontSize: 'var(--font-size-sm)' }}>
              You can include any React content inside a tooltip.
            </span>
          </div>
        }
        variant="primary"
        maxWidth="400px"
      >
        <Button size="sm">Structured</Button>
      </Tooltip>

      <Tooltip
        content={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
            <Icon name="check" />
            <span>Success with icon</span>
          </div>
        }
        variant="success"
      >
        <Button size="sm">With Icon</Button>
      </Tooltip>

      <Tooltip
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
              <Icon name="info" />
              <strong>Information</strong>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
              This is a longer information message that demonstrates how content wraps within the tooltip.
            </p>
          </div>
        }
        variant="info"
        maxWidth="250px"
      >
        <Button size="sm">Complex Content</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain any React content: simple text, structured layouts, icons, formatted text, and more. Use the maxWidth prop to control text wrapping.',
      },
    },
  },
};

/**
 * Tooltips with delay before appearing
 */
export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Tooltip content="Appears immediately" placement="top" delay={0}>
        <Button size="sm">No Delay</Button>
      </Tooltip>

      <Tooltip content="Appears after 300ms" placement="top" delay={300}>
        <Button size="sm">300ms Delay</Button>
      </Tooltip>

      <Tooltip content="Appears after 500ms" placement="top" delay={500}>
        <Button size="sm">500ms Delay</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'You can add a delay before the tooltip appears. This is useful to prevent tooltips from showing during quick mouse movements.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all tooltip capabilities.
 */
export const Showcase: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)' }}>
        {/* Interactive Hover Example */}
        <div>
          <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            Interactive Hover Examples
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
            <Tooltip content="This appears on top!" placement="top" variant="primary">
              <Button variant="primary" size="sm">Hover for Top</Button>
            </Tooltip>

            <Tooltip content="This appears on bottom!" placement="bottom" variant="success">
              <Button variant="secondary" size="sm">Hover for Bottom</Button>
            </Tooltip>

            <Tooltip content="This appears on left!" placement="left" variant="warning">
              <Button variant="ghost" size="sm">Hover for Left</Button>
            </Tooltip>

            <Tooltip content="This appears on right!" placement="right" variant="info">
              <Button variant="primary" size="sm" outline>Hover for Right</Button>
            </Tooltip>
          </div>
        </div>

        {/* Variants */}
        <div>
          <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            Variants
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
            <Tooltip content="Default variant" variant="default">
              <Button size="sm">Default</Button>
            </Tooltip>
            <Tooltip content="Primary variant" variant="primary">
              <Button size="sm">Primary</Button>
            </Tooltip>
            <Tooltip content="Success variant" variant="success">
              <Button size="sm">Success</Button>
            </Tooltip>
            <Tooltip content="Warning variant" variant="warning">
              <Button size="sm">Warning</Button>
            </Tooltip>
            <Tooltip content="Error variant" variant="error">
              <Button size="sm">Error</Button>
            </Tooltip>
            <Tooltip content="Info variant" variant="info">
              <Button size="sm">Info</Button>
            </Tooltip>
          </div>
        </div>

        {/* Arrow Options */}
        <div>
          <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            Arrow Options
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
            <Tooltip content="With Arrow" showArrow={true}>
              <Button size="sm">With Arrow</Button>
            </Tooltip>
            <Tooltip content="Without Arrow" showArrow={false}>
              <Button size="sm">Without Arrow</Button>
            </Tooltip>
          </div>
        </div>

        {/* Content Examples */}
        <div>
          <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            Content Examples
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
            <Tooltip
              content={
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
                  <Icon name="check" />
                  <span>With Icon</span>
                </div>
              }
              variant="success"
            >
              <Button size="sm">Icon Content</Button>
            </Tooltip>

            <Tooltip
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                  <strong>Structured Content</strong>
                  <span style={{ fontSize: 'var(--font-size-sm)' }}>
                    Tooltips can contain complex layouts.
                  </span>
                </div>
              }
              variant="info"
              maxWidth="300px"
            >
              <Button size="sm">Complex Layout</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all tooltip capabilities: interactive hover examples, 6 variants, arrow options, and various content examples. Hover over any button to see the tooltip in action.',
      },
    },
  },
};
