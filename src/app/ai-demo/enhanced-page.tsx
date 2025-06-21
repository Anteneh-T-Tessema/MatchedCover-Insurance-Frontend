'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Trophy, 
  Target, 
  Users, 
  Brain,
  MessageCircle,
  Star,
  ArrowRight,
  Mic,
  Volume2,
  Shield,
  Gift,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';
import AIChatInterface from '@/components/AIChatInterface';
import SmartQuoteWizard from '@/components/SmartQuoteWizard';

type DemoMode = 'overview' | 'chat' | 'quote' | 'dashboard';

const AIInsuranceDemoPage: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState<DemoMode>('overview');

  const demoFeatures = [
    {
      id: 'chat',
      title: 'AI Chat Agents',
      description: 'Conversational AI that understands insurance and makes it fun',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      highlights: ['Gemini AI Integration', 'Voice & Text Support', 'Context Aware', 'Gamified Rewards']
    },
    {
      id: 'quote',
      title: 'Smart Quote Wizard',
      description: 'Gamified quote process with AI-powered recommendations',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      highlights: ['Step-by-Step Progress', 'Real-time Points', 'AI Risk Analysis', 'Instant Results']
    },
    {
      id: 'dashboard',
      title: 'MGA Analytics',
      description: 'Business intelligence with AI insights and gamification',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      highlights: ['Live Analytics', 'AI Predictions', 'Performance Metrics', 'Growth Insights']
    }
  ];

  const newFeatures = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Gemini AI Integration',
      description: 'Powered by Google\'s latest AI for intelligent conversations',
      status: 'Enhanced'
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Integration',
      description: 'Speech-to-text and text-to-speech using open-source tech',
      status: 'New'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Real-Time Backend',
      description: 'WebSocket connection to MatchedCover backend',
      status: 'New'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Advanced Gamification',
      description: 'NFT badges, seasonal events, and social features',
      status: 'Enhanced'
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'TTS/STT Support',
      description: 'Complete voice interaction for accessibility',
      status: 'New'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'State Management',
      description: 'Zustand-powered reactive state with persistence',
      status: 'New'
    }
  ];

  const aiAgents = [
    {
      name: 'Maya',
      avatar: '🌟',
      specialty: 'Quote Specialist',
      personality: 'Friendly & Enthusiastic',
      description: 'I help you find amazing insurance deals and save money!',
      color: 'from-purple-500 to-pink-500',
      features: ['Price Comparison', 'Savings Tips', 'Quick Quotes', 'Discount Finder']
    },
    {
      name: 'Alex',
      avatar: '🧠',
      specialty: 'Risk Analyst',
      personality: 'Professional & Analytical',
      description: 'I analyze risk factors and recommend optimal coverage.',
      color: 'from-blue-500 to-cyan-500',
      features: ['Risk Assessment', 'Coverage Analysis', 'Policy Review', 'Claim Prediction']
    },
    {
      name: 'Sam',
      avatar: '❤️',
      specialty: 'Claims Support',
      personality: 'Empathetic & Helpful',
      description: 'I guide you through claims with care and efficiency.',
      color: 'from-green-500 to-emerald-500',
      features: ['Claims Filing', 'Status Updates', 'Document Help', 'Settlement Support']
    }
  ];

  const gamificationStats = [
    { label: 'Active Users', value: '12,847', change: '+23%', icon: <Users className="w-5 h-5" /> },
    { label: 'Points Earned', value: '2.1M', change: '+156%', icon: <Star className="w-5 h-5" /> },
    { label: 'Badges Unlocked', value: '45,892', change: '+89%', icon: <Award className="w-5 h-5" /> },
    { label: 'Engagement Rate', value: '94%', change: '+12%', icon: <Heart className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🚀 Enhanced with Gemini AI & Real-Time Backend
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Future of{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Insurance
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the world&apos;s first AI-powered, gamified insurance platform that makes 
              getting coverage as engaging as playing your favorite game.
            </p>

            {/* Demo Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {demoFeatures.map((feature) => (<button
                  key={feature.id}
                  onClick={() => setCurrentDemo(feature.id as DemoMode)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentDemo === feature.id
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {feature.icon}
                  <span>{feature.title}</span>
                </button>
              ))}
              <button
                onClick={() => setCurrentDemo('overview')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentDemo === 'overview'
                    ? 'bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Target className="w-5 h-5" />
                <span>Overview</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {currentDemo === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Enhanced Features */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  🚀 Latest Enhancements
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              feature.status === 'New' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {feature.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Agents Showcase */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  🤖 Meet Your AI Insurance Agents
                </h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  {aiAgents.map((agent, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center"
                    >
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${agent.color} flex items-center justify-center text-3xl text-white shadow-lg`}>
                        {agent.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                      <p className="text-purple-600 font-semibold mb-2">{agent.specialty}</p>
                      <p className="text-gray-600 mb-4">{agent.description}</p>
                      <div className="space-y-2">
                        {agent.features.map((feature, idx) => (<div key={idx} className="bg-gray-50 rounded-lg px-3 py-1 text-sm text-gray-700">
                            {feature}
                          </div>))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gamification Stats */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  🎮 Gamification Performance
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {gamificationStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="bg-white/20 p-3 rounded-lg">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm opacity-90 mb-1">{stat.label}</div>
                      <div className="text-xs text-green-300">{stat.change}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentDemo === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">AI Chat Demo</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Enhanced with Gemini AI</span>
                  </div>
                </div>
                <div className="h-96">
                  <AIChatInterface />
                </div>
              </div>
            </motion.div>
          )}

          {currentDemo === 'quote' && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Smart Quote Wizard</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Gift className="w-4 h-4" />
                    <span>Gamified Experience</span>
                  </div>
                </div>
                <div className="h-96 overflow-y-auto">
                  <SmartQuoteWizard />
                </div>
              </div>
            </motion.div>
          )}

          {currentDemo === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">MGA Dashboard Preview</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                    <div className="text-3xl font-bold mb-1">$2.4M</div>
                    <div className="text-blue-200 text-sm">+18% this month</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Active Policies</h3>
                    <div className="text-3xl font-bold mb-1">12,847</div>
                    <div className="text-green-200 text-sm">+23% growth</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">AI Efficiency</h3>
                    <div className="text-3xl font-bold mb-1">94%</div>
                    <div className="text-purple-200 text-sm">Auto-processing rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users already enjoying AI-powered insurance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsuranceDemoPage;
