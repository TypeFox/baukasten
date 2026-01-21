import React, { useState, useCallback } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStatus,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { Menu } from '../Menu';
import type { MenuProps } from '../Menu';
import { menuWrapper, styledMenu, triggerWrapper } from './ContextMenu.css';

/**
 * ContextMenu component props
 */
export interface ContextMenuProps {
  /**
   * The content that triggers the context menu (will capture right-click events)
   */
  children: React.ReactNode;

  /**
   * The menu content to display (should contain MenuItem, MenuDivider, SubMenu, etc.)
   */
  menu: React.ReactNode;


  /**
   * Size of menu items
   * @default 'md'
   */
  size?: MenuProps['size'];

  /**
   * Whether the context menu is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when the context menu opens
   */
  onOpen?: () => void;

  /**
   * Callback when the context menu closes
   */
  onClose?: () => void;
}

/**
 * ContextMenu component
 *
 * A context menu that appears on right-click, positioned at the cursor.
 * Supports all Menu features including submenus, icons, shortcuts, and dividers.
 * Uses Floating UI for intelligent positioning and automatic updates.
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   menu={
 *     <>
 *       <MenuItem icon={<Icon name="edit" />} rightContent="Ctrl+X">
 *         Cut
 *       </MenuItem>
 *       <MenuItem icon={<Icon name="copy" />} rightContent="Ctrl+C">
 *         Copy
 *       </MenuItem>
 *       <MenuItem icon={<Icon name="clippy" />} rightContent="Ctrl+V">
 *         Paste
 *       </MenuItem>
 *       <MenuDivider />
 *       <SubMenu label="More Actions" icon={<Icon name="chevron-right" />}>
 *         <MenuItem>Rename</MenuItem>
 *         <MenuItem>Delete</MenuItem>
 *       </SubMenu>
 *     </>
 *   }
 * >
 *   <div>Right-click me!</div>
 * </ContextMenu>
 * ```
 */
// Constants matching design tokens (for Floating UI numeric values)
const OFFSET_SPACING = 4; // var(--spacing-1)
const PADDING_SPACING = 8; // var(--spacing-2)
const TRANSITION_DURATION = 150; // var(--transition-fast) = 150ms

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  menu,
  size = 'md',
  disabled = false,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Floating UI setup
  // Note: No autoUpdate - context menus should stay fixed at the cursor position
  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    placement: 'bottom-start',
    // Context menus should NOT use whileElementsMounted: autoUpdate
    // They should remain fixed at the cursor position, not scroll with the page
    middleware: [
      offset(OFFSET_SPACING),
      flip({ padding: PADDING_SPACING }),
      shift({ padding: PADDING_SPACING }),
    ],
  });

  // Floating UI interactions
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  // Transition status for exit animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  });

  // Handle context menu event (right-click)
  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();

    // ✅ Canonical pattern: Call refs.setPositionReference directly in the handler
    // This creates a virtual element at the cursor position
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: event.clientX,
          y: event.clientY,
          top: event.clientY,
          left: event.clientX,
          right: event.clientX,
          bottom: event.clientY,
        };
      },
    });

    setIsOpen(true);
  }, [disabled, refs]);

  // Close menu
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className={triggerWrapper} onContextMenu={handleContextMenu}>
        {children}
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
                zIndex: 'var(--z-index-context-menu)',
              }}
              {...getFloatingProps()}
            >
              <div
                className={menuWrapper({ flip: 'none' })}
                data-status={status}
                onClick={handleClose} // Close on menu item click
              >
                <Menu size={size} className={styledMenu}>
                  {menu}
                </Menu>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

ContextMenu.displayName = 'ContextMenu';
