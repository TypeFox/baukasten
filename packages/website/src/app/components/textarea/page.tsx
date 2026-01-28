'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { TextArea, Heading } from 'baukasten-ui';

const textAreaProps: PropDefinition[] = [
    { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size of the textarea' },
    { name: 'error', type: 'string | boolean', description: 'Error state or message. String displays error below, boolean only shows error border' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the textarea should take full width of its container' },
    { name: 'resize', type: '"none" | "vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Resize behavior for the textarea' },
    { name: 'rows', type: 'number', default: '4', description: 'Number of visible text rows' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text shown when textarea is empty' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled' },
];

export default function TextAreaPage() {
    return (
        <PageLayout
            title="TextArea"
            description="A multi-line text input component with size, resize, and error message support. Fully integrates with the design system tokens for consistent theming."
        >
            <Showcase
                title="Basic Usage"
                description="Simple textarea with placeholder text. By default, textareas have 4 rows and vertical resize enabled."
                preview={
                    <TextArea placeholder="Enter your message here..." />
                }
                code={`import { TextArea } from 'baukasten-ui';

function App() {
  return (
    <TextArea placeholder="Enter your message here..." />
  );
}`}
                props={textAreaProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Size affects font size, padding, and line height."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <div key={size}>
                                <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                    {size.toUpperCase()}{size === 'md' ? ' (default)' : ''}
                                </div>
                                <TextArea size={size} placeholder={`${size.toUpperCase()} size textarea`} rows={3} />
                            </div>
                        ))}
                    </div>
                }
                code={`<TextArea size="xs" placeholder="Extra small" />
<TextArea size="sm" placeholder="Small" />
<TextArea size="md" placeholder="Medium (default)" />
<TextArea size="lg" placeholder="Large" />
<TextArea size="xl" placeholder="Extra large" />`}
            />

            <Showcase
                title="Resize Options"
                description="Control how users can resize the textarea: none (fixed size), vertical (height only, default), horizontal (width only), or both (width and height)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                No Resize
                            </div>
                            <TextArea resize="none" placeholder="Cannot be resized" rows={3} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Vertical Resize (Default)
                            </div>
                            <TextArea resize="vertical" placeholder="Drag bottom edge to resize vertically" rows={3} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Horizontal Resize
                            </div>
                            <TextArea resize="horizontal" placeholder="Drag right edge to resize horizontally" rows={3} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Both Directions
                            </div>
                            <TextArea resize="both" placeholder="Drag corner to resize in any direction" rows={3} />
                        </div>
                    </div>
                }
                code={`<TextArea resize="none" placeholder="Fixed size" />
<TextArea resize="vertical" placeholder="Vertical only (default)" />
<TextArea resize="horizontal" placeholder="Horizontal only" />
<TextArea resize="both" placeholder="Both directions" />`}
            />

            <Showcase
                title="Row Options"
                description="Control the initial visible height using the rows prop. Default is 4 rows. Users can resize vertically if resize is enabled."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                2 Rows (Compact)
                            </div>
                            <TextArea rows={2} placeholder="Short textarea with 2 rows" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                4 Rows (Default)
                            </div>
                            <TextArea rows={4} placeholder="Default textarea with 4 rows" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                8 Rows (Tall)
                            </div>
                            <TextArea rows={8} placeholder="Tall textarea with 8 rows" />
                        </div>
                    </div>
                }
                code={`<TextArea rows={2} placeholder="Compact" />
<TextArea rows={4} placeholder="Default" />
<TextArea rows={8} placeholder="Tall" />`}
            />

            <Showcase
                title="States"
                description="TextArea supports default, error, and disabled states. Error state shows a red border and optional error message. Disabled state prevents interaction."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Default State
                            </div>
                            <TextArea placeholder="Enter your message here..." />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                With Error Message
                            </div>
                            <TextArea
                                placeholder="Enter description..."
                                error="Description must be at least 10 characters"
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Disabled State
                            </div>
                            <TextArea
                                placeholder="This field is disabled"
                                disabled
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Disabled with Error
                            </div>
                            <TextArea
                                placeholder="Disabled with error"
                                disabled
                                error="This field has an error"
                            />
                        </div>
                    </div>
                }
                code={`// Default state
<TextArea placeholder="Enter your message..." />

// With error message
<TextArea
  placeholder="Enter description..."
  error="Description must be at least 10 characters"
/>

// Disabled state
<TextArea placeholder="Disabled" disabled />

// Disabled with error
<TextArea placeholder="Disabled" disabled error="Error message" />`}
            />

            <Showcase
                title="Width Options"
                description="By default, textareas have auto width. Use fullWidth to make the textarea span the full width of its container. Useful for form layouts."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)', width: '100%' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Default Width (Inline)
                            </div>
                            <TextArea placeholder="Auto width" rows={3} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Full Width
                            </div>
                            <TextArea placeholder="This spans full width" fullWidth rows={3} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Multiple Full Width TextAreas
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                                <TextArea placeholder="Summary" fullWidth rows={2} />
                                <TextArea placeholder="Description" fullWidth rows={4} />
                                <TextArea placeholder="Notes" fullWidth rows={3} />
                            </div>
                        </div>
                    </div>
                }
                code={`// Default width (inline)
<TextArea placeholder="Auto width" />

// Full width
<TextArea placeholder="Full width" fullWidth />

// Stack multiple full width textareas
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <TextArea placeholder="Summary" fullWidth rows={2} />
  <TextArea placeholder="Description" fullWidth rows={4} />
  <TextArea placeholder="Notes" fullWidth rows={3} />
</div>`}
            />

            <Showcase
                title="Form Examples"
                description="Common form patterns using TextArea. Combine different props to create various form layouts."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', width: '100%' }}>
                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                                Feedback Form
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                <TextArea placeholder="Subject" fullWidth rows={2} />
                                <TextArea placeholder="Your feedback..." fullWidth rows={6} />
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                                Blog Post Editor
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                <TextArea placeholder="Title" fullWidth rows={2} resize="none" />
                                <TextArea placeholder="Write your post content here..." fullWidth rows={12} />
                                <TextArea placeholder="Tags (comma separated)" fullWidth rows={2} resize="none" />
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                                Form with Validation
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                <TextArea placeholder="Product name" fullWidth rows={2} />
                                <TextArea
                                    placeholder="Product description"
                                    error="Description must be at least 50 characters"
                                    fullWidth
                                    rows={6}
                                />
                                <TextArea placeholder="Additional notes (optional)" fullWidth rows={4} />
                            </div>
                        </div>
                    </div>
                }
                code={`// Feedback form
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <TextArea placeholder="Subject" fullWidth rows={2} />
  <TextArea placeholder="Your feedback..." fullWidth rows={6} />
</div>

// Blog post editor
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <TextArea placeholder="Title" fullWidth rows={2} resize="none" />
  <TextArea placeholder="Write your post..." fullWidth rows={12} />
  <TextArea placeholder="Tags" fullWidth rows={2} resize="none" />
</div>

// Form with validation
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <TextArea placeholder="Product name" fullWidth rows={2} />
  <TextArea
    placeholder="Product description"
    error="Description must be at least 50 characters"
    fullWidth
    rows={6}
  />
  <TextArea placeholder="Notes (optional)" fullWidth rows={4} />
</div>`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Error Handling
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>String error:</strong> Displays the error message below the textarea and shows error border styling
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Boolean error:</strong> Only shows error border styling, no message displayed
                    </li>
                    <li>
                        <strong>With FormHelper:</strong> Use boolean error for border, then add FormHelper component for more control over error display
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Uses native <code>&lt;textarea&gt;</code> element for full browser support and accessibility
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Supports all standard textarea attributes: <code>name</code>, <code>id</code>, <code>value</code>, <code>onChange</code>, etc.
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Error messages are automatically associated with the textarea for screen readers
                    </li>
                    <li>
                        Use with <code>FieldLabel</code> and <code>htmlFor</code> attribute to connect labels to textareas
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Row count:</strong> Use 2-3 rows for short inputs, 4-6 for medium content, 8+ for long form content
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Resize:</strong> Use <code>resize="vertical"</code> (default) for most cases. Use <code>resize="none"</code> for fixed-height fields like titles
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Full width:</strong> Always use <code>fullWidth</code> in form layouts for consistent sizing
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Placeholder:</strong> Use clear, concise placeholder text that describes the expected input
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Labels:</strong> Always pair with <code>FieldLabel</code> or use <code>aria-label</code> for accessibility
                    </li>
                    <li>
                        <strong>Error messages:</strong> Provide specific, actionable error messages that help users fix validation issues
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
