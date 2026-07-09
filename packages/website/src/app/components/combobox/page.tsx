'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Icon, Tag, FieldLabel, FormGroup } from 'baukasten-ui/core';
import { Combobox } from 'baukasten-ui/extra';
import type { ComboboxOption, ComboboxOptions } from 'baukasten-ui/extra';

const comboboxProps: PropDefinition[] = [
    {
        name: 'options',
        type: 'ComboboxOptions<T>',
        required: true,
        description: 'Array of options and/or option groups to display',
    },
    {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description:
            'Enable multiple selection. When true, value is T[] and onChange receives an array',
    },
    {
        name: 'value',
        type: 'T | T[]',
        description: 'Currently selected value(s) (for controlled mode)',
    },
    {
        name: 'defaultValue',
        type: 'T | T[]',
        description: 'Default selected value(s) (for uncontrolled mode)',
    },
    {
        name: 'onChange',
        type: '(value: T | undefined) => void | (value: T[]) => void',
        description: 'Callback when the selection changes',
    },
    {
        name: 'placeholder',
        type: 'string',
        default: '"Select..."',
        description: 'Placeholder text when no value is selected',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the combobox',
    },
    {
        name: 'position',
        type: '"auto" | "top" | "bottom"',
        default: '"auto"',
        description: 'Dropdown position preference',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the combobox is disabled',
    },
    {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Whether the combobox should take full width of its container',
    },
    {
        name: 'error',
        type: 'string',
        description: 'Error message displayed below the combobox',
    },
    {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show a "clear" button when a value is selected',
    },
    {
        name: 'creatable',
        type: 'boolean',
        default: 'false',
        description: 'Whether to allow creating a new option from the typed input',
    },
    {
        name: 'onCreateOption',
        type: '(input: string) => void',
        description: 'Callback fired when the user chooses to create a new option',
    },
    {
        name: 'isValidNewOption',
        type: '(input: string, current: ComboboxOption<T>[]) => boolean',
        description:
            'Determines whether the current input is a valid new option. Default: non-empty input is valid',
    },
    {
        name: 'formatCreateLabel',
        type: '(input: string) => React.ReactNode',
        default: '`Create "input"`',
        description: 'Formats the label shown in the create row',
    },
    {
        name: 'filterOption',
        type: '(option: ComboboxOption<T>, input: string) => boolean',
        description: 'Custom filter function used while typing',
    },
    {
        name: 'virtualized',
        type: 'boolean',
        description:
            'Whether to virtualize the options list. Auto-enabled above virtualizeThreshold',
    },
    {
        name: 'virtualizeThreshold',
        type: 'number',
        default: '100',
        description: 'Number of visible items above which virtualization is auto-enabled',
    },
    {
        name: 'renderOption',
        type: '(option: ComboboxOption<T>, isSelected: boolean) => React.ReactNode',
        description: 'Custom render function for options in the dropdown',
    },
    {
        name: 'renderGroupHeading',
        type: '(group: ComboboxOptionGroup<T>) => React.ReactNode',
        description: 'Custom render function for group headings',
    },
    {
        name: 'renderValue',
        type: '(option: ComboboxOption<T>) => React.ReactNode',
        description: 'Custom render function for the selected value display (single-select only)',
    },
    {
        name: 'renderChip',
        type: '(option: ComboboxOption<T>, remove: () => void) => React.ReactNode',
        description: 'Custom render function for a removable chip (multi-select only)',
    },
    {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Whether the combobox is in a loading state',
    },
    {
        name: 'loadingMessage',
        type: 'React.ReactNode',
        default: '"Loading..."',
        description: 'Message shown while loading is true',
    },
    {
        name: 'noOptionsMessage',
        type: 'React.ReactNode',
        default: '"No options found"',
        description: 'Message shown when no options match the current input',
    },
    {
        name: 'maxDropdownHeight',
        type: 'string',
        default: '"300px"',
        description: 'Maximum height for the options list within the dropdown',
    },
    {
        name: 'onOpen',
        type: '() => void',
        description: 'Callback when dropdown opens',
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback when dropdown closes',
    },
    {
        name: 'id',
        type: 'string',
        description: 'Unique identifier for the inline input element (for label association)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name for the container',
    },
    {
        name: 'dropdownClassName',
        type: 'string',
        description: 'Additional CSS class name for the dropdown portal',
    },
];

const comboboxOptionProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'T',
        required: true,
        description: 'The value of the option',
    },
    {
        name: 'label',
        type: 'string',
        description: 'The label displayed for the option (optional if using renderOption)',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the option is disabled',
    },
];

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
];

const optionsWithDisabled: ComboboxOption[] = [
    { value: '1', label: 'Available Option 1' },
    { value: '2', label: 'Disabled Option', disabled: true },
    { value: '3', label: 'Available Option 2' },
    { value: '4', label: 'Also Disabled', disabled: true },
    { value: '5', label: 'Available Option 3' },
];

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
];

