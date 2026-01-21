'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code, Button } from '@baukasten/ui';

interface ColorToken {
  name: string;
  variable: string;
  description: string;
}

const ColorSwatch = ({ variable, name, description }: ColorToken) => (
  <div style={{
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'var(--padding-lg)',
    transition: 'var(--transition-colors)',
  }}>
    <div style={{
      fontFamily: 'var(--font-family-mono)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      marginBottom: 'var(--spacing-3)',
    }}>
      <Code>{variable}</Code>
    </div>
    <div style={{
      width: '100%',
      height: '80px',
      backgroundColor: `var(${variable})`,
      borderRadius: 'var(--border-radius-sm)',
      marginBottom: 'var(--spacing-3)',
      border: '1px solid var(--color-border)',
    }} />
    <div style={{
      fontSize: 'var(--font-size-xs)',
      color: 'var(--color-text-secondary)',
    }}>
      {description}
    </div>
  </div>
);

const brandColors: ColorToken[] = [
  { name: 'Primary', variable: '--color-primary', description: 'Primary brand color for main actions' },
  { name: 'Primary Hover', variable: '--color-primary-hover', description: 'Primary hover state' },
  { name: 'Primary Foreground', variable: '--color-primary-foreground', description: 'Text on primary background' },
  { name: 'Secondary', variable: '--color-secondary', description: 'Secondary brand color' },
  { name: 'Secondary Hover', variable: '--color-secondary-hover', description: 'Secondary hover state' },
  { name: 'Secondary Foreground', variable: '--color-secondary-foreground', description: 'Text on secondary background' },
];

const semanticColors: ColorToken[] = [
  { name: 'Success', variable: '--color-success', description: 'Success state and positive actions' },
  { name: 'Success Hover', variable: '--color-success-hover', description: 'Success hover state' },
  { name: 'Warning', variable: '--color-warning', description: 'Warning state and caution' },
  { name: 'Warning Hover', variable: '--color-warning-hover', description: 'Warning hover state' },
  { name: 'Danger', variable: '--color-danger', description: 'Error/danger state' },
  { name: 'Danger Hover', variable: '--color-danger-hover', description: 'Danger hover state' },
  { name: 'Info', variable: '--color-info', description: 'Informational state' },
  { name: 'Info Hover', variable: '--color-info-hover', description: 'Info hover state' },
];

const neutralColors: ColorToken[] = [
  { name: 'Background', variable: '--color-background', description: 'Primary background color' },
  { name: 'Background Secondary', variable: '--color-background-secondary', description: 'Secondary background color' },
  { name: 'Background Tertiary', variable: '--color-background-tertiary', description: 'Tertiary background color' },
  { name: 'Background Elevated', variable: '--color-background-elevated', description: 'Elevated background (widgets)' },
  { name: 'Foreground', variable: '--color-foreground', description: 'Primary text color' },
  { name: 'Foreground Muted', variable: '--color-foreground-muted', description: 'Muted/secondary text' },
  { name: 'Foreground Disabled', variable: '--color-foreground-disabled', description: 'Disabled text color' },
  { name: 'Border', variable: '--color-border', description: 'Default border color' },
  { name: 'Border Focus', variable: '--color-border-focus', description: 'Focus border color' },
  { name: 'Border Hover', variable: '--color-border-hover', description: 'Hover border color' },
];

const interactiveColors: ColorToken[] = [
  { name: 'Hover', variable: '--color-hover', description: 'Hover background color' },
  { name: 'Active', variable: '--color-active', description: 'Active/pressed state' },
  { name: 'Focus', variable: '--color-focus', description: 'Focus indicator color' },
  { name: 'Selected', variable: '--color-selected', description: 'Selected item background' },
  { name: 'Selected Foreground', variable: '--color-selected-foreground', description: 'Selected item text' },
];

export default function ColorsPage() {
  return (
    <PageLayout
      title="Colors"
      description="Semantic color tokens that provide consistent theming across the design system."
    >
      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-md)',
        }}>
          Overview
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
          lineHeight: 'var(--line-height-relaxed)',
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
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-primary-foreground)',
      border: '1px solid var(--color-border)',
    }}>
      {children}
    </Button>
  );
}`}
        />
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Brand Colors
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Primary and secondary colors for your brand identity and main actions.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {brandColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Semantic Colors
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Colors that convey meaning: success, warning, error, and info states.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {semanticColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Neutral Colors
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Background, foreground, and border colors for general UI elements.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {neutralColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Interactive States
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Colors for hover, active, focus, and selected states.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {interactiveColors.map(color => (
            <ColorSwatch key={color.variable} {...color} />
          ))}
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Customization
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Override any color token by redefining the CSS variable:
        </p>
        <CodeBlock
          language="css"
          code={`:root {
  --color-primary: #007acc;
  --color-primary-hover: #005a9e;
  --color-success: #4caf50;
}`}
        />
      </section>
    </PageLayout>
  );
}

