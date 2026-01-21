import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Menu, MenuItem, MenuDivider, SubMenu } from '../Menu';
import { Badge } from '../Badge';
import { Input } from '../Input';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown component that displays user-defined content when triggered. Unlike Select, this component doesn\'t handle form state and allows any custom content in the dropdown menu. Perfect for action menus, user profiles, forms, and complex UI patterns. Supports click outside to close, Escape key handling, and multiple placement options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      description: 'The element that opens the dropdown when clicked',
      control: false,
    },
    children: {
      description: 'The content to display inside the dropdown',
      control: false,
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state (optional)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Position of the dropdown relative to the trigger',
      table: {
        defaultValue: { summary: 'bottom-start' },
      },
    },
    closeOnClick: {
      control: 'boolean',
      description: 'Whether to close the dropdown when clicking inside it',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all dropdown properties exposed.
 * Use the controls below to experiment with different configurations.
 */
export const Interactive: Story = {
  args: {
    placement: 'bottom-start',
    closeOnClick: true,
    disabled: false,
    trigger: null,
    children: null,
  },
  render: (args) => (
    <Dropdown
      {...args}
      trigger={<Button>Open Menu</Button>}
    >
      <Menu>
        <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
        <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
        <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all dropdown properties. Try different placements and configurations using the controls below.',
      },
    },
  },
};

/**
 * All available placement options displayed for comparison.
 */
export const Placements: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-12)', padding: 'var(--spacing-12)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Dropdown
          trigger={<Button>Bottom Start</Button>}
          placement="bottom-start"
        >
          <Menu>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 1</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 2</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 3</MenuItem>
          </Menu>
        </Dropdown>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dropdown
          trigger={<Button>Bottom End</Button>}
          placement="bottom-end"
        >
          <Menu>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 1</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 2</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 3</MenuItem>
          </Menu>
        </Dropdown>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Dropdown
          trigger={<Button>Top Start</Button>}
          placement="top-start"
        >
          <Menu>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 1</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 2</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 3</MenuItem>
          </Menu>
        </Dropdown>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dropdown
          trigger={<Button>Top End</Button>}
          placement="top-end"
        >
          <Menu>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 1</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 2</MenuItem>
            <MenuItem icon={<Icon name="symbol-method" />}>Method 3</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four placement options: **bottom-start** (default, below trigger aligned left), **bottom-end** (below, aligned right), **top-start** (above, aligned left), **top-end** (above, aligned right).',
      },
    },
  },
};

/**
 * Dropdown with Menu component for consistent item styling and keyboard navigation.
 */
export const WithMenu: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary">
          <Icon name="ellipsis" />
          Actions
        </Button>
      }
    >
      <Menu>
        <MenuItem icon={<Icon name="edit" />} onClick={() => alert('Edit clicked')}>
          Edit
        </MenuItem>
        <MenuItem icon={<Icon name="copy" />} onClick={() => alert('Copy clicked')}>
          Duplicate
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="trash" />} onClick={() => alert('Delete clicked')}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using the **Menu** component inside Dropdown provides consistent styling, keyboard navigation, and accessibility. This is the recommended pattern for action menus.',
      },
    },
  },
};

/**
 * Menu with different sizes for compact or spacious layouts.
 */
export const MenuSizes: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Dropdown trigger={<Button size="sm">Small</Button>}>
        <Menu size="sm">
          <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
          <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        </Menu>
      </Dropdown>

      <Dropdown trigger={<Button size="md">Medium (Default)</Button>}>
        <Menu size="md">
          <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
          <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        </Menu>
      </Dropdown>

      <Dropdown trigger={<Button size="lg">Large</Button>}>
        <Menu size="lg">
          <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
          <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu components support different sizes (xs, sm, md, lg, xl) to match your trigger size and use case. Choose a size that fits your design.',
      },
    },
  },
};

/**
 * Nested menus with SubMenu component.
 */
export const WithSubMenu: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <Dropdown
      trigger={
        <Button>
          <Icon name="list-tree" />
          File Menu
        </Button>
      }
    >
      <Menu>
        <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
        <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
        <MenuDivider />
        <SubMenu label="Open Recent" icon={<Icon name="history" />}>
          <MenuItem>project-1.tsx</MenuItem>
          <MenuItem>component.tsx</MenuItem>
          <MenuItem>styles.css</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="clear-all" />}>Clear Recent</MenuItem>
        </SubMenu>
        <SubMenu label="Export" icon={<Icon name="export" />}>
          <MenuItem icon={<Icon name="file-code" />}>Export as JSON</MenuItem>
          <MenuItem icon={<Icon name="file-pdf" />}>Export as PDF</MenuItem>
          <MenuItem icon={<Icon name="file-zip" />}>Export as ZIP</MenuItem>
        </SubMenu>
        <MenuDivider />
        <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        <MenuItem icon={<Icon name="save-as" />}>Save As...</MenuItem>
      </Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use **SubMenu** component for nested menus. Submenus open on hover and support infinite nesting for complex menu hierarchies.',
      },
    },
  },
};

/**
 * User profile menu with header and actions.
 */
export const UserProfileMenu: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary">
          <Icon name="account" />
          My Account
        </Button>
      }
    >
      <div style={{ minWidth: '220px' }}>
        {/* User header with custom styling */}
        <div style={{
          padding: 'var(--padding-md)',
          borderBottom: '1px solid var(--color-divider)',
          marginBottom: 'var(--spacing-1)'
        }}>
          <div style={{
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-base)',
            marginBottom: 'var(--spacing-0-5)'
          }}>
            Jane Developer
          </div>
          <div style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-foreground-muted)'
          }}>
            jane.dev@example.com
          </div>
        </div>

        {/* Menu items */}
        <Menu>
          <MenuItem icon={<Icon name="person" />}>Profile Settings</MenuItem>
          <MenuItem icon={<Icon name="gear" />}>Preferences</MenuItem>
          <MenuItem icon={<Icon name="key" />}>Security</MenuItem>
          <MenuDivider />
          <SubMenu label="Theme" icon={<Icon name="symbol-color" />}>
            <MenuItem icon={<Icon name="circle-outline" />} selected>Light</MenuItem>
            <MenuItem icon={<Icon name="circle-outline" />}>Dark</MenuItem>
            <MenuItem icon={<Icon name="circle-outline" />}>Auto</MenuItem>
          </SubMenu>
          <MenuDivider />
          <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
        </Menu>
      </div>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common pattern: user profile dropdown combining custom header content with Menu items. Mix custom styled sections with Menu components for flexibility.',
      },
    },
  },
};

/**
 * Menu items with right-aligned content (badges, shortcuts).
 */
export const WithRightContent: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <Dropdown
      trigger={
        <Button>
          <Icon name="rocket" />
          Commands
        </Button>
      }
    >
      <Menu>
        <MenuItem
          icon={<Icon name="save" />}
          rightContent={<span>⌘S</span>}
        >
          Save
        </MenuItem>
        <MenuItem
          icon={<Icon name="search" />}
          rightContent={<span>⌘F</span>}
        >
          Find
        </MenuItem>
        <MenuItem
          icon={<Icon name="replace" />}
          rightContent={<span>⌘H</span>}
        >
          Replace
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon name="bell" />}
          rightContent={<Badge variant="error">5</Badge>}
        >
          Notifications
        </MenuItem>
        <MenuItem
          icon={<Icon name="inbox" />}
          rightContent={<Badge variant="info">12</Badge>}
        >
          Messages
        </MenuItem>
      </Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MenuItem supports **rightContent** prop for displaying keyboard shortcuts, badges, or additional info on the right side of menu items.',
      },
    },
  },
};

/**
 * Dropdown containing a form with inputs.
 */
export const WithForm: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');

    return (
      <Dropdown
        trigger={<Button>Sign In</Button>}
        closeOnClick={false}
      >
        <div style={{
          padding: 'var(--padding-lg)',
          minWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--gap-md)'
        }}>
          <div style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-1)'
          }}>
            Welcome Back
          </div>

          <div>
            <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-1)' }}>Email</div>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>

          <div>
            <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-1)' }}>Password</div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>

          <Button
            variant="primary"
            width="block"
            onClick={() => alert(`Email: ${email}, Password: ${password}`)}
          >
            Sign In
          </Button>

          <div style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-link)',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            Forgot password?
          </div>
        </div>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown can contain forms and interactive elements. Set `closeOnClick={false}` to prevent closing when interacting with form fields.',
      },
    },
  },
};

