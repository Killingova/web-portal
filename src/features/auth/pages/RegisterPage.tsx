import React, { useState, useCallback, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/register";
import { useAuth } from "../../../app/providers/AuthProvider";

/**
 * Registrierungsseite:
 * - Validiert Email & Passwort
 * - POST /auth/register
 * - Zeigt Message / Error
 */
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#260101]">
      <section className="w-full max-w-xl mx-auto p-6 bg-[#DCDEF2] rounded-xl shadow-lg border border-[#A67C7C]">
        <h2 className="text-2xl font-bold text-[#260101] mb-6 text-center">
          Registrieren
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* E-Mail */}
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-[#260101]"
            >
              E-Mail <sup className="text-red-500">*</sup>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="dein@email.de"
              className="w-full mt-1 px-4 py-2 border border-[#A67C7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5A67] bg-white"
              required
            />
          </div>

          {/* Passwort */}
          <div>
            <label
              htmlFor="passwort"
              className="block font-medium text-[#260101]"
            >
              Passwort <sup className="text-red-500">*</sup>
            </label>
            <input
              id="passwort"
              name="passwort"
              type="password"
              value={formData.passwort}
              onChange={handleInputChange}
              placeholder="Mindestens 8 Zeichen"
              className="w-full mt-1 px-4 py-2 border border-[#A67C7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5A67] bg-white"
              required
            />
          </div>

          {/* Passwort wiederholen */}
          <div>
            <label
              htmlFor="passwortWdh"
              className="block font-medium text-[#260101]"
            >
              Passwort wiederholen <sup className="text-red-500">*</sup>
            </label>
            <input
              id="passwortWdh"
              name="passwortWdh"
              type="password"
              value={formData.passwortWdh}
              onChange={handleInputChange}
              placeholder="Nochmals eingeben"
              className="w-full mt-1 px-4 py-2 border border-[#A67C7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C5A67] bg-white"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-700 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#8C5A67] text-white py-2 px-4 rounded-md hover:bg-[#A67C7C] transition disabled:opacity-60"
            disabled={isSubmitDisabled}
          >
            {loading ? "Registriere…" : "Registrieren"}
          </button>
        </form>

        <p className="text-center mt-4 text-[#260101]">
          Schon ein Konto?{" "}
          <Link to="/login" className="text-[#8C5A67] hover:underline">
            Hier einloggen
          </Link>
        </p>
      </section>
    </div>
  );
}
