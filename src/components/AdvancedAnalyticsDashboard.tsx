'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Brain,
  Target,
  Zap,
  Activity,
  MapPin,
  Award,
  Sparkles,
  Eye,
  Clock,
  Shield,
  Trophy
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  competitive?: string;
}

interface CompetitorMetric {
  name: string;
  value: number;
  color: string;
  ourAdvantage: string;
}

export default function AdvancedAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    activeClaims: 1247,
    conversionRate: 34.7,
    globalReach: 187,
    aiAccuracy: 99.7
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeClaims: prev.activeClaims + Math.floor(Math.random() * 5) - 2,
        conversionRate: 34.7 + (Math.random() * 2 - 1),
        globalReach: prev.globalReach + Math.floor(Math.random() * 3) - 1,
        aiAccuracy: 99.7 + (Math.random() * 0.2 - 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const keyMetrics: MetricCard[] = [
    {
      title: 'Claims Processing Speed',
      value: '2.8 seconds',
      change: '133% faster than Lemonade',
      changeType: 'positive',
      icon: Zap,
      competitive: 'vs 7+ seconds (competitors)'
    },
    {
      title: 'Global Market Reach',
      value: `${realTimeData.globalReach} countries`,
      change: 'Universal vs Regional',
      changeType: 'positive',
      icon: Globe,
      competitive: 'vs limited regions'
    },
    {
      title: 'Conversion Rate',
      value: `${realTimeData.conversionRate.toFixed(1)}%`,
      change: '+340% improvement',
      changeType: 'positive',
      icon: TrendingUp,
      competitive: 'vs 10.2% industry avg'
    },
    {
      title: 'AI Accuracy',
      value: `${realTimeData.aiAccuracy.toFixed(1)}%`,
      change: '+4.7% vs industry',
      changeType: 'positive',
      icon: Brain,
      competitive: 'vs 95% industry standard'
    },
    {
      title: 'Active Claims',
      value: realTimeData.activeClaims.toLocaleString(),
      change: 'Real-time processing',
      changeType: 'positive',
      icon: Activity,
      competitive: 'instant vs batch processing'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.9/5.0',
      change: '+23% vs competitors',
      changeType: 'positive',
      icon: Award,
      competitive: 'vs 3.2-4.1 range'
    }
  ];

  const competitorComparison: CompetitorMetric[] = [
    { name: 'MatchedCover', value: 99.7, color: '#10b981', ourAdvantage: 'Our Platform' },
    { name: 'Lemonade', value: 89.2, color: '#f59e0b', ourAdvantage: '+10.5% better' },
    { name: 'Root', value: 85.7, color: '#ef4444', ourAdvantage: '+14.0% better' },
    { name: 'Hippo', value: 82.1, color: '#8b5cf6', ourAdvantage: '+17.6% better' },
    { name: 'Next Insurance', value: 78.9, color: '#06b6d4', ourAdvantage: '+20.8% better' },
    { name: 'Industry Average', value: 75.2, color: '#6b7280', ourAdvantage: '+24.5% better' }
  ];

  const geographicData = [
    { region: 'North America', coverage: 98, policies: 45200, growth: '+12%' },
    { region: 'Europe', coverage: 94, policies: 38900, growth: '+18%' },
    { region: 'Asia Pacific', coverage: 91, policies: 52100, growth: '+24%' },
    { region: 'Latin America', coverage: 87, policies: 23400, growth: '+31%' },
    { region: 'Africa', coverage: 82, policies: 15600, growth: '+45%' },
    { region: 'Middle East', coverage: 79, policies: 12800, growth: '+38%' }
  ];

  const predictiveInsights = [
    {
      title: 'Market Expansion Opportunity',
      insight: 'AI identifies 23 new markets with 89% success probability',
      impact: '+$47M revenue potential',
      confidence: 94,
      icon: Target
    },
    {
      title: 'Customer Churn Prediction',
      insight: '127 customers at risk - proactive intervention recommended',
      impact: '$2.1M retention value',
      confidence: 97,
      icon: Shield
    },
    {
      title: 'Pricing Optimization',
      insight: 'Dynamic pricing adjustments could increase margins by 8.3%',
      impact: '+$12.4M annual profit',
      confidence: 91,
      icon: DollarSign
    },
    {
      title: 'Competitive Intelligence',
      insight: 'Lemonade launching in 3 new markets - first-mover advantage available',
      impact: 'Strategic positioning opportunity',
      confidence: 88,
      icon: Eye
    }
  ];

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Analytics & Business Intelligence</h1>
            <p className="text-blue-100">Real-time competitive performance metrics and predictive insights</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">99.7%</div>
            <div className="text-blue-200">Overall Platform Performance</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="overview" label="Performance Overview" active={activeTab === 'overview'} />
        <TabButton id="competitive" label="Competitive Analysis" active={activeTab === 'competitive'} />
        <TabButton id="geographic" label="Global Reach" active={activeTab === 'geographic'} />
        <TabButton id="predictive" label="Predictive Insights" active={activeTab === 'predictive'} />
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-blue-600" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.title}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </div>
                {metric.competitive && (
                  <div className="text-xs text-gray-500 mt-1">{metric.competitive}</div>
                )}
              </div>
            ))}
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-green-500" />
              Real-time Platform Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-green-600 mr-3" />
                  <span>Claim processed in 2.1 seconds - Auto Insurance, California</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Just now</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-blue-600 mr-3" />
                  <span>New market activated - Kenya, Commercial Insurance</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Brain className="w-5 h-5 text-purple-600 mr-3" />
                  <span>AI model updated - 0.3% accuracy improvement detected</span>
                </div>
                <span className="text-sm text-purple-600 font-medium">5 min ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competitive Analysis Tab */}
      {activeTab === 'competitive' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Platform Performance vs Competitors</h3>
            <div className="space-y-4">
              {competitorComparison.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      competitor.name === 'MatchedCover' ? 'bg-green-500' :
                      competitor.name === 'Lemonade' ? 'bg-yellow-500' :
                      competitor.name === 'Root' ? 'bg-red-500' :
                      competitor.name === 'Hippo' ? 'bg-purple-500' :
                      competitor.name === 'Next Insurance' ? 'bg-cyan-500' :
                      'bg-gray-500'
                    }`}>
                    </div>
                    <span className="font-medium">{competitor.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          competitor.name === 'MatchedCover' ? 'bg-green-500' :
                          competitor.name === 'Lemonade' ? 'bg-yellow-500' :
                          competitor.name === 'Root' ? 'bg-red-500' :
                          competitor.name === 'Hippo' ? 'bg-purple-500' :
                          competitor.name === 'Next Insurance' ? 'bg-cyan-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${competitor.value}%` }}
                      >
                      </div>
                    </div>
                    <span className="font-bold w-16 text-right">{competitor.value}%</span>
                    <span className="text-sm text-gray-500 w-24">{competitor.ourAdvantage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <Trophy className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2">Market Leadership</h4>
              <p className="text-green-700 mb-4">
                MatchedCover leads in 8 out of 10 key performance metrics across the insurtech landscape.
              </p>
              <div className="text-2xl font-bold text-green-800">89% Market Dominance</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-blue-800 mb-2">Innovation Score</h4>
              <p className="text-blue-700 mb-4">
                Advanced AI capabilities and global reach create unprecedented competitive advantages.
              </p>
              <div className="text-2xl font-bold text-blue-800">95/100 Innovation</div>
            </div>
          </div>
        </div>
      )}

      {/* Geographic Tab */}
      {activeTab === 'geographic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Global Market Coverage & Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {geographicData.map((region, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{region.region}</h4>
                    <span className="text-green-600 font-medium">{region.growth}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Coverage</span>
                      <span className="font-medium">{region.coverage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${region.coverage}%` }}
                      >
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Policies</span>
                      <span className="font-medium">{region.policies.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Global Expansion Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">187</div>
                <div className="text-purple-200">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$2.8B</div>
                <div className="text-purple-200">Global Premium Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-purple-200">Global Support Coverage</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Predictive Insights Tab */}
      {activeTab === 'predictive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <insight.icon className="w-8 h-8 text-indigo-600" />
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Confidence</div>
                    <div className="text-lg font-bold text-indigo-600">{insight.confidence}%</div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{insight.title}</h4>
                <p className="text-gray-600 mb-3">{insight.insight}</p>
                <div className="border-t pt-3">
                  <div className="text-sm text-gray-500">Projected Impact</div>
                  <div className="font-semibold text-green-600">{insight.impact}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              AI-Powered Market Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-600">Next Market Opportunity</div>
                <div className="font-bold text-gray-800">Nigeria - Q2 2024</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-sm text-gray-600">Revenue Forecast</div>
                <div className="font-bold text-gray-800">+127% Growth</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Award className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-600">Competitive Position</div>
                <div className="font-bold text-gray-800">#1 in Innovation</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
