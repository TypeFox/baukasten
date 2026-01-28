'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code } from 'baukasten-ui';

interface EffectToken {
  name: string;
  variable: string;
  value?: string;
  description: string;
}

const shadows: EffectToken[] = [
  { name: 'Small', variable: '--bk-shadow-sm', description: 'Subtle shadow for slight elevation' },
  { name: 'Base', variable: '--bk-shadow-base', description: 'Default shadow for cards and panels' },
  { name: 'Medium', variable: '--bk-shadow-md', description: 'Medium shadow for dropdowns' },
  { name: 'Large', variable: '--bk-shadow-lg', description: 'Large shadow for modals and overlays' },
  { name: 'Extra Large', variable: '--bk-shadow-xl', description: 'Extra large shadow for prominent elements' },
  { name: '2X Large', variable: '--bk-shadow-2xl', description: 'Maximum shadow for hero elements' },
  { name: 'Inner', variable: '--bk-shadow-inner', description: 'Inset shadow for depth' },
];

const borderRadii: EffectToken[] = [
  { name: 'None', variable: '--bk-radius-none', value: '0', description: 'No rounding' },
  { name: 'Small', variable: '--bk-radius-sm', value: '2px', description: 'Subtle rounding' },
  { name: 'Medium', variable: '--bk-radius-md', value: '4px', description: 'Standard rounding' },
  { name: 'Large', variable: '--bk-radius-lg', value: '6px', description: 'Pronounced rounding' },
  { name: 'Extra Large', variable: '--bk-radius-xl', value: '8px', description: 'Heavy rounding' },
  { name: '2X Large', variable: '--bk-radius-2xl', value: '12px', description: 'Maximum rounding' },
  { name: '3X Large', variable: '--bk-radius-3xl', value: '16px', description: 'Very heavy rounding' },
  { name: 'Full', variable: '--bk-radius-full', value: '9999px', description: 'Circular/pill shape' },
];

const transitions: EffectToken[] = [
  { name: 'Fast', variable: '--bk-transition-fast', value: '100ms', description: 'Quick animations' },
  { name: 'Base', variable: '--bk-transition-base', value: '150ms', description: 'Standard animations' },
  { name: 'Slow', variable: '--bk-transition-slow', value: '300ms', description: 'Deliberate animations' },
];

const transitionProperties: EffectToken[] = [
  { name: 'Colors', variable: '--bk-transition-colors', description: 'Color, background, and border transitions' },
  { name: 'All', variable: '--bk-transition-all', description: 'All properties transition' },
  { name: 'Transform', variable: '--bk-transition-transform', description: 'Transform property transitions' },
  { name: 'Opacity', variable: '--bk-transition-opacity', description: 'Opacity transitions' },
];

const opacityLevels: EffectToken[] = [
  { name: 'Disabled', variable: '--bk-opacity-disabled', value: '0.4', description: 'Disabled state opacity' },
  { name: 'Muted', variable: '--bk-opacity-muted', value: '0.6', description: 'Muted content opacity' },
  { name: 'Hover', variable: '--bk-opacity-hover', value: '0.8', description: 'Hover state opacity' },
];

const zIndexLevels: EffectToken[] = [
  { name: 'Base', variable: '--bk-z-index-base', value: '0', description: 'Base layer' },
  { name: 'Dropdown', variable: '--bk-z-index-dropdown', value: '1000', description: 'Dropdown menus' },
  { name: 'Sticky', variable: '--bk-z-index-sticky', value: '1020', description: 'Sticky elements' },
  { name: 'Fixed', variable: '--bk-z-index-fixed', value: '1030', description: 'Fixed elements' },
  { name: 'Modal Backdrop', variable: '--bk-z-index-modal-backdrop', value: '1040', description: 'Modal backdrop' },
  { name: 'Modal', variable: '--bk-z-index-modal', value: '1050', description: 'Modal dialogs' },
  { name: 'Popover', variable: '--bk-z-index-popover', value: '1060', description: 'Popovers' },
  { name: 'Context Menu', variable: '--bk-z-index-context-menu', value: '1065', description: 'Context menus' },
  { name: 'Tooltip', variable: '--bk-z-index-tooltip', value: '1070', description: 'Tooltips' },
  { name: 'Notification', variable: '--bk-z-index-notification', value: '1080', description: 'Toast notifications' },
];

