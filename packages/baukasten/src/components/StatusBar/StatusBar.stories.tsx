import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StatusBar, StatusBarSection, StatusBarItem } from './StatusBar';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { Dropdown } from '../Dropdown';
import { Menu, MenuItem, MenuDivider } from '../Menu';

const meta = {
  title: 'Components/StatusBar',
  component: StatusBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A bottom status bar component for displaying contextual information, similar to VSCode\'s status bar. Organize items using StatusBarSection for left/right alignment, and StatusBarItem for individual elements. Supports icons, semantic color variants, click handlers, and tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'StatusBarSection components',
    },
  },
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic status bar with left and right sections.
 */
export const Interactive: Story = {
  render: () => (
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
        <StatusBarItem>LF</StatusBarItem>
        <StatusBarItem>TypeScript</StatusBarItem>
      </StatusBarSection>
    </StatusBar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic status bar with items aligned to the left and right. Left section shows git branch, errors, and warnings. Right section shows cursor position, encoding, line ending, and language.',
      },
    },
  },
};

/**
 * Status bar items with different semantic color variants.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status bar items support semantic color variants: default, error, warning, info, and success. Use these to convey meaning through color.',
      },
    },
  },
};

/**
 * Interactive status bar with click handlers and state.
 */
export const WithClickHandlers: Story = {
  render: () => {
    const InteractiveExample = () => {
      const [branch, setBranch] = useState('main');
      const [errors, setErrors] = useState(2);
      const [warnings, setWarnings] = useState(4);
      const [line, setLine] = useState(10);
      const [col, setCol] = useState(5);
      const [encoding, setEncoding] = useState('UTF-8');
      const [language, setLanguage] = useState('TypeScript');

      return (
        <div>
          <div
            style={{
              marginBottom: 'var(--spacing-4)',
              padding: 'var(--spacing-4)',
              background: 'var(--color-background-elevated)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <div>Click on status bar items to interact with them!</div>
            <div style={{ marginTop: 'var(--spacing-2)', color: 'var(--color-foreground-muted)' }}>
              Current state: Branch: <strong>{branch}</strong>, Errors: <strong>{errors}</strong>,
              Warnings: <strong>{warnings}</strong>, Position: <strong>Ln {line}, Col {col}</strong>
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

              <StatusBarItem
                icon={<Icon name="bell" />}
                onClick={() => console.log('Notifications clicked')}
                tooltip="Notifications"
              />
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

              <StatusBarItem
                onClick={() => {
                  const encodings = ['UTF-8', 'UTF-16', 'ASCII'];
                  const current = encodings.indexOf(encoding);
                  setEncoding(encodings[(current + 1) % encodings.length]);
                }}
                tooltip="Click to change encoding"
              >
                {encoding}
              </StatusBarItem>

              <StatusBarItem onClick={() => console.log('Line ending clicked')}>
                LF
              </StatusBarItem>

              <StatusBarItem
                onClick={() => {
                  const languages = ['TypeScript', 'JavaScript', 'Python', 'Rust'];
                  const current = languages.indexOf(language);
                  setLanguage(languages[(current + 1) % languages.length]);
                }}
                tooltip="Click to change language"
              >
                {language}
              </StatusBarItem>
            </StatusBarSection>
          </StatusBar>
        </div>
      );
    };

    return <InteractiveExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive status bar where clicking items triggers actions and updates state. Demonstrates onClick handlers, tooltips, and real-time updates.',
      },
    },
  },
};

/**
 * Status bar items with active states.
 */
export const ActiveStates: Story = {
  render: () => {
    const ActiveExample = () => {
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
    };

    return <ActiveExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Status bar items can show an active state using the `active` prop. Useful for indicating which panel or view is currently selected.',
      },
    },
  },
};

/**
 * Status bar with badges and counts.
 */
export const WithBadges: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status bar items can contain badges to show counts or status indicators. Combine with icons and semantic colors for rich information display.',
      },
    },
  },
};

/**
 * VSCode-like status bar example.
 */
