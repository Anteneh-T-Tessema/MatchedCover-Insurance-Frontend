/**
 * Enhanced Environment Configuration Utility
 * Provides secure environment variable handling with validation and type safety
 * 
 * @version 1.0.0
 * @author SOC 2 & GRC Platform Team
 * @since 2025-06-20
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Environment variable configuration with validation
 */
export interface EnvironmentConfig {
  /** Google Gemini AI API Key */
  GEMINI_API_KEY: string;
  /** Gemini AI Model to use */
  GEMINI_MODEL: string;
  /** Environment type (development, staging, production) */
  NODE_ENV: 'development' | 'staging' | 'production';
  /** Application port number */
  PORT: number;
  /** Database connection string (if applicable) */
  DATABASE_URL?: string;
  /** Redis connection string (if applicable) */
  REDIS_URL?: string;
  /** Log level for application */
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Validation rules for environment variables
 */
interface ValidationRule {
  /** Field name */
  field: keyof EnvironmentConfig;
  /** Whether the field is required */
  required: boolean;
  /** Validation function */
  validator?: (value: string) => boolean;
  /** Error message for validation failure */
  errorMessage?: string;
}

/**
 * Environment variable validation rules
 */
const validationRules: ValidationRule[] = [
  {
    field: 'GEMINI_API_KEY',
    required: true,
    validator: (value: string): boolean => value.length > 10,
    errorMessage: 'GEMINI_API_KEY must be a valid API key with more than 10 characters'
  },
  {
    field: 'GEMINI_MODEL',
    required: true,
    validator: (value: string): boolean => ['gemini-2.0-flash-exp', 'gemini-pro', 'gemini-pro-vision'].includes(value),
    errorMessage: 'GEMINI_MODEL must be a valid Gemini model name'
  },
  {
    field: 'NODE_ENV',
    required: true,
    validator: (value: string): boolean => ['development', 'staging', 'production'].includes(value),
    errorMessage: 'NODE_ENV must be development, staging, or production'
  },
  {
    field: 'PORT',
    required: false,
    validator: (value: string): boolean => {
      const port = parseInt(value, 10);
      return !isNaN(port) && port > 0 && port < 65536;
    },
    errorMessage: 'PORT must be a valid port number between 1 and 65535'
  },
  {
    field: 'LOG_LEVEL',
    required: true,
    validator: (value: string): boolean => ['debug', 'info', 'warn', 'error'].includes(value),
    errorMessage: 'LOG_LEVEL must be debug, info, warn, or error'
  }
];

/**
 * Environment validation error
 */
export class EnvironmentValidationError extends Error {
  /**
   * Creates a new environment validation error
   * @param message - Error message
   * @param field - Field that failed validation
   */
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'EnvironmentValidationError';
  }
}

/**
 * Enhanced Environment Variable Manager
 * Provides secure, validated access to environment variables
 */
