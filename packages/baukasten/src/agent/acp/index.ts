/**
 * baukasten-ui/agent/acp
 *
 * Maps ACP onto the library's own types — the same types the MCP adapter
 * targets, which is the point of it existing.
 *
 * In its own subpath so it tree-shakes away for anyone not speaking ACP.
 * Nothing in the component layer imports this; the dependency runs one way.
 */

export { acpPermissionOutcome, toApprovalRequest, toText, toToolKind, toToolStatus } from './map';
export {
    elicitationToolCall,
    toCommandItems,
    toInputRequest,
    toSessionChanges,
    toTranscriptAction,
    toUsageReadout,
} from './map';
export type { AcpMapOptions } from './map';

export {
    isAcpAvailableCommands,
    isAcpCurrentMode,
    isAcpDiff,
    isAcpFormElicitation,
    isAcpMessageChunk,
    isAcpPlan,
    isAcpResourceLink,
    isAcpTextContent,
    isAcpToolCall,
    isAcpToolCallProgress,
    isAcpUrlElicitation,
    isAcpUsage,
} from './protocol';

export type {
    AcpAvailableCommand,
    AcpAvailableCommandsUpdate,
    AcpContentBlock,
    AcpCost,
    AcpCurrentModeUpdate,
    AcpDiffContent,
    AcpElicitation,
    AcpElicitationResponse,
    AcpElicitationScope,
    AcpFormElicitation,
    AcpMessageChunkUpdate,
    AcpOtherContent,
    AcpOtherToolCallContent,
    AcpUnknownElicitation,
    AcpUnknownUpdate,
    AcpPermissionOption,
    AcpPermissionOptionKind,
    AcpPlanEntry,
    AcpPlanEntryPriority,
    AcpPlanEntryStatus,
    AcpPlanUpdate,
    AcpRequestPermission,
    AcpResourceLinkContent,
    AcpSessionUpdate,
    AcpStopReason,
    AcpTextContent,
    AcpToolCallContent,
    AcpToolCallKind,
    AcpToolCallLocation,
    AcpToolCallProgressUpdate,
    AcpToolCallStatus,
    AcpToolCallUpdate,
    AcpUrlElicitation,
    AcpUsageUpdate,
} from './protocol';
