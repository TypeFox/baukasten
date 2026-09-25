/**
 * This adapter's types, against the published ACP schema.
 *
 * ## Why this file exists
 *
 * `protocol.ts` is hand-written from a reading of the specification, and for a
 * long time nothing checked it. `AcpUsageUpdate.cost` was typed `number` when
 * the wire carries `{amount, currency}`. Tool-call `content` was
 * `readonly unknown[]`, so the `diff` variant — how ACP reports a file change —
 * was invisible and `SessionChanges` had no route from the wire.
 * `available_commands_update` had no type at all, so the only way an agent
 * announces slash commands was unreachable. And the module's own doc comment
 * asserted that ACP has no elicitation, which it does, in both the modes
 * `InputRequired` renders.
 *
 * Every one of those survived a four-hundred-test suite, because the tests were
 * written from the same reading of the specification as the code. Only
 * something outside that reading can catch the next one.
 *
 * ## Why not generate the types instead
 *
 * Because the leniency is load-bearing. `AcpUnknownUpdate` and
 * `AcpOtherContent` carry index signatures so that an update from a newer agent
 * *renders* rather than throwing; a generated closed union does the opposite.
 * And only the slice this adapter reads is typed, deliberately — the schema has
 * fifteen session updates and this maps seven.
 *
 * So the types stay hand-written, and this file checks them. Two different
 * things, which is why it is in two halves:
 *
 * **Fidelity** — for the fields we *do* declare, are they compatible? That is
 * assignability, and it is direction-sensitive. For something we receive,
 * theirs must fit ours: we have to accept anything the agent may legitimately
 * send. For something we send, ours must fit theirs. Mixing the two up is the
 * mistake that makes a conformance check feel like busywork, so the two
 * directions are separate sections with their own names.
 *
 * **Coverage** — what exists in the schema that we do not mention at all?
 * Assignability cannot answer this, because ignoring a field is never a type
 * error. `ToolCall.name`, the `diff` variant and `available_commands_update`
 * were all omissions, and an omission is a decision nobody made. So each
 * discriminated union in the schema gets a record keyed by *its* discriminant:
 * add a variant upstream and this file stops compiling until someone writes a
 * line saying what we do about it.
 *
 * ## Why a `.test.ts` that also has its own tsconfig
 *
 * The runtime half — string unions, the permission kinds — is ordinary vitest.
 * The type half is invisible to vitest, which transpiles rather than
 * typechecks, so it would pass vacuously. `npm run check:protocol` typechecks
 * this file through `tsconfig.conformance.json`, and `npm test` runs that
 * first. `tsconfig.build.json` already excludes `*.test.ts`, so none of this
 * reaches `dist` and the SDK stays a devDependency with no runtime weight.
 *
 * ## What is deliberately not here
 *
 * Method names. This module is a *mapper*, not a client — it never dispatches a
 * method. Which methods a client answers is checked where a client exists, in
 * `packages/examples/vscode-asm/src/acp/conformance.test.ts`.
 */

import { describe, expect, it } from 'vitest';
import type {
    AvailableCommand,
    ContentBlock,
    Cost,
    CreateElicitationRequest,
    CreateElicitationResponse,
    PermissionOption,
    PermissionOptionKind,
    PlanEntry,
    PlanEntryPriority,
    PlanEntryStatus,
    RequestPermissionRequest,
    SessionUpdate,
    StopReason,
    ToolCallContent,
    ToolCallLocation,
    ToolCallStatus,
    ToolKind,
} from '@agentclientprotocol/sdk';

import { TOOL_KINDS, type KnownToolKind } from '../types';
import { acpPermissionOutcome } from './map';
import type {
    AcpAvailableCommand,
    AcpAvailableCommandsUpdate,
    AcpContentBlock,
    AcpCost,
    AcpCurrentModeUpdate,
    AcpDiffContent,
    AcpElicitationResponse,
    AcpFormElicitation,
    AcpMessageChunkUpdate,
    AcpPermissionOption,
    AcpPlanEntry,
    AcpPlanEntryPriority,
    AcpPlanEntryStatus,
    AcpPlanUpdate,
    AcpRequestPermission,
    AcpResourceLinkContent,
    AcpStopReason,
    AcpTextContent,
    AcpToolCallKind,
    AcpToolCallLocation,
    AcpToolCallProgressUpdate,
    AcpToolCallStatus,
    AcpToolCallUpdate,
    AcpUrlElicitation,
    AcpUsageUpdate,
} from './protocol';

