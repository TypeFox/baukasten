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
    padding: 'var(--spacing-8) var(--spacing-6)',
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
        backgroundColor: 'var(--color-background)',
      },
      secondary: {
        backgroundColor: 'var(--color-background-secondary)',
      },
      tertiary: {
        backgroundColor: 'var(--color-background-tertiary)',
      },
      elevated: {
        backgroundColor: 'var(--color-background-elevated)',
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
  fontSize: 'var(--font-size-hero)',
  fontWeight: 'var(--font-weight-bold)',
  lineHeight: 'var(--line-height-hero)',
  letterSpacing: 'var(--letter-spacing-hero)',
  color: 'var(--color-foreground)',
});

/**
 * Hero description
 */
export const heroDescription = recipe({
  base: {
    marginTop: 'var(--spacing-4)',
    marginBottom: 0,
    fontSize: 'var(--font-size-hero-description)',
    lineHeight: 'var(--line-height-normal)',
    color: 'var(--color-secondary-foreground)',
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