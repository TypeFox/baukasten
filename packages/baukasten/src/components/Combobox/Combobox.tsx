import React, { useState, useRef, useCallback, useMemo, useId } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    size as floatingSize,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    useTransitionStatus,
    FloatingPortal,
    type Placement,
} from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { IconButton } from '../IconButton';
import { usePortalRoot } from '../../context';
import * as styles from './Combobox.css';

// Floating UI numeric values (required by Floating UI API)
const OFFSET_SPACING = 4; // var(--bk-spacing-1)
const PADDING_SPACING = 8; // var(--bk-spacing-2)
const TRANSITION_DURATION = 150; // var(--bk-transition-fast) = 150ms

// Estimated row heights per size (required numerically by the virtualizer API).
// Mirrors --bk-size-* tokens (20/24/28/32/36px).
const ITEM_HEIGHT: Record<Size, number> = { xs: 20, sm: 24, md: 28, lg: 32, xl: 36 };
const GROUP_HEADING_HEIGHT: Record<Size, number> = { xs: 20, sm: 22, md: 24, lg: 26, xl: 28 };

/**
 * Dropdown position
 * - `auto`: Automatically determine position based on available space
 * - `top`: Always open above the control
 * - `bottom`: Always open below the control
 */
export type ComboboxPosition = 'auto' | 'top' | 'bottom';

/**
 * Combobox option type
 */
export interface ComboboxOption<T = string> {
    /**
     * The value of the option
     */
    value: T;

    /**
     * The label displayed for the option (optional if using renderOption)
     */
    label?: string;

    /**
     * Whether the option is disabled
     * @default false
     */
    disabled?: boolean;
}

/**
 * A labeled group of options
 */
export interface ComboboxOptionGroup<T = string> {
    /**
     * The heading label displayed above the group's options
     */
    label: string;

    /**
     * Options belonging to this group
     */
    options: ComboboxOption<T>[];
}

/**
 * Combobox options - a flat list of options and/or option groups
 */
export type ComboboxOptions<T = string> = (ComboboxOption<T> | ComboboxOptionGroup<T>)[];

/**
 * Base props shared between single-select and multi-select modes
 */
export interface ComboboxBaseProps<T = string> {
    /**
     * Unique identifier for the inline input element
     * Used for label association (htmlFor) in FormGroup
     */
    id?: string;

    /**
     * Array of options (and/or option groups) to display
     */
    options: ComboboxOptions<T>;

    /**
     * Placeholder text when no value is selected
     * @default 'Select...'
     */
    placeholder?: string;

    /**
     * Size of the combobox
     * @default 'md'
     */
    size?: Size;

    /**
     * Dropdown position preference
     * @default 'auto'
     */
    position?: ComboboxPosition;

    /**
     * Whether the combobox is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the combobox should take full width of its container
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Error message displayed below the combobox
     */
    error?: string;

    /**
     * Additional CSS class name for the container
     */
    className?: string;

    /**
     * Additional CSS class name for the dropdown portal
     * Useful for customizing dropdown styles when rendered in a portal
     */
    dropdownClassName?: string;

    /**
     * Maximum height for the options list within the dropdown.
     * Note: the available viewport space (via Floating UI) always caps the
     * dropdown further if there isn't enough room to honor this value.
     * @default '300px'
     */
    maxDropdownHeight?: string;

    /**
     * Callback when dropdown opens
     */
    onOpen?: () => void;

    /**
     * Callback when dropdown closes
     */
    onClose?: () => void;

    /**
     * Custom filter function used while typing
     * @default Case-insensitive match against label
     */
    filterOption?: (option: ComboboxOption<T>, input: string) => boolean;

    /**
     * Whether to show a "clear" button when a value is selected
     * @default false
     */
    clearable?: boolean;

    /**
     * Whether to allow creating a new option from the typed input
     * @default false
     */
    creatable?: boolean;

    /**
     * Callback fired when the user chooses to create a new option
     * (via the create row). Receives the trimmed typed input.
     */
    onCreateOption?: (input: string) => void;

    /**
     * Determines whether the current input is a valid new option
     * @default Non-empty input is valid
     */
    isValidNewOption?: (input: string, current: ComboboxOption<T>[]) => boolean;

