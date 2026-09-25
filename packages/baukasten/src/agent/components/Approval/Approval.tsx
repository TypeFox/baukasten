import React, { useCallback, useEffect, useId, useRef } from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { ToolArguments } from './ToolArguments';
import type {
    ApprovalDecision,
    ApprovalEntry,
    ApprovalOption,
    ApprovalScope,
    ApprovalSeverity,
} from '../../types';
import { useFocusRetention } from '../../useFocusRetention';
import * as styles from './Approval.css';

const SEVERITY_ICONS = {
    low: 'info',
    normal: 'question',
    high: 'warning',
} as const;

/**
 * Is the user typing into something?
 *
 * `contenteditable="false"` must not count — a pinned token in the prompt
 * editor is exactly that, and the caret beside it is still inside the editor.
 * Hence the explicit attribute values rather than a bare `[contenteditable]`.
 */
function isEditableTarget(node: EventTarget | null): boolean {
    if (!(node instanceof Element)) return false;
    return (
        node.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]') !==
        null
    );
}

/**
 * Every unresolved approval currently listening.
 *
 * Shortcuts answer *the* pending request, which only means anything when there
 * is exactly one. With two on screen a keystroke would answer whichever
 * mounted first, and the user would have no way to tell which — so ambiguity
 * disables them entirely and forces a deliberate click. A consent surface
 * should fail closed.
 */
const listening = new Set<string>();

/**
 * Turns an option into the scope it commits to.
 *
 * The persistent levels need a server identity, and the request may not carry
 * one — an approval with no server attached can only ever be a one-off. That
 * is the safe failure: a decision that cannot be scoped correctly is not
 * remembered rather than being remembered against the wrong thing.
 */
function scopeFor(option: ApprovalOption, entry: ApprovalEntry): ApprovalScope {
    const { serverId, toolName } = entry.request;
    if (option.scope === 'once' || serverId === undefined) return { level: 'once' };

    if (option.scope === 'server') return { level: 'server', serverId };
    if (toolName === undefined) return { level: 'once' };

    return { level: 'tool', serverId, toolName };
}

export interface ApprovalProps extends React.HTMLAttributes<HTMLDivElement> {
    entry: ApprovalEntry;
    /**
     * How alarming this should look.
     *
     * The application's call, always. Tool metadata may inform that decision,
     * but only the application knows which servers it trusts — and metadata is
     * server-controlled, so deriving the treatment from it here would let a
     * hostile server make its own prompt look routine.
     *
     * @default 'normal'
     */
    severity?: ApprovalSeverity;
    onDecide?: (decision: ApprovalDecision) => void;
    /**
     * Binds Enter, Escape and the number keys while mounted.
     *
     * On by default because a long run is dozens of these and reaching for the
     * mouse each time is the difference between a usable client and an
     * exhausting one. Turn it off when several are on screen at once.
     *
     * @default true
     */
    keyboard?: boolean;
}

/**
 * A request for permission, and the decision that answers it.
 *
 * Renders the options the caller supplies rather than a fixed pair of buttons.
 * Allow-once and allow-always are not the same decision, "always" needs a
 * scope, and which of those an application offers depends on what it can
 * remember — so the list is data, not markup.
 *
 * Once answered the card stays in the transcript carrying what was chosen.
 * Removing it loses the record of a decision the user may need to revisit, and
 * leaves a hole where something clearly happened.
 *
 * @example
 * ```tsx
 * <Approval
 *   entry={entry}
 *   severity={isDestructive ? 'high' : 'normal'}
 *   onDecide={(decision) => resolve(decision)}
 * />
 * ```
 */
