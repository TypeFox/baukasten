/**
 * Remembering "always allow" without leaking it across servers.
 *
 * Small enough to be obvious, which is the point — this is the piece of an
 * agent client where a subtle bug hands out capability silently, so it is
 * better as thirty auditable lines than as a clever cache.
 */

import {
    approvalScopeKey,
    type ApprovalScope,
    type ApprovalScopeKey,
    type ServerId,
} from './types';

export interface RememberedDecision {
    readonly outcome: 'allow' | 'deny';
    readonly scope: ApprovalScope;
    readonly at?: number;
}

export interface PermissionQuery {
    readonly serverId: ServerId;
    readonly toolName: string;
}

export interface PermissionMemory {
    /**
     * The standing decision for this tool, if any.
     *
     * A tool-level decision wins over a server-level one: the more specific
     * grant is the more recent intent, and a blanket server allow should not
     * override a deliberate deny on one dangerous tool.
     */
    lookup(query: PermissionQuery): RememberedDecision | undefined;
    /** Records a decision. `once` scopes are ignored — they are not standing. */
    remember(decision: RememberedDecision): void;
    forget(scope: ApprovalScope): void;
    clear(): void;
    /** For persisting. Keys are opaque; do not parse them. */
    entries(): readonly (readonly [ApprovalScopeKey, RememberedDecision])[];
}

export interface CreatePermissionMemoryOptions {
    /** Restores previously persisted decisions. */
    readonly initial?: readonly (readonly [ApprovalScopeKey, RememberedDecision])[];
}

export function createPermissionMemory(
    options: CreatePermissionMemoryOptions = {},
): PermissionMemory {
    const store = new Map<ApprovalScopeKey, RememberedDecision>(options.initial ?? []);

    return {
        lookup({ serverId, toolName }) {
            // Specific first. A server-wide allow must not quietly override a
            // deny the user made about one particular tool.
            const byTool = approvalScopeKey({ level: 'tool', serverId, toolName });
            if (byTool !== null) {
                const found = store.get(byTool);
                if (found) return found;
            }

            const byServer = approvalScopeKey({ level: 'server', serverId });
            return byServer === null ? undefined : store.get(byServer);
        },

        remember(decision) {
            const key = approvalScopeKey(decision.scope);
            // A `once` decision has no key by construction, so this cannot
            // accidentally persist something the user meant for one call.
            if (key === null) return;
            store.set(key, decision);
        },

        forget(scope) {
            const key = approvalScopeKey(scope);
            if (key !== null) store.delete(key);
        },

        clear() {
            store.clear();
        },

        entries() {
            return [...store.entries()];
        },
    };
}
