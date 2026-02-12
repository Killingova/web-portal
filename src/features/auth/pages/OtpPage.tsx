import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { otpRequest } from "../api/otpRequest";
import { otpVerify } from "../api/otpVerify";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AuthLayout } from "../components/AuthLayout";
import { AuthForm } from "../components/AuthForm";
import { FormField } from "../../../shared/ui/FormField";
import { Input } from "../../../shared/ui/Input";

export function OtpPage() {
  const navigate = useNavigate();
  const { loginWithResponse } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestLoading(true);
    setRequestError(null);
    setRequestMessage(null);
    try {
      const response = await otpRequest({ email: email.trim(), channel: "email" });
      setRequestMessage(response.message || "OTP wurde versendet.");
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "OTP konnte nicht angefragt werden.");
    } finally {
      setRequestLoading(false);
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerifyLoading(true);
    setVerifyError(null);
    try {
      const response = await otpVerify({ email: email.trim(), code: code.trim() });
      loginWithResponse(response);
      navigate("/app", { replace: true });
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : "OTP ist ungueltig.");
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <AuthLayout
      title="OTP Login"
      subtitle="Einmalcode anfordern und bestaetigen."
      footer={
        <span>
          Alternativ{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Passwort-Login
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <AuthForm onSubmit={handleRequest} submitLabel="Code senden" loading={requestLoading} error={requestError}>
          <FormField id="otp-email" label="E-Mail" required>
            <Input
              id="otp-email"
              type="email"
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

        <AuthForm onSubmit={handleVerify} submitLabel="Code bestaetigen" loading={verifyLoading} error={verifyError}>
          <FormField id="otp-code" label="OTP Code" required>
            <Input
              id="otp-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
              placeholder="123456"
            />
          </FormField>
        </AuthForm>
      </div>
    </AuthLayout>
  );
}
