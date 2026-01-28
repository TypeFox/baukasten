'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Radio, RadioGroup, Label, Heading, Paragraph } from 'baukasten-ui';

const radioProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'string | number',
        required: true,
        description: 'Value of the radio button (required for radio groups)',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the radio button',
    },
    {
        name: 'checked',
        type: 'boolean',
        description: 'Whether the radio is checked (for controlled components)',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the radio is disabled',
    },
    {
        name: 'name',
        type: 'string',
        description: 'Name attribute for the radio input (automatically provided by RadioGroup)',
    },
    {
        name: 'onChange',
        type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
        description: 'Callback when radio state changes',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
    {
        name: 'style',
        type: 'React.CSSProperties',
        description: 'Inline styles',
    },
];

const radioGroupProps: PropDefinition[] = [
    {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Name attribute for all radios in the group',
    },
    {
        name: 'value',
        type: 'string | number',
        description: 'Currently selected value (for controlled mode)',
    },
    {
        name: 'defaultValue',
        type: 'string | number',
        description: 'Default value (for uncontrolled mode)',
    },
    {
        name: 'onChange',
        type: '(value: string | number) => void',
        description: 'Callback when selection changes',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether all radios in the group are disabled',
    },
    {
        name: 'orientation',
        type: '"vertical" | "horizontal"',
        default: '"vertical"',
        description: 'Layout orientation of the radio group',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Radio components wrapped in Labels',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
    {
        name: 'style',
        type: 'React.CSSProperties',
        description: 'Inline styles',
    },
];

// Theme selection example
function ThemeSelectionExample() {
    const [theme, setTheme] = useState('light');

    return (
        <div style={{ maxWidth: '400px' }}>
            <div style={{
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
            }}>
                <Heading level={4} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Theme Preferences
                </Heading>

                <RadioGroup name="theme-selection" value={theme} onChange={(value) => setTheme(value as string)}>
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
                        <span>Auto (system preference)</span>
                    </Label>
                </RadioGroup>

                <div style={{
                    marginTop: 'var(--bk-spacing-4)',
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}>
                    <div style={{ color: 'var(--vscode-descriptionForeground)', marginBottom: 'var(--bk-spacing-1)' }}>
                        Selected theme:
                    </div>
                    <strong>{theme}</strong>
                </div>
            </div>
        </div>
    );
}

// Settings form example
function SettingsFormExample() {
    const [settings, setSettings] = useState({
        notifications: 'all',
        privacy: 'friends',
        language: 'english',
    });

    return (
        <div style={{ maxWidth: '500px' }}>
            <div style={{
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-5)',
            }}>
                <Heading level={4}>Settings</Heading>

                <div>
                    <Paragraph style={{
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                        marginBottom: 'var(--bk-spacing-2)',
                    }}>
                        Notification Preferences
                    </Paragraph>
                    <RadioGroup
                        name="notifications"
                        value={settings.notifications}
                        onChange={(value) => setSettings({ ...settings, notifications: value as string })}
                    >
                        <Label variant="checkbox" size="sm">
                            <Radio value="all" size="sm" />
                            <span>All notifications</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="important" size="sm" />
                            <span>Important only</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="none" size="sm" />
                            <span>None</span>
                        </Label>
                    </RadioGroup>
                </div>

                <div>
                    <Paragraph style={{
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                        marginBottom: 'var(--bk-spacing-2)',
                    }}>
                        Privacy Settings
                    </Paragraph>
                    <RadioGroup
                        name="privacy"
                        value={settings.privacy}
                        onChange={(value) => setSettings({ ...settings, privacy: value as string })}
                    >
                        <Label variant="checkbox" size="sm">
                            <Radio value="public" size="sm" />
                            <span>Public - Everyone can see</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="friends" size="sm" />
                            <span>Friends only</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="private" size="sm" />
                            <span>Private - Only me</span>
                        </Label>
                    </RadioGroup>
                </div>

                <div>
                    <Paragraph style={{
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                        marginBottom: 'var(--bk-spacing-2)',
                    }}>
                        Language
                    </Paragraph>
                    <RadioGroup
                        name="language"
                        value={settings.language}
                        onChange={(value) => setSettings({ ...settings, language: value as string })}
                        orientation="horizontal"
                    >
                        <Label variant="checkbox" size="sm">
                            <Radio value="english" size="sm" />
                            <span>English</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="spanish" size="sm" />
                            <span>Spanish</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Radio value="french" size="sm" />
                            <span>French</span>
                        </Label>
                    </RadioGroup>
                </div>

                <div style={{
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-xs)',
                    fontFamily: 'var(--vscode-editor-font-family)',
                }}>
                    <div style={{ color: 'var(--vscode-descriptionForeground)', marginBottom: 'var(--bk-spacing-2)' }}>
                        Current settings:
                    </div>
                    <pre style={{ margin: 0 }}>{JSON.stringify(settings, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}

export default function RadioPage() {
    return (
        <PageLayout
            title="Radio"
            description="Radio buttons for selecting a single option from a group. Use with the Label component for accessible labels, and RadioGroup for managing group state. Fully integrated with VSCode theme variables."
        >
            <Showcase
                title="Basic Usage"
                description="Radio buttons must be wrapped in a Label component with variant='checkbox' for proper accessibility and alignment. Each radio needs a unique value and a shared name attribute."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                        <Label variant="checkbox" size="md">
                            <Radio name="basic-example" value="option1" />
                            <span>Option 1</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Radio name="basic-example" value="option2" defaultChecked />
                            <span>Option 2</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Radio name="basic-example" value="option3" />
                            <span>Option 3</span>
                        </Label>
                    </div>
                }
                code={`import { Radio, Label } from 'baukasten-ui';

function App() {
  return (
    <>
      <Label variant="checkbox" size="md">
        <Radio name="options" value="option1" />
        <span>Option 1</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio name="options" value="option2" defaultChecked />
        <span>Option 2</span>
      </Label>
      <Label variant="checkbox" size="md">
        <Radio name="options" value="option3" />
        <span>Option 3</span>
      </Label>
    </>
  );
}`}
                props={radioProps}
            />

            <Showcase
                title="Sizes"
                description="Radio buttons come in 5 sizes: xs, sm, md (default), lg, and xl. The Label component's size should match the Radio size for proper alignment."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
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
                }
                code={`<Label variant="checkbox" size="xs">
  <Radio size="xs" name="size" value="xs" />
  <span>Extra Small</span>
</Label>
<Label variant="checkbox" size="sm">
  <Radio size="sm" name="size" value="sm" />
  <span>Small</span>
</Label>
<Label variant="checkbox" size="md">
  <Radio size="md" name="size" value="md" />
  <span>Medium (default)</span>
</Label>
<Label variant="checkbox" size="lg">
  <Radio size="lg" name="size" value="lg" />
  <span>Large</span>
</Label>
<Label variant="checkbox" size="xl">
  <Radio size="xl" name="size" value="xl" />
  <span>Extra Large</span>
</Label>`}
            />

            <Showcase
                title="States"
                description="Radio buttons support checked and disabled states. Disabled radios are visually dimmed and not interactive."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                            <div style={{
                                fontSize: 'var(--bk-font-size-sm)',
                                fontWeight: 'var(--bk-font-weight-medium)',
                                marginBottom: 'var(--bk-spacing-2)',
                            }}>
                                Default States
                            </div>
                            <Label variant="checkbox" size="md">
                                <Radio name="state-default" value="unchecked" />
                                <span>Unchecked</span>
                            </Label>
                            <Label variant="checkbox" size="md">
                                <Radio name="state-default" value="checked" defaultChecked />
                                <span>Checked</span>
                            </Label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                            <div style={{
                                fontSize: 'var(--bk-font-size-sm)',
                                fontWeight: 'var(--bk-font-weight-medium)',
                                marginBottom: 'var(--bk-spacing-2)',
                            }}>
                                Disabled States
                            </div>
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
                }
                code={`{/* Default states */}
<Label variant="checkbox" size="md">
  <Radio name="options" value="unchecked" />
  <span>Unchecked</span>
</Label>
<Label variant="checkbox" size="md">
  <Radio name="options" value="checked" defaultChecked />
  <span>Checked</span>
</Label>

{/* Disabled states */}
<Label variant="checkbox" size="md">
  <Radio name="disabled" value="unchecked" disabled />
  <span>Disabled unchecked</span>
</Label>
<Label variant="checkbox" size="md">
  <Radio name="disabled" value="checked" disabled defaultChecked />
  <span>Disabled checked</span>
</Label>`}
            />

            <Showcase
                title="RadioGroup - Controlled"
                description="RadioGroup is the recommended way to manage radio button state. It provides shared name, value, and onChange to all Radio children via context, simplifying state management."
                preview={<ThemeSelectionExample />}
                code={`import { Radio, RadioGroup, Label } from 'baukasten-ui';
import { useState } from 'react';

function ThemeSelection() {
  const [theme, setTheme] = useState('light');

  return (
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
        <span>Auto (system preference)</span>
      </Label>
    </RadioGroup>
  );
}`}
                props={radioGroupProps}
            />

            <Showcase
                title="RadioGroup - Uncontrolled"
                description="RadioGroup supports uncontrolled mode with defaultValue. The component manages its own state internally."
                preview={
                    <div style={{ maxWidth: '400px' }}>
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
                    </div>
                }
                code={`import { Radio, RadioGroup, Label } from 'baukasten-ui';

function PlanSelection() {
  return (
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
  );
}`}
            />

            <Showcase
                title="Horizontal Orientation"
                description="RadioGroup supports horizontal orientation for inline layouts. The default is vertical."
                preview={
                    <div style={{ maxWidth: '500px' }}>
                        <RadioGroup name="size-h" defaultValue="medium" orientation="horizontal">
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
                }
                code={`<RadioGroup 
  name="size" 
  defaultValue="medium" 
  orientation="horizontal"
>
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
</RadioGroup>`}
            />

            <Showcase
                title="Disabled Group"
                description="Set disabled on RadioGroup to disable all radios in the group at once."
                preview={
                    <div style={{ maxWidth: '400px' }}>
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
                    </div>
                }
                code={`<RadioGroup name="options" value="option2" disabled>
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
</RadioGroup>`}
            />

            <Showcase
                title="Multiline Labels"
                description="Radio labels can contain multiline text and rich formatting. The Label component automatically handles alignment."
                preview={
                    <div style={{ maxWidth: '500px' }}>
                        <RadioGroup name="plan-multiline" defaultValue="basic">
                            <Label variant="checkbox" size="md">
                                <Radio value="basic" />
                                <span>
                                    <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>
                                        Basic Plan
                                    </strong>
                                    <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                        Perfect for individuals. Includes 10GB storage and basic features.
                                    </span>
                                </span>
                            </Label>
                            <Label variant="checkbox" size="md">
                                <Radio value="pro" />
                                <span>
                                    <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>
                                        Pro Plan
                                    </strong>
                                    <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                        For professionals. Includes 100GB storage, priority support, and advanced features.
                                    </span>
                                </span>
                            </Label>
                            <Label variant="checkbox" size="md">
                                <Radio value="enterprise" />
                                <span>
                                    <strong style={{ display: 'block', marginBottom: 'var(--bk-spacing-0-5)' }}>
                                        Enterprise Plan
                                    </strong>
                                    <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                        For teams. Unlimited storage, dedicated support, and custom integrations.
                                    </span>
                                </span>
                            </Label>
                        </RadioGroup>
                    </div>
                }
                code={`<RadioGroup name="plan" defaultValue="basic">
  <Label variant="checkbox" size="md">
    <Radio value="basic" />
    <span>
      <strong style={{ display: 'block' }}>
        Basic Plan
      </strong>
      <span style={{ fontSize: 'var(--bk-font-size-sm)' }}>
        Perfect for individuals. Includes 10GB storage and basic features.
      </span>
    </span>
  </Label>
  {/* More options... */}
</RadioGroup>`}
            />

            <Showcase
                title="Settings Form Example"
                description="Real-world example showing multiple RadioGroups in a settings form. Each group manages its own state independently, with both vertical and horizontal orientations."
                preview={<SettingsFormExample />}
                code={`import { Radio, RadioGroup, Label } from 'baukasten-ui';
import { useState } from 'react';

function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: 'all',
    privacy: 'friends',
    language: 'english',
  });

  return (
    <div>
      {/* Notification Preferences */}
      <div>
        <h4>Notification Preferences</h4>
        <RadioGroup
          name="notifications"
          value={settings.notifications}
          onChange={(value) => 
            setSettings({ ...settings, notifications: value })
          }
        >
          <Label variant="checkbox" size="sm">
            <Radio value="all" size="sm" />
            <span>All notifications</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="important" size="sm" />
            <span>Important only</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="none" size="sm" />
            <span>None</span>
          </Label>
        </RadioGroup>
      </div>

      {/* Privacy Settings */}
      <div>
        <h4>Privacy Settings</h4>
        <RadioGroup
          name="privacy"
          value={settings.privacy}
          onChange={(value) => 
            setSettings({ ...settings, privacy: value })
          }
        >
          <Label variant="checkbox" size="sm">
            <Radio value="public" size="sm" />
            <span>Public - Everyone can see</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="friends" size="sm" />
            <span>Friends only</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="private" size="sm" />
            <span>Private - Only me</span>
          </Label>
        </RadioGroup>
      </div>

      {/* Language - Horizontal */}
      <div>
        <h4>Language</h4>
        <RadioGroup
          name="language"
          value={settings.language}
          onChange={(value) => 
            setSettings({ ...settings, language: value })
          }
          orientation="horizontal"
        >
          <Label variant="checkbox" size="sm">
            <Radio value="english" size="sm" />
            <span>English</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="spanish" size="sm" />
            <span>Spanish</span>
          </Label>
          <Label variant="checkbox" size="sm">
            <Radio value="french" size="sm" />
            <span>French</span>
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
}`}
            />
        </PageLayout>
    );
}
