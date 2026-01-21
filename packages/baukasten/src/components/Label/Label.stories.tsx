import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';
import { Label } from './Label';

const meta = {
    title: 'Components/Label',
    component: Label,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `A versatile label wrapper for form components. Supports three variants:

**Input Variant** (default): For wrapping text inputs and selects with borders, backgrounds, prefix/suffix text, icons, and badges (horizontal layout).

**TextArea Variant**: For wrapping textareas with borders, backgrounds, and label text/icons on top (vertical layout).

**Checkbox Variant**: For wrapping checkboxes, radio buttons, and switches with simple flex layout and proper alignment.`,
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '500px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['input', 'textarea', 'checkbox'],
            description: 'Visual variant: input for text inputs/selects, textarea for textareas, checkbox for checkboxes/switches',
            table: {
                defaultValue: { summary: 'input' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size to match the form component inside',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the label should take full width of its container (input variant only)',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        error: {
            control: 'text',
            description: 'Error message displayed below the label (input variant only)',
            table: {
                defaultValue: { summary: 'undefined' },
            },
        },
    },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all label properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    args: {
        size: 'md',
        fullWidth: false,
        error: undefined,
        children: <Input placeholder="Enter text..." />,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore label properties. The label can wrap any form input component. Make sure to set the size prop to match your input size.',
            },
        },
    },
};

/**
 * Labels with prefix text before the input.
 */
export const WithPrefix: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <Label>
                <span className="label">https://</span>
                <Input type="text" placeholder="example.com" />
            </Label>
            <Label>
                <span className="label">@</span>
                <Input type="text" placeholder="username" />
            </Label>
            <Label>
                <span className="label">$</span>
                <Input type="number" placeholder="0.00" />
            </Label>
            <Label>
                <span className="label">+1</span>
                <Input type="tel" placeholder="(555) 000-0000" />
            </Label>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Add prefix text before inputs using `<span className="label">`. Common use cases: URLs, usernames, currency symbols, country codes.',
            },
        },
    },
};

/**
 * Labels with suffix text after the input.
 */
export const WithSuffix: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <Label>
                <Input type="text" placeholder="yourdomain" />
                <span className="label">.com</span>
            </Label>
            <Label>
                <Input type="number" placeholder="100" />
                <span className="label">kg</span>
            </Label>
            <Label>
                <Input type="number" placeholder="50" />
                <span className="label">%</span>
            </Label>
            <Label>
                <Input type="number" placeholder="0.00" />
                <span className="label">USD</span>
            </Label>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Add suffix text after inputs using `<span className="label">`. Common use cases: domain extensions, units of measurement, currency codes.',
            },
        },
    },
};

/**
 * Labels with both prefix and suffix text.
 */
export const WithPrefixAndSuffix: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <Label>
                <span className="label">$</span>
                <Input type="number" placeholder="0.00" />
                <span className="label">USD</span>
            </Label>
            <Label>
                <span className="label">https://</span>
                <Input type="text" placeholder="example" />
                <span className="label">.com</span>
            </Label>
            <Label>
                <span className="label">Weight:</span>
                <Input type="number" placeholder="0" />
                <span className="label">kg</span>
            </Label>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Combine both prefix and suffix for maximum context. The input automatically adjusts its border radius.',
            },
        },
    },
};

/**
 * Different input sizes work seamlessly with labels.
 */
export const WithSizes: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Extra Small
                </h4>
                <Label size="xs">
                    <span className="label">https://</span>
                    <Input size="xs" placeholder="example.com" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Small
                </h4>
                <Label size="sm">
                    <span className="label">$</span>
                    <Input size="sm" type="number" placeholder="0.00" />
                    <span className="label">USD</span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Medium (Default)
                </h4>
                <Label size="md">
                    <Input size="md" placeholder="domain" />
                    <span className="label">.com</span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Large
                </h4>
                <Label size="lg">
                    <span className="label">@</span>
                    <Input size="lg" placeholder="username" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Extra Large
                </h4>
                <Label size="xl">
                    <span className="label">+1</span>
                    <Input size="xl" type="tel" placeholder="(555) 000-0000" />
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Labels work with all input sizes. **Important**: Set the Label `size` prop to match the Input `size` prop for proper alignment.',
            },
        },
    },
};

/**
 * Different input variants work with labels.
 */
export const WithVariants: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Primary (Default)
                </h4>
                <Label>
                    <span className="label">https://</span>
                    <Input placeholder="example.com" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Secondary
                </h4>
                <Label>
                    <span className="label">$</span>
                    <Input type="number" placeholder="0.00" />
                    <span className="label">USD</span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Ghost
                </h4>
                <Label>
                    <Input placeholder="domain" />
                    <span className="label">.com</span>
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Labels work with different input patterns: text, number, and with different prefix/suffix combinations.',
            },
        },
    },
};

/**
 * Labels with icons for enhanced visual context.
 */
export const WithIcons: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Search with Icon
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="search" />
                    </span>
                    <Input size="md" type="text" placeholder="Search..." />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Email with Icon
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="mail" />
                    </span>
                    <Input size="md" type="email" placeholder="you@example.com" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Lock Icon (Password)
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="lock" />
                    </span>
                    <Input size="md" type="password" placeholder="Enter password" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Icon Suffix
                </h4>
                <Label size="md">
                    <Input size="md" type="text" placeholder="Enter URL" />
                    <span className="label">
                        <Icon name="link" />
                    </span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Search with Keyboard Shortcut
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="search" />
                    </span>
                    <Input size="md" type="text" placeholder="Search" />
                    <span className="label" style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        padding: '0 var(--spacing-1-5)',
                        opacity: 0.7
                    }}>
                        ⌘K
                    </span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Icons Scale with Label Size
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="xs">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="xs" type="text" placeholder="XS Label" />
                    </Label>
                    <Label size="sm">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="sm" type="text" placeholder="SM Label" />
                    </Label>
                    <Label size="md">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="md" type="text" placeholder="MD Label" />
                    </Label>
                    <Label size="lg">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="lg" type="text" placeholder="LG Label" />
                    </Label>
                    <Label size="xl">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="xl" type="text" placeholder="XL Label" />
                    </Label>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Labels can contain Codicons in prefix or suffix positions. Icons help users identify input purpose quickly and automatically scale with the label size.',
            },
        },
    },
};

/**
 * Date and time input examples.
 */
export const DateAndTime: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Date Picker
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="calendar" />
                    </span>
                    <Input size="md" type="date" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Time Picker
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="watch" />
                    </span>
                    <Input size="md" type="time" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    DateTime Picker
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="calendar" />
                    </span>
                    <Input size="md" type="datetime-local" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Week Picker
                </h4>
                <Label size="md">
                    <span className="label">Week</span>
                    <Input size="md" type="week" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Month Picker
                </h4>
                <Label size="md">
                    <span className="label">Month</span>
                    <Input size="md" type="month" />
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Date and time input types work seamlessly with labels. Add calendar/clock icons for better UX.',
            },
        },
    },
};

/**
 * Error states for labels with validation feedback.
 */
export const WithErrors: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Required Field Error
                </h4>
                <Label size="md" error="This field is required">
                    <Input size="md" placeholder="Username" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Invalid Email Error
                </h4>
                <Label size="md" error="Please enter a valid email address">
                    <span className="label">
                        <Icon name="mail" />
                    </span>
                    <Input size="md" type="email" placeholder="you@example.com" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Price Validation Error
                </h4>
                <Label size="md" error="Price must be greater than 0">
                    <span className="label">$</span>
                    <Input size="md" type="number" placeholder="0.00" />
                    <span className="label">USD</span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    URL Validation Error
                </h4>
                <Label size="md" error="URL must start with https://">
                    <span className="label">https://</span>
                    <Input size="md" placeholder="example.com" />
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Labels support error states. When an error prop is provided, the border turns red and an error message is displayed below.',
            },
        },
    },
};

/**
 * Advanced input patterns with labels.
 */
export const AdvancedPatterns: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    File Upload
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="cloud-upload" />
                    </span>
                    <Input size="md" type="file" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Color Picker
                </h4>
                <Label size="md">
                    <span className="label">Color</span>
                    <Input size="md" type="color" defaultValue="#3b82f6" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Range Slider with Value
                </h4>
                <Label size="md">
                    <span className="label">Volume</span>
                    <Input size="md" type="range" min="0" max="100" defaultValue="50" />
                    <span className="label">50%</span>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    User @ Domain
                </h4>
                <Label size="md">
                    <Input size="md" type="text" placeholder="username" />
                    <span className="label">@</span>
                    <Input size="md" type="text" placeholder="domain.com" />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Credit Card
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="credit-card" />
                    </span>
                    <Input size="md" type="text" placeholder="1234 5678 9012 3456" />
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Advanced patterns: file uploads, color pickers, range sliders, multiple inputs, and more creative combinations.',
            },
        },
    },
};

/**
 * Common real-world usage patterns.
 */
export const UsageExamples: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '400px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Website URL
                </h4>
                <Label fullWidth>
                    <span className="label">https://</span>
                    <Input type="text" placeholder="example" fullWidth />
                    <span className="label">.com</span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Social Media Handle
                </h4>
                <Label fullWidth>
                    <span className="label">@</span>
                    <Input type="text" placeholder="username" fullWidth />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Price Input
                </h4>
                <Label fullWidth>
                    <span className="label">$</span>
                    <Input type="number" placeholder="0.00" fullWidth />
                    <span className="label">USD</span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Domain Name
                </h4>
                <Label fullWidth>
                    <Input type="text" placeholder="yourdomain" fullWidth />
                    <span className="label">.com</span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Phone Number
                </h4>
                <Label fullWidth>
                    <span className="label">+1</span>
                    <Input type="tel" placeholder="(555) 000-0000" fullWidth />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Weight Measurement
                </h4>
                <Label fullWidth>
                    <Input type="number" placeholder="100" fullWidth />
                    <span className="label">kg</span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    API Key (with Status Badge)
                </h4>
                <Label fullWidth size="md">
                    <span className="label">
                        <Icon name="key" />
                    </span>
                    <Input size="md" type="password" placeholder="sk_live_••••••••••••••••" fullWidth />
                    <Badge size="sm" variant="success">Active</Badge>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Premium Feature (with Badge)
                </h4>
                <Label fullWidth size="md">
                    <Input size="md" type="text" placeholder="Advanced analytics query" fullWidth />
                    <Badge size="sm" variant="info">Pro</Badge>
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Real-world examples: URLs, social media handles, prices, domain names, phone numbers, measurements, and badges for status indicators.',
            },
        },
    },
};

/**
 * Complete form field pattern with label text on top and input with adornments below.
 */
export const FormFieldPattern: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '300px' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', margin: 0 }}>
                        Username
                    </h4>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', fontWeight: 'var(--font-weight-medium)' }}>
                        Required
                    </span>
                </div>
                <Label size="md" fullWidth>
                    <span className="label">@</span>
                    <Input size="md" placeholder="username" fullWidth />
                </Label>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', margin: 0 }}>
                        Website URL
                    </h4>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-secondary-foreground)', opacity: 0.7 }}>
                        Optional
                    </span>
                </div>
                <Label size="md" fullWidth>
                    <span className="label">https://</span>
                    <Input size="md" placeholder="example.com" fullWidth />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Price
                </h4>
                <Label size="md" fullWidth>
                    <span className="label">$</span>
                    <Input size="md" type="number" placeholder="0.00" fullWidth />
                    <span className="label">USD</span>
                </Label>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', margin: 0 }}>
                        Email Address
                    </h4>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', fontWeight: 'var(--font-weight-medium)' }}>
                        Required*
                    </span>
                </div>
                <Label size="md" fullWidth>
                    <span className="label">
                        <Icon name="mail" />
                    </span>
                    <Input size="md" type="email" placeholder="you@example.com" fullWidth />
                </Label>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', margin: 0 }}>
                        Search
                    </h4>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-secondary-foreground)', opacity: 0.7 }}>
                        Optional
                    </span>
                </div>
                <Label size="md" fullWidth>
                    <span className="label">
                        <Icon name="search" />
                    </span>
                    <Input size="md" placeholder="Search..." fullWidth />
                    <span className="label" style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        padding: '0 var(--spacing-1-5)',
                        opacity: 0.7
                    }}>
                        ⌘K
                    </span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    API Key
                </h4>
                <Label size="md" fullWidth error="Invalid API key format">
                    <span className="label">
                        <Icon name="key" />
                    </span>
                    <Input size="md" type="password" placeholder="sk_live_..." fullWidth />
                    <Badge size="sm" variant="error">Expired</Badge>
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: '**Complete form field pattern**: Text label positioned above the Label wrapper containing the input and adornments. Shows both required and optional fields, with the optional indicator displayed as muted text on the right side of the label.',
            },
        },
    },
};

/**
 * Labels work seamlessly with the custom Select component.
 */
export const WithSelect: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '300px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Prefix
                </h4>
                <Label size="md">
                    <span className="label">Language:</span>
                    <Select
                        size="md"
                        options={[
                            { value: 'js', label: 'JavaScript' },
                            { value: 'ts', label: 'TypeScript' },
                            { value: 'py', label: 'Python' },
                            { value: 'rs', label: 'Rust' },
                        ]}
                        placeholder="Choose language"
                    />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Icon Prefix
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="symbol-color" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'light', label: 'Light Theme' },
                            { value: 'dark', label: 'Dark Theme' },
                            { value: 'contrast', label: 'High Contrast' },
                        ]}
                        placeholder="Select theme"
                    />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Badge Suffix
                </h4>
                <Label size="md">
                    <span className="label">Region:</span>
                    <Select
                        size="md"
                        options={[
                            { value: 'us-east', label: 'US East' },
                            { value: 'us-west', label: 'US West' },
                            { value: 'eu-central', label: 'EU Central' },
                        ]}
                        placeholder="Select region"
                    />
                    <Badge size="sm" variant="success">Online</Badge>
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Error
                </h4>
                <Label size="md" error="Please select a valid option">
                    <span className="label">Environment:</span>
                    <Select
                        size="md"
                        options={[
                            { value: 'dev', label: 'Development' },
                            { value: 'staging', label: 'Staging' },
                            { value: 'prod', label: 'Production' },
                        ]}
                        placeholder="Choose environment"
                    />
                </Label>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Different Sizes
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="xs">
                        <span className="label">Size:</span>
                        <Select
                            size="xs"
                            options={[
                                { value: 'xs', label: 'Extra Small' },
                                { value: 'sm', label: 'Small' },
                            ]}
                            placeholder="XS"
                        />
                    </Label>
                    <Label size="sm">
                        <span className="label">Size:</span>
                        <Select
                            size="sm"
                            options={[
                                { value: 'sm', label: 'Small' },
                                { value: 'md', label: 'Medium' },
                            ]}
                            placeholder="SM"
                        />
                    </Label>
                    <Label size="md">
                        <span className="label">Size:</span>
                        <Select
                            size="md"
                            options={[
                                { value: 'md', label: 'Medium' },
                                { value: 'lg', label: 'Large' },
                            ]}
                            placeholder="MD"
                        />
                    </Label>
                    <Label size="lg">
                        <span className="label">Size:</span>
                        <Select
                            size="lg"
                            options={[
                                { value: 'lg', label: 'Large' },
                                { value: 'xl', label: 'Extra Large' },
                            ]}
                            placeholder="LG"
                        />
                    </Label>
                    <Label size="xl">
                        <span className="label">Size:</span>
                        <Select
                            size="xl"
                            options={[
                                { value: 'xl', label: 'Extra Large' },
                                { value: 'xxl', label: 'XXL' },
                            ]}
                            placeholder="XL"
                        />
                    </Label>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'The Label component works seamlessly with the custom Select component. Add prefix labels, icon prefixes, badge suffixes, or show error states. **Important**: Match the Label `size` prop with the Select `size` prop for proper alignment.',
            },
        },
    },
};

/**
 * Advanced Label patterns pushing it to its limits with Select, Buttons, Icons, and Badges.
 */
