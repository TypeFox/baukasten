import React from 'react';
import { type Size } from '../../styles';
import { useRadioGroup } from './RadioGroup';
import { radioWrapper, hiddenInput, radioIndicator, radioDot } from './Radio.css';

/**
 * Radio component props
 * Extends all standard HTML input radio attributes
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the radio button
   * @default 'md'
   */
  size?: Size;

  /**
   * Value of the radio button (required for radio groups)
   */
  value: string | number;
}

/**
 * Radio component
 *
 * A radio button component for selecting a single option from a group.
 * Use with the Label component for accessible labels, and RadioGroup for managing state.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // With Label component
 * <Label variant="checkbox" size="md">
 *   <Radio name="theme" value="light" />
 *   <span>Light theme</span>
 * </Label>
 *
 * // In a RadioGroup (recommended)
 * <RadioGroup name="theme" value={theme} onChange={setTheme}>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="light" />
 *     <span>Light theme</span>
 *   </Label>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="dark" />
 *     <span>Dark theme</span>
 *   </Label>
 * </RadioGroup>
 *
 * // Controlled component
 * const [selected, setSelected] = useState('option1');
 * <Label variant="checkbox" size="md">
 *   <Radio
 *     name="options"
 *     value="option1"
 *     checked={selected === 'option1'}
 *     onChange={(e) => setSelected(e.target.value)}
 *   />
 *   <span>Option 1</span>
 * </Label>
 *
 * // Different sizes
 * <Label variant="checkbox" size="lg">
 *   <Radio size="lg" name="size" value="large" />
 *   <span>Large option</span>
 * </Label>
 *
 * // Without label (standalone)
 * <Radio name="standalone" value="value" />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  size = 'md',
  disabled = false,
  className,
  style,
  value,
  name: nameProp,
  checked: checkedProp,
  onChange: onChangeProp,
  ...props
}, ref) => {
  const group = useRadioGroup();

  // Use group context values if available, otherwise use props
  const name = group?.name ?? nameProp;
  const checked = group ? group.value === value : checkedProp;
  const isDisabled = disabled || group?.disabled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Call group's onChange if in a group, otherwise call component's onChange
    if (group?.onChange) {
      group.onChange(value);
    }
    onChangeProp?.(e);
  };

  return (
    <label
      className={className ? `${radioWrapper} ${className}` : radioWrapper}
      style={style}
    >
      <input
        ref={ref}
        className={hiddenInput}
        type="radio"
        disabled={isDisabled}
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <div className={radioIndicator({ size })}>
        <div className={radioDot({ size })} />
      </div>
    </label>
  );
});

Radio.displayName = 'Radio';