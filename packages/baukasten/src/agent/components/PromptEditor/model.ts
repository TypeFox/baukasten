/**
 * Moving between a {@link PromptValue} and the DOM that shows it.
 *
 * The editing surface is a `contentEditable` whose tokens are
 * `contentEditable={false}` inline elements. That one decision buys most of
 * what makes a token feel like a token — the browser already steps arrow keys
 * over an uneditable inline node, refuses to place a caret inside it, and does
 * not split it on selection. Reimplementing that on top of a plain input is
 * where these editors usually go wrong.
 *
 * What the browser does *not* do reliably is delete one predictably, or tell
 * you where the caret is in model terms. That is what this module is for.
 */

import type { CommandArgument, PromptNode, PromptValue } from '../../types';
import { normalizePrompt } from '../../prompt';

/** Marks an element as an atomic token, and identifies which one. */
export const TOKEN_ATTR = 'data-bk-token';

/**
 * Where token payloads actually live.
 *
 * The DOM carries only an opaque instance id; the node itself stays here. The
 * obvious alternative — serialising the node into the attribute — quietly
 * constrains what a token is allowed to *be*: `data` could then hold only what
 * survives `JSON.stringify`, ruling out a Date, a class instance, or a
 * reference back into the host application's own model. For an abstraction
 * whose point is that a pinned thing might equally be a file, a diagram node,
 * a symbol in a DSL or a tool definition, that is the wrong limit to impose.
 *
 * A duplicated element — from a copy and paste — resolves to the same node,
 * which is the correct reading of duplicating a reference.
 */
export interface TokenEntry {
    readonly node: PromptNode;
    /**
     * Which trigger pinned it.
     *
     * Recorded rather than inferred, because two triggers can legitimately
     * produce the same *kind* of node and still want to render it differently
     * — a `@` offering files and a `#` offering diagram nodes both produce
     * mentions, and nothing about the node itself says which chip to draw.
     */
    readonly triggerId?: string;
    /**
     * What the source said this command's arguments are.
     *
     * Held here rather than on the node because the two are different things:
     * the node carries the *values*, which are part of the prompt and go on the
     * wire, while the declarations are the source's description of the command
     * and belong to the editing session. Putting them on the node would send a
     * server its own schema back.
     */
    readonly args?: readonly CommandArgument[];
}

export class TokenRegistry {
    private readonly entries = new Map<string, TokenEntry>();
    private next = 0;

    /** Registers a node and returns the id to put in the DOM. */
    register(node: PromptNode, triggerId?: string, args?: readonly CommandArgument[]): string {
        const id = `tok${this.next++}`;
        this.entries.set(id, { node, triggerId, args });
        return id;
    }

    get(id: string): PromptNode | undefined {
        return this.entries.get(id)?.node;
    }

    entry(id: string): TokenEntry | undefined {
        return this.entries.get(id);
    }

    /**
     * Replaces the node behind a token, keeping everything else about it.
     *
     * This is how a pinned command stays editable: filling in an argument
     * rewrites the node in place, so the element, its id and its position in
     * the text are all untouched and only the value changes. Re-pinning
     * instead would move the caret and lose the rest of the sentence's
     * relationship to it.
     */
    update(id: string, node: PromptNode): void {
        const existing = this.entries.get(id);
        if (!existing) return;
        this.entries.set(id, { ...existing, node });
    }

    clear(): void {
        this.entries.clear();
        this.next = 0;
    }
}

/** Every token element currently in the root, in document order. */
export function tokenElements(root: HTMLElement): HTMLElement[] {
    return [...root.querySelectorAll<HTMLElement>(`[${TOKEN_ATTR}]`)];
}

/**
 * Reads the editor's DOM back into a value.
 *
 * Walks direct children: a token element resolves through the registry,
 * anything else contributes its text.
 */
