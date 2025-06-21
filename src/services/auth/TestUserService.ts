/**
 * Test User Service for Insurance RBAC Testing
 * Provides predefined users with different insurance roles for testing purposes
 */

export interface TestUser {
  id: string;
  name: string;
  email: string;
  role_id: string;
  role_name: string;
  description: string;
  permissions: string[];
  monetary_authority?: {
    transaction_limit: number;
    daily_limit: number;
    currency: string;
    requires_dual_approval_above: number;
  };
  territory_access?: {
    authorized_states: string[];
    authorized_regions: string[];
    license_numbers: string[];
  };
  claims_authority?: {
    max_claim_amount: number;
    authorized_complexity_levels: string[];
    settlement_authority: number;
    investigation_level: string;
  };
  analytics: {
    total_permissions_checked: number;
    permissions_granted: number;
    permissions_denied: number;
    last_access: Date;
    risk_score: number;
    behavioral_anomalies: number;
    insurance_specific_metrics: {
      premium_volume_accessed: number;
      claims_handled_count: number;
      policies_issued_count: number;
      regulatory_violations: number;
      commission_earned: number;
    };
    competitive_benchmarks: {
      industry_average_processing_time: number;
      our_average_processing_time: number;
      industry_error_rate: number;
      our_error_rate: number;
    };
  };
}

export class TestUserService {
  private static instance: TestUserService;
  private testUsers: Map<string, TestUser> = new Map();

  private constructor() {
    this.initializeTestUsers();
  }

  public static getInstance(): TestUserService {
    if (!TestUserService.instance) {
      TestUserService.instance = new TestUserService();
    }
    return TestUserService.instance;
  }

