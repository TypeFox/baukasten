'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code } from 'baukasten-ui';

interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  description?: string;
}

const spacingScale: SpacingToken[] = [
  { name: '0', variable: '--bk-spacing-0', value: '0px' },
  { name: '0.5', variable: '--bk-spacing-0-5', value: '2px' },
  { name: '1', variable: '--bk-spacing-1', value: '4px' },
  { name: '1.5', variable: '--bk-spacing-1-5', value: '6px' },
  { name: '2', variable: '--bk-spacing-2', value: '8px' },
  { name: '2.5', variable: '--bk-spacing-2-5', value: '10px' },
  { name: '3', variable: '--bk-spacing-3', value: '12px' },
  { name: '3.5', variable: '--bk-spacing-3-5', value: '14px' },
  { name: '4', variable: '--bk-spacing-4', value: '16px' },
  { name: '5', variable: '--bk-spacing-5', value: '20px' },
  { name: '6', variable: '--bk-spacing-6', value: '24px' },
  { name: '7', variable: '--bk-spacing-7', value: '28px' },
  { name: '8', variable: '--bk-spacing-8', value: '32px' },
  { name: '10', variable: '--bk-spacing-10', value: '40px' },
  { name: '12', variable: '--bk-spacing-12', value: '48px' },
  { name: '16', variable: '--bk-spacing-16', value: '64px' },
  { name: '20', variable: '--bk-spacing-20', value: '80px' },
  { name: '24', variable: '--bk-spacing-24', value: '96px' },
];

const gapTokens: SpacingToken[] = [
  { name: 'XS', variable: '--bk-gap-xs', value: '4px', description: 'Minimal gap' },
  { name: 'SM', variable: '--bk-gap-sm', value: '6px', description: 'Small gap' },
  { name: 'MD', variable: '--bk-gap-md', value: '8px', description: 'Medium gap' },
  { name: 'LG', variable: '--bk-gap-lg', value: '12px', description: 'Large gap' },
  { name: 'XL', variable: '--bk-gap-xl', value: '16px', description: 'Extra large gap' },
];

const paddingTokens: SpacingToken[] = [
  { name: 'XS', variable: '--bk-padding-xs', value: '2px 8px', description: 'Extra small padding' },
  { name: 'SM', variable: '--bk-padding-sm', value: '4px 10px', description: 'Small padding' },
  { name: 'MD', variable: '--bk-padding-md', value: '6px 14px', description: 'Medium padding' },
  { name: 'LG', variable: '--bk-padding-lg', value: '8px 16px', description: 'Large padding' },
  { name: 'XL', variable: '--bk-padding-xl', value: '10px 20px', description: 'Extra large padding' },
];

const componentSizes: SpacingToken[] = [
  { name: 'XS', variable: '--bk-size-xs', value: '20px', description: 'Extra small component' },
  { name: 'SM', variable: '--bk-size-sm', value: '24px', description: 'Small component' },
  { name: 'MD', variable: '--bk-size-md', value: '28px', description: 'Medium component' },
  { name: 'LG', variable: '--bk-size-lg', value: '32px', description: 'Large component' },
  { name: 'XL', variable: '--bk-size-xl', value: '36px', description: 'Extra large component' },
];

