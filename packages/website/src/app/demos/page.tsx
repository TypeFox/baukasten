'use client';

import PageLayout from '@/components/PageLayout';
import DemoCard from '@/components/demos/DemoCard';
import { useTheme } from '@/contexts/ThemeContext';
import styles from '@/components/demos/demos.module.css';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const REPO = 'https://github.com/typefox/baukasten/tree/main/packages/examples';

export default function DemosPage() {
    const { themeMode } = useTheme();

    // Live demos carry the current theme across so they open in the same mode.
    // index.html is explicit: with trailingSlash disabled, the bare directory
    // form redirects to a path that has no route and 404s.
    const demoUrl = (name: string) => `${BASE_PATH}/demos/${name}/index.html?theme=${themeMode}`;

    return (
        <PageLayout
            title="Demos"
            description="Complete applications built from Baukasten. Each one is a standalone app in the repository."
        >
            <div className={styles.list}>
                <DemoCard
                    title="AI Coding Agent"
                    icon="sparkle"
                    description="An agent workbench: file tree, a real VS Code diff editor, and a chat panel that proposes an edit to accept or reject."
                    note="Scripted — no model is called. The diff and highlighting are computed by the editor."
                    href={demoUrl('agent-ide')}
                    components={['SplitPane', 'Tree', 'StatusBar', 'Accordion', 'Select']}
                    links={[{ label: 'Source', href: `${REPO}/agent-ide`, icon: 'github' }]}
                />

                <DemoCard
                    title="Baukasten on Preact"
                    icon="symbol-method"
                    description="The same components rendered by Preact — a 3kB alternative to React — through preact/compat. No source changes, no fork."
                    note="A Preact PoC and project skeleton"
                    href={demoUrl('preact')}
                    components={['Alert', 'Input', 'Checkbox', 'Select', 'Button', 'Badge']}
                    links={[
                        { label: 'What is Preact?', href: 'https://preactjs.com' },
                        { label: 'Source', href: `${REPO}/preact`, icon: 'github' },
                    ]}
                />

                <DemoCard
                    title="Log Viewer"
                    icon="list-selection"
                    description="A VS Code extension webview: a dense log table with severity filters, sorting and a resizable detail pane."
                    note="Runs inside VS Code, press F5 in the repo folder to launch it."
                    href={`${REPO}/vscode`}
                    status="source"
                    components={['DataTable', 'SplitPane', 'Badge', 'Input', 'Select', 'Button']}
                />

                <DemoCard
                    title="Database Explorer"
                    icon="database"
                    description="A schema browser: a tree of tables and columns, tabs over a result grid, and a query toolbar."
                    note="Mocked data — no database behind it. Needs VS Code."
                    href={`${REPO}/vscode-db-explorer`}
                    status="source"
                    components={['Tree', 'DataTable', 'Tabs', 'Breadcrumbs', 'StatusBar']}
                />

                <DemoCard
                    title="Electron Desktop App"
                    icon="vm"
                    description="Baukasten outside a webview: a desktop app where the toolkit supplies the whole interface."
                    note="A desktop app — run npm run example:electron."
                    href={`${REPO}/electron`}
                    status="source"
                    components={['SplitPane', 'DataTable', 'Badge', 'Button', 'Input', 'Select']}
                />
            </div>
        </PageLayout>
    );
}
