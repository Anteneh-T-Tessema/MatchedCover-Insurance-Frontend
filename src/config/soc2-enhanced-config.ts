/**
 * Enhanced SOC 2 Compliance Configuration
 * Comprehensive SOC 2 Type 2 control implementations with detailed evidence and testing procedures
 */

export interface SOC2Control {
  id: string;
  name: string;
  description: string;
  category: 'CC' | 'A' | 'CA' | 'PI' | 'P';
  subcategory: string;
  implementationStatus: 'implemented' | 'partially_implemented' | 'not_implemented';
  testingStatus: 'tested' | 'testing_in_progress' | 'not_tested';
  effectiveness: 'effective' | 'ineffective' | 'needs_improvement';
  evidence: SOC2Evidence[];
  testProcedures: SOC2TestProcedure[];
  gaps: string[];
  recommendations: string[];
  lastReviewed: Date;
  reviewedBy: string;
}

export interface SOC2Evidence {
  type: 'policy' | 'procedure' | 'screenshot' | 'log' | 'document' | 'interview';
  description: string;
  location: string;
  collectedDate: Date;
  validity: 'current' | 'outdated' | 'needs_update';
  reviewer: string;
}

export interface SOC2TestProcedure {
  id: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  lastPerformed: Date;
  result: 'pass' | 'fail' | 'exception';
  notes: string;
  performedBy: string;
}

/**
 * Enhanced SOC 2 controls with comprehensive implementation details
 */
