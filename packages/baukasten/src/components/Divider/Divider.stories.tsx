import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Heading, Paragraph } from '../Typography';
import { Button } from '../Button';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple component for creating visual separation between content sections. Supports horizontal and vertical orientations, optional labels, and different border styles. Perfect for organizing content and creating visual hierarchy.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Border style of the divider line',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label text (horizontal only)',
    },
    labelAlign: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Label alignment (when label is provided)',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    spacing: {
      control: 'text',
      description: 'Vertical spacing (for horizontal) or horizontal spacing (for vertical)',
      table: {
        defaultValue: { summary: 'var(--bk-spacing-4)' },
      },
    },
    color: {
      control: 'color',
      description: 'Custom color for the divider line',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all divider properties exposed.
 */
export const Interactive: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: '',
    labelAlign: 'center',
    spacing: 'var(--bk-spacing-4)',
  },
  render: (args) => (
    <div style={{ padding: 'var(--bk-spacing-4)' }}>
      <Paragraph>Content above the divider</Paragraph>
      <Divider {...args} />
      <Paragraph>Content below the divider</Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all divider properties. Use the controls below to experiment.',
      },
    },
  },
};

/**
 * Basic horizontal divider without any label.
 */
export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Paragraph>
        This is some content above the divider. The divider provides visual separation
        between different sections of content.
      </Paragraph>
      <Divider />
      <Paragraph>
        This is content below the divider. Simple and clean separation.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The most basic usage - a simple horizontal line separating content.',
      },
    },
  },
};

/**
 * Divider with centered label text.
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Paragraph>Sign in with your existing account</Paragraph>
      <Divider label="OR" />
      <Paragraph>Create a new account to get started</Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Divider with a label in the center. Commonly used for "OR" in forms or section separators.',
      },
    },
  },
};

/**
 * Different label alignments: left, center, and right.
 */
export const LabelAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
      <div>
        <Heading level={3}>Introduction</Heading>
        <Paragraph>Welcome to our application. This section introduces the main features.</Paragraph>
        <Divider label="Getting Started" labelAlign="left" />
        <Paragraph>Follow these steps to begin using the application.</Paragraph>
      </div>

      <div>
        <Paragraph>This is the main content of the page.</Paragraph>
        <Divider label="Section Break" labelAlign="center" />
        <Paragraph>Here's more content after the centered divider.</Paragraph>
      </div>

      <div>
        <Paragraph>Content continues here with more information.</Paragraph>
        <Divider label="End" labelAlign="right" />
        <Paragraph>This is the final section of the content.</Paragraph>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels can be aligned left, center (default), or right within the divider.',
      },
    },
  },
};

/**
 * Different border styles: solid, dashed, and dotted.
 */
export const BorderStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Solid (default)
        </div>
        <Paragraph>Content above solid divider</Paragraph>
        <Divider variant="solid" />
        <Paragraph>Content below solid divider</Paragraph>
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Dashed
        </div>
        <Paragraph>Content above dashed divider</Paragraph>
        <Divider variant="dashed" />
        <Paragraph>Content below dashed divider</Paragraph>
      </div>

      <div>
        <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', fontWeight: 'var(--bk-font-weight-medium)' }}>
          Dotted
        </div>
        <Paragraph>Content above dotted divider</Paragraph>
        <Divider variant="dotted" />
        <Paragraph>Content below dotted divider</Paragraph>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers support three border styles: **solid** (default), **dashed**, and **dotted**.',
      },
    },
  },
};

/**
 * Vertical divider for separating inline content.
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: 'var(--bk-spacing-4)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paragraph>Left content</Paragraph>
        </div>
        <Divider orientation="vertical" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paragraph>Right content</Paragraph>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', height: '60px', gap: 'var(--bk-spacing-3)' }}>
        <Button variant="primary">Button 1</Button>
        <Divider orientation="vertical" spacing="var(--bk-spacing-2)" />
        <Button variant="secondary">Button 2</Button>
        <Divider orientation="vertical" spacing="var(--bk-spacing-2)" />
        <Button variant="ghost">Button 3</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical dividers separate content horizontally. Best used in flex containers with a defined height.',
      },
    },
  },
};

/**
 * Different spacing options.
 */
