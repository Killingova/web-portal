import React from "react";
import { Link } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";
import { useMyProfile } from "../hooks/useMyProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import type { UpdateProfilePayload } from "../types/profile.types";

export function ProfileEditPage() {
  const { profile, loading, error, refetch } = useMyProfile();
  const {
    updateProfile,
    loading: saving,
    error: saveError,
    message,
    reset,
  } = useUpdateProfile();

  async function handleSubmit(payload: UpdateProfilePayload) {
    await updateProfile(payload);
    await refetch();
  }

  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2] p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profil bearbeiten</h1>
          <Link to="/app/profile" className="text-[#A67C7C] hover:underline">
            Zurueck
          </Link>
        </div>

        {loading ? <p>Profil wird geladen...</p> : null}
        {error ? (
          <p className="text-red-400">
            {error}
          </p>
        ) : null}

        {profile ? (
          <ProfileForm
            key={profile.id}
            profile={profile}
            loading={saving}
            error={saveError}
            message={message}
            onSubmit={handleSubmit}
          />
        ) : null}

        {(saveError || message) && (
          <button
            type="button"
            onClick={reset}
            className="text-sm text-[#DCDEF2]/80 hover:text-[#DCDEF2]"
          >
            Meldungen ausblenden
          </button>
        )}
      </div>
    </div>
  );
}
