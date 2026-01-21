import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { Menu, MenuItem, MenuDivider } from '../Menu';
import { Icon } from '../Icon';
import { useState } from 'react';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Groups buttons together with connected styling. Useful for creating toolbars, segmented controls, and split buttons. Supports a compositional API where buttons can be grouped naturally or combined with ButtonGroup.Dropdown for split button patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button group should take full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showSeparator: {
      control: 'boolean',
      description: 'Whether to show separator lines between buttons',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu content for split button examples
const SampleMenu = () => (
  <Menu>
    <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
    <MenuItem icon={<Icon name="save-as" />}>Save As...</MenuItem>
    <MenuItem icon={<Icon name="save-all" />}>Save All</MenuItem>
    <MenuDivider />
    <MenuItem icon={<Icon name="export" />}>Export</MenuItem>
  </Menu>
);

/**
 * Interactive playground with all button group properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    children: null,
    fullWidth: false,
    showSeparator: false,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Cut</Button>
      <Button variant="primary">Copy</Button>
      <Button variant="primary">Paste</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore button group properties. The variant, size, and outline props are set explicitly on each Button component for full control.',
      },
    },
  },
};

/**
 * Regular button groups with different variants.
 */
export const Variants: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <Button variant="primary">Cut</Button>
        <Button variant="primary">Copy</Button>
        <Button variant="primary">Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Bold</Button>
        <Button variant="secondary">Italic</Button>
        <Button variant="secondary">Underline</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost">Left</Button>
        <Button variant="ghost">Center</Button>
        <Button variant="ghost">Right</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group variants: **Primary** (main actions), **Secondary** (secondary actions), **Ghost** (minimal emphasis). Set the variant explicitly on each button.',
      },
    },
  },
};

/**
 * Button groups in different sizes.
 */
export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <Button variant="primary" size="xs">Cut</Button>
        <Button variant="primary" size="xs">Copy</Button>
        <Button variant="primary" size="xs">Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" size="sm">Cut</Button>
        <Button variant="primary" size="sm">Copy</Button>
        <Button variant="primary" size="sm">Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" size="md">Cut</Button>
        <Button variant="primary" size="md">Copy</Button>
        <Button variant="primary" size="md">Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" size="lg">Cut</Button>
        <Button variant="primary" size="lg">Copy</Button>
        <Button variant="primary" size="lg">Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" size="xl">Cut</Button>
        <Button variant="primary" size="xl">Copy</Button>
        <Button variant="primary" size="xl">Paste</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. Set the size explicitly on each button.',
      },
    },
  },
};

/**
 * Outline style button groups.
 */
export const Outline: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <Button variant="primary" outline>Cut</Button>
        <Button variant="primary" outline>Copy</Button>
        <Button variant="primary" outline>Paste</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" outline>Bold</Button>
        <Button variant="secondary" outline>Italic</Button>
        <Button variant="secondary" outline>Underline</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost" outline>Left</Button>
        <Button variant="ghost" outline>Center</Button>
        <Button variant="ghost" outline>Right</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outline button groups have transparent backgrounds with colored borders. They fill with solid color on hover.',
      },
    },
  },
};

/**
 * Button groups without separators for seamless segmented controls.
 */
export const WithoutSeparators: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Without Separators (default)
        </h4>
        <ButtonGroup>
          <Button variant="secondary">List</Button>
          <Button variant="secondary">Grid</Button>
          <Button variant="secondary">Columns</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          With Separators
        </h4>
        <ButtonGroup showSeparator={true}>
          <Button variant="secondary">List</Button>
          <Button variant="secondary">Grid</Button>
          <Button variant="secondary">Columns</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Outline With Separators
        </h4>
        <ButtonGroup showSeparator={true}>
          <Button variant="secondary" outline>Day</Button>
          <Button variant="secondary" outline>Week</Button>
          <Button variant="secondary" outline>Month</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'By default, button groups have no separators for a clean, seamless look. Use **showSeparator={true}** to add separator lines between buttons if needed.',
      },
    },
  },
};

/**
 * Split button pattern using ButtonGroup.Dropdown.
 */
export const SplitButton: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <Button variant="primary" onClick={() => console.log('Save clicked')}>Save</Button>
        <ButtonGroup.Dropdown variant="primary" content={<SampleMenu />} />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" onClick={() => console.log('Deploy clicked')}>
          <Icon name="rocket" />
          Deploy
        </Button>
        <ButtonGroup.Dropdown variant="secondary" content={
          <Menu>
            <MenuItem>Production</MenuItem>
            <MenuItem>Staging</MenuItem>
            <MenuItem>Development</MenuItem>
          </Menu>
        } />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost" onClick={() => console.log('Create clicked')}>
          <Icon name="add" />
          Create
        </Button>
        <ButtonGroup.Dropdown variant="ghost" content={
          <Menu>
            <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
            <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
          </Menu>
        } />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Split button pattern combines a primary action button with a dropdown menu. Use **ButtonGroup.Dropdown** as the last child to create this pattern. Make sure the dropdown variant matches the button variant for consistent styling.',
      },
    },
  },
};

