import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { Icon } from '../Icon';

const meta = {
    title: 'Components/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A categorization and labeling component with a rounded-rectangle shape. Use Tag for categorization, filtering, and content labeling. For status indication use Badge instead.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
            description: 'Visual variant of the tag',
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the tag',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        outline: {
            control: 'boolean',
            description: 'Whether to render the tag with an outline style',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all tag properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
    args: {
        variant: 'default',
        size: 'md',
        outline: false,
        children: 'Tag',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all tag properties. Try different combinations using the controls below.',
            },
        },
    },
};

/**
 * All available tag variants displayed side-by-side for comparison.
 */
export const Variants: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag variant="default">Default</Tag>
            <Tag variant="primary">Primary</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
            <Tag variant="info">Info</Tag>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tag variants for different contexts: **Default** (neutral), **Primary** (brand), **Secondary** (subtle), **Success** (positive), **Warning** (caution), **Error** (negative), **Info** (informational).',
            },
        },
    },
};

/**
 * All available tag sizes from extra small to extra large.
 */
export const Sizes: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag size="xs">Extra Small</Tag>
            <Tag size="sm">Small</Tag>
            <Tag size="md">Medium</Tag>
            <Tag size="lg">Large</Tag>
            <Tag size="xl">Extra Large</Tag>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. All sizes work with any variant.',
            },
        },
    },
};

/**
 * Outline style variants with transparent backgrounds and colored borders.
 */
export const OutlineVariants: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag variant="default" outline>Default</Tag>
            <Tag variant="primary" outline>Primary</Tag>
            <Tag variant="secondary" outline>Secondary</Tag>
            <Tag variant="success" outline>Success</Tag>
            <Tag variant="warning" outline>Warning</Tag>
            <Tag variant="error" outline>Error</Tag>
            <Tag variant="info" outline>Info</Tag>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Outline tags have transparent backgrounds with colored borders, providing a lighter visual weight.',
            },
        },
    },
};

/**
 * Tags with icons for enhanced visual communication.
 */
export const WithIcons: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Icon + Text
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="primary">
                        <Icon name="symbol-class" />
                        React
                    </Tag>
                    <Tag variant="info">
                        <Icon name="code" />
                        TypeScript
                    </Tag>
                    <Tag variant="success">
                        <Icon name="check" />
                        Approved
                    </Tag>
                    <Tag variant="warning">
                        <Icon name="warning" />
                        Draft
                    </Tag>
                    <Tag variant="error">
                        <Icon name="error" />
                        Deprecated
                    </Tag>
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Icons Scale with Tag Size
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="primary" size="xs">
                        <Icon name="tag" />
                        XS Tag
                    </Tag>
                    <Tag variant="primary" size="sm">
                        <Icon name="tag" />
                        SM Tag
                    </Tag>
                    <Tag variant="primary" size="md">
                        <Icon name="tag" />
                        MD Tag
                    </Tag>
                    <Tag variant="primary" size="lg">
                        <Icon name="tag" />
                        LG Tag
                    </Tag>
                    <Tag variant="primary" size="xl">
                        <Icon name="tag" />
                        XL Tag
                    </Tag>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tags support Codicons for enhanced visual communication. Icons automatically scale with the tag size and respect the tag color.',
            },
        },
    },
};

/**
 * Common usage patterns for categorization and labeling.
 */
