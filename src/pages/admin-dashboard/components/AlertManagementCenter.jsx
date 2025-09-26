import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AlertManagementCenter = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  const activeAlerts = [
    {
      id: 1,
      title: "Heavy Rainfall Warning",
      type: "weather",
      severity: "high",
      message: "Heavy rainfall expected in Delhi NCR region. Schools advised to monitor weather conditions and prepare for potential flooding.",
      targetAudience: "All Delhi Schools",
      createdAt: "17/01/2025 10:30 AM",
      expiresAt: "18/01/2025 6:00 PM",
      status: "active",
      sentTo: 2847,
      acknowledged: 2156,
      regions: ["Delhi", "Gurgaon", "Noida"],
      priority: "high"
    },
    {
      id: 2,
      title: "Earthquake Preparedness Reminder",
      type: "preparedness",
      severity: "medium",
      message: "Monthly earthquake drill scheduled for tomorrow. All students and staff must participate in the evacuation exercise.",
      targetAudience: "Selected Schools",
      createdAt: "16/01/2025 2:15 PM",
      expiresAt: "25/01/2025 11:59 PM",
      status: "active",
      sentTo: 1245,
      acknowledged: 987,
      regions: ["Mumbai", "Pune"],
      priority: "medium"
    },
    {
      id: 3,
      title: "Air Quality Alert",
      type: "health",
      severity: "critical",
      message: "Air quality index has reached hazardous levels. Outdoor activities suspended. Keep windows closed and use air purifiers.",
      targetAudience: "NCR Schools",
      createdAt: "17/01/2025 8:00 AM",
      expiresAt: "17/01/2025 8:00 PM",
      status: "active",
      sentTo: 1567,
      acknowledged: 1234,
      regions: ["Delhi", "Gurgaon", "Faridabad"],
      priority: "critical"
    }
  ];

  const alertHistory = [
    {
      id: 4,
      title: "Cyclone Fani Update",
      type: "weather",
      severity: "critical",
      message: "Cyclone Fani approaching coastal areas. All coastal schools to remain closed for next 2 days.",
      targetAudience: "Coastal Schools",
      createdAt: "10/01/2025 6:00 AM",
      expiresAt: "12/01/2025 11:59 PM",
      status: "expired",
      sentTo: 892,
      acknowledged: 856,
      regions: ["Odisha", "West Bengal"],
      priority: "critical",
      effectiveness: 96.0
    },
    {
      id: 5,
      title: "Fire Safety Week",
      type: "education",
      severity: "low",
      message: "Fire Safety Week begins Monday. Special sessions on fire prevention and evacuation procedures.",
      targetAudience: "All Schools",
      createdAt: "05/01/2025 9:00 AM",
      expiresAt: "12/01/2025 11:59 PM",
      status: "completed",
      sentTo: 3456,
      acknowledged: 3123,
      regions: ["All India"],
      priority: "low",
      effectiveness: 90.4
    }
  ];

  const alertTypes = [
    { value: 'weather', label: 'Weather', icon: 'Cloud', color: 'text-primary' },
    { value: 'earthquake', label: 'Earthquake', icon: 'Mountain', color: 'text-warning' },
    { value: 'fire', label: 'Fire', icon: 'Flame', color: 'text-error' },
    { value: 'flood', label: 'Flood', icon: 'Waves', color: 'text-primary' },
    { value: 'health', label: 'Health', icon: 'Heart', color: 'text-secondary' },
    { value: 'security', label: 'Security', icon: 'Shield', color: 'text-error' },
    { value: 'preparedness', label: 'Preparedness', icon: 'CheckCircle', color: 'text-success' },
    { value: 'education', label: 'Educational', icon: 'BookOpen', color: 'text-accent' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    const alertType = alertTypes?.find(at => at?.value === type);
    return alertType ? alertType?.icon : 'AlertTriangle';
  };

  const getTypeColor = (type) => {
    const alertType = alertTypes?.find(at => at?.value === type);
    return alertType ? alertType?.color : 'text-muted-foreground';
  };

  const AlertCard = ({ alert, showEffectiveness = false }) => (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getTypeColor(alert?.type)}`}>
            <Icon name={getTypeIcon(alert?.type)} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{alert?.title}</h3>
            <p className="text-sm text-muted-foreground">{alert?.targetAudience}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
            {alert?.severity}
          </span>
          {alert?.priority === 'critical' && (
            <Icon name="AlertTriangle" size={20} className="text-error animate-pulse" />
          )}
        </div>
      </div>

      <p className="text-sm text-card-foreground mb-4 leading-relaxed">
        {alert?.message}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-muted-foreground">Sent To</div>
          <div className="font-medium text-card-foreground">{alert?.sentTo?.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Acknowledged</div>
          <div className="font-medium text-success">
            {alert?.acknowledged?.toLocaleString('en-IN')} ({Math.round((alert?.acknowledged / alert?.sentTo) * 100)}%)
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Created</div>
          <div className="font-medium text-card-foreground">{alert?.createdAt}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Expires</div>
          <div className="font-medium text-card-foreground">{alert?.expiresAt}</div>
        </div>
      </div>

      {showEffectiveness && alert?.effectiveness && (
        <div className="mb-4 p-3 bg-success/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              {alert?.effectiveness}% Effectiveness Rate
            </span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="text-xs text-muted-foreground mb-2">Target Regions</div>
        <div className="flex flex-wrap gap-2">
          {alert?.regions?.map((region, index) => (
            <span key={index} className="px-2 py-1 bg-muted rounded text-xs text-card-foreground">
              {region}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            alert?.status === 'active' ? 'bg-success animate-pulse' : 
            alert?.status === 'expired' ? 'bg-error' : 'bg-muted-foreground'
          }`}></div>
          <span className="text-xs text-muted-foreground capitalize">{alert?.status}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          {alert?.status === 'active' && (
            <Button variant="outline" size="sm">
              <Icon name="Edit" size={16} className="mr-2" />
              Edit
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Report
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Alert Management Center</h2>
          <p className="text-muted-foreground">Create, manage, and monitor emergency alerts</p>
        </div>
        <Button onClick={() => setShowCreateAlert(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Create Alert
        </Button>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">{activeAlerts?.length}</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Send" size={24} color="var(--color-primary)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">5,659</div>
              <div className="text-sm text-muted-foreground">Total Sent</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">4,377</div>
              <div className="text-sm text-muted-foreground">Acknowledged</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">92.7%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {alertTypes?.slice(0, 4)?.map((type) => (
            <Button key={type?.value} variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Icon name={type?.icon} size={24} className={type?.color} />
              <span className="text-sm">{type?.label} Alert</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'active' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Active Alerts ({activeAlerts?.length})
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'history' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Alert History ({alertHistory?.length})
          </button>
          <button
            onClick={() => setSelectedTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'templates' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Templates
          </button>
        </nav>
      </div>
      {/* Content */}
      {selectedTab === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeAlerts?.map(alert => (
            <AlertCard key={alert?.id} alert={alert} />
          ))}
        </div>
      )}
      {selectedTab === 'history' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {alertHistory?.map(alert => (
            <AlertCard key={alert?.id} alert={alert} showEffectiveness={true} />
          ))}
        </div>
      )}
      {selectedTab === 'templates' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Alert Templates</h3>
            <p className="text-muted-foreground">Pre-configured alert templates for quick deployment</p>
          </div>
        </div>
      )}
      {/* Create Alert Modal Placeholder */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Create New Alert</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateAlert(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="text-center py-8">
              <Icon name="AlertTriangle" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Alert creation form will be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManagementCenter;