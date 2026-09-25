import { describe, expect, it } from 'vitest';
import {
    createTranscriptState,
    transcriptReducer,
    type TranscriptAction,
    type TranscriptState,
} from './transcript';
import {
    isApprovalEntry,
    isMessageEntry,
    isPlanEntry,
    isToolEntry,
    type InputRequest,
    type ToolInvocation,
} from './types';

/** Replays a sequence from empty, the way an adapter would feed it. */
function run(...actions: TranscriptAction[]): TranscriptState {
    return actions.reduce(transcriptReducer, createTranscriptState());
}

function tool(correlationId: string, overrides: Partial<ToolInvocation> = {}): ToolInvocation {
    return {
        correlationId,
        kind: 'read',
        title: 'Read',
        status: 'running',
        ...overrides,
    };
}

const formRequest: InputRequest = {
    key: 'github_login',
    kind: 'form',
    message: 'Please provide your username',
    schema: { type: 'object', properties: { name: { type: 'string' } } },
};

describe('message chunks', () => {
    it('coalesces consecutive chunks into one entry', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'Found ' },
            { type: 'agent/message-chunk', text: 'the ' },
            { type: 'agent/message-chunk', text: 'bug.' },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.text).toBe('Found the bug.');
        expect(isMessageEntry(entry) && entry.streaming).toBe(true);
    });

    it('starts a new entry when the role changes, and settles the previous one', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'thinking out loud' },
            { type: 'agent/message-chunk', text: 'a note', role: 'system' },
        );

        expect(state.entries).toHaveLength(2);
        const [first, second] = state.entries;
        expect(isMessageEntry(first) && first.streaming).toBe(false);
        expect(isMessageEntry(second) && second.streaming).toBe(true);
    });

    it('keeps interleaved messages apart by source id', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'alpha', messageId: 'a' },
            { type: 'agent/message-chunk', text: 'beta', messageId: 'b' },
            { type: 'agent/message-chunk', text: '!', messageId: 'b' },
        );

        expect(state.entries).toHaveLength(2);
        expect(state.entries.map((e) => (isMessageEntry(e) ? e.text : ''))).toEqual([
            'alpha',
            'beta!',
        ]);
    });

    it('resumes an identified message after an intervening entry, without duplicating its id', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'Let me check. ', messageId: 'a' },
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/message-chunk', text: 'Found it.', messageId: 'a' },
        );

        expect(state.entries).toHaveLength(2);
        const ids = state.entries.map((entry) => entry.id);
        expect(new Set(ids).size).toBe(ids.length);

        const message = state.entries.find(isMessageEntry);
        expect(message?.text).toBe('Let me check. Found it.');
        expect(message?.streaming).toBe(true);
    });

    it('does not graft an anonymous chunk onto an identified message', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'identified', messageId: 'a' },
            { type: 'agent/message-chunk', text: 'anonymous' },
        );

        expect(state.entries).toHaveLength(2);
    });

    it('settles the open message when any other entry appears', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'working' },
            { type: 'agent/tool-call', tool: tool('c1') },
        );

        const [message] = state.entries;
        expect(isMessageEntry(message) && message.streaming).toBe(false);
        expect(state.openMessage).toBeNull();
    });
});

describe('tool calls', () => {
    it('collapses a call and its updates into one entry', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/tool-update', correlationId: 'c1', patch: { target: 'uploader.ts' } },
            { type: 'agent/tool-update', correlationId: 'c1', patch: { status: 'completed' } },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.tool.status).toBe('completed');
        expect(isToolEntry(entry) && entry.tool.target).toBe('uploader.ts');
    });

    it('keeps an entry id stable across updates', () => {
        const first = run({ type: 'agent/tool-call', tool: tool('c1') });
        const idBefore = first.entries[0].id;

        const later = transcriptReducer(first, {
            type: 'agent/tool-update',
            correlationId: 'c1',
            patch: { status: 'completed' },
        });

        expect(later.entries[0].id).toBe(idBefore);
    });

    it('ignores an update for a call it has never seen', () => {
        const state = run({
            type: 'agent/tool-update',
            correlationId: 'nope',
            patch: { status: 'completed' },
        });

        expect(state.entries).toHaveLength(0);
    });
});

