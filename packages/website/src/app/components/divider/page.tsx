'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Divider, Button, Input, FieldLabel } from 'baukasten-ui/core';

const dividerProps: PropDefinition[] = [
  {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Orientation of the divider',
  },
  {
    name: 'variant',
    type: '"solid" | "dashed" | "dotted"',
    default: '"solid"',
    description: 'Border style of the divider line',
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Optional label text to display in the divider (horizontal only)',
  },
  {
    name: 'labelAlign',
    type: '"left" | "center" | "right"',
    default: '"center"',
    description: 'Label alignment when label is provided',
  },
  {
    name: 'spacing',
    type: 'string',
    default: '"var(--bk-spacing-4)"',
    description: 'Vertical spacing for horizontal or horizontal spacing for vertical dividers',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Custom color for the divider line',
  },
];

const Paragraph = ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => (
  <p style={{ margin: 0, fontSize: 'var(--bk-font-size-md)', color: 'var(--vscode-foreground)', ...props.style }}>
    {children}
  </p>
);

export default function DividerPage() {
  return (
    <PageLayout
      title="Divider"
      description="A simple component for creating visual separation between content sections with support for labels and multiple styles."
    >
      <Showcase
        title="Basic Usage"
        description="The most basic usage - a simple horizontal line separating content."
        preview={
          <div style={{ maxWidth: '600px' }}>
            <Paragraph>This is some content above the divider.</Paragraph>
            <Divider />
            <Paragraph>This is content below the divider.</Paragraph>
          </div>
        }
        code={`import { Divider } from 'baukasten-ui/core';

function App() {
  return (
    <div>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  );
}`}
      />

      <Showcase
        title="With Label"
        description="Add a label in the center of the divider. Commonly used for 'OR' in forms."
        preview={
          <div style={{ maxWidth: '600px' }}>
            <Paragraph>Sign in with your existing account</Paragraph>
            <Divider label="OR" />
            <Paragraph>Create a new account to get started</Paragraph>
          </div>
        }
        code={`<div>
  <p>Sign in with your existing account</p>
  <Divider label="OR" />
  <p>Create a new account to get started</p>
</div>`}
      />

      <Showcase
        title="Label Alignment"
        description="Labels can be aligned left, center (default), or right within the divider."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
            <div>
              <Paragraph style={{ marginBottom: 'var(--bk-spacing-2)' }}>Content before section</Paragraph>
              <Divider label="Getting Started" labelAlign="left" />
              <Paragraph style={{ marginTop: 'var(--bk-spacing-2)' }}>Follow these steps to begin.</Paragraph>
            </div>

            <div>
              <Paragraph style={{ marginBottom: 'var(--bk-spacing-2)' }}>This is the main content.</Paragraph>
              <Divider label="Section Break" labelAlign="center" />
              <Paragraph style={{ marginTop: 'var(--bk-spacing-2)' }}>More content after centered divider.</Paragraph>
            </div>

            <div>
              <Paragraph style={{ marginBottom: 'var(--bk-spacing-2)' }}>Content continues here.</Paragraph>
              <Divider label="End" labelAlign="right" />
              <Paragraph style={{ marginTop: 'var(--bk-spacing-2)' }}>This is the final section.</Paragraph>
            </div>
          </div>
        }
        code={`<Divider label="Getting Started" labelAlign="left" />
<Divider label="Section Break" labelAlign="center" />
<Divider label="End" labelAlign="right" />`}
      />

      <Showcase
        title="Border Styles"
        description="Three border styles available: solid (default), dashed, and dotted."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
            <div>
              <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 600 }}>
                Solid (default)
              </div>
              <Paragraph>Content above solid divider</Paragraph>
              <Divider variant="solid" />
              <Paragraph>Content below solid divider</Paragraph>
            </div>

            <div>
              <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 600 }}>
                Dashed
              </div>
              <Paragraph>Content above dashed divider</Paragraph>
              <Divider variant="dashed" />
              <Paragraph>Content below dashed divider</Paragraph>
            </div>

            <div>
              <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 600 }}>
                Dotted
              </div>
              <Paragraph>Content above dotted divider</Paragraph>
              <Divider variant="dotted" />
              <Paragraph>Content below dotted divider</Paragraph>
            </div>
          </div>
        }
        code={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />`}
      />

      <Showcase
        title="Vertical Orientation"
        description="Vertical dividers separate content horizontally. Best used in flex containers with a defined height."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: 'var(--bk-spacing-4)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paragraph>Left content</Paragraph>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paragraph>Right content</Paragraph>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', height: '40px', gap: 'var(--bk-spacing-3)' }}>
              <Button variant="primary">Button 1</Button>
              <Divider orientation="vertical" spacing="var(--bk-spacing-2)" />
              <Button variant="secondary">Button 2</Button>
              <Divider orientation="vertical" spacing="var(--bk-spacing-2)" />
              <Button variant="ghost">Button 3</Button>
            </div>
          </div>
        }
        code={`// Between content sections (requires height on parent)
<div style={{ display: 'flex', height: '100px' }}>
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</div>

// Between buttons (requires height on parent)
<div style={{ display: 'flex', height: '40px' }}>
  <Button>Button 1</Button>
  <Divider orientation="vertical" spacing="var(--bk-spacing-2)" />
  <Button>Button 2</Button>
</div>`}
      />

      <Showcase
        title="Custom Spacing"
        description="Control the spacing around dividers using the spacing prop. Default is var(--bk-spacing-4)."
        preview={
          <div style={{ maxWidth: '600px' }}>
            <div>
              <Paragraph>Content with minimal spacing</Paragraph>
              <Divider spacing="var(--bk-spacing-1)" />
              <Paragraph>Very tight spacing (spacing-1)</Paragraph>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)' }}>
              <Paragraph>Content with default spacing</Paragraph>
              <Divider spacing="var(--bk-spacing-4)" />
              <Paragraph>Default spacing (spacing-4)</Paragraph>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)' }}>
              <Paragraph>Content with generous spacing</Paragraph>
              <Divider spacing="var(--bk-spacing-8)" />
              <Paragraph>Large spacing (spacing-8)</Paragraph>
            </div>
          </div>
        }
        code={`<Divider spacing="var(--bk-spacing-1)" />
<Divider spacing="var(--bk-spacing-4)" />
<Divider spacing="var(--bk-spacing-8)" />`}
      />

      <Showcase
        title="Custom Colors"
        description="Customize divider color using the color prop with any valid CSS color or design token."
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
            <div>
              <Paragraph>Default border color</Paragraph>
              <Divider />
              <Paragraph>Uses the theme's border color</Paragraph>
            </div>

            <div>
              <Paragraph>Primary color divider</Paragraph>
              <Divider color="var(--vscode-button-background)" />
              <Paragraph>Stands out with brand color</Paragraph>
            </div>

            <div>
              <Paragraph>Success color divider</Paragraph>
              <Divider color="var(--vscode-terminal-ansiGreen)" />
              <Paragraph>Green for positive sections</Paragraph>
            </div>

            <div>
              <Paragraph>Warning color divider</Paragraph>
              <Divider color="var(--vscode-terminal-ansiYellow)" />
              <Paragraph>Yellow for caution sections</Paragraph>
            </div>

            <div>
              <Paragraph>Error color divider</Paragraph>
              <Divider color="var(--vscode-terminal-ansiRed)" />
              <Paragraph>Red for important sections</Paragraph>
            </div>
          </div>
        }
        code={`<Divider color="var(--vscode-button-background)" />
<Divider color="var(--vscode-terminal-ansiGreen)" />
<Divider color="var(--vscode-terminal-ansiYellow)" />
<Divider color="var(--vscode-terminal-ansiRed)" />`}
      />

      <Showcase
        title="Form Example"
        description="Common use case: separating social login buttons from email/password form with an 'OR' divider."
        preview={
          <div style={{
            maxWidth: '400px',
            padding: 'var(--bk-spacing-6)',
            backgroundColor: 'var(--vscode-sideBar-background)',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--bk-radius-md)',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: 'var(--bk-spacing-4)', fontSize: 'var(--bk-font-size-xl)', fontWeight: 600 }}>
              Sign In
            </h2>

            <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
              <Button variant="primary" width="block">
                Sign in with Google
              </Button>
            </div>

            <div style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              <Button variant="secondary" width="block">
                Sign in with GitHub
              </Button>
            </div>

            <Divider label="OR" />

            <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
              <FieldLabel style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)' }}>
                Email
              </FieldLabel>
              <Input
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              <FieldLabel style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)' }}>
                Password
              </FieldLabel>
              <Input
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button variant="primary" width="block">
              Sign In
            </Button>
          </div>
        }
        code={`<div>
  <h2>Sign In</h2>
  
  <Button variant="primary" width="block">
    Sign in with Google
  </Button>
  
  <Button variant="secondary" width="block">
    Sign in with GitHub
  </Button>
  
  <Divider label="OR" />
  
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="your@email.com" />
  
  <FieldLabel>Password</FieldLabel>
  <Input type="password" placeholder="••••••••" />
  
  <Button variant="primary" width="block">
    Sign In
  </Button>
</div>`}
      />

      <Showcase
        title="Content Sections"
        description="Using left-aligned labeled dividers to organize documentation or long-form content into clear sections."
        preview={
          <div style={{ maxWidth: '700px' }}>
            <h1 style={{ fontSize: 'var(--bk-font-size-2xl)', fontWeight: 700, marginTop: 0, marginBottom: 'var(--bk-spacing-3)' }}>
              Documentation
            </h1>

            <Paragraph style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              Welcome to our comprehensive documentation. This guide will help you understand
              all the features and capabilities of our platform.
            </Paragraph>

            <Divider label="Introduction" labelAlign="left" />

            <Paragraph style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              Our platform provides a complete solution for building modern web applications.
              It includes everything you need to get started quickly and scale efficiently.
            </Paragraph>

            <Divider label="Getting Started" labelAlign="left" />

            <Paragraph style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              To begin, install the package using your preferred package manager. Follow the
              installation guide and you'll be up and running in minutes.
            </Paragraph>

            <Divider label="Key Features" labelAlign="left" />

            <Paragraph style={{ marginBottom: 'var(--bk-spacing-4)' }}>
              The platform offers numerous features including real-time collaboration,
              advanced analytics, seamless integrations, and enterprise-grade security.
            </Paragraph>

            <Divider label="Next Steps" labelAlign="left" />

            <Paragraph>
              Now that you understand the basics, explore our API reference and check out
              the example projects to see the platform in action.
            </Paragraph>
          </div>
        }
        code={`<div>
  <h1>Documentation</h1>
  <p>Welcome to our comprehensive documentation...</p>

  <Divider label="Introduction" labelAlign="left" />
  <p>Our platform provides a complete solution...</p>

  <Divider label="Getting Started" labelAlign="left" />
  <p>To begin, install the package...</p>

  <Divider label="Key Features" labelAlign="left" />
  <p>The platform offers numerous features...</p>

  <Divider label="Next Steps" labelAlign="left" />
  <p>Now that you understand the basics...</p>
</div>`}
        props={dividerProps}
      />
    </PageLayout>
  );
}



