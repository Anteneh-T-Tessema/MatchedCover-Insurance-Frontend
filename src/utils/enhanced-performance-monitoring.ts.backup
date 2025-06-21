/**
 * Enhanced Performance Monitoring Utility
 * Provides comprehensive performance tracking and optimization for SOC 2 compliance
 * 
 * @version 1.0.0
 * @author SOC 2 & GRC Platform Team
 * @since 2025-06-20
 */

/**
 * Performance metric interface
 */
export interface PerformanceMetric {
  /** Metric name */
  name: string;
  /** Start time in milliseconds */
  startTime: number;
  /** End time in milliseconds */
  endTime?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Memory usage at start */
  memoryStart?: NodeJS.MemoryUsage;
  /** Memory usage at end */
  memoryEnd?: NodeJS.MemoryUsage;
}

/**
 * Performance summary interface
 */
export interface PerformanceSummary {
  /** Total metrics collected */
  totalMetrics: number;
  /** Average duration */
  averageDuration: number;
  /** Minimum duration */
  minDuration: number;
  /** Maximum duration */
  maxDuration: number;
  /** Memory usage statistics */
  memoryStats: {
    averageHeapUsed: number;
    maxHeapUsed: number;
    averageExternal: number;
    maxExternal: number;
  };
  /** Slowest operations */
  slowestOperations: PerformanceMetric[];
}

/**
 * Enhanced Performance Monitor
 * Provides comprehensive performance tracking with memory monitoring
 */
export class EnhancedPerformanceMonitor {
  private static instance: EnhancedPerformanceMonitor;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private completedMetrics: PerformanceMetric[] = [];
  private maxStoredMetrics = 1000;
  private enableMemoryTracking = true;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {}

  /**
   * Gets the singleton instance
   * @returns Performance monitor instance
   */
  public static getInstance(): EnhancedPerformanceMonitor {
    if (!EnhancedPerformanceMonitor.instance) {
      EnhancedPerformanceMonitor.instance = new EnhancedPerformanceMonitor();
    }
    return EnhancedPerformanceMonitor.instance;
  }

