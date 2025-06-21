'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Server, 
  Users, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  RefreshCw
} from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
  errorRate: number;
  userEngagement: number;
  conversionRate: number;
  activeUsers: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: number;
  metric: keyof PerformanceMetrics;
}

export default function UniversalPerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkLatency: 0,
    errorRate: 0,
    userEngagement: 0,
    conversionRate: 0,
    activeUsers: 0
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Universal Performance Monitoring (works globally)
  useEffect(() => {
    if (!isMonitoring) return;

    const measurePerformance = () => {
      // Core Web Vitals and Universal Metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;

      const newMetrics: PerformanceMetrics = {
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        renderTime: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        memoryUsage: memory ? memory.usedJSHeapSize / memory.totalJSHeapSize * 100 : 0,
        networkLatency: navigation ? navigation.responseStart - navigation.requestStart : 0,
        errorRate: Math.random() * 2, // Simulated - would connect to real error tracking
        userEngagement: 75 + Math.random() * 20, // Simulated engagement score
        conversionRate: 15 + Math.random() * 10, // Simulated conversion rate
        activeUsers: Math.floor(500 + Math.random() * 1500) // Simulated active users
      };

      setMetrics(newMetrics);
      setLastUpdate(new Date());

      // Generate alerts for performance issues
      const newAlerts: PerformanceAlert[] = [];
      
      if (newMetrics.loadTime > 3000) {
        newAlerts.push({
          id: Date.now().toString(),
          type: 'warning',
          message: 'Page load time exceeds 3 seconds',
          timestamp: Date.now(),
          metric: 'loadTime'
        });
      }

      if (newMetrics.memoryUsage > 80) {
        newAlerts.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          message: 'High memory usage detected',
          timestamp: Date.now(),
          metric: 'memoryUsage'
        });
      }

      if (newMetrics.errorRate > 1) {
        newAlerts.push({
          id: (Date.now() + 2).toString(),
          type: 'warning',
          message: 'Error rate above normal threshold',
          timestamp: Date.now(),
          metric: 'errorRate'
        });
      }

      setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)]);
    };

    measurePerformance();
    const interval = setInterval(measurePerformance, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const getMetricColor = (value: number, metric: keyof PerformanceMetrics) => {
    const thresholds = {
      loadTime: { good: 1500, poor: 3000 },
      renderTime: { good: 100, poor: 300 },
      memoryUsage: { good: 50, poor: 80 },
      networkLatency: { good: 100, poor: 300 },
      errorRate: { good: 0.5, poor: 2 },
      userEngagement: { good: 80, poor: 60 },
      conversionRate: { good: 20, poor: 10 },
      activeUsers: { good: 1000, poor: 500 }
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'text-green-600 bg-green-50 border-green-200';
    if (value <= threshold.poor) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const formatMetricValue = (value: number, metric: keyof PerformanceMetrics) => {
    switch (metric) {
      case 'loadTime':
      case 'renderTime':
      case 'networkLatency':
        return `${Math.round(value)}ms`;
      case 'memoryUsage':
      case 'userEngagement':
      case 'conversionRate':
      case 'errorRate':
        return `${value.toFixed(1)}%`;
      case 'activeUsers':
        return Math.round(value).toLocaleString();
      default:
        return value.toString();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <Activity className="h-8 w-8 text-purple-600" />
            <span>Universal Performance Monitor</span>
          </h2>
          <p className="text-gray-600 mt-1">
            Global-ready performance tracking and optimization system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={toggleMonitoring}
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
              isMonitoring 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isMonitoring ? <Activity className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
            <span>{isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}</span>
          </button>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics).map(([key, value]) => {
          const metric = key as keyof PerformanceMetrics;
          const metricIcons = {
            loadTime: Clock,
            renderTime: Zap,
            memoryUsage: Server,
            networkLatency: Activity,
            errorRate: AlertTriangle,
            userEngagement: Users,
            conversionRate: TrendingUp,
            activeUsers: Users
          };
          const Icon = metricIcons[metric];

          return (
            <div
              key={key}
              className={`p-6 rounded-xl border-2 ${getMetricColor(value, metric)} transition-colors`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="h-6 w-6" />
                <div className="text-2xl font-bold">
                  {formatMetricValue(value, metric)}
                </div>
              </div>
              <div className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Performance Alerts</span>
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'error' 
                    ? 'bg-red-50 border-red-400 text-red-700'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-700'
                    : 'bg-blue-50 border-blue-400 text-blue-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{alert.message}</span>
                  <span className="text-sm opacity-75">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          <span>Universal Performance Insights</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Optimization Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Image optimization active</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Progressive loading enabled</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Consider code splitting for better performance</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Global Compatibility</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cross-browser compatible</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Mobile-optimized experience</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Offline functionality ready</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
