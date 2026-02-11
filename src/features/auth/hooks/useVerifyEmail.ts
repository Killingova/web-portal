// src/features/auth/hooks/useVerifyEmail.ts
import { useState, useCallback } from "react";
import { emailVerifyConfirm } from "../api/emailVerifyConfirm";

interface UseVerifyEmailResult {
  verify: (token: string) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  reset: () => void;
}

export function useVerifyEmail(): UseVerifyEmailResult {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError(null);
    setMessage(null);
  }, []);

  const verify = useCallback(
    async (token: string) => {
      reset();
      setLoading(true);
      try {
        const res = await emailVerifyConfirm({ token });
        setSuccess(true);
        if (res && typeof (res as any).message === "string") {
          setMessage((res as any).message);
        } else {
          setMessage("E-Mail erfolgreich verifiziert.");
        }
      } catch (err: any) {
        console.error("[useVerifyEmail] Fehler bei E-Mail-Verifikation:", err);
        setError(err?.message || "E-Mail-Verifikation fehlgeschlagen.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [reset]
  );

  return {
    verify,
    loading,
    success,
    error,
    message,
    reset,
  };
}
