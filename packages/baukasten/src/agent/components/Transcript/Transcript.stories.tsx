import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/Button';
import { createMockAgent, DEMO_SCRIPT } from '../../testing';
import { useTranscript } from '../../useTranscript';
import { mergeRenderers } from '../../renderers';
import { defaultRenderers } from '../defaultRenderers';
import { Approval } from '../Approval';
import type { TranscriptEntry } from '../../types';
import { Transcript } from './Transcript';

const renderers = mergeRenderers(defaultRenderers(), {
    approval: ({ entry }) => <Approval entry={entry} keyboard={false} />,
    custom: {
        deployment: ({ entry }) => (
            <div
                style={{
                    padding: 'var(--bk-padding-md)',
                    border: '1px dashed var(--bk-color-info)',
                    borderRadius: 'var(--bk-radius-md)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                Deployment started — {(entry.data as { environment: string }).environment}
            </div>
        ),
    },
});

function message(id: string, text: string, role: 'user' | 'agent' = 'agent'): TranscriptEntry {
    return { id, kind: 'message', role, text, streaming: false };
}

const MANY: TranscriptEntry[] = Array.from({ length: 200 }, (_, index) =>
    message(
        `m${index}`,
        `Entry ${index} — ${'lorem ipsum '.repeat(4)}`,
        index % 5 === 0 ? 'user' : 'agent',
    ),
);

/** Drives a live transcript from the scripted agent. */
function LiveTranscript({ height = 520 }: { height?: number }) {
    const { entries, dispatch } = useTranscript();
    const [agent] = useState(() =>
        createMockAgent(DEMO_SCRIPT, { dispatch, onFinish: () => undefined }),
    );

    useEffect(() => {
        agent.start();
        return () => agent.stop();
    }, [agent]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-sm)', height }}>
            <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)' }}>
                <Button size="xs" variant="secondary" onClick={() => agent.start()}>
                    Replay
                </Button>
                <Button size="xs" variant="ghost" onClick={() => agent.skipToEnd()}>
                    Skip to end
                </Button>
                <Button size="xs" variant="ghost" onClick={() => agent.setSpeed(4)}>
                    4×
                </Button>
            </div>
            <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--bk-color-border)' }}>
                <Transcript
                    entries={entries}
                    renderers={renderers}
                    empty="Waiting for the agent…"
                />
            </div>
        </div>
    );
}

const meta = {
    title: 'Agent/Transcript',
    component: Transcript,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The scrolling conversation. It follows output while the reader is at the bottom and **releases the moment they scroll away**, offering a way back rather than dragging them — the naive version, which scrolls on every change, is actively hostile in a long run. Entries are resolved through a renderer map rather than a switch, so an application can register its own kind and inherit everything here.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entries: { control: false, description: 'The folded entry list from useTranscript' },
        renderers: { control: false, description: 'Renderers by entry kind' },
        threshold: {
            control: 'number',
            description: 'Pixels from the bottom that still count as following',
            table: { defaultValue: { summary: '32' } },
        },
        virtualizeThreshold: {
            control: 'number',
            description: 'Entry count above which the list is windowed',
            table: { defaultValue: { summary: '80' } },
        },
        empty: { control: 'text', description: 'Shown when there is nothing yet' },
    },
} satisfies Meta<typeof Transcript>;

export default meta;
type Story = StoryObj<typeof meta>;

const Framed = ({ children, height = 420 }: { children: React.ReactNode; height?: number }) => (
    <div style={{ height, border: '1px solid var(--bk-color-border)', display: 'flex' }}>
        {children}
    </div>
);

/**
 * Interactive playground.
 */
export const Interactive: Story = {
    args: {
        entries: MANY.slice(0, 12),
        renderers,
        empty: 'Nothing yet.',
        threshold: 32,
        virtualizeThreshold: 80,
    },
    render: (args) => (
        <Framed>
            <Transcript {...args} />
        </Framed>
    ),
};

/**
 * The behaviour worth checking by hand.
 */
export const FollowsWithoutFighting: Story = {
    args: { entries: [], renderers },
    render: () => <LiveTranscript height={520} />,
    parameters: {
        docs: {
            source: {
                code: `const { entries, dispatch } = useTranscript();

// Any source of updates: an MCP adapter, an ACP adapter, or the scripted
// mock. They all emit the same actions.
useEffect(() => {
    const agent = createMockAgent(DEMO_SCRIPT, { dispatch });
    agent.start();
    return () => agent.stop();
}, [dispatch]);

<Transcript
    entries={entries}
    renderers={mergeRenderers(defaultRenderers(), {
        approval: ({ entry }) => <Approval entry={entry} onDecide={resolve} />,
    })}
    empty="Waiting for the agent…"
/>`,
            },
            description: {
                story: 'Hit Replay, then **scroll up while it runs**. The transcript should stop following immediately and offer a jump affordance with a count of what you have missed; returning to the bottom should re-attach it. The version this replaced yanked you back down on every chunk.',
            },
        },
    },
};

/**
 * Two hundred entries, windowed.
 */
export const LongSession: Story = {
    args: { entries: MANY, renderers },
    render: (args) => (
        <Framed height={520}>
            <Transcript {...args} />
        </Framed>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Above 80 entries the list is windowed, with rows measured rather than estimated — transcript entries are variable-height and grow while streaming, so a cached height is wrong within a frame of being taken. Below the threshold it renders in flow, because the absolute layout costs styling and text-selection quality to save nothing.',
            },
        },
    },
};

/**
 * A kind this library has never heard of.
 */
export const CustomEntryKind: Story = {
    args: {
        entries: [
            message('1', 'Deploying to staging.'),
            { id: '2', kind: 'deployment', data: { environment: 'staging' } },
            message('3', 'Deployment finished.'),
            { id: '4', kind: 'rollback', data: {} },
        ],
        renderers,
    },
    render: (args) => (
        <Framed height={280}>
            <Transcript {...args} />
        </Framed>
    ),
    parameters: {
        docs: {
            description: {
                story: '`deployment` is registered by the application and inherits windowing, scrolling and the rest. `rollback` is not registered and falls back to something readable rather than throwing or rendering nothing — an entry that exists must not look like one that does not.',
            },
        },
    },
};

/**
 * Nothing yet.
 */
export const Empty: Story = {
    args: { entries: [], renderers, empty: 'Ask the agent something to get started.' },
    render: (args) => (
        <Framed height={200}>
            <Transcript {...args} />
        </Framed>
    ),
};

/**
 * A whole run, in the shape this is actually used in.
 */
export const Showcase: Story = {
    args: { entries: [], renderers },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'The scripted agent playing into a docked side panel — the default shape for this audience, and the width every decision here has to survive. Compare it against the wide version above.',
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bk-color-foreground-muted)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                (editor)
            </div>
            <div
                style={{
                    width: 360,
                    borderLeft: '1px solid var(--bk-color-border)',
                    padding: 'var(--bk-spacing-3)',
                    minHeight: 0,
                }}
            >
                <LiveTranscript height={undefined} />
            </div>
        </div>
    ),
};
