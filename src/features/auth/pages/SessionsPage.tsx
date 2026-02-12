import React, { useCallback, useEffect, useState } from "react";
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
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Aktive Sessions</h1>
          <Link to="/app/profile" className="text-[#A67C7C] hover:underline">
            Zurueck
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void loadSessions()}
            className="px-4 py-2 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-white text-sm"
          >
            Neu laden
          </button>
          <button
            type="button"
            onClick={() => void handleLogoutEverywhere()}
            className="px-4 py-2 rounded border border-[#A67C7C] text-sm hover:bg-[#1d0000]"
          >
            Lokal abmelden
          </button>
        </div>

        {loading ? <p>Lade Sessions...</p> : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-green-400">{message}</p> : null}

        <div className="space-y-3">
          {sessions.map((session) => (
            <article key={session.id} className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Session:</span> {session.id}
                  </p>
                  <p>
                    <span className="font-medium">Device:</span> {session.device || "unknown"}
                  </p>
                  <p>
                    <span className="font-medium">IP:</span> {session.ip || "unknown"}
                  </p>
                  <p>
                    <span className="font-medium">Erstellt:</span> {toLocalDate(session.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Zuletzt genutzt:</span> {toLocalDate(session.lastUsedAt)}
                  </p>
                </div>

                {session.isCurrent ? (
                  <span className="text-xs px-2 py-1 rounded bg-[#2f3a2f] text-green-300">Aktuelle Session</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => void handleRevoke(session.id)}
                    disabled={revokingSessionId === session.id}
                    className="px-3 py-2 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-sm text-white disabled:opacity-60"
                  >
                    {revokingSessionId === session.id ? "Beende..." : "Session beenden"}
                  </button>
                )}
              </div>
            </article>
          ))}

          {!loading && sessions.length === 0 ? (
            <p className="text-sm text-[#DCDEF2]/80">Keine Sessions gefunden.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
