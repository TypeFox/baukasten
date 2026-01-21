import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import * as styles from './SplitPane.css';

export type SplitPaneOrientation = "horizontal" | "vertical";

export interface SplitPaneProps {
  /** Orientation of the split panes */
  orientation?: SplitPaneOrientation;
  /** Children should be SplitPane.Pane components */
  children: React.ReactNode;
  /** Whether the split pane is vertical (deprecated, use orientation instead) */
  vertical?: boolean;
  /** Minimum size for all panes (can be overridden per pane) */
  minSize?: number;
}

export interface PaneProps {
  /** Minimum size in pixels */
  minSize?: number;
  /** Maximum size in pixels */
  maxSize?: number;
  /** Preferred/initial size in pixels or as a fraction (0-1) */
  preferredSize?: number;
  /** Children content */
  children: React.ReactNode;
}

interface PaneData {
  minSize?: number;
  maxSize?: number;
  preferredSize?: number;
  size: number;
}

/** Delay before showing hover state (VSCode-like behavior) */
const HOVER_DELAY_MS = 200;

// Sizing constants
const DEFAULT_MIN_SIZE = 50; // Minimum pane size in pixels (var(--spacing-12-5) equivalent)
const DIVIDER_SIZE = 1; // Width of divider in pixels (var(--border-width-1) equivalent)

export const Pane: React.FC<PaneProps> = ({ children }) => {
  return <>{children}</>;
};

