import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from './Select';
import { Icon } from '../Icon';
import type { CodiconName } from '../Icon/codicon-names';

// Sample data
const basicOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1', defaultLabel: 'default' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

const languageOptions: SelectOption[] = [
  { value: 'js', label: 'JavaScript', description: 'JavaScript - Dynamic scripting language', defaultLabel: 'recommended' },
  { value: 'ts', label: 'TypeScript', description: 'TypeScript - Typed superset of JavaScript', defaultLabel: 'default' },
  { value: 'py', label: 'Python', description: 'Python - High-level general purpose language' },
  { value: 'java', label: 'Java', description: 'Java - Object-oriented enterprise language' },
  { value: 'cpp', label: 'C++', description: 'C++ - Systems programming language' },
  { value: 'go', label: 'Go', description: 'Go - Concurrent programming language by Google' },
  { value: 'rust', label: 'Rust', description: 'Rust - Memory-safe systems language' },
  { value: 'ruby', label: 'Ruby', description: 'Ruby - Dynamic object-oriented language' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', description: 'United States of America' },
  { value: 'uk', label: 'United Kingdom', description: 'United Kingdom of Great Britain' },
  { value: 'ca', label: 'Canada', description: 'Canada' },
  { value: 'au', label: 'Australia', description: 'Commonwealth of Australia' },
  { value: 'de', label: 'Germany', description: 'Federal Republic of Germany - Deutschland' },
  { value: 'fr', label: 'France', description: 'French Republic - France' },
  { value: 'es', label: 'Spain', description: 'Kingdom of Spain - España' },
  { value: 'it', label: 'Italy', description: 'Italian Republic - Italia' },
  { value: 'jp', label: 'Japan', description: 'Japan - Nippon' },
  { value: 'cn', label: 'China', description: 'People\'s Republic of China' },
  { value: 'in', label: 'India', description: 'Republic of India' },
  { value: 'br', label: 'Brazil', description: 'Federative Republic of Brazil - Brasil' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: '1', label: 'Available Option 1' },
  { value: '2', label: 'Disabled Option', disabled: true },
  { value: '3', label: 'Available Option 2' },
  { value: '4', label: 'Also Disabled', disabled: true },
  { value: '5', label: 'Available Option 3' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A custom select dropdown component with keyboard navigation, search functionality, auto-positioning, and contextual descriptions. Fully integrates with the design system and VSCode theme variables. Features a description panel that displays additional context for the highlighted option, plus support for default/recommended labels. Matches VSCode\'s native dropdown styling with blue focus borders. Supports icons, filtering, disabled options, and all standard form behaviors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to display in the dropdown',
    },
    value: {
      control: 'text',
      description: 'Currently selected value (controlled mode)',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled mode)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
      table: {
        defaultValue: { summary: 'Select an option...' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the select',
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
      description: 'Whether the select is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the select should take full width',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to show a search input',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder for search input',
      table: {
        defaultValue: { summary: 'Search...' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    maxDropdownHeight: {
      control: 'text',
      description: 'Maximum height for the dropdown',
      table: {
        defaultValue: { summary: '300px' },
      },
    },
    showDescriptionPanel: {
      control: 'boolean',
      description: 'Whether to show description panel at the bottom of dropdown (only when descriptions exist)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    dropdownClassName: {
      control: 'text',
      description: 'Additional CSS class name for the dropdown portal element (useful for custom dropdown styling)',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all select properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option...',
    size: 'md',
    position: 'auto',
    disabled: false,
    fullWidth: false,
    searchable: false,
    searchPlaceholder: 'Search...',
    maxDropdownHeight: '300px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all select properties. Try different combinations using the controls below. The select supports keyboard navigation (Arrow keys, Enter, Escape).',
      },
    },
  },
};

/**
 * All available select sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', alignItems: 'flex-start', minWidth: '300px' }}>
      <Select options={basicOptions} size="xs" placeholder="Extra Small" />
      <Select options={basicOptions} size="sm" placeholder="Small" />
      <Select options={basicOptions} size="md" placeholder="Medium (default)" />
      <Select options={basicOptions} size="lg" placeholder="Large" />
      <Select options={basicOptions} size="xl" placeholder="Extra Large" />
    </div>
  ),
  args: { options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. Options inside the dropdown scale accordingly.',
      },
    },
  },
};

/**
 * Searchable select with description-based filtering and description panel.
 */
export const SearchableSelect: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', minWidth: '300px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Search by Description
        </h4>
        <Select
          options={languageOptions}
          searchable
          placeholder="Search programming languages..."
          searchPlaceholder="Try typing 'typed' or 'memory'"
        />
        <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
          Search matches against descriptions. Hover over options to see descriptions in the panel below.
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Search Countries
        </h4>
        <Select
          options={countryOptions}
          searchable
          placeholder="Select a country..."
          searchPlaceholder="Type to search..."
        />
      </div>
    </div>
  ),
  args: { options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Enable search with the `searchable` prop. Search matches against the `description` field if provided, otherwise falls back to `label`. When options have descriptions, they are displayed in a panel at the bottom of the dropdown as you hover or navigate through options. This keeps options clean while providing rich contextual information.',
      },
    },
  },
};

