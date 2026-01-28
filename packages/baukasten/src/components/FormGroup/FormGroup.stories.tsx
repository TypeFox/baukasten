import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormGroup } from './FormGroup';
import { FieldLabel } from '../FieldLabel';
import { FormHelper } from '../FormHelper';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Radio, RadioGroup } from '../Radio';
import { Label } from '../Label';
import { Button } from '../Button';
import { Heading, Paragraph } from '../Typography';

/**
 * FormGroup component provides a VSCode-style two-column layout for forms
 * where labels appear on the left and inputs on the right. Works seamlessly
 * with FieldLabel and FormHelper components.
 *
 * ## Components Overview
 * - **FormGroup**: Container with two-column or stacked layout
 * - **FieldLabel**: Semantic label for form fields
 * - **FormHelper**: Helper text, hints, or validation messages
 *
 * ## Features
 * - VSCode-style horizontal layout (label left, input right)
 * - Traditional vertical stacked layout
 * - Responsive design (stacks on mobile)
 * - Consistent alignment across multiple fields
 * - Support for helper text and validation
 * - Compact spacing variant
 */
const meta = {
  title: 'Components/FormGroup',
  component: FormGroup,
  parameters: {
    docs: {
      description: {
        component: 'A flexible form field container supporting VSCode-style horizontal layout and traditional vertical layout. Use with FieldLabel and FormHelper for complete form fields.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use compact spacing',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labelWidth: {
      control: 'text',
      description: 'Custom label width (horizontal orientation only)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '30%' },
      },
    },
    children: {
      control: false,
      description: 'Form group content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground for FormGroup component.
 * Try different orientations, spacing, and label widths.
 */
export const Interactive: Story = {
  args: {
    orientation: 'horizontal',
    compact: false,
    labelWidth: '30%',
    children: null,
  },
  render: (args) => (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <FormGroup {...args}>
        <FieldLabel htmlFor="interactive-input" required>
          Field Label
        </FieldLabel>
        <div>
          <Input id="interactive-input" placeholder="Enter value..." fullWidth />
          <FormHelper>This is helper text below the input</FormHelper>
        </div>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with FormGroup props.',
      },
    },
  },
};

/**
 * VSCode-style horizontal layout with labels on the left.
 * This is the signature VSCode settings page pattern.
 */
export const VSCodeStyleForm: Story = {
  args: {
    children: null,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      role: '',
      notifications: false,
    });

    return (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <Heading level={2}>User Settings</Heading>
        <Paragraph color="muted">Configure your account preferences</Paragraph>

        <form style={{ marginTop: '2rem' }}>
          <FormGroup>
            <FieldLabel htmlFor="username" required>
              Username
            </FieldLabel>
            <div>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="johndoe"
                fullWidth
              />
              <FormHelper>Choose a unique username with 3-20 characters</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="email" required>
              Email Address
            </FieldLabel>
            <div>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
                fullWidth
              />
              <FormHelper>We'll use this for account notifications</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <div>
              <Select
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                options={[
                  { value: 'developer', label: 'Developer', description: 'Write and maintain code' },
                  { value: 'designer', label: 'Designer', description: 'Create visual designs' },
                  { value: 'manager', label: 'Manager', description: 'Lead teams and projects' },
                ]}
                placeholder="Select your role..."
                fullWidth
              />
              <FormHelper>Your primary role in the organization</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel>Notifications</FieldLabel>
            <div style={{ paddingTop: 'var(--bk-spacing-1)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                <Checkbox
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                />
                <span style={{ fontSize: 'var(--bk-font-size-sm)' }}>
                  Enable email notifications
                </span>
              </label>
              <FormHelper>Receive updates about your account activity</FormHelper>
            </div>
          </FormGroup>

          <div style={{ marginTop: 'var(--bk-spacing-6)', display: 'flex', gap: 'var(--bk-spacing-2)' }}>
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form using VSCode-style horizontal layout. Labels are aligned on the left with consistent spacing.',
      },
    },
  },
};

/**
 * Form with validation errors and helper text variants.
 */
export const WithValidation: Story = {
  args: {
    children: null,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors] = useState({
      username: 'Username is already taken',
      email: '',
      password: '',
    });

    return (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <Heading level={2}>Sign Up</Heading>

        <form style={{ marginTop: '2rem' }}>
          <FormGroup>
            <FieldLabel htmlFor="val-username" required>
              Username
            </FieldLabel>
            <div>
              <Input
                id="val-username"
                error={!!errors.username}
                placeholder="johndoe"
                fullWidth
              />
              {errors.username && (
                <FormHelper variant="error">{errors.username}</FormHelper>
              )}
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="val-email" required>
              Email
            </FieldLabel>
            <div>
              <Input
                id="val-email"
                type="email"
                placeholder="john@example.com"
                fullWidth
              />
              <FormHelper variant="success">Email is available!</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="val-password" required>
              Password
            </FieldLabel>
            <div>
              <Input
                id="val-password"
                type="password"
                placeholder="••••••••"
                fullWidth
              />
              <FormHelper variant="warning">Password strength: weak</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="val-confirm" required>
              Confirm Password
            </FieldLabel>
            <div>
              <Input
                id="val-confirm"
                type="password"
                placeholder="••••••••"
                fullWidth
              />
              <FormHelper variant="info">Passwords must match</FormHelper>
            </div>
          </FormGroup>

          <div style={{ marginTop: 'var(--bk-spacing-6)' }}>
            <Button variant="primary">Create Account</Button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with validation states. FormHelper supports error, warning, success, and info variants.',
      },
    },
  },
};

