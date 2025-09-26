import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationPanel = ({ 
  recommendations, 
  weakAreas,
  className = '' 
}) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const handleActionClick = (action) => {
    if (action?.type === 'module') {
      navigate('/disaster-learning-modules');
    } else if (action?.type === 'drill') {
      navigate('/virtual-emergency-drills');
    } else if (action?.type === 'assessment') {
      navigate('/preparedness-assessment');
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Improvement Recommendations</h3>
          <p className="text-sm text-muted-foreground">Personalized action items to boost your preparedness</p>
        </div>
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="Target" size={18} />
          <span className="text-sm font-medium">{recommendations?.length} recommendations</span>
        </div>
      </div>
      {/* Weak Areas Summary */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="TrendingDown" size={16} className="mr-2 text-error" />
          Areas Needing Attention
        </h4>
        <div className="flex flex-wrap gap-2">
          {weakAreas?.map((area) => (
            <span 
              key={area?.id}
              className="px-3 py-1 bg-error/10 text-error text-xs font-medium rounded-full border border-error/20"
            >
              {area?.name} ({area?.score}%)
            </span>
          ))}
        </div>
      </div>
      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations?.map((recommendation) => (
          <div 
            key={recommendation?.id}
            className={`p-4 rounded-lg border ${getPriorityColor(recommendation?.priority)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon 
                    name={getPriorityIcon(recommendation?.priority)} 
                    size={18} 
                    className="text-current"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-card-foreground mb-1">
                    {recommendation?.title}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {recommendation?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{recommendation?.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>+{recommendation?.impactScore} points</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${getPriorityColor(recommendation?.priority)}`}>
                {recommendation?.priority}
              </span>
            </div>

            {/* Action Items */}
            <div className="space-y-2">
              {recommendation?.actions?.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name={action?.icon} size={16} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium text-card-foreground">{action?.title}</div>
                      <div className="text-xs text-muted-foreground">{action?.description}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleActionClick(action)}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {action?.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate('/disaster-learning-modules')}
            iconName="BookOpen"
            iconPosition="left"
          >
            Browse Modules
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate('/virtual-emergency-drills')}
            iconName="Play"
            iconPosition="left"
          >
            Practice Drills
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => window.print()}
            iconName="Download"
            iconPosition="left"
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;