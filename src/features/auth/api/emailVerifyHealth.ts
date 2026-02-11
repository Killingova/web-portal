// src/features/auth/api/emailVerifyHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function emailVerifyHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/email/verify/health");
}
