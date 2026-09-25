import { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DensityProvider } from '../../density';
import { marksFor, type TranscriptFilterState } from '../../transcriptView';
import type { MessageEntry, TranscriptEntry } from '../../types';
import { Transcript } from './Transcript';
import { TranscriptFilter } from './TranscriptFilter';
import { OverviewRuler } from './OverviewRuler';

const entries: TranscriptEntry[] = [
    { id: 'm0', kind: 'message', role: 'user', text: 'Add retries', streaming: false },
    {
        id: 't0',
        kind: 'tool',
        tool: { correlationId: 't0', kind: 'read', title: 'Read', status: 'completed' },
    },
    {
        id: 't1',
        kind: 'tool',
        tool: {
            correlationId: 't1',
            kind: 'execute',
            title: 'Terminal',
            status: 'failed',
            error: { scope: 'protocol', message: 'Version mismatch' },
        },
    },
    { id: 'm1', kind: 'message', role: 'agent', text: 'Done', streaming: false },
];

const renderers = {
    message: ({ entry }: { entry: MessageEntry }) => <p>{entry.text}</p>,
};

function Filters({ counts }: { counts?: Record<string, number> }) {
    const [value, setValue] = useState<TranscriptFilterState>({});
    return (
        <>
            <TranscriptFilter value={value} onChange={setValue} counts={counts} />
            <output>{JSON.stringify(value)}</output>
        </>
    );
}

describe('TranscriptFilter (T-37)', () => {
    it('starts with everything on', () => {
        render(<Filters />);

        for (const label of ['Messages', 'Tool calls', 'Approvals']) {
            expect(screen.getByRole('button', { name: label })).toHaveAttribute(
                'aria-pressed',
                'true',
            );
        }
    });

    it('turns a kind off on the first click rather than narrowing to it', () => {
        render(<Filters />);
        fireEvent.click(screen.getByRole('button', { name: 'Tool calls' }));

        // Everything is on to begin with, so a row of pressed toggles means
        // "all of these". Making the first click narrow to one would contradict
        // what the control is showing.
        const state = JSON.parse(screen.getByRole('status').textContent!);
        expect(state.kinds).not.toContain('tool');
        expect(state.kinds).toContain('message');
    });

    it('drops back to "everything" when the last kind is turned back on', () => {
        render(<Filters />);
        const tools = screen.getByRole('button', { name: 'Tool calls' });

        fireEvent.click(tools);
        fireEvent.click(tools);

        // Undefined rather than a list of all of them, so `isEmptyFilter` can
        // skip the work entirely.
        expect(JSON.parse(screen.getByRole('status').textContent!).kinds).toBeUndefined();
    });

    it('puts the count in the accessible name, since compact hides the label', () => {
        render(<Filters counts={{ tool: 12 }} />);

        // At compact density the toggle is an icon alone; without this a screen
        // reader user gets less than a sighted one from the same control.
        expect(screen.getByRole('button', { name: 'Tool calls (12)' })).toBeInTheDocument();
    });

    it('hides the text labels at compact density but keeps the names', () => {
        render(
            <DensityProvider density="compact">
                <Filters />
            </DensityProvider>,
        );

        expect(screen.queryByText('Tool calls')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Tool calls' })).toBeInTheDocument();
    });

    it('offers collapse and expand only when the host can honour them', () => {
        const { rerender } = render(<Filters />);
        expect(screen.queryByRole('button', { name: 'Collapse all' })).not.toBeInTheDocument();

        const onCollapseAll = vi.fn();
        rerender(
            <>
                <TranscriptFilter
                    value={{}}
                    onChange={() => undefined}
                    onCollapseAll={onCollapseAll}
                />
            </>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Collapse all' }));
        expect(onCollapseAll).toHaveBeenCalled();
    });
});

describe('OverviewRuler (T-38)', () => {
    it('gives every mark a real button, so the ruler works by keyboard', () => {
        render(<OverviewRuler marks={marksFor(entries)} />);

        // A decorative strip that only answers a click on a four-pixel target
        // is not navigation.
        const marks = within(screen.getByRole('group')).getAllByRole('button');
        expect(marks.length).toBeGreaterThan(0);
    });

    it('names a mark by what it is and where it is', () => {
        render(<OverviewRuler marks={marksFor(entries)} />);
        expect(
            screen.getByRole('button', { name: 'Protocol error — entry 3' }),
        ).toBeInTheDocument();
    });

    it('reports which entry was chosen', () => {
        const onSelect = vi.fn();
        render(<OverviewRuler marks={marksFor(entries)} onSelect={onSelect} />);

        fireEvent.click(screen.getByRole('button', { name: /Protocol error/ }));
        expect(onSelect).toHaveBeenCalledWith('t1');
    });

    it('marks the one navigation landed on', () => {
        render(<OverviewRuler marks={marksFor(entries)} activeEntryId="t1" />);
        expect(screen.getByRole('button', { name: /Protocol error/ })).toHaveAttribute(
            'aria-current',
            'true',
        );
    });
});

describe('checkpoints in the transcript (T-39)', () => {
    it('dims what a rewind would undo rather than removing it', () => {
        const { container } = render(
            <Transcript entries={entries} renderers={renderers} checkpointId="t0" />,
        );

        // Removing them would leave the user unable to read what they would be
        // throwing away, or to change their mind.
        expect(screen.getByText('Done')).toBeInTheDocument();
        expect(container.querySelector('[data-entry-id="m1"]')).toHaveAttribute('data-undone');
        expect(container.querySelector('[data-entry-id="m0"]')).not.toHaveAttribute('data-undone');
    });

    it('keeps the checkpointed entry itself', () => {
        const { container } = render(
            <Transcript entries={entries} renderers={renderers} checkpointId="t0" />,
        );

        expect(container.querySelector('[data-entry-id="t0"]')).not.toHaveAttribute('data-undone');
    });

    it('takes undone entries out of the tab order', () => {
        const { container } = render(
            <Transcript entries={entries} renderers={renderers} checkpointId="m0" />,
        );

        // A control inside an undone entry has nothing left to act on.
        expect(container.querySelector('[data-entry-id="t0"]')).toHaveAttribute('inert');
    });

    it('undoes nothing without a checkpoint', () => {
        const { container } = render(<Transcript entries={entries} renderers={renderers} />);
        expect(container.querySelector('[data-undone]')).toBeNull();
    });
});

describe('the transcript hosts the ruler', () => {
    it('renders one when given marks, and nothing when not', () => {
        const { rerender } = render(<Transcript entries={entries} renderers={renderers} />);
        expect(screen.queryByRole('group', { name: 'Session overview' })).not.toBeInTheDocument();

        rerender(<Transcript entries={entries} renderers={renderers} marks={marksFor(entries)} />);
        expect(screen.getByRole('group', { name: 'Session overview' })).toBeInTheDocument();
    });

    it('reports navigation from the ruler', () => {
        const onNavigate = vi.fn();
        render(
            <Transcript
                entries={entries}
                renderers={renderers}
                marks={marksFor(entries)}
                onNavigate={onNavigate}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /Protocol error/ }));
        expect(onNavigate).toHaveBeenCalledWith('t1');
    });
});
