import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Hero container
 */
export const heroContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: 'var(--bk-spacing-8) var(--bk-spacing-6)',
  },

  variants: {
    size: {
      sm: {
        minHeight: '20vh',
      },
      md: {
        minHeight: '40vh',
      },
      lg: {
        minHeight: '60vh',
      },
      xl: {
        minHeight: '80vh',
      },
      full: {
        minHeight: '100vh',
      },
    },
    background: {
      default: {
        backgroundColor: 'var(--bk-color-background)',
      },
      secondary: {
        backgroundColor: 'var(--bk-color-background-secondary)',
      },
      tertiary: {
        backgroundColor: 'var(--bk-color-background-tertiary)',
      },
      elevated: {
        backgroundColor: 'var(--bk-color-background-elevated)',
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
  },

  defaultVariants: {
    size: 'md',
    background: 'default',
    align: 'left',
  },
});

/**
 * Hero title
 */
export const heroTitle = style({
  margin: 0,
  fontSize: 'var(--bk-font-size-hero)',
  fontWeight: 'var(--bk-font-weight-bold)',
  lineHeight: 'var(--bk-line-height-hero)',
  letterSpacing: 'var(--bk-letter-spacing-hero)',
  color: 'var(--bk-color-foreground)',
});

/**
 * Hero description
 */
export const heroDescription = recipe({
  base: {
    marginTop: 'var(--bk-spacing-4)',
    marginBottom: 0,
    fontSize: 'var(--bk-font-size-hero-description)',
    lineHeight: 'var(--bk-line-height-normal)',
    color: 'var(--bk-color-secondary-foreground)',
    maxWidth: '60ch', // Optimal reading length (45-75 characters per line)
  },

  variants: {
    align: {
      left: {
        marginLeft: 0,
        marginRight: 0,
      },
      center: {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      right: {
        marginLeft: 'auto',
        marginRight: 0,
      },
    },
  },

  defaultVariants: {
    align: 'left',
  },
});