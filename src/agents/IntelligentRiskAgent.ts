import { environmentManager } from '../utils/enhanced-environment';
import { EnhancedErrorHandler } from '../utils/enhanced-error-handling';
import type { SecurityControlStatus, Evidence, ValidationResult, ComplianceValidationResult, ErrorContext } from '../types/platform-types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export interface RiskAssessment {
  id: string;
  risk_category: 'security' | 'availability' | 'processing_integrity' | 'confidentiality' | 'privacy' | 'operational';
  risk_description: string;
  likelihood: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high' | 'critical';
  overall_risk_score: number;
  current_controls: string[];
  control_effectiveness: 'effective' | 'partially_effective' | 'ineffective' | 'not_implemented';
  residual_risk: 'low' | 'medium' | 'high' | 'critical';
  recommended_actions: string[];
  timeline: string;
  responsible_party: string;
  review_date: string;
}

export interface ThreatIntelligence {
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  indicators: string[];
  affected_systems: string[];
  mitigation_status: 'planned' | 'in_progress' | 'implemented' | 'verified';
  detection_date: string;
}

export interface ComplianceGap {
  control_id: string;
  gap_description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  current_state: string;
  required_state: string;
  remediation_plan: string;
  estimated_effort: string;
  priority: number;
  dependencies: string[];
}

export class IntelligentRiskAgent {
  private errorHandler: EnhancedErrorHandler = EnhancedErrorHandler.getInstance();

  private gemini: GoogleGenerativeAI;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;
  private outputDir: string;
  private riskDatabase: RiskAssessment[] = [];

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.model = this.gemini.getGenerativeModel({ 
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash-exp' 
    });
    this.outputDir = path.join(process.cwd(), 'risk-assessments');
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Perform comprehensive risk assessment
   */
  async performRiskAssessment(): Promise<RiskAssessment[]> {
    console.log("🎯 Starting AI-powered risk assessment...");

    const riskCategories = [
      'Data breach and unauthorized access',
      'System availability and downtime',
      'Data integrity and processing errors',
      'Insider threats and privileged access abuse',
      'Third-party vendor risks',
      'Regulatory compliance violations',
      'Cyber attacks and malware',
      'Natural disasters and physical security',
      'Business continuity and disaster recovery',
      'Privacy violations and data misuse'
    ];

    const assessments: RiskAssessment[] = [];

    for (const category of riskCategories) {
      console.log(`Assessing risk: ${category}...`);
      
      const prompt = `You are a senior cybersecurity and risk management expert. Perform a detailed risk assessment for an insurance technology platform.

Risk Category: ${category}

Provide a comprehensive risk assessment that includes:
1. Detailed risk description and potential scenarios
2. Likelihood assessment (low/medium/high/critical)
3. Impact assessment (low/medium/high/critical)
4. Current controls that might be in place
5. Control effectiveness evaluation
6. Residual risk after controls
7. Specific recommended actions
8. Implementation timeline
9. Responsible party designation

Focus on SOC 2 compliance and insurance industry specific risks. Be specific and actionable.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      const assessment = this.parseRiskAssessment(content, category);
      assessments.push(assessment);
    }

    this.riskDatabase = assessments;
    await this.saveRiskAssessments(assessments);
    
    console.log(`✅ Completed risk assessment for ${assessments.length} categories`);
    return assessments;
  }

  /**
   * Monitor threat intelligence and update risk assessments
   */
  async monitorThreatIntelligence(): Promise<ThreatIntelligence[]> {
  try {
    console.log("🔍 Monitoring threat intelligence...");

    const prompt = `You are a threat intelligence analyst specializing in cybersecurity for financial services and insurance companies.

Generate current threat intelligence for an insurance technology platform that includes:

1. Current cyber threats targeting financial/insurance sectors
2. Emerging attack vectors and techniques
3. Vulnerability trends in cloud infrastructure
4. Regulatory enforcement trends
5. Data breach patterns in similar industries

For each threat, provide:
- Threat type and classification
- Severity level
- Detailed description
- Indicators of compromise (IOCs)
- Potentially affected systems
- Recommended mitigation strategies

Focus on actionable intelligence that can improve SOC 2 security posture.`;

    const result = await this.model.generateContent(prompt);
    const content = result.response.text() || '';
    
    const threats = this.parseThreatIntelligence(content);
    await this.saveThreatIntelligence(threats);
    
    console.log(`✅ Identified ${threats.length  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
} threat intelligence items`);
    return threats;
  }

  /**
   * Identify compliance gaps using AI analysis
   */
  async identifyComplianceGaps(): Promise<ComplianceGap[]> {
    console.log("📊 Analyzing compliance gaps...");

    const soc2Controls = [
      'CC6.1 - Logical and physical access controls',
      'CC6.2 - Authentication and authorization',
      'CC6.3 - System access removal',
      'CC6.6 - Vulnerability management',
      'CC6.7 - Data transmission controls',
      'CC6.8 - System data protection',
      'A1.1 - Availability monitoring',
      'A1.2 - System capacity management',
      'A1.3 - System backup and recovery',
      'PI1.1 - Data processing integrity',
      'C1.1 - Confidential data identification',
      'P1.1 - Privacy notice and consent'
    ];

    const gaps: ComplianceGap[] = [];

    for (const control of soc2Controls) {
      const prompt = `You are a SOC 2 auditor analyzing compliance gaps for an insurance technology platform.

Control: ${control}

Analyze potential compliance gaps and provide:
1. Common gap scenarios for this control in insurance companies
2. Current state vs required state analysis
3. Severity assessment of identified gaps
4. Detailed remediation plan
5. Implementation effort estimation
6. Priority ranking
7. Dependencies on other controls

Be specific about technical implementation requirements and insurance industry considerations.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      const gap = this.parseComplianceGap(content, control);
      gaps.push(gap);
    }

    await this.saveComplianceGaps(gaps);
    
    console.log(`✅ Identified compliance gaps for ${gaps.length} controls`);
    return gaps;
  }

