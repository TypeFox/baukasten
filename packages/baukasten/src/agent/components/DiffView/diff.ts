/**
 * A line diff, written here rather than depended on.
 *
 * This is the one place in the entry point where writing beats depending: the
 * alternative is a hard runtime dependency on a diff engine for the benefit of
 * a single component, in a package that has already been through the exercise
 * of removing exactly that kind of weight.
 *
 * Myers' algorithm, O((N+M)D) — fast when the change is small relative to the
 * file, which is the shape of every agent edit. Pure, so it is tested against
 * fixtures with no DOM.
 */

export type DiffOp = 'equal' | 'insert' | 'delete';

export interface DiffLine {
    readonly op: DiffOp;
    readonly text: string;
    /** 1-based line number on the left. Absent for an insertion. */
    readonly oldNumber?: number;
    /** 1-based line number on the right. Absent for a deletion. */
    readonly newNumber?: number;
}

export interface DiffHunk {
    readonly lines: readonly DiffLine[];
    readonly oldStart: number;
    readonly newStart: number;
}

export interface DiffStats {
    readonly added: number;
    readonly removed: number;
}

function splitLines(text: string): string[] {
    if (text === '') return [];
    const lines = text.split('\n');
    // A trailing newline produces an empty final element that is not a line.
    if (lines[lines.length - 1] === '') lines.pop();
    return lines;
}

/**
 * The shortest edit script between two line arrays.
 *
 * Walks forward recording a trace of the furthest-reaching path at each edit
 * distance, then backtracks through it to recover the actual operations.
 */
function myers(a: readonly string[], b: readonly string[]): DiffLine[] {
    const n = a.length;
    const m = b.length;
    const max = n + m;
    const offset = max;
    const v = new Array<number>(2 * max + 2).fill(0);
    const trace: number[][] = [];

    let editDistance = -1;

    outer: for (let d = 0; d <= max; d++) {
        trace.push(v.slice());

        for (let k = -d; k <= d; k += 2) {
            let x: number;
            if (k === -d || (k !== d && v[k - 1 + offset] < v[k + 1 + offset])) {
                x = v[k + 1 + offset];
            } else {
                x = v[k - 1 + offset] + 1;
            }

            let y = x - k;
            // Slide down the diagonal for as long as the lines agree; this is
            // where the algorithm earns its speed on a small change.
            while (x < n && y < m && a[x] === b[y]) {
                x++;
                y++;
            }

            v[k + offset] = x;

            if (x >= n && y >= m) {
                editDistance = d;
                break outer;
            }
        }
    }

    if (editDistance === -1) return [];

    const reversed: DiffLine[] = [];
    let x = n;
    let y = m;

    for (let d = editDistance; d > 0; d--) {
        const previous = trace[d];
        const k = x - y;

        const prevK =
            k === -d || (k !== d && previous[k - 1 + offset] < previous[k + 1 + offset])
                ? k + 1
                : k - 1;

        const prevX = previous[prevK + offset];
        const prevY = prevX - prevK;

        while (x > prevX && y > prevY) {
            reversed.push({ op: 'equal', text: a[x - 1], oldNumber: x, newNumber: y });
            x--;
            y--;
        }

        if (x > prevX) {
            reversed.push({ op: 'delete', text: a[x - 1], oldNumber: x });
            x--;
        } else if (y > prevY) {
            reversed.push({ op: 'insert', text: b[y - 1], newNumber: y });
            y--;
        }
    }

    while (x > 0 && y > 0) {
        reversed.push({ op: 'equal', text: a[x - 1], oldNumber: x, newNumber: y });
        x--;
        y--;
    }

    return reversed.reverse();
}

export function diffLines(oldText: string, newText: string): readonly DiffLine[] {
    return myers(splitLines(oldText), splitLines(newText));
}

export function diffStats(lines: readonly DiffLine[]): DiffStats {
    let added = 0;
    let removed = 0;

    for (const line of lines) {
        if (line.op === 'insert') added++;
        else if (line.op === 'delete') removed++;
    }

    return { added, removed };
}

/**
 * Groups changes into hunks with surrounding context.
 *
 * Long unchanged stretches are dropped rather than rendered. An agent edit is
 * typically three hunks in a four-hundred-line file, and showing all four
 * hundred buries the part the reader is being asked to judge.
 */
export function toHunks(lines: readonly DiffLine[], context = 3): readonly DiffHunk[] {
    const changed = lines
        .map((line, index) => (line.op === 'equal' ? -1 : index))
        .filter((index) => index !== -1);

    if (changed.length === 0) return [];

    const ranges: Array<[number, number]> = [];
    for (const index of changed) {
        const start = Math.max(0, index - context);
        const end = Math.min(lines.length - 1, index + context);
        const last = ranges[ranges.length - 1];

        // Overlapping or touching context windows become one hunk, so a
        // reader never sees two headers with nothing between them.
        if (last && start <= last[1] + 1) last[1] = Math.max(last[1], end);
        else ranges.push([start, end]);
    }

    return ranges.map(([start, end]) => {
        const slice = lines.slice(start, end + 1);
        return {
            lines: slice,
            oldStart: slice.find((line) => line.oldNumber !== undefined)?.oldNumber ?? 0,
            newStart: slice.find((line) => line.newNumber !== undefined)?.newNumber ?? 0,
        };
    });
}
