import { useCallback, useEffect, useRef, useState } from 'react';
import type { AttachmentKind, PromptAttachment } from './types';

function kindFor(file: File): AttachmentKind {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('text/')) return 'text';
    return 'file';
}

export interface UseAttachmentsOptions {
    /**
     * Rejects a file before it is added. Return a reason to refuse it.
     *
     * A webview has a finite appetite for base64 — an accidentally dropped
     * video is a hang rather than an error — so a size limit here is a real
     * protection rather than a nicety.
     */
    accept?: (file: File) => string | null;
    /** Called with the reason whenever {@link UseAttachmentsOptions.accept} refuses one. */
    onReject?: (file: File, reason: string) => void;
    /** Beyond this many, further files are refused. */
    max?: number;
}

export interface UseAttachmentsReturn {
    readonly attachments: readonly PromptAttachment[];
    /** Adds files, returning only those actually accepted. */
    readonly add: (files: Iterable<File>) => readonly PromptAttachment[];
    readonly remove: (id: string) => void;
    readonly clear: () => void;
    /**
     * Handles a paste. Returns true when it consumed files, in which case the
     * caller should not also insert text.
     */
    readonly handlePaste: (event: ClipboardEvent | React.ClipboardEvent) => boolean;
    /** Handles a drop. Returns true when it consumed files. */
    readonly handleDrop: (event: DragEvent | React.DragEvent) => boolean;
    /** True while something draggable is over the drop target. */
    readonly isDraggingOver: boolean;
    /** Spread onto whatever should accept drops. */
    readonly dropProps: {
        readonly onDragOver: (event: React.DragEvent) => void;
        readonly onDragLeave: (event: React.DragEvent) => void;
        readonly onDrop: (event: React.DragEvent) => void;
    };
}

/**
 * Files a user attached, however they attached them.
 *
 * Paste, drop and an explicit picker all arrive here, because from the value's
 * point of view they are the same act. The hook owns two things that are
 * easy to get wrong on their own:
 *
 * **Object URL lifetime.** Every image preview is a `URL.createObjectURL`, and
 * every one not revoked is a leak that survives until the tab closes. They are
 * revoked on removal, on clear, and on unmount.
 *
 * **Distinguishing files from text.** A paste carrying an image also carries a
 * text fallback, and a naive handler inserts both — the picture *and* a line
 * of junk. `handlePaste` reports whether it consumed files so the caller can
 * decide not to insert text as well.
 */
export function useAttachments(options: UseAttachmentsOptions = {}): UseAttachmentsReturn {
    const { accept, onReject, max } = options;

    const [attachments, setAttachments] = useState<readonly PromptAttachment[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    // Every object URL this hook created, so none outlives the component.
    const created = useRef(new Set<string>());
    const nextId = useRef(0);
    const countRef = useRef(0);
    countRef.current = attachments.length;

    const optionsRef = useRef({ accept, onReject, max });
    optionsRef.current = { accept, onReject, max };

    useEffect(
        () => () => {
            created.current.forEach((url) => URL.revokeObjectURL(url));
            created.current.clear();
        },
        [],
    );

    const add = useCallback((files: Iterable<File>) => {
        const { accept: check, onReject: reject, max: limit } = optionsRef.current;
        const added: PromptAttachment[] = [];

        for (const file of files) {
            if (limit !== undefined && countRef.current + added.length >= limit) {
                reject?.(file, `At most ${limit} attachments.`);
                continue;
            }

            const refusal = check?.(file) ?? null;
            if (refusal !== null) {
                reject?.(file, refusal);
                continue;
            }

            const kind = kindFor(file);
            // Only images get a preview URL. Creating one for a 200MB archive
            // buys nothing and costs a revoke we would have to remember.
            let previewUrl: string | undefined;
            if (kind === 'image' && typeof URL.createObjectURL === 'function') {
                previewUrl = URL.createObjectURL(file);
                created.current.add(previewUrl);
            }

            added.push({
                id: `att${nextId.current++}`,
                kind,
                name: file.name || 'pasted',
                mimeType: file.type || undefined,
                size: file.size,
                previewUrl,
                file,
            });
        }

        if (added.length > 0) setAttachments((current) => [...current, ...added]);
        return added;
    }, []);

    const remove = useCallback((id: string) => {
        setAttachments((current) => {
            const going = current.find((attachment) => attachment.id === id);
            if (going?.previewUrl && created.current.has(going.previewUrl)) {
                URL.revokeObjectURL(going.previewUrl);
                created.current.delete(going.previewUrl);
            }
            return current.filter((attachment) => attachment.id !== id);
        });
    }, []);

    const clear = useCallback(() => {
        created.current.forEach((url) => URL.revokeObjectURL(url));
        created.current.clear();
        setAttachments([]);
    }, []);

    const handlePaste = useCallback(
        (event: ClipboardEvent | React.ClipboardEvent) => {
            const clipboard = 'clipboardData' in event ? event.clipboardData : null;
            const files = clipboard?.files;
            if (!files || files.length === 0) return false;

            const accepted = add(files);
            return accepted.length > 0;
        },
        [add],
    );

    const handleDrop = useCallback(
        (event: DragEvent | React.DragEvent) => {
            const transfer = 'dataTransfer' in event ? event.dataTransfer : null;
            const files = transfer?.files;
            if (!files || files.length === 0) return false;

            const accepted = add(files);
            return accepted.length > 0;
        },
        [add],
    );

    const dropProps = {
        onDragOver: useCallback((event: React.DragEvent) => {
            // Without preventing the default the browser navigates away to the
            // dropped file, taking the unsent draft with it.
            if (!Array.from(event.dataTransfer.types).includes('Files')) return;
            event.preventDefault();
            setIsDraggingOver(true);
        }, []),

        onDragLeave: useCallback((event: React.DragEvent) => {
            // Dragging across a child fires leave on the parent, so only a
            // departure from the element itself counts.
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
            setIsDraggingOver(false);
        }, []),

        onDrop: useCallback(
            (event: React.DragEvent) => {
                setIsDraggingOver(false);
                if (handleDrop(event)) event.preventDefault();
            },
            [handleDrop],
        ),
    };

    return {
        attachments,
        add,
        remove,
        clear,
        handlePaste,
        handleDrop,
        isDraggingOver,
        dropProps,
    };
}
