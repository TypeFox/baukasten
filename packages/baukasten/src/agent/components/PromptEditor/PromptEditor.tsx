import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { isPromptEmpty, normalizePrompt, promptEquals } from '../../prompt';
import { detectTrigger, type ActiveTrigger, type Trigger } from '../../triggers';
import { useSourceQuery } from '../../useSourceQuery';
import type { CommandItem, CommandSource, MentionItem, PromptNode, PromptValue } from '../../types';
import { visuallyHidden } from '../../a11y.css';
import { CommandArgs } from './CommandArgs';
import { TriggerMenu, type TriggerMenuItem } from './TriggerMenu';
import { createPortal } from 'react-dom';
import {
    TOKEN_ATTR,
    TokenRegistry,
    caretOffset,
    placeCaretAfter,
    readValue,
    removeToken,
    replaceRangeWithToken,
    textOf,
    tokenBeforeCaret,
    tokenElements,
    writeValue,
} from './model';
import * as styles from './PromptEditor.css';

type SourceItem = MentionItem | CommandItem;

function itemId(item: SourceItem): string {
    return 'id' in item ? item.id : item.name;
}

function toMenuItem(item: SourceItem): TriggerMenuItem {
    return {
        id: itemId(item),
        label: item.label,
        description: item.description,
        icons: item.icons,
        group: item.group,
    };
}

/**
 * Where to anchor the menu.
 *
 * Prefers the caret's own rect, so the popup tracks the word being completed
 * rather than the box around it. Falls back to the editor when the caret
 * cannot be measured — a collapsed range legitimately reports no rects, and
 * `Range.getClientRects` is absent altogether in some environments. Neither is
 * a reason to fail to show a menu: a slightly misplaced popup is recoverable,
 * an invisible one is not.
 */
function caretRect(surface: HTMLElement, selection: Selection | null): DOMRect {
    try {
        if (selection && selection.rangeCount > 0) {
            const rects = selection.getRangeAt(0).getClientRects();
            if (rects.length > 0) return rects[0];
        }
    } catch {
        // Measurement is unavailable here. The editor's own rect will do.
    }

    return surface.getBoundingClientRect();
}

/**
 * Turns a picked result into the node that gets pinned.
 *
 * Distinguished by shape rather than by which trigger produced it, so a custom
 * trigger backed by either source kind pins the right thing.
 */
function toNode(item: SourceItem): PromptNode {
    if ('name' in item && !('kind' in item)) {
        return { type: 'command', name: item.name, label: item.label, arguments: {} };
    }

    const mention = item as MentionItem;
    return {
        type: 'mention',
        id: mention.id,
        kind: mention.kind,
        label: mention.label,
        data: mention.data,
    };
}

/**
 * Extends the DOM attributes rather than listing a handful.
 *
 * It used to declare only `className` and `aria-label`, which meant it rejected
 * `id`, `style`, `onFocus`, `aria-describedby` and `data-*` — so a caller could
 * not associate a label with it, describe it for a screen reader, or hang a
 * test hook on it. The omitted members are the ones this component owns: it is
 * a controlled editor over a {@link PromptValue}, not over a string.
 */
export interface PromptEditorProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children' | 'defaultValue' | 'onChange' | 'onSubmit'
> {
    /** Controlled value. Rewritten into the DOM only when it changes externally. */
    value: PromptValue;
    onChange: (value: PromptValue) => void;
    /** Enter, unless Shift is held. */
    onSubmit?: (value: PromptValue) => void;
    /** `/` and `@` are two entries here, not two features. */
    triggers?: readonly Trigger[];
    /** @default 'Send a message…' */
    placeholder?: string;
    disabled?: boolean;
    /** @default 'Message' */
    'aria-label'?: string;
    /**
     * Files that arrived on the clipboard.
     *
     * Pasting a screenshot is the commonest way anyone attaches an image to an
     * agent, and without a handler here the browser drops a base64 `<img>`
     * straight into the editable region — which reads back as empty text and
     * bloats the document invisibly.
     */
    onPasteFiles?: (files: FileList) => void;
}

