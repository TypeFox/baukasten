import React from 'react';
import { type Size } from '../../styles';
import { button } from './Button.css';

/**
 * Button style variants
 * - `primary`: Main call-to-action button with high emphasis
 * - `secondary`: Secondary actions with medium emphasis
 * - `ghost`: Tertiary actions with minimal visual weight
 * - `link`: Text-only button styled as a hyperlink
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

/**
 * Button width options
 * - `block`: Full width of parent container (100%)
 * - `wide`: Full width with maximum width constraint (max 256px)
 */
export type ButtonWidth = 'block' | 'wide';

/**
 * Button component props
 * Extends all standard HTML button attributes
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: Size;

  /**
   * Width behavior of the button
   * @default undefined (auto width based on content)
   */
  width?: ButtonWidth;

  /**
   * Whether to render the button with an outline style
   * Inverts the background and border colors
   * @default false
   */
  outline?: boolean;

  /**
   * Whether to render the button as a circle
   * Useful for icon-only buttons
   * @default false
   */
  circular?: boolean;
}

/**
 * Button component
 * 
 * A versatile button component with multiple variants, sizes, and styling options.
 * Fully integrates with VSCode/Theia theme variables for consistent theming.
 * 
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app:
 * 
 * ```tsx
 * import { GlobalStyles } from 'baukasten-ui';
 * 
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * // With variant and size
 * <Button variant="secondary" size="lg">Large Secondary</Button>
 * 
 * // Outline style
 * <Button outline>Outline Button</Button>
 * 
 * // Circular icon button
 * <Button circular>
 *   <Icon />
 * </Button>
 * 
 * // With icon and text
 * <Button>
 *   <Icon />
 *   Save Changes
 * </Button>
 * 
 * // Full width
 * <Button width="block">Full Width Button</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  width,
  outline = false,
  circular = false,
  children,
  ...props
}) => {
  return (
    <button
      className={button({ variant, size, width, outline, circular })}
      {...props}
    >
      {children}
    </button>
  );
};

