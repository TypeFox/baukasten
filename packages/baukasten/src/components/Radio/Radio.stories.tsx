import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './';
import { Label } from '../Label';
import { useState } from 'react';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button component for selecting a single option from a group. Use with the Label component (variant="checkbox") for accessible labels, and RadioGroup for managing group state. Fully integrates with VSCode/Theia theme variables for consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the radio button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    value: {
      control: 'text',
      description: 'Value of the radio button (required)',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all radio properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    checked: false,
    disabled: false,
    value: 'option1',
    name: 'interactive',
  },
  render: (args) => (
    <Label variant="checkbox" size={args.size}>
      <Radio {...args} />
      <span>Radio option</span>
    </Label>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all radio properties. Try different combinations using the controls below. The radio is wrapped in a Label component with variant="checkbox".',
      },
    },
  },
};

/**
 * All available radio sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
      <Label variant="checkbox" size="xs">
        <Radio size="xs" name="size-demo" value="xs" />
        <span>Extra Small</span>
      </Label>
      <Label variant="checkbox" size="sm">
        <Radio size="sm" name="size-demo" value="sm" />
        <span>Small</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio size="md" name="size-demo" value="md" defaultChecked />
        <span>Medium (default)</span>
      </Label>
      <Label variant="checkbox" size="lg">
        <Radio size="lg" name="size-demo" value="lg" />
        <span>Large</span>
      </Label>
      <Label variant="checkbox" size="xl">
        <Radio size="xl" name="size-demo" value="xl" />
        <span>Extra Large</span>
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons come in 5 sizes: **xs**, **sm**, **md** (default), **lg**, and **xl**. The Label component\'s size should match the Radio size for proper alignment.',
      },
    },
  },
};

/**
 * Radio buttons in different states: default, checked, and disabled.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Default States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Radio name="state-default" value="unchecked" />
            <span>Unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Radio name="state-default" value="checked" defaultChecked />
            <span>Checked</span>
          </Label>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Disabled States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Radio name="state-disabled" value="unchecked" disabled />
            <span>Disabled unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Radio name="state-disabled" value="checked" disabled defaultChecked />
            <span>Disabled checked</span>
          </Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons support checked and disabled states. Disabled radios are visually dimmed and not interactive.',
      },
    },
  },
};

/**
 * Controlled RadioGroup with state management.
 */
export const ControlledRadioGroup: Story = {
  render: () => {
    const [theme, setTheme] = useState('light');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
        <RadioGroup name="theme" value={theme} onChange={setTheme}>
          <Label variant="checkbox" size="md">
            <Radio value="light" />
            <span>Light theme</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Radio value="dark" />
            <span>Dark theme</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Radio value="auto" />
            <span>Auto (system)</span>
          </Label>
        </RadioGroup>

        <div style={{
          padding: 'var(--bk-spacing-3)',
          backgroundColor: 'var(--bk-color-background-elevated)',
          borderRadius: 'var(--bk-radius-md)',
          fontSize: 'var(--bk-font-size-sm)',
          color: 'var(--bk-color-foreground-muted)'
        }}>
          Selected: <strong style={{ color: 'var(--bk-color-foreground)' }}>{theme}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Use RadioGroup for controlled state management. The group provides `name`, `value`, and `onChange` to all Radio children via context. This is the recommended approach for managing radio button groups.',
      },
    },
  },
};

/**
 * Uncontrolled RadioGroup with default value.
 */
export const UncontrolledRadioGroup: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro">
      <Label variant="checkbox" size="md">
        <Radio value="free" />
        <span>Free Plan - $0/month</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio value="pro" />
        <span>Pro Plan - $10/month</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio value="enterprise" />
        <span>Enterprise Plan - $50/month</span>
      </Label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'RadioGroup supports uncontrolled mode with `defaultValue`. The component manages its own state internally.',
      },
    },
  },
};

/**
 * RadioGroup with horizontal orientation.
 */
