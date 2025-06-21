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

// Quality Assurance Interfaces
export interface QualityTest {
  id: string;
  name: string;
  category: string;
  passed: boolean;
  score: number;
  details: string;
  message?: string;
  timestamp: string;
  duration?: number;
  benchmark?: string;
}

export interface QualityReport {
  timestamp: string;
  overallScore: number;
  tests: QualityTest[];
  metrics: QualityMetrics;
  categories: CategoryValidation[];
  recommendations: string[];
  securityAudit: SecurityAuditResult;
  performance: PerformanceReport;
  benchmarks?: Record<string, string>;
}

export interface QualityMetrics {
  total: number;
  passed: number;
  failed: number;
  avgScore: number;
  categories: Record<string, number>;
  totalTests?: number;
  passedTests?: number;
  failedTests?: number;
  categoryBreakdown?: Record<string, { total: number; passed: number; avgScore: number }>;
}

export interface CategoryValidation {
  category: string;
  score: number;
  tests: QualityTest[];
  recommendations: string[];
  completeness?: number;
  missingFeatures?: string[];
}

export interface FeatureValidation {
  feature: string;
  status: 'working' | 'partial' | 'broken' | 'missing';
  score: number;
  details: string;
  recommendations?: string[];
  timestamp?: string;
  overallCompleteness?: number;
}

export interface SecurityCheck {
  id: string;
  name: string;
  passed: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  message?: string;
  remediation?: string;
}

export interface SecurityAuditResult {
  timestamp: string;
  overallScore: number;
  overallSecurityScore?: number;
  checks: SecurityCheck[];
  vulnerabilities: SecurityCheck[];
  recommendations: string[];
}

export interface PerformanceTest {
  id: string;
  name: string;
  metric: string;
  value: number;
  threshold: number;
  passed: boolean;
  unit: string;
  score?: number;
  benchmark?: string;
  actual?: number;
}

export interface PerformanceReport {
  timestamp: string;
  overallScore: number;
  overallPerformanceScore?: number;
  tests: PerformanceTest[];
  metrics: Record<string, number>;
  recommendations: string[];
}

// ========================================
// CONSOLIDATED RESULT INTERFACES
// These replace duplicate interfaces across the codebase
// ========================================

// Generic Result Interface for all operations
export interface OperationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Voice Service Results
export interface VoiceRecognitionResult {
  text: string;
  confidence: number;
  language: string;
  duration: number;
  success: boolean;
  metadata?: Record<string, unknown>;
}

export interface VoiceResult {
  success: boolean;
  text?: string;
  error?: string;
  confidence?: number;
  timestamp: string;
}

// Business Process Results
export interface ApplicationResult {
  applicationId: string;
  status: 'approved' | 'declined' | 'pending' | 'review_required';
  decision: string;
  premium?: number;
  coverage?: Record<string, unknown>;
  effectiveDate?: string;
  expirationDate?: string;
  documents: string[];
  metadata: Record<string, unknown>;
}

export interface BindingResult {
  bindingId: string;
  status: 'bound' | 'pending' | 'declined' | 'expired';
  policyNumber?: string;
  bindingDate: string;
  effectiveDate: string;
  premium: number;
  documents: string[];
  carrier: string;
  metadata: Record<string, unknown>;
}

export interface PaymentResult {
  paymentId: string;
  status: 'success' | 'failed' | 'pending' | 'cancelled';
  amount: number;
  currency: string;
  method: string;
  transactionId?: string;
  processedAt: string;
  metadata: Record<string, unknown>;
}

export interface CarrierBindingResult {
  carrierId: string;
  bindingStatus: 'bound' | 'pending' | 'declined';
  quoteId: string;
  policyNumber?: string;
  bindingDate: string;
  premium: number;
  commission: number;
  documents: string[];
  metadata: Record<string, unknown>;
}

export interface ClaimProcessingResult {
  claimId: string;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'closed';
  decision?: string;
  settlement?: number;
  processedDate?: string;
  documents: string[];
  notes: string[];
  metadata: Record<string, unknown>;
}

// Step-by-Step Execution Results
export interface StepByStepResult {
  success: boolean;
  completedPhases: number;
  totalPhases: number;
  errors: string[];
  warnings: string[];
  duration: number;
  timestamp: string;
  summary: Record<string, unknown>;
}

export interface PhaseExecutionResult {
  phaseId: string;
  phaseName: string;
  success: boolean;
  duration: number;
  completedSteps: number;
  totalSteps: number;
  errors: string[];
  warnings: string[];
  metadata: Record<string, unknown>;
}

export interface StepExecutionResult {
  stepId: string;
  stepName: string;
  success: boolean;
  duration: number;
  output?;
  error?: string;
  warnings: string[];
  metadata: Record<string, unknown>;
}

