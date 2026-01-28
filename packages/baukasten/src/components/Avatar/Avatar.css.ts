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
        backgroundColor: 'var(--bk-color-accent)',
        color: 'var(--bk-color-accent-foreground)',

        // Typography
        fontWeight: 'var(--bk-font-weight-medium)',
        textAlign: 'center',

        // Transition
        transition: 'var(--bk-transition-colors)',

        // Border
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    },

    variants: {
        size: {
            xs: {
                width: 'var(--bk-spacing-6)',
                height: 'var(--bk-spacing-6)',
                fontSize: 'var(--bk-font-size-xs)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            sm: {
                width: 'var(--bk-spacing-8)',
                height: 'var(--bk-spacing-8)',
                fontSize: 'var(--bk-font-size-sm)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            md: {
                width: 'var(--bk-spacing-10)',
                height: 'var(--bk-spacing-10)',
                fontSize: 'var(--bk-font-size-base)',
                lineHeight: 'var(--bk-line-height-normal)',
            },
            lg: {
                width: 'var(--bk-spacing-12)',
                height: 'var(--bk-spacing-12)',
                fontSize: 'var(--bk-font-size-lg)',
                lineHeight: 'var(--bk-line-height-normal)',
            },
            xl: {
                width: 'var(--bk-spacing-16)',
                height: 'var(--bk-spacing-16)',
                fontSize: 'var(--bk-font-size-xl)',
                lineHeight: 'var(--bk-line-height-normal)',
            },
        },

        shape: {
            circular: {
                borderRadius: 'var(--bk-radius-full)',
            },
            square: {
                borderRadius: 'var(--bk-radius-md)',
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
