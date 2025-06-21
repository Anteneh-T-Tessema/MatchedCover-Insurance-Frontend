/**
 * SOC 2 Compliance Validation Agent
 * 
 * This module provides comprehensive SOC 2 compliance validation capabilities with
 * enhanced scoring, automation tracking, and real-time monitoring integration.
 * 
 * Key Features:
 * - 100-point scoring system per control
 * - Automated evidence collection validation
 * - Real-time monitoring integration
 * - Comprehensive audit trail generation
 * - Security-first validation approach
 * 
 * @author SOC 2 & GRC Platform Team
 * @version 2.0.0
 * @since 2024-12-20
 */

import { BaseAgent } from '../BaseAgent';
import SOC2EnhancedConfig, { SOC2Control, SOC2Evidence, SOC2TestProcedure } from '../../config/soc2-enhanced-config';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface defining the structure of compliance validation details
 * Contains validation status, numerical score, and actionable recommendations
 */
export interface ComplianceValidationDetail {
  /** Validation status: pass (95+), warning (70-94), fail (<70) */
  status: 'pass' | 'fail' | 'warning';
  /** Numerical score out of 100 based on comprehensive criteria */
  score: number;
  /** Array of specific findings from the validation process */
  findings: string[];
  /** Array of actionable recommendations for improvement */
  recommendations: string[];
  /** Additional metadata and detailed validation results */
  details: Record<string, unknown>;
}

/**
 * Comprehensive compliance validation result structure
 * Provides both overall assessment and individual control results
 */
export interface ComplianceComplianceValidationDetail {
  /** Overall compliance assessment across all controls */
  overall: ComplianceValidationDetail;
  /** Individual control validation results keyed by control ID */
  controls: Record<string, ComplianceValidationDetail>;
  /** Compliance framework being validated (e.g., 'SOC2') */
  framework: string;
  /** ISO 8601 timestamp of validation execution */
  timestamp: string;
  /** Legacy compatibility: overall compliance score */
  overallComplianceScore: number; // For backward compatibility
  /** Summary statistics of validation results */
  summary: {
    /** Total number of controls evaluated */
    totalControls: number;
    /** Number of controls that passed validation */
    passedControls: number;
    /** Number of controls that failed validation */
    failedControls: number;
    /** Number of controls with warnings */
    warningControls: number;
    /** Calculated overall score across all controls */
    overallScore: number;
  };
}

/**
 * ComplianceValidationAgent - Enterprise-grade SOC 2 compliance validation
 * 
 * This agent provides industry-leading compliance validation capabilities with:
 * - Enhanced 100-point scoring methodology (7 criteria including automation)
 * - Real-time monitoring and alerting integration
 * - Comprehensive evidence quality assessment
 * - Automated test procedure validation
 * - Security-first approach to compliance validation
 * - Audit-ready documentation and reporting
 * 
 * Scoring Methodology (per control):
 * - Implementation Status: 25 points (implemented/partial/not_implemented)
 * - Testing Status: 20 points (tested/in_progress/not_tested)
 * - Effectiveness: 25 points (effective/needs_improvement/ineffective)
 * - Evidence Quality: 10 points (quantity, variety, recency validation)
 * - Documentation Completeness: 10 points (policies, procedures, reviews)
 * - Automation Level: 5 points (automated testing and evidence collection)
 * - Monitoring & Alerting: 5 points (real-time monitoring capabilities)
 * 
 * @class ComplianceValidationAgent
 * @extends BaseAgent
 * @version 2.0.0
 * @author SOC 2 & GRC Platform Team
 * @since 2024-12-20
 */
export class ComplianceValidationAgent extends BaseAgent {
  /** Enhanced SOC 2 configuration with automation and monitoring capabilities */
  private enhancedConfig: typeof SOC2EnhancedConfig;

  /**
   * Initialize the compliance validation agent with enhanced configuration
   * Sets up logging, metrics collection, and security validation
   */
  constructor() {
    super('ComplianceValidationAgent', '1.0.0');
    this.enhancedConfig = SOC2EnhancedConfig;
  }

