import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerProps } from './Drawer';
import { Button } from '../Button';
import { Input } from '../Input';
import { Heading, Paragraph, Text } from '../Typography';
import { FieldLabel } from '../FieldLabel';
import { FormGroup } from '../FormGroup';
import { Select, type SelectOption } from '../Select';
import { Icon } from '../Icon';
import { Menu, MenuItem, MenuDivider } from '../Menu';

/**
 * Drawer component displays content in a slide-in panel from any edge of the viewport.
 * Supports multiple sizes, placements, backdrop variants, and composable structure.
 *
 * ## Features
 * - **Placements**: top, right, bottom, left
 * - **Sizes**: xs, sm, md, lg, xl, fullscreen
 * - **Backdrop Variants**: solid, blur, transparent
 * - **Slide Animation**: Smooth CSS transition in/out
 * - **Keyboard Navigation**: ESC to close (configurable)
 * - **Backdrop Click**: Click outside to close (configurable)
 * - **Focus Management**: Traps focus and restores on close
 * - **Scroll Locking**: Prevents body scroll when open
 * - **Portal Rendering**: Renders to document.body
 * - **Composable**: DrawerHeader, DrawerBody, DrawerFooter
 *
 * ## Accessibility
 * - Uses role="dialog" and aria-modal="true"
 * - Focus management with restoration
 * - Keyboard navigation support
 * - ARIA labels for close buttons
 *
 * ## Usage Guidelines
 * - Use for secondary content, settings panels, navigation, or detail views
 * - Right placement is most common for settings/detail panels
 * - Left placement works well for navigation menus
 * - Top/bottom placements suit notifications or supplementary content
 */
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: 'A slide-in panel component that enters from any edge of the viewport. Supports multiple sizes, placements, backdrop variants, and composable structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which edge the drawer slides from',
      table: {
        type: { summary: 'top | right | bottom | left' },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Size of the drawer (width for left/right, height for top/bottom)',
      table: {
        type: { summary: 'xs | sm | md | lg | xl | fullscreen' },
        defaultValue: { summary: 'md' },
      },
    },
    backdropVariant: {
      control: 'select',
      options: ['solid', 'blur', 'transparent'],
      description: 'Visual style of the backdrop',
      table: {
        type: { summary: 'solid | blur | transparent' },
        defaultValue: { summary: 'solid' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the drawer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape closes the drawer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      action: 'close',
      description: 'Callback when the drawer should close',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      description: 'Drawer content (use DrawerHeader, DrawerBody, DrawerFooter)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Type for stories with custom render functions that don't use args
type CustomRenderStory = Omit<Story, 'args'> & { render: () => React.JSX.Element };

/**
 * Interactive playground for the Drawer component.
 * Try different placements, sizes, backdrop variants, and interaction options.
 */
const InteractiveComponent = (args: Partial<DrawerProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)}>
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
    </div>
  );
};

export const Interactive: Story = {
  args: {
    placement: 'right',
    size: 'md',
    backdropVariant: 'solid',
    closeOnBackdropClick: true,
    closeOnEscape: true,
  } as Story['args'],
  render: (args: Partial<DrawerProps>) => <InteractiveComponent {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with all drawer props. Experiment with different placements, sizes, backdrop styles, and interaction behaviors.',
      },
    },
  },
};

/**
 * Drawer placements: top, right, bottom, left.
 * Each button opens a drawer from a different edge.
 */
