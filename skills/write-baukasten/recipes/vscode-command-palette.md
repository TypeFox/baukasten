# Command Palette

A `Cmd/Ctrl+Shift+P`-style fuzzy command launcher. Modal overlay anchored at the top of the viewport, single-letter search filter, keyboard-navigable result list, Enter to run. Composes `Modal`, `Input`, and `Menu` / `MenuItem`.

Cross-references:

- [Modal](../references/core-components.md#modal)
- [Input](../references/core-components.md#input)
- [Menu & MenuItem](../references/extra-components.md#menu--menuitem)
- [Text](../references/core-components.md#typography-text), [Icon](../references/core-components.md#icon)

## Pattern

The Modal hosts a search Input and a Menu. The Menu's items are filtered by a fuzzy match against the query string. `ArrowUp` / `ArrowDown` move a highlight index; `Enter` invokes the highlighted command; `Escape` closes via Modal's built-in handling.

```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Input, Modal, ModalBody, Text } from 'baukasten-ui/core';
import { Menu, MenuItem } from 'baukasten-ui/extra';
import type { CodiconName } from 'baukasten-ui/core';

interface Command {
    id: string;
    title: string;
    category?: string;
    shortcut?: string;
    icon?: CodiconName;
    run: () => void;
}

interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
    commands: Command[];
}

function fuzzyMatch(query: string, text: string): boolean {
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    let i = 0;
    for (const ch of t) {
        if (ch === q[i]) i++;
        if (i === q.length) return true;
    }
    return q.length === 0;
}

export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
    const [query, setQuery] = useState('');
    const [highlight, setHighlight] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset state and focus the input each time the palette opens
    useEffect(() => {
        if (open) {
            setQuery('');
            setHighlight(0);
            queueMicrotask(() => inputRef.current?.focus());
        }
    }, [open]);

    const filtered = useMemo(
        () => commands.filter((c) => fuzzyMatch(query, `${c.category ?? ''} ${c.title}`)),
        [commands, query],
    );

    // Keep highlight within bounds when results change
    useEffect(() => {
        setHighlight((h) => Math.min(h, Math.max(0, filtered.length - 1)));
    }, [filtered]);

    const runHighlighted = () => {
        const cmd = filtered[highlight];
        if (!cmd) return;
        cmd.run();
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            runHighlighted();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="lg"
            backdropVariant="blur"
            closeOnEscape
            closeOnBackdropClick
        >
            <ModalBody>
                <Input
                    ref={inputRef}
                    fullWidth
                    placeholder="Type a command…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div
                    style={{ maxHeight: 360, overflowY: 'auto', marginTop: 'var(--bk-spacing-3)' }}
                >
                    {filtered.length === 0 ? (
                        <Text block color="muted" align="center">
                            No matching commands
                        </Text>
                    ) : (
                        <Menu>
                            {filtered.map((cmd, i) => (
                                <MenuItem
                                    key={cmd.id}
                                    icon={cmd.icon ? <Icon name={cmd.icon} /> : undefined}
                                    selected={i === highlight}
                                    onMouseEnter={() => setHighlight(i)}
                                    onClick={() => {
                                        cmd.run();
                                        onClose();
                                    }}
                                    rightContent={
                                        cmd.shortcut ? (
                                            <Text size="xs" color="muted">
                                                {cmd.shortcut}
                                            </Text>
                                        ) : undefined
                                    }
                                >
                                    {cmd.category && (
                                        <>
                                            <Text size="xs" color="muted">
                                                {cmd.category}:
                                            </Text>{' '}
                                        </>
                                    )}
                                    {cmd.title}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </div>
            </ModalBody>
        </Modal>
    );
}
```

## Triggering

Mount once at the application root and bind a global shortcut:

```tsx
export function App() {
    const [paletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                setPaletteOpen(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <YourApp />
            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                commands={ALL_COMMANDS}
            />
        </>
    );
}
```

## Notes

- **Modal handles `Escape` and backdrop click** — don't reimplement; just keep `closeOnEscape` and `closeOnBackdropClick` enabled (they're the defaults).
- **Highlight tracking**: keeping `highlight` in state (not the DOM) lets the same model drive keyboard _and_ hover. `MenuItem`'s `selected` prop is the styling hook.
- **Avoid `Menu`'s own keyboard handling fighting yours**: the example puts keyboard listeners on the `Input`, which still has focus while the user types. The Menu items don't take focus — they're driven by the highlight index instead.
- **Fuzzy matching** here is a simple in-order subsequence test; swap in `fuse.js` or similar for ranked matches without changing the surrounding component.
- **Big command lists**: if you have thousands of commands, slice `filtered` to the top 50 before mapping — Menu is not virtualized.
