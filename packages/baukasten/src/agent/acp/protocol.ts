/**
 * The slice of ACP this adapter reads.
 *
 * ACP is the editor-to-agent half of an agent IDE, where MCP is the
 * agent-to-tools half; a real workbench speaks both. This adapter exists less
 * to serve ACP than to prove something about the types it maps onto: an
 * abstraction validated against exactly one protocol is indistinguishable from
 * that protocol with the field names filed off, and there is no way to tell
 * from the inside.
 *
 * **On these values.** All the enum strings below are from the published
 * schema, cross-checked against literal JSON in the specification's tool-call
 * and permission examples. An earlier draft of this file hedged on the
 * permission kinds because a prose page of the documentation described them
 * differently; the schema settles it and the hedge is gone.
 */

/**
 * Absent, or explicitly null.
 *
 * Nearly every optional field in the schema is documented as "Omitted and
 * `null` are equivalent", and agents send both — Rust implementations serialise
 * `Option::None` as `null` rather than dropping the key.
 *
 * This adapter typed those fields as merely optional, which read as a tidier
 * version of the same thing and was not. `messageId: null` is a legal way to
 * say "this chunk belongs to no particular message", and the reducer's check
 * was `!== undefined` — so a null arrived as a *present* id, every such chunk
 * coalesced into one entry keyed `m:null`, and two unrelated messages merged.
 * Nothing threw. The conformance check found it; no test would have.
 *
 * So the wire types say what the wire carries, and the mappers below are where
 * null stops. The library's own types are null-free by design.
 */
export type Nullable<T> = T | null;

/** Literal values from the specification's tool-call examples. */
export type AcpToolCallStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

/**
 * From the published schema.
 *
 * Nearly the library's own `TOOL_KINDS`, plus `switch_mode` — which the
 * specification's tool-call page omits from its prose list but the schema
 * carries. MCP has no equivalent field at all, which is the asymmetry the
 * abstraction had to absorb: an ACP tool arrives classified, an MCP tool does
 * not.
 */
export type AcpToolCallKind =
    | 'read'
    | 'edit'
    | 'delete'
    | 'move'
    | 'search'
    | 'execute'
    | 'think'
    | 'fetch'
    | 'switch_mode'
    | 'other';

export interface AcpTextContent {
    readonly type: 'text';
    readonly text: string;
}

export interface AcpResourceLinkContent {
    readonly type: 'resource_link';
    readonly uri: string;
    readonly name?: Nullable<string>;
    readonly mimeType?: Nullable<string>;
}

export interface AcpOtherContent {
    readonly type: string;
    readonly [key: string]: unknown;
}

export type AcpContentBlock = AcpTextContent | AcpResourceLinkContent | AcpOtherContent;

export interface AcpToolCallLocation {
    readonly path: string;
    readonly line?: Nullable<number>;
}

export interface AcpMessageChunkUpdate {
    readonly sessionUpdate: 'user_message_chunk' | 'agent_message_chunk' | 'agent_thought_chunk';
    readonly content: AcpContentBlock;
    /**
     * Opaque id grouping chunks of one message.
     *
     * Nullable, and that matters more here than anywhere else in this file: see
     * {@link Nullable}. A chunk whose id is explicitly null belongs to no
     * particular message, and treating that as an id merges unrelated messages.
     */
    readonly messageId?: Nullable<string>;
}

/**
 * A file change, carried on the tool call that made it.
 *
 * This is how ACP reports an edit — not as a separate method. Which means the
 * changeset a review surface shows is derived from the transcript rather than
 * from a parallel channel, and each diff stays attached to the call that
 * caused it.
 */
export interface AcpDiffContent {
    readonly type: 'diff';
    readonly path: string;
    /** Null for a file being created. */
    readonly oldText?: string | null;
    readonly newText: string;
}

export interface AcpOtherToolCallContent {
    readonly type: string;
    readonly [key: string]: unknown;
}

export type AcpToolCallContent = AcpDiffContent | AcpOtherToolCallContent;

export function isAcpDiff(content: AcpToolCallContent): content is AcpDiffContent {
    return content.type === 'diff' && typeof (content as AcpDiffContent).newText === 'string';
}

/**
 * What a tool call carries, wherever it appears.
 *
 * Separate from the session-update wrappers because a tool call shows up in
 * three places and only two of them are session updates. The third is
 * `session/request_permission`, whose `toolCall` is a bare descriptor with no
 * `sessionUpdate` field at all — this adapter used to type it as
 * {@link AcpToolCallUpdate}, which demanded one. Nothing broke, because the
 * mapper never reads that field; but the type was over-demanding, so a real
 * agent's permission request did not fit it and a consumer had to cast.
 */
