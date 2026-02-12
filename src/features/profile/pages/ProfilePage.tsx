import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { ProfileCard } from "../components/ProfileCard";
import { useMyProfile } from "../hooks/useMyProfile";

export function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, error, refetch } = useMyProfile();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#260101] text-[#DCDEF2] flex items-center justify-center">
        <p>Kein Benutzer geladen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] p-8">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mein Profil</h1>
          <div className="text-sm space-x-3">
            <Link to="/app/profile/edit" className="text-[#A67C7C] hover:underline">
              Bearbeiten
            </Link>
            <Link to="/app/profile/privacy" className="text-[#A67C7C] hover:underline">
              Datenschutz
            </Link>
            <Link to="/app/sessions" className="text-[#A67C7C] hover:underline">
              Sessions
            </Link>
          </div>
        </div>

        <section className="bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5 space-y-2">
          <h2 className="text-xl font-semibold">Account</h2>
          <p>
            <span className="font-semibold">E-Mail:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Tenant:</span> {user.tenantId || "—"}
          </p>
          <p>
            <span className="font-semibold">Rollen:</span> {user.roles.join(", ") || "—"}
          </p>
          <p>
            <span className="font-semibold">Plan:</span> {user.planTier ?? "—"}
          </p>
        </section>

        {loading ? <p>Profil wird geladen...</p> : null}
        {error ? (
          <div className="text-sm text-red-400">
            <p>{error}</p>
            <button type="button" className="underline" onClick={() => void refetch()}>
              Erneut versuchen
            </button>
          </div>
        ) : null}
        {profile ? <ProfileCard profile={profile} /> : null}
      </div>
    </div>
  );
}
