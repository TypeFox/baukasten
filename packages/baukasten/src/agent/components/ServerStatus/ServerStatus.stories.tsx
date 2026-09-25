import type { Meta, StoryObj } from '@storybook/react';
import { serverId } from '../../types';
import type { ServerDescriptor } from '../../servers';
import { ServerList, ServerStatus } from './ServerStatus';

const FILESYSTEM = serverId('local#filesystem');
const GITHUB = serverId('remote#github');
const SEARCH = serverId('remote#search');

function server(overrides: Partial<ServerDescriptor> = {}): ServerDescriptor {
    return {
        id: FILESYSTEM,
        name: 'Filesystem',
        version: '1.4.2',
        description: 'Reads and writes files in the open workspace.',
        capabilities: ['tools', 'resources', 'prompts'],
        health: 'ok',
        ...overrides,
    };
}

const meta = {
    title: 'Agent/ServerStatus',
    component: ServerStatus,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'What is known about one server. **Not a connection indicator** — MCP 2026-07-28 removed the handshake, protocol sessions and the session header, so the connected/connecting/failed machine every client used to draw describes nothing that exists. What can honestly be shown is reachability, whether the advertised protocol revision is one we can speak, and how recent requests have gone. The heading is titled with the client-minted id, never `serverInfo.name`, which the specification says is not unique.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        server: { control: false, description: 'Identity, capabilities and recent health' },
        showCapabilities: {
            control: 'boolean',
            description: 'Show the capabilities the server advertises',
            table: { defaultValue: { summary: 'true' } },
        },
        onRefresh: {
            description: 'Offered as a button when supplied. Receives the server id.',
        },
        refreshLabel: {
            control: 'text',
            table: { defaultValue: { summary: 'Check again' } },
        },
    },
} satisfies Meta<typeof ServerStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-sm)', maxWidth: 480 }}
    >
        {children}
    </div>
);

/** Interactive playground. */
export const Interactive: Story = {
    args: { server: server(), showCapabilities: true },
    parameters: {
        docs: {
            description: {
                story: 'Hover the server name to see the client-minted id — that is what every scope, grouping and permission key in this library hangs off.',
            },
        },
    },
};

/** Every state, quietest first. */
export const Health: Story = {
    args: { server: server() },
    render: () => (
        <Stack>
            <ServerStatus
                server={server({ id: FILESYSTEM, name: 'Never used', health: 'unknown' })}
            />
            <ServerStatus server={server({ id: GITHUB, name: 'Responding', health: 'ok' })} />
            <ServerStatus
                server={server({
                    id: SEARCH,
                    name: 'Degraded',
                    health: 'degraded',
                    statusMessage: '3 of the last 10 requests failed',
                })}
            />
            <ServerStatus
                server={server({ id: SEARCH, name: 'Unreachable', health: 'unreachable' })}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Only the two states that need action get a border colour. A panel of servers is looked at when something is wrong, and colouring the healthy ones green makes the broken one harder to find rather than easier. `unknown` is the honest state before anything has been asked of a server — distinct from `ok`.',
            },
        },
    },
};

/** The one that stops an agent working, stated in full. */
export const ProtocolMismatch: Story = {
    args: { server: server() },
    render: () => (
        <Stack>
            <ServerStatus
                server={server({
                    name: 'Legacy filesystem server',
                    health: 'ok',
                    protocolVersion: '2025-06-18',
                    expectedProtocolVersion: '2026-07-28',
                })}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A mismatch overrides whatever health was reported — responding correctly to a revision we cannot speak is not "ok". Both version strings are printed because they are the whole content of the problem: the adapter refuses to map an unknown revision, and a user meeting that failure with only the word "incompatible" has no way to act on it.',
            },
        },
    },
};

/** Supply a handler and each card offers a way to re-ask. */
export const Refreshable: Story = {
    args: {
        server: server(),
        onRefresh: (id) => console.log('rediscover', id),
    },
    parameters: {
        docs: {
            description: {
                story: 'The callback receives the server id, so one handler serves a whole list.',
            },
        },
    },
};

/** Several at once, worst first. */
export const List: Story = {
    args: { server: server() },
    render: () => (
        <div style={{ maxWidth: 480 }}>
            <ServerList
                servers={[
                    server({ id: FILESYSTEM, name: 'Filesystem', health: 'ok' }),
                    server({
                        id: SEARCH,
                        name: 'Search index',
                        health: 'unreachable',
                        statusMessage: 'No response in 30s',
                        capabilities: ['tools'],
                    }),
                    server({
                        id: GITHUB,
                        name: 'GitHub',
                        health: 'degraded',
                        capabilities: ['tools', 'resources'],
                    }),
                ]}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Ordered by health rather than by name on purpose: the list exists to be glanced at when something is wrong, and alphabetical order buries the thing that is wrong somewhere in the middle.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { server: server() },
    parameters: { layout: 'fullscreen' },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 520 }}>
            <ServerList
                servers={[
                    server({
                        id: SEARCH,
                        name: 'Search index',
                        protocolVersion: '2025-06-18',
                        expectedProtocolVersion: '2026-07-28',
                    }),
                    server({
                        id: GITHUB,
                        name: 'GitHub',
                        health: 'degraded',
                        statusMessage: 'Rate limited until 14:20',
                        capabilities: ['tools'],
                    }),
                    server({ id: FILESYSTEM, name: 'Filesystem', health: 'ok' }),
                    server({
                        id: serverId('local#sqlite'),
                        name: 'SQLite',
                        health: 'unknown',
                        version: '0.9.0',
                        capabilities: ['resources'],
                    }),
                ]}
                onRefresh={(id) => console.log('rediscover', id)}
            />
        </div>
    ),
};
