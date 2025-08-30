import React from 'react';
import Skeleton from '../Skeleton';

interface TimelineItemSkeletonProps {
  isLast?: boolean;
}

const TimelineItemSkeleton: React.FC<TimelineItemSkeletonProps> = ({ isLast = false }) => {
  return (
    <li className={`${isLast ? 'mb-0' : 'mb-10'} ml-4`}>
      {/* Timeline dot */}
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-subtle ring-4 ring-subtle animate-pulse" />
      
      {/* Timeline content */}
      <div className="space-y-2">
        {/* Period */}
        <Skeleton width="140px" height="16px" />
        
        {/* Title and organization */}
        <div className="space-y-1">
          <Skeleton width="60%" height="24px" />
          <Skeleton width="40%" height="20px" />
        </div>
        
        {/* Description */}
        <div className="mt-2">
          <Skeleton variant="text" lines={Math.floor(Math.random() * 2) + 2} />
        </div>
      </div>
    </li>
  );
};

interface TimelineSkeletonProps {
  showHeader?: boolean;
  itemCount?: number;
}

const TimelineSkeleton: React.FC<TimelineSkeletonProps> = ({ 
  showHeader = true,
  itemCount = 4
}) => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        {/* Section header */}
        {showHeader && (
          <Skeleton width="140px" height="32px" className="mb-8" />
        )}
        
        {/* Timeline */}
        <ol className="relative border-l border-border">
          {Array.from({ length: itemCount }).map((_, index) => (
            <TimelineItemSkeleton 
              key={index} 
              isLast={index === itemCount - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TimelineSkeleton;
