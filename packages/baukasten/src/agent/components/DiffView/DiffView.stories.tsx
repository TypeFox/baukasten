import type { Meta, StoryObj } from '@storybook/react';
import { serverId, type ApprovalEntry } from '../../types';
import { DiffReview } from './DiffReview';
import { DiffStatText, DiffView } from './DiffView';

const BEFORE = `const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;

export class TelemetryUploader {
    async flushQueue(events: TelemetryEvent[]): Promise<number> {
        let uploaded = 0;

        for (const batch of chunk(events, this.batchSize)) {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                body: JSON.stringify({ events: batch }),
            });

            if (!response.ok) {
                this.logger.warn(\`Upload failed with \${response.status}\`);
                continue;
            }

            uploaded += batch.length;
        }

        return uploaded;
    }
}`;

const AFTER = `const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;
const MAX_ATTEMPTS = 5;

export class TelemetryUploader {
    async flushQueue(events: TelemetryEvent[], signal?: AbortSignal): Promise<number> {
        let uploaded = 0;

        for (const batch of chunk(events, this.batchSize)) {
            if (signal?.aborted) break;
            uploaded += await this.sendBatch(batch, signal);
        }

        return uploaded;
    }

    private async sendBatch(batch: TelemetryEvent[]): Promise<number> {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                body: JSON.stringify({ events: batch }),
            });

            if (response.ok) return batch.length;
            await sleep(backoffDelay(attempt));
        }

        return 0;
    }
}`;

const approval: ApprovalEntry = {
    id: 'a:diff',
    kind: 'approval',
    request: {
        id: 'diff',
        title: 'Apply this change?',
        serverId: serverId('local#filesystem'),
        toolName: 'edit_file',
        options: [
            { id: 'accept', label: 'Accept', outcome: 'allow', scope: 'once', shortcut: 'accept' },
            { id: 'reject', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
        ],
    },
};

const meta = {
    title: 'Agent/DiffView',
    component: DiffView,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A proposed change, rendered without an editor. The demo this replaced could reach for Monaco because it already had one loaded; a component library cannot, so the diff is computed in-package with Myers and rendered as rows — which also means it works in a 300px panel, where a hosted editor does not.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        original: { control: 'text', description: 'Left side' },
        modified: { control: 'text', description: 'Right side' },
        path: { control: 'text', description: 'Shown in the toolbar' },
        split: {
            control: 'boolean',
            description: 'Side-by-side instead of unified',
            table: { defaultValue: { summary: 'false' } },
        },
        context: {
            control: 'number',
            description: 'Unchanged lines kept around each change',
            table: { defaultValue: { summary: '3' } },
        },
    },
} satisfies Meta<typeof DiffView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground. Try toggling split, and widening the context.
 */
export const Interactive: Story = {
    args: {
        original: BEFORE,
        modified: AFTER,
        path: 'src/services/telemetry/uploader.ts',
        split: false,
        context: 3,
    },
};

/**
 * Unified and split, same change.
 */
export const Layouts: Story = {
    args: { original: BEFORE, modified: AFTER },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)' }}>
            <DiffView original={BEFORE} modified={AFTER} path="unified.ts" />
            <DiffView original={BEFORE} modified={AFTER} path="split.ts" split />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The +/- marker is a character, not only a background wash — so the diff stays readable to someone who cannot distinguish the two colours, and survives being copied out as text.',
            },
        },
    },
};

/**
 * Long unchanged stretches are dropped.
 */
export const Hunks: Story = {
    args: { original: '', modified: '' },
    render: () => {
        const long = Array.from({ length: 60 }, (_, index) => `line ${index}`).join('\n');
        const edited = long.replace('line 5', 'line 5 edited').replace('line 50', 'line 50 edited');
        return <DiffView original={long} modified={edited} path="sixty-lines.ts" />;
    },
    parameters: {
        docs: {
            description: {
                story: 'Two changes sixty lines apart become two hunks. An agent edit is typically three hunks in a four-hundred-line file, and rendering all four hundred buries the part being judged.',
            },
        },
    },
};

/**
 * Nothing changed.
 */
export const NoChanges: Story = {
    args: { original: BEFORE, modified: BEFORE, path: 'unchanged.ts' },
};

/**
 * The readout, which appears in several places and must agree with itself.
 */
export const Stats: Story = {
    args: { original: '', modified: '' },
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-lg)' }}>
            <DiffStatText stats={{ added: 0, removed: 0 }} />
            <DiffStatText stats={{ added: 18, removed: 4 }} />
            <DiffStatText stats={{ added: 0, removed: 132 }} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Extracted as its own component because the demo had to share a private helper between two files to keep three call sites consistent — which is a component asking to exist.',
            },
        },
    },
};

/**
 * A diff you are being asked to decide about.
 */
export const Review: Story = {
    args: { original: BEFORE, modified: AFTER },
    render: () => (
        <DiffReview
            original={BEFORE}
            modified={AFTER}
            path="src/services/telemetry/uploader.ts"
            entry={approval}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Built on `Approval` rather than growing its own buttons, so shortcuts, scopes and the persisted outcome behave exactly as they do everywhere else a permission is granted. Two consent surfaces with different keyboard models is worse than one slightly more general component.',
            },
        },
    },
};

/**
 * The narrow case, which is where a hosted editor would not fit at all.
 */
export const Showcase: Story = {
    args: { original: BEFORE, modified: AFTER },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'At 320px, in a docked panel. This is the width that decides whether the component is usable for this audience.',
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: 'var(--bk-spacing-6)' }}>
                <DiffView original={BEFORE} modified={AFTER} path="wide.ts" split />
            </div>
            <div
                style={{
                    width: 320,
                    borderLeft: '1px solid var(--bk-color-border)',
                    padding: 'var(--bk-spacing-3)',
                    overflow: 'auto',
                }}
            >
                <DiffReview
                    original={BEFORE}
                    modified={AFTER}
                    path="src/services/telemetry/uploader.ts"
                    entry={approval}
                />
            </div>
        </div>
    ),
};
