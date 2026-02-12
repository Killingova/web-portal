import { useCallback, useState } from "react";
import { updateMyProfile } from "../api/updateMyProfile";
import type { Profile, UpdateProfilePayload } from "../types/profile.types";

interface UseUpdateProfileResult {
  updateProfile: (payload: UpdateProfilePayload) => Promise<Profile>;
  loading: boolean;
  error: string | null;
  message: string | null;
  reset: () => void;
}

export function useUpdateProfile(): UseUpdateProfileResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setMessage(null);
  }, []);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const updated = await updateMyProfile(payload);
      setMessage("Profil erfolgreich aktualisiert.");
      return updated;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Profil konnte nicht aktualisiert werden.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateProfile,
    loading,
    error,
    message,
    reset,
  };
}
