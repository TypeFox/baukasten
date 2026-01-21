import React, { useCallback, useState, useEffect, useMemo } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { type Size } from '../../styles';
import { slider, sliderTrack, sliderFill, sliderThumb, sliderWrapper, sliderLabels, sliderMinMax, sliderValue, sliderMarks, sliderMark, sliderMarkTick, sliderMarkLabel } from './Slider.css';

/**
 * Slider variant types extracted from recipes
 */
export type SliderVariants = RecipeVariants<typeof sliderWrapper>;

/**
 * Mark configuration for slider ticks
 */
export interface SliderMark {
    /**
     * The value at which to place the mark
     */
    value: number;
    /**
     * Optional label to display below the mark
     */
    label?: string;
}

/**
 * Slider component props
 * Extends standard input[type=range] attributes
 */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
    /**
     * Size of the slider
     * @default 'md'
     */
    size?: Size;

    /**
     * Minimum value
     * @default 0
     */
    min?: number;

    /**
     * Maximum value
     * @default 100
     */
    max?: number;

    /**
     * Step increment
     * @default 1
     */
    step?: number;

    /**
     * Current value
     * @default 50
     */
    value?: number;

    /**
     * Default value for uncontrolled component
     */
    defaultValue?: number;

    /**
     * Callback when value changes (fires during drag)
     */
    onChange?: (value: number) => void;

    /**
     * Callback when value change is committed (fires on mouse up / drag end)
     * Use this for expensive operations to avoid performance issues during drag
     */
    onChangeCommitted?: (value: number) => void;

    /**
     * Whether to show min/max labels
     * @default false
     */
    showMinMax?: boolean;

    /**
     * Whether to show current value label
     * @default false
     */
    showValue?: boolean;

    /**
     * Custom formatter for value label
     */
    formatValue?: (value: number) => string;

    /**
     * Whether the slider should take full width of its container
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Display tick marks on the slider
     * - `true`: Show marks at every step value
     * - `false`: No marks (default)
     * - `number`: Show marks at specified interval (e.g., 10 for marks at 0, 10, 20, ...)
     * - `SliderMark[]`: Custom marks with optional labels
     * @default false
     */
    marks?: boolean | number | SliderMark[];
}

/**
 * Slider component
 * 
 * A range slider component with customizable appearance and value display.
 * Fully integrates with the design system tokens.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Slider />
 *
 * // With value and onChange
 * <Slider value={50} onChange={(val) => console.log(val)} />
 *
 * // With custom range
 * <Slider min={0} max={200} step={10} value={100} />
 *
 * // Show labels
 * <Slider showMinMax showValue />
 *
 * // With tick marks
 * <Slider marks={10} step={5} />  // Marks every 10, snaps every 5
 *
 * // With labeled marks
 * <Slider
 *   marks={[
 *     { value: 0, label: 'Min' },
 *     { value: 50, label: 'Mid' },
 *     { value: 100, label: 'Max' }
 *   ]}
 * />
 *
 * // With custom value formatter
 * <Slider
 *   showValue
 *   formatValue={(v) => `${v}%`}
 * />
 *
 * // Performance optimized (only save on release)
 * <Slider
 *   onChange={updateUI}              // Real-time updates
 *   onChangeCommitted={saveToAPI}    // Only when drag ends
 * />
 *
 * // Full width
 * <Slider fullWidth />
 * ```
 */
export const Slider: React.FC<SliderProps> = ({
    size = 'md',
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue,
    onChange,
    onChangeCommitted,
    showMinMax = false,
    showValue = false,
    formatValue,
    fullWidth = false,
    disabled = false,
    marks = false,
    ...props
}) => {
    // Handle both controlled and uncontrolled modes
    const [internalValue, setInternalValue] = useState(
        controlledValue ?? defaultValue ?? min + (max - min) / 2
    );

    const value = controlledValue ?? internalValue;

    // Update internal value when controlled value changes
    useEffect(() => {
        if (controlledValue !== undefined) {
            setInternalValue(controlledValue);
        }
    }, [controlledValue]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value);

            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }

            onChange?.(newValue);
        },
        [controlledValue, onChange]
    );

    const handleChangeCommitted = useCallback(
        (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const newValue = parseFloat(target.value);
            onChangeCommitted?.(newValue);
        },
        [onChangeCommitted]
    );

    // Calculate percentage for visual fill
    const percentage = ((value - min) / (max - min)) * 100;

    // Format value for display
    const displayValue = formatValue ? formatValue(value) : value.toString();

    // Generate marks array based on marks prop
    const marksArray = useMemo((): SliderMark[] => {
        if (!marks) return [];

        // If marks is an array, use it directly
        if (Array.isArray(marks)) {
            return marks;
        }

        // If marks is true, generate marks at every step
        if (marks === true) {
            const marksList: SliderMark[] = [];
            for (let v = min; v <= max; v += step) {
                marksList.push({ value: v });
            }
            return marksList;
        }

        // If marks is a number, generate marks at that interval
        if (typeof marks === 'number') {
            const marksList: SliderMark[] = [];
            for (let v = min; v <= max; v += marks) {
                marksList.push({ value: v });
            }
            // Always include the max value if not already included
            if (marksList[marksList.length - 1]?.value !== max) {
                marksList.push({ value: max });
            }
            return marksList;
        }

        return [];
    }, [marks, min, max, step]);

    const hasMarks = marksArray.length > 0;

    return (
        <div className={sliderWrapper({ size, fullWidth })}>
            <div className={sliderLabels}>
                {showMinMax && <span className={sliderMinMax}>{min}</span>}
                {showValue && (
                    <span className={sliderValue({ centered: showMinMax })}>
                        {displayValue}
                    </span>
                )}
                {showMinMax && <span className={sliderMinMax}>{max}</span>}
            </div>
            <div className={sliderTrack({ size, hasMarks })}>
                <div className={sliderFill({ size, hasMarks })} style={{ width: `${percentage}%` }} />
                {marksArray.length > 0 && (
                    <div className={sliderMarks}>
                        {marksArray.map((mark, index) => {
                            const markPercentage = ((mark.value - min) / (max - min)) * 100;
                            const isActive = value >= mark.value;
                            return (
                                <div
                                    key={`${mark.value}-${index}`}
                                    className={sliderMark({ size })}
                                    style={{ left: `${markPercentage}%` }}
                                >
                                    <div className={sliderMarkTick({ size, active: isActive })} />
                                    {mark.label && (
                                        <span className={sliderMarkLabel({ size })}>{mark.label}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                <input
                    type="range"
                    className={slider({ size })}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    onMouseUp={handleChangeCommitted}
                    onTouchEnd={handleChangeCommitted}
                    disabled={disabled}
                    {...props}
                />
                <div
                    className={sliderThumb({ size, disabled })}
                    style={{ left: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
