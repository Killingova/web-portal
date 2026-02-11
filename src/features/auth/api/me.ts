import { http } from "../../../shared/lib/httpClient";
import type { AuthUser } from "../types/auth.types";

/**
 * GET /auth/me
 */
export function getMyIdentity(): Promise<AuthUser> {
  return http.get<AuthUser>("/auth/me");
}
