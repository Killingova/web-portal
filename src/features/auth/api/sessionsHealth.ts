// src/features/auth/api/sessionsHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function sessionsHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/sessions/health");
}
