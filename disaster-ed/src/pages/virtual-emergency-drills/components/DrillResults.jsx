import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DrillResults = ({ 
  results, 
  scenario, 
  onRetry, 
  onContinue, 
  onViewCertificate,
  className = '' 
}) => {
  const { score, choices, timeUsed, completed } = results;

  const getScoreGrade = () => {
    if (score >= 90) return { grade: 'A+', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 80) return { grade: 'A', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 70) return { grade: 'B', color: 'text-primary', bg: 'bg-primary/10' };
    if (score >= 60) return { grade: 'C', color: 'text-warning', bg: 'bg-warning/10' };
    return { grade: 'D', color: 'text-error', bg: 'bg-error/10' };
  };

  const getPerformanceMessage = () => {
    if (score >= 90) return "Outstanding performance! You demonstrated excellent emergency response skills.";
    if (score >= 80) return "Great job! You handled the emergency situation very well.";
    if (score >= 70) return "Good work! You made mostly correct decisions during the drill.";
    if (score >= 60) return "Fair performance. Review the feedback to improve your response.";
    return "Needs improvement. Please review the emergency protocols and try again.";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const scoreGrade = getScoreGrade();
  const totalPossiblePoints = choices?.length * 10;
  const earnedPoints = choices?.reduce((sum, choice) => sum + choice?.points, 0);

  const improvementAreas = choices?.filter(choice => choice?.points < 8)?.map(choice => ({
      step: choice?.stepId,
      feedback: choice?.feedback
    }));

  const strengths = choices?.filter(choice => choice?.points >= 8)?.map(choice => ({
      step: choice?.stepId,
      feedback: choice?.feedback
    }));

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border text-center">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${scoreGrade?.bg}`}>
          <span className={`text-3xl font-bold ${scoreGrade?.color}`}>{scoreGrade?.grade}</span>
        </div>
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">Drill Complete!</h2>
        <p className="text-muted-foreground">{getPerformanceMessage()}</p>
      </div>
      {/* Score Overview */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${scoreGrade?.color}`}>{score}%</div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{earnedPoints}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
            <div className="text-xs text-muted-foreground">out of {totalPossiblePoints}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">{formatTime(timeUsed)}</div>
            <div className="text-sm text-muted-foreground">Time Taken</div>
          </div>
        </div>
      </div>
      {/* Detailed Feedback */}
      <div className="p-6 space-y-6">
        {/* Strengths */}
        {strengths?.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-semibold text-card-foreground mb-4">
              <Icon name="CheckCircle" size={20} className="text-success mr-2" />
              What You Did Well
            </h3>
            <div className="space-y-3">
              {strengths?.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-card-foreground">{strength?.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Areas for Improvement */}
        {improvementAreas?.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-semibold text-card-foreground mb-4">
              <Icon name="AlertCircle" size={20} className="text-warning mr-2" />
              Areas for Improvement
            </h3>
            <div className="space-y-3">
              {improvementAreas?.map((area, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-card-foreground">{area?.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Learnings */}
        <div>
          <h3 className="flex items-center text-lg font-semibold text-card-foreground mb-4">
            <Icon name="Lightbulb" size={20} className="text-primary mr-2" />
            Key Learnings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Emergency Response Priority</h4>
              <p className="text-sm text-muted-foreground">
                Always prioritize personal safety first, then assist others when it's safe to do so.
              </p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Communication is Key</h4>
              <p className="text-sm text-muted-foreground">
                Clear communication during emergencies helps coordinate response and ensures everyone's safety.
              </p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Follow Established Protocols</h4>
              <p className="text-sm text-muted-foreground">
                Emergency protocols are designed to save lives. Always follow them even under pressure.
              </p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Stay Calm Under Pressure</h4>
              <p className="text-sm text-muted-foreground">
                Maintaining composure helps you make better decisions and assists others effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Certification Progress */}
        {score >= 80 && (
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Award" size={24} className="text-success" />
                <div>
                  <h4 className="font-semibold text-success">Certification Earned!</h4>
                  <p className="text-sm text-muted-foreground">
                    You've successfully completed the {scenario?.title} drill with a passing score.
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={onViewCertificate} iconName="Download">
                View Certificate
              </Button>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div>
          <h3 className="flex items-center text-lg font-semibold text-card-foreground mb-4">
            <Icon name="ArrowRight" size={20} className="text-primary mr-2" />
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Review Learning Materials</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Revisit the disaster preparedness modules to strengthen your knowledge.
              </p>
              <Button variant="outline" size="sm" fullWidth iconName="BookOpen">
                Go to Modules
              </Button>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-card-foreground mb-2">Practice More Drills</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Try different emergency scenarios to build comprehensive skills.
              </p>
              <Button variant="outline" size="sm" fullWidth iconName="Play">
                More Drills
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onRetry} iconName="RotateCcw" className="flex-1">
            Retry Drill
          </Button>
          <Button onClick={onContinue} iconName="ArrowRight" className="flex-1">
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DrillResults;