/** One variant of a schema union, by its discriminant. */
type Variant<TUnion, TKey extends string, TValue extends string> = Extract<
    TUnion,
    Record<TKey, TValue>
>;

type Update<TValue extends string> = Variant<SessionUpdate, 'sessionUpdate', TValue>;

// ─── Fidelity: what we receive ──────────────────────────────────────────────

/*
 * Theirs must fit ours.
 *
 * Plain assignment rather than a `Assert<IsAssignable<A, B>>` helper, because
 * the diagnostic is the whole point: an assignment says *which field* and shows
 * both types, where a conditional-type helper only says that `false` does not
 * satisfy `true`. Exported so `noUnusedLocals` stays happy; nothing imports
 * this module.
 *
 * Asserted per variant rather than union-to-union. A union check passes as soon
 * as every member lands *somewhere*, and every member lands on
 * `AcpUnknownUpdate` — so it would be green while the specific types rotted.
 */

export const _receivesMessageChunk: AcpMessageChunkUpdate = {} as Update<'agent_message_chunk'>;
export const _receivesUserChunk: AcpMessageChunkUpdate = {} as Update<'user_message_chunk'>;
export const _receivesThoughtChunk: AcpMessageChunkUpdate = {} as Update<'agent_thought_chunk'>;
export const _receivesToolCall: AcpToolCallUpdate = {} as Update<'tool_call'>;
export const _receivesToolProgress: AcpToolCallProgressUpdate = {} as Update<'tool_call_update'>;
export const _receivesPlan: AcpPlanUpdate = {} as Update<'plan'>;
export const _receivesUsage: AcpUsageUpdate = {} as Update<'usage_update'>;
export const _receivesCommands: AcpAvailableCommandsUpdate =
    {} as Update<'available_commands_update'>;
export const _receivesMode: AcpCurrentModeUpdate = {} as Update<'current_mode_update'>;

export const _receivesContentBlock: AcpContentBlock = {} as ContentBlock;
export const _receivesText: AcpTextContent = {} as Variant<ContentBlock, 'type', 'text'>;
export const _receivesLink: AcpResourceLinkContent = {} as Variant<
    ContentBlock,
    'type',
    'resource_link'
>;

/** The variant that makes `SessionChanges` possible, and was `unknown` until recently. */
export const _receivesDiff: AcpDiffContent = {} as Variant<ToolCallContent, 'type', 'diff'>;

export const _receivesLocation: AcpToolCallLocation = {} as ToolCallLocation;
export const _receivesPlanEntry: AcpPlanEntry = {} as PlanEntry;
export const _receivesCost: AcpCost = {} as Cost;
export const _receivesCommand: AcpAvailableCommand = {} as AvailableCommand;
export const _receivesPermissionOption: AcpPermissionOption = {} as PermissionOption;
export const _receivesPermissionRequest: AcpRequestPermission = {} as RequestPermissionRequest;

export const _receivesFormElicitation: AcpFormElicitation = {} as Variant<
    CreateElicitationRequest,
    'mode',
    'form'
>;
export const _receivesUrlElicitation: AcpUrlElicitation = {} as Variant<
    CreateElicitationRequest,
    'mode',
    'url'
>;

// ─── Fidelity: what we send ─────────────────────────────────────────────────

/*
 * Ours must fit theirs — the other direction, and the reason the two groups are
 * named rather than merged. Something the agent accepts from us is only correct
 * if everything we can produce is valid input; whether we could also accept
 * more than it sends is irrelevant.
 *
 * Short list, because this module maps inbound almost exclusively. The response
 * to an elicitation is the one thing it describes going the other way.
 */

export const _sendsElicitationResponse: CreateElicitationResponse =
    {} as AcpElicitationResponse;

// ─── Fidelity: closed unions that must match exactly ────────────────────────

/*
 * Both directions, which together mean equality.
 *
 * These are the string unions this library narrows *to* — the ones an
 * exhaustive switch is written against. A value the schema permits and we do
 * not is an unhandled case; one we permit and it does not is a branch that can
 * never run and will be believed anyway.
 */

export const _toolKindsCoverTheirs: AcpToolCallKind = {} as ToolKind;
export const _toolKindsInventNothing: ToolKind = {} as AcpToolCallKind;

/** `TOOL_KINDS` is the protocol-free list the components map to icons. */
export const _knownToolKindsCoverTheirs: KnownToolKind = {} as ToolKind;
export const _knownToolKindsInventNothing: ToolKind = {} as KnownToolKind;

export const _statusesCoverTheirs: AcpToolCallStatus = {} as ToolCallStatus;
export const _statusesInventNothing: ToolCallStatus = {} as AcpToolCallStatus;

export const _stopReasonsCoverTheirs: AcpStopReason = {} as StopReason;
export const _stopReasonsInventNothing: StopReason = {} as AcpStopReason;

export const _planStatusesCoverTheirs: AcpPlanEntryStatus = {} as PlanEntryStatus;
export const _planStatusesInventNothing: PlanEntryStatus = {} as AcpPlanEntryStatus;

export const _planPrioritiesCoverTheirs: AcpPlanEntryPriority = {} as PlanEntryPriority;

// ─── Coverage ───────────────────────────────────────────────────────────────

/**
 * What this adapter does about one thing the schema defines.
 *
 * Three states, because the adapter genuinely has three. It maps some updates
 * onto transcript entries, *routes* others to state the application shows
 * around the transcript, and drops the rest. Collapsing routed into mapped
 * would make `toTranscriptAction` returning null look like a gap when it is the
 * design.
 */
type Handling =
    | { readonly status: 'mapped'; readonly by: string }
    | { readonly status: 'routed'; readonly by: string }
    | { readonly status: 'ignored'; readonly because: string };

const mapped = (by: string): Handling => ({ status: 'mapped', by });
const routed = (by: string): Handling => ({ status: 'routed', by });
const ignored = (because: string): Handling => ({ status: 'ignored', because });

/**
 * Every session update the schema defines, and what becomes of it.
 *
 * Keyed by the schema's own discriminant, so **adding a variant upstream breaks
 * this file** until someone writes a line about it. That is the entire point:
 * the last three gaps were not wrong decisions, they were decisions nobody
 * made, and silence is what this turns into a compile error.
 */
export const SESSION_UPDATES: Record<SessionUpdate['sessionUpdate'], Handling> = {
    user_message_chunk: mapped('toTranscriptAction → agent/message-chunk'),
    agent_message_chunk: mapped('toTranscriptAction → agent/message-chunk'),
    agent_thought_chunk: mapped('toTranscriptAction → agent/thought-chunk'),
    tool_call: mapped('toTranscriptAction → agent/tool-call, plus toSessionChanges'),
    tool_call_update: mapped('toTranscriptAction → agent/tool-update, plus toSessionChanges'),
    plan: mapped('toTranscriptAction → agent/plan'),

    usage_update: routed('toUsageReadout → UsageMeter'),
    available_commands_update: routed('toCommandItems → the composer’s / trigger'),
    current_mode_update: routed('isAcpCurrentMode → the composer’s mode selector'),

    session_info_update: ignored(
        'A session title and timestamp. Chrome around the panel, which is the ' +
            'host’s to render — the library has no session-list surface.',
    ),
    config_option_update: ignored(
        'Session config options are ACP’s "steer the agent" surface and have no ' +
            'component yet. Worth one: it is the honest ACP counterpart to ToolPicker.',
    ),
    plan_update: ignored(
        'Experimental, and id-addressed: a plan identified by id, updatable in ' +
            'place, optionally a file or markdown rather than entries. The ' +
            'reducer holds exactly one plan and revises it wholesale. Supporting ' +
            'this means plans becoming a keyed collection — a real change, not an ' +
            'oversight. Gated behind ClientCapabilities.plan, which we do not send.',
    ),
    plan_removed: ignored('Same as plan_update; nothing can be removed that cannot be added.'),
    compaction_update: ignored(
        'Agent-side context management. Experimental, and gated behind ' +
            'ClientSessionCapabilities.compaction, which we do not send.',
    ),
    compaction_summary_chunk: ignored('Same as compaction_update.'),
};

/**
 * Content blocks, and what `toText` does with each.
 *
 * `toText` returns an empty string for anything it cannot read, which is
 * deliberate — a block type this version does not know must not blank the
 * message around it. This record is where that becomes visible rather than
 * looking like a missing branch.
 */
export const CONTENT_BLOCKS: Record<ContentBlock['type'], Handling> = {
    text: mapped('toText → the text'),
    resource_link: mapped('toText → the name, falling back to the uri'),
    image: ignored(
        'No component renders an inline image in a message yet. ResourcePreview ' +
            'handles image *resources*; this is an image inside a chunk.',
    ),
    audio: ignored('Nothing renders audio.'),
    resource: ignored(
        'Embedded resource contents. ResourcePreview takes ResourceContent and ' +
            'could render these — the missing piece is a mapper, not a component.',
    ),
};

/**
 * Tool-call content.
 *
 * `diff` is the one that matters and the one that was missing: it is how ACP
 * reports a file change, and its absence is why the ASM workbench invented a
 * propose-edit method for something the protocol already had.
 */
