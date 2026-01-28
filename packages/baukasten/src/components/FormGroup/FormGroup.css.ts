import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

// Media query breakpoint for responsive layout (tablet/mobile)
const MOBILE_BREAKPOINT = '768px';

/**
 * Form group container
 */
export const formGroup = recipe({
  base: {
    width: '100%',
  },

  variants: {
    orientation: {
      horizontal: {
        display: 'grid',
        gap: 'var(--bk-spacing-4)',
        alignItems: 'start',
      },
      vertical: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-1)',
      },
    },
    compact: {
      true: {
        marginBottom: 'var(--bk-spacing-3)',
      },
      false: {
        marginBottom: 'var(--bk-spacing-4)',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    compact: false,
  },
});

/**
 * Horizontal orientation class for labelWidth support
 */
export const horizontalClass = style({});

/**
 * Label styles in horizontal mode - VSCode style right-aligned
 */
globalStyle(`${formGroup.classNames.base} > label`, {
  '@media': {
    [`(max-width: ${MOBILE_BREAKPOINT})`]: {
      paddingTop: 0,
      marginBottom: 'var(--bk-spacing-1)',
      textAlign: 'left',
    },
  },
});

// Horizontal-specific label styles
globalStyle(`${horizontalClass} > label`, {
  paddingTop: 'var(--bk-spacing-1-5)',
  marginBottom: 0,
  textAlign: 'right',
});

/**
 * Input wrapper inherits full width
 */
globalStyle(`${formGroup.classNames.base} > div`, {
  width: '100%',
});

/**
 * Ensure inputs take full width in horizontal mode
 */
globalStyle(`${horizontalClass} input, ${horizontalClass} select, ${horizontalClass} textarea`, {
  width: '100%',
});

/**
 * Media query for horizontal layout stacking
 */
globalStyle(`${horizontalClass}`, {
  '@media': {
    [`(max-width: ${MOBILE_BREAKPOINT})`]: {
      gridTemplateColumns: '1fr',
      gap: 'var(--bk-spacing-2)',
    },
  },
});
