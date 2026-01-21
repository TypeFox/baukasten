import React from 'react';
import { dividerContainer, dividerLine, dividerLabel } from './Divider.css';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider border style
 */
export type DividerStyle = 'solid' | 'dashed' | 'dotted';

/**
 * Label alignment (for horizontal dividers with labels)
 */
export type DividerLabelAlign = 'left' | 'center' | 'right';

/**
 * Divider component props
 */
export interface DividerProps {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Border style of the divider line
   * @default 'solid'
   */
  variant?: DividerStyle;

  /**
   * Optional label text to display in the divider
   * Only works with horizontal orientation
   */
  label?: React.ReactNode;

  /**
   * Label alignment (when label is provided)
   * @default 'center'
   */
  labelAlign?: DividerLabelAlign;

  /**
   * Vertical spacing (for horizontal dividers)
   * @default 'var(--spacing-4)'
   */
  spacing?: string;

  /**
   * Custom color for the divider line
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
}

/**
 * Divider component
 *
 * A simple component for creating visual separation between content sections.
 * Supports horizontal and vertical orientations, optional labels, and different border styles.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 *
 * // With label in the center
 * <Divider label="OR" />
 *
 * // With label aligned left
 * <Divider label="Section 1" labelAlign="left" />
 *
 * // Dashed style
 * <Divider variant="dashed" />
 *
 * // Dotted style
 * <Divider variant="dotted" />
 *
 * // Custom spacing
 * <Divider spacing="var(--spacing-8)" />
 *
 * // Vertical divider (for use in flex containers)
 * <div style={{ display: 'flex', height: '100px' }}>
 *   <div>Left content</div>
 *   <Divider orientation="vertical" />
 *   <div>Right content</div>
 * </div>
 *
 * // Custom color
 * <Divider color="var(--color-primary)" />
 *
 * // Between sections
 * <div>
 *   <h2>Section 1</h2>
 *   <p>Content...</p>
 *   <Divider label="Section 2" labelAlign="left" />
 *   <p>More content...</p>
 * </div>
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  labelAlign = 'center',
  spacing = 'var(--spacing-4)',
  color,
  className,
  style: inlineStyle,
}) => {
  const hasLabel = !!label && orientation === 'horizontal';

  // Border style mapping
  const borderStyleMap: Record<DividerStyle, string> = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  };

  // Create spacing styles
  const spacingStyle = orientation === 'horizontal'
    ? { margin: `${spacing} 0` }
    : { margin: `0 ${spacing}` };

  // Create border styles
  const borderColor = color || 'var(--color-border)';
  const borderWidth = 'var(--border-width-1)';
  const borderStyle = borderStyleMap[variant];

  const lineBorderStyle = orientation === 'horizontal'
    ? { borderTop: `${borderWidth} ${borderStyle} ${borderColor}` }
    : { borderLeft: `${borderWidth} ${borderStyle} ${borderColor}` };

  const baseClassName = dividerContainer({
    orientation,
    labelAlign: hasLabel ? labelAlign : undefined
  });

  return (
    <div
      className={className ? `${baseClassName} ${className}` : baseClassName}
      style={{ ...spacingStyle, ...inlineStyle }}
      role="separator"
      aria-orientation={orientation}
    >
      <div
        className={dividerLine({
          orientation,
          variant,
          position: hasLabel ? 'first' : 'single',
          labelAlign: hasLabel ? labelAlign : undefined,
        })}
        style={lineBorderStyle}
      />
      {hasLabel && (
        <>
          <span className={dividerLabel}>{label}</span>
          <div
            className={dividerLine({
              orientation,
              variant,
              position: 'last',
              labelAlign,
            })}
            style={lineBorderStyle}
          />
        </>
      )}
    </div>
  );
};

Divider.displayName = 'Divider';
