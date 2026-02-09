import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-line text input component with size, resize, and error message support. Fully integrates with the design system tokens for consistent theming. For labels, use the FieldLabel or FormGroup components.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the textarea',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when textarea is empty',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the textarea should take full width of its container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior for the textarea. When minRows/maxRows is set, defaults to "none"',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows (static height, ignored when minRows/maxRows is set)',
      table: {
        defaultValue: { summary: '4' },
      },
    },
    minRows: {
      control: 'number',
      description: 'Minimum number of rows for auto-grow behavior. Setting this enables auto-grow.',
    },
    maxRows: {
      control: 'number',
      description: 'Maximum number of rows for auto-grow behavior. Setting this enables auto-grow.',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all textarea properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    placeholder: 'Enter text...',
    disabled: false,
    fullWidth: false,
    resize: 'vertical',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all textarea properties. Try different combinations using the controls below.',
      },
    },
  },
};

/**
 * All available textarea sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', width: '400px' }}>
      <TextArea size="xs" placeholder="Extra Small" rows={3} />
      <TextArea size="sm" placeholder="Small" rows={3} />
      <TextArea size="md" placeholder="Medium (Default)" rows={3} />
      <TextArea size="lg" placeholder="Large" rows={3} />
      <TextArea size="xl" placeholder="Extra Large" rows={3} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. Size affects font size, padding, and line height.',
      },
    },
  },
};

/**
 * Different resize behaviors for textareas.
 */
export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          No Resize
        </h4>
        <TextArea resize="none" placeholder="Cannot be resized" rows={3} />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Vertical Resize (Default)
        </h4>
        <TextArea resize="vertical" placeholder="Drag bottom edge to resize vertically" rows={3} />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Horizontal Resize
        </h4>
        <TextArea resize="horizontal" placeholder="Drag right edge to resize horizontally" rows={3} />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Both Directions
        </h4>
        <TextArea resize="both" placeholder="Drag corner to resize in any direction" rows={3} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resize options: **none** (fixed size), **vertical** (height only, default), **horizontal** (width only), **both** (width and height).',
      },
    },
  },
};

/**
 * Different row heights for textareas.
 */
export const RowOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          2 Rows (Compact)
        </h4>
        <TextArea rows={2} placeholder="Short textarea with 2 rows" />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          4 Rows (Default)
        </h4>
        <TextArea rows={4} placeholder="Default textarea with 4 rows" />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          8 Rows (Tall)
        </h4>
        <TextArea rows={8} placeholder="Tall textarea with 8 rows" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control the initial visible height using the rows prop. Default is 4 rows. Users can resize vertically if resize is enabled.',
      },
    },
  },
};

/**
 * Auto-grow textareas that expand as content is added.
 */
export const AutoGrow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          minRows={2}, maxRows={6}
        </h4>
        <TextArea
          minRows={2}
          maxRows={6}
          placeholder="Type to see auto-grow. Starts at 2 rows, grows up to 6 rows, then scrolls."
          fullWidth
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          minRows={1}, maxRows={4} (Compact)
        </h4>
        <TextArea
          minRows={1}
          maxRows={4}
          placeholder="Single line that grows to 4 rows max"
          fullWidth
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          minRows={3}, no maxRows (Unlimited)
        </h4>
        <TextArea
          minRows={3}
          placeholder="Starts at 3 rows, grows indefinitely with content"
          fullWidth
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          maxRows={5} only (starts at default 4 rows)
        </h4>
        <TextArea
          maxRows={5}
          placeholder="Uses default 4 rows as min, max at 5 rows"
          fullWidth
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-grow textareas automatically expand as content is added. Use `minRows` to set the starting height and `maxRows` to limit growth. When maxRows is exceeded, the textarea becomes scrollable. Setting either `minRows` or `maxRows` enables auto-grow behavior.',
      },
    },
  },
};

/**
 * TextArea states: default, error, and disabled.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Default State
        </h4>
        <TextArea placeholder="Enter your message here..." />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          With Error
        </h4>
        <TextArea
          placeholder="Enter description..."
          error="Description must be at least 10 characters"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Disabled State
        </h4>
        <TextArea
          placeholder="This field is disabled"
          disabled
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Disabled with Error
        </h4>
        <TextArea
          placeholder="This field is disabled"
          disabled
          error="This field has an error"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextArea states: **default** (idle), **error** (with error message and red border), **disabled** (non-interactive). Focus state is shown when the textarea is clicked.',
      },
    },
  },
};

/**
 * Width options: default (inline) and full width.
 */
