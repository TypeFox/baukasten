/**
 * Working with a {@link PromptValue}.
 *
 * Only the protocol-free operations live here. Serialising to MCP prompt
 * messages or ACP content blocks belongs in the adapters, because those are
 * the things that know what a pinned token should become on the wire — and
 * because this module must stay importable by a component, which an adapter
 * must not be.
 */

import type { PromptNode, PromptValue } from './types';

/**
 * Flattens to a display string.
 *
 * Tokens contribute their label, which is what a human reading the sentence
 * back expects. It is **not** a wire format: the label is not an identifier
 * and cannot be resolved back to what was pinned. Use a serialiser for that.
 */
export function promptToText(value: PromptValue): string {
    return value
        .map((node) => {
            switch (node.type) {
                case 'text':
                    return node.text;
                case 'mention':
                    return node.label;
                default:
                    return `/${node.name}`;
            }
        })
        .join('');
}

/** True when there is nothing to send — no text worth speaking of and no tokens. */
export function isPromptEmpty(value: PromptValue): boolean {
    return value.every((node) => node.type === 'text' && node.text.trim() === '');
}

/** A plain string as a single text run. */
export function textToPrompt(text: string): PromptValue {
    return text === '' ? [] : [{ type: 'text', text }];
}

/**
 * Merges adjacent text runs and drops empty ones.
 *
 * Editing produces fragmented values — deleting a token leaves the text either
 * side of it as two neighbours — and without this the node list grows
 * indefinitely during a session, taking React keys and diffing with it.
 */
export function normalizePrompt(value: PromptValue): PromptValue {
    const out: PromptNode[] = [];

    for (const node of value) {
        if (node.type !== 'text') {
            out.push(node);
            continue;
        }

        if (node.text === '') continue;

        const previous = out[out.length - 1];
        if (previous?.type === 'text') {
            out[out.length - 1] = { type: 'text', text: previous.text + node.text };
        } else {
            out.push(node);
        }
    }

    return out;
}

/**
 * Do two values describe the same prompt?
 *
 * Compares what is actually rendered — the run of text, and each token's
 * identity — and stops there deliberately. `mention.data` and
 * `command.arguments` are `unknown` by design, so that a pinned thing can be a
 * diagram node, a Date, or a reference into the host application's own model;
 * deep-comparing them would be unbounded, could recurse forever on a cyclic
 * graph, and would still give the wrong answer for anything with identity
 * semantics. Those two compare by reference.
 *
 * That limit is not a problem in practice because the values being compared
 * come from {@link normalizePrompt} and from the editor's own DOM read, both of
 * which pass token nodes through untouched. A caller that deep-clones its value
 * on every change — a JSON round trip per keystroke — will read as changed, and
 * should be holding the value it was handed instead.
 */
export function promptEquals(a: PromptValue, b: PromptValue): boolean {
    if (a === b) return true;
    if (a.length !== b.length) return false;

    return a.every((node, index) => nodeEquals(node, b[index]));
}

function nodeEquals(a: PromptNode, b: PromptNode): boolean {
    if (a === b) return true;

    if (a.type === 'text') {
        return b.type === 'text' && a.text === b.text;
    }

    if (a.type === 'mention') {
        return (
            b.type === 'mention' &&
            a.id === b.id &&
            a.kind === b.kind &&
            a.label === b.label &&
            a.data === b.data
        );
    }

    return (
        b.type === 'command' &&
        a.name === b.name &&
        a.label === b.label &&
        a.arguments === b.arguments
    );
}

/** Every mention in the value, in order. Duplicates are kept — position matters. */
export function promptMentions(value: PromptValue) {
    return value.filter(
        (node): node is Extract<PromptNode, { type: 'mention' }> => node.type === 'mention',
    );
}

/**
 * The command, if the value starts with one.
 *
 * Only the first node counts. A slash command is the verb of the sentence, so
 * one appearing halfway through is text that happens to contain a slash.
 */
export function promptCommand(value: PromptValue) {
    const first = value[0];
    return first?.type === 'command' ? first : undefined;
}
