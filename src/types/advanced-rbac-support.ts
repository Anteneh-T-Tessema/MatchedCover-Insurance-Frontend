/**
 * Supporting Types for Advanced RBAC System
 * Comprehensive type definitions for cutting-edge features
 */

// =============================================================================
// CORE SUPPORTING TYPES
// =============================================================================

export interface RiskModel {
  model_id: string;
  algorithm: 'neural_network' | 'decision_tree' | 'ensemble' | 'bayesian';
  risk_factors: string[];
  weights: Record<string, number>;
  accuracy_score: number;
  last_updated: Date;
}

export interface UsageAnalytics {
  analytics_id: string;
  total_requests: number;
  unique_users: number;
  peak_usage_times: TimeWindow[];
  usage_patterns: UsagePattern[];
  resource_utilization: ResourceUtilization;
}

export interface FraudDetection {
  detection_id: string;
  fraud_indicators: FraudIndicator[];
  machine_learning_models: MLFraudModel[];
  real_time_scoring: boolean;
  alert_thresholds: AlertThreshold[];
}

export interface AccessPattern {
  pattern_id: string;
  pattern_type: 'temporal' | 'geographical' | 'resource_based' | 'behavioral';
  frequency: number;
  typical_times: TimeWindow[];
  common_resources: string[];
  anomaly_indicators: AnomalyIndicator[];
}

export interface RiskIndicator {
  indicator_id: string;
  indicator_type: 'behavioral' | 'contextual' | 'historical' | 'predictive';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence_score: number;
  description: string;
  mitigation_actions: string[];
}

export interface PrecomputedDecisionTree {
  tree_id: string;
  decision_nodes: DecisionNode[];
  leaf_outcomes: LeafOutcome[];
  optimization_level: 'speed' | 'accuracy' | 'balanced';
  cache_hit_rate: number;
}

export interface CacheStrategy {
  strategy_type: 'lru' | 'lfu' | 'ttl' | 'adaptive';
  max_entries: number;
  ttl_seconds: number;
  eviction_policy: EvictionPolicy;
  hit_rate_target: number;
}

export interface FallbackMechanism {
  mechanism_id: string;
  trigger_condition: string;
  fallback_action: 'deny' | 'allow_basic' | 'human_review' | 'escalate';
  timeout_ms: number;
  retry_strategy: RetryStrategy;
}

export interface RiskFactor {
  factor_id: string;
  factor_name: string;
  weight: number;
  calculation_method: string;
  update_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  historical_impact: number;
}

export interface AdaptiveThreshold {
  threshold_id: string;
  metric_name: string;
  current_threshold: number;
  adaptive_algorithm: 'statistical' | 'ml_based' | 'rule_based';
  adjustment_frequency: number;
  sensitivity: number;
}

export interface TrendAnalysis {
  analysis_id: string;
  trend_direction: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  confidence_level: number;
  time_horizon: number;
  influencing_factors: string[];
  prediction_accuracy: number;
}

// =============================================================================
// AUTHENTICATION & VERIFICATION TYPES
// =============================================================================

export interface BiometricVerification {
  verification_id: string;
  biometric_types: BiometricType[];
  liveness_detection: boolean;
  anti_spoofing: boolean;
  match_threshold: number;
  quality_threshold: number;
}

export interface BiometricType {
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'behavioral_typing';
  confidence_score: number;
  template_hash: string;
  last_verified: Date;
}

export interface BehavioralAuthentication {
  authentication_id: string;
  keystroke_dynamics: KeystrokeDynamics;
  mouse_movements: MouseMovements;
  touch_patterns: TouchPatterns;
  device_interaction: DeviceInteraction;
}

export interface TrustScore {
  score: number; // 0-100
  factors: TrustFactor[];
  calculation_method: string;
  last_calculated: Date;
  historical_trend: TrendData[];
}

export interface SecurityPosture {
  posture_id: string;
  security_level: 'low' | 'medium' | 'high' | 'enterprise';
  security_controls: SecurityControl[];
  vulnerabilities: Vulnerability[];
  compliance_score: number;
  last_assessed: Date;
}

