/**
 * Enhanced Input Validation Utility
 * Provides comprehensive input validation and sanitization for SOC 2 compliance
 * Implements security best practices and data integrity controls
 * 
 * @fileoverview Advanced input validation with security controls
 * @version 2.0.0
 * @author MatchedCover Platform Team
 * @since 2025-06-20
 */

import { ValidationResult, ValidationError } from '../types/central-types';

/**
 * Custom validation rule interface for enhanced validation
 */
export interface CustomValidationRule {
  /** Rule name */
  name: string;
  /** Validation function */
  validator: (value: unknown) => boolean;
  /** Error message */
  message: string;
  /** Whether this rule is required */
  required?: boolean;
}

/**
 * Input validation result interface
 */
export interface InputValidationResult {
  /** Whether the input is valid */
  isValid: boolean;
  /** Error message if validation failed */
  error?: string;
  /** Sanitized value */
  sanitizedValue?: unknown;
  /** Additional validation details */
  details?: Record<string, unknown>;
}

/**
 * Input sanitization options interface
 * Defines how input data should be cleaned and normalized
 */
export interface SanitizationOptions {
  /** Trim leading and trailing whitespace */
  trim?: boolean;
  /** Remove HTML tags for security */
  stripHtml?: boolean;
  /** Escape HTML entities to prevent XSS */
  escapeHtml?: boolean;
  /** Convert to lowercase for consistency */
  toLowerCase?: boolean;
  /** Remove special characters except allowed ones */
  removeSpecialChars?: boolean;
  /** Allowed special characters */
  allowedSpecialChars?: string[];
  /** Maximum length for strings */
  maxLength?: number;
  /** Normalize Unicode characters */
  normalizeUnicode?: boolean;
}

/**
 * Field validation configuration interface
 * Comprehensive validation rules for form fields
 */
export interface FieldValidationConfig {
  /** Field name/identifier */
  fieldName: string;
  /** Data type expected */
  dataType: 'string' | 'number' | 'email' | 'phone' | 'url' | 'date' | 'boolean' | 'array' | 'object';
  /** Whether field is required */
  required: boolean;
  /** Minimum value/length */
  min?: number;
  /** Maximum value/length */
  max?: number;
  /** Regular expression pattern */
  pattern?: RegExp;
  /** Custom validation function */
  customValidator?: (value: unknown) => boolean | Promise<boolean>;
  /** Error message for validation failure */
  errorMessage?: string;
  /** Sanitization options */
  sanitization?: SanitizationOptions;
  /** Allowed values (enum validation) */
  allowedValues?: unknown[];
  /** Nested field validation (for objects) */
  nestedFields?: FieldValidationConfig[];
}

/**
 * Validation context interface
 * Provides additional context for validation operations
 */
export interface ValidationContext {
  /** Request ID for tracing */
  requestId?: string;
  /** User ID performing the action */
  userId?: string;
  /** Session ID */
  sessionId?: string;
  /** IP address for rate limiting */
  ipAddress?: string;
  /** User agent for security analysis */
  userAgent?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Enhanced Input Validator Class
 * Provides comprehensive input validation and sanitization
 * Implements security controls for SOC 2 compliance
 */
export class EnhancedInputValidator {
  private static instance: EnhancedInputValidator;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {}

  /**
   * Gets the singleton instance
   * @returns Input validator instance
   */
  public static getInstance(): EnhancedInputValidator {
    if (!EnhancedInputValidator.instance) {
      EnhancedInputValidator.instance = new EnhancedInputValidator();
    }
    return EnhancedInputValidator.instance;
  }

  /**
   * Validates and sanitizes input
   * @param input - Input value to validate
   * @param rules - Validation rules to apply
   * @param sanitizationOptions - Sanitization options
   * @returns Validation result
   */
  public validateInput(
    input: unknown,
    rules: CustomValidationRule[],
    sanitizationOptions?: SanitizationOptions
  ): InputValidationResult {
    try {
      // First sanitize the input
      const sanitizedValue = this.sanitizeInput(input, sanitizationOptions);

      // Then validate against rules
      for (const rule of rules) {
        if (!rule.validator(sanitizedValue)) {
          return {
            isValid: false,
            error: rule.message,
            sanitizedValue,
            details: { failedRule: rule.name }
          };
        }
      }

      return {
        isValid: true,
        sanitizedValue,
        details: { appliedRules: rules.map(r => r.name) }
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sanitizedValue: input
      };
    }
  }

