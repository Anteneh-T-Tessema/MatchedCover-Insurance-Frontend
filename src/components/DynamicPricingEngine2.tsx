'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Globe, 
  Target,
  Zap,
  Activity,
  BarChart3,
  LineChart,
  Calculator,
  Gauge,
  RefreshCw,
  Users,
  MapPin,
  Clock,
  Award,
  Eye,
  Shield
} from 'lucide-react';

interface PricingFactor {
  name: string;
  weight: number;
  currentValue: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface MarketData {
  region: string;
  competitorAvg: number;
  ourPrice: number;
  advantage: string;
  marketShare: number;
  trend: 'up' | 'down' | 'stable';
}

interface PricingModel {
  id: string;
  name: string;
  accuracy: number;
  conversionRate: number;
  revenueImpact: string;
  description: string;
  status: 'active' | 'testing' | 'inactive';
}

export default function DynamicPricingEngine2() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimePricing, setRealTimePricing] = useState({
    basePrice: 1247,
    dynamicAdjustment: 0.87,
    competitorGap: 12.5,
    conversionOptimal: 94.2
  });

  // Simulate real-time pricing updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimePricing(prev => ({
        basePrice: prev.basePrice + Math.floor(Math.random() * 20) - 10,
        dynamicAdjustment: Math.max(0.5, Math.min(1.5, prev.dynamicAdjustment + (Math.random() * 0.1 - 0.05))),
        competitorGap: prev.competitorGap + (Math.random() * 2 - 1),
        conversionOptimal: Math.max(90, Math.min(98, prev.conversionOptimal + (Math.random() * 1 - 0.5)))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const pricingFactors: PricingFactor[] = [
    {
      name: 'Risk Score',
      weight: 35,
      currentValue: 0.73,
      impact: 'negative',
      description: 'AI-calculated risk assessment based on multiple data points'
    },
    {
      name: 'Competitor Pricing',
      weight: 25,
      currentValue: 1.12,
      impact: 'positive',
      description: 'Real-time competitive intelligence and positioning'
    },
    {
      name: 'Market Demand',
      weight: 20,
      currentValue: 1.08,
      impact: 'positive',
      description: 'Dynamic demand analysis and capacity optimization'
    },
    {
      name: 'Customer Value',
      weight: 15,
      currentValue: 1.23,
      impact: 'positive',
      description: 'Lifetime value and retention probability scoring'
    },
    {
      name: 'External Factors',
      weight: 5,
      currentValue: 0.95,
      impact: 'neutral',
      description: 'Weather, economic, and regulatory impact assessment'
    }
  ];

  const marketData: MarketData[] = [
    {
      region: 'North America',
      competitorAvg: 1450,
      ourPrice: 1247,
      advantage: '14% lower',
      marketShare: 23.7,
      trend: 'up'
    },
    {
      region: 'Europe',
      competitorAvg: 1680,
      ourPrice: 1320,
      advantage: '21% lower',
      marketShare: 18.9,
      trend: 'up'
    },
    {
      region: 'Asia Pacific',
      competitorAvg: 1200,
      ourPrice: 1089,
      advantage: '9% lower',
      marketShare: 31.2,
      trend: 'stable'
    },
    {
      region: 'Latin America',
      competitorAvg: 890,
      ourPrice: 756,
      advantage: '15% lower',
      marketShare: 42.1,
      trend: 'up'
    },
    {
      region: 'Middle East',
      competitorAvg: 1560,
      ourPrice: 1390,
      advantage: '11% lower',
      marketShare: 27.8,
      trend: 'up'
    },
    {
      region: 'Africa',
      competitorAvg: 780,
      ourPrice: 634,
      advantage: '19% lower',
      marketShare: 38.5,
      trend: 'up'
    }
  ];

  const pricingModels: PricingModel[] = [
    {
      id: 'neural-ai',
      name: 'Neural AI Pricing',
      accuracy: 97.3,
      conversionRate: 34.7,
      revenueImpact: '+23.4%',
      description: 'Deep learning model with 10,000+ variables',
      status: 'active'
    },
    {
      id: 'behavioral-economics',
      name: 'Behavioral Economics',
      accuracy: 94.1,
      conversionRate: 31.2,
      revenueImpact: '+18.9%',
      description: 'Psychology-based pricing optimization',
      status: 'active'
    },
    {
      id: 'competitive-intelligence',
      name: 'Competitive Intelligence',
      accuracy: 91.8,
      conversionRate: 29.6,
      revenueImpact: '+15.7%',
      description: 'Real-time competitor monitoring and response',
      status: 'testing'
    },
    {
      id: 'demand-forecasting',
      name: 'Demand Forecasting',
      accuracy: 89.5,
      conversionRate: 27.8,
      revenueImpact: '+12.3%',
      description: 'Predictive demand modeling with market analysis',
      status: 'testing'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'testing': return 'text-blue-600 bg-blue-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dynamic Pricing Engine 2.0</h1>
            <p className="text-indigo-100">AI-powered real-time pricing optimization with competitive intelligence</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${realTimePricing.basePrice}</div>
            <div className="text-indigo-200">Current Base Price</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="overview" label="Pricing Overview" active={activeTab === 'overview'} />
        <TabButton id="factors" label="Pricing Factors" active={activeTab === 'factors'} />
        <TabButton id="competitive" label="Market Intelligence" active={activeTab === 'competitive'} />
        <TabButton id="models" label="AI Models" active={activeTab === 'models'} />
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Real-time Pricing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${realTimePricing.basePrice}</div>
                  <div className="text-sm text-gray-500">Base Price</div>
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">
                +{realTimePricing.competitorGap.toFixed(1)}% vs competitors
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Gauge className="w-8 h-8 text-blue-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{(realTimePricing.dynamicAdjustment * 100).toFixed(0)}%</div>
                  <div className="text-sm text-gray-500">Dynamic Adjustment</div>
                </div>
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Real-time optimization active
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-purple-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{realTimePricing.conversionOptimal.toFixed(1)}%</div>
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
              </div>
              <div className="text-sm text-purple-600 font-medium">
                AI-optimized for maximum conversion
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">+47%</div>
                  <div className="text-sm text-gray-500">Revenue Impact</div>
                </div>
              </div>
              <div className="text-sm text-orange-600 font-medium">
                vs static pricing models
              </div>
            </div>
          </div>

          {/* Pricing Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <Calculator className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2">Pricing Optimization Results</h4>
              <div className="space-y-2 text-green-700">
                <div className="flex justify-between">
                  <span>Conversion Rate Improvement</span>
                  <span className="font-bold">+340%</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue per Customer</span>
                  <span className="font-bold">+47%</span>
                </div>
                <div className="flex justify-between">
                  <span>Competitive Advantage</span>
                  <span className="font-bold">12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Share Growth</span>
                  <span className="font-bold">+89%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <Brain className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-blue-800 mb-2">AI Intelligence Metrics</h4>
              <div className="space-y-2 text-blue-700">
                <div className="flex justify-between">
                  <span>Prediction Accuracy</span>
                  <span className="font-bold">97.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Real-time Adjustments</span>
                  <span className="font-bold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points Analyzed</span>
                  <span className="font-bold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="font-bold">&lt;100ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <RefreshCw className="w-6 h-6 mr-2 text-indigo-600" />
              Real-time Pricing Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-green-600 mr-3" />
                  <span>Price adjustment triggered - Competitor rate change detected</span>
                </div>
                <span className="text-sm text-green-600 font-medium">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Market demand spike identified - Auto pricing optimization active</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">7 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Brain className="w-5 h-5 text-purple-600 mr-3" />
                  <span>AI model retrained - 0.3% accuracy improvement achieved</span>
                </div>
                <span className="text-sm text-purple-600 font-medium">15 min ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Factors Tab */}
      {activeTab === 'factors' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <LineChart className="w-6 h-6 mr-2 text-indigo-600" />
              AI Pricing Factor Analysis
            </h3>
            <div className="space-y-4">
              {pricingFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-800">{factor.name}</h4>
                      <span className="text-sm text-gray-500">Weight: {factor.weight}%</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getImpactColor(factor.impact)}`}>
                        {factor.currentValue.toFixed(2)}x
                      </div>
                      <div className="text-sm text-gray-500">Current Value</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${factor.weight}%` }}
                    >
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6">
              <Activity className="w-8 h-8 text-indigo-600 mb-4" />
              <h4 className="text-lg font-bold text-indigo-800 mb-2">Factor Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Positive Factors</span>
                  <span className="font-bold text-green-600">60%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Negative Factors</span>
                  <span className="font-bold text-red-600">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Neutral Factors</span>
                  <span className="font-bold text-gray-600">5%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <Clock className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2">Update Frequency</h4>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-700">Real-time</div>
                <div className="text-green-600 text-sm">Continuous monitoring</div>
                <div className="text-green-600 text-sm">Sub-second adjustments</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6">
              <Award className="w-8 h-8 text-purple-600 mb-4" />
              <h4 className="text-lg font-bold text-purple-800 mb-2">Accuracy Score</h4>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-700">97.3%</div>
                <div className="text-purple-600 text-sm">Prediction accuracy</div>
                <div className="text-purple-600 text-sm">Best-in-class performance</div>
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
              <Globe className="w-6 h-6 mr-2 text-blue-600" />
              Global Market Intelligence
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Region</th>
                    <th className="text-left py-3 px-4 font-semibold">Competitor Avg</th>
                    <th className="text-left py-3 px-4 font-semibold">Our Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Advantage</th>
                    <th className="text-left py-3 px-4 font-semibold">Market Share</th>
                    <th className="text-left py-3 px-4 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((market, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{market.region}</td>
                      <td className="py-3 px-4">${market.competitorAvg}</td>
                      <td className="py-3 px-4 font-bold text-indigo-600">${market.ourPrice}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">{market.advantage}</td>
                      <td className="py-3 px-4">{market.marketShare}%</td>
                      <td className="py-3 px-4">{getTrendIcon(market.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="text-lg font-bold text-green-800">Avg Advantage</h4>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">15.2%</div>
              <div className="text-green-600">Lower than competitors</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="text-lg font-bold text-blue-800">Market Share</h4>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">30.4%</div>
              <div className="text-blue-600">Global average</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-8 h-8 text-purple-600 mr-3" />
                <h4 className="text-lg font-bold text-purple-800">Best Region</h4>
              </div>
              <div className="text-xl font-bold text-purple-700 mb-2">Latin America</div>
              <div className="text-purple-600">42.1% market share</div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-orange-600 mr-3" />
                <h4 className="text-lg font-bold text-orange-800">Monitoring</h4>
              </div>
              <div className="text-xl font-bold text-orange-700 mb-2">24/7</div>
              <div className="text-orange-600">Real-time intelligence</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Models Tab */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingModels.map((model, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{model.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(model.status)}`}>
                    {model.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600">{model.accuracy}%</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{model.conversionRate}%</div>
                    <div className="text-xs text-gray-500">Conversion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{model.revenueImpact}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${model.accuracy}%` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">AI Model Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">4</div>
                <div className="text-indigo-200">Active Models</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">97.3%</div>
                <div className="text-indigo-200">Best Accuracy</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">&lt;100ms</div>
                <div className="text-indigo-200">Response Time</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">+47%</div>
                <div className="text-indigo-200">Revenue Impact</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
