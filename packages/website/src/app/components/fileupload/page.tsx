'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { FileUpload } from '@baukasten/ui';
import { useState } from 'react';

const fileUploadProps: PropDefinition[] = [
    {
        name: 'onChange',
        type: '(files: File[]) => void',
        required: false,
        description: 'Callback fired when files are selected or dropped',
    },
    {
        name: 'accept',
        type: 'string',
        required: false,
        description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
    },
    {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Allow multiple file selection',
    },
    {
        name: 'maxFiles',
        type: 'number',
        required: false,
        description: 'Maximum number of files allowed',
    },
    {
        name: 'maxSize',
        type: 'number',
        required: false,
        description: 'Maximum file size in bytes',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the upload area',
    },
    {
        name: 'variant',
        type: '"default" | "primary" | "dashed"',
        default: '"dashed"',
        description: 'Visual variant of the upload area',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the upload area is disabled',
    },
    {
        name: 'label',
        type: 'string',
        default: '"Drop files here or click to browse"',
        description: 'Custom label text',
    },
    {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Description text shown below the label',
    },
    {
        name: 'showFileList',
        type: 'boolean',
        default: 'true',
        description: 'Show list of selected files',
    },
    {
        name: 'files',
        type: 'File[]',
        required: false,
        description: 'Current list of files (for controlled component)',
    },
];

