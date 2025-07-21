import React from 'react';
import './PDFViewer.css';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl, title = 'PDF Viewer' }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="pdf-viewer-overlay" 
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="pdf-viewer-modal">
        <div className="pdf-viewer-header">
          <h3>{title}</h3>
          <button 
            className="pdf-viewer-close" 
            onClick={onClose}
            aria-label="Close PDF viewer"
          >
            ×
          </button>
        </div>
        <div className="pdf-viewer-content">
          <iframe
            src={pdfUrl}
            title={title}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer; 