// src/features/auth/api/emailVerifyRequest.ts
import { http } from "../../../shared/lib/httpClient";

export interface EmailVerifyRequestPayload {
  email: string;
}

export interface EmailVerifyRequestResponse {
  message: string;
}

export function emailVerifyRequest(
  payload: EmailVerifyRequestPayload
): Promise<EmailVerifyRequestResponse> {
  return http.post<EmailVerifyRequestResponse>(
    "/auth/email/verify/request",
    payload
  );
}
