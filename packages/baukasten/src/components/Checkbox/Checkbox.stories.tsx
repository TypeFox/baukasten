import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../Label';
import { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile checkbox component that supports both traditional checkbox and toggle switch styles. Use with the Label component (variant="checkbox") for accessible labels. Includes support for indeterminate state and all standard input attributes. Fully integrates with VSCode/Theia theme variables for consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['checkbox', 'switch'],
      description: 'Visual style variant: traditional checkbox or toggle switch',
      table: {
        defaultValue: { summary: 'checkbox' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the checkbox',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state (partially checked)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all checkbox properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    variant: 'checkbox',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    name: 'terms',
    id: 'interactive-checkbox',
  },
  render: (args) => (
    <Label variant="checkbox" size={args.size}>
      <Checkbox {...args} />
      <span>Accept terms and conditions</span>
    </Label>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all checkbox properties. Try different combinations using the controls below. The checkbox is wrapped in a Label component with variant="checkbox".',
      },
    },
  },
};

/**
 * All available checkbox variants: traditional checkbox and toggle switch.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
      <Label variant="checkbox" size="md">
        <Checkbox variant="checkbox" name="variant-checkbox" id="checkbox-variant" />
        <span>Checkbox variant</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Checkbox variant="switch" name="variant-switch" id="switch-variant" />
        <span>Switch variant</span>
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two variants available: **Checkbox** (traditional checkbox) and **Switch** (toggle switch). Both support all other props and states.',
      },
    },
  },
};

/**
 * All available checkbox sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Checkbox Sizes
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="xs">
            <Checkbox size="xs" />
            <span>Extra Small</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Checkbox size="sm" />
            <span>Small</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox size="md" />
            <span>Medium (default)</span>
          </Label>
          <Label variant="checkbox" size="lg">
            <Checkbox size="lg" />
            <span>Large</span>
          </Label>
          <Label variant="checkbox" size="xl">
            <Checkbox size="xl" />
            <span>Extra Large</span>
          </Label>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Switch Sizes
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="xs">
            <Checkbox variant="switch" size="xs" />
            <span>Extra Small</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Checkbox variant="switch" size="sm" />
            <span>Small</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" size="md" />
            <span>Medium (default)</span>
          </Label>
          <Label variant="checkbox" size="lg">
            <Checkbox variant="switch" size="lg" />
            <span>Large</span>
          </Label>
          <Label variant="checkbox" size="xl">
            <Checkbox variant="switch" size="xl" />
            <span>Extra Large</span>
          </Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. Label font size automatically scales with checkbox size when using Label component with matching size prop.',
      },
    },
  },
};

/**
 * Different checkbox states: checked, unchecked, indeterminate, and disabled.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Checkbox States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Checkbox />
            <span>Unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox checked />
            <span>Checked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox indeterminate />
            <span>Indeterminate</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox disabled />
            <span>Disabled unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox checked disabled />
            <span>Disabled checked</span>
          </Label>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Switch States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" />
            <span>Unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" checked />
            <span>Checked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" disabled />
            <span>Disabled unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" checked disabled />
            <span>Disabled checked</span>
          </Label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes support multiple states: **unchecked**, **checked**, **indeterminate** (checkbox only, useful for "select all"), and **disabled**. All states work with both variants.',
      },
    },
  },
};

/**
 * Controlled checkbox example with React state.
 */
const ControlledExampleComponent = () => {
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
      <Label variant="checkbox" size="md">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          name="controlled-checkbox"
          id="controlled-checkbox"
        />
        <span>{`Checkbox is ${checked ? 'checked' : 'unchecked'}`}</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Checkbox
          variant="switch"
          checked={switchChecked}
          onChange={(e) => setSwitchChecked(e.target.checked)}
          name="controlled-switch"
          id="controlled-switch"
        />
        <span>{`Switch is ${switchChecked ? 'on' : 'off'}`}</span>
      </Label>
    </div>
  );
};

export const ControlledExample: Story = {
  render: () => <ControlledExampleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Controlled checkbox example using React state. The checkbox updates the label text based on its state.',
      },
    },
  },
};

/**
 * Checkboxes with multiline labels demonstrate proper text alignment.
 */
export const MultilineLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)', maxWidth: '400px' }}>
      <Label variant="checkbox" size="md">
        <Checkbox name="multiline-1" id="multiline-checkbox" />
        <span>This is a very long label that will wrap to multiple lines and maintain proper alignment with the checkbox. The text wraps naturally below the first line.</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Checkbox variant="switch" name="multiline-2" id="multiline-switch" />
        <span>This switch has a long label that demonstrates how multiline text is handled. Notice how the text wraps and stays aligned naturally.</span>
      </Label>
      <Label variant="checkbox" size="lg">
        <Checkbox size="lg" name="multiline-3" id="multiline-large" />
        <span>Large checkbox with a multiline label. The font size automatically scales with the checkbox size for visual harmony.</span>
      </Label>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Multiline labels maintain proper alignment with the checkbox at the top. The text wraps naturally and the label font size scales with the checkbox size.',
      },
    },
  },
};

/**
 * Indeterminate state example for "select all" functionality.
 */
const IndeterminateExampleComponent = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: true },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setItems(items.map(item => ({ ...item, checked })));
  };

  const handleItemChange = (id: number, checked: boolean) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked } : item
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
      <Label variant="checkbox" size="md">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <span>Select all items</span>
      </Label>
      <div style={{ paddingLeft: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
        {items.map(item => (
          <Label key={item.id} variant="checkbox" size="md">
            <Checkbox
              checked={item.checked}
              onChange={(e) => handleItemChange(item.id, e.target.checked)}
            />
            <span>{item.label}</span>
          </Label>
        ))}
      </div>
    </div>
  );
};

