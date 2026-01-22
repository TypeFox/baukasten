'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Showcase, PropDefinition } from '@/components/ComponentShowcase';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Icon, Input, FormGroup, FieldLabel, FormHelper, Heading, Paragraph, Text } from 'baukasten';

const modalProps: PropDefinition[] = [
    {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Whether the modal is open',
    },
    {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback when the modal should close',
    },
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "fullscreen"',
        default: '"md"',
        description: 'Size of the modal',
    },
    {
        name: 'backdropVariant',
        type: '"solid" | "blur" | "transparent"',
        default: '"solid"',
        description: 'Visual style of the backdrop',
    },
    {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        description: 'Whether clicking the backdrop closes the modal',
    },
    {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Whether pressing Escape closes the modal',
    },
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Modal content (use ModalHeader, ModalBody, ModalFooter)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const modalHeaderProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Header content (typically a title)',
    },
    {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show the close button',
    },
    {
        name: 'onClose',
        type: '() => void',
        description: 'Callback when close button is clicked',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const modalBodyProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Body content',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

const modalFooterProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Footer content (typically action buttons)',
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class name',
    },
];

// Basic interactive example
function BasicExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <ModalHeader onClose={() => setIsOpen(false)}>
                    Modal Title
                </ModalHeader>
                <ModalBody>
                    <Paragraph>This is the modal content. You can put any content here.</Paragraph>
                    <Paragraph>Try clicking outside, pressing ESC, or using the close button.</Paragraph>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

