import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicatorSystem = ({ 
  userProgress = {},
  currentModule = null,
  className = '' 
}) => {
  const location = useLocation();

  const modules = [
    {
      id: 'earthquake-safety',
      title: 'Earthquake Safety',
      path: '/disaster-learning-modules/earthquake',
      icon: 'Mountain',
      estimatedTime: '45 min',
      difficulty: 'Beginner'
    },
    {
      id: 'flood-preparedness',
      title: 'Flood Preparedness',
      path: '/disaster-learning-modules/flood',
      icon: 'Waves',
      estimatedTime: '35 min',
      difficulty: 'Beginner'
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety',
      path: '/disaster-learning-modules/fire',
      icon: 'Flame',
      estimatedTime: '40 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'cyclone-awareness',
      title: 'Cyclone Awareness',
      path: '/disaster-learning-modules/cyclone',
      icon: 'Wind',
      estimatedTime: '50 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'first-aid-basics',
      title: 'First Aid Basics',
      path: '/disaster-learning-modules/first-aid',
      icon: 'Heart',
      estimatedTime: '60 min',
      difficulty: 'Advanced'
    }
  ];

  const drills = [
    {
      id: 'evacuation-drill',
      title: 'Evacuation Drill',
      path: '/virtual-emergency-drills/evacuation',
      icon: 'Users',
      duration: '15 min',
      type: 'Simulation'
    },
    {
      id: 'shelter-in-place',
      title: 'Shelter in Place',
      path: '/virtual-emergency-drills/shelter',
      icon: 'Home',
      duration: '10 min',
      type: 'Simulation'
    },
    {
      id: 'communication-drill',
      title: 'Emergency Communication',
      path: '/virtual-emergency-drills/communication',
      icon: 'Phone',
      duration: '12 min',
      type: 'Interactive'
    }
  ];

  const assessments = [
    {
      id: 'basic-preparedness',
      title: 'Basic Preparedness Quiz',
      path: '/preparedness-assessment/basic',
      icon: 'CheckCircle',
      questions: 20,
      timeLimit: '30 min'
    },
    {
      id: 'advanced-response',
      title: 'Advanced Response Assessment',
      path: '/preparedness-assessment/advanced',
      icon: 'Target',
      questions: 35,
      timeLimit: '45 min'
    }
  ];

  const getProgressPercentage = (itemId) => {
    return userProgress?.[itemId]?.percentage || 0;
  };

  const getCompletionStatus = (itemId) => {
    return userProgress?.[itemId]?.completed || false;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/10 text-success';
      case 'Intermediate':
        return 'bg-warning/10 text-warning';
      case 'Advanced':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const ProgressRing = ({ percentage, size = 40 }) => {
    const radius = (size - 4) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-300 ${getProgressColor(percentage)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-medium ${getProgressColor(percentage)}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  };

  const ProgressItem = ({ item, type }) => {
    const progress = getProgressPercentage(item?.id);
    const isCompleted = getCompletionStatus(item?.id);
    const isCurrentPath = location?.pathname?.startsWith(item?.path);

    return (
      <div className={`
        p-4 border border-border rounded-lg transition-smooth hover:shadow-soft
        ${isCurrentPath ? 'bg-primary/5 border-primary' : 'bg-card'}
      `}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${isCompleted ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
            `}>
              <Icon 
                name={isCompleted ? 'CheckCircle' : item?.icon} 
                size={20} 
              />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground">{item?.title}</h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                {type === 'module' && (
                  <>
                    <span>{item?.estimatedTime}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded ${getDifficultyColor(item?.difficulty)}`}>
                      {item?.difficulty}
                    </span>
                  </>
                )}
                {type === 'drill' && (
                  <>
                    <span>{item?.duration}</span>
                    <span>•</span>
                    <span>{item?.type}</span>
                  </>
                )}
                {type === 'assessment' && (
                  <>
                    <span>{item?.questions} questions</span>
                    <span>•</span>
                    <span>{item?.timeLimit}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <ProgressRing percentage={progress} />
        </div>
        {progress > 0 && progress < 100 && (
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                progress >= 75 ? 'bg-success' : progress >= 50 ? 'bg-primary' : 'bg-warning'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    );
  };

  // Only show on learning-related pages
  const shouldShow = [
    '/disaster-learning-modules',
    '/virtual-emergency-drills',
    '/preparedness-assessment'
  ]?.some(path => location?.pathname?.startsWith(path));

  if (!shouldShow) return null;

  const overallProgress = {
    modules: Math.round(modules?.reduce((acc, module) => acc + getProgressPercentage(module.id), 0) / modules?.length),
    drills: Math.round(drills?.reduce((acc, drill) => acc + getProgressPercentage(drill?.id), 0) / drills?.length),
    assessments: Math.round(assessments?.reduce((acc, assessment) => acc + getProgressPercentage(assessment?.id), 0) / assessments?.length)
  };

  const totalProgress = Math.round((overallProgress?.modules + overallProgress?.drills + overallProgress?.assessments) / 3);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Overall Progress Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Learning Progress</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Track your disaster preparedness journey
            </p>
          </div>
          <ProgressRing percentage={totalProgress} size={60} />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getProgressColor(overallProgress?.modules)}`}>
              {overallProgress?.modules}%
            </div>
            <div className="text-xs text-muted-foreground">Modules</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getProgressColor(overallProgress?.drills)}`}>
              {overallProgress?.drills}%
            </div>
            <div className="text-xs text-muted-foreground">Drills</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getProgressColor(overallProgress?.assessments)}`}>
              {overallProgress?.assessments}%
            </div>
            <div className="text-xs text-muted-foreground">Assessments</div>
          </div>
        </div>
      </div>
      {/* Detailed Progress */}
      <div className="p-6">
        {/* Learning Modules */}
        {location?.pathname?.startsWith('/disaster-learning-modules') && (
          <div className="mb-6">
            <h4 className="font-medium text-card-foreground mb-4 flex items-center">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Learning Modules
            </h4>
            <div className="space-y-3">
              {modules?.map(module => (
                <ProgressItem key={module.id} item={module} type="module" />
              ))}
            </div>
          </div>
        )}

        {/* Virtual Drills */}
        {location?.pathname?.startsWith('/virtual-emergency-drills') && (
          <div className="mb-6">
            <h4 className="font-medium text-card-foreground mb-4 flex items-center">
              <Icon name="Play" size={18} className="mr-2" />
              Virtual Drills
            </h4>
            <div className="space-y-3">
              {drills?.map(drill => (
                <ProgressItem key={drill?.id} item={drill} type="drill" />
              ))}
            </div>
          </div>
        )}

        {/* Assessments */}
        {location?.pathname?.startsWith('/preparedness-assessment') && (
          <div>
            <h4 className="font-medium text-card-foreground mb-4 flex items-center">
              <Icon name="ClipboardCheck" size={18} className="mr-2" />
              Assessments
            </h4>
            <div className="space-y-3">
              {assessments?.map(assessment => (
                <ProgressItem key={assessment?.id} item={assessment} type="assessment" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicatorSystem;