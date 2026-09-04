'use client';

import { Badge, Heading, Icon, Paragraph, Tag, Text, type CodiconName } from 'baukasten-ui/core';
import styles from './demos.module.css';

export type DemoStatus =
    /** Runs in the browser — the action opens the demo itself. */
    | 'live'
    /** Needs a host (VS Code, Electron), so the action goes to the source. */
    | 'source'
    /** Not built yet. */
    | 'planned';

export interface DemoLink {
    label: string;
    href: string;
    icon?: CodiconName;
}

export interface DemoCardProps {
    title: string;
    description: string;
    icon: CodiconName;
    /** What is and isn't real — stated plainly rather than implied. */
    note?: string;
    /** Baukasten components the demo actually puts on screen */
    components: string[];
    /** Primary action target */
    href?: string;
    status?: DemoStatus;
    /** Additional links shown beside the primary action */
    links?: DemoLink[];
}

const ACTION: Record<Exclude<DemoStatus, 'planned'>, { label: string; icon: CodiconName }> = {
    live: { label: 'Open demo', icon: 'link-external' },
    source: { label: 'View source', icon: 'github' },
};

export default function DemoCard({
    title,
    description,
    icon,
    note,
    components,
    href,
    status = 'live',
    links = [],
}: DemoCardProps) {
    const planned = status === 'planned' || !href;
    const action = planned ? undefined : ACTION[status];

    /*
     * The actions are anchors styled as buttons rather than the Button
     * component: Button always renders <button>, and these navigate — so
     * keeping them links preserves middle-click, "open in new tab", and the
     * correct screen-reader role.
     */
    const actionClass = [styles.cardAction, status === 'source' && styles.cardActionSecondary]
        .filter(Boolean)
        .join(' ');

    return (
        <article className={[styles.card, planned && styles.cardPlanned].filter(Boolean).join(' ')}>
            <div className={styles.cardIcon}>
                <Icon name={icon} size="lg" />
            </div>

            <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                    <Heading level={3} className={styles.cardTitle}>
                        {title}
                    </Heading>
                    {planned && (
                        <Badge size="xs" variant="default">
                            Planned
                        </Badge>
                    )}
                    {status === 'source' && !planned && (
                        <Badge size="xs" variant="info">
                            Needs a host
                        </Badge>
                    )}
                </div>

                <Paragraph className={styles.cardDescription}>{description}</Paragraph>

                {note && (
                    <div className={styles.cardNote}>
                        <Icon name="info" size="sm" />
                        <Text>{note}</Text>
                    </div>
                )}

                <div className={styles.cardTags}>
                    {components.map((component) => (
                        <Tag key={component} size="xs" variant="secondary">
                            {component}
                        </Tag>
                    ))}
                </div>

                {!planned && (
                    <div className={styles.cardActions}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={actionClass}
                        >
                            {action?.label}
                            <Icon name={action?.icon ?? 'link-external'} size="sm" />
                        </a>

                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.cardSecondaryLink}
                            >
                                {link.label}
                                <Icon name={link.icon ?? 'link-external'} size="xs" />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
