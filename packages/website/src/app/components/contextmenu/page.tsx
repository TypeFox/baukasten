'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { ContextMenu, Icon, Badge } from 'baukasten-ui';
import { MenuItem, MenuDivider, SubMenu } from 'baukasten-ui';

const contextMenuProps: PropDefinition[] = [
	{
		name: 'children',
		type: 'React.ReactElement',
		required: true,
		description: 'The content that triggers the context menu (will capture right-click events)',
	},
	{
		name: 'menu',
		type: 'React.ReactNode',
		required: true,
		description: 'The menu content to display (MenuItem, MenuDivider, SubMenu, etc.)',
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg" | "xl"',
		default: '"md"',
		description: 'Size of menu items',
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Whether the context menu is disabled',
	},
	{
		name: 'onOpen',
		type: '() => void',
		description: 'Callback when the context menu opens',
	},
	{
		name: 'onClose',
		type: '() => void',
		description: 'Callback when the context menu closes',
	},
];

// Styled box component for triggers
const TriggerBox = ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => (
	<div
		style={{
			padding: 'var(--spacing-8)',
			background: 'var(--vscode-sideBar-background)',
			border: '2px dashed var(--vscode-panel-border)',
			borderRadius: 'var(--border-radius-md)',
			textAlign: 'center',
			cursor: 'context-menu',
			userSelect: 'none',
			...props.style,
		}}
		{...props}
	>
		{children}
	</div>
);

// Interactive example with state
function InteractiveExample() {
	const [lastAction, setLastAction] = useState<string>('No action yet');
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);

	return (
		<div>
			<div
				style={{
					marginBottom: 'var(--spacing-4)',
					padding: 'var(--spacing-4)',
					background: 'var(--vscode-editor-background)',
					border: '1px solid var(--vscode-panel-border)',
					borderRadius: 'var(--border-radius-md)',
					fontSize: 'var(--font-size-sm)',
				}}
			>
				<div>Last Action: <strong>{lastAction}</strong></div>
				<div style={{ marginTop: 'var(--spacing-1)' }}>
					Liked: <strong>{liked ? 'Yes' : 'No'}</strong> | Bookmarked: <strong>{bookmarked ? 'Yes' : 'No'}</strong>
				</div>
			</div>

			<ContextMenu
				menu={
					<>
						<MenuItem icon={<Icon name="copy" />} onClick={() => setLastAction('Copied')} rightContent="Ctrl+C">
							Copy
						</MenuItem>
						<MenuItem icon={<Icon name="clippy" />} onClick={() => setLastAction('Pasted')} rightContent="Ctrl+V">
							Paste
						</MenuItem>
						<MenuDivider />
						<MenuItem
							icon={<Icon name={liked ? 'heart-filled' : 'heart'} />}
							onClick={() => { setLiked(!liked); setLastAction(liked ? 'Unliked' : 'Liked'); }}
							selected={liked}
						>
							{liked ? 'Unlike' : 'Like'}
						</MenuItem>
						<MenuItem
							icon={<Icon name={bookmarked ? 'check-all' : 'bookmark'} />}
							onClick={() => { setBookmarked(!bookmarked); setLastAction(bookmarked ? 'Unbookmarked' : 'Bookmarked'); }}
							selected={bookmarked}
						>
							{bookmarked ? 'Remove Bookmark' : 'Bookmark'}
						</MenuItem>
						<MenuDivider />
						<MenuItem icon={<Icon name="trash" />} onClick={() => setLastAction('Deleted')} rightContent="Del">
							Delete
						</MenuItem>
					</>
				}
			>
				<TriggerBox>
					Right-click for interactive actions!
					<div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--vscode-descriptionForeground)', marginTop: 'var(--spacing-2)' }}>
						Watch the status update above
					</div>
				</TriggerBox>
			</ContextMenu>
		</div>
	);
}

