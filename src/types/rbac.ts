/**
 * Role-Based Access Control (RBAC) Types
 * Advanced role and permission management for MatchedCover platform
 */

export type ResourceType = 
  | 'users' 
  | 'quotes' 
  | 'policies' 
  | 'claims' 
  | 'compliance' 
  | 'admin' 
  | 'analytics' 
  | 'billing'
  | 'reports'
  | 'carriers'
  | 'products'
  | 'agents'
  | 'customers'
  | 'audit_logs'
  | 'system_settings'
  // Insurance-specific resources
  | 'underwriting'
  | 'reinsurance'
  | 'fraud_detection'
  | 'regulatory_filings'
  | 'risk_assessment'
  | 'premium_calculations'
  | 'policy_documents'
  | 'claim_settlements'
  | 'actuarial_data'
  | 'territory_management'
  | 'commission_tracking'
  | 'customer_pii'
  | 'financial_transactions'
  | 'solvency_reports'
  | 'market_conduct';

export type Action = 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete' 
  | 'approve' 
  | 'reject'
  | 'export'
  | 'import'
  | 'configure'
  | 'execute'
  | 'view_sensitive'
  | 'manage_permissions'
  // Insurance-specific actions
  | 'underwrite'
  | 'settle_claim'
  | 'calculate_premium'
  | 'issue_policy'
  | 'cancel_policy'
  | 'renew_policy'
  | 'bind_coverage'
  | 'quote_rate'
  | 'investigate_fraud'
  | 'file_regulatory'
  | 'access_pii'
  | 'transfer_funds'
  | 'adjust_claim'
  | 'reserve_funds'
  | 'audit_transaction'
  | 'override_system'
  | 'escalate_claim';

export type Scope = 'own' | 'team' | 'company' | 'all';

/**
 * Individual permission definition
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: ResourceType;
  action: Action;
  scope: Scope;
  conditions?: PermissionCondition[];
  metadata?: {
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    compliance_related: boolean;
    audit_required: boolean;
    // Insurance-specific metadata
    monetary_limit?: number; // Max dollar amount for financial actions
    regulatory_approval_required?: boolean;
    pii_access_level?: 'none' | 'limited' | 'full';
    underwriting_authority_level?: 1 | 2 | 3 | 4 | 5; // 1=basic, 5=executive
    territory_restrictions?: string[]; // Geographic limitations
    product_line_restrictions?: string[]; // Allowed insurance products
    requires_dual_approval?: boolean; // Separation of duties
    fraud_detection_clearance?: boolean;
    claim_complexity_limit?: 'simple' | 'standard' | 'complex' | 'catastrophic';
    regulatory_framework?: 'naic' | 'doi' | 'sox' | 'gdpr' | 'ccpa' | 'hipaa';
    business_hours_only?: boolean;
    vpn_required?: boolean;
    mfa_required?: boolean;
  };
}

/**
 * Conditional permission logic
 */
export interface PermissionCondition {
  type: 'time' | 'location' | 'attribute' | 'context';
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'in' | 'not_in';
  field: string;
  value: unknown;
}

/**
 * Role definition with hierarchical support
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Permission IDs
  parent_role?: string; // Role inheritance
  is_system_role: boolean;
  metadata: {
    category: 'customer' | 'agent' | 'admin' | 'compliance' | 'executive' 
      | 'underwriter' | 'claims_adjuster' | 'actuary' | 'fraud_investigator'
      | 'regulatory_specialist' | 'customer_service' | 'sales_agent'
      | 'reinsurance_manager' | 'risk_manager' | 'product_manager';
    level: number; // Hierarchy level (0 = highest)
    department?: string;
    auto_assignable: boolean;
    requires_approval: boolean;
    // Insurance-specific role metadata
    insurance_licenses?: string[]; // Required licenses (e.g., P&C, Life, Health)
    state_authorizations?: string[]; // Authorized states/territories
    commission_eligible?: boolean;
    supervision_required?: boolean;
    continuing_education_required?: boolean;
    bond_required?: boolean;
    e_o_coverage_required?: boolean; // Errors & Omissions insurance
    appointment_carriers?: string[]; // Appointed with which carriers
    producer_code?: string;
    regulatory_registrations?: string[]; // NAIC, state DOI registrations
  };
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

/**
 * User role assignment with context
 */
export interface UserRoleAssignment {
  id: string;
  user_id: string;
  role_id: string;
  assigned_by: string;
  assigned_at: Date;
  expires_at?: Date;
  is_active: boolean;
  context?: {
    department?: string;
    location?: string;
    temporary_elevation?: boolean;
    reason?: string;
  };
  metadata: {
    auto_assigned: boolean;
    approval_required: boolean;
    approved_by?: string;
    approved_at?: Date;
  };
}

/**
 * Permission evaluation context
 */
