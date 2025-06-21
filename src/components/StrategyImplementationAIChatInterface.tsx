/**
 * Strategic AI Chat Interface - Enhanced Implementation
 * Features agent-specific personalities, advanced gamification, and voice interaction
 * Implements the complete strategic vision for MatchedCover AI experience
 */

'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAppStore } from '@/stores/AppStore';
import { EnhancedVoiceService } from '@/services/voice/EnhancedVoiceService';
import { geminiAIService } from '@/services/ai/GeminiAIService';
import { aiAgentQuoteService, AgentQuoteRequest } from '@/services/ai/AIAgentQuoteService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'maya' | 'alex' | 'sam';
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'action' | 'reward';
  metadata?: {
    confidence?: number;
    gameReward?: {
      type: string;
      value: number;
      description: string;
    };
    voiceEnabled?: boolean;
    agentSwitch?: boolean;
  };
}

interface AgentStatus {
  id: 'maya' | 'alex' | 'sam';
  name: string;
  status: 'active' | 'thinking' | 'available' | 'away';
  personality: string;
  catchphrase: string;
  avatar: string;
  specialties: string[];
}

export const StrategyImplementationAIChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentAgent, setCurrentAgent] = useState<'maya' | 'alex' | 'sam'>('maya');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showGameRewards, setShowGameRewards] = useState(true);
  const [agentSwitchSuggestion, setAgentSwitchSuggestion] = useState<'maya' | 'alex' | 'sam' | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceServiceRef = useRef<EnhancedVoiceService | null>(null);
  const { gameState, setGameState } = useAppStore();

  // Strategic Implementation: Agent Status Configuration
  const agentStatuses: AgentStatus[] = useMemo(() => [
    {
      id: 'maya',
      name: 'Maya',
      status: currentAgent === 'maya' ? 'active' : 'available',
      personality: 'Enthusiastic Sales Expert',
      catchphrase: "Let's find your perfect match! 💕",
      avatar: '👩‍💼',
      specialties: ['Quotes', 'Savings', 'Comparisons', 'Deals']
    },
    {
      id: 'alex',
      name: 'Alex',
      status: currentAgent === 'alex' ? 'active' : 'available',
      personality: 'Detail-Oriented Risk Analyst',
      catchphrase: 'Every detail matters for your protection 🛡️',
      avatar: '👨‍💻',
      specialties: ['Risk Assessment', 'Coverage Analysis', 'Underwriting', 'Protection']
    },
    {
      id: 'sam',
      name: 'Sam',
      status: currentAgent === 'sam' ? 'active' : 'available',
      personality: 'Empathetic Support Advocate',
      catchphrase: "I'm here to make this easy for you 🤗",
      avatar: '👩‍🔧',
      specialties: ['Claims', 'Support', 'Assistance', 'Care']
    }
  ], [currentAgent]);

  // Helper functions
  const addWelcomeMessage = useCallback(() => {
    const welcomeMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'maya',
      content: `${agentStatuses.find(a => a.id === 'maya')?.catchphrase} I'm Maya, your personal insurance AI assistant! I'm here with my teammates Alex and Sam to give you the most amazing insurance experience ever! ✨\\n\\nWhat would you like to explore today? I can help you get quotes, find savings, or connect you with Alex for detailed coverage analysis or Sam for any support needs! 🎯`,
      timestamp: new Date(),
      type: 'text',
      metadata: { voiceEnabled: true }
    };
    setMessages([welcomeMessage]);
  }, [agentStatuses]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialize voice service with agent-specific capabilities
    voiceServiceRef.current = new EnhancedVoiceService({
      personality: currentAgent,
      emotionalRange: 'expressive'
    });

    // Add welcome message with agent introduction
    addWelcomeMessage();
  }, [addWelcomeMessage, currentAgent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update voice service when agent changes
    if (voiceServiceRef.current) {
      voiceServiceRef.current.setCurrentAgent(currentAgent);
    }
  }, [currentAgent]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Analyze message for agent switching suggestion
    const suggestedAgent = analyzeMessageForAgent(inputMessage);
    if (suggestedAgent && suggestedAgent !== currentAgent) {
      setAgentSwitchSuggestion(suggestedAgent);
    }

    // Process message and generate response
    await processUserMessage(inputMessage);
  };

  const handleVoiceInput = async (transcript: string, suggestedAgent?: 'maya' | 'alex' | 'sam') => {
    const userMessage: ChatMessage = {
      id: `voice-${Date.now()}`,
      sender: 'user',
      content: transcript,
      timestamp: new Date(),
      type: 'voice'
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle agent switching suggestion from voice
    if (suggestedAgent && suggestedAgent !== currentAgent) {
      setAgentSwitchSuggestion(suggestedAgent);
    }

    await processUserMessage(transcript);
  };

  const processUserMessage = async (message: string) => {
    // Simulate AI processing delay
    const processingMessage: ChatMessage = {
      id: `processing-${Date.now()}`,
      sender: currentAgent,
      content: getProcessingMessage(),
      timestamp: new Date(),
      type: 'text',
      metadata: { confidence: 0.95 }
    };

    setMessages(prev => [...prev, processingMessage]);

    // Simulate response generation
    setTimeout(async () => {
      const response = await generateAgentResponse(message);
      
      // Remove processing message and add real response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== processingMessage.id);
        return [...filtered, response];
      });

      // Handle voice output if enabled
      if (isVoiceEnabled && voiceServiceRef.current) {
        await voiceServiceRef.current.speakAsAgent(response.content, currentAgent);
      }

      // Process gamification rewards
      if (response.metadata?.gameReward) {
        await processGameReward(response.metadata.gameReward);
      }
    }, 1500 + Math.random() * 1000);
  };

  const generateAgentResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Remove unused variable
    // const agent = agentStatuses.find(a => a.id === currentAgent)!;
    
    // Generate real AI response using the new quote service
    let content = '';
    let gameReward = null;

    try {
      // Use AI Agent Quote Service for intelligent responses with real quote data
      const agentRequest: AgentQuoteRequest = {
        userInput: userMessage,
        agentId: currentAgent,
        locale: 'en',
        userProfile: {
          age: 30, // Would come from user profile
          state: 'OH', // Would come from user profile
          hasVehicle: true,
          hasHome: false,
          riskTolerance: 'medium'
        }
      };

      const agentResponse = await aiAgentQuoteService.processQuoteRequest(agentRequest);
      content = agentResponse.aiResponse;

      // Add quote data to message if available
      if (agentResponse.quoteData && agentResponse.quoteData.length > 0) {
        content += '\n\n📊 I found some great options for you:\n';
        agentResponse.quoteData.slice(0, 3).forEach((quote, index) => {
          content += `${index + 1}. ${quote.carrierName}: $${quote.premium.annual}/year\n`;
        });
        
        if (agentResponse.estimatedSavings && agentResponse.estimatedSavings > 0) {
          content += `\n💰 You could save up to $${agentResponse.estimatedSavings} annually!`;
        }
      }

      // Set appropriate game rewards
      if (currentAgent === 'maya') {
        gameReward = { type: 'points', value: 10, description: 'Quote inquiry bonus!' };
      } else if (currentAgent === 'alex') {
        gameReward = { type: 'points', value: 15, description: 'Risk analysis reward!' };
      } else {
        gameReward = { type: 'points', value: 20, description: 'Support engagement bonus!' };
      }
      
    } catch (error) {
      console.error('AI Agent Quote Service Error:', error);
      
      // Fallback to simple AI responses if quote service fails
      try {
        if (currentAgent === 'maya') {
          content = await geminiAIService.simpleChat(
            `You are Maya, an enthusiastic insurance sales expert. Answer this question with excitement and focus on savings and deals: "${userMessage}"`, 
            'en'
          );
          gameReward = { type: 'points', value: 10, description: 'Quote inquiry bonus!' };
        } else if (currentAgent === 'alex') {
          content = await geminiAIService.simpleChat(
            `You are Alex, a detail-oriented risk analyst. Provide a technical, analytical response to: "${userMessage}"`, 
            'en'
          );
          gameReward = { type: 'points', value: 15, description: 'Risk analysis reward!' };
        } else if (currentAgent === 'sam') {
          content = await geminiAIService.simpleChat(
            `You are Sam, an empathetic support advocate. Respond with care and understanding to: "${userMessage}"`, 
            'en'
          );
          gameReward = { type: 'points', value: 20, description: 'Support engagement bonus!' };
        }
      } catch (fallbackError) {
        console.error('Fallback AI Error:', fallbackError);
        // Final fallback to personality-based responses
        if (currentAgent === 'maya') {
          content = generateMayaFallback();
          gameReward = { type: 'points', value: 10, description: 'Quote inquiry bonus!' };
        } else if (currentAgent === 'alex') {
          content = generateAlexFallback();
          gameReward = { type: 'points', value: 15, description: 'Risk analysis reward!' };
        } else if (currentAgent === 'sam') {
          content = generateSamFallback();
          gameReward = { type: 'points', value: 20, description: 'Support engagement bonus!' };
        }
      }
    }

    return {
      id: `${currentAgent}-${Date.now()}`,
      sender: currentAgent,
      content,
      timestamp: new Date(),
      type: 'text',
      metadata: {
        confidence: 0.95,
        gameReward: gameReward || undefined,
        voiceEnabled: true
      }
    };
  };

  const generateMayaFallback = (): string => {
    const responses = [
      `${agentStatuses[0].catchphrase} I absolutely LOVE helping with that! Let me work my insurance magic for you! ✨ Based on what you've told me, I can already see some incredible opportunities to save you money while getting you better coverage! 💰`,
      `Perfect! 🎯 This is exactly the kind of question that gets me excited! I've got some amazing deals that I think you're going to absolutely love! Let me break down your options in a way that'll make total sense... 💕`,
      `Oh wow, you're asking all the right questions! 🌟 I can tell you're someone who really cares about getting the best value, and I'm here for it! Let me show you some options that are going to blow your mind with how much you can save! ✨`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateAlexFallback = (): string => {
    const responses = [
      `${agentStatuses[1].catchphrase} Let me analyze this systematically for you. Based on your specific situation, I can see several important factors that will impact your coverage needs and pricing. Here's what the data tells us... 📊`,
      `Excellent question. From an underwriting perspective, this requires careful consideration of several risk factors. Let me walk you through the key elements that will determine your optimal coverage strategy... 🔍`,
      `I appreciate your attention to detail. This is exactly the kind of thorough thinking that leads to smart insurance decisions. Let me break down the technical aspects so you understand exactly how this works... 🛡️`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateSamFallback = (): string => {
    const responses = [
      `${agentStatuses[2].catchphrase} I completely understand what you're going through, and I want you to know that you're in really good hands. Let me walk you through this step by step so you feel totally comfortable with everything... 🤗`,
      `I hear you, and I want to make sure we take care of this properly. You've come to the right place, and I'm going to personally make sure everything gets handled smoothly. Here's exactly what we're going to do together... 💙`,
      `That sounds really stressful, and I'm so glad you reached out. I've helped thousands of people through exactly this situation, and I promise we're going to get this sorted out quickly and easily. Let me explain what happens next... 🌟`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getProcessingMessage = (): string => {
    const messages = {
      maya: ['Working my magic to find you the perfect deals! ✨', 'Searching through all our amazing options! 🔍', 'Finding you the best savings opportunities! 💰'],
      alex: ['Analyzing your risk profile systematically...', 'Reviewing all the technical details...', 'Calculating optimal coverage parameters...'],
      sam: ['Let me look into this for you right away...', 'Checking everything to make sure you get the best help...', 'Gathering all the information you need...']
    };
    const agentMessages = messages[currentAgent];
    return agentMessages[Math.floor(Math.random() * agentMessages.length)];
  };

  const analyzeMessageForAgent = (message: string): 'maya' | 'alex' | 'sam' => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('claim') || lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem')) {
      return 'sam';
    }
    if (lowerMessage.includes('risk') || lowerMessage.includes('coverage') || lowerMessage.includes('protect') || lowerMessage.includes('analyze')) {
      return 'alex';
    }
    return 'maya'; // Default to Maya for quotes and general inquiries
  };

  const processGameReward = async (reward: { type: string; value: number; description: string }) => {
    if (showGameRewards) {
      // Update game state with reward
      if (gameState) {
        const newGameState = {
          ...gameState,
          points: gameState.points + reward.value,
          lastActivity: new Date()
        };
        setGameState(newGameState);
      }

      // Show reward animation/notification
      setTimeout(() => {
        const rewardMessage: ChatMessage = {
          id: `reward-${Date.now()}`,
          sender: currentAgent,
          content: `🎉 Awesome! You earned ${reward.value} points for ${reward.description} Keep up the great engagement! 🌟`,
          timestamp: new Date(),
          type: 'reward'
        };
        setMessages(prev => [...prev, rewardMessage]);
      }, 500);
    }
  };

  const toggleVoice = async () => {
    if (!voiceServiceRef.current) return;

    if (isListening) {
      voiceServiceRef.current.stopRecognition();
      setIsListening(false);
    } else {
      try {
        const success = voiceServiceRef.current.startRecognition(
          (result) => {
            // Handle voice recognition result
            console.log('Voice input:', result.transcript);
            if (result.isFinal) {
              setInputMessage(result.transcript);
            }
          },
          (error) => {
            console.error('Voice recognition error:', error);
            setIsListening(false);
          },
          () => {
            setIsListening(true);
          },
          () => {
            setIsListening(false);
          }
        );
        
        if (!success) {
          console.error('Failed to start voice recognition');
        }
      } catch (error) {
        console.error('Failed to start voice recording:', error);
      }
    }
  };

  const switchAgent = (agentId: 'maya' | 'alex' | 'sam') => {
    setCurrentAgent(agentId);
    setAgentSwitchSuggestion(null);
    
    const agent = agentStatuses.find(a => a.id === agentId)!;
    const switchMessage: ChatMessage = {
      id: `switch-${Date.now()}`,
      sender: agentId,
      content: `Hi! ${agent.catchphrase} I'm ${agent.name}, and I'm excited to help you with ${agent.specialties.join(', ').toLowerCase()}! What can I do for you? 😊`,
      timestamp: new Date(),
      type: 'text',
      metadata: { agentSwitch: true, voiceEnabled: true }
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Agent Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">MatchedCover AI Assistants</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`p-2 rounded-full ${isVoiceEnabled ? 'bg-green-500' : 'bg-gray-500'} hover:bg-opacity-80 transition-colors`}
            >
              🎤
            </button>
            <button
              onClick={() => setShowGameRewards(!showGameRewards)}
              className={`p-2 rounded-full ${showGameRewards ? 'bg-yellow-500' : 'bg-gray-500'} hover:bg-opacity-80 transition-colors`}
            >
              🎮
            </button>
          </div>
        </div>
        
        {/* Agent Selection */}
        <div className="flex space-x-4">
          {agentStatuses.map((agent) => (
            <button
              key={agent.id}
              onClick={() => switchAgent(agent.id)}
              className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                currentAgent === agent.id
                  ? 'bg-white bg-opacity-20 border-2 border-white'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-15'
              }`}
            >
              <span className="text-2xl">{agent.avatar}</span>
              <div className="text-left">
                <div className="font-semibold">{agent.name}</div>
                <div className="text-xs opacity-80">{agent.personality}</div>
              </div>
              {agent.status === 'active' && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Switch Suggestion */}
      {agentSwitchSuggestion && (
        <div className="bg-yellow-100 border border-yellow-400 p-3 m-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>💡</span>
              <span className="text-sm">
                {agentStatuses.find(a => a.id === agentSwitchSuggestion)?.name} might be better suited for this question!
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => switchAgent(agentSwitchSuggestion)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Switch to {agentStatuses.find(a => a.id === agentSwitchSuggestion)?.name}
              </button>
              <button
                onClick={() => setAgentSwitchSuggestion(null)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Stay with {agentStatuses.find(a => a.id === currentAgent)?.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.type === 'reward'
                  ? 'bg-yellow-100 border border-yellow-400 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.sender !== 'user' && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">
                    {agentStatuses.find(a => a.id === message.sender)?.avatar}
                  </span>
                  <span className="font-semibold text-sm">
                    {agentStatuses.find(a => a.id === message.sender)?.name}
                  </span>
                  {message.type === 'voice' && <span className="text-xs">🎤</span>}
                </div>
              )}
              <div className="whitespace-pre-line">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask ${agentStatuses.find(a => a.id === currentAgent)?.name} anything about insurance...`}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-lg ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            disabled={!isVoiceEnabled}
          >
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
        
        {/* Current Agent Info */}
        <div className="mt-2 text-sm text-gray-600 flex items-center space-x-2">
          <span>Currently chatting with:</span>
          <span className="font-semibold text-blue-600">
            {agentStatuses.find(a => a.id === currentAgent)?.name}
          </span>
          <span>•</span>
          <span className="italic">
            {agentStatuses.find(a => a.id === currentAgent)?.specialties.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrategyImplementationAIChatInterface;
