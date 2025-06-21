/**
 * Environment Configuration Manager
 * Provides secure and validated environment variable handling
 * 
 * @fileoverview Central environment configuration with validation and defaults
 * @author MatchedCover Platform Team
 * @version 2.0.0
 */

import * as dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.soc2-agents' });

/**
 * Environment variable validation schema
 * Defines required and optional environment variables with defaults
 */
interface EnvironmentSchema {
  /** Node environment */
  NODE_ENV: 'development' | 'production' | 'test';
  /** Application port */
  PORT: number;
  /** Database URL */
  DATABASE_URL: string;
  /** Redis URL for caching */
  REDIS_URL?: string;
  /** JWT secret for authentication */
  JWT_SECRET: string;
  /** Encryption key for sensitive data */
  ENCRYPTION_KEY: string;
  /** API base URL */
  API_BASE_URL: string;
  /** Frontend base URL */
  FRONTEND_BASE_URL: string;
  /** Gemini AI API key */
  GEMINI_API_KEY?: string;
  /** Next.js public Gemini API key */
  NEXT_PUBLIC_GEMINI_API_KEY?: string;
  /** Gemini AI model name */
  GEMINI_MODEL: string;
  /** Next.js public Gemini model */
  NEXT_PUBLIC_GEMINI_MODEL: string;
  /** Logging level */
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  /** Enable debug mode */
  DEBUG_MODE: boolean;
  /** Session secret */
  SESSION_SECRET: string;
  /** Cookie secret */
  COOKIE_SECRET: string;
  /** CORS allowed origins */
  CORS_ORIGINS: string[];
  /** Rate limit requests per minute */
  RATE_LIMIT_RPM: number;
  /** File upload size limit in MB */
  FILE_UPLOAD_LIMIT_MB: number;
  /** Password reset token expiry in minutes */
  PASSWORD_RESET_EXPIRY_MIN: number;
  /** Email verification token expiry in hours */
  EMAIL_VERIFICATION_EXPIRY_HOURS: number;
}

/**
 * Environment configuration class
 * Provides validated and typed access to environment variables
 */