export interface PhaseValidationResult {
  phaseId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validatedAt: string;
  metadata: Record<string, unknown>;
}

export interface StepValidationResults {
  stepId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  dependencies: string[];
  metadata: Record<string, unknown>;
}

// Quality and Compliance Results
export interface QualityImprovementResult {
  category: string;
  improvementsMade: number;
  issuesResolved: string[];
  qualityScore: number;
  previousScore: number;
  recommendations: string[];
  timestamp: string;
}

export interface ErrorResult {
  error: true;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  stack?: string;
  timestamp: string;
}

export interface SuccessResult<T = unknown> {
  error: false;
  data: T;
  message?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

// Audit and Monitoring Results
export interface AuditPreparationResult {
  readinessScore: number;
  documentsCollected: number;
  evidenceValidated: number;
  gapsIdentified: string[];
  recommendations: string[];
  estimatedCompletionDate: string;
  preparationStatus: 'not_started' | 'in_progress' | 'review' | 'ready';
  metadata: Record<string, unknown>;
}

export interface MonitoringResult {
  checkId: string;
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  value?: number;
  threshold?: number;
  message: string;
  checkedAt: string;
  nextCheck?: string;
  metadata: Record<string, unknown>;
}

export interface MonitorCheckResult {
  checkName: string;
  success: boolean;
  value?: number;
  threshold?: number;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface SOC2ImplementationResult {
  controlsImplemented: number;
  totalControls: number;
  complianceScore: number;
  gaps: string[];
  recommendations: string[];
  implementationDate: string;
  nextReviewDate: string;
  status: 'planning' | 'implementing' | 'testing' | 'complete';
  metadata: Record<string, unknown>;
}

export interface AuditReadinessResult {
  overallReadiness: number;
  controlsReady: number;
  totalControls: number;
  missingEvidence: string[];
  incompleteControls: string[];
  recommendations: string[];
  estimatedReadinessDate: string;
  auditType: 'SOC2_Type1' | 'SOC2_Type2' | 'ISO27001' | 'PCI_DSS';
  metadata: Record<string, unknown>;
}

export interface AuditTestResult {
  testId: string;
  controlId: string;
  testType: 'automated' | 'manual' | 'walkthrough' | 'inspection';
  result: 'pass' | 'fail' | 'exception' | 'not_applicable';
  severity: 'low' | 'medium' | 'high' | 'critical';
  findings: string[];
  recommendations: string[];
  evidenceCollected: string[];
  testDate: string;
  tester: string;
  metadata: Record<string, unknown>;
}

export interface ControlTestingResult {
  controlId: string;
  testingStatus: 'not_started' | 'in_progress' | 'completed' | 'failed';
  testsRun: number;
  testsPassed: number;
  testsFailed: number;
  effectiveness: 'effective' | 'partially_effective' | 'ineffective';
  lastTestDate: string;
  nextTestDate: string;
  findings: string[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

// Implementation Results
export interface ImplementationPhaseResult {
  phaseId: string;
  phaseName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  progress: number;
  startDate?: string;
  endDate?: string;
  duration?: number;
  dependencies: string[];
  blockers: string[];
  deliverables: string[];
  metadata: Record<string, unknown>;
}

export interface ImplementationStepResult {
  stepId: string;
  stepName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  progress: number;
  assignee?: string;
  estimatedEffort?: number;
  actualEffort?: number;
  startDate?: string;
  endDate?: string;
  output?;
  notes: string[];
  metadata: Record<string, unknown>;
}

// Utility and Parser Results
export interface ParseResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  warnings: string[];
  metadata: Record<string, unknown>;
}

// Smart Quote Results
export interface SmartQuoteResult {
  quoteId: string;
  premium: number;
  coverage: Record<string, unknown>;
  discounts: Array<{
    type: string;
    amount: number;
    description: string;
  }>;
  terms: Record<string, unknown>;
  validUntil: string;
  confidence: number;
  recommendations: string[];
  metadata: Record<string, unknown>;
}

// ========================================
// TYPE UNIONS AND ALIASES
// ========================================

// Union type for all result types
export type AnyResult = 
  | OperationResult
  | VoiceRecognitionResult
  | VoiceResult
  | ApplicationResult
  | BindingResult
  | PaymentResult
  | CarrierBindingResult
  | ClaimProcessingResult
  | StepByStepResult
  | PhaseExecutionResult
  | StepExecutionResult
  | QualityImprovementResult
  | ErrorResult
  | SuccessResult
  | AuditPreparationResult
  | MonitoringResult
  | SOC2ImplementationResult
  | AuditReadinessResult
  | ParseResult
  | SmartQuoteResult;

// Result status types
export type ResultStatus = 'success' | 'failure' | 'warning' | 'pending' | 'cancelled';
export type TestStatus = 'pass' | 'fail' | 'skip' | 'error';
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'partial' | 'not_assessed';