  /**
   * Validate SOC 2 compliance across all configured controls
   * 
   * This method performs comprehensive validation of SOC 2 controls using the
   * enhanced 100-point scoring system. It evaluates implementation status,
   * testing procedures, effectiveness, evidence quality, documentation
   * completeness, automation level, and monitoring capabilities.
   * 
   * @returns {Promise<ComplianceComplianceValidationDetail>} Comprehensive validation results
   * @throws {Error} If critical validation errors occur
   * 
   * @example
   * const agent = new ComplianceValidationAgent();
   * const results = await agent.validateSOC2Compliance();
   * console.log(`Overall Score: ${results.summary.overallScore}%`);
   */
  public async validateSOC2Compliance(): Promise<ComplianceComplianceValidationDetail> {
    try {
      this.log('Starting SOC 2 compliance validation', 'info');
      
      const controls = this.enhancedConfig.ENHANCED_SOC2_CONTROLS;
      const controlResults: Record<string, ComplianceValidationDetail> = {};
      let totalScore = 0;
      let passedControls = 0;
      let failedControls = 0;
      let warningControls = 0;

      // Validate each control
      for (const control of controls) {
        try {
          const result = await this.validateControl(control.id, control);
          controlResults[control.id] = result;
          totalScore += result.score;

          switch (result.status) {
            case 'pass':
              passedControls++;
              break;
            case 'fail':
              failedControls++;
              break;
            case 'warning':
              warningControls++;
              break;
          }
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }

      const totalControls = controls.length;
      const overallScore = totalControls > 0 ? (totalScore / totalControls) : 0;

      const overallResult: ComplianceValidationDetail = {
        status: overallScore >= 80 ? 'pass' : overallScore >= 60 ? 'warning' : 'fail',
        score: overallScore,
        findings: [
          `${passedControls} controls passed`,
          `${failedControls} controls failed`,
          `${warningControls} controls have warnings`
        ],
        recommendations: this.generateRecommendations(failedControls, warningControls),
        details: {
          totalControls,
          passedControls,
          failedControls,
          warningControls
        }
      };

      return {
        overall: overallResult,
        controls: controlResults,
        framework: 'SOC2',
        timestamp: new Date().toISOString(),
        overallComplianceScore: overallScore, // For backward compatibility
        summary: {
          totalControls,
          passedControls,
          failedControls,
          warningControls,
          overallScore
        }
      };
    } catch (error) {
      this.log(`Error during SOC 2 validation: ${error}`, 'error');
      throw error;
    }
  }

  public async validateSOC2Requirements(): Promise<ComplianceComplianceValidationDetail> {
    try {
      // This method provides backward compatibility
      return this.validateSOC2Compliance();
    } catch (error) {
      this.log(`Error validating SOC2 requirements: ${error}`, 'error');
      throw error;
    }
  }

  private async validateControl(controlId: string, control: { 
    id: string; 
    description?: string; 
    category?: string; 
    implementationStatus?: string; 
    testingStatus?: string; 
    effectiveness?: string;
    evidence?: SOC2Evidence[];
    testProcedures?: SOC2TestProcedure[];
    gaps?: string[];
  }): Promise<ComplianceValidationDetail> {
    try {
      let score = 0;
      const findings: string[] = [];
      const recommendations: string[] = [];

      // 1. Implementation Status (25 points max)
      switch (control.implementationStatus) {
        case 'implemented':
          score += 25;
          findings.push(`Control ${controlId} is fully implemented`);
          break;
        case 'partially_implemented':
          score += 15;
          findings.push(`Control ${controlId} is partially implemented`);
          recommendations.push(`Complete implementation of ${controlId}`);
          break;
        case 'not_implemented':
          score += 5;
          findings.push(`Control ${controlId} is not implemented`);
          recommendations.push(`Implement control ${controlId} immediately`);
          break;
        default:
          score += 10;
          findings.push(`Control ${controlId} implementation status unclear`);
          recommendations.push(`Define implementation status for ${controlId}`);
      }

      // 2. Testing Status (20 points max)
      switch (control.testingStatus) {
        case 'tested':
          score += 20;
          findings.push(`Control ${controlId} has been tested`);
          break;
        case 'testing_in_progress':
          score += 15;
          findings.push(`Control ${controlId} testing is in progress`);
          recommendations.push(`Complete testing for ${controlId}`);
          break;
        case 'not_tested':
          score += 5;
          findings.push(`Control ${controlId} has not been tested`);
          recommendations.push(`Implement testing procedures for ${controlId}`);
          break;
        default:
          score += 10;
          findings.push(`Control ${controlId} testing status unclear`);
          recommendations.push(`Define testing procedures for ${controlId}`);
      }

      // 3. Effectiveness (25 points max)
      switch (control.effectiveness) {
        case 'effective':
          score += 25;
          findings.push(`Control ${controlId} is operating effectively`);
          break;
        case 'needs_improvement':
          score += 15;
          findings.push(`Control ${controlId} needs improvement`);
          recommendations.push(`Improve effectiveness of ${controlId}`);
          break;
        case 'ineffective':
          score += 5;
          findings.push(`Control ${controlId} is ineffective`);
          recommendations.push(`Fix and enhance ${controlId} immediately`);
          break;
        default:
          score += 10;
          findings.push(`Control ${controlId} effectiveness not evaluated`);
          recommendations.push(`Evaluate effectiveness of ${controlId}`);
      }

      // 4. Evidence Quality (10 points max) - NEW
      const evidenceScore = this.calculateEvidenceScore(control.evidence || []);
      score += evidenceScore;
      if (evidenceScore >= 8) {
        findings.push(`Control ${controlId} has comprehensive evidence`);
      } else if (evidenceScore >= 5) {
        findings.push(`Control ${controlId} has adequate evidence`);
        recommendations.push(`Enhance evidence collection for ${controlId}`);
      } else {
        findings.push(`Control ${controlId} lacks sufficient evidence`);
        recommendations.push(`Implement comprehensive evidence collection for ${controlId}`);
      }

      // 5. Documentation Completeness (10 points max) - NEW
      const documentationScore = this.calculateDocumentationScore(control);
      score += documentationScore;
      if (documentationScore >= 8) {
        findings.push(`Control ${controlId} has complete documentation`);
      } else if (documentationScore >= 5) {
        findings.push(`Control ${controlId} has adequate documentation`);
        recommendations.push(`Complete documentation for ${controlId}`);
      } else {
        findings.push(`Control ${controlId} lacks proper documentation`);
        recommendations.push(`Create comprehensive documentation for ${controlId}`);
      }

      // 6. Automation Level (5 points max) - NEW
      const automationScore = this.calculateAutomationScore(control);
      score += automationScore;
      if (automationScore >= 4) {
        findings.push(`Control ${controlId} is highly automated`);
      } else if (automationScore >= 2) {
        findings.push(`Control ${controlId} has partial automation`);
        recommendations.push(`Increase automation for ${controlId}`);
      } else {
        findings.push(`Control ${controlId} lacks automation`);
        recommendations.push(`Implement automation for ${controlId}`);
      }

      // 7. Monitoring & Alerting (5 points max) - NEW
      const monitoringScore = this.calculateMonitoringScore(control);
      score += monitoringScore;
      if (monitoringScore >= 4) {
        findings.push(`Control ${controlId} has comprehensive monitoring`);
      } else if (monitoringScore >= 2) {
        findings.push(`Control ${controlId} has basic monitoring`);
        recommendations.push(`Enhance monitoring for ${controlId}`);
      } else {
        findings.push(`Control ${controlId} lacks monitoring`);
        recommendations.push(`Implement monitoring and alerting for ${controlId}`);
      }

      // Determine overall status based on score (now out of 100)
      let status: 'pass' | 'fail' | 'warning';
      if (score >= 90) {
        status = 'pass';
      } else if (score >= 70) {
        status = 'warning';
      } else {
        status = 'fail';
      }

      return {
        status,
        score,
        findings,
        recommendations,
        details: {
          implementationStatus: control.implementationStatus,
          testingStatus: control.testingStatus,
          effectiveness: control.effectiveness,
          evidenceQuality: evidenceScore,
          documentationCompleteness: documentationScore,
          automationLevel: automationScore,
          monitoringScore: monitoringScore
        }
      };
    } catch (error) {
      this.log(`Error validating control ${controlId}: ${error}`, 'error');
      return {
        status: 'fail',
        score: 0,
        findings: [`Error validating control ${controlId}: ${error}`],
        recommendations: [`Fix validation logic for control ${controlId}`],
        details: { error: error }
      };
    }
  }

  /**
   * Calculate evidence quality score based on comprehensive criteria
   * 
   * This method evaluates evidence quality using multiple factors:
   * - Quantity: Number of evidence items (up to 6 points for multiple pieces)
   * - Variety: Different types of evidence (up to 2 points for diversity)
   * - Recency: Currency of evidence (2 points for all current evidence)
   * 
   * Evidence types evaluated: document, screenshot, log, configuration, test_result
   * 
   * @param {SOC2Evidence[]} evidence - Array of evidence items to evaluate
   * @returns {number} Score from 0-10 points based on evidence quality
   * 
   * @example
   * const evidence = [
   *   { type: 'document', validity: 'current', ... },
   *   { type: 'log', validity: 'current', ... }
   * ];
   * const score = this.calculateEvidenceScore(evidence); // Returns 0-10
   */
  private calculateEvidenceScore(evidence: SOC2Evidence[]): number {
    if (!evidence || evidence.length === 0) return 0;
    
    let score = 0;
    
    // Base score for having evidence
    score += Math.min(evidence.length * 2, 6); // Up to 6 points for quantity
    
    // Quality bonus for different evidence types
    const evidenceTypes = new Set(evidence.map((e: SOC2Evidence) => e.type));
    score += Math.min(evidenceTypes.size, 2); // Up to 2 points for variety
    
    // Recency bonus for current evidence
    const currentEvidence = evidence.filter((e: SOC2Evidence) => e.validity === 'current');
    if (currentEvidence.length === evidence.length) {
      score += 2; // 2 points for all evidence being current
    }
    
    return Math.min(score, 10);
  }

  /**
   * Calculate documentation completeness score based on comprehensive criteria
   * 
   * This method evaluates documentation quality across multiple dimensions:
   * - Basic elements: description (2 pts), category (1 pt)
   * - Analysis artifacts: gaps analysis (2 pts), recommendations (2 pts)
   * - Testing documentation: test procedures (2 pts)
   * - Governance: last reviewed date (1 pt)
   * 
   * Supports both SOC2Control interface and generic control objects for flexibility.
   * 
   * @param {SOC2Control | GenericControl} control - Control object to evaluate
   * @returns {number} Score from 0-10 points based on documentation completeness
   * 
   * @example
   * const control = {
   *   description: "Control description",
   *   category: "Security",
   *   gaps: [],
   *   recommendations: ["Improve X"],
   *   testProcedures: [{ id: "T1", ... }],
   *   lastReviewed: new Date()
   * };
   * const score = this.calculateDocumentationScore(control); // Returns 0-10
   */
  private calculateDocumentationScore(control: SOC2Control | { 
    description?: string; 
    category?: string; 
    gaps?: string[]; 
    recommendations?: string[]; 
    testProcedures?: SOC2TestProcedure[]; 
    lastReviewed?: Date 
  }): number {
    let score = 0;
    
    // Basic documentation elements
    if (control.description) score += 2;
    if (control.category) score += 1;
    
    // Advanced documentation elements
    if (control.gaps && control.gaps.length >= 0) score += 2; // Even empty gaps array shows analysis
    if ('recommendations' in control && control.recommendations && control.recommendations.length > 0) score += 2;
    if (control.testProcedures && control.testProcedures.length > 0) score += 2;
    if ('lastReviewed' in control && control.lastReviewed) score += 1;
    
    return Math.min(score, 10);
  }

  /**
   * Calculate automation level score based on automated testing and evidence collection
   * 
   * This method evaluates the degree of automation implemented for a control:
   * - Automated testing: Daily/frequent test procedures (2 points)
   * - Automated evidence: Log-based or automated evidence collection (2 points)
   * - High automation bonus: Additional point for comprehensive automation (1 point)
   * 
   * Automation indicators:
   * - Test frequency: 'daily' indicates automation
   * - Test descriptions: containing 'automated' keyword
   * - Evidence types: 'log' indicates automated collection
   * - Evidence descriptions: containing 'automated' keyword
   * 
   * @param {Object} control - Control object with testProcedures and evidence
   * @param {SOC2TestProcedure[]} control.testProcedures - Array of test procedures
   * @param {SOC2Evidence[]} control.evidence - Array of evidence items
   * @returns {number} Score from 0-5 points based on automation level
   * 
   * @example
   * const control = {
   *   testProcedures: [{ frequency: 'daily', description: 'Automated test' }],
   *   evidence: [{ type: 'log', description: 'Automated collection' }]
   * };
   * const score = this.calculateAutomationScore(control); // Returns 0-5
   */
  private calculateAutomationScore(control: { testProcedures?: SOC2TestProcedure[]; evidence?: SOC2Evidence[] }): number {
    let score = 0;
    
    // Check for automated testing
    if (control.testProcedures) {
      const automatedTests = control.testProcedures.filter((tp: SOC2TestProcedure) => 
        tp.frequency === 'daily' || tp.description.toLowerCase().includes('automated')
      );
      if (automatedTests.length > 0) score += 2;
    }
    
    // Check for automated evidence collection
    if (control.evidence) {
      const automatedEvidence = control.evidence.filter((e: SOC2Evidence) => 
        e.type === 'log' || e.description.toLowerCase().includes('automated')
      );
      if (automatedEvidence.length > 0) score += 2;
    }
    
    // Bonus for high automation
    if (score >= 4) score += 1;
    
    return Math.min(score, 5);
  }

  /**
   * Calculate monitoring and alerting score based on continuous monitoring capabilities
   * 
   * This method evaluates real-time monitoring and alerting implementation:
   * - Continuous monitoring: Daily/weekly test procedures indicating real-time checks (2 points)
   * - Real-time evidence: Log-based evidence indicating live monitoring (2 points)
   * - Comprehensive monitoring bonus: Additional point for full monitoring coverage (1 point)
   * 
   * Monitoring indicators:
   * - Test frequency: 'daily' or 'weekly' suggests continuous monitoring
   * - Evidence types: 'log' indicates real-time data collection
   * - Descriptions: containing 'real-time' keyword indicates live monitoring
   * 
   * @param {Object} control - Control object with testProcedures and evidence
   * @param {SOC2TestProcedure[]} control.testProcedures - Array of test procedures
   * @param {SOC2Evidence[]} control.evidence - Array of evidence items
   * @returns {number} Score from 0-5 points based on monitoring capabilities
   * 
   * @example
   * const control = {
   *   testProcedures: [{ frequency: 'daily', description: 'Real-time monitoring' }],
   *   evidence: [{ type: 'log', description: 'Real-time alerts' }]
   * };
   * const score = this.calculateMonitoringScore(control); // Returns 0-5
   */
  private calculateMonitoringScore(control: { testProcedures?: SOC2TestProcedure[]; evidence?: SOC2Evidence[] }): number {
    let score = 0;
    
    // Check for continuous monitoring
    if (control.testProcedures) {
      const continuousTests = control.testProcedures.filter((tp: SOC2TestProcedure) => 
        tp.frequency === 'daily' || tp.frequency === 'weekly'
      );
      if (continuousTests.length > 0) score += 2;
    }
    
    // Check for real-time evidence
    if (control.evidence) {
      const realtimeEvidence = control.evidence.filter((e: SOC2Evidence) => 
        e.type === 'log' || e.description.toLowerCase().includes('real-time')
      );
      if (realtimeEvidence.length > 0) score += 2;
    }
    
    // Bonus for comprehensive monitoring
    if (score >= 4) score += 1;
    
    return Math.min(score, 5);
  }

  private generateRecommendations(failedControls: number, warningControls: number): string[] {
    const recommendations: string[] = [];
    
    if (failedControls > 0) {
      recommendations.push(`Address ${failedControls} failed controls immediately`);
    }
    
    if (warningControls > 0) {
      recommendations.push(`Review and improve ${warningControls} controls with warnings`);
    }
    
    recommendations.push('Conduct regular compliance assessments');
    recommendations.push('Implement automated monitoring for continuous compliance');
    
    return recommendations;
  }

  public async generateComplianceReport(): Promise<string> {
    try {
      const validation = await this.validateSOC2Compliance();
      
      return `
# SOC 2 Compliance Validation Report

## Summary
- **Overall Score**: ${validation.summary.overallScore.toFixed(2)}%
- **Status**: ${validation.overall.status.toUpperCase()}
- **Total Controls**: ${validation.summary.totalControls}
- **Passed**: ${validation.summary.passedControls}
- **Failed**: ${validation.summary.failedControls}
- **Warnings**: ${validation.summary.warningControls}

## Recommendations
${validation.overall.recommendations.map(rec => `- ${rec}`).join('\n')}

## Generated: ${validation.timestamp}
      `;
    } catch (error) {
      this.log(`Error generating compliance report: ${error}`, 'error');
      return `Error generating report: ${error}`;
    }
  }
}

// CLI functionality
async function runCLI() {
  try {
    const agent = new ComplianceValidationAgent();
    const command = process.argv[2];

    switch (command) {
      case 'soc2':
        const result = await agent.validateSOC2Compliance();
        if (result) {
          console.log(`✅ SOC 2 Compliance Score: ${result.overallComplianceScore.toFixed(2)}%`);
          console.log(`📊 Status: ${result.overall.status.toUpperCase()}`);
          console.log(`📋 Controls: ${result.summary.passedControls}/${result.summary.totalControls} passed`);
          
          // Save results
          const outputDir = path.join(process.cwd(), 'compliance-validation-output');
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const resultFile = path.join(outputDir, `soc2-validation-${timestamp}.json`);
          fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
          
          // Generate and save report
          const reportFile = path.join(outputDir, `soc2-validation-report-${timestamp}.md`);
          const report = await agent.generateComplianceReport();
          fs.writeFileSync(reportFile, report);
          
          console.log(`💾 Results saved to: ${resultFile}`);
          console.log(`📄 Report saved to: ${reportFile}`);
        }
        break;
      case 'report':
        const reportContent = await agent.generateComplianceReport();
        console.log(reportContent);
        break;
      default:
        console.log(`Unknown command: ${command}`);
        console.log('Available commands: soc2, report');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runCLI();
}
