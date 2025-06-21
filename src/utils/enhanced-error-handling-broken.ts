/**
 * Enhanced Error Handling Utility
 * Provides comprehensive error handling, logging, and recovery mechanisms for SOC 2 compliance
 * Implements security controls and audit trail requirements
 * 
 * @fileoverview Advanced error handling with security and compliance features
 * @version 2.0.0
 * @author MatchedCover Platform Team
 * @since 2025-06-20
 */

import * as fs from 'fs';
import * as path from 'path';
import { DetailedError } from '../types/central-types';

/**
 * Error severity levels for classification and response
 */
export enum ErrorSeverity {
  /** Low impact errors that don't affect functionality */
  LOW = 'low',
  /** Medium impact errors that may affect some functionality */
  MEDIUM = 'medium',
  /** High impact errors that significantly affect functionality */
  HIGH = 'high',
  /** Critical errors that require immediate attention */
  CRITICAL = 'critical'
}

/**
 * Error categories for systematic classification
 */
export enum ErrorCategory {
  /** Input validation errors */
  VALIDATION = 'validation',
  /** Authentication failures */
  AUTHENTICATION = 'authentication',
  /** Authorization/permission errors */
  AUTHORIZATION = 'authorization',
  /** Network connectivity issues */
  NETWORK = 'network',
  /** Database operation errors */
  DATABASE = 'database',
  /** File system operation errors */
  FILE_SYSTEM = 'file_system',
  /** External API integration errors */
  EXTERNAL_API = 'external_api',
  /** Configuration or setup errors */
  CONFIGURATION = 'configuration',
  /** Business logic rule violations */
  BUSINESS_LOGIC = 'business_logic',
  /** System-level errors */
  SYSTEM = 'system',
  /** Security-related errors */
  SECURITY = 'security',
  /** Compliance violation errors */
  COMPLIANCE = 'compliance',
  /** Rate limiting errors */
  RATE_LIMIT = 'rate_limit',
  /** Data processing errors */
  DATA_PROCESSING = 'data_processing',
  /** Performance-related errors */
  PERFORMANCE = 'performance'
}

/**
 * Error context interface for comprehensive error tracking
 * Provides detailed context for debugging and audit purposes
 */
export interface ErrorContext {
  /** User ID associated with the error */
  userId?: string;
  /** Session ID for tracking user sessions */
  sessionId?: string;
  /** Unique request ID for distributed tracing */
  requestId?: string;
  /** Component or service where error occurred */
  component?: string;
  /** Method or function where error occurred */
  method?: string;
  /** Client IP address */
  ipAddress?: string;
  /** User agent string */
  userAgent?: string;
  /** HTTP method if applicable */
  httpMethod?: string;
  /** Request URL if applicable */
  requestUrl?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Stack trace information */
  stackTrace?: string;
  /** Performance metrics at time of error */
  performanceMetrics?: {
  /** Performance metrics at time of error */
  performanceMetrics?: {
    memoryUsage: number;
    cpuUsage: number;
    responseTime: number;
  };
}

/**
 * Enhanced error class with SOC 2 compliance features
 * Provides comprehensive error information and tracking
 */
export class EnhancedError extends Error {
  public readonly errorId: string;
  public readonly severity: ErrorSeverity;
  public readonly category: ErrorCategory;
  public readonly context: ErrorContext;
  public readonly isRetryable: boolean;
  public readonly sensitiveData: boolean;
  public readonly timestamp: Date;

