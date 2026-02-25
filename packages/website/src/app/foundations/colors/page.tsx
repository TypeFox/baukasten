'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code, Button } from 'baukasten-ui/core';

interface ColorToken {
  name: string;
  variable: string;
  description: string;
}

const ColorSwatch = ({ variable, name, description }: ColorToken) => (
  <div style={{
    backgroundColor: 'var(--bk-color-surface)',
    border: '1px solid var(--bk-color-border)',
    borderRadius: 'var(--bk-radius-md)',
    padding: 'var(--bk-padding-lg)',
    transition: 'var(--bk-transition-colors)',
  }}>
    <div style={{
      fontFamily: 'var(--bk-font-family-mono)',
      fontSize: 'var(--bk-font-size-sm)',
      fontWeight: 'var(--bk-font-weight-medium)',
      marginBottom: 'var(--bk-spacing-3)',
    }}>
      <Code>{variable}</Code>
    </div>
    <div style={{
      width: '100%',
      height: '80px',
      backgroundColor: `var(${variable})`,
      borderRadius: 'var(--bk-radius-sm)',
      marginBottom: 'var(--bk-spacing-3)',
      border: '1px solid var(--bk-color-border)',
    }} />
    <div style={{
      fontSize: 'var(--bk-font-size-xs)',
      color: 'var(--bk-color-text-secondary)',
    }}>
      {description}
    </div>
  </div>
);

const brandColors: ColorToken[] = [
  { name: 'Primary', variable: '--bk-color-primary', description: 'Primary brand color for main actions' },
  { name: 'Primary Hover', variable: '--bk-color-primary-hover', description: 'Primary hover state' },
  { name: 'Primary Foreground', variable: '--bk-color-primary-foreground', description: 'Text on primary background' },
  { name: 'Secondary', variable: '--bk-color-secondary', description: 'Secondary brand color' },
  { name: 'Secondary Hover', variable: '--bk-color-secondary-hover', description: 'Secondary hover state' },
  { name: 'Secondary Foreground', variable: '--bk-color-secondary-foreground', description: 'Text on secondary background' },
];

const semanticColors: ColorToken[] = [
  { name: 'Success', variable: '--bk-color-success', description: 'Success state and positive actions' },
  { name: 'Success Hover', variable: '--bk-color-success-hover', description: 'Success hover state' },
  { name: 'Warning', variable: '--bk-color-warning', description: 'Warning state and caution' },
  { name: 'Warning Hover', variable: '--bk-color-warning-hover', description: 'Warning hover state' },
  { name: 'Danger', variable: '--bk-color-danger', description: 'Error/danger state' },
  { name: 'Danger Hover', variable: '--bk-color-danger-hover', description: 'Danger hover state' },
  { name: 'Info', variable: '--bk-color-info', description: 'Informational state' },
  { name: 'Info Hover', variable: '--bk-color-info-hover', description: 'Info hover state' },
];

const neutralColors: ColorToken[] = [
  { name: 'Background', variable: '--bk-color-background', description: 'Primary background color' },
  { name: 'Background Secondary', variable: '--bk-color-background-secondary', description: 'Secondary background color' },
  { name: 'Background Tertiary', variable: '--bk-color-background-tertiary', description: 'Tertiary background color' },
  { name: 'Background Elevated', variable: '--bk-color-background-elevated', description: 'Elevated background (widgets)' },
  { name: 'Foreground', variable: '--bk-color-foreground', description: 'Primary text color' },
  { name: 'Foreground Muted', variable: '--bk-color-foreground-muted', description: 'Muted/secondary text' },
  { name: 'Foreground Disabled', variable: '--bk-color-foreground-disabled', description: 'Disabled text color' },
  { name: 'Border', variable: '--bk-color-border', description: 'Default border color' },
  { name: 'Border Focus', variable: '--bk-color-border-focus', description: 'Focus border color' },
  { name: 'Border Hover', variable: '--bk-color-border-hover', description: 'Hover border color' },
];

const interactiveColors: ColorToken[] = [
  { name: 'Hover', variable: '--bk-color-hover', description: 'Hover background color' },
  { name: 'Active', variable: '--bk-color-active', description: 'Active/pressed state' },
  { name: 'Focus', variable: '--bk-color-focus', description: 'Focus indicator color' },
  { name: 'Selected', variable: '--bk-color-selected', description: 'Selected item background' },
  { name: 'Selected Foreground', variable: '--bk-color-selected-foreground', description: 'Selected item text' },
];

export default function ColorsPage() {
  return (
    <PageLayout
      title="Colors"
      description="Semantic color tokens that provide consistent theming across the design system."
    >
      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-md)',
        }}>
          Overview
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
          lineHeight: 'var(--bk-line-height-relaxed)',
        }}>
          All color tokens use CSS variables and automatically map to VSCode theme variables.
          They can be easily customized for web applications or other platforms.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using color tokens in your components
function MyButton({ children }: { children: React.ReactNode }) {
  return (
    <Button style={{
      backgroundColor: 'var(--bk-color-primary)',
      color: 'var(--bk-color-primary-foreground)',
      border: '1px solid var(--bk-color-border)',
    }}>
      {children}
    </Button>
  );
}`}
        />
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Brand Colors
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Primary and secondary colors for your brand identity and main actions.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {brandColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Semantic Colors
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Colors that convey meaning: success, warning, error, and info states.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {semanticColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Neutral Colors
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Background, foreground, and border colors for general UI elements.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {neutralColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Interactive States
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Colors for hover, active, focus, and selected states.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {interactiveColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Customization
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Override any color token by redefining the CSS variable:
        </p>
        <CodeBlock
          language="css"
          code={`:root {
  --bk-color-primary: #007acc;
  --bk-color-primary-hover: #005a9e;
  --bk-color-success: #4caf50;
}`}
        />
      </section>
    </PageLayout>
  );
}

