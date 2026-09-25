import React from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import { hasProtocolMismatch, type ServerDescriptor, type ServerHealth } from '../../servers';
import * as styles from './ServerStatus.css';

const HEALTH_ICONS: Record<ServerHealth, CodiconName> = {
    unknown: 'circle-outline',
    ok: 'pass-filled',
    degraded: 'warning',
    unreachable: 'error',
    incompatible: 'error',
};

const HEALTH_LABELS: Record<ServerHealth, string> = {
    unknown: 'Not used yet',
    ok: 'Responding',
    degraded: 'Some requests failing',
    unreachable: 'Not responding',
    incompatible: 'Unsupported protocol version',
};

export interface ServerStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    server: ServerDescriptor;
    /** Shows advertised capabilities. @default true */
    showCapabilities?: boolean;
    /** Offered as a button when supplied. Takes the id, so one handler serves a list. */
    onRefresh?: (id: ServerDescriptor['id']) => void;
    /** @default 'Check again' */
    refreshLabel?: string;
}

/**
 * What is known about one server.
 *
 * **Not a connection indicator.** MCP `2026-07-28` removed the handshake,
 * protocol sessions and the session header, so there is no connection to be in
 * a state about — a client that draws a green "connected" dot under this
 * revision is drawing a fiction. What this shows instead is reachability,
 * whether the advertised protocol revision is one we can speak, and how recent
 * requests have gone.
 *
 * A **version mismatch is surfaced first and loudest**, because the adapter
 * refuses to map an unknown revision and the resulting failure is otherwise
 * inscrutable — the user meets a broken agent with no way to tell that the
 * cause is a server they can upgrade.
 *
 * The heading is the application's own id for the server, not `serverInfo.name`:
 * the specification says the advertised name is not unique and must not be used
 * to disambiguate, and two installs of the same server prove it.
 *
 * @example
 * ```tsx
 * <ServerStatus server={server} onRefresh={rediscover} />
 * ```
 */
export const ServerStatus: React.FC<ServerStatusProps> = ({
    server,
    showCapabilities = true,
    onRefresh,
    refreshLabel = 'Check again',
    className,
    ...props
}) => {
    const mismatch = hasProtocolMismatch(server);
    const health: ServerHealth = mismatch ? 'incompatible' : (server.health ?? 'unknown');

    return (
        <div
            className={clsx(styles.server({ health }), className)}
            data-health={health}
            data-server-id={server.id}
            {...props}
        >
            <div className={styles.header}>
                <Icon name={HEALTH_ICONS[health]} size="sm" className={styles.healthIcon} />

                <span className={styles.name} title={server.id}>
                    {server.name}
                </span>

                {server.version && <span className={styles.version}>{server.version}</span>}

                {onRefresh && (
                    <button
                        type="button"
                        className={styles.refresh}
                        aria-label={`${refreshLabel} — ${server.name}`}
                        onClick={() => onRefresh(server.id)}
                    >
                        <Icon name="refresh" size="xs" />
                    </button>
                )}
            </div>

            <div className={styles.status}>{server.statusMessage ?? HEALTH_LABELS[health]}</div>

            {mismatch && (
                // Stated in full rather than as "incompatible": the two version
                // strings are the whole content of the problem, and a user who
                // can see both can act on it.
                <div className={styles.mismatch}>
                    <Icon name="warning" size="xs" />
                    <span>
                        Advertises {server.protocolVersion}; this client speaks{' '}
                        {server.expectedProtocolVersion}.
                    </span>
                </div>
            )}

            {server.description && <div className={styles.description}>{server.description}</div>}

            {showCapabilities && server.capabilities && server.capabilities.length > 0 && (
                <ul className={styles.capabilities} aria-label="Advertised capabilities">
                    {server.capabilities.map((capability) => (
                        <li key={capability} className={styles.capability}>
                            {capability}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

ServerStatus.displayName = 'ServerStatus';

export interface ServerListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    servers: readonly ServerDescriptor[];
    onRefresh?: (id: ServerDescriptor['id']) => void;
    showCapabilities?: boolean;
    /** Shown when there are none. */
    empty?: React.ReactNode;
}

/**
 * Every server, worst first.
 *
 * Ordered by health rather than by name on purpose: the list exists to be
 * glanced at when something is wrong, and the thing that is wrong should not be
 * alphabetically somewhere in the middle.
 */
export const ServerList: React.FC<ServerListProps> = ({
    servers,
    onRefresh,
    showCapabilities,
    empty,
    className,
    ...props
}) => {
    const rank: Record<ServerHealth, number> = {
        incompatible: 0,
        unreachable: 1,
        degraded: 2,
        unknown: 3,
        ok: 4,
    };

    const ordered = [...servers].sort(
        (a, b) =>
            rank[hasProtocolMismatch(a) ? 'incompatible' : (a.health ?? 'unknown')] -
            rank[hasProtocolMismatch(b) ? 'incompatible' : (b.health ?? 'unknown')],
    );

    if (ordered.length === 0) {
        return empty ? <div className={clsx(styles.empty, className)}>{empty}</div> : null;
    }

    return (
        <div className={clsx(styles.list, className)} {...props}>
            {ordered.map((server) => (
                <ServerStatus
                    key={server.id}
                    server={server}
                    onRefresh={onRefresh}
                    showCapabilities={showCapabilities}
                />
            ))}
        </div>
    );
};

ServerList.displayName = 'ServerList';