// Confirmation dialog example
function ConfirmationExample() {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        console.log('Item deleted');
        setIsOpen(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Delete Item
            </Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
                <ModalHeader onClose={() => setIsOpen(false)}>
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    <Paragraph>Are you sure you want to delete this item?</Paragraph>
                    <Paragraph>
                        <Text color="muted">This action cannot be undone.</Text>
                    </Paragraph>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

// Form example
function FormExample() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form submitted:', formData);
            setIsOpen(false);
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Contact Form</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
                <ModalHeader onClose={() => setIsOpen(false)}>
                    Contact Us
                </ModalHeader>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <FormGroup orientation="vertical">
                            <FieldLabel htmlFor="name" required>Name</FieldLabel>
                            <div>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    error={!!errors.name}
                                    fullWidth
                                />
                                {errors.name && <FormHelper variant="error">{errors.name}</FormHelper>}
                            </div>
                        </FormGroup>

                        <FormGroup orientation="vertical">
                            <FieldLabel htmlFor="email" required>Email</FieldLabel>
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    error={!!errors.email}
                                    fullWidth
                                />
                                {errors.email && <FormHelper variant="error">{errors.email}</FormHelper>}
                            </div>
                        </FormGroup>

                        <FormGroup orientation="vertical">
                            <FieldLabel htmlFor="message">Message</FieldLabel>
                            <textarea
                                id="message"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={(e) => handleChange('message', e.target.value)}
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: 'var(--padding-md)',
                                    backgroundColor: 'var(--color-input-background)',
                                    color: 'var(--color-input-foreground)',
                                    border: '1px solid var(--color-input-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'inherit',
                                    fontSize: 'var(--font-size-md)',
                                    resize: 'vertical',
                                }}
                            />
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Send Message
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default function ModalPage() {
    const [sizesModal, setSizesModal] = useState<string | null>(null);
    const [backdropModal, setBackdropModal] = useState<'solid' | 'blur' | 'transparent' | null>(null);
    const [fullscreenModal, setFullscreenModal] = useState(false);
    const [scrollModal, setScrollModal] = useState(false);
    const [simpleModal, setSimpleModal] = useState(false);
    const [requiredModal, setRequiredModal] = useState(false);

    return (
        <PageLayout
            title="Modal"
            description="A dialog overlay component that displays content in a centered container with backdrop. Supports different sizes, fullscreen mode, backdrop variants, and composable structure."
        >
            <Showcase
                title="Basic Usage"
                description="Modal is a composable component using ModalHeader, ModalBody, and ModalFooter. It renders to document.body using React portals and includes backdrop, keyboard navigation, and focus management."
                preview={<BasicExample />}
                code={`import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'baukasten';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader onClose={() => setIsOpen(false)}>
          Modal Title
        </ModalHeader>
        <ModalBody>
          <p>This is the modal content.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
                props={modalProps}
            />

            <Showcase
                title="Sizes"
                description="Six size options: xs (400px), sm (500px), md (600px - default), lg (800px), xl (1000px), and fullscreen. All sizes are responsive with 90% width on smaller screens."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                            <Button key={size} size="sm" onClick={() => setSizesModal(size)}>
                                {size.toUpperCase()}
                            </Button>
                        ))}
                        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                            <Modal
                                key={size}
                                open={sizesModal === size}
                                onClose={() => setSizesModal(null)}
                                size={size as any}
                            >
                                <ModalHeader onClose={() => setSizesModal(null)}>
                                    {size.toUpperCase()} Modal
                                </ModalHeader>
                                <ModalBody>
                                    <Paragraph>This is a {size} sized modal.</Paragraph>
                                    <Paragraph>
                                        Max-width: {
                                            size === 'xs' ? '400px' :
                                                size === 'sm' ? '500px' :
                                                    size === 'md' ? '600px' :
                                                        size === 'lg' ? '800px' : '1000px'
                                        }
                                    </Paragraph>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => setSizesModal(null)}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        ))}
                    </div>
                }
                code={`// Extra small (400px)
<Modal open={isOpen} onClose={handleClose} size="xs">
  <ModalHeader onClose={handleClose}>XS Modal</ModalHeader>
  <ModalBody>Compact modal for simple messages.</ModalBody>
</Modal>

// Small (500px) - Good for confirmations
<Modal open={isOpen} onClose={handleClose} size="sm">
  <ModalHeader onClose={handleClose}>SM Modal</ModalHeader>
  <ModalBody>Small modal for confirmations.</ModalBody>
</Modal>

// Medium (600px) - Default
<Modal open={isOpen} onClose={handleClose} size="md">
  <ModalHeader onClose={handleClose}>MD Modal</ModalHeader>
  <ModalBody>Default modal size.</ModalBody>
</Modal>

// Large (800px) - Good for forms
<Modal open={isOpen} onClose={handleClose} size="lg">
  <ModalHeader onClose={handleClose}>LG Modal</ModalHeader>
  <ModalBody>Large modal for forms.</ModalBody>
</Modal>

// Extra large (1000px)
<Modal open={isOpen} onClose={handleClose} size="xl">
  <ModalHeader onClose={handleClose}>XL Modal</ModalHeader>
  <ModalBody>Extra large modal for complex content.</ModalBody>
</Modal>`}
            />

            <Showcase
                title="Fullscreen Modal"
                description="Fullscreen mode covers the entire viewport with no border radius. Perfect for media previews, image galleries, or immersive experiences."
                preview={
                    <>
                        <Button onClick={() => setFullscreenModal(true)}>Open Fullscreen Modal</Button>
                        <Modal
                            open={fullscreenModal}
                            onClose={() => setFullscreenModal(false)}
                            size="fullscreen"
                        >
                            <ModalHeader onClose={() => setFullscreenModal(false)}>
                                Fullscreen Preview
                            </ModalHeader>
                            <ModalBody>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    gap: 'var(--spacing-4)'
                                }}>
                                    <Heading level={2}>Fullscreen Modal</Heading>
                                    <Paragraph>This modal covers the entire viewport.</Paragraph>
                                    <Paragraph>Perfect for media previews or immersive content.</Paragraph>
                                </div>
                            </ModalBody>
                        </Modal>
                    </>
                }
                code={`<Modal
  open={isOpen}
  onClose={handleClose}
  size="fullscreen"
>
  <ModalHeader onClose={handleClose}>
    Fullscreen Preview
  </ModalHeader>
  <ModalBody>
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      {/* Your fullscreen content */}
    </div>
  </ModalBody>
</Modal>`}
            />

            <Showcase
                title="Backdrop Variants"
                description="Three backdrop styles: solid (default dark overlay), blur (backdrop-filter blur effect), and transparent (no visible backdrop but still interactive)."
                preview={
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                        <Button onClick={() => setBackdropModal('solid')}>Solid Backdrop</Button>
                        <Button onClick={() => setBackdropModal('blur')}>Blur Backdrop</Button>
                        <Button onClick={() => setBackdropModal('transparent')}>Transparent</Button>
                        {['solid', 'blur', 'transparent'].map((variant) => (
                            <Modal
                                key={variant}
                                open={backdropModal === variant}
                                onClose={() => setBackdropModal(null)}
                                backdropVariant={variant as any}
                                size="sm"
                            >
                                <ModalHeader onClose={() => setBackdropModal(null)}>
                                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Backdrop
                                </ModalHeader>
                                <ModalBody>
                                    <Paragraph>This modal uses the <Text weight="bold">{variant}</Text> backdrop variant.</Paragraph>
                                    <ul style={{ margin: 0, paddingLeft: 'var(--spacing-5)' }}>
                                        <li><Text weight="bold">Solid</Text>: Dark semi-transparent</li>
                                        <li><Text weight="bold">Blur</Text>: Blurred with backdrop-filter</li>
                                        <li><Text weight="bold">Transparent</Text>: No visible backdrop</li>
                                    </ul>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => setBackdropModal(null)}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        ))}
                        {/* Background content to see backdrop effect */}
                        <div style={{
                            width: '100%',
                            marginTop: 'var(--spacing-4)',
                            padding: 'var(--spacing-4)',
                            border: '1px solid var(--vscode-textBlockQuote-border)',
                            borderRadius: 'var(--border-radius-md)'
                        }}>
                            <Heading level={4}>Background Content</Heading>
                            <Paragraph>Open the modals above to see how different backdrop styles affect this content. The blur backdrop will make this text appear blurred.</Paragraph>
                        </div>
                    </div>
                }
                code={`// Solid backdrop (default)
<Modal
  open={isOpen}
  onClose={handleClose}
  backdropVariant="solid"
>
  <ModalBody>Dark semi-transparent backdrop</ModalBody>
</Modal>

// Blur backdrop
<Modal
  open={isOpen}
  onClose={handleClose}
  backdropVariant="blur"
>
  <ModalBody>Blurred background effect</ModalBody>
</Modal>

// Transparent backdrop
<Modal
  open={isOpen}
  onClose={handleClose}
  backdropVariant="transparent"
>
  <ModalBody>No visible backdrop (clicks still work)</ModalBody>
</Modal>`}
            />

            <Showcase
                title="Confirmation Dialog"
                description="Simple confirmation dialog for destructive actions. Small size works well for confirmations that require user acknowledgment."
                preview={<ConfirmationExample />}
                code={`import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'baukasten';

function ConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
        <ModalHeader onClose={() => setIsOpen(false)}>
          Confirm Delete
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this item?</p>
          <p style={{ color: 'var(--vscode-descriptionForeground)' }}>
            This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
            />

            <Showcase
                title="With Form"
                description="Modal with form fields and validation. Large size provides enough space for multiple form fields and validation messages."
                preview={<FormExample />}
                code={`import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, FieldLabel, FormHelper } from 'baukasten';

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    // Validation logic
    console.log('Form submitted:', formData);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Contact Form</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalHeader onClose={() => setIsOpen(false)}>
          Contact Us
        </ModalHeader>
        <ModalBody>
          <FormGroup orientation="vertical">
            <FieldLabel htmlFor="name" required>Name</FieldLabel>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
            />
          </FormGroup>
          {/* More form fields */}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
                props={[...modalHeaderProps, ...modalBodyProps, ...modalFooterProps]}
            />

            <Showcase
                title="Scrollable Content"
                description="Modal body automatically handles overflow with scrolling. Header and footer remain fixed while the body scrolls."
                preview={
                    <>
                        <Button onClick={() => setScrollModal(true)}>Open Scrollable Modal</Button>
                        <Modal open={scrollModal} onClose={() => setScrollModal(false)} size="md">
                            <ModalHeader onClose={() => setScrollModal(false)}>
                                Terms and Conditions
                            </ModalHeader>
                            <ModalBody>
                                {Array.from({ length: 20 }, (_, i) => (
                                    <Paragraph key={i}>
                                        Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </Paragraph>
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="secondary" onClick={() => setScrollModal(false)}>
                                    Decline
                                </Button>
                                <Button variant="primary" onClick={() => setScrollModal(false)}>
                                    Accept
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                }
                code={`<Modal open={isOpen} onClose={handleClose} size="md">
  <ModalHeader onClose={handleClose}>
    Terms and Conditions
  </ModalHeader>
  <ModalBody>
    {/* Long content that will scroll */}
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i}>
        Section {i + 1}: Lorem ipsum dolor sit amet...
      </p>
    ))}
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>Decline</Button>
    <Button variant="primary" onClick={handleClose}>Accept</Button>
  </ModalFooter>
