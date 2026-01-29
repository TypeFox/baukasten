import React from 'react';
import { Badge, Text } from 'baukasten-ui';
import { LogEntry, LOG_LEVELS, LOG_LEVEL_COLORS } from '../types/log';
import { getLogStats } from '../data/mockLogs';
import '../App.css';

interface StatusSummaryProps {
  logs: LogEntry[];
  filteredCount: number;
  loading?: boolean;
}

export const StatusSummary: React.FC<StatusSummaryProps> = ({
  logs,
  filteredCount,
  loading = false,
}) => {
  const stats = getLogStats(logs);

  return (
    <div className="statusBar">
      <div className="statusItem">
        <Text size="xs" style={{ color: 'var(--bk-color-foreground-muted)' }}>
          Total:
        </Text>
        <Text size="xs" weight="medium">
          {logs.length.toLocaleString()}
        </Text>
      </div>

      <div className="statusItem">
        <Text size="xs" style={{ color: 'var(--bk-color-foreground-muted)' }}>
          Showing:
        </Text>
        <Text size="xs" weight="medium">
          {filteredCount.toLocaleString()}
        </Text>
      </div>

      <div style={{ flex: 1 }} />

      {LOG_LEVELS.map((level) => (
        <div key={level} className="statusItem">
          <Badge variant={LOG_LEVEL_COLORS[level]} size="xs">
            {level}
          </Badge>
          <Text size="xs">{stats[level].toLocaleString()}</Text>
        </div>
      ))}

      {loading && (
        <Text size="xs" style={{ color: 'var(--bk-color-foreground-muted)' }}>
          Loading...
        </Text>
      )}
    </div>
  );
};
