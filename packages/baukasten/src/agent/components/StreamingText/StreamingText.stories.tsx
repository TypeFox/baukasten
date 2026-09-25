import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Caret, StreamingText } from './StreamingText';

const TEXT = 'Retrying transient failures with exponential backoff and full jitter…';

function Revealing({ text }: { text: string }) {
    const [at, setAt] = useState(0);

    useEffect(() => {
        setAt(0);
        const timer = setInterval(
            () => setAt((current) => (current >= text.length ? 0 : current + 1)),
            40,
        );
        return () => clearInterval(timer);
    }, [text]);

    return <StreamingText text={text.slice(0, at)} streaming={at < text.length} />;
}

const meta = {
    title: 'Agent/StreamingText',
    component: StreamingText,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Plain text that is still being written, with a cursor while it is. For text that is *not* markdown — a thought block, a terminal line, a label. Accumulation happens in the transcript reducer, not here; this renders what it is given.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'The text so far' },
        streaming: {
            control: 'boolean',
            description: 'Whether more is coming, which is what puts the caret on screen',
            table: { defaultValue: { summary: 'false' } },
        },
    },
} satisfies Meta<typeof StreamingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    args: { text: TEXT, streaming: true },
};

export const States: Story = {
    args: { text: TEXT },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                maxWidth: 560,
            }}
        >
            <StreamingText text={TEXT} streaming />
            <StreamingText text={TEXT} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Streaming and settled. The caret is a hard blink rather than a fade, because a smoothly pulsing cursor reads as decoration while a hard blink reads as a terminal — which is the right association here.',
            },
        },
    },
};

/**
 * The caret is exported separately, and that is not an accident.
 */
export const CaretPlacement: Story = {
    args: { text: TEXT },
    render: () => (
        <div style={{ maxWidth: 560 }}>
            <p style={{ margin: 0 }}>
                Inside the last block, where it belongs
                <Caret />
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Markdown has to place the cursor inside its own final block. Appended after rendered markup it drops to a new line whenever a paragraph closes, which reads as the agent having finished when it has not — so `Caret` is usable on its own.',
            },
        },
    },
};

/**
 * Accessibility note worth seeing rather than reading.
 */
export const ReducedMotion: Story = {
    args: { text: TEXT, streaming: true },
    parameters: {
        docs: {
            description: {
                story: 'Under `prefers-reduced-motion: reduce` the caret stops blinking but stays visible. A blinking element is a documented migraine and seizure trigger, so this is a requirement rather than a nicety — and it lives in the stylesheet rather than in React, because a media query read at render time causes hydration mismatches.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { text: TEXT },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'Text arriving, on a loop.' } },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)', maxWidth: 620 }}>
            <Revealing text={TEXT} />
        </div>
    ),
};
