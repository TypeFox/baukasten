import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import { Button } from '../Button';
import { Input } from '../Input';
import { FieldLabel } from '../FieldLabel';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabbed interface component following VSCode design patterns. Supports horizontal and vertical orientations, icons, closable tabs, and both controlled and uncontrolled modes. Perfect for organizing content into separate views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently active tab value (controlled mode)',
    },
    defaultValue: {
      control: 'text',
      description: 'Default active tab value (uncontrolled mode)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['line', 'lifted', 'pills'],
      description: 'Visual variant of the tabs',
      table: {
        defaultValue: { summary: 'line' },
      },
    },
    indicatorPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the active indicator (start: top/left, end: bottom/right)',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the tabs',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    onChange: {
      action: 'tab changed',
      description: 'Callback when active tab changes',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all tabs properties exposed.
 * Use the controls below to experiment with different configurations.
 */
export const Interactive: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <Tabs {...args}>
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
    </div>
  ),
  args: {
    defaultValue: 'tab1',
    orientation: 'horizontal',
    variant: 'line',
    indicatorPosition: 'end',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all tabs properties. Try different orientations, sizes, and see how tabs behave.',
      },
    },
  },
};

/**
 * Horizontal and vertical tab orientations.
 */
export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Horizontal (Default)
        </h4>
        <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Vertical
        </h4>
        <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="dashboard" orientation="vertical">
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs support both **horizontal** (default) and **vertical** orientations. Horizontal tabs are common for content sections, while vertical tabs work well for navigation menus.',
      },
    },
  },
};

/**
 * All available tab sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Extra Small (xs)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" size="xs">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Extra small tab content</TabPanel>
              <TabPanel value="tab2">Extra small tab content</TabPanel>
              <TabPanel value="tab3">Extra small tab content</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Small (sm)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" size="sm">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Small tab content</TabPanel>
              <TabPanel value="tab2">Small tab content</TabPanel>
              <TabPanel value="tab3">Small tab content</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Medium (md - Default)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" size="md">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Medium tab content (default size)</TabPanel>
              <TabPanel value="tab2">Medium tab content (default size)</TabPanel>
              <TabPanel value="tab3">Medium tab content (default size)</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Large (lg)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" size="lg">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Large tab content</TabPanel>
              <TabPanel value="tab2">Large tab content</TabPanel>
              <TabPanel value="tab3">Large tab content</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Extra Large (xl)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" size="xl">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Extra large tab content</TabPanel>
              <TabPanel value="tab2">Extra large tab content</TabPanel>
              <TabPanel value="tab3">Extra large tab content</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five size options available: **xs**, **sm**, **md** (default), **lg**, **xl**. Sizes affect padding, font size, and min-height. All sizes work with any orientation or variant.',
      },
    },
  },
};

/**
 * All available tab variants with different visual styles.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Line Variant (Default) - VSCode Style
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" variant="line">
            <TabList>
              <Tab value="tab1">Overview</Tab>
              <Tab value="tab2">Details</Tab>
              <Tab value="tab3">Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Clean line indicator at the bottom. Minimal VSCode-style design.</TabPanel>
              <TabPanel value="tab2">Perfect for professional interfaces.</TabPanel>
              <TabPanel value="tab3">Default variant with subtle active state.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Lifted Variant - Classic Tabbed Interface
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" variant="lifted">
            <TabList>
              <Tab value="tab1">Overview</Tab>
              <Tab value="tab2">Details</Tab>
              <Tab value="tab3">Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Active tab has a border around it that connects to the content area.</TabPanel>
              <TabPanel value="tab2">Creates a "lifted" effect where the tab appears to pop out.</TabPanel>
              <TabPanel value="tab3">Classic tabbed interface style.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Pills Variant - Modern Tag Style
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" variant="pills">
            <TabList>
              <Tab value="tab1">Overview</Tab>
              <Tab value="tab2">Details</Tab>
              <Tab value="tab3">Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">No borders, just subtle rounded corners like tags.</TabPanel>
              <TabPanel value="tab2">Active tab has a filled background with primary color.</TabPanel>
              <TabPanel value="tab3">Modern, clean appearance perfect for contemporary UIs.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three visual variants available: **line** (VSCode-style with indicator line), **lifted** (classic tabbed interface with borders), **pills** (modern filled pills). Each variant provides a different look and feel.',
      },
    },
  },
};

/**
 * Different indicator positions for the active tab.
 */
