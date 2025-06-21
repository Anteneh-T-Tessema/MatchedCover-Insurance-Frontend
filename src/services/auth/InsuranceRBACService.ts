/**
 * Insurance-Specific RBAC Service
 * Competitive features inspired by industry leaders and insurance best practices
 */

import { AdvancedRBACService } from './AdvancedRBACService';
import {
  Role,
  EvaluationContext,
  PermissionCheckResult,
  ResourceType,
  Action,
  MonetaryAuthority,
  TerritoryAccess,
  ProductLineAccess,
  ClaimsAuthority,
  RiskBasedPermission,
  InsuranceRoleTemplate,
  InsuranceRBACAnalytics
} from '../../types/rbac';

/**
 * Insurance-specific evaluation context
 */
export interface InsuranceEvaluationContext extends EvaluationContext {
  policy_context?: {
    policy_number?: string;
    policy_type: string;
    policy_value: number;
    policy_state: string;
    policy_status: 'active' | 'pending' | 'cancelled' | 'expired';
  };
  claim_context?: {
    claim_number?: string;
    claim_type: string;
    claim_amount: number;
    claim_complexity: 'simple' | 'standard' | 'complex' | 'catastrophic';
    claim_status: 'new' | 'investigating' | 'pending' | 'settled' | 'closed';
  };
  agent_context?: {
    license_numbers: string[];
    appointed_carriers: string[];
    territory_codes: string[];
    commission_eligibility: boolean;
    supervision_status: 'independent' | 'supervised' | 'restricted';
  };
  regulatory_context?: {
    compliance_status: 'compliant' | 'warning' | 'violation';
    audit_in_progress: boolean;
    regulatory_framework: string[];
    data_classification: 'public' | 'internal' | 'confidential' | 'restricted';
  };
}

export class InsuranceRBACService extends AdvancedRBACService {
  private monetaryAuthorities: Map<string, MonetaryAuthority> = new Map();
  private territoryAccess: Map<string, TerritoryAccess[]> = new Map();
  private productAccess: Map<string, ProductLineAccess[]> = new Map();
  private claimsAuthorities: Map<string, ClaimsAuthority> = new Map();
  private riskBasedPermissions: Map<string, RiskBasedPermission> = new Map();
  private insuranceRoleTemplates: Map<string, InsuranceRoleTemplate> = new Map();

  constructor() {
    super();
    this.loadInsuranceRoleTemplates();
  }

  /**
   * Load pre-configured insurance role templates
   */
  private loadInsuranceRoleTemplates(): void {
    // Agent role template
    this.insuranceRoleTemplates.set('licensed_agent', {
      id: 'licensed_agent',
      name: 'Licensed Insurance Agent',
      description: 'Standard licensed agent with sales and service capabilities',
      category: 'producer',
      experience_level: 'intermediate',
      base_permissions: [
        'quotes.create', 'quotes.read', 'quotes.update',
        'policies.read', 'policies.issue', 'policies.renew',
        'customers.create', 'customers.read', 'customers.update',
        'customer_pii.access'
      ],
      territorial_scope: [],
      product_scope: [],
      regulatory_requirements: {
        licenses_required: ['property_casualty'],
        certifications_required: [],
        background_check_required: true,
        continuing_education_hours: 24
      },
      supervision_requirements: {
        requires_supervisor: false,
        supervisor_approval_for: ['policy_modifications_over_limit'],
        escalation_threshold: 10000,
        review_frequency: 'monthly'
      }
    });

    // Underwriter role template
    this.insuranceRoleTemplates.set('senior_underwriter', {
      id: 'senior_underwriter',
      name: 'Senior Underwriter',
      description: 'Senior underwriter with enhanced authority and decision-making power',
      category: 'underwriter',
      experience_level: 'senior',
      base_permissions: [
        'underwriting.create', 'underwriting.read', 'underwriting.update',
        'risk_assessment.create', 'risk_assessment.read', 'risk_assessment.execute',
        'premium_calculations.create', 'premium_calculations.read', 'premium_calculations.update',
        'policies.create', 'policies.read', 'policies.update', 'policies.approve',
        'quotes.read', 'quotes.approve', 'quotes.reject'
      ],
      territorial_scope: [],
      product_scope: [],
      regulatory_requirements: {
        licenses_required: ['property_casualty', 'commercial_lines'],
        certifications_required: ['ains', 'cpcu'],
        background_check_required: true,
        continuing_education_hours: 40
      },
      supervision_requirements: {
        requires_supervisor: false,
        supervisor_approval_for: [],
        escalation_threshold: 1000000,
        review_frequency: 'weekly'
      }
    });

    // Claims adjuster role template
    this.insuranceRoleTemplates.set('claims_adjuster', {
      id: 'claims_adjuster',
      name: 'Claims Adjuster',
      description: 'Claims adjuster with investigation and settlement authority',
      category: 'claims',
      experience_level: 'intermediate',
      base_permissions: [
        'claims.create', 'claims.read', 'claims.update',
        'claim_settlements.create', 'claim_settlements.read', 'claim_settlements.update',
        'fraud_detection.read', 'fraud_detection.investigate_fraud',
        'customer_pii.access'
      ],
      territorial_scope: [],
      product_scope: [],
      regulatory_requirements: {
        licenses_required: ['claims_adjuster'],
        certifications_required: [],
        background_check_required: true,
        continuing_education_hours: 20
      },
      supervision_requirements: {
        requires_supervisor: true,
        supervisor_approval_for: ['settlements_over_authority', 'fraud_flags'],
        escalation_threshold: 25000,
        review_frequency: 'weekly'
      }
    });
  }