const longListOptions: ComboboxOption[] = Array.from({ length: 500 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Item ${i + 1}`,
}));

// Multi-select example
function MultiSelectExample() {
    const [selected, setSelected] = useState<string[]>(['ts', 'go']);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-3)',
                minWidth: '350px',
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
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-1)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Selected ({selected.length}):
                </div>
                {selected.length > 0 ? (
                    <div>
                        {selected.map((val) => {
                            const option = languageOptions.find((opt) => opt.value === val);
                            return (
                                <div
                                    key={val}
                                    style={{ color: 'var(--vscode-descriptionForeground)' }}
                                >
                                    • {option?.label}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ color: 'var(--vscode-descriptionForeground)' }}>
                        None selected
                    </div>
                )}
            </div>
        </div>
    );
}

// Creatable example
function CreatableExample() {
    const [options, setOptions] = useState<ComboboxOption[]>(basicOptions);
    const [value, setValue] = useState<string | undefined>();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-3)',
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
            />
            <div
                style={{
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                Current value: <strong>{value ?? 'none'}</strong>
            </div>
        </div>
    );
}

// Custom render example
function CustomRenderExample() {
    const [multiValue, setMultiValue] = useState<string[]>(['js', 'ts']);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-4)',
                minWidth: '320px',
            }}
        >
            <div>
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Custom renderOption
                </div>
                <Combobox
                    options={languageOptions}
                    defaultValue="ts"
                    placeholder="Choose a language..."
                    renderOption={(option, isSelected) => (
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--bk-spacing-2)',
                            }}
                        >
                            <Icon name="symbol-method" />
                            {option.label}
                            {isSelected && <Icon name="check" style={{ marginLeft: 'auto' }} />}
                        </span>
                    )}
                />
            </div>

            <div>
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-sm)',
                        fontWeight: 'var(--bk-font-weight-medium)',
                    }}
                >
                    Custom renderChip (multi-select)
                </div>
                <Combobox
                    multiple
                    options={languageOptions}
                    value={multiValue}
                    onChange={(value) => setMultiValue(value)}
                    placeholder="Choose languages..."
                    renderChip={(option, remove) => (
                        <Tag key={String(option.value)} variant="primary">
                            <Icon name="symbol-method" size="xs" />
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
                                    marginLeft: 'var(--bk-spacing-2)',
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
        </div>
    );
}

// Controlled example
function ControlledExample() {
    const [value, setValue] = useState<string | undefined>('ts');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-3)',
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
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-sm)',
                }}
            >
                Selected value: <strong>{value ?? 'none'}</strong>
            </div>
        </div>
    );
}

// Form example
function FormExample() {
    const [formData, setFormData] = useState<{
        language: string | undefined;
        frameworks: string[];
        team: string | undefined;
    }>({
        language: undefined,
        frameworks: [],
        team: undefined,
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-4)',
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
                maxWidth: '500px',
            }}
        >
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
                    padding: 'var(--bk-spacing-3)',
                    backgroundColor: 'var(--vscode-input-background)',
                    borderRadius: 'var(--bk-radius-sm)',
                    fontSize: 'var(--bk-font-size-xs)',
                    fontFamily: 'var(--vscode-editor-font-family)',
                }}
            >
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontWeight: 'var(--bk-font-weight-semibold)',
                    }}
                >
                    Form Data:
                </div>
                <pre style={{ margin: 0 }}>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
}

export default function ComboboxPage() {
    return (
        <PageLayout
            title="Combobox"
            description="An advanced, react-select-style combobox with inline typeahead search, removable chips for multi-select, creatable options, clearable selection, option grouping, and virtualized lists for large datasets. Built on the same Floating UI / portal / keyboard patterns as Select, but uses an inline input control instead of a button trigger."
        >
            <Showcase
                title="Basic Usage"
                description="Combobox filters options as you type directly into the control. Each option requires a value and label. Supports both controlled (value + onChange) and uncontrolled (defaultValue) modes."
                preview={
                    <div style={{ minWidth: '300px' }}>
                        <Combobox
                            options={basicOptions}
                            placeholder="Select an option..."
                            defaultValue="option2"
                        />
                    </div>
                }
                code={`import { Combobox } from 'baukasten-ui/extra';
import type { ComboboxOption } from 'baukasten-ui/extra';

const options: ComboboxOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

function App() {
  return (
    <Combobox
      options={options}
      placeholder="Select an option..."
      defaultValue="option2"
    />
  );
}`}
                props={comboboxProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Chips and dropdown options scale accordingly."
                preview={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--bk-spacing-3)',
                            minWidth: '300px',
                        }}
                    >
                        <Combobox options={basicOptions} size="xs" placeholder="Extra Small" />
                        <Combobox options={basicOptions} size="sm" placeholder="Small" />
                        <Combobox options={basicOptions} size="md" placeholder="Medium (default)" />
                        <Combobox options={basicOptions} size="lg" placeholder="Large" />
                        <Combobox options={basicOptions} size="xl" placeholder="Extra Large" />
                    </div>
                }
                code={`<Combobox options={options} size="xs" placeholder="Extra Small" />
<Combobox options={options} size="sm" placeholder="Small" />
<Combobox options={options} size="md" placeholder="Medium (default)" />
<Combobox options={options} size="lg" placeholder="Large" />
<Combobox options={options} size="xl" placeholder="Extra Large" />`}
            />

            <Showcase
                title="Multi-Select"
                description="Enable multiple selection with the multiple prop. Chosen options render as removable Tag chips inline inside the control. Combine with clearable to remove all selections at once."
                preview={<MultiSelectExample />}
                code={`import { useState } from 'react';
import { Combobox } from 'baukasten-ui/extra';

function App() {
  const [selected, setSelected] = useState<string[]>(['ts', 'go']);

  return (
    <Combobox
      multiple
      options={languageOptions}
      value={selected}
      onChange={setSelected}
      placeholder="Select programming languages..."
      clearable
    />
  );
}`}
            />

            <Showcase
                title="Grouped Options"
                description="Pass ComboboxOptionGroup entries (objects with a label and options array) alongside plain options to render labeled sections. Group headings are non-interactive, and filtering hides groups whose options are all filtered out."
                preview={
                    <div style={{ minWidth: '320px' }}>
                        <Combobox
                            options={groupedOptions}
                            placeholder="Select a technology..."
                            clearable
                        />
                    </div>
                }
                code={`import { Combobox } from 'baukasten-ui/extra';
import type { ComboboxOptions } from 'baukasten-ui/extra';

const groupedOptions: ComboboxOptions = [
  {
    label: 'Frontend',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
    ],
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust', disabled: true },
    ],
  },
];

