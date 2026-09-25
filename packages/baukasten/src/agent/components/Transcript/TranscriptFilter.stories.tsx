import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DensityProvider } from '../../density';
import {
    countByKind,
    filterEntries,
    marksFor,
    type TranscriptFilterState,
} from '../../transcriptView';
import { mergeRenderers } from '../../renderers';
import { defaultRenderers } from '../defaultRenderers';
import type { MessageEntry, TranscriptEntry } from '../../types';
import { Transcript } from './Transcript';
import { TranscriptFilter } from './TranscriptFilter';

const ENTRIES: TranscriptEntry[] = [
    {
        id: 'u0',
        kind: 'message',
        role: 'user',
        text: 'The uploader drops events when the collector is flaky. Add retries.',
        streaming: false,
    },
    {
        id: 'p0',
        kind: 'plan',
        items: [
            { id: '1', text: 'Read the uploader', status: 'done' },
            { id: '2', text: 'Add the retry loop', status: 'active', priority: 'high' },
        ],
    },
    { id: 'h0', kind: 'thought', text: 'Checking who calls flushQueue.', streaming: false },
    {
        id: 't0',
        kind: 'tool',
        tool: {
            correlationId: 't0',
            kind: 'read',
            title: 'Read',
            target: 'src/uploader.ts',
            status: 'completed',
        },
    },
    {
        id: 't1',
        kind: 'tool',
        tool: {
            correlationId: 't1',
            kind: 'search',
            title: 'Search',
            target: 'flushQueue(',
            status: 'failed',
            error: { scope: 'execution', message: 'Search index is still building.' },
        },
    },
    {
        id: 't2',
        kind: 'tool',
        tool: {
            correlationId: 't2',
            kind: 'edit',
            title: 'Edit',
            target: 'src/uploader.ts',
            status: 'completed',
        },
    },
    {
        id: 'a0',
        kind: 'approval',
        request: {
            id: 'run',
            title: 'Run the telemetry test suite',
            options: [
                { id: 'yes', label: 'Allow', outcome: 'allow', scope: 'once', shortcut: 'accept' },
                { id: 'no', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
            ],
        },
    },
    {
        id: 'm1',
        kind: 'message',
        role: 'agent',
        text: 'Done. Permanent failures drop fast instead of burning the retry budget.',
        streaming: false,
    },
] as TranscriptEntry[];

const meta = {
    title: 'Agent/TranscriptFilter',
    component: TranscriptFilter,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The affordances a log view has and a chat transcript does not. Nobody asks for these — they are simply present in the output panel next to this one, and their absence makes the transcript feel worse than it without anyone being able to say why. Filtering happens on the entry list **upstream** of the transcript, which is a correctness requirement rather than an optimisation: hiding rows the virtualiser has already measured leaves its offsets describing a list nobody can see.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: false, description: 'Kinds, free text, and "needs attention"' },
        counts: { control: false, description: 'From `countByKind(entries)`' },
        kinds: { control: false, description: 'Defaults to the built-ins; pass your own too' },
        density: {
            control: 'select',
            options: ['compact', 'comfortable'],
            description: 'Compact drops the text labels, keeping the accessible names',
        },
        onCollapseAll: { description: 'Offered only when the host can honour it' },
    },
} satisfies Meta<typeof TranscriptFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Built-ins plus a terser message — see the note in OverviewRuler.stories. */
const renderers = mergeRenderers(defaultRenderers(), {
    message: ({ entry }: { entry: MessageEntry }) => (
        <p style={{ margin: 0, fontSize: 'var(--bk-font-size-sm)' }}>{entry.text}</p>
    ),
});

/** The bar alone, with counts. */
export const Interactive: Story = {
    args: { value: {}, onChange: () => undefined, counts: countByKind(ENTRIES) },
    render: (args) => {
        const [value, setValue] = useState<TranscriptFilterState>({});
        return (
            <div style={{ maxWidth: 560 }}>
                <TranscriptFilter {...args} value={value} onChange={setValue} />
                <pre style={{ fontSize: 'var(--bk-font-size-xs)' }}>
                    {JSON.stringify(value, null, 2)}
                </pre>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Everything is on to begin with, so the first click on a kind turns it **off** rather than narrowing to it — a row of pressed toggles means "all of these", and narrowing would contradict what the control is showing. Turning the last one back on returns the filter to `{}`, so a caller can skip the work entirely.',
            },
        },
    },
};

/** Wired to a transcript, which is the only way it means anything. */
export const Filtering: Story = {
    args: { value: {}, onChange: () => undefined },
    render: () => {
        const [value, setValue] = useState<TranscriptFilterState>({});
        const visible = filterEntries(ENTRIES, value);

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 420,
                    maxWidth: 560,
                    border: '1px solid var(--bk-color-border)',
                }}
            >
                <TranscriptFilter
                    value={value}
                    onChange={setValue}
                    counts={countByKind(ENTRIES)}
                    onCollapseAll={() => undefined}
                    onExpandAll={() => undefined}
                />
                <Transcript
                    entries={visible}
                    renderers={renderers}
                    marks={marksFor(visible)}
                    empty="Nothing matches that filter."
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Try the warning toggle: it narrows to the failed call and the undecided approval. The completed edit is *not* included — it is marked on the ruler, because "what changed" is worth scanning for, but it needs no action.',
            },
        },
    },
};

/** Compact drops the labels, not the meaning. */
export const Compact: Story = {
    args: { value: {}, onChange: () => undefined, counts: countByKind(ENTRIES) },
    render: (args) => (
        <div style={{ maxWidth: 300, border: '1px solid var(--bk-color-border)' }}>
            <DensityProvider density="compact">
                <TranscriptFilter {...args} onCollapseAll={() => undefined} />
            </DensityProvider>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'At 300px the toggles are icons alone — so the count moves into the accessible name, or a screen-reader user would get less from the control than a sighted one. The bar wraps rather than scrolling, because a horizontally-scrolling toolbar in a narrow panel hides controls behind a gesture nobody discovers.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { value: {}, onChange: () => undefined },
    parameters: { layout: 'fullscreen' },
    render: () => {
        const [value, setValue] = useState<TranscriptFilterState>({ problemsOnly: true });
        const visible = filterEntries(ENTRIES, value);

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
                    <TranscriptFilter
                        value={value}
                        onChange={setValue}
                        counts={countByKind(ENTRIES)}
                        onCollapseAll={() => undefined}
                        onExpandAll={() => undefined}
                    />
                    <Transcript
                        entries={visible}
                        renderers={renderers}
                        marks={marksFor(visible)}
                        empty="Nothing matches that filter."
                    />
                </div>
            </div>
        );
    },
};