/**
 * Description panel shows contextual information for options.
 */
export const DescriptionPanel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', minWidth: '350px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          With Description Panel (default)
        </h4>
        <Select
          options={languageOptions}
          placeholder="Select a programming language..."
        />
        <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
          Hover or use arrow keys to see descriptions below the options
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Without Description Panel
        </h4>
        <Select
          options={languageOptions}
          placeholder="Select a programming language..."
          showDescriptionPanel={false}
        />
        <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
          Description panel disabled with showDescriptionPanel=false
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Options Without Descriptions
        </h4>
        <Select
          options={basicOptions}
          placeholder="Select an option..."
        />
        <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
          Description panel automatically hidden when no descriptions exist
        </p>
      </div>
    </div>
  ),
  args: { options: [] },
  parameters: {
    docs: {
      description: {
        story: 'The description panel displays contextual information at the bottom of the dropdown as you hover or navigate through options with arrow keys. It automatically appears when options have descriptions and hides when using custom `renderOption` functions. Use `showDescriptionPanel={false}` to disable it manually.',
      },
    },
  },
};

/**
 * Options with default labels displayed on the right side.
 */
export const DefaultLabels: Story = {
  render: () => {
    const browserOptions: SelectOption[] = [
      { value: 'chrome', label: 'Google Chrome', defaultLabel: 'default' },
      { value: 'firefox', label: 'Mozilla Firefox', defaultLabel: 'recommended' },
      { value: 'safari', label: 'Safari' },
      { value: 'edge', label: 'Microsoft Edge' },
      { value: 'brave', label: 'Brave Browser' },
    ];

    const themeOptions: SelectOption[] = [
      { value: 'dark', label: 'Dark Theme', description: 'Dark color scheme for reduced eye strain', defaultLabel: 'default' },
      { value: 'light', label: 'Light Theme', description: 'Light color scheme for bright environments' },
      { value: 'high-contrast', label: 'High Contrast', description: 'High contrast theme for accessibility', defaultLabel: 'recommended' },
      { value: 'auto', label: 'Auto', description: 'Follows system theme preference' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', minWidth: '350px' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Browser Selection
          </h4>
          <Select
            options={browserOptions}
            placeholder="Select your browser..."
            defaultValue="chrome"
          />
          <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
            Default labels appear on the right in muted text
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Theme with Labels and Descriptions
          </h4>
          <Select
            options={themeOptions}
            placeholder="Select a theme..."
          />
          <p style={{ marginTop: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
            Combines default labels with description panel
          </p>
        </div>
      </div>
    );
  },
  args: { options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Options can have a `defaultLabel` property that displays right-aligned muted text (e.g., "default", "recommended"). This is similar to VSCode\'s native dropdowns and helps guide users toward preferred choices. Works seamlessly with descriptions and other features.',
      },
    },
  },
};

/**
 * Custom render function for full control over option appearance.
 */
export const CustomRender: Story = {
  args: { options: [] },
  render: () => {
    const languagesWithIcons: SelectOption[] = [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'py', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
    ];

    const iconMap: Record<string, CodiconName> = {
      js: 'symbol-method',
      ts: 'symbol-method',
      py: 'symbol-method',
      java: 'symbol-class',
      go: 'symbol-interface',
      rust: 'symbol-interface',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', minWidth: '300px' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            With Icons
          </h4>
          <Select
            options={languagesWithIcons}
            placeholder="Choose a language..."
            defaultValue="ts"
            renderOption={(option) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                <Icon name={iconMap[option.value] || 'symbol-method'} />
                {option.label}
              </span>
            )}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            With Colors and Badges
          </h4>
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            placeholder="Select status..."
            renderOption={(option) => {
              const colors: Record<string, string> = {
                active: '#4caf50',
                pending: '#ff9800',
                completed: '#2196f3',
                cancelled: '#f44336',
              };
              return (
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
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
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Custom Display (Different in Trigger vs Options)
          </h4>
          <Select
            options={languagesWithIcons}
            placeholder="Choose a language..."
            renderValue={(option) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                <Icon name={iconMap[option.value] || 'symbol-method'} />
                <strong>{option.label}</strong>
              </span>
            )}
            renderOption={(option, isSelected) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                <Icon name={iconMap[option.value] || 'symbol-method'} />
                {option.label}
                {isSelected && <Icon name="check" style={{ marginLeft: 'auto' }} />}
              </span>
            )}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `renderOption` and `renderValue` for complete control over appearance. You can add icons, badges, colors, or any custom JSX.',
      },
    },
  },
};