export interface ComplianceStatus {
  status_id: string;
  compliance_frameworks: ComplianceFramework[];
  violation_count: number;
  last_audit: Date;
  remediation_timeline: RemediationTimeline[];
}

// =============================================================================
// RELATIONSHIP & GRAPH TYPES
// =============================================================================

export interface DerivedRelation {
  relation_type: string;
  derivation_rule: string;
  source_relations: string[];
  confidence_score: number;
  auto_computed: boolean;
}

export interface GraphNode {
  node_id: string;
  node_type: 'user' | 'role' | 'resource' | 'permission';
  attributes: Record<string, unknown>;
  connections: string[];
}

export interface GraphEdge {
  edge_id: string;
  source_node: string;
  target_node: string;
  relationship_type: string;
  weight: number;
  properties: Record<string, unknown>;
}

export interface TraversalRule {
  rule_id: string;
  path_pattern: string;
  max_depth: number;
  constraints: PathConstraint[];
  optimization_hints: string[];
}

export interface InheritancePath {
  path_id: string;
  source_id: string;
  target_id: string;
  path_nodes: string[];
  inheritance_strength: number;
}

// =============================================================================
// AI & MACHINE LEARNING TYPES
// =============================================================================

export interface RiskVector {
  vector_id: string;
  dimensions: RiskDimension[];
  magnitude: number;
  direction: string[];
  temporal_stability: number;
}

export interface AnomalyDetection {
  detection_id: string;
  algorithms: AnomalyAlgorithm[];
  baseline_period: number;
  sensitivity_threshold: number;
  false_positive_rate: number;
}

export interface ThreatIntelligence {
  intelligence_id: string;
  threat_feeds: ThreatFeed[];
  indicators: ThreatIndicator[];
  attack_patterns: AttackPattern[];
  last_updated: Date;
}

export interface RemediationRecommendation {
  recommendation_id: string;
  action_type: 'immediate' | 'scheduled' | 'preventive';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  estimated_effort: number;
  risk_reduction: number;
}

export interface MLModel {
  model_id: string;
  model_type: 'classification' | 'regression' | 'clustering' | 'anomaly_detection';
  accuracy_score: number;
  last_trained: Date;
  training_data_size: number;
  features_used: string[];
}

// =============================================================================
// CONTEXT & POLICY TYPES
// =============================================================================

export interface PolicyDecisionEngine {
  engine_id: string;
  rule_engine: RuleEngine;
  decision_logic: DecisionLogic;
  performance_metrics: PerformanceMetrics;
  caching_enabled: boolean;
}

export interface ThreatCorrelation {
  correlation_id: string;
  threat_sources: ThreatSource[];
  correlation_rules: CorrelationRule[];
  confidence_threshold: number;
  alert_escalation: AlertEscalation;
}

export interface QuantumMigrationStrategy {
  migration_id: string;
  phases: MigrationPhase[];
  rollback_plan: RollbackPlan;
  compatibility_matrix: CompatibilityMatrix;
  timeline: MigrationTimeline;
}

// =============================================================================
// BEHAVIORAL & USAGE TYPES
// =============================================================================

export interface BehavioralProfile {
  profile_id: string;
  user_id: string;
  behavioral_patterns: BehavioralPattern[];
  anomaly_threshold: number;
  learning_period: number;
  confidence_score: number;
}

export interface BehavioralPattern {
  pattern_id: string;
  pattern_name: string;
  behavior_type: 'navigation' | 'interaction' | 'temporal' | 'preference';
  frequency: number;
  confidence_score: number;
  pattern_data: Record<string, unknown>;
  last_observed: Date;
  stability_score: number;
}

export interface BehavioralBaseline {
  baseline_id: string;
  metric_name: string;
  baseline_value: number;
  variance_tolerance: number;
  measurement_period: number;
  statistical_confidence: number;
}

export interface AdaptivePermission {
  permission_id: string;
  base_permission: string;
  adaptation_rules: AdaptationRule[];
  current_level: number;
  max_level: number;
  adjustment_history: AdjustmentHistory[];
}

