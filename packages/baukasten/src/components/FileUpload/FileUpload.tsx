import React, { useRef, useState, useCallback } from 'react';
import { type Size } from '../../styles';
import { Icon } from '../Icon';
import { fileUpload, fileList, fileItem, fileItemRemove } from './FileUpload.css';

/**
 * FileUpload variant types
 */
export type FileUploadVariant = 'default' | 'primary' | 'dashed';

/**
 * File upload component props
 */
export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Callback fired when files are selected or dropped
     */
    onChange?: (files: File[]) => void;

    /**
     * Accepted file types (e.g., "image/*", ".pdf,.doc")
     */
    accept?: string;

    /**
     * Allow multiple file selection
     * @default false
     */
    multiple?: boolean;

    /**
     * Maximum number of files allowed
     */
    maxFiles?: number;

    /**
     * Maximum file size in bytes
     */
    maxSize?: number;

    /**
     * Size of the upload area
     * @default 'md'
     */
    size?: Size;

    /**
     * Visual variant of the upload area
     * @default 'dashed'
     */
    variant?: FileUploadVariant;

    /**
     * Whether the upload area is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Custom label text
     * @default "Drop files here or click to browse"
     */
    label?: string;

    /**
     * Description text shown below the label
     */
    description?: string;

    /**
     * Show list of selected files
     * @default true
     */
    showFileList?: boolean;

    /**
     * Current list of files (for controlled component)
     */
    files?: File[];
}

/**
 * Format file size to human-readable format
 */
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * FileUpload component
 * 
 * A versatile file upload component with drag-and-drop support. Allows users to select
 * files by clicking or dragging. Supports file type restrictions, size limits, and
 * multiple file uploads.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FileUpload onChange={(files) => console.log(files)} />
 * 
 * // With restrictions
 * <FileUpload 
 *   accept="image/*"
 *   maxFiles={5}
 *   maxSize={5242880} // 5MB
 *   multiple
 *   onChange={(files) => handleFiles(files)}
 * />
 * 
 * // Custom styling
 * <FileUpload 
 *   variant="primary"
 *   size="lg"
 *   label="Upload your documents"
 *   description="PDF, DOC, DOCX up to 10MB"
 * />
 * 
 * // Controlled component
 * const [files, setFiles] = useState<File[]>([]);
 * 
 * <FileUpload 
 *   files={files}
 *   onChange={setFiles}
 *   showFileList
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
    onChange,
    accept,
    multiple = false,
    maxFiles,
    maxSize,
    size = 'md',
    variant = 'dashed',
    disabled = false,
    label = 'Drop files here or click to browse',
    description,
    showFileList = true,
    files: controlledFiles,
    className,
    ...props
}) => {
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled files if provided, otherwise use internal state
    const files = controlledFiles !== undefined ? controlledFiles : internalFiles;

    const handleFiles = useCallback(
        (newFiles: FileList | null) => {
            if (!newFiles || newFiles.length === 0) return;

            let fileArray = Array.from(newFiles);

            // Apply maxSize filter
            if (maxSize) {
                fileArray = fileArray.filter((file) => file.size <= maxSize);
            }

            // Apply maxFiles limit
            if (maxFiles) {
                const remainingSlots = maxFiles - files.length;
                fileArray = fileArray.slice(0, remainingSlots);
            }

            if (fileArray.length === 0) return;

            const updatedFiles = multiple ? [...files, ...fileArray] : fileArray;

            // Update state if not controlled
            if (controlledFiles === undefined) {
                setInternalFiles(updatedFiles);
            }

            // Call onChange callback
            onChange?.(updatedFiles);
        },
        [files, maxFiles, maxSize, multiple, onChange, controlledFiles]
    );

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (disabled) return;

            const droppedFiles = e.dataTransfer.files;
            handleFiles(droppedFiles);
        },
        [disabled, handleFiles]
    );

    const handleClick = useCallback(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.click();
        }
    }, [disabled]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(e.target.files);
            // Reset input value to allow selecting the same file again
            e.target.value = '';
        },
        [handleFiles]
    );

    const handleRemoveFile = useCallback(
        (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);

            // Update state if not controlled
            if (controlledFiles === undefined) {
                setInternalFiles(updatedFiles);
            }

            // Call onChange callback
            onChange?.(updatedFiles);
        },
        [files, onChange, controlledFiles]
    );

    return (
        <div className={className} {...props}>
            <div
                className={fileUpload({ size, variant, disabled, isDragging })}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label="File upload area"
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleClick();
                    }
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleInputChange}
                    disabled={disabled}
                    style={{ display: 'none' }}
                    aria-hidden="true"
                />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                    <Icon name="cloud-upload" style={{ fontSize: size === 'xl' ? '48px' : size === 'lg' ? '40px' : '32px' }} />

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-1)' }}>
                            {label}
                        </div>
                        {description && (
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>
                                {description}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showFileList && files.length > 0 && (
                <div className={fileList}>
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className={fileItem}>
                            <Icon name="file" style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 'var(--font-weight-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {file.name}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-foreground-muted)' }}>
                                    {formatFileSize(file.size)}
                                </div>
                            </div>
                            <button
                                type="button"
                                className={fileItemRemove}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(index);
                                }}
                                aria-label={`Remove ${file.name}`}
                                disabled={disabled}
                            >
                                <Icon name="close" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
