import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from './RichTextEditor';
import type { RichTextTrigger, RichTextSegment } from './RichTextEditor';

const meta = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A contenteditable-based rich text editor with support for @mentions, trigger-based autocomplete, and decorator-based text highlighting. Designed for chat inputs, comment boxes, and any input that needs inline mention tagging.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '450px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the editor',
      table: { defaultValue: { summary: 'md' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the editor',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the editor should take full width of its container',
      table: { defaultValue: { summary: 'false' } },
    },
    rows: {
      control: 'number',
      description: 'Minimum visible rows (maps to min-height)',
      table: { defaultValue: { summary: '4' } },
    },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all editor properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    placeholder: 'Type something...',
    disabled: false,
    readOnly: false,
    fullWidth: false,
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to explore all editor properties. Try different combinations using the controls below.',
      },
    },
  },
};

// Sample data for mentions
const people = [
  { label: 'Alice Johnson', data: { id: 1, role: 'Engineer' } },
  { label: 'Bob Smith', data: { id: 2, role: 'Designer' } },
  { label: 'Charlie Davis', data: { id: 3, role: 'PM' } },
  { label: 'Diana Williams', data: { id: 4, role: 'Engineer' } },
  { label: 'Eve Martinez', data: { id: 5, role: 'QA' } },
];

function WithMentionsExample() {
  const [lastChange, setLastChange] = useState<{
    text: string;
    segments: RichTextSegment[];
  } | null>(null);

  const triggers: RichTextTrigger[] = [
    {
      trigger: '@',
      suggestions: people,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
      <RichTextEditor
        placeholder='Type "@" to mention someone...'
        triggers={triggers}
        fullWidth
        onChange={(text, segments) => setLastChange({ text, segments })}
      />
      {lastChange && (
        <div
          style={{
            padding: 'var(--bk-spacing-2)',
            backgroundColor: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-sm)',
            fontSize: 'var(--bk-font-size-xs)',
            fontFamily: 'var(--bk-font-family-mono)',
          }}
        >
          <div style={{ marginBottom: 'var(--bk-spacing-1)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
            Text: {JSON.stringify(lastChange.text)}
          </div>
          <div>
            Segments: {JSON.stringify(lastChange.segments, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Editor with @mention support. Type "@" followed by a name to see suggestions.
 */
export const WithMentions: Story = {
  render: () => <WithMentionsExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Type "@" to open the mentions dropdown. Arrow keys to navigate, Enter to select. Mentions appear as chips that delete atomically. The debug panel below shows the raw text and structured segments.',
      },
    },
  },
};

/**
 * Editor with multiple trigger characters: @ for people, # for channels.
 */
export const WithMultipleTriggers: Story = {
  render: () => {
    const channels = [
      { label: 'general', data: { id: 'ch1' } },
      { label: 'engineering', data: { id: 'ch2' } },
      { label: 'design', data: { id: 'ch3' } },
      { label: 'random', data: { id: 'ch4' } },
    ];

    const triggers: RichTextTrigger[] = [
      { trigger: '@', suggestions: people },
      { trigger: '#', suggestions: channels },
    ];

    return (
      <RichTextEditor
        placeholder='Type "@" for people or "#" for channels...'
        triggers={triggers}
        fullWidth
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple triggers in the same editor. Type "@" to mention a person or "#" to reference a channel. Each trigger has its own suggestion list.',
      },
    },
  },
};

function ChatInputExample() {
  const [messages, setMessages] = useState<string[]>([]);

  const triggers: RichTextTrigger[] = [
    { trigger: '@', suggestions: people },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
      {messages.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-2)',
            padding: 'var(--bk-spacing-2)',
            backgroundColor: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-sm)',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
                backgroundColor: 'var(--bk-color-background)',
                borderRadius: 'var(--bk-radius-sm)',
                fontSize: 'var(--bk-font-size-sm)',
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      )}
      <RichTextEditor
        placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
        triggers={triggers}
        fullWidth
        rows={2}
        onSubmit={(text) => {
          if (text.trim()) {
            setMessages((prev) => [...prev, text]);
          }
        }}
      />
    </div>
  );
}

/**
 * Editor configured as a chat input: Enter to send, Shift+Enter for newline.
 */
export const ChatInput: Story = {
  render: () => <ChatInputExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Chat-style input where Enter sends the message and Shift+Enter inserts a newline. The `onSubmit` callback is fired on bare Enter. Messages appear above the input.',
      },
    },
  },
};

/**
 * Editor with custom suggestion rendering.
 */
export const CustomSuggestionRender: Story = {
  render: () => {
    const triggers: RichTextTrigger[] = [
      {
        trigger: '@',
        suggestions: people,
        renderSuggestion: (suggestion, isHighlighted) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--bk-spacing-2)',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: 'var(--bk-radius-full)',
                backgroundColor: isHighlighted
                  ? 'var(--bk-color-primary)'
                  : 'var(--bk-color-badge-background)',
                color: isHighlighted
                  ? 'var(--bk-color-primary-foreground)'
                  : 'var(--bk-color-badge-foreground)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--bk-font-size-xs)',
                fontWeight: 'var(--bk-font-weight-semibold)',
                flexShrink: 0,
              }}
            >
              {suggestion.label.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 'var(--bk-font-weight-medium)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {suggestion.label}
              </div>
              {suggestion.data?.role && (
                <div
                  style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-foreground-muted)',
                  }}
                >
                  {suggestion.data.role}
                </div>
              )}
            </div>
          </div>
        ),
      },
    ];

    return (
      <RichTextEditor
        placeholder='Type "@" for mentions with avatars...'
        triggers={triggers}
        fullWidth
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom suggestion rendering with avatars and role descriptions. Use `renderSuggestion` on the trigger definition to fully customize how each suggestion appears in the dropdown.',
      },
    },
  },
};

/**
 * All available editor sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-3)',
        width: '450px',
      }}
    >
      <RichTextEditor size="xs" placeholder="Extra Small" rows={3} fullWidth />
      <RichTextEditor size="sm" placeholder="Small" rows={3} fullWidth />
      <RichTextEditor size="md" placeholder="Medium (Default)" rows={3} fullWidth />
      <RichTextEditor size="lg" placeholder="Large" rows={3} fullWidth />
      <RichTextEditor size="xl" placeholder="Extra Large" rows={3} fullWidth />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Five size options: **xs**, **sm**, **md** (default), **lg**, **xl**. Size affects font size, padding, and line height.',
      },
    },
  },
};

/**
 * Editor states: default, error, and disabled.
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-4)',
        width: '450px',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
            fontWeight: 'var(--bk-font-weight-medium)',
          }}
        >
          Default State
        </h4>
        <RichTextEditor placeholder="Enter your message here..." fullWidth />
      </div>
      <div>
        <h4
          style={{
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
            fontWeight: 'var(--bk-font-weight-medium)',
          }}
        >
          With Error
        </h4>
        <RichTextEditor
          placeholder="Enter description..."
          error="Message is required"
          fullWidth
        />
      </div>
      <div>
        <h4
          style={{
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
            fontWeight: 'var(--bk-font-weight-medium)',
          }}
        >
          Disabled State
        </h4>
        <RichTextEditor placeholder="This field is disabled" disabled fullWidth />
      </div>
      <div>
        <h4
          style={{
            marginBottom: 'var(--bk-spacing-2)',
            fontSize: 'var(--bk-font-size-sm)',
            fontWeight: 'var(--bk-font-weight-medium)',
          }}
        >
          Read-Only State
        </h4>
        <RichTextEditor placeholder="This field is read-only" readOnly fullWidth />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Editor states: **default** (idle), **error** (with message and red border), **disabled** (non-interactive), **read-only** (visible but not editable).',
      },
    },
  },
};

/**
 * Comprehensive showcase of all editor features.
 */
export const Showcase: Story = {
  render: () => {
    const triggers: RichTextTrigger[] = [
      { trigger: '@', suggestions: people },
      {
        trigger: '#',
        suggestions: [
          { label: 'general' },
          { label: 'engineering' },
          { label: 'design' },
        ],
      },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--bk-spacing-6)',
          padding: 'var(--bk-spacing-4)',
          maxWidth: '600px',
        }}
      >
        <div>
          <h3
            style={{
              marginBottom: 'var(--bk-spacing-3)',
              fontSize: 'var(--bk-font-size-base)',
              fontWeight: 'var(--bk-font-weight-semibold)',
            }}
          >
            Mentions Editor
          </h3>
          <RichTextEditor
            placeholder='Type "@" for people, "#" for channels'
            triggers={triggers}
            fullWidth
          />
        </div>

        <div>
          <h3
            style={{
              marginBottom: 'var(--bk-spacing-3)',
              fontSize: 'var(--bk-font-size-base)',
              fontWeight: 'var(--bk-font-weight-semibold)',
            }}
          >
            Sizes
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--bk-spacing-2)',
            }}
          >
            <RichTextEditor size="xs" placeholder="Extra Small" rows={2} fullWidth />
            <RichTextEditor size="sm" placeholder="Small" rows={2} fullWidth />
            <RichTextEditor size="md" placeholder="Medium" rows={2} fullWidth />
            <RichTextEditor size="lg" placeholder="Large" rows={2} fullWidth />
            <RichTextEditor size="xl" placeholder="Extra Large" rows={2} fullWidth />
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: 'var(--bk-spacing-3)',
              fontSize: 'var(--bk-font-size-base)',
              fontWeight: 'var(--bk-font-weight-semibold)',
            }}
          >
            States
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--bk-spacing-2)',
            }}
          >
            <RichTextEditor placeholder="Default" rows={2} fullWidth />
            <RichTextEditor
              placeholder="Error state"
              error="This field is required"
              rows={2}
              fullWidth
            />
            <RichTextEditor placeholder="Disabled" disabled rows={2} fullWidth />
            <RichTextEditor placeholder="Read-only" readOnly rows={2} fullWidth />
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: 'var(--bk-spacing-3)',
              fontSize: 'var(--bk-font-size-base)',
              fontWeight: 'var(--bk-font-weight-semibold)',
            }}
          >
            Chat Input Mode
          </h3>
          <RichTextEditor
            placeholder="Enter sends, Shift+Enter for newline"
            triggers={triggers}
            fullWidth
            rows={2}
            onSubmit={() => {}}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Comprehensive showcase of all RichTextEditor features: mentions, sizes, states, and chat input mode.',
      },
    },
  },
};
