/**
 * Insurance RBAC Demo Page
 * Demonstrates the Insurance RBAC Dashboard with test users
 */

import React, { useState, useEffect } from 'react';
import { InsuranceRBACDashboard } from '../components/admin/InsuranceRBACDashboard';
import styles from './InsuranceRBACDemo.module.css';

const InsuranceRBACDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initialization loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleCreate = (role: { name: string; description: string; permissions: string[] }) => {
    try {
      console.log('New role created:', role);
      // In a real app, this would save to backend
      // Show success feedback here
    } catch (err) {
      setError('Failed to create role. Please try again.');
      console.error('Role creation error:', err);
    }
  };

  const handlePermissionChange = (userId: string, permission: string, granted: boolean) => {
    try {
      console.log('Permission changed:', { userId, permission, granted });
      // In a real app, this would update backend permissions
    } catch (err) {
      setError('Failed to update permission. Please try again.');
      console.error('Permission change error:', err);
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Retry initialization
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Insurance RBAC Dashboard Demo</h1>
        <p className={styles.subtitle}>
          Comprehensive Role-Based Access Control system for insurance operations
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🧪</span>
            <span>Test with 6 different insurance user types</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💰</span>
            <span>Monetary authority limits and dual approval</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🌍</span>
            <span>Territory-based access control</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔍</span>
            <span>Claims authority and complexity handling</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <span>Real-time analytics and compliance monitoring</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🛡️</span>
            <span>Advanced security and audit trails</span>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContainer}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Initializing Insurance RBAC System...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorMessage}>System Error</div>
            <div className={styles.errorDetails}>{error}</div>
            <button onClick={handleRetry} className={styles.retryButton}>
              Retry
            </button>
          </div>
        ) : (
          <InsuranceRBACDashboard
            userId="agent-001" // Default to agent user
            onRoleCreate={handleRoleCreate}
            onPermissionChange={handlePermissionChange}
          />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>About This Demo</h3>
          <p>
            This demo showcases an advanced Insurance RBAC (Role-Based Access Control) system 
            with industry-leading features inspired by top insurtech companies and identity 
            management platforms.
          </p>
          
          <div className={styles.userTypes}>
            <h4>Available Test Users:</h4>
            <div className={styles.userTypeGrid}>
              <div className={styles.userType}>
                <strong>Sarah Martinez</strong>
                <span>Licensed Insurance Agent</span>
                <span>$75K transaction authority</span>
              </div>
              <div className={styles.userType}>
                <strong>Michael Chen</strong>
                <span>Senior Underwriter</span>
                <span>$5M transaction authority</span>
              </div>
              <div className={styles.userType}>
                <strong>Jennifer Rodriguez</strong>
                <span>Senior Claims Adjuster</span>
                <span>$500K claims authority</span>
              </div>
              <div className={styles.userType}>
                <strong>David Thompson</strong>
                <span>Chief Compliance Officer</span>
                <span>Full audit authority</span>
              </div>
              <div className={styles.userType}>
                <strong>Patricia Williams</strong>
                <span>Chief Operating Officer</span>
                <span>Executive-level access</span>
              </div>
              <div className={styles.userType}>
                <strong>Amanda Foster</strong>
                <span>Customer Service Rep</span>
                <span>Limited support access</span>
              </div>
            </div>
          </div>

          <div className={styles.keyFeatures}>
            <h4>Key Features Demonstrated:</h4>
            <ul>
              <li>🎯 <strong>Role Templates:</strong> Pre-configured insurance role templates</li>
              <li>🔒 <strong>Permission Testing:</strong> Real-time permission validation</li>
              <li>📈 <strong>Analytics Dashboard:</strong> Performance metrics and benchmarking</li>
              <li>⚖️ <strong>Compliance Monitoring:</strong> SOC 2, GDPR, NAIC compliance tracking</li>
              <li>🚨 <strong>Risk Assessment:</strong> Behavioral analytics and anomaly detection</li>
              <li>🌐 <strong>Territory Management:</strong> State-level access control</li>
              <li>💼 <strong>Claims Authority:</strong> Complexity-based claim handling</li>
              <li>🔄 <strong>Real-time Updates:</strong> Live permission and authority changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceRBACDemo;
