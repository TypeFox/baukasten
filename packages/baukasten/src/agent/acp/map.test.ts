import { describe, expect, it } from 'vitest';
import { createTranscriptState, transcriptReducer, type TranscriptAction } from '../transcript';
import {
    isFormInputRequest,
    isMessageEntry,
    isPlanEntry,
    isThoughtEntry,
    isToolEntry,
    isUrlInputRequest,
} from '../types';
import { readElicitationSchema } from '../components/InputRequired';
import {
    acpPermissionOutcome,
    elicitationToolCall,
    toApprovalRequest,
    toCommandItems,
    toInputRequest,
    toSessionChanges,
    toToolStatus,
    toTranscriptAction,
    toUsageReadout,
} from './map';
import { isAcpAvailableCommands, isAcpDiff } from './protocol';
import type { AcpSessionUpdate } from './protocol';

/**
 * The point of these tests is narrower than it looks.
 *
 * They are not really about ACP. They check that a second, independently
 * designed protocol lands on the types built for the first one — that the
 * reducer consumes ACP-derived actions without a new entry kind, a widened
 * union, or a field added for its benefit. If this file ever needs a type that
 * MCP did not, the abstraction has failed and we would rather know here.
 */

function apply(updates: readonly AcpSessionUpdate[]) {
    const actions = updates
        .map((update) => toTranscriptAction(update))
        .filter((action): action is TranscriptAction => action !== null);

    return actions.reduce(transcriptReducer, createTranscriptState());
}

describe('status and kind', () => {
    it('renames in_progress to running and passes the rest through', () => {
        expect(toToolStatus('pending')).toBe('pending');
        expect(toToolStatus('in_progress')).toBe('running');
        expect(toToolStatus('completed')).toBe('completed');
        expect(toToolStatus('failed')).toBe('failed');
    });

    it('treats a status it has never seen as pending rather than throwing', () => {
        expect(toToolStatus('teleporting')).toBe('pending');
        expect(toToolStatus(undefined)).toBe('pending');
    });
});

describe('message chunks', () => {
    it('folds into the same message entries the MCP path produces', () => {
        const state = apply([
            {
                sessionUpdate: 'agent_message_chunk',
                content: { type: 'text', text: 'Found ' },
                messageId: 'm1',
            },
            {
                sessionUpdate: 'agent_message_chunk',
                content: { type: 'text', text: 'it.' },
                messageId: 'm1',
            },
        ]);

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.text).toBe('Found it.');
        expect(isMessageEntry(entry) && entry.role).toBe('agent');
    });

    it('keeps a user chunk distinct from an agent one', () => {
        const state = apply([
            { sessionUpdate: 'user_message_chunk', content: { type: 'text', text: 'hi' } },
            { sessionUpdate: 'agent_message_chunk', content: { type: 'text', text: 'hello' } },
        ]);

        expect(state.entries).toHaveLength(2);
        expect(isMessageEntry(state.entries[0]) && state.entries[0].role).toBe('user');
    });

    it('treats an explicitly null messageId as anonymous, not as an id', () => {
        /*
         * The schema says omitted and null are equivalent, and Rust agents
         * serialise `None` as null rather than dropping the key. The reducer
         * distinguishes named from anonymous chunks by `!== undefined`, so
         * passing a null through made every anonymous chunk claim the literal
         * id `m:null` — and two unrelated messages coalesced into one entry.
         *
         * Nothing threw, nothing looked wrong in isolation, and no test caught
         * it. The schema conformance check did, by refusing to let
         * `AcpMessageChunkUpdate.messageId` be merely optional.
         */
        const state = apply([
            {
                sessionUpdate: 'agent_message_chunk',
                content: { type: 'text', text: 'first' },
                messageId: null,
            },
            { sessionUpdate: 'tool_call', toolCallId: 'c1', title: 'Something in between' },
            {
                sessionUpdate: 'agent_message_chunk',
                content: { type: 'text', text: 'second' },
                messageId: null,
            },
        ]);

        // Two separate messages. If null were read as an id, the second chunk
        // would have resumed the first entry and this would be one.
        const messages = state.entries.filter(isMessageEntry);
        expect(messages).toHaveLength(2);
        expect(messages.map((entry) => entry.text)).toEqual(['first', 'second']);
    });

    it('routes a thought chunk to a thought entry, not a message', () => {
        const state = apply([
            { sessionUpdate: 'agent_thought_chunk', content: { type: 'text', text: 'hmm' } },
        ]);

        expect(isThoughtEntry(state.entries[0])).toBe(true);
    });

    it('reads a resource link as its name', () => {
        const state = apply([
            {
                sessionUpdate: 'agent_message_chunk',
                content: { type: 'resource_link', uri: 'file:///a.rs', name: 'a.rs' },
            },
        ]);

        expect(isMessageEntry(state.entries[0]) && state.entries[0].text).toBe('a.rs');
    });
});

