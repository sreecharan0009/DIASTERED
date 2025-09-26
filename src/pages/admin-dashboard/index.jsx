import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertIndicator from '../../components/ui/EmergencyAlertIndicator';
import RoleBasedMenuRenderer from '../../components/ui/RoleBasedMenuRenderer';
import ProgressIndicatorSystem from '../../components/ui/ProgressIndicatorSystem';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all dashboard components
import MetricsOverview from './components/MetricsOverview';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import UserManagementPanel from './components/UserManagementPanel';
import DrillManagementSystem from './components/DrillManagementSystem';
import AlertManagementCenter from './components/AlertManagementCenter';
import DataVisualizationCharts from './components/DataVisualizationCharts';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentUser, setCurrentUser] = useState(null);
  const [alertCount, setAlertCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock admin user data
    setCurrentUser({
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@disastered.gov.in",
      role: "admin",
      institution: "DisasterEd India - Central Administration",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      permissions: ["user_management", "alert_management", "system_config", "reports"]
    });

    // Simulate real-time alert updates
    const alertInterval = setInterval(() => {
      setAlertCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(alertInterval);
  }, []);

  const navigationSections = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: 'LayoutDashboard',
      description: 'Key metrics and system status'
    },
    {
      id: 'monitoring',
      label: 'Real-time Monitoring',
      icon: 'Activity',
      description: 'Live system and user activity'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage students, staff, and admins'
    },
    {
      id: 'drills',
      label: 'Drill Management',
      icon: 'Play',
      description: 'Schedule and monitor drills'
    },
    {
      id: 'alerts',
      label: 'Alert Management',
      icon: 'AlertTriangle',
      description: 'Create and manage alerts'
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: 'BarChart3',
      description: 'Data visualization and insights'
    }
  ];

  const quickActions = [
    {
      label: 'Create Emergency Alert',
      icon: 'AlertTriangle',
      color: 'bg-error text-error-foreground',
      action: () => setActiveSection('alerts')
    },
    {
      label: 'Schedule Drill',
      icon: 'Calendar',
      color: 'bg-primary text-primary-foreground',
      action: () => setActiveSection('drills')
    },
    {
      label: 'Add New User',
      icon: 'UserPlus',
      color: 'bg-secondary text-secondary-foreground',
      action: () => setActiveSection('users')
    },
    {
      label: 'Generate Report',
      icon: 'FileText',
      color: 'bg-warning text-warning-foreground',
      action: () => setActiveSection('analytics')
    }
  ];

  const latestAlert = {
    title: "Heavy Rainfall Warning",
    preview: "Heavy rainfall expected in Delhi NCR region...",
    time: "2 hours ago"
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DataVisualizationCharts />
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    {quickActions?.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto p-4"
                        onClick={action?.action}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${action?.color}`}>
                          <Icon name={action?.icon} size={20} />
                        </div>
                        <span className="font-medium">{action?.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <RoleBasedMenuRenderer 
                  userRole="admin" 
                  currentUser={currentUser}
                />
              </div>
            </div>
          </div>
        );
      case 'monitoring':
        return <RealTimeMonitoring />;
      case 'users':
        return <UserManagementPanel />;
      case 'drills':
        return <DrillManagementSystem />;
      case 'alerts':
        return <AlertManagementCenter />;
      case 'analytics':
        return <DataVisualizationCharts />;
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="admin" 
        alertCount={alertCount}
        onMenuToggle={setIsMenuOpen}
      />
      <EmergencyAlertIndicator
        alertCount={alertCount}
        alertLevel="high"
        latestAlert={latestAlert}
      />
      <div className="flex">
  {/* Sidebar Navigation */}
  <div className={`
    fixed top-[64px] left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
    h-[calc(100vh-64px)] overflow-y-auto
    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `}>
          <div className="flex flex-col h-full">
            {/* Admin Profile */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={25} color="var(--color-error)" />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">Admin Dashboard</h2>
                  <p className="text-sm text-muted-foreground">
                    {currentUser?.name || 'Administrator'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => {
                    setActiveSection(section?.id);
                    setIsMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth
                    ${activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-card-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={section?.icon} 
                    size={20} 
                    color={activeSection === section?.id ? 'currentColor' : 'var(--color-muted-foreground)'}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{section?.label}</div>
                    <div className="text-xs opacity-75 truncate">{section?.description}</div>
                  </div>
                </button>
              ))}
            </nav>

            {/* System Status */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">System Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success font-medium">Operational</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Last updated: {new Date()?.toLocaleTimeString('en-IN', { hour12: true })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          <main className="p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <button 
                  onClick={() => navigate('/')}
                  className="hover:text-foreground transition-colors"
                >
                  DisasterEd
                </button>
                <Icon name="ChevronRight" size={16} />
                <span className="text-foreground font-medium">
                  {navigationSections?.find(s => s?.id === activeSection)?.label || 'Dashboard'}
                </span>
              </nav>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {navigationSections?.find(s => s?.id === activeSection)?.label || 'Admin Dashboard'}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {navigationSections?.find(s => s?.id === activeSection)?.description || 'Comprehensive administrative control panel'}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {new Date()?.toLocaleDateString('en-IN', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date()?.toLocaleTimeString('en-IN', { hour12: true })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Content */}
            {renderActiveSection()}
          </main>
        </div>
      </div>
      <ProgressIndicatorSystem />
    </div>
  );
};

export default AdminDashboard;