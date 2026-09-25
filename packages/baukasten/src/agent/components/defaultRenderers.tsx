import type { TranscriptRenderers } from '../renderers';
import { Message } from './Message';
import { Plan } from './Plan';
import { ThoughtBlock } from './ThoughtBlock';
import { ToolCall } from './ToolCall';

export interface DefaultRendererOptions {
    /** Offered on a message whose send failed. */
    onRetryMessage?: (entryId: string) => void;
    /** Last output line for a running call, looked up per entry. */
    tailFor?: (correlationId: string) => string | undefined;
    /**
     * Expanded body for a tool call. Without one, a card does not expand.
     *
     * Keyed by correlation id, the same as {@link tailFor}. It used to take the
     * entry id, which is the transcript's own `t:`-prefixed construction — so a
     * caller holding output keyed by the id the *source* gave them had to know
     * and strip that prefix. Rebuilding the demo on this is what surfaced it.
     */
    toolBody?: (correlationId: string) => React.ReactNode;
}

/**
 * The built-in components, wired to the entry kinds they render.
 *
 * Exists because otherwise the first thing every consumer writes is this exact
 * map, and the second thing they discover is that a kind they forgot renders
 * as a fallback. Spread it and override what you need:
 *
 * @example
 * ```tsx
 * const renderers = mergeRenderers(defaultRenderers(), {
 *   message: ({ entry }) => <MyMessage entry={entry} />,
 *   custom: { deployment: ({ entry }) => <DeploymentCard entry={entry} /> },
 * });
 *
 * <Transcript entries={entries} renderers={renderers} />
 * ```
 *
 * Approvals and input requests are deliberately **not** included. Both need
 * callbacks that only the application can supply — a decision handler, a way
 * to open a URL safely — and wiring them to no-ops would produce consent
 * prompts whose buttons quietly do nothing, which is worse than not rendering
 * them at all.
 */
export function defaultRenderers(options: DefaultRendererOptions = {}): TranscriptRenderers {
    const { onRetryMessage, tailFor, toolBody } = options;

    return {
        message: ({ entry }) => <Message entry={entry} onRetry={onRetryMessage} />,
        thought: ({ entry }) => <ThoughtBlock entry={entry} />,
        plan: ({ entry }) => <Plan entry={entry} />,
        tool: ({ entry }) => (
            <ToolCall entry={entry} tail={tailFor?.(entry.tool.correlationId)}>
                {toolBody?.(entry.tool.correlationId)}
            </ToolCall>
        ),
    };
}
