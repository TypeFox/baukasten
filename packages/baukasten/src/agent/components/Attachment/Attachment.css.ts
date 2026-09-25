import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const attachment = recipe({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--bk-gap-xs)',
        maxWidth: '220px',
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
        borderRadius: 'var(--bk-radius-sm)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        backgroundColor: 'var(--bk-color-background-elevated)',
        fontSize: 'var(--bk-font-size-xs)',
        minWidth: 0,
    },

    variants: {
        /** An image earns a thumbnail; everything else gets a glyph. */
        withPreview: {
            true: { paddingLeft: 'var(--bk-spacing-1)' },
            false: {},
        },
    },

    defaultVariants: { withPreview: false },
});

/**
 * The thumbnail.
 *
 * Fixed square with `object-fit: cover`, so a panorama and a portrait occupy
 * the same space — a row of chips that changes height per image is unusable.
 */
export const preview = style({
    width: 'var(--bk-spacing-5)',
    height: 'var(--bk-spacing-5)',
    flexShrink: 0,
    objectFit: 'cover',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-background-secondary)',
});

export const icon = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const name = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
});

export const size = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
    fontVariantNumeric: 'tabular-nums',
});

export const remove = style({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    padding: 0,
    marginLeft: 'var(--bk-spacing-1)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--bk-color-foreground-muted)',
    borderRadius: 'var(--bk-radius-sm)',

    selectors: {
        '&:hover': { color: 'var(--bk-color-danger)' },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: '1px',
        },
    },
});

export const list = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

/**
 * The drop affordance.
 *
 * Overlaid rather than inserted, so the composer does not change height when a
 * file is dragged over it — a layout jump under the pointer makes the drop
 * target move away from where the user aimed.
 */
export const dropOverlay = style({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--bk-gap-sm)',
    pointerEvents: 'none',
    borderRadius: 'var(--bk-radius-md)',
    border: `var(--bk-border-width-2) dashed var(--bk-color-focus)`,
    backgroundColor: 'color-mix(in srgb, var(--bk-color-focus) 12%, transparent)',
    color: 'var(--bk-color-foreground)',
    fontSize: 'var(--bk-font-size-sm)',
});
