'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Menu, MenuItem, MenuDivider, SubMenu, Icon, Badge, Dropdown, Button } from 'baukasten-ui';

const menuProps: PropDefinition[] = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of all menu items',
    },
    {
        name: 'iconOnly',
        type: 'boolean',
        default: 'false',
        description: 'Whether the menu contains only icons (reduces horizontal padding)',
    },
    {
        name: 'direction',
        type: '"vertical" | "horizontal"',
        default: '"vertical"',
        description: 'Direction of the menu layout',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Menu items and dividers',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const menuItemProps: PropDefinition[] = [
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Icon to display before the label',
    },
    {
        name: 'rightContent',
        type: 'React.ReactNode',
        description: 'Content to display on the right side (badges, shortcuts, etc.)',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the menu item is disabled',
    },
    {
        name: 'selected',
        type: 'boolean',
        default: 'false',
        description: 'Whether the menu item is currently selected/active',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Menu item label (optional for icon-only menu items)',
    },
    {
        name: 'onClick',
        type: '(e: React.MouseEvent) => void',
        description: 'Click handler for the menu item',
    },
];

const subMenuProps: PropDefinition[] = [
    {
        name: 'label',
        type: 'React.ReactNode',
        required: true,
        description: 'Label for the submenu trigger',
    },
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Icon to display before the label',
    },
    {
        name: 'rightIcon',
        type: 'React.ReactNode',
        description: 'Custom icon to display on the right (defaults to chevron)',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the submenu is disabled',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Nested menu items',
    },
];

// Interactive example with state
function InteractiveExample() {
    const [selectedItem, setSelectedItem] = useState('edit');

    return (
        <Menu>
            <MenuItem
                icon={<Icon name="edit" />}
                selected={selectedItem === 'edit'}
                onClick={() => setSelectedItem('edit')}
            >
                Edit
            </MenuItem>
            <MenuItem
                icon={<Icon name="copy" />}
                selected={selectedItem === 'copy'}
                onClick={() => setSelectedItem('copy')}
            >
                Copy
            </MenuItem>
            <MenuItem
                icon={<Icon name="clippy" />}
                selected={selectedItem === 'paste'}
                onClick={() => setSelectedItem('paste')}
            >
                Paste
            </MenuItem>
            <MenuDivider />
            <MenuItem
                icon={<Icon name="trash" />}
                selected={selectedItem === 'delete'}
                onClick={() => setSelectedItem('delete')}
            >
                Delete
            </MenuItem>
        </Menu>
    );
}

