'use client';

import { useRef, useState, type MouseEvent } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Icon, Badge, Text, Input } from 'baukasten-ui/core';
import { Tree, ContextMenu, MenuItem, MenuDivider } from 'baukasten-ui/extra';
import type { TreeNodeData } from 'baukasten-ui/extra';

const treeProps: PropDefinition[] = [
    {
        name: 'nodes',
        type: 'TreeNodeData[]',
        required: true,
        description: 'Array of root-level tree nodes.',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of tree items.',
    },
    {
        name: 'expandedKeys',
        type: 'string[]',
        description: 'Controlled set of expanded node IDs.',
    },
    {
        name: 'defaultExpandedKeys',
        type: 'string[]',
        default: '[]',
        description: 'Uncontrolled default expanded node IDs.',
    },
    {
        name: 'onExpandChange',
        type: '(expandedKeys: string[], info: { key, expanded, node }) => void',
        description: 'Called when a node is expanded or collapsed.',
    },
    {
        name: 'selectable',
        type: 'boolean',
        default: 'true',
        description: 'Whether nodes can be selected.',
    },
    {
        name: 'selectedKey',
        type: 'string | null',
        description: 'Controlled selected node ID.',
    },
    {
        name: 'defaultSelectedKey',
        type: 'string | null',
        description: 'Uncontrolled default selected node ID.',
    },
    {
        name: 'onSelect',
        type: '(key: string, node: TreeNodeData) => void',
        description: 'Called when a node is selected.',
    },
    {
        name: 'edgeStyle',
        type: '"solid" | "dashed" | "dotted" | "none"',
        default: '"none"',
        description: 'Style of guide lines connecting parent and child nodes.',
    },
    {
        name: 'indentSize',
        type: 'number',
        default: '20',
        description: 'Indentation per level in pixels.',
    },
    {
        name: 'expandOnClick',
        type: 'boolean',
        default: 'true',
        description:
            'If true, clicking the whole row toggles expansion. If false, only the icon does.',
    },
    {
        name: 'expandIcon',
        type: '(props: ExpandIconRenderProps) => React.ReactNode',
        description: 'Custom expand/collapse icon renderer. Return null to hide it.',
    },
];

const treeNodeDataProps: PropDefinition[] = [
    {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Unique identifier for the node.',
    },
    {
        name: 'label',
        type: 'React.ReactNode',
        required: true,
        description: 'Label displayed in the node row.',
    },
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Optional icon rendered before the label.',
    },
    {
        name: 'badge',
        type: 'React.ReactNode',
        description: 'Optional content rendered on the right (badges, actions, etc.).',
    },
    {
        name: 'children',
        type: 'TreeNodeData[]',
        description: 'Child nodes.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the node is disabled.',
    },
];

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
                    { id: 'src/styles/tokens.ts', label: 'tokens.ts', icon: <Icon name="file" /> },
                    {
                        id: 'src/styles/global.css',
                        label: 'global.css',
                        icon: <Icon name="file" />,
                    },
                ],
            },
            { id: 'src/index.ts', label: 'index.ts', icon: <Icon name="file" /> },
        ],
    },
    { id: 'package.json', label: 'package.json', icon: <Icon name="file" /> },
    { id: 'README.md', label: 'README.md', icon: <Icon name="file" /> },
];

function BasicTreeExample() {
    return (
        <div style={{ width: '100%', maxWidth: 360 }}>
            <Tree nodes={fileTreeNodes} defaultExpandedKeys={['src', 'src/components']} />
        </div>
    );
}

function EdgeStyleExample() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 'var(--bk-gap-lg)',
                width: '100%',
            }}
        >
            <div>
                <Text size="sm" color="muted">
                    solid
                </Text>
                <Tree nodes={fileTreeNodes} defaultExpandedKeys={['src']} edgeStyle="solid" />
            </div>
            <div>
                <Text size="sm" color="muted">
                    dashed
                </Text>
                <Tree nodes={fileTreeNodes} defaultExpandedKeys={['src']} edgeStyle="dashed" />
            </div>
            <div>
                <Text size="sm" color="muted">
                    dotted
                </Text>
                <Tree nodes={fileTreeNodes} defaultExpandedKeys={['src']} edgeStyle="dotted" />
            </div>
            <div>
                <Text size="sm" color="muted">
                    none (default)
                </Text>
                <Tree nodes={fileTreeNodes} defaultExpandedKeys={['src']} edgeStyle="none" />
            </div>
        </div>
    );
}