/**
 * An input whose value is not a string.
 *
 * It holds a {@link PromptValue} — an ordered list of text runs and pinned
 * atomic tokens — and everything flexible about this component follows from
 * that. A string cannot record *which* file "compare this with that" refers
 * to; this can, survives a round trip, and is what lets a failed message be
 * restored with its references intact.
 *
 * Tokens are `contentEditable={false}` inline elements, so the browser handles
 * arrow keys, caret placement and selection across them. Backspace is handled
 * explicitly: the first press arms the token beside the caret and the second
 * removes it, so a pinned reference is never lost to a keystroke aimed at the
 * character next to it.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState<PromptValue>([]);
 *
 * <PromptEditor
 *   value={value}
 *   onChange={setValue}
 *   onSubmit={send}
 *   triggers={[mentionTrigger(resources), commandTrigger(prompts)]}
 *   placeholder="Ask a follow-up…"
 * />
 * ```
 */
export const PromptEditor: React.FC<PromptEditorProps> = ({
    value,
    onChange,
    onSubmit,
    triggers = [],
    placeholder = 'Send a message…',
    disabled = false,
    className,
    'aria-label': ariaLabel = 'Message',
    onPasteFiles,
    ...rest
}) => {
    const surfaceRef = useRef<HTMLDivElement>(null);
    const armedRef = useRef<HTMLElement | null>(null);
    const registry = useRef(new TokenRegistry());
    // Namespaces the option ids `aria-activedescendant` points at, so two
    // editors on one page cannot collide.
    const instanceId = useId();

    /**
     * One entry per token currently on screen, so each can be rendered into.
     *
     * Rebuilt after every mutation rather than tracked incrementally: the
     * browser removes token elements on its own — a selection delete, a cut, a
     * paste over — and there is no reliable notification for all of it. A
     * rescan is cheap at the scale of a prompt and cannot drift.
     */
    const [mounted, setMounted] = useState<
        readonly { id: string; element: HTMLElement; content: React.ReactNode }[]
    >([]);

    /**
     * True when some token draws itself, which changes how tokens are created.
     *
     * Two reasons a token can need rendering into: a trigger supplying
     * `renderToken`, and a command that declares arguments — the latter being
     * the editor's own doing rather than the consumer's, since a declared
     * argument has to be fillable whether or not anyone customised the chip.
     */
    const custom = useMemo(
        () => triggers.some((trigger) => trigger.renderToken || trigger.args),
        [triggers],
    );

    const emitRef = useRef<() => void>(() => undefined);

    const syncTokens = useCallback(() => {
        const surface = surfaceRef.current;
        if (!surface || !custom) return;

        setMounted(
            tokenElements(surface).flatMap((element) => {
                const id = element.getAttribute(TOKEN_ATTR) ?? '';
                const entry = registry.current.entry(id);
                if (!entry) return [];

                const trigger = triggers.find((candidate) => candidate.id === entry.triggerId);

                // A consumer's own renderer wins: if they said how a pinned
                // thing looks, that includes a command.
                if (trigger?.renderToken) {
                    return [{ id, element, content: trigger.renderToken(entry.node) }];
                }

                if (entry.node.type === 'command' && entry.args && entry.args.length > 0) {
                    const node = entry.node;
                    return [
                        {
                            id,
                            element,
                            content: (
                                <CommandArgs
                                    node={node}
                                    args={entry.args}
                                    source={
                                        trigger?.source && 'completeArgument' in trigger.source
                                            ? (trigger.source as CommandSource)
                                            : undefined
                                    }
                                    onChange={(next) => {
                                        // In place: the element, its id and its
                                        // position in the sentence all stay put,
                                        // so only the value changes and the caret
                                        // never moves.
                                        registry.current.update(id, next);
                                        emitRef.current();
                                    }}
                                />
                            ),
                        },
                    ];
                }

                return [];
            }),
        );
    }, [custom, triggers]);

    const [active, setActive] = useState<ActiveTrigger | null>(null);
    const [anchor, setAnchor] = useState<DOMRect | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    /**
     * Things that happened, for anyone not watching the editor.
     *
     * A polite live region rather than an alert: arming a token and removing
     * one are consequences of the user's own keystroke, so they should be heard
     * in turn rather than interrupting.
     */
    const [status, setStatus] = useState('');

    /**
     * Kept out of the sync effect's dependencies on purpose.
     *
     * `syncTokens` changes identity whenever `triggers` is a fresh array — and
     * it is a fresh array literal in this component's own documented example.
     * As a dependency it re-ran the write on every parent render, which against
     * a streaming transcript is several times a second.
     */
    const syncTokensRef = useRef(syncTokens);
    syncTokensRef.current = syncTokens;

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        // The DOM *is* the editing surface, so writing the value back into it
        // during ordinary typing would reset the caret on every keystroke.
        //
        // Compared against what the surface actually holds rather than against
        // the last value emitted. A remembered "last emitted" is a second copy
        // of the truth and went stale in both directions: `===` against it
        // failed for any caller that normalised or mapped the value before
        // storing it, rebuilding the DOM on every keystroke; and nothing
        // updated it after an externally-set value, so a restored draft was
        // rewritten on every render and could not be edited at all. Reading the
        // surface cannot go stale, because it is the thing being guarded.
        //
        // Both sides are normalised so the comparison is stable: `readValue`
        // normalises already, and without matching it here a caller holding an
        // un-normalised value would differ forever and rewrite on every render.
        const next = normalizePrompt(value);
        if (promptEquals(next, readValue(surface, registry.current))) return;

        writeValue(surface, next, registry.current, styles.token, !custom);
        syncTokensRef.current();
    }, [value, custom]);

    const pinned = useMemo(
        () =>
            value
                .filter((node) => node.type === 'command')
                .map(() => 'command')
                .concat(value.some((node) => node.type === 'mention') ? ['mention'] : []),
        [value],
    );

    /**
     * Identifies *what is being completed*, as opposed to what is highlighted.
     *
     * The highlight should survive anything that leaves the query alone —
     * pressing an arrow key, the menu finishing a fetch, a re-render. It should
     * reset only when the user is now completing something else.
     */
    const completing = active === null ? null : `${active.trigger.id}:${active.query}`;

    useEffect(() => {
        setActiveIndex(0);
    }, [completing]);

    /** Keys that move the menu rather than the caret. */
    const NAVIGATION = ['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape'];

    const source = active?.trigger.source;

    const { items, loading } = useSourceQuery<SourceItem>(active?.query ?? '', {
        enabled: active !== null,
        cacheKey: active?.trigger.id ?? 'none',
        search: useCallback(
            (query: Parameters<NonNullable<typeof source>['search']>[0]) =>
                source
                    ? (source.search(query) as Promise<{ items: readonly SourceItem[] }>)
                    : Promise.resolve({ items: [] }),
            [source],
        ),
    });

    const disarm = useCallback(() => {
        armedRef.current?.classList.remove(styles.tokenArmed);
        armedRef.current = null;
    }, []);

    const emit = useCallback(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        onChange(readValue(surface, registry.current));
        syncTokens();
    }, [onChange, syncTokens]);

    emitRef.current = emit;

    const syncTrigger = useCallback(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        const selection = surface.ownerDocument.defaultView?.getSelection() ?? null;
        const caret = caretOffset(surface, selection);

        if (caret === null) {
            setActive(null);
            return;
        }

        const found = detectTrigger(textOf(surface), caret, triggers, { pinned });
        setActive(found);

        if (found) {
            setAnchor(caretRect(surface, selection));
        }
    }, [triggers, pinned]);

    const insert = useCallback(
        (item: TriggerMenuItem) => {
            const surface = surfaceRef.current;
            if (!surface || !active) return;

            const picked = items.find((candidate) => itemId(candidate) === item.id);
            if (!picked) return;

            // Only a command declares arguments, and only when the source said
            // so. An empty list is the same as none: a chip with no fields.
            const args =
                'arguments' in picked && picked.arguments?.length ? picked.arguments : undefined;

            replaceRangeWithToken(
                surface,
                active.from,
                active.to,
                toNode(picked),
                registry.current,
                styles.token,
                {
                    fillText: !active.trigger.renderToken && !args,
                    triggerId: active.trigger.id,
                    args,
                },
            );

            setActive(null);
            emit();
        },
        [active, items, emit],
    );

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const surface = surfaceRef.current;
            if (!surface) return;

            if (active) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setActiveIndex((current) => (current + 1) % Math.max(1, items.length));
                    return;
                }
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setActiveIndex(
                        (current) =>
                            (current - 1 + Math.max(1, items.length)) % Math.max(1, items.length),
                    );
                    return;
                }
                if (event.key === 'Enter' || event.key === 'Tab') {
                    const picked = items[activeIndex];
                    if (picked) {
                        event.preventDefault();
                        insert(toMenuItem(picked));
                        return;
                    }

                    // Nothing to pick — the menu is showing "No matches". Close
                    // it and let the key do its ordinary job.
                    //
                    // Returning here instead left Enter both unhandled *and*
                    // unprevented, so the browser inserted a newline rather
                    // than sending, and the keystroke went on to reach any
                    // pending approval's document listener and accept it.
                    setActive(null);
                }
                if (event.key === 'Escape') {
                    event.preventDefault();
                    setActive(null);
                    return;
                }
            }

            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                const current = readValue(surface, registry.current);
                if (!isPromptEmpty(current)) onSubmit?.(current);
                return;
            }

            if (event.key === 'Backspace') {
                const selection = surface.ownerDocument.defaultView?.getSelection() ?? null;
                const token = tokenBeforeCaret(surface, selection);

                if (token && armedRef.current !== token) {
                    // First press arms it. A pinned reference should not be
                    // lost to a keystroke that was aimed at the space beside it.
                    event.preventDefault();
                    disarm();
                    armedRef.current = token;
                    token.classList.add(styles.tokenArmed);
                    // Announced, not just outlined. A red border is nothing to
                    // someone not seeing it, and the silence made the guard
                    // actively harmful: the first press appears not to have
                    // registered, so they press again and the reference
                    // disappears — one audible deletion turned into a silent
                    // one preceded by a silent no-op.
                    setStatus(`${token.textContent ?? 'Token'} — press Backspace again to remove`);
                    return;
                }

                if (token && armedRef.current === token) {
                    event.preventDefault();
                    const label = token.textContent ?? 'Token';
                    removeToken(token);
                    armedRef.current = null;
                    setStatus(`${label} removed`);
                    emit();
                    return;
                }
            }

            disarm();
        },
        [active, items, activeIndex, insert, onSubmit, emit, disarm],
    );

    const empty = isPromptEmpty(value);

    /**
     * Ids for the combobox relationship.
     *
     * The editor previously put `aria-expanded` on `role="textbox"`, which does
     * not support it in ARIA 1.2 — so it was discarded, and there was no
     * `aria-controls` or `aria-activedescendant` either. The observable effect:
     * type `@`, press the down arrow three times hearing nothing at any point,
     * press Enter, and pin a reference that was never named aloud.
     */
    const listId = `${instanceId}-list`;
    const activeOptionId =
        active && items.length > 0 ? `${instanceId}-option-${activeIndex}` : undefined;

    return (
        <>
            <div
                // Spread first: the handlers below are this component's own and
                // must not be silently replaced by a caller's.
                {...rest}
                ref={surfaceRef}
                className={clsx(styles.surface, className)}
                contentEditable={!disabled}
                suppressContentEditableWarning
                // `combobox` only when there is something to pop up.
                //
                // `aria-expanded` on `role="textbox"` is discarded in ARIA 1.2,
                // which is why arrowing through results announced nothing. But
                // an editor configured with no triggers can never pop anything
                // up, and calling it a combobox would promise a listbox that
                // does not exist.
                role={triggers.length > 0 ? 'combobox' : 'textbox'}
                aria-multiline="true"
                aria-label={ariaLabel}
                aria-expanded={active !== null}
                aria-controls={active !== null ? listId : undefined}
                aria-activedescendant={activeOptionId}
                aria-autocomplete="list"
                data-empty={empty}
                data-placeholder={placeholder}
                onInput={() => {
                    disarm();
                    emit();
                    syncTrigger();
                }}
                onPaste={(event) => {
                    const files = event.clipboardData?.files;

                    // A pasted image also carries a text fallback — a file
                    // path, or the word "image". Handling the files and
                    // returning is what stops that junk landing in the draft
                    // beside the attachment.
                    if (files && files.length > 0 && onPasteFiles) {
                        event.preventDefault();
                        onPasteFiles(files);
                        return;
                    }

                    // Everything else is forced to plain text. The browser's
                    // default drops whatever markup was on the clipboard
                    // directly into the editable region — styled spans, tables,
                    // entire documents — which survives into the DOM this
                    // component reads its value back out of.
                    event.preventDefault();
                    const text = event.clipboardData?.getData('text/plain') ?? '';
                    if (text === '') return;

                    // Deprecated, universally implemented, and the only way to
                    // insert text while leaving the undo stack intact.
                    const inserted = surfaceRef.current?.ownerDocument.execCommand(
                        'insertText',
                        false,
                        text,
                    );

                    if (!inserted) {
                        const selection =
                            surfaceRef.current?.ownerDocument.defaultView?.getSelection();
                        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
                        if (range) {
                            range.deleteContents();
                            const node = document.createTextNode(text);
                            range.insertNode(node);
                            placeCaretAfter(node);
                        }
                    }

                    emit();
                    syncTrigger();
                }}
                onKeyUp={(event) => {
                    // While the menu is open these keys moved the highlight,
                    // not the caret, so there is nothing to re-detect — and
                    // re-running detection would recompute the anchor from a
                    // selection that never moved.
                    if (active && NAVIGATION.includes(event.key)) return;
                    syncTrigger();
                }}
                onClick={syncTrigger}
                onBlur={() => {
                    disarm();
                    setActive(null);
                }}
                onKeyDown={onKeyDown}
            />

            <TriggerMenu
                open={active !== null}
                anchor={anchor}
                items={items.map((item) => ({
                    ...toMenuItem(item),
                    render: active?.trigger.renderItem
                        ? () => active.trigger.renderItem!(item)
                        : undefined,
                }))}
                activeIndex={activeIndex}
                loading={loading}
                label={active?.trigger.label}
                fallbackIcon={active?.trigger.icon}
                onSelect={insert}
                onActiveIndexChange={setActiveIndex}
                listId={listId}
                optionIdPrefix={`${instanceId}-option`}
            />

            {/*
             * What just happened, for anyone not watching.
             *
             * Outside the editing surface on purpose: text inside a
             * contentEditable is part of the value being edited, and a live
             * region there would both be read as content and be deletable.
             */}
            <div role="status" aria-live="polite" className={visuallyHidden}>
                {status}
            </div>

            {/*
             * Each pinned token gets its own portal into its (uneditable)
             * element. That is what makes a token arbitrary markup rather than
             * a string — a thumbnail, a type signature, a colour swatch — while
             * the element itself stays atomic to the browser.
             */}
            {mounted.map(({ id, element, content }) => createPortal(content, element, id))}
        </>
    );
};

PromptEditor.displayName = 'PromptEditor';