export const IndicatorPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Horizontal - Indicator at End (Bottom - Default)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Horizontal - Indicator at Start (Top)
        </h4>
        <div style={{ width: '600px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Vertical - Indicator at End (Right - Default)
        </h4>
        <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" orientation="vertical" indicatorPosition="end">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Indicator on the right side</TabPanel>
              <TabPanel value="tab2">Content 2</TabPanel>
              <TabPanel value="tab3">Content 3</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Vertical - Indicator at Start (Left)
        </h4>
        <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="tab1" orientation="vertical" indicatorPosition="start">
            <TabList>
              <Tab value="tab1">Tab 1</Tab>
              <Tab value="tab2">Tab 2</Tab>
              <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">Indicator on the left side</TabPanel>
              <TabPanel value="tab2">Content 2</TabPanel>
              <TabPanel value="tab3">Content 3</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control where the active indicator appears: **start** (top for horizontal, left for vertical) or **end** (bottom for horizontal, right for vertical). Works with all variants.',
      },
    },
  },
};

/**
 * Tabs with VSCode Codicons.
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ width: '600px', height: '350px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
      <Tabs defaultValue="file1">
        <TabList>
          <Tab value="file1" icon="file">index.tsx</Tab>
          <Tab value="file2" icon="file">styles.css</Tab>
          <Tab value="file3" icon="file">config.json</Tab>
          <Tab value="file4" icon="symbol-method">utils.ts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="file1">
            <div style={{ fontFamily: 'monospace', fontSize: 'var(--bk-font-size-sm)' }}>
              <div style={{ color: 'var(--bk-color-foreground-muted)' }}>// index.tsx</div>
              <div>import React from 'react';</div>
              <div>import {'{'} App {'}'} from './App';</div>
            </div>
          </TabPanel>
          <TabPanel value="file2">
            <div style={{ fontFamily: 'monospace', fontSize: 'var(--bk-font-size-sm)' }}>
              <div style={{ color: 'var(--bk-color-foreground-muted)' }}>/* styles.css */</div>
              <div>.container {'{'}</div>
              <div>  padding: 20px;</div>
              <div>{'}'}</div>
            </div>
          </TabPanel>
          <TabPanel value="file3">
            <div style={{ fontFamily: 'monospace', fontSize: 'var(--bk-font-size-sm)' }}>
              <div>{'{'}</div>
              <div>  "name": "my-app",</div>
              <div>  "version": "1.0.0"</div>
              <div>{'}'}</div>
            </div>
          </TabPanel>
          <TabPanel value="file4">
            <div style={{ fontFamily: 'monospace', fontSize: 'var(--bk-font-size-sm)' }}>
              <div style={{ color: 'var(--bk-color-foreground-muted)' }}>// utils.ts</div>
              <div>export const formatDate = (date: Date) =&gt; {'{'}</div>
              <div>  return date.toISOString();</div>
              <div>{'}'}</div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs can include VSCode Codicons to provide visual context. Perfect for file editors, document types, or categorized content.',
      },
    },
  },
};

/**
 * Tabs with close buttons (like VSCode editor tabs).
 */
export const ClosableTabs: Story = {
  render: () => {
    const ClosableTabsExample = () => {
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

      return (
        <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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
                  <h3>{tab.label}</h3>
                  <p>Content for {tab.label}. Click the close button (×) to remove this tab.</p>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          {tabs.length === 0 && (
            <div style={{ padding: 'var(--bk-spacing-8)', textAlign: 'center', color: 'var(--bk-color-foreground-muted)' }}>
              All tabs closed. Refresh the page to reset.
            </div>
          )}
        </div>
      );
    };

    return <ClosableTabsExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Closable tabs with close buttons that appear on hover (VSCode editor style). Click the × button to close a tab. This example shows proper state management when closing tabs.',
      },
    },
  },
};