export interface EvaluationContext {
  user_id: string;
  resource_id?: string;
  resource_owner_id?: string;
  request_time: Date;
  request_ip?: string;
  user_attributes: Record<string, unknown>;
  resource_attributes?: Record<string, unknown>;
  session_attributes?: Record<string, unknown>;
}

/**
 * Role hierarchy tree structure
 */
export interface RoleHierarchy {
  role_id: string;
  parent_id?: string;
  children: RoleHierarchy[];
  inherited_permissions: string[];
}

/**
 * Audit log for permission checks
 */
export interface PermissionAuditLog {
  id: string;
  user_id: string;
  resource: ResourceType;
  action: Action;
  result: 'granted' | 'denied';
  reason?: string;
  timestamp: Date;
  context: EvaluationContext;
  session_id?: string;
  risk_score?: number;
}

/**
 * Role template for quick role creation
 */
export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'customer' | 'agent' | 'admin' | 'compliance' | 'executive';
  base_permissions: string[];
  configurable_permissions: string[];
  metadata: {
    industry_standard: boolean;
    compliance_preset: string[];
    recommended_for: string[];
  };
}

/**
 * Dynamic permission rule
 */
export interface DynamicPermissionRule {
  id: string;
  name: string;
  condition: string; // JavaScript expression
  permission_modifications: {
    grant?: string[];
    revoke?: string[];
    modify_scope?: Scope;
  };
  priority: number;
  is_active: boolean;
}

/**
 * User profile with role information
 */
export interface UserWithRoles {
  user_id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  roles: UserRoleAssignment[];
  effective_permissions: Permission[];
  last_permission_refresh: Date;
  security_clearance?: 'basic' | 'elevated' | 'admin' | 'executive';
}

/**
 * Role analytics and insights
 */
export interface RoleAnalytics {
  role_id: string;
  usage_stats: {
    active_assignments: number;
    total_assignments: number;
    last_used: Date;
    most_used_permissions: string[];
  };
  risk_assessment: {
    risk_score: number;
    high_risk_permissions: string[];
    recommendations: string[];
  };
  compliance_status: {
    compliant: boolean;
    violations: string[];
    last_audit: Date;
  };
}

/**
 * RBAC Configuration
 */
export interface RBACConfig {
  inheritance_enabled: boolean;
  strict_hierarchy: boolean;
  audit_all_access: boolean;
  session_timeout: number;
  require_mfa_for_elevated: boolean;
  auto_role_assignment_rules: string[];
  compliance_mode: 'soc2' | 'iso27001' | 'pci_dss' | 'custom';
}

/**
 * Quick permission check result
 */
export interface PermissionCheckResult {
  granted: boolean;
  reason?: string;
  conditions_met: boolean;
  effective_scope: Scope;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  requires_additional_auth?: boolean;
}

/**
 * Insurance-Specific Permission Models
 * Competitive features inspired by industry leaders
 */

/**
 * Monetary authority limit for financial permissions
 */
export interface MonetaryAuthority {
  permission_id: string;
  currency: string;
  daily_limit: number;
  transaction_limit: number;
  cumulative_limit: number;
  requires_dual_approval_above: number;
  escalation_threshold: number;
  emergency_override_allowed: boolean;
}

/**
 * Territory-based access control for agents and underwriters
 */
export interface TerritoryAccess {
  territory_id: string;
  territory_name: string;
  states: string[];
  zip_codes?: string[];
  exclusions?: string[];
  effective_date: Date;
  expiration_date?: Date;
  product_lines: string[];
  underwriting_authority: boolean;
  claims_authority: boolean;
}

/**
 * Product line restrictions for insurance professionals
 */
export interface ProductLineAccess {
  product_id: string;
  product_name: string;
  category: 'auto' | 'home' | 'life' | 'health' | 'commercial' | 'specialty';
  underwriting_level: 1 | 2 | 3 | 4 | 5;
  pricing_authority: boolean;
  binding_authority: boolean;
  modification_authority: boolean;
  cancellation_authority: boolean;
  renewal_authority: boolean;
  commission_rate?: number;
}

/**
 * Regulatory compliance tracking for permissions
 */
export interface RegulatoryCompliance {
  regulation_type: 'naic' | 'doi' | 'sox' | 'gdpr' | 'ccpa' | 'hipaa' | 'pci_dss';
  compliance_level: 'basic' | 'standard' | 'enhanced' | 'enterprise';
  audit_frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  data_retention_period: number; // days
  encryption_required: boolean;
  access_logging_required: boolean;
  approval_workflow_required: boolean;
  data_classification: 'public' | 'internal' | 'confidential' | 'restricted';
}

/**
 * Claims authority levels with complexity and monetary limits
 */
