import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { useDensity, type Density } from '../../density';
import type { ApprovalDecision } from '../../types';
import { DiffStatText, DiffView } from './DiffView';
import { diffLines, diffStats, type DiffStats } from './diff';
import * as styles from './SessionChanges.css';

/**
 * One file the run touched.
 *
 * `original` and `modified` rather than a pre-computed diff, because the stat
 * and the rendered hunks have to agree and computing them from one source is
 * the only way to guarantee that.
 */
export interface SessionChange {
    readonly path: string;
    readonly original: string;
    readonly modified: string;
    /** Unresolved until the user says otherwise. */
    readonly decision?: ApprovalDecision;
}

export interface SessionChangesProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSelect'
> {
    changes: readonly SessionChange[];
    /**
     * Per-file decision.
     *
     * The same {@link ApprovalDecision} `DiffReview` and `Approval` produce,
     * rather than a second resolution model — a user meets all three in one
     * session and finding them inconsistent is worse than any of them being
     * individually imperfect.
     */
    onDecide?: (path: string, decision: ApprovalDecision) => void;
    /** Accept or reject everything still undecided. */
    onDecideAll?: (decision: ApprovalDecision) => void;
    density?: Density;
    /** @default 'Accept' */
    acceptLabel?: string;
    /** @default 'Reject' */
    rejectLabel?: string;
    empty?: React.ReactNode;
}

function decide(outcome: 'allow' | 'deny'): ApprovalDecision {
    return {
        optionId: outcome === 'allow' ? 'accept' : 'reject',
        outcome,
        // Always `once`. The scope union requires a ServerId for the persistent
        // levels precisely so that a standing grant cannot be minted without
        // one — and there is no meaningful standing decision for "this file,
        // forever" anyway.
        scope: { level: 'once' },
    };
}

/**
 * Everything the run changed, in one place.
 *
 * A run accumulates edits across many tool calls, and reviewing them a tool
 * card at a time is the wrong granularity: nobody wants to approve hunk 3 of 7
 * in a diff they will meet again two entries later. The unit people actually
 * review is *the changeset*.
 *
 * Files start collapsed with their stat visible, because the first question is
 * "what did it touch" and the second is "show me that one" — opening seven
 * diffs to answer the first is how this surface becomes unusable in a real run.
 *
 * @example
 * ```tsx
 * <SessionChanges
 *   changes={changes}
 *   onDecide={(path, decision) => apply(path, decision)}
 *   onDecideAll={(decision) => applyAll(decision)}
 * />
 * ```
 */
export const SessionChanges: React.FC<SessionChangesProps> = ({
    changes,
    onDecide,
    onDecideAll,
    density: densityProp,
    acceptLabel = 'Accept',
    rejectLabel = 'Reject',
    empty,
    className,
    ...props
}) => {
    const density = useDensity(densityProp);
    const [open, setOpen] = useState<ReadonlySet<string>>(new Set());

    const stats = useMemo(() => {
        const perFile = new Map<string, DiffStats>();
        let added = 0;
        let removed = 0;

        for (const change of changes) {
            // Computed from the same lines the expanded view renders, so the
            // stat and the hunks can never disagree.
            const stat = diffStats(diffLines(change.original, change.modified));
            perFile.set(change.path, stat);
            added += stat.added;
            removed += stat.removed;
        }

        return { perFile, total: { added, removed } };
    }, [changes]);

    const undecided = changes.filter((change) => change.decision === undefined);

    if (changes.length === 0) {
        return empty ? <div className={clsx(styles.empty, className)}>{empty}</div> : null;
    }

    return (
        <div className={clsx(styles.changes({ density }), className)} {...props}>
            <div className={styles.header}>
                <Icon name="diff" size="sm" />
                <span className={styles.title}>
                    {changes.length} {changes.length === 1 ? 'file changed' : 'files changed'}
                </span>
                <DiffStatText stats={stats.total} />
            </div>

            {onDecideAll && undecided.length > 0 && (
                <div className={styles.actions}>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onDecideAll(decide('allow'))}
                    >
                        <Icon name="check" size="xs" />
                        {acceptLabel} all ({undecided.length})
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onDecideAll(decide('deny'))}
                    >
                        <Icon name="discard" size="xs" />
                        {rejectLabel} all
                    </Button>
                </div>
            )}

            <ul className={styles.files}>
                {changes.map((change) => {
                    const stat = stats.perFile.get(change.path) ?? { added: 0, removed: 0 };
                    const expanded = open.has(change.path);
                    const outcome = change.decision?.outcome;

                    return (
                        <li key={change.path} className={styles.file} data-outcome={outcome}>
                            <div className={styles.fileRow}>
                                <button
                                    type="button"
                                    className={styles.disclosure}
                                    aria-expanded={expanded}
                                    onClick={() =>
                                        setOpen((current) => {
                                            const next = new Set(current);
                                            if (next.has(change.path)) next.delete(change.path);
                                            else next.add(change.path);
                                            return next;
                                        })
                                    }
                                >
                                    <Icon
                                        name={expanded ? 'chevron-down' : 'chevron-right'}
                                        size="xs"
                                    />
                                    {/* `direction: rtl` in the stylesheet keeps
                                        the filename visible when a long path
                                        ellipsises. */}
                                    <span className={styles.path} title={change.path}>
                                        {change.path}
                                    </span>
                                </button>

                                <DiffStatText stats={stat} />

                                {outcome ? (
                                    <span className={styles.outcome}>
                                        <Icon
                                            name={outcome === 'allow' ? 'check' : 'close'}
                                            size="xs"
                                        />
                                        {outcome === 'allow' ? acceptLabel : rejectLabel}
                                    </span>
                                ) : (
                                    onDecide && (
                                        <span className={styles.fileActions}>
                                            <button
                                                type="button"
                                                className={styles.fileAction}
                                                aria-label={`${acceptLabel} ${change.path}`}
                                                onClick={() =>
                                                    onDecide(change.path, decide('allow'))
                                                }
                                            >
                                                <Icon name="check" size="xs" />
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.fileAction}
                                                aria-label={`${rejectLabel} ${change.path}`}
                                                onClick={() =>
                                                    onDecide(change.path, decide('deny'))
                                                }
                                            >
                                                <Icon name="close" size="xs" />
                                            </button>
                                        </span>
                                    )
                                )}
                            </div>

                            {expanded && (
                                <div className={styles.diff}>
                                    <DiffView
                                        path={change.path}
                                        original={change.original}
                                        modified={change.modified}
                                    />
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

SessionChanges.displayName = 'SessionChanges';
