import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Button } from '../Button';

// Story-specific styles
const storyStyles = `
  .icon-story-container { display: flex; flex-direction: column; gap: var(--bk-gap-lg); padding: var(--bk-spacing-4); }
  .icon-story-row { display: flex; align-items: center; gap: var(--bk-gap-md); }
  .icon-story-button-row { display: flex; align-items: center; gap: var(--bk-gap-md); flex-wrap: wrap; }
  .icon-story-label { font-size: var(--bk-font-size-sm); color: var(--bk-color-foreground); min-width: 80px; }
  .icon-story-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: var(--bk-spacing-4); padding: var(--bk-spacing-4); }
  .icon-story-cell { display: flex; flex-direction: column; align-items: center; gap: var(--bk-gap-sm); padding: var(--bk-spacing-3); border: 1px solid var(--bk-color-border); border-radius: var(--bk-radius-md); transition: var(--bk-transition-colors); }
  .icon-story-cell:hover { background-color: var(--bk-color-hover); border-color: var(--bk-color-primary); }
  .icon-story-name { font-size: var(--bk-font-size-xs); color: var(--bk-color-secondary-foreground); text-align: center; word-break: break-word; font-family: var(--bk-font-family-mono); }
`;

/**
 * The Icon component provides access to VSCode's Codicon icon library.
 * 
 * **Key Features:**
 * - **Size Inheritance**: Icons automatically inherit their parent's font-size by default
 * - **Explicit Sizing**: Optionally specify a size prop for fixed dimensions
 * - **Color Inheritance**: Icons inherit their parent's color by default
 * - **Animations**: Support for spin and rotation effects
 * 
 * **Available Icons**: https://microsoft.github.io/vscode-codicons/dist/codicon.html
 */
const meta = {
    title: 'Components/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: 'The codicon name (without the "codicon-" prefix)',
        },
        size: {
            control: 'select',
            options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
            description: 'Optional size override. When not provided, icons inherit font-size from their parent component',
        },
        color: {
            control: 'color',
            description: 'Optional color override. When not provided, icons inherit color from their parent component',
        },
        spin: {
            control: 'boolean',
            description: 'Whether the icon should rotate/spin',
        },
        rotate: {
            control: 'number',
            description: 'Rotation angle in degrees',
        },
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default icon that inherits size from parent (16px in this example).
 * Notice how the icon naturally adapts to its environment without a size prop.
 */
export const Default: Story = {
    args: {
        name: 'check',
    },
    decorators: [
        (Story) => (
            <div style={{ fontSize: '16px' }}>
                <Story />
            </div>
        ),
    ],
};

/**
 * Icons automatically inherit font-size from their parent component.
 * This is the recommended approach - no size prop needed!
 */
