import type { Meta, StoryObj } from '@storybook/react';

// Story-specific styles using a style tag
const storyStyles = `
  .ds-container { font-family: var(--font-family-sans); color: var(--color-foreground); padding: var(--spacing-4); }
  .ds-section { margin-bottom: var(--spacing-8); }
  .ds-section-title { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-4); color: var(--color-foreground); border-bottom: var(--border-width-2) solid var(--color-divider); padding-bottom: var(--spacing-2); }
  .ds-subsection-title { font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); margin-top: var(--spacing-6); margin-bottom: var(--spacing-3); color: var(--color-foreground); }
  .ds-description { font-size: var(--font-size-md); color: var(--color-foreground-muted); margin-bottom: var(--spacing-4); line-height: var(--line-height-relaxed); }
  .ds-grid { display: grid; gap: var(--spacing-4); margin-bottom: var(--spacing-4); }
  .ds-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .ds-grid-4 { grid-template-columns: repeat(4, 1fr); }
  .ds-grid-2 { grid-template-columns: repeat(2, 1fr); }
  .ds-grid-1 { grid-template-columns: repeat(1, 1fr); }
  .ds-token-card { padding: var(--spacing-3); border: var(--border-width-1) solid var(--color-border); border-radius: var(--radius-md); background-color: var(--color-background-secondary); transition: var(--transition-colors); }
  .ds-token-card:hover { border-color: var(--color-border-hover); background-color: var(--color-hover); }
  .ds-token-name { font-family: var(--font-family-mono); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-foreground); margin-bottom: var(--spacing-1); }
  .ds-token-value { font-family: var(--font-family-mono); font-size: var(--font-size-xs); color: var(--color-foreground-muted); }
  .ds-color-swatch { width: 100%; height: 60px; border-radius: var(--radius-sm); margin-bottom: var(--spacing-2); border: var(--border-width-1) solid var(--color-border); }
  .ds-spacing-box { background-color: var(--color-primary); opacity: var(--opacity-80); border-radius: var(--radius-sm); }
  .ds-gap-demo { display: flex; }
  .ds-gap-item { width: 40px; height: 40px; background-color: var(--color-primary); border-radius: var(--radius-sm); flex-shrink: 0; }
  .ds-padding-demo { background-color: var(--color-background-secondary); border: var(--border-width-1) solid var(--color-border); border-radius: var(--radius-sm); display: inline-block; }
  .ds-padding-inner { background-color: var(--color-primary); color: var(--color-primary-foreground); padding: var(--spacing-2); border-radius: var(--radius-sm); font-size: var(--font-size-xs); text-align: center; }
  .ds-text-sample { color: var(--color-foreground); margin-bottom: var(--spacing-2); }
  .ds-shadow-box { width: 100%; height: 80px; background-color: var(--color-background-elevated); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--color-foreground); font-size: var(--font-size-sm); }
  .ds-code { font-family: var(--font-family-mono); background-color: var(--color-background-secondary); padding: var(--spacing-0-5) var(--spacing-1); border-radius: var(--radius-sm); font-size: var(--font-size-sm); color: var(--color-primary); }
`;

/**
 * Design System Documentation
 * 
 * This story documents all design tokens available in the Baukasten design system.
 * These tokens are platform-agnostic and use CSS variables that can be customized.
 * 
 * By default, they map to VSCode theme variables, but can be easily overridden
 * for web applications or other platforms.
 */
const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Design System Tokens

The Baukasten design system provides a comprehensive set of design tokens organized into four categories:

1. **Colors** - Semantic color system for consistent theming
2. **Spacing** - Spacing scale, gaps, and component sizes  
3. **Typography** - Font sizes, weights, line heights, and families
4. **Effects** - Shadows, borders, transitions, opacity, and z-index

