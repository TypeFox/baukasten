import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A prestyled container for displaying important information to users. Supports multiple variants (info, success, warning, error) with default icons, optional title, and dismissible functionality. Fully integrates with the design system tokens for consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant of the alert',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional title/header for the alert',
    },
    children: {
      control: 'text',
      description: 'Content to display in the alert body',
    },
    icon: {
      control: false,
      description: 'Custom icon to override the default variant icon',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed with a close button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      control: false,
      description: 'Optional callback when the close button is clicked',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all alert properties exposed.
 * Use the controls below to experiment with different combinations.
 */
export const Interactive: Story = {
  args: {
    variant: 'info',
    title: undefined,
    children: 'This is an alert message that provides important information to the user.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all alert properties. Try different variants, add a title, and experiment with the controls below.',
      },
    },
  },
};

/**
 * All available alert variants displayed for comparison.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '500px' }}>
      <Alert variant="info">
        This is an informational alert. Use it to provide helpful information to users.
      </Alert>
      <Alert variant="success">
        Operation completed successfully! Your changes have been saved.
      </Alert>
      <Alert variant="warning">
        Please review your changes before proceeding. This action may have consequences.
      </Alert>
      <Alert variant="error">
        An error occurred while processing your request. Please try again.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert variants: **Info** (general information), **Success** (successful operations), **Warning** (important notices), **Error** (error messages). Each variant has a distinct color scheme and default icon.',
      },
    },
  },
};

/**
 * Alerts with titles for more structured content.
 */
export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '500px' }}>
      <Alert variant="info" title="Information">
        This alert includes a title to provide additional context and structure to the message.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully and are now live.
      </Alert>
      <Alert variant="warning" title="Warning">
        This action cannot be undone. Please make sure you want to proceed.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to connect to the server. Please check your network connection and try again.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts can include an optional title for better content organization. The title is displayed in a semibold font above the main content.',
      },
    },
  },
};

/**
 * Dismissible alerts with close buttons.
 */
export const Dismissible: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '500px' }}>
      <Alert
        variant="info"
        title="Dismissible Info"
        closable
      >
        This alert can be dismissed by clicking the close button.
      </Alert>
      <Alert
        variant="success"
        closable
      >
        Success! This alert can also be dismissed.
      </Alert>
      <Alert
        variant="warning"
        title="Important Warning"
        closable
      >
        Make sure to save your work before closing this alert.
      </Alert>
      <Alert
        variant="error"
        closable
        onClose={() => console.log('Error alert closed')}
      >
        An error occurred. You can optionally add an onClose callback.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set `closable={true}` to show a close button in the top-right corner. The alert will hide itself when dismissed. Optionally provide an `onClose` callback for side effects. The button is fully accessible with keyboard navigation and includes proper ARIA labels.',
      },
    },
  },
};

/**
 * Alerts with custom icons.
 */
export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '500px' }}>
      <Alert
        variant="info"
        icon={<Icon name="lightbulb" size="md" />}
        title="Tip"
      >
        You can override the default icon with any custom icon you prefer.
      </Alert>
      <Alert
        variant="success"
        icon={<Icon name="rocket" size="md" />}
        title="Launched"
      >
        Your application has been successfully deployed to production!
      </Alert>
      <Alert
        variant="warning"
        icon={<Icon name="flame" size="md" />}
        title="Hot Feature"
      >
        This is a brand new feature that just launched. Try it out!
      </Alert>
      <Alert
        variant="error"
        icon={<Icon name="bug" size="md" />}
        title="Bug Report"
      >
        We detected a bug in your code. Please review and fix the issue.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The default variant icons can be overridden with custom icons by passing a React node to the `icon` prop. This allows for more expressive alerts.',
      },
    },
  },
};

/**
 * Alerts without icons for a more minimal appearance.
 */
export const WithoutIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '500px' }}>
      <Alert variant="info" icon={null}>
        This alert has no icon, providing a more minimal appearance.
      </Alert>
      <Alert variant="success" icon={null} title="Success">
        You can also combine iconless alerts with titles for a clean, text-focused design.
      </Alert>
      <Alert variant="warning" icon={null} closable>
        Iconless alerts can still be dismissible with a close button.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass `icon={null}` to render alerts without icons for a more minimal, text-focused design. This works with all variants and features.',
      },
    },
  },
};

/**
 * Different content lengths and structures.
 */
export const ContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', width: '600px' }}>
      <Alert variant="info" title="Short Message">
        Brief alert.
      </Alert>

      <Alert variant="success" title="Medium Length Message">
        This alert contains a moderate amount of text that provides enough detail without being overwhelming.
      </Alert>

      <Alert variant="warning" title="Longer Content Example">
        This alert demonstrates how the component handles longer content. The text wraps naturally and maintains proper spacing and readability. You can include multiple sentences or even paragraphs of information. The component automatically adjusts its height to accommodate the content while maintaining the design consistency.
      </Alert>

      <Alert variant="info" title="With Structured Content">
        <div>
          <p style={{ margin: '0 0 var(--bk-spacing-2) 0' }}>
            Alerts can contain structured content including:
          </p>
          <ul style={{ margin: '0', paddingLeft: 'var(--bk-spacing-4)' }}>
            <li>Lists of items</li>
            <li>Multiple paragraphs</li>
            <li>Inline formatting</li>
          </ul>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts automatically adapt to different content lengths and can contain rich HTML content including lists, paragraphs, and inline formatting.',
      },
    },
  },
};

