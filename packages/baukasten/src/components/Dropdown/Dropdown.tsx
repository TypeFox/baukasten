import React, { useState, useCallback } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStatus,
  FloatingPortal,
  FloatingFocusManager,
  type Placement,
} from '@floating-ui/react';
import { dropdownWrapper, triggerWrapper, portalContent } from './Dropdown.css';

/**
 * Dropdown placement options
 * - `bottom-start`: Below trigger, aligned to left edge
 * - `bottom-end`: Below trigger, aligned to right edge
 * - `top-start`: Above trigger, aligned to left edge
 * - `top-end`: Above trigger, aligned to right edge
 */
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * Dropdown component props
 */
export interface DropdownProps {
  /**
   * The trigger element that opens the dropdown
   */
  trigger: React.ReactNode;

  /**
   * The content to display in the dropdown
   */
  children: React.ReactNode;

  /**
   * Whether the dropdown is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when the dropdown open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Placement of the dropdown relative to the trigger
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;

  /**
   * Whether to close the dropdown when clicking inside it
   * @default true
   */
  closeOnClick?: boolean;

  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Minimum width for the dropdown content
   * @default '10rem' (160px)
   */
  minWidth?: string | number;

  /**
   * Maximum width for the dropdown content
   * @default '24rem' (384px)
   */
  maxWidth?: string | number;

  /**
   * Whether to use modal focus management (traps focus within dropdown)
   * @default false
   */
  modal?: boolean;

  /**
   * Additional CSS class name for the trigger wrapper
   */
  className?: string;
}


// Constants matching design tokens (for Floating UI numeric values)
const OFFSET_SPACING = 4; // var(--spacing-1)
const PADDING_SPACING = 8; // var(--spacing-2)
const TRANSITION_DURATION = 150; // var(--transition-fast) = 150ms

/**
 * Dropdown component
 *
 * A flexible dropdown component that displays user-defined content when triggered.
 * Unlike Select, this component doesn't handle form state and allows any content.
 * Uses Floating UI for intelligent positioning and automatic updates.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app:
 *
 * ```tsx
 * import { GlobalStyles } from 'baukasten-ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Basic usage with Button trigger
 * <Dropdown trigger={<Button>Open Menu</Button>}>
 *   <div>Menu Item 1</div>
 *   <div>Menu Item 2</div>
 *   <div>Menu Item 3</div>
 * </Dropdown>
 *
 * // Controlled mode
 * const [open, setOpen] = useState(false);
 * <Dropdown
 *   trigger={<Button>Toggle</Button>}
 *   open={open}
 *   onOpenChange={setOpen}
 * >
 *   <div>Content</div>
 * </Dropdown>
 *
 * // Different placements
 * <Dropdown trigger={<Button>Menu</Button>} placement="top-end">
 *   <div>Content appears above, aligned right</div>
 * </Dropdown>
 *
 * // With custom content
 * <Dropdown trigger={<span>Click me</span>}>
 *   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
 *     <Button>Action 1</Button>
 *     <Button>Action 2</Button>
 *   </div>
 * </Dropdown>
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  closeOnClick = true,
  disabled = false,
  minWidth = '10rem',
  maxWidth = '24rem',
  modal = false,
  className,
}) => {
  // Use internal state if not controlled
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // Convert placement to Floating UI Placement type
  const floatingPlacement: Placement = placement as Placement;

  // Floating UI setup
  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (disabled) return;

      if (isControlled) {
        onOpenChange?.(open);
      } else {
        setInternalOpen(open);
        onOpenChange?.(open);
      }
    },
    placement: floatingPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET_SPACING),
      flip({ padding: PADDING_SPACING }),
      shift({ padding: PADDING_SPACING }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
            maxHeight: `${availableHeight}px`, // Prevent overflow
          });
        },
        padding: PADDING_SPACING,
      }),
    ],
  });

  // Floating UI interactions
  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  // Transition status for exit animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  });

  // Handle click inside content
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    // Stop event propagation to prevent parent handlers from interfering
    e.stopPropagation();

    if (closeOnClick) {
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setInternalOpen(false);
        onOpenChange?.(false);
      }
    }
  }, [closeOnClick, isControlled, onOpenChange]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={className ? `${dropdownWrapper} ${className}` : dropdownWrapper}
        {...getReferenceProps()}
      >
        <div className={triggerWrapper({ disabled })}>
          {trigger}
        </div>
      </div>

      {/* Portal with transition support for exit animations */}
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={modal}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                visibility: isPositioned ? 'visible' : 'hidden',
                zIndex: 'var(--z-index-popover)',
              }}
              {...getFloatingProps()}
            >
              <div
                className={portalContent}
                data-status={status}
                onClick={handleContentClick}
              >
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
