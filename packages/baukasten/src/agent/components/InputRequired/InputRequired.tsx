import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import type { FormGroupOrientation } from '../../../components/FormGroup';
import {
    isFormInputRequest,
    isUrlInputRequest,
    type InputRequest,
    type InputResponse,
} from '../../types';
import { useFocusRetention } from '../../useFocusRetention';
import { ElicitationForm } from './ElicitationForm';
import { UrlElicitation } from './UrlElicitation';
import * as styles from './InputRequired.css';

/**
 * One set of questions, and everything collected while answering it.
 *
 * Held together in a single piece of state because they are only ever correct
 * together: answers from a previous round shown against this round's questions
 * is exactly the reported failure — round two arriving as `{key: 'confirm'}`
 * and rendering as already declined, the new question never seen.
 */
interface Round {
    readonly requests: readonly InputRequest[];
    /** Bumped per round, and mixed into child keys so a form starts empty. */
    readonly index: number;
    readonly answers: Readonly<Record<string, InputResponse>>;
    readonly reported: boolean;
}

/**
 * What is being asked, flattened.
 *
 * Not the array's identity: a parent re-rendering with a fresh literal would
 * discard answers the user had already typed. Not the keys alone either —
 * elicitation keys like `confirm`, `path` and `apiKey` repeat constantly, which
 * is the whole reason a second round was mistaken for the first.
 */
function signature(requests: readonly InputRequest[]): string {
    return JSON.stringify(requests.map((request) => [request.key, request.kind]));
}

/**
 * Is this a new round of questions, or the same one re-rendered?
 *
 * Two rounds can legitimately ask the identical question — "confirm: are you
 * sure?" twice in a run is ordinary. That case is caught by the second rule:
 * once a round has been reported the call has already been retried, so any
 * further set of requests is necessarily a new ask.
 */
function startsNewRound(round: Round, requests: readonly InputRequest[]): boolean {
    if (round.reported) return true;
    return signature(round.requests) !== signature(requests);
}

export interface InputRequiredProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
    /**
     * Everything that must be answered before the blocked call can be retried.
     *
     * A list, not a single request, because a result can carry several at once
     * and of different kinds — and each answer goes back under the key it
     * arrived with.
     *
     * **Hold this array steady between rounds.** Two rounds can legitimately
     * ask the identical question, so a new array arriving after one has been
     * answered is read as a new ask — which a caller rebuilding the literal on
     * every render would trigger, re-asking what was just answered. The
     * alternative default would be to stay silent and strand the blocked call,
     * and being asked twice is the recoverable one of the two.
     */
    requests: readonly InputRequest[];
    /**
     * Called once every request has an answer.
     *
     * All of them together, because the caller retries the original operation
     * with the whole set — a partial answer leaves the call blocked.
     */
    onComplete?: (responses: readonly InputResponse[]) => void;
    /** Abandons the lot. */
    onCancel?: () => void;
    /** Required to render a URL-mode request; see {@link UrlElicitation}. */
    onOpenUrl?: (url: string) => void;
    cancelLabel?: string;
    /**
     * Field layout for any form requests. See {@link ElicitationFormProps}.
     *
     * Pass `vertical` in a narrow docked panel, where a two-column form has no
     * room for its label column.
     *
     * @default 'horizontal'
     */
    orientation?: FormGroupOrientation;
}

/**
 * Resolves everything blocking a call, then hands the answers back at once.
 *
 * The unit here is a **set**, which is the part most implementations get
 * wrong. A blocked operation can come back asking for several things of
 * different kinds, keyed, and the client answers by retrying the original call
 * with all of them — so collecting one answer and sending it is not a smaller
 * version of the right behaviour, it is a different and broken one.
 *
 * A kind with no renderer is declined explicitly rather than ignored. Leaving
 * it unanswered strands the call with nothing on screen explaining why; saying
 * "this client cannot answer that" at least lets the server offer something
 * else.
 *
 * @example
 * ```tsx
 * <InputRequired
 *   requests={entry.inputRequests ?? []}
 *   onOpenUrl={(url) => host.openExternal(url)}
 *   onComplete={(responses) => retry(responses)}
 * />
 * ```
 */
