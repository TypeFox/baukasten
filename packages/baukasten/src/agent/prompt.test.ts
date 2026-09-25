import { describe, expect, it } from 'vitest';
import {
    isPromptEmpty,
    normalizePrompt,
    promptCommand,
    promptEquals,
    promptMentions,
    promptToText,
    textToPrompt,
} from './prompt';
import { commandTrigger, detectTrigger, mentionTrigger, type Trigger } from './triggers';
import type { CommandSource, MentionSource, PromptValue } from './types';

const noSource = {
    search: async () => ({ items: [] }),
} as MentionSource & CommandSource;

const triggers: Trigger[] = [mentionTrigger(noSource), commandTrigger(noSource)];

describe('promptToText', () => {
    it('renders tokens as their labels', () => {
        const value: PromptValue = [
            { type: 'text', text: 'compare ' },
            { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
            { type: 'text', text: ' with ' },
            { type: 'mention', id: 'b', kind: 'file', label: 'b.ts' },
        ];

        expect(promptToText(value)).toBe('compare a.ts with b.ts');
    });

    it('renders a command with its slash', () => {
        expect(
            promptToText([{ type: 'command', name: 'review', label: 'Review', arguments: {} }]),
        ).toBe('/review');
    });
});

describe('normalizePrompt', () => {
    it('merges adjacent text runs left by an edit', () => {
        expect(
            normalizePrompt([
                { type: 'text', text: 'before ' },
                { type: 'text', text: 'after' },
            ]),
        ).toEqual([{ type: 'text', text: 'before after' }]);
    });

    it('drops empty runs without merging across a token', () => {
        expect(
            normalizePrompt([
                { type: 'text', text: 'a' },
                { type: 'text', text: '' },
                { type: 'mention', id: 'x', kind: 'file', label: 'x.ts' },
                { type: 'text', text: 'b' },
            ]),
        ).toEqual([
            { type: 'text', text: 'a' },
            { type: 'mention', id: 'x', kind: 'file', label: 'x.ts' },
            { type: 'text', text: 'b' },
        ]);
    });
});

describe('promptEquals', () => {
    it('is true for separately-built values that describe the same prompt', () => {
        const build = (): PromptValue => [
            { type: 'text', text: 'look at ' },
            { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
        ];

        // The whole point: the editor's sync guard used `===` here, so any
        // caller that rebuilt the array — normalising, mapping, reducing — was
        // told the value had changed externally.
        expect(promptEquals(build(), build())).toBe(true);
    });

    it('notices a different token, a different label and a different length', () => {
        const base: PromptValue = [{ type: 'mention', id: 'a', kind: 'file', label: 'a.ts' }];

        expect(
            promptEquals(base, [{ type: 'mention', id: 'b', kind: 'file', label: 'a.ts' }]),
        ).toBe(false);
        expect(
            promptEquals(base, [{ type: 'mention', id: 'a', kind: 'file', label: 'b.ts' }]),
        ).toBe(false);
        expect(promptEquals(base, [...base, { type: 'text', text: '!' }])).toBe(false);
    });

    it('does not confuse a command with a mention that shares its label', () => {
        expect(
            promptEquals(
                [{ type: 'command', name: 'review', label: 'review', arguments: {} }],
                [{ type: 'mention', id: 'review', kind: 'file', label: 'review' }],
            ),
        ).toBe(false);
    });

    it('compares the opaque payload by reference, as documented', () => {
        const data = { revision: 3 };

        expect(
            promptEquals(
                [{ type: 'mention', id: 'a', kind: 'node', label: 'a', data }],
                [{ type: 'mention', id: 'a', kind: 'node', label: 'a', data }],
            ),
        ).toBe(true);

        // Deep-comparing `data` is not on the table — it is `unknown` so that a
        // pinned thing can be a class instance or a cyclic graph.
        expect(
            promptEquals(
                [{ type: 'mention', id: 'a', kind: 'node', label: 'a', data: { revision: 3 } }],
                [{ type: 'mention', id: 'a', kind: 'node', label: 'a', data: { revision: 3 } }],
            ),
        ).toBe(false);
    });
});

describe('inspection', () => {
    it('treats whitespace-only as empty', () => {
        expect(isPromptEmpty(textToPrompt('   '))).toBe(true);
        expect(isPromptEmpty([])).toBe(true);
        expect(isPromptEmpty(textToPrompt('hi'))).toBe(false);
    });

    it('is not empty when only a token is present', () => {
        expect(isPromptEmpty([{ type: 'mention', id: 'a', kind: 'file', label: 'a.ts' }])).toBe(
            false,
        );
    });

    it('keeps duplicate mentions, because position carries meaning', () => {
        const value: PromptValue = [
            { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
            { type: 'text', text: ' and ' },
            { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
        ];

        expect(promptMentions(value)).toHaveLength(2);
    });

    it('only counts a command in first position', () => {
        expect(
            promptCommand([{ type: 'command', name: 'review', label: 'R', arguments: {} }])?.name,
        ).toBe('review');

        expect(
            promptCommand([
                { type: 'text', text: 'see ' },
                { type: 'command', name: 'review', label: 'R', arguments: {} },
            ]),
        ).toBeUndefined();
    });
});

describe('detectTrigger', () => {
    it('opens a mention mid-sentence', () => {
        const active = detectTrigger('look at @upl', 12, triggers);

        expect(active?.trigger.id).toBe('mention');
        expect(active?.query).toBe('upl');
        expect(active?.from).toBe(8);
    });

    it('opens with an empty query the moment the character is typed', () => {
        expect(detectTrigger('look at @', 9, triggers)?.query).toBe('');
    });

    it('does not open inside an email address', () => {
        // The single commonest failure in editors like this.
        expect(detectTrigger('mail sam@example.com', 20, triggers)).toBeNull();
    });

    it('does not open on a slash inside a path', () => {
        expect(detectTrigger('see src/services', 16, triggers)).toBeNull();
    });

    it('closes once the word ends', () => {
        expect(detectTrigger('@uploader.ts and then', 21, triggers)).toBeNull();
    });

    it('keeps a command to the start of the input', () => {
        expect(detectTrigger('/rev', 4, triggers)?.trigger.id).toBe('command');
        expect(detectTrigger('please /rev', 11, triggers)).toBeNull();
    });

    it('refuses to reopen a singular trigger once something is pinned', () => {
        expect(detectTrigger('/rev', 4, triggers, { pinned: ['command'] })).toBeNull();
        // A mention is plural, so it may open again.
        expect(detectTrigger('@upl', 4, triggers, { pinned: ['mention'] })?.query).toBe('upl');
    });

    it('honours line-start when configured', () => {
        const lineStart: Trigger[] = [
            commandTrigger(noSource, { position: 'line-start', cardinality: 'many' }),
        ];

        expect(detectTrigger('first\n/rev', 10, lineStart)?.query).toBe('rev');
        expect(detectTrigger('first /rev', 10, lineStart)).toBeNull();
    });

    it('gives up on an unreasonably long query', () => {
        const long = `@${'x'.repeat(200)}`;
        expect(detectTrigger(long, long.length, triggers)).toBeNull();
    });

    it('returns the caret offset so the trigger text can be replaced', () => {
        const active = detectTrigger('look at @upl', 12, triggers);
        expect(active && 'look at @upl'.slice(active.from, active.to)).toBe('@upl');
    });
});
