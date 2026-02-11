// src/features/auth/hooks/useLogin.ts
import { useState, useCallback } from "react";
import { login, type LoginPayload } from "../api/login";
import { useAuth } from "../../../app/providers/AuthProvider";

interface UseLoginResult {
  login: (payload: LoginPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useLogin(): UseLoginResult {
  const { loginWithResponse } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      setError(null);
      setLoading(true);
      try {
        const res = await login(payload);
        loginWithResponse(res);
      } catch (err: any) {
        console.error("[useLogin] Fehler beim Login:", err);
        setError(err?.message || "Login fehlgeschlagen.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loginWithResponse]
  );

  return {
    login: handleLogin,
    loading,
    error,
    reset,
  };
}
