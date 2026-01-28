import { recipe } from '@vanilla-extract/recipes';

export const text = recipe({
  base: {
    margin: 0,
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--bk-font-size-xs)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      sm: {
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      md: {
        fontSize: 'var(--bk-font-size-md)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      base: {
        fontSize: 'var(--bk-font-size-base)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      lg: {
        fontSize: 'var(--bk-font-size-lg)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      xl: {
        fontSize: 'var(--bk-font-size-xl)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      '2xl': {
        fontSize: 'var(--bk-font-size-2xl)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      '3xl': {
        fontSize: 'var(--bk-font-size-3xl)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      '4xl': {
        fontSize: 'var(--bk-font-size-4xl)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
      '5xl': {
        fontSize: 'var(--bk-font-size-5xl)',
        lineHeight: 'var(--bk-line-height-normal)',
      },
    },

    weight: {
      light: {
        fontWeight: 'var(--bk-font-weight-light)',
      },
      normal: {
        fontWeight: 'var(--bk-font-weight-normal)',
      },
      medium: {
        fontWeight: 'var(--bk-font-weight-medium)',
      },
      semibold: {
        fontWeight: 'var(--bk-font-weight-semibold)',
      },
      bold: {
        fontWeight: 'var(--bk-font-weight-bold)',
      },
    },

    color: {
      default: {
        color: 'var(--bk-color-foreground)',
      },
      muted: {
        color: 'var(--bk-color-secondary-foreground)',
      },
      primary: {
        color: 'var(--bk-color-primary)',
      },
      success: {
        color: 'var(--bk-color-success)',
      },
      warning: {
        color: 'var(--bk-color-warning)',
      },
      danger: {
        color: 'var(--bk-color-danger)',
      },
      info: {
        color: 'var(--bk-color-info)',
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
        fontFamily: 'var(--bk-font-family-mono)',
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
