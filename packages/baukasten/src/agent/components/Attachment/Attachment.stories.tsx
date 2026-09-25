import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { PromptAttachment } from '../../types';
import { Attachment, AttachmentList } from './Attachment';

const IMAGE =
    'data:image/svg+xml;base64,' +
    btoa(
        `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40"><rect width="64" height="40" fill="#4c8"/><circle cx="20" cy="20" r="10" fill="#fff"/></svg>`,
    );

const ITEMS: PromptAttachment[] = [
    {
        id: '1',
        kind: 'image',
        name: 'screenshot-2026-09-14.png',
        mimeType: 'image/png',
        size: 184_320,
        previewUrl: IMAGE,
    },
    { id: '2', kind: 'text', name: 'stack-trace.txt', mimeType: 'text/plain', size: 2_048 },
    { id: '3', kind: 'audio', name: 'voice-note.wav', mimeType: 'audio/wav', size: 1_048_576 },
    { id: '4', kind: 'file', name: 'heap-dump.hprof', size: 41_943_040 },
    // A kind this library has never heard of.
    { id: '5', kind: 'bpmn-selection', name: '3 nodes selected' },
];

const meta = {
    title: 'Agent/Attachment',
    component: Attachment,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Something carried alongside a prompt rather than inside its text. Deliberately not a `PromptNode` — a mention\'s position in the sentence carries meaning and an attachment\'s does not, so "look at this" means the same wherever the image is listed. Nothing here assumes an image: a host can attach a selection, a diagram export, or an object of its own with no bytes at all.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        attachment: { control: false },
        onRemove: {
            description: 'Offered as a button when supplied. Without it the chip is read-only.',
        },
        showSize: {
            control: 'boolean',
            description: 'Show the byte count',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    args: { attachment: ITEMS[0], showSize: true, onRemove: () => undefined },
};

/**
 * Every kind, including one nobody registered.
 */
export const Kinds: Story = {
    args: { attachment: ITEMS[0] },
    render: () => <AttachmentList attachments={ITEMS} onRemove={() => undefined} />,
    parameters: {
        docs: {
            source: { code: `<AttachmentList attachments={attachments} onRemove={remove} />` },
            description: {
                story: 'An image gets a thumbnail; everything else gets a glyph for its kind. The last row is a kind invented by the host — it falls back to a generic file rather than rendering nothing, because an attachment may well be something this library has never heard of.',
            },
        },
    },
};

/**
 * Removal, which is the point of the chip.
 */
export const Removable: Story = {
    args: { attachment: ITEMS[0] },
    render: function Removable() {
        const [items, setItems] = useState(ITEMS);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
                <AttachmentList
                    attachments={items}
                    onRemove={(id) => setItems((all) => all.filter((item) => item.id !== id))}
                />
                {items.length === 0 && (
                    <span
                        style={{
                            fontSize: 'var(--bk-font-size-sm)',
                            color: 'var(--bk-color-foreground-muted)',
                        }}
                    >
                        All removed. `AttachmentList` renders nothing when empty.
                    </span>
                )}
            </div>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const { attachments, remove } = useAttachments();

<AttachmentList attachments={attachments} onRemove={remove} />`,
            },
            description: {
                story: 'Each remove button is named for the thing it removes — a screen reader user hearing four buttons all called "Remove" cannot tell which attachment they are about to discard. `useAttachments` revokes the preview URL on removal, which is the part that leaks if you do it by hand.',
            },
        },
    },
};

/**
 * Long names, which is the normal case for a screenshot.
 */
export const LongNames: Story = {
    args: { attachment: ITEMS[0] },
    render: () => (
        <div style={{ width: 320, border: '1px dashed var(--bk-color-border)', padding: 8 }}>
            <AttachmentList
                attachments={[
                    {
                        id: '1',
                        kind: 'image',
                        name: 'Screenshot 2026-09-14 at 14.32.07 — telemetry uploader retry.png',
                        size: 184_320,
                        previewUrl: IMAGE,
                    },
                    { id: '2', kind: 'file', name: 'a.txt', size: 12 },
                ]}
                onRemove={() => undefined}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The chip caps its width and ellipsises, with the full name on hover. A screenshot filename is routinely longer than the panel it sits in, so this is the common case rather than an edge one.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { attachment: ITEMS[0] },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'Read-only and removable, wide and narrow.' } },
    },
    render: () => (
        <div
            style={{
                padding: 'var(--bk-spacing-6)',
                display: 'flex',
                gap: 'var(--bk-spacing-6)',
                alignItems: 'flex-start',
            }}
        >
            <div style={{ flex: 1 }}>
                <AttachmentList attachments={ITEMS} onRemove={() => undefined} />
            </div>
            <div style={{ width: 300, border: '1px dashed var(--bk-color-border)', padding: 8 }}>
                <AttachmentList attachments={ITEMS} showSize={false} />
            </div>
        </div>
    ),
};
