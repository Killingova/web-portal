// src/features/auth/api/magicLinkHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function magicLinkHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/magic-link/health");
}
