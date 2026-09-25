/**
 * A scripted run that reaches the cases a happy-path fixture never does.
 *
 * The `agent-ide` demo's script showed a run where everything worked. That is
 * the easy half and the half components are usually correct for. This one adds
 * the four situations the ticket called out — a failing tool, a call blocked on
 * input, a permission prompt, and a plan revised mid-run — because those are
 * where a transcript is either well designed or quietly broken, and they are
 * hard to provoke on demand against a live server.
 *
 * Used by stories and by anyone developing a component against something
 * nastier than a greeting.
 */

import type { MockStep } from './createMockAgent';

export const DEMO_SCRIPT: readonly MockStep[] = [
    {
        kind: 'user',
        text: 'The telemetry uploader drops events when the collector gets flaky. Add retries with backoff.',
        delay: 200,
    },

    {
        kind: 'plan',
        items: [
            { id: '1', text: 'Read the uploader', status: 'active', priority: 'high' },
            { id: '2', text: 'Check who calls flushQueue', status: 'pending' },
            { id: '3', text: 'Add a retry loop', status: 'pending' },
        ],
        delay: 300,
    },

    {
        kind: 'thought',
        text: 'Reading the uploader to see where failures are swallowed, then checking the callers so a new parameter stays backwards compatible.',
        duration: 1200,
        delay: 250,
    },

    {
        kind: 'tool',
        correlationId: 'read-uploader',
        title: 'Read',
        toolKind: 'read',
        target: 'src/services/telemetry/uploader.ts',
        result: '62 lines',
        duration: 800,
        delay: 200,
    },

    // A tool that fails in the recoverable way: the call worked, the tool
    // reported a problem, and the agent is expected to route around it.
    {
        kind: 'tool',
        correlationId: 'search-callers',
        title: 'Search',
        toolKind: 'search',
        target: 'flushQueue(',
        error: { scope: 'execution', message: 'Search index is still building. Try again.' },
        duration: 600,
        delay: 200,
    },

    {
        kind: 'message',
        text: 'The index was cold, so I grepped instead. Every caller passes only the event array, so an optional signal keeps them compiling.',
        delay: 250,
    },

    {
        kind: 'plan',
        items: [
            { id: '1', text: 'Read the uploader', status: 'done' },
            { id: '2', text: 'Check who calls flushQueue', status: 'done' },
            { id: '3', text: 'Add a retry loop', status: 'active', priority: 'high' },
        ],
        delay: 200,
    },

    // A call that cannot finish without asking the human something.
    {
        kind: 'tool',
        correlationId: 'edit-uploader',
        title: 'Edit',
        toolKind: 'edit',
        target: 'src/services/telemetry/uploader.ts',
        duration: 700,
        delay: 250,
    },
    {
        kind: 'input-required',
        correlationId: 'edit-uploader',
        requests: [
            {
                key: 'max_attempts',
                kind: 'form',
                message: 'How many attempts before giving up?',
                schema: {
                    type: 'object',
                    properties: {
                        attempts: { type: 'integer', title: 'Attempts', minimum: 1, maximum: 10 },
                    },
                    required: ['attempts'],
                },
            },
        ],
        delay: 300,
    },
    // Re-issued after the answer. One entry, not two — the correlation id is
    // what holds the two attempts together.
    {
        kind: 'tool',
        correlationId: 'edit-uploader',
        title: 'Edit',
        toolKind: 'edit',
        target: 'src/services/telemetry/uploader.ts',
        result: '3 hunks applied',
        duration: 900,
        delay: 400,
    },

    // Something destructive enough to ask about first.
    {
        kind: 'approval',
        request: {
            id: 'run-tests',
            title: 'Run the telemetry test suite',
            description: 'npm test -- telemetry',
            options: [
                {
                    id: 'allow',
                    label: 'Allow',
                    outcome: 'allow',
                    scope: 'once',
                    shortcut: 'accept',
                },
                { id: 'always', label: 'Always allow', outcome: 'allow', scope: 'tool' },
                { id: 'deny', label: 'Reject', outcome: 'deny', scope: 'once', shortcut: 'reject' },
            ],
        },
        delay: 300,
    },

    {
        kind: 'tool',
        correlationId: 'run-tests',
        title: 'Terminal',
        toolKind: 'execute',
        target: 'npm test -- telemetry',
        result: '12 passed in 1.84s',
        duration: 1500,
        delay: 250,
    },

    {
        kind: 'plan',
        items: [
            { id: '1', text: 'Read the uploader', status: 'done' },
            { id: '2', text: 'Check who calls flushQueue', status: 'done' },
            { id: '3', text: 'Add a retry loop', status: 'done' },
        ],
        delay: 200,
    },

    {
        kind: 'message',
        text: 'Done. Permanent failures drop fast instead of burning the retry budget, and an aborted flush stops between batches rather than mid-request.',
        delay: 300,
    },
];
