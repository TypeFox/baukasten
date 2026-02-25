'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code } from 'baukasten-ui/core';

interface TypeToken {
  name: string;
  variable: string;
  value: string;
  description?: string;
}

const fontSizes: TypeToken[] = [
  { name: 'Extra Small', variable: '--bk-font-size-xs', value: '11px', description: 'Labels, captions' },
  { name: 'Small', variable: '--bk-font-size-sm', value: '12px', description: 'Helper text, small UI' },
  { name: 'Medium', variable: '--bk-font-size-md', value: '13px', description: 'Secondary text' },
  { name: 'Base', variable: '--bk-font-size-base', value: '14px', description: 'Body text (default)' },
  { name: 'Large', variable: '--bk-font-size-lg', value: '16px', description: 'Emphasized text' },
  { name: 'Extra Large', variable: '--bk-font-size-xl', value: '18px', description: 'Subheadings' },
  { name: '2X Large', variable: '--bk-font-size-2xl', value: '20px', description: 'Headings' },
  { name: '3X Large', variable: '--bk-font-size-3xl', value: '24px', description: 'Large headings' },
  { name: '4X Large', variable: '--bk-font-size-4xl', value: '30px', description: 'Display headings' },
  { name: '5X Large', variable: '--bk-font-size-5xl', value: '36px', description: 'Hero headings' },
];

const fontWeights: TypeToken[] = [
  { name: 'Light', variable: '--bk-font-weight-light', value: '300' },
  { name: 'Normal', variable: '--bk-font-weight-normal', value: '400' },
  { name: 'Medium', variable: '--bk-font-weight-medium', value: '500' },
  { name: 'Semibold', variable: '--bk-font-weight-semibold', value: '600' },
  { name: 'Bold', variable: '--bk-font-weight-bold', value: '700' },
];

const lineHeights: TypeToken[] = [
  { name: 'Hero', variable: '--bk-line-height-hero', value: '1.1', description: 'Extra tight for large text' },
  { name: 'Tight', variable: '--bk-line-height-tight', value: '1.25', description: 'Compact spacing' },
  { name: 'Normal', variable: '--bk-line-height-normal', value: '1.5', description: 'Standard readability' },
  { name: 'Relaxed', variable: '--bk-line-height-relaxed', value: '1.75', description: 'Comfortable reading' },
  { name: 'Loose', variable: '--bk-line-height-loose', value: '2', description: 'Maximum spacing' },
];

const letterSpacings: TypeToken[] = [
  { name: 'Hero', variable: '--bk-letter-spacing-hero', value: '-0.04em', description: 'Extra tight for large text' },
  { name: 'Tight', variable: '--bk-letter-spacing-tight', value: '-0.025em', description: 'Slight tightening' },
  { name: 'Normal', variable: '--bk-letter-spacing-normal', value: '0', description: 'Default spacing' },
  { name: 'Wide', variable: '--bk-letter-spacing-wide', value: '0.025em', description: 'Slight expansion' },
  { name: 'Wider', variable: '--bk-letter-spacing-wider', value: '0.05em', description: 'Expanded spacing' },
];

export default function TypographyPage() {
  return (
    <PageLayout
      title="Typography"
      description="Font sizes, weights, line heights, and letter spacing for consistent text styling."
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
          Typography tokens provide consistent text styling across the design system.
          All values are defined as CSS variables and can be customized.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Using typography tokens
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{
      fontSize: 'var(--bk-font-size-3xl)',
      fontWeight: 'var(--bk-font-weight-bold)',
      lineHeight: 'var(--bk-line-height-tight)',
      letterSpacing: 'var(--bk-letter-spacing-tight)',
    }}>
      {children}
    </h1>
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
          Font Sizes
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          A comprehensive scale from 11px to 36px for all text hierarchy needs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-padding-lg)' }}>
          {fontSizes.map(token => (
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
                <span style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-text-secondary)',
                  marginLeft: 'var(--bk-spacing-2)',
                }}>
                  {token.value}
                </span>
              </div>
              <div style={{
                fontSize: `var(${token.variable})`,
                marginBottom: 'var(--bk-spacing-3)',
                lineHeight: 'var(--bk-line-height-normal)',
              }}>
                The quick brown fox jumps over the lazy dog
              </div>
              {token.description && (
                <div style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-text-secondary)'
                }}>
                  {token.description}
                </div>
              )}
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
          Font Weights
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Five weight options from light to bold for emphasis and hierarchy.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {fontWeights.map(token => (
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
                fontSize: 'var(--bk-font-size-lg)',
                fontWeight: `var(${token.variable})`,
                marginBottom: 'var(--bk-spacing-3)',
              }}>
                The quick brown fox
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.value} • {token.name}
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
          Line Heights
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Line height values for different reading contexts and content types.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-padding-lg)' }}>
          {lineHeights.map(token => (
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
                <span style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-text-secondary)',
                  marginLeft: 'var(--bk-spacing-2)',
                }}>
                  {token.value}
                </span>
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-base)',
                lineHeight: `var(${token.variable})`,
                marginBottom: 'var(--bk-spacing-3)',
              }}>
                Typography is the art and technique of arranging type to make written language
                legible, readable, and appealing when displayed. The arrangement of type involves
                selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
              </div>
              {token.description && (
                <div style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-text-secondary)'
                }}>
                  {token.description}
                </div>
              )}
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
          Letter Spacing
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          Letter spacing (tracking) values for fine-tuning text appearance.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--bk-padding-lg)',
        }}>
          {letterSpacings.map(token => (
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
                fontSize: 'var(--bk-font-size-lg)',
                letterSpacing: `var(${token.variable})`,
                marginBottom: 'var(--bk-spacing-3)',
              }}>
                TYPOGRAPHY
              </div>
              <div style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-text-secondary)'
              }}>
                {token.value}
                {token.description && ` • ${token.description}`}
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
          Font Families
        </h2>
        <p style={{
          fontSize: 'var(--bk-font-size-base)',
          color: 'var(--bk-color-text-secondary)',
          marginBottom: 'var(--bk-padding-lg)',
        }}>
          System font stacks for consistent rendering across platforms.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-padding-lg)' }}>
          <div style={{
            backgroundColor: 'var(--bk-color-surface)',
            border: '1px solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            padding: 'var(--bk-padding-lg)',
          }}>
            <div style={{
              fontFamily: 'var(--bk-font-family-sans)',
              fontSize: 'var(--bk-font-size-lg)',
              marginBottom: 'var(--bk-padding-sm)',
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ marginBottom: 'var(--bk-padding-xs)' }}>
              <Code>--bk-font-family-sans</Code>
            </div>
            <div style={{
              fontSize: 'var(--bk-font-size-xs)',
              color: 'var(--bk-color-text-secondary)',
              fontFamily: 'var(--bk-font-family-mono)',
            }}>
              System sans-serif stack for UI text
            </div>
          </div>
          <div style={{
            backgroundColor: 'var(--bk-color-surface)',
            border: '1px solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            padding: 'var(--bk-padding-lg)',
          }}>
            <div style={{
              fontFamily: 'var(--bk-font-family-mono)',
              fontSize: 'var(--bk-font-size-lg)',
              marginBottom: 'var(--bk-padding-sm)',
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ marginBottom: 'var(--bk-padding-xs)' }}>
              <Code>--bk-font-family-mono</Code>
            </div>
            <div style={{
              fontSize: 'var(--bk-font-size-xs)',
              color: 'var(--bk-color-text-secondary)',
              fontFamily: 'var(--bk-font-family-mono)',
            }}>
              Monospace stack for code and technical content
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