</Modal>`}
            />

            <Showcase
                title="Simple Modal (Body Only)"
                description="Minimal modal with only body content. No header or footer components needed for simple messages."
                preview={
                    <>
                        <Button onClick={() => setSimpleModal(true)}>Open Simple Modal</Button>
                        <Modal open={simpleModal} onClose={() => setSimpleModal(false)} size="sm">
                            <ModalBody>
                                <div style={{ textAlign: 'center', padding: 'var(--spacing-4)' }}>
                                    <Heading level={3} marginBottom={false}>Simple Message</Heading>
                                    <Paragraph>This modal only has a body section.</Paragraph>
                                    <div style={{ marginTop: 'var(--spacing-4)' }}>
                                        <Button onClick={() => setSimpleModal(false)}>Got it</Button>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </>
                }
                code={`<Modal open={isOpen} onClose={handleClose} size="sm">
  <ModalBody>
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h3>Simple Message</h3>
      <p>This modal only has a body section.</p>
      <Button onClick={handleClose}>Got it</Button>
    </div>
  </ModalBody>
</Modal>`}
            />

            <Showcase
                title="Required Action Modal"
                description="Modal that requires explicit user choice. Disables backdrop click and ESC key, and hides the close button to force users to make a decision."
                preview={
                    <>
                        <Button onClick={() => setRequiredModal(true)}>Open Required Action</Button>
                        <Modal
                            open={requiredModal}
                            onClose={() => setRequiredModal(false)}
                            closeOnBackdropClick={false}
                            closeOnEscape={false}
                            size="sm"
                        >
                            <ModalHeader showCloseButton={false}>
                                Action Required
                            </ModalHeader>
                            <ModalBody>
                                <Paragraph>This modal requires you to make a choice.</Paragraph>
                                <Paragraph>You cannot close it by clicking outside or pressing ESC.</Paragraph>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="secondary" onClick={() => setRequiredModal(false)}>
                                    Decline
                                </Button>
                                <Button variant="primary" onClick={() => setRequiredModal(false)}>
                                    Accept
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                }
                code={`<Modal
  open={isOpen}
  onClose={handleClose}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <ModalHeader showCloseButton={false}>
    Action Required
  </ModalHeader>
  <ModalBody>
    <p>This modal requires you to make a choice.</p>
    <p>You cannot close it by clicking outside or pressing ESC.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>
      Decline
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Accept
    </Button>
  </ModalFooter>
