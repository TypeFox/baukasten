'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Avatar } from '@baukasten/ui';

const avatarProps: PropDefinition[] = [
    {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Full name of the person (used for initials and tooltip)',
    },
    {
        name: 'src',
        type: 'string',
        required: false,
        description: 'Image URL to display. When not provided, initials from name will be shown',
    },
    {
        name: 'alt',
        type: 'string',
        required: false,
        description: 'Alt text for the image',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the avatar',
    },
    {
        name: 'shape',
        type: '"circular" | "square"',
        default: '"circular"',
        description: 'Shape of the avatar',
    },
    {
        name: 'tooltip',
        type: 'string',
        required: false,
        description: 'Tooltip content to display on hover. When not provided, name will be used if available',
    },
    {
        name: 'showTooltip',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show tooltip',
    },
];

export default function AvatarPage() {
    return (
        <PageLayout
            title="Avatar"
            description="A versatile avatar component that displays user images, initials, or a fallback. Supports circular and square shapes with optional tooltips."
        >
            <Showcase
                title="Basic Usage"
                description="The default avatar displays initials from the name prop when no image is provided."
                preview={
                    <Avatar name="John Doe" />
                }
                code={`import { Avatar } from '@baukasten/ui';

function App() {
  return <Avatar name="John Doe" />;
}`}
            />

            <Showcase
                title="With Image"
                description="When an image URL is provided via the src prop, it displays the image instead of initials."
                preview={
                    <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=1" />
                }
                code={`<Avatar 
  name="Jane Smith" 
  src="https://i.pravatar.cc/150?img=1" 
/>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options from extra small to extra large."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                        <Avatar name="John Doe" size="xs" />
                        <Avatar name="John Doe" size="sm" />
                        <Avatar name="John Doe" size="md" />
                        <Avatar name="John Doe" size="lg" />
                        <Avatar name="John Doe" size="xl" />
                    </div>
                }
                code={`<Avatar name="John Doe" size="xs" />
<Avatar name="John Doe" size="sm" />
<Avatar name="John Doe" size="md" />
<Avatar name="John Doe" size="lg" />
<Avatar name="John Doe" size="xl" />`}
            />

            <Showcase
                title="Shapes"
                description="Avatars can be circular (default) or square."
                preview={
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
                }
                code={`<Avatar name="John Doe" shape="circular" size="lg" />
<Avatar name="John Doe" shape="square" size="lg" />`}
            />

            <Showcase
                title="With Images - Different Shapes"
                description="Images work with both circular and square shapes."
                preview={
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
                }
                code={`<Avatar 
  name="Jane Smith" 
  src="https://i.pravatar.cc/150?img=1" 
  shape="circular" 
  size="lg" 
/>

<Avatar 
  name="Jane Smith" 
  src="https://i.pravatar.cc/150?img=1" 
  shape="square" 
  size="lg" 
/>`}
            />

            <Showcase
                title="All Sizes with Images"
                description="Images scale properly across all size variants."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                        <Avatar name="User 1" src="https://i.pravatar.cc/150?img=2" size="xs" />
                        <Avatar name="User 2" src="https://i.pravatar.cc/150?img=3" size="sm" />
                        <Avatar name="User 3" src="https://i.pravatar.cc/150?img=4" size="md" />
                        <Avatar name="User 4" src="https://i.pravatar.cc/150?img=5" size="lg" />
                        <Avatar name="User 5" src="https://i.pravatar.cc/150?img=6" size="xl" />
                    </div>
                }
                code={`<Avatar name="User 1" src="https://i.pravatar.cc/150?img=2" size="xs" />
<Avatar name="User 2" src="https://i.pravatar.cc/150?img=3" size="sm" />
<Avatar name="User 3" src="https://i.pravatar.cc/150?img=4" size="md" />
<Avatar name="User 4" src="https://i.pravatar.cc/150?img=5" size="lg" />
<Avatar name="User 5" src="https://i.pravatar.cc/150?img=6" size="xl" />`}
            />

            <Showcase
                title="Initials Generation"
                description="Initials are automatically extracted from the first and last name. Single names show only one initial."
                preview={
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
                }
                code={`<Avatar name="John" />                    // Shows "J"
<Avatar name="John Doe" />                // Shows "JD"
<Avatar name="John Michael Doe" />       // Shows "JD"
<Avatar name="María José García López" /> // Shows "ML"`}
            />

            <Showcase
                title="Custom Tooltips"
                description="Customize the tooltip content or disable it entirely. By default, the tooltip shows the name."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Avatar name="John Doe" tooltip="CEO & Founder" size="lg" />
                        <Avatar name="Jane Smith" tooltip="Senior Developer" src="https://i.pravatar.cc/150?img=11" size="lg" />
                        <Avatar name="Bob Johnson" tooltip="Product Manager" size="lg" />
                        <Avatar name="Alice Williams" showTooltip={false} size="lg" />
                    </div>
                }
                code={`// Custom tooltip
<Avatar name="John Doe" tooltip="CEO & Founder" />

// Default tooltip (shows name)
<Avatar name="Jane Smith" src="..." />

// No tooltip
<Avatar name="Alice Williams" showTooltip={false} />`}
            />

            <Showcase
                title="Avatar Group"
                description="Common pattern for displaying multiple avatars together."
                preview={
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
                }
                code={`<div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
  <Avatar name="John Doe" src="..." />
  <Avatar name="Jane Smith" src="..." />
  <Avatar name="Bob Johnson" src="..." />
  <Avatar name="Charlie Brown" />
</div>`}
            />

            <Showcase
                title="User Profile Example"
                description="Combine avatars with other components for rich user interfaces."
                preview={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)',
                        padding: 'var(--spacing-4)',
                        background: 'var(--color-background-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        maxWidth: '400px',
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
                }
                code={`<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
  <Avatar 
    name="Sarah Johnson" 
    src="https://i.pravatar.cc/150?img=12" 
    size="xl" 
  />
  <div>
    <div>Sarah Johnson</div>
    <div>Senior Software Engineer</div>
  </div>
</div>`}
            />

            <Showcase
                title="Team List Example"
                description="Use avatars in lists to represent team members or users."
                preview={
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
                }
                code={`const team = [
  { name: 'John Doe', role: 'Team Lead', img: '...' },
  { name: 'Emily Chen', role: 'Frontend Developer', img: '...' },
];

return (
  <div>
    {team.map((member) => (
      <div key={member.name}>
        <Avatar 
          name={member.name} 
          src={member.img}
          size="sm"
          tooltip={\`\${member.name} - \${member.role}\`}
        />
        <div>
          <div>{member.name}</div>
          <div>{member.role}</div>
        </div>
      </div>
    ))}
  </div>
);`}
                props={avatarProps}
            />
        </PageLayout>
    );
}
