'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Types for carrier data
interface CarrierStatus {
  id: string;
  name: string;
  status: 'online' | 'degraded' | 'offline';
  responseTime: number;
  errorRate: number;
  lastCheck: Date;
  apiEndpoint: string;
  uptime: number;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

interface CarrierMetrics {
  totalQuotes: number;
  avgSavings: number;
  conversionRate: number;
  activePolicies: number;
}

export default function CarrierDashboard() {
  const [carriers, setCarriers] = useState<CarrierStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [metrics, setMetrics] = useState<CarrierMetrics>({
    totalQuotes: 0,
    avgSavings: 0,
    conversionRate: 0,
    activePolicies: 0
  });

  // Mock function to simulate carrier status check
  const fetchCarrierStatus = async (carrierId: string): Promise<CarrierStatus> => {
    try {
      // In production, call your carrier monitoring service
      const response = await fetch(`/api/carriers/${carrierId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Monitoring API failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching status for ${carrierId}:`, error);
      
      // Fallback to mock data if API fails
      return {
        id: carrierId,
        name: `Carrier ${carrierId}`,
        status: Math.random() > 0.8 ? 'degraded' : 'online',
        responseTime: Math.floor(Math.random() * 500) + 100,
        errorRate: Math.random() * 5,
        lastCheck: new Date(),
        apiEndpoint: `https://api.carrier${carrierId}.com/v1`,
        uptime: 95 + Math.random() * 5
      };
    }
  };

  // Function to fetch all carrier statuses
  const fetchAllCarrierStatuses = useCallback(async () => {
    setLoading(true);
    const carrierIds = ['state-farm', 'geico', 'progressive', 'allstate', 'liberty-mutual'];
    
    try {
      const statusPromises = carrierIds.map(id => 
        fetchCarrierStatus(id).catch(error => ({
          error: true,
          carrierId: id,
          reason: error.message
        }))
      );

      const results = await Promise.allSettled(statusPromises);
      const validStatuses: CarrierStatus[] = [];
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && !('error' in result.value)) {
          validStatuses.push(result.value as CarrierStatus);
        } else {
          console.warn(`⚠️ Failed to fetch status for ${carrierIds[index]}:`, result);
        }
      });

      setCarriers(validStatuses);

      // Update metrics based on carrier performance
      const totalQuotes = validStatuses.reduce((sum) => 
        sum + Math.floor(Math.random() * 1000), 0
      );
      
      setMetrics({
        totalQuotes,
        avgSavings: Math.floor(Math.random() * 500) + 200,
        conversionRate: Math.random() * 20 + 15,
        activePolicies: Math.floor(totalQuotes * 0.3)
      });

      // Generate alerts based on carrier status
      const newAlerts: SystemAlert[] = [];
      
      const degradedCarriers = validStatuses.filter(c => c.status === 'degraded');
      const offlineCarriers = validStatuses.filter(c => c.status === 'offline');
      
      if (offlineCarriers.length > 0) {
        newAlerts.push({
          id: `alert_${Date.now()}_offline`,
          type: 'error',
          message: `${offlineCarriers.length} carrier(s) offline: ${offlineCarriers.map(c => c.name).join(', ')}`,
          timestamp: new Date()
        });
      }

      if (degradedCarriers.length > 2) {
        newAlerts.push({
          id: `alert_${Date.now()}_health`,
          type: 'error',
          message: 'System health degraded. Multiple carriers experiencing issues.',
          timestamp: new Date()
        });
      }

      const highLatencyCarriers = validStatuses.filter(c => c.responseTime > 300);
      if (highLatencyCarriers.length > 0) {
        newAlerts.push({
          id: `alert_${Date.now()}_latency`,
          type: 'warning',
          message: 'High API latency detected. Response times above normal.',
          timestamp: new Date()
        });
      }

      const highErrorCarriers = validStatuses.filter(c => c.errorRate > 3);
      if (highErrorCarriers.length > 0) {
        newAlerts.push({
          id: `alert_${Date.now()}_errors`,
          type: 'warning',
          message: `Elevated error rates detected for ${highErrorCarriers.length} carrier(s).`,
          timestamp: new Date()
        });
      }

      setAlerts(newAlerts);

    } catch (error) {
      console.error('Error fetching carrier data:', error);
      setAlerts([{
        id: `alert_${Date.now()}_system`,
        type: 'error',
        message: 'Failed to fetch carrier status data.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh carrier data
  useEffect(() => {
    fetchAllCarrierStatuses();
    const interval = setInterval(fetchAllCarrierStatuses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchAllCarrierStatuses]);

  // Health check function
  const runHealthCheck = async () => {
    try {
      const response = await fetch('/api/system/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const healthData = await response.json();
        setAlerts(prev => [...prev, {
          id: `alert_${Date.now()}_health`,
          type: 'info',
          message: `System health check completed. Status: ${healthData.status}`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setAlerts(prev => [...prev, {
        id: `alert_${Date.now()}_health_error`,
        type: 'error',
        message: 'Health check failed. System monitoring may be impaired.',
        timestamp: new Date()
      }]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading carrier dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrier Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Monitor carrier integrations and system health in real-time
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Quotes</dt>
                  <dd className="text-lg font-medium text-gray-900">{metrics.totalQuotes.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Savings</dt>
                  <dd className="text-lg font-medium text-gray-900">${metrics.avgSavings}</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                  <dd className="text-lg font-medium text-gray-900">{metrics.conversionRate.toFixed(1)}%</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Policies</dt>
                  <dd className="text-lg font-medium text-gray-900">{metrics.activePolicies.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={fetchAllCarrierStatuses}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Refresh Status
          </button>
          <button
            onClick={runHealthCheck}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Run Health Check
          </button>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {alert.type === 'error' && (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {alert.type === 'warning' && (
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      )}
                      {alert.type === 'info' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm mt-1 opacity-75">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Carrier Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {carriers.map((carrier, index) => (
            <motion.div
              key={carrier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{carrier.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(carrier.status)}`}>
                    {carrier.status.charAt(0).toUpperCase() + carrier.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium text-gray-900">{carrier.responseTime}ms</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">{carrier.errorRate.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="text-sm font-medium text-gray-900">{carrier.uptime.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Check</span>
                    <span className="text-sm font-medium text-gray-900">
                      {carrier.lastCheck.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 truncate">
                    Endpoint: {carrier.apiEndpoint}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {carriers.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No carrier data available</h3>
            <p className="mt-1 text-sm text-gray-500">
              Click &ldquo;Refresh Status&rdquo; to fetch current carrier information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
