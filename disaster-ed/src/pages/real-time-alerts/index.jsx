import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertIndicator from '../../components/ui/EmergencyAlertIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AlertCard from './components/AlertCard';
import AlertFilters from './components/AlertFilters';
import AlertHistory from './components/AlertHistory';
import BroadcastPanel from './components/BroadcastPanel';
import LocationRiskMap from './components/LocationRiskMap';

const RealTimeAlerts = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({
    id: 1,
    name: "Dr. Priya Sharma",
    role: "admin",
    institution: "Mumbai University",
    location: "mumbai"
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Heavy Rainfall Alert - Mumbai Region",
      description: `The India Meteorological Department has issued a heavy rainfall warning for Mumbai and surrounding areas. Expected rainfall: 100-150mm in next 6 hours.\n\nImmediate precautions:\n• Avoid waterlogged areas and underpasses\n• Stay indoors unless absolutely necessary\n• Keep emergency supplies ready\n• Monitor local news for updates\n\nSchools and colleges are advised to review evacuation procedures and ensure student safety.`,
      type: "flood",
      severity: "high",
      location: "Mumbai, Maharashtra",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      source: "India Meteorological Department",
      impactLevel: "Regional",
      affectedAreas: ["Mumbai", "Thane", "Navi Mumbai", "Kalyan"],
      expectedDuration: "6-8 hours",
      recommendedActions: [
        "Avoid outdoor activities and travel",
        "Keep emergency contact numbers handy",
        "Ensure adequate food and water supplies",
        "Stay away from electrical equipment if flooding occurs",
        "Monitor official weather updates regularly"
      ],
      acknowledged: false
    },
    {
      id: 2,
      title: "Earthquake Preparedness Drill - Scheduled",
      description: `Mandatory earthquake preparedness drill scheduled for all educational institutions in Delhi NCR region.\n\nDrill Details:\n• Date: Today, 17th September 2025\n• Time: 2:00 PM - 2:30 PM\n• Duration: 30 minutes\n• Participation: All students and staff\n\nProcedure:\n• Drop, Cover, and Hold On when alarm sounds\n• Evacuate to designated assembly points\n• Wait for all-clear signal from safety wardens`,
      type: "earthquake",
      severity: "medium",
      location: "Delhi NCR",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      source: "National Disaster Management Authority",
      impactLevel: "Regional",
      affectedAreas: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
      expectedDuration: "30 minutes",
      recommendedActions: [
        "Ensure all staff are aware of drill procedures",
        "Check emergency equipment and exits",
        "Prepare student attendance sheets",
        "Coordinate with local emergency services"
      ],
      acknowledged: true
    },
    {
      id: 3,
      title: "Cyclone Biparjoy - Coastal Alert",
      description: `Cyclone Biparjoy is approaching the western coast of India. Educational institutions in coastal areas of Gujarat and Maharashtra should prepare for potential impact.\n\nCurrent Status:\n• Wind Speed: 120-130 km/h\n• Expected Landfall: 18th September, early morning\n• Affected Coastline: 200km stretch\n\nPreparatory Actions:\n• Secure all outdoor equipment and furniture\n• Stock emergency supplies for 72 hours\n• Review evacuation routes and shelter locations\n• Maintain communication with local authorities`,
      type: "cyclone",
      severity: "critical",
      location: "Gujarat & Maharashtra Coast",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      source: "Indian National Centre for Ocean Information Services",
      impactLevel: "Multi-State",
      affectedAreas: ["Kutch", "Saurashtra", "Mumbai Coast", "Konkan"],
      expectedDuration: "24-36 hours",
      recommendedActions: [
        "Evacuate coastal areas if advised by authorities",
        "Secure buildings and remove loose objects",
        "Ensure emergency communication systems are functional",
        "Coordinate with disaster management teams",
        "Prepare for possible power and water outages"
      ],
      acknowledged: false
    },
    {
      id: 4,
      title: "Heat Wave Warning - North India",
      description: `Severe heat wave conditions prevailing across North Indian states. Temperature expected to reach 45-47°C in some areas.\n\nHealth Advisory:\n• Avoid outdoor activities during peak hours (11 AM - 4 PM)\n• Increase water intake and stay hydrated\n• Wear light-colored, loose-fitting clothes\n• Recognize signs of heat exhaustion and heat stroke\n\nInstitutional Guidelines:\n• Adjust outdoor activity schedules\n• Ensure adequate cooling in classrooms\n• Provide frequent water breaks\n• Monitor students for heat-related illness`,
      type: "heatwave",
      severity: "high",
      location: "North India",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      source: "India Meteorological Department",
      impactLevel: "Multi-State",
      affectedAreas: ["Rajasthan", "Haryana", "Punjab", "Uttar Pradesh"],
      expectedDuration: "5-7 days",
      recommendedActions: [
        "Reschedule outdoor activities to cooler hours",
        "Ensure air conditioning/cooling systems are functional",
        "Provide oral rehydration solutions",
        "Train staff to recognize heat-related emergencies",
        "Maintain emergency medical supplies"
      ],
      acknowledged: true
    }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    location: 'all',
    timeRange: 'all',
    search: ''
  });

  const [showBroadcastPanel, setShowBroadcastPanel] = useState(false);
  const [userLocation, setUserLocation] = useState('mumbai');
  const [alertHistory, setAlertHistory] = useState([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // This would be replaced with WebSocket connection in real implementation
      console.log('Checking for new alerts...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts?.filter(alert => {
    if (filters?.type !== 'all' && alert?.type !== filters?.type) return false;
    if (filters?.severity !== 'all' && alert?.severity !== filters?.severity) return false;
    if (filters?.status !== 'all') {
      if (filters?.status === 'active' && alert?.acknowledged) return false;
      if (filters?.status === 'acknowledged' && !alert?.acknowledged) return false;
    }
    if (filters?.search && !alert?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
      !alert?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;

    return true;
  });

  const alertCounts = {
    critical: alerts?.filter(a => a?.severity === 'critical')?.length,
    high: alerts?.filter(a => a?.severity === 'high')?.length,
    medium: alerts?.filter(a => a?.severity === 'medium')?.length,
    low: alerts?.filter(a => a?.severity === 'low')?.length
  };

  const activeAlertCount = alerts?.filter(a => !a?.acknowledged)?.length;
  const criticalAlerts = alerts?.filter(a => a?.severity === 'critical' && !a?.acknowledged);
  const latestAlert = alerts?.length > 0 ? {
    title: alerts?.[0]?.title,
    preview: alerts?.[0]?.description?.substring(0, 100) + '...',
    time: new Date(alerts[0].timestamp)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } : null;

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      severity: 'all',
      status: 'all',
      location: 'all',
      timeRange: 'all',
      search: ''
    });
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev?.map(alert =>
      alert?.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleShareAlert = (alert) => {
    if (navigator.share) {
      navigator.share({
        title: alert?.title,
        text: alert?.description,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(`${alert?.title}\n\n${alert?.description}\n\nSource: DisasterEd India`);
      alert('Alert details copied to clipboard!');
    }
  };

  const handleViewDetails = (alert) => {
    // In a real app, this would navigate to a detailed alert view
    console.log('Viewing alert details:', alert);
  };

  const handleSendBroadcast = async (broadcastData) => {
    // Simulate sending broadcast
    const newAlert = {
      id: Date.now(),
      title: broadcastData?.title,
      description: broadcastData?.message,
      type: broadcastData?.type,
      severity: broadcastData?.severity,
      location: "Institution Broadcast",
      timestamp: new Date(),
      source: "Institution Administration",
      impactLevel: "Institutional",
      affectedAreas: ["Campus"],
      expectedDuration: "As specified",
      recommendedActions: [],
      acknowledged: false
    };

    setAlerts(prev => [newAlert, ...prev]);
    console.log('Broadcast sent:', broadcastData);
  };

  const handleLocationChange = (locationId) => {
    setUserLocation(locationId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={currentUser?.role}
        alertCount={activeAlertCount}
        onMenuToggle={() => { }}
      />
      <EmergencyAlertIndicator
        alertCount={activeAlertCount}
        alertLevel={criticalAlerts?.length > 0 ? 'critical' : 'medium'}
        latestAlert={latestAlert}
      />
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Real-Time Alerts</h1>
            <p className="text-muted-foreground mt-2">
              Stay informed with live disaster notifications and emergency updates
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.role === 'admin' && (
              <Button
                variant="default"
                onClick={() => setShowBroadcastPanel(true)}
                iconName="Radio"
                iconPosition="left"
              >
                Broadcast Alert
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => navigate('/disaster-learning-modules')}
              iconName="BookOpen"
              iconPosition="left"
            >
              Learning Modules
            </Button>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {criticalAlerts?.length > 0 && (
          <div className="bg-error/10 border-2 border-error rounded-lg p-4 animate-alert-pulse">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={24} className="text-error animate-pulse" />
              <div>
                <h3 className="font-semibold text-error">
                  {criticalAlerts?.length} Critical Alert{criticalAlerts?.length !== 1 ? 's' : ''} Require Immediate Attention
                </h3>
                <p className="text-sm text-error/80 mt-1">
                  Please review and acknowledge these critical emergency notifications
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Alerts and Filters */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alert Filters */}
            <AlertFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              alertCounts={alertCounts}
            />

            {/* Active Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Active Alerts ({filteredAlerts?.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="RefreshCw" size={16} />
                  <span>Last updated: {new Date()?.toLocaleTimeString('en-IN')}</span>
                </div>
              </div>

              {filteredAlerts?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
                  <h3 className="font-medium text-card-foreground mb-2">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    {filters?.type !== 'all' || filters?.severity !== 'all' || filters?.search ? 'No alerts match your current filters' : 'All clear! No emergency alerts at this time'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts?.map(alert => (
                    <AlertCard
                      key={alert?.id}
                      alert={alert}
                      onAcknowledge={handleAcknowledgeAlert}
                      onShare={handleShareAlert}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Alert History */}
            <AlertHistory
              alerts={alertHistory?.length > 0 ? alertHistory : alerts?.filter(a => a?.acknowledged)}
              onViewAlert={handleViewDetails}
            />
          </div>

          {/* Right Column - Location Risk Map */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
              <h3 className="font-semibold text-card-foreground mb-4 flex items-center">
                <Icon name="Phone" size={18} className="mr-2" />
                Emergency Contacts
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>National Emergency</span>
                  <a href="tel:112" className="text-primary font-medium">112</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fire Department</span>
                  <a href="tel:101" className="text-primary font-medium">101</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Police</span>
                  <a href="tel:100" className="text-primary font-medium">100</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Medical Emergency</span>
                  <a href="tel:108" className="text-primary font-medium">108</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Disaster Helpline</span>
                  <a href="tel:1078" className="text-primary font-medium">1078</a>
                </div>
              </div>
            </div>

            <LocationRiskMap
              userLocation={userLocation}
              riskData={{}}
              onLocationChange={handleLocationChange}
            />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
              <h3 className="font-semibold text-card-foreground mb-4 flex items-center">
                <Icon name="Zap" size={18} className="mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/virtual-emergency-drills')}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Emergency Drill
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/preparedness-assessment')}
                  iconName="ClipboardCheck"
                  iconPosition="left"
                >
                  Take Assessment
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Broadcast Panel */}
      <BroadcastPanel
        userRole={currentUser?.role}
        onSendBroadcast={handleSendBroadcast}
        isVisible={showBroadcastPanel}
        onClose={() => setShowBroadcastPanel(false)}
      />
    </div>
  );
};

export default RealTimeAlerts;