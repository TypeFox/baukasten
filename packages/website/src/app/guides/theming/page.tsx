'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code, Button, Badge, Icon, Alert } from '@baukasten/ui';

export default function ThemingGuidePage() {
    return (
        <PageLayout
            title="Theming Guide"
            description="Learn how to customize and theme Baukasten components to match your application's design."
        >
            <Alert variant="info" style={{ marginBottom: 'var(--spacing-8)' }}>
                <Icon name="lightbulb" style={{ marginRight: 'var(--spacing-2)' }} />
                Baukasten is built with VSCode's theming system in mind, making it automatically compatible with all VSCode color themes.
            </Alert>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Overview
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Baukasten uses CSS variables (custom properties) for theming, which allows for dynamic theme switching
                    at runtime without recompiling your application. All components reference these CSS variables, making it
                    easy to create consistent themes across your entire application.
                </p>
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Theme Architecture
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Baukasten's theming system is built on three core concepts:
                </p>
                <div style={{
                    display: 'grid',
                    gap: 'var(--spacing-5)',
                    marginBottom: 'var(--spacing-6)',
                }}>
                    <div style={{
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-6)',
                    }}>
                        <h3 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            marginBottom: 'var(--spacing-3)',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Icon name="symbol-color" style={{ marginRight: 'var(--spacing-2)' }} />
                            1. VSCode Theme Variables
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Base variables that map directly to VSCode's theming system (e.g., <Code>--vscode-button-background</Code>).
                            These are automatically provided when used in VSCode extensions.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-6)',
                    }}>
                        <h3 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            marginBottom: 'var(--spacing-3)',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Icon name="symbol-variable" style={{ marginRight: 'var(--spacing-2)' }} />
                            2. Semantic Theme Tokens
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Higher-level semantic tokens that provide meaning (e.g., <Code>--color-primary</Code>, <Code>--color-success</Code>).
                            These map to VSCode variables but can be overridden for web applications.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-6)',
                    }}>
                        <h3 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            marginBottom: 'var(--spacing-3)',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Icon name="wrench" style={{ marginRight: 'var(--spacing-2)' }} />
                            3. Component-Level Customization
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Individual components can be styled using inline styles or by overriding their specific CSS variables.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Using Themes in Web Applications
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Baukasten provides ready-to-use theme presets for web applications through the <Code>@baukasten/web-wrapper</Code> package.
                </p>

                <h3 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Setting Up a Theme Provider
                </h3>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Create a theme context to manage theme switching in your application:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { createContext, useContext, useState, useEffect } from 'react';
import { lightModern, darkModern } from '@baukasten/web-wrapper';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  // Apply theme whenever it changes
  useEffect(() => {
    const theme = themeMode === 'light' ? lightModern : darkModern;
    const root = document.documentElement;

    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    document.body.style.backgroundColor = 
      theme.variables['--vscode-editor-background'];
    document.body.style.color = 
      theme.variables['--vscode-editor-foreground'];
  }, [themeMode]);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('theme-preference', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Creating a Theme Picker
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Build a theme picker component to let users switch between light and dark themes:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { useTheme } from './ThemeContext';
import { Button, Icon } from '@baukasten/ui';

export default function ThemePicker() {
  const { themeMode, setTheme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--spacing-2)',
      padding: 'var(--spacing-2)',
      backgroundColor: 'var(--vscode-editor-background)',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--vscode-panel-border)',
    }}>
      <Button
        variant={themeMode === 'light' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => setTheme('light')}
        style={{ flex: 1 }}
      >
        <Icon name="circle-outline" />
        Light
      </Button>
      <Button
        variant={themeMode === 'dark' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => setTheme('dark')}
        style={{ flex: 1 }}
      >
        <Icon name="circle-filled" />
        Dark
      </Button>
    </div>
  );
}`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Available Theme Presets
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Baukasten comes with several built-in theme presets that you can use in your web applications:
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--spacing-5)',
                }}>
                    <div style={{
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-6)',
                    }}>
                        <Badge variant="default" style={{ marginBottom: 'var(--spacing-3)' }}>
                            Light Theme
                        </Badge>
                        <h4 style={{
                            fontSize: 'var(--font-size-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            marginBottom: 'var(--spacing-2)',
                        }}>
                            <Code>lightModern</Code>
                        </h4>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Clean, bright theme inspired by VSCode's default light theme
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-6)',
                    }}>
                        <Badge variant="default" style={{ marginBottom: 'var(--spacing-3)' }}>
                            Dark Theme
                        </Badge>
                        <h4 style={{
                            fontSize: 'var(--font-size-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            marginBottom: 'var(--spacing-2)',
                        }}>
                            <Code>darkModern</Code>
                        </h4>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Professional dark theme matching VSCode's modern dark theme
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Creating Custom Themes
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    You can create custom themes by defining your own CSS variables. Here's how to create a custom theme object:
                </p>
                <CodeBlock
                    language="typescript"
                    code={`import { Theme } from '@baukasten/web-wrapper';

