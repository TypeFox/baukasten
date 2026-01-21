'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { StatusBar, StatusBarSection, StatusBarItem, Icon, Badge, Heading, Dropdown, Menu, MenuItem, MenuDivider } from '@baukasten/ui';

const statusBarProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'StatusBarSection components',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
    {
        name: 'style',
        type: 'React.CSSProperties',
        description: 'Additional inline styles',
    },
];

const statusBarSectionProps: PropDefinition[] = [
    {
        name: 'align',
        type: '"left" | "right"',
        default: '"left"',
        description: 'Alignment of items in this section',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'StatusBarItem components',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const statusBarItemProps: PropDefinition[] = [
    {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Icon to display before the text',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to display',
    },
    {
        name: 'variant',
        type: '"default" | "error" | "warning" | "info" | "success"',
        default: '"default"',
        description: 'Visual variant for semantic colors',
    },
    {
        name: 'onClick',
        type: '() => void',
        description: 'Click handler - makes the item clickable',
    },
    {
        name: 'active',
        type: 'boolean',
        default: 'false',
        description: 'Whether the item is in an active/selected state',
    },
    {
        name: 'tooltip',
        type: 'string',
        description: 'Tooltip text (uses native title attribute)',
    },
];

// Interactive example component
function InteractiveStatusBar() {
    const [branch, setBranch] = useState('main');
    const [errors, setErrors] = useState(2);
    const [warnings, setWarnings] = useState(4);
    const [line, setLine] = useState(10);
    const [col, setCol] = useState(5);

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                marginBottom: 'var(--spacing-3)',
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: 'var(--font-size-sm)',
            }}>
                <div>Click on status bar items to interact!</div>
                <div style={{ marginTop: 'var(--spacing-1)', color: 'var(--vscode-descriptionForeground)' }}>
                    Branch: <strong>{branch}</strong> | Errors: <strong>{errors}</strong> |
                    Warnings: <strong>{warnings}</strong> | Position: <strong>Ln {line}, Col {col}</strong>
                </div>
            </div>
            <StatusBar>
                <StatusBarSection align="left">
                    <StatusBarItem
                        icon={<Icon name="git-branch" />}
                        onClick={() => {
                            const branches = ['main', 'develop', 'feature/new'];
                            const current = branches.indexOf(branch);
                            setBranch(branches[(current + 1) % branches.length]);
                        }}
                        tooltip="Click to switch branch"
                    >
                        {branch}
                    </StatusBarItem>
                    <StatusBarItem
                        icon={<Icon name="error" />}
                        variant="error"
                        onClick={() => setErrors(e => (e + 1) % 10)}
                        tooltip="Click to cycle errors"
                    >
                        {errors}
                    </StatusBarItem>
                    <StatusBarItem
                        icon={<Icon name="warning" />}
                        variant="warning"
                        onClick={() => setWarnings(w => (w + 1) % 10)}
                        tooltip="Click to cycle warnings"
                    >
                        {warnings}
                    </StatusBarItem>
                </StatusBarSection>
                <StatusBarSection align="right">
                    <StatusBarItem
                        onClick={() => {
                            setLine(l => l + 1);
                            setCol(c => c + 1);
                        }}
                        tooltip="Click to increment position"
                    >
                        Ln {line}, Col {col}
                    </StatusBarItem>
                    <StatusBarItem>UTF-8</StatusBarItem>
                    <StatusBarItem>TypeScript</StatusBarItem>
                </StatusBarSection>
            </StatusBar>
        </div>
    );
}

// Active state example
function ActiveStateExample() {
    const [activeTab, setActiveTab] = useState<string>('problems');

    return (
        <StatusBar>
            <StatusBarSection>
                <StatusBarItem
                    icon={<Icon name="error" />}
                    variant="error"
                    active={activeTab === 'problems'}
                    onClick={() => setActiveTab('problems')}
                >
                    Problems
                </StatusBarItem>
                <StatusBarItem
                    icon={<Icon name="output" />}
                    active={activeTab === 'output'}
                    onClick={() => setActiveTab('output')}
                >
                    Output
                </StatusBarItem>
                <StatusBarItem
                    icon={<Icon name="terminal" />}
                    active={activeTab === 'terminal'}
                    onClick={() => setActiveTab('terminal')}
                >
                    Terminal
                </StatusBarItem>
                <StatusBarItem
                    icon={<Icon name="debug-console" />}
                    active={activeTab === 'debug'}
                    onClick={() => setActiveTab('debug')}
                >
                    Debug Console
                </StatusBarItem>
            </StatusBarSection>
        </StatusBar>
    );
}

