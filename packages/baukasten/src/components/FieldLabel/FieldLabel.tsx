import React from 'react';
import { fieldLabel, requiredIndicator } from './FieldLabel.css';

/**
 * FieldLabel component props
 */
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label text content
   */
  children: React.ReactNode;

  /**
   * Whether the field is required
   * Shows a red asterisk after the label
   * @default false
   */
  required?: boolean;

  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * FieldLabel component
 *
 * A simple, semantic label for form fields. Displays text above or beside form inputs.
 * Unlike the Label component which wraps inputs with borders/backgrounds,
 * FieldLabel is a traditional text label that doesn't wrap the input.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app:
 *
 * ```tsx
 * import { GlobalStyles } from 'baukasten-ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Basic label
 * <FieldLabel htmlFor="username">Username</FieldLabel>
 * <Input id="username" />
 *
 * // Required field
 * <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
 * <Input id="email" type="email" />
 *
 * // Disabled field
 * <FieldLabel htmlFor="readonly" disabled>Read-only Field</FieldLabel>
 * <Input id="readonly" disabled />
 *
 * // With FormGroup (VSCode style)
 * <FormGroup>
 *   <FieldLabel htmlFor="name" required>Name</FieldLabel>
 *   <Input id="name" />
 * </FormGroup>
 * ```
 */
export const FieldLabel: React.FC<FieldLabelProps> = ({
  children,
  required = false,
  disabled = false,
  ...htmlProps
}) => {
  return (
    <label className={fieldLabel({ disabled })} {...htmlProps}>
      {children}
      {required && <span className={requiredIndicator} aria-label="required">*</span>}
    </label>
  );
};
