export interface Profile {
  id: string;
  userId: string;
  tenantId: string;
  displayName: string | null;
  language: string | null;
  timezone: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface UpdateProfilePayload {
  displayName?: string | null;
  language?: string | null;
  timezone?: string | null;
}

export interface ProfileHealthResponse {
  status: string;
  service?: string;
  checks?: Record<string, string>;
  ts?: string;
}
