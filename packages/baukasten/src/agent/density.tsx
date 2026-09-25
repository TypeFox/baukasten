/**
 * How much room these components should assume they have.
 *
 * Every other kit in this space designs for a centred 700px reading column and
 * adds responsive behaviour afterwards. For this audience that is backwards:
 * the primary shape is a docked side panel around 300px wide, and the full
 * editor tab is the second case. Designing for the narrow one first is most of
 * what makes these feel native in an IDE rather than transplanted from a chat
 * app.
 *
 * A context rather than a prop on each component, because density is a property
 * of *where the panel is*, and the components inside it should not each have to
 * be told again. A prop still wins where one is passed — a comparison view
 * showing both is a legitimate thing to build.
 */

import React, { createContext, useContext, useMemo } from 'react';

export type Density = 'compact' | 'comfortable';

const DensityContext = createContext<Density>('comfortable');

export interface DensityProviderProps {
    density: Density;
    children: React.ReactNode;
}

/**
 * Sets the density for everything inside.
 *
 * @example
 * ```tsx
 * <DensityProvider density={width < 420 ? 'compact' : 'comfortable'}>
 *   <Transcript entries={entries} />
 * </DensityProvider>
 * ```
 */
export const DensityProvider: React.FC<DensityProviderProps> = ({ density, children }) => (
    <DensityContext.Provider value={density}>{children}</DensityContext.Provider>
);

DensityProvider.displayName = 'DensityProvider';

/**
 * The density in force, with an optional override.
 *
 * @param override - A component's own prop, which wins when supplied.
 */
export function useDensity(override?: Density): Density {
    const inherited = useContext(DensityContext);
    return override ?? inherited;
}

/**
 * Density from a measured width, for hosts that want it decided for them.
 *
 * The threshold is where the composer's two-control footer stops fitting side
 * by side, which is the first thing to break as the panel narrows — measured,
 * not guessed.
 */
export function densityForWidth(width: number, threshold = 420): Density {
    return width < threshold ? 'compact' : 'comfortable';
}

/**
 * Tracks an element's width and reports the density for it.
 *
 * Offered because the alternative every consumer writes is a `ResizeObserver`
 * plus a threshold constant, and they will pick a different threshold from ours
 * and from each other's.
 */
export function useAutoDensity(threshold = 420): {
    readonly ref: React.RefCallback<HTMLElement>;
    readonly density: Density;
} {
    const [width, setWidth] = React.useState<number | null>(null);
    // State, not a ref: the observer effect has to re-run when the element
    // arrives, and it may arrive after mount.
    const [element, setElement] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!element || typeof ResizeObserver === 'undefined') return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) setWidth(entry.contentRect.width);
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [element]);

    const ref = React.useCallback((node: HTMLElement | null) => {
        setElement(node);
    }, []);

    return useMemo(
        () => ({
            ref,
            // Before anything is measured, assume the narrow case. Guessing wide
            // and correcting produces a visible reflow on every mount in the
            // shape this library is primarily for.
            density: width === null ? 'compact' : densityForWidth(width, threshold),
        }),
        [ref, width, threshold],
    );
}