/**
 * Traditional vertical stacked layout.
 */
export const VerticalLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <Heading level={2}>Contact Form</Heading>

      <form style={{ marginTop: '2rem' }}>
        <FormGroup orientation="vertical">
          <FieldLabel htmlFor="vert-name" required>
            Full Name
          </FieldLabel>
          <div>
            <Input id="vert-name" placeholder="John Doe" fullWidth />
            <FormHelper>Enter your first and last name</FormHelper>
          </div>
        </FormGroup>

        <FormGroup orientation="vertical">
          <FieldLabel htmlFor="vert-email" required>
            Email Address
          </FieldLabel>
          <div>
            <Input id="vert-email" type="email" placeholder="john@example.com" fullWidth />
            <FormHelper>We'll never share your email with anyone</FormHelper>
          </div>
        </FormGroup>

        <FormGroup orientation="vertical">
          <FieldLabel htmlFor="vert-message" required>
            Message
          </FieldLabel>
          <div>
            <TextArea
              id="vert-message"
              rows={6}
              placeholder="How can we help you?"
              fullWidth
            />
            <FormHelper>Minimum 10 characters</FormHelper>
          </div>
        </FormGroup>

        <Button variant="primary">Send Message</Button>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical stacked layout where labels appear above inputs. Traditional form pattern.',
      },
    },
  },
};

/**
 * Compact spacing variant for dense forms.
 */
export const CompactSpacing: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <Heading level={2}>Compact Form</Heading>

      <form style={{ marginTop: '2rem' }}>
        <FormGroup compact>
          <FieldLabel htmlFor="compact-1">Field 1</FieldLabel>
          <Input id="compact-1" placeholder="Value 1" fullWidth />
        </FormGroup>

        <FormGroup compact>
          <FieldLabel htmlFor="compact-2">Field 2</FieldLabel>
          <Input id="compact-2" placeholder="Value 2" fullWidth />
        </FormGroup>

        <FormGroup compact>
          <FieldLabel htmlFor="compact-3">Field 3</FieldLabel>
          <Input id="compact-3" placeholder="Value 3" fullWidth />
        </FormGroup>

        <FormGroup compact>
          <FieldLabel htmlFor="compact-4">Field 4</FieldLabel>
          <Input id="compact-4" placeholder="Value 4" fullWidth />
        </FormGroup>

        <Button variant="primary">Submit</Button>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact spacing reduces vertical space between form groups for denser layouts.',
      },
    },
  },
};

/**
 * Form with RadioGroup for single-choice selections.
 */
