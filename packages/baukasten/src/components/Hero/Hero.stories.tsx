import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { Button } from '../Button';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width hero section component designed for creating beautiful, impactful headers. Features large typography with semantic design tokens, flexible sizing, and alignment options. Perfect for landing pages, section headers, or important announcements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main hero title text (large, bold typography)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: 'Optional description/subtitle text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Hero height (sm=20vh, md=40vh, lg=60vh, xl=80vh, full=100vh)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    background: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'tertiary', 'elevated'],
      description: 'Background color using semantic tokens (default, secondary, tertiary, elevated)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: false,
      description: 'Optional children rendered below title and description. Perfect for CTA buttons or additional content.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground to explore Hero component properties.
 * Use the controls below to experiment with different configurations.
 */
export const Interactive: Story = {
  args: {
    title: 'Build Beautiful Extensions',
    description: 'A comprehensive UI toolkit for VSCode webviews built with React and TypeScript',
    align: 'left',
    size: 'md',
    background: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to explore all Hero component properties. Adjust the title, description, alignment, size, and background to see how they affect the component.',
      },
    },
  },
};

/**
 * Hero component in different sizes from sm (20vh) to full (100vh).
 */
export const Sizes: Story = {
  args: { title: '' },
  render: () => (
    <div>
      <Hero
        title="Small Hero"
        description="20% of viewport height (20vh)"
        size="sm"
        background="secondary"
      />
      <Hero
        title="Medium Hero"
        description="40% of viewport height (40vh) - Default size"
        size="md"
        background="default"
      />
      <Hero
        title="Large Hero"
        description="60% of viewport height (60vh)"
        size="lg"
        background="secondary"
      />
      <Hero
        title="Extra Large Hero"
        description="80% of viewport height (80vh)"
        size="xl"
        background="default"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hero component supports five size variants: sm (20vh), md (40vh), lg (60vh), xl (80vh), and full (100vh). The size prop controls the minimum height of the hero section.',
      },
    },
  },
};

/**
 * Hero component with different text alignments.
 */
export const Alignments: Story = {
  args: { title: '' },
  render: () => (
    <div>
      <Hero
        title="Left Aligned Hero"
        description="This is the default alignment. Content flows naturally from the left side, perfect for most layouts."
        align="left"
        size="sm"
        background="secondary"
      />
      <Hero
        title="Center Aligned Hero"
        description="Centered alignment creates a balanced, symmetrical layout ideal for landing pages and important announcements."
        align="center"
        size="sm"
        background="default"
      />
      <Hero
        title="Right Aligned Hero"
        description="Right alignment can create visual interest and works well for specific design treatments."
        align="right"
        size="sm"
        background="secondary"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The align prop controls text alignment within the hero. Choose from left (default), center, or right alignment to match your design needs.',
      },
    },
  },
};

/**
 * Hero component with different semantic backgrounds.
 */
export const Backgrounds: Story = {
  args: { title: '' },
  render: () => (
    <div>
      <Hero
        title="Default Background"
        description="Uses the default editor background color from the theme"
        background="default"
        size="sm"
      />
      <Hero
        title="Secondary Background"
        description="Uses sidebar background - slightly different for visual separation"
        background="secondary"
        size="sm"
      />
      <Hero
        title="Tertiary Background"
        description="Uses panel background - another level of visual hierarchy"
        background="tertiary"
        size="sm"
      />
      <Hero
        title="Elevated Background"
        description="Uses elevated widget background for prominent sections"
        background="elevated"
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The background prop accepts semantic color tokens (default, secondary, tertiary, elevated) that automatically adapt to the VSCode theme. Each background level corresponds to different VSCode UI areas.',
      },
    },
  },
};

const CTAContainer = ({ align, children }: { align?: 'left' | 'center' | 'right'; children: React.ReactNode }) => (
  <div style={{
    display: 'flex',
    gap: 'var(--spacing-4)',
    marginTop: 'var(--spacing-6)',
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
  }}>
    {children}
  </div>
);

/**
 * Landing page hero with call-to-action buttons.
 */