describe('tool calls', () => {
    it('collapses a call and its updates into one entry', () => {
        const state = apply([
            {
                sessionUpdate: 'tool_call',
                toolCallId: 'call_1',
                title: 'Read file',
                kind: 'read',
                status: 'pending',
                locations: [{ path: 'src/uploader.ts' }],
            },
            { sessionUpdate: 'tool_call_update', toolCallId: 'call_1', status: 'in_progress' },
            {
                sessionUpdate: 'tool_call_update',
                toolCallId: 'call_1',
                status: 'completed',
                rawOutput: '62 lines',
            },
        ]);

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.tool.status).toBe('completed');
        expect(isToolEntry(entry) && entry.tool.kind).toBe('read');
        expect(isToolEntry(entry) && entry.tool.target).toBe('src/uploader.ts');
        expect(isToolEntry(entry) && entry.tool.result).toBe('62 lines');
    });

    it('does not blank fields an update chose not to resend', () => {
        const state = apply([
            {
                sessionUpdate: 'tool_call',
                toolCallId: 'call_1',
                title: 'Read file',
                kind: 'read',
                locations: [{ path: 'src/uploader.ts' }],
            },
            // Status only. Title, kind and target must survive.
            { sessionUpdate: 'tool_call_update', toolCallId: 'call_1', status: 'completed' },
        ]);

        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.tool.title).toBe('Read file');
        expect(isToolEntry(entry) && entry.tool.kind).toBe('read');
        expect(isToolEntry(entry) && entry.tool.target).toBe('src/uploader.ts');
    });

    it('uses the call id as the correlation id, since ACP does not re-issue', () => {
        const state = apply([{ sessionUpdate: 'tool_call', toolCallId: 'call_1', title: 'Read' }]);

        expect(state.toolIndex).toHaveProperty('call_1');
    });
});

describe('plans', () => {
    it('maps entries and revises in place', () => {
        const state = apply([
            {
                sessionUpdate: 'plan',
                entries: [
                    { content: 'Read the uploader', status: 'in_progress', priority: 'high' },
                ],
            },
            {
                sessionUpdate: 'plan',
                entries: [
                    { content: 'Read the uploader', status: 'completed' },
                    { content: 'Add retries', status: 'pending' },
                ],
            },
        ]);

        const plans = state.entries.filter(isPlanEntry);
        expect(plans).toHaveLength(1);
        expect(plans[0].items).toHaveLength(2);
        expect(plans[0].items[0].status).toBe('done');
    });
});

describe('updates that are not transcript entries', () => {
    it('returns null rather than inventing an entry', () => {
        expect(toTranscriptAction({ sessionUpdate: 'usage_update', used: 1, size: 2 })).toBeNull();
        expect(toTranscriptAction({ sessionUpdate: 'current_mode_update' })).toBeNull();
        expect(toTranscriptAction({ sessionUpdate: 'something_new_in_v2' })).toBeNull();
    });
});

describe('permission requests', () => {
    it('maps a tool call and its options onto an approval', () => {
        const approval = toApprovalRequest({
            sessionId: 's1',
            toolCall: { sessionUpdate: 'tool_call', toolCallId: 'call_1', title: 'Delete file' },
            options: [
                { optionId: 'o1', name: 'Allow', kind: 'allow_once' },
                { optionId: 'o2', name: 'Always allow', kind: 'allow_always' },
                { optionId: 'o3', name: 'Reject', kind: 'reject_once' },
            ],
        });

        expect(approval.id).toBe('call_1');
        expect(approval.tool?.correlationId).toBe('call_1');
        expect(approval.options.map((option) => [option.outcome, option.scope])).toEqual([
            ['allow', 'once'],
            ['allow', 'tool'],
            ['deny', 'once'],
        ]);
    });

    it("never sets severity, which is the application's call", () => {
        const approval = toApprovalRequest({
            sessionId: 's1',
            toolCall: { sessionUpdate: 'tool_call', toolCallId: 'call_1', title: 'rm -rf' },
            options: [],
        });

        expect(approval.severity).toBeUndefined();
    });

    it('maps all four schema option kinds', () => {
        expect(acpPermissionOutcome('allow_once')).toEqual({ outcome: 'allow', scope: 'once' });
        expect(acpPermissionOutcome('allow_always')).toEqual({ outcome: 'allow', scope: 'tool' });
        expect(acpPermissionOutcome('reject_once')).toEqual({ outcome: 'deny', scope: 'once' });
        expect(acpPermissionOutcome('reject_always')).toEqual({ outcome: 'deny', scope: 'tool' });
    });

    it('denies narrowly when the kind is unrecognised', () => {
        // Wrong in the safe direction: an unknown option must not grant.
        expect(acpPermissionOutcome('who_knows')).toEqual({ outcome: 'deny', scope: 'once' });
    });
});

