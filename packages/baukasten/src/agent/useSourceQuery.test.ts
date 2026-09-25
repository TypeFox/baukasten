import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSourceQuery } from './useSourceQuery';
import type { SourceResult } from './types';

/**
 * A source whose slow queries are resolved by the test, not by a timer.
 *
 * The failure here is an ordering one, and ordering pinned with `setTimeout`
 * is a flake waiting to happen. Holding the promise open until the test says
 * so makes "the stale response lands after the fresh one" exact.
 */
function controllableSource() {
    const pending = new Map<string, (result: SourceResult<string>) => void>();

    return {
        pending,
        search({ query }: { query: string }): Promise<SourceResult<string>> {
            if (query === 'ab') {
                return Promise.resolve({ items: ['ab-result'], ttlMs: 60_000 });
            }

            return new Promise((resolve) => pending.set(query, resolve));
        },
    };
}

describe('useSourceQuery (T-86)', () => {
    it('does not let a request abandoned by a cache hit overwrite the cached results', async () => {
        const source = controllableSource();

        const { result, rerender } = renderHook(
            ({ query }) =>
                useSourceQuery<string>(query, {
                    search: source.search,
                    cacheKey: 'mention',
                    debounceMs: 0,
                }),
            { initialProps: { query: 'ab' } },
        );

        await waitFor(() => expect(result.current.items).toEqual(['ab-result']));

        // Backspace. Not cached, so a request starts and does not finish.
        rerender({ query: 'a' });
        await waitFor(() => expect(source.pending.has('a')).toBe(true));

        // Type it back. Served from cache, which used to return before the
        // abort and so left the `a` request alive.
        rerender({ query: 'ab' });
        await waitFor(() => expect(result.current.items).toEqual(['ab-result']));

        await act(async () => {
            source.pending.get('a')!({ items: ['a-result'] });
        });

        expect(result.current.items).toEqual(['ab-result']);
    });

    it('clears loading when a cache hit abandons a request', async () => {
        const source = controllableSource();

        const { result, rerender } = renderHook(
            ({ query }) =>
                useSourceQuery<string>(query, {
                    search: source.search,
                    cacheKey: 'mention',
                    debounceMs: 0,
                }),
            { initialProps: { query: 'ab' } },
        );

        await waitFor(() => expect(result.current.items).toEqual(['ab-result']));

        rerender({ query: 'a' });
        await waitFor(() => expect(result.current.loading).toBe(true));

        rerender({ query: 'ab' });

        // The abandoned request's `finally` will not clear this — it sees
        // itself as cancelled — so without the cache path doing it, the menu
        // claims to be searching for the rest of the session.
        await waitFor(() => expect(result.current.loading).toBe(false));
    });
});
