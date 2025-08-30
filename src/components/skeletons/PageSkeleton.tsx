import React from 'react';
import HeroSkeleton from './HeroSkeleton';
import AboutSkeleton from './AboutSkeleton';
import TimelineSkeleton from './TimelineSkeleton';
import ProjectsSkeleton from './ProjectsSkeleton';
import ContactSkeleton from './ContactSkeleton';
import Skeleton from '../Skeleton';

interface PageSkeletonProps {
  showNavbar?: boolean;
}

const NavbarSkeleton: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border/10 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Brand - "MAXYM HUANG" */}
        <div className="animate-pulse">
          <Skeleton width="140px" height="20px" />
        </div>
        
        {/* Desktop Navigation links - matching MinimalNavBar */}
        <div className="hidden md:flex items-center gap-8 animate-pulse">
          {['About', 'Experience', 'Projects', 'Connect'].map((_, index) => (
            <div key={index} className="relative">
              <Skeleton width={`${60 + index * 10}px`} height="16px" />
              {/* Active indicator line for first item */}
              {index === 0 && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile hamburger menu */}
        <div className="md:hidden animate-pulse">
          <div className="w-6 h-4 space-y-1">
            <Skeleton width="24px" height="2px" />
            <Skeleton width="24px" height="2px" />
            <Skeleton width="24px" height="2px" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const PageSkeleton: React.FC<PageSkeletonProps> = ({ showNavbar = true }) => {
  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <NavbarSkeleton />}
      
      <main className="animate-pulse">
        <HeroSkeleton />
        <AboutSkeleton />
        <TimelineSkeleton />
        <ProjectsSkeleton />
        <ContactSkeleton />
      </main>
    </div>
  );
};

export default PageSkeleton;
