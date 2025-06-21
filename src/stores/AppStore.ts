/**
 * Enhanced State Management - Global State for MatchedCover
 * Uses Zustand for reactive state management with persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'achievement';
  steps: QuestStep[];
  currentStep: number;
  reward: GameReward;
  expiresAt?: Date;
}

export interface QuestStep {
  id: string;
  description: string;
  completed: boolean;
  requiredProgress: number;
  currentProgress: number;
}

export interface GameReward {
  type: 'points' | 'badge' | 'unlock' | 'discount' | 'achievement' | 'feature' | 'knowledge';
  value: number | string;
  description: string;
}

export interface GameState {
  level: number;
  points: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  streak: number;
  lastActivity: Date;
  unlockedFeatures: string[];
  currentQuest?: Quest | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: string;
  reward?: {
    type: string;
    value: number | string;
    description: string;
  };
}

export interface UserSession {
  userId: string;
  sessionId: string;
  gameState: GameState;
  preferences: UserPreferences;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: Address;
  insuranceExperience: 'beginner' | 'intermediate' | 'expert';
  communicationStyle: 'casual' | 'professional' | 'technical';
  preferences: UserPreferences;
  onboardingCompleted: boolean;
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  preferredAgent: string;
  voiceEnabled: boolean;
  notifications: boolean;
  gamificationEnabled: boolean;
  language: string;
  theme: 'light' | 'dark' | 'auto';
  marketingEmails: boolean;
  dataSharing: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ActiveQuote {
  id: string;
  type: 'auto' | 'home' | 'life' | 'business';
  status: 'draft' | 'processing' | 'completed' | 'expired';
  progress: number;
  data: Record<string, unknown>;
  quotes: Quote[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface Quote {
  id: string;
  carrierId: string;
  carrierName: string;
  premium: number;
  coverage: Record<string, unknown>;
  rating: number;
  features: string[];
  discounts: Discount[];
  selected: boolean;
}

export interface Discount {
  name: string;
  amount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

export interface AIConversation {
  id: string;
  agentId: string;
  agentName: string;
  messages: AIMessage[];
  startedAt: Date;
  lastMessageAt: Date;
  context: Record<string, unknown>;
  isActive: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: AIAction[];
  gameReward?: GameReward;
  confidence?: number;
}

export interface AIAction {
  type: string;
  description: string;
  data: Record<string, unknown>;
  priority: 'low' | 'medium' | 'high';
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

export interface AppState {
  // User & Session
  user: UserProfile | null;
  gameState: GameState | null;
  isAuthenticated: boolean;
  sessionId: string | null;

  // AI & Conversations
  activeConversations: AIConversation[];
  currentAgent: string;
  isAITyping: boolean;
  voiceEnabled: boolean;

  // Quotes & Insurance
  activeQuotes: ActiveQuote[];
  quotingInProgress: boolean;
  selectedQuote: Quote | null;

  // UI State
  notifications: NotificationState[];
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;

  // Gamification
  recentRewards: GameReward[];
  showRewardAnimation: boolean;
  leaderboard: LeaderboardEntry[];

  // Connection
  isConnectedToBackend: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  points: number;
  level: number;
  rank: number;
  badges: number;
}

export interface AppActions {
  // User Actions
  setUser: (user: UserProfile) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;

  // Game State Actions
  setGameState: (gameState: GameState) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: Badge) => void;
  addAchievement: (achievement: Achievement) => void;
  setCurrentStreak: (streak: number) => void;

  // AI & Conversation Actions
  setCurrentAgent: (agentId: string) => void;
  startConversation: (agentId: string, agentName: string) => void;
  addMessage: (conversationId: string, message: Omit<AIMessage, 'id'>) => void;
  setAITyping: (typing: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  endConversation: (conversationId: string) => void;

  // Quote Actions
  addActiveQuote: (quote: ActiveQuote) => void;
  updateActiveQuote: (quoteId: string, updates: Partial<ActiveQuote>) => void;
  removeActiveQuote: (quoteId: string) => void;
  setQuotingInProgress: (inProgress: boolean) => void;
  setSelectedQuote: (quote: Quote | null) => void;

  // Notification Actions
  addNotification: (notification: Omit<NotificationState, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // UI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Gamification Actions
  addReward: (reward: GameReward) => void;
  setShowRewardAnimation: (show: boolean) => void;
  clearRecentRewards: () => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;

  // Connection Actions
  setConnectionStatus: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void;
  setConnectedToBackend: (connected: boolean) => void;

  // Session Actions
  setSessionId: (sessionId: string) => void;
  initializeSession: (userSession: UserSession) => void;
}

type Store = AppState & AppActions;

// Create the store with persistence for user data and game state
export const useAppStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      gameState: null,
      isAuthenticated: false,
      sessionId: null,
      activeConversations: [],
      currentAgent: 'maya-quote',
      isAITyping: false,
      voiceEnabled: false,
      activeQuotes: [],
      quotingInProgress: false,
      selectedQuote: null,
      notifications: [],
      loading: false,
      error: null,
      theme: 'light',
      sidebarOpen: false,
      mobileMenuOpen: false,
      recentRewards: [],
      showRewardAnimation: false,
      leaderboard: [],
      isConnectedToBackend: false,
      connectionStatus: 'disconnected',

      // User Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      updateUserPreferences: (preferences) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            preferences: { ...state.user.preferences, ...preferences }
          } : null
        })),

      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        sessionId: null,
        activeConversations: [],
        activeQuotes: [],
        gameState: null,
        recentRewards: [],
        notifications: []
      }),

      // Game State Actions
      setGameState: (gameState) => set({ gameState }),

      addPoints: (points) =>
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            points: state.gameState.points + points
          } : null
        })),

      addBadge: (badge) =>
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            badges: [...state.gameState.badges, badge]
          } : null
        })),

      addAchievement: (achievement) =>
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            achievements: [...state.gameState.achievements, achievement]
          } : null
        })),

      setCurrentStreak: (streak) =>
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            currentStreak: streak
          } : null
        })),

      // AI & Conversation Actions
      setCurrentAgent: (agentId) => set({ currentAgent: agentId }),

      startConversation: (agentId, agentName) => {
        const conversation: AIConversation = {
          id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          agentId,
          agentName,
          messages: [],
          startedAt: new Date(),
          lastMessageAt: new Date(),
          context: {},
          isActive: true
        };

        set((state) => ({
          activeConversations: [...state.activeConversations, conversation],
          currentAgent: agentId
        }));

        return conversation.id;
      },

      addMessage: (conversationId, message) =>
        set((state) => ({
          activeConversations: state.activeConversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, {
                    ...message,
                    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                  }],
                  lastMessageAt: new Date()
                }
              : conv
          )
        })),

      setAITyping: (typing) => set({ isAITyping: typing }),

      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),

      endConversation: (conversationId) =>
        set((state) => ({
          activeConversations: state.activeConversations.map(conv =>
            conv.id === conversationId ? { ...conv, isActive: false } : conv
          )
        })),

      // Quote Actions
      addActiveQuote: (quote) =>
        set((state) => ({
          activeQuotes: [...state.activeQuotes, quote]
        })),

      updateActiveQuote: (quoteId, updates) =>
        set((state) => ({
          activeQuotes: state.activeQuotes.map(quote =>
            quote.id === quoteId ? { ...quote, ...updates } : quote
          )
        })),

      removeActiveQuote: (quoteId) =>
        set((state) => ({
          activeQuotes: state.activeQuotes.filter(quote => quote.id !== quoteId)
        })),

      setQuotingInProgress: (inProgress) => set({ quotingInProgress: inProgress }),

      setSelectedQuote: (quote) => set({ selectedQuote: quote }),

      // Notification Actions
      addNotification: (notification) => {
        const newNotification: NotificationState = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date()
        };

        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }));

        // Auto-remove notification after duration
        if (notification.duration && notification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, notification.duration);
        }

        return newNotification.id;
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter(notif => notif.id !== id)
        })),

      clearNotifications: () => set({ notifications: [] }),

      // UI Actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setTheme: (theme) => set({ theme }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // Gamification Actions
      addReward: (reward) =>
        set((state) => ({
          recentRewards: [...state.recentRewards, reward],
          showRewardAnimation: true
        })),

      setShowRewardAnimation: (show) => set({ showRewardAnimation: show }),

      clearRecentRewards: () => set({ recentRewards: [] }),

      setLeaderboard: (leaderboard) => set({ leaderboard }),

      // Connection Actions
      setConnectionStatus: (status) => set({ 
        connectionStatus: status,
        isConnectedToBackend: status === 'connected'
      }),

      setConnectedToBackend: (connected) => set({ isConnectedToBackend: connected }),

      // Session Actions
      setSessionId: (sessionId) => set({ sessionId }),

      initializeSession: (userSession) => set({
        user: userSession.userId ? {
          id: userSession.userId,
          name: 'User', // Will be updated from backend
          email: '',
          insuranceExperience: 'beginner',
          communicationStyle: 'casual',
          preferences: userSession.preferences,
          onboardingCompleted: false,
          createdAt: new Date(),
          lastActive: new Date()
        } : null,
        gameState: userSession.gameState,
        sessionId: userSession.sessionId,
        isAuthenticated: true
      })
    }),
    {
      name: 'matchedcover-app-state',
      storage: createJSONStorage(() => localStorage),
      // Only persist specific parts of the state
      partialize: (state) => ({
        user: state.user,
        gameState: state.gameState,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        voiceEnabled: state.voiceEnabled,
        currentAgent: state.currentAgent
      })
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useGameState = () => useAppStore((state) => state.gameState);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useActiveQuotes = () => useAppStore((state) => state.activeQuotes);
export const useActiveConversations = () => useAppStore((state) => state.activeConversations);
export const useConnectionStatus = () => useAppStore((state) => state.connectionStatus);
export const useTheme = () => useAppStore((state) => state.theme);

// Action selectors
export const useUserActions = () => useAppStore((state) => ({
  setUser: state.setUser,
  updateUserPreferences: state.updateUserPreferences,
  logout: state.logout
}));

export const useGameActions = () => useAppStore((state) => ({
  addPoints: state.addPoints,
  addBadge: state.addBadge,
  addAchievement: state.addAchievement,
  addReward: state.addReward
}));

export const useAIActions = () => useAppStore((state) => ({
  setCurrentAgent: state.setCurrentAgent,
  startConversation: state.startConversation,
  addMessage: state.addMessage,
  setAITyping: state.setAITyping
}));

export const useNotificationActions = () => useAppStore((state) => ({
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
}));
