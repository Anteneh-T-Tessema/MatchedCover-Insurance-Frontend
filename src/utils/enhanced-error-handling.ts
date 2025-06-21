/**
 * Enhanced Error Handling Utility
 * Provides comprehensive error handling, logging, and recovery mechanisms
 * 
 * @version 2.0.0
 * @author MatchedCover Platform Team
 */

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * Error categories for classification
 */
export enum ErrorCategory {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NETWORK = 'network',
  DATABASE = 'database',
  SYSTEM = 'system',
  SECURITY = 'security',
  COMPLIANCE = 'compliance'
}

/**
 * Error context interface
 */
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  component?: string;
  method?: string;
}

/**
 * Enhanced Error Handler
 */
export class EnhancedErrorHandler {
  private static instance: EnhancedErrorHandler;

  public static getInstance(): EnhancedErrorHandler {
    if (!EnhancedErrorHandler.instance) {
      EnhancedErrorHandler.instance = new EnhancedErrorHandler();
    }
    return EnhancedErrorHandler.instance;
  }

  /**
   * Handle error with comprehensive logging and classification
   */
  public handleError(error: Error, context?: ErrorContext): Error {
    const enhancedError = new Error(error.message);
    enhancedError.name = error.name;
    enhancedError.stack = error.stack;

    // Log error with context
    console.error('Error handled:', {
      message: error.message,
      context: context || {},
      timestamp: new Date().toISOString()
    });

    return enhancedError;
  }

  /**
   * Create a standardized error
   */
  public createError(
    message: string,
    category: ErrorCategory,
    severity: ErrorSeverity,
    context?: ErrorContext
  ): Error {
    const error = new Error(message);
    error.name = `${category.toUpperCase()}_ERROR`;
    
    console.error('Error created:', {
      message,
      category,
      severity,
      context: context || {},
      timestamp: new Date().toISOString()
    });

    return error;
  }
}

export default EnhancedErrorHandler;
