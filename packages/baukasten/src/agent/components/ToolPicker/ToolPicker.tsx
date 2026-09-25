import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import type { ServerDescriptor, ToolDescriptor } from '../../servers';
import type { ServerId } from '../../types';
import * as styles from './ToolPicker.css';

export interface ToolPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    tools: readonly ToolDescriptor[];
    /**
     * Names of the tools currently exposed to the model, keyed by server.
     *
     * Keyed rather than a flat set of names because two servers exposing
     * `search` is the specification's own collision example — a flat set would
     * turn one off and take the other with it.
     */
    enabled: Readonly<Record<string, readonly string[]>>;
    onChange: (enabled: Readonly<Record<string, readonly string[]>>) => void;
    /** Supplies display names for the group headings. */
    servers?: readonly ServerDescriptor[];
    /** Shows a per-server count of what is exposed. @default true */
    showCounts?: boolean;
    empty?: React.ReactNode;
}

function isEnabled(
    enabled: Readonly<Record<string, readonly string[]>>,
    tool: ToolDescriptor,
): boolean {
    return (enabled[tool.serverId] ?? []).includes(tool.name);
}

/**
 * Which tools the model can see.
 *
 * The specification asks applications to make this visible, and the reason is
 * not tidiness: every loaded definition costs context before anyone types, so
 * this is the control that makes {@link UsageMeter}'s numbers actionable.
 *
 * **Rejected tools are shown, not hidden.** A client on Streamable HTTP must
 * exclude tools whose `x-mcp-header` values are invalid, and should log the
 * name and the reason. Dropping them from the list silently is how a missing
 * tool becomes a support ticket; listing it as unavailable *with the reason*
 * is how it answers itself. They render disabled — there is nothing to toggle
 * — but they render.
 *
 * Grouped and keyed by the client-minted server id throughout, because a bare
 * tool name does not identify a tool.
 *
 * @example
 * ```tsx
 * <ToolPicker tools={tools} servers={servers} enabled={enabled} onChange={setEnabled} />
 * ```
 */
export const ToolPicker: React.FC<ToolPickerProps> = ({
    tools,
    enabled,
    onChange,
    servers,
    showCounts = true,
    empty,
    className,
    ...props
}) => {
    const groups = useMemo(() => {
        const byServer = new Map<ServerId, ToolDescriptor[]>();

        for (const tool of tools) {
            const existing = byServer.get(tool.serverId);
            if (existing) existing.push(tool);
            else byServer.set(tool.serverId, [tool]);
        }

        return [...byServer.entries()].map(([id, list]) => ({
            id,
            name: servers?.find((server) => server.id === id)?.name ?? id,
            tools: list,
        }));
    }, [tools, servers]);

    const toggle = (tool: ToolDescriptor, next: boolean) => {
        const current = enabled[tool.serverId] ?? [];

        onChange({
            ...enabled,
            [tool.serverId]: next
                ? [...current, tool.name]
                : current.filter((name) => name !== tool.name),
        });
    };

    /** Turns a whole server on or off, which is what anyone wants first. */
    const toggleServer = (group: (typeof groups)[number], next: boolean) => {
        onChange({
            ...enabled,
            [group.id]: next
                ? group.tools
                      .filter((tool) => (tool.availability ?? 'available') === 'available')
                      .map((tool) => tool.name)
                : [],
        });
    };

    if (groups.length === 0) {
        return empty ? <div className={clsx(styles.empty, className)}>{empty}</div> : null;
    }

    return (
        <div className={clsx(styles.picker, className)} {...props}>
            {groups.map((group) => {
                const available = group.tools.filter(
                    (tool) => (tool.availability ?? 'available') === 'available',
                );
                const on = available.filter((tool) => isEnabled(enabled, tool));

                return (
                    <section key={group.id} className={styles.group}>
                        <header className={styles.groupHeader}>
                            <Checkbox
                                checked={on.length > 0 && on.length === available.length}
                                // Some but not all: the control has to say so,
                                // or turning a server "off" from a half state
                                // looks like it did nothing.
                                indeterminate={on.length > 0 && on.length < available.length}
                                aria-label={`All tools from ${group.name}`}
                                onChange={(event) => toggleServer(group, event.target.checked)}
                            />

                            <span className={styles.groupName} title={group.id}>
                                {group.name}
                            </span>

                            {showCounts && (
                                <span className={styles.count}>
                                    {on.length}/{available.length}
                                </span>
                            )}
                        </header>

                        <ul className={styles.tools}>
                            {group.tools.map((tool) => {
                                const availability = tool.availability ?? 'available';
                                const usable = availability === 'available';

                                return (
                                    <li
                                        key={tool.name}
                                        className={styles.tool({ usable })}
                                        data-availability={availability}
                                    >
                                        <Checkbox
                                            checked={usable && isEnabled(enabled, tool)}
                                            disabled={!usable}
                                            aria-label={tool.title ?? tool.name}
                                            onChange={(event) => toggle(tool, event.target.checked)}
                                        />

                                        <div className={styles.toolBody}>
                                            <span className={styles.toolName}>
                                                {tool.title ?? tool.name}
                                                {tool.tokens !== undefined && (
                                                    <span className={styles.tokens}>
                                                        {tool.tokens} tokens
                                                    </span>
                                                )}
                                            </span>

                                            {usable ? (
                                                tool.description && (
                                                    <span className={styles.toolDescription}>
                                                        {tool.description}
                                                    </span>
                                                )
                                            ) : (
                                                // The reason, not just the fact.
                                                // "Unavailable" alone is the
                                                // support ticket this avoids.
                                                <span className={styles.unavailable}>
                                                    <Icon name="warning" size="xs" />
                                                    {tool.unavailableReason ??
                                                        (availability === 'rejected'
                                                            ? 'Rejected by this client'
                                                            : 'Not supported')}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
};

ToolPicker.displayName = 'ToolPicker';
