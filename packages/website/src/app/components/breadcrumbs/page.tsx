'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Icon, Heading } from 'baukasten-ui/core';
import { Breadcrumbs } from 'baukasten-ui/extra';
import type { BreadcrumbItem } from 'baukasten-ui/extra';

const breadcrumbsProps: PropDefinition[] = [
    {
        name: 'items',
        type: 'BreadcrumbItem[]',
        required: true,
        description: 'Array of breadcrumb items to display',
    },
    {
        name: 'variant',
        type: '"default" | "pill"',
        default: '"default"',
        description: 'Visual variant of the breadcrumbs',
    },
    {
        name: 'separator',
        type: 'React.ReactNode',
        default: '"/"',
        description: 'Custom separator between breadcrumb items (can be text or icon)',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the breadcrumbs',
    },
    {
        name: 'maxItems',
        type: 'number',
        description: 'Maximum number of items to display. When exceeded, middle items will be collapsed with an ellipsis',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
    {
        name: 'ariaLabel',
        type: 'string',
        default: '"Breadcrumb"',
        description: 'Aria label for accessibility',
    },
];

const breadcrumbItemProps: PropDefinition[] = [
    {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Display text for the breadcrumb item',
    },
    {
        name: 'href',
        type: 'string',
        description: 'Optional href for navigation. If provided, the item will be rendered as a clickable link',
    },
    {
        name: 'onClick',
        type: '(event: React.MouseEvent) => void',
        description: 'Optional click handler',
    },
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Optional icon element to display before the label',
    },
];

const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
];

const fileSystemItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <Icon name="home" /> },
    { label: 'workspace', href: '/workspace', icon: <Icon name="folder" /> },
    { label: 'src', href: '/workspace/src', icon: <Icon name="folder-opened" /> },
    { label: 'components', href: '/workspace/src/components', icon: <Icon name="folder-opened" /> },
    { label: 'Breadcrumbs.tsx', icon: <Icon name="file-code" /> },
];

const longPath: BreadcrumbItem[] = [
    { label: 'Root', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Web Development', href: '/projects/web' },
    { label: 'React Apps', href: '/projects/web/react' },
    { label: 'Components', href: '/projects/web/react/components' },
    { label: 'UI Library', href: '/projects/web/react/components/ui' },
    { label: 'Breadcrumbs' },
];

// File Browser Example Component
function FileBrowserExample() {
    const [currentPath, setCurrentPath] = useState(['Home', 'workspace', 'src', 'components', 'Breadcrumbs.tsx']);

    const items: BreadcrumbItem[] = currentPath.map((label, index) => {
        const getIcon = (name: string) => {
            const iconMap: Record<string, any> = {
                'Home': 'home',
                'workspace': 'folder',
                'src': 'folder-opened',
                'components': 'folder-opened',
                'Breadcrumbs.tsx': 'file-code',
            };
            return iconMap[name] || 'folder';
        };

        return {
            label,
            icon: <Icon name={getIcon(label) as any} />,
            onClick: () => {
                if (index < currentPath.length - 1) {
                    setCurrentPath(currentPath.slice(0, index + 1));
                }
            },
        };
    });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-4)',
            padding: 'var(--bk-spacing-5)',
            backgroundColor: 'var(--vscode-textBlockQuote-background)',
            borderRadius: 'var(--bk-radius-md)',
            minWidth: '500px',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'var(--bk-spacing-3)',
                borderBottom: '1px solid var(--vscode-panel-border)',
            }}>
                <Heading level={4} style={{ margin: 0 }}>File Explorer</Heading>
            </div>

            <Breadcrumbs
                items={items}
                separator={<Icon name="chevron-right" />}
            />

            <div style={{
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-input-background)',
                borderRadius: 'var(--bk-radius-sm)',
                fontSize: 'var(--bk-font-size-sm)',
                color: 'var(--vscode-descriptionForeground)',
            }}>
                Click any breadcrumb to navigate back to that location
            </div>
        </div>
    );
}

