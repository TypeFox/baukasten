import React, { useState, useEffect } from 'react';
import { useAccordion } from './Accordion';
import { Icon } from '../Icon';
import {
  accordionItem,
  accordionHeader,
  chevron,
  accordionContent,
  accordionContentInner,
  iconWrapper,
  title,
} from './AccordionItem.css';

/**
 * AccordionItem component props
 */
export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Title displayed in the accordion header
   */
  title: React.ReactNode;
  /**
   * Unique identifier for this item (required for exclusive mode)
   */
  id?: string;
  /**
   * Whether the item is open by default
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional icon to display before the title
   */
  icon?: React.ReactNode;
}

/**
 * AccordionItem component
 *
 * An individual expandable section within an Accordion.
 * Contains a clickable header and collapsible content area.
 *
 * @example
 * ```tsx
 * <AccordionItem title="Section Title">
 *   Content goes here
 * </AccordionItem>
 *
 * // With icon
 * <AccordionItem title="Settings" icon={<Icon name="gear" />}>
 *   Settings content
 * </AccordionItem>
 *
 * // Disabled
 * <AccordionItem title="Coming Soon" disabled>
 *   This feature is not available yet
 * </AccordionItem>
 *
 * // Default open
 * <AccordionItem title="Important Info" defaultOpen>
 *   This section starts expanded
 * </AccordionItem>
 * ```
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title: titleProp,
  id,
  defaultOpen = false,
  disabled = false,
  icon,
  className,
  children,
  ...props
}) => {
  const accordion = useAccordion();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Handle exclusive mode
  useEffect(() => {
    if (accordion.exclusive && id) {
      setIsOpen(accordion.openKey === id);
    }
  }, [accordion.exclusive, accordion.openKey, id]);

  const handleToggle = () => {
    if (disabled) return;

    if (accordion.exclusive && id) {
      accordion.onToggle?.(id);
    } else {
      setIsOpen(prev => !prev);
    }
  };

  const itemClass = className
    ? `${accordionItem({ disabled })} ${className}`
    : accordionItem({ disabled });

  return (
    <div className={itemClass} {...props}>
      <button
        className={accordionHeader({ disabled })}
        onClick={handleToggle}
        type="button"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {icon && <span className={iconWrapper}>{icon}</span>}
        <span className={title}>{titleProp}</span>
        <span className={chevron({ isOpen })}>
          <Icon name="chevron-right" />
        </span>
      </button>
      <div
        className={accordionContent({ isOpen })}
        aria-hidden={!isOpen}
      >
        <div className={accordionContentInner({ isOpen })}>
          {children}
        </div>
      </div>
    </div>
  );
};
