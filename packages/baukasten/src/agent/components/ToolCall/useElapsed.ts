import { useEffect, useRef, useState } from 'react';

export interface UseElapsedOptions {
    /** Ticks only while true. */
    readonly running: boolean;
    /**
     * When the call began, if the source said.
     *
     * Optional because the transcript reducer is clock-free by design — it
     * never reads a clock, so nothing upstream necessarily knows. When absent,
     * the first render where `running` is true is used instead, which is close
     * enough for a readout whose job is to distinguish "a moment" from "a
     * while".
     */
    readonly startedAt?: number;
    /**
     * How long a call has to run before the readout appears.
     *
     * Short calls should stay quiet — a timer on every one-second read turns
     * the transcript into a stopwatch. @default 3000
     */
    readonly appearAfterMs?: number;
    /** @default 1000 */
    readonly intervalMs?: number;
}

/**
 * Elapsed time for a call that is taking a while.
 *
 * Returns `null` until the threshold passes, so the caller renders nothing
 * rather than deciding when to hide it.
 *
 * The reason this exists: a tool that has been running for forty seconds with
 * no output is the worst moment in an agent UI, and the difference between
 * "stuck" and "working" is almost entirely whether anything on screen is
 * moving.
 */
export function useElapsed({
    running,
    startedAt,
    appearAfterMs = 3000,
    intervalMs = 1000,
}: UseElapsedOptions): number | null {
    const [now, setNow] = useState<number | null>(null);
    const begunRef = useRef<number | null>(startedAt ?? null);

    useEffect(() => {
        if (!running) {
            begunRef.current = null;
            setNow(null);
            return;
        }

        begunRef.current = startedAt ?? begunRef.current ?? Date.now();

        const tick = () => {
            const begun = begunRef.current;
            if (begun !== null) setNow(Date.now() - begun);
        };

        tick();
        const timer = setInterval(tick, intervalMs);
        return () => clearInterval(timer);
    }, [running, startedAt, intervalMs]);

    if (now === null || now < appearAfterMs) return null;
    return now;
}

/** `1:04` past a minute, `12s` below it. */
export function formatElapsed(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}