describe('slash commands', () => {
    const update = {
        sessionUpdate: 'available_commands_update' as const,
        availableCommands: [
            { name: 'plan', description: 'Draft a plan' },
            { name: 'review', description: 'Review a file', input: { hint: 'path' } },
        ],
    };

    it('is recognised by a guard, like every other update', () => {
        expect(isAcpAvailableCommands(update)).toBe(true);
        expect(isAcpAvailableCommands({ sessionUpdate: 'available_commands_update' })).toBe(false);
    });

    it('maps onto the items a `/` trigger consumes', () => {
        const items = toCommandItems(update);

        expect(items.map((item) => item.name)).toEqual(['plan', 'review']);
        expect(items[0].label).toBe('plan');
    });

    it('carries the input hint in the description, since there is nowhere else', () => {
        const [, review] = toCommandItems(update);
        expect(review.description).toContain('path');
    });

    it('never declares arguments, because ACP has none', () => {
        // The declared-argument feature is an MCP prompt thing. Populating it
        // from a single unstructured hint would promise structure that is not
        // there, and the editor would render an argument field the agent has no
        // way to receive.
        expect(toCommandItems(update).every((item) => item.arguments === undefined)).toBe(true);
    });

    it('is not a transcript entry', () => {
        expect(toTranscriptAction(update)).toBeNull();
    });
});

describe('elicitation', () => {
    it('maps a form onto the request InputRequired renders', () => {
        const request = toInputRequest(
            {
                mode: 'form',
                sessionId: 's1',
                toolCallId: 'call_1',
                message: 'Which branch?',
                requestedSchema: {
                    type: 'object',
                    properties: { branch: { type: 'string', title: 'Branch' } },
                    required: ['branch'],
                },
            },
            'q1',
        );

        expect(isFormInputRequest(request)).toBe(true);
        expect(request.key).toBe('q1');
        expect(request.message).toBe('Which branch?');
    });

    it('produces a schema the existing reader already parses', () => {
        // The fit is the point: ACP's restricted elicitation schema is the same
        // subset `readElicitationSchema` was written for, so the component needs
        // no ACP-specific path.
        const request = toInputRequest(
            {
                mode: 'form',
                sessionId: 's1',
                message: 'Pick one',
                requestedSchema: {
                    type: 'object',
                    properties: {
                        level: {
                            type: 'string',
                            title: 'Level',
                            oneOf: [
                                { const: 'low', title: 'Low' },
                                { const: 'high', title: 'High' },
                            ],
                        },
                        count: { type: 'integer', title: 'Count', minimum: 1 },
                    },
                    required: ['level'],
                },
            },
            'q1',
        );

        const fields = readElicitationSchema(
            isFormInputRequest(request) ? request.schema : undefined,
        );

        expect(fields.map((field) => field.kind)).toEqual(['enum', 'number']);
        expect(fields[0].required).toBe(true);
    });

    it('maps a url request onto the consent kind', () => {
        const request = toInputRequest(
            {
                mode: 'url',
                sessionId: 's1',
                elicitationId: 'e1',
                message: 'Finish signing in',
                url: 'https://example.com/auth',
            },
            'e1',
        );

        expect(isUrlInputRequest(request)).toBe(true);
        expect(isUrlInputRequest(request) && request.url).toBe('https://example.com/auth');
    });

    it('declines a mode it does not know rather than stranding the call', () => {
        const request = toInputRequest(
            { mode: 'telepathy', sessionId: 's1', message: 'Think at me' },
            'q1',
        );

        expect(isFormInputRequest(request)).toBe(false);
        expect(isUrlInputRequest(request)).toBe(false);
        // The component renders "this client cannot answer that" and declines,
        // which at least lets the agent offer something else.
        expect(request.kind).toBe('telepathy');
    });

    it('reports the tool call a form is tied to, when it names one', () => {
        expect(
            elicitationToolCall({
                mode: 'form',
                sessionId: 's1',
                toolCallId: 'call_1',
                message: '',
                requestedSchema: {},
            }),
        ).toBe('call_1');

        // Optional. Without it the question stands alone in the transcript.
        expect(
            elicitationToolCall({
                mode: 'form',
                sessionId: 's1',
                message: '',
                requestedSchema: {},
            }),
        ).toBeUndefined();
    });
});

