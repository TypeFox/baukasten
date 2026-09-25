'use client';

/**
 * baukasten-ui/agent
 *
 * Components and headless state for agent-driven applications.
 *
 * Nothing here names a wire protocol. Adapters — which live in their own
 * subpaths so a protocol revision touches one place and tree-shakes away for
 * anyone not using it — map MCP, ACP or a bespoke stream onto these types.
 *
 * Wired into the package as `baukasten-ui/agent`, with the adapters at
 * `/agent/mcp` and `/agent/acp` and the scripted agent at `/agent/testing`.
 * All four share one module graph, so a `TranscriptAction` produced by an
 * adapter is the same type the reducer here consumes.
 */

export * from './types';

export { createTranscriptState, transcriptReducer } from './transcript';
export type { TranscriptState, TranscriptAction } from './transcript';

export { useTranscript } from './useTranscript';
export type { UseTranscriptReturn } from './useTranscript';

export {
    isPromptEmpty,
    normalizePrompt,
    promptCommand,
    promptEquals,
    promptMentions,
    promptToText,
    textToPrompt,
} from './prompt';

export { commandTrigger, detectTrigger, mentionTrigger } from './triggers';
export type {
    ActiveTrigger,
    DetectOptions,
    Trigger,
    TriggerItem,
    TriggerPosition,
} from './triggers';

export { useAttachments } from './useAttachments';
export type { UseAttachmentsOptions, UseAttachmentsReturn } from './useAttachments';

export { useSourceQuery } from './useSourceQuery';
export type { UseSourceQueryOptions, UseSourceQueryReturn } from './useSourceQuery';

export { DensityProvider, densityForWidth, useAutoDensity, useDensity } from './density';
export type { Density, DensityProviderProps } from './density';

export {
    ExpansionProvider,
    useExpansion,
    useExpansionContext,
    useExpansionStore,
} from './expansion';
export type { ExpansionProviderProps, ExpansionStore } from './expansion';

export {
    countByKind,
    filterEntries,
    isEmptyFilter,
    isProblem,
    marksFor,
    matchesFilter,
    nextMark,
    undoneAfter,
} from './transcriptView';
export type { Mark, MarkKind, TranscriptFilterState } from './transcriptView';

export { useMarkNavigation } from './useMarkNavigation';
export type { UseMarkNavigationOptions, UseMarkNavigationReturn } from './useMarkNavigation';

export { contextFill, hasProtocolMismatch } from './servers';
export type {
    ProtocolMessage,
    ResourceContent,
    ResourceDescriptor,
    ServerDescriptor,
    ServerHealth,
    ToolAvailability,
    ToolDescriptor,
    UsageReadout,
} from './servers';

export { createPermissionMemory } from './permissions';
export type {
    CreatePermissionMemoryOptions,
    PermissionMemory,
    PermissionQuery,
    RememberedDecision,
} from './permissions';

export { defaultEntryFallback, mergeRenderers, renderEntry } from './renderers';
export type { EntryRenderer, EntryRendererProps, TranscriptRenderers } from './renderers';

// ─── Components ─────────────────────────────────────────────────────────────

export * from './components';
