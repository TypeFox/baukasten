'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const VSCodeThemeWrapper = dynamic(
    () => import('@baukasten/web-wrapper').then(mod => ({ default: mod.VSCodeThemeWrapper })),
    { ssr: false }
);

interface ClientThemeWrapperProps {
    children: ReactNode;
}

export default function ClientThemeWrapper({ children }: ClientThemeWrapperProps) {
    return (
        <VSCodeThemeWrapper showThemeSelector={false}>
            {children}
        </VSCodeThemeWrapper>
    );
}
