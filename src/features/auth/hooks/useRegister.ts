// src/features/auth/hooks/useRegister.ts
import { useState, useCallback } from "react";
import { register, type RegisterPayload, type RegisterResponse } from "../api/register";
import { useAuth } from "../../../app/providers/AuthProvider";

interface UseRegisterOptions {
  autoLoginOnSuccess?: boolean;
}

interface UseRegisterResult {
  registerUser: (payload: RegisterPayload) => Promise<RegisterResponse | void>;
  loading: boolean;
  error: string | null;
  message: string | null;
  reset: () => void;
}

export function useRegister(
  options: UseRegisterOptions = {}
): UseRegisterResult {
  const { autoLoginOnSuccess = true } = options;
  const { loginWithResponse } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setMessage(null);
  }, []);

  const registerUser = useCallback(
    async (payload: RegisterPayload): Promise<RegisterResponse | void> => {
      setError(null);
      setMessage(null);
      setLoading(true);

      try {
        const res = await register(payload);

        if (res.message) {
          setMessage(res.message);
        } else {
          setMessage(
            "Bestätigungs-E-Mail wurde versendet. Bitte prüfe dein Postfach."
          );
        }

        if (
          autoLoginOnSuccess &&
          res.accessToken &&
          res.refreshToken &&
          res.user
        ) {
          loginWithResponse({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            user: res.user,
          });
        }

        return res;
      } catch (err: any) {
        console.error("[useRegister] Fehler bei Registrierung:", err);
        setError(err?.message || "Registrierung fehlgeschlagen.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [autoLoginOnSuccess, loginWithResponse]
  );

  return {
    registerUser,
    loading,
    error,
    message,
    reset,
  };
}
