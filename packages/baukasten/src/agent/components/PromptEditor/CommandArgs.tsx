import React, { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CommandArgument, CommandSource, PromptCommandNode } from '../../types';
import * as styles from './PromptEditor.css';

export interface CommandArgsProps {
    node: PromptCommandNode;
    /** What the source declared. Values live on the node. */
    args: readonly CommandArgument[];
    /** Supplies `completeArgument`, when the source offers it. */
    source?: CommandSource;
    onChange: (node: PromptCommandNode) => void;
}

/**
 * One argument's input, with completion when the source offers any.
 *
 * Completion is optional at every level — the source may not implement
 * `completeArgument`, and one that does may return nothing — so the input is
 * always usable on its own. A field that only works when a server answers is
 * a field that stops working when it does not.
 */
function ArgumentField({
    argument,
    value,
    source,
    command,
    onChange,
}: {
    argument: CommandArgument;
    value: string;
    source?: CommandSource;
    command: string;
    onChange: (next: string) => void;
}) {
    const [suggestions, setSuggestions] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const id = useId();
    const listId = `${id}-list`;

    // Sized to its content, because an argument row lives inline in a sentence
    // and a fixed-width box would push the rest of the prompt around as it is
    // typed into.
    const width = `${Math.max(argument.name.length, value.length) + 1}ch`;

    const abort = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!source?.completeArgument || !open) return;

        abort.current?.abort();
        const controller = new AbortController();
        abort.current = controller;

        void source
            .completeArgument(command, argument.name, value, controller.signal)
            .then((results) => {
                if (!controller.signal.aborted) setSuggestions(results);
            })
            .catch(() => {
                // A source that cannot complete is not an error the user needs
                // to see; the field still works by hand.
                if (!controller.signal.aborted) setSuggestions([]);
            });

        return () => controller.abort();
    }, [source, command, argument.name, value, open]);

    return (
        <span className={styles.argField}>
            <input
                className={styles.argInput}
                style={{ width }}
                value={value}
                size={1}
                placeholder={argument.name}
                required={argument.required}
                aria-label={argument.description ?? argument.name}
                // `list` is the browser's own completion UI, which is keyboard
                // accessible, positions itself and does not fight the editor's
                // selection the way a custom popup inside a contentEditable
                // would. The trigger menu is a custom popup because it has to
                // be; this does not.
                list={suggestions.length > 0 ? listId : undefined}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={(event) => onChange(event.target.value)}
                // The editor's own Backspace handling arms and removes tokens.
                // Inside an argument it must do neither, or typing in a field
                // would delete the command the field belongs to.
                onKeyDown={(event) => event.stopPropagation()}
            />

            {suggestions.length > 0 && (
                <datalist id={listId}>
                    {suggestions.map((suggestion) => (
                        <option key={suggestion} value={suggestion} />
                    ))}
                </datalist>
            )}
        </span>
    );
}

/**
 * A pinned command, as a small structured editor rather than an opaque chip.
 *
 * A prompt declares its arguments, and the user has to fill them in *after*
 * picking the command — so the token cannot be a finished thing the moment it
 * is created. It also has to stay editable indefinitely: changing one value
 * should not mean deleting the command and retyping it, which is what an
 * opaque chip forces.
 *
 * Rendered through a portal into the token's own `contentEditable={false}`
 * element, so the browser still treats the whole thing as one atomic unit for
 * arrow keys and selection while the inputs inside it edit independently.
 */
export const CommandArgs: React.FC<CommandArgsProps> = ({ node, args, source, onChange }) => {
    const missing = args.some(
        (argument) => argument.required && !(node.arguments[argument.name] ?? '').trim(),
    );

    return (
        <span className={clsx(styles.commandToken, missing && styles.commandTokenIncomplete)}>
            <span className={styles.commandName}>/{node.name}</span>

            {args.map((argument) => (
                <ArgumentField
                    key={argument.name}
                    argument={argument}
                    command={node.name}
                    source={source}
                    value={node.arguments[argument.name] ?? ''}
                    onChange={(next) =>
                        onChange({
                            ...node,
                            arguments: { ...node.arguments, [argument.name]: next },
                        })
                    }
                />
            ))}

            {missing && (
                <Icon
                    name="warning"
                    size="xs"
                    className={styles.commandWarning}
                    aria-label="Required argument missing"
                />
            )}
        </span>
    );
};

CommandArgs.displayName = 'CommandArgs';
