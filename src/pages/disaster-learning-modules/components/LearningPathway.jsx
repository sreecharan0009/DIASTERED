import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningPathway = ({ userProgress = {}, onModuleSelect }) => {
  const pathwayModules = [
    {
      id: 'earthquake-safety',
      title: 'Earthquake Safety',
      icon: 'Mountain',
      order: 1,
      prerequisite: null
    },
    {
      id: 'flood-preparedness',
      title: 'Flood Preparedness',
      icon: 'Waves',
      order: 2,
      prerequisite: 'earthquake-safety'
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety',
      icon: 'Flame',
      order: 3,
      prerequisite: 'flood-preparedness'
    },
    {
      id: 'cyclone-awareness',
      title: 'Cyclone Awareness',
      icon: 'Wind',
      order: 4,
      prerequisite: 'fire-safety'
    },
    {
      id: 'first-aid-basics',
      title: 'First Aid Basics',
      icon: 'Heart',
      order: 5,
      prerequisite: 'cyclone-awareness'
    }
  ];

  const getModuleStatus = (module) => {
    const progress = userProgress?.[module.id];
    if (progress?.completed) return 'completed';
    if (progress?.percentage > 0) return 'in-progress';
    
    // Check if prerequisite is met
    if (module.prerequisite) {
      const prerequisiteProgress = userProgress?.[module.prerequisite];
      if (!prerequisiteProgress?.completed) return 'locked';
    }
    
    return 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'in-progress':
        return 'bg-primary text-primary-foreground border-primary';
      case 'available':
        return 'bg-card text-card-foreground border-border hover:border-primary';
      case 'locked':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-card text-card-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Play';
      case 'available':
        return 'Circle';
      case 'locked':
        return 'Lock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Route" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground">Learning Pathway</h3>
      </div>
      <div className="space-y-4">
        {pathwayModules?.map((module, index) => {
          const status = getModuleStatus(module);
          const progress = userProgress?.[module.id]?.percentage || 0;
          const isClickable = status !== 'locked';

          return (
            <div key={module.id} className="relative">
              {/* Connection Line */}
              {index < pathwayModules?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
              )}
              {/* Module Item */}
              <div
                className={`
                  flex items-center space-x-4 p-4 rounded-lg border-2 transition-smooth
                  ${getStatusColor(status)}
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
                onClick={() => isClickable && onModuleSelect && onModuleSelect(module.id)}
              >
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                    <Icon name={getStatusIcon(status)} size={20} />
                  </div>
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={module.icon} size={16} />
                    <h4 className="font-medium truncate">{module.title}</h4>
                  </div>
                  
                  {status === 'locked' && module.prerequisite && (
                    <p className="text-xs opacity-75">
                      Complete {pathwayModules?.find(m => m?.id === module.prerequisite)?.title} first
                    </p>
                  )}
                  
                  {status === 'in-progress' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div 
                          className="bg-white h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Number */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium">{module.order}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pathway Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">
              {pathwayModules?.filter(m => getModuleStatus(m) === 'completed')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {pathwayModules?.filter(m => getModuleStatus(m) === 'in-progress')?.length}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-muted-foreground">
              {pathwayModules?.filter(m => getModuleStatus(m) === 'locked')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Locked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathway;