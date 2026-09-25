import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../../../components/Tag';
import { Icon } from '../../../components/Icon';
import { Avatar } from '../../../components/Avatar';
import type { MessageEntry } from '../../types';
import { Message } from './Message';

function entry(overrides: Partial<MessageEntry> = {}): MessageEntry {
    return {
        id: 'm1',
        kind: 'message',
        role: 'agent',
        text: 'Found it — a non-OK response just logs a warning and `continue`s, so the batch is gone.',
        streaming: false,
        ...overrides,
    };
}

const meta = {
    title: 'Agent/Message',
    component: Message,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    "One turn in the conversation. The roles are deliberately not symmetrical — the reader's own turns are the landmarks they navigate a long run by, and giving both sides equal weight turns two hundred entries into an undifferentiated wall. Delivery state belongs here rather than to the application: a failed send keeps its text and offers a retry.",
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entry: { control: false, description: 'The message entry from the transcript reducer' },
        attachments: { control: false, description: 'Context chips, rendered above the text' },
        avatar: { control: false, description: 'Rendered to the left of the body' },
        onRetry: { description: 'Offered when a send failed. Without it the failure is inert.' },
    },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: 620 }}
    >
        {children}
    </div>
);

const Chip = ({ icon, children }: { icon: 'file-code' | 'git-branch'; children: string }) => (
    <Tag size="xs" variant="secondary">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--bk-spacing-1)' }}>
            <Icon name={icon} size="xs" />
            {children}
        </span>
    </Tag>
);

/**
 * Interactive playground.
 */
export const Interactive: Story = {
    args: { entry: entry() },
    parameters: {
        docs: {
            description: {
                story: 'Switch the role in the entry to see the asymmetry. Agent turns render as markdown; user turns render as plain text, because the user did not write markdown and rendering it as such mangles anything they pasted.',
            },
        },
    },
};

/**
 * The three roles, side by side. This is the decision worth looking at.
 */
export const Roles: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Message
                entry={entry({
                    id: '1',
                    role: 'user',
                    text: 'The telemetry uploader drops events when the collector gets flaky. Add retries.',
                })}
            />
            <Message entry={entry({ id: '2', role: 'agent' })} />
            <Message entry={entry({ id: '3', role: 'system', text: 'Context window at 78%.' })} />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A user turn is a bordered card, an agent turn is bare text, a system note is a quiet rail. Whether that balance is right at length is exactly what a test cannot tell you — scroll the Showcase story and see whether the user turns still read as landmarks.',
            },
        },
    },
};

/**
 * A message the user composed, on its way somewhere.
 */
export const DeliveryStates: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Message
                entry={entry({ id: '1', role: 'user', text: 'Sending…', delivery: 'pending' })}
            />
            <Message
                entry={entry({ id: '2', role: 'user', text: 'Delivered.', delivery: 'sent' })}
            />
            <Message
                entry={entry({
                    id: '3',
                    role: 'user',
                    text: 'The message I typed, which must not disappear.',
                    delivery: 'failed',
                    error: 'Network unreachable',
                })}
                onRetry={() => undefined}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pending dims. Failed keeps the text on screen and offers a retry — the bug this exists to prevent is a message that vanishes on error, taking the user's typing with it.",
            },
        },
    },
};

/**
 * Context attached to a turn.
 */
export const WithAttachments: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Message
                entry={entry({
                    id: '1',
                    role: 'user',
                    text: 'Review this against the retry policy.',
                })}
                avatar={<Avatar name="Sam Rivera" size="sm" shape="circular" />}
                attachments={
                    <>
                        <Chip icon="file-code">uploader.ts</Chip>
                        <Chip icon="file-code">queue.ts</Chip>
                        <Chip icon="git-branch">fix/telemetry-retry</Chip>
                    </>
                }
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chips sit above the text, and the avatar to the left. Both are slots — the component has no opinion about what a piece of context looks like.',
            },
        },
    },
};

/**
 * The narrow case.
 */
export const InANarrowPanel: Story = {
    args: { entry: entry() },
    render: () => (
        <div
            style={{
                width: 300,
                border: '1px dashed var(--bk-color-border)',
                padding: 'var(--bk-spacing-2)',
            }}
        >
            <Stack>
                <Message
                    entry={entry({
                        id: '1',
                        role: 'user',
                        text: 'Add retries with exponential backoff and jitter.',
                    })}
                    attachments={<Chip icon="file-code">uploader.ts</Chip>}
                />
                <Message entry={entry({ id: '2' })} />
            </Stack>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The default shape for this audience is a docked side panel, not a centred column — so this is the width the balance has to survive.',
            },
        },
    },
};

/**
 * A stretch of conversation, which is the only way to judge the asymmetry.
 */
export const Showcase: Story = {
    args: { entry: entry() },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Several turns in sequence. The question to ask: scanning this, can you find your own turns without reading?',
            },
        },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
            <Stack>
                <Message
                    entry={entry({
                        id: '1',
                        role: 'user',
                        text: 'The uploader drops events when the collector is flaky.',
                    })}
                    attachments={<Chip icon="file-code">uploader.ts</Chip>}
                />
                <Message
                    entry={entry({
                        id: '2',
                        text: 'Found it — a non-OK response logs a warning and `continue`s.\n\nPlan:\n\n1. Retry transient status codes\n2. Full-jitter backoff capped at 30s\n3. Thread an `AbortSignal` through the flush loop',
                    })}
                />
                <Message entry={entry({ id: '3', role: 'user', text: 'Do it.' })} />
                <Message
                    entry={entry({
                        id: '4',
                        text: 'Done. Permanent failures now drop fast instead of burning the retry budget.',
                    })}
                />
                <Message
                    entry={entry({ id: '5', role: 'system', text: 'Session used 12,400 tokens.' })}
                />
            </Stack>
        </div>
    ),
};
