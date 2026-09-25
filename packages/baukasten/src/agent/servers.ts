/**
 * What an application knows about the servers behind an agent.
 *
 * Protocol-free, like the rest of this layer: an adapter fills these in from
 * `server/discover`, from an ACP handshake, or from a config file, and the
 * components never learn which.
 *
 * **There is no connection state here, and that is not an omission.** MCP
 * `2026-07-28` removed `initialize`/`initialized`, protocol-level sessions and
 * the `Mcp-Session-Id` header, so the connected/connecting/failed machine every
 * client used to draw describes nothing that exists. What can honestly be shown
 * is whether a server is *reachable*, whether it advertises what we expect, and
 * how its recent calls have gone — which is what {@link ServerHealth} is.
 */

import type { IconSource, ServerId, ToolKind } from './types';

/**
 * How a server has been behaving lately.
 *
 * Derived from recent requests rather than from a connection, because there is
 * no connection. `unknown` is the honest state before anything has been asked
 * of it — distinct from `ok`, and distinct from `unreachable`.
 */
export type ServerHealth = 'unknown' | 'ok' | 'degraded' | 'unreachable' | 'incompatible';

export interface ServerDescriptor {
    /**
     * The client-minted id, not `serverInfo.name`.
     *
     * The specification is explicit that a server's advertised name is not
     * unique and must not be used to disambiguate — two installs of the same
     * server share it. Every scope, every grouping and every permission key in
     * this library hangs off the id the *application* assigned.
     */
    readonly id: ServerId;
    /** What the server calls itself. For display only; see {@link id}. */
    readonly name: string;
    readonly version?: string;
    readonly description?: string;
    readonly icons?: readonly IconSource[];
    /** What the server advertises. */
    readonly protocolVersion?: string;
    /**
     * What this client requires.
     *
     * Carried alongside rather than compared elsewhere, so a mismatch can be
     * *shown* — the adapter fails loudly on one, and a user meeting that error
     * with no explanation has no way to act on it.
     */
    readonly expectedProtocolVersion?: string;
    /** Advertised capabilities, as the server named them. */
    readonly capabilities?: readonly string[];
    readonly health?: ServerHealth;
    /** Why it is degraded or unreachable, when something is known. */
    readonly statusMessage?: string;
}

/** True when the server advertises a revision this client did not ask for. */
export function hasProtocolMismatch(server: ServerDescriptor): boolean {
    return (
        server.protocolVersion !== undefined &&
        server.expectedProtocolVersion !== undefined &&
        server.protocolVersion !== server.expectedProtocolVersion
    );
}

/**
 * Why a tool is not available, when it is not.
 *
 * `rejected` is a real state the specification creates: a client on Streamable
 * HTTP **must** exclude tools whose `x-mcp-header` values are invalid, and
 * **should** log the name and the reason. A tool that silently vanished is a
 * support ticket; one listed as unavailable with a reason answers itself.
 */
export type ToolAvailability = 'available' | 'rejected' | 'unsupported';

export interface ToolDescriptor {
    readonly name: string;
    readonly title?: string;
    readonly description?: string;
    readonly serverId: ServerId;
    readonly kind?: ToolKind;
    readonly icons?: readonly IconSource[];
    /** @default 'available' */
    readonly availability?: ToolAvailability;
    /** Shown when it is not available. Required in spirit, since that is the point. */
    readonly unavailableReason?: string;
    /**
     * What this definition costs to keep loaded, if the host can estimate it.
     *
     * Tool definitions consume context before anyone types, which is the whole
     * reason turning them off is worth doing.
     */
    readonly tokens?: number;
}

/** One content returned by a resource read. A read may return several. */
export interface ResourceContent {
    readonly uri?: string;
    readonly name?: string;
    readonly mimeType?: string;
    /** Text content, when the resource is text. */
    readonly text?: string;
    /** Base64 payload, when it is not. */
    readonly blob?: string;
    readonly size?: number;
}

export interface ResourceDescriptor {
    readonly uri: string;
    readonly name?: string;
    readonly description?: string;
    readonly mimeType?: string;
    readonly size?: number;
    readonly serverId?: ServerId;
    /**
     * False when the URI can be read but not looked up.
     *
     * `resource_link`s returned by tools are explicitly not guaranteed to
     * appear in `resources/list`, so "I can fetch this but I cannot tell you
     * anything about it beforehand" is a normal state, not an error.
     */
    readonly listed?: boolean;
}

/** One JSON-RPC message, as the application observed it. */
export interface ProtocolMessage {
    readonly id: string;
    /** Which way it went. */
    readonly direction: 'outgoing' | 'incoming';
    /** `tools/call`, `resources/read`, … or `response` / `error`. */
    readonly method: string;
    readonly serverId?: ServerId;
    /** Transport-level request id. Fresh on every retry. */
    readonly requestId?: string;
    /**
     * The logical operation this belongs to.
     *
     * The reason this exists: under a stateless protocol every retry carries a
     * new request id, so following one operation through a retry chain is
     * otherwise guesswork. Correlating them is most of what makes a traffic
     * view better than a text log.
     */
    readonly correlationId?: string;
    readonly at?: number;
    readonly durationMs?: number;
    readonly payload?: unknown;
    readonly error?: { readonly code?: number; readonly message: string };
}

export interface UsageReadout {
    /** Tokens currently occupied. */
    readonly used?: number;
    /** Total window. Without it, no fill can be drawn — only counts. */
    readonly total?: number;
    /**
     * What tool definitions cost before anyone typed.
     *
     * Broken out rather than folded into `used` because it is the number that
     * explains where the window went, and the one a tool picker can act on.
     */
    readonly toolTokens?: number;
    readonly toolCount?: number;
    /**
     * Money, in whatever the host reckons in.
     *
     * Separate from everything else because showing it is a decision some
     * applications are not free to make. Omitting it has to be first-class.
     */
    readonly cost?: number;
    readonly currency?: string;
}

/** Fraction of the window in use, 0–1, or null when it cannot be known. */
export function contextFill(usage: UsageReadout): number | null {
    if (usage.used === undefined || !usage.total) return null;
    return Math.min(1, Math.max(0, usage.used / usage.total));
}
