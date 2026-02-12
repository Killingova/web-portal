import React, { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { magicLinkRequest } from "../api/magicLinkRequest";
import { magicLinkConsume } from "../api/magicLinkConsume";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AuthLayout } from "../components/AuthLayout";
import { AuthForm } from "../components/AuthForm";
import { FormField } from "../../../shared/ui/FormField";
import { Input } from "../../../shared/ui/Input";

export function MagicLinkPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tokenFromQuery = params.get("token") || "";
  const { loginWithResponse } = useAuth();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState(tokenFromQuery);
  const [requestLoading, setRequestLoading] = useState(false);
  const [consumeLoading, setConsumeLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [consumeError, setConsumeError] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestLoading(true);
    setRequestError(null);
    setRequestMessage(null);
    try {
      const response = await magicLinkRequest({ email: email.trim() });
      setRequestMessage(response.message || "Magic-Link wurde versendet.");
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "Magic-Link konnte nicht angefragt werden.");
    } finally {
      setRequestLoading(false);
    }
  }

  async function handleConsume(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConsumeLoading(true);
    setConsumeError(null);
    try {
      const response = await magicLinkConsume({ token: token.trim() });
      loginWithResponse(response);
      navigate("/app", { replace: true });
    } catch (err) {
      setConsumeError(err instanceof Error ? err.message : "Magic-Link ungueltig oder abgelaufen.");
    } finally {
      setConsumeLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Magic Link Login"
      subtitle="Link anfordern oder Token direkt einloesen."
      footer={
        <span>
          Stattdessen per Passwort?{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Zum Login
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <AuthForm
          onSubmit={handleRequest}
          submitLabel="Magic Link anfordern"
          loading={requestLoading}
          error={requestError}
        >
          <FormField id="magic-email" label="E-Mail" required>
            <Input
              id="magic-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="dein@email.de"
              required
            />
          </FormField>

          {requestMessage ? (
            <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">{requestMessage}</p>
          ) : null}
        </AuthForm>

        <AuthForm onSubmit={handleConsume} submitLabel="Mit Token einloggen" loading={consumeLoading} error={consumeError}>
          <FormField id="magic-token" label="Magic-Link Token" required>
            <Input
              id="magic-token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Token aus Link"
              required
            />
          </FormField>
        </AuthForm>
      </div>
    </AuthLayout>
  );
}
