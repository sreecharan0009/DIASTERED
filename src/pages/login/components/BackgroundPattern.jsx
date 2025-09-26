import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      {/* Geometric Patterns */}
      <div className="absolute inset-0">
        {/* Large circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-warning/10 rounded-full blur-lg" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(144)]?.map((_, i) => (
              <div key={i} className="border border-primary/20" />
            ))}
          </div>
        </div>
        
        {/* Disaster-themed icons pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-16 p-8 h-full">
            {[
              'Shield', 'AlertTriangle', 'Heart', 'Users', 'Home', 'Phone',
              'MapPin', 'Zap', 'Waves', 'Wind', 'Flame', 'Mountain',
              'BookOpen', 'GraduationCap', 'Award', 'Target'
            ]?.map((icon, i) => (
              <div key={i} className="flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary/20"
                >
                  {/* Simplified icon representations */}
                  {icon === 'Shield' && (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  )}
                  {icon === 'AlertTriangle' && (
                    <>
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <path d="M12 9v4" />
                      <path d="m12 17 .01 0" />
                    </>
                  )}
                  {icon === 'Heart' && (
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7Z" />
                  )}
                  {/* Add more icon paths as needed */}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse-gentle" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-pulse-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent/20 rounded-full animate-pulse-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-warning/30 rounded-full animate-pulse-gentle" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default BackgroundPattern;