const issueTreeNodes: TreeNodeData[] = [
    {
        id: 'errors',
        label: 'Errors',
        icon: <Icon name="error" color="var(--bk-color-danger)" />,
        badge: (
            <Badge variant="error" size="sm">
                3
            </Badge>
        ),
        children: [
            { id: 'err-1', label: 'Cannot read property of undefined', icon: <Icon name="bug" /> },
            { id: 'err-2', label: 'Network request failed', icon: <Icon name="bug" /> },
            { id: 'err-3', label: 'Module not found', icon: <Icon name="bug" /> },
        ],
    },
    {
        id: 'warnings',
        label: 'Warnings',
        icon: <Icon name="warning" color="var(--bk-color-warning)" />,
        badge: (
            <Badge variant="warning" size="sm">
                2
            </Badge>
        ),
        children: [
            { id: 'warn-1', label: 'Deprecated API usage', icon: <Icon name="alert" /> },
            { id: 'warn-2', label: 'Missing dependency', icon: <Icon name="alert" /> },
        ],
    },
    {
        id: 'info',
        label: 'Info',
        icon: <Icon name="info" color="var(--bk-color-info)" />,
        badge: (
            <Badge variant="info" size="sm">
                5
            </Badge>
        ),
        children: [],
    },
    {
        id: 'legacy',
        label: 'Legacy (read-only)',
        icon: <Icon name="archive" />,
        disabled: true,
    },
];

function BadgesExample() {
    return (
        <div style={{ width: '100%', maxWidth: 420 }}>
            <Tree nodes={issueTreeNodes} defaultExpandedKeys={['errors', 'warnings']} />
        </div>
    );
}

function ControlledExample() {
    const [expanded, setExpanded] = useState<string[]>(['src']);
    const [selected, setSelected] = useState<string | null>('src/index.ts');

    return (
        <div style={{ width: '100%', maxWidth: 420 }}>
            <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                <Text size="sm" color="muted">
                    Selected:{' '}
                </Text>
                <Text size="sm" weight="semibold">
                    {selected ?? '(none)'}
                </Text>
            </div>
            <Tree
                nodes={fileTreeNodes}
                expandedKeys={expanded}
                onExpandChange={setExpanded}
                selectedKey={selected}
                onSelect={(key) => setSelected(key)}
            />
        </div>
    );
}

function CustomExpandIconExample() {
    return (
        <div style={{ width: '100%', maxWidth: 360 }}>
            <Tree
                nodes={fileTreeNodes}
                defaultExpandedKeys={['src']}
                expandIcon={({ expanded, hasChildren }) =>
                    hasChildren ? (
                        <Icon name={expanded ? 'triangle-down' : 'triangle-right'} />
                    ) : null
                }
            />
        </div>
    );
}

// ─── File-manager example (double-click rename + context menu) ───────────────

interface FsNode {
    id: string;
    name: string;
    kind: 'file' | 'folder';
    children?: FsNode[];
}

const initialFileTree: FsNode[] = [
    {
        id: 'src',
        name: 'src',
        kind: 'folder',
        children: [
            { id: 'src/index.ts', name: 'index.ts', kind: 'file' },
            { id: 'src/App.tsx', name: 'App.tsx', kind: 'file' },
        ],
    },
    {
        id: 'public',
        name: 'public',
        kind: 'folder',
        children: [{ id: 'public/favicon.ico', name: 'favicon.ico', kind: 'file' }],
    },
    { id: 'package.json', name: 'package.json', kind: 'file' },
];

function findFsNode(nodes: FsNode[], id: string): FsNode | undefined {
    for (const n of nodes) {
        if (n.id === id) return n;
        if (n.children) {
            const found = findFsNode(n.children, id);
            if (found) return found;
        }
    }
    return undefined;
}

function renameFsNode(nodes: FsNode[], id: string, name: string): FsNode[] {
    return nodes.map((n) => {
        if (n.id === id) return { ...n, name };
        if (n.children) return { ...n, children: renameFsNode(n.children, id, name) };
        return n;
    });
}

