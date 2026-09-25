import { useCallback, useEffect, useRef, useState } from 'react';
import type { SourceResult } from './types';

interface CacheEntry<TItem> {
    readonly result: SourceResult<TItem>;
    readonly expiresAt: number;
}

export interface UseSourceQueryOptions<TItem> {
    /** Skips the call entirely while false — nothing is fetched for a closed menu. */
    readonly enabled?: boolean;
    search(query: {
        query: string;
        cursor?: string;
        signal?: AbortSignal;
    }): Promise<SourceResult<TItem>>;
    /** Namespaces the cache, so two triggers do not share results. */
    readonly cacheKey: string;
    /**
     * Wait after the last keystroke before asking.
     *
     * @default 120
     */
    readonly debounceMs?: number;
    /**
     * Used when a result carries no `ttlMs` of its own.
     *
     * Sources are expected to say how long a result stays fresh, and the ones
     * that do are honoured. This is only the floor for those that do not.
     *
     * @default 30000
     */
    readonly defaultTtlMs?: number;
}

export interface UseSourceQueryReturn<TItem> {
    readonly items: readonly TItem[];
    readonly loading: boolean;
    readonly error: unknown;
    /** Present while there are more pages. */
    readonly loadMore: (() => void) | undefined;
}

/**
 * Runs a trigger's source, with caching and pagination.
 *
 * Three things this exists to get right, all of which bite only against a real
 * server:
 *
 * **Caching.** Every list endpoint returns a freshness hint, and a menu that
 * ignores it re-asks on every keystroke. Results are held until they expire.
 *
 * **Cursors.** Lists are paginated, so the useful match may not be on the
 * first page. Pages accumulate rather than replacing.
 *
 * **Cancellation.** Typing faster than the source responds means several
 * requests in flight, and without aborting the stale ones a slow early
 * response lands after a fast later one and overwrites it.
 */
export function useSourceQuery<TItem>(
    query: string,
    options: UseSourceQueryOptions<TItem>,
): UseSourceQueryReturn<TItem> {
    const { enabled = true, search, cacheKey, debounceMs = 120, defaultTtlMs = 30_000 } = options;

    const [items, setItems] = useState<readonly TItem[]>([]);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(undefined);

    const cache = useRef(new Map<string, CacheEntry<TItem>>());
    const abort = useRef<AbortController | null>(null);
    // Ref rather than a dependency: a source is usually rebuilt on every
    // render, and depending on it would refetch on every render.
    const searchRef = useRef(search);
    searchRef.current = search;

    const run = useCallback(
        async (nextQuery: string, nextCursor: string | undefined, append: boolean) => {
            // Aborted before the cache is consulted, not after.
            //
            // The other order looks harmless and is not: a query served from
            // cache returned early, leaving the previous request in flight and
            // un-aborted. It then passed its own `aborted` check and called
            // `setItems`, painting an older query's results over a newer
            // query's. The debounce makes that the *likely* path rather than a
            // race — typing `@`, `@a`, `@ab` only ever executes `ab`, so `ab`
            // is cached and `a` is not, and backspacing one character does it.
            abort.current?.abort();
            abort.current = null;

            const key = `${cacheKey}:${nextQuery}:${nextCursor ?? ''}`;
            const cached = cache.current.get(key);

            if (cached && cached.expiresAt > Date.now()) {
                setItems((current) =>
                    append ? [...current, ...cached.result.items] : cached.result.items,
                );
                setCursor(cached.result.nextCursor);
                // The abandoned request will not clear these itself: from its
                // point of view it was cancelled, so its `finally` declines to
                // touch state that might belong to someone newer. Here, that
                // someone is us.
                setLoading(false);
                setError(undefined);
                return;
            }

            const controller = new AbortController();
            abort.current = controller;

            setLoading(true);
            setError(undefined);

            try {
                const result = await searchRef.current({
                    query: nextQuery,
                    cursor: nextCursor,
                    signal: controller.signal,
                });

                if (controller.signal.aborted) return;

                cache.current.set(key, {
                    result,
                    expiresAt: Date.now() + (result.ttlMs ?? defaultTtlMs),
                });

                setItems((current) => (append ? [...current, ...result.items] : result.items));
                setCursor(result.nextCursor);
            } catch (thrown) {
                if (!controller.signal.aborted) setError(thrown);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        },
        [cacheKey, defaultTtlMs],
    );

    useEffect(() => {
        if (!enabled) {
            abort.current?.abort();
            setItems([]);
            setCursor(undefined);
            setLoading(false);
            return;
        }

        const timer = setTimeout(() => void run(query, undefined, false), debounceMs);
        return () => clearTimeout(timer);
    }, [enabled, query, debounceMs, run]);

    useEffect(() => () => abort.current?.abort(), []);

    return {
        items,
        loading,
        error,
        loadMore: cursor === undefined ? undefined : () => void run(query, cursor, true),
    };
}
