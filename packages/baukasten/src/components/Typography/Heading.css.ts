import { recipe } from '@vanilla-extract/recipes';

export const heading = recipe({
  base: {
    color: 'var(--bk-color-foreground)',
    fontWeight: 'var(--bk-font-weight-bold)',
    letterSpacing: 'var(--bk-letter-spacing-tight)',
    margin: 0,
  },

  variants: {
    level: {
      1: {
        fontSize: 'var(--bk-font-size-3xl)',
        lineHeight: 'var(--bk-line-height-tight)',
      },
      2: {
        fontSize: 'var(--bk-font-size-2xl)',
        lineHeight: 'var(--bk-line-height-tight)',
      },
      3: {
        fontSize: 'var(--bk-font-size-xl)',
        lineHeight: 'var(--bk-line-height-tight)',
      },
      4: {
        fontSize: 'var(--bk-font-size-lg)',
        lineHeight: 'var(--bk-line-height-tight)',
      },
      5: {
        fontSize: 'var(--bk-font-size-base)',
        lineHeight: 'var(--bk-line-height-tight)',
      },
      6: {
        fontSize: 'var(--bk-font-size-md)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
    },

    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },

    marginBottom: {
      true: {
        marginBottom: 'var(--bk-spacing-4)',
      },
      false: {},
    },

    marginTop: {
      true: {
        marginTop: 'var(--bk-spacing-6)',
      },
      false: {},
    },
  },

  defaultVariants: {
    level: 1,
    align: 'left',
    marginBottom: true,
    marginTop: true,
  },
});
