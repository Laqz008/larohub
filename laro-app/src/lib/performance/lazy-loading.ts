// Performance monitoring and optimization utilities for lazy loading
import React from 'react';

interface LazyLoadMetrics {
  componentName: string;
  loadTime: number;
  bundleSize?: number;
  timestamp: number;
  userAgent: string;
  connectionType?: string;
}

interface PerformanceConfig {
  enableTracking: boolean;
  enableAnalytics: boolean;
  maxRetries: number;
  retryDelay: number;
  preloadThreshold: number; // Distance in pixels to start preloading
}

class LazyLoadingPerformanceMonitor {
  private metrics: LazyLoadMetrics[] = [];
  private config: PerformanceConfig;
  private preloadQueue: Set<string> = new Set();

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableTracking: process.env.NODE_ENV === 'development',
      enableAnalytics: process.env.NODE_ENV === 'production',
      maxRetries: 3,
      retryDelay: 1000,
      preloadThreshold: 100,
      ...config
    };
  }

  // Track lazy loading performance
  trackLazyLoad(componentName: string, startTime: number, endTime?: number): void {
    if (!this.config.enableTracking) return;

    const loadTime = endTime ? endTime - startTime : performance.now() - startTime;

    const metric: LazyLoadMetrics = {
      componentName,
      loadTime,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      connectionType: this.getConnectionType()
    };

    this.metrics.push(metric);

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🏀 LaroHub Lazy Load: ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
    }

    // Send to analytics in production
    if (this.config.enableAnalytics && typeof window !== 'undefined') {
      this.sendAnalytics(metric);
    }
  }

  // Get connection type for performance context
  private getConnectionType(): string {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType || connection?.type || 'unknown';
    }
    return 'unknown';
  }

  // Send metrics to analytics (placeholder for real implementation)
  private sendAnalytics(metric: LazyLoadMetrics): void {
    // In a real app, you would send this to your analytics service
    // Example: Google Analytics, Mixpanel, or custom analytics

    if (typeof gtag !== 'undefined') {
      gtag('event', 'lazy_load_performance', {
        component_name: metric.componentName,
        load_time: metric.loadTime,
        connection_type: metric.connectionType,
        custom_parameter: 'larohub_performance'
      });
    }

    // Example: Custom analytics endpoint
    // fetch('/api/analytics/lazy-loading', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric)
    // });
  }

  // Get performance summary
  getPerformanceSummary(): {
    totalComponents: number;
    averageLoadTime: number;
    slowestComponent: LazyLoadMetrics | null;
    fastestComponent: LazyLoadMetrics | null;
    componentBreakdown: Record<string, { count: number; avgTime: number }>;
  } {
    if (this.metrics.length === 0) {
      return {
        totalComponents: 0,
        averageLoadTime: 0,
        slowestComponent: null,
        fastestComponent: null,
        componentBreakdown: {}
      };
    }

    const totalLoadTime = this.metrics.reduce((sum, metric) => sum + metric.loadTime, 0);
    const averageLoadTime = totalLoadTime / this.metrics.length;

    const sortedMetrics = [...this.metrics].sort((a, b) => a.loadTime - b.loadTime);
    const fastestComponent = sortedMetrics[0];
    const slowestComponent = sortedMetrics[sortedMetrics.length - 1];

    // Component breakdown
    const componentBreakdown: Record<string, { count: number; avgTime: number }> = {};
    this.metrics.forEach(metric => {
      if (!componentBreakdown[metric.componentName]) {
        componentBreakdown[metric.componentName] = { count: 0, avgTime: 0 };
      }
      componentBreakdown[metric.componentName].count++;
    });

    // Calculate average times
    Object.keys(componentBreakdown).forEach(componentName => {
      const componentMetrics = this.metrics.filter(m => m.componentName === componentName);
      const totalTime = componentMetrics.reduce((sum, m) => sum + m.loadTime, 0);
      componentBreakdown[componentName].avgTime = totalTime / componentMetrics.length;
    });

    return {
      totalComponents: this.metrics.length,
      averageLoadTime,
      slowestComponent,
      fastestComponent,
      componentBreakdown
    };
  }

  // Preload components based on user behavior
  preloadComponent(importFunction: () => Promise<any>, componentName: string): void {
    if (this.preloadQueue.has(componentName)) return;

    this.preloadQueue.add(componentName);

    // Use requestIdleCallback for better performance
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        this.executePreload(importFunction, componentName);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.executePreload(importFunction, componentName);
      }, 100);
    }
  }

  private async executePreload(importFunction: () => Promise<any>, componentName: string): Promise<void> {
    try {
      const startTime = performance.now();
      await importFunction();
      const endTime = performance.now();

      this.trackLazyLoad(`${componentName}_preload`, startTime, endTime);
    } catch (error) {
      console.warn(`Failed to preload ${componentName}:`, error);
    }
  }

  // Clear metrics (useful for testing or memory management)
  clearMetrics(): void {
    this.metrics = [];
    this.preloadQueue.clear();
  }
}

// Create singleton instance
export const lazyLoadMonitor = new LazyLoadingPerformanceMonitor();

// Higher-order component for tracking lazy loading
export function withLazyLoadTracking<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  componentName: string
): React.ComponentType<T> {
  function TrackedComponent(props: T) {
    React.useEffect(() => {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        lazyLoadMonitor.trackLazyLoad(componentName, startTime, endTime);
      };
    }, []);

    return React.createElement(WrappedComponent, props);
  }

  // Set display name for debugging
  TrackedComponent.displayName = `withLazyLoadTracking(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return TrackedComponent;
}

// Hook for tracking component load times
export function useLazyLoadTracking(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      lazyLoadMonitor.trackLazyLoad(componentName, startTime, endTime);
    };
  }, [componentName]);
}

// Utility for preloading on hover/focus
export function usePreloadOnHover(
  importFunction: () => Promise<any>,
  componentName: string
) {
  const preload = React.useCallback(() => {
    lazyLoadMonitor.preloadComponent(importFunction, componentName);
  }, [importFunction, componentName]);

  return {
    onMouseEnter: preload,
    onFocus: preload
  };
}

// Basketball-specific performance thresholds
export const BASKETBALL_PERFORMANCE_THRESHOLDS = {
  COURT_MAP: 2000, // 2 seconds for court map loading
  PLAYER_STATS: 1500, // 1.5 seconds for player stats
  GAME_CHAT: 1000, // 1 second for game chat
  FORMS: 800, // 800ms for forms
  IMAGES: 500 // 500ms for images
} as const;

// Performance grade calculator
export function getPerformanceGrade(loadTime: number, threshold: number): {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  message: string;
} {
  const ratio = loadTime / threshold;

  if (ratio <= 0.5) {
    return { grade: 'A', color: 'text-court-400', message: 'Excellent performance! 🏀' };
  } else if (ratio <= 0.75) {
    return { grade: 'B', color: 'text-primary-400', message: 'Good performance! 👍' };
  } else if (ratio <= 1.0) {
    return { grade: 'C', color: 'text-yellow-400', message: 'Average performance' };
  } else if (ratio <= 1.5) {
    return { grade: 'D', color: 'text-orange-400', message: 'Below average performance' };
  } else {
    return { grade: 'F', color: 'text-red-400', message: 'Poor performance - needs optimization' };
  }
}

// Export types for external use
export type { LazyLoadMetrics, PerformanceConfig };
