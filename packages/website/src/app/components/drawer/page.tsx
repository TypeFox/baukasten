'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button, Icon, Input, FormGroup, FieldLabel, Heading, Paragraph, Text, Menu, MenuItem, MenuDivider, Select, type SelectOption } from 'baukasten-ui';

const drawerProps: PropDefinition[] = [
    {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Whether the drawer is open',
    },
    {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback when the drawer should close',
    },
    {
        name: 'placement',
        type: '"top" | "right" | "bottom" | "left"',
        default: '"right"',
        description: 'Which edge the drawer slides from',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "fullscreen"',
        default: '"md"',
        description: 'Size of the drawer (width for left/right, height for top/bottom)',
    },
    {
        name: 'backdropVariant',
        type: '"solid" | "blur" | "transparent"',
        default: '"solid"',
        description: 'Visual style of the backdrop',
    },
    {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        description: 'Whether clicking the backdrop closes the drawer',
    },
    {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Whether pressing Escape closes the drawer',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Drawer content (use DrawerHeader, DrawerBody, DrawerFooter)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const drawerHeaderProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Header content (typically a title)',
    },
    {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show the close button',
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback when close button is clicked',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const drawerBodyProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Body content',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const drawerFooterProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Footer content (typically action buttons)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

// Basic interactive example
function BasicExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
            <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                <DrawerHeader onClose={() => setIsOpen(false)}>
                    Drawer Title
                </DrawerHeader>
                <DrawerBody>
                    <Paragraph>This is the drawer content. You can put any content here.</Paragraph>
                    <Paragraph>Try clicking outside, pressing ESC, or using the close button.</Paragraph>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Confirm
                    </Button>
                </DrawerFooter>
            </Drawer>
        </>
    );
}

// Navigation drawer example
function NavigationExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Icon name="menu" /> Menu
            </Button>
            <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                placement="left"
                size="sm"
            >
                <DrawerHeader onClose={() => setIsOpen(false)}>
                    Navigation
                </DrawerHeader>
                <DrawerBody>
                    <Menu>
                        <MenuItem icon={<Icon name="home" />} onClick={() => setIsOpen(false)}>Home</MenuItem>
                        <MenuItem icon={<Icon name="dashboard" />} onClick={() => setIsOpen(false)}>Dashboard</MenuItem>
                        <MenuItem icon={<Icon name="file" />} onClick={() => setIsOpen(false)}>Documents</MenuItem>
                        <MenuItem icon={<Icon name="calendar" />} onClick={() => setIsOpen(false)}>Calendar</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<Icon name="settings-gear" />} onClick={() => setIsOpen(false)}>Settings</MenuItem>
                        <MenuItem icon={<Icon name="account" />} onClick={() => setIsOpen(false)}>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<Icon name="sign-out" />} onClick={() => setIsOpen(false)}>Sign Out</MenuItem>
                    </Menu>
                </DrawerBody>
            </Drawer>
        </>
    );
}

// Settings form example
function SettingsExample() {
    const [isOpen, setIsOpen] = useState(false);

    const themeOptions: SelectOption<string>[] = [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
        { value: 'system', label: 'System' },
    ];

    const languageOptions: SelectOption<string>[] = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
    ];

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
            <Drawer open={isOpen} onClose={() => setIsOpen(false)} size="md">
                <DrawerHeader onClose={() => setIsOpen(false)}>
                    Settings
                </DrawerHeader>
                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
                        <div>
                            <Heading level={3} marginBottom={false} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                                Profile
                            </Heading>
                            <FormGroup orientation="vertical">
                                <FieldLabel htmlFor="settings-name">Display Name</FieldLabel>
                                <Input id="settings-name" placeholder="Your name" fullWidth />
                            </FormGroup>
                            <FormGroup orientation="vertical">
                                <FieldLabel htmlFor="settings-email">Email</FieldLabel>
                                <Input id="settings-email" type="email" placeholder="your@email.com" fullWidth />
                            </FormGroup>
                        </div>
                        <div>
                            <Heading level={3} marginBottom={false} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                                Preferences
                            </Heading>
                            <FormGroup orientation="vertical">
                                <FieldLabel>Theme</FieldLabel>
                                <Select options={themeOptions} placeholder="Select theme..." fullWidth />
                            </FormGroup>
                            <FormGroup orientation="vertical">
                                <FieldLabel>Language</FieldLabel>
                                <Select options={languageOptions} placeholder="Select language..." fullWidth />
                            </FormGroup>
                        </div>
                    </div>
                </DrawerBody>
                <DrawerFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Save Settings
                    </Button>
                </DrawerFooter>
            </Drawer>
        </>
    );
}