<Combobox options={groupedOptions} placeholder="Select a technology..." clearable />`}
            />

            <Showcase
                title="Creatable"
                description="Enable creatable to let users add a new option from typed text that has no exact match. The create row appears at the bottom of the list, and onCreateOption receives the trimmed input so you can add it to your data source."
                preview={<CreatableExample />}
                code={`import { useState } from 'react';
import { Combobox } from 'baukasten-ui/extra';
import type { ComboboxOption } from 'baukasten-ui/extra';

function App() {
  const [options, setOptions] = useState<ComboboxOption[]>(basicOptions);
  const [value, setValue] = useState<string | undefined>();

  return (
    <Combobox
      options={options}
      value={value}
      onChange={setValue}
      creatable
      placeholder="Select or create an option..."
      onCreateOption={(input) => {
        const newOption = { value: input, label: input };
        setOptions((prev) => [...prev, newOption]);
        setValue(input);
      }}
    />
  );
}`}
            />

            <Showcase
                title="Custom Render"
                description="Use renderOption, renderValue (single-select), renderChip (multi-select), and renderGroupHeading for complete control over appearance. You can add icons, badges, colors, or any custom JSX."
                preview={<CustomRenderExample />}
                code={`// Custom option render
<Combobox
  options={languageOptions}
  renderOption={(option, isSelected) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
      <Icon name="symbol-method" />
      {option.label}
      {isSelected && <Icon name="check" style={{ marginLeft: 'auto' }} />}
    </span>
  )}
/>

// Custom chip render (multi-select)
<Combobox
  multiple
  options={languageOptions}
  value={value}
  onChange={setValue}
  renderChip={(option, remove) => (
    <Tag variant="primary">
      {option.label}
      <button onClick={remove}>
        <Icon name="close" size="xs" />
      </button>
    </Tag>
  )}
/>`}
            />

            <Showcase
                title="States"
                description="Combobox supports various states: disabled (entire control), error (with error message), loading (shows a spinner and loading message instead of the options list), and individually disabled options."
                preview={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--bk-spacing-4)',
                            minWidth: '300px',
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    marginBottom: 'var(--bk-spacing-2)',
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontWeight: 'var(--bk-font-weight-medium)',
                                }}
                            >
                                Disabled
                            </div>
                            <Combobox options={basicOptions} disabled defaultValue="option2" />
                        </div>
                        <div>
                            <div
                                style={{
                                    marginBottom: 'var(--bk-spacing-2)',
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontWeight: 'var(--bk-font-weight-medium)',
                                }}
                            >
                                Error State
                            </div>
                            <Combobox
                                options={basicOptions}
                                placeholder="Select an option..."
                                error="This field is required"
                            />
                        </div>
                        <div>
                            <div
                                style={{
                                    marginBottom: 'var(--bk-spacing-2)',
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontWeight: 'var(--bk-font-weight-medium)',
                                }}
                            >
                                Loading
                            </div>
                            <Combobox options={[]} loading placeholder="Fetching options..." />
                        </div>
                        <div>
                            <div
                                style={{
                                    marginBottom: 'var(--bk-spacing-2)',
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontWeight: 'var(--bk-font-weight-medium)',
                                }}
                            >
                                With Disabled Options
                            </div>
                            <Combobox
                                options={optionsWithDisabled}
                                placeholder="Some options are disabled"
                            />
                        </div>
                    </div>
                }
                code={`// Disabled
