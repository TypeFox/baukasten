import React from 'react';
import { Accordion, AccordionItem, Badge, Button, Code, Text, Icon } from 'baukasten-ui';
import { LogEntry, LOG_LEVEL_COLORS } from '../types/log';
import '../App.css';

interface LogDetailPanelProps {
  log: LogEntry | null;
}

export const LogDetailPanel: React.FC<LogDetailPanelProps> = ({ log }) => {
  if (!log) {
    return (
      <div className="panelEmptyState">
        <Icon name="file" style={{ fontSize: '32px', marginBottom: 'var(--bk-spacing-2)' }} />
        <Text size="sm">Select a log entry to view details</Text>
      </div>
    );
  }

  const copyToClipboard = () => {
    const text = JSON.stringify(log, null, 2);
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false,
    });
  };

  return (
    <div className="panelContainer">
      <div className="panelHeader">
        <div className="panelTitle">
          <Badge variant={LOG_LEVEL_COLORS[log.level]} size="sm">
            {log.level}
          </Badge>
          <Text size="sm" style={{ fontFamily: 'var(--bk-font-family-mono)' }}>
            {log.source}
          </Text>
        </div>
        <Button variant="ghost" size="xs" onClick={copyToClipboard}>
          <Icon name="copy" />
        </Button>
      </div>

      <div className="panelContent">
        <Accordion defaultOpen="message">
          <AccordionItem id="message" title="Message">
            <div className="panelSection">
              <div className="panelLabel">Timestamp</div>
              <div className="panelValue">{formatTimestamp(log.timestamp)}</div>
            </div>
            <div className="panelSection">
              <div className="panelLabel">Message</div>
              <div className="panelValue">{log.message}</div>
            </div>
          </AccordionItem>

          {log.stackTrace && (
            <AccordionItem id="stackTrace" title="Stack Trace">
              <Code block className="codeBlock">
                {log.stackTrace}
              </Code>
            </AccordionItem>
          )}

          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <AccordionItem id="metadata" title="Metadata">
              <div className="metadataGrid">
                {Object.entries(log.metadata).map(([key, value]) => (
                  <div key={key} className="panelSection">
                    <div className="panelLabel">{key}</div>
                    <div className="panelValue">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value ?? 'N/A')}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionItem>
          )}

          <AccordionItem id="raw" title="Raw JSON">
            <Code block className="codeBlock">
              {JSON.stringify(log, null, 2)}
            </Code>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
