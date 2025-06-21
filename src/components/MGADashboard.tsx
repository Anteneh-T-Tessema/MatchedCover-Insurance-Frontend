'use client';

import React, { useState, useEffect } from 'react';
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
  FileText,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Brain,
  Zap
} from 'lucide-react';

// Sample data - In production, this would come from APIs
const portfolioData = [
  { month: 'Jan', policies: 120, premium: 180000, commission: 21600, lossRatio: 0.65 },
  { month: 'Feb', policies: 145, premium: 220000, commission: 26400, lossRatio: 0.58 },
  { month: 'Mar', policies: 168, premium: 255000, commission: 30600, lossRatio: 0.62 },
  { month: 'Apr', policies: 192, premium: 285000, commission: 34200, lossRatio: 0.59 },
  { month: 'May', policies: 215, premium: 325000, commission: 39000, lossRatio: 0.61 },
  { month: 'Jun', policies: 238, premium: 368000, commission: 44160, lossRatio: 0.57 }
];

const carrierDistribution = [
  { name: 'Premier Insurance', value: 35, commission: 0.12, policies: 83 },
  { name: 'Secure Life & Property', value: 28, commission: 0.15, policies: 67 },
  { name: 'Guardian Auto', value: 22, commission: 0.10, policies: 52 },
  { name: 'National General', value: 15, commission: 0.13, policies: 36 }
];