const SplitPaneComponent = ({
  orientation = "horizontal",
  vertical = false,
  children,
  minSize = DEFAULT_MIN_SIZE,
}: SplitPaneProps) => {
  const actualOrientation = vertical ? "vertical" : orientation;
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paneSizes, setPaneSizes] = useState<number[]>([]);
  const dragStartPos = useRef<number>(0);
  const dragStartSizes = useRef<number[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract pane data from children
  const panes = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<PaneProps> =>
      React.isValidElement(child)
  );

  const paneCount = panes.length;

  // Initialize pane sizes
  useLayoutEffect(() => {
    if (!containerRef.current || paneSizes.length === paneCount) return;

    const containerSize =
      actualOrientation === "vertical"
        ? containerRef.current.clientHeight
        : containerRef.current.clientWidth;

    const totalDividerSize = (paneCount - 1) * DIVIDER_SIZE;
    const availableSize = containerSize - totalDividerSize;

    // Calculate initial sizes
    const paneData: PaneData[] = panes.map((pane) => ({
      minSize: pane.props.minSize ?? minSize,
      maxSize: pane.props.maxSize,
      preferredSize: pane.props.preferredSize,
      size: 0,
    }));

    // First, allocate preferred sizes and calculate remaining space
    let remainingSize = availableSize;
    let flexiblePanes = 0;

    paneData.forEach((data) => {
      if (data.preferredSize !== undefined) {
        // If preferredSize is between 0 and 1, treat as fraction
        if (data.preferredSize > 0 && data.preferredSize <= 1) {
          data.size = Math.floor(availableSize * data.preferredSize);
        } else {
          data.size = data.preferredSize;
        }
        remainingSize -= data.size;
      } else {
        flexiblePanes++;
      }
    });

    // Distribute remaining space among flexible panes
    if (flexiblePanes > 0) {
      const flexSize = Math.floor(remainingSize / flexiblePanes);
      paneData.forEach((data) => {
        if (data.preferredSize === undefined) {
          data.size = flexSize;
        }
      });
    }

    // Apply constraints
    paneData.forEach((data) => {
      if (data.minSize !== undefined) {
        data.size = Math.max(data.size, data.minSize);
      }
      if (data.maxSize !== undefined) {
        data.size = Math.min(data.size, data.maxSize);
      }
    });

    setPaneSizes(paneData.map((d) => d.size));
  }, [paneCount, actualOrientation, minSize]);

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.preventDefault();
      // Clear hover state when dragging starts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setHoveredIndex(null);
      setDraggingIndex(index);
      dragStartPos.current =
        actualOrientation === "vertical" ? e.clientY : e.clientX;
      dragStartSizes.current = [...paneSizes];
    },
    [actualOrientation, paneSizes]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return;

      const currentPos =
        actualOrientation === "vertical" ? e.clientY : e.clientX;
      const delta = currentPos - dragStartPos.current;

      const newSizes = [...dragStartSizes.current];
      const leftIndex = draggingIndex;
      const rightIndex = draggingIndex + 1;

      const leftPane = panes[leftIndex];
      const rightPane = panes[rightIndex];

      const leftMinSize = leftPane?.props.minSize ?? minSize;
      const leftMaxSize = leftPane?.props.maxSize;
      const rightMinSize = rightPane?.props.minSize ?? minSize;
      const rightMaxSize = rightPane?.props.maxSize;

      // Calculate total available space
      const totalSize =
        dragStartSizes.current[leftIndex] + dragStartSizes.current[rightIndex];

      // Calculate desired sizes
      let newLeftSize = dragStartSizes.current[leftIndex] + delta;
      let newRightSize = totalSize - newLeftSize;

      // Apply left pane constraints
      if (leftMaxSize !== undefined && newLeftSize > leftMaxSize) {
        newLeftSize = leftMaxSize;
        newRightSize = totalSize - newLeftSize;
      }
      if (newLeftSize < leftMinSize) {
        newLeftSize = leftMinSize;
        newRightSize = totalSize - newLeftSize;
      }

      // Apply right pane constraints and adjust left if needed
      if (rightMaxSize !== undefined && newRightSize > rightMaxSize) {
        newRightSize = rightMaxSize;
        newLeftSize = totalSize - newRightSize;
      }
      if (newRightSize < rightMinSize) {
        newRightSize = rightMinSize;
        newLeftSize = totalSize - newRightSize;
      }

      newSizes[leftIndex] = newLeftSize;
      newSizes[rightIndex] = newRightSize;

      setPaneSizes(newSizes);
    },
    [draggingIndex, actualOrientation, panes, minSize]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  // Delayed hover handlers (VSCode-like behavior)
  const handleDividerMouseEnter = useCallback((index: number) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Set hovered state after delay
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, HOVER_DELAY_MS);
  }, []);

  const handleDividerMouseLeave = useCallback(() => {
    // Clear timeout if mouse leaves before delay completes
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(null);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (draggingIndex !== null) {
      const cursor = actualOrientation === "vertical" ? "row-resize" : "col-resize";

      // Set cursor on body and prevent text selection
      document.body.style.cursor = cursor;
      document.body.style.userSelect = "none";

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingIndex, handleMouseMove, handleMouseUp, actualOrientation]);

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerSize =
          actualOrientation === "vertical"
            ? entry.contentRect.height
            : entry.contentRect.width;

        const totalDividerSize = (paneCount - 1) * DIVIDER_SIZE;
        const availableSize = containerSize - totalDividerSize;

        setPaneSizes((prevSizes) => {
          if (prevSizes.length === 0) return prevSizes;

          const totalPrevSize = prevSizes.reduce((sum, size) => sum + size, 0);
          const ratio = availableSize / totalPrevSize;

          // Scale all panes proportionally
          return prevSizes.map((size, index) => {
            const newSize = size * ratio;
            const pane = panes[index];
            const paneMinSize = pane?.props.minSize ?? minSize;
            const paneMaxSize = pane?.props.maxSize;

            let constrainedSize = Math.max(newSize, paneMinSize);
            if (paneMaxSize !== undefined) {
              constrainedSize = Math.min(constrainedSize, paneMaxSize);
            }

            return constrainedSize;
          });
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [actualOrientation, paneCount, panes, minSize]);

  return (
    <div ref={containerRef} className={styles.container({ orientation: actualOrientation })}>
      {paneSizes.length > 0 && panes.map((pane, index) => (
        <React.Fragment key={index}>
          <div
            className={styles.paneContainer}
            style={{ flex: `0 0 ${paneSizes[index]}px` }}
          >
            {pane.props.children}
          </div>
          {index < panes.length - 1 && (
            <div className={styles.dividerWrapper({ orientation: actualOrientation })}>
              <div
                className={styles.divider({
                  orientation: actualOrientation,
                  isDragging: draggingIndex === index,
                  isHovered: hoveredIndex === index,
                })}
                onMouseDown={(e) => handleMouseDown(index, e)}
                onMouseEnter={() => handleDividerMouseEnter(index)}
                onMouseLeave={handleDividerMouseLeave}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

SplitPaneComponent.displayName = 'SplitPane';
Pane.displayName = 'Pane';

export const SplitPane = Object.assign(SplitPaneComponent, { Pane });
