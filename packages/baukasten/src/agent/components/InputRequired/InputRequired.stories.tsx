import type { Meta, StoryObj } from '@storybook/react';
import { serverId, type FormInputRequest, type UrlInputRequest } from '../../types';
import { ElicitationForm } from './ElicitationForm';
import { InputRequired } from './InputRequired';
import { UrlElicitation } from './UrlElicitation';

const github = serverId('remote#github');

const CONTACT: FormInputRequest = {
    key: 'contact',
    kind: 'form',
    message: 'Please provide your contact information',
    serverId: github,
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string', title: 'Full name', description: 'As it should appear' },
            email: { type: 'string', format: 'email', title: 'Email' },
            age: { type: 'integer', title: 'Age', minimum: 18, maximum: 120 },
            notify: { type: 'boolean', title: 'Email me about updates', default: true },
            plan: {
                type: 'string',
                title: 'Plan',
                oneOf: [
                    { const: 'free', title: 'Free' },
                    { const: 'pro', title: 'Pro' },
                ],
                default: 'free',
            },
            languages: {
                type: 'array',
                title: 'Languages',
                minItems: 1,
                items: { type: 'string', enum: ['TypeScript', 'Rust', 'Go'] },
            },
        },
        required: ['name', 'email'],
    },
};

const SIGN_IN: UrlInputRequest = {
    key: 'sign_in',
    kind: 'url',
    message: 'Sign in to GitHub to continue.',
    serverId: github,
    url: 'https://mcp.example.com/connect?session=abc123',
};

const meta = {
    title: 'Agent/InputRequired',
    component: InputRequired,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Resolves everything blocking a call, then hands the answers back at once. The unit is a keyed **set** — a blocked operation can come back asking for several things of different kinds, and the client answers by retrying the original call with all of them. Collecting one answer and sending it is not a smaller version of the right behaviour.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        requests: { control: false, description: 'Everything that must be answered' },
        onComplete: { description: 'Fires once every request has an answer, with all of them' },
        onOpenUrl: { description: 'Required to render a URL request. No default — see below.' },
    },
} satisfies Meta<typeof InputRequired>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-md)', maxWidth: 560 }}
    >
        {children}
    </div>
);

/**
 * Interactive playground with a form request.
 */
export const Interactive: Story = {
    args: {
        requests: [CONTACT],
        onOpenUrl: (url: string) => window.alert(`The host would open:\n${url}`),
    },
    parameters: {
        docs: {
            description: {
                story: 'Submit is disabled until every required field has something. The card names the server that is asking, which is a client requirement rather than decoration — an unattributed form appearing mid-run is indistinguishable from one the application itself put there.',
            },
        },
    },
};

/**
 * Every control the restricted schema can produce.
 */
export const FormControls: Story = {
    args: { requests: [] },
    render: () => (
        <Stack>
            <ElicitationForm request={CONTACT} />
        </Stack>
    ),
    parameters: {
        docs: {
            source: {
                code: `<ElicitationForm request={request} onRespond={answer} />`,
            },
            description: {
                story: "Strings with formats, numbers with bounds, booleans, labelled enums via `oneOf`, and multi-selects. The schema is deliberately restricted to a flat object of primitives, which is what makes this a mapping onto existing controls rather than a general form generator.\n\nFields are laid out with `FormGroup` in its default **horizontal** orientation — the library's VSCode-style two-column form, label left and control right.",
            },
        },
    },
};

/**
 * The same form at both orientations, which is a question about width.
 */
