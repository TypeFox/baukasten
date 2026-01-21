import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { Heading, Paragraph, Text, Code } from '../Typography';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible content panel component. Stack multiple AccordionItems together for a clean, organized interface. Supports exclusive mode (only one open at a time), icons, and disabled states. Fully integrates with VSCode/Theia theme variables.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    exclusive: {
      control: 'boolean',
      description: 'Whether only one accordion item can be open at a time',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: 'text',
      description: 'Default open item key (for controlled exclusive mode)',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all accordion properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  render: (args) => (
    <Accordion {...args} style={{ width: '500px' }}>
      <AccordionItem id="section-1" title="Introduction">
        <Paragraph>
          Welcome to Baukasten! This is a UI component library designed specifically for VSCode webviews.
          It provides a consistent look and feel that matches VSCode's native interface.
        </Paragraph>
      </AccordionItem>
      <AccordionItem id="section-2" title="Getting Started">
        <Paragraph>
          To get started, install the package and import the components you need.
          Don't forget to include the <Code>GlobalStyles</Code> component at the root of your app.
        </Paragraph>
      </AccordionItem>
      <AccordionItem id="section-3" title="Documentation">
        <Paragraph>
          Each component comes with comprehensive documentation and examples in Storybook.
          Check out the different stories to see all available features and usage patterns.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    exclusive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all accordion properties. Try toggling exclusive mode and opening different sections.',
      },
    },
  },
};

/**
 * Basic accordion with multiple expandable sections.
 * Multiple sections can be open simultaneously.
 */
export const Basic: Story = {
  render: () => (
    <Accordion style={{ width: '500px' }}>
      <AccordionItem title="What is Baukasten?">
        <Paragraph>
          Baukasten is a React component library for building VSCode webview UIs.
          It provides pre-built components that match VSCode's native look and feel.
        </Paragraph>
      </AccordionItem>
      <AccordionItem title="Why use Baukasten?">
        <Paragraph>
          Building custom UIs for VSCode extensions can be time-consuming.
          Baukasten speeds up development by providing ready-to-use components with proper theming.
        </Paragraph>
      </AccordionItem>
      <AccordionItem title="How to install?" defaultOpen>
        <Paragraph>
          Install via npm: <Code>npm install @baukasten/ui</Code>
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion with multiple sections. All sections can be opened or closed independently.',
      },
    },
  },
};

/**
 * Exclusive mode accordion where only one item can be open at a time.
 * Opening a new item automatically closes the previously open item.
 */
export const Exclusive: Story = {
  render: () => (
    <Accordion exclusive defaultOpen="performance" style={{ width: '500px' }}>
      <AccordionItem id="performance" title="Performance">
        <Paragraph>
          Baukasten components are optimized for performance with minimal re-renders
          and efficient styling using vanilla-extract CSS-in-TypeScript.
        </Paragraph>
      </AccordionItem>
      <AccordionItem id="theming" title="Theming">
        <Paragraph>
          Automatic theme synchronization with VSCode. Supports all VSCode themes
          including dark, light, and high contrast variants.
        </Paragraph>
      </AccordionItem>
      <AccordionItem id="accessibility" title="Accessibility">
        <Paragraph>
          Built with accessibility in mind. All components follow ARIA best practices
          and support keyboard navigation.
        </Paragraph>
      </AccordionItem>
      <AccordionItem id="typescript" title="TypeScript Support">
        <Paragraph>
          Full TypeScript support with comprehensive type definitions for all components and props.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'In exclusive mode, only one accordion item can be open at a time. Perfect for step-by-step wizards or FAQs.',
      },
    },
  },
};

/**
 * Accordion items with icons to enhance visual hierarchy and meaning.
 */
export const WithIcons: Story = {
  render: () => (
    <Accordion style={{ width: '500px' }}>
      <AccordionItem
        title="General Settings"
        icon={<Icon name="gear" />}
        defaultOpen
      >
        <Paragraph>
          Configure general application settings including language, theme preferences, and defaults.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title="Notifications"
        icon={<Icon name="bell" />}
      >
        <Paragraph>
          Manage notification preferences and alerts. Choose which events trigger notifications.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title="Security"
        icon={<Icon name="shield" />}
      >
        <Paragraph>
          Security settings including authentication, permissions, and data protection options.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title="Extensions"
        icon={<Icon name="extensions" />}
      >
        <Paragraph>
          Manage installed extensions, browse marketplace, and configure extension settings.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Add icons to accordion items for better visual communication and faster scanning.',
      },
    },
  },
};

/**
 * Custom title nodes with badges, icons, and complex layouts.
 * The title prop accepts any React node, allowing for rich, custom headers.
 */
