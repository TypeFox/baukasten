'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Spinner, Button, Heading } from 'baukasten-ui';

const spinnerProps: PropDefinition[] = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the spinner',
    },
    {
        name: 'color',
        type: 'string',
        description: 'Custom color for the spinner (uses semantic token or CSS value)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
    {
        name: 'style',
        type: 'React.CSSProperties',
        description: 'Inline styles',
    },
    {
        name: 'aria-label',
        type: 'string',
        default: '"Loading"',
        description: 'Accessible label for screen readers',
    },
];

// Loading simulation example
function LoadingSimulation() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<string | null>(null);

    const handleLoad = () => {
        setIsLoading(true);
        setData(null);

        setTimeout(() => {
            setData('Data loaded successfully!');
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div style={{ minWidth: '400px' }}>
            <div style={{
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
            }}>
                <Heading level={4} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Data Fetcher
                </Heading>

                <Button
                    onClick={handleLoad}
                    disabled={isLoading}
                    variant="primary"
                    style={{ marginBottom: 'var(--bk-spacing-4)' }}
                >
                    {isLoading ? (
                        <>
                            <Spinner size="sm" color="var(--vscode-button-foreground)" />
                            Loading...
                        </>
                    ) : (
                        'Fetch Data'
                    )}
                </Button>

                <div style={{
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'var(--bk-border-width-1) solid var(--vscode-panel-border)',
                    borderRadius: 'var(--bk-radius-sm)',
                    backgroundColor: 'var(--vscode-input-background)',
                }}>
                    {isLoading ? (
                        <div style={{ textAlign: 'center' }}>
                            <Spinner />
                            <p style={{ marginTop: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Fetching data...
                            </p>
                        </div>
                    ) : data ? (
                        <p style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-foreground)' }}>
                            {data}
                        </p>
                    ) : (
                        <p style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                            Click the button to load data
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SpinnerPage() {
    return (
        <PageLayout
            title="Spinner"
            description="A circular loading spinner component that follows VSCode design patterns. Uses a rotating border animation to indicate loading or processing states. Perfect for async operations, data fetching, and loading indicators."
        >
            <Showcase
                title="Basic Usage"
                description="The Spinner displays a rotating circular animation to indicate loading states. By default, it uses the primary color and medium size."
                preview={
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--bk-spacing-6)' }}>
                        <Spinner />
                    </div>
                }
                code={`import { Spinner } from 'baukasten-ui';

function App() {
  return <Spinner />;
}`}
                props={spinnerProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. The spinner automatically adjusts border width for larger sizes."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <Spinner size="xs" />
                            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>xs</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <Spinner size="sm" />
                            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>sm</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <Spinner size="md" />
                            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>md</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <Spinner size="lg" />
                            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>lg</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <Spinner size="xl" />
                            <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>xl</span>
                        </div>
                    </div>
                }
                code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" /> {/* Default */}
<Spinner size="lg" />
<Spinner size="xl" />`}
            />

            <Showcase
                title="Colors"
                description="Spinners can use semantic color tokens for consistency or custom hex values for specific use cases. Semantic colors automatically adapt to theme changes."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Semantic Colors
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="var(--vscode-charts-blue)" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>Primary</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="var(--vscode-testing-iconPassed)" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>Success</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="var(--vscode-editorWarning-foreground)" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>Warning</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="var(--vscode-testing-iconFailed)" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>Danger</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="var(--vscode-charts-purple)" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>Info</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Custom Colors
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="#ff6600" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>#ff6600</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="#9333ea" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>#9333ea</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                    <Spinner color="#06b6d4" />
                                    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>#06b6d4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                code={`// Semantic colors
<Spinner color="var(--vscode-charts-blue)" />
<Spinner color="var(--vscode-testing-iconPassed)" />
<Spinner color="var(--vscode-editorWarning-foreground)" />
<Spinner color="var(--vscode-testing-iconFailed)" />

// Custom hex colors
<Spinner color="#ff6600" />
<Spinner color="#9333ea" />
<Spinner color="#06b6d4" />`}
            />

            <Showcase
                title="In Buttons"
                description="Spinners work well inside buttons to indicate loading states during async operations. Use xs or sm sizes for buttons and match the color to the button's text color."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Button variant="primary" disabled>
                            <Spinner size="sm" color="var(--vscode-button-foreground)" />
                            Loading...
                        </Button>
                        <Button variant="secondary" disabled>
                            <Spinner size="sm" color="var(--vscode-button-foreground)" />
                            Processing
                        </Button>
                        <Button variant="ghost" disabled>
                            <Spinner size="xs" />
                            Save
                        </Button>
                    </div>
                }
                code={`<Button variant="primary" disabled>
  <Spinner size="sm" color="var(--vscode-button-foreground)" />
  Loading...
</Button>

<Button variant="secondary" disabled>
  <Spinner size="sm" color="var(--vscode-button-foreground)" />
  Processing
</Button>

<Button variant="ghost" disabled>
  <Spinner size="xs" />
  Save
</Button>`}
            />

            <Showcase
                title="Standalone Loading States"
                description="Use spinners with text labels to indicate loading states for specific operations."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
                            <Spinner size="sm" />
                            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Loading data...
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
                            <Spinner size="md" color="var(--vscode-testing-iconPassed)" />
                            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Syncing...
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
                            <Spinner size="sm" color="var(--vscode-charts-purple)" />
                            <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Connecting to server...
                            </span>
                        </div>
                    </div>
                }
                code={`<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
  <Spinner size="sm" />
  <span>Loading data...</span>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
  <Spinner size="md" color="var(--vscode-testing-iconPassed)" />
  <span>Syncing...</span>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
  <Spinner size="sm" color="var(--vscode-charts-purple)" />
  <span>Connecting to server...</span>
</div>`}
            />

            <Showcase
                title="Centered Content Loading"
                description="Display spinner in the center of a content area as a placeholder while data loads."
                preview={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '250px',
                            border: 'var(--bk-border-width-1) solid var(--vscode-panel-border)',
                            borderRadius: 'var(--bk-radius-md)',
                            backgroundColor: 'var(--vscode-editor-background)',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <Spinner size="lg" />
                            <p style={{ marginTop: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Loading content...
                            </p>
                        </div>
                    </div>
                }
                code={`<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '250px',
}}>
  <div style={{ textAlign: 'center' }}>
    <Spinner size="lg" />
    <p style={{ marginTop: 'var(--bk-spacing-3)' }}>
      Loading content...
    </p>
  </div>
</div>`}
            />

            <Showcase
                title="Inline Loading Indicator"
                description="Small xs spinners can be placed at the end of lines for subtle loading indicators."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-foreground)' }}>
                            <span>Please wait while we fetch your data...</span>
                            <Spinner size="xs" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-foreground)' }}>
                            <span>Processing your request...</span>
                            <Spinner size="xs" color="var(--vscode-charts-purple)" />
                        </div>
                    </div>
                }
                code={`<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
  <span>Please wait while we fetch your data...</span>
  <Spinner size="xs" />
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
  <span>Processing your request...</span>
  <Spinner size="xs" color="var(--vscode-charts-purple)" />
</div>`}
            />

            <Showcase
                title="Loading Simulation Example"
                description="Real-world example showing a spinner in a button during data fetching and in a content area as a placeholder."
                preview={<LoadingSimulation />}
                code={`import { useState } from 'react';
import { Spinner, Button } from 'baukasten-ui';

function DataFetcher() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(true);
    setData(null);

    setTimeout(() => {
      setData('Data loaded successfully!');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Button
        onClick={handleLoad}
        disabled={isLoading}
        variant="primary"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" color="var(--vscode-button-foreground)" />
            Loading...
          </>
        ) : (
          'Fetch Data'
        )}
      </Button>

      <div style={{
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner />
            <p>Fetching data...</p>
          </div>
        ) : data ? (
          <p>{data}</p>
        ) : (
          <p>Click the button to load data</p>
        )}
      </div>
    </div>
  );
}`}
            />
        </PageLayout>
    );
}
