import React, { useCallback, useEffect, useRef } from 'react';
import { Icon } from '../Icon';
import { useTreeContext, type TreeNodeData } from './Tree';
import {
    treeNodeWrapper,
    treeNodeRow,
    expandIconWrapper,
    expandIconSpacer,
    nodeIconWrapper,
    nodeLabel,
    nodeBadge,
    childrenContainer,
    childrenInner,
    edgeGuideContainer,
    edgeVerticalLine,
    edgeHorizontalLine,
    edgeChildLine,
} from './TreeNode.css';

/**
 * Props for the internal TreeNode component.
 */
interface TreeNodeComponentProps {
    /** The node data to render */
    node: TreeNodeData;
    /** Current nesting depth (0 for root) */
    depth: number;
    /** Whether this node is the last sibling in its group */
    isLast?: boolean;
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
 * Recursively renders a tree node and its children.
 * Draws edge guides when the tree has `edgeStyle` other than 'none'.
 */
export const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
    node,
    depth,
    isLast = false,
}) => {
    const {
        size,
        edgeStyle,
        indentSize,
        selectable,
        expandOnClick,
        expandedKeys,
        selectedKey,
        expandIcon: customExpandIcon,
        toggleExpand,
        selectNode,
        registerNode,
    } = useTreeContext();

    const rowRef = useRef<HTMLDivElement>(null);
    const hasChildren = !!(node.children && node.children.length > 0);
    const isExpanded = expandedKeys.has(node.id);
    const isSelected = selectedKey === node.id;

    // Register / unregister in the node-elements map
    useEffect(() => {
        registerNode(node.id, rowRef.current);
        return () => registerNode(node.id, null);
    }, [node.id, registerNode]);

    // ── Click handler ────────────────────────────────────────────────────
    const handleRowClick = useCallback(
        (e: React.MouseEvent) => {
            if (node.disabled) return;
            e.stopPropagation();

            if (selectable) {
                selectNode(node.id, node);
            }

            if (hasChildren && expandOnClick) {
                toggleExpand(node.id, node);
            }
        },
        [node, hasChildren, selectable, expandOnClick, selectNode, toggleExpand],
    );

    const handleExpandClick = useCallback(
        (e: React.MouseEvent) => {
            if (node.disabled) return;
            e.stopPropagation();
            toggleExpand(node.id, node);
        },
        [node, toggleExpand],
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
    // Center of the indent gutter (for edge lines), relative to the left of this node's row
    // The indent center is at "parentIndent + indentSize/2"
    const indentCenterPx = (depth - 1) * indentSize + indentSize / 2;
    // Horizontal branch width from the vertical line to the node content.
    // Reaches from the indent gutter centre all the way to the row content,
    // which sits ROW_CONTENT_INSET past the indent edge.
    const branchWidthPx = indentSize / 2 + ROW_CONTENT_INSET;

    // A leaf with no custom expand icon still renders an invisible 1em
    // spacer where the chevron would sit. Extend the connector across that
    // spacer so it ends where the chevron's right edge would be — the
    // connector "stands in" for the missing chevron, leaving the same row
    // gap before the icon that a chevron row has.
    const hasSpacerOnly = !customExpandIcon && !hasChildren;
    const branchWidth = hasSpacerOnly ? `calc(${branchWidthPx}px + 1em)` : `${branchWidthPx}px`;

    // ── CSS custom properties for edge positioning ──────────────────────
    const edgeVars: React.CSSProperties = showEdges
        ? ({
              '--bk-tree-indent-center': `${indentCenterPx}px`,
              '--bk-tree-branch-width': branchWidth,
          } as React.CSSProperties)
        : {};

    // ── Row element ──────────────────────────────────────────────────────
    const rowClassName = treeNodeRow({
        size,
        selected: isSelected,
        disabled: node.disabled ?? false,
    });

    const row = (
        <div
            ref={rowRef}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={selectable ? isSelected : undefined}
            aria-disabled={node.disabled ?? false}
            tabIndex={isSelected ? 0 : -1}
            data-tree-node-id={node.id}
            className={rowClassName}
            style={{ paddingLeft: `${indentPx + ROW_CONTENT_INSET}px` }}
            onClick={handleRowClick}
        >
            {renderExpandIcon()}
            {node.icon && <span className={nodeIconWrapper}>{node.icon}</span>}
            <span className={nodeLabel}>{node.label}</span>
            {node.badge && <span className={nodeBadge}>{node.badge}</span>}
        </div>
    );

    // ── Children ─────────────────────────────────────────────────────────
    // When this node has a sibling below it, its children group carries the
    // guide line through the (potentially expanded) subtree to that sibling.
    const showChildConnector = showEdges && !isLast;
    const childGroupClassName = showChildConnector
        ? `${childrenContainer({ isOpen: isExpanded })} ${edgeChildLine({ edgeStyle })}`
        : childrenContainer({ isOpen: isExpanded });

    const children = hasChildren ? (
        <div
            className={childGroupClassName}
            role="group"
            style={showChildConnector ? edgeVars : undefined}
        >
            <div className={childrenInner}>
                {node.children!.map((child, index) => (
                    <TreeNodeComponent
                        key={child.id}
                        node={child}
                        depth={depth + 1}
                        isLast={index === node.children!.length - 1}
                    />
                ))}
            </div>
        </div>
    ) : null;

    // ── Wrap with edge guides if needed ──────────────────────────────────
    if (showEdges) {
        // For nodes with edges, we wrap the row + children in a container
        // that draws the vertical + horizontal connector lines.
        const edgeClasses = [
            edgeGuideContainer({ edgeStyle }),
            edgeVerticalLine({ edgeStyle, extendDown: !isLast && hasChildren && isExpanded }),
            edgeHorizontalLine({ edgeStyle }),
        ].join(' ');

        return (
            <div className={treeNodeWrapper}>
                <div className={edgeClasses} style={edgeVars}>
                    {row}
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className={treeNodeWrapper}>
            {row}
            {children}
        </div>
    );
};
