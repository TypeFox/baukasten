import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../components/Badge';
import { UsageMeter } from './UsageMeter';

const meta = {
    title: 'Agent/UsageMeter',
    component: UsageMeter,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'What the conversation is costing. Every readout is a slot and every slot is optional, because what a client is *allowed* to display varies: some show tokens and not money, some show neither and only a fill bar, some are contractually barred from one of them. A meter that assumed all three and had to be worked around would be wrong for most of them.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        usage: { control: false, description: 'Tokens, window, tool cost and money' },
        showFill: {
            control: 'boolean',
            description: 'Draw the context fill bar',
            table: { defaultValue: { summary: 'true' } },
        },
        showTools: {
            control: 'boolean',
            description: 'Show what tool definitions cost',
            table: { defaultValue: { summary: 'true' } },
        },
        showCost: {
            control: 'boolean',
            description: 'Show money. Off by default — a policy decision, not a taste one.',
            table: { defaultValue: { summary: 'false' } },
        },
        label: { control: 'text', table: { defaultValue: { summary: 'Context used' } } },
    },
} satisfies Meta<typeof UsageMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-gap-lg)', maxWidth: 380 }}
    >
        {children}
    </div>
);

/** Interactive playground. */
export const Interactive: Story = {
    args: {
        usage: {
            used: 48_000,
            total: 200_000,
            toolTokens: 12_000,
            toolCount: 47,
            cost: 0.42,
            currency: 'USD',
        },
        showFill: true,
        showTools: true,
        showCost: false,
    },
};

/** The line that explains where the window went. */
export const ToolCost: Story = {
    args: { usage: { used: 12_000, total: 200_000, toolTokens: 12_000, toolCount: 47 } },
    parameters: {
        docs: {
            description: {
                story: '"47 tools loaded · 12k tokens before you type" is the number users need when they wonder where their context went — and it is what makes `ToolPicker` feel worth using rather than fussy. Broken out rather than folded into `used` for exactly that reason.',
            },
        },
    },
};

/** Tone changes as the window fills. */
export const Filling: Story = {
    args: { usage: { used: 20_000, total: 200_000 } },
    render: () => (
        <Stack>
            <UsageMeter usage={{ used: 20_000, total: 200_000 }} label="Comfortable" />
            <UsageMeter usage={{ used: 160_000, total: 200_000 }} label="Getting full" />
            <UsageMeter usage={{ used: 190_000, total: 200_000 }} label="Nearly out" />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The bar and the percentage change tone together, at 75% and 90%. Two channels for one signal, because a bar at 91% and a bar at 74% are hard to tell apart at a glance and a number is not.',
            },
        },
    },
};

/** Every combination a client might be permitted to show. */
export const Slots: Story = {
    args: { usage: { used: 48_000, total: 200_000 } },
    render: () => (
        <Stack>
            <UsageMeter
                usage={{ used: 48_000, total: 200_000, toolTokens: 12_000, toolCount: 47 }}
                label="Fill and tools, no money"
            />
            <UsageMeter
                usage={{ used: 48_000, total: 200_000, cost: 0.42, currency: 'USD' }}
                showTools={false}
                showCost
                label="Fill and money"
            />
            <UsageMeter
                usage={{ used: 48_000, total: 200_000 }}
                showTools={false}
                label="Fill alone"
            />
            <UsageMeter usage={{ used: 48_000 }} showTools={false} label="Counts, no window" />
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The last one draws no bar. A fill with no denominator is decoration that looks like information, so without a total there are only counts.',
            },
        },
    },
};

/** Anything the host wants in the row. */
export const WithChildren: Story = {
    args: { usage: { used: 48_000, total: 200_000, toolTokens: 12_000, toolCount: 47 } },
    render: () => (
        <Stack>
            <UsageMeter usage={{ used: 48_000, total: 200_000, toolTokens: 12_000, toolCount: 47 }}>
                <Badge size="xs" variant="info">
                    Opus 5
                </Badge>
            </UsageMeter>
        </Stack>
    ),
};

export const Showcase: Story = {
    args: { usage: { used: 48_000, total: 200_000 } },
    parameters: { layout: 'fullscreen' },
    render: () => (
        <div style={{ padding: 'var(--bk-spacing-6)' }}>
            <Stack>
                <UsageMeter
                    usage={{
                        used: 48_000,
                        total: 200_000,
                        toolTokens: 12_000,
                        toolCount: 47,
                        cost: 0.42,
                        currency: 'USD',
                    }}
                    showCost
                >
                    <Badge size="xs" variant="info">
                        Opus 5
                    </Badge>
                </UsageMeter>
                <UsageMeter usage={{ used: 186_000, total: 200_000 }} label="Nearly out" />
                <UsageMeter usage={{ used: 3_400 }} showTools={false} label="No window reported" />
            </Stack>
        </div>
    ),
};
