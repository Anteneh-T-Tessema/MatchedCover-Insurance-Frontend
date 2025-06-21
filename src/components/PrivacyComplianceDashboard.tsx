/**
 * Privacy Compliance Dashboard Component
 * Shows privacy compliance status and data subject requests
 */

'use client';

import React, { useState, useEffect } from 'react';

interface PrivacyMetrics {
  totalDataSubjects: number;
  activeRequests: number;
  completedRequests: number;
  averageProcessingTime: number; // hours
  complianceScore: number; // percentage
  pendingActions: number;
}

interface DataSubjectRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'opt_out';
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestDate: string;
  dueDate: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  region: 'US' | 'EU' | 'other';
}

interface ComplianceAlert {
  id: string;
  type: 'overdue_request' | 'data_breach' | 'retention_policy' | 'consent_expiry';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export default function PrivacyComplianceDashboard() {
  const [metrics, setMetrics] = useState<PrivacyMetrics>({
    totalDataSubjects: 0,
    activeRequests: 0,
    completedRequests: 0,
    averageProcessingTime: 0,
    complianceScore: 0,
    pendingActions: 0
  });
  
  const [requests, setRequests] = useState<DataSubjectRequest[]>([]);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadPrivacyMetrics();
    loadDataSubjectRequests();
    loadComplianceAlerts();
    
    // Refresh every 5 minutes
    const interval = setInterval(() => {
      loadPrivacyMetrics();
      loadDataSubjectRequests();
      loadComplianceAlerts();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const loadPrivacyMetrics = async () => {
    try {
      // In a real implementation, this would fetch from your API
      const response = await fetch('/api/privacy/metrics', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      } else {
        // Mock data for demo
        setMetrics({
          totalDataSubjects: 15847,
          activeRequests: 23,
          completedRequests: 1456,
          averageProcessingTime: 18.5,
          complianceScore: 96.2,
          pendingActions: 7
        });
      }
    } catch (error) {
      console.error('Failed to load privacy metrics:', error);
      // Use mock data
      setMetrics({
        totalDataSubjects: 15847,
        activeRequests: 23,
        completedRequests: 1456,
        averageProcessingTime: 18.5,
        complianceScore: 96.2,
        pendingActions: 7
      });
    }
  };
  
  const loadDataSubjectRequests = async () => {
    try {
      // Mock data for demo
      const mockRequests: DataSubjectRequest[] = [
        {
          id: 'req_001',
          type: 'access',
          userId: 'user_12345',
          status: 'pending',
          requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          assignedTo: 'privacy.officer@company.com',
          priority: 'medium',
          region: 'EU'
        },
        {
          id: 'req_002',
          type: 'erasure',
          userId: 'user_67890',
          status: 'processing',
          requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
          assignedTo: 'privacy.officer@company.com',
          priority: 'high',
          region: 'EU'
        },
        {
          id: 'req_003',
          type: 'opt_out',
          userId: 'user_11111',
          status: 'pending',
          requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'medium',
          region: 'US'
        }
      ];
      
      setRequests(mockRequests);
    } catch (error) {
      console.error('Failed to load data subject requests:', error);
    }
  };
  
  const loadComplianceAlerts = async () => {
    try {
      // Mock alerts for demo
      const mockAlerts: ComplianceAlert[] = [
        {
          id: 'alert_001',
          type: 'overdue_request',
          severity: 'high',
          message: 'Data subject request req_004 is overdue by 3 days',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          resolved: false
        },
        {
          id: 'alert_002',
          type: 'retention_policy',
          severity: 'medium',
          message: '156 records are approaching retention deadline',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          resolved: false
        },
        {
          id: 'alert_003',
          type: 'consent_expiry',
          severity: 'low',
          message: '23 marketing consents expire in next 30 days',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          resolved: false
        }
      ];
      
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load compliance alerts:', error);
    }
    
    setLoading(false);
  };
  
  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case 'access': return 'bg-blue-100 text-blue-800';
      case 'rectification': return 'bg-green-100 text-green-800';
      case 'erasure': return 'bg-red-100 text-red-800';
      case 'portability': return 'bg-purple-100 text-purple-800';
      case 'opt_out': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };
  
  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };
  
  const formatDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days remaining`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔒 Privacy Compliance Dashboard</h1>
          <p className="text-gray-600">Monitor GDPR/CCPA compliance and data subject requests</p>
        </div>
        
        {/* Compliance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Total Data Subjects</div>
            <div className="text-3xl font-bold text-blue-600">{metrics.totalDataSubjects.toLocaleString()}</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Active Requests</div>
            <div className="text-3xl font-bold text-orange-600">{metrics.activeRequests}</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Completed Requests</div>
            <div className="text-3xl font-bold text-green-600">{metrics.completedRequests}</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Avg Processing Time</div>
            <div className="text-3xl font-bold text-purple-600">{metrics.averageProcessingTime}h</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Compliance Score</div>
            <div className="text-3xl font-bold text-indigo-600">{metrics.complianceScore}%</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Pending Actions</div>
            <div className="text-3xl font-bold text-red-600">{metrics.pendingActions}</div>
          </div>
        </div>
        
        {/* Compliance Alerts */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Compliance Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.filter(alert => !alert.resolved).length === 0 ? (
                <div className="text-gray-500 text-center py-8">No active compliance alerts</div>
              ) : (
                alerts.filter(alert => !alert.resolved).map(alert => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-gray-500">
                          {alert.type.replace('_', ' ').toUpperCase()} • {formatTimeAgo(alert.timestamp)}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Data Subject Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Data Subject Requests</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getRequestTypeColor(request.type)}`}>
                          {request.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {request.region}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimeAgo(request.requestDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDaysUntilDue(request.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.assignedTo || 'Unassigned'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
