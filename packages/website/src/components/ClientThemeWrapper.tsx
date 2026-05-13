'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const VSCodeThemeWrapper = dynamic(
    () => import('baukasten-ui-web-wrapper').then((mod) => ({ default: mod.VSCodeThemeWrapper })),
    { ssr: false },
);

interface ClientThemeWrapperProps {
    children: ReactNode;
}

export default function ClientThemeWrapper({ children }: ClientThemeWrapperProps) {
    const { themeMode } = useTheme();
    const themeId = themeMode === 'dark' ? 'dark-modern' : 'light-modern';

    return (
        <VSCodeThemeWrapper themeId={themeId} showThemeSelector={false}>
            {children}
        </VSCodeThemeWrapper>
    );
}
