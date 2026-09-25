/**
 * A scripted agent, for building and testing a UI with no model behind it.
 *
 * Lifted from the `agent-ide` demo's `useAgentRun`, which already solved the
 * awkward parts: a cancellable async walk with a run-id guard so a replay
 * invalidates the run still in flight, tracked timers so nothing fires after a
 * stop, and a speed control read late enough to take effect mid-run.
 *
 * What changed in the lift is where the output goes. The demo drove its own
 * entry list; this emits {@link TranscriptAction}s, the same shape the MCP and
 * ACP adapters produce, so the mock and a real agent are indistinguishable to
 * everything downstream. A component that works against this works against
 * either without knowing which it has.
 *
 * It exists mostly to make the *unhappy* paths reachable. A failing tool, a
 * call that blocks for input twice, a permission prompt, a plan revised
 * mid-run — all are hard to provoke on demand against a live server and all
 * are where these components earn their keep.
 */

import type { TranscriptAction } from '../transcript';
import type {
    ApprovalRequest,
    InputRequest,
    PlanItem,
    PromptValue,
    ToolError,
    ToolKind,
} from '../types';

/** The user says something. Settles immediately; use `failSend` to make it fail. */
export interface MockUserStep {
    readonly kind: 'user';
    readonly text: string;
    readonly value?: PromptValue;
    /** Leaves the message in its failed state, for exercising retry. */
    readonly failSend?: string;
    readonly delay?: number;
}

/** The agent says something, revealed progressively unless `typing` is false. */
export interface MockMessageStep {
    readonly kind: 'message';
    readonly text: string;
    readonly typing?: boolean;
    readonly delay?: number;
}

/** The agent thinks out loud, then the block settles with an elapsed time. */
export interface MockThoughtStep {
    readonly kind: 'thought';
    readonly text: string;
    readonly duration?: number;
    readonly delay?: number;
}

export interface MockToolStep {
    readonly kind: 'tool';
    /** Stable across the whole call. Generated if omitted. */
    readonly correlationId?: string;
    readonly title: string;
    readonly toolKind?: ToolKind;
    readonly target?: string;
    readonly arguments?: unknown;
    readonly duration?: number;
    readonly result?: unknown;
    /** Ends the call failed. Use `scope: 'protocol'` for the unrecoverable case. */
    readonly error?: ToolError;
    readonly delay?: number;
}

/** Blocks a call on input. Pair with a later `tool` step of the same id to resume. */
export interface MockInputRequiredStep {
    readonly kind: 'input-required';
    readonly correlationId?: string;
    readonly requests: readonly InputRequest[];
    readonly delay?: number;
}

export interface MockApprovalStep {
    readonly kind: 'approval';
    readonly request: ApprovalRequest;
    readonly delay?: number;
}

/** Emitting this twice revises the plan in place rather than appending. */
export interface MockPlanStep {
    readonly kind: 'plan';
    readonly items: readonly PlanItem[];
    readonly delay?: number;
}

export type MockStep =
    | MockUserStep
    | MockMessageStep
    | MockThoughtStep
    | MockToolStep
    | MockInputRequiredStep
    | MockApprovalStep
    | MockPlanStep;

export interface MockAgentOptions {
    /** Where actions go — normally the dispatch from `useTranscript`. */
    dispatch(action: TranscriptAction): void;
    /** Divides every delay. Read late, so it takes effect mid-run. */
    readonly speed?: number;
    onFinish?(): void;
    /**
     * Replaces the delay mechanism.
     *
     * Tests pass a resolved promise to run a script instantly, which keeps them
     * fast and deterministic without reaching for fake timers.
     */
    wait?(ms: number): Promise<void>;
}

export interface MockAgent {
    /** Replays from the start, invalidating any run already in flight. */
    start(): void;
    /** Cancels. Nothing further is dispatched. */
    stop(): void;
    /** Cancels and emits everything remaining at once, in its settled state. */
    skipToEnd(): void;
    setSpeed(speed: number): void;
    readonly running: boolean;
}

const DEFAULT_STEP_DELAY = 300;
const DEFAULT_DURATION = 900;
const TYPING_CHUNK = 3;
const TYPING_INTERVAL_MS = 14;