  private initializeTestUsers(): void {
    // 1. Licensed Insurance Agent
    this.testUsers.set('agent-001', {
      id: 'agent-001',
      name: 'Sarah Martinez',
      email: 'sarah.martinez@matchedcover.com',
      role_id: 'role-agent-001',
      role_name: 'Licensed Insurance Agent',
      description: 'Licensed agent with auto and home expertise, able to quote and issue policies up to $75K',
      permissions: [
        'perm-quote-auto',
        'perm-quote-home', 
        'perm-policy-issue',
        'perm-customer-view',
        'perm-customer-edit'
      ],
      monetary_authority: {
        transaction_limit: 75000,
        daily_limit: 200000,
        currency: 'USD',
        requires_dual_approval_above: 50000
      },
      territory_access: {
        authorized_states: ['CA', 'NV'],
        authorized_regions: ['west-coast'],
        license_numbers: ['CA-AG-123456', 'NV-AG-789012']
      },
      claims_authority: {
        max_claim_amount: 25000,
        authorized_complexity_levels: ['simple', 'standard'],
        settlement_authority: 20000,
        investigation_level: 'basic'
      },
      analytics: {
        total_permissions_checked: 1247,
        permissions_granted: 1198,
        permissions_denied: 49,
        last_access: new Date('2024-06-20'),
        risk_score: 0.15,
        behavioral_anomalies: 2,
        insurance_specific_metrics: {
          premium_volume_accessed: 2847500,
          claims_handled_count: 45,
          policies_issued_count: 127,
          regulatory_violations: 0,
          commission_earned: 85425
        },
        competitive_benchmarks: {
          industry_average_processing_time: 24,
          our_average_processing_time: 18,
          industry_error_rate: 0.035,
          our_error_rate: 0.021
        }
      }
    });

    // 2. Senior Underwriter
    this.testUsers.set('underwriter-001', {
      id: 'underwriter-001',
      name: 'Michael Chen',
      email: 'michael.chen@matchedcover.com',
      role_id: 'role-underwriter-001',
      role_name: 'Senior Underwriter',
      description: 'Senior underwriter with authority for complex policies up to $5M, risk assessment and pricing override',
      permissions: [
        'perm-underwrite-complex',
        'perm-risk-assess',
        'perm-policy-modify',
        'perm-pricing-override',
        'perm-customer-view',
        'perm-analytics-view'
      ],
      monetary_authority: {
        transaction_limit: 5000000,
        daily_limit: 15000000,
        currency: 'USD',
        requires_dual_approval_above: 2000000
      },
      territory_access: {
        authorized_states: ['CA', 'NY', 'TX', 'FL', 'IL'],
        authorized_regions: ['national'],
        license_numbers: ['NAT-UW-987654']
      },
      claims_authority: {
        max_claim_amount: 100000,
        authorized_complexity_levels: ['simple', 'standard', 'complex'],
        settlement_authority: 85000,
        investigation_level: 'detailed'
      },
      analytics: {
        total_permissions_checked: 3421,
        permissions_granted: 3398,
        permissions_denied: 23,
        last_access: new Date('2024-06-21'),
        risk_score: 0.08,
        behavioral_anomalies: 0,
        insurance_specific_metrics: {
          premium_volume_accessed: 12750000,
          claims_handled_count: 23,
          policies_issued_count: 89,
          regulatory_violations: 0,
          commission_earned: 0
        },
        competitive_benchmarks: {
          industry_average_processing_time: 48,
          our_average_processing_time: 36,
          industry_error_rate: 0.015,
          our_error_rate: 0.008
        }
      }
    });

    // 3. Claims Adjuster
    this.testUsers.set('adjuster-001', {
      id: 'adjuster-001',
      name: 'Jennifer Rodriguez',
      email: 'jennifer.rodriguez@matchedcover.com',
      role_id: 'role-adjuster-001',
      role_name: 'Senior Claims Adjuster',
      description: 'Senior claims adjuster with authority for catastrophic claims up to $500K investigation and settlement',
      permissions: [
        'perm-investigate-claims',
        'perm-settle-claims',
        'perm-authorize-repairs',
        'perm-vendor-manage',
        'perm-customer-view',
        'perm-fraud-flag'
      ],
      monetary_authority: {
        transaction_limit: 250000,
        daily_limit: 750000,
        currency: 'USD',
        requires_dual_approval_above: 150000
      },
      territory_access: {
        authorized_states: ['CA', 'NV', 'AZ'],
        authorized_regions: ['southwest'],
        license_numbers: ['CA-ADJ-456789', 'NV-ADJ-123456']
      },
      claims_authority: {
        max_claim_amount: 500000,
        authorized_complexity_levels: ['simple', 'standard', 'complex', 'catastrophic'],
        settlement_authority: 250000,
        investigation_level: 'comprehensive'
      },
      analytics: {
        total_permissions_checked: 2156,
        permissions_granted: 2089,
        permissions_denied: 67,
        last_access: new Date('2024-06-21'),
        risk_score: 0.12,
        behavioral_anomalies: 1,
        insurance_specific_metrics: {
          premium_volume_accessed: 0,
          claims_handled_count: 156,
          policies_issued_count: 0,
          regulatory_violations: 0,
          commission_earned: 0
        },
        competitive_benchmarks: {
          industry_average_processing_time: 72,
          our_average_processing_time: 54,
          industry_error_rate: 0.025,
          our_error_rate: 0.018
        }
      }
    });

    // 4. Compliance Officer
    this.testUsers.set('compliance-001', {
      id: 'compliance-001',
      name: 'David Thompson',
      email: 'david.thompson@matchedcover.com',
      role_id: 'role-compliance-001',
      role_name: 'Chief Compliance Officer',
      description: 'Chief compliance officer with full regulatory oversight and audit authority',
      permissions: [
        'perm-audit-all',
        'perm-regulatory-review',
        'perm-violation-investigate',
        'perm-report-generate',
        'perm-policy-view-all',
        'perm-analytics-full'
      ],
      monetary_authority: {
        transaction_limit: 1000000,
        daily_limit: 5000000,
        currency: 'USD',
        requires_dual_approval_above: 500000
      },
      territory_access: {
        authorized_states: ['ALL'],
        authorized_regions: ['national', 'international'],
        license_numbers: ['NAT-COMP-111222']
      },
      claims_authority: {
        max_claim_amount: 1000000,
        authorized_complexity_levels: ['simple', 'standard', 'complex', 'catastrophic'],
        settlement_authority: 0,
        investigation_level: 'forensic'
      },
      analytics: {
        total_permissions_checked: 4567,
        permissions_granted: 4534,
        permissions_denied: 33,
        last_access: new Date('2024-06-21'),
        risk_score: 0.05,
        behavioral_anomalies: 0,
        insurance_specific_metrics: {
          premium_volume_accessed: 45000000,
          claims_handled_count: 12,
          policies_issued_count: 0,
          regulatory_violations: 0,
          commission_earned: 0
        },
        competitive_benchmarks: {
          industry_average_processing_time: 120,
          our_average_processing_time: 96,
          industry_error_rate: 0.005,
          our_error_rate: 0.002
        }
      }
    });

    // 5. Executive (C-Level)
    this.testUsers.set('executive-001', {
      id: 'executive-001',
      name: 'Patricia Williams',
      email: 'patricia.williams@matchedcover.com',
      role_id: 'role-executive-001',
      role_name: 'Chief Operating Officer',
      description: 'C-level executive with comprehensive platform access and strategic decision authority',
      permissions: [
        'perm-full-access',
        'perm-strategic-decisions',
        'perm-financial-oversight',
        'perm-all-analytics',
        'perm-system-configure',
        'perm-user-manage'
      ],
      monetary_authority: {
        transaction_limit: 50000000,
        daily_limit: 100000000,
        currency: 'USD',
        requires_dual_approval_above: 10000000
      },
      territory_access: {
        authorized_states: ['ALL'],
        authorized_regions: ['global'],
        license_numbers: ['EXEC-001']
      },
      claims_authority: {
        max_claim_amount: 10000000,
        authorized_complexity_levels: ['simple', 'standard', 'complex', 'catastrophic'],
        settlement_authority: 5000000,
        investigation_level: 'executive'
      },
      analytics: {
        total_permissions_checked: 892,
        permissions_granted: 889,
        permissions_denied: 3,
        last_access: new Date('2024-06-21'),
        risk_score: 0.02,
        behavioral_anomalies: 0,
        insurance_specific_metrics: {
          premium_volume_accessed: 150000000,
          claims_handled_count: 5,
          policies_issued_count: 0,
          regulatory_violations: 0,
          commission_earned: 0
        },
        competitive_benchmarks: {
          industry_average_processing_time: 24,
          our_average_processing_time: 12,
          industry_error_rate: 0.001,
          our_error_rate: 0.0005
        }
      }
    });

    // 6. Customer Service Representative
    this.testUsers.set('csr-001', {
      id: 'csr-001',
      name: 'Amanda Foster',
      email: 'amanda.foster@matchedcover.com',
      role_id: 'role-csr-001',
      role_name: 'Customer Service Representative',
      description: 'Customer service representative with limited policy access and customer support capabilities',
      permissions: [
        'perm-customer-view',
        'perm-policy-view-basic',
        'perm-claims-status-view',
        'perm-payment-process',
        'perm-document-generate'
      ],
      monetary_authority: {
        transaction_limit: 5000,
        daily_limit: 25000,
        currency: 'USD',
        requires_dual_approval_above: 2500
      },
      territory_access: {
        authorized_states: ['CA', 'TX'],
        authorized_regions: ['customer-service'],
        license_numbers: ['CS-REP-001']
      },
      claims_authority: {
        max_claim_amount: 10000,
        authorized_complexity_levels: ['simple'],
        settlement_authority: 0,
        investigation_level: 'basic'
      },
      analytics: {
        total_permissions_checked: 2847,
        permissions_granted: 2798,
        permissions_denied: 49,
        last_access: new Date('2024-06-21'),
        risk_score: 0.20,
        behavioral_anomalies: 3,
        insurance_specific_metrics: {
          premium_volume_accessed: 150000,
          claims_handled_count: 234,
          policies_issued_count: 0,
          regulatory_violations: 0,
          commission_earned: 0
        },
        competitive_benchmarks: {
          industry_average_processing_time: 15,
          our_average_processing_time: 12,
          industry_error_rate: 0.045,
          our_error_rate: 0.038
        }
      }
    });
  }