export default function MenuPage() {
    return (
        <PageLayout
            title="Menu"
            description="A versatile menu component system for creating dropdown menus, context menus, and navigation menus. Supports keyboard navigation, icons, badges, and infinite nesting."
        >
            <Showcase
                title="Basic Usage"
                description="The Menu component contains MenuItem and MenuDivider components. Menu items can have icons and right-aligned content."
                preview={
                    <Menu>
                        <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
                        <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
                        <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
                    </Menu>
                }
                code={`import { Menu, MenuItem, MenuDivider, Icon } from 'baukasten-ui';

function App() {
  return (
    <Menu>
      <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
      <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
      <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
    </Menu>
  );
}`}
                props={menuProps}
            />

            <Showcase
                title="Sizes"
                description="Five size options: xs, sm, md (default), lg, and xl. The size affects padding, font size, and icon size for all menu items."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Extra Small
                            </div>
                            <Menu size="xs">
                                <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
                                <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Small
                            </div>
                            <Menu size="sm">
                                <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
                                <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Medium (Default)
                            </div>
                            <Menu>
                                <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
                                <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Large
                            </div>
                            <Menu size="lg">
                                <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
                                <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
                code={`<Menu size="xs">
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
</Menu>

<Menu size="sm">
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
</Menu>

<Menu size="md">  {/* Default */}
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
</Menu>

<Menu size="lg">
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
</Menu>

<Menu size="xl">
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
</Menu>`}
            />

            <Showcase
                title="With Right Content"
                description="Menu items support rightContent for displaying keyboard shortcuts, badges, counts, or any React element."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Keyboard Shortcuts
                            </div>
                            <Menu>
                                <MenuItem icon={<Icon name="save" />} rightContent="⌘S">
                                    Save
                                </MenuItem>
                                <MenuItem icon={<Icon name="copy" />} rightContent="⌘C">
                                    Copy
                                </MenuItem>
                                <MenuItem icon={<Icon name="search" />} rightContent="⌘F">
                                    Find
                                </MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                With Badges
                            </div>
                            <Menu>
                                <MenuItem
                                    icon={<Icon name="inbox" />}
                                    rightContent={<Badge size="xs">12</Badge>}
                                >
                                    Inbox
                                </MenuItem>
                                <MenuItem
                                    icon={<Icon name="mail" />}
                                    rightContent={<Badge size="xs" variant="warning">5</Badge>}
                                >
                                    Unread
                                </MenuItem>
                                <MenuItem icon={<Icon name="check" />}>
                                    Done
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
                code={`// Keyboard shortcuts
<Menu>
  <MenuItem icon={<Icon name="save" />} rightContent="⌘S">
    Save
  </MenuItem>
  <MenuItem icon={<Icon name="copy" />} rightContent="⌘C">
    Copy
  </MenuItem>
</Menu>

// With badges
<Menu>
  <MenuItem
    icon={<Icon name="inbox" />}
    rightContent={<Badge size="xs">12</Badge>}
  >
    Inbox
  </MenuItem>
  <MenuItem
    icon={<Icon name="mail" />}
    rightContent={<Badge size="xs" variant="warning">5</Badge>}
  >
    Unread
  </MenuItem>
</Menu>`}
            />

            <Showcase
                title="States"
                description="Menu items support disabled and selected states. Disabled items cannot be clicked or focused, while selected items indicate the current choice."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Disabled Items
                            </div>
                            <Menu>
                                <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
                                <MenuItem icon={<Icon name="copy" />} disabled>
                                    Copy (disabled)
                                </MenuItem>
                                <MenuItem icon={<Icon name="clippy" />} disabled>
                                    Paste (disabled)
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Selected Items
                            </div>
                            <Menu>
                                <MenuItem icon={<Icon name="layout-panel-left" />} selected>
                                    Side Panel
                                </MenuItem>
                                <MenuItem icon={<Icon name="layout-statusbar" />}>
                                    Status Bar
                                </MenuItem>
                                <MenuItem icon={<Icon name="layout-activitybar-left" />}>
                                    Activity Bar
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
                code={`// Disabled items
<Menu>
  <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
  <MenuItem icon={<Icon name="copy" />} disabled>
    Copy (disabled)
  </MenuItem>
</Menu>

// Selected items
<Menu>
  <MenuItem icon={<Icon name="layout-panel-left" />} selected>
    Side Panel
  </MenuItem>
  <MenuItem icon={<Icon name="layout-statusbar" />}>
    Status Bar
  </MenuItem>
</Menu>`}
                props={menuItemProps}
            />

            <Showcase
                title="Icon-Only Menus"
                description="Icon-only mode reduces horizontal padding, making menus more compact. Perfect for toolbars and side panels."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Icon Only
                            </div>
                            <Menu iconOnly>
                                <MenuItem icon={<Icon name="home" />} selected />
                                <MenuItem icon={<Icon name="search" />} />
                                <MenuItem icon={<Icon name="mail" />} />
                                <MenuItem icon={<Icon name="bell" />} />
                                <MenuItem icon={<Icon name="gear" />} />
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                With Dividers
                            </div>
                            <Menu iconOnly>
                                <MenuItem icon={<Icon name="edit" />} selected />
                                <MenuItem icon={<Icon name="copy" />} />
                                <MenuItem icon={<Icon name="clippy" />} />
                                <MenuDivider />
                                <MenuItem icon={<Icon name="trash" />} />
                            </Menu>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Small Size
                            </div>
                            <Menu size="sm" iconOnly>
                                <MenuItem icon={<Icon name="file" />} />
                                <MenuItem icon={<Icon name="folder" />} selected />
                                <MenuItem icon={<Icon name="save" />} />
                                <MenuItem icon={<Icon name="share" />} />
                            </Menu>
                        </div>
                    </div>
                }
                code={`<Menu iconOnly>
  <MenuItem icon={<Icon name="home" />} selected />
  <MenuItem icon={<Icon name="search" />} />
  <MenuItem icon={<Icon name="mail" />} />
  <MenuItem icon={<Icon name="bell" />} />
</Menu>

// With dividers
<Menu iconOnly>
  <MenuItem icon={<Icon name="edit" />} selected />
  <MenuItem icon={<Icon name="copy" />} />
  <MenuDivider />
  <MenuItem icon={<Icon name="trash" />} />
</Menu>

// Small icon-only menu
<Menu size="sm" iconOnly>
  <MenuItem icon={<Icon name="file" />} />
  <MenuItem icon={<Icon name="folder" />} selected />
  <MenuItem icon={<Icon name="save" />} />
</Menu>`}
            />

            <Showcase
                title="Horizontal Menus"
                description="Horizontal direction is perfect for navigation bars and toolbars. Works with both text and icon-only modes."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', alignItems: 'flex-start' }}>
                        <div style={{ width: '100%' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Horizontal with Text
                            </div>
                            <Menu direction="horizontal">
                                <MenuItem icon={<Icon name="home" />} selected>
                                    Home
                                </MenuItem>
                                <MenuItem icon={<Icon name="search" />}>Search</MenuItem>
                                <MenuItem icon={<Icon name="mail" />}>Messages</MenuItem>
                                <MenuItem icon={<Icon name="bell" />}>Notifications</MenuItem>
                            </Menu>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Horizontal Icon-Only (Toolbar)
                            </div>
                            <Menu direction="horizontal" iconOnly>
                                <MenuItem icon={<Icon name="edit" />} selected />
                                <MenuItem icon={<Icon name="copy" />} />
                                <MenuItem icon={<Icon name="clippy" />} />
                                <MenuDivider />
                                <MenuItem icon={<Icon name="bold" />} />
                                <MenuItem icon={<Icon name="italic" />} />
                            </Menu>
                        </div>
                    </div>
                }
                code={`// Horizontal with text
<Menu direction="horizontal">
  <MenuItem icon={<Icon name="home" />} selected>
    Home
  </MenuItem>
  <MenuItem icon={<Icon name="search" />}>Search</MenuItem>
  <MenuItem icon={<Icon name="mail" />}>Messages</MenuItem>
</Menu>

// Horizontal icon-only (toolbar)
<Menu direction="horizontal" iconOnly>
  <MenuItem icon={<Icon name="edit" />} selected />
  <MenuItem icon={<Icon name="copy" />} />
  <MenuItem icon={<Icon name="clippy" />} />
  <MenuDivider />
  <MenuItem icon={<Icon name="bold" />} />
  <MenuItem icon={<Icon name="italic" />} />
</Menu>`}
            />

            <Showcase
                title="SubMenus"
                description="SubMenu component creates nested menus that expand on hover. They can be nested infinitely for complex hierarchies."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Basic SubMenu
                            </div>
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
                            <div style={{ fontSize: 'var(--bk-font-size-xs)', marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                Nested SubMenus
                            </div>
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
                    </div>
                }
                code={`// Basic submenu
<Menu>
  <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
  <SubMenu label="Open Recent" icon={<Icon name="folder-opened" />}>
    <MenuItem>project-1.txt</MenuItem>
    <MenuItem>project-2.txt</MenuItem>
    <MenuItem>project-3.txt</MenuItem>
  </SubMenu>
  <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
</Menu>

// Nested submenus
<Menu>
  <SubMenu label="Edit" icon={<Icon name="edit" />}>
    <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
    <SubMenu label="Transform" icon={<Icon name="symbol-method" />}>
      <MenuItem>Uppercase</MenuItem>
      <MenuItem>Lowercase</MenuItem>
    </SubMenu>
  </SubMenu>
</Menu>`}
                props={subMenuProps}
            />

            <Showcase
                title="With Dropdown"
                description="Menu works seamlessly with Dropdown to create complete dropdown menu solutions. The Menu handles content structure while Dropdown handles positioning and visibility."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)', flexWrap: 'wrap' }}>
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

                        <Dropdown trigger={<Button>File Menu</Button>}>
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
                            </Menu>
                        </Dropdown>
                    </div>
                }
                code={`import { Dropdown, Button, Menu, MenuItem, SubMenu } from 'baukasten-ui';

// Action menu dropdown
<Dropdown
  trigger={<Button>Actions</Button>}
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
    </SubMenu>
    <MenuDivider />
    <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
  </Menu>
</Dropdown>

// Icon button dropdown
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
</Dropdown>`}
            />

            <Showcase
                title="Interactive Example"
                description="Menu items support onClick handlers for interactive behavior. Use the selected prop to highlight the active item."
                preview={<InteractiveExample />}
                code={`import { useState } from 'react';
import { Menu, MenuItem, MenuDivider, Icon } from 'baukasten-ui';

function InteractiveExample() {
  const [selectedItem, setSelectedItem] = useState('edit');

  return (
    <Menu>
      <MenuItem
        icon={<Icon name="edit" />}
        selected={selectedItem === 'edit'}
        onClick={() => setSelectedItem('edit')}
      >
        Edit
      </MenuItem>
      <MenuItem
        icon={<Icon name="copy" />}
        selected={selectedItem === 'copy'}
        onClick={() => setSelectedItem('copy')}
      >
        Copy
      </MenuItem>
      <MenuItem
        icon={<Icon name="clippy" />}
        selected={selectedItem === 'paste'}
        onClick={() => setSelectedItem('paste')}
      >
        Paste
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<Icon name="trash" />}
        selected={selectedItem === 'delete'}
        onClick={() => setSelectedItem('delete')}
      >
        Delete
      </MenuItem>
    </Menu>
  );
}`}
            />

            <div
                style={{
                    marginTop: 'var(--bk-spacing-8)',
                    padding: 'var(--bk-spacing-6)',
                    background: 'var(--vscode-textBlockQuote-background)',
                    border: '1px solid var(--vscode-textBlockQuote-border)',
                    borderRadius: 'var(--bk-radius-md)',
                }}
            >
                <h3 style={{ marginTop: 0, marginBottom: 'var(--bk-spacing-3)' }}>Accessibility</h3>
                <ul style={{ marginBottom: 0, paddingLeft: 'var(--bk-spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Keyboard Navigation:</strong> Use <code>Arrow Keys</code> to navigate between items, <code>Enter</code> or <code>Space</code> to activate, <code>Home</code>/<code>End</code> to jump to first/last item
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>SubMenu Navigation:</strong> Use <code>Arrow Right</code> to open submenus, <code>Arrow Left</code> or <code>Escape</code> to close
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Screen Readers:</strong> Menu items have proper <code>role="menu"</code> and <code>role="menuitem"</code> attributes
                    </li>
                    <li>
                        <strong>Focus Management:</strong> Disabled items are not focusable (<code>tabIndex={-1}</code>)
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
