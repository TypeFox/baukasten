import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Alert container with variant-based styling
 */
export const alert = recipe({
  base: {
    display: 'flex',
    gap: 'var(--gap-md)',
    padding: 'var(--padding-md)',
    borderRadius: 'var(--radius-md)',
    border: 'var(--border-width-1) solid',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    color: 'var(--color-foreground)',
  },

  variants: {
    variant: {
      info: {
        backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
        borderColor: 'var(--color-info)',
      },
      success: {
        backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
        borderColor: 'var(--color-success)',
      },
      warning: {
        backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
        borderColor: 'var(--color-warning)',
      },
      error: {
        backgroundColor: 'color-mix(in srgb, var(--color-danger) 10%, transparent)',
        borderColor: 'var(--color-danger)',
      },
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

/**
 * Alert icon wrapper with variant-based colors
 */
export const alertIcon = recipe({
  base: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 'var(--spacing-0-5)',
  },

  variants: {
    variant: {
      info: {
        color: 'var(--color-info)',
      },
      success: {
        color: 'var(--color-success)',
      },
      warning: {
        color: 'var(--color-warning)',
      },
      error: {
        color: 'var(--color-danger)',
      },
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

/**
 * Alert content container
 */
export const alertContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--gap-xs)',
  minWidth: 0, // Allow content to shrink
});

/**
 * Alert title
 */
export const alertTitle = style({
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-tight)',
});

/**
 * Alert description
 */
export const alertDescription = style({
  color: 'var(--color-foreground)',
  lineHeight: 'var(--line-height-relaxed)',
});

/**
 * Close button
 */
export const alertClose = style({
  flexShrink: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: 'var(--spacing-0-5)',
  color: 'var(--color-foreground-muted)',
  transition: 'var(--transition-colors)',

  selectors: {
    '&:hover': {
      color: 'var(--color-foreground)',
    },

    '&:focus-visible': {
      outline: 'var(--border-width-2) solid var(--color-focus)',
      outlineOffset: 'var(--spacing-0-5)',
      borderRadius: 'var(--radius-sm)',
    },
  },
});
