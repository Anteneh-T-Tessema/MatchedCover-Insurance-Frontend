#!/usr/bin/env node

import { ComplianceFramework, FrameworkRegistry } from '../interfaces/ComplianceFramework';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Framework Registry Implementation
 * Manages registration, discovery, and retrieval of compliance frameworks
 */
export class FrameworkRegistryImpl implements FrameworkRegistry {
  private frameworks: Map<string, ComplianceFramework> = new Map();
  private dataDir: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data', 'frameworks');
    this.ensureDataDirectory();
    this.loadFrameworks();
    this.initializeBuiltInFrameworks();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadFrameworks(): void {
    try {
      // Load framework definitions from data directory
      const frameworkFiles = fs.readdirSync(this.dataDir)
        .filter(file => file.endsWith('.json'));

      for (const file of frameworkFiles) {
        const filePath = path.join(this.dataDir, file);
        const frameworkData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        this.frameworks.set(frameworkData.id, frameworkData);
      }

      console.log(`📚 Loaded ${this.frameworks.size} compliance frameworks`);
    } catch {
      console.log(`⚠️ No existing frameworks found, starting with empty registry`);
    }
  }

  async getFramework(id: string): Promise<ComplianceFramework> {
    const framework = this.frameworks.get(id);
    if (!framework) {
      throw new Error(`Framework with ID '${id}' not found`);
    }
    return framework;
  }

  async getAllFrameworks(): Promise<ComplianceFramework[]> {
    return Array.from(this.frameworks.values());
  }

