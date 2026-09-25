import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { PlanEntry, PlanItem } from '../../types';
import { Plan } from './Plan';

function plan(items: PlanItem[]): PlanEntry {
    return { id: 'p1', kind: 'plan', items };
}

const STAGES: PlanItem[][] = [
    [
        { id: '1', text: 'Read the uploader', status: 'active', priority: 'high' },
        { id: '2', text: 'Check who calls flushQueue', status: 'pending' },
        { id: '3', text: 'Add a retry loop', status: 'pending' },
    ],
    [
        { id: '1', text: 'Read the uploader', status: 'done' },
        { id: '2', text: 'Check who calls flushQueue', status: 'active' },
        { id: '3', text: 'Add a retry loop', status: 'pending' },
    ],
    [
        { id: '1', text: 'Read the uploader', status: 'done' },
        { id: '2', text: 'Check who calls flushQueue', status: 'done' },
        { id: '3', text: 'Add a retry loop', status: 'active', priority: 'high' },
        { id: '4', text: 'Run the telemetry tests', status: 'pending' },
    ],
    [
        { id: '1', text: 'Read the uploader', status: 'done' },
        { id: '2', text: 'Check who calls flushQueue', status: 'done' },
        { id: '3', text: 'Add a retry loop', status: 'done' },
        { id: '4', text: 'Run the telemetry tests', status: 'done' },
    ],
];

/** Cycles through the stages, the way a plan actually behaves during a run. */
function Revising() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setStage((current) => (current + 1) % STAGES.length), 1600);
        return () => clearInterval(timer);
    }, []);

    return <Plan entry={plan(STAGES[stage])} />;
}

const meta = {
    title: 'Agent/Plan',
    component: Plan,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    "The agent's plan, as a checklist that changes under you. The mutation is the point — the transcript reducer revises a plan in place rather than appending a new entry, so this is one list that ticks off and grows. A plan appended on every revision is just a log of stale plans, and the current one scrolls away exactly when it becomes useful.",
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        entry: { control: false, description: 'The plan entry from the transcript reducer' },
        title: {
            control: 'text',
            description: 'Header label',
            table: { defaultValue: { summary: 'Plan' } },
        },
        showProgress: {
            control: 'boolean',
            description: 'Show a done/total count',
            table: { defaultValue: { summary: 'true' } },
        },
    },
} satisfies Meta<typeof Plan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    args: { entry: plan(STAGES[2]), title: 'Plan', showProgress: true },
};

/**
 * The three statuses.
 */
export const Statuses: Story = {
    args: { entry: plan(STAGES[0]) },
    render: () => (
        <div style={{ maxWidth: 460 }}>
            <Plan
                entry={plan([
                    { id: '1', text: 'Done, and kept', status: 'done' },
                    { id: '2', text: 'In progress', status: 'active' },
                    { id: '3', text: 'Not started', status: 'pending' },
                    {
                        id: '4',
                        text: 'Not started, and urgent',
                        status: 'pending',
                        priority: 'high',
                    },
                ])}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Finished steps stay, struck through, rather than being removed. A plan is read for its shape as much as its remaining work — dropping completed items makes a long plan look like it never had them, and loses the sense of progress that makes showing it worthwhile.',
            },
        },
    },
};

/**
 * What it actually does during a run.
 */
export const RevisedInPlace: Story = {
    args: { entry: plan(STAGES[0]) },
    render: () => (
        <div style={{ maxWidth: 460 }}>
            <Revising />
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `// Nothing special to do here. The transcript reducer revises a plan in
// place rather than appending, so this is one entry that changes — the
// component just renders whatever the current items are.
<Plan entry={entry} />`,
            },
            description: {
                story: 'Steps tick off and a fourth appears part-way through, because the agent re-planned. One entry throughout — watch the count rather than the list growing downward.',
            },
        },
    },
};

export const Showcase: Story = {
    args: { entry: plan(STAGES[2]) },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'Wide and narrow, since the narrow case is the default.' } },
    },
    render: () => (
        <div
            style={{ display: 'flex', gap: 'var(--bk-spacing-6)', padding: 'var(--bk-spacing-6)' }}
        >
            <div style={{ flex: 1 }}>
                <Plan entry={plan(STAGES[2])} />
            </div>
            <div style={{ width: 300 }}>
                <Plan entry={plan(STAGES[2])} />
            </div>
        </div>
    ),
};
