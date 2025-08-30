import { useState, useEffect } from 'react';

/**
 * Custom hook to ensure a minimum loading time for better UX with skeleton screens
 * This prevents flickering when components load too quickly
 */
export const useMinimumLoadingTime = (
  isLoading: boolean,
  minimumTime: number = 800
) => {
  const [showLoading, setShowLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      // Ensure minimum loading time has passed
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, minimumTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minimumTime]);

  return showLoading;
};
