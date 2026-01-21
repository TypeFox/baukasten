import { recipe } from '@vanilla-extract/recipes';

export const heading = recipe({
  base: {
    color: 'var(--color-foreground)',
    fontWeight: 'var(--font-weight-bold)',
    letterSpacing: 'var(--letter-spacing-tight)',
    margin: 0,
  },

  variants: {
    level: {
      1: {
        fontSize: 'var(--font-size-3xl)',
        lineHeight: 'var(--line-height-tight)',
      },
      2: {
        fontSize: 'var(--font-size-2xl)',
        lineHeight: 'var(--line-height-tight)',
      },
      3: {
        fontSize: 'var(--font-size-xl)',
        lineHeight: 'var(--line-height-tight)',
      },
      4: {
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-tight)',
      },
      5: {
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-tight)',
      },
      6: {
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-normal)',
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
        marginBottom: 'var(--spacing-4)',
      },
      false: {},
    },

    marginTop: {
      true: {
        marginTop: 'var(--spacing-6)',
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
