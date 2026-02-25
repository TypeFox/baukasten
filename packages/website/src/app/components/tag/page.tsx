'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Tag, Icon } from 'baukasten-ui/core';

const tagProps: PropDefinition[] = [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Content to display in the tag' },
    { name: 'variant', type: '"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Visual variant of the tag' },
    { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size of the tag' },
    { name: 'outline', type: 'boolean', default: 'false', description: 'Whether to render the tag with an outline style' },
];

export default function TagPage() {
    return (
        <PageLayout
            title="Tag"
            description="A categorization and labeling component with a rounded-rectangle shape. Use Tag for categorization, filtering, and content labeling. For status indication, use Badge instead."
        >
            <Showcase
                title="Basic Usage"
                description="The default tag with neutral styling."
                preview={<Tag>Default Tag</Tag>}
                code={`import { Tag } from 'baukasten-ui/core';

function App() {
  return <Tag>Default Tag</Tag>;
}`}
            />

            <Showcase
                title="Variants"
                description="Seven semantic variants for different contexts. Includes primary and secondary in addition to the status colors."
                preview={
                    <VariantGrid>
                        <Variant label="Default"><Tag variant="default">Default</Tag></Variant>
                        <Variant label="Primary"><Tag variant="primary">Primary</Tag></Variant>
                        <Variant label="Secondary"><Tag variant="secondary">Secondary</Tag></Variant>
                        <Variant label="Success"><Tag variant="success">Success</Tag></Variant>
                        <Variant label="Warning"><Tag variant="warning">Warning</Tag></Variant>
                        <Variant label="Error"><Tag variant="error">Error</Tag></Variant>
                        <Variant label="Info"><Tag variant="info">Info</Tag></Variant>
                    </VariantGrid>
                }
                code={`<Tag variant="default">Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="info">Info</Tag>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options from extra small to extra large."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Tag size="xs">Extra Small</Tag>
                        <Tag size="sm">Small</Tag>
                        <Tag size="md">Medium</Tag>
                        <Tag size="lg">Large</Tag>
                        <Tag size="xl">Extra Large</Tag>
                    </div>
                }
                code={`<Tag size="xs">Extra Small</Tag>
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>
<Tag size="xl">Extra Large</Tag>`}
            />

            <Showcase
                title="Outline Style"
                description="Transparent backgrounds with colored borders for a lighter visual weight."
                preview={
                    <VariantGrid>
                        <Variant label="Default Outline"><Tag variant="default" outline>Default</Tag></Variant>
                        <Variant label="Primary Outline"><Tag variant="primary" outline>Primary</Tag></Variant>
                        <Variant label="Secondary Outline"><Tag variant="secondary" outline>Secondary</Tag></Variant>
                        <Variant label="Success Outline"><Tag variant="success" outline>Success</Tag></Variant>
                        <Variant label="Warning Outline"><Tag variant="warning" outline>Warning</Tag></Variant>
                        <Variant label="Error Outline"><Tag variant="error" outline>Error</Tag></Variant>
                        <Variant label="Info Outline"><Tag variant="info" outline>Info</Tag></Variant>
                    </VariantGrid>
                }
                code={`<Tag variant="default" outline>Default</Tag>
<Tag variant="primary" outline>Primary</Tag>
<Tag variant="secondary" outline>Secondary</Tag>
<Tag variant="success" outline>Success</Tag>
<Tag variant="warning" outline>Warning</Tag>
<Tag variant="error" outline>Error</Tag>
<Tag variant="info" outline>Info</Tag>`}
            />

            <Showcase
                title="With Icons"
                description="Tags support icons for enhanced visual communication. Icons automatically scale with tag size."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap' }}>
                            <Tag variant="primary"><Icon name="symbol-class" /> React</Tag>
                            <Tag variant="info"><Icon name="code" /> TypeScript</Tag>
                            <Tag variant="success"><Icon name="check" /> Approved</Tag>
                            <Tag variant="warning"><Icon name="warning" /> Draft</Tag>
                            <Tag variant="error"><Icon name="error" /> Deprecated</Tag>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Tag variant="primary" size="xs"><Icon name="tag" /> XS</Tag>
                            <Tag variant="primary" size="sm"><Icon name="tag" /> SM</Tag>
                            <Tag variant="primary" size="md"><Icon name="tag" /> MD</Tag>
                            <Tag variant="primary" size="lg"><Icon name="tag" /> LG</Tag>
                            <Tag variant="primary" size="xl"><Icon name="tag" /> XL</Tag>
                        </div>
                    </div>
                }
                code={`<Tag variant="primary">
  <Icon name="symbol-class" />
  React
</Tag>

<Tag variant="info">
  <Icon name="code" />
  TypeScript
</Tag>

// Icons scale with tag size
<Tag variant="primary" size="lg">
  <Icon name="tag" />
  Large Tag
</Tag>`}
            />

            <Showcase
                title="Technology Stack"
                description="Common pattern for displaying technology tags."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', flexWrap: 'wrap' }}>
                        <Tag variant="primary" size="sm">React</Tag>
                        <Tag variant="primary" size="sm">TypeScript</Tag>
                        <Tag variant="primary" size="sm">Vite</Tag>
                        <Tag variant="primary" size="sm">vanilla-extract</Tag>
                        <Tag variant="primary" size="sm">Storybook</Tag>
                    </div>
                }
                code={`<Tag variant="primary" size="sm">React</Tag>
<Tag variant="primary" size="sm">TypeScript</Tag>
<Tag variant="primary" size="sm">Vite</Tag>
<Tag variant="primary" size="sm">vanilla-extract</Tag>`}
            />

            <Showcase
                title="Content Categories"
                description="Use default tags for categorizing content."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', flexWrap: 'wrap' }}>
                        <Tag variant="default" size="sm">Design System</Tag>
                        <Tag variant="default" size="sm">UI Components</Tag>
                        <Tag variant="default" size="sm">Open Source</Tag>
                        <Tag variant="default" size="sm">VSCode</Tag>
                        <Tag variant="default" size="sm">Eclipse Theia</Tag>
                    </div>
                }
                code={`<Tag variant="default" size="sm">Design System</Tag>
<Tag variant="default" size="sm">UI Components</Tag>
<Tag variant="default" size="sm">Open Source</Tag>
<Tag variant="default" size="sm">VSCode</Tag>`}
            />

            <Showcase
                title="Version & Priority Labels"
                description="Combine variants and icons for version and priority labeling."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Tag variant="success" size="sm">v2.0.0</Tag>
                            <Tag variant="info" size="sm" outline>stable</Tag>
                            <Tag variant="warning" size="sm" outline>beta</Tag>
                            <Tag variant="error" size="sm" outline>deprecated</Tag>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Tag variant="error"><Icon name="flame" /> Critical</Tag>
                            <Tag variant="warning"><Icon name="arrow-up" /> High</Tag>
                            <Tag variant="info"><Icon name="dash" /> Medium</Tag>
                            <Tag variant="secondary"><Icon name="arrow-down" /> Low</Tag>
                        </div>
                    </div>
                }
                code={`// Version labels
<Tag variant="success" size="sm">v2.0.0</Tag>
<Tag variant="info" size="sm" outline>stable</Tag>
<Tag variant="warning" size="sm" outline>beta</Tag>
<Tag variant="error" size="sm" outline>deprecated</Tag>

// Priority labels
<Tag variant="error"><Icon name="flame" /> Critical</Tag>
<Tag variant="warning"><Icon name="arrow-up" /> High</Tag>
<Tag variant="info"><Icon name="dash" /> Medium</Tag>
<Tag variant="secondary"><Icon name="arrow-down" /> Low</Tag>`}
            />

            <Showcase
                title="Mixed Combinations"
                description="Combine variants, sizes, and outline styles for different use cases."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Tag variant="primary" size="xs">XS Primary</Tag>
                        <Tag variant="warning" size="sm" outline>SM Warning</Tag>
                        <Tag variant="error" size="md"><Icon name="bug" /> MD Error</Tag>
                        <Tag variant="info" size="lg" outline><Icon name="info" /> LG Info</Tag>
                        <Tag variant="secondary" size="xl">XL Secondary</Tag>
                    </div>
                }
                code={`<Tag variant="primary" size="xs">XS Primary</Tag>
<Tag variant="warning" size="sm" outline>SM Warning</Tag>
<Tag variant="error" size="md">
  <Icon name="bug" />
  MD Error
</Tag>
<Tag variant="info" size="lg" outline>
  <Icon name="info" />
  LG Info
</Tag>`}
                props={tagProps}
            />
        </PageLayout>
    );
}
