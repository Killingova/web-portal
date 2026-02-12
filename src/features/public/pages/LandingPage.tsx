import React from "react";
import { Link } from "react-router-dom";

export function LandingPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2]">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide">Pfad des Paradoxons</h1>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="px-4 py-2 rounded border border-[#A67C7C] hover:bg-[#1d0000]" to="/login">
            Anmelden
          </Link>
          <Link className="px-4 py-2 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-white" to="/register">
            Registrieren
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <p className="uppercase text-xs tracking-[0.2em] text-[#A67C7C]">SaaS Portal</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Dein Zugang zu Tenant-basierten SaaS-Workspaces
            </h2>
            <p className="text-[#DCDEF2]/85 max-w-xl">
              Registriere dich, verifiziere deine E-Mail und starte dein Workspace-Onboarding.
              Authentifizierung, Tenant-Isolation und API-Security werden am Gateway erzwungen.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link className="px-5 py-3 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-white" to="/register">
                Jetzt starten
              </Link>
              <Link className="px-5 py-3 rounded border border-[#A67C7C] hover:bg-[#1d0000]" to="/login">
                Bereits Kunde
              </Link>
            </div>
          </div>

          <div className="bg-[#1d0000] border border-[#8C5A67] rounded-2xl p-6 space-y-3">
            <h3 className="text-xl font-semibold">Lifecycle in Phase 1</h3>
            <ul className="text-sm space-y-2 text-[#DCDEF2]/90">
              <li>1. Account erstellen und E-Mail verifizieren</li>
              <li>2. Login und Onboarding in `/app/onboarding`</li>
              <li>3. Tenant setzen und Profil unter `/app/profile` pflegen</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
