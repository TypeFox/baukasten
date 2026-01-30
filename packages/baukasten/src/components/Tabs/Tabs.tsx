import React, { createContext, useContext, useState, useCallback } from 'react';
import clsx from 'clsx';
import { Icon, type CodiconName } from '../Icon';
import { type Size } from '../../styles';
import * as styles from './Tabs.css';

/**
 * Tabs orientation
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Tabs visual variant
 * - `line`: Clean line indicator (default VSCode style)
 * - `lifted`: Bordered active tab that connects to content area
 * - `pills`: Filled background pills with no border
 */
export type TabsVariant = 'line' | 'lifted' | 'pills';

/**
 * Position of the active indicator
 * - `start`: Top (horizontal) or Left (vertical)
 * - `end`: Bottom (horizontal) or Right (vertical)
 */
export type TabsIndicatorPosition = 'start' | 'end';

/**
 * Tabs component props
 */
export interface TabsProps {
  /**
   * Currently active tab value (controlled mode)
   */
  value?: string;

  /**
   * Default active tab value (uncontrolled mode)
   * @default first tab's value
   */
  defaultValue?: string;

  /**
   * Callback when active tab changes
   */
  onChange?: (value: string) => void;

  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;

  /**
   * Visual variant of the tabs
   * @default 'line'
   */
  variant?: TabsVariant;

  /**
   * Position of the active indicator
   * @default 'end'
   */
  indicatorPosition?: TabsIndicatorPosition;

  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: Size;

  /**
   * Children (TabList and TabPanels)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Tab component props
 */
export interface TabProps {
  /**
   * Unique value identifying this tab
   */
  value: string;

  /**
   * Tab label content
   */
  children: React.ReactNode;

  /**
   * Optional icon name (VSCode Codicon)
   */
  icon?: CodiconName;

  /**
   * Whether the tab can be closed
   * @default false
   */
  closable?: boolean;

  /**
   * Callback when close button is clicked
   */
  onClose?: (value: string) => void;

  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * TabList component props
 */
export interface TabListProps {
  /**
   * Tab components
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * TabPanel component props
 */
export interface TabPanelProps {
  /**
   * Value matching the Tab that controls this panel
   */
  value: string;

