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

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            return (stored === 'light' || stored === 'dark') ? stored : 'light';
        }
        return 'light';
    });

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
        document.body.style.fontFamily = theme.variables['--vscode-editor-font-family'] || "'Segoe UI Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
    }, [themeMode]);

    const setTheme = (mode: ThemeMode) => {
        setThemeMode(mode);
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
