import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeMonitoring = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlerts, setActiveAlerts] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemStatus = {
    overall: "operational",
    database: "operational",
    notifications: "operational",
    alerts: "warning",
    backup: "operational"
  };

  const activeUsers = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Student",
      activity: "Earthquake Safety Module",
      location: "Delhi",
      lastSeen: "2 min ago",
      status: "online"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Staff",
      activity: "Drill Management",
      location: "Mumbai",
      lastSeen: "5 min ago",
      status: "online"
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Student",
      activity: "Fire Safety Assessment",
      location: "Ahmedabad",
      lastSeen: "1 min ago",
      status: "online"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Admin",
      activity: "Alert Configuration",
      location: "Jaipur",
      lastSeen: "Just now",
      status: "online"
    }
  ];

  const ongoingDrills = [
    {
      id: 1,
      title: "Evacuation Drill - Block A",
      institution: "Delhi Public School",
      participants: 245,
      startTime: "14:30",
      status: "in-progress",
      completion: 67
    },
    {
      id: 2,
      title: "Fire Safety Drill",
      institution: "St. Mary\'s College",
      participants: 189,
      startTime: "15:00",
      status: "starting",
      completion: 0
    },
    {
      id: 3,
      title: "Earthquake Response",
      institution: "Modern High School",
      participants: 156,
      startTime: "13:45",
      status: "completed",
      completion: 100
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getDrillStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'in-progress':
        return 'bg-primary/10 text-primary';
      case 'starting':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Status */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">System Status</h3>
            <div className="text-sm text-muted-foreground">
              {currentTime?.toLocaleTimeString('en-IN', { 
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {Object.entries(systemStatus)?.map(([service, status]) => (
            <div key={service} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(status)} 
                  size={20} 
                  className={getStatusColor(status)}
                />
                <span className="font-medium text-card-foreground capitalize">
                  {service?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
              </div>
              <span className={`text-sm font-medium capitalize ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Active Alerts</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-warning">{activeAlerts}</span>
                <Button variant="outline" size="sm">
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Manage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Active Users */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">Active Users</h3>
            <span className="text-sm text-muted-foreground">
              {activeUsers?.length} online
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {activeUsers?.map((user) => (
              <div key={user?.id} className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {user?.name}
                    </p>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {user?.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.activity}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span>{user?.location}</span>
                    <span>•</span>
                    <span>{user?.lastSeen}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Ongoing Drills */}
      <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">Ongoing Drills</h3>
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Schedule Drill
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {ongoingDrills?.map((drill) => (
              <div key={drill?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Play" size={20} color="var(--color-primary)" />
                    <div>
                      <h4 className="font-medium text-card-foreground">{drill?.title}</h4>
                      <p className="text-sm text-muted-foreground">{drill?.institution}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDrillStatusColor(drill?.status)}`}>
                    {drill?.status?.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">
                      {drill?.participants} participants
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">
                      Started at {drill?.startTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">
                      {drill?.completion}% complete
                    </span>
                  </div>
                </div>
                
                {drill?.status === 'in-progress' && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${drill?.completion}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;