export const AdvancedSelectPatterns: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: '500px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Action Button
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="folder" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'project-1', label: 'My Awesome Project' },
                            { value: 'project-2', label: 'Client Dashboard' },
                            { value: 'project-3', label: 'Personal Website' },
                        ]}
                        placeholder="Select project"
                    />
                    <Button size="xs" variant="ghost">
                        <Icon name="edit" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Multiple Actions
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="server" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'us-east-1', label: 'US East (N. Virginia)' },
                            { value: 'us-west-2', label: 'US West (Oregon)' },
                            { value: 'eu-west-1', label: 'EU (Ireland)' },
                        ]}
                        placeholder="Select region"
                    />
                    <Button size="xs" variant="ghost">
                        <Icon name="refresh" />
                    </Button>
                    <Button size="xs" variant="ghost">
                        <Icon name="settings-gear" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Select with Status Badge and Action
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="database" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'db-1', label: 'Production Database' },
                            { value: 'db-2', label: 'Staging Database' },
                            { value: 'db-3', label: 'Development Database' },
                        ]}
                        placeholder="Select database"
                    />
                    <Badge size="sm" variant="success">Live</Badge>
                    <Button size="xs" variant="ghost">
                        <Icon name="link-external" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Branch Selector (Git-like)
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="git-branch" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'main', label: 'main' },
                            { value: 'develop', label: 'develop' },
                            { value: 'feature/new-ui', label: 'feature/new-ui' },
                            { value: 'bugfix/auth', label: 'bugfix/auth' },
                        ]}
                        placeholder="Select branch"
                        defaultValue="main"
                    />
                    <Button size="xs" variant="ghost">
                        <Icon name="git-pull-request" />
                    </Button>
                    <Button size="xs" variant="ghost">
                        <Icon name="sync" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    API Endpoint Configuration
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="globe" />
                    </span>
                    <span className="label">https://api.</span>
                    <Select
                        size="md"
                        options={[
                            { value: 'prod', label: 'production' },
                            { value: 'staging', label: 'staging' },
                            { value: 'dev', label: 'development' },
                        ]}
                        placeholder="env"
                    />
                    <span className="label">.myapp.com/v1</span>
                    <Button size="xs" variant="ghost">
                        <Icon name="copy" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Deployment Target Selector
                </h4>
                <Label size="md">
                    <span className="label">Deploy to:</span>
                    <Select
                        size="md"
                        searchable
                        options={[
                            { value: 'prod-us', label: 'Production US', description: 'US Production Cluster' },
                            { value: 'prod-eu', label: 'Production EU', description: 'EU Production Cluster' },
                            { value: 'staging', label: 'Staging', description: 'Staging Environment' },
                        ]}
                        placeholder="Select target"
                    />
                    <Badge size="sm" variant="warning">2 pending</Badge>
                    <Button size="xs" variant="ghost">
                        <Icon name="rocket" />
                        <span style={{ marginLeft: 'var(--spacing-1)' }}>Deploy</span>
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Language Selector with Info
                </h4>
                <Label size="lg">
                    <span className="label">
                        <Icon name="code" />
                    </span>
                    <Select
                        size="lg"
                        options={[
                            { value: 'typescript', label: 'TypeScript' },
                            { value: 'javascript', label: 'JavaScript' },
                            { value: 'python', label: 'Python' },
                            { value: 'rust', label: 'Rust' },
                        ]}
                        placeholder="Choose language"
                    />
                    <Badge size="sm" variant="info">Pro</Badge>
                    <Button size="xs" variant="ghost">
                        <Icon name="info" />
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Team Member Selector with Quick Add
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="person" />
                    </span>
                    <Select
                        size="md"
                        searchable
                        options={[
                            { value: 'user-1', label: 'Alice Johnson' },
                            { value: 'user-2', label: 'Bob Smith' },
                            { value: 'user-3', label: 'Carol Williams' },
                        ]}
                        placeholder="Assign to..."
                    />
                    <Button size="xs" variant="ghost">
                        <Icon name="add" />
                        <span style={{ marginLeft: 'var(--spacing-1)' }}>Invite</span>
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    With Error State and Retry
                </h4>
                <Label size="md" error="Failed to load options. Click retry to try again.">
                    <span className="label">
                        <Icon name="warning" />
                    </span>
                    <Select
                        size="md"
                        options={[
                            { value: 'loading', label: 'Loading...', disabled: true },
                        ]}
                        placeholder="Select option"
                        disabled
                    />
                    <Button size="xs" variant="ghost">
                        <Icon name="refresh" />
                        <span style={{ marginLeft: 'var(--spacing-1)' }}>Retry</span>
                    </Button>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    The Ultimate Kitchen Sink
                </h4>
                <Label size="md">
                    <span className="label">
                        <Icon name="layers" />
                    </span>
                    <Select
                        size="md"
                        searchable
                        options={[
                            { value: '1', label: 'Option 1' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]}
                        placeholder="Everything at once"
                    />
                    <Badge size="sm" variant="success">Active</Badge>
                    <Button size="xs" variant="ghost">
                        <Icon name="eye" />
                    </Button>
                    <Button size="xs" variant="ghost">
                        <Icon name="edit" />
                    </Button>
                    <Button size="xs" variant="ghost">
                        <Icon name="trash" />
                    </Button>
                    <Button size="xs" variant="ghost">
                        <Icon name="chevron-right" />
                    </Button>
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: `🚀 **Pushing Label to its limits!** Advanced real-world patterns combining Select with buttons, icons, badges, and complex layouts. Perfect for configuration UIs, deployment tools, code editors, and admin panels. Notice how the Label gracefully handles multiple children while maintaining consistent styling and alignment.

⚠️ **Important Limitation**: The Label component uses the HTML \`<label>\` element, which has built-in browser behavior for form controls. When you hover over a label containing multiple interactive elements (like buttons), the browser may treat the hover as if you're hovering the *first* interactive child. This is due to the label's native "activation" behavior for form controls.

**Best Practices**:
- ✅ Use Label for simple patterns: prefix/suffix text + one form control
- ✅ Use Label with one or two simple elements (icon + input, select + badge)
- ⚠️ Be aware of hover quirks when adding multiple buttons
- ❌ For complex UIs with many buttons/actions, consider using a generic container (\`<div>\`) instead

The examples below demonstrate what's *possible*, but simpler patterns are recommended for production use.`,
            },
        },
    },
};

