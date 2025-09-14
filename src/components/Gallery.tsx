import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoModal from './PhotoModal';
import LoadingImage from './LoadingImage';
import type { Photo } from '../types';
import './Gallery.css';

interface GalleryProps {
  photos: Photo[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Note: columns calculation removed as we're using CSS grid now

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhotoIndex(null);
  };

  const goToNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const goToPrev = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const hasNext = selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1;
  const hasPrev = selectedPhotoIndex !== null && selectedPhotoIndex > 0;

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto max-w-md">
          <svg className="mx-auto h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No photos yet</h3>
          <p className="mt-2 text-muted">Photos will appear here once they're added to the gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Grid Gallery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="gallery-expanded-container"
      >
        {/* Grid Layout */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="gallery-grid-item relative group cursor-pointer overflow-hidden rounded-lg bg-card ring-1 ring-border shadow-soft hover:shadow-lg transition-all duration-300"
              onClick={() => openModal(index)}
              whileHover={{ scale: 1.02 }}
            >
               <div className="aspect-square relative">
                 <LoadingImage
                   src={photo.src}
                   alt={photo.alt}
                   className="gallery-grid-image w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                   delay={index * 50}
                 />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-medium text-sm mb-1">{photo.title}</h4>
                    {photo.description && (
                      <p className="text-white/80 text-xs line-clamp-2">{photo.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid Footer */}
        <div className="text-center mt-8">
          <span className="text-muted">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'} in collection
          </span>
        </div>
      </motion.div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={hasNext ? goToNext : undefined}
        onPrev={hasPrev ? goToPrev : undefined}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </>
  );
};

export default Gallery;
