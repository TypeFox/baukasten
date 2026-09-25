import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Icon } from '../../../components/Icon';
import { renderEntry, type TranscriptRenderers } from '../../renderers';
import type { TranscriptEntry } from '../../types';
import { useDensity, type Density } from '../../density';
import { ExpansionProvider, useExpansionContext, useExpansionStore } from '../../expansion';
import { undoneAfter, type Mark } from '../../transcriptView';
import { OverviewRuler } from './OverviewRuler';
import { useStickToBottom } from './useStickToBottom';
import * as styles from './Transcript.css';

export interface TranscriptProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    entries: readonly TranscriptEntry[];
    /** Renderers by entry kind. Unregistered kinds fall back rather than break. */
    renderers?: TranscriptRenderers;
    /** Shown when there is nothing yet. */
    empty?: React.ReactNode;
    /** Label for the jump affordance. @default 'Jump to latest' */
    jumpLabel?: string;
    /**
     * Accessible name for the log region.
     * @default 'Conversation'
     */
    label?: string;
    /** Pixels from the bottom that still count as following. @default 32 */
    threshold?: number;
    /**
     * Entry count above which the list is windowed.
     *
     * Off below the threshold on purpose. Virtualising a short transcript costs
     * a measurement pass and an absolutely-positioned layout to save nothing,
     * and it is the layout that makes entries harder to style and copy out of.
     *
     * @default 80
     */
    virtualizeThreshold?: number;
    /**
     * Starting height guess per entry, before anything is measured.
     *
     * Entries here are variable-height *and grow while streaming*, so every row
     * is measured rather than assumed — this only decides how wrong the
     * scrollbar is for the first frame.
     *
     * @default 96
     */
    estimatedEntryHeight?: number;
    /**
     * Marks down the edge, from `marksFor(entries)`.
     *
     * Supplied rather than derived here so the caller decides what is worth
     * marking — and so the marks can describe the *whole* session while the
     * list itself is filtered.
     */
    marks?: readonly Mark[];
    /** Ruler selection and error navigation both land here. */
    onNavigate?: (entryId: string) => void;
    /**
     * The last entry that survives a rewind. Everything after it is dimmed.
     *
     * Presentation only. What restoring does to a working tree, the model
     * context or a server is the application's business — this shows which
     * entries are affected, keeps them readable so the user can change their
     * mind, and takes them out of the tab order because a control inside an
     * undone entry has nothing left to act on.
     */
    checkpointId?: string | null;
    density?: Density;
}

/**
 * The scrolling conversation.
 *
 * Owns two things that every agent UI reimplements and most get wrong.
 *
 * **Following output without fighting the reader.** It stays at the bottom
 * while the reader is there, releases the moment they scroll away, and offers
 * a way back rather than dragging them. See {@link useStickToBottom} for why
 * the obvious version is worse than it looks.
 *
 * **Rendering entries it does not know about.** Entry kinds are resolved
 * through a renderer map, not a switch, so an application can register its own
 * kind and inherit everything here. An unregistered kind renders a fallback
 * instead of throwing or vanishing.
 *
 * Marked `role="log"` rather than `aria-live`: a log region announces additions
 * without re-reading what came before, which is the difference between a
 * screen reader being useful during a long run and being unbearable.
 *
 * **It sizes itself as a flex item.** The root is `flex: 1` with
 * `min-height: 0`, because the normal arrangement is a column with a filter bar
 * above and a composer below, and this takes what is left. The consequence is
 * that its parent must be a flex container — dropped into a plain block with a
 * fixed height, `flex: 1` is ignored, the transcript falls back to content
 * height, and it overflows without ever scrolling. That failure is silent, so
 * it is worth stating:
 *
 * ```tsx
 * <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
 *   <TranscriptFilter … />
 *   <Transcript … />
 *   <Composer …>…</Composer>
 * </div>
 * ```
 *
 * Expansion state for the rows is held here rather than in them, since
 * windowing unmounts a row that scrolls out of the overscan window. Provide an
 * {@link ExpansionProvider} above this component when something outside it —
 * a collapse-all control in a filter bar — needs the same state.
 *
 * @example
 * ```tsx
 * const { entries } = useTranscript();
 *
 * <Transcript
 *   entries={entries}
 *   renderers={{
 *     message: ({ entry }) => <Message entry={entry} />,
 *     tool: ({ entry }) => <ToolCall entry={entry} />,
 *   }}
 * />
 * ```
 */
