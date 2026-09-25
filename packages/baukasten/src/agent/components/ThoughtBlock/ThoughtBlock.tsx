import React from 'react';
import { useExpansion } from '../../expansion';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import { StreamingText } from '../StreamingText';
import type { ThoughtEntry } from '../../types';
import * as styles from './ThoughtBlock.css';

export interface ThoughtBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    entry: ThoughtEntry;
    /** Starts expanded once settled. @default false */
    defaultExpanded?: boolean;
    /** Builds the collapsed summary. Default: "Thought for 1.4s", or "Thought". */
    summary?: (durationMs: number | undefined) => string;
}

function defaultSummary(durationMs: number | undefined): string {
    if (durationMs === undefined) return 'Thought';
    return `Thought for ${(durationMs / 1000).toFixed(1)}s`;
}

/**
 * Reasoning, live while it arrives and folded away once it has.
 *
 * Two distinct states rather than one collapsible block. While the model is
 * still thinking, this is the only thing happening in the transcript and it
 * shows in full behind a pulsing rail. Once it settles it becomes a one-line
 * summary, because reasoning is worth glancing at and rarely worth re-reading.
 *
 * @example
 * ```tsx
 * <ThoughtBlock entry={entry} />
 * ```
 */
export const ThoughtBlock: React.FC<ThoughtBlockProps> = ({
    entry,
    defaultExpanded = false,
    summary = defaultSummary,
    className,
    ...props
}) => {
    // Above the row, for the same reason as `ToolCall` — a thought opened and
    // then scrolled past in a windowed transcript should still be open.
    const [expanded, toggleExpanded] = useExpansion(entry.id, defaultExpanded);

    if (entry.streaming) {
        return (
            <div className={clsx(styles.live, className)} data-state="live" {...props}>
                <Icon name="sparkle" size="xs" className={styles.liveIcon} />
                <StreamingText className={styles.text} text={entry.text} streaming />
            </div>
        );
    }

    return (
        <div className={clsx(styles.settled, className)} data-state="settled" {...props}>
            <button
                type="button"
                className={styles.summary}
                onClick={toggleExpanded}
                aria-expanded={expanded}
            >
                <Icon name="sparkle" size="xs" className={styles.icon} />
                {summary(entry.durationMs)}
                <Icon name={expanded ? 'chevron-down' : 'chevron-right'} size="xs" />
            </button>

            {expanded && (
                <div className={styles.body}>
                    <div className={styles.text}>{entry.text}</div>
                </div>
            )}
        </div>
    );
};

ThoughtBlock.displayName = 'ThoughtBlock';
