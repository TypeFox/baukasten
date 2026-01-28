import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { MenuItem, MenuDivider, SubMenu } from '../Menu';
import { Icon } from '../Icon';
import { Badge } from '../Badge';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A context menu that appears on right-click, positioned at the cursor coordinates. Wraps the existing Menu system and supports all Menu features including MenuItem, MenuDivider, SubMenu, icons, shortcuts, badges, and infinite nesting. Automatically flips to stay within viewport bounds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of menu items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the context menu is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    menu: {
      control: false,
      description: 'The menu content to display (MenuItem, MenuDivider, SubMenu, etc.)',
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic context menu with common actions.
 * Right-click on the box to open the menu.
 */
export const Interactive: Story = {
  args: {
    size: 'md',
    disabled: false,
  },
  render: (args) => (
    <div style={{ padding: 'var(--bk-spacing-8)' }}>
      <ContextMenu
        {...args}
        menu={
          <>
            <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
            <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
            <MenuItem icon={<Icon name="clippy" />}>Paste</MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            cursor: 'context-menu',
            userSelect: 'none',
          }}
        >
          Right-click me!
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic context menu example. Right-click on the box to open the menu. Try clicking near the edges of the viewport to see automatic positioning.',
      },
    },
  },
};

/**
 * Context menu with keyboard shortcuts displayed.
 */
export const WithShortcuts: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-8)' }}>
      <ContextMenu
        menu={
          <>
            <MenuItem icon={<Icon name="discard" />} rightContent="Ctrl+Z">
              Undo
            </MenuItem>
            <MenuItem icon={<Icon name="redo" />} rightContent="Ctrl+Y">
              Redo
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="edit" />} rightContent="Ctrl+X">
              Cut
            </MenuItem>
            <MenuItem icon={<Icon name="copy" />} rightContent="Ctrl+C">
              Copy
            </MenuItem>
            <MenuItem icon={<Icon name="clippy" />} rightContent="Ctrl+V">
              Paste
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="search" />} rightContent="Ctrl+F">
              Find
            </MenuItem>
            <MenuItem icon={<Icon name="replace" />} rightContent="Ctrl+H">
              Replace
            </MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            cursor: 'context-menu',
            userSelect: 'none',
          }}
        >
          Right-click for editor actions
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu with keyboard shortcuts displayed on the right side of each menu item. This is a common pattern in text editors.',
      },
    },
  },
};

/**
 * Context menu with nested submenus for hierarchical actions.
 */
export const WithSubMenus: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-8)' }}>
      <ContextMenu
        menu={
          <>
            <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
            <MenuItem icon={<Icon name="folder" />}>New Folder</MenuItem>
            <MenuDivider />
            <SubMenu label="Open With" icon={<Icon name="folder-opened" />}>
              <MenuItem icon={<Icon name="code" />}>VS Code</MenuItem>
              <MenuItem icon={<Icon name="terminal" />}>Terminal</MenuItem>
              <MenuItem icon={<Icon name="browser" />}>Browser</MenuItem>
              <MenuDivider />
              <MenuItem>Choose Application...</MenuItem>
            </SubMenu>
            <SubMenu label="Share" icon={<Icon name="share" />}>
              <MenuItem icon={<Icon name="mail" />}>Email</MenuItem>
              <MenuItem icon={<Icon name="link" />}>Copy Link</MenuItem>
              <SubMenu label="Social Media" icon={<Icon name="globe" />}>
                <MenuItem>Twitter</MenuItem>
                <MenuItem>LinkedIn</MenuItem>
                <MenuItem>Facebook</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuDivider />
            <MenuItem icon={<Icon name="gear" />}>Properties</MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            cursor: 'context-menu',
            userSelect: 'none',
          }}
        >
          Right-click for file actions
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu with nested submenus. SubMenus can be infinitely nested and support all the same features as the parent menu.',
      },
    },
  },
};

/**
 * Context menu with badges, states, and rich content.
 */
