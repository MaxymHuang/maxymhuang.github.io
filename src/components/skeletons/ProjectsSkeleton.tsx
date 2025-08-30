import React from 'react';
import Skeleton from '../Skeleton';

interface ProjectCardSkeletonProps {
  showImage?: boolean;
}

const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ showImage = true }) => {
  return (
    <div className="rounded-xl bg-card ring-1 ring-border shadow-soft p-5 hover:translate-y-[-2px] transition animate-pulse">
      <div className="flex items-start gap-4">
        {/* Project image/logo skeleton */}
        {showImage && (
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-md overflow-hidden animate-pulse">
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%" 
                className="rounded-md"
              />
            </div>
          </div>
        )}
        
        {/* Project content skeleton */}
        <div className="min-w-0 flex-1">
          {/* Project title - matches actual truncation */}
          <Skeleton width="85%" height="24px" className="mb-2" />
          
          {/* Project description - matches line-clamp-3 */}
          <div className="mb-4 space-y-1">
            <Skeleton width="100%" height="16px" />
            <Skeleton width="95%" height="16px" />
            <Skeleton width="75%" height="16px" />
          </div>
          
          {/* Action buttons - matching actual button styles */}
          <div className="flex flex-wrap gap-2">
            {/* "View Case Study" button - subtle bg */}
            <div className="bg-subtle rounded-md px-3 py-1.5 w-32 h-8 flex items-center">
              <Skeleton width="100%" height="14px" />
            </div>
            {/* "Read Inline" button - foreground bg */}
            <div className="bg-foreground rounded-md px-3 py-1.5 w-24 h-8 flex items-center">
              <Skeleton width="100%" height="14px" className="bg-background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsSkeletonProps {
  showHeader?: boolean;
  showFilter?: boolean;
  cardCount?: number;
  showPagination?: boolean;
}

const ProjectsSkeleton: React.FC<ProjectsSkeletonProps> = ({ 
  showHeader = true,
  showFilter = true,
  cardCount = 4,
  showPagination = true
}) => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        {/* Section header */}
        {showHeader && (
          <div className="flex items-end justify-between gap-4 mb-6">
            <Skeleton width="120px" height="32px" />
          </div>
        )}
        
        {/* Filter skeleton - matching ProjectFilter.css styles */}
        {showFilter && (
          <div className="mb-8">
            <div className="flex gap-4 justify-center flex-wrap">
              {[
                { label: 'All Projects', count: '5' },
                { label: 'IoT & Hardware', count: '1' },
                { label: 'AI & ML', count: '1' },
                { label: 'Infrastructure', count: '2' },
                { label: 'Full Stack', count: '4' }
              ].map((filter, index) => (
                <div 
                  key={index}
                  className={`border border-border/30 rounded-md px-6 py-3 animate-pulse flex items-center gap-2 ${
                    index === 0 ? 'bg-accent/10 border-accent' : ''
                  }`}
                >
                  <Skeleton width={`${filter.label.length * 6}px`} height="14px" />
                  <Skeleton width="20px" height="14px" />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <ProjectCardSkeleton 
              key={index} 
              showImage={Math.random() > 0.3} // Random variation
            />
          ))}
        </div>
        
        {/* Pagination skeleton */}
        {showPagination && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <Skeleton variant="circular" width="32px" height="32px" />
            <div className="flex items-center gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="circular" 
                  width="8px" 
                  height="8px"
                />
              ))}
            </div>
            <Skeleton variant="circular" width="32px" height="32px" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
