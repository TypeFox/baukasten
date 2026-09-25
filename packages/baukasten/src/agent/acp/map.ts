/**
 * ACP onto the library's own types.
 *
 * The thing to watch while reading this file is what it does *not* contain:
 * no new entry kind, no new field on {@link ToolInvocation}, no widened union.
 * Every ACP concept lands on a type that already existed for MCP. That is the
 * whole claim of the adapter layer, and this is where it is either true or not.
 */

import type { TranscriptAction } from '../transcript';
import type { SessionChange } from '../components/DiffView';
import type { UsageReadout } from '../servers';
import type {
    ApprovalOption,
    ApprovalRequest,
    CommandItem,
    InputRequest,
    PlanItem,
    PlanItemStatus,
    ServerId,
    ToolInvocation,
    ToolKind,
    ToolStatus,
} from '../types';
import {
    isAcpDiff,
    isAcpFormElicitation,
    isAcpMessageChunk,
    isAcpPlan,
    isAcpResourceLink,
    isAcpTextContent,
    isAcpToolCall,
    isAcpToolCallProgress,
    isAcpUrlElicitation,
} from './protocol';
import type {
    AcpAvailableCommandsUpdate,
    AcpContentBlock,
    AcpElicitation,
    AcpPermissionOption,
    AcpPlanEntry,
    AcpRequestPermission,
    AcpSessionUpdate,
    AcpToolCallFields,
    AcpToolCallProgressUpdate,
    AcpToolCallUpdate,
    AcpUsageUpdate,
} from './protocol';

/**
 * ACP's `in_progress` is our `running`; the rest line up exactly.
 *
 * An unrecognised status becomes `pending` rather than throwing — a newer
 * agent inventing a state should leave a transcript rendering, not break it.
 */
export function toToolStatus(status: string | undefined): ToolStatus {
    switch (status) {
        case 'in_progress':
            return 'running';
        case 'completed':
            return 'completed';
        case 'failed':
            return 'failed';
        default:
            return 'pending';
    }
}

/** Passed through unchanged: ACP's kinds are exactly the library's own list. */
export function toToolKind(kind: string | undefined): ToolKind {
    return kind ?? 'other';
}

/** Plain text out of a content block, for the blocks that carry any. */
export function toText(content: AcpContentBlock): string {
    if (isAcpTextContent(content)) return content.text;
    if (isAcpResourceLink(content)) return content.name ?? content.uri;
    return '';
}

/**
 * A failed ACP call, described.
 *
 * ACP reports failure as a status and nothing else — there is no error object
 * on the wire. The adapter used to pass that through untouched, which left
 * `tool.error` undefined for every ACP failure, so the error row never rendered
 * and the only remaining signal was a red glyph with `aria-hidden` on it. A
 * failed call was, for a screen reader, identical to a successful one.
 *
 * `execution` scope because that is what a tool reporting failure means; a
 * transport-level problem does not arrive as a `tool_call_update`.
 */
function errorFor(status: string | undefined): ToolInvocation['error'] {
    if (toToolStatus(status) !== 'failed') return undefined;
    return { scope: 'execution', message: 'The tool reported a failure.' };
}

/**
 * Where null stops.
 *
 * The wire types say `T | null | undefined` because the schema does; every type
 * in the library proper is null-free. So each of these reads through `??`,
 * which collapses both spellings of absent into one — and doing it here, once,
 * is why no component has to know that ACP distinguishes them.
 */
function toToolInvocation(update: AcpToolCallFields, server?: ServerId): ToolInvocation {
    return {
        // ACP identifies a call once and keeps it. There is no retry that
        // re-issues under a fresh id here, so the call id *is* the correlation
        // id — the indirection the MCP adapter needs costs nothing to honour.
        correlationId: update.toolCallId,
        kind: toToolKind(update.kind ?? undefined),
        title: update.title ?? '',
        target: update.locations?.[0]?.path,
        status: toToolStatus(update.status ?? undefined),
        arguments: 'rawInput' in update ? update.rawInput : undefined,
        result: 'rawOutput' in update ? update.rawOutput : undefined,
        error: errorFor(update.status ?? undefined),
        serverId: server,
    };
}

function toPlanItem(entry: AcpPlanEntry, index: number): PlanItem {
    const status: PlanItemStatus =
        entry.status === 'completed'
            ? 'done'
            : entry.status === 'in_progress'
              ? 'active'
              : 'pending';

    return {
        id: String(index),
        text: entry.content ?? entry.description ?? '',
        status,
        priority: entry.priority === 'high' ? 'high' : entry.priority === 'low' ? 'low' : 'normal',
    };
}

export interface AcpMapOptions {
    readonly serverId?: ServerId;
    /** Supplied by the caller; the reducer never reads a clock itself. */
    readonly at?: number;
}

