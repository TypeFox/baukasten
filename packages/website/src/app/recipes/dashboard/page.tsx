'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase } from '@/components/ComponentShowcase';
import { Button, Icon, Heading, Text, Badge, Menu, MenuItem, Divider, Avatar, Input, type CodiconName } from 'baukasten-ui';

export default function DashboardRecipesPage() {
    return (
        <PageLayout
            title="Dashboard Layout Recipes"
            description="Complete dashboard layouts ready to use in your applications. Each design showcases different sidebar styles, navigation patterns, and content areas."
        >
            <Showcase
                title="Classic Sidebar Dashboard"
                description="Traditional dashboard with a fixed sidebar navigation and main content area. Perfect for admin panels and management interfaces."
                preview={
                    <div style={{
                        minHeight: '600px',
                        display: 'flex',
                        backgroundColor: 'var(--vscode-editor-background)',
                    }}>
                        {/* Sidebar */}
                        <div style={{
                            width: '240px',
                            backgroundColor: 'var(--vscode-sideBar-background)',
                            borderRight: '1px solid var(--vscode-panel-border)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {/* Logo/Header */}
                            <div style={{
                                padding: 'var(--bk-spacing-5)',
                                borderBottom: '1px solid var(--vscode-panel-border)',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--bk-spacing-3)',
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'linear-gradient(135deg, var(--vscode-button-background) 0%, var(--vscode-button-hoverBackground) 100%)',
                                        borderRadius: 'var(--bk-radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="dashboard" style={{ color: 'var(--vscode-button-foreground)', fontSize: '18px' }} />
                                    </div>
                                    <Heading level={5} style={{ margin: 0 }}>Dashboard</Heading>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div style={{ flex: 1, padding: 'var(--bk-spacing-4)', overflowY: 'auto' }}>
                                <Menu size="md">
                                    <MenuItem icon={<Icon name="home" />} selected>
                                        Overview
                                    </MenuItem>
                                    <MenuItem icon={<Icon name="graph" />}>
                                        Analytics
                                    </MenuItem>
                                    <MenuItem icon={<Icon name="database" />}>
                                        Data
                                    </MenuItem>
                                    <MenuItem icon={<Icon name="gear" />}>
                                        Settings
                                    </MenuItem>
                                </Menu>
                            </div>

                            {/* User Profile */}
                            <div style={{
                                padding: 'var(--bk-spacing-4)',
                                borderTop: '1px solid var(--vscode-panel-border)',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--bk-spacing-3)',
                                    padding: 'var(--bk-spacing-2)',
                                    borderRadius: 'var(--bk-radius-md)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.15s ease',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <Avatar size="sm" name="John Doe" />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <Text style={{ display: 'block', fontWeight: 500, fontSize: 'var(--bk-font-size-sm)' }}>
                                            John Doe
                                        </Text>
                                        <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                                            john@example.com
                                        </Text>
                                    </div>
                                    <Icon name="chevron-right" style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)' }} />
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}>
                            {/* Header/Toolbar */}
                            <div style={{
                                padding: 'var(--bk-spacing-5)',
                                borderBottom: '1px solid var(--vscode-panel-border)',
                                backgroundColor: 'var(--vscode-sideBar-background)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <Heading level={4} style={{ marginBottom: 'var(--bk-spacing-1)' }}>
                                        Overview
                                    </Heading>
                                    <Text style={{ color: 'var(--vscode-descriptionForeground)', fontSize: 'var(--bk-font-size-sm)' }}>
                                        Welcome back! Here's what's happening today.
                                    </Text>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)' }}>
                                    <Button variant="secondary" size="sm">
                                        <Icon name="sync" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                                        Refresh
                                    </Button>
                                    <Button variant="primary" size="sm">
                                        <Icon name="add" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                                        New Item
                                    </Button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div style={{
                                flex: 1,
                                padding: 'var(--bk-spacing-6)',
                                overflowY: 'auto',
                            }}>
                                {/* Stats Cards */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 'var(--bk-spacing-4)',
                                    marginBottom: 'var(--bk-spacing-6)',
                                }}>
                                    {[
                                        { label: 'Total Users', value: '2,543', icon: 'account' as CodiconName, change: '+12%' },
                                        { label: 'Revenue', value: '$45.2K', icon: 'graph' as CodiconName, change: '+23%' },
                                        { label: 'Active Sessions', value: '127', icon: 'pulse' as CodiconName, change: '-5%' },
                                        { label: 'Conversions', value: '892', icon: 'star' as CodiconName, change: '+8%' },
                                    ].map((stat, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: 'var(--bk-spacing-5)',
                                                backgroundColor: 'var(--vscode-sideBar-background)',
                                                border: '1px solid var(--vscode-panel-border)',
                                                borderRadius: 'var(--bk-radius-md)',
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--bk-spacing-3)' }}>
                                                <Icon name={stat.icon} style={{ fontSize: '20px', color: 'var(--vscode-descriptionForeground)' }} />
                                                <Badge size="xs" variant={stat.change.startsWith('+') ? 'success' : 'error'}>
                                                    {stat.change}
                                                </Badge>
                                            </div>
                                            <Text style={{ display: 'block', fontSize: 'calc(var(--vscode-font-size) * 1.75)', fontWeight: 600, marginBottom: 'var(--bk-spacing-1)' }}>
                                                {stat.value}
                                            </Text>
                                            <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                                {stat.label}
                                            </Text>
                                        </div>
                                    ))}
                                </div>

                                {/* Content Section */}
                                <div style={{
                                    padding: 'var(--bk-spacing-5)',
                                    backgroundColor: 'var(--vscode-sideBar-background)',
                                    border: '1px solid var(--vscode-panel-border)',
                                    borderRadius: 'var(--bk-radius-md)',
                                }}>
                                    <Heading level={5} style={{ marginBottom: 'var(--bk-spacing-4)' }}>
                                        Recent Activity
                                    </Heading>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--bk-spacing-3)',
                                                padding: 'var(--bk-spacing-3)',
                                                borderRadius: 'var(--bk-radius-sm)',
                                                backgroundColor: 'var(--vscode-editor-background)',
                                            }}>
                                                <Icon name="info" style={{ color: 'var(--vscode-descriptionForeground)' }} />
                                                <Text style={{ flex: 1 }}>Activity item {item} description</Text>
                                                <Text style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                                                    2h ago
                                                </Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                code={`import { Button, Icon, Heading, Text, Badge, Menu, MenuItem, Avatar } from 'baukasten-ui';

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: 'var(--vscode-sideBar-background)',
        borderRight: '1px solid var(--vscode-panel-border)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo/Header */}
        <div style={{
          padding: 'var(--bk-spacing-5)',
          borderBottom: '1px solid var(--vscode-panel-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
            <Icon name="dashboard" style={{ fontSize: '24px' }} />
            <Heading level={5}>Dashboard</Heading>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: 'var(--bk-spacing-4)' }}>
          <Menu size="md">
            <MenuItem icon={<Icon name="home" />} selected>Overview</MenuItem>
            <MenuItem icon={<Icon name="graph" />}>Analytics</MenuItem>
            <MenuItem icon={<Icon name="database" />}>Data</MenuItem>
            <MenuItem icon={<Icon name="gear" />}>Settings</MenuItem>
          </Menu>
        </div>

        {/* User Profile */}
        <div style={{ padding: 'var(--bk-spacing-4)', borderTop: '1px solid var(--vscode-panel-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
            <Avatar size="sm" name="John Doe" />
            <div style={{ flex: 1 }}>
              <Text style={{ display: 'block', fontWeight: 500 }}>John Doe</Text>
              <Text style={{ fontSize: 'var(--bk-font-size-xs)' }}>john@example.com</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          padding: 'var(--bk-spacing-5)',
          borderBottom: '1px solid var(--vscode-panel-border)',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Heading level={4}>Overview</Heading>
          <Button variant="primary" size="sm">
            <Icon name="add" />
            New Item
          </Button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 'var(--bk-spacing-6)' }}>
          {/* Your content here */}
        </div>
      </div>
    </div>
  );
}`}
            />

            <Showcase
                title="Modern Dashboard with Top Navigation"
                description="A contemporary dashboard layout with top navigation bar, perfect for modern web applications."
                preview={
                    <div style={{
                        minHeight: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'var(--vscode-editor-background)',
                    }}>
                        {/* Top Navigation */}
                        <div style={{
                            height: '64px',
                            backgroundColor: 'var(--vscode-sideBar-background)',
                            borderBottom: '1px solid var(--vscode-panel-border)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 var(--bk-spacing-6)',
                            gap: 'var(--bk-spacing-6)',
                        }}>
                            {/* Logo */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--bk-spacing-3)',
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'linear-gradient(135deg, var(--vscode-button-background) 0%, var(--vscode-button-hoverBackground) 100%)',
                                    borderRadius: 'var(--bk-radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Icon name="rocket" style={{ color: 'var(--vscode-button-foreground)', fontSize: '20px' }} />
                                </div>
                                <Heading level={5} style={{ margin: 0 }}>AppName</Heading>
                            </div>

                            {/* Navigation */}
                            <Menu direction="horizontal" size="md">
                                <MenuItem selected>Dashboard</MenuItem>
                                <MenuItem>Projects</MenuItem>
                                <MenuItem>Team</MenuItem>
                                <MenuItem>Reports</MenuItem>
                            </Menu>

                            {/* Right Side */}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    size="sm"
                                    style={{ width: '200px' }}
                                />
                                <Button variant="ghost" size="sm" circular>
                                    <Icon name="bell" />
                                </Button>
                                <Avatar size="sm" name="User Name" />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div style={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: '1fr 300px',
                            gap: 0,
                        }}>
                            {/* Main Content */}
                            <div style={{
                                padding: 'var(--bk-spacing-6)',
                                overflowY: 'auto',
                            }}>
                                <div style={{ marginBottom: 'var(--bk-spacing-6)' }}>
                                    <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                                        Welcome back, User!
                                    </Heading>
                                    <Text style={{ color: 'var(--vscode-descriptionForeground)' }}>
                                        Here's an overview of your projects and tasks.
                                    </Text>
                                </div>

                                {/* Quick Stats */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: 'var(--bk-spacing-4)',
                                    marginBottom: 'var(--bk-spacing-6)',
                                }}>
                                    {[
                                        { label: 'Active Projects', value: '12', icon: 'folder' as CodiconName },
                                        { label: 'Tasks Completed', value: '85', icon: 'check' as CodiconName },
                                        { label: 'Team Members', value: '24', icon: 'person' as CodiconName },
                                    ].map((stat, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: 'var(--bk-spacing-4)',
                                                backgroundColor: 'var(--vscode-sideBar-background)',
                                                border: '1px solid var(--vscode-panel-border)',
                                                borderRadius: 'var(--bk-radius-md)',
                                            }}
                                        >
                                            <Icon name={stat.icon} style={{ fontSize: '24px', color: 'var(--vscode-descriptionForeground)', marginBottom: 'var(--bk-spacing-2)' }} />
                                            <Text style={{ display: 'block', fontSize: 'calc(var(--vscode-font-size) * 1.5)', fontWeight: 600 }}>
                                                {stat.value}
                                            </Text>
                                            <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                                {stat.label}
                                            </Text>
                                        </div>
                                    ))}
                                </div>

                                {/* Projects List */}
                                <div style={{
                                    padding: 'var(--bk-spacing-5)',
                                    backgroundColor: 'var(--vscode-sideBar-background)',
                                    border: '1px solid var(--vscode-panel-border)',
                                    borderRadius: 'var(--bk-radius-md)',
                                }}>
                                    <Heading level={5} style={{ marginBottom: 'var(--bk-spacing-4)' }}>
                                        Recent Projects
                                    </Heading>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                        {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: 'var(--bk-spacing-3)',
                                                borderRadius: 'var(--bk-radius-sm)',
                                                backgroundColor: 'var(--vscode-editor-background)',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-3)' }}>
                                                    <Icon name="folder" style={{ color: 'var(--vscode-descriptionForeground)' }} />
                                                    <div>
                                                        <Text style={{ display: 'block', fontWeight: 500 }}>{project}</Text>
                                                        <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                                                            Updated 2h ago
                                                        </Text>
                                                    </div>
                                                </div>
                                                <Badge size="xs">Active</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div style={{
                                padding: 'var(--bk-spacing-5)',
                                backgroundColor: 'var(--vscode-sideBar-background)',
                                borderLeft: '1px solid var(--vscode-panel-border)',
                                overflowY: 'auto',
                            }}>
                                <Heading level={5} style={{ marginBottom: 'var(--bk-spacing-4)' }}>
                                    Quick Actions
                                </Heading>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)', marginBottom: 'var(--bk-spacing-6)' }}>
                                    <Button variant="primary" width="block" size="sm">
                                        <Icon name="add" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                                        New Project
                                    </Button>
                                    <Button variant="secondary" width="block" size="sm">
                                        <Icon name="calendar" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                                        Schedule
                                    </Button>
                                    <Button variant="secondary" width="block" size="sm">
                                        <Icon name="mail" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                                        Messages
                                    </Button>
                                </div>

                                <Divider style={{ margin: 'var(--bk-spacing-5) 0' }} />

                                <Heading level={6} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                                    Notifications
                                </Heading>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} style={{
                                            padding: 'var(--bk-spacing-3)',
                                            borderRadius: 'var(--bk-radius-sm)',
                                            backgroundColor: 'var(--vscode-editor-background)',
                                        }}>
                                            <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-sm)', marginBottom: 'var(--bk-spacing-1)' }}>
                                                New notification {item}
                                            </Text>
                                            <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-xs)', color: 'var(--vscode-descriptionForeground)' }}>
                                                Just now
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                code={`import { Button, Icon, Heading, Text, Badge, Menu, MenuItem, Avatar, Input } from 'baukasten-ui';

function ModernDashboard() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <div style={{
        height: '64px',
        backgroundColor: 'var(--vscode-sideBar-background)',
        borderBottom: '1px solid var(--vscode-panel-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--bk-spacing-6)',
        gap: 'var(--bk-spacing-6)',
      }}>
        <Icon name="rocket" style={{ fontSize: '24px' }} />
        <Heading level={5}>AppName</Heading>
        
        <Menu direction="horizontal" size="md">
          <MenuItem selected>Dashboard</MenuItem>
          <MenuItem>Projects</MenuItem>
          <MenuItem>Team</MenuItem>
        </Menu>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--bk-spacing-3)' }}>
          <Input type="text" placeholder="Search..." size="sm" />
          <Avatar size="sm" name="User" />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px' }}>
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
          {/* Main content */}
        </div>
        <div style={{
          padding: 'var(--bk-spacing-5)',
          backgroundColor: 'var(--vscode-sideBar-background)',
          borderLeft: '1px solid var(--vscode-panel-border)',
        }}>
          {/* Sidebar */}
        </div>
      </div>
    </div>
  );
}`}
            />

            <Showcase
                title="Minimal Dashboard"
                description="A clean, minimal dashboard with floating cards and subtle backgrounds. Great for analytics and monitoring interfaces."
                preview={
                    <div style={{
                        minHeight: '600px',
                        padding: 'var(--bk-spacing-6)',
                        backgroundColor: 'var(--vscode-editor-background)',
                    }}>
                        {/* Header */}
                        <div style={{ marginBottom: 'var(--bk-spacing-8)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--bk-spacing-2)' }}>
                                <div>
                                    <Heading level={2} style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                                        Dashboard
                                    </Heading>
                                    <Text style={{ color: 'var(--vscode-descriptionForeground)' }}>
                                        Monitor your key metrics and performance
                                    </Text>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)' }}>
                                    <Button variant="secondary" size="sm">
                                        <Icon name="filter" />
                                    </Button>
                                    <Button variant="secondary" size="sm">
                                        <Icon name="kebab-vertical" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: 'var(--bk-spacing-4)',
                            marginBottom: 'var(--bk-spacing-6)',
                        }}>
                            {[
                                { label: 'Total Revenue', value: '$128.4K', trend: '+12.5%', icon: 'graph-line' as CodiconName },
                                { label: 'Active Users', value: '3,247', trend: '+8.2%', icon: 'person' as CodiconName },
                                { label: 'Conversion Rate', value: '3.24%', trend: '-2.1%', icon: 'target' as CodiconName },
                                { label: 'Avg. Session', value: '4m 32s', trend: '+5.4%', icon: 'clock' as CodiconName },
                            ].map((metric, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: 'var(--bk-spacing-5)',
                                        backgroundColor: 'var(--vscode-sideBar-background)',
                                        border: '1px solid var(--vscode-panel-border)',
                                        borderRadius: 'var(--bk-radius-lg)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--bk-spacing-4)' }}>
                                        <Icon name={metric.icon} style={{ fontSize: '20px', color: 'var(--vscode-descriptionForeground)' }} />
                                        <Text style={{
                                            fontSize: 'var(--bk-font-size-sm)',
                                            color: metric.trend.startsWith('+') ? 'var(--vscode-testing-iconPassed)' : 'var(--vscode-testing-iconFailed)',
                                        }}>
                                            {metric.trend}
                                        </Text>
                                    </div>
                                    <Text style={{ display: 'block', fontSize: 'calc(var(--vscode-font-size) * 2)', fontWeight: 700, marginBottom: 'var(--bk-spacing-1)' }}>
                                        {metric.value}
                                    </Text>
                                    <Text style={{ display: 'block', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                                        {metric.label}
                                    </Text>
                                </div>
                            ))}
                        </div>

                        {/* Main Content Card */}
                        <div style={{
                            padding: 'var(--bk-spacing-6)',
                            backgroundColor: 'var(--vscode-sideBar-background)',
                            border: '1px solid var(--vscode-panel-border)',
                            borderRadius: 'var(--bk-radius-lg)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--bk-spacing-5)' }}>
                                <Heading level={5}>Activity Overview</Heading>
                                <Menu direction="horizontal" size="sm">
                                    <MenuItem selected>Week</MenuItem>
                                    <MenuItem>Month</MenuItem>
                                    <MenuItem>Year</MenuItem>
                                </Menu>
                            </div>
                            <div style={{
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'var(--vscode-editor-background)',
                                borderRadius: 'var(--bk-radius-md)',
                                border: '1px solid var(--vscode-panel-border)',
                            }}>
                                <Text style={{ color: 'var(--vscode-descriptionForeground)' }}>
                                    Chart visualization area
                                </Text>
                            </div>
                        </div>
                    </div>
                }
                code={`import { Button, Icon, Heading, Text, Menu, MenuItem } from 'baukasten-ui';

function MinimalDashboard() {
  return (
    <div style={{ minHeight: '100vh', padding: 'var(--bk-spacing-6)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--bk-spacing-8)' }}>
        <Heading level={2}>Dashboard</Heading>
        <Text>Monitor your key metrics and performance</Text>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--bk-spacing-4)',
      }}>
        {metrics.map((metric) => (
          <div style={{
            padding: 'var(--bk-spacing-5)',
            backgroundColor: 'var(--vscode-sideBar-background)',
            borderRadius: 'var(--bk-radius-lg)',
          }}>
            <Icon name={metric.icon} />
            <Text style={{ fontSize: '2rem', fontWeight: 700 }}>{metric.value}</Text>
            <Text>{metric.label}</Text>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--bk-spacing-6)', marginTop: 'var(--bk-spacing-6)' }}>
        {/* Your content */}
      </div>
    </div>
  );
}`}
            />
        </PageLayout>
    );
}
