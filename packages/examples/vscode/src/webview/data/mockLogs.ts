import { LogEntry, LogLevel } from '../types/log';

const SOURCES = [
  'api-gateway',
  'auth-service',
  'database',
  'cache-layer',
  'worker-pool',
  'scheduler',
  'notification-service',
  'file-storage',
];

const ERROR_MESSAGES = [
  'Connection timeout after 30000ms',
  'Failed to authenticate user: Invalid credentials',
  'Database query failed: relation "users" does not exist',
  'Out of memory: heap allocation failed',
  'SSL certificate verification failed',
  'Rate limit exceeded for IP 192.168.1.100',
  'Failed to parse JSON: Unexpected token at position 42',
  'Socket connection reset by peer',
];

const WARN_MESSAGES = [
  'Deprecated API endpoint called: /api/v1/legacy',
  'Memory usage above 80% threshold',
  'Slow query detected: 2340ms execution time',
  'Certificate expires in 7 days',
  'Connection pool nearly exhausted: 95% capacity',
  'Retry attempt 3/5 for external service call',
  'Cache miss rate exceeds 40%',
  'Request queue length exceeds recommended limit',
];

const INFO_MESSAGES = [
  'Server started on port 3000',
  'User session created: user_id=12345',
  'Database migration completed successfully',
  'Cache cleared for namespace: products',
  'Scheduled job completed: daily-report',
  'New connection established from 10.0.0.42',
  'Configuration reloaded from environment',
  'Health check passed for all services',
];

const DEBUG_MESSAGES = [
  'Processing request: GET /api/users?page=1',
  'Query executed in 12ms: SELECT * FROM logs LIMIT 100',
  'Cache hit for key: user:profile:12345',
  'Parsing request body: 1.2KB JSON payload',
  'WebSocket message received: type=ping',
  'JWT token validated successfully',
  'Middleware chain executed: [auth, rateLimit, validate]',
  'Response serialized: 256 bytes',
];

const STACK_TRACE = `Error: Connection refused
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1141:16)
    at Protocol._enqueue (/app/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Connection.query (/app/node_modules/mysql/lib/Connection.js:198:25)
    at Object.executeQuery (/app/src/database/client.ts:42:12)
    at UserService.findById (/app/src/services/user.ts:28:20)
    at AuthController.getProfile (/app/src/controllers/auth.ts:56:18)
    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
    at next (/app/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/app/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)`;

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getMessageForLevel(level: LogLevel): string {
  switch (level) {
    case 'ERROR':
      return getRandomItem(ERROR_MESSAGES);
    case 'WARN':
      return getRandomItem(WARN_MESSAGES);
    case 'INFO':
      return getRandomItem(INFO_MESSAGES);
    case 'DEBUG':
      return getRandomItem(DEBUG_MESSAGES);
  }
}

function generateLogEntry(index: number, baseTime: Date): LogEntry {
  const levels: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
  const weights = [0.05, 0.15, 0.4, 0.4]; // 5% errors, 15% warnings, 40% info, 40% debug

  let random = Math.random();
  let level: LogLevel = 'DEBUG';
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      level = levels[i];
      break;
    }
    random -= weights[i];
  }

  const timestamp = new Date(baseTime.getTime() - index * (Math.random() * 5000 + 100));
  const source = getRandomItem(SOURCES);
  const message = getMessageForLevel(level);

  const entry: LogEntry = {
    id: `log-${index}-${Date.now()}`,
    timestamp,
    level,
    source,
    message,
  };

  // Add stack trace for some errors
  if (level === 'ERROR' && Math.random() > 0.3) {
    entry.stackTrace = STACK_TRACE;
  }

  // Add metadata for some entries
  if (Math.random() > 0.7) {
    entry.metadata = {
      requestId: `req-${Math.random().toString(36).substr(2, 9)}`,
      userId: Math.random() > 0.5 ? Math.floor(Math.random() * 10000) : undefined,
      duration: Math.floor(Math.random() * 1000),
      statusCode: level === 'ERROR' ? 500 : level === 'WARN' ? 429 : 200,
    };
  }

  return entry;
}

export function generateMockLogs(count: number = 500): LogEntry[] {
  const baseTime = new Date();
  const logs: LogEntry[] = [];

  for (let i = 0; i < count; i++) {
    logs.push(generateLogEntry(i, baseTime));
  }

  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function filterLogs(
  logs: LogEntry[],
  filters: { search: string; levels: LogLevel[]; source: string | null }
): LogEntry[] {
  return logs.filter((log) => {
    // Filter by level
    if (filters.levels.length > 0 && !filters.levels.includes(log.level)) {
      return false;
    }

    // Filter by source
    if (filters.source && log.source !== filters.source) {
      return false;
    }

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        log.message.toLowerCase().includes(searchLower) ||
        log.source.toLowerCase().includes(searchLower) ||
        log.level.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
}

export function getUniqueSources(logs: LogEntry[]): string[] {
  return [...new Set(logs.map((log) => log.source))].sort();
}

export function getLogStats(logs: LogEntry[]): Record<LogLevel, number> {
  return logs.reduce(
    (acc, log) => {
      acc[log.level]++;
      return acc;
    },
    { ERROR: 0, WARN: 0, INFO: 0, DEBUG: 0 }
  );
}
