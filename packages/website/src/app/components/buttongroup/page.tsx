'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { ButtonGroup, Button, Icon, Menu, MenuItem, MenuDivider, Heading } from 'baukasten-ui';

const buttonGroupProps: PropDefinition[] = [
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the button group should take full width' },
    { name: 'showSeparator', type: 'boolean', default: 'false', description: 'Whether to show separator lines between buttons' },
];

const dropdownProps: PropDefinition[] = [
    { name: 'content', type: 'React.ReactNode', required: true, description: 'Content to display in the dropdown menu' },
    { name: 'placement', type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-end"', description: 'Placement of the dropdown relative to the trigger' },
    { name: 'closeOnClick', type: 'boolean', default: 'true', description: 'Whether to close the dropdown when clicking inside it' },
    { name: 'open', type: 'boolean', description: 'Whether the dropdown is open (controlled mode)' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when the dropdown open state changes' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the dropdown trigger is disabled' },
    { name: 'variant', type: 'ButtonVariant', default: '"primary"', description: 'Visual style variant of the dropdown button' },
    { name: 'size', type: 'Size', default: '"md"', description: 'Size of the dropdown button' },
    { name: 'outline', type: 'boolean', default: 'false', description: 'Whether to render with outline style' },
    { name: 'icon', type: 'React.ReactNode', description: 'Custom icon for the dropdown trigger (default: chevron-down)' },
    { name: 'ariaLabel', type: 'string', default: '"Open dropdown"', description: 'Aria label for the dropdown trigger button' },
];

// Sample menu for examples
const SampleMenu = () => (
    <Menu>
        <MenuItem icon={<Icon name="save" />}>Save</MenuItem>
        <MenuItem icon={<Icon name="save-as" />}>Save As...</MenuItem>
        <MenuItem icon={<Icon name="save-all" />}>Save All</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="export" />}>Export</MenuItem>
    </Menu>
);

// Controlled dropdown example
function ControlledDropdownExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <ButtonGroup>
                <Button variant="secondary" onClick={() => console.log('Action clicked')}>Action</Button>
                <ButtonGroup.Dropdown
                    variant="secondary"
                    content={
                        <Menu>
                            <MenuItem onClick={() => console.log('Option 1')}>Option 1</MenuItem>
                            <MenuItem onClick={() => console.log('Option 2')}>Option 2</MenuItem>
                            <MenuItem onClick={() => console.log('Option 3')}>Option 3</MenuItem>
                        </Menu>
                    }
                    open={isOpen}
                    onOpenChange={setIsOpen}
                />
            </ButtonGroup>
            <div style={{ marginTop: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--vscode-descriptionForeground)' }}>
                Dropdown is {isOpen ? 'open' : 'closed'}
            </div>
        </div>
    );
}

