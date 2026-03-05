import type { ChangeEvent } from "react";
import { FormEvent, useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/register";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";

export function RegisterPage() {
  const navigate = useNavigate();
  const { loginWithResponse } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    passwort: "",
    passwortWdh: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validateEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setMessage(null);

      const { email, passwort, passwortWdh } = formData;

      if (!validateEmail(email)) {
        setError("Bitte gib eine gültige E-Mail-Adresse ein.");
        return;
      }
      if (passwort.length < 8) {
        setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
        return;
      }
      if (passwort !== passwortWdh) {
        setError("Passwörter stimmen nicht überein.");
        return;
      }

      setLoading(true);

      try {
        const res = await register({ email, password: passwort });

        setMessage(
          res.message ??
            "Bestätigungs-E-Mail wurde versendet. Bitte prüfe dein Postfach."
        );
        setFormData({ email: "", passwort: "", passwortWdh: "" });

        if (res.accessToken && res.user) {
          loginWithResponse({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken ?? "",
            user: res.user,
          });
          navigate("/app", { replace: true });
        } else {
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (err: any) {
        console.error("[RegisterPage] Fehler bei Registrierung:", err);
        setError(err.message || "Registrierung fehlgeschlagen.");
      } finally {
        setLoading(false);
      }
    },
    [formData, validateEmail, loginWithResponse, navigate]
  );

  const isSubmitDisabled =
    !formData.email || !formData.passwort || !formData.passwortWdh || loading;

  return (
    <AuthLayout
      title="Registrieren"
      subtitle="Erstelle dein Konto für das Portal."
      footer={
        <span>
          Schon ein Konto?{" "}
          <Link to="/login" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Hier einloggen
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#b9adcf] mb-1">
            E-Mail <sup className="text-[#e2bf73]">*</sup>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="dein@email.de"
            required
          />
        </div>

        <div>
          <label htmlFor="passwort" className="block text-sm font-medium text-[#b9adcf] mb-1">
            Passwort <sup className="text-[#e2bf73]">*</sup>
          </label>
          <Input
            id="passwort"
            name="passwort"
            type="password"
            autoComplete="new-password"
            value={formData.passwort}
            onChange={handleInputChange}
            placeholder="Mindestens 8 Zeichen"
            required
          />
        </div>

        <div>
          <label htmlFor="passwortWdh" className="block text-sm font-medium text-[#b9adcf] mb-1">
            Passwort wiederholen <sup className="text-[#e2bf73]">*</sup>
          </label>
          <Input
            id="passwortWdh"
            name="passwortWdh"
            type="password"
            autoComplete="new-password"
            value={formData.passwortWdh}
            onChange={handleInputChange}
            placeholder="Nochmals eingeben"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 px-3 py-2 rounded-lg">{error}</p>
        )}
        {message && (
          <p className="text-sm text-green-300 bg-green-900/30 border border-green-500/30 px-3 py-2 rounded-lg">{message}</p>
        )}

        <Button type="submit" disabled={isSubmitDisabled} className="w-full">
          {loading ? "Registriere…" : "Registrieren"}
        </Button>
      </form>
    </AuthLayout>
  );
}