export default function BreadcrumbsPage() {
    return (
        <PageLayout
            title="Breadcrumbs"
            description="A navigation component that shows the user's current location within the application hierarchy. Supports custom separators, sizing, icons, and automatic item collapsing for long paths."
        >
            <Showcase
                title="Basic Usage"
                description="Breadcrumbs display a hierarchical navigation path. Each item has a label and can optionally have an href for navigation. The last item (current page) is not clickable by default."
                preview={
                    <div style={{ minWidth: '400px' }}>
                        <Breadcrumbs items={basicItems} />
                    </div>
                }
                code={`import { Breadcrumbs } from 'baukasten-ui/extra';
import type { BreadcrumbItem } from 'baukasten-ui/extra';

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops' },
];

function App() {
  return <Breadcrumbs items={items} />;
}`}
                props={breadcrumbsProps}
            />

            <Showcase
                title="Variants"
                description="Two visual variants are available: default (minimal text links) and pill (rounded background badges). The pill variant provides more visual prominence."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Default Variant
                            </div>
                            <Breadcrumbs
                                variant="default"
                                items={basicItems}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Pill Variant
                            </div>
                            <Breadcrumbs
                                variant="pill"
                                items={basicItems}
                            />
                        </div>
                    </div>
                }
                code={`// Default variant (minimal)
<Breadcrumbs
  variant="default"
  items={items}
/>

// Pill variant (with background)
<Breadcrumbs
  variant="pill"
  items={items}
/>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options are available: xs, sm, md (default), lg, and xl. Choose the size that best fits your UI hierarchy."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-1)' }}>
                                <div style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                                    {size.toUpperCase()}{size === 'md' ? ' (default)' : ''}
                                </div>
                                <Breadcrumbs
                                    size={size}
                                    items={[
                                        { label: 'Home', href: '/' },
                                        { label: 'Products', href: '/products' },
                                        { label: 'Details' },
                                    ]}
                                />
                            </div>
                        ))}
                    </div>
                }
                code={`<Breadcrumbs size="xs" items={items} />
<Breadcrumbs size="sm" items={items} />
<Breadcrumbs size="md" items={items} /> {/* default */}
<Breadcrumbs size="lg" items={items} />
<Breadcrumbs size="xl" items={items} />`}
            />

            <Showcase
                title="Custom Separators"
                description="Customize the separator between breadcrumb items. You can use text, symbols, or icon components."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Default (/)
                            </div>
                            <Breadcrumbs separator="/" items={basicItems} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Greater Than (›)
                            </div>
                            <Breadcrumbs separator="›" items={basicItems} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Arrow (→)
                            </div>
                            <Breadcrumbs separator="→" items={basicItems} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Chevron Icon
                            </div>
                            <Breadcrumbs separator={<Icon name="chevron-right" />} items={basicItems} />
                        </div>
                    </div>
                }
                code={`// Text separators
<Breadcrumbs separator="/" items={items} />
<Breadcrumbs separator="›" items={items} />
<Breadcrumbs separator="→" items={items} />

// Icon separator
<Breadcrumbs 
  separator={<Icon name="chevron-right" />} 
  items={items} 
/>`}
            />

            <Showcase
                title="With Icons"
                description="Add icons to breadcrumb items for better visual recognition. Icons are displayed before the label text and are particularly useful for file system navigation or categorized content."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <Breadcrumbs
                            items={[
                                { label: 'Home', href: '/', icon: <Icon name="home" /> },
                                { label: 'Projects', href: '/projects', icon: <Icon name="folder" /> },
                                { label: 'Settings', icon: <Icon name="settings-gear" /> },
                            ]}
                        />
                        <Breadcrumbs
                            separator={<Icon name="chevron-right" />}
                            items={fileSystemItems}
                        />
                    </div>
                }
                code={`const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <Icon name="home" /> },
  { label: 'workspace', href: '/workspace', icon: <Icon name="folder" /> },
  { label: 'src', href: '/workspace/src', icon: <Icon name="folder-opened" /> },
  { label: 'components', icon: <Icon name="folder-opened" /> },
  { label: 'Breadcrumbs.tsx', icon: <Icon name="file-code" /> },
];

<Breadcrumbs
  separator={<Icon name="chevron-right" />}
  items={items}
