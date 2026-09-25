import React from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import type { CodiconName } from '../../../components/Icon';
import type { PromptAttachment } from '../../types';
import { useFocusRetention } from '../../useFocusRetention';
import * as styles from './Attachment.css';

const KIND_ICONS: Record<string, CodiconName> = {
    image: 'file-media',
    audio: 'unmute',
    text: 'file-text',
    file: 'file',
};

/** Bytes, at the precision a human reading a chip actually wants. */
export function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface AttachmentProps extends React.HTMLAttributes<HTMLSpanElement> {
    attachment: PromptAttachment;
    /**
     * Offered as a button when supplied. Without it the chip is read-only.
     *
     * Takes the id rather than closing over it, so one handler serves a whole
     * list. That is the rule across this surface: a callback about a thing
     * passes that thing's identity.
     */
    onRemove?: (id: string) => void;
    /** Accessible name for the remove button. @default `Remove ${attachment.name}` */
    removeLabel?: string;
    /** Show the byte count. @default true */
    showSize?: boolean;
}

/**
 * One thing carried alongside the prompt.
 *
 * An image shows a thumbnail; anything else shows a glyph for its kind, with
 * an unrecognised kind falling back to a generic file rather than nothing —
 * an attachment may be something the host invented.
 *
 * @example
 * ```tsx
 * <Attachment attachment={item} onRemove={remove} />
 * ```
 */
export const Attachment: React.FC<AttachmentProps> = ({
    attachment,
    onRemove,
    removeLabel,
    showSize = true,
    className,
    ...props
}) => (
    <span
        className={clsx(
            styles.attachment({ withPreview: Boolean(attachment.previewUrl) }),
            className,
        )}
        data-kind={attachment.kind}
        {...props}
    >
        {attachment.previewUrl ? (
            <img className={styles.preview} src={attachment.previewUrl} alt="" />
        ) : (
            <Icon
                name={KIND_ICONS[attachment.kind] ?? KIND_ICONS.file}
                size="xs"
                className={styles.icon}
            />
        )}

        <span className={styles.name} title={attachment.name}>
            {attachment.name}
        </span>

        {showSize && attachment.size !== undefined && (
            <span className={styles.size}>{formatSize(attachment.size)}</span>
        )}

        {onRemove && (
            <button
                type="button"
                className={styles.remove}
                // Named for the thing being removed, so a screen reader user
                // hearing a row of these can tell them apart.
                aria-label={removeLabel ?? `Remove ${attachment.name}`}
                onClick={() => onRemove(attachment.id)}
            >
                <Icon name="close" size="xs" />
            </button>
        )}
    </span>
);

Attachment.displayName = 'Attachment';

export interface AttachmentListProps extends React.HTMLAttributes<HTMLDivElement> {
    attachments: readonly PromptAttachment[];
    onRemove?: (id: string) => void;
    showSize?: boolean;
}

/** A row of attachments. Renders nothing at all when there are none. */
export const AttachmentList: React.FC<AttachmentListProps> = ({
    attachments,
    onRemove,
    showSize,
    className,
    ...props
}) => {
    const retain = useFocusRetention();

    if (attachments.length === 0) return null;

    return (
        // Removing a chip unmounts the button that was focused. Without a
        // target on the row, focus fell to `<body>` and a keyboard user
        // clearing several attachments lost their place after the first.
        <div ref={retain.containerRef} className={clsx(styles.list, className)} {...props}>
            {attachments.map((attachment) => (
                <Attachment
                    key={attachment.id}
                    attachment={attachment}
                    onRemove={
                        onRemove &&
                        ((id) => {
                            retain.capture();
                            onRemove(id);
                        })
                    }
                    showSize={showSize}
                />
            ))}
        </div>
    );
};

AttachmentList.displayName = 'AttachmentList';
