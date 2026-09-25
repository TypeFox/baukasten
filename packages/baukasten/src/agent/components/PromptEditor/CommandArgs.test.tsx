import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { commandTrigger } from '../../triggers';
import { promptCommand } from '../../prompt';
import type { CommandSource, PromptValue } from '../../types';
import { PromptEditor } from './PromptEditor';

/**
 * A `/review` that declares two arguments, one required.
 *
 * The declarations are what makes a pinned command a small editor rather than
 * a chip — without them there is nothing to fill in and the token is finished
 * the moment it is created.
 */
const ALL = [
    {
        name: 'review',
        label: 'review',
        arguments: [
            { name: 'path', description: 'File to review', required: true },
            { name: 'depth' },
        ],
    },
    { name: 'explain', label: 'explain' },
];

const commands: CommandSource = {
    async search({ query }) {
        return { items: ALL.filter((item) => item.name.includes(query)) };
    },

    async completeArgument(command, argument, partial) {
        if (command !== 'review' || argument !== 'path') return [];
        return ['src/uploader.ts', 'src/queue.ts'].filter((path) => path.includes(partial));
    },
};

function Harness({ onValue }: { onValue?: (value: PromptValue) => void }) {
    const [value, setValue] = useState<PromptValue>([]);

    return (
        <PromptEditor
            value={value}
            onChange={(next) => {
                setValue(next);
                onValue?.(next);
            }}
            triggers={[commandTrigger(commands)]}
        />
    );
}

/**
 * The editing surface.
 *
 * `combobox`, not `textbox`: an editor with triggers owns a popup listbox, and
 * `aria-expanded` is discarded on a textbox in ARIA 1.2 — which is why arrowing
 * through results used to announce nothing at all.
 */
function surfaceOf(): HTMLElement {
    return screen.getByRole('combobox');
}

/**
 * Types a query and picks the highlighted result, which is how a command is
 * pinned.
 *
 * Finds the surface itself rather than being handed one, so the role it is
 * queried by lives in exactly one place.
 */
async function pick(query: string): Promise<HTMLElement> {
    const surface = surfaceOf();
    surface.textContent = query;

    const range = document.createRange();
    range.selectNodeContents(surface);
    range.collapse(false);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);

    fireEvent.input(surface);
    await waitFor(() => expect(screen.getAllByRole('option').length).toBeGreaterThan(0));
    fireEvent.keyDown(surface, { key: 'Enter' });

    // Returned so a test that needs the surface afterwards does not query again.
    return surface;
}

describe('a pinned command with arguments (T-70)', () => {
    it('offers a field for each declared argument', async () => {
        render(<Harness />);
        await pick('/review');

        await waitFor(() => expect(screen.getByLabelText('File to review')).toBeInTheDocument());
        // Falls back to the name when the source gave no description.
        expect(screen.getByLabelText('depth')).toBeInTheDocument();
    });

    it('puts what is typed into the value, under the argument name', async () => {
        const seen: PromptValue[] = [];
        render(<Harness onValue={(value) => seen.push(value)} />);
        await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.change(field, { target: { value: 'src/uploader.ts' } });

        await waitFor(() =>
            expect(promptCommand(seen[seen.length - 1])?.arguments).toEqual({
                path: 'src/uploader.ts',
            }),
        );
    });

    it('stays editable — changing a value does not re-pin the command', async () => {
        const seen: PromptValue[] = [];
        render(<Harness onValue={(value) => seen.push(value)} />);
        const surface = await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.change(field, { target: { value: 'src/queue.ts' } });
        await waitFor(() =>
            expect(promptCommand(seen[seen.length - 1])?.arguments.path).toBe('src/queue.ts'),
        );

        fireEvent.change(screen.getByLabelText('File to review'), {
            target: { value: 'src/uploader.ts' },
        });

        // One token throughout. The alternative — deleting and retyping the
        // command to change one value — is what this exists to avoid.
        await waitFor(() =>
            expect(promptCommand(seen[seen.length - 1])?.arguments.path).toBe('src/uploader.ts'),
        );
        expect(surface.querySelectorAll('[data-bk-token]')).toHaveLength(1);
    });

    it('offers completions from the source, filtered by what is typed', async () => {
        render(<Harness />);
        await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.focus(field);
        fireEvent.change(field, { target: { value: 'upl' } });

        await waitFor(() => {
            const list = document.querySelector('datalist');
            expect(list?.querySelectorAll('option')).toHaveLength(1);
        });
        expect(document.querySelector('datalist option')).toHaveValue('src/uploader.ts');
    });

    it('works when the source offers no completion at all', async () => {
        // `completeArgument` is optional on the interface, and plenty of
        // sources will not implement it.
        const bare: CommandSource = { search: commands.search };

        function Bare() {
            const [value, setValue] = useState<PromptValue>([]);
            return (
                <PromptEditor value={value} onChange={setValue} triggers={[commandTrigger(bare)]} />
            );
        }

        render(<Bare />);
        await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.focus(field);
        fireEvent.change(field, { target: { value: 'typed by hand' } });

        await waitFor(() => expect(field).toHaveValue('typed by hand'));
        expect(document.querySelector('datalist')).toBeNull();
    });

    it('does not let typing in an argument arm the command for deletion', async () => {
        render(<Harness />);
        const surface = await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.keyDown(field, { key: 'Backspace' });
        fireEvent.keyDown(field, { key: 'Backspace' });

        // The editor's Backspace handling arms and then removes the token
        // beside the caret. Inside a field it must do neither, or correcting a
        // typo would delete the command being corrected.
        expect(surface.querySelectorAll('[data-bk-token]')).toHaveLength(1);
    });

    it('marks a command whose required argument is still empty', async () => {
        render(<Harness />);
        await pick('/review');

        const field = await screen.findByLabelText('File to review');
        expect(field).toBeRequired();

        fireEvent.change(field, { target: { value: 'src/uploader.ts' } });
        await waitFor(() =>
            expect(screen.queryByLabelText('Required argument missing')).not.toBeInTheDocument(),
        );
    });

    it('leaves a command that declares nothing as a plain chip', async () => {
        render(<Harness />);
        const surface = await pick('/explain');

        await waitFor(() =>
            expect(surface.querySelector('[data-bk-token]')?.textContent).toBe('/explain'),
        );
        expect(screen.queryByRole('textbox', { name: 'path' })).not.toBeInTheDocument();
    });
});

describe('completion is optional at every level', () => {
    it('survives a source whose completeArgument rejects', async () => {
        const failing: CommandSource = {
            search: commands.search,
            completeArgument: vi.fn().mockRejectedValue(new Error('offline')),
        };

        function Failing() {
            const [value, setValue] = useState<PromptValue>([]);
            return (
                <PromptEditor
                    value={value}
                    onChange={setValue}
                    triggers={[commandTrigger(failing)]}
                />
            );
        }

        render(<Failing />);
        await pick('/review');

        const field = await screen.findByLabelText('File to review');
        fireEvent.focus(field);
        fireEvent.change(field, { target: { value: 'x' } });

        // A source that cannot answer is not the user's problem: the field
        // still takes what they type.
        await waitFor(() => expect(field).toHaveValue('x'));
    });
});
