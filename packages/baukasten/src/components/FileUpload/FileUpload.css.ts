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
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        userSelect: 'none',

        // Transition
        transition: 'var(--transition-colors), var(--transition-transform)',

        // Focus
        ':focus': {
            outline: '2px solid var(--color-accent)',
            outlineOffset: '2px',
        },
    },

    variants: {
        size: {
            xs: {
                padding: 'var(--spacing-4)',
                minHeight: '80px',
            },
            sm: {
                padding: 'var(--spacing-6)',
                minHeight: '120px',
            },
            md: {
                padding: 'var(--spacing-8)',
                minHeight: '160px',
            },
            lg: {
                padding: 'var(--spacing-10)',
                minHeight: '200px',
            },
            xl: {
                padding: 'var(--spacing-12)',
                minHeight: '240px',
            },
        },

        variant: {
            default: {
                backgroundColor: 'var(--color-background-secondary)',
                border: 'var(--border-width-2) solid var(--color-border)',
            },
            primary: {
                backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                border: 'var(--border-width-2) solid var(--color-accent)',
            },
            dashed: {
                backgroundColor: 'var(--color-background-secondary)',
                border: 'var(--border-width-2) dashed var(--color-border)',
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
                backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                borderColor: 'var(--color-accent)',
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
    gap: 'var(--spacing-2)',
    marginTop: 'var(--spacing-4)',
});

/**
 * Individual file item
 */
export const fileItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-3)',
    backgroundColor: 'var(--color-background-secondary)',
    border: 'var(--border-width-1) solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    transition: 'var(--transition-colors)',

    ':hover': {
        backgroundColor: 'var(--color-background-hover)',
    },
});

/**
 * File item remove button
 */
export const fileItemRemove = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-1)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-foreground-muted)',
    cursor: 'pointer',
    transition: 'var(--transition-colors)',
    flexShrink: 0,

    ':focus': {
        outline: '2px solid var(--color-accent)',
        outlineOffset: '2px',
    },
});

// Hover style for remove button when not disabled
globalStyle(`${fileItemRemove}:hover:not(:disabled)`, {
    backgroundColor: 'var(--color-danger)',
    color: 'var(--color-danger-foreground)',
});

// Disabled state for remove button
globalStyle(`${fileItemRemove}:disabled`, {
    opacity: 0.5,
    cursor: 'not-allowed',
});
