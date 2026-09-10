import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { startTransition, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tree, flattenTree } from './Tree';
import type { TreeNodeData } from './Tree';

/**
 * These tests pin the rendering contract, not the styling: that a collapsed
 * branch produces no rows at all, and that a bounded tree mounts a slice rather
 * than the whole visible list.
 *
 * jsdom has no layout engine, so the *exact* number of windowed rows is
 * meaningless here. The assertions below only check that it is bounded and far
 * below the total, which holds either way.
 */

// ─── Test data ────────────────────────────────────────────────────────────────

const nodes: TreeNodeData[] = [
    {
        id: 'src',
        label: 'src',
        children: [
            { id: 'src/a.ts', label: 'a.ts' },
            {
                id: 'src/deep',
                label: 'deep',
                children: [{ id: 'src/deep/b.ts', label: 'b.ts' }],
            },
        ],
    },
    { id: 'readme', label: 'README.md' },
];

/** Builds a perfectly balanced tree: `branching ^ depth` rows in total. */
function makeTree(depth: number, branching: number, prefix = 'n'): TreeNodeData[] {
    if (depth === 0) return [];
    return Array.from({ length: branching }, (_, i) => {
        const id = `${prefix}-${i}`;
        const children = makeTree(depth - 1, branching, id);
        return { id, label: id, ...(children.length ? { children } : {}) };
    });
}

/** A single folder holding `count` files — the shape windowing exists for. */
function makeFlatFolder(count: number): TreeNodeData[] {
    return [
        {
            id: 'big',
            label: 'big',
            children: Array.from({ length: count }, (_, i) => ({
                id: `f${i}`,
                label: `file-${i}.ts`,
            })),
        },
    ];
}

const rowCount = (container: HTMLElement) =>
    container.querySelectorAll('[data-tree-node-id]').length;

// ─── Fake layout ──────────────────────────────────────────────────────────────

/**
 * jsdom has no layout engine, so every element measures 0×0 and nothing
 * scrolls. Windowing cannot be exercised at all without standing in for the
 * measurements `@tanstack/virtual-core` reads:
 *
 *   · `offsetWidth` / `offsetHeight` — viewport size (it uses the offset
 *     properties, not `getBoundingClientRect`),
 *   · `scrollHeight` / `clientHeight` — scroll range, which caps
 *     `scrollToIndex`; at jsdom's zeros every target clamps to 0,
 *   · `scrollTop`, and a `scrollTo` that moves it and fires `scroll`.
 *
 * `scrollTo` fires synchronously where a browser would wait a frame. That keeps
 * the tests free of waiting, at the price of React logging "flushSync was
 * called from inside a lifecycle method" when a scroll lands mid-commit — an
 * artefact of the stand-in, not of the component.
 */
const VIEWPORT_HEIGHT = 300;

/**
 * Height the fake layout reports for a row. Rows are measured now rather than
 * given an imposed height, so this is what the virtualizer will believe — and
 * tests can move it to stand in for a larger host font.
 */
let fakeRowHeight = 24;

/**
 * Descriptors displaced by {@link installFakeLayout}, so they can be put back
 * exactly. `delete` is not good enough: jsdom defines `offsetHeight`,
 * `scrollTo` and the rest itself, and deleting them takes the real
 * implementations out with the stand-ins.
 */
const displaced: Array<[object, string, PropertyDescriptor | undefined]> = [];

function patch(target: object, prop: string, descriptor: PropertyDescriptor) {
    displaced.push([target, prop, Object.getOwnPropertyDescriptor(target, prop)]);
    Object.defineProperty(target, prop, { configurable: true, ...descriptor });
}

/**
 * A `ResizeObserver` that records what it was asked to watch, so a test can
 * decide when the observation lands.
 *
 * The shared test setup stubs `ResizeObserver` out entirely, which leaves the
 * virtualizer with only the measurement it takes as each row's ref attaches —
 * and that runs inside React's commit, where the library's `flushSync` cannot
 * flush. In a browser the real observer fires afterwards and the measurement
 * settles; here nothing ever fires, so a measured height would never reach the
 * scroll extent. {@link flushResizeObservers} stands in for that second pass.
 */
const observations = new Set<{ callback: ResizeObserverCallback; targets: Set<Element> }>();

class RecordingResizeObserver {
    private readonly observation: { callback: ResizeObserverCallback; targets: Set<Element> };

