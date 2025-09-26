import React from 'react';
import Icon from '../../../components/AppIcon';

const GameificationPanel = ({ userStats = {} }) => {
  const {
    totalPoints = 0,
    level = 1,
    badges = [],
    streak = 0,
    rank = 'Beginner',
    nextLevelPoints = 1000,
    weeklyGoal = 500,
    weeklyProgress = 0
  } = userStats;

  const pointsToNextLevel = nextLevelPoints - totalPoints;
  const levelProgress = (totalPoints / nextLevelPoints) * 100;
  const weeklyGoalProgress = (weeklyProgress / weeklyGoal) * 100;

  const achievements = [
    {
      id: 'first-module',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: 'BookOpen',
      earned: badges?.includes('first-module'),
      points: 100
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: '7-day learning streak',
      icon: 'Flame',
      earned: badges?.includes('streak-7'),
      points: 250
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: 'Target',
      earned: badges?.includes('quiz-master'),
      points: 300
    },
    {
      id: 'drill-expert',
      title: 'Drill Expert',
      description: 'Complete 10 virtual drills',
      icon: 'Shield',
      earned: badges?.includes('drill-expert'),
      points: 400
    },
    {
      id: 'helper',
      title: 'Community Helper',
      description: 'Help 5 fellow learners',
      icon: 'Users',
      earned: badges?.includes('helper'),
      points: 200
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Complete all modules with 100%',
      icon: 'Crown',
      earned: badges?.includes('perfectionist'),
      points: 1000
    }
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Expert':
        return 'text-error';
      case 'Advanced':
        return 'text-warning';
      case 'Intermediate':
        return 'text-primary';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Trophy" size={20} className="text-warning" />
        <h3 className="text-lg font-semibold text-card-foreground">Your Progress</h3>
      </div>
      {/* Level and Points */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">{level}</span>
            </div>
            <div>
              <div className="font-semibold text-card-foreground">Level {level}</div>
              <div className={`text-sm font-medium ${getRankColor(rank)}`}>{rank}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{totalPoints?.toLocaleString('en-IN')}</div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress to Level {level + 1}</span>
            <span>{pointsToNextLevel?.toLocaleString('en-IN')} points to go</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(levelProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
      {/* Weekly Goal */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="font-medium text-card-foreground">Weekly Goal</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {weeklyProgress}/{weeklyGoal} points
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(weeklyGoalProgress, 100)}%` }}
          />
        </div>
      </div>
      {/* Streak Counter */}
      <div className="mb-6 flex items-center justify-between p-4 bg-gradient-to-r from-warning/10 to-error/10 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Flame" size={24} className="text-warning" />
          <div>
            <div className="font-semibold text-card-foreground">{streak} Day Streak</div>
            <div className="text-xs text-muted-foreground">Keep learning daily!</div>
          </div>
        </div>
        {streak > 0 && (
          <div className="text-2xl font-bold text-warning">🔥</div>
        )}
      </div>
      {/* Achievements */}
      <div>
        <h4 className="font-medium text-card-foreground mb-4 flex items-center">
          <Icon name="Award" size={16} className="mr-2" />
          Achievements
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`
                p-3 rounded-lg border transition-smooth
                ${achievement?.earned 
                  ? 'bg-success/10 border-success/20 text-success' :'bg-muted/50 border-border text-muted-foreground'
                }
              `}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={achievement?.icon} 
                  size={16} 
                  className={achievement?.earned ? 'text-success' : 'text-muted-foreground'}
                />
                <span className="text-xs font-medium truncate">{achievement?.title}</span>
              </div>
              <p className="text-xs opacity-75 mb-1">{achievement?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">+{achievement?.points} pts</span>
                {achievement?.earned && (
                  <Icon name="CheckCircle" size={12} className="text-success" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard Teaser */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Your Rank</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">#47 in your school</span>
            {/* <Icon name="ChevronRight" size={14} className="text-muted-foreground" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameificationPanel;