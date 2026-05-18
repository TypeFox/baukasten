import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tree, type TreeNodeData, type TreeEdgeStyle } from './';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Badge } from '../Badge';
import { Tooltip } from '../Tooltip';
import { Heading, Paragraph, Text } from '../Typography';

const meta = {
    title: 'Components/Tree',
    component: Tree,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A hierarchical tree view component with expandable nodes, guide edge lines, keyboard navigation, icons, badges, and full ARIA support. Suitable for file explorers, settings hierarchies, navigation trees, and more.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of tree items',
            table: { defaultValue: { summary: 'md' } },
        },
        edgeStyle: {
            control: 'select',
            options: ['none', 'solid', 'dashed', 'dotted'],
            description: 'Style of guide lines between parent and child',
            table: { defaultValue: { summary: 'none' } },
        },
        indentSize: {
            control: { type: 'range', min: 8, max: 40, step: 4 },
            description: 'Indentation per level in pixels',
            table: { defaultValue: { summary: '20' } },
        },
        selectable: {
            control: 'boolean',
            description: 'Whether nodes can be selected',
            table: { defaultValue: { summary: 'true' } },
        },
        expandOnClick: {
            control: 'boolean',
            description: 'Whether clicking the row toggles expansion',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample data ─────────────────────────────────────────────────────────────

const fileTreeNodes: TreeNodeData[] = [
    {
        id: 'src',
        label: 'src',
        icon: <Icon name="folder" />,
        children: [
            {
                id: 'src/components',
                label: 'components',
                icon: <Icon name="folder" />,
                children: [
                    {
                        id: 'src/components/Button.tsx',
                        label: 'Button.tsx',
                        icon: <Icon name="file" />,
                    },
                    {
                        id: 'src/components/Input.tsx',
                        label: 'Input.tsx',
                        icon: <Icon name="file" />,
                    },
                    {
                        id: 'src/components/Modal.tsx',
                        label: 'Modal.tsx',
                        icon: <Icon name="file" />,
                    },
                ],
            },
            {
                id: 'src/styles',
                label: 'styles',
                icon: <Icon name="folder" />,
                children: [
                    {
                        id: 'src/styles/tokens.ts',
                        label: 'tokens.ts',
                        icon: <Icon name="file" />,
                    },
                    {
                        id: 'src/styles/global.css',
                        label: 'global.css',
                        icon: <Icon name="file" />,
                    },
                ],
            },
            {
                id: 'src/index.ts',
                label: 'index.ts',
                icon: <Icon name="file" />,
            },
            {
                id: 'src/App.tsx',
                label: 'App.tsx',
                icon: <Icon name="file" />,
            },
        ],
    },
    {
        id: 'package.json',
        label: 'package.json',
        icon: <Icon name="file" />,
    },
    {
        id: 'tsconfig.json',
        label: 'tsconfig.json',
        icon: <Icon name="file" />,
    },
    {
        id: 'README.md',
        label: 'README.md',
        icon: <Icon name="file" />,
    },
];

const settingsNodes: TreeNodeData[] = [
    {
        id: 'general',
        label: 'General',
        icon: <Icon name="gear" />,
        children: [
            { id: 'general/language', label: 'Language', icon: <Icon name="globe" /> },
            {
                id: 'general/theme',
                label: 'Theme',
                icon: <Icon name="symbol-color" />,
                badge: <Badge variant="info" size="sm">New</Badge>,
            },
            {
                id: 'general/font',
                label: 'Font',
                icon: <Icon name="text-size" />,
            },
        ],
    },
    {
        id: 'editor',
        label: 'Editor',
        icon: <Icon name="edit" />,
        children: [
            { id: 'editor/tab-size', label: 'Tab Size', icon: <Icon name="whitespace" /> },
            {
                id: 'editor/word-wrap',
                label: 'Word Wrap',
                icon: <Icon name="word-wrap" />,
            },
            {
                id: 'editor/minimap',
                label: 'Minimap',
                icon: <Icon name="preview" />,
                disabled: true,
            },
            {
                id: 'editor/formatting',
                label: 'Formatting',
                icon: <Icon name="list-ordered" />,
                children: [
                    {
                        id: 'editor/formatting/on-save',
                        label: 'Format On Save',
                    },
                    {
                        id: 'editor/formatting/on-paste',
                        label: 'Format On Paste',
                    },
                    {
                        id: 'editor/formatting/on-type',
                        label: 'Format On Type',
                    },
                ],
            },
        ],
    },
    {
        id: 'extensions',
        label: 'Extensions',
        icon: <Icon name="extensions" />,
        badge: <Badge variant="default" size="sm">12</Badge>,
        children: [
            { id: 'ext/eslint', label: 'ESLint', icon: <Icon name="check" /> },
            { id: 'ext/prettier', label: 'Prettier', icon: <Icon name="check" /> },
            {
                id: 'ext/gitlens',
                label: 'GitLens',
                icon: <Icon name="git-merge" />,
                badge: <Badge variant="warning" size="sm">Update</Badge>,
            },
        ],
    },
    {
        id: 'security',
        label: 'Security',
        icon: <Icon name="shield" />,
        disabled: true,
        children: [
            { id: 'security/auth', label: 'Authentication' },
            { id: 'security/permissions', label: 'Permissions' },
        ],
    },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

/**
 * Interactive playground with all tree properties exposed.
 */
export const Interactive: Story = {
    render: (args) => (
        <Tree
            {...args}
            nodes={fileTreeNodes}
            defaultExpandedKeys={['src', 'src/components']}
            style={{ width: '350px' }}
        />
    ),
    args: {
        size: 'md',
        edgeStyle: 'none',
        indentSize: 20,
        selectable: true,
        expandOnClick: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all tree properties. Use the controls to experiment with different sizes, edge styles, and behaviours.',
            },
        },
    },
};

