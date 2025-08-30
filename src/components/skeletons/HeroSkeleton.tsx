import React from 'react';
import Skeleton from '../Skeleton';

const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative isolate pt-28 pb-20 sm:pt-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero name - BlurText animated name */}
          <div className="mb-6">
            <Skeleton className="mx-auto" width="320px" height="60px" />
          </div>
          
          {/* Title, subtitle, and description matching actual content */}
          <div className="mt-6 space-y-3">
            <Skeleton className="mx-auto" width="280px" height="36px" />
            <Skeleton className="mx-auto" width="320px" height="28px" />
            <Skeleton className="mx-auto" width="600px" height="24px" />
          </div>
          
          {/* CTA buttons - Primary (dark bg) and Secondary (subtle bg) */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* Primary button - "View Projects" */}
            <div className="inline-flex items-center gap-2 rounded-md px-4 py-2 shadow-soft animate-pulse">
              <div className="bg-foreground rounded-md p-2 w-28 h-10 flex items-center justify-center">
                <Skeleton width="100px" height="16px" className="bg-background" />
              </div>
            </div>
            {/* Secondary button - "Download Resume" */}
            <div className="inline-flex items-center gap-2 rounded-md px-4 py-2 shadow-soft animate-pulse">
              <div className="bg-subtle rounded-md p-2 w-36 h-10 flex items-center justify-center">
                <Skeleton width="120px" height="16px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
