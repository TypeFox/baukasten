import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text, Paragraph, Code, Link, Image } from './index';

// Story-specific styles using a style tag
const storyStyles = `
  .typo-container { padding: var(--spacing-6); max-width: 800px; }
  .typo-section { margin-bottom: var(--spacing-8); padding-bottom: var(--spacing-6); border-bottom: var(--border-width-1) solid var(--color-border); }
  .typo-section:last-child { border-bottom: none; }
  .typo-section-title { color: var(--color-foreground); font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin: 0 0 var(--spacing-4) 0; }
  .typo-example { margin-bottom: var(--spacing-4); padding: var(--spacing-4); background-color: var(--color-background); border: var(--border-width-1) solid var(--color-border); border-radius: var(--radius-md); }
  .typo-example-label { font-size: var(--font-size-xs); color: var(--color-secondary-foreground); margin-bottom: var(--spacing-2); font-family: var(--font-family-mono); }
`;

// Functional components replacing styled components
const Container = ({ children }: { children: React.ReactNode }) => <div className="typo-container">{children}</div>;
const Section = ({ children }: { children: React.ReactNode }) => <div className="typo-section">{children}</div>;
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h3 className="typo-section-title">{children}</h3>;
const Example = ({ children }: { children: React.ReactNode }) => <div className="typo-example">{children}</div>;
const ExampleLabel = ({ children }: { children: React.ReactNode }) => <div className="typo-example-label">{children}</div>;

