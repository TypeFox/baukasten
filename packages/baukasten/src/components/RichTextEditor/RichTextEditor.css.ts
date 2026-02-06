import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Editor wrapper with fullWidth variant
 */
export const editorWrapper = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-xs)',
    position: 'relative',
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
 * Size variants for the editor
 */
const editorSizes = styleVariants({
  xs: {
    padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-normal)',
  },
  sm: {
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-sm)',
    lineHeight: 'var(--bk-line-height-normal)',
  },
  md: {
    padding: 'var(--bk-spacing-1-5) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-normal)',
  },
  lg: {
    padding: 'var(--bk-spacing-2) var(--bk-spacing-2-5)',
    fontSize: 'var(--bk-font-size-base)',
    lineHeight: 'var(--bk-line-height-relaxed)',
  },
  xl: {
    padding: 'var(--bk-spacing-2-5) var(--bk-spacing-3)',
    fontSize: 'var(--bk-font-size-lg)',
    lineHeight: 'var(--bk-line-height-relaxed)',
  },
});

/**
 * Contenteditable editor div
 */
export const editor = recipe({
  base: {
    backgroundColor: 'var(--bk-color-input-background)',
    color: 'var(--bk-color-input-foreground)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'inherit',
    transition: 'var(--bk-transition-colors)',
    width: '100%',
    minHeight: 'calc(var(--bk-spacing-20) * 1)',
    outline: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    overflowY: 'auto',
    position: 'relative',

    selectors: {
      '&:focus': {
        borderColor: 'var(--bk-color-input-focus-border)',
      },
      '&[data-disabled="true"]': {
        opacity: 'var(--bk-opacity-disabled)',
        cursor: 'not-allowed',
      },
      '&[data-readonly="true"]': {
        cursor: 'default',
      },
    },
  },

  variants: {
    size: editorSizes,
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
    hasError: false,
  },
});

/**
 * Placeholder shown when editor is empty
 */
export const placeholder = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  color: 'var(--bk-color-input-placeholder)',
  userSelect: 'none',
});

/**
 * Mention chip — atomic inline element
 */
export const mentionChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'var(--bk-color-badge-background)',
  color: 'var(--bk-color-badge-foreground)',
  borderRadius: 'var(--bk-radius-sm)',
  padding: '0 var(--bk-spacing-1)',
  fontWeight: 'var(--bk-font-weight-medium)',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  verticalAlign: 'baseline',
  userSelect: 'all',
  cursor: 'default',
  whiteSpace: 'nowrap',
});

/**
 * Floating wrapper for suggestions dropdown
 */
export const floatingWrapper = style({
  zIndex: 'var(--bk-z-index-popover)',
});

/**
 * Suggestions dropdown container
 */
export const suggestionsDropdown = style({
  backgroundColor: 'var(--bk-color-dropdown-list-background)',
  border: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
  borderRadius: 'var(--bk-radius-md)',
  boxShadow: 'var(--bk-shadow-lg)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  maxHeight: 'calc(var(--bk-spacing-20) * 3)',
});

/**
 * Suggestions list container
 */
export const suggestionsContainer = style({
  padding: 'var(--bk-spacing-1) 0',
  overflowY: 'auto',
  flex: '1 1 auto',
});

/**
 * Suggestion item size variants
 */
const suggestionSizes = styleVariants({
  xs: {
    padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-xs)',
    minHeight: 'var(--bk-size-xs)',
  },
  sm: {
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
    fontSize: 'var(--bk-font-size-sm)',
    minHeight: 'var(--bk-size-sm)',
  },
  md: {
    padding: 'var(--bk-spacing-1) var(--bk-spacing-3)',
    fontSize: 'var(--bk-font-size-md)',
    minHeight: 'var(--bk-size-md)',
  },
  lg: {
    padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3-5)',
    fontSize: 'var(--bk-font-size-base)',
    minHeight: 'var(--bk-size-lg)',
  },
  xl: {
    padding: 'var(--bk-spacing-2) var(--bk-spacing-4)',
    fontSize: 'var(--bk-font-size-lg)',
    minHeight: 'var(--bk-size-xl)',
  },
});

/**
 * Suggestion item with highlight and disabled variants
 */
export const suggestionItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    cursor: 'pointer',
    transition: 'var(--bk-transition-colors)',
  },
  variants: {
    size: suggestionSizes,
    isHighlighted: {
      true: {
        backgroundColor: 'var(--bk-color-list-active)',
        color: 'var(--bk-color-list-active-foreground)',
      },
      false: {},
    },
    isDisabled: {
      true: {
        opacity: 'var(--bk-opacity-disabled)',
        cursor: 'not-allowed',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        isHighlighted: true,
        isDisabled: true,
      },
      style: {
        backgroundColor: 'transparent',
        color: 'inherit',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    isHighlighted: false,
    isDisabled: false,
  },
});

/**
 * Suggestion label text
 */
export const suggestionLabel = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/**
 * Empty message when no suggestions match
 */
export const emptyMessage = style({
  padding: 'var(--bk-spacing-4) var(--bk-spacing-3)',
  textAlign: 'center',
  color: 'var(--bk-color-foreground-muted)',
  fontSize: 'var(--bk-font-size-sm)',
});

/**
 * Error text below editor
 */
export const errorText = style({
  fontSize: 'var(--bk-font-size-xs)',
  color: 'var(--bk-color-danger)',
  marginTop: 'var(--bk-spacing-1)',
});

/**
 * Global styles for mention chips inside the editor
 */
globalStyle(`${editor.classNames.base} [data-mention="true"]`, {
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'var(--bk-color-badge-background)',
  color: 'var(--bk-color-badge-foreground)',
  borderRadius: 'var(--bk-radius-sm)',
  padding: '0 var(--bk-spacing-1)',
  fontWeight: 'var(--bk-font-weight-medium)',
  userSelect: 'all',
  cursor: 'default',
  whiteSpace: 'nowrap',
});
