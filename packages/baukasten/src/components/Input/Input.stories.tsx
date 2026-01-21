import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text input component with size and error message support. Fully integrates with the design system tokens for consistent theming. For labels with prefix/suffix text, use the Label component wrapper.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the input',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width of its container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'HTML input type',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all input properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    placeholder: 'Enter text...',
    disabled: false,
    fullWidth: false,
    type: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all input properties. Try different combinations using the controls below.',
      },
    },
  },
};

/**
 * All available input sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (Default)" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**.',
      },
    },
  },
};

/**
 * Different input types for various data formats.
 */
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input (you@example.com)" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Telephone input" />
      <Input type="url" placeholder="URL input (https://...)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input supports all standard HTML input types: text, email, password, number, tel, url, and more. Browser validation applies based on type.',
      },
    },
  },
};

/**
 * Input states: default, error, and disabled.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '300px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Default State
        </h4>
        <Input placeholder="Enter your username" />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          With Error
        </h4>
        <Input
          placeholder="you@example.com"
          error="Please enter a valid email address"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Disabled State
        </h4>
        <Input
          placeholder="This field is disabled"
          disabled
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Disabled with Error
        </h4>
        <Input
          placeholder="This field is disabled"
          disabled
          error="This field has an error"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input states: **default** (idle), **error** (with error message and red border), **disabled** (non-interactive). Focus state is shown when the input is clicked.',
      },
    },
  },
};

/**
 * Width options: default (inline) and full width.
 */
export const WidthOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Default Width (Inline)
        </h4>
        <Input placeholder="Auto width" />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Full Width
        </h4>
        <Input placeholder="This spans full width" fullWidth />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Multiple Full Width Inputs
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Input placeholder="First Name" fullWidth />
          <Input placeholder="Last Name" fullWidth />
          <Input type="email" placeholder="Email" fullWidth />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Width options: **default** (inline/auto width) or **full width** (100% of container). Use fullWidth for form layouts.',
      },
    },
  },
};

/**
 * Common form patterns and usage examples.
 */
export const FormExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%', maxWidth: '400px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Login Form
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Input type="email" placeholder="Email" fullWidth />
          <Input type="password" placeholder="Password" fullWidth />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Registration Form
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Input placeholder="Full Name" fullWidth />
          <Input type="email" placeholder="Email" fullWidth />
          <Input type="password" placeholder="Password" fullWidth />
          <Input type="password" placeholder="Confirm Password" fullWidth />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Form with Validation
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Input placeholder="Username" fullWidth />
          <Input
            type="email"
            placeholder="Email"
            error="This email is already registered"
            fullWidth
          />
          <Input
            type="password"
            placeholder="Password"
            error="Password must be at least 8 characters"
            fullWidth
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common form patterns: login form, registration form, and forms with validation errors. For labels with prefix/suffix, see the Label component.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all input features and states.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)', maxWidth: '600px' }}>
      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Input size="xs" placeholder="Extra Small" />
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
          <Input size="xl" placeholder="Extra Large" />
        </div>
      </div>

      {/* Input Types */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Input Types
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Input type="text" placeholder="Text" fullWidth />
          <Input type="email" placeholder="Email (you@example.com)" fullWidth />
          <Input type="password" placeholder="Password" fullWidth />
          <Input type="number" placeholder="Number" fullWidth />
        </div>
      </div>

      {/* States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Input placeholder="Default state" fullWidth />
          <Input
            placeholder="With error"
            error="This field is required"
            fullWidth
          />
          <Input
            placeholder="Disabled"
            disabled
            fullWidth
          />
        </div>
      </div>

      {/* Size Variations */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Size Variations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Input size="sm" placeholder="Small input" fullWidth />
          <Input size="lg" placeholder="Large input" fullWidth />
          <Input size="xs" placeholder="Extra small input" fullWidth />
          <Input
            size="md"
            placeholder="Medium with error"
            error="Validation error"
            fullWidth
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all input capabilities: sizes, types, states, and combinations. For label wrappers with prefix/suffix text, see the Label component.',
      },
    },
  },
};