export const VSCodeLike: Story = {
  render: () => (
    <StatusBar>
      <StatusBarSection align="left">
        <StatusBarItem icon={<Icon name="remote" />} tooltip="Connected to Remote">
          SSH: server.local
        </StatusBarItem>

        <StatusBarItem icon={<Icon name="git-branch" />} onClick={() => console.log('Branch clicked')} tooltip="main">
          main
        </StatusBarItem>

        <StatusBarItem icon={<Icon name="sync" />} onClick={() => console.log('Sync clicked')} tooltip="Synchronize Changes">
          <Icon name="arrow-up" />1 <Icon name="arrow-down" />2
        </StatusBarItem>

        <StatusBarItem
          icon={<Icon name="error" />}
          variant="error"
          onClick={() => console.log('Errors clicked')}
          tooltip="2 Errors"
        >
          2
        </StatusBarItem>

        <StatusBarItem
          icon={<Icon name="warning" />}
          variant="warning"
          onClick={() => console.log('Warnings clicked')}
          tooltip="4 Warnings"
        >
          4
        </StatusBarItem>
      </StatusBarSection>

      <StatusBarSection align="right">
        <StatusBarItem onClick={() => console.log('Position clicked')} tooltip="Go to Line/Column">
          Ln 42, Col 15
        </StatusBarItem>

        <StatusBarItem onClick={() => console.log('Spaces clicked')} tooltip="Indent Using Spaces">
          Spaces: 2
        </StatusBarItem>

        <StatusBarItem onClick={() => console.log('Encoding clicked')} tooltip="Select Encoding">
          UTF-8
        </StatusBarItem>

        <StatusBarItem onClick={() => console.log('Line ending clicked')} tooltip="Select End of Line Sequence">
          LF
        </StatusBarItem>

        <StatusBarItem onClick={() => console.log('Language clicked')} tooltip="Select Language Mode">
          TypeScript React
        </StatusBarItem>

        <StatusBarItem icon={<Icon name="feedback" />} onClick={() => console.log('Feedback clicked')} tooltip="Send Feedback" />

        <StatusBarItem icon={<Icon name="bell" />} onClick={() => console.log('Notifications clicked')} tooltip="Notifications" />
      </StatusBarSection>
    </StatusBar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example mimicking VSCode\'s status bar with common items: remote connection, git status, errors/warnings, cursor position, file settings, and notifications.',
      },
    },
  },
};

/**
 * Minimal status bar with only essential items.
 */
export const Minimal: Story = {
  render: () => (
    <StatusBar>
      <StatusBarSection align="left">
        <StatusBarItem icon={<Icon name="git-branch" />}>
          main
        </StatusBarItem>
      </StatusBarSection>

      <StatusBarSection align="right">
        <StatusBarItem>Ln 1, Col 1</StatusBarItem>
        <StatusBarItem>UTF-8</StatusBarItem>
      </StatusBarSection>
    </StatusBar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A minimal status bar showing only essential information: git branch, cursor position, and file encoding.',
      },
    },
  },
};

/**
 * Status bar in different container contexts.
 */
export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--spacing-3)',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-background)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-base)' }}>Editor Window</h3>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          padding: 'var(--spacing-4)',
          background: 'var(--color-background)',
          fontFamily: 'monospace',
          fontSize: 'var(--font-size-sm)',
          overflow: 'auto',
        }}
      >
        <div>const greeting = "Hello, World!";</div>
        <div>console.log(greeting);</div>
        <div></div>
        <div>function add(a: number, b: number) {'{'}</div>
        <div>  return a + b;</div>
        <div>{'}'}</div>
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status bar positioned at the bottom of a container, demonstrating typical usage in an editor or application window layout.',
      },
    },
  },
};

/**
 * Status bar items with dropdowns that open upward (above the status bar).
 */