/**
 * Dropdown with mixed custom content types.
 */
export const WithCustomContent: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary">
          <Icon name="info" />
          Quick Stats
        </Button>
      }
      closeOnClick={false}
    >
      <div style={{ minWidth: '260px', padding: 'var(--padding-md)' }}>
        {/* Custom header */}
        <div style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-3)'
        }}>
          Project Overview
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--gap-md)',
          marginBottom: 'var(--spacing-3)',
          padding: 'var(--padding-sm)',
          background: 'var(--color-background-secondary)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
              Files
            </div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              247
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
              Lines
            </div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              12.4K
            </div>
          </div>
        </div>

        {/* Menu actions */}
        <Menu>
          <MenuItem icon={<Icon name="graph" />}>View Analytics</MenuItem>
          <MenuItem icon={<Icon name="export" />}>Export Report</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="refresh" />}>Refresh Data</MenuItem>
        </Menu>
      </div>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mix custom HTML content with Menu components. Perfect for dashboards, stat cards, or any complex UI that needs dropdown behavior.',
      },
    },
  },
};

/**
 * Controlled dropdown with external state management.
 */
export const ControlledMode: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'center' }}>
        <Badge variant={open ? 'success' : 'default'}>
          Dropdown is {open ? 'Open' : 'Closed'}
        </Badge>

        <Dropdown
          trigger={<Button>Controlled Dropdown</Button>}
          open={open}
          onOpenChange={setOpen}
        >
          <Menu>
            <MenuItem icon={<Icon name="check" />}>Action 1</MenuItem>
            <MenuItem icon={<Icon name="check" />}>Action 2</MenuItem>
            <MenuItem icon={<Icon name="check" />}>Action 3</MenuItem>
          </Menu>
        </Dropdown>

        <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>
          <Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>
            Toggle
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Control dropdown state externally with `open` and `onOpenChange` props. Useful for programmatic control, analytics tracking, or complex UI flows.',
      },
    },
  },
};

/**
 * Dropdown with various trigger types.
 */
export const DifferentTriggers: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Primary button */}
      <Dropdown
        trigger={<Button variant="primary">Primary</Button>}
      >
        <Menu size="sm">
          <MenuItem icon={<Icon name="zap" />}>Quick Action</MenuItem>
          <MenuItem icon={<Icon name="settings" />}>Settings</MenuItem>
        </Menu>
      </Dropdown>

      {/* Icon button */}
      <Dropdown
        trigger={
          <Button variant="ghost" circular>
            <Icon name="ellipsis" />
          </Button>
        }
      >
        <Menu size="sm">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </Dropdown>

      {/* Badge trigger */}
      <Dropdown
        trigger={
          <Badge variant="info" style={{ cursor: 'pointer' }}>
            3 notifications
          </Badge>
        }
      >
        <Menu size="sm">
          <MenuItem>New message from Alice</MenuItem>
          <MenuItem>Comment on your post</MenuItem>
          <MenuItem>Task assigned to you</MenuItem>
        </Menu>
      </Dropdown>

      {/* Custom styled trigger */}
      <Dropdown
        trigger={
          <div style={{
            padding: 'var(--padding-sm) var(--padding-md)',
            background: 'var(--color-secondary)',
            color: 'var(--color-secondary-foreground)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--gap-sm)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            <Icon name="person" />
            <span>Profile</span>
            <Icon name="chevron-down" />
          </div>
        }
      >
        <Menu>
          <MenuItem icon={<Icon name="account" />}>My Account</MenuItem>
          <MenuItem icon={<Icon name="gear" />}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Any React element can be a dropdown trigger: buttons, badges, text, icons, or custom components. Just pass it to the `trigger` prop.',
      },
    },
  },
};

/**
 * Disabled dropdown state.
 */