export const customTheme: Theme = {
  name: 'Custom Theme',
  variables: {
    // Editor colors
    '--vscode-editor-background': '#1a1a2e',
    '--vscode-editor-foreground': '#e0e0e0',
    
    // Button colors
    '--vscode-button-background': '#6c5ce7',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#5f4dd1',
    
    // Input colors
    '--vscode-input-background': '#16213e',
    '--vscode-input-foreground': '#e0e0e0',
    '--vscode-input-border': '#3e4c5e',
    
    // Focus border
    '--vscode-focusBorder': '#6c5ce7',
    
    // Sidebar
    '--vscode-sideBar-background': '#0f1419',
    '--vscode-sideBar-foreground': '#e0e0e0',
    '--vscode-sideBar-border': '#2a2e35',
    
    // Lists
    '--vscode-list-hoverBackground': '#1e2730',
    '--vscode-list-activeSelectionBackground': '#2e3440',
    '--vscode-list-activeSelectionForeground': '#ffffff',
    
    // Add more variables as needed...
  }
};`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Overriding Theme Variables
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    You can override specific theme variables globally in your CSS:
                </p>
                <CodeBlock
                    language="css"
                    code={`:root {
  /* Override button colors */
  --vscode-button-background: #007acc;
  --vscode-button-hoverBackground: #005a9e;
  
  /* Override borders */
  --vscode-panel-border: #2a2d3e;
  
  /* Override spacing */
  --spacing-4: 16px;
  --spacing-6: 24px;
}`}
                />

                <h3 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginTop: 'var(--spacing-8)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Component-Specific Overrides
                </h3>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    For component-specific customization, use inline styles with CSS variables:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { Button } from '@baukasten/ui';

function CustomButton() {
  return (
    <Button
      variant="primary"
      style={{
        backgroundColor: 'var(--vscode-button-background)',
        '--vscode-button-background': '#ff6b6b',
        '--vscode-button-hoverBackground': '#ee5a52',
      } as React.CSSProperties}
    >
      Custom Styled Button
    </Button>
  );
}`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Theme Variables Reference
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Here are the most commonly used theme variables in Baukasten:
                </p>

                <div style={{
                    backgroundColor: 'var(--vscode-sideBar-background)',
                    border: '1px solid var(--vscode-panel-border)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-6)',
                    marginBottom: 'var(--spacing-6)',
                }}>
                    <h3 style={{
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        Colors
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--vscode-editor-background</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Main background color</span>
                        <Code>--vscode-editor-foreground</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Main text color</span>
                        <Code>--vscode-button-background</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Primary button background</span>
                        <Code>--vscode-focusBorder</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Focus indicator color</span>
                        <Code>--vscode-panel-border</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Border color for panels</span>
                    </div>
                </div>

                <div style={{
                    backgroundColor: 'var(--vscode-sideBar-background)',
                    border: '1px solid var(--vscode-panel-border)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-6)',
                }}>
                    <h3 style={{
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        Spacing
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--spacing-2</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Extra small spacing (4px)</span>
                        <Code>--spacing-4</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Small spacing (8px)</span>
                        <Code>--spacing-6</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Medium spacing (12px)</span>
                        <Code>--spacing-8</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Large spacing (16px)</span>
                        <Code>--spacing-12</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Extra large spacing (24px)</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Best Practices
                </h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-4)',
                }}>
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-5)',
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--vscode-testing-iconPassed)',
                            flexShrink: 0,
                            marginTop: '4px',
                        }} />
                        <div>
                            <strong>Always use CSS variables</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Use CSS variables instead of hardcoded colors to ensure theme compatibility
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-5)',
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--vscode-testing-iconPassed)',
                            flexShrink: 0,
                            marginTop: '4px',
                        }} />
                        <div>
                            <strong>Test with multiple themes</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Verify your components work well in both light and dark themes
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-5)',
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--vscode-testing-iconPassed)',
                            flexShrink: 0,
                            marginTop: '4px',
                        }} />
                        <div>
                            <strong>Use semantic tokens</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Prefer semantic variables like <Code>--color-primary</Code> over specific VSCode variables when building web apps
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-5)',
                        backgroundColor: 'var(--vscode-sideBar-background)',
                        border: '1px solid var(--vscode-panel-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--vscode-testing-iconPassed)',
                            flexShrink: 0,
                            marginTop: '4px',
                        }} />
                        <div>
                            <strong>Provide fallbacks</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                When using custom variables, provide fallback values: <Code>var(--custom-color, #default)</Code>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
