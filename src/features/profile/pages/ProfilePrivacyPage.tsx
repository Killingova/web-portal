import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileHealth } from "../api/health";
import type { ProfileHealthResponse } from "../types/profile.types";

export function ProfilePrivacyPage() {
  const [health, setHealth] = useState<ProfileHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHealth() {
      setLoading(true);
      setError(null);
      try {
        const result = await profileHealth();
        setHealth(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Health-Status konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    void loadHealth();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Profil & Datenschutz</h1>
          <Link to="/app/profile" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Zurueck
          </Link>
        </div>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-3">
          <h2 className="text-lg font-semibold">Datenschutz-Hinweis</h2>
          <p className="text-sm text-[#b9adcf]">
            Dieses Portal verarbeitet ausschliesslich profilbezogene Daten ueber das API-Gateway.
            Es werden keine Datenbankzugriffe oder Secrets im Browser ausgefuehrt.
          </p>
          <p className="text-sm text-[#b9adcf]">
            Du kannst dein Profil unter <code className="text-[#9b7fe8]">/app/profile/edit</code> aktualisieren. Sicherheitskontrollen
            wie CORS, Header-Policies und AuthZ werden am Gateway erzwungen.
          </p>
        </section>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-2">
          <h2 className="text-lg font-semibold">Profile-Service Health</h2>
          {loading ? <p className="text-sm text-[#b9adcf]">Lade Status...</p> : null}
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {health ? (
            <div className="text-sm space-y-1 text-[#b9adcf]">
              <p>
                <span className="font-medium text-[#f2eeff]">Status:</span> {health.status}
              </p>
              {health.service ? (
                <p>
                  <span className="font-medium text-[#f2eeff]">Service:</span> {health.service}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
