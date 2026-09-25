import type { Meta, StoryObj } from '@storybook/react';
import { serverId, type ApprovalEntry, type ApprovalOption } from '../../types';
import { Approval } from './Approval';
import { ToolArguments } from './ToolArguments';

const alpha = serverId('local#filesystem');

const FULL_OPTIONS: ApprovalOption[] = [
    { id: 'once', label: 'Allow', outcome: 'allow', scope: 'once', shortcut: 'accept' },
    {
        id: 'always',
        label: 'Always allow',
        description: 'For this tool on this server',
        outcome: 'allow',
        scope: 'tool',
    },
    { id: 'deny', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
];

function entry(
    overrides: Partial<ApprovalEntry['request']> = {},
    rest: Partial<ApprovalEntry> = {},
): ApprovalEntry {
    return {
        id: 'a:1',
        kind: 'approval',
        request: {
            id: '1',
            title: 'Run the telemetry test suite',
            description: 'npm test -- telemetry',
            serverId: alpha,
            toolName: 'run_command',
            options: FULL_OPTIONS,
            ...overrides,
        },
        ...rest,
    };
}

const meta = {
    title: 'Agent/Approval',
    component: Approval,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A request for permission and the decision that answers it. Options are supplied by the caller rather than hardcoded, because allow-once and allow-always are different decisions and "always" needs a scope. Severity is always the application\'s call — never derived from server-supplied metadata, which a hostile server could use to dress down its own consent prompt.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entry: { control: false, description: 'The approval entry, carrying options and outcome' },
        severity: {
            control: 'select',
            options: ['low', 'normal', 'high'],
            description: 'How alarming this should look. Supplied by the application.',
            table: { defaultValue: { summary: 'normal' } },
        },
        keyboard: {
            control: 'boolean',
            description: 'Bind Enter, Escape and number keys. Turn off when several are on screen.',
            table: { defaultValue: { summary: 'true' } },
        },
        onDecide: { description: 'Receives the chosen option, its outcome and its resolved scope' },
    },
} satisfies Meta<typeof Approval>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: 560 }}
    >
        {children}
    </div>
);

/**
 * Interactive playground. Try the keyboard: Enter allows once, Escape rejects,
 * and the numbers address every option including the standing grant.
 */
export const Interactive: Story = {
    args: { entry: entry(), severity: 'normal', keyboard: true },
    parameters: {
        docs: {
            description: {
                story: 'Enter and Escape bind to the options marked as shortcuts. Everything else is addressed by number, which is deliberate — a standing grant should not be one keystroke away.',
            },
        },
    },
};

/**
 * The three severities. This is a prop, not an inference.
 */
export const Severities: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Approval
                entry={entry({ id: '1', title: 'Read a file' })}
                severity="low"
                keyboard={false}
            />
            <Approval
                entry={entry({ id: '2', title: 'Run the test suite' })}
                severity="normal"
                keyboard={false}
            />
            <Approval
                entry={entry({ id: '3', title: 'Delete src/services/telemetry/' })}
                severity="high"
                keyboard={false}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: "Tool metadata may inform the application's choice of severity, but only the application knows which servers it trusts. Deriving this from server-controlled data would let a destructive tool present itself as routine.",
            },
        },
    },
};

/**
 * Not every client offers the same choices.
 */
export const OptionSets: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Approval
                entry={entry({
                    id: '1',
                    title: 'A client that cannot remember anything',
                    options: [
                        {
                            id: 'y',
                            label: 'Allow',
                            outcome: 'allow',
                            scope: 'once',
                            shortcut: 'accept',
                        },
                        {
                            id: 'n',
                            label: 'Reject',
                            outcome: 'deny',
                            scope: 'once',
                            shortcut: 'reject',
                        },
                    ],
                })}
                keyboard={false}
            />
            <Approval entry={entry({ id: '2', title: 'A client that can' })} keyboard={false} />
            <Approval
                entry={entry({
                    id: '3',
                    title: 'A client offering server-wide trust',
                    options: [
                        ...FULL_OPTIONS,
                        {
                            id: 'server',
                            label: 'Trust this server',
                            description: 'Every tool it offers',
                            outcome: 'allow',
                            scope: 'server',
                        },
                    ],
                })}
                keyboard={false}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The option list is data. What a client offers depends on what it can actually remember, so hardcoding two buttons is wrong for any real client.',
            },
        },
    },
};

/**
 * Once decided, the card stays.
 */
export const Resolved: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Approval
                entry={entry(
                    { id: '1' },
                    {
                        decision: {
                            optionId: 'always',
                            outcome: 'allow',
                            scope: { level: 'tool', serverId: alpha, toolName: 'run_command' },
                        },
                    },
                )}
            />
            <Approval
                entry={entry(
                    { id: '2', title: 'Delete the telemetry directory' },
                    {
                        decision: {
                            optionId: 'deny',
                            outcome: 'deny',
                            scope: { level: 'once' },
                        },
                    },
                )}
                severity="high"
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Removing a decided card loses the record of a decision the user may need to revisit, and leaves a hole where something clearly happened.',
            },
        },
    },
};

/**
 * What the call is about to be made with.
 */
export const WithArguments: Story = {
    args: { entry: entry() },
    render: () => (
        <Stack>
            <Approval
                entry={entry(
                    { id: '1', title: 'Send a request to api.example.com' },
                    {
                        request: {
                            ...entry().request,
                            id: '1',
                            title: 'Send a request to api.example.com',
                            tool: {
                                correlationId: 'c1',
                                kind: 'fetch',
                                title: 'Fetch',
                                status: 'pending',
                                arguments: {
                                    url: 'https://api.example.com/v1/upload',
                                    method: 'POST',
                                    body: `${'sensitive-looking payload '.repeat(12)}`,
                                },
                            },
                        },
                    },
                )}
                keyboard={false}
            />
            <ToolArguments value={{ filter: { nested: true, values: [1, 2, 3] } }} />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showing tool inputs before the call is a client requirement, aimed squarely at data exfiltration. Long values truncate but can be opened — an exfiltration attempt *is* a long string value, so hiding it silently would defeat the point. Anything with nesting falls back to formatted JSON rather than being half-rendered.',
            },
        },
    },
};

/**
 * Everything at once.
 */
export const Showcase: Story = {
    args: { entry: entry() },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'The range of consent states in one place.' } },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
            <Stack>
                <Approval
                    entry={entry({ id: '1', title: 'Read src/uploader.ts' })}
                    severity="low"
                    keyboard={false}
                />
                <Approval entry={entry({ id: '2' })} keyboard={false} />
                <Approval
                    entry={entry({ id: '3', title: 'Delete src/services/telemetry/' })}
                    severity="high"
                    keyboard={false}
                />
                <Approval
                    entry={entry(
                        { id: '4', title: 'Run the test suite' },
                        {
                            decision: {
                                optionId: 'once',
                                outcome: 'allow',
                                scope: { level: 'once' },
                            },
                        },
                    )}
                />
            </Stack>
        </div>
    ),
};
