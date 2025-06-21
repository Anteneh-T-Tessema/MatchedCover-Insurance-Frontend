/**
 * Role-Based Access Control Service
 * Advanced permission management system for MatchedCover
 * 
 * Features:
 * - Hierarchical role inheritance
 * - Dynamic permission evaluation
 * - Context-aware access control
 * - Compliance audit logging
 * - Real-time permission validation
 */

import { 
  Permission, 
  Role, 
  UserRoleAssignment, 
  EvaluationContext, 
  PermissionCheckResult, 
  RoleHierarchy, 
  PermissionAuditLog,
  UserWithRoles,
  RoleAnalytics,
  ResourceType,
  Action,
  Scope
} from '@/types/rbac';

export class RBACService {
  private permissions: Map<string, Permission> = new Map();
  private roles: Map<string, Role> = new Map();
  private userRoles: Map<string, UserRoleAssignment[]> = new Map();
  private roleHierarchy: Map<string, RoleHierarchy> = new Map();
  private auditLogs: PermissionAuditLog[] = [];

  constructor() {
    this.initializeDefaultPermissions();
    this.initializeDefaultRoles();
  }

  /**
   * Check if user has permission for specific action
   */
  async hasPermission(
    userId: string,
    resource: ResourceType,
    action: Action,
    context: Partial<EvaluationContext> = {}
  ): Promise<PermissionCheckResult> {
    const fullContext: EvaluationContext = {
      user_id: userId,
      request_time: new Date(),
      user_attributes: {},
      ...context
    };

    // Get user's effective permissions
    const userPermissions = await this.getUserEffectivePermissions(userId);
    
    // Find matching permissions
    const matchingPermissions = userPermissions.filter(permission => 
      permission.resource === resource && permission.action === action
    );

    if (matchingPermissions.length === 0) {
      this.logPermissionCheck(userId, resource, action, 'denied', 'No matching permissions', fullContext);
      return {
        granted: false,
        reason: 'Permission not granted',
        conditions_met: false,
        effective_scope: 'own',
        risk_level: 'low'
      };
    }

    // Evaluate conditions and determine effective scope
    let granted = false;
    let effectiveScope: Scope = 'own';
    let conditionsMet = true;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    for (const permission of matchingPermissions) {
      // Check conditions
      if (permission.conditions) {
        conditionsMet = this.evaluateConditions(permission.conditions, fullContext);
        if (!conditionsMet) continue;
      }

      // Determine scope access
      if (this.canAccessScope(permission.scope, fullContext)) {
        granted = true;
        effectiveScope = this.getHighestScope(effectiveScope, permission.scope);
        riskLevel = this.getHighestRisk(riskLevel, permission.metadata?.risk_level || 'low');
      }
    }

    // Log the access attempt
    this.logPermissionCheck(
      userId, 
      resource, 
      action, 
      granted ? 'granted' : 'denied',
      granted ? 'Access granted' : 'Conditions not met',
      fullContext
    );

    return {
      granted,
      conditions_met: conditionsMet,
      effective_scope: effectiveScope,
      risk_level: riskLevel,
      requires_additional_auth: riskLevel === 'critical'
    };
  }

  /**
   * Get user's effective permissions (including inherited)
   */
  async getUserEffectivePermissions(userId: string): Promise<Permission[]> {
    const userRoles = this.userRoles.get(userId) || [];
    const activeRoles = userRoles.filter(assignment => 
      assignment.is_active && 
      (!assignment.expires_at || assignment.expires_at > new Date())
    );

    const permissionIds = new Set<string>();

    // Collect permissions from all roles (including inherited)
    for (const roleAssignment of activeRoles) {
      const rolePermissions = await this.getRolePermissions(roleAssignment.role_id, true);
      rolePermissions.forEach(id => permissionIds.add(id));
    }

    // Convert to Permission objects
    return Array.from(permissionIds)
      .map(id => this.permissions.get(id))
      .filter((permission): permission is Permission => permission !== undefined);
  }

  /**
   * Get role permissions with optional inheritance
   */
  async getRolePermissions(roleId: string, includeInherited: boolean = true): Promise<string[]> {
    const role = this.roles.get(roleId);
    if (!role) return [];

    const permissions = new Set(role.permissions);

    if (includeInherited && role.parent_role) {
      const parentPermissions = await this.getRolePermissions(role.parent_role, true);
      parentPermissions.forEach(id => permissions.add(id));
    }

    return Array.from(permissions);
  }

