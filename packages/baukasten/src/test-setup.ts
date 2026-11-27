import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock IntersectionObserver (required for virtual scrolling)
globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return [];
    }
    unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver (required for column resizing)
globalThis.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
} as unknown as typeof ResizeObserver;

// Mock requestAnimationFrame
globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 0) as unknown as number;
};

globalThis.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
};