export const HorizontalOrientation: Story = {
  render: () => {
    const [size, setSize] = useState('medium');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
        <RadioGroup name="size" value={size} onChange={setSize} orientation="horizontal">
          <Label variant="checkbox" size="sm">
            <Radio value="small" size="sm" />
            <span>Small</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="medium" size="sm" />
            <span>Medium</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="large" size="sm" />
            <span>Large</span>
          </Label>
        </RadioGroup>

        <div style={{
          padding: 'var(--bk-spacing-3)',
          backgroundColor: 'var(--bk-color-background-elevated)',
          borderRadius: 'var(--bk-radius-md)',
          fontSize: 'var(--bk-font-size-sm)',
          color: 'var(--bk-color-foreground-muted)'
        }}>
          Selected size: <strong style={{ color: 'var(--bk-color-foreground)' }}>{size}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'RadioGroup supports horizontal orientation using `orientation="horizontal"`. The default is vertical layout.',
      },
    },
  },
};

/**
 * Disabled RadioGroup - all radios are disabled.
 */
export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup name="disabled-group" value="option2" disabled>
      <Label variant="checkbox" size="md">
        <Radio value="option1" />
        <span>Option 1</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio value="option2" />
        <span>Option 2 (pre-selected)</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio value="option3" />
        <span>Option 3</span>
      </Label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set `disabled` on RadioGroup to disable all radios in the group at once.',
      },
    },
  },
};

/**
 * Radio buttons with multiline label text.
 */
export const MultilineLabels: Story = {
  render: () => {
    const [plan, setPlan] = useState('basic');

    return (
      <RadioGroup name="plan-multiline" value={plan} onChange={setPlan}>
        <Label variant="checkbox" size="md">
          <Radio value="basic" />
          <span>
            <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>Basic Plan</strong>
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Perfect for individuals. Includes 10GB storage and basic features.
            </span>
          </span>
        </Label>
        <Label variant="checkbox" size="md">
          <Radio value="pro" />
          <span>
            <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>Pro Plan</strong>
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              For professionals. Includes 100GB storage, priority support, and advanced features.
            </span>
          </span>
        </Label>
        <Label variant="checkbox" size="md">
          <Radio value="enterprise" />
          <span>
            <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>Enterprise Plan</strong>
            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              For teams. Unlimited storage, dedicated support, and custom integrations.
            </span>
          </span>
        </Label>
      </RadioGroup>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Radio labels can contain multiline text, rich formatting, and complex layouts. The Label component automatically handles alignment.',
      },
    },
  },
};

