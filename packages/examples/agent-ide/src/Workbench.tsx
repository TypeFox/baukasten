import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Badge,
    Button,
    Icon,
    IconButton,
    Text,
    Tooltip,
    type CodiconName,
} from 'baukasten-ui/core';
import {
    Pane,
    SplitPane,
    StatusBar,
    StatusBarItem,
    StatusBarSection,
    Tree,
    type TreeNodeData,
} from 'baukasten-ui/extra';
import ChatPanel, { DiffStatText, type ReviewState } from './ChatPanel';
import { useAgentRun } from './useAgentRun';
import { DEMO_FILE, FILE_TREE, MODIFIED_CODE, ORIGINAL_CODE, type DemoFileNode } from './script';
import DiffEditorPanel, { type DiffStats } from './DiffEditorPanel';
import styles from './agent-chat.module.css';

const SPEEDS = [1, 2, 4];

const TRAFFIC_LIGHTS = [styles.lightClose, styles.lightMinimise, styles.lightZoom];

/** Small helper so conditional classes stay readable. */
function cx(...names: Array<string | false | undefined>): string {
    return names.filter(Boolean).join(' ');
}

/** Maps the fixture tree into Tree nodes, decorating files the agent changed. */
function toTreeNodes(
    nodes: DemoFileNode[],
    changedVisible: boolean,
    reviewState: ReviewState,
): TreeNodeData[] {
    return nodes.map((node) => {
        const isChanged = Boolean(node.changed) && changedVisible && reviewState !== 'rejected';

        return {
            id: node.id,
            label: isChanged ? (
                <span className={styles.changedLabel}>{node.label}</span>
            ) : (
                node.label
            ),
            icon: <Icon name={node.icon} size="sm" />,
            badge: isChanged ? <Text className={styles.changedBadge}>M</Text> : undefined,
            children: node.children
                ? toTreeNodes(node.children, changedVisible, reviewState)
                : undefined,
        };
    });
}

interface ToolbarToggleProps {
    icon: CodiconName;
    label: string;
    active: boolean;
    onClick: () => void;
}

function ToolbarToggle({ icon, label, active, onClick }: ToolbarToggleProps) {
    return (
        <Tooltip content={label}>
            <IconButton
                size="xs"
                variant={active ? 'secondary' : 'ghost'}
                aria-label={label}
                aria-pressed={active}
                onClick={onClick}
                icon={<Icon name={icon} />}
            />
        </Tooltip>
    );
}

export interface WorkbenchProps {
    themeMode: 'light' | 'dark';
    /**
     * The demo runs inside an iframe on the docs site, so it cannot expand
     * itself — the host page is asked to resize the frame instead.
     */
    onFullscreenChange?: (fullscreen: boolean) => void;
}

