import React from 'react';
import { icon, noSize } from './Icon.css';
import type { CodiconName } from './codicon-names';

/**
 * Icon size options matching the design system sizes
 * - `xs`: Extra small (10px)
 * - `sm`: Small (12px)
 * - `md`: Medium (16px) - default
 * - `lg`: Large (20px)
 * - `xl`: Extra large (24px)
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Icon component props
 */
export interface IconProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * The codicon name (without the 'codicon-' prefix)
   * Type-safe with autocomplete support for all 600+ available icons
   * @example 'chevron-right', 'check', 'close', 'search'
   * See https://microsoft.github.io/vscode-codicons/dist/codicon.html for all available icons
   */
  name: CodiconName;

  /**
   * Size of the icon
   * When not provided, the icon will inherit font-size from its parent component
   * @default undefined (inherits from parent)
   */
  size?: IconSize;

  /**
   * Color of the icon (uses CSS color value)
   * Uses design system color tokens by default
   * @default undefined (inherits from parent or uses --bk-color-foreground)
   */
  color?: string;

  /**
   * Whether the icon should rotate/spin
   * Useful for loading indicators
   * @default false
   */
  spin?: boolean;

  /**
   * Rotation angle in degrees
   * @default undefined
   */
  rotate?: number;

  /**
   * Additional CSS class names for the icon
   * Will be combined with the codicon classes
   */
  className?: string;
}

/**
 * Icon component
 * 
 * A flexible icon component that uses VSCode's Codicon font.
 * Integrates with the design system's sizing and color tokens.
 * 
 * **Available Icons**: See https://microsoft.github.io/vscode-codicons/dist/codicon.html
 * 
 * **Note**: This component requires `GlobalStyles` to be included at the root
 * of your app, which automatically imports the Codicon CSS.
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
 * // Basic usage
 * <Icon name="check" />
 * 
 * // With size
 * <Icon name="search" size="lg" />
 * 
 * // With custom color
 * <Icon name="error" color="var(--bk-color-danger)" />
 * 
 * // Loading spinner
 * <Icon name="loading" spin />
 * 
 * // Rotated icon
 * <Icon name="chevron-right" rotate={90} />
 * 
 * // In a button
 * <Button>
 *   <Icon name="save" />
 *   Save Changes
 * </Button>
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  spin = false,
  rotate,
  className,
  ...props
}) => {
  const iconClass = size ? icon({ size, spin }) : `${icon({ spin })} ${noSize}`;
  const classes = ['codicon', `codicon-${name}`, iconClass, className].filter(Boolean).join(' ');

  // Handle color and rotate via inline styles
  const style: React.CSSProperties = {
    ...props.style,
  };
  if (color) {
    style.color = color;
  }
  if (rotate !== undefined) {
    style.transform = `rotate(${rotate}deg)`;
  }

  return (
    <i
      className={classes}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden="true"
      {...props}
    />
  );
};