  /**
   * Assign role to user
   */
  async assignRole(
    userId: string,
    roleId: string,
    assignedBy: string,
    context?: UserRoleAssignment['context']
  ): Promise<UserRoleAssignment> {
    const role = this.roles.get(roleId);
    if (!role) {
      throw new Error(`Role ${roleId} not found`);
    }

    const assignment: UserRoleAssignment = {
      id: `${userId}_${roleId}_${Date.now()}`,
      user_id: userId,
      role_id: roleId,
      assigned_by: assignedBy,
      assigned_at: new Date(),
      is_active: true,
      context,
      metadata: {
        auto_assigned: false,
        approval_required: role.metadata.requires_approval
      }
    };

    const userRoles = this.userRoles.get(userId) || [];
    userRoles.push(assignment);
    this.userRoles.set(userId, userRoles);

    return assignment;
  }

  /**
   * Revoke role from user
   */
  async revokeRole(userId: string, roleId: string, revokedBy: string): Promise<boolean> {
    const userRoles = this.userRoles.get(userId) || [];
    const updatedRoles = userRoles.map(assignment => {
      if (assignment.role_id === roleId && assignment.is_active) {
        // Log the revocation
        console.log(`Role ${roleId} revoked from user ${userId} by ${revokedBy}`);
        return { ...assignment, is_active: false };
      }
      return assignment;
    });

    this.userRoles.set(userId, updatedRoles);
    return true;
  }

  /**
   * Create custom role
   */
  async createRole(roleData: Omit<Role, 'id' | 'created_at' | 'updated_at'>): Promise<Role> {
    const role: Role = {
      id: `role_${Date.now()}`,
      ...roleData,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.roles.set(role.id, role);
    return role;
  }

  /**
   * Get user with all role information
   */
  async getUserWithRoles(userId: string): Promise<UserWithRoles | null> {
    const userRoles = this.userRoles.get(userId) || [];
    const effectivePermissions = await this.getUserEffectivePermissions(userId);

    // This would typically fetch from your user database
    const userData = {
      user_id: userId,
      email: `user${userId}@matchedcover.com`,
      full_name: `User ${userId}`,
      is_active: true
    };

    return {
      ...userData,
      roles: userRoles.filter(role => role.is_active),
      effective_permissions: effectivePermissions,
      last_permission_refresh: new Date(),
      security_clearance: this.calculateSecurityClearance(effectivePermissions)
    };
  }

  /**
   * Get role analytics
   */
  async getRoleAnalytics(roleId: string): Promise<RoleAnalytics | null> {
    const role = this.roles.get(roleId);
    if (!role) return null;

    // Count active assignments
    let activeAssignments = 0;
    let totalAssignments = 0;
    
    for (const userRoles of this.userRoles.values()) {
      const roleAssignments = userRoles.filter(assignment => assignment.role_id === roleId);
      totalAssignments += roleAssignments.length;
      activeAssignments += roleAssignments.filter(assignment => assignment.is_active).length;
    }

    // Analyze permissions for risk
    const permissions = role.permissions.map(id => this.permissions.get(id)).filter(Boolean) as Permission[];
    const highRiskPermissions = permissions
      .filter(p => p.metadata?.risk_level === 'high' || p.metadata?.risk_level === 'critical')
      .map(p => p.id);

    return {
      role_id: roleId,
      usage_stats: {
        active_assignments: activeAssignments,
        total_assignments: totalAssignments,
        last_used: new Date(), // Would track actual usage
        most_used_permissions: role.permissions.slice(0, 5) // Top 5
      },
      risk_assessment: {
        risk_score: this.calculateRoleRiskScore(permissions),
        high_risk_permissions: highRiskPermissions,
        recommendations: this.generateRoleRecommendations(permissions)
      },
      compliance_status: {
        compliant: true, // Would check against compliance rules
        violations: [],
        last_audit: new Date()
      }
    };
  }

  /**
   * Bulk permission check for UI rendering
   */
  async checkMultiplePermissions(
    userId: string,
    permissions: Array<{ resource: ResourceType; action: Action }>,
    context: Partial<EvaluationContext> = {}
  ): Promise<Record<string, PermissionCheckResult>> {
    const results: Record<string, PermissionCheckResult> = {};

    for (const { resource, action } of permissions) {
      const key = `${resource}:${action}`;
      results[key] = await this.hasPermission(userId, resource, action, context);
    }

    return results;
  }

  // Private helper methods

  private evaluateConditions(conditions: Permission['conditions'], context: EvaluationContext): boolean {
    if (!conditions) return true;

    return conditions.every(condition => {
      const fieldValue = this.getFieldValue(condition.field, context);
      return this.evaluateCondition(condition.operator, fieldValue, condition.value);
    });
  }

  private canAccessScope(scope: Scope, context: EvaluationContext): boolean {
    switch (scope) {
      case 'own':
        return context.resource_owner_id === context.user_id;
      case 'team':
        // Would check team membership
        return true;
      case 'company':
        // Would check company membership
        return true;
      case 'all':
        return true;
      default:
        return false;
    }
  }

  private getHighestScope(current: Scope, new_scope: Scope): Scope {
    const scopeOrder: Scope[] = ['own', 'team', 'company', 'all'];
    const currentIndex = scopeOrder.indexOf(current);
    const newIndex = scopeOrder.indexOf(new_scope);
    return scopeOrder[Math.max(currentIndex, newIndex)];
  }

  private getHighestRisk(current: string, new_risk: string): 'low' | 'medium' | 'high' | 'critical' {
    const riskOrder = ['low', 'medium', 'high', 'critical'];
    const currentIndex = riskOrder.indexOf(current);
    const newIndex = riskOrder.indexOf(new_risk);
    return riskOrder[Math.max(currentIndex, newIndex)] as 'low' | 'medium' | 'high' | 'critical';
  }

  private getFieldValue(field: string, context: EvaluationContext): unknown {
    const parts = field.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = context;
    
    for (const part of parts) {
      value = value?.[part];
    }
    
    return value;
  }

  private evaluateCondition(operator: string, fieldValue: unknown, conditionValue: unknown): boolean {
    switch (operator) {
      case 'equals':
        return fieldValue === conditionValue;
      case 'contains':
        return String(fieldValue).includes(String(conditionValue));
      case 'gt':
        return Number(fieldValue) > Number(conditionValue);
      case 'lt':
        return Number(fieldValue) < Number(conditionValue);
      case 'in':
        return Array.isArray(conditionValue) && conditionValue.includes(fieldValue);
      case 'not_in':
        return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue);
      default:
        return false;
    }
  }

