import React, { useRef, useCallback, useLayoutEffect, forwardRef } from 'react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { textAreaWrapper, styledTextArea, errorText } from './TextArea.css';

/**
 * Resize behavior for textarea
 */
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Size of the textarea
   * @default 'md'
   */
  size?: Size;

  /**
   * Error state or message
   * - Pass `true` or any truthy value to show error border styling
   * - Pass a string to show error border AND display the error message below
   * - Use with FormHelper for better control over error display
   */
  error?: string | boolean;

  /**
   * Whether the textarea should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Resize behavior for the textarea
   * When minRows or maxRows is set, resize defaults to 'none' for auto-grow behavior
   * @default 'vertical'
   */
  resize?: TextAreaResize;

  /**
   * Number of visible text rows (static height)
   * When minRows/maxRows are not set, this controls the fixed height
   * When minRows/maxRows are set, this is ignored in favor of auto-grow
   * @default 4
   */
  rows?: number;

  /**
   * Minimum number of rows when auto-grow is enabled
   * Setting this enables auto-grow behavior
   */
  minRows?: number;

  /**
   * Maximum number of rows when auto-grow is enabled
   * Setting this enables auto-grow behavior
   */
  maxRows?: number;
}

/**
 * Merge multiple refs into a single callback ref
 */
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Get computed styles for calculating row height
 */
function getRowHeight(textarea: HTMLTextAreaElement): { lineHeight: number; paddingTop: number; paddingBottom: number; borderTop: number; borderBottom: number } {
  const computedStyle = window.getComputedStyle(textarea);
  return {
    lineHeight: parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2,
    paddingTop: parseFloat(computedStyle.paddingTop) || 0,
    paddingBottom: parseFloat(computedStyle.paddingBottom) || 0,
    borderTop: parseFloat(computedStyle.borderTopWidth) || 0,
    borderBottom: parseFloat(computedStyle.borderBottomWidth) || 0,
  };
}

/**
 * TextArea component
 *
 * A multi-line text input component with size, resize, and error message support.
 * Fully integrates with the design system tokens.
 *
 * **Note**: For labels, use the `FieldLabel` or `FormGroup` components.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextArea placeholder="Enter text..." />
 *
 * // With size
 * <TextArea size="lg" placeholder="Large textarea" />
 *
 * // With custom rows
 * <TextArea rows={6} placeholder="Tall textarea" />
 *
 * // With error message (standalone)
 * <TextArea error="This field is required" placeholder="Description" />
 *
 * // With error state only (use with FormHelper)
 * <TextArea error={!!errors.description} placeholder="Description" />
 * {errors.description && <FormHelper variant="error">{errors.description}</FormHelper>}
 *
 * // Full width
 * <TextArea fullWidth placeholder="Full width textarea" />
 *
 * // Resize options
 * <TextArea resize="none" placeholder="No resize" />
 * <TextArea resize="vertical" placeholder="Vertical resize (default)" />
 * <TextArea resize="horizontal" placeholder="Horizontal resize" />
 * <TextArea resize="both" placeholder="Resize both directions" />
 *
 * // Auto-grow with minRows/maxRows
 * <TextArea minRows={2} maxRows={6} placeholder="Auto-growing textarea" />
 * <TextArea minRows={3} placeholder="Grows from 3 rows, no max limit" />
 *
 * // With FormGroup
 * <FormGroup>
 *   <FieldLabel htmlFor="description">Description</FieldLabel>
 *   <TextArea id="description" placeholder="Enter description..." />
 *   <FormHelper>Provide a detailed description</FormHelper>
 * </FormGroup>
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  size = 'md',
  error,
  fullWidth = false,
  resize,
  rows = 4,
  minRows,
  maxRows,
  className,
  onChange,
  value,
  defaultValue,
  ...props
}, forwardedRef) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  // Determine if auto-grow is enabled
  const isAutoGrow = minRows !== undefined || maxRows !== undefined;

  // When auto-grow is enabled, default resize to 'none' unless explicitly set
  const effectiveResize = resize ?? (isAutoGrow ? 'none' : 'vertical');

  // Calculate the effective minRows and maxRows
  const effectiveMinRows = minRows ?? rows;
  const effectiveMaxRows = maxRows;

  // Auto-grow resize function
  const adjustHeight = useCallback(() => {
    const textarea = internalRef.current;
    if (!textarea || !isAutoGrow) return;

    const { lineHeight, paddingTop, paddingBottom, borderTop, borderBottom } = getRowHeight(textarea);
    const verticalPadding = paddingTop + paddingBottom + borderTop + borderBottom;

    // Calculate min and max heights
    const minHeight = lineHeight * effectiveMinRows + verticalPadding;
    const maxHeight = effectiveMaxRows ? lineHeight * effectiveMaxRows + verticalPadding : Infinity;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Calculate the new height based on content
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${newHeight}px`;

    // Set overflow based on whether content exceeds maxHeight
    if (effectiveMaxRows && scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [isAutoGrow, effectiveMinRows, effectiveMaxRows]);

  // Adjust height on mount and when value changes
  useLayoutEffect(() => {
    adjustHeight();
  }, [adjustHeight, value, defaultValue]);

  // Handle onChange to adjust height
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    adjustHeight();
  }, [onChange, adjustHeight]);

  // Only show error text if error is a string (not just boolean)
  const errorMessage = typeof error === 'string' ? error : undefined;

  return (
    <div className={textAreaWrapper({ fullWidth })}>
      <textarea
        ref={mergeRefs(internalRef, forwardedRef)}
        className={clsx(styledTextArea({ size, resize: effectiveResize, hasError: !!error }), className)}
        rows={isAutoGrow ? effectiveMinRows : rows}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
      {errorMessage && <span className={errorText}>{errorMessage}</span>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
