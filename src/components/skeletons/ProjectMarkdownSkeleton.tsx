import React from 'react';
import Skeleton from '../Skeleton';

interface ProjectMarkdownSkeletonProps {
  isExpanded?: boolean;
  projectTitle?: string;
}

const ProjectMarkdownSkeleton: React.FC<ProjectMarkdownSkeletonProps> = ({ 
  isExpanded = true,
  projectTitle = 'Project Details'
}) => {
  return (
    <div className="mt-12 rounded-xl bg-card ring-1 ring-border shadow-soft animate-pulse">
      {/* Header with expand/collapse button */}
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border">
        <Skeleton width={`${Math.max(projectTitle.length * 8, 200)}px`} height="24px" />
        <div className="bg-subtle rounded-md px-2 py-1 w-20 h-8 flex items-center justify-center">
          <Skeleton width="60px" height="14px" />
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <>
          {/* Markdown content area */}
          <div className="p-5 space-y-6">
            {/* Project overview section */}
            <div className="space-y-4">
              <Skeleton width="100px" height="32px" />
              <div className="space-y-2">
                <Skeleton width="100%" height="18px" />
                <Skeleton width="95%" height="18px" />
                <Skeleton width="88%" height="18px" />
              </div>
            </div>

            {/* Technologies section */}
            <div className="space-y-4">
              <Skeleton width="140px" height="28px" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton width="4px" height="4px" variant="circular" />
                    <Skeleton width={`${120 + Math.random() * 80}px`} height="16px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features section */}
            <div className="space-y-4">
              <Skeleton width="80px" height="28px" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton width="4px" height="4px" variant="circular" />
                    <Skeleton width={`${140 + Math.random() * 100}px`} height="16px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Code block skeleton */}
            <div className="bg-subtle rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton width="8px" height="8px" variant="circular" className="bg-red-500" />
                <Skeleton width="8px" height="8px" variant="circular" className="bg-yellow-500" />
                <Skeleton width="8px" height="8px" variant="circular" className="bg-green-500" />
                <Skeleton width="60px" height="14px" className="ml-auto" />
              </div>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <Skeleton width="20px" height="16px" />
                  <Skeleton width={`${60 + Math.random() * 40}%`} height="16px" />
                </div>
              ))}
            </div>

            {/* Image placeholder */}
            <div className="space-y-2">
              <Skeleton width="100%" height="200px" className="rounded-md" />
              <Skeleton width="200px" height="14px" className="mx-auto" />
            </div>

            {/* Challenges & Solutions section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton width="100px" height="24px" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Skeleton width="4px" height="4px" variant="circular" className="mt-2" />
                      <Skeleton width={`${80 + Math.random() * 20}%`} height="16px" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton width="90px" height="24px" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Skeleton width="4px" height="4px" variant="circular" className="mt-2" />
                      <Skeleton width={`${85 + Math.random() * 15}%`} height="16px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back to top button */}
          <div className="px-5 pb-5">
            <div className="bg-foreground rounded-md px-3 py-1.5 w-24 h-8 flex items-center">
              <Skeleton width="100%" height="14px" className="bg-background" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectMarkdownSkeleton;
