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
            <div className="bg-subtle/30 rounded-lg p-8 w-64 h-80 mx-auto flex flex-col items-center justify-center space-y-4">
              <Skeleton width="40px" height="40px" variant="circular" />
              <Skeleton width="120px" height="16px" />
              <div className="space-y-2">
                <Skeleton width="100%" height="12px" />
                <Skeleton width="80%" height="12px" />
                <Skeleton width="90%" height="12px" />
              </div>
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