export const Transcript: React.FC<TranscriptProps> = ({
    entries,
    renderers = {},
    empty,
    jumpLabel = 'Jump to latest',
    label = 'Conversation',
    threshold = 32,
    virtualizeThreshold = 80,
    estimatedEntryHeight = 96,
    marks,
    onNavigate,
    checkpointId,
    density: densityProp,
    className,
    ...props
}) => {
    const density = useDensity(densityProp);
    const undone = useMemo(() => undoneAfter(entries, checkpointId), [entries, checkpointId]);

    /**
     * Expansion lives above the rows, because windowing unmounts them.
     *
     * A store supplied from higher up wins — a collapse-all button in a filter
     * bar sits outside this component and needs to reach the same state. When
     * there is none we own one, so the common case fixes itself with no change
     * at the call site. The hook runs either way; only the value passed down
     * changes.
     */
    const inheritedExpansion = useExpansionContext();
    const ownExpansion = useExpansionStore();
    const expansion = inheritedExpansion ?? ownExpansion;
    const { containerRef, contentRef, isPinned, scrollToBottom } = useStickToBottom<HTMLDivElement>(
        {
            threshold,
            dependency: entries,
        },
    );

    // How much arrived while the reader was away. Reset on return, so the
    // count answers "what have I missed" rather than "how long is this".
    const [missed, setMissed] = useState(0);
    const lastCount = useRef(entries.length);

    useEffect(() => {
        const grew = entries.length - lastCount.current;
        lastCount.current = entries.length;

        if (isPinned) {
            setMissed(0);
        } else if (grew > 0) {
            setMissed((count) => count + grew);
        }
    }, [entries.length, isPinned]);

    const windowed = entries.length > virtualizeThreshold;

    // Hooks cannot be called conditionally, so the virtualizer always exists
    // and is simply given nothing to do below the threshold.
    const virtualizer = useVirtualizer({
        count: windowed ? entries.length : 0,
        getScrollElement: () => containerRef.current,
        estimateSize: () => estimatedEntryHeight,
        getItemKey: (index) => entries[index].id,
        overscan: 8,
    });

    /**
     * The rows to draw, in one shape whichever layout is in force.
     *
     * Both branches must render the same element type under the same key, or
     * React treats every row as new when the threshold is crossed — and
     * crossing it happens mid-run, unannounced, at entry 81. That destroyed
     * every row's local state at once: expanded tool bodies, open thoughts and
     * expanded arguments all snapped shut with no user action.
     */
    const rows = windowed
        ? virtualizer.getVirtualItems().map((item) => ({
              entry: entries[item.index],
              index: item.index,
              start: item.start,
          }))
        : entries.map((entry, index) => ({ entry, index, start: 0 }));

    /**
     * Brings an entry into view, however the list is currently laid out.
     *
     * Two paths because the windowed one has no element to scroll to until the
     * virtualizer has been told to produce it.
     */
    const scrollToEntry = (entryId: string) => {
        const index = entries.findIndex((entry) => entry.id === entryId);
        if (index === -1) return;

        onNavigate?.(entryId);

        if (windowed) {
            virtualizer.scrollToIndex(index, { align: 'center' });
            return;
        }

        containerRef.current
            ?.querySelector(`[data-entry-id="${CSS.escape(entryId)}"]`)
            ?.scrollIntoView?.({ block: 'center' });
    };

    return (
        <ExpansionProvider store={expansion}>
            <div className={clsx(styles.transcript({ density }), className)} {...props}>
                <div className={styles.body}>
                    <div
                        ref={containerRef}
                        className={styles.scroll}
                        role="log"
                        aria-label={label}
                        // A transcript of plain messages contains nothing focusable,
                        // so without this the scroll container could not be reached
                        // by keyboard at all and long output was pointer-only.
                        // WCAG 2.1.1.
                        tabIndex={0}
                        // Additions only. The default `aria-relevant` includes text
                        // changes, and this region is full of streaming text — so a
                        // screen reader re-announced a message on every chunk,
                        // which during a long response is continuous noise.
                        aria-relevant="additions"
                        // The whole region is not a unit: a new entry should be
                        // announced, not the entries around it re-read.
                        aria-atomic="false"
                    >
                        {entries.length === 0 && empty ? (
                            <div className={styles.empty}>{empty}</div>
                        ) : (
                            <div
                                ref={contentRef}
                                className={windowed ? styles.virtualContent : styles.content}
                                style={
                                    windowed ? { height: virtualizer.getTotalSize() } : undefined
                                }
                            >
                                {rows.map(({ entry, index, start }) => {
                                    const isUndone = undone.has(entry.id);

                                    return (
                                        <div
                                            key={entry.id}
                                            // Measured rather than estimated: entries grow
                                            // while they stream, so a cached height is
                                            // wrong within a frame of being taken.
                                            ref={windowed ? virtualizer.measureElement : undefined}
                                            data-index={index}
                                            data-entry-id={entry.id}
                                            data-undone={isUndone || undefined}
                                            // Out of the tab order, not hidden: the
                                            // user has to be able to read what a
                                            // rewind would undo in order to change
                                            // their mind about it, but a control
                                            // inside an undone entry has nothing
                                            // left to act on.
                                            inert={isUndone ? true : undefined}
                                            className={clsx(
                                                windowed ? styles.virtualRow : styles.row,
                                                isUndone && styles.undone,
                                            )}
                                            style={
                                                windowed
                                                    ? { transform: `translateY(${start}px)` }
                                                    : undefined
                                            }
                                        >
                                            {renderEntry(renderers, {
                                                entry,
                                                index,
                                                isLast: index === entries.length - 1,
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {marks && marks.length > 0 && (
                        <OverviewRuler marks={marks} onSelect={scrollToEntry} />
                    )}
                </div>

                {!isPinned && (
                    <button
                        type="button"
                        className={styles.jumpToLatest}
                        onClick={() => scrollToBottom('smooth')}
                    >
                        <Icon name="arrow-down" size="xs" />
                        {jumpLabel}
                        {missed > 0 && ` (${missed})`}
                    </button>
                )}
            </div>
        </ExpansionProvider>
    );
};

Transcript.displayName = 'Transcript';
