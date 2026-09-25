import { describe, expect, it } from 'vitest';
import { parseInline, parseMarkdown } from './parse';

describe('blocks', () => {
    it('splits paragraphs on blank lines', () => {
        const blocks = parseMarkdown('one\n\ntwo');
        expect(blocks).toEqual([
            { type: 'paragraph', text: 'one' },
            { type: 'paragraph', text: 'two' },
        ]);
    });

    it('reads a fenced block with its language', () => {
        const blocks = parseMarkdown('```ts\nconst a = 1;\n```');
        expect(blocks).toEqual([
            { type: 'code', code: 'const a = 1;', language: 'ts', closed: true },
        ]);
    });

    it('reads ordered and unordered lists', () => {
        expect(parseMarkdown('- a\n- b')).toEqual([
            { type: 'list', ordered: false, items: ['a', 'b'] },
        ]);
        expect(parseMarkdown('1. a\n2. b')).toEqual([
            { type: 'list', ordered: true, items: ['a', 'b'] },
        ]);
    });

    it('reads headings with their level', () => {
        expect(parseMarkdown('### Plan')).toEqual([{ type: 'heading', level: 3, text: 'Plan' }]);
    });

    it('ends a paragraph when a list starts, without a blank line', () => {
        expect(parseMarkdown('Plan:\n- a').map((block) => block.type)).toEqual([
            'paragraph',
            'list',
        ]);
    });
});

describe('stability under a growing input', () => {
    /**
     * The property that matters. A parser that resolves incomplete constructs
     * optimistically makes the transcript flicker on every chunk, so these
     * feed the parser every prefix of a document and check that decisions do
     * not reverse.
     */
    function prefixes(text: string): string[] {
        return Array.from({ length: text.length + 1 }, (_, at) => text.slice(0, at));
    }

    it('treats an unterminated fence as code, not as text', () => {
        const blocks = parseMarkdown('```ts\nconst a = 1;');
        expect(blocks).toEqual([
            { type: 'code', code: 'const a = 1;', language: 'ts', closed: false },
        ]);
    });

    it('never turns a code block back into a paragraph as more arrives', () => {
        const document = '```ts\nconst a = 1;\nconst b = 2;\n```\ndone';
        let sawCode = false;

        for (const prefix of prefixes(document)) {
            const blocks = parseMarkdown(prefix);
            const hasCode = blocks.some((block) => block.type === 'code');

            if (hasCode) sawCode = true;
            // Once a fence has been recognised, no longer prefix may un-recognise it.
            if (sawCode) expect(hasCode).toBe(true);
        }

        expect(sawCode).toBe(true);
    });

    it('leaves an unterminated backtick as literal text', () => {
        expect(parseInline('call `flushQueue')).toEqual([
            { type: 'text', text: 'call `flushQueue' },
        ]);
    });

    it('only promotes inline code once it closes', () => {
        expect(parseInline('call `flushQueue()`')).toEqual([
            { type: 'text', text: 'call ' },
            { type: 'code', text: 'flushQueue()' },
        ]);
    });

    it('leaves an unterminated bold marker as literal text', () => {
        expect(parseInline('**almost')).toEqual([{ type: 'text', text: '**almost' }]);
    });

    it('never produces an inline code span that later disappears', () => {
        const line = 'run `npm test` and see `12 passed`';
        let maxCodeSpans = 0;

        for (const prefix of prefixes(line)) {
            const spans = parseInline(prefix).filter((span) => span.type === 'code').length;
            expect(spans).toBeGreaterThanOrEqual(maxCodeSpans);
            maxCodeSpans = spans;
        }

        expect(maxCodeSpans).toBe(2);
    });
});

describe('inline spans', () => {
    it('reads bold', () => {
        expect(parseInline('a **b** c')).toEqual([
            { type: 'text', text: 'a ' },
            { type: 'strong', text: 'b' },
            { type: 'text', text: ' c' },
        ]);
    });

    it('does not look inside a code span for other markers', () => {
        expect(parseInline('`**not bold**`')).toEqual([{ type: 'code', text: '**not bold**' }]);
    });

    it('returns nothing for empty text', () => {
        expect(parseInline('')).toEqual([]);
    });
});