    constructor(callback: ResizeObserverCallback) {
        this.observation = { callback, targets: new Set() };
        observations.add(this.observation);
    }

    observe(target: Element) {
        this.observation.targets.add(target);
    }

    unobserve(target: Element) {
        this.observation.targets.delete(target);
    }

    disconnect() {
        this.observation.targets.clear();
        observations.delete(this.observation);
    }
}

/** Deliver a resize for every observed element, at its current fake height. */
function flushResizeObservers() {
    for (const { callback, targets } of [...observations]) {
        const entries = [...targets]
            .filter((target) => target.isConnected)
            .map((target) => ({
                target,
                borderBoxSize: [
                    {
                        blockSize: (target as HTMLElement).offsetHeight,
                        inlineSize: (target as HTMLElement).offsetWidth,
                    },
                ],
            }));
        if (entries.length > 0) {
            callback(entries as unknown as ResizeObserverEntry[], {} as ResizeObserver);
        }
    }
}

function installFakeLayout() {
    // Rows report their own height and everything else reports the viewport's.
    // A single global `offsetHeight` would tell the virtualizer that each row
    // is a full viewport tall, and nothing would window.
    patch(HTMLElement.prototype, 'offsetHeight', {
        get(this: HTMLElement) {
            return this.getAttribute('role') === 'treeitem' ? fakeRowHeight : VIEWPORT_HEIGHT;
        },
    });
    patch(HTMLElement.prototype, 'offsetWidth', { get: () => 400 });
    patch(Element.prototype, 'clientHeight', { get: () => VIEWPORT_HEIGHT });
    patch(Element.prototype, 'scrollHeight', {
        get(this: Element) {
            const canvas = this.firstElementChild as HTMLElement | null;
            const height = canvas?.style.height;
            return height ? parseFloat(height) : VIEWPORT_HEIGHT;
        },
    });
    patch(Element.prototype, 'scrollTop', {
        get(this: Element & { __scrollTop?: number }) {
            return this.__scrollTop ?? 0;
        },
        set(this: Element & { __scrollTop?: number }, value: number) {
            this.__scrollTop = value;
        },
    });
    patch(Element.prototype, 'scrollTo', {
        value: function (this: Element, ...args: unknown[]) {
            const options = args[0] as ScrollToOptions | undefined;
            if (options && typeof options === 'object' && typeof options.top === 'number') {
                (this as Element & { __scrollTop?: number }).__scrollTop = options.top;
            }
            this.dispatchEvent(new Event('scroll'));
        },
        writable: true,
    });
    patch(globalThis, 'ResizeObserver', { value: RecordingResizeObserver, writable: true });
}

function removeFakeLayout() {
    for (const [target, prop, original] of displaced.reverse()) {
        if (original) {
            Object.defineProperty(target, prop, original);
        } else {
            delete (target as Record<string, unknown>)[prop];
        }
    }
    displaced.length = 0;
    observations.clear();
    fakeRowHeight = 24;
}

const allExpanded = (list: TreeNodeData[]): string[] => {
    const keys: string[] = [];
    const walk = (l: TreeNodeData[]) => {
        for (const n of l) {
            if (n.children?.length) {
                keys.push(n.id);
                walk(n.children);
            }
        }
    };
    walk(list);
    return keys;
};

// ─── Flattening ───────────────────────────────────────────────────────────────

describe('flattenTree', () => {
    it('descends only into expanded branches', () => {
        const { rows } = flattenTree(nodes, new Set(['src']));

        expect(rows.map((r) => r.node.id)).toEqual(['src', 'src/a.ts', 'src/deep', 'readme']);
        // `src/deep` is collapsed, so its child is never visited at all —
        // this is what keeps the walk proportional to what is on screen.
        expect(rows.some((r) => r.node.id === 'src/deep/b.ts')).toBe(false);
    });

    it('records the depth, parent and sibling position of each row', () => {
        const { rows, indexById } = flattenTree(nodes, new Set(['src']));
        const deep = rows[indexById.get('src/deep')!];

        expect(deep.depth).toBe(1);
        expect(deep.parentIndex).toBe(indexById.get('src'));
        expect(deep.posInSet).toBe(2);
        expect(deep.setSize).toBe(2);
        expect(deep.isLast).toBe(true);
    });

    it('sets a guide bit only for ancestors that still have a sibling below', () => {
        // a (has sibling b) > a1 (last) > a1x
        const data: TreeNodeData[] = [
            {
                id: 'a',
                label: 'a',
                children: [{ id: 'a1', label: 'a1', children: [{ id: 'a1x', label: 'a1x' }] }],
            },
            { id: 'b', label: 'b' },
        ];
        const { rows, indexById } = flattenTree(data, new Set(['a', 'a1']));

        // `a` is at depth 0 and has `b` below it, so bit 0 is set for its
        // descendants. `a1` is last among its siblings, so bit 1 is not.
        //
        // Bit 0 is recorded but never drawn — a column hangs one gutter left of
        // its children and depth 0 has no gutter to its left, so root siblings
        // go unconnected. It is set anyway so the rule "bit `d` means the
        // ancestor at depth `d` continues" needs no special case. The rendering
        // side of that is pinned in 'Tree edge guides' below.
        const a1x = rows[indexById.get('a1x')!];
        expect(a1x.guideMask & (1 << 0)).not.toBe(0);
        expect(a1x.guideMask & (1 << 1)).toBe(0);
    });
});

