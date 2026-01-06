import React from 'react';
import Skeleton from '../Skeleton';

const ContactSkeleton: React.FC = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact form skeleton */}
          <div>
            {/* Form header */}
            <Skeleton width="100px" height="14px" className="mb-2" />
            <Skeleton width="200px" height="32px" className="mb-6" />
            
            {/* Form container - matching actual ContactForm styling */}
            <div className="rounded-xl bg-card ring-1 ring-border shadow-soft p-5">
              <div className="space-y-6 animate-pulse">
                {/* Name and Email row - matching form-row grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton width="40px" height="14px" />
                    <div className="bg-subtle/20 border border-border/20 rounded h-12 p-4">
                      <Skeleton width="80%" height="16px" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton width="45px" height="14px" />
                    <div className="bg-subtle/20 border border-border/20 rounded h-12 p-4">
                      <Skeleton width="70%" height="16px" />
                    </div>
                  </div>
                </div>
                
                {/* Subject field */}
                <div className="space-y-2">
                  <Skeleton width="55px" height="14px" />
                  <div className="bg-subtle/20 border border-border/20 rounded h-12 p-4">
                    <Skeleton width="60%" height="16px" />
                  </div>
                </div>
                
                {/* Message field - textarea styling */}
                <div className="space-y-2">
                  <Skeleton width="65px" height="14px" />
                  <div className="bg-subtle/20 border border-border/20 rounded h-32 p-4">
                    <div className="space-y-2">
                      <Skeleton width="100%" height="16px" />
                      <Skeleton width="90%" height="16px" />
                      <Skeleton width="75%" height="16px" />
                    </div>
                  </div>
                </div>
                
                {/* Submit button - pill shaped like actual CSS */}
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-accent via-accent to-accent rounded-full px-6 py-4 w-36 h-12 flex items-center justify-center">
                    <Skeleton width="100px" height="16px" className="bg-background/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact links skeleton - matching social card styling */}
          <div>
            <Skeleton width="180px" height="14px" className="mb-4" />
            
            {/* Social links - matching actual social link cards */}
            <div className="space-y-3">
              {[
                { label: 'LINKEDIN', width: '80px' },
                { label: 'GITHUB', width: '70px' },
                { label: 'CV', width: '50px' }
              ].map((link, index) => (
                <div 
                  key={index}
                  className="rounded-md bg-card ring-1 ring-border px-4 py-3 hover:bg-subtle transition animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton width={link.width} height="20px" />
                    <Skeleton width="16px" height="16px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSkeleton;
