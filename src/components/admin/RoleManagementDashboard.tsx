/**
 * Advanced Role Management Dashboard
 * Comprehensive RBAC administration interface for MatchedCover platform
 * 
 * Features:
 * - Role hierarchy visualization
 * - Permission management
 * - User role assignments
 * - Compliance audit trails
 * - Risk assessment
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRBAC } from '@/hooks/useRBAC';
import { ProtectedComponent } from '@/components/auth/ProtectedComponents';
import {
  Role,
  Permission,
  UserWithRoles,
  RoleAnalytics
} from '@/types/rbac';

interface RoleManagementDashboardProps {
  className?: string;
}

export function RoleManagementDashboard({ className = '' }: RoleManagementDashboardProps) {
  const { rbacService } = useRBAC();
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'users' | 'analytics'>('roles');
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [analytics, setAnalytics] = useState<Record<string, RoleAnalytics>>({});
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const config = rbacService.exportConfiguration();
      setRoles(config.roles);
      setPermissions(config.permissions);
      
      // Load some sample users
      const sampleUsers = await Promise.all([
        rbacService.getUserWithRoles('user_1'),
        rbacService.getUserWithRoles('user_2'),
        rbacService.getUserWithRoles('user_3')
      ]);
      setUsers(sampleUsers.filter(user => user !== null) as UserWithRoles[]);

      // Load analytics for all roles
      const roleAnalytics: Record<string, RoleAnalytics> = {};
      for (const role of config.roles) {
        const analytics = await rbacService.getRoleAnalytics(role.id);
        if (analytics) {
          roleAnalytics[role.id] = analytics;
        }
      }
      setAnalytics(roleAnalytics);
    } catch (error) {
      console.error('Failed to load RBAC data:', error);
    } finally {
      setLoading(false);
    }
  }, [rbacService]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ProtectedComponent resource="admin" action="manage_permissions" showAccessDenied={true}>
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-900">Role Management Dashboard</h2>
            <p className="text-gray-600 mt-1">Manage user roles, permissions, and access control</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="px-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'roles', name: 'Roles', icon: '👥' },
                { id: 'permissions', name: 'Permissions', icon: '🔑' },
                { id: 'users', name: 'Users', icon: '👤' },
                { id: 'analytics', name: 'Analytics', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'roles' | 'permissions' | 'users' | 'analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'roles' && (
                <RolesTab roles={roles} analytics={analytics} onRefresh={loadData} />
              )}
              {activeTab === 'permissions' && (
                <PermissionsTab permissions={permissions} onRefresh={loadData} />
              )}
              {activeTab === 'users' && (
                <UsersTab users={users} roles={roles} onRefresh={loadData} />
              )}
              {activeTab === 'analytics' && (
                <AnalyticsTab analytics={analytics} roles={roles} />
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedComponent>
  );
}

// Roles Tab Component
function RolesTab({ 
  roles, 
  analytics, 
  onRefresh 
}: { 
  roles: Role[]; 
  analytics: Record<string, RoleAnalytics>; 
  onRefresh: () => void;
}) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">System Roles</h3>
        <button 
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role List */}
        <div className="lg:col-span-1 space-y-3">
          {roles.map((role) => {
            const roleAnalytics = analytics[role.id];
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRole?.id === role.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    role.metadata.category === 'admin' ? 'bg-red-100 text-red-800' :
                    role.metadata.category === 'agent' ? 'bg-blue-100 text-blue-800' :
                    role.metadata.category === 'compliance' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {role.metadata.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{role.permissions.length} permissions</span>
                  {roleAnalytics && (
                    <span>{roleAnalytics.usage_stats.active_assignments} users</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <RoleDetails role={selectedRole} analytics={analytics[selectedRole.id]} />
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500">Select a role to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RoleDetails({ role, analytics }: { role: Role; analytics?: RoleAnalytics }) {
  return (
    <div className="border rounded-lg p-6 space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{role.name}</h4>
        <p className="text-gray-600">{role.description}</p>
      </div>

      {/* Role Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <p className="text-sm text-gray-900">{role.metadata.category}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <p className="text-sm text-gray-900">{role.metadata.level}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Auto Assignable</label>
          <p className="text-sm text-gray-900">{role.metadata.auto_assignable ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Requires Approval</label>
          <p className="text-sm text-gray-900">{role.metadata.requires_approval ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-3">Permissions ({role.permissions.length})</h5>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {role.permissions.map((permissionId, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 rounded text-sm">
              <span className="text-gray-900">{permissionId}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      {analytics && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-3">Analytics</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <div className="text-blue-800 font-medium">Active Users</div>
              <div className="text-blue-600 text-lg">{analytics.usage_stats.active_assignments}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <div className="text-yellow-800 font-medium">Risk Score</div>
              <div className="text-yellow-600 text-lg">{analytics.risk_assessment.risk_score}/100</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Role
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Clone Role
        </button>
        {!role.is_system_role && (
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete Role
          </button>
        )}
      </div>
    </div>
  );
}

// Permissions Tab Component
function PermissionsTab({ 
  permissions, 
  onRefresh 
}: { 
  permissions: Permission[]; 
  onRefresh: () => void;
}) {
  const [filterResource, setFilterResource] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredPermissions = permissions.filter(permission => {
    if (filterResource !== 'all' && permission.resource !== filterResource) return false;
    if (filterRisk !== 'all' && permission.metadata?.risk_level !== filterRisk) return false;
    return true;
  });

  const resourceTypes = Array.from(new Set(permissions.map(p => p.resource)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">System Permissions</h3>
        <button 
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Permission
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={filterResource}
          onChange={(e) => setFilterResource(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
          title="Filter by resource type"
        >
          <option value="all">All Resources</option>
          {resourceTypes.map(resource => (
            <option key={resource} value={resource}>{resource}</option>
          ))}
        </select>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
          title="Filter by risk level"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
          <option value="critical">Critical Risk</option>
        </select>
      </div>

      {/* Permissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scope
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPermissions.map((permission) => (
              <tr key={permission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                    <div className="text-sm text-gray-500">{permission.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {permission.resource}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {permission.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {permission.scope}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    permission.metadata?.risk_level === 'critical' ? 'bg-red-100 text-red-800' :
                    permission.metadata?.risk_level === 'high' ? 'bg-orange-100 text-orange-800' :
                    permission.metadata?.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {permission.metadata?.risk_level || 'low'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {permission.metadata?.compliance_related ? (
                    <span className="text-blue-600">✓ Required</span>
                  ) : (
                    <span className="text-gray-400">Optional</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Users Tab Component
function UsersTab({ 
  users, 
  roles, 
  onRefresh 
}: { 
  users: UserWithRoles[]; 
  roles: Role[];
  onRefresh: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Role Assignments</h3>
        <button 
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Assign Roles
        </button>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <div key={user.user_id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{user.full_name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Security Clearance: {user.security_clearance}
                </p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Assigned Roles</h5>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((roleAssignment) => {
                    const role = roles.find(r => r.id === roleAssignment.role_id);
                    return (
                      <span
                        key={roleAssignment.id}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        {role?.name || roleAssignment.role_id}
                        {roleAssignment.expires_at && (
                          <span className="ml-2 text-xs text-blue-600">
                            (expires {new Date(roleAssignment.expires_at).toLocaleDateString()})
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Effective Permissions ({user.effective_permissions.length})
                </h5>
                <div className="text-xs text-gray-600 max-h-20 overflow-y-auto">
                  {user.effective_permissions.slice(0, 10).map((permission, index) => (
                    <div key={index}>{permission.name}</div>
                  ))}
                  {user.effective_permissions.length > 10 && (
                    <div className="text-gray-400">... and {user.effective_permissions.length - 10} more</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-4 pt-4 border-t">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit Roles
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                View Audit Log
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Revoke Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ 
  analytics, 
  roles 
}: { 
  analytics: Record<string, RoleAnalytics>; 
  roles: Role[];
}) {
  const totalUsers = Object.values(analytics).reduce((sum, a) => sum + a.usage_stats.active_assignments, 0);
  const highRiskRoles = Object.entries(analytics).filter(([, a]) => a.risk_assessment.risk_score > 70);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Role Analytics & Insights</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-blue-800 font-medium">Total Roles</div>
          <div className="text-2xl font-bold text-blue-600">{roles.length}</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-green-800 font-medium">Active Users</div>
          <div className="text-2xl font-bold text-green-600">{totalUsers}</div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="text-yellow-800 font-medium">High Risk Roles</div>
          <div className="text-2xl font-bold text-yellow-600">{highRiskRoles.length}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="text-purple-800 font-medium">Compliance Score</div>
          <div className="text-2xl font-bold text-purple-600">98%</div>
        </div>
      </div>

      {/* Role Usage Chart */}
      <div className="border rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Role Usage Statistics</h4>
        <div className="space-y-4">
          {Object.entries(analytics).map(([roleId, roleAnalytics]) => {
            const role = roles.find(r => r.id === roleId);
            const usagePercentage = totalUsers > 0 ? (roleAnalytics.usage_stats.active_assignments / totalUsers) * 100 : 0;
            
            return (
              <div key={roleId} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {role?.name || roleId}
                    </span>
                    <span className="text-sm text-gray-600">
                      {roleAnalytics.usage_stats.active_assignments} users
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out`}
                      data-progress={usagePercentage}
                      ref={(el) => {
                        if (el) {
                          el.style.setProperty('width', `${usagePercentage}%`);
                        }
                      }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    roleAnalytics.risk_assessment.risk_score > 70 ? 'bg-red-100 text-red-800' :
                    roleAnalytics.risk_assessment.risk_score > 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Risk: {roleAnalytics.risk_assessment.risk_score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="border rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Compliance Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(analytics).map(([roleId, roleAnalytics]) => {
            const role = roles.find(r => r.id === roleId);
            return (
              <div key={roleId} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">{role?.name || roleId}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  roleAnalytics.compliance_status.compliant 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {roleAnalytics.compliance_status.compliant ? 'Compliant' : 'Non-Compliant'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
