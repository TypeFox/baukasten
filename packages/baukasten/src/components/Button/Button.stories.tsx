import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and styling options. Fully integrates with VSCode/Theia theme variables for consistent theming. Supports icons, different layouts, and all standard button events.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'link'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    width: {
      control: 'select',
      options: [undefined, 'block', 'wide'],
      description: 'Width behavior: block (100%), wide (120px min), or auto',
    },
    outline: {
      control: 'boolean',
      description: 'Render with outline style (inverted colors)',
    },
    circular: {
      control: 'boolean',
      description: 'Render as a circle (useful for icon-only buttons)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all button properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    circular: false,
    disabled: false,
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all button properties. Try different combinations using the controls below.',
      },
    },
  },
};

/**
 * All available button variants displayed side-by-side for comparison.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button variants: **Primary** (main actions), **Secondary** (secondary actions), **Ghost** (minimal emphasis), **Link** (text-only).',
      },
    },
  },
};

/**
 * All available button sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
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
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" outline>Primary Outline</Button>
      <Button variant="secondary" outline>Secondary Outline</Button>
      <Button variant="ghost" outline>Ghost Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outline buttons have transparent backgrounds with colored borders. They fill with solid color on hover.',
      },
    },
  },
};

/**
 * Circular buttons with different sizes, perfect for icon-only actions.
 */
export const CircularButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Circular Sizes
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center' }}>
          <Button circular size="xs">+</Button>
          <Button circular size="sm">+</Button>
          <Button circular size="md">+</Button>
          <Button circular size="lg">+</Button>
          <Button circular size="xl">+</Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Circular Variants
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center' }}>
          <Button variant="primary" circular>✓</Button>
          <Button variant="secondary" circular>×</Button>
          <Button variant="ghost" circular>?</Button>
          <Button variant="primary" circular outline>!</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular buttons are perfect for icon-only actions like close, add, or delete. They maintain a 1:1 aspect ratio.',
      },
    },
  },
};

/**
 * Width options: block (100%), wide (minimum width), and auto (default).
 */
export const WidthOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)', width: '100%', maxWidth: '400px' }}>
      <Button width="block">Block Width (100%)</Button>
      <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>
        <Button width="wide">Wide Button</Button>
        <Button>Auto Width</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Control button width: **block** (100% width), **wide** (minimum width for emphasis), or **auto** (content-based, default).',
      },
    },
  },
};

/**
 * Buttons with icons, including icon-only and icon+text combinations.
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Icon + Text
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">
            <Icon name="check" />
            Save Changes
          </Button>
          <Button variant="secondary">
            <Icon name="list-unordered" />
            View Details
          </Button>
          <Button variant="ghost">
            <Icon name="export" />
            Export
          </Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Icon Only
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center' }}>
          <Button variant="primary">
            <Icon name="check" />
          </Button>
          <Button variant="secondary" circular>
            <Icon name="close" />
          </Button>
          <Button variant="ghost" circular>
            <Icon name="watch" />
          </Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Icons Scale with Button Size
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Button variant="primary" size="xs">
            <Icon name="save" />
            XS Button
          </Button>
          <Button variant="primary" size="sm">
            <Icon name="save" />
            SM Button
          </Button>
          <Button variant="primary" size="md">
            <Icon name="save" />
            MD Button
          </Button>
          <Button variant="primary" size="lg">
            <Icon name="save" />
            LG Button
          </Button>
          <Button variant="primary" size="xl">
            <Icon name="save" />
            XL Button
          </Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Circular Icons Scale with Button Size
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center' }}>
          <Button variant="secondary" circular size="xs">
            <Icon name="add" />
          </Button>
          <Button variant="secondary" circular size="sm">
            <Icon name="add" />
          </Button>
          <Button variant="secondary" circular size="md">
            <Icon name="add" />
          </Button>
          <Button variant="secondary" circular size="lg">
            <Icon name="add" />
          </Button>
          <Button variant="secondary" circular size="xl">
            <Icon name="add" />
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons support Codicons. Icons automatically scale with font size and respect the button color. Use circular buttons for icon-only actions.',
      },
    },
  },
};

/**
 * Disabled and loading states across variants.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Disabled Buttons
        </h4>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="ghost" disabled>Ghost Disabled</Button>
          <Button variant="primary" outline disabled>Outline Disabled</Button>
          <Button variant="primary" circular disabled>+</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons have reduced opacity and prevent all interactions. The disabled state works with all variants and styles.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all button variants, sizes, states, and combinations.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)' }}>
      {/* Filled Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Filled Variants</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Outline Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Outline Variants</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" outline>Primary Outline</Button>
          <Button variant="secondary" outline>Secondary Outline</Button>
          <Button variant="ghost" outline>Ghost Outline</Button>
        </div>
      </div>

      {/* Size Variations (Primary) */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Button variant="primary" size="xs">Extra Small</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </div>
      </div>

      {/* Circular Buttons */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Circular Buttons</h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--gap-xs)', alignItems: 'center' }}>
            <Button variant="primary" circular size="xs">+</Button>
            <Button variant="primary" circular size="sm">+</Button>
            <Button variant="primary" circular size="md">+</Button>
            <Button variant="primary" circular size="lg">+</Button>
            <Button variant="primary" circular size="xl">+</Button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--gap-xs)', alignItems: 'center' }}>
            <Button variant="secondary" circular>×</Button>
            <Button variant="ghost" circular>?</Button>
            <Button variant="primary" circular outline>!</Button>
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">
            <Icon name="check" />
            With Icon
          </Button>
          <Button variant="secondary">
            <Icon name="save" />
            Save Changes
          </Button>
          <Button variant="ghost">
            <Icon name="close" />
          </Button>
          <Button variant="primary" circular>
            <Icon name="watch" />
          </Button>
        </div>
      </div>

      {/* Width Variations */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Width Variations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)', maxWidth: '400px' }}>
          <Button variant="primary" width="block">Block Width (100%)</Button>
          <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>
            <Button variant="secondary" width="wide">Wide Button</Button>
            <Button variant="ghost">Auto Width</Button>
          </div>
        </div>
      </div>

      {/* Disabled States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Disabled States</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="ghost" disabled>Ghost Disabled</Button>
          <Button variant="primary" outline disabled>Outline Disabled</Button>
          <Button variant="primary" circular disabled>+</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all button capabilities: variants, sizes, states, circular mode, icons, and width options. Use this as a reference for all available combinations.',
      },
    },
  },
};
