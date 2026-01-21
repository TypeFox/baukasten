import React from 'react';
import { type Size } from '../../styles';
import { badge } from './Badge.css';

/**
 * Badge variant types
 */
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

/**
 * Badge component props
 * Extends all standard HTML span attributes
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Content to display in the badge
   */
  children: React.ReactNode;

  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether to render the badge with an outline style
   * @default false
   */
  outline?: boolean;
}

/**
 * Badge component
 * 
 * A small status indicator or label component with multiple variants and sizes.
 * Fully integrates with the design system tokens.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>Default</Badge>
 * 
 * // With variant and size
 * <Badge variant="success" size="lg">Success</Badge>
 * 
 * // All variants
 * <Badge variant="success">Success</Badge>
 * <Badge variant="warning">Warning</Badge>
 * <Badge variant="error">Error</Badge>
 * <Badge variant="info">Info</Badge>
 * 
 * // Outline style
 * <Badge variant="success" outline>Success</Badge>
 * <Badge variant="error" outline>Error</Badge>
 * 
 * // With icon
 * <Badge variant="success">
 *   <CheckIcon />
 *   Completed
 * </Badge>
 * 
 * // With custom className or style
 * <Badge className="my-custom-badge">Custom</Badge>
 * <Badge style={{ marginLeft: '10px' }}>With Style</Badge>
 * 
 * // With other HTML attributes
 * <Badge onClick={() => alert('clicked')} title="Click me">
 *   Clickable
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  outline = false,
  ...props
}) => {
  return (
    <span
      className={badge({ variant, size, outline })}
      {...props}
    >
      {children}
    </span>
  );
};

