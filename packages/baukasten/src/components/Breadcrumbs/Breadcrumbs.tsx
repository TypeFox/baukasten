import React from 'react';
import { type Size } from '../../styles';
import {
  breadcrumbs,
  breadcrumbList,
  breadcrumbItem,
  breadcrumbLink,
  breadcrumbSpan,
  separator as separatorStyle,
  ellipsis as ellipsisStyle,
} from './Breadcrumbs.css';

/**
 * Individual breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Display text for the breadcrumb item
   */
  label: string;

  /**
   * Optional href for navigation
   * If provided, the item will be rendered as a clickable link
   */
  href?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;

  /**
   * Optional icon element to display before the label
   */
  icon?: React.ReactNode;
}

/**
 * Ellipsis item for collapsed breadcrumbs
 */
interface EllipsisItem {
  label: '...';
  isEllipsis: true;
}

/**
 * Union type for display items
 */
type DisplayItem = BreadcrumbItem | EllipsisItem;

/**
 * Breadcrumb visual variant
 */
export type BreadcrumbVariant = 'default' | 'pill';

/**
 * Breadcrumbs component props
 */
export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItem[];

  /**
   * Visual variant of the breadcrumbs
   * @default 'default'
   */
  variant?: BreadcrumbVariant;

  /**
   * Custom separator between breadcrumb items
   * @default "/"
   */
  separator?: React.ReactNode;

  /**
   * Size of the breadcrumbs
   * @default 'md'
   */
  size?: Size;

  /**
   * Maximum number of items to display
   * When exceeded, middle items will be collapsed with an ellipsis
   * @default undefined (show all items)
   */
  maxItems?: number;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Aria label for accessibility
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;
}

/**
 * Breadcrumbs component
 *
 * A navigation component that shows the user's current location within the application hierarchy.
 * Supports custom separators, sizing, and item collapsing.
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
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics' }
 *   ]}
 * />
 *
 * // With custom separator
 * <Breadcrumbs
 *   items={items}
 *   separator=">"
 * />
 *
 * // With max items (collapse middle items)
 * <Breadcrumbs
 *   items={items}
 *   maxItems={3}
 * />
 *
 * // With icons
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/', icon: <HomeIcon /> },
 *     { label: 'Settings', icon: <SettingsIcon /> }
 *   ]}
 * />
 *
 * // With click handlers
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', onClick: () => navigate('/') },
 *     { label: 'Products', onClick: () => navigate('/products') }
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  variant = 'default',
  separator = '/',
  size = 'md',
  maxItems,
  className,
  ariaLabel = 'Breadcrumb',
}) => {
  // Determine which items to display
  const displayItems = React.useMemo<DisplayItem[]>(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItems - 1) items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    const ellipsisItem: EllipsisItem = { label: '...', isEllipsis: true };

    return [firstItem, ellipsisItem, ...lastItems];
  }, [items, maxItems]);

  const renderItem = (item: DisplayItem, index: number) => {
    const isLast = index === displayItems.length - 1;

    // Handle ellipsis
    if ('isEllipsis' in item && item.isEllipsis) {
      return (
        <React.Fragment key={`ellipsis-${index}`}>
          <li className={breadcrumbItem({ isLast: false })}>
            <span className={ellipsisStyle} aria-hidden="true">...</span>
          </li>
          <span className={separatorStyle} aria-hidden="true">{separator}</span>
        </React.Fragment>
      );
    }

    // Regular breadcrumb item - type narrowed to BreadcrumbItem
    const crumb: BreadcrumbItem = item;
    const isClickable = !!(crumb.href || crumb.onClick);

    const content = (
      <>
        {crumb.icon}
        {crumb.label}
      </>
    );

    return (
      <React.Fragment key={index}>
        <li
          className={breadcrumbItem({ isLast })}
          aria-current={isLast ? 'page' : undefined}
        >
          {isClickable && !isLast ? (
            crumb.href ? (
              <a href={crumb.href} onClick={crumb.onClick} className={breadcrumbLink({ variant })}>
                {content}
              </a>
            ) : (
              <button onClick={crumb.onClick} className={breadcrumbLink({ variant })}>
                {content}
              </button>
            )
          ) : (
            <span className={breadcrumbSpan({ variant })}>{content}</span>
          )}
        </li>
        {!isLast && (
          <span className={separatorStyle} aria-hidden="true">{separator}</span>
        )}
      </React.Fragment>
    );
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={className ? `${breadcrumbs({ size })} ${className}` : breadcrumbs({ size })}
    >
      <ol className={breadcrumbList}>
        {displayItems.map(renderItem)}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
