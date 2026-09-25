import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { promptCommand } from '../../prompt';
import { commandTrigger } from '../../triggers';
import type { CommandSource, PromptCommandNode, PromptValue } from '../../types';
import { CommandArgs } from './CommandArgs';
import { PromptEditor } from './PromptEditor';

const FILES = [
    'src/services/telemetry/uploader.ts',
    'src/services/telemetry/queue.ts',
    'src/extension.ts',
];

/**
 * A source that declares arguments and can complete one of them.
 *
 * `completeArgument` is optional on the interface — plenty of sources will not
 * implement it, and the field has to stay usable when they do not.
 */
const commands: CommandSource = {
    async search({ query }) {
        return {
            items: [
                {
                    name: 'review',
                    label: 'review',
                    description: 'Review a file and suggest changes',
                    arguments: [
                        { name: 'path', description: 'File to review', required: true },
                        { name: 'depth', description: 'How thorough to be' },
                    ],
                },
                { name: 'explain', label: 'explain', description: 'Explain the selection' },
            ].filter((item) => item.name.includes(query)),
        };
    },

    async completeArgument(command, argument, partial) {
        if (command !== 'review' || argument !== 'path') return [];
        return FILES.filter((path) => path.includes(partial));
    },
};

const node: PromptCommandNode = {
    type: 'command',
    name: 'review',
    label: 'review',
    arguments: {},
};

const ARGS = [
    { name: 'path', description: 'File to review', required: true },
    { name: 'depth', description: 'How thorough to be' },
];

const meta = {
    title: 'Agent/CommandArgs',
    component: CommandArgs,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A pinned command, as a small structured editor rather than an opaque chip. A prompt declares its arguments, and the user fills them in *after* picking the command — so the token cannot be a finished thing the moment it is created. It also has to stay editable indefinitely: changing one value should not mean deleting the command and retyping it, which is what an opaque chip forces. Rendered through a portal into the token’s own `contentEditable={false}` element, so the browser still treats the whole thing as one atomic unit for arrow keys and selection while the inputs inside edit independently.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        node: { control: false, description: 'Carries the argument *values*' },
        args: { control: false, description: 'What the source declared. Not on the node.' },
        source: { control: false, description: 'Supplies `completeArgument`, when it offers one' },
        onChange: { description: 'Receives the node with the new values' },
    },
} satisfies Meta<typeof CommandArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The editor on its own, outside a token. */
export const Interactive: Story = {
    args: { node, args: ARGS, source: commands, onChange: () => undefined },
    render: (args) => {
        const [current, setCurrent] = useState(node);
        return (
            <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', alignItems: 'center' }}>
                <CommandArgs {...args} node={current} onChange={setCurrent} />
                <code style={{ fontSize: 'var(--bk-font-size-xs)' }}>
                    {JSON.stringify(current.arguments)}
                </code>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Type in `path` and completions appear — a native `datalist`, which is keyboard accessible and positions itself. The editor already owns one custom popup fighting a contentEditable selection; a second would be a second copy of the same bugs.',
            },
        },
    },
};

/** The marker for an unfilled requirement. */
export const Incomplete: Story = {
    args: { node, args: ARGS, source: commands, onChange: () => undefined },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
            <CommandArgs {...args} node={{ ...node, arguments: {} }} />
            <CommandArgs
                {...args}
                node={{ ...node, arguments: { path: 'src/services/telemetry/uploader.ts' } }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A dashed outline and a warning glyph while a required argument is empty — marked without being alarming about it, since an unfinished command is a normal intermediate state rather than an error.',
            },
        },
    },
};

/** Usable with no completion at all. */
export const WithoutCompletion: Story = {
    args: { node, args: ARGS, onChange: () => undefined },
    render: (args) => {
        const [current, setCurrent] = useState(node);
        return <CommandArgs {...args} source={undefined} node={current} onChange={setCurrent} />;
    },
    parameters: {
        docs: {
            description: {
                story: '`completeArgument` is optional at every level — the source may not implement it, and one that does may return nothing. A field that only works when a server answers is a field that stops working when it does not.',
            },
        },
    },
};

/** In the editor, which is where it actually lives. */
export const InTheEditor: Story = {
    args: { node, args: ARGS, source: commands, onChange: () => undefined },
    render: () => {
        const [value, setValue] = useState<PromptValue>([]);

        return (
            <div style={{ maxWidth: 520 }}>
                <PromptEditor
                    value={value}
                    onChange={setValue}
                    triggers={[commandTrigger(commands)]}
                    placeholder="Type / to pick a command…"
                />
                <pre style={{ fontSize: 'var(--bk-font-size-xs)' }}>
                    {JSON.stringify(promptCommand(value)?.arguments ?? {}, null, 2)}
                </pre>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Type `/review`, press Enter, then fill the fields. Editing rewrites the node in the registry in place — the element, its id and its position in the sentence are untouched, so the caret never moves and the command stays editable indefinitely. Backspace inside a field does *not* arm the command for deletion, or correcting a typo would delete the thing being corrected.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { node, args: ARGS, source: commands, onChange: () => undefined },
    parameters: { layout: 'fullscreen' },
    render: () => {
        const [value, setValue] = useState<PromptValue>([]);

        return (
            <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 560 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--bk-gap-lg)',
                    }}
                >
                    <CommandArgs
                        node={node}
                        args={ARGS}
                        source={commands}
                        onChange={() => undefined}
                    />
                    <CommandArgs
                        node={{
                            ...node,
                            arguments: {
                                path: 'src/services/telemetry/uploader.ts',
                                depth: 'deep',
                            },
                        }}
                        args={ARGS}
                        source={commands}
                        onChange={() => undefined}
                    />
                    <PromptEditor
                        value={value}
                        onChange={setValue}
                        triggers={[commandTrigger(commands)]}
                        placeholder="Type / to pick a command…"
                    />
                </div>
            </div>
        );
    },
};
