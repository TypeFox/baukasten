import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../../components/Icon';
import { Code } from '../../../components/Typography';
import { formatSize } from '../Attachment';
import type { ResourceContent, ResourceDescriptor } from '../../servers';
import * as styles from './ResourcePreview.css';

/** Past this, a preview is rendered only if the reader asks for it. */
const DEFAULT_SIZE_LIMIT = 512 * 1024;

function isImage(content: ResourceContent): boolean {
    return content.mimeType?.startsWith('image/') ?? false;
}

function isText(content: ResourceContent): boolean {
    return content.text !== undefined;
}

/**
 * `resource` is omitted because React declares it — it is RDFa's attribute.
 *
 * Unlike `Plan.title`, which quietly shadowed the DOM's and compiled, this one
 * is `string` on the DOM side and an object here, so the collision is a type
 * error rather than a silent theft. Omitting is right because nobody is
 * writing RDFa inside a transcript.
 */
export interface ResourcePreviewProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onLoad' | 'resource'
> {
    /**
     * What is known about the resource before reading it.
     *
     * May be nothing but a URI: a `resource_link` returned by a tool is
     * explicitly not guaranteed to appear in `resources/list`, so "readable but
     * not describable" is an ordinary state.
     */
    resource: ResourceDescriptor;
    /**
     * What the read returned — **all** of it.
     *
     * A read returns a list, not a value. A directory resource returns one
     * content per file, and a component that renders `contents[0]` silently
     * drops the rest.
     */
    contents?: readonly ResourceContent[];
    loading?: boolean;
    error?: string;
    /**
     * Bytes above which a preview is withheld until asked for.
     *
     * Resources carry an optional `size`, so this is a real check rather than
     * guesswork — and pinning a 40 MB file should not take the webview down.
     *
     * @default 524288
     */
    sizeLimit?: number;
    /** @default 'Show anyway' */
    revealLabel?: string;
}

/**
 * A pinned resource, made inspectable.
 *
 * Three things here each fail only against a real server, which is why they
 * are handled rather than assumed:
 *
 * **A read returns N contents.** See {@link ResourcePreviewProps.contents}.
 *
 * **Some URIs cannot be looked up.** Metadata may simply be absent, and the
 * component shows what it has rather than waiting for a name it will never get.
 *
 * **Size is a guard, not a hint.** A large resource renders its metadata and
 * offers the preview behind a click.
 *
 * @example
 * ```tsx
 * <ResourcePreview resource={resource} contents={contents} />
 * ```
 */
export const ResourcePreview: React.FC<ResourcePreviewProps> = ({
    resource,
    contents,
    loading = false,
    error,
    sizeLimit = DEFAULT_SIZE_LIMIT,
    revealLabel = 'Show anyway',
    className,
    ...props
}) => {
    const [revealed, setRevealed] = useState(false);

    const size = resource.size;
    const oversized = size !== undefined && size > sizeLimit && !revealed;

    return (
        <div className={clsx(styles.preview, className)} data-uri={resource.uri} {...props}>
            <div className={styles.header}>
                <Icon name="file" size="sm" className={styles.icon} />

                <span className={styles.name} title={resource.uri}>
                    {/* The URI is the only thing guaranteed to exist. */}
                    {resource.name ?? resource.uri}
                </span>

                {resource.mimeType && <span className={styles.mime}>{resource.mimeType}</span>}
                {size !== undefined && <span className={styles.size}>{formatSize(size)}</span>}
            </div>

            {resource.description && (
                <div className={styles.description}>{resource.description}</div>
            )}

            {resource.listed === false && (
                // Said plainly rather than left as a gap. A tool's
                // `resource_link` need not appear in `resources/list`, so this
                // is normal — but a reader seeing no description deserves to
                // know whether that means "empty" or "unknowable".
                <div className={styles.note}>
                    <Icon name="info" size="xs" />
                    Not listed by its server — readable, but nothing is known about it in advance.
                </div>
            )}

            {loading && <div className={styles.note}>Reading…</div>}

            {error && (
                <div className={styles.error}>
                    <Icon name="error" size="xs" />
                    {error}
                </div>
            )}

            {oversized ? (
                <div className={styles.note}>
                    <Icon name="warning" size="xs" />
                    <span>Too large to preview automatically.</span>
                    <button
                        type="button"
                        className={styles.reveal}
                        onClick={() => setRevealed(true)}
                    >
                        {revealLabel}
                    </button>
                </div>
            ) : (
                contents?.map((content, index) => (
                    <ResourceContentView
                        // A read may return several contents with no ids of
                        // their own, and two files in a directory can share a
                        // name, so the URI alone is not a key.
                        key={`${content.uri ?? ''}:${index}`}
                        content={content}
                        multiple={(contents?.length ?? 0) > 1}
                    />
                ))
            )}
        </div>
    );
};

ResourcePreview.displayName = 'ResourcePreview';

/** One content out of the several a read can return. */
function ResourceContentView({
    content,
    multiple,
}: {
    content: ResourceContent;
    multiple: boolean;
}) {
    return (
        <div className={styles.content}>
            {/* Only worth naming when there is more than one to tell apart. */}
            {multiple && (content.name ?? content.uri) && (
                <div className={styles.contentName}>{content.name ?? content.uri}</div>
            )}

            {isImage(content) && content.blob ? (
                <img
                    className={styles.image}
                    src={`data:${content.mimeType};base64,${content.blob}`}
                    alt={content.name ?? ''}
                />
            ) : isText(content) ? (
                <Code block size="xs" maxHeight="240px">
                    {content.text}
                </Code>
            ) : (
                // Neither text nor an image we can draw. Saying what it is
                // beats an empty box, and beats refusing to render the entry.
                <div className={styles.note}>
                    <Icon name="file-binary" size="xs" />
                    {content.mimeType
                        ? `No preview for ${content.mimeType}`
                        : 'No preview available'}
                </div>
            )}
        </div>
    );
}
