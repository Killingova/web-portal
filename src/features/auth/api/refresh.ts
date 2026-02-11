// src/features/auth/api/refresh.ts
import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";

export interface RefreshPayload {
  refreshToken: string;
}

export function refreshSession(
  payload: RefreshPayload
): Promise<AuthResponse> {
  return http.post<AuthResponse>("/auth/refresh", payload);
}
