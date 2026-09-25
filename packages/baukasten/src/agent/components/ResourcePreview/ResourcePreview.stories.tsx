import type { Meta, StoryObj } from '@storybook/react';
import { serverId } from '../../types';
import { ResourcePreview } from './ResourcePreview';

const FILESYSTEM = serverId('local#filesystem');

const SNIPPET = `export class TelemetryUploader {
    async flushQueue(events: TelemetryEvent[]): Promise<number> {
        let uploaded = 0;
        for (const batch of chunk(events, this.batchSize)) {
            uploaded += await this.sendBatch(batch);
        }
        return uploaded;
    }
}`;

// A 1×1 transparent PNG, so the image branch has something real to draw.
const PIXEL =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const meta = {
    title: 'Agent/ResourcePreview',
    component: ResourcePreview,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A pinned resource, made inspectable. Three things here each fail only against a real server, which is why they are handled rather than assumed: a read returns **N** contents and rendering `contents[0]` silently drops the rest; a `resource_link` returned by a tool is explicitly not guaranteed to appear in `resources/list`, so "readable but not describable" is an ordinary state; and `size` is carried on the wire, so the guard is a real check rather than guesswork.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        resource: {
            control: false,
            description: 'What is known before reading — may be a URI alone',
        },
        contents: { control: false, description: 'Everything the read returned, not the first' },
        loading: { control: 'boolean' },
        error: { control: 'text' },
        sizeLimit: {
            control: 'number',
            description: 'Bytes above which the preview is withheld until asked for',
            table: { defaultValue: { summary: '524288' } },
        },
        revealLabel: { control: 'text', table: { defaultValue: { summary: 'Show anyway' } } },
    },
} satisfies Meta<typeof ResourcePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: 520 }}
    >
        {children}
    </div>
);

/** Interactive playground. */
export const Interactive: Story = {
    args: {
        resource: {
            uri: 'file:///src/services/telemetry/uploader.ts',
            name: 'uploader.ts',
            description: 'The uploader the agent is editing',
            mimeType: 'text/typescript',
            size: 2_048,
            serverId: FILESYSTEM,
        },
        contents: [{ text: SNIPPET, mimeType: 'text/typescript' }],
    },
};

/** A directory resource returns one content per file. */
export const SeveralContents: Story = {
    args: { resource: { uri: 'file:///src/services/telemetry' } },
    render: () => (
        <Stack>
            <ResourcePreview
                resource={{
                    uri: 'file:///src/services/telemetry',
                    name: 'telemetry/',
                    description: 'Every file in the directory',
                }}
                contents={[
                    { uri: 'file:///…/queue.ts', name: 'queue.ts', text: 'export class Queue {}' },
                    {
                        uri: 'file:///…/types.ts',
                        name: 'types.ts',
                        text: 'export interface TelemetryEvent {}',
                    },
                    { uri: 'file:///…/uploader.ts', name: 'uploader.ts', text: SNIPPET },
                ]}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Each content is named only when there is more than one to tell apart. A component that rendered `contents[0]` would show one file and silently drop the other two.',
            },
        },
    },
};

/** Text, image, and something we cannot draw. */
export const ContentKinds: Story = {
    args: { resource: { uri: 'file:///x' } },
    render: () => (
        <Stack>
            <ResourcePreview
                resource={{
                    uri: 'file:///README.md',
                    name: 'README.md',
                    mimeType: 'text/markdown',
                }}
                contents={[{ text: '# Telemetry\n\nShips events to the collector.' }]}
            />
            <ResourcePreview
                resource={{ uri: 'file:///logo.png', name: 'logo.png', mimeType: 'image/png' }}
                contents={[{ mimeType: 'image/png', blob: PIXEL }]}
            />
            <ResourcePreview
                resource={{ uri: 'file:///module.wasm', name: 'module.wasm' }}
                contents={[{ mimeType: 'application/wasm', blob: 'AGFzbQ==' }]}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The fallback names what it cannot draw. An empty box would be worse, and refusing to render the entry at all would be worse still.',
            },
        },
    },
};

/** Readable, but nothing is known about it in advance. */
export const NotListable: Story = {
    args: { resource: { uri: 'file:///tmp/scratch-4821' } },
    render: () => (
        <Stack>
            <ResourcePreview
                resource={{ uri: 'file:///tmp/scratch-4821', listed: false }}
                contents={[{ text: 'temporary output' }]}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: '`resource_link`s returned by tools are explicitly not guaranteed to appear in `resources/list`. Saying so plainly is what tells a reader whether the missing description means "empty" or "unknowable" — and the URI is the only field guaranteed to exist.',
            },
        },
    },
};

/** Pinning a 40 MB file should not take the webview down. */
export const SizeGuard: Story = {
    args: { resource: { uri: 'file:///dump.bin' } },
    render: () => (
        <Stack>
            <ResourcePreview
                resource={{ uri: 'file:///heap-dump.bin', name: 'heap-dump.bin', size: 41_943_040 }}
                contents={[{ text: 'a very large amount of text' }]}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Metadata renders; the preview waits behind a click. Resources carry an optional `size`, so this is a real check rather than guesswork.',
            },
        },
    },
};

/** In flight, and failed. */
export const States: Story = {
    args: { resource: { uri: 'file:///x' } },
    render: () => (
        <Stack>
            <ResourcePreview resource={{ uri: 'file:///slow.ts', name: 'slow.ts' }} loading />
            <ResourcePreview
                resource={{ uri: 'file:///gone.ts', name: 'gone.ts' }}
                error="No such resource on this server."
            />
        </Stack>
    ),
};

export const Showcase: Story = {
    args: { resource: { uri: 'file:///x' } },
    parameters: { layout: 'fullscreen' },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
            <Stack>
                <ResourcePreview
                    resource={{
                        uri: 'file:///src/services/telemetry/uploader.ts',
                        name: 'uploader.ts',
                        mimeType: 'text/typescript',
                        size: 2_048,
                        serverId: FILESYSTEM,
                    }}
                    contents={[{ text: SNIPPET }]}
                />
                <ResourcePreview
                    resource={{ uri: 'file:///tmp/scratch-4821', listed: false }}
                    contents={[{ text: 'temporary output' }]}
                />
                <ResourcePreview
                    resource={{
                        uri: 'file:///heap-dump.bin',
                        name: 'heap-dump.bin',
                        size: 41_943_040,
                    }}
                    contents={[{ text: 'enormous' }]}
                />
            </Stack>
        </div>
    ),
};
