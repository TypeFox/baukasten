'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import { Heading, Alert, Icon, Button } from '@baukasten/ui';

const Section = ({ children }: { children: React.ReactNode }) => (
  <section style={{ marginBottom: 'var(--spacing-12)' }}>{children}</section>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 'var(--font-size-md)',
    color: 'var(--color-text-secondary)',
    margin: '0 0 var(--spacing-4) 0',
    lineHeight: 'var(--line-height-relaxed)',
  }}>{children}</p>
);

const StepNumber = ({ number }: { number: number }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    marginRight: 'var(--spacing-3)',
  }}>
    {number}
  </div>
);

export default function QuickStartPage() {
  return (
    <PageLayout
      title="Quick Start"
      description="Get up and running with Baukasten in under 5 minutes."
    >
      <Alert variant="info" icon={<Icon name="lightbulb" />} style={{ marginBottom: 'var(--spacing-8)' }}>
        This guide will get you started quickly. For more detailed setup instructions and configuration options,
        check out the <Link href="/installation" style={{ color: 'var(--vscode-textLink-foreground)', textDecoration: 'underline' }}>full installation guide</Link>.
      </Alert>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
          <StepNumber number={1} />
          <Heading level={2} style={{ margin: 0 }}>Install Baukasten</Heading>
        </div>
        <Paragraph>
          Install the package using npm, yarn, or pnpm:
        </Paragraph>
        <CodeBlock
          code="npm install @baukasten/ui"
          language="bash"
        />
      </Section>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
          <StepNumber number={2} />
          <Heading level={2} style={{ margin: 0 }}>Choose Your Setup</Heading>
        </div>
        <Paragraph>
          The setup depends on whether you're building a VSCode extension or a web application.
        </Paragraph>

        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <Heading level={3} style={{
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
          }}>
            <Icon name="extensions" />
            VSCode Webview Extension
          </Heading>
          <Paragraph>
            For VSCode extensions, the components automatically use VSCode's native theme variables.
            Just add GlobalStyles and start using components:
          </Paragraph>
          <CodeBlock
            code={`import { GlobalStyles, Button, Input, Alert } from '@baukasten/ui';

function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ padding: 'var(--spacing-6)' }}>
        <Alert variant="info" title="Welcome">
          Your extension is now using Baukasten!
        </Alert>
        
        <Input 
          label="Name" 
          placeholder="Enter your name" 
          style={{ marginTop: 'var(--spacing-4)' }}
        />
        
        <Button 
          variant="primary" 
          style={{ marginTop: 'var(--spacing-4)' }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default App;`}
            language="tsx"
          />
        </div>

        <div>
          <Heading level={3} style={{
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
          }}>
            <Icon name="globe" />
            Web Application
          </Heading>
          <Paragraph>
            For web apps, you'll need the theme wrapper to simulate VSCode's theme system:
          </Paragraph>
          <CodeBlock
            code="npm install @baukasten/web-wrapper"
            language="bash"
          />
          <CodeBlock
            code={`import { GlobalStyles, Button, Input, Alert } from '@baukasten/ui';
import { VSCodeThemeWrapper } from '@baukasten/web-wrapper';

function App() {
  return (
    <>
      <GlobalStyles />
      <VSCodeThemeWrapper>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <Alert variant="success" title="Ready to Go">
            Your web app is now using Baukasten!
          </Alert>
          
          <Input 
            label="Email" 
            placeholder="you@example.com" 
            style={{ marginTop: 'var(--spacing-4)' }}
          />
          
          <Button 
            variant="primary" 
            style={{ marginTop: 'var(--spacing-4)' }}
          >
            Get Started
          </Button>
        </div>
      </VSCodeThemeWrapper>
    </>
  );
}

export default App;`}
            language="tsx"
          />
        </div>
      </Section>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
          <StepNumber number={3} />
          <Heading level={2} style={{ margin: 0 }}>Understanding the Basics</Heading>
        </div>

        <div style={{
          display: 'grid',
          gap: 'var(--spacing-4)',
          marginTop: 'var(--spacing-6)',
        }}>
          <div style={{
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-3)',
            }}>
              <Icon name="symbol-color" style={{
                fontSize: '24px',
                color: 'var(--vscode-symbolIcon-colorForeground)',
                marginTop: '2px',
              }} />
              <div>
                <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Automatic Theming
                </Heading>
                <Paragraph>
                  All components automatically adapt to VSCode's theme. Whether your users prefer Dark+,
                  Light+, or any custom theme, your UI will match perfectly.
                </Paragraph>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-3)',
            }}>
              <Icon name="symbol-variable" style={{
                fontSize: '24px',
                color: 'var(--vscode-symbolIcon-variableForeground)',
                marginTop: '2px',
              }} />
              <div>
                <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Design Tokens
                </Heading>
                <Paragraph>
                  Use CSS variables like <code style={{
                    backgroundColor: 'var(--vscode-textCodeBlock-background)',
                    padding: '2px 6px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.9em',
                  }}>var(--spacing-4)</code>, <code style={{
                    backgroundColor: 'var(--vscode-textCodeBlock-background)',
                    padding: '2px 6px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.9em',
                  }}>var(--color-text)</code>, and <code style={{
                    backgroundColor: 'var(--vscode-textCodeBlock-background)',
                    padding: '2px 6px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.9em',
                  }}>var(--border-radius-md)</code> for
                  consistent styling. Check out the <Link href="/foundations/colors" style={{ color: 'var(--vscode-textLink-foreground)' }}>design foundations</Link> to
                  see all available tokens.
                </Paragraph>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-3)',
            }}>
              <Icon name="package" style={{
                fontSize: '24px',
                color: 'var(--vscode-symbolIcon-packageForeground)',
                marginTop: '2px',
              }} />
              <div>
                <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Tree-Shakeable Imports
                </Heading>
                <Paragraph>
                  Import only what you need: <code style={{
                    backgroundColor: 'var(--vscode-textCodeBlock-background)',
                    padding: '2px 6px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.9em',
                  }}>import {`{ Button, Input }`} from '@baukasten/ui'</code>.
                  The bundler will automatically exclude unused components, keeping your bundle size small.
                </Paragraph>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-6)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-3)',
            }}>
              <Icon name="type-hierarchy" style={{
                fontSize: '24px',
                color: 'var(--vscode-symbolIcon-classForeground)',
                marginTop: '2px',
              }} />
              <div>
                <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Full TypeScript Support
                </Heading>
                <Paragraph>
                  Every component is fully typed with comprehensive TypeScript definitions.
                  Get IntelliSense, autocomplete, and type checking out of the box.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
          <StepNumber number={4} />
          <Heading level={2} style={{ margin: 0 }}>Explore Components</Heading>
        </div>
        <Paragraph>
          Now that you have Baukasten installed, explore the component library to see what's available:
        </Paragraph>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-4)',
          marginTop: 'var(--spacing-6)',
        }}>
          <Link href="/components/button" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'var(--vscode-sideBar-background)',
              border: '1px solid var(--vscode-panel-border)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--spacing-6)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              height: '100%',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-panel-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <Icon name="symbol-method" style={{
                fontSize: '32px',
                color: 'var(--vscode-symbolIcon-methodForeground)',
                marginBottom: 'var(--spacing-3)',
              }} />
              <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                Components
              </Heading>
              <Paragraph>
                Browse 30+ production-ready components with live examples and props documentation.
              </Paragraph>
            </div>
          </Link>

          <Link href="/foundations/colors" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'var(--vscode-sideBar-background)',
              border: '1px solid var(--vscode-panel-border)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--spacing-6)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              height: '100%',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-panel-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <Icon name="symbol-color" style={{
                fontSize: '32px',
                color: 'var(--vscode-symbolIcon-colorForeground)',
                marginBottom: 'var(--spacing-3)',
              }} />
              <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                Design Foundations
              </Heading>
              <Paragraph>
                Learn about colors, typography, spacing, and effects in the design system.
              </Paragraph>
            </div>
          </Link>

          <Link href="/installation" style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'var(--vscode-sideBar-background)',
              border: '1px solid var(--vscode-panel-border)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--spacing-6)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              height: '100%',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--vscode-panel-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <Icon name="book" style={{
                fontSize: '32px',
                color: 'var(--vscode-symbolIcon-namespaceForeground)',
                marginBottom: 'var(--spacing-3)',
              }} />
              <Heading level={4} style={{ margin: '0 0 var(--spacing-2) 0' }}>
                Full Installation Guide
              </Heading>
              <Paragraph>
                Detailed setup instructions for Next.js, React, Vite, and more.
              </Paragraph>
            </div>
          </Link>
        </div>
      </Section>

      <Alert
        variant="success"
        icon={<Icon name="check" />}
        title="You're All Set!"
      >
        <div>
          <p style={{ margin: '0 0 var(--spacing-3) 0' }}>
            You now have everything you need to start building with Baukasten. Here are some tips to get the most out of the library:
          </p>
          <ul style={{ margin: '0', paddingLeft: 'var(--spacing-5)' }}>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Use the component docs to explore all available props and variants</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Leverage design tokens (CSS variables) for consistent custom styling</li>
            <li style={{ marginBottom: 'var(--spacing-2)' }}>Check out the Storybook for interactive component examples</li>
            <li>Join the community to share feedback and get help</li>
          </ul>
        </div>
      </Alert>
    </PageLayout>
  );
}

