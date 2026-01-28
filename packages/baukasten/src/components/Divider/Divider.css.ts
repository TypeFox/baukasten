import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Divider container
 */
export const dividerContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
        width: 'auto',
        height: '100%',
      },
    },

    labelAlign: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    labelAlign: 'center',
  },
});

/**
 * Divider line
 */
export const dividerLine = recipe({
  base: {},

  variants: {
    orientation: {
      horizontal: {
        flex: 1,
        height: 0,
      },
      vertical: {
        flex: 1,
        width: 0,
      },
    },

    variant: {
      solid: {},
      dashed: {},
      dotted: {},
    },

    position: {
      first: {},
      last: {},
      single: {},
    },

    labelAlign: {
      left: {},
      center: {},
      right: {},
    },
  },

  compoundVariants: [
    // First line with label alignment
    {
      variants: { position: 'first', labelAlign: 'left' },
      style: {
        maxWidth: 'var(--bk-spacing-8)',
      },
    },
    {
      variants: { position: 'first', labelAlign: 'right' },
      style: {
        flex: 1,
      },
    },
    // Last line with label alignment
    {
      variants: { position: 'last', labelAlign: 'right' },
      style: {
        maxWidth: 'var(--bk-spacing-8)',
      },
    },
    {
      variants: { position: 'last', labelAlign: 'left' },
      style: {
        flex: 1,
      },
    },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    position: 'single',
    labelAlign: 'center',
  },
});

/**
 * Divider label
 */
export const dividerLabel = style({
  padding: '0 var(--bk-spacing-2)',
  fontSize: 'var(--bk-font-size-sm)',
  color: 'var(--bk-color-foreground-muted)',
  whiteSpace: 'nowrap',
  fontWeight: 'var(--bk-font-weight-medium)',
});
