import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToolEntry, ToolInvocation } from '../../types';
import { ToolCall } from './ToolCall';
import { formatElapsed } from './useElapsed';

function entry(tool: Partial<ToolInvocation> = {}, rest: Partial<ToolEntry> = {}): ToolEntry {
    return {
        id: 't:c1',
        kind: 'tool',
        tool: {
            correlationId: 'c1',
            kind: 'read',
            title: 'Read',
            status: 'completed',
            ...tool,
        },
        ...rest,
    };
}

describe('status (T-31)', () => {
    it('distinguishes all four statuses, not just running and done', () => {
        for (const status of ['pending', 'running', 'completed', 'failed'] as const) {
            const { container, unmount } = render(<ToolCall entry={entry({ status })} />);
            expect(container.querySelector(`[data-status="${status}"]`)).not.toBeNull();
            unmount();
        }
    });

    it('shows the target, with the full value available on hover', () => {
        render(<ToolCall entry={entry({ target: 'src/services/telemetry/uploader.ts' })} />);
        const target = screen.getByTitle('src/services/telemetry/uploader.ts');
        expect(target).toBeInTheDocument();
    });

    it('prefers a server-supplied icon over the local kind mapping', () => {
        render(<ToolCall entry={entry({ icons: [{ src: 'https://example.test/tool.png' }] })} />);

        const img = document.querySelector('img');
        expect(img).not.toBeNull();
        expect(img?.getAttribute('src')).toBe('https://example.test/tool.png');
    });

    it('renders a kind it has never seen without breaking', () => {
        expect(() => render(<ToolCall entry={entry({ kind: 'teleport' })} />)).not.toThrow();
    });
});

describe('expansion', () => {
    it('does not offer expansion when there is no body', () => {
        render(<ToolCall entry={entry()} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('expands and collapses a body', () => {
        render(<ToolCall entry={entry()}>output text</ToolCall>);

        expect(screen.queryByText('output text')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('output text')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByText('output text')).not.toBeInTheDocument();
    });
});

describe('long-running calls (T-32)', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('stays quiet for a short call', () => {
        render(<ToolCall entry={entry({ status: 'running' })} />);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        // A timer on every one-second read turns the transcript into a stopwatch.
        expect(screen.queryByText(/\ds/)).not.toBeInTheDocument();
    });

    it('shows elapsed time once a call has actually been a while', () => {
        render(<ToolCall entry={entry({ status: 'running' })} />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(screen.getByText('5s')).toBeInTheDocument();
    });

    it('shows the last line of output while running', () => {
        render(<ToolCall entry={entry({ status: 'running' })} tail="compiling module 12 of 40" />);
        expect(screen.getByText('compiling module 12 of 40')).toBeInTheDocument();
    });

    it('goes back to the target once the call finishes', () => {
        render(
            <ToolCall entry={entry({ status: 'completed', target: 'a.ts' })} tail="stale line" />,
        );

        expect(screen.queryByText('stale line')).not.toBeInTheDocument();
        expect(screen.getByTitle('a.ts')).toBeInTheDocument();
    });

    it('renders a determinate bar when progress has a total', () => {
        render(
            <ToolCall entry={entry({ status: 'running', progress: { value: 3, total: 10 } })} />,
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders no bar when progress has no total to measure against', () => {
        render(<ToolCall entry={entry({ status: 'running', progress: { value: 3 } })} />);
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
});

describe('formatElapsed', () => {
    it('uses seconds below a minute and mm:ss above it', () => {
        expect(formatElapsed(5000)).toBe('5s');
        expect(formatElapsed(59_000)).toBe('59s');
        expect(formatElapsed(64_000)).toBe('1:04');
        expect(formatElapsed(600_000)).toBe('10:00');
    });
});

describe('error taxonomy (T-33)', () => {
    it('shows an execution failure without dressing it as a breakage', () => {
        const { container } = render(
            <ToolCall
                entry={entry({
                    status: 'failed',
                    error: { scope: 'execution', message: 'Invalid departure date' },
                })}
            />,
        );

        expect(screen.getByText('Invalid departure date')).toBeInTheDocument();
        // The card border is only reddened for a protocol failure.
        expect(container.firstElementChild?.className).not.toMatch(/failed/);
    });

    it('marks a protocol failure as something needing attention', () => {
        const { container } = render(
            <ToolCall
                entry={entry({
                    status: 'failed',
                    error: { scope: 'protocol', message: 'Unknown tool', code: -32602 },
                })}
            />,
        );

        expect(screen.getByText('Unknown tool')).toBeInTheDocument();
        expect(container.firstElementChild?.className).toMatch(/failed/);
    });

    it('renders the two scopes differently', () => {
        const { container: execution } = render(
            <ToolCall entry={entry({ error: { scope: 'execution', message: 'x' } })} />,
        );
        const { container: protocol } = render(
            <ToolCall entry={entry({ error: { scope: 'protocol', message: 'x' } })} />,
        );

        expect(execution.innerHTML).not.toBe(protocol.innerHTML);
    });
});

describe('blocked calls', () => {
    it('says a call is waiting rather than looking finished', () => {
        render(
            <ToolCall
                entry={entry(
                    { status: 'running' },
                    {
                        inputRequests: [
                            { key: 'k', kind: 'form', message: 'Which branch?', schema: {} },
                        ],
                    },
                )}
            />,
        );

        expect(screen.getByText(/waiting for input/i)).toBeInTheDocument();
    });
});
