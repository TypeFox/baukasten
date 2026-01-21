import React from 'react';
import { heading } from './Heading.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';

/**
 * Heading level (semantic HTML)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Extract variant types from recipe
 */
export type HeadingVariants = RecipeVariants<typeof heading>;

/**
 * Heading component props
 * Extends all standard HTML heading attributes
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level (h1-h6)
   * @default 1
   */
  level?: HeadingLevel;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Whether to add bottom margin
   * @default true
   */
  marginBottom?: boolean;

  /**
   * Whether to add top margin
   * @default true
   */
  marginTop?: boolean;
}

/**
 * Heading component
 *
 * A semantic heading component (h1-h6) with default styling for each level.
 * Use className or style prop to customize appearance as needed.
 *
 * @example
 * ```tsx
 * // Basic usage (h1)
 * <Heading>Main Title</Heading>
 *
 * // Different heading levels
 * <Heading level={2}>Subtitle</Heading>
 * <Heading level={3}>Section Title</Heading>
 *
 * // Centered heading
 * <Heading level={2} align="center">Centered Title</Heading>
 *
 * // Without bottom margin
 * <Heading marginBottom={false}>Tight Heading</Heading>
 *
 * // First heading without top margin
 * <Heading marginTop={false}>First Heading</Heading>
 *
 * // Custom styling via className or style
 * <Heading className="custom-class" style={{ fontSize: '2rem' }}>
 *   Custom Styled Heading
 * </Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  align = 'left',
  marginBottom = true,
  marginTop = true,
  className,
  children,
  ...props
}) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const headingClass = className
    ? `${heading({ level, align, marginBottom, marginTop })} ${className}`
    : heading({ level, align, marginBottom, marginTop });

  return (
    <Tag
      className={headingClass}
      {...props}
    >
      {children}
    </Tag>
  );
};