export default function EffectsPage() {
  return (
    <PageLayout
      title="Effects"
      description="Visual effects including shadows, border radius, transitions, opacity, and z-index for depth and motion."
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
          Effects tokens provide consistent visual styling for shadows, borders, animations, and layering.
          Use these to create depth, smooth transitions, and proper visual hierarchy.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using effects tokens
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 'var(--bk-radius-md)',
      boxShadow: 'var(--bk-shadow-base)',
      transition: 'var(--bk-transition-colors)',
      padding: 'var(--bk-spacing-4)',
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
          Shadows
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Seven levels of shadows for creating depth and elevation.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {shadows.map(token => (
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
                width: '100%',
                height: '100px',
                backgroundColor: 'var(--bk-color-background-elevated)',
                borderRadius: 'var(--bk-radius-md)',
                boxShadow: `var(${token.variable})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--bk-spacing-3)',
                fontSize: 'var(--bk-font-size-sm)',
                color: 'var(--bk-color-text-secondary)',
              }}>
                {token.name}
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.description}
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
          Border Radius
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Eight levels of border radius from sharp corners to fully circular.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {borderRadii.map(token => (
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
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--bk-color-primary)',
                borderRadius: `var(${token.variable})`,
                margin: '0 auto',
                marginBottom: 'var(--bk-spacing-3)',
              }} />
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
          Transitions & Animations
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Timing and property presets for smooth animations and transitions.
        </p>

        <div style={{ marginBottom: 'var(--bk-padding-xl)' }}>
          <h3 style={{
            fontSize: 'var(--bk-font-size-md)',
            fontWeight: 'var(--bk-font-weight-semibold)',
            marginBottom: 'var(--bk-padding-md)',
          }}>
            Duration
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--bk-padding-lg)',
          }}>
            {transitions.map(token => (
              <div
                key={token.variable}
                style={{
                  backgroundColor: 'var(--bk-color-surface)',
                  border: '1px solid var(--bk-color-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-padding-lg)',
                  cursor: 'pointer',
                  transition: `background-color var(${token.variable})`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bk-color-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bk-color-surface)';
                }}
              >
                <div style={{
                  padding: 'var(--bk-padding-md)',
                  backgroundColor: 'var(--bk-color-primary)',
                  color: 'var(--bk-color-primary-foreground)',
                  borderRadius: 'var(--bk-radius-sm)',
                  textAlign: 'center',
                  marginBottom: 'var(--bk-padding-md)',
                  fontSize: 'var(--bk-font-size-sm)',
                }}>
                  Hover me
                </div>
                <div style={{ marginBottom: 'var(--bk-padding-xs)' }}>
                  <Code>{token.variable}</Code>
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
            Properties
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--bk-padding-lg)',
          }}>
            {transitionProperties.map(token => (
              <div
                key={token.variable}
                style={{
                  backgroundColor: 'var(--bk-color-surface)',
                  border: '1px solid var(--bk-color-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-padding-lg)',
                }}
              >
                <div style={{ marginBottom: 'var(--bk-padding-xs)' }}>
                  <Code>{token.variable}</Code>
                </div>
                <div style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-text-secondary)'
                }}>
                  {token.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Opacity
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Semantic opacity values for disabled, muted, and hover states. Full scale from 0-100 also available.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {opacityLevels.map(token => (
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
                width: '100%',
                height: '60px',
                backgroundColor: 'var(--bk-color-primary)',
                opacity: `var(${token.variable})`,
                borderRadius: 'var(--bk-radius-sm)',
                marginBottom: 'var(--bk-spacing-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bk-color-primary-foreground)',
                fontSize: 'var(--bk-font-size-sm)',
              }}>
                {token.value}
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.description}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: 'var(--bk-color-surface)',
          border: '1px solid var(--bk-color-border)',
          borderRadius: 'var(--bk-radius-md)',
          padding: 'var(--bk-padding-lg)',
          marginTop: 'var(--bk-padding-lg)',
        }}>
          <p style={{
            fontSize: 'var(--bk-font-size-sm)',
            color: 'var(--bk-color-text-secondary)',
            margin: 0,
          }}>
            Full opacity scale also available: <Code>--bk-opacity-0</Code> through <Code>--bk-opacity-100</Code> (0 to 1 in increments of 0.1)
          </p>
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--bk-font-size-xl)',
          fontWeight: 'var(--bk-font-weight-semibold)',
          marginBottom: 'var(--bk-padding-sm)',
        }}>
          Z-Index
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Predefined z-index values for proper layering of UI elements.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {zIndexLevels.map(token => (
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
                marginBottom: 'var(--bk-spacing-3)',
                fontSize: 'var(--bk-font-size-2xl)',
                fontWeight: 'var(--bk-font-weight-semibold)',
                color: 'var(--bk-color-primary)',
              }}>
                {token.value}
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
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

