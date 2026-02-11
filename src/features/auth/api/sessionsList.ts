// src/features/auth/api/sessionsList.ts
import { http } from "../../../shared/lib/httpClient";
import type { SessionInfo } from "../types/auth.types";

export function sessionsList(): Promise<SessionInfo[]> {
  return http.get<SessionInfo[]>("/auth/sessions");
}
