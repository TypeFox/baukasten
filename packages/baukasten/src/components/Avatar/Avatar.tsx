import React from 'react';
import { type Size } from '../../styles';
import { Tooltip } from '../Tooltip';
import { avatar } from './Avatar.css';

/**
 * Avatar shape types
 */
export type AvatarShape = 'circular' | 'square';

/**
 * Avatar component props
 */
export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * Full name of the person (used for initials and tooltip)
     */
    name?: string;

    /**
     * Image URL to display
     * When not provided, initials from name will be shown
     */
    src?: string;

    /**
     * Alt text for the image
     * @default name prop value
     */
    alt?: string;

    /**
     * Size of the avatar
     * @default 'md'
     */
    size?: Size;

    /**
     * Shape of the avatar
     * @default 'circular'
     */
    shape?: AvatarShape;

    /**
     * Tooltip content to display on hover
     * When not provided, name will be used if available
     */
    tooltip?: string;

    /**
     * Whether to show tooltip
     * @default true
     */
    showTooltip?: boolean;
}

/**
 * Extract initials from a name
 * Takes the first letter of the first two words
 */
const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Avatar component
 * 
 * A versatile avatar component that displays user images, initials, or a fallback.
 * Supports circular and square shapes with optional tooltips. When no image is provided,
 * it automatically displays initials from the name.
 * 
 * @example
 * ```tsx
 * // With image
 * <Avatar name="John Doe" src="/path/to/image.jpg" />
 * 
 * // With initials (no image)
 * <Avatar name="John Doe" />
 * 
 * // Square shape
 * <Avatar name="Jane Smith" shape="square" />
 * 
 * // Different sizes
 * <Avatar name="John Doe" size="sm" />
 * <Avatar name="John Doe" size="lg" />
 * 
 * // With custom tooltip
 * <Avatar name="John Doe" tooltip="Project Manager" />
 * 
 * // Without tooltip
 * <Avatar name="John Doe" showTooltip={false} />
 * 
 * // All together
 * <Avatar 
 *   name="John Doe" 
 *   src="/path/to/image.jpg"
 *   size="lg"
 *   shape="square"
 *   tooltip="Senior Developer"
 * />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
    name,
    src,
    alt,
    size = 'md',
    shape = 'circular',
    tooltip,
    showTooltip = true,
    className,
    ...props
}) => {
    const initials = name ? getInitials(name) : '';
    const tooltipContent = tooltip || name;
    const imageAlt = alt || name || 'Avatar';

    const avatarElement = (
        <div
            className={`${avatar({ size, shape, hasImage: !!src })} ${className || ''}`}
            role="img"
            aria-label={imageAlt}
            {...props}
        >
            {src ? (
                <img src={src} alt={imageAlt} className="avatar-image" />
            ) : (
                <span className="avatar-initials">{initials}</span>
            )}
        </div>
    );

    // Wrap with tooltip if enabled and content is available
    if (showTooltip && tooltipContent) {
        return (
            <Tooltip content={tooltipContent} placement="top">
                {avatarElement}
            </Tooltip>
        );
    }

    return avatarElement;
};