export interface ClaimsAuthority {
  authority_level: 1 | 2 | 3 | 4 | 5;
  complexity_limit: 'simple' | 'standard' | 'complex' | 'catastrophic';
  monetary_limit: number;
  product_lines: string[];
  investigation_authority: boolean;
  settlement_authority: boolean;
  litigation_authority: boolean;
  subrogation_authority: boolean;
  salvage_authority: boolean;
  reserve_authority: boolean;
  requires_supervisor_approval: boolean;
  fraud_flag_authority: boolean;
}

/**
 * Real-time risk assessment for dynamic permissions
 */
export interface RiskBasedPermission {
  base_permission_id: string;
  risk_factors: {
    user_behavior_score: number; // 0-100
    session_risk_score: number; // 0-100
    transaction_risk_score: number; // 0-100
    context_risk_score: number; // 0-100
  };
  dynamic_restrictions: {
    time_of_day_restrictions?: { start: string; end: string }[];
    location_restrictions?: string[];
    device_restrictions?: string[];
    network_restrictions?: string[];
    velocity_limits?: { max_transactions: number; time_window: number };
  };
  escalation_triggers: {
    risk_threshold: number;
    escalation_to: string; // role or user ID
    notification_required: boolean;
    additional_auth_required: boolean;
  };
}

/**
 * Competitive advantage features from industry leaders
 */
export interface CompetitiveRBACFeatures {
  // Lemonade-inspired instant decision engine
  instant_decisions: {
    enabled: boolean;
    confidence_threshold: number;
    fallback_to_human: boolean;
    ai_model_version: string;
    decision_factors: string[];
  };
  
  // Root Insurance-inspired behavioral analytics
  behavioral_analytics: {
    enabled: boolean;
    baseline_period_days: number;
    anomaly_threshold: number;
    learning_mode: boolean;
    patterns_tracked: string[];
  };
  
  // Auth0/Okta-inspired fine-grained authorization
  fine_grained_auth: {
    attribute_based_rules: boolean;
    context_aware_decisions: boolean;
    real_time_evaluation: boolean;
    policy_engine_version: string;
  };
  
  // Zero-trust security model
  zero_trust: {
    continuous_verification: boolean;
    device_trust_required: boolean;
    network_verification: boolean;
    behavioral_biometrics: boolean;
    risk_adaptive_auth: boolean;
  };
}

/**
 * Insurance role templates for quick role creation
 */
export interface InsuranceRoleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'producer' | 'underwriter' | 'claims' | 'compliance' | 'executive';
  experience_level: 'entry' | 'intermediate' | 'senior' | 'executive';
  base_permissions: string[];
  territorial_scope: TerritoryAccess[];
  product_scope: ProductLineAccess[];
  monetary_authority?: MonetaryAuthority;
  claims_authority?: ClaimsAuthority;
  regulatory_requirements: {
    licenses_required: string[];
    certifications_required: string[];
    background_check_required: boolean;
    bond_amount?: number;
    continuing_education_hours: number;
  };
  supervision_requirements: {
    requires_supervisor: boolean;
    supervisor_approval_for: string[];
    escalation_threshold: number;
    review_frequency: 'daily' | 'weekly' | 'monthly';
  };
}

/**
 * Advanced RBAC analytics for insurance insights
 */
export interface InsuranceRBACAnalytics extends RoleAnalytics {
  insurance_specific_metrics: {
    premium_volume_accessed: number;
    claims_handled_count: number;
    policies_issued_count: number;
    regulatory_violations: number;
    commission_earned: number;
    territory_performance: Record<string, number>;
    product_performance: Record<string, number>;
    customer_satisfaction_score: number;
    fraud_detection_accuracy: number;
  };
  competitive_benchmarks: {
    industry_average_processing_time: number;
    our_average_processing_time: number;
    industry_error_rate: number;
    our_error_rate: number;
    customer_acquisition_cost: number;
    customer_lifetime_value: number;
  };
}

/**
 * Enhanced RBAC configuration with insurance-specific settings
 */
export interface EnhancedRBACConfig extends RBACConfig {
  insurance_specific: {
    state_compliance_mode: Record<string, string>; // state -> compliance framework
    agent_supervision_ratio: number;
    claims_dual_approval_threshold: number;
    underwriting_authority_matrix: Record<string, number>; // role -> max authority
    fraud_detection_enabled: boolean;
    regulatory_reporting_enabled: boolean;
    customer_pii_encryption_required: boolean;
    cross_border_restrictions: boolean;
    license_verification_required: boolean;
    appointment_verification_required: boolean;
  };
  competitive_features: CompetitiveRBACFeatures;
  ai_enhancement: {
    permission_optimization: boolean;
    role_recommendation_engine: boolean;
    anomaly_detection: boolean;
    predictive_access_patterns: boolean;
    natural_language_permission_queries: boolean;
  };
}