export function readValue(root: HTMLElement, registry: TokenRegistry): PromptValue {
    const nodes: PromptNode[] = [];

    root.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            nodes.push({ type: 'text', text: child.textContent ?? '' });
            return;
        }

        if (!(child instanceof HTMLElement)) return;

        const id = child.getAttribute(TOKEN_ATTR);
        if (id !== null) {
            const node = registry.get(id);
            // An id with no entry means the element outlived its registry —
            // pasted in from elsewhere, say. Degrading to its visible text is
            // the only honest option: round-tripping it as a reference would
            // claim something was pinned that this editor never pinned.
            nodes.push(node ?? { type: 'text', text: child.textContent ?? '' });
            return;
        }

        // A <br> from pressing Enter, or a stray wrapper a browser inserted.
        nodes.push({
            type: 'text',
            text: child.tagName === 'BR' ? '\n' : (child.textContent ?? ''),
        });
    });

    return normalizePrompt(nodes);
}

/** The default label for a token, when nothing more specific renders it. */
export function tokenText(node: PromptNode): string {
    switch (node.type) {
        case 'mention':
            return node.label;
        case 'command':
            return `/${node.name}`;
        default:
            return '';
    }
}

/**
 * Builds the element for one token.
 *
 * Left empty when the caller intends to render into it — the editor mounts a
 * React portal per token, which is what lets a trigger decide entirely what a
 * pinned thing looks like. Only the fallback fills in text.
 */
export function createTokenElement(
    node: PromptNode,
    registry: TokenRegistry,
    document: Document,
    options: {
        readonly fillText?: boolean;
        readonly triggerId?: string;
        readonly args?: readonly CommandArgument[];
    } = {},
): HTMLElement {
    const element = document.createElement('span');
    element.setAttribute(TOKEN_ATTR, registry.register(node, options.triggerId, options.args));
    // The attribute rather than the IDL property: the property is a convenience
    // that not every DOM implementation reflects back, and this is the single
    // thing that makes the token atomic — worth setting unambiguously.
    element.setAttribute('contenteditable', 'false');

    if (options.fillText !== false) {
        element.textContent = tokenText(node);
    }

    return element;
}

/** Replaces the editor's contents with a value. Only for externally-driven changes. */
export function writeValue(
    root: HTMLElement,
    value: PromptValue,
    registry: TokenRegistry,
    tokenClass: string,
    fillText = true,
): void {
    root.textContent = '';
    registry.clear();

    for (const node of value) {
        if (node.type === 'text') {
            root.appendChild(root.ownerDocument.createTextNode(node.text));
            continue;
        }

        const element = createTokenElement(node, registry, root.ownerDocument, { fillText });
        element.className = tokenClass;
        root.appendChild(element);
    }
}

/**
 * How far the caret is into the editor, counting a token as one character.
 *
 * Model offsets rather than DOM offsets, because trigger detection reasons
 * about the text the user can see, not about how a browser happens to have
 * split it into nodes.
 */
export function caretOffset(root: HTMLElement, selection: Selection | null): number | null {
    if (!selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer)) return null;

    const measure = range.cloneRange();
    measure.selectNodeContents(root);
    measure.setEnd(range.startContainer, range.startOffset);

    return measure.toString().length;
}

/** The plain text of the editor, tokens included as their labels. */
export function textOf(root: HTMLElement): string {
    return root.textContent ?? '';
}

/**
 * The token element immediately before the caret, if the caret is touching one.
 *
 * Used for backspace: the first press selects that token and the second
 * removes it, so a pinned reference is never lost to a keystroke aimed at the
 * character beside it.
 */
export function tokenBeforeCaret(
    root: HTMLElement,
    selection: Selection | null,
): HTMLElement | null {
    if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null;

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer)) return null;

    const { startContainer, startOffset } = range;

    // Caret sits at the start of a text node: look at the previous sibling.
    if (startContainer.nodeType === Node.TEXT_NODE) {
        if (startOffset !== 0) return null;
        const previous = startContainer.previousSibling;
        return isToken(previous) ? previous : null;
    }

    if (startContainer === root) {
        const previous = root.childNodes[startOffset - 1];
        return isToken(previous) ? previous : null;
    }

    return null;
}

