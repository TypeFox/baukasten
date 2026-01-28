import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, type ModalProps } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Heading, Paragraph, Text } from '../Typography';
import { FieldLabel } from '../FieldLabel';
import { FormHelper } from '../FormHelper';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { Select, type SelectOption } from '../Select';
import { Dropdown } from '../Dropdown';
import { Menu, MenuItem } from '../Menu';
import { ContextMenu } from '../ContextMenu';
import { Icon } from '../Icon';

/**
 * Modal component displays content in an overlay dialog with backdrop.
 * Supports multiple sizes, fullscreen mode, backdrop variants, and composable structure.
 *
 * ## Features
 * - **Sizes**: xs, sm, md, lg, xl, fullscreen
 * - **Backdrop Variants**: solid, blur, transparent
 * - **Keyboard Navigation**: ESC to close (configurable)
 * - **Backdrop Click**: Click outside to close (configurable)
 * - **Focus Management**: Traps focus and restores on close
 * - **Scroll Locking**: Prevents body scroll when open
 * - **Portal Rendering**: Renders to document.body
 * - **Composable**: ModalHeader, ModalBody, ModalFooter
 *
 * ## Accessibility
 * - Uses role="dialog" and aria-modal="true"
 * - Focus management with restoration
 * - Keyboard navigation support
 * - ARIA labels for close buttons
 *
 * ## Usage Guidelines
 * - Use for important actions that require user attention
 * - Keep modal content focused and concise
 * - Always provide a clear way to close (X button or action)
 * - Use appropriate size for content
 * - Consider fullscreen for media previews or complex forms
 */
const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'A flexible modal dialog component with support for different sizes, backdrop variants, and composable structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Size of the modal',
      table: {
        type: { summary: 'xs | sm | md | lg | xl | fullscreen' },
        defaultValue: { summary: 'md' },
      },
    },
    backdropVariant: {
      control: 'select',
      options: ['solid', 'blur', 'transparent'],
      description: 'Visual style of the backdrop',
      table: {
        type: { summary: 'solid | blur | transparent' },
        defaultValue: { summary: 'solid' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape closes the modal',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      action: 'close',
      description: 'Callback when the modal should close',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      description: 'Modal content (use ModalHeader, ModalBody, ModalFooter)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Type for stories with custom render functions that don't use args
type CustomRenderStory = Omit<Story, 'args'> & { render: () => React.JSX.Element };

/**
 * Interactive playground for the Modal component.
 * Try different sizes, backdrop variants, and interaction options.
 */
const InteractiveComponent = (args: Partial<ModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
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
    </div>
  );
};

export const Interactive: Story = {
  args: {
    size: 'md',
    backdropVariant: 'solid',
    closeOnBackdropClick: true,
    closeOnEscape: true,
  } as Story['args'],
  render: (args: Partial<ModalProps>) => <InteractiveComponent {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with all modal props. Experiment with different sizes, backdrop styles, and interaction behaviors.',
      },
    },
  },
};

/**
 * Modal sizes comparison from xs to xl.
 * Choose the appropriate size based on your content.
 */
const SizesComponent = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem', flexWrap: 'wrap' }}>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Button onClick={() => setOpenModal(size)}>
            {size.toUpperCase()} Modal
          </Button>
          <Modal
            open={openModal === size}
            onClose={() => setOpenModal(null)}
            size={size}
          >
            <ModalHeader onClose={() => setOpenModal(null)}>
              {size.toUpperCase()} Modal
            </ModalHeader>
            <ModalBody>
              <Paragraph>This is a {size} sized modal.</Paragraph>
              <Paragraph>Modal sizes help you choose the right dimensions for your content.</Paragraph>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpenModal(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
      ))}
    </div>
  );
};

export const Sizes: CustomRenderStory = {
  render: () => <SizesComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Available modal sizes: xs (400px), sm (500px), md (600px), lg (800px), xl (1000px). Each size is responsive with 90% width on smaller screens.',
      },
    },
  },
};

/**
 * Fullscreen modal covers the entire viewport.
 * Useful for previews, media viewers, or complex forms.
 */
const FullscreenComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Fullscreen Modal</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size="fullscreen"
      >
        <ModalHeader onClose={() => setIsOpen(false)}>
          Fullscreen Preview
        </ModalHeader>
        <ModalBody>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: '1rem'
          }}>
            <Heading level={2}>Fullscreen Modal</Heading>
            <Paragraph>This modal covers the entire viewport.</Paragraph>
            <Paragraph>Perfect for media previews, image galleries, or complex forms.</Paragraph>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export const Fullscreen: CustomRenderStory = {
  render: () => <FullscreenComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Fullscreen modal takes up 100% of the viewport with no border radius. Ideal for immersive experiences.',
      },
    },
  },
};

/**
 * Different backdrop visual styles.
 * Choose based on your design needs and content behind the modal.
 */
const BackdropVariantsComponent = () => {
  const [variant, setVariant] = useState<'solid' | 'blur' | 'transparent' | null>(null);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={() => setVariant('solid')}>Solid Backdrop</Button>
        <Button onClick={() => setVariant('blur')}>Blur Backdrop</Button>
        <Button onClick={() => setVariant('transparent')}>Transparent Backdrop</Button>
      </div>

      <Modal
        open={variant !== null}
        onClose={() => setVariant(null)}
        backdropVariant={variant || 'solid'}
        size="sm"
      >
        <ModalHeader onClose={() => setVariant(null)}>
          {variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : ''} Backdrop
        </ModalHeader>
        <ModalBody>
          <Paragraph>This modal uses the <Text weight="bold">{variant || 'solid'}</Text> backdrop variant.</Paragraph>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><Text weight="bold">Solid</Text>: Dark semi-transparent background</li>
            <li><Text weight="bold">Blur</Text>: Blurred background with backdrop-filter</li>
            <li><Text weight="bold">Transparent</Text>: No visible backdrop (clicks still work)</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setVariant(null)}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* Background content to see backdrop effect */}
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--bk-color-border)' }}>
        <Heading level={3}>Background Content</Heading>
        <Paragraph>Open the modals above to see how different backdrop styles affect this content.</Paragraph>
        <Paragraph>The blur backdrop will make this text appear blurred.</Paragraph>
      </div>
    </div>
  );
};

export const BackdropVariants: CustomRenderStory = {
  render: () => <BackdropVariantsComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Three backdrop variants: solid (default dark overlay), blur (backdrop-filter blur effect), and transparent (no visible backdrop but still interactive).',
      },
    },
  },
};

/**
 * Modal with a form for user input.
 * Demonstrates real-world usage with form controls including validation.
 */
const WithFormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    role: '',
    bio: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsOpen(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        username: '',
        role: '',
        bio: '',
      });
      setErrors({});
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setErrors({});
  };

  const roleOptions = [
    { value: 'developer', label: 'Developer', description: 'Software development and coding' },
    { value: 'designer', label: 'Designer', description: 'UI/UX and visual design' },
    { value: 'manager', label: 'Project Manager', description: 'Team and project coordination' },
    { value: 'qa', label: 'QA Engineer', description: 'Quality assurance and testing' },
    { value: 'devops', label: 'DevOps', description: 'Infrastructure and deployment' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Add Team Member</Button>
      <Modal open={isOpen} onClose={handleCancel} size="lg">
        <ModalHeader onClose={handleCancel}>
          Add New Team Member
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Personal Information Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Personal Information
              </Heading>

              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="name" required>Full Name</FieldLabel>
                <div>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={!!errors.name}
                    fullWidth
                  />
                  {errors.name && <FormHelper variant="error">{errors.name}</FormHelper>}
                </div>
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup orientation="vertical">
                  <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={!!errors.email}
                      fullWidth
                    />
                    {errors.email && <FormHelper variant="error">{errors.email}</FormHelper>}
                  </div>
                </FormGroup>

                <FormGroup orientation="vertical">
                  <FieldLabel htmlFor="username" required>Username</FieldLabel>
                  <div>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      error={!!errors.username}
                      fullWidth
                    />
                    {errors.username && <FormHelper variant="error">{errors.username}</FormHelper>}
                  </div>
                </FormGroup>
              </div>
            </div>

            {/* Role Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Role & Permissions
              </Heading>

              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="role" required>Role</FieldLabel>
                <div>
                  <Input
                    id="role"
                    placeholder="Select a role..."
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    error={!!errors.role}
                    fullWidth
                    list="roles-list"
                  />
                  <datalist id="roles-list">
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </datalist>
                  {errors.role && <FormHelper variant="error">{errors.role}</FormHelper>}
                  {formData.role && !errors.role && (
                    <FormHelper>
                      {roleOptions.find(r => r.value === formData.role)?.description}
                    </FormHelper>
                  )}
                </div>
              </FormGroup>
            </div>

            {/* Bio Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Additional Details
              </Heading>

              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <div>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: 'var(--bk-padding-md)',
                      backgroundColor: 'var(--bk-color-input-background)',
                      color: 'var(--bk-color-input-foreground)',
                      border: '1px solid var(--bk-color-input-border)',
                      borderRadius: 'var(--bk-radius-sm)',
                      fontFamily: 'inherit',
                      fontSize: 'var(--bk-font-size-md)',
                      resize: 'vertical',
                    }}
                  />
                  <FormHelper>{formData.bio.length}/500 characters</FormHelper>
                </div>
              </FormGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Member
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const WithForm: CustomRenderStory = {
  render: () => <WithFormComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive form modal with validation, multiple fields, sections, and helper text. Demonstrates real-world form patterns.',
      },
    },
  },
};

/**
 * Simple confirmation dialog for destructive actions.
 * Use for actions that cannot be undone.
 */
const ConfirmationDialogComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
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
    </div>
  );
};

export const ConfirmationDialog: CustomRenderStory = {
  render: () => <ConfirmationDialogComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for destructive actions. Small size works well for simple confirmations.',
      },
    },
  },
};

/**
 * Modal without header close button.
 * Forces user to make an explicit choice via footer buttons.
 */
const WithoutCloseButtonComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnBackdropClick={false}
        closeOnEscape={false}
      >
        <ModalHeader showCloseButton={false}>
          Action Required
        </ModalHeader>
        <ModalBody>
          <Paragraph>This modal requires you to make a choice.</Paragraph>
          <Paragraph>You cannot close it by clicking outside or pressing ESC.</Paragraph>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Decline
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const WithoutCloseButton: CustomRenderStory = {
  render: () => <WithoutCloseButtonComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Modal without close button, backdrop click, or ESC key. Use when user must make an explicit choice.',
      },
    },
  },
};

/**
 * Modal with only body content.
 * Simplest form without header or footer.
 */
const BodyOnlyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Simple Modal</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
        <ModalBody>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Heading level={3} marginBottom={false}>Simple Message</Heading>
            <Paragraph>This modal only has a body section.</Paragraph>
            <div style={{ marginTop: '1.5rem' }}>
              <Button onClick={() => setIsOpen(false)}>Got it</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export const BodyOnly: CustomRenderStory = {
  render: () => <BodyOnlyComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Minimal modal with only body content. No header or footer.',
      },
    },
  },
};

/**
 * Modal with scrollable content.
 * Body section automatically handles overflow.
 */
const ScrollableContentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalHeader onClose={() => setIsOpen(false)}>
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
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Decline
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const ScrollableContent: CustomRenderStory = {
  render: () => <ScrollableContentComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Modal with long content. The body section scrolls automatically while header and footer remain fixed.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all modal features and variants.
 * Displays all sizes, backdrop options, and usage patterns.
 */
const ShowcaseComponent = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div style={{
      padding: '3rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <Heading level={1} marginBottom>Modal Component Showcase</Heading>

      {/* Sizes Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Sizes</Heading>
        <Paragraph color="muted">
          Available sizes: xs (400px), sm (500px), md (600px), lg (800px), xl (1000px), fullscreen
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'].map((size) => (
            <Button key={size} size="sm" onClick={() => setActiveDemo(size)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* Backdrop Variants Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Backdrop Variants</Heading>
        <Paragraph color="muted">
          Solid (dark overlay), Blur (backdrop-filter), Transparent (no visual)
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => setActiveDemo('solid')}>Solid</Button>
          <Button size="sm" onClick={() => setActiveDemo('blur')}>Blur</Button>
          <Button size="sm" onClick={() => setActiveDemo('transparent')}>Transparent</Button>
        </div>
      </section>

      {/* Usage Patterns Section */}
      <section style={{ marginBottom: '3rem' }}>
        <Heading level={2}>Usage Patterns</Heading>
        <Paragraph color="muted">
          Common modal patterns for different use cases
        </Paragraph>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => setActiveDemo('form')}>Form</Button>
          <Button size="sm" onClick={() => setActiveDemo('confirm')}>Confirmation</Button>
          <Button size="sm" onClick={() => setActiveDemo('scroll')}>Scrollable</Button>
          <Button size="sm" onClick={() => setActiveDemo('simple')}>Simple</Button>
        </div>
      </section>

      {/* Modals */}
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Modal
          key={size}
          open={activeDemo === size}
          onClose={() => setActiveDemo(null)}
          size={size}
        >
          <ModalHeader onClose={() => setActiveDemo(null)}>
            {size.toUpperCase()} Modal
          </ModalHeader>
          <ModalBody>
            <Paragraph>This is a {size} sized modal ({size === 'xs' ? '400px' : size === 'sm' ? '500px' : size === 'md' ? '600px' : size === 'lg' ? '800px' : '1000px'} max-width).</Paragraph>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </ModalFooter>
        </Modal>
      ))}

      <Modal
        open={activeDemo === 'fullscreen'}
        onClose={() => setActiveDemo(null)}
        size="fullscreen"
      >
        <ModalHeader onClose={() => setActiveDemo(null)}>
          Fullscreen Modal
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Heading level={2}>Fullscreen Modal</Heading>
              <Paragraph>Takes up the entire viewport</Paragraph>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {(['solid', 'blur', 'transparent'] as const).map((variant) => (
        <Modal
          key={variant}
          open={activeDemo === variant}
          onClose={() => setActiveDemo(null)}
          backdropVariant={variant}
        >
          <ModalHeader onClose={() => setActiveDemo(null)}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Backdrop
          </ModalHeader>
          <ModalBody>
            <Paragraph>This modal uses the <Text weight="bold">{variant}</Text> backdrop variant.</Paragraph>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </ModalFooter>
        </Modal>
      ))}

      <Modal
        open={activeDemo === 'form'}
        onClose={() => setActiveDemo(null)}
      >
        <ModalHeader onClose={() => setActiveDemo(null)}>
          Form Example
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Label htmlFor="demo-name">Name</Label>
              <Input id="demo-name" placeholder="Enter name" fullWidth />
            </div>
            <div>
              <Label htmlFor="demo-email">Email</Label>
              <Input id="demo-email" type="email" placeholder="Enter email" fullWidth />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setActiveDemo(null)}>Cancel</Button>
          <Button variant="primary" onClick={() => setActiveDemo(null)}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal
        open={activeDemo === 'confirm'}
        onClose={() => setActiveDemo(null)}
        size="sm"
      >
        <ModalHeader onClose={() => setActiveDemo(null)}>
          Confirm Action
        </ModalHeader>
        <ModalBody>
          <Paragraph>Are you sure you want to proceed?</Paragraph>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setActiveDemo(null)}>Cancel</Button>
          <Button variant="primary" onClick={() => setActiveDemo(null)}>Confirm</Button>
        </ModalFooter>
      </Modal>

      <Modal
        open={activeDemo === 'scroll'}
        onClose={() => setActiveDemo(null)}
      >
        <ModalHeader onClose={() => setActiveDemo(null)}>
          Scrollable Content
        </ModalHeader>
        <ModalBody>
          {Array.from({ length: 20 }, (_, i) => (
            <Paragraph key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet.</Paragraph>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setActiveDemo(null)}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal
        open={activeDemo === 'simple'}
        onClose={() => setActiveDemo(null)}
        size="sm"
      >
        <ModalBody>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Heading level={3} marginBottom={false}>Simple Modal</Heading>
            <Paragraph>Body only, no header or footer</Paragraph>
            <Button onClick={() => setActiveDemo(null)}>Close</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export const Showcase: CustomRenderStory = {
  render: () => <ShowcaseComponent />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all modal features: sizes, backdrop variants, and common usage patterns.',
      },
    },
  },
};