/**
 * Basic file explorer tree with icons and default expansion.
 */
export const FileExplorer: Story = {
    render: () => (
        <Tree
            nodes={fileTreeNodes}
            defaultExpandedKeys={['src', 'src/components']}
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'A typical file explorer layout with folder and file icons. Nodes can be expanded by clicking.',
            },
        },
    },
};

/**
 * Tree with solid guide lines connecting parent and child nodes.
 */
export const WithSolidEdges: Story = {
    render: () => (
        <Tree
            nodes={fileTreeNodes}
            edgeStyle="solid"
            defaultExpandedKeys={['src', 'src/components', 'src/styles']}
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Solid guide lines between parent and child nodes for clear visual hierarchy.',
            },
        },
    },
};

/**
 * Tree with dashed guide lines.
 */
export const WithDashedEdges: Story = {
    render: () => (
        <Tree
            nodes={fileTreeNodes}
            edgeStyle="dashed"
            defaultExpandedKeys={['src', 'src/components', 'src/styles']}
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dashed guide lines for a lighter visual style.',
            },
        },
    },
};

/**
 * Tree with dotted guide lines.
 */
export const WithDottedEdges: Story = {
    render: () => (
        <Tree
            nodes={fileTreeNodes}
            edgeStyle="dotted"
            defaultExpandedKeys={['src', 'src/components', 'src/styles']}
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dotted guide lines for a subtle visual connector.',
            },
        },
    },
};

/**
 * Settings tree with badges, disabled nodes, and nested levels.
 */
export const SettingsTree: Story = {
    render: () => (
        <Tree
            nodes={settingsNodes}
            defaultExpandedKeys={['general', 'editor', 'editor/formatting']}
            edgeStyle="solid"
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'A settings panel tree demonstrating badges on nodes, disabled state, and multi-level nesting.',
            },
        },
    },
};

/**
 * Controlled expansion and selection.
 */
export const Controlled: Story = {
    render: () => {
        const [expandedKeys, setExpandedKeys] = useState<string[]>(['src']);
        const [selectedKey, setSelectedKey] = useState<string | null>(null);

        return (
            <div style={{ display: 'flex', gap: 'var(--bk-gap-xl)' }}>
                <Tree
                    nodes={fileTreeNodes}
                    expandedKeys={expandedKeys}
                    onExpandChange={(keys) => setExpandedKeys(keys)}
                    selectedKey={selectedKey}
                    onSelect={(key) => setSelectedKey(key)}
                    style={{ width: '300px' }}
                />
                <div style={{ minWidth: '200px' }}>
                    <Heading level={5} marginBottom>State</Heading>
                    <Text size="sm" color="muted" block>
                        Selected: {selectedKey ?? '(none)'}
                    </Text>
                    <Text size="sm" color="muted" block style={{ marginTop: 'var(--bk-spacing-2)' }}>
                        Expanded: {expandedKeys.length > 0 ? expandedKeys.join(', ') : '(none)'}
                    </Text>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Fully controlled tree with external state for expanded keys and selected key. The state panel on the right shows current values.',
            },
        },
    },
};

/**
 * Custom expand icon using a render function.
 */
export const CustomExpandIcon: Story = {
    render: () => (
        <Tree
            nodes={fileTreeNodes}
            defaultExpandedKeys={['src', 'src/components']}
            expandIcon={({ expanded, hasChildren }) => {
                if (!hasChildren) return <Icon name="dash" />;
                return expanded ? <Icon name="fold-down" /> : <Icon name="fold" />;
            }}
            style={{ width: '350px' }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Custom expand/collapse icons via the `expandIcon` render prop. Here we use fold/unfold icons instead of the default chevron.',
            },
        },
    },
};

