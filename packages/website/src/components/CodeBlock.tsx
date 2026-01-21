'use client';

import { useTheme } from '@/contexts/ThemeContext';
import ShikiHighlighter from 'react-shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export default function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
  highlightLines = [],
}: CodeBlockProps) {
  const { themeMode } = useTheme();
  const theme = themeMode === 'light' ? 'vitesse-light' : 'vitesse-dark';

  return (
    <div style={{
      margin: 'var(--padding-md) 0',
    }}>
      <ShikiHighlighter
        language={language}
        theme={theme}
        delay={150}
        style={{
          margin: '0',
          padding: 'var(--spacing-4, 1rem)',
          overflowX: 'auto',
          fontFamily: 'var(--vscode-editor-font-family, \'SF Mono\', Monaco, \'Cascadia Code\', \'Roboto Mono\', Consolas, \'Courier New\', monospace)',
          fontSize: 'var(--vscode-editor-font-size, var(--font-size-sm, 0.875rem))',
          lineHeight: 1.6,
          backgroundColor: 'var(--vscode-editor-background, var(--color-background))',
          border: '1px solid var(--vscode-panel-border, var(--color-border))',
          borderRadius: 'var(--radius-md, 4px)',
        }}
      >
        {code}
      </ShikiHighlighter>
    </div>
  );
}
