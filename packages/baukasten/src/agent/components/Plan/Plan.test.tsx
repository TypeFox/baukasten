import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PlanEntry, ThoughtEntry } from '../../types';
import { Plan } from './Plan';
import { ThoughtBlock } from '../ThoughtBlock';

function plan(items: PlanEntry['items']): PlanEntry {
    return { id: 'p1', kind: 'plan', items };
}

describe('Plan', () => {
    it('shows how far through it is', () => {
        render(
            <Plan
                entry={plan([
                    { id: '1', text: 'Read', status: 'done' },
                    { id: '2', text: 'Edit', status: 'active' },
                    { id: '3', text: 'Test', status: 'pending' },
                ])}
            />,
        );

        expect(screen.getByText('1/3')).toBeInTheDocument();
    });

    it('keeps finished steps rather than dropping them', () => {
        render(<Plan entry={plan([{ id: '1', text: 'Read the uploader', status: 'done' }])} />);

        // A plan is read for its shape as much as its remaining work.
        expect(screen.getByText('Read the uploader')).toBeInTheDocument();
    });

    it('renders the three statuses differently', () => {
        const classNames = (['pending', 'active', 'done'] as const).map((status) => {
            const { container, unmount } = render(
                <Plan entry={plan([{ id: '1', text: 'x', status }])} />,
            );
            const className = container.querySelector('li')?.className ?? '';
            unmount();
            return className;
        });

        expect(new Set(classNames).size).toBe(3);
    });

    it('flags a high-priority step that is still outstanding', () => {
        render(
            <Plan
                entry={plan([{ id: '1', text: 'Fix it', status: 'active', priority: 'high' }])}
            />,
        );

        expect(screen.getByLabelText('High priority')).toBeInTheDocument();
    });

    it('stops flagging priority once the step is done', () => {
        render(
            <Plan entry={plan([{ id: '1', text: 'Fix it', status: 'done', priority: 'high' }])} />,
        );

        expect(screen.queryByLabelText('High priority')).not.toBeInTheDocument();
    });

    it('renders an empty plan without a count', () => {
        render(<Plan entry={plan([])} />);
        expect(screen.queryByText('0/0')).not.toBeInTheDocument();
    });
});

describe('ThoughtBlock', () => {
    function thought(overrides: Partial<ThoughtEntry> = {}): ThoughtEntry {
        return {
            id: 'h1',
            kind: 'thought',
            text: 'checking the callers',
            streaming: false,
            ...overrides,
        };
    }

    it('shows reasoning in full while it is still arriving', () => {
        const { container } = render(<ThoughtBlock entry={thought({ streaming: true })} />);

        expect(screen.getByText('checking the callers')).toBeInTheDocument();
        expect(container.querySelector('[data-state="live"]')).not.toBeNull();
        // Nothing to collapse while it is the only thing happening.
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('folds to a summary once it settles', () => {
        render(<ThoughtBlock entry={thought({ durationMs: 1400 })} />);

        expect(screen.getByRole('button', { name: /thought for 1\.4s/i })).toBeInTheDocument();
        expect(screen.queryByText('checking the callers')).not.toBeInTheDocument();
    });

    it('omits the duration when nothing upstream measured one', () => {
        render(<ThoughtBlock entry={thought()} />);
        expect(screen.getByRole('button', { name: 'Thought' })).toBeInTheDocument();
    });

    it('reveals the reasoning when asked', () => {
        render(<ThoughtBlock entry={thought({ durationMs: 1400 })} />);

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('checking the callers')).toBeInTheDocument();
    });
});
