import {
  autoUpdate,
  flip,
  FloatingArrow,
  arrow as floatingArrow,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
  type Placement,
} from '@floating-ui/react';
import React, { useRef, useState } from 'react';
import * as styles from './Tooltip.css';

// Floating UI numeric values (required by Floating UI API)
const OFFSET_SPACING = 8; // var(--bk-spacing-2)
const PADDING_SPACING = 8; // var(--bk-spacing-2)
const TRANSITION_DURATION = 150; // var(--bk-transition-fast) = 150ms

// Default max width for tooltips
const DEFAULT_MAX_WIDTH = '320px'; // Reasonable width for readability (calc(var(--bk-spacing-20) * 4))

/**
 * Tooltip placement types - all 12 possible placements
 */
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Tooltip variant types
 */
export type TooltipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Tooltip component props
 */
export interface TooltipProps {
  /**
   * The trigger element that will show the tooltip on hover
   */
  children: React.ReactNode;

  /**
   * Content to display in the tooltip
   */
  content: React.ReactNode;

  /**
   * Placement of the tooltip relative to its trigger
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Visual variant of the tooltip
   * @default 'default'
   */
  variant?: TooltipVariant;

  /**
   * Whether to show the arrow/chevron pointing to the trigger
   * @default true
   */
  showArrow?: boolean;

  /**
   * Maximum width of the tooltip
   * @default '320px' (reasonable width for readability)
   */
  maxWidth?: string;

  /**
   * Delay in milliseconds before showing the tooltip
   * @default 0
   */
  delay?: number;
}

/**
 * Tooltip component
 *
 * A hover-triggered tooltip component that wraps a trigger element and displays informational content.
 * Supports 12 placements and multiple variants with an optional arrow. Uses Floating UI for intelligent
 * positioning with automatic collision detection and viewport boundary handling.
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // With placement
 * <Tooltip content="Appears below" placement="bottom">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // With variant
 * <Tooltip content="Error message" variant="error" placement="top">
 *   <Button>Delete</Button>
 * </Tooltip>
 *
 * // With structured content
 * <Tooltip
 *   content={
 *     <div>
 *       <strong>Title</strong>
 *       <p>Description text</p>
 *     </div>
 *   }
 *   placement="right"
 *   variant="info"
 * >
 *   <Icon name="info" />
 * </Tooltip>
 *
 * // All 12 placements
 * <Tooltip content="Top" placement="top"><Button>Top</Button></Tooltip>
 * <Tooltip content="Top Start" placement="top-start"><Button>Top Start</Button></Tooltip>
 * <Tooltip content="Top End" placement="top-end"><Button>Top End</Button></Tooltip>
 * <Tooltip content="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
 * <Tooltip content="Bottom Start" placement="bottom-start"><Button>Bottom Start</Button></Tooltip>
 * <Tooltip content="Bottom End" placement="bottom-end"><Button>Bottom End</Button></Tooltip>
 * <Tooltip content="Left" placement="left"><Button>Left</Button></Tooltip>
 * <Tooltip content="Left Start" placement="left-start"><Button>Left Start</Button></Tooltip>
 * <Tooltip content="Left End" placement="left-end"><Button>Left End</Button></Tooltip>
 * <Tooltip content="Right" placement="right"><Button>Right</Button></Tooltip>
 * <Tooltip content="Right Start" placement="right-start"><Button>Right Start</Button></Tooltip>
 * <Tooltip content="Right End" placement="right-end"><Button>Right End</Button></Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  variant = 'default',
  showArrow = true,
  maxWidth = DEFAULT_MAX_WIDTH,
  delay = 0,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const arrowRef = useRef(null);

  // Convert placement to Floating UI Placement type
  const floatingPlacement: Placement = placement as Placement;

  // Floating UI setup
  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: floatingPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET_SPACING), // Distance from trigger
      flip({ padding: PADDING_SPACING }), // Flip when near viewport edge
      shift({ padding: PADDING_SPACING }), // Shift to stay in viewport
      showArrow ? floatingArrow({ element: arrowRef, padding: PADDING_SPACING }) : null,
    ].filter(Boolean),
  });

  // Floating UI interactions
  const hover = useHover(context, {
    delay: {
      open: delay,
      close: 0,
    },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Transition status for animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  });

  const strokeColor = {
    default: 'var(--bk-color-border)',
    primary: 'var(--bk-color-primary)',
    success: 'var(--bk-color-success)',
    warning: 'var(--bk-color-warning)',
    error: 'var(--bk-color-danger)',
    info: 'var(--bk-color-info)',
  }[variant];

  return (
    <>
      <div
        ref={refs.setReference}
        className={styles.triggerWrapper}
        {...getReferenceProps()}
      >
        {children}
      </div>

      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              visibility: isPositioned ? 'visible' : 'hidden',
              maxWidth,
              zIndex: 'var(--bk-z-index-tooltip)',
            }}
            {...getFloatingProps()}
          >
            <div
              className={styles.tooltipContainer({ variant })}
              data-status={status}
              data-variant={variant}
            >
              {content}
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  stroke={strokeColor}
                  strokeWidth={0.5}
                  strokeLinejoin='round'
                  className={styles.arrow}
                />
              )}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
