/**
 * Core types for `baukasten-ui/agent`.
 *
 * Nothing in this file names a wire protocol. Components take these types;
 * adapters map MCP, ACP or a bespoke stream onto them. The test that this is
 * an abstraction rather than one protocol with the field names filed off is
 * that a second protocol maps onto it without any of these types changing.
 *
 * **Openness rule.** Enums whose values originate at a *server* are open:
 * a string with exported well-known constants, never a closed union. Third
 * parties invent tool kinds and mention kinds we have never heard of, and a
 * closed union turns an unknown one into a compile error for the consumer and
 * an unhandled render path at runtime.
 *
 * Enums we *normalise to ourselves* — `ToolStatus`, delivery state, the
 * input-response action — stay closed, because exhaustive switching over them
 * is desirable and there is no third party to surprise us. Applying openness
 * to those as well would be cargo-culting the rule past its reason.
 */

/**
 * Widens a string-literal union so unknown members are still assignable,
 * without losing editor autocomplete for the known ones.
 *
 * `string & Record<never, never>` is structurally just `string`, so any string
 * is assignable. But because it is not the *bare* `string` type, TypeScript
 * keeps the literal members visible in completion lists instead of collapsing
 * the whole union down to `string`.
 */
export type Open<TKnown extends string> = TKnown | (string & Record<never, never>);

// ─── Identity ───────────────────────────────────────────────────────────────

declare const serverIdBrand: unique symbol;

/**
 * A client-minted identifier for a server.
 *
 * Deliberately branded so it cannot be produced from a bare string by
 * accident. Protocol-supplied names are **not** safe to use here: tool names
 * are unique only within a server, and a server's self-reported name is not
 * guaranteed unique across servers either. Keying a remembered permission off
 * either of those lets a grant made to one server apply to another server's
 * identically-named tool — a failure that is silent and in the direction of
 * granting capability.
 *
 * Mint one when the application registers a server, and keep it stable across
 * restarts.
 */
export type ServerId = string & { readonly [serverIdBrand]: true };

/**
 * Mints a {@link ServerId} from an application-controlled string.
 *
 * The value must come from the application's own registry — never from
 * anything the server told us about itself.
 */
export function serverId(value: string): ServerId {
    return value as ServerId;
}

declare const requestStateBrand: unique symbol;

/**
 * Opaque continuation state handed back to a server on a retry.
 *
 * Servers put integrity-protected authorisation context in here — an
 * authenticated principal, an expiry, a digest of the originating request —
 * and clients are required to treat it as sealed: never inspect it, never
 * parse it, never modify it.
 *
 * Wrapped rather than left as a string so that the two most common ways to
 * leak it both fail safe: `${state}` and `JSON.stringify(state)` produce a
 * redaction marker rather than the payload. Only an adapter echoing the value
 * back on a retry should call {@link RequestState.reveal}.
 */
export class RequestState {
    declare private readonly [requestStateBrand]: true;

    constructor(private readonly value: string) {}

    /** Redacted. Prevents accidental interpolation into a log line. */
    toString(): string {
        return '[requestState]';
    }

    /** Redacted. Prevents accidental inclusion in serialised traffic dumps. */
    toJSON(): string {
        return '[requestState]';
    }

    /** The sealed payload. Only for echoing back to the server that issued it. */
    reveal(): string {
        return this.value;
    }
}

/**
 * An icon supplied by a server, for a tool, prompt, resource or template.
 *
 * Rendered in preference to a locally mapped icon, with a fallback for when
 * the source fails to load or none was supplied.
 */
export interface IconSource {
    readonly src: string;
    readonly mimeType?: string;
    readonly sizes?: readonly string[];
}

// ─── Tool invocations ───────────────────────────────────────────────────────

/** Tool kinds we ship an icon and label for. Others render generically. */
export const TOOL_KINDS = [
    'read',
    'edit',
    'delete',
    'move',
    'search',
    'execute',
    'think',
    'fetch',
    'switch_mode',
    'other',
] as const;

export type KnownToolKind = (typeof TOOL_KINDS)[number];

/** Open — servers invent kinds, and an unknown one must render, not throw. */
export type ToolKind = Open<KnownToolKind>;

/**
 * Narrows an open kind to the closed set.
 *
 * `TOOL_KINDS` was exported without this, which made it a list you could read
 * but not use: a caller mapping kinds to their own icons had to write the
 * `includes` *and* the cast themselves, because `Array.includes` on a
 * `readonly ['read', …]` will not accept the open `ToolKind` it is being asked
 * about. The same shape serves {@link ENTRY_KINDS}.
 */
