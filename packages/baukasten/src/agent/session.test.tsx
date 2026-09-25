/**
 * The components wired together the way an application wires them.
 *
 * Every defect found by actually using these components lived at a seam — a
 * hook feeding a component, two components mounted at once, a reducer path a
 * component silently depends on. None was reachable from a unit test: of
 * eighteen agent test files exactly one references more than one agent
 * component, and none combines a hook with the components it drives. So a
 * suite could be green, typechecked and linted while the thing it describes
 * was broken in the browser.
 *
 * These tests drive a real session — `useTranscript` folding actions, a real
 * renderer map, real components mounting and unmounting — and assert the
 * consequence a user would see rather than the state shape underneath.
 */

import { useEffect, useMemo, useState } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTranscript } from './useTranscript';
import { mergeRenderers } from './renderers';
import { normalizePrompt } from './prompt';
import { mentionTrigger } from './triggers';
import { Transcript } from './components/Transcript';
import { Approval } from './components/Approval';
import { InputRequired } from './components/InputRequired';
import { PromptEditor } from './components/PromptEditor';
import { ToolCall } from './components/ToolCall';
import { defaultRenderers } from './components/defaultRenderers';
import { createMockAgent, DEMO_SCRIPT, type MockAgent } from './testing';
import type {
    ApprovalDecision,
    ApprovalRequest,
    InputRequest,
    InputResponse,
    MentionItem,
    MentionSource,
    MessageEntry,
    PromptValue,
    TranscriptEntry,
} from './types';
import type { TranscriptAction } from './transcript';

/** Lets a test push actions the way an adapter's subscription would. */
interface Handle {
    dispatch?: (action: TranscriptAction) => void;
}

function Session({ handle }: { handle: Handle }) {
    const { entries, dispatch } = useTranscript();

    useEffect(() => {
        handle.dispatch = dispatch;
    }, [handle, dispatch]);

    const renderers = useMemo(
        () =>
            mergeRenderers(defaultRenderers(), {
                approval: ({ entry }) => (
                    <Approval
                        entry={entry}
                        onDecide={(decision) =>
                            dispatch({ type: 'approval/resolve', id: entry.request.id, decision })
                        }
                    />
                ),
            }),
        [dispatch],
    );

    return <Transcript entries={entries} renderers={renderers} />;
}

let handle: Handle;

function startSession(): void {
    handle = {};
    render(<Session handle={handle} />);
}

function send(...actions: readonly TranscriptAction[]): void {
    act(() => {
        for (const action of actions) handle.dispatch?.(action);
    });
}

function approval(id: string, title: string, labels: [string, string]): ApprovalRequest {
    return {
        id,
        title,
        options: [
            { id: 'allow', label: labels[0], outcome: 'allow', scope: 'once', shortcut: 'accept' },
            { id: 'deny', label: labels[1], outcome: 'deny', scope: 'once', shortcut: 'reject' },
        ],
    };
}

const first = approval('call-1', 'Run the test suite', ['Allow', 'Deny']);
const second = approval('call-2', 'Delete the build directory', ['Approve', 'Decline']);

describe('a re-asked approval (T-84)', () => {
    beforeEach(startSession);

    /** The shape an agent produces when it asks about one call twice. */
    function askTwice(): void {
        send(
            { type: 'agent/message-chunk', text: 'Running the suite now.' },
            {
                type: 'agent/tool-call',
                tool: {
                    correlationId: 'call-1',
                    kind: 'execute',
                    title: 'npm test',
                    status: 'pending',
                },
            },
            { type: 'agent/approval', request: first },
            // The ACP adapter keys approvals by tool-call id, so a re-prompt, a
            // reconnect replay or a mode change arrives as this exact action.
            { type: 'agent/approval', request: { ...first, description: 'Asked again.' } },
        );
    }

    it('updates the card it already has instead of stacking a second one', () => {
        askTwice();

        expect(screen.getAllByText('Run the test suite')).toHaveLength(1);
        expect(screen.getByText('Asked again.')).toBeInTheDocument();
    });

    it('can still be answered', () => {
        askTwice();
        fireEvent.click(screen.getByRole('button', { name: /allow/i }));

        // Resolution looks the request up by id, so a duplicate could only ever
        // resolve the first of the two.
        expect(screen.queryByRole('button', { name: /allow/i })).not.toBeInTheDocument();
    });

    it('does not disable the keyboard for every later approval in the session', () => {
        askTwice();
        // Deliberately the *first* match rather than the only one: with the bug
        // present there are two cards, and `getByRole` would fail on the
        // ambiguity before reaching the assertion this test exists to make.
        fireEvent.click(screen.getAllByRole('button', { name: /allow/i })[0]);

        send({ type: 'agent/approval', request: second });
        fireEvent.keyDown(document, { key: 'Enter' });

        // A duplicate card is unresolvable, so it never unmounts its listener —
        // and the ambiguity guard, seeing two pending approvals, then refuses
        // to act on a keystroke for the rest of the session.
        expect(screen.queryByRole('button', { name: /approve/i })).not.toBeInTheDocument();
        expect(screen.getByText('Approve')).toBeInTheDocument();
    });
});

// ─── The composer ───────────────────────────────────────────────────────────

const mentions: MentionSource = {
    async search() {
        return { items: [{ id: 'file:a.ts', kind: 'file', label: 'a.ts' }] };
    },
};

interface ComposerHandle {
    restore?: (value: PromptValue) => void;
    rerender?: () => void;
    value?: PromptValue;
}

/**
 * A composer written the way the docs suggest one: normalising in `onChange`,
 * and passing a fresh `triggers` array literal on every render.
 *
 * Both of those are what the component's own example does, and both were
 * enough to make it unusable.
 */
function Composer({
    handle,
    mentions: source = mentions,
}: {
    handle: ComposerHandle;
    mentions?: MentionSource;
}) {
    const [value, setValue] = useState<PromptValue>([]);
    const [, setTick] = useState(0);

    handle.value = value;
    handle.restore = setValue;
    handle.rerender = () => setTick((tick) => tick + 1);

    return (
        <PromptEditor
            value={value}
            // `readValue` normalises already, so re-normalising here is the
            // obvious thing to write — and it hands back a different array
            // instance every time.
            onChange={(next) => setValue(normalizePrompt(next))}
            triggers={[mentionTrigger(source)]}
        />
    );
}

/**
 * Replaces the whole query, caret at the end.
 *
 * The blunt instrument, and the right one here: this test is about which
 * results the menu ends up showing, not about where the caret sits. Use
 * {@link typeChar} when the caret is the subject.
 */
function setText(surface: HTMLElement, text: string): void {
    surface.textContent = text;

    const range = surface.ownerDocument.createRange();
    range.selectNodeContents(surface);
    range.collapse(false);

    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);

    fireEvent.input(surface);
}

/**
 * One keystroke, the way a browser delivers it: the character appended to the
 * text node holding the caret, the caret left after it, then `input`.
 *
 * Deliberately not the wholesale `textContent = …` the unit tests use. That
 * rebuilds the surface itself on every call, which destroys the caret before
 * the component gets a chance to — so it cannot see this class of bug at all.
 */
function typeChar(surface: HTMLElement, char: string): void {
    let node = surface.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) {
        node = surface.ownerDocument.createTextNode('');
        surface.appendChild(node);
    }

    (node as Text).appendData(char);
    caretAt(node as Text, (node as Text).length);

    fireEvent.input(surface);
}

/**
 * The editing surface, by its accessible name.
 *
 * Not by role, because the role is legitimately one of two: an editor with
 * triggers is a `combobox` (it owns a popup listbox, and `aria-expanded` is
 * discarded on a textbox in ARIA 1.2), while one configured with no triggers is
 * a plain `textbox`. These tests span both and do not care which — the unit
 * tests are where that distinction is asserted.
 */
function editorSurface(): HTMLElement {
    return screen.getByLabelText('Message');
}

function caretAt(node: Text, offset: number): void {
    const range = node.ownerDocument.createRange();
    range.setStart(node, offset);
    range.collapse(true);

    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
}