export default function Workbench({ themeMode, onFullscreenChange }: WorkbenchProps) {
    const { entries, diffRevealed, running, speed, setSpeed, replay, skipToEnd } = useAgentRun();

    const [reviewState, setReviewState] = useState<ReviewState>('pending');
    const [stats, setStats] = useState<DiffStats>({ added: 0, removed: 0 });
    const [sideBySide, setSideBySide] = useState(true);
    const [hideUnchanged, setHideUnchanged] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

    const toggleFullscreen = useCallback(() => {
        setFullscreen((value) => {
            onFullscreenChange?.(!value);
            return !value;
        });
    }, [onFullscreenChange]);

    const handleReplay = useCallback(() => {
        setReviewState('pending');
        replay();
    }, [replay]);

    const handleSkip = useCallback(() => {
        setReviewState('pending');
        skipToEnd();
    }, [skipToEnd]);

    const cycleSpeed = useCallback(() => {
        setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]);
    }, [speed, setSpeed]);

    // Esc leaves the expanded view.
    useEffect(() => {
        if (!fullscreen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setFullscreen(false);
                onFullscreenChange?.(false);
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [fullscreen]);

    const treeNodes = useMemo(
        () => toTreeNodes(FILE_TREE, diffRevealed, reviewState),
        [diffRevealed, reviewState],
    );

    const showDiff = diffRevealed && reviewState !== 'rejected';

    return (
        <div className={cx(styles.shell, fullscreen && styles.shellFullscreen)}>
            {/* Title bar */}
            <div className={styles.titleBar}>
                <div className={styles.trafficLights}>
                    {TRAFFIC_LIGHTS.map((light) => (
                        <span key={light} className={cx(styles.light, light)} />
                    ))}
                </div>

                <Text className={styles.titleText}>uploader.ts — telemetry-service</Text>

                <div className={styles.titleActions}>
                    <Tooltip content={`Playback speed — ${speed}×`}>
                        <Button size="xs" variant="ghost" onClick={cycleSpeed}>
                            {speed}×
                        </Button>
                    </Tooltip>
                    <Tooltip content={running ? 'Skip to end' : 'Replay the run'}>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label={running ? 'Skip to end' : 'Replay the run'}
                            onClick={running ? handleSkip : handleReplay}
                            icon={<Icon name={running ? 'debug-continue' : 'debug-restart'} />}
                        />
                    </Tooltip>
                    <Tooltip content={fullscreen ? 'Exit full screen (Esc)' : 'Full screen'}>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
                            onClick={toggleFullscreen}
                            icon={<Icon name={fullscreen ? 'screen-normal' : 'screen-full'} />}
                        />
                    </Tooltip>
                </div>
            </div>

            {/* Workbench */}
            <div className={styles.workbench}>
                <SplitPane orientation="horizontal">
                    {/* Explorer */}
                    <Pane preferredSize={224} minSize={170} maxSize={340}>
                        <div className={styles.explorer}>
                            <div className={styles.sectionHeader}>
                                <Text className={styles.sectionTitle}>Explorer</Text>
                                <IconButton
                                    size="xs"
                                    variant="ghost"
                                    aria-label="More actions"
                                    icon={<Icon name="ellipsis" />}
                                />
                            </div>

                            <div className={cx(styles.scroll, styles.treeScroll)}>
                                <Tree
                                    size="sm"
                                    nodes={treeNodes}
                                    edgeStyle="solid"
                                    defaultExpandedKeys={[
                                        'src',
                                        'src/services',
                                        'src/services/telemetry',
                                    ]}
                                    defaultSelectedKey={DEMO_FILE}
                                />
                            </div>

                            {showDiff && (
                                <div className={cx(styles.scmPanel, styles.enter)}>
                                    <div className={styles.sectionHeader}>
                                        <Text className={styles.sectionTitle}>Source Control</Text>
                                        <Badge size="xs" variant="info">
                                            1
                                        </Badge>
                                    </div>
                                    <div className={styles.scmRow}>
                                        <Icon name="file-code" size="sm" />
                                        <Text className={styles.scmFile}>uploader.ts</Text>
                                        <DiffStatText stats={stats} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Pane>

                    {/* Editor */}
                    <Pane minSize={320}>
                        <div className={styles.editorPane}>
                            <div className={styles.tabBar}>
                                <div className={styles.tab}>
                                    <Icon name="diff" size="sm" />
                                    <Text className={styles.tabLabel}>uploader.ts</Text>
                                    <Text className={styles.tabHint}>(Working Tree)</Text>
                                    <IconButton
                                        size="xs"
                                        variant="ghost"
                                        aria-label="Close tab"
                                        icon={<Icon name="close" />}
                                    />
                                </div>
                            </div>

                            <div className={styles.diffToolbar}>
                                {showDiff ? (
                                    <>
                                        <Icon
                                            name="sparkle"
                                            size="sm"
                                            className={styles.toolbarAccent}
                                        />
                                        <Text className={styles.toolbarLabel}>Agent edit</Text>
                                        <DiffStatText stats={stats} />
                                    </>
                                ) : (
                                    <Text className={styles.toolbarMuted}>
                                        {running ? 'Agent is working…' : 'No pending changes'}
                                    </Text>
                                )}

                                <div className={styles.spacer} />

                                <ToolbarToggle
                                    icon="split-horizontal"
                                    label={
                                        sideBySide
                                            ? 'Switch to inline view'
                                            : 'Switch to side-by-side view'
                                    }
                                    active={sideBySide}
                                    onClick={() => setSideBySide((value) => !value)}
                                />
                                <ToolbarToggle
                                    icon="list-selection"
                                    label={
                                        hideUnchanged
                                            ? 'Show unchanged regions'
                                            : 'Collapse unchanged regions'
                                    }
                                    active={hideUnchanged}
                                    onClick={() => setHideUnchanged((value) => !value)}
                                />

                                {showDiff && reviewState === 'pending' && (
                                    <>
                                        <Button
                                            size="xs"
                                            variant="primary"
                                            onClick={() => setReviewState('accepted')}
                                        >
                                            <Icon name="check" size="xs" />
                                            Accept
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="secondary"
                                            onClick={() => setReviewState('rejected')}
                                        >
                                            <Icon name="discard" size="xs" />
                                            Reject
                                        </Button>
                                    </>
                                )}

                                {reviewState !== 'pending' && (
                                    <Badge
                                        size="xs"
                                        variant={reviewState === 'accepted' ? 'success' : 'default'}
                                    >
                                        {reviewState === 'accepted' ? 'Accepted' : 'Rejected'}
                                    </Badge>
                                )}
                            </div>

                            <div className={styles.editorHost}>
                                <DiffEditorPanel
                                    original={ORIGINAL_CODE}
                                    modified={showDiff ? MODIFIED_CODE : ORIGINAL_CODE}
                                    themeMode={themeMode}
                                    sideBySide={sideBySide}
                                    hideUnchanged={hideUnchanged}
                                    onStats={setStats}
                                />
                            </div>
                        </div>
                    </Pane>

                    {/* Agent chat */}
                    <Pane preferredSize={392} minSize={320} maxSize={560}>
                        <ChatPanel
                            entries={entries}
                            running={running}
                            stats={stats}
                            reviewState={reviewState}
                            onReview={setReviewState}
                            onStop={handleSkip}
                        />
                    </Pane>
                </SplitPane>
            </div>

            {/* Status bar */}
            <div className={styles.statusBarHost}>
                <StatusBar>
                    <StatusBarSection align="left">
                        <StatusBarItem icon={<Icon name="git-branch" />}>
                            fix/telemetry-retry
                        </StatusBarItem>
                        <StatusBarItem icon={<Icon name="error" />}>0</StatusBarItem>
                        <StatusBarItem icon={<Icon name="warning" />}>0</StatusBarItem>
                        {showDiff && (
                            <StatusBarItem
                                variant="success"
                                icon={<Icon name="diff" />}
                                tooltip="Lines added / removed in the pending edit"
                            >
                                +{stats.added} −{stats.removed}
                            </StatusBarItem>
                        )}
                    </StatusBarSection>

                    <StatusBarSection align="right">
                        <StatusBarItem
                            variant={running ? 'info' : 'default'}
                            icon={<Icon name={running ? 'sparkle' : 'check'} />}
                        >
                            {running ? 'Agent working' : 'Agent idle'}
                        </StatusBarItem>
                        <StatusBarItem tooltip="Line 47, Column 9">Ln 47, Col 9</StatusBarItem>
                        <StatusBarItem>Spaces: 4</StatusBarItem>
                        <StatusBarItem>UTF-8</StatusBarItem>
                        <StatusBarItem>TypeScript</StatusBarItem>
                    </StatusBarSection>
                </StatusBar>
            </div>
        </div>
    );
}
