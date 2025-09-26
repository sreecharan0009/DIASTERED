import React from 'react';
import Icon from '../../../components/AppIcon';

const DrillProgress = ({ 
  userProgress = {},
  totalDrills = 0,
  className = '' 
}) => {
  const completedDrills = Object.values(userProgress)?.filter(p => p?.completed)?.length;
  const totalPoints = Object.values(userProgress)?.reduce((sum, p) => sum + (p?.points || 0), 0);
  const averageScore = Object.values(userProgress)?.length > 0 
    ? Math.round(Object.values(userProgress)?.reduce((sum, p) => sum + (p?.lastScore || 0), 0) / Object.values(userProgress)?.length)
    : 0;

  const progressPercentage = totalDrills > 0 ? Math.round((completedDrills / totalDrills) * 100) : 0;

  const achievements = [
    {
      id: 'first-drill',
      title: 'First Steps',
      description: 'Complete your first emergency drill',
      icon: 'Play',
      unlocked: completedDrills >= 1,
      progress: Math.min(completedDrills, 1)
    },
    {
      id: 'drill-master',
      title: 'Drill Master',
      description: 'Complete 5 emergency drills',
      icon: 'Target',
      unlocked: completedDrills >= 5,
      progress: Math.min(completedDrills / 5, 1)
    },
    {
      id: 'high-scorer',
      title: 'High Scorer',
      description: 'Achieve 90%+ score in any drill',
      icon: 'Award',
      unlocked: Object.values(userProgress)?.some(p => (p?.lastScore || 0) >= 90),
      progress: Object.values(userProgress)?.some(p => (p?.lastScore || 0) >= 90) ? 1 : 0
    },
    {
      id: 'quick-responder',
      title: 'Quick Responder',
      description: 'Complete a drill in under 5 minutes',
      icon: 'Zap',
      unlocked: Object.values(userProgress)?.some(p => (p?.timeUsed || 999) < 300),
      progress: Object.values(userProgress)?.some(p => (p?.timeUsed || 999) < 300) ? 1 : 0
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'drill_completed',
      title: 'Evacuation Drill Completed',
      score: 85,
      time: '2 hours ago',
      icon: 'CheckCircle'
    },
    {
      id: 2,
      type: 'achievement_unlocked',
      title: 'Achievement Unlocked: First Steps',
      time: '1 day ago',
      icon: 'Award'
    },
    {
      id: 3,
      type: 'drill_started',
      title: 'Started Fire Safety Drill',
      time: '3 days ago',
      icon: 'Play'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Your Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{completedDrills}</div>
            <div className="text-sm text-muted-foreground">Drills Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">{averageScore}%</div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{progressPercentage}%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Completion Progress</span>
            <span className="text-sm text-muted-foreground">{completedDrills} of {totalDrills}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="h-3 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id}
              className={`p-4 border rounded-lg transition-smooth ${
                achievement?.unlocked 
                  ? 'border-success bg-success/5' :'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement?.unlocked 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={achievement?.unlocked ? achievement?.icon : 'Lock'} 
                    size={20} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement?.unlocked ? 'text-card-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                  {!achievement?.unlocked && achievement?.progress > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="h-1 bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${achievement?.progress * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity?.type === 'drill_completed' ? 'bg-success/10 text-success' :
                activity?.type === 'achievement_unlocked'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
              }`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{activity?.title}</p>
                {activity?.score && (
                  <p className="text-xs text-muted-foreground">Score: {activity?.score}%</p>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{activity?.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg shadow-soft p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold text-card-foreground">Improving</div>
              <div className="text-sm text-muted-foreground">Performance Trend</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg shadow-soft p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-lg font-semibold text-card-foreground">5.2 min</div>
              <div className="text-sm text-muted-foreground">Avg. Response Time</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg shadow-soft p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-lg font-semibold text-card-foreground">78%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillProgress;