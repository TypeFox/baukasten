import React, { createContext, useContext } from 'react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import * as styles from './Table.css';

/**
 * Table variant options
 * - `default`: Standard table with borders
 * - `zebra`: Alternating row colors for better readability
 */
export type TableVariant = 'default' | 'zebra';

/**
 * Column alignment options
 */
export type ColumnAlign = 'left' | 'center' | 'right';

/**
 * Sort direction for sortable columns
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Context for sharing table configuration
 */
interface TableContextValue {
  variant: TableVariant;
  size: Size;
  bordered: boolean;
}

const TableContext = createContext<TableContextValue>({
  variant: 'default',
  size: 'md',
  bordered: true,
});

/**
 * Main Table component props
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Visual variant of the table
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * Size of the table cells
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether to show borders
   * @default true
   */
  bordered?: boolean;

  /**
   * Whether the table should take full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Make the table scrollable with a max height (enables sticky headers to work)
   * Can be a number (pixels) or a CSS height string
   * @default undefined
   */
  maxHeight?: number | string;

  /**
   * Table caption for accessibility
   */
  caption?: React.ReactNode;

  /**
   * Position of the caption
   * @default 'top'
   */
  captionSide?: 'top' | 'bottom';

  /**
   * Accessible label for the table
   */
  'aria-label'?: string;

  /**
   * ID of element that labels the table
   */
  'aria-labelledby'?: string;
}

/**
 * Table Header component props
 */
export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Whether the header should stick to the top when scrolling
   * @default false
   */
  sticky?: boolean;
}

/**
 * Table Row component props
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether the row is selected/highlighted
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the row is hoverable
   * @default true
   */
  hoverable?: boolean;
}

/**
 * Table Cell component props
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment within the cell
   * @default 'left'
   */
  align?: ColumnAlign;
}

/**
 * Table Header Cell component props
 */
export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment within the cell
   * @default 'left'
   */
  align?: ColumnAlign;

  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;

  /**
   * Callback when sort is triggered
   */
  onSort?: () => void;
}

/**
 * Table Body component props
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Whether the table is loading
   * @default false
   */
  loading?: boolean;

  /**
   * Text to display when loading
   * @default 'Loading...'
   */
  loadingText?: string;

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Whether the table has no data
   * @default false
   */
  empty?: boolean;

  /**
   * Text to display when empty
   * @default 'No data available'
   */
  emptyText?: string;

  /**
   * Custom empty state component
   */
  emptyComponent?: React.ReactNode;

  /**
   * Number of columns for colspan in empty/loading states
   * @default 999 (large value to span all columns)
   */
  colSpan?: number;
}


/**
 * Main Table component
 * 
 * A feature-rich table component with support for various styles, sizes, and functionality.
 * Fully integrates with the Baukasten design system.
 * 
 * @example 
 * ```tsx
 * <Table variant="zebra" size="md">
 *   <Table.Head sticky>
 *     <Table.Row>
 *       <Table.HeaderCell sortable>Name</Table.HeaderCell>
 *       <Table.HeaderCell>Email</Table.HeaderCell>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>John Doe</Table.Cell>
 *       <Table.Cell>john@example.com</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
export const Table: React.FC<TableProps> & {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Footer: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
  HeaderCell: React.FC<TableHeaderCellProps>;
} = ({
  variant = 'default',
  size = 'md',
  bordered = true,
  fullWidth = true,
  maxHeight,
  caption,
  captionSide = 'top',
  children,
  className,
  ...props
}) => {
    const contextValue: TableContextValue = {
      variant,
      size,
      bordered,
    };

    const table = (
      <table
        className={clsx(styles.table({ fullWidth, bordered }), className)}
        {...props}
      >
        {caption && <caption className={styles.caption({ captionSide })}>{caption}</caption>}
        {children}
      </table>
    );

    // If maxHeight is provided, wrap in a scrollable container
    if (maxHeight) {
      const heightValue = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
      return (
        <TableContext.Provider value={contextValue}>
          <div
            className={styles.tableScrollWrapper({ fullWidth })}
            style={{ maxHeight: heightValue }}
          >
            {table}
          </div>
        </TableContext.Provider>
      );
    }

    return (
      <TableContext.Provider value={contextValue}>
        {table}
      </TableContext.Provider>
    );
  };

/**
 * Table Head component
 */
