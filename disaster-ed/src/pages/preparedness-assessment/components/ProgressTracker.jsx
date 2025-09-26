import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  progressData, 
  milestones,
  className = '' 
}) => {
  const getMonthName = (monthIndex) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months?.[monthIndex];
  };

  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'certificate':
        return 'Award';
      case 'score':
        return 'Target';
      case 'streak':
        return 'Flame';
      case 'completion':
        return 'CheckCircle';
      default:
        return 'Star';
    }
  };

  const getMilestoneColor = (achieved) => {
    return achieved ? 'text-success bg-success/10' : 'text-muted-foreground bg-muted';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Progress Tracking</h3>
          <p className="text-sm text-muted-foreground">Your improvement journey over time</p>
        </div>
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="TrendingUp" size={18} />
          <span className="text-sm font-medium">6 month view</span>
        </div>
      </div>
      {/* Progress Chart */}
      <div className="mb-8">
        <div className="flex items-end justify-between h-40 mb-4">
          {progressData?.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="relative w-8 bg-muted rounded-full overflow-hidden" style={{ height: '120px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-500"
                  style={{ height: `${(data?.score / 100) * 120}px` }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <span className="text-xs font-medium text-white">
                    {data?.score}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {getMonthName(data?.month)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-success">+12%</div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">78%</div>
            <div className="text-xs text-muted-foreground">Current Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">5</div>
            <div className="text-xs text-muted-foreground">Assessments</div>
          </div>
        </div>
      </div>
      {/* Achievement Milestones */}
      <div>
        <h4 className="font-medium text-card-foreground mb-4 flex items-center">
          <Icon name="Trophy" size={16} className="mr-2 text-warning" />
          Achievement Milestones
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones?.map((milestone) => (
            <div 
              key={milestone?.id}
              className={`p-4 rounded-lg border transition-smooth ${
                milestone?.achieved 
                  ? 'bg-success/5 border-success/20' :'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMilestoneColor(milestone?.achieved)}`}>
                  <Icon 
                    name={getMilestoneIcon(milestone?.type)} 
                    size={18} 
                    className="text-current"
                  />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${milestone?.achieved ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                    {milestone?.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {milestone?.description}
                  </div>
                  {milestone?.achieved && milestone?.achievedDate && (
                    <div className="text-xs text-success mt-1 flex items-center">
                      <Icon name="Calendar" size={12} className="mr-1" />
                      Achieved on {milestone?.achievedDate}
                    </div>
                  )}
                </div>
                {milestone?.achieved && (
                  <Icon name="CheckCircle" size={20} className="text-success" />
                )}
              </div>
              
              {!milestone?.achieved && milestone?.progress && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-card-foreground font-medium">{milestone?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${milestone?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;