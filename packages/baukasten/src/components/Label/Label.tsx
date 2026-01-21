import React from 'react';
import { labelWrapper, label, errorText, inputErrorClass } from './Label.css';
import { type Size } from '../../styles';

/**
 * Label variants
 * - `input`: For wrapping inputs/selects with borders and backgrounds (horizontal layout)
 * - `textarea`: For wrapping textareas with borders and backgrounds (vertical layout)
 * - `checkbox`: For wrapping checkboxes/radios with simple flex layout
 */
export type LabelVariant = 'input' | 'textarea' | 'checkbox';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Content of the label (can include input, spans, etc.)
   */
  children: React.ReactNode;

  /**
   * Variant of the label
   * @default 'input'
   */
  variant?: LabelVariant;

  /**
   * Size to match the form element inside
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the label should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Error message displayed below the label
   */
  error?: string;
}

/**
 * Label component
 *
 * A versatile label wrapper for form components. Supports three distinct variants:
 *
 * ## Variants
 *
 * ### Input Variant (default)
 * Used for wrapping text inputs and selects. Provides:
 * - Border and background styling that acts as the input container
 * - Support for prefix/suffix text via `<span className="label">`
 * - Support for icons, badges, and other decorative elements
 * - Error state with red border and error message below
 * - Full width option
 *
 * **Usage**: Wrap Input or Select components. The form element styling
 * is removed and inherited from the label wrapper for a cohesive design.
 *
 * ### TextArea Variant
 * Used for wrapping textareas with label text on top. Provides:
 * - Border and background styling that acts as the textarea container
 * - Vertical layout with label elements (icon + text) on top
 * - Support for decorative elements in the header
 * - Error state with red border and error message below
 * - Full width option
 *
 * **Usage**: Wrap TextArea component with `<span className="label">` for header text/icons.
 * The textarea styling is removed and inherited from the label wrapper.
 *
 * ### Checkbox Variant
 * Used for wrapping checkboxes, radio buttons, and switches. Provides:
 * - Simple flex layout with proper alignment
 * - Font sizing that scales with the size prop
 * - Automatic disabled state styling
 * - Cursor changes based on checkbox state
 *
 * **Usage**: Wrap Checkbox component (or native checkbox/radio) and label text in a span.
 *
 * ## Size Matching
 * **Important**: Always match the Label `size` prop with the child component's `size` prop
 * for proper alignment and visual harmony.
 *
 * Extends standard HTML label attributes.
 *
 * @example
 * ```tsx
 * // ============================================
 * // INPUT VARIANT (for text inputs, selects)
 * // ============================================
 *
 * // With prefix text
 * <Label variant="input" size="md">
 *   <span className="label">https://</span>
 *   <Input size="md" type="text" placeholder="URL" />
 * </Label>
 *
 * // With Select component
 * <Label variant="input" size="md">
 *   <span className="label">Language:</span>
 *   <Select size="md" options={[...]} />
 * </Label>
 *
 * // With suffix
 * <Label variant="input" size="lg">
 *   <Input size="lg" type="text" placeholder="domain" />
 *   <span className="label">.com</span>
 * </Label>
 *
 * // With prefix AND suffix
 * <Label variant="input" size="md">
 *   <span className="label">$</span>
 *   <Input size="md" placeholder="0.00" />
 *   <span className="label">USD</span>
 * </Label>
 *
 * // With icon prefix
 * <Label variant="input" size="md">
 *   <span className="label">
 *     <Icon name="search" />
 *   </span>
 *   <Input size="md" placeholder="Search..." />
 * </Label>
 *
 * // With error
 * <Label variant="input" size="md" error="This field is required">
 *   <Input size="md" placeholder="Username" />
 * </Label>
 *
 * // ============================================
 * // TEXTAREA VARIANT (for textareas)
 * // ============================================
 *
 * // With label text on top
 * <Label variant="textarea">
 *   <span className="label">Description</span>
 *   <TextArea placeholder="Enter description..." />
 * </Label>
 *
 * // With icon and text on top
 * <Label variant="textarea">
 *   <span className="label">
 *     <Icon name="note" />
 *     Comments
 *   </span>
 *   <TextArea placeholder="Enter your comments..." rows={6} />
 * </Label>
 *
 * // With badge pinned to the right
 * <Label variant="textarea" fullWidth>
 *   <span className="label">
 *     <Icon name="mail" />
 *     Message
 *     <Badge size="xs" style={{ marginLeft: 'auto' }}>Optional</Badge>
 *   </span>
 *   <TextArea placeholder="Type your message..." />
 * </Label>
 *
 * // With error
 * <Label variant="textarea" error="This field is required" fullWidth>
 *   <span className="label">Feedback</span>
 *   <TextArea placeholder="Your feedback..." rows={8} />
 * </Label>
 *
 * // Full width for form layouts
 * <Label variant="textarea" fullWidth>
 *   <span className="label">Message</span>
 *   <TextArea placeholder="Type your message..." />
 * </Label>
 *
 * // ============================================
 * // CHECKBOX VARIANT (for checkboxes, radios, switches)
 * // ============================================
 *
 * // With checkbox
 * <Label variant="checkbox" size="md">
 *   <Checkbox name="terms" />
 *   <span>Accept terms and conditions</span>
 * </Label>
 *
 * // With switch
 * <Label variant="checkbox" size="md">
 *   <Checkbox variant="switch" name="notifications" />
 *   <span>Enable notifications</span>
 * </Label>
 *
 * // Different sizes (label text auto-scales)
 * <Label variant="checkbox" size="lg">
 *   <Checkbox size="lg" name="agree" />
 *   <span>I agree to the terms</span>
 * </Label>
 *
 * // Multiline label text
 * <Label variant="checkbox" size="md">
 *   <Checkbox name="subscribe" />
 *   <span>
 *     Subscribe to our newsletter for updates, tips, and exclusive offers.
 *     Unsubscribe anytime.
 *   </span>
 * </Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  children,
  variant = 'input',
  size = 'md',
  fullWidth = false,
  error,
  ...htmlProps
}) => {
  const hasError = !!error;
  const baseClassName = label({ variant, size, fullWidth, hasError });
  const labelClass = hasError && (variant === 'input' || variant === 'textarea')
    ? `${baseClassName} ${inputErrorClass}`
    : baseClassName;

  return (
    <div className={labelWrapper({ fullWidth, variant })}>
      <label className={labelClass} {...htmlProps}>
        {children}
      </label>
      {error && <span className={errorText}>{error}</span>}
    </div>
  );
};