export default function ButtonGroupPage() {
    return (
        <PageLayout
            title="ButtonGroup"
            description="Groups buttons together with connected styling. Useful for creating toolbars, segmented controls, and split buttons. Supports a compositional API where buttons can be grouped naturally or combined with ButtonGroup.Dropdown for split button patterns."
        >
            <Showcase
                title="Basic Usage"
                description="Group related buttons together to create a unified control. All buttons maintain their individual variant and size properties."
                preview={
                    <ButtonGroup>
                        <Button variant="primary">Cut</Button>
                        <Button variant="primary">Copy</Button>
                        <Button variant="primary">Paste</Button>
                    </ButtonGroup>
                }
                code={`import { ButtonGroup, Button } from 'baukasten-ui';

function App() {
  return (
    <ButtonGroup>
      <Button variant="primary">Cut</Button>
      <Button variant="primary">Copy</Button>
      <Button variant="primary">Paste</Button>
    </ButtonGroup>
  );
}`}
                props={buttonGroupProps}
            />

            <Showcase
                title="Variants"
                description="Button groups work with all button variants. Set the variant explicitly on each button for consistent styling within the group."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <ButtonGroup>
                            <Button variant="primary">Cut</Button>
                            <Button variant="primary">Copy</Button>
                            <Button variant="primary">Paste</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="secondary">Bold</Button>
                            <Button variant="secondary">Italic</Button>
                            <Button variant="secondary">Underline</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="ghost">Left</Button>
                            <Button variant="ghost">Center</Button>
                            <Button variant="ghost">Right</Button>
                        </ButtonGroup>
                    </div>
                }
                code={`// Primary variant
<ButtonGroup>
  <Button variant="primary">Cut</Button>
  <Button variant="primary">Copy</Button>
  <Button variant="primary">Paste</Button>
</ButtonGroup>

// Secondary variant
<ButtonGroup>
  <Button variant="secondary">Bold</Button>
  <Button variant="secondary">Italic</Button>
  <Button variant="secondary">Underline</Button>
</ButtonGroup>

// Ghost variant
<ButtonGroup>
  <Button variant="ghost">Left</Button>
  <Button variant="ghost">Center</Button>
  <Button variant="ghost">Right</Button>
</ButtonGroup>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options available: xs, sm, md (default), lg, and xl. Set the size explicitly on each button for consistent sizing."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                            <ButtonGroup key={size}>
                                <Button variant="primary" size={size}>Cut</Button>
                                <Button variant="primary" size={size}>Copy</Button>
                                <Button variant="primary" size={size}>Paste</Button>
                            </ButtonGroup>
                        ))}
                    </div>
                }
                code={`<ButtonGroup>
  <Button variant="primary" size="xs">Cut</Button>
  <Button variant="primary" size="xs">Copy</Button>
  <Button variant="primary" size="xs">Paste</Button>
</ButtonGroup>

<ButtonGroup>
  <Button variant="primary" size="md">Cut</Button>
  <Button variant="primary" size="md">Copy</Button>
  <Button variant="primary" size="md">Paste</Button>
</ButtonGroup>

<ButtonGroup>
  <Button variant="primary" size="xl">Cut</Button>
  <Button variant="primary" size="xl">Copy</Button>
  <Button variant="primary" size="xl">Paste</Button>
</ButtonGroup>`}
            />

            <Showcase
                title="Outline Style"
                description="Outline button groups have transparent backgrounds with colored borders. They fill with solid color on hover."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <ButtonGroup>
                            <Button variant="primary" outline>Cut</Button>
                            <Button variant="primary" outline>Copy</Button>
                            <Button variant="primary" outline>Paste</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="secondary" outline>Day</Button>
                            <Button variant="secondary" outline>Week</Button>
                            <Button variant="secondary" outline>Month</Button>
                        </ButtonGroup>
                    </div>
                }
                code={`<ButtonGroup>
  <Button variant="primary" outline>Cut</Button>
  <Button variant="primary" outline>Copy</Button>
  <Button variant="primary" outline>Paste</Button>
</ButtonGroup>

<ButtonGroup>
  <Button variant="secondary" outline>Day</Button>
  <Button variant="secondary" outline>Week</Button>
  <Button variant="secondary" outline>Month</Button>
</ButtonGroup>`}
            />

            <Showcase
                title="With Separators"
                description="Use showSeparator to add visible separator lines between buttons. Works well with outline buttons and segmented controls."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-5)' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Without Separators (Default)
                            </div>
                            <ButtonGroup>
                                <Button variant="secondary">List</Button>
                                <Button variant="secondary">Grid</Button>
                                <Button variant="secondary">Columns</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                With Separators
                            </div>
                            <ButtonGroup showSeparator>
                                <Button variant="secondary">List</Button>
                                <Button variant="secondary">Grid</Button>
                                <Button variant="secondary">Columns</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Outline With Separators
                            </div>
                            <ButtonGroup showSeparator>
                                <Button variant="secondary" outline>Day</Button>
                                <Button variant="secondary" outline>Week</Button>
                                <Button variant="secondary" outline>Month</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                }
                code={`// Without separators (default)
<ButtonGroup>
  <Button variant="secondary">List</Button>
  <Button variant="secondary">Grid</Button>
  <Button variant="secondary">Columns</Button>
</ButtonGroup>

// With separators
<ButtonGroup showSeparator>
  <Button variant="secondary">List</Button>
  <Button variant="secondary">Grid</Button>
  <Button variant="secondary">Columns</Button>
</ButtonGroup>`}
            />

            <Showcase
                title="Split Button Pattern"
                description="Use ButtonGroup.Dropdown as the last child to create a split button pattern. The dropdown variant should match the main button for consistent styling."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <ButtonGroup>
                            <Button variant="primary" onClick={() => console.log('Save clicked')}>Save</Button>
                            <ButtonGroup.Dropdown variant="primary" content={<SampleMenu />} />
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="secondary" onClick={() => console.log('Deploy clicked')}>
                                <Icon name="rocket" />
                                Deploy
                            </Button>
                            <ButtonGroup.Dropdown variant="secondary" content={
                                <Menu>
                                    <MenuItem>Production</MenuItem>
                                    <MenuItem>Staging</MenuItem>
                                    <MenuItem>Development</MenuItem>
                                </Menu>
                            } />
                        </ButtonGroup>
                    </div>
                }
                code={`import { ButtonGroup, Button, Icon, Menu, MenuItem } from 'baukasten-ui';

// Basic split button
<ButtonGroup>
  <Button variant="primary" onClick={() => console.log('Save')}>
    Save
  </Button>
  <ButtonGroup.Dropdown 
    variant="primary" 
    content={
      <Menu>
        <MenuItem>Save</MenuItem>
        <MenuItem>Save As...</MenuItem>
        <MenuItem>Save All</MenuItem>
      </Menu>
    } 
  />
</ButtonGroup>

// With icon
<ButtonGroup>
  <Button variant="secondary">
    <Icon name="rocket" />
    Deploy
  </Button>
  <ButtonGroup.Dropdown 
    variant="secondary" 
    content={
      <Menu>
        <MenuItem>Production</MenuItem>
        <MenuItem>Staging</MenuItem>
        <MenuItem>Development</MenuItem>
      </Menu>
    } 
  />
</ButtonGroup>`}
                props={dropdownProps}
            />

            <Showcase
                title="With Icons"
                description="Button groups work great with icons for toolbars and controls. Mix text with icons, use icon-only buttons, or create icon-based navigation."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <ButtonGroup>
                            <Button variant="secondary">
                                <Icon name="bold" />
                                Bold
                            </Button>
                            <Button variant="secondary">
                                <Icon name="italic" />
                                Italic
                            </Button>
                            <Button variant="secondary">
                                <Icon name="file-text" />
                                Underline
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="ghost" circular>
                                <Icon name="layout-panel-left" />
                            </Button>
                            <Button variant="ghost" circular>
                                <Icon name="layout-centered" />
                            </Button>
                            <Button variant="ghost" circular>
                                <Icon name="layout-panel-right" />
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="primary" size="sm">
                                <Icon name="chevron-left" />
                            </Button>
                            <Button variant="primary" size="sm">1 / 10</Button>
                            <Button variant="primary" size="sm">
                                <Icon name="chevron-right" />
                            </Button>
                        </ButtonGroup>
                    </div>
                }
                code={`// Text with icons
<ButtonGroup>
  <Button variant="secondary">
    <Icon name="bold" />
    Bold
  </Button>
  <Button variant="secondary">
    <Icon name="italic" />
    Italic
  </Button>
</ButtonGroup>

// Icon-only circular buttons
<ButtonGroup>
  <Button variant="ghost" circular>
    <Icon name="layout-panel-left" />
  </Button>
  <Button variant="ghost" circular>
    <Icon name="layout-centered" />
  </Button>
  <Button variant="ghost" circular>
    <Icon name="layout-panel-right" />
  </Button>
</ButtonGroup>

// Pagination with icons
<ButtonGroup>
  <Button variant="primary" size="sm">
    <Icon name="chevron-left" />
  </Button>
  <Button variant="primary" size="sm">1 / 10</Button>
  <Button variant="primary" size="sm">
    <Icon name="chevron-right" />
  </Button>
</ButtonGroup>`}
            />

            <Showcase
                title="Full Width"
                description="Use the fullWidth prop to make button groups span the full width of their container. Each button automatically gets equal width."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                        <ButtonGroup fullWidth>
                            <Button variant="primary">Previous</Button>
                            <Button variant="primary">Next</Button>
                        </ButtonGroup>
                        <ButtonGroup fullWidth>
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="secondary">Apply</Button>
                            <Button variant="secondary">OK</Button>
                        </ButtonGroup>
                        <ButtonGroup fullWidth>
                            <Button variant="ghost" outline>Day</Button>
                            <Button variant="ghost" outline>Week</Button>
                            <Button variant="ghost" outline>Month</Button>
                            <Button variant="ghost" outline>Year</Button>
                        </ButtonGroup>
                    </div>
                }
                code={`<ButtonGroup fullWidth>
  <Button variant="primary">Previous</Button>
  <Button variant="primary">Next</Button>
</ButtonGroup>

<ButtonGroup fullWidth>
  <Button variant="secondary">Cancel</Button>
  <Button variant="secondary">Apply</Button>
  <Button variant="secondary">OK</Button>
</ButtonGroup>

<ButtonGroup fullWidth>
  <Button variant="ghost" outline>Day</Button>
  <Button variant="ghost" outline>Week</Button>
  <Button variant="ghost" outline>Month</Button>
  <Button variant="ghost" outline>Year</Button>
</ButtonGroup>`}
            />

            <Showcase
                title="Disabled State"
                description="Individual buttons can be disabled within a group. You can also disable the dropdown trigger in split button patterns."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', alignItems: 'flex-start' }}>
                        <ButtonGroup>
                            <Button variant="primary" disabled>Cut</Button>
                            <Button variant="primary" disabled>Copy</Button>
                            <Button variant="primary" disabled>Paste</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="primary" disabled>Save</Button>
                            <ButtonGroup.Dropdown variant="primary" disabled content={<SampleMenu />} />
                        </ButtonGroup>
                    </div>
                }
                code={`// Disabled buttons
<ButtonGroup>
  <Button variant="primary" disabled>Cut</Button>
  <Button variant="primary" disabled>Copy</Button>
  <Button variant="primary" disabled>Paste</Button>
</ButtonGroup>

// Disabled split button
<ButtonGroup>
  <Button variant="primary" disabled>Save</Button>
  <ButtonGroup.Dropdown variant="primary" disabled content={<Menu>...</Menu>} />
</ButtonGroup>`}
            />

            <Showcase
                title="Controlled Dropdown"
                description="Control the dropdown open state programmatically for advanced use cases. Use the open and onOpenChange props for controlled mode."
                preview={<ControlledDropdownExample />}
                code={`import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonGroup>
        <Button variant="secondary">Action</Button>
        <ButtonGroup.Dropdown
          variant="secondary"
          content={<Menu>...</Menu>}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      </ButtonGroup>
      <div>Dropdown is {isOpen ? 'open' : 'closed'}</div>
    </>
  );
}`}
            />

            <Showcase
                title="Real-World Examples"
                description="Common use cases showing how ButtonGroup is used in practice."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Text Formatting Toolbar
                            </h4>
                            <ButtonGroup>
                                <Button variant="ghost">
                                    <Icon name="bold" />
                                </Button>
                                <Button variant="ghost">
                                    <Icon name="italic" />
                                </Button>
                                <Button variant="ghost">
                                    <Icon name="file-text" />
                                </Button>
                            </ButtonGroup>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                View Switcher (Segmented Control)
                            </h4>
                            <ButtonGroup>
                                <Button variant="secondary" outline>List</Button>
                                <Button variant="secondary" outline>Grid</Button>
                                <Button variant="secondary" outline>Columns</Button>
                            </ButtonGroup>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Pagination Control
                            </h4>
                            <ButtonGroup>
                                <Button variant="ghost">
                                    <Icon name="chevron-left" />
                                </Button>
                                <Button variant="ghost">Page 1 of 10</Button>
                                <Button variant="ghost">
                                    <Icon name="chevron-right" />
                                </Button>
                            </ButtonGroup>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                                Zoom Controls
                            </h4>
                            <ButtonGroup>
                                <Button variant="secondary" size="sm">
                                    <Icon name="zoom-out" />
                                </Button>
                                <Button variant="secondary" size="sm">100%</Button>
                                <Button variant="secondary" size="sm">
                                    <Icon name="zoom-in" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                }
                code={`// Text formatting toolbar
