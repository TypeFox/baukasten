import React, { useMemo } from 'react';
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import { Select } from '../Select';
import * as styles from './Pagination.css';

/**
 * Pagination component props
 */
export interface PaginationProps {
  /**
   * Total number of items
   */
  totalItems: number;

  /**
   * Current page (1-indexed)
   */
  currentPage: number;

  /**
   * Number of items per page
   */
  pageSize: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Options for page size selector
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (size: number) => void;

  /**
   * Whether to show the page size selector
   * @default true
   */
  showPageSizeSelector?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: Size;

  /**
   * Maximum number of visible page buttons before using ellipsis
   * @default 7
   */
  maxVisiblePages?: number;

  /**
   * Whether to show the range text (e.g., "1-10 of 100")
   * @default true
   */
  showRangeText?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}


/**
 * Helper function to generate page numbers with ellipsis
 */
function generatePageNumbers(currentPage: number, totalPages: number, maxVisible: number): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const sidePages = Math.floor((maxVisible - 3) / 2); // Reserve 3 spots for first, last, and one ellipsis

  // Always show first page
  pages.push(1);

  // Calculate start and end of middle range
  let start = Math.max(2, currentPage - sidePages);
  let end = Math.min(totalPages - 1, currentPage + sidePages);

  // Adjust if we're near the start or end
  if (currentPage <= sidePages + 2) {
    end = Math.min(totalPages - 1, maxVisible - 2);
  } else if (currentPage >= totalPages - sidePages - 1) {
    start = Math.max(2, totalPages - maxVisible + 3);
  }

  // Add ellipsis or pages after first page
  if (start > 2) {
    pages.push('ellipsis');
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis or pages before last page
  if (end < totalPages - 1) {
    pages.push('ellipsis');
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Pagination component
 *
 * A flexible pagination component with page navigation, range display, and optional page size selector.
 * Perfect for tables, lists, and any paginated data display.
 *
 * **Features:**
 * - Page number buttons with smart ellipsis for large page counts
 * - Previous/Next navigation buttons
 * - Range display (e.g., "1-10 of 100")
 * - Optional page size selector with customizable options
 * - Size variants matching the design system
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Pagination
 *   totalItems={100}
 *   currentPage={1}
 *   pageSize={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 *
 * // With page size selector
 * <Pagination
 *   totalItems={500}
 *   currentPage={currentPage}
 *   pageSize={pageSize}
 *   onPageChange={setCurrentPage}
 *   onPageSizeChange={setPageSize}
 *   pageSizeOptions={[10, 25, 50, 100]}
 * />
 *
 * // Compact variant
 * <Pagination
 *   totalItems={1000}
 *   currentPage={currentPage}
 *   pageSize={pageSize}
 *   onPageChange={setCurrentPage}
 *   size="sm"
 *   showRangeText={false}
 *   showPageSizeSelector={false}
 * />
 *
 * // With custom max visible pages
 * <Pagination
 *   totalItems={1000}
 *   currentPage={currentPage}
 *   pageSize={pageSize}
 *   onPageChange={setCurrentPage}
 *   maxVisiblePages={5}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  showPageSizeSelector = true,
  size = 'md',
  maxVisiblePages = 7,
  showRangeText = true,
  className,
}) => {
  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    return generatePageNumbers(currentPage, totalPages, maxVisiblePages);
  }, [currentPage, totalPages, maxVisiblePages]);

  // Navigation handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
      // Reset to first page when page size changes
      onPageChange(1);
    }
  };

  // Prepare page size options for Select
  const pageSizeSelectOptions = pageSizeOptions.map(size => ({
    value: size,
    label: `${size} / page`,
  }));

  const containerClassName = className
    ? `${styles.paginationContainer({ size })} ${className}`
    : styles.paginationContainer({ size });

  return (
    <div className={containerClassName}>
      {showRangeText && (
        <span className={styles.rangeText}>
          {startItem}-{endItem} of {totalItems}
        </span>
      )}

      <div className={styles.paginationSection}>
        {/* Previous Button */}
        <button
          className={styles.pageButton({
            size,
            isActive: false,
            isDisabled: currentPage === 1,
          })}
          disabled={currentPage === 1}
          onClick={handlePrevious}
          aria-label="Previous page"
          title="Previous page"
        >
          <Icon name="chevron-left" />
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>;
          }

          return (
            <button
              key={page}
              className={styles.pageButton({
                size,
                isActive: page === currentPage,
                isDisabled: false,
              })}
              onClick={() => handlePageClick(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className={styles.pageButton({
            size,
            isActive: false,
            isDisabled: currentPage === totalPages || totalPages === 0,
          })}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={handleNext}
          aria-label="Next page"
          title="Next page"
        >
          <Icon name="chevron-right" />
        </button>
      </div>

      {/* Page Size Selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className={styles.pageSizeContainer}>
          <Select
            value={pageSize}
            options={pageSizeSelectOptions}
            onChange={handlePageSizeChange}
            size={size}
          />
        </div>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';