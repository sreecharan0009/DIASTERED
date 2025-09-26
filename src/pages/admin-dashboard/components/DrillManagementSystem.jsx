import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const DrillManagementSystem = () => {
  const [selectedTab, setSelectedTab] = useState('scheduled');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const scheduledDrills = [
    {
      id: 1,
      title: "Monthly Fire Safety Drill",
      type: "fire-safety",
      scheduledDate: "25/01/2025",
      scheduledTime: "10:30 AM",
      duration: "30 minutes",
      participants: 450,
      institutions: ["Delhi Public School", "St. Mary\'s College"],
      status: "scheduled",
      createdBy: "Admin Team",
      description: "Comprehensive fire safety evacuation drill covering all building blocks"
    },
    {
      id: 2,
      title: "Earthquake Response Training",
      type: "earthquake",
      scheduledDate: "28/01/2025",
      scheduledTime: "2:00 PM",
      duration: "45 minutes",
      participants: 320,
      institutions: ["Modern High School"],
      status: "scheduled",
      createdBy: "Safety Officer",
      description: "Drop, cover, and hold earthquake response simulation"
    },
    {
      id: 3,
      title: "Flood Evacuation Drill",
      type: "flood",
      scheduledDate: "30/01/2025",
      scheduledTime: "11:00 AM",
      duration: "40 minutes",
      participants: 280,
      institutions: ["Riverside Academy"],
      status: "scheduled",
      createdBy: "Emergency Team",
      description: "Vertical evacuation and shelter-in-place procedures"
    }
  ];

  const completedDrills = [
    {
      id: 4,
      title: "Emergency Communication Test",
      type: "communication",
      completedDate: "15/01/2025",
      completedTime: "9:00 AM",
      duration: "20 minutes",
      participants: 380,
      actualParticipants: 365,
      institutions: ["Delhi Public School"],
      status: "completed",
      successRate: 96.1,
      averageResponseTime: "2.3 minutes",
      feedback: "Excellent participation, minor communication delays in Block C"
    },
    {
      id: 5,
      title: "Cyclone Preparedness Drill",
      type: "cyclone",
      completedDate: "12/01/2025",
      completedTime: "3:30 PM",
      duration: "35 minutes",
      participants: 290,
      actualParticipants: 275,
      institutions: ["Coastal High School"],
      status: "completed",
      successRate: 94.8,
      averageResponseTime: "3.1 minutes",
      feedback: "Good coordination, need improvement in shelter setup time"
    }
  ];

  const drillTypes = [
    { value: 'fire-safety', label: 'Fire Safety', icon: 'Flame', color: 'text-error' },
    { value: 'earthquake', label: 'Earthquake', icon: 'Mountain', color: 'text-warning' },
    { value: 'flood', label: 'Flood', icon: 'Waves', color: 'text-primary' },
    { value: 'cyclone', label: 'Cyclone', icon: 'Wind', color: 'text-secondary' },
    { value: 'communication', label: 'Communication', icon: 'Phone', color: 'text-accent' }
  ];

  const getTypeIcon = (type) => {
    const drillType = drillTypes?.find(dt => dt?.value === type);
    return drillType ? drillType?.icon : 'AlertTriangle';
  };

  const getTypeColor = (type) => {
    const drillType = drillTypes?.find(dt => dt?.value === type);
    return drillType ? drillType?.color : 'text-muted-foreground';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary/10 text-primary';
      case 'in-progress':
        return 'bg-warning/10 text-warning';
      case 'completed':
        return 'bg-success/10 text-success';
      case 'cancelled':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const DrillCard = ({ drill, isCompleted = false }) => (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getTypeColor(drill?.type)}`}>
            <Icon name={getTypeIcon(drill?.type)} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{drill?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {isCompleted ? drill?.completedDate : drill?.scheduledDate} at {isCompleted ? drill?.completedTime : drill?.scheduledTime}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(drill?.status)}`}>
          {drill?.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Duration</div>
          <div className="font-medium text-card-foreground">{drill?.duration}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Participants</div>
          <div className="font-medium text-card-foreground">
            {isCompleted ? `${drill?.actualParticipants}/${drill?.participants}` : drill?.participants}
          </div>
        </div>
        {isCompleted && (
          <>
            <div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="font-medium text-success">{drill?.successRate}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
              <div className="font-medium text-card-foreground">{drill?.averageResponseTime}</div>
            </div>
          </>
        )}
      </div>

      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Institutions</div>
        <div className="flex flex-wrap gap-2">
          {drill?.institutions?.map((institution, index) => (
            <span key={index} className="px-2 py-1 bg-muted rounded text-xs text-card-foreground">
              {institution}
            </span>
          ))}
        </div>
      </div>

      {drill?.description && (
        <p className="text-sm text-muted-foreground mb-4">{drill?.description}</p>
      )}

      {isCompleted && drill?.feedback && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Feedback</div>
          <p className="text-sm text-card-foreground">{drill?.feedback}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {isCompleted ? 'Conducted by' : 'Created by'} {drill?.createdBy || 'Admin Team'}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          {!isCompleted && (
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
          <h2 className="text-2xl font-bold text-foreground">Drill Management</h2>
          <p className="text-muted-foreground">Schedule, monitor, and analyze emergency drills</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Schedule New Drill
        </Button>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} color="var(--color-primary)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">{scheduledDrills?.length}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">{completedDrills?.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={24} color="var(--color-warning)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">1,050</div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
            <div>
              <div className="text-2xl font-bold text-card-foreground">95.4%</div>
              <div className="text-sm text-muted-foreground">Avg Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab('scheduled')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'scheduled' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Scheduled Drills ({scheduledDrills?.length})
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'completed'
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Completed Drills ({completedDrills?.length})
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === 'analytics' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>
      {/* Content */}
      {selectedTab === 'scheduled' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scheduledDrills?.map(drill => (
            <DrillCard key={drill?.id} drill={drill} />
          ))}
        </div>
      )}
      {selectedTab === 'completed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedDrills?.map(drill => (
            <DrillCard key={drill?.id} drill={drill} isCompleted={true} />
          ))}
        </div>
      )}
      {selectedTab === 'analytics' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-center py-12">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground">Detailed drill analytics and performance metrics coming soon</p>
          </div>
        </div>
      )}
      {/* Create Drill Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Schedule New Drill</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Drill scheduling form will be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrillManagementSystem;