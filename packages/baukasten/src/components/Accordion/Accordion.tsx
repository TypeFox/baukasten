import React, { createContext, useContext } from 'react';
import { accordion } from './Accordion.css';

/**
 * Context for managing accordion group state
 */
interface AccordionContextValue {
  /**
   * Whether only one item can be open at a time
   */
  exclusive?: boolean;
  /**
   * Currently open item key (for exclusive mode)
   */
  openKey?: string | null;
  /**
   * Callback when an item is toggled
   */
  onToggle?: (key: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  exclusive: false,
  openKey: null,
});

/**
 * Use accordion context hook
 */
export const useAccordion = () => useContext(AccordionContext);

/**
 * Accordion component props
 */
export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /**
   * Whether only one accordion item can be open at a time
   * @default false
   */
  exclusive?: boolean;
  /**
   * Default open item key (for controlled exclusive mode)
   */
  defaultOpen?: string;
  /**
   * Callback when accordion items are toggled
   */
  onAccordionChange?: (key: string) => void;
}

/**
 * Accordion component
 *
 * Container for stacked accordion items that can expand and collapse.
 * When multiple accordions are stacked, they appear nicely grouped with shared borders.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Accordion>
 *   <AccordionItem title="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 *   <AccordionItem title="Section 2">
 *     Content for section 2
 *   </AccordionItem>
 * </Accordion>
 *
 * // Exclusive mode (only one item open at a time)
 * <Accordion exclusive>
 *   <AccordionItem title="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 *   <AccordionItem title="Section 2">
 *     Content for section 2
 *   </AccordionItem>
 * </Accordion>
 *
 * // With default open item
 * <Accordion exclusive defaultOpen="section-1">
 *   <AccordionItem id="section-1" title="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 *   <AccordionItem id="section-2" title="Section 2">
 *     Content for section 2
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  exclusive = false,
  defaultOpen,
  onAccordionChange,
  className,
  children,
  ...props
}) => {
  const [openKey, setOpenKey] = React.useState<string | null>(defaultOpen || null);

  const handleToggle = React.useCallback((key: string) => {
    if (exclusive) {
      setOpenKey(prev => prev === key ? null : key);
    }
    onAccordionChange?.(key);
  }, [exclusive, onAccordionChange]);

  const contextValue = React.useMemo<AccordionContextValue>(() => ({
    exclusive,
    openKey: exclusive ? openKey : undefined,
    onToggle: handleToggle,
  }), [exclusive, openKey, handleToggle]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={className ? `${accordion} ${className}` : accordion} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