export const WithDropdowns: Story = {
  render: () => {
    const DropdownExample = () => {
      const [selectedBranch, setSelectedBranch] = useState('main');
      const [selectedEncoding, setSelectedEncoding] = useState('UTF-8');
      const [selectedLanguage, setSelectedLanguage] = useState('TypeScript');

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '300px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {/* Content Area */}
          <div
            style={{
              flex: 1,
              padding: 'var(--spacing-4)',
              background: 'var(--color-background)',
            }}
          >
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>
              Click on status bar items to open dropdowns
            </div>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>
              Branch: <strong>{selectedBranch}</strong> |
              Encoding: <strong>{selectedEncoding}</strong> |
              Language: <strong>{selectedLanguage}</strong>
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar>
            <StatusBarSection align="left">
              {/* Git Branch Dropdown */}
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

              {/* Encoding Dropdown */}
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
                  <MenuItem
                    selected={selectedEncoding === 'ISO-8859-1'}
                    onClick={() => setSelectedEncoding('ISO-8859-1')}
                  >
                    ISO-8859-1
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<Icon name="gear" />}>
                    Configure File Encoding...
                  </MenuItem>
                </Menu>
              </Dropdown>

              <StatusBarItem>LF</StatusBarItem>

              {/* Language Mode Dropdown */}
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
                  <MenuItem
                    icon={<Icon name="symbol-keyword" />}
                    selected={selectedLanguage === 'Rust'}
                    onClick={() => setSelectedLanguage('Rust')}
                  >
                    Rust
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<Icon name="gear" />}>
                    Configure File Associations...
                  </MenuItem>
                </Menu>
              </Dropdown>
            </StatusBarSection>
          </StatusBar>
        </div>
      );
    };

    return <DropdownExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Status bar items can trigger dropdowns that open upward using `placement="top-start"` or `placement="top-end"`. This is essential for status bars at the bottom of the screen. Demonstrates branch selection, encoding selection, and language mode switching with dropdowns.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all status bar capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-6)',
        padding: 'var(--spacing-4)',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Basic Layout
        </h3>
        <StatusBar>
          <StatusBarSection align="left">
            <StatusBarItem>Left Section</StatusBarItem>
          </StatusBarSection>
          <StatusBarSection align="right">
            <StatusBarItem>Right Section</StatusBarItem>
          </StatusBarSection>
        </StatusBar>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          With Icons
        </h3>
        <StatusBar>
          <StatusBarSection>
            <StatusBarItem icon={<Icon name="git-branch" />}>main</StatusBarItem>
            <StatusBarItem icon={<Icon name="error" />} variant="error">2</StatusBarItem>
            <StatusBarItem icon={<Icon name="warning" />} variant="warning">4</StatusBarItem>
            <StatusBarItem icon={<Icon name="bell" />} />
          </StatusBarSection>
        </StatusBar>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          Color Variants
        </h3>
        <StatusBar>
          <StatusBarSection>
            <StatusBarItem variant="default">Default</StatusBarItem>
            <StatusBarItem variant="error">Error</StatusBarItem>
            <StatusBarItem variant="warning">Warning</StatusBarItem>
            <StatusBarItem variant="info">Info</StatusBarItem>
            <StatusBarItem variant="success">Success</StatusBarItem>
          </StatusBarSection>
        </StatusBar>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
          VSCode-Style Complete
        </h3>
        <StatusBar>
          <StatusBarSection align="left">
            <StatusBarItem icon={<Icon name="remote" />}>SSH: server</StatusBarItem>
            <StatusBarItem icon={<Icon name="git-branch" />}>main</StatusBarItem>
            <StatusBarItem icon={<Icon name="error" />} variant="error">0</StatusBarItem>
            <StatusBarItem icon={<Icon name="warning" />} variant="warning">0</StatusBarItem>
          </StatusBarSection>
          <StatusBarSection align="right">
            <StatusBarItem>Ln 1, Col 1</StatusBarItem>
            <StatusBarItem>Spaces: 2</StatusBarItem>
            <StatusBarItem>UTF-8</StatusBarItem>
            <StatusBarItem>LF</StatusBarItem>
            <StatusBarItem>TypeScript</StatusBarItem>
            <StatusBarItem icon={<Icon name="bell" />} />
          </StatusBarSection>
        </StatusBar>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all status bar capabilities: basic layout, icons, color variants, and a complete VSCode-style implementation.',
      },
    },
  },
};