export interface RoleUsageAnalytics {
  analytics_id: string;
  role_id: string;
  usage_frequency: number;
  permission_utilization: PermissionUtilization[];
  user_satisfaction_score: number;
  optimization_suggestions: string[];
}

export interface PermissionRecommendation {
  recommendation_id: string;
  recommended_action: 'add' | 'remove' | 'modify' | 'temporal';
  permission_id: string;
  confidence_score: number;
  reasoning: string;
  impact_assessment: ImpactAssessment;
}

export interface RiskScoringModel {
  model_id: string;
  scoring_algorithm: string;
  risk_factors: RiskFactor[];
  normalization_method: string;
  calibration_data: CalibrationData;
}

// =============================================================================
// INSURANCE-SPECIFIC TYPES
// =============================================================================

export interface LicenseDependency {
  license_type: string;
  license_number: string;
  expiry_date: Date;
  issuing_authority: string;
  required_permissions: string[];
  renewal_status: 'current' | 'expiring' | 'expired';
}

export interface DataRestriction {
  restriction_id: string;
  data_classification: 'public' | 'internal' | 'confidential' | 'restricted';
  access_conditions: AccessCondition[];
  retention_period: number;
  disposal_requirements: string[];
}

export interface ClaimPermission {
  permission_id: string;
  claim_types: string[];
  monetary_limits: MonetaryLimit[];
  approval_requirements: ApprovalRequirement[];
  audit_trail_required: boolean;
}

export interface DynamicRiskFactor {
  factor_id: string;
  factor_name: string;
  current_value: number;
  change_rate: number;
  impact_multiplier: number;
  update_frequency: number;
}

export interface RiskAdjustmentAction {
  action_id: string;
  trigger_condition: string;
  adjustment_type: 'elevate' | 'restrict' | 'monitor' | 'block';
  duration: number;
  review_required: boolean;
}

// =============================================================================
// SUPPORTING UTILITY TYPES
// =============================================================================

export interface TimeWindow {
  start_time: string;
  end_time: string;
  timezone: string;
  recurrence_pattern?: string;
}

export interface UsagePattern {
  pattern_name: string;
  frequency: number;
  peak_times: TimeWindow[];
  seasonal_variations: SeasonalVariation[];
}

export interface ResourceUtilization {
  resource_type: string;
  utilization_percentage: number;
  peak_usage: number;
  optimization_recommendations: string[];
}

export interface FraudIndicator {
  indicator_name: string;
  weight: number;
  threshold: number;
  current_value: number;
  historical_average: number;
}

export interface MLFraudModel {
  model_name: string;
  algorithm: string;
  accuracy: number;
  false_positive_rate: number;
  feature_importance: Record<string, number>;
}