// ─── Mounting ─────────────────────────────────────────────────────────────────

describe('Tree row mounting', () => {
    it('does not render the children of a collapsed node', () => {
        render(<Tree nodes={nodes} />);

        expect(screen.getByText('src')).toBeInTheDocument();
        expect(screen.queryByText('a.ts')).not.toBeInTheDocument();
        expect(screen.queryByText('deep')).not.toBeInTheDocument();
    });

    it('mounts one level per expanded ancestor, not the whole subtree', () => {
        render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);

        expect(screen.getByText('a.ts')).toBeInTheDocument();
        expect(screen.getByText('deep')).toBeInTheDocument();
        expect(screen.queryByText('b.ts')).not.toBeInTheDocument();
    });

    it('mounts children in the same commit as the expand', () => {
        render(<Tree nodes={nodes} />);

        fireEvent.click(screen.getByText('src'));

        expect(screen.getByText('a.ts')).toBeInTheDocument();
    });

    it('drops children immediately on collapse', () => {
        render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);

        fireEvent.click(screen.getByText('src'));

        // Nothing to wait for any more. The rows used to linger for up to
        // 500ms so the height transition could play out; there is no height
        // transition now, so keeping them would just be dead DOM.
        expect(screen.queryByText('a.ts')).not.toBeInTheDocument();
    });

    it('keeps the DOM proportional to visible rows rather than to the dataset', () => {
        // 4 ^ 4 = 340 rows in total, 4 of them visible while everything is collapsed.
        const { container } = render(<Tree nodes={makeTree(4, 4)} />);

        expect(rowCount(container)).toBe(4);

        fireEvent.click(screen.getByText('n-0'));

        expect(rowCount(container)).toBe(8);
    });
});

// ─── Windowing ────────────────────────────────────────────────────────────────

