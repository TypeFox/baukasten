import React, { useState } from 'react';
import {
    imageWrapper,
    image,
    loadingSkeleton,
    loadingSkeletonRadius,
    errorContainer,
    errorContainerRadius,
    caption as captionStyle,
} from './Image.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';

/**
 * Extract variant types from recipe
 */
export type ImageVariants = RecipeVariants<typeof image>;

/**
 * Image component props
 * Extends all standard HTML img attributes
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Aspect ratio of the image container
     * @default undefined (natural aspect ratio)
     */
    aspectRatio?: '1/1' | '4/3' | '16/9' | '21/9' | '3/2' | string;

    /**
     * How the image should fit within its container
     * @default 'cover'
     */
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

    /**
     * Border radius
     * @default 'none'
     */
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

    /**
     * Whether to add a border
     * @default false
     */
    bordered?: boolean;

    /**
     * Whether to add a shadow
     * @default false
     */
    shadow?: boolean;

    /**
     * Optional caption below the image
     */
    caption?: React.ReactNode;

    /**
     * Position of the caption
     * @default 'bottom'
     */
    captionPosition?: 'bottom' | 'overlay';

    /**
     * Text alignment for caption
     * @default 'center'
     */
    captionAlign?: 'left' | 'center' | 'right';

    /**
     * Whether to show a loading skeleton
     * @default true
     */
    showSkeleton?: boolean;

    /**
     * Content to display while loading
     */
    placeholder?: React.ReactNode;

    /**
     * Content to display on error
     */
    errorContent?: React.ReactNode;

    /**
     * Callback when image loads successfully
     */
    onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;

    /**
     * Callback when image fails to load
     */
    onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Image component
 *
 * A versatile image component with loading states, error handling, captions,
 * and flexible styling options. Extends all standard img attributes.
 *
 * @example
 * ```tsx
 * // Basic image
 * <Image src="/photo.jpg" alt="Description" />
 *
 * // With aspect ratio and caption
 * <Image
 *   src="/photo.jpg"
 *   alt="Beautiful landscape"
 *   aspectRatio="16/9"
 *   caption="A beautiful landscape photo"
 * />
 *
 * // Circular avatar
 * <Image
 *   src="/avatar.jpg"
 *   alt="User avatar"
 *   aspectRatio="1/1"
 *   radius="full"
 *   fit="cover"
 * />
 *
 * // With border and shadow
 * <Image
 *   src="/product.jpg"
 *   alt="Product"
 *   bordered
 *   shadow
 *   radius="lg"
 * />
 *
 * // With overlay caption
 * <Image
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   aspectRatio="21/9"
 *   caption="Hero Section Title"
 *   captionPosition="overlay"
 * />
 *
 * // With custom error handling
 * <Image
 *   src="/missing.jpg"
 *   alt="Image"
 *   errorContent={<div>Custom error message</div>}
 * />
 * ```
 */
export const Image: React.FC<ImageProps> = ({
    aspectRatio,
    fit = 'cover',
    radius = 'none',
    bordered = false,
    shadow = false,
    caption,
    captionPosition = 'bottom',
    captionAlign = 'center',
    showSkeleton = true,
    placeholder,
    errorContent,
    onLoad,
    onError,
    alt = '',
    className,
    style,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(false);
        setHasError(true);
        onError?.(e);
    };

    const wrapperStyle: React.CSSProperties = aspectRatio
        ? {
            aspectRatio,
            ...style,
        }
        : style || {};

    return (
        <figure
            className={imageWrapper({
                hasAspectRatio: !!aspectRatio,
                captionPosition: caption ? captionPosition : 'bottom',
            })}
            style={wrapperStyle}
        >
            {/* Loading skeleton */}
            {isLoading && showSkeleton && !placeholder && (
                <div className={`${loadingSkeleton} ${loadingSkeletonRadius[radius]}`} />
            )}

            {/* Custom placeholder */}
            {isLoading && placeholder && placeholder}

            {/* Error state */}
            {hasError && (
                <div className={`${errorContainer} ${errorContainerRadius[radius]}`}>
                    {errorContent || (
                        <>
                            <span>⚠️</span>
                            <span>Failed to load image</span>
                        </>
                    )}
                </div>
            )}

            {/* Image */}
            <img
                {...props}
                alt={alt}
                className={className
                    ? `${image({ fit, radius, bordered, shadow, isLoading, hasError })} ${className}`
                    : image({ fit, radius, bordered, shadow, isLoading, hasError })}
                onLoad={handleLoad}
                onError={handleError}
            />

            {/* Caption */}
            {caption && (
                <figcaption
                    className={captionStyle({
                        position: captionPosition,
                        align: captionAlign,
                    })}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};