/**
 * Button groups with icon buttons.
 */
export const WithIcons: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <Button variant="secondary">
          <Icon name="bold" />
          Bold
        </Button>
        <Button variant="secondary">
          <Icon name="italic" />
          Italic
        </Button>
        <Button variant="secondary">
          <Icon name="file-text" />
          Underline
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost" outline circular>
          <Icon name="layout-panel-left" />
        </Button>
        <Button variant="ghost" outline circular>
          <Icon name="layout-centered" />
        </Button>
        <Button variant="ghost" outline circular>
          <Icon name="layout-panel-right" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" size="sm">
          <Icon name="chevron-left" />
        </Button>
        <Button variant="primary" size="sm">1 / 10</Button>
        <Button variant="primary" size="sm">
          <Icon name="chevron-right" />
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button groups work great with icons for toolbars and controls. You can mix text with icons, use icon-only buttons, or create icon-based navigation.',
      },
    },
  },
};

/**
 * Full width button groups.
 */
export const FullWidth: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '400px' }}>
      <ButtonGroup fullWidth>
        <Button variant="primary">Previous</Button>
        <Button variant="primary">Next</Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button variant="secondary">Cancel</Button>
        <Button variant="secondary">Apply</Button>
        <Button variant="secondary">OK</Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button variant="ghost" outline>Day</Button>
        <Button variant="ghost" outline>Week</Button>
        <Button variant="ghost" outline>Month</Button>
        <Button variant="ghost" outline>Year</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the **fullWidth** prop to make button groups span the full width of their container. Each button automatically gets equal width.',
      },
    },
  },
};

/**
 * Dropdown placement options for split buttons.
 */
export const DropdownPlacements: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap', alignItems: 'center' }}>
      <ButtonGroup>
        <Button variant="secondary" size="xs">Action</Button>
        <ButtonGroup.Dropdown size="xs" variant="secondary" content={<SampleMenu />} placement="bottom-start" />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="sm">Action</Button>
        <ButtonGroup.Dropdown size="sm" variant="secondary" content={<SampleMenu />} placement="bottom-end" />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="md">Action</Button>
        <ButtonGroup.Dropdown size="md" variant="secondary" content={<SampleMenu />} placement="top-start" />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="lg">Action</Button>
        <ButtonGroup.Dropdown size="lg" variant="secondary" content={<SampleMenu />} placement="top-end" />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="xl">Action</Button>
        <ButtonGroup.Dropdown size="xl" variant="secondary" content={<SampleMenu />} placement="top-end" />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control where the dropdown menu appears: **bottom-start**, **bottom-end** (default), **top-start**, **top-end**.',
      },
    },
  },
};

/**
 * Practical usage examples with real-world scenarios.
 */
export const UsageExamples: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Text Formatting Toolbar
        </h4>
        <ButtonGroup>
          <Button variant="ghost">
            <Icon name="bold" />
          </Button>
          <Button variant="ghost">
            <Icon name="italic" />
          </Button>
          <Button variant="ghost">
            <Icon name="file-text" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Split Button with Save Actions
        </h4>
        <ButtonGroup>
          <Button variant="primary" onClick={() => console.log('Quick save')}>
            <Icon name="save" />
            Save
          </Button>
          <ButtonGroup.Dropdown variant="primary" content={
            <Menu>
              <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
              <MenuItem icon={<Icon name="save-as" />}>Save As...</MenuItem>
              <MenuItem icon={<Icon name="save-all" />}>Save All</MenuItem>
            </Menu>
          } />
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Segmented Control
        </h4>
        <ButtonGroup>
          <Button variant="secondary" outline>List</Button>
          <Button variant="secondary" outline>Grid</Button>
          <Button variant="secondary" outline>Columns</Button>
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Pagination
        </h4>
        <ButtonGroup>
          <Button variant="ghost">
            <Icon name="chevron-left" />
          </Button>
          <Button variant="ghost">Page 1 of 10</Button>
          <Button variant="ghost">
            <Icon name="chevron-right" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Zoom Controls
        </h4>
        <ButtonGroup>
          <Button variant="secondary" size="sm">
            <Icon name="zoom-out" />
          </Button>
          <Button variant="secondary" size="sm">100%</Button>
          <Button variant="secondary" size="sm">
            <Icon name="zoom-in" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use cases: text formatting toolbars, split buttons with save actions, segmented controls for view switching, pagination controls, and zoom controls.',
      },
    },
  },
};

/**
 * Disabled and controlled states.
 */