export const Orientation: Story = {
    args: { requests: [] },
    render: () => (
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-6)', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-xs)',
                        color: 'var(--bk-color-foreground-muted)',
                    }}
                >
                    horizontal — where there is room
                </div>
                <ElicitationForm request={CONTACT} />
            </div>
            <div
                style={{
                    width: 300,
                    flexShrink: 0,
                    border: '1px dashed var(--bk-color-border)',
                    padding: 'var(--bk-spacing-2)',
                }}
            >
                <div
                    style={{
                        marginBottom: 'var(--bk-spacing-2)',
                        fontSize: 'var(--bk-font-size-xs)',
                        color: 'var(--bk-color-foreground-muted)',
                    }}
                >
                    vertical — 300px docked panel
                </div>
                <ElicitationForm request={CONTACT} orientation="vertical" />
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: `// Horizontal is the default and the right choice where there is room.
<ElicitationForm request={request} onRespond={answer} />

// In a docked panel the label column works out around 90px, which truncates
// almost any real setting name. That is a judgement about available width,
// so it belongs to whoever knows where the form is being rendered.
<ElicitationForm request={request} onRespond={answer} orientation="vertical" />`,
            },
            description: {
                story: 'Horizontal is the house VSCode layout and is right wherever there is room. At 300px the label column is roughly 90px, which truncates almost any real field name — so the narrow case wants `vertical`. `InputRequired` takes the same prop and passes it down.',
            },
        },
    },
};

/**
 * The security-critical one. Look at this carefully.
 */
export const UrlConsent: Story = {
    args: { requests: [] },
    render: () => (
        <Stack>
            <UrlElicitation
                request={SIGN_IN}
                onOpenUrl={(url) => window.alert(`The host would open:\n${url}`)}
            />
            <UrlElicitation
                request={{
                    ...SIGN_IN,
                    key: 'punycode',
                    message: 'Verify your account.',
                    url: 'https://xn--pypal-4ve.com/verify',
                }}
                onOpenUrl={() => undefined}
            />
            <UrlElicitation
                request={{
                    ...SIGN_IN,
                    key: 'insecure',
                    message: 'Connect your account.',
                    url: 'http://example.com/connect',
                }}
                onOpenUrl={() => undefined}
            />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The address is shown in full and **never as a link** — a clickable target invites exactly the reflexive click consent is supposed to interrupt. The host is pulled out separately so a lookalike subdomain is visible. The second card is punycode, which renders as a name close enough to a trusted one that showing the address is not by itself protection; the third is not https. This is the component where the question is not "does it work" but "does the warning actually stop someone".',
            },
        },
    },
};

/**
 * Several requests at once, of different kinds.
 */
export const MultipleRequests: Story = {
    args: {
        requests: [
            {
                key: 'branch',
                kind: 'form',
                message: 'Which branch should I push to?',
                serverId: github,
                schema: {
                    type: 'object',
                    properties: { branch: { type: 'string', title: 'Branch' } },
                    required: ['branch'],
                },
            },
            SIGN_IN,
        ],
        onOpenUrl: (url: string) => window.alert(`The host would open:\n${url}`),
    },
    parameters: {
        docs: {
            description: {
                story: 'A single blocked call can return several requests, keyed and of different kinds. Answers are reported together, because the caller retries the original operation with the whole set — a partial answer leaves the call blocked.',
            },
        },
    },
};

/**
 * What happens when this client cannot answer.
 */
export const Unsupported: Story = {
    args: {
        requests: [
            { key: 'sampling', kind: 'sampling/createMessage', message: '', serverId: github },
            SIGN_IN,
        ],
        // No onOpenUrl: the URL request cannot be honoured either.
    },
    parameters: {
        docs: {
            description: {
                story: 'A kind with no renderer is declined explicitly rather than ignored — leaving it unanswered strands the call with nothing on screen explaining why. The URL request degrades the same way when the host has given no way to open a link safely: better to say so than to render a button that cannot keep its promise.',
            },
        },
    },
};

/**
 * Everything at once.
 */
export const Showcase: Story = {
    args: { requests: [] },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'Both modes and the unsupported fallback together.' } },
    },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
            <Stack>
                <InputRequired requests={[CONTACT]} />
                <InputRequired requests={[SIGN_IN]} onOpenUrl={() => undefined} />
                <InputRequired
                    requests={[
                        { key: 'x', kind: 'sampling/createMessage', message: '', serverId: github },
                    ]}
                />
            </Stack>
        </div>
    ),
};
