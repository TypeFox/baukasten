'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  TextArea,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Badge,
  Spinner,
  Table,
  FieldLabel,
  Label,
  Link as BkLink,
  IconButton,
  Icon,
  Tag,
} from 'baukasten-ui/core';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'baukasten-ui/extra';

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const extensionData = [
  { name: 'Python', author: 'Microsoft', installs: '42,651,663' },
  { name: 'C/C++', author: 'Microsoft', installs: '23,513,104' },
  { name: 'Jupyter', author: 'Microsoft', installs: '22,620,933' },
  { name: 'ESLint', author: 'Dirk Baeumer', installs: '16,512,593' },
  { name: 'Prettier', author: 'Prettier', installs: '15,347,264' },
  { name: 'Pylance', author: 'Microsoft', installs: '15,213,612' },
];

/**
 * ToolkitGallery - A showcase component that displays a variety of Baukasten UI
 * components in a grid layout, resembling a VS Code Toolkit Gallery panel.
 */
export const ToolkitGallery: React.FC = () => {
  const [selectValue, setSelectValue] = useState<string>('option2');
  const [radioValue, setRadioValue] = useState<string | number>('option1');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1.5fr',
        gap: 'var(--bk-spacing-8)',
        padding: 'var(--bk-spacing-8)',
        backgroundColor: 'var(--vscode-editor-background)',
        borderRadius: 'var(--bk-radius-lg)',
        border: '1px solid var(--vscode-panel-border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Column 1: Form Controls ──────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', alignItems: 'center' }}>
          <Button variant="primary">Button</Button>
          <Button variant="secondary">Button</Button>
          <IconButton size="sm" icon={<Icon name="settings-gear" />} variant='secondary' aria-label="Settings" />
        </div>

        {/* Text Input */}
        <div style={{ display: "flex", "flexDirection": "column" }}>
          <FieldLabel>Label</FieldLabel>
          <Input value="Populated text" readOnly />
        </div>

        {/* Select Dropdown */}
        <div style={{ display: "flex", "flexDirection": "column" }}>
          <FieldLabel>Label</FieldLabel>
          <Select
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            fullWidth
          />
        </div>

        {/* TextArea */}
        <div style={{ display: "flex", "flexDirection": "column" }}>
          <FieldLabel>Label</FieldLabel>
          <TextArea placeholder="Placeholder" rows={3} />
        </div>

        {/* Link */}
        <BkLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          Sample link
        </BkLink>
      </div>

      {/* ── Column 2: Selection & Feedback ───────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
        {/* Radio Group */}
        <div>
          <FieldLabel style={{ marginBottom: 'var(--bk-spacing-2)' }}>Label</FieldLabel>
          <RadioGroup name="gallery-radio" value={radioValue} onChange={setRadioValue}>
            <Label variant="checkbox" size="md">
              <Radio value="option1" />
              <span>Label</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="option2" />
              <span>Label</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Radio value="option3" />
              <span>Label</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Checkbox Group */}
        <div>
          <FieldLabel style={{ marginBottom: 'var(--bk-spacing-2)' }}>Label</FieldLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-2)' }}>
            <Label variant="checkbox" size="md">
              <Checkbox defaultChecked />
              <span>Label</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Checkbox defaultChecked />
              <span>Label</span>
            </Label>
            <Label variant="checkbox" size="md">
              <Checkbox />
              <span>Label</span>
            </Label>
          </div>
        </div>

        {/* Badge & Tag */}
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)', alignItems: 'center' }}>
          <Badge variant="info" size="sm">1</Badge>
          <Tag variant="default">TAG</Tag>
        </div>

        {/* Spinner */}
        <div>
          <Spinner size="lg" />
        </div>
      </div>

      {/* ── Column 3: Data Display ───────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
        {/* Data Table */}
        <Table variant="default" size="sm" bordered={false}>
          <Table.Head>
            <Table.Row hoverable={false}>
              <Table.HeaderCell>Extension name</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell align="right">Installs</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {extensionData.map((ext, i) => (
              <Table.Row key={ext.name} selected={i === 2}>
                <Table.Cell>{ext.name}</Table.Cell>
                <Table.Cell>
                  {ext.author}
                </Table.Cell>
                <Table.Cell align="right">{ext.installs}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Tabs */}
        <Tabs defaultValue="tab1" size="sm">
          <TabList>
            <Tab value="tab1">
              TAB 1 <Badge variant="default" size="sm" style={{ marginLeft: 'var(--bk-spacing-1)' }}>1</Badge>
            </Tab>
            <Tab value="tab2">TAB 2</Tab>
            <Tab value="tab3">TAB 3</Tab>
            <Tab value="tab4">TAB 4</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="tab1">
              <div
                style={{
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vscode-descriptionForeground)',
                  border: '1px solid var(--vscode-panel-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-spacing-6)',
                }}
              >
                Replace with content
              </div>
            </TabPanel>
            <TabPanel value="tab2">
              <div
                style={{
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vscode-descriptionForeground)',
                  border: '1px solid var(--vscode-panel-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-spacing-6)',
                }}
              >
                Tab 2 content
              </div>
            </TabPanel>
            <TabPanel value="tab3">
              <div
                style={{
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vscode-descriptionForeground)',
                  border: '1px solid var(--vscode-panel-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-spacing-6)',
                }}
              >
                Tab 3 content
              </div>
            </TabPanel>
            <TabPanel value="tab4">
              <div
                style={{
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vscode-descriptionForeground)',
                  border: '1px solid var(--vscode-panel-border)',
                  borderRadius: 'var(--bk-radius-md)',
                  padding: 'var(--bk-spacing-6)',
                }}
              >
                Tab 4 content
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default ToolkitGallery;
