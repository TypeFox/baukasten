import React from 'react';
import { link } from './Link.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { type FontSize } from '../../styles';

/**
 * Extract variant types from recipe
 */
export type LinkVariants = RecipeVariants<typeof link>;

/**
 * Link component props
 * Extends all standard HTML anchor attributes
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Visual size of the link text
     * @default 'md'
     */
    size?: Extract<FontSize, 'xs' | 'sm' | 'md' | 'base' | 'lg'>;

    /**
     * Link variant
     * @default 'default'
     */
    variant?: 'default' | 'muted' | 'primary';

    /**
     * Whether to show underline
     * @default 'hover' (underline only on hover)
     */
    underline?: 'always' | 'hover' | 'never';

    /**
     * Whether the link is external (adds external link indicator)
     * @default false
     */
    external?: boolean;
}

/**
 * Link component
 *
 * A versatile anchor/link component with various styling options.
 * Supports different variants, sizes, and underline behaviors.
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/docs">Documentation</Link>
 *
 * // External link with indicator
 * <Link href="https://example.com" external target="_blank" rel="noopener noreferrer">
 *   External Site
 * </Link>
 *
 * // Muted link with no underline
 * <Link variant="muted" underline="never" href="/about">About</Link>
 *
 * // Primary colored link with always underline
 * <Link variant="primary" underline="always" href="/important">
 *   Important Link
 * </Link>
 *
 * // Large link
 * <Link size="lg" href="/home">Home</Link>
 *
 * // As a button (no href)
 * <Link as="button" onClick={() => console.log('clicked')}>
 *   Click me
 * </Link>
 * ```
 */
export const Link: React.FC<LinkProps> = ({
    size = 'md',
    variant = 'default',
    underline = 'hover',
    external = false,
    className,
    children,
    ...props
}) => {
    // Add external link attributes if external prop is true
    const externalProps = external ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        ...props,
    } : props;

    const linkClass = className
        ? `${link({ size, variant, underline, external })} ${className}`
        : link({ size, variant, underline, external });

    return (
        <a
            className={linkClass}
            {...externalProps}
        >
            {children}
        </a>
    );
};
