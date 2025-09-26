import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedMenuRenderer = ({ 
  userRole = 'student', 
  currentUser = null,
  className = '' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItemsByRole = () => {
    const baseItems = [
      {
        label: 'Profile',
        path: '/profile',
        icon: 'User',
        description: 'Manage your profile settings',
        roles: ['student', 'staff', 'admin']
      },
      {
        label: 'Settings',
        path: '/settings',
        icon: 'Settings',
        description: 'Application preferences',
        roles: ['student', 'staff', 'admin']
      }
    ];

    const roleSpecificItems = {
      student: [
        {
          label: 'My Progress',
          path: '/my-progress',
          icon: 'TrendingUp',
          description: 'Track your learning progress'
        },
        {
          label: 'Certificates',
          path: '/certificates',
          icon: 'Award',
          description: 'View earned certificates'
        },
        {
          label: 'Study Groups',
          path: '/study-groups',
          icon: 'Users',
          description: 'Join study groups'
        }
      ],
      staff: [
        {
          label: 'My Classes',
          path: '/my-classes',
          icon: 'BookOpen',
          description: 'Manage your classes'
        },
        {
          label: 'Student Progress',
          path: '/student-progress',
          icon: 'BarChart3',
          description: 'Monitor student progress'
        },
        {
          label: 'Reports',
          path: '/reports',
          icon: 'FileText',
          description: 'Generate reports'
        },
        {
          label: 'Resources',
          path: '/resources',
          icon: 'FolderOpen',
          description: 'Teaching resources'
        }
      ],
      admin: [
        {
          label: 'User Management',
          path: '/user-management',
          icon: 'Users',
          description: 'Manage users and roles'
        },
        {
          label: 'Institution Settings',
          path: '/institution-settings',
          icon: 'Building',
          description: 'Configure institution settings'
        },
        {
          label: 'System Analytics',
          path: '/system-analytics',
          icon: 'BarChart3',
          description: 'View system analytics'
        },
        {
          label: 'Alert Management',
          path: '/alert-management',
          icon: 'AlertTriangle',
          description: 'Manage emergency alerts'
        },
        {
          label: 'Content Management',
          path: '/content-management',
          icon: 'Edit',
          description: 'Manage learning content'
        },
        {
          label: 'Compliance Reports',
          path: '/compliance-reports',
          icon: 'Shield',
          description: 'Generate compliance reports'
        }
      ]
    };

    const roleItems = roleSpecificItems?.[userRole] || [];
    const filteredBaseItems = baseItems?.filter(item => 
      item?.roles?.includes(userRole)
    );

    return [...roleItems, ...filteredBaseItems];
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getRoleDisplayName = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrator';
      case 'staff':
        return 'Staff Member';
      case 'student':
        return 'Student';
      default:
        return 'User';
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'text-error';
      case 'staff':
        return 'text-warning';
      case 'student':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const menuItems = getMenuItemsByRole();

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Role Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Icon 
              name={userRole === 'admin' ? 'Shield' : userRole === 'staff' ? 'GraduationCap' : 'User'} 
              size={20} 
              className={getRoleColor()}
            />
          </div>
          <div>
            <div className="font-medium text-card-foreground">
              {currentUser?.name || 'User'}
            </div>
            <div className={`text-sm ${getRoleColor()}`}>
              {getRoleDisplayName()}
            </div>
          </div>
        </div>
      </div>
      {/* Menu Items */}
      <div className="py-2">
        {menuItems?.map((item) => {
          const isActive = isActivePath(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left transition-quick
                ${isActive 
                  ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-card-foreground hover:bg-muted'
                }
              `}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                color={isActive ? 'var(--color-primary)' : 'currentColor'}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item?.label}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {item?.description}
                </div>
              </div>
              {isActive && (
                <Icon name="ChevronRight" size={16} color="var(--color-primary)" />
              )}
            </button>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleNavigation('/help')}
          >
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleNavigation('/logout')}
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedMenuRenderer;