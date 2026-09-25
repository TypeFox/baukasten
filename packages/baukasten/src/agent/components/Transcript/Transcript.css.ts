import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * The transcript, at one of two densities.
 *
 * Compact is the *primary* case, not a fallback: this library's shape is a
 * docked side panel around 300px, and the full editor tab is the second case.
 * What changes is padding and gaps — nothing is removed, because a narrow panel
 * that hides information is worse than one that is tight.
 */
export const transcript = recipe({
    base: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        minWidth: 0,
        flex: 1,
    },

    variants: {
        density: {
            compact: {
                vars: {
                    '--bk-transcript-padding': 'var(--bk-spacing-2)',
                    '--bk-transcript-gap': 'var(--bk-gap-sm)',
                },
            },
            comfortable: {
                vars: {
                    '--bk-transcript-padding': 'var(--bk-spacing-4)',
                    '--bk-transcript-gap': 'var(--bk-gap-md)',
                },
            },
        },
    },

    defaultVariants: { density: 'comfortable' },
});

/** The scroll area and the ruler beside it. */
export const body = style({
    display: 'flex',
    flex: 1,
    minHeight: 0,
    minWidth: 0,
});

/**
 * An entry a rewind would undo.
 *
 * Dimmed and inert rather than removed. Someone deciding whether to restore has
 * to be able to read what they would be throwing away, and a list that simply
 * got shorter tells them nothing about what was in it.
 */
export const undone = style({
    opacity: 'var(--bk-opacity-50)',
    filter: 'grayscale(1)',
    // The pointer follows the tab order out. `inert` handles the semantics; this
    // stops a hover state suggesting the row is still live.
    pointerEvents: 'none',
});

export const scroll = style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden',

    selectors: {
        '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'var(--bk-color-scrollbar)',
            border: 'var(--bk-border-width-2) solid transparent',
            borderRadius: 'var(--bk-radius-full)',
            backgroundClip: 'content-box',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'var(--bk-color-scrollbar-hover)',
            backgroundClip: 'content-box',
        },
    },
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    // Set by the density variant on the root, with the comfortable values as
    // the fallback so the class is still correct used on its own.
    gap: 'var(--bk-transcript-gap, var(--bk-gap-md))',
    padding: 'var(--bk-transcript-padding, var(--bk-spacing-4))',
});

/**
 * One entry in the flow layout.
 *
 * A wrapper exists at all so that both layouts render the same element type at
 * the same key. They used to differ — a `Fragment` here, a `div` when windowed
 * — and crossing the threshold mid-run therefore unmounted and remounted every
 * row, snapping every expanded tool card shut at once with no user action.
 *
 * `flex-shrink: 0` because without it entries get squashed once the
 * conversation outgrows the panel, which clips any entry whose own container is
 * `overflow: hidden` — an expanded tool body losing its bottom edge for no
 * visible reason. This used to be a `globalStyle` over `content > *`; now that
 * every child is a row it belongs on the row.
 */
export const row = style({
    flexShrink: 0,
    minWidth: 0,
});

/**
 * The windowed layout.
 *
 * Rows are absolutely positioned inside a spacer of the full scroll height, so
 * the `gap` the flow layout uses does not apply — spacing moves onto the rows
 * themselves below.
 */
export const virtualContent = style({
    position: 'relative',
    width: '100%',
    padding: 'var(--bk-transcript-padding, var(--bk-spacing-4))',
    boxSizing: 'border-box',
});

export const virtualRow = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingLeft: 'var(--bk-transcript-padding, var(--bk-spacing-4))',
    paddingRight: 'var(--bk-transcript-padding, var(--bk-spacing-4))',
    paddingBottom: 'var(--bk-transcript-gap, var(--bk-gap-md))',
    boxSizing: 'border-box',
});

/**
 * The affordance offered while the reader has scrolled away.
 *
 * Floating rather than in flow, so appearing and disappearing does not reflow
 * the transcript and shift what the reader is looking at.
 */
export const jumpToLatest = style({
    position: 'absolute',
    bottom: 'var(--bk-spacing-4)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-padding-sm)',
    borderRadius: 'var(--bk-radius-full)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    backgroundColor: 'var(--bk-color-background-elevated)',
    color: 'var(--bk-color-foreground)',
    boxShadow: 'var(--bk-shadow-md)',
    fontSize: 'var(--bk-font-size-sm)',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'var(--bk-transition-colors)',

    selectors: {
        '&:hover': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
        },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: 'var(--bk-spacing-0-5)',
        },
    },
});

export const empty = style({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--bk-spacing-8)',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});
