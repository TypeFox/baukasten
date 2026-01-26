'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Heading, Text, Paragraph, Code, Link } from 'baukasten-ui';

const headingProps: PropDefinition[] = [
    { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '1', description: 'Semantic heading level (h1-h6)' },
    { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Text alignment' },
    { name: 'marginBottom', type: 'boolean', default: 'true', description: 'Whether to add bottom margin' },
    { name: 'marginTop', type: 'boolean', default: 'true', description: 'Whether to add top margin' },
];

const textProps: PropDefinition[] = [
    { name: 'size', type: '"xs" | "sm" | "md" | "base" | "lg" | "xl"', default: '"md"', description: 'Visual size of the text' },
    { name: 'weight', type: '"normal" | "medium" | "semibold" | "bold"', default: '"normal"', description: 'Font weight' },
    { name: 'color', type: '"default" | "muted" | "primary" | "success" | "warning" | "danger" | "info"', default: '"default"', description: 'Text color variant' },
    { name: 'block', type: 'boolean', default: 'false', description: 'Whether to render as block element (div) instead of inline (span)' },
    { name: 'align', type: '"left" | "center" | "right" | "justify"', default: '"left"', description: 'Text alignment (only applies when block=true)' },
    { name: 'truncate', type: 'boolean', default: 'false', description: 'Whether to truncate text with ellipsis' },
    { name: 'italic', type: 'boolean', default: 'false', description: 'Whether to make text italic' },
    { name: 'monospace', type: 'boolean', default: 'false', description: 'Whether to make text monospace' },
];

const paragraphProps: PropDefinition[] = [
    { name: 'size', type: '"xs" | "sm" | "md" | "base" | "lg" | "xl"', default: '"md"', description: 'Visual size of the paragraph text' },
    { name: 'align', type: '"left" | "center" | "right" | "justify"', default: '"left"', description: 'Text alignment' },
    { name: 'lineHeight', type: '"tight" | "normal" | "relaxed" | "loose"', default: '"normal"', description: 'Line height' },
    { name: 'marginBottom', type: 'boolean', default: 'true', description: 'Whether to add bottom margin' },
    { name: 'maxLines', type: 'number', description: 'Maximum number of lines before truncating' },
];

const codeProps: PropDefinition[] = [
    { name: 'block', type: 'boolean', default: 'false', description: 'Whether to render as a block (pre) or inline (code) element' },
    { name: 'size', type: '"xs" | "sm" | "md" | "base"', default: '"sm"', description: 'Visual size of the code text' },
    { name: 'wrap', type: 'boolean', description: 'Whether to allow line wrapping (default: false for inline, true for block)' },
    { name: 'maxHeight', type: 'string', description: 'Maximum height for scrolling (only applies to block code)' },
];

const linkProps: PropDefinition[] = [
    { name: 'href', type: 'string', required: true, description: 'Link destination' },
    { name: 'size', type: '"xs" | "sm" | "md" | "base" | "lg"', default: '"md"', description: 'Visual size of the link text' },
    { name: 'variant', type: '"default" | "muted" | "primary"', default: '"default"', description: 'Link variant' },
    { name: 'underline', type: '"always" | "hover" | "never"', default: '"hover"', description: 'Whether to show underline' },
    { name: 'external', type: 'boolean', default: 'false', description: 'Whether the link is external (adds external link indicator and target="_blank")' },
];

export default function TypographyPage() {
    return (
        <PageLayout
            title="Typography"
            description="A comprehensive set of typography components for headings, text, paragraphs, code, and links. All components are semantic, accessible, and fully customizable with the design system tokens."
        >
            <Showcase
                title="Heading Component"
                description="Semantic heading component (h1-h6) with default styling for each level. All heading levels from 1 to 6 are available."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <Heading level={1}>Heading Level 1</Heading>
                        <Heading level={2}>Heading Level 2</Heading>
                        <Heading level={3}>Heading Level 3</Heading>
                        <Heading level={4}>Heading Level 4</Heading>
                        <Heading level={5}>Heading Level 5</Heading>
                        <Heading level={6}>Heading Level 6</Heading>
                    </div>
                }
                code={`import { Heading } from 'baukasten-ui';

function App() {
  return (
    <>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </>
  );
}`}
                props={headingProps}
            />

            <Showcase
                title="Heading Alignment"
                description="Control the text alignment of headings using the align prop. Supports left, center, and right alignment."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <Heading level={2} align="left">Left Aligned Heading</Heading>
                        <Heading level={2} align="center">Center Aligned Heading</Heading>
                        <Heading level={2} align="right">Right Aligned Heading</Heading>
                    </div>
                }
                code={`<Heading level={2} align="left">Left Aligned</Heading>
<Heading level={2} align="center">Center Aligned</Heading>
<Heading level={2} align="right">Right Aligned</Heading>`}
            />

            <Showcase
                title="Text Component"
                description="Versatile text component for inline or block text. Can be rendered as span (inline) or div (block) with various styling options."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <div>
                            <Text>Default text</Text> | <Text weight="bold">Bold text</Text> | <Text italic>Italic text</Text> | <Text monospace>Monospace</Text>
                        </div>
                        <div>
                            <Text color="primary">Primary</Text> | <Text color="success">Success</Text> | <Text color="warning">Warning</Text> | <Text color="danger">Danger</Text> | <Text color="info">Info</Text> | <Text color="muted">Muted</Text>
                        </div>
                        <div>
                            <Text size="xs">XS</Text> | <Text size="sm">SM</Text> | <Text size="md">MD</Text> | <Text size="lg">LG</Text> | <Text size="xl">XL</Text>
                        </div>
                    </div>
                }
                code={`import { Text } from 'baukasten-ui';

// Weight and style
<Text>Default text</Text>
<Text weight="bold">Bold text</Text>
<Text italic>Italic text</Text>
<Text monospace>Monospace</Text>

// Colors
<Text color="primary">Primary</Text>
<Text color="success">Success</Text>
<Text color="warning">Warning</Text>
<Text color="danger">Danger</Text>
<Text color="info">Info</Text>
<Text color="muted">Muted</Text>

// Sizes
<Text size="xs">XS</Text>
<Text size="sm">SM</Text>
<Text size="md">MD</Text>
<Text size="lg">LG</Text>
<Text size="xl">XL</Text>`}
                props={textProps}
            />

            <Showcase
                title="Text Block & Alignment"
                description="Use block prop to render Text as a div element, enabling alignment options. Truncate prop adds ellipsis for overflow text."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <Text block align="left">Left aligned block text</Text>
                        <Text block align="center">Center aligned block text</Text>
                        <Text block align="right">Right aligned block text</Text>
                        <Text block truncate style={{ maxWidth: '200px' }}>
                            This is a very long text that will be truncated with an ellipsis when it overflows
                        </Text>
                    </div>
                }
                code={`// Block alignment
<Text block align="left">Left aligned</Text>
<Text block align="center">Center aligned</Text>
<Text block align="right">Right aligned</Text>

// Truncate with ellipsis
<Text block truncate style={{ maxWidth: '200px' }}>
  This is a very long text that will be truncated...
</Text>`}
            />

            <Showcase
                title="Paragraph Component"
                description="Semantic paragraph component with flexible styling. Supports text alignment, line height control, and line clamping."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                        <Paragraph>
                            This is a default paragraph with normal styling. It demonstrates how body text should look in typical use cases with default line height and spacing.
                        </Paragraph>

                        <Paragraph size="lg" lineHeight="relaxed">
                            This is a larger paragraph with relaxed line height, ideal for long-form content where readability is important.
                        </Paragraph>

                        <Paragraph size="sm" lineHeight="tight">
                            This is a smaller paragraph with tight line height, useful for dense content or secondary information.
                        </Paragraph>

                        <Paragraph maxLines={3}>
                            This is a very long paragraph that will be truncated after three lines with an ellipsis. The rest of the text will be hidden from view. This demonstrates how the maxLines prop works to limit the visible content while maintaining proper styling and adding an ellipsis indicator at the truncation point.
                        </Paragraph>
                    </div>
                }
                code={`import { Paragraph } from 'baukasten-ui';

// Default paragraph
<Paragraph>
  This is a default paragraph with normal styling.
</Paragraph>

// Large with relaxed line height
<Paragraph size="lg" lineHeight="relaxed">
  Larger paragraph with more line spacing.
</Paragraph>

// Small with tight line height
<Paragraph size="sm" lineHeight="tight">
  Compact paragraph for dense content.
</Paragraph>

// Line clamping (truncate after 3 lines)
<Paragraph maxLines={3}>
  This is a very long paragraph that will be truncated...
</Paragraph>`}
                props={paragraphProps}
            />

            <Showcase
                title="Code Component"
                description="Display inline or block code snippets with monospace font. Inline renders as <code>, block renders as <pre><code>."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                        <div>
                            <Text>Use the <Code>console.log()</Code> function to debug your code.</Text>
                        </div>

                        <Code block>{`function hello() {
  console.log('Hello, World!');
  return true;
}`}</Code>

                        <Code block wrap>{`// With line wrapping enabled: Very long line of code that will wrap instead of scrolling horizontally. This is useful when you want to ensure all code is visible without horizontal scrolling.`}</Code>

                        <Code block maxHeight="100px">{`// With max height (scroll for more)
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10`}</Code>
                    </div>
                }
                code={`import { Code, Text } from 'baukasten-ui';

// Inline code
<Text>Use the <Code>console.log()</Code> function.</Text>

// Block code
<Code block>
{\`function hello() {
  console.log('Hello, World!');
  return true;
}\`}
</Code>

// With line wrapping
<Code block wrap>
  Very long line that will wrap instead of scrolling...
</Code>

// With max height (scrollable)
<Code block maxHeight="100px">
  {longCodeSnippet}
</Code>`}
                props={codeProps}
            />

            <Showcase
                title="Link Component"
                description="Versatile anchor/link component with various styling options. Supports different variants, sizes, and underline behaviors."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <div>
                            <Link href="#default">Default link</Link>
                        </div>

                        <div>
                            <Link href="#primary" variant="primary">Primary link</Link>
                        </div>

                        <div>
                            <Link href="#muted" variant="muted">Muted link</Link>
                        </div>

                        <div>
                            <Link href="https://example.com" external>External link (opens in new tab)</Link>
                        </div>

                        <div>
                            <Link href="#hover" underline="hover">Underline on hover (default)</Link> |{' '}
                            <Link href="#always" underline="always">Always underlined</Link> |{' '}
                            <Link href="#never" underline="never">Never underlined</Link>
                        </div>

                        <div>
                            <Link href="#xs" size="xs">XS</Link> |{' '}
                            <Link href="#sm" size="sm">SM</Link> |{' '}
                            <Link href="#md" size="md">MD</Link> |{' '}
                            <Link href="#lg" size="lg">LG</Link>
                        </div>

                        <Paragraph>
                            Links work great in paragraphs too. Check out our{' '}
                            <Link href="#docs">documentation</Link> or visit our{' '}
                            <Link href="https://github.com" external>GitHub</Link>.
                        </Paragraph>
                    </div>
                }
                code={`import { Link, Paragraph } from 'baukasten-ui';

// Default link
<Link href="#default">Default link</Link>

// Variants
<Link href="#primary" variant="primary">Primary link</Link>
<Link href="#muted" variant="muted">Muted link</Link>

// External link (auto adds target="_blank")
<Link href="https://example.com" external>External link</Link>

// Underline options
<Link href="#" underline="hover">Underline on hover</Link>
<Link href="#" underline="always">Always underlined</Link>
<Link href="#" underline="never">Never underlined</Link>

// Sizes
<Link href="#" size="xs">XS</Link>
<Link href="#" size="sm">SM</Link>
<Link href="#" size="md">MD</Link>
<Link href="#" size="lg">LG</Link>

// In paragraphs
<Paragraph>
  Check out our <Link href="#docs">documentation</Link> or visit our{' '}
  <Link href="https://github.com" external>GitHub</Link>.
</Paragraph>`}
                props={linkProps}
            />

            <Showcase
                title="Typography Combination Example"
                description="A real-world example showing how typography components work together to create structured, readable content."
                preview={
                    <div style={{ maxWidth: '600px' }}>
                        <Heading level={1}>Building Better UIs</Heading>
                        <Paragraph size="lg" lineHeight="relaxed">
                            Learn how to create beautiful and accessible user interfaces using our comprehensive design system.
                        </Paragraph>

                        <Heading level={2}>Getting Started</Heading>
                        <Paragraph>
                            First, install the package using <Code>npm install baukasten-ui</Code>. Then import the components you need in your application.
                        </Paragraph>

                        <Heading level={3}>Basic Example</Heading>
                        <Code block>
                            {`import { Button, Input } from 'baukasten-ui';

function App() {
  return <Button>Click me</Button>;
}`}
                        </Code>

                        <Paragraph>
                            For more information, visit our <Link href="#docs">documentation</Link>.
                        </Paragraph>
                    </div>
                }
                code={`import { Heading, Paragraph, Code, Link } from 'baukasten-ui';

function Article() {
  return (
    <div>
      <Heading level={1}>Building Better UIs</Heading>
      <Paragraph size="lg" lineHeight="relaxed">
        Learn how to create beautiful interfaces...
      </Paragraph>

      <Heading level={2}>Getting Started</Heading>
      <Paragraph>
        First, install the package using <Code>npm install baukasten-ui</Code>.
      </Paragraph>

      <Heading level={3}>Basic Example</Heading>
      <Code block>
        {\`import { Button } from 'baukasten-ui';
        
function App() {
  return <Button>Click me</Button>;
}\`}
      </Code>

      <Paragraph>
        For more information, visit our <Link href="#docs">documentation</Link>.
      </Paragraph>
    </div>
  );
}`}
            />

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Semantic HTML
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Heading:</strong> Renders semantic HTML headings (h1-h6) based on the level prop
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Text:</strong> Renders as <code>&lt;span&gt;</code> (inline) or <code>&lt;div&gt;</code> (block) depending on the block prop
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Paragraph:</strong> Always renders as semantic <code>&lt;p&gt;</code> element
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Code:</strong> Renders as <code>&lt;code&gt;</code> (inline) or <code>&lt;pre&gt;&lt;code&gt;</code> (block)
                    </li>
                    <li>
                        <strong>Link:</strong> Always renders as semantic <code>&lt;a&gt;</code> element with proper href attribute
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Heading levels:</strong> Use proper heading hierarchy (h1 for page title, h2 for sections, etc.)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Color contrast:</strong> All color variants meet WCAG 2.1 Level AA contrast requirements
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>External links:</strong> Automatically add <code>rel="noopener noreferrer"</code> and <code>target="_blank"</code>
                    </li>
                    <li>
                        <strong>Screen readers:</strong> All components use semantic HTML that works well with assistive technologies
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Heading hierarchy:</strong> Always start with h1 and don't skip levels (h1 → h2 → h3, not h1 → h3)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Text vs Paragraph:</strong> Use Text for short inline content, Paragraph for body text and longer content
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Code blocks:</strong> Use <code>block</code> prop for multi-line code, inline for short snippets
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Link underlines:</strong> Keep default hover underline for better usability, use <code>underline="never"</code> sparingly
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Line height:</strong> Use <code>relaxed</code> or <code>loose</code> for long-form content, <code>tight</code> for compact layouts
                    </li>
                    <li>
                        <strong>Color usage:</strong> Use semantic colors (success, warning, danger) for meaningful status indication
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
