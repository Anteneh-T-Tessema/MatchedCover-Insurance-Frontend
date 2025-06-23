'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Loader2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// Import Gemini AI Service
import { geminiAIService } from '../services/ai/GeminiAIService';

// Declare Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatProps {
  isOpen: boolean;
  onCloseAction: () => void;
  isMinimized?: boolean;
  onMinimizeAction?: () => void;
}

// Mock AI responses for demonstration (replace with actual AI service)
const mockAIResponses = {
  greeting: [
    "Hello! I'm Maya, your AI insurance assistant. How can I help you find the perfect insurance coverage today?",
    "Hi there! I'm here to help you understand insurance options and find the best coverage for your needs. What would you like to know?",
    "Welcome! I'm Maya, and I'm here to make insurance simple for you. What questions do you have about insurance coverage?"
  ],
  homeowners: [
    "Great choice! Homeowners insurance typically covers your dwelling, personal property, and liability. The average cost ranges from $1,200-$2,000 annually, but it depends on your home's value, location, and coverage limits. Would you like me to help you get a personalized quote?",
    "Homeowners insurance protects your most valuable asset. Key factors that affect your premium include: home age, construction type, location, credit score, and coverage amount. I can help you compare quotes from top-rated insurers. What's your zip code?"
  ],
  auto: [
    "Auto insurance is required in most states and covers liability, collision, and comprehensive damages. Factors affecting your rate include driving record, vehicle type, age, and location. Would you like to see how much you could save with a quick quote?",
    "Car insurance rates vary significantly by state and driver profile. On average, drivers pay $1,200-$1,800 annually. I can help you find discounts for safe driving, bundling, and more. What type of vehicle are you looking to insure?"
  ],
  life: [
    "Life insurance provides financial security for your loved ones. Term life is typically the most affordable option, while whole life builds cash value. The general rule is 10-12 times your annual income. Would you like help calculating how much coverage you need?",
    "Life insurance is one of the most important financial decisions. Term life insurance costs as little as $20-50 monthly for healthy individuals. I can help you compare term vs. whole life options. Do you have dependents who rely on your income?"
  ],
  general: [
    "I'm here to help with all your insurance questions! Whether you need home, auto, life, or business insurance, I can provide personalized recommendations and help you compare quotes from top-rated insurers.",
    "Insurance can be complex, but I'm here to make it simple! I can help you understand coverage options, compare quotes, and find the best value for your specific needs. What type of insurance are you interested in?"
  ]
};

// Enhanced speech recognition and synthesis with better error handling
class VoiceManager {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening = false;
  private isSpeaking = false;
  private isInitialized = false;

  constructor() {
    // Don't initialize during construction - will be done lazily
  }

  private initialize() {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.synthesis = window.speechSynthesis;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      if (this.recognition) {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }

    this.isInitialized = true;
  }

  startListening(onResult: (text: string) => void, onError: (error: string) => void): boolean {
    this.initialize();
    
    if (!this.recognition) {
      onError('Speech recognition not supported in this browser');
      return false;
    }

    if (this.isListening) {
      return false;
    }

    this.isListening = true;

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      this.isListening = false;
    };

