import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tenantBootstrap } from "../../auth/api/tenantBootstrap";
import { useTenant } from "../../../app/providers/TenantProvider";

export function OnboardingPage(): React.ReactElement {
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
    if (!trimmedName) {
      setError("Bitte gib einen Tenant-Namen an.");
      return;
    }

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
      <div className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-2">
        <h1 className="text-2xl font-semibold">Onboarding</h1>
        <p className="text-sm text-[#DCDEF2]/90">
          Erstelle jetzt deinen ersten Tenant. Danach werden alle Business-Requests mit
          `X-Tenant-Id` ausgefuehrt.
        </p>
        <p className="text-sm">
          <span className="font-medium">Aktueller Tenant:</span> {tenantId || "nicht gesetzt"}
        </p>
      </div>

      <form
        onSubmit={(event) => {
          void handleCreateTenant(event);
        }}
        className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-4 max-w-xl"
      >
        <label htmlFor="tenant-name" className="block text-sm font-medium">
          Tenant-Name
        </label>
        <input
          id="tenant-name"
          type="text"
          value={tenantName}
          onChange={(event) => setTenantName(event.target.value)}
          placeholder="z. B. Acme Workspace"
          className="w-full px-4 py-2 border border-[#A67C7C] rounded-md bg-white text-[#260101] focus:outline-none focus:ring-2 focus:ring-[#8C5A67]"
          required
        />

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-green-300">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-white text-sm disabled:opacity-60"
        >
          {loading ? "Erstelle Tenant..." : "Tenant erstellen"}
        </button>
      </form>
    </section>
  );
}
