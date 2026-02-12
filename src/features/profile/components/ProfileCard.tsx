import React from "react";
import type { Profile } from "../types/profile.types";

interface ProfileCardProps {
  profile: Profile;
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleString("de-DE");
  } catch {
    return value;
  }
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <section className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-2">
      <h2 className="text-xl font-semibold">Profildaten</h2>

      <p>
        <span className="font-medium">Anzeigename:</span>{" "}
        {profile.displayName?.trim() || "—"}
      </p>
      <p>
        <span className="font-medium">Sprache:</span> {profile.language || "—"}
      </p>
      <p>
        <span className="font-medium">Zeitzone:</span> {profile.timezone || "—"}
      </p>
      <p>
        <span className="font-medium">Version:</span> {profile.version}
      </p>
      <p>
        <span className="font-medium">Aktualisiert:</span> {formatDate(profile.updatedAt)}
      </p>
    </section>
  );
}
