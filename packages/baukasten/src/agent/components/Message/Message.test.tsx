import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { MessageEntry, PromptValue } from '../../types';
import { Message } from './Message';

function entry(overrides: Partial<MessageEntry> = {}): MessageEntry {
    return {
        id: 'm1',
        kind: 'message',
        role: 'agent',
        text: 'hello',
        streaming: false,
        ...overrides,
    };
}

describe('roles', () => {
    it('renders the three known roles differently', () => {
        const html = (['user', 'agent', 'system'] as const).map((role) => {
            const { container, unmount } = render(<Message entry={entry({ role })} />);
            const className = container.firstElementChild?.className ?? '';
            unmount();
            return className;
        });

        expect(new Set(html).size).toBe(3);
    });

    it('falls back to the agent treatment for a role it does not know', () => {
        expect(() => render(<Message entry={entry({ role: 'moderator' })} />)).not.toThrow();
    });

    it('renders a user turn as plain text, not markdown', () => {
        // The user did not write markdown; rendering it as such mangles pasted text.
        render(<Message entry={entry({ role: 'user', text: '**not bold**' })} />);
        expect(screen.getByText('**not bold**')).toBeInTheDocument();
    });

    it('renders an agent turn as markdown', () => {
        render(<Message entry={entry({ role: 'agent', text: '**bold**' })} />);
        expect(screen.getByText('bold').tagName).toBe('STRONG');
    });

    it('lets a caller replace the body entirely', () => {
        render(
            <Message entry={entry()}>
                <span>custom body</span>
            </Message>,
        );

        expect(screen.getByText('custom body')).toBeInTheDocument();
        expect(screen.queryByText('hello')).not.toBeInTheDocument();
    });
});

describe('delivery (T-23 / T-30)', () => {
    it('marks a message still in flight', () => {
        const { container } = render(
            <Message entry={entry({ role: 'user', delivery: 'pending' })} />,
        );

        expect(container.querySelector('[data-delivery="pending"]')).not.toBeNull();
    });

    it('keeps the text on screen when the send failed', () => {
        render(
            <Message
                entry={entry({
                    role: 'user',
                    text: 'the message I typed',
                    delivery: 'failed',
                    error: 'network died',
                })}
            />,
        );

        // The failure this component exists to prevent is losing the user's typing.
        expect(screen.getByText('the message I typed')).toBeInTheDocument();
        expect(screen.getByText('network died')).toBeInTheDocument();
    });

    it('offers a retry when the caller can act on one', () => {
        const onRetry = vi.fn();
        render(<Message entry={entry({ role: 'user', delivery: 'failed' })} onRetry={onRetry} />);

        fireEvent.click(screen.getByRole('button', { name: /retry/i }));
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('states the failure even when no retry is possible', () => {
        render(<Message entry={entry({ role: 'user', delivery: 'failed' })} />);

        expect(screen.getByText('Message was not sent.')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('shows no failure row for a delivered message', () => {
        render(<Message entry={entry({ role: 'user', delivery: 'sent' })} />);
        expect(screen.queryByText(/was not sent/i)).not.toBeInTheDocument();
    });
});

describe('attachments', () => {
    it('renders context chips above the text', () => {
        render(<Message entry={entry()} attachments={<span>uploader.ts</span>} />);
        expect(screen.getByText('uploader.ts')).toBeInTheDocument();
    });
});

describe('editing a past message (T-41)', () => {
    const value: PromptValue = [
        { type: 'text', text: 'compare ' },
        { type: 'mention', id: 'file:a.ts', kind: 'file', label: 'a.ts' },
        { type: 'text', text: ' with b' },
    ];

    const sent = entry({
        id: 'u0',
        role: 'user',
        text: 'compare a.ts with b',
        delivery: 'sent',
        value,
    });

    it('hands back the value, with its pinned tokens intact', () => {
        const onEdit = vi.fn();
        render(<Message entry={sent} onEdit={onEdit} />);

        fireEvent.click(screen.getByRole('button', { name: 'Edit message' }));

        // The whole point. A plain-string editor could only give back the label
        // `a.ts`; this gives back the mention, so the file the user actually
        // referenced returns rather than the text it rendered as.
        expect(onEdit).toHaveBeenCalledWith('u0', value);
        expect(onEdit.mock.calls[0][1][1]).toMatchObject({ type: 'mention', id: 'file:a.ts' });
    });

    it('offers nothing to edit when the value did not survive', () => {
        // A message rebuilt from a transport that carried only a display string
        // has nothing to restore, and an affordance returning the labels would
        // be worse than none.
        render(<Message entry={{ ...sent, value: undefined }} onEdit={() => undefined} />);
        expect(screen.queryByRole('button', { name: 'Edit message' })).not.toBeInTheDocument();
    });

    it('is offered on a user turn only', () => {
        render(<Message entry={{ ...sent, role: 'agent' }} onEdit={() => undefined} />);
        expect(screen.queryByRole('button', { name: 'Edit message' })).not.toBeInTheDocument();
    });

    it('is offered on a failed send too, where it doubles as the retry value', () => {
        render(
            <Message
                entry={{ ...sent, delivery: 'failed', error: 'Network error' }}
                onEdit={() => undefined}
                onRetry={() => undefined}
            />,
        );

        // Retrying a failed send and editing one that succeeded want the same
        // affordance and the same restored value.
        expect(screen.getByRole('button', { name: 'Edit message' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Retry/ })).toBeInTheDocument();
    });

    it('passes the entry id, so one handler serves the transcript', () => {
        const onRetry = vi.fn();
        render(<Message entry={{ ...sent, delivery: 'failed' }} onRetry={onRetry} />);

        fireEvent.click(screen.getByRole('button', { name: /Retry/ }));
        expect(onRetry).toHaveBeenCalledWith('u0');
    });
});
