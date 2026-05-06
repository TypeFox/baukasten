'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
}

function getBrowserThemePreference(): ThemeMode {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return 'light';
    }

    return window.matchMedia(PREFERS_DARK_QUERY).matches ? 'dark' : 'light';
}

function getInitialThemeMode(): ThemeMode {
    return getStoredThemePreference() ?? getBrowserThemePreference();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
    const [hasUserPreference, setHasUserPreference] = useState<boolean>(
        () => getStoredThemePreference() !== null,
    );

    // Follow system theme changes only when no explicit user preference is saved.
    // Re-runs when hasUserPreference changes so the listener is cleaned up once the user sets a preference.
    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }

        if (hasUserPreference) {
            return;
        }

        const mediaQuery = window.matchMedia(PREFERS_DARK_QUERY);
        const updateThemeFromSystem = () => {
            setThemeMode(mediaQuery.matches ? 'dark' : 'light');
        };

        updateThemeFromSystem();
        mediaQuery.addEventListener('change', updateThemeFromSystem);

        return () => {
            mediaQuery.removeEventListener('change', updateThemeFromSystem);
        };
    }, [hasUserPreference]);

    // Apply theme whenever it changes
    useEffect(() => {
        const theme = themeMode === 'light' ? lightModern : darkModern;
        const root = document.documentElement;

        // Apply CSS variables
        Object.entries(theme.variables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Add/remove theme classes for components that need them (like CodeBlock)
        root.classList.remove('vscode-dark', 'vscode-light');
        root.classList.add(themeMode === 'light' ? 'vscode-light' : 'vscode-dark');

        document.body.style.backgroundColor = theme.variables['--vscode-editor-background'];
        document.body.style.color = theme.variables['--vscode-editor-foreground'];
        document.body.style.fontFamily =
            theme.variables['--vscode-editor-font-family'] ||
            "'Segoe UI Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
    }, [themeMode]);

    const setTheme = (mode: ThemeMode) => {
        setThemeMode(mode);
        setHasUserPreference(true);
        localStorage.setItem(THEME_STORAGE_KEY, mode);
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
