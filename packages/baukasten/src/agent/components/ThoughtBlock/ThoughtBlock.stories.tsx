import type { Meta, StoryObj } from '@storybook/react';
import type { ThoughtEntry } from '../../types';
import { ThoughtBlock } from './ThoughtBlock';

const TEXT =
    'Reading the uploader to see where failures are swallowed, then checking who calls flushQueue so the new signal parameter stays backwards compatible.';

function entry(overrides: Partial<ThoughtEntry> = {}): ThoughtEntry {
    return { id: 'h1', kind: 'thought', text: TEXT, streaming: false, ...overrides };
}

const meta = {
    title: 'Agent/ThoughtBlock',
    component: ThoughtBlock,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Reasoning, live while it arrives and folded away once it has. Two genuinely different states rather than one collapsible block with a flag — while the model is still thinking this is the only thing happening in the transcript, so offering to hide it is the wrong affordance at that moment.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entry: { control: false, description: 'The thought entry from the transcript reducer' },
        defaultExpanded: {
            control: 'boolean',
            description: 'Whether the settled form starts open',
            table: { defaultValue: { summary: 'false' } },
        },
        summary: { control: false, description: 'Builds the collapsed summary line' },
    },
} satisfies Meta<typeof ThoughtBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    args: { entry: entry({ durationMs: 1400 }), defaultExpanded: false },
};

/**
 * The two states, side by side.
 */
export const LiveAndSettled: Story = {
    args: { entry: entry() },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-lg)',
                maxWidth: 620,
            }}
        >
            <ThoughtBlock entry={entry({ id: '1', streaming: true })} />
            <ThoughtBlock entry={entry({ id: '2', durationMs: 1400 })} />
            <ThoughtBlock entry={entry({ id: '3' })} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Live: an accent rail and a pulsing indicator, shown in full, with nothing to collapse. Settled: a one-line summary carrying how long it took. The third has no duration, because nothing upstream measured one — the transcript reducer is deliberately clock-free.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { entry: entry() },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Reasoning is worth glancing at and rarely worth re-reading, which is why it settles into a line rather than staying open.',
            },
        },
    },
    render: () => (
        <div
            style={{
                padding: 'var(--bk-spacing-6)',
                maxWidth: 620,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
            }}
        >
            <ThoughtBlock entry={entry({ id: '1', durationMs: 800 })} />
            <ThoughtBlock
                entry={entry({
                    id: '2',
                    durationMs: 2400,
                    text: 'Checking whether the retry budget interacts with the fixed flush timer in queue.ts.',
                })}
                defaultExpanded
            />
            <ThoughtBlock
                entry={entry({ id: '3', streaming: true, text: 'Now verifying the abort path…' })}
            />
        </div>
    ),
};