export function isKnownToolKind(kind: ToolKind): kind is KnownToolKind {
    return (TOOL_KINDS as readonly string[]).includes(kind);
}

/**
 * Closed, deliberately: this is a value adapters normalise *to*, so exhaustive
 * handling is achievable and worth having.
 */
export type ToolStatus = 'pending' | 'running' | 'completed' | 'failed';

/**
 * Why a tool call failed, and — the part that matters for rendering — whether
 * anyone needs to do something about it.
 *
 * The distinction is not cosmetic. An execution failure is the tool running
 * and reporting a problem the agent can usually read and route around; the
 * conversation continues. A protocol failure is the call itself not working,
 * which an agent rarely recovers from and a human generally has to resolve.
 * Rendering both as the same red box throws away the difference.
 */
export interface ToolError {
    readonly scope: 'execution' | 'protocol';
    readonly message: string;
    readonly code?: number | string;
}

/** Determinate progress for a long-running call, when the source supplies it. */
export interface ToolProgress {
    readonly value: number;
    readonly total?: number;
    readonly message?: string;
}

/**
 * One invocation of one tool.
 *
 * Note which field is the identity. {@link ToolInvocation.correlationId} is
 * minted by the adapter and is stable for the whole life of the call,
 * *including across retries*. A transport request id is not a usable identity:
 * protocols that resolve a blocked call by re-issuing it assign a fresh
 * request id each time, so keying on that renders one logical call as several.
 */
export interface ToolInvocation {
    /** Stable for the life of the call, including across retries. The identity. */
    readonly correlationId: string;
    /** The transport's id for the most recent attempt. Informational only. */
    readonly requestId?: string;
    readonly kind: ToolKind;
    readonly title: string;
    /** What it acted on — a path, a query, a command line. */
    readonly target?: string;
    readonly status: ToolStatus;
    /** Server-supplied icons, preferred over a locally mapped one. */
    readonly icons?: readonly IconSource[];
    /** Call arguments, for display before the call is approved. */
    readonly arguments?: unknown;
    readonly result?: unknown;
    readonly error?: ToolError;
    readonly progress?: ToolProgress;
    readonly serverId?: ServerId;
    readonly startedAt?: number;
    readonly endedAt?: number;
}

// ─── Prompt values ──────────────────────────────────────────────────────────

/** Open — applications add their own mentionable things. */
export type MentionKind = Open<'file' | 'folder' | 'symbol' | 'url' | 'resource'>;

export interface PromptTextNode {
    readonly type: 'text';
    readonly text: string;
}

export interface PromptMentionNode {
    readonly type: 'mention';
    readonly id: string;
    readonly kind: MentionKind;
    readonly label: string;
    /** Whatever the source attached. Round-trips untouched. */
    readonly data?: unknown;
}

export interface PromptCommandNode {
    readonly type: 'command';
    readonly name: string;
    readonly label: string;
    readonly arguments: Readonly<Record<string, string>>;
    readonly data?: unknown;
}

export type PromptNode = PromptTextNode | PromptMentionNode | PromptCommandNode;

/** Open — an attachment is not necessarily an image, or even a file. */
export type AttachmentKind = Open<'image' | 'file' | 'text' | 'audio'>;

/**
 * Something carried alongside a prompt rather than inside its text.
 *
 * Deliberately *not* a {@link PromptNode}. A mention is part of the sentence
 * and its position carries meaning; an attachment is not — "look at this"
 * means the same wherever the image is listed. Modelling them as inline tokens
 * would force an ordering decision that has no answer.
 *
 * Nothing here assumes an image. A host may attach a selection, a diagram
 * export, a recording, or an object of its own with no bytes at all — hence
 * `data`, which round-trips untouched.
 */
export interface PromptAttachment {
    readonly id: string;
    readonly kind: AttachmentKind;
    readonly name: string;
    readonly mimeType?: string;
    /** Bytes, where the size is known and worth showing. */
    readonly size?: number;
    /**
     * A URL for previewing this.
     *
     * Usually an object URL, which someone has to revoke. {@link useAttachments}
     * owns that for the ones it creates; an attachment added by hand is the
     * caller's to clean up.
     */
    readonly previewUrl?: string;
    /** The underlying file, when the attachment came from one. */
    readonly file?: File;
    /** Whatever the host wants to carry. Round-trips untouched. */
    readonly data?: unknown;
}

/**
 * What the prompt editor holds — an ordered list of text runs and pinned
 * atomic tokens, not a string.
 *
 * A string cannot record which file "compare this with that" refers to. This
 * can, survives a round trip, and is what lets a failed or edited message be
 * restored with its pinned tokens intact.
 */
