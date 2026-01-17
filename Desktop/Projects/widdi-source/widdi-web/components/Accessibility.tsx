'use client';

import { useEffect } from 'react';

export default function Accessibility() {
  useEffect(() => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg';
    skipLink.id = 'skip-to-content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation enhancement
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    };

    const handleMouseDownOnce = () => {
      document.body.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
    };

    window.addEventListener('keydown', handleFirstTab);

    // Focus visible polyfill for older browsers
    const addFocusVisibleClass = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && document.body.classList.contains('user-is-tabbing')) {
        target.classList.add('focus-visible');
      }
    };

    const removeFocusVisibleClass = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.classList.remove('focus-visible');
      }
    };

    document.addEventListener('focus', addFocusVisibleClass, true);
    document.addEventListener('blur', removeFocusVisibleClass, true);

    // Announce dynamic content changes to screen readers
    const createAriaLiveRegion = () => {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'aria-live-region';
      document.body.appendChild(liveRegion);
    };

    createAriaLiveRegion();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = () => {
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-motion');
        console.log('Reduced motion enabled');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    // Check for contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    const handleHighContrast = () => {
      if (prefersHighContrast.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };

    handleHighContrast();
    prefersHighContrast.addEventListener('change', handleHighContrast);

    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDownOnce);
      document.removeEventListener('focus', addFocusVisibleClass, true);
      document.removeEventListener('blur', removeFocusVisibleClass, true);
      prefersReducedMotion.removeEventListener('change', handleReducedMotion);
      prefersHighContrast.removeEventListener('change', handleHighContrast);
    };
  }, []);

  return null;
}

// Utility function to announce messages to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.getElementById('aria-live-region');
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};
