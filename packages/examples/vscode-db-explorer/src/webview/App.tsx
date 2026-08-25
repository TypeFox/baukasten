import React, { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
    SplitPane,
    Pane,
    Tree,
    type TreeNodeData,
    Breadcrumbs,
    Button,
    IconButton,
    Input,
    Icon,
    type CodiconName,
    Badge,
    Tag,
    Select,
    DataTable,
    StatusBar,
    StatusBarSection,
    StatusBarItem,
} from 'baukasten-ui';
import './App.css';

// ─── Mock data ───────────────────────────────────────────────────────────────
// This example is a static mockup for screenshots — nothing is wired to a real DB.

interface CustomerRow {
    id: number;
    email: string;
    full_name: string;
    country: string;
    status: 'active' | 'inactive' | 'churned';
    total_orders: number;
    lifetime_value: number;
    created_at: string;
}

const FIRST = [
    'Ada',
    'Grace',
    'Alan',
    'Katherine',
    'Linus',
    'Margaret',
    'Dennis',
    'Barbara',
    'Guido',
    'Donald',
    'Edsger',
    'Tim',
    'Radia',
    'Vint',
    'Marie',
    'Nikola',
    'Rosalind',
    'Carl',
    'Emmy',
    'Niels',
    'Claude',
    'Joan',
    'Hedy',
    'Shafi',
    'Leslie',
    'Frances',
    'John',
    'Anita',
    'Ken',
    'Brian',
    'Adele',
    'Karen',
    'Sophie',
    'Ingrid',
    'Mateo',
    'Lucas',
    'Olivia',
    'Noah',
    'Yuki',
];
const LAST = [
    'Lovelace',
    'Hopper',
    'Turing',
    'Johnson',
    'Torvalds',
    'Hamilton',
    'Ritchie',
    'Liskov',
    'van Rossum',
    'Knuth',
    'Dijkstra',
    'Berners-Lee',
    'Perlman',
    'Cerf',
    'Curie',
    'Tesla',
    'Franklin',
    'Sagan',
    'Noether',
    'Bohr',
    'Shannon',
    'Clarke',
    'Lamarr',
    'Goldwasser',
    'Lamport',
    'Allen',
    'McCarthy',
    'Borg',
    'Thompson',
    'Kernighan',
    'Goldberg',
    'Spärck',
    'Wing',
    'Daubechies',
    'Rossi',
    'Silva',
    'Kim',
    'Tanaka',
    'Müller',
    'Nakamura',
];
const COUNTRIES = ['US', 'GB', 'FI', 'NL', 'DE', 'FR', 'JP', 'CA', 'AU', 'BR', 'IN', 'SE'];
const STATUSES: CustomerRow['status'][] = [
    'active',
    'active',
    'active',
    'active',
    'inactive',
    'inactive',
    'churned',
];

function generateCustomers(count: number): CustomerRow[] {
    const rows: CustomerRow[] = [];
    for (let i = 0; i < count; i++) {
        const first = FIRST[i % FIRST.length];
        const last = LAST[(i * 7 + 3) % LAST.length];
        const full_name = `${first} ${last}`;
        const handle = `${first}.${last}`.toLowerCase().replace(/[^a-z.]/g, '');
        const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        const total_orders =
            status === 'churned' ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 240);
        const lifetime_value = Math.round(total_orders * (40 + Math.random() * 180) * 100) / 100;
        const year = 2017 + Math.floor(Math.random() * 7);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
        rows.push({
            id: 1001 + i,
            email: `${handle}${i}@example.com`,
            full_name,
            country: COUNTRIES[(i * 5 + 1) % COUNTRIES.length],
            status,
            total_orders,
            lifetime_value,
            created_at: `${year}-${month}-${day}`,
        });
    }
    return rows;
}

const TOTAL_ROWS = 1000;

// ─── Schema definition (drives both the tree and the structure panel) ─────────

interface FieldDef {
    name: string;
    type: string;
    nullable: boolean;
    default: string;
    key: 'PK' | 'UQ' | null;
    icon: CodiconName;
}

