// src/features/auth/api/tenantHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function tenantHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/tenants/health");
}
