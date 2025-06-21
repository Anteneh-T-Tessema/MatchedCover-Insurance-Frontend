import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import { BaseAgent } from './BaseAgent';

/**
 * PolicyAgent manages organizational policies for compliance
 * Handles policy creation, versioning, approval workflows, and enforcement
 */
export class PolicyAgent extends BaseAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private policies: Map<string, Policy> = new Map();
  private policyTemplates: Map<string, PolicyTemplate> = new Map();

  constructor() {
    super('PolicyAgent', '1.0.0');
  }

  /**
   * Create a new policy from template
   * @param templateId - Policy template identifier
   * @param policyData - Specific policy data
   */
  async createPolicy(templateId: string, policyData: PolicyData): Promise<Policy> {
    try {
      const template = this.policyTemplates.get(templateId);
      if (!template) {
        throw new Error(`Policy template ${templateId} not found`);
      }

      const policy: Policy = {
        id: `policy_${Date.now()}`,
        name: policyData.name,
        description: policyData.description,
        templateId,
        version: '1.0.0',
        status: 'draft',
        content: this.generatePolicyContent(template, policyData),
        approvals: [],
        createdDate: new Date(),
        lastModified: new Date(),
        effectiveDate: policyData.effectiveDate,
        reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        owner: policyData.owner,
        tags: policyData.tags || []
      };

      this.policies.set(policy.id, policy);
      this.log(`Created policy: ${policy.name} (${policy.id})`, 'info');

      return policy;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to create policy: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Submit policy for approval workflow
   * @param policyId - Policy identifier
   * @param approvers - List of required approvers
   */
  async submitForApproval(policyId: string, approvers: string[]): Promise<void> {
    try {
      const policy = this.policies.get(policyId);
      if (!policy) {
        throw new Error(`Policy ${policyId} not found`);
      }

      policy.status = 'pending-approval';
      policy.approvals = approvers.map(approver => ({
        approver,
        status: 'pending',
        requestedDate: new Date()
      }));

      this.log(`Submitted policy ${policy.name} for approval`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to submit policy for approval: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Approve or reject a policy
   * @param policyId - Policy identifier
   * @param approver - Approver identifier
   * @param decision - Approval decision
   * @param comments - Optional comments
   */
  async approvePolicy(
    policyId: string, 
    approver: string, 
    decision: 'approved' | 'rejected', 
    comments?: string
  ): Promise<void> {
    try {
      const policy = this.policies.get(policyId);
      if (!policy) {
        throw new Error(`Policy ${policyId} not found`);
      }

      const approval = policy.approvals.find(a => a.approver === approver);
      if (!approval) {
        throw new Error(`Approver ${approver} not found for policy ${policyId}`);
      }

      approval.status = decision;
      approval.approvedDate = new Date();
      approval.comments = comments;

      // Check if all approvals are complete
      const allApproved = policy.approvals.every(a => a.status === 'approved');
      const anyRejected = policy.approvals.some(a => a.status === 'rejected');

      if (anyRejected) {
        policy.status = 'rejected';
      } else if (allApproved) {
        policy.status = 'approved';
      }

      this.log(`Policy ${policy.name} ${decision} by ${approver}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to process approval: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Publish an approved policy
   * @param policyId - Policy identifier
   */
  async publishPolicy(policyId: string): Promise<void> {
    try {
      const policy = this.policies.get(policyId);
      if (!policy) {
        throw new Error(`Policy ${policyId} not found`);
      }

      if (policy.status !== 'approved') {
        throw new Error(`Policy ${policyId} must be approved before publishing`);
      }

      policy.status = 'published';
      policy.publishedDate = new Date();

      this.log(`Published policy: ${policy.name}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to publish policy: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Generate policy compliance report
   */
  async generateComplianceReport(): Promise<PolicyComplianceReport> {
    try {
      const totalPolicies = this.policies.size;
      const publishedPolicies = Array.from(this.policies.values())
        .filter(p => p.status === 'published').length;
      const pendingPolicies = Array.from(this.policies.values())
        .filter(p => p.status === 'pending-approval').length;
      const draftPolicies = Array.from(this.policies.values())
        .filter(p => p.status === 'draft').length;

      const complianceRate = totalPolicies > 0 ? 
        Math.round((publishedPolicies / totalPolicies) * 100) : 0;

      const report: PolicyComplianceReport = {
        totalPolicies,
        publishedPolicies,
        pendingPolicies,
        draftPolicies,
        complianceRate,
        generatedDate: new Date()
      };

      this.log(`Generated policy compliance report: ${complianceRate}% compliance`, 'info');
      return report;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to generate compliance report: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get policy status
   */
  getStatus(): {
    policyCount: number;
    templateCount: number;
    lastActivity: Date;
  } {
    return {
      policyCount: this.policies.size,
      templateCount: this.policyTemplates.size,
      lastActivity: new Date()
    };
  }

  private generatePolicyContent(template: PolicyTemplate, data: PolicyData): string {
    return `${template.content}\n\nSpecific Implementation:\n${data.description}`;
  }
}

// Supporting interfaces
export interface Policy {
  id: string;
  name: string;
  description: string;
  templateId: string;
  version: string;
  status: 'draft' | 'pending-approval' | 'approved' | 'rejected' | 'published';
  content: string;
  approvals: PolicyApproval[];
  createdDate: Date;
  lastModified: Date;
  effectiveDate: Date;
  reviewDate: Date;
  publishedDate?: Date;
  owner: string;
  tags: string[];
}

export interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}

export interface PolicyData {
  name: string;
  description: string;
  effectiveDate: Date;
  owner: string;
  tags?: string[];
}

export interface PolicyApproval {
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: Date;
  approvedDate?: Date;
  comments?: string;
}

export interface PolicyComplianceReport {
  totalPolicies: number;
  publishedPolicies: number;
  pendingPolicies: number;
  draftPolicies: number;
  complianceRate: number;
  generatedDate: Date;
}

export default PolicyAgent;