export const TOOL_CALL_CONTENT: Record<ToolCallContent['type'], Handling> = {
    diff: mapped('toSessionChanges → SessionChange[]'),
    content: ignored(
        'Text and images produced by a tool. ToolCall renders `rawOutput`; ' +
            'rendering structured content blocks in a tool body is a component ' +
            'question, not a mapping one.',
    ),
    terminal: ignored(
        'An embedded live terminal, by id. Needs the terminal/* client methods ' +
            'and a component to host it; we advertise terminal: false.',
    ),
};

/**
 * Elicitation modes, against `InputRequest`'s kinds.
 *
 * The fit here is the finding that mattered: `form` and `url` are exactly the
 * two kinds `InputRequired` renders, over the same restricted schema
 * `readElicitationSchema` already parses. This adapter documented the opposite
 * for months.
 */
export const ELICITATION_MODES: Record<CreateElicitationRequest['mode'] & string, Handling> = {
    form: mapped('toInputRequest → FormInputRequest'),
    url: mapped('toInputRequest → UrlInputRequest'),
};

/** Permission option kinds, against what `acpPermissionOutcome` decides. */
export const PERMISSION_KINDS: Record<PermissionOptionKind, Handling> = {
    allow_once: mapped('acpPermissionOutcome → allow / once'),
    allow_always: mapped('acpPermissionOutcome → allow / tool'),
    reject_once: mapped('acpPermissionOutcome → deny / once'),
    reject_always: mapped('acpPermissionOutcome → deny / tool'),
};

// ─── The runtime half ───────────────────────────────────────────────────────

describe('the coverage records', () => {
    it('account for every session update the schema defines', () => {
        // The type already guarantees this; the count is here so a reader sees
        // the number, and so deleting a key is caught by a failing test rather
        // than only by a typecheck someone might not have run.
        expect(Object.keys(SESSION_UPDATES)).toHaveLength(15);
    });

    it('map or route everything the components need, and say why for the rest', () => {
        const handled = Object.entries(SESSION_UPDATES).filter(
            ([, handling]) => handling.status !== 'ignored',
        );

        expect(handled.map(([name]) => name).sort()).toEqual([
            'agent_message_chunk',
            'agent_thought_chunk',
            'available_commands_update',
            'current_mode_update',
            'plan',
            'tool_call',
            'tool_call_update',
            'usage_update',
            'user_message_chunk',
        ]);
    });

    it('give a reason for everything ignored', () => {
        /*
         * What this is guarding against is someone adding a variant and
         * writing `ignored('')` or `ignored('TODO')` to get the build green —
         * a real gap wearing the costume of a decision.
         *
         * The first version of this check asserted a minimum length, and it
         * failed on `compaction_summary_chunk: 'Same as compaction_update.'` —
         * which is a perfectly good reason that happens to be short, because a
         * cross-reference does not need restating. A length threshold is a
         * proxy for thought, and proxies punish exactly the concise cases you
         * want to encourage.
         */
        const placeholders = ['', 'todo', 'tbd', 'n/a', 'fixme', '?'];

        for (const [name, handling] of Object.entries(SESSION_UPDATES)) {
            if (handling.status !== 'ignored') continue;

            const reason = handling.because.trim().toLowerCase().replace(/[.!]+$/, '');
            expect(placeholders, `${name} is ignored without a reason`).not.toContain(reason);
        }
    });
});

describe('closed unions the components switch on', () => {
    it('lists exactly the tool kinds the schema defines', () => {
        // The type assertions above prove the unions are equal; this proves the
        // exported *array* has not drifted from the union it is meant to mirror.
        expect([...TOOL_KINDS].sort()).toEqual(
            [
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
            ].sort(),
        );
    });
});

describe('permission option kinds', () => {
    it('decides an outcome and a scope for each one the schema defines', () => {
        for (const kind of Object.keys(PERMISSION_KINDS) as PermissionOptionKind[]) {
            const decision = acpPermissionOutcome(kind);

            expect(['allow', 'deny']).toContain(decision.outcome);
            expect(['once', 'tool', 'server']).toContain(decision.scope);
        }
    });

    it('still denies narrowly for a kind the schema does not define', () => {
        // The safe direction, and the reason this is not a lookup table: a kind
        // added upstream must not grant anything until someone decides it does.
        expect(acpPermissionOutcome('allow_for_the_whole_afternoon')).toEqual({
            outcome: 'deny',
            scope: 'once',
        });
    });
});
