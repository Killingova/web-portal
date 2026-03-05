import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sessionsList } from "../api/sessionsList";
import { sessionsRevoke } from "../api/sessionsRevoke";
import { logoutApi } from "../api/logout";
import { useAuth } from "../../../app/providers/AuthProvider";
import type { SessionInfo } from "../types/auth.types";

function toLocalDate(value: string): string {
  try {
    return new Date(value).toLocaleString("de-DE");
  } catch {
    return value;
  }
}

export function SessionsPage() {
  const { logout } = useAuth();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [revokingSessionId, setRevokingSessionId] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await sessionsList();
      setSessions(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sessions konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  async function handleRevoke(sessionId: string) {
    setRevokingSessionId(sessionId);
    setError(null);
    setMessage(null);
    try {
      const response = await sessionsRevoke({ sessionId });
      setMessage(response.message || "Session wurde beendet.");
      await loadSessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Session konnte nicht beendet werden.");
    } finally {
      setRevokingSessionId(null);
    }
  }

  async function handleLogoutEverywhere() {
    setError(null);
    setMessage(null);
    try {
      await logoutApi();
    } catch {
      // Der lokale Logout soll auch dann erfolgen, wenn das Backend die Session schon verworfen hat.
    } finally {
      logout();
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Aktive Sessions</h1>
          <Link to="/app/profile" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Zurueck
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void loadSessions()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6948cf] to-[#8f77e0] text-white text-sm hover:brightness-110 transition shadow-lg shadow-[#6948cf]/25"
          >
            Neu laden
          </button>
          <button
            type="button"
            onClick={() => void handleLogoutEverywhere()}
            className="px-4 py-2 rounded-lg border border-[#4c3d79] text-[#ddd2f5] text-sm hover:bg-[#6f52cc]/20 backdrop-blur-sm transition"
          >
            Lokal abmelden
          </button>
        </div>

        {loading ? <p className="text-[#b9adcf]">Lade Sessions...</p> : null}
        {error ? <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-3 py-2">{error}</p> : null}
        {message ? <p className="text-sm text-green-300 bg-green-900/30 border border-green-500/30 rounded-lg px-3 py-2">{message}</p> : null}

        <div className="space-y-3">
          {sessions.map((session) => (
            <article key={session.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 text-sm text-[#b9adcf]">
                  <p>
                    <span className="font-medium text-[#f2eeff]">Session:</span> {session.id}
                  </p>
                  <p>
                    <span className="font-medium text-[#f2eeff]">Device:</span> {session.device || "unknown"}
                  </p>
                  <p>
                    <span className="font-medium text-[#f2eeff]">IP:</span> {session.ip || "unknown"}
                  </p>
                  <p>
                    <span className="font-medium text-[#f2eeff]">Erstellt:</span> {toLocalDate(session.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium text-[#f2eeff]">Zuletzt genutzt:</span> {toLocalDate(session.lastUsedAt)}
                  </p>
                </div>

                {session.isCurrent ? (
                  <span className="text-xs px-2 py-1 rounded-lg bg-green-900/40 border border-green-500/30 text-green-300">Aktuelle Session</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => void handleRevoke(session.id)}
                    disabled={revokingSessionId === session.id}
                    className="px-3 py-2 rounded-lg border border-red-500/40 text-red-300 text-sm hover:bg-red-900/30 transition disabled:opacity-60"
                  >
                    {revokingSessionId === session.id ? "Beende..." : "Session beenden"}
                  </button>
                )}
              </div>
            </article>
          ))}

          {!loading && sessions.length === 0 ? (
            <p className="text-sm text-[#b9adcf]">Keine Sessions gefunden.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