export const InheritedSize: Story = {
    args: {
        name: 'check',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-row">
                    <div style={{ fontSize: '12px' }}><Icon name="check" /></div>
                    <span className="icon-story-label">Parent: 12px (inherited)</span>
                </div>
                <div className="icon-story-row">
                    <div style={{ fontSize: '16px' }}><Icon name="check" /></div>
                    <span className="icon-story-label">Parent: 16px (inherited)</span>
                </div>
                <div className="icon-story-row">
                    <div style={{ fontSize: '20px' }}><Icon name="check" /></div>
                    <span className="icon-story-label">Parent: 20px (inherited)</span>
                </div>
                <div className="icon-story-row">
                    <div style={{ fontSize: '24px' }}><Icon name="check" /></div>
                    <span className="icon-story-label">Parent: 24px (inherited)</span>
                </div>
                <div className="icon-story-row">
                    <div style={{ fontSize: '32px' }}><Icon name="check" /></div>
                    <span className="icon-story-label">Parent: 32px (inherited)</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Icons with explicit size prop for fixed dimensions.
 * Use this when you need precise control regardless of parent size.
 */
export const ExplicitSizes: Story = {
    args: {
        name: 'check',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-row">
                    <Icon name="check" size="xs" />
                    <span className="icon-story-label">xs (10px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="sm" />
                    <span className="icon-story-label">sm (12px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="md" />
                    <span className="icon-story-label">md (13px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="lg" />
                    <span className="icon-story-label">lg (16px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="xl" />
                    <span className="icon-story-label">xl (18px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="2xl" />
                    <span className="icon-story-label">2xl (24px)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" size="3xl" />
                    <span className="icon-story-label">3xl (30px)</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Icons with different semantic colors from the design system.
 */
export const Colors: Story = {
    args: {
        name: 'check',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-row">
                    <Icon name="info" color="var(--bk-color-info)" size="lg" />
                    <span className="icon-story-label">Info</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="check" color="var(--bk-color-success)" size="lg" />
                    <span className="icon-story-label">Success</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="warning" color="var(--bk-color-warning)" size="lg" />
                    <span className="icon-story-label">Warning</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="error" color="var(--bk-color-danger)" size="lg" />
                    <span className="icon-story-label">Danger</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="star" color="var(--bk-color-primary)" size="lg" />
                    <span className="icon-story-label">Primary</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Common icons used throughout VSCode interfaces.
 */
export const CommonIcons: Story = {
    args: {
        name: 'check',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-grid">
                <div className="icon-story-cell">
                    <Icon name="check" size="lg" />
                    <span className="icon-story-name">check</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="close" size="lg" />
                    <span className="icon-story-name">close</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="search" size="lg" />
                    <span className="icon-story-name">search</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="chevron-right" size="lg" />
                    <span className="icon-story-name">chevron-right</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="chevron-down" size="lg" />
                    <span className="icon-story-name">chevron-down</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="chevron-up" size="lg" />
                    <span className="icon-story-name">chevron-up</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="chevron-left" size="lg" />
                    <span className="icon-story-name">chevron-left</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="add" size="lg" />
                    <span className="icon-story-name">add</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="remove" size="lg" />
                    <span className="icon-story-name">remove</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="edit" size="lg" />
                    <span className="icon-story-name">edit</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="trash" size="lg" />
                    <span className="icon-story-name">trash</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="save" size="lg" />
                    <span className="icon-story-name">save</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file" size="lg" />
                    <span className="icon-story-name">file</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="folder" size="lg" />
                    <span className="icon-story-name">folder</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="settings" size="lg" />
                    <span className="icon-story-name">settings</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="gear" size="lg" />
                    <span className="icon-story-name">gear</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="home" size="lg" />
                    <span className="icon-story-name">home</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="refresh" size="lg" />
                    <span className="icon-story-name">refresh</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="filter" size="lg" />
                    <span className="icon-story-name">filter</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="arrow-right" size="lg" />
                    <span className="icon-story-name">arrow-right</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="arrow-left" size="lg" />
                    <span className="icon-story-name">arrow-left</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="copy" size="lg" />
                    <span className="icon-story-name">copy</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="link" size="lg" />
                    <span className="icon-story-name">link</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="menu" size="lg" />
                    <span className="icon-story-name">menu</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Icons with rotation applied.
 */
export const Rotation: Story = {
    args: {
        name: 'arrow-right',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-row">
                    <Icon name="arrow-right" size="lg" rotate={0} />
                    <span className="icon-story-label">0°</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="arrow-right" size="lg" rotate={45} />
                    <span className="icon-story-label">45°</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="arrow-right" size="lg" rotate={90} />
                    <span className="icon-story-label">90°</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="arrow-right" size="lg" rotate={180} />
                    <span className="icon-story-label">180°</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Spinning icons useful for loading indicators.
 */
export const SpinAnimation: Story = {
    args: {
        name: 'loading',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-row">
                    <Icon name="loading" size="lg" spin />
                    <span className="icon-story-label">loading (spinning)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="sync" size="lg" spin />
                    <span className="icon-story-label">sync (spinning)</span>
                </div>
                <div className="icon-story-row">
                    <Icon name="gear" size="lg" spin />
                    <span className="icon-story-label">gear (spinning)</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Icons automatically scale with button size without any size prop.
 * This demonstrates the power of size inheritance - icons just work!
 */
export const WithButtons: Story = {
    args: {
        name: 'save',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div>
                    <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                        Icons Inherit Button Size (No size prop!)
                    </h4>
                    <div className="icon-story-button-row">
                        <Button size="xs">
                            <Icon name="save" />
                            XS Button
                        </Button>
                        <Button size="sm">
                            <Icon name="save" />
                            SM Button
                        </Button>
                        <Button size="md">
                            <Icon name="save" />
                            MD Button
                        </Button>
                        <Button size="lg">
                            <Icon name="save" />
                            LG Button
                        </Button>
                        <Button size="xl">
                            <Icon name="save" />
                            XL Button
                        </Button>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                        Icon Only Buttons
                    </h4>
                    <div className="icon-story-button-row">
                        <Button size="sm" circular>
                            <Icon name="add" />
                        </Button>
                        <Button size="md" circular>
                            <Icon name="add" />
                        </Button>
                        <Button size="lg" circular>
                            <Icon name="add" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    ),
};

/**
 * Icon-only circular buttons.
 */
export const IconButtons: Story = {
    args: {
        name: 'close',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-container">
                <div className="icon-story-button-row">
                    <Button circular size="sm">
                        <Icon name="close" />
                    </Button>
                    <Button circular size="sm" variant="secondary">
                        <Icon name="edit" />
                    </Button>
                    <Button circular size="sm" variant="ghost">
                        <Icon name="more" />
                    </Button>
                </div>
                <div className="icon-story-button-row">
                    <Button circular size="md">
                        <Icon name="close" />
                    </Button>
                    <Button circular size="md" variant="secondary">
                        <Icon name="edit" />
                    </Button>
                    <Button circular size="md" variant="ghost">
                        <Icon name="more" />
                    </Button>
                </div>
                <div className="icon-story-button-row">
                    <Button circular size="lg">
                        <Icon name="close" />
                    </Button>
                    <Button circular size="lg" variant="secondary">
                        <Icon name="edit" />
                    </Button>
                    <Button circular size="lg" variant="ghost">
                        <Icon name="more" />
                    </Button>
                </div>
            </div>
        </>
    ),
};

/**
 * File and folder icons commonly used in file explorers.
 */
export const FileIcons: Story = {
    args: {
        name: 'file',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-grid">
                <div className="icon-story-cell">
                    <Icon name="file" size="lg" />
                    <span className="icon-story-name">file</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file-code" size="lg" />
                    <span className="icon-story-name">file-code</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file-text" size="lg" />
                    <span className="icon-story-name">file-text</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file-media" size="lg" />
                    <span className="icon-story-name">file-media</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file-pdf" size="lg" />
                    <span className="icon-story-name">file-pdf</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="file-zip" size="lg" />
                    <span className="icon-story-name">file-zip</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="folder" size="lg" />
                    <span className="icon-story-name">folder</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="folder-opened" size="lg" />
                    <span className="icon-story-name">folder-opened</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="folder-active" size="lg" />
                    <span className="icon-story-name">folder-active</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="root-folder" size="lg" />
                    <span className="icon-story-name">root-folder</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="root-folder-opened" size="lg" />
                    <span className="icon-story-name">root-folder-opened</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="new-file" size="lg" />
                    <span className="icon-story-name">new-file</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="new-folder" size="lg" />
                    <span className="icon-story-name">new-folder</span>
                </div>
            </div>
        </>
    ),
};

/**
 * Status and notification icons.
 */
export const StatusIcons: Story = {
    args: {
        name: 'check',
    },
    render: () => (
        <>
            <style>{storyStyles}</style>
            <div className="icon-story-grid">
                <div className="icon-story-cell">
                    <Icon name="check" size="lg" color="var(--bk-color-success)" />
                    <span className="icon-story-name">check</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="error" size="lg" color="var(--bk-color-danger)" />
                    <span className="icon-story-name">error</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="warning" size="lg" color="var(--bk-color-warning)" />
                    <span className="icon-story-name">warning</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="info" size="lg" color="var(--bk-color-info)" />
                    <span className="icon-story-name">info</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="bell" size="lg" />
                    <span className="icon-story-name">bell</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="bell-dot" size="lg" />
                    <span className="icon-story-name">bell-dot</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="circle-filled" size="lg" />
                    <span className="icon-story-name">circle-filled</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="circle-outline" size="lg" />
                    <span className="icon-story-name">circle-outline</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="pass" size="lg" color="var(--bk-color-success)" />
                    <span className="icon-story-name">pass</span>
                </div>
                <div className="icon-story-cell">
                    <Icon name="issues" size="lg" />
                    <span className="icon-story-name">issues</span>
                </div>
            </div>
        </>
    ),
};