export interface AlertThreshold {
  threshold_name: string;
  value: number;
  operator: 'gt' | 'lt' | 'eq' | 'between';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AnomalyIndicator {
  indicator_name: string;
  deviation_score: number;
  statistical_significance: number;
  temporal_context: string;
}

export interface DecisionNode {
  node_id: string;
  condition: string;
  true_branch: string;
  false_branch: string;
  evaluation_cost: number;
}

export interface LeafOutcome {
  outcome_id: string;
  decision: 'allow' | 'deny' | 'conditional';
  confidence: number;
  additional_checks?: string[];
}

export interface EvictionPolicy {
  policy_type: string;
  parameters: Record<string, unknown>;
  performance_metrics: PerformanceMetrics;
}

export interface RetryStrategy {
  max_retries: number;
  backoff_strategy: 'linear' | 'exponential' | 'fixed';
  base_delay_ms: number;
  max_delay_ms: number;
}

export interface PerformanceMetrics {
  response_time_p50: number;
  response_time_p95: number;
  response_time_p99: number;
  throughput_rps: number;
  error_rate: number;
}

// Additional types for completeness...
export interface KeystrokeDynamics {
  typing_rhythm: number[];
  dwell_times: number[];
  flight_times: number[];
  pressure_patterns: number[];
}

export interface MouseMovements {
  velocity_patterns: number[];
  acceleration_patterns: number[];
  click_patterns: ClickPattern[];
  scroll_behaviors: ScrollBehavior[];
}

export interface TouchPatterns {
  pressure_signatures: number[];
  gesture_velocities: number[];
  touch_durations: number[];
  multi_touch_patterns: MultiTouchPattern[];
}

export interface DeviceInteraction {
  interaction_frequency: number;
  application_usage: ApplicationUsage[];
  navigation_patterns: NavigationPattern[];
  session_behaviors: SessionBehavior[];
}

export interface TrustFactor {
  factor_name: string;
  weight: number;
  current_score: number;
  historical_trend: number[];
}

export interface TrendData {
  timestamp: Date;
  value: number;
  context: string;
}

export interface SecurityControl {
  control_id: string;
  control_name: string;
  effectiveness_score: number;
  implementation_status: 'implemented' | 'partial' | 'planned' | 'missing';
}

export interface Vulnerability {
  vulnerability_id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvss_score: number;
  affected_components: string[];
  remediation_status: 'open' | 'in_progress' | 'resolved' | 'accepted';
}

export interface ComplianceFramework {
  framework_name: string;
  version: string;
  compliance_percentage: number;
  requirements_met: number;
  total_requirements: number;
}

export interface RemediationTimeline {
  milestone: string;
  target_date: Date;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  dependencies: string[];
}

// =============================================================================
// ADDITIONAL MISSING TYPES
// =============================================================================

export interface SeasonalityFactor {
  factor_name: string;
  seasonal_period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  amplitude: number;
  phase_offset: number;
  trend_component: number;
}

export interface IndicatorOfCompromise {
  ioc_id: string;
  ioc_type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'file_path';
  value: string;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  confidence_score: number;
  source: string;
  first_seen: Date;
  last_seen: Date;
}

export interface ReputationScore {
  entity_id: string;
  entity_type: 'ip' | 'domain' | 'user' | 'device';
  reputation_score: number; // 0-100
  reputation_sources: ReputationSource[];
  last_updated: Date;
  historical_scores: HistoricalScore[];
}

export interface ReputationSource {
  source_name: string;
  score: number;
  weight: number;
  last_checked: Date;
}

export interface HistoricalScore {
  timestamp: Date;
  score: number;
  context: string;
}

export interface AutoExpiryRule {
  rule_id: string;
  expiry_condition: 'time_based' | 'usage_based' | 'event_based';
  duration: number;
  usage_threshold: number;
  trigger_events: string[];
  warning_period: number;
}

export interface RelationshipContext {
  context_id: string;
  relationship_type: string;
  strength: number;
  temporal_validity: TemporalValidity;
  context_attributes: Record<string, unknown>;
}

export interface TemporalValidity {
  start_time: Date;
  end_time?: Date;
  recurring: boolean;
  schedule?: RecurrenceSchedule;
}

export interface RecurrenceSchedule {
  pattern: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  end_condition: 'never' | 'after_occurrences' | 'by_date';
  end_value?: number | Date;
}

export interface ComplianceAutomation {
  automation_id: string;
  compliance_frameworks: string[];
  automated_controls: AutomatedControl[];
  monitoring_rules: MonitoringRule[];
  reporting_schedule: ReportingSchedule;
}

export interface AutomatedControl {
  control_id: string;
  control_name: string;
  automation_level: 'full' | 'partial' | 'monitoring_only';
  trigger_conditions: string[];
  remediation_actions: string[];
}

export interface MonitoringRule {
  rule_id: string;
  monitoring_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  threshold_conditions: ThresholdCondition[];
  alert_channels: string[];
}

export interface ThresholdCondition {
  metric_name: string;
  operator: 'gt' | 'lt' | 'eq' | 'ne' | 'between';
  threshold_value: number | string;
  severity: 'info' | 'warning' | 'critical';
}

export interface ReportingSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  recipients: string[];
  format: 'pdf' | 'html' | 'json' | 'excel';
  delivery_method: 'email' | 'portal' | 'api';
}

export interface MultiFractorBehavioralAuth {
  auth_id: string;
  behavioral_factors: BehavioralFactor[];
  biometric_factors: BiometricFactor[];
  contextual_factors: ContextualFactor[];
  risk_threshold: number;
  adaptive_weights: boolean;
}

