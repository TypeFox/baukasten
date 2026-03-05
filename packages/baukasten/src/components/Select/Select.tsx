import React, { useState, useRef, useCallback, useMemo } from 'react';
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
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { usePortalRoot } from '../../context';
import * as styles from './Select.css';

// Floating UI numeric values (required by Floating UI API)
const OFFSET_SPACING = 4; // var(--bk-spacing-1)
const PADDING_SPACING = 8; // var(--bk-spacing-2)
const TRANSITION_DURATION = 150; // var(--bk-transition-fast) = 150ms

/**
 * Dropdown position
 * - `auto`: Automatically determine position based on available space
 * - `top`: Always open above the trigger
 * - `bottom`: Always open below the trigger
 */
export type SelectPosition = 'auto' | 'top' | 'bottom';

/**
 * Select option type
 */
export interface SelectOption<T = string> {
  /**
   * The value of the option
   */
  value: T;

  /**
   * The label displayed for the option (optional if using renderOption)
   */
  label?: string;

  /**
   * Optional description used for search filtering
   * If provided, search will match against this instead of label
   */
  description?: string;

  /**
   * Whether the option is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional label shown on the right side (e.g., "default", "recommended")
   * Displayed in muted text
   */
  defaultLabel?: string;
}

/**
 * Base props shared between single-select and multi-select modes
 */
export interface SelectBaseProps<T = string> {
  /**
   * Unique identifier for the select trigger element
   * Used for label association (htmlFor) in FormGroup
   */
  id?: string;

  /**
   * Array of options to display
   */
  options: SelectOption<T>[];

  /**
   * Callback when dropdown opens
   */
  onOpen?: () => void;

  /**
   * Callback when dropdown closes
   */
  onClose?: () => void;

  /**
   * Placeholder text when no value is selected
   * @default 'Select an option...'
   */
  placeholder?: string;

  /**
   * Size of the select
   * @default 'md'
   */
  size?: Size;

  /**
   * Dropdown position preference
   * @default 'auto'
   */
  position?: SelectPosition;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether to show a search input in the dropdown
   * @default false
   */
  searchable?: boolean;

  /**
   * Placeholder for search input
   * @default 'Search...'
   */
  searchPlaceholder?: string;

  /**
   * Error message displayed below the select
   */
  error?: string;

  /**
   * Custom filter function for searchable select
   * @default Matches against label
   */
  filterOption?: (option: SelectOption<T>, searchValue: string) => boolean;

  /**
   * Custom render function for options in the dropdown
   * Allows full control over option appearance
   */
  renderOption?: (option: SelectOption<T>, isSelected: boolean) => React.ReactNode;

  /**
   * Custom render function for the selected value display
   * If not provided, uses label or renderOption
   */
  renderValue?: (option: SelectOption<T>) => React.ReactNode;

  /**
   * Maximum height for the dropdown menu
   * @default '300px'
   */
  maxDropdownHeight?: string;

  /**
   * Whether to show description panel at the bottom of dropdown
   * Shows the description of the highlighted/selected option
   * Only visible when at least one option has a description
   * @default true
   */
  showDescriptionPanel?: boolean;

  /**
   * Additional CSS class name for the container
   */
  className?: string;

  /**
   * Additional CSS class name for the dropdown portal
   * Useful for customizing dropdown styles when rendered in a portal
   */
  dropdownClassName?: string;
}

/**
 * Props for single-select mode (default)
 */
export interface SingleSelectProps<T = string> {
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
   * Callback when value changes (receives the selected value)
   */
  onChange?: (value: T) => void;
}

/**
 * Props for multi-select mode
 */
export interface MultiSelectProps<T = string> {
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
}

/**
 * Select component props
 *
 * Uses a discriminated union on the `multiple` prop so that `value`,
 * `defaultValue`, and `onChange` are correctly typed for single-select
 * (`T`) vs multi-select (`T[]`) usage.
 */
export type SelectProps<T = string> = SelectBaseProps<T> & (SingleSelectProps<T> | MultiSelectProps<T>);


/**
 * Select component
 *
 * A custom select dropdown component with keyboard navigation, search, custom rendering, and positioning control.
 * Fully integrates with the design system tokens.
 *
 * **Features:**
 * - Keyboard navigation (Arrow keys, Enter, Escape, Tab, Home, End)
 * - Auto-positioning (opens top or bottom based on available space)
 * - Searchable options with label-based filtering
 * - Custom render functions for complete control over appearance
 * - Multiselect support with checkboxes
 * - Size variants
 * - Error state support
 * - Accessible (ARIA attributes)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   placeholder="Select an option"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // With search and descriptions
 * <Select
 *   options={[
 *     { value: 'ts', label: 'TypeScript', description: 'Typed superset of JavaScript' },
 *     { value: 'js', label: 'JavaScript', description: 'Dynamic scripting language' },
 *   ]}
 *   searchable
 *   placeholder="Search languages..."
 * />
 *
 * // With custom render
 * <Select
 *   options={options}
 *   renderOption={(option) => (
 *     <span>
 *       <Icon name="check" />
 *       {option.label}
 *     </span>
 *   )}
 * />
 *
 * // Controlled
 * <Select
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   options={options}
 * />
 * ```
 */
