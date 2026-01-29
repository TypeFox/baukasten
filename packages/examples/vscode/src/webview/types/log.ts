export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  source: string;
  message: string;
  stackTrace?: string;
  metadata?: Record<string, unknown>;
}

export interface FilterState {
  search: string;
  levels: LogLevel[];
  source: string | null;
}

export const LOG_LEVELS: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG'];

export const LOG_LEVEL_COLORS: Record<LogLevel, 'error' | 'warning' | 'info' | 'default'> = {
  ERROR: 'error',
  WARN: 'warning',
  INFO: 'info',
  DEBUG: 'default',
};