describe('Tree windowing', () => {
    const BIG = 5000;

    beforeEach(installFakeLayout);
    afterEach(removeFakeLayout);

    it('mounts every visible row when the tree has no bounded height', () => {
        const { container } = render(
            <Tree nodes={makeFlatFolder(BIG)} defaultExpandedKeys={['big']} />,
        );

        // Unbounded: the tree grows with its content, so there is no viewport
        // to window against and the whole visible list is mounted.
        expect(rowCount(container)).toBe(BIG + 1);
    });

    it('mounts a slice when given a bounded height', () => {
        const { container } = render(
            <Tree nodes={makeFlatFolder(BIG)} defaultExpandedKeys={['big']} maxHeight={300} />,
        );

        expect(rowCount(container)).toBeGreaterThan(0);
        expect(rowCount(container)).toBeLessThan(100);
    });

    it('reserves the full scroll height even though most rows do not exist', () => {
        const { container } = render(
            <Tree
                nodes={makeFlatFolder(BIG)}
                defaultExpandedKeys={['big']}
                maxHeight={300}
                estimatedRowHeight={24}
            />,
        );

        // The scrollbar has to represent the whole list, not the mounted slice.
        const canvas = container.querySelector<HTMLElement>('[role="presentation"]')!;
        expect(canvas.style.height).toBe(`${(BIG + 1) * 24}px`);
    });

    it('fills the parent when asked, and windows against it', () => {
        const { container } = render(
            <Tree nodes={makeFlatFolder(BIG)} defaultExpandedKeys={['big']} fillHeight />,
        );

        const tree = container.querySelector<HTMLElement>('[role="tree"]')!;
        expect(tree.style.height).toBe('100%');
        expect(rowCount(container)).toBeLessThan(100);
    });

    it('mounts more rows as overscan grows', () => {
        const props = { nodes: makeFlatFolder(BIG), defaultExpandedKeys: ['big'], maxHeight: 300 };

        const tight = render(<Tree {...props} overscan={0} />);
        const tightCount = rowCount(tight.container);
        tight.unmount();

        const loose = render(<Tree {...props} overscan={20} />);

        expect(rowCount(loose.container)).toBeGreaterThan(tightCount);
    });

    it('honours disableVirtualization even with a bounded height', () => {
        const { container } = render(
            <Tree
                nodes={makeFlatFolder(BIG)}
                defaultExpandedKeys={['big']}
                maxHeight={300}
                disableVirtualization
            />,
        );

        expect(rowCount(container)).toBe(BIG + 1);
    });

    /**
     * A bounded tree has to scroll whether or not its rows are windowed.
     * `disableVirtualization` used to take the scroll area away with the
     * windowing, which left `maxHeight` clipping every row below the fold with
     * no way to reach them.
     */
    it.each([
        ['maxHeight, windowed', { maxHeight: 300 }],
        ['maxHeight, not windowed', { maxHeight: 300, disableVirtualization: true }],
        ['fillHeight, windowed', { fillHeight: true }],
        ['fillHeight, not windowed', { fillHeight: true, disableVirtualization: true }],
    ])('scrolls when bounded by %s', (_label, boundingProps) => {
        const { container } = render(
            <Tree nodes={makeFlatFolder(200)} defaultExpandedKeys={['big']} {...boundingProps} />,
        );

        const tree = container.querySelector<HTMLElement>('[role="tree"]')!;
        expect(getComputedStyle(tree).overflowY).toBe('auto');
    });

    it('leaves an unbounded tree to grow instead of scroll', () => {
        const { container } = render(
            <Tree nodes={makeFlatFolder(200)} defaultExpandedKeys={['big']} />,
        );

        const tree = container.querySelector<HTMLElement>('[role="tree"]')!;
        expect(getComputedStyle(tree).overflowY).not.toBe('auto');
    });

    /**
     * Rows used to be given the estimate as an exact inline height. That number
     * comes from the rem-based spacing scale while the text inside is sized from
     * `--vscode-font-size`, so on a host with a larger UI font the real row
     * outgrew its slot and was squashed back into it. Rows are measured now, so
     * a row taller than the estimate moves the scroll extent instead.
     */
    it('reserves the measured row height, not the estimate', () => {
        fakeRowHeight = 40;

        const { container } = render(
            <Tree
                nodes={makeFlatFolder(BIG)}
                defaultExpandedKeys={['big']}
                maxHeight={300}
                estimatedRowHeight={24}
            />,
        );

        const rows = container.querySelectorAll<HTMLElement>('[role="treeitem"]');
        expect(rows.length).toBeGreaterThan(0);
        for (const row of rows) {
            expect(row.style.height).toBe('');
            expect(row.style.minHeight).toBe('');
        }

        act(() => flushResizeObservers());

        // Every mounted row measured 40px, so the canvas has to have grown past
        // the (BIG + 1) * 24 the estimate alone would have given it.
        const canvas = container.querySelector<HTMLElement>('[role="presentation"]')!;
        expect(parseFloat(canvas.style.height)).toBeGreaterThan((BIG + 1) * 24);
    });
});

// ─── Scale ────────────────────────────────────────────────────────────────────

