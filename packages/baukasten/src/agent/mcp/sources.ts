/**
 * Trigger sources backed by MCP.
 *
 * Prompts become the `/` source and resources the `@` source, which is what
 * the protocol's own division suggests: prompts are user-controlled and
 * illustrated as slash commands, resources are application-driven and offered
 * through a picker. Neither mapping is mandated — the protocol declines to
 * mandate any interaction model — so these are defaults an application can
 * replace wholesale.
 */

import type {
    CommandItem,
    CommandSource,
    MentionItem,
    MentionSource,
    ServerId,
    SourceQuery,
    SourceResult,
} from '../types';
import { toCommandItem, toMentionItem, toTemplateMentionItem } from './map';
import type { McpCacheable, McpPort } from './protocol';

export interface McpSourceOptions {
    /**
     * The application's own identifier for this server.
     *
     * Never a name the server reported: tool names are unique only within a
     * server and a server's self-reported name is not unique at all, so either
     * would let one server's grants and groupings bleed into another's.
     */
    readonly serverId?: ServerId;
    /** Include parameterised resources alongside concrete ones. Defaults to true. */
    readonly includeTemplates?: boolean;
}

function cacheHints(result: McpCacheable) {
    return {
        nextCursor: result.nextCursor,
        ttlMs: result.ttlMs,
        cacheScope: result.cacheScope,
    };
}

/**
 * Filters a page client-side.
 *
 * MCP list endpoints take a cursor but not a search term, so narrowing has to
 * happen here. That is a real limitation rather than a shortcut: with a large
 * resource set the useful page may not be the first one, which is exactly why
 * the source interface exposes a cursor instead of pretending a single call
 * returns everything.
 */
function matches(query: string, ...fields: readonly (string | undefined)[]): boolean {
    if (query === '') return true;
    const needle = query.toLowerCase();
    return fields.some((field) => field?.toLowerCase().includes(needle));
}

/** Backs an `@` trigger with `resources/list` and `resources/templates/list`. */
export function createMentionSource(port: McpPort, options: McpSourceOptions = {}): MentionSource {
    const { serverId, includeTemplates = true } = options;

    return {
        async search(query: SourceQuery): Promise<SourceResult<MentionItem>> {
            const page = await port.listResources(query.cursor);
            const items: MentionItem[] = page.resources
                .filter((resource) =>
                    matches(query.query, resource.title, resource.name, resource.uri),
                )
                .map((resource) => toMentionItem(resource, serverId));

            // Templates are only worth fetching on the first page — they are a
            // short list, and re-fetching them per cursor would duplicate them
            // into every page of results.
            if (includeTemplates && query.cursor === undefined && port.listResourceTemplates) {
                const templates = await port.listResourceTemplates();
                items.push(
                    ...templates.resourceTemplates
                        .filter((template) => matches(query.query, template.title, template.name))
                        .map((template) => toTemplateMentionItem(template, serverId)),
                );
            }

            return { items, ...cacheHints(page) };
        },
    };
}

/** Backs a `/` trigger with `prompts/list`, and argument completion when offered. */
export function createCommandSource(port: McpPort, options: McpSourceOptions = {}): CommandSource {
    const { serverId } = options;

    return {
        async search(query: SourceQuery): Promise<SourceResult<CommandItem>> {
            const page = await port.listPrompts(query.cursor);
            const items = page.prompts
                .filter((prompt) => matches(query.query, prompt.title, prompt.name))
                .map((prompt) => toCommandItem(prompt, serverId));

            return { items, ...cacheHints(page) };
        },

        completeArgument: port.complete
            ? async (command, argument, partial, signal) => {
                  const result = await port.complete!(
                      { type: 'prompt', name: command },
                      { name: argument, value: partial },
                      signal,
                  );
                  return result.values;
              }
            : undefined,
    };
}
