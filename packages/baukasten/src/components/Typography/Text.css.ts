import { recipe } from '@vanilla-extract/recipes';

export const text = recipe({
  base: {
    margin: 0,
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--font-size-xs)',
        lineHeight: 'var(--line-height-normal)',
      },
      sm: {
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-normal)',
      },
      md: {
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-normal)',
      },
      base: {
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-normal)',
      },
      lg: {
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-normal)',
      },
      xl: {
        fontSize: 'var(--font-size-xl)',
        lineHeight: 'var(--line-height-normal)',
      },
      '2xl': {
        fontSize: 'var(--font-size-2xl)',
        lineHeight: 'var(--line-height-normal)',
      },
      '3xl': {
        fontSize: 'var(--font-size-3xl)',
        lineHeight: 'var(--line-height-normal)',
      },
      '4xl': {
        fontSize: 'var(--font-size-4xl)',
        lineHeight: 'var(--line-height-normal)',
      },
      '5xl': {
        fontSize: 'var(--font-size-5xl)',
        lineHeight: 'var(--line-height-normal)',
      },
    },

    weight: {
      light: {
        fontWeight: 'var(--font-weight-light)',
      },
      normal: {
        fontWeight: 'var(--font-weight-normal)',
      },
      medium: {
        fontWeight: 'var(--font-weight-medium)',
      },
      semibold: {
        fontWeight: 'var(--font-weight-semibold)',
      },
      bold: {
        fontWeight: 'var(--font-weight-bold)',
      },
    },

    color: {
      default: {
        color: 'var(--color-foreground)',
      },
      muted: {
        color: 'var(--color-secondary-foreground)',
      },
      primary: {
        color: 'var(--color-primary)',
      },
      success: {
        color: 'var(--color-success)',
      },
      warning: {
        color: 'var(--color-warning)',
      },
      danger: {
        color: 'var(--color-danger)',
      },
      info: {
        color: 'var(--color-info)',
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
      justify: {
        textAlign: 'justify',
      },
    },

    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      false: {},
    },

    italic: {
      true: {
        fontStyle: 'italic',
      },
      false: {
        fontStyle: 'normal',
      },
    },

    monospace: {
      true: {
        fontFamily: 'var(--font-family-mono)',
      },
      false: {
        fontFamily: 'inherit',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    weight: 'normal',
    color: 'default',
    align: 'left',
    truncate: false,
    italic: false,
    monospace: false,
  },
});
