'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Button } from '@baukasten/ui';

const buttonProps: PropDefinition[] = [
  {
    name: 'variant',
    type: '"primary" | "secondary" | "ghost" | "link"',
    default: '"primary"',
    description: 'Visual style variant of the button',
  },
  {
    name: 'size',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'Size of the button',
  },
  {
    name: 'width',
    type: '"block" | "wide"',
    default: 'undefined',
    description: 'Width behavior: block (100%), wide (120px min), or auto (default)',
  },
  {
    name: 'outline',
    type: 'boolean',
    default: 'false',
    description: 'Whether to render with outline style (inverted colors)',
  },
  {
    name: 'circular',
    type: 'boolean',
    default: 'false',
    description: 'Whether to render as a circle (useful for icon-only buttons)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button is disabled',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The content of the button',
  },
  {
    name: 'onClick',
    type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
    description: 'Click event handler',
  },
];

export default function ButtonPage() {
  return (
    <PageLayout
      title="Button"
      description="A versatile button component with multiple variants and sizes for various use cases."
    >
      <Showcase
        title="Basic Usage"
        description="The default button with primary variant."
        preview={<Button>Click me</Button>}
        code={`import { Button } from '@baukasten/ui';

function App() {
  return <Button>Click me</Button>;
}`}
      />

      <Showcase
        title="Variants"
        description="Buttons come in four variants: primary, secondary, ghost, and link."
        preview={
          <VariantGrid>
            <Variant label="Primary">
              <Button variant="primary">Primary</Button>
            </Variant>
            <Variant label="Secondary">
              <Button variant="secondary">Secondary</Button>
            </Variant>
            <Variant label="Ghost">
              <Button variant="ghost">Ghost</Button>
            </Variant>
            <Variant label="Link">
              <Button variant="link">Link</Button>
            </Variant>
          </VariantGrid>
        }
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
      />

      <Showcase
        title="Sizes"
        description="Five size options from extra small to extra large."
        preview={
          <VariantGrid>
            <Variant label="Extra Small">
              <Button size="xs">XS</Button>
            </Variant>
            <Variant label="Small">
              <Button size="sm">SM</Button>
            </Variant>
            <Variant label="Medium">
              <Button size="md">MD</Button>
            </Variant>
            <Variant label="Large">
              <Button size="lg">LG</Button>
            </Variant>
            <Variant label="Extra Large">
              <Button size="xl">XL</Button>
            </Variant>
          </VariantGrid>
        }
        code={`<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>`}
      />

      <Showcase
        title="Disabled State"
        description="Buttons can be disabled to prevent interaction."
        preview={
          <VariantGrid>
            <Variant label="Primary Disabled">
              <Button variant="primary" disabled>Disabled</Button>
            </Variant>
            <Variant label="Secondary Disabled">
              <Button variant="secondary" disabled>Disabled</Button>
            </Variant>
          </VariantGrid>
        }
        code={`<Button variant="primary" disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>`}
      />

      <Showcase
        title="Outline Style"
        description="Buttons can be rendered with an outline style, featuring transparent backgrounds with colored borders."
        preview={
          <VariantGrid>
            <Variant label="Primary Outline">
              <Button variant="primary" outline>Primary</Button>
            </Variant>
            <Variant label="Secondary Outline">
              <Button variant="secondary" outline>Secondary</Button>
            </Variant>
            <Variant label="Ghost Outline">
              <Button variant="ghost" outline>Ghost</Button>
            </Variant>
          </VariantGrid>
        }
        code={`<Button variant="primary" outline>Primary</Button>
<Button variant="secondary" outline>Secondary</Button>
<Button variant="ghost" outline>Ghost</Button>`}
      />

      <Showcase
        title="Circular Buttons"
        description="Circular buttons are perfect for icon-only actions. They maintain a 1:1 aspect ratio."
        preview={
          <VariantGrid>
            <Variant label="Primary Circular">
              <Button variant="primary" circular>+</Button>
            </Variant>
            <Variant label="Secondary Circular">
              <Button variant="secondary" circular>×</Button>
            </Variant>
            <Variant label="Ghost Circular">
              <Button variant="ghost" circular>?</Button>
            </Variant>
            <Variant label="Outline Circular">
              <Button variant="primary" circular outline>!</Button>
            </Variant>
          </VariantGrid>
        }
        code={`<Button variant="primary" circular>+</Button>
<Button variant="secondary" circular>×</Button>
<Button variant="ghost" circular>?</Button>
<Button variant="primary" circular outline>!</Button>`}
      />

      <Showcase
        title="Width Options"
        description="Control button width with block (100%), wide (minimum width), or auto (default)."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
            <Button width="block">Block Width (100%)</Button>
            <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
              <Button width="wide">Wide Button</Button>
              <Button>Auto Width</Button>
            </div>
          </div>
        }
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
  <Button width="block">Block Width (100%)</Button>
  <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
    <Button width="wide">Wide Button</Button>
    <Button>Auto Width</Button>
  </div>
</div>`}
        props={buttonProps}
      />
    </PageLayout>
  );
}