export const WithCTA: Story = {
  args: { title: '' },
  render: () => (
    <Hero
      title="Welcome to Baukasten"
      description="Build beautiful, accessible VSCode webview UIs with our comprehensive React component library. Get started in minutes with our intuitive API and extensive documentation."
      align="center"
      size="lg"
      background="secondary"
    >
      <CTAContainer align="center">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="secondary" size="lg">
          View Documentation
        </Button>
      </CTAContainer>
    </Hero>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hero component supports children rendered below the title and description. This example shows a typical landing page hero with centered text and CTA buttons passed as children. Perfect for adding buttons, links, or any additional content.',
      },
    },
  },
};

/**
 * Full viewport hero for splash screens or landing pages.
 */
export const FullViewport: Story = {
  args: { title: '' },
  render: () => (
    <Hero
      title="Transform Your Development Workflow"
      description="Experience the power of modern UI development with Baukasten. Built for developers, designed for users."
      align="center"
      size="full"
      background="secondary"
    >
      <CTAContainer align="center">
        <Button variant="primary" size="lg">
          Explore Features
        </Button>
      </CTAContainer>
    </Hero>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A full viewport height (100vh) hero perfect for splash screens, landing pages, or when you want maximum visual impact. The size="full" prop creates an immersive first impression.',
      },
    },
  },
};

/**
 * Minimal hero without description.
 */
export const TitleOnly: Story = {
  args: { title: '' },
  render: () => (
    <Hero
      title="Simple. Powerful. Beautiful."
      align="center"
      size="md"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hero component works beautifully with just a title. Omit the description prop for a minimal, focused design.',
      },
    },
  },
};

/**
 * Section header usage within content.
 */
export const SectionHeader: Story = {
  args: { title: '' },
  render: () => (
    <div>
      <Hero
        title="Components"
        description="Explore our comprehensive collection of pre-built components"
        size="sm"
        background="default"
      />
      <div style={{ padding: 'var(--spacing-6)' }}>
        <p style={{ color: 'var(--color-foreground)' }}>
          Your content goes here. The hero component works great as a section divider
          or category header within your application.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hero component with size="sm" works well as a section header within your application, providing visual hierarchy and clear content separation.',
      },
    },
  },
};

const ShowcaseSection = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: 'var(--spacing-2)' }}>
    {children}
  </div>
);

/**
 * Comprehensive showcase of Hero component capabilities.
 * Demonstrates various sizes, alignments, backgrounds, and use cases.
 */
export const Showcase: Story = {
  args: { title: '' },
  render: () => (
    <div>
      <ShowcaseSection>
        <Hero
          title="Hero Component Showcase"
          description="Discover all the ways you can use the Hero component to create impactful headers and landing sections."
          align="center"
          size="lg"
          background="secondary"
        />
      </ShowcaseSection>

      <ShowcaseSection>
        <Hero
          title="Landing Page Hero"
          description="Perfect for making a strong first impression with large, beautiful typography"
          size="md"
          background="default"
        >
          <CTAContainer align="left">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </CTAContainer>
        </Hero>
      </ShowcaseSection>

      <ShowcaseSection>
        <Hero
          title="Centered Impact"
          description="Center alignment creates a balanced, symmetrical design that draws attention to your message"
          align="center"
          size="md"
          background="tertiary"
        />
      </ShowcaseSection>

      <ShowcaseSection>
        <Hero
          title="Compact Section Header"
          description="Smaller size works great for section headers and content dividers"
          size="sm"
          background="elevated"
        />
      </ShowcaseSection>

      <ShowcaseSection>
        <Hero
          title="Right Aligned Design"
          description="Right alignment can create unique visual interest for special sections"
          align="right"
          size="sm"
          background="secondary"
        />
      </ShowcaseSection>

      <ShowcaseSection>
        <Hero
          title="Minimal Hero"
          align="center"
          size="sm"
          background="default"
        />
      </ShowcaseSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase demonstrating all Hero component capabilities including various sizes (sm to full), alignments (left, center, right), backgrounds (default, secondary, tertiary, elevated), and practical use cases like landing pages, section headers, and CTAs with children.',
      },
    },
  },
};
