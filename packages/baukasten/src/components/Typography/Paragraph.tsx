import React from 'react';
import { paragraph } from './Paragraph.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { type FontSize } from '../../styles';

/**
 * Extract variant types from recipe
 */
export type ParagraphVariants = RecipeVariants<typeof paragraph>;

/**
 * Paragraph component props
 * Extends all standard HTML paragraph attributes
 */
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    /**
     * Visual size of the paragraph text
     * @default 'md'
     */
    size?: Extract<FontSize, 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl'>;

    /**
     * Text alignment
     * @default 'left'
     */
    align?: 'left' | 'center' | 'right' | 'justify';

    /**
     * Line height
     * @default 'normal'
     */
    lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';

    /**
     * Whether to add bottom margin
     * @default true
     */
    marginBottom?: boolean;

    /**
     * Maximum number of lines before truncating
     * @default undefined (no limit)
     */
    maxLines?: number;
}

/**
 * Paragraph component
 *
 * A semantic paragraph component with flexible styling options.
 * Supports text alignment, line height control, and line clamping.
 *
 * @example
 * ```tsx
 * // Basic paragraph
 * <Paragraph>
 *   This is a regular paragraph with default styling.
 * </Paragraph>
 *
 * // Large paragraph with relaxed line height
 * <Paragraph size="lg" lineHeight="relaxed">
 *   This paragraph has larger text and more spacing between lines.
 * </Paragraph>
 *
 * // Centered paragraph without bottom margin
 * <Paragraph align="center" marginBottom={false}>
 *   Centered text with no bottom spacing.
 * </Paragraph>
 *
 * // Truncated to 3 lines
 * <Paragraph maxLines={3}>
 *   This is a very long paragraph that will be truncated after three lines
 *   with an ellipsis. The rest of the text will be hidden from view.
 * </Paragraph>
 *
 * // Justified text
 * <Paragraph align="justify">
 *   Justified text distributes space evenly across the line.
 * </Paragraph>
 * ```
 */
export const Paragraph: React.FC<ParagraphProps> = ({
    size = 'md',
    align = 'left',
    lineHeight = 'normal',
    marginBottom = true,
    maxLines,
    className,
    style,
    children,
    ...props
}) => {
    // Merge maxLines inline style with className
    const combinedStyle: React.CSSProperties = maxLines
        ? {
            WebkitLineClamp: maxLines,
            ...style,
        }
        : style || {};

    const paragraphClass = className
        ? `${paragraph({ size, align, lineHeight, marginBottom, hasMaxLines: !!maxLines })} ${className}`
        : paragraph({ size, align, lineHeight, marginBottom, hasMaxLines: !!maxLines });

    return (
        <p
            className={paragraphClass}
            style={combinedStyle}
            {...props}
        >
            {children}
        </p>
    );
};
