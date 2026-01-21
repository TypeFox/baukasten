import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem, MenuDivider, SubMenu } from './Menu';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile menu component system for creating dropdown menus, context menus, and navigation menus. Includes MenuItem for clickable items, MenuDivider for separators, and SubMenu for nested hierarchies. Fully integrates with the design system and supports icons, badges, shortcuts, and infinite nesting.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of all menu items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the menu contains only icons (reduces horizontal padding)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the menu layout',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all menu properties exposed.
 * Use the controls below to experiment with different sizes.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
      <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
      <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore menu sizes. Try different size options using the controls below.',
      },
    },
  },
};

/**
 * All available menu sizes from extra small to extra large.
 */
export const Sizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Extra Small
        </h4>
        <Menu size="xs">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Small
        </h4>
        <Menu size="sm">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Medium (Default)
        </h4>
        <Menu size="md">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Large
        </h4>
        <Menu size="lg">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Extra Large
        </h4>
        <Menu size="xl">
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. The size affects padding, font size, and icon size for all menu items.',
      },
    },
  },
};

/**
 * Menu items with icons for visual clarity.
 */
export const WithIcons: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
      <MenuItem icon={<Icon name="folder-opened" />}>Open Folder</MenuItem>
      <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
      <MenuItem icon={<Icon name="save-as" />}>Save As...</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="close" />}>Close</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu items can have icons for better visual identification. Icons automatically scale with the menu size.',
      },
    },
  },
};

/**
 * Menu items with right-aligned content like badges, shortcuts, or counts.
 */
export const WithRightContent: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Keyboard Shortcuts
        </h4>
        <Menu>
          <MenuItem
            icon={<Icon name="save" />}
            rightContent="⌘S"
          >
            Save
          </MenuItem>
          <MenuItem
            icon={<Icon name="copy" />}
            rightContent="⌘C"
          >
            Copy
          </MenuItem>
          <MenuItem
            icon={<Icon name="clippy" />}
            rightContent="⌘V"
          >
            Paste
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon name="search" />}
            rightContent="⌘F"
          >
            Find
          </MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          With Badges
        </h4>
        <Menu>
          <MenuItem
            icon={<Icon name="inbox" />}
            rightContent={<Badge size="xs">12</Badge>}
          >
            Inbox
          </MenuItem>
          <MenuItem
            icon={<Icon name="mail" />}
            rightContent={<Badge size="xs">5</Badge>}
          >
            Unread
          </MenuItem>
          <MenuItem
            icon={<Icon name="check" />}
            rightContent={<Badge size="xs">100+</Badge>}
          >
            Done
          </MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Mixed Content
        </h4>
        <Menu>
          <MenuItem
            icon={<Icon name="file" />}
            rightContent="New"
          >
            Create Document
          </MenuItem>
          <MenuItem
            icon={<Icon name="folder" />}
            rightContent={<span style={{ fontSize: '0.75em', opacity: 0.7 }}>Recent</span>}
          >
            Open Folder
          </MenuItem>
          <MenuItem
            icon={<Icon name="star-full" />}
            rightContent={<Icon name="lock" />}
          >
            Favorites
          </MenuItem>
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu items can display additional content on the right side: keyboard shortcuts, badges, counts, or any React element.',
      },
    },
  },
};

/**
 * Menu dividers for visual grouping of related items.
 */
export const WithDividers: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
      <MenuItem icon={<Icon name="copy" />}>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="archive" />}>Archive</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use MenuDivider to visually separate groups of related menu items.',
      },
    },
  },
};

/**
 * Menu items in different states: disabled and selected.
 */
export const States: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Disabled Items
        </h4>
        <Menu>
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />} disabled>Copy (disabled)</MenuItem>
          <MenuItem icon={<Icon name="clippy" />} disabled>Paste (disabled)</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Selected Items
        </h4>
        <Menu>
          <MenuItem icon={<Icon name="layout-panel-left" />} selected>Side Panel</MenuItem>
          <MenuItem icon={<Icon name="layout-statusbar" />}>Status Bar</MenuItem>
          <MenuItem icon={<Icon name="layout-activitybar-left" />}>Activity Bar</MenuItem>
          <MenuItem icon={<Icon name="layout-menubar" />}>Menu Bar</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Mixed States
        </h4>
        <Menu>
          <MenuItem icon={<Icon name="check" />} selected>Enabled (selected)</MenuItem>
          <MenuItem icon={<Icon name="close" />}>Not Selected</MenuItem>
          <MenuItem icon={<Icon name="debug-alt" />} disabled>Disabled</MenuItem>
          <MenuItem icon={<Icon name="question" />}>Normal</MenuItem>
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu items support **disabled** and **selected** states. Disabled items cannot be clicked, while selected items indicate the current choice.',
      },
    },
  },
};

/**
 * Icon-only menu items for compact navigation or toolbars.
 */
export const IconOnly: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Icon Only Menu
        </h4>
        <Menu iconOnly>
          <MenuItem icon={<Icon name="home" />} selected />
          <MenuItem icon={<Icon name="search" />} />
          <MenuItem icon={<Icon name="mail" />} />
          <MenuItem icon={<Icon name="bell" />} />
          <MenuItem icon={<Icon name="gear" />} />
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Compact Size
        </h4>
        <Menu size="sm" iconOnly>
          <MenuItem icon={<Icon name="file" />} />
          <MenuItem icon={<Icon name="folder" />} selected />
          <MenuItem icon={<Icon name="save" />} />
          <MenuItem icon={<Icon name="share" />} />
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          With Dividers
        </h4>
        <Menu iconOnly>
          <MenuItem icon={<Icon name="edit" />} selected />
          <MenuItem icon={<Icon name="copy" />} />
          <MenuItem icon={<Icon name="clippy" />} />
          <MenuDivider />
          <MenuItem icon={<Icon name="trash" />} />
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only menu items are perfect for compact navigation, toolbars, or side panels. Set **iconOnly** prop on Menu to reduce horizontal padding. Use the **selected** prop to highlight the active item.',
      },
    },
  },
};

/**
 * Horizontal menus for navigation bars and toolbars.
 */
export const Horizontal: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Horizontal with Text
        </h4>
        <Menu direction="horizontal">
          <MenuItem icon={<Icon name="home" />} selected>Home</MenuItem>
          <MenuItem icon={<Icon name="search" />}>Search</MenuItem>
          <MenuItem icon={<Icon name="mail" />}>Messages</MenuItem>
          <MenuItem icon={<Icon name="bell" />}>Notifications</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Horizontal Icon-Only (Toolbar)
        </h4>
        <Menu direction="horizontal" iconOnly>
          <MenuItem icon={<Icon name="edit" />} selected />
          <MenuItem icon={<Icon name="copy" />} />
          <MenuItem icon={<Icon name="clippy" />} />
          <MenuDivider />
          <MenuItem icon={<Icon name="bold" />} />
          <MenuItem icon={<Icon name="italic" />} />
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Horizontal Compact
        </h4>
        <Menu direction="horizontal" iconOnly size="sm">
          <MenuItem icon={<Icon name="file" />} />
          <MenuItem icon={<Icon name="folder" />} selected />
          <MenuItem icon={<Icon name="save" />} />
          <MenuItem icon={<Icon name="share" />} />
          <MenuItem icon={<Icon name="trash" />} />
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal menus work great for navigation bars and toolbars. Set **direction="horizontal"** and combine with **iconOnly** for compact toolbar layouts.',
      },
    },
  },
};

/**
 * SubMenus for hierarchical navigation with nested items.
 */
export const WithSubMenus: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Basic SubMenu
        </h4>
        <Menu>
          <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
          <SubMenu label="Open Recent" icon={<Icon name="folder-opened" />}>
            <MenuItem>project-1.txt</MenuItem>
            <MenuItem>project-2.txt</MenuItem>
            <MenuItem>project-3.txt</MenuItem>
          </SubMenu>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Nested SubMenus
        </h4>
        <Menu>
          <SubMenu label="Edit" icon={<Icon name="edit" />}>
            <MenuItem icon={<Icon name="discard" />}>Cut</MenuItem>
            <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
            <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
            <MenuDivider />
            <SubMenu label="Transform" icon={<Icon name="symbol-method" />}>
              <MenuItem>Uppercase</MenuItem>
              <MenuItem>Lowercase</MenuItem>
              <MenuItem>Title Case</MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label="View" icon={<Icon name="eye" />}>
            <MenuItem>Zoom In</MenuItem>
            <MenuItem>Zoom Out</MenuItem>
            <MenuDivider />
            <MenuItem>Full Screen</MenuItem>
          </SubMenu>
        </Menu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Deep Nesting
        </h4>
        <Menu>
          <SubMenu label="Level 1" icon={<Icon name="folder" />}>
            <MenuItem>Item 1.1</MenuItem>
            <SubMenu label="Level 2" icon={<Icon name="folder" />}>
              <MenuItem>Item 2.1</MenuItem>
              <SubMenu label="Level 3" icon={<Icon name="folder" />}>
                <MenuItem>Item 3.1</MenuItem>
                <MenuItem>Item 3.2</MenuItem>
              </SubMenu>
              <MenuItem>Item 2.2</MenuItem>
            </SubMenu>
            <MenuItem>Item 1.2</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SubMenu components create nested menus that expand on hover. They can be nested infinitely for complex hierarchies.',
      },
    },
  },
};

/**
 * Menu integrated with Dropdown for a complete dropdown menu solution.
 */
