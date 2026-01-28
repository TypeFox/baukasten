import type { Metadata } from 'next';
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-vscode.css';
import ClientThemeWrapper from '@/components/ClientThemeWrapper';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: 'Baukasten - React UI Toolkit',
  description: 'A comprehensive React component library for Web Applications, Eclipse Theia and VSCode webviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <ClientThemeWrapper>
            {children}
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
