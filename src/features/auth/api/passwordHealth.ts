// src/features/auth/api/passwordHealth.ts
import { http } from "../../../shared/lib/httpClient";
import type { HealthResponse } from "../types/auth.types";

export function passwordHealth(): Promise<HealthResponse> {
  return http.get<HealthResponse>("/auth/password/health");
}
