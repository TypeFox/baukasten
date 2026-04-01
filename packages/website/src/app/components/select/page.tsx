'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Select, Icon, Heading } from 'baukasten-ui/core';
import type { SelectOption } from 'baukasten-ui/core';

const selectProps: PropDefinition[] = [
    {
        name: 'options',
        type: 'SelectOption<T>[]',
        required: true,
        description: 'Array of options to display in the dropdown',
    },
    {
        name: 'value',
        type: 'T',
        description: 'Currently selected value (for controlled mode)',
    },
    {
        name: 'defaultValue',
        type: 'T',
        description: 'Default selected value (for uncontrolled mode)',
    },
    {
        name: 'onChange',
        type: '(value: T) => void',
        description: 'Callback when value changes',
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
        name: 'placeholder',
        type: 'string',
        default: '"Select an option..."',
        description: 'Placeholder text when no value is selected',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the select',
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
        description: 'Whether the select is disabled',
    },
    {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Whether the select should take full width',
    },
    {
        name: 'searchable',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show a search input',
    },
    {
        name: 'searchPlaceholder',
        type: 'string',
        default: '"Search..."',
        description: 'Placeholder for search input',
    },
    {
        name: 'error',
        type: 'string',
        description: 'Error message displayed below the select',
    },
    {
        name: 'filterOption',
        type: '(option: SelectOption<T>, searchValue: string) => boolean',
        description: 'Custom filter function for searchable select',
    },
    {
        name: 'renderOption',
        type: '(option: SelectOption<T>, isSelected: boolean) => React.ReactNode',
        description: 'Custom render function for options in the dropdown',
    },
    {
        name: 'renderValue',
        type: '(option: SelectOption<T>) => React.ReactNode',
        description: 'Custom render function for the selected value display',
    },
    {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Enable multiple selection. When true, value should be an array and onChange receives an array',
    },
    {
        name: 'maxDropdownHeight',
        type: 'string',
        default: '"300px"',
        description: 'Maximum height for the dropdown menu',
    },
    {
        name: 'showDescriptionPanel',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show description panel at bottom of dropdown (only when descriptions exist)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const selectOptionProps: PropDefinition[] = [
    {
        name: 'value',
        type: 'T',
        required: true,
        description: 'The value of the option',
    },
    {
        name: 'label',
        type: 'string',
        description: 'The label displayed for the option',
    },
    {
        name: 'description',
        type: 'string',
        description: 'Optional description used for search filtering and displayed in description panel',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the option is disabled',
    },
    {
        name: 'defaultLabel',
        type: 'string',
        description: 'Optional label shown on the right side (e.g., "default", "recommended")',
    },
];

const basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

const languageOptions: SelectOption[] = [
    { value: 'js', label: 'JavaScript', description: 'JavaScript - Dynamic scripting language' },
    { value: 'ts', label: 'TypeScript', description: 'TypeScript - Typed superset of JavaScript', defaultLabel: 'recommended' },
    { value: 'py', label: 'Python', description: 'Python - High-level general purpose language' },
    { value: 'java', label: 'Java', description: 'Java - Object-oriented enterprise language' },
    { value: 'cpp', label: 'C++', description: 'C++ - Systems programming language' },
    { value: 'go', label: 'Go', description: 'Go - Concurrent programming language' },
    { value: 'rust', label: 'Rust', description: 'Rust - Memory-safe systems language' },
];

const optionsWithDisabled: SelectOption[] = [
    { value: '1', label: 'Available Option 1' },
    { value: '2', label: 'Disabled Option', disabled: true },
    { value: '3', label: 'Available Option 2' },
    { value: '4', label: 'Also Disabled', disabled: true },
    { value: '5', label: 'Available Option 3' },
];

// Form example
function FormExample() {
    const [formData, setFormData] = useState({
        language: '',
        country: '',
        experience: '',
    });

    const countryOptions: SelectOption[] = [
        { value: 'us', label: 'United States', description: 'United States of America' },
        { value: 'uk', label: 'United Kingdom', description: 'United Kingdom of Great Britain' },
        { value: 'ca', label: 'Canada', description: 'Canada' },
        { value: 'de', label: 'Germany', description: 'Federal Republic of Germany' },
        { value: 'fr', label: 'France', description: 'French Republic' },
        { value: 'jp', label: 'Japan', description: 'Japan - Nippon' },
    ];

    const experienceOptions: SelectOption[] = [
        { value: 'junior', label: 'Junior (0-2 years)' },
        { value: 'mid', label: 'Mid-level (3-5 years)' },
        { value: 'senior', label: 'Senior (6-10 years)' },
        { value: 'lead', label: 'Lead (10+ years)' },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-4)',
            padding: 'var(--bk-spacing-4)',
            backgroundColor: 'var(--vscode-textBlockQuote-background)',
            borderRadius: 'var(--bk-radius-md)',
            maxWidth: '500px',
        }}>
            <Heading level={4}>Developer Profile</Heading>

            <div>
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--bk-spacing-1)',
                    fontSize: 'var(--bk-font-size-sm)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                }}>
                    Primary Language *
                </label>
                <Select
                    options={languageOptions}
                    value={formData.language}
                    onChange={(value) => setFormData({ ...formData, language: value as string })}
                    placeholder="Select a language..."
                    searchable
                    fullWidth
                />
            </div>

            <div>
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--bk-spacing-1)',
                    fontSize: 'var(--bk-font-size-sm)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                }}>
                    Country
                </label>
                <Select
                    options={countryOptions}
                    value={formData.country}
                    onChange={(value) => setFormData({ ...formData, country: value as string })}
                    placeholder="Select a country..."
                    searchable
                    fullWidth
                />
            </div>

            <div>
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--bk-spacing-1)',
                    fontSize: 'var(--bk-font-size-sm)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                }}>
                    Experience Level
                </label>
                <Select
                    options={experienceOptions}
                    value={formData.experience}
                    onChange={(value) => setFormData({ ...formData, experience: value as string })}
                    placeholder="Select experience level..."
                    fullWidth
                />
            </div>

            <div style={{
                marginTop: 'var(--bk-spacing-2)',
                padding: 'var(--bk-spacing-3)',
                backgroundColor: 'var(--vscode-input-background)',
                borderRadius: 'var(--bk-radius-sm)',
                fontSize: 'var(--bk-font-size-xs)',
                fontFamily: 'var(--vscode-editor-font-family)',
            }}>
                <div style={{ marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Form Data:
                </div>
                <pre style={{ margin: 0 }}>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
}

// Multi-select example
function MultiSelectExample() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', minWidth: '350px' }}>
            <Select
                multiple
                options={languageOptions}
                value={selected}
                onChange={(value) => {
                    if (Array.isArray(value)) {
                        setSelected(value);
                    }
                }}
                placeholder="Select programming languages..."
                searchable
                searchPlaceholder="Search languages..."
            />
            <div style={{
                padding: 'var(--bk-spacing-3)',
                backgroundColor: 'var(--vscode-input-background)',
                borderRadius: 'var(--bk-radius-sm)',
                fontSize: 'var(--bk-font-size-sm)',
            }}>
                <div style={{ marginBottom: 'var(--bk-spacing-1)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Selected ({selected.length}):
                </div>
                {selected.length > 0 ? (
                    <div>
                        {selected.map((val) => {
                            const option = languageOptions.find((opt) => opt.value === val);
                            return (
                                <div key={val} style={{ color: 'var(--vscode-descriptionForeground)' }}>
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

// Multi-select form example
function MultiSelectFormExample() {
    const [formData, setFormData] = useState({
        languages: [] as string[],
        frameworks: [] as string[],
    });

    const frameworkOptions: SelectOption[] = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-4)',
            padding: 'var(--bk-spacing-4)',
            backgroundColor: 'var(--vscode-textBlockQuote-background)',
            borderRadius: 'var(--bk-radius-md)',
            maxWidth: '500px',
        }}>
            <Heading level={4}>Technical Skills</Heading>

            <div>
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--bk-spacing-1)',
                    fontSize: 'var(--bk-font-size-sm)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                }}>
                    Programming Languages
                </label>
                <Select
                    multiple
                    options={languageOptions}
                    value={formData.languages}
                    onChange={(value) => setFormData({ ...formData, languages: Array.isArray(value) ? value : [] })}
                    placeholder="Select languages..."
                    searchable
                    fullWidth
                />
            </div>

            <div>
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--bk-spacing-1)',
                    fontSize: 'var(--bk-font-size-sm)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                }}>
                    Frameworks
                </label>
                <Select
                    multiple
                    options={frameworkOptions}
                    value={formData.frameworks}
                    onChange={(value) => setFormData({ ...formData, frameworks: Array.isArray(value) ? value : [] })}
                    placeholder="Select frameworks..."
                    searchable
                    fullWidth
                />
            </div>

            <div style={{
                marginTop: 'var(--bk-spacing-2)',
                padding: 'var(--bk-spacing-3)',
                backgroundColor: 'var(--vscode-input-background)',
                borderRadius: 'var(--bk-radius-sm)',
                fontSize: 'var(--bk-font-size-xs)',
                fontFamily: 'var(--vscode-editor-font-family)',
            }}>
                <div style={{ marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Form Data:
                </div>
                <pre style={{ margin: 0 }}>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
}

export default function SelectPage() {
    return (
        <PageLayout
            title="Select"
            description="A custom select dropdown component with keyboard navigation, search functionality, auto-positioning, and contextual descriptions. Features a description panel, default/recommended labels, and fully integrates with VSCode theme variables."
        >
            <Showcase
                title="Basic Usage"
                description="Select displays a dropdown menu of options. Each option requires a value and label. The component supports both controlled (value + onChange) and uncontrolled (defaultValue) modes."
                preview={
                    <div style={{ minWidth: '300px' }}>
                        <Select
                            options={basicOptions}
                            placeholder="Select an option..."
                            defaultValue="option2"
                        />
                    </div>
                }
                code={`import { Select } from 'baukasten-ui/core';
import type { SelectOption } from 'baukasten-ui/core';

const options: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

function App() {
  return (
    <Select
      options={options}
      placeholder="Select an option..."
      defaultValue="option2"
    />
  );
}`}
                props={selectProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Options inside the dropdown scale accordingly."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', minWidth: '300px' }}>
                        <Select options={basicOptions} size="xs" placeholder="Extra Small" />
                        <Select options={basicOptions} size="sm" placeholder="Small" />
                        <Select options={basicOptions} size="md" placeholder="Medium (default)" />
                        <Select options={basicOptions} size="lg" placeholder="Large" />
                        <Select options={basicOptions} size="xl" placeholder="Extra Large" />
                    </div>
                }
                code={`<Select options={options} size="xs" placeholder="Extra Small" />
<Select options={options} size="sm" placeholder="Small" />
<Select options={options} size="md" placeholder="Medium (default)" />
<Select options={options} size="lg" placeholder="Large" />
<Select options={options} size="xl" placeholder="Extra Large" />`}
            />

            <Showcase
                title="Searchable with Descriptions"
                description="Enable search with the searchable prop. Search matches against the description field if provided, otherwise falls back to label. When options have descriptions, they are displayed in a panel at the bottom of the dropdown as you hover or navigate through options."
                preview={
                    <div style={{ minWidth: '350px' }}>
                        <Select
                            options={languageOptions}
                            searchable
                            placeholder="Search programming languages..."
                            searchPlaceholder="Try typing 'typed' or 'memory'"
                        />
                        <p style={{ marginTop: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                            Search matches against descriptions. Hover over options to see descriptions in the panel below.
                        </p>
                    </div>
                }
                code={`const languages: SelectOption[] = [
  { 
    value: 'js', 
    label: 'JavaScript', 
    description: 'JavaScript - Dynamic scripting language' 
  },
  { 
    value: 'ts', 
    label: 'TypeScript', 
    description: 'TypeScript - Typed superset of JavaScript',
    defaultLabel: 'recommended' 
  },
  { 
    value: 'rust', 
    label: 'Rust', 
    description: 'Rust - Memory-safe systems language' 
  },
];

<Select
  options={languages}
  searchable
  placeholder="Search programming languages..."
  searchPlaceholder="Try typing 'typed' or 'memory'"
/>`}
            />

            <Showcase
                title="Default Labels"
                description="Options can have a defaultLabel property that displays right-aligned muted text (e.g., 'default', 'recommended'). This helps guide users toward preferred choices."
                preview={
                    <div style={{ minWidth: '350px' }}>
                        <Select
                            options={[
                                { value: 'chrome', label: 'Google Chrome', defaultLabel: 'default' },
                                { value: 'firefox', label: 'Mozilla Firefox', defaultLabel: 'recommended' },
                                { value: 'safari', label: 'Safari' },
                                { value: 'edge', label: 'Microsoft Edge' },
                                { value: 'brave', label: 'Brave Browser' },
                            ]}
                            placeholder="Select your browser..."
                            defaultValue="chrome"
                        />
                        <p style={{ marginTop: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                            Default labels appear on the right in muted text
                        </p>
                    </div>
                }
                code={`const browserOptions: SelectOption[] = [
  { value: 'chrome', label: 'Google Chrome', defaultLabel: 'default' },
  { value: 'firefox', label: 'Mozilla Firefox', defaultLabel: 'recommended' },
  { value: 'safari', label: 'Safari' },
  { value: 'edge', label: 'Microsoft Edge' },
];

<Select
  options={browserOptions}
  placeholder="Select your browser..."
  defaultValue="chrome"
/>`}
            />

            <Showcase
                title="Custom Render with Icons"
                description="Use renderOption and renderValue for complete control over appearance. You can add icons, badges, colors, or any custom JSX."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', minWidth: '300px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                With Icons
                            </div>
                            <Select
                                options={[
                                    { value: 'js', label: 'JavaScript' },
                                    { value: 'ts', label: 'TypeScript' },
                                    { value: 'py', label: 'Python' },
                                ]}
                                placeholder="Choose a language..."
                                defaultValue="ts"
                                renderOption={(option) => (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                        <Icon name="symbol-method" />
                                        {option.label}
                                    </span>
                                )}
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                With Status Colors
                            </div>
                            <Select
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'completed', label: 'Completed' },
                                ]}
                                placeholder="Select status..."
                                renderOption={(option) => {
                                    const colors: Record<string, string> = {
                                        active: '#4caf50',
                                        pending: '#ff9800',
                                        completed: '#2196f3',
                                    };
                                    return (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                                            <span style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: colors[option.value as string],
                                            }} />
                                            {option.label}
                                        </span>
                                    );
                                }}
                            />
                        </div>
                    </div>
                }
                code={`// With icons
<Select
  options={languageOptions}
  placeholder="Choose a language..."
  renderOption={(option) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
      <Icon name="symbol-method" />
      {option.label}
    </span>
  )}
/>

// With status colors
<Select
  options={statusOptions}
  placeholder="Select status..."
  renderOption={(option) => {
    const colors = {
      active: '#4caf50',
      pending: '#ff9800',
      completed: '#2196f3',
    };
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: colors[option.value],
        }} />
        {option.label}
      </span>
    );
  }}
/>`}
            />

            <Showcase
                title="States"
                description="Select supports various states: disabled (entire select), error (with error message), and disabled options (individual options can be disabled)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', minWidth: '300px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Disabled Select
                            </div>
                            <Select
                                options={basicOptions}
                                disabled
                                defaultValue="option2"
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Error State
                            </div>
                            <Select
                                options={basicOptions}
                                placeholder="Select an option..."
                                error="This field is required"
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                With Disabled Options
                            </div>
                            <Select
                                options={optionsWithDisabled}
                                placeholder="Some options are disabled"
                            />
                        </div>
                    </div>
                }
                code={`// Disabled select
<Select
  options={options}
  disabled
  defaultValue="option2"
/>

// Error state
<Select
  options={options}
  placeholder="Select an option..."
  error="This field is required"
/>

// Disabled options
const optionsWithDisabled: SelectOption[] = [
  { value: '1', label: 'Available Option 1' },
  { value: '2', label: 'Disabled Option', disabled: true },
  { value: '3', label: 'Available Option 2' },
];

<Select
  options={optionsWithDisabled}
  placeholder="Some options are disabled"
/>`}
            />

            <Showcase
                title="Controlled Select"
                description="Control the select value with React state. Use the value prop and onChange callback for controlled behavior."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', minWidth: '300px' }}>
                        {(() => {
                            const [value, setValue] = useState('ts');
                            return (
                                <>
                                    <Select
                                        options={languageOptions}
                                        value={value}
                                        onChange={(val) => setValue(val as string)}
                                        placeholder="Choose a language..."
                                    />
                                    <div style={{
                                        padding: 'var(--bk-spacing-3)',
                                        backgroundColor: 'var(--vscode-input-background)',
                                        borderRadius: 'var(--bk-radius-sm)',
                                        fontSize: 'var(--bk-font-size-sm)',
                                    }}>
                                        Selected value: <strong>{value || 'none'}</strong>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                }
                code={`import { useState } from 'react';
import { Select } from 'baukasten-ui/core';

function App() {
  const [value, setValue] = useState('ts');

  return (
    <>
      <Select
        options={languageOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a language..."
      />
      <div>
        Selected value: <strong>{value}</strong>
      </div>
    </>
  );
}`}
            />

            <Showcase
                title="Multi-Select"
                description="Enable multiple selection with the multiple prop. Users can select multiple options using checkboxes. The dropdown stays open after selection, and the trigger shows the count of selected items."
                preview={<MultiSelectExample />}
                code={`import { useState } from 'react';
import { Select } from 'baukasten-ui/core';
import type { SelectOption } from 'baukasten-ui/core';

const languageOptions: SelectOption[] = [
  { value: 'js', label: 'JavaScript', description: 'Dynamic scripting language' },
  { value: 'ts', label: 'TypeScript', description: 'Typed superset of JavaScript' },
  { value: 'py', label: 'Python', description: 'High-level general purpose language' },
  { value: 'rust', label: 'Rust', description: 'Memory-safe systems language' },
];

function App() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Select
      multiple
      options={languageOptions}
      value={selected}
      onChange={setSelected}
      placeholder="Select programming languages..."
      searchable
      searchPlaceholder="Search languages..."
    />
  );
}`}
            />

            <Showcase
                title="Multi-Select in Forms"
                description="Multi-select components work seamlessly in forms. Each select independently manages its array of selected values. Combine with searchable for easy selection from large option lists."
                preview={<MultiSelectFormExample />}
                code={`import { useState } from 'react';
import { Select } from 'baukasten-ui/core';

function TechnicalSkillsForm() {
  const [formData, setFormData] = useState({
    languages: [],
    frameworks: [],
  });

  return (
    <div>
      <h4>Technical Skills</h4>

      <div>
        <label>Programming Languages</label>
        <Select
          multiple
          options={languageOptions}
          value={formData.languages}
          onChange={(value) =>
            setFormData({ ...formData, languages: value })
          }
          placeholder="Select languages..."
          searchable
          fullWidth
        />
      </div>

      <div>
        <label>Frameworks</label>
        <Select
          multiple
          options={frameworkOptions}
          value={formData.frameworks}
          onChange={(value) =>
            setFormData({ ...formData, frameworks: value })
          }
          placeholder="Select frameworks..."
          searchable
          fullWidth
        />
      </div>
    </div>
  );
}`}
            />

            <Showcase
                title="Full Width & Positioning"
                description="Use the fullWidth prop to make the select take 100% of its container width. Control dropdown position with the position prop: auto (default, calculates best position), top (always above), or bottom (always below)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '100%', maxWidth: '500px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Full Width
                            </div>
                            <Select
                                options={languageOptions}
                                placeholder="Full width select"
                                searchable
                                fullWidth
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Position: Bottom
                            </div>
                            <Select
                                options={basicOptions}
                                position="bottom"
                                placeholder="Always opens below"
                            />
                        </div>
                    </div>
                }
                code={`// Full width
<Select
  options={options}
  placeholder="Full width select"
  fullWidth
/>

// Position variants
<Select options={options} position="auto" placeholder="Auto (default)" />
<Select options={options} position="top" placeholder="Always opens above" />
<Select options={options} position="bottom" placeholder="Always opens below" />`}
            />

            <Showcase
                title="Form Example"
                description="Example of using multiple Select components in a form with controlled state. Each select updates the form data independently."
                preview={<FormExample />}
                code={`import { useState } from 'react';
import { Select } from 'baukasten-ui/core';

function DeveloperProfileForm() {
  const [formData, setFormData] = useState({
    language: '',
    country: '',
    experience: '',
  });

  return (
    <div>
      <h4>Developer Profile</h4>
      
      <div>
        <label>Primary Language *</label>
        <Select
          options={languageOptions}
          value={formData.language}
          onChange={(value) => 
            setFormData({ ...formData, language: value })
          }
          placeholder="Select a language..."
          searchable
          fullWidth
        />
      </div>

      <div>
        <label>Country</label>
        <Select
          options={countryOptions}
          value={formData.country}
          onChange={(value) => 
            setFormData({ ...formData, country: value })
          }
          placeholder="Select a country..."
          searchable
          fullWidth
        />
      </div>

      <div>
        <label>Experience Level</label>
        <Select
          options={experienceOptions}
          value={formData.experience}
          onChange={(value) => 
            setFormData({ ...formData, experience: value })
          }
          placeholder="Select experience level..."
          fullWidth
        />
      </div>
    </div>
  );
}`}
                props={[
                    ...selectProps,
                    { name: '---', type: '---', description: 'SelectOption<T> Interface:' },
                    ...selectOptionProps,
                ]}
            />
        </PageLayout>
    );
}
