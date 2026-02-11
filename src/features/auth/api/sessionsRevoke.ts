// src/features/auth/api/sessionsRevoke.ts
import { http } from "../../../shared/lib/httpClient";

export interface SessionsRevokePayload {
  sessionId: string;
}

export interface SessionsRevokeResponse {
  message: string;
}

export function sessionsRevoke(
  payload: SessionsRevokePayload
): Promise<SessionsRevokeResponse> {
  return http.post<SessionsRevokeResponse>(
    "/auth/sessions/revoke",
    payload
  );
}
