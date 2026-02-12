import { http } from "../../../shared/lib/httpClient";
import type { Profile, ProfileResponse, UpdateProfilePayload } from "../types/profile.types";

export async function updateMyProfile(payload: UpdateProfilePayload): Promise<Profile> {
  const response = await http.patch<ProfileResponse>("/profiles/me", payload);
  return response.profile;
}
