import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Label wrapper
 */
export const labelWrapper = recipe({
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
    variant: {
      input: {},
      textarea: {},
      checkbox: {
        display: 'inline',
      },
    },
  },

  defaultVariants: {
    fullWidth: false,
    variant: 'input',
  },
});

/**
 * Label element base
 */
export const label = recipe({
  base: {
    display: 'inline-flex',
    color: 'var(--bk-color-foreground)',
  },

  variants: {
    variant: {
      input: {
        alignItems: 'center',
        backgroundColor: 'var(--bk-color-input-background)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
        borderRadius: 'var(--bk-radius-sm)',
        transition: 'var(--bk-transition-colors)',

        selectors: {
          '&:focus-within': {
            borderColor: 'var(--bk-color-input-focus-border)',
            outline: 'none',
          },
        },
      },
      textarea: {
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: 'var(--bk-color-input-background)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
        borderRadius: 'var(--bk-radius-sm)',
        transition: 'var(--bk-transition-colors)',
        padding: 'var(--bk-spacing-2)',
        gap: 'var(--bk-gap-sm)',

        selectors: {
          '&:focus-within': {
            borderColor: 'var(--bk-color-input-focus-border)',
            outline: 'none',
          },
        },
      },
      checkbox: {
        alignItems: 'flex-start',
        gap: 'var(--bk-gap-sm)',
        userSelect: 'none',
        lineHeight: 'var(--bk-line-height-normal)',
        cursor: 'pointer',
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    fullWidth: {
      true: {},
      false: {},
    },
    hasError: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    // Input variant + size
    { variants: { variant: 'input', size: 'xs' }, style: { padding: '0 var(--bk-spacing-1-5)', gap: 'var(--bk-gap-xs)', fontSize: 'var(--bk-font-size-xs)', minHeight: 'var(--bk-size-xs)' } },
    { variants: { variant: 'input', size: 'sm' }, style: { padding: '0 var(--bk-spacing-2)', gap: 'var(--bk-gap-xs)', fontSize: 'var(--bk-font-size-sm)', minHeight: 'var(--bk-size-sm)' } },
    { variants: { variant: 'input', size: 'md' }, style: { padding: '0 var(--bk-spacing-2)', gap: 'var(--bk-gap-sm)', fontSize: 'var(--bk-font-size-md)', minHeight: 'var(--bk-size-md)' } },
    { variants: { variant: 'input', size: 'lg' }, style: { padding: '0 var(--bk-spacing-2-5)', gap: 'var(--bk-gap-sm)', fontSize: 'var(--bk-font-size-base)', minHeight: 'var(--bk-size-lg)' } },
    { variants: { variant: 'input', size: 'xl' }, style: { padding: '0 var(--bk-spacing-3)', gap: 'var(--bk-gap-md)', fontSize: 'var(--bk-font-size-lg)', minHeight: 'var(--bk-size-xl)' } },
    // Checkbox variant + size
    { variants: { variant: 'checkbox', size: 'xs' }, style: { fontSize: 'var(--bk-font-size-xs)' } },
    { variants: { variant: 'checkbox', size: 'sm' }, style: { fontSize: 'var(--bk-font-size-sm)' } },
    { variants: { variant: 'checkbox', size: 'md' }, style: { fontSize: 'var(--bk-font-size-md)' } },
    { variants: { variant: 'checkbox', size: 'lg' }, style: { fontSize: 'var(--bk-font-size-base)' } },
    { variants: { variant: 'checkbox', size: 'xl' }, style: { fontSize: 'var(--bk-font-size-lg)' } },
    // Input + fullWidth
    { variants: { variant: 'input', fullWidth: true }, style: { width: '100%' } },
    // TextArea + fullWidth
    { variants: { variant: 'textarea', fullWidth: true }, style: { width: '100%' } },
    // Input + hasError
    { variants: { variant: 'input', hasError: true }, style: { borderColor: 'var(--bk-color-input-error)' } },
    // TextArea + hasError
    { variants: { variant: 'textarea', hasError: true }, style: { borderColor: 'var(--bk-color-input-error)' } },
  ],

  defaultVariants: {
    variant: 'input',
    size: 'md',
    fullWidth: false,
    hasError: false,
  },
});

/**
 * Input variant error focus state
 */
const inputErrorClass = style({});
globalStyle(`${inputErrorClass}:focus-within`, {
  borderColor: 'var(--bk-color-input-error)',
});

/**
 * Prefix/suffix span styling for input variant
 */
globalStyle(`${label.classNames.base} .label`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--bk-color-secondary-foreground)',
  borderRadius: 'var(--bk-radius-xs)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontSize: 'inherit',
});

/**
 * Label header area for textarea variant
 */
globalStyle(`${label.classNames.base} .label > *`, {
  flexShrink: 0,
});

/**
 * Form component wrapper inside label
 */
globalStyle(`${label.classNames.base} > div`, {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 'var(--bk-gap-xs)',
});

/**
 * Native form elements inside component wrappers - remove styling
 */
const formElementReset = {
  border: 'none !important',
  background: 'transparent !important',
  padding: '0 !important',
  minHeight: 'auto !important',
  fontSize: 'inherit !important',
  outline: 'none !important',
  borderRadius: '0 !important',
};

globalStyle(`${label.classNames.base} > div > input`, formElementReset);
globalStyle(`${label.classNames.base} > div > select`, formElementReset);
globalStyle(`${label.classNames.base} > div > textarea`, formElementReset);
globalStyle(`${label.classNames.base} > div > input:focus`, formElementReset);
globalStyle(`${label.classNames.base} > div > select:focus`, formElementReset);
globalStyle(`${label.classNames.base} > div > textarea:focus`, formElementReset);

/**
 * Custom Select component's trigger button
 */
globalStyle(`${label.classNames.base} > div > button`, {
  ...formElementReset,
  color: 'inherit !important',
});

globalStyle(`${label.classNames.base} > div > button:hover:not(:disabled)`, formElementReset);
globalStyle(`${label.classNames.base} > div > button:focus`, formElementReset);

// TextArea minimum height for usability
const TEXTAREA_MIN_HEIGHT = 'calc(var(--bk-size-xl) * 2)'; // ~80px, approximately 3-4 rows

/**
 * TextArea specific styles
 */
globalStyle(`${label.classNames.base} > div > textarea`, {
  resize: 'vertical',
  minHeight: TEXTAREA_MIN_HEIGHT,
  fontSize: 'var(--bk-font-size-md) !important',
});

/**
 * Keep error message visible
 */
globalStyle(`${label.classNames.base} > div > span`, {
  marginTop: 0,
});

/**
 * Checkbox variant cursor states
 */
globalStyle(`${label.classNames.base} > span:has(input:disabled)`, {
  cursor: 'not-allowed',
});

globalStyle(`${label.classNames.base}:has(input:disabled)`, {
  cursor: 'not-allowed',
});

globalStyle(`${label.classNames.base}:has(input:disabled) > span:not(:has(input))`, {
  opacity: 'var(--bk-opacity-disabled)',
});

/**
 * Error text
 */
export const errorText = style({
  fontSize: 'var(--bk-font-size-xs)',
  color: 'var(--bk-color-input-error)',
});

/**
 * Export error class for runtime use
 */
export { inputErrorClass };