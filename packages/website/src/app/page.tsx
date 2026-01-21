'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import { Button, Heading, Paragraph, Icon, Badge, Text, CodiconName } from '@baukasten/ui';

const components = [
  'Button',
  'Input',
  'Label',
  'Badge',
  'Icon',
  'Menu',
  'ContextMenu',
  'Typography',
  'Table',
  'Slider',
];

const features: { icon: CodiconName; title: string; description: string }[] = [
  {
    icon: 'symbol-color',
    title: 'VS Code & Eclipse Theia Native',
    description: 'Seamlessly integrates with VS Code or Eclipse Theia\'s theming system. All components automatically adapt to the user\'s selected color theme, providing a consistent look-and-feel.',
  },
  {
    icon: 'database',
    title: 'High-Performance Data Components',
    description: 'Specialized components for domain-specific applications: virtualized tables handling thousands of rows, multi-column trees, and advanced data grids optimized for complex data visualization.',
  },
  {
    icon: 'desktop-download',
    title: 'Application UI Focus',
    description: 'Purpose-built for professional medium to large screen applications. Optimized for data-intensive workflows, complex interfaces, and rich user experiences such development tools, analytics platforms, and domain-specific software.',
  },
  {
    icon: 'symbol-keyword',
    title: 'Design Tokens',
    description: 'Built on a comprehensive design token system that ensures consistency and makes customization simple and predictable.',
  },
  {
    icon: 'json',
    title: 'Type-Safe',
    description: 'Written in TypeScript with comprehensive type definitions. Get full IntelliSense support and catch errors at compile time.',
  },
  {
    icon: 'zap',
    title: 'Built for Speed',
    description: 'Zero-runtime CSS-in-TypeScript with build-time extraction for optimal performance. Virtualization and efficient rendering strategies ensure smooth performance even with large datasets.',
  }
];

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: 'calc(var(--spacing-12) * 1.5) var(--spacing-8) var(--spacing-12)',
        margin: 'calc(var(--spacing-8) * -1) calc(var(--spacing-8) * -1) var(--spacing-12)',
        background: 'linear-gradient(180deg, var(--vscode-editor-background) 0%, var(--vscode-sideBar-background) 100%)',
        borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)',
        borderBottom: '1px solid var(--vscode-panel-border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, var(--vscode-button-background) 0%, transparent 70%)',
          opacity: 0.15,
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <Heading level={1} style={{
            margin: '0 0 var(--spacing-6) 0',
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            Build Dense & Rich Domain-Specific Applications
          </Heading>

          <Paragraph style={{
            margin: '0 auto var(--spacing-8)',
            maxWidth: '700px',
            fontSize: 'calc(var(--vscode-font-size) * 1.1)',
            lineHeight: 1.7,
            color: 'var(--vscode-descriptionForeground)',
          }}>
            A comprehensive React component library designed for domain-specific applications.
            Powered by React, TypeScript, and vanilla-extract for modern, type-safe development.
          </Paragraph>

          {/* USP Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-4)',
            maxWidth: '900px',
            margin: '0 auto var(--spacing-8)',
            textAlign: 'left',
          }}>
            <div style={{
              padding: 'var(--spacing-5)',
              backgroundColor: 'var(--vscode-editor-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '2px solid var(--vscode-button-background)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <Icon name="extensions" style={{ fontSize: '24px', color: 'var(--vscode-button-background)' }} />
                <Text style={{ fontWeight: 700, fontSize: 'calc(var(--vscode-font-size) * 1.05)', color: 'var(--vscode-foreground)' }}>
                  Seamless Integration
                </Text>
              </div>
              <Text style={{
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                color: 'var(--vscode-descriptionForeground)',
                lineHeight: 1.6,
              }}>
                Consistent look-and-feel with VS Code and Eclipse Theia out of the box
              </Text>
            </div>

            <div style={{
              padding: 'var(--spacing-5)',
              backgroundColor: 'var(--vscode-editor-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '2px solid var(--vscode-button-background)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <Icon name="database" style={{ fontSize: '24px', color: 'var(--vscode-button-background)' }} />
                <Text style={{ fontWeight: 700, fontSize: 'calc(var(--vscode-font-size) * 1.05)', color: 'var(--vscode-foreground)' }}>
                  Domain-Specific Tools
                </Text>
              </div>
              <Text style={{
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                color: 'var(--vscode-descriptionForeground)',
                lineHeight: 1.6,
              }}>
                Efficient & Performant components for complex data
              </Text>
            </div>

            <div style={{
              padding: 'var(--spacing-5)',
              backgroundColor: 'var(--vscode-editor-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '2px solid var(--vscode-button-background)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <Icon name="paintcan" style={{ fontSize: '24px', color: 'var(--vscode-button-background)' }} />
                <Text style={{ fontWeight: 700, fontSize: 'calc(var(--vscode-font-size) * 1.05)', color: 'var(--vscode-foreground)' }}>
                  Application UI Focus
                </Text>
              </div>
              <Text style={{
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                color: 'var(--vscode-descriptionForeground)',
                lineHeight: 1.6,
              }}>
                Built for professional, data-intensive Desktop & Web Applications
              </Text>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--spacing-4)',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/installation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                <Icon name="rocket" style={{ marginRight: 'var(--spacing-2)' }} />
                Get Started
              </Button>
            </Link>
            <Link href="/components/accordion" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                <Icon name="library" style={{ marginRight: 'var(--spacing-2)' }} />
                Components
              </Button>
            </Link>
            <Link href="/storybook" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                <Icon name="book" style={{ marginRight: 'var(--spacing-2)' }} />
                Storybook
              </Button>
            </Link>
            <a href="https://github.com/yourusername/baukasten" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                <Icon name="github" style={{ marginRight: 'var(--spacing-2)' }} />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Start Code */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-12)',
      }}>
        <div>
          <Text style={{
            display: 'block',
            marginBottom: 'var(--spacing-3)',
            color: 'var(--vscode-descriptionForeground)',
            fontSize: 'var(--vscode-font-size)',
          }}>
            <Icon name="terminal" style={{ marginRight: 'var(--spacing-2)' }} />
            Install
          </Text>
          <CodeBlock
            code="npm install @baukasten/ui"
            language="bash"
          />
        </div>

        <div>
          <Text style={{
            display: 'block',
            marginBottom: 'var(--spacing-3)',
            color: 'var(--vscode-descriptionForeground)',
            fontSize: 'var(--vscode-font-size)',
          }}>
            <Icon name="code" style={{ marginRight: 'var(--spacing-2)' }} />
            Import
          </Text>
          <CodeBlock
            code="import { Button } from '@baukasten/ui'"
            language="typescript"
          />
        </div>
      </div>

      {/* Introduction Section */}
      <div style={{
        marginBottom: 'var(--spacing-12)',
        padding: 'var(--spacing-10) var(--spacing-8)',
        backgroundColor: 'var(--vscode-editor-background)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--vscode-panel-border)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
            <Heading level={2} style={{
              marginBottom: 'var(--spacing-4)',
              fontSize: 'calc(var(--vscode-font-size) * 2)',
            }}>
              What is Baukasten?
            </Heading>
            <Paragraph style={{
              color: 'var(--vscode-descriptionForeground)',
              fontSize: 'calc(var(--vscode-font-size) * 1.15)',
              lineHeight: 1.8,
              maxWidth: '800px',
              margin: '0 auto',
            }}>
              Baukasten (means construction kit in German) is a comprehensive React UI component library specifically designed for
              building <strong style={{ color: 'var(--vscode-foreground)' }}>domain-specific, data-intensive applications</strong>.
              It seamlessly integrates with VS Code and Theia when embedded, providing specialized components like high-performance tables and multi-column trees.
            </Paragraph>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-6)',
          }}>
            <div style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--vscode-sideBar-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--vscode-panel-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
                <Icon name="window" style={{
                  fontSize: '32px',
                  color: 'var(--vscode-symbolIcon-classForeground)',
                }} />
                <Heading level={4} style={{ margin: 0 }}>
                  Multi-target
                </Heading>
              </div>
              <Paragraph style={{
                color: 'var(--vscode-descriptionForeground)',
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Building for VSCode, Theia, Web or Electron, Baukasten has the same, look, feel and customization capabilities across all platforms.
              </Paragraph>
            </div>

            <div style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--vscode-sideBar-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--vscode-panel-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
                <Icon name="extensions" style={{
                  fontSize: '32px',
                  color: 'var(--vscode-symbolIcon-interfaceForeground)',
                }} />
                <Heading level={4} style={{ margin: 0 }}>
                  VSCode & Theia Extensions
                </Heading>
              </div>
              <Paragraph style={{
                color: 'var(--vscode-descriptionForeground)',
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Create powerful IDE extensions with components that seamlessly integrate with VSCode's native theming and design language
              </Paragraph>
            </div>

            <div style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--vscode-sideBar-background)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--vscode-panel-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
                <Icon name="globe" style={{
                  fontSize: '32px',
                  color: 'var(--vscode-symbolIcon-namespaceForeground)',
                }} />
                <Heading level={4} style={{ margin: 0 }}>
                  Web Applications
                </Heading>
              </div>
              <Paragraph style={{
                color: 'var(--vscode-descriptionForeground)',
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Deploy sophisticated web applications with professional-grade components designed for complex workflows and data visualization
              </Paragraph>
            </div>
          </div>

          <div style={{
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--vscode-textCodeBlock-background)',
            borderRadius: 'var(--border-radius-md)',
            borderLeft: '3px solid var(--vscode-button-background)',
          }}>
            <Paragraph style={{
              margin: 0,
              color: 'var(--vscode-foreground)',
              fontSize: 'calc(var(--vscode-font-size) * 1.05)',
              lineHeight: 1.7,
            }}>
              <Icon name="info" style={{ marginRight: 'var(--spacing-2)', color: 'var(--vscode-button-background)' }} />
              Baukasten design system is inspired by VSCode/Theia, to a offer a seamless UI integration within these platforms. But you can customize the theming to fit your own brand and style.
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-10)' }}>
          <Heading level={2} style={{
            marginBottom: 'var(--spacing-4)',
            fontSize: 'calc(var(--vscode-font-size) * 2)',
          }}>
            Built for Professional Applications
          </Heading>
          <Paragraph style={{
            color: 'var(--vscode-descriptionForeground)',
            fontSize: 'calc(var(--vscode-font-size) * 1.1)',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Every feature is designed to help you build production-ready applications faster
          </Paragraph>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 'var(--spacing-5)',
          marginBottom: 'var(--spacing-8)',
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--vscode-editor-background)',
                border: '1px solid var(--vscode-panel-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--spacing-7)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--vscode-sideBar-background)';
                e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--vscode-editor-background)';
                e.currentTarget.style.borderColor = 'var(--vscode-panel-border)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-3)',
              }}>
                <Icon name={feature.icon} style={{
                  fontSize: '32px',
                  color: 'var(--vscode-button-background)',
                }} />
                <Heading level={3} style={{
                  margin: 0,
                  fontSize: 'calc(var(--vscode-font-size) * 1.2)',
                  fontWeight: 600,
                }}>
                  {feature.title}
                </Heading>
              </div>

              <Paragraph style={{
                color: 'var(--vscode-descriptionForeground)',
                lineHeight: 1.7,
                margin: 0,
                fontSize: 'calc(var(--vscode-font-size) * 0.95)',
              }}>
                {feature.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