  /**
   * Sanitizes input based on options
   * @param input - Input to sanitize
   * @param options - Sanitization options
   * @returns Sanitized input
   */
  public sanitizeInput(input: unknown, options?: SanitizationOptions): unknown {
    if (input === null || input === undefined) {
      return input;
    }

    let value = String(input);

    if (options?.trim) {
      value = value.trim();
    }

    if (options?.stripHtml) {
      value = this.stripHtmlTags(value);
    }

    if (options?.escapeHtml) {
      value = this.escapeHtml(value);
    }

    if (options?.toLowerCase) {
      value = value.toLowerCase();
    }

    if (options?.removeSpecialChars) {
      value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    if (options?.maxLength && value.length > options.maxLength) {
      value = value.substring(0, options.maxLength);
    }

    return value;
  }

  /**
   * Validates email address
   * @param email - Email to validate
   * @returns Validation result
   */
  public validateEmail(email: string): InputValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeInput(email, { trim: true, toLowerCase: true }) as string;

    return {
      isValid: emailRegex.test(sanitized),
      error: emailRegex.test(sanitized) ? undefined : 'Invalid email format',
      sanitizedValue: sanitized
    };
  }

  /**
   * Validates URL
   * @param url - URL to validate
   * @returns Validation result
   */
  public validateUrl(url: string): InputValidationResult {
    try {
      const sanitized = this.sanitizeInput(url, { trim: true }) as string;
      const urlObj = new URL(sanitized);
      
      return {
        isValid: ['http:', 'https:'].includes(urlObj.protocol),
        error: ['http:', 'https:'].includes(urlObj.protocol) ? undefined : 'URL must use HTTP or HTTPS protocol',
        sanitizedValue: sanitized
      };
    } catch {
      return {
        isValid: false,
        error: 'Invalid URL format',
        sanitizedValue: url
      };
    }
  }

  /**
   * Validates password strength
   * @param password - Password to validate
   * @returns Validation result
   */
  public validatePassword(password: string): InputValidationResult {
    const rules = [
      { name: 'length', test: (p: string): boolean => p.length >= 8, message: 'Password must be at least 8 characters' },
      { name: 'uppercase', test: (p: string): boolean => /[A-Z]/.test(p), message: 'Password must contain uppercase letter' },
      { name: 'lowercase', test: (p: string): boolean => /[a-z]/.test(p), message: 'Password must contain lowercase letter' },
      { name: 'number', test: (p: string): boolean => /\d/.test(p), message: 'Password must contain number' },
      { name: 'special', test: (p: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(p), message: 'Password must contain special character' }
    ];

    const failedRules = rules.filter(rule => !rule.test(password));

    return {
      isValid: failedRules.length === 0,
      error: failedRules.length > 0 ? failedRules[0].message : undefined,
      sanitizedValue: password, // Don't sanitize passwords
      details: {
        strength: this.calculatePasswordStrength(password),
        failedRules: failedRules.map(r => r.name)
      }
    };
  }

  /**
   * Validates JSON input
   * @param jsonString - JSON string to validate
   * @returns Validation result
   */
  public validateJson(jsonString: string): InputValidationResult {
    try {
      const sanitized = this.sanitizeInput(jsonString, { trim: true }) as string;
      const parsed = JSON.parse(sanitized);
      
      return {
        isValid: true,
        sanitizedValue: parsed,
        details: { type: typeof parsed }
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sanitizedValue: jsonString
      };
    }
  }

  /**
   * Validates SQL input for potential injection attacks
   * @param sqlInput - SQL input to validate
   * @returns Validation result
   */
  public validateSqlInput(sqlInput: string): InputValidationResult {
    const suspiciousPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
      /(--|\*\/|\/\*)/,
      /('|('')|;|%|_)/,
      /(\bOR\b|\bAND\b)/i,
      /(\bUNION\b|\bJOIN\b)/i
    ];

    const sanitized = this.sanitizeInput(sqlInput, { trim: true }) as string;
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(sanitized));

    return {
      isValid: !hasSuspiciousContent,
      error: hasSuspiciousContent ? 'Input contains potentially dangerous SQL patterns' : undefined,
      sanitizedValue: sanitized,
      details: { 
        suspiciousPatterns: suspiciousPatterns.filter(pattern => pattern.test(sanitized)).length 
      }
    };
  }