export const CustomTitles: Story = {
  render: () => (
    <Accordion style={{ width: '600px' }}>
      <AccordionItem
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
            <Icon name="rocket" />
            <Text weight="semibold">New Features</Text>
            <Badge variant="info" size="sm">3</Badge>
          </div>
        }
        defaultOpen
      >
        <Paragraph>
          Check out the latest features added to Baukasten including improved theming,
          better performance, and new component variants.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
            <Icon name="bug" />
            <Text>Bug Fixes</Text>
            <Badge variant="success" size="sm">Fixed</Badge>
          </div>
        }
      >
        <Paragraph>
          Several critical bugs have been resolved including accessibility improvements
          and keyboard navigation enhancements.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
            <Icon name="beaker" />
            <Text>Experimental</Text>
            <Badge variant="warning" size="sm">Beta</Badge>
          </div>
        }
      >
        <Paragraph>
          Try out experimental features like advanced data tables and custom theming.
          These features are stable but may have breaking changes in future releases.
        </Paragraph>
      </AccordionItem>
      <AccordionItem
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
            <Icon name="archive" />
            <Text color="muted">Deprecated</Text>
            <Badge variant="error" size="sm">Old</Badge>
          </div>
        }
        disabled
      >
        <Paragraph>
          This section contains deprecated features that will be removed in the next major version.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Titles can be any React node. Combine icons, text, badges, and custom layouts for rich accordion headers.',
      },
    },
  },
};

/**
 * Accordion items in different states including disabled.
 */
export const States: Story = {
  render: () => (
    <Accordion style={{ width: '500px' }}>
      <AccordionItem title="Available Feature" defaultOpen>
        <Paragraph>
          This feature is available and ready to use. Click to expand and see details.
        </Paragraph>
      </AccordionItem>
      <AccordionItem title="Coming Soon Feature" disabled>
        <Paragraph>
          This feature is under development and will be available in a future release.
        </Paragraph>
      </AccordionItem>
      <AccordionItem title="Beta Feature" icon={<Icon name="beaker" />}>
        <Paragraph>
          This feature is in beta. It works but may have some rough edges.
        </Paragraph>
      </AccordionItem>
      <AccordionItem title="Deprecated Feature" disabled icon={<Icon name="warning" />}>
        <Paragraph>
          This feature is deprecated and will be removed in the next major version.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion items can be disabled to prevent interaction. Useful for features under development or requiring certain conditions.',
      },
    },
  },
};

/**
 * Nested content with rich formatting including lists, code, and links.
 */
export const RichContent: Story = {
  render: () => (
    <Accordion style={{ width: '600px' }}>
      <AccordionItem title="Installation Guide" defaultOpen>
        <Paragraph>Follow these steps to install Baukasten:</Paragraph>
        <ol style={{ paddingLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Install the package: <Code>npm install @baukasten/ui</Code></Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Import components in your app</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Add <Code>GlobalStyles</Code> to your root component</Text>
          </li>
        </ol>
        <Text size="sm" color="muted">
          Need help? Check the documentation for detailed instructions.
        </Text>
      </AccordionItem>
      <AccordionItem title="API Reference" icon={<Icon name="symbol-method" />}>
        <Heading level={4} marginBottom>Available Props</Heading>
        <ul style={{ paddingLeft: 'var(--spacing-4)', lineHeight: '1.6' }}>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text><Text weight="bold">title</Text>: React.ReactNode - The accordion header content</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text><Text weight="bold">defaultOpen</Text>: boolean - Whether the item is open by default</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text><Text weight="bold">disabled</Text>: boolean - Whether the item is disabled</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text><Text weight="bold">icon</Text>: React.ReactNode - Optional icon to display</Text>
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem title="Examples" icon={<Icon name="code" />}>
        <Paragraph>
          Check out the Storybook for interactive examples and code snippets.
          Each story demonstrates a different use case and pattern.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion content can include rich formatting: lists, code blocks, styled text, and more.',
      },
    },
  },
};

/**
 * Accordion with large content demonstrating scrolling behavior.
 */
