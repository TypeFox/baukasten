'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Dropdown, Button, Icon, Badge, Input } from '@baukasten/ui';
import { Menu, MenuItem, MenuDivider, SubMenu } from '@baukasten/ui';

const dropdownProps: PropDefinition[] = [
  {
    name: 'trigger',
    type: 'React.ReactNode',
    required: true,
    description: 'The element that opens the dropdown when clicked',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The content to display inside the dropdown',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Controlled open state (optional)',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback when the dropdown open state changes',
  },
  {
    name: 'placement',
    type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"',
    default: '"bottom-start"',
    description: 'Position of the dropdown relative to the trigger',
  },
  {
    name: 'closeOnClick',
    type: 'boolean',
    default: 'true',
    description: 'Whether to close the dropdown when clicking inside it',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the dropdown is disabled',
  },
];

// Controlled example
function ControlledExample() {
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

      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
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
}

// Form example
function FormExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Dropdown
      trigger={<Button>Sign In</Button>}
      closeOnClick={false}
    >
      <div style={{
        padding: 'var(--spacing-5)',
        minWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)'
      }}>
        <div style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 600,
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

        <Button variant="primary" width="block">
          Sign In
        </Button>

        <div style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--vscode-textLink-foreground)',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          Forgot password?
        </div>
      </div>
    </Dropdown>
  );
}