describe('retries (T-22)', () => {
    it('renders one entry when the same call is re-issued under a new request id', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1', { requestId: '1' }) },
            { type: 'agent/input-required', correlationId: 'c1', requests: [formRequest] },
            // The client answered and re-issued the call. A different request id,
            // by protocol requirement — the same logical operation.
            { type: 'agent/tool-call', tool: tool('c1', { requestId: '2' }) },
            { type: 'agent/tool-update', correlationId: 'c1', patch: { status: 'completed' } },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.tool.requestId).toBe('2');
        expect(isToolEntry(entry) && entry.tool.status).toBe('completed');
    });

    it('still renders one entry when a call blocks twice before completing', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1', { requestId: '1' }) },
            { type: 'agent/input-required', correlationId: 'c1', requests: [formRequest] },
            { type: 'agent/tool-call', tool: tool('c1', { requestId: '2' }) },
            { type: 'agent/input-required', correlationId: 'c1', requests: [formRequest] },
            { type: 'agent/tool-call', tool: tool('c1', { requestId: '3' }) },
            { type: 'agent/tool-update', correlationId: 'c1', patch: { status: 'completed' } },
        );

        expect(state.entries).toHaveLength(1);
    });

    it('clears the pending requests once the call is re-issued', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/input-required', correlationId: 'c1', requests: [formRequest] },
            { type: 'agent/tool-call', tool: tool('c1') },
        );

        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.inputRequests).toBeUndefined();
    });
});

describe('progress', () => {
    it('attaches to the call it names rather than the last entry', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/tool-call', tool: tool('c2') },
            { type: 'agent/progress', correlationId: 'c1', progress: { value: 3, total: 10 } },
        );

        const [first, second] = state.entries;
        expect(isToolEntry(first) && first.tool.progress?.value).toBe(3);
        expect(isToolEntry(second) && second.tool.progress).toBeUndefined();
    });

    it('drops progress for an unknown call rather than showing it somewhere wrong', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/progress', correlationId: 'ghost', progress: { value: 1 } },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.tool.progress).toBeUndefined();
    });
});

describe('input requests', () => {
    it('folds onto the call it interrupted instead of appending a sibling', () => {
        const state = run(
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/input-required', correlationId: 'c1', requests: [formRequest] },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isToolEntry(entry) && entry.inputRequests).toHaveLength(1);
    });

    it('appends its own entry when it belongs to no call', () => {
        const state = run({ type: 'agent/input-required', requests: [formRequest] });

        expect(state.entries).toHaveLength(1);
        expect(state.entries[0].kind).toBe('input-required');
    });

    it('appends its own entry when the named call is unknown', () => {
        const state = run({
            type: 'agent/input-required',
            correlationId: 'ghost',
            requests: [formRequest],
        });

        expect(state.entries).toHaveLength(1);
        expect(state.entries[0].kind).toBe('input-required');
    });
});

describe('plans', () => {
    it('revises in place rather than accumulating stale copies', () => {
        const state = run(
            {
                type: 'agent/plan',
                items: [{ id: '1', text: 'Read the uploader', status: 'active' }],
            },
            { type: 'agent/message-chunk', text: 'working' },
            {
                type: 'agent/plan',
                items: [
                    { id: '1', text: 'Read the uploader', status: 'done' },
                    { id: '2', text: 'Add retries', status: 'active' },
                ],
            },
        );

        const plans = state.entries.filter(isPlanEntry);
        expect(plans).toHaveLength(1);
        expect(plans[0].items).toHaveLength(2);
        // Revised where it was, not moved to the end.
        expect(state.entries[0].kind).toBe('plan');
    });
});

describe('user messages (T-23)', () => {
    const value = [{ type: 'text' as const, text: 'fix the uploader' }];

    it('appears immediately as pending', () => {
        const state = run({ type: 'user/send', id: 'u:0', value, text: 'fix the uploader' });

        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.delivery).toBe('pending');
        expect(isMessageEntry(entry) && entry.role).toBe('user');
    });

    it('settles to sent', () => {
        const state = run(
            { type: 'user/send', id: 'u:0', value, text: 'fix the uploader' },
            { type: 'user/sent', id: 'u:0' },
        );

        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.delivery).toBe('sent');
    });

    it('keeps the composed value when the send fails, so it can be retried', () => {
        const state = run(
            { type: 'user/send', id: 'u:0', value, text: 'fix the uploader' },
            { type: 'user/failed', id: 'u:0', error: 'network died' },
        );

        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.delivery).toBe('failed');
        expect(isMessageEntry(entry) && entry.error).toBe('network died');
        expect(isMessageEntry(entry) && entry.value).toEqual(value);
    });

    it('clears a previous error when a retry succeeds', () => {
        const state = run(
            { type: 'user/send', id: 'u:0', value, text: 'fix the uploader' },
            { type: 'user/failed', id: 'u:0', error: 'network died' },
            { type: 'user/sent', id: 'u:0' },
        );

        const [entry] = state.entries;
        expect(isMessageEntry(entry) && entry.error).toBeUndefined();
    });
});

