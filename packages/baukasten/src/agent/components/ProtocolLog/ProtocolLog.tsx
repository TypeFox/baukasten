import React, { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Icon } from '../../../components/Icon';
import type { ProtocolMessage } from '../../servers';
import { redact, SENSITIVE_KEYS } from './redact';
import * as styles from './ProtocolLog.css';

export interface ProtocolLogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    messages: readonly ProtocolMessage[];
    /**
     * Show values that are redacted by default.
     *
     * Off, and staying off unless a human turns it on in the moment. See
     * {@link redact} for why this is not merely a preference.
     *
     * @default false
     */
    reveal?: boolean;
    onRevealChange?: (reveal: boolean) => void;
    /** Additional keys to redact, on top of the built-in list. */
    redactKeys?: readonly string[];
    /** Free-text filter over method, server and payload. */
    filter?: string;
    onFilterChange?: (filter: string) => void;
    /**
     * Groups a retry chain back to the operation it belongs to.
     *
     * @default true
     */
    correlate?: boolean;
    /** Rows above which the list is windowed. @default 100 */
    virtualizeThreshold?: number;
    empty?: React.ReactNode;
}

function matches(message: ProtocolMessage, filter: string): boolean {
    if (filter === '') return true;
    const needle = filter.toLowerCase();

    return (
        message.method.toLowerCase().includes(needle) ||
        (message.serverId ?? '').toLowerCase().includes(needle) ||
        (message.error?.message ?? '').toLowerCase().includes(needle)
    );
}

/**
 * Raw JSON-RPC traffic, for the people building the server on the other end.
 *
 * Worth more under a **stateless** protocol than it would have been under the
 * last revision. With no session, state round-trips through opaque blobs and
 * every retry carries a fresh transport id — so following one logical operation
 * through its retries is guesswork from a text log. Grouping by correlation id
 * is most of what makes this better than `console.log`.
 *
 * **`requestState` is redacted by default**, along with the names a bearer
 * token travels under. Not an option that defaults to safe — the default *is*
 * the behaviour, and revealing is a deliberate act with a visible control. The
 * specification tells servers to put authorization context in that field and
 * tells clients not to inspect it; a viewer that printed it would put a
 * credential in every screenshot taken of it.
 *
 * Windowed, because traffic outruns transcript volume by an order of magnitude.
 *
 * @example
 * ```tsx
 * <ProtocolLog messages={messages} filter={filter} onFilterChange={setFilter} />
 * ```
 */
export const ProtocolLog: React.FC<ProtocolLogProps> = ({
    messages,
    reveal = false,
    onRevealChange,
    redactKeys = SENSITIVE_KEYS,
    filter = '',
    onFilterChange,
    correlate = true,
    virtualizeThreshold = 100,
    empty,
    className,
    ...props
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<string | null>(null);

    const visible = useMemo(
        () => messages.filter((message) => matches(message, filter)),
        [messages, filter],
    );

    const windowed = visible.length > virtualizeThreshold;

    const virtualizer = useVirtualizer({
        count: windowed ? visible.length : 0,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 28,
        getItemKey: (index) => visible[index].id,
        overscan: 12,
    });

    /**
     * How many messages share each correlation id.
     *
     * A count above one means a retry chain, which is the thing worth seeing at
     * a glance in a stateless protocol.
     */
    const chains = useMemo(() => {
        const counts = new Map<string, number>();
        if (!correlate) return counts;

        for (const message of messages) {
            if (message.correlationId) {
                counts.set(message.correlationId, (counts.get(message.correlationId) ?? 0) + 1);
            }
        }

        return counts;
    }, [messages, correlate]);

    const rows = windowed
        ? virtualizer.getVirtualItems().map((item) => ({
              message: visible[item.index],
              start: item.start,
          }))
        : visible.map((message) => ({ message, start: 0 }));

    return (
        <div className={clsx(styles.log, className)} {...props}>
            <div className={styles.toolbar}>
                <Icon name="search" size="xs" className={styles.searchIcon} />
                <input
                    className={styles.filter}
                    value={filter}
                    placeholder="Filter by method, server or error"
                    aria-label="Filter traffic"
                    onChange={(event) => onFilterChange?.(event.target.value)}
                />

                <span className={styles.count}>
                    {visible.length}
                    {visible.length !== messages.length && ` of ${messages.length}`}
                </span>

                {/*
                 * A visible control rather than a prop only, so the reader can
                 * see that something is being withheld — and so turning it on
                 * is an act they took rather than a setting they inherited.
                 */}
                <label className={styles.revealToggle}>
                    <input
                        type="checkbox"
                        checked={reveal}
                        onChange={(event) => onRevealChange?.(event.target.checked)}
                    />
                    Show redacted
                </label>
            </div>

            <div ref={scrollRef} className={styles.scroll} role="log" aria-label="Protocol traffic">
                {visible.length === 0 ? (
                    empty ? (
                        <div className={styles.empty}>{empty}</div>
                    ) : null
                ) : (
                    <div
                        className={windowed ? styles.virtualContent : styles.content}
                        style={windowed ? { height: virtualizer.getTotalSize() } : undefined}
                    >
                        {rows.map(({ message, start }) => {
                            const open = expanded === message.id;
                            const chain = message.correlationId
                                ? (chains.get(message.correlationId) ?? 0)
                                : 0;

                            return (
                                <div
                                    key={message.id}
                                    ref={windowed ? virtualizer.measureElement : undefined}
                                    data-index={visible.indexOf(message)}
                                    className={windowed ? styles.virtualRow : undefined}
                                    style={
                                        windowed
                                            ? { transform: `translateY(${start}px)` }
                                            : undefined
                                    }
                                >
                                    <button
                                        type="button"
                                        className={styles.row({
                                            direction: message.direction,
                                            failed: Boolean(message.error),
                                        })}
                                        aria-expanded={open}
                                        onClick={() => setExpanded(open ? null : message.id)}
                                    >
                                        <Icon
                                            name={
                                                message.direction === 'outgoing'
                                                    ? 'arrow-right'
                                                    : 'arrow-left'
                                            }
                                            size="xs"
                                            className={styles.direction}
                                        />

                                        <span className={styles.method}>{message.method}</span>

                                        {message.serverId && (
                                            <span className={styles.server}>
                                                {message.serverId}
                                            </span>
                                        )}

                                        {chain > 1 && (
                                            <span
                                                className={styles.chain}
                                                title={`${chain} messages for this operation`}
                                            >
                                                ×{chain}
                                            </span>
                                        )}

                                        {message.durationMs !== undefined && (
                                            <span className={styles.duration}>
                                                {Math.round(message.durationMs)}ms
                                            </span>
                                        )}

                                        {message.error && (
                                            <Icon
                                                name="error"
                                                size="xs"
                                                className={styles.errorIcon}
                                            />
                                        )}
                                    </button>

                                    {open && (
                                        <pre className={styles.payload}>
                                            {JSON.stringify(
                                                reveal
                                                    ? message.payload
                                                    : redact(message.payload, redactKeys),
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

ProtocolLog.displayName = 'ProtocolLog';
