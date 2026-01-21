import React from 'react';
import { formHelper } from './FormHelper.css';

/**
 * FormHelper variant types
 */
export type FormHelperVariant = 'default' | 'error' | 'warning' | 'success' | 'info';

/**
 * FormHelper component props
 */
export interface FormHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Helper text content
   */
  children: React.ReactNode;

  /**
   * Visual variant of the helper text
   * @default 'default'
   */
  variant?: FormHelperVariant;
}

/**
 * FormHelper component
 *
 * Displays helper text, hints, or validation messages below form fields.
 * Supports different visual variants for various states (error, warning, success).
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app:
 *
 * ```tsx
 * import { GlobalStyles } from 'baukasten';
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
 * // Default helper text
 * <Input id="username" />
 * <FormHelper>Choose a unique username with 3-20 characters</FormHelper>
 *
 * // Error message
 * <Input id="email" error />
 * <FormHelper variant="error">Please enter a valid email address</FormHelper>
 *
 * // Warning message
 * <Input id="password" />
 * <FormHelper variant="warning">Password strength: weak</FormHelper>
 *
 * // Success message
 * <Input id="username" />
 * <FormHelper variant="success">Username is available!</FormHelper>
 *
 * // Info message
 * <Input id="apiKey" />
 * <FormHelper variant="info">Your API key will be encrypted at rest</FormHelper>
 *
 * // With FormGroup
 * <FormGroup>
 *   <FieldLabel htmlFor="name">Name</FieldLabel>
 *   <div>
 *     <Input id="name" fullWidth />
 *     <FormHelper>Enter your full legal name</FormHelper>
 *   </div>
 * </FormGroup>
 * ```
 */
export const FormHelper: React.FC<FormHelperProps> = ({
  children,
  variant = 'default',
  ...htmlProps
}) => {
  return (
    <div className={formHelper({ variant })} {...htmlProps}>
      {children}
    </div>
  );
};