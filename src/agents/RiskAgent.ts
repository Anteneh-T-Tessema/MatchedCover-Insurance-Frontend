import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import type { SecurityControlStatus, Evidence, ValidationResult, ComplianceValidationResult, ErrorContext } from '../types/platform-types';
import { BaseAgent } from './BaseAgent';

/**
 * RiskAgent manages risk assessment and mitigation strategies
 * Handles risk identification, assessment, treatment, and monitoring
 */
export class RiskAgent extends BaseAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private risks: Map<string, RiskItem> = new Map();
  private riskCategories: Map<string, RiskCategory> = new Map();

  constructor() {
    super('RiskAgent', '1.0.0');
    this.initializeDefaultCategories();
  }

  /**
   * Identify and register a new risk
   * @param riskData - Risk identification data
   */
  async identifyRisk(riskData: RiskData): Promise<RiskItem> {
    try {
      const risk: RiskItem = {
        id: `risk_${Date.now()}`,
        title: riskData.title,
        description: riskData.description,
        category: riskData.category,
        likelihood: riskData.likelihood,
        impact: riskData.impact,
        riskScore: this.calculateRiskScore(riskData.likelihood, riskData.impact),
        status: 'identified',
        owner: riskData.owner,
        identifiedDate: new Date(),
        lastAssessed: new Date(),
        complianceFrameworks: riskData.complianceFrameworks || [],
        controls: riskData.controls || [],
        treatmentPlan: null
      };

      this.risks.set(risk.id, risk);
      this.log(`Identified risk: ${risk.title} (Score: ${risk.riskScore})`, 'info');

      return risk;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to identify risk: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Conduct risk assessment
   * @param riskId - Risk identifier
   * @param assessment - Updated assessment data
   */
  async assessRisk(riskId: string, assessment: RiskAssessment): Promise<void> {
    try {
      const risk = this.risks.get(riskId);
      if (!risk) {
        throw new Error(`Risk ${riskId} not found`);
      }

      risk.likelihood = assessment.likelihood;
      risk.impact = assessment.impact;
      risk.riskScore = this.calculateRiskScore(assessment.likelihood, assessment.impact);
      risk.lastAssessed = new Date();
      risk.assessmentNotes = assessment.notes;

      this.log(`Assessed risk ${risk.id}: Score updated to ${risk.riskScore}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to assess risk: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Create risk treatment plan
   * @param riskId - Risk identifier
   * @param treatmentData - Treatment plan data
   */
  async createTreatmentPlan(riskId: string, treatmentData: TreatmentPlanData): Promise<void> {
    try {
      const risk = this.risks.get(riskId);
      if (!risk) {
        throw new Error(`Risk ${riskId} not found`);
      }

      const treatmentPlan: RiskTreatmentPlan = {
        strategy: treatmentData.strategy,
        description: treatmentData.description,
        actions: treatmentData.actions,
        responsible: treatmentData.responsible,
        targetDate: treatmentData.targetDate,
        cost: treatmentData.cost,
        expectedReduction: treatmentData.expectedReduction,
        status: 'planned',
        createdDate: new Date()
      };

      risk.treatmentPlan = treatmentPlan;
      risk.status = 'treatment-planned';

      this.log(`Created treatment plan for risk ${risk.id}: ${treatmentData.strategy}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to create treatment plan: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Generate comprehensive risk register
   */
  async generateRiskRegister(): Promise<RiskRegister> {
    try {
      const allRisks = Array.from(this.risks.values());
      const totalRisks = allRisks.length;

      const risksByCategory = new Map<string, number>();
      const risksByScore = { high: 0, medium: 0, low: 0 };

      allRisks.forEach(risk => {
        // Count by category
        const count = risksByCategory.get(risk.category) || 0;
        risksByCategory.set(risk.category, count + 1);

        // Count by score level
        if (risk.riskScore >= 15) {
          risksByScore.high++;
        } else if (risk.riskScore >= 8) {
          risksByScore.medium++;
        } else {
          risksByScore.low++;
        }
      });

      const topRisks = allRisks
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 10);

      const treatmentPlanned = allRisks.filter(r => r.status === 'treatment-planned').length;
      const treatmentInProgress = allRisks.filter(r => r.status === 'treatment-in-progress').length;
      const mitigated = allRisks.filter(r => r.status === 'mitigated').length;

      const register: RiskRegister = {
        totalRisks,
        risksByCategory: Object.fromEntries(risksByCategory),
        risksByScore,
        topRisks: topRisks.slice(0, 10),
        treatmentStatus: {
          planned: treatmentPlanned,
          inProgress: treatmentInProgress,
          mitigated
        },
        averageRiskScore: totalRisks > 0 ? 
          Math.round(allRisks.reduce((sum, r) => sum + r.riskScore, 0) / totalRisks * 10) / 10 : 0,
        generatedDate: new Date()
      };

      this.log(`Generated risk register: ${totalRisks} total risks, avg score ${register.averageRiskScore}`, 'info');
      return register;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to generate risk register: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get risks by compliance framework
   * @param framework - Compliance framework identifier
   */
  getRisksByFramework(framework: string): RiskItem[] {
    return Array.from(this.risks.values())
      .filter(risk => risk.complianceFrameworks.includes(framework));
  }

  /**
   * Monitor risk treatment progress
   */
  async monitorTreatmentProgress(): Promise<TreatmentProgressReport> {
    try {
      const risksWithTreatment = Array.from(this.risks.values())
        .filter(r => r.treatmentPlan);

      const overdueActions = risksWithTreatment.filter(r => 
        r.treatmentPlan!.targetDate < new Date() && 
        r.treatmentPlan!.status !== 'completed'
      );

      const inProgressActions = risksWithTreatment.filter(r => 
        r.treatmentPlan!.status === 'in-progress');

      const completedActions = risksWithTreatment.filter(r => 
        r.treatmentPlan!.status === 'completed');

      const report: TreatmentProgressReport = {
        totalTreatmentPlans: risksWithTreatment.length,
        overdueActions: overdueActions.length,
        inProgressActions: inProgressActions.length,
        completedActions: completedActions.length,
        completionRate: risksWithTreatment.length > 0 ? 
          Math.round((completedActions.length / risksWithTreatment.length) * 100) : 0,
        generatedDate: new Date()
      };

      this.log(`Treatment progress: ${report.completionRate}% completion rate`, 'info');
      return report;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Failed to monitor treatment progress: ${errorMessage}`, 'error');
      throw error;
    }
  }

  /**
   * Get agent status
   */
  getStatus(): {
    riskCount: number;
    highRisks: number;
    treatmentPlans: number;
    lastActivity: Date;
  } {
    const highRisks = Array.from(this.risks.values())
      .filter(r => r.riskScore >= 15).length;
    
    const treatmentPlans = Array.from(this.risks.values())
      .filter(r => r.treatmentPlan).length;

    return {
      riskCount: this.risks.size,
      highRisks,
      treatmentPlans,
      lastActivity: new Date()
    };
  }

  private calculateRiskScore(likelihood: number, impact: number): number {
    return likelihood * impact;
  }

  private initializeDefaultCategories(): void {
    const defaultCategories: RiskCategory[] = [
      { id: 'cybersecurity', name: 'Cybersecurity', description: 'Information security and cyber threats' },
      { id: 'operational', name: 'Operational', description: 'Business operations and processes' },
      { id: 'compliance', name: 'Compliance', description: 'Regulatory and compliance risks' },
      { id: 'financial', name: 'Financial', description: 'Financial and economic risks' },
      { id: 'reputational', name: 'Reputational', description: 'Brand and reputation risks' }
    ];

    defaultCategories.forEach(category => {
      this.riskCategories.set(category.id, category);
    });
  }
}

// Supporting interfaces
type RiskStatus = 'identified' | 'assessed' | 'treatment-planned' | 'treatment-in-progress' | 'mitigated' | 'accepted';
type TreatmentStrategy = 'mitigate' | 'transfer' | 'avoid' | 'accept';
type TreatmentStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled';

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: number; // 1-5 scale
  impact: number; // 1-5 scale
  riskScore: number; // likelihood * impact
  status: RiskStatus;
  owner: string;
  identifiedDate: Date;
  lastAssessed: Date;
  assessmentNotes?: string;
  complianceFrameworks: string[];
  controls: string[];
  treatmentPlan: RiskTreatmentPlan | null;
}

export interface RiskData {
  title: string;
  description: string;
  category: string;
  likelihood: number;
  impact: number;
  owner: string;
  complianceFrameworks?: string[];
  controls?: string[];
}

export interface RiskAssessment {
  likelihood: number;
  impact: number;
  notes?: string;
}

export interface RiskTreatmentPlan {
  strategy: TreatmentStrategy;
  description: string;
  actions: string[];
  responsible: string;
  targetDate: Date;
  cost: number;
  expectedReduction: number; // Expected risk score reduction
  status: TreatmentStatus;
  createdDate: Date;
}

export interface TreatmentPlanData {
  strategy: TreatmentStrategy;
  description: string;
  actions: string[];
  responsible: string;
  targetDate: Date;
  cost: number;
  expectedReduction: number;
}

export interface RiskCategory {
  id: string;
  name: string;
  description: string;
}

export interface RiskRegister {
  totalRisks: number;
  risksByCategory: Record<string, number>;
  risksByScore: { high: number; medium: number; low: number };
  topRisks: RiskItem[];
  treatmentStatus: {
    planned: number;
    inProgress: number;
    mitigated: number;
  };
  averageRiskScore: number;
  generatedDate: Date;
}

export interface TreatmentProgressReport {
  totalTreatmentPlans: number;
  overdueActions: number;
  inProgressActions: number;
  completedActions: number;
  completionRate: number;
  generatedDate: Date;
}

export default RiskAgent;
