'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { ProgressBar, Button, Heading, Paragraph } from 'baukasten';

const progressBarProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'number',
        description: 'Progress value from 0 to 100 (undefined for indeterminate loading state)',
    },
    {
        name: 'variant',
        type: '"default" | "primary" | "success" | "warning" | "danger" | "info"',
        default: '"default"',
        description: 'Visual variant of the progress bar',
    },
    {
        name: 'height',
        type: 'string',
        default: '"8px"',
        description: 'Height of the progress bar',
    },
    {
        name: 'showLabel',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show percentage label',
    },
    {
        name: 'striped',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show striped pattern',
    },
    {
        name: 'animated',
        type: 'boolean',
        default: 'false',
        description: 'Whether to animate stripes (requires striped=true)',
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
        description: 'Accessible label for screen readers',
    },
];

// File upload simulation example
function FileUploadExample() {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
        setProgress(0);
        setIsUploading(true);
    };

    useEffect(() => {
        if (isUploading && progress < 100) {
            const timer = setTimeout(() => {
                setProgress(prev => {
                    const newProgress = prev + Math.random() * 15;
                    if (newProgress >= 100) {
                        setIsUploading(false);
                        return 100;
                    }
                    return Math.round(newProgress);
                });
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isUploading, progress]);

    const variant = progress === 100 ? 'success' : 'primary';

    return (
        <div style={{ maxWidth: '600px' }}>
            <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: 'var(--spacing-4)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-4)',
                    marginBottom: 'var(--spacing-3)',
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-1)' }}>
                            document.pdf
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                            {progress === 100 ? 'Upload complete' : isUploading ? 'Uploading...' : 'Ready to upload'}
                        </div>
                    </div>
                    <Button
                        onClick={startUpload}
                        disabled={isUploading}
                        size="sm"
                    >
                        {isUploading ? 'Uploading...' : progress === 100 ? 'Upload Again' : 'Start Upload'}
                    </Button>
                </div>
                <ProgressBar value={progress} variant={variant} showLabel striped animated={isUploading} />
            </div>
        </div>
    );
}

export default function ProgressBarPage() {
    return (
        <PageLayout
            title="ProgressBar"
            description="A progress indicator component for showing task completion or loading states. Supports both determinate (with value) and indeterminate (loading) modes with VSCode-style shimmer animation."
        >
            <Showcase
                title="Basic Usage"
                description="ProgressBar displays progress from 0 to 100. Values are automatically clamped to this range. Use the value prop to set the current progress."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <ProgressBar value={25} />
                        <ProgressBar value={50} />
                        <ProgressBar value={75} />
                        <ProgressBar value={100} variant="success" />
                    </div>
                }
                code={`import { ProgressBar } from 'baukasten';

function App() {
  return (
    <>
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} variant="success" />
    </>
  );
}`}
                props={progressBarProps}
            />

            <Showcase
                title="Variants"
                description="Six semantic variants to represent different states: default (neutral), primary (brand), success (positive), warning (caution), danger (error), and info (informational)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Default
                            </div>
                            <ProgressBar value={75} variant="default" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Primary
                            </div>
                            <ProgressBar value={75} variant="primary" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Success
                            </div>
                            <ProgressBar value={75} variant="success" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Warning
                            </div>
                            <ProgressBar value={75} variant="warning" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Danger
                            </div>
                            <ProgressBar value={75} variant="danger" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Info
                            </div>
                            <ProgressBar value={75} variant="info" />
                        </div>
                    </div>
                }
                code={`<ProgressBar value={75} variant="default" />
<ProgressBar value={75} variant="primary" />
<ProgressBar value={75} variant="success" />
<ProgressBar value={75} variant="warning" />
<ProgressBar value={75} variant="danger" />
<ProgressBar value={75} variant="info" />`}
            />

            <Showcase
                title="With Labels"
                description="Set showLabel to display the percentage value next to the progress bar. Labels are automatically hidden in indeterminate loading state."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <ProgressBar value={25} showLabel />
                        <ProgressBar value={50} showLabel variant="primary" />
                        <ProgressBar value={75} showLabel variant="success" />
                        <ProgressBar value={100} showLabel variant="success" />
                    </div>
                }
                code={`<ProgressBar value={25} showLabel />
<ProgressBar value={50} showLabel variant="primary" />
<ProgressBar value={75} showLabel variant="success" />
<ProgressBar value={100} showLabel variant="success" />`}
            />

            <Showcase
                title="Indeterminate Loading"
                description="When no value is provided, the progress bar shows an indeterminate loading state with a VSCode-style shimmer animation. Perfect for operations where progress cannot be determined."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%', maxWidth: '600px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Loading (default)
                            </div>
                            <ProgressBar />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Loading (primary)
                            </div>
                            <ProgressBar variant="primary" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Loading (info)
                            </div>
                            <ProgressBar variant="info" />
                        </div>
                    </div>
                }
                code={`// Indeterminate loading (no value)
<ProgressBar />
<ProgressBar variant="primary" />
<ProgressBar variant="info" />`}
            />

            <Showcase
                title="Custom Heights"
                description="Customize the height using the height prop. Default is 8px which matches VSCode style. Use different heights for different visual emphasis."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Thin (4px) - Subtle progress
                            </div>
                            <ProgressBar value={60} height="4px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Default (8px) - Standard
                            </div>
                            <ProgressBar value={60} height="8px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Medium (12px) - More prominent
                            </div>
                            <ProgressBar value={60} height="12px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Thick (16px) - Very prominent
                            </div>
                            <ProgressBar value={60} height="16px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                Extra thick (24px) - Maximum visibility
                            </div>
                            <ProgressBar value={60} height="24px" />
                        </div>
                    </div>
                }
                code={`<ProgressBar value={60} height="4px" />
<ProgressBar value={60} height="8px" /> {/* Default */}
<ProgressBar value={60} height="12px" />
<ProgressBar value={60} height="16px" />
<ProgressBar value={60} height="24px" />`}
            />

            <Showcase
                title="Striped Pattern"
                description="Add a striped pattern with the striped prop for additional visual interest. The stripes are created using CSS gradients."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Primary with stripes
                            </div>
                            <ProgressBar value={70} striped height="12px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Success with stripes
                            </div>
                            <ProgressBar value={70} variant="success" striped height="12px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Warning with stripes
                            </div>
                            <ProgressBar value={70} variant="warning" striped height="12px" />
                        </div>
                    </div>
                }
                code={`<ProgressBar value={70} striped height="12px" />
<ProgressBar value={70} variant="success" striped height="12px" />
<ProgressBar value={70} variant="warning" striped height="12px" />`}
            />

            <Showcase
                title="Animated Stripes"
                description="Animate the stripes with the animated prop (requires striped=true) to indicate active processing. The animation moves from right to left."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '600px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Animated stripes (processing)
                            </div>
                            <ProgressBar value={65} striped animated height="12px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Success - Animated
                            </div>
                            <ProgressBar value={85} variant="success" striped animated height="12px" />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Warning - Animated
                            </div>
                            <ProgressBar value={45} variant="warning" striped animated height="12px" />
                        </div>
                    </div>
                }
                code={`<ProgressBar value={65} striped animated height="12px" />
<ProgressBar value={85} variant="success" striped animated height="12px" />
<ProgressBar value={45} variant="warning" striped animated height="12px" />`}
            />

            <Showcase
                title="File Upload Simulation"
                description="Real-world example showing simulated file upload progress with state management. Demonstrates progress tracking, variant changes, and animated stripes during upload."
                preview={<FileUploadExample />}
                code={`import { ProgressBar, Button } from 'baukasten';
import { useState, useEffect } from 'react';

function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = () => {
    setProgress(0);
    setIsUploading(true);
  };

  useEffect(() => {
    if (isUploading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            setIsUploading(false);
            return 100;
          }
          return newProgress;
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isUploading, progress]);

  const variant = progress === 100 ? 'success' : 'primary';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <div>document.pdf</div>
          <div>
            {progress === 100 ? 'Upload complete' : isUploading ? 'Uploading...' : 'Ready to upload'}
          </div>
        </div>
        <Button onClick={startUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : progress === 100 ? 'Upload Again' : 'Start Upload'}
        </Button>
      </div>
      <ProgressBar
        value={progress}
        variant={variant}
        showLabel
        striped
        animated={isUploading}
      />
    </div>
  );
}`}
            />

            <Showcase
                title="Multiple Tasks"
                description="Example showing multiple tasks at different stages of completion. Demonstrates various states including complete, in-progress, loading, and pending."
                preview={
                    <div style={{
                        maxWidth: '700px',
                        padding: 'var(--spacing-4)',
                        backgroundColor: 'var(--vscode-textBlockQuote-background)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Heading level={4} marginBottom style={{ marginBottom: 'var(--spacing-4)' }}>
                            Build Tasks
                        </Heading>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    <span>Compiling TypeScript</span>
                                    <span style={{ color: 'var(--vscode-testing-iconPassed)' }}>✓ Complete</span>
                                </div>
                                <ProgressBar value={100} variant="success" />
                            </div>

                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    <span>Bundling assets</span>
                                    <span style={{ color: 'var(--vscode-descriptionForeground)' }}>75%</span>
                                </div>
                                <ProgressBar value={75} striped animated />
                            </div>

                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    <span>Running tests</span>
                                    <span style={{ color: 'var(--vscode-descriptionForeground)' }}>45%</span>
                                </div>
                                <ProgressBar value={45} />
                            </div>

                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    <span>Optimizing images</span>
                                    <span style={{ color: 'var(--vscode-descriptionForeground)' }}>Loading...</span>
                                </div>
                                <ProgressBar variant="info" />
                            </div>

                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    <span>Deploying to production</span>
                                    <span style={{ color: 'var(--vscode-descriptionForeground)' }}>Waiting...</span>
                                </div>
                                <ProgressBar value={0} variant="default" />
                            </div>
                        </div>
                    </div>
                }
                code={`<div>
  {/* Completed task */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Compiling TypeScript</span>
      <span>✓ Complete</span>
    </div>
    <ProgressBar value={100} variant="success" />
  </div>

  {/* Active task */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Bundling assets</span>
      <span>75%</span>
    </div>
    <ProgressBar value={75} striped animated />
  </div>

  {/* In progress */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Running tests</span>
      <span>45%</span>
    </div>
    <ProgressBar value={45} />
  </div>

  {/* Indeterminate */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Optimizing images</span>
      <span>Loading...</span>
    </div>
    <ProgressBar variant="info" />
  </div>

  {/* Pending */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Deploying to production</span>
      <span>Waiting...</span>
    </div>
    <ProgressBar value={0} variant="default" />
  </div>
</div>`}
            />
        </PageLayout>
    );
}