  /**
   * Enhanced permission check with insurance-specific logic
   */
  async hasInsurancePermission(
    userId: string,
    resource: ResourceType,
    action: Action,
    context: Partial<InsuranceEvaluationContext> = {}
  ): Promise<PermissionCheckResult & {
    insurance_context?: {
      monetary_authority_check?: boolean;
      territory_authority_check?: boolean;
      license_verification?: boolean;
      regulatory_compliance_check?: boolean;
      supervision_requirement_met?: boolean;
    };
  }> {
    // First run standard permission check
    const baseResult = await super.hasPermission(userId, resource, action, context);

    if (!baseResult.granted) {
      return baseResult;
    }

    // Apply insurance-specific validations
    const insuranceValidations = await this.runInsuranceValidations(
      userId, 
      resource, 
      action, 
      context
    );

    return {
      ...baseResult,
      granted: baseResult.granted && insuranceValidations.all_passed,
      reason: insuranceValidations.all_passed ? baseResult.reason : insuranceValidations.failure_reason,
      insurance_context: insuranceValidations.details
    };
  }

  /**
   * Run insurance-specific validation checks
   */
  private async runInsuranceValidations(
    userId: string,
    resource: ResourceType,
    action: Action,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{
    all_passed: boolean;
    failure_reason?: string;
    details: {
      monetary_authority_check?: boolean;
      territory_authority_check?: boolean;
      license_verification?: boolean;
      regulatory_compliance_check?: boolean;
      supervision_requirement_met?: boolean;
    };
  }> {
    const details: {
      monetary_authority_check?: boolean;
      territory_authority_check?: boolean;
      license_verification?: boolean;
      regulatory_compliance_check?: boolean;
      supervision_requirement_met?: boolean;
    } = {};
    let allPassed = true;
    let failureReason = '';

    // Check monetary authority limits
    if (this.requiresMonetaryCheck(action, context)) {
      const monetaryCheck = await this.checkMonetaryAuthority(userId, context);
      details.monetary_authority_check = monetaryCheck.passed;
      if (!monetaryCheck.passed) {
        allPassed = false;
        failureReason = monetaryCheck.reason || 'Monetary authority check failed';
      }
    }

    // Check territory authority
    if (this.requiresTerritoryCheck(resource, context)) {
      const territoryCheck = await this.checkTerritoryAuthority(userId, context);
      details.territory_authority_check = territoryCheck.passed;
      if (!territoryCheck.passed) {
        allPassed = false;
        failureReason = territoryCheck.reason || 'Territory authority check failed';
      }
    }

    // Check license verification
    if (this.requiresLicenseCheck(action)) {
      const licenseCheck = await this.checkLicenseStatus(userId, context);
      details.license_verification = licenseCheck.passed;
      if (!licenseCheck.passed) {
        allPassed = false;
        failureReason = licenseCheck.reason || 'License verification failed';
      }
    }

    // Check regulatory compliance
    const complianceCheck = await this.checkRegulatoryCompliance(userId, resource, action, context);
    details.regulatory_compliance_check = complianceCheck.passed;
    if (!complianceCheck.passed) {
      allPassed = false;
      failureReason = complianceCheck.reason || 'Regulatory compliance check failed';
    }

    // Check supervision requirements
    if (this.requiresSupervision(userId, action, context)) {
      const supervisionCheck = await this.checkSupervisionRequirement(userId, context);
      details.supervision_requirement_met = supervisionCheck.passed;
      if (!supervisionCheck.passed) {
        allPassed = false;
        failureReason = supervisionCheck.reason || 'Supervision requirement check failed';
      }
    }

    return {
      all_passed: allPassed,
      failure_reason: failureReason,
      details
    };
  }

  /**
   * Check if action requires monetary authority validation
   */
  private requiresMonetaryCheck(action: Action, context: Partial<InsuranceEvaluationContext>): boolean {
    const monetaryActions = [
      'settle_claim', 'transfer_funds', 'approve', 'issue_policy',
      'calculate_premium', 'reserve_funds', 'bind_coverage'
    ];

    return monetaryActions.includes(action) && (
      context.claim_context?.claim_amount ||
      context.policy_context?.policy_value
    ) !== undefined;
  }

  /**
   * Check monetary authority limits
   */
  private async checkMonetaryAuthority(
    userId: string,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{ passed: boolean; reason?: string }> {
    const userAuthority = this.monetaryAuthorities.get(userId);
    if (!userAuthority) {
      return { passed: false, reason: 'No monetary authority configured' };
    }

    const amount = context.claim_context?.claim_amount || context.policy_context?.policy_value || 0;

    if (amount > userAuthority.transaction_limit) {
      return { 
        passed: false, 
        reason: `Amount ${amount} exceeds transaction limit ${userAuthority.transaction_limit}` 
      };
    }

    if (amount > userAuthority.requires_dual_approval_above) {
      // Check if dual approval is in place
      // This would integrate with approval workflow system
      return { 
        passed: false, 
        reason: 'Dual approval required for this amount' 
      };
    }

    return { passed: true };
  }

  /**
   * Check territory authorization
   */
  private async checkTerritoryAuthority(
    userId: string,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{ passed: boolean; reason?: string }> {
    const userTerritories = this.territoryAccess.get(userId) || [];
    
    const requiredState = context.policy_context?.policy_state || 
                         context.agent_context?.territory_codes?.[0];

    if (!requiredState) {
      return { passed: true }; // No territory restriction needed
    }

    const hasAccess = userTerritories.some(territory => 
      territory.states.includes(requiredState)
    );

    return {
      passed: hasAccess,
      reason: hasAccess ? undefined : `No authority in state ${requiredState}`
    };
  }

  /**
   * Check license status and validity
   */
  private async checkLicenseStatus(
    userId: string,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{ passed: boolean; reason?: string }> {
    const userLicenses = context.agent_context?.license_numbers || [];
    
    // In a real implementation, this would check against a license verification service
    // For now, we'll assume valid if licenses are present
    const hasValidLicense = userLicenses.length > 0;

    return {
      passed: hasValidLicense,
      reason: hasValidLicense ? undefined : 'Valid insurance license required'
    };
  }

  /**
   * Check regulatory compliance requirements
   */
  private async checkRegulatoryCompliance(
    userId: string,
    resource: ResourceType,
    action: Action,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{ passed: boolean; reason?: string }> {
    // Check for compliance violations or audit issues
    if (context.regulatory_context?.compliance_status === 'violation') {
      return { passed: false, reason: 'User has active compliance violations' };
    }

    if (context.regulatory_context?.audit_in_progress && this.isHighRiskAction(action)) {
      return { passed: false, reason: 'High-risk actions restricted during audit' };
    }

    return { passed: true };
  }

  /**
   * Check supervision requirements
   */
  private async checkSupervisionRequirement(
    userId: string,
    context: Partial<InsuranceEvaluationContext>
  ): Promise<{ passed: boolean; reason?: string }> {
    if (context.agent_context?.supervision_status === 'restricted') {
      return { passed: false, reason: 'User is under supervision restrictions' };
    }

    return { passed: true };
  }

  /**
   * Determine if action requires territory check
   */
  private requiresTerritoryCheck(resource: ResourceType, context: Partial<InsuranceEvaluationContext>): boolean {
    const territoryResources = ['policies', 'quotes', 'claims', 'underwriting'];
    return territoryResources.includes(resource) && 
           Boolean(context.policy_context?.policy_state || context.agent_context?.territory_codes);
  }

  /**
   * Determine if action requires license check
   */
  private requiresLicenseCheck(action: Action): boolean {
    const licensedActions = [
      'issue_policy', 'bind_coverage', 'underwrite', 'settle_claim',
      'calculate_premium', 'quote_rate', 'investigate_fraud'
    ];
    return licensedActions.includes(action);
  }

  /**
   * Determine if user requires supervision for action
   */
  private requiresSupervision(
    userId: string, 
    action: Action, 
    context: Partial<InsuranceEvaluationContext>
  ): boolean {
    return context.agent_context?.supervision_status === 'supervised';
  }

  /**
   * Determine if action is considered high-risk
   */
  private isHighRiskAction(action: Action): boolean {
    const highRiskActions = [
      'settle_claim', 'transfer_funds', 'override_system',
      'manage_permissions', 'file_regulatory', 'access_pii'
    ];
    return highRiskActions.includes(action);
  }

  /**
   * Get insurance-specific analytics
   */
  async getInsuranceAnalytics(userId: string): Promise<InsuranceRBACAnalytics> {
    const baseAnalytics = await super.getRoleAnalytics('');
    
    if (!baseAnalytics || !baseAnalytics.role_id) {
      throw new Error('Base analytics role_id is required');
    }
    
    // Add insurance-specific metrics
    const insuranceMetrics = {
      premium_volume_accessed: await this.calculatePremiumVolume(userId),
      claims_handled_count: await this.getClaimsHandledCount(userId),
      policies_issued_count: await this.getPoliciesIssuedCount(userId),
      regulatory_violations: await this.getRegulatoryViolations(userId),
      commission_earned: await this.getCommissionEarned(userId),
      territory_performance: await this.getTerritoryPerformance(userId),
      product_performance: await this.getProductPerformance(userId),
      customer_satisfaction_score: await this.getCustomerSatisfactionScore(userId),
      fraud_detection_accuracy: await this.getFraudDetectionAccuracy(userId)
    };

    const competitiveBenchmarks = {
      industry_average_processing_time: 48, // hours
      our_average_processing_time: await this.getAverageProcessingTime(userId),
      industry_error_rate: 0.05,
      our_error_rate: await this.getErrorRate(userId),
      customer_acquisition_cost: 150,
      customer_lifetime_value: await this.getCustomerLifetimeValue(userId)
    };

    return {
      ...baseAnalytics,
      role_id: baseAnalytics.role_id || 'unknown',
      insurance_specific_metrics: insuranceMetrics,
      competitive_benchmarks: competitiveBenchmarks
    };
  }

  /**
   * Create role from insurance template
   */
  async createRoleFromTemplate(
    templateId: string,
    customizations: Partial<InsuranceRoleTemplate> = {}
  ): Promise<Role> {
    const template = this.insuranceRoleTemplates.get(templateId);
    if (!template) {
      throw new Error(`Insurance role template ${templateId} not found`);
    }

    const mergedTemplate = { ...template, ...customizations };

    const role: Role = {
      id: `role_${Date.now()}`,
      name: mergedTemplate.name,
      description: mergedTemplate.description,
      permissions: mergedTemplate.base_permissions,
      is_system_role: false,
      metadata: {
        category: mergedTemplate.category as 'customer' | 'agent' | 'admin' | 'compliance' | 'executive' 
                  | 'underwriter' | 'claims_adjuster' | 'actuary' | 'fraud_investigator'
                  | 'regulatory_specialist' | 'customer_service' | 'sales_agent'
                  | 'reinsurance_manager' | 'risk_manager' | 'product_manager',
        level: this.getCategoryLevel(mergedTemplate.category),
        auto_assignable: false,
        requires_approval: true,
        insurance_licenses: mergedTemplate.regulatory_requirements.licenses_required,
        supervision_required: mergedTemplate.supervision_requirements.requires_supervisor,
        continuing_education_required: mergedTemplate.regulatory_requirements.continuing_education_hours > 0,
        bond_required: (mergedTemplate.regulatory_requirements.bond_amount || 0) > 0
      },
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'system'
    };

    return role;
  }

  /**
   * Get category hierarchy level
   */
  private getCategoryLevel(category: string): number {
    const levels: Record<string, number> = {
      'producer': 3,
      'underwriter': 2,
      'claims': 2,
      'compliance': 1,
      'executive': 0
    };
    return levels[category] || 4;
  }

  // Placeholder methods for analytics (would integrate with actual data sources)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async calculatePremiumVolume(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getClaimsHandledCount(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getPoliciesIssuedCount(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getRegulatoryViolations(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getCommissionEarned(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getTerritoryPerformance(_userId: string): Promise<Record<string, number>> { return {}; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getProductPerformance(_userId: string): Promise<Record<string, number>> { return {}; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getCustomerSatisfactionScore(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getFraudDetectionAccuracy(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getAverageProcessingTime(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getErrorRate(_userId: string): Promise<number> { return 0; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getCustomerLifetimeValue(_userId: string): Promise<number> { return 0; }
}