describe('Tree at repository scale', () => {
    // 11 + 121 + 1331 + 14641 = 16,104 nodes, in the shape of a source tree
    // four directories deep. The reported case was a 14,000-file repository
    // that mounted 26,993 elements and took 640ms to expand, rising to 887ms
    // once several branches were open.
    const repo = makeTree(4, 11);
    const everyDirectory = allExpanded(repo);

    beforeEach(installFakeLayout);
    afterEach(removeFakeLayout);

    it('mounts only the visible roots while collapsed', () => {
        const { container } = render(<Tree nodes={repo} maxHeight={400} />);

        expect(rowCount(container)).toBe(11);
    });

    it('mounts a viewport-sized slice with every directory expanded', () => {
        const { container } = render(
            <Tree nodes={repo} defaultExpandedKeys={everyDirectory} maxHeight={400} />,
        );

        // Every one of the 16,104 rows is visible in the sense that no ancestor
        // is collapsed; the point is that being visible no longer means being
        // mounted. Measured here: 21 rows and 69 elements in total, against the
        // 26,993 elements the recursive version put on the page for a
        // comparable tree.
        //
        // 21 rather than ~17 because the fake layout reports a 300px viewport
        // regardless of `maxHeight` — 12 rows plus 8 overscan. The bounds below
        // are deliberately loose; what is being pinned is that the number does
        // not scale with the dataset, not its exact value.
        expect(rowCount(container)).toBeLessThan(50);
        expect(container.querySelectorAll('*').length).toBeLessThan(300);
    });

    it('keeps the mounted set bounded after expanding another branch', () => {
        const { container } = render(<Tree nodes={repo} maxHeight={400} />);

        fireEvent.click(screen.getByText('n-0'));
        fireEvent.click(screen.getByText('n-0-0'));
        fireEvent.click(screen.getByText('n-0-0-0'));

        // The cost of an expand used to grow with how much was already open,
        // because every mounted row re-rendered. Nothing here grows.
        expect(rowCount(container)).toBeLessThan(50);
    });
});

// ─── Re-render fan-out ────────────────────────────────────────────────────────

/**
 * `expandIcon` is called once per row per render, and this one is defined at
 * module scope so its identity never changes — an inline arrow would give the
 * shared context a new value on every parent render and re-render every row,
 * which is the very thing under test.
 */
const rendered: string[] = [];
const countingExpandIcon = ({ node }: { node: TreeNodeData }) => {
    rendered.push(node.id);
    return <span data-testid={`icon-${node.id}`} />;
};

