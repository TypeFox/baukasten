'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code } from 'baukasten';

interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  description?: string;
}

const spacingScale: SpacingToken[] = [
  { name: '0', variable: '--spacing-0', value: '0px' },
  { name: '0.5', variable: '--spacing-0-5', value: '2px' },
  { name: '1', variable: '--spacing-1', value: '4px' },
  { name: '1.5', variable: '--spacing-1-5', value: '6px' },
  { name: '2', variable: '--spacing-2', value: '8px' },
  { name: '2.5', variable: '--spacing-2-5', value: '10px' },
  { name: '3', variable: '--spacing-3', value: '12px' },
  { name: '3.5', variable: '--spacing-3-5', value: '14px' },
  { name: '4', variable: '--spacing-4', value: '16px' },
  { name: '5', variable: '--spacing-5', value: '20px' },
  { name: '6', variable: '--spacing-6', value: '24px' },
  { name: '7', variable: '--spacing-7', value: '28px' },
  { name: '8', variable: '--spacing-8', value: '32px' },
  { name: '10', variable: '--spacing-10', value: '40px' },
  { name: '12', variable: '--spacing-12', value: '48px' },
  { name: '16', variable: '--spacing-16', value: '64px' },
  { name: '20', variable: '--spacing-20', value: '80px' },
  { name: '24', variable: '--spacing-24', value: '96px' },
];

const gapTokens: SpacingToken[] = [
  { name: 'XS', variable: '--gap-xs', value: '4px', description: 'Minimal gap' },
  { name: 'SM', variable: '--gap-sm', value: '6px', description: 'Small gap' },
  { name: 'MD', variable: '--gap-md', value: '8px', description: 'Medium gap' },
  { name: 'LG', variable: '--gap-lg', value: '12px', description: 'Large gap' },
  { name: 'XL', variable: '--gap-xl', value: '16px', description: 'Extra large gap' },
];

const paddingTokens: SpacingToken[] = [
  { name: 'XS', variable: '--padding-xs', value: '2px 8px', description: 'Extra small padding' },
  { name: 'SM', variable: '--padding-sm', value: '4px 10px', description: 'Small padding' },
  { name: 'MD', variable: '--padding-md', value: '6px 14px', description: 'Medium padding' },
  { name: 'LG', variable: '--padding-lg', value: '8px 16px', description: 'Large padding' },
  { name: 'XL', variable: '--padding-xl', value: '10px 20px', description: 'Extra large padding' },
];

const componentSizes: SpacingToken[] = [
  { name: 'XS', variable: '--size-xs', value: '20px', description: 'Extra small component' },
  { name: 'SM', variable: '--size-sm', value: '24px', description: 'Small component' },
  { name: 'MD', variable: '--size-md', value: '28px', description: 'Medium component' },
  { name: 'LG', variable: '--size-lg', value: '32px', description: 'Large component' },
  { name: 'XL', variable: '--size-xl', value: '36px', description: 'Extra large component' },
];

export default function SpacingPage() {
  return (
    <PageLayout
      title="Spacing"
      description="Consistent spacing scale based on a 4px base unit for padding, margin, gaps, and component sizes."
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
          The spacing system uses a 4px base unit to create a consistent rhythm throughout the UI.
          All spacing values are multiples or divisions of this base unit.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using spacing tokens
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: 'var(--spacing-4)',
      marginBottom: 'var(--spacing-6)',
      display: 'flex',
      gap: 'var(--gap-md)',
    }}>
      {children}
    </div>
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
          Spacing Scale
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          The fundamental spacing scale from 0px to 96px. Use these for margin, padding, positioning, and gaps.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {spacingScale.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--spacing-3)',
                minHeight: '40px',
              }}>
                <div style={{
                  width: `var(${token.variable})`,
                  height: `var(${token.variable})`,
                  backgroundColor: 'var(--color-primary)',
                  opacity: 0.8,
                  borderRadius: 'var(--border-radius-sm)',
                  minWidth: '4px',
                  minHeight: '4px',
                }} />
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Gap Tokens
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Semantic gap values for spacing between flex and grid items.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {gapTokens.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                display: 'flex',
                gap: `var(${token.variable})`,
                marginBottom: 'var(--spacing-3)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  flexShrink: 0,
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  flexShrink: 0,
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  flexShrink: 0,
                }} />
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.value} • {token.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Padding Tokens
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Semantic padding values for components. Includes vertical and horizontal spacing.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {paddingTokens.map(token => (
            <div
              key={token.variable}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--padding-lg)',
              }}
            >
              <div style={{ marginBottom: 'var(--spacing-3)' }}>
                <Code>{token.variable}</Code>
              </div>
              <div style={{
                backgroundColor: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: 'var(--spacing-3)',
                display: 'inline-block',
              }}>
                <div style={{
                  padding: `var(${token.variable})`,
                }}>
                  <div style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    padding: 'var(--spacing-2)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: 'var(--font-size-xs)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}>
                    Content
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Component Sizes
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Standard heights for interactive elements like buttons, inputs, and controls.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--padding-lg)' }}>
          <div>
            <h3 style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--padding-md)',
            }}>
              Regular Sizes
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--padding-lg)',
            }}>
              {componentSizes.map(token => (
                <div
                  key={token.variable}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: 'var(--padding-lg)',
                  }}
                >
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <Code>{token.variable}</Code>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-3)',
                  }}>
                    <div style={{
                      height: `var(${token.variable})`,
                      width: '120px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary-foreground)',
                      fontSize: 'var(--font-size-xs)',
                    }}>
                      {token.name}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)'
                  }}>
                    {token.value} • {token.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--padding-md)',
            }}>
              Circular Sizes
            </h3>
            <p style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--padding-md)',
            }}>
              For icon buttons, avatars, and other circular components.
            </p>
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--padding-lg)',
            }}>
              <div style={{ display: 'flex', gap: 'var(--gap-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
                {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: `var(--size-circular-${size})`,
                      height: `var(--size-circular-${size})`,
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary-foreground)',
                      fontSize: 'var(--font-size-xs)',
                      marginBottom: 'var(--spacing-2)',
                    }}>
                      {size.toUpperCase()}
                    </div>
                    <Code>--size-circular-{size}</Code>
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

