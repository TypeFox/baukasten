'use client';

import { PropDefinition, Showcase } from '@/components/ComponentShowcase';
import PageLayout from '@/components/PageLayout';
import { Input, Heading, Text as UIText } from 'baukasten';

const inputProps: PropDefinition[] = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the input',
    },
    {
        name: 'error',
        type: 'string | boolean',
        default: 'undefined',
        description: 'Error state or message. Pass true for error styling only, or a string to show error message below',
    },
    {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input should take full width of its container',
    },
    {
        name: 'type',
        type: 'string',
        default: '"text"',
        description: 'HTML input type (text, email, password, number, tel, url, etc.)',
    },
    {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        description: 'Placeholder text shown when input is empty',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input is disabled',
    },
    {
        name: 'value',
        type: 'string',
        default: 'undefined',
        description: 'Controlled input value',
    },
    {
        name: 'onChange',
        type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        description: 'Change event handler',
    },
];

export default function InputPage() {
    return (
        <PageLayout
            title="Input"
            description="A text input component with size and error message support. Fully integrates with the design system tokens."
        >
            <Showcase
                title="Basic Usage"
                description="The default input with medium size."
                preview={<Input placeholder="Enter text..." />}
                code={`import { Input } from 'baukasten';

function App() {
  return <Input placeholder="Enter text..." />;
}`}
            />

            <Showcase
                title="Sizes"
                description="Five size options from extra small to extra large."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
                        <Input size="xs" placeholder="Extra Small" fullWidth />
                        <Input size="sm" placeholder="Small" fullWidth />
                        <Input size="md" placeholder="Medium (Default)" fullWidth />
                        <Input size="lg" placeholder="Large" fullWidth />
                        <Input size="xl" placeholder="Extra Large" fullWidth />
                    </div>
                }
                code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
  <Input size="xs" placeholder="Extra Small" fullWidth />
  <Input size="sm" placeholder="Small" fullWidth />
  <Input size="md" placeholder="Medium (Default)" fullWidth />
  <Input size="lg" placeholder="Large" fullWidth />
  <Input size="xl" placeholder="Extra Large" fullWidth />
</div>`}
            />

            <Showcase
                title="Input Types"
                description="Supports all standard HTML input types for various data formats."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
                        <Input type="text" placeholder="Text input" fullWidth />
                        <Input type="email" placeholder="Email (you@example.com)" fullWidth />
                        <Input type="password" placeholder="Password" fullWidth />
                        <Input type="number" placeholder="Number" fullWidth />
                        <Input type="tel" placeholder="Telephone" fullWidth />
                        <Input type="url" placeholder="URL (https://...)" fullWidth />
                    </div>
                }
                code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
  <Input type="text" placeholder="Text input" fullWidth />
  <Input type="email" placeholder="Email (you@example.com)" fullWidth />
  <Input type="password" placeholder="Password" fullWidth />
  <Input type="number" placeholder="Number" fullWidth />
  <Input type="tel" placeholder="Telephone" fullWidth />
  <Input type="url" placeholder="URL (https://...)" fullWidth />
</div>`}
            />

            <Showcase
                title="States"
                description="Input supports default, error, and disabled states."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Default State
                            </UIText>
                            <Input placeholder="Enter your username" fullWidth />
                        </div>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                With Error
                            </UIText>
                            <Input
                                placeholder="you@example.com"
                                error="Please enter a valid email address"
                                fullWidth
                            />
                        </div>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Disabled State
                            </UIText>
                            <Input
                                placeholder="This field is disabled"
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                }
                code={`import { Input, Text as UIText } from 'baukasten';

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Default State
    </UIText>
    <Input placeholder="Enter your username" fullWidth />
  </div>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      With Error
    </UIText>
    <Input
      placeholder="you@example.com"
      error="Please enter a valid email address"
      fullWidth
    />
  </div>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Disabled State
    </UIText>
    <Input
      placeholder="This field is disabled"
      disabled
      fullWidth
    />
  </div>
</div>`}
            />

            <Showcase
                title="Error Handling"
                description="Error prop accepts boolean for styling only, or a string to display an error message."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Error State Only (boolean)
                            </UIText>
                            <Input placeholder="Email" error={true} fullWidth />
                        </div>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Error with Message (string)
                            </UIText>
                            <Input
                                placeholder="Email"
                                error="This field is required"
                                fullWidth
                            />
                        </div>
                    </div>
                }
                code={`import { Input, Text as UIText } from 'baukasten';

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Error State Only (boolean)
    </UIText>
    <Input placeholder="Email" error={true} fullWidth />
  </div>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Error with Message (string)
    </UIText>
    <Input
      placeholder="Email"
      error="This field is required"
      fullWidth
    />
  </div>
</div>`}
            />

            <Showcase
                title="Width Options"
                description="Control input width with fullWidth prop or use default inline width."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Default Width (Inline)
                            </UIText>
                            <Input placeholder="Auto width" />
                        </div>
                        <div>
                            <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
                                Full Width
                            </UIText>
                            <Input placeholder="This spans full width" fullWidth />
                        </div>
                    </div>
                }
                code={`import { Input, Text as UIText } from 'baukasten';

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Default Width (Inline)
    </UIText>
    <Input placeholder="Auto width" />
  </div>
  <div>
    <UIText block size="sm" weight="medium" style={{ marginBottom: 'var(--spacing-2)' }}>
      Full Width
    </UIText>
    <Input placeholder="This spans full width" fullWidth />
  </div>
</div>`}
            />

            <Showcase
                title="Form Examples"
                description="Common form patterns using Input components."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
                        <div>
                            <Heading level={4} marginTop={false} marginBottom={false} style={{ marginBottom: 'var(--spacing-3)' }}>
                                Login Form
                            </Heading>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                <Input type="email" placeholder="Email" fullWidth />
                                <Input type="password" placeholder="Password" fullWidth />
                            </div>
                        </div>

                        <div>
                            <Heading level={4} marginTop={false} marginBottom={false} style={{ marginBottom: 'var(--spacing-3)' }}>
                                Form with Validation
                            </Heading>
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
                }
                code={`import { Input, Heading } from 'baukasten';

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
  <div>
    <Heading level={4} marginTop={false} marginBottom={false} style={{ marginBottom: 'var(--spacing-3)' }}>
      Login Form
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <Input type="email" placeholder="Email" fullWidth />
      <Input type="password" placeholder="Password" fullWidth />
    </div>
  </div>

  <div>
    <Heading level={4} marginTop={false} marginBottom={false} style={{ marginBottom: 'var(--spacing-3)' }}>
      Form with Validation
    </Heading>
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
</div>`}
                props={inputProps}
            />
        </PageLayout>
    );
}