// Editor context example
function EditorContextExample() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            overflow: 'hidden',
        }}>
            <div style={{
                padding: 'var(--spacing-3)',
                borderBottom: '1px solid var(--vscode-panel-border)',
                backgroundColor: 'var(--vscode-editor-background)',
            }}>
                <h4 style={{ margin: 0, fontSize: 'var(--font-size-md)' }}>Editor Window</h4>
            </div>
            <div style={{
                flex: 1,
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--vscode-editor-background)',
                fontFamily: 'var(--vscode-editor-font-family)',
                fontSize: 'var(--vscode-editor-font-size)',
                overflow: 'auto',
            }}>
                <div>const greeting = "Hello, World!";</div>
                <div>console.log(greeting);</div>
                <div></div>
                <div>{`function add(a: number, b: number) {`}</div>
                <div>  return a + b;</div>
                <div>{'}'}</div>
            </div>
            <StatusBar>
                <StatusBarSection align="left">
                    <StatusBarItem icon={<Icon name="git-branch" />}>
                        main
                    </StatusBarItem>
                    <StatusBarItem icon={<Icon name="pass" />} variant="success">
                        No Issues
                    </StatusBarItem>
                </StatusBarSection>
                <StatusBarSection align="right">
                    <StatusBarItem tooltip="Line 3, Column 8">
                        Ln 3, Col 8
                    </StatusBarItem>
                    <StatusBarItem>UTF-8</StatusBarItem>
                    <StatusBarItem>TypeScript</StatusBarItem>
                </StatusBarSection>
            </StatusBar>
        </div>
    );
}

// Dropdown example
function DropdownExample() {
    const [selectedBranch, setSelectedBranch] = useState('main');
    const [selectedEncoding, setSelectedEncoding] = useState('UTF-8');
    const [selectedLanguage, setSelectedLanguage] = useState('TypeScript');

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '300px',
            border: '1px solid var(--vscode-panel-border)',
            borderRadius: 'var(--border-radius-md)',
            overflow: 'hidden',
        }}>
            <div style={{
                flex: 1,
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--vscode-editor-background)',
            }}>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                    Click on status bar items to open dropdowns (upward positioning)
                </div>
                <div style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>
                    Branch: <strong>{selectedBranch}</strong> |
                    Encoding: <strong>{selectedEncoding}</strong> |
                    Language: <strong>{selectedLanguage}</strong>
                </div>
            </div>
            <StatusBar>
                <StatusBarSection align="left">
                    <Dropdown
                        placement="top-start"
                        trigger={
                            <StatusBarItem icon={<Icon name="git-branch" />} tooltip="Switch Branch">
                                {selectedBranch}
                            </StatusBarItem>
                        }
                    >
                        <Menu size="sm">
                            <MenuItem
                                icon={<Icon name="git-branch" />}
                                selected={selectedBranch === 'main'}
                                onClick={() => setSelectedBranch('main')}
                            >
                                main
                            </MenuItem>
                            <MenuItem
                                icon={<Icon name="git-branch" />}
                                selected={selectedBranch === 'develop'}
                                onClick={() => setSelectedBranch('develop')}
                            >
                                develop
                            </MenuItem>
                            <MenuItem
                                icon={<Icon name="git-branch" />}
                                selected={selectedBranch === 'feature/new'}
                                onClick={() => setSelectedBranch('feature/new')}
                            >
                                feature/new
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem icon={<Icon name="add" />}>
                                Create New Branch...
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                    <StatusBarItem icon={<Icon name="pass" />} variant="success">
                        0
                    </StatusBarItem>
                </StatusBarSection>
                <StatusBarSection align="right">
                    <StatusBarItem tooltip="Line 10, Column 5">
                        Ln 10, Col 5
                    </StatusBarItem>
                    <Dropdown
                        placement="top-end"
                        trigger={
                            <StatusBarItem tooltip="Select Encoding">
                                {selectedEncoding}
                            </StatusBarItem>
                        }
                    >
                        <Menu size="sm">
                            <MenuItem
                                selected={selectedEncoding === 'UTF-8'}
                                onClick={() => setSelectedEncoding('UTF-8')}
                            >
                                UTF-8
                            </MenuItem>
                            <MenuItem
                                selected={selectedEncoding === 'UTF-16'}
                                onClick={() => setSelectedEncoding('UTF-16')}
                            >
                                UTF-16
                            </MenuItem>
                            <MenuItem
                                selected={selectedEncoding === 'ASCII'}
                                onClick={() => setSelectedEncoding('ASCII')}
                            >
                                ASCII
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                    <StatusBarItem>LF</StatusBarItem>
                    <Dropdown
                        placement="top-end"
                        trigger={
                            <StatusBarItem tooltip="Select Language Mode">
                                {selectedLanguage}
                            </StatusBarItem>
                        }
                    >
                        <Menu size="sm">
                            <MenuItem
                                icon={<Icon name="symbol-keyword" />}
                                selected={selectedLanguage === 'TypeScript'}
                                onClick={() => setSelectedLanguage('TypeScript')}
                            >
                                TypeScript
                            </MenuItem>
                            <MenuItem
                                icon={<Icon name="symbol-keyword" />}
                                selected={selectedLanguage === 'JavaScript'}
                                onClick={() => setSelectedLanguage('JavaScript')}
                            >
                                JavaScript
                            </MenuItem>
                            <MenuItem
                                icon={<Icon name="symbol-keyword" />}
                                selected={selectedLanguage === 'Python'}
                                onClick={() => setSelectedLanguage('Python')}
                            >
                                Python
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </StatusBarSection>
            </StatusBar>
        </div>
    );
}

