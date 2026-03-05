// src/features/auth/pages/LoginPage.tsx (vereinfacht)
import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../../../shared/ui/Input";
import { AuthLayout } from "../components/AuthLayout";
import { AuthForm } from "../components/AuthForm";
import { useLogin } from "../hooks/useLogin";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({ email, password });
    navigate("/app", { replace: true });
  }

  return (
    <AuthLayout
      title="Pfad des Paradoxons – Login"
      subtitle="Melde dich an, um dein Portal zu betreten."
      footer={
        <span>
          Noch keinen Account?{" "}
          <Link to="/register" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Jetzt registrieren
          </Link>{" "}
          ·{" "}
          <Link to="/forgot" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Passwort vergessen
          </Link>
        </span>
      }
    >
      <AuthForm
        onSubmit={handleSubmit}
        submitLabel="Einloggen"
        loading={loading}
        error={error}
      >
        <div>
          <label className="block text-sm font-medium text-[#b9adcf] mb-1">
            E-Mail
          </label>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="dein@email.de"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b9adcf] mb-1">
            Passwort
          </label>
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link to="/magic-link" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Magic Link
          </Link>
          <Link to="/otp" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            OTP Login
          </Link>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