/**
 * TextArea variant with label elements on top and textarea below.
 */
export const TextAreaVariant: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '500px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    With Label Text on Top
                </h4>
                <Label variant="textarea" fullWidth>
                    <span className="label">Description</span>
                    <TextArea placeholder="Enter description..." rows={4} />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    With Icon and Text
                </h4>
                <Label variant="textarea" fullWidth>
                    <span className="label">
                        <Icon name="note" />
                        Comments
                    </span>
                    <TextArea placeholder="Enter your comments..." rows={6} />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    With Error
                </h4>
                <Label variant="textarea" fullWidth error="This field is required">
                    <span className="label">Feedback</span>
                    <TextArea placeholder="Your feedback..." rows={4} />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    With Icon, Text, and Badge (Badge pinned to right)
                </h4>
                <Label variant="textarea" fullWidth>
                    <span className="label">
                        <Icon name="mail" />
                        Message
                        <Badge variant="info" size="xs" style={{ marginLeft: 'auto' }}>Optional</Badge>
                    </span>
                    <TextArea placeholder="Type your message here..." rows={8} />
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Label Text After TextArea
                </h4>
                <Label variant="textarea" fullWidth>
                    <TextArea placeholder="Enter your code here..." rows={6} />
                    <span className="label">
                        <Icon name="info" />
                        Code will be formatted on save
                    </span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Different Row Heights
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label variant="textarea" fullWidth>
                        <span className="label">Short Response (2 rows)</span>
                        <TextArea placeholder="Brief answer..." rows={2} />
                    </Label>
                    <Label variant="textarea" fullWidth>
                        <span className="label">Standard Response (4 rows)</span>
                        <TextArea placeholder="Standard answer..." rows={4} />
                    </Label>
                    <Label variant="textarea" fullWidth>
                        <span className="label">Long Response (8 rows)</span>
                        <TextArea placeholder="Detailed answer..." rows={8} />
                    </Label>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `The TextArea variant uses vertical layout with label elements (text, icons, badges) on top and the textarea below. The entire component has a cohesive border and background.

**Key Features:**
- Vertical layout (label on top, textarea below)
- Supports multiple label elements in the header
- Icons and badges can be combined
- Error state with red border
- Full width option for forms

**Usage Pattern:**
\`\`\`tsx
<Label variant="textarea" fullWidth>
  <span className="label">
    <Icon name="note" />
    Label Text
  </span>
  <TextArea placeholder="..." rows={4} />
</Label>
\`\`\``,
            },
        },
    },
};

/**
 * Checkbox variant examples with checkboxes and switches.
 */
