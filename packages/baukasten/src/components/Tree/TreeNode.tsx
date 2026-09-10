import React, { useCallback } from 'react';
import { Icon } from '../Icon';
import { useTreeContext, type TreeNodeData } from './Tree';
import {
    treeNodeRow,
    expandIconWrapper,
    expandIconSpacer,
    nodeIconWrapper,
    nodeLabel,
    nodeBadge,
    treeRowWindowed,
    edgeGuideVertical,
    edgeGuideHorizontal,
} from './TreeNode.css';

/**
 * Props for the internal row component. All primitives plus `node`, which is
 * the consumer's own object and keeps its identity, so the `React.memo` below
 * compares exactly.
 */
interface TreeNodeComponentProps {
    /** Position in the flattened visible-row array. */
    index: number;
    node: TreeNodeData;
    /** 0 for a root node. */
    depth: number;
    hasChildren: boolean;
    /** True when this row is the last of its sibling group. */
    isLast: boolean;
    /** Bit `d` set when the ancestor at depth `d` still has a sibling below. */
    guideMask: number;
    posInSet: number;
    setSize: number;
    expanded: boolean;
    selected: boolean;
    /** True for the single row that holds the tree's tab stop. */
    tabbable: boolean;
    /** Distance from the top of the scroll canvas; set only when windowed. */
    offsetTop?: number;
    /**
     * Reports the row's real height back to the virtualizer; set only when
     * windowed. Must be stable — the virtualizer's bound method is, an inline
     * arrow would defeat the memo and re-attach on every render.
     */
    measureRef?: (node: Element | null) => void;
}

/**
 * Horizontal inset (px) between a row's indent edge and its content.
 * Shared by the row's `paddingLeft` and the edge connector width so the
 * horizontal guide line reaches exactly to where the content begins.
 */
const ROW_CONTENT_INSET = 8;

/**
 * TreeNodeComponent (internal)
 *
 * Renders exactly one row. It has no knowledge of its children: they are
 * separate rows in the same flat list. Guide lines are reconstructed from
 * `guideMask` so a row can draw every ancestor column without its ancestors
 * being mounted, which under windowing they frequently are not.
 */
