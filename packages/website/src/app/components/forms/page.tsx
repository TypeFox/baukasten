'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { FieldLabel, FormGroup, FormHelper, Input, TextArea, Select, Checkbox, Label, Button, Heading } from 'baukasten';

const fieldLabelProps: PropDefinition[] = [
    { name: 'htmlFor', type: 'string', required: true, description: 'ID of the form element this label is for' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Whether the field is required (shows red asterisk)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled' },
];

const formGroupProps: PropDefinition[] = [
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Layout orientation (horizontal: VSCode-style two-column, vertical: stacked)' },
    { name: 'compact', type: 'boolean', default: 'false', description: 'Whether to use compact spacing' },
    { name: 'labelWidth', type: 'string', default: '"30%"', description: 'Custom label width (only applies to horizontal orientation)' },
];

const formHelperProps: PropDefinition[] = [
    { name: 'variant', type: '"default" | "error" | "warning" | "success" | "info"', default: '"default"', description: 'Visual variant of the helper text' },
];

export default function FormsPage() {
    return (
        <PageLayout
            title="Forms"
            description="A comprehensive set of form components including FieldLabel, FormGroup, and FormHelper. These components work together to create accessible, well-structured forms following VSCode design patterns."
        >
            <Showcase
                title="FieldLabel Component"
                description="A simple, semantic label for form fields. Displays text above or beside form inputs. Shows a red asterisk for required fields."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '400px' }}>
                        <div>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input id="username" fullWidth />
                        </div>
                        <div>
                            <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
                            <Input id="email" type="email" fullWidth />
                        </div>
                        <div>
                            <FieldLabel htmlFor="readonly" disabled>Read-only Field</FieldLabel>
                            <Input id="readonly" disabled fullWidth />
                        </div>
                    </div>
                }
                code={`import { FieldLabel, Input } from 'baukasten';

// Basic label
<FieldLabel htmlFor="username">Username</FieldLabel>
<Input id="username" fullWidth />

// Required field (shows asterisk)
<FieldLabel htmlFor="email" required>Email Address</FieldLabel>
<Input id="email" type="email" fullWidth />

// Disabled field
<FieldLabel htmlFor="readonly" disabled>Read-only Field</FieldLabel>
<Input id="readonly" disabled fullWidth />`}
                props={fieldLabelProps}
            />

            <Showcase
                title="FormHelper Component"
                description="Displays helper text, hints, or validation messages below form fields. Supports different visual variants for various states."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)', maxWidth: '400px' }}>
                        <div>
                            <Input id="username1" fullWidth />
                            <FormHelper>Choose a unique username with 3-20 characters</FormHelper>
                        </div>
                        <div>
                            <Input id="email1" error fullWidth />
                            <FormHelper variant="error">Please enter a valid email address</FormHelper>
                        </div>
                        <div>
                            <Input id="password1" fullWidth />
                            <FormHelper variant="warning">Password strength: weak</FormHelper>
                        </div>
                        <div>
                            <Input id="username2" fullWidth />
                            <FormHelper variant="success">Username is available!</FormHelper>
                        </div>
                        <div>
                            <Input id="apiKey1" fullWidth />
                            <FormHelper variant="info">Your API key will be encrypted at rest</FormHelper>
                        </div>
                    </div>
                }
                code={`import { FormHelper, Input } from 'baukasten';

// Default helper text
<Input id="username" />
<FormHelper>Choose a unique username with 3-20 characters</FormHelper>

// Error message
<Input id="email" error />
<FormHelper variant="error">Please enter a valid email address</FormHelper>

// Warning message
<Input id="password" />
<FormHelper variant="warning">Password strength: weak</FormHelper>

// Success message
<Input id="username" />
<FormHelper variant="success">Username is available!</FormHelper>

// Info message
<Input id="apiKey" />
<FormHelper variant="info">Your API key will be encrypted at rest</FormHelper>`}
                props={formHelperProps}
            />

            <Showcase
                title="FormGroup Component"
                description="A flexible container for form fields that supports VSCode-style two-column layout where labels appear on the left and inputs on the right, creating consistent alignment across multiple form fields."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <FormGroup>
                            <FieldLabel htmlFor="name" required>Name</FieldLabel>
                            <Input id="name" fullWidth />
                        </FormGroup>
                        <FormGroup>
                            <FieldLabel htmlFor="email2" required>Email</FieldLabel>
                            <div>
                                <Input id="email2" type="email" fullWidth />
                                <FormHelper>We'll never share your email</FormHelper>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                            <div>
                                <TextArea id="bio" rows={4} fullWidth />
                                <FormHelper>Tell us about yourself (optional)</FormHelper>
                            </div>
                        </FormGroup>
                    </div>
                }
                code={`import { FormGroup, FieldLabel, Input, TextArea, FormHelper } from 'baukasten';

function Form() {
  return (
    <>
      <FormGroup>
        <FieldLabel htmlFor="name" required>Name</FieldLabel>
        <Input id="name" fullWidth />
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="email" required>Email</FieldLabel>
        <div>
          <Input id="email" type="email" fullWidth />
          <FormHelper>We'll never share your email</FormHelper>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="bio">Bio</FieldLabel>
        <div>
          <TextArea id="bio" rows={4} fullWidth />
          <FormHelper>Tell us about yourself (optional)</FormHelper>
        </div>
      </FormGroup>
    </>
  );
}`}
                props={formGroupProps}
            />

            <Showcase
                title="FormGroup Orientations"
                description="FormGroup supports horizontal (VSCode-style two-column) and vertical (traditional stacked) layouts."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Horizontal (VSCode-style - Default)
                            </div>
                            <FormGroup orientation="horizontal">
                                <FieldLabel htmlFor="h-name" required>Name</FieldLabel>
                                <Input id="h-name" fullWidth />
                            </FormGroup>
                            <FormGroup orientation="horizontal">
                                <FieldLabel htmlFor="h-email">Email</FieldLabel>
                                <Input id="h-email" type="email" fullWidth />
                            </FormGroup>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Vertical (Stacked)
                            </div>
                            <FormGroup orientation="vertical">
                                <FieldLabel htmlFor="v-name" required>Name</FieldLabel>
                                <Input id="v-name" fullWidth />
                            </FormGroup>
                            <FormGroup orientation="vertical">
                                <FieldLabel htmlFor="v-email">Email</FieldLabel>
                                <Input id="v-email" type="email" fullWidth />
                            </FormGroup>
                        </div>
                    </div>
                }
                code={`// Horizontal layout (VSCode-style - default)
<FormGroup orientation="horizontal">
  <FieldLabel htmlFor="name" required>Name</FieldLabel>
  <Input id="name" fullWidth />
</FormGroup>

// Vertical layout (traditional stacked)
<FormGroup orientation="vertical">
  <FieldLabel htmlFor="name" required>Name</FieldLabel>
  <Input id="name" fullWidth />
</FormGroup>`}
            />

            <Showcase
                title="Complete Form Example"
                description="A real-world example showing all form components working together in a registration form with validation."
                preview={
                    <div style={{ maxWidth: '600px' }}>
                        <FormGroup>
                            <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
                            <div>
                                <Input id="fullName" fullWidth />
                                <FormHelper>Enter your first and last name</FormHelper>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="email3" required>Email Address</FieldLabel>
                            <div>
                                <Input id="email3" type="email" error fullWidth />
                                <FormHelper variant="error">Please enter a valid email address</FormHelper>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="password2" required>Password</FieldLabel>
                            <div>
                                <Input id="password2" type="password" fullWidth />
                                <FormHelper variant="warning">Password strength: medium. Add special characters to strengthen.</FormHelper>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="bio2">Biography</FieldLabel>
                            <div>
                                <TextArea id="bio2" rows={4} fullWidth />
                                <FormHelper>Tell us about yourself (optional)</FormHelper>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="country">Country</FieldLabel>
                            <Select
                                options={[
                                    { value: 'us', label: 'United States' },
                                    { value: 'uk', label: 'United Kingdom' },
                                    { value: 'ca', label: 'Canada' },
                                ]}
                                fullWidth
                            />
                        </FormGroup>

                        <FormGroup>
                            <div></div>
                            <Label variant="checkbox">
                                <Checkbox />
                                <span>I agree to the terms and conditions</span>
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <div></div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                                <Button variant="primary">Submit</Button>
                                <Button variant="secondary">Cancel</Button>
                            </div>
                        </FormGroup>
                    </div>
                }
                code={`import {
  FormGroup,
  FieldLabel,
  FormHelper,
  Input,
  TextArea,
  Select,
  Checkbox,
  Label,
  Button,
} from 'baukasten';

function RegistrationForm() {
  return (
    <form>
      <FormGroup>
        <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
        <div>
          <Input id="fullName" fullWidth />
          <FormHelper>Enter your first and last name</FormHelper>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
        <div>
          <Input id="email" type="email" error fullWidth />
          <FormHelper variant="error">
            Please enter a valid email address
          </FormHelper>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="password" required>Password</FieldLabel>
        <div>
          <Input id="password" type="password" fullWidth />
          <FormHelper variant="warning">
            Password strength: medium
          </FormHelper>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="bio">Biography</FieldLabel>
        <div>
          <TextArea id="bio" rows={4} fullWidth />
          <FormHelper>Tell us about yourself (optional)</FormHelper>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel htmlFor="country">Country</FieldLabel>
        <Select
          id="country"
          options={countryOptions}
          fullWidth
        />
      </FormGroup>

      <FormGroup>
        <div></div>
        <Label variant="checkbox">
          <Checkbox />
          <span>I agree to the terms and conditions</span>
        </Label>
      </FormGroup>

      <FormGroup>
        <div></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary">Submit</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </FormGroup>
    </form>
  );
}`}
            />

            <Showcase
                title="FormGroup Label Width"
                description="Customize the label width in horizontal orientation to accommodate different label lengths."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Default Label Width (30%)
                            </div>
                            <FormGroup>
                                <FieldLabel htmlFor="default-field">Label</FieldLabel>
                                <Input id="default-field" fullWidth />
                            </FormGroup>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Wide Label (40%)
                            </div>
                            <FormGroup labelWidth="40%">
                                <FieldLabel htmlFor="wide-field">Very Long Label Name</FieldLabel>
                                <Input id="wide-field" fullWidth />
                            </FormGroup>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Narrow Label (20%)
                            </div>
                            <FormGroup labelWidth="20%">
                                <FieldLabel htmlFor="narrow-field">Short</FieldLabel>
                                <Input id="narrow-field" fullWidth />
                            </FormGroup>
                        </div>
                    </div>
                }
                code={`// Default label width (30%)
<FormGroup>
  <FieldLabel htmlFor="field">Label</FieldLabel>
  <Input id="field" fullWidth />
</FormGroup>

// Wide label (40%)
<FormGroup labelWidth="40%">
  <FieldLabel htmlFor="field">Very Long Label Name</FieldLabel>
  <Input id="field" fullWidth />
</FormGroup>

// Narrow label (20%)
<FormGroup labelWidth="20%">
  <FieldLabel htmlFor="field">Short</FieldLabel>
  <Input id="field" fullWidth />
</FormGroup>`}
            />

            <Showcase
                title="Compact Spacing"
                description="Use compact prop to reduce spacing between form groups for denser layouts."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Default Spacing
                            </div>
                            <FormGroup>
                                <FieldLabel htmlFor="field1">Field 1</FieldLabel>
                                <Input id="field1" fullWidth />
                            </FormGroup>
                            <FormGroup>
                                <FieldLabel htmlFor="field2">Field 2</FieldLabel>
                                <Input id="field2" fullWidth />
                            </FormGroup>
                            <FormGroup>
                                <FieldLabel htmlFor="field3">Field 3</FieldLabel>
                                <Input id="field3" fullWidth />
                            </FormGroup>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Compact Spacing
                            </div>
                            <FormGroup compact>
                                <FieldLabel htmlFor="field4">Field 1</FieldLabel>
                                <Input id="field4" fullWidth />
                            </FormGroup>
                            <FormGroup compact>
                                <FieldLabel htmlFor="field5">Field 2</FieldLabel>
                                <Input id="field5" fullWidth />
                            </FormGroup>
                            <FormGroup compact>
                                <FieldLabel htmlFor="field6">Field 3</FieldLabel>
                                <Input id="field6" fullWidth />
                            </FormGroup>
                        </div>
                    </div>
                }
                code={`// Default spacing
<FormGroup>
  <FieldLabel htmlFor="field1">Field 1</FieldLabel>
  <Input id="field1" fullWidth />
</FormGroup>
<FormGroup>
  <FieldLabel htmlFor="field2">Field 2</FieldLabel>
  <Input id="field2" fullWidth />
</FormGroup>

// Compact spacing
<FormGroup compact>
  <FieldLabel htmlFor="field1">Field 1</FieldLabel>
  <Input id="field1" fullWidth />
</FormGroup>
<FormGroup compact>
  <FieldLabel htmlFor="field2">Field 2</FieldLabel>
  <Input id="field2" fullWidth />
</FormGroup>`}
            />

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Component Relationships
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>FieldLabel:</strong> Semantic <code>&lt;label&gt;</code> that links to form inputs via <code>htmlFor</code>
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>FormHelper:</strong> Helper text displayed below form fields for guidance or validation
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>FormGroup:</strong> Container that arranges FieldLabel and inputs in consistent layout
                    </li>
                    <li>
                        <strong>Usage pattern:</strong> Wrap FieldLabel + Input/TextArea + FormHelper inside FormGroup for proper alignment
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>FieldLabel:</strong> Uses semantic <code>&lt;label&gt;</code> with <code>htmlFor</code> to link to form controls
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Required indicator:</strong> Red asterisk has <code>aria-label="required"</code> for screen readers
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>FormHelper variants:</strong> Error messages are visually distinct with appropriate color coding
                    </li>
                    <li>
                        <strong>Focus management:</strong> All form components support keyboard navigation and proper focus states
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Always link labels:</strong> Use <code>htmlFor</code> attribute to connect FieldLabel to form inputs
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Required fields:</strong> Mark required fields with the <code>required</code> prop on FieldLabel
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Helper text:</strong> Use FormHelper for hints, validation messages, and additional context
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Error messages:</strong> Use <code>FormHelper variant="error"</code> with input error state for validation feedback
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Layout choice:</strong> Use horizontal for settings-style forms, vertical for traditional forms
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Input width:</strong> Always use <code>fullWidth</code> on inputs within FormGroup for proper alignment
                    </li>
                    <li>
                        <strong>Helper + Input grouping:</strong> Wrap Input and FormHelper in a <code>&lt;div&gt;</code> when using FormGroup
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
