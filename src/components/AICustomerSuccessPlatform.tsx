'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Target, 
  Brain,
  MessageCircle,
  Star,
  AlertTriangle,
  Gift,
  Calendar,
  DollarSign,
  Activity,
  CheckCircle,
  Clock,
  Zap,
  Award,
  Phone,
  Mail,
  Bell
} from 'lucide-react';

interface CustomerHealth {
  id: string;
  name: string;
  healthScore: number;
  churnRisk: 'low' | 'medium' | 'high';
  lifetimeValue: number;
  lastInteraction: string;
  nextAction: string;
  satisfactionScore: number;
}

interface SuccessMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface Insight {
  type: 'opportunity' | 'risk' | 'success' | 'action';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AICustomerSuccessPlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalCustomers: 147829,
    satisfactionScore: 4.87,
    churnRate: 2.3,
    lifetimeValue: 8940
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        totalCustomers: prev.totalCustomers + Math.floor(Math.random() * 10) - 3,
        satisfactionScore: Math.max(4.5, Math.min(5.0, prev.satisfactionScore + (Math.random() * 0.1 - 0.05))),
        churnRate: Math.max(1.5, Math.min(4.0, prev.churnRate + (Math.random() * 0.2 - 0.1))),
        lifetimeValue: prev.lifetimeValue + Math.floor(Math.random() * 100) - 50
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const successMetrics: SuccessMetric[] = [
    {
      title: 'Customer Satisfaction',
      value: `${realTimeMetrics.satisfactionScore.toFixed(2)}/5.0`,
      change: '+0.23 vs industry avg',
      changeType: 'positive',
      icon: Heart,
      description: 'AI-driven satisfaction tracking and optimization'
    },
    {
      title: 'Customer Lifetime Value',
      value: `$${realTimeMetrics.lifetimeValue.toLocaleString()}`,
      change: '+47% vs competitors',
      changeType: 'positive',
      icon: DollarSign,
      description: 'Advanced predictive value modeling'
    },
    {
      title: 'Churn Prediction',
      value: `${realTimeMetrics.churnRate.toFixed(1)}%`,
      change: '67% better than industry',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'AI-powered early churn detection and prevention'
    },
    {
      title: 'Response Time',
      value: '47 seconds',
      change: '5x faster than average',
      changeType: 'positive',
      icon: Zap,
      description: 'Automated and intelligent customer support'
    },
    {
      title: 'Resolution Rate',
      value: '94.7%',
      change: 'First contact resolution',
      changeType: 'positive',
      icon: CheckCircle,
      description: 'AI-assisted problem resolution'
    },
    {
      title: 'Proactive Outreach',
      value: '1,247',
      change: 'Daily interventions',
      changeType: 'positive',
      icon: Bell,
      description: 'Predictive customer success actions'
    }
  ];

  const customerHealthData: CustomerHealth[] = [
    {
      id: '001',
      name: 'Sarah Johnson',
      healthScore: 92,
      churnRisk: 'low',
      lifetimeValue: 12500,
      lastInteraction: '2 hours ago',
      nextAction: 'Policy renewal reminder',
      satisfactionScore: 4.9
    },
    {
      id: '002',
      name: 'Michael Chen',
      healthScore: 76,
      churnRisk: 'medium',
      lifetimeValue: 8200,
      lastInteraction: '1 day ago',
      nextAction: 'Proactive check-in call',
      satisfactionScore: 4.1
    },
    {
      id: '003',
      name: 'Emma Rodriguez',
      healthScore: 45,
      churnRisk: 'high',
      lifetimeValue: 15600,
      lastInteraction: '5 days ago',
      nextAction: 'Urgent retention offer',
      satisfactionScore: 3.2
    },
    {
      id: '004',
      name: 'David Park',
      healthScore: 88,
      churnRisk: 'low',
      lifetimeValue: 9800,
      lastInteraction: '3 hours ago',
      nextAction: 'Upsell opportunity',
      satisfactionScore: 4.7
    },
    {
      id: '005',
      name: 'Lisa Thompson',
      healthScore: 67,
      churnRisk: 'medium',
      lifetimeValue: 11200,
      lastInteraction: '2 days ago',
      nextAction: 'Survey follow-up',
      satisfactionScore: 3.8
    }
  ];