export const WithBadgesAndStates: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-8)' }}>
      <ContextMenu
        menu={
          <>
            <MenuItem
              icon={<Icon name="file" />}
              rightContent={<Badge variant="info" size="sm">New</Badge>}
            >
              Create Document
            </MenuItem>
            <MenuItem
              icon={<Icon name="cloud-upload" />}
              rightContent={<Badge variant="success" size="sm">Ready</Badge>}
            >
              Upload File
            </MenuItem>
            <MenuItem
              icon={<Icon name="sync" />}
              rightContent={<Badge variant="warning" size="sm">Syncing</Badge>}
            >
              Sync Changes
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="check" />} selected>
              Selected Item
            </MenuItem>
            <MenuItem icon={<Icon name="warning" />} disabled>
              Disabled Action
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon name="archive" />}
              rightContent={<Badge variant="default" size="sm">12</Badge>}
            >
              Archive
            </MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            cursor: 'context-menu',
            userSelect: 'none',
          }}
        >
          Right-click for advanced menu
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu demonstrating badges, selected states, and disabled items. Use badges to show status, counts, or new features.',
      },
    },
  },
};

/**
 * Different menu sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--bk-gap-lg)',
        padding: 'var(--bk-spacing-8)',
        flexWrap: 'wrap',
      }}
    >
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <ContextMenu
          key={size}
          size={size}
          menu={
            <>
              <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
              <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
              <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
            </>
          }
        >
          <div
            style={{
              padding: 'var(--bk-spacing-4)',
              background: 'var(--bk-color-background-secondary)',
              border: '2px dashed var(--bk-color-border)',
              borderRadius: 'var(--bk-radius-md)',
              textAlign: 'center',
              cursor: 'context-menu',
              userSelect: 'none',
              fontSize: 'var(--bk-font-size-sm)',
            }}
          >
            {size.toUpperCase()}
          </div>
        </ContextMenu>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menus support all size options: xs, sm, md (default), lg, and xl. Right-click on each box to see the different sizes.',
      },
    },
  },
};

/**
 * Context menu on different types of trigger elements.
 */
export const DifferentTriggers: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-gap-lg)',
        padding: 'var(--bk-spacing-8)',
      }}
    >
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          On Text Content
        </h4>
        <ContextMenu
          menu={
            <>
              <MenuItem icon={<Icon name="copy" />}>Copy Text</MenuItem>
              <MenuItem icon={<Icon name="search" />}>Search</MenuItem>
              <MenuItem icon={<Icon name="book" />}>Define</MenuItem>
            </>
          }
        >
          <p
            style={{
              padding: 'var(--bk-spacing-4)',
              background: 'var(--bk-color-background-secondary)',
              borderRadius: 'var(--bk-radius-md)',
              cursor: 'context-menu',
            }}
          >
            Right-click on this paragraph to see text-related actions.
          </p>
        </ContextMenu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          On Image/Card
        </h4>
        <ContextMenu
          menu={
            <>
              <MenuItem icon={<Icon name="file-media" />}>View Image</MenuItem>
              <MenuItem icon={<Icon name="copy" />}>Copy Image</MenuItem>
              <MenuItem icon={<Icon name="cloud-download" />}>Save As...</MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon name="share" />}>Share</MenuItem>
            </>
          }
        >
          <div
            style={{
              width: '200px',
              height: '150px',
              background: 'var(--bk-color-background-secondary)',
              border: '1px solid var(--bk-color-border)',
              borderRadius: 'var(--bk-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'context-menu',
            }}
          >
            <Icon name="file-media" size="3xl" color="var(--bk-color-foreground-muted)" />
          </div>
        </ContextMenu>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          On List Items
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-xs)' }}>
          {['Item 1', 'Item 2', 'Item 3'].map((item) => (
            <ContextMenu
              key={item}
              menu={
                <>
                  <MenuItem icon={<Icon name="edit" />}>Rename</MenuItem>
                  <MenuItem icon={<Icon name="copy" />}>Duplicate</MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
                </>
              }
            >
              <div
                style={{
                  padding: 'var(--bk-spacing-2)',
                  background: 'var(--bk-color-background-secondary)',
                  borderRadius: 'var(--bk-radius-sm)',
                  cursor: 'context-menu',
                }}
              >
                {item}
              </div>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menus work on any element: text, images, cards, list items, etc. Each can have different menu content based on the context.',
      },
    },
  },
};

/**
 * Disabled context menu doesn't respond to right-click.
 */
export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--bk-gap-lg)',
        padding: 'var(--bk-spacing-8)',
      }}
    >
      <ContextMenu
        disabled={false}
        menu={
          <>
            <MenuItem icon={<Icon name="check" />}>Enabled Menu</MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            cursor: 'context-menu',
            userSelect: 'none',
          }}
        >
          Enabled (right-click works)
        </div>
      </ContextMenu>

      <ContextMenu
        disabled={true}
        menu={
          <>
            <MenuItem>You won't see this</MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-8)',
            background: 'var(--bk-color-background-secondary)',
            border: '2px dashed var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            textAlign: 'center',
            opacity: 0.5,
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          Disabled (right-click does nothing)
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set `disabled={true}` to prevent the context menu from opening. Useful for conditionally enabling/disabling context actions.',
      },
    },
  },
};

