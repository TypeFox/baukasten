'use client';

import { Button, Icon } from '@baukasten/ui';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemePicker() {
    const { themeMode, setTheme } = useTheme();

    return (
        <div style={{
            display: 'flex',
            gap: 'var(--spacing-2)',
            padding: '0 var(--spacing-4)',
            marginTop: 'var(--spacing-4)',
        }}>
            <Button
                variant={themeMode === 'light' ? 'primary' : 'secondary'}
                onClick={() => setTheme('light')}
            >
                <Icon name="circle-large-outline" style={{ fontSize: '14px' }} />
                Light
            </Button>

            <Button
                variant={themeMode === 'dark' ? 'primary' : 'secondary'}
                onClick={() => setTheme('dark')}
            >
                <Icon name="circle-large-filled" style={{ fontSize: '14px' }} />
                Dark
            </Button>
        </div>
    );
}