export const InputRequired: React.FC<InputRequiredProps> = ({
    requests,
    onComplete,
    onCancel,
    onOpenUrl,
    cancelLabel = 'Cancel',
    orientation = 'horizontal',
    className,
    ...props
}) => {
    const [round, setRound] = useState<Round>(() => ({
        requests,
        index: 0,
        answers: {},
        reported: false,
    }));

    // Adjusting state during render, which is the documented way to respond to
    // a changed prop — and the right one here, because the alternative paints a
    // round of stale answers before the effect clears them.
    if (round.requests !== requests && startsNewRound(round, requests)) {
        setRound({ requests, index: round.index + 1, answers: {}, reported: false });
    }

    const { answers } = round;

    const retain = useFocusRetention();

    const record = useCallback(
        (response: InputResponse) => {
            // Answering replaces the form with a resolved line, so the control
            // that was focused — the submit button — ceases to exist.
            retain.capture();

            setRound((current) => ({
                ...current,
                answers: { ...current.answers, [response.key]: response },
            }));
        },
        [retain],
    );

    const done =
        requests.length > 0 && requests.every((request) => answers[request.key] !== undefined);

    // Held in a ref so an inline arrow — which is how every caller writes this —
    // does not make the effect re-run and report twice.
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (!done || round.reported) return;

        // Reported from an effect rather than from the render body. The render
        // version called the parent's dispatch mid-render, which React 19 logs
        // as "Cannot update a component (`%s`) while rendering a different
        // component (`%s`)" — captured here as BlockedCall / InputRequired —
        // and makes no promise about under concurrent rendering.
        setRound((current) => ({ ...current, reported: true }));
        onCompleteRef.current?.(requests.map((request) => round.answers[request.key]));
    }, [done, round, requests]);

    if (requests.length === 0) return null;

    /**
     * Scoped to the round, so a repeated key remounts rather than reuses.
     *
     * `ElicitationForm` reads its initial values once at mount, by design.
     * Without the round in the key, React sees the same element type under the
     * same key and keeps the instance — so a second `{key: 'path'}` question
     * would arrive with the previous round's answers already typed into it, and
     * `missingRequired` would pass against values the user never saw.
     */
    const keyFor = (request: InputRequest) => `${round.index}:${request.key}`;

    return (
        <div ref={retain.containerRef} className={clsx(styles.card, className)} {...props}>
            {requests.map((request) => {
                const answered = answers[request.key];

                if (answered) {
                    return (
                        <div key={keyFor(request)} className={styles.resolved}>
                            <Icon
                                name={answered.action === 'accept' ? 'check' : 'close'}
                                size="xs"
                            />
                            {request.message || request.key} — {answered.action}
                        </div>
                    );
                }

                if (isFormInputRequest(request)) {
                    return (
                        <ElicitationForm
                            key={keyFor(request)}
                            request={request}
                            onRespond={record}
                            orientation={orientation}
                        />
                    );
                }

                if (isUrlInputRequest(request)) {
                    // Without a way to open the address safely we cannot ask
                    // for consent honestly, so we say so rather than rendering
                    // a button that does nothing.
                    return onOpenUrl ? (
                        <UrlElicitation
                            key={keyFor(request)}
                            request={request}
                            onOpenUrl={onOpenUrl}
                            onRespond={record}
                        />
                    ) : (
                        <div key={keyFor(request)} className={styles.unsupported}>
                            <Icon name="warning" size="xs" />
                            This client cannot open external links.
                            <Button
                                size="xs"
                                variant="secondary"
                                onClick={() => record({ key: request.key, action: 'decline' })}
                            >
                                Decline
                            </Button>
                        </div>
                    );
                }

                return (
                    <div key={keyFor(request)} className={styles.unsupported}>
                        <Icon name="warning" size="xs" />
                        This client cannot answer a “{request.kind}” request.
                        <Button
                            size="xs"
                            variant="secondary"
                            onClick={() => record({ key: request.key, action: 'decline' })}
                        >
                            Decline
                        </Button>
                    </div>
                );
            })}

            {onCancel && !done && (
                <div className={styles.actions}>
                    <Button size="sm" variant="ghost" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};

InputRequired.displayName = 'InputRequired';
