"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Zap, 
  Trophy, 
  Star, 
  Users, 
  Target,
  Sparkles,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import AIChatInterface from '@/components/AIChatInterface';
import SmartQuoteWizard from '@/components/SmartQuoteWizard';

type DemoMode = 'overview' | 'chat' | 'quote' | 'dashboard';

const AIInsuranceDemoPage = () => {
  const [currentDemo, setCurrentDemo] = useState<DemoMode>('overview');
  const [isPlaying, setIsPlaying] = useState(false);

  const demoFeatures = [
    {
      id: 'chat',
      title: 'AI Chat Assistant',
      description: 'Meet Maya, Alex, and Sam - your AI insurance team that understands your needs and speaks your language.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      highlights: [
        'Natural conversation flow',
        'Instant personalized responses',
        'Multi-agent expertise',
        'Voice and text support'
      ]
    },
    {
      id: 'quote',
      title: 'Smart Quote Wizard',
      description: 'Get accurate quotes through a gamified, step-by-step process that makes insurance shopping fun.',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      highlights: [
        'Gamified form completion',
        'Real-time price updates',
        'Achievement rewards',
        'Smart recommendations'
      ]
    },
    {
      id: 'dashboard',
      title: 'MGA Dashboard',
      description: 'Advanced analytics and AI-powered business insights for insurance professionals and partners.',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      highlights: [
        'Real-time analytics',
        'AI-powered insights',
        'Performance tracking',
        'Predictive modeling'
      ]
    }
  ];

  const gameFeatures = [
    {
      title: 'Points & Levels',
      description: 'Earn points for every interaction, level up to unlock premium features',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      stats: '1,250+ points earned by users daily'
    },
    {
      title: 'Achievement System',
      description: 'Unlock badges and achievements for learning and engagement',
      icon: <Trophy className="w-6 h-6 text-orange-500" />,
      stats: '50+ unique badges and achievements'
    },
    {
      title: 'Social Competition',
      description: 'Compete with friends, share achievements, climb leaderboards',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      stats: '85% higher engagement vs traditional forms'
    },
    {
      title: 'Personalized Quests',
      description: 'Custom learning paths based on your insurance needs and goals',
      icon: <Target className="w-6 h-6 text-purple-500" />,
      stats: '92% quest completion rate'
    }
  ];

  const renderDemo = () => {
    switch (currentDemo) {
      case 'chat':
        return <AIChatInterface />;
      case 'quote':
        return <SmartQuoteWizard />;
      case 'dashboard':
        return (<div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">MGA Dashboard</h3>
              <p className="text-gray-600">Coming soon - Advanced analytics and AI insights</p>
            </div>
          </div>);
      default:
        return null;
    }
  };

  if (currentDemo !== 'overview') {
    return (<div className="h-screen flex flex-col">
        <div className="bg-white/90 backdrop-blur-lg border-b p-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentDemo('overview')}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Overview</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              Demo: {demoFeatures.find(f => f.id === currentDemo)?.title}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          {renderDemo()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-purple-600" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              The Future of Insurance
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              AI Agents + Gamification + Exceptional UX
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Experience insurance like never before. Our AI agents make complex insurance simple, 
              fun, and rewarding. Get personalized quotes, learn through gamification, and enjoy 
              an interface that&apos;s actually enjoyable to use.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDemo('chat')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Try AI Chat Demo</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDemo('quote')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Get Smart Quote</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce">🎮</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 animate-pulse">🏆</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce">⭐</div>
        <div className="absolute bottom-40 right-10 text-4xl opacity-20 animate-pulse">🎯</div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Our AI System is Different
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;ve reimagined insurance from the ground up with AI agents, gamification, 
            and an obsession with user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentDemo(feature.id as DemoMode)}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 cursor-pointer hover:shadow-2xl transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.highlights.map((highlight, hIndex) => (<div key={hIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                    <span className="text-sm text-gray-600">{highlight}</span>
                  </div>))}
              </div>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="mt-6 flex items-center space-x-2 text-purple-600 font-medium"
              >
                <span>Try Demo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gamification Section */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Make Insurance Fun with Gamification
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Turn learning about insurance into an engaging game. Earn points, unlock achievements, 
              and compete with friends while getting the best coverage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-6 text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                <div className="text-xs font-medium text-purple-600 bg-purple-100 rounded-full px-3 py-1">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '98%', label: 'User Satisfaction', icon: '😊' },
            { number: '3x', label: 'Faster Quotes', icon: '⚡' },
            { number: '$500+', label: 'Average Savings', icon: '💰' },
            { number: '95%', label: 'Completion Rate', icon: '🎯' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who have already discovered a better way to handle insurance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDemo('chat')}
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg"
              >
                Start with AI Chat
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDemo('quote')}
                className="px-8 py-4 bg-white/20 text-white font-semibold rounded-2xl border-2 border-white/30"
              >
                Get Smart Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIInsuranceDemoPage;
