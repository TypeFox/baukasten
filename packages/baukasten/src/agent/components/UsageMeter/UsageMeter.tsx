import React from 'react';
import clsx from 'clsx';
import { ProgressBar } from '../../../components/ProgressBar';
import { contextFill, type UsageReadout } from '../../servers';
import * as styles from './UsageMeter.css';

/** Thresholds at which the fill changes tone. */
const WARN_AT = 0.75;
const DANGER_AT = 0.9;

function formatTokens(tokens: number): string {
    if (tokens < 1000) return String(tokens);
    return `${(tokens / 1000).toFixed(tokens < 10_000 ? 1 : 0)}k`;
}

export interface UsageMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    usage: UsageReadout;
    /**
     * Show the context fill bar. @default true
     */
    showFill?: boolean;
    /**
     * Show what tool definitions are costing.
     *
     * On by default because it is the number that explains where the window
     * went, and the one a tool picker can act on — "47 tools, 12k tokens before
     * you have typed anything" is what makes turning some off feel worthwhile
     * rather than fussy.
     *
     * @default true
     */
    showTools?: boolean;
    /**
     * Show money.
     *
     * **Off by default, and that is a policy decision rather than a taste
     * one.** Some applications are not permitted to show cost, and some cannot
     * compute it; showing fill without showing money has to be an ordinary
     * configuration rather than something achieved by working around the
     * component.
     *
     * @default false
     */
    showCost?: boolean;
    /** Anything the host wants in the row — a model name, a mode. */
    children?: React.ReactNode;
    /** @default 'Context used' */
    label?: string;
}

/**
 * What the conversation is costing, in whichever currencies the host reckons in.
 *
 * Every readout is a slot and every slot is optional, because what a client is
 * allowed to display varies: some show tokens and not money, some show neither
 * and only a fill bar, some are contractually barred from one of them. A meter
 * that assumed all three and had to be worked around would be wrong for most
 * of them.
 *
 * @example
 * ```tsx
 * <UsageMeter usage={{ used: 48_000, total: 200_000, toolTokens: 12_000, toolCount: 47 }} />
 * ```
 */
export const UsageMeter: React.FC<UsageMeterProps> = ({
    usage,
    showFill = true,
    showTools = true,
    showCost = false,
    children,
    label = 'Context used',
    className,
    ...props
}) => {
    const fill = contextFill(usage);
    const tone =
        fill === null
            ? 'normal'
            : fill >= DANGER_AT
              ? 'danger'
              : fill >= WARN_AT
                ? 'warning'
                : 'normal';

    return (
        <div className={clsx(styles.meter, className)} data-tone={tone} {...props}>
            <div className={styles.row}>
                <span className={styles.label}>{label}</span>

                {usage.used !== undefined && (
                    <span className={styles.tokens}>
                        {formatTokens(usage.used)}
                        {usage.total !== undefined && ` / ${formatTokens(usage.total)}`}
                    </span>
                )}

                {fill !== null && <span className={styles.percent}>{Math.round(fill * 100)}%</span>}

                {children}
            </div>

            {/* Only when there is a total. A bar with no denominator is a
                decoration that looks like information. */}
            {showFill && fill !== null && (
                <ProgressBar
                    value={fill * 100}
                    variant={tone === 'normal' ? 'default' : tone}
                    height="var(--bk-spacing-1)"
                    aria-label={label}
                />
            )}

            {showTools && usage.toolTokens !== undefined && (
                <div className={styles.detail}>
                    {usage.toolCount !== undefined
                        ? `${usage.toolCount} ${usage.toolCount === 1 ? 'tool' : 'tools'} loaded · ${formatTokens(usage.toolTokens)} tokens before you type`
                        : `${formatTokens(usage.toolTokens)} tokens of tool definitions`}
                </div>
            )}

            {showCost && usage.cost !== undefined && (
                <div className={styles.detail}>
                    {usage.currency ? `${usage.cost.toFixed(2)} ${usage.currency}` : usage.cost}
                </div>
            )}
        </div>
    );
};

UsageMeter.displayName = 'UsageMeter';
