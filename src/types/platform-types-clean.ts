/**
 * Comprehensive Type Definitions for SOC2 GRC Platform
 * 
 * This file consolidates all interface definitions to eliminate duplicates
 * and provide a single source of truth for type definitions.
 */

// Core Platform Types
export interface BaseEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

// Security Control Interfaces
export interface SecurityControlStatus {
  control_id: string;
  status: 'implemented' | 'partial' | 'not_implemented' | 'not_applicable';
  effectiveness: 'effective' | 'needs_improvement' | 'ineffective';
  last_tested: string;
  evidence: Evidence[];
  remediation_plan?: string;
  implementation_date?: string;
  owner: string;
  testing_frequency: string;
}

// Evidence and Documentation
export interface Evidence {
  id: string;
  type: 'document' | 'screenshot' | 'log' | 'configuration' | 'test_result';
  title: string;
  description?: string;
  file_path?: string;
  content?: string;
  metadata: Record<string, unknown>;
  collected_date: string;
  retention_period: number;
}

export interface DocumentationResult {
  policies_created: number;
  procedures_documented: number;
  evidence_collected: number;
  completeness_score: number;
  last_updated: string;
}

// Validation and Testing
export interface ValidationResult {
  passed: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
  timestamp: string;
  validator: string;
  details: Record<string, unknown>;
}

export interface InputValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?;
  details?: Record<string, unknown>;
}

export interface ComplianceValidationDetail {
  status: 'pass' | 'fail' | 'warning';
  score: number;
  findings: string[];
  recommendations: string[];
  details: Record<string, unknown>;
}

// Integration Testing Interfaces
export interface InteropTest {
  readonly id: string;
  readonly testName: string;
  readonly passed: boolean;
  readonly duration: number;
  readonly details: string;
  readonly timestamp: string;
}

export interface InteropTestResult {
  readonly timestamp: string;
  readonly overallCompatibilityScore: number;
  readonly tests: ReadonlyArray<InteropTest>;
  readonly incompatibilities: ReadonlyArray<string>;
  readonly recommendations: ReadonlyArray<string>;
}

export interface APITest {
  readonly id: string;
  readonly testName: string;
  readonly passed: boolean;
  readonly duration: number;
  readonly statusCode?: number;
  readonly responseTime?: number;
  readonly details: string;
  readonly timestamp: string;
}

export interface APITestResult {
  readonly timestamp: string;
  readonly overallAPIHealth: number;
  readonly tests: ReadonlyArray<APITest>;
  readonly endpoints: ReadonlyArray<string>;
  readonly performanceMetrics: Readonly<Record<string, number>>;
  readonly recommendations: ReadonlyArray<string>;
}

export interface DatabaseTest {
  readonly id: string;
  readonly testName: string;
  readonly passed: boolean;
  readonly duration: number;
  readonly details: string;
  readonly timestamp: string;
}

export interface DatabaseTestResult {
  readonly timestamp: string;
  readonly overallIntegrityScore: number;
  readonly tests: ReadonlyArray<DatabaseTest>;
  readonly integrityIssues: ReadonlyArray<string>;
  readonly performanceMetrics: Readonly<Record<string, number>>;
  readonly recommendations: ReadonlyArray<string>;
}

export interface EndToEndTest {
  readonly id: string;
  readonly testName: string;
  readonly passed: boolean;
  readonly duration: number;
  readonly steps?: ReadonlyArray<string>;
  readonly userActions?: ReadonlyArray<string>;
  readonly details: string;
  readonly timestamp: string;
}

export interface E2ETestResult {
  readonly timestamp: string;
  readonly overallSuccessRate: number;
  readonly tests: ReadonlyArray<EndToEndTest>;
  readonly failures: ReadonlyArray<string>;
  readonly userExperienceMetrics: Readonly<Record<string, number>>;
  readonly recommendations: ReadonlyArray<string>;
}

export interface ComprehensiveTestResult {
  readonly timestamp: string;
  readonly overallSuccessRate: number;
  readonly interopResult: InteropTestResult;
  readonly apiResult: APITestResult;
  readonly databaseResult: DatabaseTestResult;
  readonly e2eResult: E2ETestResult;
  readonly criticalIssues: ReadonlyArray<string>;
  readonly recommendations: ReadonlyArray<string>;
}

// Risk Management
export interface RiskAssessment extends BaseEntity {
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  likelihood: number;
  impact: number;
  risk_score: number;
  category: string;
  owner: string;
  mitigation_strategies: MitigationStrategy[];
  residual_risk: number;
  review_date: string;
  status: 'identified' | 'assessed' | 'treated' | 'monitored' | 'closed';
}

export interface MitigationStrategy {
  id: string;
  strategy_type: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  actions: ActionItem[];
  cost_estimate: number;
  implementation_timeline: string;
  effectiveness_rating: number;
  responsible_party: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dependencies: string[];
  estimated_effort: number;
  actual_effort?: number;
  completion_date?: string;
}

// Compliance Framework Interfaces
export interface ComplianceFramework extends BaseEntity {
  version: string;
  domains: FrameworkDomain[];
  total_controls: number;
  implementation_guide_url?: string;
  certification_requirements?: string[];
  audit_frequency: string;
  industry_applicability: string[];
  regulatory_body?: string;
}

export interface FrameworkDomain extends BaseEntity {
  framework_id: string;
  controls: FrameworkControl[];
  domain_code: string;
  weight: number;
  compliance_percentage: number;
}

export interface FrameworkControl extends BaseEntity {
  domain_id: string;
  control_code: string;
  control_type: 'preventive' | 'detective' | 'corrective';
  requirements: FrameworkRequirement[];
  testing_procedures: string[];
  evidence_requirements: string[];
  implementation_guidance: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  automation_potential: number;
  compliance_complexity: number;
}

export interface FrameworkRequirement extends BaseEntity {
  control_id: string;
  requirement_text: string;
  implementation_examples: string[];
  testing_methods: string[];
  success_criteria: string[];
  applicable_systems: string[];
  frequency: string;
}