  /**
   * Creates a new enhanced error
   * @param message - Error message
   * @param category - Error category
   * @param severity - Error severity
   * @param context - Error context
   * @param options - Additional options
   */
  constructor(
    message: string,
    category: ErrorCategory = ErrorCategory.SYSTEM,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context: ErrorContext = {},
    options: {
      isRetryable?: boolean;
      sensitiveData?: boolean;
      cause?: Error;
    } = {}
  ) {
    super(message);
    this.name = 'EnhancedError';
    this.errorId = this.generateErrorId();
    this.category = category;
    this.severity = severity;
    this.context = {
      ...context,
      timestamp: context.timestamp || new Date(),
      stackTrace: context.stackTrace || this.stack
    };
    this.isRetryable = options.isRetryable || false;
    this.sensitiveData = options.sensitiveData || false;
    this.timestamp = new Date();

    // Set the cause if provided (using Object.defineProperty for type safety)
    if (options.cause) {
      Object.defineProperty(this, 'cause', {
        value: options.cause,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }

  /**
   * Generates a unique error ID
   * @returns Unique error identifier
   */
  private generateErrorId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ERR_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Gets a sanitized version of the error for logging
   * @returns Sanitized error object
   */
  public toLogObject(): Record<string, unknown> {
    return {
      errorId: this.errorId,
      message: this.sensitiveData ? '[REDACTED]' : this.message,
      category: this.category,
      severity: this.severity,
      isRetryable: this.isRetryable,
      timestamp: this.timestamp,
      context: this.sanitizeContext()
    };
  }

  /**
   * Sanitizes context to remove sensitive data
   * @returns Sanitized context
   */
  private sanitizeContext(): ErrorContext {
    const sanitized = { ...this.context };
    
    // Remove sensitive fields if this error contains sensitive data
    if (this.sensitiveData) {
      delete sanitized.data;
      delete sanitized.stackTrace;
    }

    return sanitized;
  }
}

/**
 * Error handler configuration
 */
export interface ErrorHandlerConfig {
  /** Enable file logging */
  enableFileLogging: boolean;
  /** Log file path */
  logFilePath: string;
  /** Enable console logging */
  enableConsoleLogging: boolean;
  /** Maximum log file size in MB */
  maxLogSizeMB: number;
  /** Number of log files to keep */
  maxLogFiles: number;
  /** Enable error reporting to external service */
  enableExternalReporting: boolean;
  /** External reporting endpoint */
  externalReportingUrl?: string;
  /** Enable retry mechanism */
  enableRetry: boolean;
  /** Maximum retry attempts */
  maxRetryAttempts: number;
  /** Retry delay in milliseconds */
  retryDelayMs: number;
}

/**
 * Default error handler configuration
 */
const DEFAULT_CONFIG: ErrorHandlerConfig = {
  enableFileLogging: true,
  logFilePath: './logs/errors.log',
  enableConsoleLogging: true,
  maxLogSizeMB: 10,
  maxLogFiles: 5,
  enableExternalReporting: false,
  enableRetry: true,
  maxRetryAttempts: 3,
  retryDelayMs: 1000
};

/**
 * Enhanced Error Handler
 * Provides comprehensive error handling with SOC 2 compliance features
 */
export class EnhancedErrorHandler {
  private static instance: EnhancedErrorHandler;
  private config: ErrorHandlerConfig;
  private errorCounts: Map<string, number> = new Map();
  private lastErrorTimes: Map<string, Date> = new Map();

  /**
   * Private constructor for singleton pattern
   */
  private constructor(config: Partial<ErrorHandlerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeLogging();
  }

  /**
   * Gets the singleton instance
   * @param config - Optional configuration
   * @returns Error handler instance
   */
  public static getInstance(config?: Partial<ErrorHandlerConfig>): EnhancedErrorHandler {
    if (!EnhancedErrorHandler.instance) {
      EnhancedErrorHandler.instance = new EnhancedErrorHandler(config);
    }
    return EnhancedErrorHandler.instance;
  }

  /**
   * Initializes logging infrastructure
   */
  private initializeLogging(): void {
    if (this.config.enableFileLogging) {
      const logDir = path.dirname(this.config.logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }
  }

  /**
   * Handles an error with comprehensive logging and recovery
   * @param error - Error to handle
   * @param context - Additional context
   * @returns Promise that resolves when error handling is complete
   */
  public async handleError(error: Error | EnhancedError, context: ErrorContext = {}): Promise<void> {
    try {
      // Convert to EnhancedError if needed
      const enhancedError = error instanceof EnhancedError 
        ? error 
        : new EnhancedError(
            error.message,
            ErrorCategory.SYSTEM,
            ErrorSeverity.MEDIUM,
            { ...context, stackTrace: error.stack }
          );

      // Update error statistics
      this.updateErrorStatistics(enhancedError);

      // Log the error
      await this.logError(enhancedError);

      // Report to external service if configured
      if (this.config.enableExternalReporting && this.config.externalReportingUrl) {
        await this.reportToExternalService(enhancedError);
      }

      // Handle based on severity
      await this.handleBySeverity(enhancedError);

    } catch (handlingError) {
      // Fallback error handling
      console.error('Error in error handler:', handlingError);
      console.error('Original error:', error);
    }
  }

  /**
   * Executes a function with automatic error handling and retry
   * @param fn - Function to execute
   * @param context - Error context
   * @param retryOptions - Retry configuration
   * @returns Promise with function result
   */
  public async executeWithRetry<T>(
    fn: () => Promise<T>,
    context: ErrorContext = {},
    retryOptions: {
      maxAttempts?: number;
      delayMs?: number;
      shouldRetry?: (error: Error) => boolean;
    } = {}
  ): Promise<T> {
    const maxAttempts = retryOptions.maxAttempts || this.config.maxRetryAttempts;
    const delayMs = retryOptions.delayMs || this.config.retryDelayMs;
    const shouldRetry = retryOptions.shouldRetry || ((error: Error) => {
      return error instanceof EnhancedError ? error.isRetryable : true;
    });

    let lastError: Error;
    let attempt = 1;

    while (attempt <= maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Log the attempt
        await this.handleError(
          new EnhancedError(
            `Attempt ${attempt}/${maxAttempts} failed: ${lastError.message}`,
            ErrorCategory.SYSTEM,
            ErrorSeverity.LOW,
            { ...context, attempt, maxAttempts }
          )
        );

        // Check if we should retry
        if (attempt === maxAttempts || !shouldRetry(lastError)) {
          break;
        }

        // Wait before retry
        await this.delay(delayMs * attempt); // Exponential backoff
        attempt++;
      }
    }

    // All attempts failed
    await this.handleError(
      new EnhancedError(
        `All ${maxAttempts} attempts failed. Last error: ${lastError!.message}`,
        ErrorCategory.SYSTEM,
        ErrorSeverity.HIGH,
        { ...context, totalAttempts: maxAttempts },
        { cause: lastError! }
      )
    );

    throw lastError!;
  }

  /**
   * Wraps a function with automatic error handling
   * @param fn - Function to wrap
   * @param context - Error context
   * @returns Wrapped function
   */
  public wrapWithErrorHandling<T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    context: ErrorContext = {}
  ): (...args: T) => Promise<R> {
    return async (...args: T): Promise<R> => {
      try {
        return await fn(...args);
      } catch (error) {
        await this.handleError(
          error instanceof Error ? error : new Error(String(error)),
          { ...context, functionName: fn.name, arguments: args }
        );
        throw error;
      }
    };
  }

  /**
   * Logs an error
   * @param error - Enhanced error to log
   */
  private async logError(error: EnhancedError): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...error.toLogObject()
    };

    // Console logging
    if (this.config.enableConsoleLogging) {
      const logLevel = this.getLogLevel(error.severity);
      console[logLevel](JSON.stringify(logEntry, null, 2));
    }

    // File logging
    if (this.config.enableFileLogging) {
      await this.writeToLogFile(JSON.stringify(logEntry) + '\n');
    }
  }

