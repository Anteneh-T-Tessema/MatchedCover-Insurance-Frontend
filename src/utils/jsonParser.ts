/**
 * Robust JSON Parser Utility
 * Provides safe JSON parsing with error handling and fallback mechanisms
 */

import { errorHandler, Result } from './errorHandler';

export interface ParseOptions {
  fallbackValue?;
  allowEmpty?: boolean;
  maxDepth?: number;
  strictMode?: boolean;
}

export interface ParseResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  originalInput?: string;
  processedInput?: string;
}

/**
 * Safe JSON Parser with robust error handling
 */
export class JSONParser {
  private static instance: JSONParser;
  private parseAttempts: number = 0;
  private successfulParses: number = 0;
  private failedParses: number = 0;

  private constructor() {}

  static getInstance(): JSONParser {
    if (!JSONParser.instance) {
      JSONParser.instance = new JSONParser();
    }
    return JSONParser.instance;
  }

  /**
   * Safely parse JSON with multiple fallback strategies
   */
  safeParse<T = unknown>(
    input: string | null | undefined,
    options: ParseOptions = {}
  ): Result<T> {
    this.parseAttempts++;

    const context = {
      operation: 'json_parse',
      agent: 'JSONParser',
      metadata: { 
        inputLength: input?.length || 0,
        inputType: typeof input,
        options 
      }
    };

    // Handle null/undefined input
    if (input === null || input === undefined) {
      if (options.allowEmpty && options.fallbackValue !== undefined) {
        this.successfulParses++;
        return errorHandler.success(options.fallbackValue as T);
      }
      
      return errorHandler.handleError(
        new Error('Input is null or undefined'),
        context
      );
    }

    // Handle empty string
    if (input === '') {
      if (options.allowEmpty) {
        if (options.fallbackValue !== undefined) {
          this.successfulParses++;
          return errorHandler.success(options.fallbackValue as T);
        }
        this.successfulParses++;
        return errorHandler.success({} as T);
      }
      
      return errorHandler.handleError(
        new Error('Empty string provided'),
        context
      );
    }

    // Try multiple parsing strategies
    const strategies = [
      () => this.standardParse<T>(input, options),
      () => this.cleanAndParse<T>(input, options),
      () => this.repairAndParse<T>(input),
      () => this.extractAndParse<T>(input, options)
    ];

    for (const strategy of strategies) {
      try {
        const result = strategy();
        if (result.success) {
          this.successfulParses++;
          return result;
        }
      } catch {
        // Continue to next strategy
        continue;
      }
    }

    // All strategies failed, use fallback
    this.failedParses++;
    
    if (options.fallbackValue !== undefined) {
      console.warn(`⚠️ JSON parsing failed, using fallback value`);
      return errorHandler.success(options.fallbackValue as T);
    }

    return errorHandler.handleError(
      new Error(`Failed to parse JSON after trying all strategies. Input: ${input.substring(0, 100)}...`),
      context
    );
  }

