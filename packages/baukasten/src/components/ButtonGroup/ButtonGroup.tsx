import React, { useState, useCallback } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStatus,
  FloatingPortal,
  FloatingFocusManager,
  type Placement,
} from '@floating-ui/react';
import { type Size } from '../../styles';
import { Button, type ButtonVariant } from '../Button';
import { Icon } from '../Icon';
import {
  buttonGroup,
  dropdownTriggerWrapper,
  dropdownPortalContent,
} from './ButtonGroup.css';

// Constants matching design tokens (for Floating UI numeric values)
const OFFSET_SPACING = 4; // var(--spacing-1)
const PADDING_SPACING = 8; // var(--spacing-2)
const TRANSITION_DURATION = 150; // var(--transition-fast) = 150ms

/**
 * ButtonGroup component props
 * Groups buttons together with connected styling
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Buttons to group together
   */
  children: React.ReactNode;

  /**
   * Whether the button group should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether to show separator lines between buttons
   * @default false
   */
  showSeparator?: boolean;
}

/**
 * ButtonGroup.Dropdown props
 * Special dropdown trigger for split button pattern
 */
export interface ButtonGroupDropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Content to display in the dropdown menu
   */
  content: React.ReactNode;

  /**
   * Placement of the dropdown relative to the trigger
   * @default 'bottom-end'
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

  /**
   * Whether to close the dropdown when clicking inside it
   * @default true
   */
  closeOnClick?: boolean;

  /**
   * Whether the dropdown is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when the dropdown open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether the dropdown trigger is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual style variant of the dropdown button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the dropdown button
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether to render with outline style
   * @default false
   */
  outline?: boolean;

  /**
   * Custom icon for the dropdown trigger
   * @default 'chevron-down'
   */
  icon?: React.ReactNode;

  /**
   * Aria label for the dropdown trigger button
   * @default 'Open dropdown'
   */
  ariaLabel?: string;
}

/**
 * ButtonGroup component
 *
 * Groups buttons together with connected styling. Useful for creating
 * toolbars, segmented controls, and split buttons.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app:
 *
 * ```tsx
 * import { GlobalStyles } from 'baukasten';
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
 * // Basic button group
 * <ButtonGroup>
 *   <Button variant="primary">Cut</Button>
 *   <Button variant="primary">Copy</Button>
 *   <Button variant="primary">Paste</Button>
 * </ButtonGroup>
 *
 * // Split button pattern
 * <ButtonGroup>
 *   <Button variant="primary" onClick={() => console.log('Save')}>Save</Button>
 *   <ButtonGroup.Dropdown variant="primary" content={
 *     <Menu>
 *       <MenuItem>Save As...</MenuItem>
 *       <MenuItem>Save All</MenuItem>
 *     </Menu>
 *   } />
 * </ButtonGroup>
 *
 * // Full width
 * <ButtonGroup fullWidth>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Center</Button>
 *   <Button variant="secondary">Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> & {
  Dropdown: React.FC<ButtonGroupDropdownProps>;
} = ({
  children,
  fullWidth = false,
  showSeparator = false,
  className,
  ...props
}) => {
    return (
      <div
        className={className ? `${buttonGroup({ fullWidth, showSeparator })} ${className}` : buttonGroup({ fullWidth, showSeparator })}
        {...props}
      >
        {children}
      </div>
    );
  };

/**
 * ButtonGroup.Dropdown component
 *
 * A dropdown trigger for use within ButtonGroup to create split button patterns.
 * Uses Floating UI for intelligent positioning and viewport collision detection.
 */
const ButtonGroupDropdown: React.FC<ButtonGroupDropdownProps> = ({
  content,
  placement = 'bottom-end',
  closeOnClick = true,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  outline = false,
  icon,
  ariaLabel = 'Open dropdown',
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
      floatingSize({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: 'var(--spacing-20)',
            maxHeight: `${availableHeight}px`,
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
        className={className ? `${dropdownTriggerWrapper({ size })} ${className}` : dropdownTriggerWrapper({ size })}
        {...getReferenceProps()}
      >
        <Button
          variant={variant}
          size={size}
          outline={outline}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {icon ?? <Icon name="chevron-down" />}
        </Button>
      </div>

      {/* Portal with transition support for exit animations */}
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
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
                className={dropdownPortalContent}
                data-status={status}
                onClick={handleContentClick}
              >
                {content}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

// Attach Dropdown as a static property
ButtonGroup.Dropdown = ButtonGroupDropdown;
