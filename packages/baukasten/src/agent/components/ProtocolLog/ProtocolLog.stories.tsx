import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { serverId } from '../../types';
import type { ProtocolMessage } from '../../servers';
import { ProtocolLog } from './ProtocolLog';

const FILESYSTEM = serverId('local#filesystem');
const GITHUB = serverId('remote#github');

/**
 * A run with a retry in it.
 *
 * `op-2` carries three messages under two different transport ids, which is the
 * shape a stateless protocol produces and the reason correlation is worth
 * drawing.
 */
const MESSAGES: ProtocolMessage[] = [
    {
        id: '1',
        direction: 'outgoing',
        method: 'tools/list',
        serverId: FILESYSTEM,
        requestId: 'r-1',
        correlationId: 'op-1',
        payload: { method: 'tools/list', params: {} },
        durationMs: 8,
    },
    {
        id: '2',
        direction: 'incoming',
        method: 'response',
        serverId: FILESYSTEM,
        requestId: 'r-1',
        correlationId: 'op-1',
        payload: { result: { tools: [{ name: 'read_file' }, { name: 'search' }] } },
    },
    {
        id: '3',
        direction: 'outgoing',
        method: 'tools/call',
        serverId: GITHUB,
        requestId: 'r-2',
        correlationId: 'op-2',
        payload: {
            method: 'tools/call',
            params: {
                name: 'create_issue',
                arguments: { title: 'Retry telemetry uploads' },
                _meta: { requestState: 'AEAD:v1:8f3c…' },
            },
        },
        durationMs: 412,
    },
    {
        id: '4',
        direction: 'incoming',
        method: 'error',
        serverId: GITHUB,
        requestId: 'r-2',
        correlationId: 'op-2',
        error: { code: -32603, message: 'Upstream rate limit reached' },
        payload: { error: { code: -32603, message: 'Upstream rate limit reached' } },
    },
    {
        id: '5',
        direction: 'outgoing',
        method: 'tools/call',
        serverId: GITHUB,
        // A fresh transport id for the same logical operation.
        requestId: 'r-3',
        correlationId: 'op-2',
        payload: {
            method: 'tools/call',
            params: { name: 'create_issue', _meta: { requestState: 'AEAD:v1:8f3c…' } },
        },
        durationMs: 388,
    },
];

const meta = {
    title: 'Agent/ProtocolLog',
    component: ProtocolLog,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Raw JSON-RPC traffic, for the people building the server on the other end. Worth more under a **stateless** protocol than it would have been before: with no session, state round-trips through opaque blobs and every retry carries a fresh transport id, so following one logical operation through its retries is guesswork from a text log. **`requestState` is redacted by default** — servers are told to put integrity-protected authorization context there and clients must not inspect it, so a viewer that printed it would put a credential in every screenshot taken of it.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        messages: { control: false },
        reveal: {
            control: 'boolean',
            description: 'Show values that are redacted by default',
            table: { defaultValue: { summary: 'false' } },
        },
        redactKeys: { control: false, description: 'Replaces the built-in key list' },
        filter: { control: 'text', description: 'Free text over method, server and error' },
        correlate: {
            control: 'boolean',
            description: 'Group a retry chain back to its operation',
            table: { defaultValue: { summary: 'true' } },
        },
        virtualizeThreshold: {
            control: 'number',
            table: { defaultValue: { summary: '100' } },
        },
    },
} satisfies Meta<typeof ProtocolLog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Wired({
    messages = MESSAGES,
    ...rest
}: Partial<React.ComponentProps<typeof ProtocolLog>>) {
    const [filter, setFilter] = useState('');
    const [reveal, setReveal] = useState(false);

    return (
        <div style={{ height: 420, display: 'flex', border: '1px solid var(--bk-color-border)' }}>
            <ProtocolLog
                messages={messages}
                filter={filter}
                onFilterChange={setFilter}
                reveal={reveal}
                onRevealChange={setReveal}
                {...rest}
            />
        </div>
    );
}

/** Interactive playground. Expand a row to see its payload. */
export const Interactive: Story = {
    args: { messages: MESSAGES },
    render: () => <Wired />,
    parameters: {
        docs: {
            description: {
                story: 'Open the `tools/call` row: the `requestState` reads `[redacted]`. Tick "Show redacted" to reveal it — a deliberate act with a visible control, so that withholding is legible rather than a setting someone inherited.',
            },
        },
    },
};

/** The thing a text log cannot give you. */
export const RetryChains: Story = {
    args: { messages: MESSAGES },
    render: () => <Wired />,
    parameters: {
        docs: {
            description: {
                story: 'Three messages share `op-2` across two transport ids, marked `×3`. Under a stateless protocol the transport id changes on every retry, so correlating them back to one logical operation is most of what makes this better than `console.log`.',
            },
        },
    },
};

/** Correlation off, for a host that does not track it. */
export const WithoutCorrelation: Story = {
    args: { messages: MESSAGES },
    render: () => <Wired correlate={false} />,
};

/** Filtering by method, server or error message. */
export const Filtered: Story = {
    args: { messages: MESSAGES },
    render: () => {
        const [filter, setFilter] = useState('rate limit');
        return (
            <div
                style={{ height: 320, display: 'flex', border: '1px solid var(--bk-color-border)' }}
            >
                <ProtocolLog messages={MESSAGES} filter={filter} onFilterChange={setFilter} />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'The count says how much is being hidden. Searching the error message is what people actually reach for when something has gone wrong.',
            },
        },
    },
};

/** Nothing matched. */
export const Empty: Story = {
    args: { messages: MESSAGES },
    render: () => <Wired filter="zzzz" empty="No traffic matches that filter." />,
};

export const Showcase: Story = {
    args: { messages: MESSAGES },
    parameters: { layout: 'fullscreen' },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)', height: '100vh', boxSizing: 'border-box' }}>
            <Wired />
        </div>
    ),
};
