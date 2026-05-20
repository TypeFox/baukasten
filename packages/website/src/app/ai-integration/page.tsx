'use client';

import PageLayout from '@/components/PageLayout';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import { Heading, Divider } from 'baukasten-ui/core';

const Section = ({ children }: { children: React.ReactNode }) => (
    <section style={{ marginBottom: 'var(--bk-spacing-12)' }}>{children}</section>
);

const Paragraph = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
}) => (
    <p
        style={{
            fontSize: 'var(--bk-font-size-md)',
            color: 'var(--bk-color-text-secondary)',
            margin: '0 0 var(--bk-spacing-4) 0',
            lineHeight: 'var(--bk-line-height-relaxed)',
            ...style,
        }}
    >
        {children}
    </p>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code
        style={{
            backgroundColor: 'var(--vscode-textCodeBlock-background)',
            padding: '2px 6px',
            borderRadius: 'var(--bk-radius-sm)',
            fontSize: 'var(--bk-font-size-sm)',
        }}
    >
        {children}
    </code>
);

export default function AIAgentsGuidePage() {
    return (
        <PageLayout
            title="AI Integration"
            description="An agent skill that gives your coding assistant first-hand knowledge of every Baukasten component — props, defaults, patterns, the whole API."
        >
            <Section>
                <Heading level={2}>Install</Heading>
                <Paragraph>From your project root:</Paragraph>
                <CodeBlock code={`npx skills add typefox/baukasten`} language="bash" />
                <Paragraph>
                    Drops the skill into <InlineCode>.agents/skills/write-baukasten/</InlineCode> —
                    the standard discovery path per the{' '}
                    <Link
                        href="https://agentskills.io"
                        style={{ color: 'var(--vscode-textLink-foreground)' }}
                    >
                        Agent Skills standard
                    </Link>
                    . Commit it, then verify with <InlineCode>/skills</InlineCode> in an agent chat.
                </Paragraph>
            </Section>

            <Divider style={{ margin: 'var(--bk-spacing-8) 0' }} />

            <Section>
                <Heading level={2}>What&apos;s in the skill</Heading>
                <CodeBlock
                    code={`skills/write-baukasten/
├── SKILL.md                              # slim index, loaded eagerly
├── references/                           # prop tables, loaded on demand
│   ├── core-components.md
│   ├── extra-components.md
│   ├── datatable.md
│   └── design-tokens.md
└── recipes/                              # realistic compositions
    ├── form-layout.md
    ├── confirmation-dialog.md
    ├── toolbar.md
    ├── sidebar-navigation.md
    ├── vscode-file-explorer-panel.md
    ├── vscode-settings-panel.md
    └── vscode-command-palette.md`}
                    language="text"
                />
            </Section>

            <Divider style={{ margin: 'var(--bk-spacing-8) 0' }} />

            <Section>
                <Heading level={2}>Compatible agents</Heading>
                <Paragraph>Any agent that supports the Agent Skills format, including:</Paragraph>
                <ul
                    style={{
                        margin: '0 0 var(--bk-spacing-4) var(--bk-spacing-5)',
                        color: 'var(--bk-color-text-secondary)',
                        lineHeight: 'var(--bk-line-height-relaxed)',
                        columns: 2,
                    }}
                >
                    <li>Claude / Claude Code</li>
                    <li>Cursor</li>
                    <li>GitHub Copilot</li>
                    <li>VS Code</li>
                    <li>Gemini CLI</li>
                    <li>OpenAI Codex</li>
                    <li>Goose</li>
                    <li>OpenHands</li>
                    <li>Junie</li>
                    <li>Roo Code</li>
                    <li>Amp</li>
                    <li>Kiro</li>
                </ul>
                <Paragraph>
                    Most pick up <InlineCode>.agents/skills/</InlineCode> automatically. A few use
                    their own conventions — check your agent&apos;s docs if it doesn&apos;t.
                </Paragraph>
            </Section>
        </PageLayout>
    );
}
