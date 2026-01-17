'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Navigation Timing API
    const measureNavigationTiming = () => {
      if (!window.performance || !window.performance.timing) return;

      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
      const connectTime = timing.responseEnd - timing.requestStart;

      console.log('Performance Metrics:', {
        loadTime: `${loadTime}ms`,
        domReadyTime: `${domReadyTime}ms`,
        connectTime: `${connectTime}ms`,
      });

      // Send to analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: 'load',
          value: loadTime,
          event_category: 'Performance',
        });
      }
    };

    // Resource Timing API
    const measureResourceTiming = () => {
      if (!window.performance || !window.performance.getEntriesByType) return;

      const resources = window.performance.getEntriesByType('resource');
      
      // Group by resource type
      const resourcesByType = resources.reduce((acc: any, resource: any) => {
        const type = resource.initiatorType || 'other';
        if (!acc[type]) acc[type] = [];
        acc[type].push({
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize,
        });
        return acc;
      }, {});

      console.log('Resource Timing:', resourcesByType);

      // Track slow resources
      resources.forEach((resource: any) => {
        if (resource.duration > 1000) {
          console.warn('Slow resource detected:', resource.name, `${resource.duration}ms`);
          
          if ((window as any).gtag) {
            (window as any).gtag('event', 'slow_resource', {
              event_category: 'Performance',
              event_label: resource.name,
              value: Math.round(resource.duration),
            });
          }
        }
      });
    };

    // Memory usage (Chrome only)
    const measureMemoryUsage = () => {
      if ((performance as any).memory) {
        const memory = (performance as any).memory;
        const usedMemoryMB = memory.usedJSHeapSize / 1048576;
        const totalMemoryMB = memory.totalJSHeapSize / 1048576;
        
        console.log('Memory Usage:', {
          used: `${usedMemoryMB.toFixed(2)} MB`,
          total: `${totalMemoryMB.toFixed(2)} MB`,
          percentage: `${((usedMemoryMB / totalMemoryMB) * 100).toFixed(2)}%`,
        });

        // Warn if memory usage is high
        if (usedMemoryMB > 100) {
          console.warn('High memory usage detected');
        }
      }
    };

    // Run measurements after page load
    const timer = setTimeout(() => {
      measureNavigationTiming();
      measureResourceTiming();
      measureMemoryUsage();
    }, 3000);

    // Periodic memory monitoring
    const memoryInterval = setInterval(measureMemoryUsage, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
}
