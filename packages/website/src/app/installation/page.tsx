'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Heading, Alert, Icon, Code } from 'baukasten-ui';

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
        <CodeBlock code="npm install baukasten-ui" language="bash" />
      </Section>

      <Section>
        <Heading level={2}>CSS Files</Heading>
        <Paragraph>
          Baukasten provides pre-built CSS files for different platforms. Import the appropriate CSS files based on your target environment:
        </Paragraph>

        <div style={{
          backgroundColor: 'var(--color-background-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--font-size-sm)',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: 'var(--spacing-2) var(--spacing-4)', fontWeight: 'var(--font-weight-semibold)' }}>File</th>
                <th style={{ textAlign: 'left', padding: 'var(--spacing-2) var(--spacing-4)', fontWeight: 'var(--font-weight-semibold)' }}>Description</th>
                <th style={{ textAlign: 'left', padding: 'var(--spacing-2) var(--spacing-4)', fontWeight: 'var(--font-weight-semibold)' }}>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}><Code>baukasten-base.css</Code></td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Component styles (vanilla-extract)</td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Required for all platforms</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}><Code>baukasten-vscode.css</Code></td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Uses <Code>--vscode-*</Code> CSS variables</td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>VS Code extensions</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}><Code>baukasten-theia.css</Code></td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Uses <Code>--theia-*</Code> CSS variables</td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Eclipse Theia applications</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}><Code>baukasten-web.css</Code></td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Uses default fallback values</td>
                <td style={{ padding: 'var(--spacing-2) var(--spacing-4)', color: 'var(--color-text-secondary)' }}>Standalone web applications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <Heading level={2}>VSCode Extension Setup</Heading>
        <Paragraph>
          For VSCode webview extensions, import the base styles and the VSCode-specific CSS file:
        </Paragraph>
        <CodeBlock
          code={`// Import the required CSS files
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-vscode.css';

import { Button } from 'baukasten-ui';

function App() {
  return (
    <div>
      <Button>Hello VSCode</Button>
    </div>
  );
}`}
          language="tsx"
        />
        <Paragraph>
          The components will automatically use VSCode's native theme variables, adapting to light/dark themes.
        </Paragraph>
      </Section>

      <Section>
        <Heading level={2}>Eclipse Theia Setup</Heading>
        <Paragraph>
          For Eclipse Theia applications, use the Theia-specific CSS file:
        </Paragraph>
        <CodeBlock
          code={`// Import the required CSS files
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-theia.css';

import { Button } from 'baukasten-ui';

function App() {
  return (
    <div>
      <Button>Hello Theia</Button>
    </div>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Standalone Web Application Setup</Heading>
        <Paragraph>
          For standalone web applications, use the web CSS file which includes sensible default values:
        </Paragraph>
        <CodeBlock
          code={`// Import the required CSS files
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';

import { Button } from 'baukasten-ui';

function App() {
  return (
    <div>
      <Button>Hello Web</Button>
    </div>
  );
}`}
          language="tsx"
        />
        <Paragraph>
          You can customize the theme by overriding the CSS variables. See the <a href="/guides/theming" style={{ color: 'var(--color-link)' }}>Theming Guide</a> for details.
        </Paragraph>
      </Section>

      <Section>
        <Heading level={2}>Using with baukasten-ui-web-wrapper (Optional)</Heading>
        <Paragraph>
          For advanced theme management with pre-built theme presets and theme switching, you can optionally use the web wrapper package:
        </Paragraph>
        <CodeBlock code="npm install baukasten-ui-web-wrapper" language="bash" />
        <Paragraph>
          This package provides VSCode-compatible themes that can be dynamically switched at runtime.
        </Paragraph>
        <CodeBlock
          code={`import 'baukasten-ui/dist/baukasten-base.css';
import { Button } from 'baukasten-ui';
import { VSCodeThemeWrapper } from 'baukasten-ui-web-wrapper';

function App() {
  return (
    <VSCodeThemeWrapper>
      <Button>Hello Web</Button>
    </VSCodeThemeWrapper>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Next.js Setup</Heading>
        <Paragraph>
          For Next.js applications, you may need to configure package transpilation in next.config.js.
          This tells Next.js to compile the packages through its build pipeline, which is needed because
          baukasten-ui is distributed as ESM and uses modern JavaScript features:
        </Paragraph>
        <CodeBlock
          code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile these packages through Next.js build pipeline
  // Required for proper ESM support and CSS processing
  transpilePackages: ['baukasten-ui', 'baukasten-ui-web-wrapper'],
}

module.exports = nextConfig`}
          language="javascript"
        />
        <Paragraph>
          Then import the CSS files in your root layout:
        </Paragraph>
        <CodeBlock
          code={`// app/layout.tsx
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
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
          code={`import { Button, Input, Badge } from 'baukasten-ui';

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
        <Heading level={2}>Legacy: GlobalStyles Component</Heading>
        <Alert variant="warning" style={{ marginBottom: 'var(--spacing-4)' }}>
          The GlobalStyles component is deprecated. Please use the CSS file imports shown above instead.
        </Alert>
        <Paragraph>
          For legacy applications, you can still use the GlobalStyles component, but this approach is deprecated
          and will be removed in a future version:
        </Paragraph>
        <CodeBlock
          code={`// DEPRECATED - Use CSS imports instead
import { GlobalStyles, Button } from 'baukasten-ui';

function App() {
  return (
    <>
      <GlobalStyles />
      <Button>Hello</Button>
    </>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section>
        <Heading level={2}>Next Steps</Heading>
        <Paragraph>
          Now that you have Baukasten installed, explore the component documentation
          to see what's available and how to use each component. Check out the{' '}
          <a href="/guides/theming" style={{ color: 'var(--color-link)' }}>Theming Guide</a>{' '}
          to learn how to customize the appearance of your application.
        </Paragraph>
      </Section>
    </PageLayout>
  );
}
