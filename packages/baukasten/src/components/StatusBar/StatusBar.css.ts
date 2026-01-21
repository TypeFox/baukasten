import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Main status bar container
 */
export const statusBar = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'var(--size-md)',
    backgroundColor: 'var(--color-statusbar-background)',
    borderTop: 'var(--border-width-1) solid var(--color-statusbar-border)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-statusbar-foreground)',
    userSelect: 'none',
    flexShrink: 0,
});

/**
 * Status bar section with alignment variants
 */
export const statusBarSection = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--gap-xs)',
        height: '100%',
    },
    variants: {
        align: {
            left: {},
            right: {
                marginLeft: 'auto',
            },
        },
    },
    defaultVariants: {
        align: 'left',
    },
});

/**
 * Status bar item with variant, clickable, and active states
 */
export const statusBarItem = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--gap-xs)',
        padding: '0 var(--spacing-2)',
        height: '100%',
        whiteSpace: 'nowrap',
        transition: 'var(--transition-colors)',
        color: 'var(--color-statusbar-foreground)',
    },
    variants: {
        variant: {
            default: {
                color: 'var(--color-statusbar-foreground)',
            },
            error: {
                backgroundColor: 'var(--color-statusbar-item-error)',
                color: 'var(--color-statusbar-foreground)',
            },
            warning: {
                backgroundColor: 'var(--color-statusbar-item-warning)',
                color: 'var(--color-statusbar-foreground)',
            },
            info: {
                color: 'var(--color-info)',
            },
            success: {
                color: 'var(--color-success)',
            },
        },
        clickable: {
            true: {
                cursor: 'pointer',
                selectors: {
                    '&:hover': {
                        backgroundColor: 'var(--color-statusbar-item-hover)',
                    },
                    '&:active': {
                        backgroundColor: 'var(--color-statusbar-item-active)',
                    },
                },
            },
            false: {},
        },
        active: {
            true: {
                backgroundColor: 'var(--color-statusbar-item-active)',
            },
            false: {},
        },
    },
    defaultVariants: {
        variant: 'default',
        clickable: false,
        active: false,
    },
});

/**
 * SVG icon sizing within status bar items
 */
globalStyle(`${statusBarItem.classNames.base} svg`, {
    width: '1em',
    height: '1em',
    flexShrink: 0,
});