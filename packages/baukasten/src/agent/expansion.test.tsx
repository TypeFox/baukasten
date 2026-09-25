import { useState } from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExpansionProvider, useExpansion, useExpansionStore } from './expansion';
import { Transcript } from './components/Transcript';
import { ToolCall } from './components/ToolCall';
import type { ToolEntry, TranscriptEntry } from './types';

function toolEntry(id: string, title = 'Read'): ToolEntry {
    return {
        id,
        kind: 'tool',
        tool: { correlationId: id, kind: 'read', title, status: 'completed' },
    } as ToolEntry;
}

const renderers = {
    tool: ({ entry }: { entry: ToolEntry }) => (
        <ToolCall entry={entry}>
            <span>body of {entry.tool.title}</span>
        </ToolCall>
    ),
};

describe('the expansion store', () => {
    it('falls back to each row’s own default until something is said', () => {
        const { result } = renderHook(() => useExpansionStore());

        expect(result.current.isExpanded('a', false)).toBe(false);
        expect(result.current.isExpanded('b', true)).toBe(true);
    });

    it('remembers a toggle per row', () => {
        const { result } = renderHook(() => useExpansionStore());

        act(() => result.current.toggle('a', false));

        expect(result.current.isExpanded('a', false)).toBe(true);
        // Untouched rows are unaffected.
        expect(result.current.isExpanded('b', false)).toBe(false);
    });

    it('toggles away from a row’s default, not from false', () => {
        const { result } = renderHook(() => useExpansionStore());

        // A card that defaults to expanded should close on the first click.
        act(() => result.current.toggle('a', true));
        expect(result.current.isExpanded('a', true)).toBe(false);
    });

    it('collapses everything without knowing any ids', () => {
        const { result } = renderHook(() => useExpansionStore());

        act(() => result.current.toggle('a', false));
        act(() => result.current.collapseAll());

        // Including rows that default to expanded, and rows never seen — which
        // in a windowed list is most of them.
        expect(result.current.isExpanded('a', false)).toBe(false);
        expect(result.current.isExpanded('unseen', true)).toBe(false);
    });

    it('expands everything, and a later toggle still wins', () => {
        const { result } = renderHook(() => useExpansionStore());

        act(() => result.current.expandAll());
        expect(result.current.isExpanded('a', false)).toBe(true);

        act(() => result.current.toggle('a', false));
        expect(result.current.isExpanded('a', false)).toBe(false);
        expect(result.current.isExpanded('b', false)).toBe(true);
    });

    it('sets a row directly', () => {
        const { result } = renderHook(() => useExpansionStore());

        act(() => result.current.setExpanded('a', true));
        expect(result.current.isExpanded('a', false)).toBe(true);
    });
});

describe('useExpansion without a provider', () => {
    it('keeps local state, so a card works standalone', () => {
        render(
            <ToolCall entry={toolEntry('t0')}>
                <span>body</span>
            </ToolCall>,
        );

        expect(screen.queryByText('body')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('body')).toBeInTheDocument();
    });

    it('keeps local state when the row has no stable id', () => {
        const { result } = renderHook(() => useExpansion(undefined, false), {
            wrapper: ({ children }) => <ExpansionProvider>{children}</ExpansionProvider>,
        });

        act(() => result.current[1]());
        expect(result.current[0]).toBe(true);
    });
});

describe('expansion survives a row unmounting (the windowing bug)', () => {
    /**
     * Stands in for scrolling a windowed transcript past a row and back.
     *
     * The virtualiser unmounts rows outside the overscan window; there is no
     * way to make that happen in jsdom, which has no layout — so the unmount
     * is reproduced directly, which is the part that matters.
     */
    function Harness() {
        const [mounted, setMounted] = useState(true);

        return (
            <ExpansionProvider>
                <button type="button" onClick={() => setMounted((current) => !current)}>
                    scroll
                </button>
                {mounted && (
                    <ToolCall entry={toolEntry('t0')}>
                        <span>body of Read</span>
                    </ToolCall>
                )}
            </ExpansionProvider>
        );
    }

    it('remembers an expanded card after it unmounts and comes back', () => {
        render(<Harness />);

        fireEvent.click(screen.getByRole('button', { name: /Read/ }));
        expect(screen.getByText('body of Read')).toBeInTheDocument();

        // Away…
        fireEvent.click(screen.getByRole('button', { name: 'scroll' }));
        expect(screen.queryByText('body of Read')).not.toBeInTheDocument();

        // …and back. Held in the row's own `useState`, this came back collapsed,
        // which reads as the application forgetting what you did.
        fireEvent.click(screen.getByRole('button', { name: 'scroll' }));
        expect(screen.getByText('body of Read')).toBeInTheDocument();
    });
});

describe('Transcript supplies a store', () => {
    const entries: TranscriptEntry[] = [toolEntry('t0', 'Read'), toolEntry('t1', 'Edit')];

    it('so expansion works with no wiring at the call site', () => {
        render(<Transcript entries={entries} renderers={renderers} />);

        fireEvent.click(screen.getByRole('button', { name: /Read/ }));
        expect(screen.getByText('body of Read')).toBeInTheDocument();
        // Independently, not all at once.
        expect(screen.queryByText('body of Edit')).not.toBeInTheDocument();
    });

    it('but defers to one provided above it', () => {
        function Outer() {
            const store = useExpansionStore();

            return (
                <ExpansionProvider store={store}>
                    <button type="button" onClick={() => store.expandAll()}>
                        expand all
                    </button>
                    <Transcript entries={entries} renderers={renderers} />
                </ExpansionProvider>
            );
        }

        render(<Outer />);

        // A collapse-all or expand-all control lives outside the transcript —
        // in a filter bar — so it has to be able to reach the same state.
        fireEvent.click(screen.getByRole('button', { name: 'expand all' }));

        expect(screen.getByText('body of Read')).toBeInTheDocument();
        expect(screen.getByText('body of Edit')).toBeInTheDocument();
    });
});
