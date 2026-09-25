/**
 * The slice of the MCP wire format this adapter reads, and the revision it
 * reads it as.
 *
 * Only the fields the UI actually consumes are modelled. This is not an MCP
 * client and does not aspire to be one — it owns no transport, opens no
 * connection, and is a pure function of messages already received.
 */

/**
 * The protocol revision this adapter targets.
 *
 * Named rather than implied, and checked rather than assumed, because MCP has
 * shipped breaking revisions faster than most consumers notice: the handshake,
 * protocol sessions and server-initiated requests have all been removed or
 * replaced within a single year. An adapter that silently accepts whatever it
 * is given degrades in ways that look like application bugs.
 */
export const MCP_PROTOCOL_VERSION = '2026-07-28';

/** Thrown when a peer speaks a revision this adapter was not written against. */
export class McpProtocolVersionError extends Error {
    constructor(
        readonly received: string,
        readonly expected: string = MCP_PROTOCOL_VERSION,
    ) {
        super(
            `MCP protocol version mismatch: this adapter targets ${expected} but the peer ` +
                `reported ${received}. Field shapes differ between revisions, so continuing ` +
                `would misread messages rather than fail. Use an adapter built for ${received}.`,
        );
        this.name = 'McpProtocolVersionError';
    }
}

/**
 * Fails loudly on a revision mismatch.
 *
 * Deliberately not lenient. The alternative — carrying on and hoping the
 * fields line up — turns a protocol problem into a rendering problem several
 * layers away from its cause.
 */
export function assertProtocolVersion(version: string | undefined): void {
    if (version === undefined) return;
    if (version !== MCP_PROTOCOL_VERSION) {
        throw new McpProtocolVersionError(version);
    }
}

export interface McpClientCapabilityOptions {
    /** Whether the application can present an out-of-band navigation consent. */
    readonly url?: boolean;
}

/**
 * What this adapter tells a server it can handle.
 *
 * **Under-declare deliberately.** A server must not send an input request of a
 * kind the client has not declared, which is the mechanism that lets us
 * decline sampling cleanly rather than meeting a request we have no UI for.
 * That protection only works if this stays honest: declaring a capability
 * optimistically invites exactly the request we cannot answer.
 *
 * Sampling and roots are absent on purpose — both are deprecated, and neither
 * has a renderer here.
 */
export function declaredClientCapabilities(
    options: McpClientCapabilityOptions = {},
): Record<string, unknown> {
    return {
        elicitation: options.url ? { form: {}, url: {} } : { form: {} },
    };
}

// ─── Wire shapes ────────────────────────────────────────────────────────────

export interface McpIcon {
    readonly src: string;
    readonly mimeType?: string;
    readonly sizes?: readonly string[];
}

/** Caching metadata every list result carries as of this revision. */
export interface McpCacheable {
    readonly nextCursor?: string;
    readonly ttlMs?: number;
    readonly cacheScope?: 'public' | 'private';
}

export interface McpPromptArgument {
    readonly name: string;
    readonly description?: string;
    readonly required?: boolean;
}

export interface McpPrompt {
    readonly name: string;
    readonly title?: string;
    readonly description?: string;
    readonly icons?: readonly McpIcon[];
    readonly arguments?: readonly McpPromptArgument[];
}

export interface McpResource {
    readonly uri: string;
    readonly name: string;
    readonly title?: string;
    readonly description?: string;
    readonly mimeType?: string;
    readonly size?: number;
    readonly icons?: readonly McpIcon[];
}

export interface McpResourceTemplate {
    readonly uriTemplate: string;
    readonly name: string;
    readonly title?: string;
    readonly description?: string;
    readonly mimeType?: string;
    readonly icons?: readonly McpIcon[];
}

export interface McpTool {
    readonly name: string;
    readonly title?: string;
    readonly description?: string;
    readonly icons?: readonly McpIcon[];
    readonly inputSchema?: unknown;
    readonly outputSchema?: unknown;
    /**
     * Server-controlled behaviour hints.
     *
     * Carried through untouched and **never** folded into a visual treatment
     * here. Clients are required to treat these as untrusted unless the server
     * is trusted, and only the application knows which servers it trusts — so
     * an approval's severity is the application's to decide, not something a
     * component derives from this.
     */
    readonly annotations?: Readonly<Record<string, unknown>>;
}

export interface McpListPromptsResult extends McpCacheable {
    readonly prompts: readonly McpPrompt[];
}

export interface McpListResourcesResult extends McpCacheable {
    readonly resources: readonly McpResource[];
}

export interface McpListResourceTemplatesResult extends McpCacheable {
    readonly resourceTemplates: readonly McpResourceTemplate[];
}

export interface McpElicitRequest {
    readonly method: 'elicitation/create';
    readonly params: {
        readonly mode?: 'form' | 'url';
        readonly message: string;
        readonly requestedSchema?: unknown;
        readonly url?: string;
    };
}

export interface McpOtherInputRequest {
    readonly method: string;
    readonly params?: Readonly<Record<string, unknown>>;
}

export type McpInputRequest = McpElicitRequest | McpOtherInputRequest;

/**
 * A result that could not complete without more input.
 *
 * `inputRequests` is a **map**, and it may hold several requests of different
 * kinds at once. The answer goes back on a retry of the original call, not on
 * a reply to this.
 */
export interface McpInputRequiredResult {
    readonly resultType: 'input_required';
    readonly inputRequests?: Readonly<Record<string, McpInputRequest>>;
    readonly requestState?: string;
}

export interface McpCompleteResult {
    readonly resultType?: 'complete';
    readonly content?: readonly unknown[];
    readonly structuredContent?: unknown;
    readonly isError?: boolean;
}

export type McpCallToolResult = McpCompleteResult | McpInputRequiredResult;

/** A JSON-RPC failure, as distinct from a tool that ran and reported a problem. */
export interface McpProtocolError {
    readonly code: number;
    readonly message: string;
    readonly data?: unknown;
}

/**
 * The transport-shaped operations the sources need.
 *
 * An application implements this over whatever client it already has. Keeping
 * it this narrow is what stops the adapter growing a transport.
 */
export interface McpPort {
    listPrompts(cursor?: string): Promise<McpListPromptsResult>;
    listResources(cursor?: string): Promise<McpListResourcesResult>;
    listResourceTemplates?(cursor?: string): Promise<McpListResourceTemplatesResult>;
    /** Argument completion, when the server offers it. */
    complete?(
        ref: { readonly type: 'prompt' | 'resource'; readonly name: string },
        argument: { readonly name: string; readonly value: string },
        signal?: AbortSignal,
    ): Promise<{ readonly values: readonly string[] }>;
}
