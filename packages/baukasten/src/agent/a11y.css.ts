import { style } from '@vanilla-extract/css';

/**
 * Present to assistive technology, absent to everyone else.
 *
 * The library had no such utility, and the accessibility sweep found the
 * consequence rather than the cause: status was carried by a coloured glyph
 * with `aria-hidden` on it, so a failed tool call and a completed one had
 * byte-identical accessible names. Every fix for that shape needs somewhere to
 * put the word.
 *
 * The clip-path/1px construction rather than `display: none` or
 * `visibility: hidden`, both of which remove the element from the accessibility
 * tree as well — which is the opposite of the point. `white-space: nowrap`
 * because a zero-width box otherwise wraps the text to one character per line,
 * and some screen readers read that as separate lines.
 */
export const visuallyHidden = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    border: 0,
});
