import React from 'react';
import { Input, Select, Checkbox, Button, Badge, Label, Icon } from 'baukasten-ui';
import { FilterState, LOG_LEVELS, LogLevel, LOG_LEVEL_COLORS } from '../types/log';
import '../App.css';

interface FilterToolbarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  sources: string[];
  onRefresh: () => void;
  onClear: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFiltersChange,
  sources,
  onRefresh,
  onClear,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleLevelToggle = (level: LogLevel) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    onFiltersChange({ ...filters, levels: newLevels });
  };

  const handleSourceChange = (value: string | null) => {
    onFiltersChange({ ...filters, source: value === '' ? null : value });
  };

  const sourceOptions = [
    { value: '', label: 'All Sources' },
    ...sources.map((s) => ({ value: s, label: s })),
  ];

  return (
    <div className="toolbar">
      <div className="searchWrapper">
        <Input
          placeholder="Search logs..."
          value={filters.search}
          onChange={handleSearchChange}
          size="sm"
        />
      </div>

      <div className="filterGroup">
        {LOG_LEVELS.map((level) => (
          <Label key={level} variant="checkbox" size="sm">
            <Checkbox
              checked={filters.levels.length === 0 || filters.levels.includes(level)}
              onChange={() => handleLevelToggle(level)}
              size="sm"
            />
            <Badge variant={LOG_LEVEL_COLORS[level]} size="xs">
              {level}
            </Badge>
          </Label>
        ))}
      </div>

      <Select
        options={sourceOptions}
        value={filters.source || ''}
        onChange={handleSourceChange}
        placeholder="Filter by source"
        size="sm"
      />

      <div className="filterGroup">
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <Icon name="refresh" />
          Refresh
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};
