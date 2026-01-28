import type { Meta, StoryObj } from '@storybook/react';

// Story-specific styles using a style tag
const storyStyles = `
  .ds-container { font-family: var(--bk-font-family-sans); color: var(--bk-color-foreground); padding: var(--bk-spacing-4); }
  .ds-section { margin-bottom: var(--bk-spacing-8); }
  .ds-section-title { font-size: var(--bk-font-size-2xl); font-weight: var(--bk-font-weight-bold); margin-bottom: var(--bk-spacing-4); color: var(--bk-color-foreground); border-bottom: var(--bk-border-width-2) solid var(--bk-color-divider); padding-bottom: var(--bk-spacing-2); }
  .ds-subsection-title { font-size: var(--bk-font-size-lg); font-weight: var(--bk-font-weight-semibold); margin-top: var(--bk-spacing-6); margin-bottom: var(--bk-spacing-3); color: var(--bk-color-foreground); }
  .ds-description { font-size: var(--bk-font-size-md); color: var(--bk-color-foreground-muted); margin-bottom: var(--bk-spacing-4); line-height: var(--bk-line-height-relaxed); }
  .ds-grid { display: grid; gap: var(--bk-spacing-4); margin-bottom: var(--bk-spacing-4); }
  .ds-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .ds-grid-4 { grid-template-columns: repeat(4, 1fr); }
  .ds-grid-2 { grid-template-columns: repeat(2, 1fr); }
  .ds-grid-1 { grid-template-columns: repeat(1, 1fr); }
  .ds-token-card { padding: var(--bk-spacing-3); border: var(--bk-border-width-1) solid var(--bk-color-border); border-radius: var(--bk-radius-md); background-color: var(--bk-color-background-secondary); transition: var(--bk-transition-colors); }
  .ds-token-card:hover { border-color: var(--bk-color-border-hover); background-color: var(--bk-color-hover); }
  .ds-token-name { font-family: var(--bk-font-family-mono); font-size: var(--bk-font-size-sm); font-weight: var(--bk-font-weight-medium); color: var(--bk-color-foreground); margin-bottom: var(--bk-spacing-1); }
  .ds-token-value { font-family: var(--bk-font-family-mono); font-size: var(--bk-font-size-xs); color: var(--bk-color-foreground-muted); }
  .ds-color-swatch { width: 100%; height: 60px; border-radius: var(--bk-radius-sm); margin-bottom: var(--bk-spacing-2); border: var(--bk-border-width-1) solid var(--bk-color-border); }
  .ds-spacing-box { background-color: var(--bk-color-primary); opacity: var(--bk-opacity-80); border-radius: var(--bk-radius-sm); }
  .ds-gap-demo { display: flex; }
  .ds-gap-item { width: 40px; height: 40px; background-color: var(--bk-color-primary); border-radius: var(--bk-radius-sm); flex-shrink: 0; }
  .ds-padding-demo { background-color: var(--bk-color-background-secondary); border: var(--bk-border-width-1) solid var(--bk-color-border); border-radius: var(--bk-radius-sm); display: inline-block; }
  .ds-padding-inner { background-color: var(--bk-color-primary); color: var(--bk-color-primary-foreground); padding: var(--bk-spacing-2); border-radius: var(--bk-radius-sm); font-size: var(--bk-font-size-xs); text-align: center; }
  .ds-text-sample { color: var(--bk-color-foreground); margin-bottom: var(--bk-spacing-2); }
  .ds-shadow-box { width: 100%; height: 80px; background-color: var(--bk-color-background-elevated); border-radius: var(--bk-radius-md); display: flex; align-items: center; justify-content: center; color: var(--bk-color-foreground); font-size: var(--bk-font-size-sm); }
  .ds-code { font-family: var(--bk-font-family-mono); background-color: var(--bk-color-background-secondary); padding: var(--bk-spacing-0-5) var(--bk-spacing-1); border-radius: var(--bk-radius-sm); font-size: var(--bk-font-size-sm); color: var(--bk-color-primary); }
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
import { GlobalStyles } from 'baukasten-ui';

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
    backgroundColor: 'var(--bk-color-primary)',
    color: 'var(--bk-color-primary-foreground)',
    padding: 'var(--bk-padding-md)',
    fontSize: 'var(--bk-font-size-base)',
    borderRadius: 'var(--bk-radius-md)',
    transition: 'var(--bk-transition-colors)'
  }}>
    {children}
  </button>
);

// Or using CSS classes
const styles = \`
  .button {
    background-color: var(--bk-color-primary);
    color: var(--bk-color-primary-foreground);
    padding: var(--bk-padding-md);
    font-size: var(--bk-font-size-base);
    border-radius: var(--bk-radius-md);
    transition: var(--bk-transition-colors);
  }
  
  .button:hover {
    background-color: var(--bk-color-primary-hover);
  }
\`;
\`\`\`

## Customization

Override any token by redefining the CSS variable:

\`\`\`css
:root {
  --bk-color-primary: #007acc;
  --bk-color-primary-hover: #005a9e;
  --bk-spacing-4: 1.5rem; /* Increase base spacing */
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
  <div className="ds-text-sample" style={{ fontSize: size, fontWeight: weight || 'var(--bk-font-weight-normal)' }}>{children}</div>
);
const ShadowBox = ({ shadow, children }: { shadow: string; children: React.ReactNode }) => (
  <div className="ds-shadow-box" style={{ boxShadow: shadow }}>{children}</div>
);
const Code = ({ children }: { children: React.ReactNode }) => <code className="ds-code">{children}</code>;

// Color tokens grouped by category
const colorTokens = {
  brand: [
    { name: '--bk-color-primary', description: 'Primary brand color' },
    { name: '--bk-color-primary-hover', description: 'Primary hover state' },
    { name: '--bk-color-primary-foreground', description: 'Text on primary' },
    { name: '--bk-color-secondary', description: 'Secondary brand color' },
    { name: '--bk-color-secondary-hover', description: 'Secondary hover state' },
    { name: '--bk-color-secondary-foreground', description: 'Text on secondary' },
  ],
  semantic: [
    { name: '--bk-color-success', description: 'Success state' },
    { name: '--bk-color-warning', description: 'Warning state' },
    { name: '--bk-color-danger', description: 'Error/danger state' },
    { name: '--bk-color-info', description: 'Info state' },
  ],
  neutral: [
    { name: '--bk-color-background', description: 'Primary background' },
    { name: '--bk-color-background-secondary', description: 'Secondary background' },
    { name: '--bk-color-foreground', description: 'Primary text' },
    { name: '--bk-color-foreground-muted', description: 'Muted text' },
    { name: '--bk-color-border', description: 'Border color' },
    { name: '--bk-color-border-focus', description: 'Focus border' },
  ],
  interactive: [
    { name: '--bk-color-hover', description: 'Hover background' },
    { name: '--bk-color-active', description: 'Active background' },
    { name: '--bk-color-focus', description: 'Focus indicator' },
    { name: '--bk-color-selected', description: 'Selected background' },
  ],
};

const spacingTokens = [
  { name: '--bk-spacing-0', value: '0' },
  { name: '--bk-spacing-1', value: '4px' },
  { name: '--bk-spacing-2', value: '8px' },
  { name: '--bk-spacing-3', value: '12px' },
  { name: '--bk-spacing-4', value: '16px' },
  { name: '--bk-spacing-6', value: '24px' },
  { name: '--bk-spacing-8', value: '32px' },
  { name: '--bk-spacing-12', value: '48px' },
];

const gapTokens = [
  { name: '--bk-gap-xs', value: '4px' },
  { name: '--bk-gap-sm', value: '6px' },
  { name: '--bk-gap-md', value: '8px' },
  { name: '--bk-gap-lg', value: '12px' },
  { name: '--bk-gap-xl', value: '16px' },
];

const paddingTokens = [
  { name: '--bk-padding-xs', value: '2px 8px' },
  { name: '--bk-padding-sm', value: '4px 10px' },
  { name: '--bk-padding-md', value: '6px 14px' },
  { name: '--bk-padding-lg', value: '8px 16px' },
  { name: '--bk-padding-xl', value: '10px 20px' },
];

const typographyTokens = {
  sizes: [
    { name: '--bk-font-size-xs', value: '11px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-sm', value: '12px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-md', value: '13px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-base', value: '14px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-lg', value: '16px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-xl', value: '18px', sample: 'The quick brown fox' },
    { name: '--bk-font-size-2xl', value: '20px', sample: 'The quick brown fox' },
  ],
  weights: [
    { name: '--bk-font-weight-light', value: '300' },
    { name: '--bk-font-weight-normal', value: '400' },
    { name: '--bk-font-weight-medium', value: '500' },
    { name: '--bk-font-weight-semibold', value: '600' },
    { name: '--bk-font-weight-bold', value: '700' },
  ],
};

const effectsTokens = {
  radius: [
    { name: '--bk-radius-sm', value: '2px' },
    { name: '--bk-radius-md', value: '4px' },
    { name: '--bk-radius-lg', value: '6px' },
    { name: '--bk-radius-xl', value: '8px' },
  ],
  shadows: [
    { name: '--bk-shadow-sm', description: 'Small shadow' },
    { name: '--bk-shadow-base', description: 'Base shadow' },
    { name: '--bk-shadow-md', description: 'Medium shadow' },
    { name: '--bk-shadow-lg', description: 'Large shadow' },
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--bk-spacing-2)' }}>
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
                <div style={{ marginTop: 'var(--bk-spacing-2)' }}>
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
                <div style={{ marginTop: 'var(--bk-spacing-2)' }}>
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
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-size-xs</Code> (20px) through <Code>--bk-size-xl</Code> (36px)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Circular Sizes</TokenName>
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-size-circular-xs</Code> (24px) through <Code>--bk-size-circular-xl</Code> (40px)
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
                <TextSample size="var(--bk-font-size-base)" weight={`var(${token.name})`}>
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
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-line-height-tight</Code> (1.25)<br />
                <Code>--bk-line-height-normal</Code> (1.5)<br />
                <Code>--bk-line-height-relaxed</Code> (1.75)<br />
                <Code>--bk-line-height-loose</Code> (2)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Letter Spacing</TokenName>
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-letter-spacing-tight</Code><br />
                <Code>--bk-letter-spacing-normal</Code><br />
                <Code>--bk-letter-spacing-wide</Code><br />
                <Code>--bk-letter-spacing-wider</Code>
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
                <div style={{ marginTop: 'var(--bk-spacing-2)' }}>
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
                    backgroundColor: 'var(--bk-color-primary)',
                    borderRadius: `var(${token.name})`,
                    marginBottom: 'var(--bk-spacing-2)',
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
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-transition-fast</Code> (100ms)<br />
                <Code>--bk-transition-base</Code> (150ms)<br />
                <Code>--bk-transition-slow</Code> (300ms)
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Properties</TokenName>
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-transition-colors</Code><br />
                <Code>--bk-transition-all</Code><br />
                <Code>--bk-transition-transform</Code><br />
                <Code>--bk-transition-opacity</Code>
              </TokenValue>
            </TokenCard>
          </Grid>

          <SubsectionTitle>Opacity & Z-Index</SubsectionTitle>
          <Grid columns={2}>
            <TokenCard>
              <TokenName>Opacity</TokenName>
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-opacity-disabled</Code> (0.4)<br />
                <Code>--bk-opacity-hover</Code> (0.8)<br />
                <Code>--bk-opacity-muted</Code> (0.6)<br />
                Scale from <Code>--bk-opacity-0</Code> to <Code>--bk-opacity-100</Code>
              </TokenValue>
            </TokenCard>
            <TokenCard>
              <TokenName>Z-Index</TokenName>
              <TokenValue style={{ marginTop: 'var(--bk-spacing-2)' }}>
                <Code>--bk-z-index-dropdown</Code> (1000)<br />
                <Code>--bk-z-index-modal</Code> (1050)<br />
                <Code>--bk-z-index-tooltip</Code> (1070)<br />
                <Code>--bk-z-index-notification</Code> (1080)
              </TokenValue>
            </TokenCard>
          </Grid>
        </Section>
      </Container>
    </>
  ),
};

