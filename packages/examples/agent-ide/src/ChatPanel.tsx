'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
    Badge,
    Button,
    Code,
    Icon,
    IconButton,
    Select,
    Spinner,
    Tag,
    Text,
    TextArea,
    Tooltip,
    type CodiconName,
    type SelectOption,
} from 'baukasten-ui/core';
import { Accordion, AccordionItem, Avatar } from 'baukasten-ui/extra';
import * as monaco from '@codingame/monaco-vscode-editor-api';
import { TOOL_META, type ThinkingStep, type ToolStep, type UserStep } from './script';
import type { RunEntry } from './useAgentRun';
import type { DiffStats } from './DiffEditorPanel';
import styles from './agent-chat.module.css';

interface ChatPanelProps {
    entries: RunEntry[];
    running: boolean;
    stats: DiffStats;
    reviewState: ReviewState;
    onReview: (state: ReviewState) => void;
    onStop: () => void;
}

export type ReviewState = 'pending' | 'accepted' | 'rejected';

/** `defaultLabel` is rendered muted on the right of each option. */
const MODEL_OPTIONS: SelectOption<string>[] = [
    { value: 'opus', label: 'Claude Opus 5', defaultLabel: 'most capable' },
    { value: 'sonnet', label: 'Claude Sonnet 5', defaultLabel: 'balanced' },
    { value: 'haiku', label: 'Claude Haiku 4.5', defaultLabel: 'fastest' },
];

const MODE_OPTIONS: SelectOption<string>[] = [
    { value: 'agent', label: 'Agent', description: 'Reads, edits and runs commands' },
    { value: 'ask', label: 'Ask', description: 'Answers without touching files' },
    { value: 'edit', label: 'Edit', description: 'Edits only the files you attach' },
];

const MODE_ICONS: Record<string, CodiconName> = {
    agent: 'sparkle',
    ask: 'comment-discussion',
    edit: 'edit',
};

/**
 * Renders a tool-call body.
 *
 * Code-shaped bodies go through `monaco.editor.colorize`, which tokenizes text
 * with the same TextMate grammar and theme the diff editor uses but returns
 * plain HTML — no editor instance, so a transcript full of snippets stays
 * cheap. Anything without a language (file lists, terminal output) falls back
 * to a plain Code block, and so does a snippet whose colorize has not resolved.
 */
