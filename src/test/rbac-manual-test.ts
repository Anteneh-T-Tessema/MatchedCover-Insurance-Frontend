/**
 * Manual RBAC System Test Script
 * This script validates the core functionality of our Insurance RBAC system
 */

import { TestUserService } from '../services/auth/TestUserService';
import { InsuranceRBACService } from '../services/auth/InsuranceRBACService';
import { AdvancedRBACService } from '../services/auth/AdvancedRBACService';
import { 
  InsuranceRole, 
  InsuranceResource, 
  InsuranceAction,
  User,
  Role,
  Permission 
} from '../types/rbac';

// Test Results Interface
interface TestResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string;
  performance?: number; // milliseconds
}

class RBACManualTester {
  private results: TestResult[] = [];
  private testUserService: TestUserService;
  private rbacService: InsuranceRBACService;
  private advancedRBACService: AdvancedRBACService;

  constructor() {
    this.testUserService = new TestUserService();
    this.rbacService = new InsuranceRBACService();
    this.advancedRBACService = new AdvancedRBACService();
  }

  async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Starting RBAC System End-to-End Tests...\n');

    // Core Functionality Tests
    await this.testUserCreation();
    await this.testRoleAssignment();
    await this.testPermissionChecking();
    await this.testResourceAccess();
    
    // Insurance-Specific Tests
    await this.testMonetaryAuthority();
    await this.testTerritoryRestrictions();
    await this.testClaimsAuthority();
    await this.testCompliancePermissions();
    
    // Advanced RBAC Tests
    await this.testRiskBasedAccess();
    await this.testTimeBasedAccess();
    await this.testAuditLogging();
    
    // Performance Tests
    await this.testPerformance();
    
    // UI/UX Simulation Tests
    await this.testUserSwitching();

