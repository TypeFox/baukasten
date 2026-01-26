import React from 'react';
import { formGroup, horizontalClass } from './FormGroup.css';

/**
 * FormGroup layout orientation
 */
export type FormGroupOrientation = 'horizontal' | 'vertical';

/**
 * FormGroup component props
 */
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Form group content (typically FieldLabel and form elements)
   */
  children: React.ReactNode;

  /**
   * Layout orientation
   * - `horizontal`: VSCode-style two-column layout (label left, input right)
   * - `vertical`: Traditional stacked layout (label above input)
   * @default 'horizontal'
   */
  orientation?: FormGroupOrientation;

  /**
   * Whether to use compact spacing
   * @default false
   */
  compact?: boolean;

  /**
   * Custom label width (only applies to horizontal orientation)
   * @default '30%'
   */
  labelWidth?: string;
}

/**
 * FormGroup component
 *
 * A flexible container for form fields that supports VSCode-style two-column layout
 * where labels appear on the left and inputs on the right, creating consistent
 * alignment across multiple form fields.
 *
 * Can also be used in vertical mode for traditional stacked form layouts.
 *
 * **VSCode Pattern**: This component recreates the distinctive layout seen in
 * VSCode's settings pages, with left-aligned labels and right-aligned controls.
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
 * // VSCode-style horizontal layout (default)
 * <FormGroup>
 *   <FieldLabel htmlFor="username" required>Username</FieldLabel>
 *   <div>
 *     <Input id="username" fullWidth />
 *     <FormHelper>Choose a unique username</FormHelper>
 *   </div>
 * </FormGroup>
 *
 * // Multiple aligned form groups
 * <form>
 *   <FormGroup>
 *     <FieldLabel htmlFor="name" required>Name</FieldLabel>
 *     <Input id="name" fullWidth />
 *   </FormGroup>
 *
 *   <FormGroup>
 *     <FieldLabel htmlFor="email" required>Email</FieldLabel>
 *     <div>
 *       <Input id="email" type="email" fullWidth />
 *       <FormHelper variant="error">Invalid email format</FormHelper>
 *     </div>
 *   </FormGroup>
 *
 *   <FormGroup>
 *     <FieldLabel htmlFor="bio">Bio</FieldLabel>
 *     <div>
 *       <textarea id="bio" rows={4} />
 *       <FormHelper>Tell us about yourself (optional)</FormHelper>
 *     </div>
 *   </FormGroup>
 * </form>
 *
 * // Vertical stacked layout
 * <FormGroup orientation="vertical">
 *   <FieldLabel htmlFor="password" required>Password</FieldLabel>
 *   <div>
 *     <Input id="password" type="password" fullWidth />
 *     <FormHelper>At least 8 characters</FormHelper>
 *   </div>
 * </FormGroup>
 *
 * // Compact spacing
 * <FormGroup compact>
 *   <FieldLabel htmlFor="apiKey">API Key</FieldLabel>
 *   <Input id="apiKey" fullWidth />
 * </FormGroup>
 *
 * // Custom label width
 * <FormGroup labelWidth="40%">
 *   <FieldLabel htmlFor="longLabel">Very Long Label Name</FieldLabel>
 *   <Input id="longLabel" fullWidth />
 * </FormGroup>
 * ```
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  orientation = 'horizontal',
  compact = false,
  labelWidth = '30%',
  ...htmlProps
}) => {
  const baseClassName = formGroup({ orientation, compact });
  const className = orientation === 'horizontal'
    ? `${baseClassName} ${horizontalClass}`
    : baseClassName;

  // Use inline style for labelWidth (runtime value)
  const style = orientation === 'horizontal'
    ? { gridTemplateColumns: `${labelWidth} 1fr`, ...htmlProps.style }
    : htmlProps.style;

  return (
    <div
      className={className}
      style={style}
      {...htmlProps}
    >
      {children}
    </div>
  );
};