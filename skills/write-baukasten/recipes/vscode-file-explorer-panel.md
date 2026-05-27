# File Explorer Panel

A Tree-based file/folder navigator with right-click context actions, typical of a VSCode side-bar view. Composes `Tree`, `Icon`, `ContextMenu`, `Menu` from `baukasten-ui/extra` plus `baukasten-ui/core` primitives.

Cross-references:

- [Tree](../references/extra-components.md#tree)
- [ContextMenu](../references/extra-components.md#contextmenu)
- [Menu & MenuItem](../references/extra-components.md#menu--menuitem)

## Pattern

Tree drives the file hierarchy. Each node carries a typed payload (file vs. folder) so click handlers can branch. A single shared `ContextMenu` wraps the tree; the menu items act on whatever node was most recently right-clicked.

```tsx
import { useState } from 'react';
import { Icon, Text } from 'baukasten-ui/core';
import { Tree, ContextMenu, Menu, MenuItem, MenuDivider } from 'baukasten-ui/extra';
import type { TreeNodeData } from 'baukasten-ui/extra';

interface FileNode extends TreeNodeData {
    kind: 'file' | 'folder';
    path: string;
}

function buildNodes(files: FileNode[]): TreeNodeData[] {
    // map your data to nodes — set icon by kind, label by basename
    return files.map((f) => ({
        ...f,
        icon: <Icon name={f.kind === 'folder' ? 'folder' : 'file'} />,
    }));
}

export function FileExplorer({ files }: { files: FileNode[] }) {
    const nodes = buildNodes(files);
    const [contextNode, setContextNode] = useState<FileNode | null>(null);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (key: string, node: TreeNodeData) => {
        setSelected(key);
        const file = node as FileNode;
        if (file.kind === 'file') openFile(file.path);
    };

    return (
        <ContextMenu
            menu={
                <Menu>
                    <MenuItem
                        icon={<Icon name="go-to-file" />}
                        disabled={!contextNode}
                        onClick={() => contextNode && openFile(contextNode.path)}
                    >
                        Open
                    </MenuItem>
                    <MenuItem
                        icon={<Icon name="copy" />}
                        disabled={!contextNode}
                        onClick={() => contextNode && copyPath(contextNode.path)}
                    >
                        Copy Path
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        icon={<Icon name="trash" />}
                        disabled={!contextNode}
                        onClick={() => contextNode && deletePath(contextNode.path)}
                    >
                        Delete
                    </MenuItem>
                </Menu>
            }
        >
            <Tree
                nodes={nodes}
                selectedKey={selected}
                onSelect={handleSelect}
                defaultExpandedKeys={['/src']}
                edgeStyle="none"
                onContextMenu={(e) => {
                    // capture which node the right-click was over via data attribute
                    const el = (e.target as HTMLElement).closest('[data-tree-node-id]');
                    const id = el?.getAttribute('data-tree-node-id');
                    setContextNode(files.find((f) => f.id === id) ?? null);
                }}
            />
        </ContextMenu>
    );
}
```

## Notes

- **Right-click target tracking**: Tree nodes carry `data-tree-node-id`; reading it from the event target tells the shared menu which node was clicked.
- **Selection vs. activation**: `onSelect` fires for keyboard and click. Use the node's `kind` to decide whether to open the file or just highlight the folder.
- **Inline badges** (e.g., git status, error counts): pass a `Badge` via each node's `badge` field — see the Tree reference for the data shape.
- **Lazy loading**: for very large workspaces, give folders empty `children: []` and replace them via state on first expand (`onExpandChange` fires before children are walked).
- **Empty / loading states**: render a centered `Spinner` or empty-state `Text` instead of `<Tree>` while data is pending — Tree itself has no built-in loading mode.
