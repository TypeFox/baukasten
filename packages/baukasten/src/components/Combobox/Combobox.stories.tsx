import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './Combobox';
import type { ComboboxOption, ComboboxOptionGroup, ComboboxOptions } from './Combobox';
import { Icon } from '../Icon';
import type { CodiconName } from '../Icon/codicon-names';
import { FieldLabel } from '../FieldLabel';
import { FormGroup } from '../FormGroup';
import { Tag } from '../Tag';

// Sample data
const basicOptions: ComboboxOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

const languageOptions: ComboboxOption[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },
    { value: 'php', label: 'PHP' },
    { value: 'csharp', label: 'C#' },
];

const optionsWithDisabled: ComboboxOption[] = [
    { value: '1', label: 'Available Option 1' },
    { value: '2', label: 'Disabled Option', disabled: true },
    { value: '3', label: 'Available Option 2' },
    { value: '4', label: 'Also Disabled', disabled: true },
    { value: '5', label: 'Available Option 3' },
];

// Grouped dataset - languages by paradigm
const groupedOptions: ComboboxOptions = [
    {
        label: 'Frontend',
        options: [
            { value: 'js', label: 'JavaScript' },
            { value: 'ts', label: 'TypeScript' },
            { value: 'html', label: 'HTML' },
            { value: 'css', label: 'CSS' },
        ],
    },
    {
        label: 'Backend',
        options: [
            { value: 'node', label: 'Node.js' },
            { value: 'python', label: 'Python' },
            { value: 'go', label: 'Go' },
            { value: 'rust', label: 'Rust', disabled: true },
        ],
    },
    {
        label: 'Mobile',
        options: [
            { value: 'swift', label: 'Swift' },
            { value: 'kotlin', label: 'Kotlin' },
            { value: 'dart', label: 'Dart' },
        ],
    },
] satisfies ComboboxOptionGroup[];

