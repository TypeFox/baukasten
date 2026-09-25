/**
 * Which rows are expanded, held above the rows themselves.
 *
 * A windowed list unmounts rows that scroll outside the overscan window, and a
 * row's `useState` goes with it. Left in the row, an expanded tool card
 * silently collapses when you scroll away and back — which reads as the
 * application forgetting what you did, and is the same class of failure as the
 * threshold-crossing remount that used to snap every open card shut at once.
 *
 * So the state lives above the list. The store is keyed by entry id, which is
 * stable across windowing, filtering and re-ordering — an index would not be.
 *
 * `Transcript` creates one automatically, so this fixes itself for most
 * consumers with no change. Wrap {@link ExpansionProvider} higher yourself when
 * something outside the transcript needs to reach it — a collapse-all button in
 * a filter bar, or expansion that should survive the transcript unmounting.
 */

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface ExpansionStore {
    /**
     * @param fallback - What this row does when nothing has been said about it,
     *   which is how a card with `defaultExpanded` keeps its own default.
     */
    isExpanded(id: string, fallback: boolean): boolean;
    toggle(id: string, fallback: boolean): void;
    setExpanded(id: string, expanded: boolean): void;
    expandAll(): void;
    collapseAll(): void;
}

/**
 * Null when nobody is providing, which is deliberate.
 *
 * It lets {@link useExpansion} fall back to local state, so a card rendered on
 * its own — in a story, in a test, in some surface that is not a transcript —
 * still expands without a provider bolted on.
 */
const ExpansionContext = createContext<ExpansionStore | null>(null);

interface State {
    /**
     * Set by expand-all or collapse-all; overrides every row's own default
     * until that row is toggled individually.
     *
     * Kept separate from the per-row map so that "collapse all" does not need
     * to know the ids of rows it has never seen — in a windowed list, most of
     * them have never been rendered.
     */
    readonly baseline: boolean | null;
    readonly rows: ReadonlyMap<string, boolean>;
}

const EMPTY: State = { baseline: null, rows: new Map() };

/** Creates a store. Use {@link ExpansionProvider} unless you need the value itself. */
export function useExpansionStore(): ExpansionStore {
    const [state, setState] = useState<State>(EMPTY);

    const isExpanded = useCallback(
        (id: string, fallback: boolean) => state.rows.get(id) ?? state.baseline ?? fallback,
        [state],
    );

    const setExpanded = useCallback((id: string, expanded: boolean) => {
        setState((current) => {
            const rows = new Map(current.rows);
            rows.set(id, expanded);
            return { ...current, rows };
        });
    }, []);

    const toggle = useCallback((id: string, fallback: boolean) => {
        setState((current) => {
            const rows = new Map(current.rows);
            rows.set(id, !(current.rows.get(id) ?? current.baseline ?? fallback));
            return { ...current, rows };
        });
    }, []);

    // Both clear the per-row map: after "collapse all", a row that was
    // individually expanded should be collapsed like everything else.
    const expandAll = useCallback(() => setState({ baseline: true, rows: new Map() }), []);
    const collapseAll = useCallback(() => setState({ baseline: false, rows: new Map() }), []);

    return useMemo(
        () => ({ isExpanded, toggle, setExpanded, expandAll, collapseAll }),
        [isExpanded, toggle, setExpanded, expandAll, collapseAll],
    );
}

export interface ExpansionProviderProps {
    children: React.ReactNode;
    /** An existing store, when you want to own it further up. */
    store?: ExpansionStore;
}

export const ExpansionProvider: React.FC<ExpansionProviderProps> = ({ children, store }) => {
    const own = useExpansionStore();
    return <ExpansionContext.Provider value={store ?? own}>{children}</ExpansionContext.Provider>;
};

ExpansionProvider.displayName = 'ExpansionProvider';

/** The store in force, or null if nothing is providing one. */
export function useExpansionContext(): ExpansionStore | null {
    return useContext(ExpansionContext);
}

/**
 * One row's expanded state.
 *
 * Uses the store above it when there is one and local state when there is not,
 * so a card works standalone. The hooks are both called unconditionally —
 * only which result is returned changes.
 *
 * @param id - Stable across windowing. An entry id, not an index.
 */
export function useExpansion(
    id: string | undefined,
    defaultExpanded = false,
): readonly [boolean, () => void] {
    const store = useContext(ExpansionContext);
    const [local, setLocal] = useState(defaultExpanded);

    const toggleLocal = useCallback(() => setLocal((current) => !current), []);
    const toggleShared = useCallback(() => {
        if (id !== undefined) store?.toggle(id, defaultExpanded);
    }, [store, id, defaultExpanded]);

    // No id means nothing stable to key on, so this row keeps its own state
    // even inside a transcript.
    if (!store || id === undefined) return [local, toggleLocal];

    return [store.isExpanded(id, defaultExpanded), toggleShared];
}