/**
 * Interactive example demonstrating onClick handlers and state management.
 */
export const WithClickHandlers: Story = {
  render: () => {
    const InteractiveExample = () => {
      const [lastAction, setLastAction] = useState<string>('No action yet');
      const [count, setCount] = useState(0);
      const [liked, setLiked] = useState(false);
      const [bookmarked, setBookmarked] = useState(false);

      const handleCopy = () => {
        setLastAction('Copied to clipboard');
        setCount(c => c + 1);
        console.log('Copy action triggered');
      };

      const handleCut = () => {
        setLastAction('Cut to clipboard');
        setCount(c => c + 1);
        console.log('Cut action triggered');
      };

      const handlePaste = () => {
        setLastAction('Pasted from clipboard');
        setCount(c => c + 1);
        console.log('Paste action triggered');
      };

      const handleDelete = () => {
        setLastAction('Item deleted');
        setCount(c => c + 1);
        console.log('Delete action triggered');
      };

      const handleLike = () => {
        setLiked(!liked);
        setLastAction(liked ? 'Removed like' : 'Added like');
        setCount(c => c + 1);
        console.log('Like toggled:', !liked);
      };

      const handleBookmark = () => {
        setBookmarked(!bookmarked);
        setLastAction(bookmarked ? 'Removed bookmark' : 'Added bookmark');
        setCount(c => c + 1);
        console.log('Bookmark toggled:', !bookmarked);
      };

      const handleShare = (platform: string) => {
        setLastAction(`Shared to ${platform}`);
        setCount(c => c + 1);
        console.log(`Share to ${platform}`);
      };

      return (
        <div style={{ padding: 'var(--bk-spacing-8)' }}>
          <div
            style={{
              marginBottom: 'var(--bk-spacing-4)',
              padding: 'var(--bk-spacing-4)',
              background: 'var(--bk-color-background-elevated)',
              borderRadius: 'var(--bk-radius-md)',
            }}
          >
            <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
              Last Action: <strong style={{ color: 'var(--bk-color-foreground)' }}>{lastAction}</strong>
            </div>
            <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginTop: 'var(--bk-spacing-1)' }}>
              Total Actions: <strong style={{ color: 'var(--bk-color-foreground)' }}>{count}</strong>
            </div>
            <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)', marginTop: 'var(--bk-spacing-1)' }}>
              Status: Liked: <strong style={{ color: 'var(--bk-color-foreground)' }}>{liked ? 'Yes' : 'No'}</strong>,
              Bookmarked: <strong style={{ color: 'var(--bk-color-foreground)' }}>{bookmarked ? 'Yes' : 'No'}</strong>
            </div>
          </div>

          <ContextMenu
            menu={
              <>
                <MenuItem icon={<Icon name="edit" />} onClick={handleCut} rightContent="Ctrl+X">
                  Cut
                </MenuItem>
                <MenuItem icon={<Icon name="copy" />} onClick={handleCopy} rightContent="Ctrl+C">
                  Copy
                </MenuItem>
                <MenuItem icon={<Icon name="clippy" />} onClick={handlePaste} rightContent="Ctrl+V">
                  Paste
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<Icon name={liked ? 'heart-filled' : 'heart'} />}
                  onClick={handleLike}
                  selected={liked}
                >
                  {liked ? 'Unlike' : 'Like'}
                </MenuItem>
                <MenuItem
                  icon={<Icon name={bookmarked ? 'bookmark-filled' : 'bookmark'} />}
                  onClick={handleBookmark}
                  selected={bookmarked}
                >
                  {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                </MenuItem>
                <MenuDivider />
                <SubMenu label="Share" icon={<Icon name="share" />}>
                  <MenuItem icon={<Icon name="mail" />} onClick={() => handleShare('Email')}>
                    Email
                  </MenuItem>
                  <MenuItem icon={<Icon name="link" />} onClick={() => handleShare('Link')}>
                    Copy Link
                  </MenuItem>
                  <MenuItem icon={<Icon name="twitter" />} onClick={() => handleShare('Twitter')}>
                    Twitter
                  </MenuItem>
                </SubMenu>
                <MenuDivider />
                <MenuItem icon={<Icon name="trash" />} onClick={handleDelete} rightContent="Del">
                  Delete
                </MenuItem>
              </>
            }
          >
            <div
              style={{
                padding: 'var(--bk-spacing-8)',
                background: 'var(--bk-color-background-secondary)',
                border: '2px dashed var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                textAlign: 'center',
                cursor: 'context-menu',
                userSelect: 'none',
              }}
            >
              Right-click me for interactive actions!
              <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)', marginTop: 'var(--bk-spacing-2)' }}>
                Watch the status update above
              </div>
            </div>
          </ContextMenu>
        </div>
      );
    };

    return <InteractiveExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how to handle onClick events on menu items. Each menu item updates the state and logs to the console. Toggle items like "Like" and "Bookmark" show selected states. Nested submenu items also support onClick handlers.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all context menu capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-6)',
        padding: 'var(--bk-spacing-4)',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h3 style={{ fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
        File Explorer Context Menu
      </h3>
      <ContextMenu
        menu={
          <>
            <MenuItem icon={<Icon name="file" />} rightContent="Ctrl+N">
              New File
            </MenuItem>
            <MenuItem icon={<Icon name="folder" />} rightContent="Ctrl+Shift+N">
              New Folder
            </MenuItem>
            <MenuDivider />
            <SubMenu label="Open With" icon={<Icon name="folder-opened" />}>
              <MenuItem icon={<Icon name="code" />}>VS Code</MenuItem>
              <MenuItem icon={<Icon name="terminal" />}>Terminal</MenuItem>
              <MenuItem icon={<Icon name="browser" />}>Default Browser</MenuItem>
            </SubMenu>
            <MenuItem icon={<Icon name="go-to-file" />} rightContent="Ctrl+P">
              Reveal in Explorer
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="edit" />} rightContent="F2">
              Rename
            </MenuItem>
            <MenuItem icon={<Icon name="copy" />} rightContent="Ctrl+C">
              Copy
            </MenuItem>
            <MenuItem icon={<Icon name="clippy" />} rightContent="Ctrl+V">
              Paste
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="trash" />} rightContent="Delete">
              Delete
            </MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-4)',
            background: 'var(--bk-color-background-secondary)',
            border: '1px solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            cursor: 'context-menu',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--bk-gap-md)',
          }}
        >
          <Icon name="file-code" size="lg" />
          <div>
            <div style={{ fontWeight: 'var(--bk-font-weight-medium)' }}>app.tsx</div>
            <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
              TypeScript React Component
            </div>
          </div>
        </div>
      </ContextMenu>

      <h3 style={{ fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)', marginTop: 'var(--bk-spacing-4)' }}>
        Editor Context Menu
      </h3>
      <ContextMenu
        menu={
          <>
            <MenuItem icon={<Icon name="discard" />} rightContent="Ctrl+Z">
              Undo
            </MenuItem>
            <MenuItem icon={<Icon name="redo" />} rightContent="Ctrl+Y">
              Redo
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="edit" />} rightContent="Ctrl+X">
              Cut
            </MenuItem>
            <MenuItem icon={<Icon name="copy" />} rightContent="Ctrl+C">
              Copy
            </MenuItem>
            <MenuItem icon={<Icon name="clippy" />} rightContent="Ctrl+V">
              Paste
            </MenuItem>
            <MenuDivider />
            <SubMenu label="Change Language Mode" icon={<Icon name="symbol-keyword" />}>
              <MenuItem selected>TypeScript React</MenuItem>
              <MenuItem>JavaScript</MenuItem>
              <MenuItem>TypeScript</MenuItem>
              <MenuItem>JSON</MenuItem>
            </SubMenu>
            <MenuItem icon={<Icon name="symbol-method" />}>
              Go to Definition
            </MenuItem>
            <MenuItem icon={<Icon name="references" />}>
              Find All References
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="lightbulb" />} rightContent={<Badge variant="info" size="sm">2</Badge>}>
              Quick Fix
            </MenuItem>
          </>
        }
      >
        <div
          style={{
            padding: 'var(--bk-spacing-4)',
            background: 'var(--bk-color-code-background)',
            border: '1px solid var(--bk-color-border)',
            borderRadius: 'var(--bk-radius-md)',
            fontFamily: 'monospace',
            fontSize: 'var(--bk-font-size-sm)',
            cursor: 'context-menu',
          }}
        >
          <div>const greeting = "Hello, World!";</div>
          <div>console.log(greeting);</div>
        </div>
      </ContextMenu>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating real-world usage patterns: file explorer context menus and editor context menus with all features including submenus, shortcuts, badges, and states.',
      },
    },
  },
};
