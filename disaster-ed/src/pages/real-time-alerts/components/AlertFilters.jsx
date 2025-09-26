import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AlertFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  alertCounts 
}) => {
  const disasterTypes = [
    { value: 'all', label: 'All Disasters' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'flood', label: 'Flood' },
    { value: 'fire', label: 'Fire' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'heatwave', label: 'Heat Wave' },
    { value: 'landslide', label: 'Landslide' }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'active', label: 'Active Only' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' }
  ];

  const timeRanges = [
    { value: 'all', label: 'All Time' },
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== 'all' && value !== ''
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground flex items-center">
          <Icon name="Filter" size={18} className="mr-2" />
          Filter Alerts
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Alert Counts Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <div className="text-2xl font-bold text-error">{alertCounts?.critical || 0}</div>
          <div className="text-xs text-muted-foreground">Critical</div>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <div className="text-2xl font-bold text-warning">{alertCounts?.high || 0}</div>
          <div className="text-xs text-muted-foreground">High</div>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="text-2xl font-bold text-accent">{alertCounts?.medium || 0}</div>
          <div className="text-xs text-muted-foreground">Medium</div>
        </div>
        <div className="text-center p-3 bg-secondary/10 rounded-lg">
          <div className="text-2xl font-bold text-secondary">{alertCounts?.low || 0}</div>
          <div className="text-xs text-muted-foreground">Low</div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Disaster Type"
          options={disasterTypes}
          value={filters?.type || 'all'}
          onChange={(value) => onFilterChange('type', value)}
          className="w-full"
        />

        <Select
          label="Severity Level"
          options={severityLevels}
          value={filters?.severity || 'all'}
          onChange={(value) => onFilterChange('severity', value)}
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location || 'all'}
          onChange={(value) => onFilterChange('location', value)}
          searchable
          className="w-full"
        />

        <Select
          label="Time Range"
          options={timeRanges}
          value={filters?.timeRange || 'all'}
          onChange={(value) => onFilterChange('timeRange', value)}
          className="w-full"
        />

        <Input
          label="Search Alerts"
          type="search"
          placeholder="Search by title or description..."
          value={filters?.search || ''}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
        <Button
          variant={filters?.severity === 'critical' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('severity', filters?.severity === 'critical' ? 'all' : 'critical')}
          iconName="AlertTriangle"
          iconPosition="left"
        >
          Critical Only
        </Button>
        <Button
          variant={filters?.status === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('status', filters?.status === 'active' ? 'all' : 'active')}
          iconName="Bell"
          iconPosition="left"
        >
          Active Only
        </Button>
        <Button
          variant={filters?.timeRange === '24h' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('timeRange', filters?.timeRange === '24h' ? 'all' : '24h')}
          iconName="Clock"
          iconPosition="left"
        >
          Last 24h
        </Button>
      </div>
    </div>
  );
};

export default AlertFilters;