const TreeNodeComponentImpl: React.FC<TreeNodeComponentProps> = ({
    index,
    node,
    depth,
    hasChildren,
    isLast,
    guideMask,
    posInSet,
    setSize,
    expanded,
    selected,
    tabbable,
    offsetTop,
    measureRef,
}) => {
    const {
        size,
        edgeStyle,
        indentSize,
        selectable,
        expandOnClick,
        expandIcon: customExpandIcon,
        toggleExpand,
        selectNode,
        focusRow,
    } = useTreeContext();

    const isExpanded = expanded;
    const isSelected = selected;

    // ── Click handler ────────────────────────────────────────────────────
    const handleRowClick = useCallback(
        (e: React.MouseEvent) => {
            if (node.disabled) return;
            e.stopPropagation();

            // Clicking a row makes it the tree's tab stop, so a later Tab
            // returns here rather than to the top of the list.
            focusRow(index);

            if (selectable) {
                selectNode(node.id, node);
            }

            if (hasChildren && expandOnClick) {
                toggleExpand(node.id, node);
            }
        },
        [node, index, hasChildren, selectable, expandOnClick, selectNode, toggleExpand, focusRow],
    );

    const handleExpandClick = useCallback(
        (e: React.MouseEvent) => {
            if (node.disabled) return;
            // A custom `expandIcon` is rendered for leaves too, and toggling one
            // would put an id in `expandedKeys` that nothing ever reads — and
            // hand it to the consumer's `onExpandChange` to store. Fall through
            // to the row instead, so the click still selects.
            if (!hasChildren) return;
            e.stopPropagation();
            toggleExpand(node.id, node);
        },
        [node, hasChildren, toggleExpand],
    );

    // ── Expand icon ──────────────────────────────────────────────────────
    const renderExpandIcon = () => {
        if (customExpandIcon) {
            const custom = customExpandIcon({
                expanded: isExpanded,
                node,
                hasChildren,
            });
            if (custom === null) return null;
            return (
                <span
                    className={expandIconWrapper({ expanded: false })}
                    onClick={!expandOnClick ? handleExpandClick : undefined}
                    role="presentation"
                >
                    {custom}
                </span>
            );
        }

        if (!hasChildren) {
            return <span className={expandIconSpacer} />;
        }

        return (
            <span
                className={expandIconWrapper({ expanded: isExpanded })}
                onClick={!expandOnClick ? handleExpandClick : undefined}
                role="presentation"
            >
                <Icon name="chevron-right" />
            </span>
        );
    };

    // ── Indent calculation ───────────────────────────────────────────────
    const showEdges = edgeStyle !== 'none' && depth > 0;
    const indentPx = depth * indentSize;
    // Centre of this row's own indent gutter — the column its elbow hangs
    // from, and the column its children will hang their elbows one level
    // right of.
    const indentCenterPx = (depth - 1) * indentSize + indentSize / 2;
    // Horizontal branch width from the vertical line to the node content.
    // Reaches from the indent gutter centre all the way to the row content,
    // which sits ROW_CONTENT_INSET past the indent edge.
    const branchWidthPx = indentSize / 2 + ROW_CONTENT_INSET;

    // A leaf without a custom icon renders an invisible 1em spacer where the
    // chevron would sit; extend the connector across it so the gap before the
    // icon matches a row that has a chevron.
    const hasSpacerOnly = !customExpandIcon && !hasChildren;
    const branchWidth = hasSpacerOnly ? `calc(${branchWidthPx}px + 1em)` : `${branchWidthPx}px`;

    // ── Edge guides ──────────────────────────────────────────────────────
    // Drawn inside this row's own box: one vertical per continuing ancestor
    // column, this row's own vertical, and the elbow across to the content.
    // The row has no border, so absolute `left` offsets resolve against its
    // left edge and line up with the indent whatever its `paddingLeft`.
    const renderGuides = () => {
        if (!showEdges) return null;
        const guides: React.ReactNode[] = [];

        // An ancestor at depth `d` continues one gutter left of where its own
        // children hang. Depth 0 has no gutter, so bit 0 is never drawn.
        for (let ancestorDepth = 1; ancestorDepth < depth; ancestorDepth++) {
            if ((guideMask & (1 << ancestorDepth)) === 0) continue;
            guides.push(
                <span
                    key={`a${ancestorDepth}`}
                    aria-hidden="true"
                    data-tree-guide="ancestor"
                    className={edgeGuideVertical({ edgeStyle, span: 'full' })}
                    style={{
                        left: `${(ancestorDepth - 1) * indentSize + indentSize / 2}px`,
                    }}
                />,
            );
        }

        guides.push(
            <span
                key="own"
                aria-hidden="true"
                data-tree-guide="own"
                className={edgeGuideVertical({ edgeStyle, span: isLast ? 'half' : 'full' })}
                style={{ left: `${indentCenterPx}px` }}
            />,
            <span
                key="elbow"
                aria-hidden="true"
                data-tree-guide="elbow"
                className={edgeGuideHorizontal({ edgeStyle })}
                style={{ left: `${indentCenterPx}px`, width: branchWidth }}
            />,
        );

        return guides;
    };

    // ── Row element ──────────────────────────────────────────────────────
    const rowClassName = [
        treeNodeRow({
            size,
            selected: isSelected,
            disabled: node.disabled ?? false,
        }),
        offsetTop !== undefined && treeRowWindowed,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            ref={measureRef}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={selectable ? isSelected : undefined}
            aria-disabled={node.disabled ?? false}
            aria-level={depth + 1}
            aria-posinset={posInSet}
            aria-setsize={setSize}
            tabIndex={tabbable ? 0 : -1}
            data-tree-node-id={node.id}
            data-tree-row-index={index}
            className={rowClassName}
            style={{
                paddingLeft: `${indentPx + ROW_CONTENT_INSET}px`,
                ...(offsetTop !== undefined ? { transform: `translateY(${offsetTop}px)` } : {}),
            }}
            onClick={handleRowClick}
        >
            {renderGuides()}
            {renderExpandIcon()}
            {node.icon && <span className={nodeIconWrapper}>{node.icon}</span>}
            <span className={nodeLabel}>{node.label}</span>
            {node.badge && <span className={nodeBadge}>{node.badge}</span>}
        </div>
    );
};

/**
 * Memoised so that changing one row leaves the others alone: a selection costs
 * two renders rather than one per mounted row. Matters most without windowing,
 * where the whole visible tree is in the DOM.
 */
export const TreeNodeComponent = React.memo(TreeNodeComponentImpl);
