import { beforeEach, describe, expect, it } from 'vitest';
import type { PromptValue } from '../../types';
import {
    TOKEN_ATTR,
    TokenRegistry,
    readValue,
    removeToken,
    replaceRangeWithToken,
    textOf,
    writeValue,
} from './model';

/**
 * These exercise the DOM half of the editor directly, without React.
 *
 * jsdom has no layout engine, so anything depending on a caret *rect* is not
 * testable here and is covered by the story instead. Structure, round-tripping
 * and offset arithmetic all are.
 */
let root: HTMLElement;
let registry: TokenRegistry;

beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
    registry = new TokenRegistry();
});

const VALUE: PromptValue = [
    { type: 'text', text: 'compare ' },
    { type: 'mention', id: 'file:a.ts', kind: 'file', label: 'a.ts' },
    { type: 'text', text: ' with ' },
    { type: 'mention', id: 'file:b.ts', kind: 'file', label: 'b.ts' },
];

describe('round-tripping', () => {
    it('writes a value and reads back exactly what went in', () => {
        writeValue(root, VALUE, registry, 'token');
        expect(readValue(root, registry)).toEqual(VALUE);
    });

    it('renders tokens as uneditable elements', () => {
        writeValue(root, VALUE, registry, 'token');
        const tokens = root.querySelectorAll(`[${TOKEN_ATTR}]`);

        expect(tokens).toHaveLength(2);
        // This is what makes a token atomic — the browser refuses to put a
        // caret inside it or split it on selection.
        tokens.forEach((token) => expect(token.getAttribute('contenteditable')).toBe('false'));
    });

    it('keeps the payload out of the DOM entirely', () => {
        writeValue(root, VALUE, registry, 'token');
        const [first] = root.querySelectorAll(`[${TOKEN_ATTR}]`);

        // The element carries an opaque id, not the node. The label is what is
        // visible; the identity lives in the registry.
        expect(first.textContent).toBe('a.ts');
        expect(first.getAttribute(TOKEN_ATTR)).not.toContain('file:a.ts');
        expect(registry.get(first.getAttribute(TOKEN_ATTR)!)).toEqual(VALUE[1]);
    });

    it('carries a payload that could never survive serialisation', () => {
        // The reason the registry exists. A token might point at a diagram
        // node, a DSL symbol, or a live object from the host's own model —
        // none of which round-trip through JSON.
        const live = { instance: new Map([['edge', 1]]), when: new Date(0), at: () => 'callable' };
        const value: PromptValue = [
            { type: 'mention', id: 'node:start', kind: 'diagram-node', label: 'Start', data: live },
        ];

        writeValue(root, value, registry, 'token');
        const [node] = readValue(root, registry);

        expect(node.type === 'mention' && node.data).toBe(live);
        expect(node.type === 'mention' && (node.data as typeof live).at()).toBe('callable');
    });

    it('records which trigger pinned a token', () => {
        const id = registry.register(
            { type: 'mention', id: 'n', kind: 'diagram-node', label: 'Start' },
            'node',
        );

        // Two triggers can produce the same kind of node and still want
        // different chips, so ownership is recorded rather than inferred.
        expect(registry.entry(id)?.triggerId).toBe('node');
    });

    it('reports text with tokens included as their labels', () => {
        writeValue(root, VALUE, registry, 'token');
        expect(textOf(root)).toBe('compare a.ts with b.ts');
    });

    it('degrades a token whose id it does not recognise', () => {
        const span = document.createElement('span');
        span.setAttribute(TOKEN_ATTR, 'tok-from-somewhere-else');
        span.textContent = 'pasted';
        root.appendChild(span);

        // Better to degrade to visible text than to round-trip as something
        // this editor never pinned.
        expect(readValue(root, registry)).toEqual([{ type: 'text', text: 'pasted' }]);
    });

    it('merges the text left either side of a removed token', () => {
        writeValue(root, VALUE, registry, 'token');
        root.querySelector(`[${TOKEN_ATTR}]`)!.remove();

        expect(readValue(root, registry)).toEqual([
            { type: 'text', text: 'compare  with ' },
            { type: 'mention', id: 'file:b.ts', kind: 'file', label: 'b.ts' },
        ]);
    });

    it('leaves the element empty when the caller will render into it', () => {
        writeValue(root, VALUE, registry, 'token', false);

        // The portal mounts over it; filling text first would flash the
        // default label before the real chip appeared.
        expect(root.querySelector(`[${TOKEN_ATTR}]`)!.textContent).toBe('');
        expect(readValue(root, registry)).toEqual(VALUE);
    });

    it('reads an empty editor as an empty value', () => {
        expect(readValue(root, registry)).toEqual([]);
    });
});

describe('removeToken', () => {
    it('leaves the caret exactly where the token stood', () => {
        writeValue(
            root,
            [
                { type: 'text', text: 'before ' },
                { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
                { type: 'text', text: ' after' },
            ],
            registry,
            'token',
        );

        const token = root.querySelector<HTMLElement>(`[${TOKEN_ATTR}]`)!;
        const stood = [...root.childNodes].indexOf(token);

        removeToken(token);

        // A bare remove() leaves the selection pointing at a detached node, and
        // what happens next is the browser's choice rather than the user's.
        const selection = window.getSelection()!;
        expect(selection.anchorNode).toBe(root);
        expect(selection.anchorOffset).toBe(stood);
        expect(selection.isCollapsed).toBe(true);
    });

    it('takes the token out of the value', () => {
        writeValue(root, VALUE, registry, 'token');
        removeToken(root.querySelector<HTMLElement>(`[${TOKEN_ATTR}]`)!);

        expect(readValue(root, registry)).toEqual([
            { type: 'text', text: 'compare  with ' },
            { type: 'mention', id: 'file:b.ts', kind: 'file', label: 'b.ts' },
        ]);
    });

    it('survives a token with no parent', () => {
        const orphan = document.createElement('span');
        orphan.setAttribute(TOKEN_ATTR, 'x');

        expect(() => removeToken(orphan)).not.toThrow();
    });
});

describe('replaceRangeWithToken', () => {
    it('swaps the trigger text for a token', () => {
        writeValue(root, [{ type: 'text', text: 'look at @upl' }], registry, 'token');

        replaceRangeWithToken(
            root,
            8,
            12,
            { type: 'mention', id: 'file:uploader.ts', kind: 'file', label: 'uploader.ts' },
            registry,
            'token',
        );

        expect(readValue(root, registry)).toEqual([
            { type: 'text', text: 'look at ' },
            { type: 'mention', id: 'file:uploader.ts', kind: 'file', label: 'uploader.ts' },
            { type: 'text', text: ' ' },
        ]);
    });

    it('leaves a trailing space, so the next keystroke does not reopen the trigger', () => {
        writeValue(root, [{ type: 'text', text: '@upl' }], registry, 'token');
        replaceRangeWithToken(
            root,
            0,
            4,
            { type: 'mention', id: 'x', kind: 'file', label: 'uploader.ts' },
            registry,
            'token',
        );

        expect(textOf(root).endsWith(' ')).toBe(true);
    });

    it('finds offsets that fall after an existing token', () => {
        writeValue(
            root,
            [
                { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
                { type: 'text', text: ' and @b' },
            ],
            registry,
            'token',
        );

        // 'a.ts' is 4 characters, so '@b' starts at offset 9 — the walk has to
        // count the token's visible length without descending into it.
        replaceRangeWithToken(
            root,
            9,
            11,
            { type: 'mention', id: 'b', kind: 'file', label: 'b.ts' },
            registry,
            'token',
        );

        const value = readValue(root, registry);
        expect(value.filter((node) => node.type === 'mention')).toHaveLength(2);
        expect(textOf(root)).toBe('a.ts and b.ts ');
    });

    it('pins a command as a command node', () => {
        writeValue(root, [{ type: 'text', text: '/rev' }], registry, 'token');
        replaceRangeWithToken(
            root,
            0,
            4,
            { type: 'command', name: 'review', label: 'Review', arguments: {} },
            registry,
            'token',
        );

        expect(readValue(root, registry)[0]).toEqual({
            type: 'command',
            name: 'review',
            label: 'Review',
            arguments: {},
        });
        expect(textOf(root).startsWith('/review')).toBe(true);
    });

    it('tags an inserted token with the trigger that produced it', () => {
        writeValue(root, [{ type: 'text', text: '#sta' }], registry, 'token');

        replaceRangeWithToken(
            root,
            0,
            4,
            { type: 'mention', id: 'node:start', kind: 'diagram-node', label: 'Start' },
            registry,
            'token',
            { triggerId: 'node', fillText: false },
        );

        const id = root.querySelector(`[${TOKEN_ATTR}]`)!.getAttribute(TOKEN_ATTR)!;
        expect(registry.entry(id)?.triggerId).toBe('node');
        // Left empty, because a portal will render the chip.
        expect(root.querySelector(`[${TOKEN_ATTR}]`)!.textContent).toBe('');
    });
});