/**
 * Complete examples of common alert use cases.
 */
export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', width: '600px' }}>
      <div>
        <h4 style={{
          marginBottom: 'var(--bk-spacing-2)',
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)'
        }}>
          System Notification
        </h4>
        <Alert
          variant="info"
          title="System Update Available"
          closable
        >
          A new version of the application is available. Please save your work and restart to apply the update.
        </Alert>
      </div>

      <div>
        <h4 style={{
          marginBottom: 'var(--bk-spacing-2)',
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)'
        }}>
          Form Validation Success
        </h4>
        <Alert variant="success" title="Form Submitted">
          Your form has been successfully submitted. We'll review it and get back to you within 24 hours.
        </Alert>
      </div>

      <div>
        <h4 style={{
          marginBottom: 'var(--bk-spacing-2)',
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)'
        }}>
          Destructive Action Warning
        </h4>
        <Alert
          variant="warning"
          title="Destructive Action"
          icon={<Icon name="trash" size="md" />}
        >
          You are about to permanently delete this resource. This action cannot be undone.
        </Alert>
      </div>

      <div>
        <h4 style={{
          marginBottom: 'var(--bk-spacing-2)',
          fontSize: 'var(--bk-font-size-sm)',
          fontWeight: 'var(--bk-font-weight-medium)'
        }}>
          API Error Message
        </h4>
        <Alert
          variant="error"
          title="Connection Failed"
          closable
        >
          Unable to connect to the API server. Please check your internet connection and try again.
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples demonstrating common alert patterns: system notifications, form feedback, destructive action warnings, and API error messages.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all alert capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--bk-spacing-6)',
      padding: 'var(--bk-spacing-4)',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      {/* Basic Variants */}
      <div>
        <h3 style={{
          marginBottom: 'var(--bk-spacing-3)',
          fontSize: 'var(--bk-font-size-base)',
          fontWeight: 'var(--bk-font-weight-semibold)'
        }}>
          Basic Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Alert variant="info">
            Informational alert with default styling and icon.
          </Alert>
          <Alert variant="success">
            Success alert indicating a positive outcome.
          </Alert>
          <Alert variant="warning">
            Warning alert for important notices.
          </Alert>
          <Alert variant="error">
            Error alert for critical issues.
          </Alert>
        </div>
      </div>

      {/* With Titles */}
      <div>
        <h3 style={{
          marginBottom: 'var(--bk-spacing-3)',
          fontSize: 'var(--bk-font-size-base)',
          fontWeight: 'var(--bk-font-weight-semibold)'
        }}>
          With Titles
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Alert variant="info" title="Information">
            Add titles to provide additional context and structure.
          </Alert>
          <Alert variant="success" title="Operation Successful">
            Your changes have been saved successfully.
          </Alert>
          <Alert variant="warning" title="Action Required">
            Please review the following information carefully.
          </Alert>
          <Alert variant="error" title="Critical Error">
            An unexpected error has occurred.
          </Alert>
        </div>
      </div>

      {/* Dismissible */}
      <div>
        <h3 style={{
          marginBottom: 'var(--bk-spacing-3)',
          fontSize: 'var(--bk-font-size-base)',
          fontWeight: 'var(--bk-font-weight-semibold)'
        }}>
          Dismissible Alerts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Alert
            variant="info"
            title="Tip"
            closable
          >
            Alerts become dismissible when you set the closable prop.
          </Alert>
          <Alert
            variant="success"
            closable
          >
            This success alert can be dismissed by the user.
          </Alert>
        </div>
      </div>

      {/* Custom Icons */}
      <div>
        <h3 style={{
          marginBottom: 'var(--bk-spacing-3)',
          fontSize: 'var(--bk-font-size-base)',
          fontWeight: 'var(--bk-font-weight-semibold)'
        }}>
          Custom Icons
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)' }}>
          <Alert
            variant="info"
            icon={<Icon name="lightbulb" size="md" />}
            title="Pro Tip"
          >
            Override the default icon with any custom icon.
          </Alert>
          <Alert
            variant="success"
            icon={<Icon name="rocket" size="md" />}
            title="Launched"
          >
            Your application is now live in production!
          </Alert>
          <Alert variant="warning" icon={null}>
            Or remove the icon entirely for a minimal design.
          </Alert>
        </div>
      </div>

      {/* Complex Content */}
      <div>
        <h3 style={{
          marginBottom: 'var(--bk-spacing-3)',
          fontSize: 'var(--bk-font-size-base)',
          fontWeight: 'var(--bk-font-weight-semibold)'
        }}>
          Complex Content
        </h3>
        <Alert
          variant="warning"
          title="Important Notice"
          closable
        >
          <div>
            <p style={{ margin: '0 0 var(--bk-spacing-2) 0' }}>
              Alerts can contain rich structured content including:
            </p>
            <ul style={{ margin: '0', paddingLeft: 'var(--bk-spacing-4)' }}>
              <li>Multiple paragraphs of text</li>
              <li>Lists (ordered or unordered)</li>
              <li>Inline formatting and links</li>
              <li>Any valid React content</li>
            </ul>
          </div>
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all alert capabilities: variants, titles, dismissible functionality, custom icons, and complex content. Use this as a reference for all available combinations.',
      },
    },
  },
};
