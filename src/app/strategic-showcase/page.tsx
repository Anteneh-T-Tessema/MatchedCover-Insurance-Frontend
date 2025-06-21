/**
 * Strategic Integration Showcase Page
 * Demonstrates the complete MatchedCover strategic implementation
 * Features all AI agents, gamification, voice, and competitive advantages
 */

'use client';

import React, { useState, useEffect } from 'react';
import { StrategyImplementationAIChatInterface } from '@/components/StrategyImplementationAIChatInterface';

interface CompetitiveFeature {
  category: string;
  features: {
    name: string;
    description: string;
    competitive_advantage: string;
    implementation_status: 'complete' | 'demo' | 'planned';
  }[];
}

interface MarketPositioning {
  competitor: string;
  logo: string;
  advantages: string[];
  key_differentiator: string;
}

export default function StrategicIntegrationPage() {
  const [activeDemo, setActiveDemo] = useState<'ai' | 'gamification' | 'voice' | 'mga'>('ai');
  const [showComparison, setShowComparison] = useState(false);

  const competitiveFeatures: CompetitiveFeature[] = [
    {
      category: 'AI Innovation',
      features: [
        {
          name: 'Multi-Agent AI System',
          description: 'Three specialized AI agents with distinct personalities and expertise',
          competitive_advantage: '2-3 years ahead of single-agent competitors like Lemonade',
          implementation_status: 'complete'
        },
        {
          name: 'Voice-First Interaction',
          description: 'Natural voice commands with agent-specific voice characteristics',
          competitive_advantage: 'First insurance company with voice-native interface',
          implementation_status: 'complete'
        },
        {
          name: 'Contextual Intelligence',
          description: 'AI remembers context across conversations and sessions',
          competitive_advantage: 'Superior to chatbot-only experiences',
          implementation_status: 'demo'
        }
      ]
    },
    {
      category: 'Gamification Psychology',
      features: [
        {
          name: 'Variable Reward Schedules',
          description: 'Psychology-based rewards that create addictive engagement',
          competitive_advantage: 'First insurance platform using gaming psychology',
          implementation_status: 'complete'
        },
        {
          name: 'Social Competition',
          description: 'Leaderboards, challenges, and peer comparison features',
          competitive_advantage: 'Unique social layer in insurance industry',
          implementation_status: 'demo'
        },
        {
          name: 'Achievement System',
          description: 'Badges, quests, and milestone celebrations',
          competitive_advantage: 'Makes insurance fun and engaging',
          implementation_status: 'complete'
        }
      ]
    },
    {
      category: 'MGA Business Model',
      features: [
        {
          name: 'Unbiased Recommendations',
          description: 'No carrier bias - we recommend the best option for you',
          competitive_advantage: 'Transparent vs. traditional agent conflicts',
          implementation_status: 'complete'
        },
        {
          name: 'Real-Time Rate Comparison',
          description: 'Live comparison across multiple carriers instantly',
          competitive_advantage: 'Faster and more comprehensive than aggregators',
          implementation_status: 'complete'
        },
        {
          name: 'Flexible Product Development',
          description: 'Rapid iteration and new product launches',
          competitive_advantage: 'Agile vs. slow traditional carrier development',
          implementation_status: 'demo'
        }
      ]
    }
  ];

  const marketPositioning: MarketPositioning[] = [
    {
      competitor: 'Lemonade',
      logo: '🍋',
      advantages: [
        'Multi-agent AI vs. single chatbot',
        'Gamification psychology for retention',
        'Voice-first interaction capabilities',
        'MGA flexibility vs. carrier limitations'
      ],
      key_differentiator: 'Advanced AI personalities with gaming psychology'
    },
    {
      competitor: 'State Farm',
      logo: '🏢',
      advantages: [
        '10x faster quote process',
        'Transparent AI recommendations',
        'Mobile-first user experience',
        'Real-time rate optimization'
      ],
      key_differentiator: 'Technology-first approach vs. traditional processes'
    },
    {
      competitor: 'Root Insurance',
      logo: '📱',
      advantages: [
        'Broader coverage through MGA model',
        'Advanced engagement features',
        'Social community aspects',
        'Multi-modal interaction (voice + text)'
      ],
      key_differentiator: 'Comprehensive platform vs. single product focus'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              MatchedCover Strategic Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              The world's first AI-powered, gamified insurance platform with multi-agent personalities
              and voice-first interaction. Experience the future of insurance today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-semibold">🤖 3 AI Agents</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-semibold">🎮 Gaming Psychology</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-semibold">🎤 Voice-First</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-semibold">🏢 MGA Flexibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience Our Strategic Advantages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore each component of our market-dominating platform. See how we're 2-3 years ahead
            of traditional competitors and insurtech startups.
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveDemo('ai')}
            className={px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === 'ai'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🤖 AI Agents Demo
          </button>
          <button
            onClick={() => setActiveDemo('gamification')}
            className={px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === 'gamification'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🎮 Gamification Demo
          </button>
          <button
            onClick={() => setActiveDemo('voice')}
            className={px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === 'voice'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🎤 Voice Experience
          </button>
          <button
            onClick={() => setActiveDemo('mga')}
            className={px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === 'mga'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🏢 MGA Advantage
          </button>
        </div>

        {/* Demo Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeDemo === 'ai' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Multi-Agent AI System
                </h3>
                <p className="text-gray-600">
                  Chat with Maya (Sales), Alex (Risk Analysis), or Sam (Support). Each agent has
                  unique personality, expertise, and communication style.
                </p>
              </div>
              <StrategyImplementationAIChatInterface />
            </div>
          )}

          {activeDemo === 'gamification' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Gamification Psychology Engine
                </h3>
                <p className="text-gray-600">
                  Experience variable rewards, achievements, and social features designed using
                  addiction psychology principles.
                </p>
              </div>
              
              {/* Mock Gamification Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Your Level</h4>
                  <div className="text-3xl font-bold mb-2">7</div>
                  <div className="text-sm opacity-90">Insurance Explorer</div>
                  <div className="mt-4 bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-3/4"></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Total Points</h4>
                  <div className="text-3xl font-bold mb-2">2,847</div>
                  <div className="text-sm opacity-90">+125 this week</div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm">Next reward: </span>
                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">153 points</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Streak</h4>
                  <div className="text-3xl font-bold mb-2">12 days</div>
                  <div className="text-sm opacity-90">Personal best!</div>
                  <div className="mt-4 text-xs">
                    🔥 Fire Streak - Double points today!
                  </div>
                </div>
              </div>

              {/* Achievement Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="font-semibold text-sm">Quote Master</div>
                  <div className="text-xs text-gray-600">10 quotes completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="font-semibold text-sm">Savings Hunter</div>
                  <div className="text-xs text-gray-600">$500+ saved</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="text-4xl mb-2">🌟</div>
                  <div className="font-semibold text-sm">Early Adopter</div>
                  <div className="text-xs text-gray-600">First 1000 users</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="font-semibold text-sm">Knowledge Seeker</div>
                  <div className="text-xs text-gray-600">5 articles read</div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'voice' && (
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Voice-First Experience
              </h3>
              <p className="text-gray-600 mb-8">
                Industry-first voice interaction with agent-specific characteristics.
                Each AI agent has unique voice patterns and speech delivery.
              </p>
              
              <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-6">
                <div className="text-6xl mb-4">🎤</div>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  "Hey Maya, I need auto insurance for my new car"
                </p>
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 italic">
                    "Absolutely! I'm so excited to help you find the perfect auto insurance! 
                    Let me work my magic to find you amazing deals on coverage for your new ride! ✨"
                  </p>
                  <div className="text-xs text-blue-600 mt-2">
                    Maya - Enthusiastic, Higher Pitch, Energetic Pace
                  </div>
                </div>
                
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Try Voice Interaction
                </button>
              </div>
            </div>
          )}

          {activeDemo === 'mga' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                MGA Business Model Advantage
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Our Managing General Agent model provides unbiased recommendations and faster innovation
                compared to traditional carriers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Traditional Carriers</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• Limited to their own products</li>
                    <li>• Biased recommendations</li>
                    <li>• Slow innovation cycles</li>
                    <li>• Complex internal processes</li>
                    <li>• Agent commission conflicts</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">MatchedCover MGA</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Access to multiple carriers</li>
                    <li>• Unbiased AI recommendations</li>
                    <li>• Rapid feature development</li>
                    <li>• Streamlined technology</li>
                    <li>• Customer-first approach</li>
                  </ul>
                </div>
              </div>
              
              {/* Real-time comparison demo */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-semibold mb-4">Real-Time Rate Comparison</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Progressive</span>
                    <span className="text-green-600 font-bold">$89/month</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border-2 border-blue-500">
                    <span className="font-medium">Geico ⭐ Recommended</span>
                    <span className="text-green-600 font-bold">$76/month</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">State Farm</span>
                    <span className="text-gray-600">$94/month</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Competitive Analysis */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Dominate the Competition
            </h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {showComparison ? 'Hide' : 'Show'} Competitive Analysis
            </button>
          </div>

          {showComparison && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketPositioning.map((competitor) => (
                <div key={competitor.competitor} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{competitor.logo}</div>
                    <h3 className="text-xl font-bold">vs {competitor.competitor}</h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {competitor.advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">{advantage}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-xs text-gray-500 mb-1">Key Differentiator:</div>
                    <div className="text-sm font-medium text-blue-600">
                      {competitor.key_differentiator}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Strategic Feature Implementation
          </h2>
          
          <div className="space-y-8">
            {competitiveFeatures.map((category) => (
              <div key={category.category} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.features.map((feature) => (
                    <div key={feature.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{feature.name}</h4>
                        <span className={px-2 py-1 text-xs rounded-full ${
                          feature.implementation_status === 'complete' 
                            ? 'bg-green-100 text-green-800' 
                            : feature.implementation_status === 'demo'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {feature.implementation_status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      
                      <div className="border-t pt-3">
                        <div className="text-xs text-gray-500 mb-1">Competitive Advantage:</div>
                        <div className="text-xs font-medium text-blue-600">
                          {feature.competitive_advantage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join thousands of users already experiencing the most advanced insurance platform ever built.
            Get your quote in under 3 minutes with our AI-powered system.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Start Your Quote Journey
          </button>
        </div>
      </div>
    </div>
  );
}
