// src/features/auth/api/otpVerify.ts
import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";

export interface OtpVerifyPayload {
  email: string;
  code: string;
}

export function otpVerify(
  payload: OtpVerifyPayload
): Promise<AuthResponse> {
  return http.post<AuthResponse>("/auth/otp/verify", payload);
}
