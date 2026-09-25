import { useState } from 'react';
import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { commandTrigger, mentionTrigger } from '../../triggers';
import type { CommandSource, MentionSource, PromptValue } from '../../types';
import { PromptEditor } from './PromptEditor';

const commands: CommandSource = {
    async search({ query }) {
        return {
            items: [
                { name: 'test', label: 'test' },
                { name: 'review', label: 'review' },
            ].filter((item) => item.name.includes(query)),
        };
    },
};

const source: MentionSource = {
    async search({ query }) {
        const all = ['alpha.ts', 'beta.ts', 'gamma.ts'];
        return {
            items: all
                .filter((name) => name.includes(query))
                .map((name) => ({ id: `file:${name}`, kind: 'file' as const, label: name })),
        };
    },
};

function Harness({
    char = '@',
    withCommands = false,
    onValue,
}: {
    char?: string;
    withCommands?: boolean;
    onValue?: (value: PromptValue) => void;
}) {
    const [value, setValue] = useState<PromptValue>([]);
    return (
        <PromptEditor
            value={value}
            onChange={(next) => {
                setValue(next);
                onValue?.(next);
            }}
            triggers={
                withCommands
                    ? [commandTrigger(commands), mentionTrigger(source, { char })]
                    : [mentionTrigger(source, { char })]
            }
        />
    );
}

/**
 * jsdom has no layout, so the caret has to be placed by hand and the menu's
 * anchor falls back to the editor's (zero-sized) rect. Neither affects the
 * behaviour under test — which option is highlighted is a matter of state, not
 * geometry.
 */
function type(surface: HTMLElement, text: string): void {
    surface.textContent = text;

    const range = document.createRange();
    range.selectNodeContents(surface);
    range.collapse(false);

    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);

    fireEvent.input(surface);
}

/**
 * The editing surface.
 *
 * `combobox`, not `textbox`: an editor with triggers owns a popup listbox, and
 * `aria-expanded` is discarded on a textbox in ARIA 1.2 — which is why arrowing
 * through results used to announce nothing at all. An editor configured with no
 * triggers is still a textbox.
 */
function surfaceOf(): HTMLElement {
    return screen.getByRole('combobox');
}

async function openMenu(char = '@') {
    render(<Harness char={char} />);
    const surface = surfaceOf();

    type(surface, char);
    await waitFor(() => expect(screen.getAllByRole('option').length).toBeGreaterThan(0));

    return surface;
}

function activeLabel(): string | undefined {
    return (
        screen
            .getAllByRole('option')
            .find((option) => option.getAttribute('aria-selected') === 'true')?.textContent ??
        undefined
    );
}

describe('menu navigation', () => {
    it('starts on the first result', async () => {
        await openMenu();
        expect(activeLabel()).toBe('alpha.ts');
    });

    it('keeps the highlight where the arrow key put it', async () => {
        const surface = await openMenu();

        // The regression: ArrowDown moved the highlight on keydown, and the
        // keyup that followed re-ran trigger detection and reset it to zero —
        // so the menu appeared frozen on the first item no matter how many
        // times you pressed down.
        fireEvent.keyDown(surface, { key: 'ArrowDown' });
        fireEvent.keyUp(surface, { key: 'ArrowDown' });

        expect(activeLabel()).toBe('beta.ts');
    });

    it('moves further on a second press', async () => {
        const surface = await openMenu();

        for (let press = 0; press < 2; press++) {
            fireEvent.keyDown(surface, { key: 'ArrowDown' });
            fireEvent.keyUp(surface, { key: 'ArrowDown' });
        }

        expect(activeLabel()).toBe('gamma.ts');
    });

    it('wraps around the end', async () => {
        const surface = await openMenu();

        for (let press = 0; press < 3; press++) {
            fireEvent.keyDown(surface, { key: 'ArrowDown' });
            fireEvent.keyUp(surface, { key: 'ArrowDown' });
        }

        expect(activeLabel()).toBe('alpha.ts');
    });

    it('moves backwards, wrapping to the end', async () => {
        const surface = await openMenu();

        fireEvent.keyDown(surface, { key: 'ArrowUp' });
        fireEvent.keyUp(surface, { key: 'ArrowUp' });

        expect(activeLabel()).toBe('gamma.ts');
    });

    it('returns to the first result when the query changes', async () => {
        const surface = await openMenu();

        fireEvent.keyDown(surface, { key: 'ArrowDown' });
        fireEvent.keyUp(surface, { key: 'ArrowDown' });
        expect(activeLabel()).toBe('beta.ts');

        // Now completing something else, so the old highlight is meaningless.
        type(surface, '@a');
        await waitFor(() => expect(activeLabel()).toBe('alpha.ts'));
    });
});

