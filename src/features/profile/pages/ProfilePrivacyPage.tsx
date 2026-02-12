import React, { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] p-8">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profil & Datenschutz</h1>
          <Link to="/app/profile" className="text-[#A67C7C] hover:underline">
            Zurueck
          </Link>
        </div>

        <section className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-3">
          <h2 className="text-lg font-semibold">Datenschutz-Hinweis</h2>
          <p className="text-sm text-[#DCDEF2]/90">
            Dieses Portal verarbeitet ausschliesslich profilbezogene Daten ueber das API-Gateway.
            Es werden keine Datenbankzugriffe oder Secrets im Browser ausgefuehrt.
          </p>
          <p className="text-sm text-[#DCDEF2]/90">
            Du kannst dein Profil unter <code>/app/profile/edit</code> aktualisieren. Sicherheitskontrollen
            wie CORS, Header-Policies und AuthZ werden am Gateway erzwungen.
          </p>
        </section>

        <section className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-2">
          <h2 className="text-lg font-semibold">Profile-Service Health</h2>
          {loading ? <p className="text-sm">Lade Status...</p> : null}
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {health ? (
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Status:</span> {health.status}
              </p>
              {health.service ? (
                <p>
                  <span className="font-medium">Service:</span> {health.service}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