    /**
     * Formats the label shown in the create row
     * @default `Create "input"`
     */
    formatCreateLabel?: (input: string) => React.ReactNode;

    /**
     * Whether to virtualize the options list
     * @default undefined (auto-enabled above `virtualizeThreshold`)
     */
    virtualized?: boolean;

    /**
     * Number of visible items above which virtualization is auto-enabled
     * when `virtualized` is not explicitly set
     * @default 100
     */
    virtualizeThreshold?: number;

    /**
     * Custom render function for options in the dropdown
     * Allows full control over option appearance
     */
    renderOption?: (option: ComboboxOption<T>, isSelected: boolean) => React.ReactNode;

    /**
     * Custom render function for group headings
     */
    renderGroupHeading?: (group: ComboboxOptionGroup<T>) => React.ReactNode;

    /**
     * Whether the combobox is in a loading state (shows a spinner indicator
     * and the loading message instead of the options list)
     * @default false
     */
    loading?: boolean;

    /**
     * Message shown while `loading` is true
     * @default 'Loading...'
     */
    loadingMessage?: React.ReactNode;

    /**
     * Message shown when no options match the current input
     * @default 'No options found'
     */
    noOptionsMessage?: React.ReactNode;
}

/**
 * Props for single-select mode (default)
 */
export interface SingleComboboxProps<T = string> {
    /**
     * Whether to enable multiple selection
     * @default false
     */
    multiple?: false;

    /**
     * Currently selected value
     */
    value?: T;

    /**
     * Default value for uncontrolled usage
     */
    defaultValue?: T;

    /**
     * Callback when value changes (receives the selected value, or
     * `undefined` when cleared)
     */
    onChange?: (value: T | undefined) => void;

    /**
     * Custom render function for the selected value display
     * If not provided, uses label or renderOption
     */
    renderValue?: (option: ComboboxOption<T>) => React.ReactNode;
}

/**
 * Props for multi-select mode
 */
export interface MultiComboboxProps<T = string> {
    /**
     * Enable multiple selection
     * When enabled, value should be an array and onChange receives an array
     */
    multiple: true;

    /**
     * Currently selected values (array)
     */
    value?: T[];

    /**
     * Default values for uncontrolled usage (array)
     */
    defaultValue?: T[];

    /**
     * Callback when values change (receives array of selected values)
     */
    onChange?: (value: T[]) => void;

    /**
     * Custom render function for a removable chip
     * Receives the option and a `remove` callback
     */
    renderChip?: (option: ComboboxOption<T>, remove: () => void) => React.ReactNode;
}

/**
 * Combobox component props
 *
 * Uses a discriminated union on the `multiple` prop so that `value`,
 * `defaultValue`, and `onChange` are correctly typed for single-select
 * (`T`) vs multi-select (`T[]`) usage.
 */
export type ComboboxProps<T = string> = ComboboxBaseProps<T> &
    (SingleComboboxProps<T> | MultiComboboxProps<T>);

/**
 * A single flattened, renderable row of the dropdown.
 * This is the single source of truth for rendering, keyboard navigation,
 * virtualization, and `aria-activedescendant`.
 */
type FlatItem<T> =
    | { kind: 'group-heading'; group: ComboboxOptionGroup<T>; id: string }
    | { kind: 'option'; option: ComboboxOption<T>; id: string; selectable: true }
    | { kind: 'create'; input: string; id: string; selectable: true };

function isGroup<T>(
    item: ComboboxOption<T> | ComboboxOptionGroup<T>,
): item is ComboboxOptionGroup<T> {
    return 'options' in item;
}

/**
 * Combobox component
 *
 * An advanced, react-select-style combobox with inline typeahead search,
 * removable chips, creatable options, clearing, option grouping, and
 * virtualized lists for large datasets. Built on the same Floating UI /
 * portal / keyboard patterns as `Select`, but with an inline-input control
 * instead of a button trigger.
 *
 * **Features:**
 * - Inline typeahead filtering
 * - Single and multi-select (with removable chips)
 * - Creatable options
 * - Clearable selection
 * - Option grouping
 * - Virtualized list for large option sets
 * - Custom render functions
 * - Accessible (ARIA combobox pattern)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Combobox
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   placeholder="Select an option"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multi-select with chips
 * <Combobox
 *   multiple
 *   options={options}
 *   value={values}
 *   onChange={setValues}
 * />
 *
 * // Creatable + clearable
 * <Combobox
 *   options={options}
 *   creatable
 *   clearable
 *   onCreateOption={(input) => addOption(input)}
 * />
 * ```
 */