export default function DrawerPage() {
    const [placementDrawer, setPlacementDrawer] = useState<string | null>(null);
    const [sizesDrawer, setSizesDrawer] = useState<string | null>(null);
    const [fullscreenDrawer, setFullscreenDrawer] = useState(false);
    const [backdropDrawer, setBackdropDrawer] = useState<'solid' | 'blur' | 'transparent' | null>(null);
    const [scrollDrawer, setScrollDrawer] = useState(false);

    return (
        <PageLayout
            title="Drawer"
            description="A slide-in panel component that enters from any edge of the viewport. Supports multiple sizes, placements, backdrop variants, smooth slide animations, and composable structure."
        >
            <Showcase
                title="Basic Usage"
                description="Drawer is a composable component using DrawerHeader, DrawerBody, and DrawerFooter. It renders to document.body using React portals and slides in with a smooth CSS transition. Default placement is from the right."
                preview={<BasicExample />}
                code={`import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button } from 'baukasten-ui';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerHeader onClose={() => setIsOpen(false)}>
          Drawer Title
        </DrawerHeader>
        <DrawerBody>
          <p>This is the drawer content.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}`}
                props={drawerProps}
            />

            <Showcase
                title="Placements"
                description="Drawers can slide in from any edge: top, right, bottom, or left. Right is the default and most common for settings/detail panels. Left works well for navigation menus."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap' }}>
                        {(['left', 'top', 'right', 'bottom'] as const).map((placement) => (
                            <Button key={placement} size="sm" onClick={() => setPlacementDrawer(placement)}>
                                {placement.charAt(0).toUpperCase() + placement.slice(1)}
                            </Button>
                        ))}
                        {(['left', 'top', 'right', 'bottom'] as const).map((placement) => (
                            <Drawer
                                key={placement}
                                open={placementDrawer === placement}
                                onClose={() => setPlacementDrawer(null)}
                                placement={placement}
                                size="sm"
                            >
                                <DrawerHeader onClose={() => setPlacementDrawer(null)}>
                                    {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
                                </DrawerHeader>
                                <DrawerBody>
                                    <Paragraph>This drawer slides in from the <Text weight="bold">{placement}</Text> edge.</Paragraph>
                                    <Paragraph>For left/right drawers, the size prop controls width. For top/bottom drawers, it controls height.</Paragraph>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button onClick={() => setPlacementDrawer(null)}>Close</Button>
                                </DrawerFooter>
                            </Drawer>
                        ))}
                    </div>
                }
                code={`// Right drawer (default)
<Drawer open={isOpen} onClose={handleClose} placement="right">
  <DrawerHeader onClose={handleClose}>Right Drawer</DrawerHeader>
  <DrawerBody>Slides in from the right edge.</DrawerBody>
</Drawer>

// Left drawer - great for navigation
<Drawer open={isOpen} onClose={handleClose} placement="left">
  <DrawerHeader onClose={handleClose}>Left Drawer</DrawerHeader>
  <DrawerBody>Slides in from the left edge.</DrawerBody>
</Drawer>

// Top drawer
<Drawer open={isOpen} onClose={handleClose} placement="top">
  <DrawerHeader onClose={handleClose}>Top Drawer</DrawerHeader>
  <DrawerBody>Slides in from the top edge.</DrawerBody>
</Drawer>

// Bottom drawer
<Drawer open={isOpen} onClose={handleClose} placement="bottom">
  <DrawerHeader onClose={handleClose}>Bottom Drawer</DrawerHeader>
  <DrawerBody>Slides in from the bottom edge.</DrawerBody>
</Drawer>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options plus fullscreen. For left/right drawers, size controls width: xs (280px), sm (320px), md (400px - default), lg (560px), xl (720px). For top/bottom drawers, size controls height."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                            <Button key={size} size="sm" onClick={() => setSizesDrawer(size)}>
                                {size.toUpperCase()}
                            </Button>
                        ))}
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                            <Drawer
                                key={size}
                                open={sizesDrawer === size}
                                onClose={() => setSizesDrawer(null)}
                                size={size}
                            >
                                <DrawerHeader onClose={() => setSizesDrawer(null)}>
                                    {size.toUpperCase()} Drawer
                                </DrawerHeader>
                                <DrawerBody>
                                    <Paragraph>This is a {size} sized drawer.</Paragraph>
                                    <Paragraph>
                                        Width: {
                                            size === 'xs' ? '280px' :
                                                size === 'sm' ? '320px' :
                                                    size === 'md' ? '400px' :
                                                        size === 'lg' ? '560px' : '720px'
                                        }
                                    </Paragraph>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button onClick={() => setSizesDrawer(null)}>Close</Button>
                                </DrawerFooter>
                            </Drawer>
                        ))}
                    </div>
                }
                code={`// Extra small (280px)
<Drawer open={isOpen} onClose={handleClose} size="xs">
  <DrawerBody>Compact drawer for simple content.</DrawerBody>
</Drawer>

// Small (320px) - Good for navigation
<Drawer open={isOpen} onClose={handleClose} size="sm">
  <DrawerBody>Small drawer for menus.</DrawerBody>
</Drawer>

// Medium (400px) - Default
<Drawer open={isOpen} onClose={handleClose} size="md">
  <DrawerBody>Default drawer size.</DrawerBody>
</Drawer>

// Large (560px) - Good for forms
<Drawer open={isOpen} onClose={handleClose} size="lg">
  <DrawerBody>Large drawer for forms.</DrawerBody>
</Drawer>

// Extra large (720px)
<Drawer open={isOpen} onClose={handleClose} size="xl">
  <DrawerBody>Extra large for complex content.</DrawerBody>
</Drawer>`}
            />

            <Showcase
                title="Fullscreen Drawer"
                description="Fullscreen mode covers the entire viewport width (for left/right) or height (for top/bottom). Useful for immersive content or mobile views."
                preview={
                    <>
                        <Button onClick={() => setFullscreenDrawer(true)}>Open Fullscreen Drawer</Button>
                        <Drawer
                            open={fullscreenDrawer}
                            onClose={() => setFullscreenDrawer(false)}
                            size="fullscreen"
                        >
                            <DrawerHeader onClose={() => setFullscreenDrawer(false)}>
                                Fullscreen Drawer
                            </DrawerHeader>
                            <DrawerBody>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    gap: 'var(--bk-spacing-4)'
                                }}>
                                    <Heading level={2}>Fullscreen Drawer</Heading>
                                    <Paragraph>This drawer covers the full viewport width.</Paragraph>
                                </div>
                            </DrawerBody>
                        </Drawer>
                    </>
                }
                code={`<Drawer
  open={isOpen}
  onClose={handleClose}
  size="fullscreen"
>
  <DrawerHeader onClose={handleClose}>
    Fullscreen Drawer
  </DrawerHeader>
  <DrawerBody>
    {/* Your fullscreen content */}
  </DrawerBody>
</Drawer>`}
            />

            <Showcase
                title="Backdrop Variants"
                description="Three backdrop styles: solid (default dark overlay), blur (backdrop-filter blur effect), and transparent (no visible backdrop but still interactive)."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', flexWrap: 'wrap' }}>
                        <Button onClick={() => setBackdropDrawer('solid')}>Solid Backdrop</Button>
                        <Button onClick={() => setBackdropDrawer('blur')}>Blur Backdrop</Button>
                        <Button onClick={() => setBackdropDrawer('transparent')}>Transparent</Button>
                        {(['solid', 'blur', 'transparent'] as const).map((variant) => (
                            <Drawer
                                key={variant}
                                open={backdropDrawer === variant}
                                onClose={() => setBackdropDrawer(null)}
                                backdropVariant={variant}
                                size="sm"
                            >
                                <DrawerHeader onClose={() => setBackdropDrawer(null)}>
                                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Backdrop
                                </DrawerHeader>
                                <DrawerBody>
                                    <Paragraph>This drawer uses the <Text weight="bold">{variant}</Text> backdrop variant.</Paragraph>
                                    <ul style={{ margin: 0, paddingLeft: 'var(--bk-spacing-5)' }}>
                                        <li><Text weight="bold">Solid</Text>: Dark semi-transparent</li>
                                        <li><Text weight="bold">Blur</Text>: Blurred with backdrop-filter</li>
                                        <li><Text weight="bold">Transparent</Text>: No visible backdrop</li>
                                    </ul>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button onClick={() => setBackdropDrawer(null)}>Close</Button>
                                </DrawerFooter>
                            </Drawer>
                        ))}
                        <div style={{
                            width: '100%',
                            marginTop: 'var(--bk-spacing-4)',
                            padding: 'var(--bk-spacing-4)',
                            border: '1px solid var(--vscode-textBlockQuote-border)',
                            borderRadius: 'var(--bk-radius-md)'
                        }}>
                            <Heading level={4}>Background Content</Heading>
                            <Paragraph>Open the drawers above to see how different backdrop styles affect this content. The blur backdrop will make this text appear blurred.</Paragraph>
                        </div>
                    </div>
                }
                code={`// Solid backdrop (default)
<Drawer
  open={isOpen}
  onClose={handleClose}
  backdropVariant="solid"
>
  <DrawerBody>Dark semi-transparent backdrop</DrawerBody>
</Drawer>

// Blur backdrop
<Drawer
  open={isOpen}
  onClose={handleClose}
  backdropVariant="blur"
>
  <DrawerBody>Blurred background effect</DrawerBody>
</Drawer>

// Transparent backdrop
<Drawer
  open={isOpen}
  onClose={handleClose}
  backdropVariant="transparent"
>
  <DrawerBody>No visible backdrop (clicks still work)</DrawerBody>
</Drawer>`}
            />

            <Showcase
                title="Navigation Drawer"
                description="Left-side drawer with menu items. A common pattern for mobile navigation or sidebar menus."
                preview={<NavigationExample />}
                code={`import { Drawer, DrawerHeader, DrawerBody, Button, Icon, Menu, MenuItem, MenuDivider } from 'baukasten-ui';
import { useState } from 'react';

function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Icon name="menu" /> Menu
      </Button>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="left"
        size="sm"
      >
        <DrawerHeader onClose={() => setIsOpen(false)}>
          Navigation
        </DrawerHeader>
        <DrawerBody>
          <Menu>
            <MenuItem icon={<Icon name="home" />}>Home</MenuItem>
            <MenuItem icon={<Icon name="dashboard" />}>Dashboard</MenuItem>
            <MenuItem icon={<Icon name="file" />}>Documents</MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="settings-gear" />}>Settings</MenuItem>
            <MenuItem icon={<Icon name="sign-out" />}>Sign Out</MenuItem>
          </Menu>
        </DrawerBody>
      </Drawer>
    </>
  );
}`}
            />

            <Showcase
                title="Settings Panel"
                description="Right-side drawer with form controls including inputs and selects. Demonstrates a typical settings panel pattern."
                preview={<SettingsExample />}
                code={`import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button, Input, FormGroup, FieldLabel, Select } from 'baukasten-ui';
