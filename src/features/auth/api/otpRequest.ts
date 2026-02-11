// src/features/auth/api/otpRequest.ts
import { http } from "../../../shared/lib/httpClient";

export interface OtpRequestPayload {
  email: string;
  channel?: "email" | "sms" | string;
}

export interface OtpRequestResponse {
  message: string;
}

export function otpRequest(
  payload: OtpRequestPayload
): Promise<OtpRequestResponse> {
  return http.post<OtpRequestResponse>("/auth/otp/request", payload);
}
