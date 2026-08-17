/**
 * Static fixture data for the "AI Coding Agent" demo.
 *
 * Nothing here talks to a model — the demo replays a scripted run so the UI
 * can be showcased deterministically. Timings are in milliseconds and are
 * scaled by the player's speed control.
 */

import type { CodiconName } from 'baukasten-ui/core';

export const DEMO_FILE = 'src/services/telemetry/uploader.ts';

export const ORIGINAL_CODE = `import type { TelemetryEvent } from './types';
import type { Logger } from '../logging';

const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;

export interface UploaderOptions {
    endpoint?: string;
    batchSize?: number;
}

/**
 * Ships queued telemetry events to the collector.
 */
export class TelemetryUploader {
    private readonly endpoint: string;
    private readonly batchSize: number;

    constructor(
        private readonly logger: Logger,
        options: UploaderOptions = {},
    ) {
        this.endpoint = options.endpoint ?? ENDPOINT;
        this.batchSize = options.batchSize ?? BATCH_SIZE;
    }

    async flushQueue(events: TelemetryEvent[]): Promise<number> {
        let uploaded = 0;

        for (const batch of chunk(events, this.batchSize)) {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ events: batch }),
            });

            if (!response.ok) {
                this.logger.warn(\`Upload failed with \${response.status}, dropping batch\`);
                continue;
            }

            uploaded += batch.length;
        }

        return uploaded;
    }
}

function chunk<T>(items: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        out.push(items.slice(i, i + size));
    }
    return out;
}
`;

export const MODIFIED_CODE = `import type { TelemetryEvent } from './types';
import type { Logger } from '../logging';

const ENDPOINT = 'https://telemetry.example.dev/v1/events';
const BATCH_SIZE = 50;
const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 250;
const MAX_DELAY_MS = 30_000;

/** Transient failures worth retrying — anything else is permanent. */
const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

export interface UploaderOptions {
    endpoint?: string;
    batchSize?: number;
    maxAttempts?: number;
}

/**
 * Ships queued telemetry events to the collector.
 *
 * Batches are retried with exponential backoff and full jitter, so a flaky
 * collector degrades throughput instead of silently dropping events.
 */
export class TelemetryUploader {
    private readonly endpoint: string;
    private readonly batchSize: number;
    private readonly maxAttempts: number;

    constructor(
        private readonly logger: Logger,
        options: UploaderOptions = {},
    ) {
        this.endpoint = options.endpoint ?? ENDPOINT;
        this.batchSize = options.batchSize ?? BATCH_SIZE;
        this.maxAttempts = options.maxAttempts ?? MAX_ATTEMPTS;
    }

    async flushQueue(events: TelemetryEvent[], signal?: AbortSignal): Promise<number> {
        let uploaded = 0;

        for (const batch of chunk(events, this.batchSize)) {
            if (signal?.aborted) break;
            uploaded += await this.sendBatch(batch, signal);
        }

        return uploaded;
    }

    private async sendBatch(batch: TelemetryEvent[], signal?: AbortSignal): Promise<number> {
        for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ events: batch }),
                signal,
            });

            if (response.ok) {
                return batch.length;
            }

            if (!RETRYABLE_STATUS.has(response.status)) {
                this.logger.error(\`Upload rejected with \${response.status}, dropping batch\`);
                return 0;
            }

            const delay = backoffDelay(attempt, response.headers.get('retry-after'));
            this.logger.warn(
                \`Upload failed with \${response.status}, retrying in \${delay}ms \` +
                    \`(attempt \${attempt}/\${this.maxAttempts})\`,
            );
            await sleep(delay, signal);
        }

        this.logger.error(\`Upload gave up after \${this.maxAttempts} attempts\`);
        return 0;
    }
}

/** Exponential backoff with full jitter, capped and honouring Retry-After. */
function backoffDelay(attempt: number, retryAfter: string | null): number {
    const hinted = retryAfter ? Number.parseInt(retryAfter, 10) * 1_000 : Number.NaN;
    if (Number.isFinite(hinted)) {
        return Math.min(hinted, MAX_DELAY_MS);
    }

    const ceiling = Math.min(BASE_DELAY_MS * 2 ** (attempt - 1), MAX_DELAY_MS);
    return Math.round(Math.random() * ceiling);
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, ms);
        signal?.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(signal.reason);
        });
    });
}

function chunk<T>(items: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        out.push(items.slice(i, i + size));
    }
    return out;
}
`;

// ─── Explorer ────────────────────────────────────────────────────────────────

export interface DemoFileNode {
    id: string;
    label: string;
    icon: CodiconName;
    children?: DemoFileNode[];
    /** Shown as a git-style decoration once the agent has touched the file */
    changed?: boolean;
}

export const FILE_TREE: DemoFileNode[] = [
    {
        id: 'src',
        label: 'src',
        icon: 'folder-opened',
        children: [
            {
                id: 'src/services',
                label: 'services',
                icon: 'folder-opened',
                children: [
                    {
                        id: 'src/services/telemetry',
                        label: 'telemetry',
                        icon: 'folder-opened',
                        children: [
                            { id: 'src/services/telemetry/queue.ts', label: 'queue.ts', icon: 'file-code' },
                            { id: 'src/services/telemetry/types.ts', label: 'types.ts', icon: 'file-code' },
                            {
                                id: DEMO_FILE,
                                label: 'uploader.ts',
                                icon: 'file-code',
                                changed: true,
                            },
                        ],
                    },
                    { id: 'src/services/logging.ts', label: 'logging.ts', icon: 'file-code' },
                ],
            },
            {
                id: 'src/test',
                label: 'test',
                icon: 'folder',
                children: [
                    {
                        id: 'src/test/telemetry.spec.ts',
                        label: 'telemetry.spec.ts',
                        icon: 'beaker',
                    },
                ],
            },
            { id: 'src/extension.ts', label: 'extension.ts', icon: 'file-code' },
        ],
    },
    { id: 'package.json', label: 'package.json', icon: 'json' },
];