</Modal>`}
            />

            <div
                style={{
                    marginTop: 'var(--spacing-8)',
                    padding: 'var(--spacing-6)',
                    background: 'var(--vscode-textBlockQuote-background)',
                    border: '1px solid var(--vscode-textBlockQuote-border)',
                    borderRadius: 'var(--border-radius-md)',
                }}
            >
                <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-3)' }}>Features & Behavior</h3>
                <ul style={{ marginBottom: 'var(--spacing-4)', paddingLeft: 'var(--spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Portal Rendering:</strong> Modal renders to <code>document.body</code> using React portals, ensuring proper z-index stacking
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Focus Management:</strong> Automatically focuses modal on open and restores focus to the previously active element on close
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Scroll Locking:</strong> Prevents body scroll when modal is open to avoid background scrolling
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Keyboard Support:</strong> Press <code>ESC</code> to close (configurable with <code>closeOnEscape</code>)
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Backdrop Click:</strong> Click outside modal to close (configurable with <code>closeOnBackdropClick</code>)
                    </li>
                    <li>
                        <strong>Composable Structure:</strong> Use <code>ModalHeader</code>, <code>ModalBody</code>, and <code>ModalFooter</code> for consistent layout
                    </li>
                </ul>

                <h3 style={{ marginTop: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>Accessibility</h3>
                <ul style={{ marginBottom: 0, paddingLeft: 'var(--spacing-5)' }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>ARIA Attributes:</strong> Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for screen readers
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Focus Trap:</strong> Modal automatically receives focus when opened
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong>Focus Restoration:</strong> Returns focus to trigger element when closed
                    </li>
                    <li>
                        <strong>Close Button Label:</strong> Close button includes <code>aria-label="Close modal"</code>
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
}
