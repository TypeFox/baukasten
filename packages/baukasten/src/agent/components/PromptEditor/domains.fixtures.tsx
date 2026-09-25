/**
 * Four domains, for the stories.
 *
 * Not exported from the package — these exist to demonstrate that the editor
 * has no opinion about what a pinned thing *is*. Files are the familiar case
 * and the least interesting one; a diagram node wants a shape swatch, a DSL
 * symbol wants a type signature in monospace, a tool wants a danger marker.
 * None of those fit an icon-label-description row, which is exactly why the
 * renderers are hooks rather than options.
 */

import type { MentionSource, PromptNode } from '../../types';

// ─── Files ──────────────────────────────────────────────────────────────────

const FILES = [
    'src/services/telemetry/uploader.ts',
    'src/services/telemetry/queue.ts',
    'src/services/telemetry/types.ts',
    'src/services/logging.ts',
    'src/extension.ts',
    'package.json',
];

export const fileSource: MentionSource = {
    async search({ query }) {
        const needle = query.toLowerCase();
        return {
            items: FILES.filter((path) => path.toLowerCase().includes(needle)).map((path) => ({
                id: `file:${path}`,
                kind: 'file' as const,
                label: path.split('/').pop() ?? path,
                description: path,
            })),
            ttlMs: 30_000,
        };
    },
};

// ─── Diagram nodes ──────────────────────────────────────────────────────────

export interface DiagramNode {
    readonly id: string;
    readonly name: string;
    readonly shape: 'event' | 'task' | 'gateway';
    readonly lane: string;
}

const DIAGRAM: DiagramNode[] = [
    { id: 'n1', name: 'Order received', shape: 'event', lane: 'Customer' },
    { id: 'n2', name: 'Validate payment', shape: 'task', lane: 'Billing' },
    { id: 'n3', name: 'Payment ok?', shape: 'gateway', lane: 'Billing' },
    { id: 'n4', name: 'Reserve stock', shape: 'task', lane: 'Warehouse' },
    { id: 'n5', name: 'Order dispatched', shape: 'event', lane: 'Warehouse' },
];

const SHAPE_COLOR: Record<DiagramNode['shape'], string> = {
    event: 'var(--bk-color-success)',
    task: 'var(--bk-color-info)',
    gateway: 'var(--bk-color-warning)',
};

/** A swatch whose geometry says what kind of node it is, before you read it. */
export function ShapeSwatch({ shape }: { shape: DiagramNode['shape'] }) {
    const size = 'var(--bk-font-size-sm)';
    return (
        <span
            aria-hidden
            style={{
                width: size,
                height: size,
                flexShrink: 0,
                backgroundColor: SHAPE_COLOR[shape],
                borderRadius: shape === 'event' ? '50%' : shape === 'gateway' ? '2px' : '3px',
                transform: shape === 'gateway' ? 'rotate(45deg)' : undefined,
                display: 'inline-block',
            }}
        />
    );
}

export const diagramSource: MentionSource = {
    async search({ query }) {
        const needle = query.toLowerCase();
        return {
            items: DIAGRAM.filter((node) => node.name.toLowerCase().includes(needle)).map(
                (node) => ({
                    id: `node:${node.id}`,
                    kind: 'diagram-node',
                    label: node.name,
                    description: node.lane,
                    // The live object, carried untouched. It would not survive
                    // being serialised into a DOM attribute.
                    data: node,
                }),
            ),
        };
    },
};

export function diagramNodeOf(node: PromptNode): DiagramNode | undefined {
    return node.type === 'mention' ? (node.data as DiagramNode | undefined) : undefined;
}

// ─── DSL symbols ────────────────────────────────────────────────────────────

export interface DslSymbol {
    readonly name: string;
    readonly signature: string;
    readonly returns: string;
}

const SYMBOLS: DslSymbol[] = [
    { name: 'count', signature: 'count(rows)', returns: 'int' },
    { name: 'sum', signature: 'sum(rows, field)', returns: 'decimal' },
    { name: 'window', signature: 'window(rows, duration)', returns: 'stream' },
    { name: 'percentile', signature: 'percentile(rows, field, p)', returns: 'decimal' },
];

export const dslSource: MentionSource = {
    async search({ query }) {
        const needle = query.toLowerCase();
        return {
            items: SYMBOLS.filter((symbol) => symbol.name.includes(needle)).map((symbol) => ({
                id: `sym:${symbol.name}`,
                kind: 'symbol',
                label: symbol.name,
                data: symbol,
            })),
        };
    },
};

export function dslSymbolOf(node: PromptNode): DslSymbol | undefined {
    return node.type === 'mention' ? (node.data as DslSymbol | undefined) : undefined;
}

// ─── Tools ──────────────────────────────────────────────────────────────────

export interface ToolDefinition {
    readonly name: string;
    readonly summary: string;
    readonly destructive: boolean;
}

const TOOLS: ToolDefinition[] = [
    { name: 'read_file', summary: 'Read a file from the workspace', destructive: false },
    { name: 'run_tests', summary: 'Run the test suite', destructive: false },
    { name: 'delete_branch', summary: 'Delete a git branch', destructive: true },
    { name: 'drop_table', summary: 'Drop a database table', destructive: true },
];

export const toolSource: MentionSource = {
    async search({ query }) {
        const needle = query.toLowerCase();
        return {
            items: TOOLS.filter((tool) => tool.name.includes(needle)).map((tool) => ({
                id: `tool:${tool.name}`,
                kind: 'tool',
                label: tool.name,
                description: tool.summary,
                data: tool,
            })),
        };
    },
};

export function toolOf(node: PromptNode): ToolDefinition | undefined {
    return node.type === 'mention' ? (node.data as ToolDefinition | undefined) : undefined;
}
