
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { ProfileCard } from "../components/ProfileCard";
import { useMyProfile } from "../hooks/useMyProfile";

export function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, error, refetch } = useMyProfile();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#b9adcf]">Kein Benutzer geladen.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-[#f2eeff]">Mein Profil</h1>
        <div className="text-sm space-x-3">
          <Link to="/app/profile/edit" className="text-[#9b7fe8] hover:text-[#bba6ff] transition-colors">
            Bearbeiten
          </Link>
          <Link to="/app/profile/privacy" className="text-[#9b7fe8] hover:text-[#bba6ff] transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>

      <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-2">
        <h2 className="text-lg font-semibold text-[#f2eeff]">Account</h2>
        <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">E-Mail:</span> {user.email}</p>
        <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Tenant:</span> {user.tenantId || "—"}</p>
        <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Rollen:</span> {user.roles.join(", ") || "—"}</p>
        <p className="text-[#ddd2f5]"><span className="text-[#9b7fe8] font-medium">Plan:</span> {user.planTier ?? "—"}</p>
      </section>

      {loading && <p className="text-[#b9adcf] text-sm">Profil wird geladen…</p>}
      {error && (
        <div className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 px-3 py-2 rounded-lg">
          <p>{error}</p>
          <button type="button" className="underline mt-1" onClick={() => void refetch()}>Erneut versuchen</button>
        </div>
      )}
      {profile && <ProfileCard profile={profile} />}
    </div>
  );
}
