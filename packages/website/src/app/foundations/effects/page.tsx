'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code } from 'baukasten';

interface EffectToken {
  name: string;
  variable: string;
  value?: string;
  description: string;
}

const shadows: EffectToken[] = [
  { name: 'Small', variable: '--shadow-sm', description: 'Subtle shadow for slight elevation' },
  { name: 'Base', variable: '--shadow-base', description: 'Default shadow for cards and panels' },
  { name: 'Medium', variable: '--shadow-md', description: 'Medium shadow for dropdowns' },
  { name: 'Large', variable: '--shadow-lg', description: 'Large shadow for modals and overlays' },
  { name: 'Extra Large', variable: '--shadow-xl', description: 'Extra large shadow for prominent elements' },
  { name: '2X Large', variable: '--shadow-2xl', description: 'Maximum shadow for hero elements' },
  { name: 'Inner', variable: '--shadow-inner', description: 'Inset shadow for depth' },
];

const borderRadii: EffectToken[] = [
  { name: 'None', variable: '--radius-none', value: '0', description: 'No rounding' },
  { name: 'Small', variable: '--radius-sm', value: '2px', description: 'Subtle rounding' },
  { name: 'Medium', variable: '--radius-md', value: '4px', description: 'Standard rounding' },
  { name: 'Large', variable: '--radius-lg', value: '6px', description: 'Pronounced rounding' },
  { name: 'Extra Large', variable: '--radius-xl', value: '8px', description: 'Heavy rounding' },
  { name: '2X Large', variable: '--radius-2xl', value: '12px', description: 'Maximum rounding' },
  { name: '3X Large', variable: '--radius-3xl', value: '16px', description: 'Very heavy rounding' },
  { name: 'Full', variable: '--radius-full', value: '9999px', description: 'Circular/pill shape' },
];

const transitions: EffectToken[] = [
  { name: 'Fast', variable: '--transition-fast', value: '100ms', description: 'Quick animations' },
  { name: 'Base', variable: '--transition-base', value: '150ms', description: 'Standard animations' },
  { name: 'Slow', variable: '--transition-slow', value: '300ms', description: 'Deliberate animations' },
];

const transitionProperties: EffectToken[] = [
  { name: 'Colors', variable: '--transition-colors', description: 'Color, background, and border transitions' },
  { name: 'All', variable: '--transition-all', description: 'All properties transition' },
  { name: 'Transform', variable: '--transition-transform', description: 'Transform property transitions' },
  { name: 'Opacity', variable: '--transition-opacity', description: 'Opacity transitions' },
];

const opacityLevels: EffectToken[] = [
  { name: 'Disabled', variable: '--opacity-disabled', value: '0.4', description: 'Disabled state opacity' },
  { name: 'Muted', variable: '--opacity-muted', value: '0.6', description: 'Muted content opacity' },
  { name: 'Hover', variable: '--opacity-hover', value: '0.8', description: 'Hover state opacity' },
];

const zIndexLevels: EffectToken[] = [
  { name: 'Base', variable: '--z-index-base', value: '0', description: 'Base layer' },
  { name: 'Dropdown', variable: '--z-index-dropdown', value: '1000', description: 'Dropdown menus' },
  { name: 'Sticky', variable: '--z-index-sticky', value: '1020', description: 'Sticky elements' },
  { name: 'Fixed', variable: '--z-index-fixed', value: '1030', description: 'Fixed elements' },
  { name: 'Modal Backdrop', variable: '--z-index-modal-backdrop', value: '1040', description: 'Modal backdrop' },
  { name: 'Modal', variable: '--z-index-modal', value: '1050', description: 'Modal dialogs' },
  { name: 'Popover', variable: '--z-index-popover', value: '1060', description: 'Popovers' },
  { name: 'Context Menu', variable: '--z-index-context-menu', value: '1065', description: 'Context menus' },
  { name: 'Tooltip', variable: '--z-index-tooltip', value: '1070', description: 'Tooltips' },
  { name: 'Notification', variable: '--z-index-notification', value: '1080', description: 'Toast notifications' },
];

export default function EffectsPage() {
  return (
    <PageLayout
      title="Effects"
      description="Visual effects including shadows, border radius, transitions, opacity, and z-index for depth and motion."
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
          Effects tokens provide consistent visual styling for shadows, borders, animations, and layering.
          Use these to create depth, smooth transitions, and proper visual hierarchy.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using effects tokens
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-base)',
      transition: 'var(--transition-colors)',
      padding: 'var(--spacing-4)',
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
          Shadows
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Seven levels of shadows for creating depth and elevation.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {shadows.map(token => (
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
                width: '100%',
                height: '100px',
                backgroundColor: 'var(--color-background-elevated)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: `var(${token.variable})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
              }}>
                {token.name}
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.description}
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
          Border Radius
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Eight levels of border radius from sharp corners to fully circular.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {borderRadii.map(token => (
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
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: `var(${token.variable})`,
                margin: '0 auto',
                marginBottom: 'var(--spacing-3)',
              }} />
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
          Transitions & Animations
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Timing and property presets for smooth animations and transitions.
        </p>

        <div style={{ marginBottom: 'var(--padding-xl)' }}>
          <h3 style={{
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--padding-md)',
          }}>
            Duration
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--padding-lg)',
          }}>
            {transitions.map(token => (
              <div
                key={token.variable}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: 'var(--padding-lg)',
                  cursor: 'pointer',
                  transition: `background-color var(${token.variable})`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }}
              >
                <div style={{
                  padding: 'var(--padding-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: 'var(--border-radius-sm)',
                  textAlign: 'center',
                  marginBottom: 'var(--padding-md)',
                  fontSize: 'var(--font-size-sm)',
                }}>
                  Hover me
                </div>
                <div style={{ marginBottom: 'var(--padding-xs)' }}>
                  <Code>{token.variable}</Code>
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
            Properties
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--padding-lg)',
          }}>
            {transitionProperties.map(token => (
              <div
                key={token.variable}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: 'var(--padding-lg)',
                }}
              >
                <div style={{ marginBottom: 'var(--padding-xs)' }}>
                  <Code>{token.variable}</Code>
                </div>
                <div style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)'
                }}>
                  {token.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Opacity
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Semantic opacity values for disabled, muted, and hover states. Full scale from 0-100 also available.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {opacityLevels.map(token => (
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
                width: '100%',
                height: '60px',
                backgroundColor: 'var(--color-primary)',
                opacity: `var(${token.variable})`,
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: 'var(--spacing-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-foreground)',
                fontSize: 'var(--font-size-sm)',
              }}>
                {token.value}
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.description}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-md)',
          padding: 'var(--padding-lg)',
          marginTop: 'var(--padding-lg)',
        }}>
          <p style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}>
            Full opacity scale also available: <Code>--opacity-0</Code> through <Code>--opacity-100</Code> (0 to 1 in increments of 0.1)
          </p>
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--padding-sm)',
        }}>
          Z-Index
        </h2>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--padding-lg)',
        }}>
          Predefined z-index values for proper layering of UI elements.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--padding-lg)',
        }}>
          {zIndexLevels.map(token => (
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
                marginBottom: 'var(--spacing-3)',
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary)',
              }}>
                {token.value}
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)'
              }}>
                {token.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