/**
 * Sophisticated multi-line options with rich content.
 */
export const SophisticatedOptions: Story = {
  args: { options: [] },
  render: () => {
    // User profiles with avatars and metadata
    const userOptions: SelectOption[] = [
      { value: 'user1', label: 'Alice Johnson', description: 'Senior Frontend Developer' },
      { value: 'user2', label: 'Bob Smith', description: 'Backend Engineer' },
      { value: 'user3', label: 'Carol Williams', description: 'DevOps Specialist' },
      { value: 'user4', label: 'David Brown', description: 'Full Stack Developer' },
    ];

    // Project options with status and progress
    interface ProjectOption extends SelectOption {
      status: 'active' | 'pending' | 'completed';
      progress: number;
      members: number;
    }

    const projectOptions: ProjectOption[] = [
      { value: 'p1', label: 'E-commerce Platform', description: 'Next.js, TypeScript, PostgreSQL', status: 'active', progress: 75, members: 5 },
      { value: 'p2', label: 'Mobile App Redesign', description: 'React Native, Firebase', status: 'active', progress: 45, members: 3 },
      { value: 'p3', label: 'API Gateway', description: 'Node.js, Redis, Docker', status: 'pending', progress: 20, members: 2 },
      { value: 'p4', label: 'Analytics Dashboard', description: 'React, D3.js, MongoDB', status: 'completed', progress: 100, members: 4 },
    ];

    // File/folder options with icons and metadata
    const fileOptions: SelectOption[] = [
      { value: 'f1', label: 'package.json', description: 'Modified 2 hours ago • 1.2 KB' },
      { value: 'f2', label: 'src/index.tsx', description: 'Modified yesterday • 3.5 KB' },
      { value: 'f3', label: 'README.md', description: 'Modified last week • 8.1 KB' },
      { value: 'f4', label: 'tsconfig.json', description: 'Modified 3 days ago • 542 bytes' },
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active': return '#4caf50';
        case 'pending': return '#ff9800';
        case 'completed': return '#2196f3';
        default: return '#999';
      }
    };

    const getFileIcon = (filename: string): CodiconName => {
      if (filename.endsWith('.json')) return 'json';
      if (filename.endsWith('.tsx') || filename.endsWith('.ts')) return 'symbol-method';
      if (filename.endsWith('.md')) return 'markdown';
      return 'file';
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', minWidth: '400px' }}>
        {/* User profiles with avatars */}
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            User Profiles with Role
          </h4>
          <Select
            options={userOptions}
            placeholder="Assign to team member..."
            searchable
            searchPlaceholder="Search team members..."
            renderOption={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)', padding: 'var(--bk-spacing-1) 0' }}>
                {/* Avatar */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bk-color-primary)',
                  color: 'var(--bk-color-primary-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--bk-font-size-sm)',
                  fontWeight: 'var(--bk-font-weight-semibold)',
                  flexShrink: 0,
                }}>
                  {option.label?.[0]}
                </div>
                {/* User info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 'var(--bk-font-weight-medium)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {option.label}
                  </div>
                  <div style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-foreground-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {option.description}
                  </div>
                </div>
              </div>
            )}
            renderValue={(option) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bk-color-primary)',
                  color: 'var(--bk-color-primary-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--bk-font-size-xs)',
                  fontWeight: 'var(--bk-font-weight-semibold)',
                }}>
                  {option.label?.[0]}
                </div>
                {option.label}
              </span>
            )}
          />
        </div>

        {/* Projects with status and progress */}
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Projects with Status & Progress
          </h4>
          <Select
            options={projectOptions}
            placeholder="Select a project..."
            searchable
            renderOption={(option) => {
              const project = option as ProjectOption;
              return (
                <div style={{ padding: 'var(--bk-spacing-1) 0' }}>
                  {/* Header with name and status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)', marginBottom: 'var(--bk-spacing-1)' }}>
                    <span style={{
                      fontWeight: 'var(--bk-font-weight-medium)',
                      flex: 1,
                    }}>
                      {project.label}
                    </span>
                    <span style={{
                      fontSize: 'var(--bk-font-size-xs)',
                      padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
                      borderRadius: 'var(--bk-radius-full)',
                      backgroundColor: getStatusColor(project.status) + '20',
                      color: getStatusColor(project.status),
                      textTransform: 'capitalize',
                    }}>
                      {project.status}
                    </span>
                  </div>
                  {/* Description */}
                  <div style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-foreground-muted)',
                    marginBottom: 'var(--bk-spacing-1-5)',
                  }}>
                    {project.description}
                  </div>
                  {/* Progress bar and metadata */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--bk-color-secondary)', borderRadius: 'var(--bk-radius-full)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${project.progress}%`,
                        backgroundColor: getStatusColor(project.status),
                        transition: 'width var(--bk-transition-base)',
                      }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)', fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
                      <span>{project.progress}%</span>
                      <span>•</span>
                      <Icon name="person" />
                      <span>{project.members}</span>
                    </div>
                  </div>
                </div>
              );
            }}
            renderValue={(option) => {
              const project = option as ProjectOption;
              return (
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(project.status),
                  }} />
                  {project.label}
                  <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
                    ({project.progress}%)
                  </span>
                </span>
              );
            }}
          />
        </div>

        {/* Files with icons and metadata */}
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Recent Files with Metadata
          </h4>
          <Select
            options={fileOptions}
            placeholder="Open recent file..."
            searchable
            searchPlaceholder="Search files..."
            renderOption={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-md)', padding: 'var(--bk-spacing-0-5) 0' }}>
                <Icon name={getFileIcon(option.label || '')} style={{ fontSize: 'var(--bk-font-size-lg)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--bk-font-family-mono)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {option.label}
                  </div>
                  <div style={{
                    fontSize: 'var(--bk-font-size-xs)',
                    color: 'var(--bk-color-foreground-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {option.description}
                  </div>
                </div>
              </div>
            )}
            renderValue={(option) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)', fontFamily: 'var(--bk-font-family-mono)' }}>
                <Icon name={getFileIcon(option.label || '')} />
                {option.label}
              </span>
            )}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Advanced examples showing multi-line options with avatars, progress bars, status badges, and rich metadata. The `renderOption` and `renderValue` functions provide complete flexibility for complex UIs.',
      },
    },
  },
};

/**
 * Dropdown positioning: auto, top, and bottom.
 */
export const PositionVariants: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-12)', minWidth: '300px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Auto Position (default)
        </h4>
        <Select
          options={basicOptions}
          position="auto"
          placeholder="Opens based on space available"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Bottom Position
        </h4>
        <Select
          options={basicOptions}
          position="bottom"
          placeholder="Always opens below"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Top Position
        </h4>
        <Select
          options={basicOptions}
          position="top"
          placeholder="Always opens above"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control dropdown position with the `position` prop: **auto** (default, calculates best position), **top** (always above), **bottom** (always below).',
      },
    },
  },
};

/**
 * Various states: disabled, error, with disabled options.
 */
export const States: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', minWidth: '300px' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Disabled Select
        </h4>
        <Select
          options={basicOptions}
          disabled
          defaultValue="option2"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Error State
        </h4>
        <Select
          options={basicOptions}
          placeholder="Select an option..."
          error="This field is required"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          With Disabled Options
        </h4>
        <Select
          options={optionsWithDisabled}
          placeholder="Some options are disabled"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select supports various states: **disabled** (entire select), **error** (with error message), and **disabled options** (individual options can be disabled).',
      },
    },
  },
};

/**
 * Full width select for forms.
 */
export const FullWidth: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Select
        options={languageOptions}
        placeholder="Select a language..."
        fullWidth
        searchable
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Use the `fullWidth` prop to make the select take up 100% of its container width. Useful for form layouts.',
      },
    },
  },
};

/**
 * Custom dropdown styling using dropdownClassName.
 */
export const CustomDropdownStyle: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ minWidth: '300px' }}>
      <style>
        {`
          .custom-dropdown-wide {
            min-width: 400px !important;
          }
          .custom-dropdown-rounded {
            border-radius: 12px !important;
            overflow: hidden;
          }
          .custom-dropdown-shadow {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
          }
          .custom-dropdown-bordered {
            border: 2px solid var(--bk-color-primary) !important;
          }
        `}
      </style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Default Dropdown
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Wider Dropdown (min-width: 400px)
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
            dropdownClassName="custom-dropdown-wide"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Rounded Dropdown (border-radius: 12px)
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
            dropdownClassName="custom-dropdown-rounded"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Enhanced Shadow
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
            dropdownClassName="custom-dropdown-shadow"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Primary Border
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
            dropdownClassName="custom-dropdown-bordered"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
            Combined Custom Styles
          </h4>
          <Select
            options={languageOptions}
            placeholder="Select a language..."
            dropdownClassName="custom-dropdown-rounded custom-dropdown-shadow custom-dropdown-bordered"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `dropdownClassName` prop to pass custom CSS class names to the dropdown portal element. This allows for custom styling of the dropdown independently from the trigger. You can combine multiple classes for complex customizations.',
      },
    },
  },
};

/**
 * Controlled select with React state.
 */
const ControlledSelectStory = () => {
  const [value, setValue] = useState<string>('ts');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', minWidth: '300px' }}>
      <Select
        options={languageOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a language..."
      />
      <div style={{
        padding: 'var(--bk-padding-md)',
        backgroundColor: 'var(--bk-color-background-secondary)',
        borderRadius: 'var(--bk-radius-sm)',
        fontSize: 'var(--bk-font-size-sm)',
      }}>
        Selected value: <strong>{value || 'none'}</strong>
      </div>
    </div>
  );
};

export const ControlledSelect: Story = {
  render: () => <ControlledSelectStory />,
  args: { options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Control the select value with React state. Use the `value` prop and `onChange` callback for controlled behavior.',
      },
    },
  },
};

/**
 * Form example with multiple selects.
 */
const FormExampleStory = () => {
  const [formData, setFormData] = useState({
    language: '',
    country: '',
    experience: '',
  });

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
      backgroundColor: 'var(--bk-color-background-secondary)',
      borderRadius: 'var(--bk-radius-md)',
      minWidth: '400px',
    }}>
      <h3 style={{ margin: 0, fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
        Developer Profile
      </h3>

      <div>
        <label style={{
          display: 'block',
          marginBottom: 'var(--bk-spacing-1)',
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)',
        }}>
          Primary Language
        </label>
        <Select
          options={languageOptions}
          value={formData.language}
          onChange={(value) => setFormData({ ...formData, language: value })}
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
          onChange={(value) => setFormData({ ...formData, country: value })}
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
          onChange={(value) => setFormData({ ...formData, experience: value })}
          placeholder="Select experience level..."
          fullWidth
        />
      </div>

      <div style={{
        marginTop: 'var(--bk-spacing-2)',
        padding: 'var(--bk-padding-md)',
        backgroundColor: 'var(--bk-color-background)',
        borderRadius: 'var(--bk-radius-sm)',
        fontSize: 'var(--bk-font-size-sm)',
      }}>
        <div><strong>Language:</strong> {formData.language || 'Not selected'}</div>
        <div><strong>Country:</strong> {formData.country || 'Not selected'}</div>
        <div><strong>Experience:</strong> {formData.experience || 'Not selected'}</div>
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
        story: 'Example of using multiple Select components in a form with controlled state. Each select updates the form data independently.',
      },
    },
  },
};

/**
 * Long list of options with scrolling.
 */
export const LongList: Story = {
  args: { options: [] },
  render: () => {
    const manyOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    }));

    return (
      <div style={{ minWidth: '300px' }}>
        <Select
          options={manyOptions}
          placeholder="Select from many options..."
          searchable
          searchPlaceholder="Type to filter..."
          maxDropdownHeight="200px"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select handles long lists gracefully with scrolling. Use `maxDropdownHeight` to control the dropdown height. Search functionality is especially useful for long lists.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all select features and variations.
 */
export const Showcase: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)' }}>
      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: '300px' }}>
          <Select options={basicOptions} size="xs" placeholder="Extra Small" />
          <Select options={basicOptions} size="sm" placeholder="Small" />
          <Select options={basicOptions} size="md" placeholder="Medium" />
          <Select options={basicOptions} size="lg" placeholder="Large" />
          <Select options={basicOptions} size="xl" placeholder="Extra Large" />
        </div>
      </div>

      {/* Custom Render */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Custom Render
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: '300px' }}>
          <Select
            options={languageOptions}
            placeholder="Choose a programming language..."
            defaultValue="ts"
          />
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
            ]}
            placeholder="With custom styling..."
            renderOption={(option) => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-sm)' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: option.value === 'active' ? '#4caf50' : '#ff9800',
                }} />
                {option.label}
              </span>
            )}
          />
        </div>
      </div>

      {/* Searchable */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Searchable
        </h3>
        <div style={{ maxWidth: '300px' }}>
          <Select
            options={countryOptions}
            searchable
            placeholder="Search countries..."
            searchPlaceholder="Type to filter..."
          />
        </div>
      </div>

      {/* States */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: '300px' }}>
          <Select
            options={basicOptions}
            placeholder="Normal state"
          />
          <Select
            options={basicOptions}
            disabled
            defaultValue="option2"
          />
          <Select
            options={basicOptions}
            placeholder="Required field"
            error="This field is required"
          />
          <Select
            options={optionsWithDisabled}
            placeholder="With disabled options"
          />
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Full Width
        </h3>
        <Select
          options={languageOptions}
          placeholder="Full width select"
          searchable
          fullWidth
        />
      </div>

      {/* Position Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Position Variants
        </h3>
        <div style={{ display: 'flex', gap: 'var(--bk-gap-lg)', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '250px' }}>
            <div style={{ marginBottom: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)' }}>Auto Position</div>
            <Select options={basicOptions} position="auto" placeholder="Auto" />
          </div>
          <div style={{ minWidth: '250px' }}>
            <div style={{ marginBottom: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)' }}>Bottom Position</div>
            <Select options={basicOptions} position="bottom" placeholder="Bottom" />
          </div>
          <div style={{ minWidth: '250px' }}>
            <div style={{ marginBottom: 'var(--bk-spacing-1)', fontSize: 'var(--bk-font-size-xs)' }}>Top Position</div>
            <Select options={basicOptions} position="top" placeholder="Top" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all select capabilities: sizes, icons, search, states, positioning, and full width option. The select supports keyboard navigation (Arrow Up/Down, Enter, Escape, Tab, Home, End) and click-outside-to-close.',
      },
    },
  },
};
