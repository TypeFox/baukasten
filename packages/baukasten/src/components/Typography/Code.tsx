import React from 'react';
import { code } from './Code.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { type FontSize } from '../../styles';

/**
 * Extract variant types from recipe
 */
export type CodeVariants = RecipeVariants<typeof code>;

/**
 * Code component props
 * Extends all standard HTML code/pre attributes
 */
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Whether to render as a block (pre) or inline (code) element
     * @default false (inline)
     */
    block?: boolean;

    /**
     * Visual size of the code text
     * @default 'sm'
     */
    size?: Extract<FontSize, 'xs' | 'sm' | 'md' | 'base'>;

    /**
     * Whether to allow line wrapping
     * @default false for inline, true for block
     */
    wrap?: boolean;

    /**
     * Maximum height for scrolling (only applies to block code)
     * @default undefined (no max height)
     */
    maxHeight?: string;
}

/**
 * Code component
 *
 * A code component for displaying inline or block code snippets.
 * Inline renders as <code>, block renders as <pre><code>.
 *
 * @example
 * ```tsx
 * // Inline code
 * <Text>Use the <Code>console.log()</Code> function to debug.</Text>
 *
 * // Block code
 * <Code block>
 * {`function hello() {
 *   console.log('Hello, World!');
 * }`}
 * </Code>
 *
 * // Block code with wrapping
 * <Code block wrap>
 *   Very long line of code that will wrap instead of scrolling horizontally
 * </Code>
 *
 * // Block code with max height
 * <Code block maxHeight="200px">
 *   {longCodeSnippet}
 * </Code>
 *
 * // Different sizes
 * <Code size="xs">tiny code</Code>
 * <Code size="md">medium code</Code>
 * ```
 */
export const Code: React.FC<CodeProps> = ({
    block = false,
    size = 'sm',
    wrap,
    maxHeight,
    className,
    style,
    children,
    ...props
}) => {
    const shouldWrap = wrap ?? block;

    const codeClassName = className
        ? `${code({ size, block, wrap: shouldWrap })} ${className}`
        : code({ size, block, wrap: shouldWrap });

    const combinedStyle: React.CSSProperties = maxHeight && block
        ? {
            maxHeight,
            overflowY: 'auto',
            ...style,
        }
        : style || {};

    if (block) {
        return (
            <pre style={{ margin: 0 }}>
                <code
                    className={codeClassName}
                    style={combinedStyle}
                    {...props}
                >
                    {children}
                </code>
            </pre>
        );
    }

    return (
        <code
            className={codeClassName}
            style={combinedStyle}
            {...props}
        >
            {children}
        </code>
    );
};
