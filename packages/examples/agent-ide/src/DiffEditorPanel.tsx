import { useEffect, useMemo, useRef, useState } from 'react';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import type { EditorApp, EditorAppConfig } from 'monaco-languageclient/editorApp';
import type { MonacoVscodeApiConfig } from 'monaco-languageclient/vscodeApiWrapper';
import { configureDefaultWorkerFactory } from 'monaco-languageclient/workerFactory';
import { updateUserConfiguration } from '@codingame/monaco-vscode-configuration-service-override';
import { Spinner, Text } from 'baukasten-ui/core';
import styles from './agent-chat.module.css';

/**
 * Side-effect imports registering real VS Code extensions. `$type: 'extended'`
 * brings in the theme and TextMate *services*; the theme data and language
 * grammars are separate extensions, and without these the editor renders
 * unstyled and unhighlighted.
 */
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import '@codingame/monaco-vscode-typescript-basics-default-extension';

export interface DiffStats {
    added: number;
    removed: number;
}

interface DiffEditorPanelProps {
    original: string;
    modified: string;
    themeMode: 'light' | 'dark';
    sideBySide?: boolean;
    hideUnchanged?: boolean;
    onStats?: (stats: DiffStats) => void;
}

/** VS Code's built-in themes, matching the two the docs site offers. */
const VSCODE_THEME = {
    light: 'Default Light Modern',
    dark: 'Default Dark Modern',
} as const;

const WORKSPACE = '/workspace/telemetry';

function buildApiConfig(themeMode: 'light' | 'dark'): MonacoVscodeApiConfig {
    return {
        $type: 'extended',
        viewsConfig: { $type: 'EditorService' },
        userConfiguration: {
            json: JSON.stringify({
                'workbench.colorTheme': VSCODE_THEME[themeMode],
                'editor.wordBasedSuggestions': 'off',
            }),
        },
        monacoWorkerFactory: configureDefaultWorkerFactory,
    };
}

export default function DiffEditorPanel({
    original,
    modified,
    themeMode,
    sideBySide = true,
    hideUnchanged = true,
    onStats,
}: DiffEditorPanelProps) {
    const editorAppRef = useRef<EditorApp | undefined>(undefined);
    const [started, setStarted] = useState(false);

    /**
     * The component only re-reads `editorAppConfig` when this counter goes up.
     * Without it the editor keeps the models it was created with, so revealing
     * the agent's edit would leave both sides identical and the diff empty.
     */
    const [reprocessCount, setReprocessCount] = useState(0);

    // The VS Code API can only be initialised once per page, so the initial
    // theme is baked in here and later changes go through the configuration
    // service instead of a re-init.
    const vscodeApiConfig = useMemo(() => buildApiConfig(themeMode), []);

    const editorAppConfig = useMemo<EditorAppConfig>(
        () => ({
            useDiffEditor: true,
            readOnly: true,
            codeResources: {
                original: { text: original, uri: `${WORKSPACE}/uploader.original.ts` },
                modified: { text: modified, uri: `${WORKSPACE}/uploader.ts` },
            },
            diffEditorOptions: {
                readOnly: true,
                automaticLayout: true,
                renderSideBySide: sideBySide,
                hideUnchangedRegions: {
                    enabled: hideUnchanged,
                    contextLineCount: 3,
                    minimumLineCount: 4,
                    revealLineCount: 10,
                },
                renderOverviewRuler: false,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                minimap: { enabled: false },
                padding: { top: 12, bottom: 12 },
                lineNumbersMinChars: 3,
                glyphMargin: false,
                folding: false,
                renderLineHighlight: 'none',
                scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
            },
        }),
        [original, modified, sideBySide, hideUnchanged],
    );

    // Follow the docs site's theme picker without re-initialising the API.
    useEffect(() => {
        if (!started) return;

        void updateUserConfiguration(
            JSON.stringify({ 'workbench.colorTheme': VSCODE_THEME[themeMode] }),
        );
    }, [themeMode, started]);

    // Ask the component to pick up new content / editor options.
    useEffect(() => {
        if (!started) return;
        setReprocessCount((count) => count + 1);
    }, [started, modified, original, sideBySide, hideUnchanged]);

    // Report the diff size using the editor's own computation.
    useEffect(() => {
        if (!started || !onStats) return;

        const diffEditor = editorAppRef.current?.getDiffEditor();
        if (!diffEditor) return;

        const publish = () => {
            const changes = diffEditor.getLineChanges() ?? [];
            let added = 0;
            let removed = 0;

            for (const change of changes) {
                if (change.modifiedEndLineNumber > 0) {
                    added += change.modifiedEndLineNumber - change.modifiedStartLineNumber + 1;
                }
                if (change.originalEndLineNumber > 0) {
                    removed += change.originalEndLineNumber - change.originalStartLineNumber + 1;
                }
            }

            onStats({ added, removed });
        };

        publish();
        const subscription = diffEditor.onDidUpdateDiff(publish);
        return () => subscription.dispose();
    }, [started, reprocessCount, onStats]);

    return (
        <div className={styles.editorHost}>
            <MonacoEditorReactComp
                style={{ height: '100%', width: '100%' }}
                vscodeApiConfig={vscodeApiConfig}
                editorAppConfig={editorAppConfig}
                triggerReprocessConfig={reprocessCount}
                onEditorStartDone={(editorApp) => {
                    editorAppRef.current = editorApp;
                    setStarted(true);
                }}
                onError={(error) => console.error('[agent-ide] editor error', error)}
            />
            {!started && (
                <div className={styles.editorLoading}>
                    <Spinner size="sm" />
                    <Text className={styles.editorLoadingText}>Starting VS Code editor…</Text>
                </div>
            )}
        </div>
    );
}
