import { recipe } from '@vanilla-extract/recipes';
import { globalStyle } from '@vanilla-extract/css';

/**
 * IconButton component — a square icon-only button
 * Width and height match the normal Button's minHeight per size.
 */
export const iconButton = recipe({
    base: {
        // Layout
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        padding: 0,

        // Typography
        fontFamily: 'inherit',
        fontWeight: 'var(--bk-font-weight-normal)',
        textDecoration: 'none',

        // Shape
        borderRadius: 'var(--bk-radius-sm)',

        // Interaction
        border: 'var(--bk-border-width-1) solid transparent',
        cursor: 'pointer',
        transition: 'var(--bk-transition-colors)',
        outline: 'none',

        // States
        selectors: {
            '&:disabled': {
                opacity: 'var(--bk-opacity-disabled)',
                cursor: 'not-allowed',
            },
            '&:focus-visible': {
                outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
                outlineOffset: 'var(--bk-spacing-0-5)',
            },
        },
    },

    variants: {
        variant: {
            primary: {},
            secondary: {},
            ghost: {},
            link: {},
        },

        size: {
            xs: {
                width: 'var(--bk-size-xs)',
                height: 'var(--bk-size-xs)',
                fontSize: 'var(--bk-font-size-xs)',
            },
            sm: {
                width: 'var(--bk-size-sm)',
                height: 'var(--bk-size-sm)',
                fontSize: 'var(--bk-font-size-sm)',
            },
            md: {
                width: 'var(--bk-size-md)',
                height: 'var(--bk-size-md)',
                fontSize: 'var(--bk-font-size-md)',
            },
            lg: {
                width: 'var(--bk-size-lg)',
                height: 'var(--bk-size-lg)',
                fontSize: 'var(--bk-font-size-base)',
            },
            xl: {
                width: 'var(--bk-size-xl)',
                height: 'var(--bk-size-xl)',
                fontSize: 'var(--bk-font-size-lg)',
            },
        },

        outline: {
            true: {},
            false: {},
        },
    },

    compoundVariants: [
        // Filled variants (outline: false)
        {
            variants: { variant: 'primary', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-primary)',
                color: 'var(--bk-color-primary-foreground)',
                borderColor: 'transparent',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-primary-hover)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-primary-active)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'secondary', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-secondary)',
                color: 'var(--bk-color-secondary-foreground)',
                borderColor: 'transparent',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-hover)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-active)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'ghost', outline: false },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-foreground)',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-hover)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-hover)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'link', outline: false },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-link)',
                border: 'none',
                selectors: {
                    '&:hover:not(:disabled)': {
                        color: 'var(--bk-color-link-hover)',
                    },
                    '&:active:not(:disabled)': {
                        color: 'var(--bk-color-link-active)',
                    },
                },
            },
        },

        // Outline variants (outline: true)
        {
            variants: { variant: 'primary', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-primary)',
                borderColor: 'var(--bk-color-primary)',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-primary)',
                        color: 'var(--bk-color-primary-foreground)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-primary)',
                        color: 'var(--bk-color-primary-foreground)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'secondary', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-secondary-foreground)',
                borderColor: 'var(--bk-color-secondary)',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary)',
                        color: 'var(--bk-color-secondary-foreground)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary)',
                        color: 'var(--bk-color-secondary-foreground)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'ghost', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-border)',
                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-hover)',
                    },
                    '&:active:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-secondary-hover)',
                        filter: 'brightness(0.95)',
                    },
                },
            },
        },
        {
            variants: { variant: 'link', outline: true },
            style: {
                // Link variant doesn't have outline style, fallback to regular
                backgroundColor: 'transparent',
                color: 'var(--bk-color-link)',
                border: 'none',
                selectors: {
                    '&:hover:not(:disabled)': {
                        color: 'var(--bk-color-link-hover)',
                    },
                },
            },
        },
    ],

    defaultVariants: {
        variant: 'primary',
        size: 'md',
        outline: false,
    },
});

/**
 * Icon sizing within icon buttons
 */
globalStyle(`${iconButton.classNames.base} svg`, {
    width: '1em',
    height: '1em',
    flexShrink: 0,
});
