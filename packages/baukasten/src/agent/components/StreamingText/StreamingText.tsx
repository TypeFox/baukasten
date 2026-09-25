import React from 'react';
import clsx from 'clsx';
import { caret, streamingText } from './StreamingText.css';

export interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * The cursor that marks where output is still arriving.
 *
 * Exported separately because it belongs at the tail of whatever is streaming,
 * and that is not always a `StreamingText` — a markdown renderer has to place
 * it inside its own last block, not after it, or the cursor jumps to a new line
 * every time a paragraph ends.
 */
export const Caret: React.FC<CaretProps> = ({ className, ...props }) => (
    <span className={clsx(caret, className)} aria-hidden="true" {...props} />
);

Caret.displayName = 'Caret';

export interface StreamingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** The text so far. Already accumulated; this does not buffer. */
    text: string;
    /**
     * Whether more is still coming, which is what puts the caret on screen.
     * @default false
     */
    streaming?: boolean;
}

/**
 * Plain text that is still being written, with a cursor while it is.
 *
 * For text that is *not* markdown — a thought block, a terminal line, a label.
 * Markdown has its own renderer, because a caret appended after rendered
 * markup lands outside the last block rather than inside it.
 *
 * Accumulation happens in the transcript reducer, not here. This renders what
 * it is given, which keeps it usable for any source that can produce a growing
 * string.
 *
 * @example
 * ```tsx
 * <StreamingText text={entry.text} streaming={entry.streaming} />
 * ```
 */
export const StreamingText: React.FC<StreamingTextProps> = ({
    text,
    streaming = false,
    className,
    ...props
}) => (
    <span className={clsx(streamingText, className)} {...props}>
        {text}
        {streaming && <Caret />}
    </span>
);

StreamingText.displayName = 'StreamingText';
