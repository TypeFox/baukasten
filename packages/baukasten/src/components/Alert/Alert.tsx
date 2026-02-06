import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type { CodiconName } from '../Icon/codicon-names';
import {
  alert,
  alertIcon,
  alertContent,
  alertTitle,
  alertDescription,
  alertClose,
} from './Alert.css';

/**
 * Alert variant types
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert component props
 * Extends all standard HTML div attributes
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Optional title/header for the alert
   */
  title?: string;

  /**
   * Content to display in the alert body
   */
  children: React.ReactNode;

  /**
   * Custom icon to override the default variant icon
   */
  icon?: React.ReactNode;

  /**
   * Whether the alert can be dismissed with a close button
   * @default false
   */
  closable?: boolean;

  /**
   * Optional callback when the close button is clicked
   */
  onClose?: () => void;
}

/**
 * Default icons for each variant
 */
const variantIcons: Record<AlertVariant, CodiconName> = {
  info: 'info',
  success: 'pass',
  warning: 'warning',
  error: 'error',
};

/**
 * Alert component
 *
 * A prestyled container for displaying important information to users.
 * Supports multiple variants (info, success, warning, error) with default icons,
 * optional title, and dismissible functionality.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Alert>This is an informational alert</Alert>
 *
 * // With variant
 * <Alert variant="success">Operation completed successfully</Alert>
 * <Alert variant="warning">Please review your changes</Alert>
 * <Alert variant="error">An error occurred</Alert>
 *
 * // With title
 * <Alert variant="info" title="Important Notice">
 *   This is the alert description text
 * </Alert>
 *
 * // With custom icon
 * <Alert icon={<Icon name="flame" />}>
 *   Custom icon alert
 * </Alert>
 *
 * // Dismissible alert
 * <Alert variant="success" closable>
 *   This alert can be dismissed
 * </Alert>
 *
 * // With title and dismiss
 * <Alert
 *   variant="warning"
 *   title="Warning"
 *   closable
 *   onClose={() => console.log('closed')}
 * >
 *   Please save your work before proceeding
 * </Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  closable = false,
  onClose,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const defaultIcon = <Icon name={variantIcons[variant]} size="md" />;
  const displayIcon = icon === null ? null : icon || defaultIcon;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={clsx(alert({ variant }), className)} role="alert" {...props}>
      {displayIcon && (
        <div className={alertIcon({ variant })}>
          {displayIcon}
        </div>
      )}

      <div className={alertContent}>
        {title && <div className={alertTitle}>{title}</div>}
        <div className={alertDescription}>{children}</div>
      </div>

      {closable && (
        <button
          className={alertClose}
          onClick={handleClose}
          aria-label="Close alert"
          type="button"
        >
          <Icon name="close" size="md" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
