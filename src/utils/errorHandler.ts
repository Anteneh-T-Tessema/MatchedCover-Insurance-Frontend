/**
 * Comprehensive Error Handling Utility
 * Provides centralized error handling for the SOC 2 & GRC platform
 */

export interface ErrorContext {
  operation: string;
  agent?: string;
  phase?: string;
  metadata?: Record<string, unknown>;
}

export interface ErrorResult {
  success: false;
  error: Error;
  context: ErrorContext;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
}

export interface SuccessResult<T = unknown> {
  success: true;
  data: T;
  timestamp: string;
}

export type Result<T = unknown> = SuccessResult<T> | ErrorResult;

/**
 * Custom error classes for different error types
 */
export class ValidationError extends Error {
  constructor(message: string, public validationId: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ComplianceError extends Error {
  constructor(message: string, public framework: string, public control?: string) {
    super(message);
    this.name = 'ComplianceError';
  }
}

export class IntegrationError extends Error {
  constructor(message: string, public service: string) {
    super(message);
    this.name = 'IntegrationError';
  }
}

export class ConfigurationError extends Error {
  constructor(message: string, public configKey: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

/**
 * Error Handler Class
 */
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorResult[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Handle errors with context and return structured result
   */
  handleError(error: Error | unknown, context: ErrorContext): ErrorResult {
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    
    const result: ErrorResult = {
      success: false,
      error: normalizedError,
      context,
      timestamp: new Date().toISOString(),
      severity: this.determineSeverity(normalizedError, context),
      recoverable: this.isRecoverable(normalizedError)
    };

    // Log the error
    this.errorLog.push(result);
    
    // Console logging based on severity
    this.logError(result);

    return result;
  }

  /**
   * Create success result
   */
  success<T>(data: T): SuccessResult<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Safe execution wrapper
   */
  async safeExecute<T>(
    operation: () => Promise<T>,
    context: ErrorContext
  ): Promise<Result<T>> {
    try {
      const data = await operation();
      return this.success(data);
    } catch (error) {
      return this.handleError(error, context);
    }
  }

  /**
   * Safe execution wrapper for synchronous operations
   */
  safeExecuteSync<T>(
    operation: () => T,
    context: ErrorContext
  ): Result<T> {
    try {
      const data = operation();
      return this.success(data);
    } catch (error) {
      return this.handleError(error, context);
    }
  }

  /**
   * Retry operation with exponential backoff
   */
  async retryOperation<T>(
    operation: () => Promise<T>,
    context: ErrorContext,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<Result<T>> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const data = await operation();
        return this.success(data);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxRetries) {
          break;
        }

        // Check if error is recoverable
        if (!this.isRecoverable(lastError)) {
          break;
        }

        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`🔄 Retrying ${context.operation} (attempt ${attempt + 1}/${maxRetries}) after ${delay}ms...`);
      }
    }

    return this.handleError(lastError!, { ...context, operation: `${context.operation} (after ${maxRetries} retries)` });
  }

  /**
   * Determine error severity
   */
  private determineSeverity(error: Error, context: ErrorContext): 'low' | 'medium' | 'high' | 'critical' {
    // Critical errors
    if (error instanceof ConfigurationError && ['GEMINI_API_KEY', 'DATABASE_URL'].includes(error.configKey)) {
      return 'critical';
    }
    
    if (context.operation.includes('compilation') || context.operation.includes('instantiation')) {
      return 'critical';
    }

    // High severity errors
    if (error instanceof ComplianceError) {
      return 'high';
    }

    if (context.operation.includes('validation') || context.operation.includes('security')) {
      return 'high';
    }

    // Medium severity errors
    if (error instanceof IntegrationError) {
      return 'medium';
    }

    if (context.operation.includes('api') || context.operation.includes('network')) {
      return 'medium';
    }

    // Default to low severity
    return 'low';
  }

  /**
   * Determine if error is recoverable
   */
  private isRecoverable(error: Error): boolean {
    // Configuration errors are usually not recoverable without manual intervention
    if (error instanceof ConfigurationError) {
      return false;
    }

    // Validation errors are usually not recoverable
    if (error instanceof ValidationError) {
      return false;
    }

    // Network/API errors are usually recoverable
    if (error.message.includes('timeout') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
      return true;
    }

    // Rate limiting errors are recoverable
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return true;
    }

    // Default to not recoverable
    return false;
  }

  /**
   * Log error to console with appropriate formatting
   */
  private logError(result: ErrorResult): void {
    const { error, context, severity, recoverable } = result;
    
    const emoji = {
      'critical': '🔴',
      'high': '🟠',
      'medium': '🟡',
      'low': '🔵'
    }[severity];

    const recoverableText = recoverable ? '(Recoverable)' : '(Not Recoverable)';
    
    console.error(`${emoji} [${severity.toUpperCase()}] ${context.operation} failed ${recoverableText}`);
    
    if (context.agent) {
      console.error(`   Agent: ${context.agent}`);
    }
    
    if (context.phase) {
      console.error(`   Phase: ${context.phase}`);
    }
    
    console.error(`   Error: ${error.message}`);
    
    if (context.metadata) {
      console.error(`   Metadata:`, context.metadata);
    }

    // Stack trace for critical and high severity errors
    if (severity === 'critical' || severity === 'high') {
      console.error(`   Stack: ${error.stack}`);
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    bySeverity: Record<string, number>;
    byAgent: Record<string, number>;
    recent: ErrorResult[];
  } {
    const bySeverity = this.errorLog.reduce((acc, err) => {
      acc[err.severity] = (acc[err.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byAgent = this.errorLog.reduce((acc, err) => {
      const agent = err.context.agent || 'unknown';
      acc[agent] = (acc[agent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errorLog.length,
      bySeverity,
      byAgent,
      recent: this.errorLog.slice(-10) // Last 10 errors
    };
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Export error log for analysis
   */
  exportErrorLog(): ErrorResult[] {
    return [...this.errorLog];
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions for common error patterns
export function createValidationError(validationId: string, message: string): ValidationError {
  return new ValidationError(message, validationId);
}

export function createComplianceError(framework: string, message: string, control?: string): ComplianceError {
  return new ComplianceError(message, framework, control);
}

export function createIntegrationError(service: string, message: string): IntegrationError {
  return new IntegrationError(message, service);
}

export function createConfigurationError(configKey: string, message: string): ConfigurationError {
  return new ConfigurationError(message, configKey);
}

// Type guards for error types
export function isValidationError(error: Error): error is ValidationError {
  return error instanceof ValidationError;
}

export function isComplianceError(error: Error): error is ComplianceError {
  return error instanceof ComplianceError;
}

export function isIntegrationError(error: Error): error is IntegrationError {
  return error instanceof IntegrationError;
}

export function isConfigurationError(error: Error): error is ConfigurationError {
  return error instanceof ConfigurationError;
}
