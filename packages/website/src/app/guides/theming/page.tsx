'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { Code, Button, Badge, Icon, Alert } from 'baukasten-ui';

export default function ThemingGuidePage() {
    return (
        <PageLayout
            title="Theming Guide"
            description="Learn how to customize and theme Baukasten components to match your application's design."
        >
            <Alert variant="info" style={{ marginBottom: 'var(--spacing-8)' }}>
                Baukasten is built with VSCode's theming system in mind, making it automatically compatible with all VSCode and Theia color themes.
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
                    Baukasten uses CSS variables (custom properties) for theming. Simply import the appropriate
                    platform CSS file for your environment, and optionally override any variables to customize
                    the appearance.
                </p>
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Platform CSS Files
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Baukasten provides three platform-specific CSS files. Import the one that matches your target environment:
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
                            <Badge variant="info" style={{ marginRight: 'var(--spacing-2)' }}>VS Code</Badge>
                            baukasten-vscode.css
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Uses <Code>--vscode-*</Code> CSS variables. Components automatically adapt to the user's VS Code theme.
                        </p>
                        <CodeBlock
                            language="tsx"
                            code={`import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-vscode.css';`}
                        />
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
                            <Badge variant="warning" style={{ marginRight: 'var(--spacing-2)' }}>Theia</Badge>
                            baukasten-theia.css
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Uses <Code>--theia-*</Code> CSS variables. Components automatically adapt to the Eclipse Theia theme.
                        </p>
                        <CodeBlock
                            language="tsx"
                            code={`import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-theia.css';`}
                        />
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
                            <Badge variant="default" style={{ marginRight: 'var(--spacing-2)' }}>Web</Badge>
                            baukasten-web.css
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-4)',
                            lineHeight: 'var(--line-height-relaxed)',
                        }}>
                            Uses default fallback values for standalone web applications. This is the file you'll want to customize.
                        </p>
                        <CodeBlock
                            language="tsx"
                            code={`import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';`}
                        />
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Customizing Themes
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    After importing the platform CSS file, simply override the CSS variables you want to customize.
                    You can do this in your own CSS file or in a <Code>&lt;style&gt;</Code> tag:
                </p>
                <CodeBlock
                    language="css"
                    code={`/* your-custom-theme.css */
:root {
  /* Override brand colors */
  --color-primary: #6c5ce7;
  --color-primary-hover: #5f4dd1;
  --color-primary-foreground: #ffffff;
  
  /* Override semantic colors */
  --color-success: #00d4aa;
  --color-warning: #ffb627;
  --color-danger: #ff6b6b;
  --color-info: #4fc3f7;
  
  /* Override backgrounds */
  --color-background: #1a1a2e;
  --color-background-secondary: #0f1419;
  --color-background-elevated: #252545;
  
  /* Override text colors */
  --color-foreground: #e0e0e0;
  --color-foreground-muted: #9a9ca5;
  
  /* Override borders */
  --color-border: #3e4c5e;
  --color-border-focus: #6c5ce7;
}`}
                />
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--spacing-4)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Then import your custom CSS file after the Baukasten CSS:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`// Import order matters - your overrides should come last
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';
import './your-custom-theme.css';`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Dynamic Theme Switching
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    For dynamic theme switching (e.g., light/dark mode toggle), you can update CSS variables at runtime using JavaScript:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`const lightTheme = {
  '--color-background': '#ffffff',
  '--color-background-secondary': '#f5f5f5',
  '--color-foreground': '#1e1e1e',
  '--color-foreground-muted': '#6b6b6b',
  '--color-border': '#e0e0e0',
  '--color-primary': '#007acc',
};

const darkTheme = {
  '--color-background': '#1e1e1e',
  '--color-background-secondary': '#252526',
  '--color-foreground': '#cccccc',
  '--color-foreground-muted': '#858585',
  '--color-border': '#3e3e42',
  '--color-primary': '#0e639c',
};

function applyTheme(theme: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// Usage
applyTheme(darkTheme);  // Switch to dark theme
applyTheme(lightTheme); // Switch to light theme`}
                />
            </section>

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Using baukasten-ui-web-wrapper (Optional)
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    For convenience, the <Code>baukasten-ui-web-wrapper</Code> package provides pre-built theme presets:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { lightModern, darkModern } from 'baukasten-ui-web-wrapper';

// Apply a theme
function applyTheme(theme: { variables: Record<string, string> }) {
  const root = document.documentElement;
  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// Use the pre-built themes
applyTheme(darkModern);`}
                />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--spacing-5)',
                    marginTop: 'var(--spacing-6)',
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
                    Theme Variables Reference
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-6)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    Here are the most commonly customized CSS variables:
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

            <section style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    Component-Specific Overrides
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-4)',
                    lineHeight: 'var(--line-height-relaxed)',
                }}>
                    For component-specific customization, you can use inline styles with CSS variables:
                </p>
                <CodeBlock
                    language="tsx"
                    code={`import { Button } from 'baukasten-ui';

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
                            <strong>Import the right platform CSS</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Use <Code>baukasten-vscode.css</Code> for VS Code, <Code>baukasten-theia.css</Code> for Theia,
                                or <Code>baukasten-web.css</Code> for standalone web apps
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
                            <strong>Override semantic tokens, not platform variables</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Override <Code>--color-*</Code> tokens (e.g., <Code>--color-primary</Code>)
                                instead of <Code>--vscode-*</Code> or <Code>--theia-*</Code> variables
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
                            <strong>Import order matters</strong>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                marginTop: 'var(--spacing-2)',
                                marginBottom: 0,
                            }}>
                                Import base CSS first, then platform CSS, then your custom overrides
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