describe('Tree re-render fan-out', () => {
    it('re-renders only the affected rows when the selection changes', () => {
        const data = makeFlatFolder(200);
        render(
            <Tree
                nodes={data}
                defaultExpandedKeys={['big']}
                expandIcon={countingExpandIcon}
                disableVirtualization
            />,
        );

        rendered.length = 0;
        fireEvent.click(screen.getByText('file-100.ts'));

        // Selecting used to re-render every mounted row, because expansion and
        // selection lived in the context each row subscribed to. Only the rows
        // whose own `selected` / `tabbable` flags moved should render now: the
        // newly selected row and whichever row previously held the tab stop.
        expect(rendered.length).toBeGreaterThan(0);
        expect(rendered.length).toBeLessThanOrEqual(4);
        expect(rendered).toContain('f100');
    });

    /**
     * The same claim under windowing, where the row also holds a `measureRef`.
     * That prop has to keep one identity across renders — the virtualizer's own
     * bound method does, an inline arrow would not — or the memo stops holding
     * and every mounted row renders again on each selection.
     */
    it('re-renders only the affected rows while windowed', () => {
        installFakeLayout();
        try {
            render(
                <Tree
                    nodes={makeFlatFolder(200)}
                    defaultExpandedKeys={['big']}
                    expandIcon={countingExpandIcon}
                    maxHeight={300}
                />,
            );

            rendered.length = 0;
            fireEvent.click(screen.getByText('file-2.ts'));

            expect(rendered.length).toBeGreaterThan(0);
            expect(rendered.length).toBeLessThanOrEqual(4);
            expect(rendered).toContain('f2');
        } finally {
            removeFakeLayout();
        }
    });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('Tree flat ARIA', () => {
    it('states level, position and set size on each row', () => {
        render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);

        const src = screen.getByText('src').closest('[role="treeitem"]')!;
        expect(src).toHaveAttribute('aria-level', '1');
        expect(src).toHaveAttribute('aria-posinset', '1');
        expect(src).toHaveAttribute('aria-setsize', '2');

        const deep = screen.getByText('deep').closest('[role="treeitem"]')!;
        expect(deep).toHaveAttribute('aria-level', '2');
        expect(deep).toHaveAttribute('aria-posinset', '2');
        expect(deep).toHaveAttribute('aria-setsize', '2');
    });

    it('keeps treeitems directly under the tree in the accessibility tree', () => {
        const { container } = render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);

        // The canvas is the only element between them and it is presentational,
        // so `treeitem`'s required context role is still satisfied.
        const canvas = container.querySelector('[role="tree"] > *')!;
        expect(canvas).toHaveAttribute('role', 'presentation');
        expect(container.querySelector('[role="group"]')).toBeNull();
    });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('Tree keyboard navigation', () => {
    const focusedId = () => document.activeElement?.getAttribute('data-tree-node-id');

    it('moves down and up the flattened row order', () => {
        const { container } = render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);
        const tree = container.querySelector('[role="tree"]')!;

        // Nothing is focused yet, so the first ArrowDown lands on the first row
        // rather than stepping past it.
        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        expect(focusedId()).toBe('src');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        expect(focusedId()).toBe('src/a.ts');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        expect(focusedId()).toBe('src/deep');

        fireEvent.keyDown(tree, { key: 'ArrowUp' });
        expect(focusedId()).toBe('src/a.ts');
    });

    it('moves to the parent with ArrowLeft on a row that cannot collapse', () => {
        const { container } = render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);
        const tree = container.querySelector('[role="tree"]')!;

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        expect(focusedId()).toBe('src/a.ts');

        // Previously a no-op: the row had no way to find its parent without
        // searching the whole dataset, so the case was left unimplemented.
        fireEvent.keyDown(tree, { key: 'ArrowLeft' });
        expect(focusedId()).toBe('src');
    });

    it('collapses an expanded row with ArrowLeft before leaving it', () => {
        const { container } = render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);
        const tree = container.querySelector('[role="tree"]')!;

        fireEvent.keyDown(tree, { key: 'Home' });
        expect(focusedId()).toBe('src');

        fireEvent.keyDown(tree, { key: 'ArrowLeft' });
        expect(screen.queryByText('a.ts')).not.toBeInTheDocument();
    });

    it('expands with ArrowRight, then steps into the first child', () => {
        const { container } = render(<Tree nodes={nodes} />);
        const tree = container.querySelector('[role="tree"]')!;

        fireEvent.keyDown(tree, { key: 'Home' });
        fireEvent.keyDown(tree, { key: 'ArrowRight' });
        expect(screen.getByText('a.ts')).toBeInTheDocument();

        fireEvent.keyDown(tree, { key: 'ArrowRight' });
        expect(focusedId()).toBe('src/a.ts');
    });

    it('jumps to the last visible row with End', () => {
        const { container } = render(<Tree nodes={nodes} defaultExpandedKeys={['src']} />);
        const tree = container.querySelector('[role="tree"]')!;

        fireEvent.keyDown(tree, { key: 'End' });
        expect(focusedId()).toBe('readme');
    });

    // Its own block, so the prototype patches come back off even when an
    // assertion throws part-way through.
    describe('windowed', () => {
        beforeEach(installFakeLayout);
        afterEach(removeFakeLayout);

        it('scrolls a windowed row into the window before focusing it', () => {
            const { container } = render(
                <Tree nodes={makeFlatFolder(5000)} defaultExpandedKeys={['big']} maxHeight={300} />,
            );
            const tree = container.querySelector('[role="tree"]')!;

            // Row 5000 is nowhere near the mounted slice, so focusing it
            // requires the virtualizer to bring it into the window first.
            fireEvent.keyDown(tree, { key: 'End' });

            expect(container.querySelector('[data-tree-row-index="5000"]')).not.toBeNull();
            expect(focusedId()).toBe('f4999');
        });
    });

    it('runs a consumer onKeyDown without losing its own navigation', () => {
        const onKeyDown = vi.fn();
        const { container } = render(
            <Tree nodes={nodes} defaultExpandedKeys={['src']} onKeyDown={onKeyDown} />,
        );
        const tree = container.querySelector('[role="tree"]')!;

        // The props spread sits after `onKeyDown` on the container, so a
        // consumer handler used to replace the navigation outright.
        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(focusedId()).toBe('src');
    });

    it('lets a consumer claim a key by preventing default', () => {
        const { container } = render(
            <Tree
                nodes={nodes}
                defaultExpandedKeys={['src']}
                onKeyDown={(e) => e.preventDefault()}
            />,
        );
        const tree = container.querySelector('[role="tree"]')!;

        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        expect(focusedId()).toBeNull();
    });
});

// ─── Edge guides ──────────────────────────────────────────────────────────────

