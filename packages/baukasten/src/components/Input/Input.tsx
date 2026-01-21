import React from 'react';
import { inputWrapper, input, errorText } from './Input.css';
import { type Size } from '../../styles';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size of the input
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
   * Whether the input should take full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Input component
 * 
 * A text input component with size and error message support.
 * Fully integrates with the design system tokens.
 * 
 * **Note**: For labels and prefix/suffix text, use the `Label` component wrapper.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter text..." />
 * 
 * // With size
 * <Input size="lg" placeholder="Large input" />
 * 
 * // With error message (standalone)
 * <Input error="This field is required" placeholder="Email" />
 *
 * // With error state only (use with FormHelper)
 * <Input error={!!errors.email} placeholder="Email" />
 * {errors.email && <FormHelper variant="error">{errors.email}</FormHelper>}
 * 
 * // Full width
 * <Input fullWidth placeholder="Full width input" />
 * 
 * // Different input types
 * <Input type="email" placeholder="Email" />
 * <Input type="password" placeholder="Password" />
 * <Input type="number" placeholder="Age" />
 * 
 * // With Label wrapper (prefix/suffix)
 * <Label>
 *   <span className="label">https://</span>
 *   <Input type="text" placeholder="URL" />
 * </Label>
 * ```
 */
export const Input: React.FC<InputProps> = ({
  size = 'md',
  error,
  fullWidth = false,
  ...props
}) => {
  // Only show error text if error is a string (not just boolean)
  const errorMessage = typeof error === 'string' ? error : undefined;

  return (
    <div className={inputWrapper({ fullWidth })}>
      <input
        className={input({ size, hasError: !!error })}
        {...props}
      />
      {errorMessage && <span className={errorText}>{errorMessage}</span>}
    </div>
  );
};