describe('the composer keeps the caret (T-82)', () => {
    let composer: ComposerHandle;

    beforeEach(() => {
        composer = {};
        render(<Composer handle={composer} />);
    });

    it('while a normalising caller hands back a new instance on every change', () => {
        const surface = editorSurface();
        for (const char of 'hello') typeChar(surface, char);

        // The guard used to be `value === emitted.current`, so a normalised
        // value never matched and the editor rebuilt its DOM per keystroke.
        // Measured against that version: anchorOffset 0, caret at the start.
        expect(surface.textContent).toBe('hello');
        expect(window.getSelection()!.anchorOffset).toBe(5);
    });

    it('and still reports what was typed', () => {
        const surface = editorSurface();
        for (const char of 'hi') typeChar(surface, char);

        expect(composer.value).toEqual([{ type: 'text', text: 'hi' }]);
    });

    it('in a restored draft, while the parent re-renders underneath it', () => {
        act(() => composer.restore!([{ type: 'text', text: 'draft text' }]));

        const surface = editorSurface();
        const node = surface.firstChild as Text;
        caretAt(node, 5);

        // A transcript streaming beside this re-renders several times a second.
        act(() => composer.rerender!());

        // Nothing ever updated `emitted.current` after an external set, so the
        // guard stayed false forever and every one of those renders rewrote the
        // surface out from under the caret.
        const selection = window.getSelection()!;
        expect(surface.contains(selection.anchorNode)).toBe(true);
        expect(selection.anchorNode).toBe(node);
        expect(selection.anchorOffset).toBe(5);
    });

    it('and a restored draft is still what gets shown', () => {
        act(() => composer.restore!([{ type: 'text', text: 'draft text' }]));
        expect(editorSurface().textContent).toBe('draft text');
    });
});

// ─── A call that blocks for input twice ─────────────────────────────────────

function pathRequest(message: string): InputRequest {
    return {
        key: 'path',
        kind: 'form',
        message,
        // A fresh literal per round, as a real source would produce. The key
        // repeats because elicitation keys do — `path`, `confirm`, `apiKey`.
        schema: {
            type: 'object',
            properties: { path: { type: 'string' } },
            required: ['path'],
        },
    };
}

const blocked: TranscriptAction = {
    type: 'agent/tool-call',
    tool: { correlationId: 'call-1', kind: 'delete', title: 'Clean', status: 'running' },
};

/**
 * The wiring an application supplies for a blocked call.
 *
 * `onComplete` records and retries, and deliberately does **not** dispatch
 * `agent/input-resolved` first. That is the MRTR loop's actual shape: the call
 * is retried with the answers and the result comes back asking for more, so the
 * requests are replaced rather than cleared and the resolver stays mounted
 * across rounds. Unmounting between rounds would reset everything and hide the
 * bug entirely.
 */
function BlockedCall({ handle, completed }: { handle: Handle; completed: InputResponse[][] }) {
    const { entries, dispatch } = useTranscript();

    useEffect(() => {
        handle.dispatch = dispatch;
    }, [handle, dispatch]);

    const renderers = useMemo(
        () =>
            mergeRenderers(defaultRenderers(), {
                tool: ({ entry }) => (
                    <>
                        <ToolCall entry={entry} />
                        {entry.inputRequests && entry.inputRequests.length > 0 && (
                            <InputRequired
                                requests={entry.inputRequests}
                                onComplete={(responses) => {
                                    completed.push([...responses]);
                                    // The retry. Recording alone would not be a
                                    // fair test: the render-phase report is only
                                    // a violation because `onComplete` updates
                                    // another component, which is what every
                                    // real handler does.
                                    dispatch({
                                        type: 'agent/tool-update',
                                        correlationId: entry.tool.correlationId,
                                        patch: { status: 'running' },
                                    });
                                }}
                            />
                        )}
                    </>
                ),
            }),
        [completed, dispatch],
    );

    return <Transcript entries={entries} renderers={renderers} />;
}

describe('a call that blocks for input twice (T-83)', () => {
    let completed: InputResponse[][];
    let errors: string[];

    beforeEach(() => {
        completed = [];
        errors = [];
        handle = {};

        vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
            errors.push(args.map(String).join(' '));
        });

        render(<BlockedCall handle={handle} completed={completed} />);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    function ask(message: string): void {
        send({
            type: 'agent/input-required',
            correlationId: 'call-1',
            requests: [pathRequest(message)],
        });
    }

    function answer(value: string): void {
        fireEvent.change(screen.getByLabelText(/^path/), { target: { value } });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    }

    function firstRound(): void {
        send(blocked);
        ask('Which directory should I clean?');
        answer('dist');
    }

    it('reports the first round without updating a component mid-render', () => {
        firstRound();

        expect(completed).toHaveLength(1);
        // The report used to be made from the render body, where it called the
        // parent's dispatch — logged by React 19, and unguaranteed under
        // concurrent rendering.
        // React logs the format string with its `%s` placeholders intact, so
        // matching the prose between them finds nothing. Verified against the
        // render-phase version: "Cannot update a component (`%s`) while
        // rendering a different component (`%s`)", BlockedCall, InputRequired.
        //
        // Kept first in this block on purpose — React warns once per component
        // name per process, so a later test could not observe it.
        expect(errors.join(' | ')).not.toMatch(/Cannot update a component/);
    });

    it('shows the second question instead of the first answer', () => {
        firstRound();
        ask('And which should I keep?');

        // The answers map was never cleared, so a repeated key rendered the new
        // question as already answered — the user never saw it.
        expect(screen.getByText('And which should I keep?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('offers the second form empty rather than pre-filled from the first', () => {
        firstRound();
        ask('And which should I keep?');

        // ElicitationForm reads its values once at mount by design, so this
        // holds only because the round is mixed into its key.
        expect(screen.getByLabelText<HTMLInputElement>(/^path/).value).toBe('');
        expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });

    it('reports the second round too', () => {
        firstRound();
        ask('And which should I keep?');
        answer('build');

        // The `reported` latch was never reset, so the second answer sat in
        // local state and the call stayed blocked forever.
        expect(completed).toHaveLength(2);
        expect(completed[1]).toEqual([
            { key: 'path', action: 'accept', content: { path: 'build' } },
        ]);
    });
});

// ─── The transcript's own machinery ─────────────────────────────────────────

/**
 * A renderer with state of its own, which is the thing at risk.
 *
 * Every built-in row has some — a tool body's expansion, a thought's, the
 * expanded arguments on an approval — and none of it survives a remount.
 */
function Expandable({ id }: { id: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setOpen((current) => !current)}>
                toggle {id}
            </button>
            {open && <span>body {id}</span>}
        </div>
    );
}

function messages(count: number): readonly TranscriptEntry[] {
    return Array.from({ length: count }, (_, index) => ({
        id: `m${index}`,
        kind: 'message' as const,
        role: 'agent' as const,
        text: `entry ${index}`,
        streaming: false,
    }));
}

const expandableRenderers = {
    message: ({ entry }: { entry: MessageEntry }) => <Expandable id={entry.id} />,
};

/**
 * The one measurement the virtualizer needs to render anything.
 *
 * jsdom has no layout, so the scroll element reports 0×0 and
 * `@tanstack/virtual-core` produces an empty window — the windowed branch would
 * render no rows at all and this test would pass for the wrong reason.
 * `observeElementRect` reads `offsetWidth`/`offsetHeight` directly before it
 * ever installs an observer, so patching those two is the whole of it.
 * `Tree.childMounting.test.tsx` builds a much larger stand-in because it cares
 * how many rows window; this only needs the branch to render.
 */
function withFakeLayout(run: () => void): void {
    const displaced = ['offsetWidth', 'offsetHeight'].map(
        (prop) => [prop, Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop)] as const,
    );

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get: () => 400,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get: () => 300,
    });

    try {
        run();
    } finally {
        for (const [prop, original] of displaced) {
            if (original) Object.defineProperty(HTMLElement.prototype, prop, original);
        }
    }
}

describe("the transcript's own machinery (T-85)", () => {
    it('keeps a row expanded when the list grows past the windowing threshold', () => {
        withFakeLayout(() => {
            const { rerender } = render(
                <Transcript
                    entries={messages(2)}
                    renderers={expandableRenderers}
                    virtualizeThreshold={2}
                />,
            );

            fireEvent.click(screen.getByRole('button', { name: 'toggle m0' }));
            expect(screen.getByText('body m0')).toBeInTheDocument();

            // In a real session this happens unannounced at entry 81, mid-run.
            rerender(
                <Transcript
                    entries={messages(3)}
                    renderers={expandableRenderers}
                    virtualizeThreshold={2}
                />,
            );

            // The two branches used to render Fragment and div at the same
            // keys, so React destroyed every row and every open card on screen
            // snapped shut at once.
            expect(screen.getByText('body m0')).toBeInTheDocument();
        });
    });

    it('observes the content element even though it appears after mount', () => {
        const observed: Element[] = [];

        class Recording implements ResizeObserver {
            observe(target: Element) {
                observed.push(target);
            }
            unobserve() {}
            disconnect() {}
        }

        const original = global.ResizeObserver;
        global.ResizeObserver = Recording as unknown as typeof ResizeObserver;

        try {
            // The documented startup: empty, with a placeholder. The content
            // element does not exist yet, and the observer effect used to have
            // `[]` deps — so it looked once, found nothing, and never ran again.
            const { rerender } = render(<Transcript entries={[]} empty="Nothing yet" />);
            rerender(<Transcript entries={messages(1)} renderers={expandableRenderers} />);

            // The element holding the entries. `observed` also contains the
            // scroll element, which the virtualizer watches for its own
            // reasons — so this asks whether *the content* is watched rather
            // than whether anything is.
            const content = screen
                .getByRole('button', { name: 'toggle m0' })
                .closest('[data-index]')!.parentElement;

            // Without this, growth the entry list does not describe — an image
            // finishing, a font swapping, a body expanding — stopped following
            // the bottom for the rest of the session.
            expect(observed).toContain(content);
        } finally {
            global.ResizeObserver = original;
        }
    });
});

// ─── A whole scripted run ───────────────────────────────────────────────────

interface RunHandle {
    agent?: MockAgent;
    onFinish?: () => void;
    readonly decisions: ApprovalDecision[];
    readonly sent: PromptValue[];
}

/**
 * Everything wired together, driven by the scripted agent.
 *
 * `createMockAgent` and `DEMO_SCRIPT` were built for exactly this and had never
 * been used outside stories. The script is the point: it reaches a failing
 * tool, a call blocked on input, a permission prompt and a plan revised
 * mid-run, which is where a transcript is either right or quietly broken.
 */
function FullSession({ handle }: { handle: RunHandle }) {
    const { entries, dispatch, sendUserMessage } = useTranscript();
    const [draft, setDraft] = useState<PromptValue>([]);

    const agent = useMemo(
        () =>
            createMockAgent(DEMO_SCRIPT, {
                dispatch,
                // No timers: the script runs to completion in microtasks, which
                // keeps this fast and removes the only source of flake.
                wait: () => Promise.resolve(),
                onFinish: () => handle.onFinish?.(),
            }),
        [dispatch, handle],
    );
    handle.agent = agent;

    const renderers = useMemo(
        () =>
            mergeRenderers(defaultRenderers(), {
                approval: ({ entry }) => (
                    <Approval
                        entry={entry}
                        onDecide={(decision) => {
                            handle.decisions.push(decision);
                            dispatch({
                                type: 'approval/resolve',
                                id: entry.request.id,
                                decision,
                            });
                        }}
                    />
                ),
                tool: ({ entry }) => (
                    <>
                        <ToolCall entry={entry} />
                        {entry.inputRequests && entry.inputRequests.length > 0 && (
                            <InputRequired
                                requests={entry.inputRequests}
                                onComplete={(responses) =>
                                    dispatch({
                                        type: 'agent/input-resolved',
                                        correlationId: entry.tool.correlationId,
                                        responses,
                                    })
                                }
                            />
                        )}
                    </>
                ),
            }),
        [dispatch, handle],
    );

    return (
        <>
            <Transcript entries={entries} renderers={renderers} empty="Nothing yet" />
            <PromptEditor
                value={draft}
                onChange={setDraft}
                onSubmit={(value) => {
                    handle.sent.push(value);
                    sendUserMessage(value);
                    setDraft([]);
                }}
            />
        </>
    );
}

