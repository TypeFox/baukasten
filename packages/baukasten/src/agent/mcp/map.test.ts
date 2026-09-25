import { describe, expect, it, vi } from 'vitest';
import { serverId } from '../types';
import {
    MCP_PROTOCOL_VERSION,
    McpProtocolVersionError,
    assertProtocolVersion,
    declaredClientCapabilities,
    type McpInputRequiredResult,
    type McpPort,
} from './protocol';
import {
    isInputRequired,
    toCommandItem,
    toExecutionError,
    toInputRequests,
    toMentionItem,
    toProtocolError,
    toRequestState,
    toToolInvocation,
} from './map';
import { createCommandSource, createMentionSource } from './sources';

const server = serverId('local#1');

describe('protocol version', () => {
    it('accepts the revision it was written against', () => {
        expect(() => assertProtocolVersion(MCP_PROTOCOL_VERSION)).not.toThrow();
    });

    it('fails loudly on a different revision rather than degrading', () => {
        expect(() => assertProtocolVersion('2025-06-18')).toThrow(McpProtocolVersionError);
    });

    it('names both revisions in the message, so the cause is obvious', () => {
        expect(() => assertProtocolVersion('2025-06-18')).toThrow(/2025-06-18/);
        expect(() => assertProtocolVersion('2025-06-18')).toThrow(/2026-07-28/);
    });

    it('tolerates an absent version, which is the only ambiguous case', () => {
        expect(() => assertProtocolVersion(undefined)).not.toThrow();
    });
});

describe('declared capabilities', () => {
    it('declares form elicitation only, by default', () => {
        expect(declaredClientCapabilities()).toEqual({ elicitation: { form: {} } });
    });

    it('adds url elicitation only when the application says it can present one', () => {
        expect(declaredClientCapabilities({ url: true })).toEqual({
            elicitation: { form: {}, url: {} },
        });
    });

    it('never declares sampling or roots', () => {
        const declared = declaredClientCapabilities({ url: true });
        // Under-declaring is the mechanism that stops a server sending a kind
        // we have no renderer for. Declaring these would invite exactly that.
        expect(declared).not.toHaveProperty('sampling');
        expect(declared).not.toHaveProperty('roots');
    });
});

describe('resources to mentions', () => {
    it('prefers the display title over the machine name', () => {
        const item = toMentionItem(
            { uri: 'file:///a.rs', name: 'a.rs', title: 'Main File' },
            server,
        );

        expect(item.label).toBe('Main File');
        expect(item.id).toBe('file:///a.rs');
        expect(item.serverId).toBe(server);
    });

    it('falls back to the name when no title is given', () => {
        expect(toMentionItem({ uri: 'file:///a.rs', name: 'a.rs' }).label).toBe('a.rs');
    });

    it('carries server-supplied icons through instead of discarding them', () => {
        const item = toMentionItem({
            uri: 'file:///a.rs',
            name: 'a.rs',
            icons: [{ src: 'https://example.test/rust.png', sizes: ['48x48'] }],
        });

        expect(item.icons).toEqual([
            { src: 'https://example.test/rust.png', mimeType: undefined, sizes: ['48x48'] },
        ]);
    });

    it('recognises a directory by its mime type', () => {
        const item = toMentionItem({
            uri: 'file:///src',
            name: 'src',
            mimeType: 'inode/directory',
        });

        expect(item.kind).toBe('folder');
    });
});

describe('prompts to commands', () => {
    it('carries typed arguments across', () => {
        const item = toCommandItem({
            name: 'code_review',
            title: 'Request Code Review',
            arguments: [{ name: 'code', description: 'The code to review', required: true }],
        });

        expect(item.name).toBe('code_review');
        expect(item.label).toBe('Request Code Review');
        expect(item.arguments).toEqual([
            { name: 'code', description: 'The code to review', required: true },
        ]);
    });
});

describe('tools', () => {
    it('defaults kind to other rather than guessing one MCP never supplied', () => {
        const invocation = toToolInvocation(
            { name: 'get_weather', title: 'Weather' },
            { correlationId: 'c1' },
        );

        expect(invocation.kind).toBe('other');
        expect(invocation.title).toBe('Weather');
        expect(invocation.status).toBe('pending');
    });

    it('keeps the correlation id distinct from the attempt id', () => {
        const invocation = toToolInvocation(
            { name: 'get_weather' },
            { correlationId: 'c1', requestId: '7' },
        );

        expect(invocation.correlationId).toBe('c1');
        expect(invocation.requestId).toBe('7');
    });

    it('does not fold behaviour annotations into anything', () => {
        const invocation = toToolInvocation(
            { name: 'rm', annotations: { destructiveHint: true } },
            { correlationId: 'c1' },
        );

        // Annotations are server-controlled and untrusted. Nothing about how
        // this renders may be derived from them here.
        expect(invocation).not.toHaveProperty('severity');
        expect(invocation).not.toHaveProperty('annotations');
    });
});

describe('errors', () => {
    it('scopes a reported tool failure as execution, which the agent can recover from', () => {
        const error = toExecutionError({
            isError: true,
            content: [{ type: 'text', text: 'Invalid departure date' }],
        });

        expect(error).toEqual({ scope: 'execution', message: 'Invalid departure date' });
    });

    it('returns nothing for a successful result', () => {
        expect(toExecutionError({ content: [], isError: false })).toBeUndefined();
    });

    it('scopes a transport failure as protocol, which usually needs a human', () => {
        expect(toProtocolError({ code: -32602, message: 'Unknown tool' })).toEqual({
            scope: 'protocol',
            message: 'Unknown tool',
            code: -32602,
        });
    });
});

