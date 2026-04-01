'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Badge, Icon } from 'baukasten-ui/core';

const badgeProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Content to display in the badge',
  },
  {
    name: 'variant',
    type: '"default" | "success" | "warning" | "error" | "info"',
    default: '"default"',
    description: 'Visual variant of the badge',
  },
  {
    name: 'size',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'Size of the badge',
  },
  {
    name: 'outline',
    type: 'boolean',
    default: 'false',
    description: 'Whether to render the badge with an outline style',
  },
];

export default function BadgePage() {
  return (
    <PageLayout
      title="Badge"
      description="A small status indicator or label component with multiple variants and sizes."
    >
      <Showcase
        title="Basic Usage"
        description="The default badge with neutral styling."
        preview={
          <Badge>Default Badge</Badge>
        }
        code={`import { Badge } from 'baukasten-ui/core';

function App() {
  return <Badge>Default Badge</Badge>;
}`}
      />

      <Showcase
        title="Variants"
        description="Five semantic variants for different states and contexts."
        preview={
          <VariantGrid>
            <Variant label="Default">
              <Badge variant="default">Default</Badge>
            </Variant>
            <Variant label="Success">
              <Badge variant="success">Success</Badge>
            </Variant>
            <Variant label="Warning">
              <Badge variant="warning">Warning</Badge>
            </Variant>
            <Variant label="Error">
              <Badge variant="error">Error</Badge>
            </Variant>
            <Variant label="Info">
              <Badge variant="info">Info</Badge>
            </Variant>
          </VariantGrid>
        }
        code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}
      />

      <Showcase
        title="Sizes"
        description="Five size options from extra small to extra large."
        preview={
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)', alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="xl">Extra Large</Badge>
          </div>
        }
        code={`<Badge size="xs">Extra Small</Badge>
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
<Badge size="xl">Extra Large</Badge>`}
      />

      <Showcase
        title="Outline Style"
        description="Transparent backgrounds with colored borders for a lighter visual weight."
        preview={
          <VariantGrid>
            <Variant label="Default Outline">
              <Badge variant="default" outline>Default</Badge>
            </Variant>
            <Variant label="Success Outline">
              <Badge variant="success" outline>Success</Badge>
            </Variant>
            <Variant label="Warning Outline">
              <Badge variant="warning" outline>Warning</Badge>
            </Variant>
            <Variant label="Error Outline">
              <Badge variant="error" outline>Error</Badge>
            </Variant>
            <Variant label="Info Outline">
              <Badge variant="info" outline>Info</Badge>
            </Variant>
          </VariantGrid>
        }
        code={`<Badge variant="default" outline>Default</Badge>
<Badge variant="success" outline>Success</Badge>
<Badge variant="warning" outline>Warning</Badge>
<Badge variant="error" outline>Error</Badge>
<Badge variant="info" outline>Info</Badge>`}
      />

      <Showcase
        title="With Icons"
        description="Badges support icons for enhanced visual communication. Icons automatically scale with badge size."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap' }}>
              <Badge variant="success">
                <Icon name="check" />
                Completed
              </Badge>
              <Badge variant="warning">
                <Icon name="warning" />
                Pending
              </Badge>
              <Badge variant="error">
                <Icon name="close" />
                Failed
              </Badge>
              <Badge variant="info">
                <Icon name="info" />
                Info
              </Badge>
            </div>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="success" size="xs">
                <Icon name="check" />
                XS
              </Badge>
              <Badge variant="success" size="sm">
                <Icon name="check" />
                SM
              </Badge>
              <Badge variant="success" size="md">
                <Icon name="check" />
                MD
              </Badge>
              <Badge variant="success" size="lg">
                <Icon name="check" />
                LG
              </Badge>
              <Badge variant="success" size="xl">
                <Icon name="check" />
                XL
              </Badge>
            </div>
          </div>
        }
        code={`<Badge variant="success">
  <Icon name="check" />
  Completed
</Badge>

<Badge variant="warning">
  <Icon name="warning" />
  Pending
</Badge>

// Icons scale with badge size
<Badge variant="success" size="lg">
  <Icon name="check" />
  Large Badge
</Badge>`}
      />

      <Showcase
        title="Icon Only"
        description="Badges can contain only icons for compact displays."
        preview={
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="success">
              <Icon name="check" />
            </Badge>
            <Badge variant="error">
              <Icon name="close" />
            </Badge>
            <Badge variant="info">
              <Icon name="info" />
            </Badge>
            <Badge variant="warning">
              <Icon name="warning" />
            </Badge>
          </div>
        }
        code={`<Badge variant="success">
  <Icon name="check" />
</Badge>

<Badge variant="error">
  <Icon name="close" />
</Badge>`}
      />

      <Showcase
        title="Status Indicators"
        description="Common pattern for displaying status information."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)', minWidth: '120px' }}>Build Status:</span>
              <Badge variant="success">Passing</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)', minWidth: '120px' }}>Deployment:</span>
              <Badge variant="warning">In Progress</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)', minWidth: '120px' }}>API Status:</span>
              <Badge variant="error">Offline</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)', minWidth: '120px' }}>Coverage:</span>
              <Badge variant="info">85%</Badge>
            </div>
          </div>
        }
        code={`<div>
  <span>Build Status:</span>
  <Badge variant="success">Passing</Badge>
</div>

<div>
  <span>Deployment:</span>
  <Badge variant="warning">In Progress</Badge>
</div>`}
      />

      <Showcase
        title="Counters & Notifications"
        description="Use badges as notification counters or numeric indicators."
        preview={
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Notifications</span>
              <Badge variant="error" size="sm">12</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Inbox</span>
              <Badge variant="info" size="sm">42</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Tasks</span>
              <Badge variant="success" size="sm">8</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
              <span style={{ fontSize: 'var(--bk-font-size-md)' }}>Issues</span>
              <Badge variant="warning" size="sm">3</Badge>
            </div>
          </div>
        }
        code={`<div>
  <span>Notifications</span>
  <Badge variant="error" size="sm">12</Badge>
</div>

<div>
  <span>Inbox</span>
  <Badge variant="info" size="sm">42</Badge>
</div>`}
      />

      <Showcase
        title="Single Character Badges"
        description="Badges with single digits or letters render as circles, perfect for compact counters and indicators."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="error" size="xs">5</Badge>
              <Badge variant="error" size="sm">5</Badge>
              <Badge variant="error" size="md">5</Badge>
              <Badge variant="error" size="lg">5</Badge>
              <Badge variant="error" size="xl">5</Badge>
            </div>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="info">A</Badge>
              <Badge variant="success">B</Badge>
              <Badge variant="warning">C</Badge>
              <Badge variant="error">1</Badge>
              <Badge variant="default">2</Badge>
            </div>
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="info" outline>A</Badge>
              <Badge variant="success" outline>B</Badge>
              <Badge variant="warning" outline>C</Badge>
              <Badge variant="error" outline>1</Badge>
              <Badge variant="default" outline>2</Badge>
            </div>
          </div>
        }
        code={`// Single digits at different sizes
<Badge variant="error" size="xs">5</Badge>
<Badge variant="error" size="sm">5</Badge>
<Badge variant="error" size="md">5</Badge>
<Badge variant="error" size="lg">5</Badge>
<Badge variant="error" size="xl">5</Badge>

// Single letters with different variants
<Badge variant="info">A</Badge>
<Badge variant="success">B</Badge>
<Badge variant="warning">C</Badge>

// Single character outline style
<Badge variant="info" outline>A</Badge>
<Badge variant="success" outline>B</Badge>`}
      />

      <Showcase
        title="Tags & Labels"
        description="Use default badges as content tags or category labels."
        preview={
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', flexWrap: 'wrap' }}>
            <Badge variant="default" size="sm">TypeScript</Badge>
            <Badge variant="default" size="sm">React</Badge>
            <Badge variant="default" size="sm">Design System</Badge>
            <Badge variant="default" size="sm">UI Components</Badge>
            <Badge variant="default" size="sm">VSCode</Badge>
            <Badge variant="default" size="sm">Open Source</Badge>
          </div>
        }
        code={`<Badge variant="default" size="sm">TypeScript</Badge>
<Badge variant="default" size="sm">React</Badge>
<Badge variant="default" size="sm">Design System</Badge>
<Badge variant="default" size="sm">UI Components</Badge>`}
      />

      <Showcase
        title="Mixed Combinations"
        description="Combine variants, sizes, and outline styles for different use cases."
        preview={
          <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="success" size="xs">XS Success</Badge>
            <Badge variant="warning" size="sm" outline>SM Warning</Badge>
            <Badge variant="error" size="md">
              <Icon name="bug" />
              MD Error
            </Badge>
            <Badge variant="info" size="lg" outline>
              <Icon name="info" />
              LG Info
            </Badge>
            <Badge variant="default" size="xl">XL Default</Badge>
          </div>
        }
        code={`<Badge variant="success" size="xs">XS Success</Badge>
<Badge variant="warning" size="sm" outline>SM Warning</Badge>
<Badge variant="error" size="md">
  <Icon name="bug" />
  MD Error
</Badge>
<Badge variant="info" size="lg" outline>
  <Icon name="info" />
  LG Info
</Badge>`}
        props={badgeProps}
      />
    </PageLayout>
  );
}



