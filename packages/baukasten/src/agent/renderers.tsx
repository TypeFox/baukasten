/**
 * The entry renderer registry.
 *
 * A transcript does not switch over a fixed set of entry kinds. It looks up a
 * renderer by kind, which is what lets a consumer register `deployment` and
 * inherit windowing, filtering, keyboard navigation and stick-to-bottom
 * behaviour without this library knowing anything about deployments.
 *
 * Built-in kinds and custom kinds are deliberately kept in **separate fields**
 * rather than one open map. A single map cannot be typed usefully for both: an
 * index signature broad enough to accept a renderer for an unknown kind either
 * collapses the built-ins' entry types to something unusable, or rejects them
 * outright on function parameter variance. Splitting them means a built-in
 * renderer receives its exact entry type and a custom one receives
 * {@link CustomEntry}, which is what each actually wants.
 */

import type { ReactNode } from 'react';
import {
    isApprovalEntry,
    isInputRequiredEntry,
    isMessageEntry,
    isPlanEntry,
    isThoughtEntry,
    isToolEntry,
    type ApprovalEntry,
    type CustomEntry,
    type InputRequiredEntry,
    type MessageEntry,
    type PlanEntry,
    type ThoughtEntry,
    type ToolEntry,
    type TranscriptEntry,
} from './types';

export interface EntryRendererProps<TEntry extends TranscriptEntry = TranscriptEntry> {
    readonly entry: TEntry;
    readonly index: number;
    /** True for the final entry, which is where a streaming caret attaches. */
    readonly isLast: boolean;
}

export type EntryRenderer<TEntry extends TranscriptEntry = TranscriptEntry> = (
    props: EntryRendererProps<TEntry>,
) => ReactNode;

export interface TranscriptRenderers {
    readonly message?: EntryRenderer<MessageEntry>;
    readonly thought?: EntryRenderer<ThoughtEntry>;
    readonly tool?: EntryRenderer<ToolEntry>;
    readonly plan?: EntryRenderer<PlanEntry>;
    readonly approval?: EntryRenderer<ApprovalEntry>;
    readonly 'input-required'?: EntryRenderer<InputRequiredEntry>;

    /**
     * Renderers for kinds this library has never heard of, keyed by kind.
     *
     * The entry arrives as a {@link CustomEntry}, so whatever the producer
     * attached is on `entry.data` and is yours to narrow.
     */
    readonly custom?: Readonly<Record<string, EntryRenderer<CustomEntry>>>;

    /**
     * Used for any entry with no renderer of its own. Replaces
     * {@link defaultEntryFallback}.
     */
    readonly fallback?: EntryRenderer<TranscriptEntry>;
}

/**
 * What an unrecognised entry looks like when nothing else will render it.
 *
 * Deliberately renders *something*. An unknown kind is a normal event — a
 * newer agent, a newer protocol revision, a custom entry whose renderer was
 * not registered — and the two tempting responses are both wrong: throwing
 * takes down a transcript that was otherwise fine, and returning null makes an
 * entry that exists look like one that does not, which is worse than ugly
 * because it is invisible.
 *
 * Carries no styles and imports no CSS, so it stays usable from the headless
 * layer and inherits whatever the surrounding transcript sets.
 */
export const defaultEntryFallback: EntryRenderer<TranscriptEntry> = ({ entry }) => (
    <div data-bk-entry-kind={entry.kind} data-bk-entry-fallback="">
        {entry.kind}
    </div>
);

/**
 * Picks the renderer for one entry and calls it.
 *
 * Resolution order: a built-in renderer for a known kind, then a registered
 * custom renderer for that kind, then the caller's fallback, then
 * {@link defaultEntryFallback}. It never throws and never returns nothing.
 */
export function renderEntry(renderers: TranscriptRenderers, props: EntryRendererProps): ReactNode {
    const { entry } = props;

    if (renderers.message && isMessageEntry(entry)) {
        return renderers.message({ ...props, entry });
    }
    if (renderers.thought && isThoughtEntry(entry)) {
        return renderers.thought({ ...props, entry });
    }
    if (renderers.tool && isToolEntry(entry)) {
        return renderers.tool({ ...props, entry });
    }
    if (renderers.plan && isPlanEntry(entry)) {
        return renderers.plan({ ...props, entry });
    }
    if (renderers.approval && isApprovalEntry(entry)) {
        return renderers.approval({ ...props, entry });
    }
    if (renderers['input-required'] && isInputRequiredEntry(entry)) {
        return renderers['input-required']({ ...props, entry });
    }

    const custom = renderers.custom?.[entry.kind];
    if (custom) {
        return custom({ ...props, entry: entry as CustomEntry });
    }

    return (renderers.fallback ?? defaultEntryFallback)(props);
}

/**
 * Merges renderer sets, with later entries winning.
 *
 * Lets a consumer take a preset and override one kind without restating the
 * rest, and keeps the `custom` maps merged rather than replaced — replacing
 * them would mean adding one custom kind silently dropped every other.
 */
export function mergeRenderers(
    ...sets: readonly (TranscriptRenderers | undefined)[]
): TranscriptRenderers {
    const merged: {
        -readonly [K in keyof TranscriptRenderers]: TranscriptRenderers[K];
    } = {};
    let custom: Record<string, EntryRenderer<CustomEntry>> | undefined;

    for (const set of sets) {
        if (!set) continue;

        for (const [key, value] of Object.entries(set)) {
            if (key === 'custom' || value === undefined) continue;
            Object.assign(merged, { [key]: value });
        }

        if (set.custom) {
            custom = { ...custom, ...set.custom };
        }
    }

    return custom ? { ...merged, custom } : merged;
}
