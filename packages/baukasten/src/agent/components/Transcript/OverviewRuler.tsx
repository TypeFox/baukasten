import React from 'react';
import clsx from 'clsx';
import type { Mark, MarkKind } from '../../transcriptView';
import * as styles from './OverviewRuler.css';

const MARK_LABELS: Record<MarkKind, string> = {
    failure: 'Failed',
    'protocol-failure': 'Protocol error',
    blocked: 'Waiting for you',
    approval: 'Permission requested',
    edit: 'Edit',
};

export interface OverviewRulerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    marks: readonly Mark[];
    /** Called with the entry to scroll to. */
    onSelect?: (entryId: string) => void;
    /** Highlighted, when navigation has landed somewhere. */
    activeEntryId?: string;
    /** @default 'Session overview' */
    label?: string;
}

/**
 * Where the interesting moments are, down the edge of the session.
 *
 * A straight lift of the editor idiom into a surface that needs it badly: in a
 * two-hundred-entry run the moments worth looking at are a handful of points,
 * and the current answer is scrolling until you find them.
 *
 * Failures are split by scope rather than drawn alike, following the error
 * taxonomy — a tool that ran and reported a problem is usually something the
 * agent routed around, while a protocol error generally stopped the run. Making
 * both the same mark would mean scrolling to a dozen recovered errors to find
 * the one that mattered.
 *
 * Each mark is a real button, so the ruler is usable by keyboard. A decorative
 * strip that only responds to a click on a four-pixel target is not navigation.
 *
 * @example
 * ```tsx
 * <OverviewRuler marks={marksFor(entries)} onSelect={scrollToEntry} />
 * ```
 */
export const OverviewRuler: React.FC<OverviewRulerProps> = ({
    marks,
    onSelect,
    activeEntryId,
    label = 'Session overview',
    className,
    ...props
}) => (
    <div className={clsx(styles.ruler, className)} role="group" aria-label={label} {...props}>
        {marks.map((mark) => (
            <button
                key={`${mark.entryId}:${mark.kind}`}
                type="button"
                className={styles.mark({
                    kind: mark.kind,
                    active: mark.entryId === activeEntryId,
                })}
                style={{ top: `${mark.at * 100}%` }}
                aria-label={`${MARK_LABELS[mark.kind]} — entry ${mark.index + 1}`}
                aria-current={mark.entryId === activeEntryId ? 'true' : undefined}
                onClick={() => onSelect?.(mark.entryId)}
            />
        ))}
    </div>
);

OverviewRuler.displayName = 'OverviewRuler';
