import type { Meta, StoryObj } from "@storybook/react";
import { SplitPane } from "./SplitPane";

const meta = {
  title: "Components/SplitPane",
  component: SplitPane,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A resizable split pane component for creating dynamic layouts. Supports both horizontal and vertical orientations with draggable dividers that highlight on interaction. Perfect for VSCode-style editor groups, sidebars, and panels.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the split panes",
      table: {
        defaultValue: { summary: "horizontal" },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    vertical: {
      control: "boolean",
      description: "Deprecated: Use orientation instead. Sets vertical layout.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    minSize: {
      control: "number",
      description: "Default minimum size for all panes (can be overridden per pane)",
      table: {
        defaultValue: { summary: "50" },
      },
    },
    children: {
      control: false,
      description: "Should be SplitPane.Pane components",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} satisfies Meta<typeof SplitPane>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo content components
const DemoContent = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
    color: 'var(--color-foreground)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-semibold)',
    padding: 'var(--padding-lg)',
    overflow: 'auto',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    textAlign: 'center',
  }}>
    {children}
  </div>
);

const CodeEditor = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--color-background-secondary)',
    padding: 'var(--padding-md)',
    fontFamily: 'var(--font-family-monospace)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-foreground)',
    overflow: 'auto',
    boxSizing: 'border-box',
  }}>
    {children}
  </div>
);

const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--color-background-tertiary)',
    padding: 'var(--padding-md)',
    color: 'var(--color-foreground)',
    overflow: 'auto',
    boxSizing: 'border-box',
  }}>
    {children}
  </div>
);

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--color-background)',
    padding: 'var(--padding-md)',
    color: 'var(--color-foreground)',
    overflow: 'auto',
    boxSizing: 'border-box',
    borderTop: '1px solid var(--color-border)',
  }}>
    {children}
  </div>
);

// Container for stories
const StoryContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    height: '600px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);

/**
 * Interactive playground to experiment with all SplitPane properties.
 * Try dragging the dividers to resize panes!
 */
export const Interactive: Story = {
  args: {
    orientation: "horizontal",
    minSize: 50,
    children: null,
  },
  render: (args) => (
    <StoryContainer>
      <SplitPane {...args}>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
            Pane 1
            <br />
            <small style={{ fontSize: "var(--font-size-sm)" }}>
              Drag the divider to resize
            </small>
          </DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
            Pane 2
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The interactive playground allows you to experiment with different orientations and settings. Drag the divider between panes to resize them.",
      },
    },
  },
};

/**
 * Horizontal split panes (default orientation).
 */
export const Horizontal: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">Left Pane</DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
            Right Pane
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal split panes divide the space left-to-right.",
      },
    },
  },
};

/**
 * Vertical split panes.
 */
export const Vertical: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="vertical">
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">Top Pane</DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-danger) 15%, transparent)">
            Bottom Pane
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical split panes divide the space top-to-bottom.",
      },
    },
  },
};

/**
 * Three panes with equal distribution.
 */
export const ThreePanes: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">Pane 1</DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
            Pane 2
          </DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
            Pane 3
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Split panes support multiple panes with individual resize controls.",
      },
    },
  },
};

/**
 * Panes with minimum size constraints.
 */
export const WithMinSize: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane minSize={200}>
          <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
            Min 200px
            <br />
            <small style={{ fontSize: "var(--font-size-sm)" }}>
              Try to make me smaller!
            </small>
          </DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane minSize={150}>
          <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
            Min 150px
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set minimum size constraints on panes to prevent them from becoming too small. Try dragging the divider - the panes won't go below their minimum sizes.",
      },
    },
  },
};

/**
 * Panes with maximum size constraints.
 */
export const WithMaxSize: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane maxSize={400}>
          <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
            Max 400px
            <br />
            <small style={{ fontSize: "var(--font-size-sm)" }}>
              Try to make me bigger!
            </small>
          </DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-danger) 15%, transparent)">
            No max size
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set maximum size constraints on panes to prevent them from growing too large.",
      },
    },
  },
};