export const IndeterminateExample: Story = {
  render: () => <IndeterminateExampleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state is useful for "select all" functionality. When some but not all items are selected, the parent checkbox shows an indeterminate state (horizontal line).',
      },
    },
  },
};

/**
 * Form example with multiple checkboxes and switches.
 */
export const FormExample: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-4)',
      padding: 'var(--spacing-4)',
      backgroundColor: 'var(--color-background-secondary)',
      borderRadius: 'var(--radius-md)',
      maxWidth: '400px',
    }}>
      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-2)' }}>
        Notification Preferences
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        <Label variant="checkbox" size="md">
          <Checkbox defaultChecked name="notifications-email" id="email-notifications" />
          <span>Email notifications</span>
        </Label>
        <Label variant="checkbox" size="md">
          <Checkbox name="notifications-push" id="push-notifications" />
          <span>Push notifications</span>
        </Label>
        <Label variant="checkbox" size="md">
          <Checkbox name="notifications-sms" id="sms-notifications" />
          <span>SMS notifications</span>
        </Label>
      </div>

      <div style={{ height: 'var(--border-width-1)', backgroundColor: 'var(--color-divider)', margin: 'var(--spacing-2) 0' }} />

      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-2)' }}>
        Display Settings
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        <Label variant="checkbox" size="md">
          <Checkbox variant="switch" defaultChecked name="display-dark" id="dark-mode" />
          <span>Dark mode</span>
        </Label>
        <Label variant="checkbox" size="md">
          <Checkbox variant="switch" name="display-compact" id="compact-view" />
          <span>Compact view</span>
        </Label>
        <Label variant="checkbox" size="md">
          <Checkbox variant="switch" defaultChecked name="display-line-numbers" id="line-numbers" />
          <span>Show line numbers</span>
        </Label>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example form demonstrating checkboxes and switches in a settings panel. Use checkboxes for options and switches for on/off toggles.',
      },
    },
  },
};

/**
 * Checkboxes without labels (standalone usage).
 */
export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-lg)', alignItems: 'center' }}>
      <Checkbox name="standalone-1" />
      <Checkbox variant="switch" name="standalone-2" />
      <Checkbox size="lg" name="standalone-3" />
      <Checkbox variant="switch" size="lg" name="standalone-4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes can be used without labels when the label is provided by surrounding context or separate elements.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all checkbox variants, sizes, states, and usage patterns.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)' }}>
      {/* Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Checkbox variant="checkbox" />
            <span>Checkbox variant</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" />
            <span>Switch variant</span>
          </Label>
        </div>
      </div>

      {/* Checkbox Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Checkbox Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="xs">
            <Checkbox size="xs" />
            <span>Extra Small</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Checkbox size="sm" />
            <span>Small</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox size="md" />
            <span>Medium (default)</span>
          </Label>
          <Label variant="checkbox" size="lg">
            <Checkbox size="lg" />
            <span>Large</span>
          </Label>
          <Label variant="checkbox" size="xl">
            <Checkbox size="xl" />
            <span>Extra Large</span>
          </Label>
        </div>
      </div>

      {/* Switch Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Switch Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="xs">
            <Checkbox variant="switch" size="xs" />
            <span>Extra Small</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Checkbox variant="switch" size="sm" />
            <span>Small</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" size="md" />
            <span>Medium (default)</span>
          </Label>
          <Label variant="checkbox" size="lg">
            <Checkbox variant="switch" size="lg" />
            <span>Large</span>
          </Label>
          <Label variant="checkbox" size="xl">
            <Checkbox variant="switch" size="xl" />
            <span>Extra Large</span>
          </Label>
        </div>
      </div>

      {/* Checkbox States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Checkbox States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Checkbox />
            <span>Unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox checked />
            <span>Checked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox indeterminate />
            <span>Indeterminate</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox disabled />
            <span>Disabled unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox checked disabled />
            <span>Disabled checked</span>
          </Label>
        </div>
      </div>

      {/* Switch States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Switch States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" />
            <span>Unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" checked />
            <span>Checked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" disabled />
            <span>Disabled unchecked</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" checked disabled />
            <span>Disabled checked</span>
          </Label>
        </div>
      </div>

      {/* Multiline Labels */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Multiline Labels</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)', maxWidth: '400px' }}>
          <Label variant="checkbox" size="md">
            <Checkbox />
            <span>This is a very long label that will wrap to multiple lines and maintain proper alignment with the checkbox.</span>
          </Label>
          <Label variant="checkbox" size="md">
            <Checkbox variant="switch" />
            <span>This switch has a long label that demonstrates how multiline text is handled with proper alignment.</span>
          </Label>
        </div>
      </div>

      {/* Without Labels */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>Without Labels</h3>
        <div style={{ display: 'flex', gap: 'var(--gap-lg)', alignItems: 'center' }}>
          <Checkbox size="sm" />
          <Checkbox />
          <Checkbox size="lg" />
          <Checkbox variant="switch" size="sm" />
          <Checkbox variant="switch" />
          <Checkbox variant="switch" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all checkbox capabilities: variants (checkbox/switch), sizes, states (checked/unchecked/indeterminate/disabled), and multiline labels. Use this as a reference for all available combinations.',
      },
    },
  },
};
