import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import {
  menuContainer,
  menuItem,
  menuItemContent,
  menuItemRight,
  menuDivider,
  subMenuContainer,
  subMenuContent,
} from './Menu.css';

// Timeout delays for submenu interactions
const SUBMENU_CLOSE_DELAY = 100; // Delay before closing submenu on mouse leave (ms)
const SUBMENU_FOCUS_DELAY = 50; // Delay before focusing first item after opening (ms)

/**
 * Menu direction type
 */
export type MenuDirection = 'vertical' | 'horizontal';

/**
 * Menu context to share size, iconOnly state, and direction across all menu items
 */
interface MenuContextValue {
  size: Size;
  iconOnly: boolean;
  direction: MenuDirection;
}

const MenuContext = createContext<MenuContextValue>({ size: 'md', iconOnly: false, direction: 'vertical' });

/**
 * Menu component props
 */
export interface MenuProps {
  /**
   * Size of all menu items
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the menu contains only icons (reduces horizontal padding)
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Direction of the menu layout
   * @default 'vertical'
   */
  direction?: MenuDirection;

  /**
   * Menu items and dividers
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * MenuItem component props
 */
export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Content to display on the right side (badges, shortcuts, etc.)
   */
  rightContent?: React.ReactNode;

  /**
   * Whether the menu item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the menu item is currently selected/active
   * @default false
   */
  selected?: boolean;

  /**
   * Menu item label (optional for icon-only menu items)
   */
  children?: React.ReactNode;
}

/**
 * MenuDivider component props
 */
export interface MenuDividerProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SubMenu component props
 */
export interface SubMenuProps {
  /**
   * Label for the submenu trigger
   */
  label: React.ReactNode;

  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Custom icon to display on the right (defaults to chevron)
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the submenu is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Nested menu items
   */
  children: React.ReactNode;
}


/**
 * Menu component
 *
 * Container for menu items with consistent sizing and styling.
 * Use with MenuItem, MenuDivider, and SubMenu components.
 *
 * @example
 * ```tsx
 * <Menu size="md">
 *   <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
 *   <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
 *   <MenuDivider />
 *   <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
 * </Menu>
 * ```
 */
