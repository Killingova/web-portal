// src/features/auth/api/passwordReset.ts
import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";

export interface PasswordResetPayload {
  token: string;
  newPassword: string;
}

export interface PasswordResetResponse extends Partial<AuthResponse> {
  message?: string;
}

export function passwordReset(
  payload: PasswordResetPayload
): Promise<PasswordResetResponse> {
  return http.post<PasswordResetResponse>(
    "/auth/password/reset",
    payload
  );
}
