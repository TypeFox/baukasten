import { useCallback, useMemo, useState } from 'react';
import { marksFor, nextMark, type Mark, type MarkKind } from './transcriptView';
import type { TranscriptEntry } from './types';

export interface UseMarkNavigationOptions {
    /**
     * Which marks the next/previous controls step through.
     *
     * Defaults to failures only, because "jump to the next problem" is the
     * request — stepping through every edit as well turns one keystroke into
     * twenty in a run that edited twenty files.
     */
    readonly kinds?: readonly MarkKind[];
}

export interface UseMarkNavigationReturn {
    /** Every mark in the session, for a ruler. */
    readonly marks: readonly Mark[];
    /** The subset the controls step through. */
    readonly navigable: readonly Mark[];
    readonly activeEntryId: string | undefined;
    readonly goNext: () => Mark | undefined;
    readonly goPrevious: () => Mark | undefined;
    /** Call when navigation lands somewhere, including from the ruler. */
    readonly setActive: (entryId: string) => void;
}

const DEFAULT_KINDS: readonly MarkKind[] = ['failure', 'protocol-failure', 'blocked'];

/**
 * Stepping between the moments in a session that need a person.
 *
 * The ruler shows everything; the next/previous controls step through the
 * subset worth stopping at. Those are different questions and conflating them
 * gives you either a ruler that hides edits or a "next problem" button that
 * stops on all of them.
 *
 * @example
 * ```tsx
 * const nav = useMarkNavigation(entries);
 *
 * <Transcript entries={entries} marks={nav.marks} onNavigate={nav.setActive} />
 * <button onClick={() => nav.goNext()}>Next problem</button>
 * ```
 */
export function useMarkNavigation(
    entries: readonly TranscriptEntry[],
    options: UseMarkNavigationOptions = {},
): UseMarkNavigationReturn {
    const { kinds = DEFAULT_KINDS } = options;

    const marks = useMemo(() => marksFor(entries), [entries]);
    const navigable = useMemo(
        () => marks.filter((mark) => kinds.includes(mark.kind)),
        [marks, kinds],
    );

    const [activeEntryId, setActiveEntryId] = useState<string | undefined>(undefined);

    const currentIndex = useMemo(() => {
        if (!activeEntryId) return -1;
        return entries.findIndex((entry) => entry.id === activeEntryId);
    }, [entries, activeEntryId]);

    const step = useCallback(
        (direction: 1 | -1) => {
            const mark = nextMark(navigable, currentIndex, direction);
            if (mark) setActiveEntryId(mark.entryId);
            return mark;
        },
        [navigable, currentIndex],
    );

    return useMemo(
        () => ({
            marks,
            navigable,
            activeEntryId,
            goNext: () => step(1),
            goPrevious: () => step(-1),
            setActive: setActiveEntryId,
        }),
        [marks, navigable, activeEntryId, step],
    );
}
