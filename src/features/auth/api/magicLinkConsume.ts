// src/features/auth/api/magicLinkConsume.ts
import { http } from "../../../shared/lib/httpClient";
import type { AuthResponse } from "../types/auth.types";

export interface MagicLinkConsumePayload {
  token: string;
}

export function magicLinkConsume(
  payload: MagicLinkConsumePayload
): Promise<AuthResponse> {
  return http.post<AuthResponse>("/auth/magic-link/consume", payload);
}
