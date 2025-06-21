/**
 * Enhanced AI Chat Interface - Real Integration with Gemini, Voice, and Backend
 * Combines all our services for a complete AI experience
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2,
  VolumeX,
  Bot,
  User,
  Loader2,
  Gift
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Import our enhanced services
import { geminiAIService, type AIResponse, type ConversationContext } from '../services/ai/GeminiAIService';
import { simpleVoiceService, type VoiceResult } from '../services/voice/SimpleVoiceService';
import { rtcService, type AIMessage as BackendAIMessage } from '../services/communication/RealTimeCommunicationService';
import { 
  useAppStore, 
  useAIActions, 
  useGameActions, 
  useNotificationActions,
  type AIMessage,
  type GameReward 
} from '../stores/AppStore';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  personality: string;
  color: string;
  description: string;
}

const agents: Agent[] = [
  {
    id: 'maya-quote',
    name: 'Maya',
    avatar: '🌟',
    specialty: 'Quotes & Savings',
    personality: 'Friendly & Enthusiastic',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'I help you find the perfect insurance at the best price!'
  },
  {
    id: 'alex-underwriting',
    name: 'Alex',
    avatar: '🧠',
    specialty: 'Risk Assessment',
    personality: 'Professional & Analytical',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    description: 'I analyze risk factors and recommend optimal coverage.'
  },
  {
    id: 'sam-claims',
    name: 'Sam',
    avatar: '❤️',
    specialty: 'Claims Support',
    personality: 'Empathetic & Helpful',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    description: 'I guide you through claims with care and efficiency.'
  }
];

interface EnhancedAIChatInterfaceProps {
  className?: string;
  defaultAgent?: string;
  onQuoteRequest?: () => void;
  onClose?: () => void;
}

const EnhancedAIChatInterface: React.FC<EnhancedAIChatInterfaceProps> = ({
  className = '',
  defaultAgent = 'maya-quote',
  onQuoteRequest,
  onClose
}) => {
  // State management
  const { 
    currentAgent,
    activeConversations,
    isAITyping,
    voiceEnabled,
    user,
    gameState,
    isConnectedToBackend
  } = useAppStore();

  const { setCurrentAgent, startConversation, addMessage, setAITyping } = useAIActions();
  const { addPoints, addReward } = useGameActions();
  const { addNotification } = useNotificationActions();

  // Local state
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current agent data
  const activeAgent = agents.find(agent => agent.id === currentAgent) || agents[0];
  const currentConversation = activeConversations.find(conv => 
    conv.agentId === currentAgent && conv.isActive
  );

  // Initialize conversation if none exists
  useEffect(() => {
    if (!currentConversation && user) {
      startConversation(currentAgent, activeAgent.name);
    }
  }, [currentAgent, currentConversation, user, startConversation, activeAgent.name]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  // Initialize services
  useEffect(() => {
    // Test AI service connection
    const testConnection = async () => {
      try {
        const isConnected = await geminiAIService.testConnection();
        if (!isConnected) {
          addNotification({
            type: 'warning',
            title: 'AI Service',
            message: 'AI service not available, using demo responses',
            duration: 5000
          });
        }
      } catch (error) {
        console.warn('AI service test failed:', error);
      }
    };

    testConnection();
  }, [addNotification]);

  // Handle sending message
  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || !currentConversation || isAITyping) return;

    const userMessage: Omit<AIMessage, 'id'> = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    addMessage(currentConversation.id, userMessage);
    setInputMessage('');
    setIsLoading(true);
    setAITyping(true);

    try {
      // Prepare conversation context
      const context: ConversationContext = {
        agentId: currentAgent,
        userProfile: {
          id: user?.id || 'anonymous',
          name: user?.name || 'User',
          insuranceExperience: user?.insuranceExperience || 'beginner',
          communicationStyle: user?.communicationStyle || 'casual',
          currentNeeds: [],
          riskProfile: {
            creditScore: 750,
            drivingRecord: 'clean',
            claims_history: 0,
            location: 'US',
            age: 30,
            occupation: 'professional'
          }
        },
        gameState: gameState || {
          level: 1,
          points: 0,
          badges: [],
          achievements: [],
          currentStreak: 0,
          streak: 0,
          lastActivity: new Date(),
          unlockedFeatures: []
        },
        conversationHistory: currentConversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp
        })),
        currentGoal: 'general_assistance',
        insuranceContext: {
          activeQuotes: [],
          currentPolicies: [],
          recentClaims: [],
          riskFactors: {
            creditScore: 750,
            drivingRecord: 'clean',
            claims_history: 0,
            location: 'US',
            age: 30,
            occupation: 'professional'
          },
          preferredCoverage: {
            liability: 100000,
            collision: true,
            comprehensive: true,
            deductible: 500
          }
        }
      };

      // Send to backend if connected
      if (isConnectedToBackend) {
        const backendMessage: BackendAIMessage = {
          agentId: currentAgent,
          message: message.trim(),
          context: context as unknown as Record<string, unknown>,
          expectsResponse: true
        };

        await rtcService.sendAIMessage(backendMessage);
        // Response will come through WebSocket
      } else {
        // Use Gemini AI directly
        const aiResponse: AIResponse = await geminiAIService.generateResponse(message.trim(), context);
        
        // Add AI response
        const assistantMessage: Omit<AIMessage, 'id'> = {
          role: 'assistant',
          content: aiResponse.text,
          timestamp: new Date(),
          suggestions: aiResponse.suggestions,
          actions: aiResponse.actions,
          gameReward: aiResponse.gameReward,
          confidence: aiResponse.confidence
        };

        addMessage(currentConversation.id, assistantMessage);

        // Handle game rewards
        if (aiResponse.gameReward) {
          handleGameReward(aiResponse.gameReward);
        }

        // Speak response if voice is enabled
        if (voiceEnabled && !isSpeaking) {
          speakMessage(aiResponse.text);
        }
      }

      // Track activity for gamification
      if (isConnectedToBackend) {
        await rtcService.trackActivity({
          type: 'ai_conversation',
          metadata: {
            agentId: currentAgent,
            messageLength: message.length,
            hasQuestions: message.includes('?')
          }
        });
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add fallback response
      const fallbackMessage: Omit<AIMessage, 'id'> = {
        role: 'assistant',
        content: `I'm sorry, I'm having a technical issue right now. Let me connect you with a human agent who can help you immediately. In the meantime, would you like me to help you get a quick insurance quote?`,
        timestamp: new Date(),
        suggestions: ['Get a quote', 'Speak with human agent', 'Try again later']
      };

      addMessage(currentConversation.id, fallbackMessage);

      addNotification({
        type: 'error',
        title: 'Connection Issue',
        message: 'Unable to reach AI service. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
      setAITyping(false);
    }
  }, [
    currentConversation,
    isAITyping,
    currentAgent,
    activeAgent,
    user,
    gameState,
    isConnectedToBackend,
    voiceEnabled,
    isSpeaking,
    addMessage,
    setAITyping,
    addNotification
  ]);

  // Handle game rewards
  const handleGameReward = useCallback((reward: GameReward) => {
    addReward(reward);
    
    if (reward.type === 'points') {
      addPoints(Number(reward.value));
    }

    toast.success(`🎉 ${reward.description}`, {
      duration: 3000,
      position: 'top-center'
    });
  }, [addReward, addPoints]);

  // Voice recording
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      simpleVoiceService.stopRecognition();
      setIsRecording(false);
    } else {
      const success = simpleVoiceService.startRecognition(
        (result: VoiceResult) => {
          if (result.isFinal && result.transcript.trim()) {
            setInputMessage(result.transcript);
            setIsRecording(false);
          }
        },
        (error: string) => {
          console.error('Voice recognition error:', error);
          setIsRecording(false);
          addNotification({
            type: 'error',
            title: 'Voice Recognition',
            message: 'Voice recognition not available',
            duration: 3000
          });
        },
        () => setIsRecording(true),
        () => setIsRecording(false)
      );

      if (!success) {
        addNotification({
          type: 'warning',
          title: 'Voice Recognition',
          message: 'Voice recognition not supported in this browser',
          duration: 3000
        });
      }
    }
  }, [isRecording, addNotification]);

  // Text-to-speech
  const speakMessage = useCallback(async (text: string) => {
    if (!voiceEnabled || isSpeaking) return;

    try {
      setIsSpeaking(true);
      await simpleVoiceService.speak(text, {
        rate: 1.1,
        pitch: 1.0,
        volume: 0.8,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: (error) => {
          console.error('TTS error:', error);
          setIsSpeaking(false);
        }
      });
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  }, [voiceEnabled, isSpeaking]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  // Switch agent
  const switchAgent = (agentId: string) => {
    setCurrentAgent(agentId);
    setShowAgentSelection(false);
    
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      addNotification({
        type: 'info',
        title: 'Agent Switched',
        message: `Now chatting with ${agent.name}`,
        duration: 2000
      });
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activeAgent.color}`}>
            <span className="text-lg">{activeAgent.avatar}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{activeAgent.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{activeAgent.specialty}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Connection Status */}
          <div className={`w-2 h-2 rounded-full ${
            isConnectedToBackend ? 'bg-green-500' : 'bg-yellow-500'
          }`} title={isConnectedToBackend ? 'Connected to Backend' : 'Demo Mode'} />

          {/* Voice Toggle */}
          <button
            onClick={() => useAppStore.getState().setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Agent Selection */}
          <button
            onClick={() => setShowAgentSelection(!showAgentSelection)}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Bot size={16} />
          </button>

          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Agent Selection Dropdown */}
      <AnimatePresence>
        {showAgentSelection && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => switchAgent(agent.id)}
                className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  agent.id === currentAgent ? 'bg-blue-50 dark:bg-blue-900' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{agent.avatar}</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{agent.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{agent.specialty}</div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!currentConversation?.messages?.length ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">{activeAgent.avatar}</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Hi! I'm {activeAgent.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {activeAgent.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleSendMessage('I need car insurance')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                Car Insurance
              </button>
              <button
                onClick={() => handleSendMessage('How much can I save?')}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                Save Money
              </button>
              <button
                onClick={() => handleSendMessage('Explain coverage options')}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ) : (
          <>
            {currentConversation.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : activeAgent.color + ' text-white'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : activeAgent.avatar}
                  </div>
                  
                  <div className={`px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p>{message.content}</p>
                    
                    {/* Game Reward */}
                    {message.gameReward && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center space-x-2"
                      >
                        <Gift size={16} className="text-yellow-600" />
                        <span className="text-sm text-yellow-700 dark:text-yellow-300">
                          {message.gameReward.description}
                        </span>
                      </motion.div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block w-full text-left px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isAITyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeAgent.color} text-white`}>
                    {activeAgent.avatar}
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Chat with ${activeAgent.name}...`}
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={isAITyping || isLoading}
            />
            
            {/* Voice Recording Button */}
            {simpleVoiceService.isRecognitionSupported() && (
              <button
                type="button"
                onClick={toggleRecording}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputMessage.trim() || isAITyping || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedAIChatInterface;