export type PromptValue = readonly PromptNode[];

// ─── Sources ────────────────────────────────────────────────────────────────

/**
 * One page of a source query.
 *
 * The cursor is not optional decoration. Every list a real server exposes is
 * paginated, and an interface that assumes lists are finite has to be
 * redesigned — along with every implementation of it — the first time it meets
 * one that is not.
 */
export interface SourceQuery {
    readonly query: string;
    readonly cursor?: string;
    readonly signal?: AbortSignal;
}

/**
 * A page of results, plus the caching metadata a source is expected to honour
 * so a trigger menu does not refetch on every keystroke.
 */
export interface SourceResult<TItem> {
    readonly items: readonly TItem[];
    readonly nextCursor?: string;
    /** Freshness hint in milliseconds. */
    readonly ttlMs?: number;
    /** Whether a shared cache may hold this. */
    readonly cacheScope?: 'public' | 'private';
    /** Optional grouping label, so results can cluster by server or kind. */
    readonly group?: string;
}

export interface MentionItem {
    readonly id: string;
    readonly kind: MentionKind;
    readonly label: string;
    readonly description?: string;
    readonly icons?: readonly IconSource[];
    readonly serverId?: ServerId;
    readonly group?: string;
    readonly data?: unknown;
}

export interface CommandArgument {
    readonly name: string;
    readonly description?: string;
    readonly required?: boolean;
}

export interface CommandItem {
    readonly name: string;
    readonly label: string;
    readonly description?: string;
    readonly icons?: readonly IconSource[];
    readonly serverId?: ServerId;
    readonly group?: string;
    readonly arguments?: readonly CommandArgument[];
    /**
     * Whatever the source attached. Round-trips untouched.
     *
     * Present for the same reason it is on {@link MentionItem}: a command is
     * as likely to stand for something in the host's own model as a mention
     * is, and a renderer needs the object rather than a label.
     */
    readonly data?: unknown;
}

/** Backs an `@`-style trigger. The editor never learns where items come from. */
export interface MentionSource {
    search(query: SourceQuery): Promise<SourceResult<MentionItem>>;
}

/** Backs a `/`-style trigger, including completion for a command's arguments. */
export interface CommandSource {
    search(query: SourceQuery): Promise<SourceResult<CommandItem>>;
    /** Completions for one argument of one command, when the source offers them. */
    completeArgument?(
        command: string,
        argument: string,
        partial: string,
        signal?: AbortSignal,
    ): Promise<readonly string[]>;
}

// ─── Approvals ──────────────────────────────────────────────────────────────

/**
 * How far a decision reaches.
 *
 * `once` covers this call. `tool` covers this tool on this server. `server`
 * covers everything from this server. The two persistent levels are why
 * {@link ServerId} is branded — a scope key built from a bare tool name leaks
 * across servers that happen to expose the same name.
 */
export type ApprovalScopeLevel = 'once' | 'tool' | 'server';

/**
 * A decision's reach, shaped so the dangerous version does not compile.
 *
 * The two persistent levels **require** a {@link ServerId}. That is not
 * tidiness: tool names are unique only within a server, so a remembered
 * decision keyed on a name alone silently applies to a different server's
 * identically-named tool. That failure grants capability, does it quietly, and
 * is close to impossible to notice from the UI — so the type refuses to
 * describe it rather than trusting everyone to remember.
 */
export type ApprovalScope =
    | { readonly level: 'once' }
    | { readonly level: 'tool'; readonly serverId: ServerId; readonly toolName: string }
    | { readonly level: 'server'; readonly serverId: ServerId };

/**
 * The key a remembered decision is stored under.
 *
 * Branded so it cannot be confused with a tool name, a server name, or any
 * other string that looks plausible in the same position.
 */
export type ApprovalScopeKey = string & { readonly [scopeKeyBrand]: true };

declare const scopeKeyBrand: unique symbol;

/**
 * Builds the storage key for a scope.
 *
 * `once` has no key because it is not remembered — returning one would invite
 * a caller to persist a decision that was explicitly not standing.
 */
export function approvalScopeKey(scope: ApprovalScope): ApprovalScopeKey | null {
    switch (scope.level) {
        case 'tool':
            return `tool:${scope.serverId}:${scope.toolName}` as ApprovalScopeKey;
        case 'server':
            return `server:${scope.serverId}` as ApprovalScopeKey;
        default:
            return null;
    }
}

