import React, {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    useRef,
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Size } from '../../styles';
import { treeContainer, treeScrollArea, treeRowCanvas } from './Tree.css';
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
     * Controlled expanded node keys.
     *
     * The array is compared by content, so deriving it inline —
     * `Object.keys(map).filter(...)`, a spread of two lists — costs a comparison
     * per render rather than a rebuild of the whole visible-row list.
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

    // ─── Scrolling and windowing ────────────────────────────────────────

    /**
     * Maximum height of the tree's scroll area (e.g. `400`, `'50vh'`).
     *
     * Giving the tree a bounded height is what enables row windowing: only the
     * rows inside the viewport (plus `overscan`) are mounted, so a 14,000-node
     * tree costs the same as a 14-node one. Without it the tree grows to fit
     * its content and every expanded row is mounted.
     */
    maxHeight?: number | string;

    /**
     * Make the tree fill its parent's height instead of growing with its
     * content. Like `maxHeight`, this gives the tree a bounded viewport and so
     * enables windowing. The parent must itself have a resolved height.
     * @default false
     */
    fillHeight?: boolean;

    /**
     * Height in pixels to assume for a row that has not been measured yet.
     * Defaults to the height implied by `size`.
     *
     * Rows are measured once mounted, so this only decides how accurate the
     * scroll extent is before the reader has been anywhere near a given row.
     * Set it if your rows are markedly taller than the default — a two-line
     * `badge`, an oversized `icon` — to keep the scrollbar from resettling as
     * they come into view.
     */
    estimatedRowHeight?: number;

    /**
     * Rows rendered above and below the viewport, to cover the gap between a
     * scroll event and the re-render that follows it.
     * @default 8
     */
    overscan?: number;

    /**
     * Render every visible row instead of only the windowed slice, trading the
     * memory back for the ability to Ctrl-F the whole tree or screenshot it in
     * one piece.
     *
     * `maxHeight` and `fillHeight` still bound and scroll the tree when this is
     * set; all that changes is how many of the rows inside exist at once.
     * @default false
     */
    disableVirtualization?: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

/**
 * Everything a row needs that does *not* change when the user clicks.
 *
 * Every mounted row subscribes, so anything placed here re-renders all of them
 * when it changes. Expansion and selection are deliberately absent — they reach
 * a row as boolean props instead, so a selection re-renders only the two rows
 * whose boolean flipped.
 */
export interface TreeContextValue {
    size: Size;
    edgeStyle: TreeEdgeStyle;
    indentSize: number;
    selectable: boolean;
    expandOnClick: boolean;
    expandIcon?: (props: ExpandIconRenderProps) => React.ReactNode;
    toggleExpand: (key: string, node: TreeNodeData) => void;
    selectNode: (key: string, node: TreeNodeData) => void;
    focusRow: (index: number) => void;
}

const TreeContext = createContext<TreeContextValue>({
    size: 'md',
    edgeStyle: 'none',
    indentSize: 20,
    selectable: true,
    expandOnClick: true,
    toggleExpand: () => {},
    selectNode: () => {},
    focusRow: () => {},
});

export const useTreeContext = () => useContext(TreeContext);

// ─── Flattening ──────────────────────────────────────────────────────────────

/**
 * One visible row of the tree.
 *
 * Rows are a flat array rather than nested DOM because a node cannot be mounted
 * independently of its ancestors' wrappers, which rules out windowing — and
 * because index arithmetic over a flat list is what makes keyboard navigation
 * O(1) per keypress rather than a walk of the dataset.
 */
