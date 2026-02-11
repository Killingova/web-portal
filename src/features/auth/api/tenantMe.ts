// src/features/auth/api/tenantMe.ts
import { http } from "../../../shared/lib/httpClient";
import type { TenantInfo } from "../types/auth.types";

export function tenantMe(): Promise<TenantInfo> {
  return http.get<TenantInfo>("/auth/tenants/me");
}
