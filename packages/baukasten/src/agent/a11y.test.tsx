/**
 * The accessibility sweep's findings, pinned.
 *
 * Every one of these is invisible to a sighted developer and to every other
 * check in the repo — a failed tool call *looked* different, a token *looked*
 * armed, arrowing through the menu *looked* like it was working. That is
 * exactly the class of thing that silently comes back.
 */

import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mentionTrigger } from './triggers';
import { toTranscriptAction } from './acp';
import type { MentionSource, PromptValue, ToolEntry, TranscriptEntry } from './types';
import { ToolCall } from './components/ToolCall';
import { Transcript } from './components/Transcript';
import { Approval } from './components/Approval';
import { AttachmentList } from './components/Attachment';
import { PromptEditor } from './components/PromptEditor';

function toolEntry(status: string, overrides: Record<string, unknown> = {}): ToolEntry {
    return {
        id: `t:${status}`,
        kind: 'tool',
        tool: { correlationId: 'c', kind: 'read', title: 'Read', status, ...overrides },
    } as ToolEntry;
}

describe('a failed tool call is distinguishable without colour', () => {
    it('says the status in the accessible name', () => {
        const { rerender } = render(<ToolCall entry={toolEntry('completed')} />);
        const completed = screen.getByRole('button').textContent;

        rerender(<ToolCall entry={toolEntry('failed')} />);
        const failed = screen.getByRole('button').textContent;

        // These were byte-identical: status was a codicon plus a colour, and
        // `Icon` is unconditionally aria-hidden.
        expect(completed).not.toBe(failed);
        expect(failed).toContain('Failed');
        expect(completed).toContain('Completed');
    });

    it('does so for every status, not only the interesting two', () => {
        for (const [status, word] of [
            ['pending', 'Pending'],
            ['running', 'Running'],
            ['completed', 'Completed'],
            ['failed', 'Failed'],
        ]) {
            const { unmount } = render(<ToolCall entry={toolEntry(status)} />);
            expect(screen.getByRole('button').textContent).toContain(word);
            unmount();
        }
    });

    it('and the ACP adapter now gives a failure something to render', () => {
        const action = toTranscriptAction({
            sessionUpdate: 'tool_call',
            toolCallId: 'x',
            title: 'Terminal',
            status: 'failed',
        });

        // ACP reports failure as a status and nothing else, so passing the wire
        // through untouched left `tool.error` undefined — the error row never
        // rendered and the only signal left was an aria-hidden glyph.
        expect(action).toMatchObject({
            type: 'agent/tool-call',
            tool: { error: { scope: 'execution' } },
        });
    });

    it('leaves a successful call with no error', () => {
        const action = toTranscriptAction({
            sessionUpdate: 'tool_call',
            toolCallId: 'x',
            title: 'Read',
            status: 'completed',
        });

        expect((action as { tool: { error?: unknown } }).tool.error).toBeUndefined();
    });
});

describe('the transcript is reachable and not deafening', () => {
    const entries: TranscriptEntry[] = [
        { id: 'm0', kind: 'message', role: 'agent', text: 'hello', streaming: false },
    ];

    it('can be focused, so long output is not pointer-only', () => {
        render(<Transcript entries={entries} />);

        // A transcript of plain messages contains nothing focusable. WCAG 2.1.1.
        expect(screen.getByRole('log')).toHaveAttribute('tabindex', '0');
    });

    it('announces additions rather than every text change', () => {
        render(<Transcript entries={entries} />);
        const log = screen.getByRole('log');

        // The default `aria-relevant` includes text changes, and this region is
        // full of streaming text — a message was re-announced on every chunk.
        expect(log).toHaveAttribute('aria-relevant', 'additions');
        expect(log).toHaveAttribute('aria-atomic', 'false');
    });
});