describe('file changes', () => {
    it('reads diffs off the tool call that made them', () => {
        const changes = toSessionChanges({
            sessionUpdate: 'tool_call_update',
            toolCallId: 'c1',
            content: [
                { type: 'content', content: { type: 'text', text: 'ignore me' } },
                { type: 'diff', path: 'src/a.ts', oldText: 'a', newText: 'b' },
            ],
        });

        expect(changes).toEqual([{ path: 'src/a.ts', original: 'a', modified: 'b' }]);
    });

    it('treats a created file as a diff against nothing', () => {
        const [change] = toSessionChanges({
            sessionUpdate: 'tool_call',
            toolCallId: 'c1',
            title: 'Create',
            content: [{ type: 'diff', path: 'src/new.ts', newText: 'hello' }],
        });

        // Every line added, which is the truthful rendering.
        expect(change.original).toBe('');
        expect(change.modified).toBe('hello');
    });

    it('is empty for a call that changed no files', () => {
        expect(toSessionChanges({ sessionUpdate: 'tool_call', toolCallId: 'c1', title: 'Read' })).toEqual(
            [],
        );
    });

    it('recognises a diff by its payload, not its tag alone', () => {
        expect(isAcpDiff({ type: 'diff', path: 'a', newText: 'b' })).toBe(true);
        expect(isAcpDiff({ type: 'diff', path: 'a' })).toBe(false);
        expect(isAcpDiff({ type: 'terminal', terminalId: 't1' })).toBe(false);
    });
});

describe('usage', () => {
    it('splits the cost object into an amount and a currency', () => {
        // On the wire it is `{amount, currency}`. This adapter typed it as a
        // bare number until a real agent proved otherwise.
        expect(
            toUsageReadout({
                sessionUpdate: 'usage_update',
                used: 48_000,
                size: 200_000,
                cost: { amount: 1.25, currency: 'USD' },
            }),
        ).toMatchObject({ used: 48_000, total: 200_000, cost: 1.25, currency: 'USD' });
    });

    it('keeps what the caller already knew', () => {
        const readout = toUsageReadout(
            { sessionUpdate: 'usage_update', used: 10, size: 100 },
            { toolCount: 7, toolTokens: 900 },
        );

        expect(readout).toMatchObject({ used: 10, total: 100, toolCount: 7, toolTokens: 900 });
        expect(readout.cost).toBeUndefined();
    });
});

describe('the tool name a standing permission keys on', () => {
    it('comes from the call’s programmatic name when the agent sends one', () => {
        const approval = toApprovalRequest({
            sessionId: 's1',
            toolCall: {
                sessionUpdate: 'tool_call',
                toolCallId: 'call_1',
                name: 'write_file',
                title: 'Write src/a.ts',
            },
            options: [],
        });

        expect(approval.toolName).toBe('write_file');
    });

    it('is absent when the agent omits it, so a standing grant degrades to once', () => {
        // The title is a sentence that changes per call; scoping a persistent
        // grant to it would be worse than not persisting at all.
        const approval = toApprovalRequest({
            sessionId: 's1',
            toolCall: { sessionUpdate: 'tool_call', toolCallId: 'call_1', title: 'Write src/a.ts' },
            options: [],
        });

        expect(approval.toolName).toBeUndefined();
    });
});

describe('the abstraction holds', () => {
    it('renders a whole ACP turn using only entry kinds MCP already needed', () => {
        const state = apply([
            { sessionUpdate: 'user_message_chunk', content: { type: 'text', text: 'fix it' } },
            { sessionUpdate: 'plan', entries: [{ content: 'Read', status: 'in_progress' }] },
            { sessionUpdate: 'agent_thought_chunk', content: { type: 'text', text: 'checking' } },
            { sessionUpdate: 'tool_call', toolCallId: 'c1', title: 'Read', kind: 'read' },
            { sessionUpdate: 'tool_call_update', toolCallId: 'c1', status: 'completed' },
            { sessionUpdate: 'agent_message_chunk', content: { type: 'text', text: 'done' } },
        ]);

        expect(state.entries.map((entry) => entry.kind)).toEqual([
            'message',
            'plan',
            'thought',
            'tool',
            'message',
        ]);
    });
});
