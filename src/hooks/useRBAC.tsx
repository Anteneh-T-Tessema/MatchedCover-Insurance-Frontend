/**
 * RBAC Middleware Hook for Route Protection
 * Provides role-based access control for React components and pages
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { RBACService } from '@/services/auth/RBACService';
import { 
  ResourceType, 
  Action, 
  PermissionCheckResult, 
  UserWithRoles,
  EvaluationContext 
} from '@/types/rbac';

interface RBACContextType {
  rbacService: RBACService;
  currentUser: UserWithRoles | null;
  hasPermission: (resource: ResourceType, action: Action, context?: Partial<EvaluationContext>) => Promise<PermissionCheckResult>;
  checkPermissions: (permissions: Array<{ resource: ResourceType; action: Action }>) => Promise<Record<string, PermissionCheckResult>>;
  isLoading: boolean;
  refreshPermissions: () => Promise<void>;
}

const RBACContext = createContext<RBACContextType | null>(null);

interface RBACProviderProps {
  children: ReactNode;
  userId?: string;
}

export function RBACProvider({ children, userId }: RBACProviderProps) {
  const [rbacService] = useState(() => new RBACService());
  const [currentUser, setCurrentUser] = useState<UserWithRoles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user and permissions
  const loadUserPermissions = useCallback(async (uid: string) => {
    setIsLoading(true);
    try {
      const user = await rbacService.getUserWithRoles(uid);
      setCurrentUser(user);
    } catch (error) {
      console.error('Failed to load user permissions:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [rbacService]);

  useEffect(() => {
    if (userId) {
      loadUserPermissions(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId, loadUserPermissions]);

  const hasPermission = useCallback(async (
    resource: ResourceType, 
    action: Action, 
    context?: Partial<EvaluationContext>
  ): Promise<PermissionCheckResult> => {
    if (!currentUser) {
      return {
        granted: false,
        reason: 'User not authenticated',
        conditions_met: false,
        effective_scope: 'own',
        risk_level: 'low'
      };
    }

    return rbacService.hasPermission(currentUser.user_id, resource, action, context);
  }, [currentUser, rbacService]);

  const checkPermissions = useCallback(async (
    permissions: Array<{ resource: ResourceType; action: Action }>
  ): Promise<Record<string, PermissionCheckResult>> => {
    if (!currentUser) {
      const result: Record<string, PermissionCheckResult> = {};
      permissions.forEach(({ resource, action }) => {
        result[`${resource}:${action}`] = {
          granted: false,
          reason: 'User not authenticated',
          conditions_met: false,
          effective_scope: 'own',
          risk_level: 'low'
        };
      });
      return result;
    }

    return rbacService.checkMultiplePermissions(currentUser.user_id, permissions);
  }, [currentUser, rbacService]);

  const refreshPermissions = useCallback(async () => {
    if (userId) {
      await loadUserPermissions(userId);
    }
  }, [userId, loadUserPermissions]);

  const contextValue: RBACContextType = useMemo(() => ({
    rbacService,
    currentUser,
    hasPermission,
    checkPermissions,
    isLoading,
    refreshPermissions
  }), [rbacService, currentUser, hasPermission, checkPermissions, isLoading, refreshPermissions]);

  return (
    <RBACContext.Provider value={contextValue}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}

/**
 * Hook for checking a single permission
 */
export function usePermission(
  resource: ResourceType, 
  action: Action, 
  context?: Partial<EvaluationContext>
) {
  const { hasPermission } = useRBAC();
  const [result, setResult] = useState<PermissionCheckResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize context to prevent unnecessary re-renders
  const memoizedContext = useMemo(() => context, [context]);
  const contextKey = useMemo(() => 
    memoizedContext ? JSON.stringify(memoizedContext) : '', 
  [memoizedContext]);

  useEffect(() => {
    let mounted = true;

    const checkPermission = async () => {
      setLoading(true);
      try {
        const permissionResult = await hasPermission(resource, action, memoizedContext);
        if (mounted) {
          setResult(permissionResult);
        }
      } catch (error) {
        console.error('Permission check failed:', error);
        if (mounted) {
          setResult({
            granted: false,
            reason: 'Permission check failed',
            conditions_met: false,
            effective_scope: 'own',
            risk_level: 'low'
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkPermission();

    return () => {
      mounted = false;
    };
  }, [resource, action, contextKey, hasPermission, memoizedContext]);

  return { 
    granted: result?.granted ?? false, 
    result, 
    loading 
  };
}

/**
 * Hook for checking multiple permissions
 */
export function usePermissions(permissions: Array<{ resource: ResourceType; action: Action }>) {
  const { checkPermissions } = useRBAC();
  const [results, setResults] = useState<Record<string, PermissionCheckResult>>({});
  const [loading, setLoading] = useState(true);

  // Memoize permissions array to prevent unnecessary re-renders
  const memoizedPermissions = useMemo(() => permissions, [permissions]);
  const permissionsKey = useMemo(() => 
    JSON.stringify(memoizedPermissions), 
  [memoizedPermissions]);

  useEffect(() => {
    let mounted = true;

    const checkAllPermissions = async () => {
      setLoading(true);
      try {
        const permissionResults = await checkPermissions(memoizedPermissions);
        if (mounted) {
          setResults(permissionResults);
        }
      } catch (error) {
        console.error('Permissions check failed:', error);
        if (mounted) {
          setResults({});
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (memoizedPermissions.length > 0) {
      checkAllPermissions();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [permissionsKey, checkPermissions, memoizedPermissions]);

  return { results, loading };
}
