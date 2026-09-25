import { useCallback, useRef } from 'react';

/**
 * Keeps focus somewhere sensible when the focused control disappears.
 *
 * The sweep found the same failure in three places — approval options on
 * decide, attachment chips on remove, the elicitation form on submit — and one
 * cause: there was no `.focus()` call anywhere in the directory. When a control
 * removes itself, the browser drops focus to `<body>`, and a keyboard user
 * loses their place in a transcript that may be hundreds of entries long. It is
 * silent, so it reads as the page having jumped.
 *
 * The retention target is captured *before* the action, because by the time the
 * element is gone there is nothing left to ask.
 *
 * @example
 * ```tsx
 * const retain = useFocusRetention();
 *
 * <div ref={retain.containerRef}>
 *   <button onClick={() => { retain.capture(); decide(option); }}>Allow</button>
 * </div>
 * ```
 */
export interface UseFocusRetentionReturn {
    /** Attach to the element that survives the action. */
    readonly containerRef: React.RefCallback<HTMLElement>;
    /** Call before the action that removes the focused control. */
    readonly capture: () => void;
}

export function useFocusRetention(): UseFocusRetentionReturn {
    const container = useRef<HTMLElement | null>(null);
    const armed = useRef(false);

    const containerRef = useCallback((node: HTMLElement | null) => {
        container.current = node;

        // The element arrived or changed; if something asked us to retain
        // focus, this is the moment it became possible.
        if (node && armed.current) {
            armed.current = false;
            if (!node.contains(node.ownerDocument.activeElement)) {
                node.focus?.();
            }
        }
    }, []);

    const capture = useCallback(() => {
        const node = container.current;
        if (!node) return;

        armed.current = true;

        // Made focusable only if it is not already: adding a tab stop to
        // something that has one would put an extra stop in the sequence for
        // every card on screen.
        if (!node.hasAttribute('tabindex') && node.tabIndex < 0) {
            node.setAttribute('tabindex', '-1');
        }

        // A microtask, not an effect: the control disappears during the same
        // commit, and waiting for a later render means a frame with focus on
        // `<body>` — which some screen readers announce.
        queueMicrotask(() => {
            if (!armed.current) return;
            armed.current = false;

            const current = container.current;
            if (current && !current.contains(current.ownerDocument.activeElement)) {
                current.focus?.();
            }
        });
    }, []);

    return { containerRef, capture };
}
