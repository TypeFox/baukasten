import React, { useState } from 'react';
import clsx from 'clsx';
import * as styles from './Approval.css';

/** Past this, a value is truncated with a way to see the rest. */
const INLINE_LIMIT = 160;

export interface ToolArgumentsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whatever the call is about to be made with. */
    value: unknown;
    /** Characters shown before truncating. @default 160 */
    inlineLimit?: number;
}

function isPrimitive(value: unknown): value is string | number | boolean | null {
    return value === null || ['string', 'number', 'boolean'].includes(typeof value);
}

/**
 * True when every value is a primitive, which is most real tools.
 *
 * Deliberately narrow. Tool input schemas are permitted to be any JSON Schema
 * with `$ref`s and composition keywords, so a general renderer is a project in
 * itself. This handles the tractable shape well and hands everything else to a
 * readable fallback, rather than half-rendering something complicated.
 */
function isFlatRecord(value: unknown): value is Record<string, string | number | boolean | null> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
    return Object.values(value).every(isPrimitive);
}

function Value({ text, limit }: { text: string; limit: number }) {
    const [expanded, setExpanded] = useState(false);
    const long = text.length > limit;

    if (!long || expanded) {
        return <dd className={styles.argumentValue}>{text}</dd>;
    }

    return (
        <dd className={styles.argumentValue}>
            {text.slice(0, limit)}…
            {/*
             * Truncation has to be reversible here. An exfiltration attempt is
             * a long string value, so silently cutting it off defeats the
             * entire reason for showing arguments before the call.
             */}
            <button type="button" className={styles.expandValue} onClick={() => setExpanded(true)}>
                show all ({text.length})
            </button>
        </dd>
    );
}

/**
 * The arguments a call is about to be made with.
 *
 * Shown because the specification asks for it in as many words — clients
 * should show tool inputs to the user before calling the server, to avoid
 * malicious or accidental data exfiltration. The approval card is precisely
 * where unreadable arguments do damage, so a single-line JSON blob is not good
 * enough even though it technically satisfies the letter of it.
 *
 * @example
 * ```tsx
 * <ToolArguments value={tool.arguments} />
 * ```
 */
export const ToolArguments: React.FC<ToolArgumentsProps> = ({
    value,
    inlineLimit = INLINE_LIMIT,
    className,
    ...props
}) => {
    if (value === undefined || value === null) return null;

    if (isFlatRecord(value)) {
        const pairs = Object.entries(value);
        if (pairs.length === 0) return null;

        return (
            <div className={className} {...props}>
                <dl className={styles.argumentList}>
                    {pairs.map(([name, entry]) => (
                        <React.Fragment key={name}>
                            <dt className={styles.argumentName}>{name}</dt>
                            <Value text={String(entry)} limit={inlineLimit} />
                        </React.Fragment>
                    ))}
                </dl>
            </div>
        );
    }

    // Anything with nesting, arrays or $refs. Formatted rather than inline,
    // because the point is that a human can read it.
    let json: string;
    try {
        json = JSON.stringify(value, null, 2);
    } catch {
        // Circular or otherwise unserialisable. Still say something.
        json = String(value);
    }

    return (
        <div className={className} {...props}>
            <pre className={clsx(styles.argumentJson)}>{json}</pre>
        </div>
    );
};

ToolArguments.displayName = 'ToolArguments';
