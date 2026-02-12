import React, { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { passwordReset } from "../api/passwordReset";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AuthForm } from "../components/AuthForm";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/ui/Input";
import { FormField } from "../../../shared/ui/FormField";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { loginWithResponse } = useAuth();

  const tokenFromQuery = params.get("token") || "";
  const [token, setToken] = useState(tokenFromQuery);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const passwordMismatch = useMemo(
    () => newPasswordConfirm.length > 0 && newPassword !== newPasswordConfirm,
    [newPassword, newPasswordConfirm],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword.length < 8) {
      setError("Das neue Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    if (passwordMismatch) {
      setError("Passwoerter stimmen nicht ueberein.");
      return;
    }

    setLoading(true);
    try {
      const response = await passwordReset({
        token: token.trim(),
        newPassword,
      });

      if (response.accessToken && response.user) {
        loginWithResponse({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken ?? "",
          user: response.user,
        });
        navigate("/app", { replace: true });
        return;
      }

      setMessage(response.message || "Passwort wurde erfolgreich geaendert.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Passwort-Reset fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Passwort zuruecksetzen"
      subtitle="Lege ein neues Passwort fuer deinen Account fest."
      footer={
        <span>
          Zurueck zum{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Login
          </Link>
        </span>
      }
    >
      <AuthForm onSubmit={handleSubmit} submitLabel="Neues Passwort speichern" loading={loading} error={error}>
        <FormField id="reset-token" label="Reset-Token" required>
          <Input
            id="reset-token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
            placeholder="Token aus E-Mail"
          />
        </FormField>

        <FormField id="reset-password" label="Neues Passwort" required>
          <Input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            placeholder="Mindestens 8 Zeichen"
          />
        </FormField>

        <FormField
          id="reset-password-confirm"
          label="Neues Passwort wiederholen"
          required
          error={passwordMismatch ? "Passwoerter stimmen nicht ueberein." : null}
        >
          <Input
            id="reset-password-confirm"
            type="password"
            autoComplete="new-password"
            value={newPasswordConfirm}
            onChange={(event) => setNewPasswordConfirm(event.target.value)}
            required
            placeholder="Wiederholen"
          />
        </FormField>

        {message ? <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">{message}</p> : null}
      </AuthForm>
    </AuthLayout>
  );
}