describe('Tree edge guides', () => {
    it('draws no guide elements when edges are off', () => {
        const { container } = render(
            <Tree nodes={nodes} defaultExpandedKeys={allExpanded(nodes)} />,
        );

        expect(container.querySelectorAll('[data-tree-guide]').length).toBe(0);
    });

    /**
     * Root nodes are drawn without guides — they have no gutter to their left
     * to hang a line in — so a continuing ancestor column only becomes visible
     * from depth 2 down. Both cases below therefore branch at depth 1.
     */
    const withMiddleSibling: TreeNodeData[] = [
        {
            id: 'r',
            label: 'r',
            children: [
                { id: 'c1', label: 'c1', children: [{ id: 'g1', label: 'g1' }] },
                { id: 'c2', label: 'c2' },
            ],
        },
    ];

    const withoutMiddleSibling: TreeNodeData[] = [
        {
            id: 'r',
            label: 'r',
            children: [{ id: 'c1', label: 'c1', children: [{ id: 'g1', label: 'g1' }] }],
        },
    ];

    it('draws one ancestor column per continuing branch, plus its own elbow', () => {
        render(
            <Tree nodes={withMiddleSibling} defaultExpandedKeys={['r', 'c1']} edgeStyle="solid" />,
        );

        // `g1` sits at depth 2 under `c1`, which still has `c2` below it — so
        // c1's column has to run through g1's row to reach it.
        const row = screen.getByText('g1').closest('[role="treeitem"]')!;
        expect(row.querySelectorAll('[data-tree-guide="ancestor"]').length).toBe(1);
        expect(row.querySelectorAll('[data-tree-guide="own"]').length).toBe(1);
        expect(row.querySelectorAll('[data-tree-guide="elbow"]').length).toBe(1);
    });

    it('does not draw an ancestor column for a branch that has ended', () => {
        render(
            <Tree
                nodes={withoutMiddleSibling}
                defaultExpandedKeys={['r', 'c1']}
                edgeStyle="solid"
            />,
        );

        // `c1` is now the only child, so nothing continues past `g1`: it draws
        // its own vertical and elbow and no ancestor column.
        const row = screen.getByText('g1').closest('[role="treeitem"]')!;
        expect(row.querySelectorAll('[data-tree-guide="ancestor"]').length).toBe(0);
        expect(row.querySelectorAll('[data-tree-guide]').length).toBe(2);
    });

    /**
     * Guides are drawn from `guideMask` rather than from the ancestors' own
     * markup, precisely so a row can draw them while its ancestors are outside
     * the window and unmounted. Windowing is the case that matters.
     */
    it('draws the same guides when the ancestors are not mounted', () => {
        installFakeLayout();
        try {
            const { container } = render(
                <Tree
                    nodes={withMiddleSibling}
                    defaultExpandedKeys={['r', 'c1']}
                    edgeStyle="solid"
                    maxHeight={300}
                />,
            );

            const row = screen.getByText('g1').closest('[role="treeitem"]')!;
            expect(row.querySelectorAll('[data-tree-guide="ancestor"]').length).toBe(1);
            expect(row.querySelectorAll('[data-tree-guide="elbow"]').length).toBe(1);

            const tree = container.querySelector<HTMLElement>('[role="tree"]')!;
            expect(getComputedStyle(tree).overflowY).toBe('auto');
        } finally {
            removeFakeLayout();
        }
    });
});

// ─── Controlled state ─────────────────────────────────────────────────────────

