import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onAcknowledge, onShare, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        // Red border, white background, dark text
        return 'bg-warning/10 border-warning text-warning-foreground';
      case 'high':
        return 'bg-warning/10 border-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent/10 border-accent text-accent-foreground';
      default:
        return 'bg-secondary/10 border-secondary text-secondary-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
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

  const formatTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return alertTime?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`
      border-2 rounded-lg p-4 transition-smooth hover:shadow-soft
      ${getSeverityColor(alert?.severity)}
      ${alert?.severity === 'critical' ? '' : ''}
    `}>
      {/* Alert Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            <Icon 
              name={getDisasterIcon(alert?.type)} 
              size={24} 
              className={alert?.severity === 'critical' ? '' : ''}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{alert?.title}</h3>
              <span className={`
                px-2 py-1 text-xs font-medium rounded-full uppercase tracking-wide
                ${alert?.severity === 'critical' ? 'bg-error text-error-foreground' : 
                  alert?.severity === 'high' ? 'bg-warning text-warning-foreground' :
                  alert?.severity === 'medium' ? 'bg-accent text-accent-foreground' :
                  'bg-secondary text-secondary-foreground'}
              `}>
                {alert?.severity}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm opacity-80 mb-2">
              <span className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{alert?.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{formatTime(alert?.timestamp)}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              {isExpanded ? alert?.description : `${alert?.description?.substring(0, 120)}...`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          {!alert?.acknowledged && (
            <div className="w-3 h-3 bg-current rounded-full"></div>
          )}
          <Icon 
            name={getSeverityIcon(alert?.severity)} 
            size={20}
            className={alert?.severity === 'critical' ? '' : ''}
          />
        </div>
      </div>
      {/* Alert Details */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Source:</span>
              <span className="ml-2">{alert?.source}</span>
            </div>
            <div>
              <span className="font-medium">Impact Level:</span>
              <span className="ml-2">{alert?.impactLevel}</span>
            </div>
            <div>
              <span className="font-medium">Affected Areas:</span>
              <span className="ml-2">{alert?.affectedAreas?.join(', ')}</span>
            </div>
            <div>
              <span className="font-medium">Expected Duration:</span>
              <span className="ml-2">{alert?.expectedDuration}</span>
            </div>
          </div>
          
          {alert?.recommendedActions && alert?.recommendedActions?.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Recommended Actions:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {alert?.recommendedActions?.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
          
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(alert)}
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Details
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(alert)}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
          
          {!alert?.acknowledged && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onAcknowledge(alert?.id)}
              iconName="Check"
              iconPosition="left"
            >
              Acknowledge
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;