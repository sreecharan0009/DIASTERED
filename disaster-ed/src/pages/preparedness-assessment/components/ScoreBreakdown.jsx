import React from 'react';
import Icon from '../../../components/AppIcon';

const ScoreBreakdown = ({ 
  overallScore, 
  categoryScores, 
  benchmarkData,
  className = '' 
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const ScoreRing = ({ score, size = 120 }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (score / 100) * circumference;

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
            strokeWidth="4"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-500 ${getScoreColor(score)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
          <span className="text-xs text-muted-foreground">Overall</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Preparedness Score</h3>
          <p className="text-sm text-muted-foreground">Your current disaster readiness level</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={18} className="text-success" />
          <span className="text-sm text-success font-medium">+5% this month</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Overall Score Ring */}
        <div className="flex-shrink-0">
          <ScoreRing score={overallScore} />
        </div>

        {/* Category Breakdown */}
        <div className="flex-1 w-full">
          <h4 className="font-medium text-card-foreground mb-4">Category Breakdown</h4>
          <div className="space-y-4">
            {categoryScores?.map((category) => (
              <div key={category?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">{category?.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(category?.score)}`}>
                    {category?.score}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      category?.score >= 80 ? 'bg-success' : 
                      category?.score >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${category?.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Benchmark Comparison */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4">Benchmark Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benchmarkData?.map((benchmark) => (
            <div key={benchmark?.type} className={`p-4 rounded-lg ${getScoreBackground(benchmark?.score)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground">{benchmark?.label}</span>
                <Icon name={benchmark?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div className={`text-xl font-bold ${getScoreColor(benchmark?.score)}`}>
                {benchmark?.score}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {benchmark?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;