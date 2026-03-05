import type { ReactElement } from "react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tenantBootstrap } from "../../auth/api/tenantBootstrap";
import { useTenant } from "../../../app/providers/TenantProvider";

export function OnboardingPage(): ReactElement {
  const navigate = useNavigate();
  const { tenantId, setTenantId } = useTenant();
  const [tenantName, setTenantName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreateTenant(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const trimmedName = tenantName.trim();
    if (!trimmedName) { setError("Bitte gib einen Tenant-Namen an."); return; }
    setLoading(true);
    try {
      const response = await tenantBootstrap({ name: trimmedName });
      setTenantId(response.tenantId);
      setMessage(response.message || "Tenant erfolgreich erstellt.");
      navigate("/app/profile", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tenant-Onboarding fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-2">
        <h1 className="text-2xl font-bold text-[#f2eeff]">Erste Schritte</h1>
        <p className="text-sm text-[#b9adcf]">
          Erstelle jetzt deinen ersten Tenant. Danach werden alle Business-Requests mit
          X-Tenant-Id ausgeführt.
        </p>
        <p className="text-sm text-[#ddd2f5]">
          <span className="font-medium text-[#9b7fe8]">Aktueller Tenant:</span>{" "}
          {tenantId || <span className="text-[#b9adcf]/60">nicht gesetzt</span>}
        </p>
      </div>

      <form
        onSubmit={(e) => { void handleCreateTenant(e); }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4 max-w-xl"
      >
        <label htmlFor="tenant-name" className="block text-sm font-medium text-[#b9adcf]">
          Tenant-Name
        </label>
        <input
          id="tenant-name"
          type="text"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          placeholder="z. B. Mein Arbeitsbereich"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-[#4c3d79]/70 text-[#f2eeff] placeholder-[#b9adcf]/60 backdrop-blur-sm focus:outline-none focus:border-[#6f52cc] focus:ring-1 focus:ring-[#6f52cc]/50 transition-colors"
          required
        />
        {error && <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 px-3 py-2 rounded-lg">{error}</p>}
        {message && <p className="text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-500/30 px-3 py-2 rounded-lg">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6948cf] to-[#8f77e0] text-white text-sm font-semibold hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-[#6948cf]/25"
        >
          {loading ? "Erstelle Tenant…" : "Tenant erstellen"}
        </button>
      </form>
    </section>
  );
}
