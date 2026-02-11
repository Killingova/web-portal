import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * POST /auth/login
 */
export function login(payload: LoginPayload): Promise<AuthResponse> {
  return http.post<AuthResponse>("/auth/login", payload);
}