export const UsageExamples: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Technology Stack
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap' }}>
                    <Tag variant="primary" size="sm">React</Tag>
                    <Tag variant="primary" size="sm">TypeScript</Tag>
                    <Tag variant="primary" size="sm">Vite</Tag>
                    <Tag variant="primary" size="sm">vanilla-extract</Tag>
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Content Categories
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap' }}>
                    <Tag variant="default" size="sm">Design System</Tag>
                    <Tag variant="default" size="sm">UI Components</Tag>
                    <Tag variant="default" size="sm">Open Source</Tag>
                    <Tag variant="default" size="sm">VSCode</Tag>
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Version Labels
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="success" size="sm">v2.0.0</Tag>
                    <Tag variant="info" size="sm" outline>stable</Tag>
                    <Tag variant="warning" size="sm" outline>beta</Tag>
                    <Tag variant="error" size="sm" outline>deprecated</Tag>
                </div>
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Priority Labels
                </h4>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="error">
                        <Icon name="flame" />
                        Critical
                    </Tag>
                    <Tag variant="warning">
                        <Icon name="arrow-up" />
                        High
                    </Tag>
                    <Tag variant="info">
                        <Icon name="dash" />
                        Medium
                    </Tag>
                    <Tag variant="secondary">
                        <Icon name="arrow-down" />
                        Low
                    </Tag>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common usage patterns: technology stacks, content categories, version labels, and priority indicators.',
            },
        },
    },
};

/**
 * Comprehensive showcase of all tag variants, sizes, and styles.
 */
export const Showcase: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)' }}>
            {/* Filled Tags - All Variants */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Filled Tags
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="default">Default</Tag>
                    <Tag variant="primary">Primary</Tag>
                    <Tag variant="secondary">Secondary</Tag>
                    <Tag variant="success">Success</Tag>
                    <Tag variant="warning">Warning</Tag>
                    <Tag variant="error">Error</Tag>
                    <Tag variant="info">Info</Tag>
                </div>
            </div>

            {/* Outline Tags - All Variants */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Outline Tags
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="default" outline>Default</Tag>
                    <Tag variant="primary" outline>Primary</Tag>
                    <Tag variant="secondary" outline>Secondary</Tag>
                    <Tag variant="success" outline>Success</Tag>
                    <Tag variant="warning" outline>Warning</Tag>
                    <Tag variant="error" outline>Error</Tag>
                    <Tag variant="info" outline>Info</Tag>
                </div>
            </div>

            {/* All Sizes (Primary Variant) */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    All Sizes (Primary Variant)
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="primary" size="xs">XS</Tag>
                    <Tag variant="primary" size="sm">SM</Tag>
                    <Tag variant="primary" size="md">MD</Tag>
                    <Tag variant="primary" size="lg">LG</Tag>
                    <Tag variant="primary" size="xl">XL</Tag>
                </div>
            </div>

            {/* All Sizes Outline (Error Variant) */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    All Sizes Outline (Error Variant)
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="error" outline size="xs">XS</Tag>
                    <Tag variant="error" outline size="sm">SM</Tag>
                    <Tag variant="error" outline size="md">MD</Tag>
                    <Tag variant="error" outline size="lg">LG</Tag>
                    <Tag variant="error" outline size="xl">XL</Tag>
                </div>
            </div>

            {/* With Icons */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    With Icons
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="primary">
                        <Icon name="symbol-class" />
                        React
                    </Tag>
                    <Tag variant="info">
                        <Icon name="code" />
                        TypeScript
                    </Tag>
                    <Tag variant="success">
                        <Icon name="check" />
                        Approved
                    </Tag>
                    <Tag variant="warning">
                        <Icon name="warning" />
                        Draft
                    </Tag>
                    <Tag variant="error">
                        <Icon name="error" />
                        Deprecated
                    </Tag>
                </div>
            </div>

            {/* Mixed Combinations */}
            <div>
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Mixed Combinations
                </h3>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag variant="primary" size="xs">XS Primary</Tag>
                    <Tag variant="warning" size="sm" outline>SM Warning</Tag>
                    <Tag variant="error" size="md">
                        <Icon name="bug" />
                        MD Error
                    </Tag>
                    <Tag variant="info" size="lg" outline>
                        <Icon name="info" />
                        LG Info
                    </Tag>
                    <Tag variant="secondary" size="xl">XL Secondary</Tag>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Comprehensive showcase demonstrating all tag capabilities: variants (including primary and secondary), sizes, outline styles, and icon support. Use this as a reference for all available combinations.',
            },
        },
    },
};
