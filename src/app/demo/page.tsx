/**
 * MatchedCover Main Demo - Complete Insurance Platform
 * Showcases AI agents, Gemini integration, and insurance features
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MessageCircle, 
  Calculator, 
  Trophy, 
  Globe, 
  Zap,
  Star,
  ChevronRight,
  Play,
  Bot,
  Heart,
  Car,
  Home
} from 'lucide-react';
import AIChat from '../../components/AIChat';

interface DemoSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const demoSections: DemoSection[] = [
  {
    id: 'ai-chat',
    title: 'AI Insurance Agents',
    description: 'Meet Maya, Alex, and Sam - your AI team powered by Google Gemini',
    icon: <MessageCircle className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Real Gemini AI responses',
      'Multi-language support',
      'Agent personality switching',
      'Voice interaction',
      'Context-aware conversations'
    ]
  },
  {
    id: 'quote-engine',
    title: 'Smart Quote Engine',
    description: 'Instant insurance quotes with AI-powered risk assessment',
    icon: <Calculator className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Real-time pricing',
      'Risk factor analysis',
      'Coverage recommendations',
      'Multi-product quotes',
      'Instant comparisons'
    ]
  },
  {
    id: 'gamification',
    title: 'Gamified Experience',
    description: 'Earn points, badges, and rewards while managing insurance',
    icon: <Trophy className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Achievement system',
      'Progress tracking',
      'Reward points',
      'Level progression',
      'Social features'
    ]
  }
];

const agents = [
  {
    name: 'Maya',
    emoji: '🌟',
    role: 'Sales Specialist',
    specialty: 'Quotes & Savings',
    personality: 'Enthusiastic & Friendly',
    color: 'bg-purple-100 border-purple-300',
    textColor: 'text-purple-800'
  },
  {
    name: 'Alex',
    emoji: '🧠',
    role: 'Risk Analyst',
    specialty: 'Coverage & Assessment',
    personality: 'Professional & Analytical',
    color: 'bg-blue-100 border-blue-300',
    textColor: 'text-blue-800'
  },
  {
    name: 'Sam',
    emoji: '❤️',
    role: 'Claims Support',
    specialty: 'Help & Guidance',
    personality: 'Empathetic & Caring',
    color: 'bg-green-100 border-green-300',
    textColor: 'text-green-800'
  }
];

const insuranceProducts = [
  {
    name: 'Auto Insurance',
    icon: <Car className="w-6 h-6" />,
    coverage: 'From $89/month',
    features: ['Liability', 'Collision', 'Comprehensive'],
    savings: 'Save up to 25%'
  },
  {
    name: 'Home Insurance',
    icon: <Home className="w-6 h-6" />,
    coverage: 'From $125/month',
    features: ['Dwelling', 'Personal Property', 'Liability'],
    savings: 'Save up to 20%'
  },
  {
    name: 'Life Insurance',
    icon: <Heart className="w-6 h-6" />,
    coverage: 'From $35/month',
    features: ['Term Life', 'Whole Life', 'Universal'],
    savings: 'Save up to 30%'
  }
];

export default function MatchedCoverDemo() {
  const [showChat, setShowChat] = useState(false);
  const userStats = {
    level: 3,
    points: 1250,
    badges: 7,
    quotesGenerated: 12
  };

  const startDemo = (sectionId: string) => {
    if (sectionId === 'ai-chat') {
      setShowChat(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              MatchedCover
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Next-generation insurance platform powered by AI agents, real-time quotes, 
              and gamified user experiences. Experience the future of insurance today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Try AI Chat Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Free Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Stats Dashboard */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.points.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.badges}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.quotesGenerated}</div>
              <div className="text-sm text-gray-600">Quotes</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Your AI Insurance Team
          </h2>
          <p className="text-xl text-gray-600">
            Powered by Google Gemini AI with unique personalities and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${agent.color} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => {
                setShowChat(true);
              }}
            >
              <div className="text-4xl mb-4">{agent.emoji}</div>
              <h3 className={`text-xl font-bold ${agent.textColor} mb-2`}>
                {agent.name}
              </h3>
              <p className={`font-medium ${agent.textColor} mb-2`}>
                {agent.role}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {agent.specialty}
              </p>
              <p className="text-xs text-gray-500 italic">
                {agent.personality}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 ${agent.textColor} border border-current px-4 py-2 rounded-lg text-sm font-medium hover:bg-current hover:text-white transition-colors`}
              >
                Chat with {agent.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Demo Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {demoSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${section.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {section.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {section.description}
              </p>
              <ul className="space-y-2 mb-6">
                {section.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startDemo(section.id)}
                className={`w-full bg-gradient-to-r ${section.color} text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow`}
              >
                Try Demo
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Insurance Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Insurance Products
          </h2>
          <p className="text-lg text-gray-600">
            Get instant quotes with AI-powered recommendations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insuranceProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                {product.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                {product.coverage}
              </p>
              <div className="text-sm text-green-600 font-medium mb-4">
                {product.savings}
              </div>
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {product.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for modern insurance management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Bot className="w-8 h-8" />, title: 'AI Agents', desc: 'Smart assistance' },
              { icon: <Globe className="w-8 h-8" />, title: 'Multi-Language', desc: '7 languages supported' },
              { icon: <Zap className="w-8 h-8" />, title: 'Instant Quotes', desc: 'Real-time pricing' },
              { icon: <Star className="w-8 h-8" />, title: 'Gamification', desc: 'Earn rewards' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Future of Insurance?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who are saving money and time with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChat(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Watch Demo Video
            </motion.button>
          </div>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat
        isOpen={showChat}
        onCloseAction={() => setShowChat(false)}
      />
    </div>
  );
}