export interface BehavioralFactor {
  factor_type: 'typing_pattern' | 'mouse_movement' | 'navigation_pattern' | 'interaction_timing';
  weight: number;
  confidence_threshold: number;
  learning_enabled: boolean;
}

export interface BiometricFactor {
  biometric_type: 'fingerprint' | 'face' | 'voice' | 'iris' | 'palm';
  quality_threshold: number;
  liveness_required: boolean;
  fallback_method?: string;
}

export interface ContextualFactor {
  factor_type: 'location' | 'device' | 'network' | 'time' | 'velocity';
  risk_weight: number;
  anomaly_threshold: number;
  historical_baseline: number;
}

export interface InsuranceFraudDetection {
  detection_id: string;
  fraud_models: FraudDetectionModel[];
  risk_indicators: InsuranceRiskIndicator[];
  pattern_recognition: PatternRecognition;
  real_time_scoring: boolean;
}

export interface FraudDetectionModel {
  model_name: string;
  model_type: 'supervised' | 'unsupervised' | 'ensemble';
  accuracy_rate: number;
  false_positive_rate: number;
  training_data_period: string;
  features: ModelFeature[];
}

export interface InsuranceRiskIndicator {
  indicator_name: string;
  risk_category: 'application_fraud' | 'claim_fraud' | 'identity_theft' | 'staged_accident';
  weight: number;
  threshold: number;
  current_score: number;
}

export interface PatternRecognition {
  pattern_types: string[];
  algorithms: string[];
  confidence_threshold: number;
  update_frequency: 'real_time' | 'batch' | 'scheduled';
}

export interface ModelFeature {
  feature_name: string;
  importance_score: number;
  data_type: 'numerical' | 'categorical' | 'text' | 'temporal';
  preprocessing_steps: string[];
}

export interface CustomerCentricPrivilegeModel {
  model_id: string;
  customer_segments: CustomerSegment[];
  privilege_levels: PrivilegeLevel[];
  escalation_paths: EscalationPath[];
  self_service_capabilities: SelfServiceCapability[];
}

export interface CustomerSegment {
  segment_id: string;
  segment_name: string;
  criteria: SegmentCriteria[];
  default_privileges: string[];
  risk_profile: CustomerRiskProfile;
}

export interface SegmentCriteria {
  criteria_type: 'demographic' | 'behavioral' | 'financial' | 'product_based';
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'in_range';
  value: unknown;
  weight: number;
}

export interface CustomerRiskProfile {
  risk_score: number;
  risk_factors: CustomerRiskFactor[];
  mitigation_strategies: string[];
  monitoring_level: 'basic' | 'enhanced' | 'intensive';
}

export interface CustomerRiskFactor {
  factor_name: string;
  impact_score: number;
  likelihood: number;
  historical_data: HistoricalRiskData[];
}

export interface HistoricalRiskData {
  timestamp: Date;
  event_type: string;
  impact: number;
  resolution: string;
}

export interface PrivilegeLevel {
  level_id: string;
  level_name: string;
  permissions: string[];
  constraints: PrivilegeConstraint[];
  approval_requirements: ApprovalRequirement[];
}

export interface PrivilegeConstraint {
  constraint_type: 'temporal' | 'monetary' | 'frequency' | 'approval_based';
  parameters: Record<string, unknown>;
  enforcement_level: 'advisory' | 'enforced' | 'blocking';
}

export interface ApprovalRequirement {
  requirement_id: string;
  approval_type: 'automatic' | 'single_approver' | 'multi_approver' | 'committee';
  approver_roles: string[];
  time_limit: number;
  escalation_policy: string;
}

export interface EscalationPath {
  path_id: string;
  trigger_conditions: string[];
  escalation_steps: EscalationStep[];
  max_escalation_level: number;
  timeout_actions: string[];
}

export interface EscalationStep {
  step_number: number;
  approver_role: string;
  time_limit: number;
  notification_channels: string[];
  auto_approve_conditions?: string[];
}

export interface SelfServiceCapability {
  capability_id: string;
  capability_name: string;
  eligible_user_segments: string[];
  risk_threshold: number;
  audit_requirements: AuditRequirement[];
}

