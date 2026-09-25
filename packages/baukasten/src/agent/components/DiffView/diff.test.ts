import { describe, expect, it } from 'vitest';
import { diffLines, diffStats, toHunks } from './diff';

function ops(oldText: string, newText: string): string {
    return diffLines(oldText, newText)
        .map((line) => ({ equal: ' ', insert: '+', delete: '-' })[line.op] + line.text)
        .join('|');
}

describe('diffLines', () => {
    it('reports nothing for identical input', () => {
        expect(diffStats(diffLines('a\nb\nc', 'a\nb\nc'))).toEqual({ added: 0, removed: 0 });
    });

    it('finds a single insertion', () => {
        expect(ops('a\nc', 'a\nb\nc')).toBe(' a|+b| c');
    });

    it('finds a single deletion', () => {
        expect(ops('a\nb\nc', 'a\nc')).toBe(' a|-b| c');
    });

    it('reports a replacement as a deletion and an insertion', () => {
        expect(diffStats(diffLines('a\nb\nc', 'a\nx\nc'))).toEqual({ added: 1, removed: 1 });
    });

    it('handles an empty original', () => {
        expect(diffStats(diffLines('', 'a\nb'))).toEqual({ added: 2, removed: 0 });
    });

    it('handles an empty result', () => {
        expect(diffStats(diffLines('a\nb', ''))).toEqual({ added: 0, removed: 2 });
    });

    it('does not treat a trailing newline as an extra line', () => {
        expect(diffStats(diffLines('a\nb\n', 'a\nb\n'))).toEqual({ added: 0, removed: 0 });
    });

    it('numbers lines against the side they belong to', () => {
        const lines = diffLines('a\nc', 'a\nb\nc');

        expect(lines.map((line) => [line.op, line.oldNumber, line.newNumber])).toEqual([
            ['equal', 1, 1],
            // An insertion exists only on the right, so it has no old number.
            ['insert', undefined, 2],
            ['equal', 2, 3],
        ]);
    });

    it('finds a minimal script rather than replacing everything', () => {
        const a = Array.from({ length: 200 }, (_, index) => `line ${index}`).join('\n');
        const b = a.replace('line 100', 'line 100 changed');

        // The point of Myers: one changed line in two hundred is two edits,
        // not four hundred.
        expect(diffStats(diffLines(a, b))).toEqual({ added: 1, removed: 1 });
    });
});

describe('toHunks', () => {
    const document = Array.from({ length: 40 }, (_, index) => `line ${index}`).join('\n');

    it('returns nothing when there is nothing to show', () => {
        expect(toHunks(diffLines(document, document))).toEqual([]);
    });

    it('keeps only the changed region and its context', () => {
        const changed = document.replace('line 20', 'line 20 edited');
        const [hunk, ...rest] = toHunks(diffLines(document, changed), 3);

        expect(rest).toHaveLength(0);
        // 3 context either side, plus the deletion and the insertion.
        expect(hunk.lines).toHaveLength(8);
    });

    it('merges changes whose context windows touch', () => {
        const changed = document.replace('line 20', 'x').replace('line 22', 'y');
        expect(toHunks(diffLines(document, changed), 3)).toHaveLength(1);
    });

    it('keeps distant changes apart', () => {
        const changed = document.replace('line 2', 'x').replace('line 35', 'y');
        expect(toHunks(diffLines(document, changed), 3)).toHaveLength(2);
    });

    it('reports where each hunk starts', () => {
        const changed = document.replace('line 20', 'edited');
        const [hunk] = toHunks(diffLines(document, changed), 3);

        expect(hunk.oldStart).toBe(18);
        expect(hunk.newStart).toBe(18);
    });
});
