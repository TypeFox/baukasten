import React from 'react';
import { text } from './Text.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { type FontSize, type FontWeight } from '../../styles';

/**
 * Extract variant types from recipe
 */
export type TextVariants = RecipeVariants<typeof text>;

/**
 * Text component props
 * Extends all standard HTML span attributes
 */
export interface TextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /**
     * Visual size of the text
     * @default 'md'
     */
    size?: FontSize;

    /**
     * Font weight
     * @default 'normal'
     */
    weight?: FontWeight;

    /**
     * Text color variant
     * @default 'default'
     */
    color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * Whether to render as block element (div) instead of inline (span)
     * @default false
     */
    block?: boolean;

    /**
     * Text alignment (only applies when block=true)
     * @default 'left'
     */
    align?: 'left' | 'center' | 'right' | 'justify';

    /**
     * Whether to truncate text with ellipsis
     * @default false
     */
    truncate?: boolean;

    /**
     * Whether to make text italic
     * @default false
     */
    italic?: boolean;

    /**
     * Whether to make text monospace
     * @default false
     */
    monospace?: boolean;
}

/**
 * Text component
 *
 * A versatile text component for inline or block text with various styling options.
 * Can be rendered as span (inline) or div (block).
 *
 * @example
 * ```tsx
 * // Basic inline text
 * <Text>Regular text</Text>
 *
 * // Bold primary text
 * <Text weight="bold" color="primary">Important text</Text>
 *
 * // Block text with alignment
 * <Text block align="center" size="lg">Centered large text</Text>
 *
 * // Truncated text
 * <Text truncate>Very long text that will be truncated with ellipsis...</Text>
 *
 * // Monospace italic
 * <Text monospace italic>Code-like text</Text>
 *
 * // Muted small text
 * <Text size="sm" color="muted">Helper text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    size = 'md',
    weight = 'normal',
    color = 'default',
    block = false,
    align = 'left',
    truncate = false,
    italic = false,
    monospace = false,
    className,
    children,
    ...props
}) => {
    const Component = block ? 'div' : 'span';

    const textClass = className
        ? `${text({ size, weight, color, align, truncate, italic, monospace })} ${className}`
        : text({ size, weight, color, align, truncate, italic, monospace });

    return (
        <Component
            className={textClass}
            {...props}
        >
            {children}
        </Component>
    );
};
