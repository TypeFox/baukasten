import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Caret } from '../StreamingText';
import { parseInline, parseMarkdown, type MarkdownBlock } from './parse';
import * as styles from './Markdown.css';

/**
 * Turns a fenced block into tokenised markup.
 *
 * Returning `null` or `undefined` falls back to plain text, so a highlighter
 * that cannot handle a language simply declines rather than failing.
 */
export type HighlightFn = (code: string, language?: string) => React.ReactNode;

export interface MarkdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    text: string;
    /** Puts a caret at the tail of the final block. @default false */
    streaming?: boolean;
    /**
     * Replaces the built-in renderer entirely.
     *
     * The built-in is minimal on purpose — see {@link parseMarkdown}. Pass a
     * real markdown library here when you need one; this component exists so
     * that choice stays yours rather than being a dependency everyone pays for.
     */
    renderer?: (props: { text: string; streaming: boolean }) => React.ReactNode;
    /**
     * Syntax highlighting for fenced blocks.
     *
     * A callback rather than a dependency. An application that already has a
     * tokeniser loaded — an editor, for instance — can pass its own and get
     * editor-accurate colours for nothing.
     */
    highlight?: HighlightFn;
}

function renderSpans(text: string): React.ReactNode {
    return parseInline(text).map((span, index) => {
        switch (span.type) {
            case 'code':
                return (
                    <code key={index} className={styles.inlineCode}>
                        {span.text}
                    </code>
                );
            case 'strong':
                return <strong key={index}>{span.text}</strong>;
            default:
                return <Fragment key={index}>{span.text}</Fragment>;
        }
    });
}

function renderBlock(
    block: MarkdownBlock,
    index: number,
    caret: boolean,
    highlight?: HighlightFn,
): React.ReactNode {
    switch (block.type) {
        case 'code': {
            const highlighted = highlight?.(block.code, block.language);
            return (
                <pre key={index} className={styles.codeBlock} data-language={block.language}>
                    {highlighted ?? block.code}
                </pre>
            );
        }

        case 'heading': {
            // Clamped to h3–h6: a transcript sits inside a page that already
            // has headings, and emitting an h1 from streamed content would
            // break the document outline for anyone navigating by heading.
            const Tag = `h${Math.min(6, block.level + 2)}` as 'h3';
            return (
                <Tag key={index} className={styles.heading}>
                    {renderSpans(block.text)}
                    {caret && <Caret />}
                </Tag>
            );
        }

        case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
                <Tag key={index} className={styles.list}>
                    {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                            {renderSpans(item)}
                            {caret && itemIndex === block.items.length - 1 && <Caret />}
                        </li>
                    ))}
                </Tag>
            );
        }

        default:
            return (
                <p key={index} className={styles.paragraph}>
                    {renderSpans(block.text)}
                    {caret && <Caret />}
                </p>
            );
    }
}

/**
 * Markdown for streamed agent output.
 *
 * Two things make this different from rendering markdown anywhere else.
 *
 * The text is **still arriving**, so the parser is written to be stable under a
 * growing input rather than correct about a finished document — an unterminated
 * fence stays a code block, an unterminated backtick stays text, and neither
 * flips back and forth as chunks land.
 *
 * And the caret goes **inside** the last block rather than after the markup.
 * Appended outside, it drops to its own line every time a paragraph closes,
 * which reads as the agent having finished when it has not.
 *
 * @example
 * ```tsx
 * <Markdown text={entry.text} streaming={entry.streaming} />
 *
 * // With a real markdown library, and an editor's tokeniser for code
 * <Markdown
 *   text={entry.text}
 *   renderer={({ text }) => <ReactMarkdown>{text}</ReactMarkdown>}
 *   highlight={(code, lang) => monacoColorize(code, lang)}
 * />
 * ```
 */
export const Markdown: React.FC<MarkdownProps> = ({
    text,
    streaming = false,
    renderer,
    highlight,
    className,
    ...props
}) => {
    if (renderer) {
        return (
            <div className={clsx(styles.markdown, className)} {...props}>
                {renderer({ text, streaming })}
            </div>
        );
    }

    const blocks = parseMarkdown(text);

    return (
        <div className={clsx(styles.markdown, className)} {...props}>
            {blocks.map((block, index) =>
                renderBlock(
                    block,
                    index,
                    // Only the final block carries the cursor, and a code block
                    // never does — a blinking bar inside source reads as part
                    // of the code.
                    streaming && index === blocks.length - 1 && block.type !== 'code',
                    highlight,
                ),
            )}
        </div>
    );
};

Markdown.displayName = 'Markdown';
