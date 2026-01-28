import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Alert container with variant-based styling
 */
export const alert = recipe({
  base: {
    display: 'flex',
    gap: 'var(--bk-gap-md)',
    padding: 'var(--bk-padding-md)',
    borderRadius: 'var(--bk-radius-md)',
    border: 'var(--bk-border-width-1) solid',
    fontSize: 'var(--bk-font-size-sm)',
    lineHeight: 'var(--bk-line-height-normal)',
    color: 'var(--bk-color-foreground)',
  },

  variants: {
    variant: {
      info: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-info) 10%, transparent)',
        borderColor: 'var(--bk-color-info)',
      },
      success: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-success) 10%, transparent)',
        borderColor: 'var(--bk-color-success)',
      },
      warning: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-warning) 10%, transparent)',
        borderColor: 'var(--bk-color-warning)',
      },
      error: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-danger) 10%, transparent)',
        borderColor: 'var(--bk-color-danger)',
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
    paddingTop: 'var(--bk-spacing-0-5)',
  },

  variants: {
    variant: {
      info: {
        color: 'var(--bk-color-info)',
      },
      success: {
        color: 'var(--bk-color-success)',
      },
      warning: {
        color: 'var(--bk-color-warning)',
      },
      error: {
        color: 'var(--bk-color-danger)',
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
  gap: 'var(--bk-gap-xs)',
  minWidth: 0, // Allow content to shrink
});

/**
 * Alert title
 */
export const alertTitle = style({
  fontWeight: 'var(--bk-font-weight-semibold)',
  fontSize: 'var(--bk-font-size-md)',
  lineHeight: 'var(--bk-line-height-tight)',
});

/**
 * Alert description
 */
export const alertDescription = style({
  color: 'var(--bk-color-foreground)',
  lineHeight: 'var(--bk-line-height-relaxed)',
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
  paddingTop: 'var(--bk-spacing-0-5)',
  color: 'var(--bk-color-foreground-muted)',
  transition: 'var(--bk-transition-colors)',

  selectors: {
    '&:hover': {
      color: 'var(--bk-color-foreground)',
    },

    '&:focus-visible': {
      outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
      outlineOffset: 'var(--bk-spacing-0-5)',
      borderRadius: 'var(--bk-radius-sm)',
    },
  },
});
