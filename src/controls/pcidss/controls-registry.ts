import { FrameworkControl, FrameworkDomain, FrameworkRequirement } from '../../interfaces/ComplianceFramework';

/**
 * PCI DSS v4.0 Controls Registry
 * 
 * Provides comprehensive management of PCI DSS controls,
 * organized by the 12 primary requirements.
 */
export class PCIDSSControlsRegistry {
    private controls: FrameworkControl[] = [];
    private domains: FrameworkDomain[] = [];
    private requirements: FrameworkRequirement[] = [];

    constructor() {
        this.initializeControls();
        this.initializeDomains();
        this.initializeRequirements();
    }

    /**
     * Initialize PCI DSS controls based on v4.0 requirements
     */
    private initializeControls(): void {
        this.controls = [
            // Requirement 1: Network Security Controls
            {
                id: 'PCI-1.1.1',
                name: 'Network Security Controls Documentation',
                description: 'Document and implement network security controls',
                domain: 'REQ-1',
                requirements: ['PCI-1.1.1.1', 'PCI-1.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish and maintain network security controls that restrict connections between untrusted networks and system components in the cardholder data environment',
                evidenceRequirements: ['Network diagrams', 'Firewall rulesets', 'Network security policies'],
                automationLevel: 'semi-automated'
            },
            {
                id: 'PCI-1.2.1',
                name: 'Firewall Configuration Standards',
                description: 'Establish configuration standards for firewalls and routers',
                domain: 'REQ-1',
                requirements: ['PCI-1.2.1.1', 'PCI-1.2.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish configuration standards for network security controls',
                evidenceRequirements: ['Configuration standards', 'Implementation documentation'],
                automationLevel: 'manual'
            },

            // Requirement 2: Secure Configurations
            {
                id: 'PCI-2.1.1',
                name: 'Secure Configuration Standards',
                description: 'Establish secure configuration standards for all system components',
                domain: 'REQ-2',
                requirements: ['PCI-2.1.1.1', 'PCI-2.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Develop secure configuration standards for all types of system components',
                evidenceRequirements: ['Configuration standards', 'Hardening guides', 'Baseline configurations'],
                automationLevel: 'automated'
            },
            {
                id: 'PCI-2.2.1',
                name: 'System Hardening',
                description: 'Configure system components to be secure',
                domain: 'REQ-2',
                requirements: ['PCI-2.2.1.1', 'PCI-2.2.1.2'],
                severity: 'high',
                implementationGuidance: 'Configure all system components consistently with industry-accepted system hardening standards',
                evidenceRequirements: ['Hardening checklists', 'Configuration reviews', 'Security settings'],
                automationLevel: 'semi-automated'
            },

            // Requirement 3: Data Protection
            {
                id: 'PCI-3.1.1',
                name: 'Cardholder Data Storage',
                description: 'Keep cardholder data storage to minimum by implementing data retention and disposal policies',
                domain: 'REQ-3',
                requirements: ['PCI-3.1.1.1', 'PCI-3.1.1.2'],
                severity: 'critical',
                implementationGuidance: 'Limit storage of cardholder data to that which is required for legal, regulatory, and business requirements',
                evidenceRequirements: ['Data retention policy', 'Data inventory', 'Disposal procedures'],
                automationLevel: 'manual'
            },
            {
                id: 'PCI-3.2.1',
                name: 'Sensitive Authentication Data Protection',
                description: 'Do not store sensitive authentication data after authorization',
                domain: 'REQ-3',
                requirements: ['PCI-3.2.1.1'],
                severity: 'critical',
                implementationGuidance: 'Ensure sensitive authentication data is not stored after authorization',
                evidenceRequirements: ['Code reviews', 'Data flow analysis', 'Storage verification'],
                automationLevel: 'automated'
            },

            // Requirement 4: Encryption
            {
                id: 'PCI-4.1.1',
                name: 'Strong Cryptography for Data Transmission',
                description: 'Use strong cryptography and security protocols to safeguard cardholder data during transmission',
                domain: 'REQ-4',
                requirements: ['PCI-4.1.1.1', 'PCI-4.1.1.2'],
                severity: 'critical',
                implementationGuidance: 'Use strong cryptography and security protocols to safeguard cardholder data during transmission over open, public networks',
                evidenceRequirements: ['Encryption standards', 'Protocol documentation', 'Transmission logs'],
                automationLevel: 'automated'
            },
            {
                id: 'PCI-4.2.1',
                name: 'Wireless Encryption',
                description: 'Never send unprotected PANs by end-user messaging technologies',
                domain: 'REQ-4',
                requirements: ['PCI-4.2.1.1'],
                severity: 'critical',
                implementationGuidance: 'Prohibit sending unprotected primary account numbers (PANs) by end-user messaging technologies',
                evidenceRequirements: ['Messaging policies', 'Transmission controls', 'Monitoring logs'],
                automationLevel: 'manual'
            },

            // Requirement 5: Anti-Malware
            {
                id: 'PCI-5.1.1',
                name: 'Anti-Malware Solution Deployment',
                description: 'Deploy and maintain anti-malware solutions on systems commonly affected by malicious software',
                domain: 'REQ-5',
                requirements: ['PCI-5.1.1.1', 'PCI-5.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Deploy anti-malware software on all systems commonly affected by malware',
                evidenceRequirements: ['Anti-malware deployment', 'Update procedures', 'Scan logs'],
                automationLevel: 'automated'
            },

            // Requirement 6: Secure Development
            {
                id: 'PCI-6.1.1',
                name: 'Vulnerability Management Process',
                description: 'Establish a process to identify security vulnerabilities',
                domain: 'REQ-6',
                requirements: ['PCI-6.1.1.1', 'PCI-6.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish and maintain a vulnerability management process to identify security vulnerabilities',
                evidenceRequirements: ['Vulnerability management policy', 'Scan results', 'Remediation tracking'],
                automationLevel: 'semi-automated'
            },
            {
                id: 'PCI-6.2.1',
                name: 'Secure Software Development',
                description: 'Establish secure software development processes',
                domain: 'REQ-6',
                requirements: ['PCI-6.2.1.1', 'PCI-6.2.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish and implement secure development processes and standards',
                evidenceRequirements: ['Development standards', 'Code review procedures', 'Security testing'],
                automationLevel: 'manual'
            },

            // Requirement 7: Access Control
            {
                id: 'PCI-7.1.1',
                name: 'Access Control Systems',
                description: 'Establish an access control system that restricts access based on business need to know',
                domain: 'REQ-7',
                requirements: ['PCI-7.1.1.1', 'PCI-7.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Limit access to system components and cardholder data to only those individuals whose job requires such access',
                evidenceRequirements: ['Access control policies', 'Role definitions', 'Access reviews'],
                automationLevel: 'automated'
            },

            // Requirement 8: Identity Management
            {
                id: 'PCI-8.1.1',
                name: 'User Identification and Authentication',
                description: 'Establish processes for user identification and authentication for non-consumer users',
                domain: 'REQ-8',
                requirements: ['PCI-8.1.1.1', 'PCI-8.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Define and implement policies and procedures to ensure proper user identification management',
                evidenceRequirements: ['Identity management policies', 'User directories', 'Authentication logs'],
                automationLevel: 'automated'
            },
            {
                id: 'PCI-8.2.1',
                name: 'Multi-Factor Authentication',
                description: 'Implement multi-factor authentication for all non-console access',
                domain: 'REQ-8',
                requirements: ['PCI-8.2.1.1', 'PCI-8.2.1.2'],
                severity: 'critical',
                implementationGuidance: 'Use multi-factor authentication for all non-console access into the cardholder data environment',
                evidenceRequirements: ['MFA implementation', 'Authentication policies', 'Access logs'],
                automationLevel: 'automated'
            },

            // Requirement 9: Physical Security
            {
                id: 'PCI-9.1.1',
                name: 'Physical Access Controls',
                description: 'Use appropriate facility entry controls to limit and monitor physical access',
                domain: 'REQ-9',
                requirements: ['PCI-9.1.1.1', 'PCI-9.1.1.2'],
                severity: 'medium',
                implementationGuidance: 'Implement physical access controls to limit access to systems that store, process, or transmit cardholder data',
                evidenceRequirements: ['Physical security policies', 'Access logs', 'Badge systems'],
                automationLevel: 'manual'
            },

            // Requirement 10: Logging & Monitoring
            {
                id: 'PCI-10.1.1',
                name: 'Audit Log Implementation',
                description: 'Implement audit logging for all system components',
                domain: 'REQ-10',
                requirements: ['PCI-10.1.1.1', 'PCI-10.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Implement audit trails to link all access to system components to each individual user',
                evidenceRequirements: ['Logging configurations', 'Log samples', 'Retention policies'],
                automationLevel: 'automated'
            },
            {
                id: 'PCI-10.2.1',
                name: 'Log Review Process',
                description: 'Implement automated log review mechanisms or daily log reviews',
                domain: 'REQ-10',
                requirements: ['PCI-10.2.1.1'],
                severity: 'high',
                implementationGuidance: 'Implement automated log review mechanisms or perform daily manual log reviews',
                evidenceRequirements: ['Review procedures', 'Review logs', 'Exception reports'],
                automationLevel: 'semi-automated'
            },

            // Requirement 11: Security Testing
            {
                id: 'PCI-11.1.1',
                name: 'Wireless Access Point Testing',
                description: 'Test for the presence of wireless access points',
                domain: 'REQ-11',
                requirements: ['PCI-11.1.1.1'],
                severity: 'medium',
                implementationGuidance: 'Maintain an inventory of authorized wireless access points and test quarterly for unauthorized wireless access points',
                evidenceRequirements: ['Wireless testing reports', 'Access point inventory', 'Testing procedures'],
                automationLevel: 'semi-automated'
            },
            {
                id: 'PCI-11.2.1',
                name: 'Vulnerability Scanning',
                description: 'Run internal and external vulnerability scans',
                domain: 'REQ-11',
                requirements: ['PCI-11.2.1.1', 'PCI-11.2.1.2'],
                severity: 'high',
                implementationGuidance: 'Perform quarterly internal and external vulnerability scans',
                evidenceRequirements: ['Scan reports', 'Remediation records', 'ASV certificates'],
                automationLevel: 'automated'
            },
            {
                id: 'PCI-11.3.1',
                name: 'Penetration Testing',
                description: 'Perform penetration testing at least annually and after significant infrastructure changes',
                domain: 'REQ-11',
                requirements: ['PCI-11.3.1.1', 'PCI-11.3.1.2'],
                severity: 'high',
                implementationGuidance: 'Perform annual penetration testing and after any significant infrastructure or application upgrade or modification',
                evidenceRequirements: ['Penetration test reports', 'Remediation plans', 'Testing methodology'],
                automationLevel: 'manual'
            },

            // Requirement 12: Policy & Governance
            {
                id: 'PCI-12.1.1',
                name: 'Information Security Policy',
                description: 'Establish, publish, maintain, and disseminate a security policy',
                domain: 'REQ-12',
                requirements: ['PCI-12.1.1.1', 'PCI-12.1.1.2'],
                severity: 'high',
                implementationGuidance: 'Establish an information security policy that is published and communicated to all relevant personnel',
                evidenceRequirements: ['Security policies', 'Communication records', 'Training materials'],
                automationLevel: 'manual'
            },
            {
                id: 'PCI-12.2.1',
                name: 'Risk Assessment',
                description: 'Implement a risk assessment process',
                domain: 'REQ-12',
                requirements: ['PCI-12.2.1.1'],
                severity: 'high',
                implementationGuidance: 'Implement a risk assessment process that identifies critical assets, threats, and vulnerabilities',
                evidenceRequirements: ['Risk assessment reports', 'Asset inventories', 'Threat analysis'],
                automationLevel: 'semi-automated'
            }
        ];
    }

    /**
     * Initialize PCI DSS domains (12 requirements)
     */
    private initializeDomains(): void {
        this.domains = [
            {
                id: 'REQ-1',
                name: 'Network Security Controls',
                description: 'Install and maintain network security controls',
                controls: this.controls.filter(c => c.domain === 'REQ-1').map(c => c.id),
                weight: 0.10
            },
            {
                id: 'REQ-2',
                name: 'Secure Configurations',
                description: 'Apply secure configurations to all system components',
                controls: this.controls.filter(c => c.domain === 'REQ-2').map(c => c.id),
                weight: 0.08
            },
            {
                id: 'REQ-3',
                name: 'Data Protection',
                description: 'Protect stored cardholder data',
                controls: this.controls.filter(c => c.domain === 'REQ-3').map(c => c.id),
                weight: 0.12
            },
            {
                id: 'REQ-4',
                name: 'Encryption',
                description: 'Protect cardholder data with strong cryptography during transmission',
                controls: this.controls.filter(c => c.domain === 'REQ-4').map(c => c.id),
                weight: 0.10
            },
            {
                id: 'REQ-5',
                name: 'Anti-Malware',
                description: 'Protect all systems and networks from malicious software',
                controls: this.controls.filter(c => c.domain === 'REQ-5').map(c => c.id),
                weight: 0.06
            },
            {
                id: 'REQ-6',
                name: 'Secure Development',
                description: 'Develop and maintain secure systems and software',
                controls: this.controls.filter(c => c.domain === 'REQ-6').map(c => c.id),
                weight: 0.10
            },
            {
                id: 'REQ-7',
                name: 'Access Control',
                description: 'Restrict access to cardholder data by business need to know',
                controls: this.controls.filter(c => c.domain === 'REQ-7').map(c => c.id),
                weight: 0.08
            },
            {
                id: 'REQ-8',
                name: 'Identity Management',
                description: 'Identify users and authenticate access to system components',
                controls: this.controls.filter(c => c.domain === 'REQ-8').map(c => c.id),
                weight: 0.10
            },
            {
                id: 'REQ-9',
                name: 'Physical Security',
                description: 'Restrict physical access to cardholder data',
                controls: this.controls.filter(c => c.domain === 'REQ-9').map(c => c.id),
                weight: 0.06
            },
            {
                id: 'REQ-10',
                name: 'Logging & Monitoring',
                description: 'Log and monitor all access to network resources and cardholder data',
                controls: this.controls.filter(c => c.domain === 'REQ-10').map(c => c.id),
                weight: 0.08
            },
            {
                id: 'REQ-11',
                name: 'Security Testing',
                description: 'Test security of systems and networks regularly',
                controls: this.controls.filter(c => c.domain === 'REQ-11').map(c => c.id),
                weight: 0.08
            },
            {
                id: 'REQ-12',
                name: 'Policy & Governance',
                description: 'Support information security with organizational policies and programs',
                controls: this.controls.filter(c => c.domain === 'REQ-12').map(c => c.id),
                weight: 0.04
            }
        ];
    }

    /**
     * Initialize requirements for controls
     */
    private initializeRequirements(): void {
        this.requirements = [
            // Sample requirements for key controls
            {
                id: 'PCI-1.1.1.1',
                name: 'Network Security Control Implementation',
                description: 'Establish and implement network security controls',
                controlId: 'PCI-1.1.1',
                mandatory: true,
                testProcedures: ['Review network security controls', 'Verify implementation'],
                acceptanceCriteria: ['Controls properly implemented', 'Documentation complete']
            },
            {
                id: 'PCI-3.1.1.1',
                name: 'Data Retention Policy',
                description: 'Implement data retention and disposal policy',
                controlId: 'PCI-3.1.1',
                mandatory: true,
                testProcedures: ['Review retention policy', 'Verify disposal procedures'],
                acceptanceCriteria: ['Policy documented and approved', 'Disposal procedures implemented']
            },
            {
                id: 'PCI-8.2.1.1',
                name: 'Multi-Factor Authentication Implementation',
                description: 'Implement MFA for non-console access',
                controlId: 'PCI-8.2.1',
                mandatory: true,
                testProcedures: ['Test MFA implementation', 'Verify coverage'],
                acceptanceCriteria: ['MFA implemented for all required access', 'Proper configuration verified']
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
     * Get controls by domain (requirement)
     */
    getControlsByRequirement(requirementId: string): FrameworkControl[] {
        return this.controls.filter(control => control.domain === requirementId);
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
     * Get critical data protection controls
     */
    getCriticalDataProtectionControls(): FrameworkControl[] {
        return this.controls.filter(control => 
            (control.domain === 'REQ-3' || control.domain === 'REQ-4') && 
            control.severity === 'critical'
        );
    }

    /**
     * Get framework statistics
     */
    getFrameworkStats() {
        return {
            totalControls: this.controls.length,
            totalRequirements: this.domains.length,
            totalTestProcedures: this.requirements.length,
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
            },
            criticalDataProtectionControls: this.getCriticalDataProtectionControls().length
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
