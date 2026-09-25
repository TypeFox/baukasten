import React from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import type { PlanEntry, PlanItemStatus } from '../../types';
import * as styles from './Plan.css';

const STATUS_ICONS: Record<PlanItemStatus, CodiconName> = {
    pending: 'circle-outline',
    active: 'chevron-right',
    done: 'pass-filled',
};

export interface PlanProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    entry: PlanEntry;
    /**
     * Heading above the list.
     *
     * Named `titleLabel` rather than `title`, which it used to be. Both this
     * and the DOM's `title` are `string | undefined`, so the old name compiled
     * perfectly while silently swallowing the native tooltip — and left no way
     * to set one. It was also the only text override among thirteen not to
     * follow the `*Label` convention.
     *
     * @default 'Plan'
     */
    titleLabel?: string;
    /** Shows a done/total count in the header. @default true */
    showProgress?: boolean;
}

/**
 * The agent's plan, as a checklist that changes under you.
 *
 * The mutation is the point. The transcript reducer revises a plan in place
 * rather than appending a new entry, so this renders one list that ticks off
 * and grows as the run proceeds. A plan appended on every revision is just a
 * log of stale plans, and the current one scrolls away exactly when it becomes
 * useful.
 *
 * Finished steps stay, struck through — see the recipe for why removing them
 * makes a long plan worse.
 *
 * @example
 * ```tsx
 * <Plan entry={entry} />
 * ```
 */
export const Plan: React.FC<PlanProps> = ({
    entry,
    titleLabel = 'Plan',
    showProgress = true,
    className,
    ...props
}) => {
    const done = entry.items.filter((item) => item.status === 'done').length;

    return (
        <div className={clsx(styles.plan, className)} {...props}>
            <div className={styles.header}>
                <Icon name="checklist" size="xs" />
                {titleLabel}
                {showProgress && entry.items.length > 0 && (
                    <span className={styles.count}>
                        {done}/{entry.items.length}
                    </span>
                )}
            </div>

            <ul className={styles.list}>
                {entry.items.map((item) => (
                    <li key={item.id} className={styles.item({ status: item.status })}>
                        <span className={styles.itemIcon({ status: item.status })}>
                            <Icon name={STATUS_ICONS[item.status] ?? 'circle-outline'} size="xs" />
                        </span>

                        <span className={styles.itemText}>{item.text}</span>

                        {item.priority === 'high' && item.status !== 'done' && (
                            <Icon
                                name="arrow-up"
                                size="xs"
                                className={styles.priority}
                                aria-label="High priority"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Plan.displayName = 'Plan';
