import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import type { SecurityControlStatus, Evidence, ValidationResult, ComplianceValidationResult, ErrorContext } from '../types/platform-types';
import { BaseAgent } from './BaseAgent';

/**
 * MonitoringAgent provides real-time monitoring and alerting capabilities
 * Handles continuous monitoring, threshold management, and automated alerting
 */
export class MonitoringAgent extends BaseAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private monitors: Map<string, Monitor> = new Map();
  private alerts: Map<string, Alert> = new Map();
  private thresholds: Map<string, Threshold> = new Map();

  constructor() {
    super('MonitoringAgent', '1.0.0');
    this.initializeDefaultThresholds();
  }

  /**
   * Create a new monitoring configuration
   * @param monitorData - Monitor configuration data
   */
  async createMonitor(monitorData: MonitorData): Promise<Monitor> {
    try {
      const monitor: Monitor = {
        id: `monitor_${Date.now()}`,
        name: monitorData.name,
        description: monitorData.description,
        type: monitorData.type,
        target: monitorData.target,
        interval: monitorData.interval,
        thresholds: monitorData.thresholds,
        status: 'inactive',
        createdDate: new Date(),
        lastCheck: null,
        lastValue: null,
        alertOnFailure: monitorData.alertOnFailure || true,
        notificationChannels: monitorData.notificationChannels || []
      };

      this.monitors.set(monitor.id, monitor);
      this.log(`Created monitor: ${monitor.name}`, 'info');

      return monitor;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to create monitor: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Start monitoring for a specific monitor
   * @param monitorId - Monitor identifier
   */
  async startMonitoring(monitorId: string): Promise<void> {
    try {
      const monitor = this.monitors.get(monitorId);
      if (!monitor) {
        throw new Error(`Monitor ${monitorId} not found`);
      }

      monitor.status = 'active';
      monitor.lastCheck = new Date();

      this.log(`Started monitoring: ${monitor.name}`, 'info');

      // Simulate monitoring by scheduling periodic checks
      this.scheduleMonitorCheck(monitor);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to start monitoring: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Stop monitoring for a specific monitor
   * @param monitorId - Monitor identifier
   */
  async stopMonitoring(monitorId: string): Promise<void> {
    try {
      const monitor = this.monitors.get(monitorId);
      if (!monitor) {
        throw new Error(`Monitor ${monitorId} not found`);
      }

      monitor.status = 'inactive';
      this.log(`Stopped monitoring: ${monitor.name}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to stop monitoring: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Check monitor status and trigger alerts if needed
   * @param monitorId - Monitor identifier
   */
  async checkMonitor(monitorId: string): Promise<MonitorCheckResult> {
    try {
      const monitor = this.monitors.get(monitorId);
      if (!monitor) {
        throw new Error(`Monitor ${monitorId} not found`);
      }

      // Simulate monitoring check based on monitor type
      const checkResult = await this.performMonitorCheck(monitor);
      
      monitor.lastCheck = new Date();
      monitor.lastValue = checkResult.value;

      // Evaluate thresholds and create alerts if necessary
      await this.evaluateThresholds(monitor, checkResult);

      this.log(`Monitor check completed: ${monitor.name} = ${checkResult.value}`, 'debug');
      return checkResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to check monitor: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Create an alert
   * @param alertData - Alert information
   */
  async createAlert(alertData: AlertData): Promise<Alert> {
    try {
      const alert: Alert = {
        id: `alert_${Date.now()}`,
        title: alertData.title,
        description: alertData.description,
        severity: alertData.severity,
        source: alertData.source,
        status: 'open',
        createdDate: new Date(),
        tags: alertData.tags || [],
        monitorId: alertData.monitorId,
        value: alertData.value,
        threshold: alertData.threshold
      };

      this.alerts.set(alert.id, alert);
      this.log(`Created alert: ${alert.title} (${alert.severity})`, 'warn');

      // Send notifications based on severity
      await this.sendNotifications(alert);

      return alert;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to create alert: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Acknowledge an alert
   * @param alertId - Alert identifier
   * @param acknowledgedBy - User acknowledging the alert
   */
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<void> {
    try {
      const alert = this.alerts.get(alertId);
      if (!alert) {
        throw new Error(`Alert ${alertId} not found`);
      }

      alert.status = 'acknowledged';
      alert.acknowledgedBy = acknowledgedBy;
      alert.acknowledgedDate = new Date();

      this.log(`Alert acknowledged: ${alert.title} by ${acknowledgedBy}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to acknowledge alert: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Generate monitoring dashboard data
   */
  async generateDashboard(): Promise<MonitoringDashboard> {
    try {
      const allMonitors = Array.from(this.monitors.values());
      const allAlerts = Array.from(this.alerts.values());

      const activeMonitors = allMonitors.filter(m => m.status === 'active').length;
      const totalMonitors = allMonitors.length;

      const openAlerts = allAlerts.filter(a => a.status === 'open').length;
      const acknowledgedAlerts = allAlerts.filter(a => a.status === 'acknowledged').length;
      const resolvedAlerts = allAlerts.filter(a => a.status === 'resolved').length;

      const criticalAlerts = allAlerts.filter(a => a.severity === 'critical' && a.status === 'open').length;
      const highAlerts = allAlerts.filter(a => a.severity === 'high' && a.status === 'open').length;

      const systemHealth = this.calculateSystemHealth(allMonitors);

      const dashboard: MonitoringDashboard = {
        systemHealth,
        monitoringStatus: {
          activeMonitors,
          totalMonitors,
          monitoringCoverage: totalMonitors > 0 ? Math.round((activeMonitors / totalMonitors) * 100) : 0
        },
        alertSummary: {
          openAlerts,
          acknowledgedAlerts,
          resolvedAlerts,
          criticalAlerts,
          highAlerts
        },
        recentAlerts: allAlerts
          .filter(a => a.status === 'open')
          .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
          .slice(0, 10),
        generatedDate: new Date()
      };

      this.log(`Generated monitoring dashboard: ${systemHealth}% system health`, 'info');
      return dashboard;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to generate dashboard: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get agent status
   */
  getStatus(): {
    monitorCount: number;
    activeMonitors: number;
    alertCount: number;
    openAlerts: number;
    lastActivity: Date;
  } {
    const activeMonitors = Array.from(this.monitors.values())
      .filter(m => m.status === 'active').length;
    
    const openAlerts = Array.from(this.alerts.values())
      .filter(a => a.status === 'open').length;

    return {
      monitorCount: this.monitors.size,
      activeMonitors,
      alertCount: this.alerts.size,
      openAlerts,
      lastActivity: new Date()
    };
  }

  private async performMonitorCheck(monitor: Monitor): Promise<MonitorCheckResult> {
    // Simulate different types of monitoring checks
    let value: number;
    let status: 'healthy' | 'warning' | 'critical';

    switch (monitor.type) {
      case 'availability':
        value = Math.random() > 0.05 ? 100 : 0; // 95% availability simulation
        status = value === 100 ? 'healthy' : 'critical';
        break;
      case 'performance':
        value = Math.random() * 2000; // Response time simulation (0-2000ms)
        status = value < 500 ? 'healthy' : value < 1000 ? 'warning' : 'critical';
        break;
      case 'compliance':
        value = Math.floor(Math.random() * 100); // Compliance percentage
        status = value >= 90 ? 'healthy' : value >= 70 ? 'warning' : 'critical';
        break;
      default:
        value = Math.random() * 100;
        status = 'healthy';
    }

    return {
      value,
      status,
      timestamp: new Date(),
      message: `${monitor.type} check: ${value}`
    };
  }

  private async evaluateThresholds(monitor: Monitor, checkResult: MonitorCheckResult): Promise<void> {
    for (const threshold of monitor.thresholds) {
      let breached = false;

      switch (threshold.operator) {
        case 'greater_than':
          breached = checkResult.value > threshold.value;
          break;
        case 'less_than':
          breached = checkResult.value < threshold.value;
          break;
        case 'equals':
          breached = checkResult.value === threshold.value;
          break;
      }

      if (breached && monitor.alertOnFailure) {
  try {
        await this.createAlert({
          title: `Threshold Breach: ${monitor.name  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}`,
          description: `Monitor ${monitor.name} breached threshold: ${checkResult.value} ${threshold.operator} ${threshold.value}`,
          severity: threshold.severity,
          source: monitor.id,
          monitorId: monitor.id,
          value: checkResult.value,
          threshold: threshold.value
        });
      }
    }
  }

  private async sendNotifications(alert: Alert): Promise<void> {
    // Simulate notification sending
    const monitor = this.monitors.get(alert.monitorId || '');
    const channels = monitor?.notificationChannels || ['email'];
    
    this.log(`Sending notifications for alert ${alert.id} via ${channels.join(', ')}`, 'debug');
  }

  private calculateSystemHealth(monitors: Monitor[]): number {
    if (monitors.length === 0) return 100;

    const healthyMonitors = monitors.filter(m => {
      if (!m.lastValue || m.status !== 'active') return true;
      return m.lastValue > 80; // Assume healthy if above 80%
    }).length;

    return Math.round((healthyMonitors / monitors.length) * 100);
  }

  private scheduleMonitorCheck(monitor: Monitor): void {
    // In a real implementation, this would set up recurring checks
    this.log(`Scheduled monitoring for ${monitor.name} every ${monitor.interval}ms`, 'debug');
  }

  private initializeDefaultThresholds(): void {
    const defaultThresholds: Threshold[] = [
      {
        id: 'availability_critical',
        name: 'Availability Critical',
        operator: 'less_than',
        value: 95,
        severity: 'critical'
      },
      {
        id: 'performance_warning',
        name: 'Performance Warning',
        operator: 'greater_than',
        value: 1000,
        severity: 'high'
      }
    ];

    defaultThresholds.forEach(threshold => {
      this.thresholds.set(threshold.id, threshold);
    });
  }
}

// Supporting interfaces
type MonitorType = 'availability' | 'performance' | 'security' | 'compliance' | 'custom';
type MonitorStatus = 'active' | 'inactive' | 'error';
type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
type AlertStatus = 'open' | 'acknowledged' | 'resolved' | 'closed';
type ThresholdOperator = 'greater_than' | 'less_than' | 'equals';

export interface Monitor {
  id: string;
  name: string;
  description: string;
  type: MonitorType;
  target: string;
  interval: number; // milliseconds
  thresholds: Threshold[];
  status: MonitorStatus;
  createdDate: Date;
  lastCheck: Date | null;
  lastValue: number | null;
  alertOnFailure: boolean;
  notificationChannels: string[];
}

export interface MonitorData {
  name: string;
  description: string;
  type: MonitorType;
  target: string;
  interval: number;
  thresholds: Threshold[];
  alertOnFailure?: boolean;
  notificationChannels?: string[];
}

export interface Threshold {
  id: string;
  name: string;
  operator: ThresholdOperator;
  value: number;
  severity: AlertSeverity;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  source: string;
  status: AlertStatus;
  createdDate: Date;
  acknowledgedBy?: string;
  acknowledgedDate?: Date;
  resolvedBy?: string;
  resolvedDate?: Date;
  tags: string[];
  monitorId?: string;
  value?: number;
  threshold?: number;
}

export interface AlertData {
  title: string;
  description: string;
  severity: AlertSeverity;
  source: string;
  tags?: string[];
  monitorId?: string;
  value?: number;
  threshold?: number;
}

export interface MonitorCheckResult {
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  timestamp: Date;
  message: string;
}

export interface MonitoringDashboard {
  systemHealth: number;
  monitoringStatus: {
    activeMonitors: number;
    totalMonitors: number;
    monitoringCoverage: number;
  };
  alertSummary: {
    openAlerts: number;
    acknowledgedAlerts: number;
    resolvedAlerts: number;
    criticalAlerts: number;
    highAlerts: number;
  };
  recentAlerts: Alert[];
  generatedDate: Date;
}

export default MonitoringAgent;