describe('deleting a pinned token', () => {
    /** The exact reported sequence: `/`, pick, backspace back out again. */
    async function pinCommand() {
        const seen: PromptValue[] = [];
        render(<Harness withCommands onValue={(value) => seen.push(value)} />);
        const surface = surfaceOf();

        type(surface, '/');
        await waitFor(() => expect(screen.getAllByRole('option').length).toBeGreaterThan(0));

        fireEvent.keyDown(surface, { key: 'Enter' });
        await waitFor(() => expect(surface.querySelector('[data-bk-token]')).not.toBeNull());

        return { surface, seen };
    }

    /**
     * Puts the caret immediately after the token.
     *
     * Not `setStart(surface, 1)` — inserting a token splits the text node
     * around it, so index 0 is an empty text node rather than the token.
     * `setStartAfter` sidesteps the layout entirely, and matches where the
     * caret really is once the trailing space has been backspaced away.
     */
    function caretAfterToken(surface: HTMLElement): Selection {
        const token = surface.querySelector('[data-bk-token]')!;
        const range = document.createRange();
        range.setStartAfter(token);
        range.collapse(true);

        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    }

    it('pins the command as a token', async () => {
        const { surface } = await pinCommand();
        expect(surface.querySelector('[data-bk-token]')?.textContent).toBe('/test');
    });

    it('arms on the first backspace and removes on the second', async () => {
        const { surface } = await pinCommand();

        caretAfterToken(surface);

        // The first press only arms it — a pinned reference should not be lost
        // to a keystroke aimed at the space beside it.
        fireEvent.keyDown(surface, { key: 'Backspace' });
        expect(surface.querySelector('[data-bk-token]')).not.toBeNull();

        fireEvent.keyDown(surface, { key: 'Backspace' });
        expect(surface.querySelector('[data-bk-token]')).toBeNull();
    });

    it('leaves the caret inside the editor, not adrift', async () => {
        const { surface } = await pinCommand();

        const selection = caretAfterToken(surface);

        fireEvent.keyDown(surface, { key: 'Backspace' });
        fireEvent.keyDown(surface, { key: 'Backspace' });

        // The reported symptom was the caret ending up after the placeholder.
        // It has to remain somewhere inside the editing host.
        expect(selection.rangeCount).toBe(1);
        expect(surface.contains(selection.anchorNode)).toBe(true);
    });

    it('marks the editor empty once everything is gone', async () => {
        const { surface } = await pinCommand();

        caretAfterToken(surface);

        fireEvent.keyDown(surface, { key: 'Backspace' });
        fireEvent.keyDown(surface, { key: 'Backspace' });

        surface.textContent = '';
        fireEvent.input(surface);

        // `data-empty` is what shows the placeholder. Its positioning — the
        // other half of the reported bug — is a CSS matter jsdom cannot judge.
        await waitFor(() => expect(surface.getAttribute('data-empty')).toBe('true'));
    });
});

describe('Enter with no matches (T-81)', () => {
    function HarnessWithSubmit({ onSubmit }: { onSubmit: (value: PromptValue) => void }) {
        const [value, setValue] = useState<PromptValue>([]);
        return (
            <PromptEditor
                value={value}
                onChange={setValue}
                onSubmit={onSubmit}
                triggers={[mentionTrigger(source)]}
            />
        );
    }

    it('sends rather than inserting a newline', async () => {
        const onSubmit = vi.fn();
        render(<HarnessWithSubmit onSubmit={onSubmit} />);
        const surface = surfaceOf();

        type(surface, 'review @zzzz');
        await waitFor(() => expect(screen.getByText(/no matches/i)).toBeInTheDocument());

        const event = createEvent.keyDown(surface, { key: 'Enter' });
        fireEvent(surface, event);

        // Previously this returned without preventDefault, so the browser
        // inserted a newline instead of sending — and the un-prevented
        // keystroke went on to accept any pending approval.
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(event.defaultPrevented).toBe(true);
    });

    it('closes the menu on the way', async () => {
        render(<HarnessWithSubmit onSubmit={() => undefined} />);
        const surface = surfaceOf();

        type(surface, 'review @zzzz');
        await waitFor(() => expect(screen.getByText(/no matches/i)).toBeInTheDocument());

        fireEvent.keyDown(surface, { key: 'Enter' });

        await waitFor(() => expect(screen.queryByText(/no matches/i)).not.toBeInTheDocument());
    });

    it('still picks the highlighted result when there is one', async () => {
        const onSubmit = vi.fn();
        render(<HarnessWithSubmit onSubmit={onSubmit} />);
        const surface = surfaceOf();

        type(surface, '@alpha');
        await waitFor(() => expect(screen.getAllByRole('option').length).toBeGreaterThan(0));

        fireEvent.keyDown(surface, { key: 'Enter' });

        // Enter pins; it must not also send.
        expect(onSubmit).not.toHaveBeenCalled();
        expect(surface.querySelector('[data-bk-token]')).not.toBeNull();
    });
});

describe('configurable trigger characters', () => {
    it('opens on whatever character the trigger declares', async () => {
        await openMenu('#');
        expect(screen.getAllByRole('option')).toHaveLength(3);
    });

    it('does not open on a character no trigger claims', async () => {
        render(<Harness char="#" />);
        const surface = surfaceOf();

        type(surface, '@');

        // Give the menu every chance to appear before concluding it did not.
        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
});
