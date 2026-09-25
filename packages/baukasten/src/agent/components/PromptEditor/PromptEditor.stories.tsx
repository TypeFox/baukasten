import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../../components/Select';
import { Tag } from '../../../components/Tag';
import { Icon } from '../../../components/Icon';
import { commandTrigger, mentionTrigger, type Trigger } from '../../triggers';
import { useAttachments } from '../../useAttachments';
import { promptToText } from '../../prompt';
import type { CommandSource, PromptValue } from '../../types';
import {
    ShapeSwatch,
    diagramNodeOf,
    diagramSource,
    dslSource,
    dslSymbolOf,
    fileSource,
    type DslSymbol,
    toolOf,
    toolSource,
    type DiagramNode,
    type ToolDefinition,
} from './domains.fixtures';
import { InputRequired } from '../InputRequired';
import { Composer } from './Composer';
import { PromptEditor } from './PromptEditor';

const files = fileSource;

/**
 * Four triggers, four domains, one editor.
 *
 * The point of the set is that none of them is privileged. `@` happens to
 * offer files because that is the familiar case, but the trigger knows nothing
 * about files — it knows a character, a position, a source and two renderers.
 */
const domainTriggers = [
    mentionTrigger(fileSource, { id: 'file', label: 'Files', icon: 'symbol-file' }),

    mentionTrigger(diagramSource, {
        id: 'node',
        char: '#',
        label: 'Diagram nodes',
        icon: 'circuit-board',
        renderItem: (item) => {
            const node = item.data as DiagramNode;
            return (
                <>
                    <ShapeSwatch shape={node.shape} />
                    <span style={{ flex: 1, minWidth: 0 }}>{node.name}</span>
                    <span
                        style={{
                            color: 'var(--bk-color-foreground-muted)',
                            fontSize: 'var(--bk-font-size-xs)',
                        }}
                    >
                        {node.lane}
                    </span>
                </>
            );
        },
        renderToken: (node) => {
            const diagram = diagramNodeOf(node);
            if (!diagram) return null;
            return (
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--bk-spacing-1)',
                    }}
                >
                    <ShapeSwatch shape={diagram.shape} />
                    {diagram.name}
                </span>
            );
        },
    }),

    mentionTrigger(dslSource, {
        id: 'symbol',
        char: ':',
        label: 'Functions',
        icon: 'symbol-function',
        renderItem: (item) => {
            const symbol = item.data as DslSymbol;
            return (
                <>
                    <code style={{ fontFamily: 'var(--bk-font-family-mono)', flex: 1 }}>
                        {symbol.signature}
                    </code>
                    <span
                        style={{
                            color: 'var(--bk-color-info)',
                            fontFamily: 'var(--bk-font-family-mono)',
                            fontSize: 'var(--bk-font-size-xs)',
                        }}
                    >
                        → {symbol.returns}
                    </span>
                </>
            );
        },
        renderToken: (node) => {
            const symbol = dslSymbolOf(node);
            if (!symbol) return null;
            return (
                <code style={{ fontFamily: 'var(--bk-font-family-mono)' }}>
                    {symbol.name}
                    <span style={{ opacity: 0.6 }}>()</span>
                </code>
            );
        },
    }),

    mentionTrigger(toolSource, {
        id: 'tool',
        char: '!',
        label: 'Tools',
        icon: 'tools',
        renderItem: (item) => {
            const tool = item.data as ToolDefinition;
            return (
                <>
                    <Icon
                        name={tool.destructive ? 'warning' : 'tools'}
                        size="xs"
                        className={undefined}
                    />
                    <span style={{ flex: 1, minWidth: 0 }}>{tool.name}</span>
                    <span
                        style={{
                            color: tool.destructive
                                ? 'var(--bk-color-danger)'
                                : 'var(--bk-color-foreground-muted)',
                            fontSize: 'var(--bk-font-size-xs)',
                        }}
                    >
                        {tool.destructive ? 'destructive' : tool.summary}
                    </span>
                </>
            );
        },
        renderToken: (node) => {
            const tool = toolOf(node);
            if (!tool) return null;
            return (
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--bk-spacing-1)',
                        color: tool.destructive ? 'var(--bk-color-danger)' : undefined,
                    }}
                >
                    {tool.destructive && <Icon name="warning" size="xs" />}
                    {tool.name}
                </span>
            );
        },
    }),
];

/** Standing in for `prompts/list`. */
const commands: CommandSource = {
    async search({ query }) {
        const all = [
            { name: 'review', label: 'Review', description: 'Analyse code quality' },
            { name: 'explain', label: 'Explain', description: 'Walk through what this does' },
            { name: 'test', label: 'Write tests', description: 'Add coverage' },
        ];
        return { items: all.filter((item) => item.name.includes(query.toLowerCase())) };
    },
};