  private logPermissionCheck(
    userId: string,
    resource: ResourceType,
    action: Action,
    result: 'granted' | 'denied',
    reason: string,
    context: EvaluationContext
  ): void {
    const log: PermissionAuditLog = {
      id: `audit_${Date.now()}_${Math.random()}`,
      user_id: userId,
      resource,
      action,
      result,
      reason,
      timestamp: new Date(),
      context
    };

    this.auditLogs.push(log);
    
    // Keep only last 10000 logs in memory
    if (this.auditLogs.length > 10000) {
      this.auditLogs = this.auditLogs.slice(-10000);
    }
  }

  private calculateSecurityClearance(permissions: Permission[]): 'basic' | 'elevated' | 'admin' | 'executive' {
    const criticalPermissions = permissions.filter(p => p.metadata?.risk_level === 'critical');
    const highPermissions = permissions.filter(p => p.metadata?.risk_level === 'high');

    if (criticalPermissions.length > 0) return 'executive';
    if (highPermissions.length > 3) return 'admin';
    if (permissions.length > 10) return 'elevated';
    return 'basic';
  }

  private calculateRoleRiskScore(permissions: Permission[]): number {
    let score = 0;
    
    permissions.forEach(permission => {
      switch (permission.metadata?.risk_level) {
        case 'critical': score += 10; break;
        case 'high': score += 5; break;
        case 'medium': score += 2; break;
        case 'low': score += 1; break;
      }
    });

    return Math.min(100, score);
  }

  private generateRoleRecommendations(permissions: Permission[]): string[] {
    const recommendations: string[] = [];
    
    const criticalCount = permissions.filter(p => p.metadata?.risk_level === 'critical').length;
    if (criticalCount > 5) {
      recommendations.push('Consider splitting this role - too many critical permissions');
    }

    const compliancePermissions = permissions.filter(p => p.metadata?.compliance_related);
    if (compliancePermissions.length > 0) {
      recommendations.push('Role contains compliance-related permissions - ensure proper training');
    }

    return recommendations;
  }

