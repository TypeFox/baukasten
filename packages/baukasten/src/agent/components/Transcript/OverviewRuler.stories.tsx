import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { useMarkNavigation } from '../../useMarkNavigation';
import { marksFor } from '../../transcriptView';
import { mergeRenderers } from '../../renderers';
import { defaultRenderers } from '../defaultRenderers';
import type { MessageEntry, TranscriptEntry } from '../../types';
import { Transcript } from './Transcript';
import { OverviewRuler } from './OverviewRuler';

/** A long enough run that scrolling to find things is the alternative. */
const ENTRIES: TranscriptEntry[] = Array.from({ length: 40 }, (_, index) => {
    if (index === 6) {
        return {
            id: `e${index}`,
            kind: 'tool',
            tool: {
                correlationId: `c${index}`,
                kind: 'search',
                title: 'Search',
                status: 'failed',
                error: { scope: 'execution', message: 'Index is still building.' },
            },
        };
    }

    if (index === 14) {
        return {
            id: `e${index}`,
            kind: 'tool',
            tool: { correlationId: `c${index}`, kind: 'edit', title: 'Edit', status: 'completed' },
        };
    }

    if (index === 22) {
        return {
            id: `e${index}`,
            kind: 'approval',
            request: {
                id: 'run',
                title: 'Run the test suite',
                options: [{ id: 'yes', label: 'Allow', outcome: 'allow', scope: 'once' }],
            },
        };
    }

    if (index === 33) {
        return {
            id: `e${index}`,
            kind: 'tool',
            tool: {
                correlationId: `c${index}`,
                kind: 'execute',
                title: 'Terminal',
                status: 'failed',
                error: { scope: 'protocol', message: 'Server advertises an unsupported revision.' },
            },
        };
    }

    return {
        id: `e${index}`,
        kind: 'message',
        role: index % 2 ? 'agent' : 'user',
        text: `Step ${index + 1} of a long run.`,
        streaming: false,
    };
}) as TranscriptEntry[];

const meta = {
    title: 'Agent/OverviewRuler',
    component: OverviewRuler,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Where the interesting moments are, down the edge of the session. A straight lift of the editor idiom into a surface that needs it badly: in a two-hundred-entry run the moments worth looking at are a handful of points, and the current answer is scrolling until you find them. Each mark is a real button with a name, because a decorative strip that only answers a click on a four-pixel target is not navigation.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        marks: { control: false, description: 'From `marksFor(entries)`' },
        onSelect: { description: 'Receives the entry id to scroll to' },
        activeEntryId: { control: 'text', description: 'Highlighted, when navigation has landed' },
        label: { control: 'text', table: { defaultValue: { summary: 'Session overview' } } },
    },
} satisfies Meta<typeof OverviewRuler>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The built-ins, with a terser message than the default.
 *
 * Starting from `defaultRenderers()` rather than supplying `message` alone:
 * the fixture contains tool calls and an approval, and a renderer map with no
 * entry for those falls through to the fallback — which renders the literal
 * word "tool", correctly and uselessly.
 */
const renderers = mergeRenderers(defaultRenderers(), {
    message: ({ entry }: { entry: MessageEntry }) => (
        <p style={{ margin: 0, fontSize: 'var(--bk-font-size-sm)' }}>{entry.text}</p>
    ),
});

/** The strip alone. Tab into it — every mark is reachable. */
export const Interactive: Story = {
    args: { marks: marksFor(ENTRIES) },
    render: (args) => {
        const [active, setActive] = useState<string | undefined>(undefined);
        return (
            <div style={{ display: 'flex', height: 320 }}>
                <div style={{ flex: 1 }} />
                <OverviewRuler {...args} activeEntryId={active} onSelect={setActive} />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Four marks in forty entries: a recovered failure, an edit, an approval, and a protocol error. Each is named for what it is and where it is — "Protocol error — entry 34".',
            },
        },
    },
};

/** The two failures are not the same mark. */
export const FailureKinds: Story = {
    args: { marks: marksFor(ENTRIES) },
    render: () => (
        <div style={{ display: 'flex', height: 260 }}>
            <div style={{ flex: 1 }} />
            <OverviewRuler marks={marksFor(ENTRIES)} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Following the error taxonomy: a tool that ran and reported a problem is usually something the agent routed around, while a protocol error generally stopped the run. Drawing both alike would mean scrolling past a dozen recovered errors to find the one that mattered. Edits are marked too, because "what did it change" is the other thing people scan for.',
            },
        },
    },
};

/** Wired to a transcript, with next/previous. */
export const WithNavigation: Story = {
    args: { marks: marksFor(ENTRIES) },
    render: () => {
        const nav = useMarkNavigation(ENTRIES);

        return (
            <div style={{ maxWidth: 560 }}>
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--bk-gap-sm)',
                        marginBottom: 'var(--bk-spacing-2)',
                    }}
                >
                    <Button size="xs" variant="secondary" onClick={() => nav.goPrevious()}>
                        <Icon name="arrow-up" size="xs" />
                        Previous problem
                    </Button>
                    <Button size="xs" variant="secondary" onClick={() => nav.goNext()}>
                        <Icon name="arrow-down" size="xs" />
                        Next problem
                    </Button>
                </div>

                {/*
                 * `Transcript` sizes itself as a flex *item* — `flex: 1` inside
                 * a block parent does nothing, so it falls back to content
                 * height, spills out of the box and never scrolls. The ruler
                 * stretches to match, which is what made this story look wrong.
                 */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 360,
                        border: '1px solid var(--bk-color-border)',
                    }}
                >
                    <Transcript
                        entries={ENTRIES}
                        renderers={renderers}
                        marks={nav.marks}
                        onNavigate={nav.setActive}
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'The ruler shows **everything**; the buttons step only through what needs a person. Conflating those gives you either a ruler that hides edits or a "next problem" button that stops twenty times in a run that edited twenty files. Navigation wraps, because a control that stops working at the end reads as broken rather than as finished.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { marks: marksFor(ENTRIES) },
    parameters: { layout: 'fullscreen' },
    render: () => {
        const nav = useMarkNavigation(ENTRIES);

        return (
            <div
                style={{ padding: 'var(--bk-spacing-6)', height: '100vh', boxSizing: 'border-box' }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        border: '1px solid var(--bk-color-border)',
                    }}
                >
                    <Transcript
                        entries={ENTRIES}
                        renderers={renderers}
                        marks={nav.marks}
                        onNavigate={nav.setActive}
                    />
                </div>
            </div>
        );
    },
};