export const WithDropdown: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Dropdown
        trigger={
          <Button variant="secondary">
            <Icon name="ellipsis" />
            Actions
          </Button>
        }
      >
        <Menu>
          <MenuItem icon={<Icon name="edit" />} rightContent="⌘E">
            Edit
          </MenuItem>
          <MenuItem icon={<Icon name="copy" />} rightContent="⌘D">
            Duplicate
          </MenuItem>
          <MenuDivider />
          <SubMenu label="Share" icon={<Icon name="link" />}>
            <MenuItem icon={<Icon name="mail" />}>Email Link</MenuItem>
            <MenuItem icon={<Icon name="copy" />}>Copy Link</MenuItem>
            <MenuItem icon={<Icon name="globe" />}>Make Public</MenuItem>
          </SubMenu>
          <MenuDivider />
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </Dropdown>

      <Dropdown
        trigger={
          <Button variant="ghost" circular>
            <Icon name="kebab-vertical" />
          </Button>
        }
      >
        <Menu size="sm">
          <MenuItem icon={<Icon name="person" />}>Profile</MenuItem>
          <MenuItem icon={<Icon name="gear" />}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
        </Menu>
      </Dropdown>

      <Dropdown
        trigger={<Button>File Menu</Button>}
        placement="bottom-start"
      >
        <Menu>
          <MenuItem icon={<Icon name="file" />} rightContent="⌘N">
            New File
          </MenuItem>
          <SubMenu label="Open Recent" icon={<Icon name="folder-opened" />}>
            <MenuItem>Project A</MenuItem>
            <MenuItem>Project B</MenuItem>
            <MenuItem>Project C</MenuItem>
          </SubMenu>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />} rightContent="⌘S">
            Save
          </MenuItem>
          <MenuItem icon={<Icon name="save-as" />} rightContent="⇧⌘S">
            Save As...
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="close" />} rightContent="⌘W">
            Close
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu works perfectly with Dropdown to create complete dropdown menu solutions. The Menu handles the content structure while Dropdown handles the positioning and visibility.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all menu capabilities.
 */
export const Showcase: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', padding: 'var(--spacing-6)' }}>
      {/* Basic Menu */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Basic Menu
        </h3>
        <Menu>
          <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
          <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
          <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
      </div>

      {/* With Right Content */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          With Shortcuts & Badges
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Menu>
            <MenuItem icon={<Icon name="save" />} rightContent="⌘S">Save</MenuItem>
            <MenuItem icon={<Icon name="copy" />} rightContent="⌘C">Copy</MenuItem>
            <MenuItem icon={<Icon name="search" />} rightContent="⌘F">Find</MenuItem>
          </Menu>
          <Menu>
            <MenuItem icon={<Icon name="inbox" />} rightContent={<Badge size='xs'>12</Badge>}>Inbox</MenuItem>
            <MenuItem icon={<Icon name="mail" />} rightContent={<Badge size='xs'>5</Badge>}>Unread</MenuItem>
            <MenuItem icon={<Icon name="check" />}>Done</MenuItem>
          </Menu>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          States
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Menu>
            <MenuItem icon={<Icon name="check" />} selected>Selected</MenuItem>
            <MenuItem icon={<Icon name="close" />}>Normal</MenuItem>
            <MenuItem icon={<Icon name="debug-alt" />} disabled>Disabled</MenuItem>
          </Menu>
        </div>
      </div>

      {/* SubMenus */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          SubMenus
        </h3>
        <Menu>
          <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
          <SubMenu label="Edit" icon={<Icon name="edit" />}>
            <MenuItem icon={<Icon name="discard" />}>Cut</MenuItem>
            <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
            <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
          </SubMenu>
          <SubMenu label="Open Recent" icon={<Icon name="folder-opened" />}>
            <MenuItem>project-1.txt</MenuItem>
            <MenuItem>project-2.txt</MenuItem>
            <MenuItem>project-3.txt</MenuItem>
          </SubMenu>
          <MenuDivider />
          <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        </Menu>
      </div>

      {/* With Dropdown */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          In Dropdown
        </h3>
        <Dropdown
          trigger={<Button variant="secondary">Open Menu</Button>}
        >
          <Menu>
            <MenuItem icon={<Icon name="edit" />} rightContent="⌘E">Edit</MenuItem>
            <MenuItem icon={<Icon name="copy" />} rightContent="⌘D">Duplicate</MenuItem>
            <MenuDivider />
            <SubMenu label="Share" icon={<Icon name="link" />}>
              <MenuItem icon={<Icon name="mail" />}>Email Link</MenuItem>
              <MenuItem icon={<Icon name="copy" />}>Copy Link</MenuItem>
            </SubMenu>
            <MenuDivider />
            <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all menu capabilities: basic items, icons, right content, dividers, states, submenus, and dropdown integration.',
      },
    },
  },
};
