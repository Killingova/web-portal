// src/features/auth/api/magicLinkRequest.ts
import { http } from "../../../shared/lib/httpClient";

export interface MagicLinkRequestPayload {
  email: string;
}

export interface MagicLinkRequestResponse {
  message: string;
}

export function magicLinkRequest(
  payload: MagicLinkRequestPayload
): Promise<MagicLinkRequestResponse> {
  return http.post<MagicLinkRequestResponse>(
    "/auth/magic-link/request",
    payload
  );
}
