import { describe, expect, it } from 'vitest';
import { hasSensitive, redact, REDACTED, SENSITIVE_KEYS } from './redact';

describe('redact (T-61)', () => {
    it('removes requestState, which is the one the specification requires', () => {
        // Servers are told to put integrity-protected authorization context
        // here — the spec's own example is an AEAD-protected blob — and clients
        // must not inspect it. Printing it puts a credential in every
        // screenshot taken of a traffic view.
        const payload = { method: 'tools/call', requestState: 'AEAD:deadbeef' };

        expect(redact(payload)).toEqual({ method: 'tools/call', requestState: REDACTED });
    });

    it('reaches it wherever it is nested', () => {
        const payload = {
            params: { _meta: { requestState: 'secret' }, name: 'search' },
        };

        expect(redact(payload)).toEqual({
            params: { _meta: { requestState: REDACTED }, name: 'search' },
        });
    });

    it('redacts inside arrays', () => {
        const payload = { results: [{ token: 'abc' }, { token: 'def' }] };

        expect(redact(payload)).toEqual({
            results: [{ token: REDACTED }, { token: REDACTED }],
        });
    });

    it('matches keys regardless of case', () => {
        expect(redact({ Authorization: 'Bearer x' })).toEqual({ Authorization: REDACTED });
    });

    it('leaves everything else exactly as it was', () => {
        const payload = { method: 'tools/list', cursor: null, count: 0, ok: false };
        expect(redact(payload)).toEqual(payload);
    });

    it('survives a cyclic payload rather than throwing', () => {
        const payload: Record<string, unknown> = { method: 'tools/call' };
        payload.self = payload;

        // A payload comes from a transport this library does not control, and a
        // viewer that throws on a cycle crashes exactly when someone is
        // debugging.
        expect(redact(payload)).toEqual({ method: 'tools/call', self: '[circular]' });
    });

    it('does not mutate what it was given', () => {
        const payload = { requestState: 'secret' };
        redact(payload);

        expect(payload.requestState).toBe('secret');
    });

    it('accepts a caller-supplied key list', () => {
        expect(redact({ sessionCookie: 'x' }, ['sessionCookie'])).toEqual({
            sessionCookie: REDACTED,
        });
        // …and then only those, since the caller replaced the list.
        expect(redact({ requestState: 'x' }, ['sessionCookie'])).toEqual({ requestState: 'x' });
    });

    it('reports whether anything was withheld', () => {
        expect(hasSensitive({ requestState: 'x' })).toBe(true);
        expect(hasSensitive({ method: 'tools/list' })).toBe(false);
    });

    it('covers the names a bearer token actually travels under', () => {
        for (const key of SENSITIVE_KEYS) {
            expect(redact({ [key]: 'value' })).toEqual({ [key]: REDACTED });
        }
    });
});