const triggers = [mentionTrigger(files), commandTrigger(commands)];

/** All four domains plus commands, in one editor. */
const allDomains = [...domainTriggers, commandTrigger(commands)];

function Harness({
    withComposer = false,
    withResolving = false,
    width,
    use = triggers,
    placeholder = 'Type @ for a file, or / for a command…',
}: {
    withComposer?: boolean;
    withResolving?: boolean;
    width?: number;
    use?: readonly Trigger[];
    placeholder?: string;
}) {
    const [value, setValue] = useState<PromptValue>([]);
    const [sent, setSent] = useState<string[]>([]);

    const editor = (
        <PromptEditor
            value={value}
            onChange={setValue}
            onSubmit={(next) => {
                setSent((all) => [...all, promptToText(next)]);
                setValue([]);
            }}
            triggers={use}
            placeholder={placeholder}
        />
    );

    return (
        <div
            style={{
                width,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
            }}
        >
            {withComposer ? (
                <Composer
                    value={value}
                    onSend={() => {
                        setSent((all) => [...all, promptToText(value)]);
                        setValue([]);
                    }}
                    context={
                        <>
                            <Tag size="xs" variant="secondary">
                                <Icon name="git-branch" size="xs" /> fix/telemetry-retry
                            </Tag>
                        </>
                    }
                    footer={
                        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)' }}>
                            <Select
                                size="xs"
                                fullWidth
                                options={[
                                    { value: 'agent', label: 'Agent' },
                                    { value: 'ask', label: 'Ask' },
                                ]}
                                value="agent"
                            />
                            <Select
                                size="xs"
                                fullWidth
                                options={[
                                    { value: 'opus', label: 'Claude Opus 5' },
                                    { value: 'sonnet', label: 'Claude Sonnet 5' },
                                ]}
                                value="opus"
                            />
                        </div>
                    }
                    resolving={
                        withResolving ? (
                            <InputRequired
                                requests={[
                                    {
                                        key: 'depth',
                                        kind: 'form',
                                        message: 'How thorough should the review be?',
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                depth: {
                                                    type: 'string',
                                                    title: 'Depth',
                                                    enum: ['quick', 'thorough'],
                                                },
                                            },
                                            required: ['depth'],
                                        },
                                    },
                                ]}
                            />
                        ) : undefined
                    }
                >
                    {editor}
                </Composer>
            ) : (
                <div
                    style={{
                        border: '1px solid var(--bk-color-border)',
                        borderRadius: 'var(--bk-radius-md)',
                    }}
                >
                    {editor}
                </div>
            )}

            <pre
                style={{
                    margin: 0,
                    padding: 'var(--bk-padding-sm)',
                    backgroundColor: 'var(--bk-color-code-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-xs)',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {JSON.stringify(value, null, 2)}
            </pre>

            {sent.length > 0 && (
                <div style={{ fontSize: 'var(--bk-font-size-sm)' }}>
                    sent: {sent.map((text) => `“${text}”`).join(', ')}
                </div>
            )}
        </div>
    );
}

const meta = {
    title: 'Agent/PromptEditor',
    component: PromptEditor,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'An input whose value is **not a string** — it holds an ordered list of text runs and pinned atomic tokens. A string cannot record *which* file "compare this with that" refers to; this can, survives a round trip, and is what lets a failed message be restored with its references intact. `/` and `@` are two trigger config entries rather than two features.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: false, description: 'The structured value' },
        triggers: { control: false, description: 'Trigger configuration' },
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof PromptEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive. Type `@upl` for a file, or `/rev` at the start for a command.
 */
export const Interactive: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => <Harness />,
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState<PromptValue>([]);

<PromptEditor
    value={value}
    onChange={setValue}
    onSubmit={send}
    triggers={[mentionTrigger(files), commandTrigger(commands)]}
    placeholder="Type @ for a file, or / for a command…"
/>`,
            },
            description: {
                story: 'The JSON below the input is the actual value. Pin a couple of files and watch it stay structured — that is the whole point. Then press **Backspace** next to a token: the first press arms it (red outline), the second removes it. A pinned reference should not be lost to a keystroke aimed at the space beside it.',
            },
        },
    },
};

/**
 * The boundary rules, which are easier to try than to read.
 */
export const TriggerBoundaries: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => <Harness />,
    parameters: {
        docs: {
            source: {
                code: `// \`position\` is what keeps a command at the front of the sentence and
// lets a mention appear anywhere. The word-boundary rule is not optional
// and not configurable — it is what stops an email address opening a menu.
const triggers = [
    mentionTrigger(files, { position: 'anywhere', cardinality: 'many' }),
    commandTrigger(commands, { position: 'input-start', cardinality: 'one' }),
];

<PromptEditor value={value} onChange={setValue} triggers={triggers} />`,
            },
            description: {
                story: 'Type `sam@example.com` — no menu, because a trigger only opens on a word boundary, and an email opening a mention picker is the commonest complaint about editors like this. Type `src/services` — no menu either. Type `/review` at the start — menu. Type `please /review` — no menu, because a command is the verb of the sentence and belongs at the front.',
            },
        },
    },
};

/**
 * The same component, pointed at four unrelated domains.
 */
export const AnyDomain: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => (
        <Harness
            use={allDomains}
            placeholder="Try @ files · # diagram nodes · : functions · ! tools · / commands"
        />
    ),
    parameters: {
        docs: {
            source: {
                code: `// A trigger is a character, a position, a cardinality, a source
// and two renderers. None of those mention files.
const triggers = [
    mentionTrigger(fileSource, { id: 'file', label: 'Files', icon: 'symbol-file' }),

    mentionTrigger(diagramSource, {
        id: 'node',
        char: '#',
        label: 'Diagram nodes',
        icon: 'circuit-board',
        renderItem: (item) => <NodeRow node={item.data as DiagramNode} />,
        renderToken: (node) => <NodeChip node={node.data as DiagramNode} />,
    }),

    mentionTrigger(dslSource, {
        id: 'symbol',
        char: ':',
        label: 'Functions',
        icon: 'symbol-function',
        renderItem: (item) => <SignatureRow symbol={item.data as DslSymbol} />,
        renderToken: (node) => <code>{(node.data as DslSymbol).name}()</code>,
    }),

    mentionTrigger(toolSource, { id: 'tool', char: '!', label: 'Tools', icon: 'tools' }),

    commandTrigger(commands),
];

<PromptEditor value={value} onChange={setValue} triggers={triggers} />`,
            },
            description: {
                story: `Five triggers, one editor, and nothing in the component knows what any of them mean.

- **\`@\`** files — an icon and a path. The familiar case, and the least interesting one.
- **\`#\`** diagram nodes — a swatch whose geometry says *event*, *task* or *gateway* before you read the label. The pinned chip keeps it.
- **\`:\`** DSL functions — a signature in monospace with its return type. The chip renders as \`name()\`.
- **\`!\`** tools — destructive ones are marked, in the menu and in the chip.
- **\`/\`** commands — at the start of the input only.

A trigger is a character, a position, a cardinality, a source and two renderers. None of those mention files. Pin one of each and look at the JSON below: every token carries its own domain object, untouched — the diagram node is the *live* object from the fixture, not a copy that survived serialisation.`,
            },
        },
    },
};

/**
 * Why the payload does not go through JSON.
 */
export const LiveDomainObjects: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => (
        <Harness
            use={allDomains}
            placeholder="Pin a #diagram node, then look at what the token carries…"
        />
    ),
    parameters: {
        docs: {
            source: {
                code: `// Whatever a source attaches as \`data\` round-trips untouched — it never
// passes through JSON, so it can be a live object from your own model.
const diagramSource: MentionSource = {
    async search({ query }) {
        return {
            items: nodes.filter(matches(query)).map((node) => ({
                id: \`node:\${node.id}\`,
                kind: 'diagram-node',
                label: node.name,
                data: node, // the real object, not a copy
            })),
        };
    },
};

// Later, on a pinned token:
const node = mention.data as DiagramNode;
node.connect(other); // still the same instance`,
            },
            description: {
                story: "Token payloads live in a registry keyed by an opaque id, and only the id goes into the DOM. The obvious alternative — serialising the node into an attribute — would silently restrict a token to whatever survives `JSON.stringify`: no `Date`, no `Map`, no class instance, no reference back into the host application's own model. For an abstraction meant to carry diagram nodes and AST symbols as comfortably as file paths, that is the wrong limit, so it is not imposed.",
            },
        },
    },
};

/**
 * Paste a screenshot, or drag a file onto it.
 */
export const PasteAndDrop: Story = {
    args: { value: [], onChange: () => undefined },
    render: function PasteAndDrop() {
        const [value, setValue] = useState<PromptValue>([]);
        // `handlePaste` is for wiring a paste handler yourself; here the editor
        // already reports clipboard files through `onPasteFiles`, so `add` is
        // all this needs.
        const { attachments, add, remove, clear, isDraggingOver, dropProps } = useAttachments({
            // A webview has a finite appetite for base64 — an accidentally
            // dropped video is a hang rather than an error.
            accept: (file) => (file.size > 5_000_000 ? 'Larger than 5 MB.' : null),
            max: 6,
        });

        return (
            <div style={{ maxWidth: 620 }}>
                <Composer
                    value={value}
                    attachments={attachments}
                    onRemoveAttachment={remove}
                    dropProps={dropProps}
                    isDraggingOver={isDraggingOver}
                    onSend={() => {
                        setValue([]);
                        clear();
                    }}
                >
                    <PromptEditor
                        value={value}
                        onChange={setValue}
                        triggers={triggers}
                        placeholder="Paste a screenshot, or drop a file here…"
                        onPasteFiles={(files) => add(files)}
                    />
                </Composer>
                <p
                    style={{
                        marginTop: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-sm)',
                        color: 'var(--bk-color-foreground-muted)',
                    }}
                >
                    Try: paste an image from the clipboard, drag a file over the composer, paste
                    formatted text from a web page.
                </p>
            </div>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `const [value, setValue] = useState<PromptValue>([]);
const { attachments, add, remove, clear, isDraggingOver, dropProps } = useAttachments({
    accept: (file) => (file.size > 5_000_000 ? 'Larger than 5 MB.' : null),
    max: 6,
});

<Composer
    value={value}
    attachments={attachments}
    onRemoveAttachment={remove}
    dropProps={dropProps}
    isDraggingOver={isDraggingOver}
    onSend={() => { send(value, attachments); setValue([]); clear(); }}
>
    <PromptEditor
        value={value}
        onChange={setValue}
        triggers={triggers}
        onPasteFiles={add}
    />
</Composer>`,
            },
            description: {
                story: `Three things worth trying, because each was broken before this landed.

**Paste an image.** It becomes a removable chip. A pasted image also carries a text fallback — a file path, or the word "image" — and without handling the files first that junk lands in the draft beside the attachment.

**Drag a file over the composer.** An overlay appears, positioned over the box rather than inserted into it, so nothing shifts under the pointer. Note that the browser's own default for a dropped file is to *navigate away to it*, taking the unsent draft with it.

**Paste formatted text from a web page.** It arrives as plain text. The default behaviour of a \`contentEditable\` is to insert whatever markup was on the clipboard — styled spans, tables, whole documents — into the region this component reads its value back out of.

Send stays enabled with attachments and no text: a screenshot with no words is an ordinary message.`,
            },
        },
    },
};

/**
 * The whole composer.
 */
export const WithComposer: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => <Harness withComposer />,
    parameters: {
        docs: {
            source: {
                code: `<Composer
    value={value}
    running={running}
    onSend={send}
    onStop={stop}
    context={<Tag size="xs"><Icon name="git-branch" size="xs" /> fix/telemetry-retry</Tag>}
    footer={
        <>
            <Select size="xs" fullWidth options={modes} value={mode} onChange={setMode} />
            <Select size="xs" fullWidth options={models} value={model} onChange={setModel} />
        </>
    }
>
    <PromptEditor value={value} onChange={setValue} onSubmit={send} triggers={triggers} />
</Composer>`,
            },
            description: {
                story: 'Attachments above, two selects in the footer, send as one control that knows whether it is sending or stopping. Enter sends, Shift+Enter newlines.',
            },
        },
    },
};

/**
 * A command that blocks before it resolves.
 */
export const CommandBlockedOnInput: Story = {
    args: { value: [], onChange: () => undefined },
    render: () => <Harness withComposer withResolving />,
    parameters: {
        docs: {
            source: {
                code: `// prompts/get can come back asking for input before the command resolves.
const [blocked, setBlocked] = useState<InputRequest[] | null>(null);

<Composer
    value={value}
    onSend={send}
    resolving={
        blocked && (
            <InputRequired
                requests={blocked}
                onComplete={(responses) => retryResolve(responses)}
                onCancel={() => setBlocked(null)}
            />
        )
    }
>
    <PromptEditor value={value} onChange={setValue} triggers={triggers} />
</Composer>`,
            },
            description: {
                story: 'Resolving a slash command is one of the operations that can come back asking for input, so picking `/review` may demand a form before it becomes text — inside the composer, before anything has been sent. It sits beside the draft rather than replacing it, so abandoning the question costs nothing already written.',
            },
        },
    },
};

/**
 * The narrow case, and the layout bug it used to require CSS to fix.
 */
export const Showcase: Story = {
    args: { value: [], onChange: () => undefined },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'At 320px. Two selects in the footer used to overflow the row and push the second chevron out of view, because `Select` sets a 200px minimum — the demo this replaced had to out-specify the library from application CSS. The composer owns the layout now, so nothing downstream has to.',
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: 'var(--bk-spacing-6)' }}>
                <Harness withComposer />
            </div>
            <div
                style={{
                    width: 320,
                    borderLeft: '1px solid var(--bk-color-border)',
                    padding: 'var(--bk-spacing-3)',
                    overflow: 'auto',
                }}
            >
                <Harness withComposer width={undefined} />
            </div>
        </div>
    ),
};