/**
 * Tabs with disabled states.
 */
export const DisabledTabs: Story = {
  render: () => (
    <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs can be disabled to prevent interaction. Disabled tabs have reduced opacity and are not clickable.',
      },
    },
  },
};

/**
 * Real-world usage examples with forms and interactive content.
 */
export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Settings Panel
        </h4>
        <div style={{ width: '700px', height: '400px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="general">
            <TabList>
              <Tab value="general" icon="settings-gear">General</Tab>
              <Tab value="appearance" icon="symbol-color">Appearance</Tab>
              <Tab value="editor" icon="edit">Editor</Tab>
              <Tab value="extensions" icon="extensions">Extensions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="general">
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)' }}>General Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
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
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)' }}>Appearance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                  <div>
                    <FieldLabel htmlFor="font-family">Font Family</FieldLabel>
                    <Input id="font-family" defaultValue="Consolas, Monaco, monospace" fullWidth />
                  </div>
                  <div>
                    <FieldLabel htmlFor="font-size">Font Size</FieldLabel>
                    <Input id="font-size" type="number" defaultValue="14" fullWidth />
                  </div>
                  <Label variant="checkbox">
                    <Checkbox defaultChecked />
                    <span>Enable ligatures</span>
                  </Label>
                </div>
              </TabPanel>
              <TabPanel value="editor">
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)' }}>Editor Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                  <Label variant="checkbox">
                    <Checkbox defaultChecked />
                    <span>Show line numbers</span>
                  </Label>
                  <Label variant="checkbox">
                    <Checkbox defaultChecked />
                    <span>Word wrap</span>
                  </Label>
                  <Label variant="checkbox">
                    <Checkbox />
                    <span>Show minimap</span>
                  </Label>
                  <div>
                    <FieldLabel htmlFor="tab-size">Tab Size</FieldLabel>
                    <Input id="tab-size" type="number" defaultValue="2" fullWidth />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="extensions">
                <h3 style={{ marginBottom: 'var(--bk-spacing-3)' }}>Extensions</h3>
                <p style={{ color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-spacing-3)' }}>
                  Manage your installed extensions
                </p>
                <div style={{ display: 'flex', gap: 'var(--bk-gap-md)' }}>
                  <Button variant="primary">Browse Extensions</Button>
                  <Button variant="secondary">Check for Updates</Button>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Controlled Tabs (External State)
        </h4>
        <ControlledExample />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples including settings panels with forms and controlled tabs with external state management.',
      },
    },
  },
};

const ControlledExample = () => {
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
      <div style={{ marginBottom: 'var(--bk-spacing-3)', display: 'flex', gap: 'var(--bk-gap-md)', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          External controls:
        </span>
        <Button size="sm" onClick={goToPreviousStep} disabled={activeTab === 'step1'}>
          Previous
        </Button>
        <Button size="sm" variant="primary" onClick={goToNextStep} disabled={activeTab === 'step3'}>
          Next
        </Button>
      </div>
      <div style={{ width: '600px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
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
              <div style={{ marginTop: 'var(--bk-spacing-3)' }}>
                <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                <Input id="full-name" placeholder="John Doe" fullWidth />
              </div>
            </TabPanel>
            <TabPanel value="step2">
              <h3>Step 2: Contact Details</h3>
              <p>Provide your contact information.</p>
              <div style={{ marginTop: 'var(--bk-spacing-3)' }}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="john@example.com" fullWidth />
              </div>
            </TabPanel>
            <TabPanel value="step3">
              <h3>Step 3: Complete</h3>
              <p>Review and submit your information.</p>
              <Button variant="primary" style={{ marginTop: 'var(--bk-spacing-3)' }}>Submit</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

/**
 * Comprehensive showcase demonstrating all tabs capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-8)', display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-8)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 'var(--bk-font-size-2xl)', fontWeight: 'var(--bk-font-weight-bold)', marginBottom: 'var(--bk-spacing-2)' }}>
          Tabs Component
        </h2>
        <p style={{ fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
          Tabbed interface following VSCode design patterns
        </p>
      </div>

      {/* Basic Tabs */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Basic Tabs
        </h3>
        <div style={{ width: '100%', maxWidth: '800px', height: '250px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="overview">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="documentation">Documentation</Tab>
              <Tab value="examples">Examples</Tab>
              <Tab value="changelog">Changelog</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="overview">
                <h3>Overview</h3>
                <p>A comprehensive tabs component with VSCode styling.</p>
              </TabPanel>
              <TabPanel value="documentation">
                <h3>Documentation</h3>
                <p>Full API documentation and usage guides.</p>
              </TabPanel>
              <TabPanel value="examples">
                <h3>Examples</h3>
                <p>Code examples and demos.</p>
              </TabPanel>
              <TabPanel value="changelog">
                <h3>Changelog</h3>
                <p>Version history and updates.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          With Icons
        </h3>
        <div style={{ width: '100%', maxWidth: '800px', height: '250px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="files">
            <TabList>
              <Tab value="files" icon="files">Files</Tab>
              <Tab value="search" icon="search">Search</Tab>
              <Tab value="git" icon="source-control">Source Control</Tab>
              <Tab value="debug" icon="debug-alt">Debug</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="files">
                <h3>File Explorer</h3>
                <p>Browse and manage your project files.</p>
              </TabPanel>
              <TabPanel value="search">
                <h3>Search</h3>
                <p>Search across your project.</p>
              </TabPanel>
              <TabPanel value="git">
                <h3>Source Control</h3>
                <p>Manage version control and commits.</p>
              </TabPanel>
              <TabPanel value="debug">
                <h3>Debug Console</h3>
                <p>Debug your application.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      {/* Vertical Orientation */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          Vertical Orientation
        </h3>
        <div style={{ width: '100%', maxWidth: '800px', height: '300px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="account" orientation="vertical">
            <TabList>
              <Tab value="account" icon="account">Account</Tab>
              <Tab value="security" icon="shield">Security</Tab>
              <Tab value="notifications" icon="bell">Notifications</Tab>
              <Tab value="privacy" icon="lock">Privacy</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="account">
                <h3>Account Settings</h3>
                <p>Manage your account information and preferences.</p>
              </TabPanel>
              <TabPanel value="security">
                <h3>Security</h3>
                <p>Password, two-factor authentication, and security settings.</p>
              </TabPanel>
              <TabPanel value="notifications">
                <h3>Notifications</h3>
                <p>Configure notification preferences.</p>
              </TabPanel>
              <TabPanel value="privacy">
                <h3>Privacy</h3>
                <p>Control your privacy settings.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <h3 style={{ marginBottom: 'var(--bk-spacing-3)', fontSize: 'var(--bk-font-size-base)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
          With Disabled Tabs
        </h3>
        <div style={{ width: '100%', maxWidth: '800px', height: '200px', border: 'var(--bk-border-width-1) solid var(--bk-color-border)', borderRadius: 'var(--bk-radius-md)' }}>
          <Tabs defaultValue="enabled1">
            <TabList>
              <Tab value="enabled1">Enabled</Tab>
              <Tab value="disabled1" disabled>Disabled</Tab>
              <Tab value="enabled2">Another Enabled</Tab>
              <Tab value="disabled2" disabled icon="lock">Locked</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="enabled1">
                <p>This tab is accessible.</p>
              </TabPanel>
              <TabPanel value="disabled1">
                <p>Not accessible.</p>
              </TabPanel>
              <TabPanel value="enabled2">
                <p>This tab is also accessible.</p>
              </TabPanel>
              <TabPanel value="disabled2">
                <p>Not accessible.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all tabs capabilities: basic tabs, icons, orientations, closable tabs, and disabled states. Use this as a reference for all available options.',
      },
    },
  },
};
