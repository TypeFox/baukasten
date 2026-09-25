import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SessionChanges, type SessionChange } from './SessionChanges';

const BEFORE = 'const a = 1;\nconst b = 2;\n';
const AFTER = 'const a = 1;\nconst b = 3;\nconst c = 4;\n';

const changes: SessionChange[] = [
    { path: 'src/services/telemetry/uploader.ts', original: BEFORE, modified: AFTER },
    { path: 'src/queue.ts', original: BEFORE, modified: BEFORE },
];

describe('SessionChanges (T-40)', () => {
    it('summarises the whole changeset, which is the unit people review', () => {
        render(<SessionChanges changes={changes} />);

        // Reviewing a run one tool card at a time means approving hunk 3 of 7
        // in a diff you will meet again two entries later.
        expect(screen.getByText('2 files changed')).toBeInTheDocument();
    });

    it('starts collapsed, because the first question is what it touched', () => {
        render(<SessionChanges changes={changes} />);

        expect(screen.getByText('src/services/telemetry/uploader.ts')).toBeInTheDocument();
        // Opening seven diffs to answer "what did it change" is how this
        // surface becomes unusable in a real run.
        expect(screen.queryByText('const c = 4;')).not.toBeInTheDocument();
    });

    it('opens one file at a time on request', () => {
        render(<SessionChanges changes={changes} />);
        fireEvent.click(screen.getByText('src/services/telemetry/uploader.ts'));

        expect(screen.getByText(/const c = 4;/)).toBeInTheDocument();
    });

    it('decides per file, using the same decision shape as Approval', () => {
        const onDecide = vi.fn();
        render(<SessionChanges changes={changes} onDecide={onDecide} />);

        fireEvent.click(screen.getByRole('button', { name: 'Accept src/queue.ts' }));

        // Not a second resolution model. A user meets Approval, DiffReview and
        // this in one session, and finding them inconsistent is worse than any
        // of them being individually imperfect.
        expect(onDecide).toHaveBeenCalledWith('src/queue.ts', {
            optionId: 'accept',
            outcome: 'allow',
            scope: { level: 'once' },
        });
    });

    it('counts only the undecided in the wholesale action', () => {
        render(
            <SessionChanges
                changes={[
                    changes[0],
                    {
                        ...changes[1],
                        decision: {
                            optionId: 'accept',
                            outcome: 'allow',
                            scope: { level: 'once' },
                        },
                    },
                ]}
                onDecideAll={() => undefined}
            />,
        );

        expect(screen.getByRole('button', { name: /Accept all \(1\)/ })).toBeInTheDocument();
    });

    it('keeps a decided file in the list, showing what was chosen', () => {
        render(
            <SessionChanges
                changes={[
                    {
                        ...changes[0],
                        decision: {
                            optionId: 'reject',
                            outcome: 'deny',
                            scope: { level: 'once' },
                        },
                    },
                ]}
                onDecide={() => undefined}
            />,
        );

        // A list that gets shorter as you work loses the record of what you
        // already said about each file.
        const row = screen.getByText('src/services/telemetry/uploader.ts').closest('li')!;
        expect(row).toHaveAttribute('data-outcome', 'deny');
        expect(within(row).getByText('Reject')).toBeInTheDocument();
        expect(within(row).queryByRole('button', { name: /^Accept/ })).not.toBeInTheDocument();
    });

    it('hides the wholesale action once nothing is undecided', () => {
        render(
            <SessionChanges
                changes={changes.map((change) => ({
                    ...change,
                    decision: {
                        optionId: 'accept' as const,
                        outcome: 'allow' as const,
                        scope: { level: 'once' as const },
                    },
                }))}
                onDecideAll={() => undefined}
            />,
        );

        expect(screen.queryByRole('button', { name: /Accept all/ })).not.toBeInTheDocument();
    });

    it('renders nothing at all when the run changed nothing', () => {
        const { container } = render(<SessionChanges changes={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
});