  /**
   * Writes to log file with rotation
   * @param content - Content to write
   */
  private async writeToLogFile(content: string): Promise<void> {
    try {
      // Check file size and rotate if needed
      await this.rotateLogFileIfNeeded();
      
      // Append to log file
      fs.appendFileSync(this.config.logFilePath, content);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  /**
   * Rotates log file if it exceeds size limit
   */
  private async rotateLogFileIfNeeded(): Promise<void> {
    try {
      if (!fs.existsSync(this.config.logFilePath)) {
        return;
      }

      const stats = fs.statSync(this.config.logFilePath);
      const sizeMB = stats.size / (1024 * 1024);

      if (sizeMB > this.config.maxLogSizeMB) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = `${this.config.logFilePath}.${timestamp}`;
        
        fs.renameSync(this.config.logFilePath, backupPath);
        
        // Clean up old log files
        await this.cleanupOldLogFiles();
      }
    } catch (error) {
      console.error('Failed to rotate log file:', error);
    }
  }

  /**
   * Cleans up old log files
   */
  private async cleanupOldLogFiles(): Promise<void> {
    try {
      const logDir = path.dirname(this.config.logFilePath);
      const logFileName = path.basename(this.config.logFilePath);
      
      const files = fs.readdirSync(logDir)
        .filter(file => file.startsWith(logFileName) && file !== logFileName)
        .sort()
        .reverse();

      // Keep only the configured number of files
      for (let i = this.config.maxLogFiles; i < files.length; i++) {
        fs.unlinkSync(path.join(logDir, files[i]));
      }
    } catch (error) {
      console.error('Failed to cleanup old log files:', error);
    }
  }

  /**
   * Gets appropriate log level for error severity
   * @param severity - Error severity
   * @returns Log level
   */
  private getLogLevel(severity: ErrorSeverity): 'error' | 'warn' | 'info' | 'log' {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        return 'error';
      case ErrorSeverity.MEDIUM:
        return 'warn';
      case ErrorSeverity.LOW:
        return 'info';
      default:
        return 'log';
    }
  }

