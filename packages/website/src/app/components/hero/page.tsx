'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Hero, Button, Heading } from 'baukasten-ui';

const heroProps: PropDefinition[] = [
    { name: 'title', type: 'React.ReactNode', required: true, description: 'Main hero title text' },
    { name: 'description', type: 'React.ReactNode', description: 'Optional description/subtitle text' },
    { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Text alignment' },
    { name: 'size', type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: 'Hero height (sm=20vh, md=40vh, lg=60vh, xl=80vh, full=100vh)' },
    { name: 'background', type: '"default" | "secondary" | "tertiary" | "elevated"', default: '"default"', description: 'Background color using semantic tokens' },
    { name: 'children', type: 'React.ReactNode', description: 'Optional children rendered below title and description (e.g., CTA buttons)' },
];

const CTAContainer = ({ align, children }: { align?: 'left' | 'center' | 'right'; children: React.ReactNode }) => (
    <div style={{
        display: 'flex',
        gap: 'var(--bk-spacing-4)',
        marginTop: 'var(--bk-spacing-6)',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    }}>
        {children}
    </div>
);

export default function HeroPage() {
    return (
        <PageLayout
            title="Hero"
            description="A full-width hero section component designed for creating beautiful, impactful headers. Features large typography with semantic design tokens, flexible sizing, and alignment options. Perfect for landing pages, section headers, or important announcements."
        >
            <Showcase
                title="Basic Usage"
                description="Create a hero section with a title and optional description. The component automatically uses large, impactful typography."
                preview={
                    <Hero
                        title="Welcome to Baukasten"
                        description="Build beautiful VSCode extensions with React"
                    />
                }
                code={`import { Hero } from 'baukasten-ui';

function App() {
  return (
    <Hero
      title="Welcome to Baukasten"
      description="Build beautiful VSCode extensions with React"
    />
  );
}`}
                props={heroProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: sm (20vh), md (40vh - default), lg (60vh), xl (80vh), and full (100vh). Size controls the minimum height of the hero section."
                preview={
                    <div>
                        <Hero
                            title="Small Hero"
                            description="20% of viewport height (20vh)"
                            size="sm"
                            background="secondary"
                        />
                        <Hero
                            title="Medium Hero"
                            description="40% of viewport height (40vh) - Default size"
                            size="md"
                            background="default"
                        />
                        <Hero
                            title="Large Hero"
                            description="60% of viewport height (60vh)"
                            size="lg"
                            background="secondary"
                        />
                    </div>
                }
                code={`// Small (20vh)
<Hero
  title="Small Hero"
  description="20% of viewport height"
  size="sm"
/>

// Medium (40vh - default)
<Hero
  title="Medium Hero"
  description="40% of viewport height"
  size="md"
/>

// Large (60vh)
<Hero
  title="Large Hero"
  description="60% of viewport height"
  size="lg"
/>

// Extra Large (80vh)
<Hero
  title="Extra Large Hero"
  size="xl"
/>

// Full viewport (100vh)
<Hero
  title="Full Viewport Hero"
  size="full"
/>`}
            />

            <Showcase
                title="Alignments"
                description="Control text alignment within the hero: left (default), center, or right. Alignment affects title, description, and children."
                preview={
                    <div>
                        <Hero
                            title="Left Aligned Hero"
                            description="This is the default alignment. Content flows naturally from the left side."
                            align="left"
                            size="sm"
                            background="secondary"
                        />
                        <Hero
                            title="Center Aligned Hero"
                            description="Centered alignment creates a balanced, symmetrical layout ideal for landing pages."
                            align="center"
                            size="sm"
                            background="default"
                        />
                        <Hero
                            title="Right Aligned Hero"
                            description="Right alignment can create visual interest and works well for specific designs."
                            align="right"
                            size="sm"
                            background="secondary"
                        />
                    </div>
                }
                code={`// Left aligned (default)
<Hero
  title="Left Aligned Hero"
  description="Content flows from the left"
  align="left"
/>

// Center aligned
<Hero
  title="Center Aligned Hero"
  description="Balanced, symmetrical layout"
  align="center"
/>

// Right aligned
<Hero
  title="Right Aligned Hero"
  description="Creates visual interest"
  align="right"
/>`}
            />

            <Showcase
                title="Backgrounds"
                description="The background prop accepts semantic color tokens (default, secondary, tertiary, elevated) that automatically adapt to the VSCode theme."
                preview={
                    <div>
                        <Hero
                            title="Default Background"
                            description="Uses the default editor background color from the theme"
                            background="default"
                            size="sm"
                        />
                        <Hero
                            title="Secondary Background"
                            description="Uses sidebar background - slightly different for visual separation"
                            background="secondary"
                            size="sm"
                        />
                        <Hero
                            title="Tertiary Background"
                            description="Uses panel background - another level of visual hierarchy"
                            background="tertiary"
                            size="sm"
                        />
                        <Hero
                            title="Elevated Background"
                            description="Uses elevated widget background for prominent sections"
                            background="elevated"
                            size="sm"
                        />
                    </div>
                }
                code={`<Hero title="Default" background="default" />
<Hero title="Secondary" background="secondary" />
<Hero title="Tertiary" background="tertiary" />
<Hero title="Elevated" background="elevated" />`}
            />

            <Showcase
                title="With CTA Buttons"
                description="Pass children (typically buttons or links) to create call-to-action sections. Perfect for landing pages and conversion-focused designs."
                preview={
                    <Hero
                        title="Welcome to Baukasten"
                        description="Build beautiful, accessible VSCode webview UIs with our comprehensive React component library. Get started in minutes with our intuitive API and extensive documentation."
                        align="center"
                        size="lg"
                        background="secondary"
                    >
                        <CTAContainer align="center">
                            <Button variant="primary" size="lg">
                                Get Started
                            </Button>
                            <Button variant="secondary" size="lg">
                                View Documentation
                            </Button>
                        </CTAContainer>
                    </Hero>
                }
                code={`<Hero
  title="Welcome to Baukasten"
  description="Build beautiful, accessible VSCode webview UIs"
  align="center"
  size="lg"
  background="secondary"
>
  <div style={{
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
    justifyContent: 'center'
  }}>
    <Button variant="primary" size="lg">
      Get Started
    </Button>
    <Button variant="secondary" size="lg">
      View Documentation
    </Button>
  </div>
</Hero>`}
            />

            <Showcase
                title="Title Only"
                description="Hero component works beautifully with just a title. Omit the description prop for a minimal, focused design."
                preview={
                    <Hero
                        title="Simple. Powerful. Beautiful."
                        align="center"
                        size="md"
                    />
                }
                code={`<Hero
  title="Simple. Powerful. Beautiful."
  align="center"
  size="md"
/>`}
            />

            <Showcase
                title="Section Header Usage"
                description="Hero with size='sm' works well as a section header within your application, providing visual hierarchy and clear content separation."
                preview={
                    <div>
                        <Hero
                            title="Components"
                            description="Explore our comprehensive collection of pre-built components"
                            size="sm"
                            background="default"
                        />
                        <div style={{ padding: 'var(--bk-spacing-6)' }}>
                            <p style={{ color: 'var(--vscode-foreground)' }}>
                                Your content goes here. The hero component works great as a section divider
                                or category header within your application.
                            </p>
                        </div>
                    </div>
                }
                code={`<>
  <Hero
    title="Components"
    description="Explore our collection"
    size="sm"
    background="default"
  />
  <div style={{ padding: '24px' }}>
    <p>Your section content goes here...</p>
  </div>
</>`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Semantic Typography
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Title:</strong> Rendered as <code>&lt;h1&gt;</code> with hero-specific typography tokens
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Description:</strong> Rendered as <code>&lt;p&gt;</code> with hero description styling
                    </li>
                    <li>
                        <strong>Responsive:</strong> Typography automatically scales with design system tokens
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Title uses semantic <code>&lt;h1&gt;</code> element for proper document structure
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Background colors use semantic tokens that respect theme contrast requirements
                    </li>
                    <li>
                        All text maintains proper color contrast ratios across light and dark themes
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Size selection:</strong> Use <code>full</code> or <code>xl</code> for landing pages, <code>md</code> or <code>lg</code> for major sections, <code>sm</code> for section headers
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Alignment:</strong> Use <code>center</code> for landing pages, <code>left</code> for content sections, <code>right</code> sparingly for visual interest
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Background:</strong> Use different backgrounds to create visual hierarchy and separate major sections
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>CTA buttons:</strong> Place primary action first, limit to 1-3 buttons for clarity
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Title length:</strong> Keep titles concise - 3-8 words work best for hero sections
                    </li>
                    <li>
                        <strong>Description:</strong> Use description for context, but keep it brief (1-2 sentences max)
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
