// src/features/auth/api/tokensHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function tokensHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/tokens/health");
}