import { useState } from 'react';

function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <DrawerHeader onClose={() => setIsOpen(false)}>
          Settings
        </DrawerHeader>
        <DrawerBody>
          <FormGroup orientation="vertical">
            <FieldLabel htmlFor="name">Display Name</FieldLabel>
            <Input id="name" placeholder="Your name" fullWidth />
          </FormGroup>
          <FormGroup orientation="vertical">
            <FieldLabel>Theme</FieldLabel>
            <Select
              options={[
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' },
              ]}
              placeholder="Select theme..."
              fullWidth
            />
          </FormGroup>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}`}
                props={[...drawerHeaderProps, ...drawerBodyProps, ...drawerFooterProps]}
            />

            <Showcase
                title="Scrollable Content"
                description="Drawer body automatically handles overflow with scrolling. Header and footer remain fixed while the body scrolls."
                preview={
                    <>
                        <Button onClick={() => setScrollDrawer(true)}>Open Scrollable Drawer</Button>
                        <Drawer open={scrollDrawer} onClose={() => setScrollDrawer(false)} size="md">
                            <DrawerHeader onClose={() => setScrollDrawer(false)}>
                                Activity Log
                            </DrawerHeader>
                            <DrawerBody>
                                {Array.from({ length: 30 }, (_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: 'var(--bk-padding-md)',
                                            borderBottom: '1px solid var(--bk-color-border)',
                                        }}
                                    >
                                        <Text weight="semibold" style={{ display: 'block' }}>Event #{i + 1}</Text>
                                        <Text color="muted" size="sm">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Sed do eiusmod tempor incididunt ut labore.
                                        </Text>
                                    </div>
                                ))}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="secondary" onClick={() => setScrollDrawer(false)}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => setScrollDrawer(false)}>
                                    Mark All Read
                                </Button>
                            </DrawerFooter>
                        </Drawer>
                    </>
                }
                code={`<Drawer open={isOpen} onClose={handleClose} size="md">
  <DrawerHeader onClose={handleClose}>
    Activity Log
  </DrawerHeader>
  <DrawerBody>
    {/* Long content that will scroll */}
    {items.map((item) => (
      <div key={item.id} style={{ padding: 'var(--bk-padding-md)' }}>
        <Text weight="semibold">{item.title}</Text>
        <Text color="muted" size="sm">{item.description}</Text>
      </div>
    ))}
  </DrawerBody>
  <DrawerFooter>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    <Button variant="primary">Mark All Read</Button>
  </DrawerFooter>
