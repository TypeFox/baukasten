'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Label, Input, Select, TextArea, Checkbox, Icon, Badge, Button } from '@baukasten/ui';

const labelProps: PropDefinition[] = [
    {
        name: 'variant',
        type: '"input" | "textarea" | "checkbox"',
        default: '"input"',
        description: 'Visual variant determining layout and styling behavior',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size to match the form element inside. Should match child component size for proper alignment',
    },
    {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Whether the label should take full width of its container',
    },
    {
        name: 'error',
        type: 'string',
        description: 'Error message displayed below the label with red border styling',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content of the label - can include inputs, selects, textareas, checkboxes, and label spans',
    },
];

export default function LabelPage() {
    return (
        <PageLayout
            title="Label"
            description="A versatile label wrapper for form components supporting three distinct variants: input (horizontal layout with prefix/suffix), textarea (vertical layout), and checkbox (simple flex layout)."
        >
            <Showcase
                title="Input Variant - Basic Usage"
                description="The input variant wraps text inputs and selects with prefix or suffix text. The label acts as the container with borders and backgrounds, while the input inherits styling for a cohesive design."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
                        <Label size="md">
                            <span className="label">https://</span>
                            <Input size="md" placeholder="example.com" />
                        </Label>
                        <Label size="md">
                            <Input size="md" placeholder="yourdomain" />
                            <span className="label">.com</span>
                        </Label>
                        <Label size="md">
                            <span className="label">$</span>
                            <Input size="md" type="number" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                    </div>
                }
                code={`import { Label, Input } from '@baukasten/ui';

function App() {
  return (
    <>
      {/* Prefix */}
      <Label size="md">
        <span className="label">https://</span>
        <Input size="md" placeholder="example.com" />
      </Label>

      {/* Suffix */}
      <Label size="md">
        <Input size="md" placeholder="yourdomain" />
        <span className="label">.com</span>
      </Label>

      {/* Both */}
      <Label size="md">
        <span className="label">$</span>
        <Input size="md" type="number" placeholder="0.00" />
        <span className="label">USD</span>
      </Label>
    </>
  );
}`}
            />

            <Showcase
                title="Input Variant - With Icons"
                description="Add icons to prefix or suffix positions using the Icon component wrapped in a span with className='label'. Icons automatically scale with the label size."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
                        <Label size="md">
                            <span className="label">
                                <Icon name="search" />
                            </span>
                            <Input size="md" placeholder="Search..." />
                        </Label>
                        <Label size="md">
                            <span className="label">
                                <Icon name="mail" />
                            </span>
                            <Input size="md" type="email" placeholder="you@example.com" />
                        </Label>
                        <Label size="md">
                            <span className="label">
                                <Icon name="lock" />
                            </span>
                            <Input size="md" type="password" placeholder="Password" />
                        </Label>
                    </div>
                }
                code={`<Label size="md">
  <span className="label">
    <Icon name="search" />
  </span>
  <Input size="md" placeholder="Search..." />
</Label>

<Label size="md">
  <span className="label">
    <Icon name="mail" />
  </span>
  <Input size="md" type="email" placeholder="you@example.com" />
</Label>`}
            />

            <Showcase
                title="Input Variant - With Badges"
                description="Combine inputs with badges for status indicators, feature flags, or contextual information. Badges work in both prefix and suffix positions."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '350px' }}>
                        <Label size="md">
                            <span className="label">
                                <Icon name="key" />
                            </span>
                            <Input size="md" type="password" placeholder="API Key" />
                            <Badge size="sm" variant="success">Active</Badge>
                        </Label>
                        <Label size="md">
                            <Input size="md" placeholder="Advanced analytics" />
                            <Badge size="sm" variant="info">Pro</Badge>
                        </Label>
                        <Label size="md">
                            <Input size="md" placeholder="Premium feature" />
                            <Badge size="sm" variant="warning">Beta</Badge>
                        </Label>
                    </div>
                }
                code={`<Label size="md">
  <span className="label">
    <Icon name="key" />
  </span>
  <Input size="md" type="password" placeholder="API Key" />
  <Badge size="sm" variant="success">Active</Badge>
</Label>

<Label size="md">
  <Input size="md" placeholder="Premium feature" />
  <Badge size="sm" variant="info">Pro</Badge>
</Label>`}
            />

            <Showcase
                title="Input Variant - Sizes"
                description="Labels support five sizes (xs, sm, md, lg, xl). Always match the Label size prop with the child component's size prop for proper alignment."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
                        <Label size="xs">
                            <span className="label">$</span>
                            <Input size="xs" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                        <Label size="sm">
                            <span className="label">$</span>
                            <Input size="sm" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                        <Label size="md">
                            <span className="label">$</span>
                            <Input size="md" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                        <Label size="lg">
                            <span className="label">$</span>
                            <Input size="lg" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                        <Label size="xl">
                            <span className="label">$</span>
                            <Input size="xl" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                    </div>
                }
                code={`<Label size="xs">
  <span className="label">$</span>
  <Input size="xs" placeholder="0.00" />
  <span className="label">USD</span>
</Label>

<Label size="md">
  <span className="label">$</span>
  <Input size="md" placeholder="0.00" />
  <span className="label">USD</span>
</Label>

<Label size="xl">
  <span className="label">$</span>
  <Input size="xl" placeholder="0.00" />
  <span className="label">USD</span>
</Label>`}
            />

            <Showcase
                title="Input Variant - Error States"
                description="Display validation errors by providing an error prop. The label border turns red and an error message appears below."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
                        <Label size="md" error="This field is required">
                            <Input size="md" placeholder="Username" />
                        </Label>
                        <Label size="md" error="Please enter a valid email address">
                            <span className="label">
                                <Icon name="mail" />
                            </span>
                            <Input size="md" type="email" placeholder="you@example.com" />
                        </Label>
                        <Label size="md" error="Price must be greater than 0">
                            <span className="label">$</span>
                            <Input size="md" type="number" placeholder="0.00" />
                            <span className="label">USD</span>
                        </Label>
                    </div>
                }
                code={`<Label size="md" error="This field is required">
  <Input size="md" placeholder="Username" />
</Label>

<Label size="md" error="Please enter a valid email address">
  <span className="label">
    <Icon name="mail" />
  </span>
  <Input size="md" type="email" placeholder="you@example.com" />
</Label>`}
            />

            <Showcase
                title="Input Variant - With Select"
                description="The input variant works seamlessly with the Select component. Add prefix labels, icons, or badges just like with inputs."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '350px' }}>
                        <Label size="md">
                            <span className="label">Language:</span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'js', label: 'JavaScript' },
                                    { value: 'ts', label: 'TypeScript' },
                                    { value: 'py', label: 'Python' },
                                    { value: 'rs', label: 'Rust' },
                                ]}
                                placeholder="Choose language"
                            />
                        </Label>
                        <Label size="md">
                            <span className="label">
                                <Icon name="symbol-color" />
                            </span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'light', label: 'Light Theme' },
                                    { value: 'dark', label: 'Dark Theme' },
                                    { value: 'contrast', label: 'High Contrast' },
                                ]}
                                placeholder="Select theme"
                            />
                        </Label>
                        <Label size="md">
                            <span className="label">Region:</span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'us-east', label: 'US East' },
                                    { value: 'us-west', label: 'US West' },
                                    { value: 'eu-central', label: 'EU Central' },
                                ]}
                                placeholder="Select region"
                            />
                            <Badge size="sm" variant="success">Online</Badge>
                        </Label>
                    </div>
                }
                code={`<Label size="md">
  <span className="label">Language:</span>
  <Select
    size="md"
    options={[...]}
    placeholder="Choose language"
  />
</Label>

<Label size="md">
  <span className="label">
    <Icon name="symbol-color" />
  </span>
  <Select size="md" options={[...]} placeholder="Select theme" />
</Label>`}
            />

            <Showcase
                title="Input Variant - Complex Patterns"
                description="Advanced patterns combining multiple inputs, buttons, and decorative elements. Useful for configuration UIs and admin panels."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: '500px' }}>
                        <Label size="md">
                            <span className="label">
                                <Icon name="folder" />
                            </span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'project-1', label: 'My Awesome Project' },
                                    { value: 'project-2', label: 'Client Dashboard' },
                                    { value: 'project-3', label: 'Personal Website' },
                                ]}
                                placeholder="Select project"
                            />
                            <Button size="xs" variant="ghost">
                                <Icon name="edit" />
                            </Button>
                        </Label>
                        <Label size="md">
                            <span className="label">
                                <Icon name="git-branch" />
                            </span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'main', label: 'main' },
                                    { value: 'develop', label: 'develop' },
                                    { value: 'feature/new-ui', label: 'feature/new-ui' },
                                ]}
                                placeholder="Select branch"
                                defaultValue="main"
                            />
                            <Button size="xs" variant="ghost">
                                <Icon name="git-pull-request" />
                            </Button>
                            <Button size="xs" variant="ghost">
                                <Icon name="sync" />
                            </Button>
                        </Label>
                        <Label size="md">
                            <span className="label">https://api.</span>
                            <Select
                                size="md"
                                options={[
                                    { value: 'prod', label: 'production' },
                                    { value: 'staging', label: 'staging' },
                                    { value: 'dev', label: 'development' },
                                ]}
                                placeholder="env"
                            />
                            <span className="label">.myapp.com/v1</span>
                            <Button size="xs" variant="ghost">
                                <Icon name="copy" />
                            </Button>
                        </Label>
                    </div>
                }
                code={`<Label size="md">
  <span className="label">
    <Icon name="folder" />
  </span>
  <Select size="md" options={[...]} placeholder="Select project" />
  <Button size="xs" variant="ghost">
    <Icon name="edit" />
  </Button>
</Label>

<Label size="md">
  <span className="label">https://api.</span>
  <Select size="md" options={[...]} placeholder="env" />
  <span className="label">.myapp.com/v1</span>
  <Button size="xs" variant="ghost">
    <Icon name="copy" />
  </Button>
</Label>`}
            />

            <Showcase
                title="TextArea Variant"
                description="The textarea variant uses vertical layout with label elements on top and the textarea below. Perfect for multi-line input fields with descriptive headers."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '500px' }}>
                        <Label variant="textarea" fullWidth>
                            <span className="label">Description</span>
                            <TextArea placeholder="Enter description..." rows={4} />
                        </Label>
                        <Label variant="textarea" fullWidth>
                            <span className="label">
                                <Icon name="note" />
                                Comments
                            </span>
                            <TextArea placeholder="Enter your comments..." rows={4} />
                        </Label>
                        <Label variant="textarea" fullWidth error="This field is required">
                            <span className="label">Feedback</span>
                            <TextArea placeholder="Your feedback..." rows={4} />
                        </Label>
                    </div>
                }
                code={`<Label variant="textarea" fullWidth>
  <span className="label">Description</span>
  <TextArea placeholder="Enter description..." rows={4} />
</Label>

<Label variant="textarea" fullWidth>
  <span className="label">
    <Icon name="note" />
    Comments
  </span>
  <TextArea placeholder="Enter your comments..." rows={6} />
</Label>

<Label variant="textarea" fullWidth error="This field is required">
  <span className="label">Feedback</span>
  <TextArea placeholder="Your feedback..." rows={4} />
</Label>`}
            />

            <Showcase
                title="TextArea Variant - With Badges"
                description="Add badges to the textarea header to indicate optional fields, character limits, or feature flags. Use marginLeft: 'auto' to pin badges to the right."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '500px' }}>
                        <Label variant="textarea" fullWidth>
                            <span className="label">
                                <Icon name="mail" />
                                Message
                                <Badge variant="info" size="xs" style={{ marginLeft: 'auto' }}>Optional</Badge>
                            </span>
                            <TextArea placeholder="Type your message here..." rows={6} />
                        </Label>
                        <Label variant="textarea" fullWidth>
                            <span className="label">
                                Bio
                                <Badge variant="warning" size="xs" style={{ marginLeft: 'auto' }}>Max 500 chars</Badge>
                            </span>
                            <TextArea placeholder="Tell us about yourself..." rows={4} />
                        </Label>
                    </div>
                }
                code={`<Label variant="textarea" fullWidth>
  <span className="label">
    <Icon name="mail" />
    Message
    <Badge variant="info" size="xs" style={{ marginLeft: 'auto' }}>
      Optional
    </Badge>
  </span>
  <TextArea placeholder="Type your message here..." rows={6} />
</Label>`}
            />

            <Showcase
                title="Checkbox Variant"
                description="The checkbox variant provides simple flex layout for wrapping checkboxes, radio buttons, and switches. Label text automatically scales with the size prop."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '400px' }}>
                        <Label variant="checkbox" size="md">
                            <Checkbox name="terms" />
                            <span>Accept terms and conditions</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Checkbox name="newsletter" defaultChecked />
                            <span>Subscribe to newsletter</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Checkbox variant="switch" name="notifications" defaultChecked />
                            <span>Enable notifications</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Checkbox variant="switch" name="dark-mode" />
                            <span>Dark mode</span>
                        </Label>
                    </div>
                }
                code={`<Label variant="checkbox" size="md">
  <Checkbox name="terms" />
  <span>Accept terms and conditions</span>
</Label>

<Label variant="checkbox" size="md">
  <Checkbox name="newsletter" defaultChecked />
  <span>Subscribe to newsletter</span>
</Label>

<Label variant="checkbox" size="md">
  <Checkbox variant="switch" name="notifications" defaultChecked />
  <span>Enable notifications</span>
</Label>`}
            />

            <Showcase
                title="Checkbox Variant - Sizes"
                description="Match the Label size with the Checkbox size for proper alignment. Label text automatically scales with the size prop."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '400px' }}>
                        <Label variant="checkbox" size="xs">
                            <Checkbox size="xs" />
                            <span>Extra small label</span>
                        </Label>
                        <Label variant="checkbox" size="sm">
                            <Checkbox size="sm" />
                            <span>Small label</span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Checkbox size="md" />
                            <span>Medium label (default)</span>
                        </Label>
                        <Label variant="checkbox" size="lg">
                            <Checkbox size="lg" />
                            <span>Large label</span>
                        </Label>
                        <Label variant="checkbox" size="xl">
                            <Checkbox size="xl" />
                            <span>Extra large label</span>
                        </Label>
                    </div>
                }
                code={`<Label variant="checkbox" size="xs">
  <Checkbox size="xs" />
  <span>Extra small label</span>
</Label>

<Label variant="checkbox" size="md">
  <Checkbox size="md" />
  <span>Medium label (default)</span>
</Label>

<Label variant="checkbox" size="xl">
  <Checkbox size="xl" />
  <span>Extra large label</span>
</Label>`}
            />

            <Showcase
                title="Checkbox Variant - Multiline Text"
                description="Checkbox labels automatically handle multiline text with proper alignment. The checkbox stays at the first line while text wraps naturally."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '400px' }}>
                        <Label variant="checkbox" size="md">
                            <Checkbox name="privacy" />
                            <span>
                                I have read and agree to the privacy policy, terms of service, and data processing agreement.
                                I understand that my data will be processed according to GDPR regulations.
                            </span>
                        </Label>
                        <Label variant="checkbox" size="md">
                            <Checkbox name="marketing" />
                            <span>
                                I consent to receive marketing communications including newsletters, product updates, and special offers.
                                I can unsubscribe at any time.
                            </span>
                        </Label>
                    </div>
                }
                code={`<Label variant="checkbox" size="md">
  <Checkbox name="privacy" />
  <span>
    I have read and agree to the privacy policy, terms of service, 
    and data processing agreement. I understand that my data will be 
    processed according to GDPR regulations.
  </span>
</Label>`}
            />

            <Showcase
                title="Form Example"
                description="Complete form field pattern: text label positioned above the Label component containing the input and adornments. Shows required/optional indicators and various field types."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '400px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, margin: 0 }}>
                                    Username
                                </h4>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--vscode-errorForeground)', fontWeight: 600 }}>
                                    Required
                                </span>
                            </div>
                            <Label size="md" fullWidth>
                                <span className="label">@</span>
                                <Input size="md" placeholder="username" fullWidth />
                            </Label>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, margin: 0 }}>
                                    Website URL
                                </h4>
                                <span style={{ fontSize: 'var(--font-size-xs)', opacity: 0.6 }}>
                                    Optional
                                </span>
                            </div>
                            <Label size="md" fullWidth>
                                <span className="label">https://</span>
                                <Input size="md" placeholder="example.com" fullWidth />
                            </Label>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                Email Address
                            </h4>
                            <Label size="md" fullWidth>
                                <span className="label">
                                    <Icon name="mail" />
                                </span>
                                <Input size="md" type="email" placeholder="you@example.com" fullWidth />
                            </Label>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                API Key
                            </h4>
                            <Label size="md" fullWidth error="Invalid API key format">
                                <span className="label">
                                    <Icon name="key" />
                                </span>
                                <Input size="md" type="password" placeholder="sk_live_..." fullWidth />
                                <Badge size="sm" variant="error">Expired</Badge>
                            </Label>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                Description
                            </h4>
                            <Label variant="textarea" fullWidth>
                                <span className="label">
                                    <Icon name="note" />
                                    Tell us more
                                </span>
                                <TextArea placeholder="Enter details..." rows={4} />
                            </Label>
                        </div>

                        <div>
                            <Label variant="checkbox" size="md">
                                <Checkbox name="terms" />
                                <span>I accept the terms and conditions</span>
                            </Label>
                        </div>
                    </div>
                }
                code={`<div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <h4>Username</h4>
    <span>Required</span>
  </div>
  <Label size="md" fullWidth>
    <span className="label">@</span>
    <Input size="md" placeholder="username" fullWidth />
  </Label>
</div>

<div>
  <h4>Email Address</h4>
  <Label size="md" fullWidth>
    <span className="label">
      <Icon name="mail" />
    </span>
    <Input size="md" type="email" placeholder="you@example.com" fullWidth />
  </Label>
</div>

<div>
  <h4>Description</h4>
  <Label variant="textarea" fullWidth>
    <span className="label">
      <Icon name="note" />
      Tell us more
    </span>
    <TextArea placeholder="Enter details..." rows={4} />
  </Label>
</div>

<Label variant="checkbox" size="md">
  <Checkbox name="terms" />
  <span>I accept the terms and conditions</span>
</Label>`}
                props={labelProps}
            />
        </PageLayout>
    );
}