function isToken(node: Node | null | undefined): node is HTMLElement {
    return node instanceof HTMLElement && node.hasAttribute(TOKEN_ATTR);
}

/**
 * Removes a token and leaves the caret where it stood.
 *
 * Deleting the element on its own leaves the selection pointing at something
 * that is no longer in the document, and what a browser does next is its own
 * business — collapse to the start of the host, drop the selection entirely,
 * or keep a stale range. None of those is what someone pressing backspace
 * meant, so the position is captured first and restored after.
 */
export function removeToken(token: HTMLElement): void {
    const parent = token.parentNode;
    const selection = token.ownerDocument.defaultView?.getSelection();

    if (!parent) {
        token.remove();
        return;
    }

    const index = [...parent.childNodes].indexOf(token);
    token.remove();

    if (!selection) return;

    const range = token.ownerDocument.createRange();
    range.setStart(parent, Math.max(0, index));
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
}

/** Puts the caret just after an element, which is where it belongs post-insert. */
export function placeCaretAfter(element: Node): void {
    const selection = element.ownerDocument?.defaultView?.getSelection();
    if (!selection) return;

    const range = element.ownerDocument!.createRange();
    range.setStartAfter(element);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Swaps the trigger text for a token.
 *
 * `from` and `to` are model offsets from {@link caretOffset}, so this has to
 * walk the text nodes to find the matching DOM positions — the trigger may
 * well span a node boundary after earlier edits.
 */
export function replaceRangeWithToken(
    root: HTMLElement,
    from: number,
    to: number,
    node: PromptNode,
    registry: TokenRegistry,
    tokenClass: string,
    options: {
        readonly fillText?: boolean;
        readonly triggerId?: string;
        readonly args?: readonly CommandArgument[];
    } = {},
): void {
    const range = rangeForOffsets(root, from, to);
    if (!range) return;

    range.deleteContents();

    const element = createTokenElement(node, registry, root.ownerDocument, options);
    element.className = tokenClass;
    range.insertNode(element);

    // A trailing space, so the next thing typed is not glued to the token and
    // does not immediately reopen the trigger.
    const space = root.ownerDocument.createTextNode(' ');
    element.after(space);
    placeCaretAfter(space);
}

interface TextSpan {
    readonly node: Node;
    /** Model offset where this node's text begins. */
    readonly at: number;
    readonly length: number;
}

/**
 * Flattens the editor into its text nodes with their model offsets.
 *
 * Collected up front rather than searched during a walk: TypeScript cannot see
 * assignments made inside a callback, so the search-as-you-walk version reads
 * as though its results were never set.
 */
function textSpans(root: HTMLElement): TextSpan[] {
    const spans: TextSpan[] = [];
    let at = 0;

    const walk = (node: Node): void => {
        if (node.nodeType === Node.TEXT_NODE) {
            const length = node.textContent?.length ?? 0;
            spans.push({ node, at, length });
            at += length;
            return;
        }

        // A token counts for its visible length but has no editable interior,
        // so a range can never start or end inside one.
        if (isToken(node)) {
            at += node.textContent?.length ?? 0;
            return;
        }

        node.childNodes.forEach(walk);
    };

    root.childNodes.forEach(walk);
    return spans;
}

function positionAt(
    spans: readonly TextSpan[],
    offset: number,
): { node: Node; offset: number } | null {
    for (const span of spans) {
        if (offset <= span.at + span.length) {
            return { node: span.node, offset: Math.max(0, offset - span.at) };
        }
    }

    const last = spans[spans.length - 1];
    return last ? { node: last.node, offset: last.length } : null;
}

function rangeForOffsets(root: HTMLElement, from: number, to: number): Range | null {
    const spans = textSpans(root);
    const start = positionAt(spans, from);
    const end = positionAt(spans, to);
    if (!start || !end) return null;

    const range = root.ownerDocument.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    return range;
}