export const States: Story = {
  args: { children: null },
  render: () => {
    const ControlledExample = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => console.log('Action clicked')}>Action</Button>
            <ButtonGroup.Dropdown
              variant="secondary"
              content={
                <Menu>
                  <MenuItem onClick={() => console.log('Option 1')}>Option 1</MenuItem>
                  <MenuItem onClick={() => console.log('Option 2')}>Option 2</MenuItem>
                  <MenuItem onClick={() => console.log('Option 3')}>Option 3</MenuItem>
                </Menu>
              }
              open={isOpen}
              onOpenChange={setIsOpen}
            />
          </ButtonGroup>
          <div style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>
            Dropdown is {isOpen ? 'open' : 'closed'}
          </div>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Disabled Buttons
          </h4>
          <ButtonGroup>
            <Button variant="primary" disabled>Cut</Button>
            <Button variant="primary" disabled>Copy</Button>
            <Button variant="primary" disabled>Paste</Button>
          </ButtonGroup>
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Disabled Split Button
          </h4>
          <ButtonGroup>
            <Button variant="primary" disabled>Save</Button>
            <ButtonGroup.Dropdown variant="primary" disabled content={<SampleMenu />} />
          </ButtonGroup>
        </div>

        <div>
          <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Controlled Dropdown State
          </h4>
          <ControlledExample />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual buttons can be disabled within a group. You can also control the dropdown open state programmatically for advanced use cases.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all button group capabilities.
 */
export const Showcase: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)' }}>
      {/* Regular Button Groups */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Regular Button Groups
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary">Cut</Button>
            <Button variant="primary">Copy</Button>
            <Button variant="primary">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary">Bold</Button>
            <Button variant="secondary">Italic</Button>
            <Button variant="secondary">Underline</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="ghost">Left</Button>
            <Button variant="ghost">Center</Button>
            <Button variant="ghost">Right</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Outline Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Outline Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" outline>Cut</Button>
            <Button variant="primary" outline>Copy</Button>
            <Button variant="primary" outline>Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary" outline>Day</Button>
            <Button variant="secondary" outline>Week</Button>
            <Button variant="secondary" outline>Month</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" size="xs">Cut</Button>
            <Button variant="primary" size="xs">Copy</Button>
            <Button variant="primary" size="xs">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary" size="sm">Cut</Button>
            <Button variant="primary" size="sm">Copy</Button>
            <Button variant="primary" size="sm">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary" size="md">Cut</Button>
            <Button variant="primary" size="md">Copy</Button>
            <Button variant="primary" size="md">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary" size="lg">Cut</Button>
            <Button variant="primary" size="lg">Copy</Button>
            <Button variant="primary" size="lg">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary" size="xl">Cut</Button>
            <Button variant="primary" size="xl">Copy</Button>
            <Button variant="primary" size="xl">Paste</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Split Button Pattern */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Split Button Pattern
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" onClick={() => console.log('Save')}>
              <Icon name="save" />
              Save
            </Button>
            <ButtonGroup.Dropdown variant="primary" content={<SampleMenu />} />
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => console.log('Deploy')}>
              <Icon name="rocket" />
              Deploy
            </Button>
            <ButtonGroup.Dropdown variant="secondary" content={
              <Menu>
                <MenuItem>Production</MenuItem>
                <MenuItem>Staging</MenuItem>
                <MenuItem>Development</MenuItem>
              </Menu>
            } />
          </ButtonGroup>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          With Icons
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="secondary">
              <Icon name="bold" />
              Bold
            </Button>
            <Button variant="secondary">
              <Icon name="italic" />
              Italic
            </Button>
            <Button variant="secondary">
              <Icon name="file-text" />
              Underline
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="ghost" circular>
              <Icon name="layout-panel-left" />
            </Button>
            <Button variant="ghost" circular>
              <Icon name="layout-centered" />
            </Button>
            <Button variant="ghost" circular>
              <Icon name="layout-panel-right" />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Full Width
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '400px' }}>
          <ButtonGroup fullWidth>
            <Button variant="primary">Previous</Button>
            <Button variant="primary">Next</Button>
          </ButtonGroup>
          <ButtonGroup fullWidth>
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Apply</Button>
            <Button variant="secondary">OK</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Real-world Examples */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Real-world Examples
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
          <div>
            <p style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
              Text Editor Toolbar
            </p>
            <ButtonGroup>
              <Button variant="ghost"><Icon name="bold" /></Button>
              <Button variant="ghost"><Icon name="italic" /></Button>
              <Button variant="ghost"><Icon name="file-text" /></Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
              View Switcher
            </p>
            <ButtonGroup>
              <Button variant="secondary" outline>List</Button>
              <Button variant="secondary" outline>Grid</Button>
              <Button variant="secondary" outline>Columns</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
              Pagination Control
            </p>
            <ButtonGroup>
              <Button variant="ghost"><Icon name="chevron-left" /></Button>
              <Button variant="ghost">1 / 10</Button>
              <Button variant="ghost"><Icon name="chevron-right" /></Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all button group capabilities: variants, sizes, outline styles, split button pattern, icons, full width layouts, and real-world usage examples. Use this as a reference for all available combinations.',
      },
    },
  },
};
