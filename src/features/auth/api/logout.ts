// src/features/auth/api/logout.ts
import { http } from "../../../shared/lib/httpClient";

export interface LogoutResponse {
  message: string;
}

export function logoutApi(): Promise<LogoutResponse> {
  return http.post<LogoutResponse>("/auth/logout");
}