describe('custom entries', () => {
    it('accepts a kind the library knows nothing about', () => {
        const state = run({
            type: 'agent/custom',
            kind: 'deployment',
            data: { environment: 'staging' },
        });

        expect(state.entries).toHaveLength(1);
        expect(state.entries[0].kind).toBe('deployment');
    });
});

describe('identity is unique (T-84)', () => {
    const approval = {
        id: 'req-1',
        title: 'Run the tests',
        options: [{ id: 'yes', label: 'Allow', outcome: 'allow' as const, scope: 'once' as const }],
    };

    it('updates an approval re-asked under the same id, rather than adding a twin', () => {
        const state = run(
            { type: 'agent/approval', request: approval },
            { type: 'agent/approval', request: { ...approval, title: 'Run the tests (retry)' } },
        );

        // A duplicate could never be resolved — resolution looks up by id and
        // finds only the first — so the second kept its keydown listener for
        // the rest of the session.
        expect(state.entries).toHaveLength(1);
        const [entry] = state.entries;
        expect(isApprovalEntry(entry) && entry.request.title).toBe('Run the tests (retry)');
    });

    it('does not reopen an approval the user already answered', () => {
        const state = run(
            { type: 'agent/approval', request: approval },
            {
                type: 'approval/resolve',
                id: 'req-1',
                decision: { optionId: 'yes', outcome: 'allow', scope: { level: 'once' } },
            },
            { type: 'agent/approval', request: approval },
        );

        const [entry] = state.entries;
        expect(isApprovalEntry(entry) && entry.decision?.optionId).toBe('yes');
    });

    it('resolves an approval that was re-asked', () => {
        const state = run(
            { type: 'agent/approval', request: approval },
            { type: 'agent/approval', request: approval },
            {
                type: 'approval/resolve',
                id: 'req-1',
                decision: { optionId: 'yes', outcome: 'allow', scope: { level: 'once' } },
            },
        );

        // Previously the second entry stayed unresolved forever.
        expect(state.entries.filter((entry) => entry.kind === 'approval')).toHaveLength(1);
        expect(state.entries.every((entry) => !isApprovalEntry(entry) || entry.decision)).toBe(
            true,
        );
    });

    it('updates a custom entry re-dispatched under the same id', () => {
        const state = run(
            { type: 'agent/custom', kind: 'deployment', id: 'dep-1', data: { state: 'running' } },
            { type: 'agent/custom', kind: 'deployment', id: 'dep-1', data: { state: 'done' } },
        );

        expect(state.entries).toHaveLength(1);
        expect((state.entries[0] as { data: { state: string } }).data.state).toBe('done');
    });

    it('cannot have a generated id collide with a caller-supplied one', () => {
        const state = run(
            // The verified collision: generated ids used to be `e0`, `e1`, …
            { type: 'agent/custom', kind: 'deployment', id: 'e0', data: {} },
            { type: 'agent/plan', items: [] },
            { type: 'agent/custom', kind: 'deployment', id: 'bk:0', data: {} },
            { type: 'agent/message-chunk', text: 'hi' },
        );

        const ids = state.entries.map((entry) => entry.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('identity', () => {
    it('gives every entry a distinct id across a mixed run', () => {
        const state = run(
            { type: 'agent/message-chunk', text: 'one' },
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/message-chunk', text: 'two' },
            { type: 'agent/thought-chunk', text: 'hmm' },
            { type: 'agent/plan', items: [] },
            { type: 'user/send', id: 'u:0', value: [], text: '' },
        );

        const ids = state.entries.map((entry) => entry.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('replays identically from the same sequence', () => {
        const actions: TranscriptAction[] = [
            { type: 'agent/message-chunk', text: 'one' },
            { type: 'agent/tool-call', tool: tool('c1') },
            { type: 'agent/tool-update', correlationId: 'c1', patch: { status: 'completed' } },
        ];

        expect(run(...actions).entries).toEqual(run(...actions).entries);
    });
});
