import { useCallback, useEffect, useState } from 'react';
import { darkModern, lightModern } from 'baukasten-ui-web-wrapper';
import Workbench from './Workbench';

export type ThemeMode = 'light' | 'dark';

/** Messages exchanged with the docs page hosting this app in an iframe. */
const THEME_MESSAGE = 'baukasten:theme';
const FULLSCREEN_MESSAGE = 'baukasten:fullscreen';

function readInitialTheme(): ThemeMode {
    const fromQuery = new URLSearchParams(window.location.search).get('theme');
    if (fromQuery === 'light' || fromQuery === 'dark') {
        return fromQuery;
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Applies the VS Code theme variables to the document root.
 *
 * This is what `VSCodeThemeWrapper` does, minus its markup: the wrapper nests
 * the app in two auto-height divs, which breaks the `height: 100%` chain the
 * workbench needs to fill the iframe.
 */
function applyTheme(mode: ThemeMode) {
    const theme = mode === 'dark' ? darkModern : lightModern;
    const root = document.documentElement;

    for (const [name, value] of Object.entries(theme.variables)) {
        root.style.setProperty(name, value);
    }

    root.classList.remove('vscode-dark', 'vscode-light');
    root.classList.add(mode === 'dark' ? 'vscode-dark' : 'vscode-light');
    document.body.style.backgroundColor = theme.variables['--vscode-editor-background'];
    document.body.style.color = theme.variables['--vscode-editor-foreground'];
}

export default function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>(readInitialTheme);

    useEffect(() => {
        applyTheme(themeMode);
    }, [themeMode]);

    // The host page owns the theme picker; it pushes changes down to us.
    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            // Same-origin only — the app is served from the docs site itself.
            if (event.origin !== window.location.origin) return;

            const data = event.data as { type?: string; theme?: ThemeMode } | null;
            if (data?.type !== THEME_MESSAGE) return;
            if (data.theme === 'light' || data.theme === 'dark') {
                setThemeMode(data.theme);
            }
        };

        window.addEventListener('message', onMessage);
        // Tell the host we are ready to receive the current theme.
        window.parent?.postMessage({ type: `${THEME_MESSAGE}:ready` }, window.location.origin);

        return () => window.removeEventListener('message', onMessage);
    }, []);

    const handleFullscreenChange = useCallback((fullscreen: boolean) => {
        if (window.parent === window) return;
        window.parent.postMessage({ type: FULLSCREEN_MESSAGE, fullscreen }, window.location.origin);
    }, []);

    return <Workbench themeMode={themeMode} onFullscreenChange={handleFullscreenChange} />;
}