const PlacementsComponent = () => {
  const [openPlacement, setOpenPlacement] = useState<string | null>(null);
  const placements = ['top', 'right', 'bottom', 'left'] as const;

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem', flexWrap: 'wrap' }}>
      {placements.map((placement) => (
        <React.Fragment key={placement}>
          <Button onClick={() => setOpenPlacement(placement)}>
            {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
          </Button>
          <Drawer
            open={openPlacement === placement}
            onClose={() => setOpenPlacement(null)}
            placement={placement}
            size="sm"
          >
            <DrawerHeader onClose={() => setOpenPlacement(null)}>
              {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
            </DrawerHeader>
            <DrawerBody>
              <Paragraph>
                This drawer slides in from the <Text weight="bold">{placement}</Text> edge.
              </Paragraph>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpenPlacement(null)}>Close</Button>
            </DrawerFooter>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export const Placements: CustomRenderStory = {
  render: () => <PlacementsComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Drawers can slide in from any edge: top, right, bottom, or left. Right is the default and most common for settings/detail panels.',
      },
    },
  },
};

/**
 * Drawer sizes from xs to xl.
 * For left/right drawers, size controls width. For top/bottom, it controls height.
 */
const SizesComponent = () => {
  const [openSize, setOpenSize] = useState<string | null>(null);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem', flexWrap: 'wrap' }}>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Button onClick={() => setOpenSize(size)}>
            {size.toUpperCase()} Drawer
          </Button>
          <Drawer
            open={openSize === size}
            onClose={() => setOpenSize(null)}
            size={size}
          >
            <DrawerHeader onClose={() => setOpenSize(null)}>
              {size.toUpperCase()} Drawer
            </DrawerHeader>
            <DrawerBody>
              <Paragraph>This is a {size} sized drawer.</Paragraph>
              <Paragraph>
                Size controls the width for left/right drawers and the height for top/bottom drawers.
              </Paragraph>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </DrawerFooter>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export const Sizes: CustomRenderStory = {
  render: () => <SizesComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: xs (280px), sm (320px), md (400px), lg (560px), xl (720px). Size controls width for left/right drawers and height for top/bottom drawers.',
      },
    },
  },
};

/**
 * Fullscreen drawer covers the entire viewport edge.
 */
const FullscreenComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Fullscreen Drawer</Button>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size="fullscreen"
      >
        <DrawerHeader onClose={() => setIsOpen(false)}>
          Fullscreen Drawer
        </DrawerHeader>
        <DrawerBody>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: '1rem'
          }}>
            <Heading level={2}>Fullscreen Drawer</Heading>
            <Paragraph>This drawer takes up the full width of the viewport.</Paragraph>
          </div>
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export const Fullscreen: CustomRenderStory = {
  render: () => <FullscreenComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Fullscreen drawer takes up 100% of the viewport width (for left/right) or height (for top/bottom).',
      },
    },
  },
};

/**
 * Different backdrop visual styles.
 */
const BackdropVariantsComponent = () => {
  const [variant, setVariant] = useState<'solid' | 'blur' | 'transparent' | null>(null);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={() => setVariant('solid')}>Solid Backdrop</Button>
        <Button onClick={() => setVariant('blur')}>Blur Backdrop</Button>
        <Button onClick={() => setVariant('transparent')}>Transparent Backdrop</Button>
      </div>

      <Drawer
        open={variant !== null}
        onClose={() => setVariant(null)}
        backdropVariant={variant || 'solid'}
        size="sm"
      >
        <DrawerHeader onClose={() => setVariant(null)}>
          {variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : ''} Backdrop
        </DrawerHeader>
        <DrawerBody>
          <Paragraph>
            This drawer uses the <Text weight="bold">{variant || 'solid'}</Text> backdrop variant.
          </Paragraph>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><Text weight="bold">Solid</Text>: Dark semi-transparent background</li>
            <li><Text weight="bold">Blur</Text>: Blurred background with backdrop-filter</li>
            <li><Text weight="bold">Transparent</Text>: No visible backdrop (clicks still work)</li>
          </ul>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setVariant(null)}>Close</Button>
        </DrawerFooter>
      </Drawer>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--bk-color-border)' }}>
        <Heading level={3}>Background Content</Heading>
        <Paragraph>Open the drawers above to see how different backdrop styles affect this content.</Paragraph>
        <Paragraph>The blur backdrop will make this text appear blurred.</Paragraph>
      </div>
    </div>
  );
};

