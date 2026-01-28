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
    <section style={{ marginBottom: 'var(--bk-padding-2xl)' }}>
      <Heading level={2}>
        {title}
      </Heading>
      {description && (
        <Paragraph>
          {description}
        </Paragraph>
      )}

      <div style={{ marginBottom: 'var(--bk-padding-md)' }}>
        <Tabs defaultValue="preview" variant="line" size="sm">
          <TabList>
            <Tab value="preview">Preview</Tab>
            <Tab value="code">Code</Tab>
          </TabList>

          <TabPanels style={{ paddingTop: 'var(--bk-padding-md)', overflow: 'visible' }}>
            <TabPanel value="preview">
              <div style={{
                backgroundColor: 'var(--bk-color-surface)',
                border: '1px solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
                padding: 'var(--bk-padding-xl)',
                marginBottom: 'var(--bk-padding-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
                gap: 'var(--bk-padding-md)',
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
          <Heading level={2} style={{ marginBottom: 'var(--bk-padding-md)' }}>
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
      gap: 'var(--bk-padding-lg)',
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
      backgroundColor: 'var(--bk-color-surface)',
      border: '1px solid var(--bk-color-border)',
      borderRadius: 'var(--bk-radius-md)',
      padding: 'var(--bk-padding-lg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--bk-padding-md)',
      minWidth: '140px',
      flex: '0 1 auto',
    }}>
      {children}
      <div style={{
        fontSize: 'var(--bk-font-size-sm)',
        color: 'var(--bk-color-text-secondary)',
        fontWeight: 'var(--bk-font-weight-medium)',
      }}>
        {label}
      </div>
    </div>
  );
}
