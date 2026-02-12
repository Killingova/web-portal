import React, { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { emailVerifyRequest } from "../api/emailVerifyRequest";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { AuthLayout } from "../components/AuthLayout";
import { AuthForm } from "../components/AuthForm";
import { FormField } from "../../../shared/ui/FormField";
import { Input } from "../../../shared/ui/Input";

export function VerifyEmailPage() {
  const [params] = useSearchParams();
  const [token, setToken] = useState(params.get("token") || "");
  const [email, setEmail] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const { verify, loading, error, message, success } = useVerifyEmail();

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await verify(token.trim());
  }

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestLoading(true);
    setRequestError(null);
    setRequestMessage(null);
    try {
      const response = await emailVerifyRequest({ email: email.trim() });
      setRequestMessage(response.message || "Verifizierungs-E-Mail wurde versendet.");
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "E-Mail konnte nicht versendet werden.");
    } finally {
      setRequestLoading(false);
    }
  }

  return (
    <AuthLayout
      title="E-Mail verifizieren"
      subtitle="Token bestaetigen oder Verifizierungs-Link neu anfordern."
      footer={
        <span>
          Bereits verifiziert?{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Zum Login
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <AuthForm onSubmit={handleVerify} submitLabel="E-Mail bestaetigen" loading={loading} error={error}>
          <FormField id="verify-token" label="Verifizierungs-Token" required>
            <Input
              id="verify-token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              required
              placeholder="Token aus E-Mail"
            />
          </FormField>

          {message ? (
            <p className={`text-sm px-3 py-2 rounded ${success ? "text-green-700 bg-green-100" : "text-[#260101] bg-[#f5e7ea]"}`}>
              {message}
            </p>
          ) : null}
        </AuthForm>

        <AuthForm
          onSubmit={handleRequest}
          submitLabel="Link erneut senden"
          loading={requestLoading}
          error={requestError}
        >
          <FormField id="verify-email" label="E-Mail fuer neuen Link" required>
            <Input
              id="verify-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="dein@email.de"
            />
          </FormField>

          {requestMessage ? (
            <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">{requestMessage}</p>
          ) : null}
        </AuthForm>
      </div>
    </AuthLayout>
  );
}
