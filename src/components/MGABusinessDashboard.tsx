'use client';

import React, { useState, useEffect } from 'react';
import { SmartQuoteEngine } from '@/services/SmartQuoteEngine';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Brain,
  Zap,
  Shield,
  Target,
  Award,
  Activity
} from 'lucide-react';

// Enhanced sample data representing MGA + AI performance
const mgaPerformanceData = [
  { month: 'Jan', quotes: 324, bound: 235, conversion: 0.72, aiAccuracy: 0.94, avgCommission: 178, profit: 14200 },
  { month: 'Feb', quotes: 412, bound: 318, conversion: 0.77, aiAccuracy: 0.96, avgCommission: 189, profit: 18900 },
  { month: 'Mar', quotes: 489, bound: 382, conversion: 0.78, aiAccuracy: 0.95, avgCommission: 195, profit: 22400 },
  { month: 'Apr', quotes: 556, bound: 445, conversion: 0.80, aiAccuracy: 0.97, avgCommission: 203, profit: 27100 },
  { month: 'May', quotes: 623, bound: 510, conversion: 0.82, aiAccuracy: 0.98, avgCommission: 210, profit: 31800 },
  { month: 'Jun', quotes: 687, bound: 578, conversion: 0.84, aiAccuracy: 0.98, avgCommission: 218, profit: 36200 }
];

const carrierPartnershipData = [
  { name: 'Premier Insurance', quotes: 245, bound: 210, commission: 0.12, avgPremium: 1850, profit: 46620 },
  { name: 'Secure Life & Property', quotes: 198, bound: 165, commission: 0.15, avgPremium: 2100, profit: 52087 },
  { name: 'Guardian Auto', quotes: 156, bound: 123, commission: 0.10, avgPremium: 1650, profit: 20295 },
  { name: 'National General', quotes: 134, bound: 80, commission: 0.13, avgPremium: 1400, profit: 14560 }
];

const aiInsightsData = [
  { category: 'Risk Assessment', accuracy: 98, improvement: '+12%' },
  { category: 'Fraud Detection', accuracy: 94, improvement: '+18%' },
  { category: 'Pricing Optimization', accuracy: 96, improvement: '+15%' },
  { category: 'Carrier Matching', accuracy: 92, improvement: '+22%' },
  { category: 'Conversion Prediction', accuracy: 89, improvement: '+28%' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

interface DashboardMetrics {
  totalQuotes: number;
  conversionRate: number;
  avgCommission: number;
  topCarriers: { name: string; percentage: number }[];
  riskDistribution: { low: number; medium: number; high: number };
  profitabilityTrend: number[];
}

const MGABusinessDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(true);

  const smartQuoteEngine = new SmartQuoteEngine();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const data = await smartQuoteEngine.getMGAMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch MGA metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MGA Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">MGA + AI Business Dashboard</h1>
              <p className="text-blue-100">Real-time analytics for the hybrid insurtech sweet spot</p>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-200" />
              <Zap className="w-6 h-6 text-yellow-300" />
              <Shield className="w-8 h-8 text-green-300" />
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mt-6 flex gap-2">
            {['1month', '3months', '6months', '1year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  timeRange === range
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                {range === '1month' ? '1M' : range === '3months' ? '3M' : range === '6months' ? '6M' : '1Y'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quotes</p>
                <p className="text-3xl font-bold text-gray-900">{metrics?.totalQuotes.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +23% vs last period
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{((metrics?.conversionRate || 0) * 100).toFixed(1)}%</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12% with AI optimization
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Commission</p>
                <p className="text-3xl font-bold text-gray-900">${metrics?.avgCommission.toFixed(2)}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +8% carrier optimization
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Accuracy</p>
                <p className="text-3xl font-bold text-gray-900">96.8%</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Continuously improving
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Brain className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MGA Performance Over Time */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              MGA Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mgaPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="quotes" stroke="#3B82F6" strokeWidth={2} name="Quotes" />
                <Line yAxisId="left" type="monotone" dataKey="bound" stroke="#10B981" strokeWidth={2} name="Bound Policies" />
                <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#F59E0B" strokeWidth={2} name="Conversion Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Carrier Partnership Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Carrier Partnership ROI
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carrierPartnershipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#10B981" name="Profit ($)" />
                <Bar dataKey="bound" fill="#3B82F6" name="Policies Bound" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights and Risk Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Performance Insights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Performance Insights
            </h3>
            <div className="space-y-4">
              {aiInsightsData.map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{insight.category}</p>
                    <p className="text-sm text-gray-600">Accuracy: {insight.accuracy}%</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">{insight.improvement}</span>
                    <p className="text-xs text-gray-500">improvement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Portfolio Risk Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Low Risk', value: metrics?.riskDistribution.low || 45, color: '#10B981' },
                    { name: 'Medium Risk', value: metrics?.riskDistribution.medium || 40, color: '#F59E0B' },
                    { name: 'High Risk', value: metrics?.riskDistribution.high || 15, color: '#EF4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Low Risk', value: metrics?.riskDistribution.low || 45, color: '#10B981' },
                    { name: 'Medium Risk', value: metrics?.riskDistribution.medium || 40, color: '#F59E0B' },
                    { name: 'High Risk', value: metrics?.riskDistribution.high || 15, color: '#EF4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            Recent MGA Activity
          </h3>
          <div className="space-y-4">
            {[
              { time: '2 minutes ago', event: 'AI approved high-value auto policy', amount: '$2,850', carrier: 'Premier Insurance', type: 'success' },
              { time: '8 minutes ago', event: 'Smart pricing optimized homeowners quote', amount: '$1,650', carrier: 'Secure Life', type: 'info' },
              { time: '15 minutes ago', event: 'Carrier partnership expanded coverage', amount: null, carrier: 'Guardian Auto', type: 'update' },
              { time: '23 minutes ago', event: 'AI detected potential fraud risk', amount: '$4,200', carrier: 'National General', type: 'warning' },
              { time: '31 minutes ago', event: 'Bulk policy binding completed', amount: '$18,900', carrier: 'Multiple Carriers', type: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.event}</p>
                    <p className="text-sm text-gray-600">{activity.carrier} • {activity.time}</p>
                  </div>
                </div>
                {activity.amount && (
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.amount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-green-200" />
          <h2 className="text-3xl font-bold mb-2">MGA + AI Sweet Spot Achieved</h2>
          <p className="text-xl text-green-100 mb-6">
            Optimizing profitability through intelligent carrier partnerships and AI-powered underwriting
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">96.8%</p>
              <p className="text-green-200">AI Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">84%</p>
              <p className="text-green-200">Conversion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">$218</p>
              <p className="text-green-200">Avg Commission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGABusinessDashboard;
