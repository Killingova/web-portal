import { http } from "../../../shared/lib/httpClient";
import type { Profile, ProfileResponse } from "../types/profile.types";

export async function getMyProfile(): Promise<Profile> {
  const response = await http.get<ProfileResponse>("/profiles/me");
  return response.profile;
}
