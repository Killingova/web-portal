// src/features/auth/api/tenantList.ts
import { http } from "../../../shared/lib/httpClient";
import type { TenantInfo } from "../types/auth.types";

export function tenantList(): Promise<TenantInfo[]> {
  return http.get<TenantInfo[]>("/auth/tenants");
}
