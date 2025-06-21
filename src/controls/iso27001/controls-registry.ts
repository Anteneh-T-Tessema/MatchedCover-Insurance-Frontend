import { FrameworkControl, FrameworkDomain, FrameworkRequirement } from '../../types/platform-types';

/**
 * ISO 27001:2022 Controls Registry
 * 
 * Provides comprehensive management of ISO 27001 controls,
 * organized by Annex A categories.
 */
export class ISO27001ControlsRegistry {
    private controls: FrameworkControl[] = [];
    private domains: FrameworkDomain[] = [];
    private requirements: FrameworkRequirement[] = [];

    constructor() {
        this.initializeControls();
        this.initializeDomains();
        this.initializeRequirements();
    }

    /**
     * Initialize ISO 27001 controls based on Annex A
     */
    private initializeControls(): void {
        this.controls = [
            // A.5 Organizational Controls
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
                id: 'A.5.2',
                name: 'Information Security Roles and Responsibilities',
                description: 'Information security roles and responsibilities should be defined and allocated',
                domain: 'A.5',
                requirements: ['A.5.2.1', 'A.5.2.2'],
                severity: 'high',
                implementationGuidance: 'Define clear roles and responsibilities for information security throughout the organization',
                evidenceRequirements: ['Role definitions', 'Responsibility matrix', 'Job descriptions'],
                automationLevel: 'manual'
            },
            {
                id: 'A.5.3',
                name: 'Segregation of Duties',
                description: 'Conflicting duties and areas of responsibility should be segregated',
                domain: 'A.5',
                requirements: ['A.5.3.1'],
                severity: 'medium',
                implementationGuidance: 'Implement segregation of duties to reduce risks of unauthorized modification or misuse',
                evidenceRequirements: ['Segregation matrix', 'Process documentation', 'Access control records'],
                automationLevel: 'semi-automated'
            },

            // A.6 People Controls
            {
                id: 'A.6.1',
                name: 'Screening',
                description: 'Background verification checks on all candidates for employment should be carried out',
                domain: 'A.6',
                requirements: ['A.6.1.1'],
                severity: 'medium',
                implementationGuidance: 'Implement appropriate background screening procedures for personnel',
                evidenceRequirements: ['Screening procedures', 'Background check records', 'Verification documentation'],
                automationLevel: 'manual'
            },
            {
                id: 'A.6.2',
                name: 'Terms and Conditions of Employment',
                description: 'Employment terms and conditions should reflect the organization\'s information security responsibilities',
                domain: 'A.6',
                requirements: ['A.6.2.1'],
                severity: 'medium',
                implementationGuidance: 'Include information security requirements in employment contracts and agreements',
                evidenceRequirements: ['Employment contracts', 'Security clauses', 'Signed agreements'],
                automationLevel: 'manual'
            },
            {
                id: 'A.6.3',
                name: 'Information Security Awareness and Training',
                description: 'Personnel should receive appropriate information security awareness education and training',
                domain: 'A.6',
                requirements: ['A.6.3.1', 'A.6.3.2'],
                severity: 'high',
                implementationGuidance: 'Provide regular security awareness training to all personnel',
                evidenceRequirements: ['Training programs', 'Attendance records', 'Competency assessments'],
                automationLevel: 'semi-automated'
            },

            // A.7 Physical and Environmental Security Controls
            {
                id: 'A.7.1',
                name: 'Physical Security Perimeters',
                description: 'Physical security perimeters should be defined and used to protect areas that contain sensitive information',
                domain: 'A.7',
                requirements: ['A.7.1.1', 'A.7.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish physical security perimeters around facilities containing sensitive information',
                evidenceRequirements: ['Site security assessment', 'Perimeter controls documentation', 'Access logs'],
                automationLevel: 'manual'
            },
            {
                id: 'A.7.2',
                name: 'Physical Entry Controls',
                description: 'Secure areas should be protected by appropriate entry controls',
                domain: 'A.7',
                requirements: ['A.7.2.1'],
                severity: 'high',
                implementationGuidance: 'Implement appropriate physical access controls for secure areas',
                evidenceRequirements: ['Access control systems', 'Entry logs', 'Authorization records'],
                automationLevel: 'automated'
            },

            // A.8 Technological Controls
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
            },
            {
                id: 'A.8.2',
                name: 'Privileged Access Rights',
                description: 'The allocation and use of privileged access rights should be restricted and controlled',
                domain: 'A.8',
                requirements: ['A.8.2.1', 'A.8.2.2'],
                severity: 'critical',
                implementationGuidance: 'Implement strict controls over privileged access rights and monitoring',
                evidenceRequirements: ['Privileged access policies', 'Assignment records', 'Monitoring logs'],
                automationLevel: 'automated'
            },
            {
                id: 'A.8.3',
                name: 'Information Access Restriction',
                description: 'Access to information and application system functions should be restricted',
                domain: 'A.8',
                requirements: ['A.8.3.1', 'A.8.3.2'],
                severity: 'high',
                implementationGuidance: 'Implement appropriate access controls to restrict information access based on business requirements',
                evidenceRequirements: ['Access control matrix', 'Authorization records', 'Access reviews'],
                automationLevel: 'automated'
            },
            {
                id: 'A.8.4',
                name: 'Access to Source Code',
                description: 'Read and write access to source code, development tools and software libraries should be appropriately managed',
                domain: 'A.8',
                requirements: ['A.8.4.1'],
                severity: 'high',
                implementationGuidance: 'Control access to source code and development environments',
                evidenceRequirements: ['Source code access controls', 'Developer access logs', 'Code repository permissions'],
                automationLevel: 'automated'
            },
            {
                id: 'A.8.5',
                name: 'Secure Authentication',
                description: 'Secure authentication technologies and procedures should be implemented',
                domain: 'A.8',
                requirements: ['A.8.5.1', 'A.8.5.2'],
                severity: 'critical',
                implementationGuidance: 'Implement multi-factor authentication and secure authentication mechanisms',
                evidenceRequirements: ['Authentication policies', 'MFA implementation', 'Authentication logs'],
                automationLevel: 'automated'
            },
            {
                id: 'A.8.6',
                name: 'Capacity Management',
                description: 'The use of resources should be monitored and tuned',
                domain: 'A.8',
                requirements: ['A.8.6.1'],
                severity: 'medium',
                implementationGuidance: 'Monitor system capacity and performance to ensure availability',
                evidenceRequirements: ['Capacity monitoring tools', 'Performance reports', 'Tuning documentation'],
                automationLevel: 'automated'
            }
        ];
    }

    /**
     * Initialize ISO 27001 domains (Annex A categories)
     */
    private initializeDomains(): void {
        this.domains = [
            {
                id: 'A.5',
                name: 'Organizational Controls',
                description: 'Controls related to organizational information security policies and procedures',
                controls: this.controls.filter(c => c.domain === 'A.5').map(c => c.id),
                weight: 0.25
            },
            {
                id: 'A.6',
                name: 'People Controls',
                description: 'Controls related to personnel security',
                controls: this.controls.filter(c => c.domain === 'A.6').map(c => c.id),
                weight: 0.15
            },
            {
                id: 'A.7',
                name: 'Physical and Environmental Security Controls',
                description: 'Controls related to physical and environmental security',
                controls: this.controls.filter(c => c.domain === 'A.7').map(c => c.id),
                weight: 0.20
            },
            {
                id: 'A.8',
                name: 'Technological Controls',
                description: 'Controls related to technological aspects of information security',
                controls: this.controls.filter(c => c.domain === 'A.8').map(c => c.id),
                weight: 0.40
            }
        ];
    }

    /**
     * Initialize requirements for controls
     */
    private initializeRequirements(): void {
        this.requirements = [
            // A.5.1 Requirements
            {
                id: 'A.5.1.1',
                name: 'Policy Development',
                description: 'Develop comprehensive information security policies',
                controlId: 'A.5.1',
                mandatory: true,
                testProcedures: ['Review policy documents', 'Verify management approval'],
                acceptanceCriteria: ['Policies cover all required areas', 'Management approval documented']
            },
            {
                id: 'A.5.1.2',
                name: 'Policy Communication',
                description: 'Communicate policies to all relevant personnel',
                controlId: 'A.5.1',
                mandatory: true,
                testProcedures: ['Verify communication methods', 'Check acknowledgment records'],
                acceptanceCriteria: ['All personnel receive policies', 'Acknowledgments documented']
            },

            // A.8.1 Requirements
            {
                id: 'A.8.1.1',
                name: 'Access Provisioning',
                description: 'Implement formal access provisioning process',
                controlId: 'A.8.1',
                mandatory: true,
                testProcedures: ['Review access requests', 'Verify approval process'],
                acceptanceCriteria: ['Formal process documented', 'All access properly approved']
            },
            {
                id: 'A.8.1.2',
                name: 'Access Reviews',
                description: 'Regular review of user access rights',
                controlId: 'A.8.1',
                mandatory: true,
                testProcedures: ['Review access review records', 'Verify frequency'],
                acceptanceCriteria: ['Reviews conducted regularly', 'Inappropriate access removed']
            },
            {
                id: 'A.8.1.3',
                name: 'Access Revocation',
                description: 'Timely revocation of access rights',
                controlId: 'A.8.1',
                mandatory: true,
                testProcedures: ['Test revocation process', 'Verify timeliness'],
                acceptanceCriteria: ['Access revoked promptly', 'Process documented']
            }
        ];
    }

    /**
     * Get all controls
     */
    getAllControls(): FrameworkControl[] {
        return [...this.controls];
    }

    /**
     * Get all domains
     */
    getAllDomains(): FrameworkDomain[] {
        return [...this.domains];
    }

    /**
     * Get all requirements
     */
    getAllRequirements(): FrameworkRequirement[] {
        return [...this.requirements];
    }

    /**
     * Get controls by domain
     */
    getControlsByDomain(domainId: string): FrameworkControl[] {
        return this.controls.filter(control => control.domain === domainId);
    }

    /**
     * Get control by ID
     */
    getControlById(controlId: string): FrameworkControl | undefined {
        return this.controls.find(control => control.id === controlId);
    }

    /**
     * Get requirements for a control
     */
    getRequirementsForControl(controlId: string): FrameworkRequirement[] {
        return this.requirements.filter(req => req.controlId === controlId);
    }

    /**
     * Get controls by severity
     */
    getControlsBySeverity(severity: 'low' | 'medium' | 'high' | 'critical'): FrameworkControl[] {
        return this.controls.filter(control => control.severity === severity);
    }

    /**
     * Get framework statistics
     */
    getFrameworkStats() {
        return {
            totalControls: this.controls.length,
            totalDomains: this.domains.length,
            totalRequirements: this.requirements.length,
            controlsBySeverity: {
                critical: this.getControlsBySeverity('critical').length,
                high: this.getControlsBySeverity('high').length,
                medium: this.getControlsBySeverity('medium').length,
                low: this.getControlsBySeverity('low').length
            },
            controlsByAutomation: {
                automated: this.controls.filter(c => c.automationLevel === 'automated').length,
                semiAutomated: this.controls.filter(c => c.automationLevel === 'semi-automated').length,
                manual: this.controls.filter(c => c.automationLevel === 'manual').length
            }
        };
    }

    /**
     * Export controls data
     */
    exportControlsData() {
        return {
            domains: this.domains,
            controls: this.controls,
            requirements: this.requirements,
            stats: this.getFrameworkStats()
        };
    }
}
