import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertHistory = ({ alerts, onViewAlert }) => {
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortOptions = [
    { value: 'timestamp', label: 'Date & Time' },
    { value: 'severity', label: 'Severity' },
    { value: 'type', label: 'Disaster Type' },
    { value: 'location', label: 'Location' }
  ];

  const orderOptions = [
    { value: 'desc', label: 'Newest First' },
    { value: 'asc', label: 'Oldest First' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-secondary';
    }
  };

  const getDisasterIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return 'Mountain';
      case 'flood':
        return 'Waves';
      case 'fire':
        return 'Flame';
      case 'cyclone':
        return 'Wind';
      case 'heatwave':
        return 'Sun';
      default:
        return 'AlertTriangle';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedAlerts = [...alerts]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];

    if (sortBy === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortBy === 'severity') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      aValue = severityOrder?.[aValue] || 0;
      bValue = severityOrder?.[bValue] || 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-semibold text-card-foreground flex items-center">
            <Icon name="History" size={18} className="mr-2" />
            Alert History ({alerts?.length})
          </h3>
          
          <div className="flex items-center gap-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-32"
            />
            <Select
              options={orderOptions}
              value={sortOrder}
              onChange={setSortOrder}
              className="w-32"
            />
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {sortedAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium text-card-foreground mb-2">No Alert History</h4>
            <p className="text-sm text-muted-foreground">
              Alert history will appear here once you receive notifications
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedAlerts?.map((alert) => (
              <div key={alert?.id} className="p-4 hover:bg-muted/50 transition-quick">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <Icon 
                        name={getDisasterIcon(alert?.type)} 
                        size={20} 
                        className={getSeverityColor(alert?.severity)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-card-foreground truncate">
                          {alert?.title}
                        </h4>
                        <span className={`
                          px-2 py-1 text-xs font-medium rounded uppercase tracking-wide
                          ${getSeverityColor(alert?.severity)}
                        `}>
                          {alert?.severity}
                        </span>
                        {alert?.acknowledged && (
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{alert?.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{formatDate(alert?.timestamp)}</span>
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {alert?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewAlert(alert)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertHistory;