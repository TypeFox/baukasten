/**
 * Pure mappings from MCP wire shapes onto the library's own types.
 *
 * Every function here is a total function of its input — no clock, no
 * randomness, no I/O — so a recorded exchange maps identically every time and
 * can be asserted in a test with no server.
 */

import { RequestState, type ServerId } from '../types';
import type {
    CommandItem,
    IconSource,
    InputRequest,
    MentionItem,
    ToolError,
    ToolInvocation,
    ToolKind,
    ToolStatus,
} from '../types';
import type {
    McpCallToolResult,
    McpIcon,
    McpInputRequest,
    McpInputRequiredResult,
    McpPrompt,
    McpProtocolError,
    McpResource,
    McpResourceTemplate,
    McpTool,
} from './protocol';

function toIcons(icons: readonly McpIcon[] | undefined): readonly IconSource[] | undefined {
    if (!icons || icons.length === 0) return undefined;
    return icons.map((icon) => ({
        src: icon.src,
        mimeType: icon.mimeType,
        sizes: icon.sizes,
    }));
}

/**
 * A resource, as something the prompt editor can pin.
 *
 * `title` is the display name when present and `name` is the fallback — the
 * revision added `title` precisely so `name` could stay machine-oriented.
 */
export function toMentionItem(resource: McpResource, server?: ServerId): MentionItem {
    return {
        id: resource.uri,
        kind: resource.mimeType === 'inode/directory' ? 'folder' : 'resource',
        label: resource.title ?? resource.name,
        description: resource.description,
        icons: toIcons(resource.icons),
        serverId: server,
        data: { uri: resource.uri, mimeType: resource.mimeType, size: resource.size },
    };
}

/**
 * A resource template, as a mention that still needs its arguments filled in.
 *
 * Kept distinct from a plain resource by carrying the template rather than a
 * resolved URI — the editor cannot pin this until the arguments are supplied.
 */
export function toTemplateMentionItem(
    template: McpResourceTemplate,
    server?: ServerId,
): MentionItem {
    return {
        id: template.uriTemplate,
        kind: 'resource',
        label: template.title ?? template.name,
        description: template.description,
        icons: toIcons(template.icons),
        serverId: server,
        data: { uriTemplate: template.uriTemplate, mimeType: template.mimeType },
    };
}

/** A prompt, as a slash command. */
export function toCommandItem(prompt: McpPrompt, server?: ServerId): CommandItem {
    return {
        name: prompt.name,
        label: prompt.title ?? prompt.name,
        description: prompt.description,
        icons: toIcons(prompt.icons),
        serverId: server,
        arguments: prompt.arguments?.map((argument) => ({
            name: argument.name,
            description: argument.description,
            required: argument.required,
        })),
    };
}

export interface ToolInvocationContext {
    /** Stable for the whole call, including across retries. Minted by the caller. */
    readonly correlationId: string;
    /** The transport's id for this attempt. Changes on retry; informational. */
    readonly requestId?: string;
    readonly serverId?: ServerId;
    readonly status?: ToolStatus;
    readonly arguments?: unknown;
    readonly startedAt?: number;
    /**
     * MCP tools carry no kind, so one cannot be read off the wire. Supply a
     * mapping if the application has one; otherwise everything renders as
     * `other`, which is honest rather than a guess dressed up as knowledge.
     */
    readonly kind?: ToolKind;
}

export function toToolInvocation(tool: McpTool, context: ToolInvocationContext): ToolInvocation {
    return {
        correlationId: context.correlationId,
        requestId: context.requestId,
        kind: context.kind ?? 'other',
        title: tool.title ?? tool.name,
        status: context.status ?? 'pending',
        icons: toIcons(tool.icons),
        arguments: context.arguments,
        serverId: context.serverId,
        startedAt: context.startedAt,
    };
}

/**
 * A tool that ran and reported a problem.
 *
 * Scoped `execution`, which is the recoverable case: the call itself worked,
 * the agent can usually read the message and route around it, and the
 * conversation continues.
 */
export function toExecutionError(result: McpCallToolResult): ToolError | undefined {
    if (!('isError' in result) || !result.isError) return undefined;
    return { scope: 'execution', message: describeContent(result.content) };
}

/**
 * A call that did not work.
 *
 * Scoped `protocol`, which is the case an agent rarely recovers from and a
 * human usually has to resolve. Kept separate from an execution failure
 * because collapsing the two throws away the difference the protocol went out
 * of its way to draw.
 */
export function toProtocolError(error: McpProtocolError): ToolError {
    return { scope: 'protocol', message: error.message, code: error.code };
}

/** Best-effort human-readable text from a content array. */
function describeContent(content: readonly unknown[] | undefined): string {
    if (!content || content.length === 0) return 'The tool reported an error.';

    const texts = content
        .filter(
            (block): block is { type: 'text'; text: string } =>
                typeof block === 'object' &&
                block !== null &&
                (block as { type?: unknown }).type === 'text' &&
                typeof (block as { text?: unknown }).text === 'string',
        )
        .map((block) => block.text);

    return texts.length > 0 ? texts.join('\n') : 'The tool reported an error.';
}

export function isInputRequired(result: McpCallToolResult): result is McpInputRequiredResult {
    return 'resultType' in result && result.resultType === 'input_required';
}

/**
 * Turns the keyed `inputRequests` map into a flat list, preserving each key.
 *
 * The key is not decoration: answers go back under it, so losing it makes the
 * retry unanswerable. Kinds with no renderer here are mapped rather than
 * dropped, so an application can decline them explicitly instead of leaving a
 * call silently stuck.
 */
export function toInputRequests(
    result: McpInputRequiredResult,
    server?: ServerId,
): readonly InputRequest[] {
    const requests = result.inputRequests;
    if (!requests) return [];

    return Object.entries(requests).map(([key, request]) => toInputRequest(key, request, server));
}

function toInputRequest(key: string, request: McpInputRequest, server?: ServerId): InputRequest {
    if (request.method !== 'elicitation/create') {
        return { key, kind: request.method, message: '', serverId: server };
    }

    const params = (request as { params?: Record<string, unknown> }).params ?? {};
    const message = typeof params.message === 'string' ? params.message : '';
    // The revision allows the mode to be omitted for form requests, so an
    // absent mode is form rather than unknown.
    const mode = params.mode === 'url' ? 'url' : 'form';

    if (mode === 'url') {
        return {
            key,
            kind: 'url',
            message,
            url: typeof params.url === 'string' ? params.url : '',
            serverId: server,
        };
    }

    return { key, kind: 'form', message, schema: params.requestedSchema, serverId: server };
}

/**
 * Seals the continuation blob so it cannot be logged or serialised by accident.
 *
 * Servers put integrity-protected authorisation context in here and clients
 * are required to treat it as opaque, so it stops being a string the moment it
 * crosses into our types.
 */
export function toRequestState(result: McpInputRequiredResult): RequestState | undefined {
    return result.requestState === undefined ? undefined : new RequestState(result.requestState);
}
