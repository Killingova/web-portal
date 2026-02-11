// src/features/auth/api/passwordChange.ts
import { http } from "../../../shared/lib/httpClient";

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

export interface PasswordChangeResponse {
  message: string;
}

export function passwordChange(
  payload: PasswordChangePayload
): Promise<PasswordChangeResponse> {
  return http.post<PasswordChangeResponse>(
    "/auth/password/change",
    payload
  );
}
