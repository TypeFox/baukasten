import React from 'react';
import { heroContainer, heroTitle, heroDescription } from './Hero.css';

/**
 * Hero alignment type
 */
export type HeroAlign = 'left' | 'center' | 'right';

/**
 * Hero size type
 */
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Hero background type
 */
export type HeroBackground = 'default' | 'secondary' | 'tertiary' | 'elevated';

/**
 * Hero component props
 */
export interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Main hero title text
   */
  title: React.ReactNode;

  /**
   * Optional description/subtitle text
   */
  description?: React.ReactNode;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: HeroAlign;

  /**
   * Hero height
   * @default 'md'
   */
  size?: HeroSize;

  /**
   * Optional background color (uses semantic color tokens)
   */
  background?: HeroBackground;

  /**
   * Optional children rendered below title and description
   * Perfect for CTAs, buttons, or additional content
   */
  children?: React.ReactNode;
}

/**
 * Hero component
 *
 * A full-width hero section with large, impactful typography.
 * Perfect for landing pages, section headers, or important announcements.
 *
 * Features:
 * - Large hero typography using semantic tokens (--font-size-hero, --font-size-hero-description)
 * - Flexible sizing from 20vh (sm) to 100vh (full)
 * - Text alignment options (left, center, right)
 * - Semantic background colors that adapt to VSCode themes
 * - Support for children (buttons, CTAs, additional content)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Hero
 *   title="Welcome to Baukasten"
 *   description="Build beautiful VSCode extensions with React"
 * />
 *
 * // Centered hero
 * <Hero
 *   title="Get Started Today"
 *   description="Everything you need to build amazing extensions"
 *   align="center"
 * />
 *
 * // Hero with custom background
 * <Hero
 *   title="Transform Your Workflow"
 *   description="Powerful tools for modern development"
 *   size="lg"
 *   background="secondary"
 * />
 *
 * // Hero with CTA buttons (children)
 * <Hero
 *   title="Build Something Amazing"
 *   description="Get started in minutes"
 *   align="center"
 * >
 *   <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
 *     <Button variant="primary" size="lg">Get Started</Button>
 *     <Button variant="secondary" size="lg">Learn More</Button>
 *   </div>
 * </Hero>
 *
 * // Full viewport hero
 * <Hero
 *   title="Welcome"
 *   size="full"
 *   align="center"
 * />
 * ```
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  description,
  align = 'left',
  size = 'md',
  background = 'default',
  children,
  ...props
}) => {
  return (
    <div
      className={heroContainer({ align, size, background })}
      {...props}
    >
      <h1 className={heroTitle}>{title}</h1>
      {description && (
        <p className={heroDescription({ align })}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

Hero.displayName = 'Hero';