export interface AcpToolCallFields {
    readonly toolCallId: string;
    readonly title?: Nullable<string>;
    /**
     * The programmatic name of the tool, as opposed to the prose title.
     *
     * Marked experimental in the schema and absent from plenty of agents, but
     * it is the only thing on a tool call stable enough to scope a standing
     * permission to. Without it, "always allow" has to key on the title — which
     * is a sentence that changes per call — or on the kind, which is far too
     * broad.
     */
    readonly name?: Nullable<string>;
    readonly kind?: Nullable<AcpToolCallKind | string>;
    readonly status?: Nullable<AcpToolCallStatus | string>;
    readonly locations?: Nullable<readonly AcpToolCallLocation[]>;
    readonly rawInput?: unknown;
    readonly rawOutput?: unknown;
    readonly content?: Nullable<readonly AcpToolCallContent[]>;
}

/** A call being announced. The title is required when a call is first reported. */
export interface AcpToolCallUpdate extends AcpToolCallFields {
    readonly sessionUpdate: 'tool_call';
    readonly title: string;
}

/**
 * A call being revised.
 *
 * Every field but the id is optional, and an omitted one means "unchanged" —
 * which is why {@link toTranscriptAction} builds a patch by conditional spread
 * rather than assignment.
 */
export interface AcpToolCallProgressUpdate extends AcpToolCallFields {
    readonly sessionUpdate: 'tool_call_update';
}

export type AcpPlanEntryStatus = 'pending' | 'in_progress' | 'completed';
export type AcpPlanEntryPriority = 'low' | 'normal' | 'medium' | 'high';

export interface AcpPlanEntry {
    readonly content?: string;
    readonly description?: string;
    readonly status?: AcpPlanEntryStatus | string;
    readonly priority?: AcpPlanEntryPriority | string;
}

export interface AcpPlanUpdate {
    readonly sessionUpdate: 'plan';
    readonly entries: readonly AcpPlanEntry[];
}

/** Money, as ACP models it. */
export interface AcpCost {
    readonly amount: number;
    /** ISO 4217, e.g. `USD`. */
    readonly currency: string;
}

/**
 * Context window usage, which feeds a usage readout.
 *
 * `cost` is an **object**, not a number. This was typed as `number` here, which
 * is the kind of mistake that survives every test written against the same
 * misreading and produces `[object Object]` the first time a real agent reports
 * money.
 */
export interface AcpUsageUpdate {
    readonly sessionUpdate: 'usage_update';
    readonly used: number;
    readonly size: number;
    readonly cost?: AcpCost | null;
}

/**
 * One command the agent offers.
 *
 * Note what is *not* here: declared arguments. ACP gives a command a name, a
 * description, and at most one unstructured input with a hint — everything the
 * user types after the name arrives as text for the agent to parse. Per-argument
 * declarations and completion are an MCP prompt feature, and a client that
 * expects them from ACP will render an empty argument list forever.
 */
export interface AcpAvailableCommand {
    readonly name: string;
    readonly description: string;
    readonly input?: { readonly hint: string } | null;
}

/**
 * The only route ACP has for slash commands.
 *
 * They are not in the `initialize` result — they arrive as a session update,
 * can change mid-session, and may arrive more than once.
 */
export interface AcpAvailableCommandsUpdate {
    readonly sessionUpdate: 'available_commands_update';
    readonly availableCommands: readonly AcpAvailableCommand[];
}

export interface AcpCurrentModeUpdate {
    readonly sessionUpdate: 'current_mode_update';
    readonly currentModeId: string;
}

export interface AcpUnknownUpdate {
    readonly sessionUpdate: string;
    readonly [key: string]: unknown;
}

export type AcpSessionUpdate =
    | AcpMessageChunkUpdate
    | AcpToolCallUpdate
    | AcpToolCallProgressUpdate
    | AcpPlanUpdate
    | AcpUsageUpdate
    | AcpAvailableCommandsUpdate
    | AcpCurrentModeUpdate
    | AcpUnknownUpdate;

// ─── Elicitation ────────────────────────────────────────────────────────────

/**
 * ACP's own elicitation. **It has one.**
 *
 * An earlier version of this adapter stated the opposite — that elicitation was
 * MCP's and a client speaking only ACP had no protocol route to
 * `InputRequired`. That was wrong, and wrong in the direction that makes people
 * invent a bespoke method: `elicitation/create` exists, it has `form` and `url`
 * modes matching the component's two kinds exactly, and its form schema is the
 * same restricted subset `readElicitationSchema` already parses — a flat object
 * of primitives with `enum`/`oneOf` choices.
 *
 * The scope is the other half of the fit. A form-mode request may carry
 * `toolCallId`, which is precisely the correlation id the reducer needs to fold
 * the question onto the call it interrupted.
 */
export interface AcpElicitationScope {
    readonly sessionId?: string;
    readonly toolCallId?: string | null;
    readonly requestId?: string | number | null;
}

