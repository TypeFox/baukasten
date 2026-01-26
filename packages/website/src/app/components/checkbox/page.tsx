'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Checkbox, Label } from 'baukasten-ui';

const checkboxProps: PropDefinition[] = [
  {
    name: 'variant',
    type: '"checkbox" | "switch"',
    default: '"checkbox"',
    description: 'Visual style variant: traditional checkbox or toggle switch',
  },
  {
    name: 'size',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'Size of the checkbox',
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Whether the checkbox is checked (controlled)',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    description: 'Initial checked state (uncontrolled)',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is in an indeterminate state (partially checked)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is disabled',
  },
  {
    name: 'onChange',
    type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
    description: 'Callback fired when the checked state changes',
  },
];

// Controlled checkbox example component
function ControlledExample() {
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Label variant="checkbox" size="md">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>{`Checkbox is ${checked ? 'checked' : 'unchecked'}`}</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Checkbox
          variant="switch"
          checked={switchChecked}
          onChange={(e) => setSwitchChecked(e.target.checked)}
        />
        <span>{`Switch is ${switchChecked ? 'on' : 'off'}`}</span>
      </Label>
    </div>
  );
}

// Indeterminate example component
function IndeterminateExample() {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <Label variant="checkbox" size="md">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <span style={{ fontWeight: someChecked || allChecked ? 600 : 400 }}>
          Select all items
        </span>
      </Label>
      <div style={{ paddingLeft: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
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
}

export default function CheckboxPage() {
  return (
    <PageLayout
      title="Checkbox"
      description="A versatile checkbox component that supports both traditional checkbox and toggle switch styles, with full accessibility support."
    >
      <Showcase
        title="Basic Usage"
        description="Checkboxes should be used with the Label component for proper accessibility. Use the checkbox variant for Label."
        preview={
          <Label variant="checkbox" size="md">
            <Checkbox />
            <span>Accept terms and conditions</span>
          </Label>
        }
        code={`import { Checkbox, Label } from 'baukasten-ui';

function App() {
  return (
    <Label variant="checkbox" size="md">
      <Checkbox />
      <span>Accept terms and conditions</span>
    </Label>
  );
}`}
      />

      <Showcase
        title="Variants"
        description="Two variants available: traditional checkbox and toggle switch."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Label variant="checkbox" size="md">
              <Checkbox variant="checkbox" />
              <span>Checkbox variant</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Checkbox variant="switch" />
              <span>Switch variant</span>
            </Label>
          </div>
        }
        code={`<Label variant="checkbox" size="md">
  <Checkbox variant="checkbox" />
  <span>Checkbox variant</span>
</Label>

<Label variant="checkbox" size="md">
  <Checkbox variant="switch" />
  <span>Switch variant</span>
</Label>`}
      />

      <Showcase
        title="Sizes"
        description="Five size options from extra small to extra large. Label font size automatically scales with checkbox size."
        preview={
          <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                Checkbox Sizes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
                  <span>Medium</span>
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
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                Switch Sizes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
                  <span>Medium</span>
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
        }
        code={`<Label variant="checkbox" size="xs">
  <Checkbox size="xs" />
  <span>Extra Small</span>
</Label>

<Label variant="checkbox" size="md">
  <Checkbox size="md" />
  <span>Medium (default)</span>
</Label>

<Label variant="checkbox" size="lg">
  <Checkbox variant="switch" size="lg" />
  <span>Large Switch</span>
</Label>`}
      />

      <Showcase
        title="States"
        description="Multiple states: unchecked, checked, indeterminate, and disabled."
        preview={
          <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                Checkbox States
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <Label variant="checkbox" size="md">
                  <Checkbox />
                  <span>Unchecked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox checked readOnly />
                  <span>Checked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox indeterminate readOnly />
                  <span>Indeterminate</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox disabled />
                  <span>Disabled unchecked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox checked disabled readOnly />
                  <span>Disabled checked</span>
                </Label>
              </div>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                Switch States
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                <Label variant="checkbox" size="md">
                  <Checkbox variant="switch" />
                  <span>Unchecked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox variant="switch" checked readOnly />
                  <span>Checked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox variant="switch" disabled />
                  <span>Disabled unchecked</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Checkbox variant="switch" checked disabled readOnly />
                  <span>Disabled checked</span>
                </Label>
              </div>
            </div>
          </div>
        }
        code={`// Unchecked
<Label variant="checkbox" size="md">
  <Checkbox />
  <span>Unchecked</span>
</Label>

// Checked
<Label variant="checkbox" size="md">
  <Checkbox checked />
  <span>Checked</span>
</Label>

// Indeterminate (checkbox only)
<Label variant="checkbox" size="md">
  <Checkbox indeterminate />
  <span>Indeterminate</span>
</Label>

// Disabled
<Label variant="checkbox" size="md">
  <Checkbox disabled />
  <span>Disabled</span>
</Label>`}
      />

      <Showcase
        title="Controlled Component"
        description="Use React state to control the checkbox. The checkbox updates the label text based on its state."
        preview={<ControlledExample />}
        code={`import { useState } from 'react';
import { Checkbox, Label } from 'baukasten-ui';

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Label variant="checkbox" size="md">
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>Checkbox is {checked ? 'checked' : 'unchecked'}</span>
    </Label>
  );
}`}
      />

      <Showcase
        title="Indeterminate State"
        description="The indeterminate state is useful for 'select all' functionality. When some but not all items are selected, the parent checkbox shows a horizontal line."
        preview={<IndeterminateExample />}
        code={`import { useState } from 'react';
import { Checkbox, Label } from 'baukasten-ui';

function IndeterminateExample() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: true },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setItems(items.map(item => ({ ...item, checked })));
  };

  const handleItemChange = (id, checked) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked } : item
    ));
  };

  return (
    <div>
      <Label variant="checkbox" size="md">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <span>Select all items</span>
      </Label>
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
  );
}`}
      />

      <Showcase
        title="Multiline Labels"
        description="Labels automatically wrap and maintain proper alignment with the checkbox."
        preview={
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Label variant="checkbox" size="md">
              <Checkbox />
              <span>This is a very long label that will wrap to multiple lines and maintain proper alignment with the checkbox. The text wraps naturally below the first line.</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Checkbox variant="switch" />
              <span>This switch has a long label that demonstrates how multiline text is handled. Notice how the text wraps and stays aligned naturally.</span>
            </Label>
          </div>
        }
        code={`<Label variant="checkbox" size="md">
  <Checkbox />
  <span>
    This is a very long label that will wrap to 
    multiple lines and maintain proper alignment.
  </span>
</Label>`}
      />

      <Showcase
        title="Form Example"
        description="Real-world example demonstrating checkboxes and switches in a settings form."
        preview={
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            maxWidth: '400px',
          }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
              Notification Preferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <Label variant="checkbox" size="md">
                <Checkbox defaultChecked />
                <span>Email notifications</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Checkbox />
                <span>Push notifications</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Checkbox />
                <span>SMS notifications</span>
              </Label>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--vscode-panel-border)', margin: 'var(--spacing-2) 0' }} />

            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>
              Display Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <Label variant="checkbox" size="md">
                <Checkbox variant="switch" defaultChecked />
                <span>Dark mode</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Checkbox variant="switch" />
                <span>Compact view</span>
              </Label>
              <Label variant="checkbox" size="md">
                <Checkbox variant="switch" defaultChecked />
                <span>Show line numbers</span>
              </Label>
            </div>
          </div>
        }
        code={`<div>
  <h3>Notification Preferences</h3>
  <Label variant="checkbox" size="md">
    <Checkbox defaultChecked />
    <span>Email notifications</span>
  </Label>
  <Label variant="checkbox" size="md">
    <Checkbox />
    <span>Push notifications</span>
  </Label>

  <h3>Display Settings</h3>
  <Label variant="checkbox" size="md">
    <Checkbox variant="switch" defaultChecked />
    <span>Dark mode</span>
  </Label>
  <Label variant="checkbox" size="md">
    <Checkbox variant="switch" />
    <span>Compact view</span>
  </Label>
</div>`}
        props={checkboxProps}
      />
    </PageLayout>
  );
}


