import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress indicator component for showing task completion or loading states. Supports determinate (with value) and indeterminate (loading) modes. Includes VSCode-style shimmer animation for loading states, striped patterns, and multiple semantic variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value from 0 to 100 (undefined for indeterminate)',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Visual variant of the progress bar',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the progress bar',
      table: {
        defaultValue: { summary: '8px' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show percentage label',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped pattern',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate stripes (requires striped=true)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all progress bar properties exposed.
 */
export const Interactive: Story = {
  args: {
    value: 65,
    variant: 'primary',
    height: '8px',
    showLabel: false,
    striped: false,
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all progress bar properties. Use the controls below to experiment with different configurations.',
      },
    },
  },
};

/**
 * All available progress bar variants.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Default
        </div>
        <ProgressBar value={75} variant="default" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Primary
        </div>
        <ProgressBar value={75} variant="primary" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Success
        </div>
        <ProgressBar value={75} variant="success" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Warning
        </div>
        <ProgressBar value={75} variant="warning" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Danger
        </div>
        <ProgressBar value={75} variant="danger" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Info
        </div>
        <ProgressBar value={75} variant="info" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar comes in 6 variants: **Default** (neutral), **Primary** (brand), **Success** (positive), **Warning** (caution), **Danger** (error), and **Info** (informational).',
      },
    },
  },
};

/**
 * Different progress values from 0% to 100%.
 */
export const ProgressValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          0% - Just started
        </div>
        <ProgressBar value={0} />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          25% - Early progress
        </div>
        <ProgressBar value={25} />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          50% - Halfway there
        </div>
        <ProgressBar value={50} />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          75% - Almost done
        </div>
        <ProgressBar value={75} />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          100% - Complete
        </div>
        <ProgressBar value={100} variant="success" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars can show any value from 0 to 100. Values are automatically clamped to this range.',
      },
    },
  },
};

/**
 * Progress bars with percentage labels.
 */
export const WithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <ProgressBar value={25} showLabel />
      <ProgressBar value={50} showLabel variant="primary" />
      <ProgressBar value={75} showLabel variant="success" />
      <ProgressBar value={100} showLabel variant="success" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set `showLabel` to display the percentage value next to the progress bar.',
      },
    },
  },
};

/**
 * Indeterminate loading state (no value specified).
 */
export const IndeterminateLoading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Loading (default)
        </div>
        <ProgressBar />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Loading (success)
        </div>
        <ProgressBar variant="success" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Loading (danger)
        </div>
        <ProgressBar variant="danger" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When no `value` is provided, the progress bar shows an indeterminate loading state with a VSCode-style shimmer animation. Perfect for operations where progress cannot be determined.',
      },
    },
  },
};

/**
 * Different heights for various use cases.
 */
export const CustomHeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Thin (4px) - Subtle progress
        </div>
        <ProgressBar value={60} height="4px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Default (8px) - Standard
        </div>
        <ProgressBar value={60} height="8px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Medium (12px) - More prominent
        </div>
        <ProgressBar value={60} height="12px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Thick (16px) - Very prominent
        </div>
        <ProgressBar value={60} height="16px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Extra thick (24px) - Maximum visibility
        </div>
        <ProgressBar value={60} height="24px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize the height using the `height` prop. Default is 8px which matches VSCode style.',
      },
    },
  },
};

/**
 * Striped pattern for visual interest.
 */
export const StripedPattern: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Primary with stripes
        </div>
        <ProgressBar value={70} striped height="12px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Success with stripes
        </div>
        <ProgressBar value={70} variant="success" striped height="12px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Warning with stripes
        </div>
        <ProgressBar value={70} variant="warning" striped height="12px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Add a striped pattern with `striped` prop for additional visual interest.',
      },
    },
  },
};

/**
 * Animated stripes for active operations.
 */
export const AnimatedStripes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Animated stripes (processing)
        </div>
        <ProgressBar value={65} striped animated height="12px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Success - Animated
        </div>
        <ProgressBar value={85} variant="success" striped animated height="12px" />
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Warning - Animated
        </div>
        <ProgressBar value={45} variant="warning" striped animated height="12px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animate the stripes with `animated` prop (requires `striped=true`) to indicate active processing.',
      },
    },
  },
};

/**
 * Simulated file upload with real-time progress.
 */
