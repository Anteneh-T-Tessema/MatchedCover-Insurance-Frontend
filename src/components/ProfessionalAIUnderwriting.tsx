'use client';

import React, { useState } from 'react';
import { 
  Brain, 
  Briefcase, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Users,
  Globe,
  Activity,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

interface ProfessionData {
  id: string;
  name: string;
  category: string;
  riskLevel: number;
  premiumMultiplier: number;
  claimsHistory: number;
  practitioners: number;
  coverage: string[];
  icon: string;
}

interface UnderwritingResult {
  profession: string;
  riskScore: number;
  premiumEstimate: number;
  coverageRecommendations: string[];
  riskFactors: string[];
  mitigationStrategies: string[];
  confidence: number;
  processingTime: number;
}

interface RiskFactor {
  factor: string;
  weight: number;
  impact: 'low' | 'medium' | 'high';
  description: string;
}

export default function ProfessionalAIUnderwriting() {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [underwritingResult, setUnderwritingResult] = useState<UnderwritingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const professions: ProfessionData[] = [
    {
      id: '1',
      name: 'Software Developer',
      category: 'Technology',
      riskLevel: 25,
      premiumMultiplier: 0.8,
      claimsHistory: 12,
      practitioners: 4200000,
      coverage: ['Professional Liability', 'Cyber Security', 'Errors & Omissions'],
      icon: '💻'
    },
    {
      id: '2',
      name: 'Medical Doctor',
      category: 'Healthcare',
      riskLevel: 85,
      premiumMultiplier: 2.4,
      claimsHistory: 67,
      practitioners: 985000,
      coverage: ['Medical Malpractice', 'General Liability', 'Cyber Security'],
      icon: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Construction Manager',
      category: 'Construction',
      riskLevel: 78,
      premiumMultiplier: 1.9,
      claimsHistory: 54,
      practitioners: 356000,
      coverage: ['General Liability', 'Workers Comp', 'Professional Liability'],
      icon: '👷'
    },
    {
      id: '4',
      name: 'Financial Advisor',
      category: 'Finance',
      riskLevel: 65,
      premiumMultiplier: 1.5,
      claimsHistory: 43,
      practitioners: 270000,
      coverage: ['Professional Liability', 'Errors & Omissions', 'Cyber Security'],
      icon: '💼'
    },
    {
      id: '5',
      name: 'Lawyer',
      category: 'Legal',
      riskLevel: 72,
      premiumMultiplier: 1.8,
      claimsHistory: 58,
      practitioners: 1350000,
      coverage: ['Professional Liability', 'Malpractice', 'Cyber Security'],
      icon: '⚖️'
    },
    {
      id: '6',
      name: 'Restaurant Owner',
      category: 'Food Service',
      riskLevel: 68,
      premiumMultiplier: 1.6,
      claimsHistory: 49,
      practitioners: 650000,
      coverage: ['General Liability', 'Property', 'Workers Comp'],
      icon: '🍽️'
    }
  ];

  const categories = ['all', 'Technology', 'Healthcare', 'Construction', 'Finance', 'Legal', 'Food Service'];

  const riskFactors: RiskFactor[] = [
    {
      factor: 'Professional Experience',
      weight: 25,
      impact: 'high',
      description: 'Years of practice and track record'
    },
    {
      factor: 'Industry Claims Frequency',
      weight: 20,
      impact: 'high',
      description: 'Historical claims data for profession'
    },
    {
      factor: 'Geographic Location',
      weight: 15,
      impact: 'medium',
      description: 'Regional risk variations and regulations'
    },
    {
      factor: 'Business Size',
      weight: 12,
      impact: 'medium',
      description: 'Number of employees and revenue'
    },
    {
      factor: 'Technology Adoption',
      weight: 10,
      impact: 'low',
      description: 'Use of modern tools and security measures'
    },
    {
      factor: 'Compliance History',
      weight: 18,
      impact: 'high',
      description: 'Regulatory compliance track record'
    }
  ];

  const filteredProfessions = professions.filter(profession => {
    const matchesSearch = profession.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profession.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || profession.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const analyzeUnderwriting = async (profession: ProfessionData) => {
    setIsAnalyzing(true);
    setSelectedProfession(profession.name);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result: UnderwritingResult = {
      profession: profession.name,
      riskScore: profession.riskLevel + Math.random() * 10 - 5,
      premiumEstimate: Math.round(2400 * profession.premiumMultiplier + Math.random() * 500),
      coverageRecommendations: profession.coverage,
      riskFactors: [
        `${profession.category} industry specific risks`,
        'Professional liability exposure',
        'Market volatility impact',
        'Regulatory compliance requirements'
      ],
      mitigationStrategies: [
        'Implement comprehensive compliance program',
        'Regular professional development training',
        'Adopt industry best practices',
        'Maintain detailed documentation'
      ],
      confidence: 0.92 + Math.random() * 0.07,
      processingTime: 2.3
    };
    
    setUnderwritingResult(result);
    setIsAnalyzing(false);
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel < 30) return 'text-green-600';
    if (riskLevel < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (riskLevel: number) => {
    if (riskLevel < 30) return 'bg-green-100 text-green-800';
    if (riskLevel < 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="text-indigo-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              Professional AI Underwriting
            </h1>
            <Briefcase className="text-purple-600 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered risk assessment for any profession globally with instant underwriting decisions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search professions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Select profession category"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Profession Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="text-blue-600 mr-2" size={24} />
              Professional Categories ({filteredProfessions.length})
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredProfessions.map((profession) => (
                <div 
                  key={profession.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => analyzeUnderwriting(profession)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{profession.icon}</span>
                      <div>
                        <div className="font-medium">{profession.name}</div>
                        <div className="text-sm text-gray-500">{profession.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Risk Level</div>
                      <div className="flex items-center">
                        <span className={`font-medium ${getRiskColor(profession.riskLevel)}`}>
                          {profession.riskLevel}%
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getRiskBgColor(profession.riskLevel)}`}>
                          {profession.riskLevel < 30 ? 'Low' : profession.riskLevel < 60 ? 'Medium' : 'High'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Practitioners</div>
                      <div className="font-medium">{profession.practitioners.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-gray-500 text-sm mb-1">Coverage Types</div>
                    <div className="flex flex-wrap gap-1">
                      {profession.coverage.slice(0, 2).map((coverage, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {coverage}
                        </span>
                      ))}
                      {profession.coverage.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{profession.coverage.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Brain className="text-purple-600 mr-2" size={24} />
              AI Underwriting Analysis
            </h3>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Activity className="animate-spin text-blue-600 mb-4" size={48} />
                <h4 className="text-lg font-medium mb-2">Analyzing {selectedProfession}...</h4>
                <p className="text-gray-600 text-center">
                  Processing risk factors, claims data, and market conditions
                </p>
              </div>
            ) : underwritingResult ? (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-800">{underwritingResult.profession}</h4>
                    <div className="flex items-center">
                      <Clock className="text-blue-600 mr-1" size={16} />
                      <span className="text-sm text-blue-600">{underwritingResult.processingTime}s</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-blue-600 text-sm">Risk Score</div>
                      <div className="text-2xl font-bold text-blue-800">
                        {Math.round(underwritingResult.riskScore)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-600 text-sm">Premium Estimate</div>
                      <div className="text-2xl font-bold text-blue-800">
                        ${underwritingResult.premiumEstimate.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span className="text-sm text-green-600">
                      Confidence: {Math.round(underwritingResult.confidence * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Recommended Coverage</h5>
                  <div className="flex flex-wrap gap-2">
                    {underwritingResult.coverageRecommendations.map((coverage, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                        {coverage}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Key Risk Factors</h5>
                  <div className="space-y-2">
                    {underwritingResult.riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center">
                        <AlertTriangle className="text-orange-500 mr-2" size={16} />
                        <span className="text-sm text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Mitigation Strategies</h5>
                  <div className="space-y-2">
                    {underwritingResult.mitigationStrategies.map((strategy, index) => (
                      <div key={index} className="flex items-center">
                        <Target className="text-blue-500 mr-2" size={16} />
                        <span className="text-sm text-gray-700">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Briefcase className="mb-4" size={48} />
                <p className="text-center">
                  Select a profession to begin AI underwriting analysis
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Risk Factor Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <BarChart3 className="text-green-600 mr-2" size={24} />
            AI Risk Factor Weighting
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{factor.factor}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor.impact === 'high' ? 'bg-red-100 text-red-800' :
                    factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {factor.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Weight</span>
                  <span className="font-semibold">{factor.weight}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${factor.weight * 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Coverage */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <Globe className="mx-auto mb-4 text-yellow-300" size={48} />
            <h3 className="text-2xl font-bold mb-4">Global Professional Coverage</h3>
            <p className="text-lg mb-6 opacity-90">
              Our AI underwriting engine covers 1,300+ professional categories across 200+ countries 
              with instant risk assessment and competitive pricing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1,300+</div>
                <div className="text-sm opacity-90">Professional Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">200+</div>
                <div className="text-sm opacity-90">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2.3s</div>
                <div className="text-sm opacity-90">Average Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">96.7%</div>
                <div className="text-sm opacity-90">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
