'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Shield, 
  FileCheck, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Map,
  Scale,
  Award,
  Eye,
  Zap,
  Activity,
  Database,
  Users,
  BarChart3,
  TrendingUp,
  Flag,
  Building,
  Lock,
  Sparkles
} from 'lucide-react';

interface ComplianceRegion {
  region: string;
  countries: number;
  compliance_score: number;
  regulations: number;
  last_update: string;
  status: 'compliant' | 'monitoring' | 'updating';
  key_requirements: string[];
}

interface RegulatoryAlert {
  country: string;
  regulation: string;
  type: 'new' | 'update' | 'deadline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  deadline: string;
  description: string;
  auto_adapted: boolean;
}

interface ComplianceMetric {
  title: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function GlobalRegulatoryComplianceAI() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    countries: 203,
    compliance_score: 98.7,
    regulations: 12847,
    updates: 47
  });

  // Simulate real-time compliance monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        countries: prev.countries + Math.floor(Math.random() * 2),
        compliance_score: 98.7 + (Math.random() * 0.6 - 0.3),
        regulations: prev.regulations + Math.floor(Math.random() * 10),
        updates: prev.updates + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const complianceRegions: ComplianceRegion[] = [
    {
      region: 'North America',
      countries: 3,
      compliance_score: 99.2,
      regulations: 2847,
      last_update: '2024-06-19 14:30',
      status: 'compliant',
      key_requirements: ['SOX', 'NAIC', 'State Insurance Codes', 'CCPA', 'Privacy Acts']
    },
    {
      region: 'European Union',
      countries: 27,
      compliance_score: 98.9,
      regulations: 3241,
      last_update: '2024-06-19 13:45',
      status: 'compliant',
      key_requirements: ['GDPR', 'Solvency II', 'MiFID II', 'PSD2', 'Digital Services Act']
    },
    {
      region: 'Asia Pacific',
      countries: 34,
      compliance_score: 97.8,
      regulations: 2956,
      last_update: '2024-06-19 15:22',
      status: 'monitoring',
      key_requirements: ['PIPEDA', 'Personal Information Protection', 'Insurance Regulation', 'APRA']
    },
    {
      region: 'Latin America',
      countries: 21,
      compliance_score: 96.4,
      regulations: 1823,
      last_update: '2024-06-19 12:18',
      status: 'updating',
      key_requirements: ['LGPD', 'Insurance Superintendency', 'Consumer Protection', 'Financial Codes']
    },
    {
      region: 'Africa',
      countries: 54,
      compliance_score: 94.7,
      regulations: 1456,
      last_update: '2024-06-19 11:30',
      status: 'monitoring',
      key_requirements: ['Insurance Acts', 'Consumer Protection', 'Banking Regulations', 'POPIA']
    },
    {
      region: 'Middle East',
      countries: 18,
      compliance_score: 95.8,
      regulations: 967,
      last_update: '2024-06-19 16:45',
      status: 'compliant',
      key_requirements: ['Sharia Compliance', 'Takaful Regulations', 'Insurance Laws', 'GDPR Extensions']
    },
    {
      region: 'Oceania',
      countries: 14,
      compliance_score: 98.1,
      regulations: 432,
      last_update: '2024-06-19 09:15',
      status: 'compliant',
      key_requirements: ['APRA', 'Privacy Act', 'Insurance Contracts Act', 'Financial Services']
    }
  ];

  const regulatoryAlerts: RegulatoryAlert[] = [
    {
      country: 'India',
      regulation: 'IRDAI Digital Guidelines 2024',
      type: 'new',
      severity: 'high',
      deadline: '2024-07-15',
      description: 'New digital insurance platform requirements and KYC protocols',
      auto_adapted: true
    },
    {
      country: 'Brazil',
      regulation: 'SUSEP Resolution 462',
      type: 'update',
      severity: 'medium',
      deadline: '2024-08-30',
      description: 'Updated capital adequacy requirements for foreign insurers',
      auto_adapted: true
    },
    {
      country: 'Singapore',
      regulation: 'MAS Technology Risk Guidelines',
      type: 'update',
      severity: 'high',
      deadline: '2024-07-01',
      description: 'Enhanced cybersecurity and operational resilience requirements',
      auto_adapted: true
    },
    {
      country: 'Nigeria',
      regulation: 'NAICOM Risk-Based Supervision',
      type: 'new',
      severity: 'critical',
      deadline: '2024-06-25',
      description: 'Implementation of risk-based supervision framework',
      auto_adapted: false
    },
    {
      country: 'Germany',
      regulation: 'BaFin AI Guidelines',
      type: 'new',
      severity: 'medium',
      deadline: '2024-09-15',
      description: 'Guidelines for AI usage in insurance underwriting and claims',
      auto_adapted: true
    }
  ];

  const complianceMetrics: ComplianceMetric[] = [
    {
      title: 'Global Compliance Score',
      value: `${realTimeData.compliance_score.toFixed(1)}%`,
      trend: '+2.3% this quarter',
      icon: Shield,
      description: 'Overall regulatory compliance across all markets'
    },
    {
      title: 'Countries Covered',
      value: realTimeData.countries.toString(),
      trend: '+12 this year',
      icon: Globe,
      description: 'Markets with full regulatory compliance'
    },
    {
      title: 'Regulations Monitored',
      value: realTimeData.regulations.toLocaleString(),
      trend: '+1,247 this year',
      icon: FileCheck,
      description: 'Active regulatory requirements tracked'
    },
    {
      title: 'Auto-Adaptations Today',
      value: realTimeData.updates.toString(),
      trend: 'Real-time updates',
      icon: Brain,
      description: 'Automatic compliance adjustments made'
    },
    {
      title: 'Compliance Response Time',
      value: '0.8 hours',
      trend: '94% faster than industry',
      icon: Clock,
      description: 'Average time to implement new requirements'
    },
    {
      title: 'Regulatory Accuracy',
      value: '99.4%',
      trend: 'Industry leading',
      icon: Award,
      description: 'Accuracy of regulatory interpretation'
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'monitoring': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'updating': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Global Regulatory Compliance AI</h1>
            <p className="text-indigo-100">Automated compliance adaptation across 200+ countries with real-time monitoring</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{realTimeData.compliance_score.toFixed(1)}%</div>
            <div className="text-indigo-200">Global Compliance</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="w-8 h-8 text-indigo-600" />
              <span className="text-green-600 text-sm font-medium">{metric.trend}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-500 mb-2">{metric.title}</div>
            <div className="text-xs text-gray-400">{metric.description}</div>
          </div>
        ))}
      </div>

      {/* Real-time Compliance Dashboard */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          Real-time Compliance Monitoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <Eye className="w-8 h-8 text-indigo-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{realTimeData.regulations.toLocaleString()}</div>
                <div className="text-sm text-indigo-500">Regulations Tracked</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{realTimeData.updates}</div>
                <div className="text-sm text-green-500">Auto-Updates Today</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <Globe className="w-8 h-8 text-blue-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{realTimeData.countries}</div>
                <div className="text-sm text-blue-500">Countries Compliant</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <Zap className="w-8 h-8 text-purple-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">0.8h</div>
                <div className="text-sm text-purple-500">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="overview" label="Regional Overview" active={activeTab === 'overview'} />
        <TabButton id="alerts" label="Regulatory Alerts" active={activeTab === 'alerts'} />
        <TabButton id="automation" label="AI Automation" active={activeTab === 'automation'} />
        <TabButton id="analytics" label="Compliance Analytics" active={activeTab === 'analytics'} />
      </div>

      {/* Regional Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Map className="w-6 h-6 mr-2 text-blue-600" />
              Global Compliance by Region
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceRegions.map((region, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{region.region}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(region.status)}`}>
                      {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Countries</span>
                      <span className="font-medium">{region.countries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compliance Score</span>
                      <span className="font-medium text-green-600">{region.compliance_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${region.compliance_score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Regulations</span>
                      <span className="font-medium">{region.regulations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Update</span>
                      <span className="text-gray-700">{region.last_update}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">Key Requirements:</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {region.key_requirements.map((req, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
              Active Regulatory Alerts
            </h3>
            <div className="space-y-4">
              {regulatoryAlerts.map((alert, index) => (
                <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Flag className="w-5 h-5 mr-3" />
                      <div>
                        <span className="font-semibold">{alert.country}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm">{alert.regulation}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.type === 'new' ? 'bg-blue-100 text-blue-800' :
                        alert.type === 'update' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {alert.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">Due: {alert.deadline}</span>
                      {alert.auto_adapted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Severity: {alert.severity.toUpperCase()}</span>
                    <span className={alert.auto_adapted ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                      {alert.auto_adapted ? 'Automatically Adapted' : 'Manual Review Required'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6">
              <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
              <h4 className="text-lg font-bold text-red-800 mb-2">Critical Alerts</h4>
              <div className="text-3xl font-bold text-red-600 mb-2">1</div>
              <p className="text-red-700 text-sm">Requires immediate attention</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-green-800 mb-2">Auto-Adapted</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <p className="text-green-700 text-sm">Automatically compliant</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
              <Clock className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-blue-800 mb-2">Avg Response</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">0.8h</div>
              <p className="text-blue-700 text-sm">Time to compliance</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-purple-600" />
              AI-Powered Compliance Automation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Database className="w-6 h-6 text-blue-600 mr-3" />
                    <h4 className="font-semibold">Regulatory Data Processing</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sources Monitored</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Speed</span>
                      <span className="font-medium">0.3 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy Rate</span>
                      <span className="font-medium text-green-600">99.4%</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                    <h4 className="font-semibold">Auto-Adaptation Engine</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-medium text-green-600">96.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Manual Interventions</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Savings</span>
                      <span className="font-medium">94% vs manual</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Scale className="w-6 h-6 text-green-600 mr-3" />
                    <h4 className="font-semibold">Compliance Validation</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Validation Speed</span>
                      <span className="font-medium">Real-time</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cross-references</span>
                      <span className="font-medium">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conflict Detection</span>
                      <span className="font-medium text-blue-600">99.7%</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Building className="w-6 h-6 text-orange-600 mr-3" />
                    <h4 className="font-semibold">Platform Integration</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Auto-Deployment</span>
                      <span className="font-medium">Seamless</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zero Downtime</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rollback Capability</span>
                      <span className="font-medium">Instant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2" />
              AI Automation Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-sm text-gray-600">Automation Success</div>
                <div className="font-bold text-gray-800">96.8%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-600">Response Time</div>
                <div className="font-bold text-gray-800">0.8 hours</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-600">Human Oversight</div>
                <div className="font-bold text-gray-800">3.2% only</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Award className="w-6 h-6 text-yellow-600 mb-2" />
                <div className="text-sm text-gray-600">Accuracy Rate</div>
                <div className="font-bold text-gray-800">99.4%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
              Compliance Performance Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">98.7%</div>
                <div className="text-sm text-gray-600">Global Compliance</div>
                <div className="text-xs text-green-500 mt-1">+2.3% QoQ</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0.8h</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
                <div className="text-xs text-blue-500 mt-1">94% faster</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">96.8%</div>
                <div className="text-sm text-gray-600">Auto-Adaptation</div>
                <div className="text-xs text-purple-500 mt-1">Industry leading</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">$2.4M</div>
                <div className="text-sm text-gray-600">Compliance Savings</div>
                <div className="text-xs text-orange-500 mt-1">vs manual process</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold mb-4">Compliance Trends</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Q1 2024</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-blue-600 h-2 rounded-full w-11/12"></div>
                    </div>
                    <span className="font-medium">94.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Q2 2024</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="font-medium">98.7%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Q3 2024 (Proj)</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="font-medium">99.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold mb-4">Regional Performance</h4>
              <div className="space-y-3">
                {complianceRegions.slice(0, 4).map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{region.region}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${region.compliance_score}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{region.compliance_score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