export const WidthOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '100%', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Default Width (Inline)
        </h4>
        <TextArea placeholder="Auto width" rows={3} />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Full Width
        </h4>
        <TextArea placeholder="This spans full width" fullWidth rows={3} />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Multiple Full Width TextAreas
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea placeholder="Summary" fullWidth rows={2} />
          <TextArea placeholder="Description" fullWidth rows={4} />
          <TextArea placeholder="Notes" fullWidth rows={3} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Width options: **default** (inline/auto width) or **full width** (100% of container). Use fullWidth for form layouts.',
      },
    },
  },
};

/**
 * Common form patterns and usage examples.
 */
export const FormExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', width: '100%', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Feedback Form
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <TextArea placeholder="Subject" fullWidth rows={2} />
          <TextArea placeholder="Your feedback..." fullWidth rows={6} />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Blog Post Editor
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <TextArea placeholder="Title" fullWidth rows={2} resize="none" />
          <TextArea placeholder="Write your post content here..." fullWidth rows={12} />
          <TextArea placeholder="Tags (comma separated)" fullWidth rows={2} resize="none" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Form with Validation
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
          <TextArea placeholder="Product name" fullWidth rows={2} />
          <TextArea
            placeholder="Product description"
            error="Description must be at least 50 characters"
            fullWidth
            rows={6}
          />
          <TextArea placeholder="Additional notes (optional)" fullWidth rows={4} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common form patterns: feedback forms, content editors, and forms with validation errors. Combine with FieldLabel and FormHelper for complete form groups.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all textarea features and states.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', maxWidth: '600px' }}>
      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea size="xs" placeholder="Extra Small" rows={3} />
          <TextArea size="sm" placeholder="Small" rows={3} />
          <TextArea size="md" placeholder="Medium" rows={3} />
          <TextArea size="lg" placeholder="Large" rows={3} />
          <TextArea size="xl" placeholder="Extra Large" rows={3} />
        </div>
      </div>

      {/* Resize Options */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Resize Options
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea resize="none" placeholder="No resize" rows={3} fullWidth />
          <TextArea resize="vertical" placeholder="Vertical resize (default)" rows={3} fullWidth />
          <TextArea resize="horizontal" placeholder="Horizontal resize" rows={3} fullWidth />
          <TextArea resize="both" placeholder="Both directions" rows={3} fullWidth />
        </div>
      </div>

      {/* States */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea placeholder="Default state" rows={3} fullWidth />
          <TextArea
            placeholder="With error"
            error="This field is required"
            rows={3}
            fullWidth
          />
          <TextArea
            placeholder="Disabled"
            disabled
            rows={3}
            fullWidth
          />
        </div>
      </div>

      {/* Row Variations */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Row Variations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea rows={2} placeholder="Compact (2 rows)" fullWidth />
          <TextArea rows={4} placeholder="Default (4 rows)" fullWidth />
          <TextArea rows={8} placeholder="Tall (8 rows)" fullWidth />
        </div>
      </div>

      {/* Auto-Grow */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Auto-Grow
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea minRows={2} maxRows={6} placeholder="Grows from 2 to 6 rows" fullWidth />
          <TextArea minRows={1} maxRows={4} placeholder="Compact: 1 to 4 rows" fullWidth />
          <TextArea minRows={3} placeholder="Unlimited growth from 3 rows" fullWidth />
        </div>
      </div>

      {/* Combinations */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Size + State Combinations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
          <TextArea size="sm" placeholder="Small textarea" rows={3} fullWidth />
          <TextArea size="lg" placeholder="Large textarea" rows={3} fullWidth />
          <TextArea
            size="md"
            placeholder="Medium with error"
            error="Validation error"
            rows={3}
            fullWidth
          />
          <TextArea size="lg" placeholder="Large with no resize" resize="none" rows={4} fullWidth />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all textarea capabilities: sizes, resize options, row heights, states, and combinations. Use with FieldLabel and FormHelper for complete form controls.',
      },
    },
  },
};
