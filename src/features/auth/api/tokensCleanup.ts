// src/features/auth/api/tokensCleanup.ts
import { http } from "../../../shared/lib/httpClient";

export interface TokensCleanupResponse {
  message: string;
  removed?: number;
}

export function tokensCleanup(): Promise<TokensCleanupResponse> {
  return http.post<TokensCleanupResponse>("/auth/tokens/cleanup");
}
