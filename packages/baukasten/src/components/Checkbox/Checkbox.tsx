import React from 'react';
import { type Size } from '../../styles';
import {
  checkboxWrapper,
  hiddenInput,
  checkboxIndicator,
  checkboxCheckmark,
  switchThumb,
} from './Checkbox.css';

/**
 * Checkbox style variants
 * - `checkbox`: Traditional checkbox (default)
 * - `switch`: Toggle switch style
 */
export type CheckboxVariant = 'checkbox' | 'switch';

/**
 * Checkbox component props
 * Extends all standard HTML input checkbox attributes
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Visual style variant of the checkbox
   * @default 'checkbox'
   */
  variant?: CheckboxVariant;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the checkbox is in an indeterminate state
   * (partially checked, useful for "select all" scenarios)
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * Checkbox component
 *
 * A versatile checkbox component that supports both traditional checkbox
 * and toggle switch styles. Use with the Label component for accessible labels.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // With Label component
 * <Label variant="checkbox" size="md">
 *   <Checkbox name="terms" />
 *   <span>Accept terms and conditions</span>
 * </Label>
 *
 * // Switch variant
 * <Label variant="checkbox" size="md">
 *   <Checkbox variant="switch" name="notifications" />
 *   <span>Enable notifications</span>
 * </Label>
 *
 * // Controlled component
 * const [checked, setChecked] = useState(false);
 * <Label variant="checkbox" size="md">
 *   <Checkbox
 *     checked={checked}
 *     onChange={(e) => setChecked(e.target.checked)}
 *     name="controlled"
 *   />
 *   <span>Controlled checkbox</span>
 * </Label>
 *
 * // Indeterminate state
 * <Label variant="checkbox" size="md">
 *   <Checkbox indeterminate name="select-all" />
 *   <span>Select all</span>
 * </Label>
 *
 * // Without label (standalone)
 * <Checkbox name="standalone" />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  variant = 'checkbox',
  size = 'md',
  indeterminate = false,
  disabled = false,
  className,
  style,
  checked,
  defaultChecked,
  onChange,
  ...props
}, ref) => {
  const internalRef = React.useRef<HTMLInputElement>(null);

  // Track internal checked state for uncontrolled mode
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);

  // Track interaction states
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  // Use controlled checked if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Combine refs - handle both forwarded ref and internal ref
  const inputRef = React.useCallback((node: HTMLInputElement | null) => {
    // Set internal ref
    internalRef.current = node;

    // Handle forwarded ref
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  }, [ref]);

  // Set indeterminate state via ref (can't be done via props in React)
  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Handle change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      // Uncontrolled mode
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  // Handle focus/blur events
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  // Handle hover events
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <label
      className={className ? `${checkboxWrapper({ disabled })} ${className}` : checkboxWrapper({ disabled })}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className={hiddenInput}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <div
        className={checkboxIndicator({
          variant,
          size,
          checked: isChecked || indeterminate,
          focused,
          hovered: hovered && !disabled,
          disabled,
        })}
      >
        {variant === 'checkbox' && (
          <svg className={checkboxCheckmark({ visible: isChecked || indeterminate })} viewBox="0 0 16 16">
            {indeterminate ? (
              <line x1="3" y1="8" x2="13" y2="8" />
            ) : (
              <polyline points="3,8 7,12 13,4" />
            )}
          </svg>
        )}
        {variant === 'switch' && (
          <div className={switchThumb({ size, checked: isChecked })} />
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