  const aiInsights: Insight[] = [
    {
      type: 'opportunity',
      title: 'Upsell Opportunity Identified',
      description: '847 customers showing increased coverage needs based on life events',
      impact: '+$2.1M potential revenue',
      confidence: 89,
      icon: Target
    },
    {
      type: 'risk',
      title: 'Churn Risk Alert',
      description: '23 high-value customers showing early warning signs',
      impact: '$890K retention value at risk',
      confidence: 94,
      icon: AlertTriangle
    },
    {
      type: 'success',
      title: 'Satisfaction Improvement',
      description: 'AI-driven support changes increased CSAT by 12% this month',
      impact: '2,347 happier customers',
      confidence: 97,
      icon: Star
    },
    {
      type: 'action',
      title: 'Proactive Intervention Needed',
      description: 'Weather events affecting 1,200+ customers in Texas region',
      impact: 'Preventive outreach recommended',
      confidence: 92,
      icon: Phone
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-l-blue-500 bg-blue-50';
      case 'risk': return 'border-l-red-500 bg-red-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'action': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-purple-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI-Powered Customer Success Platform</h1>
            <p className="text-purple-100">Predictive customer success with advanced AI analytics</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{realTimeMetrics.totalCustomers.toLocaleString()}</div>
            <div className="text-purple-200">Active Customers</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="overview" label="Success Overview" active={activeTab === 'overview'} />
        <TabButton id="health" label="Customer Health" active={activeTab === 'health'} />
        <TabButton id="insights" label="AI Insights" active={activeTab === 'insights'} />
        <TabButton id="automation" label="Smart Automation" active={activeTab === 'automation'} />
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Success Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-purple-600" />
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
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </div>
            ))}
          </div>

          {/* Success Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <Award className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2">Customer Success Achievements</h4>
              <div className="space-y-2 text-green-700">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">94.7% first-contact resolution rate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">47-second average response time</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">89% customer retention improvement</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <Brain className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-blue-800 mb-2">AI-Driven Intelligence</h4>
              <div className="space-y-2 text-blue-700">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Predictive churn detection (94% accuracy)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Automated success interventions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Real-time satisfaction monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Health Tab */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              Customer Health Dashboard
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold">Health Score</th>
                    <th className="text-left py-3 px-4 font-semibold">Churn Risk</th>
                    <th className="text-left py-3 px-4 font-semibold">Lifetime Value</th>
                    <th className="text-left py-3 px-4 font-semibold">Last Contact</th>
                    <th className="text-left py-3 px-4 font-semibold">Next Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerHealthData.map((customer, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: {customer.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getHealthScoreColor(customer.healthScore)}`}>
                          {customer.healthScore}/100
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getChurnRiskColor(customer.churnRisk)}`}>
                          {customer.churnRisk}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">${customer.lifetimeValue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-600">{customer.lastInteraction}</td>
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-800 font-medium">
                          {customer.nextAction}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="text-lg font-bold text-green-800">Healthy Customers</h4>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">78.3%</div>
              <div className="text-green-600">Health Score 80+</div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h4 className="text-lg font-bold text-yellow-800">At Risk</h4>
              </div>
              <div className="text-3xl font-bold text-yellow-700 mb-2">18.4%</div>
              <div className="text-yellow-600">Needs Attention</div>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-red-600 mr-3" />
                <h4 className="text-lg font-bold text-red-800">Critical</h4>
              </div>
              <div className="text-3xl font-bold text-red-700 mb-2">3.3%</div>
              <div className="text-red-600">Urgent Action</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`border-l-4 rounded-r-xl p-6 shadow-lg ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between mb-4">
                  <insight.icon className="w-8 h-8 text-gray-600" />
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Confidence</div>
                    <div className="text-lg font-bold text-gray-700">{insight.confidence}%</div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{insight.title}</h4>
                <p className="text-gray-600 mb-3">{insight.description}</p>
                <div className="border-t pt-3">
                  <div className="text-sm text-gray-500">Impact</div>
                  <div className="font-semibold text-gray-700">{insight.impact}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">AI Success Intelligence Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">1,247</div>
                <div className="text-indigo-200">Daily AI Actions</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">94%</div>
                <div className="text-indigo-200">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">$2.8M</div>
                <div className="text-indigo-200">Value Protected</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">Real-time</div>
                <div className="text-indigo-200">Insights</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-blue-600" />
              Smart Automation Engine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Automated Success Actions</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium">Proactive Check-ins</div>
                      <div className="text-sm text-gray-600">847 automated this week</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Gift className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">Retention Offers</div>
                      <div className="text-sm text-gray-600">23 high-risk customers targeted</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-medium">Renewal Reminders</div>
                      <div className="text-sm text-gray-600">1,200+ timely notifications sent</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">AI-Powered Interventions</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <Bell className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <div className="font-medium">Satisfaction Alerts</div>
                      <div className="text-sm text-gray-600">Real-time CSAT monitoring</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <Phone className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <div className="font-medium">Churn Prevention</div>
                      <div className="text-sm text-gray-600">Early warning system active</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <Mail className="w-5 h-5 text-indigo-600 mr-3" />
                    <div>
                      <div className="font-medium">Personalized Outreach</div>
                      <div className="text-sm text-gray-600">AI-crafted communications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
              <Zap className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">89%</div>
              <div className="text-blue-100">Automation Success Rate</div>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white">
              <Clock className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">67%</div>
              <div className="text-green-100">Faster Response Times</div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
              <Heart className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">+0.8</div>
              <div className="text-purple-100">CSAT Improvement</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
