'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Languages,
  Smartphone,
  Cloud,
  Lock,
  Award,
  Heart,
  Target,
  Lightbulb
} from 'lucide-react';
import UniversalPerformanceMonitor from '@/components/UniversalPerformanceMonitor';
import UniversalDocumentProcessor from '@/components/UniversalDocumentProcessor';
import UniversalSearchDiscovery from '@/components/UniversalSearchDiscovery';
import UniversalCustomerSupport from '@/components/UniversalCustomerSupport';

interface GlobalFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'core' | 'ai' | 'ux' | 'support' | 'security' | 'performance';
  benefits: string[];
  globalCompatibility: number;
  implementationComplexity: 'low' | 'medium' | 'high';
  regulatoryRisk: 'none' | 'low' | 'medium' | 'high';
  component?: React.ComponentType;
}

export default function GlobalFeaturesShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | GlobalFeature['category']>('all');

  const globalFeatures: GlobalFeature[] = [
    {
      id: 'performance',
      title: 'Universal Performance Monitoring',
      description: 'Real-time performance tracking and optimization that works across all browsers, devices, and network conditions globally.',
      icon: TrendingUp,
      category: 'performance',
      benefits: [
        'Cross-platform performance tracking',
        'Global CDN optimization',
        'Real-time Core Web Vitals monitoring',
        'Universal browser compatibility',
        'Automated performance alerts'
      ],
      globalCompatibility: 100,
      implementationComplexity: 'low',
      regulatoryRisk: 'none',
      component: UniversalPerformanceMonitor
    },
    {
      id: 'documents',
      title: 'Universal Document Processing',
      description: 'AI-powered document recognition and processing that supports 200+ document types from all countries.',
      icon: Cloud,
      category: 'ai',
      benefits: [
        'Global document format support',
        '190+ language recognition',
        'Cross-cultural document validation',
        'Universal security standards',
        'Real-time processing worldwide'
      ],
      globalCompatibility: 98,
      implementationComplexity: 'medium',
      regulatoryRisk: 'low',
      component: UniversalDocumentProcessor
    },
    {
      id: 'search',
      title: 'Universal Search & Discovery',
      description: 'Intelligent search system with multilingual support and cultural adaptation for global audiences.',
      icon: Globe,
      category: 'ux',
      benefits: [
        'Multi-language search capabilities',
        'Cultural relevance algorithms',
        'Global content indexing',
        'Universal filtering options',
        'Cross-platform compatibility'
      ],
      globalCompatibility: 96,
      implementationComplexity: 'medium',
      regulatoryRisk: 'none',
      component: UniversalSearchDiscovery
    },
    {
      id: 'support',
      title: 'Universal Customer Support',
      description: '24/7 multilingual customer support system with AI assistance and human escalation.',
      icon: Users,
      category: 'support',
      benefits: [
        '24/7 global availability',
        '190+ language support',
        'Cultural communication adaptation',
        'Universal time zone handling',
        'Cross-platform help integration'
      ],
      globalCompatibility: 95,
      implementationComplexity: 'high',
      regulatoryRisk: 'low',
      component: UniversalCustomerSupport
    },
    {
      id: 'progressive-web-app',
      title: 'Progressive Web Application',
      description: 'Native-like app experience that works offline and across all devices and operating systems.',
      icon: Smartphone,
      category: 'core',
      benefits: [
        'Universal device compatibility',
        'Offline functionality worldwide',
        'Cross-platform app experience',
        'Global app store distribution',
        'Universal push notifications'
      ],
      globalCompatibility: 100,
      implementationComplexity: 'medium',
      regulatoryRisk: 'none'
    },
    {
      id: 'ai-translation',
      title: 'Real-time AI Translation',
      description: 'Instant translation of all content using advanced AI that preserves context and cultural nuances.',
      icon: Languages,
      category: 'ai',
      benefits: [
        'Real-time content translation',
        'Cultural context preservation',
        'Technical term accuracy',
        'Universal language coverage',
        'Contextual adaptation'
      ],
      globalCompatibility: 92,
      implementationComplexity: 'high',
      regulatoryRisk: 'low'
    },
    {
      id: 'universal-accessibility',
      title: 'Universal Accessibility',
      description: 'Comprehensive accessibility features that exceed WCAG standards and work across all cultures.',
      icon: Heart,
      category: 'ux',
      benefits: [
        'WCAG 2.1 AAA compliance',
        'Screen reader optimization',
        'Keyboard navigation support',
        'High contrast modes',
        'Cultural accessibility patterns'
      ],
      globalCompatibility: 100,
      implementationComplexity: 'medium',
      regulatoryRisk: 'none'
    },
    {
      id: 'security-framework',
      title: 'Universal Security Framework',
      description: 'Bank-level security that adapts to global privacy laws and security standards.',
      icon: Shield,
      category: 'security',
      benefits: [
        'Global privacy law compliance',
        'Universal encryption standards',
        'Cross-border data protection',
        'Multi-factor authentication',
        'Universal audit trails'
      ],
      globalCompatibility: 98,
      implementationComplexity: 'high',
      regulatoryRisk: 'low'
    },
    {
      id: 'gamification',
      title: 'Universal Gamification Engine',
      description: 'Culturally-adaptive gamification mechanics that motivate users across all demographics.',
      icon: Award,
      category: 'ux',
      benefits: [
        'Cultural adaptation algorithms',
        'Universal motivation triggers',
        'Cross-demographic engagement',
        'Global leaderboards',
        'Inclusive reward systems'
      ],
      globalCompatibility: 88,
      implementationComplexity: 'medium',
      regulatoryRisk: 'low'
    },
    {
      id: 'smart-forms',
      title: 'Smart Universal Forms',
      description: 'Intelligent forms that adapt to local requirements while maintaining global consistency.',
      icon: Target,
      category: 'core',
      benefits: [
        'Local regulation adaptation',
        'Universal field validation',
        'Cultural input preferences',
        'Multi-format support',
        'Progressive form completion'
      ],
      globalCompatibility: 94,
      implementationComplexity: 'medium',
      regulatoryRisk: 'medium'
    },
    {
      id: 'ai-insights',
      title: 'Universal AI Insights',
      description: 'Global data analytics with cultural intelligence and privacy-compliant insights.',
      icon: Lightbulb,
      category: 'ai',
      benefits: [
        'Cross-cultural data analysis',
        'Privacy-compliant analytics',
        'Global trend identification',
        'Universal KPI tracking',
        'Cultural behavior insights'
      ],
      globalCompatibility: 90,
      implementationComplexity: 'high',
      regulatoryRisk: 'medium'
    },
    {
      id: 'real-time-sync',
      title: 'Universal Real-time Sync',
      description: 'Global data synchronization that maintains consistency across all time zones and regions.',
      icon: Zap,
      category: 'performance',
      benefits: [
        'Global data consistency',
        'Real-time synchronization',
        'Conflict resolution algorithms',
        'Universal backup systems',
        'Cross-region redundancy'
      ],
      globalCompatibility: 96,
      implementationComplexity: 'high',
      regulatoryRisk: 'low'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Features', icon: Globe },
    { id: 'core', label: 'Core Technology', icon: Zap },
    { id: 'ai', label: 'AI & Intelligence', icon: Lightbulb },
    { id: 'ux', label: 'User Experience', icon: Heart },
    { id: 'support', label: 'Customer Support', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: TrendingUp }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? globalFeatures 
    : globalFeatures.filter(feature => feature.category === selectedCategory);

  const getComplexityColor = (complexity: GlobalFeature['implementationComplexity']) => {
    switch (complexity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (risk: GlobalFeature['regulatoryRisk']) => {
    switch (risk) {
      case 'none': return 'text-green-600 bg-green-50 border-green-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const selectedFeatureData = globalFeatures.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 flex items-center justify-center space-x-4">
              <Globe className="h-12 w-12" />
              <span>Universal Global Features</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover features that work seamlessly across all nations, cultures, and regulatory environments
            </p>
            
            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">200+</div>
                <div className="text-blue-100">Countries Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300">190+</div>
                <div className="text-green-100">Languages Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-yellow-100">Global Operations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300">99.9%</div>
                <div className="text-purple-100">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Feature Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredFeatures.map(feature => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedFeature(feature.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <span className="text-sm text-gray-500 capitalize">{feature.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{feature.globalCompatibility}%</div>
                    <div className="text-xs text-gray-500">Global Ready</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-sm">{feature.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Implementation:</span>
                    <span className={`px-2 py-1 rounded text-xs border ${getComplexityColor(feature.implementationComplexity)} capitalize`}>
                      {feature.implementationComplexity}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regulatory Risk:</span>
                    <span className={`px-2 py-1 rounded text-xs border ${getRiskColor(feature.regulatoryRisk)} capitalize`}>
                      {feature.regulatoryRisk}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Key Benefits:</span>
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="mt-2 space-y-1">
                    {feature.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                    {feature.benefits.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{feature.benefits.length - 2} more benefits
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Detail Modal/Component */}
        {selectedFeature && selectedFeatureData && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                  <selectedFeatureData.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedFeatureData.title}</h2>
                  <p className="text-gray-600">{selectedFeatureData.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Feature Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedFeatureData.globalCompatibility}%</div>
                <div className="text-sm text-green-700">Global Compatibility</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 capitalize">{selectedFeatureData.implementationComplexity}</div>
                <div className="text-sm text-blue-700">Implementation</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 capitalize">{selectedFeatureData.regulatoryRisk}</div>
                <div className="text-sm text-purple-700">Regulatory Risk</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{selectedFeatureData.benefits.length}</div>
                <div className="text-sm text-yellow-700">Key Benefits</div>
              </div>
            </div>

            {/* All Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Benefits List</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedFeatureData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Component Demo */}
            {selectedFeatureData.component && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Live Interactive Demo</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <selectedFeatureData.component />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Readiness Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Lock className="h-6 w-6 text-green-600" />
            <span>Universal Implementation Guarantee</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Regulatory Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>GDPR Compliant (EU)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>CCPA Compliant (California)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SOC 2 Type II Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ISO 27001 Compliant</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Technical Standards</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>WCAG 2.1 AAA Accessibility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>PWA Standards Compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>HTTP/3 & QUIC Protocol</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>GraphQL API Standards</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Global Coverage</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>200+ Countries Supported</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.9% Uptime SLA</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-CDN Infrastructure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Global Sync</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-green-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Ready for Global Deployment</div>
              <p className="text-gray-700 max-w-2xl mx-auto">
                All features have been designed and tested to work seamlessly across cultural, linguistic, 
                and regulatory boundaries. Deploy anywhere in the world with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
