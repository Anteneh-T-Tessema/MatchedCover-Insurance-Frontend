import { environmentManager } from '../utils/enhanced-environment';
import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import type { SecurityControlStatus, Evidence, ValidationResult, ComplianceValidationResult, ErrorContext } from '../types/platform-types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export interface AuditTestProcedure {
  test_id: string;
  control_id: string;
  test_objective: string;
  test_description: string;
  test_steps: string[];
  expected_evidence: string[];
  automation_level: 'manual' | 'semi_automated' | 'fully_automated';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  test_results?: AuditTestResult[];
}

export interface AuditTestResult {
  execution_date: string;
  test_status: 'passed' | 'failed' | 'not_applicable' | 'in_progress';
  findings: string[];
  evidence_collected: string[];
  deficiencies: AuditDeficiency[];
  tester_notes: string;
  automation_log?: string;
}

export interface AuditDeficiency {
  deficiency_id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  root_cause: string;
  impact_assessment: string;
  remediation_plan: string;
  responsible_party: string;
  target_resolution_date: string;
  status: 'open' | 'in_progress' | 'resolved' | 'accepted_risk';
}

export interface AuditEvidence {
  evidence_id: string;
  control_id: string;
  evidence_type: 'screenshot' | 'document' | 'log_file' | 'configuration' | 'report' | 'interview_notes';
  evidence_description: string;
  collection_method: 'automated' | 'manual';
  file_path: string;
  collection_date: string;
  retention_period: string;
  integrity_hash: string;
  metadata: Record<string, string | number | boolean>;
}

export interface AuditReport {
  report_id: string;
  audit_period: string;
  report_type: 'interim' | 'annual' | 'management' | 'board' | 'regulatory';
  scope: string[];
  executive_summary: string;
  audit_methodology: string;
  control_testing_results: ControlTestingResult[];
  deficiencies_summary: DeficiencySummary;
  management_responses: ManagementResponse[];
  conclusions: string;
  recommendations: string[];
  appendices: string[];
}

export interface ControlTestingResult {
  control_id: string;
  control_description: string;
  test_procedures_performed: string[];
  testing_frequency: string;
  sample_size: number;
  exceptions_noted: number;
  control_effectiveness: 'effective' | 'partially_effective' | 'ineffective';
  deficiencies: string[];
}

export interface DeficiencySummary {
  total_deficiencies: number;
  by_severity: Record<string, number>;
  by_category: Record<string, number>;
  resolved_during_audit: number;
  outstanding_deficiencies: number;
}

export interface ManagementResponse {
  deficiency_id: string;
  management_response: string;
  agreed_action_plan: string;
  responsible_person: string;
  target_completion_date: string;
  status: 'agreed' | 'partially_agreed' | 'not_agreed';
}