export const Approval: React.FC<ApprovalProps> = ({
    entry,
    severity = 'normal',
    onDecide,
    keyboard = true,
    className,
    ...props
}) => {
    const { request, decision } = entry;
    const resolved = decision !== undefined;
    // Identifies this mounted card in the listener registry. Not `request.id`:
    // duplicate approval ids are a reachable state, and two cards sharing one
    // would collapse into a single registry entry — making the ambiguity guard
    // read a count of one and answer anyway.
    const instanceId = useId();
    const onDecideRef = useRef(onDecide);
    onDecideRef.current = onDecide;

    const retain = useFocusRetention();

    const decide = useCallback(
        (option: ApprovalOption) => {
            // Captured before the decision, because once the buttons are gone
            // there is nothing left to ask where focus was.
            retain.capture();

            onDecideRef.current?.({
                optionId: option.id,
                outcome: option.outcome,
                scope: scopeFor(option, entry),
            });
        },
        [entry, retain],
    );

    useEffect(() => {
        if (!keyboard || resolved) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;

            // Shift is never part of a shortcut here, and Shift+Enter is how
            // everyone adds a line to a message. Left unguarded, writing a
            // two-line prompt granted permission.
            if (event.shiftKey) return;

            // The listener is on `document` so a prompt can be answered
            // without first clicking into it — which is the whole ergonomic
            // point during a long run. The cost is that it sees every
            // keystroke on the page, including the ones going into the
            // composer. Typing `2` there used to fire the option at index 1,
            // conventionally a standing allow-always grant, with the digit
            // never even reaching the draft.
            if (isEditableTarget(event.target)) return;

            // Ambiguous when more than one is pending; see `listening`.
            if (listening.size > 1) return;

            const byShortcut = (want: 'accept' | 'reject') =>
                request.options.find((option) => option.shortcut === want);

            if (event.key === 'Enter') {
                const option = byShortcut('accept');
                if (option) {
                    event.preventDefault();
                    decide(option);
                }
                return;
            }

            if (event.key === 'Escape') {
                const option = byShortcut('reject');
                if (option) {
                    event.preventDefault();
                    decide(option);
                }
                return;
            }

            // Digits address the options that have no shortcut of their own,
            // which is how "always allow" stays reachable without giving a
            // standing grant a one-keystroke path.
            const index = Number.parseInt(event.key, 10) - 1;
            if (Number.isInteger(index) && index >= 0 && index < request.options.length) {
                event.preventDefault();
                decide(request.options[index]);
            }
        };

        listening.add(instanceId);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            listening.delete(instanceId);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [keyboard, resolved, instanceId, request.options, decide]);

    const chosen = resolved
        ? request.options.find((option) => option.id === decision.optionId)
        : undefined;

    return (
        <div
            // The card survives the decision; the buttons do not. Without
            // somewhere to put focus, answering an approval by keyboard dropped
            // it to `<body>` and lost the reader's place in the transcript.
            ref={retain.containerRef}
            className={clsx(styles.approval({ severity, resolved }), className)}
            data-severity={severity}
            {...props}
        >
            <div className={styles.header}>
                <Icon
                    name={SEVERITY_ICONS[severity]}
                    size="sm"
                    className={styles.severityIcon({ severity })}
                />
                <span className={styles.title}>{request.title}</span>
            </div>

            {request.description && <div className={styles.description}>{request.description}</div>}

            {request.tool?.arguments !== undefined && (
                <ToolArguments value={request.tool.arguments} />
            )}

            {request.serverId && (
                <div className={styles.origin}>
                    {request.toolName ? `${request.toolName} · ` : ''}
                    {request.serverId}
                </div>
            )}

            {resolved ? (
                <div className={styles.outcome({ outcome: decision.outcome })}>
                    <Icon
                        name={decision.outcome === 'allow' ? 'check' : 'close'}
                        size="xs"
                        className={
                            decision.outcome === 'allow'
                                ? styles.outcomeAllowed
                                : styles.outcomeDenied
                        }
                    />
                    {chosen?.label ?? (decision.outcome === 'allow' ? 'Allowed' : 'Denied')}
                </div>
            ) : (
                <div className={styles.options}>
                    {request.options.map((option, index) => (
                        <Button
                            key={option.id}
                            size="sm"
                            variant={option.outcome === 'allow' ? 'primary' : 'secondary'}
                            onClick={() => decide(option)}
                            title={option.description}
                        >
                            {option.label}
                            {keyboard && <span className={styles.shortcutHint}>{index + 1}</span>}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

Approval.displayName = 'Approval';
