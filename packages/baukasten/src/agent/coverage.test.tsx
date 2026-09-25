/**
 * The modules a coverage run showed nothing was exercising.
 *
 * Grouped rather than scattered because they share a cause: each is a small
 * surface that the session-level tests route *around* — `DiffReview` because
 * the transcript tests build approvals directly, `Composer` because the editor
 * tests render `PromptEditor` bare, `useTranscript`'s failure path because
 * nothing in the suite made a send fail.
 */

import { useState } from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DensityProvider, densityForWidth, useAutoDensity, useDensity } from './density';
import { useMarkNavigation } from './useMarkNavigation';
import { useTranscript } from './useTranscript';
import { DiffReview } from './components/DiffView';
import { Composer, PromptEditor } from './components/PromptEditor';
import type { ApprovalEntry, PromptValue, TranscriptEntry } from './types';

// ─── DiffReview ─────────────────────────────────────────────────────────────

const pending: ApprovalEntry = {
    id: 'a:1',
    kind: 'approval',
    request: {
        id: '1',
        title: 'Apply the change?',
        options: [
            { id: 'accept', label: 'Accept', outcome: 'allow', scope: 'once', shortcut: 'accept' },
            { id: 'reject', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
        ],
    },
};

describe('DiffReview (T-50)', () => {
    const props = {
        path: 'src/uploader.ts',
        original: 'const a = 1;\n',
        modified: 'const a = 2;\n',
    };

    it('shows the change and the decision together', () => {
        render(<DiffReview {...props} entry={pending} />);

        expect(screen.getByText('src/uploader.ts')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Accept/ })).toBeInTheDocument();
    });

    it('reports the decision in the shape every other consent surface uses', () => {
        const onDecide = vi.fn();
        render(<DiffReview {...props} entry={pending} onDecide={onDecide} />);

        fireEvent.click(screen.getByRole('button', { name: /Accept/ }));

        // A diff review *is* an approval whose summary happens to be a diff.
        // Two consent surfaces with different resolved states would be worse
        // than one slightly more general component.
        expect(onDecide).toHaveBeenCalledWith({
            optionId: 'accept',
            outcome: 'allow',
            scope: { level: 'once' },
        });
    });

    it('puts identity props on its own root, not on the diff inside it', () => {
        const { container } = render(
            <DiffReview {...props} entry={pending} className="mine" id="review" />,
        );

        // Styling "the review card" used to style the diff box, because
        // everything was spread into DiffView.
        const root = container.firstElementChild!;
        expect(root).toHaveClass('mine');
        expect(root).toHaveAttribute('id', 'review');
    });

    it('carries the resolved outcome once decided', () => {
        render(
            <DiffReview
                {...props}
                entry={{
                    ...pending,
                    decision: { optionId: 'accept', outcome: 'allow', scope: { level: 'once' } },
                }}
            />,
        );

        expect(screen.queryByRole('button', { name: /Accept/ })).not.toBeInTheDocument();
        expect(screen.getByText('Accept')).toBeInTheDocument();
    });
});

// ─── Composer ───────────────────────────────────────────────────────────────

describe('Composer (T-57)', () => {
    function Harness(props: Partial<React.ComponentProps<typeof Composer>> = {}) {
        const [value, setValue] = useState<PromptValue>([]);
        return (
            <Composer value={value} {...props}>
                <PromptEditor value={value} onChange={setValue} />
            </Composer>
        );
    }

    it('refuses to send an empty draft', () => {
        render(<Harness />);
        expect(screen.getByRole('button', { name: /Send/ })).toBeDisabled();
    });

    it('sends a draft with text', () => {
        const onSend = vi.fn();
        render(
            <Composer value={[{ type: 'text', text: 'hi' }]} onSend={onSend}>
                <span />
            </Composer>,
        );

        fireEvent.click(screen.getByRole('button', { name: /Send/ }));
        expect(onSend).toHaveBeenCalled();
    });

    it('sends an attachment with no words at all', () => {
        render(
            <Composer
                value={[]}
                attachments={[{ id: '1', name: 'shot.png', kind: 'image' }]}
                onSend={() => undefined}
            >
                <span />
            </Composer>,
        );

        // "Here, look at this" with an image and no text is the normal way
        // anyone sends a screenshot; gating send on the text alone refuses it.
        expect(screen.getByRole('button', { name: /Send/ })).toBeEnabled();
    });

    it('is one control that knows whether it sends or stops', () => {
        const onStop = vi.fn();
        const onSend = vi.fn();
        render(
            <Composer
                value={[{ type: 'text', text: 'hi' }]}
                running
                onSend={onSend}
                onStop={onStop}
            >
                <span />
            </Composer>,
        );

        // Two controls in the same place means a run ending under the pointer
        // turns a stop into a send — the worst possible misfire here.
        expect(screen.queryByRole('button', { name: /Send/ })).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Stop/ }));
        expect(onStop).toHaveBeenCalled();
        expect(onSend).not.toHaveBeenCalled();
    });

    it('renders context chips separately from real attachments', () => {
        render(
            <Harness
                context={<span>fix/telemetry-retry</span>}
                attachments={[{ id: '1', name: 'shot.png', kind: 'image' }]}
                onRemoveAttachment={() => undefined}
            />,
        );

        expect(screen.getByText('fix/telemetry-retry')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Remove shot.png' })).toBeInTheDocument();
    });

    it('shows a drop affordance only while something is over it', () => {
        const { rerender } = render(<Harness />);
        expect(screen.queryByText('Drop to attach')).not.toBeInTheDocument();

        rerender(<Harness isDraggingOver />);
        expect(screen.getByText('Drop to attach')).toBeInTheDocument();
    });

    it('puts what is blocking the draft between the input and the footer', () => {
        render(<Harness resolving={<span>Pick a branch</span>} />);

        // It sits there rather than replacing the input, so abandoning the
        // resolution costs the user nothing they had already written.
        expect(screen.getByText('Pick a branch')).toBeInTheDocument();
    });
});

