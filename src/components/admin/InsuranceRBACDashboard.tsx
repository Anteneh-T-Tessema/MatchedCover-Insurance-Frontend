/**
 * Insurance RBAC Management Dashboard
 * Advanced dashboard for managing insurance-specific roles, permissions, and compliance
 */

import React, { useState, useEffect } from 'react';
import { useInsuranceRBAC } from '../../hooks/useInsuranceRBAC';
import TestUserSwitcher from './TestUserSwitcher';
import TestUserService, { TestUser } from '../../services/auth/TestUserService';
import { 
  Role, 
  InsuranceRoleTemplate, 
  InsuranceRBACAnalytics 
} from '../../types/rbac';
import styles from './InsuranceRBACDashboard.module.css';

interface InsuranceRBACDashboardProps {
  userId?: string;
  onRoleCreate?: (role: Role) => void;
  onPermissionChange?: (userId: string, permission: string, granted: boolean) => void;
}

export const InsuranceRBACDashboard: React.FC<InsuranceRBACDashboardProps> = ({
  userId: initialUserId,
  onRoleCreate
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'analytics' | 'compliance'>('roles');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customizations, setCustomizations] = useState<Partial<InsuranceRoleTemplate>>({});
  const [currentUserId, setCurrentUserId] = useState<string>(initialUserId || 'agent-001');
  
  const testUserService = TestUserService.getInstance();

  // Initialize with default test user
  useEffect(() => {
    const defaultUser = testUserService.getCurrentUser();
    setCurrentUserId(defaultUser.id);
  }, [testUserService]);

  const handleTestUserChange = (user: TestUser) => {
    setCurrentUserId(user.id);
  };

  const {
    permissions,
    roles,
    analytics,
    monetaryAuthority,
    territoryAccess,
    claimsAuthority,
    isLoading,
    hasError
  } = useInsuranceRBAC(currentUserId);

  const handleCreateRole = async () => {
    if (!selectedTemplate) return;
    
    try {
      const newRole = await roles.createRoleFromTemplate(selectedTemplate, customizations);
      onRoleCreate?.(newRole);
      setSelectedTemplate('');
      setCustomizations({});
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  const handlePermissionTest = async () => {
    const result = await permissions.checkPermission('policies', 'issue_policy', {
      policy_context: {
        policy_type: 'auto',
        policy_value: 50000,
        policy_state: 'CA',
        policy_status: 'pending'
      },
      agent_context: {
        license_numbers: ['CA-12345'],
        appointed_carriers: ['carrier-1'],
        territory_codes: ['CA'],
        commission_eligibility: true,
        supervision_status: 'independent'
      }
    });
    
    console.log('Permission test result:', result);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading Insurance RBAC Dashboard...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error Loading Dashboard</h3>
        <p>There was an error loading the insurance RBAC dashboard. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Insurance RBAC Management</h1>
        <p>Advanced role-based access control for insurance operations</p>
      </div>
      
      <TestUserSwitcher
        currentUserId={currentUserId}
        onUserChange={handleTestUserChange}
      />

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'roles' ? styles.active : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          Role Management
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'permissions' ? styles.active : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Permission Testing
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'analytics' ? styles.active : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics & Insights
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'compliance' ? styles.active : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          Compliance & Audit
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'roles' && (
          <RoleManagementTab
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            customizations={customizations}
            onCustomizationChange={setCustomizations}
            onCreateRole={handleCreateRole}
            loading={roles.loading}
            error={roles.error}
          />
        )}

        {activeTab === 'permissions' && (
          <PermissionTestingTab
            onPermissionTest={handlePermissionTest}
            monetaryAuthority={monetaryAuthority}
            territoryAccess={territoryAccess}
            claimsAuthority={claimsAuthority}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            analytics={analytics.analytics}
            loading={analytics.loading}
            error={analytics.error}
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceTab userId={currentUserId} />
        )}
      </div>
    </div>
  );
};

// Role Management Tab Component
const RoleManagementTab: React.FC<{
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  customizations: Partial<InsuranceRoleTemplate>;
  onCustomizationChange: (customizations: Partial<InsuranceRoleTemplate>) => void;
  onCreateRole: () => void;
  loading: boolean;
  error: string | null;
}> = ({
  selectedTemplate,
  onTemplateSelect,
  customizations,
  onCustomizationChange,
  onCreateRole,
  loading,
  error
}) => {
  const predefinedTemplates = [
    { id: 'licensed_agent', name: 'Licensed Insurance Agent', category: 'producer' },
    { id: 'senior_underwriter', name: 'Senior Underwriter', category: 'underwriter' },
    { id: 'claims_adjuster', name: 'Claims Adjuster', category: 'claims' }
  ];

  return (
    <div className={styles.roleManagement}>
      <h2>Insurance Role Templates</h2>
      
      <div className={styles.templateGrid}>
        {predefinedTemplates.map((template) => (
          <div
            key={template.id}
            className={`${styles.templateCard} ${
              selectedTemplate === template.id ? styles.selected : ''
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <h3>{template.name}</h3>
            <p>Category: {template.category}</p>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className={styles.customizationPanel}>
          <h3>Customize Role</h3>
          <div className={styles.formGroup}>
            <label>Role Name:</label>
            <input
              type="text"
              value={customizations.name || ''}
              onChange={(e) =>
                onCustomizationChange({ ...customizations, name: e.target.value })
              }
              placeholder="Enter custom role name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              value={customizations.description || ''}
              onChange={(e) =>
                onCustomizationChange({ ...customizations, description: e.target.value })
              }
              placeholder="Enter role description"
            />
          </div>
          <button
            onClick={onCreateRole}
            className={styles.createButton}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Role'}
          </button>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

// Permission Testing Tab Component
const PermissionTestingTab: React.FC<{
  onPermissionTest: () => void;
  monetaryAuthority: {
    authority: {
      transaction_limit: number;
      requires_dual_approval_above: number;
    } | null;
    checkMonetaryLimit: (amount: number) => {
      allowed: boolean;
      reason?: string;
      requiresDualApproval?: boolean;
      requiresEscalation?: boolean;
    };
  };
  territoryAccess: {
    hasAccessToState: (state: string) => boolean;
    getAuthorizedStates: () => string[];
  };
  claimsAuthority: {
    canHandleClaim: (amount: number, complexity: 'simple' | 'standard' | 'complex' | 'catastrophic') => boolean;
  };
}> = ({ onPermissionTest, monetaryAuthority, territoryAccess, claimsAuthority }) => {
  const [testAmount, setTestAmount] = useState(25000);
  const [testState, setTestState] = useState('CA');

  return (
    <div className={styles.permissionTesting}>
      <h2>Permission Testing & Validation</h2>
      
      <div className={styles.testingGrid}>
        <div className={styles.testCard}>
          <h3>Monetary Authority Test</h3>
          <div className={styles.formGroup}>
            <label>Test Amount:</label>
            <input
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(Number(e.target.value))}
              title="Test Amount"
              placeholder="Enter amount to test"
            />
          </div>
          {monetaryAuthority.authority && (
            <div className={styles.authorityInfo}>
              <p>Transaction Limit: ${monetaryAuthority.authority.transaction_limit}</p>
              <p>Dual Approval Above: ${monetaryAuthority.authority.requires_dual_approval_above}</p>
            </div>
          )}
          <div className={styles.testResult}>
            {(() => {
              const result = monetaryAuthority.checkMonetaryLimit(testAmount);
              return (
                <div className={result.allowed ? styles.success : styles.failure}>
                  <p>Result: {result.allowed ? 'Allowed' : 'Denied'}</p>
                  {result.reason && <p>Reason: {result.reason}</p>}
                  {result.requiresDualApproval && <p>⚠️ Requires Dual Approval</p>}
                  {result.requiresEscalation && <p>🚨 Requires Escalation</p>}
                </div>
              );
            })()}
          </div>
        </div>

        <div className={styles.testCard}>
          <h3>Territory Access Test</h3>
          <div className={styles.formGroup}>
            <label>Test State:</label>
            <select 
              value={testState} 
              onChange={(e) => setTestState(e.target.value)}
              title="Select State to Test"
            >
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
            </select>
          </div>
          <div className={styles.testResult}>
            <div className={territoryAccess.hasAccessToState(testState) ? styles.success : styles.failure}>
              <p>Access to {testState}: {territoryAccess.hasAccessToState(testState) ? 'Granted' : 'Denied'}</p>
            </div>
          </div>
          <div className={styles.authorizedStates}>
            <p>Authorized States: {territoryAccess.getAuthorizedStates().join(', ') || 'None'}</p>
          </div>
        </div>

        <div className={styles.testCard}>
          <h3>Claims Authority Test</h3>
          <div className={styles.claimsTest}>
            {['simple', 'standard', 'complex', 'catastrophic'].map((complexity) => (
              <div key={complexity} className={styles.complexityTest}>
                <span>{complexity}: </span>
                <span
                  className={
                    claimsAuthority.canHandleClaim(testAmount, complexity as 'simple' | 'standard' | 'complex' | 'catastrophic')
                      ? styles.success
                      : styles.failure
                  }
                >
                  {claimsAuthority.canHandleClaim(testAmount, complexity as 'simple' | 'standard' | 'complex' | 'catastrophic') ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.testCard}>
          <h3>Integration Test</h3>
          <button onClick={onPermissionTest} className={styles.testButton}>
            Run Full Permission Test
          </button>
          <p>Tests policy issuance with full insurance context</p>
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab: React.FC<{
  analytics: InsuranceRBACAnalytics | null;
  loading: boolean;
  error: string | null;
}> = ({ analytics, loading, error }) => {
  if (loading) {
    return <div className={styles.loadingMessage}>Loading analytics...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error loading analytics: {error}</div>;
  }

  if (!analytics) {
    return <div className={styles.noData}>No analytics data available</div>;
  }

  return (
    <div className={styles.analytics}>
      <h2>Insurance RBAC Analytics</h2>
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h3>Premium Volume</h3>
          <p className={styles.metricValue}>
            ${analytics.insurance_specific_metrics.premium_volume_accessed.toLocaleString()}
          </p>
        </div>
        
        <div className={styles.metricCard}>
          <h3>Claims Handled</h3>
          <p className={styles.metricValue}>
            {analytics.insurance_specific_metrics.claims_handled_count}
          </p>
        </div>
        
        <div className={styles.metricCard}>
          <h3>Policies Issued</h3>
          <p className={styles.metricValue}>
            {analytics.insurance_specific_metrics.policies_issued_count}
          </p>
        </div>
        
        <div className={styles.metricCard}>
          <h3>Regulatory Violations</h3>
          <p className={`${styles.metricValue} ${
            analytics.insurance_specific_metrics.regulatory_violations > 0 ? styles.warning : styles.success
          }`}>
            {analytics.insurance_specific_metrics.regulatory_violations}
          </p>
        </div>
      </div>

      <div className={styles.benchmarkSection}>
        <h3>Competitive Benchmarks</h3>
        <div className={styles.benchmarkGrid}>
          <div className={styles.benchmarkCard}>
            <h4>Processing Time</h4>
            <p>Industry Average: {analytics.competitive_benchmarks.industry_average_processing_time}h</p>
            <p>Our Average: {analytics.competitive_benchmarks.our_average_processing_time}h</p>
            <div className={`${styles.performanceIndicator} ${
              analytics.competitive_benchmarks.our_average_processing_time < 
              analytics.competitive_benchmarks.industry_average_processing_time 
                ? styles.better : styles.worse
            }`}>
              {analytics.competitive_benchmarks.our_average_processing_time < 
               analytics.competitive_benchmarks.industry_average_processing_time 
                ? '↗️ Better' : '↘️ Worse'}
            </div>
          </div>
          
          <div className={styles.benchmarkCard}>
            <h4>Error Rate</h4>
            <p>Industry Average: {(analytics.competitive_benchmarks.industry_error_rate * 100).toFixed(2)}%</p>
            <p>Our Rate: {(analytics.competitive_benchmarks.our_error_rate * 100).toFixed(2)}%</p>
            <div className={`${styles.performanceIndicator} ${
              analytics.competitive_benchmarks.our_error_rate < 
              analytics.competitive_benchmarks.industry_error_rate 
                ? styles.better : styles.worse
            }`}>
              {analytics.competitive_benchmarks.our_error_rate < 
               analytics.competitive_benchmarks.industry_error_rate 
                ? '↗️ Better' : '↘️ Worse'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compliance Tab Component
const ComplianceTab: React.FC<{
  userId: string;
}> = () => {
  const [complianceData] = useState({
    soc2_status: 'compliant',
    gdpr_status: 'compliant',
    naic_status: 'compliant',
    last_audit: '2024-01-15',
    next_audit: '2024-07-15'
  });

  return (
    <div className={styles.compliance}>
      <h2>Compliance & Audit Status</h2>
      
      <div className={styles.complianceGrid}>
        <div className={styles.complianceCard}>
          <h3>SOC 2 Compliance</h3>
          <div className={`${styles.status} ${styles[complianceData.soc2_status]}`}>
            {complianceData.soc2_status.toUpperCase()}
          </div>
        </div>
        
        <div className={styles.complianceCard}>
          <h3>GDPR Compliance</h3>
          <div className={`${styles.status} ${styles[complianceData.gdpr_status]}`}>
            {complianceData.gdpr_status.toUpperCase()}
          </div>
        </div>
        
        <div className={styles.complianceCard}>
          <h3>NAIC Compliance</h3>
          <div className={`${styles.status} ${styles[complianceData.naic_status]}`}>
            {complianceData.naic_status.toUpperCase()}
          </div>
        </div>
      </div>

      <div className={styles.auditSchedule}>
        <h3>Audit Schedule</h3>
        <p>Last Audit: {complianceData.last_audit}</p>
        <p>Next Audit: {complianceData.next_audit}</p>
      </div>

      <div className={styles.complianceActions}>
        <h3>Compliance Actions</h3>
        <button className={styles.actionButton}>Generate Compliance Report</button>
        <button className={styles.actionButton}>Schedule Audit</button>
        <button className={styles.actionButton}>Review Violations</button>
      </div>
    </div>
  );
};

export default InsuranceRBACDashboard;