export function createMockAgent(script: readonly MockStep[], options: MockAgentOptions): MockAgent {
    const timers = new Set<ReturnType<typeof setTimeout>>();

    // Bumped on every start, stop and skip. An in-flight walk compares against
    // it after every await and abandons itself if it no longer matches, which
    // is what stops two replays interleaving their output.
    let runId = 0;
    let running = false;
    let speed = options.speed ?? 1;
    let userCounter = 0;
    let toolCounter = 0;

    function clearTimers(): void {
        timers.forEach(clearTimeout);
        timers.clear();
    }

    function wait(ms: number): Promise<void> {
        if (options.wait) return options.wait(ms);
        if (ms <= 0) return Promise.resolve();

        return new Promise<void>((resolve) => {
            const timer = setTimeout(() => {
                timers.delete(timer);
                resolve();
            }, ms / speed);
            timers.add(timer);
        });
    }

    function correlationFor(step: MockToolStep | MockInputRequiredStep): string {
        return step.correlationId ?? `mock-tool-${toolCounter}`;
    }

    /** Emits a step with its pauses, honouring cancellation between each. */
    async function emit(step: MockStep, id: number): Promise<void> {
        const alive = () => id === runId;
        const { dispatch } = options;

        switch (step.kind) {
            case 'user': {
                const messageId = `mock-user-${userCounter++}`;
                dispatch({
                    type: 'user/send',
                    id: messageId,
                    value: step.value ?? [{ type: 'text', text: step.text }],
                    text: step.text,
                });
                dispatch(
                    step.failSend
                        ? { type: 'user/failed', id: messageId, error: step.failSend }
                        : { type: 'user/sent', id: messageId },
                );
                return;
            }

            case 'message': {
                const messageId = `mock-message-${userCounter++}`;

                if (step.typing === false) {
                    dispatch({ type: 'agent/message-chunk', text: step.text, messageId });
                    dispatch({ type: 'agent/message-end' });
                    return;
                }

                for (let at = 0; at < step.text.length; at += TYPING_CHUNK) {
                    await wait(TYPING_INTERVAL_MS);
                    if (!alive()) return;
                    dispatch({
                        type: 'agent/message-chunk',
                        text: step.text.slice(at, at + TYPING_CHUNK),
                        messageId,
                    });
                }
                dispatch({ type: 'agent/message-end' });
                return;
            }

            case 'thought': {
                const duration = step.duration ?? DEFAULT_DURATION;
                dispatch({ type: 'agent/thought-chunk', text: step.text });
                await wait(duration);
                if (!alive()) return;
                dispatch({ type: 'agent/thought-end', durationMs: duration });
                return;
            }

            case 'tool': {
                const correlationId = correlationFor(step);
                toolCounter++;

                dispatch({
                    type: 'agent/tool-call',
                    tool: {
                        correlationId,
                        kind: step.toolKind ?? 'other',
                        title: step.title,
                        target: step.target,
                        status: 'running',
                        arguments: step.arguments,
                    },
                });

                await wait(step.duration ?? DEFAULT_DURATION);
                if (!alive()) return;

                dispatch({
                    type: 'agent/tool-update',
                    correlationId,
                    patch: step.error
                        ? { status: 'failed', error: step.error }
                        : { status: 'completed', result: step.result },
                });
                return;
            }

            case 'input-required':
                dispatch({
                    type: 'agent/input-required',
                    correlationId: step.correlationId,
                    requests: step.requests,
                });
                return;

            case 'approval':
                dispatch({ type: 'agent/approval', request: step.request });
                return;

            case 'plan':
                dispatch({ type: 'agent/plan', items: step.items });
                return;
        }
    }

    /** The settled form of a step, with no pauses and nothing left running. */
    function emitSettled(step: MockStep): void {
        const { dispatch } = options;

        switch (step.kind) {
            case 'user': {
                const messageId = `mock-user-${userCounter++}`;
                dispatch({
                    type: 'user/send',
                    id: messageId,
                    value: step.value ?? [{ type: 'text', text: step.text }],
                    text: step.text,
                });
                dispatch(
                    step.failSend
                        ? { type: 'user/failed', id: messageId, error: step.failSend }
                        : { type: 'user/sent', id: messageId },
                );
                return;
            }

            case 'message': {
                const messageId = `mock-message-${userCounter++}`;
                dispatch({ type: 'agent/message-chunk', text: step.text, messageId });
                dispatch({ type: 'agent/message-end' });
                return;
            }

            case 'thought':
                dispatch({ type: 'agent/thought-chunk', text: step.text });
                dispatch({
                    type: 'agent/thought-end',
                    durationMs: step.duration ?? DEFAULT_DURATION,
                });
                return;

            case 'tool': {
                const correlationId = correlationFor(step);
                toolCounter++;
                dispatch({
                    type: 'agent/tool-call',
                    tool: {
                        correlationId,
                        kind: step.toolKind ?? 'other',
                        title: step.title,
                        target: step.target,
                        status: step.error ? 'failed' : 'completed',
                        arguments: step.arguments,
                        result: step.result,
                        error: step.error,
                    },
                });
                return;
            }

            case 'input-required':
                dispatch({
                    type: 'agent/input-required',
                    correlationId: step.correlationId,
                    requests: step.requests,
                });
                return;

            case 'approval':
                dispatch({ type: 'agent/approval', request: step.request });
                return;

            case 'plan':
                dispatch({ type: 'agent/plan', items: step.items });
                return;
        }
    }

    function reset(): number {
        clearTimers();
        userCounter = 0;
        toolCounter = 0;
        return ++runId;
    }

    return {
        get running() {
            return running;
        },

        start(): void {
            const id = reset();
            running = true;
            options.dispatch({ type: 'reset' });

            void (async () => {
                for (const step of script) {
                    await wait(step.delay ?? DEFAULT_STEP_DELAY);
                    if (id !== runId) return;

                    await emit(step, id);
                    if (id !== runId) return;
                }

                running = false;
                options.onFinish?.();
            })();
        },

        stop(): void {
            runId++;
            clearTimers();
            running = false;
        },

        skipToEnd(): void {
            reset();
            running = false;
            options.dispatch({ type: 'reset' });
            script.forEach(emitSettled);
            options.onFinish?.();
        },

        setSpeed(next: number): void {
            speed = next <= 0 ? 1 : next;
        },
    };
}