/**
 * Panes with preferred initial sizes.
 */
export const WithPreferredSizes: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane preferredSize={200}>
          <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
            200px initial
          </DemoContent>
        </SplitPane.Pane>
        <SplitPane.Pane preferredSize={0.7}>
          <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
            70% initial
            <br />
            <small style={{ fontSize: "var(--font-size-sm)" }}>
              (preferredSize: 0.7)
            </small>
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set preferred initial sizes for panes. Use pixels for fixed sizes or values between 0-1 for proportional sizes.",
      },
    },
  },
};

/**
 * Nested split panes for complex layouts.
 */
export const Nested: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="vertical">
        <SplitPane.Pane preferredSize={0.7}>
          <SplitPane orientation="horizontal">
            <SplitPane.Pane minSize={150}>
              <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
                Top Left
              </DemoContent>
            </SplitPane.Pane>
            <SplitPane.Pane>
              <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
                Top Right
              </DemoContent>
            </SplitPane.Pane>
          </SplitPane>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
            Bottom Panel
          </DemoContent>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Nest split panes to create complex layouts like VSCode's editor groups with panels.",
      },
    },
  },
};

/**
 * VSCode-style editor layout with sidebar, editor groups, and bottom panel.
 */
export const VSCodeLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StoryContainer>
      <SplitPane orientation="horizontal">
        <SplitPane.Pane minSize={200} maxSize={400} preferredSize={250}>
          <Sidebar>
            <h3 style={{ margin: "0 0 var(--padding-md) 0" }}>EXPLORER</h3>
            <div>📁 src</div>
            <div style={{ paddingLeft: "var(--padding-md)" }}>📄 App.tsx</div>
            <div style={{ paddingLeft: "var(--padding-md)" }}>📄 index.tsx</div>
            <div>📁 components</div>
            <div>📁 styles</div>
          </Sidebar>
        </SplitPane.Pane>
        <SplitPane.Pane>
          <SplitPane orientation="vertical">
            <SplitPane.Pane preferredSize={0.7}>
              <SplitPane orientation="horizontal">
                <SplitPane.Pane>
                  <CodeEditor>
                    <div>{"import React from 'react';"}</div>
                    <div>{""}</div>
                    <div>{"export const App = () => {"}</div>
                    <div>{"  return <div>Hello World</div>;"}</div>
                    <div>{"};"}</div>
                  </CodeEditor>
                </SplitPane.Pane>
                <SplitPane.Pane>
                  <CodeEditor>
                    <div>{"import { SplitPane } from 'baukasten-ui';"}</div>
                    <div>{""}</div>
                    <div>{"const Layout = () => ("}</div>
                    <div>{"  <SplitPane>"}</div>
                    <div>{"    <SplitPane.Pane>...</SplitPane.Pane>"}</div>
                    <div>{"  </SplitPane>"}</div>
                    <div>{");"}</div>
                  </CodeEditor>
                </SplitPane.Pane>
              </SplitPane>
            </SplitPane.Pane>
            <SplitPane.Pane minSize={100} maxSize={400} preferredSize={200}>
              <Panel>
                <strong>PROBLEMS</strong>
                <div style={{ marginTop: "var(--padding-sm)" }}>
                  No problems detected.
                </div>
              </Panel>
            </SplitPane.Pane>
          </SplitPane>
        </SplitPane.Pane>
      </SplitPane>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A complete VSCode-style layout with a resizable sidebar, split editor groups, and a bottom panel. All dividers are draggable and highlight in primary color during interaction.",
      },
    },
  },
};

/**
 * Comprehensive showcase of all split pane features and variations.
 */
