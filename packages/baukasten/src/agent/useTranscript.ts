import { useCallback, useMemo, useReducer, useRef } from 'react';
import {
    createTranscriptState,
    transcriptReducer,
    type TranscriptAction,
    type TranscriptState,
} from './transcript';
import type { PromptValue, TranscriptEntry } from './types';

/**
 * Provisional flattening of a {@link PromptValue} to a display string.
 *
 * Deliberately minimal and deliberately private. Real serialisation — to
 * protocol content blocks, and back again — belongs with the prompt editor,
 * which is the thing that knows what a pinned token should become on the wire.
 * This exists only so a caller can send a message without being forced to
 * supply a display string it does not care about.
 */
function flattenPrompt(value: PromptValue): string {
    return value
        .map((node) => (node.type === 'text' ? node.text : node.label))
        .join('')
        .trim();
}

export interface UseTranscriptReturn {
    /** The folded, render-ready list. */
    readonly entries: readonly TranscriptEntry[];
    /** The raw state, for callers that need the lookup tables. */
    readonly state: TranscriptState;
    /** Where adapters push updates. */
    readonly dispatch: (action: TranscriptAction) => void;
    /**
     * Appends the user's message immediately and returns its id.
     *
     * The entry exists before any round trip, so the message never appears to
     * be swallowed while a request is in flight. Settle it with
     * {@link UseTranscriptReturn.markSent} or
     * {@link UseTranscriptReturn.markFailed}.
     */
    readonly sendUserMessage: (value: PromptValue, text?: string) => string;
    readonly markSent: (id: string) => void;
    /** Marks the send failed. The composed value is preserved for a retry. */
    readonly markFailed: (id: string, error: string) => void;
    readonly reset: () => void;
}

/**
 * Holds a transcript and the actions that mutate it.
 *
 * A thin wrapper: all the folding lives in {@link transcriptReducer}, which is
 * pure and testable without React. This adds only the things a hook must own —
 * the reducer instance, and an id counter for messages the user composes.
 *
 * @example
 * ```tsx
 * function Chat({ agent }: { agent: Agent }) {
 *   const { entries, dispatch, sendUserMessage, markSent, markFailed } = useTranscript();
 *
 *   useEffect(() => agent.subscribe(dispatch), [agent, dispatch]);
 *
 *   const send = async (value: PromptValue) => {
 *     const id = sendUserMessage(value);
 *     try {
 *       await agent.prompt(value);
 *       markSent(id);
 *     } catch (error) {
 *       markFailed(id, String(error));
 *     }
 *   };
 *
 *   return (
 *     <>
 *       <Transcript entries={entries} renderers={defaultRenderers()} />
 *       <Composer value={draft} onSend={() => send(draft)}>
 *         <PromptEditor value={draft} onChange={setDraft} onSubmit={send} />
 *       </Composer>
 *     </>
 *   );
 * }
 * ```
 */
export function useTranscript(): UseTranscriptReturn {
    const [state, dispatch] = useReducer(transcriptReducer, undefined, createTranscriptState);

    // Prefixed so it can never collide with an id the reducer generated.
    const nextUserId = useRef(0);

    const sendUserMessage = useCallback((value: PromptValue, text?: string) => {
        const id = `u:${nextUserId.current++}`;
        dispatch({ type: 'user/send', id, value, text: text ?? flattenPrompt(value) });
        return id;
    }, []);

    const markSent = useCallback((id: string) => {
        dispatch({ type: 'user/sent', id });
    }, []);

    const markFailed = useCallback((id: string, error: string) => {
        dispatch({ type: 'user/failed', id, error });
    }, []);

    const reset = useCallback(() => {
        dispatch({ type: 'reset' });
    }, []);

    return useMemo(
        () => ({
            entries: state.entries,
            state,
            dispatch,
            sendUserMessage,
            markSent,
            markFailed,
            reset,
        }),
        [state, sendUserMessage, markSent, markFailed, reset],
    );
}
