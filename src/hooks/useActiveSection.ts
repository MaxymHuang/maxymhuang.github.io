import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'journey', 'projects', 'gallery', 'connect'];
    
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 120; // Offset for navbar + some padding
      
      // Find the section that's currently in view
      let currentSection = sections[0]; // Default to first section
      let minDistance = Infinity;
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Check if section is in viewport
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isInView) {
            // Calculate distance from scroll position to section top
            const distance = Math.abs(scrollPosition - elementTop);
            
            // Prefer sections that are closer to the top of viewport
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = sectionId;
            }
          } else if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            // If scroll position is within this section's bounds
            currentSection = sectionId;
          }
        }
      });
      
      // If we're past all sections, use the last one
      const lastSection = sections[sections.length - 1];
      const lastElement = document.getElementById(lastSection);
      if (lastElement) {
        const lastElementBottom = lastElement.getBoundingClientRect().bottom + window.scrollY;
        if (scrollPosition >= lastElementBottom - 200) {
          currentSection = lastSection;
        }
      }
      
      setActiveSection(currentSection);
    };

    // Initial check
    updateActiveSection();

    // Update on scroll with throttling for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return activeSection;
};