import { recipe } from '@vanilla-extract/recipes';
import { style, styleVariants } from '@vanilla-extract/css';

/**
 * TextArea wrapper
 */
export const textAreaWrapper = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-xs)',
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
    padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-normal)',
  }],
  sm: [sizeBase, {
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-sm)',
    lineHeight: 'var(--bk-line-height-normal)',
  }],
  md: [sizeBase, {
    padding: 'var(--bk-spacing-1-5) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-normal)',
  }],
  lg: [sizeBase, {
    padding: 'var(--bk-spacing-2) var(--bk-spacing-2-5)',
    fontSize: 'var(--bk-font-size-base)',
    lineHeight: 'var(--bk-line-height-relaxed)',
  }],
  xl: [sizeBase, {
    padding: 'var(--bk-spacing-2-5) var(--bk-spacing-3)',
    fontSize: 'var(--bk-font-size-lg)',
    lineHeight: 'var(--bk-line-height-relaxed)',
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
    backgroundColor: 'var(--bk-color-input-background)',
    color: 'var(--bk-color-input-foreground)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'inherit',
    transition: 'var(--bk-transition-colors)',
    width: '100%',
    minHeight: 'calc(var(--bk-spacing-20) * 1)', // 80px equivalent (matches Label.css.ts textarea minHeight)

    selectors: {
      '&:focus': {
        borderColor: 'var(--bk-color-input-focus-border)',
        outline: 'none',
      },
      '&::placeholder': {
        color: 'var(--bk-color-input-placeholder)',
      },
      '&:disabled': {
        opacity: 'var(--bk-opacity-disabled)',
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
        borderColor: 'var(--bk-color-input-error)',
        selectors: {
          '&:focus': {
            borderColor: 'var(--bk-color-input-error)',
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
  fontSize: 'var(--bk-font-size-xs)',
  color: 'var(--bk-color-danger)',
  marginTop: 'var(--bk-spacing-1)',
});
