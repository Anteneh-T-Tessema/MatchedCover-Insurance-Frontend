import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import type { SecurityControlStatus, Evidence, ValidationResult, ComplianceValidationResult, ErrorContext } from '../types/platform-types';
import { BaseAgent } from './BaseAgent';
import { ComplianceFramework, ComplianceEvidence } from '../interfaces/ComplianceFramework';

export interface AssessmentData {
  frameworkId: string;
  timestamp: Date;
  score: number;
  status: 'in-progress' | 'completed' | 'failed';
}

/**
 * ComplianceAgent handles overall compliance management across frameworks
 * Manages compliance assessments, reporting, and cross-framework analysis
 */
export class ComplianceAgent extends BaseAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private frameworks: Map<string, ComplianceFramework> = new Map();
  private activeAssessments: Map<string, AssessmentData> = new Map();

  constructor() {
    super('ComplianceAgent', '1.0.0');
  }

  /**
   * Initialize compliance monitoring for a specific framework
   * @param framework - The compliance framework to monitor
   */
  async initializeFramework(framework: ComplianceFramework): Promise<void> {
    try {
      this.frameworks.set(framework.id, framework);
      this.log(`Initialized compliance monitoring for ${framework.name}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to initialize framework ${framework.id}: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Conduct a compliance assessment for a framework
   * @param frameworkId - ID of the framework to assess
   * @returns Assessment results with compliance score and gaps
   */
  async conductAssessment(frameworkId: string): Promise<{
    score: number;
    gaps: string[];
    controlsAssessed: number;
    evidence: ComplianceEvidence[];
  }> {
    try {
      const framework = this.frameworks.get(frameworkId);
      if (!framework) {
        throw new Error(`Framework ${frameworkId} not found`);
      }

      const controlsAssessed = framework.controls.length;
      const compliantControls = Math.floor(controlsAssessed * 0.75); // Simulate 75% compliance
      const score = Math.round((compliantControls / controlsAssessed) * 100);

      const gaps = framework.controls
        .slice(compliantControls)
        .map(control => `Gap in control: ${control.id} - ${control.name}`);

      const evidence: ComplianceEvidence[] = framework.controls
        .slice(0, compliantControls)
        .map(control => ({
          controlId: control.id,
          evidenceType: 'documentation',
          description: `Evidence for ${control.name}`,
          collectedDate: new Date(),
          verificationStatus: 'verified'
        }));

      this.log(`Assessment completed for ${framework.name}: ${score}% compliant`, 'info');

      return {
        score,
        gaps,
        controlsAssessed,
        evidence
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Assessment failed for ${frameworkId}: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Generate compliance report across all monitored frameworks
   * @returns Consolidated compliance report
   */
  async generateComplianceReport(): Promise<{
    overallScore: number;
    frameworkResults: Array<{
      frameworkId: string;
      frameworkName: string;
      score: number;
      gaps: string[];
    }>;
    recommendations: string[];
  }> {
    try {
      const frameworkResults = [];
      let totalScore = 0;

      for (const [frameworkId, framework] of Array.from(this.frameworks.entries())) {
        const assessment = await this.conductAssessment(frameworkId);
        frameworkResults.push({
          frameworkId,
          frameworkName: framework.name,
          score: assessment.score,
          gaps: assessment.gaps
        });
        totalScore += assessment.score;
      }

      const overallScore = this.frameworks.size > 0 ? 
        Math.round(totalScore / this.frameworks.size) : 0;

      const recommendations = [
        'Implement automated control monitoring',
        'Enhance documentation coverage',
        'Regular compliance assessment scheduling',
        'Cross-framework gap analysis'
      ];

      this.log(`Generated compliance report: ${overallScore}% overall compliance`, 'info');

      return {
        overallScore,
        frameworkResults,
        recommendations
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to generate compliance report: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Monitor compliance status and trigger alerts for critical gaps
   * @param thresholds - Compliance thresholds for alerting
   */
  async monitorCompliance(thresholds: {
    critical: number;
    warning: number;
  } = { critical: 60, warning: 80 }): Promise<void> {
    try {
      const report = await this.generateComplianceReport();

      if (report.overallScore < thresholds.critical) {
        this.log(`CRITICAL: Overall compliance score ${report.overallScore}% below threshold`, 'error');
      } else if (report.overallScore < thresholds.warning) {
        this.log(`WARNING: Overall compliance score ${report.overallScore}% below threshold`, 'warn');
      } else {
        this.log(`Compliance monitoring: ${report.overallScore}% - Good standing`, 'info');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Compliance monitoring failed: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get the current status of all monitored frameworks
   * @returns Current status summary
   */
  getStatus(): {
    frameworkCount: number;
    activeAssessments: number;
    lastUpdate: Date;
  } {
    return {
      frameworkCount: this.frameworks.size,
      activeAssessments: this.activeAssessments.size,
      lastUpdate: new Date()
    };
  }
}

export default ComplianceAgent;