export function Combobox<T = string>(props: ComboboxProps<T>) {
    const {
        id,
        options,
        placeholder = 'Select...',
        size = 'md',
        position = 'auto',
        disabled = false,
        fullWidth = false,
        error,
        className,
        dropdownClassName,
        maxDropdownHeight = '300px',
        onOpen,
        onClose,
        filterOption,
        clearable = false,
        creatable = false,
        onCreateOption,
        isValidNewOption,
        formatCreateLabel,
        virtualized,
        virtualizeThreshold = 100,
        renderOption,
        renderGroupHeading,
        loading = false,
        loadingMessage = 'Loading...',
        noOptionsMessage = 'No options found',
    } = props;

    // Extract discriminated union props with internal working types.
    // Type safety for consumers is enforced by the ComboboxProps discriminated
    // union; internally we use wider types to avoid TS narrowing limitations
    // with generics.
    const multiple = (props.multiple ?? false) as boolean;
    const controlledValue = props.value as T | T[] | undefined;
    const defaultValue = props.defaultValue as T | T[] | undefined;
    const onChange = props.onChange as ((value: T | T[] | undefined) => void) | undefined;
    const renderValue = (props as SingleComboboxProps<T>).renderValue;
    const renderChip = (props as MultiComboboxProps<T>).renderChip;

    const generatedId = useId();
    const comboboxId = id ?? generatedId;
    const listId = `${comboboxId}-listbox`;

    // Controlled vs uncontrolled value
    const [internalValue, setInternalValue] = useState<T | T[] | undefined>(() => {
        if (multiple) {
            if (Array.isArray(defaultValue)) return defaultValue;
            if (defaultValue !== undefined) return [defaultValue] as unknown as T[];
            return [] as unknown as T[];
        }
        return defaultValue;
    });
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Normalize current value to array for multi-select
    const currentValues = useMemo(() => {
        if (!multiple) return [];
        if (Array.isArray(currentValue)) return currentValue;
        return [];
    }, [currentValue, multiple]);

    // Set for O(1) membership checks - avoids O(n*m) scans when rendering
    // large option lists against many selected values.
    const currentValuesSet = useMemo(() => new Set(currentValues), [currentValues]);

    // Flatten options (ignoring groups) for value lookups
    const allOptions = useMemo(() => {
        const flat: ComboboxOption<T>[] = [];
        for (const entry of options) {
            if (isGroup(entry)) {
                flat.push(...entry.options);
            } else {
                flat.push(entry);
            }
        }
        return flat;
    }, [options]);

    const selectedOption = useMemo(() => {
        if (multiple) return undefined;
        return allOptions.find((option) => option.value === currentValue);
    }, [allOptions, currentValue, multiple]);

    const selectedOptions = useMemo(() => {
        if (!multiple) return [];
        return allOptions.filter((option) => currentValuesSet.has(option.value));
    }, [allOptions, currentValuesSet, multiple]);

    const hasValue = multiple ? currentValues.length > 0 : selectedOption !== undefined;

    // Dropdown / input state
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Convert position to Floating UI placement
    const placement: Placement = position === 'top' ? 'top-start' : 'bottom-start';

    const handleOpenChange = useCallback(
        (open: boolean) => {
            setIsOpen(open);
            if (open) {
                onOpen?.();
            } else {
                setInputValue('');
                onClose?.();
            }
        },
        [onOpen, onClose],
    );

    // Floating UI setup (verbatim pattern from Select)
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: handleOpenChange,
        placement: position === 'auto' ? 'bottom-start' : placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(OFFSET_SPACING),
            flip({ padding: PADDING_SPACING }),
            shift({ padding: PADDING_SPACING }),
            floatingSize({
                apply({ rects, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                        maxHeight: `${availableHeight}px`,
                    });
                },
                padding: PADDING_SPACING,
            }),
        ],
    });

    // Floating UI interactions. `toggle: false` so that clicking the control
    // never closes it - closing is handled exclusively via useDismiss /
    // Escape / Tab / selection, so it never fights the "focus opens" behavior.
    const click = useClick(context, { enabled: !disabled, toggle: false });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'listbox' });

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    // Transition status for exit animations
    const { isMounted, status } = useTransitionStatus(context, {
        duration: TRANSITION_DURATION,
    });

    const portalRoot = usePortalRoot();

    const openDropdown = useCallback(() => {
        if (disabled) return;
        if (!isOpen) handleOpenChange(true);
    }, [disabled, isOpen, handleOpenChange]);

    const closeDropdown = useCallback(() => {
        handleOpenChange(false);
        inputRef.current?.focus();
    }, [handleOpenChange]);

    const trimmedInput = inputValue.trim();
    const lowerInput = inputValue.toLowerCase();

    // Flattened visible-item model: single source of truth for rendering,
    // keyboard navigation, virtualization, and aria-activedescendant.
    // `selectableIndexes` is derived in the same pass to avoid a second full
    // traversal of the list on every keystroke.
    const { visibleItems, selectableIndexes } = useMemo(() => {
        const items: FlatItem<T>[] = [];
        const selectable: number[] = [];

        // Default filter lowercases the input once per pass instead of once
        // per option (as a per-option callback would).
        const matchesInput = filterOption
            ? (option: ComboboxOption<T>) => filterOption(option, inputValue)
            : (option: ComboboxOption<T>) =>
                  (option.label ?? String(option.value)).toLowerCase().includes(lowerInput);

        const pushOption = (option: ComboboxOption<T>) => {
            selectable.push(items.length);
            items.push({
                kind: 'option',
                option,
                id: `${comboboxId}-item-${items.length}`,
                selectable: true,
            });
        };

        for (const entry of options) {
            if (isGroup(entry)) {
                const filteredGroupOptions = inputValue
                    ? entry.options.filter(matchesInput)
                    : entry.options;
                if (filteredGroupOptions.length === 0) continue;
                items.push({
                    kind: 'group-heading',
                    group: entry,
                    id: `${comboboxId}-item-${items.length}`,
                });
                filteredGroupOptions.forEach(pushOption);
            } else {
                if (inputValue && !matchesInput(entry)) continue;
                pushOption(entry);
            }
        }

        if (creatable && trimmedInput) {
            const lowerTrimmed = trimmedInput.toLowerCase();
            const hasExactMatch = allOptions.some(
                (option) => (option.label ?? String(option.value)).toLowerCase() === lowerTrimmed,
            );
            const isValid = isValidNewOption
                ? isValidNewOption(trimmedInput, selectedOptions)
                : true;
            if (!hasExactMatch && isValid) {
                selectable.push(items.length);
                items.push({
                    kind: 'create',
                    input: trimmedInput,
                    id: `${comboboxId}-item-${items.length}`,
                    selectable: true,
                });
            }
        }

        return { visibleItems: items, selectableIndexes: selectable };
    }, [
        options,
        inputValue,
        lowerInput,
        filterOption,
        trimmedInput,
        creatable,
        allOptions,
        isValidNewOption,
        selectedOptions,
        comboboxId,
    ]);

    // Reset/clamp highlightedIndex to the first selectable item whenever the
    // visible items change (filtering, create row appearing/disappearing,
    // etc). This mirrors React's "adjusting state during render" pattern
    // rather than an effect, so the highlight is correct on the same render
    // that produced the new visibleItems.
    const [lastVisibleItems, setLastVisibleItems] = useState(visibleItems);
    if (lastVisibleItems !== visibleItems) {
        setLastVisibleItems(visibleItems);
        setHighlightedIndex(selectableIndexes.length > 0 ? selectableIndexes[0] : -1);
    }

    // Virtualization
    const isVirtualized = virtualized ?? visibleItems.length > virtualizeThreshold;

    const estimateSize = useCallback(
        (index: number) => {
            const item = visibleItems[index];
            return item?.kind === 'group-heading' ? GROUP_HEADING_HEIGHT[size] : ITEM_HEIGHT[size];
        },
        [visibleItems, size],
    );

    const rowVirtualizer = useVirtualizer({
        count: isVirtualized ? visibleItems.length : 0,
        getScrollElement: () => listRef.current,
        estimateSize,
        overscan: 8,
        enabled: isVirtualized,
    });

    const scrollToHighlighted = useCallback(
        (index: number) => {
            if (isVirtualized) {
                rowVirtualizer.scrollToIndex(index, { align: 'auto' });
            } else {
                listRef.current
                    ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
                    ?.scrollIntoView({ block: 'nearest' });
            }
        },
        [isVirtualized, rowVirtualizer],
    );

    const moveHighlight = useCallback(
        (direction: 1 | -1) => {
            if (selectableIndexes.length === 0) return;
            const currentPos = selectableIndexes.indexOf(highlightedIndex);
            let nextPos: number;
            if (currentPos === -1) {
                nextPos = direction === 1 ? 0 : selectableIndexes.length - 1;
            } else {
                nextPos = Math.min(
                    Math.max(currentPos + direction, 0),
                    selectableIndexes.length - 1,
                );
            }
            const nextIndex = selectableIndexes[nextPos];
            setHighlightedIndex(nextIndex);
            scrollToHighlighted(nextIndex);
        },
        [selectableIndexes, highlightedIndex, scrollToHighlighted],
    );

    // Selection handlers
    const selectOption = useCallback(
        (option: ComboboxOption<T>) => {
            if (option.disabled) return;

            if (multiple) {
                const exists = currentValuesSet.has(option.value);
                const newValues = exists
                    ? currentValues.filter((v) => v !== option.value)
                    : [...currentValues, option.value];

                if (!isControlled) setInternalValue(newValues);
                onChange?.(newValues);
                setInputValue('');
                inputRef.current?.focus();
            } else {
                if (!isControlled) setInternalValue(option.value);
                onChange?.(option.value);
                closeDropdown();
            }
        },
        [multiple, currentValues, currentValuesSet, isControlled, onChange, closeDropdown],
    );

    const createOption = useCallback(
        (input: string) => {
            onCreateOption?.(input);
            setInputValue('');
            if (multiple) {
                inputRef.current?.focus();
            } else {
                closeDropdown();
            }
        },
        [onCreateOption, multiple, closeDropdown],
    );

    const removeValue = useCallback(
        (value: T) => {
            if (disabled) return;
            if (multiple) {
                const newValues = currentValues.filter((v) => v !== value);
                if (!isControlled) setInternalValue(newValues);
                onChange?.(newValues);
            } else {
                if (!isControlled) setInternalValue(undefined);
                onChange?.(undefined);
            }
        },
        [disabled, multiple, currentValues, isControlled, onChange],
    );

    const clearAll = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            e?.preventDefault();
            if (disabled) return;

            if (multiple) {
                if (!isControlled) setInternalValue([] as unknown as T[]);
                onChange?.([] as unknown as T[]);
            } else {
                if (!isControlled) setInternalValue(undefined);
                onChange?.(undefined);
            }
            setInputValue('');
            inputRef.current?.focus();
        },
        [disabled, multiple, isControlled, onChange],
    );

    // Keyboard navigation on the inline input
    const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (disabled) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (!isOpen) openDropdown();
                    else moveHighlight(1);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    if (!isOpen) openDropdown();
                    else moveHighlight(-1);
                    break;

                case 'Home':
                    if (isOpen && selectableIndexes.length > 0) {
                        e.preventDefault();
                        const first = selectableIndexes[0];
                        setHighlightedIndex(first);
                        scrollToHighlighted(first);
                    }
                    break;

                case 'End':
                    if (isOpen && selectableIndexes.length > 0) {
                        e.preventDefault();
                        const last = selectableIndexes[selectableIndexes.length - 1];
                        setHighlightedIndex(last);
                        scrollToHighlighted(last);
                    }
                    break;

                case 'Enter': {
                    if (!isOpen) break;
                    const item = visibleItems[highlightedIndex];
                    if (!item) break;
                    e.preventDefault();
                    if (item.kind === 'option') selectOption(item.option);
                    else if (item.kind === 'create') createOption(item.input);
                    break;
                }

                case 'Escape':
                    if (isOpen) {
                        e.preventDefault();
                        closeDropdown();
                    }
                    break;

                case 'Tab':
                    if (isOpen) closeDropdown();
                    break;

                case 'Backspace':
                    if (multiple && inputValue === '' && currentValues.length > 0) {
                        removeValue(currentValues[currentValues.length - 1]);
                    }
                    break;
            }
        },
        [
            disabled,
            isOpen,
            openDropdown,
            moveHighlight,
            selectableIndexes,
            scrollToHighlighted,
            visibleItems,
            highlightedIndex,
            selectOption,
            createOption,
            closeDropdown,
            multiple,
            inputValue,
            currentValues,
            removeValue,
        ],
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            if (!isOpen) openDropdown();
        },
        [isOpen, openDropdown],
    );

    const handleInputFocus = useCallback(() => {
        openDropdown();
    }, [openDropdown]);

    const handleControlClick = useCallback(() => {
        if (disabled) return;
        inputRef.current?.focus();
    }, [disabled]);

    // The input shows the typed search text while open; while closed (and
    // single-select) it falls back to the selected option's label. Since
    // inputValue is cleared on close, this also implements "restore on close
    // if no change" automatically. When a custom `renderValue` is supplied,
    // the rich content can't live inside the <input>'s `value`, so it is
    // rendered as an overlay above the (then-empty) input instead.
    const showValueOverlay = !multiple && !isOpen && !!selectedOption && !!renderValue;
    const inputDisplayValue =
        isOpen || multiple ? inputValue : showValueOverlay ? '' : (selectedOption?.label ?? '');

    const highlightedItem = highlightedIndex >= 0 ? visibleItems[highlightedIndex] : undefined;
    const highlightedItemId = highlightedItem?.id;

    const containerClassName = className
        ? `${styles.comboboxContainer({ fullWidth })} ${className}`
        : styles.comboboxContainer({ fullWidth });

    const floatingWrapperClassName = dropdownClassName
        ? `${styles.floatingWrapper} ${dropdownClassName}`
        : styles.floatingWrapper;

    const renderOptionRow = useCallback(
        (item: FlatItem<T>, index: number) => {
            if (item.kind === 'group-heading') {
                return (
                    <div
                        key={item.id}
                        id={item.id}
                        data-index={index}
                        role="presentation"
                        className={styles.groupHeading({ size })}
                    >
                        {renderGroupHeading ? renderGroupHeading(item.group) : item.group.label}
                    </div>
                );
            }

            if (item.kind === 'create') {
                return (
                    <div
                        key={item.id}
                        id={item.id}
                        data-index={index}
                        role="option"
                        aria-selected={false}
                        className={styles.createOption({
                            size,
                            isHighlighted: index === highlightedIndex,
                        })}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => createOption(item.input)}
                    >
                        {formatCreateLabel
                            ? formatCreateLabel(item.input)
                            : `Create "${item.input}"`}
                    </div>
                );
            }

            const option = item.option;
            const isSelected = multiple
                ? currentValuesSet.has(option.value)
                : option.value === currentValue;

            return (
                <div
                    key={item.id}
                    id={item.id}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    className={styles.option({
                        size,
                        isHighlighted: index === highlightedIndex,
                        isDisabled: option.disabled || false,
                    })}
                    onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                    onClick={() => selectOption(option)}
                >
                    {renderOption ? (
                        renderOption(option, isSelected)
                    ) : (
                        <span className={styles.optionLabel}>
                            {option.label ?? String(option.value)}
                        </span>
                    )}
                </div>
            );
        },
        [
            size,
            renderGroupHeading,
            highlightedIndex,
            createOption,
            formatCreateLabel,
            multiple,
            currentValuesSet,
            currentValue,
            renderOption,
            selectOption,
        ],
    );

    // Non-virtualized rendering wraps each group's heading + options in a
    // `role="group"` container labelled by the heading (virtualized rows must
    // remain independent siblings for absolute positioning, so grouping there
    // is conveyed via the heading rows themselves rather than DOM nesting).
    const renderList = useCallback(() => {
        const rendered: React.ReactNode[] = [];
        let i = 0;
        while (i < visibleItems.length) {
            const item = visibleItems[i];
            if (item.kind === 'group-heading') {
                const headingId = item.id;
                const groupRows: React.ReactNode[] = [];
                let j = i + 1;
                while (j < visibleItems.length && visibleItems[j].kind !== 'group-heading') {
                    groupRows.push(renderOptionRow(visibleItems[j], j));
                    j += 1;
                }
                rendered.push(
                    <div key={headingId} role="group" aria-labelledby={headingId}>
                        {renderOptionRow(item, i)}
                        {groupRows}
                    </div>,
                );
                i = j;
            } else {
                rendered.push(renderOptionRow(item, i));
                i += 1;
            }
        }
        return rendered;
    }, [visibleItems, renderOptionRow]);

    return (
        <div className={containerClassName}>
            <div
                ref={refs.setReference}
                className={styles.control({
                    size,
                    isOpen,
                    hasError: !!error,
                    disabled,
                })}
                {...getReferenceProps({ onClick: handleControlClick })}
            >
                <div className={styles.controlInner}>
                    {multiple &&
                        selectedOptions.map((option) => {
                            const label = option.label ?? String(option.value);
                            if (renderChip) {
                                return (
                                    <React.Fragment key={String(option.value)}>
                                        {renderChip(option, () => removeValue(option.value))}
                                    </React.Fragment>
                                );
                            }
                            return (
                                <Tag
                                    key={String(option.value)}
                                    size={size}
                                    variant="secondary"
                                    className={styles.chip}
                                >
                                    {label}
                                    <button
                                        type="button"
                                        className={styles.chipRemoveButton}
                                        aria-label={`Remove ${label}`}
                                        tabIndex={-1}
                                        disabled={disabled}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeValue(option.value);
                                        }}
                                    >
                                        <Icon name="close" size="xs" />
                                    </button>
                                </Tag>
                            );
                        })}
                    <div className={styles.inputWrapper}>
                        {showValueOverlay && selectedOption && (
                            <span className={styles.singleValue}>
                                {renderValue!(selectedOption)}
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            id={comboboxId}
                            type="text"
                            role="combobox"
                            className={styles.input({ size })}
                            value={inputDisplayValue}
                            placeholder={hasValue ? undefined : placeholder}
                            disabled={disabled}
                            autoComplete="off"
                            aria-expanded={isOpen}
                            aria-controls={listId}
                            aria-autocomplete="list"
                            aria-haspopup="listbox"
                            aria-activedescendant={isOpen ? highlightedItemId : undefined}
                            aria-invalid={!!error || undefined}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                </div>

                <div className={styles.indicators}>
                    {clearable && hasValue && !disabled && (
                        <IconButton
                            type="button"
                            variant="ghost"
                            size="xs"
                            icon={<Icon name="close" size="xs" />}
                            aria-label="Clear selection"
                            tabIndex={-1}
                            className={styles.clearButton}
                            onClick={clearAll}
                        />
                    )}
                    {loading ? (
                        <Icon name="loading" spin />
                    ) : (
                        <span className={styles.chevronIcon({ isOpen })}>
                            <Icon name="chevron-down" />
                        </span>
                    )}
                </div>
            </div>

            {isMounted && (
                <FloatingPortal root={portalRoot}>
                    <div
                        ref={refs.setFloating}
                        className={floatingWrapperClassName}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div className={styles.dropdownPortal} data-status={status}>
                            <div
                                id={listId}
                                ref={listRef}
                                role="listbox"
                                aria-multiselectable={multiple || undefined}
                                className={styles.listContainer}
                                style={{ maxHeight: maxDropdownHeight }}
                            >
                                {loading ? (
                                    <div className={styles.loadingMessage}>{loadingMessage}</div>
                                ) : visibleItems.length === 0 ? (
                                    <div className={styles.emptyMessage}>{noOptionsMessage}</div>
                                ) : isVirtualized ? (
                                    <div
                                        className={styles.virtualSpacer}
                                        style={{ height: rowVirtualizer.getTotalSize() }}
                                    >
                                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                            const item = visibleItems[virtualRow.index];
                                            return (
                                                <div
                                                    key={item.id}
                                                    data-index={virtualRow.index}
                                                    ref={rowVirtualizer.measureElement}
                                                    className={styles.virtualRow}
                                                    style={{
                                                        transform: `translateY(${virtualRow.start}px)`,
                                                    }}
                                                >
                                                    {renderOptionRow(item, virtualRow.index)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    renderList()
                                )}
                            </div>
                        </div>
                    </div>
                </FloatingPortal>
            )}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
}
