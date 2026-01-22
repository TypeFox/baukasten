'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Accordion, AccordionItem, Icon, Badge, Paragraph, Text, Code } from 'baukasten';

const accordionProps: PropDefinition[] = [
  {
    name: 'exclusive',
    type: 'boolean',
    default: 'false',
    description: 'Whether only one accordion item can be open at a time',
  },
  {
    name: 'defaultOpen',
    type: 'string',
    default: 'undefined',
    description: 'Default open item key (for controlled exclusive mode)',
  },
  {
    name: 'onAccordionChange',
    type: '(key: string) => void',
    description: 'Callback when accordion items are toggled',
  },
];

const accordionItemProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'React.ReactNode',
    required: true,
    description: 'Title displayed in the accordion header',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for this item (required for exclusive mode)',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the item is open by default',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the item is disabled',
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Optional icon to display before the title',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Content to display when the accordion item is expanded',
  },
];

export default function AccordionPage() {
  return (
    <PageLayout
      title="Accordion"
      description="A collapsible content panel component for organizing information in expandable sections."
    >
      <Showcase
        title="Basic Usage"
        description="The default accordion allows multiple sections to be open simultaneously."
        preview={
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Accordion>
              <AccordionItem title="What is Baukasten?">
                <Paragraph>
                  Baukasten is a React component library for building VSCode webview UIs.
                </Paragraph>
              </AccordionItem>
              <AccordionItem title="Why use Baukasten?" defaultOpen>
                <Paragraph>
                  It speeds up development by providing ready-to-use components.
                </Paragraph>
              </AccordionItem>
              <AccordionItem title="How to install?">
                <Paragraph>
                  Install via npm: <Code>npm install @baukasten/ui</Code>
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`import { Accordion, AccordionItem } from 'baukasten';

function App() {
  return (
    <Accordion>
      <AccordionItem title="Section 1">
        Content for section 1
      </AccordionItem>
      <AccordionItem title="Section 2" defaultOpen>
        Content for section 2
      </AccordionItem>
      <AccordionItem title="Section 3">
        Content for section 3
      </AccordionItem>
    </Accordion>
  );
}`}
      />

      <Showcase
        title="Exclusive Mode"
        description="In exclusive mode, only one accordion item can be open at a time."
        preview={
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Accordion exclusive defaultOpen="performance">
              <AccordionItem id="performance" title="Performance">
                <Paragraph>
                  Optimized for performance with minimal re-renders.
                </Paragraph>
              </AccordionItem>
              <AccordionItem id="theming" title="Theming">
                <Paragraph>
                  Automatic theme synchronization with VSCode.
                </Paragraph>
              </AccordionItem>
              <AccordionItem id="accessibility" title="Accessibility">
                <Paragraph>
                  Built with accessibility in mind with ARIA support.
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<Accordion exclusive defaultOpen="section-1">
  <AccordionItem id="section-1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem id="section-2" title="Section 2">
    Content for section 2
  </AccordionItem>
  <AccordionItem id="section-3" title="Section 3">
    Content for section 3
  </AccordionItem>
</Accordion>`}
      />

      <Showcase
        title="With Icons"
        description="Add icons to accordion items for better visual communication."
        preview={
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Accordion>
              <AccordionItem
                title="General Settings"
                icon={<Icon name="gear" />}
                defaultOpen
              >
                <Paragraph>
                  Configure general application settings.
                </Paragraph>
              </AccordionItem>
              <AccordionItem
                title="Notifications"
                icon={<Icon name="bell" />}
              >
                <Paragraph>
                  Manage notification preferences.
                </Paragraph>
              </AccordionItem>
              <AccordionItem
                title="Security"
                icon={<Icon name="shield" />}
              >
                <Paragraph>
                  Security and authentication settings.
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<Accordion>
  <AccordionItem
    title="Settings"
    icon={<Icon name="gear" />}
  >
    Settings content
  </AccordionItem>
  <AccordionItem
    title="Notifications"
    icon={<Icon name="bell" />}
  >
    Notification settings
  </AccordionItem>
</Accordion>`}
      />

      <Showcase
        title="Custom Title Nodes"
        description="Titles can be any React node, allowing for rich, custom headers with badges and complex layouts."
        preview={
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion>
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
                  Check out the latest features added to Baukasten.
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
                  Several critical bugs have been resolved.
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
                  Try out experimental features in beta.
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<AccordionItem
  title={
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
      <Icon name="rocket" />
      <Text weight="semibold">New Features</Text>
      <Badge variant="info" size="sm">3</Badge>
    </div>
  }
>
  Content here
</AccordionItem>`}
      />

      <Showcase
        title="Disabled State"
        description="Accordion items can be disabled to prevent interaction."
        preview={
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Accordion>
              <AccordionItem title="Available Feature" defaultOpen>
                <Paragraph>
                  This feature is available and ready to use.
                </Paragraph>
              </AccordionItem>
              <AccordionItem title="Coming Soon Feature" disabled>
                <Paragraph>
                  This feature is under development.
                </Paragraph>
              </AccordionItem>
              <AccordionItem title="Beta Feature" icon={<Icon name="beaker" />}>
                <Paragraph>
                  This feature is in beta testing.
                </Paragraph>
              </AccordionItem>
              <AccordionItem title="Deprecated Feature" disabled icon={<Icon name="warning" />}>
                <Paragraph>
                  This feature will be removed soon.
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<Accordion>
  <AccordionItem title="Available">
    Available content
  </AccordionItem>
  <AccordionItem title="Coming Soon" disabled>
    Coming soon content
  </AccordionItem>
</Accordion>`}
      />

      <Showcase
        title="Rich Content"
        description="Accordion content can include rich formatting: lists, code blocks, and styled text."
        preview={
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Accordion>
              <AccordionItem title="Installation Guide" defaultOpen>
                <Paragraph>Follow these steps to install Baukasten:</Paragraph>
                <ol style={{ paddingLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                  <li style={{ marginBottom: 'var(--spacing-1)' }}>
                    <Text>Install: <Code>npm install @baukasten/ui</Code></Text>
                  </li>
                  <li style={{ marginBottom: 'var(--spacing-1)' }}>
                    <Text>Import components in your app</Text>
                  </li>
                  <li style={{ marginBottom: 'var(--spacing-1)' }}>
                    <Text>Add <Code>GlobalStyles</Code> to root</Text>
                  </li>
                </ol>
              </AccordionItem>
              <AccordionItem title="API Reference" icon={<Icon name="symbol-method" />}>
                <Paragraph>
                  Each component comes with comprehensive props documentation.
                </Paragraph>
              </AccordionItem>
            </Accordion>
          </div>
        }
        code={`<AccordionItem title="Guide">
  <Paragraph>Follow these steps:</Paragraph>
  <ol>
    <li><Text>Step 1: <Code>install</Code></Text></li>
    <li><Text>Step 2: Import</Text></li>
    <li><Text>Step 3: Use</Text></li>
  </ol>
</AccordionItem>`}
        props={[
          ...accordionProps,
          { name: '---', type: '---', description: 'AccordionItem Props:' },
          ...accordionItemProps,
        ]}
      />
    </PageLayout>
  );
}

