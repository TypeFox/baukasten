/**
 * A deliberately small block parser for streaming markdown.
 *
 * Not a markdown implementation and not trying to be one — bring your own
 * renderer if you need real markdown. What it does cover is the subset agents
 * actually emit (paragraphs, lists, headings, fenced code, inline code, bold)
 * and, more importantly, the property a general parser will not give you for
 * free: **stability under a growing input**.
 *
 * A half-arrived stream contains an unterminated code fence and a backtick
 * with no partner. A parser that resolves those optimistically flickers — text
 * becomes a code block becomes text again — on every chunk. The rules here are
 * chosen so that once a construct is recognised, more input never un-recognises
 * it:
 *
 * - an unterminated fence is a code block, because the closing fence will only
 *   confirm what we already decided;
 * - an unterminated inline backtick is literal text, because treating it as
 *   code would have to be undone if the line ends without a partner.
 *
 * Pure and synchronous, so it is tested without a DOM.
 */

export interface MarkdownParagraph {
    readonly type: 'paragraph';
    readonly text: string;
}

export interface MarkdownHeading {
    readonly type: 'heading';
    readonly level: number;
    readonly text: string;
}

export interface MarkdownList {
    readonly type: 'list';
    readonly ordered: boolean;
    readonly items: readonly string[];
}

export interface MarkdownCode {
    readonly type: 'code';
    readonly code: string;
    readonly language?: string;
    /** False while the closing fence has not arrived. Rendered the same either way. */
    readonly closed: boolean;
}

export type MarkdownBlock = MarkdownParagraph | MarkdownHeading | MarkdownList | MarkdownCode;

const FENCE = /^```(\w*)\s*$/;
const FENCE_END = /^```\s*$/;
const HEADING = /^(#{1,6})\s+(.*)$/;
const UNORDERED = /^\s*[-*]\s+/;
const ORDERED = /^\s*\d+\.\s+/;

function startsBlock(line: string): boolean {
    return (
        FENCE.test(line) ||
        HEADING.test(line) ||
        UNORDERED.test(line) ||
        ORDERED.test(line) ||
        line.trim() === ''
    );
}

export function parseMarkdown(text: string): readonly MarkdownBlock[] {
    const lines = text.split('\n');
    const blocks: MarkdownBlock[] = [];
    let at = 0;

    while (at < lines.length) {
        const line = lines[at];

        const fence = FENCE.exec(line);
        if (fence) {
            const language = fence[1] === '' ? undefined : fence[1];
            const body: string[] = [];
            at++;

            let closed = false;
            while (at < lines.length) {
                if (FENCE_END.test(lines[at])) {
                    closed = true;
                    at++;
                    break;
                }
                body.push(lines[at]);
                at++;
            }

            blocks.push({ type: 'code', code: body.join('\n'), language, closed });
            continue;
        }

        if (line.trim() === '') {
            at++;
            continue;
        }

        const heading = HEADING.exec(line);
        if (heading) {
            blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
            at++;
            continue;
        }

        const ordered = ORDERED.test(line);
        if (ordered || UNORDERED.test(line)) {
            const marker = ordered ? ORDERED : UNORDERED;
            const items: string[] = [];

            while (at < lines.length && marker.test(lines[at])) {
                items.push(lines[at].replace(marker, ''));
                at++;
            }

            blocks.push({ type: 'list', ordered, items });
            continue;
        }

        const paragraph: string[] = [];
        while (at < lines.length && !startsBlock(lines[at])) {
            paragraph.push(lines[at]);
            at++;
        }

        blocks.push({ type: 'paragraph', text: paragraph.join('\n') });
    }

    return blocks;
}

export interface InlineText {
    readonly type: 'text';
    readonly text: string;
}

export interface InlineCode {
    readonly type: 'code';
    readonly text: string;
}

export interface InlineStrong {
    readonly type: 'strong';
    readonly text: string;
}

export type InlineSpan = InlineText | InlineCode | InlineStrong;

// Both require a closing partner on the same line. An unterminated span stays
// literal text, which is the stable reading while a line is still arriving.
const INLINE_CODE = /(`[^`\n]+`)/g;
const STRONG = /(\*\*[^*\n]+\*\*)/g;

/** Splits one line into spans. Only closed constructs are recognised. */
export function parseInline(text: string): readonly InlineSpan[] {
    const spans: InlineSpan[] = [];

    for (const chunk of text.split(INLINE_CODE)) {
        if (chunk === '') continue;

        if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length > 2) {
            spans.push({ type: 'code', text: chunk.slice(1, -1) });
            continue;
        }

        for (const piece of chunk.split(STRONG)) {
            if (piece === '') continue;

            if (piece.startsWith('**') && piece.endsWith('**') && piece.length > 4) {
                spans.push({ type: 'strong', text: piece.slice(2, -2) });
            } else {
                spans.push({ type: 'text', text: piece });
            }
        }
    }

    return spans;
}
