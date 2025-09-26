import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterAndSearch = ({ onFiltersChange, totalModules = 0 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const difficultyOptions = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'natural-disasters', label: 'Natural Disasters' },
    { value: 'man-made-disasters', label: 'Man-made Disasters' },
    { value: 'emergency-response', label: 'Emergency Response' },
    { value: 'first-aid', label: 'First Aid & Medical' },
    { value: 'communication', label: 'Emergency Communication' }
  ];

  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: 'short', label: 'Under 30 minutes' },
    { value: 'medium', label: '30-60 minutes' },
    { value: 'long', label: 'Over 60 minutes' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration-asc', label: 'Shortest First' },
    { value: 'duration-desc', label: 'Longest First' }
  ];

  const handleFiltersChange = () => {
    const filters = {
      searchTerm,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      duration: selectedDuration,
      sortBy
    };
    onFiltersChange && onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedCategory('');
    setSelectedDuration('');
    setSortBy('recommended');
    
    const filters = {
      searchTerm: '',
      difficulty: '',
      category: '',
      duration: '',
      sortBy: 'recommended'
    };
    onFiltersChange && onFiltersChange(filters);
  };

  const hasActiveFilters = searchTerm || selectedDifficulty || selectedCategory || selectedDuration || sortBy !== 'recommended';

  // Apply filters whenever any filter value changes
  React.useEffect(() => {
    handleFiltersChange();
  }, [searchTerm, selectedDifficulty, selectedCategory, selectedDuration, sortBy]);

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search modules by title, topic, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Icon name="Filter" size={16} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {totalModules} module{totalModules !== 1 ? 's' : ''} available
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-primary hover:text-primary/80"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      {/* Filter Panel */}
      {showFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Difficulty Filter */}
            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              placeholder="Select difficulty"
            />

            {/* Category Filter */}
            <Select
              label="Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select category"
            />

            {/* Duration Filter */}
            <Select
              label="Duration"
              options={durationOptions}
              value={selectedDuration}
              onChange={setSelectedDuration}
              placeholder="Select duration"
            />

            {/* Sort By */}
            <Select
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedDifficulty('Beginner');
                setSelectedCategory('natural-disasters');
              }}
              className="text-xs"
            >
              Beginner Natural Disasters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('first-aid');
                setSelectedDuration('short');
              }}
              className="text-xs"
            >
              Quick First Aid
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedDifficulty('Advanced');
                setSortBy('rating');
              }}
              className="text-xs"
            >
              Top Rated Advanced
            </Button>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
            
            {searchTerm && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                <Icon name="Search" size={12} />
                <span>"{searchTerm}"</span>
                <button onClick={() => setSearchTerm('')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedDifficulty && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                <Icon name="BarChart3" size={12} />
                <span>{selectedDifficulty}</span>
                <button onClick={() => setSelectedDifficulty('')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedCategory && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                <Icon name="Tag" size={12} />
                <span>{categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}</span>
                <button onClick={() => setSelectedCategory('')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedDuration && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                <Icon name="Clock" size={12} />
                <span>{durationOptions?.find(opt => opt?.value === selectedDuration)?.label}</span>
                <button onClick={() => setSelectedDuration('')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {sortBy !== 'recommended' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                <Icon name="ArrowUpDown" size={12} />
                <span>{sortOptions?.find(opt => opt?.value === sortBy)?.label}</span>
                <button onClick={() => setSortBy('recommended')}>
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterAndSearch;