/**
 * Real-Time Communication Service
 * Handles WebSocket connections to the MatchedCover backend
 * 
 * @fileoverview Real-time communication service with consolidated interfaces
 * @author MatchedCover Platform Team
 * @version 2.0.0
 */

import { io, Socket } from 'socket.io-client';
import {
  QuoteRequest
} from '../../types/consolidated-interfaces';

/**
 * Backend configuration interface
 * Configuration for backend communication
 * 
 * @interface BackendConfig
 */
export interface BackendConfig {
  baseUrl: string;
  socketPath: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

/**
 * User session interface
 * Tracks user session state and gamification
 * 
 * @interface UserSession
 */
export interface UserSession {
  userId: string;
  sessionId: string;
  gameState: GameState;
  preferences: UserPreferences;
}

/**
 * Game state interface for gamification features
 * 
 * @interface GameState
 */
export interface GameState {
  level: number;
  points: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  lastActivity: Date;
}

/**
 * Badge interface for gamification
 * 
 * @interface Badge
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

/**
 * Achievement interface for gamification
 * 
 * @interface Achievement
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: string;
}

/**
 * User preferences interface
 * User communication and interaction preferences
 * 
 * @interface UserPreferences
 */
export interface UserPreferences {
  communicationStyle: 'casual' | 'professional' | 'technical';
  preferredAgent: string;
  voiceEnabled: boolean;
  notifications: boolean;
  gamificationEnabled: boolean;
}

export interface QuoteResponse {
  id: string;
  quotes: Quote[];
  recommendations: Recommendation[];
  riskAnalysis: RiskAnalysis;
  gameReward?: GameReward;
}

export interface Quote {
  carrierId: string;
  carrierName: string;
  premium: number;
  coverage: Record<string, unknown>;
  rating: number;
  features: string[];
  discounts: Discount[];
}

export interface Recommendation {
  type: 'coverage' | 'savings' | 'carrier';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
}

export interface RiskAnalysis {
  score: number;
  factors: RiskFactor[];
  recommendations: string[];
  confidence: number;
}

export interface RiskFactor {
  type: string;
  impact: number;
  description: string;
  mitigation?: string;
}

export interface Discount {
  name: string;
  amount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

export interface GameReward {
  type: 'points' | 'badge' | 'achievement' | 'unlock';
  value: number | string;
  description: string;
  animation: string;
}

export interface AIMessage {
  agentId: string;
  message: string;
  context: Record<string, unknown>;
  expectsResponse: boolean;
}

export interface AIResponse {
  agentId: string;
  message: string;
  suggestions: string[];
  actions: AIAction[];
  gameReward?: GameReward;
  confidence: number;
}

export interface AIAction {
  type: string;
  description: string;
  data: Record<string, unknown>;
  priority: 'low' | 'medium' | 'high';
}

export class RealTimeCommunicationService {
  private socket: Socket | null = null;
  private config: BackendConfig;
  private isConnected = false;
  private userSession: UserSession | null = null;
  private connectionPromise: Promise<void> | null = null;

  // Event callbacks
  private onConnectedCallback?: () => void;
  private onDisconnectedCallback?: () => void;
  private onErrorCallback?: (error: string) => void;
  private onQuoteResponseCallback?: (response: QuoteResponse) => void;
  private onAIResponseCallback?: (response: AIResponse) => void;
  private onGameRewardCallback?: (reward: GameReward) => void;
  private onUserUpdateCallback?: (session: UserSession) => void;

  constructor(config: Partial<BackendConfig> = {}) {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
      socketPath: '/socket.io/',
      apiVersion: 'v1',
      timeout: 30000,
      retryAttempts: 3,
      ...config
    };
  }

  /**
   * Connect to the backend WebSocket
   */
  async connect(userSession: UserSession): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        this.userSession = userSession;
        
        this.socket = io(this.config.baseUrl, {
          path: this.config.socketPath,
          timeout: this.config.timeout,
          retries: this.config.retryAttempts,
          auth: {
            userId: userSession.userId,
            sessionId: userSession.sessionId
          }
        });

        this.socket.on('connect', () => {
          console.log('Connected to MatchedCover backend');
          this.isConnected = true;
          this.onConnectedCallback?.();
          resolve();
        });

        this.socket.on('disconnect', (reason) => {
          console.log('Disconnected from backend:', reason);
          this.isConnected = false;
          this.onDisconnectedCallback?.();
        });

        this.socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          this.onErrorCallback?.(error.message);
          reject(error);
        });

        // AI Response handling
        this.socket.on('ai_response', (response: AIResponse) => {
          console.log('AI Response received:', response);
          this.onAIResponseCallback?.(response);
          
          if (response.gameReward) {
            this.onGameRewardCallback?.(response.gameReward);
          }
        });

        // Quote Response handling
        this.socket.on('quote_response', (response: QuoteResponse) => {
          console.log('Quote Response received:', response);
          this.onQuoteResponseCallback?.(response);
          
          if (response.gameReward) {
            this.onGameRewardCallback?.(response.gameReward);
          }
        });

        // Game Reward handling
        this.socket.on('game_reward', (reward: GameReward) => {
          console.log('Game reward received:', reward);
          this.onGameRewardCallback?.(reward);
        });

        // User Session Updates
        this.socket.on('user_update', (session: UserSession) => {
          console.log('User session updated:', session);
          this.userSession = session;
          this.onUserUpdateCallback?.(session);
        });

        // Error handling
        this.socket.on('error', (error) => {
          console.error('Socket error:', error);
          this.onErrorCallback?.(error.message || 'Unknown socket error');
        });

      } catch (error) {
        this.onErrorCallback?.('Failed to initialize connection');
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  /**
   * Disconnect from the backend
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
    this.connectionPromise = null;
  }

  /**
   * Send AI message to backend
   */
  async sendAIMessage(message: AIMessage): Promise<void> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to backend');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('ai_message', message, (response: { success: boolean; error?: string }) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error || 'Failed to send AI message'));
        }
      });
    });
  }

  /**
   * Request insurance quote
   */
  async requestQuote(quoteRequest: QuoteRequest): Promise<void> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to backend');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('quote_request', quoteRequest, (response: { success: boolean; error?: string }) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error || 'Failed to request quote'));
        }
      });
    });
  }

  /**
   * Update user gamification state
   */
  async updateGameState(gameState: Partial<GameState>): Promise<void> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to backend');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('game_state_update', gameState, (response: { success: boolean; error?: string }) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error || 'Failed to update game state'));
        }
      });
    });
  }

  /**
   * Track user activity for gamification
   */
  async trackActivity(activity: {
    type: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    if (!this.isConnected || !this.socket) {
      return; // Silently fail for activity tracking
    }

    this.socket.emit('activity_track', {
      ...activity,
      timestamp: new Date(),
      userId: this.userSession?.userId,
      sessionId: this.userSession?.sessionId
    });
  }

  /**
   * Get current user session
   */
  getUserSession(): UserSession | null {
    return this.userSession;
  }

  /**
   * Check if connected
   */
  isConnectedToBackend(): boolean {
    return this.isConnected;
  }

  /**
   * Set event callbacks
   */
  setEventCallbacks(callbacks: {
    onConnected?: () => void;
    onDisconnected?: () => void;
    onError?: (error: string) => void;
    onQuoteResponse?: (response: QuoteResponse) => void;
    onAIResponse?: (response: AIResponse) => void;
    onGameReward?: (reward: GameReward) => void;
    onUserUpdate?: (session: UserSession) => void;
  }): void {
    this.onConnectedCallback = callbacks.onConnected;
    this.onDisconnectedCallback = callbacks.onDisconnected;
    this.onErrorCallback = callbacks.onError;
    this.onQuoteResponseCallback = callbacks.onQuoteResponse;
    this.onAIResponseCallback = callbacks.onAIResponse;
    this.onGameRewardCallback = callbacks.onGameReward;
    this.onUserUpdateCallback = callbacks.onUserUpdate;
  }

  /**
   * Send heartbeat to maintain connection
   */
  sendHeartbeat(): void {
    if (this.isConnected && this.socket) {
      this.socket.emit('heartbeat', { timestamp: new Date() });
    }
  }

  /**
   * Request user profile sync
   */
  async syncUserProfile(): Promise<UserSession> {
    if (!this.isConnected || !this.socket) {
      throw new Error('Not connected to backend');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('sync_profile', (response: { success: boolean; data?: UserSession; error?: string }) => {
        if (response.success && response.data) {
          this.userSession = response.data;
          resolve(response.data);
        } else {
          reject(new Error(response.error || 'Failed to sync profile'));
        }
      });
    });
  }
}

// Export singleton instance
export const rtcService = new RealTimeCommunicationService();
