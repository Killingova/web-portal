
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
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Profil bearbeiten</h1>
          <Link to="/app/profile" className="text-[#9b7fe8] hover:text-[#bba6ff] hover:underline transition-colors">
            Zurueck
          </Link>
        </div>

        {loading ? <p className="text-[#b9adcf]">Profil wird geladen...</p> : null}
        {error ? (
          <p className="text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-3 py-2 text-sm">
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
            className="text-sm text-[#b9adcf] hover:text-[#f2eeff] transition-colors"
          >
            Meldungen ausblenden
          </button>
        )}
      </div>
    </div>
  );
}