export default function ContextMenuPage() {
	return (
		<PageLayout
			title="ContextMenu"
			description="A context menu that appears on right-click, positioned at the cursor with automatic viewport detection."
		>
			<Showcase
				title="Basic Usage"
				description="Right-click on the box to open a context menu with common actions."
				preview={
					<ContextMenu
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
						<TriggerBox>Right-click me!</TriggerBox>
					</ContextMenu>
				}
				code={`import { ContextMenu, MenuItem, MenuDivider, Icon } from 'baukasten-ui';

function App() {
  return (
    <ContextMenu
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
      <div>Right-click me!</div>
    </ContextMenu>
  );
}`}
			/>

			<Showcase
				title="With Keyboard Shortcuts"
				description="Display keyboard shortcuts on the right side of menu items using the rightContent prop."
				preview={
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
							</>
						}
					>
						<TriggerBox>Right-click for editor actions</TriggerBox>
					</ContextMenu>
				}
				code={`<ContextMenu
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
    </>
  }
>
  <div>Right-click me</div>
</ContextMenu>`}
			/>

			<Showcase
				title="With Submenus"
				description="Create nested menus using the SubMenu component. Submenus can be infinitely nested."
				preview={
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
						<TriggerBox>Right-click for file actions</TriggerBox>
					</ContextMenu>
				}
				code={`<ContextMenu
  menu={
    <>
      <MenuItem icon={<Icon name="file" />}>New File</MenuItem>
      <MenuDivider />
      <SubMenu label="Open With" icon={<Icon name="folder-opened" />}>
        <MenuItem icon={<Icon name="code" />}>VS Code</MenuItem>
        <MenuItem icon={<Icon name="terminal" />}>Terminal</MenuItem>
      </SubMenu>
      <SubMenu label="Share" icon={<Icon name="share" />}>
        <MenuItem icon={<Icon name="mail" />}>Email</MenuItem>
        <SubMenu label="Social Media" icon={<Icon name="globe" />}>
          <MenuItem>Twitter</MenuItem>
          <MenuItem>LinkedIn</MenuItem>
        </SubMenu>
      </SubMenu>
    </>
  }
>
  <div>Right-click me</div>
</ContextMenu>`}
			/>

			<Showcase
				title="With Badges and States"
				description="Use badges to show status or counts, and selected/disabled states for menu items."
				preview={
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
						<TriggerBox>Right-click for advanced menu</TriggerBox>
					</ContextMenu>
				}
				code={`<ContextMenu
  menu={
    <>
      <MenuItem
        icon={<Icon name="file" />}
        rightContent={<Badge variant="info" size="sm">New</Badge>}
      >
        Create Document
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={<Icon name="check" />} selected>
        Selected Item
      </MenuItem>
      <MenuItem icon={<Icon name="warning" />} disabled>
        Disabled Action
      </MenuItem>
    </>
  }
>
  <div>Right-click me</div>
</ContextMenu>`}
			/>

			<Showcase
				title="Sizes"
				description="Five size options from extra small to extra large."
				preview={
					<div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
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
								<TriggerBox style={{ padding: 'var(--spacing-4)', fontSize: 'var(--font-size-sm)' }}>
									{size.toUpperCase()}
								</TriggerBox>
							</ContextMenu>
						))}
					</div>
				}
				code={`<ContextMenu
  size="lg"
  menu={
    <>
      <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
      <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
    </>
  }
>
  <div>Large menu items</div>
</ContextMenu>`}
			/>

			<Showcase
				title="With Click Handlers"
				description="Handle menu item clicks with onClick handlers. The menu automatically closes after clicking an item."
				preview={<InteractiveExample />}
				code={`import { useState } from 'react';
import { ContextMenu, MenuItem, MenuDivider, Icon } from 'baukasten-ui';

function InteractiveExample() {
  const [lastAction, setLastAction] = useState('No action yet');
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <div>Last Action: {lastAction}</div>
      
      <ContextMenu
        menu={
          <>
            <MenuItem 
              icon={<Icon name="copy" />} 
              onClick={() => setLastAction('Copied')}
              rightContent="Ctrl+C"
            >
              Copy
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon name={liked ? 'heart-filled' : 'heart'} />}
              onClick={() => {
                setLiked(!liked);
                setLastAction(liked ? 'Unliked' : 'Liked');
              }}
              selected={liked}
            >
              {liked ? 'Unlike' : 'Like'}
            </MenuItem>
          </>
        }
      >
        <div>Right-click for actions</div>
      </ContextMenu>
    </div>
  );
}`}
			/>

			<Showcase
				title="Different Triggers"
				description="Context menus work on any element: text, images, cards, list items, etc."
				preview={
					<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
						<div>
							<h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
								On Text Content
							</h4>
							<ContextMenu
								menu={
									<>
										<MenuItem icon={<Icon name="copy" />}>Copy Text</MenuItem>
										<MenuItem icon={<Icon name="search" />}>Search</MenuItem>
									</>
								}
							>
								<p
									style={{
										padding: 'var(--spacing-4)',
										background: 'var(--vscode-sideBar-background)',
										borderRadius: 'var(--border-radius-md)',
										cursor: 'context-menu',
									}}
								>
									Right-click on this paragraph
								</p>
							</ContextMenu>
						</div>

						<div>
							<h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
								On List Items
							</h4>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
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
												padding: 'var(--spacing-2)',
												background: 'var(--vscode-sideBar-background)',
												borderRadius: 'var(--border-radius-sm)',
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
				}
				code={`// On text
<ContextMenu
  menu={
    <>
      <MenuItem icon={<Icon name="copy" />}>Copy Text</MenuItem>
      <MenuItem icon={<Icon name="search" />}>Search</MenuItem>
    </>
  }
>
  <p>Right-click on this paragraph</p>
</ContextMenu>

// On list items
{items.map(item => (
  <ContextMenu
    key={item.id}
    menu={
      <>
        <MenuItem icon={<Icon name="edit" />}>Rename</MenuItem>
        <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
      </>
    }
  >
    <div>{item.name}</div>
  </ContextMenu>
))}`}
			/>

			<Showcase
				title="File Explorer Example"
				description="Real-world example of a file explorer context menu with all features."
				preview={
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
									<MenuItem icon={<Icon name="browser" />}>Browser</MenuItem>
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
								padding: 'var(--spacing-4)',
								background: 'var(--vscode-sideBar-background)',
								border: '1px solid var(--vscode-panel-border)',
								borderRadius: 'var(--border-radius-md)',
								cursor: 'context-menu',
								display: 'flex',
								alignItems: 'center',
								gap: 'var(--spacing-3)',
							}}
						>
							<Icon name="file-code" size="lg" />
							<div>
								<div style={{ fontWeight: 600 }}>app.tsx</div>
								<div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
									TypeScript React Component
								</div>
							</div>
						</div>
					</ContextMenu>
				}
				code={`<ContextMenu
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
      </SubMenu>
      <MenuDivider />
      <MenuItem icon={<Icon name="edit" />} rightContent="F2">
        Rename
      </MenuItem>
      <MenuItem icon={<Icon name="trash" />} rightContent="Delete">
        Delete
      </MenuItem>
    </>
  }
>
  <div>app.tsx</div>
</ContextMenu>`}
				props={contextMenuProps}
			/>
		</PageLayout>
	);
}

