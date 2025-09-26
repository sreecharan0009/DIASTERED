import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DrillScenarioCard = ({ 
  scenario, 
  onStartDrill, 
  isActive = false,
  userProgress = {},
  className = '' 
}) => {
  const progress = userProgress?.[scenario?.id] || {};
  const completionPercentage = progress?.percentage || 0;
  const isCompleted = progress?.completed || false;
  const lastAttemptScore = progress?.lastScore || 0;

  const getDifficultyColor = () => {
    switch (scenario?.difficulty) {
      case 'Beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'Intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg shadow-soft transition-smooth hover:shadow-elevated
      ${isActive ? 'ring-2 ring-primary border-primary' : ''}
      ${className}
    `}>
      {/* Scenario Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={scenario?.imageUrl}
          alt={scenario?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor()}`}>
            {scenario?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs">
            {scenario?.duration}
          </div>
        </div>
        {isCompleted && (
          <div className="absolute bottom-3 right-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground mb-1">{scenario?.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{scenario?.description}</p>
          </div>
          <div className="ml-3 flex items-center space-x-1">
            <Icon name={scenario?.icon} size={20} className="text-primary" />
          </div>
        </div>

        {/* Scenario Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={14} />
            <span>{scenario?.participants} participants</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{scenario?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Target" size={14} />
            <span>{scenario?.objectives} objectives</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{scenario?.estimatedTime}</span>
          </div>
        </div>

        {/* Progress Section */}
        {completionPercentage > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  completionPercentage >= 100 ? 'bg-success' : 
                  completionPercentage >= 75 ? 'bg-primary' : 'bg-warning'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            {isCompleted && (
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-muted-foreground">Best Score:</span>
                <span className={`font-medium ${getScoreColor(lastAttemptScore)}`}>
                  {lastAttemptScore}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {scenario?.features?.map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isCompleted ? "outline" : "default"}
          fullWidth
          onClick={() => onStartDrill(scenario)}
          iconName={isCompleted ? "RotateCcw" : "Play"}
          iconPosition="left"
        >
          {isCompleted ? 'Retry Drill' : 'Start Drill'}
        </Button>
      </div>
    </div>
  );
};

export default DrillScenarioCard;