import { recipe } from '@vanilla-extract/recipes';
import { globalStyle } from '@vanilla-extract/css';

/**
 * Avatar component with size and shape variants
 */
export const avatar = recipe({
    base: {
        // Layout
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        userSelect: 'none',

        // Colors
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-accent-foreground)',

        // Typography
        fontWeight: 'var(--font-weight-medium)',
        textAlign: 'center',

        // Transition
        transition: 'var(--transition-colors)',

        // Border
        border: 'var(--border-width-1) solid var(--color-border)',
    },

    variants: {
        size: {
            xs: {
                width: 'var(--spacing-6)',
                height: 'var(--spacing-6)',
                fontSize: 'var(--font-size-xs)',
                lineHeight: 'var(--line-height-tight)',
            },
            sm: {
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-tight)',
            },
            md: {
                width: 'var(--spacing-10)',
                height: 'var(--spacing-10)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-normal)',
            },
            lg: {
                width: 'var(--spacing-12)',
                height: 'var(--spacing-12)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-normal)',
            },
            xl: {
                width: 'var(--spacing-16)',
                height: 'var(--spacing-16)',
                fontSize: 'var(--font-size-xl)',
                lineHeight: 'var(--line-height-normal)',
            },
        },

        shape: {
            circular: {
                borderRadius: 'var(--radius-full)',
            },
            square: {
                borderRadius: 'var(--radius-md)',
            },
        },

        hasImage: {
            true: {},
            false: {},
        },
    },

    defaultVariants: {
        size: 'md',
        shape: 'circular',
        hasImage: false,
    },
});

/**
 * Avatar image styling
 */
globalStyle(`${avatar.classNames.base} .avatar-image`, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

/**
 * Avatar initials styling
 */
globalStyle(`${avatar.classNames.base} .avatar-initials`, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
});
