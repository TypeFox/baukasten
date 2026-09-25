import React from 'react';
import clsx from 'clsx';
import { spinnerWrapper, spinner } from './Spinner.css';

/**
 * Spinner sizes, matching {@link IconSize} step for step.
 *
 * Deliberately the same scale as `Icon` rather than the shared `Size` type: a
 * spinner is a glyph, and the two are constantly placed side by side as the
 * running and settled states of the same thing. `Size` stops at `xl`, which
 * left nothing large enough for a full-panel overlay once the scale was
 * corrected downwards.
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Spinner component props
 */
export interface SpinnerProps {
    /**
     * Size of the spinner
     *
     * Matches `Icon` at every step — `<Spinner size="sm" />` is the same size
     * as `<Icon size="sm" />`, so swapping one for the other does not move
     * anything around it.
     *
     * @default 'md'
     */
    size?: SpinnerSize;

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
 * // Large, for a full-panel overlay
 * <Spinner size="3xl" />
 *
 * // Beside an icon, at a matching size
 * <Spinner size="xs" /> <Icon name="check" size="xs" />
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
 * // In a button — matches the button's own font size, so it fits
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