export default function SpacingPage() {
  return (
    <PageLayout
      title="Spacing"
      description="Consistent spacing scale based on a 4px base unit for padding, margin, gaps, and component sizes."
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
          The spacing system uses a 4px base unit to create a consistent rhythm throughout the UI.
          All spacing values are multiples or divisions of this base unit.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using spacing tokens
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: 'var(--bk-spacing-4)',
      marginBottom: 'var(--bk-spacing-6)',
      display: 'flex',
      gap: 'var(--bk-gap-md)',
    }}>
      {children}
    </div>
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
          Spacing Scale
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          The fundamental spacing scale from 0px to 96px. Use these for margin, padding, positioning, and gaps.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {spacingScale.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--bk-color-surface)',
                border: '1px solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                padding: 'var(--bk-padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--bk-spacing-3)',
                minHeight: '40px',
              }}>
                <div style={{
                  width: `var(${token.variable})`,
                  height: `var(${token.variable})`,
                  backgroundColor: 'var(--bk-color-primary)',
                  opacity: 0.8,
                  borderRadius: 'var(--bk-radius-sm)',
                  minWidth: '4px',
                  minHeight: '4px',
                }} />
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Gap Tokens
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Semantic gap values for spacing between flex and grid items.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {gapTokens.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--bk-color-surface)',
                border: '1px solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                padding: 'var(--bk-padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                display: 'flex',
                gap: `var(${token.variable})`,
                marginBottom: 'var(--bk-spacing-3)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--bk-color-primary)',
                  borderRadius: 'var(--bk-radius-sm)',
                  flexShrink: 0,
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--bk-color-primary)',
                  borderRadius: 'var(--bk-radius-sm)',
                  flexShrink: 0,
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--bk-color-primary)',
                  borderRadius: 'var(--bk-radius-sm)',
                  flexShrink: 0,
                }} />
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.value} • {token.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Padding Tokens
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Semantic padding values for components. Includes vertical and horizontal spacing.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {paddingTokens.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--bk-color-surface)',
                border: '1px solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                padding: 'var(--bk-padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                backgroundColor: 'var(--bk-color-background-secondary)',
                border: '1px solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-sm)',
                marginBottom: 'var(--bk-spacing-3)',
                display: 'inline-block',
              }}>
                <div style={{
                  padding: `var(${token.variable})`,
                }}>
                  <div style={{
                    backgroundColor: 'var(--bk-color-primary)',
                    color: 'var(--bk-color-primary-foreground)',
                    padding: 'var(--bk-spacing-2)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-xs)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}>
                    Content
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Component Sizes
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Standard heights for interactive elements like buttons, inputs, and controls.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-padding-lg)' }}>
          <div>
            <h3 style={{
              fontSize: 'var(--bk-font-size-md)',
              fontWeight: 'var(--bk-font-weight-semibold)',
              marginBottom: 'var(--bk-padding-md)',
            }}>
              Regular Sizes
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--bk-padding-lg)',
            }}>
              {componentSizes.map(token => (
                <div
                  key={token.variable}
                  style={{
                    backgroundColor: 'var(--bk-color-surface)',
                    border: '1px solid var(--bk-color-border)',
                    borderRadius: 'var(--bk-radius-md)',
                    padding: 'var(--bk-padding-lg)',
                  }}
                >
                  <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    <Code>{token.variable}</Code>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'var(--bk-spacing-3)',
                  }}>
                    <div style={{
                      height: `var(${token.variable})`,
                      width: '120px',
                      backgroundColor: 'var(--bk-color-primary)',
                      borderRadius: 'var(--bk-radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--bk-color-primary-foreground)',
                      fontSize: 'var(--bk-font-size-xs)',
                    }}>
                      {token.name}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-text-secondary)'
                  }}>
                    {token.value} • {token.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: 'var(--bk-font-size-md)',
              fontWeight: 'var(--bk-font-weight-semibold)',
              marginBottom: 'var(--bk-padding-md)',
            }}>
              Circular Sizes
            </h3>
            <p style={{
              fontSize: 'var(--bk-font-size-sm)',
              color: 'var(--bk-color-text-secondary)',
              marginBottom: 'var(--bk-padding-md)',
            }}>
              For icon buttons, avatars, and other circular components.
            </p>
            <div style={{
              backgroundColor: 'var(--bk-color-surface)',
              border: '1px solid var(--bk-color-border)',
              borderRadius: 'var(--bk-radius-md)',
              padding: 'var(--bk-padding-lg)',
            }}>
              <div style={{ display: 'flex', gap: 'var(--bk-gap-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
                {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: `var(--bk-size-circular-${size})`,
                      height: `var(--bk-size-circular-${size})`,
                      backgroundColor: 'var(--bk-color-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--bk-color-primary-foreground)',
                      fontSize: 'var(--bk-font-size-xs)',
                      marginBottom: 'var(--bk-spacing-2)',
                    }}>
                      {size.toUpperCase()}
                    </div>
                    <Code>--bk-size-circular-{size}</Code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

