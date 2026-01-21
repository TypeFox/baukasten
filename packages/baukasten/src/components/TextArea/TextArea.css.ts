import { recipe } from '@vanilla-extract/recipes';
import { style, styleVariants } from '@vanilla-extract/css';

/**
 * TextArea wrapper
 */
export const textAreaWrapper = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 'var(--gap-xs)',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {},
    },
  },

  defaultVariants: {
    fullWidth: false,
  },
});

/**
 * Size styles for textareas
 */
const sizeBase = style({});

export const textAreaSize = styleVariants({
  xs: [sizeBase, {
    padding: 'var(--spacing-0-5) var(--spacing-1-5)',
    fontSize: 'var(--font-size-xs)',
    lineHeight: 'var(--line-height-normal)',
  }],
  sm: [sizeBase, {
    padding: 'var(--spacing-1) var(--spacing-2)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
  }],
  md: [sizeBase, {
    padding: 'var(--spacing-1-5) var(--spacing-2)',
    fontSize: 'var(--font-size-md)',
    lineHeight: 'var(--line-height-normal)',
  }],
  lg: [sizeBase, {
    padding: 'var(--spacing-2) var(--spacing-2-5)',
    fontSize: 'var(--font-size-base)',
    lineHeight: 'var(--line-height-relaxed)',
  }],
  xl: [sizeBase, {
    padding: 'var(--spacing-2-5) var(--spacing-3)',
    fontSize: 'var(--font-size-lg)',
    lineHeight: 'var(--line-height-relaxed)',
  }],
});

/**
 * Resize styles for textareas
 */
const resizeBase = style({});

export const textAreaResize = styleVariants({
  none: [resizeBase, { resize: 'none' }],
  vertical: [resizeBase, { resize: 'vertical' }],
  horizontal: [resizeBase, { resize: 'horizontal' }],
  both: [resizeBase, { resize: 'both' }],
});

/**
 * StyledTextArea
 */
export const styledTextArea = recipe({
  base: {
    backgroundColor: 'var(--color-input-background)',
    color: 'var(--color-input-foreground)',
    border: 'var(--border-width-1) solid var(--color-input-border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    transition: 'var(--transition-colors)',
    width: '100%',
    minHeight: 'calc(var(--spacing-20) * 1)', // 80px equivalent (matches Label.css.ts textarea minHeight)

    selectors: {
      '&:focus': {
        borderColor: 'var(--color-input-focus-border)',
        outline: 'none',
      },
      '&::placeholder': {
        color: 'var(--color-input-placeholder)',
      },
      '&:disabled': {
        opacity: 'var(--opacity-disabled)',
        cursor: 'not-allowed',
      },
    },
  },

  variants: {
    size: {
      xs: textAreaSize.xs,
      sm: textAreaSize.sm,
      md: textAreaSize.md,
      lg: textAreaSize.lg,
      xl: textAreaSize.xl,
    },
    resize: {
      none: textAreaResize.none,
      vertical: textAreaResize.vertical,
      horizontal: textAreaResize.horizontal,
      both: textAreaResize.both,
    },
    hasError: {
      true: {
        borderColor: 'var(--color-input-error)',
        selectors: {
          '&:focus': {
            borderColor: 'var(--color-input-error)',
          },
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    size: 'md',
    resize: 'vertical',
    hasError: false,
  },
});

/**
 * Error text
 */
export const errorText = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-danger)',
  marginTop: 'var(--spacing-1)',
});
