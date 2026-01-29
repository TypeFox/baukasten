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

export const LogTable: React.FC<LogTableProps> = ({
  logs,
  onSelectLog,
  loading = false,
}) => {
  const columns = useMemo<ColumnDef<LogEntry>[]>(
    () => [
      {
        accessorKey: 'timestamp',
        header: 'Time',
        size: 140,
        cell: ({ getValue }) => {
          const date = getValue() as Date;
          return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
        },
      },
      {
        accessorKey: 'level',
        header: 'Level',
        size: 80,
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
          <span style={{ fontFamily: 'var(--bk-font-family-mono)', fontSize: 'var(--bk-font-size-xs)' }}>
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ getValue }) => (
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
            }}
          >
            {getValue() as string}
          </span>
        ),
      },
    ],
    []
  );

  const handleRowClick = (row: Row<LogEntry>) => {
    onSelectLog(row.original);
  };

  return (
    <div>
      <DataTable
        data={logs}
        columns={columns}
        enableSorting
        enablePagination
        initialPageSize={50}
        pageSizeOptions={[25, 50, 100, 200]}
        stickyHeader
        maxHeight="100%"
        loading={loading}
        onRowClick={handleRowClick}
      />
    </div>
  );
};
