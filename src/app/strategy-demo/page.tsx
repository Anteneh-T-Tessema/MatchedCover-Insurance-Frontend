/**
 * Strategic Implementation Demonstration Page
 * Showcases all the enhanced AI agents, gamification, and voice features
 * Demonstrates the competitive advantages of MatchedCover
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/AppStore';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  status: 'implemented' | 'enhanced' | 'new';
  competitiveAdvantage: string;
}

interface AIAgentDemo {
  id: 'maya' | 'alex' | 'sam';
  name: string;
  catchphrase: string;
  personality: string;
  specialties: string[];
  voiceCharacteristics: string;
  sampleInteraction: string;
  competitiveEdge: string;
}

interface GamificationFeature {
  name: string;
  description: string;
  psychologyPrinciple: string;
  implementationDetail: string;
  competitorComparison: string;
}

export default function StrategyImplementationDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'gamification' | 'competitive'>('overview');
  const [selectedAgent, setSelectedAgent] = useState<'maya' | 'alex' | 'sam'>('maya');
  const { gameState } = useAppStore();

  // Strategic Implementation Features
  const implementedFeatures: FeatureCard[] = [
    {
      title: 'Multi-Agent AI System',
      description: 'Three specialized AI agents with distinct personalities and expertise',
      icon: '🤖',
      status: 'enhanced',
      competitiveAdvantage: '2-3 years ahead of competitors like Lemonade (single AI)'
    },
    {
      title: 'Advanced Gamification Psychology',
      description: 'Variable rewards, social comparison, loss aversion triggers',
      icon: '🎮',
      status: 'new',
      competitiveAdvantage: 'First insurance company to use gaming psychology'
    },
    {
      title: 'Voice-First AI Interaction',
      description: 'Agent-specific voice characteristics and intelligent recognition',
      icon: '🎤',
      status: 'new',
      competitiveAdvantage: 'First voice-native insurance platform'
    },
    {
      title: 'MGA Business Model',
      description: 'Flexible carrier partnerships for unbiased recommendations',
      icon: '🏢',
      status: 'implemented',
      competitiveAdvantage: 'Faster innovation than traditional carriers'
    },
    {
      title: 'Social Community Features',
      description: 'Peer learning, team challenges, and community goals',
      icon: '👥',
      status: 'enhanced',
      competitiveAdvantage: 'First social insurance platform'
    },
    {
      title: 'Real-Time Rate Comparison',
      description: 'Live comparison across multiple carriers with transparency',
      icon: '⚡',
      status: 'enhanced',
      competitiveAdvantage: 'True unbiased recommendations'
    }
  ];

  // Enhanced AI Agents
  const aiAgents: AIAgentDemo[] = [
    {
      id: 'maya',
      name: 'Maya',
      catchphrase: "Let's find your perfect match! 💕",
      personality: 'Enthusiastic Sales Expert',
      specialties: ['Quote optimization', 'Carrier selection', 'Savings discovery', 'Bundle deals'],
      voiceCharacteristics: 'Higher pitch, energetic pace, expressive emotion, enthusiastic delivery',
      sampleInteraction: "Hi! I'm absolutely thrilled to help you find amazing insurance deals! I've already spotted some incredible savings opportunities for you. Let me work my insurance magic! ✨",
      competitiveEdge: 'Most engaging sales experience in insurance industry'
    },
    {
      id: 'alex',
      name: 'Alex',
      catchphrase: 'Every detail matters for your protection 🛡️',
      personality: 'Detail-Oriented Risk Analyst',
      specialties: ['Risk assessment', 'Coverage analysis', 'Underwriting', 'Premium optimization'],
      voiceCharacteristics: 'Lower pitch, measured pace, calm emotion, authoritative delivery',
      sampleInteraction: "Hello, I'm Alex. Let me analyze your risk profile systematically. Based on the data, I can see several important factors that will optimize your coverage and pricing. Every detail matters for your protection.",
      competitiveEdge: 'Most thorough risk analysis with transparent explanations'
    },
    {
      id: 'sam',
      name: 'Sam',
      catchphrase: "I'm here to make this easy for you 🤗",
      personality: 'Empathetic Support Advocate',
      specialties: ['Claims processing', 'Customer support', 'Crisis assistance', 'Family coordination'],
      voiceCharacteristics: 'Neutral pitch, slower pace, empathetic emotion, comforting delivery',
      sampleInteraction: "Hi there! I completely understand what you're going through, and I want you to know that you're in really good hands. Let me walk you through this step by step so you feel totally comfortable. 💙",
      competitiveEdge: 'Most compassionate claims experience with emotional intelligence'
    }
  ];

  // Advanced Gamification Features
  const gamificationFeatures: GamificationFeature[] = [
    {
      name: 'Variable Reward Schedules',
      description: 'Unpredictable bonus rewards that create addiction-level engagement',
      psychologyPrinciple: 'Variable ratio reinforcement (most powerful behavioral conditioning)',
      implementationDetail: 'Random bonus multipliers, surprise rewards, time-based bonuses',
      competitorComparison: 'Lemonade: Basic progress bars | MatchedCover: Addiction psychology'
    },
    {
      name: 'Social Comparison Features',
      description: 'Peer rankings and community challenges for competitive motivation',
      psychologyPrinciple: 'Social comparison theory and competitive drive',
      implementationDetail: 'Leaderboards, peer progress, achievable rank targets',
      competitorComparison: 'Hippo: No social features | MatchedCover: Full community platform'
    },
    {
      name: 'Loss Aversion Triggers',
      description: 'Urgency messaging that prevents user disengagement',
      psychologyPrinciple: 'Loss aversion (fear of losing is stronger than joy of gaining)',
      implementationDetail: 'Streak warnings, rank threats, expiring bonuses',
      competitorComparison: 'Root: Basic notifications | MatchedCover: Psychological urgency'
    },
    {
      name: 'Achievement Celebration',
      description: 'Dopamine-releasing animations and social sharing for milestones',
      psychologyPrinciple: 'Positive reinforcement and social validation',
      implementationDetail: 'Custom animations, auto-sharing, surprise unlocks',
      competitorComparison: 'Traditional insurers: No achievements | MatchedCover: Full celebration system'
    }
  ];

  const competitiveMatrix = [
    {
      feature: 'AI Agents',
      matchedCover: '3 Specialists',
      lemonade: '1 Generic',
      hippo: 'None',
      root: 'None',
      advantage: 'HUGE'
    },
    {
      feature: 'Gamification',
      matchedCover: 'Full Psychology System',
      lemonade: 'None',
      hippo: 'None',
      root: 'None',
      advantage: 'UNIQUE'
    },
    {
      feature: 'Voice Interface',
      matchedCover: 'Agent-Specific Voices',
      lemonade: 'No',
      hippo: 'No',
      root: 'No',
      advantage: 'FIRST'
    },
    {
      feature: 'Social Features',
      matchedCover: 'Community Platform',
      lemonade: 'No',
      hippo: 'No',
      root: 'No',
      advantage: 'INNOVATIVE'
    },
    {
      feature: 'Business Model',
      matchedCover: 'Flexible MGA',
      lemonade: 'Carrier',
      hippo: 'Carrier',
      root: 'Carrier',
      advantage: 'AGILE'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 MatchedCover Strategic Implementation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary AI-powered, gamified insurance platform implementing advanced psychology 
            and multi-agent technology to dominate the $1.3 trillion insurance market
          </p>
          <div className="mt-6 inline-flex items-center space-x-4 bg-green-100 border border-green-400 rounded-lg px-6 py-3">
            <span className="text-green-800 font-semibold">✅ STRATEGIC IMPLEMENTATION COMPLETE</span>
            <span className="text-green-600">Ready for Market Dominance</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            {[
              { id: 'overview', label: '📊 Overview', desc: 'Implementation Status' },
              { id: 'agents', label: '🤖 AI Agents', desc: 'Enhanced Personalities' },
              { id: 'gamification', label: '🎮 Gamification', desc: 'Psychology Features' },
              { id: 'competitive', label: '🏆 Competitive Edge', desc: 'Market Advantages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Strategic Implementation Status</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {implementedFeatures.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        feature.status === 'new' ? 'bg-green-100 text-green-800' :
                        feature.status === 'enhanced' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {feature.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <div className="text-sm font-semibold text-yellow-800 mb-1">Competitive Advantage:</div>
                      <div className="text-sm text-yellow-700">{feature.competitiveAdvantage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Strategic Success Metrics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2-3</div>
                  <div className="text-sm text-gray-600">Years Ahead in AI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$1.3T</div>
                  <div className="text-sm text-gray-600">Market Opportunity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Implementation Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">5+</div>
                  <div className="text-sm text-gray-600">Unique Advantages</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-8">
            {/* Agent Selection */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 Enhanced AI Agent Personalities</h2>
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                  {aiAgents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAgent === agent.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {agent.id === 'maya' ? '👩‍💼' : agent.id === 'alex' ? '👨‍💻' : '👩‍🔧'}
                      </div>
                      <div className="font-semibold">{agent.name}</div>
                      <div className="text-sm text-gray-600">{agent.personality}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Agent Details */}
              {(() => {
                const agent = aiAgents.find(a => a.id === selectedAgent)!;
                return (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-4xl">
                        {agent.id === 'maya' ? '👩‍💼' : agent.id === 'alex' ? '👨‍💻' : '👩‍🔧'}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold">{agent.name}</h3>
                        <p className="text-lg text-gray-600">{agent.personality}</p>
                        <p className="text-blue-600 font-semibold">{agent.catchphrase}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">🎯 Specialties</h4>
                        <ul className="space-y-2">
                          {agent.specialties.map((specialty, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span>{specialty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">🎤 Voice Characteristics</h4>
                        <p className="text-gray-600">{agent.voiceCharacteristics}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">💬 Sample Interaction</h4>
                      <div className="bg-gray-50 border rounded-lg p-4">
                        <p className="italic">"{agent.sampleInteraction}"</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🏆 Competitive Edge</h4>
                      <p className="text-green-700">{agent.competitiveEdge}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {activeTab === 'gamification' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 Advanced Gamification Psychology</h2>
              <div className="space-y-6">
                {gamificationFeatures.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">{feature.name}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">📋 Description</h4>
                        <p className="text-gray-700 mb-4">{feature.description}</p>
                        
                        <h4 className="font-semibold text-purple-600 mb-2">🧠 Psychology Principle</h4>
                        <p className="text-gray-700">{feature.psychologyPrinciple}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">⚙️ Implementation</h4>
                        <p className="text-gray-700 mb-4">{feature.implementationDetail}</p>
                        
                        <h4 className="font-semibold text-orange-600 mb-2">🏆 vs Competitors</h4>
                        <p className="text-gray-700">{feature.competitorComparison}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitive' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Competitive Advantage Matrix</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-600">MatchedCover</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Lemonade</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Hippo</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Root</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveMatrix.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">{row.feature}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50 font-semibold text-blue-700">
                          {row.matchedCover}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">{row.lemonade}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">{row.hippo}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">{row.root}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            row.advantage === 'HUGE' ? 'bg-green-100 text-green-800' :
                            row.advantage === 'UNIQUE' ? 'bg-purple-100 text-purple-800' :
                            row.advantage === 'FIRST' ? 'bg-blue-100 text-blue-800' :
                            row.advantage === 'INNOVATIVE' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            ✅ {row.advantage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Positioning */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Market Positioning Strategy</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="font-bold text-lg mb-2">Technology Leader</h3>
                  <p className="text-gray-600">2-3 years ahead with multi-agent AI and voice-first interface</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl mb-4">🎮</div>
                  <h3 className="font-bold text-lg mb-2">Engagement Pioneer</h3>
                  <p className="text-gray-600">First truly addictive insurance experience through gamification</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="font-bold text-lg mb-2">Agility Champion</h3>
                  <p className="text-gray-600">MGA model enables faster innovation than traditional carriers</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">🚀 Ready for Market Domination</h2>
          <p className="text-xl mb-6">
            Strategic implementation complete. Platform ready to revolutionize the $1.3 trillion insurance market.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="font-bold">Next Steps:</div>
              <div className="text-sm">Execute 90-day go-to-market plan</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="font-bold">Target:</div>
              <div className="text-sm">10,000 customers in Q1 2025</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="font-bold">Goal:</div>
              <div className="text-sm">Market leadership by 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
