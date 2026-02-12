import { useCallback, useEffect, useState } from "react";
import { getMyProfile } from "../api/getMyProfile";
import type { Profile } from "../types/profile.types";

interface UseMyProfileResult {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMyProfile(): UseMyProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await getMyProfile();
      setProfile(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Profil konnte nicht geladen werden.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    profile,
    loading,
    error,
    refetch,
  };
}
