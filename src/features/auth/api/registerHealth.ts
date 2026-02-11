// src/features/auth/api/registerHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function registerHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/register/health");
}