  /**
   * Starts timing a performance metric
   * @param name - Metric name
   * @param metadata - Additional metadata
   * @returns Metric ID for stopping the timer
   */
  public startTimer(name: string, metadata?: Record<string, unknown>): string {
    const metricId = `${name}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata,
      memoryStart: this.enableMemoryTracking ? process.memoryUsage() : undefined
    };

    this.metrics.set(metricId, metric);
    return metricId;
  }

  /**
   * Stops timing a performance metric
   * @param metricId - Metric ID returned from startTimer
   * @returns Completed performance metric
   */
  public stopTimer(metricId: string): PerformanceMetric | null {
    const metric = this.metrics.get(metricId);
    if (!metric) {
      console.warn(`Performance metric with ID ${metricId} not found`);
      return null;
    }

    const endTime = performance.now();
    const completedMetric: PerformanceMetric = {
      ...metric,
      endTime,
      duration: endTime - metric.startTime,
      memoryEnd: this.enableMemoryTracking ? process.memoryUsage() : undefined
    };

    // Remove from active metrics
    this.metrics.delete(metricId);

    // Add to completed metrics
    this.completedMetrics.push(completedMetric);

    // Maintain max storage limit
    if (this.completedMetrics.length > this.maxStoredMetrics) {
      this.completedMetrics.shift();
    }

    return completedMetric;
  }

  /**
   * Times the execution of an async function
   * @param name - Metric name
   * @param fn - Function to time
   * @param metadata - Additional metadata
   * @returns Function result and performance metric
   */
  public async timeAsyncFunction<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, unknown>
  ): Promise<{ result: T; metric: PerformanceMetric }> {
    const metricId = this.startTimer(name, metadata);
    
    try {
      const result = await fn();
      const metric = this.stopTimer(metricId);
      
      return {
        result,
        metric: metric || {
          name,
          startTime: 0,
          endTime: 0,
          duration: 0
        }
      };
    } catch (error) {
      // Still stop the timer even if function fails
      this.stopTimer(metricId);
      throw error;
    }
  }

  /**
   * Times the execution of a synchronous function
   * @param name - Metric name
   * @param fn - Function to time
   * @param metadata - Additional metadata
   * @returns Function result and performance metric
   */
  public timeSyncFunction<T>(
    name: string,
    fn: () => T,
    metadata?: Record<string, unknown>
  ): { result: T; metric: PerformanceMetric } {
    const metricId = this.startTimer(name, metadata);
    
    try {
      const result = fn();
      const metric = this.stopTimer(metricId);
      
      return {
        result,
        metric: metric || {
          name,
          startTime: 0,
          endTime: 0,
          duration: 0
        }
      };
    } catch (error) {
      // Still stop the timer even if function fails
      this.stopTimer(metricId);
      throw error;
    }
  }

  /**
   * Gets performance summary for all completed metrics
   * @param filterName - Optional filter by metric name
   * @returns Performance summary
   */
  public getPerformanceSummary(filterName?: string): PerformanceSummary {
    const filteredMetrics = filterName 
      ? this.completedMetrics.filter(m => m.name === filterName)
      : this.completedMetrics;

    if (filteredMetrics.length === 0) {
      return {
        totalMetrics: 0,
        averageDuration: 0,
        minDuration: 0,
        maxDuration: 0,
        memoryStats: {
          averageHeapUsed: 0,
          maxHeapUsed: 0,
          averageExternal: 0,
          maxExternal: 0
        },
        slowestOperations: []
      };
    }

    const durations = filteredMetrics
      .filter(m => m.duration !== undefined)
      .map(m => m.duration!);

    const heapUsages = filteredMetrics
      .filter(m => m.memoryEnd?.heapUsed !== undefined)
      .map(m => m.memoryEnd!.heapUsed);

    const externalUsages = filteredMetrics
      .filter(m => m.memoryEnd?.external !== undefined)
      .map(m => m.memoryEnd!.external);

    return {
      totalMetrics: filteredMetrics.length,
      averageDuration: durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
      minDuration: durations.length > 0 ? Math.min(...durations) : 0,
      maxDuration: durations.length > 0 ? Math.max(...durations) : 0,
      memoryStats: {
        averageHeapUsed: heapUsages.length > 0 ? heapUsages.reduce((a, b) => a + b, 0) / heapUsages.length : 0,
        maxHeapUsed: heapUsages.length > 0 ? Math.max(...heapUsages) : 0,
        averageExternal: externalUsages.length > 0 ? externalUsages.reduce((a, b) => a + b, 0) / externalUsages.length : 0,
        maxExternal: externalUsages.length > 0 ? Math.max(...externalUsages) : 0
      },
      slowestOperations: filteredMetrics
        .filter(m => m.duration !== undefined)
        .sort((a, b) => (b.duration || 0) - (a.duration || 0))
        .slice(0, 10)
    };
  }

  /**
   * Gets all completed metrics
   * @param limit - Maximum number of metrics to return
   * @returns Array of performance metrics
   */
  public getMetrics(limit?: number): PerformanceMetric[] {
    const metrics = [...this.completedMetrics].reverse(); // Most recent first
    return limit ? metrics.slice(0, limit) : metrics;
  }

  /**
   * Gets metrics by name
   * @param name - Metric name to filter by
   * @param limit - Maximum number of metrics to return
   * @returns Array of performance metrics
   */
  public getMetricsByName(name: string, limit?: number): PerformanceMetric[] {
    const filtered = this.completedMetrics
      .filter(m => m.name === name)
      .reverse(); // Most recent first
    
    return limit ? filtered.slice(0, limit) : filtered;
  }

  /**
   * Clears all stored metrics
   */
  public clearMetrics(): void {
    this.completedMetrics.length = 0;
    this.metrics.clear();
  }

  /**
   * Gets current memory usage
   * @returns Current memory usage
   */
  public getCurrentMemoryUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  /**
   * Monitors system performance periodically
   * @param intervalMs - Monitoring interval in milliseconds
   * @param callback - Callback to receive performance data
   * @returns Timer ID for stopping monitoring
   */
  public startSystemMonitoring(
    intervalMs: number = 60000,
    callback?: (memoryUsage: NodeJS.MemoryUsage) => void
  ): NodeJS.Timeout {
    return setInterval(() => {
      const memoryUsage = this.getCurrentMemoryUsage();
      
      // Store as a metric
      this.completedMetrics.push({
        name: 'system_memory_usage',
        startTime: performance.now(),
        endTime: performance.now(),
        duration: 0,
        memoryEnd: memoryUsage,
        metadata: {
          type: 'system_monitoring',
          timestamp: new Date().toISOString()
        }
      });

      // Call callback if provided
      if (callback) {
        callback(memoryUsage);
      }
    }, intervalMs);
  }

  /**
   * Creates a performance decorator for methods
   * @param metricName - Name for the performance metric
   * @returns Method decorator
   */
  public createPerformanceDecorator(metricName?: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      const finalMetricName = metricName || `${target?.constructor?.name || 'Unknown'}.${propertyKey}`;

      descriptor.value = async function(...args: unknown[]) {
        const monitor = EnhancedPerformanceMonitor.getInstance();
        return await monitor.timeAsyncFunction(
          finalMetricName,
          () => originalMethod.apply(this, args),
          { className: target?.constructor?.name, methodName: propertyKey }
        );
      };

      return descriptor;
    };
  }

  /**
   * Gets performance warnings for slow operations
   * @param thresholdMs - Threshold in milliseconds for what's considered slow
   * @returns Array of slow operations
   */
  public getPerformanceWarnings(thresholdMs: number = 1000): PerformanceMetric[] {
    return this.completedMetrics.filter(metric => 
      metric.duration !== undefined && metric.duration > thresholdMs
    );
  }

  /**
   * Generates a performance report
   * @returns Formatted performance report
   */
  public generatePerformanceReport(): string {
    const summary = this.getPerformanceSummary();
    const warnings = this.getPerformanceWarnings();
    
    return `
# Performance Report

## Summary
- **Total Metrics**: ${summary.totalMetrics}
- **Average Duration**: ${summary.averageDuration.toFixed(2)}ms
- **Min Duration**: ${summary.minDuration.toFixed(2)}ms
- **Max Duration**: ${summary.maxDuration.toFixed(2)}ms

## Memory Usage
- **Average Heap Used**: ${(summary.memoryStats.averageHeapUsed / 1024 / 1024).toFixed(2)}MB
- **Max Heap Used**: ${(summary.memoryStats.maxHeapUsed / 1024 / 1024).toFixed(2)}MB
- **Average External**: ${(summary.memoryStats.averageExternal / 1024 / 1024).toFixed(2)}MB
- **Max External**: ${(summary.memoryStats.maxExternal / 1024 / 1024).toFixed(2)}MB

## Performance Warnings
${warnings.length > 0 ? 
  warnings.slice(0, 5).map(w => 
    - **${w.name}**: ${w.duration?.toFixed(2)}ms
  ).join('\n') : 
  'No performance warnings'
}

## Slowest Operations
${summary.slowestOperations.slice(0, 5).map(op => 
  - **${op.name}**: ${op.duration?.toFixed(2)}ms
).join('\n')}

Generated at: ${new Date().toISOString()}
    `.trim();
  }

  /**
   * Configures the performance monitor
   * @param options - Configuration options
   */
  public configure(options: {
    maxStoredMetrics?: number;
    enableMemoryTracking?: boolean;
  }): void {
    if (options.maxStoredMetrics !== undefined) {
      this.maxStoredMetrics = options.maxStoredMetrics;
    }
    if (options.enableMemoryTracking !== undefined) {
      this.enableMemoryTracking = options.enableMemoryTracking;
    }
  }
}

/**
 * Default export for convenience
 */
export default EnhancedPerformanceMonitor;

/**
 * Global instance for easy access
 */
export const performanceMonitor = EnhancedPerformanceMonitor.getInstance();
