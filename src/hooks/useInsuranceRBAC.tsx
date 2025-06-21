/**
 * React Hooks for Insurance RBAC
 * Provides easy-to-use hooks for insurance-specific role-based access control
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { InsuranceRBACService, InsuranceEvaluationContext } from '../services/auth/InsuranceRBACService';
import { 
  ResourceType, 
  Action, 
  PermissionCheckResult,
  InsuranceRoleTemplate,
  MonetaryAuthority,
  TerritoryAccess,
  ClaimsAuthority,
  InsuranceRBACAnalytics
} from '../types/rbac';

// Global insurance RBAC service instance
const insuranceRBACService = new InsuranceRBACService();

/**
 * Hook for checking insurance-specific permissions
 */
export function useInsurancePermissions(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = useCallback(async (
    resource: ResourceType,
    action: Action,
    context: Partial<InsuranceEvaluationContext> = {}
  ): Promise<PermissionCheckResult & {
    insurance_context?: {
      monetary_authority_check?: boolean;
      territory_authority_check?: boolean;
      license_verification?: boolean;
      regulatory_compliance_check?: boolean;
      supervision_requirement_met?: boolean;
    };
  }> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await insuranceRBACService.hasInsurancePermission(
        userId,
        resource,
        action,
        context
      );
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Permission check failed';
      setError(errorMessage);
      return {
        granted: false,
        reason: errorMessage,
        conditions_met: false,
        effective_scope: 'own',
        risk_level: 'high'
      };
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    checkPermission,
    loading,
    error
  };
}

/**
 * Hook for insurance role management
 */
export function useInsuranceRoles() {
  const [templates, setTemplates] = useState<InsuranceRoleTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoleTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from the service
      // For now, we'll return empty array as templates are loaded internally
      setTemplates([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load role templates');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoleFromTemplate = useCallback(async (
    templateId: string,
    customizations: Partial<InsuranceRoleTemplate> = {}
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const role = await insuranceRBACService.createRoleFromTemplate(templateId, customizations);
      return role;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create role';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoleTemplates();
  }, [loadRoleTemplates]);

  return {
    templates,
    createRoleFromTemplate,
    loading,
    error,
    reload: loadRoleTemplates
  };
}

/**
 * Hook for insurance analytics
 */
export function useInsuranceAnalytics(userId: string) {
  const [analytics, setAnalytics] = useState<InsuranceRBACAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await insuranceRBACService.getInsuranceAnalytics(userId);
      setAnalytics(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    error,
    reload: loadAnalytics
  };
}

/**
 * Hook for monetary authority checks
 */
export function useMonetaryAuthority(userId: string) {
  const [authority] = useState<MonetaryAuthority | null>(null);
  const [loading, setLoading] = useState(false);

  const checkMonetaryLimit = useCallback((amount: number): {
    allowed: boolean;
    requiresDualApproval: boolean;
    requiresEscalation: boolean;
    reason?: string;
  } => {
    if (!authority) {
      return {
        allowed: false,
        requiresDualApproval: false,
        requiresEscalation: false,
        reason: 'No monetary authority configured'
      };
    }

    if (amount > authority.transaction_limit) {
      return {
        allowed: false,
        requiresDualApproval: false,
        requiresEscalation: true,
        reason: `Amount exceeds transaction limit of ${authority.transaction_limit}`
      };
    }

    if (amount > authority.requires_dual_approval_above) {
      return {
        allowed: true,
        requiresDualApproval: true,
        requiresEscalation: false,
        reason: 'Dual approval required'
      };
    }

    return {
      allowed: true,
      requiresDualApproval: false,
      requiresEscalation: false
    };
  }, [authority]);

  // In a real implementation, this would fetch from the service
  useEffect(() => {
    // Mock loading monetary authority
    setLoading(false);
  }, [userId]);

  return {
    authority,
    checkMonetaryLimit,
    loading
  };
}

/**
 * Hook for territory access management
 */
export function useTerritoryAccess(userId: string) {
  const [territories] = useState<TerritoryAccess[]>([]);
  const [loading, setLoading] = useState(false);

  const hasAccessToState = useCallback((state: string): boolean => {
    return territories.some(territory => territory.states.includes(state));
  }, [territories]);

  const getAuthorizedStates = useCallback((): string[] => {
    return territories.flatMap(territory => territory.states);
  }, [territories]);

  // In a real implementation, this would fetch from the service
  useEffect(() => {
    // Mock loading territory access
    setLoading(false);
  }, [userId]);

  return {
    territories,
    hasAccessToState,
    getAuthorizedStates,
    loading
  };
}

/**
 * Hook for claims authority management
 */
export function useClaimsAuthority(userId: string) {
  const [authority] = useState<ClaimsAuthority | null>(null);
  const [loading, setLoading] = useState(false);

  const canHandleClaim = useCallback((
    amount: number,
    complexity: 'simple' | 'standard' | 'complex' | 'catastrophic'
  ): boolean => {
    if (!authority) return false;

    if (amount > authority.monetary_limit) return false;

    const complexityLevels = ['simple', 'standard', 'complex', 'catastrophic'];
    const userLevel = complexityLevels.indexOf(authority.complexity_limit);
    const claimLevel = complexityLevels.indexOf(complexity);

    return claimLevel <= userLevel;
  }, [authority]);

  // In a real implementation, this would fetch from the service
  useEffect(() => {
    // Mock loading claims authority
    setLoading(false);
  }, [userId]);

  return {
    authority,
    canHandleClaim,
    loading
  };
}

/**
 * Comprehensive insurance RBAC hook that combines all functionalities
 */
export function useInsuranceRBAC(userId: string) {
  const permissions = useInsurancePermissions(userId);
  const roles = useInsuranceRoles();
  const analytics = useInsuranceAnalytics(userId);
  const monetaryAuthority = useMonetaryAuthority(userId);
  const territoryAccess = useTerritoryAccess(userId);
  const claimsAuthority = useClaimsAuthority(userId);

  const isLoading = useMemo(() => {
    return permissions.loading || 
           roles.loading || 
           analytics.loading || 
           monetaryAuthority.loading || 
           territoryAccess.loading || 
           claimsAuthority.loading;
  }, [
    permissions.loading,
    roles.loading,
    analytics.loading,
    monetaryAuthority.loading,
    territoryAccess.loading,
    claimsAuthority.loading
  ]);

  const hasError = useMemo(() => {
    return Boolean(permissions.error || roles.error || analytics.error);
  }, [permissions.error, roles.error, analytics.error]);

  return {
    permissions,
    roles,
    analytics,
    monetaryAuthority,
    territoryAccess,
    claimsAuthority,
    isLoading,
    hasError
  };
}

/**
 * Utility function to check if user can perform insurance action
 */
export async function canPerformInsuranceAction(
  userId: string,
  resource: ResourceType,
  action: Action,
  context: Partial<InsuranceEvaluationContext> = {}
): Promise<boolean> {
  try {
    const result = await insuranceRBACService.hasInsurancePermission(
      userId,
      resource,
      action,
      context
    );
    return result.granted;
  } catch {
    return false;
  }
}