export interface AuditRequirement {
  requirement_type: 'before_action' | 'after_action' | 'periodic';
  audit_level: 'basic' | 'detailed' | 'forensic';
  retention_period: number;
  notification_required: boolean;
}

export interface AgentWorkflowOptimization {
  optimization_id: string;
  workflow_patterns: WorkflowPattern[];
  efficiency_metrics: EfficiencyMetric[];
  automation_opportunities: AutomationOpportunity[];
  performance_tracking: PerformanceTracking;
}

export interface WorkflowPattern {
  pattern_id: string;
  pattern_name: string;
  frequency: number;
  average_completion_time: number;
  bottlenecks: WorkflowBottleneck[];
  optimization_suggestions: string[];
}

export interface WorkflowBottleneck {
  bottleneck_id: string;
  step_name: string;
  delay_time: number;
  cause_analysis: string;
  resolution_options: string[];
}

export interface EfficiencyMetric {
  metric_name: string;
  current_value: number;
  target_value: number;
  improvement_trend: 'improving' | 'stable' | 'declining';
  contributing_factors: string[];
}

export interface AutomationOpportunity {
  opportunity_id: string;
  process_name: string;
  automation_potential: number; // 0-100
  estimated_time_savings: number;
  implementation_complexity: 'low' | 'medium' | 'high';
  roi_estimate: number;
}

export interface PerformanceTracking {
  tracking_id: string;
  kpis: PerformanceKPI[];
  benchmarks: PerformanceBenchmark[];
  improvement_targets: ImprovementTarget[];
}

export interface PerformanceKPI {
  kpi_name: string;
  current_value: number;
  target_value: number;
  measurement_frequency: 'real_time' | 'daily' | 'weekly' | 'monthly';
  trend_direction: 'up' | 'down' | 'stable';
}

export interface PerformanceBenchmark {
  benchmark_name: string;
  industry_average: number;
  top_quartile: number;
  our_performance: number;
  gap_analysis: string;
}

export interface ImprovementTarget {
  target_id: string;
  target_description: string;
  current_baseline: number;
  target_value: number;
  target_date: Date;
  success_criteria: string[];
}

export interface AnomalyDetectionAlgorithm {
  algorithm_name: string;
  algorithm_type: 'statistical' | 'machine_learning' | 'rule_based' | 'hybrid';
  sensitivity: number;
  false_positive_rate: number;
  detection_latency: number;
  training_requirements: TrainingRequirement[];
}

export interface TrainingRequirement {
  requirement_type: 'historical_data' | 'labeled_examples' | 'domain_expertise';
  minimum_data_points: number;
  data_quality_threshold: number;
  update_frequency: 'continuous' | 'daily' | 'weekly' | 'monthly';
}

export interface SensitivityLevel {
  level_name: string;
  threshold: number;
  expected_detection_rate: number;
  expected_false_positive_rate: number;
  use_cases: string[];
}

// =============================================================================
// REMAINING MISSING TYPES FROM PREVIOUS DEFINITIONS
// =============================================================================

export interface PathConstraint {
  constraint_type: 'max_depth' | 'node_type' | 'relationship_type' | 'attribute_filter';
  parameters: Record<string, unknown>;
  enforcement_level: 'strict' | 'advisory';
}

export interface RiskDimension {
  dimension_name: string;
  value: number;
  weight: number;
  normalization_factor: number;
  temporal_stability: number;
}

export interface AnomalyAlgorithm {
  algorithm_name: string;
  algorithm_type: 'isolation_forest' | 'one_class_svm' | 'autoencoder' | 'statistical';
  hyperparameters: Record<string, unknown>;
  performance_metrics: AlgorithmPerformanceMetrics;
}

export interface AlgorithmPerformanceMetrics {
  precision: number;
  recall: number;
  f1_score: number;
  auc_roc: number;
  training_time: number;
  inference_time: number;
}

export interface ThreatFeed {
  feed_id: string;
  feed_name: string;
  provider: string;
  feed_type: 'commercial' | 'open_source' | 'government' | 'internal';
  update_frequency: string;
  reliability_score: number;
}

