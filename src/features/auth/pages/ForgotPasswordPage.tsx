import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { passwordForgot } from "../api/passwordForgot";
import { AuthForm } from "../components/AuthForm";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/ui/Input";
import { FormField } from "../../../shared/ui/FormField";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await passwordForgot({ email: email.trim() });
      setMessage(response.message || "Wenn die Adresse bekannt ist, wurde eine Reset-Mail versendet.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset-Anfrage fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Passwort vergessen"
      subtitle="Wir senden dir einen Link zum Zuruecksetzen."
      footer={
        <span>
          Zurueck zum{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Login
          </Link>
        </span>
      }
    >
      <AuthForm onSubmit={handleSubmit} submitLabel="Reset-Link senden" loading={loading} error={error}>
        <FormField id="forgot-email" label="E-Mail" required>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="dein@email.de"
          />
        </FormField>

        {message ? <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">{message}</p> : null}
      </AuthForm>
    </AuthLayout>
  );
}
