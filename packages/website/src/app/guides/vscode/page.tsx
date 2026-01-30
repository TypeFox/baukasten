'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import { Heading, Alert, Icon, Divider } from 'baukasten-ui';

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

export default function VSCodeGuidePage() {
    return (
        <PageLayout
            title="Usage in VS Code"
            description="Learn how to use Baukasten components in VS Code webview extensions."
        >
            <Alert variant="info" icon={<Icon name="extensions" />} style={{ marginBottom: 'var(--bk-spacing-8)' }}>
                Baukasten is designed to work seamlessly with VS Code webviews, automatically using VS Code's native theme variables for consistent styling.
            </Alert>

            <Section>
                <Heading level={2}>Installation</Heading>
                <Paragraph>
                    Install Baukasten in your VS Code extension project:
                </Paragraph>
                <CodeBlock
                    code="npm install baukasten-ui react react-dom"
                    language="bash"
                />
            </Section>

            <Section>
                <Heading level={2}>Basic Setup</Heading>
                <Paragraph>
                    In your webview React application, import the styles and components:
                </Paragraph>
                <CodeBlock
                    code={`import { GlobalStyles, Button, Input, Alert } from 'baukasten-ui';

function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ padding: 'var(--bk-spacing-6)' }}>
        <Alert variant="info" title="Welcome">
          Your VS Code extension is using Baukasten!
        </Alert>
        
        <Input 
          label="Search" 
          placeholder="Type to search..." 
          style={{ marginTop: 'var(--bk-spacing-4)' }}
        />
        
        <Button variant="primary" style={{ marginTop: 'var(--bk-spacing-4)' }}>
          Search
        </Button>
      </div>
    </>
  );
}

export default App;`}
                    language="tsx"
                />
            </Section>

            <Section>
                <Heading level={2}>Using CSS Files (Alternative)</Heading>
                <Paragraph>
                    Instead of using <code style={{
                        backgroundColor: 'var(--vscode-textCodeBlock-background)',
                        padding: '2px 6px',
                        borderRadius: 'var(--bk-radius-sm)',
                    }}>GlobalStyles</code>, you can import the pre-built CSS files:
                </Paragraph>
                <CodeBlock
                    code={`// Import base styles (required)
import 'baukasten-ui/dist/baukasten-base.css';

// Import VS Code-specific CSS variables
import 'baukasten-ui/dist/baukasten-vscode.css';`}
                    language="tsx"
                />
            </Section>
        </PageLayout>
    );
}
