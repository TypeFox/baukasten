'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Heading } from 'baukasten-ui/core';
import { SplitPane } from 'baukasten-ui/extra';

const splitPaneProps: PropDefinition[] = [
    {
        name: 'orientation',
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: 'Orientation of the split panes (horizontal: left-right, vertical: top-bottom)',
    },
    {
        name: 'minSize',
        type: 'number',
        default: '50',
        description: 'Default minimum size in pixels for all panes (can be overridden per pane)',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Should be SplitPane.Pane components',
    },
    {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        description: 'Deprecated: Use orientation="vertical" instead',
    },
];

const paneProps: PropDefinition[] = [
    {
        name: 'minSize',
        type: 'number',
        description: 'Minimum size in pixels for this pane',
    },
    {
        name: 'maxSize',
        type: 'number',
        description: 'Maximum size in pixels for this pane',
    },
    {
        name: 'preferredSize',
        type: 'number',
        description: 'Preferred/initial size in pixels or as a fraction (0-1 for proportional sizing)',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Content to display in the pane',
    },
];

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
        color: 'var(--vscode-foreground)',
        fontSize: 'var(--bk-font-size-md)',
        fontWeight: 'var(--bk-font-weight-medium)',
        padding: 'var(--bk-spacing-4)',
        overflow: 'auto',
        boxSizing: 'border-box',
        textAlign: 'center',
    }}>
        {children}
    </div>
);

const CodeEditor = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--vscode-editor-background)',
        padding: 'var(--bk-spacing-4)',
        fontFamily: 'var(--vscode-editor-font-family)',
        fontSize: 'var(--vscode-editor-font-size)',
        color: 'var(--vscode-editor-foreground)',
        overflow: 'auto',
        boxSizing: 'border-box',
    }}>
        {children}
    </div>
);

const Sidebar = ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--vscode-sideBar-background)',
        padding: 'var(--bk-spacing-4)',
        color: 'var(--vscode-sideBar-foreground)',
        overflow: 'auto',
        boxSizing: 'border-box',
        borderRight: '1px solid var(--vscode-sideBar-border)',
    }}>
        {title && (
            <h4 style={{
                margin: '0 0 var(--bk-spacing-3) 0',
                fontSize: 'var(--bk-font-size-sm)',
                fontWeight: 'var(--bk-font-weight-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
            }}>
                {title}
            </h4>
        )}
        {children}
    </div>
);

const Panel = ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--vscode-panel-background)',
        padding: 'var(--bk-spacing-4)',
        color: 'var(--vscode-panel-foreground)',
        overflow: 'auto',
        boxSizing: 'border-box',
        borderTop: '1px solid var(--vscode-panel-border)',
    }}>
        {title && (
            <div style={{
                marginBottom: 'var(--bk-spacing-2)',
                fontSize: 'var(--bk-font-size-sm)',
                fontWeight: 'var(--bk-font-weight-semibold)',
            }}>
                {title}
            </div>
        )}
        {children}
    </div>
);

// Container for examples
const ExampleContainer = ({ children, height = '500px' }: { children: React.ReactNode; height?: string }) => (
    <div style={{
        width: '100%',
        height,
        border: '1px solid var(--vscode-panel-border)',
        borderRadius: 'var(--bk-radius-md)',
        overflow: 'hidden',
    }}>
        {children}
    </div>
);

// Interactive VSCode-style layout
function VSCodeLayoutExample() {
    return (
        <ExampleContainer height="600px">
            <SplitPane orientation="horizontal">
                <SplitPane.Pane minSize={200} maxSize={400} preferredSize={250}>
                    <Sidebar title="EXPLORER">
                        <div style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6 }}>
                            <div>📁 src</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 App.tsx</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 index.tsx</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 main.tsx</div>
                            <div style={{ marginTop: 'var(--bk-spacing-2)' }}>📁 components</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 Button.tsx</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 Input.tsx</div>
                            <div style={{ marginTop: 'var(--bk-spacing-2)' }}>📁 styles</div>
                            <div style={{ paddingLeft: 'var(--bk-spacing-4)' }}>📄 main.css</div>
                        </div>
                    </Sidebar>
                </SplitPane.Pane>
                <SplitPane.Pane>
                    <SplitPane orientation="vertical">
                        <SplitPane.Pane preferredSize={0.7}>
                            <SplitPane orientation="horizontal">
                                <SplitPane.Pane>
                                    <CodeEditor>
                                        <div style={{ marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                            App.tsx
                                        </div>
                                        <div>{"import React from 'react';"}</div>
                                        <div>{""}</div>
                                        <div>{"export const App = () => {"}</div>
                                        <div>{"  return ("}</div>
                                        <div>{"    <div>"}</div>
                                        <div>{"      <h1>Hello World</h1>"}</div>
                                        <div>{"    </div>"}</div>
                                        <div>{"  );"}</div>
                                        <div>{"};"}</div>
                                    </CodeEditor>
                                </SplitPane.Pane>
                                <SplitPane.Pane>
                                    <CodeEditor>
                                        <div style={{ marginBottom: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                            SplitPane.tsx
                                        </div>
                                        <div>{"import { SplitPane } from 'baukasten-ui/extra';"}</div>
                                        <div>{""}</div>
                                        <div>{"const Layout = () => ("}</div>
                                        <div>{"  <SplitPane orientation=\"horizontal\">"}</div>
                                        <div>{"    <SplitPane.Pane minSize={200}>"}</div>
                                        <div>{"      <Sidebar />"}</div>
                                        <div>{"    </SplitPane.Pane>"}</div>
                                        <div>{"    <SplitPane.Pane>"}</div>
                                        <div>{"      <Editor />"}</div>
                                        <div>{"    </SplitPane.Pane>"}</div>
                                        <div>{"  </SplitPane>"}</div>
                                        <div>{");"}</div>
                                    </CodeEditor>
                                </SplitPane.Pane>
                            </SplitPane>
                        </SplitPane.Pane>
                        <SplitPane.Pane minSize={100} maxSize={400} preferredSize={200}>
                            <Panel title="PROBLEMS">
                                <div style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                    No problems detected.
                                </div>
                            </Panel>
                        </SplitPane.Pane>
                    </SplitPane>
                </SplitPane.Pane>
            </SplitPane>
        </ExampleContainer>
    );
}

export default function SplitPanePage() {
    return (
        <PageLayout
            title="SplitPane"
            description="A resizable split pane component for creating dynamic layouts. Perfect for VSCode-style editor groups, sidebars, and panels with draggable dividers that highlight on interaction."
        >
            <Showcase
                title="Basic Usage"
                description="SplitPane divides space between two or more panes with draggable dividers. Use SplitPane.Pane for each section. Drag the divider to resize the panes."
                preview={
                    <ExampleContainer>
                        <SplitPane orientation="horizontal">
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                    Left Pane
                                    <div style={{ fontSize: 'var(--bk-font-size-sm)', marginTop: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                        Drag the divider →
                                    </div>
                                </DemoContent>
                            </SplitPane.Pane>
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                    Right Pane
                                </DemoContent>
                            </SplitPane.Pane>
                        </SplitPane>
                    </ExampleContainer>
                }
                code={`import { SplitPane } from 'baukasten-ui/extra';

function App() {
  return (
    <SplitPane orientation="horizontal">
      <SplitPane.Pane>
        <div>Left Pane Content</div>
      </SplitPane.Pane>
      <SplitPane.Pane>
        <div>Right Pane Content</div>
      </SplitPane.Pane>
    </SplitPane>
  );
}`}
                props={splitPaneProps}
            />

            <Showcase
                title="Orientations"
                description="SplitPane supports two orientations: horizontal (left-right split) and vertical (top-bottom split)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Horizontal (default)
                            </div>
                            <ExampleContainer height="300px">
                                <SplitPane orientation="horizontal">
                                    <SplitPane.Pane>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                            Left
                                        </DemoContent>
                                    </SplitPane.Pane>
                                    <SplitPane.Pane>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                            Right
                                        </DemoContent>
                                    </SplitPane.Pane>
                                </SplitPane>
                            </ExampleContainer>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Vertical
                            </div>
                            <ExampleContainer height="300px">
                                <SplitPane orientation="vertical">
                                    <SplitPane.Pane>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-charts-orange) 30%, transparent)">
                                            Top
                                        </DemoContent>
                                    </SplitPane.Pane>
                                    <SplitPane.Pane>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-charts-red) 30%, transparent)">
                                            Bottom
                                        </DemoContent>
                                    </SplitPane.Pane>
                                </SplitPane>
                            </ExampleContainer>
                        </div>
                    </div>
                }
                code={`// Horizontal (left-right)
<SplitPane orientation="horizontal">
  <SplitPane.Pane>Left</SplitPane.Pane>
  <SplitPane.Pane>Right</SplitPane.Pane>
</SplitPane>

// Vertical (top-bottom)
<SplitPane orientation="vertical">
  <SplitPane.Pane>Top</SplitPane.Pane>
  <SplitPane.Pane>Bottom</SplitPane.Pane>
</SplitPane>`}
            />

            <Showcase
                title="Multiple Panes"
                description="Add more than two panes to create complex layouts. Each adjacent pair of panes gets its own draggable divider."
                preview={
                    <ExampleContainer>
                        <SplitPane orientation="horizontal">
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                    Pane 1
                                </DemoContent>
                            </SplitPane.Pane>
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                    Pane 2
                                </DemoContent>
                            </SplitPane.Pane>
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-charts-orange) 30%, transparent)">
                                    Pane 3
                                </DemoContent>
                            </SplitPane.Pane>
                        </SplitPane>
                    </ExampleContainer>
                }
                code={`<SplitPane orientation="horizontal">
  <SplitPane.Pane>
    <div>Pane 1</div>
  </SplitPane.Pane>
  <SplitPane.Pane>
    <div>Pane 2</div>
  </SplitPane.Pane>
  <SplitPane.Pane>
    <div>Pane 3</div>
  </SplitPane.Pane>
</SplitPane>`}
            />

            <Showcase
                title="Size Constraints"
                description="Control pane sizes with minSize and maxSize props. Panes cannot be resized beyond these constraints."
                preview={
                    <ExampleContainer>
                        <SplitPane orientation="horizontal">
                            <SplitPane.Pane minSize={200}>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                    Min 200px
                                    <div style={{ fontSize: 'var(--bk-font-size-sm)', marginTop: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                        Try to make me smaller!
                                    </div>
                                </DemoContent>
                            </SplitPane.Pane>
                            <SplitPane.Pane minSize={150} maxSize={400}>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                    150px - 400px
                                    <div style={{ fontSize: 'var(--bk-font-size-sm)', marginTop: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                        I have both min and max!
                                    </div>
                                </DemoContent>
                            </SplitPane.Pane>
                        </SplitPane>
                    </ExampleContainer>
                }
                code={`<SplitPane orientation="horizontal">
  <SplitPane.Pane minSize={200}>
    <div>Min 200px</div>
  </SplitPane.Pane>
  <SplitPane.Pane minSize={150} maxSize={400}>
    <div>150px - 400px range</div>
  </SplitPane.Pane>
</SplitPane>`}
            />

            <Showcase
                title="Preferred Sizes"
                description="Set initial sizes with preferredSize. Use pixels for fixed sizes or values between 0-1 for proportional sizing (e.g., 0.3 = 30% of available space)."
                preview={
                    <ExampleContainer>
                        <SplitPane orientation="horizontal">
                            <SplitPane.Pane preferredSize={200}>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                    200px initial
                                </DemoContent>
                            </SplitPane.Pane>
                            <SplitPane.Pane preferredSize={0.7}>
                                <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                    70% initial
                                    <div style={{ fontSize: 'var(--bk-font-size-sm)', marginTop: 'var(--bk-spacing-2)', color: 'var(--vscode-descriptionForeground)' }}>
                                        (preferredSize: 0.7)
                                    </div>
                                </DemoContent>
                            </SplitPane.Pane>
                        </SplitPane>
                    </ExampleContainer>
                }
                code={`<SplitPane orientation="horizontal">
  {/* Fixed size in pixels */}
  <SplitPane.Pane preferredSize={200}>
    <div>200px initial</div>
  </SplitPane.Pane>
  
  {/* Proportional size (70% of available space) */}
  <SplitPane.Pane preferredSize={0.7}>
    <div>70% initial</div>
  </SplitPane.Pane>
</SplitPane>`}
            />

            <Showcase
                title="Nested Split Panes"
                description="Nest SplitPane components to create complex layouts like VSCode's editor groups with sidebars and panels."
                preview={
                    <ExampleContainer height="600px">
                        <SplitPane orientation="vertical">
                            <SplitPane.Pane preferredSize={0.7}>
                                <SplitPane orientation="horizontal">
                                    <SplitPane.Pane minSize={150}>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-button-background) 20%, transparent)">
                                            Top Left
                                        </DemoContent>
                                    </SplitPane.Pane>
                                    <SplitPane.Pane>
                                        <DemoContent color="color-mix(in srgb, var(--vscode-button-secondaryBackground) 40%, transparent)">
                                            Top Right
                                        </DemoContent>
                                    </SplitPane.Pane>
                                </SplitPane>
                            </SplitPane.Pane>
                            <SplitPane.Pane>
                                <DemoContent color="color-mix(in srgb, var(--vscode-charts-orange) 30%, transparent)">
                                    Bottom Panel
                                </DemoContent>
                            </SplitPane.Pane>
                        </SplitPane>
                    </ExampleContainer>
                }
                code={`<SplitPane orientation="vertical">
  <SplitPane.Pane preferredSize={0.7}>
    {/* Nested horizontal split */}
    <SplitPane orientation="horizontal">
      <SplitPane.Pane minSize={150}>
        <div>Top Left</div>
      </SplitPane.Pane>
      <SplitPane.Pane>
        <div>Top Right</div>
      </SplitPane.Pane>
    </SplitPane>
  </SplitPane.Pane>
  <SplitPane.Pane>
    <div>Bottom Panel</div>
  </SplitPane.Pane>
</SplitPane>`}
            />

            <Showcase
                title="VSCode-Style Layout"
                description="Complete VSCode-style layout with resizable sidebar, split editor groups, and bottom panel. All dividers are draggable and highlight in blue during interaction."
                preview={<VSCodeLayoutExample />}
                code={`import { SplitPane } from 'baukasten-ui/extra';

function IDELayout() {
  return (
    <SplitPane orientation="horizontal">
      {/* Sidebar */}
      <SplitPane.Pane minSize={200} maxSize={400} preferredSize={250}>
        <Sidebar title="EXPLORER">
          <div>📁 src</div>
          <div>  📄 App.tsx</div>
          <div>  📄 index.tsx</div>
          <div>📁 components</div>
          <div>📁 styles</div>
        </Sidebar>
      </SplitPane.Pane>
      
      {/* Main content area */}
      <SplitPane.Pane>
        <SplitPane orientation="vertical">
          {/* Editor groups */}
          <SplitPane.Pane preferredSize={0.7}>
            <SplitPane orientation="horizontal">
              <SplitPane.Pane>
                <CodeEditor>App.tsx content...</CodeEditor>
              </SplitPane.Pane>
              <SplitPane.Pane>
                <CodeEditor>SplitPane.tsx content...</CodeEditor>
              </SplitPane.Pane>
            </SplitPane>
          </SplitPane.Pane>
          
          {/* Bottom panel */}
          <SplitPane.Pane minSize={100} maxSize={400} preferredSize={200}>
            <Panel title="PROBLEMS">
              No problems detected.
            </Panel>
          </SplitPane.Pane>
        </SplitPane>
      </SplitPane.Pane>
    </SplitPane>
  );
}`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    SplitPane.Pane Props
                </Heading>
                <div style={{
                    padding: 'var(--bk-spacing-4)',
                    backgroundColor: 'var(--vscode-textBlockQuote-background)',
                    borderRadius: 'var(--bk-radius-md)',
                }}>
                    {paneProps.map((prop, index) => (
                        <div key={index} style={{ marginBottom: index < paneProps.length - 1 ? 'var(--bk-spacing-3)' : 0 }}>
                            <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)', alignItems: 'baseline', marginBottom: 'var(--bk-spacing-1)' }}>
                                <code style={{
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontFamily: 'var(--vscode-editor-font-family)',
                                    color: 'var(--vscode-textLink-foreground)',
                                }}>
                                    {prop.name}
                                </code>
                                {prop.required && (
                                    <span style={{
                                        fontSize: 'var(--bk-font-size-xs)',
                                        color: 'var(--vscode-errorForeground)',
                                        fontWeight: 'var(--bk-font-weight-semibold)',
                                    }}>
                                        required
                                    </span>
                                )}
                            </div>
                            <div style={{
                                fontSize: 'var(--bk-font-size-xs)',
                                fontFamily: 'var(--vscode-editor-font-family)',
                                color: 'var(--vscode-descriptionForeground)',
                                marginBottom: 'var(--bk-spacing-1)',
                            }}>
                                {prop.type}
                                {prop.default && ` = ${prop.default}`}
                            </div>
                            <div style={{ fontSize: 'var(--bk-font-size-sm)' }}>
                                {prop.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                marginTop: 'var(--bk-spacing-6)',
                padding: 'var(--bk-spacing-4)',
                backgroundColor: 'var(--vscode-textBlockQuote-background)',
                borderRadius: 'var(--bk-radius-md)',
            }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Behavior & Interaction
                </Heading>
                <ul style={{
                    fontSize: 'var(--bk-font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--bk-spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Draggable Dividers:</strong> Click and drag the divider between panes to resize them
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Hover State:</strong> Dividers highlight after a 200ms delay (VSCode-like behavior) to reduce visual noise
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Active State:</strong> Dividers turn blue while being dragged
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Cursor Feedback:</strong> Cursor changes to resize cursor when hovering over dividers
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Constraint Enforcement:</strong> Panes respect minSize and maxSize during resizing
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Responsive Sizing:</strong> Panes resize proportionally when the container size changes
                    </li>
                    <li>
                        <strong>Nested Support:</strong> SplitPane components can be nested infinitely for complex layouts
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
                    Use Cases
                </Heading>
                <ul style={{
                    fontSize: 'var(--bk-font-size-sm)',
                    lineHeight: 1.6,
                    color: 'var(--vscode-descriptionForeground)',
                    marginLeft: 'var(--bk-spacing-4)',
                }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Code Editors:</strong> Create VSCode-style layouts with sidebars, editor groups, and panels
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>File Explorers:</strong> Split view for directory tree and file preview
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Data Viewers:</strong> Side-by-side comparison views or master-detail layouts
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Dashboard Panels:</strong> Resizable dashboard sections for customizable layouts
                    </li>
                    <li>
                        <strong>Documentation:</strong> Split view for documentation and live examples
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
