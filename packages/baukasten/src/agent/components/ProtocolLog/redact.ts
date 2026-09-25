/**
 * Removing what must not be shown from a traffic dump.
 *
 * `requestState` is the one that matters. Servers are told to put
 * integrity-protected authorization context in it — the specification's own
 * example value is an "AEAD-protected blob", and it can carry the authenticated
 * principal, a TTL and a request digest — and clients **must not** inspect it.
 * A debugging view that prints it by default puts a credential into every log
 * file, screenshot and bug report made with this component.
 *
 * So redaction is the default and the behaviour, not an option someone
 * remembers to switch on.
 *
 * Pure, and tested without a DOM.
 */

/** The placeholder, so a reader can see that something was there. */
export const REDACTED = '[redacted]';

/**
 * Keys removed by default.
 *
 * `requestState` is required by the specification. The rest are the names a
 * bearer token actually travels under, included because a traffic viewer is
 * pointed at real servers and the cost of over-redacting is a reader clicking
 * "show" while the cost of under-redacting is a leaked credential.
 */
export const SENSITIVE_KEYS: readonly string[] = [
    'requestState',
    'authorization',
    'access_token',
    'refresh_token',
    'id_token',
    'apiKey',
    'api_key',
    'client_secret',
    'password',
    'secret',
    'token',
];

function isSensitive(key: string, keys: readonly string[]): boolean {
    const lower = key.toLowerCase();
    return keys.some((candidate) => candidate.toLowerCase() === lower);
}

/**
 * Deep-copies a payload with sensitive values replaced.
 *
 * Cyclic structures are handled rather than assumed away: a payload arrives
 * from a transport this library does not control, and a viewer that throws on
 * one is a viewer that crashes exactly when someone is debugging.
 */
export function redact(
    value: unknown,
    keys: readonly string[] = SENSITIVE_KEYS,
    seen: WeakSet<object> = new WeakSet(),
): unknown {
    if (value === null || typeof value !== 'object') return value;

    if (seen.has(value)) return '[circular]';
    seen.add(value);

    if (Array.isArray(value)) {
        return value.map((item) => redact(item, keys, seen));
    }

    const out: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
        out[key] = isSensitive(key, keys) ? REDACTED : redact(item, keys, seen);
    }

    return out;
}

/** True when anything in the payload was, or would be, redacted. */
export function hasSensitive(value: unknown, keys: readonly string[] = SENSITIVE_KEYS): boolean {
    return JSON.stringify(redact(value, keys))?.includes(`"${REDACTED}"`) ?? false;
}