/**
 * Form example with multiple radio groups.
 */
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      deliveryMethod: 'standard',
      paymentMethod: 'credit',
      newsletter: 'weekly',
    });

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-6)',
        maxWidth: '400px',
      }}>
        <div>
          <h4 style={{
            marginBottom: 'var(--bk-spacing-3)',
            fontSize: 'var(--bk-font-size-base)',
            fontWeight: 'var(--bk-font-weight-semibold)'
          }}>
            Delivery Method
          </h4>
          <RadioGroup
            name="delivery"
            value={formData.deliveryMethod}
            onChange={(value) => setFormData({ ...formData, deliveryMethod: value as string })}
          >
            <Label variant="checkbox" size="md">
              <Radio value="standard" />
              <span>Standard Delivery (5-7 days) - Free</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="express" />
              <span>Express Delivery (2-3 days) - $10</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="overnight" />
              <span>Overnight Delivery - $25</span>
            </Label>
          </RadioGroup>
        </div>

        <div>
          <h4 style={{
            marginBottom: 'var(--bk-spacing-3)',
            fontSize: 'var(--bk-font-size-base)',
            fontWeight: 'var(--bk-font-weight-semibold)'
          }}>
            Payment Method
          </h4>
          <RadioGroup
            name="payment"
            value={formData.paymentMethod}
            onChange={(value) => setFormData({ ...formData, paymentMethod: value as string })}
          >
            <Label variant="checkbox" size="md">
              <Radio value="credit" />
              <span>Credit Card</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="paypal" />
              <span>PayPal</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="bank" />
              <span>Bank Transfer</span>
            </Label>
          </RadioGroup>
        </div>

        <div>
          <h4 style={{
            marginBottom: 'var(--bk-spacing-3)',
            fontSize: 'var(--bk-font-size-base)',
            fontWeight: 'var(--bk-font-weight-semibold)'
          }}>
            Newsletter Frequency
          </h4>
          <RadioGroup
            name="newsletter"
            value={formData.newsletter}
            onChange={(value) => setFormData({ ...formData, newsletter: value as string })}
          >
            <Label variant="checkbox" size="md">
              <Radio value="daily" />
              <span>Daily</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="weekly" />
              <span>Weekly</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="monthly" />
              <span>Monthly</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="never" />
              <span>Never</span>
            </Label>
          </RadioGroup>
        </div>

        <div style={{
          padding: 'var(--bk-spacing-3)',
          backgroundColor: 'var(--bk-color-background-elevated)',
          borderRadius: 'var(--bk-radius-md)',
          fontSize: 'var(--bk-font-size-sm)',
        }}>
          <div style={{ marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            Form Data:
          </div>
          <pre style={{ margin: 0, fontSize: 'var(--bk-font-size-xs)' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example form with multiple RadioGroups. Each group manages its own state independently.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all radio capabilities.
 */
export const Showcase: Story = {
  render: () => {
    const [theme, setTheme] = useState('light');
    const [size, setSize] = useState('medium');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)', padding: 'var(--bk-spacing-4)' }}>
        {/* Sizes */}
        <div>
          <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            Sizes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
            <Label variant="checkbox" size="xs">
              <Radio size="xs" name="showcase-size" value="xs" />
              <span>Extra Small</span>
            </Label>
            <Label variant="checkbox" size="sm">
              <Radio size="sm" name="showcase-size" value="sm" />
              <span>Small</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio size="md" name="showcase-size" value="md" defaultChecked />
              <span>Medium</span>
            </Label>
            <Label variant="checkbox" size="lg">
              <Radio size="lg" name="showcase-size" value="lg" />
              <span>Large</span>
            </Label>
            <Label variant="checkbox" size="xl">
              <Radio size="xl" name="showcase-size" value="xl" />
              <span>Extra Large</span>
            </Label>
          </div>
        </div>

        {/* States */}
        <div>
          <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            States
          </h3>
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
              <Label variant="checkbox" size="md">
                <Radio name="showcase-state" value="unchecked" />
                <span>Unchecked</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Radio name="showcase-state" value="checked" defaultChecked />
                <span>Checked</span>
              </Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
              <Label variant="checkbox" size="md">
                <Radio name="showcase-disabled" value="unchecked" disabled />
                <span>Disabled</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Radio name="showcase-disabled" value="checked" disabled defaultChecked />
                <span>Disabled checked</span>
              </Label>
            </div>
          </div>
        </div>

        {/* RadioGroup - Vertical */}
        <div>
          <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            RadioGroup - Vertical (default)
          </h3>
          <RadioGroup name="showcase-theme" value={theme} onChange={setTheme}>
            <Label variant="checkbox" size="md">
              <Radio value="light" />
              <span>Light theme</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="dark" />
              <span>Dark theme</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="auto" />
              <span>Auto (system)</span>
            </Label>
          </RadioGroup>
        </div>

        {/* RadioGroup - Horizontal */}
        <div>
          <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            RadioGroup - Horizontal
          </h3>
          <RadioGroup name="showcase-size-h" value={size} onChange={setSize} orientation="horizontal">
            <Label variant="checkbox" size="sm">
              <Radio value="small" size="sm" />
              <span>Small</span>
            </Label>
            <Label variant="checkbox" size="sm">
              <Radio value="medium" size="sm" />
              <span>Medium</span>
            </Label>
            <Label variant="checkbox" size="sm">
              <Radio value="large" size="sm" />
              <span>Large</span>
            </Label>
          </RadioGroup>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all radio button capabilities: 5 sizes, multiple states, RadioGroup with vertical and horizontal orientations.',
      },
    },
  },
};
