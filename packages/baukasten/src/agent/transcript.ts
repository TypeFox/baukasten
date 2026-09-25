/**
 * The transcript reducer.
 *
 * Folds a stream of updates into a list of entries that is stable enough to
 * render: chunks coalesce instead of accumulating, a tool call and every
 * subsequent report about it stay one entry, and an entry's identity does not
 * change underneath React.
 *
 * Pure and clock-free. It never calls `Date.now()` or generates randomness —
 * timestamps arrive on actions and ids come from a counter in state — so the
 * same action sequence always produces the same result and a recorded session
 * can be replayed in a test with no DOM.
 */

import type {
    ApprovalDecision,
    ApprovalRequest,
    EntryKind,
    InputRequest,
    InputResponse,
    InputRequiredEntry,
    MessageEntry,
    MessageRole,
    PlanEntry,
    PlanItem,
    PromptValue,
    ThoughtEntry,
    ToolEntry,
    ToolInvocation,
    ToolProgress,
    TranscriptEntry,
} from './types';
import { isApprovalEntry } from './types';

/**
 * Indices into {@link TranscriptState.entries} are stable because entries are
 * only ever appended — nothing is inserted in the middle or removed — so a
 * lookup table of positions stays valid for the life of the transcript. That
 * keeps a tool update O(1) instead of a scan, which matters when a busy run
 * emits hundreds of them.
 */
export interface TranscriptState {
    readonly entries: readonly TranscriptEntry[];
    /** Correlation id to position, so a tool update does not scan the list. */
    readonly toolIndex: Readonly<Record<string, number>>;
    /** Position of the message still accepting chunks, if any. */
    readonly openMessage: number | null;
    /** Position of the thought still accepting chunks, if any. */
    readonly openThought: number | null;
    /** Position of the plan, which is revised in place rather than re-appended. */
    readonly planAt: number | null;
    /** Counter behind generated ids. Keeps the reducer deterministic. */
    readonly nextId: number;
}

export type TranscriptAction =
    | {
          readonly type: 'agent/message-chunk';
          readonly text: string;
          readonly role?: MessageRole;
          /** Groups chunks belonging to one message when the source supplies it. */
          readonly messageId?: string;
          readonly at?: number;
      }
    | { readonly type: 'agent/message-end' }
    | {
          readonly type: 'agent/thought-chunk';
          readonly text: string;
          readonly thoughtId?: string;
          readonly at?: number;
      }
    | { readonly type: 'agent/thought-end'; readonly durationMs?: number }
    | { readonly type: 'agent/tool-call'; readonly tool: ToolInvocation; readonly at?: number }
    | {
          readonly type: 'agent/tool-update';
          readonly correlationId: string;
          readonly patch: Partial<ToolInvocation>;
      }
    | {
          readonly type: 'agent/progress';
          readonly correlationId: string;
          readonly progress: ToolProgress;
      }
    | {
          readonly type: 'agent/input-required';
          readonly requests: readonly InputRequest[];
          /** When set, folds onto that call instead of appending a sibling entry. */
          readonly correlationId?: string;
          readonly at?: number;
      }
    | {
          readonly type: 'agent/input-resolved';
          readonly responses: readonly InputResponse[];
          readonly correlationId?: string;
          readonly entryId?: string;
      }
    | { readonly type: 'agent/plan'; readonly items: readonly PlanItem[]; readonly at?: number }
    | { readonly type: 'agent/approval'; readonly request: ApprovalRequest; readonly at?: number }
    | {
          readonly type: 'agent/custom';
          readonly kind: EntryKind;
          readonly data: unknown;
          readonly id?: string;
          readonly at?: number;
      }
    | {
          readonly type: 'user/send';
          readonly id: string;
          readonly value: PromptValue;
          readonly text: string;
          readonly at?: number;
      }
    | { readonly type: 'user/sent'; readonly id: string }
    | { readonly type: 'user/failed'; readonly id: string; readonly error: string }
    | {
          readonly type: 'approval/resolve';
          readonly id: string;
          readonly decision: ApprovalDecision;
      }
    | { readonly type: 'reset' };