export const Menu: React.FC<MenuProps> = ({
  size = 'md',
  iconOnly = false,
  direction = 'vertical',
  children,
  className,
}) => {
  // Memoize context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({ size, iconOnly, direction }), [size, iconOnly, direction]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle arrow key navigation between menu items
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const isVertical = direction === 'vertical';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

    if (e.key !== prevKey && e.key !== nextKey && e.key !== 'Home' && e.key !== 'End') {
      return;
    }

    e.preventDefault();

    if (!menuRef.current) return;

    // Get all focusable menu items (not disabled)
    const items = Array.from(
      menuRef.current.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')
    ) as HTMLElement[];

    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    let nextIndex = currentIndex;

    switch (e.key) {
      case prevKey:
        nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        break;
      case nextKey:
        nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
    }

    items[nextIndex]?.focus();
  }, [direction]);

  const containerClassName = className
    ? `${menuContainer({ direction, iconOnly })} ${className}`
    : menuContainer({ direction, iconOnly });

  return (
    <MenuContext.Provider value={contextValue}>
      <div
        ref={menuRef}
        role="menu"
        aria-orientation={direction === 'horizontal' ? 'horizontal' : 'vertical'}
        onKeyDown={handleKeyDown}
        className={containerClassName}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/**
 * MenuItem component
 *
 * Individual clickable item within a Menu.
 * Supports icons, right content (badges, shortcuts), and disabled state.
 *
 * @example
 * ```tsx
 * <MenuItem
 *   icon={<Icon name="save" />}
 *   rightContent={<Badge>⌘S</Badge>}
 *   onClick={() => handleSave()}
 * >
 *   Save
 * </MenuItem>
 * ```
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  rightContent,
  disabled = false,
  selected = false,
  children,
  className,
  onClick,
  ...props
}) => {
  const { size, iconOnly } = useContext(MenuContext);

  // Handle click events - prevent when disabled
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  }, [disabled, onClick]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Simulate click event
      const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      e.currentTarget.dispatchEvent(mouseEvent);
    }
  }, [disabled]);

  const itemClassName = className
    ? `${menuItem({ size, disabled, selected, iconOnly })} ${className}`
    : menuItem({ size, disabled, selected, iconOnly });

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={itemClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={menuItemContent({ iconOnly })}>
        {icon}
        {!iconOnly && children}
      </div>
      {rightContent && <div className={menuItemRight}>{rightContent}</div>}
    </div>
  );
};

/**
 * MenuDivider component
 *
 * Visual separator between menu items.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuItem>Item 1</MenuItem>
 *   <MenuDivider />
 *   <MenuItem>Item 2</MenuItem>
 * </Menu>
 * ```
 */
export const MenuDivider: React.FC<MenuDividerProps> = ({ className }) => {
  const { direction } = useContext(MenuContext);
  const dividerClassName = className
    ? `${menuDivider({ direction })} ${className}`
    : menuDivider({ direction });
  return <div className={dividerClassName} />;
};

/**
 * SubMenu component
 *
 * Menu item that expands to show nested menu items on hover.
 * Can be nested infinitely for multi-level menus.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <SubMenu label="Edit" icon={<Icon name="edit" />}>
 *     <MenuItem>Cut</MenuItem>
 *     <MenuItem>Copy</MenuItem>
 *     <MenuItem>Paste</MenuItem>
 *   </SubMenu>
 * </Menu>
 * ```
 */
export const SubMenu: React.FC<SubMenuProps> = ({
  label,
  icon,
  rightIcon,
  disabled = false,
  children,
}) => {
  const { size, iconOnly, direction } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [offsetTop, setOffsetTop] = useState(0);
  const timeoutRef = useRef<number | undefined>(undefined);
  const positionTimeoutRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check horizontal space
    const spaceOnRight = viewportWidth - containerRect.right;
    const spaceOnLeft = containerRect.left;
    const needsFlip = spaceOnRight < contentRect.width && spaceOnLeft > spaceOnRight;
    setFlipHorizontal(needsFlip);

    // Check vertical space and adjust top offset
    let topOffset = 0;

    // If submenu would overflow bottom of viewport
    if (containerRect.top + contentRect.height > viewportHeight) {
      // Try to align bottom of submenu with bottom of viewport
      const maxOffset = viewportHeight - containerRect.top - contentRect.height;
      topOffset = Math.max(maxOffset, -containerRect.top);
    }

    setOffsetTop(topOffset);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure content is rendered
      positionTimeoutRef.current = window.setTimeout(() => {
        calculatePosition();
      }, 0);

      return () => {
        if (positionTimeoutRef.current) {
          window.clearTimeout(positionTimeoutRef.current);
        }
      };
    }
  }, [isOpen, calculatePosition]);

  const handleMouseEnter = () => {
    if (disabled) return;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, SUBMENU_CLOSE_DELAY);
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowRight':
        e.preventDefault();
        setIsOpen(true);
        // Focus first item in submenu after opening
        setTimeout(() => {
          const firstItem = contentRef.current?.querySelector('[role="menuitem"]') as HTMLElement;
          firstItem?.focus();
        }, SUBMENU_FOCUS_DELAY);
        break;
      case 'Escape':
      case 'ArrowLeft':
        e.preventDefault();
        setIsOpen(false);
        // Return focus to submenu trigger
        containerRef.current?.focus();
        break;
    }
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (positionTimeoutRef.current) {
        window.clearTimeout(positionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={subMenuContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={menuItem({ size, disabled, selected: false, iconOnly })}
        onKeyDown={handleKeyDown}
      >
        <div className={menuItemContent({ iconOnly })}>
          {icon}
          {!iconOnly && label}
        </div>
        {!iconOnly && (
          <div className={menuItemRight}>
            {rightIcon !== undefined ? rightIcon : <Icon name="chevron-right" />}
          </div>
        )}
      </div>

      <div
        ref={contentRef}
        role="menu"
        className={subMenuContent({ isOpen, flipHorizontal })}
        style={{ top: `${offsetTop}px` }}
      >
        <div className={menuContainer({ direction, iconOnly })}>
          {children}
        </div>
      </div>
    </div>
  );
};