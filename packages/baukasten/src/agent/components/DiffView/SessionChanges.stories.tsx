import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DensityProvider } from '../../density';
import type { ApprovalDecision } from '../../types';
import { SessionChanges, type SessionChange } from './SessionChanges';

const UPLOADER_BEFORE = `const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;

export class TelemetryUploader {
    async flushQueue(events: TelemetryEvent[]): Promise<number> {
        for (const batch of chunk(events, this.batchSize)) {
            const response = await fetch(this.endpoint, { method: 'POST' });
            if (!response.ok) {
                this.logger.warn('Upload failed, dropping batch');
                continue;
            }
        }
    }
}`;

const UPLOADER_AFTER = `const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;
const MAX_ATTEMPTS = 5;

export class TelemetryUploader {
    async flushQueue(events: TelemetryEvent[], signal?: AbortSignal): Promise<number> {
        for (const batch of chunk(events, this.batchSize)) {
            if (signal?.aborted) break;
            await this.sendBatch(batch, signal);
        }
    }

    private async sendBatch(batch: TelemetryEvent[], signal?: AbortSignal) {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const response = await fetch(this.endpoint, { method: 'POST', signal });
            if (response.ok) return batch.length;
        }
    }
}`;

const QUEUE_BEFORE = `this.timer = setInterval(() => {
    void this.uploader.flushQueue(this.drain());
}, FLUSH_INTERVAL_MS);`;

const QUEUE_AFTER = `this.controller = new AbortController();
this.timer = setInterval(() => {
    void this.uploader.flushQueue(this.drain(), this.controller.signal);
}, FLUSH_INTERVAL_MS);`;

const SPEC_BEFORE = `it('uploads a batch', async () => {
    await uploader.flushQueue(events);
});`;

const SPEC_AFTER = `it('uploads a batch', async () => {
    await uploader.flushQueue(events);
});

it('retries a transient failure', async () => {
    await uploader.flushQueue(events);
});`;

const CHANGES: SessionChange[] = [
    {
        path: 'src/services/telemetry/uploader.ts',
        original: UPLOADER_BEFORE,
        modified: UPLOADER_AFTER,
    },
    { path: 'src/services/telemetry/queue.ts', original: QUEUE_BEFORE, modified: QUEUE_AFTER },
    { path: 'src/test/telemetry.spec.ts', original: SPEC_BEFORE, modified: SPEC_AFTER },
];

const meta = {
    title: 'Agent/SessionChanges',
    component: SessionChanges,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Everything the run changed, in one place. A run accumulates edits across many tool calls, and reviewing them a tool card at a time is the wrong granularity: nobody wants to approve hunk 3 of 7 in a diff they will meet again two entries later. The unit people actually review is *the changeset*. It reuses `ApprovalDecision` rather than inventing a second resolution model, because a user meets `Approval`, `DiffReview` and this in one session and finding them inconsistent is worse than any of them being individually imperfect.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        changes: { control: false, description: 'Path plus before and after, not a computed diff' },
        onDecide: { description: 'Per file. Receives the path and an ApprovalDecision.' },
        onDecideAll: { description: 'Everything still undecided' },
        density: { control: 'select', options: ['compact', 'comfortable'] },
        acceptLabel: { control: 'text', table: { defaultValue: { summary: 'Accept' } } },
        rejectLabel: { control: 'text', table: { defaultValue: { summary: 'Reject' } } },
    },
} satisfies Meta<typeof SessionChanges>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground, with decisions wired up. */
export const Interactive: Story = {
    args: { changes: CHANGES },
    render: (args) => {
        const [decisions, setDecisions] = useState<Record<string, ApprovalDecision>>({});

        return (
            <div style={{ maxWidth: 620 }}>
                <SessionChanges
                    {...args}
                    changes={CHANGES.map((change) => ({
                        ...change,
                        decision: decisions[change.path],
                    }))}
                    onDecide={(path, decision) =>
                        setDecisions((current) => ({ ...current, [path]: decision }))
                    }
                    onDecideAll={(decision) =>
                        setDecisions(
                            Object.fromEntries(CHANGES.map((change) => [change.path, decision])),
                        )
                    }
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Files start collapsed with their stat visible, because the first question is "what did it touch" and the second is "show me that one" — opening three diffs to answer the first is how this surface becomes unusable in a real run. A decided file stays in the list showing what was chosen; a list that gets shorter as you work loses the record of what you already said.',
            },
        },
    },
};

/** The aggregate stat, and one file expanded. */
export const Expanded: Story = {
    args: { changes: CHANGES },
    render: (args) => (
        <div style={{ maxWidth: 620 }}>
            <SessionChanges {...args} onDecide={() => undefined} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Per-file and total stats are computed from the same diff lines the expanded view renders, so the summary and the detail cannot disagree. Click a path to open it.',
            },
        },
    },
};

/** Part-way through a review. */
export const PartlyDecided: Story = {
    args: { changes: CHANGES },
    render: () => (
        <div style={{ maxWidth: 620 }}>
            <SessionChanges
                changes={[
                    {
                        ...CHANGES[0],
                        decision: {
                            optionId: 'accept',
                            outcome: 'allow',
                            scope: { level: 'once' },
                        },
                    },
                    {
                        ...CHANGES[1],
                        decision: {
                            optionId: 'reject',
                            outcome: 'deny',
                            scope: { level: 'once' },
                        },
                    },
                    CHANGES[2],
                ]}
                onDecide={() => undefined}
                onDecideAll={() => undefined}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The wholesale action counts only what is still undecided, and disappears once nothing is.',
            },
        },
    },
};

/** In a docked panel. */
export const Compact: Story = {
    args: { changes: CHANGES },
    render: (args) => (
        <div style={{ maxWidth: 300 }}>
            <DensityProvider density="compact">
                <SessionChanges
                    {...args}
                    onDecide={() => undefined}
                    onDecideAll={() => undefined}
                />
            </DensityProvider>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Paths truncate from the left, so the filename stays visible — a file is identified by the end of its path far more often than the start.',
            },
        },
    },
};

/** Nothing was touched. */
export const NoChanges: Story = {
    args: { changes: [] },
    render: () => <SessionChanges changes={[]} empty="This run did not change any files." />,
};

export const Showcase: Story = {
    args: { changes: CHANGES },
    parameters: { layout: 'fullscreen' },
    render: () => {
        const [decisions, setDecisions] = useState<Record<string, ApprovalDecision>>({
            'src/test/telemetry.spec.ts': {
                optionId: 'accept',
                outcome: 'allow',
                scope: { level: 'once' },
            },
        });

        return (
            <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 680 }}>
                <SessionChanges
                    changes={CHANGES.map((change) => ({
                        ...change,
                        decision: decisions[change.path],
                    }))}
                    onDecide={(path, decision) =>
                        setDecisions((current) => ({ ...current, [path]: decision }))
                    }
                    onDecideAll={(decision) =>
                        setDecisions(
                            Object.fromEntries(CHANGES.map((change) => [change.path, decision])),
                        )
                    }
                />
            </div>
        );
    },
};
