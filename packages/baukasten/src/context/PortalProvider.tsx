import { createContext, useContext, type ReactNode } from 'react';

/**
 * Context for configuring the portal root element
 * 
 * This is essential for multi-window applications (like Eclipse Theia)
 * where components rendered in secondary windows need their portals
 * to target the correct window's DOM rather than the main window.
 */
export interface PortalContextValue {
    /**
     * The root element for rendering portals
     * When null, portals will use their default behavior (document.body)
     */
    root: HTMLElement | null;
}

const PortalContext = createContext<PortalContextValue>({ root: null });

/**
 * Props for the PortalProvider component
 */
export interface PortalProviderProps {
    /**
     * The root element where portals should be rendered
     * 
     * In multi-window applications (like Eclipse Theia), this should be
     * an element in the current window to ensure dropdowns, tooltips,
     * and other portaled content appear in the correct window.
     * 
     * @example
     * ```tsx
     * // For Theia secondary windows, use a ref to an element in that window
     * const containerRef = useRef<HTMLDivElement>(null);
     * 
     * return (
     *   <div ref={containerRef}>
     *     <PortalProvider root={containerRef.current}>
     *       <YourApp />
     *     </PortalProvider>
     *   </div>
     * );
     * ```
     * 
     * @example
     * ```tsx
     * // Or use the window's document body directly
     * <PortalProvider root={window.document.body}>
     *   <YourApp />
     * </PortalProvider>
     * ```
     */
    root: HTMLElement | null;

    /**
     * The content to render within this portal context
     */
    children: ReactNode;
}

/**
 * PortalProvider component
 * 
 * Provides a context for specifying where portal content (dropdowns, tooltips,
 * modals, etc.) should be rendered. This is critical for multi-window applications
 * like Eclipse Theia where content in secondary windows needs portals to render
 * in the same window.
 * 
 * **Problem solved:**
 * Without PortalProvider, portal-based components (Select, Dropdown, Tooltip, etc.)
 * render their floating content to the main window's document.body. In multi-window
 * scenarios, this causes dropdowns opened in a secondary window to appear in the
 * main window instead.
 * 
 * **Usage:**
 * 
 * @example
 * ```tsx
 * // Basic usage - wrap your app at the root level
 * function App() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const [mounted, setMounted] = useState(false);
 *   
 *   useEffect(() => setMounted(true), []);
 *   
 *   return (
 *     <div ref={containerRef} id="app-root">
 *       {mounted && (
 *         <PortalProvider root={containerRef.current}>
 *           <Select options={options} />
 *           <Tooltip content="Hello">
 *             <Button>Hover me</Button>
 *           </Tooltip>
 *         </PortalProvider>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Theia secondary window example
 * function SecondaryWindowContent() {
 *   // Use a ref to ensure portals render in this window
 *   const rootRef = useRef<HTMLDivElement>(null);
 *   const [ready, setReady] = useState(false);
 *   
 *   useEffect(() => setReady(true), []);
 *   
 *   return (
 *     <div ref={rootRef} className="secondary-window-container">
 *       {ready && (
 *         <PortalProvider root={rootRef.current}>
 *           <MyComponentWithDropdowns />
 *         </PortalProvider>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * **Note:** If PortalProvider is not used, components will fall back to their
 * default portal behavior (rendering to document.body), which works fine for
 * single-window applications.
 */
export function PortalProvider({ root, children }: PortalProviderProps) {
    return (
        <PortalContext.Provider value={{ root }}>
            {children}
        </PortalContext.Provider>
    );
}

/**
 * Hook to access the portal root element from context
 * 
 * Returns null if no PortalProvider is present, which signals components
 * to use their default portal behavior.
 * 
 * @returns The portal root element or null
 * 
 * @example
 * ```tsx
 * function MyPortalComponent() {
 *   const portalRoot = usePortalRoot();
 *   
 *   return (
 *     <FloatingPortal root={portalRoot}>
 *       <div>Portal content</div>
 *     </FloatingPortal>
 *   );
 * }
 * ```
 */
export function usePortalRoot(): HTMLElement | null {
    const context = useContext(PortalContext);
    return context.root;
}
