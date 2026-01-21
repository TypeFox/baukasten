'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Alert, Icon } from '@baukasten/ui';

const alertProps: PropDefinition[] = [
  {
    name: 'variant',
    type: '"info" | "success" | "warning" | "error"',
    default: '"info"',
    description: 'Visual variant of the alert',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional title/header for the alert',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Content to display in the alert body',
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Custom icon to override the default variant icon',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'Whether the alert can be dismissed with a close button',
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Optional callback when the close button is clicked',
  },
];

export default function AlertPage() {
  return (
    <PageLayout
      title="Alert"
      description="A prestyled container for displaying important information to users with multiple variants and optional dismissibility."
    >
      <Showcase
        title="Basic Usage"
        description="The default alert with info variant."
        preview={
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Alert>
              This is an informational alert that provides helpful information to users.
            </Alert>
          </div>
        }
        code={`import { Alert } from '@baukasten/ui';

function App() {
  return (
    <Alert>
      This is an informational alert.
    </Alert>
  );
}`}
      />

      <Showcase
        title="Variants"
        description="Four variants for different types of messages: info, success, warning, and error."
        preview={
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
        }
        code={`<Alert variant="info">
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
</Alert>`}
      />

      <Showcase
        title="With Title"
        description="Add an optional title for better content organization."
        preview={
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
              Failed to connect to the server. Please check your network connection.
            </Alert>
          </div>
        }
        code={`<Alert variant="info" title="Information">
  This alert includes a title to provide additional context and structure to the message.
</Alert>

<Alert variant="success" title="Success">
  Your changes have been saved successfully and are now live.
</Alert>

<Alert variant="warning" title="Warning">
  This action cannot be undone. Please make sure you want to proceed.
</Alert>

<Alert variant="error" title="Error">
  Failed to connect to the server. Please check your network connection.
</Alert>`}
      />

      <Showcase
        title="Dismissible"
        description="Alerts can be made dismissible by setting the closable prop."
        preview={
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Alert variant="info" title="Dismissible Info" closable>
              This alert can be dismissed by clicking the close button.
            </Alert>
            <Alert variant="success" closable>
              Success! This alert can also be dismissed.
            </Alert>
            <Alert variant="warning" title="Important Warning" closable>
              Make sure to save your work before closing this alert.
            </Alert>
          </div>
        }
        code={`<Alert variant="info" closable>
  This alert can be dismissed.
</Alert>

<Alert 
  variant="error" 
  closable
  onClose={() => console.log('Alert closed')}
>
  With callback on close
</Alert>`}
      />

      <Showcase
        title="Custom Icons"
        description="Override the default variant icons with custom icons."
        preview={
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Alert
              variant="info"
              icon={<Icon name="lightbulb" />}
              title="Tip"
            >
              You can override the default icon with any custom icon you prefer.
            </Alert>
            <Alert
              variant="success"
              icon={<Icon name="rocket" />}
              title="Launched"
            >
              Your application has been successfully deployed to production!
            </Alert>
            <Alert
              variant="warning"
              icon={<Icon name="flame" />}
              title="Hot Feature"
            >
              This is a brand new feature that just launched. Try it out!
            </Alert>
            <Alert
              variant="error"
              icon={<Icon name="bug" />}
              title="Bug Report"
            >
              We detected a bug in your code. Please review and fix the issue.
            </Alert>
          </div>
        }
        code={`<Alert
  variant="info"
  icon={<Icon name="lightbulb" />}
  title="Tip"
>
  Custom icon alert
</Alert>

<Alert
  variant="success"
  icon={<Icon name="rocket" />}
  title="Launched"
>
  Deployment successful!
</Alert>`}
      />

      <Showcase
        title="Without Icons"
        description="Pass icon={null} to render alerts without icons for a minimal design."
        preview={
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Alert variant="info" icon={null}>
              This alert has no icon, providing a more minimal appearance.
            </Alert>
            <Alert variant="success" icon={null} title="Success">
              You can also combine iconless alerts with titles for a clean design.
            </Alert>
            <Alert variant="warning" icon={null} closable>
              Iconless alerts can still be dismissible with a close button.
            </Alert>
          </div>
        }
        code={`<Alert variant="info" icon={null}>
  Alert without icon
</Alert>

<Alert variant="success" icon={null} title="Success">
  Minimal design with title
</Alert>`}
      />

      <Showcase
        title="Complex Content"
        description="Alerts can contain rich structured content including lists and paragraphs."
        preview={
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Alert variant="warning" title="Important Notice" closable>
              <div>
                <p style={{ margin: `0 0 var(--spacing-2) 0` }}>
                  Alerts can contain rich structured content including:
                </p>
                <ul style={{ margin: '0', paddingLeft: 'var(--spacing-5)' }}>
                  <li>Multiple paragraphs of text</li>
                  <li>Lists (ordered or unordered)</li>
                  <li>Inline formatting and links</li>
                  <li>Any valid React content</li>
                </ul>
              </div>
            </Alert>
          </div>
        }
        code={`<Alert variant="warning" title="Important Notice">
  <div>
    <p>Alerts can contain structured content:</p>
    <ul>
      <li>Lists</li>
      <li>Multiple paragraphs</li>
      <li>Inline formatting</li>
    </ul>
  </div>
</Alert>`}
        props={alertProps}
      />
    </PageLayout>
  );
}

