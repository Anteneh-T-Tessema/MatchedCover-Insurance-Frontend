/**
 * MatchedCover Platform Navigation
 * Complete overview of all integrated features and capabilities
 */

'use client';

import React from 'react';
import Link from 'next/link';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: string;
  status: 'live' | 'demo' | 'test';
  category: 'ai' | 'carrier' | 'ui' | 'diagnostic';
}

export default function PlatformNavigation() {
  const features: Feature[] = [
    // AI Features
    {
      title: 'Multi-Agent AI Chat',
      description: 'Real Gemini AI integration with Maya, Alex, and Sam personalities',
      href: '/strategic-showcase',
      icon: '🤖',
      status: 'live',
      category: 'ai'
    },
    {
      title: 'AI Diagnostic Tool',
      description: 'Test Gemini API connectivity and model configuration',
      href: '/diagnostic',
      icon: '🔬',
      status: 'test',
      category: 'diagnostic'
    },
    {
      title: 'Simple AI Test',
      description: 'Direct AI agent testing interface',
      href: '/test-ai',
      icon: '🧪',
      status: 'test',
      category: 'ai'
    },

    // Carrier Integration
    {
      title: 'Live Quote Demo',
      description: 'Real-time quotes from multiple insurance carriers',
      href: '/live-quote-demo',
      icon: '🚗',
      status: 'demo',
      category: 'carrier'
    },
    {
      title: 'Carrier Dashboard',
      description: 'Monitor carrier integrations and system status',
      href: '/carrier-dashboard',
      icon: '🏢',
      status: 'live',
      category: 'carrier'
    },

    // User Interface
    {
      title: 'Homepage',
      description: 'Customer-facing entry point with AI chat integration',
      href: '/',
      icon: '🏠',
      status: 'live',
      category: 'ui'
    }
  ];

  const getStatusBadge = (status: Feature['status']) => {
    const styles = {
      live: 'bg-green-100 text-green-800',
      demo: 'bg-blue-100 text-blue-800',
      test: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getCategoryIcon = (category: Feature['category']) => {
    const icons = {
      ai: '🧠',
      carrier: '🏢',
      ui: '💻',
      diagnostic: '🔍'
    };
    return icons[category];
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const categoryNames = {
    ai: 'AI & Intelligence',
    carrier: 'Carrier Integration',
    ui: 'User Interface',
    diagnostic: 'Testing & Diagnostics'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 MatchedCover Platform
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Complete Insurance Technology Platform with AI Agents & Carrier Integration
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">🎯 Platform Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3 rounded">
                <div className="text-blue-600 font-medium">✅ Multi-Agent AI</div>
                <div className="text-gray-600">Maya, Alex, Sam</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-green-600 font-medium">✅ Real Quotes</div>
                <div className="text-gray-600">4+ Carriers</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-purple-600 font-medium">✅ Voice Support</div>
                <div className="text-gray-600">Speech Recognition</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-orange-600 font-medium">✅ Gamification</div>
                <div className="text-gray-600">Points & Rewards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Categories */}
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-3">{getCategoryIcon(category as Feature['category'])}</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {categoryNames[category as keyof typeof categoryNames]}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFeatures.map((feature) => (
                <Link key={feature.href} href={feature.href}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{feature.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      <span>Explore Feature</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* API Endpoints */}
        <div className="bg-white rounded-lg shadow p-6 mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            🔗 API Endpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quote Management</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                  <span className="font-mono">/api/quotes</span>
                </div>
                <div className="flex">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                  <span className="font-mono">/api/quotes?quoteId=xxx</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Policy Management</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                  <span className="font-mono">/api/policies</span>
                </div>
                <div className="flex">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                  <span className="font-mono">/api/policies?policyNumber=xxx</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">🏗️ Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-blue-400 mb-3">Frontend</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Next.js 14 + App Router</li>
                <li>• TypeScript (Strict Mode)</li>
                <li>• Tailwind CSS</li>
                <li>• React Hooks</li>
                <li>• PWA Capabilities</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-400 mb-3">AI Integration</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Google Gemini 2.0 Flash</li>
                <li>• Multi-Agent Orchestration</li>
                <li>• Context-Aware Responses</li>
                <li>• Multi-Language Support</li>
                <li>• Voice Recognition</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-400 mb-3">Carrier APIs</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Progressive Integration</li>
                <li>• GEICO Sandbox</li>
                <li>• State Farm Connect</li>
                <li>• Allstate API</li>
                <li>• Real-time Quotes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
