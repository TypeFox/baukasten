import React, { createContext, useContext } from 'react';
import { radioGroup } from './RadioGroup.css';

/**
 * Orientation of the radio group
 */
export type RadioGroupOrientation = 'vertical' | 'horizontal';

/**
 * RadioGroup component props
 */
export interface RadioGroupProps {
  /**
   * Children (Radio components wrapped in Labels)
   */
  children: React.ReactNode;

  /**
   * Name attribute for all radios in the group
   */
  name: string;

  /**
   * Currently selected value
   */
  value?: string | number;

  /**
   * Default value (for uncontrolled usage)
   */
  defaultValue?: string | number;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number) => void;

  /**
   * Whether all radios in the group are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout orientation of the radio group
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Context for RadioGroup to provide shared props to Radio components
 */
interface RadioGroupContextValue {
  name: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Hook to access RadioGroup context from Radio components
 */
export const useRadioGroup = () => {
  return useContext(RadioGroupContext);
};

/**
 * RadioGroup component
 *
 * A container component that manages a group of radio buttons. Provides shared
 * name and value state to all Radio components within the group via context.
 *
 * This component simplifies radio button management by:
 * - Automatically providing the same `name` to all radios
 * - Managing the selected value
 * - Handling change events in one place
 * - Supporting both controlled and uncontrolled modes
 *
 * @example
 * ```tsx
 * // Controlled RadioGroup
 * const [theme, setTheme] = useState('light');
 * <RadioGroup name="theme" value={theme} onChange={setTheme}>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="light" />
 *     <span>Light theme</span>
 *   </Label>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="dark" />
 *     <span>Dark theme</span>
 *   </Label>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="auto" />
 *     <span>Auto</span>
 *   </Label>
 * </RadioGroup>
 *
 * // Uncontrolled RadioGroup with default value
 * <RadioGroup name="plan" defaultValue="pro">
 *   <Label variant="checkbox" size="md">
 *     <Radio value="free" />
 *     <span>Free Plan</span>
 *   </Label>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="pro" />
 *     <span>Pro Plan</span>
 *   </Label>
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup name="size" value={size} onChange={setSize} orientation="horizontal">
 *   <Label variant="checkbox" size="sm">
 *     <Radio value="small" size="sm" />
 *     <span>Small</span>
 *   </Label>
 *   <Label variant="checkbox" size="sm">
 *     <Radio value="medium" size="sm" />
 *     <span>Medium</span>
 *   </Label>
 *   <Label variant="checkbox" size="sm">
 *     <Radio value="large" size="sm" />
 *     <span>Large</span>
 *   </Label>
 * </RadioGroup>
 *
 * // Disabled group
 * <RadioGroup name="option" value="a" disabled>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="a" />
 *     <span>Option A</span>
 *   </Label>
 *   <Label variant="checkbox" size="md">
 *     <Radio value="b" />
 *     <span>Option B</span>
 *   </Label>
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  orientation = 'vertical',
  className,
  style,
}) => {
  // Support uncontrolled mode
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | number | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue: string | number) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue: RadioGroupContextValue = {
    name,
    value,
    onChange: handleChange,
    disabled,
  };

  // Clone children to inject group props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // If child is a Label, we need to find the Radio inside it
    // and inject the group context props
    return child;
  });

  const groupClassName = className
    ? `${radioGroup({ orientation })} ${className}`
    : radioGroup({ orientation });

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        className={groupClassName}
        style={style}
      >
        {enhancedChildren}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';
