'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RUN_SCRIPT, type RunStep } from './script';

export interface RunEntry {
    id: number;
    step: RunStep;
    status: 'running' | 'done';
    /** Progressively revealed text for assistant messages */
    typed: string;
}

export interface AgentRunState {
    entries: RunEntry[];
    /** True once the edit step has landed and the diff editor should show it */
    diffRevealed: boolean;
    /** True while the scripted run is still playing */
    running: boolean;
    /** True once the whole script has played out */
    finished: boolean;
    speed: number;
    setSpeed: (speed: number) => void;
    replay: () => void;
    skipToEnd: () => void;
}

const TYPING_CHUNK = 3;
const TYPING_INTERVAL_MS = 14;

/**
 * Drives the scripted agent run.
 *
 * The whole thing is a cancellable async walk over RUN_SCRIPT: each step
 * appends an entry, waits out its duration, then marks it done. Speed changes
 * are read from a ref so they take effect mid-run.
 */
export function useAgentRun(autoStart = true): AgentRunState {
    const [entries, setEntries] = useState<RunEntry[]>([]);
    const [diffRevealed, setDiffRevealed] = useState(false);
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [speed, setSpeed] = useState(1);

    const speedRef = useRef(speed);
    speedRef.current = speed;

    // Bumped on every replay/unmount to invalidate an in-flight run
    const runIdRef = useRef(0);
    const timersRef = useRef(new Set<ReturnType<typeof setTimeout>>());

    const clearTimers = useCallback(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current.clear();
    }, []);

    const play = useCallback(() => {
        const runId = ++runIdRef.current;
        clearTimers();

        const alive = () => runId === runIdRef.current;
        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                const timer = setTimeout(() => {
                    timersRef.current.delete(timer);
                    resolve();
                }, ms / speedRef.current);
                timersRef.current.add(timer);
            });

        setEntries([]);
        setDiffRevealed(false);
        setFinished(false);
        setRunning(true);

        void (async () => {
            for (let index = 0; index < RUN_SCRIPT.length; index++) {
                const step = RUN_SCRIPT[index];

                await wait(step.delay);
                if (!alive()) return;

                setEntries((prev) => [
                    ...prev,
                    { id: index, step, status: 'running', typed: '' },
                ]);

                const settle = () => {
                    setEntries((prev) =>
                        prev.map((entry) =>
                            entry.id === index ? { ...entry, status: 'done' } : entry,
                        ),
                    );
                };

                switch (step.kind) {
                    case 'assistant': {
                        for (let at = 0; at <= step.text.length; at += TYPING_CHUNK) {
                            await wait(TYPING_INTERVAL_MS);
                            if (!alive()) return;
                            const slice = step.text.slice(0, at);
                            setEntries((prev) =>
                                prev.map((entry) =>
                                    entry.id === index ? { ...entry, typed: slice } : entry,
                                ),
                            );
                        }
                        setEntries((prev) =>
                            prev.map((entry) =>
                                entry.id === index
                                    ? { ...entry, typed: step.text, status: 'done' }
                                    : entry,
                            ),
                        );
                        break;
                    }
                    case 'thinking':
                    case 'tool': {
                        await wait(step.duration);
                        if (!alive()) return;
                        settle();
                        break;
                    }
                    case 'diff': {
                        setDiffRevealed(true);
                        settle();
                        break;
                    }
                    default:
                        settle();
                }
            }

            if (!alive()) return;
            setRunning(false);
            setFinished(true);
        })();
    }, [clearTimers]);

    const skipToEnd = useCallback(() => {
        runIdRef.current++;
        clearTimers();
        setEntries(
            RUN_SCRIPT.map((step, index) => ({
                id: index,
                step,
                status: 'done' as const,
                typed: step.kind === 'assistant' ? step.text : '',
            })),
        );
        setDiffRevealed(true);
        setRunning(false);
        setFinished(true);
    }, [clearTimers]);

    useEffect(() => {
        if (autoStart) {
            play();
        }
        return () => {
            runIdRef.current++;
            clearTimers();
        };
    }, [autoStart, play, clearTimers]);

    return {
        entries,
        diffRevealed,
        running,
        finished,
        speed,
        setSpeed,
        replay: play,
        skipToEnd,
    };
}
