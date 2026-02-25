'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon, Badge, Heading, Text, Paragraph, Button } from 'baukasten-ui/core';
import { Menu, MenuItem } from 'baukasten-ui/extra';
import ThemePicker from './ThemePicker';
import SearchModal from './SearchModal';

const coreComponents = [
  { name: 'Alert', path: '/components/alert' },
  { name: 'Badge', path: '/components/badge' },
  { name: 'Button', path: '/components/button' },
  { name: 'Checkbox', path: '/components/checkbox' },
  { name: 'Divider', path: '/components/divider' },
  { name: 'Dropdown', path: '/components/dropdown' },
  { name: 'Forms', path: '/components/forms' },
  { name: 'Icon', path: '/components/icon' },
  { name: 'Input', path: '/components/input' },
  { name: 'Label', path: '/components/label' },
  { name: 'Modal', path: '/components/modal' },
  { name: 'ProgressBar', path: '/components/progressbar' },
  { name: 'Radio', path: '/components/radio' },
  { name: 'Select', path: '/components/select' },
  { name: 'Slider', path: '/components/slider' },
  { name: 'Spinner', path: '/components/spinner' },
  { name: 'Table', path: '/components/table' },
  { name: 'TextArea', path: '/components/textarea' },
  { name: 'Tooltip', path: '/components/tooltip' },
  { name: 'Typography', path: '/components/typography' },
];

const extraComponents = [
  { name: 'Accordion', path: '/components/accordion' },
  { name: 'Avatar', path: '/components/avatar' },
  { name: 'Breadcrumbs', path: '/components/breadcrumbs' },
  { name: 'ButtonGroup', path: '/components/buttongroup' },
  { name: 'ContextMenu', path: '/components/contextmenu' },
  { name: 'DataTable', path: '/components/datatable' },
  { name: 'FileUpload', path: '/components/fileupload' },
  { name: 'Hero', path: '/components/hero' },
  { name: 'Menu', path: '/components/menu' },
  { name: 'Pagination', path: '/components/pagination' },
  { name: 'SplitPane', path: '/components/splitpane' },
  { name: 'StatusBar', path: '/components/statusbar' },
  { name: 'Tabs', path: '/components/tabs' },
];

const foundations = [
  { name: 'Colors', path: '/foundations/colors' },
  { name: 'Typography', path: '/foundations/typography' },
  { name: 'Spacing', path: '/foundations/spacing' },
  { name: 'Effects', path: '/foundations/effects' },
];

const guides = [
  { name: 'Theming', path: '/guides/theming' },
  { name: 'Usage in VS Code', path: '/guides/vscode' },
  { name: 'Usage in Eclipse Theia', path: '/guides/theia' },
];

const recipes = [
  { name: 'Login Pages', path: '/recipes/login' },
  { name: 'Dashboard Layouts', path: '/recipes/dashboard' },
];