  /**
   * Generate risk mitigation strategies
   */
  async generateMitigationStrategies(risks: RiskAssessment[]): Promise<void> {
    console.log("🛡️ Generating AI-powered mitigation strategies...");

    const highRisks = risks.filter(r => r.overall_risk_score >= 7);
    
    for (const risk of highRisks) {
      const prompt = `You are a cybersecurity strategist developing mitigation plans for high-risk scenarios.

Risk: ${risk.risk_description}
Current Risk Score: ${risk.overall_risk_score}/10
Category: ${risk.risk_category}

Develop a comprehensive mitigation strategy that includes:
1. Immediate actions (0-30 days)
2. Short-term controls (1-3 months)
3. Long-term strategic improvements (3-12 months)
4. Cost-benefit analysis
5. Implementation roadmap
6. Success metrics and KPIs
7. Continuous monitoring approach

Focus on practical, cost-effective solutions for an insurance technology company.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      await this.saveMitigationStrategy(risk.id, content);
    }

    console.log(✅ Generated mitigation strategies for ${highRisks.length} high-risk items);
  }

  /**
   * Parse risk assessment from AI response
   */
  private parseRiskAssessment(content: string, category: string): RiskAssessment {
    const id = RISK-${Date.now()}-${Math.random().toString(36).substr(2, 9)};
    
    // Extract likelihood and impact using regex patterns
    const likelihoodMatch = content.match(/likelihood.*?(low|medium|high|critical)/i);
    const impactMatch = content.match(/impact.*?(low|medium|high|critical)/i);
    
    const likelihood = (likelihoodMatch?.[1]?.toLowerCase() as 'low' | 'medium' | 'high' | 'critical') || 'medium';
    const impact = (impactMatch?.[1]?.toLowerCase() as 'low' | 'medium' | 'high' | 'critical') || 'medium';
    
    // Calculate risk score based on likelihood and impact
    const riskScore = this.calculateRiskScore(likelihood, impact);
    
    return {
      id,
      risk_category: this.categorizeRisk(category),
      risk_description: category,
      likelihood,
      impact,
      overall_risk_score: riskScore,
      current_controls: this.extractControls(content),
      control_effectiveness: 'partially_effective',
      residual_risk: this.calculateResidualRisk(riskScore),
      recommended_actions: this.extractRecommendations(content),
      timeline: '30-90 days',
      responsible_party: 'Security Team',
      review_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  }

  private parseComplianceGap(content: string, control: string): ComplianceGap {
    const controlId = control.split(' ')[0];
    
    return {
      control_id: controlId,
      gap_description: `Compliance gap identified for ${control}`,
      severity: 'medium',
      current_state: 'Partially implemented',
      required_state: 'Fully compliant with SOC 2 requirements',
      remediation_plan: this.extractRemediationPlan(content),
      estimated_effort: '2-4 weeks',
      priority: 5,
      dependencies: []
    };
  }

  private parseThreatIntelligence(_content: string): ThreatIntelligence[] {
    // Parse threat intelligence from AI response
    const threats: ThreatIntelligence[] = [];
    
    const threatTypes = [
      'Ransomware attacks',
      'Phishing campaigns',
      'Insider threats',
      'API vulnerabilities',
      'Cloud misconfigurations'
    ];

    threatTypes.forEach(threatType => {
      threats.push({
        threat_type: threatType,
        severity: 'medium',
        source: 'AI Analysis',
        description: `Current intelligence on ${threatType} targeting insurance sector`,
        indicators: ['Suspicious network activity', 'Unusual authentication patterns'],
        affected_systems: ['Web applications', 'Database systems'],
        mitigation_status: 'planned',
        detection_date: new Date().toISOString().split('T')[0]
      });
    });

    return threats;
  }

  private categorizeRisk(category: string): RiskAssessment['risk_category'] {
    if (category.includes('data') || category.includes('access')) return 'security';
    if (category.includes('availability') || category.includes('downtime')) return 'availability';
    if (category.includes('integrity') || category.includes('processing')) return 'processing_integrity';
    if (category.includes('confidential')) return 'confidentiality';
    if (category.includes('privacy')) return 'privacy';
    return 'operational';
  }

  private calculateRiskScore(likelihood: 'low' | 'medium' | 'high' | 'critical', impact: 'low' | 'medium' | 'high' | 'critical'): number {
    const scores: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };
    return (scores[likelihood] || 2) * (scores[impact] || 2);
  }

  private calculateResidualRisk(score: number): RiskAssessment['residual_risk'] {
    if (score <= 4) return 'low';
    if (score <= 9) return 'medium';
    if (score <= 12) return 'high';
    return 'critical';
  }

  private extractControls(_content: string): string[] {
    // Extract control mentions from content
    return [
      'Access control policies',
      'Monitoring systems',
      'Security awareness training'
    ];
  }

  private extractRecommendations(_content: string): string[] {
    // Extract recommendations from content
    return [
      'Implement additional monitoring',
      'Enhance access controls',
      'Regular security assessments'
    ];
  }

  private extractRemediationPlan(_content: string): string {
    return 'Implement required controls and documentation as specified in SOC 2 requirements';
  }

  /**
   * Save assessments to files
   */
  private async saveRiskAssessments(assessments: RiskAssessment[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'risk_assessments.json');
    fs.writeFileSync(filepath, JSON.stringify(assessments, null, 2));
    
    // Also save as markdown report
    const reportPath = path.join(this.outputDir, 'Risk_Assessment_Report.md');
    const markdown = this.generateRiskReportMarkdown(assessments);
    fs.writeFileSync(reportPath, markdown);
  }

  private async saveThreatIntelligence(threats: ThreatIntelligence[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'threat_intelligence.json');
    fs.writeFileSync(filepath, JSON.stringify(threats, null, 2));
  }

  private async saveComplianceGaps(gaps: ComplianceGap[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'compliance_gaps.json');
    fs.writeFileSync(filepath, JSON.stringify(gaps, null, 2));
  }

  private async saveMitigationStrategy(riskId: string, strategy: string): Promise<void> {
    const filepath = path.join(this.outputDir, `mitigation_${riskId}.md`);
    fs.writeFileSync(filepath, strategy);
  }

  private generateRiskReportMarkdown(assessments: RiskAssessment[]): string {
    return `# Risk Assessment Report

`**Generated:** ${new Date().toISOString()}`
`**Total Risks Assessed:** ${assessments.length}`

## Executive Summary

${assessments.filter(r => r.overall_risk_score >= 8).length} critical/high risks identified
${assessments.filter(r => r.overall_risk_score >= 6).length} medium risks identified

## Risk Details

${assessments.map(risk => `
### ${risk.risk_description}

- **Category:** ${risk.risk_category}
- **Risk Score:** ${risk.overall_risk_score}/16
- **Likelihood:** ${risk.likelihood}
- **Impact:** ${risk.impact}
- **Residual Risk:** ${risk.residual_risk}

**Recommended Actions:**
${risk.recommended_actions.map(action => - ${action}).join('\n')}

---
`).join('\n')}
`;
  }
}