export const CustomSpacing: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div>
        <Paragraph>Content with minimal spacing</Paragraph>
        <Divider spacing="var(--bk-spacing-1)" />
        <Paragraph>Very tight spacing (spacing-1)</Paragraph>
      </div>

      <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
        <Paragraph>Content with default spacing</Paragraph>
        <Divider spacing="var(--bk-spacing-4)" />
        <Paragraph>Default spacing (spacing-4)</Paragraph>
      </div>

      <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
        <Paragraph>Content with generous spacing</Paragraph>
        <Divider spacing="var(--bk-spacing-8)" />
        <Paragraph>Large spacing (spacing-8)</Paragraph>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control the spacing around dividers using the `spacing` prop. Default is `var(--bk-spacing-4)`.',
      },
    },
  },
};

/**
 * Dividers with custom colors.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', maxWidth: '600px' }}>
      <div>
        <Paragraph>Default border color</Paragraph>
        <Divider />
        <Paragraph>Uses the theme's border color</Paragraph>
      </div>

      <div>
        <Paragraph>Primary color divider</Paragraph>
        <Divider color="var(--bk-color-primary)" />
        <Paragraph>Stands out with brand color</Paragraph>
      </div>

      <div>
        <Paragraph>Success color divider</Paragraph>
        <Divider color="var(--bk-color-success)" />
        <Paragraph>Green for positive sections</Paragraph>
      </div>

      <div>
        <Paragraph>Warning color divider</Paragraph>
        <Divider color="var(--bk-color-warning)" />
        <Paragraph>Yellow for caution sections</Paragraph>
      </div>

      <div>
        <Paragraph>Danger color divider</Paragraph>
        <Divider color="var(--bk-color-danger)" />
        <Paragraph>Red for important sections</Paragraph>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize divider color using the `color` prop with any valid CSS color or design token.',
      },
    },
  },
};

/**
 * Real-world form example with divider.
 */
export const FormExample: Story = {
  render: () => (
    <div style={{
      maxWidth: '400px',
      padding: 'var(--bk-spacing-6)',
      backgroundColor: 'var(--bk-color-background-elevated)',
      borderRadius: 'var(--bk-radius-md)',
    }}>
      <Heading level={2} style={{ marginTop: 0 }}>Sign In</Heading>

      <div style={{ marginBottom: 'var(--bk-spacing-4)' }}>
        <Button variant="primary" fullWidth>
          Sign in with Google
        </Button>
      </div>

      <div style={{ marginBottom: 'var(--bk-spacing-4)' }}>
        <Button variant="secondary" fullWidth>
          Sign in with GitHub
        </Button>
      </div>

      <Divider label="OR" />

      <div style={{ marginBottom: 'var(--bk-spacing-3)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            width: '100%',
            padding: 'var(--bk-padding-md)',
            backgroundColor: 'var(--bk-color-input-background)',
            color: 'var(--bk-color-input-foreground)',
            border: '1px solid var(--bk-color-input-border)',
            borderRadius: 'var(--bk-radius-sm)',
            fontFamily: 'inherit',
            fontSize: 'var(--bk-font-size-md)',
          }}
        />
      </div>

      <div style={{ marginBottom: 'var(--bk-spacing-4)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)' }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          style={{
            width: '100%',
            padding: 'var(--bk-padding-md)',
            backgroundColor: 'var(--bk-color-input-background)',
            color: 'var(--bk-color-input-foreground)',
            border: '1px solid var(--bk-color-input-border)',
            borderRadius: 'var(--bk-radius-sm)',
            fontFamily: 'inherit',
            fontSize: 'var(--bk-font-size-md)',
          }}
        />
      </div>

      <Button variant="primary" fullWidth>
        Sign In
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: separating social login buttons from email/password form with an "OR" divider.',
      },
    },
  },
};