/**
 * Maps one `session/update` onto a reducer action.
 *
 * Returns `null` for updates that are not transcript entries — available
 * commands, mode changes, usage — so the caller can route them without this
 * inventing an entry for them.
 */
export function toTranscriptAction(
    update: AcpSessionUpdate,
    options: AcpMapOptions = {},
): TranscriptAction | null {
    const { at, serverId } = options;

    if (isAcpMessageChunk(update)) {
        /*
         * `?? undefined`, and it is load-bearing.
         *
         * The reducer distinguishes "this chunk names a message" from "this
         * chunk is anonymous" by `messageId !== undefined`. A null is the
         * schema's way of saying anonymous, so passing it through made every
         * anonymous chunk claim the id `m:null` — and two unrelated messages
         * coalesced into one entry, silently.
         */
        const messageId = update.messageId ?? undefined;

        if (update.sessionUpdate === 'agent_thought_chunk') {
            return {
                type: 'agent/thought-chunk',
                text: toText(update.content),
                thoughtId: messageId,
                at,
            };
        }

        return {
            type: 'agent/message-chunk',
            text: toText(update.content),
            role: update.sessionUpdate === 'user_message_chunk' ? 'user' : 'agent',
            messageId,
            at,
        };
    }

    if (isAcpToolCall(update)) {
        return { type: 'agent/tool-call', tool: toToolInvocation(update, serverId), at };
    }

    if (isAcpPlan(update)) {
        return { type: 'agent/plan', items: update.entries.map(toPlanItem), at };
    }

    switch (update.sessionUpdate) {
        case 'tool_call_update': {
            if (!isAcpToolCallProgress(update)) return null;
            const progress = update;
            // A patch, not a replacement: an update carries only what changed,
            // and spreading a fully-built invocation over the existing one
            // would blank every field the agent chose not to resend.
            //
            // Built by conditional spread rather than assignment because
            // ToolInvocation's fields are readonly, and `Partial<T>` keeps that
            // modifier — an omitted key and a key set to undefined are not the
            // same thing to the reducer, so the distinction is worth the shape.
            // `!= null` rather than `!== undefined`: an omitted field and an
            // explicitly null one both mean "unchanged", and treating null as a
            // value would blank the title of a call that only reported progress.
            const patch: Partial<ToolInvocation> = {
                ...(progress.status != null
                    ? { status: toToolStatus(progress.status), error: errorFor(progress.status) }
                    : {}),
                ...(progress.title != null ? { title: progress.title } : {}),
                ...(progress.kind != null ? { kind: toToolKind(progress.kind) } : {}),
                ...(progress.locations?.[0] ? { target: progress.locations[0].path } : {}),
                ...(progress.rawOutput !== undefined ? { result: progress.rawOutput } : {}),
            };

            return {
                type: 'agent/tool-update',
                correlationId: progress.toolCallId,
                patch,
            };
        }

        default:
            /*
             * Not a transcript entry, or a kind this version does not know.
             *
             * `available_commands_update`, `current_mode_update`,
             * `usage_update`, `session_info_update` and the compaction updates
             * all land here on purpose — they change what the *application*
             * shows around the transcript, not what is in it. Each has a mapper
             * of its own in this module; see `toCommandItems`,
             * `toUsageReadout`, and the `isAcp*` guards.
             */
            return null;
    }
}

/**
 * Reads an ACP permission option as an outcome and a scope.
 *
 * The four kinds are from the published schema. "Always" maps to `tool` rather
 * than `server` scope because that is what ACP means by it — a standing
 * decision about this operation, not about everything the agent might do.
 *
 * An unrecognised kind is a narrow deny. Wrong in the safe direction: a new
 * option this version has not seen must not be allowed to grant something.
 */
export function acpPermissionOutcome(kind: string): Pick<ApprovalOption, 'outcome' | 'scope'> {
    switch (kind) {
        case 'allow_once':
            return { outcome: 'allow', scope: 'once' };
        case 'allow_always':
            return { outcome: 'allow', scope: 'tool' };
        case 'reject_always':
            return { outcome: 'deny', scope: 'tool' };
        case 'reject_once':
        default:
            return { outcome: 'deny', scope: 'once' };
    }
}

function toApprovalOption(option: AcpPermissionOption): ApprovalOption {
    const { outcome, scope } = acpPermissionOutcome(option.kind);
    return {
        id: option.optionId,
        label: option.name,
        outcome,
        scope,
        shortcut: outcome === 'allow' && scope === 'once' ? 'accept' : undefined,
    };
}

