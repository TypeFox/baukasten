'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Button, Input, FieldLabel, Checkbox, Label } from '@baukasten/ui';

const tabsProps: PropDefinition[] = [
    { name: 'value', type: 'string', description: 'Currently active tab value (controlled mode)' },
    { name: 'defaultValue', type: 'string', description: 'Default active tab value (uncontrolled mode)' },
    { name: 'onChange', type: '(value: string) => void', description: 'Callback when active tab changes' },
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Orientation of the tabs' },
    { name: 'variant', type: '"line" | "lifted" | "pills"', default: '"line"', description: 'Visual variant of the tabs' },
    { name: 'indicatorPosition', type: '"start" | "end"', default: '"end"', description: 'Position of the active indicator (start: top/left, end: bottom/right)' },
    { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size of the tabs' },
];

const tabProps: PropDefinition[] = [
    { name: 'value', type: 'string', required: true, description: 'Unique value identifying this tab' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Tab label content' },
    { name: 'icon', type: 'CodiconName', description: 'Optional VSCode Codicon name' },
    { name: 'closable', type: 'boolean', default: 'false', description: 'Whether the tab can be closed' },
    { name: 'onClose', type: '(value: string) => void', description: 'Callback when close button is clicked' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the tab is disabled' },
];

// Example for closable tabs
function ClosableTabsExample() {
    const [tabs, setTabs] = useState([
        { value: 'file1', label: 'index.tsx', icon: 'file' as const },
        { value: 'file2', label: 'App.tsx', icon: 'file' as const },
        { value: 'file3', label: 'utils.ts', icon: 'symbol-method' as const },
    ]);
    const [activeTab, setActiveTab] = useState('file1');

    const handleClose = (value: string) => {
        const newTabs = tabs.filter(tab => tab.value !== value);
        setTabs(newTabs);

        // If closing active tab, switch to another tab
        if (value === activeTab && newTabs.length > 0) {
            setActiveTab(newTabs[0].value);
        }
    };

    if (tabs.length === 0) {
        return (
            <div style={{ padding: 'var(--spacing-8)', textAlign: 'center', color: 'var(--vscode-descriptionForeground)' }}>
                All tabs closed. Refresh to reset.
            </div>
        );
    }

    return (
        <Tabs value={activeTab} onChange={setActiveTab}>
            <TabList>
                {tabs.map(tab => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        icon={tab.icon}
                        closable
                        onClose={handleClose}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabs.map(tab => (
                    <TabPanel key={tab.value} value={tab.value}>
                        <h3 style={{ marginBottom: 'var(--spacing-2)' }}>{tab.label}</h3>
                        <p>Content for {tab.label}. Click the close button (×) to remove this tab.</p>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}

// Example for controlled tabs
function ControlledExample() {
    const [activeTab, setActiveTab] = useState('step1');

    const goToNextStep = () => {
        const steps = ['step1', 'step2', 'step3'];
        const currentIndex = steps.indexOf(activeTab);
        if (currentIndex < steps.length - 1) {
            setActiveTab(steps[currentIndex + 1]);
        }
    };

    const goToPreviousStep = () => {
        const steps = ['step1', 'step2', 'step3'];
        const currentIndex = steps.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(steps[currentIndex - 1]);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-3)', display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                    External controls:
                </span>
                <Button size="sm" onClick={goToPreviousStep} disabled={activeTab === 'step1'}>
                    Previous
                </Button>
                <Button size="sm" variant="primary" onClick={goToNextStep} disabled={activeTab === 'step3'}>
                    Next
                </Button>
            </div>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <TabList>
                    <Tab value="step1" icon="circle-large-filled">Step 1</Tab>
                    <Tab value="step2" icon="circle-large-outline">Step 2</Tab>
                    <Tab value="step3" icon="circle-large-outline">Step 3</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="step1">
                        <h3>Step 1: Basic Information</h3>
                        <p>Enter your basic information to get started.</p>
                        <div style={{ marginTop: 'var(--spacing-3)' }}>
                            <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                            <Input id="full-name" placeholder="John Doe" fullWidth />
                        </div>
                    </TabPanel>
                    <TabPanel value="step2">
                        <h3>Step 2: Contact Details</h3>
                        <p>Provide your contact information.</p>
                        <div style={{ marginTop: 'var(--spacing-3)' }}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" placeholder="john@example.com" fullWidth />
                        </div>
                    </TabPanel>
                    <TabPanel value="step3">
                        <h3>Step 3: Complete</h3>
                        <p>Review and submit your information.</p>
                        <Button variant="primary" style={{ marginTop: 'var(--spacing-3)' }}>Submit</Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default function TabsPage() {
    return (
        <PageLayout
            title="Tabs"
            description="A tabbed interface component following VSCode design patterns. Supports horizontal and vertical orientations, icons, closable tabs, and both controlled and uncontrolled modes. Perfect for organizing content into separate views."
        >
            <Showcase
                title="Basic Usage"
                description="Tabs use a composable API with Tabs, TabList, Tab, TabPanels, and TabPanel components. This provides full flexibility while maintaining consistent styling."
                preview={
                    <Tabs defaultValue="tab1">
                        <TabList>
                            <Tab value="tab1">Tab 1</Tab>
                            <Tab value="tab2">Tab 2</Tab>
                            <Tab value="tab3">Tab 3</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="tab1">
                                <p>Content for Tab 1</p>
                            </TabPanel>
                            <TabPanel value="tab2">
                                <p>Content for Tab 2</p>
                            </TabPanel>
                            <TabPanel value="tab3">
                                <p>Content for Tab 3</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                }
                code={`import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@baukasten/ui';

function App() {
  return (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="tab1">
          <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel value="tab2">
          <p>Content for Tab 2</p>
        </TabPanel>
        <TabPanel value="tab3">
          <p>Content for Tab 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}`}
                props={tabsProps}
            />

            <Showcase
                title="Variants"
                description="Three visual variants available: line (VSCode-style with indicator line), lifted (classic tabbed interface with borders), and pills (modern filled pills)."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Line (Default) - VSCode Style
                            </div>
                            <Tabs defaultValue="tab1" variant="line">
                                <TabList>
                                    <Tab value="tab1">Overview</Tab>
                                    <Tab value="tab2">Details</Tab>
                                    <Tab value="tab3">Settings</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="tab1">Clean line indicator at the bottom.</TabPanel>
                                    <TabPanel value="tab2">Perfect for professional interfaces.</TabPanel>
                                    <TabPanel value="tab3">Default variant with subtle active state.</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Lifted - Classic Tabbed Interface
                            </div>
                            <Tabs defaultValue="tab1" variant="lifted">
                                <TabList>
                                    <Tab value="tab1">Overview</Tab>
                                    <Tab value="tab2">Details</Tab>
                                    <Tab value="tab3">Settings</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="tab1">Active tab has a border that connects to content area.</TabPanel>
                                    <TabPanel value="tab2">Creates a "lifted" effect.</TabPanel>
                                    <TabPanel value="tab3">Classic tabbed interface style.</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Pills - Modern Tag Style
                            </div>
                            <Tabs defaultValue="tab1" variant="pills">
                                <TabList>
                                    <Tab value="tab1">Overview</Tab>
                                    <Tab value="tab2">Details</Tab>
                                    <Tab value="tab3">Settings</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="tab1">No borders, just subtle rounded corners.</TabPanel>
                                    <TabPanel value="tab2">Active tab has a filled background.</TabPanel>
                                    <TabPanel value="tab3">Modern, clean appearance.</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                }
                code={`// Line variant (default)
<Tabs defaultValue="tab1" variant="line">
  {/* ... */}
</Tabs>

// Lifted variant (classic tabs)
<Tabs defaultValue="tab1" variant="lifted">
  {/* ... */}
</Tabs>

// Pills variant (modern style)
<Tabs defaultValue="tab1" variant="pills">
  {/* ... */}
</Tabs>`}
            />

            <Showcase
                title="Orientations"
                description="Tabs support both horizontal (default) and vertical orientations. Horizontal tabs are common for content sections, while vertical tabs work well for navigation menus."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Horizontal (Default)
                            </div>
                            <Tabs defaultValue="home" orientation="horizontal">
                                <TabList>
                                    <Tab value="home">Home</Tab>
                                    <Tab value="profile">Profile</Tab>
                                    <Tab value="settings">Settings</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="home">
                                        <h3>Home Content</h3>
                                        <p>This is the home tab content with horizontal orientation.</p>
                                    </TabPanel>
                                    <TabPanel value="profile">
                                        <h3>Profile Content</h3>
                                        <p>User profile information goes here.</p>
                                    </TabPanel>
                                    <TabPanel value="settings">
                                        <h3>Settings Content</h3>
                                        <p>Application settings and preferences.</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Vertical
                            </div>
                            <Tabs defaultValue="dashboard" orientation="vertical" style={{ height: '300px' }}>
                                <TabList>
                                    <Tab value="dashboard">Dashboard</Tab>
                                    <Tab value="analytics">Analytics</Tab>
                                    <Tab value="reports">Reports</Tab>
                                    <Tab value="users">Users</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="dashboard">
                                        <h3>Dashboard</h3>
                                        <p>Overview of your application metrics.</p>
                                    </TabPanel>
                                    <TabPanel value="analytics">
                                        <h3>Analytics</h3>
                                        <p>Detailed analytics and insights.</p>
                                    </TabPanel>
                                    <TabPanel value="reports">
                                        <h3>Reports</h3>
                                        <p>Generate and view reports.</p>
                                    </TabPanel>
                                    <TabPanel value="users">
                                        <h3>Users</h3>
                                        <p>User management and permissions.</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                }
                code={`// Horizontal orientation (default)
<Tabs defaultValue="home" orientation="horizontal">
  <TabList>
    <Tab value="home">Home</Tab>
    <Tab value="profile">Profile</Tab>
  </TabList>
  {/* ... */}
</Tabs>

// Vertical orientation
<Tabs defaultValue="dashboard" orientation="vertical">
  <TabList>
    <Tab value="dashboard">Dashboard</Tab>
    <Tab value="analytics">Analytics</Tab>
  </TabList>
  {/* ... */}
</Tabs>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Sizes affect padding, font size, and min-height."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <div key={size}>
                                <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    {size.toUpperCase()}{size === 'md' ? ' (default)' : ''}
                                </div>
                                <Tabs defaultValue="tab1" size={size}>
                                    <TabList>
                                        <Tab value="tab1">Tab 1</Tab>
                                        <Tab value="tab2">Tab 2</Tab>
                                        <Tab value="tab3">Tab 3</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel value="tab1">{size.toUpperCase()} size tab content</TabPanel>
                                        <TabPanel value="tab2">{size.toUpperCase()} size tab content</TabPanel>
                                        <TabPanel value="tab3">{size.toUpperCase()} size tab content</TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                        ))}
                    </div>
                }
                code={`<Tabs size="xs">{/* ... */}</Tabs>
<Tabs size="sm">{/* ... */}</Tabs>
<Tabs size="md">{/* ... */}</Tabs> {/* default */}
<Tabs size="lg">{/* ... */}</Tabs>
<Tabs size="xl">{/* ... */}</Tabs>`}
            />

            <Showcase
                title="With Icons"
                description="Tabs can include VSCode Codicons to provide visual context. Perfect for file editors, document types, or categorized content."
                preview={
                    <Tabs defaultValue="file1">
                        <TabList>
                            <Tab value="file1" icon="file">index.tsx</Tab>
                            <Tab value="file2" icon="file">styles.css</Tab>
                            <Tab value="file3" icon="file">config.json</Tab>
                            <Tab value="file4" icon="symbol-method">utils.ts</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="file1">
                                <div style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>
                                    <div style={{ color: 'var(--vscode-descriptionForeground)' }}>// index.tsx</div>
                                    <div>import React from 'react';</div>
                                    <div>import {'{'} App {'}'} from './App';</div>
                                </div>
                            </TabPanel>
                            <TabPanel value="file2">
                                <div style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>
                                    <div style={{ color: 'var(--vscode-descriptionForeground)' }}>/* styles.css */</div>
                                    <div>.container {'{'}</div>
                                    <div>  padding: 20px;</div>
                                    <div>{'}'}</div>
                                </div>
                            </TabPanel>
                            <TabPanel value="file3">
                                <div style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>
                                    <div>{'{'}</div>
                                    <div>  "name": "my-app",</div>
                                    <div>  "version": "1.0.0"</div>
                                    <div>{'}'}</div>
                                </div>
                            </TabPanel>
                            <TabPanel value="file4">
                                <div style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>
                                    <div style={{ color: 'var(--vscode-descriptionForeground)' }}>// utils.ts</div>
                                    <div>export const formatDate = (date: Date) =&gt; {'{'}</div>
                                    <div>  return date.toISOString();</div>
                                    <div>{'}'}</div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                }
                code={`<Tabs defaultValue="file1">
  <TabList>
    <Tab value="file1" icon="file">index.tsx</Tab>
    <Tab value="file2" icon="file">styles.css</Tab>
    <Tab value="file3" icon="symbol-method">utils.ts</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="file1">File 1 content</TabPanel>
    <TabPanel value="file2">File 2 content</TabPanel>
    <TabPanel value="file3">File 3 content</TabPanel>
  </TabPanels>
</Tabs>`}
                props={tabProps}
            />

            <Showcase
                title="Closable Tabs"
                description="Closable tabs with close buttons that appear on hover (VSCode editor style). Click the × button to close a tab. Proper state management is needed when closing tabs."
                preview={<ClosableTabsExample />}
                code={`import { useState } from 'react';

function App() {
  const [tabs, setTabs] = useState([
    { value: 'file1', label: 'index.tsx', icon: 'file' },
    { value: 'file2', label: 'App.tsx', icon: 'file' },
  ]);
  const [activeTab, setActiveTab] = useState('file1');

  const handleClose = (value: string) => {
    const newTabs = tabs.filter(tab => tab.value !== value);
    setTabs(newTabs);

    // Switch to another tab if closing active tab
    if (value === activeTab && newTabs.length > 0) {
      setActiveTab(newTabs[0].value);
    }
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <TabList>
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            closable
            onClose={handleClose}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(tab => (
          <TabPanel key={tab.value} value={tab.value}>
            Content for {tab.label}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}`}
            />

            <Showcase
                title="Disabled Tabs"
                description="Tabs can be disabled to prevent interaction. Disabled tabs have reduced opacity and are not clickable."
                preview={
                    <Tabs defaultValue="available">
                        <TabList>
                            <Tab value="available">Available</Tab>
                            <Tab value="disabled1" disabled>Disabled Tab</Tab>
                            <Tab value="another">Another Available</Tab>
                            <Tab value="disabled2" disabled icon="lock">Locked</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="available">
                                <h3>Available Content</h3>
                                <p>This tab is clickable and accessible.</p>
                            </TabPanel>
                            <TabPanel value="disabled1">
                                <p>This content is not accessible.</p>
                            </TabPanel>
                            <TabPanel value="another">
                                <h3>Another Available Tab</h3>
                                <p>This tab is also clickable.</p>
                            </TabPanel>
                            <TabPanel value="disabled2">
                                <p>This content is locked.</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                }
                code={`<Tabs defaultValue="available">
  <TabList>
    <Tab value="available">Available</Tab>
    <Tab value="disabled" disabled>Disabled Tab</Tab>
    <Tab value="locked" disabled icon="lock">Locked</Tab>
  </TabList>
  {/* ... */}
</Tabs>`}
            />

            <Showcase
                title="Indicator Position"
                description="Control where the active indicator appears: start (top for horizontal, left for vertical) or end (bottom for horizontal, right for vertical). Works with all variants."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Horizontal - Indicator at End (Bottom - Default)
                            </div>
                            <Tabs defaultValue="tab1" orientation="horizontal" indicatorPosition="end">
                                <TabList>
                                    <Tab value="tab1">Tab 1</Tab>
                                    <Tab value="tab2">Tab 2</Tab>
                                    <Tab value="tab3">Tab 3</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="tab1">Indicator at the bottom (most common)</TabPanel>
                                    <TabPanel value="tab2">Content 2</TabPanel>
                                    <TabPanel value="tab3">Content 3</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                Horizontal - Indicator at Start (Top)
                            </div>
                            <Tabs defaultValue="tab1" orientation="horizontal" indicatorPosition="start">
                                <TabList>
                                    <Tab value="tab1">Tab 1</Tab>
                                    <Tab value="tab2">Tab 2</Tab>
                                    <Tab value="tab3">Tab 3</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel value="tab1">Indicator at the top</TabPanel>
                                    <TabPanel value="tab2">Content 2</TabPanel>
                                    <TabPanel value="tab3">Content 3</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                }
                code={`// Indicator at bottom (default)
<Tabs indicatorPosition="end">
  {/* ... */}
</Tabs>

// Indicator at top
<Tabs indicatorPosition="start">
  {/* ... */}
</Tabs>`}
            />

            <Showcase
                title="Controlled Tabs"
                description="Tabs can be controlled externally using the value and onChange props. This is useful for wizards, multi-step forms, or when you need to manage tab state outside the component."
                preview={<ControlledExample />}
                code={`import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('step1');

  const goToNextStep = () => {
    const steps = ['step1', 'step2', 'step3'];
    const currentIndex = steps.indexOf(activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1]);
    }
  };

  return (
    <>
      <Button onClick={goToNextStep}>Next Step</Button>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab value="step1">Step 1</Tab>
          <Tab value="step2">Step 2</Tab>
          <Tab value="step3">Step 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="step1">Step 1 content</TabPanel>
          <TabPanel value="step2">Step 2 content</TabPanel>
          <TabPanel value="step3">Step 3 content</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}`}
            />

            <Showcase
                title="Settings Panel Example"
                description="A real-world example showing tabs in a settings panel with forms and interactive content."
                preview={
                    <Tabs defaultValue="general">
                        <TabList>
                            <Tab value="general" icon="settings-gear">General</Tab>
                            <Tab value="appearance" icon="symbol-color">Appearance</Tab>
                            <Tab value="editor" icon="edit">Editor</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="general">
                                <h3 style={{ marginBottom: 'var(--spacing-3)' }}>General Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                    <Label variant="checkbox">
                                        <Checkbox />
                                        <span>Enable auto-save</span>
                                    </Label>
                                    <Label variant="checkbox">
                                        <Checkbox />
                                        <span>Show welcome screen on startup</span>
                                    </Label>
                                    <Label variant="checkbox">
                                        <Checkbox defaultChecked />
                                        <span>Enable telemetry</span>
                                    </Label>
                                </div>
                            </TabPanel>
                            <TabPanel value="appearance">
                                <h3 style={{ marginBottom: 'var(--spacing-3)' }}>Appearance</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                    <div>
                                        <FieldLabel htmlFor="font-family">Font Family</FieldLabel>
                                        <Input id="font-family" defaultValue="Consolas, Monaco, monospace" fullWidth />
                                    </div>
                                    <div>
                                        <FieldLabel htmlFor="font-size">Font Size</FieldLabel>
                                        <Input id="font-size" type="number" defaultValue="14" fullWidth />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="editor">
                                <h3 style={{ marginBottom: 'var(--spacing-3)' }}>Editor Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                    <Label variant="checkbox">
                                        <Checkbox defaultChecked />
                                        <span>Show line numbers</span>
                                    </Label>
                                    <Label variant="checkbox">
                                        <Checkbox defaultChecked />
                                        <span>Word wrap</span>
                                    </Label>
                                    <div>
                                        <FieldLabel htmlFor="tab-size">Tab Size</FieldLabel>
                                        <Input id="tab-size" type="number" defaultValue="2" fullWidth />
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                }
                code={`<Tabs defaultValue="general">
  <TabList>
    <Tab value="general" icon="settings-gear">General</Tab>
    <Tab value="appearance" icon="symbol-color">Appearance</Tab>
    <Tab value="editor" icon="edit">Editor</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="general">
      <h3>General Settings</h3>
      <Label variant="checkbox">
        <Checkbox />
        <span>Enable auto-save</span>
      </Label>
      {/* More settings... */}
    </TabPanel>
    {/* More panels... */}
  </TabPanels>
</Tabs>`}
            />

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Behavior & Implementation
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Controlled vs Uncontrolled:</strong> Use <code>defaultValue</code> for uncontrolled mode (component manages state) or <code>value</code> + <code>onChange</code> for controlled mode (you manage state)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Tab Selection:</strong> Only the panel matching the active tab value is rendered. Use the same value for Tab and TabPanel to link them
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Close Behavior:</strong> When implementing closable tabs, handle the <code>onClose</code> callback to update your tabs array and manage active tab switching
                    </li>
                    <li>
                        <strong>Context-based:</strong> Uses React Context internally to share state between components. All sub-components must be used within a Tabs wrapper
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        TabList has <code>role="tablist"</code> and appropriate <code>aria-orientation</code>
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Each Tab has <code>role="tab"</code> with <code>aria-selected</code> indicating active state
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Each TabPanel has <code>role="tabpanel"</code> with <code>aria-hidden</code> for inactive panels
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        Active tabs have <code>tabIndex={0}</code>, inactive tabs have <code>tabIndex={-1}</code>
                    </li>
                    <li>
                        Disabled tabs have <code>aria-disabled="true"</code> and cannot receive focus
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', padding: 'var(--spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--border-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Variants:</strong> Use line variant for professional interfaces, lifted for classic tabs, pills for modern designs
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Orientation:</strong> Use horizontal for content sections and vertical for navigation sidebars
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Icons:</strong> Add icons to provide visual context, especially for file tabs or categorized content
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Closable Tabs:</strong> Use for editor-like interfaces where users can open/close documents
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Controlled Mode:</strong> Use when you need to control tab state externally (wizards, forms, URL-based routing)
                    </li>
                    <li>
                        <strong>Tab Labels:</strong> Keep tab labels concise. Use 1-2 words when possible
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
