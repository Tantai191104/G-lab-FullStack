import { useState, useEffect } from 'react';

export const useAdPopup = (showImmediately: boolean = true) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastShown, setLastShown] = useState<number | null>(null);

  useEffect(() => {
    if (showImmediately) {
      // Check if enough time has passed since last shown (3 minutes = 180000ms)
      const now = Date.now();
      const timeSinceLastShown = lastShown ? now - lastShown : Infinity;
      const threeMinutes = 3 * 60 * 1000; // 3 minutes in milliseconds
      
      if (timeSinceLastShown >= threeMinutes) {
        // Show popup
        setIsOpen(true);
        setLastShown(now);
      }
    }
  }, [showImmediately, lastShown]);

  const openPopup = () => {
    setIsOpen(true);
    setLastShown(Date.now());
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const resetPopup = () => {
    setLastShown(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    openPopup,
    closePopup,
    resetPopup,
    hasShown: lastShown !== null
  };
};
