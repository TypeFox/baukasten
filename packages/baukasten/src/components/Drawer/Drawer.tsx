import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { usePortalRoot } from '../../context';
import { Icon } from '../Icon';
import {
  backdrop,
  drawerContainer,
  drawerHeader,
  drawerTitle,
  closeButton,
  drawerBody,
  drawerFooter,
} from './Drawer.css';

/**
 * Drawer placement (which edge it slides from)
 */
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Drawer size options
 * - Standard sizes: xs, sm, md, lg, xl
 * - fullscreen: Covers the entire viewport edge
 */
export type DrawerSize = Size | 'fullscreen';

/**
 * Backdrop visual style
 * - solid: Dark semi-transparent backdrop
 * - blur: Blurred backdrop with reduced opacity
 * - transparent: No visible backdrop (clicks still work)
 */
export type BackdropVariant = 'solid' | 'blur' | 'transparent';

/**
 * Animation state machine states
 */
type AnimationState = 'closed' | 'entering' | 'open' | 'exiting';

/** Duration matching --bk-transition-slow: 300ms */
const ANIMATION_DURATION = 300;

/**
 * Hook to manage drawer slide animation state machine.
 *
 * Flow:
 *   open=true:  closed → entering → open
 *   open=false: open → exiting → closed
 *
 * The element stays mounted during the exit animation so CSS transitions
 * can complete before unmounting.
 */
function useDrawerAnimation(open: boolean) {
  const [animationState, setAnimationState] = useState<AnimationState>(
    open ? 'open' : 'closed'
  );

  useEffect(() => {
    if (open) {
      // Mount at off-screen position
      setAnimationState('entering');

      // Double rAF ensures the browser paints the off-screen position
      // before we transition to the on-screen position
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState('open');
        });
      });
      return () => cancelAnimationFrame(rafId);
    } else {
      // Only animate out if currently visible
      setAnimationState((prev) => {
        if (prev === 'open' || prev === 'entering') {
          return 'exiting';
        }
        return prev;
      });
    }
  }, [open]);

  // Unmount after exit animation completes
  useEffect(() => {
    if (animationState === 'exiting') {
      const timer = setTimeout(() => {
        setAnimationState('closed');
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  return {
    animationState,
    isMounted: animationState !== 'closed',
  };
}

/**
 * Drawer component props
 */
export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  open: boolean;

  /**
   * Callback when the drawer should close
   */
  onClose: () => void;

  /**
   * Which edge the drawer slides from
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Size of the drawer (width for left/right, height for top/bottom)
   * @default 'md'
   */
  size?: DrawerSize;

  /**
   * Backdrop visual style
   * @default 'solid'
   */
  backdropVariant?: BackdropVariant;

  /**
   * Whether clicking the backdrop closes the drawer
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing Escape closes the drawer
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Drawer content (use DrawerHeader, DrawerBody, DrawerFooter for structure)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DrawerHeader component props
 */
export interface DrawerHeaderProps {
  /**
   * Header content (typically a title)
   */
  children: React.ReactNode;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DrawerBody component props
 */
export interface DrawerBodyProps {
  /**
   * Body content
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DrawerFooter component props
 */
export interface DrawerFooterProps {
  /**
   * Footer content (typically action buttons)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Drawer component
 *
 * A slide-in panel component that enters from any edge of the viewport.
 * Supports different sizes, placements, backdrop variants, and composable structure.
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
 * // Basic drawer from the right
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
 *   <DrawerHeader onClose={() => setIsOpen(false)}>
 *     Settings
 *   </DrawerHeader>
 *   <DrawerBody>
 *     <p>Drawer content goes here.</p>
 *   </DrawerBody>
 *   <DrawerFooter>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleSave}>Save</Button>
 *   </DrawerFooter>
 * </Drawer>
 *
 * // Navigation drawer from the left
 * <Drawer open={isOpen} onClose={handleClose} placement="left" size="sm">
 *   <DrawerHeader onClose={handleClose}>Navigation</DrawerHeader>
 *   <DrawerBody>
 *     <nav>...</nav>
 *   </DrawerBody>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  backdropVariant = 'solid',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Get portal root from context (for multi-window support)
  const portalRoot = usePortalRoot();
  const { animationState, isMounted } = useDrawerAnimation(open);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll when drawer is mounted
  useEffect(() => {
    if (!isMounted) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMounted]);

  // Focus management
  useEffect(() => {
    if (open) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the drawer container
      if (drawerRef.current) {
        drawerRef.current.focus();
      }
    } else {
      // Restore focus when drawer closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [open]);

  if (!isMounted) return null;

  // Use portal root from context if available, otherwise fallback to document.body
  const portalTarget = portalRoot ?? document.body;

  return ReactDOM.createPortal(
    <>
      <div
        className={backdrop({ variant: backdropVariant, animationState })}
        onClick={handleBackdropClick}
      />
      <div
        ref={drawerRef}
        className={clsx(drawerContainer({ placement, size, animationState }), className)}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </>,
    portalTarget
  );
};

/**
 * DrawerHeader component
 *
 * Header section for the drawer, typically containing a title and close button.
 *
 * @example
 * ```tsx
 * <DrawerHeader onClose={() => setIsOpen(false)}>
 *   Settings
 * </DrawerHeader>
 * ```
 */
export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  showCloseButton = true,
  onClose,
  className,
}) => {
  return (
    <div className={clsx(drawerHeader, className)}>
      <div className={drawerTitle}>{children}</div>
      {showCloseButton && onClose && (
        <button className={closeButton} onClick={onClose} aria-label="Close drawer">
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};

/**
 * DrawerBody component
 *
 * Main content area of the drawer. Automatically handles overflow with scrolling.
 *
 * @example
 * ```tsx
 * <DrawerBody>
 *   <p>Your drawer content goes here.</p>
 * </DrawerBody>
 * ```
 */
export const DrawerBody: React.FC<DrawerBodyProps> = ({ children, className }) => {
  return <div className={clsx(drawerBody, className)}>{children}</div>;
};

/**
 * DrawerFooter component
 *
 * Footer section for the drawer, typically containing action buttons.
 * Content is right-aligned by default.
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button variant="secondary" onClick={onCancel}>Cancel</Button>
 *   <Button variant="primary" onClick={onConfirm}>Confirm</Button>
 * </DrawerFooter>
 * ```
 */
export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className }) => {
  return <div className={clsx(drawerFooter, className)}>{children}</div>;
};