export interface ApprovalOption {
    readonly id: string;
    readonly label: string;
    readonly description?: string;
    readonly outcome: 'allow' | 'deny';
    readonly scope: ApprovalScopeLevel;
    /** Bound to Enter (`accept`) or Escape (`reject`) when set. */
    readonly shortcut?: 'accept' | 'reject';
}

/**
 * How alarming this should look.
 *
 * **Caller-supplied, always.** Tool metadata may inform the application's
 * choice, but the application is the only party that knows which servers it
 * trusts. A component deriving severity from server-controlled data would let
 * a hostile server dress down its own consent prompt.
 */
export type ApprovalSeverity = 'low' | 'normal' | 'high';

export interface ApprovalRequest {
    readonly id: string;
    readonly title: string;
    readonly description?: string;
    readonly serverId?: ServerId;
    readonly toolName?: string;
    /** Shown so the user can see what they are approving before it runs. */
    readonly tool?: ToolInvocation;
    readonly options: readonly ApprovalOption[];
    readonly severity?: ApprovalSeverity;
}

export interface ApprovalDecision {
    readonly optionId: string;
    readonly outcome: 'allow' | 'deny';
    readonly scope: ApprovalScope;
    readonly at?: number;
}

// ─── Input requests ─────────────────────────────────────────────────────────

/** Open — a source may ask for a kind this version has no renderer for. */
export type InputRequestKind = Open<'form' | 'url'>;

interface InputRequestBase {
    /** The key this request arrived under. Answers are reported back under it. */
    readonly key: string;
    readonly message: string;
    readonly serverId?: ServerId;
}

/** Structured data collected in-band, from a deliberately restricted schema. */
export interface FormInputRequest extends InputRequestBase {
    readonly kind: 'form';
    /** A restricted schema: a flat object of primitives. */
    readonly schema: unknown;
}

/**
 * Consent to navigate somewhere out-of-band, for interactions that must not
 * pass through this client at all.
 *
 * Answering `accept` means the user consented to navigate — *not* that the
 * interaction finished. The outcome happens elsewhere and is never reported
 * back directly, so a resolver has to offer manual retry and cancel.
 */
export interface UrlInputRequest extends InputRequestBase {
    readonly kind: 'url';
    readonly url: string;
}

/** A kind this version does not render. Declined cleanly rather than crashed on. */
export interface UnsupportedInputRequest extends InputRequestBase {
    readonly kind: InputRequestKind;
}

export type InputRequest = FormInputRequest | UrlInputRequest | UnsupportedInputRequest;

/**
 * Because {@link UnsupportedInputRequest} carries an open `kind`, comparing
 * `request.kind === 'form'` does not narrow the union on its own — the open arm
 * matches every string. These check for the field that actually distinguishes
 * each shape, which is both sound and what a renderer needs to know anyway.
 */
export function isFormInputRequest(request: InputRequest): request is FormInputRequest {
    return request.kind === 'form' && 'schema' in request;
}

export function isUrlInputRequest(request: InputRequest): request is UrlInputRequest {
    return request.kind === 'url' && 'url' in request;
}

/**
 * Closed, and the three are not interchangeable: `accept` carries data,
 * `decline` is an explicit refusal, `cancel` is dismissal without a choice.
 * Sources act differently on each, so collapsing them loses information.
 */
export type InputResponseAction = 'accept' | 'decline' | 'cancel';

export interface InputResponse {
    readonly key: string;
    readonly action: InputResponseAction;
    readonly content?: unknown;
}

// ─── Transcript entries ─────────────────────────────────────────────────────

export type MessageRole = Open<'user' | 'agent' | 'system'>;

/**
 * Whether a message the user composed has actually reached the agent.
 *
 * Closed: these are our own states. A `failed` message keeps its
 * {@link PromptValue} so retry and edit-and-resend both have the original —
 * including its pinned tokens — to work from. The common bug this exists to
 * prevent is a message that vanishes on error, taking the user's typing with it.
 */
export type DeliveryState = 'pending' | 'sent' | 'failed';

export const ENTRY_KINDS = [
    'message',
    'thought',
    'tool',
    'plan',
    'approval',
    'input-required',
] as const;

export type KnownEntryKind = (typeof ENTRY_KINDS)[number];

/** Open — consumers register their own kinds and inherit transcript behaviour. */
export type EntryKind = Open<KnownEntryKind>;

/**
 * Narrows an open kind to the built-in set.
 *
 * The useful question for a consumer is "is this one of yours, or one of
 * mine" — a filter UI listing kinds, a renderer map deciding whether to fall
 * through to its own. See {@link isKnownToolKind}.
 */
export function isKnownEntryKind(kind: EntryKind): kind is KnownEntryKind {
    return (ENTRY_KINDS as readonly string[]).includes(kind);
}