const riskDistribution = [
  { name: 'Low Risk (0-30)', value: 45, color: '#10B981' },
  { name: 'Medium Risk (31-60)', value: 38, color: '#F59E0B' },
  { name: 'High Risk (61-85)', value: 17, color: '#EF4444' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

interface MGAMetrics {
  totalPolicies: number;
  totalPremium: number;
  totalCommission: number;
  averageCommission: number;
  conversionRate: number;
  retentionRate: number;
  lossRatio: number;
  combinedRatio: number;
  growthRate: number;
  aiAccuracy: number;
}

interface UnderwritingMetrics {
  totalApplications: number;
  approvalRate: number;
  averageDecisionTime: number;
  fraudDetectionRate: number;
  aiConfidence: number;
  manualReviews: number;
}

interface CarrierPerformance {
  carrierId: string;
  name: string;
  policies: number;
  premium: number;
  commission: number;
  lossRatio: number;
  turnaroundTime: number;
  satisfactionScore: number;
}

export default function MGADashboard() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Sample metrics - would come from APIs in production
  const mgaMetrics: MGAMetrics = {
    totalPolicies: 1575,
    totalPremium: 2685000,
    totalCommission: 322200,
    averageCommission: 204.6,
    conversionRate: 68.5,
    retentionRate: 87.3,
    lossRatio: 0.61,
    combinedRatio: 0.89,
    growthRate: 24.8,
    aiAccuracy: 94.2
  };

  const underwritingMetrics: UnderwritingMetrics = {
    totalApplications: 2301,
    approvalRate: 68.5,
    averageDecisionTime: 2.3,
    fraudDetectionRate: 8.7,
    aiConfidence: 91.4,
    manualReviews: 157
  };

  const carrierPerformance: CarrierPerformance[] = [
    {
      carrierId: 'carrier-001',
      name: 'Premier Insurance',
      policies: 551,
      premium: 935000,
      commission: 112200,
      lossRatio: 0.58,
      turnaroundTime: 1.8,
      satisfactionScore: 4.6
    },
    {
      carrierId: 'carrier-002',
      name: 'Secure Life & Property',
      policies: 441,
      premium: 752000,
      commission: 112800,
      lossRatio: 0.62,
      turnaroundTime: 2.4,
      satisfactionScore: 4.4
    },
    {
      carrierId: 'carrier-003',
      name: 'Guardian Auto',
      policies: 364,
      premium: 546000,
      commission: 54600,
      lossRatio: 0.59,
      turnaroundTime: 1.2,
      satisfactionScore: 4.7
    }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, format = 'number' }: {
    title: string;
    value: number;
    change?: number;
    icon: React.ElementType;
    format?: 'number' | 'currency' | 'percentage';
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'currency':
          return `$${val.toLocaleString()}`;
        case 'percentage':
          return `${val.toFixed(1)}%`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
            {change !== undefined && (
              <p className={`text-sm flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {Math.abs(change).toFixed(1)}% from last period
              </p>
            )}
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Policies"
          value={mgaMetrics.totalPolicies}
          change={24.8}
          icon={FileText}
        />
        <MetricCard
          title="Total Premium"
          value={mgaMetrics.totalPremium}
          change={18.5}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Total Commission"
          value={mgaMetrics.totalCommission}
          change={22.3}
          icon={TrendingUp}
          format="currency"
        />
        <MetricCard
          title="Conversion Rate"
          value={mgaMetrics.conversionRate}
          change={3.2}
          icon={Target}
          format="percentage"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Growth */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="policies" fill="#3B82F6" name="Policies" />
              <Line yAxisId="right" type="monotone" dataKey="premium" stroke="#10B981" strokeWidth={3} name="Premium ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Carrier Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Carrier Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={carrierDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {carrierDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold">AI Underwriting Performance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{mgaMetrics.aiAccuracy}%</p>
            <p className="text-sm text-gray-600">AI Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{underwritingMetrics.averageDecisionTime}s</p>
            <p className="text-sm text-gray-600">Avg Decision Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{underwritingMetrics.fraudDetectionRate}%</p>
            <p className="text-sm text-gray-600">Fraud Detection Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{underwritingMetrics.manualReviews}</p>
            <p className="text-sm text-gray-600">Manual Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );

  const UnderwritingTab = () => (
    <div className="space-y-6">
      {/* Underwriting Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Applications"
          value={underwritingMetrics.totalApplications}
          change={15.2}
          icon={Users}
        />
        <MetricCard
          title="Approval Rate"
          value={underwritingMetrics.approvalRate}
          change={2.1}
          icon={CheckCircle}
          format="percentage"
        />
        <MetricCard
          title="AI Confidence"
          value={underwritingMetrics.aiConfidence}
          change={1.8}
          icon={Brain}
          format="percentage"
        />
        <MetricCard
          title="Avg Decision Time"
          value={underwritingMetrics.averageDecisionTime}
          change={-12.5}
          icon={Clock}
        />
      </div>

      {/* Risk Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Score Distribution</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-4">
            {riskDistribution.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: risk.color }}
                  />
                  <span className="font-medium">{risk.name}</span>
                </div>
                <span className="text-lg font-bold">{risk.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Decision Factors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">AI Decision Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Top Approval Factors</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Credit Score &gt; 750</span>
                <span className="text-green-600 font-medium">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Claims-Free History</span>
                <span className="text-green-600 font-medium">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bundled Policies</span>
                <span className="text-green-600 font-medium">+8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Safety Features</span>
                <span className="text-green-600 font-medium">+6%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Top Risk Factors</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Multiple Recent Claims</span>
                <span className="text-red-600 font-medium">+25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>High-Risk Location</span>
                <span className="text-red-600 font-medium">+18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Poor Credit Score</span>
                <span className="text-red-600 font-medium">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Driving Violations</span>
                <span className="text-red-600 font-medium">+12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CarriersTab = () => (
    <div className="space-y-6">
      {/* Carrier Performance Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Carrier Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loss Ratio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turnaround
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carrierPerformance.map((carrier, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{carrier.name}</div>
                        <div className="text-sm text-gray-500">{carrier.carrierId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {carrier.policies.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${carrier.premium.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${carrier.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      carrier.lossRatio < 0.6 
                        ? 'bg-green-100 text-green-800' 
                        : carrier.lossRatio < 0.7 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(carrier.lossRatio * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {carrier.turnaroundTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{carrier.satisfactionScore}</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(carrier.satisfactionScore) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Commission Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={carrierPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commission" fill="#3B82F6" name="Commission Earned ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MGA Dashboard</h1>
              <p className="text-gray-600">AI-Powered Managing General Agent Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'underwriting', name: 'AI Underwriting', icon: Brain },
              { id: 'carriers', name: 'Carrier Partners', icon: Shield },
              { id: 'claims', name: 'Claims', icon: AlertTriangle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && <OverviewTab />}
        {selectedTab === 'underwriting' && <UnderwritingTab />}
        {selectedTab === 'carriers' && <CarriersTab />}
        {selectedTab === 'claims' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Claims Management</h3>
            <p className="text-gray-600">Claims processing and management features coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
