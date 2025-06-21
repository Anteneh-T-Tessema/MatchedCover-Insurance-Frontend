'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Trophy, 
  Star, 
  Zap, 
  Target,
  Gift,
  Users,
  Brain,
  Heart,
  Shield,
  MessageCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

// Import our AI Agent system (simplified types for demo)
interface GameState {
  level: number;
  points: number;
  badges: Badge[];
  streak: number;
  achievements: Achievement[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentId?: string;
  gameReward?: {
    type: string;
    value: number | string;
    description: string;
  } | undefined;
  suggestions?: string[];
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  personality: string;
  color: string;
  isActive: boolean;
}

const agents: Agent[] = [
  {
    id: 'maya-quote',
    name: 'Maya',
    avatar: '🌟',
    specialty: 'Quotes & Savings',
    personality: 'Friendly & Enthusiastic',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    isActive: true
  },
  {
    id: 'alex-underwriting',
    name: 'Alex',
    avatar: '🧠',
    specialty: 'Risk Assessment',
    personality: 'Professional & Analytical',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    isActive: false
  },
  {
    id: 'sam-claims',
    name: 'Sam',
    avatar: '❤️',
    specialty: 'Claims Support',
    personality: 'Empathetic & Helpful',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    isActive: false
  }
];

const AIChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    level: 5,
    points: 1250,
    badges: [
      { id: '1', name: 'First Quote', description: 'Got your first quote', icon: '🏆', rarity: 'common', earnedAt: new Date() },
      { id: '2', name: 'Smart Saver', description: 'Saved $500+', icon: '💰', rarity: 'rare', earnedAt: new Date() }
    ],
    streak: 7,
    achievements: [
      { id: '1', title: 'Quote Master', description: 'Get 10 quotes', progress: 7, maxProgress: 10, unlocked: false }
    ]
  });
  const [showGameReward, setShowGameReward] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      sender: 'agent',
      content: `Hi there! 👋 I'm Maya, your AI insurance assistant! I'm here to make insurance simple, fun, and rewarding. 

**Your Progress:** Level ${gameState.level} | ${gameState.points} points | ${gameState.streak} day streak 🔥

What would you like to explore today?`,
      timestamp: new Date(),
      agentId: 'maya-quote',
      suggestions: [
        '🚗 Get Auto Quote',
        '🏠 Get Home Quote', 
        '💰 Find Savings',
        '🎮 Earn Rewards'
      ]
    };
    setMessages([welcomeMessage]);
  }, [gameState.level, gameState.points, gameState.streak]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputValue, activeAgent);
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);

      // Show game reward if any
      if (agentResponse.gameReward) {
        setShowGameReward(agentResponse.gameReward);
        updateGameState(agentResponse.gameReward);
        setTimeout(() => setShowGameReward(null), 3000);
      }

      // Speak the response if enabled
      if ('speechSynthesis' in window && !isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(agentResponse.content.replace(/[🎉🌟💰🏆🎯]/g, ''));
        utterance.rate = 0.9;
        utterance.pitch = activeAgent.id === 'maya-quote' ? 1.2 : 1.0;
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const generateAgentResponse = (input: string, agent: Agent): Message => {
    const responses = {
      'maya-quote': {
        quote: `Perfect! 🎯 I'd love to help you get an amazing quote! Based on your Level ${gameState.level} status, you qualify for exclusive discounts!

Let me gather some quick info:
• What type of vehicle/property?
• Your ZIP code for local rates
• Any current insurance?

*This earns you 15 points + potential savings badge! 💰*`,
        general: `Hey! 😊 I'm super excited to help you today! As a Level ${gameState.level} member, you have access to premium features!

Here's what I can do for you:
✨ Instant quotes from top carriers
🎯 Personalized coverage recommendations  
💰 Hidden discount discovery
🏆 Exclusive member benefits

What sounds most interesting? 🌟`
      },
      'alex-underwriting': {
        risk: `Good day. I'm Alex, your underwriting specialist. I'll conduct a comprehensive risk assessment to ensure you get the most accurate pricing.

Let me analyze:
📊 Your risk profile factors
🔍 Historical data patterns
📈 Market positioning
✅ Approval likelihood

This process typically takes 2-3 minutes and can save you significantly on premiums.`,
        general: `Hello, I'm Alex. I specialize in risk assessment and policy structuring. I ensure that your coverage is properly aligned with your risk profile while optimizing your rates.

How may I assist you with the underwriting process today?`
      },
      'sam-claims': {
        claim: `Hi there! 😊 I'm Sam, and I'm here to help you through this. I know dealing with claims can be stressful, so let's make this as smooth as possible.

🤝 I'll guide you step-by-step
📱 Upload photos right from your phone
⚡ Get instant damage estimates
💬 Direct line to adjusters

What happened? I'm here to help! ❤️`,
        general: `Hey! I'm Sam, your claims support specialist. Even though I hope you never need me, I'm here 24/7 if you do! 

I make the claims process:
• Fast and simple ⚡
• Stress-free 😌  
• Transparent 🔍
• Fair 🤝

Anything I can help explain about coverage or claims? 😊`
      }
    };

    const inputLower = input.toLowerCase();
    let responseKey = 'general';
    let gameReward: { type: string; value: number | string; description: string; } | undefined = undefined;

    if (inputLower.includes('quote') || inputLower.includes('price') || inputLower.includes('cost')) {
      responseKey = 'quote';
      gameReward = { type: 'points', value: 15, description: '+15 points for quote interest!' };
    } else if (inputLower.includes('claim') || inputLower.includes('damage')) {
      responseKey = 'claim';
      gameReward = { type: 'points', value: 5, description: '+5 points for learning about claims!' };
    } else if (inputLower.includes('risk') || inputLower.includes('underwr')) {
      responseKey = 'risk';
      gameReward = { type: 'points', value: 10, description: '+10 points for risk awareness!' };
    } else if (inputLower.includes('help') || inputLower.includes('learn')) {
      gameReward = { type: 'points', value: 5, description: '+5 points for curiosity!' };
    }

    const agentResponses = responses[agent.id as keyof typeof responses] as any;
    const content = agentResponses[responseKey] || agentResponses.general;

    return {
      id: Date.now().toString(),
      sender: 'agent',
      content,
      timestamp: new Date(),
      agentId: agent.id,
      gameReward,
      suggestions: getSuggestions(agent.id, responseKey)
    };
  };

  const getSuggestions = (agentId: string, context: string): string[] => {
    const suggestions = {
      'maya-quote': {
        quote: ['🚗 Auto Quote', '🏠 Home Quote', '💰 Compare Prices', '🎯 Optimize Coverage'],
        general: ['💬 Ask Questions', '🔍 Explore Options', '💰 Find Savings', '🏆 Earn Rewards']
      },
      'alex-underwriting': {
        risk: ['📊 View Report', '🔍 Check Status', '📈 Optimize Risk', '✅ Approve'],
        general: ['📋 Risk Assessment', '🔍 Application Review', '📊 View Analytics']
      },
      'sam-claims': {
        claim: ['📱 File Claim', '📷 Upload Photos', '💬 Contact Adjuster', '📋 Check Status'],
        general: ['🤝 Claims Help', '📚 Learn Process', '📞 Get Support']
      }
    };

    const agentSuggestions = suggestions[agentId as keyof typeof suggestions] as any;
    return agentSuggestions[context] || agentSuggestions.general;
  };

  const updateGameState = (reward: any) => {
    setGameState(prev => ({
      ...prev,
      points: prev.points + (reward.type === 'points' ? reward.value : 0)
    }));
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const switchAgent = (agent: Agent) => {
    setActiveAgent(agent);
    const switchMessage: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      content: `${agent.avatar} ${agent.name} here! I'm your ${agent.specialty} specialist. How can I help you today?`,
      timestamp: new Date(),
      agentId: agent.id
    };
    setMessages(prev => [...prev, switchMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Agent Selection & Game Stats */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MatchedCover AI
              </h1>
            </div>
            
            {/* Game Stats */}
            <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Level {gameState.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">{gameState.points} pts</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">{gameState.streak} day streak</span>
              </div>
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSpeaking}
              className={`p-2 rounded-full ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Agent Selection */}
        <div className="flex space-x-2 overflow-x-auto">
          {agents.map((agent) => (
            <motion.button
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => switchAgent(agent)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all ${
                activeAgent.id === agent.id
                  ? `${agent.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{agent.avatar}</span>
              <div className="text-left">
                <div className="font-medium text-sm">{agent.name}</div>
                <div className={`text-xs ${activeAgent.id === agent.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {agent.specialty}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white shadow-md border border-gray-100'
              }`}>
                {message.sender === 'agent' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{activeAgent.avatar}</span>
                    <span className="font-medium text-gray-700">{activeAgent.name}</span>
                  </div>
                )}
                
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputValue(suggestion.replace(/[🚗🏠💰🎯🔍📊📱💬🤝📚📞]/g, '').trim())}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium hover:from-purple-200 hover:to-pink-200 transition-colors"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="bg-white shadow-md border border-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{activeAgent.avatar}</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Game Reward Notification */}
      <AnimatePresence>
        {showGameReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
              <Gift className="w-6 h-6" />
              <div>
                <div className="font-bold">Reward Earned!</div>
                <div className="text-sm opacity-90">{showGameReward.description}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Chat with ${activeAgent.name}...`}
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatInterface;
