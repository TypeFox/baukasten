import React from 'react';
import clsx from 'clsx';
import * as styles from './StatusBar.css';

/**
 * StatusBar alignment type
 */
export type StatusBarAlign = 'left' | 'right';

/**
 * StatusBarItem variant for different semantic colors
 */
export type StatusBarItemVariant = 'default' | 'error' | 'warning' | 'info' | 'success';

/**
 * StatusBar component props
 */
export interface StatusBarProps {
  /**
   * StatusBar content (typically StatusBarSection components)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;
}

/**
 * StatusBarSection component props
 */
export interface StatusBarSectionProps {
  /**
   * Alignment of items in this section
   * @default 'left'
   */
  align?: StatusBarAlign;

  /**
   * StatusBarItem components
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * StatusBarItem component props
 */
export interface StatusBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;

  /**
   * Content to display
   */
  children?: React.ReactNode;

  /**
   * Visual variant for semantic colors
   * @default 'default'
   */
  variant?: StatusBarItemVariant;

  /**
   * Whether the item is clickable
   */
  onClick?: () => void;

  /**
   * Whether the item is in an active/selected state
   * @default false
   */
  active?: boolean;

  /**
   * Tooltip text (uses native title attribute)
   */
  tooltip?: string;
}


/**
 * StatusBar component
 *
 * A bottom status bar for displaying contextual information, similar to VSCode's status bar.
 * Organize items using StatusBarSection (left/right alignment) and StatusBarItem for individual elements.
 *
 * @example
 * ```tsx
 * <StatusBar>
 *   <StatusBarSection align="left">
 *     <StatusBarItem icon={<Icon name="git-branch" />} onClick={handleBranchClick}>
 *       main
 *     </StatusBarItem>
 *     <StatusBarItem variant="error" icon={<Icon name="error" />}>
 *       2
 *     </StatusBarItem>
 *   </StatusBarSection>
 *
 *   <StatusBarSection align="right">
 *     <StatusBarItem tooltip="Line 10, Column 5">
 *       Ln 10, Col 5
 *     </StatusBarItem>
 *     <StatusBarItem>UTF-8</StatusBarItem>
 *     <StatusBarItem>TypeScript</StatusBarItem>
 *   </StatusBarSection>
 * </StatusBar>
 * ```
 */
export const StatusBar: React.FC<StatusBarProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={clsx(styles.statusBar, className)} style={style}>
      {children}
    </div>
  );
};

/**
 * StatusBarSection component
 *
 * Container for grouping StatusBarItem components with left or right alignment.
 */
export const StatusBarSection: React.FC<StatusBarSectionProps> = ({
  align = 'left',
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.statusBarSection({ align }), className)}>
      {children}
    </div>
  );
};

/**
 * StatusBarItem component
 *
 * Individual item in the status bar. Can display text, icons, and respond to clicks.
 * Supports semantic color variants for errors, warnings, etc.
 */
export const StatusBarItem: React.FC<StatusBarItemProps> = ({
  icon,
  children,
  variant = 'default',
  onClick,
  active = false,
  tooltip,
  ...props
}) => {
  return (
    <div
      className={styles.statusBarItem({
        variant,
        clickable: !!onClick,
        active,
      })}
      onClick={onClick}
      title={tooltip}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    >
      {icon && icon}
      {children && <span>{children}</span>}
    </div>
  );
};

StatusBar.displayName = 'StatusBar';
StatusBarSection.displayName = 'StatusBarSection';
StatusBarItem.displayName = 'StatusBarItem';
