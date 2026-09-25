import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface UseStickToBottomOptions {
    /**
     * How many pixels from the bottom still counts as being at the bottom.
     *
     * Not zero, and not a rounding allowance either. Fractional device pixel
     * ratios make `scrollHeight - scrollTop - clientHeight` land a pixel or two
     * off at the true bottom, and a user who stops scrolling *near* the end
     * means to keep following. A few dozen pixels covers both.
     *
     * @default 32
     */
    readonly threshold?: number;
    /**
     * Anything that changes when the content changes — normally the entry list.
     *
     * Growth is also watched with a ResizeObserver, which catches late layout
     * shifts from images and fonts. This covers the common case directly and
     * synchronously, before the browser paints the taller content.
     */
    readonly dependency?: unknown;
}

export interface UseStickToBottomReturn<
    TContainer extends HTMLElement = HTMLDivElement,
    TContent extends HTMLElement = HTMLDivElement,
> {
    /** Attach to the scrolling element. */
    readonly containerRef: React.RefObject<TContainer | null>;
    /**
     * Attach to the element that grows inside it.
     *
     * A callback ref rather than a ref object, and that is the fix rather than
     * a preference. A ref object is populated during commit and never notifies,
     * so an effect that reads it has exactly one chance — and on the ordinary
     * startup path there is nothing to read, because a transcript that starts
     * empty renders a placeholder carrying no content ref at all. The observer
     * effect found null at mount, had `[]` deps, and never ran again: verified
     * with an instrumented observer, zero elements were observed for the rest
     * of the session.
     */
    readonly contentRef: React.RefCallback<TContent>;
    /** True while output is being followed. */
    readonly isPinned: boolean;
    readonly scrollToBottom: (behavior?: ScrollBehavior) => void;
}

function distanceFromBottom(element: HTMLElement): number {
    return element.scrollHeight - element.scrollTop - element.clientHeight;
}

/**
 * Follows growing content, and stops the moment the reader does not want it to.
 *
 * The naive version of this — scroll to the bottom whenever the content
 * changes — is what the `agent-ide` demo does, and it is actively hostile in a
 * long run: scroll up to read a tool result and the next chunk yanks you back
 * down. It is invisible across ten scripted steps and unusable across two
 * hundred real ones.
 *
 * So the pin is a piece of state the *reader* owns. Scrolling away releases it,
 * returning to the bottom restores it, and nothing else moves the viewport.
 *
 * @example
 * ```tsx
 * const { containerRef, contentRef, isPinned, scrollToBottom } =
 *   useStickToBottom({ dependency: entries });
 *
 * // `contentRef` is a callback ref — attach it to whichever element is
 * // currently holding the content, including one that appears later.
 * <div ref={containerRef} className={scroll}>
 *   <div ref={contentRef}>{children}</div>
 * </div>
 * {!isPinned && <button onClick={() => scrollToBottom()}>Jump to latest</button>}
 * ```
 */
export function useStickToBottom<
    TContainer extends HTMLElement = HTMLDivElement,
    TContent extends HTMLElement = HTMLDivElement,
>({ threshold = 32, dependency }: UseStickToBottomOptions = {}): UseStickToBottomReturn<
    TContainer,
    TContent
> {
    const containerRef = useRef<TContainer | null>(null);

    // State, not a ref: the observer effect has to re-run when the element
    // arrives, and it arrives after mount whenever the transcript starts empty.
    const [content, setContent] = useState<TContent | null>(null);
    const contentRef = useCallback((node: TContent | null) => {
        setContent(node);
    }, []);

    const [isPinned, setIsPinned] = useState(true);
    // Mirrored in a ref so the scroll and resize handlers can read it without
    // being torn down and re-attached every time it flips.
    const pinnedRef = useRef(true);

    const setPinned = useCallback((next: boolean) => {
        if (pinnedRef.current === next) return;
        pinnedRef.current = next;
        setIsPinned(next);
    }, []);

    const scrollToBottom = useCallback(
        (behavior: ScrollBehavior = 'auto') => {
            const container = containerRef.current;
            if (!container) return;

            setPinned(true);

            if (behavior === 'smooth' && typeof container.scrollTo === 'function') {
                container.scrollTo({ top: container.scrollHeight, behavior });
                return;
            }
            // Direct assignment rather than scrollTo: it is synchronous, which
            // matters when more content is about to arrive, and it works in
            // environments where scrollTo is a stub.
            container.scrollTop = container.scrollHeight;
        },
        [setPinned],
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => {
            setPinned(distanceFromBottom(container) <= threshold);
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        return () => container.removeEventListener('scroll', onScroll);
    }, [threshold, setPinned]);

    // Layout effect, not effect: the follow has to happen in the same frame the
    // taller content is committed, or the viewport visibly jumps.
    useLayoutEffect(() => {
        if (!pinnedRef.current) return;
        const container = containerRef.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [dependency]);

    // Catches growth the dependency does not describe — an image finishing,
    // a font swapping, a tool body being expanded.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !content || typeof ResizeObserver === 'undefined') return;

        const observer = new ResizeObserver(() => {
            if (!pinnedRef.current) return;
            container.scrollTop = container.scrollHeight;
        });

        observer.observe(content);
        return () => observer.disconnect();
    }, [content]);

    return { containerRef, contentRef, isPinned, scrollToBottom };
}
