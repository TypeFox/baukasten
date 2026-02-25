import React from 'react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { tag } from './Tag.css';

/**
 * Tag variant types
 */
export type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Tag component props
 * Extends all standard HTML span attributes
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Content to display in the tag
     */
    children: React.ReactNode;

    /**
     * Visual variant of the tag
     * @default 'default'
     */
    variant?: TagVariant;

    /**
     * Size of the tag
     * @default 'md'
     */
    size?: Size;

    /**
     * Whether to render the tag with an outline style
     * @default false
     */
    outline?: boolean;
}

/**
 * Tag component
 *
 * A categorization and labeling component with a rounded-rectangle shape.
 * Visually distinct from Badge (which uses a pill shape for status indication).
 * Use Tag for categorization, filtering, and content labeling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tag>Default</Tag>
 *
 * // With variant
 * <Tag variant="primary">React</Tag>
 * <Tag variant="success">Approved</Tag>
 *
 * // With size
 * <Tag size="sm">Small Tag</Tag>
 * <Tag size="lg">Large Tag</Tag>
 *
 * // Outline style
 * <Tag variant="primary" outline>React</Tag>
 *
 * // With icon (children composition)
 * <Tag variant="success">
 *   <Icon name="check" />
 *   Approved
 * </Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
    children,
    variant = 'default',
    size = 'md',
    outline = false,
    className,
    ...props
}) => {
    return (
        <span
            className={clsx(tag({ variant, size, outline }), className)}
            {...props}
        >
            {children}
        </span>
    );
};