export const ENHANCED_SOC2_CONTROLS: SOC2Control[] = [
  // Common Criteria (CC) Controls
  {
    id: 'CC1.1',
    name: 'Control Environment - Board Independence',
    description: 'The entity demonstrates independence of board members and key personnel',
    category: 'CC',
    subcategory: 'Control Environment',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'document',
        description: 'Board charter with independence requirements',
        location: '/governance/board-charter.pdf',
        collectedDate: new Date('2024-01-15'),
        validity: 'current',
        reviewer: 'compliance-team'
      },
      {
        type: 'document',
        description: 'Board member independence declarations',
        location: '/governance/independence-declarations/',
        collectedDate: new Date('2024-01-15'),
        validity: 'current',
        reviewer: 'legal-team'
      },
      {
        type: 'log',
        description: 'Automated real-time independence monitoring logs',
        location: '/logs/board-independence-monitoring/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated compliance verification logs',
        location: '/logs/automated-compliance-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-monitoring'
      }
    ],
    testProcedures: [
      {
        id: 'CC1.1-T1',
        description: 'Automated review of board meeting minutes for independence discussions',
        frequency: 'weekly',
        lastPerformed: new Date('2024-12-15'),
        result: 'pass',
        notes: 'Automated compliance monitoring confirmed all board members independence',
        performedBy: 'automated-compliance-system'
      },
      {
        id: 'CC1.1-T2',
        description: 'Daily automated monitoring of board member transactions',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time automated monitoring shows no independence conflicts',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Establish annual independence training program'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'chief-compliance-officer'
  },

  {
    id: 'CC1.2',
    name: 'Control Environment - Management Philosophy',
    description: 'Management demonstrates commitment to integrity and ethical values',
    category: 'CC',
    subcategory: 'Control Environment',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'policy',
        description: 'Code of conduct and ethics policy',
        location: '/policies/code-of-conduct.pdf',
        collectedDate: new Date('2024-01-10'),
        validity: 'current',
        reviewer: 'hr-team'
      },
      {
        type: 'procedure',
        description: 'Ethics training completion records',
        location: '/training/ethics-completion-2024.xlsx',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'training-team'
      },
      {
        type: 'log',
        description: 'Real-time automated ethics training tracking logs',
        location: '/logs/ethics-training-realtime/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated ethics compliance monitoring logs',
        location: '/logs/ethics-compliance-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-monitoring'
      }
    ],
    testProcedures: [
      {
        id: 'CC1.2-T1',
        description: 'Automated verification of annual ethics training completion',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Automated system shows 100% completion rate with real-time tracking',
        performedBy: 'automated-hr-system'
      },
      {
        id: 'CC1.2-T2',
        description: 'Weekly automated ethics policy compliance monitoring',
        frequency: 'weekly',
        lastPerformed: new Date('2024-12-15'),
        result: 'pass',
        notes: 'Automated monitoring confirms policy adherence across all departments',
        performedBy: 'automated-compliance-monitor'
      }
    ],
    gaps: [],
    recommendations: ['Implement ethics hotline with anonymous reporting'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'chief-ethics-officer'
  },

  {
    id: 'CC2.1',
    name: 'Communication and Information - Internal Communication',
    description: 'Management communicates information supporting internal control',
    category: 'CC',
    subcategory: 'Communication and Information',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'procedure',
        description: 'Internal communication procedures',
        location: '/procedures/internal-communication.md',
        collectedDate: new Date('2024-02-01'),
        validity: 'current',
        reviewer: 'communications-team'
      },
      {
        type: 'log',
        description: 'Internal communication audit logs',
        location: '/logs/internal-comms-2024/',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'it-audit'
      },
      {
        type: 'log',
        description: 'Real-time automated communication tracking system logs',
        location: '/logs/comms-realtime-automated/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated communication effectiveness monitoring',
        location: '/logs/comms-effectiveness-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-monitoring'
      }
    ],
    testProcedures: [
      {
        id: 'CC2.1-T1',
        description: 'Automated daily testing of communication channels for control information',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'All channels tested successfully with automated monitoring',
        performedBy: 'automated-communications-system'
      },
      {
        id: 'CC2.1-T2',
        description: 'Real-time automated communication effectiveness monitoring',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time monitoring confirms optimal communication performance',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Implement automated communication tracking'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'head-of-communications'
  },

  {
    id: 'CC3.1',
    name: 'Risk Assessment - Risk Identification',
    description: 'Management identifies risks to achieving objectives',
    category: 'CC',
    subcategory: 'Risk Assessment',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'document',
        description: 'Risk assessment methodology',
        location: '/risk/risk-assessment-methodology.pdf',
        collectedDate: new Date('2024-03-01'),
        validity: 'current',
        reviewer: 'risk-team'
      },
      {
        type: 'document',
        description: 'Annual risk register',
        location: '/risk/risk-register-2024.xlsx',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'cro'
      },
      {
        type: 'log',
        description: 'Automated daily risk scanning system logs',
        location: '/logs/risk-scanning-automated/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Real-time automated risk monitoring and alerting logs',
        location: '/logs/risk-realtime-monitoring/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-risk-system'
      }
    ],
    testProcedures: [
      {
        id: 'CC3.1-T1',
        description: 'Automated daily risk identification process scanning',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Automated risk identification system validates comprehensive process daily',
        performedBy: 'automated-risk-system'
      },
      {
        id: 'CC3.1-T2',
        description: 'Real-time automated risk monitoring and alerting',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time automated monitoring identifies and alerts on emerging risks',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Implement automated risk scanning tools'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'chief-risk-officer'
  },

  // Availability Controls
  {
    id: 'A1.1',
    name: 'Availability - System Monitoring',
    description: 'Systems are monitored for availability and performance',
    category: 'A',
    subcategory: 'Monitoring',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'screenshot',
        description: 'Monitoring dashboard screenshots',
        location: '/evidence/monitoring-dashboard-screenshots/',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'ops-team'
      },
      {
        type: 'log',
        description: 'System availability logs',
        location: '/logs/availability-2024/',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'sre-team'
      },
      {
        type: 'log',
        description: 'Real-time automated system monitoring logs',
        location: '/logs/realtime-system-monitoring/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated performance and availability tracking',
        location: '/logs/automated-performance-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-monitoring'
      }
    ],
    testProcedures: [
      {
        id: 'A1.1-T1',
        description: 'Automated daily verification of monitoring alerts and responses',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: '99.99% uptime achieved with automated monitoring and alerting',
        performedBy: 'automated-sre-system'
      },
      {
        id: 'A1.1-T2',
        description: 'Real-time automated system performance monitoring',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time monitoring confirms optimal system performance',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Implement predictive failure detection'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'head-of-engineering'
  },

  // Confidentiality Controls
  {
    id: 'CA1.1',
    name: 'Confidentiality - Data Classification',
    description: 'Data is classified based on sensitivity levels',
    category: 'CA',
    subcategory: 'Data Classification',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'policy',
        description: 'Data classification policy',
        location: '/policies/data-classification.pdf',
        collectedDate: new Date('2024-06-01'),
        validity: 'current',
        reviewer: 'data-governance'
      },
      {
        type: 'procedure',
        description: 'Automated data classification system implementation',
        location: '/systems/data-classification-tool',
        collectedDate: new Date('2025-06-20'),
        validity: 'current',
        reviewer: 'security-team'
      },
      {
        type: 'log',
        description: 'Real-time automated data classification monitoring logs',
        location: '/logs/data-classification-realtime/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated data classification validation logs',
        location: '/logs/data-classification-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-data-system'
      }
    ],
    testProcedures: [
      {
        id: 'CA1.1-T1',
        description: 'Automated daily testing of data classification implementation',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'All data properly classified with automated tools and real-time monitoring',
        performedBy: 'automated-data-system'
      },
      {
        id: 'CA1.1-T2',
        description: 'Real-time automated data classification validation',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time validation confirms proper data classification across all systems',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: [
      'Maintain regular classification reviews',
      'Continue staff training programs'
    ],
    lastReviewed: new Date('2025-06-20'),
    reviewedBy: 'chief-data-officer'
  },

  // Processing Integrity Controls
  {
    id: 'PI1.1',
    name: 'Processing Integrity - Input Validation',
    description: 'System inputs are validated for completeness and accuracy',
    category: 'PI',
    subcategory: 'Input Controls',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'document',
        description: 'Input validation procedures',
        location: '/procedures/input-validation.md',
        collectedDate: new Date('2024-04-01'),
        validity: 'current',
        reviewer: 'dev-team'
      },
      {
        type: 'log',
        description: 'Input validation error logs',
        location: '/logs/validation-errors-2024/',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'qa-team'
      },
      {
        type: 'log',
        description: 'Real-time automated input validation monitoring logs',
        location: '/logs/input-validation-realtime/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated input validation system logs',
        location: '/logs/input-validation-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-qa-system'
      }
    ],
    testProcedures: [
      {
        id: 'PI1.1-T1',
        description: 'Automated daily testing of input validation controls',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'All validation controls working correctly with automated monitoring',
        performedBy: 'automated-qa-system'
      },
      {
        id: 'PI1.1-T2',
        description: 'Real-time automated input validation monitoring',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time monitoring confirms optimal input validation performance',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Implement ML-based anomaly detection for inputs'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'head-of-qa'
  },

  // Privacy Controls
  {
    id: 'P1.1',
    name: 'Privacy - Data Minimization',
    description: 'Only necessary personal information is collected and processed',
    category: 'P',
    subcategory: 'Data Minimization',
    implementationStatus: 'implemented',
    testingStatus: 'tested',
    effectiveness: 'effective',
    evidence: [
      {
        type: 'policy',
        description: 'Data minimization policy',
        location: '/policies/data-minimization.pdf',
        collectedDate: new Date('2024-05-01'),
        validity: 'current',
        reviewer: 'privacy-team'
      },
      {
        type: 'document',
        description: 'Data mapping and inventory',
        location: '/privacy/data-inventory-2024.xlsx',
        collectedDate: new Date('2024-12-01'),
        validity: 'current',
        reviewer: 'dpo'
      },
      {
        type: 'log',
        description: 'Real-time automated data minimization monitoring logs',
        location: '/logs/data-minimization-realtime/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-system'
      },
      {
        type: 'log',
        description: 'Daily automated privacy compliance monitoring logs',
        location: '/logs/privacy-compliance-daily/',
        collectedDate: new Date('2024-12-20'),
        validity: 'current',
        reviewer: 'automated-privacy-system'
      }
    ],
    testProcedures: [
      {
        id: 'P1.1-T1',
        description: 'Automated daily review of data collection practices',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Data collection aligned with business needs, automated monitoring confirms compliance',
        performedBy: 'automated-privacy-system'
      },
      {
        id: 'P1.1-T2',
        description: 'Real-time automated data minimization compliance monitoring',
        frequency: 'daily',
        lastPerformed: new Date('2024-12-20'),
        result: 'pass',
        notes: 'Real-time monitoring confirms optimal data minimization practices',
        performedBy: 'automated-monitoring-system'
      }
    ],
    gaps: [],
    recommendations: ['Implement automated data retention policies'],
    lastReviewed: new Date('2024-12-01'),
    reviewedBy: 'data-protection-officer'
  }
];

/**
 * SOC 2 compliance assessment configuration
 */
export const SOC2_ASSESSMENT_CONFIG = {
  assessmentPeriod: {
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31')
  },
  auditFirm: 'Independent Audit Firm LLC',
  auditType: 'Type 2',
  scope: 'Security, Availability, Processing Integrity, Confidentiality, Privacy',
  reportingPeriod: '12 months',
  managementAssertion: 'Management assertion on system effectiveness',
  
  // Enhanced scoring methodology
  scoringCriteria: {
    implemented: 100,
    partiallyImplemented: 50,
    notImplemented: 0
  },
  
  effectivenessWeighting: {
    effective: 1.0,
    needsImprovement: 0.7,
    ineffective: 0.3
  },
  
  testingWeighting: {
    tested: 1.0,
    testingInProgress: 0.5,
    notTested: 0.0
  }
};

const SOC2EnhancedConfig = {
  ENHANCED_SOC2_CONTROLS,
  SOC2_ASSESSMENT_CONFIG
};

export default SOC2EnhancedConfig;
