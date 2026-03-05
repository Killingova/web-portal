import type { ReactElement } from "react";
export function SettingsPage(): ReactElement {
  return (
    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
      <h1 className="text-2xl font-bold text-[#f2eeff]">Einstellungen</h1>
      <p className="text-sm text-[#b9adcf]">
        Dieser Bereich ist für Phase 2 vorgesehen (Billing, Notifications, Preferences).
      </p>
    </section>
  );
}
