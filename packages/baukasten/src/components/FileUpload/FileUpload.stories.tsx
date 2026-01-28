import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload } from './FileUpload';

/**
 * FileUpload component with drag-and-drop support for selecting and uploading files.
 */
const meta: Meta<typeof FileUpload> = {
    title: 'Components/FileUpload',
    component: FileUpload,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile file upload component with drag-and-drop support. Allows users to select files by clicking or dragging. Supports file type restrictions, size limits, and multiple file uploads.',
            },
        },
    },
    argTypes: {
        onChange: {
            action: 'files changed',
            description: 'Callback fired when files are selected or dropped',
        },
        accept: {
            control: 'text',
            description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
        },
        multiple: {
            control: 'boolean',
            description: 'Allow multiple file selection',
        },
        maxFiles: {
            control: 'number',
            description: 'Maximum number of files allowed',
        },
        maxSize: {
            control: 'number',
            description: 'Maximum file size in bytes',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the upload area',
        },
        variant: {
            control: 'select',
            options: ['default', 'primary', 'dashed'],
            description: 'Visual variant of the upload area',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the upload area is disabled',
        },
        label: {
            control: 'text',
            description: 'Custom label text',
        },
        description: {
            control: 'text',
            description: 'Description text shown below the label',
        },
        showFileList: {
            control: 'boolean',
            description: 'Show list of selected files',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

/**
 * Default file upload with drag-and-drop
 */
export const Default: Story = {
    args: {
        onChange: (files) => console.log('Selected files:', files),
    },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', minWidth: '600px' }}>
            <FileUpload size="xs" label="Extra Small Upload" onChange={(files) => console.log(files)} />
            <FileUpload size="sm" label="Small Upload" onChange={(files) => console.log(files)} />
            <FileUpload size="md" label="Medium Upload" onChange={(files) => console.log(files)} />
            <FileUpload size="lg" label="Large Upload" onChange={(files) => console.log(files)} />
            <FileUpload size="xl" label="Extra Large Upload" onChange={(files) => console.log(files)} />
        </div>
    ),
};

/**
 * Different variants
 */
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', minWidth: '600px' }}>
            <FileUpload variant="default" label="Default Variant" onChange={(files) => console.log(files)} />
            <FileUpload variant="primary" label="Primary Variant" onChange={(files) => console.log(files)} />
            <FileUpload variant="dashed" label="Dashed Variant" onChange={(files) => console.log(files)} />
        </div>
    ),
};

/**
 * With custom description
 */
export const WithDescription: Story = {
    args: {
        label: 'Upload your documents',
        description: 'Supported formats: PDF, DOC, DOCX up to 10MB',
        onChange: (files) => console.log(files),
    },
};

/**
 * Multiple files upload
 */
export const Multiple: Story = {
    args: {
        multiple: true,
        label: 'Upload multiple files',
        description: 'Select one or more files',
        onChange: (files) => console.log('Files:', files),
    },
};

/**
 * Image upload only
 */
export const ImageOnly: Story = {
    args: {
        accept: 'image/*',
        label: 'Upload images',
        description: 'PNG, JPG, GIF up to 5MB',
        maxSize: 5242880, // 5MB
        onChange: (files) => console.log(files),
    },
};

/**
 * PDF documents only
 */
export const PDFOnly: Story = {
    args: {
        accept: '.pdf',
        label: 'Upload PDF documents',
        description: 'PDF files only, max 10MB',
        maxSize: 10485760, // 10MB
        onChange: (files) => console.log(files),
    },
};

/**
 * With file limit
 */
export const WithFileLimit: Story = {
    args: {
        multiple: true,
        maxFiles: 3,
        label: 'Upload up to 3 files',
        description: 'Maximum 3 files allowed',
        onChange: (files) => console.log(files),
    },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Upload disabled',
        description: 'This upload area is disabled',
    },
};

/**
 * Without file list
 */
export const WithoutFileList: Story = {
    args: {
        showFileList: false,
        label: 'Upload files',
        description: 'File list is hidden',
        onChange: (files) => console.log(files),
    },
};

/**
 * Controlled component
 */
export const Controlled: Story = {
    render: () => {
        const [files, setFiles] = useState<File[]>([]);

        return (
            <div style={{ minWidth: '600px' }}>
                <FileUpload
                    files={files}
                    multiple
                    label="Controlled file upload"
                    description={`${files.length} file(s) selected`}
                    onChange={setFiles}
                />
                <div style={{ marginTop: 'var(--bk-spacing-4)' }}>
                    <button
                        onClick={() => setFiles([])}
                        style={{
                            padding: 'var(--bk-spacing-2) var(--bk-spacing-4)',
                            background: 'var(--bk-color-danger)',
                            color: 'var(--bk-color-danger-foreground)',
                            border: 'none',
                            borderRadius: 'var(--bk-radius-md)',
                            cursor: 'pointer',
                        }}
                    >
                        Clear All Files
                    </button>
                </div>
            </div>
        );
    },
};

