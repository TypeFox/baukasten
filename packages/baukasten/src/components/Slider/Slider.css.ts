import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Slider wrapper
 */
export const sliderWrapper = recipe({
    base: {
        display: 'inline-flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: '200px',
    },

    variants: {
        size: {
            xs: {
                gap: 'var(--gap-xs)',
            },
            sm: {
                gap: 'var(--gap-sm)',
            },
            md: {
                gap: 'var(--gap-sm)',
            },
            lg: {
                gap: 'var(--gap-md)',
            },
            xl: {
                gap: 'var(--gap-md)',
            },
        },
        fullWidth: {
            true: {
                width: '100%',
            },
            false: {},
        },
    },

    defaultVariants: {
        size: 'md',
        fullWidth: false,
    },
});

/**
 * Label container
 */
export const sliderLabels = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-foreground)',
    gap: 'var(--gap-sm)',
});

/**
 * Min/Max labels
 */
export const sliderMinMax = style({
    color: 'var(--color-descriptionForeground)',
    fontWeight: 'var(--font-weight-normal)',
});

/**
 * Value label with optional centering
 */
export const sliderValue = recipe({
    base: {
        fontWeight: 'var(--font-weight-medium)',
    },

    variants: {
        centered: {
            true: {
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            false: {},
        },
    },

    defaultVariants: {
        centered: false,
    },
});

/**
 * Slider track container
 */
export const sliderTrack = recipe({
    base: {
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--color-input-background)',
        overflow: 'visible',
    },

    variants: {
        size: {
            xs: {
                height: 'var(--spacing-1)',
                marginBottom: 'var(--spacing-8)',
            },
            sm: {
                height: 'var(--spacing-1-5)',
                marginBottom: 'var(--spacing-8)',
            },
            md: {
                height: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-10)',
            },
            lg: {
                height: 'var(--spacing-2-5)',
                marginBottom: 'var(--spacing-10)',
            },
            xl: {
                height: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-12)',
            },
        },
        hasMarks: {
            true: {
                borderRadius: 'var(--radius-sm)',
            },
            false: {
                borderRadius: 'var(--radius-full)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
        hasMarks: false,
    },
});

/**
 * Slider fill (progress)
 */
export const sliderFill = recipe({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'var(--color-primary)',
        pointerEvents: 'none',
        transition: 'width 0.1s ease-out',
    },

    variants: {
        size: {
            xs: {
                height: 'var(--spacing-1)',
            },
            sm: {
                height: 'var(--spacing-1-5)',
            },
            md: {
                height: 'var(--spacing-2)',
            },
            lg: {
                height: 'var(--spacing-2-5)',
            },
            xl: {
                height: 'var(--spacing-3)',
            },
        },
        hasMarks: {
            true: {
                borderRadius: 'var(--radius-sm)',
            },
            false: {
                borderRadius: 'var(--radius-full)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
        hasMarks: false,
    },
});

/**
 * Slider thumb
 */
export const sliderThumb = recipe({
    base: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--color-primary-foreground)',
        border: 'var(--border-width-2) solid var(--color-primary)',
        borderRadius: 'var(--radius-full)',
        pointerEvents: 'none',
        transition: 'left 0.1s ease-out, box-shadow 0.15s ease',
        boxShadow: 'var(--shadow-base)',
        zIndex: 2,
    },

    variants: {
        size: {
            xs: {
                width: 'var(--spacing-3)',
                height: 'var(--spacing-3)',
            },
            sm: {
                width: 'var(--spacing-3-5)',
                height: 'var(--spacing-3-5)',
            },
            md: {
                width: 'var(--spacing-4)',
                height: 'var(--spacing-4)',
            },
            lg: {
                width: 'var(--spacing-5)',
                height: 'var(--spacing-5)',
            },
            xl: {
                width: 'var(--spacing-6)',
                height: 'var(--spacing-6)',
            },
        },
        disabled: {
            true: {
                opacity: 'var(--opacity-disabled)',
                cursor: 'not-allowed',
            },
            false: {},
        },
    },

    defaultVariants: {
        size: 'md',
        disabled: false,
    },
});

/**
 * Hidden native slider input (handles interaction)
 */
export const slider = recipe({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        margin: 0,
        zIndex: 3,

        selectors: {
            '&:disabled': {
                cursor: 'not-allowed',
            },
        },
    },

    variants: {
        size: {
            xs: {},
            sm: {},
            md: {},
            lg: {},
            xl: {},
        },
    },

    defaultVariants: {
        size: 'md',
    },
});

/**
 * Focus visible state for slider thumb
 */
globalStyle(`${slider.classNames.base}:focus-visible + div`, {
    boxShadow: '0 0 0 2px var(--color-focus)',
});

/**
 * Marks container
 */
export const sliderMarks = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
});

/**
 * Individual mark (tick)
 */
export const sliderMark = recipe({
    base: {
        position: 'absolute',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
    },

    variants: {
        size: {
            xs: {
                width: 'var(--border-width-1)',
                height: 'var(--spacing-2)',
            },
            sm: {
                width: 'var(--border-width-1)',
                height: 'var(--spacing-2-5)',
            },
            md: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-3)',
            },
            lg: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-3-5)',
            },
            xl: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-4)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});

/**
 * Mark tick (visual indicator)
 */
export const sliderMarkTick = recipe({
    base: {
        borderRadius: 'var(--radius-full)',
    },

    variants: {
        size: {
            xs: {
                width: 'var(--border-width-1)',
                height: 'var(--spacing-2)',
            },
            sm: {
                width: 'var(--border-width-1)',
                height: 'var(--spacing-2-5)',
            },
            md: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-3)',
            },
            lg: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-3-5)',
            },
            xl: {
                width: 'var(--border-width-2)',
                height: 'var(--spacing-4)',
            },
        },
        active: {
            true: {
                backgroundColor: 'var(--color-primary)',
                opacity: 'var(--opacity-100)',
            },
            false: {
                backgroundColor: 'var(--color-input-background)',
                opacity: 'var(--opacity-100)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
        active: false,
    },
});

/**
 * Mark label
 */
export const sliderMarkLabel = recipe({
    base: {
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-descriptionForeground)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
    },

    variants: {
        size: {
            xs: {
                marginTop: 'var(--spacing-1-5)',
            },
            sm: {
                marginTop: 'var(--spacing-2)',
            },
            md: {
                marginTop: 'var(--spacing-2)',
            },
            lg: {
                marginTop: 'var(--spacing-2-5)',
            },
            xl: {
                marginTop: 'var(--spacing-3)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});
