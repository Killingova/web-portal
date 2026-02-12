import React from "react";

export function SettingsPage(): React.ReactElement {
  return (
    <section className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-3">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-sm text-[#DCDEF2]/90">
        Dieser Bereich ist fuer Phase 2 vorgesehen (Billing, Notifications, Preferences).
      </p>
    </section>
  );
}
