/**
 * Central Type Definitions for MatchedCover Platform
 * Consolidates all type definitions to improve type coverage and eliminate duplicates
 */

// Core API Response Types
export interface APIResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Replace all "any" types with proper typed alternatives
export type GenericValue = string | number | boolean | Date | null | undefined | GenericObject | GenericObject[] | string[] | number[];

export interface GenericObject {
  [key: string]: GenericValue;
}

export interface CarrierAPIData extends GenericObject {
  requestId?: string;
  timestamp?: string;
  version?: string;
}

export interface ExtendedCarrierAPIData extends CarrierAPIData {
  // Allow any additional properties while maintaining type safety
  [key: string]: GenericValue;
}

export interface TransformationData extends GenericObject {
  sourceFormat: string;
  targetFormat: string;
  metadata: Record<string, string | number>;
}

export interface RiskAssessmentData extends GenericObject {
  riskScore: number;
  factors: string[];
  recommendations: string[];
}

// Voice Recognition Types
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[][];
  resultIndex: number;
}

export interface SpeechRecognitionError {
  error: 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-allowed';
  message: string;
}

// AI Service Types
export interface ExtractedInformation {
  coverageType?: string;
  vehicleInfo?: {
    year?: number;
    make?: string;
    model?: string;
    vin?: string;
  };
  personalInfo?: {
    age?: number;
    gender?: string;
    maritalStatus?: string;
    creditScore?: number;
  };
  drivingHistory?: {
    yearsLicensed?: number;
    accidents?: number;
    violations?: number;
    claims?: number;
  };
  location?: {
    zipCode?: string;
    city?: string;
    state?: string;
  };
  preferences?: {
    deductible?: number;
    monthlyBudget?: number;
    coverageLevel?: string;
  };
}

// Compliance Types
export interface UserDataUpdate {
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
}

export interface ConsentMetadata {
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  method: 'explicit' | 'implicit' | 'opt-in' | 'opt-out';
  location?: string;
}

export interface RetentionSchedule {
  dataType: string;
  retentionPeriod: number; // in days
  deletionMethod: 'secure-delete' | 'anonymize' | 'archive';
  legalBasis: string;
}

export interface UserRightsInformation {
  availableRights: string[];
  requestMethods: string[];
  responseTimeframes: Record<string, number>;
  contactInformation: {
    email: string;
    phone: string;
    address: string;
  };
}

// Enhanced Cache Types
export interface CacheData<T = GenericObject> {
  data: T;
  timestamp: number;
  expiresAt: number;
  version: string;
}

// Error Handling Types
export interface DetailedError extends Error {
  code: string;
  statusCode?: number;
  context?: GenericObject;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// Environment Configuration Types
export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  API_BASE_URL: string;
  JWT_SECRET: string;
  REDIS_URL?: string;
  ENCRYPTION_KEY: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

// Input Validation Types
export interface ValidationRule {
  field: string;
  type: 'string' | 'number' | 'email' | 'phone' | 'date' | 'enum';
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  enumValues?: string[];
  customValidator?: (value) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  sanitizedData?: GenericObject;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?;
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  responseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  throughput: number;
  errorRate: number;
  timestamp: string;
}

export interface AsyncOperationResult<T = GenericObject> {
  success: boolean;
  data?: T;
  error?: DetailedError;
  duration: number;
  retryCount: number;
}

// Generic Function Types
export type AsyncFunction<TInput = GenericObject, TOutput = GenericObject> = (
  input: TInput
) => Promise<TOutput>;

export type TransformFunction<TInput = GenericObject, TOutput = GenericObject> = (
  input: TInput
) => TOutput;

export type ValidatorFunction<T = GenericObject> = (data: T) => ValidationResult;

export type ErrorHandlerFunction = (error: DetailedError) => void;

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Configuration Types
export interface ServiceConfiguration {
  timeout: number;
  retryAttempts: number;
  cacheEnabled: boolean;
  loggingEnabled: boolean;
  environmentVariables: Partial<EnvironmentVariables>;
}