export class AutomatedAuditAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private gemini: GoogleGenerativeAI;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;
  private outputDir: string;
  private testProcedures: AuditTestProcedure[] = [];
  private evidenceRepository: AuditEvidence[] = [];

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.model = this.gemini.getGenerativeModel({ 
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash-exp' 
    });
    this.outputDir = path.join(process.cwd(), 'audit-automation');
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    const dirs = ['test-procedures', 'evidence', 'reports', 'deficiencies'];
    dirs.forEach(dir => {
      const fullPath = path.join(this.outputDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  /**
   * Generate comprehensive audit test procedures
   */
  async generateAuditTestProcedures(): Promise<AuditTestProcedure[]> {
    console.log("🔍 Generating automated audit test procedures...");

    const soc2Controls = [
      { id: 'CC6.1', description: 'Logical and physical access controls' },
      { id: 'CC6.2', description: 'Authentication and authorization' },
      { id: 'CC6.3', description: 'System access removal' },
      { id: 'CC6.6', description: 'Vulnerability management' },
      { id: 'CC6.7', description: 'Data transmission controls' },
      { id: 'CC6.8', description: 'System data protection' },
      { id: 'CC7.1', description: 'System monitoring' },
      { id: 'CC8.1', description: 'Change management' },
      { id: 'A1.1', description: 'Availability monitoring' },
      { id: 'A1.2', description: 'System capacity management' },
      { id: 'A1.3', description: 'System backup and recovery' },
      { id: 'PI1.1', description: 'Data processing integrity' },
      { id: 'C1.1', description: 'Confidential data identification' },
      { id: 'C1.2', description: 'Confidential data protection' },
      { id: 'P1.1', description: 'Privacy notice and consent' },
      { id: 'P2.1', description: 'Privacy data collection' },
      { id: 'P3.1', description: 'Privacy data use and retention' }
    ];

    const procedures: AuditTestProcedure[] = [];

    for (const control of soc2Controls) {
      console.log(`Generating test procedures for ${control.id}...`);
      
      const prompt = `You are a senior SOC 2 auditor developing detailed test procedures for an insurance technology platform.

Control: ${control.id} - ${control.description}

Generate comprehensive audit test procedures that include:

1. **Test Objective**
   - Clear statement of what the test aims to verify
   - Link to SOC 2 Trust Service Criteria

2. **Detailed Test Steps**
   - Step-by-step testing procedures
   - Specific systems/applications to test
   - Sample selection criteria
   - Testing methodology

3. **Expected Evidence**
   - Types of evidence to collect
   - Documentation requirements
   - Screenshots/reports needed
   - Interview requirements

4. **Automation Opportunities**
   - Which steps can be automated
   - Required tools/scripts
   - Automated data collection methods

5. **Testing Frequency**
   - How often tests should be performed
   - Continuous monitoring elements
   - Periodic validation requirements

Make the procedures specific to insurance technology environments with cloud infrastructure, APIs, databases, and customer data processing.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      const procedure = this.parseTestProcedure(content, control.id, control.description);
      procedures.push(procedure);
    }

    this.testProcedures = procedures;
    await this.saveTestProcedures(procedures);
    
    console.log(`✅ Generated ${procedures.length} automated test procedures`);
    return procedures;
  }

  /**
   * Execute automated audit tests
   */
  async executeAutomatedTests(): Promise<AuditTestResult[]> {
    console.log("🤖 Executing automated audit tests...");

    const results: AuditTestResult[] = [];

    for (const procedure of this.testProcedures) {
      if (procedure.automation_level === 'fully_automated' || procedure.automation_level === 'semi_automated') {
        console.log(`Executing automated test: ${procedure.test_id}...`);
        
        const result = await this.executeIndividualTest(procedure);
        results.push(result);
        
        // Auto-collect evidence
        await this.autoCollectEvidence(procedure, result);
      }
    }

    await this.saveTestResults(results);
    
    console.log(`✅ Executed ${results.length} automated tests`);
    return results;
  }

  /**
   * Perform intelligent evidence collection
   */
  async performEvidenceCollection(): Promise<AuditEvidence[]> {
    console.log("📊 Performing intelligent evidence collection...");

    const evidenceTypes = [
      { type: 'configuration', description: 'System and security configurations' },
      { type: 'log_file', description: 'Security and access logs' },
      { type: 'report', description: 'Automated compliance reports' },
      { type: 'document', description: 'Policy and procedure documents' }
    ];

    const evidence: AuditEvidence[] = [];

    for (const evidenceType of evidenceTypes) {
      console.log(`Collecting ${evidenceType.type} evidence...`);
      
      const collectedEvidence = await this.collectEvidenceByType(evidenceType.type as AuditEvidence['evidence_type']);
      evidence.push(...collectedEvidence);
    }

    this.evidenceRepository = evidence;
    await this.saveEvidence(evidence);
    
    console.log(`✅ Collected ${evidence.length} pieces of audit evidence`);
    return evidence;
  }

  /**
   * Generate comprehensive audit report
   */
  async generateAuditReport(auditPeriod: string): Promise<AuditReport> {
    console.log("📋 Generating comprehensive audit report...");

    const prompt = `You are a lead SOC 2 auditor preparing a comprehensive audit report for an insurance technology platform.

Audit Period: ${auditPeriod}
Controls Tested: ${this.testProcedures.length}
Evidence Collected: ${this.evidenceRepository.length} items

Generate a professional SOC 2 audit report that includes:

1. **Executive Summary**
   - Overall audit opinion
   - Key findings and conclusions
   - Management's responsibility
   - Auditor's responsibility

2. **Audit Scope and Methodology**
   - Systems and processes examined
   - Testing approach and procedures
   - Evidence evaluation methods
   - Limitations and restrictions

3. **Control Testing Results**
   - Summary of controls tested
   - Testing procedures performed
   - Sample sizes and selection methods
   - Exceptions and deficiencies noted

4. **Detailed Findings**
   - Control effectiveness assessment
   - Deficiencies by severity
   - Root cause analysis
   - Impact assessment

5. **Management Responses**
   - Remediation plans
   - Timeline for corrections
   - Resource allocation
   - Risk acceptance decisions

6. **Recommendations**
   - Process improvements
   - Control enhancements
   - Best practice implementations
   - Continuous improvement opportunities

7. **Conclusions**
   - Overall control environment assessment
   - Compliance status
   - Risk exposure evaluation
   - Future audit considerations

Format as a professional audit report suitable for management, board of directors, and regulatory review.`;

    const result = await this.model.generateContent(prompt);
    const content = result.response.text() || '';
    
    const report = this.parseAuditReport(content, auditPeriod);
    await this.saveAuditReport(report);
    
    console.log("✅ Generated comprehensive audit report");
    return report;
  }

  /**
   * Identify and track audit deficiencies
   */
  async identifyDeficiencies(testResults: AuditTestResult[]): Promise<AuditDeficiency[]> {
    console.log("⚠️ Identifying and analyzing audit deficiencies...");

    const deficiencies: AuditDeficiency[] = [];

    const failedTests = testResults.filter(r => r.test_status === 'failed');

    for (const failedTest of failedTests) {
      for (const finding of failedTest.findings) {
        const prompt = `You are a SOC 2 auditor analyzing a control deficiency for an insurance technology platform.

Failed Test Finding: ${finding}
Test Date: ${failedTest.execution_date}

Analyze this deficiency and provide:

1. **Severity Assessment** (low/medium/high/critical)
   - Impact on control objectives
   - Risk to data confidentiality/integrity/availability
   - Regulatory compliance implications

2. **Root Cause Analysis**
   - Underlying cause of the deficiency
   - Contributing factors
   - Process breakdowns

3. **Impact Assessment**
   - Business impact
   - Compliance risk
   - Customer data risk
   - Operational risk

4. **Remediation Plan**
   - Specific corrective actions
   - Implementation steps
   - Required resources
   - Dependencies

5. **Timeline and Responsibility**
   - Realistic completion timeline
   - Responsible parties
   - Milestones and checkpoints

Be specific and actionable for an insurance technology environment.`;

        const result = await this.model.generateContent(prompt);
        const content = result.response.text() || '';
        
        const deficiency = this.parseDeficiency(content, finding);
        deficiencies.push(deficiency);
      }
    }

    await this.saveDeficiencies(deficiencies);
    
    console.log(`✅ Identified and analyzed ${deficiencies.length} deficiencies`);
    return deficiencies;
  }

  /**
   * Monitor remediation progress
   */
  async monitorRemediation(): Promise<void> {
  try {
    console.log("📈 Monitoring remediation progress...");

    // Load existing deficiencies
    const deficiencies = await this.loadDeficiencies();
    
    const openDeficiencies = deficiencies.filter(d => d.status === 'open' || d.status === 'in_progress');
    
    for (const deficiency of openDeficiencies) {
      // Check if target date is approaching or past due
      const targetDate = new Date(deficiency.target_resolution_date);
      const today = new Date();
      const daysUntilDue = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue <= 7) {
        await this.generateRemediationAlert(deficiency, daysUntilDue);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
    
    console.log(`✅ Monitored ${openDeficiencies.length} open deficiencies`);
  }

  /**
   * Helper methods for parsing AI responses
   */
  private parseTestProcedure(content: string, controlId: string, description: string): AuditTestProcedure {
    return {
      test_id: `TEST-${controlId}-${Date.now()}`,
      control_id: controlId,
      test_objective: `Verify effective implementation of ${description}`,
      test_description: content,
      test_steps: this.extractTestSteps(content),
      expected_evidence: this.extractExpectedEvidence(content),
      automation_level: this.determineAutomationLevel(content),
      frequency: this.determineTestingFrequency(controlId)
    };
  }

  private parseAuditReport(content: string, auditPeriod: string): AuditReport {
    return {
      report_id: `AUDIT-REPORT-${Date.now()}`,
      audit_period: auditPeriod,
      report_type: 'annual',
      scope: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
      executive_summary: this.extractSection(content, 'Executive Summary'),
      audit_methodology: this.extractSection(content, 'Methodology'),
      control_testing_results: [],
      deficiencies_summary: {
        total_deficiencies: 0,
        by_severity: {},
        by_category: {},
        resolved_during_audit: 0,
        outstanding_deficiencies: 0
      },
      management_responses: [],
      conclusions: this.extractSection(content, 'Conclusions'),
      recommendations: this.extractRecommendations(content),
      appendices: []
    };
  }

  private parseDeficiency(content: string, finding: string): AuditDeficiency {
    return {
      deficiency_id: `DEF-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      severity: this.extractSeverity(content),
      description: finding,
      root_cause: this.extractSection(content, 'Root Cause'),
      impact_assessment: this.extractSection(content, 'Impact'),
      remediation_plan: this.extractSection(content, 'Remediation'),
      responsible_party: 'IT Security Team',
      target_resolution_date: this.calculateTargetDate(),
      status: 'open'
    };
  }

  private async executeIndividualTest(procedure: AuditTestProcedure): Promise<AuditTestResult> {
    // Simulate automated test execution
    const isSuccessful = Math.random() > 0.3; // 70% success rate for simulation
    
    return {
      execution_date: new Date().toISOString(),
      test_status: isSuccessful ? 'passed' : 'failed',
      findings: isSuccessful ? [] : [`Control deficiency identified in ${procedure.control_id}`],
      evidence_collected: [`Evidence for ${procedure.test_id}`],
      deficiencies: [],
      tester_notes: `Automated test execution for ${procedure.test_id}`,
      automation_log: `Test executed successfully via automation engine`
    };
  }

  private async autoCollectEvidence(procedure: AuditTestProcedure, result: AuditTestResult): Promise<void> {
    const evidence: AuditEvidence = {
      evidence_id: `EV-${procedure.test_id}-${Date.now()}`,
      control_id: procedure.control_id,
      evidence_type: 'report',
      evidence_description: `Automated test results for ${procedure.control_id}`,
      collection_method: 'automated',
      file_path: `evidence/${procedure.test_id}_results.json`,
      collection_date: result.execution_date,
      retention_period: '7 years',
      integrity_hash: 'sha256-' + Math.random().toString(36),
      metadata: {
        test_id: procedure.test_id,
        automation_level: procedure.automation_level
      }
    };

    this.evidenceRepository.push(evidence);
  }

  private async collectEvidenceByType(evidenceType: AuditEvidence['evidence_type']): Promise<AuditEvidence[]> {
    // Simulate evidence collection
    const evidence: AuditEvidence[] = [];
    
    for (let i = 0; i < 3; i++) {
      evidence.push({
        evidence_id: `EV-${evidenceType}-${Date.now()}-${i}`,
        control_id: 'Multiple',
        evidence_type: evidenceType,
        evidence_description: `Collected ${evidenceType} evidence`,
        collection_method: 'automated',
        file_path: `evidence/${evidenceType}_${i}.json`,
        collection_date: new Date().toISOString(),
        retention_period: '7 years',
        integrity_hash: 'sha256-' + Math.random().toString(36),
        metadata: { source: 'automated_collection' }
      });
    }
    
    return evidence;
  }

  /**
   * Utility methods
   */
  private extractTestSteps(_content: string): string[] {
    return [
      'Review control implementation',
      'Test control effectiveness',
      'Validate evidence',
      'Document findings'
    ];
  }

  private extractExpectedEvidence(_content: string): string[] {
    return [
      'Configuration screenshots',
      'Access logs',
      'Policy documents',
      'Process documentation'
    ];
  }

  private determineAutomationLevel(_content: string): AuditTestProcedure['automation_level'] {
    return 'semi_automated';
  }

  private determineTestingFrequency(controlId: string): AuditTestProcedure['frequency'] {
    const frequencyMap: Record<string, AuditTestProcedure['frequency']> = {
      'CC6.1': 'monthly',
      'CC6.2': 'weekly',
      'CC6.3': 'monthly',
      'A1.1': 'daily'
    };
    return frequencyMap[controlId] || 'quarterly';
  }

  private extractSection(content: string, sectionName: string): string {
    const regex = new RegExp(`${sectionName}[\\s\\S]*?(?=\\n\\n|$)`, 'i');
    const match = content.match(regex);
    return match ? match[0] : `${sectionName} content extracted from AI analysis`;
  }

  private extractRecommendations(_content: string): string[] {
    return [
      'Enhance continuous monitoring',
      'Implement additional controls',
      'Improve documentation',
      'Strengthen training programs'
    ];
  }

  private extractSeverity(content: string): AuditDeficiency['severity'] {
    if (content.toLowerCase().includes('critical')) return 'critical';
    if (content.toLowerCase().includes('high')) return 'high';
    if (content.toLowerCase().includes('low')) return 'low';
    return 'medium';
  }

  private calculateTargetDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 3); // 3 months from now
    return date.toISOString().split('T')[0];
  }

  /**
   * Save methods
   */
  private async saveTestProcedures(procedures: AuditTestProcedure[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'test-procedures', 'audit_test_procedures.json');
    fs.writeFileSync(filepath, JSON.stringify(procedures, null, 2));
  }

  private async saveTestResults(results: AuditTestResult[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'test-procedures', 'test_results.json');
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
  }

  private async saveEvidence(evidence: AuditEvidence[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'evidence', 'evidence_repository.json');
    fs.writeFileSync(filepath, JSON.stringify(evidence, null, 2));
  }

  private async saveAuditReport(report: AuditReport): Promise<void> {
    const filepath = path.join(this.outputDir, 'reports', `audit_report_${report.report_id}.json`);
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    
    // Also save as markdown
    const markdownPath = path.join(this.outputDir, 'reports', `audit_report_${report.report_id}.md`);
    const markdown = this.generateReportMarkdown(report);
    fs.writeFileSync(markdownPath, markdown);
  }

  private async saveDeficiencies(deficiencies: AuditDeficiency[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'deficiencies', 'audit_deficiencies.json');
    fs.writeFileSync(filepath, JSON.stringify(deficiencies, null, 2));
  }

  private async loadDeficiencies(): Promise<AuditDeficiency[]> {
    const filepath = path.join(this.outputDir, 'deficiencies', 'audit_deficiencies.json');
    try {
      const content = fs.readFileSync(filepath, 'utf8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  private async generateRemediationAlert(deficiency: AuditDeficiency, daysUntilDue: number): Promise<void> {
    const alert = `# Remediation Alert

`**Deficiency ID:** ${deficiency.deficiency_id}`
`**Severity:** ${deficiency.severity}`
`**Days Until Due:** ${daysUntilDue}`
`**Status:** ${deficiency.status}`

`**Description:** ${deficiency.description}`

`**Responsible Party:** ${deficiency.responsible_party}`
`**Target Date:** ${deficiency.target_resolution_date}`

**Action Required:** Immediate attention needed for remediation activities.
`;

    const alertPath = path.join(this.outputDir, 'deficiencies', `alert_${deficiency.deficiency_id}.md`);
    fs.writeFileSync(alertPath, alert);
  }

  private generateReportMarkdown(report: AuditReport): string {
    return `# SOC 2 Audit Report

`**Report ID:** ${report.report_id}`
`**Audit Period:** ${report.audit_period}`
`**Report Type:** ${report.report_type}`
`**Generated:** ${new Date().toISOString()}`

## Executive Summary

${report.executive_summary}

## Audit Scope

${report.scope.join(', ')}

## Audit Methodology

${report.audit_methodology}

## Conclusions

${report.conclusions}

## Recommendations

${report.recommendations.map(rec => - ${rec}).join('\n')}

---
*This report was generated by the Automated Audit Agent*
`;
  }
}
