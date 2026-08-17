'use client';

import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, Heading, Icon, Paragraph, Table, Text } from 'baukasten-ui/core';
import styles from '@/components/demos/demos.module.css';

const WIRING_SNIPPET = `import { SplitPane, Pane, StatusBar, Tree } from 'baukasten-ui/extra';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';

<SplitPane orientation="horizontal">
    <Pane preferredSize={224} minSize={170} maxSize={340}>
        <Tree size="sm" nodes={files} edgeStyle="solid" defaultSelectedKey={activeFile} />
    </Pane>

    <Pane minSize={320}>
        <MonacoEditorReactComp
            vscodeApiConfig={vscodeApiConfig}
            editorAppConfig={editorAppConfig}
            onEditorStartDone={(app) => setEditorApp(app)}
        />
    </Pane>

    <Pane preferredSize={392} minSize={320} maxSize={560}>
        <ChatPanel entries={entries} running={running} onReview={setReviewState} />
    </Pane>
</SplitPane>`;

const THEME_SNIPPET = `// Real VS Code services, not a Monaco look-alike: 'extended' loads the
// theme and TextMate services, and the diff editor is the stack's own.
const vscodeApiConfig: MonacoVscodeApiConfig = {
    $type: 'extended',
    viewsConfig: { $type: 'EditorService' },
    userConfiguration: {
        json: JSON.stringify({ 'workbench.colorTheme': 'Default Dark Modern' }),
    },
    monacoWorkerFactory: configureDefaultWorkerFactory,
};

const editorAppConfig: EditorAppConfig = {
    useDiffEditor: true,
    codeResources: {
        original: { text: original, uri: '/workspace/uploader.original.ts' },
        modified: { text: proposed, uri: '/workspace/uploader.ts' },
    },
};

// Theme data and grammars are separate extensions — without these the
// editor renders unstyled and unhighlighted.
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import '@codingame/monaco-vscode-typescript-basics-default-extension';`;

const PIECES = [
    {
        area: 'Explorer',
        components: 'Tree, Icon, Badge, IconButton',
        note: 'Guide lines via edgeStyle, a per-node badge slot for the git decoration, and a source-control summary that appears once the edit lands.',
    },
    {
        area: 'Editor',
        components: '@typefox/monaco-editor-react, Button, IconButton, Tooltip',
        note: "A real VS Code diff editor — TextMate highlighting, VS Code's own themes, and its own diff computation. Side-by-side or inline, with unchanged regions collapsed.",
    },
    {
        area: 'Agent panel',
        components: 'Accordion, Avatar, Tag, Badge, Code, Spinner, Select, TextArea, Button',
        note: 'Streaming reply text, tool calls as Accordion items whose output is a Code block, a thinking block that folds itself away once it settles, and a composer with context chips.',
    },
    {
        area: 'Shell',
        components: 'SplitPane, StatusBar, Tooltip',
        note: 'Three resizable regions with min/max constraints, plus a status bar carrying live run state.',
    },
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function AgentChatDemoPage() {
    const { themeMode } = useTheme();
    // Opened rather than embedded: the demo is a separate Vite build, and a
    // full window suits an IDE layout far better than a box on a docs page.
    const demoUrl = `${BASE_PATH}/demos/agent-ide/index.html?theme=${themeMode}`;

    return (
        <PageLayout>
            <div className={styles.pageHeader}>
                <Link href="/demos" className={styles.backLink}>
                    <Icon name="arrow-left" size="sm" />
                    All demos
                </Link>

                <Heading level={1} className={styles.pageTitle}>
                    AI Coding Agent
                </Heading>
                <Paragraph className={styles.pageLead}>
                    An agent working through a real change: it reads the file, searches for callers,
                    proposes an edit, runs the tests, and hands you a diff to accept or reject. The
                    editor is a real VS Code instance driven by TypeFox&apos;s Monaco stack;
                    everything around it is Baukasten.
                </Paragraph>
            </div>

            <div className={styles.launch}>
                <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardAction}
                >
                    <Icon name="sparkle" size="sm" />
                    Open the demo
                    <Icon name="link-external" size="sm" />
                </a>
                <Text className={styles.launchNote}>
                    Opens in a new tab, in your current theme. Scripted run over fixture data — no
                    model is called. Replay, change speed, or expand it from the title bar.
                </Text>
            </div>

            <Heading level={2}>What&apos;s on screen</Heading>
            <Table variant="default" size="sm" bordered>
                <Table.Head>
                    <Table.Row>
                        <Table.HeaderCell>Area</Table.HeaderCell>
                        <Table.HeaderCell>Components</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {PIECES.map((piece) => (
                        <Table.Row key={piece.area}>
                            <Table.Cell>
                                <Text className={styles.tableArea}>{piece.area}</Text>
                            </Table.Cell>
                            <Table.Cell>{piece.components}</Table.Cell>
                            <Table.Cell>{piece.note}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Heading level={2} className={styles.section}>
                The layout
            </Heading>
            <Paragraph className={styles.prose}>
                Three panes, each with its own constraints, so the explorer can shrink to 170px and
                the agent panel never drops below a readable width.
            </Paragraph>
            <CodeBlock code={WIRING_SNIPPET} language="tsx" />

            <Heading level={2} className={styles.section}>
                The editor is really VS Code
            </Heading>
            <Paragraph className={styles.prose}>
                The editor is TypeFox&apos;s <code>@typefox/monaco-editor-react</code> running the
                <code> @codingame/monaco-vscode-*</code> services — the same stack behind
                monaco-languageclient. That means VS Code&apos;s own themes and TextMate grammars
                rather than Monaco&apos;s Monarch approximations, and the diff is computed by the
                editor itself. Try the theme picker in the sidebar: the chrome switches Baukasten
                tokens while the editor switches VS Code themes, in step.
            </Paragraph>
            <CodeBlock code={THEME_SNIPPET} language="ts" />

            <Alert variant="info" className={styles.section}>
                The demo is a separate Vite application embedded here in an iframe. The
                <code> @codingame</code> packages are ESM-only, use top-level await and instantiate
                their workers the way Vite expects — so they are built by the toolchain that stack
                supports, then served from this site&apos;s own origin. The docs page and the demo
                exchange theme changes over <code>postMessage</code>.
            </Alert>
        </PageLayout>
    );
}
