'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Heading } from 'baukasten';

const Section = ({ children }: { children: React.ReactNode }) => (
  <section style={{ marginBottom: 'var(--padding-2xl)' }}>{children}</section>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 'var(--font-size-md)',
    color: 'var(--color-text-secondary)',
    margin: '0 0 var(--padding-md) 0',
    lineHeight: 'var(--line-height-relaxed)',
  }}>{children}</p>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul style={{
    fontSize: 'var(--font-size-md)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-relaxed)',
    margin: 'var(--padding-md) 0',
    paddingLeft: 'var(--padding-xl)',
  }}>{children}</ul>
);

export default function InstallationPage() {
  return (
    <PageLayout
      title="Installation"
      description="Get started with Baukasten in your project."
    >
      <Section>
        <Heading level={2}>Prerequisites</Heading>
        <Paragraph>
          Before installing Baukasten, make sure you have the following installed:
        </Paragraph>
        <List>
          <li>Node.js 18.0.0 or higher</li>
          <li>npm 9.0.0 or higher</li>
          <li>React 19.0.0 or higher</li>
        </List>
      </Section>

      <Section>
        <Heading level={2}>Install the Package</Heading>
        <Paragraph>
          Install Baukasten and its peer dependencies using npm:
        </Paragraph>
        <CodeBlock code="npm install @baukasten/ui" language="bash" />
      </Section>

      <Section>
        <Heading level={2}>VSCode Webview Setup</Heading>
        <Paragraph>
          If you're building a VSCode webview extension, set up your component with GlobalStyles:
        </Paragraph>
        <CodeBlock
          code={`import { GlobalStyles, Button } from 'baukasten';

function App() {
  return (
    <>
      <GlobalStyles />
      <Button>Hello VSCode</Button>
    </>
  );
}`}
          language="tsx"
        />
        <Paragraph>
          The components will automatically use VSCode's native theme variables.
        </Paragraph>
      </Section>

      <Section>
        <Heading level={2}>Web Application Setup</Heading>
        <Paragraph>
          For web applications or Storybook demos, you'll need the VSCodeThemeWrapper:
        </Paragraph>
        <CodeBlock code="npm install @baukasten/web-wrapper" language="bash" />
        <Paragraph>
          Then wrap your application:
        </Paragraph>
        <CodeBlock
          code={`import { GlobalStyles, Button } from 'baukasten';
import { VSCodeThemeWrapper } from 'baukasten-web-wrapper';

function App() {
  return (
    <>
      <GlobalStyles />
      <VSCodeThemeWrapper>
        <Button>Hello Web</Button>
      </VSCodeThemeWrapper>
    </>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Next.js Setup</Heading>
        <Paragraph>
          For Next.js applications, configure package transpilation in next.config.js:
        </Paragraph>
        <CodeBlock
          code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['baukasten', 'baukasten-web-wrapper'],
}

module.exports = nextConfig`}
          language="javascript"
        />
        <Paragraph>
          Then set up your layout:
        </Paragraph>
        <CodeBlock
          code={`// app/layout.tsx
import { GlobalStyles } from 'baukasten';
import { VSCodeThemeWrapper } from 'baukasten-web-wrapper';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GlobalStyles />
        <VSCodeThemeWrapper>
          {children}
        </VSCodeThemeWrapper>
      </body>
    </html>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Import Components</Heading>
        <Paragraph>
          Import individual components as needed:
        </Paragraph>
        <CodeBlock
          code={`import { Button, Input, Badge } from 'baukasten';

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Input label="Name" />
      <Badge>New</Badge>
    </div>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Using Design Tokens</Heading>
        <Paragraph>
          You can access the design token system for custom styling:
        </Paragraph>
        <CodeBlock
          code={`// Use CSS variables directly in inline styles
const CustomDiv = () => (
  <div style={{
    padding: 'var(--padding-md)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--color-text)',
  }}>
    Content
  </div>
);`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Next Steps</Heading>
        <Paragraph>
          Now that you have Baukasten installed, explore the component documentation
          to see what's available and how to use each component.
        </Paragraph>
      </Section>
    </PageLayout>
  );
}