// ─── Density ────────────────────────────────────────────────────────────────

describe('density (T-42)', () => {
    it('defaults to comfortable with no provider', () => {
        const { result } = renderHook(() => useDensity());
        expect(result.current).toBe('comfortable');
    });

    it('takes the provider value', () => {
        const { result } = renderHook(() => useDensity(), {
            wrapper: ({ children }) => (
                <DensityProvider density="compact">{children}</DensityProvider>
            ),
        });

        expect(result.current).toBe('compact');
    });

    it('lets a component prop win, for a view showing both', () => {
        const { result } = renderHook(() => useDensity('comfortable'), {
            wrapper: ({ children }) => (
                <DensityProvider density="compact">{children}</DensityProvider>
            ),
        });

        expect(result.current).toBe('comfortable');
    });

    it('decides from a width at the threshold where the footer stops fitting', () => {
        expect(densityForWidth(300)).toBe('compact');
        expect(densityForWidth(419)).toBe('compact');
        expect(densityForWidth(420)).toBe('comfortable');
        expect(densityForWidth(300, 200)).toBe('comfortable');
    });

    describe('useAutoDensity', () => {
        /**
         * A ResizeObserver a test can fire.
         *
         * The shared setup stubs it to a no-op, so a hook built on one measures
         * nothing and its whole body is unreachable.
         */
        function installObserver() {
            const observers: Array<{ callback: ResizeObserverCallback; target: Element | null }> =
                [];
            const original = global.ResizeObserver;

            global.ResizeObserver = class {
                private readonly entry: {
                    callback: ResizeObserverCallback;
                    target: Element | null;
                };

                constructor(callback: ResizeObserverCallback) {
                    this.entry = { callback, target: null };
                    observers.push(this.entry);
                }
                observe(target: Element) {
                    this.entry.target = target;
                }
                unobserve() {}
                disconnect() {
                    this.entry.target = null;
                }
            } as unknown as typeof ResizeObserver;

            return {
                observers,
                restore: () => {
                    global.ResizeObserver = original;
                },
                resize: (width: number) =>
                    act(() => {
                        for (const observer of observers) {
                            if (!observer.target) continue;
                            observer.callback(
                                [{ contentRect: { width } }] as unknown as ResizeObserverEntry[],
                                {} as ResizeObserver,
                            );
                        }
                    }),
            };
        }

        it('assumes the narrow case until something is measured', () => {
            const harness = installObserver();

            try {
                const { result } = renderHook(() => useAutoDensity());

                // Guessing wide and correcting produces a visible reflow on
                // every mount in exactly the shape this library is for.
                expect(result.current.density).toBe('compact');
            } finally {
                harness.restore();
            }
        });

        it('follows the element it is attached to', () => {
            const harness = installObserver();

            try {
                const { result } = renderHook(() => useAutoDensity());
                act(() => result.current.ref(document.createElement('div')));

                harness.resize(900);
                expect(result.current.density).toBe('comfortable');

                harness.resize(320);
                expect(result.current.density).toBe('compact');
            } finally {
                harness.restore();
            }
        });

        it('honours a custom threshold', () => {
            const harness = installObserver();

            try {
                const { result } = renderHook(() => useAutoDensity(1000));
                act(() => result.current.ref(document.createElement('div')));

                harness.resize(900);
                expect(result.current.density).toBe('compact');
            } finally {
                harness.restore();
            }
        });
    });
});