// Large dataset for virtualization
const longListOptions: ComboboxOption[] = Array.from({ length: 500 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Item ${i + 1}`,
}));

const iconMap: Record<string, CodiconName> = {
    js: 'symbol-method',
    ts: 'symbol-method',
    py: 'symbol-method',
    java: 'symbol-class',
    go: 'symbol-interface',
    rust: 'symbol-interface',
};

const meta = {
    title: 'Components/Combobox',
    component: Combobox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'An advanced, react-select-style combobox with inline typeahead search, removable chips (multi-select), creatable options, clearable selection, option grouping, and virtualized lists for large datasets. Built on the same Floating UI / portal / keyboard patterns as `Select`, but uses an inline `<input>` control instead of a button trigger. Fully integrates with the design system and VSCode theme variables.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
            description: 'Array of options (and/or option groups) to display',
        },
        multiple: {
            control: 'boolean',
            description: 'Enable multiple selection (removable chips inside the control)',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        value: {
            control: 'text',
            description:
                'Currently selected value (controlled mode). `T` for single, `T[]` for multi.',
        },
        defaultValue: {
            control: 'text',
            description: 'Default selected value for uncontrolled usage',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text when no value is selected',
            table: {
                defaultValue: { summary: 'Select...' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the combobox',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        position: {
            control: 'select',
            options: ['auto', 'top', 'bottom'],
            description: 'Dropdown position preference',
            table: {
                defaultValue: { summary: 'auto' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the combobox is disabled',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the combobox should take full width of its container',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        error: {
            control: 'text',
            description: 'Error message displayed below the combobox',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class name for the container',
        },
        dropdownClassName: {
            control: 'text',
            description: 'Additional CSS class name for the dropdown portal element',
        },
        maxDropdownHeight: {
            control: 'text',
            description: 'Maximum height for the options list within the dropdown',
            table: {
                defaultValue: { summary: '300px' },
            },
        },
        onOpen: {
            action: 'opened',
            description: 'Callback when dropdown opens',
        },
        onClose: {
            action: 'closed',
            description: 'Callback when dropdown closes',
        },
        filterOption: {
            control: false,
            description:
                'Custom filter function used while typing. Default: case-insensitive match against label.',
        },
        clearable: {
            control: 'boolean',
            description: 'Whether to show a "clear" button when a value is selected',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        creatable: {
            control: 'boolean',
            description: 'Whether to allow creating a new option from the typed input',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        onCreateOption: {
            action: 'createOption',
            description:
                'Callback fired when the user chooses to create a new option (via the create row)',
        },
        isValidNewOption: {
            control: false,
            description:
                'Determines whether the current input is a valid new option. Default: non-empty input is valid.',
        },
        formatCreateLabel: {
            control: false,
            description: 'Formats the label shown in the create row',
            table: {
                defaultValue: { summary: '`Create "input"`' },
            },
        },
        virtualized: {
            control: 'boolean',
            description:
                'Whether to virtualize the options list. When undefined, auto-enabled above `virtualizeThreshold`.',
        },
        virtualizeThreshold: {
            control: 'number',
            description:
                'Number of visible items above which virtualization is auto-enabled when `virtualized` is not explicitly set',
            table: {
                defaultValue: { summary: '100' },
            },
        },
        renderOption: {
            control: false,
            description: 'Custom render function for options in the dropdown',
        },
        renderGroupHeading: {
            control: false,
            description: 'Custom render function for group headings',
        },
        renderValue: {
            control: false,
            description:
                'Custom render function for the selected value display (single-select only)',
        },
        renderChip: {
            control: false,
            description: 'Custom render function for a removable chip (multi-select only)',
        },
        loading: {
            control: 'boolean',
            description:
                'Whether the combobox is in a loading state (shows a spinner indicator and the loading message instead of the options list)',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        loadingMessage: {
            control: 'text',
            description: 'Message shown while `loading` is true',
            table: {
                defaultValue: { summary: 'Loading...' },
            },
        },
        noOptionsMessage: {
            control: 'text',
            description: 'Message shown when no options match the current input',
            table: {
                defaultValue: { summary: 'No options found' },
            },
        },
        id: {
            control: 'text',
            description:
                'Unique identifier for the inline input element. Used for label association (htmlFor) in FormGroup.',
        },
    },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all combobox properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    args: {
        options: languageOptions,
        placeholder: 'Select a language...',
        size: 'md',
        position: 'auto',
        disabled: false,
        fullWidth: false,
        clearable: false,
        creatable: false,
        loading: false,
        maxDropdownHeight: '300px',
        virtualizeThreshold: 100,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all combobox properties. Try typing to filter, use arrow keys to navigate, and Enter to select. Toggle `clearable` and `creatable` from the controls below.',
            },
        },
    },
};

/**
 * Single vs multi-select variants side by side.
 */
export const Variants: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                minWidth: '320px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Single Select (default)
                </h4>
                <Combobox options={languageOptions} placeholder="Choose a language..." />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Multi Select
                </h4>
                <Combobox multiple options={languageOptions} placeholder="Choose languages..." />
            </div>
        </div>
    ),
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'The `multiple` prop switches between single-select (default) and multi-select mode. In multi-select mode, chosen options render as removable chips inline inside the control.',
            },
        },
    },
};

/**
 * All available combobox sizes from extra small to extra large.
 */
export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                alignItems: 'flex-start',
                minWidth: '300px',
            }}
        >
            <Combobox options={basicOptions} size="xs" placeholder="Extra Small" />
            <Combobox options={basicOptions} size="sm" placeholder="Small" />
            <Combobox options={basicOptions} size="md" placeholder="Medium (default)" />
            <Combobox options={basicOptions} size="lg" placeholder="Large" />
            <Combobox options={basicOptions} size="xl" placeholder="Extra Large" />
        </div>
    ),
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. The control, chips, and dropdown options all scale accordingly.',
            },
        },
    },
};

/**
 * Disabled, error, loading, and disabled-option states.
 */
export const States: Story = {
    args: { options: [] },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-4)',
                minWidth: '300px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Disabled
                </h4>
                <Combobox options={basicOptions} disabled defaultValue="option2" />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Error State
                </h4>
                <Combobox
                    options={basicOptions}
                    placeholder="Select an option..."
                    error="This field is required"
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Loading
                </h4>
                <Combobox options={[]} loading placeholder="Fetching options..." />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    With Disabled Options
                </h4>
                <Combobox options={optionsWithDisabled} placeholder="Some options are disabled" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Combobox supports various states: **disabled** (entire control), **error** (with error message and `aria-invalid`), **loading** (shows a spinner and `loadingMessage` instead of the options list), and individual **disabled options**.',
            },
        },
    },
};

/**
 * Multi-select with removable chips.
 */
const MultiStory = () => {
    const [selected, setSelected] = useState<string[]>(['ts', 'go']);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                minWidth: '320px',
            }}
        >
            <Combobox
                multiple
                options={languageOptions}
                value={selected}
                onChange={(value) => setSelected(value)}
                placeholder="Select programming languages..."
                clearable
            />
            <div
                style={{
                    padding: 'var(--bk-padding-md)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                <div>
                    <strong>Selected ({selected.length}):</strong>
                </div>
                {selected.length > 0 ? (
                    <div style={{ marginTop: 'var(--bk-spacing-1)' }}>
                        {selected.map((val) => {
                            const option = languageOptions.find((opt) => opt.value === val);
                            return (
                                <div
                                    key={val}
                                    style={{ color: 'var(--bk-color-foreground-muted)' }}
                                >
                                    • {option?.label}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        style={{
                            color: 'var(--bk-color-foreground-muted)',
                            marginTop: 'var(--bk-spacing-1)',
                        }}
                    >
                        None selected
                    </div>
                )}
            </div>
        </div>
    );
};

export const Multi: Story = {
    render: () => <MultiStory />,
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'Multi-select mode (`multiple`) renders chosen options as removable `Tag` chips inline inside the control. Click the "x" on a chip (or press Backspace with an empty input) to remove the last selection. Combined here with `clearable` to remove all at once.',
            },
        },
    },
};

/**
 * Creatable combobox - type a value that doesn't exist to create it.
 */
const CreatableStory = () => {
    const [options, setOptions] = useState<ComboboxOption[]>(basicOptions);
    const [value, setValue] = useState<string | undefined>();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                minWidth: '320px',
            }}
        >
            <Combobox
                options={options}
                value={value}
                onChange={setValue}
                creatable
                placeholder="Select or create an option..."
                onCreateOption={(input) => {
                    const newOption: ComboboxOption = { value: input, label: input };
                    setOptions((prev) => [...prev, newOption]);
                    setValue(input);
                }}
                formatCreateLabel={(input) => (
                    <span>
                        <Icon name="add" size="xs" style={{ marginRight: 'var(--bk-gap-sm)' }} />
                        Create &quot;{input}&quot;
                    </span>
                )}
            />
            <div
                style={{
                    padding: 'var(--bk-padding-md)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                Current value: <strong>{value ?? 'none'}</strong>
            </div>
        </div>
    );
};

export const Creatable: Story = {
    render: () => <CreatableStory />,
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'Enable `creatable` to let users add a new option from typed text that has no exact match. The create row appears at the bottom of the list, and `onCreateOption` receives the trimmed input so you can add it to your data source. `formatCreateLabel` customizes the row label.',
            },
        },
    },
};

/**
 * Clearable single and multi comboboxes.
 */
export const Clearable: Story = {
    args: { options: [] },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                width: '520px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Single Select
                </h4>
                <Combobox
                    options={languageOptions}
                    defaultValue="ts"
                    clearable
                    placeholder="Choose a language..."
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Multi Select
                </h4>
                <Combobox
                    multiple
                    options={languageOptions}
                    defaultValue={['js', 'ts', 'py']}
                    clearable
                    placeholder="Choose languages..."
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The `clearable` prop shows an "x" indicator when a value is selected, letting users reset the field in a single click. Clears to `undefined` (single) or `[]` (multi).',
            },
        },
    },
};

/**
 * Grouped options with group headings.
 */
export const Grouped: Story = {
    args: { options: [] },
    render: () => (
        <div style={{ minWidth: '320px' }}>
            <Combobox options={groupedOptions} placeholder="Select a technology..." clearable />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Pass `ComboboxOptionGroup` entries (objects with a `label` and `options` array) alongside plain options to render labeled sections. Group headings are non-interactive; keyboard navigation skips over them, and filtering hides groups whose options are all filtered out. Note one entry ("Rust") is disabled.',
            },
        },
    },
};

/**
 * Custom render functions for options, group headings, selected value, and chips.
 */
const CustomRenderStory = () => {
    const [singleValue, setSingleValue] = useState<string | undefined>('ts');
    const [multiValue, setMultiValue] = useState<string[]>(['js', 'ts']);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-6)',
                minWidth: '320px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Custom renderOption + renderValue
                </h4>
                <Combobox
                    options={languageOptions}
                    value={singleValue}
                    onChange={setSingleValue}
                    placeholder="Choose a language..."
                    renderValue={(option) => (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--bk-gap-sm)',
                            }}
                        >
                            <Icon name={iconMap[String(option.value)] || 'symbol-method'} />
                            <strong>{option.label}</strong>
                        </span>
                    )}
                    renderOption={(option, isSelected) => (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--bk-gap-sm)',
                            }}
                        >
                            <Icon name={iconMap[String(option.value)] || 'symbol-method'} />
                            {option.label}
                            {isSelected && <Icon name="check" style={{ marginLeft: 'auto' }} />}
                        </span>
                    )}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Custom renderChip (multi)
                </h4>
                <Combobox
                    multiple
                    options={languageOptions}
                    value={multiValue}
                    onChange={(value) => setMultiValue(value)}
                    placeholder="Choose languages..."
                    renderChip={(option, remove) => (
                        <Tag key={String(option.value)} variant="primary">
                            <Icon
                                name={iconMap[String(option.value)] || 'symbol-method'}
                                size="xs"
                            />
                            {option.label}
                            <button
                                type="button"
                                aria-label={`Remove ${option.label}`}
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    remove();
                                }}
                                style={{
                                    marginLeft: 'var(--bk-gap-sm)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon name="close" size="xs" />
                            </button>
                        </Tag>
                    )}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Custom renderGroupHeading
                </h4>
                <Combobox
                    options={groupedOptions}
                    placeholder="Select a technology..."
                    renderGroupHeading={(group) => (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--bk-gap-sm)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            <Icon name="globe" size="xs" />
                            {group.label}
                            <span style={{ color: 'var(--bk-color-foreground-muted)' }}>
                                ({group.options.length})
                            </span>
                        </span>
                    )}
                />
            </div>
        </div>
    );
};

export const CustomRender: Story = {
    render: () => <CustomRenderStory />,
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'Use `renderOption`, `renderValue` (single-select), `renderChip` (multi-select), and `renderGroupHeading` for complete control over appearance. You can add icons, badges, colors, or any custom JSX.',
            },
        },
    },
};

/**
 * Virtualized dropdown for large option sets (~500 items).
 */
export const Virtualized: Story = {
    args: { options: [] },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                minWidth: '320px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Long List (500 items, auto-virtualized)
                </h4>
                <Combobox
                    options={longListOptions}
                    placeholder="Search from 500 items..."
                    clearable
                    maxDropdownHeight="240px"
                />
                <p
                    style={{
                        marginTop: 'var(--bk-spacing-1)',
                        fontSize: 'var(--bk-font-size-xs)',
                        color: 'var(--bk-color-foreground-muted)',
                    }}
                >
                    With 500 options and the default `virtualizeThreshold` of 100, virtualization
                    kicks in automatically. Scroll or use arrow keys to navigate - only visible rows
                    are rendered to the DOM.
                </p>
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Forced Off (`virtualized={'{false}'}`)
                </h4>
                <Combobox
                    options={longListOptions.slice(0, 150)}
                    placeholder="150 items, non-virtualized..."
                    virtualized={false}
                    maxDropdownHeight="240px"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Virtualization is auto-enabled once the number of visible items exceeds `virtualizeThreshold` (default 100), using `@tanstack/react-virtual` to render only the rows in view. You can force it on/off explicitly with the `virtualized` prop regardless of list size.',
            },
        },
    },
};

/**
 * Full width combobox for forms.
 */
export const FullWidth: Story = {
    args: { options: [] },
    render: () => (
        <Combobox
            options={languageOptions}
            placeholder="Select a language..."
            fullWidth
            clearable
        />
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Use the `fullWidth` prop to make the combobox take up 100% of its container width. Useful for form layouts.',
            },
        },
    },
};

/**
 * Controlled combobox with React state.
 */
const ControlledStory = () => {
    const [value, setValue] = useState<string | undefined>('ts');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-gap-md)',
                minWidth: '300px',
            }}
        >
            <Combobox
                options={languageOptions}
                value={value}
                onChange={setValue}
                placeholder="Choose a language..."
                clearable
            />
            <div
                style={{
                    padding: 'var(--bk-padding-md)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                Selected value: <strong>{value ?? 'none'}</strong>
            </div>
        </div>
    );
};

export const Controlled: Story = {
    render: () => <ControlledStory />,
    args: { options: [] },
    parameters: {
        docs: {
            description: {
                story: 'Control the combobox value with React state via the `value` prop and `onChange` callback. Since `value` is set, the component never manages selection internally.',
            },
        },
    },
};

/**
 * Form example with FieldLabel and FormGroup.
 */
const FormExampleStory = () => {
    const [formData, setFormData] = useState({
        language: undefined as string | undefined,
        frameworks: [] as string[],
        team: undefined as string | undefined,
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-4)',
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--bk-color-background-secondary)',
                borderRadius: 'var(--bk-radius-md)',
                minWidth: '420px',
            }}
        >
            <h3
                style={{
                    margin: 0,
                    fontSize: 'var(--bk-font-size-base)',
                    fontWeight: 'var(--bk-font-weight-semibold)',
                }}
            >
                Developer Profile
            </h3>

            <FormGroup>
                <FieldLabel htmlFor="combobox-language" required>
                    Primary Language
                </FieldLabel>
                <Combobox
                    id="combobox-language"
                    options={languageOptions}
                    value={formData.language}
                    onChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                    placeholder="Select a language..."
                    clearable
                    fullWidth
                />
            </FormGroup>

            <FormGroup>
                <FieldLabel htmlFor="combobox-frameworks">Frameworks</FieldLabel>
                <Combobox
                    id="combobox-frameworks"
                    multiple
                    options={groupedOptions}
                    value={formData.frameworks}
                    onChange={(value) => setFormData((prev) => ({ ...prev, frameworks: value }))}
                    placeholder="Select frameworks..."
                    fullWidth
                />
            </FormGroup>

            <FormGroup>
                <FieldLabel htmlFor="combobox-team">Team</FieldLabel>
                <Combobox
                    id="combobox-team"
                    options={basicOptions}
                    value={formData.team}
                    onChange={(value) => setFormData((prev) => ({ ...prev, team: value }))}
                    creatable
                    onCreateOption={(input) => setFormData((prev) => ({ ...prev, team: input }))}
                    placeholder="Select or create a team..."
                    fullWidth
                />
            </FormGroup>

            <div
                style={{
                    marginTop: 'var(--bk-spacing-2)',
                    padding: 'var(--bk-padding-md)',
                    backgroundColor: 'var(--bk-color-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                <div>
                    <strong>Language:</strong> {formData.language ?? 'Not selected'}
                </div>
                <div>
                    <strong>Frameworks ({formData.frameworks.length}):</strong>{' '}
                    {formData.frameworks.length > 0
                        ? formData.frameworks.join(', ')
                        : 'Not selected'}
                </div>
                <div>
                    <strong>Team:</strong> {formData.team ?? 'Not selected'}
                </div>
            </div>
        </div>
    );
};

export const FormExample: Story = {
    render: () => <FormExampleStory />,
    args: { options: [] },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Example of using `Combobox` alongside `FieldLabel` and `FormGroup` for a VSCode-style form layout, mixing single-select, multi-select (grouped), and creatable fields.',
            },
        },
    },
};

/**
 * Comprehensive showcase of all combobox features and variations.
 */
export const Showcase: Story = {
    args: { options: [] },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-6)',
                padding: 'var(--bk-spacing-4)',
            }}
        >
            {/* Sizes */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Sizes
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--bk-gap-md)',
                        maxWidth: '300px',
                    }}
                >
                    <Combobox options={basicOptions} size="xs" placeholder="Extra Small" />
                    <Combobox options={basicOptions} size="sm" placeholder="Small" />
                    <Combobox options={basicOptions} size="md" placeholder="Medium" />
                    <Combobox options={basicOptions} size="lg" placeholder="Large" />
                    <Combobox options={basicOptions} size="xl" placeholder="Extra Large" />
                </div>
            </div>

            {/* Multi-Select */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Multi-Select with Chips
                </h3>
                <div style={{ maxWidth: '340px' }}>
                    <MultiStory />
                </div>
            </div>

            {/* Creatable */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Creatable
                </h3>
                <div style={{ maxWidth: '340px' }}>
                    <CreatableStory />
                </div>
            </div>

            {/* Grouped */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Grouped Options
                </h3>
                <div style={{ maxWidth: '320px' }}>
                    <Combobox
                        options={groupedOptions}
                        placeholder="Select a technology..."
                        clearable
                    />
                </div>
            </div>

            {/* Custom Render */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Custom Render
                </h3>
                <div style={{ maxWidth: '320px' }}>
                    <Combobox
                        options={languageOptions}
                        defaultValue="ts"
                        placeholder="Choose a language..."
                        renderOption={(option, isSelected) => (
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--bk-gap-sm)',
                                }}
                            >
                                <Icon name={iconMap[String(option.value)] || 'symbol-method'} />
                                {option.label}
                                {isSelected && <Icon name="check" style={{ marginLeft: 'auto' }} />}
                            </span>
                        )}
                    />
                </div>
            </div>

            {/* States */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    States
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--bk-gap-md)',
                        maxWidth: '300px',
                    }}
                >
                    <Combobox options={basicOptions} placeholder="Normal state" />
                    <Combobox options={basicOptions} disabled defaultValue="option2" />
                    <Combobox
                        options={basicOptions}
                        placeholder="Required field"
                        error="This field is required"
                    />
                    <Combobox options={[]} loading placeholder="Loading state" />
                </div>
            </div>

            {/* Virtualized */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Virtualized (500 items)
                </h3>
                <div style={{ maxWidth: '320px' }}>
                    <Combobox
                        options={longListOptions}
                        placeholder="Search from 500 items..."
                        maxDropdownHeight="220px"
                    />
                </div>
            </div>

            {/* Full Width */}
            <div>
                <h3
                    style={{
                        marginBottom: 'var(--bk-spacing-3)',
                        fontSize: 'var(--bk-font-size-base)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Full Width
                </h3>
                <Combobox
                    options={languageOptions}
                    placeholder="Full width combobox"
                    fullWidth
                    clearable
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Comprehensive showcase demonstrating all combobox capabilities: sizes, multi-select with chips, creatable options, grouped options, custom rendering, states, virtualization, and full width. Supports keyboard navigation (Arrow Up/Down, Home, End, Enter, Escape, Tab, Backspace) and click-outside-to-close.',
            },
        },
    },
};
