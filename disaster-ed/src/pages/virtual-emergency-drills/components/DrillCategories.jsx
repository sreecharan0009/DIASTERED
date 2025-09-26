import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillCategories = ({ 
  selectedCategory, 
  onCategorySelect,
  userProgress = {},
  className = '' 
}) => {
  const categories = [
    {
      id: 'all',
      name: 'All Drills',
      icon: 'Grid3x3',
      description: 'View all available emergency drills',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      count: 8
    },
    {
      id: 'fire-safety',
      name: 'Fire Safety',
      icon: 'Flame',
      description: 'Fire evacuation and safety protocols',
      color: 'text-error',
      bgColor: 'bg-error/10',
      count: 3,
      scenarios: ['building-fire', 'kitchen-fire', 'electrical-fire']
    },
    {
      id: 'earthquake',
      name: 'Earthquake Response',
      icon: 'Mountain',
      description: 'Earthquake preparedness and response',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      count: 2,
      scenarios: ['classroom-earthquake', 'outdoor-earthquake']
    },
    {
      id: 'flood',
      name: 'Flood Emergency',
      icon: 'Waves',
      description: 'Flood response and evacuation',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      count: 2,
      scenarios: ['campus-flooding', 'flash-flood']
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      icon: 'Heart',
      description: 'First aid and medical response',
      color: 'text-success',
      bgColor: 'bg-success/10',
      count: 1,
      scenarios: ['first-aid-response']
    }
  ];

  const getCategoryProgress = (category) => {
    if (category?.id === 'all') {
      const allScenarios = categories?.flatMap(cat => cat?.scenarios || []);
      const completed = allScenarios?.filter(scenario => userProgress?.[scenario]?.completed)?.length;
      return { completed, total: allScenarios?.length };
    }
    
    const scenarios = category?.scenarios || [];
    const completed = scenarios?.filter(scenario => userProgress?.[scenario]?.completed)?.length;
    return { completed, total: scenarios?.length };
  };

  const getProgressPercentage = (category) => {
    const { completed, total } = getCategoryProgress(category);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className={'space-y-4 ${className}'}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Drill Categories</h3>
        <span className="text-sm text-muted-foreground">
          {categories?.reduce((sum, cat) => sum + (cat?.count || 0), 0)} total drills
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category?.id;
          const progress = getCategoryProgress(category);
          const progressPercentage = getProgressPercentage(category);

          return (
            <div
              key={category?.id}
              className={`
                bg-card border rounded-lg shadow-soft transition-smooth cursor-pointer hover:shadow-elevated
                ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'}
              `}
              onClick={() => onCategorySelect(category?.id)}
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={'w-10 h-10 rounded-lg flex items-center justify-center ${category?.bgColor}'}>
                      <Icon name={category?.icon} size={20} className={category?.color} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{category?.name}</h4>
                      <p className="text-xs text-muted-foreground">{category?.count} drills</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">{category?.description}</p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-card-foreground">
                      {progress?.completed}/{progress?.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progressPercentage >= 100 ? 'bg-success' : 
                        progressPercentage >= 50 ? 'bg-primary' : 'bg-warning'
                      }`}
                      style={{ width: '${progressPercentage}% '}}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage}% complete
                  </div>
                </div>

                {/* Status Badge */}
                {progressPercentage === 100 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs font-medium text-success">Category Completed</span>
                  </div>
                )}
              </div>
              {/* Quick Action */}
              <div className="px-4 pb-4">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  fullWidth
                  iconName={progressPercentage > 0 ? "Play" : "ArrowRight"}
                >
                  {progressPercentage > 0 ? 'Continue' : 'Start'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Category Stats */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">
              {categories?.reduce((sum, cat) => sum + getCategoryProgress(cat)?.completed, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {categories?.reduce((sum, cat) => {
                const progress = getCategoryProgress(cat);
                return sum + (progress?.total - progress?.completed);
              }, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">
              {categories?.filter(cat => getProgressPercentage(cat) > 0 && getProgressPercentage(cat) < 100)?.length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {Math.round(categories?.reduce((sum, cat) => sum + getProgressPercentage(cat), 0) / categories?.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Overall</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillCategories;
