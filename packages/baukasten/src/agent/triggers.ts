/**
 * Trigger detection.
 *
 * `/` and `@` are the two we ship defaults for, not the two that exist —
 * adding `#` for issues or `:` for emoji is a config entry rather than a fork.
 *
 * The detection itself is a pure function of the text before the caret, which
 * is what makes the fiddly part testable: whether a trigger is active, and
 * what has been typed since it opened, decided without a DOM.
 */

import type { ReactNode } from 'react';
import type { CodiconName } from '../components/Icon';
import type { CommandItem, MentionItem, PromptNode, CommandSource, MentionSource } from './types';

export type TriggerPosition = 'anywhere' | 'input-start' | 'line-start';

/** Whatever a source returns. Both shapes carry a label, icons and a group. */
export type TriggerItem = MentionItem | CommandItem;

export interface Trigger {
    /** Identifies the trigger, and the key its results are cached under. */
    readonly id: string;
    /** The character that opens it. */
    readonly char: string;
    /**
     * Where it may open.
     *
     * A slash command is the verb of the sentence and belongs at the start; a
     * mention can appear anywhere. This is the difference that makes them two
     * kinds of thing rather than one feature with two characters.
     */
    readonly position: TriggerPosition;
    /** `one` refuses to open again once something is pinned. */
    readonly cardinality: 'one' | 'many';
    readonly source: MentionSource | CommandSource;
    /** Whether a pinned result still needs arguments filled in. */
    readonly args?: boolean;
    /** Shown above the results. */
    readonly label?: string;

    /**
     * Fallback icon for results that ship none of their own.
     *
     * The scale this operates at is the reason it is configurable: a trigger
     * might be offering files, but equally diagram nodes, symbols in a DSL,
     * database tables or tool definitions. A hardcoded file glyph is wrong for
     * every one of those except the first.
     */
    readonly icon?: CodiconName;

    /**
     * How a result looks in the menu.
     *
     * Return whatever suits the domain — a thumbnail for a diagram node, a
     * type signature for a symbol, a colour swatch for a design token. The
     * default renders an icon, a label and a muted description, which is a
     * reasonable list row and a poor diagram picker.
     */
    readonly renderItem?: (item: TriggerItem) => ReactNode;

    /**
     * How a pinned token looks in the editor.
     *
     * Rendered through a React portal into the token's element, so this can be
     * arbitrary markup rather than a string — the difference between a chip
     * that says `diagram.bpmn` and one that shows the node it points at.
     *
     * The node's `data` carries whatever the source attached, untouched and
     * unserialised, which is where a domain object belongs.
     */
    readonly renderToken?: (node: PromptNode) => ReactNode;
}

export interface ActiveTrigger {
    readonly trigger: Trigger;
    /** What has been typed since the trigger character. */
    readonly query: string;
    /** Offset of the trigger character in the text. */
    readonly from: number;
    /** Offset just past the caret. */
    readonly to: number;
}

/**
 * A trigger only opens on a word boundary.
 *
 * Without this, an email address opens a mention menu on its `@` and a path
 * opens a command menu on every `/` — which is the single most common
 * complaint about editors that get this wrong.
 */
function isBoundary(char: string | undefined): boolean {
    return char === undefined || /\s/.test(char);
}

/** A query runs until whitespace; a trigger closes as soon as the word ends. */
function isQueryChar(char: string): boolean {
    return !/\s/.test(char);
}

export interface DetectOptions {
    /** Kinds already pinned, so a `one` trigger knows not to reopen. */
    readonly pinned?: readonly string[];
    /** Longest query before giving up. Guards against a stray character. @default 64 */
    readonly maxQuery?: number;
}

/**
 * Finds the trigger the caret is currently inside, if any.
 *
 * Scans backwards from the caret for a trigger character, stopping at
 * whitespace — so the query is always the current word.
 */
export function detectTrigger(
    text: string,
    caret: number,
    triggers: readonly Trigger[],
    options: DetectOptions = {},
): ActiveTrigger | null {
    const { pinned = [], maxQuery = 64 } = options;
    const limit = Math.max(0, caret - maxQuery - 1);

    for (let at = caret - 1; at >= limit; at--) {
        const char = text[at];

        // Whitespace ends the word, so nothing before it can still be open.
        if (!isQueryChar(char)) return null;

        const trigger = triggers.find((candidate) => candidate.char === char);
        if (!trigger) continue;

        if (trigger.cardinality === 'one' && pinned.includes(trigger.id)) return null;

        if (trigger.position === 'input-start' && at !== 0) return null;
        if (trigger.position === 'line-start' && at !== 0 && text[at - 1] !== '\n') return null;
        if (trigger.position === 'anywhere' && !isBoundary(text[at - 1])) return null;

        return { trigger, query: text.slice(at + 1, caret), from: at, to: caret };
    }

    return null;
}

/**
 * The `@` default: mentions, anywhere, as many as you like.
 *
 * The defaults describe *shape*, not subject matter. Nothing here assumes the
 * thing being mentioned is a file — override `label`, `icon` and the renderers
 * to point it at diagram nodes, DSL symbols, tables or anything else, or add
 * several `@`-shaped triggers on different characters for different domains.
 *
 * @example
 * ```tsx
 * mentionTrigger(diagramNodes, {
 *   id: 'node',
 *   char: '#',
 *   label: 'Diagram nodes',
 *   icon: 'circuit-board',
 *   renderToken: (node) => <NodeChip node={node} />,
 * })
 * ```
 */
export function mentionTrigger(source: MentionSource, overrides: Partial<Trigger> = {}): Trigger {
    return {
        id: 'mention',
        char: '@',
        position: 'anywhere',
        cardinality: 'many',
        label: 'Context',
        source,
        ...overrides,
    };
}

/** The `/` default: one command, at the start, carrying arguments. */
export function commandTrigger(source: CommandSource, overrides: Partial<Trigger> = {}): Trigger {
    return {
        id: 'command',
        char: '/',
        position: 'input-start',
        cardinality: 'one',
        args: true,
        label: 'Commands',
        source,
        ...overrides,
    };
}
