import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { serverId } from '../../types';
import type { ServerDescriptor, ToolDescriptor } from '../../servers';
import { ToolPicker } from './ToolPicker';

const FILESYSTEM = serverId('local#filesystem');
const GITHUB = serverId('remote#github');

const SERVERS: ServerDescriptor[] = [
    { id: FILESYSTEM, name: 'Filesystem' },
    { id: GITHUB, name: 'GitHub' },
];

const TOOLS: ToolDescriptor[] = [
    {
        name: 'read_file',
        serverId: FILESYSTEM,
        description: 'Read a file from the workspace',
        tokens: 180,
    },
    { name: 'write_file', serverId: FILESYSTEM, description: 'Write a file', tokens: 220 },
    // The specification's own collision example: two servers, one name.
    { name: 'search', serverId: FILESYSTEM, description: 'Search the workspace', tokens: 260 },
    { name: 'search', serverId: GITHUB, description: 'Search issues and PRs', tokens: 310 },
    {
        name: 'create_issue',
        serverId: GITHUB,
        description: 'Open an issue on the repository',
        tokens: 450,
    },
    {
        name: 'delete_repo',
        serverId: GITHUB,
        availability: 'rejected',
        unavailableReason: 'Invalid x-mcp-header value',
    },
];

const meta = {
    title: 'Agent/ToolPicker',
    component: ToolPicker,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    "Which tools the model can see. The specification asks applications to make this visible, and the reason is not tidiness — every loaded definition costs context before anyone types, so this is the control that makes `UsageMeter`'s numbers actionable. Grouped and keyed by the client-minted server id throughout, because a bare tool name does not identify a tool.",
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        tools: { control: false, description: 'Every tool, available or not' },
        enabled: {
            control: false,
            description: 'Exposed tool names, keyed by server id — not a flat set',
        },
        servers: { control: false, description: 'Supplies display names for the group headings' },
        showCounts: {
            control: 'boolean',
            description: 'Show how many of each server’s tools are exposed',
            table: { defaultValue: { summary: 'true' } },
        },
        onChange: { description: 'Receives the whole enabled map' },
    },
} satisfies Meta<typeof ToolPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground, with state wired up. */
export const Interactive: Story = {
    args: { tools: TOOLS, enabled: {}, onChange: () => undefined, servers: SERVERS },
    render: (args) => {
        const [enabled, setEnabled] = useState<Readonly<Record<string, readonly string[]>>>({
            [FILESYSTEM]: ['read_file', 'search'],
            [GITHUB]: ['search'],
        });

        return (
            <div style={{ maxWidth: 440 }}>
                <ToolPicker {...args} enabled={enabled} onChange={setEnabled} />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Both servers expose a tool called `search`. Toggle one and the other stays as it was — a flat set of names would turn both on together, which is the collision the specification calls out.',
            },
        },
    },
};

/** A tool the client had to exclude, with the reason it was excluded. */
export const RejectedTools: Story = {
    args: { tools: TOOLS, enabled: {}, onChange: () => undefined, servers: SERVERS },
    render: (args) => (
        <div style={{ maxWidth: 440 }}>
            <ToolPicker
                {...args}
                tools={TOOLS.filter((tool) => tool.serverId === GITHUB)}
                servers={SERVERS}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A client on Streamable HTTP **must** exclude tools whose `x-mcp-header` values are invalid, and **should** log the name and the reason. Dropping them from the list silently is how a missing tool becomes a support ticket; listing it as unavailable with the reason lets it answer itself. It renders disabled — there is nothing to toggle — and is excluded from the counts and from select-all.',
            },
        },
    },
};

/** The per-server control, including the half-on state. */
export const SelectAll: Story = {
    args: { tools: TOOLS, enabled: {}, onChange: () => undefined, servers: SERVERS },
    render: (args) => {
        const [enabled, setEnabled] = useState<Readonly<Record<string, readonly string[]>>>({
            [FILESYSTEM]: ['read_file'],
        });

        return (
            <div style={{ maxWidth: 440 }}>
                <ToolPicker {...args} enabled={enabled} onChange={setEnabled} />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Some but not all is an indeterminate checkbox, not an unchecked one — otherwise turning a server "off" from a half state looks like it did nothing.',
            },
        },
    },
};

/** What each definition costs to keep loaded. */
export const TokenCosts: Story = {
    args: {
        tools: TOOLS,
        enabled: { [FILESYSTEM]: ['read_file', 'write_file', 'search'] },
        onChange: () => undefined,
        servers: SERVERS,
    },
    render: (args) => (
        <div style={{ maxWidth: 440 }}>
            <ToolPicker {...args} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Optional, and only shown where the host can estimate it. It is the number that makes turning tools off feel worthwhile rather than fussy.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { tools: TOOLS, enabled: {}, onChange: () => undefined, servers: SERVERS },
    parameters: { layout: 'fullscreen' },
    render: (args) => {
        const [enabled, setEnabled] = useState<Readonly<Record<string, readonly string[]>>>({
            [FILESYSTEM]: ['read_file', 'search'],
            [GITHUB]: ['search', 'create_issue'],
        });

        return (
            <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 460 }}>
                <ToolPicker {...args} enabled={enabled} onChange={setEnabled} />
            </div>
        );
    },
};
