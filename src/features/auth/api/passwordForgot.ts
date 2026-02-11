// src/features/auth/api/passwordForgot.ts
import { http } from "../../../shared/lib/httpClient";

export interface PasswordForgotPayload {
  email: string;
}

export interface PasswordForgotResponse {
  message: string;
}

export function passwordForgot(
  payload: PasswordForgotPayload
): Promise<PasswordForgotResponse> {
  return http.post<PasswordForgotResponse>(
    "/auth/password/forgot",
    payload
  );
}