export interface ThreatIndicator {
  indicator_id: string;
  indicator_type: 'ioc' | 'ttp' | 'campaign' | 'actor';
  value: string;
  confidence_level: number;
  threat_level: string;
  tags: string[];
}

export interface AttackPattern {
  pattern_id: string;
  pattern_name: string;
  mitre_attack_id?: string;
  description: string;
  indicators: string[];
  mitigation_strategies: string[];
}

export interface RuleEngine {
  engine_id: string;
  rule_format: 'drools' | 'json' | 'yaml' | 'custom';
  rules_count: number;
  evaluation_mode: 'sequential' | 'parallel' | 'prioritized';
  performance_stats: RuleEnginePerformance;
}

export interface RuleEnginePerformance {
  rules_per_second: number;
  average_latency_ms: number;
  memory_usage_mb: number;
  cache_hit_rate: number;
}

export interface DecisionLogic {
  logic_id: string;
  logic_type: 'boolean' | 'fuzzy' | 'probabilistic' | 'ml_based';
  complexity_score: number;
  decision_tree_depth: number;
  branching_factor: number;
}

export interface ThreatSource {
  source_id: string;
  source_type: 'internal' | 'external' | 'partner' | 'intelligence_feed';
  credibility: number;
  coverage_areas: string[];
  last_updated: Date;
}

export interface CorrelationRule {
  rule_id: string;
  rule_name: string;
  correlation_logic: string;
  time_window: number;
  confidence_threshold: number;
  event_types: string[];
}

export interface AlertEscalation {
  escalation_id: string;
  escalation_levels: EscalationLevel[];
  notification_channels: NotificationChannel[];
  acknowledgment_required: boolean;
  auto_resolution: boolean;
}

export interface EscalationLevel {
  level: number;
  time_threshold: number;
  recipients: string[];
  escalation_action: string;
}

export interface NotificationChannel {
  channel_type: 'email' | 'sms' | 'slack' | 'webhook' | 'push';
  endpoint: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  rate_limit: RateLimit;
}

export interface RateLimit {
  max_notifications: number;
  time_window: number;
  backoff_strategy: string;
}

export interface MigrationPhase {
  phase_id: string;
  phase_name: string;
  duration_estimate: number;
  dependencies: string[];
  risk_level: 'low' | 'medium' | 'high';
  success_criteria: string[];
}

export interface RollbackPlan {
  plan_id: string;
  rollback_triggers: string[];
  rollback_steps: RollbackStep[];
  data_recovery_plan: string;
  estimated_rollback_time: number;
}

export interface RollbackStep {
  step_number: number;
  description: string;
  estimated_time: number;
  verification_criteria: string[];
  dependencies: string[];
}

export interface CompatibilityMatrix {
  matrix_id: string;
  quantum_algorithms: string[];
  classical_algorithms: string[];
  compatibility_scores: Record<string, number>;
  migration_paths: MigrationPath[];
}

export interface MigrationPath {
  from_algorithm: string;
  to_algorithm: string;
  migration_complexity: 'simple' | 'moderate' | 'complex';
  estimated_effort: number;
  risk_factors: string[];
}

export interface MigrationTimeline {
  timeline_id: string;
  start_date: Date;
  end_date: Date;
  milestones: Milestone[];
  critical_path: string[];
}

export interface Milestone {
  milestone_id: string;
  name: string;
  target_date: Date;
  deliverables: string[];
  success_criteria: string[];
}

export interface AdaptationRule {
  rule_id: string;
  trigger_condition: string;
  adaptation_action: 'increase' | 'decrease' | 'maintain' | 'escalate';
  adjustment_magnitude: number;
  cooldown_period: number;
}

export interface AdjustmentHistory {
  adjustment_id: string;
  timestamp: Date;
  previous_level: number;
  new_level: number;
  trigger_reason: string;
  adjustment_impact: AdjustmentImpact;
}

export interface AdjustmentImpact {
  security_impact: number;
  usability_impact: number;
  performance_impact: number;
  cost_impact: number;
}

export interface PermissionUtilization {
  permission_id: string;
  usage_frequency: number;
  last_used: Date;
  user_satisfaction: number;
  business_value: number;
}

