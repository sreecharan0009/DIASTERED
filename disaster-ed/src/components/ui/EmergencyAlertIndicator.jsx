import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAlertIndicator = ({ 
  alertCount = 0, 
  alertLevel = 'low', 
  latestAlert = null,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsVisible(alertCount > 0);
  }, [alertCount]);

  const getAlertColor = () => {
    switch (alertLevel) {
      case 'critical':
        return 'bg-error text-error-foreground border-error';
      case 'high':
        return 'bg-warning text-warning-foreground border-warning';
      case 'medium':
        return 'bg-accent text-accent-foreground border-accent';
      default:
        return 'bg-secondary text-secondary-foreground border-secondary';
    }
  };

  const getAlertIcon = () => {
    switch (alertLevel) {
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

  const handleAlertClick = () => {
    navigate('/real-time-alerts');
  };

  const handleToggleExpanded = (e) => {
    e?.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  // Don't show on alerts page
  if (location?.pathname === '/real-time-alerts') return null;

  return (
    <>
      {/* Desktop Fixed Indicator */}
      <div className={`hidden md:block fixed top-20 right-6 z-200 ${className}`}>
        <div 
          className={`
            ${getAlertColor()} 
            rounded-lg shadow-elevated cursor-pointer transition-smooth
            ${isExpanded ? 'w-80' : 'w-16 h-16'}
            ${alertLevel === 'critical' ? 'animate-alert-pulse' : ''}
          `}
          onClick={handleAlertClick}
        >
          {!isExpanded ? (
            // Collapsed State
            (<div className="w-16 h-16 flex items-center justify-center relative">
              <Icon 
                name={getAlertIcon()} 
                size={24} 
                className={alertLevel === 'critical' ? 'animate-pulse' : ''}
              />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full min-w-[1.5rem] h-6">
                {alertCount > 99 ? '99+' : alertCount}
              </span>
              <button
                onClick={handleToggleExpanded}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-surface text-foreground rounded-full flex items-center justify-center shadow-soft hover:bg-muted transition-quick"
              >
                <Icon name="ChevronLeft" size={12} />
              </button>
            </div>)
          ) : (
            // Expanded State
            (<div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={getAlertIcon()} size={20} />
                  <span className="font-semibold text-sm">Emergency Alerts</span>
                </div>
                <button
                  onClick={handleToggleExpanded}
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-quick"
                >
                  <Icon name="ChevronRight" size={12} />
                </button>
              </div>
              {latestAlert && (
                <div className="mb-3 p-2 bg-white/10 rounded text-xs">
                  <div className="font-medium mb-1">{latestAlert?.title}</div>
                  <div className="opacity-90">{latestAlert?.preview}</div>
                  <div className="text-xs opacity-75 mt-1">{latestAlert?.time}</div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {alertCount} active alert{alertCount !== 1 ? 's' : ''}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-current hover:bg-white/20 h-8 px-3"
                  onClick={handleAlertClick}
                >
                  View All
                </Button>
              </div>
            </div>)
          )}
        </div>
      </div>
      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-200">
        <Button
          variant="default"
          size="icon"
          className={`
            w-14 h-14 rounded-full shadow-elevated relative
            ${getAlertColor()}
            ${alertLevel === 'critical' ? 'animate-alert-pulse' : ''}
          `}
          onClick={handleAlertClick}
        >
          <Icon 
            name={getAlertIcon()} 
            size={24} 
            className={alertLevel === 'critical' ? 'animate-pulse' : ''}
          />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full min-w-[1.5rem] h-6">
            {alertCount > 99 ? '99+' : alertCount}
          </span>
        </Button>
      </div>
    </>
  );
};

export default EmergencyAlertIndicator;