describe('the trigger menu implements the combobox pattern', () => {
    const source: MentionSource = {
        async search() {
            return {
                items: [
                    { id: 'a', kind: 'file', label: 'alpha.ts' },
                    { id: 'b', kind: 'file', label: 'beta.ts' },
                ],
            };
        },
    };

    function Harness({ withTriggers = true }: { withTriggers?: boolean }) {
        const [value, setValue] = useState<PromptValue>([]);
        return (
            <PromptEditor
                value={value}
                onChange={setValue}
                triggers={withTriggers ? [mentionTrigger(source)] : []}
            />
        );
    }

    function type(surface: HTMLElement, text: string) {
        surface.textContent = text;
        const range = document.createRange();
        range.selectNodeContents(surface);
        range.collapse(false);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
        fireEvent.input(surface);
    }

    it('is a combobox when it has something to pop up', () => {
        render(<Harness />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('is a plain textbox when it has not', () => {
        render(<Harness withTriggers={false} />);

        // Claiming the combobox role would promise a listbox that cannot exist.
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('points at the option the arrow keys landed on', async () => {
        render(<Harness />);
        const surface = screen.getByRole('combobox');

        type(surface, '@');
        await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2));

        // Without this, arrowing through results announced nothing: type `@`,
        // press down three times hearing silence, press Enter, and pin a
        // reference that was never named.
        const first = surface.getAttribute('aria-activedescendant');
        expect(first).toBeTruthy();
        expect(document.getElementById(first!)).toHaveTextContent('alpha.ts');

        fireEvent.keyDown(surface, { key: 'ArrowDown' });
        await waitFor(() => expect(surface.getAttribute('aria-activedescendant')).not.toBe(first));
        expect(
            document.getElementById(surface.getAttribute('aria-activedescendant')!),
        ).toHaveTextContent('beta.ts');
    });

    it('owns the listbox it points at', async () => {
        render(<Harness />);
        const surface = screen.getByRole('combobox');

        type(surface, '@');
        await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2));

        const controls = surface.getAttribute('aria-controls');
        expect(controls).toBeTruthy();
        expect(document.getElementById(controls!)).toHaveAttribute('role', 'listbox');
    });

    it('keeps the listbox free of non-options', async () => {
        render(<Harness />);
        const surface = screen.getByRole('combobox');

        type(surface, '@');
        await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2));

        // A listbox containing a heading and a status message is malformed, and
        // the practical cost was that an empty result set gave no signal at all.
        const listbox = screen.getByRole('listbox');
        expect(listbox.children).toHaveLength(2);
    });

    it('announces an empty result rather than leaving a silent box', async () => {
        render(<Harness />);
        const surface = screen.getByRole('combobox');

        type(surface, '@zzzz');

        // By text, not by role: the editor has a live region of its own, so
        // with the menu open there are legitimately two status regions and
        // asking for "the" one is ambiguous.
        const empty = await screen.findByText(/no matches/i);
        expect(empty).toHaveAttribute('role', 'status');

        // And it is not inside the listbox, which would make the listbox
        // malformed and the message neither an option nor a status.
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
});

describe('the armed token says so out loud', () => {
    const source: MentionSource = {
        async search() {
            return { items: [{ id: 'a', kind: 'file', label: 'alpha.ts' }] };
        },
    };

    function Harness() {
        const [value, setValue] = useState<PromptValue>([]);
        return (
            <PromptEditor value={value} onChange={setValue} triggers={[mentionTrigger(source)]} />
        );
    }

    async function pinned(): Promise<HTMLElement> {
        render(<Harness />);
        const surface = screen.getByRole('combobox');

        surface.textContent = '@alpha';
        const range = document.createRange();
        range.selectNodeContents(surface);
        range.collapse(false);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
        fireEvent.input(surface);

        await waitFor(() => expect(screen.getAllByRole('option').length).toBe(1));
        fireEvent.keyDown(surface, { key: 'Enter' });
        await waitFor(() => expect(surface.querySelector('[data-bk-token]')).not.toBeNull());

        return surface;
    }

    function caretAfterToken(surface: HTMLElement) {
        const token = surface.querySelector('[data-bk-token]')!;
        const range = document.createRange();
        range.setStartAfter(token);
        range.collapse(true);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
    }

    it('announces arming, which was previously a red outline and nothing else', async () => {
        const surface = await pinned();
        caretAfterToken(surface);

        fireEvent.keyDown(surface, { key: 'Backspace' });

        // Silence made the guard worse than none: the first press reads as a
        // keystroke that did not register, so the user presses again and the
        // reference disappears — also silently.
        await waitFor(() =>
            expect(screen.getByRole('status')).toHaveTextContent(/press Backspace again/i),
        );
    });

    it('announces the removal too', async () => {
        const surface = await pinned();
        caretAfterToken(surface);

        fireEvent.keyDown(surface, { key: 'Backspace' });
        fireEvent.keyDown(surface, { key: 'Backspace' });

        await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/removed/i));
    });
});

describe('focus survives a control removing itself', () => {
    it('on an approval, which replaces its buttons with an outcome', async () => {
        function Harness() {
            const [decided, setDecided] = useState(false);
            return (
                <Approval
                    entry={{
                        id: 'a:1',
                        kind: 'approval',
                        request: {
                            id: '1',
                            title: 'Run the tests',
                            options: [
                                { id: 'yes', label: 'Allow', outcome: 'allow', scope: 'once' },
                            ],
                        },
                        ...(decided
                            ? {
                                  decision: {
                                      optionId: 'yes',
                                      outcome: 'allow' as const,
                                      scope: { level: 'once' as const },
                                  },
                              }
                            : {}),
                    }}
                    onDecide={() => setDecided(true)}
                />
            );
        }

        const { container } = render(<Harness />);
        const button = screen.getByRole('button', { name: /Allow/ });
        button.focus();
        fireEvent.click(button);

        // Without somewhere to put it, focus fell to `<body>` and a keyboard
        // user lost their place in a transcript of hundreds of entries.
        await waitFor(() => expect(document.activeElement).not.toBe(document.body));
        expect(container.firstElementChild?.contains(document.activeElement)).toBe(true);
    });

    it('on an attachment row, where clearing several used to lose the place', async () => {
        function Harness() {
            const [items, setItems] = useState([
                { id: '1', name: 'a.png', kind: 'image' as const },
                { id: '2', name: 'b.png', kind: 'image' as const },
            ]);

            return (
                <AttachmentList
                    attachments={items}
                    onRemove={(id) => setItems((all) => all.filter((item) => item.id !== id))}
                />
            );
        }

        const { container } = render(<Harness />);
        const remove = screen.getByRole('button', { name: 'Remove a.png' });
        remove.focus();
        fireEvent.click(remove);

        await waitFor(() => expect(screen.queryByText('a.png')).not.toBeInTheDocument());
        expect(document.activeElement).not.toBe(document.body);
        expect(container.firstElementChild?.contains(document.activeElement)).toBe(true);
    });
});