export default function FileUploadPage() {
    const [files1, setFiles1] = useState<File[]>([]);
    const [files2, setFiles2] = useState<File[]>([]);

    return (
        <PageLayout
            title="FileUpload"
            description="A versatile file upload component with drag-and-drop support. Allows users to select files by clicking or dragging."
        >
            <Showcase
                title="Basic Usage"
                description="The default file upload with drag-and-drop support. Click or drag files to upload."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload onChange={(files) => console.log('Files:', files)} />
                    </div>
                }
                code={`import { FileUpload } from '@baukasten/ui';

function App() {
  return (
    <FileUpload 
      onChange={(files) => console.log('Files:', files)} 
    />
  );
}`}
            />

            <Showcase
                title="With Custom Labels"
                description="Customize the label and description text to guide users."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            label="Upload your documents"
                            description="Supported formats: PDF, DOC, DOCX up to 10MB"
                            onChange={(files) => console.log(files)}
                        />
                    </div>
                }
                code={`<FileUpload 
  label="Upload your documents"
  description="Supported formats: PDF, DOC, DOCX up to 10MB"
  onChange={(files) => console.log(files)}
/>`}
            />

            <Showcase
                title="Sizes"
                description="Five size options from extra small to extra large."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', minWidth: '500px' }}>
                        <FileUpload size="xs" label="Extra Small" onChange={(files) => console.log(files)} />
                        <FileUpload size="sm" label="Small" onChange={(files) => console.log(files)} />
                        <FileUpload size="md" label="Medium (Default)" onChange={(files) => console.log(files)} />
                    </div>
                }
                code={`<FileUpload size="xs" label="Extra Small" />
<FileUpload size="sm" label="Small" />
<FileUpload size="md" label="Medium" />
<FileUpload size="lg" label="Large" />
<FileUpload size="xl" label="Extra Large" />`}
            />

            <Showcase
                title="Variants"
                description="Three visual variants: default, primary, and dashed."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', minWidth: '500px' }}>
                        <FileUpload variant="default" label="Default Variant" onChange={(files) => console.log(files)} />
                        <FileUpload variant="primary" label="Primary Variant" onChange={(files) => console.log(files)} />
                        <FileUpload variant="dashed" label="Dashed Variant (Default)" onChange={(files) => console.log(files)} />
                    </div>
                }
                code={`<FileUpload variant="default" />
<FileUpload variant="primary" />
<FileUpload variant="dashed" />`}
            />

            <Showcase
                title="Multiple Files"
                description="Enable multiple file selection with the multiple prop."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            multiple
                            label="Upload multiple files"
                            description="Select one or more files"
                            onChange={(files) => console.log('Files:', files)}
                        />
                    </div>
                }
                code={`<FileUpload 
  multiple
  label="Upload multiple files"
  description="Select one or more files"
  onChange={(files) => console.log(files)}
/>`}
            />

            <Showcase
                title="Image Upload Only"
                description="Restrict file types using the accept prop."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            accept="image/*"
                            label="Upload images"
                            description="PNG, JPG, GIF up to 5MB"
                            maxSize={5242880}
                            onChange={(files) => console.log(files)}
                        />
                    </div>
                }
                code={`<FileUpload 
  accept="image/*"
  label="Upload images"
  description="PNG, JPG, GIF up to 5MB"
  maxSize={5242880} // 5MB in bytes
  onChange={(files) => console.log(files)}
/>`}
            />

            <Showcase
                title="PDF Documents Only"
                description="Accept specific file extensions."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            accept=".pdf"
                            label="Upload PDF documents"
                            description="PDF files only, max 10MB"
                            maxSize={10485760}
                            onChange={(files) => console.log(files)}
                        />
                    </div>
                }
                code={`<FileUpload 
  accept=".pdf"
  label="Upload PDF documents"
  description="PDF files only, max 10MB"
  maxSize={10485760} // 10MB
  onChange={(files) => console.log(files)}
/>`}
            />

            <Showcase
                title="File Limit"
                description="Limit the maximum number of files that can be uploaded."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            multiple
                            maxFiles={3}
                            label="Upload up to 3 files"
                            description="Maximum 3 files allowed"
                            onChange={(files) => console.log(files)}
                        />
                    </div>
                }
                code={`<FileUpload 
  multiple
  maxFiles={3}
  label="Upload up to 3 files"
  description="Maximum 3 files allowed"
  onChange={(files) => console.log(files)}
/>`}
            />

            <Showcase
                title="Disabled State"
                description="Disable the upload area when needed."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            disabled
                            label="Upload disabled"
                            description="This upload area is disabled"
                        />
                    </div>
                }
                code={`<FileUpload 
  disabled
  label="Upload disabled"
  description="This upload area is disabled"
/>`}
            />

            <Showcase
                title="Controlled Component"
                description="Control the file list state externally for full control."
                preview={
                    <div style={{ minWidth: '500px' }}>
                        <FileUpload
                            files={files1}
                            multiple
                            label="Controlled file upload"
                            description={`${files1.length} file(s) selected`}
                            onChange={setFiles1}
                        />
                        <div style={{ marginTop: 'var(--spacing-4)' }}>
                            <button
                                onClick={() => setFiles1([])}
                                disabled={files1.length === 0}
                                style={{
                                    padding: 'var(--spacing-2) var(--spacing-4)',
                                    background: files1.length > 0 ? 'var(--color-danger)' : 'var(--color-background-hover)',
                                    color: files1.length > 0 ? 'var(--color-danger-foreground)' : 'var(--color-foreground-muted)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: files1.length > 0 ? 'pointer' : 'not-allowed',
                                    fontWeight: 'var(--font-weight-medium)',
                                }}
                            >
                                Clear All Files
                            </button>
                        </div>
                    </div>
                }
                code={`const [files, setFiles] = useState<File[]>([]);

return (
  <>
    <FileUpload
      files={files}
      multiple
      label="Controlled file upload"
      description={\`\${files.length} file(s) selected\`}
      onChange={setFiles}
    />
    <button onClick={() => setFiles([])}>
      Clear All Files
    </button>
  </>
);`}
            />

            <Showcase
                title="Profile Picture Upload"
                description="Example use case for uploading a profile picture."
                preview={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)',
                        padding: 'var(--spacing-6)',
                        background: 'var(--color-background-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        maxWidth: '500px',
                    }}>
                        <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Upload Profile Picture
                        </h3>
                        <FileUpload
                            accept="image/*"
                            maxSize={2097152}
                            maxFiles={1}
                            size="lg"
                            variant="primary"
                            label="Choose a profile picture"
                            description="JPG or PNG, max 2MB"
                            onChange={(files) => console.log('Profile picture:', files[0])}
                        />
                    </div>
                }
                code={`<FileUpload
  accept="image/*"
  maxSize={2097152} // 2MB
  maxFiles={1}
  size="lg"
  variant="primary"
  label="Choose a profile picture"
  description="JPG or PNG, max 2MB"
  onChange={(files) => console.log('Profile picture:', files[0])}
/>`}
            />

            <Showcase
                title="Document Upload Form"
                description="Example of a complete document upload form with multiple upload areas."
                preview={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-6)',
                        padding: 'var(--spacing-6)',
                        background: 'var(--color-background-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        maxWidth: '600px',
                    }}>
                        <div>
                            <h3 style={{ margin: 0, marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Submit Application Documents
                            </h3>
                            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-foreground-muted)' }}>
                                Upload all required documents for your application
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontWeight: 'var(--font-weight-medium)' }}>
                                Resume / CV *
                            </label>
                            <FileUpload
                                accept=".pdf,.doc,.docx"
                                maxSize={5242880}
                                label="Upload your resume"
                                description="PDF, DOC, or DOCX, max 5MB"
                                onChange={(files) => console.log('Resume:', files)}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontWeight: 'var(--font-weight-medium)' }}>
                                Supporting Documents
                            </label>
                            <FileUpload
                                multiple
                                maxFiles={5}
                                maxSize={10485760}
                                label="Upload additional documents"
                                description="Up to 5 files, max 10MB each"
                                onChange={(files) => console.log('Supporting docs:', files)}
                            />
                        </div>

                        <button
                            style={{
                                padding: 'var(--spacing-3) var(--spacing-6)',
                                background: 'var(--color-accent)',
                                color: 'var(--color-accent-foreground)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 'var(--font-weight-medium)',
                                cursor: 'pointer',
                            }}
                        >
                            Submit Application
                        </button>
                    </div>
                }
                code={`<div>
  <label>Resume / CV *</label>
  <FileUpload
    accept=".pdf,.doc,.docx"
    maxSize={5242880}
    label="Upload your resume"
    description="PDF, DOC, or DOCX, max 5MB"
  />
</div>

<div>
  <label>Supporting Documents</label>
  <FileUpload
    multiple
    maxFiles={5}
    maxSize={10485760}
    label="Upload additional documents"
    description="Up to 5 files, max 10MB each"
  />
</div>`}
                props={fileUploadProps}
            />
        </PageLayout>
    );
}