/**
 * Maps a permission request onto an approval.
 *
 * Note what is *not* set: severity. The options and the tool come off the
 * wire, but how alarming the prompt should look is the application's call,
 * because only the application knows which agents it trusts.
 *
 * `toolName` comes from the tool call's `name`, which is the programmatic
 * identity as opposed to the prose title. It is optional in the schema and
 * plenty of agents omit it — in which case the two persistent approval scopes
 * cannot be built, and {@link scopeFor} correctly degrades a standing grant to
 * a one-off. That is the safe direction: a decision that cannot be scoped
 * correctly should not be remembered rather than remembered against the wrong
 * thing. A client that wants standing grants anyway has to invent an identity,
 * and should do it deliberately rather than by defaulting to the title.
 */
export function toApprovalRequest(
    request: AcpRequestPermission,
    options: AcpMapOptions = {},
): ApprovalRequest {
    return {
        id: request.toolCall.toolCallId,
        // A permission request's tool call is a bare descriptor, and its title
        // is optional there — unlike on a `tool_call` update, where announcing
        // a call without one would leave nothing to render.
        title: request.toolCall.title ?? '',
        serverId: options.serverId,
        toolName: request.toolCall.name ?? undefined,
        tool: toToolInvocation(request.toolCall, options.serverId),
        options: request.options.map(toApprovalOption),
    };
}

/**
 * The commands a `/` trigger should offer.
 *
 * Exists because this is the *only* way ACP delivers them — the handshake has
 * no commands field — and because without it every consumer writes the same
 * cast-and-map by hand. Note the deliberate omission: `CommandItem.arguments`
 * is never populated, since ACP has no per-argument declarations. A command's
 * input is one free-text field, described by `input.hint`, which is carried
 * here as the description so the menu can show it.
 */
export function toCommandItems(
    update: AcpAvailableCommandsUpdate,
    options: AcpMapOptions = {},
): readonly CommandItem[] {
    return update.availableCommands.map((command) => ({
        name: command.name,
        label: command.name,
        description: command.input?.hint
            ? `${command.description} — ${command.input.hint}`
            : command.description,
        serverId: options.serverId,
        data: command,
    }));
}

/**
 * Maps an elicitation onto the request `InputRequired` renders.
 *
 * The `key` is supplied rather than taken from the wire because ACP does not
 * give a form one: a request carries a scope, a message and a schema, and the
 * whole thing is answered as a unit. `InputRequired` is built around a *keyed
 * set* because MCP can ask several things at once; ACP asks one at a time, so
 * the caller names it — usually with the id it parked the promise under.
 *
 * An unrecognised mode maps to a kind with neither a schema nor a URL, which
 * the component renders as "this client cannot answer that" and declines
 * explicitly. Stranding the call would be worse: the agent is blocked either
 * way, and only one of the two tells the server to offer something else.
 */
export function toInputRequest(
    request: AcpElicitation,
    key: string,
    options: AcpMapOptions = {},
): InputRequest {
    if (isAcpFormElicitation(request)) {
        return {
            key,
            kind: 'form',
            message: request.message,
            schema: request.requestedSchema,
            serverId: options.serverId,
        };
    }

    if (isAcpUrlElicitation(request)) {
        return {
            key,
            kind: 'url',
            message: request.message,
            url: request.url,
            serverId: options.serverId,
        };
    }

    return { key, kind: request.mode, message: request.message, serverId: options.serverId };
}

/**
 * The correlation id a form elicitation belongs to, if it named one.
 *
 * Separate from {@link toInputRequest} because it answers a different question:
 * not "what does this ask" but "what is it blocking". A request carrying a
 * `toolCallId` folds onto that call in the transcript; one without stands
 * alone.
 */
export function elicitationToolCall(request: AcpElicitation): string | undefined {
    return typeof request.toolCallId === 'string' ? request.toolCallId : undefined;
}

/**
 * File changes carried on a tool call, as a changeset.
 *
 * This is how ACP reports edits — there is no propose-edit method — so the
 * review surface is derived from the transcript rather than fed from a parallel
 * channel. `oldText` is null for a file being created, which becomes an empty
 * original: a diff against nothing is every line added, which is the truthful
 * rendering.
 */
export function toSessionChanges(
    update: AcpToolCallUpdate | AcpToolCallProgressUpdate,
): readonly SessionChange[] {
    return (update.content ?? []).filter(isAcpDiff).map((diff) => ({
        path: diff.path,
        original: diff.oldText ?? '',
        modified: diff.newText,
    }));
}

/**
 * A usage update, as a readout.
 *
 * `cost` is an object on the wire and two separate fields here, which is the
 * one place this mapping is not a rename.
 */
export function toUsageReadout(update: AcpUsageUpdate, previous: UsageReadout = {}): UsageReadout {
    return {
        ...previous,
        used: update.used,
        total: update.size,
        cost: update.cost?.amount,
        currency: update.cost?.currency,
    };
}
