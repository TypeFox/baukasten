import { globalStyle, style } from '@vanilla-extract/css';

export const composer = style({
    display: 'flex',
    flexDirection: 'column',
    // The drop affordance is absolutely positioned over the whole composer, so
    // this is the containing block it resolves against. Without it the overlay
    // escapes to the nearest positioned ancestor — in practice the page.
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'var(--bk-color-input-background)',
    transition: 'var(--bk-transition-colors)',
    minWidth: 0,

    selectors: {
        '&:focus-within': {
            borderColor: 'var(--bk-color-input-focus-border)',
        },
    },
});

export const attachments = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-spacing-2) var(--bk-spacing-3) 0',
});

export const surface = style({
    position: 'relative',
    padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
    minHeight: 'calc(var(--bk-font-size-md) * 2.6)',
    maxHeight: '40vh',
    overflowY: 'auto',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    minWidth: 0,
});

/**
 * The placeholder.
 *
 * An empty `contentEditable` has no `:empty` guarantee — browsers leave a `<br>`
 * behind after the content is cleared — so the emptiness is decided in React
 * and reflected onto a data attribute rather than being matched in CSS.
 */
globalStyle(`${surface}[data-empty='true']::before`, {
    content: 'attr(data-placeholder)',
    // Taken out of flow. A `::before` left inline is *content* as far as the
    // editing host is concerned, so the caret has nowhere to sit except after
    // it — empty the editor while focused and the cursor jumps to the end of
    // the placeholder text. Absolute positioning leaves the caret at the box
    // origin where it belongs.
    position: 'absolute',
    top: 'var(--bk-spacing-2)',
    left: 'var(--bk-spacing-3)',
    color: 'var(--bk-color-foreground-muted)',
    pointerEvents: 'none',
});

export const token = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    padding: '0 var(--bk-spacing-1)',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-secondary)',
    color: 'var(--bk-color-secondary-foreground)',
    fontSize: 'var(--bk-font-size-sm)',
    // Uneditable, so the caret cannot land inside it and selection cannot
    // split it. Most of what makes a token atomic comes from this.
    userSelect: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
});

/**
 * A token the next backspace will remove.
 *
 * The first press marks it, the second deletes it — so a pinned reference is
 * never lost to a keystroke that was aimed at the character beside it.
 */
export const tokenArmed = style({
    outline: 'var(--bk-border-width-2) solid var(--bk-color-danger)',
    outlineOffset: '1px',
});

/* ─── Pinned commands with arguments ─────────────────────────────────────── */

/**
 * A command token that is also a small form.
 *
 * `user-select` goes back to `auto` here, unlike {@link token}: the inputs
 * inside are real form controls and a user selecting text within one is doing
 * something ordinary. The atomicity that matters — the caret not landing
 * *between* the parts — still comes from the element being
 * `contentEditable={false}`.
 */
export const commandToken = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    userSelect: 'auto',
});

/** Unfilled required arguments, marked without being alarming about it. */
export const commandTokenIncomplete = style({
    outline: 'var(--bk-border-width-1) dashed var(--bk-color-warning)',
    outlineOffset: '1px',
    borderRadius: 'var(--bk-radius-sm)',
});

export const commandName = style({
    fontWeight: 'var(--bk-font-weight-semibold)',
});

export const commandWarning = style({
    color: 'var(--bk-color-warning)',
});

export const argField = style({
    display: 'inline-flex',
    alignItems: 'center',
});

/**
 * Sized to its content, and styled to read as part of the chip.
 *
 * A boxed input inside a sentence is visually louder than the sentence, and an
 * argument is a word in the prompt rather than a form field that happens to be
 * nearby — so this is an underline, not a box.
 */
export const argInput = style({
    minWidth: '4ch',
    padding: '0 var(--bk-spacing-0-5)',
    border: 'none',
    borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    outline: 'none',

    selectors: {
        '&:focus': {
            borderBottomColor: 'var(--bk-color-focus)',
        },
        '&::placeholder': {
            color: 'var(--bk-color-foreground-muted)',
            fontStyle: 'italic',
        },
    },
});

/**
 * Something the draft is blocked on, between the input and the footer.
 *
 * Separated by a rule rather than nested inside the input, so it reads as a
 * question about the draft rather than part of it — and so the draft above
 * stays plainly editable while it is answered.
 */
export const resolving = style({
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
    minWidth: 0,
});

export const footer = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
    minWidth: 0,
});

/**
 * The footer's flexible slots.
 *
 * `Select`'s own recipe sets `min-width: 200px`, which two-up in a 300px panel
 * overflows the row and pushes the second control's chevron out of view. The
 * demo this replaced had to out-specify the library from application CSS to
 * fix it. Owning the layout here means a consumer never has to.
 */
export const footerSlot = style({
    flex: '1 1 0',
    minWidth: 0,
});

globalStyle(`${footerSlot} > *`, {
    minWidth: 0,
    width: '100%',
});

export const footerActions = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    flexShrink: 0,
    marginLeft: 'auto',
});

// ─── Trigger menu ───────────────────────────────────────────────────────────

export const menu = style({
    zIndex: 'var(--bk-z-index-dropdown)',
    minWidth: '220px',
    maxWidth: '420px',
    maxHeight: '280px',
    overflowY: 'auto',
    padding: 'var(--bk-spacing-1)',
    backgroundColor: 'var(--bk-color-dropdown-background)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
    borderRadius: 'var(--bk-radius-md)',
    boxShadow: 'var(--bk-shadow-lg)',
});

export const menuLabel = style({
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-xs)',
    letterSpacing: 'var(--bk-letter-spacing-wider)',
    textTransform: 'uppercase',
    color: 'var(--bk-color-foreground-muted)',
});

export const menuItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    width: '100%',
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
    borderRadius: 'var(--bk-radius-sm)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-foreground)',
    minWidth: 0,

    selectors: {
        '&[data-active="true"]': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
        },
    },
});

export const menuItemLabel = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
    /*
     * The label is the thing being chosen, so it is the last thing that may be
     * truncated.
     *
     * Both this and the description were shrinkable, and flex distributes
     * shrinkage in proportion to base size — so a long description took almost
     * none of it and a short name took nearly all, leaving `/d…` beside a fully
     * legible sentence explaining what `/d…` does. Refusing to shrink here
     * pushes the ellipsis onto the description, which is the half that can
     * afford it.
     */
    flexShrink: 0,
    /*
     * ...but not past the point of crowding out the description entirely. A
     * genuinely long name still yields rather than pushing it off the row.
     */
    maxWidth: '60%',
});

export const menuItemDescription = style({
    marginLeft: 'auto',
    paddingLeft: 'var(--bk-spacing-3)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-xs)',
    // Takes the truncation the label no longer does.
    flexShrink: 1,
    minWidth: 0,
});

export const menuEmpty = style({
    padding: 'var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-foreground-muted)',
});

export const menuIcon = style({
    flexShrink: 0,
    width: 'var(--bk-font-size-md)',
    height: 'var(--bk-font-size-md)',
    objectFit: 'contain',
});