export interface ImpactAssessment {
  assessment_id: string;
  security_impact: SecurityImpactAnalysis;
  business_impact: BusinessImpactAnalysis;
  user_impact: UserImpactAnalysis;
  overall_risk_score: number;
}

export interface SecurityImpactAnalysis {
  risk_change: number;
  attack_surface_change: number;
  compliance_impact: string[];
  mitigation_requirements: string[];
}

export interface BusinessImpactAnalysis {
  productivity_impact: number;
  cost_impact: number;
  revenue_impact: number;
  operational_complexity: number;
}

export interface UserImpactAnalysis {
  usability_impact: number;
  training_requirements: string[];
  adoption_difficulty: 'easy' | 'moderate' | 'difficult';
  user_satisfaction_prediction: number;
}

export interface CalibrationData {
  calibration_set_size: number;
  calibration_accuracy: number;
  confidence_intervals: ConfidenceInterval[];
  reliability_diagram: ReliabilityPoint[];
}

export interface ConfidenceInterval {
  confidence_level: number;
  lower_bound: number;
  upper_bound: number;
}

export interface ReliabilityPoint {
  predicted_probability: number;
  actual_frequency: number;
  sample_size: number;
}

export interface MonetaryLimit {
  limit_type: 'per_transaction' | 'daily' | 'monthly' | 'annual';
  amount: number;
  currency: string;
  approval_threshold: number;
}

export interface AccessCondition {
  condition_type: 'role_based' | 'attribute_based' | 'contextual' | 'temporal';
  condition_expression: string;
  enforcement_mode: 'strict' | 'advisory' | 'monitor_only';
}

export interface SeasonalVariation {
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'holiday' | 'business_hours';
  variation_factor: number;
  confidence_level: number;
}

export interface ClickPattern {
  click_frequency: number;
  double_click_ratio: number;
  right_click_ratio: number;
  click_pressure: number[];
  timing_patterns: number[];
}

export interface ScrollBehavior {
  scroll_speed: number;
  scroll_direction_preferences: DirectionPreference[];
  pause_patterns: ScrollPause[];
  momentum_characteristics: MomentumCharacteristics;
}

export interface DirectionPreference {
  direction: 'up' | 'down' | 'left' | 'right';
  frequency: number;
  typical_distance: number;
}

export interface ScrollPause {
  pause_duration: number;
  pause_location_type: 'top' | 'middle' | 'bottom' | 'content_boundary';
  frequency: number;
}

export interface MomentumCharacteristics {
  initial_velocity: number;
  deceleration_rate: number;
  final_position_accuracy: number;
}

export interface MultiTouchPattern {
  gesture_type: 'pinch' | 'zoom' | 'rotate' | 'swipe' | 'tap';
  finger_count: number;
  pressure_distribution: number[];
  timing_coordination: number[];
}

export interface ApplicationUsage {
  application_name: string;
  usage_duration: number;
  interaction_frequency: number;
  feature_usage_patterns: FeatureUsage[];
}

export interface FeatureUsage {
  feature_name: string;
  usage_count: number;
  proficiency_level: 'novice' | 'intermediate' | 'expert';
  error_rate: number;
}

export interface NavigationPattern {
  navigation_type: 'menu' | 'breadcrumb' | 'search' | 'direct_url';
  sequence_patterns: NavigationSequence[];
  efficiency_score: number;
}

export interface NavigationSequence {
  sequence_id: string;
  steps: string[];
  frequency: number;
  completion_rate: number;
  average_time: number;
}

export interface SessionBehavior {
  session_duration: number;
  activity_level: ActivityLevel;
  break_patterns: BreakPattern[];
  task_switching_frequency: number;
}

export interface ActivityLevel {
  periods: ActivityPeriod[];
  overall_intensity: 'low' | 'medium' | 'high';
  variability_score: number;
}

export interface ActivityPeriod {
  start_time: Date;
  duration: number;
  intensity: number;
  activity_type: string;
}

export interface BreakPattern {
  break_duration: number;
  break_frequency: number;
  break_timing: 'regular' | 'irregular' | 'task_dependent';
  activity_during_break: string[];
}