export default function StatusBarPage() {
    return (
        <PageLayout
            title="StatusBar"
            description="A bottom status bar component for displaying contextual information, similar to VSCode's status bar. Organize items using StatusBarSection for left/right alignment, and StatusBarItem for individual elements. Supports icons, semantic color variants, click handlers, and tooltips."
        >
            <Showcase
                title="Basic Usage"
                description="StatusBar displays contextual information at the bottom of your application. Use StatusBarSection to organize items with left or right alignment, and StatusBarItem for individual pieces of information."
                preview={
                    <div style={{ width: '100%' }}>
                        <StatusBar>
                            <StatusBarSection align="left">
                                <StatusBarItem icon={<Icon name="git-branch" />}>
                                    main
                                </StatusBarItem>
                                <StatusBarItem icon={<Icon name="error" />} variant="error">
                                    2
                                </StatusBarItem>
                                <StatusBarItem icon={<Icon name="warning" />} variant="warning">
                                    4
                                </StatusBarItem>
                            </StatusBarSection>
                            <StatusBarSection align="right">
                                <StatusBarItem tooltip="Line 10, Column 5">
                                    Ln 10, Col 5
                                </StatusBarItem>
                                <StatusBarItem>UTF-8</StatusBarItem>
                                <StatusBarItem>TypeScript</StatusBarItem>
                            </StatusBarSection>
                        </StatusBar>
                    </div>
                }
                code={`import { StatusBar, StatusBarSection, StatusBarItem, Icon } from '@baukasten/ui';

function App() {
  return (
    <StatusBar>
      <StatusBarSection align="left">
        <StatusBarItem icon={<Icon name="git-branch" />}>
          main
        </StatusBarItem>
        <StatusBarItem icon={<Icon name="error" />} variant="error">
          2
        </StatusBarItem>
        <StatusBarItem icon={<Icon name="warning" />} variant="warning">
          4
        </StatusBarItem>
      </StatusBarSection>

      <StatusBarSection align="right">
        <StatusBarItem tooltip="Line 10, Column 5">
          Ln 10, Col 5
        </StatusBarItem>
        <StatusBarItem>UTF-8</StatusBarItem>
        <StatusBarItem>TypeScript</StatusBarItem>
      </StatusBarSection>
    </StatusBar>
  );
}`}
                props={statusBarProps}
            />

            <Showcase
                title="Color Variants"
                description="StatusBarItem supports semantic color variants to convey meaning: default, error, warning, info, and success. Use these to highlight important information."
                preview={
                    <StatusBar>
                        <StatusBarSection>
                            <StatusBarItem variant="default" icon={<Icon name="info" />}>
                                Default
                            </StatusBarItem>
                            <StatusBarItem variant="error" icon={<Icon name="error" />}>
                                Error
                            </StatusBarItem>
                            <StatusBarItem variant="warning" icon={<Icon name="warning" />}>
                                Warning
                            </StatusBarItem>
                            <StatusBarItem variant="info" icon={<Icon name="info" />}>
                                Info
                            </StatusBarItem>
                            <StatusBarItem variant="success" icon={<Icon name="pass" />}>
                                Success
                            </StatusBarItem>
                        </StatusBarSection>
                    </StatusBar>
                }
                code={`<StatusBar>
  <StatusBarSection>
    <StatusBarItem variant="default" icon={<Icon name="info" />}>
      Default
    </StatusBarItem>
    <StatusBarItem variant="error" icon={<Icon name="error" />}>
      Error
    </StatusBarItem>
    <StatusBarItem variant="warning" icon={<Icon name="warning" />}>
      Warning
    </StatusBarItem>
    <StatusBarItem variant="info" icon={<Icon name="info" />}>
      Info
    </StatusBarItem>
    <StatusBarItem variant="success" icon={<Icon name="pass" />}>
      Success
    </StatusBarItem>
  </StatusBarSection>
</StatusBar>`}
            />

            <Showcase
                title="Interactive Items"
                description="Add onClick handlers to make status bar items interactive. Items become clickable with hover states and support keyboard navigation. Click items to see state changes!"
                preview={<InteractiveStatusBar />}
                code={`import { useState } from 'react';
import { StatusBar, StatusBarSection, StatusBarItem, Icon } from '@baukasten/ui';

function App() {
  const [branch, setBranch] = useState('main');
  const [errors, setErrors] = useState(2);
  const [warnings, setWarnings] = useState(4);

  return (
    <StatusBar>
      <StatusBarSection align="left">
        <StatusBarItem
          icon={<Icon name="git-branch" />}
          onClick={() => {
            const branches = ['main', 'develop', 'feature/new'];
            const current = branches.indexOf(branch);
            setBranch(branches[(current + 1) % branches.length]);
          }}
          tooltip="Click to switch branch"
        >
          {branch}
        </StatusBarItem>
        <StatusBarItem
          icon={<Icon name="error" />}
          variant="error"
          onClick={() => setErrors(e => (e + 1) % 10)}
          tooltip="Click to cycle errors"
        >
          {errors}
        </StatusBarItem>
        <StatusBarItem
          icon={<Icon name="warning" />}
          variant="warning"
          onClick={() => setWarnings(w => (w + 1) % 10)}
          tooltip="Click to cycle warnings"
        >
          {warnings}
        </StatusBarItem>
      </StatusBarSection>
      <StatusBarSection align="right">
        <StatusBarItem>Ln 10, Col 5</StatusBarItem>
        <StatusBarItem>UTF-8</StatusBarItem>
        <StatusBarItem>TypeScript</StatusBarItem>
      </StatusBarSection>
    </StatusBar>
  );
}`}
            />

            <Showcase
                title="Active States"
                description="Use the active prop to highlight the currently selected item. Perfect for indicating which panel or view is active."
                preview={<ActiveStateExample />}
                code={`import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('problems');

  return (
    <StatusBar>
      <StatusBarSection>
        <StatusBarItem
          icon={<Icon name="error" />}
          variant="error"
          active={activeTab === 'problems'}
          onClick={() => setActiveTab('problems')}
        >
          Problems
        </StatusBarItem>
        <StatusBarItem
          icon={<Icon name="output" />}
          active={activeTab === 'output'}
          onClick={() => setActiveTab('output')}
        >
          Output
        </StatusBarItem>
        <StatusBarItem
          icon={<Icon name="terminal" />}
          active={activeTab === 'terminal'}
          onClick={() => setActiveTab('terminal')}
        >
          Terminal
        </StatusBarItem>
      </StatusBarSection>
    </StatusBar>
  );
}`}
            />

            <Showcase
                title="With Badges"
                description="Combine status bar items with badges to show counts or status indicators. Great for notifications, sync status, and error/warning counts."
                preview={
                    <StatusBar>
                        <StatusBarSection align="left">
                            <StatusBarItem icon={<Icon name="git-branch" />}>
                                main
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="sync" />}>
                                <Badge variant="info" size="sm">3</Badge>
                            </StatusBarItem>
                        </StatusBarSection>
                        <StatusBarSection align="right">
                            <StatusBarItem icon={<Icon name="error" />} variant="error">
                                12 Errors
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="warning" />} variant="warning">
                                34 Warnings
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="bell" />}>
                                <Badge variant="warning" size="sm">5</Badge>
                            </StatusBarItem>
                        </StatusBarSection>
                    </StatusBar>
                }
                code={`<StatusBar>
  <StatusBarSection align="left">
    <StatusBarItem icon={<Icon name="git-branch" />}>
      main
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="sync" />}>
      <Badge variant="info" size="sm">3</Badge>
    </StatusBarItem>
  </StatusBarSection>

  <StatusBarSection align="right">
    <StatusBarItem icon={<Icon name="error" />} variant="error">
      12 Errors
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="warning" />} variant="warning">
      34 Warnings
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="bell" />}>
      <Badge variant="warning" size="sm">5</Badge>
    </StatusBarItem>
  </StatusBarSection>
</StatusBar>`}
            />

            <Showcase
                title="In Editor Context"
                description="StatusBar positioned at the bottom of an editor window, demonstrating typical usage in an application layout."
                preview={<EditorContextExample />}
                code={`<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  {/* Header */}
  <div>Editor Window</div>
  
  {/* Content Area */}
  <div style={{ flex: 1 }}>
    {/* Your editor content */}
  </div>
  
  {/* Status Bar */}
  <StatusBar>
    <StatusBarSection align="left">
      <StatusBarItem icon={<Icon name="git-branch" />}>
        main
      </StatusBarItem>
      <StatusBarItem icon={<Icon name="pass" />} variant="success">
        No Issues
      </StatusBarItem>
    </StatusBarSection>

    <StatusBarSection align="right">
      <StatusBarItem tooltip="Line 3, Column 8">
        Ln 3, Col 8
      </StatusBarItem>
      <StatusBarItem>UTF-8</StatusBarItem>
      <StatusBarItem>TypeScript</StatusBarItem>
    </StatusBarSection>
  </StatusBar>
</div>`}
            />

            <Showcase
                title="With Dropdowns"
                description="Status bar items can trigger dropdowns that open upward using placement='top-start' or 'top-end'. Essential for status bars at the bottom of the screen. Click items to open menus."
                preview={<DropdownExample />}
                code={`import { Dropdown, Menu, MenuItem } from '@baukasten/ui';

function App() {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [selectedEncoding, setSelectedEncoding] = useState('UTF-8');

  return (
    <StatusBar>
      <StatusBarSection align="left">
        {/* Branch selector with upward dropdown */}
        <Dropdown
          placement="top-start"
          trigger={
            <StatusBarItem icon={<Icon name="git-branch" />}>
              {selectedBranch}
            </StatusBarItem>
          }
        >
          <Menu size="sm">
            <MenuItem onClick={() => setSelectedBranch('main')}>
              main
            </MenuItem>
            <MenuItem onClick={() => setSelectedBranch('develop')}>
              develop
            </MenuItem>
          </Menu>
        </Dropdown>
      </StatusBarSection>

      <StatusBarSection align="right">
        {/* Encoding selector with upward dropdown */}
        <Dropdown
          placement="top-end"
          trigger={
            <StatusBarItem tooltip="Select Encoding">
              {selectedEncoding}
            </StatusBarItem>
          }
        >
          <Menu size="sm">
            <MenuItem onClick={() => setSelectedEncoding('UTF-8')}>
              UTF-8
            </MenuItem>
            <MenuItem onClick={() => setSelectedEncoding('UTF-16')}>
              UTF-16
            </MenuItem>
          </Menu>
        </Dropdown>
      </StatusBarSection>
    </StatusBar>
  );
}`}
            />

            <Showcase
                title="VSCode-Style Complete"
                description="A comprehensive VSCode-style status bar with remote connection, git status, errors/warnings, cursor position, file settings, and notifications."
                preview={
                    <StatusBar>
                        <StatusBarSection align="left">
                            <StatusBarItem icon={<Icon name="remote" />} tooltip="Connected to Remote">
                                SSH: server.local
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="git-branch" />} tooltip="main">
                                main
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="sync" />} tooltip="Synchronize Changes">
                                <Icon name="arrow-up" />1 <Icon name="arrow-down" />2
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="error" />} variant="error" tooltip="2 Errors">
                                2
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="warning" />} variant="warning" tooltip="4 Warnings">
                                4
                            </StatusBarItem>
                        </StatusBarSection>
                        <StatusBarSection align="right">
                            <StatusBarItem tooltip="Go to Line/Column">
                                Ln 42, Col 15
                            </StatusBarItem>
                            <StatusBarItem tooltip="Indent Using Spaces">
                                Spaces: 2
                            </StatusBarItem>
                            <StatusBarItem tooltip="Select Encoding">
                                UTF-8
                            </StatusBarItem>
                            <StatusBarItem tooltip="Select End of Line Sequence">
                                LF
                            </StatusBarItem>
                            <StatusBarItem tooltip="Select Language Mode">
                                TypeScript React
                            </StatusBarItem>
                            <StatusBarItem icon={<Icon name="feedback" />} tooltip="Send Feedback" />
                            <StatusBarItem icon={<Icon name="bell" />} tooltip="Notifications" />
                        </StatusBarSection>
                    </StatusBar>
                }
                code={`<StatusBar>
  <StatusBarSection align="left">
    <StatusBarItem icon={<Icon name="remote" />} tooltip="Connected to Remote">
      SSH: server.local
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="git-branch" />} tooltip="main">
      main
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="sync" />} tooltip="Synchronize Changes">
      <Icon name="arrow-up" />1 <Icon name="arrow-down" />2
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="error" />} variant="error" tooltip="2 Errors">
      2
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="warning" />} variant="warning" tooltip="4 Warnings">
      4
    </StatusBarItem>
  </StatusBarSection>

  <StatusBarSection align="right">
    <StatusBarItem tooltip="Go to Line/Column">
      Ln 42, Col 15
    </StatusBarItem>
    <StatusBarItem tooltip="Indent Using Spaces">
      Spaces: 2
    </StatusBarItem>
    <StatusBarItem tooltip="Select Encoding">UTF-8</StatusBarItem>
    <StatusBarItem tooltip="Select End of Line Sequence">LF</StatusBarItem>
    <StatusBarItem tooltip="Select Language Mode">
      TypeScript React
    </StatusBarItem>
    <StatusBarItem icon={<Icon name="feedback" />} tooltip="Send Feedback" />
    <StatusBarItem icon={<Icon name="bell" />} tooltip="Notifications" />
  </StatusBarSection>
</StatusBar>`}
                props={[
                    ...statusBarProps,
                    { name: '---', type: '---', description: 'StatusBarSection Props:' },
                    ...statusBarSectionProps,
                    { name: '---', type: '---', description: 'StatusBarItem Props:' },
                    ...statusBarItemProps,
                ]}
            />

            <div style={{
                marginTop: 'var(--spacing-6)',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--border-radius-md)',
            }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Clickable items have <code>role="button"</code> and <code>tabIndex={0}</code>
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Keyboard support: <code>Enter</code> and <code>Space</code> to activate clickable items
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Tooltips use native <code>title</code> attribute for screen reader support
                    </li>
                    <li>
                        Color variants use semantic colors that work with VSCode themes
                    </li>
                </ul>
            </div>

            <div style={{
                marginTop: 'var(--spacing-6)',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--border-radius-md)',
            }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Position:</strong> Use as a fixed bottom bar or at the bottom of a container
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Left Section:</strong> Display contextual information (git branch, errors, warnings, connection status)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Right Section:</strong> Display editor/file information (cursor position, encoding, language, line endings)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Tooltips:</strong> Always add tooltips to items for clarity
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Dropdowns:</strong> Use <code>placement="top-start"</code> or <code>"top-end"</code> for status bar dropdowns
                    </li>
                    <li>
                        <strong>Variants:</strong> Use semantic colors sparingly to highlight important information
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
