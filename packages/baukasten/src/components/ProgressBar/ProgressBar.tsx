import React from 'react';
import {
  progressBarWrapper,
  progressBarContainer,
  progressBarFill,
  progressBarLabel,
} from './ProgressBar.css';

/**
 * Progress bar variant types
 */
export type ProgressBarVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

// Default progress bar height
const DEFAULT_HEIGHT = 'var(--bk-spacing-2)'; // 8px

/**
 * ProgressBar component props
 */
export interface ProgressBarProps {
  /**
   * Progress value from 0 to 100
   * If undefined, shows indeterminate loading state
   */
  value?: number;

  /**
   * Visual variant of the progress bar
   * @default 'primary'
   */
  variant?: ProgressBarVariant;

  /**
   * Height of the progress bar
   * @default 'var(--bk-spacing-2)' (8px)
   */
  height?: string;

  /**
   * Whether to show percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Whether to show striped pattern
   * @default false
   */
  striped?: boolean;

  /**
   * Whether to animate stripes (requires striped=true)
   * @default false
   */
  animated?: boolean;

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
 * ProgressBar component
 *
 * A progress indicator component for showing task completion or loading states.
 * Supports both determinate (with value) and indeterminate (loading) modes.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // Determinate progress (0-100)
 * <ProgressBar value={75} />
 *
 * // With variant
 * <ProgressBar value={50} variant="success" />
 *
 * // With label showing percentage
 * <ProgressBar value={65} showLabel />
 *
 * // Indeterminate loading state (no value)
 * <ProgressBar />
 *
 * // Custom height
 * <ProgressBar value={80} height="12px" />
 *
 * // Striped pattern
 * <ProgressBar value={60} striped />
 *
 * // Animated stripes
 * <ProgressBar value={70} striped animated />
 *
 * // Complete example with all features
 * <ProgressBar
 *   value={85}
 *   variant="primary"
 *   height="10px"
 *   showLabel
 *   striped
 *   animated
 * />
 *
 * // Loading state (indeterminate)
 * <ProgressBar variant="default" />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'default',
  height = DEFAULT_HEIGHT,
  showLabel = false,
  striped = false,
  animated = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  // Clamp value between 0 and 100
  const clampedValue = value !== undefined ? Math.min(Math.max(value, 0), 100) : undefined;
  const isIndeterminate = clampedValue === undefined;

  const wrapperClassName = className ? `${progressBarWrapper} ${className}` : progressBarWrapper;

  return (
    <div className={wrapperClassName} style={style}>
      <div
        className={progressBarContainer}
        style={{ height }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || (isIndeterminate ? 'Loading...' : `${clampedValue}%`)}
        aria-valuetext={isIndeterminate ? 'Loading...' : `${clampedValue}%`}
      >
        <div
          className={progressBarFill({
            variant,
            indeterminate: isIndeterminate,
            striped,
            animated,
          })}
          style={clampedValue !== undefined ? { width: `${clampedValue}%` } : undefined}
        />
      </div>
      {showLabel && !isIndeterminate && (
        <span className={progressBarLabel}>{clampedValue}%</span>
      )}
    </div>
  );
};

