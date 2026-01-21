import { Badge, Button, Code, GlobalStyles, Heading, Icon, Image, Input, Link, Paragraph, Text } from '@baukasten/ui';
import { VSCodeThemeWrapper } from '@baukasten/web-wrapper';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value && !value.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <VSCodeThemeWrapper>
      <GlobalStyles />
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

        <section style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: 600 }}>
            Baukasten UI Toolkit
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '32px', lineHeight: 1.6 }}>
            A comprehensive webview UI toolkit for VSCode extensions. Built with React,
            vanilla-extract, and designed to match VSCode's native look and feel.
          </p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Buttons</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Button Variants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Button Sizes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Button States</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button disabled>Disabled Button</Button>
                <Button width="block">Full Width Button</Button>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Icons</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Icon Sizes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Icon name="check" size="sm" />
                  <Icon name="check" size="md" />
                  <Icon name="check" size="lg" />
                  <Icon name="check" size="xl" />
                  <Icon name="check" size="2xl" />
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Common Icons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Icon name="check" color="var(--color-success)" size="lg" />
                  <Icon name="error" color="var(--color-danger)" size="lg" />
                  <Icon name="warning" color="var(--color-warning)" size="lg" />
                  <Icon name="info" color="var(--color-info)" size="lg" />
                  <Icon name="search" size="lg" />
                  <Icon name="settings" size="lg" />
                  <Icon name="close" size="lg" />
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Icons with Buttons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button>
                    <Icon name="save" />
                    Save
                  </Button>
                  <Button variant="secondary">
                    <Icon name="close" />
                    Cancel
                  </Button>
                  <Button circular>
                    <Icon name="add" />
                  </Button>
                  <Button circular variant="ghost">
                    <Icon name="more" />
                  </Button>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Animated Icons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Icon name="loading" spin size="lg" />
                  <Icon name="sync" spin size="lg" />
                  <Icon name="arrow-right" rotate={45} size="lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Input Fields</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Basic Input</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input
                  placeholder="Enter text..."
                />
                <Input
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Input with Validation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={handleEmailChange}
                  error={emailError}
                />
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Input States</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input
                  placeholder="This is disabled"
                  disabled
                />
                <Input
                  placeholder="Full width input"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Badges</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Badge Variants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge>Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Badge Sizes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge size="sm">Small Badge</Badge>
                  <Badge size="md">Medium Badge</Badge>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Badge Usage Examples</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>Status:</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>Version:</span>
                  <Badge>v1.0.0</Badge>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>Priority:</span>
                  <Badge variant="error">High</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Typography</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Headings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Text Variants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Text>Default text</Text>
                <Text weight="bold" color="primary">Bold primary text</Text>
                <Text size="sm" color="muted">Small muted text</Text>
                <Text monospace>Monospace text</Text>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Paragraphs & Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Paragraph size="md">
                  This is a paragraph with <Link href="#" variant="primary">a link</Link> inside it.
                  Paragraphs are great for body content.
                </Paragraph>
                <Link href="https://github.com" external>External link</Link>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Code Examples</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Paragraph size="sm">
                  Inline code: <Code>const x = 42;</Code>
                </Paragraph>
                <Code block>
                  {`function hello() {
  return "Hello, World!";
}`}
                </Code>
              </div>
            </div>

            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Images</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '120px' }}>
                  <Image
                    src="https://picsum.photos/300/300"
                    alt="Avatar"
                    aspectRatio="1/1"
                    radius="full"
                  />
                </div>
                <Image
                  src="https://picsum.photos/400/250"
                  alt="Sample"
                  aspectRatio="16/9"
                  caption="Image with caption"
                  bordered
                />
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>Form Example</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div style={{ padding: 'var(--spacing-6)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: 'var(--border-width-1) solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>User Registration Form</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input
                  placeholder="John Doe"
                  fullWidth
                />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  fullWidth
                />
                <Input
                  type="password"
                  placeholder="Enter password"
                  fullWidth
                />
                <Button variant="primary" width="block">
                  Create Account
                </Button>
                <Badge variant='success'>Success</Badge>
              </div>
            </div>
          </div>
        </section>
      </div>
    </VSCodeThemeWrapper>
  );
}

export default App;

