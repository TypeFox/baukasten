import React from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import { useDensity, type Density } from '../../density';
import { ENTRY_KINDS, type EntryKind } from '../../types';
import type { TranscriptFilterState } from '../../transcriptView';
import * as styles from './TranscriptFilter.css';

const KIND_ICONS: Record<string, CodiconName> = {
    message: 'comment',
    thought: 'sparkle',
    tool: 'tools',
    plan: 'checklist',
    approval: 'shield',
    'input-required': 'question',
};

const KIND_LABELS: Record<string, string> = {
    message: 'Messages',
    thought: 'Thinking',
    tool: 'Tool calls',
    plan: 'Plan',
    approval: 'Approvals',
    'input-required': 'Input',
};

export interface TranscriptFilterProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange'
> {
    value: TranscriptFilterState;
    onChange: (value: TranscriptFilterState) => void;
    /** How many entries each kind has, from `countByKind`. */
    counts?: Readonly<Record<string, number>>;
    /**
     * Kinds offered as toggles.
     *
     * Defaults to the built-ins. A consumer with their own entry kinds passes
     * them here — the transcript renders custom kinds, so filtering has to
     * reach them too.
     */
    kinds?: readonly EntryKind[];
    /** Collapse-all and expand-all, when the host can honour them. */
    onCollapseAll?: () => void;
    onExpandAll?: () => void;
    density?: Density;
    /** @default 'Filter' */
    searchLabel?: string;
}

/**
 * The affordances a log view has and a chat transcript does not.
 *
 * Hide tool calls, show only edits, show only what needs attention, search,
 * collapse everything. Nobody asks for these — they are simply present in the
 * output panel next to this one, and their absence makes the transcript feel
 * worse than it without anyone being able to say why.
 *
 * Filtering happens on the entry list, upstream of the transcript, so it
 * composes with windowing rather than fighting it. See `filterEntries`.
 *
 * @example
 * ```tsx
 * const [filter, setFilter] = useState<TranscriptFilterState>({});
 * const visible = filterEntries(entries, filter);
 *
 * <TranscriptFilter value={filter} onChange={setFilter} counts={countByKind(entries)} />
 * <Transcript entries={visible} />
 * ```
 */
export const TranscriptFilter: React.FC<TranscriptFilterProps> = ({
    value,
    onChange,
    counts,
    kinds = ENTRY_KINDS,
    onCollapseAll,
    onExpandAll,
    density: densityProp,
    searchLabel = 'Filter',
    className,
    ...props
}) => {
    const density = useDensity(densityProp);

    const shown = (kind: EntryKind) => !value.kinds || value.kinds.includes(kind);

    const toggleKind = (kind: EntryKind) => {
        // No explicit list means everything is on, so the first click turns one
        // *off* rather than making it the only one — which is what a row of
        // pressed toggles implies and what surprises people otherwise.
        const current = value.kinds ?? kinds;
        const next = current.includes(kind)
            ? current.filter((candidate) => candidate !== kind)
            : [...current, kind];

        onChange({ ...value, kinds: next.length === kinds.length ? undefined : next });
    };

    return (
        <div
            className={clsx(styles.bar({ density }), className)}
            role="toolbar"
            aria-label="Transcript filters"
            {...props}
        >
            <div className={styles.search}>
                <Icon name="search" size="xs" className={styles.searchIcon} />
                <input
                    className={styles.input}
                    value={value.text ?? ''}
                    placeholder={searchLabel}
                    aria-label={searchLabel}
                    onChange={(event) =>
                        onChange({ ...value, text: event.target.value || undefined })
                    }
                />
            </div>

            <div className={styles.toggles}>
                {kinds.map((kind) => {
                    const count = counts?.[kind];
                    const on = shown(kind);

                    return (
                        <button
                            key={kind}
                            type="button"
                            className={styles.toggle({ on })}
                            aria-pressed={on}
                            // The count belongs in the accessible name: at
                            // compact density the label is an icon alone, and
                            // "Tool calls" with no number is less than a
                            // sighted user gets from the same control.
                            aria-label={
                                count === undefined
                                    ? (KIND_LABELS[kind] ?? kind)
                                    : `${KIND_LABELS[kind] ?? kind} (${count})`
                            }
                            title={KIND_LABELS[kind] ?? kind}
                            onClick={() => toggleKind(kind)}
                        >
                            <Icon name={KIND_ICONS[kind] ?? 'circle-filled'} size="xs" />
                            {density === 'comfortable' && (
                                <span className={styles.toggleLabel}>
                                    {KIND_LABELS[kind] ?? kind}
                                </span>
                            )}
                            {count !== undefined && (
                                <span className={styles.count} aria-hidden="true">
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className={styles.toggle({ on: Boolean(value.problemsOnly) })}
                aria-pressed={Boolean(value.problemsOnly)}
                aria-label="Only what needs attention"
                title="Only what needs attention"
                onClick={() => onChange({ ...value, problemsOnly: !value.problemsOnly })}
            >
                <Icon name="warning" size="xs" />
            </button>

            {(onCollapseAll || onExpandAll) && (
                <div className={styles.group}>
                    {onCollapseAll && (
                        <button
                            type="button"
                            className={styles.action}
                            aria-label="Collapse all"
                            title="Collapse all"
                            onClick={onCollapseAll}
                        >
                            <Icon name="collapse-all" size="xs" />
                        </button>
                    )}
                    {onExpandAll && (
                        <button
                            type="button"
                            className={styles.action}
                            aria-label="Expand all"
                            title="Expand all"
                            onClick={onExpandAll}
                        >
                            <Icon name="expand-all" size="xs" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

TranscriptFilter.displayName = 'TranscriptFilter';
