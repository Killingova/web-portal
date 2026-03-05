import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTenant } from "../providers/TenantProvider";

interface RequireTenantProps {
  children: ReactElement;
}

export function RequireTenant({ children }: RequireTenantProps): ReactElement {
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