function ToolBody({ body, language }: { body: string; language?: string }) {
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        if (!language) return;

        let cancelled = false;
        void monaco.editor
            .colorize(body, language, {})
            .then((result) => {
                if (!cancelled) setHtml(result);
            })
            .catch(() => {
                /* Leave the plain-text fallback in place. */
            });

        return () => {
            cancelled = true;
        };
    }, [body, language]);

    if (!language || html === null) {
        return (
            <Code block size="xs" maxHeight="180px">
                {body}
            </Code>
        );
    }

    return (
        // Markup comes from Monaco's tokenizer over our own fixture strings.
        <pre className={styles.snippet} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

/** Shared by the trigger and the dropdown so the icon survives selection. */
function renderMode(option: SelectOption<string>) {
    return (
        <span className={styles.selectOption}>
            <Icon name={MODE_ICONS[option.value] ?? 'circle-filled'} size="xs" />
            <span className={styles.selectOptionLabel}>{option.label}</span>
        </span>
    );
}

/** Small helper so conditional classes stay readable. */
function cx(...names: Array<string | false | undefined>): string {
    return names.filter(Boolean).join(' ');
}

// ─── Inline markdown ─────────────────────────────────────────────────────────

/** Renders `code` spans inside an otherwise plain line of text. */
function InlineText({ text }: { text: string }) {
    const parts = text.split(/(`[^`]+`)/g);

    return (
        <>
            {parts.map((part, index) =>
                part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
                    <Code key={index}>{part.slice(1, -1)}</Code>
                ) : (
                    <Fragment key={index}>{part}</Fragment>
                ),
            )}
        </>
    );
}

/**
 * Minimal block renderer for the scripted assistant replies — paragraphs and
 * ordered lists are all the fixtures use.
 */
function AssistantText({ text, caret }: { text: string; caret: boolean }) {
    const blocks = text.split('\n\n');

    return (
        <div className={styles.assistantText}>
            {blocks.map((block, blockIndex) => {
                const lines = block.split('\n');
                const isOrderedList = lines.every((line) => /^\d+\.\s/.test(line));
                const isLastBlock = blockIndex === blocks.length - 1;

                if (isOrderedList) {
                    return (
                        <ol key={blockIndex} className={styles.assistantList}>
                            {lines.map((line, lineIndex) => (
                                <li key={lineIndex}>
                                    <InlineText text={line.replace(/^\d+\.\s/, '')} />
                                    {caret && isLastBlock && lineIndex === lines.length - 1 && (
                                        <span className={styles.caret} />
                                    )}
                                </li>
                            ))}
                        </ol>
                    );
                }

                return (
                    <span key={blockIndex}>
                        <InlineText text={block} />
                        {caret && isLastBlock && <span className={styles.caret} />}
                    </span>
                );
            })}
        </div>
    );
}

// ─── Entry cards ─────────────────────────────────────────────────────────────

function UserMessage({ step }: { step: UserStep }) {
    return (
        <div className={cx(styles.userMessage, styles.enter)}>
            <Avatar name="Sam Rivera" size="sm" shape="circular" />
            <div className={styles.userBody}>
                <div className={styles.chipRow}>
                    {step.context.map((chip) => (
                        <Tag key={chip} size="xs" variant="secondary">
                            <span className={styles.chip}>
                                <Icon
                                    name={chip.startsWith('#') ? 'tag' : 'file-code'}
                                    size="xs"
                                />
                                {chip}
                            </span>
                        </Tag>
                    ))}
                </div>
                <Text className={styles.userText}>{step.text}</Text>
            </div>
        </div>
    );
}

function ThinkingCard({ step, running }: { step: ThinkingStep; running: boolean }) {
    const seconds = (step.duration / 1000).toFixed(1);

    // While the model is still thinking the block is a live readout, not
    // something to fold away — it only becomes collapsible once it settles.
    if (running) {
        return (
            <div className={cx(styles.thinkingLive, styles.enter)}>
                <Icon name="sparkle" size="sm" className={cx(styles.thinkingIcon, styles.pulse)} />
                <Text className={styles.thinkingText}>{step.text}</Text>
            </div>
        );
    }

    return (
        <Accordion className={styles.enter}>
            <AccordionItem
                icon={<Icon name="sparkle" size="sm" className={styles.toolIcon} />}
                title={<Text className={styles.thinkingSummary}>Thought for {seconds}s</Text>}
            >
                <Text className={styles.thinkingText}>{step.text}</Text>
            </AccordionItem>
        </Accordion>
    );
}

function ToolCard({ step, running }: { step: ToolStep; running: boolean }) {
    const meta = TOOL_META[step.tool];

    return (
        <Accordion className={styles.enter}>
            <AccordionItem
                icon={
                    running ? (
                        <Spinner size="xs" />
                    ) : (
                        <Icon name="pass-filled" size="sm" className={styles.toolStatusDone} />
                    )
                }
                title={
                    <span className={styles.toolTitle}>
                        <Icon name={meta.icon} size="sm" className={styles.toolIcon} />
                        <Text className={styles.toolLabel}>{meta.label}</Text>
                        <Code className={styles.toolTarget}>{step.target}</Code>
                        {!running && (
                            <Badge size="xs" variant="default">
                                {step.result}
                            </Badge>
                        )}
                    </span>
                }
            >
                <ToolBody body={step.body} language={step.bodyLanguage} />
            </AccordionItem>
        </Accordion>
    );
}

/** Shared +N −N readout used by the review card, toolbar and explorer. */
export function DiffStatText({ stats }: { stats: DiffStats }) {
    return (
        <Text className={styles.diffStat}>
            <span className={styles.added}>+{stats.added}</span>{' '}
            <span className={styles.removed}>−{stats.removed}</span>
        </Text>
    );
}

function ReviewCard({
    stats,
    state,
    onReview,
}: {
    stats: DiffStats;
    state: ReviewState;
    onReview: (state: ReviewState) => void;
}) {
    return (
        <div className={cx(styles.reviewCard, styles.enter)}>
            <div className={styles.reviewHeader}>
                <Icon name="diff" size="sm" />
                <Text className={styles.reviewTitle}>1 file changed</Text>
                <DiffStatText stats={stats} />
            </div>

            {state === 'pending' ? (
                <div className={styles.reviewActions}>
                    <Button size="sm" variant="primary" onClick={() => onReview('accepted')}>
                        <Icon name="check" size="sm" />
                        Accept all
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => onReview('rejected')}>
                        <Icon name="discard" size="sm" />
                        Reject
                    </Button>
                </div>
            ) : (
                <Text className={styles.reviewOutcome}>
                    <Icon
                        name={state === 'accepted' ? 'check' : 'discard'}
                        size="sm"
                        className={
                            state === 'accepted' ? styles.outcomeAccepted : styles.outcomeRejected
                        }
                    />
                    {state === 'accepted' ? 'Changes applied to working tree' : 'Changes discarded'}
                </Text>
            )}
        </div>
    );
}

// ─── Panel ───────────────────────────────────────────────────────────────────

export default function ChatPanel({
    entries,
    running,
    stats,
    reviewState,
    onReview,
    onStop,
}: ChatPanelProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [model, setModel] = useState('opus');
    const [mode, setMode] = useState('agent');
    const [draft, setDraft] = useState('');

    // Follow the conversation as it streams in.
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, [entries]);

    const toolCount = useMemo(
        () => entries.filter((entry) => entry.step.kind === 'tool').length,
        [entries],
    );

    return (
        <div className={styles.chatPanel}>
            {/* Header */}
            <div className={styles.chatHeader}>
                <Icon name="sparkle" size="sm" />
                <Text className={styles.chatTitle}>Agent</Text>
                {toolCount > 0 && (
                    <Badge size="xs" variant="info">
                        {toolCount} {toolCount === 1 ? 'tool call' : 'tool calls'}
                    </Badge>
                )}
                <div className={styles.spacer} />
                <Tooltip content="Conversation history">
                    <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="Conversation history"
                        icon={<Icon name="history" />}
                    />
                </Tooltip>
                <Tooltip content="New chat">
                    <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="New chat"
                        icon={<Icon name="add" />}
                    />
                </Tooltip>
                <Tooltip content="Move panel">
                    <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="Move panel"
                        icon={<Icon name="layout-sidebar-right" />}
                    />
                </Tooltip>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className={cx(styles.scroll, styles.transcript)}>
                {entries.map((entry) => {
                    const isRunning = entry.status === 'running';

                    switch (entry.step.kind) {
                        case 'user':
                            return <UserMessage key={entry.id} step={entry.step} />;
                        case 'thinking':
                            return (
                                <ThinkingCard
                                    key={entry.id}
                                    step={entry.step}
                                    running={isRunning}
                                />
                            );
                        case 'tool':
                            return (
                                <ToolCard key={entry.id} step={entry.step} running={isRunning} />
                            );
                        case 'assistant':
                            return (
                                <AssistantText
                                    key={entry.id}
                                    text={entry.typed || entry.step.text}
                                    caret={isRunning}
                                />
                            );
                        case 'review':
                            return (
                                <ReviewCard
                                    key={entry.id}
                                    stats={stats}
                                    state={reviewState}
                                    onReview={onReview}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>

            {/* Composer */}
            <div className={styles.composer}>
                <div className={styles.composerBox}>
                    <div className={styles.composerChips}>
                        <Tag size="xs" variant="secondary">
                            <span className={styles.chip}>
                                <Icon name="file-code" size="xs" />
                                uploader.ts
                            </span>
                        </Tag>
                        <Tag size="xs" variant="secondary">
                            <span className={styles.chip}>
                                <Icon name="git-branch" size="xs" />
                                fix/telemetry-retry
                            </span>
                        </Tag>
                    </div>

                    <TextArea
                        className={styles.composerInput}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Ask a follow-up, or describe the next change…"
                        rows={2}
                        resize="none"
                    />

                    <div className={styles.composerFooter}>
                        <Select
                            className={styles.modeSlot}
                            size="xs"
                            fullWidth
                            options={MODE_OPTIONS}
                            value={mode}
                            onChange={setMode}
                            renderValue={renderMode}
                            renderOption={renderMode}
                        />
                        <Select
                            className={styles.modelSlot}
                            size="xs"
                            fullWidth
                            options={MODEL_OPTIONS}
                            value={model}
                            onChange={setModel}
                        />
                        <Tooltip content="Attach context">
                            <IconButton
                                size="xs"
                                variant="ghost"
                                aria-label="Attach context"
                                icon={<Icon name="attach" />}
                            />
                        </Tooltip>
                        {running ? (
                            <Button size="xs" variant="secondary" onClick={onStop}>
                                <Icon name="stop-circle" size="sm" />
                                Stop
                            </Button>
                        ) : (
                            <Button size="xs" variant="primary" disabled={!draft.trim()}>
                                <Icon name="send" size="sm" />
                                Send
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
