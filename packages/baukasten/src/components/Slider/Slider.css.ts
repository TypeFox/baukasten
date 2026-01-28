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
                gap: 'var(--bk-gap-xs)',
            },
            sm: {
                gap: 'var(--bk-gap-sm)',
            },
            md: {
                gap: 'var(--bk-gap-sm)',
            },
            lg: {
                gap: 'var(--bk-gap-md)',
            },
            xl: {
                gap: 'var(--bk-gap-md)',
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
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground)',
    gap: 'var(--bk-gap-sm)',
});

/**
 * Min/Max labels
 */
export const sliderMinMax = style({
    color: 'var(--bk-color-descriptionForeground)',
    fontWeight: 'var(--bk-font-weight-normal)',
});

/**
 * Value label with optional centering
 */
export const sliderValue = recipe({
    base: {
        fontWeight: 'var(--bk-font-weight-medium)',
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
        backgroundColor: 'var(--bk-color-input-background)',
        overflow: 'visible',
    },

    variants: {
        size: {
            xs: {
                height: 'var(--bk-spacing-1)',
                marginBottom: 'var(--bk-spacing-8)',
            },
            sm: {
                height: 'var(--bk-spacing-1-5)',
                marginBottom: 'var(--bk-spacing-8)',
            },
            md: {
                height: 'var(--bk-spacing-2)',
                marginBottom: 'var(--bk-spacing-10)',
            },
            lg: {
                height: 'var(--bk-spacing-2-5)',
                marginBottom: 'var(--bk-spacing-10)',
            },
            xl: {
                height: 'var(--bk-spacing-3)',
                marginBottom: 'var(--bk-spacing-12)',
            },
        },
        hasMarks: {
            true: {
                borderRadius: 'var(--bk-radius-sm)',
            },
            false: {
                borderRadius: 'var(--bk-radius-full)',
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
        backgroundColor: 'var(--bk-color-primary)',
        pointerEvents: 'none',
        transition: 'width 0.1s ease-out',
    },

    variants: {
        size: {
            xs: {
                height: 'var(--bk-spacing-1)',
            },
            sm: {
                height: 'var(--bk-spacing-1-5)',
            },
            md: {
                height: 'var(--bk-spacing-2)',
            },
            lg: {
                height: 'var(--bk-spacing-2-5)',
            },
            xl: {
                height: 'var(--bk-spacing-3)',
            },
        },
        hasMarks: {
            true: {
                borderRadius: 'var(--bk-radius-sm)',
            },
            false: {
                borderRadius: 'var(--bk-radius-full)',
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
        backgroundColor: 'var(--bk-color-primary-foreground)',
        border: 'var(--bk-border-width-2) solid var(--bk-color-primary)',
        borderRadius: 'var(--bk-radius-full)',
        pointerEvents: 'none',
        transition: 'left 0.1s ease-out, box-shadow 0.15s ease',
        boxShadow: 'var(--bk-shadow-base)',
        zIndex: 2,
    },

    variants: {
        size: {
            xs: {
                width: 'var(--bk-spacing-3)',
                height: 'var(--bk-spacing-3)',
            },
            sm: {
                width: 'var(--bk-spacing-3-5)',
                height: 'var(--bk-spacing-3-5)',
            },
            md: {
                width: 'var(--bk-spacing-4)',
                height: 'var(--bk-spacing-4)',
            },
            lg: {
                width: 'var(--bk-spacing-5)',
                height: 'var(--bk-spacing-5)',
            },
            xl: {
                width: 'var(--bk-spacing-6)',
                height: 'var(--bk-spacing-6)',
            },
        },
        disabled: {
            true: {
                opacity: 'var(--bk-opacity-disabled)',
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
    boxShadow: '0 0 0 2px var(--bk-color-focus)',
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
                width: 'var(--bk-border-width-1)',
                height: 'var(--bk-spacing-2)',
            },
            sm: {
                width: 'var(--bk-border-width-1)',
                height: 'var(--bk-spacing-2-5)',
            },
            md: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-3)',
            },
            lg: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-3-5)',
            },
            xl: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-4)',
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
        borderRadius: 'var(--bk-radius-full)',
    },

    variants: {
        size: {
            xs: {
                width: 'var(--bk-border-width-1)',
                height: 'var(--bk-spacing-2)',
            },
            sm: {
                width: 'var(--bk-border-width-1)',
                height: 'var(--bk-spacing-2-5)',
            },
            md: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-3)',
            },
            lg: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-3-5)',
            },
            xl: {
                width: 'var(--bk-border-width-2)',
                height: 'var(--bk-spacing-4)',
            },
        },
        active: {
            true: {
                backgroundColor: 'var(--bk-color-primary)',
                opacity: 'var(--bk-opacity-100)',
            },
            false: {
                backgroundColor: 'var(--bk-color-input-background)',
                opacity: 'var(--bk-opacity-100)',
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
        fontSize: 'var(--bk-font-size-xs)',
        color: 'var(--bk-color-descriptionForeground)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
    },

    variants: {
        size: {
            xs: {
                marginTop: 'var(--bk-spacing-1-5)',
            },
            sm: {
                marginTop: 'var(--bk-spacing-2)',
            },
            md: {
                marginTop: 'var(--bk-spacing-2)',
            },
            lg: {
                marginTop: 'var(--bk-spacing-2-5)',
            },
            xl: {
                marginTop: 'var(--bk-spacing-3)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});