export const DisabledState: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-md)', alignItems: 'center' }}>
      <Dropdown
        trigger={<Button>Enabled</Button>}
      >
        <Menu>
          <MenuItem icon={<Icon name="check" />}>Works normally</MenuItem>
          <MenuItem icon={<Icon name="check" />}>Fully interactive</MenuItem>
        </Menu>
      </Dropdown>

      <Dropdown
        trigger={<Button>Disabled</Button>}
        disabled
      >
        <Menu>
          <MenuItem icon={<Icon name="x" />}>Won't show</MenuItem>
          <MenuItem icon={<Icon name="x" />}>Inaccessible</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropdowns show reduced opacity and prevent all interaction. Useful for conditional features or loading states.',
      },
    },
  },
};

/**
 * Control close behavior for different use cases.
 */
export const CloseOnClickBehavior: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Default: closes on click */}
      <Dropdown
        trigger={<Button>Default (Closes)</Button>}
        closeOnClick={true}
      >
        <Menu>
          <MenuItem icon={<Icon name="check" />}>Action 1</MenuItem>
          <MenuItem icon={<Icon name="check" />}>Action 2</MenuItem>
          <MenuItem icon={<Icon name="check" />}>Action 3</MenuItem>
        </Menu>
      </Dropdown>

      {/* Stays open for multiple selections */}
      <Dropdown
        trigger={<Button>Stays Open</Button>}
        closeOnClick={false}
      >
        <div style={{ minWidth: '200px', padding: 'var(--padding-md)' }}>
          <div style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-2)'
          }}>
            Select Options
          </div>
          <Menu size="sm">
            <MenuItem icon={<Icon name="check" />}>Option A</MenuItem>
            <MenuItem icon={<Icon name="circle-outline" />}>Option B</MenuItem>
            <MenuItem icon={<Icon name="circle-outline" />}>Option C</MenuItem>
          </Menu>
          <div style={{ marginTop: 'var(--spacing-2)' }}>
            <Button variant="primary" size="sm" width="block">
              Apply
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '**closeOnClick** controls whether dropdown closes when content is clicked. Set to `false` for forms, multi-select, or when users need to interact with multiple items before closing.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all dropdown capabilities with Menu integration.
 */
