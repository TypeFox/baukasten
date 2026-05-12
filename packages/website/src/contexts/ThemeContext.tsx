'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { lightModern, darkModern } from 'baukasten-ui-web-wrapper';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    themeMode: ThemeMode;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme-preference';
const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';

function getStoredThemePreference(): ThemeMode | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
        return null;
    }
}

function applyThemeToDOM(mode: ThemeMode) {
    const theme = mode === 'light' ? lightModern : darkModern;
    const root = document.documentElement;

    Object.entries(theme.variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    root.classList.remove('vscode-dark', 'vscode-light');
    root.classList.add(mode === 'light' ? 'vscode-light' : 'vscode-dark');

    document.body.style.backgroundColor = theme.variables['--vscode-editor-background'];
    document.body.style.color = theme.variables['--vscode-editor-foreground'];
    document.body.style.fontFamily =
        theme.variables['--vscode-editor-font-family'] ||
        "'Segoe UI Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const userSetPreference = useRef(false);

    // Read stored/system preference after mount and apply CSS vars immediately to the DOM.
    // Applying directly here (rather than via a separate effect on themeMode) avoids a race
    // where the apply-effect fires first with the stale 'light' initial value and overwrites
    // the correct theme before the re-render from setThemeMode completes.
    useEffect(() => {
        const stored = getStoredThemePreference();
        if (stored !== null) {
            userSetPreference.current = true;
            setThemeMode(stored);
            applyThemeToDOM(stored);
            return;
        }

        // No stored preference — apply system preference and listen for changes
        if (typeof window.matchMedia !== 'function') {
            return;
        }

        const mediaQuery = window.matchMedia(PREFERS_DARK_QUERY);
        const updateThemeFromSystem = () => {
            if (!userSetPreference.current) {
                const mode: ThemeMode = mediaQuery.matches ? 'dark' : 'light';
                setThemeMode(mode);
                applyThemeToDOM(mode);
            }
        };

        updateThemeFromSystem();
        mediaQuery.addEventListener('change', updateThemeFromSystem);

        return () => {
            mediaQuery.removeEventListener('change', updateThemeFromSystem);
        };
    }, []);

    const setTheme = (mode: ThemeMode) => {
        userSetPreference.current = true;
        setThemeMode(mode);
        applyThemeToDOM(mode);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch {}
    };

    return (
        <ThemeContext.Provider value={{ themeMode, setTheme }}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