function insertFsChild(nodes: FsNode[], parentId: string, child: FsNode): FsNode[] {
    return nodes.map((n) => {
        if (n.id === parentId) return { ...n, children: [...(n.children ?? []), child] };
        if (n.children) return { ...n, children: insertFsChild(n.children, parentId, child) };
        return n;
    });
}

function removeFsNode(nodes: FsNode[], id: string): FsNode[] {
    return nodes
        .filter((n) => n.id !== id)
        .map((n) => (n.children ? { ...n, children: removeFsNode(n.children, id) } : n));
}

function FileManagerExample() {
    const [tree, setTree] = useState<FsNode[]>(initialFileTree);
    const [expanded, setExpanded] = useState<string[]>(['src']);
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [contextNode, setContextNode] = useState<FsNode | null>(null);
    const idCounter = useRef(0);

    const commitRename = (id: string, value: string) => {
        const name = value.trim();
        if (name) setTree((t) => renameFsNode(t, id, name));
        setRenamingId(null);
    };

    // Tree exposes no per-node event props by design — resolve the row
    // from the data-tree-node-id attribute that every row renders.
    const nodeFromEvent = (e: MouseEvent): FsNode | null => {
        const el = (e.target as HTMLElement).closest('[data-tree-node-id]');
        const id = el?.getAttribute('data-tree-node-id');
        return id ? (findFsNode(tree, id) ?? null) : null;
    };

    const addChild = (parentId: string, kind: 'file' | 'folder') => {
        const id = 'node-' + ++idCounter.current;
        const child: FsNode =
            kind === 'folder'
                ? { id, name: 'new-folder', kind, children: [] }
                : { id, name: 'new-file.ts', kind };
        setTree((t) => insertFsChild(t, parentId, child));
        setExpanded((e) => (e.includes(parentId) ? e : [...e, parentId]));
    };

    // Map the file-system model to Tree nodes. The row being renamed
    // swaps its label for an inline Input.
    const toTreeNodes = (nodes: FsNode[]): TreeNodeData[] =>
        nodes.map((n) => ({
            id: n.id,
            icon: <Icon name={n.kind === 'folder' ? 'folder' : 'file'} />,
            label:
                n.id === renamingId ? (
                    <Input
                        size="xs"
                        autoFocus
                        defaultValue={n.name}
                        onFocus={(e) => e.currentTarget.select()}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === 'Enter') commitRename(n.id, e.currentTarget.value);
                            if (e.key === 'Escape') setRenamingId(null);
                        }}
                        onBlur={(e) => commitRename(n.id, e.currentTarget.value)}
                    />
                ) : (
                    n.name
                ),
            children: n.children ? toTreeNodes(n.children) : undefined,
        }));

    return (
        <div style={{ width: '100%', maxWidth: 420 }}>
            <Text size="sm" color="muted" block style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                Double-click a row to rename it. Right-click for actions.
            </Text>
            <ContextMenu
                menu={
                    contextNode?.kind === 'folder' ? (
                        <>
                            <MenuItem
                                icon={<Icon name="new-folder" />}
                                onClick={() => addChild(contextNode.id, 'folder')}
                            >
                                New Folder
                            </MenuItem>
                            <MenuItem
                                icon={<Icon name="new-file" />}
                                onClick={() => addChild(contextNode.id, 'file')}
                            >
                                New File
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                icon={<Icon name="edit" />}
                                onClick={() => setRenamingId(contextNode.id)}
                            >
                                Rename
                            </MenuItem>
                        </>
                    ) : contextNode ? (
                        <>
                            <MenuItem
                                icon={<Icon name="edit" />}
                                onClick={() => setRenamingId(contextNode.id)}
                            >
                                Rename
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                icon={<Icon name="trash" />}
                                onClick={() => setTree((t) => removeFsNode(t, contextNode.id))}
                            >
                                Delete
                            </MenuItem>
                        </>
                    ) : null
                }
            >
                <Tree
                    nodes={toTreeNodes(tree)}
                    edgeStyle="solid"
                    expandedKeys={expanded}
                    onExpandChange={setExpanded}
                    onDoubleClick={(e) => {
                        const node = nodeFromEvent(e);
                        if (node) setRenamingId(node.id);
                    }}
                    onContextMenu={(e) => {
                        const node = nodeFromEvent(e);
                        setContextNode(node);
                        // Right-click outside any row: suppress both menus.
                        if (!node) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                />
            </ContextMenu>
        </div>
    );
}

export default function TreePage() {
    return (
        <PageLayout
            title="Tree"
            description="A hierarchical tree view for file explorers, settings hierarchies, and nested navigation. Supports expand/collapse, single selection, keyboard navigation, guide edges, icons, and badges."
        >
            <Showcase
                title="Basic Usage"
                description="Provide a nested array of nodes. Each node needs a unique id and a label."
                preview={<BasicTreeExample />}
                code={`import { Tree } from 'baukasten-ui/extra';
import type { TreeNodeData } from 'baukasten-ui/extra';
import { Icon } from 'baukasten-ui/core';

const nodes: TreeNodeData[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Icon name="folder" />,
    children: [
      { id: 'src/index.ts', label: 'index.ts', icon: <Icon name="file" /> },
      { id: 'src/App.tsx', label: 'App.tsx', icon: <Icon name="file" /> },
    ],
  },
  { id: 'package.json', label: 'package.json', icon: <Icon name="file" /> },
];

<Tree nodes={nodes} defaultExpandedKeys={['src']} />`}
            />

            <Showcase
                title="Edge Styles"
                description="Use edgeStyle to draw guide lines between parents and children. Useful for deep hierarchies."
                preview={<EdgeStyleExample />}
                code={`<Tree nodes={nodes} edgeStyle="solid" />
<Tree nodes={nodes} edgeStyle="dashed" />
<Tree nodes={nodes} edgeStyle="dotted" />
<Tree nodes={nodes} edgeStyle="none" />  // default`}
            />

            <Showcase
                title="Badges and Disabled Nodes"
                description="Add right-side content via the badge field, and prevent interaction with disabled."
                preview={<BadgesExample />}
                code={`const nodes: TreeNodeData[] = [
  {
    id: 'errors',
    label: 'Errors',
    icon: <Icon name="error" />,
    badge: <Badge variant="error" size="sm">3</Badge>,
    children: [
      { id: 'err-1', label: 'Cannot read property of undefined' },
    ],
  },
  {
    id: 'legacy',
    label: 'Legacy (read-only)',
    icon: <Icon name="archive" />,
    disabled: true,
  },
];

<Tree nodes={nodes} defaultExpandedKeys={['errors']} />`}
            />

            <Showcase
                title="Controlled Expansion and Selection"
                description="Pass expandedKeys + onExpandChange and selectedKey + onSelect to drive the tree from your own state."
                preview={<ControlledExample />}
                code={`const [expanded, setExpanded] = useState<string[]>(['src']);
const [selected, setSelected] = useState<string | null>(null);

<Tree
  nodes={nodes}
  expandedKeys={expanded}
  onExpandChange={setExpanded}
  selectedKey={selected}
  onSelect={(key) => setSelected(key)}
/>`}
            />

            <Showcase
                title="Custom Expand Icon"
                description="Replace the default chevron with a custom renderer. Return null to hide the icon for leaf nodes."
                preview={<CustomExpandIconExample />}
                code={`<Tree
  nodes={nodes}
  expandIcon={({ expanded, hasChildren }) =>
    hasChildren ? (
      <Icon name={expanded ? 'triangle-down' : 'triangle-right'} />
    ) : null
  }
/>`}
            />

            <Showcase
                title="File Manager: Rename & Context Menu"
                description="Double-click a row to rename it inline; right-click for context-aware actions — New Folder / New File on folders, Delete on files. Tree has no per-node event handlers by design: onDoubleClick and onContextMenu live on the Tree container (it forwards standard HTML attributes), and the clicked row is resolved from the data-tree-node-id attribute every row renders."
                preview={<FileManagerExample />}
                code={`import { useRef, useState, type MouseEvent } from 'react';
import { Icon, Input, Text } from 'baukasten-ui/core';
import { Tree, ContextMenu, MenuItem, MenuDivider } from 'baukasten-ui/extra';
import type { TreeNodeData } from 'baukasten-ui/extra';

interface FsNode {
  id: string;
  name: string;
  kind: 'file' | 'folder';
  children?: FsNode[];
}

// Immutable recursive helpers over the file-system model
function findFsNode(nodes: FsNode[], id: string): FsNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findFsNode(n.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function renameFsNode(nodes: FsNode[], id: string, name: string): FsNode[] {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, name };
    if (n.children) return { ...n, children: renameFsNode(n.children, id, name) };
    return n;
  });
}

function insertFsChild(nodes: FsNode[], parentId: string, child: FsNode): FsNode[] {
  return nodes.map((n) => {
    if (n.id === parentId) return { ...n, children: [...(n.children ?? []), child] };
    if (n.children) return { ...n, children: insertFsChild(n.children, parentId, child) };
    return n;
  });
}

function removeFsNode(nodes: FsNode[], id: string): FsNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => (n.children ? { ...n, children: removeFsNode(n.children, id) } : n));
}

function FileManager({ initialTree }: { initialTree: FsNode[] }) {
  const [tree, setTree] = useState<FsNode[]>(initialTree);
  const [expanded, setExpanded] = useState<string[]>(['src']);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [contextNode, setContextNode] = useState<FsNode | null>(null);
  const idCounter = useRef(0);

  const commitRename = (id: string, value: string) => {
    const name = value.trim();
    if (name) setTree((t) => renameFsNode(t, id, name));
    setRenamingId(null);
  };

  // Tree exposes no per-node event props by design — resolve the row
  // from the data-tree-node-id attribute that every row renders.
  const nodeFromEvent = (e: MouseEvent): FsNode | null => {
    const el = (e.target as HTMLElement).closest('[data-tree-node-id]');
    const id = el?.getAttribute('data-tree-node-id');
    return id ? (findFsNode(tree, id) ?? null) : null;
  };

  const addChild = (parentId: string, kind: 'file' | 'folder') => {
    const id = 'node-' + ++idCounter.current;
    const child: FsNode =
      kind === 'folder'
        ? { id, name: 'new-folder', kind, children: [] }
        : { id, name: 'new-file.ts', kind };
    setTree((t) => insertFsChild(t, parentId, child));
    setExpanded((e) => (e.includes(parentId) ? e : [...e, parentId]));
  };

  // Map the file-system model to Tree nodes. The row being renamed
  // swaps its label for an inline Input.
  const toTreeNodes = (nodes: FsNode[]): TreeNodeData[] =>
    nodes.map((n) => ({
      id: n.id,
      icon: <Icon name={n.kind === 'folder' ? 'folder' : 'file'} />,
      label:
        n.id === renamingId ? (
          <Input
            size="xs"
            autoFocus
            defaultValue={n.name}
            onFocus={(e) => e.currentTarget.select()}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') commitRename(n.id, e.currentTarget.value);
              if (e.key === 'Escape') setRenamingId(null);
            }}
            onBlur={(e) => commitRename(n.id, e.currentTarget.value)}
          />
        ) : (
          n.name
        ),
      children: n.children ? toTreeNodes(n.children) : undefined,
    }));

  return (
    <ContextMenu
      menu={
        contextNode?.kind === 'folder' ? (
          <>
            <MenuItem
              icon={<Icon name="new-folder" />}
              onClick={() => addChild(contextNode.id, 'folder')}
            >
              New Folder
            </MenuItem>
            <MenuItem
              icon={<Icon name="new-file" />}
              onClick={() => addChild(contextNode.id, 'file')}
            >
              New File
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon name="edit" />}
              onClick={() => setRenamingId(contextNode.id)}
            >
              Rename
            </MenuItem>
          </>
        ) : contextNode ? (
          <>
            <MenuItem
              icon={<Icon name="edit" />}
              onClick={() => setRenamingId(contextNode.id)}
            >
              Rename
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon name="trash" />}
              onClick={() => setTree((t) => removeFsNode(t, contextNode.id))}
            >
              Delete
            </MenuItem>
          </>
        ) : null
      }
    >
      <Tree
        nodes={toTreeNodes(tree)}
        edgeStyle="solid"
        expandedKeys={expanded}
        onExpandChange={setExpanded}
        onDoubleClick={(e) => {
          const node = nodeFromEvent(e);
          if (node) setRenamingId(node.id);
        }}
        onContextMenu={(e) => {
          const node = nodeFromEvent(e);
          setContextNode(node);
          // Right-click outside any row: suppress both menus.
          if (!node) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      />
    </ContextMenu>
  );
}`}
                props={[
                    ...treeProps,
                    { name: '---', type: '---', description: 'TreeNodeData fields:' },
                    ...treeNodeDataProps,
                ]}
            />
        </PageLayout>
    );
}