export const FileUploadSimulation: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [progress, setProgress] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setProgress(0);
      setIsUploading(true);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
      <div style={{ maxWidth: '600px' }}>
        <div style={{
          padding: 'var(--bk-spacing-4)',
          backgroundColor: 'var(--bk-color-background-elevated)',
          borderRadius: 'var(--bk-radius-md)',
          marginBottom: 'var(--bk-spacing-4)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--bk-spacing-3)',
          }}>
            <div>
              <div style={{ fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-1)' }}>
                document.pdf
              </div>
              <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
                {progress === 100 ? 'Upload complete' : isUploading ? 'Uploading...' : 'Ready to upload'}
              </div>
            </div>
            <button
              onClick={startUpload}
              disabled={isUploading}
              style={{
                padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
                backgroundColor: isUploading ? 'var(--bk-color-background)' : 'var(--bk-color-primary)',
                color: isUploading ? 'var(--bk-color-foreground-muted)' : 'var(--bk-color-primary-foreground)',
                border: 'none',
                borderRadius: 'var(--bk-radius-sm)',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                fontSize: 'var(--bk-font-size-sm)',
                fontWeight: 'var(--bk-font-weight-medium)',
              }}
            >
              {isUploading ? 'Uploading...' : progress === 100 ? 'Upload Again' : 'Start Upload'}
            </button>
          </div>
          <ProgressBar value={progress} variant={variant} showLabel striped animated={isUploading} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing simulated file upload progress. Click "Start Upload" to see the progress bar in action.',
      },
    },
  },
};

/**
 * Multiple tasks with different progress states.
 */
export const MultipleTasks: Story = {
  render: () => (
    <div style={{
      maxWidth: '700px',
      padding: 'var(--bk-spacing-4)',
      backgroundColor: 'var(--bk-color-background-elevated)',
      borderRadius: 'var(--bk-radius-md)',
    }}>
      <h3 style={{
        marginTop: 0,
        marginBottom: 'var(--bk-spacing-4)',
        fontSize: 'var(--bk-font-size-base)',
        fontWeight: 'var(--bk-font-weight-semibold)',
      }}>
        Build Tasks
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <span>Compiling TypeScript</span>
            <span style={{ color: 'var(--bk-color-success)' }}>✓ Complete</span>
          </div>
          <ProgressBar value={100} variant="success" />
        </div>

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <span>Bundling assets</span>
            <span style={{ color: 'var(--bk-color-foreground-muted)' }}>75%</span>
          </div>
          <ProgressBar value={75} striped animated />
        </div>

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <span>Running tests</span>
            <span style={{ color: 'var(--bk-color-foreground-muted)' }}>45%</span>
          </div>
          <ProgressBar value={45} />
        </div>

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <span>Optimizing images</span>
            <span style={{ color: 'var(--bk-color-foreground-muted)' }}>Loading...</span>
          </div>
          <ProgressBar variant="info" />
        </div>

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <span>Deploying to production</span>
            <span style={{ color: 'var(--bk-color-foreground-muted)' }}>Waiting...</span>
          </div>
          <ProgressBar value={0} variant="default" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple tasks at different stages of completion. Demonstrates various states including complete, in-progress, loading, and pending.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all progress bar capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-4)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--bk-font-size-xl)', fontWeight: 'var(--bk-font-weight-bold)', marginBottom: 'var(--bk-spacing-2)' }}>
        ProgressBar Component
      </h1>
      <p style={{ color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-spacing-6)' }}>
        Progress indicators for tasks and loading states
      </p>

      {/* Variants */}
      <section style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          Variants
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar value={70} variant="default" />
          <ProgressBar value={70} variant="primary" />
          <ProgressBar value={70} variant="success" />
          <ProgressBar value={70} variant="warning" />
          <ProgressBar value={70} variant="danger" />
          <ProgressBar value={70} variant="info" />
        </div>
      </section>

      {/* Progress Values */}
      <section style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          Progress Values
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar value={0} />
          <ProgressBar value={25} />
          <ProgressBar value={50} />
          <ProgressBar value={75} />
          <ProgressBar value={100} variant="success" />
        </div>
      </section>

      {/* With Labels */}
      <section style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          With Labels
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar value={30} showLabel />
          <ProgressBar value={60} showLabel variant="primary" />
          <ProgressBar value={90} showLabel variant="success" />
        </div>
      </section>

      {/* Indeterminate */}
      <section style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          Indeterminate Loading
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar />
          <ProgressBar variant="primary" />
          <ProgressBar variant="info" />
        </div>
      </section>

      {/* Heights */}
      <section style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          Custom Heights
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar value={60} height="4px" />
          <ProgressBar value={60} height="8px" />
          <ProgressBar value={60} height="12px" />
          <ProgressBar value={60} height="16px" />
        </div>
      </section>

      {/* Striped & Animated */}
      <section>
        <h2 style={{ fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)', marginBottom: 'var(--bk-spacing-4)' }}>
          Striped & Animated
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <ProgressBar value={70} striped height="12px" />
          <ProgressBar value={70} striped animated height="12px" />
          <ProgressBar value={70} variant="success" striped animated height="12px" />
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all progress bar features: 6 variants, multiple progress values, labels, loading states, custom heights, and animated patterns.',
      },
    },
  },
};