export interface AcpFormElicitation extends AcpElicitationScope {
    readonly mode: 'form';
    readonly message: string;
    /** A restricted JSON Schema: a flat object of primitives. */
    readonly requestedSchema: unknown;
}

export interface AcpUrlElicitation extends AcpElicitationScope {
    readonly mode: 'url';
    readonly message: string;
    readonly elicitationId: string;
    readonly url: string;
}

export interface AcpUnknownElicitation extends AcpElicitationScope {
    readonly mode: string;
    readonly message: string;
    readonly [key: string]: unknown;
}

export type AcpElicitation = AcpFormElicitation | AcpUrlElicitation | AcpUnknownElicitation;

export function isAcpFormElicitation(request: AcpElicitation): request is AcpFormElicitation {
    return request.mode === 'form' && 'requestedSchema' in request;
}

export function isAcpUrlElicitation(request: AcpElicitation): request is AcpUrlElicitation {
    return request.mode === 'url' && typeof (request as AcpUrlElicitation).url === 'string';
}

/**
 * What the client sends back.
 *
 * The three actions are the same three {@link InputResponseAction} already had —
 * `accept` carries data, `decline` is a refusal, `cancel` is dismissal — which
 * is a convergence rather than a coincidence: both protocols inherited the
 * distinction from the same place, and it is worth keeping for that reason.
 */
export type AcpElicitationResponse =
    | { readonly action: 'accept'; readonly content?: Record<string, unknown> | null }
    | { readonly action: 'decline' }
    | { readonly action: 'cancel' };

/**
 * Narrowing these unions needs guards, not equality checks.
 *
 * `AcpUnknownUpdate` and `AcpOtherContent` carry index signatures and a `string`
 * discriminant, which is what makes them catch-alls — and also what stops
 * `update.sessionUpdate === 'tool_call'` from excluding them. Without these the
 * mapper cast in seven places, and a cast is a claim with nothing behind it.
 * Each guard checks the discriminant *and* a field only the real shape has, the
 * same pattern `isToolEntry` and the `InputRequest` guards already use.
 */
export function isAcpMessageChunk(update: AcpSessionUpdate): update is AcpMessageChunkUpdate {
    return (
        (update.sessionUpdate === 'user_message_chunk' ||
            update.sessionUpdate === 'agent_message_chunk' ||
            update.sessionUpdate === 'agent_thought_chunk') &&
        'content' in update
    );
}

export function isAcpToolCall(update: AcpSessionUpdate): update is AcpToolCallUpdate {
    return update.sessionUpdate === 'tool_call' && 'toolCallId' in update;
}

export function isAcpToolCallProgress(
    update: AcpSessionUpdate,
): update is AcpToolCallProgressUpdate {
    return update.sessionUpdate === 'tool_call_update' && 'toolCallId' in update;
}

export function isAcpPlan(update: AcpSessionUpdate): update is AcpPlanUpdate {
    return update.sessionUpdate === 'plan' && Array.isArray((update as AcpPlanUpdate).entries);
}

export function isAcpUsage(update: AcpSessionUpdate): update is AcpUsageUpdate {
    return update.sessionUpdate === 'usage_update' && 'used' in update && 'size' in update;
}

export function isAcpAvailableCommands(
    update: AcpSessionUpdate,
): update is AcpAvailableCommandsUpdate {
    return (
        update.sessionUpdate === 'available_commands_update' &&
        Array.isArray((update as AcpAvailableCommandsUpdate).availableCommands)
    );
}

export function isAcpCurrentMode(update: AcpSessionUpdate): update is AcpCurrentModeUpdate {
    return update.sessionUpdate === 'current_mode_update' && 'currentModeId' in update;
}

export function isAcpTextContent(content: AcpContentBlock): content is AcpTextContent {
    return content.type === 'text' && typeof (content as AcpTextContent).text === 'string';
}

export function isAcpResourceLink(content: AcpContentBlock): content is AcpResourceLinkContent {
    return (
        content.type === 'resource_link' &&
        typeof (content as AcpResourceLinkContent).uri === 'string'
    );
}

/**
 * Open on purpose — see the note at the top of this file. The documentation is
 * inconsistent about these strings, so the mapping accepts more than one
 * spelling rather than committing to an unverified one.
 */
export type AcpPermissionOptionKind = string;

export interface AcpPermissionOption {
    readonly optionId: string;
    readonly name: string;
    readonly kind: AcpPermissionOptionKind;
}

export interface AcpRequestPermission {
    readonly sessionId: string;
    /** A bare descriptor — not a session update. See {@link AcpToolCallFields}. */
    readonly toolCall: AcpToolCallFields;
    readonly options: readonly AcpPermissionOption[];
}

/** How a turn ended. */
export type AcpStopReason =
    | 'end_turn'
    | 'max_tokens'
    | 'max_turn_requests'
    | 'refusal'
    | 'cancelled';
