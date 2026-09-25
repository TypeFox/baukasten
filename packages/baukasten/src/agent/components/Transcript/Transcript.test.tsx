import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { MessageEntry, TranscriptEntry } from '../../types';
import { Transcript } from './Transcript';

/**
 * jsdom has no layout engine, so `scrollHeight` and `clientHeight` are both
 * zero and every element reads as "at the bottom". These tests install real
 * numbers so the pin logic has something to decide against; that is the only
 * part being faked, the logic itself is the real thing.
 */
function setMetrics(
    element: HTMLElement,
    metrics: { scrollHeight: number; clientHeight: number; scrollTop: number },
): void {
    Object.defineProperty(element, 'scrollHeight', {
        value: metrics.scrollHeight,
        configurable: true,
    });
    Object.defineProperty(element, 'clientHeight', {
        value: metrics.clientHeight,
        configurable: true,
    });
    Object.defineProperty(element, 'scrollTop', {
        value: metrics.scrollTop,
        writable: true,
        configurable: true,
    });
}

function message(id: string, text: string): MessageEntry {
    return { id, kind: 'message', role: 'agent', text, streaming: false };
}

const renderers = {
    message: ({ entry }: { entry: MessageEntry }) => <p>{entry.text}</p>,
};

/** Scrolls the log away from the bottom and lets the handler run. */
function scrollAway(log: HTMLElement): void {
    setMetrics(log, { scrollHeight: 1000, clientHeight: 200, scrollTop: 0 });
    fireEvent.scroll(log);
}

function scrollToBottom(log: HTMLElement): void {
    setMetrics(log, { scrollHeight: 1000, clientHeight: 200, scrollTop: 800 });
    fireEvent.scroll(log);
}

describe('Transcript', () => {
    it('renders entries through the renderer map', () => {
        render(<Transcript entries={[message('a', 'hello')]} renderers={renderers} />);
        expect(screen.getByText('hello')).toBeInTheDocument();
    });

    it('renders a fallback for a kind nobody registered', () => {
        const custom: TranscriptEntry = { id: 'd', kind: 'deployment', data: {} };
        render(<Transcript entries={[custom]} renderers={renderers} />);

        // An entry that exists must not render as nothing.
        expect(screen.getByText('deployment')).toBeInTheDocument();
    });

    it('shows the empty state only when there is nothing', () => {
        const { rerender } = render(<Transcript entries={[]} empty="No messages yet" />);
        expect(screen.getByText('No messages yet')).toBeInTheDocument();

        rerender(
            <Transcript
                entries={[message('a', 'hello')]}
                renderers={renderers}
                empty="No messages yet"
            />,
        );
        expect(screen.queryByText('No messages yet')).not.toBeInTheDocument();
    });

    it('exposes the log as a log region rather than a live region', () => {
        render(<Transcript entries={[message('a', 'hello')]} renderers={renderers} />);
        // A log announces additions without re-reading everything before them.
        expect(screen.getByRole('log', { name: 'Conversation' })).toBeInTheDocument();
    });

    it('offers no jump affordance while the reader is at the bottom', () => {
        render(<Transcript entries={[message('a', 'hello')]} renderers={renderers} />);
        expect(screen.queryByRole('button', { name: /jump to latest/i })).not.toBeInTheDocument();
    });

    it('offers one once the reader scrolls away', () => {
        render(<Transcript entries={[message('a', 'hello')]} renderers={renderers} />);
        scrollAway(screen.getByRole('log'));

        expect(screen.getByRole('button', { name: /jump to latest/i })).toBeInTheDocument();
    });

    it('withdraws it when the reader comes back', () => {
        render(<Transcript entries={[message('a', 'hello')]} renderers={renderers} />);
        const log = screen.getByRole('log');

        scrollAway(log);
        expect(screen.getByRole('button', { name: /jump to latest/i })).toBeInTheDocument();

        scrollToBottom(log);
        expect(screen.queryByRole('button', { name: /jump to latest/i })).not.toBeInTheDocument();
    });

    it('does not drag the reader back down when new entries arrive', () => {
        const { rerender } = render(
            <Transcript entries={[message('a', 'one')]} renderers={renderers} />,
        );
        const log = screen.getByRole('log');
        scrollAway(log);

        rerender(
            <Transcript
                entries={[message('a', 'one'), message('b', 'two')]}
                renderers={renderers}
            />,
        );

        // The demo's version reassigns scrollTop here, which is the whole bug.
        expect(log.scrollTop).toBe(0);
    });

    it('counts what arrived while the reader was away', () => {
        const { rerender } = render(
            <Transcript entries={[message('a', 'one')]} renderers={renderers} />,
        );
        scrollAway(screen.getByRole('log'));

        rerender(
            <Transcript
                entries={[message('a', 'one'), message('b', 'two'), message('c', 'three')]}
                renderers={renderers}
            />,
        );

        expect(screen.getByRole('button', { name: /jump to latest \(2\)/i })).toBeInTheDocument();
    });

    it('returns to the bottom when the affordance is used', () => {
        render(<Transcript entries={[message('a', 'one')]} renderers={renderers} />);
        const log = screen.getByRole('log');
        scrollAway(log);

        fireEvent.click(screen.getByRole('button', { name: /jump to latest/i }));

        expect(log.scrollTop).toBe(1000);
        expect(screen.queryByRole('button', { name: /jump to latest/i })).not.toBeInTheDocument();
    });
});
