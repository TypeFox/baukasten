import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../../../components/Typography';
import { TOOL_KINDS, type ToolEntry, type ToolInvocation } from '../../types';
import { ToolCall } from './ToolCall';

function entry(tool: Partial<ToolInvocation>, rest: Partial<ToolEntry> = {}): ToolEntry {
    return {
        id: `t:${tool.correlationId ?? 'c1'}`,
        kind: 'tool',
        tool: {
            correlationId: 'c1',
            kind: 'read',
            title: 'Read',
            status: 'completed',
            ...tool,
        },
        ...rest,
    };
}

const OUTPUT = `if (!response.ok) {
    this.logger.warn(\`Upload failed with \${response.status}, dropping batch\`);
    continue;
}`;

const meta = {
    title: 'Agent/ToolCall',
    component: ToolCall,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'One tool call in a transcript, collapsed to a row and expandable to its body. Handles all four statuses including failure, shows elapsed time and a last-output line once a call has been running a while, and distinguishes a failure the agent recovers from against one that needs a human.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entry: { control: false, description: 'The tool entry from the transcript reducer' },
        tail: {
            control: 'text',
            description: 'Last line of output, shown in the header while the call runs',
        },
        defaultExpanded: {
            control: 'boolean',
            description: 'Whether the body starts open',
            table: { defaultValue: { summary: 'false' } },
        },
        elapsedAfterMs: {
            control: 'number',
            description: 'How long a call must run before the elapsed readout appears',
            table: { defaultValue: { summary: '3000' } },
        },
    },
} satisfies Meta<typeof ToolCall>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
        {children}
    </div>
);

/**
 * Interactive playground. Expand the card, change the target, try a long tail.
 */
export const Interactive: Story = {
    args: {
        entry: entry({ target: 'src/services/telemetry/uploader.ts' }),
        tail: '',
        defaultExpanded: false,
        elapsedAfterMs: 3000,
        children: <Code block>{OUTPUT}</Code>,
    },
    parameters: {
        docs: {
            description: {
                story: 'All the properties exposed. The body only renders if children are supplied — a call with nothing to show does not offer an expand affordance.',
            },
        },
    },
};

/**
 * Every status, including the failure state the original demo had no
 * representation for at all.
 */
export const Statuses: Story = {
    args: { entry: entry({}) },
    render: () => (
        <Row>
            {(['pending', 'running', 'completed', 'failed'] as const).map((status) => (
                <ToolCall
                    key={status}
                    entry={entry({ correlationId: status, status, target: `${status}.ts` })}
                />
            ))}
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Four statuses, four distinct treatments. A pending call and a failed one must not look alike — the demo this was derived from knew only spinner and tick.',
            },
        },
    },
};

/**
 * Every kind we ship an icon for, plus one nobody has ever heard of.
 */
export const Kinds: Story = {
    args: { entry: entry({}) },
    render: () => (
        <Row>
            {[...TOOL_KINDS, 'teleport'].map((kind) => (
                <ToolCall
                    key={kind}
                    entry={entry({ correlationId: kind, kind, title: kind, target: 'file.ts' })}
                />
            ))}
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The last row is a kind this library has never seen. It renders generically rather than throwing or showing nothing, which is the whole point of keeping the enum open.',
            },
        },
    },
};

/**
 * A server that ships its own icons gets to use them.
 */
export const ServerSuppliedIcon: Story = {
    args: {
        entry: entry({
            icons: [{ src: 'https://www.rust-lang.org/logos/rust-logo-32x32.png' }],
            title: 'Analyse',
            target: 'src/main.rs',
        }),
    },
    parameters: {
        docs: {
            description: {
                story: 'Icons arriving on the wire are preferred over the local kind mapping, falling back to a codicon when none is supplied.',
            },
        },
    },
};

/**
 * The worst moment in an agent UI: a call that has been running a while with
 * nothing to show for it.
 */