  /**
   * Validates file path for directory traversal attacks
   * @param filePath - File path to validate
   * @returns Validation result
   */
  public validateFilePath(filePath: string): InputValidationResult {
    const dangerousPatterns = [
      /\.\./,  // Directory traversal
      /[<>:"|?*]/,  // Invalid filename characters
      /^\/|\\$/,  // Absolute paths
      /\0/  // Null bytes
    ];

    const sanitized = this.sanitizeInput(filePath, { trim: true }) as string;
    const hasDangerousContent = dangerousPatterns.some(pattern => pattern.test(sanitized));

    return {
      isValid: !hasDangerousContent && sanitized.length > 0,
      error: hasDangerousContent ? 'File path contains dangerous patterns' : 
             sanitized.length === 0 ? 'File path cannot be empty' : undefined,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validates phone number
   * @param phoneNumber - Phone number to validate
   * @returns Validation result
   */
  public validatePhoneNumber(phoneNumber: string): InputValidationResult {
    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const phoneRegex = /^(\+?1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/;

    return {
      isValid: phoneRegex.test(digitsOnly),
      error: phoneRegex.test(digitsOnly) ? undefined : 'Invalid phone number format',
      sanitizedValue: digitsOnly
    };
  }

  /**
   * Strips HTML tags from input
   * @param input - Input string
   * @returns String without HTML tags
   */
  private stripHtmlTags(input: string): string {
    return input.replace(/<[^>]*>/g, '');
  }

  /**
   * Escapes HTML entities
   * @param input - Input string
   * @returns HTML escaped string
   */
  private escapeHtml(input: string): string {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };

    return input.replace(/[&<>"'/]/g, (match) => htmlEscapes[match] || match);
  }

  /**
   * Calculates password strength
   * @param password - Password to analyze
   * @returns Strength score (0-100)
   */
  private calculatePasswordStrength(password: string): number {
    let score = 0;

    // Length bonus
    score += Math.min(password.length * 4, 25);

    // Character variety bonus
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;

    // Complexity bonus
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 20);

    // Pattern penalty
    if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
    if (/123|abc|qwe/i.test(password)) score -= 10; // Common patterns

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Common validation rules
   */
  public static readonly COMMON_RULES = {
    required: {
      name: 'required',
      validator: (value: unknown): boolean => value !== null && value !== undefined && String(value).trim() !== '',
      message: 'This field is required'
    },
    minLength: (min: number): CustomValidationRule => ({
      name: 'minLength',
      validator: (value): boolean => String(value).length >= min,
      message: `Must be at least ${min} characters long`
    }),
    maxLength: (max: number): CustomValidationRule => ({
      name: 'maxLength',
      validator: (value): boolean => String(value).length <= max,
      message: `Must be no more than ${max} characters long`
    }),
    alphanumeric: {
      name: 'alphanumeric',
      validator: (value: unknown): boolean => /^[a-zA-Z0-9]+$/.test(String(value)),
      message: 'Must contain only letters and numbers'
    },
    noSpecialChars: {
      name: 'noSpecialChars',
      validator: (value: unknown): boolean => /^[a-zA-Z0-9\s]+$/.test(String(value)),
      message: 'Must not contain special characters'
    }
  };
}

/**
 * Default export for convenience
 */
export default EnhancedInputValidator;

/**
 * Global instance for easy access
 */
export const inputValidator = EnhancedInputValidator.getInstance();
