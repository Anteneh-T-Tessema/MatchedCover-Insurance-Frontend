'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Clock,
  Globe,
  Headphones,
  Video,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Star,
  Send,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
  languages: string[];
}

interface SupportChannel {
  id: string;
  type: 'chat' | 'phone' | 'email' | 'video';
  name: string;
  description: string;
  availability: string;
  responseTime: string;
  languages: string[];
  icon: React.ComponentType<{ className?: string }>;
  status: 'online' | 'busy' | 'offline';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  message: string;
  timestamp: Date;
  translated?: boolean;
  originalLanguage?: string;
}

export default function UniversalCustomerSupport() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'chat'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Universal FAQ data (globally applicable)
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I get a quote?',
      answer: 'Getting a quote is simple! Click on our "Get Quote" button, fill in your basic information, and our AI will provide you with personalized options in seconds. Our system works globally with local pricing.',
      category: 'Getting Started',
      helpful: 245,
      notHelpful: 12,
      languages: ['en', 'es', 'fr', 'de', 'pt']
    },
    {
      id: '2',
      question: 'What documents do I need?',
      answer: 'Required documents vary by country and insurance type. Common documents include: ID/passport, driver\'s license (for auto), vehicle registration, proof of address. Our smart upload system recognizes documents from 200+ countries.',
      category: 'Documentation',
      helpful: 189,
      notHelpful: 8,
      languages: ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja']
    },
    {
      id: '3',
      question: 'How do I file a claim?',
      answer: 'Filing a claim is easy through our mobile app or website. Upload photos, provide details, and track your claim in real-time. Our global claims network ensures fast processing regardless of your location.',
      category: 'Claims',
      helpful: 156,
      notHelpful: 5,
      languages: ['en', 'es', 'fr', 'de', 'pt', 'zh']
    },
    {
      id: '4',
      question: 'Can I change my policy details?',
      answer: 'Yes! You can modify your policy through your account dashboard. Common changes include updating coverage amounts, adding/removing coverage types, or changing payment methods. Some changes may affect your premium.',
      category: 'Policy Management',
      helpful: 198,
      notHelpful: 15,
      languages: ['en', 'es', 'fr', 'de', 'pt']
    },
    {
      id: '5',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, bank transfers, digital wallets (PayPal, Apple Pay, Google Pay), and local payment methods in each country. Payments are processed securely with bank-level encryption.',
      category: 'Payments',
      helpful: 167,
      notHelpful: 9,
      languages: ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar']
    }
  ];

  // Universal support channels
  const supportChannels: SupportChannel[] = [
    {
      id: 'chat',
      type: 'chat',
      name: 'Live Chat',
      description: 'Instant help with AI and human agents',
      availability: '24/7',
      responseTime: 'Immediate',
      languages: ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'hi'],
      icon: MessageCircle,
      status: 'online'
    },
    {
      id: 'phone',
      type: 'phone',
      name: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: '24/7',
      responseTime: '< 1 minute',
      languages: ['en', 'es', 'fr', 'de', 'pt'],
      icon: Phone,
      status: 'online'
    },
    {
      id: 'video',
      type: 'video',
      name: 'Video Call',
      description: 'Face-to-face assistance for complex issues',
      availability: 'Business Hours',
      responseTime: '< 5 minutes',
      languages: ['en', 'es', 'fr'],
      icon: Video,
      status: 'busy'
    },
    {
      id: 'email',
      type: 'email',
      name: 'Email Support',
      description: 'Detailed responses for non-urgent questions',
      availability: '24/7',
      responseTime: '< 2 hours',
      languages: ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'hi', 'ru'],
      icon: Mail,
      status: 'online'
    }
  ];

  // Initial chat messages
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: '1',
          sender: 'bot',
          message: 'Hello! I\'m Maya, your AI insurance assistant. I can help you in multiple languages. How can I assist you today?',
          timestamp: new Date()
        }
      ]);
    }
  }, [chatMessages.length]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Filter FAQ based on search and language
  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = item.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesLanguage;
  });

  // Group FAQ by category
  const faqByCategory = filteredFAQ.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I understand you need help with that. Let me connect you with the right information.',
        'That\'s a great question! Based on your location and needs, here are your options...',
        'I can help you with that right away. Would you like me to start a quote for you?',
        'Let me check our global database for the best solutions in your area.',
        'I\'ve found several options that might work for you. Would you like me to explain them?'
      ];

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getStatusColor = (status: SupportChannel['status']) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'busy': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusDot = (status: SupportChannel['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
          <Headphones className="h-8 w-8 text-purple-600" />
          <span>Universal Customer Support</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get help in your language, 24/7 support across all time zones
        </p>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Support Language:</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            aria-label="Select support language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ar">العربية</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex border-b">
          {[
            { id: 'faq', label: 'FAQ', icon: FileText },
            { id: 'contact', label: 'Contact Us', icon: Phone },
            { id: 'chat', label: 'Live Chat', icon: MessageCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* FAQ Categories */}
              <div className="space-y-6">
                {Object.entries(faqByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                          >
                            <span className="font-medium">{item.question}</span>
                            {expandedFAQ === item.id ? (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          
                          {expandedFAQ === item.id && (
                            <div className="px-4 pb-4 border-t border-gray-200">
                              <p className="text-gray-700 mt-3 mb-4">{item.answer}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm text-gray-500">Was this helpful?</span>
                                  <div className="flex items-center space-x-2">
                                    <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                                      <ThumbsUp className="h-4 w-4" />
                                      <span className="text-sm">{item.helpful}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                                      <ThumbsDown className="h-4 w-4" />
                                      <span className="text-sm">{item.notHelpful}</span>
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">Available in:</span>
                                  <div className="flex space-x-1">
                                    {item.languages.map(lang => (
                                      <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded uppercase">
                                        {lang}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportChannels.map(channel => {
                const Icon = channel.icon;
                return (
                  <div key={channel.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Icon className="h-8 w-8 text-purple-600" />
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusDot(channel.status)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{channel.name}</h3>
                          <span className={`text-sm ${getStatusColor(channel.status)} capitalize`}>
                            {channel.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{channel.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>Available: {channel.availability}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-gray-400" />
                            <span>Response: {channel.responseTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span>Languages: {channel.languages.length}+</span>
                          </div>
                        </div>
                        
                        <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                          <span>Start {channel.name}</span>
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-96 border border-gray-200 rounded-lg p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {chatMessages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${message.sender === 'user' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}>
                          <p className="text-sm">{message.message}</p>
                          <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleChatSend}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Support Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Universal Support Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">24/7 Availability</h4>
            <p className="text-sm text-gray-600">Round-the-clock support across all time zones</p>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">190+ Languages</h4>
            <p className="text-sm text-gray-600">Native language support worldwide</p>
          </div>
          <div className="text-center">
            <Bot className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">AI-Powered</h4>
            <p className="text-sm text-gray-600">Instant answers with smart escalation</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Expert Agents</h4>
            <p className="text-sm text-gray-600">Licensed insurance professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
