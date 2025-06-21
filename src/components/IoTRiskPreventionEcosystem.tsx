'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Shield, 
  Car, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Battery,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Lock,
  Zap,
  TrendingUp,
  Bell,
  MapPin,
  Activity,
  Settings,
  Globe,
  Smartphone
} from 'lucide-react';

interface IoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'camera' | 'smart_lock' | 'thermostat' | 'detector' | 'wearable' | 'vehicle' | 'environmental';
  location: string;
  status: 'active' | 'warning' | 'critical' | 'offline';
  batteryLevel: number;
  lastUpdate: string;
  riskLevel: number;
  metrics: { [key: string]: number | string };
}

interface RiskAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  message: string;
  deviceId: string;
  timestamp: string;
  actionRequired: boolean;
  autoResolved: boolean;
}

interface PreventionAction {
  id: string;
  type: 'automated' | 'recommendation' | 'alert';
  description: string;
  impact: number;
  completed: boolean;
  timestamp: string;
}

export default function IoTRiskPreventionEcosystem() {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Smart Smoke Detector',
      type: 'detector',
      location: 'Living Room',
      status: 'active',
      batteryLevel: 92,
      lastUpdate: '2 min ago',
      riskLevel: 5,
      metrics: { smoke: 0, co: 0, temperature: 72 }
    },
    {
      id: '2',
      name: 'Security Camera',
      type: 'camera',
      location: 'Front Door',
      status: 'active',
      batteryLevel: 88,
      lastUpdate: '1 min ago',
      riskLevel: 10,
      metrics: { motion: 'detected', recording: 'active', nightVision: 'on' }
    },
    {
      id: '3',
      name: 'Smart Thermostat',
      type: 'thermostat',
      location: 'Main Hall',
      status: 'active',
      batteryLevel: 95,
      lastUpdate: '3 min ago',
      riskLevel: 2,
      metrics: { temperature: 74, humidity: 45, energy: 'optimized' }
    },
    {
      id: '4',
      name: 'Water Leak Sensor',
      type: 'sensor',
      location: 'Basement',
      status: 'warning',
      batteryLevel: 67,
      lastUpdate: '1 min ago',
      riskLevel: 35,
      metrics: { moisture: 15, temperature: 68, alert: 'minor leak detected' }
    },
    {
      id: '5',
      name: 'Tesla Model S Sensor',
      type: 'vehicle',
      location: 'Garage',
      status: 'active',
      batteryLevel: 85,
      lastUpdate: '5 min ago',
      riskLevel: 8,
      metrics: { mileage: 1250, battery: 85, location: 'home' }
    },
    {
      id: '6',
      name: 'Apple Watch',
      type: 'wearable',
      location: 'Personal',
      status: 'active',
      batteryLevel: 72,
      lastUpdate: '30 sec ago',
      riskLevel: 12,
      metrics: { heartRate: 72, steps: 8450, activity: 'moderate' }
    }
  ]);

  const [alerts, setAlerts] = useState<RiskAlert[]>([
    {
      id: '1',
      severity: 'medium',
      type: 'Water Damage',
      message: 'Minor water leak detected in basement. Automatic shutoff valve activated.',
      deviceId: '4',
      timestamp: '2 min ago',
      actionRequired: true,
      autoResolved: false
    },
    {
      id: '2',
      severity: 'low',
      type: 'Security',
      message: 'Unusual activity detected at front door during normal hours.',
      deviceId: '2',
      timestamp: '15 min ago',
      actionRequired: false,
      autoResolved: true
    },
    {
      id: '3',
      severity: 'low',
      type: 'Health',
      message: 'Elevated heart rate detected during rest period.',
      deviceId: '6',
      timestamp: '1 hour ago',
      actionRequired: false,
      autoResolved: true
    }
  ]);

  const [preventionActions, setPreventionActions] = useState<PreventionAction[]>([
    {
      id: '1',
      type: 'automated',
      description: 'Water main shutoff valve activated to prevent flood damage',
      impact: 95,
      completed: true,
      timestamp: '2 min ago'
    },
    {
      id: '2',
      type: 'recommendation',
      description: 'Schedule HVAC maintenance based on efficiency metrics',
      impact: 78,
      completed: false,
      timestamp: '1 hour ago'
    },
    {
      id: '3',
      type: 'automated',
      description: 'Adjusted insurance premium based on improved risk profile',
      impact: 85,
      completed: true,
      timestamp: '1 day ago'
    }
  ]);

  const [overallRiskScore, setOverallRiskScore] = useState(0);
  const [connectedDevices, setConnectedDevices] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const activeDevices = devices.filter(d => d.status !== 'offline').length;
    setConnectedDevices(activeDevices);
    
    const avgRisk = devices.reduce((sum, device) => sum + device.riskLevel, 0) / devices.length;
    setOverallRiskScore(Math.round(avgRisk));
  }, [devices]);

  const simulateRiskEvent = async () => {
    setIsSimulating(true);
    
    // Simulate a new risk event
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAlert: RiskAlert = {
      id: Date.now().toString(),
      severity: 'high',
      type: 'Fire Risk',
      message: 'Smoke detected in kitchen. Fire suppression system activated.',
      deviceId: '1',
      timestamp: 'now',
      actionRequired: true,
      autoResolved: false
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Add automated response
    const newAction: PreventionAction = {
      id: Date.now().toString(),
      type: 'automated',
      description: 'Fire suppression system activated, emergency services contacted',
      impact: 99,
      completed: true,
      timestamp: 'now'
    };
    
    setPreventionActions(prev => [newAction, ...prev]);
    setIsSimulating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'sensor': return Droplets;
      case 'camera': return Eye;
      case 'smart_lock': return Lock;
      case 'thermostat': return Thermometer;
      case 'detector': return Shield;
      case 'wearable': return Heart;
      case 'vehicle': return Car;
      case 'environmental': return Wind;
      default: return Wifi;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Wifi className="text-blue-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              IoT Risk Prevention Ecosystem
            </h1>
            <Shield className="text-green-600 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered IoT integration for proactive risk prevention and real-time protection
          </p>
        </div>

        {/* Overview Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">{connectedDevices}</h3>
                <p className="text-gray-600">Connected Devices</p>
              </div>
              <Wifi className="text-blue-500" size={32} />
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              <span className="text-sm text-green-600 font-medium">All systems operational</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-green-600">{overallRiskScore}%</h3>
                <p className="text-gray-600">Risk Reduction</p>
              </div>
              <Shield className="text-green-500" size={32} />
            </div>
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" size={16} />
              <span className="text-sm text-green-600 font-medium">vs. unmonitored</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-orange-600">{alerts.length}</h3>
                <p className="text-gray-600">Active Alerts</p>
              </div>
              <Bell className="text-orange-500" size={32} />
            </div>
            <div className="flex items-center">
              <AlertTriangle className="text-orange-500 mr-2" size={16} />
              <span className="text-sm text-orange-600 font-medium">requiring attention</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-600">{preventionActions.filter(a => a.completed).length}</h3>
                <p className="text-gray-600">Actions Taken</p>
              </div>
              <Zap className="text-purple-500" size={32} />
            </div>
            <div className="flex items-center">
              <Activity className="text-purple-500 mr-2" size={16} />
              <span className="text-sm text-purple-600 font-medium">automated responses</span>
            </div>
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Settings className="text-blue-600 mr-2" size={24} />
              Connected IoT Devices
            </h3>
            
            <div className="space-y-4">
              {devices.map((device) => {
                const IconComponent = getDeviceIcon(device.type);
                return (
                  <div key={device.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className="text-gray-600 mr-3" size={20} />
                        <div>
                          <div className="font-medium">{device.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="mr-1" size={12} />
                            {device.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status).replace('text-', 'bg-')}`} />
                        <span className="text-sm font-medium">
                          Risk: {device.riskLevel}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
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
                        <div className="text-gray-500">Status</div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityColor(device.status)}`}>
                          {device.status}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs font-medium text-gray-600 mb-2">Live Metrics</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(device.metrics).map(([key, value]) => (
                          <span key={key} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Alerts & Prevention Actions */}
          <div className="space-y-6">
            {/* Risk Alerts */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Bell className="text-orange-600 mr-2" size={24} />
                Risk Alerts
              </h3>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle className="text-orange-500 mr-2" size={16} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <div className="font-medium text-gray-800 mb-1">{alert.type}</div>
                    <div className="text-sm text-gray-600 mb-3">{alert.message}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {alert.actionRequired && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Action Required</span>
                        )}
                        {alert.autoResolved && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Auto-Resolved</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Zap className="text-purple-600 mr-2" size={24} />
                Prevention Actions
              </h3>
              
              <div className="space-y-4">
                {preventionActions.map((action) => (
                  <div key={action.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        {action.type === 'automated' ? (
                          <Zap className="text-purple-500 mr-2" size={16} />
                        ) : (
                          <Smartphone className="text-blue-500 mr-2" size={16} />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          action.type === 'automated' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {action.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{action.timestamp}</span>
                        {action.completed ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <Clock className="text-orange-500" size={16} />
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-800 mb-2">{action.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Impact:</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${action.impact}%` }}
                          />
                        </div>
                        <span className="text-xs ml-2 font-medium">{action.impact}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={simulateRiskEvent}
                disabled={isSimulating}
                className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
              >
                {isSimulating ? (
                  <>
                    <Activity className="animate-spin mr-2" size={16} />
                    Simulating Event...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2" size={16} />
                    Simulate Risk Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Global Impact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <Globe className="mx-auto mb-4 text-yellow-300" size={48} />
            <h3 className="text-2xl font-bold mb-4">Global IoT Risk Prevention Network</h3>
            <p className="text-lg mb-6 opacity-90">
              Our advanced IoT ecosystem prevents risks before they become claims, 
              reducing overall insurance costs and improving safety for millions worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2.4M+</div>
                <div className="text-sm opacity-90">Connected Devices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">87%</div>
                <div className="text-sm opacity-90">Risk Prevention Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">$4.2B</div>
                <div className="text-sm opacity-90">Claims Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">150+</div>
                <div className="text-sm opacity-90">Countries Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