export const Showcase: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div
      style={{
        padding: "var(--padding-xl)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-xl)",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "var(--padding-md)" }}>
          Basic Split Panes
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--gap-lg)",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "var(--padding-sm)" }}>Horizontal</h3>
            <div style={{ height: "300px", border: "1px solid var(--color-border)" }}>
              <SplitPane orientation="horizontal">
                <SplitPane.Pane>
                  <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
                    Left
                  </DemoContent>
                </SplitPane.Pane>
                <SplitPane.Pane>
                  <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
                    Right
                  </DemoContent>
                </SplitPane.Pane>
              </SplitPane>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "var(--padding-sm)" }}>Vertical</h3>
            <div style={{ height: "300px", border: "1px solid var(--color-border)" }}>
              <SplitPane orientation="vertical">
                <SplitPane.Pane>
                  <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
                    Top
                  </DemoContent>
                </SplitPane.Pane>
                <SplitPane.Pane>
                  <DemoContent color="color-mix(in srgb, var(--color-danger) 15%, transparent)">
                    Bottom
                  </DemoContent>
                </SplitPane.Pane>
              </SplitPane>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "var(--padding-md)" }}>
          Multiple Panes
        </h2>
        <div style={{ height: "300px", border: "1px solid var(--color-border)" }}>
          <SplitPane orientation="horizontal">
            <SplitPane.Pane>
              <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
                Pane 1
              </DemoContent>
            </SplitPane.Pane>
            <SplitPane.Pane>
              <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
                Pane 2
              </DemoContent>
            </SplitPane.Pane>
            <SplitPane.Pane>
              <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
                Pane 3
              </DemoContent>
            </SplitPane.Pane>
            <SplitPane.Pane>
              <DemoContent color="color-mix(in srgb, var(--color-danger) 15%, transparent)">
                Pane 4
              </DemoContent>
            </SplitPane.Pane>
          </SplitPane>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "var(--padding-md)" }}>
          Constraints & Sizing
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--gap-lg)",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "var(--padding-sm)" }}>Min/Max Size</h3>
            <div style={{ height: "300px", border: "1px solid var(--color-border)" }}>
              <SplitPane orientation="horizontal">
                <SplitPane.Pane minSize={150} maxSize={300}>
                  <DemoContent color="color-mix(in srgb, var(--color-info) 15%, transparent)">
                    150-300px
                  </DemoContent>
                </SplitPane.Pane>
                <SplitPane.Pane minSize={200}>
                  <DemoContent color="color-mix(in srgb, var(--color-success) 15%, transparent)">
                    Min 200px
                  </DemoContent>
                </SplitPane.Pane>
              </SplitPane>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "var(--padding-sm)" }}>
              Preferred Sizes
            </h3>
            <div style={{ height: "300px", border: "1px solid var(--color-border)" }}>
              <SplitPane orientation="horizontal">
                <SplitPane.Pane preferredSize={200}>
                  <DemoContent color="color-mix(in srgb, var(--color-warning) 15%, transparent)">
                    200px
                  </DemoContent>
                </SplitPane.Pane>
                <SplitPane.Pane preferredSize={0.7}>
                  <DemoContent color="color-mix(in srgb, var(--color-danger) 15%, transparent)">
                    70%
                  </DemoContent>
                </SplitPane.Pane>
              </SplitPane>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "var(--padding-md)" }}>Nested Layout</h2>
        <div style={{ height: "400px", border: "1px solid var(--color-border)" }}>
          <SplitPane orientation="horizontal">
            <SplitPane.Pane preferredSize={250}>
              <Sidebar>
                <strong>Sidebar</strong>
              </Sidebar>
            </SplitPane.Pane>
            <SplitPane.Pane>
              <SplitPane orientation="vertical">
                <SplitPane.Pane>
                  <CodeEditor>Editor Area</CodeEditor>
                </SplitPane.Pane>
                <SplitPane.Pane preferredSize={150}>
                  <Panel>Bottom Panel</Panel>
                </SplitPane.Pane>
              </SplitPane>
            </SplitPane.Pane>
          </SplitPane>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "A comprehensive showcase of all SplitPane features including orientations, multiple panes, constraints, and nested layouts.",
      },
    },
  },
};