/>`}
            />

            <Showcase
                title="Collapsed Items"
                description="Use maxItems to collapse long breadcrumb paths. Middle items are replaced with an ellipsis (...), showing the first item and the last N-1 items. This is useful for deep hierarchies to prevent horizontal overflow."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)', width: '100%' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Full Path (7 items)
                            </div>
                            <Breadcrumbs items={longPath} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)', width: '100%' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Collapsed to 4 items
                            </div>
                            <Breadcrumbs items={longPath} maxItems={4} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)', width: '100%' }}>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Collapsed to 3 items
                            </div>
                            <Breadcrumbs items={longPath} maxItems={3} />
                        </div>
                    </div>
                }
                code={`const longPath: BreadcrumbItem[] = [
  { label: 'Root', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Web Development', href: '/projects/web' },
  { label: 'React Apps', href: '/projects/web/react' },
  { label: 'Components', href: '/projects/web/react/components' },
  { label: 'UI Library', href: '/projects/web/react/components/ui' },
  { label: 'Breadcrumbs' },
];

// Full path
<Breadcrumbs items={longPath} />

// Show first item + last 3 items
<Breadcrumbs items={longPath} maxItems={4} />

// Show first item + last 2 items
<Breadcrumbs items={longPath} maxItems={3} />`}
            />

            <Showcase
                title="With Click Handlers"
                description="Use onClick handlers for client-side routing (e.g., React Router, Next.js). Click handlers work whether or not an href is provided."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)', minWidth: '400px' }}>
                        {(() => {
                            const [lastClicked, setLastClicked] = useState<string>('');

                            const items: BreadcrumbItem[] = [
                                {
                                    label: 'Dashboard',
                                    onClick: () => setLastClicked('Dashboard')
                                },
                                {
                                    label: 'Projects',
                                    onClick: () => setLastClicked('Projects')
                                },
                                {
                                    label: 'Settings',
                                    onClick: () => setLastClicked('Settings')
                                },
                                { label: 'Profile' },
                            ];

                            return (
                                <>
                                    <Breadcrumbs items={items} />
                                    {lastClicked && (
                                        <div style={{
                                            padding: 'var(--bk-spacing-3)',
                                            backgroundColor: 'var(--vscode-input-background)',
                                            borderRadius: 'var(--bk-radius-sm)',
                                            fontSize: 'var(--bk-font-size-sm)',
                                        }}>
                                            Last clicked: <strong>{lastClicked}</strong>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                }
                code={`import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Profile');

  const items: BreadcrumbItem[] = [
    { 
      label: 'Dashboard', 
      onClick: () => setCurrentPage('Dashboard')
    },
    { 
      label: 'Projects', 
      onClick: () => setCurrentPage('Projects')
    },
    { 
      label: 'Settings', 
      onClick: () => setCurrentPage('Settings')
    },
    { label: 'Profile' },
  ];

  return <Breadcrumbs items={items} />;
}`}
            />

            <Showcase
                title="Pill Variant with Icons"
                description="Combine the pill variant with icons and custom separators for a more prominent navigation display. Great for modern app interfaces."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <Breadcrumbs
                            variant="pill"
                            separator={<Icon name="chevron-right" />}
                            items={[
                                { label: 'Home', href: '/', icon: <Icon name="home" /> },
                                { label: 'Documents', href: '/docs', icon: <Icon name="file" /> },
                                { label: 'Projects', href: '/docs/projects', icon: <Icon name="folder" /> },
                                { label: 'README.md', icon: <Icon name="markdown" /> },
                            ]}
                        />
                    </div>
                }
                code={`<Breadcrumbs
  variant="pill"
  separator={<Icon name="chevron-right" />}
  items={[
    { label: 'Home', href: '/', icon: <Icon name="home" /> },
    { label: 'Documents', href: '/docs', icon: <Icon name="file" /> },
    { label: 'Projects', href: '/docs/projects', icon: <Icon name="folder" /> },
    { label: 'README.md', icon: <Icon name="markdown" /> },
  ]}
/>`}
            />

            <Showcase
                title="Interactive File Browser"
                description="Real-world example showing breadcrumbs in a file browser interface with click navigation. Click any breadcrumb to navigate to that level."
                preview={<FileBrowserExample />}
                code={`import { useState } from 'react';
import { Icon } from 'baukasten-ui/core';
import { Breadcrumbs } from 'baukasten-ui/extra';

function FileBrowser() {
  const [currentPath, setCurrentPath] = useState([
    'Home', 'workspace', 'src', 'components', 'Breadcrumbs.tsx'
  ]);

  const items: BreadcrumbItem[] = currentPath.map((label, index) => {
    const icons: Record<string, string> = {
      Home: 'home',
      workspace: 'folder',
      src: 'folder-opened',
      components: 'folder-opened',
      'Breadcrumbs.tsx': 'file-code',
    };

    return {
      label,
      icon: <Icon name={icons[label] || 'folder'} />,
      onClick: () => {
        // Navigate back to clicked level
        if (index < currentPath.length - 1) {
          setCurrentPath(currentPath.slice(0, index + 1));
        }
      },
    };
  });

  return (
    <div>
      <h4>File Explorer</h4>
      <Breadcrumbs
        items={items}
        separator={<Icon name="chevron-right" />}
      />
    </div>
  );
}`}
                props={[
                    ...breadcrumbsProps,
                    { name: '---', type: '---', description: 'BreadcrumbItem Interface:' },
                    ...breadcrumbItemProps,
                ]}
            />

            <div style={{
                marginTop: 'var(--bk-spacing-6)',
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
            }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{
                    fontSize: 'var(--bk-font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--bk-spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Uses semantic HTML with <code>&lt;nav&gt;</code> and <code>&lt;ol&gt;</code> elements
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Includes <code>aria-label</code> on the navigation (default: "Breadcrumb")
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Current page marked with <code>aria-current="page"</code>
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Separators are marked with <code>aria-hidden="true"</code> to prevent announcement
                    </li>
                    <li>
                        Links and buttons are keyboard accessible and support standard navigation
                    </li>
                </ul>
            </div>

            <div style={{
                marginTop: 'var(--bk-spacing-6)',
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
            }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Behavior Notes
                </Heading>
                <ul style={{
                    fontSize: 'var(--bk-font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--bk-spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        The last item (current page) is rendered as plain text by default
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Items with <code>href</code> are rendered as <code>&lt;a&gt;</code> links
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Items with only <code>onClick</code> (no href) are rendered as <code>&lt;button&gt;</code> elements
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        When using <code>maxItems</code>, the first item and last N-1 items are always shown
                    </li>
                    <li>
                        The ellipsis (...) represents collapsed items and is not interactive
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
