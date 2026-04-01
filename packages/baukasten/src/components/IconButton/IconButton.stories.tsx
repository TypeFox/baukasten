import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Button } from '../Button';
import { Icon } from '../Icon';

const meta = {
    title: 'Components/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A square icon-only button whose width and height match the normal Button height for each size. Ideal for toolbar actions, compact icon controls, and icon actions that need to align with text buttons. Supports all button variants, sizes, and outline styles.',
            },
        },
    },
    tags: ['autodocs'],
    args: {
        icon: <Icon name="check" />,
        'aria-label': 'Action',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'link'],
            description: 'Visual style variant of the button',
            table: {
                defaultValue: { summary: 'primary' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the button (square: width = height)',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        outline: {
            control: 'boolean',
            description: 'Render with outline style (inverted colors)',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        icon: {
            control: false,
            description: 'The icon to display inside the button (React node)',
        },
        'aria-label': {
            control: 'text',
            description: 'Accessible label (required for icon-only buttons)',
        },
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all IconButton properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    args: {
        icon: <Icon name="check" />,
        variant: 'primary',
        size: 'md',
        outline: false,
        disabled: false,
        'aria-label': 'Confirm',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all IconButton properties. Try different combinations using the controls below.',
            },
        },
    },
};

/**
 * All available button variants displayed side-by-side for comparison.
 */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton icon={<Icon name="check" />} variant="primary" aria-label="Primary" />
            <IconButton icon={<Icon name="check" />} variant="secondary" aria-label="Secondary" />
            <IconButton icon={<Icon name="check" />} variant="ghost" aria-label="Ghost" />
            <IconButton icon={<Icon name="check" />} variant="link" aria-label="Link" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'IconButton variants: **Primary** (main actions), **Secondary** (secondary actions), **Ghost** (minimal emphasis), **Link** (text-only).',
            },
        },
    },
};

/**
 * All available sizes from extra small to extra large.
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <IconButton icon={<Icon name="add" />} size="xs" aria-label="Extra Small" />
            <IconButton icon={<Icon name="add" />} size="sm" aria-label="Small" />
            <IconButton icon={<Icon name="add" />} size="md" aria-label="Medium" />
            <IconButton icon={<Icon name="add" />} size="lg" aria-label="Large" />
            <IconButton icon={<Icon name="add" />} size="xl" aria-label="Extra Large" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Five size options available: **xs** (20px), **sm** (24px), **md** (28px, default), **lg** (32px), **xl** (36px). Each is a perfect square.',
            },
        },
    },
};

/**
 * Outline style variants with transparent backgrounds and colored borders.
 */
export const OutlineVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton icon={<Icon name="edit" />} variant="primary" outline aria-label="Primary Outline" />
            <IconButton icon={<Icon name="edit" />} variant="secondary" outline aria-label="Secondary Outline" />
            <IconButton icon={<Icon name="edit" />} variant="ghost" outline aria-label="Ghost Outline" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Outline icon buttons have transparent backgrounds with colored borders. They fill with solid color on hover.',
            },
        },
    },
};

/**
 * Various icons demonstrating the component with different Codicons.
 */
export const WithDifferentIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Common Actions
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="close" />} variant="ghost" aria-label="Close" />
                    <IconButton icon={<Icon name="add" />} variant="primary" aria-label="Add" />
                    <IconButton icon={<Icon name="edit" />} variant="secondary" aria-label="Edit" />
                    <IconButton icon={<Icon name="trash" />} variant="ghost" aria-label="Delete" />
                    <IconButton icon={<Icon name="save" />} variant="primary" aria-label="Save" />
                    <IconButton icon={<Icon name="refresh" />} variant="secondary" aria-label="Refresh" />
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Navigation & View
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="chevron-left" />} variant="secondary" aria-label="Previous" />
                    <IconButton icon={<Icon name="chevron-right" />} variant="secondary" aria-label="Next" />
                    <IconButton icon={<Icon name="chevron-up" />} variant="secondary" aria-label="Up" />
                    <IconButton icon={<Icon name="chevron-down" />} variant="secondary" aria-label="Down" />
                    <IconButton icon={<Icon name="search" />} variant="ghost" aria-label="Search" />
                    <IconButton icon={<Icon name="filter" />} variant="ghost" aria-label="Filter" />
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Media Controls
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="play" />} variant="primary" aria-label="Play" />
                    <IconButton icon={<Icon name="debug-pause" />} variant="secondary" aria-label="Pause" />
                    <IconButton icon={<Icon name="debug-stop" />} variant="ghost" aria-label="Stop" />
                    <IconButton icon={<Icon name="record" />} variant="primary" outline aria-label="Record" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'IconButton works with any Codicon. Pass an `<Icon />` component as the `icon` prop.',
            },
        },
    },
};