/**
 * Modal with Select dropdown component.
 * Demonstrates that Select dropdowns properly appear above the modal.
 */
const WithSelectComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();

  const countryOptions: SelectOption<string>[] = [
    { value: 'us', label: 'United States', description: 'North America' },
    { value: 'uk', label: 'United Kingdom', description: 'Europe' },
    { value: 'ca', label: 'Canada', description: 'North America' },
    { value: 'au', label: 'Australia', description: 'Oceania' },
    { value: 'de', label: 'Germany', description: 'Europe' },
    { value: 'fr', label: 'France', description: 'Europe' },
    { value: 'jp', label: 'Japan', description: 'Asia' },
    { value: 'cn', label: 'China', description: 'Asia' },
    { value: 'in', label: 'India', description: 'Asia' },
    { value: 'br', label: 'Brazil', description: 'South America' },
  ];

  const roleOptions: SelectOption<string>[] = [
    { value: 'admin', label: 'Administrator', description: 'Full system access' },
    { value: 'editor', label: 'Editor', description: 'Can edit content' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
    { value: 'contributor', label: 'Contributor', description: 'Can create and edit own content' },
  ];

  const languageOptions: SelectOption<string>[] = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Selects</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalHeader onClose={() => setIsOpen(false)}>
          User Preferences
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <FormGroup orientation="vertical">
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <div>
                <Select
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  placeholder="Select your country..."
                  searchable
                  searchPlaceholder="Search countries..."
                  fullWidth
                />
                <FormHelper>Choose your country of residence</FormHelper>
              </div>
            </FormGroup>

            <FormGroup orientation="vertical">
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <div>
                <Select
                  options={roleOptions}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  placeholder="Select a role..."
                  fullWidth
                />
                <FormHelper>Select your permission level</FormHelper>
              </div>
            </FormGroup>

            <FormGroup orientation="vertical">
              <FieldLabel htmlFor="language">Preferred Language</FieldLabel>
              <div>
                <Select
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  placeholder="Select language..."
                  searchable
                  fullWidth
                />
                <FormHelper>Choose your preferred interface language</FormHelper>
              </div>
            </FormGroup>

            <div style={{
              padding: 'var(--bk-padding-md)',
              backgroundColor: 'var(--bk-color-background-elevated)',
              borderRadius: 'var(--bk-radius-sm)',
              border: '1px solid var(--bk-color-border)',
            }}>
              <Paragraph style={{ marginBottom: '0.5rem' }}>
                <Text weight="semibold">Selected Values:</Text>
              </Paragraph>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Country: {selectedCountry || 'None'}</li>
                <li>Role: {selectedRole || 'None'}</li>
                <li>Language: {selectedLanguage || 'None'}</li>
              </ul>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Save Preferences
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const WithSelect: CustomRenderStory = {
  render: () => <WithSelectComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Modal containing Select dropdowns. The dropdown menus properly appear above the modal with appropriate z-index layering.',
      },
    },
  },
};

/**
 * Modal with all popup components (Select, Dropdown, ContextMenu).
 * Verifies proper z-index layering for all interactive popups.
 */
const WithAllPopupsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const selectOptions: SelectOption<string>[] = [
    { value: 'option1', label: 'Option 1', description: 'First option' },
    { value: 'option2', label: 'Option 2', description: 'Second option' },
    { value: 'option3', label: 'Option 3', description: 'Third option' },
    { value: 'option4', label: 'Option 4', description: 'Fourth option' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal with All Popups</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalHeader onClose={() => setIsOpen(false)}>
          Interactive Components Test
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Select Component Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Select Component
              </Heading>
              <FormGroup orientation="vertical">
                <FieldLabel htmlFor="select-test">Choose an option</FieldLabel>
                <div>
                  <Select
                    options={selectOptions}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    placeholder="Select an option..."
                    searchable
                    fullWidth
                  />
                  <FormHelper>Select dropdown should appear above the modal</FormHelper>
                </div>
              </FormGroup>
            </div>

            {/* Dropdown Component Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Dropdown Component
              </Heading>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Dropdown trigger={<Button variant="primary">Actions Menu</Button>}>
                  <Menu>
                    <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
                    <MenuItem icon={<Icon name="copy" />}>Duplicate</MenuItem>
                    <MenuItem icon={<Icon name="archive" />}>Archive</MenuItem>
                    <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
                  </Menu>
                </Dropdown>

                <Dropdown trigger={<Button variant="secondary">Options</Button>}>
                  <Menu>
                    <MenuItem icon={<Icon name="settings" />}>Settings</MenuItem>
                    <MenuItem icon={<Icon name="bell" />}>Notifications</MenuItem>
                    <MenuItem icon={<Icon name="shield" />}>Security</MenuItem>
                  </Menu>
                </Dropdown>

                <Dropdown
                  trigger={
                    <Button variant="ghost" circular>
                      <Icon name="ellipsis" />
                    </Button>
                  }
                  placement="bottom-end"
                >
                  <Menu size="sm">
                    <MenuItem>Quick Action 1</MenuItem>
                    <MenuItem>Quick Action 2</MenuItem>
                    <MenuItem>Quick Action 3</MenuItem>
                  </Menu>
                </Dropdown>
              </div>
              <FormHelper style={{ marginTop: '0.5rem' }}>
                Dropdown menus should appear above the modal
              </FormHelper>
            </div>

            {/* Context Menu Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Context Menu Component
              </Heading>
              <ContextMenu
                menu={
                  <>
                    <MenuItem icon={<Icon name="edit" />}>Edit Item</MenuItem>
                    <MenuItem icon={<Icon name="copy" />}>Copy Item</MenuItem>
                    <MenuItem icon={<Icon name="link" />}>Copy Link</MenuItem>
                    <MenuItem icon={<Icon name="trash" />}>Delete Item</MenuItem>
                  </>
                }
              >
                <div
                  style={{
                    padding: 'var(--bk-padding-lg)',
                    backgroundColor: 'var(--bk-color-background-elevated)',
                    borderRadius: 'var(--bk-radius-md)',
                    border: '1px solid var(--bk-color-border)',
                    textAlign: 'center',
                    cursor: 'context-menu',
                  }}
                >
                  <Paragraph>
                    <Text weight="semibold">Right-click here</Text>
                  </Paragraph>
                  <Paragraph color="muted" style={{ fontSize: 'var(--bk-font-size-sm)' }}>
                    Context menu should appear above the modal
                  </Paragraph>
                </div>
              </ContextMenu>
            </div>

            {/* Nested Dropdowns Section */}
            <div>
              <Heading level={3} marginBottom={false} style={{ marginBottom: '0.75rem' }}>
                Mixed Components
              </Heading>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup orientation="vertical">
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'completed', label: 'Completed' },
                    ]}
                    placeholder="Select status..."
                    fullWidth
                  />
                </FormGroup>

                <FormGroup orientation="vertical">
                  <FieldLabel>Priority</FieldLabel>
                  <Dropdown
                    trigger={
                      <Button variant="secondary" width="block">
                        Set Priority
                      </Button>
                    }
                  >
                    <Menu>
                      <MenuItem>🔴 High</MenuItem>
                      <MenuItem>🟡 Medium</MenuItem>
                      <MenuItem>🟢 Low</MenuItem>
                    </Menu>
                  </Dropdown>
                </FormGroup>
              </div>
            </div>

            {/* Info Box */}
            <div
              style={{
                padding: 'var(--bk-padding-md)',
                backgroundColor: 'var(--bk-color-background-elevated)',
                borderRadius: 'var(--bk-radius-sm)',
                border: '1px solid var(--bk-color-border)',
              }}
            >
              <Text weight="semibold" style={{ display: 'block', marginBottom: '0.5rem' }}>
                ✅ Z-Index Layering Test
              </Text>
              <Paragraph style={{ fontSize: 'var(--bk-font-size-sm)', margin: 0 }}>
                All popup components (Select, Dropdown, ContextMenu) should appear above the modal.
                This verifies that the z-index hierarchy is working correctly.
              </Paragraph>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const WithAllPopups: CustomRenderStory = {
  render: () => <WithAllPopupsComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive test of all popup components (Select, Dropdown, ContextMenu) inside a modal. Verifies proper z-index layering and functionality.',
      },
    },
  },
};
