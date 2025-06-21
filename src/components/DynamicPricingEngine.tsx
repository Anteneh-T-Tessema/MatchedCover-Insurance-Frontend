'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Globe, 
  Brain,
  Target,
  Activity,
  Clock,
  Award,
  CheckCircle,
  Eye,
  Users,
  Layers,
  Lightbulb,
  Sparkles,
  LineChart
} from 'lucide-react';

interface PricingFactor {
  name: string;
  weight: number;
  impact: string;
  realTimeValue: number;
  trend: 'up' | 'down' | 'stable';
}

interface MarketIntelligence {
  competitor: string;
  ourPrice: number;
  theirPrice: number;
  advantage: number;
  marketShare: number;
  recommendation: string;
}

interface PricingScenario {
  scenario: string;
  basePrice: number;
  adjustedPrice: number;
  confidence: number;
  expectedImpact: string;
  factors: string[];
}

interface RealTimeAdjustment {
  trigger: string;
  adjustment: string;
  impact: number;
  timeframe: string;
  success_rate: number;
}

export default function DynamicPricingEngine() {
  const [activeTab, setActiveTab] = useState('realtime');
  const [realTimeData, setRealTimeData] = useState({
    adjustments: 847,
    savings: 23.7,
    accuracy: 94.8,
    competition: 89.2
  });

  // Simulate real-time pricing updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        adjustments: prev.adjustments + Math.floor(Math.random() * 5),
        savings: 23.7 + (Math.random() * 2 - 1),
        accuracy: 94.8 + (Math.random() * 1 - 0.5),
        competition: 89.2 + (Math.random() * 3 - 1.5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pricingFactors: PricingFactor[] = [
    {
      name: 'Risk Assessment Score',
      weight: 35,
      impact: 'Primary pricing driver',
      realTimeValue: 87.3,
      trend: 'stable'
    },
    {
      name: 'Market Competition',
      weight: 25,
      impact: 'Competitive positioning',
      realTimeValue: 92.1,
      trend: 'up'
    },
    {
      name: 'Customer Lifetime Value',
      weight: 20,
      impact: 'Long-term profitability',
      realTimeValue: 78.9,
      trend: 'up'
    },
    {
      name: 'Regional Regulations',
      weight: 15,
      impact: 'Compliance requirements',
      realTimeValue: 100.0,
      trend: 'stable'
    },
    {
      name: 'Economic Indicators',
      weight: 10,
      impact: 'Market conditions',
      realTimeValue: 82.4,
      trend: 'down'
    },
    {
      name: 'Seasonal Trends',
      weight: 8,
      impact: 'Temporal adjustments',
      realTimeValue: 91.7,
      trend: 'up'
    },
    {
      name: 'Usage Behavior',
      weight: 12,
      impact: 'Behavioral pricing',
      realTimeValue: 85.6,
      trend: 'stable'
    }
  ];

  const marketIntelligence: MarketIntelligence[] = [
    {
      competitor: 'Lemonade',
      ourPrice: 89.50,
      theirPrice: 127.00,
      advantage: 29.5,
      marketShare: 8.3,
      recommendation: 'Maintain competitive advantage while monitoring for price wars'
    },
    {
      competitor: 'Root',
      ourPrice: 156.25,
      theirPrice: 198.00,
      advantage: 21.1,
      marketShare: 5.7,
      recommendation: 'Opportunity for slight price increase without losing competitiveness'
    },
    {
      competitor: 'Hippo',
      ourPrice: 892.00,
      theirPrice: 1180.00,
      advantage: 24.4,
      marketShare: 12.1,
      recommendation: 'Strong position - focus on value messaging'
    },
    {
      competitor: 'Next Insurance',
      ourPrice: 287.50,
      theirPrice: 340.00,
      advantage: 15.4,
      marketShare: 9.8,
      recommendation: 'Competitive pricing - monitor for new product launches'
    }
  ];

  const pricingScenarios: PricingScenario[] = [
    {
      scenario: 'New Customer Acquisition',
      basePrice: 245.00,
      adjustedPrice: 198.50,
      confidence: 92,
      expectedImpact: '+34% conversion rate',
      factors: ['First-time buyer discount', 'Competitive analysis', 'Market penetration strategy']
    },
    {
      scenario: 'High-Risk Client',
      basePrice: 245.00,
      adjustedPrice: 387.50,
      confidence: 89,
      expectedImpact: 'Risk-adjusted profitability',
      factors: ['Claims history', 'Risk score elevation', 'Actuarial adjustment']
    },
    {
      scenario: 'Multi-Policy Bundling',
      basePrice: 245.00,
      adjustedPrice: 212.75,
      confidence: 94,
      expectedImpact: '+$890 annual value',
      factors: ['Bundle discount', 'Customer lifetime value', 'Cross-sell opportunity']
    },
    {
      scenario: 'Loyalty Customer',
      basePrice: 245.00,
      adjustedPrice: 220.50,
      confidence: 96,
      expectedImpact: '96% retention probability',
      factors: ['Loyalty program', 'Long-term relationship', 'Retention incentive']
    }
  ];

  const realTimeAdjustments: RealTimeAdjustment[] = [
    {
      trigger: 'Competitor price drop detected',
      adjustment: '-8% within 2 hours',
      impact: 23.4,
      timeframe: 'Immediate',
      success_rate: 87
    },
    {
      trigger: 'High-value customer inquiry',
      adjustment: 'Premium pricing +15%',
      impact: 12.7,
      timeframe: '< 30 seconds',
      success_rate: 92
    },
    {
      trigger: 'Market volatility spike',
      adjustment: 'Conservative pricing +5%',
      impact: 8.9,
      timeframe: '< 5 minutes',
      success_rate: 78
    },
    {
      trigger: 'Regulatory change detected',
      adjustment: 'Compliance adjustment variable',
      impact: 15.2,
      timeframe: '< 1 hour',
      success_rate: 99
    }
  ];

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-emerald-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 20) return 'text-green-600 bg-green-50';
    if (impact >= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dynamic Pricing Engine 2.0</h1>
            <p className="text-emerald-100">AI-powered real-time pricing optimization with competitive intelligence</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{realTimeData.accuracy.toFixed(1)}%</div>
            <div className="text-emerald-200">Pricing Accuracy</div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-emerald-600" />
            <span className="text-green-600 text-sm font-medium">Live</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {realTimeData.adjustments.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Real-time Adjustments Today</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {realTimeData.savings.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500">Average Customer Savings</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {realTimeData.accuracy.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500">Pricing Accuracy</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-purple-600" />
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {realTimeData.competition.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500">Competitive Advantage</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="realtime" label="Real-time Pricing" active={activeTab === 'realtime'} />
        <TabButton id="factors" label="Pricing Factors" active={activeTab === 'factors'} />
        <TabButton id="competitive" label="Market Intelligence" active={activeTab === 'competitive'} />
        <TabButton id="scenarios" label="Pricing Scenarios" active={activeTab === 'scenarios'} />
      </div>

      {/* Real-time Pricing Tab */}
      {activeTab === 'realtime' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-emerald-600" />
              AI-Powered Real-time Adjustments
            </h3>
            <div className="space-y-4">
              {realTimeAdjustments.map((adjustment, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Lightbulb className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="font-semibold">{adjustment.trigger}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(adjustment.impact)}`}>
                        {adjustment.impact}% impact
                      </span>
                      <span className="text-sm text-gray-500">{adjustment.timeframe}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Adjustment: </span>
                      <span className="text-gray-600">{adjustment.adjustment}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Success Rate: </span>
                      <span className="text-emerald-600 font-medium">{adjustment.success_rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-emerald-600 mb-4" />
              <h4 className="text-lg font-bold text-emerald-800 mb-2">AI Optimization</h4>
              <div className="text-3xl font-bold text-emerald-600 mb-2">0.08s</div>
              <p className="text-emerald-700 text-sm">Average response time for pricing adjustments</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-blue-800 mb-2">Market Coverage</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-blue-700 text-sm">Countries with localized pricing</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6">
              <Globe className="w-8 h-8 text-purple-600 mb-4" />
              <h4 className="text-lg font-bold text-purple-800 mb-2">Data Sources</h4>
              <div className="text-3xl font-bold text-purple-600 mb-2">1,247</div>
              <p className="text-purple-700 text-sm">Real-time data feeds integrated</p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Factors Tab */}
      {activeTab === 'factors' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Layers className="w-6 h-6 mr-2 text-blue-600" />
              Dynamic Pricing Factors & Weights
            </h3>
            <div className="space-y-4">
              {pricingFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">{factor.weight}%</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{factor.name}</h4>
                        <p className="text-gray-600 text-sm">{factor.impact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(factor.trend)}
                      <span className="font-medium text-gray-800">
                        {factor.realTimeValue.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${factor.weight * 2.5}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2" />
              Factor Performance Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <LineChart className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-sm text-gray-600">Most Influential Factor</div>
                <div className="font-bold text-gray-800">Risk Assessment (35%)</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-600">Update Frequency</div>
                <div className="font-bold text-gray-800">Every 30 seconds</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-600">Factor Accuracy</div>
                <div className="font-bold text-gray-800">94.7% Average</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Intelligence Tab */}
      {activeTab === 'competitive' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-purple-600" />
              Competitive Pricing Intelligence
            </h3>
            <div className="space-y-4">
              {marketIntelligence.map((intel, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{intel.competitor}</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-medium">
                        {intel.advantage.toFixed(1)}% advantage
                      </span>
                      <span className="text-gray-500 text-sm">
                        {intel.marketShare}% market share
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Our Price</span>
                      <div className="font-bold text-emerald-600">${intel.ourPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Their Price</span>
                      <div className="font-bold text-red-600">${intel.theirPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Savings</span>
                      <div className="font-bold text-green-600">
                        ${(intel.theirPrice - intel.ourPrice).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <span className="font-medium text-gray-700">Recommendation: </span>
                    <span className="text-gray-600">{intel.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <h4 className="text-lg font-bold text-green-800 mb-4">Market Position</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Average Competitive Advantage</span>
                  <span className="font-bold text-green-600">22.6%</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Monitoring Coverage</span>
                  <span className="font-bold text-green-600">247 Competitors</span>
                </div>
                <div className="flex justify-between">
                  <span>Update Frequency</span>
                  <span className="font-bold text-green-600">Real-time</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <h4 className="text-lg font-bold text-blue-800 mb-4">Intelligence Network</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Data Sources</span>
                  <span className="font-bold text-blue-600">890+ APIs</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Coverage</span>
                  <span className="font-bold text-blue-600">98.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Analysis Accuracy</span>
                  <span className="font-bold text-blue-600">96.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Scenarios Tab */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-indigo-600" />
              Dynamic Pricing Scenarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingScenarios.map((scenario, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{scenario.scenario}</h4>
                    <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">
                      {scenario.confidence}% confidence
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-medium">${scenario.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adjusted Price</span>
                      <span className={`font-bold ${
                        scenario.adjustedPrice < scenario.basePrice ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${scenario.adjustedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Change</span>
                      <span className={`font-medium ${
                        scenario.adjustedPrice < scenario.basePrice ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.adjustedPrice < scenario.basePrice ? '-' : '+'}
                        {Math.abs(((scenario.adjustedPrice - scenario.basePrice) / scenario.basePrice * 100)).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-3 mb-3">
                    <span className="font-medium text-gray-700">Expected Impact: </span>
                    <span className="text-gray-600">{scenario.expectedImpact}</span>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700">Key Factors:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {scenario.factors.map((factor, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Scenario Performance Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Scenarios Analyzed</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-600">94.3%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-600">0.12s</div>
                <div className="text-sm text-gray-600">Analysis Time</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-emerald-600">+18.7%</div>
                <div className="text-sm text-gray-600">Revenue Impact</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
