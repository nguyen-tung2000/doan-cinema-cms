import * as React from "react";

import { useAuth } from "./auth";

import { AuthUser } from "@/features/auth";

export const ROLES = {
  ADMIN: "0",
  MANAGER: "1",
  USER: "2",
};

type RoleKeys = keyof typeof ROLES;
type RoleTypes = typeof ROLES[RoleKeys];

export const POLICIES = {
  "movie:create": (user: AuthUser) => {
    if (user.permission.type === "0") {
      return true;
    }

    return false;
  },
  "cinema:create": (user: AuthUser) => {
    if (user.permission.type === "0") {
      return true;
    }

    return false;
  },
  "cinema:delete": (user: AuthUser) => {
    if (user.permission.type === "0") {
      return true;
    }

    return false;
  },
  "cinema:update": (user: AuthUser) => {
    if (user.permission.type === "0") {
      return true;
    }

    return false;
  },
  "customer:save": (user: AuthUser) => {
    if (user.permission.type === "1") {
      return true;
    }

    return false;
  },
  "food:create": (user: AuthUser) => {
    if (user.permission.type === "1") {
      return true;
    }

    return false;
  },
  "food:action": (user: AuthUser) => {
    if (user.permission.type === "1") {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error("User does not exist!");
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.permission.type);
      }

      return true;
    },
    [user.permission.type],
  );

  const getRoles = (user: AuthUser) => {
    switch (user.permission.type) {
      case "0":
        return "Admin";
      case "1":
        return "Manager";
      default:
        return "User";
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

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