export class EnhancedEnvironmentManager {
  private static instance: EnhancedEnvironmentManager;
  private config: Partial<EnvironmentConfig> = {};
  private isLoaded = false;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Initialize with default values
    this.config = {
      NODE_ENV: 'development',
      PORT: 3000,
      LOG_LEVEL: 'info',
      GEMINI_MODEL: 'gemini-2.0-flash-exp'
    };
  }

  /**
   * Gets the singleton instance
   * @returns Environment manager instance
   */
  public static getInstance(): EnhancedEnvironmentManager {
    if (!EnhancedEnvironmentManager.instance) {
      EnhancedEnvironmentManager.instance = new EnhancedEnvironmentManager();
    }
    return EnhancedEnvironmentManager.instance;
  }

  /**
   * Loads environment variables from multiple sources with validation
   * @param envFilePath - Optional path to .env file
   * @throws EnvironmentValidationError - If validation fails
   */
  public async loadEnvironment(envFilePath?: string): Promise<void> {
    try {
      // Load from .env file if specified and exists
      if (envFilePath && fs.existsSync(envFilePath)) {
        await this.loadFromFile(envFilePath);
      }

      // Load from default .env files
      const defaultEnvFiles = ['.env.soc2-agents', '.env.local', '.env'];
      for (const envFile of defaultEnvFiles) {
        const fullPath = path.join(process.cwd(), envFile);
        if (fs.existsSync(fullPath)) {
          await this.loadFromFile(fullPath);
          break; // Use first found file
        }
      }

      // Load from process.env (takes precedence)
      this.loadFromProcessEnv();

      // Validate all required fields
      await this.validateEnvironment();

      this.isLoaded = true;
    } catch (error) {
      if (error instanceof EnvironmentValidationError) {
        throw error;
      }
      throw new EnvironmentValidationError(
        `Failed to load environment: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Loads environment variables from a file
   * @param filePath - Path to the environment file
   */
  private async loadFromFile(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (const line of lines) {
        const trimmedLine = line.trim();
        // Skip comments and empty lines
        if (!trimmedLine || trimmedLine.startsWith('#')) {
          continue;
        }

        const equalIndex = trimmedLine.indexOf('=');
        if (equalIndex > 0) {
          const key = trimmedLine.substring(0, equalIndex).trim();
          let value = trimmedLine.substring(equalIndex + 1).trim();

          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }

          // Only set if not already set by process.env
          if (!process.env[key]) {
            (this.config as Record<string, unknown>)[key] = this.parseValue(key, value);
          }
        }
      }
    } catch (error) {
      throw new EnvironmentValidationError(
        `Failed to load environment file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Loads environment variables from process.env
   */
  private loadFromProcessEnv(): void {
    for (const key of Object.keys(process.env)) {
      const value = process.env[key];
      if (value !== undefined) {
        (this.config as Record<string, unknown>)[key] = this.parseValue(key, value);
      }
    }
  }

  /**
   * Parses and converts environment variable values to appropriate types
   * @param key - Environment variable key
   * @param value - Environment variable value
   * @returns Parsed value
   */
  private parseValue(key: string, value: string): unknown {
    // Handle boolean values
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;

    // Handle numeric values
    if (key === 'PORT') {
      const numValue = parseInt(value, 10);
      return !isNaN(numValue) ? numValue : value;
    }

    // Return as string for most cases
    return value;
  }

  /**
   * Validates the loaded environment configuration
   * @throws EnvironmentValidationError - If validation fails
   */
  private async validateEnvironment(): Promise<void> {
    const errors: string[] = [];

    for (const rule of validationRules) {
      const value = this.config[rule.field];

      // Check required fields
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${rule.field} is required but not set`);
        continue;
      }

      // Run validator if value exists and validator is defined
      if (value !== undefined && value !== null && rule.validator) {
        const stringValue = String(value);
        if (!rule.validator(stringValue)) {
          errors.push(rule.errorMessage || `${rule.field} failed validation`);
        }
      }
    }

    if (errors.length > 0) {
      throw new EnvironmentValidationError(`Environment validation failed: ${errors.join(', ')}`);
    }
  }

  /**
   * Gets a validated environment variable
   * @param key - Environment variable key
   * @param defaultValue - Default value if not set
   * @returns Environment variable value
   * @throws EnvironmentValidationError - If environment not loaded or key not found
   */
  public get<T = string>(key: keyof EnvironmentConfig, defaultValue?: T): T {
    if (!this.isLoaded) {
      throw new EnvironmentValidationError('Environment not loaded. Call loadEnvironment() first.');
    }

    const value = this.config[key];
    if (value === undefined || value === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new EnvironmentValidationError(`Environment variable ${key} not found and no default provided`);
    }

    return value as T;
  }

  /**
   * Gets all environment configuration
   * @returns Complete environment configuration
   */
  public getAll(): Readonly<Partial<EnvironmentConfig>> {
    if (!this.isLoaded) {
      throw new EnvironmentValidationError('Environment not loaded. Call loadEnvironment() first.');
    }
    return { ...this.config } as Readonly<Partial<EnvironmentConfig>>;
  }

  /**
   * Checks if the environment is loaded
   * @returns True if environment is loaded
   */
  public isEnvironmentLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Resets the environment manager (useful for testing)
   */
  public reset(): void {
    this.config = {
      NODE_ENV: 'development',
      PORT: 3000,
      LOG_LEVEL: 'info',
      GEMINI_MODEL: 'gemini-2.0-flash-exp'
    };
    this.isLoaded = false;
  }

  /**
   * Validates a specific environment variable
   * @param key - Environment variable key
   * @param value - Value to validate
   * @returns Validation result
   */
  public validateField(key: keyof EnvironmentConfig, value: string): { isValid: boolean; error?: string } {
    const rule = validationRules.find(r => r.field === key);
    if (!rule) {
      return { isValid: true };
    }

    if (rule.required && (!value || value.trim() === '')) {
      return { isValid: false, error: `${key} is required` };
    }

    if (rule.validator && !rule.validator(value)) {
      return { isValid: false, error: rule.errorMessage || `${key} failed validation` };
    }

    return { isValid: true };
  }
}

/**
 * Default export for convenience
 */
export default EnhancedEnvironmentManager;

/**
 * Global instance for easy access
 */
export const environmentManager = EnhancedEnvironmentManager.getInstance();