export const Showcase: Story = {
  args: {
    trigger: null,
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)', padding: 'var(--spacing-8)' }}>
      {/* Placements */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          Placements
        </h3>
        <div style={{ display: 'flex', gap: 'var(--gap-md)', flexWrap: 'wrap' }}>
          <Dropdown trigger={<Button size="sm">Bottom Start</Button>} placement="bottom-start">
            <Menu size="sm">
              <MenuItem icon={<Icon name="arrow-down" />}>Below Left</MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown trigger={<Button size="sm">Bottom End</Button>} placement="bottom-end">
            <Menu size="sm">
              <MenuItem icon={<Icon name="arrow-down" />}>Below Right</MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown trigger={<Button size="sm">Top Start</Button>} placement="top-start">
            <Menu size="sm">
              <MenuItem icon={<Icon name="arrow-up" />}>Above Left</MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown trigger={<Button size="sm">Top End</Button>} placement="top-end">
            <Menu size="sm">
              <MenuItem icon={<Icon name="arrow-up" />}>Above Right</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </section>

      {/* Menu Patterns */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          Menu Patterns
        </h3>
        <div style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Simple Menu */}
          <Dropdown trigger={<Button size="sm"><Icon name="list-unordered" />Simple</Button>}>
            <Menu size="sm">
              <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
              <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
            </Menu>
          </Dropdown>

          {/* With SubMenu */}
          <Dropdown trigger={<Button size="sm"><Icon name="list-tree" />Nested</Button>}>
            <Menu size="sm">
              <MenuItem icon={<Icon name="file" />}>New</MenuItem>
              <SubMenu label="Open Recent" icon={<Icon name="history" />}>
                <MenuItem>File 1.tsx</MenuItem>
                <MenuItem>File 2.tsx</MenuItem>
              </SubMenu>
              <MenuDivider />
              <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
            </Menu>
          </Dropdown>

          {/* With Right Content */}
          <Dropdown trigger={<Button size="sm"><Icon name="keyboard" />Shortcuts</Button>}>
            <Menu size="sm">
              <MenuItem icon={<Icon name="save" />} rightContent={<span>⌘S</span>}>Save</MenuItem>
              <MenuItem icon={<Icon name="search" />} rightContent={<span>⌘F</span>}>Find</MenuItem>
              <MenuItem icon={<Icon name="bell" />} rightContent={<Badge variant="error">3</Badge>}>
                Alerts
              </MenuItem>
            </Menu>
          </Dropdown>

          {/* User Profile */}
          <Dropdown trigger={<Button size="sm"><Icon name="account" />Profile</Button>}>
            <div style={{ minWidth: '200px' }}>
              <div style={{ padding: 'var(--padding-sm)', borderBottom: '1px solid var(--color-divider)', marginBottom: 'var(--spacing-1)' }}>
                <div style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-sm)' }}>
                  John Doe
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
                  john@example.com
                </div>
              </div>
              <Menu size="sm">
                <MenuItem icon={<Icon name="person" />}>Profile</MenuItem>
                <MenuItem icon={<Icon name="gear" />}>Settings</MenuItem>
                <MenuDivider />
                <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Dropdown>
        </div>
      </section>

      {/* Trigger Variations */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          Trigger Variations
        </h3>
        <div style={{ display: 'flex', gap: 'var(--gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Dropdown trigger={<Button variant="primary" size="sm">Primary</Button>}>
            <Menu size="sm"><MenuItem>Action</MenuItem></Menu>
          </Dropdown>
          <Dropdown trigger={<Button variant="secondary" size="sm">Secondary</Button>}>
            <Menu size="sm"><MenuItem>Action</MenuItem></Menu>
          </Dropdown>
          <Dropdown trigger={<Button variant="ghost" circular size="sm"><Icon name="ellipsis" /></Button>}>
            <Menu size="sm">
              <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
              <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown trigger={<Badge variant="info" style={{ cursor: 'pointer' }}>3 new</Badge>}>
            <Menu size="sm">
              <MenuItem>Notification 1</MenuItem>
              <MenuItem>Notification 2</MenuItem>
              <MenuItem>Notification 3</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </section>

      {/* Custom Content */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          Custom Content
        </h3>
        <div style={{ display: 'flex', gap: 'var(--gap-md)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Stats Card */}
          <Dropdown trigger={<Button size="sm"><Icon name="graph" />Stats</Button>} closeOnClick={false}>
            <div style={{ minWidth: '220px', padding: 'var(--padding-md)' }}>
              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-2)' }}>
                Quick Stats
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap-sm)', marginBottom: 'var(--spacing-2)', padding: 'var(--padding-sm)', background: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Files</div>
                  <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>127</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Lines</div>
                  <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>8.2K</div>
                </div>
              </div>
              <Menu size="sm">
                <MenuItem icon={<Icon name="export" />}>Export</MenuItem>
                <MenuItem icon={<Icon name="refresh" />}>Refresh</MenuItem>
              </Menu>
            </div>
          </Dropdown>

          {/* Form */}
          <Dropdown trigger={<Button size="sm"><Icon name="mail" />Quick Reply</Button>} closeOnClick={false}>
            <div style={{ minWidth: '240px', padding: 'var(--padding-md)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-1)' }}>Message</div>
                <Input placeholder="Type your reply..." fullWidth />
              </div>
              <Button variant="primary" size="sm" width="block">Send</Button>
            </div>
          </Dropdown>
        </div>
      </section>

      {/* States */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>
          States
        </h3>
        <div style={{ display: 'flex', gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Dropdown trigger={<Button size="sm">Enabled</Button>}>
            <Menu size="sm"><MenuItem>Normal dropdown</MenuItem></Menu>
          </Dropdown>
          <Dropdown trigger={<Button size="sm">Disabled</Button>} disabled>
            <Menu size="sm"><MenuItem>Won't open</MenuItem></Menu>
          </Dropdown>
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of Dropdown with Menu integration. Demonstrates placements, nested menus, triggers, custom content mixing, and all available patterns in one view.',
      },
    },
  },
};
