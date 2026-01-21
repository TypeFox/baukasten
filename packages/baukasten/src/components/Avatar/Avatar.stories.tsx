import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

/**
 * Avatar component displays user images, initials, or a fallback.
 * Supports circular and square shapes with optional tooltips.
 * When no image is provided, it automatically displays initials from the name.
 */
const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile avatar component that displays user images, initials, or a fallback. Supports circular and square shapes with optional tooltips.',
            },
        },
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Full name of the person (used for initials and tooltip)',
        },
        src: {
            control: 'text',
            description: 'Image URL to display',
        },
        alt: {
            control: 'text',
            description: 'Alt text for the image',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the avatar',
        },
        shape: {
            control: 'select',
            options: ['circular', 'square'],
            description: 'Shape of the avatar',
        },
        tooltip: {
            control: 'text',
            description: 'Tooltip content to display on hover',
        },
        showTooltip: {
            control: 'boolean',
            description: 'Whether to show tooltip',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default avatar with initials
 */
export const Default: Story = {
    args: {
        name: 'John Doe',
        size: 'md',
        shape: 'circular',
        showTooltip: true,
    },
};

/**
 * Avatar with image
 */
export const WithImage: Story = {
    args: {
        name: 'Jane Smith',
        src: 'https://i.pravatar.cc/150?img=1',
        size: 'md',
        shape: 'circular',
        showTooltip: true,
    },
};

/**
 * All available sizes
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <Avatar name="John Doe" size="xs" />
            <Avatar name="John Doe" size="sm" />
            <Avatar name="John Doe" size="md" />
            <Avatar name="John Doe" size="lg" />
            <Avatar name="John Doe" size="xl" />
        </div>
    ),
};

/**
 * Circular vs Square shapes
 */
export const Shapes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="John Doe" shape="circular" size="lg" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>Circular</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="John Doe" shape="square" size="lg" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>Square</span>
            </div>
        </div>
    ),
};

/**
 * With images - Circular and Square
 */
export const WithImages: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=1" shape="circular" size="lg" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>Circular</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=1" shape="square" size="lg" />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>Square</span>
            </div>
        </div>
    ),
};

/**
 * All sizes with images
 */
export const SizesWithImages: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
            <Avatar name="User 1" src="https://i.pravatar.cc/150?img=2" size="xs" />
            <Avatar name="User 2" src="https://i.pravatar.cc/150?img=3" size="sm" />
            <Avatar name="User 3" src="https://i.pravatar.cc/150?img=4" size="md" />
            <Avatar name="User 4" src="https://i.pravatar.cc/150?img=5" size="lg" />
            <Avatar name="User 5" src="https://i.pravatar.cc/150?img=6" size="xl" />
        </div>
    ),
};

/**
 * Avatar group example
 */
export const AvatarGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexDirection: 'column' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Team Members
                </h4>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=7" />
                    <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=8" />
                    <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=9" />
                    <Avatar name="Alice Williams" src="https://i.pravatar.cc/150?img=10" />
                    <Avatar name="Charlie Brown" />
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Project Team (Square)
                </h4>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    <Avatar name="Sarah Connor" shape="square" />
                    <Avatar name="Kyle Reese" shape="square" />
                    <Avatar name="John Connor" shape="square" />
                </div>
            </div>
        </div>
    ),
};

/**
 * Different initials patterns
 */
export const InitialsPatterns: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="John" size="md" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Single name</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="John Doe" size="md" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Two names</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="John Michael Doe" size="md" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Three names</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <Avatar name="María José García López" size="md" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>Four names</span>
            </div>
        </div>
    ),
};

/**
 * Custom tooltips
 */
export const CustomTooltips: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}>
            <Avatar name="John Doe" tooltip="CEO & Founder" size="lg" />
            <Avatar name="Jane Smith" tooltip="Senior Developer" src="https://i.pravatar.cc/150?img=11" size="lg" />
            <Avatar name="Bob Johnson" tooltip="Product Manager" size="lg" />
            <Avatar name="Alice Williams" showTooltip={false} size="lg" />
        </div>
    ),
};

/**
 * Without tooltip
 */
export const WithoutTooltip: Story = {
    args: {
        name: 'John Doe',
        showTooltip: false,
        size: 'lg',
    },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-6)',
            flexWrap: 'wrap',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-4)',
                background: 'var(--color-background-secondary)',
                borderRadius: 'var(--radius-lg)',
                minWidth: '300px',
            }}>
                <h3 style={{ margin: 0, fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    User Profile
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                    <Avatar name="Sarah Johnson" src="https://i.pravatar.cc/150?img=12" size="xl" />
                    <div>
                        <div style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-base)' }}>
                            Sarah Johnson
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>
                            Senior Software Engineer
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-4)',
                background: 'var(--color-background-secondary)',
                borderRadius: 'var(--radius-lg)',
                minWidth: '300px',
            }}>
                <h3 style={{ margin: 0, fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Team Members
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    {[
                        { name: 'John Doe', role: 'Team Lead', img: 13 },
                        { name: 'Emily Chen', role: 'Frontend Developer', img: 14 },
                        { name: 'Michael Brown', role: 'Backend Developer', img: 15 },
                        { name: 'Anna White', role: 'Designer' },
                    ].map((member) => (
                        <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Avatar
                                name={member.name}
                                src={member.img ? `https://i.pravatar.cc/150?img=${member.img}` : undefined}
                                size="sm"
                                tooltip={`${member.name} - ${member.role}`}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    {member.name}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
                                    {member.role}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};