const FIELDS: FieldDef[] = [
    {
        name: 'id',
        type: 'bigint',
        nullable: false,
        default: "nextval('customers_id_seq')",
        key: 'PK',
        icon: 'key',
    },
    {
        name: 'email',
        type: 'varchar',
        nullable: false,
        default: '—',
        key: 'UQ',
        icon: 'symbol-string',
    },
    {
        name: 'full_name',
        type: 'varchar',
        nullable: false,
        default: '—',
        key: null,
        icon: 'symbol-string',
    },
    {
        name: 'country',
        type: 'char',
        nullable: true,
        default: "'US'",
        key: null,
        icon: 'symbol-string',
    },
    {
        name: 'status',
        type: 'enum',
        nullable: false,
        default: "'active'",
        key: null,
        icon: 'symbol-enum',
    },
    {
        name: 'total_orders',
        type: 'int4',
        nullable: false,
        default: '0',
        key: null,
        icon: 'symbol-numeric',
    },
    {
        name: 'lifetime_value',
        type: 'numeric',
        nullable: false,
        default: '0.00',
        key: null,
        icon: 'symbol-numeric',
    },
    {
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
        default: 'now()',
        key: null,
        icon: 'calendar',
    },
];

const TYPE_OPTIONS = [
    { value: 'bigint', label: 'int8 · bigint' },
    { value: 'int4', label: 'int4 · integer' },
    { value: 'numeric', label: 'numeric' },
    { value: 'varchar', label: 'varchar' },
    { value: 'char', label: 'char' },
    { value: 'text', label: 'text' },
    { value: 'bool', label: 'bool' },
    { value: 'enum', label: 'user-defined' },
    { value: 'timestamptz', label: 'timestamptz' },
    { value: 'uuid', label: 'uuid' },
    { value: 'jsonb', label: 'jsonb' },
];

// ─── Schema tree ─────────────────────────────────────────────────────────────

const countBadge = (n: string) => (
    <span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-foreground-muted)' }}>
        {n}
    </span>
);

const node = (
    id: string,
    label: string,
    icon: CodiconName,
    badge?: React.ReactNode,
): TreeNodeData => ({
    id,
    label,
    icon: <Icon name={icon} />,
    badge,
});

const TREE_NODES: TreeNodeData[] = [
    {
        id: 'db-ecommerce',
        label: 'ecommerce_prod',
        icon: <Icon name="database" />,
        children: [
            {
                id: 'schema-public',
                label: 'public',
                icon: <Icon name="symbol-class" />,
                children: [
                    {
                        id: 'grp-tables',
                        label: 'Tables',
                        icon: <Icon name="table" />,
                        badge: countBadge('8'),
                        children: [
                            node('tbl-customers', 'customers', 'table', countBadge('1.0k')),
                            node('tbl-orders', 'orders', 'table', countBadge('48.1k')),
                            node('tbl-order-items', 'order_items', 'table', countBadge('192k')),
                            node('tbl-products', 'products', 'table', countBadge('3.2k')),
                            node('tbl-categories', 'categories', 'table', countBadge('64')),
                            node('tbl-inventory', 'inventory', 'table', countBadge('3.2k')),
                            node('tbl-addresses', 'addresses', 'table', countBadge('18.7k')),
                            node('tbl-payments', 'payments', 'table', countBadge('47.9k')),
                        ],
                    },
                    {
                        id: 'grp-views',
                        label: 'Views',
                        icon: <Icon name="eye" />,
                        badge: countBadge('3'),
                        children: [
                            node('v-active', 'active_customers', 'eye'),
                            node('v-revenue', 'monthly_revenue', 'eye'),
                            node('v-top', 'top_products', 'eye'),
                        ],
                    },
                    {
                        id: 'grp-funcs',
                        label: 'Functions',
                        icon: <Icon name="symbol-method" />,
                        badge: countBadge('5'),
                        children: [
                            node('f-recalc', 'recalc_ltv()', 'symbol-method'),
                            node('f-search', 'search_products()', 'symbol-method'),
                        ],
                    },
                ],
            },
            {
                id: 'schema-analytics',
                label: 'analytics',
                icon: <Icon name="symbol-class" />,
                children: [node('a-events', 'events', 'table', countBadge('4.1M'))],
            },
        ],
    },
];

// ─── Data table columns ──────────────────────────────────────────────────────