/**
 * Tree at different sizes.
 */
export const Sizes: Story = {
    render: () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
        return (
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', flexWrap: 'wrap' }}>
                {sizes.map((size) => (
                    <div key={size}>
                        <Heading level={5} marginBottom>
                            {size.toUpperCase()}
                        </Heading>
                        <Tree
                            nodes={[
                                {
                                    id: `${size}-root`,
                                    label: 'Root',
                                    icon: <Icon name="folder" />,
                                    children: [
                                        { id: `${size}-a`, label: 'Child A', icon: <Icon name="file" /> },
                                        { id: `${size}-b`, label: 'Child B', icon: <Icon name="file" /> },
                                    ],
                                },
                            ]}
                            size={size}
                            defaultExpandedKeys={[`${size}-root`]}
                            style={{ width: '220px' }}
                        />
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'All available sizes from xs to xl, matching the component sizing system used across baukasten.',
            },
        },
    },
};

/**
 * Edge style comparison side by side.
 */
export const EdgeStyleComparison: Story = {
    render: () => {
        const styles: TreeEdgeStyle[] = ['none', 'solid', 'dashed', 'dotted'];
        const simpleNodes: TreeNodeData[] = [
            {
                id: 'root',
                label: 'Root',
                icon: <Icon name="folder" />,
                children: [
                    {
                        id: 'child-1',
                        label: 'Child 1',
                        icon: <Icon name="folder" />,
                        children: [
                            { id: 'leaf-1', label: 'Leaf 1', icon: <Icon name="file" /> },
                            { id: 'leaf-2', label: 'Leaf 2', icon: <Icon name="file" /> },
                        ],
                    },
                    { id: 'child-2', label: 'Child 2', icon: <Icon name="file" /> },
                    { id: 'child-3', label: 'Child 3', icon: <Icon name="file" /> },
                ],
            },
        ];

        return (
            <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', flexWrap: 'wrap' }}>
                {styles.map((edgeStyle) => (
                    <div key={edgeStyle}>
                        <Heading level={5} marginBottom>
                            {edgeStyle}
                        </Heading>
                        <Tree
                            nodes={simpleNodes}
                            edgeStyle={edgeStyle}
                            defaultExpandedKeys={['root', 'child-1']}
                            style={{ width: '220px' }}
                        />
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Side-by-side comparison of all four edge styles: none, solid, dashed, and dotted.',
            },
        },
    },
};

/**
 * Folder actions — add subfolder, add file, delete — using IconButtons in the badge slot.
 */
export const WithActionButtons: Story = {
    render: () => {
        let nextId = 100;

        const FolderActions: React.FC<{
            nodeId: string;
            onAddFolder: (parentId: string) => void;
            onAddFile: (parentId: string) => void;
            onDelete: (nodeId: string) => void;
        }> = ({ nodeId, onAddFolder, onAddFile, onDelete }) => (
            <span
                style={{ display: 'inline-flex', gap: 'var(--bk-gap-xs)' }}
                // Stop propagation so clicking buttons doesn't toggle expand or select
                onClick={(e) => e.stopPropagation()}
            >
                <Tooltip content="New folder" placement="top">
                    <IconButton
                        icon={<Icon name="new-folder" />}
                        variant="ghost"
                        size="xs"
                        aria-label="New folder"
                        onClick={() => onAddFolder(nodeId)}
                    />
                </Tooltip>
                <Tooltip content="New file" placement="top">
                    <IconButton
                        icon={<Icon name="new-file" />}
                        variant="ghost"
                        size="xs"
                        aria-label="New file"
                        onClick={() => onAddFile(nodeId)}
                    />
                </Tooltip>
                <Tooltip content="Delete" placement="top">
                    <IconButton
                        icon={<Icon name="trash" />}
                        variant="ghost"
                        size="xs"
                        aria-label="Delete"
                        onClick={() => onDelete(nodeId)}
                    />
                </Tooltip>
            </span>
        );

        const ActionTreeDemo = () => {
            const buildInitialNodes = useCallback((): TreeNodeData[] => {
                const makeFolder = (
                    id: string,
                    label: string,
                    children: TreeNodeData[],
                ): TreeNodeData => ({
                    id,
                    label,
                    icon: <Icon name="folder" />,
                    children,
                    // badge will be patched dynamically below
                });

                const makeFile = (id: string, label: string): TreeNodeData => ({
                    id,
                    label,
                    icon: <Icon name="file" />,
                });

                return [
                    makeFolder('project', 'my-project', [
                        makeFolder('project/src', 'src', [
                            makeFolder('project/src/components', 'components', [
                                makeFile('project/src/components/App.tsx', 'App.tsx'),
                                makeFile('project/src/components/Header.tsx', 'Header.tsx'),
                            ]),
                            makeFile('project/src/index.ts', 'index.ts'),
                        ]),
                        makeFolder('project/public', 'public', [
                            makeFile('project/public/index.html', 'index.html'),
                        ]),
                        makeFile('project/package.json', 'package.json'),
                    ]),
                ];
            }, []);

            const [nodes, setNodes] = useState<TreeNodeData[]>(buildInitialNodes);
            const [expandedKeys, setExpandedKeys] = useState<string[]>([
                'project',
                'project/src',
                'project/src/components',
            ]);

            // Deep-insert a child node under a given parent id
            const insertChild = (
                tree: TreeNodeData[],
                parentId: string,
                child: TreeNodeData,
            ): TreeNodeData[] =>
                tree.map((n) => {
                    if (n.id === parentId) {
                        return { ...n, children: [...(n.children ?? []), child] };
                    }
                    if (n.children) {
                        return { ...n, children: insertChild(n.children, parentId, child) };
                    }
                    return n;
                });

            // Deep-remove a node by id
            const removeNode = (tree: TreeNodeData[], targetId: string): TreeNodeData[] =>
                tree
                    .filter((n) => n.id !== targetId)
                    .map((n) =>
                        n.children ? { ...n, children: removeNode(n.children, targetId) } : n,
                    );

            const handleAddFolder = useCallback((parentId: string) => {
                const id = `folder-${++nextId}`;
                const newFolder: TreeNodeData = {
                    id,
                    label: `new-folder-${nextId}`,
                    icon: <Icon name="folder" />,
                    children: [],
                };
                setNodes((prev) => insertChild(prev, parentId, newFolder));
                setExpandedKeys((prev) => (prev.includes(parentId) ? prev : [...prev, parentId]));
            }, []);

            const handleAddFile = useCallback((parentId: string) => {
                const id = `file-${++nextId}`;
                const newFile: TreeNodeData = {
                    id,
                    label: `untitled-${nextId}.ts`,
                    icon: <Icon name="file" />,
                };
                setNodes((prev) => insertChild(prev, parentId, newFile));
                setExpandedKeys((prev) => (prev.includes(parentId) ? prev : [...prev, parentId]));
            }, []);

            const handleDelete = useCallback((nodeId: string) => {
                setNodes((prev) => removeNode(prev, nodeId));
            }, []);

            // Recursively attach badge actions to every folder node
            const attachActions = (tree: TreeNodeData[]): TreeNodeData[] =>
                tree.map((n) => {
                    const isFolder = !!(n.children);
                    const patched: TreeNodeData = {
                        ...n,
                        badge: isFolder ? (
                            <FolderActions
                                nodeId={n.id}
                                onAddFolder={handleAddFolder}
                                onAddFile={handleAddFile}
                                onDelete={handleDelete}
                            />
                        ) : undefined,
                    };
                    if (n.children) {
                        patched.children = attachActions(n.children);
                    }
                    return patched;
                });

            return (
                <Tree
                    nodes={attachActions(nodes)}
                    edgeStyle="solid"
                    expandedKeys={expandedKeys}
                    onExpandChange={(keys) => setExpandedKeys(keys)}
                    style={{ width: '400px' }}
                />
            );
        };

        return <ActionTreeDemo />;
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Folder nodes with action buttons (add subfolder, add file, delete) in the badge slot. ' +
                    'Clicking an action button modifies the tree data without triggering node selection or expand. ' +
                    'This pattern works because `badge` accepts any `ReactNode` — buttons, dropdowns, or custom controls.',
            },
        },
    },
};

/**
 * Comprehensive showcase.
 */
export const Showcase: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-8)',
                padding: 'var(--bk-spacing-8)',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
            <div>
                <Heading level={2} marginBottom>
                    Tree Component Showcase
                </Heading>
                <Paragraph size="base" color="muted">
                    A hierarchical tree view with expandable nodes, guide lines, icons, badges,
                    and keyboard navigation.
                </Paragraph>
            </div>

            <div style={{ display: 'flex', gap: 'var(--bk-spacing-8)', flexWrap: 'wrap' }}>
                <div>
                    <Heading level={3} marginBottom>
                        File Explorer
                    </Heading>
                    <Tree
                        nodes={fileTreeNodes}
                        defaultExpandedKeys={['src', 'src/components']}
                        style={{ width: '320px' }}
                    />
                </div>

                <div>
                    <Heading level={3} marginBottom>
                        Settings (with edges)
                    </Heading>
                    <Tree
                        nodes={settingsNodes}
                        defaultExpandedKeys={['general', 'editor']}
                        edgeStyle="solid"
                        style={{ width: '320px' }}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Complete showcase of all tree features side by side.',
            },
        },
    },
};
