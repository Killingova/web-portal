import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";
import { normalizeAuthUser } from "../../../shared/store/authStore";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * POST /auth/login
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const raw = await http.post<any>("/auth/login", payload);

  const accessToken =
    typeof raw?.accessToken === "string"
      ? raw.accessToken
      : typeof raw?.access_token === "string"
        ? raw.access_token
        : undefined;

  const refreshToken =
    typeof raw?.refreshToken === "string"
      ? raw.refreshToken
      : typeof raw?.refresh_token === "string"
        ? raw.refresh_token
        : undefined;

  if (!accessToken) {
    throw new Error("Login response is missing access token.");
  }

  const user = normalizeAuthUser(raw?.user);

  return {
    accessToken,
    // Frontend speichert refreshToken aktuell nicht (nur Memory access token).
    refreshToken: refreshToken ?? "",
    user,
  };
}
