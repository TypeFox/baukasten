import React from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import type { PromptAttachment, PromptValue } from '../../types';
import { isPromptEmpty } from '../../prompt';
import { AttachmentList, dropOverlay } from '../Attachment';
import * as styles from './PromptEditor.css';

export interface ComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
    /** Usually a `PromptEditor`. */
    children: React.ReactNode;
    /**
     * Free-form chips above the input — a branch name, a scope selector.
     *
     * Called `context` rather than `attachments`, which it used to be: the
     * library's word for a thing carried alongside the prompt is
     * {@link PromptAttachment}, and having this prop own that name meant the
     * actual attachments had to be called `files`. Two names for one concept,
     * with the clearer one on the wrong prop.
     */
    context?: React.ReactNode;
    /**
     * Things the user attached, usually from {@link useAttachments}.
     *
     * Rendered as removable chips above the input, and counted by the send
     * control — an image with no accompanying text is a perfectly ordinary
     * thing to send, and treating the draft as empty would refuse it.
     */
    attachments?: readonly PromptAttachment[];
    /** Takes the id, so one handler serves the whole row. */
    onRemoveAttachment?: (id: string) => void;
    /**
     * Spread from {@link useAttachments}, to accept dropped files.
     *
     * Without it the composer does not accept drops at all — and the browser's
     * own default is to navigate away to the dropped file, taking the unsent
     * draft with it.
     */
    dropProps?: {
        onDragOver: (event: React.DragEvent) => void;
        onDragLeave: (event: React.DragEvent) => void;
        onDrop: (event: React.DragEvent) => void;
    };
    /** Shows the drop affordance. From {@link useAttachments}. */
    isDraggingOver?: boolean;
    /** @default 'Drop to attach' */
    dropLabel?: string;
    /**
     * Controls laid out along the footer — mode and model selects, typically.
     *
     * These get the flexible space. Whatever goes here lays out correctly at
     * 300px without the consumer writing CSS, which is the point.
     */
    footer?: React.ReactNode;
    /** Buttons at the end of the footer. They keep their natural size. */
    actions?: React.ReactNode;
    /**
     * Something the draft is blocked on, rendered between the input and the
     * footer.
     *
     * Usually an `InputRequired`. Resolving a slash command is one of the three
     * operations that can come back asking for input, so picking `/review` may
     * demand a form *before* it becomes text — inside the composer, before the
     * user has sent anything.
     *
     * It sits here rather than replacing the input on purpose: the rest of the
     * draft stays visible and editable, so abandoning the resolution costs the
     * user nothing they had already written.
     */
    resolving?: React.ReactNode;
    /** Drives whether the primary control sends or stops. */
    running?: boolean;
    value?: PromptValue;
    onSend?: () => void;
    onStop?: () => void;
    /** @default 'Send' */
    sendLabel?: string;
    /** @default 'Stop' */
    stopLabel?: string;
}

/**
 * The box around the editor.
 *
 * Send and stop are **one control**, not two that swap visibility — the button
 * knows which it is. Two controls in the same place means a run ending under
 * the pointer turns a stop into a send, which is the worst possible misfire in
 * an agent UI.
 *
 * The footer owns its own layout. `Select`'s recipe sets a 200px minimum,
 * which two-up in a docked panel overflows the row and pushes the second
 * control's chevron out of sight; the demo this replaced had to out-specify
 * the library from application CSS. Here the slots are flexible, so nothing
 * downstream has to.
 *
 * @example
 * ```tsx
 * <Composer
 *   context={<Tag>uploader.ts</Tag>}
 *   footer={<><Select .../><Select .../></>}
 *   running={running}
 *   value={value}
 *   onSend={send}
 *   onStop={stop}
 * >
 *   <PromptEditor value={value} onChange={setValue} onSubmit={send} />
 * </Composer>
 * ```
 */
export const Composer: React.FC<ComposerProps> = ({
    children,
    context,
    attachments,
    onRemoveAttachment,
    dropProps,
    isDraggingOver = false,
    dropLabel = 'Drop to attach',
    footer,
    actions,
    resolving,
    running = false,
    value,
    onSend,
    onStop,
    sendLabel = 'Send',
    stopLabel = 'Stop',
    className,
    ...props
}) => {
    // An attachment on its own is a complete message. "Here, look at this"
    // with an image and no words is the normal way people send a screenshot,
    // and gating send on the text alone refuses it.
    const hasAttachments = (attachments?.length ?? 0) > 0;
    const canSend = hasAttachments || value === undefined || !isPromptEmpty(value);

    return (
        <div className={clsx(styles.composer, className)} {...dropProps} {...props}>
            {isDraggingOver && (
                <div className={dropOverlay}>
                    <Icon name="cloud-upload" size="sm" />
                    {dropLabel}
                </div>
            )}

            {context && <div className={styles.attachments}>{context}</div>}

            {hasAttachments && (
                <AttachmentList
                    className={styles.attachments}
                    attachments={attachments ?? []}
                    onRemove={onRemoveAttachment}
                />
            )}

            {children}

            {resolving && <div className={styles.resolving}>{resolving}</div>}

            <div className={styles.footer}>
                {footer && <div className={styles.footerSlot}>{footer}</div>}

                <div className={styles.footerActions}>
                    {actions}

                    {running ? (
                        <Button size="xs" variant="secondary" onClick={onStop}>
                            <Icon name="stop-circle" size="xs" />
                            {stopLabel}
                        </Button>
                    ) : (
                        <Button size="xs" variant="primary" disabled={!canSend} onClick={onSend}>
                            <Icon name="send" size="xs" />
                            {sendLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

Composer.displayName = 'Composer';
