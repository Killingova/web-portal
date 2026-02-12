import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTenant } from "../providers/TenantProvider";

interface RequireTenantProps {
  children: React.ReactElement;
}

export function RequireTenant({ children }: RequireTenantProps): React.ReactElement {
  const { hasTenant } = useTenant();
  const location = useLocation();

  if (!hasTenant) {
    return (
      <Navigate
        to="/app/onboarding"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}