/**
 * Disabled state across variants.
 */
export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Disabled IconButtons
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="check" />} variant="primary" disabled aria-label="Primary Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="secondary" disabled aria-label="Secondary Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="ghost" disabled aria-label="Ghost Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="primary" outline disabled aria-label="Outline Disabled" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Disabled icon buttons have reduced opacity and prevent all interactions.',
            },
        },
    },
};

/**
 * Side-by-side comparison with regular Button to demonstrate height alignment.
 */
export const ComparisonWithButton: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                        Size: {size}
                    </h4>
                    <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', alignItems: 'center' }}>
                        <Button variant="primary" size={size}>Button</Button>
                        <IconButton icon={<Icon name="ellipsis" />} variant="primary" size={size} aria-label="More" />
                        <Button variant="secondary" size={size}>Secondary</Button>
                        <IconButton icon={<Icon name="gear" />} variant="secondary" size={size} aria-label="Settings" />
                        <IconButton icon={<Icon name="close" />} variant="ghost" size={size} aria-label="Close" />
                    </div>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'IconButton height matches the regular Button height at every size, ensuring perfect alignment in toolbars and action rows.',
            },
        },
    },
};

/**
 * Comprehensive showcase of all IconButton capabilities.
 */
export const Showcase: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)' }}>
            {/* Filled Variants */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Filled Variants</h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="check" />} variant="primary" aria-label="Primary" />
                    <IconButton icon={<Icon name="check" />} variant="secondary" aria-label="Secondary" />
                    <IconButton icon={<Icon name="check" />} variant="ghost" aria-label="Ghost" />
                    <IconButton icon={<Icon name="check" />} variant="link" aria-label="Link" />
                </div>
            </div>

            {/* Outline Variants */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Outline Variants</h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="edit" />} variant="primary" outline aria-label="Primary Outline" />
                    <IconButton icon={<Icon name="edit" />} variant="secondary" outline aria-label="Secondary Outline" />
                    <IconButton icon={<Icon name="edit" />} variant="ghost" outline aria-label="Ghost Outline" />
                </div>
            </div>

            {/* All Sizes */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Sizes</h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <IconButton icon={<Icon name="add" />} size="xs" aria-label="XS" />
                    <IconButton icon={<Icon name="add" />} size="sm" aria-label="SM" />
                    <IconButton icon={<Icon name="add" />} size="md" aria-label="MD" />
                    <IconButton icon={<Icon name="add" />} size="lg" aria-label="LG" />
                    <IconButton icon={<Icon name="add" />} size="xl" aria-label="XL" />
                </div>
            </div>

            {/* Alignment with Regular Buttons */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Aligned with Regular Buttons</h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', alignItems: 'center' }}>
                    <Button variant="primary">Save Changes</Button>
                    <IconButton icon={<Icon name="ellipsis" />} variant="secondary" aria-label="More options" />
                    <IconButton icon={<Icon name="close" />} variant="ghost" aria-label="Close" />
                </div>
            </div>

            {/* Toolbar Example */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Toolbar Example</h3>
                <div style={{
                    display: 'flex',
                    gap: 'var(--bk-gap-xs)',
                    alignItems: 'center',
                    padding: 'var(--bk-spacing-1)',
                    backgroundColor: 'var(--bk-color-background-secondary)',
                    borderRadius: 'var(--bk-radius-sm)',
                    width: 'fit-content',
                }}>
                    <IconButton icon={<Icon name="bold" />} variant="ghost" size="sm" aria-label="Bold" />
                    <IconButton icon={<Icon name="italic" />} variant="ghost" size="sm" aria-label="Italic" />
                    <IconButton icon={<Icon name="list-unordered" />} variant="ghost" size="sm" aria-label="Unordered List" />
                    <IconButton icon={<Icon name="list-ordered" />} variant="ghost" size="sm" aria-label="Ordered List" />
                    <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--bk-color-border)', margin: '0 var(--bk-spacing-0-5)' }} />
                    <IconButton icon={<Icon name="link-external" />} variant="ghost" size="sm" aria-label="Insert Link" />
                    <IconButton icon={<Icon name="file-media" />} variant="ghost" size="sm" aria-label="Insert Image" />
                </div>
            </div>

            {/* Disabled States */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>Disabled States</h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <IconButton icon={<Icon name="check" />} variant="primary" disabled aria-label="Primary Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="secondary" disabled aria-label="Secondary Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="ghost" disabled aria-label="Ghost Disabled" />
                    <IconButton icon={<Icon name="check" />} variant="primary" outline disabled aria-label="Outline Disabled" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Comprehensive showcase demonstrating all IconButton capabilities: variants, sizes, states, outline mode, alignment with regular buttons, and toolbar usage.',
            },
        },
    },
};
