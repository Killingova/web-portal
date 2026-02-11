// src/features/auth/api/emailVerifyConfirm.ts
import { http } from "../../../shared/lib/httpClient";

export interface EmailVerifyConfirmPayload {
  token: string;
}

export interface EmailVerifyConfirmResponse {
  message: string;
}

export function emailVerifyConfirm(
  payload: EmailVerifyConfirmPayload
): Promise<EmailVerifyConfirmResponse> {
  return http.post<EmailVerifyConfirmResponse>(
    "/auth/email/verify/confirm",
    payload
  );
}
