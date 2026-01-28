import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * FileUpload dropzone area with size and variant variants
 */
export const fileUpload = recipe({
    base: {
        // Layout
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 'var(--bk-radius-lg)',
        cursor: 'pointer',
        userSelect: 'none',

        // Transition
        transition: 'var(--bk-transition-colors), var(--bk-transition-transform)',

        // Focus
        ':focus': {
            outline: '2px solid var(--bk-color-accent)',
            outlineOffset: '2px',
        },
    },

    variants: {
        size: {
            xs: {
                padding: 'var(--bk-spacing-4)',
                minHeight: '80px',
            },
            sm: {
                padding: 'var(--bk-spacing-6)',
                minHeight: '120px',
            },
            md: {
                padding: 'var(--bk-spacing-8)',
                minHeight: '160px',
            },
            lg: {
                padding: 'var(--bk-spacing-10)',
                minHeight: '200px',
            },
            xl: {
                padding: 'var(--bk-spacing-12)',
                minHeight: '240px',
            },
        },

        variant: {
            default: {
                backgroundColor: 'var(--bk-color-background-secondary)',
                border: 'var(--bk-border-width-2) solid var(--bk-color-border)',
            },
            primary: {
                backgroundColor: 'color-mix(in srgb, var(--bk-color-accent) 10%, transparent)',
                border: 'var(--bk-border-width-2) solid var(--bk-color-accent)',
            },
            dashed: {
                backgroundColor: 'var(--bk-color-background-secondary)',
                border: 'var(--bk-border-width-2) dashed var(--bk-color-border)',
            },
        },

        disabled: {
            true: {
                opacity: 0.5,
                cursor: 'not-allowed',
            },
            false: {},
        },

        isDragging: {
            true: {
                backgroundColor: 'color-mix(in srgb, var(--bk-color-accent) 15%, transparent)',
                borderColor: 'var(--bk-color-accent)',
                transform: 'scale(1.02)',
            },
            false: {},
        },
    },

    compoundVariants: [
        {
            variants: { disabled: false },
            style: {
                ':hover': {
                    transform: 'translateY(-2px)',
                },
            },
        },
    ],

    defaultVariants: {
        size: 'md',
        variant: 'dashed',
        disabled: false,
        isDragging: false,
    },
});

/**
 * File list container
 */
export const fileList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-2)',
    marginTop: 'var(--bk-spacing-4)',
});

/**
 * Individual file item
 */
export const fileItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-3)',
    padding: 'var(--bk-spacing-3)',
    backgroundColor: 'var(--bk-color-background-secondary)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    borderRadius: 'var(--bk-radius-md)',
    transition: 'var(--bk-transition-colors)',

    ':hover': {
        backgroundColor: 'var(--bk-color-background-hover)',
    },
});

/**
 * File item remove button
 */
export const fileItemRemove = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--bk-spacing-1)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--bk-radius-sm)',
    color: 'var(--bk-color-foreground-muted)',
    cursor: 'pointer',
    transition: 'var(--bk-transition-colors)',
    flexShrink: 0,

    ':focus': {
        outline: '2px solid var(--bk-color-accent)',
        outlineOffset: '2px',
    },
});

// Hover style for remove button when not disabled
globalStyle(`${fileItemRemove}:hover:not(:disabled)`, {
    backgroundColor: 'var(--bk-color-danger)',
    color: 'var(--bk-color-danger-foreground)',
});

// Disabled state for remove button
globalStyle(`${fileItemRemove}:disabled`, {
    opacity: 0.5,
    cursor: 'not-allowed',
});
