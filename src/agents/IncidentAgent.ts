import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import { BaseAgent } from './BaseAgent';

/**
 * IncidentAgent manages security incidents and compliance violations
 * Handles incident detection, classification, response coordination, and reporting
 */
export class IncidentAgent extends BaseAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private incidents: Map<string, SecurityIncident> = new Map();
  private responseTeams: Map<string, ResponseTeam> = new Map();

  constructor() {
    super('IncidentAgent', '1.0.0');
  }

  /**
   * Create and log a new security incident
   * @param incidentData - Initial incident information
   */
  async createIncident(incidentData: IncidentData): Promise<SecurityIncident> {
    try {
      const incident: SecurityIncident = {
        id: `incident_${Date.now()}`,
        title: incidentData.title,
        description: incidentData.description,
        severity: incidentData.severity,
        category: incidentData.category,
        status: 'open',
        reportedBy: incidentData.reportedBy,
        assignedTo: incidentData.assignedTo,
        createdDate: new Date(),
        lastUpdated: new Date(),
        tags: incidentData.tags || [],
        timeline: [{
          timestamp: new Date(),
          action: 'incident_created',
          actor: incidentData.reportedBy,
          description: 'Incident reported and logged'
        }],
        affectedSystems: incidentData.affectedSystems || [],
        complianceFrameworks: incidentData.complianceFrameworks || []
      };

      this.incidents.set(incident.id, incident);
      this.log(`Created incident: ${incident.title} (${incident.id}) - Severity: ${incident.severity}`, 'info');

      // Auto-assign response team based on severity
      await this.assignResponseTeam(incident.id, incident.severity);

      return incident;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to create incident: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Update incident status
   * @param incidentId - Incident identifier
   * @param status - New status
   * @param updateBy - User making the update
   * @param notes - Update notes
   */
  async updateIncidentStatus(
    incidentId: string, 
    status: IncidentStatus, 
    updateBy: string,
    notes?: string
  ): Promise<void> {
    try {
      const incident = this.incidents.get(incidentId);
      if (!incident) {
        throw new Error(`Incident ${incidentId} not found`);
      }

      const previousStatus = incident.status;
      incident.status = status;
      incident.lastUpdated = new Date();

      incident.timeline.push({
        timestamp: new Date(),
        action: 'status_updated',
        actor: updateBy,
        description: `Status changed from ${previousStatus} to ${status}${notes ? `: ${notes}` : ''}`
      });

      this.log(`Updated incident ${incident.id} status: ${previousStatus} → ${status}`, 'info');

      // Handle status-specific actions
      if (status === 'resolved') {
  try {
        await this.finalizeIncident(incidentId, updateBy);
        } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to update incident status: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Assign response team to incident
   * @param incidentId - Incident identifier
   * @param severity - Incident severity for team selection
   */
  async assignResponseTeam(incidentId: string, severity: IncidentSeverity): Promise<void> {
    try {
      const incident = this.incidents.get(incidentId);
      if (!incident) {
        throw new Error(`Incident ${incidentId} not found`);
      }

      // Select appropriate response team based on severity
      const teamId = this.selectResponseTeam(severity);
      const team = this.responseTeams.get(teamId);

      if (team) {
        incident.assignedTeam = teamId;
        incident.timeline.push({
          timestamp: new Date(),
          action: 'team_assigned',
          actor: 'system',
          description: `Assigned to response team: ${team.name}`
        });

        this.log(`Assigned incident ${incidentId} to team: ${team.name}`, 'info');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to assign response team: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Generate incident response metrics
   */
  async generateIncidentMetrics(): Promise<IncidentMetrics> {
    try {
      const allIncidents = Array.from(this.incidents.values());
      const totalIncidents = allIncidents.length;

      const openIncidents = allIncidents.filter(i => i.status === 'open').length;
      const inProgressIncidents = allIncidents.filter(i => i.status === 'investigating').length;
      const resolvedIncidents = allIncidents.filter(i => i.status === 'resolved').length;

      const criticalIncidents = allIncidents.filter(i => i.severity === 'critical').length;
      const highIncidents = allIncidents.filter(i => i.severity === 'high').length;
      const mediumIncidents = allIncidents.filter(i => i.severity === 'medium').length;
      const lowIncidents = allIncidents.filter(i => i.severity === 'low').length;

      // Calculate average resolution time for resolved incidents
      const resolvedWithTime = allIncidents.filter(i => 
        i.status === 'resolved' && i.resolvedDate);
      
      const avgResolutionTime = resolvedWithTime.length > 0 ?
        resolvedWithTime.reduce((sum, incident) => {
          const resolutionTime = incident.resolvedDate!.getTime() - incident.createdDate.getTime();
          return sum + resolutionTime;
        }, 0) / resolvedWithTime.length : 0;

      const metrics: IncidentMetrics = {
        totalIncidents,
        openIncidents,
        inProgressIncidents,
        resolvedIncidents,
        severityBreakdown: {
          critical: criticalIncidents,
          high: highIncidents,
          medium: mediumIncidents,
          low: lowIncidents
        },
        averageResolutionTimeMs: avgResolutionTime,
        averageResolutionTimeHours: Math.round(avgResolutionTime / (1000 * 60 * 60) * 10) / 10,
        generatedDate: new Date()
      };

      this.log(`Generated incident metrics: ${totalIncidents} total, ${openIncidents} open`, 'info');
      return metrics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to generate incident metrics: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get incidents by compliance framework
   * @param framework - Compliance framework identifier
   */
  getIncidentsByFramework(framework: string): SecurityIncident[] {
    return Array.from(this.incidents.values())
      .filter(incident => incident.complianceFrameworks.includes(framework));
  }

  /**
   * Get agent status
   */
  getStatus(): {
    incidentCount: number;
    openIncidents: number;
    responseTeams: number;
    lastActivity: Date;
  } {
    const openIncidents = Array.from(this.incidents.values())
      .filter(i => i.status === 'open').length;

    return {
      incidentCount: this.incidents.size,
      openIncidents,
      responseTeams: this.responseTeams.size,
      lastActivity: new Date()
    };
  }

  private selectResponseTeam(severity: IncidentSeverity): string {
    // Default team selection logic
    switch (severity) {
      case 'critical':
        return 'security-team-tier1';
      case 'high':
        return 'security-team-tier2';
      case 'medium':
        return 'security-team-tier3';
      case 'low':
        return 'support-team';
      default:
        return 'support-team';
    }
  }

  private async finalizeIncident(incidentId: string, resolvedBy: string): Promise<void> {
    const incident = this.incidents.get(incidentId);
    if (incident) {
      incident.resolvedDate = new Date();
      incident.resolvedBy = resolvedBy;
      
      incident.timeline.push({
        timestamp: new Date(),
        action: 'incident_resolved',
        actor: resolvedBy,
        description: 'Incident marked as resolved'
      });

      this.log(`Finalized incident resolution: ${incident.id}`, 'info');
    }
  }
}

// Supporting interfaces
type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed' | 'escalated';
type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
type IncidentCategory = 'security_breach' | 'data_leak' | 'compliance_violation' | 'system_outage' | 'other';

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: IncidentCategory;
  status: IncidentStatus;
  reportedBy: string;
  assignedTo?: string;
  assignedTeam?: string;
  resolvedBy?: string;
  createdDate: Date;
  lastUpdated: Date;
  resolvedDate?: Date;
  tags: string[];
  timeline: IncidentTimelineEntry[];
  affectedSystems: string[];
  complianceFrameworks: string[];
}

export interface IncidentData {
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: IncidentCategory;
  reportedBy: string;
  assignedTo?: string;
  tags?: string[];
  affectedSystems?: string[];
  complianceFrameworks?: string[];
}

export interface IncidentTimelineEntry {
  timestamp: Date;
  action: string;
  actor: string;
  description: string;
}

export interface ResponseTeam {
  id: string;
  name: string;
  members: string[];
  capabilities: string[];
  escalationLevel: number;
}

export interface IncidentMetrics {
  totalIncidents: number;
  openIncidents: number;
  inProgressIncidents: number;
  resolvedIncidents: number;
  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  averageResolutionTimeMs: number;
  averageResolutionTimeHours: number;
  generatedDate: Date;
}

export default IncidentAgent;