describe('input required', () => {
    const result: McpInputRequiredResult = {
        resultType: 'input_required',
        inputRequests: {
            github_login: {
                method: 'elicitation/create',
                params: {
                    mode: 'form',
                    message: 'Provide your username',
                    requestedSchema: { type: 'object' },
                },
            },
            capital_of_france: {
                method: 'sampling/createMessage',
                params: { maxTokens: 100 },
            },
        },
        requestState: 'AEAD-protected blob',
    };

    it('is detected by result type', () => {
        expect(isInputRequired(result)).toBe(true);
        expect(isInputRequired({ content: [] })).toBe(false);
    });

    it('flattens the map while preserving every key', () => {
        const requests = toInputRequests(result, server);

        // Answers go back under these keys. Losing one makes the retry
        // unanswerable, so the key matters more than the order.
        expect(requests.map((request) => request.key).sort()).toEqual([
            'capital_of_france',
            'github_login',
        ]);
    });

    it('maps a form request with its schema', () => {
        const form = toInputRequests(result).find((request) => request.key === 'github_login');

        expect(form?.kind).toBe('form');
        expect(form && 'schema' in form && form.schema).toEqual({ type: 'object' });
    });

    it('surfaces a kind it has no renderer for instead of dropping it', () => {
        const sampling = toInputRequests(result).find(
            (request) => request.key === 'capital_of_france',
        );

        // Dropping it would leave the call silently stuck; surfacing it lets
        // the application decline explicitly.
        expect(sampling?.kind).toBe('sampling/createMessage');
    });

    it('treats an absent mode as form, per the revision', () => {
        const requests = toInputRequests({
            resultType: 'input_required',
            inputRequests: {
                k: { method: 'elicitation/create', params: { message: 'hi' } },
            },
        });

        expect(requests[0].kind).toBe('form');
    });

    it('maps a url request with its target', () => {
        const requests = toInputRequests({
            resultType: 'input_required',
            inputRequests: {
                k: {
                    method: 'elicitation/create',
                    params: { mode: 'url', message: 'Sign in', url: 'https://example.test/a' },
                },
            },
        });

        expect(requests[0].kind).toBe('url');
        expect(requests[0] && 'url' in requests[0] && requests[0].url).toBe(
            'https://example.test/a',
        );
    });

    it('seals the continuation state against accidental disclosure', () => {
        const state = toRequestState(result);

        expect(state?.reveal()).toBe('AEAD-protected blob');
        // The two commonest ways to leak it both have to fail safe.
        expect(`${state}`).toBe('[requestState]');
        expect(JSON.stringify({ state })).toBe('{"state":"[requestState]"}');
    });

    it('returns nothing when there is no continuation state', () => {
        expect(toRequestState({ resultType: 'input_required' })).toBeUndefined();
    });
});

describe('sources', () => {
    function port(overrides: Partial<McpPort> = {}): McpPort {
        return {
            listPrompts: vi.fn(async () => ({ prompts: [] })),
            listResources: vi.fn(async () => ({ resources: [] })),
            ...overrides,
        };
    }

    it('passes the cursor through and returns the next one', async () => {
        const listResources = vi.fn(async () => ({
            resources: [{ uri: 'file:///a', name: 'a' }],
            nextCursor: 'page2',
            ttlMs: 300000,
            cacheScope: 'public' as const,
        }));

        const source = createMentionSource(port({ listResources }));
        const page = await source.search({ query: '', cursor: 'page1' });

        expect(listResources).toHaveBeenCalledWith('page1');
        expect(page.nextCursor).toBe('page2');
        expect(page.ttlMs).toBe(300000);
        expect(page.cacheScope).toBe('public');
    });

    it('fetches templates only on the first page, so they are not duplicated', async () => {
        const listResourceTemplates = vi.fn(async () => ({
            resourceTemplates: [{ uriTemplate: 'file:///{path}', name: 'Files' }],
        }));

        const source = createMentionSource(port({ listResourceTemplates }));

        const first = await source.search({ query: '' });
        expect(first.items).toHaveLength(1);

        const second = await source.search({ query: '', cursor: 'page2' });
        expect(listResourceTemplates).toHaveBeenCalledTimes(1);
        expect(second.items).toHaveLength(0);
    });

    it('narrows a page client-side, since MCP list calls take no search term', async () => {
        const listResources = vi.fn(async () => ({
            resources: [
                { uri: 'file:///uploader.ts', name: 'uploader.ts' },
                { uri: 'file:///types.ts', name: 'types.ts' },
            ],
        }));

        const source = createMentionSource(port({ listResources }));
        const page = await source.search({ query: 'upload' });

        expect(page.items).toHaveLength(1);
        expect(page.items[0].label).toBe('uploader.ts');
    });

    it('offers argument completion only when the port supports it', async () => {
        expect(createCommandSource(port()).completeArgument).toBeUndefined();

        const complete = vi.fn(async () => ({ values: ['main.rs'] }));
        const source = createCommandSource(port({ complete }));

        expect(source.completeArgument).toBeDefined();
        await expect(source.completeArgument?.('code_review', 'code', 'ma')).resolves.toEqual([
            'main.rs',
        ]);
        expect(complete).toHaveBeenCalledWith(
            { type: 'prompt', name: 'code_review' },
            { name: 'code', value: 'ma' },
            undefined,
        );
    });
});
