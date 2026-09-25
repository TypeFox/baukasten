import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ApprovalEntry, ApprovalOption } from '../../types';
import { serverId } from '../../types';
import { Approval } from './Approval';
import { ToolArguments } from './ToolArguments';

const alpha = serverId('alpha');

const OPTIONS: ApprovalOption[] = [
    { id: 'once', label: 'Allow', outcome: 'allow', scope: 'once', shortcut: 'accept' },
    { id: 'always', label: 'Always allow', outcome: 'allow', scope: 'tool' },
    { id: 'deny', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
];

function entry(overrides: Partial<ApprovalEntry> = {}): ApprovalEntry {
    return {
        id: 'a:1',
        kind: 'approval',
        request: {
            id: '1',
            title: 'Run the test suite',
            serverId: alpha,
            toolName: 'run_tests',
            options: OPTIONS,
        },
        ...overrides,
    };
}

describe('options', () => {
    it('renders whatever the caller offered, not a fixed pair', () => {
        render(<Approval entry={entry()} />);

        expect(screen.getByRole('button', { name: /^Allow/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Always allow/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reject/ })).toBeInTheDocument();
    });

    it('reports the option that was chosen', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.click(screen.getByRole('button', { name: /Always allow/ }));
        expect(onDecide).toHaveBeenCalledWith(
            expect.objectContaining({ optionId: 'always', outcome: 'allow' }),
        );
    });
});

describe('scopes (T-44)', () => {
    it('scopes an always-allow to the tool on its server', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.click(screen.getByRole('button', { name: /Always allow/ }));
        expect(onDecide.mock.calls[0][0].scope).toEqual({
            level: 'tool',
            serverId: alpha,
            toolName: 'run_tests',
        });
    });

    it('degrades to a one-off when there is no server identity to key on', () => {
        const onDecide = vi.fn();
        const withoutServer = entry();
        render(
            <Approval
                entry={{
                    ...withoutServer,
                    request: { ...withoutServer.request, serverId: undefined },
                }}
                onDecide={onDecide}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: /Always allow/ }));
        // A decision that cannot be scoped correctly must not be remembered
        // against the wrong thing.
        expect(onDecide.mock.calls[0][0].scope).toEqual({ level: 'once' });
    });
});

describe('keyboard', () => {
    it('accepts on Enter', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.keyDown(document, { key: 'Enter' });
        expect(onDecide).toHaveBeenCalledWith(expect.objectContaining({ optionId: 'once' }));
    });

    it('rejects on Escape', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onDecide).toHaveBeenCalledWith(expect.objectContaining({ optionId: 'deny' }));
    });

    it('addresses the rest by number, so a standing grant is not one keystroke', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.keyDown(document, { key: '2' });
        expect(onDecide).toHaveBeenCalledWith(expect.objectContaining({ optionId: 'always' }));
    });

    it('ignores keys once a decision has been made', () => {
        const onDecide = vi.fn();
        render(
            <Approval
                entry={entry({
                    decision: { optionId: 'once', outcome: 'allow', scope: { level: 'once' } },
                })}
                onDecide={onDecide}
            />,
        );

        fireEvent.keyDown(document, { key: 'Enter' });
        expect(onDecide).not.toHaveBeenCalled();
    });

    it('stays out of the way when switched off', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} keyboard={false} />);

        fireEvent.keyDown(document, { key: 'Enter' });
        expect(onDecide).not.toHaveBeenCalled();
    });
});

