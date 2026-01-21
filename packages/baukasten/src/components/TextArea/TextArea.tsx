import React from 'react';
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
   * @default 'vertical'
   */
  resize?: TextAreaResize;

  /**
   * Number of visible text rows
   * @default 4
   */
  rows?: number;
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
 * // With FormGroup
 * <FormGroup>
 *   <FieldLabel htmlFor="description">Description</FieldLabel>
 *   <TextArea id="description" placeholder="Enter description..." />
 *   <FormHelper>Provide a detailed description</FormHelper>
 * </FormGroup>
 * ```
 */
export const TextArea: React.FC<TextAreaProps> = ({
  size = 'md',
  error,
  fullWidth = false,
  resize = 'vertical',
  rows = 4,
  ...props
}) => {
  // Only show error text if error is a string (not just boolean)
  const errorMessage = typeof error === 'string' ? error : undefined;

  return (
    <div className={textAreaWrapper({ fullWidth })}>
      <textarea
        className={styledTextArea({ size, resize, hasError: !!error })}
        rows={rows}
        {...props}
      />
      {errorMessage && <span className={errorText}>{errorMessage}</span>}
    </div>
  );
};