class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private config: EnvironmentSchema;

  /**
   * Private constructor to implement singleton pattern
   */
  private constructor() {
    this.config = this.validateAndLoadConfig();
  }

  /**
   * Get singleton instance of EnvironmentConfig
   * 
   * @returns {EnvironmentConfig} Singleton instance
   */
  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  /**
   * Validate and load environment configuration
   * 
   * @returns {EnvironmentSchema} Validated configuration object
   * @throws {Error} If required environment variables are missing or invalid
   */
  private validateAndLoadConfig(): EnvironmentSchema {
    const errors: string[] = [];

    // Validate NODE_ENV
    const nodeEnv = this.getStringValue('NODE_ENV', 'development');
    if (!['development', 'production', 'test'].includes(nodeEnv)) {
      errors.push('NODE_ENV must be development, production, or test');
    }

    // Validate required string values
    const requiredStrings = [
      'DATABASE_URL',
      'JWT_SECRET',
      'ENCRYPTION_KEY',
      'API_BASE_URL',
      'FRONTEND_BASE_URL',
      'SESSION_SECRET',
      'COOKIE_SECRET'
    ];

    for (const key of requiredStrings) {
      const value = this.getStringValue(key);
      if (!value || value.length < 8) {
        errors.push(`${key} is required and must be at least 8 characters`);
      }
    }

    // Validate API keys (at least one should be present)
    const geminiApiKey = this.getStringValue('GEMINI_API_KEY') || this.getStringValue('NEXT_PUBLIC_GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.warn('⚠️ No Gemini API key found. AI features may be limited.');
    }

    // Validate numeric values
    const port = this.getNumberValue('PORT', 3000);
    if (port < 1 || port > 65535) {
      errors.push('PORT must be between 1 and 65535');
    }

    const rateLimitRpm = this.getNumberValue('RATE_LIMIT_RPM', 100);
    if (rateLimitRpm < 1 || rateLimitRpm > 10000) {
      errors.push('RATE_LIMIT_RPM must be between 1 and 10000');
    }

    // Validate log level
    const logLevel = this.getStringValue('LOG_LEVEL', 'info');
    if (!['debug', 'info', 'warn', 'error'].includes(logLevel)) {
      errors.push('LOG_LEVEL must be debug, info, warn, or error');
    }

    // Validate URLs
    try {
      new URL(this.getStringValue('API_BASE_URL'));
      new URL(this.getStringValue('FRONTEND_BASE_URL'));
    } catch {
      errors.push('API_BASE_URL and FRONTEND_BASE_URL must be valid URLs');
    }

    // Validate CORS origins
    const corsOrigins = this.getStringValue('CORS_ORIGINS', '*')
      .split(',')
      .map(origin => origin.trim());

    // Throw errors if validation fails
    if (errors.length > 0) {
      throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
    }

    return {
      NODE_ENV: nodeEnv as 'development' | 'production' | 'test',
      PORT: port,
      DATABASE_URL: this.getStringValue('DATABASE_URL'),
      REDIS_URL: this.getStringValue('REDIS_URL'),
      JWT_SECRET: this.getStringValue('JWT_SECRET'),
      ENCRYPTION_KEY: this.getStringValue('ENCRYPTION_KEY'),
      API_BASE_URL: this.getStringValue('API_BASE_URL'),
      FRONTEND_BASE_URL: this.getStringValue('FRONTEND_BASE_URL'),
      GEMINI_API_KEY: this.getStringValue('GEMINI_API_KEY'),
      NEXT_PUBLIC_GEMINI_API_KEY: this.getStringValue('NEXT_PUBLIC_GEMINI_API_KEY'),
      GEMINI_MODEL: this.getStringValue('GEMINI_MODEL', 'gemini-2.0-flash-exp'),
      NEXT_PUBLIC_GEMINI_MODEL: this.getStringValue('NEXT_PUBLIC_GEMINI_MODEL', 'gemini-2.0-flash-exp'),
      LOG_LEVEL: logLevel as 'debug' | 'info' | 'warn' | 'error',
      DEBUG_MODE: this.getBooleanValue('DEBUG_MODE', nodeEnv === 'development'),
      SESSION_SECRET: this.getStringValue('SESSION_SECRET'),
      COOKIE_SECRET: this.getStringValue('COOKIE_SECRET'),
      CORS_ORIGINS: corsOrigins,
      RATE_LIMIT_RPM: rateLimitRpm,
      FILE_UPLOAD_LIMIT_MB: this.getNumberValue('FILE_UPLOAD_LIMIT_MB', 10),
      PASSWORD_RESET_EXPIRY_MIN: this.getNumberValue('PASSWORD_RESET_EXPIRY_MIN', 60),
      EMAIL_VERIFICATION_EXPIRY_HOURS: this.getNumberValue('EMAIL_VERIFICATION_EXPIRY_HOURS', 24)
    };
  }

  /**
   * Get string value from environment with optional default
   * 
   * @param {string} key Environment variable key
   * @param {string} defaultValue Default value if not found
   * @returns {string} Environment variable value or default
   */
  private getStringValue(key: string, defaultValue: string = ''): string {
    const value = process.env[key];
    return value !== undefined ? value : defaultValue;
  }

  /**
   * Get number value from environment with optional default
   * 
   * @param {string} key Environment variable key
   * @param {number} defaultValue Default value if not found
   * @returns {number} Parsed number value or default
   */
  private getNumberValue(key: string, defaultValue: number = 0): number {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Get boolean value from environment with optional default
   * 
   * @param {string} key Environment variable key
   * @param {boolean} defaultValue Default value if not found
   * @returns {boolean} Parsed boolean value or default
   */
  private getBooleanValue(key: string, defaultValue: boolean = false): boolean {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    
    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
  }

  /**
   * Get complete configuration object
   * 
   * @returns {EnvironmentSchema} Complete validated configuration
   */
  public getConfig(): EnvironmentSchema {
    return { ...this.config };
  }

  /**
   * Get specific configuration value by key
   * 
   * @param {keyof EnvironmentSchema} key Configuration key
   * @returns {any} Configuration value
   */
  public get<K extends keyof EnvironmentSchema>(key: K): EnvironmentSchema[K] {
    return this.config[key];
  }

  /**
   * Check if running in development mode
   * 
   * @returns {boolean} True if in development mode
   */
  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  /**
   * Check if running in production mode
   * 
   * @returns {boolean} True if in production mode
   */
  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  /**
   * Check if running in test mode
   * 
   * @returns {boolean} True if in test mode
   */
  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  /**
   * Get database configuration
   * 
   * @returns {object} Database configuration object
   */
  public getDatabaseConfig() {
    return {
      url: this.config.DATABASE_URL,
      ssl: this.isProduction() ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      max: this.isProduction() ? 20 : 5
    };
  }

  /**
   * Get Redis configuration
   * 
   * @returns {object} Redis configuration object
   */
  public getRedisConfig() {
    return {
      url: this.config.REDIS_URL,
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: 3,
      lazyConnect: true
    };
  }

  /**
   * Get JWT configuration
   * 
   * @returns {object} JWT configuration object
   */
  public getJWTConfig() {
    return {
      secret: this.config.JWT_SECRET,
      expiresIn: this.isProduction() ? '1h' : '24h',
      refreshExpiresIn: '7d',
      algorithm: 'HS256' as const,
      issuer: 'matchedcover-platform'
    };
  }

  /**
   * Get CORS configuration
   * 
   * @returns {object} CORS configuration object
   */
  public getCorsConfig() {
    return {
      origin: this.config.CORS_ORIGINS.includes('*') ? true : this.config.CORS_ORIGINS,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-ID'],
      exposedHeaders: ['X-Request-ID', 'X-RateLimit-Remaining'],
      maxAge: 86400 // 24 hours
    };
  }

  /**
   * Get rate limiting configuration
   * 
   * @returns {object} Rate limiting configuration object
   */
  public getRateLimitConfig() {
    return {
      windowMs: 60 * 1000, // 1 minute
      max: this.config.RATE_LIMIT_RPM,
      message: 'Too many requests, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
      skipFailedRequests: false
    };
  }

  /**
   * Get security configuration
   * 
   * @returns {object} Security configuration object
   */
  public getSecurityConfig() {
    return {
      encryption: {
        key: this.config.ENCRYPTION_KEY,
        algorithm: 'aes-256-gcm',
        keyLength: 32,
        ivLength: 16
      },
      session: {
        secret: this.config.SESSION_SECRET,
        secure: this.isProduction(),
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict' as const
      },
      cookies: {
        secret: this.config.COOKIE_SECRET,
        secure: this.isProduction(),
        httpOnly: true,
        sameSite: 'strict' as const
      }
    };
  }

  /**
   * Validate environment on startup
   * 
   * @throws {Error} If environment validation fails
   */
  public static validateEnvironment(): void {
    try {
      const config = EnvironmentConfig.getInstance();
      console.log('✅ Environment configuration validated successfully');
      
      if (config.isDevelopment()) {
        console.log('🔧 Running in development mode');
      } else if (config.isProduction()) {
        console.log('🚀 Running in production mode');
      } else {
        console.log('🧪 Running in test mode');
      }
    } catch (error) {
      console.error('❌ Environment validation failed:', error);
      process.exit(1);
    }
  }
}

// Export singleton instance
export const envConfig = EnvironmentConfig.getInstance();

// Validate environment on module load
EnvironmentConfig.validateEnvironment();

export default envConfig;
