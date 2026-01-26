import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import {
  backdrop,
  modalContainer,
  modalHeader,
  modalTitle,
  closeButton,
  modalBody,
  modalFooter,
} from './Modal.css';

/**
 * Modal size options
 * - Standard sizes: xs, sm, md, lg, xl
 * - fullscreen: Covers the entire viewport
 */
export type ModalSize = Size | 'fullscreen';

/**
 * Backdrop visual style
 * - solid: Dark semi-transparent backdrop
 * - blur: Blurred backdrop with reduced opacity
 * - transparent: No visible backdrop (clicks still work)
 */
export type BackdropVariant = 'solid' | 'blur' | 'transparent';

/**
 * Modal component props
 */
export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;

  /**
   * Callback when the modal should close
   */
  onClose: () => void;

  /**
   * Size of the modal
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Backdrop visual style
   * @default 'solid'
   */
  backdropVariant?: BackdropVariant;

  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  closeOnBackdropClick?: boolean;


  /**
   * Whether pressing Escape closes the modal
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Modal content (use ModalHeader, ModalBody, ModalFooter for structure)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ModalHeader component props
 */
export interface ModalHeaderProps {
  /**
   * Header content (typically a title)
   */
  children: React.ReactNode;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ModalBody component props
 */
export interface ModalBodyProps {
  /**
   * Body content
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ModalFooter component props
 */
export interface ModalFooterProps {
  /**
   * Footer content (typically action buttons)
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}


/**
 * Modal component
 *
 * A dialog overlay component that displays content in a centered container with backdrop.
 * Supports different sizes, fullscreen mode, backdrop variants, and composable structure.
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
 * // Basic modal with header, body, and footer
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <ModalHeader onClose={() => setIsOpen(false)}>
 *     Delete File
 *   </ModalHeader>
 *   <ModalBody>
 *     Are you sure you want to delete this file? This action cannot be undone.
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleDelete}>Delete</Button>
 *   </ModalFooter>
 * </Modal>
 *
 * // Fullscreen modal
 * <Modal open={isOpen} onClose={handleClose} size="fullscreen">
 *   <ModalHeader onClose={handleClose}>Preview</ModalHeader>
 *   <ModalBody>
 *     <ImagePreview src={imageUrl} />
 *   </ModalBody>
 * </Modal>
 *
 * // With blur backdrop
 * <Modal
 *   open={isOpen}
 *   onClose={handleClose}
 *   backdropVariant="blur"
 *   size="lg"
 * >
 *   <ModalBody>Content</ModalBody>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = 'md',
  backdropVariant = 'solid',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal container
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restore focus when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [open]);

  if (!open) return null;

  const containerClassName = className
    ? `${modalContainer({ size })} ${className}`
    : modalContainer({ size });

  return ReactDOM.createPortal(
    <>
      <div className={backdrop({ variant: backdropVariant })} onClick={handleBackdropClick} />
      <div
        ref={modalRef}
        className={containerClassName}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

/**
 * ModalHeader component
 *
 * Header section for the modal, typically containing a title and close button.
 *
 * @example
 * ```tsx
 * <ModalHeader onClose={() => setIsOpen(false)}>
 *   Confirm Action
 * </ModalHeader>
 * ```
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  showCloseButton = true,
  onClose,
  className,
}) => {
  const headerClassName = className ? `${modalHeader} ${className}` : modalHeader;

  return (
    <div className={headerClassName}>
      <div className={modalTitle}>{children}</div>
      {showCloseButton && onClose && (
        <button className={closeButton} onClick={onClose} aria-label="Close modal">
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};

/**
 * ModalBody component
 *
 * Main content area of the modal. Automatically handles overflow with scrolling.
 *
 * @example
 * ```tsx
 * <ModalBody>
 *   <p>Your modal content goes here.</p>
 * </ModalBody>
 * ```
 */
export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  const bodyClassName = className ? `${modalBody} ${className}` : modalBody;
  return <div className={bodyClassName}>{children}</div>;
};

/**
 * ModalFooter component
 *
 * Footer section for the modal, typically containing action buttons.
 * Content is right-aligned by default.
 *
 * @example
 * ```tsx
 * <ModalFooter>
 *   <Button variant="secondary" onClick={onCancel}>Cancel</Button>
 *   <Button variant="primary" onClick={onConfirm}>Confirm</Button>
 * </ModalFooter>
 * ```
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  const footerClassName = className ? `${modalFooter} ${className}` : modalFooter;
  return <div className={footerClassName}>{children}</div>;
};