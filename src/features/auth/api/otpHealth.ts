// src/features/auth/api/otpHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function otpHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/otp/health");
}