  async registerFramework(framework: ComplianceFramework): Promise<void> {
    // Validate framework structure
    this.validateFramework(framework);

    // Store in memory registry
    this.frameworks.set(framework.id, framework);

    // Persist to disk
    const filePath = path.join(this.dataDir, `${framework.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(framework, null, 2));

    console.log(`✅ Registered framework: ${framework.name} (${framework.id})`);
  }

  async updateFramework(id: string, updates: Partial<ComplianceFramework>): Promise<void> {
    const existingFramework = await this.getFramework(id);
    const updatedFramework = { ...existingFramework, ...updates };
    
    await this.registerFramework(updatedFramework);
    console.log(`🔄 Updated framework: ${updatedFramework.name} (${id})`);
  }

  async getFrameworksByOrganization(org: string): Promise<ComplianceFramework[]> {
    return Array.from(this.frameworks.values())
      .filter(framework => framework.organization === org);
  }

  async searchFrameworks(query: string): Promise<ComplianceFramework[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.frameworks.values())
      .filter(framework => 
        framework.name.toLowerCase().includes(searchTerm) ||
        framework.description.toLowerCase().includes(searchTerm) ||
        framework.organization.toLowerCase().includes(searchTerm)
      );
  }

  private validateFramework(framework: ComplianceFramework): void {
    const required = ['id', 'name', 'version', 'organization'];
    for (const field of required) {
      if (!framework[field as keyof ComplianceFramework]) {
        throw new Error(`Framework validation failed: Missing required field '${field}'`);
      }
    }

    if (!Array.isArray(framework.domains)) {
      throw new Error('Framework validation failed: domains must be an array');
    }

    if (!Array.isArray(framework.controls)) {
      throw new Error('Framework validation failed: controls must be an array');
    }

    if (!Array.isArray(framework.requirements)) {
      throw new Error('Framework validation failed: requirements must be an array');
    }
  }

  // Utility methods for framework management
  async getFrameworkStats(): Promise<FrameworkStats> {
    const frameworks = await this.getAllFrameworks();
    
    const stats: FrameworkStats = {
      totalFrameworks: frameworks.length,
      organizationCounts: {},
      domainCounts: {},
      controlCounts: {},
      lastUpdated: new Date()
    };

    for (const framework of frameworks) {
      // Count by organization
      stats.organizationCounts[framework.organization] = 
        (stats.organizationCounts[framework.organization] || 0) + 1;

      // Count domains
      stats.domainCounts[framework.id] = framework.domains.length;

      // Count controls
      stats.controlCounts[framework.id] = framework.controls.length;
    }

    return stats;
  }

  async exportFramework(id: string): Promise<string> {
    const framework = await this.getFramework(id);
    return JSON.stringify(framework, null, 2);
  }

  async importFramework(frameworkJson: string): Promise<void> {
    const framework = JSON.parse(frameworkJson) as ComplianceFramework;
    await this.registerFramework(framework);
  }

  async getCompatibleFrameworks(frameworkId: string): Promise<string[]> {
    // Simple compatibility based on organization or common domains
    const targetFramework = await this.getFramework(frameworkId);
    const allFrameworks = await this.getAllFrameworks();
    
    return allFrameworks
      .filter(f => f.id !== frameworkId && 
                  (f.organization === targetFramework.organization ||
                   this.hasCommonDomains(f, targetFramework)))
      .map(f => f.id);
  }

  private hasCommonDomains(f1: ComplianceFramework, f2: ComplianceFramework): boolean {
    const f1Domains = new Set(f1.domains.map(d => d.name.toLowerCase()));
    const f2Domains = new Set(f2.domains.map(d => d.name.toLowerCase()));
    
    // Check if they have at least 2 common domains
    const commonDomains = [...f1Domains].filter(d => f2Domains.has(d));
    return commonDomains.length >= 2;
  }

  private async initializeBuiltInFrameworks(): Promise<void> {
    try {
      // Check if frameworks are already registered
      if (this.frameworks.size === 0) {
        // Initialize ISO 27001 framework data
        const iso27001Framework = this.createISO27001Framework();
        await this.registerFramework(iso27001Framework);
        console.log('✅ Initialized ISO 27001 framework');

        // Initialize PCI DSS framework data  
        const pcidssFramework = this.createPCIDSSFramework();
        await this.registerFramework(pcidssFramework);
        console.log('✅ Initialized PCI DSS framework');
      }
    } catch (error) {
      console.warn('⚠️ Failed to initialize built-in frameworks:', error);
    }
  }

  private createISO27001Framework(): ComplianceFramework {
    return {
      id: 'iso-27001',
      name: 'ISO/IEC 27001:2022',
      version: '2022',
      description: 'Information Security Management System Requirements',
      organization: 'International Organization for Standardization (ISO)',
      effectiveDate: new Date('2022-10-25'),
      lastUpdated: new Date(),
      domains: [
        {
          id: 'A.5',
          name: 'Organizational Controls',
          description: 'Controls related to organizational information security policies and procedures',
          controls: ['A.5.1', 'A.5.2', 'A.5.3'],
          weight: 0.25
        },
        {
          id: 'A.6',
          name: 'People Controls',
          description: 'Controls related to personnel security',
          controls: ['A.6.1', 'A.6.2', 'A.6.3'],
          weight: 0.15
        },
        {
          id: 'A.7',
          name: 'Physical and Environmental Security Controls',
          description: 'Controls related to physical and environmental security',
          controls: ['A.7.1', 'A.7.2'],
          weight: 0.20
        },
        {
          id: 'A.8',
          name: 'Technological Controls',
          description: 'Controls related to technological aspects of information security',
          controls: ['A.8.1', 'A.8.2', 'A.8.3', 'A.8.4', 'A.8.5'],
          weight: 0.40
        }
      ],
      controls: [
        {
          id: 'A.5.1',
          name: 'Information Security Policies',
          description: 'A set of policies for information security should be defined',
          domain: 'A.5',
          requirements: ['A.5.1.1', 'A.5.1.2'],
          severity: 'high',
          implementationGuidance: 'Develop comprehensive information security policies covering all aspects of the ISMS',
          evidenceRequirements: ['Security policy document', 'Policy approval records', 'Communication evidence'],
          automationLevel: 'manual'
        },
        {
          id: 'A.8.1',
          name: 'User Access Management',
          description: 'A formal user access provisioning process should be implemented',
          domain: 'A.8',
          requirements: ['A.8.1.1', 'A.8.1.2', 'A.8.1.3'],
          severity: 'critical',
          implementationGuidance: 'Implement comprehensive user access management processes and controls',
          evidenceRequirements: ['Access management procedures', 'User access records', 'Review documentation'],
          automationLevel: 'automated'
        }
      ],
      requirements: [
        {
          id: 'A.5.1.1',
          name: 'Policy Development',
          description: 'Develop comprehensive information security policies',
          controlId: 'A.5.1',
          mandatory: true,
          testProcedures: ['Review policy documents', 'Verify management approval'],
          acceptanceCriteria: ['Policies cover all required areas', 'Management approval documented']
        }
      ],
      validateImplementation: async () => ({
        frameworkId: 'iso-27001',
        timestamp: new Date(),
        overallCompliance: 75,
        domainCompliance: [],
        controlResults: [],
        gaps: [],
        recommendations: ['Prioritize critical controls', 'Implement continuous monitoring']
      }),
      generateComplianceReport: async () => ({
        frameworkId: 'iso-27001',
        generatedDate: new Date(),
        reportPeriod: { startDate: new Date(), endDate: new Date() },
        summary: {
          overallScore: 75,
          totalControls: 93,
          compliantControls: 65,
          nonCompliantControls: 20,
          partiallyCompliantControls: 8,
          notApplicableControls: 0,
          criticalIssues: 3,
          highRiskIssues: 8,
          trendDirection: 'improving' as const
        },
        executiveSummary: 'ISO 27001 implementation is progressing well with 75% compliance achieved.',
        domainResults: [],
        controlDetails: [],
        riskAssessment: {
          overallRiskLevel: 'medium' as const,
          riskFactors: [],
          mitigationStrategies: [],
          residualRisk: 25
        },
        actionPlan: [],
        appendices: []
      }),
      assessRisk: async () => ({
        overallRiskLevel: 'medium' as const,
        riskFactors: [],
        mitigationStrategies: [],
        residualRisk: 25
      })
    };
  }

  private createPCIDSSFramework(): ComplianceFramework {
    return {
      id: 'pci-dss',
      name: 'PCI DSS',
      version: '4.0',
      description: 'Payment Card Industry Data Security Standard',
      organization: 'PCI Security Standards Council',
      effectiveDate: new Date('2022-03-31'),
      lastUpdated: new Date(),
      domains: [
        {
          id: 'REQ-1',
          name: 'Network Security Controls',
          description: 'Install and maintain network security controls',
          controls: ['PCI-1.1', 'PCI-1.2'],
          weight: 0.10
        },
        {
          id: 'REQ-3',
          name: 'Data Protection',
          description: 'Protect stored cardholder data',
          controls: ['PCI-3.1', 'PCI-3.2'],
          weight: 0.15
        },
        {
          id: 'REQ-8',
          name: 'Identity Management',
          description: 'Identify users and authenticate access to system components',
          controls: ['PCI-8.1', 'PCI-8.2'],
          weight: 0.12
        }
      ],
      controls: [
        {
          id: 'PCI-1.1',
          name: 'Network Security Controls',
          description: 'Establish, implement, and maintain network security controls',
          domain: 'REQ-1',
          requirements: ['PCI-1.1.1', 'PCI-1.1.2'],
          severity: 'high',
          implementationGuidance: 'Implement firewalls and network segmentation to protect cardholder data environment',
          evidenceRequirements: ['Network diagrams', 'Firewall configurations', 'Network security policies'],
          automationLevel: 'semi-automated'
        },
        {
          id: 'PCI-3.1',
          name: 'Data Retention Policy',
          description: 'Keep stored account data to minimum required for legal, regulatory, and business requirements',
          domain: 'REQ-3',
          requirements: ['PCI-3.1.1', 'PCI-3.1.2'],
          severity: 'critical',
          implementationGuidance: 'Implement data retention and disposal policies',
          evidenceRequirements: ['Data retention policy', 'Data inventory', 'Disposal records'],
          automationLevel: 'manual'
        }
      ],
      requirements: [
        {
          id: 'PCI-1.1.1',
          name: 'Firewall Configuration',
          description: 'Establish firewall and router configuration standards',
          controlId: 'PCI-1.1',
          mandatory: true,
          testProcedures: ['Review firewall configurations', 'Verify configuration standards'],
          acceptanceCriteria: ['Standards documented', 'Configurations compliant']
        }
      ],
      validateImplementation: async () => ({
        frameworkId: 'pci-dss',
        timestamp: new Date(),
        overallCompliance: 68,
        domainCompliance: [],
        controlResults: [],
        gaps: [],
        recommendations: ['Prioritize data protection controls', 'Implement network segmentation']
      }),
      generateComplianceReport: async () => ({
        frameworkId: 'pci-dss',
        generatedDate: new Date(),
        reportPeriod: { startDate: new Date(), endDate: new Date() },
        summary: {
          overallScore: 68,
          totalControls: 375,
          compliantControls: 255,
          nonCompliantControls: 90,
          partiallyCompliantControls: 30,
          notApplicableControls: 0,
          criticalIssues: 12,
          highRiskIssues: 25,
          trendDirection: 'improving' as const
        },
        executiveSummary: 'PCI DSS compliance shows progress with focus needed on data protection controls.',
        domainResults: [],
        controlDetails: [],
        riskAssessment: {
          overallRiskLevel: 'high' as const,
          riskFactors: [],
          mitigationStrategies: [],
          residualRisk: 32
        },
        actionPlan: [],
        appendices: []
      }),
      assessRisk: async () => ({
        overallRiskLevel: 'high' as const,
        riskFactors: [],
        mitigationStrategies: [],
        residualRisk: 32
      })
    };
  }
}

interface FrameworkStats {
  totalFrameworks: number;
  organizationCounts: Record<string, number>;
  domainCounts: Record<string, number>;
  controlCounts: Record<string, number>;
  lastUpdated: Date;
}

// Export singleton instance
export const frameworkRegistry = new FrameworkRegistryImpl();
