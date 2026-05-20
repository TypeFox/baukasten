import React, { createContext, useContext, useCallback, useMemo, useState, useRef } from 'react';
import { type Size } from '../../styles';
import { treeContainer } from './Tree.css';
import { TreeNodeComponent } from './TreeNode';

// ─── Public types ────────────────────────────────────────────────────────────

/**
 * Data shape for each node in the tree.
 */
export interface TreeNodeData {
    /** Unique identifier for the node */
    id: string;
    /** Label displayed in the node row */
    label: React.ReactNode;
    /** Optional icon rendered before the label */
    icon?: React.ReactNode;
    /** Optional content rendered on the right side (badges, actions, etc.) */
    badge?: React.ReactNode;
    /** Child nodes */
    children?: TreeNodeData[];
    /** Whether the node is disabled */
    disabled?: boolean;
}

/**
 * Edge style between parent and child nodes
 */
export type TreeEdgeStyle = 'solid' | 'dashed' | 'dotted' | 'none';

/**
 * Props for the custom expand icon render function
 */
export interface ExpandIconRenderProps {
    expanded: boolean;
    node: TreeNodeData;
    hasChildren: boolean;
}

/**
 * Tree component props
 */
export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Array of root-level tree nodes */
    nodes: TreeNodeData[];

    /**
     * Size of the tree items
     * @default 'md'
     */
    size?: Size;

    // ─── Expansion ──────────────────────────────────────────────────────

    /**
     * Controlled expanded node keys
     */
    expandedKeys?: string[];

    /**
     * Default expanded node keys (uncontrolled)
     * @default []
     */
    defaultExpandedKeys?: string[];

    /**
     * Called when nodes are expanded or collapsed
     */
    onExpandChange?: (
        expandedKeys: string[],
        info: { key: string; expanded: boolean; node: TreeNodeData },
    ) => void;

    // ─── Selection ──────────────────────────────────────────────────────

    /**
     * Whether nodes can be selected
     * @default true
     */
    selectable?: boolean;

    /**
     * Controlled selected node key
     */
    selectedKey?: string | null;

    /**
     * Default selected node key (uncontrolled)
     */
    defaultSelectedKey?: string | null;

    /**
     * Called when a node is selected
     */
    onSelect?: (key: string, node: TreeNodeData) => void;

    // ─── Customization ──────────────────────────────────────────────────

    /**
     * Custom expand/collapse icon renderer.
     * Returning `null` hides the icon. A built-in chevron-right icon is used by default.
     */
    expandIcon?: (props: ExpandIconRenderProps) => React.ReactNode;

    /**
     * Style of the guide lines connecting parent and child nodes
     * @default 'none'
     */
    edgeStyle?: TreeEdgeStyle;

    /**
     * Indentation per level in pixels
     * @default 20
     */
    indentSize?: number;

    /**
     * Whether clicking the entire row toggles expand (true) or only the icon (false)
     * @default true
     */
    expandOnClick?: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

export interface TreeContextValue {
    size: Size;
    edgeStyle: TreeEdgeStyle;
    indentSize: number;
    selectable: boolean;
    expandOnClick: boolean;
    expandedKeys: Set<string>;
    selectedKey: string | null;
    expandIcon?: (props: ExpandIconRenderProps) => React.ReactNode;
    toggleExpand: (key: string, node: TreeNodeData) => void;
    selectNode: (key: string, node: TreeNodeData) => void;
    registerNode: (id: string, element: HTMLElement | null) => void;
}

const TreeContext = createContext<TreeContextValue>({
    size: 'md',
    edgeStyle: 'none',
    indentSize: 20,
    selectable: true,
    expandOnClick: true,
    expandedKeys: new Set(),
    selectedKey: null,
    toggleExpand: () => {},
    selectNode: () => {},
    registerNode: () => {},
});

export const useTreeContext = () => useContext(TreeContext);

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Collect all node IDs in depth-first order (for keyboard navigation).
 */
function flattenVisibleIds(nodes: TreeNodeData[], expandedKeys: Set<string>): string[] {
    const result: string[] = [];
    const walk = (list: TreeNodeData[]) => {
        for (const node of list) {
            result.push(node.id);
            if (node.children?.length && expandedKeys.has(node.id)) {
                walk(node.children);
            }
        }
    };
    walk(nodes);
    return result;
}

/**
 * Find a node by id in the tree data.
 */
function findNode(nodes: TreeNodeData[], id: string): TreeNodeData | undefined {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNode(node.children, id);
            if (found) return found;
        }
    }
    return undefined;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Tree component
 *
 * A hierarchical tree view with expandable nodes, customisable guide edges,
 * icons, badges, keyboard navigation, and full ARIA support.
 *
 * @example
 * ```tsx
 * // Basic
 * <Tree
 *   nodes={[
 *     { id: '1', label: 'Folder A', children: [
 *       { id: '1-1', label: 'File 1' },
 *       { id: '1-2', label: 'File 2' },
 *     ]},
 *     { id: '2', label: 'Folder B', children: [] },
 *   ]}
 * />
 *
 * // With guide lines
 * <Tree nodes={nodes} edgeStyle="solid" />
 *
 * // Controlled expansion
 * <Tree
 *   nodes={nodes}
 *   expandedKeys={expandedKeys}
 *   onExpandChange={setExpandedKeys}
 * />
 * ```
 */
export const Tree: React.FC<TreeProps> = ({
    nodes,
    size = 'md',
    expandedKeys: controlledExpandedKeys,
    defaultExpandedKeys = [],
    onExpandChange,
    selectable = true,
    selectedKey: controlledSelectedKey,
    defaultSelectedKey = null,
    onSelect,
    expandIcon,
    edgeStyle = 'none',
    indentSize = 20,
    expandOnClick = true,
    className,
    ...props
}) => {
    // ── Expansion state (controlled / uncontrolled) ──────────────────────
    const isExpandControlled = controlledExpandedKeys !== undefined;
    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
        () => new Set(defaultExpandedKeys),
    );
    const expandedKeys = useMemo(
        () => (isExpandControlled ? new Set(controlledExpandedKeys) : internalExpanded),
        [isExpandControlled, controlledExpandedKeys, internalExpanded],
    );

    const toggleExpand = useCallback(
        (key: string, node: TreeNodeData) => {
            const isExpanded = expandedKeys.has(key);
            const next = new Set(expandedKeys);
            if (isExpanded) {
                next.delete(key);
            } else {
                next.add(key);
            }

            if (!isExpandControlled) {
                setInternalExpanded(next);
            }
            onExpandChange?.(Array.from(next), {
                key,
                expanded: !isExpanded,
                node,
            });
        },
        [expandedKeys, isExpandControlled, onExpandChange],
    );

    // ── Selection state (controlled / uncontrolled) ─────────────────────
    const isSelectControlled = controlledSelectedKey !== undefined;
    const [internalSelected, setInternalSelected] = useState<string | null>(defaultSelectedKey);
    const selectedKey = isSelectControlled ? controlledSelectedKey : internalSelected;

    const selectNode = useCallback(
        (key: string, node: TreeNodeData) => {
            if (!selectable) return;
            if (node.disabled) return;
            if (!isSelectControlled) {
                setInternalSelected(key);
            }
            onSelect?.(key, node);
        },
        [selectable, isSelectControlled, onSelect],
    );

    // ── Node element registry (for keyboard focus management) ───────────
    const nodeElementsRef = useRef<Map<string, HTMLElement>>(new Map());

    const registerNode = useCallback((id: string, element: HTMLElement | null) => {
        if (element) {
            nodeElementsRef.current.set(id, element);
        } else {
            nodeElementsRef.current.delete(id);
        }
    }, []);

    // ── Keyboard navigation ─────────────────────────────────────────────
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const visibleIds = flattenVisibleIds(nodes, expandedKeys);
            if (visibleIds.length === 0) return;

            const currentId = document.activeElement?.getAttribute('data-tree-node-id') ?? null;
            const currentIndex = currentId ? visibleIds.indexOf(currentId) : -1;

            const focusNode = (id: string) => {
                const el = nodeElementsRef.current.get(id);
                el?.focus();
            };

            switch (e.key) {
                case 'ArrowDown': {
                    e.preventDefault();
                    const nextIdx = currentIndex < visibleIds.length - 1 ? currentIndex + 1 : 0;
                    focusNode(visibleIds[nextIdx]);
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    const prevIdx = currentIndex > 0 ? currentIndex - 1 : visibleIds.length - 1;
                    focusNode(visibleIds[prevIdx]);
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault();
                    if (currentId) {
                        const node = findNode(nodes, currentId);
                        if (node?.children?.length) {
                            if (!expandedKeys.has(currentId)) {
                                toggleExpand(currentId, node);
                            } else {
                                // Move focus to first child
                                const firstChildId = node.children[0].id;
                                focusNode(firstChildId);
                            }
                        }
                    }
                    break;
                }
                case 'ArrowLeft': {
                    e.preventDefault();
                    if (currentId) {
                        const node = findNode(nodes, currentId);
                        if (node?.children?.length && expandedKeys.has(currentId)) {
                            toggleExpand(currentId, node);
                        }
                        // else could move focus to parent — not implemented here for simplicity
                    }
                    break;
                }
                case 'Home': {
                    e.preventDefault();
                    focusNode(visibleIds[0]);
                    break;
                }
                case 'End': {
                    e.preventDefault();
                    focusNode(visibleIds[visibleIds.length - 1]);
                    break;
                }
                case 'Enter':
                case ' ': {
                    e.preventDefault();
                    if (currentId) {
                        const node = findNode(nodes, currentId);
                        if (node && !node.disabled) {
                            selectNode(currentId, node);
                            if (node.children?.length && expandOnClick) {
                                toggleExpand(currentId, node);
                            }
                        }
                    }
                    break;
                }
            }
        },
        [nodes, expandedKeys, toggleExpand, selectNode, expandOnClick],
    );

    // ── Context value ───────────────────────────────────────────────────
    const contextValue = useMemo<TreeContextValue>(
        () => ({
            size,
            edgeStyle,
            indentSize,
            selectable,
            expandOnClick,
            expandedKeys,
            selectedKey: selectedKey ?? null,
            expandIcon,
            toggleExpand,
            selectNode,
            registerNode,
        }),
        [
            size,
            edgeStyle,
            indentSize,
            selectable,
            expandOnClick,
            expandedKeys,
            selectedKey,
            expandIcon,
            toggleExpand,
            selectNode,
            registerNode,
        ],
    );

    const containerClassName = className
        ? `${treeContainer({ size })} ${className}`
        : treeContainer({ size });

    return (
        <TreeContext.Provider value={contextValue}>
            <div
                role="tree"
                aria-label={props['aria-label'] ?? 'Tree'}
                className={containerClassName}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {nodes.map((node) => (
                    <TreeNodeComponent key={node.id} node={node} depth={0} />
                ))}
            </div>
        </TreeContext.Provider>
    );
};