    this.recognition.onerror = (event) => {
      onError(`Speech recognition error: ${event.error}`);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      return true;
    } catch {
      onError('Failed to start speech recognition');
      this.isListening = false;
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text: string, onEnd?: () => void): boolean {
    this.initialize();
    
    if (!this.synthesis) {
      return false;
    }

    // Stop any current speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    this.synthesis.speak(utterance);
    return true;
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  isSupported(): boolean {
    this.initialize();
    return !!(this.recognition && this.synthesis);
  }
}

export default function AIChat({ isOpen, onCloseAction, isMinimized = false, onMinimizeAction }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Maya, your AI insurance assistant. I can help you understand insurance options, compare quotes, and answer any questions you have. You can type or speak to me - just click the microphone button to start talking!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceManager, setVoiceManager] = useState<VoiceManager | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isMinimizedState, setIsMinimizedState] = useState(isMinimized);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize VoiceManager on client side only
  useEffect(() => {
    setVoiceManager(new VoiceManager());
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsMinimizedState(isMinimized);
  }, [isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Use Gemini AI for real responses
      const response = await geminiAIService.simpleChat(userMessage, 'en');
      return response;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      
      // Fallback to mock responses if Gemini fails
      const message = userMessage.toLowerCase();
      
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getDeterministicResponse(mockAIResponses.greeting, userMessage);
      }
      
      if (message.includes('home') || message.includes('house') || message.includes('property')) {
        return getDeterministicResponse(mockAIResponses.homeowners, userMessage);
      }
      
      if (message.includes('car') || message.includes('auto') || message.includes('vehicle') || message.includes('driving')) {
        return getDeterministicResponse(mockAIResponses.auto, userMessage);
      }
      
      if (message.includes('life') || message.includes('death') || message.includes('beneficiary')) {
        return getDeterministicResponse(mockAIResponses.life, userMessage);
      }
      
      return "I'm having a small technical issue right now, but I'm still here to help! Could you tell me more about what you're looking for with insurance?";
    }
  };

  // Helper function for deterministic fallback response selection
  const getDeterministicResponse = (responses: string[], seed: string): string => {
    const hash = seed.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    const index = Math.abs(hash) % responses.length;
    return responses[index];
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Generate AI response
    try {
      // Wait for the AI response
      const aiResponse = await generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Speak the response if voice is enabled
      if (voiceEnabled && !isSpeaking && voiceManager) {
        voiceManager.speak(aiResponse, () => setIsSpeaking(false));
        setIsSpeaking(true);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a small technical issue right now, but I'm still here to help! Could you tell me more about what you're looking for with insurance?",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!voiceManager) return;

    if (isListening) {
      voiceManager.stopListening();
      setIsListening(false);
      return;
    }

    const success = voiceManager.startListening(
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        // Auto-send voice messages
        sendMessage(transcript);
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        // Show error message
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: "Sorry, I had trouble understanding your voice. Please try typing your message or check your microphone permissions.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    );

    setIsListening(success);
  };

  const toggleVoice = () => {
    if (isSpeaking && voiceManager) {
      voiceManager.stopSpeaking();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const toggleMinimize = () => {
    setIsMinimizedState(!isMinimizedState);
    if (onMinimizeAction) onMinimizeAction();
  };

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCloseAction}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel 
                  className={`pointer-events-auto relative w-screen max-w-md transition-all duration-300 ${
                    isMinimizedState ? 'max-h-20' : 'max-h-screen'
                  }`}
                >
                  <div className={`flex h-full flex-col bg-white shadow-xl ${
                    isMinimizedState ? 'rounded-t-lg' : ''
                  }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Maya AI Assistant</h3>
                          {!isMinimizedState && (
                            <p className="text-sm text-blue-100">
                              {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Online'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!isMinimizedState && (
                          <>
                            <button
                              onClick={toggleVoice}
                              className="p-2 rounded-full hover:bg-white/20 transition-colors"
                              title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                            >
                              {voiceEnabled ? (
                                <Volume2 className="h-5 w-5" />
                              ) : (
                                <VolumeX className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={toggleMinimize}
                              className="p-2 rounded-full hover:bg-white/20 transition-colors"
                              title="Minimize"
                            >
                              <Minimize2 className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        {isMinimizedState && (
                          <button
                            onClick={toggleMinimize}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            title="Maximize"
                          >
                            <Maximize2 className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={onCloseAction}
                          className="p-2 rounded-full hover:bg-white/20 transition-colors"
                          title="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {!isMinimizedState && (
                      <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                              }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  message.sender === 'user' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                }`}>
                                  {message.sender === 'user' ? (
                                    <User className="h-4 w-4" />
                                  ) : (
                                    <Bot className="h-4 w-4" />
                                  )}
                                </div>
                                <div className={`rounded-lg px-3 py-2 ${
                                  message.sender === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-900 border border-gray-200'
                                }`}>
                                  <p className="text-sm">{message.text}</p>
                                  <p className={`text-xs mt-1 ${
                                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {message.timestamp.toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                                  <Bot className="h-4 w-4" />
                                </div>
                                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-3 py-2">
                                  <div className="flex items-center space-x-1">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Maya is typing...</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-gray-200 bg-white p-4">
                          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                              <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message or click the mic to speak..."
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isListening}
                              />
                              {voiceManager?.isSupported() && (
                                <button
                                  type="button"
                                  onClick={handleVoiceInput}
                                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                                    isListening 
                                      ? 'bg-red-500 text-white hover:bg-red-600' 
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                  title={isListening ? 'Stop listening' : 'Start voice input'}
                                >
                                  {isListening ? (
                                    <MicOff className="h-4 w-4" />
                                  ) : (
                                    <Mic className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>
                            <button
                              type="submit"
                              disabled={!inputText.trim() || isListening}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              title="Send message"
                            >
                              <Send className="h-5 w-5" />
                            </button>
                          </form>
                          
                          {!voiceManager?.isSupported() && (
                            <p className="text-xs text-gray-500 mt-2">
                              Voice features not supported in this browser
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Floating Chat Button Component
export function FloatingChatButton({ onClickAction }: { onClickAction: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClickAction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
      aria-label="Open AI Chat Assistant"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Chat with Maya AI
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      )}
    </button>
  );
}
