import { describe, expect, it } from 'vitest';
import {
    countByKind,
    filterEntries,
    isEmptyFilter,
    isProblem,
    marksFor,
    matchesFilter,
    nextMark,
    undoneAfter,
} from './transcriptView';
import type { TranscriptEntry } from './types';

function message(id: string, text: string, extra: Partial<TranscriptEntry> = {}): TranscriptEntry {
    return {
        id,
        kind: 'message',
        role: 'agent',
        text,
        streaming: false,
        ...extra,
    } as TranscriptEntry;
}

function tool(id: string, overrides: Record<string, unknown> = {}): TranscriptEntry {
    return {
        id,
        kind: 'tool',
        tool: {
            correlationId: id,
            kind: 'read',
            title: 'Read',
            target: 'src/uploader.ts',
            status: 'completed',
            ...overrides,
        },
    } as TranscriptEntry;
}

const SESSION: TranscriptEntry[] = [
    message('m0', 'Add retries with backoff'),
    tool('t0'),
    tool('t1', { status: 'failed', error: { scope: 'execution', message: 'Index is cold' } }),
    tool('t2', { kind: 'edit', title: 'Edit' }),
    {
        id: 'a0',
        kind: 'approval',
        request: { id: 'run', title: 'Run the tests', options: [] },
    } as TranscriptEntry,
    tool('t3', { status: 'failed', error: { scope: 'protocol', message: 'Version mismatch' } }),
    message('m1', 'Done'),
];

describe('filtering (T-37)', () => {
    it('is a no-op when nothing is set, so a caller can skip the work', () => {
        expect(isEmptyFilter({})).toBe(true);
        expect(filterEntries(SESSION, {})).toBe(SESSION);
    });

    it('keeps only the kinds asked for', () => {
        const visible = filterEntries(SESSION, { kinds: ['tool'] });
        expect(visible).toHaveLength(4);
        expect(visible.every((entry) => entry.kind === 'tool')).toBe(true);
    });

    it('searches the content a reader can see, not the ids', () => {
        // `t0` is an entry id; matching on it would make every filter noisy.
        expect(filterEntries(SESSION, { text: 't0' })).toHaveLength(0);
        expect(filterEntries(SESSION, { text: 'uploader' })).toHaveLength(4);
        expect(filterEntries(SESSION, { text: 'backoff' })).toHaveLength(1);
    });

    it('searches a tool error message, which is what people actually look for', () => {
        expect(filterEntries(SESSION, { text: 'index is cold' })).toHaveLength(1);
    });

    it('narrows to what needs a person', () => {
        const problems = filterEntries(SESSION, { problemsOnly: true });

        // Two failures and one undecided approval. Notably *not* `t2`, the
        // completed edit — it is marked on the ruler, because "what changed" is
        // worth scanning for, but it is not something anyone has to act on.
        expect(problems.map((entry) => entry.id)).toEqual(['t1', 'a0', 't3']);
    });

    it('combines conditions rather than replacing them', () => {
        expect(
            filterEntries(SESSION, { kinds: ['tool'], problemsOnly: true, text: 'cold' }),
        ).toHaveLength(1);
    });

    it('counts by kind for the toggles', () => {
        expect(countByKind(SESSION)).toEqual({ message: 2, tool: 4, approval: 1 });
    });
});

describe('isProblem', () => {
    it('counts a blocked call, not only a failed one', () => {
        const blocked = {
            ...tool('t9'),
            inputRequests: [{ key: 'k', kind: 'form', message: 'q', schema: {} }],
        } as TranscriptEntry;

        expect(isProblem(blocked)).toBe(true);
    });

    it('counts an answered approval as settled', () => {
        const answered = {
            id: 'a1',
            kind: 'approval',
            request: { id: 'x', title: 'x', options: [] },
            decision: { optionId: 'yes', outcome: 'allow', scope: { level: 'once' } },
        } as TranscriptEntry;

        expect(isProblem(answered)).toBe(false);
    });

    it('counts a message that failed to send', () => {
        expect(isProblem(message('m9', 'lost', { role: 'user', delivery: 'failed' }))).toBe(true);
    });
});

describe('marks (T-38)', () => {
    it('separates a protocol failure from one the agent routed around', () => {
        const marks = marksFor(SESSION);

        // The taxonomy distinction is the point: one stopped the run, the other
        // is something the agent usually recovers from. Drawing them alike means
        // scrolling through a dozen recovered errors to find the one that
        // mattered.
        expect(marks.find((mark) => mark.entryId === 't1')?.kind).toBe('failure');
        expect(marks.find((mark) => mark.entryId === 't3')?.kind).toBe('protocol-failure');
    });

    it('marks edits, because "what did it change" is the other thing people scan for', () => {
        expect(marksFor(SESSION).find((mark) => mark.entryId === 't2')?.kind).toBe('edit');
    });

    it('marks an approval', () => {
        expect(marksFor(SESSION).find((mark) => mark.entryId === 'a0')?.kind).toBe('approval');
    });

    it('places marks along the session, 0 to 1', () => {
        const marks = marksFor(SESSION);
        expect(marks[0].at).toBeGreaterThan(0);
        expect(marks[marks.length - 1].at).toBeLessThanOrEqual(1);
    });

    it('does not divide by zero on a single-entry session', () => {
        expect(marksFor([SESSION[2]])[0].at).toBe(0);
    });

    it('leaves a successful non-edit call unmarked', () => {
        expect(marksFor(SESSION).some((mark) => mark.entryId === 't0')).toBe(false);
    });
});

describe('nextMark', () => {
    const marks = marksFor(SESSION);

    it('finds the next one after a position', () => {
        expect(nextMark(marks, 2)?.entryId).toBe('t2');
    });

    it('wraps rather than stopping, so the control never looks broken', () => {
        expect(nextMark(marks, 99)?.entryId).toBe(marks[0].entryId);
        expect(nextMark(marks, -1, -1)?.entryId).toBe(marks[marks.length - 1].entryId);
    });

    it('goes backwards', () => {
        expect(nextMark(marks, 4, -1)?.entryId).toBe('t2');
    });

    it('returns nothing when there is nothing to visit', () => {
        expect(nextMark([], 0)).toBeUndefined();
    });
});

describe('checkpoints (T-39)', () => {
    it('marks everything after the checkpoint, and keeps the checkpoint itself', () => {
        const undone = undoneAfter(SESSION, 't2');

        expect(undone.has('t2')).toBe(false);
        expect(undone.has('a0')).toBe(true);
        expect(undone.has('m1')).toBe(true);
    });

    it('undoes nothing without a checkpoint', () => {
        expect(undoneAfter(SESSION, null).size).toBe(0);
        expect(undoneAfter(SESSION, undefined).size).toBe(0);
    });

    it('undoes nothing for an id that is not in the list', () => {
        // A checkpoint whose entry was filtered away must not silently dim the
        // whole transcript.
        expect(undoneAfter(SESSION, 'gone').size).toBe(0);
    });
});

describe('matchesFilter', () => {
    it('is case-insensitive', () => {
        expect(matchesFilter(SESSION[0], { text: 'BACKOFF' })).toBe(true);
    });

    it('accepts a custom kind, which the transcript also renders', () => {
        const custom = { id: 'd0', kind: 'deployment', data: {} } as TranscriptEntry;
        expect(matchesFilter(custom, { kinds: ['deployment'] })).toBe(true);
        expect(matchesFilter(custom, { kinds: ['message'] })).toBe(false);
    });
});
