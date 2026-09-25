import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const diffView = style({
    display: 'flex',
    flexDirection: 'column',
    border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    borderRadius: 'var(--bk-radius-md)',
    overflow: 'hidden',
    minWidth: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const toolbar = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-padding-sm)',
    borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    backgroundColor: 'var(--bk-color-background-secondary)',
    fontFamily: 'var(--bk-font-family-sans)',
    fontSize: 'var(--bk-font-size-sm)',
});

export const path = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    direction: 'rtl',
    textAlign: 'left',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const stat = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    whiteSpace: 'nowrap',
});

export const added = style({ color: 'var(--bk-color-diff-inserted-foreground)' });
export const removed = style({ color: 'var(--bk-color-diff-removed-foreground)' });

export const scroll = style({
    overflow: 'auto',
    maxHeight: '420px',
});

export const hunkHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-spacing-1) var(--bk-padding-sm)',
    backgroundColor: 'var(--bk-color-background-secondary)',
    color: 'var(--bk-color-foreground-muted)',
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const hunkActions = style({
    marginLeft: 'auto',
    display: 'flex',
    gap: 'var(--bk-gap-xs)',
    fontFamily: 'var(--bk-font-family-sans)',
});

export const row = recipe({
    base: {
        display: 'flex',
        alignItems: 'flex-start',
        minWidth: 0,
        lineHeight: 'var(--bk-line-height-normal)',
        whiteSpace: 'pre',
    },

    variants: {
        op: {
            equal: {},
            insert: { backgroundColor: 'var(--bk-color-diff-inserted-background)' },
            delete: { backgroundColor: 'var(--bk-color-diff-removed-background)' },
            /** The empty counterpart in split view. Not a line, just alignment. */
            blank: { backgroundColor: 'var(--bk-color-background-secondary)' },
        },
    },

    defaultVariants: { op: 'equal' },
});

export const gutter = style({
    flexShrink: 0,
    width: '4ch',
    padding: '0 var(--bk-spacing-1)',
    textAlign: 'right',
    color: 'var(--bk-color-diff-gutter)',
    userSelect: 'none',
});

/**
 * The +/- marker.
 *
 * Present as a character rather than only as a background colour, so the diff
 * is still readable to someone who cannot distinguish the two washes — and so
 * it survives being copied out as text.
 */
export const marker = style({
    flexShrink: 0,
    width: '2ch',
    textAlign: 'center',
    userSelect: 'none',
});

export const lineText = style({
    flex: 1,
    minWidth: 0,
    paddingRight: 'var(--bk-spacing-2)',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
});

export const split = style({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    minWidth: 0,
});

export const side = style({
    minWidth: 0,
    borderRight: 'var(--bk-border-width-1) solid var(--bk-color-border)',
});

export const empty = style({
    padding: 'var(--bk-padding-md)',
    color: 'var(--bk-color-foreground-muted)',
    fontFamily: 'var(--bk-font-family-sans)',
    fontSize: 'var(--bk-font-size-sm)',
});
