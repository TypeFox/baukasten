import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
    defaultEntryFallback,
    mergeRenderers,
    renderEntry,
    type EntryRendererProps,
    type TranscriptRenderers,
} from './renderers';
import type { CustomEntry, MessageEntry, ToolEntry, TranscriptEntry } from './types';

const message: MessageEntry = {
    id: 'm1',
    kind: 'message',
    role: 'agent',
    text: 'hello',
    streaming: false,
};

const toolEntry: ToolEntry = {
    id: 't1',
    kind: 'tool',
    tool: { correlationId: 'c1', kind: 'read', title: 'Read', status: 'completed' },
};

const deployment: CustomEntry = {
    id: 'd1',
    kind: 'deployment',
    data: { environment: 'staging' },
};

function propsFor(entry: TranscriptEntry): EntryRendererProps {
    return { entry, index: 0, isLast: true };
}

describe('renderEntry', () => {
    it('dispatches a known kind to its renderer with the narrowed entry type', () => {
        const renderers: TranscriptRenderers = {
            // The parameter types here are the assertion: `entry.text` and
            // `entry.tool` only compile because each renderer received its own
            // entry type rather than the whole union.
            message: ({ entry }) => `message:${entry.text}`,
            tool: ({ entry }) => `tool:${entry.tool.correlationId}`,
        };

        expect(renderEntry(renderers, propsFor(message))).toBe('message:hello');
        expect(renderEntry(renderers, propsFor(toolEntry))).toBe('tool:c1');
    });

    it('dispatches a kind the library has never heard of to a registered renderer', () => {
        const renderers: TranscriptRenderers = {
            custom: {
                deployment: ({ entry }) =>
                    `deployment:${(entry.data as { environment: string }).environment}`,
            },
        };

        expect(renderEntry(renderers, propsFor(deployment))).toBe('deployment:staging');
    });

    it('passes through the positional props every renderer needs', () => {
        const spy = vi.fn(() => null);
        renderEntry({ message: spy }, { entry: message, index: 7, isLast: false });

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({ entry: message, index: 7, isLast: false }),
        );
    });

    it('falls back rather than throwing when a kind has no renderer at all', () => {
        expect(() => renderEntry({}, propsFor(deployment))).not.toThrow();
    });

    it('prefers a caller-supplied fallback over the default', () => {
        const renderers: TranscriptRenderers = { fallback: ({ entry }) => `unknown:${entry.kind}` };
        expect(renderEntry(renderers, propsFor(deployment))).toBe('unknown:deployment');
    });

    it('falls back for a known kind whose renderer was not registered', () => {
        const renderers: TranscriptRenderers = {
            fallback: ({ entry }) => `fallback:${entry.kind}`,
        };
        expect(renderEntry(renderers, propsFor(toolEntry))).toBe('fallback:tool');
    });

    it('renders something visible for an unknown kind, not nothing', () => {
        render(<>{defaultEntryFallback(propsFor(deployment))}</>);

        // An entry that exists must not look like one that does not.
        expect(screen.getByText('deployment')).toBeInTheDocument();
    });
});

describe('mergeRenderers', () => {
    it('lets a later set override one kind without restating the others', () => {
        const base: TranscriptRenderers = {
            message: () => 'base-message',
            tool: () => 'base-tool',
        };
        const merged = mergeRenderers(base, { message: () => 'override' });

        expect(renderEntry(merged, propsFor(message))).toBe('override');
        expect(renderEntry(merged, propsFor(toolEntry))).toBe('base-tool');
    });

    it('merges custom maps instead of replacing them', () => {
        const merged = mergeRenderers(
            { custom: { deployment: () => 'a', rollback: () => 'b' } },
            { custom: { rollback: () => 'b2' } },
        );

        expect(renderEntry(merged, propsFor(deployment))).toBe('a');
        expect(renderEntry(merged, propsFor({ ...deployment, kind: 'rollback' }))).toBe('b2');
    });

    it('ignores undefined sets so optional props can be passed straight through', () => {
        const merged = mergeRenderers(undefined, { message: () => 'ok' }, undefined);
        expect(renderEntry(merged, propsFor(message))).toBe('ok');
    });
});