export const LongRunning: Story = {
    args: { entry: entry({}) },
    render: () => (
        <Row>
            <ToolCall
                entry={entry({ correlationId: 'a', status: 'running', target: 'npm test' })}
                elapsedAfterMs={0}
            />
            <ToolCall
                entry={entry({ correlationId: 'b', status: 'running', title: 'Terminal' })}
                tail="compiling module 12 of 40…"
                elapsedAfterMs={0}
            />
            <ToolCall
                entry={entry({
                    correlationId: 'c',
                    status: 'running',
                    title: 'Index',
                    progress: { value: 34, total: 100, message: 'Indexing workspace' },
                })}
                elapsedAfterMs={0}
            />
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Elapsed time (forced on here by setting the threshold to zero — normally it stays quiet for the first few seconds), a last-output line, and a determinate bar when progress carries a total. The difference between "stuck" and "working" is almost entirely whether anything on screen moves.',
            },
        },
    },
};

/**
 * Two kinds of failure that should not look the same.
 */
export const ErrorTaxonomy: Story = {
    args: { entry: entry({}) },
    render: () => (
        <Row>
            <ToolCall
                entry={entry({
                    correlationId: 'exec',
                    status: 'failed',
                    title: 'Search',
                    error: {
                        scope: 'execution',
                        message: 'Search index is still building. Try again shortly.',
                    },
                })}
            />
            <ToolCall
                entry={entry({
                    correlationId: 'proto',
                    status: 'failed',
                    title: 'Edit',
                    error: { scope: 'protocol', message: 'Unknown tool: edit_file', code: -32602 },
                })}
            />
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The first is the tool running and reporting a problem — the agent will usually read it and try something else, so it is informational. The second is the call itself failing, which generally needs a human. Rendering both as the same red box throws away a distinction the protocol went out of its way to draw.',
            },
        },
    },
};

/**
 * A call that cannot finish until someone answers something.
 */
export const Blocked: Story = {
    args: {
        entry: entry(
            { status: 'running', title: 'Edit', target: 'src/uploader.ts' },
            {
                inputRequests: [
                    {
                        key: 'attempts',
                        kind: 'form',
                        message: 'How many retry attempts?',
                        schema: {},
                    },
                ],
            },
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'A blocked call says so. Left looking merely slow, it is indistinguishable from one that has hung.',
            },
        },
    },
};

/**
 * The narrow case, which is the default shape for this audience.
 */
export const InANarrowPanel: Story = {
    args: { entry: entry({}) },
    render: () => (
        <div style={{ width: 300, border: '1px dashed var(--bk-color-border)' }}>
            <div style={{ padding: 'var(--bk-spacing-2)' }}>
                <ToolCall
                    entry={entry({
                        status: 'running',
                        title: 'Read',
                        target: 'src/services/telemetry/collectors/uploader.ts',
                    })}
                    elapsedAfterMs={0}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'At 300px the path truncates from the left, because the tail of a path is the informative half — every row in a run shares the same prefix.',
            },
        },
    },
};

/**
 * Everything at once.
 */
export const Showcase: Story = {
    args: { entry: entry({}) },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'The full range of states a tool call can be in, in one place.',
            },
        },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 720 }}>
            <Row>
                <ToolCall entry={entry({ correlationId: '1', status: 'pending', title: 'Read' })} />
                <ToolCall
                    entry={entry({
                        correlationId: '2',
                        status: 'running',
                        title: 'Terminal',
                        target: 'npm test -- telemetry',
                    })}
                    tail="✓ retries transient failures (312ms)"
                    elapsedAfterMs={0}
                />
                <ToolCall
                    entry={entry({
                        correlationId: '3',
                        kind: 'edit',
                        title: 'Edit',
                        target: 'src/services/telemetry/uploader.ts',
                    })}
                >
                    <Code block>{OUTPUT}</Code>
                </ToolCall>
                <ToolCall
                    entry={entry({
                        correlationId: '4',
                        kind: 'search',
                        status: 'failed',
                        title: 'Search',
                        error: { scope: 'execution', message: 'Index still building.' },
                    })}
                />
                <ToolCall
                    entry={entry({
                        correlationId: '5',
                        status: 'failed',
                        title: 'Edit',
                        error: { scope: 'protocol', message: 'Unknown tool', code: -32602 },
                    })}
                />
            </Row>
        </div>
    ),
};