export const WithRadioGroup: Story = {
  args: {
    children: null,
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState({
      theme: 'light',
      deliveryMethod: 'standard',
      paymentMethod: 'credit',
    });

    return (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <Heading level={2}>Preferences</Heading>
        <Paragraph color="muted">Configure your preferences using radio groups</Paragraph>

        <form style={{ marginTop: '2rem' }}>
          <FormGroup>
            <FieldLabel>Theme Preference</FieldLabel>
            <div style={{ marginTop: 'var(--bk-spacing-1)' }}>
              <RadioGroup
                name="theme"
                value={formData.theme}
                onChange={(value) => setFormData({ ...formData, theme: value as string })}
              >
                <Label variant="checkbox" size="md">
                  <Radio value="light" />
                  <span>Light theme</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="dark" />
                  <span>Dark theme</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="auto" />
                  <span>Auto (system)</span>
                </Label>
              </RadioGroup>
              <FormHelper>Choose your preferred color theme</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel required>Delivery Method</FieldLabel>
            <div style={{ marginTop: 'var(--bk-spacing-1)' }}>
              <RadioGroup
                name="delivery"
                value={formData.deliveryMethod}
                onChange={(value) => setFormData({ ...formData, deliveryMethod: value as string })}
              >
                <Label variant="checkbox" size="md">
                  <Radio value="standard" />
                  <span>Standard Delivery (5-7 days) - Free</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="express" />
                  <span>Express Delivery (2-3 days) - $10</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="overnight" />
                  <span>Overnight Delivery - $25</span>
                </Label>
              </RadioGroup>
              <FormHelper>Select your preferred delivery speed</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel required>Payment Method</FieldLabel>
            <div>
              <RadioGroup
                name="payment"
                value={formData.paymentMethod}
                onChange={(value) => setFormData({ ...formData, paymentMethod: value as string })}
              >
                <Label variant="checkbox" size="md">
                  <Radio value="credit" />
                  <span>Credit Card</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="paypal" />
                  <span>PayPal</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="bank" />
                  <span>Bank Transfer</span>
                </Label>
              </RadioGroup>
              <FormHelper variant="info">All payment methods are secure</FormHelper>
            </div>
          </FormGroup>

          <div style={{ marginTop: 'var(--bk-spacing-6)', display: 'flex', gap: 'var(--bk-spacing-2)' }}>
            <Button variant="primary">Save Preferences</Button>
            <Button variant="secondary">Reset</Button>
          </div>

          <div style={{
            marginTop: 'var(--bk-spacing-6)',
            padding: 'var(--bk-spacing-3)',
            backgroundColor: 'var(--bk-color-background-elevated)',
            borderRadius: 'var(--bk-radius-md)',
            fontSize: 'var(--bk-font-size-sm)',
          }}>
            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontWeight: 'var(--bk-font-weight-semibold)' }}>
              Current Selection:
            </div>
            <pre style={{ margin: 0, fontSize: 'var(--bk-font-size-xs)' }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'RadioGroup works seamlessly with FormGroup for single-choice selections. Use FieldLabel and FormHelper to provide context and guidance.',
      },
    },
  },
};

/**
 * Custom label width for longer labels.
 */
export const CustomLabelWidth: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <Heading level={2}>Configuration</Heading>

      <form style={{ marginTop: '2rem' }}>
        <FormGroup labelWidth="40%">
          <FieldLabel htmlFor="long-1">Very Long Label Name</FieldLabel>
          <Input id="long-1" placeholder="Value" fullWidth />
        </FormGroup>

        <FormGroup labelWidth="40%">
          <FieldLabel htmlFor="long-2">Another Long Label with Many Words</FieldLabel>
          <Input id="long-2" placeholder="Value" fullWidth />
        </FormGroup>

        <FormGroup labelWidth="40%">
          <FieldLabel htmlFor="long-3">Short</FieldLabel>
          <Input id="long-3" placeholder="Value" fullWidth />
        </FormGroup>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Increase label width when you have longer label text. Default is 30%.',
      },
    },
  },
};

/**
 * Comprehensive showcase of all form features.
 */
