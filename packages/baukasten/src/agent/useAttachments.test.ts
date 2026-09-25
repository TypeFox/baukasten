import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAttachments } from './useAttachments';

function file(name: string, type: string, size = 100): File {
    const made = new File(['x'.repeat(size)], name, { type });
    // jsdom derives size from the content, which is fine, but being explicit
    // keeps the limit tests readable.
    Object.defineProperty(made, 'size', { value: size });
    return made;
}

let created: string[];
let revoked: string[];

beforeEach(() => {
    created = [];
    revoked = [];

    // jsdom implements neither, and the lifecycle is the whole point of the
    // hook — a preview URL that is never revoked leaks until the tab closes.
    vi.stubGlobal('URL', {
        ...URL,
        createObjectURL: vi.fn((): string => {
            const url = `blob:mock/${created.length}`;
            created.push(url);
            return url;
        }),
        revokeObjectURL: vi.fn((url: string) => revoked.push(url)),
    });
});

afterEach(() => vi.unstubAllGlobals());

describe('adding', () => {
    it('classifies by mime type', () => {
        const { result } = renderHook(() => useAttachments());

        act(() => {
            result.current.add([
                file('shot.png', 'image/png'),
                file('notes.txt', 'text/plain'),
                file('clip.wav', 'audio/wav'),
                file('archive.zip', 'application/zip'),
            ]);
        });

        expect(result.current.attachments.map((a) => a.kind)).toEqual([
            'image',
            'text',
            'audio',
            'file',
        ]);
    });

    it('previews images and nothing else', () => {
        const { result } = renderHook(() => useAttachments());

        act(() => {
            result.current.add([file('a.png', 'image/png'), file('b.zip', 'application/zip')]);
        });

        // Creating an object URL for a 200MB archive buys nothing and costs a
        // revoke somebody has to remember.
        expect(result.current.attachments[0].previewUrl).toBeDefined();
        expect(result.current.attachments[1].previewUrl).toBeUndefined();
    });

    it('names a clipboard file that arrived without one', () => {
        const { result } = renderHook(() => useAttachments());
        act(() => void result.current.add([file('', 'image/png')]));

        expect(result.current.attachments[0].name).toBe('pasted');
    });
});

describe('object URL lifetime', () => {
    it('revokes the preview when an attachment is removed', () => {
        const { result } = renderHook(() => useAttachments());

        act(() => void result.current.add([file('a.png', 'image/png')]));
        const url = result.current.attachments[0].previewUrl!;

        act(() => result.current.remove(result.current.attachments[0].id));

        expect(revoked).toContain(url);
    });

    it('revokes everything on clear', () => {
        const { result } = renderHook(() => useAttachments());

        act(() => {
            result.current.add([file('a.png', 'image/png'), file('b.png', 'image/png')]);
        });
        act(() => result.current.clear());

        expect(revoked).toHaveLength(2);
        expect(result.current.attachments).toHaveLength(0);
    });

    it('revokes everything on unmount', () => {
        const { result, unmount } = renderHook(() => useAttachments());
        act(() => void result.current.add([file('a.png', 'image/png')]));

        unmount();

        // Otherwise every image previewed in a session survives until the tab
        // closes.
        expect(revoked).toEqual(created);
    });
});

describe('limits', () => {
    it('refuses a file the caller rejects, with its reason', () => {
        const onReject = vi.fn();
        const { result } = renderHook(() =>
            useAttachments({
                accept: (f) => (f.size > 50 ? 'Too large.' : null),
                onReject,
            }),
        );

        act(() => void result.current.add([file('big.png', 'image/png', 500)]));

        expect(result.current.attachments).toHaveLength(0);
        expect(onReject).toHaveBeenCalledWith(expect.anything(), 'Too large.');
    });

    it('stops at the maximum, and says so', () => {
        const onReject = vi.fn();
        const { result } = renderHook(() => useAttachments({ max: 2, onReject }));

        act(() => {
            result.current.add([
                file('a.png', 'image/png'),
                file('b.png', 'image/png'),
                file('c.png', 'image/png'),
            ]);
        });

        expect(result.current.attachments).toHaveLength(2);
        expect(onReject).toHaveBeenCalledTimes(1);
    });

    it('does not create a preview for a file it refused', () => {
        const { result } = renderHook(() => useAttachments({ accept: () => 'no' }));
        act(() => void result.current.add([file('a.png', 'image/png')]));

        expect(created).toHaveLength(0);
    });
});

describe('paste and drop', () => {
    it('reports that it consumed a pasted file', () => {
        const { result } = renderHook(() => useAttachments());
        let consumed = false;

        act(() => {
            consumed = result.current.handlePaste({
                clipboardData: { files: [file('a.png', 'image/png')] },
            } as never);
        });

        // A pasted image also carries a text fallback; the caller needs to know
        // not to insert it as well.
        expect(consumed).toBe(true);
        expect(result.current.attachments).toHaveLength(1);
    });

    it('leaves a text-only paste alone', () => {
        const { result } = renderHook(() => useAttachments());
        let consumed = true;

        act(() => {
            consumed = result.current.handlePaste({ clipboardData: { files: [] } } as never);
        });

        expect(consumed).toBe(false);
    });

    it('reports that it consumed a drop', () => {
        const { result } = renderHook(() => useAttachments());
        let consumed = false;

        act(() => {
            consumed = result.current.handleDrop({
                dataTransfer: { files: [file('a.png', 'image/png')] },
            } as never);
        });

        expect(consumed).toBe(true);
    });

    it('ignores a drag carrying no files', () => {
        const { result } = renderHook(() => useAttachments());
        let consumed = true;

        act(() => {
            consumed = result.current.handleDrop({ dataTransfer: { files: [] } } as never);
        });

        expect(consumed).toBe(false);
    });
});