describe('shortcuts do not hijack typing (T-80)', () => {
    /**
     * The setup that would have caught this: an approval mounted *beside*
     * something the user types into, which is the only arrangement it is ever
     * used in. Every earlier test rendered the card alone, with nothing else
     * on the page consuming keystrokes.
     */
    function withComposer(onDecide: () => void) {
        render(
            <>
                <Approval entry={entry()} onDecide={onDecide} />
                <textarea aria-label="Message" />
                <div contentEditable aria-label="Editor" role="textbox" />
            </>,
        );
        return {
            textarea: screen.getByLabelText('Message'),
            editable: screen.getByLabelText('Editor'),
        };
    }

    it('ignores a digit typed into a textarea', () => {
        const onDecide = vi.fn();
        const { textarea } = withComposer(onDecide);

        // This used to fire options[1] — conventionally allow-always, a
        // standing grant — while the digit never reached the draft.
        fireEvent.keyDown(textarea, { key: '2' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('ignores a digit typed into a contenteditable', () => {
        const onDecide = vi.fn();
        const { editable } = withComposer(onDecide);

        fireEvent.keyDown(editable, { key: '2' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('ignores Shift+Enter, which is how a newline is typed', () => {
        const onDecide = vi.fn();
        const { textarea } = withComposer(onDecide);

        fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('ignores Shift+Enter even outside an editable', () => {
        const onDecide = vi.fn();
        render(<Approval entry={entry()} onDecide={onDecide} />);

        fireEvent.keyDown(document, { key: 'Enter', shiftKey: true });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('ignores Escape pressed in the composer', () => {
        const onDecide = vi.fn();
        const { editable } = withComposer(onDecide);

        // The editor only prevents Escape while its trigger menu is open, so a
        // bare Escape reached the document and denied the request.
        fireEvent.keyDown(editable, { key: 'Escape' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('ignores Enter pressed in the composer', () => {
        const onDecide = vi.fn();
        const { editable } = withComposer(onDecide);

        fireEvent.keyDown(editable, { key: 'Enter' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('still answers when nothing editable has focus', () => {
        const onDecide = vi.fn();
        withComposer(onDecide);

        // The ergonomics this listener exists for: a prompt appears mid-run and
        // is answered without first clicking into it.
        fireEvent.keyDown(document.body, { key: 'Enter' });

        expect(onDecide).toHaveBeenCalledWith(expect.objectContaining({ optionId: 'once' }));
    });

    it('treats a pinned token as inside the editor, not outside it', () => {
        const onDecide = vi.fn();
        render(
            <>
                <Approval entry={entry()} onDecide={onDecide} />
                <div contentEditable role="textbox" aria-label="Editor">
                    <span contentEditable={false} data-testid="token">
                        uploader.ts
                    </span>
                </div>
            </>,
        );

        // A token is `contenteditable="false"`, but the caret beside it is
        // still in the editor — a bare `[contenteditable]` check would have
        // let this through.
        fireEvent.keyDown(screen.getByTestId('token'), { key: '2' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('refuses to guess when two approvals are pending', () => {
        const onDecide = vi.fn();
        render(
            <>
                <Approval entry={entry({ id: 'a' })} onDecide={onDecide} />
                <Approval entry={entry({ id: 'b' })} onDecide={onDecide} />
            </>,
        );

        // Previously one keystroke answered whichever mounted first, with no
        // way for the user to tell which. Ambiguity in a consent surface
        // should fail closed.
        fireEvent.keyDown(document.body, { key: 'Enter' });

        expect(onDecide).not.toHaveBeenCalled();
    });

    it('answers again once the ambiguity is gone', () => {
        const onDecide = vi.fn();
        const { unmount } = render(<Approval entry={entry({ id: 'b' })} onDecide={onDecide} />);
        render(<Approval entry={entry({ id: 'a' })} onDecide={onDecide} />);

        fireEvent.keyDown(document.body, { key: 'Enter' });
        expect(onDecide).not.toHaveBeenCalled();

        // The registry has to track the listener's own lifetime, or the count
        // never comes back down and shortcuts stay dead for the session.
        unmount();
        fireEvent.keyDown(document.body, { key: 'Enter' });
        expect(onDecide).toHaveBeenCalledTimes(1);
    });
});

describe('resolved state', () => {
    it('keeps the card, showing what was decided', () => {
        render(
            <Approval
                entry={entry({
                    decision: { optionId: 'always', outcome: 'allow', scope: { level: 'once' } },
                })}
            />,
        );

        // Removing it loses the record of a decision the user may need to revisit.
        expect(screen.getByText('Always allow')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});

describe('severity', () => {
    it('is whatever the application said, and is not inferred', () => {
        const { container } = render(<Approval entry={entry()} severity="high" />);
        expect(container.querySelector('[data-severity="high"]')).not.toBeNull();
    });
});

describe('ToolArguments (T-45)', () => {
    it('renders a flat object as labelled fields', () => {
        render(<ToolArguments value={{ location: 'New York', units: 'metric' }} />);

        expect(screen.getByText('location')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
    });

    it('falls back to formatted JSON for anything nested', () => {
        render(<ToolArguments value={{ filter: { nested: true } }} />);
        expect(screen.getByText(/"nested": true/)).toBeInTheDocument();
    });

    it('truncates a long value but lets it be opened', () => {
        const long = 'x'.repeat(400);
        render(<ToolArguments value={{ body: long }} />);

        const expand = screen.getByRole('button', { name: /show all \(400\)/ });
        fireEvent.click(expand);

        // An exfiltration attempt is a long string value; hiding it silently
        // defeats the reason for showing arguments at all.
        expect(screen.getByText(long)).toBeInTheDocument();
    });

    it('renders nothing when there are no arguments', () => {
        const { container } = render(<ToolArguments value={undefined} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('survives a value that cannot be serialised', () => {
        const circular: Record<string, unknown> = {};
        circular.self = circular;

        expect(() => render(<ToolArguments value={circular} />)).not.toThrow();
    });
});