export default function DropdownPage() {
  return (
    <PageLayout
      title="Dropdown"
      description="A flexible dropdown component that displays custom content when triggered. Perfect for menus, forms, and complex UI patterns."
    >
      <Showcase
        title="Basic Usage"
        description="Use with the Menu component for action menus. This is the most common pattern."
        preview={
          <Dropdown
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
        }
        code={`import { Dropdown, Button, Icon } from '@baukasten/ui';
import { Menu, MenuItem, MenuDivider } from '@baukasten/ui';

function App() {
  return (
    <Dropdown trigger={<Button>Open Menu</Button>}>
      <Menu>
        <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
        <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
        <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}`}
      />

      <Showcase
        title="Placement Options"
        description="Four placement options: bottom-start (default), bottom-end, top-start, and top-end."
        preview={
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
            <Dropdown
              trigger={<Button size="sm">Bottom Start</Button>}
              placement="bottom-start"
            >
              <Menu size="sm">
                <MenuItem icon={<Icon name="arrow-down" />}>Below, aligned left</MenuItem>
              </Menu>
            </Dropdown>

            <Dropdown
              trigger={<Button size="sm">Bottom End</Button>}
              placement="bottom-end"
            >
              <Menu size="sm">
                <MenuItem icon={<Icon name="arrow-down" />}>Below, aligned right</MenuItem>
              </Menu>
            </Dropdown>

            <Dropdown
              trigger={<Button size="sm">Top Start</Button>}
              placement="top-start"
            >
              <Menu size="sm">
                <MenuItem icon={<Icon name="arrow-up" />}>Above, aligned left</MenuItem>
              </Menu>
            </Dropdown>

            <Dropdown
              trigger={<Button size="sm">Top End</Button>}
              placement="top-end"
            >
              <Menu size="sm">
                <MenuItem icon={<Icon name="arrow-up" />}>Above, aligned right</MenuItem>
              </Menu>
            </Dropdown>
          </div>
        }
        code={`<Dropdown placement="bottom-start" trigger={<Button>Bottom Start</Button>}>
  <Menu><MenuItem>Below, aligned left</MenuItem></Menu>
</Dropdown>

<Dropdown placement="bottom-end" trigger={<Button>Bottom End</Button>}>
  <Menu><MenuItem>Below, aligned right</MenuItem></Menu>
</Dropdown>

<Dropdown placement="top-start" trigger={<Button>Top Start</Button>}>
  <Menu><MenuItem>Above, aligned left</MenuItem></Menu>
</Dropdown>

<Dropdown placement="top-end" trigger={<Button>Top End</Button>}>
  <Menu><MenuItem>Above, aligned right</MenuItem></Menu>
</Dropdown>`}
      />

      <Showcase
        title="With Submenus"
        description="Use SubMenu component for nested menus. Submenus support infinite nesting."
        preview={
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
            </Menu>
          </Dropdown>
        }
        code={`<Dropdown trigger={<Button>File Menu</Button>}>
  <Menu>
    <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
    <MenuDivider />
    <SubMenu label="Open Recent" icon={<Icon name="history" />}>
      <MenuItem>project-1.tsx</MenuItem>
      <MenuItem>component.tsx</MenuItem>
    </SubMenu>
    <SubMenu label="Export" icon={<Icon name="export" />}>
      <MenuItem>Export as JSON</MenuItem>
      <MenuItem>Export as PDF</MenuItem>
    </SubMenu>
    <MenuDivider />
    <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
  </Menu>
</Dropdown>`}
      />

      <Showcase
        title="User Profile Menu"
        description="Common pattern: user profile dropdown with custom header and menu items."
        preview={
          <Dropdown
            trigger={
              <Button variant="secondary">
                <Icon name="account" />
                My Account
              </Button>
            }
          >
            <div style={{ minWidth: '220px' }}>
              <div style={{
                padding: 'var(--spacing-3)',
                borderBottom: '1px solid var(--vscode-panel-border)',
                marginBottom: 'var(--spacing-1)'
              }}>
                <div style={{
                  fontWeight: 600,
                  fontSize: 'var(--font-size-base)',
                  marginBottom: '2px'
                }}>
                  Jane Developer
                </div>
                <div style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--vscode-descriptionForeground)'
                }}>
                  jane.dev@example.com
                </div>
              </div>

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
        }
        code={`<Dropdown trigger={<Button>My Account</Button>}>
  <div style={{ minWidth: '220px' }}>
    {/* Custom header */}
    <div style={{ 
      padding: 'var(--spacing-3)', 
      borderBottom: '1px solid var(--vscode-panel-border)' 
    }}>
      <div>Jane Developer</div>
      <div>jane.dev@example.com</div>
    </div>

    {/* Menu items */}
    <Menu>
      <MenuItem icon={<Icon name="person" />}>Profile Settings</MenuItem>
      <MenuItem icon={<Icon name="gear" />}>Preferences</MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
    </Menu>
  </div>
</Dropdown>`}
      />

      <Showcase
        title="With Right Content"
        description="MenuItem supports rightContent for shortcuts, badges, or additional info."
        preview={
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
                rightContent={<Badge variant="error" size="sm">5</Badge>}
              >
                Notifications
              </MenuItem>
              <MenuItem
                icon={<Icon name="inbox" />}
                rightContent={<Badge variant="info" size="sm">12</Badge>}
              >
                Messages
              </MenuItem>
            </Menu>
          </Dropdown>
        }
        code={`<Dropdown trigger={<Button>Commands</Button>}>
  <Menu>
    <MenuItem
      icon={<Icon name="save" />}
      rightContent={<span>⌘S</span>}
    >
      Save
    </MenuItem>
    <MenuItem
      icon={<Icon name="bell" />}
      rightContent={<Badge variant="error" size="sm">5</Badge>}
    >
      Notifications
    </MenuItem>
  </Menu>
</Dropdown>`}
      />

      <Showcase
        title="With Form"
        description="Dropdown can contain forms. Set closeOnClick={false} to prevent closing when interacting with inputs."
        preview={<FormExample />}
        code={`import { useState } from 'react';
import { Dropdown, Button, Input } from '@baukasten/ui';

function FormExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Dropdown
      trigger={<Button>Sign In</Button>}
      closeOnClick={false}
    >
      <div style={{ padding: 'var(--spacing-5)', minWidth: '280px' }}>
        <h3>Welcome Back</h3>
        
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        
        <Button variant="primary" width="block">
          Sign In
        </Button>
      </div>
    </Dropdown>
  );
}`}
      />

      <Showcase
        title="Custom Content"
        description="Mix custom HTML with Menu components for complex UIs like dashboards or stat cards."
        preview={
          <Dropdown
            trigger={
              <Button variant="secondary">
                <Icon name="info" />
                Quick Stats
              </Button>
            }
            closeOnClick={false}
          >
            <div style={{ minWidth: '260px', padding: 'var(--spacing-4)' }}>
              <div style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 600,
                marginBottom: 'var(--spacing-3)'
              }}>
                Project Overview
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-3)',
                padding: 'var(--spacing-3)',
                background: 'var(--vscode-sideBar-background)',
                borderRadius: 'var(--border-radius-md)'
              }}>
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                    Files
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
                    247
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                    Lines
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
                    12.4K
                  </div>
                </div>
              </div>

              <Menu>
                <MenuItem icon={<Icon name="graph" />}>View Analytics</MenuItem>
                <MenuItem icon={<Icon name="export" />}>Export Report</MenuItem>
                <MenuDivider />
                <MenuItem icon={<Icon name="refresh" />}>Refresh Data</MenuItem>
              </Menu>
            </div>
          </Dropdown>
        }
        code={`<Dropdown
  trigger={<Button>Quick Stats</Button>}
  closeOnClick={false}
>
  <div style={{ minWidth: '260px', padding: 'var(--spacing-4)' }}>
    <h3>Project Overview</h3>
    
    {/* Custom stats grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <div>Files</div>
        <div style={{ fontSize: '2rem' }}>247</div>
      </div>
      <div>
        <div>Lines</div>
        <div style={{ fontSize: '2rem' }}>12.4K</div>
      </div>
    </div>
    
    {/* Menu actions */}
    <Menu>
      <MenuItem icon={<Icon name="graph" />}>View Analytics</MenuItem>
      <MenuItem icon={<Icon name="export" />}>Export Report</MenuItem>
    </Menu>
  </div>
</Dropdown>`}
      />

      <Showcase
        title="Controlled Mode"
        description="Control dropdown state externally with open and onOpenChange props."
        preview={<ControlledExample />}
        code={`import { useState } from 'react';
import { Dropdown, Button, Badge } from '@baukasten/ui';

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Badge variant={open ? 'success' : 'default'}>
        Dropdown is {open ? 'Open' : 'Closed'}
      </Badge>

      <Dropdown
        trigger={<Button>Controlled Dropdown</Button>}
        open={open}
        onOpenChange={setOpen}
      >
        <Menu>
          <MenuItem>Action 1</MenuItem>
          <MenuItem>Action 2</MenuItem>
        </Menu>
      </Dropdown>

      <Button onClick={() => setOpen(!open)}>Toggle</Button>
    </div>
  );
}`}
      />

      <Showcase
        title="Different Triggers"
        description="Any React element can be a dropdown trigger: buttons, badges, icons, or custom components."
        preview={
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Dropdown trigger={<Button variant="primary">Primary</Button>}>
              <Menu size="sm">
                <MenuItem icon={<Icon name="zap" />}>Quick Action</MenuItem>
              </Menu>
            </Dropdown>

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

            <Dropdown
              trigger={
                <div style={{
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  background: 'var(--vscode-button-secondaryBackground)',
                  color: 'var(--vscode-button-secondaryForeground)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  fontWeight: 500
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
        }
        code={`// Button trigger
<Dropdown trigger={<Button>Click me</Button>}>
  <Menu><MenuItem>Action</MenuItem></Menu>
</Dropdown>

// Icon button
<Dropdown trigger={<Button circular><Icon name="ellipsis" /></Button>}>
  <Menu><MenuItem>Edit</MenuItem></Menu>
</Dropdown>

// Badge trigger
<Dropdown trigger={<Badge style={{ cursor: 'pointer' }}>3 new</Badge>}>
  <Menu><MenuItem>Notification 1</MenuItem></Menu>
</Dropdown>

// Custom element
<Dropdown trigger={<div>Custom trigger</div>}>
  <Menu><MenuItem>Action</MenuItem></Menu>
</Dropdown>`}
        props={dropdownProps}
      />
    </PageLayout>
  );
}