describe('Tree controlled state', () => {
    it('follows the expandedKeys prop and reports every change', () => {
        const onExpandChange = vi.fn();
        const { rerender } = render(
            <Tree nodes={nodes} expandedKeys={[]} onExpandChange={onExpandChange} />,
        );

        expect(screen.queryByText('a.ts')).not.toBeInTheDocument();

        // Controlled: clicking reports, but nothing opens until the prop moves.
        fireEvent.click(screen.getByText('src'));
        expect(onExpandChange).toHaveBeenCalledWith(
            ['src'],
            expect.objectContaining({ key: 'src', expanded: true }),
        );
        expect(screen.queryByText('a.ts')).not.toBeInTheDocument();

        rerender(<Tree nodes={nodes} expandedKeys={['src']} onExpandChange={onExpandChange} />);
        expect(screen.getByText('a.ts')).toBeInTheDocument();
    });

    it('follows the selectedKey prop and reports every change', () => {
        const onSelect = vi.fn();
        const { rerender } = render(
            <Tree
                nodes={nodes}
                defaultExpandedKeys={['src']}
                selectedKey={null}
                onSelect={onSelect}
            />,
        );

        fireEvent.click(screen.getByText('a.ts'));
        expect(onSelect).toHaveBeenCalledWith(
            'src/a.ts',
            expect.objectContaining({ id: 'src/a.ts' }),
        );
        expect(screen.getByText('a.ts').closest('[role="treeitem"]')).toHaveAttribute(
            'aria-selected',
            'false',
        );

        rerender(
            <Tree
                nodes={nodes}
                defaultExpandedKeys={['src']}
                selectedKey="src/a.ts"
                onSelect={onSelect}
            />,
        );
        expect(screen.getByText('a.ts').closest('[role="treeitem"]')).toHaveAttribute(
            'aria-selected',
            'true',
        );
    });

    /**
     * The callbacks read the current expansion set through a ref. That ref is
     * filled in an effect rather than during render, because a render started
     * inside a transition can be abandoned — and a ref written by an abandoned
     * render would make the next toggle compute from a state nobody committed.
     */
    it('toggles correctly when the consumer defers state in a transition', () => {
        const Deferred = () => {
            const [keys, setKeys] = useState<string[]>([]);
            return (
                <Tree
                    nodes={nodes}
                    expandedKeys={keys}
                    onExpandChange={(next) => startTransition(() => setKeys(next))}
                />
            );
        };

        render(<Deferred />);

        act(() => {
            fireEvent.click(screen.getByText('src'));
        });
        expect(screen.getByText('deep')).toBeInTheDocument();

        // The collapse has to be computed against the committed set, not
        // against whatever a discarded render happened to leave behind.
        act(() => {
            fireEvent.click(screen.getByText('src'));
        });
        expect(screen.queryByText('deep')).not.toBeInTheDocument();
    });

    /**
     * `expandedKeys` is compared by content, which is what lets a consumer
     * derive it inline. The comparison adjusts state during render, so the two
     * things worth pinning are that it settles rather than looping, and that a
     * real change still gets through.
     */
    describe('inline-derived expandedKeys', () => {
        const Derived = ({ open }: { open: Record<string, boolean> }) => {
            const [, force] = useState(0);
            // A fresh array identity on every render, by construction.
            const keys = Object.keys(open).filter((key) => open[key]);
            return (
                <>
                    <button onClick={() => force((n) => n + 1)}>rerender</button>
                    <Tree nodes={nodes} expandedKeys={keys} />
                </>
            );
        };

        it('settles instead of looping, and survives a parent re-render', () => {
            render(<Derived open={{ src: true }} />);
            expect(screen.getByText('a.ts')).toBeInTheDocument();

            fireEvent.click(screen.getByText('rerender'));

            expect(screen.getByText('a.ts')).toBeInTheDocument();
        });

        it('still applies a genuine change', () => {
            const { rerender } = render(<Derived open={{ src: true }} />);
            expect(screen.getByText('deep')).toBeInTheDocument();
            expect(screen.queryByText('b.ts')).not.toBeInTheDocument();

            rerender(<Derived open={{ src: true, 'src/deep': true }} />);
            expect(screen.getByText('b.ts')).toBeInTheDocument();

            rerender(<Derived open={{}} />);
            expect(screen.queryByText('a.ts')).not.toBeInTheDocument();
        });
    });
});

// ─── Custom expand icon ───────────────────────────────────────────────────────

describe('Tree custom expand icon', () => {
    const iconFor = ({ hasChildren }: { hasChildren: boolean }) => (
        <span data-testid={hasChildren ? 'branch-icon' : 'leaf-icon'} />
    );

    it('does not put leaf ids into the expanded set', () => {
        const onExpandChange = vi.fn();
        render(
            <Tree
                nodes={nodes}
                defaultExpandedKeys={['src']}
                expandIcon={iconFor}
                expandOnClick={false}
                onExpandChange={onExpandChange}
            />,
        );

        // A leaf gets a custom icon too, and its wrapper is clickable. Toggling
        // it would hand the consumer an id that nothing ever reads back.
        fireEvent.click(screen.getAllByTestId('leaf-icon')[0]);

        expect(onExpandChange).not.toHaveBeenCalled();
    });

    it('still toggles a branch', () => {
        const onExpandChange = vi.fn();
        render(
            <Tree
                nodes={nodes}
                expandIcon={iconFor}
                expandOnClick={false}
                onExpandChange={onExpandChange}
            />,
        );

        fireEvent.click(screen.getAllByTestId('branch-icon')[0]);

        expect(onExpandChange).toHaveBeenCalledWith(
            ['src'],
            expect.objectContaining({ key: 'src', expanded: true }),
        );
    });
});