  /**
   * Panel content
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * TabPanels component props
 */
export interface TabPanelsProps {
  /**
   * TabPanel components
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Context for managing tabs state
 */
interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  indicatorPosition: TabsIndicatorPosition;
  size: Size;
  onClose?: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

/**
 * Helper function to get indicator position class
 */
const getLineIndicatorClass = (orientation: TabsOrientation, position: TabsIndicatorPosition) => {
  const key = `${orientation}-${position}`;
  switch (key) {
    case 'horizontal-end': return styles.lineIndicatorHorizontalEnd;
    case 'horizontal-start': return styles.lineIndicatorHorizontalStart;
    case 'vertical-end': return styles.lineIndicatorVerticalEnd;
    case 'vertical-start': return styles.lineIndicatorVerticalStart;
    default: return '';
  }
};

/**
 * Helper function to get lifted border radius class
 */
const getLiftedClass = (orientation: TabsOrientation, position: TabsIndicatorPosition) => {
  const key = `${orientation}-${position}`;
  switch (key) {
    case 'horizontal-end': return styles.liftedHorizontalEnd;
    case 'horizontal-start': return styles.liftedHorizontalStart;
    case 'vertical-end': return styles.liftedVerticalEnd;
    case 'vertical-start': return styles.liftedVerticalStart;
    default: return '';
  }
};

/**
 * Tabs component
 *
 * A tabbed interface component following VSCode's design patterns.
 * Supports horizontal and vertical orientations, icons, and closable tabs.
 *
 * **Note**: This component uses CSS custom properties. Make sure to include
 * `GlobalStyles` at the root of your app.
 *
 * @example
 * ```tsx
 * // Basic tabs
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *     <Tab value="tab3">Tab 3</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel value="tab1">Content 1</TabPanel>
 *     <TabPanel value="tab2">Content 2</TabPanel>
 *     <TabPanel value="tab3">Content 3</TabPanel>
 *   </TabPanels>
 * </Tabs>
 *
 * // With size
 * <Tabs defaultValue="tab1" size="lg">
 *   <TabList>
 *     <Tab value="tab1">Large Tab 1</Tab>
 *     <Tab value="tab2">Large Tab 2</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel value="tab1">Content 1</TabPanel>
 *     <TabPanel value="tab2">Content 2</TabPanel>
 *   </TabPanels>
 * </Tabs>
 *
 * // With icons
 * <Tabs defaultValue="file1">
 *   <TabList>
 *     <Tab value="file1" icon="file">index.ts</Tab>
 *     <Tab value="file2" icon="file">styles.css</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel value="file1">File 1 content</TabPanel>
 *     <TabPanel value="file2">File 2 content</TabPanel>
 *   </TabPanels>
 * </Tabs>
 *
 * // Closable tabs
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1" closable onClose={(val) => console.log('Close', val)}>Tab 1</Tab>
 *     <Tab value="tab2" closable>Tab 2</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel value="tab1">Content 1</TabPanel>
 *     <TabPanel value="tab2">Content 2</TabPanel>
 *   </TabPanels>
 * </Tabs>
 *
 * // Controlled mode
 * const [activeTab, setActiveTab] = useState('tab1');
 * <Tabs value={activeTab} onChange={setActiveTab}>
 *   <TabList>
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel value="tab1">Content 1</TabPanel>
 *     <TabPanel value="tab2">Content 2</TabPanel>
 *   </TabPanels>
 * </Tabs>
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  variant = 'line',
  indicatorPosition = 'end',
  size = 'md',
  children,
  className,
  style,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue || '');

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const setActiveValue = useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, orientation, variant, indicatorPosition, size }}>
      <div className={clsx(styles.tabs({ orientation }), className)} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabList component - Container for Tab buttons
 */
export const TabList: React.FC<TabListProps> = ({ children, className, style }) => {
  const { orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={clsx(styles.tabList({ orientation }), className)}
      style={style}
    >
      {children}
    </div>
  );
};

/**
 * Tab component - Individual tab button
 */
export const Tab: React.FC<TabProps> = ({
  value,
  children,
  icon,
  closable = false,
  onClose,
  disabled = false,
  className,
}) => {
  const { activeValue, setActiveValue, orientation, variant, indicatorPosition, size } = useTabsContext();
  const isActive = activeValue === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveValue(value);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(value);
  };

  // Get additional classes based on variant and orientation
  const tabClassName = clsx(
    styles.tab({ size, variant, active: isActive, disabled }),
    variant === 'line' && getLineIndicatorClass(orientation, indicatorPosition),
    variant === 'lifted' && getLiftedClass(orientation, indicatorPosition),
    className
  );

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      data-active={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      className={tabClassName}
    >
      <span className={styles.tabContent}>
        {icon && <Icon name={icon} />}
        {children}
      </span>
      {closable && (
        <span
          className={styles.tabCloseButton}
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClose(e as any);
            }
          }}
          role="button"
          aria-label={`Close ${children}`}
          tabIndex={-1}
        >
          <Icon name="close" />
        </span>
      )}
    </button>
  );
};

/**
 * TabPanels component - Container for TabPanel content
 */
export const TabPanels: React.FC<TabPanelsProps> = ({ children, className, style }) => {
  return (
    <div className={clsx(styles.tabPanels, className)} style={style}>
      {children}
    </div>
  );
};

/**
 * TabPanel component - Individual content panel
 */
export const TabPanel: React.FC<TabPanelProps> = ({ value, children, className, style }) => {
  const { activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={clsx(styles.tabPanel, className)}
      style={style}
    >
      {children}
    </div>
  );
};

Tabs.displayName = 'Tabs';
TabList.displayName = 'TabList';
Tab.displayName = 'Tab';
TabPanels.displayName = 'TabPanels';
TabPanel.displayName = 'TabPanel';
