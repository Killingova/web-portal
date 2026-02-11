import { http } from "../../../shared/lib/httpClient";
import type { AuthUser } from "../types/auth.types";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
  message?: string;
}

/**
 * POST /auth/register
 */
export function register(payload: RegisterPayload): Promise<RegisterResponse> {
  return http.post<RegisterResponse>("/auth/register", payload);
}
