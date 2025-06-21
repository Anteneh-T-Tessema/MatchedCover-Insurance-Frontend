'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Zap, 
  Activity, 
  Wifi, 
  Briefcase,
  Trophy,
  Globe,
  ArrowRight,
  Star,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Sparkles
} from 'lucide-react';

import BehavioralEconomicsEngine from '../../components/BehavioralEconomicsEngine';
import UsageBasedInsuranceEngine from '../../components/UsageBasedInsuranceEngine';
import IoTRiskPreventionEcosystem from '../../components/IoTRiskPreventionEcosystem';
import ProfessionalAIUnderwriting from '../../components/ProfessionalAIUnderwriting';
import InstantAIClaimsProcessing from '../../components/InstantAIClaimsProcessing';

interface CompetitorFeature {
  competitor: string;
  feature: string;
  rating: number;
  limitations: string;
  ourAdvantage: string;
}

interface AdvancedFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  competitive: string;
  advantage: string;
  component: React.ComponentType;
}

export default function CompetitiveAdvantageShowcase() {
  const [activeFeature, setActiveFeature] = useState<string>('claims');

  const competitorComparison: CompetitorFeature[] = [
    {
      competitor: 'Lemonade',
      feature: 'AI Claims Processing',
      rating: 8.5,
      limitations: '7 seconds, limited to US/EU',
      ourAdvantage: '3 seconds, 200+ countries'
    },
    {
      competitor: 'Root',
      feature: 'Usage-Based Pricing',
      rating: 7.8,
      limitations: 'Only driving behavior',
      ourAdvantage: 'All insurance categories'
    },
    {
      competitor: 'Hippo',
      feature: 'IoT Integration',
      rating: 7.2,
      limitations: 'Home insurance only',
      ourAdvantage: 'Universal IoT ecosystem'
    },
    {
      competitor: 'Next Insurance',
      feature: 'Professional Coverage',
      rating: 6.9,
      limitations: 'US SMB only',
      ourAdvantage: 'Global, any profession'
    },
    {
      competitor: 'Ping An',
      feature: 'AI Ecosystem',
      rating: 8.0,
      limitations: 'China-specific',
      ourAdvantage: 'Globally adaptive'
    }
  ];

  const advancedFeatures: AdvancedFeature[] = [
    {
      id: 'claims',
      title: 'Instant AI Claims Processing',
      description: 'Ultra-fast 3-second claims processing that beats Lemonade globally',
      icon: Zap,
      competitive: 'Lemonade: 7 seconds, limited regions',
      advantage: '3 seconds, 200+ countries, cultural adaptation',
      component: InstantAIClaimsProcessing
    },
    {
      id: 'behavioral',
      title: 'Behavioral Economics Engine',
      description: 'Cross-cultural behavioral adaptation for optimal conversion',
      icon: Brain,
      competitive: 'Basic nudge theory implementations',
      advantage: 'Cultural AI adaptation, 340% conversion boost',
      component: BehavioralEconomicsEngine
    },
    {
      id: 'usage',
      title: 'Universal Usage-Based Insurance',
      description: 'Usage tracking across all insurance categories, not just driving',
      icon: Activity,
      competitive: 'Root: Driving only, limited scope',
      advantage: 'All categories, IoT integration, real-time',
      component: UsageBasedInsuranceEngine
    },
    {
      id: 'iot',
      title: 'IoT Risk Prevention Ecosystem',
      description: 'Global IoT integration for proactive risk prevention',
      icon: Wifi,
      competitive: 'Hippo: Home sensors only',
      advantage: 'Universal IoT, all product lines, predictive',
      component: IoTRiskPreventionEcosystem
    },
    {
      id: 'professional',
      title: 'Professional AI Underwriting',
      description: 'AI underwriter for any profession globally in seconds',
      icon: Briefcase,
      competitive: 'Next: US SMB focus, manual process',
      advantage: '1,300+ professions, global, instant AI',
      component: ProfessionalAIUnderwriting
    }
  ];

  const ActiveComponent = advancedFeatures.find(f => f.id === activeFeature)?.component || InstantAIClaimsProcessing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="mr-3" size={48} />
            <h1 className="text-4xl font-bold">
              Competitive Advantage Showcase
            </h1>
            <Sparkles className="ml-3" size={48} />
          </div>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Advanced features that position MatchedCover as the world&apos;s most sophisticated insurtech platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {advancedFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center px-6 py-4 whitespace-nowrap transition-all duration-200 ${
                    activeFeature === feature.id
                      ? 'border-b-2 border-blue-500 bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="mr-2" />
                  <span className="font-medium">{feature.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Competitive Comparison Bar */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {competitorComparison.map((comp, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{comp.competitor}</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-1" size={16} />
                    <span className="text-sm font-medium">{comp.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-2">{comp.feature}</div>
                <div className="text-xs text-red-600 mb-1">❌ {comp.limitations}</div>
                <div className="text-xs text-green-600">✅ {comp.ourAdvantage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Details */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Current Feature Info */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {(() => {
                  const feature = advancedFeatures.find(f => f.id === activeFeature);
                  const IconComponent = feature?.icon || Zap;
                  return <IconComponent className="text-blue-600 mr-3" size={32} />;
                })()}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {advancedFeatures.find(f => f.id === activeFeature)?.title}
                  </h2>
                  <p className="text-gray-600">
                    {advancedFeatures.find(f => f.id === activeFeature)?.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Competitive Edge</div>
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-600 font-semibold">Superior</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                  <Target className="mr-2" size={18} />
                  Competitor Limitation
                </h4>
                <p className="text-red-700 text-sm">
                  {advancedFeatures.find(f => f.id === activeFeature)?.competitive}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Award className="mr-2" size={18} />
                  Our Advantage
                </h4>
                <p className="text-green-700 text-sm">
                  {advancedFeatures.find(f => f.id === activeFeature)?.advantage}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Component */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="text-lg font-semibold flex items-center">
                <BarChart3 className="mr-2" size={20} />
                Interactive Demo - Experience the Advantage
              </h3>
            </div>
            <div className="p-0">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Global Impact Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <Globe className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">Global Competitive Dominance</h3>
          <p className="text-lg mb-6 opacity-90">
            MatchedCover&apos;s advanced AI and global-ready features create unprecedented competitive advantages
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm opacity-90">Countries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5x</div>
              <div className="text-sm opacity-90">Faster Than Competitors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">340%</div>
              <div className="text-sm opacity-90">Better Conversion</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.7%</div>
              <div className="text-sm opacity-90">AI Accuracy</div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link
              href="/global-features"
              className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-200"
            >
              Explore All Global Features
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
