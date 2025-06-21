'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Smartphone, 
  Car, 
  Home, 
  Heart, 
  Briefcase,
  TrendingDown,
  Clock,
  Battery,
  Wifi,
  Shield,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  DollarSign,
  Award,
  Target
} from 'lucide-react';

interface UsageData {
  category: string;
  usage: number;
  baseline: number;
  savings: number;
  riskLevel: 'low' | 'medium' | 'high';
  icon: React.ComponentType<{ className?: string }>;
}

interface IoTDevice {
  id: string;
  name: string;
  type: 'smartphone' | 'home_sensor' | 'wearable' | 'vehicle' | 'business';
  status: 'connected' | 'disconnected' | 'syncing';
  batteryLevel: number;
  lastUpdate: string;
  dataPoints: number;
}

export default function UsageBasedInsuranceEngine() {
  const [usageData, setUsageData] = useState<UsageData[]>([
    {
      category: 'Driving Behavior',
      usage: 0.75,
      baseline: 1.0,
      savings: 320,
      riskLevel: 'low',
      icon: Car
    },
    {
      category: 'Home Security',
      usage: 0.85,
      baseline: 1.0,
      savings: 180,
      riskLevel: 'low',
      icon: Home
    },
    {
      category: 'Health & Wellness',
      usage: 0.9,
      baseline: 1.0,
      savings: 450,
      riskLevel: 'low',
      icon: Heart
    },
    {
      category: 'Business Activity',
      usage: 0.6,
      baseline: 1.0,
      savings: 780,
      riskLevel: 'low',
      icon: Briefcase
    }
  ]);

  const [iotDevices, setIotDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'smartphone',
      status: 'connected',
      batteryLevel: 87,
      lastUpdate: '2 min ago',
      dataPoints: 1247
    },
    {
      id: '2',
      name: 'Smart Home Hub',
      type: 'home_sensor',
      status: 'connected',
      batteryLevel: 95,
      lastUpdate: '1 min ago',
      dataPoints: 892
    },
    {
      id: '3',
      name: 'Apple Watch',
      type: 'wearable',
      status: 'syncing',
      batteryLevel: 64,
      lastUpdate: '5 min ago',
      dataPoints: 2134
    },
    {
      id: '4',
      name: 'Tesla Model S',
      type: 'vehicle',
      status: 'connected',
      batteryLevel: 78,
      lastUpdate: '3 min ago',
      dataPoints: 567
    }
  ]);

  const [totalSavings, setTotalSavings] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const total = usageData.reduce((sum, data) => sum + data.savings, 0);
    setTotalSavings(total);
    
    const avgUsage = usageData.reduce((sum, data) => sum + data.usage, 0) / usageData.length;
    setRiskScore(Math.round((1 - avgUsage) * 100));
  }, [usageData]);

  const analyzeUsagePattern = async () => {
    setIsAnalyzing(true);
    
    // Simulate real-time analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update usage data with new patterns
    setUsageData(prev => prev.map(data => ({
      ...data,
      usage: Math.random() * 0.4 + 0.6, // Good usage patterns
      savings: Math.floor(Math.random() * 400 + 200)
    })));
    
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'syncing': return 'text-yellow-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Activity className="text-blue-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              Universal Usage-Based Insurance
            </h1>
            <BarChart3 className="text-purple-600 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered usage tracking across all insurance categories with real-time IoT integration
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-green-600">${totalSavings}</h3>
                <p className="text-gray-600">Annual Savings</p>
              </div>
              <DollarSign className="text-green-500" size={32} />
            </div>
            <div className="flex items-center">
              <TrendingDown className="text-green-500 mr-2" size={16} />
              <span className="text-sm text-green-600 font-medium">vs. traditional pricing</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">{riskScore}%</h3>
                <p className="text-gray-600">Risk Reduction</p>
              </div>
              <Shield className="text-blue-500" size={32} />
            </div>
            <div className="flex items-center">
              <Target className="text-blue-500 mr-2" size={16} />
              <span className="text-sm text-blue-600 font-medium">below market average</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-600">{iotDevices.length}</h3>
                <p className="text-gray-600">Connected Devices</p>
              </div>
              <Wifi className="text-purple-500" size={32} />
            </div>
            <div className="flex items-center">
              <Zap className="text-purple-500 mr-2" size={16} />
              <span className="text-sm text-purple-600 font-medium">real-time monitoring</span>
            </div>
          </div>
        </div>

        {/* Usage Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <LineChart className="text-blue-600 mr-2" size={24} />
              Usage-Based Savings by Category
            </h3>
            
            <div className="space-y-6">
              {usageData.map((data, index) => {
                const IconComponent = data.icon;
                return (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className="text-gray-600 mr-3" />
                        <span className="font-medium">{data.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(data.riskLevel)}`}>
                          {data.riskLevel} risk
                        </span>
                        <span className="text-green-600 font-semibold">
                          ${data.savings}/year
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Usage vs Baseline</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(data.usage * 100)}% vs {Math.round(data.baseline * 100)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 relative">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.baseline - data.usage) * 100}%` }}
                      />
                      <div 
                        className="absolute top-0 bg-gray-400 h-3 rounded-full opacity-30"
                        style={{ 
                          left: `${(data.baseline - data.usage) * 100}%`,
                          width: `${data.usage * 100}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={analyzeUsagePattern}
              disabled={isAnalyzing}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="animate-spin mr-2" size={20} />
                  Analyzing Usage Patterns...
                </>
              ) : (
                <>
                  <BarChart3 className="mr-2" size={20} />
                  Refresh Analysis
                </>
              )}
            </button>
          </div>

          {/* IoT Device Management */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Smartphone className="text-purple-600 mr-2" size={24} />
              Connected IoT Devices
            </h3>
            
            <div className="space-y-4">
              {iotDevices.map((device) => (
                <div key={device.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {device.type === 'smartphone' && <Smartphone className="text-blue-500 mr-3" size={20} />}
                      {device.type === 'home_sensor' && <Home className="text-green-500 mr-3" size={20} />}
                      {device.type === 'wearable' && <Heart className="text-red-500 mr-3" size={20} />}
                      {device.type === 'vehicle' && <Car className="text-gray-600 mr-3" size={20} />}
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.type.replace('_', ' ')}</div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status).replace('text-', 'bg-')}`} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Battery</div>
                      <div className="flex items-center">
                        <Battery className="text-gray-400 mr-1" size={14} />
                        <span className="font-medium">{device.batteryLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Last Update</div>
                      <div className="flex items-center">
                        <Clock className="text-gray-400 mr-1" size={14} />
                        <span className="font-medium">{device.lastUpdate}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Data Points</div>
                      <div className="flex items-center">
                        <PieChart className="text-gray-400 mr-1" size={14} />
                        <span className="font-medium">{device.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="text-blue-600 mr-2" size={20} />
                <span className="font-semibold text-blue-800">Real-time Benefits</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Instant premium adjustments</li>
                <li>• Proactive risk prevention alerts</li>
                <li>• Behavioral insights & coaching</li>
                <li>• Fraud detection & prevention</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Capabilities */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <Award className="mx-auto mb-4 text-yellow-300" size={48} />
            <h3 className="text-2xl font-bold mb-4">Next-Generation Usage Intelligence</h3>
            <p className="text-lg mb-6 opacity-90">
              Advanced AI models predict and prevent risks before they occur, delivering 
              unprecedented accuracy and savings across all insurance categories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">99.7%</div>
                <div className="text-sm opacity-90">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">$2.1K</div>
                <div className="text-sm opacity-90">Average Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm opacity-90">Risk Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15+</div>
                <div className="text-sm opacity-90">Device Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
