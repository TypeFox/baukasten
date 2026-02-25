'use client';

import Navigation from './Navigation';
import { Heading, Paragraph } from 'baukasten-ui/core';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation />
      <main style={{
        marginLeft: '280px',
        flex: 1,
        padding: 'var(--bk-spacing-8)',
        backgroundColor: 'var(--vscode-editor-background)',
      }}>
        {(title || description) && (
          <div style={{
            marginBottom: 'var(--bk-spacing-8)',
            paddingBottom: 'var(--bk-spacing-6)',
            borderBottom: '1px solid var(--vscode-panel-border)'
          }}>
            {title && (
              <Heading level={1} style={{
                marginBottom: description ? 'var(--bk-spacing-3)' : 0,
              }}>
                {title}
              </Heading>
            )}
            {description && (
              <Paragraph style={{
                color: 'var(--vscode-descriptionForeground)',
                margin: 0,
                fontSize: 'calc(var(--vscode-font-size) * 1.1)',
                lineHeight: 1.6,
              }}>
                {description}
              </Paragraph>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