<Combobox options={options} disabled defaultValue="option2" />

// Error state
<Combobox options={options} placeholder="Select an option..." error="This field is required" />

// Loading state
<Combobox options={[]} loading placeholder="Fetching options..." />

// Disabled options
const optionsWithDisabled = [
  { value: '1', label: 'Available Option 1' },
  { value: '2', label: 'Disabled Option', disabled: true },
];

<Combobox options={optionsWithDisabled} placeholder="Some options are disabled" />`}
            />

            <Showcase
                title="Virtualized Lists"
                description="Virtualization is auto-enabled once the number of visible items exceeds virtualizeThreshold (default 100), using @tanstack/react-virtual to render only the rows in view. Force it on/off explicitly with the virtualized prop regardless of list size."
                preview={
                    <div style={{ minWidth: '320px' }}>
                        <Combobox
                            options={longListOptions}
                            placeholder="Search from 500 items..."
                            clearable
                            maxDropdownHeight="240px"
                        />
                    </div>
                }
                code={`const longListOptions = Array.from({ length: 500 }, (_, i) => ({
  value: \`item-\${i + 1}\`,
  label: \`Item \${i + 1}\`,
}));

<Combobox
  options={longListOptions}
  placeholder="Search from 500 items..."
  clearable
  maxDropdownHeight="240px"
/>`}
            />

            <Showcase
                title="Controlled Combobox"
                description="Control the combobox value with React state using the value prop and onChange callback."
                preview={<ControlledExample />}
                code={`import { useState } from 'react';
import { Combobox } from 'baukasten-ui/extra';

function App() {
  const [value, setValue] = useState<string | undefined>('ts');

  return (
    <>
      <Combobox
        options={languageOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a language..."
        clearable
      />
      <div>Selected value: <strong>{value ?? 'none'}</strong></div>
    </>
  );
}`}
            />

            <Showcase
                title="Full Width & Positioning"
                description="Use the fullWidth prop to make the combobox take 100% of its container width. Control dropdown position with the position prop: auto (default), top (always above), or bottom (always below)."
                preview={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--bk-spacing-4)',
                            width: '100%',
                            maxWidth: '500px',
                        }}
                    >
                        <Combobox
                            options={languageOptions}
                            placeholder="Full width combobox"
                            clearable
                            fullWidth
                        />
                        <Combobox
                            options={basicOptions}
                            position="bottom"
                            placeholder="Always opens below"
                        />
                    </div>
                }
                code={`// Full width
<Combobox options={options} placeholder="Full width combobox" fullWidth />

// Position variants
<Combobox options={options} position="auto" placeholder="Auto (default)" />
<Combobox options={options} position="top" placeholder="Always opens above" />
<Combobox options={options} position="bottom" placeholder="Always opens below" />`}
            />

            <Showcase
                title="Form Example"
                description="Example of using Combobox alongside FieldLabel and FormGroup, mixing single-select, multi-select (grouped), and creatable fields in a single form."
                preview={<FormExample />}
                code={`import { useState } from 'react';
import { Combobox } from 'baukasten-ui/extra';
import { FieldLabel, FormGroup } from 'baukasten-ui/core';

function DeveloperProfileForm() {
  const [formData, setFormData] = useState({
    language: undefined,
    frameworks: [],
    team: undefined,
  });

  return (
    <>
      <FormGroup>
        <FieldLabel htmlFor="combobox-language" required>Primary Language</FieldLabel>
        <Combobox
          id="combobox-language"
          options={languageOptions}
          value={formData.language}
          onChange={(value) => setFormData({ ...formData, language: value })}
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
          onChange={(value) => setFormData({ ...formData, frameworks: value })}
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
          onChange={(value) => setFormData({ ...formData, team: value })}
          creatable
          onCreateOption={(input) => setFormData({ ...formData, team: input })}
          placeholder="Select or create a team..."
          fullWidth
        />
      </FormGroup>
    </>
  );
}`}
                props={[
                    ...comboboxProps,
                    { name: '---', type: '---', description: 'ComboboxOption<T> Interface:' },
                    ...comboboxOptionProps,
                ]}
            />
        </PageLayout>
    );
}