</Drawer>`}
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
                <h3 style={{ marginTop: 0, marginBottom: 'var(--bk-spacing-3)' }}>Features & Behavior</h3>
                <ul style={{ marginBottom: 'var(--bk-spacing-4)', paddingLeft: 'var(--bk-spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Slide Animation:</strong> Smooth CSS transition when opening and closing, with direction based on placement
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Portal Rendering:</strong> Renders to <code>document.body</code> using React portals, ensuring proper z-index stacking
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Focus Management:</strong> Automatically focuses drawer on open and restores focus to the previously active element on close
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Scroll Locking:</strong> Prevents body scroll when drawer is open to avoid background scrolling
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Keyboard Support:</strong> Press <code>ESC</code> to close (configurable with <code>closeOnEscape</code>)
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Backdrop Click:</strong> Click outside drawer to close (configurable with <code>closeOnBackdropClick</code>)
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Responsive Sizing:</strong> Left/right drawers respect <code>max-width: 100vw</code>, top/bottom drawers respect <code>max-height: 100vh</code>
                    </li>
                    <li>
                        <strong>Composable Structure:</strong> Use <code>DrawerHeader</code>, <code>DrawerBody</code>, and <code>DrawerFooter</code> for consistent layout
                    </li>
                </ul>

                <h3 style={{ marginTop: 'var(--bk-spacing-4)', marginBottom: 'var(--bk-spacing-3)' }}>Accessibility</h3>
                <ul style={{ marginBottom: 0, paddingLeft: 'var(--bk-spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>ARIA Attributes:</strong> Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for screen readers
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Focus Trap:</strong> Drawer automatically receives focus when opened
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Focus Restoration:</strong> Returns focus to trigger element when closed
                    </li>
                    <li>
                        <strong>Close Button Label:</strong> Close button includes <code>aria-label="Close drawer"</code>
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
