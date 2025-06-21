/**
 * Route Protection Components using RBAC
 * Provides declarative permission-based component protection
 */

'use client';

import { ReactNode } from 'react';
import { usePermission, usePermissions } from '@/hooks/useRBAC';
import { ResourceType, Action, EvaluationContext } from '@/types/rbac';

interface ProtectedComponentProps {
  children: ReactNode;
  resource: ResourceType;
  action: Action;
  context?: Partial<EvaluationContext>;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
  showAccessDenied?: boolean;
}

/**
 * Protects a component based on user permissions
 */
export function ProtectedComponent({
  children,
  resource,
  action,
  context,
  fallback = null,
  loadingComponent = <div>Checking permissions...</div>,
  showAccessDenied = false
}: ProtectedComponentProps) {
  const { granted, loading } = usePermission(resource, action, context);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!granted) {
    if (showAccessDenied) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
          <p className="text-red-600">You don&apos;t have permission to access this resource.</p>
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface MultiPermissionProtectedProps {
  children: ReactNode;
  permissions: Array<{ resource: ResourceType; action: Action }>;
  mode: 'all' | 'any'; // Require all permissions or any permission
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
  showAccessDenied?: boolean;
}

/**
 * Protects a component based on multiple permissions
 */
export function MultiPermissionProtected({
  children,
  permissions,
  mode = 'all',
  fallback = null,
  loadingComponent = <div>Checking permissions...</div>,
  showAccessDenied = false
}: MultiPermissionProtectedProps) {
  const { results, loading } = usePermissions(permissions);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  const permissionResults = Object.values(results);
  const granted = mode === 'all' 
    ? permissionResults.every(result => result.granted)
    : permissionResults.some(result => result.granted);

  if (!granted) {
    if (showAccessDenied) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
          <p className="text-red-600">You don&apos;t have the required permissions to access this resource.</p>
          <details className="mt-4 text-sm text-red-500">
            <summary className="cursor-pointer">Permission Details</summary>
            <div className="mt-2 text-left">
              {permissions.map(({ resource, action }, index) => {
                const key = `${resource}:${action}`;
                const result = results[key];
                return (
                  <div key={index} className="flex justify-between py-1">
                    <span>{resource}:{action}</span>
                    <span className={result?.granted ? 'text-green-600' : 'text-red-600'}>
                      {result?.granted ? '✓' : '✗'}
                    </span>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RoleBasedComponentProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
  showAccessDenied?: boolean;
}

/**
 * Simple role-based component protection
 */
export function RoleBasedComponent({
  children,
  allowedRoles,
  fallback = null,
  loadingComponent = <div>Checking roles...</div>,
  showAccessDenied = false
}: RoleBasedComponentProps) {
  // This would typically use a useUserRoles hook
  // For now, we'll simulate with a permission check for user management
  const { granted, loading } = usePermission('users', 'read', {
    user_attributes: { allowed_roles: allowedRoles }
  });

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!granted) {
    if (showAccessDenied) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Role Required</h3>
          <p className="text-yellow-600">You need one of these roles to access this content:</p>
          <div className="mt-2 space-x-2">
            {allowedRoles.map((role, index) => (
              <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                {role}
              </span>
            ))}
          </div>
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Higher-order component for route protection
 */
export function withPermissionCheck<T extends object>(
  Component: React.ComponentType<T>,
  resource: ResourceType,
  action: Action,
  options?: {
    fallback?: ReactNode;
    showAccessDenied?: boolean;
  }
) {
  const WrappedComponent = (props: T) => {
    return (
      <ProtectedComponent
        resource={resource}
        action={action}
        fallback={options?.fallback}
        showAccessDenied={options?.showAccessDenied}
      >
        <Component {...props} />
      </ProtectedComponent>
    );
  };

  WrappedComponent.displayName = `withPermissionCheck(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/**
 * Conditional rendering based on permissions
 */
interface PermissionGateProps {
  children: ReactNode;
  resource: ResourceType;
  action: Action;
  context?: Partial<EvaluationContext>;
  inverse?: boolean; // Show when permission is NOT granted
}

export function PermissionGate({
  children,
  resource,
  action,
  context,
  inverse = false
}: PermissionGateProps) {
  const { granted, loading } = usePermission(resource, action, context);

  if (loading) {
    return null; // Don't show anything while loading
  }

  const shouldShow = inverse ? !granted : granted;
  return shouldShow ? <>{children}</> : null;
}

/**
 * Admin-only wrapper component
 */
export function AdminOnly({ children }: { children: ReactNode }) {
  return (
    <ProtectedComponent
      resource="admin"
      action="read"
      showAccessDenied={true}
    >
      {children}
    </ProtectedComponent>
  );
}

/**
 * Customer-only wrapper component
 */
export function CustomerOnly({ children }: { children: ReactNode }) {
  return (
    <ProtectedComponent
      resource="users"
      action="read"
      context={{ user_attributes: { access_level: 'customer' } }}
      showAccessDenied={true}
    >
      {children}
    </ProtectedComponent>
  );
}

/**
 * Agent-only wrapper component
 */
export function AgentOnly({ children }: { children: ReactNode }) {
  return (
    <ProtectedComponent
      resource="customers"
      action="read"
      context={{ user_attributes: { access_level: 'agent' } }}
      showAccessDenied={true}
    >
      {children}
    </ProtectedComponent>
  );
}

/**
 * Compliance officer only wrapper
 */
export function ComplianceOnly({ children }: { children: ReactNode }) {
  return (
    <ProtectedComponent
      resource="compliance"
      action="read"
      showAccessDenied={true}
    >
      {children}
    </ProtectedComponent>
  );
}