const gettingStarted = [
  { name: 'Introduction', path: '/' },
  { name: 'Installation', path: '/installation' },
  { name: 'Quick Start', path: '/quickstart' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle Cmd/Ctrl + K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <style>{`
        .nav-scrollbar::-webkit-scrollbar { width: 8px; }
        .nav-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: var(--vscode-scrollbarSlider-background);
          border-radius: 4px;
        }
        .nav-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--vscode-scrollbarSlider-hoverBackground);
        }
        .nav-section:last-child { margin-bottom: 0; }
      `}</style>
      <nav className="nav-scrollbar" style={{
        width: '280px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'var(--vscode-sideBar-background)',
        borderRight: '1px solid var(--vscode-sideBar-border)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo Header */}
        <div style={{
          padding: 'var(--bk-spacing-6) var(--bk-spacing-5)',
          borderBottom: '1px solid var(--vscode-panel-border)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--vscode-sideBar-background)',
          zIndex: 1,
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--vscode-sideBar-background)';
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--bk-spacing-3)',
            marginBottom: 'var(--bk-spacing-2)',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, var(--vscode-button-background) 0%, var(--vscode-button-hoverBackground) 100%)',
              borderRadius: 'var(--bk-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name="symbol-color" style={{
                color: 'var(--vscode-button-foreground)',
                fontSize: '20px',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Heading level={4} style={{
                margin: 0,
                fontSize: 'calc(var(--vscode-font-size) * 1.15)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}>
                Baukasten
              </Heading>
              <Text style={{
                display: 'block',
                fontSize: 'calc(var(--vscode-font-size) * 0.85)',
                color: 'var(--vscode-descriptionForeground)',
                marginTop: '2px',
              }}>
                React UI Toolkit
              </Text>
            </div>
          </div>
          <ThemePicker />

          {/* Search Button */}
          <Button
            onClick={() => setSearchOpen(true)}
            width='block'

            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--bk-spacing-3)',
              padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
              marginTop: 'var(--bk-spacing-3)',
              borderRadius: 'var(--bk-radius-md)',
              backgroundColor: 'var(--vscode-input-background)',
              border: '1px solid var(--vscode-input-border)',
              color: 'var(--vscode-input-placeholderForeground)',
              fontSize: 'var(--vscode-font-size)',
              fontFamily: 'var(--vscode-font-family)',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--vscode-input-border)';
            }}
          >
            <Icon name="search" style={{ fontSize: '14px' }} />
            <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
            <kbd style={{
              padding: '2px 6px',
              borderRadius: 'var(--bk-radius-sm)',
              backgroundColor: 'var(--vscode-badge-background)',
              color: 'var(--vscode-badge-foreground)',
              fontSize: 'calc(var(--vscode-font-size) * 0.8)',
              fontFamily: 'var(--vscode-font-family)',
            }}>⌘K</kbd>
          </Button>
        </div>

        {/* Navigation Sections */}
        <div style={{ padding: 'var(--bk-spacing-5)', flex: 1 }}>
          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Getting Started
            </Text>
            <Menu size="md">
              {gettingStarted.map(item => (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === item.path}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Foundations
            </Text>
            <Menu size="md">
              {foundations.map(item => (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === item.path}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Guides
            </Text>
            <Menu size="md">
              {guides.map(item => (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === item.path}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Recipes
            </Text>
            <Menu size="md">
              {recipes.map(item => (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === item.path}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Core Components ({coreComponents.length})
            </Text>
            <Menu size="md">
              {coreComponents.map(component => (
                <Link key={component.path} href={component.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === component.path}
                  >
                    {component.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>

          <div className="nav-section" style={{ marginBottom: 'var(--bk-spacing-6)' }}>
            <Text style={{
              display: 'block',
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              fontWeight: 600,
              color: 'var(--vscode-descriptionForeground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--bk-spacing-3)',
              paddingLeft: 'var(--bk-spacing-4)',
            }}>
              Extra Components ({extraComponents.length})
            </Text>
            <Menu size="md">
              {extraComponents.map(component => (
                <Link key={component.path} href={component.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem
                    selected={pathname === component.path}
                  >
                    {component.name}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: 'var(--bk-spacing-5)',
          borderTop: '1px solid var(--vscode-panel-border)',
          backgroundColor: 'var(--vscode-editor-background)',
        }}>
          <a
            href="https://github.com/typefox/baukasten"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--bk-spacing-3)',
              padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
              borderRadius: 'var(--bk-radius-md)',
              backgroundColor: 'var(--vscode-sideBar-background)',
              border: '1px solid var(--vscode-panel-border)',
              color: 'var(--vscode-foreground)',
              textDecoration: 'none',
              fontSize: 'var(--vscode-font-size)',
              fontWeight: 500,
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
              e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--vscode-sideBar-background)';
              e.currentTarget.style.borderColor = 'var(--vscode-panel-border)';
            }}
          >
            <Icon name="github" style={{ fontSize: '18px' }} />
            <span>View on GitHub</span>
          </a>
          <div style={{
            marginTop: 'var(--bk-spacing-4)',
            paddingTop: 'var(--bk-spacing-4)',
            borderTop: '1px solid var(--vscode-panel-border)',
          }}>
            <Paragraph style={{
              margin: 0,
              fontSize: 'calc(var(--vscode-font-size) * 0.85)',
              color: 'var(--vscode-descriptionForeground)',
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              Built with React 19 & Next.js
            </Paragraph>
          </div>
        </div>
      </nav>
    </>
  );
}
