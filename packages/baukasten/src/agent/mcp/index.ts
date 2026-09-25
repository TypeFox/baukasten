/**
 * baukasten-ui/agent/mcp
 *
 * Maps MCP `2026-07-28` onto the library's own types.
 *
 * Nested in its own subpath so a protocol revision touches one place and
 * tree-shakes away entirely for anyone not speaking MCP. Nothing in the
 * component layer imports this; the dependency runs one way only.
 */

export {
    MCP_PROTOCOL_VERSION,
    McpProtocolVersionError,
    assertProtocolVersion,
    declaredClientCapabilities,
} from './protocol';

export type {
    McpCacheable,
    McpCallToolResult,
    McpClientCapabilityOptions,
    McpCompleteResult,
    McpElicitRequest,
    McpIcon,
    McpInputRequest,
    McpInputRequiredResult,
    McpOtherInputRequest,
    McpListPromptsResult,
    McpListResourcesResult,
    McpListResourceTemplatesResult,
    McpPort,
    McpPrompt,
    McpPromptArgument,
    McpProtocolError,
    McpResource,
    McpResourceTemplate,
    McpTool,
} from './protocol';

export {
    isInputRequired,
    toCommandItem,
    toExecutionError,
    toInputRequests,
    toMentionItem,
    toProtocolError,
    toRequestState,
    toTemplateMentionItem,
    toToolInvocation,
} from './map';

export type { ToolInvocationContext } from './map';

export { createCommandSource, createMentionSource } from './sources';
export type { McpSourceOptions } from './sources';