  /**
   * Standard JSON.parse attempt
   */
  private standardParse<T>(input: string, options: ParseOptions): Result<T> {
    try {
      const parsed = JSON.parse(input);
      
      // Validate depth if specified
      if (options.maxDepth && this.getObjectDepth(parsed) > options.maxDepth) {
        throw new Error(`Object depth exceeds maximum allowed depth of ${options.maxDepth}`);
      }

      return errorHandler.success(parsed as T);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Clean input and attempt parse
   */
  private cleanAndParse<T>(input: string, options: ParseOptions): Result<T> {
    try {
      // Remove BOM and trim
      let cleaned = input.replace(/^\uFEFF/, '').trim();
      
      // Remove trailing commas
      cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
      
      // Fix single quotes to double quotes (if not in strict mode)
      if (!options.strictMode) {
        cleaned = cleaned.replace(/'/g, '"');
      }

      const parsed = JSON.parse(cleaned);
      
      if (options.maxDepth && this.getObjectDepth(parsed) > options.maxDepth) {
        throw new Error(`Object depth exceeds maximum allowed depth of ${options.maxDepth}`);
      }

      return errorHandler.success(parsed as T);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Attempt to repair common JSON issues
   */
  private repairAndParse<T>(input: string): Result<T> {
    try {
      let repaired = input.trim();

      // Fix common issues
      repaired = this.repairCommonIssues(repaired);

      const parsed = JSON.parse(repaired);
      return errorHandler.success(parsed as T);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Extract JSON from mixed content
   */
  private extractAndParse<T>(input: string, options: ParseOptions): Result<T> {
    try {
      // Try to extract JSON from mixed content
      const jsonMatch = input.match(/\{.*\}|\[.*\]/);
      
      if (!jsonMatch) {
        throw new Error('No JSON pattern found in input');
      }

      const extracted = jsonMatch[0];
      const parsed = JSON.parse(extracted);
      
      if (options.maxDepth && this.getObjectDepth(parsed) > options.maxDepth) {
        throw new Error(`Object depth exceeds maximum allowed depth of ${options.maxDepth}`);
      }

      return errorHandler.success(parsed as T);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Repair common JSON formatting issues
   */
  private repairCommonIssues(input: string): string {
    let repaired = input;

    // Fix missing quotes around property names
    repaired = repaired.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

    // Fix trailing commas
    repaired = repaired.replace(/,(\s*[}\]])/g, '$1');

    // Fix missing commas between properties
    repaired = repaired.replace(/"\s*\n\s*"/g, '",\n"');

    // Fix unescaped quotes in strings
    repaired = repaired.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, '"$1\\"$2\\"$3"');

    return repaired;
  }

  /**
   * Calculate object depth for validation
   */
  private getObjectDepth(obj, depth: number = 0): number {
    if (depth > 50) return depth; // Prevent stack overflow
    
    if (typeof obj !== 'object' || obj === null) {
      return depth;
    }

    if (Array.isArray(obj)) {
      return Math.max(...obj.map(item => this.getObjectDepth(item, depth + 1)));
    }

    const values = Object.values(obj);
    if (values.length === 0) return depth + 1;
    
    return Math.max(...values.map(value => this.getObjectDepth(value, depth + 1)));
  }

  /**
   * Batch parse multiple JSON strings
   */
  batchParse<T = unknown>(
    inputs: (string | null | undefined)[],
    options: ParseOptions = {}
  ): Array<Result<T>> {
    return inputs.map(input => this.safeParse<T>(input, options));
  }

  /**
   * Parse JSON with schema validation (simple type checking)
   */
  parseWithValidation<T>(
    input: string,
    validator: (obj) => obj is T,
    options: ParseOptions = {}
  ): Result<T> {
    const parseResult = this.safeParse(input, options);
    
    if (!parseResult.success) {
      return parseResult;
    }

    if (!validator(parseResult.data)) {
      return errorHandler.handleError(
        new Error('Parsed JSON does not match expected schema'),
        {
          operation: 'json_schema_validation',
          agent: 'JSONParser',
          metadata: { input: input.substring(0, 100) }
        }
      );
    }

    return errorHandler.success(parseResult.data as T);
  }

  /**
   * Get parsing statistics
   */
  getStats(): {
    attempts: number;
    successful: number;
    failed: number;
    successRate: number;
  } {
    return {
      attempts: this.parseAttempts,
      successful: this.successfulParses,
      failed: this.failedParses,
      successRate: this.parseAttempts > 0 ? (this.successfulParses / this.parseAttempts) * 100 : 0
    };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.parseAttempts = 0;
    this.successfulParses = 0;
    this.failedParses = 0;
  }

  /**
   * Test JSON parser robustness with various inputs
   */
  testRobustness(): {
    testsPassed: number;
    testsTotal: number;
    details: Array<{ input: string; success: boolean; error?: string }>;
  } {
    const testCases = [
      '{"valid": "json"}',
      '{"missing": "comma" "another": "property"}',
      '{"trailing": "comma",}',
      '{invalid: "property names"}',
      '{"incomplete": ',
      '',
      'null',
      '{"nested": {"deeply": {"valid": true}}}',
      '{"quotes": "have \\"escaped\\" content"}',
      '{"unicode": "test \\u0041 content"}',
      '[1, 2, 3,]',
      '{key: "value"}',
      '{"mixed": content} extra text'
    ];

    const results = testCases.map(testCase => {
      const result = this.safeParse(testCase, { allowEmpty: true, fallbackValue: null });
      return {
        input: testCase,
        success: result.success,
        error: result.success ? undefined : 'failed'
      };
    });

    const testsPassed = results.filter(r => r.success).length;

    return {
      testsPassed,
      testsTotal: testCases.length,
      details: results
    };
  }
}

// Export singleton instance
export const jsonParser = JSONParser.getInstance();

// Utility functions
export function safeParseJSON<T = unknown>(
  input: string | null | undefined,
  fallbackValue?: T
): T | null {
  const result = jsonParser.safeParse<T>(input, { 
    fallbackValue,
    allowEmpty: true 
  });
  
  return result.success ? result.data : null;
}

export function parseJSONArray<T = unknown>(
  input: string | null | undefined,
  fallbackValue: T[] = []
): T[] {
  const result = jsonParser.safeParse<T[]>(input, { 
    fallbackValue,
    allowEmpty: true 
  });
  
  return result.success ? result.data : fallbackValue;
}

export function parseJSONObject<T extends Record<string, unknown> = Record<string, unknown>>(
  input: string | null | undefined,
  fallbackValue: T = {} as T
): T {
  const result = jsonParser.safeParse<T>(input, { 
    fallbackValue,
    allowEmpty: true 
  });
  
  return result.success ? result.data : fallbackValue;
}

// Type guard utilities
export function isValidJSON(input: string): boolean {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

export function isJSONObject(input: string): boolean {
  try {
    const parsed = JSON.parse(input);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

export function isJSONArray(input: string): boolean {
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
}
