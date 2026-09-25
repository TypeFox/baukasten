/**
 * Reading a transcript as a log rather than a conversation.
 *
 * Filtering, the marks an overview ruler draws, and what a checkpoint means —
 * all pure, all derived from the entry list, so the behaviour is testable with
 * no DOM and the same derivation serves the ruler, the filter bar and the
 * navigation.
 *
 * The framing behind the whole module: an agent session is a **log**. The
 * people using this are sitting in an editor next to an output panel that
 * already filters, collapses and lets you jump between problems. They will not
 * think to ask the transcript for those; they will simply find it worse than
 * the panel beside it.
 */

import {
    isApprovalEntry,
    isInputRequiredEntry,
    isMessageEntry,
    isToolEntry,
    type EntryKind,
    type TranscriptEntry,
} from './types';

export interface TranscriptFilterState {
    /**
     * Kinds to show. Absent means all of them.
     *
     * A set rather than a list of hidden kinds, because "show only edits" is
     * the request people actually make and expressing it as "hide everything
     * except" reads backwards at every call site.
     */
    readonly kinds?: readonly EntryKind[];
    /** Free text over the entry's visible content. */
    readonly text?: string;
    /** Show only entries that failed or need attention. */
    readonly problemsOnly?: boolean;
}

/** The text a filter searches, per kind. Not the whole entry — ids are noise. */
function searchableText(entry: TranscriptEntry): string {
    if (isMessageEntry(entry)) return entry.text;
    if (isToolEntry(entry)) {
        return [entry.tool.title, entry.tool.target, entry.tool.error?.message]
            .filter(Boolean)
            .join(' ');
    }
    if (isApprovalEntry(entry)) {
        return [entry.request.title, entry.request.description].filter(Boolean).join(' ');
    }
    if (entry.kind === 'thought' && 'text' in entry) return String(entry.text);
    if (entry.kind === 'plan' && 'items' in entry) {
        return (entry.items as readonly { text: string }[]).map((item) => item.text).join(' ');
    }
    return entry.kind;
}

/**
 * Does this entry need a person?
 *
 * Three different things, deliberately grouped: something failed, something is
 * waiting for a decision, something is waiting for input. From the reader's
 * point of view they are one question — "where do I have to look?" — even
 * though they arrive by different routes.
 */
export function isProblem(entry: TranscriptEntry): boolean {
    if (isToolEntry(entry)) {
        return entry.tool.status === 'failed' || (entry.inputRequests?.length ?? 0) > 0;
    }
    if (isApprovalEntry(entry)) return entry.decision === undefined;
    if (isInputRequiredEntry(entry)) return entry.responses === undefined;
    if (isMessageEntry(entry)) return entry.delivery === 'failed';
    return false;
}

export function matchesFilter(entry: TranscriptEntry, filter: TranscriptFilterState): boolean {
    if (filter.kinds && !filter.kinds.includes(entry.kind)) return false;
    if (filter.problemsOnly && !isProblem(entry)) return false;

    if (filter.text) {
        const needle = filter.text.toLowerCase();
        if (!searchableText(entry).toLowerCase().includes(needle)) return false;
    }

    return true;
}

/** True when nothing is being filtered out. Lets a caller skip the work entirely. */
export function isEmptyFilter(filter: TranscriptFilterState): boolean {
    return !filter.kinds && !filter.text && !filter.problemsOnly;
}

/**
 * Applies a filter **before** virtualisation.
 *
 * That ordering is the requirement, not an optimisation: hiding rows the
 * virtualiser has already measured leaves it with wrong offsets and a scroll
 * extent that describes a list nobody can see.
 */
export function filterEntries(
    entries: readonly TranscriptEntry[],
    filter: TranscriptFilterState,
): readonly TranscriptEntry[] {
    if (isEmptyFilter(filter)) return entries;
    return entries.filter((entry) => matchesFilter(entry, filter));
}

/** How many entries each kind contributes, for a filter bar's counts. */
export function countByKind(entries: readonly TranscriptEntry[]): Readonly<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const entry of entries) counts[entry.kind] = (counts[entry.kind] ?? 0) + 1;
    return counts;
}

/**
 * What an overview ruler draws.
 *
 * `failure` and `blocked` are kept apart on purpose, following the error
 * taxonomy: a tool that ran and reported a problem is usually something the
 * agent routed around, while a protocol error generally stopped the run. One
 * of those is worth scrolling to and the other frequently is not, so they must
 * not be the same mark.
 */
export type MarkKind = 'failure' | 'protocol-failure' | 'blocked' | 'approval' | 'edit';

export interface Mark {
    readonly entryId: string;
    readonly index: number;
    readonly kind: MarkKind;
    /** Position down the session, 0–1, for a ruler to place it. */
    readonly at: number;
}

/** Edits are marked because "what did it change" is the other thing people scan for. */
const EDIT_KINDS = new Set(['edit', 'delete', 'move']);

export function marksFor(entries: readonly TranscriptEntry[]): readonly Mark[] {
    const marks: Mark[] = [];
    const total = Math.max(1, entries.length - 1);

    entries.forEach((entry, index) => {
        const at = entries.length === 1 ? 0 : index / total;
        const push = (kind: MarkKind) => marks.push({ entryId: entry.id, index, kind, at });

        if (isToolEntry(entry)) {
            if (entry.tool.status === 'failed') {
                push(entry.tool.error?.scope === 'protocol' ? 'protocol-failure' : 'failure');
            } else if ((entry.inputRequests?.length ?? 0) > 0) {
                push('blocked');
            } else if (EDIT_KINDS.has(String(entry.tool.kind))) {
                push('edit');
            }
            return;
        }

        if (isApprovalEntry(entry)) push('approval');
        else if (isInputRequiredEntry(entry) && entry.responses === undefined) push('blocked');
        else if (isMessageEntry(entry) && entry.delivery === 'failed') push('failure');
    });

    return marks;
}

/**
 * The next mark after a position, wrapping.
 *
 * Wrapping because the alternative is a button that stops working at the end of
 * the list, which reads as broken rather than as finished.
 */
export function nextMark(
    marks: readonly Mark[],
    fromIndex: number,
    direction: 1 | -1 = 1,
): Mark | undefined {
    if (marks.length === 0) return undefined;

    if (direction === 1) {
        return marks.find((mark) => mark.index > fromIndex) ?? marks[0];
    }

    const earlier = marks.filter((mark) => mark.index < fromIndex);
    return earlier[earlier.length - 1] ?? marks[marks.length - 1];
}

/**
 * Which entries a checkpoint has undone.
 *
 * Everything *after* the checkpointed entry, which stays. Returned as a set of
 * ids rather than an index so a caller can ask about one entry without knowing
 * its position — a renderer has the entry, not the list.
 *
 * The component owns the presentation of this and nothing else. What restoring
 * actually does to a working tree, the model context or a server is the
 * application's business, and differs enough between clients that anything more
 * opinionated here would be unusable.
 */
export function undoneAfter(
    entries: readonly TranscriptEntry[],
    checkpointId: string | null | undefined,
): ReadonlySet<string> {
    if (!checkpointId) return new Set();

    const at = entries.findIndex((entry) => entry.id === checkpointId);
    if (at === -1) return new Set();

    return new Set(entries.slice(at + 1).map((entry) => entry.id));
}
