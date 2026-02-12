import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const TENANT_ID_STORAGE_KEY = "tenant_id";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface TenantContextValue {
  tenantId: string | null;
  hasTenant: boolean;
  setTenantId: (tenantId: string) => void;
  clearTenantId: () => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

function normalizeTenantId(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }

  const candidate = raw.trim().toLowerCase();
  return UUID_RE.test(candidate) ? candidate : null;
}

export function TenantProvider({ children }: { children: ReactNode }): React.ReactElement {
  const { isAuthenticated, user } = useAuth();
  const [tenantId, setTenantIdState] = useState<string | null>(() =>
    normalizeTenantId(localStorage.getItem(TENANT_ID_STORAGE_KEY))
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setTenantIdState(null);
      localStorage.removeItem(TENANT_ID_STORAGE_KEY);
      return;
    }

    if (tenantId) {
      return;
    }

    const fromUser = normalizeTenantId(user?.tenantId);
    if (fromUser) {
      setTenantIdState(fromUser);
      localStorage.setItem(TENANT_ID_STORAGE_KEY, fromUser);
    }
  }, [isAuthenticated, tenantId, user?.tenantId]);

  function setTenantId(nextTenantId: string): void {
    const normalized = normalizeTenantId(nextTenantId);
    if (!normalized) {
      return;
    }

    setTenantIdState(normalized);
    localStorage.setItem(TENANT_ID_STORAGE_KEY, normalized);
  }

  function clearTenantId(): void {
    setTenantIdState(null);
    localStorage.removeItem(TENANT_ID_STORAGE_KEY);
  }

  const value: TenantContextValue = {
    tenantId,
    hasTenant: !!tenantId,
    setTenantId,
    clearTenantId,
  };

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }
  return context;
}
