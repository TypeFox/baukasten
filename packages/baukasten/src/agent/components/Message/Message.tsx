import React from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import { Markdown } from '../Markdown';
import { StreamingText } from '../StreamingText';
import type { MessageEntry, PromptValue } from '../../types';
import * as styles from './Message.css';

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    entry: MessageEntry;
    /** Context chips, rendered above the text. */
    attachments?: React.ReactNode;
    /** Shown to the left of the body. */
    avatar?: React.ReactNode;
    /**
     * Replaces the rendered body.
     *
     * Without it, agent and system turns render as markdown and user turns as
     * plain text — the user did not write markdown and rendering it as such
     * mangles anything they pasted.
     */
    children?: React.ReactNode;
    /**
     * Offered when a send failed. Without it, the failure is stated but not
     * actionable.
     *
     * Takes the entry id, like every other callback on this surface that is
     * about a specific thing. It used to take nothing, which meant a transcript
     * of messages needed a fresh closure per row instead of one handler.
     */
    onRetry?: (entryId: string) => void;
    /** @default 'Retry' */
    retryLabel?: string;
    /**
     * Offered on a user message, with the original value.
     *
     * The *value*, not the text. A message's {@link PromptValue} keeps its
     * pinned tokens, so editing restores the file the user actually referenced
     * rather than the label it happened to render as — which is the thing a
     * plain-string editor cannot do and this one can.
     *
     * What resending means — forking the session, truncating it, something else
     * — differs enough between clients that this reports the intent and stops
     * there. Retrying a failed send and editing one that succeeded want the
     * same affordance and the same restored value; the only difference is what
     * the application does next.
     */
    onEdit?: (entryId: string, value: PromptValue) => void;
    /** @default 'Edit' */
    editLabel?: string;
}

/**
 * One turn in the conversation.
 *
 * Roles render differently on purpose — see the recipe for why the asymmetry
 * earns its keep in a long run.
 *
 * Delivery state is part of this rather than the application's job. A message
 * appears the instant it is composed, dims while it is in flight, and on
 * failure keeps its text and offers a retry. The common bug this exists to
 * prevent is a message that disappears on error, taking the user's typing with
 * it.
 *
 * @example
 * ```tsx
 * <Message entry={entry} onRetry={resend} />
 *
 * // With context chips and a custom body
 * <Message entry={entry} attachments={<Tag>uploader.ts</Tag>}>
 *   <Markdown text={entry.text} renderer={myRenderer} />
 * </Message>
 * ```
 */
export const Message: React.FC<MessageProps> = ({
    entry,
    attachments,
    avatar,
    children,
    onRetry,
    retryLabel = 'Retry',
    onEdit,
    editLabel = 'Edit',
    className,
    ...props
}) => {
    // `MessageRole` is an open string, so a role we have no styling for has to
    // land somewhere rather than being a type error. The explicit annotation is
    // needed because narrowing an open union by equality still leaves the
    // widened arm in the inferred type.
    const role: 'user' | 'agent' | 'system' =
        entry.role === 'user' ? 'user' : entry.role === 'system' ? 'system' : 'agent';
    const failed = entry.delivery === 'failed';

    const content =
        children ??
        (role === 'user' ? (
            <StreamingText className={styles.text} text={entry.text} />
        ) : (
            <Markdown text={entry.text} streaming={entry.streaming} />
        ));

    return (
        <div
            className={clsx(
                styles.message({ role, pending: entry.delivery === 'pending' }),
                className,
            )}
            data-delivery={entry.delivery}
            {...props}
        >
            {avatar}

            <div className={styles.body}>
                {attachments && <div className={styles.attachments}>{attachments}</div>}

                {content}

                {/*
                 * Only on a user turn, and only when the value survived.
                 *
                 * The reducer keeps `value` on user messages precisely so this
                 * is possible; without it there is nothing to restore but a
                 * display string, and a message that mentioned three files
                 * would come back as their labels.
                 */}
                {onEdit && role === 'user' && entry.value && (
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.action}
                            aria-label={`${editLabel} message`}
                            onClick={() => onEdit(entry.id, entry.value!)}
                        >
                            <Icon name="edit" size="xs" />
                            {editLabel}
                        </button>
                    </div>
                )}

                {failed && (
                    <div className={styles.failure}>
                        <Icon name="error" size="xs" />
                        <span>{entry.error ?? 'Message was not sent.'}</span>
                        {onRetry && (
                            <button
                                type="button"
                                className={styles.retry}
                                onClick={() => onRetry(entry.id)}
                            >
                                <Icon name="refresh" size="xs" />
                                {retryLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Message.displayName = 'Message';