export const BackdropVariants: CustomRenderStory = {
  render: () => <BackdropVariantsComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Three backdrop variants: solid (default dark overlay), blur (backdrop-filter blur effect), and transparent (no visible backdrop but still interactive).',
      },
    },
  },
};

/**
 * Drawer with a settings form.
 * Demonstrates a real-world use case of a settings panel.
 */
const WithFormComponent = () => {
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
    { value: 'ja', label: 'Japanese' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <DrawerHeader onClose={() => setIsOpen(false)}>
          Settings
        </DrawerHeader>
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Profile
              </Heading>
              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
                <Input id="display-name" placeholder="Your name" fullWidth />
              </FormGroup>
              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="your@email.com" fullWidth />
              </FormGroup>
            </div>

            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
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
    </div>
  );
};

export const WithForm: CustomRenderStory = {
  render: () => <WithFormComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Settings panel drawer with form controls including inputs and selects. Demonstrates a typical right-side settings panel pattern.',
      },
    },
  },
};

/**
 * Left-side navigation drawer with menu items.
 * Common pattern for mobile navigation.
 */
const NavigationDrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
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
            <MenuItem icon={<Icon name="home" />} onClick={() => setIsOpen(false)}>
              Home
            </MenuItem>
            <MenuItem icon={<Icon name="dashboard" />} onClick={() => setIsOpen(false)}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<Icon name="file" />} onClick={() => setIsOpen(false)}>
              Documents
            </MenuItem>
            <MenuItem icon={<Icon name="calendar" />} onClick={() => setIsOpen(false)}>
              Calendar
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="settings-gear" />} onClick={() => setIsOpen(false)}>
              Settings
            </MenuItem>
            <MenuItem icon={<Icon name="account" />} onClick={() => setIsOpen(false)}>
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="sign-out" />} onClick={() => setIsOpen(false)}>
              Sign Out
            </MenuItem>
          </Menu>
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export const NavigationDrawer: CustomRenderStory = {
  render: () => <NavigationDrawerComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Left-side navigation drawer with menu items. A common pattern for mobile navigation or sidebar menus.',
      },
    },
  },
};

/**
 * Drawer with scrollable content.
 * Body section automatically handles overflow.
 */
const ScrollableContentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Drawer</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <DrawerHeader onClose={() => setIsOpen(false)}>
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
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Mark All Read
          </Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export const ScrollableContent: CustomRenderStory = {
  render: () => <ScrollableContentComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer with long content. The body section scrolls automatically while header and footer remain fixed.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all drawer features and variants.
 */
const ShowcaseComponent = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div style={{
      padding: '3rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <Heading level={1} marginBottom>Drawer Component Showcase</Heading>

      {/* Placements Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Placements</Heading>
        <Paragraph color="muted">
          Slide in from any edge: top, right, bottom, left
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['top', 'right', 'bottom', 'left'].map((placement) => (
            <Button key={placement} size="sm" onClick={() => setActiveDemo(`placement-${placement}`)}>
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Sizes Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Sizes</Heading>
        <Paragraph color="muted">
          Available sizes: xs (280px), sm (320px), md (400px), lg (560px), xl (720px), fullscreen
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'].map((size) => (
            <Button key={size} size="sm" onClick={() => setActiveDemo(`size-${size}`)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* Backdrop Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Backdrop Variants</Heading>
        <Paragraph color="muted">
          Solid (dark overlay), Blur (backdrop-filter), Transparent (no visual)
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => setActiveDemo('backdrop-solid')}>Solid</Button>
          <Button size="sm" onClick={() => setActiveDemo('backdrop-blur')}>Blur</Button>
          <Button size="sm" onClick={() => setActiveDemo('backdrop-transparent')}>Transparent</Button>
        </div>
      </section>

      {/* Usage Patterns Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Usage Patterns</Heading>
        <Paragraph color="muted">
          Common drawer patterns for different use cases
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => setActiveDemo('nav')}>Navigation</Button>
          <Button size="sm" onClick={() => setActiveDemo('settings')}>Settings</Button>
          <Button size="sm" onClick={() => setActiveDemo('scroll')}>Scrollable</Button>
        </div>
      </section>

      {/* Placement drawers */}
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Drawer
          key={`placement-${placement}`}
          open={activeDemo === `placement-${placement}`}
          onClose={() => setActiveDemo(null)}
          placement={placement}
          size="sm"
        >
          <DrawerHeader onClose={() => setActiveDemo(null)}>
            {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
          </DrawerHeader>
          <DrawerBody>
            <Paragraph>Slides in from the {placement} edge.</Paragraph>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      ))}

      {/* Size drawers */}
      {(['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'] as const).map((size) => (
        <Drawer
          key={`size-${size}`}
          open={activeDemo === `size-${size}`}
          onClose={() => setActiveDemo(null)}
          size={size}
        >
          <DrawerHeader onClose={() => setActiveDemo(null)}>
            {size.toUpperCase()} Drawer
          </DrawerHeader>
          <DrawerBody>
            <Paragraph>This is a {size} sized drawer.</Paragraph>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      ))}

      {/* Backdrop drawers */}
      {(['solid', 'blur', 'transparent'] as const).map((variant) => (
        <Drawer
          key={`backdrop-${variant}`}
          open={activeDemo === `backdrop-${variant}`}
          onClose={() => setActiveDemo(null)}
          backdropVariant={variant}
          size="sm"
        >
          <DrawerHeader onClose={() => setActiveDemo(null)}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Backdrop
          </DrawerHeader>
          <DrawerBody>
            <Paragraph>
              Uses the <Text weight="bold">{variant}</Text> backdrop variant.
            </Paragraph>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      ))}

      {/* Navigation drawer */}
      <Drawer
        open={activeDemo === 'nav'}
        onClose={() => setActiveDemo(null)}
        placement="left"
        size="sm"
      >
        <DrawerHeader onClose={() => setActiveDemo(null)}>
          Navigation
        </DrawerHeader>
        <DrawerBody>
          <Menu>
            <MenuItem icon={<Icon name="home" />} onClick={() => setActiveDemo(null)}>Home</MenuItem>
            <MenuItem icon={<Icon name="dashboard" />} onClick={() => setActiveDemo(null)}>Dashboard</MenuItem>
            <MenuItem icon={<Icon name="file" />} onClick={() => setActiveDemo(null)}>Documents</MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="settings-gear" />} onClick={() => setActiveDemo(null)}>Settings</MenuItem>
          </Menu>
        </DrawerBody>
      </Drawer>

      {/* Settings drawer */}
      <Drawer
        open={activeDemo === 'settings'}
        onClose={() => setActiveDemo(null)}
        size="md"
      >
        <DrawerHeader onClose={() => setActiveDemo(null)}>
          Settings
        </DrawerHeader>
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormGroup orientation="vertical">
              <FieldLabel htmlFor="demo-name">Name</FieldLabel>
              <Input id="demo-name" placeholder="Enter name" fullWidth />
            </FormGroup>
            <FormGroup orientation="vertical">
              <FieldLabel htmlFor="demo-email">Email</FieldLabel>
              <Input id="demo-email" type="email" placeholder="Enter email" fullWidth />
            </FormGroup>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => setActiveDemo(null)}>Cancel</Button>
          <Button variant="primary" onClick={() => setActiveDemo(null)}>Save</Button>
        </DrawerFooter>
      </Drawer>

      {/* Scrollable drawer */}
      <Drawer
        open={activeDemo === 'scroll'}
        onClose={() => setActiveDemo(null)}
        size="md"
      >
        <DrawerHeader onClose={() => setActiveDemo(null)}>
          Scrollable Content
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 20 }, (_, i) => (
            <Paragraph key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet.</Paragraph>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setActiveDemo(null)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export const Showcase: CustomRenderStory = {
  render: () => <ShowcaseComponent />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all drawer features: placements, sizes, backdrop variants, and common usage patterns.',
      },
    },
  },
};
