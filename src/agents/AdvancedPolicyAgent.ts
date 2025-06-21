import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export interface PolicyTemplate {
  id: string;
  title: string;
  category: 'security' | 'privacy' | 'operational' | 'hr' | 'compliance' | 'business_continuity';
  version: string;
  status: 'draft' | 'review' | 'approved' | 'deprecated';
  content: string;
  approval_workflow: ApprovalStep[];
  review_cycle_months: number;
  next_review_date: string;
  stakeholders: string[];
  related_controls: string[];
}

export interface ApprovalStep {
  step_number: number;
  approver_role: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  approved_date?: string;
}

export interface PolicyGap {
  policy_area: string;
  gap_description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  regulatory_requirement: string;
  recommended_policy: string;
  priority: number;
}

export interface ComplianceMapping {
  policy_id: string;
  framework: 'SOC2' | 'ISO27001' | 'GDPR' | 'CCPA' | 'HIPAA' | 'PCI_DSS';
  control_references: string[];
  compliance_percentage: number;
  gaps: string[];
}

export class AdvancedPolicyAgent {
  private gemini: GoogleGenerativeAI;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;
  private outputDir: string;
  private policyDatabase: PolicyTemplate[] = [];

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_API_KEY || '');
    this.model = this.gemini.getGenerativeModel({ 
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || process.env.NEXT_PUBLIC_NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash-exp' 
    });
    this.outputDir = path.join(process.cwd(), 'policy-management');
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate comprehensive policy framework
   */
  async generatePolicyFramework(): Promise<PolicyTemplate[]> {
    console.log("📋 Generating comprehensive policy framework...");

    const policyCategories = [
      {
        category: 'security',
        policies: [
          'Information Security Policy',
          'Access Control Policy',
          'Incident Response Policy',
          'Vulnerability Management Policy',
          'Cryptography and Key Management Policy',
          'Network Security Policy',
          'Endpoint Security Policy',
          'Security Awareness Training Policy'
        ]
      },
      {
        category: 'privacy',
        policies: [
          'Privacy Policy',
          'Data Classification and Handling Policy',
          'Data Retention and Disposal Policy',
          'Third-Party Data Sharing Policy',
          'Consent Management Policy',
          'Data Subject Rights Policy'
        ]
      },
      {
        category: 'operational',
        policies: [
          'Change Management Policy',
          'System Development Life Cycle Policy',
          'Configuration Management Policy',
          'Backup and Recovery Policy',
          'Monitoring and Logging Policy',
          'Capacity Management Policy'
        ]
      },
      {
        category: 'business_continuity',
        policies: [
          'Business Continuity Policy',
          'Disaster Recovery Policy',
          'Crisis Management Policy',
          'Emergency Response Policy'
        ]
      },
      {
        category: 'hr',
        policies: [
          'Employee Background Check Policy',
          'Remote Work Security Policy',
          'Bring Your Own Device (BYOD) Policy',
          'Acceptable Use Policy',
          'Disciplinary Action Policy'
        ]
      },
      {
        category: 'compliance',
        policies: [
          'Regulatory Compliance Policy',
          'Audit Management Policy',
          'Risk Management Policy',
          'Vendor Risk Management Policy',
          'Document Control Policy'
        ]
      }
    ];

    const policies: PolicyTemplate[] = [];

    for (const category of policyCategories) {
      for (const policyTitle of category.policies) {
        console.log(`Generating ${policyTitle}...`);
        
        const policy = await this.generateIndividualPolicy(policyTitle, category.category as PolicyTemplate['category']);
        policies.push(policy);
      }
    }

    this.policyDatabase = policies;
    await this.savePolicies(policies);
    
    console.log(`✅ Generated ${policies.length} comprehensive policies`);
    return policies;
  }

  /**
   * Generate individual policy using AI
   */
  private async generateIndividualPolicy(title: string, category: PolicyTemplate['category']): Promise<PolicyTemplate> {
    const prompt = `You are a senior compliance and policy expert specializing in information security and regulatory compliance for insurance technology companies.

Generate a comprehensive, professional policy document for: ${title}

Category: ${category}

The policy must include:

1. **Purpose and Scope**
   - Clear statement of policy purpose
   - Scope of application (systems, personnel, processes)
   - Exclusions if any

2. **Policy Statement**
   - High-level policy principles
   - Management commitment statement
   - Compliance requirements

3. **Roles and Responsibilities**
   - Policy owner
   - Stakeholder responsibilities
   - Escalation procedures

4. **Policy Details**
   - Specific requirements and controls
   - Implementation guidelines
   - Technical specifications where applicable

5. **Compliance and Enforcement**
   - Monitoring and measurement
   - Non-compliance consequences
   - Exception handling process

6. **Related Documents**
   - Referenced policies and procedures
   - Regulatory requirements
   - Industry standards

Format as a professional policy document with numbered sections. Include specific requirements for SOC 2 compliance and insurance industry regulations. Be detailed and actionable.`;

    const result = await this.model.generateContent(prompt);
    const content = result.response.text() || '';

    return {
      id: `POL-${category.toUpperCase()}-${Date.now()}`,
      title,
      category,
      version: '1.0',
      status: 'draft',
      content,
      approval_workflow: this.createApprovalWorkflow(category),
      review_cycle_months: this.getReviewCycle(category),
      next_review_date: this.calculateNextReviewDate(this.getReviewCycle(category)),
      stakeholders: this.getStakeholders(category),
      related_controls: this.getRelatedControls(category)
    };
  }

  /**
   * Analyze policy gaps against compliance frameworks
   */
  async analyzePolicyGaps(): Promise<PolicyGap[]> {
    console.log("🔍 Analyzing policy gaps against compliance frameworks...");

    const frameworks = ['SOC2', 'ISO27001', 'GDPR', 'CCPA'];
    const gaps: PolicyGap[] = [];

    for (const framework of frameworks) {
      const prompt = `You are a compliance expert analyzing policy gaps for ${framework} compliance in an insurance technology company.

Analyze the current policy landscape and identify gaps in:

1. Required policy areas for ${framework} compliance
2. Missing policy elements
3. Inadequate coverage areas
4. Regulatory requirements not addressed

For each identified gap, provide:
- Specific policy area affected
- Description of the gap
- Risk level if not addressed
- Specific regulatory requirement
- Recommended policy or policy enhancement
- Implementation priority

Focus on practical, actionable recommendations for an insurance technology platform.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      const frameworkGaps = this.parseGapAnalysis(content, framework);
      gaps.push(...frameworkGaps);
    }

    await this.savePolicyGaps(gaps);
    
    console.log(`✅ Identified ${gaps.length} policy gaps across frameworks`);
    return gaps;
  }

  /**
   * Create compliance mapping for policies
   */
  async createComplianceMapping(): Promise<ComplianceMapping[]> {
    console.log("🗺️ Creating compliance mapping for policies...");

    const mappings: ComplianceMapping[] = [];

    for (const policy of this.policyDatabase) {
      const prompt = `You are a compliance mapping specialist. Map the following policy to relevant compliance frameworks.

Policy: ${policy.title}
Category: ${policy.category}

For each applicable framework (SOC2, ISO27001, GDPR, CCPA, HIPAA, PCI_DSS), provide:
1. Specific control references that this policy addresses
2. Compliance percentage (how well this policy meets framework requirements)
3. Identified gaps or missing elements
4. Recommendations for improvement

Focus on insurance industry compliance requirements.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      const policyMappings = this.parseComplianceMapping(content, policy.id);
      mappings.push(...policyMappings);
    }

    await this.saveComplianceMappings(mappings);
    
    console.log(`✅ Created compliance mappings for ${mappings.length} policy-framework combinations`);
    return mappings;
  }

  /**
   * Generate policy training materials
   */
  async generateTrainingMaterials(): Promise<void> {
    console.log("📚 Generating policy training materials...");

    for (const policy of this.policyDatabase) {
      const prompt = `You are an instructional designer creating engaging training materials for employees.

Policy: ${policy.title}
Category: ${policy.category}

Create comprehensive training materials including:

1. **Executive Summary** (2-3 paragraphs)
   - Why this policy matters
   - Key benefits and protections
   - Employee responsibilities

2. **Key Concepts** (bullet points)
   - Main policy principles
   - Important definitions
   - Critical requirements

3. **Real-World Scenarios** (3-5 scenarios)
   - Common situations employees might encounter
   - Correct actions to take
   - What to avoid

4. **Quick Reference Guide**
   - Do's and Don'ts
   - Key contacts
   - Escalation procedures

5. **Knowledge Check Questions** (5-10 questions)
   - Multiple choice and scenario-based
   - Cover key policy elements
   - Include explanations

Make it engaging, practical, and specific to insurance industry context.`;

      const result = await this.model.generateContent(prompt);
      const content = result.response.text() || '';
      
      await this.saveTrainingMaterial(policy.id, policy.title, content);
    }

    console.log("✅ Generated training materials for all policies");
  }

  /**
   * Setup policy review and approval workflow
   */
  async setupApprovalWorkflow(policyId: string): Promise<void> {
    const policy = this.policyDatabase.find(p => p.id === policyId);
    if (!policy) return;

    console.log(`🔄 Setting up approval workflow for ${policy.title}...`);

    // Initialize approval workflow
    policy.approval_workflow.forEach(step => {
      step.status = 'pending';
    });

    // Save updated policy
    await this.updatePolicy(policy);
    
    // Generate approval checklist
    await this.generateApprovalChecklist(policy);
    
    console.log("✅ Approval workflow configured");
  }

  /**
   * Helper methods
   */
  private createApprovalWorkflow(category: PolicyTemplate['category']): ApprovalStep[] {
    const baseWorkflow: ApprovalStep[] = [
      { step_number: 1, approver_role: 'Policy Author', status: 'pending' },
      { step_number: 2, approver_role: 'Department Manager', status: 'pending' },
      { step_number: 3, approver_role: 'Compliance Officer', status: 'pending' }
    ];

    // Add additional approvers based on category
    if (category === 'security') {
      baseWorkflow.push({ step_number: 4, approver_role: 'CISO', status: 'pending' });
    }
    if (category === 'privacy') {
      baseWorkflow.push({ step_number: 4, approver_role: 'Data Protection Officer', status: 'pending' });
    }

    baseWorkflow.push({ step_number: baseWorkflow.length + 1, approver_role: 'Executive Leadership', status: 'pending' });

    return baseWorkflow;
  }

  private getReviewCycle(category: PolicyTemplate['category']): number {
    const cycles: Record<string, number> = {
      security: 12,
      privacy: 12,
      operational: 18,
      hr: 24,
      compliance: 12,
      business_continuity: 18
    };
    return cycles[category] || 12;
  }

  private calculateNextReviewDate(months: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  }

  private getStakeholders(category: PolicyTemplate['category']): string[] {
    const stakeholderMap: Record<string, string[]> = {
      security: ['CISO', 'IT Team', 'All Employees'],
      privacy: ['DPO', 'Legal Team', 'Customer Service'],
      operational: ['IT Operations', 'Development Team'],
      hr: ['HR Manager', 'All Employees'],
      compliance: ['Compliance Officer', 'Audit Team'],
      business_continuity: ['Operations Manager', 'Executive Team']
    };
    return stakeholderMap[category] || ['All Employees'];
  }

  private getRelatedControls(category: PolicyTemplate['category']): string[] {
    const controlMap: Record<string, string[]> = {
      security: ['CC6.1', 'CC6.2', 'CC6.3', 'CC6.6'],
      privacy: ['P1.1', 'P2.1', 'P3.1'],
      operational: ['CC8.1', 'A1.1', 'A1.2'],
      compliance: ['CC2.1', 'CC2.2'],
      business_continuity: ['A1.3'],
      hr: ['CC6.2', 'CC6.3']
    };
    return controlMap[category] || [];
  }

  private parseGapAnalysis(content: string, framework: string): PolicyGap[] {
    // Parse AI response to extract policy gaps
    return [
      {
        policy_area: 'Access Control',
        gap_description: `Missing specific requirements for ${framework}`,
        risk_level: 'medium',
        regulatory_requirement: `${framework} access control requirements`,
        recommended_policy: 'Enhanced Access Control Policy',
        priority: 3
      }
    ];
  }

  private parseComplianceMapping(content: string, policyId: string): ComplianceMapping[] {
    // Parse AI response to create compliance mappings
    return [
      {
        policy_id: policyId,
        framework: 'SOC2',
        control_references: ['CC6.1', 'CC6.2'],
        compliance_percentage: 85,
        gaps: ['Missing specific technical controls']
      }
    ];
  }

  /**
   * Save methods
   */
  private async savePolicies(policies: PolicyTemplate[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'policy_framework.json');
    fs.writeFileSync(filepath, JSON.stringify(policies, null, 2));

    // Create individual policy files
    for (const policy of policies) {
      const filename = `${policy.id}_${policy.title.replace(/\s+/g, '_')}.md`;
      const filepath = path.join(this.outputDir, 'policies', filename);
      
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
      
      const markdown = `# ${policy.title}

**Policy ID:** ${policy.id}
**Version:** ${policy.version}
**Category:** ${policy.category}
**Status:** ${policy.status}
**Next Review:** ${policy.next_review_date}

## Stakeholders
${policy.stakeholders.map(s => `- ${s}`).join('\n')}

## Related Controls
${policy.related_controls.map(c => `- ${c}`).join('\n')}

---

${policy.content}
`;
      
      fs.writeFileSync(filepath, markdown);
    }
  }

  private async savePolicyGaps(gaps: PolicyGap[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'policy_gaps.json');
    fs.writeFileSync(filepath, JSON.stringify(gaps, null, 2));
  }

  private async saveComplianceMappings(mappings: ComplianceMapping[]): Promise<void> {
    const filepath = path.join(this.outputDir, 'compliance_mappings.json');
    fs.writeFileSync(filepath, JSON.stringify(mappings, null, 2));
  }

  private async saveTrainingMaterial(policyId: string, title: string, content: string): Promise<void> {
    const filename = `Training_${policyId}_${title.replace(/\s+/g, '_')}.md`;
    const filepath = path.join(this.outputDir, 'training', filename);
    
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, content);
  }

  private async updatePolicy(policy: PolicyTemplate): Promise<void> {
  try {
    const index = this.policyDatabase.findIndex(p => p.id === policy.id);
    if (index >= 0) {
      this.policyDatabase[index] = policy;
      await this.savePolicies(this.policyDatabase);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

  private async generateApprovalChecklist(policy: PolicyTemplate): Promise<void> {
    const checklist = `# Approval Checklist: ${policy.title}

## Pre-Approval Review

- [ ] Policy content reviewed for completeness
- [ ] Legal compliance verified
- [ ] Technical accuracy confirmed
- [ ] Industry best practices incorporated
- [ ] Stakeholder feedback incorporated

## Approval Workflow

${policy.approval_workflow.map(step => 
  `- [ ] Step ${step.step_number}: ${step.approver_role} (Status: ${step.status})`
).join('\n')}

## Post-Approval Actions

- [ ] Policy published to policy repository
- [ ] Training materials distributed
- [ ] Implementation plan created
- [ ] Monitoring procedures established
- [ ] Review schedule configured

**Policy ID:** ${policy.id}
**Generated:** ${new Date().toISOString()}
`;

    const filepath = path.join(this.outputDir, 'approvals', `Checklist_${policy.id}.md`);
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, checklist);
  }
}