  public getAllTestUsers(): TestUser[] {
    return Array.from(this.testUsers.values());
  }

  public getTestUser(userId: string): TestUser | undefined {
    return this.testUsers.get(userId);
  }

  public getTestUsersByRole(roleType: string): TestUser[] {
    return Array.from(this.testUsers.values()).filter(user => 
      user.role_name.toLowerCase().includes(roleType.toLowerCase())
    );
  }

  public getRoleCategories(): string[] {
    return ['agent', 'underwriter', 'claims_adjuster', 'compliance', 'executive', 'customer_service'];
  }

  public getCurrentUser(): TestUser {
    // Default to agent for demo purposes
    return this.testUsers.get('agent-001')!;
  }

  public switchUser(userId: string): TestUser | null {
    const user = this.testUsers.get(userId);
    return user || null;
  }

  public getPermissionSummary(userId: string): {
    total: number;
    granted: number;
    denied: number;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
  } {
    const user = this.getTestUser(userId);
    if (!user) {
      return { total: 0, granted: 0, denied: 0, risk_level: 'medium' };
    }

    const total = user.analytics.total_permissions_checked;
    const granted = user.analytics.permissions_granted;
    const denied = user.analytics.permissions_denied;
    
    let risk_level: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    if (user.analytics.risk_score <= 0.1) risk_level = 'low';
    else if (user.analytics.risk_score <= 0.3) risk_level = 'medium';
    else if (user.analytics.risk_score <= 0.7) risk_level = 'high';
    else risk_level = 'critical';

    return { total, granted, denied, risk_level };
  }
}

export default TestUserService;