// Comprehensive Typography showcase
const TypographyShowcase = () => (
    <>
        <style>{storyStyles}</style>
        <Container>
            <Section>
                <SectionTitle>Headings</SectionTitle>

                <Example>
                    <ExampleLabel>{'<Heading level={1}>H1 Heading</Heading>'}</ExampleLabel>
                    <Heading level={1}>H1 Heading - Main Title</Heading>
                </Example>

                <Example>
                    <ExampleLabel>{'<Heading level={2}>H2 Heading</Heading>'}</ExampleLabel>
                    <Heading level={2}>H2 Heading - Section Title</Heading>
                </Example>

                <Example>
                    <ExampleLabel>{'<Heading level={3}>H3 Heading</Heading>'}</ExampleLabel>
                    <Heading level={3}>H3 Heading - Subsection</Heading>
                </Example>

                <Example>
                    <ExampleLabel>{'<Heading level={4}>H4 Heading</Heading>'}</ExampleLabel>
                    <Heading level={4}>H4 Heading - Minor Section</Heading>
                </Example>

                <Example>
                    <ExampleLabel>{'<Heading level={2} style={{ fontSize: "2.5rem" }}>Custom Size</Heading>'}</ExampleLabel>
                    <Heading level={2} style={{ fontSize: '2.5rem' }}>H2 with Custom Size</Heading>
                </Example>

                <Example>
                    <ExampleLabel>{'<Heading level={1} align="center">Centered</Heading>'}</ExampleLabel>
                    <Heading level={1} align="center">Centered Heading</Heading>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Paragraphs</SectionTitle>

                <Example>
                    <ExampleLabel>{'<Paragraph>Default paragraph</Paragraph>'}</ExampleLabel>
                    <Paragraph>
                        This is a default paragraph with normal line height and spacing. It demonstrates
                        how body text should look in typical use cases. The paragraph component provides
                        consistent styling across your application.
                    </Paragraph>
                </Example>

                <Example>
                    <ExampleLabel>{'<Paragraph size="lg" lineHeight="relaxed">'}</ExampleLabel>
                    <Paragraph size="lg" lineHeight="relaxed">
                        This is a larger paragraph with relaxed line height. It's ideal for long-form
                        content where readability is paramount. The increased spacing makes it easier
                        to read longer passages of text.
                    </Paragraph>
                </Example>

                <Example>
                    <ExampleLabel>{'<Paragraph align="center">'}</ExampleLabel>
                    <Paragraph align="center">
                        This paragraph is center-aligned, useful for callouts or special sections.
                    </Paragraph>
                </Example>

                <Example>
                    <ExampleLabel>{'<Paragraph maxLines={2}>Truncated...</Paragraph>'}</ExampleLabel>
                    <Paragraph maxLines={2}>
                        This paragraph will be truncated after two lines. Any text beyond the second
                        line will be hidden with an ellipsis. This is useful for previews or cards
                        where space is limited and you want to maintain a clean layout without
                        showing all the content.
                    </Paragraph>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Text</SectionTitle>

                <Example>
                    <ExampleLabel>Inline text variations</ExampleLabel>
                    <div>
                        <Text>Default text</Text> | <Text weight="bold">Bold text</Text> | <Text italic>Italic text</Text> | <Text color="primary">Primary color</Text> | <Text color="muted">Muted text</Text>
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>Text sizes</ExampleLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <Text size="xs">Extra small text (xs)</Text>
                        <Text size="sm">Small text (sm)</Text>
                        <Text size="md">Medium text (md)</Text>
                        <Text size="base">Base text</Text>
                        <Text size="lg">Large text (lg)</Text>
                        <Text size="xl">Extra large text (xl)</Text>
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>Semantic colors</ExampleLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <Text color="default">Default text</Text>
                        <Text color="primary">Primary text</Text>
                        <Text color="success">Success text</Text>
                        <Text color="warning">Warning text</Text>
                        <Text color="danger">Danger text</Text>
                        <Text color="info">Info text</Text>
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>{'<Text monospace>Monospace font</Text>'}</ExampleLabel>
                    <Text monospace>console.log("Hello, World!");</Text>
                </Example>

                <Example>
                    <ExampleLabel>{'<Text block truncate style={{width: "200px"}}>'}</ExampleLabel>
                    <Text block truncate style={{ width: '200px' }}>
                        This is a very long text that will be truncated with an ellipsis
                    </Text>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Code</SectionTitle>

                <Example>
                    <ExampleLabel>Inline code</ExampleLabel>
                    <Paragraph>
                        Use the <Code>console.log()</Code> function to print output. You can also use <Code>const</Code> and <Code>let</Code> for variables.
                    </Paragraph>
                </Example>

                <Example>
                    <ExampleLabel>{'<Code block>Code block</Code>'}</ExampleLabel>
                    <Code block>
                        {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`}
                    </Code>
                </Example>

                <Example>
                    <ExampleLabel>{'<Code block wrap>Wrapped code</Code>'}</ExampleLabel>
                    <Code block wrap>
                        {`This is a very long line of code that would normally require horizontal scrolling, but with the wrap prop it will wrap to the next line instead of creating a scrollbar.`}
                    </Code>
                </Example>

                <Example>
                    <ExampleLabel>{'<Code block maxHeight="100px">'}</ExampleLabel>
                    <Code block maxHeight="100px">
                        {`// This code block has a max height and will scroll vertically
function example1() { return "line 1"; }
function example2() { return "line 2"; }
function example3() { return "line 3"; }
function example4() { return "line 4"; }
function example5() { return "line 5"; }
function example6() { return "line 6"; }
function example7() { return "line 7"; }
function example8() { return "line 8"; }`}
                    </Code>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Links</SectionTitle>

                <Example>
                    <ExampleLabel>Link variants</ExampleLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <Link href="#default">Default link (hover for underline)</Link>
                        <Link href="#muted" variant="muted">Muted link variant</Link>
                        <Link href="#primary" variant="primary">Primary link variant</Link>
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>Underline options</ExampleLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <Link href="#always" underline="always">Always underlined</Link>
                        <Link href="#hover" underline="hover">Underline on hover (default)</Link>
                        <Link href="#never" underline="never">Never underlined</Link>
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>External link</ExampleLabel>
                    <Link href="https://example.com" external>
                        External link with indicator
                    </Link>
                </Example>

                <Example>
                    <ExampleLabel>Links in paragraphs</ExampleLabel>
                    <Paragraph>
                        Visit our <Link href="#docs">documentation</Link> to learn more about the API.
                        You can also check out our <Link href="https://github.com" external>GitHub repository</Link> for
                        source code and examples.
                    </Paragraph>
                </Example>

                <Example>
                    <ExampleLabel>Link sizes</ExampleLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <Link href="#xs" size="xs">Extra small link</Link>
                        <Link href="#sm" size="sm">Small link</Link>
                        <Link href="#md" size="md">Medium link</Link>
                        <Link href="#base" size="base">Base link</Link>
                        <Link href="#lg" size="lg">Large link</Link>
                    </div>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Images</SectionTitle>

                <Example>
                    <ExampleLabel>{'<Image src="..." alt="..." />'}</ExampleLabel>
                    <Image
                        src="https://picsum.photos/400/300"
                        alt="Sample image"
                    />
                </Example>

                <Example>
                    <ExampleLabel>{'<Image aspectRatio="16/9" caption="..." />'}</ExampleLabel>
                    <Image
                        src="https://picsum.photos/800/450"
                        alt="Landscape"
                        aspectRatio="16/9"
                        caption="A beautiful landscape photograph"
                    />
                </Example>

                <Example>
                    <ExampleLabel>{'<Image aspectRatio="1/1" radius="full" /> - Circular avatar'}</ExampleLabel>
                    <div style={{ width: '150px' }}>
                        <Image
                            src="https://picsum.photos/300/300"
                            alt="Avatar"
                            aspectRatio="1/1"
                            radius="full"
                            fit="cover"
                        />
                    </div>
                </Example>

                <Example>
                    <ExampleLabel>{'<Image bordered shadow radius="md" /> - With styling'}</ExampleLabel>
                    <Image
                        src="https://picsum.photos/600/400"
                        alt="Product"
                        bordered
                        shadow
                        radius="md"
                        caption="Product showcase with border and shadow"
                    />
                </Example>

                <Example>
                    <ExampleLabel>{'<Image /> - Default (no rounded corners)'}</ExampleLabel>
                    <Image
                        src="https://picsum.photos/600/400"
                        alt="Default"
                        caption="Image without rounded corners (default)"
                    />
                </Example>

                <Example>
                    <ExampleLabel>{'<Image captionPosition="overlay" />'}</ExampleLabel>
                    <Image
                        src="https://picsum.photos/800/400"
                        alt="Hero"
                        aspectRatio="21/9"
                        caption="Hero Section with Overlay Caption"
                        captionPosition="overlay"
                    />
                </Example>

                <Example>
                    <ExampleLabel>Different fit options</ExampleLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-4)' }}>
                        <div>
                            <Image
                                src="https://picsum.photos/200/300"
                                alt="Cover"
                                aspectRatio="1/1"
                                fit="cover"
                                caption="cover"
                                radius="md"
                            />
                        </div>
                        <div>
                            <Image
                                src="https://picsum.photos/200/300"
                                alt="Contain"
                                aspectRatio="1/1"
                                fit="contain"
                                caption="contain"
                                radius="md"
                                bordered
                            />
                        </div>
                        <div>
                            <Image
                                src="https://picsum.photos/200/300"
                                alt="Fill"
                                aspectRatio="1/1"
                                fit="fill"
                                caption="fill"
                                radius="md"
                            />
                        </div>
                    </div>
                </Example>
            </Section>

            <Section>
                <SectionTitle>Typography Combinations</SectionTitle>

                <Example>
                    <ExampleLabel>Article example</ExampleLabel>
                    <div>
                        <Heading level={1}>Building Better UIs</Heading>
                        <Paragraph size="lg" lineHeight="relaxed">
                            Learn how to create beautiful and accessible user interfaces using our
                            comprehensive design system.
                        </Paragraph>

                        <Heading level={2}>Getting Started</Heading>
                        <Paragraph>
                            First, install the package using <Code>npm install @baukasten/ui</Code>. Then
                            import the components you need in your application.
                        </Paragraph>

                        <Heading level={3}>Basic Example</Heading>
                        <Code block>
                            {`import { Button, Input } from 'baukasten';

function App() {
  return <Button>Click me</Button>;
}`}
                        </Code>

                        <Paragraph>
                            For more information, visit our <Link href="#docs">documentation</Link>.
                        </Paragraph>
                    </div>
                </Example>
            </Section>
        </Container>
    </>
);

const meta = {
    title: 'Components/Typography',
    component: Heading,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A comprehensive typography system with semantic HTML elements. Includes Heading (h1-h6), Paragraph, Text (inline/block), Code (inline/block), Link, and Image components. All components extend their respective HTML props for maximum flexibility.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground to explore typography properties.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    render: (args) => <Heading {...args} />,
    args: {
        level: 1,
        children: 'Interactive Heading',
    },
    argTypes: {
        level: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6],
            description: 'Semantic heading level (h1-h6)',
            table: {
                defaultValue: { summary: '1' },
            },
        },
        align: {
            control: { type: 'select' },
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
            table: {
                defaultValue: { summary: 'left' },
            },
        },
        marginBottom: {
            control: 'boolean',
            description: 'Add bottom margin for spacing',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore heading properties. All typography components (Heading, Text, Paragraph, Code, Link, Image) extend their respective HTML props for maximum flexibility.',
            },
        },
    },
};

/**
 * All heading levels (h1-h6) with their default sizes and custom sizing examples.
 */
export const Headings: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <Heading level={1}>Heading Level 1</Heading>
                <Heading level={2}>Heading Level 2</Heading>
                <Heading level={3}>Heading Level 3</Heading>
                <Heading level={4}>Heading Level 4</Heading>
                <Heading level={5}>Heading Level 5</Heading>
                <Heading level={6}>Heading Level 6</Heading>

                <div style={{ marginTop: 'var(--spacing-8)' }}>
                    <Heading level={2} style={{ fontSize: 'var(--font-size-5xl)' }}>Custom Sized Heading</Heading>
                    <Heading level={1} style={{ fontSize: 'var(--font-size-lg)' }}>Small H1</Heading>
                </div>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All six heading levels (h1-h6) with their semantic meaning intact. You can override font-size via the style prop while maintaining semantic HTML structure.',
            },
        },
    },
};

/**
 * Paragraph component with different sizes and line height options.
 */
export const Paragraphs: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <Paragraph>
                    This is a default paragraph with normal styling. It demonstrates how body text
                    should look in typical use cases with default line height and spacing.
                </Paragraph>

                <Paragraph size="lg" lineHeight="relaxed">
                    This is a larger paragraph with relaxed line height, ideal for long-form content
                    where readability is important.
                </Paragraph>

                <Paragraph size="sm" lineHeight="tight">
                    This is a smaller paragraph with tight line height, useful for dense content
                    or secondary information.
                </Paragraph>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Paragraph component supports different sizes (xs, sm, md, lg, xl) and line heights (tight, normal, relaxed, loose) for optimal readability in various contexts.',
            },
        },
    },
};

/**
 * Text component variations: weights, styles, colors, and sizes.
 */
export const TextVariants: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                    <div>
                        <Text>Default</Text> | <Text weight="bold">Bold</Text> | <Text italic>Italic</Text> | <Text monospace>Mono</Text>
                    </div>

                    <div>
                        <Text color="primary">Primary</Text> |
                        <Text color="success"> Success</Text> |
                        <Text color="warning"> Warning</Text> |
                        <Text color="danger"> Danger</Text>
                    </div>

                    <div>
                        <Text size="xs">XS</Text> |
                        <Text size="sm">SM</Text> |
                        <Text size="md">MD</Text> |
                        <Text size="lg">LG</Text> |
                        <Text size="xl">XL</Text>
                    </div>
                </div>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Text component for inline text with weights (regular, medium, semibold, bold), semantic colors (primary, success, warning, danger, info, muted), and various sizes.',
            },
        },
    },
};

/**
 * Code component for inline and block code snippets.
 */
export const CodeSnippets: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <Paragraph>
                    Inline code example: <Code>const x = 42;</Code>
                </Paragraph>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                    <Code block>
                        {`function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`}
                    </Code>
                </div>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Code component supports inline code (default) and block code (with `block` prop). Block code includes syntax styling and proper formatting.',
            },
        },
    },
};

/**
 * Link component with different variants and underline options.
 */
export const Links: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
                        <Link href="https://example.com" external>External link</Link>
                    </div>

                    <Paragraph>
                        Links work great in paragraphs too. Check out our{' '}
                        <Link href="#docs">documentation</Link> or visit our{' '}
                        <Link href="https://github.com" external>GitHub</Link>.
                    </Paragraph>
                </div>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Link component with variants (default, primary, muted), underline options (hover, always, never), and external link indicator.',
            },
        },
    },
};

/**
 * Image component with captions, aspect ratios, borders, and styling options.
 */
export const Images: Story = {
    render: () => (
        <>
            <style>{storyStyles}</style>
            <Container>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                    <div>
                        <Text weight="bold" block style={{ marginBottom: 'var(--spacing-2)' }}>
                            Basic Image
                        </Text>
                        <Image
                            src="https://picsum.photos/600/400"
                            alt="Sample"
                        />
                    </div>

                    <div>
                        <Text weight="bold" block style={{ marginBottom: 'var(--spacing-2)' }}>
                            With Caption
                        </Text>
                        <Image
                            src="https://picsum.photos/800/450"
                            alt="Landscape"
                            aspectRatio="16/9"
                            caption="A beautiful landscape photograph"
                        />
                    </div>

                    <div>
                        <Text weight="bold" block style={{ marginBottom: 'var(--spacing-2)' }}>
                            Circular Avatar
                        </Text>
                        <div style={{ width: '150px' }}>
                            <Image
                                src="https://picsum.photos/300/300"
                                alt="Avatar"
                                aspectRatio="1/1"
                                radius="full"
                            />
                        </div>
                    </div>

                    <div>
                        <Text weight="bold" block style={{ marginBottom: 'var(--spacing-2)' }}>
                            With Border & Shadow
                        </Text>
                        <Image
                            src="https://picsum.photos/600/400"
                            alt="Product"
                            bordered
                            shadow
                            radius="lg"
                        />
                    </div>
                </div>
            </Container>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Image component with captions, aspect ratios, radius options (xs, sm, md, lg, xl, full), border, shadow, and object-fit controls (cover, contain, fill).',
            },
        },
    },
};

/**
 * Comprehensive showcase demonstrating all typography components in action.
 */
export const Showcase: Story = {
    render: () => <TypographyShowcase />,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Comprehensive showcase of all typography components: Headings, Paragraphs, Text, Code, Links, and Images. This demonstrates the complete typography system working together.',
            },
        },
    },
};