  /**
   * Reports error to external service
   * @param error - Enhanced error to report
   */
  private async reportToExternalService(error: EnhancedError): Promise<void> {
    try {
      if (!this.config.externalReportingUrl) {
        return;
      }

      const payload = {
        errorId: error.errorId,
        message: error.sensitiveData ? '[REDACTED]' : error.message,
        category: error.category,
        severity: error.severity,
        timestamp: error.timestamp,
        context: this.sanitizeContextForReporting(error)
      };

      // Implementation would depend on the external service
      // This is a placeholder for the actual implementation
      console.log('Would report to external service:', payload);
    } catch (reportingError) {
      console.error('Failed to report to external service:', reportingError);
    }
  }

  /**
   * Sanitizes context for external reporting
   * @param error - Error to sanitize context for
   * @returns Sanitized context
   */
  private sanitizeContextForReporting(error: EnhancedError): ErrorContext {
    const context = { ...error.context };
    
    // Remove sensitive fields if this error contains sensitive data
    if (error.sensitiveData) {
      delete context.data;
      delete context.stackTrace;
      delete context.arguments;
    }

    return context;
  }

  /**
   * Handles error based on its severity
   * @param error - Enhanced error to handle
   */
  private async handleBySeverity(error: EnhancedError): Promise<void> {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        // Critical errors might require immediate attention
        await this.handleCriticalError(error);
        break;
      case ErrorSeverity.HIGH:
        // High severity errors need prompt attention
        await this.handleHighSeverityError(error);
        break;
      case ErrorSeverity.MEDIUM:
      case ErrorSeverity.LOW:
        // Medium and low severity errors are logged for monitoring
        break;
    }
  }

  /**
   * Handles critical errors
   * @param error - Critical error
   */
  private async handleCriticalError(error: EnhancedError): Promise<void> {
    // Implementation for critical error handling
    // Could include notifications, alerts, etc.
    console.error('CRITICAL ERROR DETECTED:', error.toLogObject());
  }

  /**
   * Handles high severity errors
   * @param error - High severity error
   */
  private async handleHighSeverityError(error: EnhancedError): Promise<void> {
    // Implementation for high severity error handling
    console.warn('HIGH SEVERITY ERROR:', error.toLogObject());
  }

  /**
   * Updates error statistics
   * @param error - Error to track
   */
  private updateErrorStatistics(error: EnhancedError): void {
    const key = `${error.category}_${error.severity}`;
    this.errorCounts.set(key, (this.errorCounts.get(key) || 0) + 1);
    this.lastErrorTimes.set(key, new Date());
  }

  /**
   * Gets error statistics
   * @returns Error statistics
   */
  public getErrorStatistics(): Record<string, { count: number; lastOccurrence: Date }> {
    const stats: Record<string, { count: number; lastOccurrence: Date }> = {};
    
    for (const [key, count] of this.errorCounts.entries()) {
      const lastOccurrence = this.lastErrorTimes.get(key);
      if (lastOccurrence) {
        stats[key] = { count, lastOccurrence };
      }
    }
    
    return stats;
  }

  /**
   * Delays execution
   * @param ms - Milliseconds to delay
   * @returns Promise that resolves after delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Resets error statistics (useful for testing)
   */
  public resetStatistics(): void {
    this.errorCounts.clear();
    this.lastErrorTimes.clear();
  }

  /**
   * Updates configuration
   * @param config - New configuration
   */
  public updateConfig(config: Partial<ErrorHandlerConfig>): void {
    this.config = { ...this.config, ...config };
    this.initializeLogging();
  }
}

/**
 * Default export for convenience
 */
export default EnhancedErrorHandler;

/**
 * Global instance for easy access
 */
export const errorHandler = EnhancedErrorHandler.getInstance();
