import React from 'react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { iconButton } from './IconButton.css';

/**
 * Button style variants (same as Button)
 * - `primary`: Main call-to-action with high emphasis
 * - `secondary`: Secondary actions with medium emphasis
 * - `ghost`: Tertiary actions with minimal visual weight
 * - `link`: Text-only styled as a hyperlink
 */
export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

/**
 * IconButton component props
 * Extends all standard HTML button attributes
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The icon to display inside the button
     * Typically an `<Icon />` component or an SVG element
     * @example <Icon name="close" />
     */
    icon: React.ReactNode;

    /**
     * Visual style variant of the button
     * @default 'primary'
     */
    variant?: IconButtonVariant;

    /**
     * Size of the button (square: width = height)
     * @default 'md'
     */
    size?: Size;

    /**
     * Whether to render the button with an outline style
     * Inverts the background and border colors
     * @default false
     */
    outline?: boolean;
}

/**
 * IconButton component
 *
 * A square icon-only button whose width and height match the normal Button's
 * height for each size. Ideal for toolbar actions, icon actions that need to
 * align with text buttons, or compact UI controls.
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
 * <IconButton icon={<Icon name="close" />} aria-label="Close" />
 *
 * // With variant and size
 * <IconButton icon={<Icon name="save" />} variant="secondary" size="lg" aria-label="Save" />
 *
 * // Outline style
 * <IconButton icon={<Icon name="edit" />} outline aria-label="Edit" />
 *
 * // Aligned with a regular Button
 * <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
 *   <Button>Save Changes</Button>
 *   <IconButton icon={<Icon name="ellipsis" />} variant="secondary" aria-label="More options" />
 * </div>
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    variant = 'primary',
    size = 'md',
    outline = false,
    className,
    ...props
}) => {
    return (
        <button
            type='button'
            className={clsx(iconButton({ variant, size, outline }), className)}
            {...props}
        >
            {icon}
        </button>
    );
};
