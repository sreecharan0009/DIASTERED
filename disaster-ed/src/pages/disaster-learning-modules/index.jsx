import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import EmergencyAlertIndicator from '../../components/ui/EmergencyAlertIndicator';
import ProgressIndicatorSystem from '../../components/ui/ProgressIndicatorSystem';

// Import components
import ModuleCard from './components/ModuleCard';
import LearningPathway from './components/LearningPathway';
import GameificationPanel from './components/GameificationPanel';
import QuickAccessPanel from './components/QuickAccessPanel';
import FilterAndSearch from './components/FilterAndSearch';

const DisasterLearningModules = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('grid'); // 'grid', 'pathway'
  const [filters, setFilters] = useState({
    searchTerm: '',
    difficulty: '',
    category: '',
    duration: '',
    sortBy: 'recommended'
  });

  // Mock data for modules
  const allModules = [
    {
      id: 'earthquake-safety',
      title: 'Earthquake Safety & Preparedness',
      description: `Learn comprehensive earthquake safety measures including drop, cover, and hold techniques. Understand seismic zones in India, building safety standards, and post-earthquake response protocols. This module covers earthquake prediction systems, emergency kit preparation, and family emergency planning specific to Indian conditions.`,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      icon: 'Mountain',
      difficulty: 'Beginner',
      estimatedTime: '45 min',
      lessonsCount: 8,
      enrolledCount: 15420,
      rating: 4.8,
      category: 'natural-disasters'
    },
    {
      id: 'flood-preparedness',
      title: 'Flood Preparedness & Response',
      description: `Master flood preparedness strategies for monsoon seasons and urban flooding. Learn about early warning systems, evacuation procedures, and water safety measures. Covers flood-prone areas in India, emergency supplies, and community response coordination during flood emergencies.`,
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
      icon: 'Waves',
      difficulty: 'Beginner',
      estimatedTime: '35 min',
      lessonsCount: 6,
      enrolledCount: 12890,
      rating: 4.7,
      category: 'natural-disasters'
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety & Prevention',
      description: `Comprehensive fire safety training covering prevention, detection, and response. Learn about different types of fires, proper use of fire extinguishers, and evacuation procedures. Includes electrical fire safety, kitchen fire prevention, and school fire safety protocols.`,
      image: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg',
      icon: 'Flame',
      difficulty: 'Intermediate',
      estimatedTime: '40 min',
      lessonsCount: 7,
      enrolledCount: 18750,
      rating: 4.9,
      category: 'man-made-disasters'
    },
    {
      id: 'cyclone-awareness',
      title: 'Cyclone Awareness & Safety',
      description: `Understanding cyclone formation, tracking, and safety measures for coastal regions. Learn about cyclone categories, warning systems, and preparation strategies. Covers evacuation procedures, shelter management, and post-cyclone recovery specific to Indian coastal areas.`,
      image: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg',
      icon: 'Wind',
      difficulty: 'Intermediate',
      estimatedTime: '50 min',
      lessonsCount: 9,
      enrolledCount: 9340,
      rating: 4.6,
      category: 'natural-disasters'
    },
    {
      id: 'first-aid-basics',
      title: 'First Aid & Emergency Medical Response',
      description: `Essential first aid skills for disaster scenarios including CPR, wound care, and trauma response. Learn to assess injuries, provide immediate care, and coordinate with medical services. Covers common disaster-related injuries and medical emergency protocols.`,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
      icon: 'Heart',
      difficulty: 'Advanced',
      estimatedTime: '60 min',
      lessonsCount: 12,
      enrolledCount: 21560,
      rating: 4.9,
      category: 'first-aid'
    }
  ];

  // Mock user progress data
  const userProgress = {
    'earthquake-safety': { percentage: 0, completed: false, lastAccessed: null },
    'flood-preparedness': { percentage: 0, completed: false, lastAccessed: null },
    'fire-safety': { percentage: 0, completed: false, lastAccessed: null },
    'cyclone-awareness': { percentage: 0, completed: false, lastAccessed: null },
    'first-aid-basics': { percentage: 0, completed: false, lastAccessed: null },
  };

  // Mock user stats for gamification
  const userStats = {
    totalPoints: 2750,
    level: 3,
    badges: ['first-module', 'streak-7', 'quiz-master'],
    streak: 12,
    rank: 'Intermediate',
    nextLevelPoints: 3000,
    weeklyGoal: 500,
    weeklyProgress: 320
  };


  const bookmarkedContent = [
    {
      id: 'bookmark-1',
      title: 'Emergency Kit Checklist',
      type: 'Resource',
      moduleId: 'earthquake-safety',
      moduleName: 'Earthquake Safety'
    },
    {
      id: 'bookmark-2',
      title: 'CPR Techniques Video',
      type: 'Video',
      moduleId: 'first-aid-basics',
      moduleName: 'First Aid Basics'
    }
  ];

  // Filter modules based on current filters
  const getFilteredModules = () => {
    let filtered = [...allModules];

    // Search filter
    if (filters?.searchTerm) {
      const searchLower = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(module =>
        module.title?.toLowerCase()?.includes(searchLower) ||
        module.description?.toLowerCase()?.includes(searchLower)
      );
    }

    // Difficulty filter
    if (filters?.difficulty) {
      filtered = filtered?.filter(module => module.difficulty === filters?.difficulty);
    }

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(module => module.category === filters?.category);
    }

    // Duration filter
    if (filters?.duration) {
      filtered = filtered?.filter(module => {
        const duration = parseInt(module.estimatedTime);
        switch (filters?.duration) {
          case 'short':
            return duration < 30;
          case 'medium':
            return duration >= 30 && duration <= 60;
          case 'long':
            return duration > 60;
          default:
            return true;
        }
      });
    }

    // Sort modules
    switch (filters?.sortBy) {
      case 'newest':
        // Mock newest first (reverse order for demo)
        filtered = filtered?.reverse();
        break;
      case 'popular':
        filtered = filtered?.sort((a, b) => b?.enrolledCount - a?.enrolledCount);
        break;
      case 'rating':
        filtered = filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'duration-asc':
        filtered = filtered?.sort((a, b) => parseInt(a?.estimatedTime) - parseInt(b?.estimatedTime));
        break;
      case 'duration-desc':
        filtered = filtered?.sort((a, b) => parseInt(b?.estimatedTime) - parseInt(a?.estimatedTime));
        break;
      default:
        // Keep recommended order (original order)
        break;
    }

    return filtered;
  };

  const filteredModules = getFilteredModules();

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleModuleSelect = (moduleId) => {
    navigate(`/disaster-learning-modules/${moduleId}`);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Disaster Learning Modules - DisasterEd India</title>
        <meta name="description" content="Interactive disaster preparedness learning modules for Indian schools and colleges. Learn earthquake safety, flood preparedness, fire safety, and emergency response." />
      </Helmet>
      <Header 
        userRole="student" 
        alertCount={2} 
        onMenuToggle={() => {}} // Add missing required prop
      />
      <EmergencyAlertIndicator 
        alertCount={2} 
        alertLevel="medium"
        latestAlert={{
          title: "Heavy Rainfall Alert",
          preview: "Moderate to heavy rainfall expected in your region...",
          time: "2 hours ago"
        }}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Disaster Learning Modules
              </h1>
              <p className="text-muted-foreground">
                Master disaster preparedness through interactive learning experiences designed for Indian educational institutions
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
              <Button
                variant={activeView === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewChange('grid')}
                className="px-3"
              >
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Modules
              </Button>
              <Button
                variant={activeView === 'pathway' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewChange('pathway')}
                className="px-3"
              >
                <Icon name="Route" size={16} className="mr-2" />
                Pathway
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={20} className="text-primary" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">{allModules?.length}</div>
                  <div className="text-xs text-muted-foreground">Total Modules</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {Object.values(userProgress)?.filter(p => p?.completed)?.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Play" size={20} className="text-warning" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {Object.values(userProgress)?.filter(p => p?.percentage > 0 && !p?.completed)?.length}
                  </div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={20} className="text-warning" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">{userStats?.totalPoints?.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-muted-foreground">Points Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === 'grid' ? (
              <>
                {/* Filter and Search */}
                <FilterAndSearch 
                  onFiltersChange={handleFiltersChange}
                  totalModules={filteredModules?.length}
                />

                {/* Modules Grid */}
                <div className="mt-8">
                  {filteredModules?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredModules?.map((module) => (
                        <ModuleCard
                          key={module.id}
                          module={module}
                          userProgress={userProgress}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No modules found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setFilters({
                          searchTerm: '',
                          difficulty: '',
                          category: '',
                          duration: '',
                          sortBy: 'recommended'
                        })}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <ProgressIndicatorSystem userProgress={userProgress} horizontal />
                  </div>
              </>
            ) : (
              /* Learning Pathway View */
              (<LearningPathway 
                userProgress={userProgress}
                onModuleSelect={handleModuleSelect}
              />)
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickAccessPanel bookmarkedContent={bookmarkedContent} />
            <GameificationPanel userStats={userStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterLearningModules;
