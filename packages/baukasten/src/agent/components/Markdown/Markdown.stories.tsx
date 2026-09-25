import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

const SAMPLE = `Found it — a non-OK response just logs a warning and \`continue\`s, so the batch is gone.

### Plan

1. Retry transient status codes (408, 425, 429, 5xx)
2. Full-jitter backoff capped at **30s**, honouring \`Retry-After\`
3. Thread an optional \`AbortSignal\` through the flush loop

\`\`\`ts
const delay = backoffDelay(attempt, response.headers.get('retry-after'));
await sleep(delay, signal);
\`\`\`

Worth a follow-up: \`queue.ts\` re-enqueues on a fixed timer.`;

/** Reveals text a character at a time, the way a real stream arrives. */
function Streaming({ text, intervalMs = 18 }: { text: string; intervalMs?: number }) {
    const [at, setAt] = useState(0);

    useEffect(() => {
        setAt(0);
        const timer = setInterval(() => {
            setAt((current) => {
                if (current >= text.length) return current;
                return current + 2;
            });
        }, intervalMs);
        return () => clearInterval(timer);
    }, [text, intervalMs]);

    return <Markdown text={text.slice(0, at)} streaming={at < text.length} />;
}

const meta = {
    title: 'Agent/Markdown',
    component: Markdown,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Markdown for streamed output. The parser is written to be **stable under a growing input** rather than correct about a finished document — an unterminated fence stays a code block and an unterminated backtick stays text, so nothing flickers between interpretations as chunks land. There is no markdown dependency: the built-in renderer is deliberately minimal and a real library can be passed in.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'The markdown so far' },
        streaming: {
            control: 'boolean',
            description: 'Puts a caret at the tail of the final block',
            table: { defaultValue: { summary: 'false' } },
        },
        renderer: { control: false, description: 'Replaces the built-in renderer entirely' },
        highlight: { control: false, description: 'Tokenises fenced blocks' },
    },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground.
 */
export const Interactive: Story = {
    args: { text: SAMPLE, streaming: false },
};

/**
 * The behaviour that justifies a bespoke parser.
 */
export const StreamingStability: Story = {
    args: { text: SAMPLE },
    render: () => (
        <div style={{ maxWidth: 620 }}>
            <Streaming text={SAMPLE} />
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `// \`text\` is the accumulated markdown so far; \`streaming\` puts the caret
// at the tail of the final block. Accumulation happens in the transcript
// reducer, so this just renders what it is given.
<Markdown text={entry.text} streaming={entry.streaming} />`,
            },
            description: {
                story: 'Watch the fenced block arrive. It becomes a code block the moment the opening fence lands and stays one — it never flips back to a paragraph. Same for the inline backticks: they stay literal text until they close, so nothing is promoted and then demoted. The caret sits *inside* the last block; appended after the markup it would drop to its own line every time a paragraph ended, which reads as the agent having stopped.',
            },
        },
    },
};

/**
 * The half-arrived shapes a naive parser gets wrong.
 */
export const IncompleteConstructs: Story = {
    args: { text: '' },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-lg)',
                maxWidth: 620,
            }}
        >
            <Markdown text={'Opening a block:\n\n```ts\nconst a = 1;'} streaming />
            <Markdown text="An unfinished `backtick stays text" streaming />
            <Markdown text="An unfinished **bold marker" streaming />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All three are mid-stream. The fence is already a code block because the closing fence can only confirm it; the backtick and the bold marker stay literal because promoting them would have to be undone.',
            },
        },
    },
};

/**
 * Bring your own.
 */
export const PluggableRenderer: Story = {
    args: { text: SAMPLE },
    render: () => (
        <div style={{ maxWidth: 620 }}>
            <Markdown
                text={SAMPLE}
                renderer={({ text }) => (
                    <pre
                        style={{
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            fontSize: 'var(--bk-font-size-xs)',
                        }}
                    >
                        {text}
                    </pre>
                )}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A `renderer` prop replaces the built-in entirely — pass `react-markdown` here when you need real markdown. Highlighting is a separate callback, so an application that already has a tokeniser loaded (an editor, say) gets editor-accurate colours for nothing. Neither is a dependency of this package.',
            },
        },
    },
};

/**
 * Everything the built-in renderer covers, and its limits.
 */
export const Showcase: Story = {
    args: { text: SAMPLE },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Paragraphs, headings, ordered and unordered lists, inline code, bold and fenced blocks. Anything beyond that — tables, links, images, blockquotes — is what the `renderer` prop is for. The built-in is honest about being minimal rather than pretending to be a parser.',
            },
        },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 720 }}>
            <Markdown
                text={`# Heading one, clamped to h3

Agents emit headings, and a transcript sits inside a page that already has them — so an \`h1\` here would wreck the outline for anyone navigating by heading.

## Lists

- unordered
- with \`inline code\`
- and **bold**

1. ordered
2. also works

\`\`\`ts
export function backoffDelay(attempt: number): number {
    return Math.min(250 * 2 ** (attempt - 1), 30_000);
}
\`\`\`

A long code block gets its own scroll rather than pushing the rest of the transcript off screen.`}
            />
        </div>
    ),
};
