import React, { useState, useEffect, ReactNode } from 'react';
import { themes, defaultTheme, getThemeById, VSCodeTheme } from './themes/index';

interface VSCodeThemeWrapperProps {
  children: ReactNode;
  defaultThemeId?: string;
  showThemeSelector?: boolean;
}

const THEME_STORAGE_KEY = 'vscode-theme-wrapper-theme-id';

/**
 * Gets the initial theme from localStorage, falling back to defaultThemeId or defaultTheme
 */
const getInitialTheme = (defaultThemeId?: string): VSCodeTheme => {
  // Try to get theme from localStorage first
  try {
    const storedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedThemeId) {
      const theme = getThemeById(storedThemeId);
      if (theme) {
        return theme;
      }
    }
  } catch (error) {
    // localStorage might not be available (e.g., in SSR or some browsers)
    console.warn('Failed to access localStorage:', error);
  }

  // Fall back to defaultThemeId prop or defaultTheme
  return defaultThemeId ? getThemeById(defaultThemeId) || defaultTheme : defaultTheme;
};

export const VSCodeThemeWrapper: React.FC<VSCodeThemeWrapperProps> = ({
  children,
  defaultThemeId,
  showThemeSelector = true,
}) => {
  const [currentTheme, setCurrentTheme] = useState<VSCodeTheme>(() => getInitialTheme(defaultThemeId));

  useEffect(() => {
    // Apply CSS variables to the root element
    const root = document.documentElement;
    Object.entries(currentTheme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply background, foreground, and font-family to body
    document.body.style.backgroundColor = currentTheme.variables['--vscode-editor-background'];
    document.body.style.color = currentTheme.variables['--vscode-editor-foreground'];
    document.body.style.fontFamily = currentTheme.variables['--vscode-editor-font-family'] || "'Segoe UI Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

    // Save theme ID to localStorage whenever it changes
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [currentTheme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = getThemeById(event.target.value);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <div style={{
      ...(showThemeSelector ? {
        display: 'flex', flexDirection: 'column', padding: '10px', gap: '16px'
      } : {}), backgroundColor: currentTheme.variables['--vscode-editor-background']
    }}>
      {showThemeSelector && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px',
            backgroundColor: currentTheme.variables['--vscode-editor-background'],
          }}
        >
          <div
            style={{
              backgroundColor: currentTheme.variables['--vscode-editorWidget-background'],
              padding: '8px 12px',
              borderRadius: '4px',
              border: `1px solid ${currentTheme.variables['--vscode-widget-border']}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            <label
              htmlFor="theme-selector"
              style={{
                color: currentTheme.variables['--vscode-editor-foreground'],
                fontWeight: 500,
              }}
            >
              Theme:
            </label>
            <select
              id="theme-selector"
              value={currentTheme.id}
              onChange={handleThemeChange}
              style={{
                backgroundColor: currentTheme.variables['--vscode-input-background'],
                color: currentTheme.variables['--vscode-input-foreground'],
                border: `1px solid ${currentTheme.variables['--vscode-input-border']}`,
                borderRadius: '2px',
                padding: '4px 8px',
                fontSize: '13px',
                fontFamily: 'inherit',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

// Hook to get current theme (useful for components that need theme info)
// Incomplete, maybe remove??
export const useVSCodeTheme = () => {
  const [theme] = useState<VSCodeTheme>(defaultTheme);

  useEffect(() => {
    // This is a simple implementation; in production you might want to use Context
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      // Theme changed, update if needed
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};

