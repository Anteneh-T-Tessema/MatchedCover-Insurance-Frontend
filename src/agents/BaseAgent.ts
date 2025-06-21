import { EnhancedInputValidator } from '../utils/enhanced-input-validation';
import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
/**
 * Base Agent Class
 * Provides common functionality for all compliance agents
 */
export abstract class BaseAgent {
  private validator: EnhancedInputValidator = EnhancedInputValidator.getInstance();

  protected errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  protected agentName: string;
  protected version: string;
  protected isActive: boolean = false;
  protected lastActivity: Date = new Date();

  constructor(agentName: string, version: string) {
    this.agentName = agentName;
    this.version = version;
  }

  /**
   * Log a message with timestamp and agent context
   * @param message - The message to log
   * @param level - Log level
   */
  public log(message: string, level: 'info' | 'warn' | 'error' | 'debug' = 'info'): void {
    try {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${this.agentName}] [${level.toUpperCase()}] ${message}`;
      
      switch (level) {
        case 'error':
          console.error(logMessage);
          break;
        case 'warn':
          console.warn(logMessage);
          break;
        case 'debug':
          console.debug(logMessage);
          break;
        default:
          console.log(logMessage);
      }
      
      this.lastActivity = new Date();
    } catch (error) {
      console.error(`Error in BaseAgent.log: ${error}`);
      throw error;
    }
  }

  /**
   * Get agent information
   */
  getInfo(): { name: string; version: string; isActive: boolean; lastActivity: Date } {
    return {
      name: this.agentName,
      version: this.version,
      isActive: this.isActive,
      lastActivity: this.lastActivity
    };
  }

  /**
   * Start the agent
   */
  async start(): Promise<void> {
    this.isActive = true;
    this.log(`Agent ${this.agentName} started`, 'info');
  }

  /**
   * Stop the agent
   */
  async stop(): Promise<void> {
    this.isActive = false;
    this.log(`Agent ${this.agentName} stopped`, 'info');
  }

  /**
   * Health check for the agent
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; message: string }> {
    try {
      // Basic health check - can be overridden by subclasses
      return {
        status: this.isActive ? 'healthy' : 'unhealthy',
        message: this.isActive ? 'Agent is running normally' : 'Agent is not active'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export default BaseAgent;
