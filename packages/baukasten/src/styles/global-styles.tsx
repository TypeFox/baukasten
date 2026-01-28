import { cssVariablesWithGlobalStyles } from './css-variables';
import '@vscode/codicons/dist/codicon.css';

/**
 * Global styles component that injects all CSS custom properties
 * 
 * This component provides runtime injection of design tokens and global styles.
 * It uses the same CSS definitions as the pre-built CSS files, ensuring consistency.
 *
 * @example Using GlobalStyles component:
 * ```tsx
 * import { GlobalStyles } from 'baukasten-ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 *
 * @example Using pre-built CSS files (alternative approach):
 * ```tsx
 * // In your entry file
 * import 'baukasten-ui/dist/baukasten-base.css';
 * import 'baukasten-ui/dist/baukasten-vscode.css'; // or baukasten-theia.css or baukasten-web.css
 * ```
 * 
 * Both approaches use the same token definitions. Choose based on your needs:
 * - Use `GlobalStyles` for dynamic runtime injection
 * - Use pre-built CSS files for better performance and simpler SSR setup
 */
export const GlobalStyles = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: cssVariablesWithGlobalStyles,
      }}
    />
  );
};

export default GlobalStyles;