export function createTranscriptState(): TranscriptState {
    return {
        entries: [],
        toolIndex: {},
        openMessage: null,
        openThought: null,
        planAt: null,
        nextId: 0,
    };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function replaceAt(
    entries: readonly TranscriptEntry[],
    index: number,
    next: TranscriptEntry,
): readonly TranscriptEntry[] {
    const copy = entries.slice();
    copy[index] = next;
    return copy;
}

/**
 * Settles anything still streaming.
 *
 * Called before every append: once another entry appears, an earlier message
 * or thought is finished whether or not the source bothered to say so. Without
 * this a transcript ends up with several entries all claiming to be streaming
 * and several carets blinking at once.
 */
function settleOpen(state: TranscriptState): TranscriptState {
    if (state.openMessage === null && state.openThought === null) return state;

    let entries = state.entries;

    if (state.openMessage !== null) {
        const open = entries[state.openMessage] as MessageEntry;
        entries = replaceAt(entries, state.openMessage, { ...open, streaming: false });
    }
    if (state.openThought !== null) {
        const open = entries[state.openThought] as ThoughtEntry;
        entries = replaceAt(entries, state.openThought, { ...open, streaming: false });
    }

    return { ...state, entries, openMessage: null, openThought: null };
}

/** Finds an entry by id. Only used on the rare paths that do not have an index. */
function indexOfId(entries: readonly TranscriptEntry[], id: string): number {
    return entries.findIndex((entry) => entry.id === id);
}

/**
 * Namespaced so a caller cannot spell one.
 *
 * Generated ids used to be `e0`, `e1`, … and `agent/custom` accepts an
 * explicit id — so dispatching `{ id: 'e0' }` and then anything generated
 * produced two entries sharing an id. The prefix is deliberately not something
 * anyone would choose for their own entry.
 */
function generatedId(state: TranscriptState): string {
    return `bk:${state.nextId}`;
}

/**
 * Replaces an entry in place, keeping its position.
 *
 * Used by every path whose id comes from outside — a source, or a caller.
 * Appending instead is what produced duplicate React keys, duplicate
 * virtualizer keys, and an approval that could never be resolved because
 * lookup found only the first of the two.
 */
function replaceById(
    state: TranscriptState,
    id: string,
    next: (existing: TranscriptEntry) => TranscriptEntry,
): TranscriptState | null {
    const at = indexOfId(state.entries, id);
    if (at === -1) return null;

    return { ...state, entries: replaceAt(state.entries, at, next(state.entries[at])) };
}

// ─── Reducer ────────────────────────────────────────────────────────────────

export function transcriptReducer(
    state: TranscriptState,
    action: TranscriptAction,
): TranscriptState {
    switch (action.type) {
        case 'reset':
            return createTranscriptState();

        case 'agent/message-chunk': {
            const role = action.role ?? 'agent';
            const wantedId = action.messageId !== undefined ? `m:${action.messageId}` : null;

            if (wantedId !== null) {
                // A chunk carrying a source id resumes that message wherever it
                // sits, not only when it happens to be the one still open.
                // Agents routinely emit text, run a tool, then continue the same
                // message — and starting a fresh entry for the continuation
                // would mint a second entry under an id already in use, which
                // duplicates React keys and makes expansion state jump between
                // the two.
                const at = indexOfId(state.entries, wantedId);
                if (at !== -1) {
                    const existing = state.entries[at] as MessageEntry;
                    const base = state.openMessage === at ? state : settleOpen(state);
                    return {
                        ...base,
                        entries: replaceAt(base.entries, at, {
                            ...existing,
                            text: existing.text + action.text,
                            streaming: true,
                        }),
                        openMessage: at,
                    };
                }
            } else if (state.openMessage !== null) {
                const open = state.entries[state.openMessage] as MessageEntry;
                // Anonymous chunks coalesce by position: same role, and the open
                // message must itself be anonymous. A chunk with no id must not
                // graft itself onto a message that was explicitly identified.
                if (open.role === role && !open.id.startsWith('m:')) {
                    return {
                        ...state,
                        entries: replaceAt(state.entries, state.openMessage, {
                            ...open,
                            text: open.text + action.text,
                        }),
                    };
                }
            }

            const settled = settleOpen(state);
            const entry: MessageEntry = {
                id: wantedId ?? generatedId(settled),
                kind: 'message',
                at: action.at,
                role,
                text: action.text,
                streaming: true,
            };

            return {
                ...settled,
                entries: [...settled.entries, entry],
                openMessage: settled.entries.length,
                nextId: wantedId === null ? settled.nextId + 1 : settled.nextId,
            };
        }

        case 'agent/message-end': {
            if (state.openMessage === null) return state;
            const open = state.entries[state.openMessage] as MessageEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, state.openMessage, {
                    ...open,
                    streaming: false,
                }),
                openMessage: null,
            };
        }

        case 'agent/thought-chunk': {
            const wantedId = action.thoughtId !== undefined ? `h:${action.thoughtId}` : null;

            if (wantedId !== null) {
                const at = indexOfId(state.entries, wantedId);
                if (at !== -1) {
                    const existing = state.entries[at] as ThoughtEntry;
                    const base = state.openThought === at ? state : settleOpen(state);
                    return {
                        ...base,
                        entries: replaceAt(base.entries, at, {
                            ...existing,
                            text: existing.text + action.text,
                            streaming: true,
                        }),
                        openThought: at,
                    };
                }
            } else if (state.openThought !== null) {
                const open = state.entries[state.openThought] as ThoughtEntry;
                if (!open.id.startsWith('h:')) {
                    return {
                        ...state,
                        entries: replaceAt(state.entries, state.openThought, {
                            ...open,
                            text: open.text + action.text,
                        }),
                    };
                }
            }

            const settled = settleOpen(state);
            const entry: ThoughtEntry = {
                id: wantedId ?? generatedId(settled),
                kind: 'thought',
                at: action.at,
                text: action.text,
                streaming: true,
            };

            return {
                ...settled,
                entries: [...settled.entries, entry],
                openThought: settled.entries.length,
                nextId: wantedId === null ? settled.nextId + 1 : settled.nextId,
            };
        }

        case 'agent/thought-end': {
            if (state.openThought === null) return state;
            const open = state.entries[state.openThought] as ThoughtEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, state.openThought, {
                    ...open,
                    streaming: false,
                    durationMs: action.durationMs ?? open.durationMs,
                }),
                openThought: null,
            };
        }

        case 'agent/tool-call': {
            const at = state.toolIndex[action.tool.correlationId];

            // A call we already hold, arriving again. This is the ordinary shape
            // of a blocked call being re-issued: the transport assigns a fresh
            // request id each attempt, so an adapter faithfully reporting the
            // wire would hand us what looks like a second call. Keying on the
            // correlation id instead is what keeps one logical call as one entry
            // — and the block that forced the retry is resolved by the retry
            // itself, so any pending requests on it are cleared.
            if (at !== undefined) {
                const existing = state.entries[at] as ToolEntry;
                return {
                    ...state,
                    entries: replaceAt(state.entries, at, {
                        ...existing,
                        tool: { ...existing.tool, ...action.tool },
                        inputRequests: undefined,
                    }),
                };
            }

            const settled = settleOpen(state);
            const entry: ToolEntry = {
                id: `t:${action.tool.correlationId}`,
                kind: 'tool',
                at: action.at,
                tool: action.tool,
            };

            return {
                ...settled,
                entries: [...settled.entries, entry],
                toolIndex: {
                    ...settled.toolIndex,
                    [action.tool.correlationId]: settled.entries.length,
                },
            };
        }

        case 'agent/tool-update': {
            const at = state.toolIndex[action.correlationId];
            if (at === undefined) return state;

            const existing = state.entries[at] as ToolEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    tool: { ...existing.tool, ...action.patch },
                }),
            };
        }

        case 'agent/progress': {
            const at = state.toolIndex[action.correlationId];
            // Progress belongs to the call it names, not to whatever happens to
            // be last. Dropping it when the call is unknown is deliberate:
            // appending it somewhere visible would be worse than losing it.
            if (at === undefined) return state;

            const existing = state.entries[at] as ToolEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    tool: { ...existing.tool, progress: action.progress },
                }),
            };
        }

        case 'agent/input-required': {
            if (action.correlationId !== undefined) {
                const at = state.toolIndex[action.correlationId];
                if (at !== undefined) {
                    const existing = state.entries[at] as ToolEntry;
                    // Folded onto the call rather than appended beside it: the
                    // call is blocked, not finished, and the transcript should
                    // read that way.
                    return {
                        ...state,
                        entries: replaceAt(state.entries, at, {
                            ...existing,
                            inputRequests: action.requests,
                        }),
                    };
                }
            }

            const settled = settleOpen(state);
            const entry: InputRequiredEntry = {
                id: generatedId(settled),
                kind: 'input-required',
                at: action.at,
                requests: action.requests,
            };

            return {
                ...settled,
                entries: [...settled.entries, entry],
                nextId: settled.nextId + 1,
            };
        }

        case 'agent/input-resolved': {
            if (action.correlationId !== undefined) {
                const at = state.toolIndex[action.correlationId];
                if (at !== undefined) {
                    const existing = state.entries[at] as ToolEntry;
                    return {
                        ...state,
                        entries: replaceAt(state.entries, at, {
                            ...existing,
                            inputRequests: undefined,
                        }),
                    };
                }
            }

            if (action.entryId === undefined) return state;
            const at = indexOfId(state.entries, action.entryId);
            if (at === -1) return state;

            const existing = state.entries[at] as InputRequiredEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    responses: action.responses,
                }),
            };
        }

        case 'agent/plan': {
            // Revised in place. A plan appended on every revision is just a log
            // of stale plans, and the current one scrolls away.
            if (state.planAt !== null) {
                const existing = state.entries[state.planAt] as PlanEntry;
                return {
                    ...state,
                    entries: replaceAt(state.entries, state.planAt, {
                        ...existing,
                        items: action.items,
                    }),
                };
            }

            const settled = settleOpen(state);
            const entry: PlanEntry = {
                id: generatedId(settled),
                kind: 'plan',
                at: action.at,
                items: action.items,
            };

            return {
                ...settled,
                entries: [...settled.entries, entry],
                planAt: settled.entries.length,
                nextId: settled.nextId + 1,
            };
        }

        case 'agent/approval': {
            const id = `a:${action.request.id}`;

            // A re-prompt about the same request updates the card rather than
            // adding a second one. The ACP adapter keys approvals by tool-call
            // id, so a re-prompt, a reconnect replay or a mode change all
            // arrive as the same id — and a duplicate could never be resolved,
            // because resolution looks up by id and finds only the first.
            const replaced = replaceById(state, id, (existing) => ({
                id,
                kind: 'approval',
                // The original position in time, not the moment it was re-asked.
                at: existing.at,
                request: action.request,
                // A decision already taken stands. Re-asking must not silently
                // reopen something the user has answered.
                decision: isApprovalEntry(existing) ? existing.decision : undefined,
            }));
            if (replaced) return replaced;

            const settled = settleOpen(state);
            return {
                ...settled,
                entries: [
                    ...settled.entries,
                    { id, kind: 'approval', at: action.at, request: action.request },
                ],
            };
        }

        case 'agent/custom': {
            // A caller-supplied id means "this entry", so a second dispatch
            // updates it rather than adding a twin — the same rule tool calls
            // and approvals follow.
            if (action.id !== undefined) {
                const replaced = replaceById(state, action.id, (existing) => ({
                    id: existing.id,
                    kind: action.kind,
                    at: existing.at,
                    data: action.data,
                }));
                if (replaced) return replaced;
            }

            const settled = settleOpen(state);
            const id = action.id ?? generatedId(settled);

            return {
                ...settled,
                entries: [
                    ...settled.entries,
                    { id, kind: action.kind, at: action.at, data: action.data },
                ],
                nextId: action.id === undefined ? settled.nextId + 1 : settled.nextId,
            };
        }

        case 'user/send': {
            const settled = settleOpen(state);
            const entry: MessageEntry = {
                id: action.id,
                kind: 'message',
                at: action.at,
                role: 'user',
                text: action.text,
                streaming: false,
                delivery: 'pending',
                // Kept so a failed send can be retried, and a sent one edited,
                // with its pinned tokens intact. A plain string could not.
                value: action.value,
            };

            return { ...settled, entries: [...settled.entries, entry] };
        }

        case 'user/sent': {
            const at = indexOfId(state.entries, action.id);
            if (at === -1) return state;
            const existing = state.entries[at] as MessageEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    delivery: 'sent',
                    error: undefined,
                }),
            };
        }

        case 'user/failed': {
            const at = indexOfId(state.entries, action.id);
            if (at === -1) return state;
            const existing = state.entries[at] as MessageEntry;
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    delivery: 'failed',
                    error: action.error,
                }),
            };
        }

        case 'approval/resolve': {
            const at = indexOfId(state.entries, `a:${action.id}`);
            if (at === -1) return state;

            const existing = state.entries[at];
            if (!isApprovalEntry(existing)) return state;

            // The card stays in the transcript carrying what was decided.
            return {
                ...state,
                entries: replaceAt(state.entries, at, {
                    ...existing,
                    decision: action.decision,
                }),
            };
        }

        default:
            return state;
    }
}
