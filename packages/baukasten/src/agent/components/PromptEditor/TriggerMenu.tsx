import React, { useEffect, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
    type VirtualElement,
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import { usePortalRoot } from '../../../context';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import type { IconSource } from '../../types';
import * as styles from './PromptEditor.css';

export interface TriggerMenuItem {
    readonly id: string;
    readonly label: string;
    readonly description?: string;
    readonly icons?: readonly IconSource[];
    readonly group?: string;
    /** Replaces the row entirely, when the trigger supplies a renderer. */
    readonly render?: () => React.ReactNode;
}

export interface TriggerMenuProps {
    open: boolean;
    /** The caret, as a rect the popup anchors to. */
    anchor: DOMRect | null;
    items: readonly TriggerMenuItem[];
    activeIndex: number;
    loading?: boolean;
    /** Heading above the results. Omitted, there is no heading. */
    label?: string;
    /** Shown when a completed search returned nothing. @default 'No matches' */
    emptyLabel?: string;
    onSelect: (item: TriggerMenuItem, index: number) => void;
    onActiveIndexChange: (index: number) => void;
    /** Merged onto the popup's own class, like every other component's root. */
    className?: string;
    /**
     * Fallback glyph for items that ship no icon.
     *
     * @default 'circle-filled' — deliberately neutral. A file glyph would be
     * wrong for every trigger that is not offering files.
     */
    fallbackIcon?: CodiconName;
    /**
     * Id the combobox points `aria-controls` at.
     *
     * Supplied by the editor rather than generated here: the relationship is
     * between two elements and only one of them can own the id.
     */
    listId?: string;
    /** Option ids are `${optionIdPrefix}-${index}`, for `aria-activedescendant`. */
    optionIdPrefix?: string;
}

/**
 * The popup a trigger opens, anchored to the caret.
 *
 * Anchored to a **virtual element** built from the caret rect rather than to
 * the editor, because the caret moves as you type and a menu pinned to the box
 * drifts away from what it is completing.
 *
 * Not built on `Combobox`, despite that being the obvious candidate: a
 * Combobox owns its own trigger button and its own value, and here both belong
 * to the editor. Reusing it would have meant fighting it for control of the
 * thing it exists to own.
 *
 * Rendered through `usePortalRoot`, so it lands in the right window under a
 * multi-window host rather than the main one.
 */
export const TriggerMenu: React.FC<TriggerMenuProps> = ({
    open,
    anchor,
    items,
    activeIndex,
    loading = false,
    label,
    emptyLabel = 'No matches',
    onSelect,
    onActiveIndexChange,
    fallbackIcon = 'circle-filled',
    className,
    listId,
    optionIdPrefix,
}) => {
    const portalRoot = usePortalRoot();
    const listRef = useRef<HTMLDivElement>(null);

    const { refs, floatingStyles } = useFloating({
        open,
        placement: 'bottom-start',
        middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });

    // A virtual reference, updated as the caret moves.
    useLayoutEffect(() => {
        if (!anchor) return;

        const virtual: VirtualElement = { getBoundingClientRect: () => anchor };
        refs.setReference(virtual);
    }, [anchor, refs]);

    // Keep the highlighted row on screen when navigating by keyboard.
    useEffect(() => {
        if (!open) return;
        const row = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
        // Optional-call rather than a plain call: keeping the highlighted row
        // on screen is a nicety, and an environment without scrollIntoView
        // should lose that rather than lose keyboard navigation entirely.
        row?.scrollIntoView?.({ block: 'nearest' });
    }, [open, activeIndex]);

    if (!open || !portalRoot || !anchor) return null;

    return createPortal(
        <div
            ref={(node) => {
                refs.setFloating(node);
                listRef.current = node;
            }}
            style={floatingStyles}
            className={clsx(styles.menu, className)}
        >
            {/*
             * The heading and the empty text sit *outside* the listbox.
             *
             * A `role="listbox"` containing non-option children is malformed,
             * and the practical consequence was that an empty result set gave
             * no signal at all — the "No matches" text was inside a listbox, so
             * it was neither an option nor announced as status.
             */}
            {label && (
                <div className={styles.menuLabel} id={listId ? `${listId}-label` : undefined}>
                    {label}
                </div>
            )}

            {items.length === 0 ? (
                <div className={styles.menuEmpty} role="status" aria-live="polite">
                    {loading ? 'Searching…' : emptyLabel}
                </div>
            ) : (
                <div
                    id={listId}
                    role="listbox"
                    aria-label={label}
                    aria-labelledby={label && listId ? `${listId}-label` : undefined}
                >
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            id={optionIdPrefix ? `${optionIdPrefix}-${index}` : undefined}
                            data-index={index}
                            data-active={index === activeIndex}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={styles.menuItem}
                            // Pointer-down would steal focus from the editor and
                            // collapse the selection the insert depends on.
                            onMouseDown={(event) => event.preventDefault()}
                            onMouseEnter={() => onActiveIndexChange(index)}
                            onClick={() => onSelect(item, index)}
                        >
                            {item.render ? (
                                item.render()
                            ) : (
                                <>
                                    {item.icons?.[0] ? (
                                        <img
                                            className={styles.menuIcon}
                                            src={item.icons[0].src}
                                            alt=""
                                        />
                                    ) : (
                                        <Icon name={fallbackIcon} size="xs" />
                                    )}
                                    <span className={styles.menuItemLabel}>{item.label}</span>
                                    {item.description && (
                                        <span className={styles.menuItemDescription}>
                                            {item.description}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>,
        portalRoot,
    );
};

TriggerMenu.displayName = 'TriggerMenu';