const TableHead: React.FC<TableHeadProps> = ({
  sticky = false,
  children,
  className,
  ...props
}) => {
  const { bordered } = useContext(TableContext);

  return (
    <thead className={clsx(styles.tableHead({ sticky, bordered }), className)} {...props}>
      {children}
    </thead>
  );
};

/**
 * Table Body component
 */
// Large colspan value to ensure empty/loading states span all columns
const DEFAULT_COLSPAN = 999;

const TableBody: React.FC<TableBodyProps> = ({
  loading = false,
  loadingText = 'Loading...',
  loadingComponent,
  empty = false,
  emptyText = 'No data available',
  emptyComponent,
  colSpan = DEFAULT_COLSPAN,
  children,
  className,
  ...props
}) => {
  const { variant } = useContext(TableContext);

  // Show loading state
  if (loading) {
    return (
      <tbody className={clsx(styles.tableBody, className)} {...props}>
        <tr className={styles.tableRow({ variant, selected: false, hoverable: false })}>
          <td
            className={styles.tableCell({ align: 'center', bordered: false, size: 'md' })}
            colSpan={colSpan}
            style={{ padding: 'var(--bk-spacing-6)' }}
          >
            {loadingComponent || loadingText}
          </td>
        </tr>
      </tbody>
    );
  }

  // Show empty state
  if (empty || (!children || (React.Children.count(children) === 0))) {
    return (
      <tbody className={clsx(styles.tableBody, className)} {...props}>
        <tr className={styles.tableRow({ variant, selected: false, hoverable: false })}>
          <td
            className={styles.tableCell({ align: 'center', bordered: false, size: 'md' })}
            colSpan={colSpan}
            style={{ padding: 'var(--bk-spacing-6)', color: 'var(--bk-color-secondary-foreground)' }}
          >
            {emptyComponent || emptyText}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={clsx(styles.tableBody, className)} {...props}>
      {children}
    </tbody>
  );
};

/**
 * Table Footer component
 */
const TableFooter: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...props
}) => {
  const { bordered } = useContext(TableContext);

  return (
    <tfoot className={clsx(styles.tableFooter({ bordered }), className)} {...props}>
      {children}
    </tfoot>
  );
};

/**
 * Table Row component
 */
const TableRow: React.FC<TableRowProps> = ({
  selected = false,
  hoverable = true,
  children,
  className,
  ...props
}) => {
  const { variant } = useContext(TableContext);

  const rowClassName = variant === 'zebra'
    ? clsx(styles.tableRow({ variant, selected, hoverable }), styles.zebraRow, className)
    : clsx(styles.tableRow({ variant, selected, hoverable }), className);

  return (
    <tr
      className={rowClassName}
      {...props}
    >
      {children}
    </tr>
  );
};

/**
 * Table Cell component
 */
const TableCell: React.FC<TableCellProps> = ({
  align = 'left',
  children,
  className,
  ...props
}) => {
  const { bordered, size } = useContext(TableContext);

  return (
    <td
      className={clsx(styles.tableCell({
        align,
        bordered,
        size,
      }), className)}
      {...props}
    >
      {children}
    </td>
  );
};

/**
 * Table Header Cell component
 */
const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  align = 'left',
  sortable = false,
  sortDirection = null,
  onSort,
  children,
  scope = 'col',
  className,
  ...props
}) => {
  const { bordered, size } = useContext(TableContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (sortable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSort?.();
    }
  };

  return (
    <th
      scope={scope}
      className={clsx(styles.tableHeaderCell({
        align,
        sortable,
        bordered,
        size,
      }), className)}
      onClick={sortable ? onSort : undefined}
      onKeyDown={sortable ? handleKeyDown : undefined}
      tabIndex={sortable ? 0 : undefined}
      role={sortable ? 'button' : undefined}
      aria-sort={
        sortable && sortDirection
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : undefined
      }
      {...props}
    >
      {children}
      {sortable && (
        <span className={styles.sortIndicator({ direction: sortDirection || 'none' })}>
          {sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '▲'}
        </span>
      )}
    </th>
  );
};

// Attach sub-components to the main Table component
Table.Head = TableHead;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;