  // Initialize default permissions and roles
  private initializeDefaultPermissions(): void {
    const defaultPermissions: Permission[] = [
      // Customer permissions
      {
        id: 'quotes:read:own',
        name: 'View Own Quotes',
        description: 'View personal insurance quotes',
        resource: 'quotes',
        action: 'read',
        scope: 'own',
        metadata: { risk_level: 'low', compliance_related: false, audit_required: false }
      },
      {
        id: 'quotes:create:own',
        name: 'Create Quotes',
        description: 'Create new insurance quotes',
        resource: 'quotes',
        action: 'create',
        scope: 'own',
        metadata: { risk_level: 'low', compliance_related: false, audit_required: true }
      },
      
      // Agent permissions
      {
        id: 'quotes:read:team',
        name: 'View Team Quotes',
        description: 'View quotes for team customers',
        resource: 'quotes',
        action: 'read',
        scope: 'team',
        metadata: { risk_level: 'medium', compliance_related: true, audit_required: true }
      },
      {
        id: 'customers:manage:team',
        name: 'Manage Team Customers',
        description: 'Manage customer accounts in team',
        resource: 'customers',
        action: 'update',
        scope: 'team',
        metadata: { risk_level: 'medium', compliance_related: true, audit_required: true }
      },

      // Admin permissions
      {
        id: 'users:manage:all',
        name: 'Manage All Users',
        description: 'Full user management access',
        resource: 'users',
        action: 'manage_permissions',
        scope: 'all',
        metadata: { risk_level: 'critical', compliance_related: true, audit_required: true }
      },
      {
        id: 'compliance:view:all',
        name: 'View Compliance Data',
        description: 'Access compliance reports and data',
        resource: 'compliance',
        action: 'read',
        scope: 'all',
        metadata: { risk_level: 'high', compliance_related: true, audit_required: true }
      },
      {
        id: 'audit_logs:read:all',
        name: 'View Audit Logs',
        description: 'Access system audit logs',
        resource: 'audit_logs',
        action: 'read',
        scope: 'all',
        metadata: { risk_level: 'high', compliance_related: true, audit_required: true }
      }
    ];

    defaultPermissions.forEach(permission => {
      this.permissions.set(permission.id, permission);
    });
  }

  private initializeDefaultRoles(): void {
    const defaultRoles: Role[] = [
      {
        id: 'customer',
        name: 'Customer',
        description: 'Standard customer access',
        permissions: ['quotes:read:own', 'quotes:create:own'],
        is_system_role: true,
        metadata: {
          category: 'customer',
          level: 10,
          auto_assignable: true,
          requires_approval: false
        },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system'
      },
      {
        id: 'agent',
        name: 'Insurance Agent',
        description: 'Insurance agent with team access',
        permissions: ['quotes:read:own', 'quotes:create:own', 'quotes:read:team', 'customers:manage:team'],
        parent_role: 'customer',
        is_system_role: true,
        metadata: {
          category: 'agent',
          level: 5,
          auto_assignable: false,
          requires_approval: true
        },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system'
      },
      {
        id: 'admin',
        name: 'System Administrator',
        description: 'Full system access',
        permissions: [
          'quotes:read:own', 'quotes:create:own', 'quotes:read:team', 'customers:manage:team',
          'users:manage:all', 'compliance:view:all', 'audit_logs:read:all'
        ],
        parent_role: 'agent',
        is_system_role: true,
        metadata: {
          category: 'admin',
          level: 1,
          auto_assignable: false,
          requires_approval: true
        },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system'
      }
    ];

    defaultRoles.forEach(role => {
      this.roles.set(role.id, role);
    });
  }

  /**
   * Get all audit logs for compliance reporting
   */
  getAuditLogs(filters?: {
    userId?: string;
    resource?: ResourceType;
    timeRange?: { start: Date; end: Date };
  }): PermissionAuditLog[] {
    let logs = this.auditLogs;

    if (filters) {
      if (filters.userId) {
        logs = logs.filter(log => log.user_id === filters.userId);
      }
      if (filters.resource) {
        logs = logs.filter(log => log.resource === filters.resource);
      }
      if (filters.timeRange) {
        logs = logs.filter(log => 
          log.timestamp >= filters.timeRange!.start && 
          log.timestamp <= filters.timeRange!.end
        );
      }
    }

    return logs;
  }

  /**
   * Export RBAC configuration for backup/compliance
   */
  exportConfiguration(): {
    permissions: Permission[];
    roles: Role[];
    assignments: UserRoleAssignment[];
  } {
    return {
      permissions: Array.from(this.permissions.values()),
      roles: Array.from(this.roles.values()),
      assignments: Array.from(this.userRoles.values()).flat()
    };
  }
}