All tokens use CSS variables and are automatically injected when you include \`<GlobalStyles />\` in your app.

## Usage

\`\`\`tsx
import { GlobalStyles } from 'baukasten';

function App() {
  return (
    <>
      <GlobalStyles />
      <YourApp />
    </>
  );
}
\`\`\`

Then use tokens in your components with CSS:

\`\`\`tsx
// Using inline styles
const Button = ({ children }: { children: React.ReactNode }) => (
  <button style={{
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-foreground)',
    padding: 'var(--padding-md)',
    fontSize: 'var(--font-size-base)',
    borderRadius: 'var(--radius-md)',
    transition: 'var(--transition-colors)'
  }}>
    {children}
  </button>
);

// Or using CSS classes
const styles = \`
  .button {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    padding: var(--padding-md);
    font-size: var(--font-size-base);
    border-radius: var(--radius-md);
    transition: var(--transition-colors);
  }
  
  .button:hover {
    background-color: var(--color-primary-hover);
  }
\`;
\`\`\`

## Customization

Override any token by redefining the CSS variable:

\`\`\`css
:root {
  --color-primary: #007acc;
  --color-primary-hover: #005a9e;
  --spacing-4: 1.5rem; /* Increase base spacing */
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Functional components replacing styled components
const Container = ({ children }: { children: React.ReactNode }) => <div className="ds-container">{children}</div>;
const Section = ({ children }: { children: React.ReactNode }) => <div className="ds-section">{children}</div>;
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 className="ds-section-title">{children}</h2>;
const SubsectionTitle = ({ children }: { children: React.ReactNode }) => <h3 className="ds-subsection-title">{children}</h3>;
const Description = ({ children }: { children: React.ReactNode }) => <p className="ds-description">{children}</p>;
const Grid = ({ columns, children }: { columns?: number; children: React.ReactNode }) => (
  <div className={`ds-grid ds-grid-${columns || 3}`}>{children}</div>
);
const TokenCard = ({ children }: { children: React.ReactNode }) => <div className="ds-token-card">{children}</div>;
const TokenName = ({ children }: { children: React.ReactNode }) => <div className="ds-token-name">{children}</div>;
const TokenValue = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div className="ds-token-value" style={style}>{children}</div>;
const ColorSwatch = ({ color }: { color: string }) => <div className="ds-color-swatch" style={{ backgroundColor: color }} />;
const SpacingBox = ({ size }: { size: string }) => <div className="ds-spacing-box" style={{ width: size, height: size }} />;
const GapDemo = ({ gap, children }: { gap: string; children: React.ReactNode }) => <div className="ds-gap-demo" style={{ gap }}>{children}</div>;
const GapItem = () => <div className="ds-gap-item" />;
const PaddingDemo = ({ padding, children }: { padding: string; children: React.ReactNode }) => <div className="ds-padding-demo" style={{ padding }}>{children}</div>;
const PaddingInner = ({ children }: { children: React.ReactNode }) => <div className="ds-padding-inner">{children}</div>;
const TextSample = ({ size, weight, children }: { size: string; weight?: string; children: React.ReactNode }) => (
  <div className="ds-text-sample" style={{ fontSize: size, fontWeight: weight || 'var(--font-weight-normal)' }}>{children}</div>
);
const ShadowBox = ({ shadow, children }: { shadow: string; children: React.ReactNode }) => (
  <div className="ds-shadow-box" style={{ boxShadow: shadow }}>{children}</div>
);
const Code = ({ children }: { children: React.ReactNode }) => <code className="ds-code">{children}</code>;

// Color tokens grouped by category
const colorTokens = {
  brand: [
    { name: '--color-primary', description: 'Primary brand color' },
    { name: '--color-primary-hover', description: 'Primary hover state' },
    { name: '--color-primary-foreground', description: 'Text on primary' },
    { name: '--color-secondary', description: 'Secondary brand color' },
    { name: '--color-secondary-hover', description: 'Secondary hover state' },
    { name: '--color-secondary-foreground', description: 'Text on secondary' },
  ],
  semantic: [
    { name: '--color-success', description: 'Success state' },
    { name: '--color-warning', description: 'Warning state' },
    { name: '--color-danger', description: 'Error/danger state' },
    { name: '--color-info', description: 'Info state' },
  ],
  neutral: [
    { name: '--color-background', description: 'Primary background' },
    { name: '--color-background-secondary', description: 'Secondary background' },
    { name: '--color-foreground', description: 'Primary text' },
    { name: '--color-foreground-muted', description: 'Muted text' },
    { name: '--color-border', description: 'Border color' },
    { name: '--color-border-focus', description: 'Focus border' },
  ],
  interactive: [
    { name: '--color-hover', description: 'Hover background' },
    { name: '--color-active', description: 'Active background' },
    { name: '--color-focus', description: 'Focus indicator' },
    { name: '--color-selected', description: 'Selected background' },
  ],
};

const spacingTokens = [
  { name: '--spacing-0', value: '0' },
  { name: '--spacing-1', value: '4px' },
  { name: '--spacing-2', value: '8px' },
  { name: '--spacing-3', value: '12px' },
  { name: '--spacing-4', value: '16px' },
  { name: '--spacing-6', value: '24px' },
  { name: '--spacing-8', value: '32px' },
  { name: '--spacing-12', value: '48px' },
];

const gapTokens = [
  { name: '--gap-xs', value: '4px' },
  { name: '--gap-sm', value: '6px' },
  { name: '--gap-md', value: '8px' },
  { name: '--gap-lg', value: '12px' },
  { name: '--gap-xl', value: '16px' },
];

const paddingTokens = [
  { name: '--padding-xs', value: '2px 8px' },
  { name: '--padding-sm', value: '4px 10px' },
  { name: '--padding-md', value: '6px 14px' },
  { name: '--padding-lg', value: '8px 16px' },
  { name: '--padding-xl', value: '10px 20px' },
];

const typographyTokens = {
  sizes: [
    { name: '--font-size-xs', value: '11px', sample: 'The quick brown fox' },
    { name: '--font-size-sm', value: '12px', sample: 'The quick brown fox' },
    { name: '--font-size-md', value: '13px', sample: 'The quick brown fox' },
    { name: '--font-size-base', value: '14px', sample: 'The quick brown fox' },
    { name: '--font-size-lg', value: '16px', sample: 'The quick brown fox' },
    { name: '--font-size-xl', value: '18px', sample: 'The quick brown fox' },
    { name: '--font-size-2xl', value: '20px', sample: 'The quick brown fox' },
  ],
  weights: [
    { name: '--font-weight-light', value: '300' },
    { name: '--font-weight-normal', value: '400' },
    { name: '--font-weight-medium', value: '500' },
    { name: '--font-weight-semibold', value: '600' },
    { name: '--font-weight-bold', value: '700' },
  ],
};

const effectsTokens = {
  radius: [
    { name: '--radius-sm', value: '2px' },
    { name: '--radius-md', value: '4px' },
    { name: '--radius-lg', value: '6px' },
    { name: '--radius-xl', value: '8px' },
  ],
  shadows: [
    { name: '--shadow-sm', description: 'Small shadow' },
    { name: '--shadow-base', description: 'Base shadow' },
    { name: '--shadow-md', description: 'Medium shadow' },
    { name: '--shadow-lg', description: 'Large shadow' },
  ],
};

/**
 * Colors
 * 
 * Semantic color tokens that provide platform-agnostic theming.
 * By default, they map to VSCode theme variables but can be customized.
 */
export const Colors: Story = {
  render: () => (
    <>
      <style>{storyStyles}</style>
      <Container>
        <Section>
          <SectionTitle>Colors</SectionTitle>
          <Description>
            Semantic color tokens provide consistent theming across the design system.
            All colors are defined as CSS variables and can be customized.
          </Description>

          <SubsectionTitle>Brand Colors</SubsectionTitle>
          <Description>Primary and secondary colors for your brand identity.</Description>
          <Grid columns={3}>
            {colorTokens.brand.map(token => (
              <TokenCard key={token.name}>
                <ColorSwatch color={`var(${token.name})`} />
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.description}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Semantic Colors</SubsectionTitle>
          <Description>Colors that convey meaning (success, warning, error, info).</Description>
          <Grid columns={4}>
            {colorTokens.semantic.map(token => (
              <TokenCard key={token.name}>
                <ColorSwatch color={`var(${token.name})`} />
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.description}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Neutral Colors</SubsectionTitle>
          <Description>Background, foreground, and border colors.</Description>
          <Grid columns={3}>
            {colorTokens.neutral.map(token => (
              <TokenCard key={token.name}>
                <ColorSwatch color={`var(${token.name})`} />
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.description}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Interactive States</SubsectionTitle>
          <Description>Colors for hover, active, and focus states.</Description>
          <Grid columns={4}>
            {colorTokens.interactive.map(token => (
              <TokenCard key={token.name}>
                <ColorSwatch color={`var(${token.name})`} />
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.description}</TokenValue>
              </TokenCard>
            ))}
          </Grid>
        </Section>
      </Container>
    </>
  ),
};

/**
 * Spacing
 * 
 * Spacing scale and component sizing tokens based on a 4px grid.
 */
export const Spacing: Story = {
  render: () => (
    <>
      <style>{storyStyles}</style>
      <Container>
        <Section>
          <SectionTitle>Spacing</SectionTitle>
          <Description>
            Consistent spacing scale based on a 4px base unit. Use these tokens for
            padding, margin, gaps, and component sizes.
          </Description>

          <SubsectionTitle>Spacing Scale</SubsectionTitle>
          <Grid columns={4}>
            {spacingTokens.map(token => (
              <TokenCard key={token.name}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                  <SpacingBox size={`var(${token.name})`} />
                </div>
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.value}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Gap Tokens</SubsectionTitle>
          <Description>
            Gap spacing used between flex/grid items. Visual demonstration shows spacing between elements.
          </Description>
          <Grid columns={3}>
            {gapTokens.map(token => (
              <TokenCard key={token.name}>
                <GapDemo gap={`var(${token.name})`}>
                  <GapItem />
                  <GapItem />
                  <GapItem />
                </GapDemo>
                <div style={{ marginTop: 'var(--spacing-2)' }}>
                  <TokenName>{token.name}</TokenName>
                  <TokenValue>{token.value}</TokenValue>
                </div>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Padding Tokens</SubsectionTitle>
          <Description>
            Padding for components. Visual demonstration shows padding around content (outer gray box is padding space).
          </Description>
          <Grid columns={3}>
            {paddingTokens.map(token => (
              <TokenCard key={token.name}>
                <PaddingDemo padding={`var(${token.name})`}>
                  <PaddingInner>Content</PaddingInner>
                </PaddingDemo>
                <div style={{ marginTop: 'var(--spacing-2)' }}>
                  <TokenName>{token.name}</TokenName>
                  <TokenValue>{token.value}</TokenValue>
                </div>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Component Sizes</SubsectionTitle>
          <Description>
            Heights for interactive elements like buttons and inputs.
          </Description>
          <Grid columns={2}>
            <TokenCard>
              <TokenName>Regular Sizes</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--size-xs</Code> (20px) through <Code>--size-xl</Code> (36px)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Circular Sizes</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--size-circular-xs</Code> (24px) through <Code>--size-circular-xl</Code> (40px)
              </TokenValue>
            </TokenCard>
          </Grid>
        </Section>
      </Container>
    </>
  ),
};

/**
 * Typography
 * 
 * Font sizes, weights, line heights, and families.
 */
export const Typography: Story = {
  render: () => (
    <>
      <style>{storyStyles}</style>
      <Container>
        <Section>
          <SectionTitle>Typography</SectionTitle>
          <Description>
            Typography tokens for consistent text styling across the design system.
          </Description>

          <SubsectionTitle>Font Sizes</SubsectionTitle>
          <Grid columns={1}>
            {typographyTokens.sizes.map(token => (
              <TokenCard key={token.name}>
                <TextSample size={`var(${token.name})`}>
                  {token.sample}
                </TextSample>
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.value}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Font Weights</SubsectionTitle>
          <Grid columns={3}>
            {typographyTokens.weights.map(token => (
              <TokenCard key={token.name}>
                <TextSample size="var(--font-size-base)" weight={`var(${token.name})`}>
                  The quick brown fox
                </TextSample>
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.value}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Line Heights & Letter Spacing</SubsectionTitle>
          <Grid columns={2}>
            <TokenCard>
              <TokenName>Line Heights</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--line-height-tight</Code> (1.25)<br />
                <Code>--line-height-normal</Code> (1.5)<br />
                <Code>--line-height-relaxed</Code> (1.75)<br />
                <Code>--line-height-loose</Code> (2)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Letter Spacing</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--letter-spacing-tight</Code><br />
                <Code>--letter-spacing-normal</Code><br />
                <Code>--letter-spacing-wide</Code><br />
                <Code>--letter-spacing-wider</Code>
              </TokenValue>
            </TokenCard>
          </Grid>
        </Section>
      </Container>
    </>
  ),
};

/**
 * Effects
 * 
 * Shadows, border radius, transitions, and other visual effects.
 */
export const Effects: Story = {
  render: () => (
    <>
      <style>{storyStyles}</style>
      <Container>
        <Section>
          <SectionTitle>Effects</SectionTitle>
          <Description>
            Visual effects including shadows, border radius, transitions, and z-index.
          </Description>

          <SubsectionTitle>Shadows</SubsectionTitle>
          <Grid columns={2}>
            {effectsTokens.shadows.map(token => (
              <TokenCard key={token.name}>
                <ShadowBox shadow={`var(${token.name})`}>
                  {token.description}
                </ShadowBox>
                <div style={{ marginTop: 'var(--spacing-2)' }}>
                  <TokenName>{token.name}</TokenName>
                </div>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Border Radius</SubsectionTitle>
          <Grid columns={4}>
            {effectsTokens.radius.map(token => (
              <TokenCard key={token.name}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: `var(${token.name})`,
                    marginBottom: 'var(--spacing-2)',
                  }}
                />
                <TokenName>{token.name}</TokenName>
                <TokenValue>{token.value}</TokenValue>
              </TokenCard>
            ))}
          </Grid>

          <SubsectionTitle>Transitions & Animations</SubsectionTitle>
          <Grid columns={2}>
            <TokenCard>
              <TokenName>Duration</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--transition-fast</Code> (100ms)<br />
                <Code>--transition-base</Code> (150ms)<br />
                <Code>--transition-slow</Code> (300ms)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Properties</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--transition-colors</Code><br />
                <Code>--transition-all</Code><br />
                <Code>--transition-transform</Code><br />
                <Code>--transition-opacity</Code>
              </TokenValue>
            </TokenCard>
          </Grid>

          <SubsectionTitle>Opacity & Z-Index</SubsectionTitle>
          <Grid columns={2}>
            <TokenCard>
              <TokenName>Opacity</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--opacity-disabled</Code> (0.4)<br />
                <Code>--opacity-hover</Code> (0.8)<br />
                <Code>--opacity-muted</Code> (0.6)<br />
                Scale from <Code>--opacity-0</Code> to <Code>--opacity-100</Code>
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Z-Index</TokenName>
              <TokenValue style={{ marginTop: 'var(--spacing-2)' }}>
                <Code>--z-index-dropdown</Code> (1000)<br />
                <Code>--z-index-modal</Code> (1050)<br />
                <Code>--z-index-tooltip</Code> (1070)<br />
                <Code>--z-index-notification</Code> (1080)
              </TokenValue>
            </TokenCard>
          </Grid>
        </Section>
      </Container>
    </>
  ),
};

