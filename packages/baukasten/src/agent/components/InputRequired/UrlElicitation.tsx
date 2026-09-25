import React from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import type { InputResponse, UrlInputRequest } from '../../types';
import * as styles from './InputRequired.css';

export interface UrlHazard {
    readonly kind: 'punycode' | 'insecure' | 'unparseable';
    readonly message: string;
}

/**
 * Reads the destination for the things a user cannot reasonably spot.
 *
 * Punycode is the one that matters: `xn--pypal-4ve.com` renders as something
 * indistinguishable from a name the user trusts, and no amount of showing the
 * address helps if the address itself is a lie.
 */
export function inspectUrl(raw: string): { host: string | null; hazards: readonly UrlHazard[] } {
    let parsed: URL;
    try {
        parsed = new URL(raw);
    } catch {
        return {
            host: null,
            hazards: [
                {
                    kind: 'unparseable',
                    message: 'This is not a valid address. Do not open it.',
                },
            ],
        };
    }

    const hazards: UrlHazard[] = [];

    if (parsed.hostname.split('.').some((part) => part.startsWith('xn--'))) {
        hazards.push({
            kind: 'punycode',
            message:
                'This address uses characters that can imitate a different domain. Check it carefully.',
        });
    }

    if (parsed.protocol !== 'https:') {
        hazards.push({
            kind: 'insecure',
            message: `This address is not secure (${parsed.protocol.replace(':', '')}).`,
        });
    }

    return { host: parsed.hostname, hazards };
}

export interface UrlElicitationProps extends React.HTMLAttributes<HTMLDivElement> {
    request: UrlInputRequest;
    /**
     * Opens the address. **Required** — there is no default.
     *
     * Opening is the host's job and varies by environment: a webview hands it
     * to the extension host, a browser app does something else entirely. More
     * importantly the address has to open somewhere neither this client nor a
     * model can observe, which is not a guarantee this component can make on
     * anyone's behalf.
     */
    onOpenUrl: (url: string) => void;
    onRespond?: (response: InputResponse) => void;
    openLabel?: string;
    cancelLabel?: string;
}

/**
 * Consent to leave for somewhere this client cannot see.
 *
 * Used when a server needs credentials, payment or third-party authorisation —
 * things that must never pass through the client at all. It is the most
 * security-sensitive component in the library, and almost every rule it
 * follows is a MUST:
 *
 * - the address is **never** opened automatically, and never pre-fetched
 * - the full address is shown for examination before anything happens
 * - the host is called out separately, so a lookalike subdomain is visible
 * - a punycode address is flagged, because it can imitate a trusted name
 *   convincingly enough that showing it is not by itself enough
 * - the address is never rendered as a link, because a clickable target
 *   invites the reflexive click that consent is supposed to interrupt
 *
 * Accepting means the user agreed to navigate — **not** that whatever happens
 * next succeeded. The outcome occurs out of band and is never reported back
 * here, which is why cancelling stays available afterwards.
 *
 * @example
 * ```tsx
 * <UrlElicitation
 *   request={request}
 *   onOpenUrl={(url) => host.openExternal(url)}
 *   onRespond={answer}
 * />
 * ```
 */
export const UrlElicitation: React.FC<UrlElicitationProps> = ({
    request,
    onOpenUrl,
    onRespond,
    openLabel = 'Open in browser',
    cancelLabel = 'Cancel',
    className,
    ...props
}) => {
    const { host, hazards } = inspectUrl(request.url);
    const unparseable = hazards.some((hazard) => hazard.kind === 'unparseable');

    return (
        <div className={clsx(styles.urlCard, className)} {...props}>
            <div className={styles.message}>{request.message}</div>

            {request.serverId && (
                <div className={styles.origin}>
                    <Icon name="server" size="xs" />
                    {request.serverId}
                </div>
            )}

            {host && (
                <div className={styles.origin}>
                    You will be taken to <span className={styles.host}>{host}</span>
                </div>
            )}

            {/* Shown in full, as text. Never as an anchor. */}
            <pre className={styles.url}>{request.url}</pre>

            {hazards.map((hazard) => (
                <div key={hazard.kind} className={styles.warning}>
                    <Icon name="warning" size="xs" />
                    <span>{hazard.message}</span>
                </div>
            ))}

            <div className={styles.actions}>
                <Button
                    size="sm"
                    variant="primary"
                    disabled={unparseable}
                    onClick={() => {
                        onOpenUrl(request.url);
                        onRespond?.({ key: request.key, action: 'accept' });
                    }}
                >
                    <Icon name="link-external" size="xs" />
                    {openLabel}
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onRespond?.({ key: request.key, action: 'cancel' })}
                >
                    {cancelLabel}
                </Button>
            </div>
        </div>
    );
};

UrlElicitation.displayName = 'UrlElicitation';
