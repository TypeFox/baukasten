import type { ColumnDef, Row } from '@tanstack/react-table';
import { Badge, DataTable } from 'baukasten-ui';
import React, { useMemo } from 'react';
import { LOG_LEVEL_COLORS, LogEntry } from '../types/log';

interface LogTableProps {
    logs: LogEntry[];
    selectedLogId: string | null;
    onSelectLog: (log: LogEntry) => void;
    loading?: boolean;
}

const truncatedCellStyle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
};

const TruncatedCell: React.FC<{ text: string; style?: React.CSSProperties }> = ({
    text,
    style,
}) => (
    <span title={text} style={{ ...truncatedCellStyle, ...style }}>
        {text}
    </span>
);

export const LogTable: React.FC<LogTableProps> = ({ logs, onSelectLog, loading = false }) => {
    const columns = useMemo<ColumnDef<LogEntry>[]>(
        () => [
            {
                accessorKey: 'timestamp',
                header: 'Time',
                size: 60,
                cell: ({ getValue }) => {
                    const date = getValue() as Date;
                    const text = date.toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });
                    return <TruncatedCell text={text} />;
                },
            },
            {
                accessorKey: 'level',
                header: 'Level',
                size: 60,
                cell: ({ getValue }) => {
                    const level = getValue() as LogEntry['level'];
                    return (
                        <Badge variant={LOG_LEVEL_COLORS[level]} size="xs">
                            {level}
                        </Badge>
                    );
                },
            },
            {
                accessorKey: 'source',
                header: 'Source',
                size: 140,
                cell: ({ getValue }) => (
                    <TruncatedCell
                        text={getValue() as string}
                        style={{
                            fontFamily: 'var(--bk-font-family-mono)',
                            fontSize: 'var(--bk-font-size-xs)',
                        }}
                    />
                ),
            },
            {
                accessorKey: 'message',
                header: 'Message',
                cell: ({ getValue }) => <TruncatedCell text={getValue() as string} />,
            },
        ],
        [],
    );

    const handleRowClick = (row: Row<LogEntry>) => {
        onSelectLog(row.original);
    };

    return (
        <DataTable
            data={logs}
            columns={columns}
            enableSorting
            enableColumnResizing
            enablePagination
            initialPageSize={50}
            pageSizeOptions={[25, 50, 100, 200]}
            stickyHeader
            fillHeight
            maxHeight="100%"
            loading={loading}
            onRowClick={handleRowClick}
        />
    );
};
