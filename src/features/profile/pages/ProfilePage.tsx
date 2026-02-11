import React from "react";
import { useAuth } from "../../../app/providers/AuthProvider";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#260101] text-[#DCDEF2] flex items-center justify-center">
        <p>Kein Benutzer geladen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] p-8">
      <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">E-Mail:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Tenant:</span>{" "}
          {user.tenantId || "—"}
        </p>
        <p>
          <span className="font-semibold">Rollen:</span>{" "}
          {(user.roles ?? []).join(", ") || "—"}
        </p>
        <p>
          <span className="font-semibold">Plan:</span> {user.planTier ?? "—"}
        </p>
      </div>
    </div>
  );
}
