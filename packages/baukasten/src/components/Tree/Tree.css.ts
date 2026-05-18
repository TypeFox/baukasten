import { recipe } from '@vanilla-extract/recipes';

/**
 * Tree container styles
 *
 * The tree container provides the root-level styling and sets up
 * CSS custom properties for edge color that child nodes inherit.
 */
export const treeContainer = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        userSelect: 'none',
        vars: {
            '--bk-tree-edge-color': 'var(--bk-color-border)',
        },
    },

    variants: {
        size: {
            xs: {
                fontSize: 'var(--bk-font-size-xs)',
            },
            sm: {
                fontSize: 'var(--bk-font-size-sm)',
            },
            md: {
                fontSize: 'var(--bk-font-size-md)',
            },
            lg: {
                fontSize: 'var(--bk-font-size-base)',
            },
            xl: {
                fontSize: 'var(--bk-font-size-lg)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});
