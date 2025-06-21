'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  Trophy, 
  Star, 
  CheckCircle, 
  X, 
  ArrowRight,
  Brain,
  Users,
  DollarSign,
  Gamepad2,
  Bot,
  Award,
  TrendingUp,
  Heart,
  Sparkles,
  Target,
  Cpu,
  MessageSquare,
  Phone
} from 'lucide-react';

interface CompetitorFeature {
  name: string;
  matchedcover: boolean | string;
  progressive: boolean | string;
  geico: boolean | string;
  lemonade: boolean | string;
  stateFarm: boolean | string;
  category: 'ai' | 'gamification' | 'customer' | 'pricing' | 'tech';
}

interface CompanyProfile {
  name: string;
  logo: string;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  rating: number;
  marketShare: string;
  avgSavings: string;
  responseTime: string;
  claimsProcess: string;
  techInnovation: number; // 1-10 scale
  customerExp: number; // 1-10 scale
}

export default function CompetitivePositioning() {
  const [activeView, setActiveView] = useState<'comparison' | 'profiles' | 'advantages'>('comparison');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'gamification' | 'customer' | 'pricing' | 'tech'>('all');

  const features: CompetitorFeature[] = [
    // AI Features
    { name: 'Multiple AI Agent Personalities', matchedcover: '3 Specialists (Maya, Alex, Sam)', progressive: false, geico: false, lemonade: 'Basic AI', stateFarm: false, category: 'ai' },
    { name: 'Conversational AI Support', matchedcover: 'Advanced + Voice', progressive: 'Basic Chat', geico: 'Basic Chat', lemonade: 'Chat + Claims', stateFarm: 'Limited', category: 'ai' },
    { name: 'AI-Powered Risk Assessment', matchedcover: 'Real-time ML', progressive: 'Basic Scoring', geico: 'Traditional', lemonade: 'AI Claims Only', stateFarm: 'Agent-based', category: 'ai' },
    { name: 'Predictive Analytics', matchedcover: 'Full Suite', progressive: 'Limited', geico: false, lemonade: 'Claims Focus', stateFarm: false, category: 'ai' },
    
    // Gamification Features
    { name: 'Gamified User Experience', matchedcover: 'Full Gamification', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'gamification' },
    { name: 'Achievement System', matchedcover: 'Advanced Badges & Levels', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'gamification' },
    { name: 'Social Challenges', matchedcover: 'Community Challenges', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'gamification' },
    { name: 'Leaderboards', matchedcover: 'Multi-tier System', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'gamification' },
    { name: 'Reward Points System', matchedcover: 'Comprehensive', progressive: 'Safe Driving Only', geico: false, lemonade: false, stateFarm: 'Limited', category: 'gamification' },
    
    // Customer Experience
    { name: 'Instant Quote Generation', matchedcover: 'AI-Powered 30sec', progressive: '2-3 minutes', geico: '2-5 minutes', lemonade: '90 seconds', stateFarm: '5-10 minutes', category: 'customer' },
    { name: '24/7 AI Support', matchedcover: 'Always Available', progressive: 'Limited Hours', geico: 'Business Hours', lemonade: 'Chat + Email', stateFarm: 'Agent Dependent', category: 'customer' },
    { name: 'Voice-First Interface', matchedcover: 'Full Voice Control', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'customer' },
    { name: 'Mobile App Experience', matchedcover: 'AI-Enhanced', progressive: 'Standard', geico: 'Standard', lemonade: 'Modern UI', stateFarm: 'Basic', category: 'customer' },
    
    // Pricing & Value
    { name: 'Real-time Rate Comparison', matchedcover: 'Live Market Data', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'pricing' },
    { name: 'Dynamic Pricing', matchedcover: 'AI-Optimized', progressive: 'Usage-based', geico: 'Traditional', lemonade: 'Behavioral', stateFarm: 'Agent Set', category: 'pricing' },
    { name: 'Transparent Fee Structure', matchedcover: 'Zero Hidden Fees', progressive: 'Some Fees', geico: 'Various Fees', lemonade: 'Transparent', stateFarm: 'Agent Fees', category: 'pricing' },
    { name: 'MGA Model Benefits', matchedcover: 'Direct Carrier Access', progressive: false, geico: false, lemonade: false, stateFarm: false, category: 'pricing' },
    
    // Technology
    { name: 'Machine Learning Optimization', matchedcover: 'Advanced ML Pipeline', progressive: 'Basic ML', geico: 'Limited', lemonade: 'Claims ML', stateFarm: 'Traditional', category: 'tech' },
    { name: 'Real-time Data Processing', matchedcover: 'Sub-second', progressive: 'Minutes', geico: 'Hours', lemonade: 'Fast Claims', stateFarm: 'Days', category: 'tech' },
    { name: 'API-First Architecture', matchedcover: 'Full API Suite', progressive: 'Limited APIs', geico: 'Basic', lemonade: 'Modern APIs', stateFarm: 'Legacy System', category: 'tech' },
    { name: 'Cloud-Native Infrastructure', matchedcover: 'Fully Cloud', progressive: 'Hybrid', geico: 'Legacy + Cloud', lemonade: 'Cloud-Native', stateFarm: 'Mostly Legacy', category: 'tech' }
  ];

  const companies: CompanyProfile[] = [
    {
      name: 'MatchedCover',
      logo: '🛡️',
      tagline: 'AI-Powered Insurance Revolution',
      strengths: [
        'Multi-Agent AI System',
        'Gamified Experience', 
        'Real-time Rate Comparison',
        'Voice-First Interface',
        'MGA Model Efficiency',
        'Community Features'
      ],
      weaknesses: [
        'Newer Brand',
        'Building Market Share'
      ],
      rating: 4.9,
      marketShare: 'Growing Fast',
      avgSavings: '$547/year',
      responseTime: '30 seconds',
      claimsProcess: 'AI-Accelerated',
      techInnovation: 10,
      customerExp: 10
    },
    {
      name: 'Progressive',
      logo: '🏢',
      tagline: 'Name Your Price Tool',
      strengths: [
        'Usage-Based Insurance',
        'Snapshot Program',
        'Competitive Rates',
        'Good Digital Tools'
      ],
      weaknesses: [
        'Complex Pricing',
        'Limited AI',
        'No Gamification',
        'Traditional Model'
      ],
      rating: 4.2,
      marketShare: '8.9%',
      avgSavings: '$312/year',
      responseTime: '2-3 minutes',
      claimsProcess: 'Digital + Agent',
      techInnovation: 6,
      customerExp: 7
    },
    {
      name: 'GEICO',
      logo: '🦎',
      tagline: '15 Minutes Could Save You...',
      strengths: [
        'Brand Recognition',
        'Military Benefits',
        'Roadside Assistance',
        'Competitive Auto Rates'
      ],
      weaknesses: [
        'Limited Innovation',
        'Basic Digital Experience',
        'Traditional Claims',
        'No AI Features'
      ],
      rating: 4.1,
      marketShare: '12.8%',
      avgSavings: '$298/year',
      responseTime: '2-5 minutes',
      claimsProcess: 'Traditional',
      techInnovation: 4,
      customerExp: 6
    },
    {
      name: 'Lemonade',
      logo: '🍋',
      tagline: 'Insurance for the Digital Generation',
      strengths: [
        'Fast Claims (AI)',
        'Modern App Design',
        'Giveback Program',
        'Transparent Model'
      ],
      weaknesses: [
        'Limited Coverage Options',
        'Basic AI (Claims Only)',
        'Higher Rates for Some',
        'No Voice Interface'
      ],
      rating: 4.3,
      marketShare: '0.5%',
      avgSavings: '$189/year',
      responseTime: '90 seconds',
      claimsProcess: 'AI Claims',
      techInnovation: 7,
      customerExp: 8
    },
    {
      name: 'State Farm',
      logo: '🏘️',
      tagline: 'Like a Good Neighbor',
      strengths: [
        'Largest Market Share',
        'Agent Network',
        'Banking Integration',
        'Multi-Product Bundle'
      ],
      weaknesses: [
        'Legacy Technology',
        'Slow Digital Adoption',
        'Agent Dependency',
        'Higher Costs'
      ],
      rating: 4.0,
      marketShare: '16.4%',
      avgSavings: '$234/year',
      responseTime: '5-10 minutes',
      claimsProcess: 'Agent-Based',
      techInnovation: 3,
      customerExp: 5
    }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-400" />
      );
    }
    return <span className="text-sm text-gray-700 font-medium">{value}</span>;
  };

  const renderComparison = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        {[
          { id: 'all', label: 'All Features', icon: Target },
          { id: 'ai', label: 'AI Technology', icon: Brain },
          { id: 'gamification', label: 'Gamification', icon: Gamepad2 },
          { id: 'customer', label: 'Customer Experience', icon: Heart },
          { id: 'pricing', label: 'Pricing & Value', icon: DollarSign },
          { id: 'tech', label: 'Technology', icon: Cpu }
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as 'all' | 'ai' | 'gamification' | 'customer' | 'pricing' | 'tech')}
            className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-purple-700">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>MatchedCover</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Progressive</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">GEICO</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Lemonade</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">State Farm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeatures.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center bg-purple-50">
                    {renderFeatureValue(feature.matchedcover)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.progressive)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.geico)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.lemonade)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.stateFarm)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {companies.map((company) => (
          <div key={company.name} className={`text-center p-4 rounded-lg ${
            company.name === 'MatchedCover' ? 'bg-purple-100 border-2 border-purple-300' : 'bg-gray-50'
          }`}>
            <div className="text-2xl mb-2">{company.logo}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">{company.name}</div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{company.rating}</span>
            </div>
            <div className="text-xs text-gray-500">{company.avgSavings}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {companies.map((company) => (
        <div key={company.name} className={`bg-white rounded-xl shadow-lg p-6 ${
          company.name === 'MatchedCover' ? 'ring-2 ring-purple-300' : ''
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-4xl">{company.logo}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
              <p className="text-gray-600">{company.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{company.rating}</span>
              </div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">{company.avgSavings}</div>
              <div className="text-sm text-gray-600">Avg. Savings</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Strengths</h4>
              <div className="space-y-1">
                {company.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Areas for Improvement</h4>
              <div className="space-y-1">
                {company.weaknesses.map((weakness, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <X className="h-3 w-3 text-red-400 flex-shrink-0" />
                    <span className="text-gray-600">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-600">Tech Innovation</div>
                <div className="flex items-center space-x-2">
                  <div className={`flex-1 bg-gray-200 rounded-full h-2 ${
                    company.techInnovation >= 8 ? 'w-4/5' :
                    company.techInnovation >= 6 ? 'w-3/5' :
                    company.techInnovation >= 4 ? 'w-2/5' :
                    'w-1/5'
                  }`}>
                    <div className="bg-purple-600 h-2 rounded-full w-full" />
                  </div>
                  <span className="text-sm font-medium">{company.techInnovation}/10</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Customer Experience</div>
                <div className="flex items-center space-x-2">
                  <div className={`flex-1 bg-gray-200 rounded-full h-2 ${
                    company.customerExp >= 8 ? 'w-4/5' :
                    company.customerExp >= 6 ? 'w-3/5' :
                    company.customerExp >= 4 ? 'w-2/5' :
                    'w-1/5'
                  }`}>
                    <div className="bg-blue-600 h-2 rounded-full w-full" />
                  </div>
                  <span className="text-sm font-medium">{company.customerExp}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdvantages = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Why MatchedCover Wins</h2>
        <p className="text-xl opacity-90 mb-6">We&apos;re not just another insurance company - we&apos;re the future of insurance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">AI-First</div>
              <div className="text-sm opacity-80">3 Specialist Agents</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Gamepad2 className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">Gamified</div>
              <div className="text-sm opacity-80">Makes Insurance Fun</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8" />
            <div className="text-left">
              <div className="font-semibold">Best Value</div>
              <div className="text-sm opacity-80">Average $547 Savings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'World\'s First Multi-Agent AI Insurance',
            description: 'While competitors have basic chatbots, we have Maya (Sales), Alex (Claims), and Sam (Support) - each with unique personalities and expertise.',
            icon: Bot,
            advantage: 'vs. Single/No AI agents'
          },
          {
            title: 'Gamification Psychology',
            description: 'We\'re the only insurance company using gaming psychology to make insurance engaging, educational, and rewarding.',
            icon: Trophy,
            advantage: 'vs. Boring traditional interfaces'
          },
          {
            title: 'Real-Time Rate Optimization',
            description: 'Our AI continuously monitors market rates and optimizes your policy in real-time. Competitors require manual reviews.',
            icon: Zap,
            advantage: 'vs. Static pricing models'
          },
          {
            title: 'Voice-First Experience',
            description: 'Complete voice control from quotes to claims. The first truly hands-free insurance platform.',
            icon: MessageSquare,
            advantage: 'vs. Text-only interfaces'
          },
          {
            title: 'Community-Powered Learning',
            description: 'Learn from thousands of users in our social community. No competitor has built a true insurance community.',
            icon: Users,
            advantage: 'vs. Isolated customer experience'
          },
          {
            title: 'MGA Model Efficiency',
            description: 'Direct carrier relationships mean better rates, faster processing, and zero middleman markups.',
            icon: DollarSign,
            advantage: 'vs. Traditional agent models'
          }
        ].map((advantage, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <advantage.icon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 mb-3">{advantage.description}</p>
                <div className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full inline-block">
                  ✨ {advantage.advantage}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Positioning */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Market Position Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-100 p-4 rounded-lg mb-4">
              <Award className="h-8 w-8 text-red-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Traditional Leaders</h4>
            <p className="text-sm text-gray-600 mb-3">State Farm, GEICO - Large but outdated</p>
            <div className="space-y-1 text-xs">
              <div className="text-red-600">❌ No AI</div>
              <div className="text-red-600">❌ Legacy Systems</div>
              <div className="text-red-600">❌ Slow Innovation</div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <Sparkles className="h-8 w-8 text-yellow-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Digital Challengers</h4>
            <p className="text-sm text-gray-600 mb-3">Lemonade, Progressive - Modern but limited</p>
            <div className="space-y-1 text-xs">
              <div className="text-green-600">✅ Modern UI</div>
              <div className="text-yellow-600">⚠️ Basic AI</div>
              <div className="text-red-600">❌ No Gamification</div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-4">
              <Brain className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">MatchedCover</h4>
            <p className="text-sm text-gray-600 mb-3">AI-First, Gamified Future</p>
            <div className="space-y-1 text-xs">
              <div className="text-green-600">✅ Advanced AI</div>
              <div className="text-green-600">✅ Full Gamification</div>
              <div className="text-green-600">✅ Best Technology</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Competitive Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how MatchedCover&apos;s AI-powered, gamified platform compares to traditional insurance companies
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-1 flex">
            {[
              { id: 'comparison', label: 'Feature Comparison', icon: Shield },
              { id: 'profiles', label: 'Company Profiles', icon: Users },
              { id: 'advantages', label: 'Our Advantages', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as 'comparison' | 'profiles' | 'advantages')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeView === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeView === 'comparison' && renderComparison()}
        {activeView === 'profiles' && renderProfiles()}
        {activeView === 'advantages' && renderAdvantages()}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Experience the Difference</h2>
          <p className="text-lg opacity-90 mb-6">
            Don&apos;t just read about our advantages - experience them yourself
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Try AI Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Get Quote Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