export const Showcase: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Heading level={1}>Form Components Showcase</Heading>
      <Paragraph color="muted">
        Complete form system with FieldLabel, FormHelper, and FormGroup components
      </Paragraph>

      {/* VSCode Horizontal Layout */}
      <section style={{ marginTop: '3rem' }}>
        <Heading level={2}>VSCode Horizontal Layout</Heading>
        <Paragraph color="muted">Labels on left, inputs on right (responsive)</Paragraph>

        <form style={{ marginTop: '1.5rem' }}>
          <FormGroup>
            <FieldLabel htmlFor="showcase-1" required>Name</FieldLabel>
            <Input id="showcase-1" placeholder="John Doe" fullWidth />
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-2" required>Email</FieldLabel>
            <div>
              <Input id="showcase-2" type="email" placeholder="john@example.com" fullWidth />
              <FormHelper>We'll never share your email</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-3">Department</FieldLabel>
            <div>
              <Input id="showcase-3" placeholder="Engineering" fullWidth />
              <FormHelper variant="info">Optional field</FormHelper>
            </div>
          </FormGroup>
        </form>
      </section>

      {/* Vertical Layout */}
      <section style={{ marginTop: '3rem' }}>
        <Heading level={2}>Vertical Stacked Layout</Heading>
        <Paragraph color="muted">Traditional top-to-bottom form layout</Paragraph>

        <form style={{ marginTop: '1.5rem', maxWidth: '600px' }}>
          <FormGroup orientation="vertical">
            <FieldLabel htmlFor="showcase-v1" required>Subject</FieldLabel>
            <Input id="showcase-v1" placeholder="Enter subject" fullWidth />
          </FormGroup>

          <FormGroup orientation="vertical">
            <FieldLabel htmlFor="showcase-v2" required>Message</FieldLabel>
            <div>
              <TextArea
                id="showcase-v2"
                rows={4}
                placeholder="Your message..."
                fullWidth
              />
              <FormHelper>Minimum 10 characters required</FormHelper>
            </div>
          </FormGroup>
        </form>
      </section>

      {/* Radio Groups */}
      <section style={{ marginTop: '3rem' }}>
        <Heading level={2}>Radio Groups</Heading>
        <Paragraph color="muted">Single-choice selections with RadioGroup</Paragraph>

        <form style={{ marginTop: '1.5rem' }}>
          <FormGroup>
            <FieldLabel>Notification Frequency</FieldLabel>
            <div style={{ marginTop: 'var(--bk-spacing-1)' }}>
              <RadioGroup name="showcase-freq" defaultValue="weekly">
                <Label variant="checkbox" size="md">
                  <Radio value="daily" />
                  <span>Daily digest</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="weekly" />
                  <span>Weekly summary</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="monthly" />
                  <span>Monthly report</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="never" />
                  <span>Never (disable all)</span>
                </Label>
              </RadioGroup>
              <FormHelper>Choose how often you want to receive updates</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel required>Account Type</FieldLabel>
            <div style={{ marginTop: 'var(--bk-spacing-1)' }}>
              <RadioGroup name="showcase-account" defaultValue="personal">
                <Label variant="checkbox" size="md">
                  <Radio value="personal" />
                  <span>Personal - For individual use</span>
                </Label>
                <Label variant="checkbox" size="md">
                  <Radio value="business" />
                  <span>Business - For organizations</span>
                </Label>
              </RadioGroup>
              <FormHelper variant="info">This setting cannot be changed later</FormHelper>
            </div>
          </FormGroup>
        </form>
      </section>

      {/* Validation States */}
      <section style={{ marginTop: '3rem' }}>
        <Heading level={2}>Validation & Helper States</Heading>
        <Paragraph color="muted">FormHelper supports multiple visual variants</Paragraph>

        <form style={{ marginTop: '1.5rem' }}>
          <FormGroup>
            <FieldLabel htmlFor="showcase-err">With Error</FieldLabel>
            <div>
              <Input id="showcase-err" error fullWidth />
              <FormHelper variant="error">This field is required</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-warn">With Warning</FieldLabel>
            <div>
              <Input id="showcase-warn" fullWidth />
              <FormHelper variant="warning">Consider using a stronger password</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-success">With Success</FieldLabel>
            <div>
              <Input id="showcase-success" fullWidth />
              <FormHelper variant="success">Username is available!</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-info">With Info</FieldLabel>
            <div>
              <Input id="showcase-info" fullWidth />
              <FormHelper variant="info">This data will be encrypted</FormHelper>
            </div>
          </FormGroup>

          <FormGroup>
            <FieldLabel htmlFor="showcase-default">Default Helper</FieldLabel>
            <div>
              <Input id="showcase-default" fullWidth />
              <FormHelper>Regular helper text in muted color</FormHelper>
            </div>
          </FormGroup>
        </form>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase demonstrating all form features: layouts, validation states, and helper text variants.',
      },
    },
  },
};
