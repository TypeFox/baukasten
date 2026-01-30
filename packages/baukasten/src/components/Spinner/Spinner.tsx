import React from 'react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { spinnerWrapper, spinner } from './Spinner.css';

/**
 * Spinner component props
 */
export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: Size;

  /**
   * Custom color for the spinner (uses semantic token or CSS value)
   * @default undefined (uses --bk-color-primary)
   */
  color?: string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;

  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

/**
 * Spinner component
 *
 * A circular loading spinner that follows VSCode's design patterns.
 * Uses a rotating border animation to indicate loading or processing states.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner />
 *
 * // Small spinner
 * <Spinner size="sm" />
 *
 * // Large spinner
 * <Spinner size="lg" />
 *
 * // Custom color using semantic token
 * <Spinner color="var(--bk-color-success)" />
 *
 * // Custom color using CSS value
 * <Spinner color="#ff6600" />
 *
 * // With accessible label
 * <Spinner aria-label="Loading user data" />
 *
 * // In a button
 * <Button disabled>
 *   <Spinner size="sm" /> Loading...
 * </Button>
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  className,
  style: inlineStyle,
  'aria-label': ariaLabel,
}) => {
  return (
    <div className={clsx(spinnerWrapper, className)} style={inlineStyle}>
      <div
        className={spinner({ size })}
        style={{ borderTopColor: color || 'var(--bk-color-primary)' }}
        role="status"
        aria-label={ariaLabel || 'Loading'}
        aria-live="polite"
      />
    </div>
  );
};

Spinner.displayName = 'Spinner';
