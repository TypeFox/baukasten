'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code, Button, Badge, Icon, Alert } from 'baukasten';

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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
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
                            1. Theia/VSCode Theme Variables
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Base variables that map directly to VSCode/Theia's theming system (e.g., <Code>--vscode-button-background</Code>).
                            These are automatically provided when used as an extension.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
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
import { lightModern, darkModern } from 'baukasten-web-wrapper';

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
      theme.variables['--color-background'];
    document.body.style.color = 
      theme.variables['--color-foreground'];
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
import { Button, Icon } from 'baukasten';

export default function ThemePicker() {
  const { themeMode, setTheme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--spacing-2)',
      padding: 'var(--spacing-2)',
      backgroundColor: 'var(--color-background)',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--color-border)',
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
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
                    When creating custom themes, define both the underlying VSCode variables and Baukasten's semantic tokens.
                    This ensures compatibility with VSCode extensions while providing flexibility for web applications:
                </p>
                <CodeBlock
                    language="typescript"
                    code={`import { Theme } from 'baukasten-web-wrapper';

export const customTheme: Theme = {
  name: 'Custom Theme',
  variables: {
    // Base VSCode variables
    '--vscode-editor-background': '#1a1a2e',
    '--vscode-editor-foreground': '#e0e0e0',
    '--vscode-button-background': '#6c5ce7',
    '--vscode-button-foreground': '#ffffff',
    '--vscode-button-hoverBackground': '#5f4dd1',
    '--vscode-input-background': '#16213e',
    '--vscode-input-foreground': '#e0e0e0',
    '--vscode-input-border': '#3e4c5e',
    '--vscode-focusBorder': '#6c5ce7',
    '--vscode-sideBar-background': '#0f1419',
    '--vscode-sideBar-foreground': '#e0e0e0',
    
    // Baukasten semantic tokens (recommended for customization)
    '--color-primary': '#6c5ce7',
    '--color-primary-hover': '#5f4dd1',
    '--color-primary-foreground': '#ffffff',
    '--color-success': '#00d4aa',
    '--color-warning': '#ffb627',
    '--color-danger': '#ff6b6b',
    '--color-info': '#4fc3f7',
    
    '--color-background': '#1a1a2e',
    '--color-background-secondary': '#0f1419',
    '--color-background-elevated': '#252545',
    '--color-foreground': '#e0e0e0',
    '--color-foreground-muted': '#9a9ca5',
    
    '--color-border': '#3e4c5e',
    '--color-border-focus': '#6c5ce7',
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
                    Baukasten provides semantic color tokens that you should override instead of VSCode variables directly.
                    These tokens are built on top of VSCode variables but provide better abstraction:
                </p>
                <CodeBlock
                    language="css"
                    code={`:root {
  /* Override Baukasten semantic colors */
  --color-primary: #007acc;
  --color-primary-hover: #005a9e;
  --color-success: #16a34a;
  --color-warning: #eab308;
  --color-danger: #dc2626;
  
  /* Override background colors */
  --color-background: #1e1e1e;
  --color-background-secondary: #252526;
  
  /* Override text colors */
  --color-foreground: #cccccc;
  --color-foreground-muted: #858585;
  
  /* Override borders */
  --color-border: #3e3e42;
  --color-border-focus: #007acc;
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
                    For component-specific customization, use inline styles with Baukasten's semantic color tokens:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { Button } from 'baukasten';

function CustomButton() {
  return (
    <Button
      variant="primary"
      style={{
        '--color-primary': '#ff6b6b',
        '--color-primary-hover': '#ee5a52',
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
                    Here are the most commonly used Baukasten semantic theme variables. These are the tokens you should override for custom theming:
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
                        Brand Colors
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--color-primary</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Primary brand color</span>
                        <Code>--color-primary-hover</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Primary hover state</span>
                        <Code>--color-primary-foreground</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Text on primary background</span>
                        <Code>--color-secondary</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Secondary brand color</span>
                    </div>
                </div>

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
                        Semantic Colors
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--color-success</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Success/positive actions</span>
                        <Code>--color-warning</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Warning/caution messages</span>
                        <Code>--color-danger</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Error/destructive actions</span>
                        <Code>--color-info</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Informational messages</span>
                    </div>
                </div>

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
                        Background & Foreground
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--color-background</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Main background color</span>
                        <Code>--color-background-secondary</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Secondary background (e.g., sidebars)</span>
                        <Code>--color-background-elevated</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Elevated surfaces (e.g., modals)</span>
                        <Code>--color-foreground</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Primary text color</span>
                        <Code>--color-foreground-muted</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Secondary/muted text</span>
                    </div>
                </div>

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
                        Borders & Interactive States
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 'var(--spacing-3) var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                    }}>
                        <Code>--color-border</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Default border color</span>
                        <Code>--color-border-focus</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Focus indicator color</span>
                        <Code>--color-hover</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Hover state background</span>
                        <Code>--color-active</Code>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Active/pressed state background</span>
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--color-success)',
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--color-success)',
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
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--color-success)',
                            flexShrink: 0,
                            marginTop: '4px',
                        }} />
                        <div>
                            <strong>Override Baukasten semantic tokens, not VSCode variables</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Always customize themes by overriding <Code>--color-*</Code> tokens (e.g., <Code>--color-primary</Code>)
                                instead of <Code>--vscode-*</Code> variables directly. This provides better abstraction and maintainability
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-5)',
                        backgroundColor: 'var(--color-background-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-md)',
                    }}>
                        <Icon name="check" style={{
                            color: 'var(--color-success)',
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