export interface TranscriptEntryBase {
    readonly id: string;
    readonly kind: EntryKind;
    /** Supplied by the caller. The reducer stays pure and does not read a clock. */
    readonly at?: number;
}

export interface MessageEntry extends TranscriptEntryBase {
    readonly kind: 'message';
    readonly role: MessageRole;
    readonly text: string;
    /** True while chunks are still arriving, so a caret can be attached. */
    readonly streaming: boolean;
    /** Only meaningful for messages the user composed. */
    readonly delivery?: DeliveryState;
    /** The original composed value, preserved for retry and edit-and-resend. */
    readonly value?: PromptValue;
    readonly error?: string;
}

export interface ThoughtEntry extends TranscriptEntryBase {
    readonly kind: 'thought';
    readonly text: string;
    readonly streaming: boolean;
    readonly durationMs?: number;
}

export interface ToolEntry extends TranscriptEntryBase {
    readonly kind: 'tool';
    readonly tool: ToolInvocation;
    /**
     * Requests that interrupted *this* call, folded onto it rather than
     * appended as siblings — the call is blocked, not finished, and the
     * transcript should read that way.
     */
    readonly inputRequests?: readonly InputRequest[];
}

export type PlanItemStatus = 'pending' | 'active' | 'done';

export interface PlanItem {
    readonly id: string;
    readonly text: string;
    readonly status: PlanItemStatus;
    readonly priority?: 'low' | 'normal' | 'high';
}

export interface PlanEntry extends TranscriptEntryBase {
    readonly kind: 'plan';
    readonly items: readonly PlanItem[];
}

export interface ApprovalEntry extends TranscriptEntryBase {
    readonly kind: 'approval';
    readonly request: ApprovalRequest;
    /** Present once decided. The card stays in the transcript showing the outcome. */
    readonly decision?: ApprovalDecision;
}

export interface InputRequiredEntry extends TranscriptEntryBase {
    readonly kind: 'input-required';
    readonly requests: readonly InputRequest[];
    readonly responses?: readonly InputResponse[];
}

/**
 * An entry kind this library knows nothing about.
 *
 * A consumer registers a renderer for its own `kind` and gets windowing,
 * filtering, keyboard navigation and stick-to-bottom behaviour for free. This
 * is the difference between an abstraction and a chat widget.
 */
export interface CustomEntry extends TranscriptEntryBase {
    readonly kind: EntryKind;
    readonly data: unknown;
}

export type KnownTranscriptEntry =
    | MessageEntry
    | ThoughtEntry
    | ToolEntry
    | PlanEntry
    | ApprovalEntry
    | InputRequiredEntry;

/**
 * Anything that can sit in a transcript.
 *
 * Because {@link CustomEntry} carries an open `kind`, narrowing by
 * `entry.kind === 'tool'` alone leaves `CustomEntry` in the union. Use the
 * exported type guards — {@link isToolEntry} and friends — which narrow
 * cleanly. That awkwardness is the price of letting consumers add kinds, and
 * it is worth paying.
 */
export type TranscriptEntry = KnownTranscriptEntry | CustomEntry;

// ─── Type guards ────────────────────────────────────────────────────────────

/**
 * The guards accept `undefined` deliberately.
 *
 * The commonest thing anyone does with a transcript is look an entry up —
 * `entries.find(…)` — and that yields `TranscriptEntry | undefined`. A guard
 * that refuses the result cannot be used at the exact point it is most wanted,
 * which pushes callers into a non-null assertion or a second existence check
 * before the narrowing they actually came for.
 */
export function isMessageEntry(entry: TranscriptEntry | undefined): entry is MessageEntry {
    return entry?.kind === 'message' && 'role' in entry;
}

export function isThoughtEntry(entry: TranscriptEntry | undefined): entry is ThoughtEntry {
    return entry?.kind === 'thought' && 'streaming' in entry;
}

export function isToolEntry(entry: TranscriptEntry | undefined): entry is ToolEntry {
    return entry?.kind === 'tool' && 'tool' in entry;
}

export function isPlanEntry(entry: TranscriptEntry | undefined): entry is PlanEntry {
    return entry?.kind === 'plan' && 'items' in entry;
}

export function isApprovalEntry(entry: TranscriptEntry | undefined): entry is ApprovalEntry {
    return entry?.kind === 'approval' && 'request' in entry;
}

export function isInputRequiredEntry(
    entry: TranscriptEntry | undefined,
): entry is InputRequiredEntry {
    return entry?.kind === 'input-required' && 'requests' in entry;
}
