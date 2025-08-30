import React from 'react';
import Skeleton from '../Skeleton';

interface PDFViewerSkeletonProps {
  isOpen?: boolean;
}

const PDFViewerSkeleton: React.FC<PDFViewerSkeletonProps> = ({ isOpen = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card ring-1 ring-border rounded-xl shadow-soft w-full max-w-4xl max-h-[90vh] mx-4 animate-pulse">
        {/* PDF Viewer Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-subtle rounded p-2">
              <Skeleton width="20px" height="20px" />
            </div>
            <Skeleton width="180px" height="20px" />
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="bg-subtle rounded p-2">
              <Skeleton width="16px" height="16px" />
            </div>
            <div className="bg-subtle rounded p-2">
              <Skeleton width="16px" height="16px" />
            </div>
            <div className="bg-subtle rounded p-2">
              <Skeleton width="16px" height="16px" />
            </div>
            <div className="bg-subtle rounded p-2">
              <Skeleton width="16px" height="16px" />
            </div>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="p-4 h-96 bg-subtle/10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="bg-white/95 rounded-lg shadow-lg p-8 w-64 h-80 mx-auto flex flex-col items-center justify-center space-y-4 animate-pulse">
              {/* PDF icon skeleton */}
              <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                <div className="text-red-600 text-lg font-bold">PDF</div>
              </div>
              
              {/* Document title skeleton */}
              <Skeleton width="140px" height="18px" />
              
              {/* Document content lines skeleton */}
              <div className="space-y-3 w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-1">
                    <Skeleton width={`${70 + Math.random() * 30}%`} height="8px" />
                    {index % 3 === 0 && <Skeleton width={`${50 + Math.random() * 20}%`} height="8px" />}
                  </div>
                ))}
              </div>
              
              {/* Loading indicator */}
              <div className="text-muted text-xs opacity-60">Loading PDF...</div>
            </div>
          </div>
        </div>

        {/* PDF Viewer Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Skeleton width="40px" height="16px" />
            <span className="text-muted">of</span>
            <Skeleton width="40px" height="16px" />
          </div>
          
          <div className="flex items-center gap-2">
            <Skeleton width="80px" height="32px" className="rounded-md" />
            <Skeleton width="80px" height="32px" className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerSkeleton;
