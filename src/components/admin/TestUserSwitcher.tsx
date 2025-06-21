/**
 * Test User Switcher Component
 * Allows switching between different test users to demonstrate RBAC functionality
 */

import React, { useState, useEffect } from 'react';
import TestUserService, { TestUser } from '../../services/auth/TestUserService';
import styles from './TestUserSwitcher.module.css';

interface TestUserSwitcherProps {
  onUserChange: (user: TestUser) => void;
  currentUserId?: string;
}

export const TestUserSwitcher: React.FC<TestUserSwitcherProps> = ({
  onUserChange,
  currentUserId
}) => {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<TestUser | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const testUserService = TestUserService.getInstance();

  useEffect(() => {
    const allUsers = testUserService.getAllTestUsers();
    setUsers(allUsers);
    
    if (currentUserId) {
      const user = testUserService.getTestUser(currentUserId);
      if (user) {
        setSelectedUser(user);
      }
    } else {
      // Default to first user (agent)
      const defaultUser = allUsers[0];
      setSelectedUser(defaultUser);
      onUserChange(defaultUser);
    }
  }, [currentUserId, onUserChange, testUserService]);

  const handleUserSelect = (user: TestUser) => {
    setSelectedUser(user);
    setIsExpanded(false);
    onUserChange(user);
  };

  const getRiskLevelClass = (riskScore: number) => {
    if (riskScore <= 0.1) return styles.riskLow;
    if (riskScore <= 0.3) return styles.riskMedium;
    if (riskScore <= 0.7) return styles.riskHigh;
    return styles.riskCritical;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!selectedUser) {
    return <div className={styles.loading}>Loading test users...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🧪 Test User Mode</h3>
        <p>Switch between users to test different insurance role permissions</p>
      </div>

      <div className={styles.selectedUser}>
        <div className={styles.userInfo} onClick={() => setIsExpanded(!isExpanded)}>
          <div className={styles.userDetails}>
            <div className={styles.userName}>{selectedUser.name}</div>
            <div className={styles.userRole}>{selectedUser.role_name}</div>
            <div className={styles.userEmail}>{selectedUser.email}</div>
          </div>
          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Authority</span>
              <span className={styles.statValue}>
                {formatCurrency(selectedUser.monetary_authority?.transaction_limit || 0)}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Risk</span>
              <span className={`${styles.statValue} ${getRiskLevelClass(selectedUser.analytics.risk_score)}`}>
                {(selectedUser.analytics.risk_score * 100).toFixed(1)}%
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Territory</span>
              <span className={styles.statValue}>
                {selectedUser.territory_access?.authorized_states.length || 0} states
              </span>
            </div>
          </div>
          <div className={styles.expandIcon}>
            {isExpanded ? '▲' : '▼'}
          </div>
        </div>

        {isExpanded && (
          <div className={styles.userDropdown}>
            <div className={styles.userGrid}>
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`${styles.userCard} ${selectedUser.id === user.id ? styles.active : ''}`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardName}>{user.name}</div>
                    <div className={styles.cardRole}>{user.role_name}</div>
                  </div>
                  
                  <div className={styles.cardDescription}>
                    {user.description}
                  </div>

                  <div className={styles.cardStats}>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatLabel}>Permissions</span>
                      <span className={styles.cardStatValue}>{user.permissions.length}</span>
                    </div>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatLabel}>Authority</span>
                      <span className={styles.cardStatValue}>
                        {formatCurrency(user.monetary_authority?.transaction_limit || 0)}
                      </span>
                    </div>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatLabel}>Claims</span>
                      <span className={styles.cardStatValue}>
                        {user.analytics.insurance_specific_metrics.claims_handled_count}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardRisk}>
                    <span className={`${styles.riskBadge} ${getRiskLevelClass(user.analytics.risk_score)}`}>
                      Risk: {(user.analytics.risk_score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className={styles.currentUserSummary}>
          <div className={styles.summaryHeader}>Current User Capabilities</div>
          <div className={styles.capabilityGrid}>
            <div className={styles.capability}>
              <span className={styles.capabilityIcon}>💰</span>
              <span className={styles.capabilityLabel}>Transaction Limit</span>
              <span className={styles.capabilityValue}>
                {formatCurrency(selectedUser.monetary_authority?.transaction_limit || 0)}
              </span>
            </div>
            <div className={styles.capability}>
              <span className={styles.capabilityIcon}>🌍</span>
              <span className={styles.capabilityLabel}>Territories</span>
              <span className={styles.capabilityValue}>
                {selectedUser.territory_access?.authorized_states.join(', ') || 'None'}
              </span>
            </div>
            <div className={styles.capability}>
              <span className={styles.capabilityIcon}>🔍</span>
              <span className={styles.capabilityLabel}>Claims Authority</span>
              <span className={styles.capabilityValue}>
                {formatCurrency(selectedUser.claims_authority?.max_claim_amount || 0)}
              </span>
            </div>
            <div className={styles.capability}>
              <span className={styles.capabilityIcon}>📊</span>
              <span className={styles.capabilityLabel}>Permissions</span>
              <span className={styles.capabilityValue}>
                {selectedUser.permissions.length} active
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestUserSwitcher;
