import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionalComparison = ({ 
  userScore, 
  regionalData, 
  institutionalData,
  className = '' 
}) => {
  const getPerformanceLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 70) return { level: 'Good', color: 'text-primary', bg: 'bg-primary/10' };
    if (score >= 60) return { level: 'Average', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'Needs Improvement', color: 'text-error', bg: 'bg-error/10' };
  };

  const ComparisonBar = ({ label, userScore, averageScore, icon, description }) => {
    const maxScore = Math.max(userScore, averageScore, 100);
    const userPercentage = (userScore / maxScore) * 100;
    const averagePercentage = (averageScore / maxScore) * 100;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name={icon} size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">{label}</span>
          </div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
        
        <div className="space-y-2">
          {/* User Score Bar */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-primary font-medium w-12">You</span>
            <div className="flex-1 bg-muted rounded-full h-3 relative">
              <div 
                className="h-3 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${userPercentage}%` }}
              />
              <span className="absolute right-2 top-0 text-xs text-white font-medium leading-3">
                {userScore}%
              </span>
            </div>
          </div>
          
          {/* Average Score Bar */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-muted-foreground font-medium w-12">Avg</span>
            <div className="flex-1 bg-muted rounded-full h-3 relative">
              <div 
                className="h-3 bg-muted-foreground rounded-full transition-all duration-500"
                style={{ width: `${averagePercentage}%` }}
              />
              <span className="absolute right-2 top-0 text-xs text-white font-medium leading-3">
                {averageScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const userPerformance = getPerformanceLevel(userScore);

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Regional Comparison</h3>
          <p className="text-sm text-muted-foreground">See how you compare with peers</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${userPerformance?.bg} ${userPerformance?.color}`}>
          {userPerformance?.level}
        </div>
      </div>
      {/* Overall Comparison */}
      <div className="mb-8">
        <ComparisonBar
          label="Overall Preparedness"
          userScore={userScore}
          averageScore={regionalData?.overall}
          icon="Target"
          description="All categories combined"
        />
      </div>
      {/* Category Comparisons */}
      <div className="space-y-6 mb-8">
        <h4 className="font-medium text-card-foreground">Category Breakdown</h4>
        
        <ComparisonBar
          label="Personal Preparedness"
          userScore={regionalData?.categories?.personal?.userScore}
          averageScore={regionalData?.categories?.personal?.average}
          icon="User"
          description="Individual readiness skills"
        />
        
        <ComparisonBar
          label="Emergency Response"
          userScore={regionalData?.categories?.emergency?.userScore}
          averageScore={regionalData?.categories?.emergency?.average}
          icon="AlertTriangle"
          description="Crisis response knowledge"
        />
        
        <ComparisonBar
          label="Disaster Knowledge"
          userScore={regionalData?.categories?.knowledge?.userScore}
          averageScore={regionalData?.categories?.knowledge?.average}
          icon="BookOpen"
          description="Understanding of disasters"
        />
        
        <ComparisonBar
          label="Communication Skills"
          userScore={regionalData?.categories?.communication?.userScore}
          averageScore={regionalData?.categories?.communication?.average}
          icon="MessageCircle"
          description="Emergency communication"
        />
      </div>
      {/* Regional Statistics */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4">Regional Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-card-foreground">{regionalData?.stats?.totalParticipants}</div>
            <div className="text-xs text-muted-foreground">Participants</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-card-foreground">{regionalData?.stats?.averageScore}%</div>
            <div className="text-xs text-muted-foreground">Regional Avg</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-card-foreground">{regionalData?.stats?.topPerformers}%</div>
            <div className="text-xs text-muted-foreground">Top 10%</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-card-foreground">#{regionalData?.stats?.userRank}</div>
            <div className="text-xs text-muted-foreground">Your Rank</div>
          </div>
        </div>
      </div>
      {/* Institutional Comparison */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4 flex items-center">
          <Icon name="Building" size={16} className="mr-2" />
          Institution Comparison
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Your Institution</span>
              <Icon name="School" size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{institutionalData?.institutionAverage}%</div>
            <div className="text-xs text-muted-foreground">Average score</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">State Average</span>
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">{institutionalData?.stateAverage}%</div>
            <div className="text-xs text-muted-foreground">All institutions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalComparison;