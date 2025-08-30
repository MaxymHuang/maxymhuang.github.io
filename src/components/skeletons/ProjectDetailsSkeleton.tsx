import React from 'react';
import Skeleton from '../Skeleton';

const ProjectDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NavBar Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border/10 px-8 py-4">
        <div className="flex items-center justify-between animate-pulse">
          <Skeleton width="140px" height="20px" />
          <div className="hidden md:flex items-center gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} width={`${60 + index * 10}px`} height="16px" />
            ))}
          </div>
          <div className="md:hidden">
            <div className="w-6 h-4 space-y-1">
              <Skeleton width="24px" height="2px" />
              <Skeleton width="24px" height="2px" />
              <Skeleton width="24px" height="2px" />
            </div>
          </div>
        </div>
      </nav>

      {/* Project Details Layout */}
      <div className="pt-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <div className="animate-pulse space-y-8">
            {/* Project Header */}
            <div className="space-y-4">
              <Skeleton width="60%" height="48px" />
              <Skeleton variant="text" lines={2} />
            </div>

            {/* Project Tags */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-subtle rounded-full px-3 py-1">
                  <Skeleton width={`${40 + Math.random() * 20}px`} height="14px" />
                </div>
              ))}
            </div>

            {/* Project Links */}
            <div className="flex gap-4">
              <div className="bg-foreground rounded-md px-4 py-2 w-24 h-10 flex items-center">
                <Skeleton width="100%" height="16px" className="bg-background" />
              </div>
              <div className="bg-subtle rounded-md px-4 py-2 w-32 h-10 flex items-center">
                <Skeleton width="100%" height="16px" />
              </div>
            </div>

            {/* Content Sections */}
            {['Overview', 'Technologies', 'Features', 'Challenges', 'Solutions'].map((section, index) => (
              <div key={section} className="space-y-4">
                <Skeleton width="120px" height="32px" />
                <div className="space-y-2">
                  {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, lineIndex) => (
                    <Skeleton key={lineIndex} width={`${80 + Math.random() * 20}%`} height="18px" />
                  ))}
                </div>
                {index > 1 && (
                  <div className="space-y-2 ml-4">
                    {Array.from({ length: Math.floor(Math.random() * 4) + 3 }).map((_, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <Skeleton width="4px" height="4px" variant="circular" />
                        <Skeleton width={`${60 + Math.random() * 30}%`} height="16px" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Back to Home Button */}
            <div className="pt-8">
              <div className="bg-foreground rounded-md px-4 py-2 w-32 h-10 flex items-center">
                <Skeleton width="100%" height="16px" className="bg-background" />
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-card ring-1 ring-border rounded-xl p-6 animate-pulse">
              <Skeleton width="120px" height="20px" className="mb-4" />
              <div className="space-y-3">
                {['Overview', 'Technologies', 'Features', 'Challenges', 'Solutions'].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton width="20px" height="14px" />
                    <Skeleton width={`${80 + Math.random() * 40}px`} height="14px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
