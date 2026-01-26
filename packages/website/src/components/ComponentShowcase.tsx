'use client';

import CodeBlock from './CodeBlock';
import {
  Heading,
  Paragraph,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Code,
  Badge
} from 'baukasten-ui';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface ShowcaseProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  props?: PropDefinition[];
}

export function Showcase({ title, description, preview, code, props }: ShowcaseProps) {
  return (
    <section style={{ marginBottom: 'var(--padding-2xl)' }}>
      <Heading level={2}>
        {title}
      </Heading>
      {description && (
        <Paragraph>
          {description}
        </Paragraph>
      )}

      <div style={{ marginBottom: 'var(--padding-md)' }}>
        <Tabs defaultValue="preview" variant="line" size="sm">
          <TabList>
            <Tab value="preview">Preview</Tab>
            <Tab value="code">Code</Tab>
          </TabList>

          <TabPanels style={{ paddingTop: 'var(--padding-md)', overflow: 'visible' }}>
            <TabPanel value="preview">
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--padding-xl)',
                marginBottom: 'var(--padding-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
                gap: 'var(--padding-md)',
                flexWrap: 'wrap',
                overflow: 'visible',
              }}>
                {preview}
              </div>
            </TabPanel>
            <TabPanel value="code">
              <CodeBlock code={code} language="tsx" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      {props && props.length > 0 && (
        <>
          <Heading level={2} style={{ marginBottom: 'var(--padding-md)' }}>
            Props
          </Heading>
          <Table variant="default" size="sm" bordered>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Default</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {props.map((prop, i) => (
                <Table.Row key={`${prop.name}-${i}`}>
                  <Table.Cell>
                    <Code>{prop.name}</Code>
                    {prop.required && <Badge variant="error" style={{ marginLeft: '4px' }}>*</Badge>}
                  </Table.Cell>
                  <Table.Cell>
                    <Code>{prop.type}</Code>
                  </Table.Cell>
                  <Table.Cell>{prop.default || '—'}</Table.Cell>
                  <Table.Cell>{prop.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </section>
  );
}

interface VariantGridProps {
  children: React.ReactNode;
}

export function VariantGrid({ children }: VariantGridProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--padding-lg)',
    }}>
      {children}
    </div>
  );
}

interface VariantProps {
  label: string;
  children: React.ReactNode;
}

export function Variant({ label, children }: VariantProps) {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--border-radius-md)',
      padding: 'var(--padding-lg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--padding-md)',
      minWidth: '140px',
      flex: '0 1 auto',
    }}>
      {children}
      <div style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-secondary)',
        fontWeight: 'var(--font-weight-medium)',
      }}>
        {label}
      </div>
    </div>
  );
}
