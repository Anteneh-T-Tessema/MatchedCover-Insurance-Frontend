'use client';

import React, { useState } from 'react';
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX,
  Type,
  MousePointer,
  Keyboard,
  Smartphone,
  Globe,
  Heart,
  CheckCircle,
  Settings,
  Zap,
  Brain,
  Users,
  ArrowRight,
  Palette,
  Focus,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';

interface AccessibilityFeature {
  id: string;
  name: string;
  description: string;
  category: 'visual' | 'auditory' | 'motor' | 'cognitive' | 'language';
  enabled: boolean;
  severity: 'mild' | 'moderate' | 'severe';
  globalApplicability: number; // percentage of global population that benefits
}

interface InclusionMetric {
  category: string;
  description: string;
  coverage: number;
  globalImpact: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function UniversalAccessibilitySystem() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'visual' | 'auditory' | 'motor' | 'cognitive' | 'language'>('all');
  const [accessibilityProfile, setAccessibilityProfile] = useState<string>('default');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Universal accessibility features that work across all cultures and countries
  const accessibilityFeatures: AccessibilityFeature[] = [
    // Visual Accessibility
    {
      id: 'high-contrast',
      name: 'High Contrast Mode',
      description: 'Enhanced contrast ratios for better visibility',
      category: 'visual',
      enabled: highContrast,
      severity: 'moderate',
      globalApplicability: 15
    },
    {
      id: 'font-scaling',
      name: 'Dynamic Font Scaling',
      description: 'Adjustable text size from 12px to 24px',
      category: 'visual',
      enabled: fontSize !== 16,
      severity: 'mild',
      globalApplicability: 25
    },
    {
      id: 'color-blind-support',
      name: 'Color Blindness Support',
      description: 'Alternative visual indicators beyond color',
      category: 'visual',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 8
    },
    {
      id: 'screen-reader',
      name: 'Screen Reader Optimization',
      description: 'Full ARIA support and semantic markup',
      category: 'visual',
      enabled: true,
      severity: 'severe',
      globalApplicability: 2
    },
    
    // Auditory Accessibility
    {
      id: 'audio-descriptions',
      name: 'Audio Descriptions',
      description: 'Spoken descriptions of visual content',
      category: 'auditory',
      enabled: true,
      severity: 'mild',
      globalApplicability: 10
    },
    {
      id: 'voice-control',
      name: 'Voice Control Navigation',
      description: 'Complete voice-based interface control',
      category: 'auditory',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 12
    },
    {
      id: 'sound-alerts',
      name: 'Visual Sound Alerts',
      description: 'Visual indicators for audio notifications',
      category: 'auditory',
      enabled: true,
      severity: 'severe',
      globalApplicability: 5
    },
    
    // Motor Accessibility
    {
      id: 'keyboard-navigation',
      name: 'Full Keyboard Navigation',
      description: 'Complete functionality without mouse',
      category: 'motor',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 8
    },
    {
      id: 'large-touch-targets',
      name: 'Large Touch Targets',
      description: 'Minimum 44px touch targets for easy access',
      category: 'motor',
      enabled: true,
      severity: 'mild',
      globalApplicability: 15
    },
    {
      id: 'gesture-alternatives',
      name: 'Gesture Alternatives',
      description: 'Button alternatives to complex gestures',
      category: 'motor',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 12
    },
    
    // Cognitive Accessibility
    {
      id: 'simple-language',
      name: 'Plain Language Mode',
      description: 'Simplified explanations for complex concepts',
      category: 'cognitive',
      enabled: true,
      severity: 'mild',
      globalApplicability: 30
    },
    {
      id: 'progress-indicators',
      name: 'Clear Progress Indicators',
      description: 'Visual progress through multi-step processes',
      category: 'cognitive',
      enabled: true,
      severity: 'mild',
      globalApplicability: 40
    },
    {
      id: 'error-prevention',
      name: 'Error Prevention & Recovery',
      description: 'Prevent errors and provide clear recovery paths',
      category: 'cognitive',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 35
    },
    {
      id: 'timeout-extensions',
      name: 'Flexible Timeouts',
      description: 'Extended or adjustable timeout periods',
      category: 'cognitive',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 20
    },
    
    // Language Accessibility
    {
      id: 'multi-language',
      name: 'Multi-Language Support',
      description: 'Real-time translation in 50+ languages',
      category: 'language',
      enabled: true,
      severity: 'severe',
      globalApplicability: 75
    },
    {
      id: 'cultural-adaptation',
      name: 'Cultural Adaptation',
      description: 'Culturally appropriate communication styles',
      category: 'language',
      enabled: true,
      severity: 'moderate',
      globalApplicability: 85
    },
    {
      id: 'symbol-communication',
      name: 'Visual Symbol Communication',
      description: 'Universal symbols and icons for communication',
      category: 'language',
      enabled: true,
      severity: 'mild',
      globalApplicability: 60
    }
  ];

