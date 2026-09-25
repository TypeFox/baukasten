import React from 'react';
import { useExpansion } from '../../expansion';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import { Spinner } from '../../../components/Spinner';
import { ProgressBar } from '../../../components/ProgressBar';
import type { ToolEntry, ToolInvocation, ToolStatus } from '../../types';
import { visuallyHidden } from '../../a11y.css';
import { formatElapsed, useElapsed } from './useElapsed';
import * as styles from './ToolCall.css';

/**
 * Fallback icons for the kinds we know.
 *
 * Only reached when the source supplied none of its own — a server that ships
 * icons gets to use them, which is why the field exists.
 */
const KIND_ICONS: Record<string, CodiconName> = {
    read: 'file-code',
    edit: 'edit',
    delete: 'trash',
    move: 'arrow-both',
    search: 'search',
    execute: 'terminal',
    think: 'sparkle',
    fetch: 'cloud-download',
    switch_mode: 'settings',
    other: 'circle-filled',
};

/** Status in words, for the accessible name. */
const STATUS_TEXT: Record<string, string> = {
    pending: 'Pending',
    running: 'Running',
    completed: 'Completed',
    failed: 'Failed',
};

/**
 * Status as a glyph and a colour — plus a word, out of sight.
 *
 * `Icon` is unconditionally `aria-hidden`, which is right for decoration and
 * wrong here: without the text below, the header's accessible name was
 * byte-identical for a call that succeeded and one that failed. Someone not
 * seeing the red meant not knowing.
 */
function StatusIcon({ status }: { status: ToolStatus }) {
    const glyph = (() => {
        switch (status) {
            case 'running':
                return <Spinner size="xs" />;
            case 'completed':
                return <Icon name="pass-filled" size="xs" className={styles.statusDone} />;
            case 'failed':
                return <Icon name="error" size="xs" className={styles.statusFailed} />;
            default:
                return <Icon name="circle-filled" size="xs" className={styles.statusPending} />;
        }
    })();

    return (
        <>
            {glyph}
            <span className={visuallyHidden}>{STATUS_TEXT[status] ?? status}</span>
        </>
    );
}

function KindIcon({ tool }: { tool: ToolInvocation }) {
    const supplied = tool.icons?.[0];
    if (supplied) {
        return <img className={styles.serverIcon} src={supplied.src} alt="" aria-hidden="true" />;
    }

    return (
        <Icon
            name={KIND_ICONS[tool.kind] ?? KIND_ICONS.other}
            size="xs"
            className={styles.kindIcon}
        />
    );
}

export interface ToolCallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    entry: ToolEntry;
    /** The expanded body. Without it the card does not expand. */
    children?: React.ReactNode;
    /**
     * Last line of output, shown in the header while the call runs.
     *
     * The cheapest possible answer to "what is it doing right now", and the
     * difference between a card that looks stuck and one that looks busy.
     */
    tail?: string;
    /** Starts expanded. @default false */
    defaultExpanded?: boolean;
    /** Milliseconds a call must run before the elapsed readout appears. @default 3000 */
    elapsedAfterMs?: number;
}

/**
 * One tool call, collapsed to a row and expandable to its body.
 *
 * Three things here are easy to get wrong and are handled rather than left to
 * the caller.
 *
 * **All four statuses**, including `failed` — the demo this was derived from
 * knew only "spinner" and "green tick", which means a failed call looked
 * exactly like a pending one.
 *
 * **Long calls stay legible.** Past a threshold the header grows an elapsed
 * readout, and a `tail` shows the last line of output, so a call that has been
 * running for a minute says so instead of sitting silently.
 *
 * **Failures are not all the same.** An execution error — the tool ran and
 * reported a problem — is informational, because the agent will usually read
 * it and try something else. A protocol error is not, because it generally
 * means someone has to intervene. They are styled differently on purpose.
 *
 * @example
 * ```tsx
 * <ToolCall entry={entry} tail={lastLine}>
 *   <Code block>{output}</Code>
 * </ToolCall>
 * ```
 */
export const ToolCall: React.FC<ToolCallProps> = ({
    entry,
    children,
    tail,
    defaultExpanded = false,
    elapsedAfterMs = 3000,
    className,
    ...props
}) => {
    // Held above the row, keyed by entry id, so scrolling a windowed transcript
    // past this card and back does not silently collapse it. Falls back to
    // local state when there is no provider — a card rendered outside a
    // transcript still expands.
    const [expanded, toggleExpanded] = useExpansion(entry.id, defaultExpanded);
    const { tool, inputRequests } = entry;
    const running = tool.status === 'running';

    const elapsed = useElapsed({
        running,
        startedAt: tool.startedAt,
        appearAfterMs: elapsedAfterMs,
    });

    const expandable = Boolean(children);
    const showTail = running && Boolean(tail);

    return (
        <div
            className={clsx(
                styles.toolCall({ tone: tool.error?.scope === 'protocol' ? 'failed' : 'normal' }),
                className,
            )}
            data-status={tool.status}
            {...props}
        >
            <button
                type="button"
                className={styles.header}
                onClick={expandable ? toggleExpanded : undefined}
                disabled={!expandable}
                aria-expanded={expandable ? expanded : undefined}
            >
                <span className={styles.statusSlot}>
                    <StatusIcon status={tool.status} />
                </span>

                <KindIcon tool={tool} />
                <span className={styles.label}>{tool.title}</span>

                {showTail ? (
                    <span className={styles.tail}>{tail}</span>
                ) : tool.target ? (
                    <span className={styles.target} title={tool.target}>
                        {tool.target}
                    </span>
                ) : (
                    <span className={styles.spacer} />
                )}

                {elapsed !== null && (
                    <span className={styles.elapsed}>{formatElapsed(elapsed)}</span>
                )}

                {expandable && (
                    <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size="xs" />
                )}
            </button>

            {running && tool.progress && tool.progress.total ? (
                <div className={styles.progress}>
                    {/*
                     * ProgressBar takes a percentage, while progress arrives as
                     * a value against a total. Clamped because a source that
                     * reports more steps than it predicted should overflow into
                     * "done", not past the end of the track.
                     */}
                    <ProgressBar
                        value={Math.min(
                            100,
                            Math.max(0, (tool.progress.value / tool.progress.total) * 100),
                        )}
                        height="var(--bk-spacing-1)"
                        aria-label={tool.progress.message ?? `${tool.title} progress`}
                    />
                </div>
            ) : null}

            {tool.error && (
                <div className={styles.errorRow({ scope: tool.error.scope })}>
                    <Icon name={tool.error.scope === 'protocol' ? 'error' : 'warning'} size="xs" />
                    <span className={styles.errorText}>{tool.error.message}</span>
                </div>
            )}

            {inputRequests && inputRequests.length > 0 && (
                <div className={styles.errorRow({ scope: 'execution' })}>
                    <Icon name="question" size="xs" />
                    <span className={styles.errorText}>
                        Waiting for input before this can continue.
                    </span>
                </div>
            )}

            {expandable && expanded && <div className={styles.body}>{children}</div>}
        </div>
    );
};

ToolCall.displayName = 'ToolCall';
