import { http } from "../../../shared/lib/httpClient";
import type { ProfileHealthResponse } from "../types/profile.types";

export function profileHealth(): Promise<ProfileHealthResponse> {
  return http.get<ProfileHealthResponse>("/health/profile");
}
