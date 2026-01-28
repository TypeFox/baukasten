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
    height: 'var(--bk-size-md)',
    backgroundColor: 'var(--bk-color-statusbar-background)',
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-statusbar-border)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-statusbar-foreground)',
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
        gap: 'var(--bk-gap-xs)',
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
        gap: 'var(--bk-gap-xs)',
        padding: '0 var(--bk-spacing-2)',
        height: '100%',
        whiteSpace: 'nowrap',
        transition: 'var(--bk-transition-colors)',
        color: 'var(--bk-color-statusbar-foreground)',
    },
    variants: {
        variant: {
            default: {
                color: 'var(--bk-color-statusbar-foreground)',
            },
            error: {
                backgroundColor: 'var(--bk-color-statusbar-item-error)',
                color: 'var(--bk-color-statusbar-foreground)',
            },
            warning: {
                backgroundColor: 'var(--bk-color-statusbar-item-warning)',
                color: 'var(--bk-color-statusbar-foreground)',
            },
            info: {
                color: 'var(--bk-color-info)',
            },
            success: {
                color: 'var(--bk-color-success)',
            },
        },
        clickable: {
            true: {
                cursor: 'pointer',
                selectors: {
                    '&:hover': {
                        backgroundColor: 'var(--bk-color-statusbar-item-hover)',
                    },
                    '&:active': {
                        backgroundColor: 'var(--bk-color-statusbar-item-active)',
                    },
                },
            },
            false: {},
        },
        active: {
            true: {
                backgroundColor: 'var(--bk-color-statusbar-item-active)',
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