export const CheckboxVariant: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '400px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Basic Checkbox Labels
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="terms" />
                        <span>Accept terms and conditions</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="newsletter" />
                        <span>Subscribe to newsletter</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox defaultChecked name="remember" />
                        <span>Remember me</span>
                    </Label>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Switch Labels
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" name="dark-mode" />
                        <span>Dark mode</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" defaultChecked name="notifications" />
                        <span>Enable notifications</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" name="auto-save" />
                        <span>Auto-save changes</span>
                    </Label>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Different Sizes
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="xs">
                        <Checkbox size="xs" />
                        <span>Extra small label</span>
                    </Label>
                    <Label variant="checkbox" size="sm">
                        <Checkbox size="sm" />
                        <span>Small label</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox size="md" />
                        <span>Medium label (default)</span>
                    </Label>
                    <Label variant="checkbox" size="lg">
                        <Checkbox size="lg" />
                        <span>Large label</span>
                    </Label>
                    <Label variant="checkbox" size="xl">
                        <Checkbox size="xl" />
                        <span>Extra large label</span>
                    </Label>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Disabled State
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox disabled name="disabled-1" />
                        <span>Disabled checkbox</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox disabled checked name="disabled-2" />
                        <span>Disabled checked checkbox</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" disabled name="disabled-3" />
                        <span>Disabled switch</span>
                    </Label>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Multiline Label Text
                </h4>
                <Label variant="checkbox" size="md">
                    <Checkbox name="privacy" />
                    <span>
                        I have read and agree to the privacy policy, terms of service, and data processing agreement.
                        I understand that my data will be processed according to GDPR regulations.
                    </span>
                </Label>
            </div>

            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Styled Multiline Label Text
                </h4>
                <Label variant="checkbox" size="md" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 'var(--spacing-2)' }}>
                    <Checkbox name="privacy" />
                    <span>
                        I have read and agree to the <a href="#" style={{ color: 'var(--color-primary)' }}>privacy policy</a>, terms of service, and data processing agreement.
                        I understand that my data will be processed according to GDPR regulations.
                    </span>
                </Label>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: `Use \`variant="checkbox"\` for wrapping checkboxes, radio buttons, and switches. The checkbox variant provides:

- Simple flex layout with proper first-line alignment
- Font size that automatically scales with the size prop
- Automatic disabled state styling (cursor and opacity)
- Support for multiline label text

**Important**: Match the Label \`size\` prop with the Checkbox \`size\` prop for proper alignment.`,
            },
        },
    },
};

/**
 * Real-world checkbox form examples.
 */
export const CheckboxFormExamples: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '400px' }}>
            <div>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
                    Notification Preferences
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox defaultChecked name="email-notif" />
                        <span>Email notifications</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="push-notif" />
                        <span>Push notifications</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="sms-notif" />
                        <span>SMS notifications</span>
                    </Label>
                </div>
            </div>

            <div style={{ height: 'var(--border-width-1)', backgroundColor: 'var(--color-divider)' }} />

            <div>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
                    Display Settings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" defaultChecked name="dark-theme" />
                        <span>Dark mode</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" name="compact-mode" />
                        <span>Compact view</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" defaultChecked name="line-numbers" />
                        <span>Show line numbers</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox variant="switch" name="minimap" />
                        <span>Show minimap</span>
                    </Label>
                </div>
            </div>

            <div style={{ height: 'var(--border-width-1)', backgroundColor: 'var(--color-divider)' }} />

            <div>
                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
                    Privacy Consent
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="analytics" />
                        <span>Allow analytics cookies to help us improve the service</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox name="marketing" />
                        <span>Allow marketing cookies for personalized content</span>
                    </Label>
                    <Label variant="checkbox" size="md">
                        <Checkbox defaultChecked disabled name="necessary" />
                        <span>Necessary cookies (required for the site to function)</span>
                    </Label>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Real-world form examples using the checkbox variant: notification preferences, display settings, and privacy consent forms. Use checkboxes for multiple selections and switches for on/off toggles.',
            },
        },
    },
};

/**
 * Comprehensive showcase of all label features - the kitchen sink!
 */