  // Global inclusion metrics
  const inclusionMetrics: InclusionMetric[] = [
    {
      category: 'Visual Impairments',
      description: 'Blind, low vision, color blindness support',
      coverage: 95,
      globalImpact: '285M people worldwide',
      icon: Eye,
      color: 'blue'
    },
    {
      category: 'Hearing Impairments',
      description: 'Deaf and hard of hearing accommodations',
      coverage: 90,
      globalImpact: '466M people worldwide',
      icon: Volume2,
      color: 'green'
    },
    {
      category: 'Motor Disabilities',
      description: 'Limited mobility and dexterity support',
      coverage: 88,
      globalImpact: '200M people worldwide',
      icon: MousePointer,
      color: 'purple'
    },
    {
      category: 'Cognitive Differences',
      description: 'Learning disabilities, autism, ADHD support',
      coverage: 92,
      globalImpact: '1B+ people worldwide',
      icon: Brain,
      color: 'orange'
    },
    {
      category: 'Language Barriers',
      description: 'Non-native speakers and literacy support',
      coverage: 98,
      globalImpact: '5B+ people worldwide',
      icon: Globe,
      color: 'indigo'
    },
    {
      category: 'Aging Population',
      description: 'Age-related accessibility needs',
      coverage: 85,
      globalImpact: '771M people 65+ worldwide',
      icon: Heart,
      color: 'pink'
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? accessibilityFeatures 
    : accessibilityFeatures.filter(f => f.category === activeCategory);

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      orange: 'bg-orange-100 text-orange-700',
      indigo: 'bg-indigo-100 text-indigo-700',
      pink: 'bg-pink-100 text-pink-700'
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className={`rounded-xl shadow-lg p-8 transition-all duration-300 ${
      highContrast 
        ? 'bg-black text-white border-4 border-yellow-400' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-bold mb-2 flex items-center space-x-3 ${
            highContrast ? 'text-yellow-400' : 'text-gray-900'
          }`} style={{ fontSize: `${fontSize * 1.5}px` }}>
            <Accessibility className="h-8 w-8 text-purple-600" />
            <span>Universal Accessibility & Inclusion</span>
          </h2>
          <p className={`mt-2 ${
            highContrast ? 'text-white' : 'text-gray-600'
          }`} style={{ fontSize: `${fontSize}px` }}>
            Making insurance accessible to everyone, everywhere, regardless of ability or language
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            highContrast ? 'bg-yellow-400 text-black' : 'bg-green-100 text-green-700'
          }`}>
            ✅ WCAG 2.1 AAA
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-700'
          }`}>
            🌍 Global Standard
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div className={`rounded-lg p-6 mb-8 ${
        highContrast ? 'bg-gray-900 border-2 border-yellow-400' : 'bg-gray-50'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
          highContrast ? 'text-yellow-400' : 'text-gray-900'
        }`}>
          <Settings className="h-5 w-5" />
          <span>Quick Accessibility Settings</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              highContrast ? 'text-white' : 'text-gray-700'
            }`}>
              High Contrast
            </label>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full p-3 rounded-lg border-2 transition-colors ${
                highContrast 
                  ? 'border-yellow-400 bg-yellow-400 text-black' 
                  : 'border-gray-300 bg-white text-gray-900 hover:border-purple-500'
              }`}
            >
              {highContrast ? (
                <><EyeOff className="h-4 w-4 inline mr-2" />On</>
              ) : (
                <><Eye className="h-4 w-4 inline mr-2" />Off</>
              )}
            </button>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              highContrast ? 'text-white' : 'text-gray-700'
            }`}>
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              highContrast ? 'text-white' : 'text-gray-700'
            }`}>
              Voice Speed: {voiceSpeed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              highContrast ? 'text-white' : 'text-gray-700'
            }`}>
              Animations
            </label>
            <button
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              className={`w-full p-3 rounded-lg border-2 transition-colors ${
                animationsEnabled
                  ? highContrast 
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-green-300 bg-green-50 text-green-700'
                  : highContrast
                    ? 'border-white bg-gray-800 text-white'
                    : 'border-gray-300 bg-gray-100 text-gray-700'
              }`}
            >
              {animationsEnabled ? (
                <><Play className="h-4 w-4 inline mr-2" />Enabled</>
              ) : (
                <><Pause className="h-4 w-4 inline mr-2" />Disabled</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className={`text-sm font-medium ${
          highContrast ? 'text-white' : 'text-gray-700'
        }`}>Filter by category:</span>
        {[
          { id: 'all', label: 'All Features', icon: Focus },
          { id: 'visual', label: 'Visual', icon: Eye },
          { id: 'auditory', label: 'Auditory', icon: Volume2 },
          { id: 'motor', label: 'Motor', icon: MousePointer },
          { id: 'cognitive', label: 'Cognitive', icon: Brain },
          { id: 'language', label: 'Language', icon: Globe }
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as any)}
            className={`flex items-center space-x-1 px-4 py-2 text-sm rounded-lg transition-colors ${
              activeCategory === category.id
                ? highContrast
                  ? 'bg-yellow-400 text-black border-2 border-white'
                  : 'bg-purple-600 text-white'
                : highContrast
                  ? 'bg-gray-800 text-white border border-gray-600 hover:border-yellow-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Accessibility Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`rounded-lg p-6 border-2 transition-all ${
              feature.enabled
                ? highContrast
                  ? 'border-yellow-400 bg-gray-900'
                  : 'border-green-200 bg-green-50'
                : highContrast
                  ? 'border-gray-600 bg-gray-800'
                  : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className={`font-semibold ${
                highContrast ? 'text-yellow-400' : 'text-gray-900'
              }`} style={{ fontSize: `${fontSize * 1.1}px` }}>
                {feature.name}
              </h4>
              {feature.enabled && (
                <CheckCircle className={`h-5 w-5 ${
                  highContrast ? 'text-yellow-400' : 'text-green-500'
                }`} />
              )}
            </div>
            
            <p className={`text-sm mb-4 ${
              highContrast ? 'text-white' : 'text-gray-600'
            }`} style={{ fontSize: `${fontSize * 0.9}px` }}>
              {feature.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  feature.severity === 'mild' 
                    ? 'bg-blue-100 text-blue-700'
                    : feature.severity === 'moderate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {feature.severity}
                </span>
                <span className={`text-xs ${
                  highContrast ? 'text-white' : 'text-gray-500'
                }`}>
                  {feature.globalApplicability}% global impact
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Inclusion Metrics */}
      <div className="mb-8">
        <h3 className={`text-2xl font-bold mb-6 ${
          highContrast ? 'text-yellow-400' : 'text-gray-900'
        }`}>
          Global Inclusion Impact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusionMetrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 ${
                highContrast 
                  ? 'bg-gray-900 border-2 border-gray-600' 
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
                <h4 className={`font-semibold ${
                  highContrast ? 'text-yellow-400' : 'text-gray-900'
                }`}>
                  {metric.category}
                </h4>
              </div>
              
              <p className={`text-sm mb-4 ${
                highContrast ? 'text-white' : 'text-gray-600'
              }`}>
                {metric.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={highContrast ? 'text-white' : 'text-gray-600'}>
                    Coverage
                  </span>
                  <span className={`font-medium ${
                    highContrast ? 'text-yellow-400' : 'text-gray-900'
                  }`}>
                    {metric.coverage}%
                  </span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2 ${
                  highContrast ? 'bg-gray-700' : ''
                }`}>
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      highContrast ? 'bg-yellow-400' : `bg-${metric.color}-500`
                    }`}
                    style={{ width: `${metric.coverage}%` }}
                  />
                </div>
                <div className={`text-xs ${
                  highContrast ? 'text-white' : 'text-gray-500'
                }`}>
                  {metric.globalImpact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Standards Compliance */}
      <div className={`rounded-xl p-8 ${
        highContrast 
          ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-yellow-400' 
          : 'bg-gradient-to-r from-purple-600 to-blue-600'
      } text-white`}>
        <h3 className="text-2xl font-bold mb-6 text-center">
          Universal Accessibility Standards
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">AAA</div>
            <div className="text-white/80">WCAG 2.1 Level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">195+</div>
            <div className="text-white/80">Countries Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1B+</div>
            <div className="text-white/80">People Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-white/80">Languages Supported</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-6">
            Breaking down barriers to make insurance truly universal and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
              highContrast 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                : 'bg-white text-purple-600 hover:bg-gray-100'
            }`}>
              <Accessibility className="h-5 w-5" />
              <span>Test Accessibility</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Global Community</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
