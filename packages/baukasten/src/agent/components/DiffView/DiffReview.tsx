import React from 'react';
import { Approval } from '../Approval';
import type { ApprovalDecision, ApprovalEntry, ApprovalSeverity } from '../../types';
import { DiffView, type DiffViewProps } from './DiffView';

export interface DiffReviewProps extends Omit<DiffViewProps, 'actions'> {
    /**
     * The decision being asked for, carrying its own options and resolved state.
     *
     * A diff review *is* an approval whose summary happens to be a diff, so it
     * reuses {@link Approval} rather than growing a parallel set of buttons.
     * Two consent surfaces with different keyboard behaviour and different
     * resolved states is a worse outcome than one slightly more general
     * component — the user meets both in the same session and finds them
     * inconsistent.
     */
    entry: ApprovalEntry;
    severity?: ApprovalSeverity;
    onDecide?: (decision: ApprovalDecision) => void;
    /** Keyboard shortcuts on the approval. @default true */
    keyboard?: boolean;
}

/**
 * Accept or reject a proposed change.
 *
 * The diff above, the decision below, sharing the approval machinery so that
 * shortcuts, scopes and the persisted outcome behave exactly as they do
 * everywhere else a permission is granted.
 *
 * @example
 * ```tsx
 * <DiffReview
 *   path="src/uploader.ts"
 *   original={before}
 *   modified={after}
 *   entry={approvalEntry}
 *   onDecide={resolve}
 * />
 * ```
 */
export const DiffReview: React.FC<DiffReviewProps> = ({
    entry,
    severity,
    onDecide,
    keyboard,
    className,
    id,
    style,
    ...diffProps
}) => (
    /*
     * The root takes the identity props, the diff takes the diff props.
     *
     * Everything used to be spread into `DiffView`, so styling "the review
     * card" styled the diff box inside it, and `id`, `style`, `data-testid` and
     * `onClick` all landed on the wrong element too — silently, because they
     * are valid there. Every other component in the library puts
     * `clsx(styles.x, className)` on its own root.
     */
    <div className={className} id={id} style={style}>
        <DiffView {...diffProps} />
        <Approval entry={entry} severity={severity} onDecide={onDecide} keyboard={keyboard} />
    </div>
);

DiffReview.displayName = 'DiffReview';
