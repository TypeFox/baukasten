import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import { diffLines, diffStats, toHunks, type DiffLine, type DiffStats } from './diff';
import * as styles from './DiffView.css';

const MARKERS: Record<DiffLine['op'], string> = {
    equal: ' ',
    insert: '+',
    delete: '-',
};

export interface DiffStatTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    stats: DiffStats;
}

/**
 * The `+N −N` readout.
 *
 * Its own component because it appears in at least three places — a diff
 * toolbar, a file list, a status bar — and the demo had to export a private
 * helper between files to keep them consistent, which is a component asking to
 * exist.
 */
export const DiffStatText: React.FC<DiffStatTextProps> = ({ stats, className, ...props }) => (
    <span className={clsx(styles.stat, className)} {...props}>
        <span className={styles.added}>+{stats.added}</span>{' '}
        <span className={styles.removed}>−{stats.removed}</span>
    </span>
);

DiffStatText.displayName = 'DiffStatText';

function Row({ line, showOld, showNew }: { line: DiffLine; showOld: boolean; showNew: boolean }) {
    return (
        <div className={styles.row({ op: line.op })}>
            {showOld && <span className={styles.gutter}>{line.oldNumber ?? ''}</span>}
            {showNew && <span className={styles.gutter}>{line.newNumber ?? ''}</span>}
            <span className={styles.marker}>{MARKERS[line.op]}</span>
            <span className={styles.lineText}>{line.text === '' ? ' ' : line.text}</span>
        </div>
    );
}

export interface DiffViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Left side. */
    original: string;
    /** Right side. */
    modified: string;
    /** Shown in the toolbar. */
    path?: string;
    /** Side-by-side instead of unified. @default false */
    split?: boolean;
    /** Unchanged lines kept around each change. @default 3 */
    context?: number;
    /** Extra toolbar content — accept and reject buttons, usually. */
    actions?: React.ReactNode;
}

/**
 * A proposed change, rendered without an editor.
 *
 * The demo could reach for Monaco because it already had an editor loaded; a
 * component library cannot, so the diff is computed in-package and rendered as
 * rows. That also means it works in a 300px side panel, which a hosted editor
 * does not.
 *
 * Long unchanged stretches are collapsed into hunks. An agent edit is three
 * hunks in a four-hundred-line file, and rendering all four hundred buries the
 * part being judged.
 *
 * @example
 * ```tsx
 * <DiffView path="src/uploader.ts" original={before} modified={after} />
 * ```
 */
export const DiffView: React.FC<DiffViewProps> = ({
    original,
    modified,
    path,
    split = false,
    context = 3,
    actions,
    className,
    ...props
}) => {
    const { hunks, stats } = useMemo(() => {
        const lines = diffLines(original, modified);
        return { hunks: toHunks(lines, context), stats: diffStats(lines) };
    }, [original, modified, context]);

    return (
        <div className={clsx(styles.diffView, className)} {...props}>
            <div className={styles.toolbar}>
                <Icon name="diff" size="xs" />
                {path && (
                    <span className={styles.path} title={path}>
                        {path}
                    </span>
                )}
                <DiffStatText stats={stats} />
                {actions}
            </div>

            {hunks.length === 0 ? (
                <div className={styles.empty}>No changes.</div>
            ) : (
                <div className={styles.scroll}>
                    {hunks.map((hunk, index) => (
                        <div key={index}>
                            <div className={styles.hunkHeader}>
                                @@ −{hunk.oldStart} +{hunk.newStart} @@
                            </div>

                            {split ? (
                                <div className={styles.split}>
                                    <div className={styles.side}>
                                        {hunk.lines
                                            .filter((line) => line.op !== 'insert')
                                            .map((line, at) => (
                                                <Row key={at} line={line} showOld showNew={false} />
                                            ))}
                                    </div>
                                    <div>
                                        {hunk.lines
                                            .filter((line) => line.op !== 'delete')
                                            .map((line, at) => (
                                                <Row key={at} line={line} showOld={false} showNew />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                hunk.lines.map((line, at) => (
                                    <Row key={at} line={line} showOld showNew />
                                ))
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DiffView.displayName = 'DiffView';