/**
 * Content sections with labeled dividers.
 */
export const ContentSections: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Heading level={1}>Documentation</Heading>

      <Paragraph>
        Welcome to our comprehensive documentation. This guide will help you understand
        all the features and capabilities of our platform.
      </Paragraph>

      <Divider label="Introduction" labelAlign="left" />

      <Paragraph>
        Our platform provides a complete solution for building modern web applications.
        It includes everything you need to get started quickly and scale efficiently.
      </Paragraph>

      <Divider label="Getting Started" labelAlign="left" />

      <Paragraph>
        To begin, install the package using your preferred package manager. Follow the
        installation guide and you'll be up and running in minutes.
      </Paragraph>

      <Divider label="Key Features" labelAlign="left" />

      <Paragraph>
        The platform offers numerous features including real-time collaboration,
        advanced analytics, seamless integrations, and enterprise-grade security.
      </Paragraph>

      <Divider label="Next Steps" labelAlign="left" />

      <Paragraph>
        Now that you understand the basics, explore our API reference and check out
        the example projects to see the platform in action.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using left-aligned labeled dividers to organize documentation or long-form content into clear sections.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all divider capabilities.
 */
export const Showcase: Story = {
  render: () => (
    <div style={{ padding: 'var(--bk-spacing-4)', maxWidth: '800px', margin: '0 auto' }}>
      <Heading level={1}>Divider Component</Heading>
      <Paragraph color="muted">Visual separation for content sections</Paragraph>

      {/* Basic */}
      <section style={{ marginTop: 'var(--bk-spacing-8)' }}>
        <Heading level={2}>Basic</Heading>
        <Paragraph>Simple horizontal divider</Paragraph>
        <Divider />
        <Paragraph>Content below the divider</Paragraph>
      </section>

      {/* With Labels */}
      <section style={{ marginTop: 'var(--bk-spacing-8)' }}>
        <Heading level={2}>With Labels</Heading>
        <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
          <Divider label="Left aligned" labelAlign="left" />
          <Divider label="Center aligned" labelAlign="center" />
          <Divider label="Right aligned" labelAlign="right" />
        </div>
      </section>

      {/* Border Styles */}
      <section style={{ marginTop: 'var(--bk-spacing-8)' }}>
        <Heading level={2}>Border Styles</Heading>
        <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
          <Paragraph>Solid</Paragraph>
          <Divider variant="solid" />
          <Paragraph>Dashed</Paragraph>
          <Divider variant="dashed" />
          <Paragraph>Dotted</Paragraph>
          <Divider variant="dotted" />
        </div>
      </section>

      {/* Vertical */}
      <section style={{ marginTop: 'var(--bk-spacing-8)' }}>
        <Heading level={2}>Vertical</Heading>
        <div style={{ display: 'flex', alignItems: 'center', height: '80px', gap: 'var(--bk-spacing-4)', marginTop: 'var(--bk-spacing-4)' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Paragraph>Left</Paragraph>
          </div>
          <Divider orientation="vertical" />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Paragraph>Center</Paragraph>
          </div>
          <Divider orientation="vertical" />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Paragraph>Right</Paragraph>
          </div>
        </div>
      </section>

      {/* Custom Colors */}
      <section style={{ marginTop: 'var(--bk-spacing-8)', marginBottom: 'var(--bk-spacing-4)' }}>
        <Heading level={2}>Custom Colors</Heading>
        <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
          <Divider color="var(--bk-color-primary)" label="Primary" />
          <Divider color="var(--bk-color-success)" label="Success" />
          <Divider color="var(--bk-color-warning)" label="Warning" />
          <Divider color="var(--bk-color-danger)" label="Danger" />
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all divider features: basic, labels, border styles, vertical orientation, and custom colors.',
      },
    },
  },
};