export const Showcase: Story = {
    args: {
        children: undefined,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', padding: 'var(--spacing-4)', maxWidth: '700px' }}>
            {/* Size Progression */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    🎨 All Sizes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="xs">
                        <span className="label">$</span>
                        <Input size="xs" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                    <Label size="sm">
                        <span className="label">$</span>
                        <Input size="sm" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                    <Label size="md">
                        <span className="label">$</span>
                        <Input size="md" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                    <Label size="lg">
                        <span className="label">$</span>
                        <Input size="lg" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                    <Label size="xl">
                        <span className="label">$</span>
                        <Input size="xl" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                </div>
            </div>

            {/* Input Types */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    🎭 Input Types
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="md">
                        <span className="label">
                            <Icon name="mention" />
                        </span>
                        <Input size="md" type="email" placeholder="you@example.com" />
                    </Label>
                    <Label size="md">
                        <span className="label">
                            <Icon name="lock" />
                        </span>
                        <Input size="md" type="password" placeholder="Password" />
                    </Label>
                    <Label size="md">
                        <span className="label">#</span>
                        <Input size="md" type="number" placeholder="Enter a number" />
                    </Label>
                    <Label size="md">
                        <span className="label">+1</span>
                        <Input size="md" type="tel" placeholder="(555) 000-0000" />
                    </Label>
                </div>
            </div>

            {/* Icons & Badges */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    ⚡ Icons, Badges & More
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="md">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="md" type="text" placeholder="Search" />
                        <span className="label" style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            opacity: 0.7
                        }}>
                            ⌘K
                        </span>
                    </Label>
                    <Label size="md">
                        <span className="label">
                            <Icon name="key" />
                        </span>
                        <Input size="md" type="password" placeholder="API Key" />
                        <Badge size="sm" variant="success">Active</Badge>
                    </Label>
                    <Label size="md">
                        <Input size="md" type="text" placeholder="Premium feature" />
                        <Badge size="sm" variant="info">Pro</Badge>
                    </Label>
                </div>
            </div>

            {/* Complex Combinations */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    🎪 Complex Patterns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="md">
                        <span className="label">https://</span>
                        <Input size="md" placeholder="example" />
                        <span className="label">.com</span>
                        <span className="label">/api</span>
                    </Label>
                    <Label size="md">
                        <span className="label">@</span>
                        <Input size="md" placeholder="username" />
                        <span className="label">
                            <Icon name="info" size="sm" />
                        </span>
                    </Label>
                    <Label size="md">
                        <span className="label">
                            <Icon name="calendar" />
                        </span>
                        <Input size="md" type="date" />
                        <span className="label">→</span>
                        <span className="label">
                            <Icon name="watch" />
                        </span>
                        <Input size="md" type="time" />
                    </Label>
                </div>
            </div>

            {/* Error States */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    🚨 Error States
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="md" error="This field is required">
                        <Input size="md" placeholder="Required field" />
                    </Label>
                    <Label size="md" error="Please enter a valid email">
                        <span className="label">
                            <Icon name="mail" />
                        </span>
                        <Input size="md" type="email" placeholder="you@example.com" />
                    </Label>
                    <Label size="md" error="Price must be greater than 0">
                        <span className="label">$</span>
                        <Input size="md" type="number" placeholder="0.00" />
                        <span className="label">USD</span>
                    </Label>
                </div>
            </div>

            {/* Full Width Examples */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    📏 Full Width
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label fullWidth size="md">
                        <span className="label">https://</span>
                        <Input size="md" placeholder="yourawesomeproject.com" fullWidth />
                    </Label>
                    <Label fullWidth size="md">
                        <span className="label">
                            <Icon name="search" />
                        </span>
                        <Input size="md" placeholder="Search across all projects..." fullWidth />
                        <Badge size="sm" variant="warning">Beta</Badge>
                    </Label>
                </div>
            </div>

            {/* Creative Combinations */}
            <div>
                <h3 style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                    🎨 Creative Use Cases
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Label size="md">
                        <span className="label">+1</span>
                        <Input size="md" type="tel" placeholder="(555) 000-0000" />
                        <Badge size="sm" variant="success">Verified</Badge>
                    </Label>
                    <Label size="md">
                        <Input size="md" type="text" placeholder="Product weight" />
                        <span className="label">kg</span>
                        <span className="label">≈</span>
                        <span className="label">2.2 lbs</span>
                    </Label>
                    <Label size="md">
                        <span className="label">€</span>
                        <Input size="md" type="number" placeholder="100" />
                        <span className="label">→</span>
                        <span className="label">$</span>
                        <span className="label">110</span>
                    </Label>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: '🎉 **The Kitchen Sink!** Every possible Label combination in one place: all sizes, variants, icons, badges, keyboard shortcuts, errors, complex patterns, and creative use cases. This showcase demonstrates the full flexibility and power of the Label component.',
            },
        },
    },
};