// ─── Scripted run ────────────────────────────────────────────────────────────

export type ToolKind = 'read' | 'search' | 'edit' | 'terminal';

export interface UserStep {
    kind: 'user';
    text: string;
    /** Context chips attached to the prompt */
    context: string[];
    delay: number;
}

export interface ThinkingStep {
    kind: 'thinking';
    text: string;
    /** How long the thinking block stays in its "live" state */
    duration: number;
    delay: number;
}

export interface ToolStep {
    kind: 'tool';
    tool: ToolKind;
    title: string;
    target: string;
    /** Result line shown once the call resolves */
    result: string;
    /** Preview body revealed when the card is expanded */
    body: string;
    /**
     * Language id for the body, when it is source rather than tool output.
     * Set it and the body is tokenized by the editor; leave it off for file
     * lists, hunk summaries and terminal output, which are not code.
     */
    bodyLanguage?: string;
    duration: number;
    delay: number;
}

export interface AssistantStep {
    kind: 'assistant';
    text: string;
    delay: number;
}

/** Reveals the proposed edit in the diff editor. */
export interface DiffStep {
    kind: 'diff';
    delay: number;
}

/** The final review card with accept / reject actions. */
export interface ReviewStep {
    kind: 'review';
    delay: number;
}

export type RunStep =
    | UserStep
    | ThinkingStep
    | ToolStep
    | AssistantStep
    | DiffStep
    | ReviewStep;

export const TOOL_META: Record<ToolKind, { icon: CodiconName; label: string }> = {
    read: { icon: 'file-code', label: 'Read' },
    search: { icon: 'search', label: 'Search' },
    edit: { icon: 'edit', label: 'Edit' },
    terminal: { icon: 'terminal', label: 'Terminal' },
};

export const RUN_SCRIPT: RunStep[] = [
    {
        kind: 'user',
        text: 'The telemetry uploader drops events whenever the collector gets flaky. Add retry with exponential backoff and jitter, honour Retry-After, and make a flush cancellable.',
        context: ['uploader.ts', 'telemetry/', '#flaky-uploads'],
        delay: 400,
    },
    {
        kind: 'thinking',
        text: 'Reading the uploader to see where failures are swallowed, then checking who calls flushQueue so the new signal parameter stays backwards compatible.',
        duration: 1400,
        delay: 500,
    },
    {
        kind: 'tool',
        tool: 'read',
        title: 'Read',
        target: 'src/services/telemetry/uploader.ts',
        result: '62 lines',
        body: 'if (!response.ok) {\n    this.logger.warn(`Upload failed with ${response.status}, dropping batch`);\n    continue;\n}',
        bodyLanguage: 'typescript',
        duration: 900,
        delay: 250,
    },
    {
        kind: 'tool',
        tool: 'search',
        title: 'Search',
        target: 'flushQueue(',
        result: '3 matches in 2 files',
        body: 'src/services/telemetry/queue.ts:84\nsrc/extension.ts:141\nsrc/test/telemetry.spec.ts:27',
        duration: 700,
        delay: 200,
    },
    {
        kind: 'tool',
        tool: 'read',
        title: 'Read',
        target: 'src/services/telemetry/queue.ts',
        result: '118 lines',
        body: '// flushes on a fixed interval, regardless of in-flight work\nthis.timer = setInterval(() => {\n    void this.uploader.flushQueue(this.drain());\n}, FLUSH_INTERVAL_MS);',
        bodyLanguage: 'typescript',
        duration: 650,
        delay: 200,
    },
    {
        kind: 'assistant',
        text: 'Found it — a non-OK response just logs a warning and `continue`s, so the batch is gone. Every caller passes only the event array, so adding an optional `signal` keeps them compiling.\n\nPlan:\n1. Retry transient status codes (408, 425, 429, 5xx) up to 5 attempts.\n2. Full-jitter backoff capped at 30s, honouring `Retry-After` when present.\n3. Thread an optional `AbortSignal` through the flush loop and the sleep.',
        delay: 350,
    },
    {
        kind: 'tool',
        tool: 'edit',
        title: 'Edit',
        target: 'src/services/telemetry/uploader.ts',
        result: 'applied',
        body: '3 hunks applied\n~ flushQueue()    takes an optional AbortSignal\n+ sendBatch()     retry loop over RETRYABLE_STATUS\n+ backoffDelay()  full jitter, capped, honours Retry-After\n+ sleep()         abortable timer',
        duration: 1500,
        delay: 300,
    },
    { kind: 'diff', delay: 200 },
    {
        kind: 'tool',
        tool: 'terminal',
        title: 'Terminal',
        target: 'npm test -- telemetry',
        result: '12 passed in 1.84s',
        body: '✓ retries transient failures with backoff (312ms)\n✓ gives up after maxAttempts (204ms)\n✓ honours Retry-After header (98ms)\n✓ aborts an in-flight flush (61ms)',
        duration: 1900,
        delay: 350,
    },
    {
        kind: 'assistant',
        text: 'Done. Permanent failures still drop fast instead of burning the retry budget, and an aborted flush stops between batches rather than mid-request.\n\nWorth a follow-up: `queue.ts` re-enqueues on a fixed 60s timer, which will now overlap with a long backoff.',
        delay: 300,
    },
    { kind: 'review', delay: 250 },
];
