'use client';

import React, { useState } from 'react';
import { SmartQuoteEngine, SmartQuoteInput, SmartQuoteResult } from '@/services/SmartQuoteEngine';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Users, 
  DollarSign, 
  Target,
  Zap,
  AlertTriangle
} from 'lucide-react';

const MGASmartQuote: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<SmartQuoteResult | null>(null);
  const [formData, setFormData] = useState<Partial<SmartQuoteInput>>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: new Date('1985-06-15'),
    street: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    coverageType: 'auto',
    coverageAmount: 100000,
    deductible: 1000,
    creditScore: 720,
    occupation: 'Software Engineer'
  });

  const smartQuoteEngine = new SmartQuoteEngine();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await smartQuoteEngine.generateSmartQuote(formData as SmartQuoteInput);
      setQuoteResult(result);
    } catch (error) {
      console.error('Quote generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SmartQuoteInput, value: string | number | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRiskColor = (profile: string) => {
    switch (profile) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <Zap className="w-6 h-6 text-yellow-500" />
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Smart MGA + AI Quote Engine
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the sweet spot of modern insurtech: AI-powered underwriting + carrier partnerships + optimized profitability
        </p>
      </div>

      {/* Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <div className="text-center">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">AI Underwriting</h3>
          <p className="text-sm text-gray-600">Real-time risk assessment</p>
        </div>
        <div className="text-center">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Carrier Network</h3>
          <p className="text-sm text-gray-600">Optimal partner matching</p>
        </div>
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Profit Optimization</h3>
          <p className="text-sm text-gray-600">Maximum margin analysis</p>
        </div>
        <div className="text-center">
          <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Smart Pricing</h3>
          <p className="text-sm text-gray-600">Competitive + profitable</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Smart Quote</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={formData.zipCode || ''}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={formData.coverageType || 'auto'}
              onChange={(e) => handleInputChange('coverageType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              title="Select coverage type"
            >
              <option value="auto">Auto Insurance</option>
              <option value="homeowners">Homeowners Insurance</option>
              <option value="life">Life Insurance</option>
              <option value="umbrella">Umbrella Policy</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Coverage Amount"
                value={formData.coverageAmount || ''}
                onChange={(e) => handleInputChange('coverageAmount', Number(e.target.value))}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Deductible"
                value={formData.deductible || ''}
                onChange={(e) => handleInputChange('deductible', Number(e.target.value))}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <input
              type="number"
              placeholder="Credit Score (optional)"
              value={formData.creditScore || ''}
              onChange={(e) => handleInputChange('creditScore', Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing with AI...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Smart Quote
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quote Results</h2>
          
          {!quoteResult ? (
            <div className="text-center py-12 text-gray-500">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Submit the form to see your AI-powered quote</p>
            </div>
          ) : quoteResult.success ? (
            <div className="space-y-6">
              {/* AI Risk Analysis */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  AI Risk Analysis
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Risk Profile</span>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(quoteResult.riskProfile)}`}>
                      {quoteResult.riskProfile.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">AI Confidence</span>
                    <p className="font-semibold text-gray-900">{(quoteResult.aiConfidence * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Quote Details */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Smart Quote
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Recommended Premium</span>
                    <p className="text-2xl font-bold text-green-600">${quoteResult.recommendedPremium.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">vs Market Rate</span>
                    <p className="text-lg font-semibold text-gray-900">${quoteResult.competitivePremium.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* MGA Business Intelligence */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  MGA Intelligence
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Our Commission</span>
                    <p className="font-semibold text-blue-600">${quoteResult.commission.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Profit Margin</span>
                    <p className="font-semibold text-blue-600">${quoteResult.ourMargin.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Profitability Score</span>
                    <p className="font-semibold text-purple-600">{quoteResult.profitabilityScore.toFixed(1)}/100</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Conversion Prob.</span>
                    <p className="font-semibold text-purple-600">{(quoteResult.conversionProbability * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Carrier Information */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Carrier Selection
                </h3>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Recommended Carrier</span>
                  <p className="font-semibold text-purple-600">{quoteResult.recommendedCarrier}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Alternative Options</span>
                  <p className="text-sm text-gray-700">{quoteResult.alternativeCarriers.join(', ')}</p>
                </div>
              </div>

              {/* Customer Insights */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  Customer Intelligence
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Lifetime Value Prediction</span>
                    <p className="font-semibold text-orange-600">${quoteResult.lifetimeValuePrediction.toFixed(2)}</p>
                  </div>
                  {quoteResult.upsellOpportunities.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-600">Upsell Opportunities</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {quoteResult.upsellOpportunities.map((opp, index) => (
                          <span key={index} className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                            {opp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quote ID for tracking */}
              <div className="text-center text-sm text-gray-500 border-t pt-4">
                Quote ID: <span className="font-mono">{quoteResult.quoteId}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-600">
              <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
              <p>Quote generation failed</p>
              {quoteResult.error && <p className="text-sm mt-2">{quoteResult.error}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">The MGA + AI Sweet Spot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
            <p className="text-gray-300">Advanced risk assessment, fraud detection, and pricing optimization using machine learning algorithms.</p>
          </div>
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2">Carrier Network</h3>
            <p className="text-gray-300">Strategic partnerships with multiple carriers to maximize acceptance rates and commission structures.</p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Profit Optimization</h3>
            <p className="text-gray-300">Real-time profitability analysis and competitive pricing to maximize margins while ensuring market competitiveness.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGASmartQuote;