describe('a whole scripted run (T-88)', () => {
    let run: RunHandle;

    beforeEach(async () => {
        run = { decisions: [], sent: [] };

        let finish: () => void;
        const finished = new Promise<void>((resolve) => {
            finish = resolve;
        });
        run.onFinish = () => finish();

        render(<FullSession handle={run} />);

        await act(async () => {
            run.agent!.start();
            await finished;
        });
    });

    function log(): string {
        return screen.getByRole('log').textContent ?? '';
    }

    it('folds the run into entries in the order it happened', () => {
        const text = log();

        expect(text).toContain('The telemetry uploader drops events');
        expect(text.indexOf('The telemetry uploader drops events')).toBeLessThan(
            text.indexOf('Permanent failures drop fast'),
        );
        expect(text).toContain('Search index is still building');
    });

    it('keeps a re-issued call as one entry, not two', () => {
        // Two `edit-uploader` steps either side of the input request. The
        // correlation id is what holds them together.
        expect(screen.getAllByText('Edit')).toHaveLength(1);
    });

    it('revises the plan in place rather than logging stale copies', () => {
        // Three plan steps in the script; a transcript that appended them would
        // show this line three times and scroll the current plan away.
        expect(screen.getAllByText('Read the uploader')).toHaveLength(1);
    });

    it('resumes the blocked call once the answer is in', () => {
        expect(screen.queryByText(/waiting for input/i)).not.toBeInTheDocument();

        // `ToolCall` deliberately does not render the result — that belongs in
        // the body a caller supplies — so the observable claim is the status.
        expect(screen.getByText('Edit').closest('[data-status]')).toHaveAttribute(
            'data-status',
            'completed',
        );
    });

    it('leaves the permission prompt waiting for a person', () => {
        expect(screen.getByRole('button', { name: /^Allow/ })).toBeInTheDocument();
        expect(run.decisions).toHaveLength(0);
    });

    it('does not answer the permission prompt when the composer is typed into', () => {
        const surface = editorSurface();

        // `2` addresses the second option — conventionally the standing grant.
        // The approval listens on `document`, so without a guard this reached
        // it with the digit never arriving in the draft.
        fireEvent.keyDown(surface, { key: '2' });
        expect(run.decisions).toHaveLength(0);

        // And Enter, which is bound to the accept option.
        fireEvent.keyDown(surface, { key: 'Enter' });
        expect(run.decisions).toHaveLength(0);
    });

    it('still answers it on a deliberate click', () => {
        fireEvent.click(screen.getByRole('button', { name: /^Allow/ }));

        expect(run.decisions).toEqual([
            { optionId: 'allow', outcome: 'allow', scope: { level: 'once' } },
        ]);
    });

    it('deregisters its pending approval when the session unmounts', () => {
        cleanup();

        // The listener registry is module-level. A card that failed to remove
        // itself would leave the count above one forever, and the ambiguity
        // guard would then refuse to act on a keystroke for any approval in any
        // later session.
        const decisions: ApprovalDecision[] = [];
        render(
            <Approval
                entry={{
                    id: 'a:later',
                    kind: 'approval',
                    request: {
                        id: 'later',
                        title: 'Something else entirely',
                        options: [
                            {
                                id: 'yes',
                                label: 'Allow',
                                outcome: 'allow',
                                scope: 'once',
                                shortcut: 'accept',
                            },
                        ],
                    },
                }}
                onDecide={(decision) => decisions.push(decision)}
            />,
        );

        fireEvent.keyDown(document, { key: 'Enter' });
        expect(decisions).toHaveLength(1);
    });
});

// ─── The trigger menu against a slow source ─────────────────────────────────

describe('the trigger menu shows the query it is on (T-86)', () => {
    it('does not paint an abandoned query’s results over the current ones', async () => {
        const pending = new Map<string, (result: { items: readonly MentionItem[] }) => void>();

        const slow: MentionSource = {
            search({ query }) {
                if (query === 'ab') {
                    return Promise.resolve({
                        items: [{ id: 'ab', kind: 'file', label: 'ab-result.ts' }],
                        ttlMs: 60_000,
                    });
                }

                // Matches nothing, instantly. Only here to empty the menu, so
                // that the cache hit further down is something the test can
                // actually wait for rather than assume.
                if (query === 'zz') return Promise.resolve({ items: [] });

                return new Promise((resolve) => pending.set(query, resolve));
            },
        };

        const composer: ComposerHandle = {};
        render(<Composer handle={composer} mentions={slow} />);
        const surface = editorSurface();

        // Types the whole query at once, which is what the debounce makes the
        // real behaviour anyway: `@`, `@a`, `@ab` in quick succession only ever
        // executes `ab`. So `ab` ends up cached and `a` is not.
        setText(surface, '@ab');
        await screen.findByText('ab-result.ts');

        setText(surface, '@zz');
        await screen.findByText(/no matches/i);

        // Uncached, so a request starts — and does not finish.
        setText(surface, '@a');
        await waitFor(() => expect(pending.has('a')).toBe(true));

        // Served from cache, instantly.
        setText(surface, '@ab');
        await screen.findByText('ab-result.ts');

        await act(async () => {
            pending.get('a')!({ items: [{ id: 'a', kind: 'file', label: 'a-result.ts' }] });
        });

        // The cache path used to return before the abort, so the abandoned
        // request stayed alive, passed its own aborted check, and put the wrong
        // query's results in the menu.
        expect(screen.queryByText('a-result.ts')).not.toBeInTheDocument();
        expect(screen.getByText('ab-result.ts')).toBeInTheDocument();
    });
});
