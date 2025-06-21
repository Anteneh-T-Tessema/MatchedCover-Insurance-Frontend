'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  Languages, 
  MessageSquare, 
  CheckCircle,
  MapPin,
  Zap,
  Brain,
  Star,
  ArrowRight,
  Volume2,
  DollarSign
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
  region: string;
  popularity: number;
}

interface CulturalProfile {
  country: string;
  communicationStyle: 'direct' | 'indirect' | 'formal' | 'casual';
  trustBuilders: string[];
  preferredChannels: string[];
  culturalValues: string[];
  businessHours: string;
  holidays: string[];
  paymentMethods: string[];
  currency: string;
  currencySymbol: string;
  insurancePriorities: string[];
}

interface TranslationCapability {
  language: string;
  accuracy: number;
  culturalAdaptation: number;
  voiceSupport: boolean;
  textToSpeech: boolean;
  speechToText: boolean;
  realTimeTranslation: boolean;
}

export default function GlobalAITranslationSystem() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedRegion, setSelectedRegion] = useState<string>('global');

  // Global language support - 50+ languages covering 95% of world population
  const supportedLanguages: Language[] = [
    // Major Global Languages
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Global', popularity: 100 },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', region: 'Asia', popularity: 95 },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'Asia', popularity: 85 },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Global', popularity: 90 },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'MENA', popularity: 80, rtl: true },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Americas', popularity: 75 },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', region: 'Asia', popularity: 70 },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Europe/Asia', popularity: 65 },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Asia', popularity: 60 },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Global', popularity: 70 },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe', popularity: 55 },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'Asia', popularity: 50 },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Europe', popularity: 45 },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Europe/Asia', popularity: 40 },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Asia', popularity: 40 },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Europe', popularity: 35 },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Europe', popularity: 30 },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'Europe', popularity: 25 },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', region: 'Europe', popularity: 25 },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', region: 'Europe', popularity: 25 }
  ];

  // Cultural profiles for major markets
  const culturalProfiles: Record<string, CulturalProfile> = {
    'us': {
      country: 'United States',
      communicationStyle: 'direct',
      trustBuilders: ['Transparency', 'Quick Response', 'Data Security', 'Customer Reviews'],
      preferredChannels: ['Mobile App', 'Website', 'Phone', 'Chat'],
      culturalValues: ['Individual Choice', 'Efficiency', 'Innovation', 'Value for Money'],
      businessHours: '9 AM - 6 PM EST',
      holidays: ['New Year', 'July 4th', 'Thanksgiving', 'Christmas'],
      paymentMethods: ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
      currency: 'USD',
      currencySymbol: '$',
      insurancePriorities: ['Health', 'Auto', 'Home', 'Life']
    },
    'uk': {
      country: 'United Kingdom',
      communicationStyle: 'formal',
      trustBuilders: ['Regulation Compliance', 'Heritage', 'Professional Service', 'Financial Strength'],
      preferredChannels: ['Website', 'Phone', 'Email', 'Mobile App'],
      culturalValues: ['Tradition', 'Reliability', 'Fair Play', 'Privacy'],
      businessHours: '9 AM - 5 PM GMT',
      holidays: ['New Year', 'Easter', 'Christmas', 'Bank Holidays'],
      paymentMethods: ['Debit Card', 'Credit Card', 'Direct Debit', 'PayPal'],
      currency: 'GBP',
      currencySymbol: '£',
      insurancePriorities: ['Home', 'Auto', 'Life', 'Travel']
    },
    'de': {
      country: 'Germany',
      communicationStyle: 'formal',
      trustBuilders: ['Technical Excellence', 'Compliance', 'Detailed Information', 'Long-term Stability'],
      preferredChannels: ['Website', 'Email', 'Phone', 'In-person'],
      culturalValues: ['Quality', 'Precision', 'Planning', 'Security'],
      businessHours: '8 AM - 6 PM CET',
      holidays: ['New Year', 'Easter', 'Christmas', 'Oktoberfest'],
      paymentMethods: ['SEPA', 'Credit Card', 'PayPal', 'SOFORT'],
      currency: 'EUR',
      currencySymbol: '€',
      insurancePriorities: ['Health', 'Auto', 'Home', 'Life']
    },
    'jp': {
      country: 'Japan',
      communicationStyle: 'indirect',
      trustBuilders: ['Company Reputation', 'Group Endorsement', 'Detailed Service', 'Respect'],
      preferredChannels: ['Mobile App', 'Website', 'In-person', 'LINE'],
      culturalValues: ['Harmony', 'Respect', 'Quality', 'Group Consensus'],
      businessHours: '9 AM - 6 PM JST',
      holidays: ['New Year', 'Golden Week', 'Obon', 'Christmas'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Mobile Payment', 'Cash'],
      currency: 'JPY',
      currencySymbol: '¥',
      insurancePriorities: ['Life', 'Health', 'Earthquake', 'Auto']
    },
    'in': {
      country: 'India',
      communicationStyle: 'formal',
      trustBuilders: ['Family Recommendations', 'Local Presence', 'Affordability', 'Flexibility'],
      preferredChannels: ['Mobile App', 'WhatsApp', 'Phone', 'Agent Visit'],
      culturalValues: ['Family', 'Respect for Elders', 'Value', 'Relationships'],
      businessHours: '10 AM - 7 PM IST',
      holidays: ['Diwali', 'Holi', 'Dussehra', 'Eid'],
      paymentMethods: ['UPI', 'Mobile Wallet', 'Net Banking', 'Credit Card'],
      currency: 'INR',
      currencySymbol: '₹',
      insurancePriorities: ['Health', 'Life', 'Motor', 'Crop']
    },
    'br': {
      country: 'Brazil',
      communicationStyle: 'casual',
      trustBuilders: ['Personal Relationships', 'Local Presence', 'Social Proof', 'Flexibility'],
      preferredChannels: ['WhatsApp', 'Mobile App', 'Social Media', 'Phone'],
      culturalValues: ['Relationships', 'Flexibility', 'Celebration', 'Community'],
      businessHours: '9 AM - 6 PM BRT',
      holidays: ['Carnival', 'Christmas', 'New Year', 'Independence Day'],
      paymentMethods: ['PIX', 'Credit Card', 'Boleto', 'Debit Card'],
      currency: 'BRL',
      currencySymbol: 'R$',
      insurancePriorities: ['Health', 'Auto', 'Life', 'Home']
    }
  };

  // AI Translation capabilities
  const translationCapabilities: TranslationCapability[] = [
    { language: 'English', accuracy: 99, culturalAdaptation: 100, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Spanish', accuracy: 98, culturalAdaptation: 95, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Chinese', accuracy: 97, culturalAdaptation: 90, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'French', accuracy: 98, culturalAdaptation: 95, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'German', accuracy: 97, culturalAdaptation: 94, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Japanese', accuracy: 96, culturalAdaptation: 92, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Arabic', accuracy: 95, culturalAdaptation: 88, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Portuguese', accuracy: 97, culturalAdaptation: 93, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Russian', accuracy: 96, culturalAdaptation: 89, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true },
    { language: 'Hindi', accuracy: 95, culturalAdaptation: 87, voiceSupport: true, textToSpeech: true, speechToText: true, realTimeTranslation: true }
  ];

  const getCurrentProfile = () => {
    return culturalProfiles[selectedRegion] || culturalProfiles['us'];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <span>Global AI Translation & Localization</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Serving customers in 195+ countries with culturally intelligent AI
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
            ✅ 50+ Languages
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            🌍 195+ Countries
          </div>
        </div>
      </div>

      {/* Language & Region Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Languages className="h-5 w-5 text-purple-600" />
            <span>Language Selection</span>
          </h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {supportedLanguages.slice(0, 10).map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  selectedLanguage === language.code
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{language.name}</div>
                    <div className="text-sm text-gray-600">{language.nativeName}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">{language.region}</div>
                  {selectedLanguage === language.code && (
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All 50+ Languages →
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Cultural Adaptation</span>
          </h3>
          
          <div className="space-y-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Select region"
            >
              <option value="global">🌍 Global (Default)</option>
              <option value="us">🇺🇸 United States</option>
              <option value="uk">🇬🇧 United Kingdom</option>
              <option value="de">🇩🇪 Germany</option>
              <option value="jp">🇯🇵 Japan</option>
              <option value="in">🇮🇳 India</option>
              <option value="br">🇧🇷 Brazil</option>
            </select>

            {selectedRegion !== 'global' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  {getCurrentProfile().country} Profile
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Communication Style:</span>
                    <span className="font-medium capitalize">{getCurrentProfile().communicationStyle}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Business Hours:</span>
                    <span className="font-medium">{getCurrentProfile().businessHours}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium">{getCurrentProfile().currencySymbol} {getCurrentProfile().currency}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Top Insurance Priorities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getCurrentProfile().insurancePriorities.map((priority, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {priority}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Translation Capabilities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Translation Capabilities</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {translationCapabilities.slice(0, 6).map((capability, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">{capability.language}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{capability.accuracy}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cultural Adaptation</span>
                  <span className="font-medium">{capability.culturalAdaptation}%</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  {capability.voiceSupport && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Volume2 className="h-3 w-3" />
                      <span>Voice</span>
                    </div>
                  )}
                  {capability.realTimeTranslation && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Zap className="h-3 w-3" />
                      <span>Real-time</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">AI Cultural Intelligence</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Our AI adapts communication style, tone, and content based on cultural context and local customs.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Communication style adaptation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Local business practices</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Cultural sensitivity training</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Volume2 className="h-8 w-8 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">Universal Voice Interface</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Voice support in 50+ languages with accent recognition and natural speech patterns.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Accent recognition</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Natural speech synthesis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Real-time voice translation</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900">Multi-Currency Support</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Real-time currency conversion and local payment method integration for 195+ countries.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>150+ currencies supported</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Local payment methods</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Real-time exchange rates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Coverage Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Global Insurance Revolution</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">195+</div>
            <div className="text-white/80">Countries Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-white/80">Languages Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-white/80">Global Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-white/80">Currencies</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl mb-6">Making insurance accessible to everyone, everywhere.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Explore Global Platform</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Try in Your Language</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