<ButtonGroup>
  <Button variant="ghost"><Icon name="bold" /></Button>
  <Button variant="ghost"><Icon name="italic" /></Button>
  <Button variant="ghost"><Icon name="file-text" /></Button>
</ButtonGroup>

// View switcher (segmented control)
<ButtonGroup>
  <Button variant="secondary" outline>List</Button>
  <Button variant="secondary" outline>Grid</Button>
  <Button variant="secondary" outline>Columns</Button>
</ButtonGroup>

// Pagination control
<ButtonGroup>
  <Button variant="ghost"><Icon name="chevron-left" /></Button>
  <Button variant="ghost">Page 1 of 10</Button>
  <Button variant="ghost"><Icon name="chevron-right" /></Button>
</ButtonGroup>

// Zoom controls
<ButtonGroup>
  <Button variant="secondary" size="sm">
    <Icon name="zoom-out" />
  </Button>
  <Button variant="secondary" size="sm">100%</Button>
  <Button variant="secondary" size="sm">
    <Icon name="zoom-in" />
  </Button>
</ButtonGroup>`}
            />

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Split Button Pattern
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Primary action:</strong> Place the most common action as the first button
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Secondary actions:</strong> Related or alternative actions go in the dropdown menu
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Variant matching:</strong> Always match the dropdown variant with the button variant for visual consistency
                    </li>
                    <li>
                        <strong>Menu content:</strong> Use Menu component with MenuItem for dropdown content
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Accessibility
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Each button maintains its own focus state and keyboard navigation
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Dropdown trigger has proper <code>aria-expanded</code>, <code>aria-haspopup="menu"</code>, and <code>aria-label</code> attributes
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        Dropdown closes on <code>Escape</code> key and click outside
                    </li>
                    <li>
                        Disabled buttons and dropdowns have proper <code>disabled</code> attribute and cannot receive focus
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-4)', backgroundColor: 'var(--vscode-textBlockQuote-background)', borderRadius: 'var(--bk-radius-md)' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-3)' }}>
                    Best Practices
                </Heading>
                <ul style={{ fontSize: 'var(--bk-font-size-sm)', lineHeight: 1.6, color: 'var(--vscode-descriptionForeground)', marginLeft: 'var(--bk-spacing-4)' }}>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Related actions:</strong> Only group buttons with related or mutually exclusive actions
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Consistent styling:</strong> Use the same variant, size, and outline for all buttons in a group
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Button count:</strong> Limit to 2-5 buttons per group. More than 5 becomes cluttered
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Separators:</strong> Use sparingly, only when buttons need clear visual separation
                    </li>
                    <li style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                        <strong>Full width:</strong> Use for modal actions, forms, or when buttons should be equally emphasized
                    </li>
                    <li>
                        <strong>Icons:</strong> Use icon-only buttons for toolbars, mix with text for primary actions
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
