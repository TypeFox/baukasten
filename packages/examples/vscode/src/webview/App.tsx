import React, { useState, useEffect, useMemo } from 'react';
import { SplitPane, Pane } from 'baukasten-ui';
import { FilterToolbar } from './components/FilterToolbar';
import { LogTable } from './components/LogTable';
import { LogDetailPanel } from './components/LogDetailPanel';
import { StatusSummary } from './components/StatusSummary';
import { generateMockLogs, filterLogs, getUniqueSources } from './data/mockLogs';
import { LogEntry, FilterState } from './types/log';
import './App.css';

export const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    levels: [],
    source: null,
  });

  // Load initial logs
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLoading(true);
    // Simulate async loading
    setTimeout(() => {
      const newLogs = generateMockLogs(500);
      setLogs(newLogs);
      setLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    loadLogs();
    setSelectedLog(null);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      levels: [],
      source: null,
    });
  };

  const sources = useMemo(() => getUniqueSources(logs), [logs]);

  const filteredLogs = useMemo(() => {
    return filterLogs(logs, filters);
  }, [logs, filters]);

  const handleSelectLog = (log: LogEntry) => {
    setSelectedLog(log);
  };

  return (
    <div className="container">
      <FilterToolbar
        filters={filters}
        onFiltersChange={setFilters}
        sources={sources}
        onRefresh={handleRefresh}
        onClear={handleClearFilters}
      />

      <div className="mainContent">
        <SplitPane orientation="horizontal">
          <Pane preferredSize={0.65} minSize={300}>
            <div className="tableWrapper" style={{ padding: '10px', height: '100%' }}>
              <LogTable
                logs={filteredLogs}
                selectedLogId={selectedLog?.id ?? null}
                onSelectLog={handleSelectLog}
                loading={loading}
              />
            </div>
          </Pane>
          <Pane minSize={250}>
            <div className="detailPanel">
              <LogDetailPanel log={selectedLog} />
            </div>
          </Pane>
        </SplitPane>
      </div>

      <StatusSummary logs={logs} filteredCount={filteredLogs.length} loading={loading} />
    </div>
  );
};