// ─── Mark navigation ────────────────────────────────────────────────────────

describe('useMarkNavigation (T-38)', () => {
    const entries: TranscriptEntry[] = [
        { id: 'm0', kind: 'message', role: 'agent', text: 'a', streaming: false },
        {
            id: 't0',
            kind: 'tool',
            tool: { correlationId: 't0', kind: 'edit', title: 'Edit', status: 'completed' },
        },
        {
            id: 't1',
            kind: 'tool',
            tool: { correlationId: 't1', kind: 'read', title: 'Read', status: 'failed' },
        },
        {
            id: 't2',
            kind: 'tool',
            tool: { correlationId: 't2', kind: 'read', title: 'Read', status: 'failed' },
        },
    ] as TranscriptEntry[];

    it('shows every mark but steps only through what needs a person', () => {
        const { result } = renderHook(() => useMarkNavigation(entries));

        // The edit is on the ruler — "what changed" is worth scanning for — but
        // stepping onto it would make "next problem" stop twenty times in a run
        // that edited twenty files.
        expect(result.current.marks).toHaveLength(3);
        expect(result.current.navigable.map((mark) => mark.entryId)).toEqual(['t1', 't2']);
    });

    it('walks forwards and wraps', () => {
        const { result } = renderHook(() => useMarkNavigation(entries));

        act(() => void result.current.goNext());
        expect(result.current.activeEntryId).toBe('t1');

        act(() => void result.current.goNext());
        expect(result.current.activeEntryId).toBe('t2');

        // Wrapping, because a control that stops working at the end reads as
        // broken rather than as finished.
        act(() => void result.current.goNext());
        expect(result.current.activeEntryId).toBe('t1');
    });

    it('walks backwards', () => {
        const { result } = renderHook(() => useMarkNavigation(entries));

        act(() => result.current.setActive('t2'));
        act(() => void result.current.goPrevious());

        expect(result.current.activeEntryId).toBe('t1');
    });

    it('can be pointed at other kinds', () => {
        const { result } = renderHook(() => useMarkNavigation(entries, { kinds: ['edit'] }));
        expect(result.current.navigable.map((mark) => mark.entryId)).toEqual(['t0']);
    });

    it('does nothing when there is nothing to visit', () => {
        const { result } = renderHook(() => useMarkNavigation([]));
        act(() => expect(result.current.goNext()).toBeUndefined());
    });
});

// ─── useTranscript's failure path ───────────────────────────────────────────

describe('useTranscript', () => {
    it('keeps the value on a failed send, so it can be retried or edited', () => {
        const { result } = renderHook(() => useTranscript());
        const value: PromptValue = [
            { type: 'text', text: 'look at ' },
            { type: 'mention', id: 'file:a.ts', kind: 'file', label: 'a.ts' },
        ];

        let id = '';
        act(() => {
            id = result.current.sendUserMessage(value);
        });
        act(() => result.current.markFailed(id, 'Network error'));

        const entry = result.current.entries[0] as {
            delivery?: string;
            error?: string;
            value?: PromptValue;
        };
        expect(entry.delivery).toBe('failed');
        expect(entry.error).toBe('Network error');
        // The pinned mention survives, which is what makes edit-and-resend work.
        expect(entry.value).toEqual(value);
    });

    it('clears the error when a retry succeeds', () => {
        const { result } = renderHook(() => useTranscript());

        let id = '';
        act(() => {
            id = result.current.sendUserMessage([{ type: 'text', text: 'hi' }]);
        });
        act(() => result.current.markFailed(id, 'Network error'));
        act(() => result.current.markSent(id));

        const entry = result.current.entries[0] as { delivery?: string; error?: string };
        expect(entry.delivery).toBe('sent');
        expect(entry.error).toBeUndefined();
    });

    it('derives a display string when the caller does not supply one', () => {
        const { result } = renderHook(() => useTranscript());

        act(() => {
            result.current.sendUserMessage([
                { type: 'text', text: 'compare ' },
                { type: 'mention', id: 'a', kind: 'file', label: 'a.ts' },
            ]);
        });

        expect((result.current.entries[0] as { text: string }).text).toBe('compare a.ts');
    });

    it('resets', () => {
        const { result } = renderHook(() => useTranscript());

        act(() => {
            result.current.sendUserMessage([{ type: 'text', text: 'hi' }]);
        });
        expect(result.current.entries).toHaveLength(1);

        act(() => result.current.reset());
        expect(result.current.entries).toHaveLength(0);
    });
});
