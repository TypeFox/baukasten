'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Tooltip, Button, Icon, Heading } from 'baukasten-ui';
import type { TooltipPlacement } from 'baukasten-ui';

const tooltipProps: PropDefinition[] = [
    { name: 'content', type: 'React.ReactNode', required: true, description: 'Content to display in the tooltip' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'The trigger element that will show the tooltip on hover' },
    { name: 'placement', type: '"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end"', default: '"top"', description: 'Placement of the tooltip relative to its trigger' },
    { name: 'variant', type: '"default" | "primary" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Visual variant of the tooltip' },
    { name: 'showArrow', type: 'boolean', default: 'true', description: 'Whether to show the arrow/chevron pointing to the trigger' },
    { name: 'maxWidth', type: 'string', default: '"320px"', description: 'Maximum width of the tooltip' },
    { name: 'delay', type: 'number', default: '0', description: 'Delay in milliseconds before showing the tooltip' },
];

export default function TooltipPage() {
    const placements: TooltipPlacement[] = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
    ];

    return (
        <PageLayout
            title="Tooltip"
            description="A hover-triggered tooltip component that wraps a trigger element and displays informational content. Supports 12 placements and multiple variants with an optional arrow. Uses Floating UI for intelligent positioning with automatic collision detection."
        >
            <Showcase
                title="Basic Usage"
                description="Wrap any trigger element with Tooltip and provide content. Hover over the button to see the tooltip appear above it."
                preview={
                    <div style={{ padding: 'var(--spacing-8)' }}>
                        <Tooltip content="This is a tooltip">
                            <Button>Hover me</Button>
                        </Tooltip>
                    </div>
                }
                code={`import { Tooltip, Button } from 'baukasten-ui';

function App() {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}`}
                props={tooltipProps}
            />

            <Showcase
                title="Placements"
                description="Tooltip supports 12 different placements around its trigger element. Hover over each button to see the tooltip appear in the corresponding position."
                preview={
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 'var(--spacing-6)',
                        padding: 'var(--spacing-8)',
                        minHeight: '400px',
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}>
                        {placements.map((placement) => (
                            <Tooltip
                                key={placement}
                                content={`Placement: ${placement}`}
                                placement={placement}
                                variant="primary"
                            >
                                <Button variant="secondary" size="sm">
                                    {placement}
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                }
                code={`// Top placements
<Tooltip content="Top" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Top Start" placement="top-start">
  <Button>Top Start</Button>
</Tooltip>
<Tooltip content="Top End" placement="top-end">
  <Button>Top End</Button>
</Tooltip>

// Bottom placements
<Tooltip content="Bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Bottom Start" placement="bottom-start">
  <Button>Bottom Start</Button>
</Tooltip>
<Tooltip content="Bottom End" placement="bottom-end">
  <Button>Bottom End</Button>
</Tooltip>

// Left placements
<Tooltip content="Left" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Left Start" placement="left-start">
  <Button>Left Start</Button>
</Tooltip>
<Tooltip content="Left End" placement="left-end">
  <Button>Left End</Button>
</Tooltip>

// Right placements
<Tooltip content="Right" placement="right">
  <Button>Right</Button>
</Tooltip>
<Tooltip content="Right Start" placement="right-start">
  <Button>Right Start</Button>
</Tooltip>
<Tooltip content="Right End" placement="right-end">
  <Button>Right End</Button>
</Tooltip>`}
            />

            <Showcase
                title="Variants"
                description="Six visual variants available: default (neutral), primary (emphasis), success (positive), warning (caution), error (danger), and info (information). Hover over each button to see the variant."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                        <Tooltip content="Default variant" variant="default">
                            <Button variant="ghost">Default</Button>
                        </Tooltip>
                        <Tooltip content="Primary variant" variant="primary">
                            <Button variant="ghost">Primary</Button>
                        </Tooltip>
                        <Tooltip content="Success variant" variant="success">
                            <Button variant="ghost">Success</Button>
                        </Tooltip>
                        <Tooltip content="Warning variant" variant="warning">
                            <Button variant="ghost">Warning</Button>
                        </Tooltip>
                        <Tooltip content="Error variant" variant="error">
                            <Button variant="ghost">Error</Button>
                        </Tooltip>
                        <Tooltip content="Info variant" variant="info">
                            <Button variant="ghost">Info</Button>
                        </Tooltip>
                    </div>
                }
                code={`<Tooltip content="Default variant" variant="default">
  <Button>Default</Button>
</Tooltip>

<Tooltip content="Primary variant" variant="primary">
  <Button>Primary</Button>
</Tooltip>

<Tooltip content="Success variant" variant="success">
  <Button>Success</Button>
</Tooltip>

<Tooltip content="Warning variant" variant="warning">
  <Button>Warning</Button>
</Tooltip>

<Tooltip content="Error variant" variant="error">
  <Button>Error</Button>
</Tooltip>

<Tooltip content="Info variant" variant="info">
  <Button>Info</Button>
</Tooltip>`}
            />

            <Showcase
                title="With and Without Arrow"
                description="Tooltips can be shown with or without an arrow. The arrow helps visually connect the tooltip to its trigger element."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>With Arrow (Default)</span>
                            <Tooltip content="This tooltip has an arrow" placement="top" showArrow={true}>
                                <Button size="sm">Hover me</Button>
                            </Tooltip>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>Without Arrow</span>
                            <Tooltip content="This tooltip has no arrow" placement="top" showArrow={false}>
                                <Button size="sm">Hover me</Button>
                            </Tooltip>
                        </div>
                    </div>
                }
                code={`// With arrow (default)
<Tooltip content="This tooltip has an arrow" showArrow={true}>
  <Button>Hover me</Button>
</Tooltip>

// Without arrow
<Tooltip content="This tooltip has no arrow" showArrow={false}>
  <Button>Hover me</Button>
</Tooltip>`}
            />

            <Showcase
                title="Content Types"
                description="Tooltips can contain any React content: simple text, structured layouts, icons, formatted text, and more. Use the maxWidth prop to control text wrapping."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                        <Tooltip content="Simple text content" variant="default">
                            <Button size="sm">Simple Text</Button>
                        </Tooltip>

                        <Tooltip
                            content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                                    <strong>Tooltip with structured content</strong>
                                    <span style={{ fontSize: 'var(--font-size-sm)' }}>
                                        You can include any React content inside a tooltip.
                                    </span>
                                </div>
                            }
                            variant="primary"
                            maxWidth="400px"
                        >
                            <Button size="sm">Structured</Button>
                        </Tooltip>

                        <Tooltip
                            content={
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                    <Icon name="check" />
                                    <span>Success with icon</span>
                                </div>
                            }
                            variant="success"
                        >
                            <Button size="sm">With Icon</Button>
                        </Tooltip>

                        <Tooltip
                            content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                        <Icon name="info" />
                                        <strong>Information</strong>
                                    </div>
                                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
                                        This is a longer information message that demonstrates how content wraps within the tooltip.
                                    </p>
                                </div>
                            }
                            variant="info"
                            maxWidth="250px"
                        >
                            <Button size="sm">Complex Content</Button>
                        </Tooltip>
                    </div>
                }
                code={`// Simple text
<Tooltip content="Simple text content">
  <Button>Simple Text</Button>
</Tooltip>

// Structured content
<Tooltip
  content={
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <strong>Title</strong>
      <span>Description text</span>
    </div>
  }
  maxWidth="400px"
>
  <Button>Structured</Button>
</Tooltip>

// With icon
<Tooltip
  content={
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name="check" />
      <span>Success with icon</span>
    </div>
  }
  variant="success"
>
  <Button>With Icon</Button>
</Tooltip>

// Complex layout
<Tooltip
  content={
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon name="info" />
        <strong>Information</strong>
      </div>
      <p style={{ margin: 0, fontSize: '14px' }}>
        Longer information message with wrapping text.
      </p>
    </div>
  }
  maxWidth="250px"
>
  <Button>Complex</Button>
</Tooltip>`}
            />

            <Showcase
                title="With Delay"
                description="Add a delay before the tooltip appears. This is useful to prevent tooltips from showing during quick mouse movements."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                        <Tooltip content="Appears immediately" placement="top" delay={0}>
                            <Button size="sm">No Delay</Button>
                        </Tooltip>

                        <Tooltip content="Appears after 300ms" placement="top" delay={300}>
                            <Button size="sm">300ms Delay</Button>
                        </Tooltip>

                        <Tooltip content="Appears after 500ms" placement="top" delay={500}>
                            <Button size="sm">500ms Delay</Button>
                        </Tooltip>
                    </div>
                }
                code={`// No delay (default)
<Tooltip content="Appears immediately" delay={0}>
  <Button>No Delay</Button>
</Tooltip>

// 300ms delay
<Tooltip content="Appears after 300ms" delay={300}>
  <Button>300ms Delay</Button>
</Tooltip>

// 500ms delay
<Tooltip content="Appears after 500ms" delay={500}>
  <Button>500ms Delay</Button>
</Tooltip>`}
            />

            <Showcase
                title="Action Buttons Example"
                description="Practical example showing tooltips on action buttons with different variants and placements. Hover over each button to see contextual information."
                preview={
                    <div style={{ padding: 'var(--spacing-8)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Tooltip content="Save your changes" placement="top" variant="default">
                                <Button variant="primary">
                                    <Icon name="check" />
                                    Save
                                </Button>
                            </Tooltip>

                            <Tooltip content="Permanently delete this item" placement="bottom" variant="error">
                                <Button variant="secondary">
                                    <Icon name="trash" />
                                    Delete
                                </Button>
                            </Tooltip>

                            <Tooltip content="Get more information" placement="right" variant="info">
                                <Button variant="ghost" circular>
                                    <Icon name="info" />
                                </Button>
                            </Tooltip>

                            <Tooltip content="This action cannot be undone" placement="left" variant="warning" maxWidth="200px">
                                <Button variant="secondary">
                                    <Icon name="warning" />
                                    Warning
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                }
                code={`<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
  <Tooltip content="Save your changes" variant="default">
    <Button variant="primary">
      <Icon name="check" />
      Save
    </Button>
  </Tooltip>

  <Tooltip content="Permanently delete this item" variant="error">
    <Button variant="secondary">
      <Icon name="trash" />
      Delete
    </Button>
  </Tooltip>

  <Tooltip content="Get more information" variant="info">
    <Button variant="ghost" circular>
      <Icon name="info" />
    </Button>
  </Tooltip>

  <Tooltip content="This action cannot be undone" variant="warning" maxWidth="200px">
    <Button variant="secondary">
      <Icon name="warning" />
      Warning
    </Button>
  </Tooltip>
</div>`}
            />

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Positioning & Behavior
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Automatic flip:</strong> If there's no space for the tooltip in the specified placement, it automatically flips to the opposite side
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Viewport shift:</strong> The tooltip automatically shifts to stay within the viewport boundaries
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Portal rendering:</strong> Tooltips are rendered in a portal to avoid z-index and overflow issues
                    </li>
                    <li>
                        <strong>Auto-update:</strong> Position updates automatically when scrolling or resizing the window
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Uses <code>role="tooltip"</code> for proper semantic meaning
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Shows on both hover and keyboard focus for accessibility
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Dismisses on <code>Escape</code> key and click outside
                    </li>
                    <li>
                        Tooltip trigger is automatically associated with the tooltip content for screen readers
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Content:</strong> Keep tooltip text concise and to the point. Use 1-2 short sentences maximum
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Placement:</strong> Use <code>top</code> or <code>bottom</code> for most cases. Use <code>left</code> or <code>right</code> for side navigation
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Variants:</strong> Use <code>error</code> for destructive actions, <code>warning</code> for caution, <code>info</code> for help text, <code>success</code> for confirmations
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Delay:</strong> Add a delay (200-500ms) when tooltips are in dense interfaces to prevent flickering during mouse movement
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Arrow:</strong> Keep the arrow enabled (default) for better visual connection. Disable for clean, minimal designs
                    </li>
                    <li>
                        <strong>Max width:</strong> Use <code>maxWidth</code> prop to prevent overly wide tooltips. Default 320px works for most cases
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