export const LargeContent: Story = {
  render: () => (
    <Accordion style={{ width: '600px' }}>
      <AccordionItem
        title="Terms of Service"
        icon={<Icon name="law" />}
        defaultOpen
      >
        <Heading level={4} marginBottom>1. Acceptance of Terms</Heading>
        <Paragraph>
          By accessing and using this service, you accept and agree to be bound by the terms
          and provision of this agreement. If you do not agree to abide by the above, please
          do not use this service.
        </Paragraph>

        <Heading level={4} marginBottom>2. Use License</Heading>
        <Paragraph>
          Permission is granted to temporarily download one copy of the materials on this
          service for personal, non-commercial transitory viewing only. This is the grant
          of a license, not a transfer of title, and under this license you may not:
        </Paragraph>
        <ul style={{ paddingLeft: 'var(--spacing-6)', marginBottom: 'var(--spacing-3)' }}>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Modify or copy the materials</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Use the materials for any commercial purpose or public display</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Attempt to reverse engineer any software contained in the service</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Remove any copyright or proprietary notations from the materials</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>Transfer the materials to another person or mirror on any other server</Text>
          </li>
        </ul>

        <Heading level={4} marginBottom>3. Disclaimer</Heading>
        <Paragraph>
          The materials on this service are provided on an 'as is' basis. We make no warranties,
          expressed or implied, and hereby disclaim and negate all other warranties including,
          without limitation, implied warranties or conditions of merchantability, fitness for
          a particular purpose, or non-infringement of intellectual property or other violation
          of rights.
        </Paragraph>

        <Heading level={4} marginBottom>4. Limitations</Heading>
        <Paragraph>
          In no event shall Baukasten or its suppliers be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to business interruption)
          arising out of the use or inability to use the materials on this service.
        </Paragraph>

        <Heading level={4} marginBottom>5. Revisions</Heading>
        <Paragraph>
          The materials appearing in this service could include technical, typographical, or
          photographic errors. We do not warrant that any of the materials are accurate, complete,
          or current. We may make changes to the materials at any time without notice.
        </Paragraph>

        <Text size="sm" color="muted" block style={{ marginTop: 'var(--spacing-4)' }}>
          Last updated: October 2025
        </Text>
      </AccordionItem>

      <AccordionItem title="Privacy Policy" icon={<Icon name="shield" />}>
        <Heading level={4} marginBottom>Information Collection</Heading>
        <Paragraph>
          We collect information from you when you register on our site, subscribe to our
          newsletter, respond to a survey, fill out a form, or use certain features of our service.
        </Paragraph>
        <Paragraph>
          When ordering or registering on our site, as appropriate, you may be asked to enter your
          name, email address, mailing address, phone number, or other details to help you with
          your experience.
        </Paragraph>

        <Heading level={4} marginBottom>How We Use Your Information</Heading>
        <Paragraph>
          We may use the information we collect from you when you register, make a purchase,
          sign up for our newsletter, respond to a survey or marketing communication, surf
          the website, or use certain other site features in the following ways:
        </Paragraph>
        <ul style={{ paddingLeft: 'var(--spacing-6)', marginBottom: 'var(--spacing-3)' }}>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>To personalize your experience and deliver content tailored to your interests</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>To improve our website based on your feedback</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>To provide better customer service and support</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>To process transactions securely and efficiently</Text>
          </li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>
            <Text>To send periodic emails about updates, products, or services</Text>
          </li>
        </ul>

        <Heading level={4} marginBottom>Data Protection</Heading>
        <Paragraph>
          We implement a variety of security measures to maintain the safety of your personal
          information when you place an order or enter, submit, or access your personal information.
          All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL)
          technology and then encrypted into our payment gateway providers database.
        </Paragraph>
      </AccordionItem>

      <AccordionItem title="Frequently Asked Questions" icon={<Icon name="question" />}>
        <Heading level={4} marginBottom>What is Baukasten?</Heading>
        <Paragraph>
          Baukasten is a comprehensive React component library specifically designed for building
          VSCode webview extensions. It provides a complete set of UI components that seamlessly
          integrate with VSCode's theming system, making it easy to create professional and
          consistent user interfaces for your extensions.
        </Paragraph>

        <Heading level={4} marginBottom>How do I get started?</Heading>
        <Paragraph>
          Getting started with Baukasten is simple. First, install the package using npm:
        </Paragraph>
        <Code>npm install @baukasten/ui</Code>
        <Paragraph>
          Then import the components you need in your React application and don't forget to
          include the GlobalStyles component at the root of your application to ensure proper
          styling and theme integration.
        </Paragraph>

        <Heading level={4} marginBottom>Is TypeScript supported?</Heading>
        <Paragraph>
          Yes! Baukasten is built with TypeScript and provides comprehensive type definitions
          for all components, props, and utilities. This gives you excellent autocomplete support
          and type safety when building your applications.
        </Paragraph>

        <Heading level={4} marginBottom>Can I use this outside of VSCode?</Heading>
        <Paragraph>
          While Baukasten is optimized for VSCode webviews, you can also use it in regular web
          applications. We provide a VSCodeThemeWrapper component that simulates the VSCode
          theming environment for browser-based applications and Storybook demos.
        </Paragraph>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion handles large amounts of content gracefully. Expand items to see how scrolling works with extensive text, lists, and multiple sections.',
      },
    },
  },
};

/**
 * Nested accordions for hierarchical content organization.
 */
export const Nested: Story = {
  render: () => (
    <Accordion style={{ width: '600px' }}>
      <AccordionItem title="Components" icon={<Icon name="symbol-class" />} defaultOpen>
        <Accordion style={{ marginTop: 'var(--spacing-2)' }}>
          <AccordionItem title="Form Components">
            <Paragraph>
              Input, Select, Checkbox, Radio, TextArea, and more form controls.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Layout Components">
            <Paragraph>
              Container, Grid, Stack, Divider for organizing content.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Data Display">
            <Paragraph>
              Table, DataTable, Badge, Tooltip for displaying information.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem title="Styling" icon={<Icon name="symbol-color" />}>
        <Accordion style={{ marginTop: 'var(--spacing-2)' }}>
          <AccordionItem title="Design Tokens">
            <Paragraph>
              Use semantic design tokens for colors, spacing, typography, and effects.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Theme Variables">
            <Paragraph>
              Automatic mapping to VSCode CSS variables for seamless theming.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordions can be nested to create hierarchical navigation or multi-level content organization.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all accordion features and variations.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-8)',
      padding: 'var(--spacing-8)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div>
        <Heading level={2} marginBottom>
          Accordion Component Showcase
        </Heading>
        <Paragraph size="base" color="muted">
          Explore all the features and variations of the Accordion component.
        </Paragraph>
      </div>

      <div>
        <Heading level={3} marginBottom>
          Basic Accordion
        </Heading>
        <Accordion style={{ width: '600px' }}>
          <AccordionItem title="Section 1" defaultOpen>
            <Paragraph>
              Content for the first section. Multiple sections can be open at the same time.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Section 2">
            <Paragraph>
              Content for the second section.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Section 3">
            <Paragraph>
              Content for the third section.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Heading level={3} marginBottom>
          Exclusive Mode
        </Heading>
        <Accordion exclusive defaultOpen="opt-1" style={{ width: '600px' }}>
          <AccordionItem id="opt-1" title="Option 1">
            <Paragraph>
              Only one section can be open at a time in exclusive mode.
            </Paragraph>
          </AccordionItem>
          <AccordionItem id="opt-2" title="Option 2">
            <Paragraph>
              Opening this will automatically close the other sections.
            </Paragraph>
          </AccordionItem>
          <AccordionItem id="opt-3" title="Option 3">
            <Paragraph>
              Great for wizards, FAQs, or settings panels.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Heading level={3} marginBottom>
          With Icons
        </Heading>
        <Accordion style={{ width: '600px' }}>
          <AccordionItem title="Files" icon={<Icon name="file" />}>
            <Paragraph>
              Manage your project files and folders.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Search" icon={<Icon name="search" />}>
            <Paragraph>
              Search across your entire workspace.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Settings" icon={<Icon name="gear" />}>
            <Paragraph>
              Configure application preferences.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Heading level={3} marginBottom>
          Custom Title Nodes with Badges
        </Heading>
        <Accordion style={{ width: '600px' }}>
          <AccordionItem
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
                <Icon name="rocket" />
                <Text weight="semibold">New Features</Text>
                <Badge variant="info" size="sm">5</Badge>
              </div>
            }
            defaultOpen
          >
            <Paragraph>
              Latest features with icons and badges in the title.
            </Paragraph>
          </AccordionItem>
          <AccordionItem
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)', width: '100%' }}>
                <Icon name="beaker" />
                <Text>Experimental</Text>
                <Badge variant="warning" size="sm">Beta</Badge>
              </div>
            }
          >
            <Paragraph>
              Experimental features with warning badges.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Heading level={3} marginBottom>
          With Disabled State
        </Heading>
        <Accordion style={{ width: '600px' }}>
          <AccordionItem title="Available Feature" icon={<Icon name="check" />} defaultOpen>
            <Paragraph>
              This feature is ready to use.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Coming Soon" icon={<Icon name="clock" />} disabled>
            <Paragraph>
              This feature is under development.
            </Paragraph>
          </AccordionItem>
          <AccordionItem title="Premium Feature" icon={<Icon name="star-full" />} disabled>
            <Paragraph>
              Upgrade to access this feature.
            </Paragraph>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase of all accordion features including basic usage, exclusive mode, icons, custom titles with badges, and disabled states.',
      },
    },
  },
};
