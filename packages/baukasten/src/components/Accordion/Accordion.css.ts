import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Accordion container styles
 *
 * Creates a bordered, rounded container with flex column layout.
 * Uses adjacent sibling selector to add borders between items.
 */
export const accordion = style({
  display: 'flex',
  flexDirection: 'column',
  border: 'var(--border-width-1) solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  overflow: 'hidden',
});

/**
 * Add borders between accordion items
 * Uses globalStyle since we're targeting child elements
 */
globalStyle(`${accordion} > * + *`, {
  borderTop: 'var(--border-width-1) solid var(--color-border)',
});
