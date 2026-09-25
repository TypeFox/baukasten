import { describe, expect, it, vi } from 'vitest';
import { createTranscriptState, transcriptReducer, type TranscriptAction } from '../transcript';
import { isMessageEntry, isPlanEntry, isToolEntry } from '../types';
import { createMockAgent, type MockStep } from './createMockAgent';
import { DEMO_SCRIPT } from './demoScript';

/**
 * Every script here runs with `wait` stubbed to resolve immediately, so the
 * tests are fast and deterministic without fake timers. Cancellation is still
 * exercised, because the run-id guard is checked after every await regardless
 * of how long the await took.
 */
const instant = () => Promise.resolve();

/** Collects dispatched actions and folds them, the way an application would. */
function harness() {
    const actions: TranscriptAction[] = [];
    return {
        actions,
        dispatch: (action: TranscriptAction) => actions.push(action),
        get state() {
            return actions.reduce(transcriptReducer, createTranscriptState());
        },
    };
}

async function settle(): Promise<void> {
    // The walk is a chain of already-resolved promises; a few microtask turns
    // is enough to drain it.
    for (let i = 0; i < 200; i++) await Promise.resolve();
}

describe('createMockAgent', () => {
    it('emits the same action shape an adapter produces', async () => {
        const h = harness();
        const script: readonly MockStep[] = [
            { kind: 'user', text: 'fix it' },
            { kind: 'tool', correlationId: 'c1', title: 'Read', toolKind: 'read' },
            { kind: 'message', text: 'done', typing: false },
        ];

        createMockAgent(script, { dispatch: h.dispatch, wait: instant }).start();
        await settle();

        // The assertion that matters: folding the mock's output through the
        // real reducer produces real entries, with no mock-shaped special case.
        const { entries } = h.state;
        expect(entries.map((entry) => entry.kind)).toEqual(['message', 'tool', 'message']);
        expect(isToolEntry(entries[1]) && entries[1].tool.status).toBe('completed');
    });

    it('reveals a message progressively, and the chunks coalesce', async () => {
        const h = harness();
        createMockAgent([{ kind: 'message', text: 'streaming text' }], {
            dispatch: h.dispatch,
            wait: instant,
        }).start();
        await settle();

        const chunks = h.actions.filter((action) => action.type === 'agent/message-chunk');
        expect(chunks.length).toBeGreaterThan(1);

        const [entry] = h.state.entries;
        expect(isMessageEntry(entry) && entry.text).toBe('streaming text');
        expect(isMessageEntry(entry) && entry.streaming).toBe(false);
    });

    it('ends a tool failed when the step carries an error', async () => {
        const h = harness();
        createMockAgent(
            [
                {
                    kind: 'tool',
                    correlationId: 'c1',
                    title: 'Search',
                    error: { scope: 'execution', message: 'index cold' },
                },
            ],
            { dispatch: h.dispatch, wait: instant },
        ).start();
        await settle();

        const [entry] = h.state.entries;
        expect(isToolEntry(entry) && entry.tool.status).toBe('failed');
        expect(isToolEntry(entry) && entry.tool.error?.scope).toBe('execution');
    });

    it('leaves a failed send in its failed state, with the value intact', async () => {
        const h = harness();
        createMockAgent([{ kind: 'user', text: 'hello', failSend: 'offline' }], {
            dispatch: h.dispatch,
            wait: instant,
        }).start();
        await settle();

        const [entry] = h.state.entries;
        expect(isMessageEntry(entry) && entry.delivery).toBe('failed');
        expect(isMessageEntry(entry) && entry.value).toEqual([{ type: 'text', text: 'hello' }]);
    });

    it('stops dispatching once stopped', async () => {
        const h = harness();
        const agent = createMockAgent(
            [
                { kind: 'message', text: 'one', typing: false },
                { kind: 'message', text: 'two', typing: false },
                { kind: 'message', text: 'three', typing: false },
            ],
            { dispatch: h.dispatch, wait: instant },
        );

        agent.start();
        agent.stop();
        await settle();

        // Only the reset from start() survives; the walk abandoned itself at
        // its first guard check.
        expect(h.actions.filter((action) => action.type !== 'reset')).toHaveLength(0);
        expect(agent.running).toBe(false);
    });

    it('does not interleave two runs', async () => {
        const h = harness();
        const agent = createMockAgent([{ kind: 'message', text: 'hello' }], {
            dispatch: h.dispatch,
            wait: instant,
        });

        agent.start();
        agent.start();
        await settle();

        const [entry] = h.state.entries;
        expect(h.state.entries).toHaveLength(1);
        expect(isMessageEntry(entry) && entry.text).toBe('hello');
    });

    it('skips to a settled end state', async () => {
        const h = harness();
        const onFinish = vi.fn();
        const agent = createMockAgent(DEMO_SCRIPT, {
            dispatch: h.dispatch,
            wait: instant,
            onFinish,
        });

        agent.skipToEnd();

        const { entries } = h.state;
        expect(entries.length).toBeGreaterThan(0);
        expect(agent.running).toBe(false);
        expect(onFinish).toHaveBeenCalled();
        // Nothing may be left mid-flight in a settled transcript.
        expect(entries.some((entry) => isToolEntry(entry) && entry.tool.status === 'running')).toBe(
            false,
        );
        expect(entries.some((entry) => isMessageEntry(entry) && entry.streaming)).toBe(false);
    });

    it('calls onFinish when a run completes', async () => {
        const onFinish = vi.fn();
        const h = harness();
        createMockAgent([{ kind: 'message', text: 'hi', typing: false }], {
            dispatch: h.dispatch,
            wait: instant,
            onFinish,
        }).start();
        await settle();

        expect(onFinish).toHaveBeenCalledTimes(1);
    });
});

describe('DEMO_SCRIPT', () => {
    it('reaches the cases a happy-path fixture never does', async () => {
        const h = harness();
        createMockAgent(DEMO_SCRIPT, { dispatch: h.dispatch, wait: instant }).start();
        await settle();

        const { entries } = h.state;

        // A tool that failed.
        expect(entries.some((entry) => isToolEntry(entry) && entry.tool.status === 'failed')).toBe(
            true,
        );
        // A permission prompt.
        expect(entries.some((entry) => entry.kind === 'approval')).toBe(true);
        // A plan, revised twice, still one entry.
        expect(entries.filter(isPlanEntry)).toHaveLength(1);
        expect(entries.filter(isPlanEntry)[0].items.every((item) => item.status === 'done')).toBe(
            true,
        );
    });

    it('renders a call that blocked on input as one entry, not two', async () => {
        const h = harness();
        createMockAgent(DEMO_SCRIPT, { dispatch: h.dispatch, wait: instant }).start();
        await settle();

        const edits = h.state.entries.filter(
            (entry) => isToolEntry(entry) && entry.tool.correlationId === 'edit-uploader',
        );

        expect(edits).toHaveLength(1);
        // And the block it resolved is gone once the call was re-issued.
        expect(isToolEntry(edits[0]) && edits[0].inputRequests).toBeUndefined();
        expect(isToolEntry(edits[0]) && edits[0].tool.status).toBe('completed');
    });
});