export function Select<T = string>(props: SelectProps<T>) {
  const {
    id,
    options,
    onOpen,
    onClose,
    placeholder = 'Select an option...',
    size = 'md',
    position = 'auto',
    disabled = false,
    fullWidth = false,
    searchable = false,
    searchPlaceholder = 'Search...',
    error,
    filterOption,
    renderOption,
    renderValue,
    maxDropdownHeight = '300px',
    showDescriptionPanel = true,
    className,
    dropdownClassName,
  } = props;

  // Extract discriminated union props with internal working types.
  // Type safety for consumers is enforced by the SelectProps discriminated union;
  // internally we use wider types to avoid TS narrowing limitations with generics.
  const multiple = (props.multiple ?? false) as boolean;
  const controlledValue = props.value as T | T[] | undefined;
  const defaultValue = props.defaultValue as T | T[] | undefined;
  const onChange = props.onChange as ((value: T | T[]) => void) | undefined;

  // Controlled vs uncontrolled value
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue !== undefined) {
        return [defaultValue] as unknown as T[];
      }
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

  // Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Convert position to Floating UI placement
  const placement: Placement = position === 'top' ? 'top-start' : 'bottom-start';

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (open) {
        setSearchValue('');
        setHighlightedIndex(-1);
        onOpen?.();
        // Focus search input if searchable
        if (searchable) {
          setTimeout(() => searchInputRef.current?.focus(), 0);
        }
      } else {
        setSearchValue('');
        setHighlightedIndex(-1);
        onClose?.();
      }
    },
    placement: position === 'auto' ? 'bottom-start' : placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET_SPACING),
      flip({ padding: PADDING_SPACING }),
      shift({ padding: PADDING_SPACING }),
      floatingSize({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: PADDING_SPACING,
      }),
    ],
  });

  // Floating UI interactions
  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  // Transition status for exit animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  });

  // Filter options based on search
  const defaultFilterOption = useCallback((option: SelectOption<T>, search: string) => {
    const searchText = option.label || '';
    return searchText.toLowerCase().includes(search.toLowerCase());
  }, []);

  const activeFilterOption = filterOption || defaultFilterOption;

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;
    return options.filter(option => activeFilterOption(option, searchValue));
  }, [options, searchValue, searchable, activeFilterOption]);

  // Get selected option(s)
  const selectedOption = useMemo(() => {
    if (multiple) return undefined;
    return options.find(option => option.value === currentValue);
  }, [options, currentValue, multiple]);

  const selectedOptions = useMemo(() => {
    if (!multiple) return [];
    return options.filter(option => currentValues.includes(option.value));
  }, [options, currentValues, multiple]);

  // Check if we should show description panel
  // Only show if: enabled, not using custom render, and at least one option has description
  const shouldShowDescriptionPanel = useMemo(() => {
    return showDescriptionPanel && !renderOption && options.some(opt => opt.description);
  }, [showDescriptionPanel, renderOption, options]);

  // Get description to display (from highlighted option, or selected if no highlight)
  const displayedDescription = useMemo(() => {
    if (!shouldShowDescriptionPanel) return null;

    // If dropdown is open and we have a highlighted option, show that
    if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      return filteredOptions[highlightedIndex].description || '';
    }

    // Otherwise show selected option's description
    return selectedOption?.description || '';
  }, [shouldShowDescriptionPanel, isOpen, highlightedIndex, filteredOptions, selectedOption]);

  // Close dropdown (manually callable for keyboard events)
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    // Focus back to trigger button
    (refs.reference.current as HTMLElement | null)?.focus?.();
  }, [refs]);

  // Handle option select
  const selectOption = useCallback((option: SelectOption<T>, e?: React.MouseEvent) => {
    if (option.disabled) return;

    // Prevent event propagation to avoid interference from parent elements (like Label)
    e?.stopPropagation();
    e?.preventDefault();

    if (multiple) {
      // Multi-select mode
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];

      if (!isControlled) {
        setInternalValue(newValues);
      }

      onChange?.(newValues);
      // Don't close dropdown in multi-select mode
    } else {
      // Single-select mode
      if (!isControlled) {
        setInternalValue(option.value);
      }

      onChange?.(option.value);
      closeDropdown();
    }
  }, [isControlled, onChange, closeDropdown, multiple, currentValues]);

  // Keyboard navigation for trigger
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        } else if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          e.preventDefault();
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          closeDropdown();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
          setHighlightedIndex(nextIndex);
          // Scroll into view
          optionsRefs.current.get(nextIndex)?.scrollIntoView({ block: 'nearest' });
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const prevIndex = Math.max(highlightedIndex - 1, 0);
          setHighlightedIndex(prevIndex);
          // Scroll into view
          optionsRefs.current.get(prevIndex)?.scrollIntoView({ block: 'nearest' });
        }
        break;

      case 'Tab':
        if (isOpen) {
          closeDropdown();
        }
        break;

      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
          optionsRefs.current.get(0)?.scrollIntoView({ block: 'nearest' });
        }
        break;

      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = filteredOptions.length - 1;
          setHighlightedIndex(lastIndex);
          optionsRefs.current.get(lastIndex)?.scrollIntoView({ block: 'nearest' });
        }
        break;
    }
  }, [disabled, isOpen, highlightedIndex, filteredOptions, closeDropdown, selectOption]);

  // Keyboard navigation for search input (no space/enter to select)
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        // Select highlighted option on Enter
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          e.preventDefault();
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;

      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
        setHighlightedIndex(nextIndex);
        optionsRefs.current.get(nextIndex)?.scrollIntoView({ block: 'nearest' });
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = Math.max(highlightedIndex - 1, 0);
        setHighlightedIndex(prevIndex);
        optionsRefs.current.get(prevIndex)?.scrollIntoView({ block: 'nearest' });
        break;
      }

      case 'Home':
        // Allow Home to work in input (go to start of text) unless Ctrl is pressed
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setHighlightedIndex(0);
          optionsRefs.current.get(0)?.scrollIntoView({ block: 'nearest' });
        }
        break;

      case 'End':
        // Allow End to work in input (go to end of text) unless Ctrl is pressed
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const lastIndex = filteredOptions.length - 1;
          setHighlightedIndex(lastIndex);
          optionsRefs.current.get(lastIndex)?.scrollIntoView({ block: 'nearest' });
        }
        break;

      case 'Tab':
        closeDropdown();
        break;
    }
  }, [highlightedIndex, filteredOptions, selectOption, closeDropdown]);

  // Floating UI handles click-outside and position updates automatically via autoUpdate and useDismiss

  // Get portal root from context (for multi-window support)
  const portalRoot = usePortalRoot();

  const hasMultipleValues = multiple && currentValues.length > 0;

  const containerClassName = className
    ? `${styles.selectContainer({ fullWidth })} ${className}`
    : styles.selectContainer({ fullWidth });

  const selectOptionClassName = hasMultipleValues
    ? styles.selectValue
    : selectedOption
      ? styles.selectValue
      : `${styles.selectValue} ${styles.selectValuePlaceholder}`;

  return (
    <div className={containerClassName}>
      <button
        ref={refs.setReference}
        type="button"
        id={id}
        className={styles.selectTrigger({
          size,
          hasError: !!error,
          isOpen,
        })}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select"
        {...getReferenceProps()}
      >
        <span className={selectOptionClassName}>
          {hasMultipleValues ? (
            <span className={styles.selectValueContent}>
              {currentValues.length === 1 ? (selectedOptions[0]?.label ?? '1 selected') : `${currentValues.length} selected`}
            </span>
          ) : selectedOption ? (
            <span className={styles.selectValueContent}>
              {renderValue ? renderValue(selectedOption) : (
                renderOption ? renderOption(selectedOption, true) : selectedOption.label
              )}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <span className={styles.chevronIcon({ isOpen })}>
          <Icon name="chevron-down" />
        </span>
      </button>

      {isMounted && (
        <FloatingPortal root={portalRoot}>
          <div
            ref={refs.setFloating}
            className={`${styles.floatingWrapper}${dropdownClassName ? ` ${dropdownClassName}` : ''}`}
            style={{
              ...floatingStyles,
            }}
            {...getFloatingProps()}
          >
            <div
              className={styles.dropdownPortal}
              style={{ maxHeight: maxDropdownHeight }}
              role="listbox"
              data-status={status}
            >
              {searchable && (
                <div className={styles.searchInputWrapper}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setHighlightedIndex(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                  />
                </div>
              )}

              <div className={styles.optionsContainer}>
                {filteredOptions.length === 0 ? (
                  <div className={styles.emptyMessage}>No options found</div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = multiple ? currentValues.includes(option.value) : option.value === currentValue;
                    return (
                      <div
                        key={String(option.value)}
                        ref={(el) => {
                          if (el) {
                            optionsRefs.current.set(index, el);
                          } else {
                            optionsRefs.current.delete(index);
                          }
                        }}
                        className={styles.option({
                          size,
                          isHighlighted: index === highlightedIndex,
                          isDisabled: option.disabled || false,
                        })}
                        onClick={(e) => selectOption(option, e)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                      >
                        {multiple && (
                          <Checkbox
                            checked={isSelected}
                            disabled={option.disabled}
                            onClick={(e) => e.stopPropagation()}
                            tabIndex={-1}
                          />
                        )}
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            <span className={styles.optionLabel}>{option.label}</span>
                            {option.defaultLabel && (
                              <span className={styles.optionDefaultLabel}>{option.defaultLabel}</span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {shouldShowDescriptionPanel && (
                <div className={styles.descriptionPanel}>
                  {displayedDescription || '\u00A0'}
                </div>
              )}
            </div>
          </div>
        </FloatingPortal>
      )}

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