const STATUS_VARIANT: Record<CustomerRow['status'], 'success' | 'warning' | 'default'> = {
    active: 'success',
    inactive: 'warning',
    churned: 'default',
};

const mono: React.CSSProperties = {
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
};

const customerColumns: ColumnDef<CustomerRow>[] = [
    {
        accessorKey: 'id',
        header: 'id',
        size: 70,
        cell: ({ getValue }) => <span style={mono}>{getValue() as number}</span>,
    },
    {
        accessorKey: 'email',
        header: 'email',
        size: 230,
        cell: ({ getValue }) => <span style={mono}>{getValue() as string}</span>,
    },
    { accessorKey: 'full_name', header: 'full_name', size: 170 },
    {
        accessorKey: 'country',
        header: 'country',
        size: 90,
        cell: ({ getValue }) => (
            <Tag size="xs" variant="secondary">
                {getValue() as string}
            </Tag>
        ),
    },
    {
        accessorKey: 'status',
        header: 'status',
        size: 100,
        cell: ({ getValue }) => {
            const s = getValue() as CustomerRow['status'];
            return (
                <Badge variant={STATUS_VARIANT[s]} size="xs">
                    {s}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'total_orders',
        header: 'total_orders',
        size: 110,
        cell: ({ getValue }) => (
            <span style={{ ...mono, display: 'block', textAlign: 'right' }}>
                {getValue() as number}
            </span>
        ),
    },
    {
        accessorKey: 'lifetime_value',
        header: 'lifetime_value',
        size: 130,
        cell: ({ getValue }) => (
            <span style={{ ...mono, display: 'block', textAlign: 'right' }}>
                ${(getValue() as number).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'created_at',
        size: 120,
        cell: ({ getValue }) => <span style={mono}>{getValue() as string}</span>,
    },
];

// ─── Structure panel (Supabase-style field cards) ─────────────────────────────

const FieldCard: React.FC<{
    field: FieldDef;
    type: string;
    nullable: boolean;
    onTypeChange: (value: string) => void;
    onNullableChange: (value: string) => void;
}> = ({ field, type, nullable, onTypeChange, onNullableChange }) => (
    <div className="fieldCard">
        <div className="fieldCardHeader">
            <Icon name={field.icon} />
            <span className="fieldName">{field.name}</span>
            {field.key && (
                <Badge variant={field.key === 'PK' ? 'info' : 'default'} size="xs">
                    {field.key}
                </Badge>
            )}
            <div className="grow" />
            <IconButton
                variant="ghost"
                size="xs"
                icon={<Icon name="ellipsis" />}
                aria-label="Field options"
            />
        </div>

        <div className="fieldCardRow">
            <span className="fieldCardLabel">Type</span>
            <Select
                size="sm"
                options={TYPE_OPTIONS}
                value={type}
                onChange={(v) => onTypeChange(v as string)}
            />
        </div>

        <div className="fieldCardRow">
            <span className="fieldCardLabel">Nullable</span>
            <Select
                size="sm"
                options={[
                    { value: 'NO', label: 'NOT NULL' },
                    { value: 'YES', label: 'Nullable' },
                ]}
                value={nullable ? 'YES' : 'NO'}
                onChange={onNullableChange}
            />
        </div>

        <div className="fieldCardFooter">
            <span className="fieldCardLabel">Default</span>
            <code className="fieldDefault">{field.default}</code>
        </div>
    </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────

export const App: React.FC = () => {
    const data = useMemo(() => generateCustomers(TOTAL_ROWS), []);
    const [fieldState, setFieldState] = useState<
        Record<string, { type: string; nullable: boolean }>
    >(() =>
        Object.fromEntries(FIELDS.map((f) => [f.name, { type: f.type, nullable: f.nullable }])),
    );

    return (
        <div className="container">
            {/* Toolbar */}
            <div className="toolbar">
                <Breadcrumbs
                    items={[
                        { label: 'ecommerce_prod', icon: <Icon name="database" /> },
                        { label: 'public' },
                        { label: 'customers' },
                    ]}
                />

                <div className="grow" />

                <div className="searchWrapper">
                    <Input placeholder="Filter rows…" size="sm" />
                </div>

                <Button variant="primary" size="sm">
                    <Icon name="add" />
                    Insert row
                </Button>

                <div className="toolbarActions">
                    <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="refresh" />}
                        aria-label="Refresh"
                    />
                    <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="filter" />}
                        aria-label="Filter"
                    />
                    <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="save" />}
                        aria-label="Export"
                    />
                    <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<Icon name="ellipsis" />}
                        aria-label="More"
                    />
                </div>
            </div>

            {/* Three zones: Explorer | Data | Structure */}
            <div className="mainContent">
                <SplitPane orientation="horizontal">
                    {/* Left sidebar — schema explorer */}
                    <Pane preferredSize={0.18} minSize={200}>
                        <div className="sidebar">
                            <div className="sidebarHeader">
                                <Icon name="list-tree" />
                                <span>EXPLORER</span>
                                <div className="grow" />
                                <IconButton
                                    variant="ghost"
                                    size="xs"
                                    icon={<Icon name="refresh" />}
                                    aria-label="Refresh schema"
                                />
                            </div>
                            <div className="sidebarBody">
                                <Tree
                                    nodes={TREE_NODES}
                                    edgeStyle="solid"
                                    size="sm"
                                    defaultExpandedKeys={[
                                        'db-ecommerce',
                                        'schema-public',
                                        'grp-tables',
                                    ]}
                                    defaultSelectedKey="tbl-customers"
                                />
                            </div>
                        </div>
                    </Pane>

                    {/* Center — data grid */}
                    <Pane minSize={420}>
                        <div className="centerPane">
                            <div className="filterBar">
                                <span className="filterHint">
                                    <Icon name="add" /> Add filter
                                </span>
                            </div>
                            <div className="tableWrapper">
                                <DataTable
                                    data={data}
                                    columns={customerColumns}
                                    size="sm"
                                    enableSorting
                                    enablePagination
                                    initialPageSize={100}
                                    pageSizeOptions={[100, 200, 500]}
                                    stickyHeader
                                    fillHeight
                                    maxHeight="100%"
                                />
                            </div>
                        </div>
                    </Pane>

                    {/* Right sidebar — table structure */}
                    <Pane preferredSize={0.26} minSize={280}>
                        <div className="structure">
                            <div className="sidebarHeader">
                                <Icon name="list-flat" />
                                <span>STRUCTURE — customers</span>
                                <div className="grow" />
                                <IconButton
                                    variant="ghost"
                                    size="xs"
                                    icon={<Icon name="add" />}
                                    aria-label="Add column"
                                />
                            </div>
                            <div className="structureBody">
                                {FIELDS.map((field) => (
                                    <FieldCard
                                        key={field.name}
                                        field={field}
                                        type={fieldState[field.name].type}
                                        nullable={fieldState[field.name].nullable}
                                        onTypeChange={(type) =>
                                            setFieldState((s) => ({
                                                ...s,
                                                [field.name]: { ...s[field.name], type },
                                            }))
                                        }
                                        onNullableChange={(v) =>
                                            setFieldState((s) => ({
                                                ...s,
                                                [field.name]: {
                                                    ...s[field.name],
                                                    nullable: v === 'YES',
                                                },
                                            }))
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </Pane>
                </SplitPane>
            </div>

            {/* Status bar */}
            <StatusBar>
                <StatusBarSection align="left">
                    <StatusBarItem variant="success" icon={<Icon name="circle-filled" />}>
                        Connected
                    </StatusBarItem>
                    <StatusBarItem
                        icon={<Icon name="server-environment" />}
                        tooltip="localhost:5432"
                    >
                        localhost:5432
                    </StatusBarItem>
                    <StatusBarItem icon={<Icon name="database" />}>ecommerce_prod</StatusBarItem>
                </StatusBarSection>

                <StatusBarSection align="right">
                    <StatusBarItem icon={<Icon name="list-flat" />}>
                        100 of {TOTAL_ROWS.toLocaleString('en-US')} rows
                    </StatusBarItem>
                    <StatusBarItem icon={<Icon name="history" />}>24 ms</StatusBarItem>
                    <StatusBarItem>PostgreSQL 16.1</StatusBarItem>
                    <StatusBarItem>UTF-8</StatusBarItem>
                </StatusBarSection>
            </StatusBar>
        </div>
    );
};
