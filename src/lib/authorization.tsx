import * as React from 'react';

import { useAuth } from './auth';

import { AuthUser } from '@/features/auth';

export const ROLES = {
  ADMIN: 1,
  MANAGER: 2,
  USER: 3,
};

type RoleKeys = keyof typeof ROLES;
type RoleTypes = typeof ROLES[RoleKeys];

export const POLICIES = {
  'movie:create': (user: AuthUser) => {
    if (user.permission_id === ROLES.ADMIN) {
      return true;
    }

    return false;
  },
  'cinema:create': (user: AuthUser) => {
    if (user.permission_id === ROLES.ADMIN) {
      return true;
    }

    return false;
  },
  'cinema:delete': (user: AuthUser) => {
    if (user.permission_id === ROLES.ADMIN) {
      return true;
    }

    return false;
  },
  'cinema:update': (user: AuthUser) => {
    if (user.permission_id === ROLES.ADMIN) {
      return true;
    }

    return false;
  },
  'customer:save': (user: AuthUser) => {
    if (user.permission_id === ROLES.MANAGER) {
      return true;
    }

    return false;
  },
  'food:create': (user: AuthUser) => {
    if (user.permission_id === ROLES.MANAGER) {
      return true;
    }

    return false;
  },
  'food:action': (user: AuthUser) => {
    if (user.permission_id === ROLES.MANAGER) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.permission_id);
      }

      return true;
    },
    [user.permission_id],
  );

  const getRoles = (user: AuthUser) => {
    switch (user.permission_id) {
      case 1:
        return 'Admin';
      case 2:
        return 'Manager';
      default:
        return 'User';
    }
  };

  return { checkAccess, role: getRoles(user) };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
