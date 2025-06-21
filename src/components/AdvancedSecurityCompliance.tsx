'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Server,
  Key,
  Fingerprint,
  Network,
  FileCheck,
  Zap,
  Users,
  Monitor,
  Cloud
} from 'lucide-react';

interface SecurityMetric {
  title: string;
  status: 'excellent' | 'good' | 'warning';
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ComplianceStandard {
  name: string;
  region: string;
  status: 'compliant' | 'pending' | 'not-applicable';
  lastAudit: string;
  nextReview: string;
}

export default function AdvancedSecurityCompliance() {
  const [activeTab, setActiveTab] = useState('security');

  const securityMetrics: SecurityMetric[] = [
    {
      title: 'Zero Trust Architecture',
      status: 'excellent',
      value: '100% Verified',
      description: 'Every access request verified regardless of location',
      icon: Shield
    },
    {
      title: 'End-to-End Encryption',
      status: 'excellent',
      value: 'AES-256 + Quantum',
      description: 'Military-grade encryption with quantum resistance',
      icon: Lock
    },
    {
      title: 'Biometric Authentication',
      status: 'excellent',
      value: '99.97% Accuracy',
      description: 'Multi-factor biometric verification system',
      icon: Fingerprint
    },
    {
      title: 'Real-time Threat Detection',
      status: 'excellent',
      value: '<0.1s Response',
      description: 'AI-powered threat identification and mitigation',
      icon: Eye
    },
    {
      title: 'Data Sovereignty',
      status: 'excellent',
      value: '187 Countries',
      description: 'Localized data storage and processing compliance',
      icon: Globe
    },
    {
      title: 'Incident Response',
      status: 'excellent',
      value: '2.3min MTTD',
      description: 'Mean time to detection and automated response',
      icon: RefreshCw
    }
  ];

  const complianceStandards: ComplianceStandard[] = [
    { name: 'SOC 2 Type II', region: 'Global', status: 'compliant', lastAudit: '2024-03-15', nextReview: '2024-09-15' },
    { name: 'ISO 27001', region: 'Global', status: 'compliant', lastAudit: '2024-02-28', nextReview: '2024-08-28' },
    { name: 'GDPR', region: 'Europe', status: 'compliant', lastAudit: '2024-04-10', nextReview: '2024-10-10' },
    { name: 'CCPA', region: 'California, US', status: 'compliant', lastAudit: '2024-03-22', nextReview: '2024-09-22' },
    { name: 'PIPEDA', region: 'Canada', status: 'compliant', lastAudit: '2024-04-05', nextReview: '2024-10-05' },
    { name: 'PDPA', region: 'Singapore', status: 'compliant', lastAudit: '2024-03-30', nextReview: '2024-09-30' },
    { name: 'LGPD', region: 'Brazil', status: 'compliant', lastAudit: '2024-04-12', nextReview: '2024-10-12' },
    { name: 'POPIA', region: 'South Africa', status: 'compliant', lastAudit: '2024-04-08', nextReview: '2024-10-08' },
    { name: 'APPI', region: 'Japan', status: 'compliant', lastAudit: '2024-03-25', nextReview: '2024-09-25' },
    { name: 'PDPO', region: 'Hong Kong', status: 'compliant', lastAudit: '2024-04-01', nextReview: '2024-10-01' }
  ];

  const securityFeatures = [
    {
      title: 'Quantum-Resistant Encryption',
      description: 'Future-proof cryptography protecting against quantum computing threats',
      features: ['Post-quantum cryptography', 'Lattice-based algorithms', 'Quantum key distribution'],
      icon: Key
    },
    {
      title: 'Zero Trust Network',
      description: 'Never trust, always verify - comprehensive identity verification',
      features: ['Identity verification', 'Device authentication', 'Contextual access control'],
      icon: Network
    },
    {
      title: 'AI-Powered Threat Intelligence',
      description: 'Machine learning models predicting and preventing security threats',
      features: ['Behavioral analytics', 'Anomaly detection', 'Predictive threat modeling'],
      icon: Monitor
    },
    {
      title: 'Global Data Localization',
      description: 'Automated compliance with local data residency requirements',
      features: ['Regional data centers', 'Automatic geo-routing', 'Compliance mapping'],
      icon: Cloud
    }
  ];

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-green-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'compliant': 
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'pending': 
        return <AlertTriangle className="w-4 h-4" />;
      default: 
        return <RefreshCw className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Security & Compliance Framework</h1>
            <p className="text-green-100">Enterprise-grade security with global compliance standards</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-green-200">Security Compliance</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-sm">
        <TabButton id="security" label="Security Metrics" active={activeTab === 'security'} />
        <TabButton id="compliance" label="Global Compliance" active={activeTab === 'compliance'} />
        <TabButton id="features" label="Advanced Features" active={activeTab === 'features'} />
        <TabButton id="monitoring" label="Real-time Monitoring" active={activeTab === 'monitoring'} />
      </div>

      {/* Security Metrics Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-green-600" />
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)}
                    <span className="ml-1">{metric.status === 'excellent' ? 'Excellent' : metric.status}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{metric.title}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">{metric.value}</div>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Security Score Overview */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Overall Security Score
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">98.7%</div>
                <div className="text-green-600">Security Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">Zero</div>
                <div className="text-green-600">Successful Attacks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">99.99%</div>
                <div className="text-green-600">Uptime Availability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">24/7</div>
                <div className="text-green-600">Threat Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <FileCheck className="w-6 h-6 mr-2 text-blue-600" />
              Global Compliance Standards
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Standard</th>
                    <th className="text-left py-3 px-4 font-semibold">Region</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Last Audit</th>
                    <th className="text-left py-3 px-4 font-semibold">Next Review</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceStandards.map((standard, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{standard.name}</td>
                      <td className="py-3 px-4 text-gray-600">{standard.region}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit space-x-1 ${getStatusColor(standard.status)}`}>
                          {getStatusIcon(standard.status)}
                          <span className="ml-1">{standard.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{standard.lastAudit}</td>
                      <td className="py-3 px-4 text-gray-600">{standard.nextReview}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="text-lg font-bold text-green-800">Global Coverage</h4>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">187</div>
              <div className="text-green-600">Countries Compliant</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Server className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="text-lg font-bold text-blue-800">Data Centers</h4>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">45</div>
              <div className="text-blue-600">Regional Locations</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <h4 className="text-lg font-bold text-purple-800">Audits Passed</h4>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
              <div className="text-purple-600">Success Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Features Tab */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Competitive Security Advantage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">10x</div>
                <div className="text-indigo-200">Faster Threat Response</div>
              </div>
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">256-bit</div>
                <div className="text-indigo-200">Quantum Encryption</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-indigo-200">Global Compliance</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Monitor className="w-6 h-6 mr-2 text-green-600" />
              Real-time Security Monitoring
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold">System Integrity Check</div>
                    <div className="text-sm text-gray-600">All systems operating normally</div>
                  </div>
                </div>
                <span className="text-green-600 font-medium">Active</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Eye className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold">Threat Detection Engine</div>
                    <div className="text-sm text-gray-600">0 threats detected in last 24h</div>
                  </div>
                </div>
                <span className="text-blue-600 font-medium">Monitoring</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Network className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <div className="font-semibold">Network Security</div>
                    <div className="text-sm text-gray-600">All endpoints secured and verified</div>
                  </div>
                </div>
                <span className="text-purple-600 font-medium">Protected</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <Lock className="w-6 h-6 text-indigo-600 mr-3" />
                  <div>
                    <div className="font-semibold">Data Encryption Status</div>
                    <div className="text-sm text-gray-600">100% of data encrypted at rest and in transit</div>
                  </div>
                </div>
                <span className="text-indigo-600 font-medium">Encrypted</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white">
              <Shield className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">99.99%</div>
              <div className="text-green-100">Security Uptime</div>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
              <Zap className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">0.1s</div>
              <div className="text-blue-100">Threat Response</div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
              <Eye className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Active Monitoring</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl p-6 text-white">
              <Lock className="w-8 h-8 mb-4" />
              <div className="text-2xl font-bold mb-2">Zero</div>
              <div className="text-indigo-100">Data Breaches</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