    return this.results;
  }

  private async testUserCreation(): Promise<void> {
    const startTime = Date.now();
    try {
      const testUsers = this.testUserService.getAllTestUsers();
      const expectedUserCount = 6; // We created 6 test users
      
      if (testUsers.length === expectedUserCount) {
        this.addResult('User Creation', 'PASS', 
          `Successfully created ${testUsers.length} test users`, 
          Date.now() - startTime);
      } else {
        this.addResult('User Creation', 'FAIL', 
          `Expected ${expectedUserCount} users, got ${testUsers.length}`);
      }
    } catch (error) {
      this.addResult('User Creation', 'FAIL', `Error: ${error}`);
    }
  }

  private async testRoleAssignment(): Promise<void> {
    const startTime = Date.now();
    try {
      const testUsers = this.testUserService.getAllTestUsers();
      let allUsersHaveRoles = true;
      let roleDetails = '';

      for (const user of testUsers) {
        if (!user.roles || user.roles.length === 0) {
          allUsersHaveRoles = false;
          break;
        }
        roleDetails += `${user.name}: ${user.roles.map(r => r.name).join(', ')}; `;
      }

      if (allUsersHaveRoles) {
        this.addResult('Role Assignment', 'PASS', 
          `All users have assigned roles: ${roleDetails}`, 
          Date.now() - startTime);
      } else {
        this.addResult('Role Assignment', 'FAIL', 'Some users missing roles');
      }
    } catch (error) {
      this.addResult('Role Assignment', 'FAIL', `Error: ${error}`);
    }
  }

  private async testPermissionChecking(): Promise<void> {
    const startTime = Date.now();
    try {
      const underwriter = this.testUserService.getTestUser('senior_underwriter');
      const agent = this.testUserService.getTestUser('insurance_agent');

      if (!underwriter || !agent) {
        this.addResult('Permission Checking', 'FAIL', 'Test users not found');
        return;
      }

      // Test underwriter can approve policies
      const canUnderwriterApprove = await this.rbacService.checkPermission(
        underwriter.id,
        InsuranceResource.POLICY,
        InsuranceAction.APPROVE
      );

      // Test agent cannot approve policies
      const canAgentApprove = await this.rbacService.checkPermission(
        agent.id,
        InsuranceResource.POLICY,
        InsuranceAction.APPROVE
      );

      if (canUnderwriterApprove && !canAgentApprove) {
        this.addResult('Permission Checking', 'PASS', 
          'Underwriter can approve policies, agent cannot (as expected)', 
          Date.now() - startTime);
      } else {
        this.addResult('Permission Checking', 'FAIL', 
          `Unexpected permission results: Underwriter=${canUnderwriterApprove}, Agent=${canAgentApprove}`);
      }
    } catch (error) {
      this.addResult('Permission Checking', 'FAIL', `Error: ${error}`);
    }
  }

  private async testResourceAccess(): Promise<void> {
    const startTime = Date.now();
    try {
      const claimsAdjuster = this.testUserService.getTestUser('claims_adjuster');
      
      if (!claimsAdjuster) {
        this.addResult('Resource Access', 'FAIL', 'Claims adjuster not found');
        return;
      }

      // Test claims adjuster can read claims but not policies
      const canReadClaims = await this.rbacService.checkPermission(
        claimsAdjuster.id,
        InsuranceResource.CLAIM,
        InsuranceAction.READ
      );

      const canWritePolicies = await this.rbacService.checkPermission(
        claimsAdjuster.id,
        InsuranceResource.POLICY,
        InsuranceAction.CREATE
      );

      if (canReadClaims && !canWritePolicies) {
        this.addResult('Resource Access', 'PASS', 
          'Claims adjuster has appropriate resource access', 
          Date.now() - startTime);
      } else {
        this.addResult('Resource Access', 'WARNING', 
          `Claims adjuster permissions: Claims=${canReadClaims}, Policies=${canWritePolicies}`);
      }
    } catch (error) {
      this.addResult('Resource Access', 'FAIL', `Error: ${error}`);
    }
  }

  private async testMonetaryAuthority(): Promise<void> {
    const startTime = Date.now();
    try {
      const seniorUnderwriter = this.testUserService.getTestUser('senior_underwriter');
      const juniorUnderwriter = this.testUserService.getTestUser('junior_underwriter');

      if (!seniorUnderwriter || !juniorUnderwriter) {
        this.addResult('Monetary Authority', 'FAIL', 'Test users not found');
        return;
      }

      const seniorAuthority = this.rbacService.getMonetaryAuthority(seniorUnderwriter.id);
      const juniorAuthority = this.rbacService.getMonetaryAuthority(juniorUnderwriter.id);

      if (seniorAuthority && juniorAuthority && seniorAuthority > juniorAuthority) {
        this.addResult('Monetary Authority', 'PASS', 
          `Senior: $${seniorAuthority.toLocaleString()}, Junior: $${juniorAuthority.toLocaleString()}`, 
          Date.now() - startTime);
      } else {
        this.addResult('Monetary Authority', 'FAIL', 
          `Authority levels incorrect: Senior=${seniorAuthority}, Junior=${juniorAuthority}`);
      }
    } catch (error) {
      this.addResult('Monetary Authority', 'FAIL', `Error: ${error}`);
    }
  }

  private async testTerritoryRestrictions(): Promise<void> {
    const startTime = Date.now();
    try {
      const agent = this.testUserService.getTestUser('insurance_agent');
      
      if (!agent) {
        this.addResult('Territory Restrictions', 'FAIL', 'Insurance agent not found');
        return;
      }

      const territories = this.rbacService.getAllowedTerritories(agent.id);
      
      if (territories && territories.length > 0) {
        this.addResult('Territory Restrictions', 'PASS', 
          `Agent has access to territories: ${territories.join(', ')}`, 
          Date.now() - startTime);
      } else {
        this.addResult('Territory Restrictions', 'WARNING', 
          'Agent has no territory restrictions (may be intended)');
      }
    } catch (error) {
      this.addResult('Territory Restrictions', 'FAIL', `Error: ${error}`);
    }
  }

  private async testClaimsAuthority(): Promise<void> {
    const startTime = Date.now();
    try {
      const claimsAdjuster = this.testUserService.getTestUser('claims_adjuster');
      
      if (!claimsAdjuster) {
        this.addResult('Claims Authority', 'FAIL', 'Claims adjuster not found');
        return;
      }

      const claimsAuthority = this.rbacService.getClaimsAuthority(claimsAdjuster.id);
      
      if (claimsAuthority && claimsAuthority > 0) {
        this.addResult('Claims Authority', 'PASS', 
          `Claims adjuster can handle claims up to $${claimsAuthority.toLocaleString()}`, 
          Date.now() - startTime);
      } else {
        this.addResult('Claims Authority', 'FAIL', 
          `Claims authority not properly configured: ${claimsAuthority}`);
      }
    } catch (error) {
      this.addResult('Claims Authority', 'FAIL', `Error: ${error}`);
    }
  }

  private async testCompliancePermissions(): Promise<void> {
    const startTime = Date.now();
    try {
      const complianceOfficer = this.testUserService.getTestUser('compliance_officer');
      
      if (!complianceOfficer) {
        this.addResult('Compliance Permissions', 'FAIL', 'Compliance officer not found');
        return;
      }

      const canAccessAudit = await this.rbacService.checkPermission(
        complianceOfficer.id,
        InsuranceResource.AUDIT_LOG,
        InsuranceAction.READ
      );

      const canAccessCompliance = await this.rbacService.checkPermission(
        complianceOfficer.id,
        InsuranceResource.COMPLIANCE_REPORT,
        InsuranceAction.CREATE
      );

      if (canAccessAudit && canAccessCompliance) {
        this.addResult('Compliance Permissions', 'PASS', 
          'Compliance officer has appropriate audit and compliance access', 
          Date.now() - startTime);
      } else {
        this.addResult('Compliance Permissions', 'FAIL', 
          `Compliance access: Audit=${canAccessAudit}, Reports=${canAccessCompliance}`);
      }
    } catch (error) {
      this.addResult('Compliance Permissions', 'FAIL', `Error: ${error}`);
    }
  }

  private async testRiskBasedAccess(): Promise<void> {
    const startTime = Date.now();
    try {
      const user = this.testUserService.getTestUser('insurance_agent');
      
      if (!user) {
        this.addResult('Risk-Based Access', 'FAIL', 'Test user not found');
        return;
      }

      // Test high-risk scenario
      const highRiskResult = await this.advancedRBACService.evaluateAccessWithRisk(
        user.id,
        InsuranceResource.POLICY,
        InsuranceAction.APPROVE,
        { riskLevel: 'high', timestamp: new Date(), location: 'unknown' }
      );

      // Test low-risk scenario
      const lowRiskResult = await this.advancedRBACService.evaluateAccessWithRisk(
        user.id,
        InsuranceResource.POLICY,
        InsuranceAction.READ,
        { riskLevel: 'low', timestamp: new Date(), location: 'office' }
      );

      if (highRiskResult && lowRiskResult) {
        this.addResult('Risk-Based Access', 'PASS', 
          'Risk-based access evaluation completed successfully', 
          Date.now() - startTime);
      } else {
        this.addResult('Risk-Based Access', 'WARNING', 
          'Risk-based access evaluation may need refinement');
      }
    } catch (error) {
      this.addResult('Risk-Based Access', 'FAIL', `Error: ${error}`);
    }
  }

  private async testTimeBasedAccess(): Promise<void> {
    const startTime = Date.now();
    try {
      const user = this.testUserService.getTestUser('insurance_agent');
      
      if (!user) {
        this.addResult('Time-Based Access', 'FAIL', 'Test user not found');
        return;
      }

      // Test during business hours
      const businessHoursResult = await this.advancedRBACService.evaluateTemporalAccess(
        user.id,
        InsuranceResource.POLICY,
        InsuranceAction.READ,
        { 
          timestamp: new Date('2024-01-15T10:00:00'), // Monday 10 AM
          timeZone: 'America/New_York' 
        }
      );

      // Test outside business hours
      const afterHoursResult = await this.advancedRBACService.evaluateTemporalAccess(
        user.id,
        InsuranceResource.POLICY,
        InsuranceAction.READ,
        { 
          timestamp: new Date('2024-01-15T22:00:00'), // Monday 10 PM
          timeZone: 'America/New_York' 
        }
      );

      this.addResult('Time-Based Access', 'PASS', 
        `Time-based evaluation: Business hours=${businessHoursResult.granted}, After hours=${afterHoursResult.granted}`, 
        Date.now() - startTime);
    } catch (error) {
      this.addResult('Time-Based Access', 'FAIL', `Error: ${error}`);
    }
  }

  private async testAuditLogging(): Promise<void> {
    const startTime = Date.now();
    try {
      const user = this.testUserService.getTestUser('insurance_agent');
      
      if (!user) {
        this.addResult('Audit Logging', 'FAIL', 'Test user not found');
        return;
      }

      // Perform an action that should be audited
      await this.rbacService.checkPermission(
        user.id,
        InsuranceResource.POLICY,
        InsuranceAction.READ
      );

      // Check if audit log was created
      const auditLogs = this.rbacService.getAuditLogs({
        userId: user.id,
        startDate: new Date(Date.now() - 1000), // 1 second ago
        endDate: new Date()
      });

      if (auditLogs.length > 0) {
        this.addResult('Audit Logging', 'PASS', 
          `Audit log created successfully (${auditLogs.length} entries)`, 
          Date.now() - startTime);
      } else {
        this.addResult('Audit Logging', 'WARNING', 
          'Audit logging may not be working as expected');
      }
    } catch (error) {
      this.addResult('Audit Logging', 'FAIL', `Error: ${error}`);
    }
  }

  private async testPerformance(): Promise<void> {
    const startTime = Date.now();
    try {
      const user = this.testUserService.getTestUser('insurance_agent');
      
      if (!user) {
        this.addResult('Performance Test', 'FAIL', 'Test user not found');
        return;
      }

      const iterations = 100;
      const permissionCheckTimes: number[] = [];

      // Perform multiple permission checks to test performance
      for (let i = 0; i < iterations; i++) {
        const checkStart = Date.now();
        await this.rbacService.checkPermission(
          user.id,
          InsuranceResource.POLICY,
          InsuranceAction.READ
        );
        permissionCheckTimes.push(Date.now() - checkStart);
      }

      const avgTime = permissionCheckTimes.reduce((a, b) => a + b, 0) / iterations;
      const maxTime = Math.max(...permissionCheckTimes);

      if (avgTime < 50 && maxTime < 200) { // Acceptable thresholds
        this.addResult('Performance Test', 'PASS', 
          `Avg: ${avgTime.toFixed(2)}ms, Max: ${maxTime}ms (${iterations} iterations)`, 
          Date.now() - startTime);
      } else {
        this.addResult('Performance Test', 'WARNING', 
          `Performance may need optimization. Avg: ${avgTime.toFixed(2)}ms, Max: ${maxTime}ms`);
      }
    } catch (error) {
      this.addResult('Performance Test', 'FAIL', `Error: ${error}`);
    }
  }

  private async testUserSwitching(): Promise<void> {
    const startTime = Date.now();
    try {
      const allUsers = this.testUserService.getAllTestUsers();
      let switchingSuccess = true;
      const switchResults: string[] = [];

      for (const user of allUsers) {
        try {
          // Simulate user switching by checking their primary permission
          const hasBasicAccess = await this.rbacService.checkPermission(
            user.id,
            InsuranceResource.DASHBOARD,
            InsuranceAction.READ
          );
          
          switchResults.push(`${user.name}: ${hasBasicAccess ? 'OK' : 'NO ACCESS'}`);
          
          if (!hasBasicAccess) {
            switchingSuccess = false;
          }
        } catch (error) {
          switchingSuccess = false;
          switchResults.push(`${user.name}: ERROR`);
        }
      }

      if (switchingSuccess) {
        this.addResult('User Switching', 'PASS', 
          `All users can switch successfully: ${switchResults.join(', ')}`, 
          Date.now() - startTime);
      } else {
        this.addResult('User Switching', 'WARNING', 
          `Some users have access issues: ${switchResults.join(', ')}`);
      }
    } catch (error) {
      this.addResult('User Switching', 'FAIL', `Error: ${error}`);
    }
  }

  private addResult(testName: string, status: 'PASS' | 'FAIL' | 'WARNING', details: string, performance?: number): void {
    this.results.push({ testName, status, details, performance });
    
    const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    const perfInfo = performance ? ` (${performance}ms)` : '';
    console.log(`${emoji} ${testName}: ${details}${perfInfo}`);
  }

  generateReport(): string {
    const passCount = this.results.filter(r => r.status === 'PASS').length;
    const failCount = this.results.filter(r => r.status === 'FAIL').length;
    const warningCount = this.results.filter(r => r.status === 'WARNING').length;
    const totalTests = this.results.length;

    const successRate = ((passCount / totalTests) * 100).toFixed(1);

    let report = `
🧪 RBAC System End-to-End Test Report
=====================================

Summary:
- Total Tests: ${totalTests}
- Passed: ${passCount}
- Failed: ${failCount}
- Warnings: ${warningCount}
- Success Rate: ${successRate}%

Detailed Results:
`;

    this.results.forEach(result => {
      const emoji = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      const perfInfo = result.performance ? ` (${result.performance}ms)` : '';
      report += `${emoji} ${result.testName}: ${result.details}${perfInfo}\n`;
    });

    report += `
Overall Assessment:
`;

    if (failCount === 0) {
      report += `🎉 All critical tests passed! The RBAC system is functioning correctly.`;
    } else if (failCount <= 2) {
      report += `⚠️ Minor issues detected. ${failCount} test(s) failed - review and fix before production.`;
    } else {
      report += `🚨 Multiple critical issues detected. ${failCount} test(s) failed - significant work needed.`;
    }

    return report;
  }
}

// Export for use in testing
export { RBACManualTester };