export interface TreeFlatRow {
    node: TreeNodeData;
    /** 0 for a root node. */
    depth: number;
    /** Index of this row's parent in the same array, or -1 for a root node. */
    parentIndex: number;
    hasChildren: boolean;
    /** True when this row is the last of its sibling group. */
    isLast: boolean;
    /** 1-based position within the sibling group, for `aria-posinset`. */
    posInSet: number;
    /** Size of the sibling group, for `aria-setsize`. */
    setSize: number;
    /**
     * Which ancestor columns still have a guide line running through them.
     *
     * Bit `d` is set when the ancestor at depth `d` has a sibling after it, so
     * its line must continue past this row to reach it. A row can therefore
     * draw every guide it needs without its ancestors being mounted, which
     * under windowing they often are not.
     *
     * A mask rather than an array keeps the row's props primitive, so
     * `React.memo` still holds when flattening rebuilds every row object.
     * Guides are capped at {@link MAX_GUIDE_DEPTH}; deeper rows still render.
     *
     * Bit 0 is recorded but never drawn: a column hangs one gutter left of its
     * children and depth 0 has none, so root siblings go unconnected. Setting
     * it anyway keeps the rule uniform across depths.
     */
    guideMask: number;
}

/** Guides live in a 32-bit mask, so only the first 31 levels can carry one. */
const MAX_GUIDE_DEPTH = 31;

/**
 * Walk the tree once, emitting a row for every node that is currently visible.
 * A collapsed branch is skipped whole, so the cost tracks what is on screen
 * rather than the size of `nodes`.
 */
export function flattenTree(
    nodes: TreeNodeData[],
    expandedKeys: Set<string>,
): { rows: TreeFlatRow[]; indexById: Map<string, number> } {
    const rows: TreeFlatRow[] = [];
    const indexById = new Map<string, number>();

    const walk = (list: TreeNodeData[], depth: number, parentIndex: number, guideMask: number) => {
        for (let i = 0; i < list.length; i++) {
            const node = list[i];
            const isLast = i === list.length - 1;
            const hasChildren = !!node.children?.length;
            const index = rows.length;

            rows.push({
                node,
                depth,
                parentIndex,
                hasChildren,
                isLast,
                posInSet: i + 1,
                setSize: list.length,
                guideMask,
            });
            indexById.set(node.id, index);

            if (hasChildren && expandedKeys.has(node.id)) {
                // This node's own column keeps its line only while a sibling
                // remains below it to connect to.
                const childMask =
                    !isLast && depth < MAX_GUIDE_DEPTH ? guideMask | (1 << depth) : guideMask;
                walk(node.children!, depth + 1, index, childMask);
            }
        }
    };

    walk(nodes, 0, -1, 0);
    return { rows, indexById };
}

/**
 * A row's position in the flattened list, written by `TreeNode`. Focus
 * management finds a row by it, and the virtualizer reads it back off a
 * measured element to know which row it just measured.
 */
const ROW_INDEX_ATTRIBUTE = 'data-tree-row-index';

/**
 * Opening guess at a row's height, per size — the `minHeight` of each size
 * variant in `TreeNode.css.ts`, resolved at a 16px root font.
 *
 * Only ever a guess: `minHeight` comes from the rem-based spacing scale, while
 * the text inside is sized from `--bk-font-size-*`, which tracks the host
 * editor's UI font. Past roughly a 14px host font the text outgrows the floor —
 * at `xs` it already does at the default — so rows are measured once mounted
 * and these numbers only stand in for rows the reader has not reached.
 */
const ROW_HEIGHT_BY_SIZE: Record<Size, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
};

/**
 * Row count past which an unbounded tree is worth warning about. Below it,
 * growing with content is an ordinary thing to want and the warning is noise.
 */
const WINDOWING_ADVICE_THRESHOLD = 500;

/**
 * Whether a controlled `expandedKeys` array still holds the same keys.
 *
 * Order-sensitive, and deliberately so: comparing as sets would need a set to
 * compare against, which is the allocation this exists to avoid. A reorder
 * therefore rebuilds — one wasted rebuild, never a wrong answer.
 */
const sameKeys = (a: readonly string[] | undefined, b: readonly string[]): boolean =>
    a !== undefined && a.length === b.length && a.every((key, i) => key === b[i]);

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
    maxHeight,
    fillHeight = false,
    estimatedRowHeight: estimatedRowHeightProp,
    overscan = 8,
    disableVirtualization = false,
    className,
    style,
    onKeyDown: onKeyDownProp,
    ...props
}) => {
    // ── Expansion state (controlled / uncontrolled) ──────────────────────
    const isExpandControlled = controlledExpandedKeys !== undefined;
    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
        () => new Set(defaultExpandedKeys),
    );

    // A controlled `expandedKeys` becomes a Set once per real change rather than
    // once per render, so a consumer deriving the array inline pays a comparison
    // instead of a rebuild of every visible row.
    //
    // Held in state, not a ref: React discards the update along with an
    // abandoned render, so there is no phase to reason about. Adjusting state
    // during render re-runs this component immediately, before committing —
    // props are fixed for that pass, so the condition is false the second time
    // through and it settles at once.
    const [prevKeys, setPrevKeys] = useState(controlledExpandedKeys);
    const [controlledSet, setControlledSet] = useState(() => new Set(controlledExpandedKeys));
    if (
        isExpandControlled &&
        controlledExpandedKeys !== prevKeys &&
        !sameKeys(prevKeys, controlledExpandedKeys)
    ) {
        setPrevKeys(controlledExpandedKeys);
        setControlledSet(new Set(controlledExpandedKeys));
    }

    const expandedKeys = isExpandControlled ? controlledSet : internalExpanded;

    // ── Selection state (controlled / uncontrolled) ─────────────────────
    const isSelectControlled = controlledSelectedKey !== undefined;
    const [internalSelected, setInternalSelected] = useState<string | null>(defaultSelectedKey);
    const selectedKey = (isSelectControlled ? controlledSelectedKey : internalSelected) ?? null;

    // ── Latest-value refs ───────────────────────────────────────────────
    // `toggleExpand` and `selectNode` go into the shared context, so rebuilding
    // them on every expansion or inline callback change would re-render every
    // mounted row. Reading current values through refs keeps them stable.
    //
    // Filled in an effect, not during render: a concurrent render can be
    // abandoned, and a consumer deferring `setExpandedKeys` into a transition
    // would otherwise leave these holding an uncommitted expansion set. Effects
    // flush before the next discrete event, so handlers still read fresh values.
    const expandedRef = useRef(expandedKeys);
    const callbacksRef = useRef({ onExpandChange, onSelect, selectable, expandOnClick });
    const controlledRef = useRef({ isExpandControlled, isSelectControlled });

    useEffect(() => {
        expandedRef.current = expandedKeys;
        callbacksRef.current = { onExpandChange, onSelect, selectable, expandOnClick };
        controlledRef.current = { isExpandControlled, isSelectControlled };
    });

    const toggleExpand = useCallback((key: string, node: TreeNodeData) => {
        const current = expandedRef.current;
        const isExpanded = current.has(key);
        const next = new Set(current);
        if (isExpanded) {
            next.delete(key);
        } else {
            next.add(key);
        }

        if (!controlledRef.current.isExpandControlled) {
            setInternalExpanded(next);
        }
        callbacksRef.current.onExpandChange?.(Array.from(next), {
            key,
            expanded: !isExpanded,
            node,
        });
    }, []);

    const selectNode = useCallback((key: string, node: TreeNodeData) => {
        if (!callbacksRef.current.selectable) return;
        if (node.disabled) return;
        if (!controlledRef.current.isSelectControlled) {
            setInternalSelected(key);
        }
        callbacksRef.current.onSelect?.(key, node);
    }, []);

    // ── Flattened visible rows ──────────────────────────────────────────
    const { rows, indexById } = useMemo(
        () => flattenTree(nodes, expandedKeys),
        [nodes, expandedKeys],
    );

    // ── Focus management ────────────────────────────────────────────────
    // Focus is tracked by row index rather than by holding element
    // references, because under windowing the element for a given row comes
    // and goes with scrolling. `pendingFocusRef` marks "we asked to focus this
    // row and have not managed to yet"; the effect below retries after each
    // render, scrolling the row into the window when it is not mounted.
    const viewportRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const pendingFocusRef = useRef(false);

    const focusRow = useCallback((index: number) => {
        setFocusedIndex(index);
        pendingFocusRef.current = true;
    }, []);

    // ── Windowing ───────────────────────────────────────────────────────
    // A window needs a viewport with a resolved height to measure against.
    // Without one the tree grows to fit its rows, there is nothing to scroll,
    // and every visible row is mounted.
    const hasBoundedHeight = maxHeight !== undefined || fillHeight;
    const isWindowed = !disableVirtualization && hasBoundedHeight;
    const estimatedRowHeight = estimatedRowHeightProp ?? ROW_HEIGHT_BY_SIZE[size];

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => viewportRef.current,
        estimateSize: useCallback(() => estimatedRowHeight, [estimatedRowHeight]),
        overscan,
        enabled: isWindowed,
        // Reuse the index rows already carry rather than a duplicate `data-index`.
        indexAttribute: ROW_INDEX_ATTRIBUTE,
        // No `getItemKey`: a fresh key function each render would invalidate the
        // measurement memo and rebuild all `count` entries. Index-keying is safe
        // because tree rows are uniform in height.
    });

    const virtualRows = isWindowed ? virtualizer.getVirtualItems() : [];

    const hasWarnedRef = useRef(false);
    useEffect(() => {
        if (
            !disableVirtualization &&
            !hasBoundedHeight &&
            rows.length > WINDOWING_ADVICE_THRESHOLD &&
            !hasWarnedRef.current
        ) {
            hasWarnedRef.current = true;
            console.warn(
                `Tree: ${rows.length} rows are visible but the tree has no bounded height, so all of ` +
                    'them are mounted. Set `maxHeight` or `fillHeight` to render only the rows in ' +
                    'view, or set `disableVirtualization` to suppress this warning.',
            );
        }
    }, [disableVirtualization, hasBoundedHeight, rows.length]);

    // Which row indices are currently in the DOM. Virtual items are always a
    // contiguous run, so this stays a range check rather than a scan.
    const firstRendered = isWindowed ? (virtualRows[0]?.index ?? -1) : 0;
    const lastRendered = isWindowed
        ? (virtualRows[virtualRows.length - 1]?.index ?? -2)
        : rows.length - 1;
    const isRendered = (index: number) => index >= firstRendered && index <= lastRendered;

    useEffect(() => {
        if (!pendingFocusRef.current) return;
        if (focusedIndex < 0 || focusedIndex >= rows.length) {
            pendingFocusRef.current = false;
            return;
        }
        const el = viewportRef.current?.querySelector<HTMLElement>(
            `[${ROW_INDEX_ATTRIBUTE}="${focusedIndex}"]`,
        );
        if (el) {
            pendingFocusRef.current = false;
            el.focus();
        } else if (isWindowed) {
            // Not mounted yet — bring it into the window and try again on the
            // render that follows.
            virtualizer.scrollToIndex(focusedIndex);
        } else {
            pendingFocusRef.current = false;
        }
    });

    // ── Keyboard navigation ─────────────────────────────────────────────
    // Every case below is index arithmetic on `rows`, so a keypress costs the
    // same on a 20-row tree as on a 20,000-row one.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            // Runs first so the consumer can claim a key with `preventDefault`;
            // the props spread below would otherwise replace navigation outright.
            onKeyDownProp?.(e);
            if (e.defaultPrevented) return;
            if (rows.length === 0) return;

            const active = document.activeElement;
            const attr = active?.getAttribute(ROW_INDEX_ATTRIBUTE);
            const currentIndex = attr !== null && attr !== undefined ? Number(attr) : focusedIndex;
            const row = currentIndex >= 0 ? rows[currentIndex] : undefined;

            switch (e.key) {
                case 'ArrowDown': {
                    e.preventDefault();
                    focusRow(currentIndex < rows.length - 1 ? currentIndex + 1 : 0);
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    focusRow(currentIndex > 0 ? currentIndex - 1 : rows.length - 1);
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault();
                    if (!row?.hasChildren) break;
                    if (!expandedKeys.has(row.node.id)) {
                        toggleExpand(row.node.id, row.node);
                    } else {
                        // An expanded node's first child is always the next row.
                        focusRow(currentIndex + 1);
                    }
                    break;
                }
                case 'ArrowLeft': {
                    e.preventDefault();
                    if (!row) break;
                    if (row.hasChildren && expandedKeys.has(row.node.id)) {
                        toggleExpand(row.node.id, row.node);
                    } else if (row.parentIndex >= 0) {
                        // Now expressible: the row knows where its parent sits.
                        focusRow(row.parentIndex);
                    }
                    break;
                }
                case 'Home': {
                    e.preventDefault();
                    focusRow(0);
                    break;
                }
                case 'End': {
                    e.preventDefault();
                    focusRow(rows.length - 1);
                    break;
                }
                case 'Enter':
                case ' ': {
                    e.preventDefault();
                    if (!row || row.node.disabled) break;
                    selectNode(row.node.id, row.node);
                    if (row.hasChildren && expandOnClick) {
                        toggleExpand(row.node.id, row.node);
                    }
                    break;
                }
            }
        },
        [
            rows,
            focusedIndex,
            expandedKeys,
            toggleExpand,
            selectNode,
            expandOnClick,
            focusRow,
            onKeyDownProp,
        ],
    );

    // ── Context value ───────────────────────────────────────────────────
    // Nothing here changes when the user expands or selects, so the value is
    // stable across interaction and rows are free to memoise on their props.
    const contextValue = useMemo<TreeContextValue>(
        () => ({
            size,
            edgeStyle,
            indentSize,
            selectable,
            expandOnClick,
            expandIcon,
            toggleExpand,
            selectNode,
            focusRow,
        }),
        [
            size,
            edgeStyle,
            indentSize,
            selectable,
            expandOnClick,
            expandIcon,
            toggleExpand,
            selectNode,
            focusRow,
        ],
    );

    // ── Roving tabindex ─────────────────────────────────────────────────
    // Exactly one mounted row is tabbable. If the preferred row has scrolled out
    // of the window, the nearest mounted one stands in, so the tree never drops
    // out of the Tab order.
    const selectedIndex = selectedKey !== null ? (indexById.get(selectedKey) ?? -1) : -1;
    const preferredTabIndex =
        focusedIndex >= 0 ? focusedIndex : selectedIndex >= 0 ? selectedIndex : 0;
    const tabbableIndex = isRendered(preferredTabIndex) ? preferredTabIndex : firstRendered;

    // Keyed off the bounded height, not off windowing: a cap without a scroller
    // clips the rows below it out of reach.
    const containerClassName = [
        treeContainer({ size }),
        hasBoundedHeight && treeScrollArea,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Spread into primitives rather than passing `row` itself: flattening
    // rebuilds every row object on each expand, which would make the memo inert.
    const renderRow = (index: number, offsetTop?: number) => {
        const row = rows[index];
        return (
            <TreeNodeComponent
                key={row.node.id}
                index={index}
                node={row.node}
                depth={row.depth}
                hasChildren={row.hasChildren}
                isLast={row.isLast}
                guideMask={row.guideMask}
                posInSet={row.posInSet}
                setSize={row.setSize}
                expanded={row.hasChildren && expandedKeys.has(row.node.id)}
                selected={selectedKey === row.node.id}
                tabbable={index === tabbableIndex}
                offsetTop={offsetTop}
                measureRef={isWindowed ? virtualizer.measureElement : undefined}
            />
        );
    };

    return (
        <TreeContext.Provider value={contextValue}>
            <div
                ref={viewportRef}
                role="tree"
                aria-label={props['aria-label'] ?? 'Tree'}
                className={containerClassName}
                onKeyDown={handleKeyDown}
                style={{
                    ...(maxHeight !== undefined ? { maxHeight } : {}),
                    ...(fillHeight ? { height: '100%' } : {}),
                    ...style,
                }}
                {...props}
            >
                <div
                    role="presentation"
                    className={treeRowCanvas}
                    style={isWindowed ? { height: virtualizer.getTotalSize() } : undefined}
                >
                    {isWindowed
                        ? virtualRows.map((v) => renderRow(v.index, v.start))
                        : rows.map((_, index) => renderRow(index))}
                </div>
            </div>
        </TreeContext.Provider>
    );
};
