'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import { Heading, Alert, Icon, Divider } from 'baukasten-ui/core';

const Section = ({ children }: { children: React.ReactNode }) => (
    <section style={{ marginBottom: 'var(--bk-spacing-12)' }}>{children}</section>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p style={{
        fontSize: 'var(--bk-font-size-md)',
        color: 'var(--bk-color-text-secondary)',
        margin: '0 0 var(--bk-spacing-4) 0',
        lineHeight: 'var(--bk-line-height-relaxed)',
    }}>{children}</p>
);

export default function TheiaGuidePage() {
    return (
        <PageLayout
            title="Usage in Eclipse Theia"
            description="Learn how to use Baukasten components in Eclipse Theia applications, including multi-window support."
        >
            <Alert variant="info" icon={<Icon name="window" />} style={{ marginBottom: 'var(--bk-spacing-8)' }}>
                Baukasten supports Eclipse Theia applications with special handling for multi-window scenarios where secondary/popup windows are common.
            </Alert>

            <Section>
                <Heading level={2}>Installation</Heading>
                <Paragraph>
                    Install Baukasten in your Theia application:
                </Paragraph>
                <CodeBlock
                    code="npm install baukasten-ui react react-dom"
                    language="bash"
                />
            </Section>

            <Section>
                <Heading level={2}>Basic Setup</Heading>
                <Paragraph>
                    Import the base styles and Theia-specific CSS variables:
                </Paragraph>
                <CodeBlock
                    code={`// Import base styles (required)
import 'baukasten-ui/dist/baukasten-base.css';

// Import Theia-specific CSS variables
import 'baukasten-ui/dist/baukasten-theia.css';`}
                    language="tsx"
                />
                <Paragraph>
                    Then use components in your application:
                </Paragraph>
                <CodeBlock
                    code={`import { Button, Input, Select, Alert } from 'baukasten-ui/core';

function MyTheiaWidget() {
  return (
    <div style={{ padding: 'var(--bk-spacing-6)' }}>
      <Alert variant="info" title="Eclipse Theia">
        Your Theia widget is using Baukasten!
      </Alert>
      
      <Select
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        placeholder="Select an option"
        style={{ marginTop: 'var(--bk-spacing-4)' }}
      />
      
      <Button variant="primary" style={{ marginTop: 'var(--bk-spacing-4)' }}>
        Execute
      </Button>
    </div>
  );
}`}
                    language="tsx"
                />
            </Section>

            <Divider style={{ margin: 'var(--bk-spacing-8) 0' }} />

            <Section>
                <Heading level={2}>Multi-Window Support</Heading>
                <Alert variant="warning" icon={<Icon name="warning" />} style={{ marginBottom: 'var(--bk-spacing-6)' }}>
                    <strong>Important:</strong> If you're using Baukasten in Theia secondary/popup windows, you need to use <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code> to ensure dropdowns and tooltips render correctly.
                </Alert>

                <Heading level={3}>The Problem</Heading>
                <Paragraph>
                    Portal-based components like Select, Dropdown, Tooltip, and ContextMenu render their floating
                    content using React portals. By default, these portals target the main window's <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>document.body</code>.
                </Paragraph>
                <Paragraph>
                    In Theia's multi-window scenarios, when a component is rendered in a secondary window but its
                    portal content goes to the main window's body, dropdowns appear on the wrong window!
                </Paragraph>

                <Heading level={3}>The Solution: PortalProvider</Heading>
                <Paragraph>
                    Wrap your secondary window content with <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code> to redirect portal content to the correct window:
                </Paragraph>
                <CodeBlock
                    code={`import { useRef, useState, useEffect } from 'react';
import { PortalProvider, Select, Dropdown, Tooltip, Button } from 'baukasten-ui/core';

function SecondaryWindowContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  
  // Wait for the ref to be available before rendering portal content
  useEffect(() => {
    setReady(true);
  }, []);
  
  return (
    <div ref={rootRef} style={{ height: '100%', width: '100%' }}>
      {ready && (
        <PortalProvider root={rootRef.current}>
          {/* All portal content will now render in this window */}
          
          <Select
            options={[
              { value: 'ts', label: 'TypeScript' },
              { value: 'js', label: 'JavaScript' },
              { value: 'py', label: 'Python' },
            ]}
            placeholder="Select a language"
          />
          
          <Dropdown trigger={<Button>Open Menu</Button>}>
            <div style={{ padding: 'var(--bk-spacing-4)' }}>
              Menu content appears in the correct window!
            </div>
          </Dropdown>
          
          <Tooltip content="This tooltip also renders correctly!">
            <Button>Hover me</Button>
          </Tooltip>
        </PortalProvider>
      )}
    </div>
  );
}`}
                    language="tsx"
                />
            </Section>

            <Section>
                <Heading level={2}>Components Using Portals</Heading>
                <Paragraph>
                    These components render floating content via portals and respect <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code>:
                </Paragraph>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--bk-spacing-4)',
                    marginTop: 'var(--bk-spacing-4)',
                }}>
                    {[
                        { name: 'Select', desc: 'Dropdown options list', path: '/components/select' },
                        { name: 'Dropdown', desc: 'Generic dropdown container', path: '/components/dropdown' },
                        { name: 'Tooltip', desc: 'Hover tooltips', path: '/components/tooltip' },
                        { name: 'ContextMenu', desc: 'Right-click menus', path: '/components/contextmenu' },
                        { name: 'ButtonGroup', desc: 'Split button dropdowns', path: '/components/buttongroup' },
                    ].map(item => (
                        <Link key={item.name} href={item.path} style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'var(--vscode-sideBar-background)',
                                border: '1px solid var(--vscode-panel-border)',
                                borderRadius: 'var(--bk-radius-md)',
                                padding: 'var(--bk-spacing-4)',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--vscode-panel-border)'}>
                                <Heading level={4} style={{ margin: '0 0 var(--bk-spacing-1) 0' }}>{item.name}</Heading>
                                <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: 'var(--bk-font-size-sm)' }}>
                                    {item.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section>
                <Heading level={2}>API Reference</Heading>

                <Heading level={3}>PortalProvider</Heading>
                <Paragraph>
                    A context provider that configures where portal content should be rendered.
                </Paragraph>
                <CodeBlock
                    code={`interface PortalProviderProps {
  /**
   * The root element where portals should be rendered.
   * In multi-window apps, this should be an element in the current window.
   */
  root: HTMLElement | null;
  
  /**
   * The content to render within this portal context.
   */
  children: React.ReactNode;
}`}
                    language="typescript"
                />

                <Heading level={3}>usePortalRoot Hook</Heading>
                <Paragraph>
                    A hook to access the portal root element. Useful if you're building custom portal-based components:
                </Paragraph>
                <CodeBlock
                    code={`import { usePortalRoot } from 'baukasten-ui/core';
import { FloatingPortal } from '@floating-ui/react';

function CustomFloatingComponent() {
  const portalRoot = usePortalRoot();
  
  return (
    <FloatingPortal root={portalRoot}>
      <div>My floating content</div>
    </FloatingPortal>
  );
}`}
                    language="tsx"
                />
            </Section>

            <Section>
                <Heading level={2}>Backward Compatibility</Heading>
                <Paragraph>
                    If <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code> is not used, components fall back to their default behavior (rendering
                    to <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>document.body</code>). This means:
                </Paragraph>
                <ul style={{
                    color: 'var(--bk-color-text-secondary)',
                    lineHeight: 'var(--bk-line-height-relaxed)',
                    paddingLeft: 'var(--bk-spacing-6)',
                }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>Existing code continues to work without changes</li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>Single-window applications don't need <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code></li>
                    <li>Only add <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>PortalProvider</code> when using secondary windows in Theia</li>
                </ul>
            </Section>

            <Divider style={{ margin: 'var(--bk-spacing-8) 0' }} />

            <Alert variant="success" icon={<Icon name="check" />} title="You're Ready for Multi-Window!">
                <Paragraph>
                    Your Theia application is now ready to use Baukasten components in both main and secondary windows.
                    For more component details, explore the <Link href="/components/select" style={{ color: 'var(--vscode-textLink-foreground)' }}>component documentation</Link>.
                </Paragraph>
            </Alert>
        </PageLayout>
    );
}