/**
 * Real-world example - Profile picture upload
 */
export const ProfilePictureUpload: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-4)',
            padding: 'var(--bk-spacing-6)',
            background: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-lg)',
            maxWidth: '500px',
        }}>
            <h3 style={{ margin: 0, fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                Upload Profile Picture
            </h3>
            <FileUpload
                accept="image/*"
                maxSize={2097152} // 2MB
                maxFiles={1}
                size="lg"
                variant="primary"
                label="Choose a profile picture"
                description="JPG or PNG, max 2MB"
                onChange={(files) => console.log('Profile picture:', files[0])}
            />
        </div>
    ),
};

/**
 * Real-world example - Document upload form
 */
export const DocumentUploadForm: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--bk-spacing-6)',
            padding: 'var(--bk-spacing-6)',
            background: 'var(--bk-color-background-secondary)',
            borderRadius: 'var(--bk-radius-lg)',
            maxWidth: '600px',
        }}>
            <div>
                <h3 style={{ margin: 0, marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    Submit Application Documents
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-foreground-muted)' }}>
                    Upload all required documents for your application
                </p>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Resume / CV *
                </label>
                <FileUpload
                    accept=".pdf,.doc,.docx"
                    maxSize={5242880} // 5MB
                    label="Upload your resume"
                    description="PDF, DOC, or DOCX, max 5MB"
                    onChange={(files) => console.log('Resume:', files)}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-medium)' }}>
                    Supporting Documents
                </label>
                <FileUpload
                    multiple
                    maxFiles={5}
                    maxSize={10485760} // 10MB
                    label="Upload additional documents"
                    description="Up to 5 files, max 10MB each"
                    onChange={(files) => console.log('Supporting docs:', files)}
                />
            </div>

            <button
                style={{
                    padding: 'var(--bk-spacing-3) var(--bk-spacing-6)',
                    background: 'var(--bk-color-accent)',
                    color: 'var(--bk-color-accent-foreground)',
                    border: 'none',
                    borderRadius: 'var(--bk-radius-md)',
                    fontWeight: 'var(--bk-font-weight-medium)',
                    cursor: 'pointer',
                    transition: 'var(--bk-transition-colors)',
                }}
            >
                Submit Application
            </button>
        </div>
    ),
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
    render: () => {
        const [files, setFiles] = useState<File[]>([]);
        const [uploadProgress, setUploadProgress] = useState(false);

        const handleUpload = () => {
            setUploadProgress(true);
            // Simulate upload
            setTimeout(() => {
                setUploadProgress(false);
                alert(`Uploaded ${files.length} file(s) successfully!`);
                setFiles([]);
            }, 2000);
        };

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bk-spacing-4)',
                padding: 'var(--bk-spacing-6)',
                background: 'var(--bk-color-background-secondary)',
                borderRadius: 'var(--bk-radius-lg)',
                minWidth: '600px',
            }}>
                <h3 style={{ margin: 0, fontSize: 'var(--bk-font-size-lg)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
                    File Upload Manager
                </h3>

                <FileUpload
                    files={files}
                    multiple
                    maxFiles={10}
                    maxSize={10485760} // 10MB
                    label="Drop your files here"
                    description={`${files.length}/10 files selected. Max 10MB per file.`}
                    onChange={setFiles}
                    disabled={uploadProgress}
                />

                <div style={{ display: 'flex', gap: 'var(--bk-spacing-3)' }}>
                    <button
                        onClick={handleUpload}
                        disabled={files.length === 0 || uploadProgress}
                        style={{
                            flex: 1,
                            padding: 'var(--bk-spacing-3)',
                            background: files.length > 0 && !uploadProgress ? 'var(--bk-color-accent)' : 'var(--bk-color-background-hover)',
                            color: files.length > 0 && !uploadProgress ? 'var(--bk-color-accent-foreground)' : 'var(--bk-color-foreground-muted)',
                            border: 'none',
                            borderRadius: 'var(--bk-radius-md)',
                            fontWeight: 'var(--bk-font-weight-medium)',
                            cursor: files.length > 0 && !uploadProgress ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {uploadProgress ? 'Uploading...' : `Upload ${files.length} File(s)`}
                    </button>
                    <button
                        onClick={() => setFiles([])}
                        disabled={files.length === 0 || uploadProgress}
                        style={{
                            padding: 'var(--bk-spacing-3) var(--bk-spacing-6)',
                            background: 'transparent',
                            color: 'var(--bk-color-foreground)',
                            border: '1px solid var(--bk-color-border)',
                            borderRadius: 'var(--bk-radius-md)',
                            fontWeight: 'var(--bk-font-weight-medium)',
                            cursor: files.length > 0 && !uploadProgress ? 'pointer' : 'not-allowed',
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
        );
    },
};
