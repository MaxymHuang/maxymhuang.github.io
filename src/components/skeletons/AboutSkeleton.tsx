import React from 'react';
import Skeleton from '../Skeleton';

const AboutSkeleton: React.FC = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Profile image skeleton */}
          <div className="md:col-span-1">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl shadow-soft ring-1 ring-border mx-auto md:mx-0 animate-pulse">
              <Skeleton 
                variant="rectangular" 
                className="w-full h-full rounded-xl"
              />
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="md:col-span-2 space-y-8">
            {/* About section */}
            <div>
              <Skeleton width="60px" height="14px" className="mb-2" />
              <Skeleton width="100%" height="20px" className="mb-2" />
              <Skeleton variant="text" lines={2} />
            </div>
            
            {/* Technical Skills section */}
            <div>
              <Skeleton width="120px" height="14px" className="mb-2" />
              <Skeleton variant="text" lines={2} />
            </div>
            
            {/* Contact section */}
            <div>
              <Skeleton width="80px" height="14px" className="mb-2" />
              <Skeleton variant="text" lines={2} className="mb-4" />
              <Skeleton width="120px" height="36px" className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSkeleton;
