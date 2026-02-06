import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from './RichTextEditor';
import type { RichTextTrigger, RichTextSegment } from './RichTextEditor';
import { Icon } from '../Icon';

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
              {(suggestion.data as { role?: string })?.role && (
                <div
                  style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-foreground-muted)',
                  }}
                >
                  {(suggestion.data as { role?: string }).role}
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
            onSubmit={() => { }}
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

// AI Agent chat data
const projectFolders = [
  { label: 'src', data: { path: '/src', type: 'folder' } },
  { label: 'components', data: { path: '/src/components', type: 'folder' } },
  { label: 'utils', data: { path: '/src/utils', type: 'folder' } },
  { label: 'hooks', data: { path: '/src/hooks', type: 'folder' } },
  { label: 'styles', data: { path: '/src/styles', type: 'folder' } },
  { label: 'tests', data: { path: '/tests', type: 'folder' } },
  { label: 'node_modules', data: { path: '/node_modules', type: 'folder' }, disabled: true },
];

const projectFiles = [
  { label: 'index.tsx', data: { path: '/src/index.tsx', type: 'file', lang: 'typescript' } },
  { label: 'App.tsx', data: { path: '/src/App.tsx', type: 'file', lang: 'typescript' } },
  { label: 'Button.tsx', data: { path: '/src/components/Button.tsx', type: 'file', lang: 'typescript' } },
  { label: 'Modal.tsx', data: { path: '/src/components/Modal.tsx', type: 'file', lang: 'typescript' } },
  { label: 'useAuth.ts', data: { path: '/src/hooks/useAuth.ts', type: 'file', lang: 'typescript' } },
  { label: 'api.ts', data: { path: '/src/utils/api.ts', type: 'file', lang: 'typescript' } },
  { label: 'package.json', data: { path: '/package.json', type: 'file', lang: 'json' } },
  { label: 'tsconfig.json', data: { path: '/tsconfig.json', type: 'file', lang: 'json' } },
  { label: 'README.md', data: { path: '/README.md', type: 'file', lang: 'markdown' } },
];

function AIAgentChatExample() {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    segments: RichTextSegment[];
  }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. You can reference folders with @ and files with #. How can I help you today?',
      segments: [{ type: 'text', value: 'Hello! I\'m your AI coding assistant. You can reference folders with @ and files with #. How can I help you today?' }],
    },
  ]);

  const triggers: RichTextTrigger[] = [
    {
      trigger: '@',
      suggestions: projectFolders,
      renderSuggestion: (suggestion, isHighlighted) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--bk-spacing-2)',
            width: '100%',
            opacity: suggestion.disabled ? 0.5 : 1,
          }}
        >
          <Icon
            name="folder"
            size="sm"
            color={isHighlighted ? 'var(--bk-color-list-active-foreground)' : 'var(--bk-color-warning)'}
          />
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
            <div
              style={{
                fontSize: 'var(--bk-font-size-xs)',
                color: 'var(--bk-color-foreground-muted)',
              }}
            >
              {(suggestion.data as { path?: string })?.path}
            </div>
          </div>
        </div>
      ),
      // Custom rendering for folder mentions in the editor (with folder icon)
      renderMention: (suggestion) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          <Icon name="folder" size="sm" color="var(--bk-color-warning)" />
          <span>{suggestion.label}</span>
        </span>
      ),
      // Serialize as the full path instead of just the folder name
      serializeValue: (suggestion) => (suggestion.data as { path?: string })?.path || suggestion.label,
    },
    {
      trigger: '#',
      suggestions: projectFiles,
      renderSuggestion: (suggestion, isHighlighted) => {
        // Choose icon based on file extension
        const getFileIcon = () => {
          const lang = (suggestion.data as { lang?: string })?.lang;
          if (lang === 'typescript') return 'symbol-file';
          if (lang === 'json') return 'json';
          if (lang === 'markdown') return 'markdown';
          return 'file';
        };

        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--bk-spacing-2)',
              width: '100%',
            }}
          >
            <Icon
              name={getFileIcon()}
              size="sm"
              color={isHighlighted ? 'var(--bk-color-list-active-foreground)' : 'var(--bk-color-info)'}
            />
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
              <div
                style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-foreground-muted)',
                }}
              >
                {(suggestion.data as { path?: string })?.path}
              </div>
            </div>
          </div>
        );
      },
      // Custom rendering for file mentions in the editor (with file icon)
      renderMention: (suggestion) => {
        const getFileIcon = () => {
          const lang = (suggestion.data as { lang?: string })?.lang;
          if (lang === 'typescript') return 'symbol-file';
          if (lang === 'json') return 'json';
          if (lang === 'markdown') return 'markdown';
          return 'file';
        };
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            <Icon name={getFileIcon()} size="sm" color="var(--bk-color-info)" />
            <span>{suggestion.label}</span>
          </span>
        );
      },
      // Serialize as the full path instead of just the filename
      serializeValue: (suggestion) => (suggestion.data as { path?: string })?.path || suggestion.label,
    },
  ];

  const handleSubmit = (text: string, segments: RichTextSegment[]) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: text, segments }]);

    // Simulate AI response
    setTimeout(() => {
      const fileRefs = segments.filter((s) => s.type === 'mention' && s.trigger === '#');
      const folderRefs = segments.filter((s) => s.type === 'mention' && s.trigger === '@');

      let response = 'I understand you want me to help with';
      if (fileRefs.length > 0) {
        response += ` the file${fileRefs.length > 1 ? 's' : ''}: ${fileRefs.map((f) => f.value).join(', ')}`;
      }
      if (folderRefs.length > 0) {
        if (fileRefs.length > 0) response += ' in';
        response += ` the folder${folderRefs.length > 1 ? 's' : ''}: ${folderRefs.map((f) => f.value).join(', ')}`;
      }
      if (fileRefs.length === 0 && folderRefs.length === 0) {
        response = `I'll help you with that. Could you provide more context by referencing specific files (#) or folders (@)?`;
      } else {
        response += '. Let me analyze the code and provide suggestions.';
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response, segments: [{ type: 'text', value: response }] },
      ]);
    }, 800);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        backgroundColor: 'var(--bk-color-background)',
        borderRadius: 'var(--bk-radius-lg)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
          borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--bk-spacing-2)',
          backgroundColor: 'var(--bk-color-background-secondary)',
        }}
      >
        <Icon name="hubot" size="lg" color="var(--bk-color-primary)" />
        <div>
          <div style={{ fontWeight: 'var(--bk-font-weight-semibold)', fontSize: 'var(--bk-font-size-sm)' }}>
            AI Code Assistant
          </div>
          <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
            Reference files with # and folders with @
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--bk-spacing-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--bk-spacing-3)',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 'var(--bk-spacing-2)',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--bk-radius-full)',
                backgroundColor: msg.role === 'assistant' ? 'var(--bk-color-primary)' : 'var(--bk-color-badge-background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon
                name={msg.role === 'assistant' ? 'hubot' : 'account'}
                size="sm"
                color={msg.role === 'assistant' ? 'var(--bk-color-primary-foreground)' : 'var(--bk-color-badge-foreground)'}
              />
            </div>
            <div
              style={{
                padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
                backgroundColor: msg.role === 'assistant' ? 'var(--bk-color-background-secondary)' : 'var(--bk-color-primary)',
                color: msg.role === 'assistant' ? 'var(--bk-color-foreground)' : 'var(--bk-color-primary-foreground)',
                borderRadius: 'var(--bk-radius-md)',
                maxWidth: '80%',
                fontSize: 'var(--bk-font-size-sm)',
                lineHeight: 'var(--bk-line-height-relaxed)',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
          borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
          backgroundColor: 'var(--bk-color-background-secondary)',
        }}
      >
        <RichTextEditor
          placeholder='Ask about your code... Use @ for folders, # for files'
          triggers={triggers}
          fullWidth
          rows={2}
          size="sm"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

/**
 * Simulates an AI agent chat window where users can reference folders and files.
 * Type "@" to mention folders (with folder icons) or "#" to reference files (with file icons).
 */
export const AIAgentChat: Story = {
  render: () => <AIAgentChatExample />,
  decorators: [
    (Story) => (
      <div style={{ width: '550px', padding: 'var(--bk-spacing-4)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'An AI coding assistant chat interface demonstrating file and folder references. Type "@" to mention folders (shown with folder icons in yellow) or "#" to reference files (shown with file icons in blue). The chat simulates an AI response that acknowledges the referenced files and folders. Enter sends the message.',
      },
    },
  },
};

// Notion-like block commands
const blockCommands = [
  { label: 'Heading 1', data: { prefix: '# ', style: 'h1' } },
  { label: 'Heading 2', data: { prefix: '## ', style: 'h2' } },
  { label: 'Heading 3', data: { prefix: '### ', style: 'h3' } },
  { label: 'Bulleted list', data: { prefix: '• ', style: 'list' } },
  { label: 'Numbered list', data: { prefix: '1. ', style: 'numbered' } },
  { label: 'Quote', data: { prefix: '> ', style: 'quote' } },
  { label: 'Code block', data: { prefix: '```\n', style: 'code' } },
  { label: 'Divider', data: { prefix: '---\n', style: 'divider' } },
];

function NotionBlockEditorExample() {
  const [lastChange, setLastChange] = useState<{
    text: string;
    segments: RichTextSegment[];
  } | null>(null);

  const triggers: RichTextTrigger[] = [
    {
      trigger: '/',
      suggestions: blockCommands,
      renderSuggestion: (suggestion, isHighlighted) => {
        // Icon mapping for block types
        const getIcon = () => {
          const style = (suggestion.data as { style?: string })?.style;
          switch (style) {
            case 'h1': return 'symbol-class';
            case 'h2': return 'symbol-method';
            case 'h3': return 'symbol-field';
            case 'list': return 'list-unordered';
            case 'numbered': return 'list-ordered';
            case 'quote': return 'quote';
            case 'code': return 'code';
            case 'divider': return 'horizontal-rule';
            default: return 'symbol-text';
          }
        };

        return (
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
                width: '28px',
                height: '28px',
                borderRadius: 'var(--bk-radius-sm)',
                backgroundColor: isHighlighted
                  ? 'var(--bk-color-primary)'
                  : 'var(--bk-color-background-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon
                name={getIcon()}
                size="sm"
                color={isHighlighted ? 'var(--bk-color-primary-foreground)' : 'var(--bk-color-foreground-muted)'}
              />
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
              <div
                style={{
                  fontSize: 'var(--bk-font-size-xs)',
                  color: 'var(--bk-color-foreground-muted)',
                  fontFamily: 'var(--bk-font-family-mono)',
                }}
              >
                {(suggestion.data as { prefix?: string })?.prefix?.replace('\n', '↵')}
              </div>
            </div>
          </div>
        );
      },
      // Render the markdown prefix as the mention content
      renderMention: (suggestion) => {
        const prefix = (suggestion.data as { prefix?: string })?.prefix || '';
        const style = (suggestion.data as { style?: string })?.style;

        // Style based on block type
        const getStyle = (): React.CSSProperties => {
          switch (style) {
            case 'h1':
              return { fontSize: '1.5em', fontWeight: 'bold' };
            case 'h2':
              return { fontSize: '1.25em', fontWeight: 'bold' };
            case 'h3':
              return { fontSize: '1.1em', fontWeight: 'bold' };
            case 'quote':
              return {
                borderLeft: '3px solid var(--bk-color-border)',
                paddingLeft: 'var(--bk-spacing-2)',
                fontStyle: 'italic',
                color: 'var(--bk-color-foreground-muted)',
              };
            case 'code':
              return {
                fontFamily: 'var(--bk-font-family-mono)',
                backgroundColor: 'var(--bk-color-background-secondary)',
                padding: '0 var(--bk-spacing-1)',
                borderRadius: 'var(--bk-radius-sm)',
              };
            case 'divider':
              return {
                display: 'block',
                borderBottom: '1px solid var(--bk-color-border)',
                margin: 'var(--bk-spacing-2) 0',
              };
            default:
              return {};
          }
        };

        return (
          <span style={{ ...getStyle(), display: style === 'divider' ? 'block' : 'inline' }}>
            {prefix.replace('\n', '')}
          </span>
        );
      },
      // Serialize just the prefix
      serializeValue: (suggestion) => (suggestion.data as { prefix?: string })?.prefix || '',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
      <div
        style={{
          padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
          backgroundColor: 'var(--bk-color-background-secondary)',
          borderRadius: 'var(--bk-radius-md)',
          fontSize: 'var(--bk-font-size-sm)',
          color: 'var(--bk-color-foreground-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--bk-spacing-2)',
        }}
      >
        <Icon name="lightbulb" size="sm" color="var(--bk-color-warning)" />
        <span>Type <code style={{ backgroundColor: 'var(--bk-color-background)', padding: '0 4px', borderRadius: '2px' }}>/</code> to insert block commands like headers, lists, quotes...</span>
      </div>

      <RichTextEditor
        placeholder="Type '/' for commands..."
        triggers={triggers}
        fullWidth
        rows={6}
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
            Serialized markdown:
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {lastChange.text}
          </pre>
        </div>
      )}
    </div>
  );
}

/**
 * A Notion-like block editor with slash commands.
 * Type "/" to see available block types like headers, lists, quotes, and code blocks.
 */
export const NotionBlockEditor: Story = {
  render: () => <NotionBlockEditorExample />,
  decorators: [
    (Story) => (
      <div style={{ width: '550px', padding: 'var(--bk-spacing-4)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'A Notion-style block editor demonstrating slash commands. Type "/" to see block options like Heading 1, Heading 2, Heading 3, bulleted/numbered lists, quotes, code blocks, and dividers. Selecting an option inserts the corresponding markdown prefix, and the serialized output shows the markdown-formatted text.',
      },
    },
  },
};
