import { describe, expect, it } from 'vitest';
import { createPermissionMemory } from './permissions';
import { approvalScopeKey, serverId } from './types';

const alpha = serverId('alpha');
const beta = serverId('beta');

describe('scope keys', () => {
    it('has no key for a one-off, so it cannot be persisted by accident', () => {
        expect(approvalScopeKey({ level: 'once' })).toBeNull();
    });

    it('separates identically-named tools on different servers', () => {
        // The whole reason ServerId exists. Two servers each exposing `search`
        // is the collision the specification warns about by name.
        const a = approvalScopeKey({ level: 'tool', serverId: alpha, toolName: 'search' });
        const b = approvalScopeKey({ level: 'tool', serverId: beta, toolName: 'search' });

        expect(a).not.toBe(b);
    });
});

describe('permission memory', () => {
    it('remembers a tool-level allow', () => {
        const memory = createPermissionMemory();
        memory.remember({
            outcome: 'allow',
            scope: { level: 'tool', serverId: alpha, toolName: 'search' },
        });

        expect(memory.lookup({ serverId: alpha, toolName: 'search' })?.outcome).toBe('allow');
    });

    it('does not let a grant leak to another server', () => {
        const memory = createPermissionMemory();
        memory.remember({
            outcome: 'allow',
            scope: { level: 'tool', serverId: alpha, toolName: 'search' },
        });

        // Fails open and silently if this ever regresses, which is why it is
        // the first thing worth pinning.
        expect(memory.lookup({ serverId: beta, toolName: 'search' })).toBeUndefined();
    });

    it('applies a server-level decision to any tool on that server', () => {
        const memory = createPermissionMemory();
        memory.remember({ outcome: 'allow', scope: { level: 'server', serverId: alpha } });

        expect(memory.lookup({ serverId: alpha, toolName: 'anything' })?.outcome).toBe('allow');
        expect(memory.lookup({ serverId: beta, toolName: 'anything' })).toBeUndefined();
    });

    it('lets a specific deny survive a blanket allow', () => {
        const memory = createPermissionMemory();
        memory.remember({ outcome: 'allow', scope: { level: 'server', serverId: alpha } });
        memory.remember({
            outcome: 'deny',
            scope: { level: 'tool', serverId: alpha, toolName: 'rm' },
        });

        // A deliberate decision about one dangerous tool must outrank a
        // convenience grant made about the server as a whole.
        expect(memory.lookup({ serverId: alpha, toolName: 'rm' })?.outcome).toBe('deny');
        expect(memory.lookup({ serverId: alpha, toolName: 'ls' })?.outcome).toBe('allow');
    });

    it('ignores a one-off decision rather than persisting it', () => {
        const memory = createPermissionMemory();
        memory.remember({ outcome: 'allow', scope: { level: 'once' } });

        expect(memory.entries()).toHaveLength(0);
    });

    it('forgets and clears', () => {
        const memory = createPermissionMemory();
        const scope = { level: 'tool', serverId: alpha, toolName: 'search' } as const;

        memory.remember({ outcome: 'allow', scope });
        memory.forget(scope);
        expect(memory.lookup({ serverId: alpha, toolName: 'search' })).toBeUndefined();

        memory.remember({ outcome: 'allow', scope });
        memory.clear();
        expect(memory.entries()).toHaveLength(0);
    });

    it('round-trips through its entries, so decisions can be persisted', () => {
        const first = createPermissionMemory();
        first.remember({
            outcome: 'allow',
            scope: { level: 'tool', serverId: alpha, toolName: 'search' },
        });

        const restored = createPermissionMemory({ initial: first.entries() });
        expect(restored.lookup({ serverId: alpha, toolName: 'search' })?.outcome).toBe('allow');
    });
});
