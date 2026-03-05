
import type { Profile } from "../types/profile.types";

interface ProfileCardProps {
  profile: Profile;
}

function formatDate(value: string): string {
  try { return new Date(value).toLocaleString("de-DE"); } catch { return value; }
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-2">
      <h2 className="text-lg font-semibold text-[#f2eeff]">Profildaten</h2>
      <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Anzeigename:</span> {profile.displayName?.trim() || "—"}</p>
      <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Sprache:</span> {profile.language || "—"}</p>
      <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Zeitzone:</span> {profile.timezone || "—"}</p>
      <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Version:</span> {profile.version}</p>
      <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Aktualisiert:</span> {formatDate(profile.updatedAt)}</p>
    </section>
  );
}
